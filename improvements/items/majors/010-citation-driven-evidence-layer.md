# Citation-Driven Evidence Layer

## Metadata

- ID: 010
- Title: Citation-Driven Evidence Layer
- Type: major
- Owner: unassigned
- Status: ready
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

Citation count currently influences visualization, but the evidence itself is
still under-surfaced and provenance is not explicit enough.

Concrete evidence:

- user impact: users cannot easily inspect why a term exists or where support
  came from
- operational impact: evidence remains tucked behind modal-heavy power-user UI
- correctness impact: there is no explicit distinction between user-provided and
  model-retrieved citation sources

## Proposed Solution

Promote citations into a first-class discovery layer:

- show top sources in the controls or detail surfaces
- expose supporting evidence inline for selected terms
- add a citation-quality filter
- tag citation provenance by cross-referencing run citations against
  `cfg.sourceUrls`

Planned file-level touchpoints:

- `js/domain/citations.js`
- `js/domain/news-sources.js`
- `js/ui/evidence-modal-ui.js`
- `js/ui/lens-dashboard.js`
- `js/plot/term-detail.js`
- `js/core/state.js`

## Files Affected

- `js/domain/citations.js`
- `js/domain/news-sources.js`
- `js/ui/evidence-modal-ui.js`
- `js/ui/lens-dashboard.js`
- `js/plot/term-detail.js`
- `js/core/state.js`

## Non-Goals

- replacing the current citation collection mechanism
- treating model-retrieved citations as invalid by default

## Acceptance Criteria

- [ ] Users can inspect inline supporting evidence for terms without relying
      solely on the existing modal flow
- [ ] Citation provenance is labeled as provided or model-retrieved where
      applicable
- [ ] Evidence filters and surfaces reuse the current citation data model

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing citation collection and term
  detail flows
- Parallel path introduced: none
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: evidence comparisons or provenance audit
  notes go under `improvements/evidence/`
- Flag lifecycle (if applicable): none

## Risks and Rollback

Risks:

- provenance heuristics can be imperfect for normalized or redirected URLs
- evidence-heavy UI can overload the term-detail surface

Rollback:

- revert new citation UI layers while leaving the current modal and data model in
  place

## Follow-up Candidates

- shareable evidence views once citation UX is stable
