# Hybrid RSS and LLM-Augmented News Search

## Metadata

- ID: 015
- Title: Hybrid RSS and LLM-Augmented News Search
- Type: major
- Owner: unassigned
- Status: in_progress
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

The current Lens discovery path relies on a relatively small RSS corpus and can
produce thin coverage compared to dedicated news aggregators.

Concrete evidence:

- user impact: some perspective columns can return too few strong articles
- operational impact: the discovery layer is constrained by the current static
  feed list
- correctness impact: sparse article pools can distort perspective balance

## Proposed Solution

Expand the discovery system in two layers:

- Tier 1: broaden the static RSS feed inventory
- Tier 2: add query generation plus optional dynamic search backends, with a
  blocking gate when the initial results are too sparse

The implementation should extend the existing Lens discovery flow and keep
Google News RSS as the guaranteed free baseline, while optional Brave and
NewsAPI connectors remain additive.

Planned file-level touchpoints:

- `js/domain/news-sources.js`
- `js/ui/setup-panel.js`
- `proxy_server.mjs`
- `js/api/provider.js` or related fetch utilities if client capabilities wiring
  expands

## Files Affected

- `js/domain/news-sources.js`
- `js/ui/setup-panel.js`
- `proxy_server.mjs`
- `js/api/provider.js`

## Non-Goals

- replacing the existing Lens source-selection UX wholesale
- requiring paid search APIs for the baseline product path

## Acceptance Criteria

- [ ] Static RSS coverage expands materially across Lens columns
- [ ] Sparse-result flows can escalate into dynamic search with explicit user
      control
- [ ] Search capability discovery and result normalization are handled inside
      the current Lens discovery architecture

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing Lens source discovery in
  `js/domain/news-sources.js` and `js/ui/setup-panel.js`
- Parallel path introduced: none; dynamic search augments the current discovery
  path rather than creating a second Lens pipeline
- Optional/harness behavior on default path: optional paid search providers stay
  off the core free path
- Generated artifacts + archive target: search audits, feed matrices, and
  relevance comparisons go under `improvements/evidence/`
- Flag lifecycle (if applicable): provider flags must define default off/on,
  owner, and retirement conditions

## Risks and Rollback

Risks:

- dynamic search adds latency and UI complexity
- provider-specific integrations can create maintenance drag

Rollback:

- disable dynamic search providers and retain the expanded static RSS baseline

## Follow-up Candidates

- observability around result sparsity and fetch latency
