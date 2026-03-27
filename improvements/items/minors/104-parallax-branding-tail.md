# App Branding and Identity Tail

## Metadata

- ID: 104
- Title: App Branding and Identity Tail
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

The Parallax rebrand is mostly complete, but a few visible identity tasks remain
unfinished.

## Proposed Solution

Close out the remaining branding tail:

- add a favicon
- add export metadata branding
- audit remaining docs and repo-facing references that still lag the rebrand

## Files Affected

- `index.html`
- `proxy_server.mjs`
- `js/io/import-export-run.js`
- `README.md`
- favicon asset files to be added under an appropriate static path

## Acceptance Criteria

- [ ] The app serves a Parallax favicon
- [ ] Exported run metadata includes app-brand identifiers if that contract is
      adopted
- [ ] Repo-facing docs no longer lag the current branding

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing brand strings and export metadata path
- Parallel path introduced: none
- Artifact output target: branding design notes go under `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: branded export metadata can create compatibility concerns for older
  imports if added carelessly
- Rollback: revert the remaining branding deltas independently
