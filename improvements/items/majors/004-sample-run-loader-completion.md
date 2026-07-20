# Try It Without an API Key - Sample Run Loader Completion

## Metadata

- ID: 004
- Title: Try It Without an API Key - Sample Run Loader Completion
- Type: major
- Owner: unassigned
- Status: done
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

The sample-run loader exists, but the library is limited and older sample runs
are currently incompatible with the active import path.

Concrete evidence:

- user impact: users without an API key still have a thin demo library
- operational impact: sample assets are managed manually and older artifacts are
  stranded in `_archive/`
- correctness impact: legacy exports cannot be imported without migration or
  regeneration

## Proposed Solution

Finish the sample-run path by expanding the compatible library and deciding on a
stable compatibility strategy:

- regenerate legacy runs with the current schema, or
- add a migration shim in the import path for older exports

Also formalize which sample files are runtime source-of-truth versus archived
history.

Planned file-level touchpoints:

- `proxy_server.mjs` for sample-run listing behavior if labels or metadata grow
- `js/io/import-export-run.js` for schema migration logic
- `js/io/run-history.js` if imported legacy runs need normalization
- `js/ui/setup-panel.js` and related UI hooks for example selection
- `sample_runs/` for active example assets
- `_archive/` or `improvements/history/` for historical artifacts

## Files Affected

- `proxy_server.mjs`
- `js/io/import-export-run.js`
- `js/io/run-history.js`
- `js/ui/setup-panel.js`
- `sample_runs/`
- `improvements/history/`

## Non-Goals

- replacing the existing import/export format wholesale
- building a hosted public sample-run store

## Acceptance Criteria

- [x] The example loader supports a broader active sample library than the
      current minimal set
- [x] Legacy sample assets are either migrated in code or regenerated with the
      current schema
- [x] Runtime sample assets and archived historical outputs have a clear storage
      boundary

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: `js/io/import-export-run.js` and
  existing `/api/sample-runs` listing in `proxy_server.mjs`
- Parallel path introduced: none; legacy support must extend the current import
  path rather than creating a second loader
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: regenerated or retired legacy files go
  to `improvements/history/`; active examples remain in `sample_runs/`
- Flag lifecycle (if applicable): none

## Risks and Rollback

Risks:

- migration shims can ossify if they are too permissive
- regenerated sample assets can diverge from current UX expectations

Rollback:

- remove the compatibility shim or revert new sample assets while preserving the
  existing working loader

## Follow-up Candidates

- onboarding/demo polish once the sample library is stable
