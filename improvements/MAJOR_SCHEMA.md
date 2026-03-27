# Major Schema

Use this schema for multi-file, cross-cutting, or behavior-shaping work.

## Storage and Naming

- Store files under `improvements/items/majors/`
- Recommended filename: `NNN-short-slug.md`

## Required Sections

1. Metadata
2. Problem
3. Proposed Solution
4. Files Affected
5. Non-Goals
6. Acceptance Criteria
7. Validation Commands
8. Pruning Prevention Controls
9. Risks and Rollback
10. Follow-up Candidates

## Required Metadata

- ID
- Title
- Type: `major`
- Owner
- Status: `backlog|ready|in_progress|blocked|verify|done|archived`
- Risk: `low|medium|high`
- Target Window
- Depends On

## Local Rules

- The authoritative validation commands must come from
  `improvements/COMMAND_SURFACE.md` unless the item explicitly adds a justified
  extra command.
- Every major must identify the authoritative runtime path it is extending.
- Any generated artifact must include an archive target under `improvements/`.
- Use `improvements/harness/templates/MAJOR_ITEM_TEMPLATE.md` as the base
  template.
