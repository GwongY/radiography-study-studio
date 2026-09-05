/*
 * Generate the compact public Y1S1 source-to-lesson map and its local,
 * deliberately uncommitted catalogue audit. The source files remain the notes;
 * this records only their registry references and evidence status.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COVERAGE } from '../outputs/study/corpus/coverage.js';
import { getItem } from '../outputs/study/corpus/corpus.js';
import { SOURCE_FILES, SOURCE_ROOTS } from '../outputs/study/corpus/schema.js';
import { STUDY_SUBJECTS, WEEK_GAPS, WEEK_STUDY } from '../outputs/schedule.js';
import {
  citationEvidence,
  groupReferencesByRef,
  lessonStatus,
  normaliseSourceFile,
  sourceRoleFor,
  sourceSetFor,
} from './lib/source-lesson-map.mjs';
import { resolveSource } from './lib/source-resolve.mjs';

const WORK = dirname(fileURLToPath(import.meta.url));
const CATALOGUE = join(WORK, 'source-catalogue.json');
const TEXT = join(WORK, 'source-text.json');
const CACHE = join(WORK, '.source-text');
const OUTPUT = join(WORK, '../outputs/study/corpus/source-lesson-map.js');
const AUDIT = join(WORK, '.source-lesson-audit/INDEX.tsv');

/* This guard runs before any output write: a failed catalogue lookup must not
   replace the last generated public map with an empty or guessed one. */
if (!existsSync(CATALOGUE)) {
  console.error('no work/source-catalogue.json — run: node work/build-source-catalogue.mjs');
  process.exit(2);
}

const cat = JSON.parse(readFileSync(CATALOGUE, 'utf8'));
const sourceText = existsSync(TEXT) ? JSON.parse(readFileSync(TEXT, 'utf8')) : { sources: {}, failed: {} };
const newFiles = new Set(COVERAGE.newSourceIntake.map(({ file }) => normaliseSourceFile(file)));

/* Required shape: do not replace this with an item-list sweep. WEEK_STUDY is
   the current-syllabus authority, while the corpus also retains older/future
   material that must not become Y1S1 merely because it has a sourceRef. */
const expected = Object.entries(WEEK_STUDY).flatMap(([subject, weeks]) =>
  Object.entries(weeks).flatMap(([week, ids]) => ids.map((id) => ({
    id, subject, week: Number(week), item: getItem(id),
  })))
);

const placements = new Map();
for (const lesson of expected) {
  assert.ok(STUDY_SUBJECTS.includes(lesson.subject), `non-current subject in WEEK_STUDY: ${lesson.subject}`);
  assert.ok(lesson.item, `WEEK_STUDY lesson has no item: ${lesson.id}`);
  const previous = placements.get(lesson.id);
  assert.ok(!previous || (previous.subject === lesson.subject && previous.week === lesson.week),
    `lesson appears in conflicting weeks: ${lesson.id}`);
  placements.set(lesson.id, lesson);
  assert.ok((lesson.item.sourceRefs || []).length || WEEK_GAPS[lesson.subject]?.[lesson.week],
    `lesson has no explicit sourceRefs or WEEK_GAPS entry: ${lesson.id}`);
}

const sourceKey = (doc) => `${doc.n.toLowerCase()}|${doc.b}`;
const cacheKey = (doc) => createHash('sha1').update(sourceKey(doc)).digest('hex').slice(0, 16);

function cacheIndex() {
  if (!existsSync(CACHE)) return {};
  const all = {};
  for (const file of readdirSync(CACHE)) {
    if (!/^index(-\d+)?\.json$/.test(file)) continue;
    try { Object.assign(all, JSON.parse(readFileSync(join(CACHE, file), 'utf8'))); } catch { /* interrupted shard */ }
  }
  return all;
}
const cached = cacheIndex();

function locationsOf(doc) {
  return doc.at.map(([root, path]) => `${root < 0 ? '?' : cat.roots[root]}/${path}`);
}

function setInfo(entry, resolvedLocations = []) {
  const registryLocations = entry ? [SOURCE_ROOTS[entry.root] || '', entry.folder || ''] : [];
  const locations = [...resolvedLocations, ...registryLocations];
  const file = entry?.file || '';
  const intake = newFiles.has(normaliseSourceFile(file));
  const newPath = locations.some((path) => String(path).replaceAll('\\', '/').toLowerCase().split('/').includes('new source'));
  return {
    set: sourceSetFor({ file, locations }, newFiles),
    evidence: intake ? 'intake' : newPath ? 'catalogue-path' : entry?.root ? 'registry-only' : 'catalogue',
  };
}

function sourceRecord(ref, references) {
  const entry = SOURCE_FILES[ref];
  const registrySet = setInfo(entry);
  if (!entry) return { ref, ...registrySet, kind: 'unknown', verified: false, readState: 'unresolved', reason: 'unresolved source' };
  const hit = resolveSource(entry, cat, SOURCE_ROOTS);
  if (!hit || hit.ambiguous) {
    return {
      ref, ...registrySet, kind: entry.kind, verified: false, readState: 'unresolved',
      reason: hit?.ambiguous ? 'unresolved source (ambiguous catalogue identity)' : 'unresolved source', entry,
    };
  }
  const text = sourceText.sources?.[ref];
  const cachedRecord = cached[cacheKey(hit.doc)];
  const locations = locationsOf(hit.doc);
  const resolvedSet = setInfo(entry, locations);
  const readState = text ? 'verified' : cachedRecord?.ok ? 'unread' : sourceText.failed?.[ref] ? 'needs OCR' : 'unread';
  /* The local cache can prove a document was readable, not that a public
     citation names the right page. Only the committed source-text record has
     the pages needed for that gate. */
  const identityVerified = !!text
    && normaliseSourceFile(text.file) === normaliseSourceFile(hit.doc.n)
    && text.at === hit.where
    && (!text.subject || text.subject === entry.subject)
    && (!text.kind || text.kind === entry.kind);
  const citationChecks = references.map((reference) => citationEvidence(reference, text));
  const citationsVerified = citationChecks.length > 0 && citationChecks.every((check) => check.ok);
  const failedCitation = citationChecks.find((check) => !check.ok);
  return {
    ref, ...resolvedSet, kind: entry.kind, identityVerified,
    verified: identityVerified && citationsVerified,
    readState, entry, doc: hit.doc,
    reason: !text ? (cachedRecord?.ok ? 'cache-only source text is not committed evidence' : 'missing committed source text')
      : !identityVerified ? 'unresolved source identity'
        : failedCitation?.reason || '',
  };
}

const byLesson = {};
for (const { id, subject, week, item } of expected) {
  /* App-authored aids carry `{ ref: null }`: they remain in the corpus's own
     source dialog, but this public map is deliberately only SOURCE_FILES keys. */
  const groupedRefs = groupReferencesByRef(item.sourceRefs || []);
  const resolved = [...groupedRefs].map(([ref, references]) => sourceRecord(ref, references));
  const hasNewPrimary = resolved.some((record) => record.set === 'new' && record.kind === 'primary' && record.verified);
  const sources = resolved.map((record) => ({
    ref: record.ref, set: record.set,
    role: sourceRoleFor({ ...record, hasNewPrimary }),
  }));
  const reasons = [];
  const gap = WEEK_GAPS[subject]?.[week];
  if (gap) reasons.push(`WEEK_GAPS[${subject}][${week}]: ${gap}`);
  for (const record of resolved) if (record.reason && !reasons.includes(record.reason)) reasons.push(record.reason);
  if (!hasNewPrimary && resolved.some((record) => record.entry?.folder?.includes('HTI17101'))) {
    reasons.push('current-source substitution: verified HTI17101 material is retained as fallback for HTI17103.');
  }
  const primary = sources.filter((source) => source.role === 'current-primary');
  const supporting = sources.filter((source) => ['older-supporting', 'older-fallback'].includes(source.role));
  const status = lessonStatus({ primary, supporting, unresolved: resolved.some((record) => !record.verified), hasGap: !!gap });
  byLesson[id] = { id, subject, week, title: item.title, status, sources, reasons };
}

assert.equal(Object.keys(byLesson).length, expected.length, 'one generated group per current lesson');
for (const group of Object.values(byLesson)) {
  for (const source of group.sources) assert.ok(SOURCE_FILES[source.ref], `public source not in SOURCE_FILES: ${source.ref}`);
  assert.deepEqual(Object.keys(group).sort(), ['id', 'reasons', 'sources', 'status', 'subject', 'title', 'week']);
}

const byWeek = Object.fromEntries(Object.entries(WEEK_STUDY).map(([subject, weeks]) => [
  subject,
  Object.fromEntries(Object.keys(weeks).map((week) => [week, []])),
]));
for (const group of Object.values(byLesson)) {
  byWeek[group.subject][group.week].push(group.id);
}
const bySource = {};
for (const group of Object.values(byLesson)) for (const source of group.sources) {
  (bySource[source.ref] ||= []).push({ lessonId: group.id, set: source.set, role: source.role });
}
const map = { scope: 'Y1S1', byLesson, byWeek, bySource };

function moduleText(value) {
  return `/* GENERATED by work/build-source-lesson-map.mjs — do not hand-edit. */\n`
    + `export const SOURCE_MAP_VERSION = '2026-09-05';\n`
    + `export const Y1S1_SOURCE_MAP = ${JSON.stringify(value, null, 2)};\n\n`
    + `export function sourceGroupFor(lessonId) { return Y1S1_SOURCE_MAP.byLesson[lessonId] || null; }\n`
    + `export function sourceGroupsForWeek(subject, week) { return (Y1S1_SOURCE_MAP.byWeek[subject]?.[week] || []).map(sourceGroupFor).filter(Boolean); }\n`
    + `export function sourceMetaFor(ref, lessonId = '') { const group = lessonId ? sourceGroupFor(lessonId) : null; return group?.sources.find((source) => source.ref === ref) || Y1S1_SOURCE_MAP.bySource[ref]?.[0] || null; }\n`
    + `export function sourceSetLabel(set) { return set === 'new' ? 'New source' : 'Old source'; }\n`
    + `export function sourceRoleLabel(role) { return ({ 'current-primary': 'primary', 'older-supporting': 'supporting', 'older-fallback': 'fallback', assessment: 'assessment/practice', administration: 'administration', 'student-work': 'student work', 'not-mapped-future': 'future scope', 'needs-review': 'needs review' })[role] || 'source'; }\n`;
}

const sourceRegistryByDoc = new Map();
for (const [ref, entry] of Object.entries(SOURCE_FILES)) {
  const hit = resolveSource(entry, cat, SOURCE_ROOTS);
  if (hit && !hit.ambiguous) {
    const key = sourceKey(hit.doc);
    if (!sourceRegistryByDoc.has(key)) sourceRegistryByDoc.set(key, []);
    sourceRegistryByDoc.get(key).push({ ref, entry });
  }
}
const linked = new Map(Object.entries(bySource));
const teachingRoles = new Set(['current-primary', 'older-supporting', 'older-fallback']);
const field = (value) => String(value ?? '').replace(/[\t\r\n]+/g, ' ').trim();
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
function auditIdentity(doc, registry, origin) {
  const refs = registry.map(({ ref }) => ref).sort();
  const textHashes = registry
    .map(({ ref }) => sourceText.sources?.[ref])
    .filter(Boolean)
    .map((text) => sha256(JSON.stringify(text.pages || [])));
  const parts = [
    `document-sha256:${sha256(`${normaliseSourceFile(doc.n)}\0${doc.b}\0${doc.m || ''}`)}`,
    ...[...new Set(textHashes)].map((hash) => `text-sha256:${hash}`),
    refs.length ? `refs:${refs.join(',')}` : '',
    `origin:${origin}`,
  ];
  return parts.filter(Boolean).join(';');
}
const audit = ['sourceSet\tscope\tsubject\tkind\tclassification\tlessonIds\treadState\tidentity\treason\tname'];
for (const doc of cat.docs) {
  const registry = sourceRegistryByDoc.get(sourceKey(doc)) || [];
  const subjectEntry = registry.find(({ entry }) => STUDY_SUBJECTS.includes(entry.subject));
  const subject = subjectEntry?.entry.subject || STUDY_SUBJECTS.find((code) => locationsOf(doc).some((path) => path.includes(code))) || '';
  const current = !!subject;
  const references = registry.flatMap(({ ref }) => linked.get(ref) || []);
  const sourceSet = setInfo({ file: doc.n }, locationsOf(doc));
  const isNew = sourceSet.set === 'new';
  const kind = subjectEntry?.entry.kind || doc.kind || 'unregistered';
  const committedText = registry.some(({ ref }) => sourceText.sources?.[ref]);
  const cacheOnly = !committedText && cached[cacheKey(doc)]?.ok;
  const readState = committedText ? 'verified' : cacheOnly ? 'unread' : 'needs OCR';
  const teaching = references.find((source) => teachingRoles.has(source.role));
  const classification = !current ? 'not-mapped-future'
    : teaching ? teaching.role
      : kind === 'primary' ? 'needs-review' : 'metadata-only';
  const evidence = sourceSet.evidence;
  const identity = auditIdentity(doc, registry, evidence);
  const reason = !current ? 'not mapped to the current Y1S1 syllabus'
    : classification === 'needs-review' ? 'current-subject teaching candidate has no verified Y1S1 sourceRef'
      : cacheOnly ? 'cache-only text is not committed verification evidence'
        : references.length ? evidence : 'registry source is not linked to a current lesson';
  audit.push([isNew ? 'new' : 'old', current ? 'Y1S1' : 'future', subject, kind, classification,
    [...new Set(references.map((source) => source.lessonId))].join(','), readState, identity, reason, doc.n].map(field).join('\t'));
}

/* All validation precedes public output. The audit is local-only and may retain
   private names/paths; the generated module never receives either. */
const rendered = moduleText(map);
assert.ok(!/\b(lesson|memory|practice|application)\s*:/.test(rendered), 'public map contains item prose fields');
writeFileSync(OUTPUT, rendered, 'utf8');
mkdirSync(dirname(AUDIT), { recursive: true });
writeFileSync(AUDIT, `${audit.join('\n')}\n`, 'utf8');
console.log(`Y1S1 source map: ${expected.length} lesson groups, ${Object.keys(bySource).length} source refs`);
console.log(`local audit: ${cat.docs.length} catalogue documents -> work/.source-lesson-audit/INDEX.tsv`);
