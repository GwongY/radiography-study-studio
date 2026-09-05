/*
 * Schedule check — does the timetable point at things that exist?
 *
 * outputs/schedule.js carries two kinds of reference into the rest of the app,
 * and both are the sort that fail silently:
 *
 *   session.unit    the study unit a lecture teaches, so a row can open it
 *   WEEK_STUDY      the item ids to read before that week's class
 *
 * A wrong id here does not throw. The row simply loses its "Study this"
 * button, or a week's reading list quietly comes back one lesson short — and
 * nothing else in the repo would ever notice, because the corpus is perfectly
 * valid without being pointed at.
 *
 * Also checks the arithmetic nobody re-does by hand: that each subject's
 * assessment weights add to 100, and that every session lands inside the term.
 *
 * Usage: node work/schedule-check.mjs
 */
import { STUDY_ITEMS, SUBJECTS, SOURCE_FILES } from '../outputs/study-data.js';
import * as course from '../outputs/schedule.js';

const { SESSIONS, SUBJECT_ADMIN, TERM, WEEK_STUDY, sessionSpan, weekEnd, weekStart } = course;
const WEEK_GAPS = course.WEEK_GAPS || {};
const STUDY_SUBJECTS = course.STUDY_SUBJECTS || [];

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

const ids = new Set(STUDY_ITEMS.map((i) => i.id));
const units = new Set();
for (const s of SUBJECTS) for (const u of s.units) units.add(u.id);

console.log('— every session points at a real unit —');
{
  const bad = SESSIONS.filter((s) => s.unit && !units.has(s.unit));
  ok(!bad.length, bad.length ? `unknown units: ${bad.map((s) => s.unit).join(', ')}` : `${SESSIONS.filter((s) => s.unit).length} of ${SESSIONS.length} sessions name a unit, all of them real`);
  const seen = new Set(); const duplicateIds = [];
  for (const s of SESSIONS) {
    if (seen.has(s.id)) duplicateIds.push(s.id);
    seen.add(s.id);
  }
  ok(!duplicateIds.length, duplicateIds.length
    ? `duplicate session ids: ${[...new Set(duplicateIds)].join(', ')}`
    : 'every session has a unique storage id');
}

console.log('— every week reading list points at real items —');
{
  let n = 0; const bad = [];
  for (const [subject, weeks] of Object.entries(WEEK_STUDY)) {
    for (const [w, list] of Object.entries(weeks)) {
      for (const id of list) { n++; if (!ids.has(id)) bad.push(`${subject} week ${w}: ${id}`); }
    }
  }
  ok(!bad.length, bad.length ? `unknown item ids —\n       ${bad.join('\n       ')}` : `${n} reading-list entries, all resolving`);
  /* A lesson listed twice in one week is a copy-paste, not a plan. */
  const dupes = [];
  for (const [subject, weeks] of Object.entries(WEEK_STUDY)) {
    for (const [w, list] of Object.entries(weeks)) {
      const seen = new Set();
      for (const id of list) { if (seen.has(id)) dupes.push(`${subject} week ${w}: ${id}`); seen.add(id); }
    }
  }
  ok(!dupes.length, dupes.length ? `repeated within one week: ${dupes.join(', ')}` : 'no lesson listed twice in the same week');
}

console.log('— weekly notes are complete and subject-safe —');
{
  const expectedSubjects = ['HSS2011', 'ABCT2326', 'HTI17103', 'APSS1A08', 'DSAI1202'];
  const missingSubjects = expectedSubjects.filter((code) => !STUDY_SUBJECTS.includes(code));
  const extraSubjects = STUDY_SUBJECTS.filter((code) => !expectedSubjects.includes(code));
  ok(!missingSubjects.length && !extraSubjects.length,
    missingSubjects.length || extraSubjects.length
      ? `study subjects disagree: missing ${missingSubjects.join(', ') || 'none'}; extra ${extraSubjects.join(', ') || 'none'}`
      : `all ${expectedSubjects.length} supplied subjects appear in the weekly-notes view`);

  const byId = new Map(STUDY_ITEMS.map((item) => [item.id, item]));
  const wrongSubject = [];
  const scheduled = new Set();
  const silentGaps = [];
  for (const [subject, weeks] of Object.entries(WEEK_STUDY)) {
    for (const [week, list] of Object.entries(weeks)) {
      if (!list.length && !WEEK_GAPS[subject]?.[week]) silentGaps.push(`${subject} week ${week}`);
      for (const id of list) {
        scheduled.add(id);
        const item = byId.get(id);
        if (item && item.subject !== subject) wrongSubject.push(`${subject} week ${week}: ${id} belongs to ${item.subject}`);
      }
    }
  }
  ok(!wrongSubject.length, wrongSubject.length ? `cross-subject notes —\n       ${wrongSubject.join('\n       ')}` : 'every weekly note belongs to the subject that lists it');
  ok(!silentGaps.length, silentGaps.length ? `empty weeks without an explanation: ${silentGaps.join(', ')}` : 'every empty teaching week names its source gap');

  const orphanGaps = [];
  for (const [subject, weeks] of Object.entries(WEEK_GAPS)) {
    for (const [week, reason] of Object.entries(weeks)) {
      if (!reason?.trim()) orphanGaps.push(`${subject} week ${week}: blank reason`);
      else if (!Object.hasOwn(WEEK_STUDY[subject] || {}, week)) orphanGaps.push(`${subject} week ${week}: no matching week`);
      else if (WEEK_STUDY[subject][week].length) orphanGaps.push(`${subject} week ${week}: notes exist as well as a gap`);
    }
  }
  ok(!orphanGaps.length, orphanGaps.length ? `invalid gap records: ${orphanGaps.join(', ')}` : 'every source-gap record belongs to an empty mapped week');

  const uncovered = STUDY_ITEMS.filter((item) => expectedSubjects.includes(item.subject) && !scheduled.has(item.id));
  ok(!uncovered.length,
    uncovered.length
      ? `${uncovered.length} lessons are absent from every weekly plan —\n       ${uncovered.map((item) => `${item.subject}: ${item.id}`).join('\n       ')}`
      : `all ${STUDY_ITEMS.filter((item) => expectedSubjects.includes(item.subject)).length} lessons appear in a weekly plan`);
}

console.log('— the weights add up —');
for (const [code, a] of Object.entries(SUBJECT_ADMIN)) {
  const total = a.assessment.reduce((n, x) => n + x.weight, 0);
  ok(total === 100, `${code}: ${a.assessment.map((x) => x.weight + '%').join(' + ')} = ${total}%`);
  for (const x of a.assessment) {
    if (!x.src) continue;
    ok(!!SOURCE_FILES[x.src.ref], `${code} "${x.name}" cites ${x.src.ref}`);
  }
}

console.log('— every session lands inside the term —');
{
  const from = weekStart(1), to = weekEnd(TERM.weeks);
  const outside = SESSIONS.filter((s) => { const sp = sessionSpan(s); return sp.from < from || sp.to > to; });
  const unlabelled = outside.filter((s) => !s.outsideTeachingTerm);
  const falseLabels = SESSIONS.filter((s) => {
    if (!s.outsideTeachingTerm) return false;
    const sp = sessionSpan(s);
    return sp.from >= from && sp.to <= to;
  });
  ok(!unlabelled.length, unlabelled.length
    ? `outside weeks 1–${TERM.weeks} without outsideTeachingTerm: ${unlabelled.map((s) => s.id).join(', ')}`
    : `${SESSIONS.length - outside.length} sessions inside teaching term; ${outside.length} later deadline${outside.length === 1 ? '' : 's'} explicitly labelled`);
  ok(!falseLabels.length, falseLabels.length
    ? `outsideTeachingTerm set on in-term rows: ${falseLabels.map((s) => s.id).join(', ')}`
    : 'outside-term labels are only used beyond the teaching term');
  /* A session's own week number must agree with the date it carries. */
  const wrong = SESSIONS.filter((s) => {
    if (!s.on) return false;
    const sp = sessionSpan(s);
    return sp.from < weekStart(s.week) || sp.from > weekEnd(s.week);
  });
  ok(!wrong.length, wrong.length ? `date disagrees with its week: ${wrong.map((s) => s.id).join(', ')}` : 'every dated session falls in the week it claims');
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
