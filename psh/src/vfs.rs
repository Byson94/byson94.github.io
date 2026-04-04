pub struct VfsNode {
    pub name: String,
    pub content: Option<String>,
    pub children: Vec<VfsNode>,
}

impl VfsNode {
    pub fn dir(name: &str, children: Vec<VfsNode>) -> Self {
        Self { name: name.to_string(), content: None, children }
    }

    pub fn file(name: &str, content: &str) -> Self {
        Self { name: name.to_string(), content: Some(content.to_string()), children: vec![] }
    }

    pub fn is_dir(&self) -> bool {
        self.content.is_none()
    }

    pub fn find(&self, name: &str) -> Option<&VfsNode> {
        self.children.iter().find(|c| c.name == name)
    }
}

pub fn build_vfs() -> VfsNode {
    VfsNode::dir("/", vec![
        VfsNode::file("about.txt", "I'm Byson94, a student passionate about Linux and low-level systems."),
        VfsNode::dir("projects", vec![
            VfsNode::file("psh.md", "A POSIX-ish shell compiled to WASM."),
            VfsNode::file("gitclone.md", "A fast git clone utility written in Rust."),
            VfsNode::file("others.md", r#"
Where are the others you ask? Well.... I am too lazy to add them.
There are literally like 10+ projects!
            "#),
        ]),
        VfsNode::dir("blog", vec![
            VfsNode::file("README.md", "Not a fan of blogs..."),
        ]),
    ])
}