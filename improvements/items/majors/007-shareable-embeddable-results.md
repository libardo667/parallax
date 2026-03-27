# Shareable and Embeddable Results

## Metadata

- ID: 007
- Title: Shareable and Embeddable Results
- Type: major
- Owner: unassigned
- Status: backlog
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

The product can export JSON, but it cannot generate stable shareable URLs or
embeddable result views.

Concrete evidence:

- user impact: users cannot send a run to someone else without sharing raw files
- operational impact: there is no canonical persistence model for shared runs
- correctness impact: sharing depends on manual export/import rather than a
  stable product contract

## Proposed Solution

Implement a stable result-sharing path using either:

- URL-embedded payloads for smaller results, or
- a server-side store keyed to stable run identifiers

The implementation should reuse the existing import/export and run-history shape
as much as possible and define a clear compatibility contract for shared data.

Planned file-level touchpoints:

- `js/io/import-export-run.js`
- `js/io/run-history.js`
- `js/ui/history-drawer-ui.js`
- `js/ui/artifact-drawer-ui.js`
- `proxy_server.mjs` if server-side persistence or retrieval is added

## Files Affected

- `js/io/import-export-run.js`
- `js/io/run-history.js`
- `js/ui/history-drawer-ui.js`
- `js/ui/artifact-drawer-ui.js`
- `proxy_server.mjs`

## Non-Goals

- building a full collaboration platform
- storing arbitrary user accounts or profiles

## Acceptance Criteria

- [ ] A completed run can produce a stable shareable link or embed handle
- [ ] Recipients can load a shared result without local file juggling
- [ ] The sharing format is documented as an extension of the current run schema

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing run import/export and
  history flows
- Parallel path introduced: none; shared results should extend the current run
  snapshot contract
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: sharing contract notes and test payloads
  go under `improvements/evidence/`
- Flag lifecycle (if applicable): any server-backed sharing flag must declare
  default and retirement plan

## Risks and Rollback

Risks:

- payload size can make URL-based sharing brittle
- server-backed sharing creates retention and abuse concerns

Rollback:

- disable the sharing surface and preserve existing local export/import

## Follow-up Candidates

- hosted deployment integration if server persistence is chosen
