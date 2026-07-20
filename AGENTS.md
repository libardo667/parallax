# Agent Entry Guide

This repository uses the lightweight work-item system under `improvements/`
for non-trivial changes. Keep the runtime simple and do not introduce a
parallel implementation path for behavior that already has an owner.

## Project Anchors

- Durable product and engineering direction: `improvements/PRODUCT_PLAN.md`
- Concise product and architecture intent: `improvements/VISION.md`
- Active roadmap and backlog framing: `improvements/ROADMAP.md`
- Canonical commands and validation path: `improvements/COMMAND_SURFACE.md`
- Portable run format: `improvements/RUN_SCHEMA.md`
- Local work-item schemas: `improvements/MAJOR_SCHEMA.md`,
  `improvements/MINOR_SCHEMA.md`
- Portable harness policy and templates: `improvements/harness/README.md`

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
6. Treat `_archive/` as historical context, not active product surface.
