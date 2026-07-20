# Canonical Run Schema and Legacy CA Retirement

## Metadata

- ID: 016
- Title: Canonical Run Schema and Legacy CA Retirement
- Type: major
- Owner: Codex
- Status: completed
- Risk: high
- Target Window: Phase 0
- Depends On: 004

## Problem

Wolfram and cellular-automaton experiments are no longer part of Parallax's
product direction, but their state, UI, prompts, artifacts, diagnostics, and
sample data remain threaded through the default runtime. Imported runs also
carry large legacy structures without a single testable migration boundary.

The working tree had also dropped the root command aliases while documentation
and CI still depended on them, leaving the default validation path inconsistent
even though the direct Node commands worked.

## Proposed Solution

Establish a canonical CA-free run schema and one DOM-free migration module for
old imports. Remove the active CA/Wolfram runtime path, compact active samples
to the canonical schema, and restore dependency-free npm aliases for the direct
Node validation tools.

The importer will accept legacy runs for a bounded compatibility period, strip
retired fields recursively, remap probe indices when legacy CA disciplines are
removed, and return only canonical data to the application.

## Files Affected

- `js/io/run-migration.js`
- `js/io/import-export-run.js`
- `js/domain/run-metadata.js`
- `js/core/state.js`
- `js/pipeline/launch-expedition.js`
- `js/pipeline/reruns.js`
- `js/artifacts/`
- `js/plot/`
- `js/ui/`
- `js/prompt/prompt-builders.js`
- `index.html`
- `css/styles.css`
- `sample_runs/`
- `scripts/`
- `improvements/COMMAND_SURFACE.md`

## Non-Goals

- redesigning the Explore or Lens experience in this slice
- changing the probe/synthesis taxonomy
- replacing native ES modules or adding a framework
- permanently supporting CA behavior in imported runs

## Acceptance Criteria

- [x] Newly created and exported runs use a documented CA-free schema version
- [x] Legacy Wolfram/CA fields are removed at one tested import boundary
- [x] Legacy CA disciplines and their slice references are safely removed
- [x] No active UI, runtime, prompt, artifact, or diagnostics path references
      Wolfram or cellular automata
- [x] Active sample runs conform to the canonical schema and remain loadable
- [x] Default static, domain, and server smoke validation commands pass through
      stable root aliases without installing dependencies

## Validation Commands

- `npm run quality:strict`
- `git diff --check`

## Pruning Prevention Controls

- Authoritative path for run compatibility: `js/io/run-migration.js`
- Authoritative current-run serializer: `js/domain/run-metadata.js`
- Parallel path introduced: none
- Legacy compatibility lifecycle: import-only, covered by fixtures, removable
  after supported legacy samples have been migrated
- Generated artifacts and evidence: active examples stay under `sample_runs/`;
  one-off historical exports stay under `_archive/` or `improvements/history/`

## Risks and Rollback

Risks:

- removing legacy disciplines can invalidate term slice indices
- over-broad recursive pruning can remove unrelated data
- compacting samples can remove audit material users expected to inspect
- cross-module imports may conceal CA dependencies until runtime

Rollback:

- restore the deleted CA modules and hooks from Git
- keep the new migration module isolated so schema cleanup can remain even if
  runtime retirement must be reverted
- retain original historical exports in Git history and `_archive/`

## Follow-up Candidates

- canonical serializable run state separate from UI state
- sample fixture size budgets in static validation
- schema-version support and retirement policy
- progressive-disclosure UX work from Phase 1
