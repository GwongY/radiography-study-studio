/*
 * Assessments, deadlines and the running mark.
 *
 * The Course tab now prints a number a student will make decisions with: what
 * is already banked, what is still to come, and what the rest has to average
 * to reach a target. A weighted mean is easy to get subtly wrong and hard to
 * notice — "78%" looks equally plausible whether or not it divided by the
 * right denominator — so the arithmetic is pure and it is driven here.
 *
 * Three separate things are checked:
 *
 *   THE MATHS. computeMark and needFor against hand-worked cases, including
 *   the two that always break first: nothing entered at all, and a target
 *   that is already unreachable.
 *   THE DATA. Every deadline the list shows is a real, dated, sourced session
 *   out of outputs/schedule.js, and every subject's components still sum to
 *   the 100% the mark bar draws itself against. schedule-check.mjs proves the
 *   sessions exist; this proves the assessment view's own reading of them.
 *   THE CALENDAR FILE. Every dated session comes out as one VEVENT with a
 *   start no later than its end and no unescaped delimiter in its text — an
 *   .ics with one bad line is refused whole by the strict importers.
 *
 * Usage: node work/assessment-check.mjs
 */
import {
  DEADLINES, IMMINENT_MS, SOON_MS, buildICS, computeMark, deadlineState, imminent,
  markKey, needFor, untilText,
} from '../outputs/study/assessments-and-marks.js';
import { SESSIONS, SUBJECT_ADMIN, sessionsWithStatus } from '../outputs/schedule.js';

let failures = 0;
const fail = (msg) => { failures += 1; console.log(`  FAIL  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);
const near = (a, b) => Math.abs(a - b) < 1e-9;
const eq = (label, got, want) => (near(got, want) ? ok(`${label} = ${got}`) : fail(`${label} = ${got}, expected ${want}`));

/* ------------------------------------------------------------------ *
 * The maths
 * ------------------------------------------------------------------ */
console.log('— the weighted mark —');
/* HSS2011's real shape: 8 + 60 + 32. */
const hss = [{ name: 'Revision exercise', weight: 8 }, { name: 'Closed-book test', weight: 60 }, { name: 'In-class exercise', weight: 32 }];

const none = computeMark(hss, {});
eq('nothing entered · banked', none.banked, 0);
eq('nothing entered · pending', none.pending, 100);
if (none.average !== null) fail(`nothing entered · average should be null, got ${none.average}`);
else ok('nothing entered · average is null, not 0 — an unmarked subject is not a failed one');
eq('nothing entered · best still reachable', none.best, 100);

const part = computeMark(hss, { 'Revision exercise': 75 });
eq('75% of the 8% component · banked', part.banked, 6);
eq('75% of the 8% component · entered weight', part.entered, 8);
eq('75% of the 8% component · pending weight', part.pending, 92);
eq('75% of the 8% component · average across what is marked', part.average, 75);
eq('75% of the 8% component · best still reachable', part.best, 98);

const most = computeMark(hss, { 'Revision exercise': 75, 'Closed-book test': 50 });
eq('and 50% of the 60% test · banked', most.banked, 36);
eq('and 50% of the 60% test · average', most.average, 36 / 68 * 100);
eq('and 50% of the 60% test · best', most.best, 68);

const all = computeMark(hss, { 'Revision exercise': 100, 'Closed-book test': 100, 'In-class exercise': 100 });
eq('everything perfect · banked', all.banked, 100);
eq('everything perfect · pending', all.pending, 0);

console.log('\n— what the rest has to average —');
eq('from 6 banked of 8, to reach 50 overall', needFor(part, 50), (50 - 6) / 92 * 100);
eq('to reach 60 overall', needFor(part, 60), (60 - 6) / 92 * 100);
/* The one the UI must never print as advice. */
const doomed = computeMark(hss, { 'Closed-book test': 0 });
const need70 = needFor(doomed, 70);
if (need70 <= 100) fail(`a zero on the 60% test should put 70 out of reach, needFor said ${need70}`);
else ok(`a zero on the 60% test puts 70 out of reach (${Math.round(need70)}% needed — the panel hides it)`);
if (needFor(all, 60) !== null) fail('with nothing left to mark, needFor must be null');
else ok('with nothing left to mark, needFor is null rather than a division by zero');

console.log('\n— a mark is keyed by name, not by position —');
if (markKey('HSS2011', 'Closed-book test') !== markKey('HSS2011', 'Closed-book test')) fail('markKey is not stable');
else ok(`markKey('HSS2011', 'Closed-book test') = ${markKey('HSS2011', 'Closed-book test')}`);
if (markKey('HSS2011', 'Quiz') === markKey('ABCT2326', 'Quiz')) fail('two subjects share a key for a same-named component');
else ok('the same component name in two subjects keys differently');

/* ------------------------------------------------------------------ *
 * The data behind the list
 * ------------------------------------------------------------------ */
console.log('\n— every deadline is a real, dated session —');
const assessments = SESSIONS.filter((s) => s.kind === 'assessment');
if (DEADLINES.length !== assessments.length) fail(`${DEADLINES.length} deadlines from ${assessments.length} assessment sessions`);
else ok(`${DEADLINES.length} deadlines, one per assessment row in the schedule`);
for (const row of DEADLINES) {
  if (!row.s.id) fail(`a deadline with no session id: ${row.s.title}`);
  if (!row.s.on) fail(`undated assessment reaches the deadline list: ${row.s.subject} ${row.s.title}`);
  if (!(row.to instanceof Date) || Number.isNaN(+row.to)) fail(`unusable due instant: ${row.s.title}`);
}
const ids = new Set(DEADLINES.map((r) => r.s.id));
if (ids.size !== DEADLINES.length) fail('two deadlines share a session id — one would toggle the other');
else ok('every deadline has its own id, so "handed in" cannot land on the wrong row');
let ordered = true;
for (let i = 1; i < DEADLINES.length; i++) if (DEADLINES[i].to < DEADLINES[i - 1].to) ordered = false;
if (!ordered) fail('the deadline list is not in time order'); else ok('the list is in time order');

console.log('\n— the states a deadline can be in —');
const first = DEADLINES[0];
const before = new Date(+first.to - 100 * 86400000);
const inside = new Date(+first.to - 2 * 86400000);
const after = new Date(+first.to + 86400000);
eq('handed in beats everything', deadlineState(first, after, true) === 'done' ? 1 : 0, 1);
eq('a hundred days out is "later"', deadlineState(first, before, false) === 'later' ? 1 : 0, 1);
eq('two days out is "soon"', deadlineState(first, inside, false) === 'soon' ? 1 : 0, 1);
eq('a day past is "overdue"', deadlineState(first, after, false) === 'overdue' ? 1 : 0, 1);
eq('the soon window is a week', SOON_MS, 7 * 86400000);
ok(`countdown reads "${untilText(first.to, inside)}" two days out and "${untilText(first.to, after)}" a day late`);

console.log('\n— the weights the mark bar draws against —');
for (const [code, admin] of Object.entries(SUBJECT_ADMIN)) {
  const total = admin.assessment.reduce((n, c) => n + c.weight, 0);
  if (total !== 100) fail(`${code} components sum to ${total}%, and the bar is drawn as a fraction of 100`);
  else ok(`${code} · ${admin.assessment.length} components summing to 100%`);
  const names = new Set(admin.assessment.map((c) => c.name));
  if (names.size !== admin.assessment.length) fail(`${code} has two components with the same name — they would share one mark box`);
}

/* ------------------------------------------------------------------ *
 * The twenty-minute warning
 * ------------------------------------------------------------------ */
console.log('\n— the imminent banner —');
/* Driven off a real lecture: HSS2011 Friday 16:30. A banner that is up when it
   should not be is worse than no banner, so the silent cases are checked as
   hard as the loud one. */
const lecture = SESSIONS.find((s) => s.subject === 'HSS2011' && s.kind === 'lecture' && s.at && s.at[0] === 16);
if (!lecture) fail('no HSS2011 16:30 lecture to drive the banner from');
else {
  const [y, m, d] = lecture.on;
  const at = (mins) => new Date(y, m, d, 16, 30 + mins);
  const shows = (mins) => {
    const now = at(mins);
    return !!imminent(now, sessionsWithStatus(now));
  };
  const live = (mins) => {
    const now = at(mins);
    const hit = imminent(now, sessionsWithStatus(now));
    return !!hit && hit.live;
  };
  if (shows(-60)) fail('an hour out, the banner is up'); else ok('an hour out: nothing');
  if (shows(-21)) fail('twenty-one minutes out, the banner is up'); else ok('21 min out: nothing');
  if (!shows(-10)) fail('ten minutes out, the banner is NOT up'); else ok('10 min out: "Starts soon"');
  if (!live(30)) fail('half an hour into the lecture, it does not read as on now'); else ok('mid-lecture: "On now"');
  if (shows(200)) fail('three hours after it ended, something is still up'); else ok('after it ends: nothing');
  eq('the warning window', IMMINENT_MS, 20 * 60000);
}

/* ------------------------------------------------------------------ *
 * The calendar file
 * ------------------------------------------------------------------ */
console.log('\n— the .ics —');
const text = buildICS(SESSIONS, new Date(Date.UTC(2026, 8, 6, 2, 9, 19)));
const dated = SESSIONS.filter((s) => s.on && s.at).length;
const events = (text.match(/BEGIN:VEVENT/g) || []).length;
if (events !== dated) fail(`${events} VEVENTs from ${dated} dated sessions`);
else ok(`${events} events, one per dated session (${SESSIONS.length - dated} undated rows correctly left out)`);
if (!text.startsWith('BEGIN:VCALENDAR\r\n')) fail('the file does not open with BEGIN:VCALENDAR and CRLF');
else ok('opens BEGIN:VCALENDAR, CRLF line endings');
if (!text.endsWith('END:VCALENDAR\r\n')) fail('the file does not close with END:VCALENDAR');
else ok('closes END:VCALENDAR');
if ((text.match(/END:VEVENT/g) || []).length !== events) fail('an unclosed VEVENT');
else ok('every VEVENT is closed');

const uids = text.split('\r\n').filter((l) => l.startsWith('UID:'));
if (new Set(uids).size !== uids.length) fail('two events share a UID — a calendar would keep only one');
else ok(`${uids.length} distinct UIDs`);

let badSpan = 0;
let badFold = 0;
for (const block of text.split('BEGIN:VEVENT').slice(1)) {
  const start = (block.match(/DTSTART:(\d{8}T\d{6})/) || [])[1];
  const end = (block.match(/DTEND:(\d{8}T\d{6})/) || [])[1];
  if (!start || !end || end < start) badSpan += 1;
  /* An unescaped comma or semicolon inside SUMMARY / DESCRIPTION / LOCATION
     is what makes a strict importer reject the whole file. */
  for (const line of block.split('\r\n')) {
    const m = /^(SUMMARY|DESCRIPTION|LOCATION):(.*)$/.exec(line);
    if (m && /(^|[^\\])[,;]/.test(m[2])) badFold += 1;
  }
}
if (badSpan) fail(`${badSpan} events end before they start`); else ok('every event ends no earlier than it starts');
if (badFold) fail(`${badFold} text lines carry an unescaped , or ;`); else ok('every text value has its delimiters escaped');

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
