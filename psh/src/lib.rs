mod vfs;

use pest::Parser;
use pest_derive::Parser;
use wasm_bindgen::prelude::*;
use vfs::*;

#[derive(Parser)]
#[grammar = "grammar.pest"]
pub struct ShParser;

// Shell
struct Shell {
    vfs: VfsNode,
    cwd: Vec<String>,
}

impl Shell {
    fn new() -> Self {
        Self { vfs: build_vfs(), cwd: vec![] }
    }

    fn execute(&mut self, input: &str) -> String {
        let input = input.trim();
        if input.is_empty() {
            return String::new();
        }

        let pairs = match ShParser::parse(Rule::program, input) {
            Ok(p) => p,
            Err(e) => return format!("psh: parse error: {}", e),
        };

        let mut output = vec![];

        for pair in pairs {
            for command in pair.into_inner() {
                if command.as_rule() != Rule::command {
                    continue;
                }

            let words: Vec<&str> = command
                .into_inner()
                .filter(|w| w.as_rule() == Rule::word)
                .map(|w| {
                    let s = w.as_str();
                    if s.starts_with('"') && s.ends_with('"') {
                        &s[1..s.len() - 1]
                    } else {
                        s
                    }
                })
                .collect();

                if words.is_empty() {
                    continue;
                }

                let result = match words[0] {
                    "ls" => self.builtin_ls(words.get(1).copied()),
                    "cd" => self.builtin_cd(words.get(1).copied()),
                    "cat" => self.builtin_cat(words.get(1).copied()),
                    "pwd" => self.builtin_pwd(),
                    "echo" => self.builtin_echo(&words[1..]),
                    "clear" => "CLEAR".to_string(),
                    "help" => self.builtin_help(),
                    "neofetch"=> self.builtin_neofetch(),
                    cmd => format!("psh: command not found: {}", cmd),
                };

                output.push(result);
            }
        }

        output.join("\n")
    }

    fn builtin_ls(&self, target: Option<&str>) -> String {
        let parts = match target {
            Some(path) => Self::resolve_path(&self.cwd, path),
            None => self.cwd.clone(),
        };

        match Self::walk_path(&self.vfs, &parts) {
            None => format!(
                "ls: cannot access '{}': no such file or directory",
                target.unwrap_or("/")
            ),
            Some(n) if !n.is_dir() => "ls: not a directory".to_string(),
            Some(n) => {
                let entries: Vec<&str> = n.children.iter().map(|c| c.name.as_str()).collect();
                if entries.is_empty() {
                    "(empty)".to_string()
                } else {
                    entries.join("  ")
                }
            }
        }
    }

    fn builtin_cd(&mut self, target: Option<&str>) -> String {
        let path = match target {
            None | Some("~") => {
                self.cwd.clear();
                return String::new();
            }
            Some(p) => p,
        };

        let parts = Self::resolve_path(&self.cwd, path);

        match Self::walk_path(&self.vfs, &parts) {
            None => format!("cd: no such directory: {}", path),
            Some(n) if !n.is_dir() => format!("cd: not a directory: {}", path),
            Some(_) => {
                self.cwd = parts;
                String::new()
            }
        }
    }

    fn builtin_cat(&self, target: Option<&str>) -> String {
        match target {
            None => "cat: missing operand".to_string(),
            Some(path) => {
                let parts = Self::resolve_path(&self.cwd, path);
                match Self::walk_path(&self.vfs, &parts) {
                    None => format!("cat: {}: no such file", path),
                    Some(n) if n.is_dir() => format!("cat: {}: is a directory", path),
                    Some(n) => n.content.clone().unwrap_or_default(),
                }
            }
        }
    }

    fn builtin_pwd(&self) -> String {
        if self.cwd.is_empty() {
            "/".to_string()
        } else {
            format!("/{}", self.cwd.join("/"))
        }
    }

    fn builtin_echo(&self, args: &[&str]) -> String {
        args.join(" ")
    }

    fn builtin_help(&self) -> String {
        "commands: ls, cd, cat, pwd, echo, clear, help, neofetch".to_string()
    }

    fn builtin_neofetch(&self) -> String {
        concat!(
            "     /\\         byson94@portfolio\n",
            "    /  \\        ─────────────────\n",
            "   /\\   \\       os     : Arch Linux\n",
            "  /  \\ \\ \\      editor : neovim\n",
            " / /\\ \\_\\ \\     sh     : psh\n",
            "/__\\  /___/     lang   : Rust\n",
        ).to_string()
    }

    // Helpers
    fn resolve_path(cwd: &[String], path: &str) -> Vec<String> {
        let mut parts: Vec<String> = if path.starts_with('/') {
            vec![]
        } else {
            cwd.to_vec()
        };

        for segment in path.split('/').filter(|s| !s.is_empty()) {
            match segment {
                "." => {}
                ".." => { parts.pop(); }
                s => parts.push(s.to_string()),
            }
        }

        parts
    }

    fn walk_path<'a>(root: &'a VfsNode, parts: &[String]) -> Option<&'a VfsNode> {
        let mut node = root;
        for part in parts {
            node = node.find(part)?;
        }
        Some(node)
    }
}

// WASM
#[wasm_bindgen]
pub struct Psh {
    shell: Shell,
}

#[wasm_bindgen]
impl Psh {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self { shell: Shell::new() }
    }

    pub fn execute(&mut self, input: &str) -> String {
        self.shell.execute(input)
    }
}

// Tests
#[cfg(test)]
mod tests {
    use super::*;

    fn sh() -> Shell {
        Shell::new()
    }

    // Parser tests

    #[test]
    fn test_parse_simple_command() {
        let result = ShParser::parse(Rule::program, "ls");
        assert!(result.is_ok());
    }

    #[test]
    fn test_parse_command_with_args() {
        let result = ShParser::parse(Rule::program, "cat about.txt");
        assert!(result.is_ok());
    }

    #[test]
    fn test_parse_pipe() {
        let result = ShParser::parse(Rule::program, "ls | cat");
        assert!(result.is_ok());
    }

    #[test]
    fn test_parse_quoted() {
        let result = ShParser::parse(Rule::program, "echo \"hello world\"");
        assert!(result.is_ok());
    }

    #[test]
    fn test_parse_empty() {
        let result = ShParser::parse(Rule::program, "");
        assert!(result.is_ok());
    }

    // Builtin tests
    #[test]
    fn test_ls_root() {
        let mut sh = sh();
        let out = sh.execute("ls");
        assert!(out.contains("about.txt"));
        assert!(out.contains("projects"));
        assert!(out.contains("blog"));
    }

    #[test]
    fn test_ls_subdir() {
        let mut sh = sh();
        let out = sh.execute("ls projects");
        assert!(out.contains("psh.md"));
        assert!(out.contains("gitclone.md"));
    }

    #[test]
    fn test_cd_and_ls() {
        let mut sh = sh();
        sh.execute("cd projects");
        let out = sh.execute("ls");
        assert!(out.contains("psh.md"));
        assert!(out.contains("gitclone.md"));
    }

    #[test]
    fn test_cd_dotdot() {
        let mut sh = sh();
        sh.execute("cd projects");
        sh.execute("cd ..");
        assert_eq!(sh.execute("pwd"), "/");
    }

    #[test]
    fn test_cd_root() {
        let mut sh = sh();
        sh.execute("cd projects");
        sh.execute("cd /");
        assert_eq!(sh.execute("pwd"), "/");
    }

    #[test]
    fn test_cd_invalid() {
        let mut sh = sh();
        let out = sh.execute("cd nonexistent");
        assert!(out.contains("no such directory"));
    }

    #[test]
    fn test_cd_into_file() {
        let mut sh = sh();
        let out = sh.execute("cd about.txt");
        assert!(out.contains("not a directory"));
    }

    #[test]
    fn test_cat_file() {
        let mut sh = sh();
        let out = sh.execute("cat about.txt");
        assert!(out.contains("Byson94"));
    }

    #[test]
    fn test_cat_missing() {
        let mut sh = sh();
        let out = sh.execute("cat nope.txt");
        assert!(out.contains("no such file"));
    }

    #[test]
    fn test_cat_directory() {
        let mut sh = sh();
        let out = sh.execute("cat projects");
        assert!(out.contains("is a directory"));
    }

    #[test]
    fn test_pwd_root() {
        let mut sh = sh();
        assert_eq!(sh.execute("pwd"), "/");
    }

    #[test]
    fn test_pwd_nested() {
        let mut sh = sh();
        sh.execute("cd projects");
        assert_eq!(sh.execute("pwd"), "/projects");
    }

    #[test]
    fn test_echo() {
        let mut sh = sh();
        assert_eq!(sh.execute("echo hello world"), "hello world");
    }

    #[test]
    fn test_unknown_command() {
        let mut sh = sh();
        let out = sh.execute("foobar");
        assert!(out.contains("command not found"));
    }

    #[test]
    fn test_empty_input() {
        let mut sh = sh();
        assert_eq!(sh.execute(""), "");
    }

    #[test]
    fn test_whitespace_input() {
        let mut sh = sh();
        assert_eq!(sh.execute("   "), "");
    }

    #[test]
    fn test_debug_parse() {
        let input = "cd projects";
        let pairs = ShParser::parse(Rule::program, input).unwrap();
        for pair in pairs {
            println!("rule: {:?} | text: {:?}", pair.as_rule(), pair.as_str());
            for command in pair.into_inner() {
                println!("  command rule: {:?} | text: {:?}", command.as_rule(), command.as_str());
                for word in command.into_inner() {
                    println!("    word rule: {:?} | text: {:?}", word.as_rule(), word.as_str());
                    for inner in word.into_inner() {
                        println!("      inner rule: {:?} | text: {:?}", inner.as_rule(), inner.as_str());
                    }
                }
            }
        }
    }
}