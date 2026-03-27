# Minor Schema

Use this schema for focused, low-risk improvements with a tight file boundary.

## Storage and Naming

- Store files under `improvements/items/minors/`
- Recommended filename: `NNN-short-slug.md`

## Required Sections

1. Metadata
2. Problem
3. Proposed Solution
4. Files Affected
5. Acceptance Criteria
6. Validation Commands
7. Pruning Prevention Controls
8. Risks and Rollback

## Required Metadata

- ID
- Title
- Type: `minor`
- Owner
- Status: `backlog|ready|in_progress|blocked|verify|done|archived`
- Risk: `low|medium`

## Local Rules

- Minors should stay within a declared, reviewable file boundary.
- Validation should use the canonical commands from
  `improvements/COMMAND_SURFACE.md`, plus any touched-surface command needed by
  the item.
- Use `improvements/harness/templates/MINOR_ITEM_TEMPLATE.md` as the base
  template.
