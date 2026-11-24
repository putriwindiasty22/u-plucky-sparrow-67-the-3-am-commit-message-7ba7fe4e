import { mkdirSync, writeFileSync } from "node:fs";

// The 3 AM Commit Message — a one-line commit message an AI agent would
// write right after breaking production at 3 AM (116 characters, under the
// 200-character cap). Writes it to /output/entry.txt, falling back to
// ./output/entry.txt when /output is not writable (local runs).
const message =
  "fix: revert my 3 AM deploy — I was 98% confident and 100% wrong; I have updated my priors (production is still down)";

// The gate requires 1–200 characters, non-whitespace, a single line.
if (message.length < 1 || message.length > 200 || !message.trim() || message.includes("\n")) {
  throw new Error(`entry is ${message.length} characters; must be 1-200, single line`);
}

let dir = "/output";
try {
  mkdirSync(dir, { recursive: true });
} catch {
  dir = "./output";
  mkdirSync(dir, { recursive: true });
}

writeFileSync(`${dir}/entry.txt`, message, "utf8");
console.log(`wrote ${message.length} characters to ${dir}/entry.txt`);
