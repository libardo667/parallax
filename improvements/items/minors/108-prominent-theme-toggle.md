# Prominent Theme Toggle

## Metadata

- ID: 108
- Title: Prominent Theme Toggle
- Type: minor
- Owner: unassigned
- Status: ready
- Risk: low

## Problem

Theme support exists, but the toggle is too buried and the initial load does not
fully respect system preference.

## Proposed Solution

Move theme switching into a more visible top-level control and seed first-load
theme choice from `prefers-color-scheme`.

## Files Affected

- `index.html`
- `css/styles.css`
- `js/ui/theme.js`
- `js/ui/bootstrap.js`

## Acceptance Criteria

- [ ] Users can find theme switching from a top-level control
- [ ] First load respects system theme preference when no explicit choice is
      stored
- [ ] The implementation stays inside the existing theme module and UI shell

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing theme state and UI shell
- Parallel path introduced: none
- Artifact output target: theme audit screenshots go under `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: topbar crowding if the control is added without layout adjustments
- Rollback: restore the previous theme-toggle location and behavior
