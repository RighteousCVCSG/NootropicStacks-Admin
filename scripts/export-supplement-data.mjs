import fs from "node:fs";
import path from "node:path";

const seedPath = path.resolve(import.meta.dirname, "../server/seed.ts");
const outPath = path.resolve(import.meta.dirname, "../client/src/data/supplements.json");

const src = fs.readFileSync(seedPath, "utf-8");

// Extract the supplementData array between "const supplementData = [" and "];"
const startMarker = "const supplementData = [";
const endMarker = "];";

const startIdx = src.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find supplementData array start");
  process.exit(1);
}

const arrayStart = startIdx + startMarker.length;
let depth = 0;
let endIdx = -1;
for (let i = arrayStart; i < src.length; i++) {
  if (src[i] === "[") depth++;
  else if (src[i] === "]") {
    if (depth === 0) { endIdx = i; break; }
    depth--;
  }
}
if (endIdx === -1) {
  console.error("Could not find end of supplementData array");
  process.exit(1);
}

let dataStr = src.slice(arrayStart, endIdx);
dataStr = dataStr.replace(/ as const/g, "");
dataStr = dataStr.replace(/:\s*null/g, ": null");

const supps = eval("[" + dataStr + "]");

fs.writeFileSync(outPath, JSON.stringify(supps, null, 2));
console.log(`Exported ${supps.length} supplements to supplements.json`);
