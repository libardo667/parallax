# Keyboard Shortcuts

## Metadata

- ID: 106
- Title: Keyboard Shortcuts
- Type: minor
- Owner: unassigned
- Status: backlog
- Risk: low

## Problem

The app is still keyboard-hostile for repeat users who want fast iteration
between runs and tabs.

## Proposed Solution

Add a bounded shortcut layer for run, tab switching, and target-input focus
using the existing top-level UI event system.

## Files Affected

- `js/main.js`
- `js/ui/bootstrap.js`
- `js/ui/tabs.js`
- `js/ui/setup-panel.js`

## Acceptance Criteria

- [ ] Users can trigger the primary run action with a keyboard shortcut
- [ ] Main-tab navigation supports a documented shortcut path
- [ ] Shortcut handling respects current focus context and avoids hijacking text
      inputs unnecessarily

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path: existing top-level tab and setup event flow
- Parallel path introduced: none
- Artifact output target: shortcut audit notes go under `improvements/evidence/`
- Default-path impact: core_path

## Risks and Rollback

- Risk: global shortcuts can conflict with browser or text-input expectations
- Rollback: remove the shortcut bindings and preserve current click-based flow
