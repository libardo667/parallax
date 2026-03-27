# Surfaced, Actionable Error Handling

## Metadata

- ID: 009
- Title: Surfaced, Actionable Error Handling
- Type: major
- Owner: unassigned
- Status: ready
- Risk: medium
- Target Window: TBD
- Depends On: none

## Problem

Failure states are often silent, console-only, or too vague for normal users to
recover from.

Concrete evidence:

- user impact: invalid keys, rate limits, and malformed model output can leave
  the UI in an unclear state
- operational impact: debugging depends too heavily on console inspection
- correctness impact: fallback paths can mask whether the requested workflow
  actually succeeded

## Proposed Solution

Define a user-visible error taxonomy for the main run pipeline and present
plain-English next steps for each major failure class. Extend the current
notification and status surfaces instead of building a separate reporting path.

Planned file-level touchpoints:

- `js/api/llm.js`
- `js/api/json-recovery.js`
- `js/pipeline/launch-expedition.js`
- `js/ui/notifications.js`
- `js/ui/setup-panel.js`
- `proxy_server.mjs` for clearer upstream error payloads where appropriate

## Files Affected

- `js/api/llm.js`
- `js/api/json-recovery.js`
- `js/pipeline/launch-expedition.js`
- `js/ui/notifications.js`
- `js/ui/setup-panel.js`
- `proxy_server.mjs`

## Non-Goals

- eliminating all fallbacks or retry logic
- adding backend persistence for every transient client-side warning

## Acceptance Criteria

- [ ] Core failure modes produce visible user-facing messages with specific next
      actions
- [ ] Silent console-only failures on the default run path are reduced or
      eliminated
- [ ] Error handling extends the current notification and pipeline surfaces

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing LLM call, recovery, and
  run-launch flow
- Parallel path introduced: none
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: error matrices and verification notes go
  under `improvements/evidence/`
- Flag lifecycle (if applicable): none

## Risks and Rollback

Risks:

- over-eager error handling can produce noisy UI states
- user-facing error copy can drift from actual recovery options

Rollback:

- revert the new message mapping while preserving existing call behavior

## Follow-up Candidates

- observability instrumentation for error-rate tracking
