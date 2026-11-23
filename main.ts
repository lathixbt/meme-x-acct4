// make.fun entry: "Post a GTA 6 meme on X" (gta6-meme-x-01), account 4.
// The meme itself is posted on X by the account owner. This program's only
// job is to hand the grader the post's address: it reads POST.json next to
// itself and writes an identical copy into the harness output directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(repoRoot, "POST.json"), "utf8");
const record = JSON.parse(raw) as { url?: unknown };
if (typeof record.url !== "string" || !record.url.startsWith("https://x.com/")) {
  throw new Error("POST.json needs a url string pointing at an x.com post");
}
if (!/\/status\/[^/]+$/.test(record.url)) {
  throw new Error("POST.json url must be an x.com post address");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POST.json"), raw);
