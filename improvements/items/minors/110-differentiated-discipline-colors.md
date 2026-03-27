# Differentiated Discipline Colors in Lists

## Metadata

- ID: 110
- Title: Differentiated Discipline Colors in Lists
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

Discipline colors are strong in the plot but inconsistently represented in list
and detail views, weakening provenance legibility outside the graph.

## Proposed Solution

Carry existing discipline colors through list items, chips, or borders anywhere
term provenance is shown in text-based UI.

## Files Affected

- `css/styles.css`
- `js/plot/term-detail.js`
- `js/ui/lens-dashboard.js`
- `js/ui/artifact-drawer-ui.js`

## Acceptance Criteria

- [ ] Text and list views consistently surface discipline-color cues
- [ ] The colors come from the existing discipline model rather than a new
      parallel palette
- [ ] The change improves provenance legibility without cluttering the UI

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: current discipline-color assignments in runtime state
- Parallel path introduced: none
- Artifact output target: UI comparison screenshots go under
  `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: color chips can become visually noisy if applied indiscriminately
- Rollback: remove the additional list styling and keep current plot-only color
  emphasis
