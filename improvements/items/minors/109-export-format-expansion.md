# Export Format Expansion

## Metadata

- ID: 109
- Title: Export Format Expansion
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

The export surface is still centered on raw JSON and leaves easy CSV or Markdown
handoff workflows underexposed.

## Proposed Solution

Expose additional export actions for term CSV and clean Markdown output using
the existing artifact-generation and export infrastructure.

## Files Affected

- `js/artifacts/exporters.js`
- `js/artifacts/artifact-generators.js`
- `js/ui/artifact-drawer-ui.js`
- `js/ui/history-drawer-ui.js`

## Acceptance Criteria

- [ ] Users can export terms as CSV
- [ ] Users can access a cleaner Markdown-oriented export path
- [ ] Additional export formats extend the existing exporter surface rather than
      duplicating run serialization

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing exporter and artifact-generation modules
- Parallel path introduced: none
- Artifact output target: export-format audit files go under
  `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: export actions can drift into multiple competing serialization paths
- Rollback: remove added export actions and keep current JSON export behavior
