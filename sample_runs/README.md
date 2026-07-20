# Sample Runs

This folder holds runtime source-of-truth example runs that should appear in the
`LOAD AN EXAMPLE` flow.

Rules:

- Keep active sample assets here when they are meant to be selectable in the UI.
- Keep historical, superseded, or one-off export artifacts in `_archive/` or
  `improvements/history/`.
- If an older sample needs compatibility cleanup, prefer migrating it in
  `js/io/import-export-run.js` rather than creating a separate loader path.
- Active samples use the current schema from `js/io/run-migration.js`, contain
  no retired CA/Wolfram data, and stay below 2 MiB each.
- Run `node scripts/migrate-sample-runs.mjs` after changing the canonical
  migration, then run `node scripts/check-static.mjs`.
