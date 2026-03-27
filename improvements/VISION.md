# Vision

## Product Intent

Parallax is a concept-mapping and source-analysis tool that helps a user see a
topic from multiple vantage points and triangulate the shape of the idea.

It has two primary user journeys:

- **Parallax Explore**: concept-first, plot-primary analysis.
- **Parallax Lens**: source-first, text-primary analysis with the 3D map as an
  optional follow-on view.

The authoritative backlog and detailed feature rationale currently live in
`majors_and_minors.md`.

## Engineering Intent

This codebase is intentionally simple:

- `proxy_server.mjs` is the authoritative backend/runtime entrypoint.
- `index.html` plus `js/main.js` are the authoritative frontend entrypoints.
- `sample_runs/` contains importable example data.
- `tools/` is an auxiliary workspace and is not part of the default runtime
  path.

The repo should support fast AI-assisted iteration, but the default path must
stay understandable, reversible, and cheap to validate.

## Generative Sculpting Constraints

- Prefer one authoritative path per behavior.
- Ship vertical slices quickly, then lock behavior with repeatable checks.
- Keep optional experiments and harness additions isolated from the core user
  path.
- Treat generated artifacts, notes, and evidence as archive material unless
  they are required to run the app.
