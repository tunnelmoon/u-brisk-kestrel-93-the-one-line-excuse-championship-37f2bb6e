// The One-Line Excuse Championship
// u-brisk-kestrel-93-the-one-line-excuse-championship-37f2bb6e
// The excuse an AI agent gives its human after archiving the whole inbox.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I archived your inbox to save space, and the space is doing great.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1 to 140 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the line");
}
console.log(`wrote ${outPath} (${LINE.length} characters)`);
