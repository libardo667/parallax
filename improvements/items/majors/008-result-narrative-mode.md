# Result Narrative Mode

## Metadata

- ID: 008
- Title: Result Narrative Mode
- Type: major
- Owner: unassigned
- Status: backlog
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

The current output surface is strongest for expert users, but it does not yet
offer a primary prose summary for users who want a readable take-away.

Concrete evidence:

- user impact: non-expert users can struggle to extract a concise takeaway from
  the plot and artifact set
- operational impact: the existing artifact generators are underused as primary
  outputs
- correctness impact: the product does not clearly establish which narrative is
  the authoritative user-facing synthesis

## Proposed Solution

Add a narrative-first result mode that synthesizes run outputs into a short,
shareable prose summary. For Lens mode, the narrative should become the primary
deliverable shown at run completion. The implementation should reuse existing
artifact-generation infrastructure rather than creating a separate narrative
pipeline.

Planned file-level touchpoints:

- `js/artifacts/artifact-generators.js`
- `js/pipeline/synthesis.js`
- `js/ui/artifact-drawer-ui.js`
- `js/ui/lens-dashboard.js`
- `index.html` and `css/styles.css` for the primary narrative surface

## Files Affected

- `js/artifacts/artifact-generators.js`
- `js/pipeline/synthesis.js`
- `js/ui/artifact-drawer-ui.js`
- `js/ui/lens-dashboard.js`
- `index.html`
- `css/styles.css`

## Non-Goals

- replacing the 3D plot or deep report surfaces
- adding a second unrelated synthesis stack

## Acceptance Criteria

- [ ] Runs can produce a concise prose synthesis from existing run data
- [ ] Lens mode presents the narrative as a primary completion surface
- [ ] Narrative generation is implemented as an extension of the current
      artifact pipeline

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing synthesis and artifact
  generation pipeline
- Parallel path introduced: none
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: prompt experiments or output comparisons
  go under `improvements/evidence/`
- Flag lifecycle (if applicable): temporary rollout flag only if needed

## Risks and Rollback

Risks:

- a new narrative layer can duplicate existing artifact responsibilities
- poor prompt framing can produce weak or overly generic summaries

Rollback:

- revert the narrative surface while preserving existing artifacts and plot flow

## Follow-up Candidates

- shareable results once narrative output is stable
