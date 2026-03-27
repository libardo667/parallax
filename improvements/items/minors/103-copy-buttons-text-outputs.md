# Copy Buttons on All Text Outputs

## Metadata

- ID: 103
- Title: Copy Buttons on All Text Outputs
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

Artifact text outputs require manual selection and copy, which is slow and
inconsistent across the current output surfaces.

## Proposed Solution

Add a consistent copy action to text-based artifact cards and output panels
using the existing artifact UI components.

## Files Affected

- `js/ui/artifact-drawer-ui.js`
- `js/ui/lens-dashboard.js`
- `css/styles.css`

## Acceptance Criteria

- [ ] Text artifacts expose an obvious copy action
- [ ] Copy interactions are consistent across the major text output surfaces
- [ ] The implementation reuses current artifact rendering paths

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing artifact rendering components
- Parallel path introduced: none
- Artifact output target: `improvements/evidence/` for UI verification notes
- Default-path impact: core_path

## Risks and Rollback

- Risk: copy affordances can clutter dense artifact cards if styled poorly
- Rollback: remove the copy-action UI and keep existing artifact rendering
