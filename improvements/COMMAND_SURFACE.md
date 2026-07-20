# Command Surface

This document defines Parallax's stable local command surface.

## Canonical Commands

- Setup/install: Node.js 18+ is required; there are no runtime dependencies to
  install.
- Run the local app and proxy: `npm run start`
- Run domain tests: `npm test`
- Run static and sample-schema checks: `npm run check`
- Run the server smoke test: `npm run smoke`
- Run the full validation path: `npm run quality:strict`

The scripts are thin aliases around direct Node commands. No build step or
package installation is required.

## Default Validation Path

The strict validation path is `npm run quality:strict`, which runs static and
schema checks, domain tests, and the local server smoke test in that order.

Together they validate syntax and local assets, the canonical run schema and
migration boundary, domain behavior, and the default static frontend plus local
proxy workflow.

## Optional Paths

The following are outside the default validation path unless a work item says
otherwise:

- archived sample-generation or historical analysis artifacts
- historical planning and evidence files under `improvements/`

## Artifact Boundaries

- Source-of-truth runtime files stay in the repo root, `js/`, `css/`,
  `sample_runs/`, and other files needed to run the app.
- Generated evidence, retrospectives, manifests, and historical outputs should
  go under `improvements/evidence/` or `improvements/history/`.
- Do not place generated artifacts beside runtime source files unless the app
  directly requires them.
