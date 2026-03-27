# Command Surface

This document defines the stable command surface for harness work in this repo.

## Canonical Commands

- Setup/install: Node.js 18+ is required. There are currently no root runtime
  dependencies to install.
- Run backend: `npm run start`
- Run frontend: `npm run start`
- Run tests: `npm run smoke`
- Run static checks: `npm run check`
- Run strict validation: `npm run quality:strict`
- Run production-like local stack: `npm run start`

## Default Validation Path

Production-critical validation uses only:

- `npm run check`
- `npm run smoke`
- `npm run quality:strict`

These commands validate the default static frontend plus local proxy workflow.

## Optional Paths

The following are outside the default validation path unless a work item says
otherwise:

- `tools/` helper workspace
- archived sample-generation or historical analysis artifacts
- harness documentation and planning files under `improvements/`

## Artifact Boundaries

- Source-of-truth runtime files stay in the repo root, `js/`, `css/`,
  `sample_runs/`, and other files needed to run the app.
- Generated evidence, retrospectives, manifests, and historical outputs should
  go under `improvements/evidence/` or `improvements/history/`.
- Do not place generated artifacts beside runtime source files unless the app
  directly requires them.
