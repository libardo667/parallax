import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  CURRENT_RUN_SCHEMA_VERSION,
  findRetiredRunPaths,
  migrateImportedRun
} from "../js/io/run-migration.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAMPLE_DIR = path.join(ROOT, "sample_runs");

async function main() {
  const filenames = (await readdir(SAMPLE_DIR))
    .filter(filename => filename.endsWith(".json"))
    .sort();

  for (const filename of filenames) {
    const absPath = path.join(SAMPLE_DIR, filename);
    const raw = JSON.parse(await readFile(absPath, "utf8"));
    const migrated = migrateImportedRun(raw, { compactAuditTrail: true });
    const retiredPaths = findRetiredRunPaths(migrated);
    if (retiredPaths.length) {
      throw new Error(`${filename} still contains retired paths: ${retiredPaths.slice(0, 5).join(", ")}`);
    }
    await writeFile(absPath, `${JSON.stringify(migrated, null, 2)}\n`, "utf8");
    console.log(`${filename}: schema ${CURRENT_RUN_SCHEMA_VERSION}`);
  }
}

main().catch(error => {
  console.error(`sample migration failed: ${error.message}`);
  process.exitCode = 1;
});
