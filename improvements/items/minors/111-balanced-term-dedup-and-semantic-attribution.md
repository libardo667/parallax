# Balanced Term Deduplication and Semantic Attribution

## Metadata

- ID: 111
- Title: Balanced Term Deduplication and Semantic Attribution
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: medium

## Problem

Balanced mode still carries too much label duplication, and synthesis can miss
convergence when similar ideas are phrased differently.

## Proposed Solution

Introduce a lighter deduplication pass for balanced mode and strengthen
synthesis prompts so convergence is judged semantically, not just by label
matching.

## Files Affected

- `js/pipeline/synthesis.js`
- `js/prompt/prompt-builders.js`
- `js/domain/terms.js`
- `js/core/constants.js`

## Acceptance Criteria

- [ ] Balanced mode performs a bounded near-synonym cleanup pass
- [ ] Synthesis prompts explicitly encourage semantic equivalence detection
- [ ] The change extends the current term and synthesis pipeline without a new
      duplicate cleanup path

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing synthesis and term-building pipeline
- Parallel path introduced: none
- Artifact output target: comparison runs and prompt notes go under
  `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: aggressive deduplication can collapse meaningful distinctions
- Rollback: remove the balanced-mode pass and restore current synthesis behavior
