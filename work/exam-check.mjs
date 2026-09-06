/*
 * Exam mode — the paper and the mark, checked without a browser.
 *
 * A percentage at the end of a paper is a number the reader makes decisions
 * with: whether to re-read a unit, whether they are ready to sit the real
 * thing. A wrong denominator looks exactly as plausible as a right one, which
 * is the same reason work/assessment-check.mjs exists for the running mark.
 *
 * The two properties that cannot be eyeballed:
 *
 *   - Blank is not the same as wrong. Both cost the mark, and they mean
 *     opposite things about what to do next, so they are counted separately
 *     and the breakdown must not blur them.
 *   - A paper spreads across items. Two questions on one item are two chances
 *     at one idea; a paper that quietly stacked them would flatter the mark
 *     while testing less, and nothing on screen would say so.
 *
 * buildPaper and markPaper are pure and exported for exactly this reason.
 *
 * Usage: node work/exam-check.mjs
 */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* The modules are written for a browser. They do not touch the DOM at module
   scope, but they are imported through a barrel that assumes both exist. */
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => { mem.set(k, String(v)); },
  removeItem: (k) => { mem.delete(k); },
  clear: () => mem.clear(),
};
const stubEl = () => ({
  classList: { add() {}, remove() {}, toggle() {} },
  style: {}, dataset: {}, hidden: false,
  querySelectorAll: () => [], querySelector: () => null,
  addEventListener() {}, setAttribute() {}, appendChild() {},
});
globalThis.document = {
  getElementById: () => stubEl(),
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => stubEl(),
  addEventListener() {},
  body: stubEl(),
  documentElement: stubEl(),
};
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.setTimeout = globalThis.setTimeout || (() => 0);
globalThis.history = { replaceState() {}, pushState() {} };
globalThis.confirm = () => true;
globalThis.performance = globalThis.performance || { now: () => 0 };
globalThis.window = globalThis;
globalThis.location = { origin: 'http://localhost', pathname: '/', search: '', hash: '' };
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });

const {
  EXAM_TYPES, buildPaper, examPool, markPaper, markQuestion, rehearses,
} = await import(pathToFileURL(join(root, 'outputs/study/exam-mode.js')).href);
const { STUDY_ITEMS, getItem, questionsOf } = await import(pathToFileURL(join(root, 'outputs/study-data.js')).href);

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);
const is = (got, want, what) => (got === want ? ok(`${what}: ${got}`) : fail(`${what}: got ${got}, want ${want}`));

/* A fixed shuffle, so a failure here is a failure and not a coincidence. */
let seed = 20260906;
const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

/* ------------------------------------------------------------------ *
 * The pool
 * ------------------------------------------------------------------ */
console.log('— the pool is the format the real paper uses —');

const pool = examPool();
if (pool.length) ok(`${pool.length} exam-shaped questions in the corpus`);
else fail('the exam pool is empty');

const strayTypes = [...new Set(pool.map((q) => q.type))].filter((t) => !EXAM_TYPES.includes(t));
if (!strayTypes.length) ok(`every pooled question is one of: ${EXAM_TYPES.join(', ')}`);
else fail(`pooled question types outside the exam format: ${strayTypes.join(', ')}`);

const subjectPool = examPool({ subject: 'ABCT2326' });
const wrongSubject = subjectPool.filter((q) => getItem(q.itemId)?.subject !== 'ABCT2326');
if (subjectPool.length && !wrongSubject.length) ok(`a subject pool holds only that subject (${subjectPool.length} questions)`);
else fail(`subject filter leaked ${wrongSubject.length} question(s) from other subjects`);

/* ------------------------------------------------------------------ *
 * The paper
 * ------------------------------------------------------------------ */
console.log('— a paper spreads across items before it repeats one —');

const paper = buildPaper({ count: 20, random: rand });
is(paper.length, 20, 'a 20-question paper has 20 questions');

const itemsInPaper = new Set(paper.map((q) => q.itemId));
is(itemsInPaper.size, 20, 'those 20 questions come from 20 distinct items');

/*
 * The property under stress: ask for more questions than there are items, and
 * the spread has to give way gracefully rather than return a short paper.
 */
const itemsWithQs = STUDY_ITEMS.filter((i) => questionsOf(i).some((q) => EXAM_TYPES.includes(q.type))).length;
const big = buildPaper({ count: itemsWithQs + 15, random: rand });
is(big.length, Math.min(itemsWithQs + 15, pool.length), 'asking past the item count still fills the paper');
const firstSlice = big.slice(0, itemsWithQs);
is(new Set(firstSlice.map((q) => q.itemId)).size, itemsWithQs, 'and every item is used once before any is used twice');

const dupes = new Set();
const seenQ = new Set();
for (const q of big) { if (seenQ.has(q.qid)) dupes.add(q.qid); seenQ.add(q.qid); }
if (!dupes.size) ok('no question appears on the paper twice');
else fail(`${dupes.size} question(s) appear twice on one paper`);

/* ------------------------------------------------------------------ *
 * Marking one question
 * ------------------------------------------------------------------ */
console.log('— one question, marked —');

const mcq = { type: 'mcq', qid: 'x#0', itemId: 'x', options: ['a', 'b', 'c'], answer: 1 };
is(markQuestion(mcq, 1).correct, true, 'mcq: the right option is right');
is(markQuestion(mcq, 2).correct, false, 'mcq: a wrong option is wrong');
is(markQuestion(mcq, undefined).answered, false, 'mcq: no answer is unanswered');
is(markQuestion(mcq, undefined).correct, false, 'mcq: unanswered is not correct');
/* Option 0 is falsy. A truthiness test here would mark the first option as
   unanswered on every paper, and it would look like the reader skipped it. */
is(markQuestion({ ...mcq, answer: 0 }, 0).answered, true, 'mcq: option 0 counts as answered');
is(markQuestion({ ...mcq, answer: 0 }, 0).correct, true, 'mcq: option 0 can be correct');

const cloze = { type: 'cloze', qid: 'y#0', itemId: 'y', accept: ['palmar', 'palm'] };
is(markQuestion(cloze, 'palm').correct, true, 'cloze: an accepted answer is right');
is(markQuestion(cloze, '  Palm  ').correct, true, 'cloze: case and padding do not matter');
is(markQuestion(cloze, 'dorsal').correct, false, 'cloze: a wrong word is wrong');
is(markQuestion(cloze, '').answered, false, 'cloze: an empty string is unanswered');

/* ------------------------------------------------------------------ *
 * Marking a paper — hand-worked
 * ------------------------------------------------------------------ */
console.log('— a whole paper, against arithmetic done by hand —');

const q = (n, unit, answer = 0) => ({
  type: 'mcq', qid: `q${n}#0`, itemId: `item-${n}`, options: ['a', 'b'], answer, unit,
});
/* Four questions. Two right, one wrong, one blank: 2/4 = 50%, and the blank
   must be reported as blank rather than folded into the one wrong answer. */
const tiny = [q(1), q(2), q(3), q(4)];
const marked = markPaper(tiny, { 'q1#0': 0, 'q2#0': 0, 'q3#0': 1 });
is(marked.total, 4, 'total');
is(marked.correct, 2, 'correct');
is(marked.blank, 1, 'blank');
is(marked.percent, 50, 'percent');
is(marked.rows.filter((r) => r.answered && !r.correct).length, 1, 'wrong-and-answered');

/* The rounding boundary. 1 of 3 is 33.333…; the reported number must be one
   value used everywhere, not one rounding here and another in the template. */
const thirds = markPaper([q(1), q(2), q(3)], { 'q1#0': 0 });
is(thirds.percent, 33, '1 of 3 rounds to 33');
const twoThirds = markPaper([q(1), q(2), q(3)], { 'q1#0': 0, 'q2#0': 0 });
is(twoThirds.percent, 67, '2 of 3 rounds to 67');

/* An empty paper must not divide by zero. */
is(markPaper([], {}).percent, 0, 'an empty paper is 0%, not NaN');

/* Weakest unit first, because that list is what the reader reads next. */
const spread = markPaper(
  [q(1), q(2), q(3), q(4)].map((x, i) => ({ ...x, itemId: `it${i}` })),
  { 'q1#0': 0, 'q2#0': 0, 'q3#0': 0 },
);
const order = spread.byUnit.map((u) => u.correct / u.total);
if (order.every((v, i) => i === 0 || order[i - 1] <= v)) ok('the unit breakdown runs weakest first');
else fail(`the unit breakdown is not weakest-first: ${order.join(', ')}`);

/* Totals across the breakdown must equal the paper. A unit bucket that drops
   a row would show a plausible breakdown under a correct headline. */
const bucketTotal = spread.byUnit.reduce((a, u) => a + u.total, 0);
is(bucketTotal, spread.total, 'the unit buckets add up to the paper');

/* ------------------------------------------------------------------ *
 * What the paper stands in for
 * ------------------------------------------------------------------ */
console.log('— the assessment a subject paper rehearses —');

const abct = rehearses('ABCT2326');
if (abct && /exam/i.test(abct.name)) ok(`ABCT2326 rehearses "${abct.name}" (${abct.weight}%)`);
else fail(`ABCT2326 rehearsal row looks wrong: ${JSON.stringify(abct)}`);

if (rehearses(null) === null) ok('a mixed paper rehearses nothing, and says so');
else fail('a mixed paper claimed to rehearse an assessment');

if (rehearses('NOT-A-SUBJECT') === null) ok('an unknown subject rehearses nothing');
else fail('an unknown subject returned a rehearsal row');

/*
 * The weight is quoted to the reader as a percentage of the subject, so it has
 * to be the weight the schedule states — not a number this module invented.
 */
const { SUBJECT_ADMIN } = await import(pathToFileURL(join(root, 'outputs/schedule.js')).href);
for (const subject of Object.keys(SUBJECT_ADMIN)) {
  const rows = SUBJECT_ADMIN[subject]?.assessment || [];
  if (!rows.length) continue;
  const r = rehearses(subject);
  if (!r) { fail(`${subject} has assessment rows but rehearses nothing`); continue; }
  const match = rows.find((x) => x.name === r.name && x.weight === r.weight);
  if (match) ok(`${subject}: "${r.name}" ${r.weight}% is a row in the schedule`);
  else fail(`${subject}: rehearsal row is not in outputs/schedule.js`);
}

/* ------------------------------------------------------------------ *
 * A loaded pack
 *
 * The pack is licensed content and exam mode is the only thing that serves it,
 * so the join between them is checked here rather than trusted. Two shapes
 * meet: the pack stores options as {letter, text} with a LETTER answer, the
 * corpus stores strings with an INDEX. Getting that conversion wrong does not
 * throw — it marks the wrong option correct, on every pack question, forever.
 * ------------------------------------------------------------------ */
console.log('— a loaded pack joins the pool without changing it —');

const { holdPack, packAttemptId, packQuestions } = await import(pathToFileURL(join(root, 'outputs/study/question-pack.js')).href);

const before = examPool().length;
await holdPack({
  format: 'rss.pack',
  packId: 'check-pack',
  questions: [
    { qid: 'ch07-q001', chapter: 7, type: 'mcq', stem: 'Which is the odd one out?',
      options: [{ letter: 'A', text: 'alpha' }, { letter: 'B', text: 'beta' }, { letter: 'C', text: 'gamma' }],
      answer: 'C' },
    /* Short-answer: model-answer prose, unmarkable, must not reach a paper. */
    { qid: 'ch07-q002', chapter: 7, type: 'short', stem: 'Explain why.', answer: 'Because.' },
  ],
});

const packQs = packQuestions();
is(packQs.length, 1, 'only the markable question is offered');
is(packQs[0].answer, 2, 'the letter answer C became index 2');
is(packQs[0].options[2], 'gamma', 'and index 2 is the option the letter named');
is(packQs[0].qid, packAttemptId('check-pack', 'ch07-q001'), 'the question id is the attempt id');

const after = examPool().length;
is(after, before + 1, 'the mixed pool grew by the pack question');
is(examPool({ subject: 'ABCT2326' }).length, subjectPool.length, 'a SUBJECT pool is unchanged — the pack has no subject');

/* Marked like any other question, and grouped under its own chapter rather
   than falling into the 'unassigned' bucket with everything else. */
const packMarked = markPaper(packQs, { [packQs[0].qid]: 2 });
is(packMarked.correct, 1, 'the right option marks correct');
is(markPaper(packQs, { [packQs[0].qid]: 0 }).correct, 0, 'a wrong option marks wrong');
is(packMarked.byUnit[0].unit, 'Chapter 7', 'the breakdown groups it by chapter');

/* The one property the whole design rests on: nothing that identifies the
   question travels with the id it is recorded under. */
const id = packQs[0].qid;
if (!/odd one out|alpha|beta|gamma/i.test(id)) ok('the attempt id carries no stem or option text');
else fail(`the attempt id carries question text: ${id}`);

await holdPack(null);
is(examPool().length, before, 'dropping the pack returns the pool to the corpus');

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
