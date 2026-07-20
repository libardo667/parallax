import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import {
  CURRENT_RUN_SCHEMA_VERSION,
  findRetiredRunPaths
} from "../js/io/run-migration.js";

const ROOT = process.cwd();
const REQUIRED_FILES = [
  "index.html",
  "proxy_server.mjs",
  "js/main.js",
  "js/io/run-migration.js",
  "css/styles.css",
  "README.md",
  "AGENTS.md",
  "improvements/PRODUCT_PLAN.md",
  "improvements/RUN_SCHEMA.md",
  "improvements/VISION.md",
  "improvements/ROADMAP.md",
  "improvements/COMMAND_SURFACE.md"
];

async function assertExists(relPath) {
  await access(path.join(ROOT, relPath));
}

function isLocalAsset(ref) {
  return ref
    && !ref.startsWith("http://")
    && !ref.startsWith("https://")
    && !ref.startsWith("data:")
    && !ref.startsWith("#");
}

async function collectFiles(dir, exts, acc = []) {
  const absDir = path.join(ROOT, dir);
  const entries = await readdir(absDir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(relPath, exts, acc);
      continue;
    }
    if (exts.has(path.extname(entry.name))) acc.push(relPath);
  }
  return acc;
}

function runNodeCheck(relPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--check", relPath], {
      cwd: ROOT,
      stdio: "pipe"
    });
    let stderr = "";
    child.stderr.on("data", chunk => {
      stderr += chunk.toString();
    });
    child.on("exit", code => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(stderr.trim() || `Syntax check failed for ${relPath}`));
    });
    child.on("error", reject);
  });
}

async function main() {
  for (const relPath of REQUIRED_FILES) {
    await assertExists(relPath);
  }

  const html = await readFile(path.join(ROOT, "index.html"), "utf8");
  const refs = [
    ...html.matchAll(/<(?:script|img)[^>]+src=["']([^"']+)["']/gi),
    ...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)
  ]
    .map(match => match[1])
    .filter(isLocalAsset);

  for (const ref of refs) {
    await assertExists(ref);
  }

  const syntaxTargets = [
    "proxy_server.mjs",
    ...(await collectFiles("js", new Set([".js", ".mjs"]))),
    ...(await collectFiles("scripts", new Set([".js", ".mjs"])))
  ];

  for (const relPath of syntaxTargets) {
    await runNodeCheck(relPath);
  }

  const sampleRunFiles = await collectFiles("sample_runs", new Set([".json"]));
  for (const relPath of sampleRunFiles) {
    const text = await readFile(path.join(ROOT, relPath), "utf8");
    if (Buffer.byteLength(text) > 2 * 1024 * 1024) {
      throw new Error(`${relPath} exceeds the 2 MiB active-sample budget`);
    }
    const run = JSON.parse(text);
    if (run.schemaVersion !== CURRENT_RUN_SCHEMA_VERSION) {
      throw new Error(`${relPath} uses schema ${run.schemaVersion ?? "none"}; expected ${CURRENT_RUN_SCHEMA_VERSION}`);
    }
    const retiredPaths = findRetiredRunPaths(run);
    if (retiredPaths.length) {
      throw new Error(`${relPath} contains retired data at ${retiredPaths.slice(0, 5).join(", ")}`);
    }
  }

  console.log(
    `check-static: verified ${REQUIRED_FILES.length} anchors, ${refs.length} HTML asset refs, ${syntaxTargets.length} JS files, ${sampleRunFiles.length} sample runs`
  );
}

main().catch(err => {
  console.error(`check-static failed: ${err.message}`);
  process.exitCode = 1;
});
