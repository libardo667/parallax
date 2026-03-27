# Tooltip and Help Text Audit

## Metadata

- ID: 105
- Title: Tooltip and Help Text Audit
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

Several labels and settings still assume insider knowledge and are not explained
plainly enough in the UI.

## Proposed Solution

Audit cryptic labels, add plain-English tooltip or help copy where needed, and
focus especially on the CA probe and advanced settings language.

## Files Affected

- `index.html`
- `js/ui/setup-panel.js`
- `js/ui/modals.js`
- `css/styles.css`

## Acceptance Criteria

- [ ] Insider terminology in the main setup flow is clarified in-product
- [ ] CA probe and related advanced settings have plain-English explanations
- [ ] Help text is added within existing UI surfaces rather than new parallel
      docs-only flows

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: current setup-panel and modal help surfaces
- Parallel path introduced: none
- Artifact output target: help-copy audit notes go under `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: too much inline help can overload already-dense panels
- Rollback: trim or revert the new copy while keeping the existing control layout
