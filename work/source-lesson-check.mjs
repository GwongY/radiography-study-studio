import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import {
  citationEvidence,
  groupReferencesByRef,
  indexMap,
  lessonStatus,
  normaliseSourceFile,
  sourceRoleFor,
  sourceSetFor,
} from './lib/source-lesson-map.mjs';

const isSelftest = process.argv.includes('--selftest');

const fixture = JSON.parse(await readFile(new URL('./fixtures/source-lesson-map-selftest.json', import.meta.url)));
const regressions = JSON.parse(await readFile(new URL('./fixtures/source-lesson-map-regressions.json', import.meta.url)));

if (isSelftest) {
  const newFiles = new Set([normaliseSourceFile(fixture.newFile)]);
  assert.equal(sourceSetFor({ file: fixture.newFile, locations: [] }, newFiles), 'new');
  assert.equal(sourceSetFor({ file: fixture.oldFile, locations: [] }, newFiles), 'old');
  const ambiguousFiles = new Set([normaliseSourceFile(regressions.ambiguousNewFile)]);
  assert.equal(sourceSetFor({ file: regressions.ambiguousNewFile, locations: [] }, ambiguousFiles), 'new');
  assert.equal(sourceSetFor({ file: 'unmatched.pdf', locations: [regressions.newPath] }, new Set()), 'new');
  assert.equal(citationEvidence({ location: 'p2 "Directional Terms"' }, { pages: regressions.pages }).ok, true);
  assert.equal(citationEvidence({ location: 'p1 "Directional Terms"' }, { pages: regressions.pages }).ok, false);
  assert.equal(citationEvidence({ location: 'Slide "Directional Terms"' }, { pages: regressions.pages }).ok, true);
  assert.equal(citationEvidence({ location: 'pp2–3' }, { pages: regressions.pages }).ok, true);
  assert.equal(citationEvidence({ location: 'Opening section' }, { pages: regressions.pages }).ok, false);
  const grouped = groupReferencesByRef([
    { ref: 'same', location: 'p2 "Directional Terms"' },
    { ref: 'same', location: 'p1 "Directional Terms"' },
  ]);
  assert.equal(grouped.get('same').length, 2, 'duplicate refs retain every citation for verification');
  assert.equal(grouped.get('same').every((reference) => citationEvidence(reference, { pages: regressions.pages }).ok), false,
    'one failed duplicate citation prevents source verification');
  assert.deepEqual({
    set: sourceSetFor({ file: regressions.ambiguousNewFile, locations: [] }, ambiguousFiles),
    role: sourceRoleFor({ set: 'new', kind: 'primary', verified: false, hasNewPrimary: false }),
  }, { set: 'new', role: 'needs-review' }, 'unresolved New evidence keeps its source-set label');
  assert.equal(sourceRoleFor({ set: 'new', kind: 'primary', verified: true, hasNewPrimary: true }), 'current-primary');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: true }), 'older-supporting');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: false }), 'older-fallback');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: true, hasGap: false }), 'needs-review');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: false, hasGap: true }), 'missing');
  assert.equal(typeof indexMap, 'function');
  console.log('SELFTEST PASS');
} else {
  const {
    SOURCE_MAP_VERSION,
    Y1S1_SOURCE_MAP,
    sourceGroupFor,
    sourceGroupsForWeek,
    sourceMetaFor,
    sourceSetLabel,
    sourceRoleLabel,
  } = await import('../outputs/study/corpus/source-lesson-map.js');
  const { COVERAGE } = await import('../outputs/study/corpus/coverage.js');
  const { getItem } = await import('../outputs/study/corpus/corpus.js');
  const { SOURCE_FILES, SOURCE_ROOTS } = await import('../outputs/study/corpus/schema.js');
  const { STUDY_SUBJECTS, WEEK_GAPS, WEEK_STUDY } = await import('../outputs/schedule.js');

  assert.equal(SOURCE_MAP_VERSION, '2026-09-05');
  assert.equal(Y1S1_SOURCE_MAP.scope, 'Y1S1');
  const expected = Object.entries(WEEK_STUDY).flatMap(([subject, weeks]) =>
    Object.entries(weeks).flatMap(([week, ids]) => ids.map((id) => ({ id, subject, week: Number(week), item: getItem(id) }))));
  assert.deepEqual(Object.keys(Y1S1_SOURCE_MAP.byLesson).sort(), expected.map(({ id }) => id).sort(),
    'generated map covers every current WEEK_STUDY lesson exactly once');
  assert.deepEqual(Object.keys(Y1S1_SOURCE_MAP.byWeek).sort(), STUDY_SUBJECTS.slice().sort(),
    'generated map contains each current study subject');

  const statuses = new Set(['complete', 'partial', 'missing', 'needs-review']);
  const roles = new Set(['current-primary', 'older-supporting', 'older-fallback', 'needs-review', 'assessment', 'administration', 'student-work']);
  const roleLabels = {
    'current-primary': 'primary',
    'older-supporting': 'supporting',
    'older-fallback': 'fallback',
    'needs-review': 'needs review',
    assessment: 'assessment/practice',
    administration: 'administration',
    'student-work': 'student work',
  };
  const newFiles = new Set(COVERAGE.newSourceIntake.map(({ file }) => normaliseSourceFile(file)));
  const expectedSet = (ref) => {
    const entry = SOURCE_FILES[ref];
    return sourceSetFor({
      file: entry.file,
      locations: [SOURCE_ROOTS[entry.root] || '', entry.folder || ''],
    }, newFiles);
  };
  const publicText = readFileSync(new URL('../outputs/study/corpus/source-lesson-map.js', import.meta.url), 'utf8');
  assert.ok(!/(?:[CG]:[\\/]|\\\\)/i.test(publicText), 'public map contains a private path');
  assert.ok(!/"(?:lesson|memory|practice|application|pages|text|file|folder|location)"\s*:/.test(publicText),
    'public map contains copied item/source prose fields');

  for (const [subject, weeks] of Object.entries(WEEK_STUDY)) {
    assert.deepEqual(Object.keys(Y1S1_SOURCE_MAP.byWeek[subject] || {}).map(Number).sort((a, b) => a - b),
      Object.keys(weeks).map(Number).sort((a, b) => a - b), `${subject} map preserves every scheduled week, including gaps`);
    for (const [week, ids] of Object.entries(weeks)) {
      assert.deepEqual(Y1S1_SOURCE_MAP.byWeek[subject][week], ids, `${subject} week ${week} preserves schedule order`);
    }
  }
  for (const [subject, weeks] of Object.entries(WEEK_GAPS)) for (const week of Object.keys(weeks)) {
    assert.deepEqual(WEEK_STUDY[subject]?.[week], [], `${subject} week ${week} gap belongs to an empty scheduled week`);
    assert.deepEqual(Y1S1_SOURCE_MAP.byWeek[subject]?.[week], [], `${subject} week ${week} remains an explicit public-map gap`);
  }
  assert.equal(Object.hasOwn(Y1S1_SOURCE_MAP.byWeek, 'LEI1101'), false, 'LEI1101 remains schedule-only, outside the teaching-source map');

  for (const lesson of expected) {
    const group = sourceGroupFor(lesson.id);
    assert.ok(group, `missing generated lesson group: ${lesson.id}`);
    assert.deepEqual({ subject: group.subject, week: group.week }, { subject: lesson.subject, week: lesson.week });
    assert.deepEqual(Object.keys(group).sort(), ['id', 'reasons', 'sources', 'status', 'subject', 'title', 'week']);
    assert.equal(sourceGroupsForWeek(lesson.subject, lesson.week).some((candidate) => candidate.id === lesson.id), true);
    assert.equal(group.title, lesson.item.title, `lesson title drifted from corpus: ${lesson.id}`);
    assert.equal(statuses.has(group.status), true, `invalid lesson status: ${lesson.id}`);
    assert.equal(Array.isArray(group.reasons) && group.reasons.every((reason) => typeof reason === 'string'), true,
      `invalid lesson reasons: ${lesson.id}`);
    const itemRefs = [...groupReferencesByRef(lesson.item.sourceRefs || []).keys()].sort();
    assert.deepEqual(group.sources.map((source) => source.ref).sort(), itemRefs,
      `public source list does not correspond to item sourceRefs: ${lesson.id}`);
    assert.equal(new Set(group.sources.map((source) => source.ref)).size, group.sources.length,
      `duplicate public source row: ${lesson.id}`);
    for (const source of group.sources) {
      assert.ok(SOURCE_FILES[source.ref], `generated source ref is not in SOURCE_FILES: ${source.ref}`);
      assert.deepEqual(Object.keys(source).sort(), ['ref', 'role', 'set']);
      assert.ok(source.set === 'new' || source.set === 'old', `invalid source set: ${lesson.id}/${source.ref}`);
      assert.equal(source.set, expectedSet(source.ref), `source-set evidence drifted: ${lesson.id}/${source.ref}`);
      assert.equal(roles.has(source.role), true, `invalid source role: ${lesson.id}/${source.ref}`);
      assert.equal(sourceMetaFor(source.ref, lesson.id)?.ref, source.ref);
      assert.equal(Y1S1_SOURCE_MAP.bySource[source.ref].some((link) => link.lessonId === lesson.id), true);
      assert.equal(sourceSetLabel(source.set), source.set === 'new' ? 'New source' : 'Old source');
      assert.equal(sourceRoleLabel(source.role), roleLabels[source.role]);
      const kind = SOURCE_FILES[source.ref].kind;
      if (source.role === 'current-primary') assert.deepEqual([source.set, kind], ['new', 'primary']);
      if (source.role === 'older-supporting' || source.role === 'older-fallback') assert.deepEqual([source.set, kind], ['old', 'primary']);
      if (source.role === 'assessment') assert.equal(kind, 'assessment');
      if (source.role === 'administration') assert.ok(kind === 'admin' || kind === 'syllabus');
      if (source.role === 'student-work') assert.equal(kind, 'student');
    }
    const hasPrimary = group.sources.some((source) => source.role === 'current-primary');
    const hasOlderTeaching = group.sources.some((source) => source.role === 'older-supporting' || source.role === 'older-fallback');
    const hasReview = group.sources.some((source) => source.role === 'needs-review');
    const expectedStatus = hasPrimary ? 'complete' : hasOlderTeaching ? 'partial' : hasReview ? 'needs-review' : 'missing';
    assert.equal(group.status, expectedStatus, `status does not follow public roles: ${lesson.id}`);
    assert.equal(group.sources.some((source) => source.role === 'older-supporting') && !hasPrimary, false,
      `supporting old source has no current primary: ${lesson.id}`);
    assert.equal(group.sources.some((source) => source.role === 'older-fallback') && hasPrimary, false,
      `fallback old source is shown despite a current primary: ${lesson.id}`);
  }
  const rebuiltBySource = {};
  for (const group of Object.values(Y1S1_SOURCE_MAP.byLesson)) for (const source of group.sources) {
    (rebuiltBySource[source.ref] ||= []).push({ lessonId: group.id, set: source.set, role: source.role });
  }
  assert.deepEqual(Y1S1_SOURCE_MAP.bySource, rebuiltBySource, 'bySource is not the exact inverse of byLesson');
  for (const [ref, links] of Object.entries(Y1S1_SOURCE_MAP.bySource)) {
    assert.ok(SOURCE_FILES[ref], `bySource contains an unknown ref: ${ref}`);
    for (const link of links) {
      assert.deepEqual(Object.keys(link).sort(), ['lessonId', 'role', 'set']);
      assert.equal(roles.has(link.role), true);
      assert.equal(sourceGroupFor(link.lessonId)?.sources.some((source) => source.ref === ref), true);
    }
  }
  console.log(`MAP CHECK PASS: ${expected.length} lessons, ${Object.keys(Y1S1_SOURCE_MAP.bySource).length} refs`);
}
