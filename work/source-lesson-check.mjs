import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import {
  indexMap,
  lessonStatus,
  normaliseSourceFile,
  sourceRoleFor,
  sourceSetFor,
} from './lib/source-lesson-map.mjs';

const isSelftest = process.argv.includes('--selftest');

const fixture = JSON.parse(await readFile(new URL('./fixtures/source-lesson-map-selftest.json', import.meta.url)));

if (isSelftest) {
  const newFiles = new Set([normaliseSourceFile(fixture.newFile)]);
  assert.equal(sourceSetFor({ file: fixture.newFile, locations: [] }, newFiles), 'new');
  assert.equal(sourceSetFor({ file: fixture.oldFile, locations: [] }, newFiles), 'old');
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
  const { SOURCE_FILES } = await import('../outputs/study/corpus/schema.js');
  const { STUDY_SUBJECTS, WEEK_STUDY } = await import('../outputs/schedule.js');

  assert.equal(SOURCE_MAP_VERSION, '2026-09-05');
  assert.equal(Y1S1_SOURCE_MAP.scope, 'Y1S1');
  const expected = Object.entries(WEEK_STUDY).flatMap(([subject, weeks]) =>
    Object.entries(weeks).flatMap(([week, ids]) => ids.map((id) => ({ id, subject, week: Number(week) }))));
  assert.deepEqual(Object.keys(Y1S1_SOURCE_MAP.byLesson).sort(), expected.map(({ id }) => id).sort(),
    'generated map covers every current WEEK_STUDY lesson exactly once');
  assert.deepEqual(Object.keys(Y1S1_SOURCE_MAP.byWeek).sort(), STUDY_SUBJECTS.slice().sort(),
    'generated map contains each current study subject');

  const teachingRoles = new Set(['current-primary', 'older-supporting', 'older-fallback']);
  const publicText = readFileSync(new URL('../outputs/study/corpus/source-lesson-map.js', import.meta.url), 'utf8');
  assert.ok(!/(?:[CG]:[\\/]|\\\\)/i.test(publicText), 'public map contains a private path');
  assert.ok(!/"(?:lesson|memory|practice|application|pages|text|file|folder|location)"\s*:/.test(publicText),
    'public map contains copied item/source prose fields');

  for (const lesson of expected) {
    const group = sourceGroupFor(lesson.id);
    assert.ok(group, `missing generated lesson group: ${lesson.id}`);
    assert.deepEqual({ subject: group.subject, week: group.week }, { subject: lesson.subject, week: lesson.week });
    assert.deepEqual(Object.keys(group).sort(), ['id', 'reasons', 'sources', 'status', 'subject', 'title', 'week']);
    assert.equal(sourceGroupsForWeek(lesson.subject, lesson.week).some((candidate) => candidate.id === lesson.id), true);
    assert.equal(group.title?.length > 0, true, `lesson group has no title: ${lesson.id}`);
    for (const source of group.sources) {
      assert.ok(SOURCE_FILES[source.ref], `generated source ref is not in SOURCE_FILES: ${source.ref}`);
      assert.deepEqual(Object.keys(source).sort(), ['ref', 'role', 'set']);
      assert.equal(sourceMetaFor(source.ref, lesson.id)?.ref, source.ref);
      assert.equal(Y1S1_SOURCE_MAP.bySource[source.ref].some((link) => link.lessonId === lesson.id), true);
      assert.ok(sourceSetLabel(source.set) === 'New source' || sourceSetLabel(source.set) === 'Old source');
      assert.ok(sourceRoleLabel(source.role).length > 0);
    }
  }
  for (const [ref, links] of Object.entries(Y1S1_SOURCE_MAP.bySource)) {
    assert.ok(SOURCE_FILES[ref], `bySource contains an unknown ref: ${ref}`);
    for (const link of links) {
      assert.deepEqual(Object.keys(link).sort(), ['lessonId', 'role', 'set']);
      assert.ok(teachingRoles.has(link.role) || ['needs-review', 'assessment', 'administration', 'student-work'].includes(link.role));
      assert.equal(sourceGroupFor(link.lessonId)?.sources.some((source) => source.ref === ref), true);
    }
  }

  /* Regression: dsai.w1 is intentionally mixed. Its first link is an
     unresolved/needs-review lesson, but its later link is verified teaching
     evidence. The audit classification must select that teaching link, not
     blindly copy the first role. */
  const mixed = Y1S1_SOURCE_MAP.bySource['dsai.w1'] || [];
  assert.ok(mixed.some((link) => link.role === 'needs-review') && mixed.some((link) => link.role === 'current-primary'),
    'mixed-reference regression fixture has changed');
  const auditPath = new URL('./.source-lesson-audit/INDEX.tsv', import.meta.url);
  assert.ok(existsSync(auditPath), 'generator audit is missing; run the generator first');
  const auditRows = readFileSync(auditPath, 'utf8').trim().split(/\r?\n/).slice(1)
    .map((line) => line.split('\t'));
  const dsaiRow = auditRows.find((row) => row[9] === SOURCE_FILES['dsai.w1'].file);
  assert.equal(dsaiRow?.[4], 'current-primary', 'mixed references must classify by the first verified teaching role');
  console.log(`MAP CHECK PASS: ${expected.length} lessons, ${Object.keys(Y1S1_SOURCE_MAP.bySource).length} refs`);
}
