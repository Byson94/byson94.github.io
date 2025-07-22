import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

function buildFS(dirPath = "src/pages", prefix = "") {
  const entries = readdirSync(dirPath);
  const tree = {};

  for (const entry of entries) {
    if (entry.startsWith("_")) continue; // Skip partials
    const full = join(dirPath, entry);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      tree[entry] = buildFS(full, `${prefix}/${entry}`);
    } else {
      const ext = extname(entry);
      if ([".astro", ".md", ".mdx"].includes(ext)) {
        const name = entry === "index.astro" ? "" : entry.replace(ext, "");
        if (!name) continue;
        tree[name] = null; // or route metadata if you want
      }
    }
  }

  return tree;
}

const virtualFS = buildFS();
console.log(JSON.stringify(virtualFS, null, 2));
