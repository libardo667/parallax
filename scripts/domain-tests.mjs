import assert from "node:assert/strict";
import test from "node:test";

import {
  CURRENT_RUN_SCHEMA_VERSION,
  compactCallLog,
  findRetiredRunPaths,
  migrateImportedRun
} from "../js/io/run-migration.js";
import {
  deduplicateArticles,
  scoreArticle,
  scoreArticleWithSeed,
  temporalRelevanceBonus,
  tokenize
} from "../js/domain/news-sources.js";

test("legacy run migration removes CA/Wolfram data and remaps disciplines", () => {
  const legacy = {
    schemaVersion: 6,
    target: "Test topic",
    config: {
      qualityMode: "balanced",
      enableComputationalIrreducibility: true,
      caMode: "run_derived",
      caRule: 110,
      wolframEntityGrounding: true
    },
    discs: [
      { id: 0, name: "History", kind: "llm" },
      { id: 1, name: "CA", kind: "ca" },
      { id: 2, name: "Economics", kind: "llm" }
    ],
    terms: [
      {
        label: "Shared term",
        slices: [0, 2],
        descriptions: { probeSummary: "Kept", wolframGrounding: "Removed" },
        grounding: { wolframInterpretations: ["Legacy alias"] }
      },
      {
        label: "CA-only term",
        slices: [1],
        description_source: "ca_local",
        description_provenance: [{ stage: "ca_diagnostic" }]
      }
    ],
    probeResults: [
      {
        discId: 0,
        terms: [{
          label: "History term",
          grounding: { groundingSkipReason: "Wolfram grounding disabled." },
          description_provenance: [
            { source: "llm", stage: "probe" },
            { source: "wolfram", stage: "grounding" }
          ],
          wolfram_entity: { query: "Entity[]" }
        }],
        citations: [
          { source_type: "reference", title: "Keep" },
          { source_type: "wolfram", title: "Remove" }
        ]
      },
      { discId: 1, terms: [{ label: "CA probe term" }] },
      { discId: 2, terms: [{ label: "Economics term" }] }
    ],
    synthResult: {
      convergent: [{ label: "Shared term", disciplines: [0, 1, 2] }],
      contradictory: [{ label: "Dropped CA relation", disciplines: [1] }],
      emergent: [{ label: "Emergent term" }]
    },
    citations: [{ id: 4, source_type: "wolfram", title: "Legacy source" }],
    embeddingDiagnostics: {
      similarityMatrix: {
        discIds: [0, 1, 2],
        labels: ["HI", "CA", "EC"],
        distances: [[0, 0.4, 0.2], [0.4, 0, 0.5], [0.2, 0.5, 0]]
      }
    },
    artifacts: {
      evidence: { status: "ready" },
      wa_grounding_graph: { status: "ready" }
    },
    caProbe: { rule: 110 },
    wolframGroundingDiagnostics: { resolved: 3 },
    auditTrail: [{
      kind: "chat",
      model: "example/model",
      request: { messages: ["large"] },
      response: { choices: ["large"] },
      response_meta: { usage: { total_tokens: 42 } }
    }, {
      kind: "wolfram_query",
      response_meta: { status: 200 }
    }]
  };

  const migrated = migrateImportedRun(legacy, { compactAuditTrail: true });

  assert.equal(migrated.schemaVersion, CURRENT_RUN_SCHEMA_VERSION);
  assert.deepEqual(migrated.discs.map(disc => [disc.id, disc.name, disc.kind]), [
    [0, "History", "llm"],
    [1, "Economics", "llm"]
  ]);
  assert.deepEqual(migrated.terms.map(term => term.label), ["Shared term"]);
  assert.deepEqual(migrated.terms[0].slices, [0, 1]);
  assert.deepEqual(migrated.probeResults.map(probe => probe.discId), [0, 1]);
  assert.deepEqual(migrated.synthResult.convergent[0].disciplines, [0, 1]);
  assert.equal(migrated.synthResult.contradictory.length, 0);
  assert.deepEqual(migrated.embeddingDiagnostics.similarityMatrix.distances, [[0, 0.2], [0.2, 0]]);
  assert.deepEqual(migrated.artifacts, {});
  assert.deepEqual(migrated.citations, []);
  assert.deepEqual(migrated.probeResults[0].citations, [
    { source_type: "reference", title: "Keep" }
  ]);
  assert.deepEqual(migrated.probeResults[0].terms[0].description_provenance, [
    { source: "llm", stage: "probe" }
  ]);
  assert.deepEqual(migrated.auditTrail, [{
    kind: "chat",
    model: "example/model",
    response_meta: { usage: { total_tokens: 42 } }
  }]);
  assert.deepEqual(findRetiredRunPaths(migrated), []);
});

test("compact call logs retain diagnostics without prompts or provider payloads", () => {
  assert.deepEqual(compactCallLog({
    timestamp: "2026-07-20T00:00:00.000Z",
    kind: "embeddings",
    model: "example/embed",
    input_count: 12,
    vector_dimensions: 1024,
    request: { input: ["secret"] },
    response: { data: ["large"] }
  }), {
    timestamp: "2026-07-20T00:00:00.000Z",
    kind: "embeddings",
    model: "example/embed",
    input_count: 12,
    vector_dimensions: 1024
  });
});

test("migration rejects non-object run files", () => {
  assert.throws(() => migrateImportedRun(null), /Invalid run file/);
  assert.throws(() => migrateImportedRun([]), /Invalid run file/);
});

test("news scoring remains deterministic for canonical source discovery", () => {
  const topic = tokenize("Executive power and tariff policy");
  const article = {
    title: "Court limits executive tariff power",
    description: "A ruling reshapes national trade policy.",
    pubDate: "2026-07-19T00:00:00Z"
  };
  assert.ok(scoreArticle(article, topic) > 0);
  assert.ok(scoreArticleWithSeed(article, topic, ["Court", "Trade Department"]) > 0);
  assert.equal(temporalRelevanceBonus(article, new Date("2026-07-20T00:00:00Z"), 7), 10);
});

test("news result deduplication rejects tracking variants of the same URL", () => {
  const existing = [{ title: "A distinct headline", link: "https://example.com/story?utm_source=feed" }];
  const incoming = [
    { title: "A distinct headline", link: "https://www.example.com/story?ref=home" },
    { title: "Another report", link: "https://example.net/report" }
  ];
  assert.deepEqual(deduplicateArticles(existing, incoming).map(item => item.link), [
    "https://example.net/report"
  ]);
});
