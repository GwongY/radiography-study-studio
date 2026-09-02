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
import { SESSIONS, SUBJECT_ADMIN, TERM, WEEK_STUDY, sessionSpan, weekEnd, weekStart } from '../outputs/schedule.js';

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

const ids = new Set(STUDY_ITEMS.map((i) => i.id));
const units = new Set();
for (const s of SUBJECTS) for (const u of s.units) units.add(u.id);

console.log('— every session points at a real unit —');
{
  const bad = SESSIONS.filter((s) => s.unit && !units.has(s.unit));
  ok(!bad.length, bad.length ? `unknown units: ${bad.map((s) => s.unit).join(', ')}` : `${SESSIONS.filter((s) => s.unit).length} of ${SESSIONS.length} sessions name a unit, all of them real`);
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
  const bad = SESSIONS.filter((s) => { const sp = sessionSpan(s); return sp.from < from || sp.to > to; });
  ok(!bad.length, bad.length ? `outside weeks 1–${TERM.weeks}: ${bad.map((s) => s.id).join(', ')}` : `all ${SESSIONS.length} sessions inside weeks 1–${TERM.weeks}`);
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
