/*
 * outputs/programme.js against the programme document it cites.
 *
 * The .xlsx lives in the owner's offline collection, not in this public repo,
 * so the check holds the data to the totals the sheet itself prints (each
 * semester's credits, 138 overall) and to the rules the module states.
 *
 *   - per stream, every semester's credits equal the sheet's section total
 *   - per stream, the programme totals 138
 *   - no code repeats within a stream/semester; every row has a valid stream
 *   - a subject taken in more than one stream carries the same flags
 *   - every compulsory discipline subject has an EXAM entry; exam/examBasis are
 *     valid, an estimate is never 'confirmed', and a 'no' exam is never important
 *   - `important` equals the rule (isImportant) on every row, and the rule's
 *     outcome matches the hand-checked expectations below
 *   - chosenStream is null, 'RT' or 'MI' and both streams' subjects exist
 *   - the cited source is registered
 */
import {
  EXAM, PROGRAMME, SHEET_SEMESTER_CREDITS, TOTAL_CREDITS, isImportant, semesterCredits, subjectsOf,
} from '../outputs/programme.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';

let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL ' + m); } };

ok(SOURCE_FILES[PROGRAMME.source], `source ${PROGRAMME.source} is not in SOURCE_FILES`);
ok([null, 'RT', 'MI'].includes(PROGRAMME.chosenStream), 'chosenStream must be null, RT or MI');

for (const stream of ['MI', 'RT']) {
  let total = 0;
  for (const [key, want] of Object.entries(SHEET_SEMESTER_CREDITS)) {
    const [year, sem] = key.split('-');
    const got = semesterCredits(+year, sem, stream);
    total += got;
    ok(got === want, `${stream} Y${year} ${sem}: ${got} credits, sheet says ${want}`);
  }
  ok(total === TOTAL_CREDITS, `${stream} total ${total}, sheet says ${TOTAL_CREDITS}`);
  for (const [key] of Object.entries(SHEET_SEMESTER_CREDITS)) {
    const [year, sem] = key.split('-');
    const codes = subjectsOf(+year, sem, stream).map((s) => s.code).filter(Boolean);
    ok(new Set(codes).size === codes.length, `${stream} Y${year} ${sem}: a code repeats`);
  }
}

for (const s of PROGRAMME.subjects) {
  ok(['yes', 'no', 'unknown'].includes(s.exam), `${s.code || s.title}: bad exam`);
  ok(['confirmed', 'estimated'].includes(s.examBasis), `${s.code || s.title}: bad examBasis`);
  ok(s.examNote && s.examNote.length > 8, `${s.code || s.title}: examNote missing`);
  if (s.exam === 'no') ok(!s.important, `${s.code || s.title}: exam 'no' but important`);
  if (s.exam === 'unknown') ok(s.examBasis === 'estimated', `${s.code || s.title}: unknown cannot be confirmed`);
  if (s.group === 'discipline' && s.required === 'compulsory') ok(EXAM[s.code], `${s.code}: no EXAM entry`);
  ok(['both', 'MI', 'RT'].includes(s.stream), `${s.code || s.title}: bad stream`);
  ok(['compulsory', 'elective'].includes(s.required), `${s.code || s.title}: bad required`);
  ok(s.important === isImportant({ ...s }), `${s.code || s.title}: important flag disagrees with the rule`);
}

/* The same code in two rows must be the same subject. */
const byCode = new Map();
for (const s of PROGRAMME.subjects) {
  if (!s.code) continue;
  const prev = byCode.get(s.code);
  if (prev) {
    ok(prev.title === s.title && prev.important === s.important && prev.group === s.group,
      `${s.code} appears twice with different title/flags`);
  } else byCode.set(s.code, s);
}

/* Hand-checked against the sheet: these must come out as the owner described. */
const imp = (code) => PROGRAMME.subjects.find((s) => s.code === code)?.important;
for (const code of ['HSS2011', 'ABCT2326', 'ABCT2329', 'HTI17102', 'HTI27107', 'HTI28102', 'HTI48101']) {
  ok(imp(code) === true, `${code} should be important`);
}
/* Owner: no exam means not important. Clinical Studies and Project are estimated 'no'. */
for (const code of ['HTI17103', 'HTI27001', 'HTI38204', 'HTI39304', 'HTI47103']) {
  ok(imp(code) === false, `${code} has no exam, so should not be important`);
}
const ex = (code) => PROGRAMME.subjects.find((s) => s.code === code);
for (const code of ['HSS2011', 'ABCT2326', 'HTI17103', 'DSAI1202']) {
  ok(ex(code).examBasis === 'confirmed', `${code} exam is a known fact`);
}
ok(ex('HTI17103').exam === 'no' && ex('HSS2011').exam === 'yes', 'confirmed exam values');
ok(ex('HTI29102').important === true, 'an unknown exam stays important');
ok(PROGRAMME.subjects.filter((s) => s.exam !== 'unknown' && s.examBasis === 'estimated').length > 10, 'estimates present');
for (const code of ['DSAI1202', 'LEI1101', 'ELC3626', 'CLC', 'ELC', 'APSS1L01', 'MM1031']) {
  ok(imp(code) === false, `${code} should not be important`);
}
ok(PROGRAMME.subjects.filter((s) => s.group === 'elective').every((s) => !s.important), 'an elective slot is important');

const both = PROGRAMME.subjects.filter((s) => s.stream !== 'both');
ok(both.some((s) => s.stream === 'MI') && both.some((s) => s.stream === 'RT'), 'both streams must keep their own subjects');

const n = PROGRAMME.subjects;
console.log(`${n.length} rows, ${n.filter((s) => s.important).length} important, `
  + `${n.filter((s) => s.stream === 'MI').length} MI-only, ${n.filter((s) => s.stream === 'RT').length} RT-only`);
console.log(fails ? `${fails} FAILED` : 'ALL PASS');
process.exit(fails ? 1 : 0);
