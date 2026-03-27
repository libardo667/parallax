# Doc Checker Mode (PDF as Source)

## Metadata

- ID: 011
- Title: Doc Checker Mode (PDF as Source)
- Type: major
- Owner: unassigned
- Status: backlog
- Risk: high
- Target Window: TBD
- Depends On: none

## Problem

The product has no document-first analysis mode for PDFs or long-form source
material, despite having a pipeline shape that could support it.

Concrete evidence:

- user impact: legal, policy, research, and compliance document workflows are
  out of scope today
- operational impact: there is no canonical document-ingestion or extraction
  path in the repo
- correctness impact: document analysis requires grounded prompts and extraction
  semantics that differ from open-knowledge concept analysis

## Proposed Solution

Add a document-source mode that accepts PDF input, extracts text, routes the
content through document-specific probe lenses, and synthesizes grounded
findings. This should extend the existing probe-to-synthesis pipeline rather
than introducing a separate analysis architecture.

Planned file-level touchpoints:

- `index.html` and `css/styles.css` for document-mode UI
- `js/ui/setup-panel.js` for mode-specific inputs and flow
- `js/prompt/prompt-builders.js` and `js/prompt/prompt-system.js` for
  document-specific prompts
- `js/pipeline/launch-expedition.js` for document-source routing
- `proxy_server.mjs` or a helper module if server-side extraction is needed

## Files Affected

- `index.html`
- `css/styles.css`
- `js/ui/setup-panel.js`
- `js/prompt/prompt-builders.js`
- `js/prompt/prompt-system.js`
- `js/pipeline/launch-expedition.js`
- `proxy_server.mjs`

## Non-Goals

- building a full document management system
- introducing multi-format ingestion beyond the initial PDF-focused scope

## Acceptance Criteria

- [ ] Users can provide a PDF and trigger a document-grounded analysis flow
- [ ] Probe prompts and outputs are adapted for document-reading rather than
      open-knowledge querying
- [ ] Extracted document artifacts and temporary outputs have a defined archive
      strategy

## Validation Commands

- `npm run quality:strict`
- `npm run start`

## Pruning Prevention Controls

- Authoritative path for touched behavior: current setup and launch pipeline
- Parallel path introduced: none; document mode should remain another routed use
  of the same pipeline
- Optional/harness behavior on default path: no
- Generated artifacts + archive target: extracted text, fixture documents, and
  comparison outputs go under `improvements/history/` unless explicitly needed at
  runtime
- Flag lifecycle (if applicable): document-mode rollout flag only if needed

## Risks and Rollback

Risks:

- PDF extraction quality can undermine downstream analysis
- document mode can sprawl into a separate product if not bounded tightly

Rollback:

- remove the document-mode UI and route while leaving the existing analysis
  modes untouched

## Follow-up Candidates

- document-specific evidence and export improvements
