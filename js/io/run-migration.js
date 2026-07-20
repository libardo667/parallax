// Canonical, DOM-free run migration boundary.

export const CURRENT_RUN_SCHEMA_VERSION = 7;

export const CANONICAL_ARTIFACT_KEYS = new Set([
  "raw_terms",
  "evidence",
  "claims",
  "outline",
  "deep_report",
  "red_team",
  "replication",
  "markdown"
]);

const RETIRED_KEYS = new Set([
  "ambiguityqueue",
  "allowgroundingcategorymismatch",
  "caprobe",
  "caerror",
  "cafingerprint",
  "camode",
  "carule",
  "caruleoverride",
  "casteps",
  "castepsoverride",
  "cawidth",
  "cawidthoverride",
  "enablecomputationalirreducibility",
  "groundingannotateonly",
  "groundingminalignmentscore",
  "groundingminsnippetscore",
  "groundingmode",
  "groundingskipreason",
  "groundingstats",
  "promptartifactfocus",
  "prompthardconstraints",
  "promptintent",
  "promptlensemphasis",
  "promptoutputstyle",
  "sourcetypebreakdown",
  "warnings",
  "wolframgroundingdiagnostics"
]);

const SOURCE_TYPES = new Set([
  "peer-reviewed",
  "preprint",
  "gov/ngo",
  "major journalism",
  "blog/opinion",
  "social",
  "reference",
  "computational",
  "api"
]);

function cloneRun(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isRetiredKey(key) {
  const normalized = String(key || "").replace(/[_-]/g, "").toLowerCase();
  return normalized.startsWith("wolfram") || RETIRED_KEYS.has(normalized);
}

function stripRetiredFields(value) {
  if (Array.isArray(value)) return value.map(stripRetiredFields).filter(item => item !== null);
  if (!isRecord(value)) return value;
  if (String(value.source_type || "").trim().toLowerCase() === "wolfram") return null;
  if (String(value.source || "").trim().toLowerCase() === "wolfram") return null;
  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (isRetiredKey(key)) continue;
    const normalizedKey = String(key).replace(/[_-]/g, "").toLowerCase();
    if (typeof child === "string" && normalizedKey === "confidencenotes") {
      const cleaned = child.split(/\s*Wolfram\b[\s\S]*$/i)[0].trim();
      if (cleaned) out[key] = cleaned;
      continue;
    }
    if (typeof child === "string" && normalizedKey === "displaydescriptionreason") {
      const cleaned = child.split(";").filter(part => !/wolfram/i.test(part)).join(";").trim();
      if (cleaned) out[key] = cleaned;
      continue;
    }
    if (typeof child === "string" && (normalizedKey === "systemprompt" || normalizedKey === "userprompt")) {
      out[key] = child.replace(/\|wolfram\b/gi, "");
      continue;
    }
    const stripped = stripRetiredFields(child);
    if (stripped !== null) out[key] = stripped;
  }
  return out;
}

function isLegacyCATerm(term) {
  const source = String(term?.description_source || "").trim().toLowerCase();
  if (source === "ca" || source === "ca_local") return true;
  return (Array.isArray(term?.description_provenance) ? term.description_provenance : [])
    .some(entry => String(entry?.stage || "").toLowerCase().includes("ca_diagnostic"));
}

function buildDisciplineMigration(discs) {
  const idMap = new Map();
  const migrated = [];
  for (let index = 0; index < discs.length; index++) {
    const disc = isRecord(discs[index]) ? discs[index] : {};
    const oldId = Number.isInteger(disc.id) ? disc.id : index;
    if (String(disc.kind || "llm").toLowerCase() === "ca") continue;
    const newId = migrated.length;
    idMap.set(oldId, newId);
    idMap.set(index, newId);
    migrated.push({
      ...stripRetiredFields(disc),
      id: newId,
      kind: "llm"
    });
  }
  return { discs: migrated, idMap };
}

function remapDisciplineIds(values, idMap) {
  const out = [];
  for (const value of Array.isArray(values) ? values : []) {
    const numeric = Number(value);
    if (!Number.isInteger(numeric) || !idMap.has(numeric)) continue;
    const mapped = idMap.get(numeric);
    if (!out.includes(mapped)) out.push(mapped);
  }
  return out;
}

function migrateTerm(term, idMap, { nestedProbeTerm = false } = {}) {
  if (!isRecord(term) || isLegacyCATerm(term)) return null;
  const originalSlices = Array.isArray(term.slices) ? term.slices : [];
  const migrated = stripRetiredFields(term);
  if (!isRecord(migrated)) return null;
  if (!nestedProbeTerm) {
    migrated.slices = remapDisciplineIds(originalSlices, idMap);
    if (originalSlices.length && !migrated.slices.length) return null;
  }
  if (isRecord(migrated.grounding) && !Object.keys(migrated.grounding).length) {
    delete migrated.grounding;
  }
  return migrated;
}

function migrateSynthesis(synthesis, idMap) {
  const src = isRecord(synthesis) ? synthesis : {};
  const out = {};
  for (const key of ["convergent", "contradictory", "emergent"]) {
    out[key] = (Array.isArray(src[key]) ? src[key] : []).map(item => {
      if (!isRecord(item)) return item;
      const migrated = stripRetiredFields(item);
      if (key !== "emergent") {
        migrated.disciplines = remapDisciplineIds(item.disciplines, idMap);
      }
      return migrated;
    }).filter(item => key === "emergent" || !isRecord(item) || item.disciplines.length);
  }
  return out;
}

function migrateEmbeddingDiagnostics(diagnostics, originalDiscs, migratedDiscs, idMap) {
  const src = stripRetiredFields(isRecord(diagnostics) ? diagnostics : {});
  const matrix = src.similarityMatrix;
  if (!isRecord(matrix) || !Array.isArray(matrix.distances)) return src;

  const oldIds = Array.isArray(matrix.discIds)
    ? matrix.discIds
    : originalDiscs.map((disc, index) => Number.isInteger(disc?.id) ? disc.id : index);
  const keptIndices = [];
  const newIds = [];
  for (let index = 0; index < oldIds.length; index++) {
    const oldId = Number(oldIds[index]);
    if (!Number.isInteger(oldId) || !idMap.has(oldId)) continue;
    keptIndices.push(index);
    newIds.push(idMap.get(oldId));
  }
  const labels = keptIndices.map((oldIndex, index) =>
    matrix.labels?.[oldIndex] || migratedDiscs[index]?.abbr || migratedDiscs[index]?.name || `P${index + 1}`
  );
  const distances = keptIndices.map(rowIndex =>
    keptIndices.map(columnIndex => matrix.distances?.[rowIndex]?.[columnIndex] ?? null)
  );
  src.similarityMatrix = {
    ...matrix,
    discIds: newIds,
    labels,
    distances
  };
  return src;
}

export function compactCallLog(entry) {
  if (!isRecord(entry)) return null;
  const kind = String(entry.kind || "").trim().toLowerCase();
  if (/wolfram|cellular|(^|_)ca($|_)/.test(kind)) return null;
  const allowed = [
    "runId", "timestamp", "kind", "model", "temperature", "max_tokens",
    "webSearch", "jsonMode", "batch", "totalBatches", "input_count",
    "vector_dimensions", "response_meta", "recoveryMode"
  ];
  const out = {};
  for (const key of allowed) {
    if (entry[key] !== undefined) out[key] = stripRetiredFields(entry[key]);
  }
  return out;
}

function migrateCitation(citation, index) {
  if (String(citation?.source_type || "").trim().toLowerCase() === "wolfram") return null;
  const migrated = stripRetiredFields(isRecord(citation) ? citation : {});
  migrated.id = Number.isInteger(citation?.id) ? citation.id : index;
  const sourceType = String(citation?.source_type || "").trim().toLowerCase();
  migrated.source_type = SOURCE_TYPES.has(sourceType) ? sourceType : "";
  return migrated;
}

function migrateArtifacts(artifacts) {
  if (!isRecord(artifacts)) return {};
  const out = {};
  for (const [key, artifact] of Object.entries(artifacts)) {
    if (!CANONICAL_ARTIFACT_KEYS.has(key)) continue;
    if (key === "raw_terms" || key === "evidence") continue;
    out[key] = stripRetiredFields(artifact);
  }
  return out;
}

export function migrateImportedRun(rawData, { compactAuditTrail = false } = {}) {
  if (!isRecord(rawData)) throw new Error("Invalid run file.");
  const raw = cloneRun(rawData);
  const originalDiscs = Array.isArray(raw.discs) ? raw.discs : [];
  const { discs, idMap } = buildDisciplineMigration(originalDiscs);
  const data = stripRetiredFields(raw);

  data.schemaVersion = CURRENT_RUN_SCHEMA_VERSION;
  data.discs = discs;
  data.config = stripRetiredFields(isRecord(raw.config) ? raw.config : {});
  data.terms = (Array.isArray(raw.terms) ? raw.terms : [])
    .map(term => migrateTerm(term, idMap))
    .filter(Boolean);
  data.probeResults = (Array.isArray(raw.probeResults) ? raw.probeResults : [])
    .map(probe => {
      if (!isRecord(probe) || !idMap.has(Number(probe.discId))) return null;
      const migrated = stripRetiredFields(probe);
      migrated.discId = idMap.get(Number(probe.discId));
      migrated.terms = (Array.isArray(probe.terms) ? probe.terms : [])
        .map(term => migrateTerm(term, idMap, { nestedProbeTerm: true }))
        .filter(Boolean);
      return migrated;
    })
    .filter(Boolean);
  data.synthResult = migrateSynthesis(raw.synthResult, idMap);
  data.citations = (Array.isArray(raw.citations) ? raw.citations : [])
    .map(migrateCitation)
    .filter(Boolean);
  const citationIds = new Set(data.citations.map(citation => citation.id));
  for (const term of data.terms) {
    if (Array.isArray(term.citations)) {
      term.citations = term.citations.filter(id => citationIds.has(id));
    }
  }
  data.artifacts = migrateArtifacts(raw.artifacts);
  data.embeddingDiagnostics = migrateEmbeddingDiagnostics(
    raw.embeddingDiagnostics,
    originalDiscs,
    discs,
    idMap
  );
  data.auditTrail = (Array.isArray(raw.auditTrail) ? raw.auditTrail : [])
    .map(entry => compactAuditTrail ? compactCallLog(entry) : stripRetiredFields(entry))
    .filter(Boolean);

  if (isRecord(data.semanticEdges) && Array.isArray(data.semanticEdges.relationships) && data.terms.length) {
    const labels = new Set(data.terms.map(term => String(term?.label || "").trim().toLowerCase()).filter(Boolean));
    data.semanticEdges.relationships = data.semanticEdges.relationships.filter(edge =>
      labels.has(String(edge?.term_a || "").trim().toLowerCase()) &&
      labels.has(String(edge?.term_b || "").trim().toLowerCase())
    );
    data.semanticEdges.termCount = data.terms.length;
  }

  return data;
}

export function findRetiredRunPaths(value, path = "") {
  const hits = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => hits.push(...findRetiredRunPaths(item, `${path}[${index}]`)));
    return hits;
  }
  if (!isRecord(value)) return hits;
  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    if (isRetiredKey(key)) hits.push(childPath);
    if (key === "kind" && String(child).toLowerCase() === "ca") hits.push(childPath);
    if (key === "source_type" && String(child).toLowerCase() === "wolfram") hits.push(childPath);
    if (key === "source" && String(child).toLowerCase() === "wolfram") hits.push(childPath);
    if (key === "stage" && String(child).toLowerCase().includes("ca_diagnostic")) hits.push(childPath);
    if (key === "wa_grounding_graph") hits.push(childPath);
    if (typeof child === "string" && /wolfram|cellular automa|computational irreduc/i.test(child)) hits.push(childPath);
    hits.push(...findRetiredRunPaths(child, childPath));
  }
  return [...new Set(hits)];
}
