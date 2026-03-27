# Onboarding Flow

## Metadata

- ID: 003
- Title: Onboarding Flow
- Type: major
- Owner: unassigned
- Status: ready
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

There is still no first-run path that explains what a run is, what the term
types mean, or how the Explore and Lens outputs should be read.

Concrete evidence:

- user impact: first-time users enter a technically dense UI with little
  orientation and can abandon before completing a run
- operational impact: onboarding gaps shift explanation burden into docs,
  support, and ad hoc walkthroughs
- correctness impact: users can misread convergent, emergent, contradictory,
  and unique terms, reducing trust in outputs

## Proposed Solution

Add a lightweight onboarding layer on top of the existing UI:

- a skippable 3-step intro tour for first-time users
- contextual plain-English explanations of the term taxonomy
- a no-key guided demo path that points to an existing sample run or demo flow

Planned file-level touchpoints:

- `index.html` for onboarding anchors and explainer surfaces
- `css/styles.css` for tour and help UI styling
- `js/ui/bootstrap.js` for first-run initialization
- `js/ui/setup-panel.js` for entry-point prompts and guided-start hooks
- `js/ui/modals.js` or a dedicated onboarding UI module for tour presentation
- `sample_runs/` only if a curated guided demo artifact is added

## Files Affected

- `index.html`
- `css/styles.css`
- `js/ui/bootstrap.js`
- `js/ui/setup-panel.js`
- `js/ui/modals.js`
- `sample_runs/`

## Non-Goals

- redesigning the core probe or synthesis pipeline
- building a full separate docs site or video onboarding system

## Acceptance Criteria

- [ ] First-time users see a skippable onboarding sequence before or during the
      first run path
- [ ] The four term types are explained contextually in plain English within the
      product
- [ ] A no-key guided demo path is reachable from the onboarding flow

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing entry and setup flow in
  `js/ui/bootstrap.js` and `js/ui/setup-panel.js`
- Parallel path introduced: none
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: any tour screenshots or notes go under
  `improvements/evidence/`
- Flag lifecycle (if applicable): temporary onboarding rollout flag only if
  needed; default `on`; retire after rollout stabilizes

## Risks and Rollback

Risks:

- overlays can interfere with controls on small viewports
- stale onboarding copy can drift from the actual UI

Rollback:

- disable or revert the onboarding UI module without changing the analysis
  pipeline

## Follow-up Candidates

- 105 Tooltip and Help Text Audit
- sample-run curation follow-up if the demo path needs dedicated assets
