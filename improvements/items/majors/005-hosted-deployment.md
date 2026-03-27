# Hosted Deployment with Server-Side Key Management

## Metadata

- ID: 005
- Title: Hosted Deployment with Server-Side Key Management
- Type: major
- Owner: unassigned
- Status: backlog
- Risk: high
- Target Window: TBD
- Depends On: none

## Problem

The current product requires local setup, environment variables, and a manual
proxy start before a user can see the app.

Concrete evidence:

- user impact: the setup barrier is too high for non-developers
- operational impact: there is no canonical hosted runtime or deployment target
- correctness impact: local-only key handling and environment assumptions make
  the product path inconsistent across machines

## Proposed Solution

Add a deployable hosted stack with server-side key management and rate-limited
session handling. The work should define one authoritative deployment model for
the current app shape and avoid fragmenting the runtime into multiple long-term
hosting paths.

Planned file-level touchpoints:

- `proxy_server.mjs` or a deployment-specific server adapter
- root deployment config files for Railway, Render, Workers, or equivalent
- `README.md` and `improvements/COMMAND_SURFACE.md` for hosted versus local run
  guidance
- environment management docs and release evidence under `improvements/`

## Files Affected

- `proxy_server.mjs`
- `README.md`
- `improvements/COMMAND_SURFACE.md`
- deployment config files to be introduced at repo root
- `improvements/evidence/`

## Non-Goals

- adding multiple permanent hosting targets at once
- expanding the product surface beyond the current local proxy responsibilities

## Acceptance Criteria

- [ ] The repo defines one canonical hosted deployment target for the app
- [ ] API keys are managed server-side with a documented rate-limit or session
      protection strategy
- [ ] Local development remains supported without forking the runtime path

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: existing proxy entrypoint in
  `proxy_server.mjs`
- Parallel path introduced: temporary deployment adapter only if it has an
  explicit migration/removal plan
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: deployment test notes and rollout
  evidence go under `improvements/evidence/`
- Flag lifecycle (if applicable): hosted-only config flags must declare owner
  and retirement conditions

## Risks and Rollback

Risks:

- deployment-specific glue can fork the runtime path
- hosted key management introduces security and cost exposure

Rollback:

- disable hosted routing and fall back to the existing local proxy workflow

## Follow-up Candidates

- release-channel documentation
- production observability and incident templates
