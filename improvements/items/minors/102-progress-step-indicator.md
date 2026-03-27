# Progress Step Indicator

## Metadata

- ID: 102
- Title: Progress Step Indicator
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

Run progress is visible only as a spinner or coarse status, leaving users
without a clear sense of where they are in the pipeline.

## Proposed Solution

Add a clearer phase and step indicator for probe, synthesis, embedding, and
artifact-generation stages using the existing progress surfaces.

## Files Affected

- `js/pipeline/launch-expedition.js`
- `js/ui/setup-panel.js`
- `js/ui/lens-dashboard.js`
- `css/styles.css`

## Acceptance Criteria

- [ ] Users can see the current run phase in more detail than a generic spinner
- [ ] Explore and Lens flows both surface progress in their existing UI regions
- [ ] No separate parallel progress system is introduced

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing inline progress surfaces in setup and Lens flows
- Parallel path introduced: none
- Artifact output target: `improvements/evidence/` for before-after UX notes
- Default-path impact: core_path

## Risks and Rollback

- Risk: progress estimates can be misleading if they imply precision the system
  does not have
- Rollback: revert to the current coarse progress display
