/*
 * Schedule check -- is the timetable well-formed?
 *
 * outputs/schedule.js is the semester: when each class happens, what each
 * subject's assessments weigh, and which weeks have no official teaching notes.
 * (It once also pointed at study items and units; the app no longer tests, so
 * those references and their checks are gone.)
 *
 * Checks the arithmetic nobody re-does by hand: that each subject's assessment
 * weights add to 100, that every session lands inside the term, and that every
 * session has a unique storage id and every weekly gap a real reason.
 *
 * Usage: node work/schedule-check.mjs
 */
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import * as course from '../outputs/schedule.js';

const { SESSIONS, SUBJECT_ADMIN, TERM, sessionSpan, weekEnd, weekStart } = course;
const WEEK_GAPS = course.WEEK_GAPS || {};
const STUDY_SUBJECTS = course.STUDY_SUBJECTS || [];

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

console.log('— every session has a unique id —');
{
  const seen = new Set(); const duplicateIds = [];
  for (const s of SESSIONS) {
    if (seen.has(s.id)) duplicateIds.push(s.id);
    seen.add(s.id);
  }
  ok(!duplicateIds.length, duplicateIds.length
    ? `duplicate session ids: ${[...new Set(duplicateIds)].join(', ')}`
    : 'every session has a unique storage id');
}

console.log('— the subjects and the weekly gaps are well-formed —');
{
  const expectedSubjects = ['HSS2011', 'ABCT2326', 'HTI17103', 'APSS1A08', 'DSAI1202'];
  const missingSubjects = expectedSubjects.filter((code) => !STUDY_SUBJECTS.includes(code));
  const extraSubjects = STUDY_SUBJECTS.filter((code) => !expectedSubjects.includes(code));
  ok(!missingSubjects.length && !extraSubjects.length,
    missingSubjects.length || extraSubjects.length
      ? `study subjects disagree: missing ${missingSubjects.join(', ') || 'none'}; extra ${extraSubjects.join(', ') || 'none'}`
      : `all ${expectedSubjects.length} supplied subjects appear in the weekly-notes view`);

  const orphanGaps = [];
  for (const [subject, weeks] of Object.entries(WEEK_GAPS)) {
    if (!expectedSubjects.includes(subject)) orphanGaps.push(subject + ': not a current subject');
    for (const [week, reason] of Object.entries(weeks)) {
      if (!reason?.trim()) orphanGaps.push(subject + ' week ' + week + ': blank reason');
      else if (+week < 1 || +week > TERM.weeks) orphanGaps.push(subject + ' week ' + week + ': outside the term');
    }
  }
  ok(!orphanGaps.length, orphanGaps.length ? 'invalid gap records: ' + orphanGaps.join(', ') : 'every weekly gap names a real week and gives a reason');
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
