import { spawn } from "node:child_process";

const port = 9100 + Math.floor(Math.random() * 400);
const server = spawn(process.execPath, ["proxy_server.mjs"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: String(port)
  },
  stdio: "pipe"
});

function cleanup() {
  if (!server.killed) server.kill();
}

async function waitForServer() {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("Timed out waiting for local proxy to start");
}

async function assertJson(url, predicate, label) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${label} returned ${res.status}`);
  }
  const body = await res.json();
  if (!predicate(body)) {
    throw new Error(`${label} returned an unexpected payload`);
  }
}

async function main() {
  let stderr = "";
  server.stderr.on("data", chunk => {
    stderr += chunk.toString();
  });

  await waitForServer();

  const indexRes = await fetch(`http://127.0.0.1:${port}/`);
  const indexHtml = await indexRes.text();
  if (!indexRes.ok || !indexHtml.includes("PARALLAX")) {
    throw new Error("GET / did not return the expected application shell");
  }

  await assertJson(
    `http://127.0.0.1:${port}/api/sample-runs`,
    body => Array.isArray(body),
    "GET /api/sample-runs"
  );

  await assertJson(
    `http://127.0.0.1:${port}/api/news-search/capabilities`,
    body => body && body.googleNews === true,
    "GET /api/news-search/capabilities"
  );

  console.log(
    `smoke: verified /, /api/sample-runs, and /api/news-search/capabilities on port ${port}`
  );

  if (stderr.trim()) {
    console.log(`smoke: proxy stderr was non-empty\n${stderr.trim()}`);
  }
}

main()
  .catch(err => {
    console.error(`smoke failed: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => {
    cleanup();
  });
