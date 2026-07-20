# Parallax Product and Engineering Plan

Status: active north star
Last updated: 2026-07-20

## Mandate

Preserve what already makes Parallax distinctive: multi-perspective analysis,
explicit convergence and tension, source-aware research, and complementary
narrative and spatial result surfaces.

Make that power easier to reach. The default experience should ask for only the
information needed to begin, while detailed model, prompt, source-policy, and
replication controls remain available through progressive disclosure.

At the same time, improve the system's epistemic honesty, evidence integrity,
internal boundaries, operational safety, and testability.

## What Parallax Is

Parallax is an epistemic triangulation workspace. It helps a user inspect a
topic from independent vantage points, identify alignments and fault lines, and
turn the resulting structure into a navigable research object.

Parallax is not primarily:

- a generic chatbot;
- a decorative 3D visualization;
- an ideology classifier;
- a Wolfram or cellular-automaton product; or
- a collection of unrelated analysis modes.

## Product Commitments

1. **One analytical engine, multiple entry journeys.** Explore and Lens should
   continue to share the probe, synthesis, term, citation, and artifact model.
   Mode-specific behavior should be input and presentation routing, not a
   duplicate pipeline.
2. **A simple default path.** A new user should be able to start an analysis
   after making one meaningful choice: a concept in Explore or a seed source in
   Lens. Parallax should choose useful defaults for everything else.
3. **Power without clutter.** Advanced controls remain supported, but model
   selection, quality tuning, source policy, prompt overrides, red teaming, and
   replication stay behind clearly labeled disclosure surfaces.
4. **Text and space are complementary.** Lens remains narrative-first, with the
   map available as an optional follow-on. Explore remains map-forward, while
   always offering a readable synthesis and inspectable evidence.
5. **Evidence is a first-class object.** Claims, terms, sources, mappings, and
   uncertainty should be inspectable without requiring the user to infer how a
   result was produced.
6. **The map communicates a model, not objective reality.** The UI and exported
   methods should distinguish embedding geometry, LLM-derived relationships,
   synthesis categories, and deterministic fallbacks.
7. **Graceful degradation stays visible.** Partial probes, repaired JSON,
   fallback synthesis, fallback geometry, missing source coverage, and stale
   artifacts should not kill a run, but must be labeled in the result.
8. **Wolfram and cellular automata are legacy.** They will be removed from the
   active product, runtime schema, samples, UI, prompts, artifacts, and
   documentation. Temporary import compatibility may exist only at the schema
   boundary and must have a retirement condition.

## Target User Experience

### Landing

Keep three obvious actions:

- Explore a concept
- Analyze coverage of a source
- Load an example

Do not introduce additional top-level modes unless they reuse the shared engine
and serve a clearly different input journey.

### Explore

The default surface contains:

- focus concept;
- suggested lenses, editable in place;
- one primary Run action; and
- a short explanation of the output.

Detailed controls are grouped behind Advanced Settings. Their defaults should
be sufficient for a successful run, and the UI should explain the consequence
of changing them rather than exposing implementation vocabulary alone.

The initial result should answer, in this order:

1. What shape did the analysis find?
2. Where do perspectives align?
3. Where do they conflict?
4. What emerged only through synthesis?
5. What evidence supports those findings?
6. How can the user inspect the spatial relationships?

### Lens

The default surface begins with a seed URL. Parallax finds candidate coverage,
explains the perspective grouping, lets the user adjust source selection, and
runs the shared analytical engine.

The initial result remains text-first: concise synthesis, claims/fault lines,
and evidence. Embedding and 3D exploration remain an explicit follow-on action.

Perspective columns are discovery scaffolding. The product must not imply that
every article inherits a definitive ideological or geographic classification
from its outlet.

### Detailed settings

Advanced settings remain accessible and import/export safe, but should obey
these rules:

- hide them by default;
- group them by user intent, not internal module;
- show the active non-default choices in a compact summary;
- provide Reset to Recommended Defaults;
- avoid adding a new setting when a reliable automatic policy is possible; and
- never make prompt editing or experimental controls prerequisites for a run.

## Workstreams

### 1. Green baseline and schema cleanup

Restore a single documented command surface and make the default validation
path green before expanding the product. Define the canonical CA-free run
schema, migrate old imports at one boundary, and replace or compact active
sample fixtures so examples are fast and representative.

Key outcomes:

- documented start, check, and smoke commands agree with the working tree;
- sample labels, filenames, and targets agree;
- sample exports exclude provider-response bulk and retired fields unless
  required for a deliberate audit example;
- import migration has fixture-based tests; and
- Wolfram/CA data cannot leak back into newly exported runs.

### 2. Streamlined journey and progressive disclosure

Reduce decision load before the first run and clarify result hierarchy without
removing expert capabilities.

Key outcomes:

- one obvious primary action per screen;
- recommended automatic lenses and models;
- compact advanced-settings summaries;
- narrative summary available in both journeys;
- clearer transition from Lens results to the optional map; and
- mobile and keyboard behavior treated as core usability, not late polish.

### 3. Evidence integrity and epistemic transparency

Make it easy to understand why every important term or claim exists and how
strongly it is supported.

Key outcomes:

- distinguish user-provided, fetched, model-retrieved, and inferred material;
- validate and normalize source links where feasible;
- surface source coverage and unmapped evidence terms;
- label probe, synthesis, heuristic, and fallback-derived nodes;
- describe how embeddings, projection, semantic edges, and force refinement
  each affect the map; and
- avoid presenting structural scores as external truth or calibrated
  probabilities.

### 4. Runtime boundaries and test seams

Preserve the lightweight no-build architecture while reducing the cost of
change.

Key outcomes:

- separate serializable run data from transient UI state;
- move DOM-free transformations into independently testable domain modules;
- narrow the responsibilities of the launch coordinator, setup panel, and
  artifact generator;
- reduce circular dependencies and direct mutation of shared singleton state;
- give Explore and Lens explicit adapters into one pipeline; and
- add focused tests for normalization, term merging, citation mapping,
  synthesis fallback, news scoring, import migration, and run serialization.

### 5. Runtime resilience and deployment safety

Keep local use frictionless while making hosted operation an intentional,
defensible configuration.

Key outcomes:

- explicit local and hosted security profiles;
- outbound URL allow/deny policy and SSRF defenses;
- request body, response size, concurrency, and timeout limits;
- no browser-exposed provider keys in the hosted default path;
- clear failure behavior for external CDN/module dependencies; and
- observability for provider latency, partial probes, recovery paths, source
  fetch failures, and artifact generation.

## Phased Sequence

### Phase 0: Stabilize and prune

- Reconcile the command surface with the current repository layout.
- Make static and smoke validation green.
- Define the canonical run schema and sample-fixture policy.
- Remove active Wolfram/CA behavior and retain only bounded legacy import
  migration where necessary.
- Add tests around import migration and the pure domain functions most likely
  to regress during UX work.

### Phase 1: Simplify the path to value

- Tighten landing, Explore, and Lens setup flows.
- Establish recommended defaults and progressive disclosure.
- Make the concise narrative, convergence, fault-line, emergence, and evidence
  hierarchy consistent across results.
- Complete onboarding, keyboard, and mobile basics.

### Phase 2: Make trust inspectable

- Complete citation provenance and source-status labeling.
- Expose derivation and fallback status at term, claim, run, and export levels.
- Clarify the methodology and the map's epistemic status.
- Improve source-link validation and Lens perspective language.

### Phase 3: Harden the internals

- Introduce a canonical run model and explicit pipeline result contracts.
- Extract testable domain services from UI-heavy modules.
- Reduce shared-state coupling and import cycles incrementally.
- Add regression coverage before changing visualization behavior.

### Phase 4: Prepare intentional hosting

- Harden URL fetching and request handling.
- Add server-side credentials, limits, logging, and deployment configuration.
- Verify degraded operation and dependency failure states.
- Only then treat sharing, embedding, and public deployment as production paths.

## Decision Rules

When choosing work, prefer the change that:

1. shortens time to a trustworthy first result;
2. strengthens the shared engine instead of creating a parallel path;
3. makes provenance or failure state more visible;
4. removes legacy surface area or accidental complexity;
5. adds a test seam around behavior being changed; and
6. preserves import/export compatibility through an explicit migration rather
   than permanent runtime branching.

New features should wait when the default validation path is red or when they
would deepen a known state, schema, evidence, or security problem.

## Non-Goals

- Rewriting the application into a framework solely for architectural fashion.
- Removing expert controls that provide real analytical value.
- Treating more models, more probes, or more settings as automatic quality.
- Making the 3D map the mandatory destination for every workflow.
- Building a second analysis engine for documents, news, or future inputs.
- Preserving Wolfram/CA behavior for conceptual continuity.

## Definition of Progress

Progress is not measured by feature count. A release is moving Parallax forward
when users reach a useful result faster, can explain where it came from, can
distinguish evidence from inference, and encounter fewer hidden or duplicate
runtime paths.

Each implementation slice should identify:

- the user decision or friction it removes;
- the authoritative path it changes;
- the provenance or failure state it exposes;
- the legacy behavior it retires, if any;
- the validation evidence added; and
- the rollback boundary.

## Backlog Alignment

Existing tracked items remain useful when interpreted through this plan:

- onboarding, progress, tooltips, theme visibility, mobile, and keyboard work
  belong to streamlined experience;
- narrative mode and shareable results belong to result hierarchy;
- the citation-driven evidence layer belongs to trust and transparency;
- balanced term deduplication belongs to analytical coherence;
- hybrid news search belongs to Lens coverage, with explicit perspective and
  provenance safeguards;
- hosted deployment belongs after runtime safety work; and
- document checking should reuse the shared engine through a new input adapter.

Create new tracked items for CA/Wolfram retirement, canonical run-state
boundaries, and hosted URL-fetch hardening before implementing those
cross-cutting changes.
