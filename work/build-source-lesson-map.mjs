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
import { normaliseSourceFile, sourceRoleFor, sourceSetFor } from './lib/source-lesson-map.mjs';
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

const flat = (value) => String(value).toLowerCase()
  .replace(/[‘’“”]/g, "'")
  .replace(/[‐-―]/g, '-')
  .replace(/\s+/g, ' ').trim();
const quoted = (reference) => (String(reference.location || '').match(/"([^"]{4,})"/) || [])[1] || '';
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

function quotePasses(reference, text) {
  const quote = quoted(reference);
  if (!quote) return true;
  if (!text?.pages) return false;
  const parts = quote.split(/\s+[—–]\s+/).map(flat).filter(Boolean);
  const hasParts = (page) => parts.every((part) => flat(page).includes(part));
  const claimed = Number((String(reference.location || '').match(/\bp\.?\s?(\d+)/i) || [])[1]);
  return !!(claimed && claimed <= text.pages.length && hasParts(text.pages[claimed - 1] || ''));
}

function locationsOf(doc) {
  return doc.at.map(([root, path]) => `${root < 0 ? '?' : cat.roots[root]}/${path}`);
}

function sourceRecord(reference) {
  const entry = SOURCE_FILES[reference.ref];
  if (!entry) return { ref: reference.ref, set: 'old', kind: 'unknown', verified: false, readState: 'unresolved', reason: 'unresolved source' };
  const hit = resolveSource(entry, cat, SOURCE_ROOTS);
  if (!hit || hit.ambiguous) {
    return {
      ref: reference.ref, set: 'old', kind: entry.kind, verified: false, readState: 'unresolved',
      reason: hit?.ambiguous ? 'unresolved source (ambiguous catalogue identity)' : 'unresolved source', entry,
    };
  }
  const text = sourceText.sources?.[reference.ref];
  const cachedRecord = cached[cacheKey(hit.doc)];
  const hasText = !!text || !!cachedRecord?.ok;
  const readState = hasText ? 'read' : 'needs OCR';
  const locations = locationsOf(hit.doc);
  const set = sourceSetFor({ file: entry.file, locations }, newFiles);
  const evidence = newFiles.has(normaliseSourceFile(entry.file)) ? 'intake'
    : locations.some((path) => path.replaceAll('\\', '/').toLowerCase().split('/').includes('new source')) ? 'catalogue path'
      : 'registry-only';
  /* The local cache can prove a document was readable, not that a public
     citation names the right page. Only the committed source-text record has
     the pages needed for that gate. */
  const identityVerified = !!text
    && normaliseSourceFile(text.file) === normaliseSourceFile(hit.doc.n)
    && text.at === hit.where;
  return {
    ref: reference.ref, set, kind: entry.kind, identityVerified, verified: identityVerified, readState, entry, doc: hit.doc, evidence,
    reason: !hasText ? 'missing OCR' : (!identityVerified ? 'unresolved source identity' : ''),
  };
}

const unique = (references) => [...new Map(references.map((reference) => [reference.ref, reference])).values()];
const recordsByRef = new Map();
const recordFor = (reference) => {
  const prior = recordsByRef.get(reference.ref);
  if (prior) {
    const quoteOk = quotePasses(reference, sourceText.sources?.[reference.ref]);
    return { ...prior, verified: prior.identityVerified && quoteOk,
      reason: prior.reason || (!quoteOk ? 'quoted citation does not pass its exact named-page check' : '') };
  }
  const record = sourceRecord(reference);
  recordsByRef.set(reference.ref, record);
  const quoteOk = quotePasses(reference, sourceText.sources?.[reference.ref]);
  return { ...record, verified: record.identityVerified && quoteOk,
    reason: record.reason || (!quoteOk ? 'quoted citation does not pass its exact named-page check' : '') };
};

const byLesson = {};
for (const { id, subject, week, item } of expected) {
  /* App-authored aids carry `{ ref: null }`: they remain in the corpus's own
     source dialog, but this public map is deliberately only SOURCE_FILES keys. */
  const refs = unique((item.sourceRefs || []).filter((reference) => reference?.ref));
  const resolved = refs.map(recordFor);
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
  const teaching = sources.filter((source) => ['current-primary', 'older-supporting', 'older-fallback'].includes(source.role));
  const status = teaching.some((source) => source.role === 'current-primary') ? 'complete'
    : teaching.length ? 'partial'
      : resolved.some((record) => !record.verified) ? 'needs-review' : 'missing';
  byLesson[id] = { id, subject, week, title: item.title, status, sources, reasons };
}

assert.equal(Object.keys(byLesson).length, expected.length, 'one generated group per current lesson');
for (const group of Object.values(byLesson)) {
  for (const source of group.sources) assert.ok(SOURCE_FILES[source.ref], `public source not in SOURCE_FILES: ${source.ref}`);
  assert.deepEqual(Object.keys(group).sort(), ['id', 'reasons', 'sources', 'status', 'subject', 'title', 'week']);
}

const byWeek = {};
for (const group of Object.values(byLesson)) {
  ((byWeek[group.subject] ||= {})[group.week] ||= []).push(group.id);
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
const audit = ['sourceSet\tscope\tsubject\tkind\tclassification\tlessonIds\treadState\tidentity\treason\tname'];
for (const doc of cat.docs) {
  const registry = sourceRegistryByDoc.get(sourceKey(doc)) || [];
  const subjectEntry = registry.find(({ entry }) => STUDY_SUBJECTS.includes(entry.subject));
  const subject = subjectEntry?.entry.subject || STUDY_SUBJECTS.find((code) => locationsOf(doc).some((path) => path.includes(code))) || '';
  const current = !!subject;
  const references = registry.flatMap(({ ref }) => linked.get(ref) || []);
  const isNew = sourceSetFor({ file: doc.n, locations: locationsOf(doc) }, newFiles) === 'new';
  const kind = subjectEntry?.entry.kind || doc.kind || 'unregistered';
  const read = sourceText.sources && registry.some(({ ref }) => sourceText.sources[ref]) || cached[cacheKey(doc)]?.ok;
  const teaching = references.find((source) => teachingRoles.has(source.role));
  const classification = !current ? 'not-mapped-future'
    : teaching ? teaching.role
      : kind === 'primary' ? 'needs-review' : 'metadata-only';
  const evidence = newFiles.has(normaliseSourceFile(doc.n)) ? 'intake'
    : locationsOf(doc).some((path) => path.replaceAll('\\', '/').toLowerCase().split('/').includes('new source')) ? 'catalogue path'
      : registry.length ? 'registry-only' : 'catalogue path';
  const reason = !current ? 'not mapped to the current Y1S1 syllabus'
    : classification === 'needs-review' ? 'current-subject teaching candidate has no verified Y1S1 sourceRef'
      : references.length ? evidence : 'registry source is not linked to a current lesson';
  audit.push([isNew ? 'new' : 'old', current ? 'Y1S1' : 'future', subject, kind, classification,
    [...new Set(references.map((source) => source.lessonId))].join(','), read ? 'read' : 'needs OCR', evidence, reason, doc.n].map(field).join('\t'));
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
