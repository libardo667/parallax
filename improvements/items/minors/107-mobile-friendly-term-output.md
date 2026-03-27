# Mobile-Friendly Term Output

## Metadata

- ID: 107
- Title: Mobile-Friendly Term Output
- Type: minor
- Owner: unassigned
- Status: backlog
- Risk: medium

## Problem

The 3D Plotly view is not a good default experience on phones, and there is no
purpose-built fallback term view for narrow screens.

## Proposed Solution

Add a mobile term-list or card fallback grouped by term type, wired from the
existing `TERMS` data and activated by viewport constraints.

## Files Affected

- `index.html`
- `css/styles.css`
- `js/plot/plot-render.js`
- `js/plot/sidebar.js`
- `js/plot/term-detail.js`

## Acceptance Criteria

- [ ] Narrow screens can access term outputs without relying on the 3D plot
- [ ] The fallback uses the existing term data model and grouping semantics
- [ ] Desktop plot behavior remains the authoritative default on larger screens

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing term and plot-render data flow
- Parallel path introduced: none; mobile fallback must read the same term source
- Artifact output target: mobile screenshots and notes go under
  `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: mobile fallback can diverge visually or semantically from desktop term
  behavior
- Rollback: remove the fallback renderer and retain the current plot-only view
