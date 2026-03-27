# Model Selector Dropdown

## Metadata

- ID: 101
- Title: Model Selector Dropdown
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

The current free-text model input is error-prone and gives users little
guidance about supported or recommended model choices.

## Proposed Solution

Replace the text field with a curated dropdown of tested models, include
lightweight speed or quality labels, and keep an escape hatch for custom model
IDs.

## Files Affected

- `index.html`
- `js/ui/setup-panel.js`
- `js/api/provider.js`
- `css/styles.css`

## Acceptance Criteria

- [ ] Users can choose from a curated list of supported model presets
- [ ] The UI still permits custom model entry when needed
- [ ] The change stays within the existing setup panel and provider config path

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing model-config controls in `js/ui/setup-panel.js`
- Parallel path introduced: none
- Artifact output target: `improvements/evidence/` for option audit notes
- Default-path impact: core_path

## Risks and Rollback

- Risk: stale preset lists can become misleading as providers change
- Rollback: restore the existing free-text input path
