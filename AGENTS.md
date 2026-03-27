# Agent Entry Guide

This repository uses the agentic harness in `improvements/harness/` as the
shared execution model for generative sculpting work.

## Project Anchors

- Product and architecture intent: `improvements/VISION.md`
- Active roadmap and backlog framing: `improvements/ROADMAP.md`
- Canonical commands and validation path: `improvements/COMMAND_SURFACE.md`
- Local work-item schemas: `improvements/MAJOR_SCHEMA.md`,
  `improvements/MINOR_SCHEMA.md`
- Portable harness policy and templates: `improvements/harness/README.md`
- Legacy product backlog detail: `majors_and_minors.md`
- Runtime architecture notes: `CLAUDE.md`

## Execution Rules

1. Map non-trivial work to a tracked item before implementation.
2. Extend the existing authoritative runtime path instead of creating parallel
   behavior paths.
3. Keep optional or experimental harness work off the default runtime and
   validation path unless a tracked item explicitly promotes it.
4. Use the canonical commands from `improvements/COMMAND_SURFACE.md` for
   validation evidence.
5. Store generated evidence and large historical artifacts under
   `improvements/history/` or `improvements/evidence/`, not in source-of-truth
   runtime paths.
