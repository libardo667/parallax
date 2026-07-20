# Run Schema

Parallax run files are durable, portable snapshots of a completed exploration.
`js/domain/run-metadata.js` is the authoritative writer and
`js/io/run-migration.js` is the only compatibility boundary for imports.

## Current Version

Schema version `7` is the first schema after retirement of the Wolfram and
cellular-automaton experiments. New snapshots and exports must set
`schemaVersion` to the `CURRENT_RUN_SCHEMA_VERSION` constant rather than
copying the number into another module.

## Canonical Top-Level Shape

- Identity: `schemaVersion`, `runId`, `target`, `generatedAt`, and optional
  `exportedAt`
- Inputs and results: `config`, `sourcePolicy`, `discs`, `probeResults`, and
  `synthResult`
- Map and evidence: `terms`, `citations`, `embeddingDiagnostics`, and optional
  `semanticEdges`
- Reproducibility metadata: compact `auditTrail` entries without prompts,
  request bodies, or provider responses
- User-facing outputs: `artifacts`, `report`, `claimsLedger`,
  `redTeamCritique`, `replication`, `outline`, and `markdown`

Disc IDs and term slice references are zero-based and contiguous. Citation IDs
may be sparse, but every ID attached to a term must resolve to a top-level
citation. Source types use the application vocabulary in
`js/core/constants.js`.

## Compatibility Policy

- Legacy data is accepted only through `migrateImportedRun`.
- Migration removes retired fields, calls, citations, disciplines, terms, and
  artifacts, then remaps surviving disc references.
- Application state is hydrated only from the migrated result.
- Active examples are rewritten to the current version; they are not legacy
  compatibility fixtures.
- Historical raw exports may remain under `_archive/`, outside the default
  runtime and validation path.

## Validation

`node scripts/check-static.mjs` verifies that every active sample uses the
current schema, stays under 2 MiB, and contains no retired paths. Migration
behavior is covered by `node --test scripts/domain-tests.mjs`.
