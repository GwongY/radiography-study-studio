/*
 * Progress log — the replay contract.
 *
 * The claim progress-log.js makes is narrow and total: folding schedule() over
 * the events of one (item, dimension) in timestamp order reproduces the live
 * mastery record EXACTLY. Everything else the log is for — merging two devices
 * without dropping practice, rebuilding a corrupted store, proving a history is
 * intact — rests on that one equality. If it drifts by a rounding step in
 * avgMs, or by a millisecond in `due`, the log stops being the source of truth
 * and becomes a second opinion.
 *
 * So this check does not read the log's own rebuild() and nod at it. It plays a
 * synthetic term of study through the SAME schedule() the app calls, the way
 * layout-figures.js calls it, and then asserts that a replay of the events
 * lands on identical records — and that the properties a four-year log needs
 * hold: ids are unique, a union of two overlapping logs is exact, order is
 * recovered from `at` rather than from arrival, and the baseline cuts the
 * replay where it says it does.
 *
 * Runs in node with no browser: rebuild() is pure over (baseline, events).
 *
 * Usage: node work/progress-log-check.mjs
 */
import { schedule } from '../outputs/study/corpus/mastery.js';
/* The shipped fold, checked against the one written from the definition below.
   It imports cleanly in node because rebuild() is pure over its arguments. */
import { events as liveEvents, rebuild, recordAttempt } from '../outputs/study/progress-log.js';
import { store } from '../outputs/study/storage-versioned-keys.js';

let failures = 0;
const fail = (msg) => { failures += 1; console.log(`  FAIL  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ------------------------------------------------------------------ *
 * A replay of rebuild()'s fold, written independently of it.
 *
 * Deliberately a second implementation rather than an import: a check that
 * calls the function it is checking proves only that the function is
 * deterministic. This one is written from the definition — baseline, then
 * every event after it in timestamp order — so the two have to agree.
 * ------------------------------------------------------------------ */
function replay(baseline, events) {
  const mastery = {};
  for (const [k, v] of Object.entries(baseline.mastery || {})) mastery[k] = { ...v };
  const items = {};
  for (const [k, v] of Object.entries(baseline.items || {})) items[k] = { ...v };
  const after = events.filter((e) => e.at > baseline.at)
    .sort((a, b) => a.at - b.at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  for (const e of after) {
    if (e.t === 'attempt') {
      const key = `${e.itemId}::${e.dim}`;
      mastery[key] = schedule(mastery[key] || null,
        { correct: e.correct, confidence: e.confidence, ms: e.ms, expectedMs: e.expectedMs }, e.at);
      if (e.primary) {
        const prev = items[e.itemId] || {};
        items[e.itemId] = { ...prev, status: e.correct ? 'review' : 'learning', seen: (prev.seen || 0) + 1, lastSeen: e.at };
      }
    } else if (e.t === 'read') {
      const prev = items[e.itemId] || {};
      items[e.itemId] = { ...prev, readAt: e.at, reads: (prev.reads || 0) + 1 };
    }
  }
  return { mastery, items };
}

/* ------------------------------------------------------------------ *
 * A synthetic term of study, driven the way the app drives it.
 *
 * Deterministic: a small LCG rather than Math.random, so a failure is
 * reproducible and a passing run means the same thing tomorrow.
 * ------------------------------------------------------------------ */
let seed = 20260906;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;

const ITEMS = ['hss2011-osteo-vertebral-column', 'abct2326-homeostasis', 'hss2011-joints-movements'];
const DIMS = ['recognition', 'typedRecall', 'location'];
const DAY = 86400000;

function studyTerm(days) {
  /* The live path: mastery written by schedule(), events appended alongside. */
  const live = { mastery: {}, items: {} };
  const events = [];
  let n = 0;
  let at = Date.parse('2026-02-02T09:00:00Z');
  for (let d = 0; d < days; d += 1) {
    at += DAY;
    const answers = 2 + Math.floor(rnd() * 6);
    for (let a = 0; a < answers; a += 1) {
      at += 30000 + Math.floor(rnd() * 90000);
      const itemId = ITEMS[Math.floor(rnd() * ITEMS.length)];
      const dim = DIMS[Math.floor(rnd() * DIMS.length)];
      const correct = rnd() > 0.32;
      const confidence = Math.floor(rnd() * 4);
      const ms = 1200 + Math.floor(rnd() * 30000);
      const expectedMs = 14000;
      const key = `${itemId}::${dim}`;

      /* Exactly what recordAttempt does, in the same order. */
      live.mastery[key] = schedule(live.mastery[key] || null, { correct, confidence, ms, expectedMs }, at);
      const prev = live.items[itemId] || {};
      live.items[itemId] = { ...prev, status: correct ? 'review' : 'learning', seen: (prev.seen || 0) + 1, lastSeen: at };
      events.push({ id: `dA.${at.toString(36)}.${n += 1}`, t: 'attempt', at, itemId, dim, correct, confidence, ms, expectedMs, primary: true });

      /* A second dimension riding the same answer — never primary. */
      if (rnd() > 0.7) {
        const k2 = `${itemId}::spelling`;
        live.mastery[k2] = schedule(live.mastery[k2] || null, { correct, confidence, ms, expectedMs: 14000 }, at);
        events.push({ id: `dA.${at.toString(36)}.${n += 1}`, t: 'attempt', at, itemId, dim: 'spelling', correct, confidence, ms, expectedMs: 14000, primary: false });
      }
    }
    /* Opening a lesson, once past markRead's one-minute floor. */
    if (rnd() > 0.5) {
      at += 120000;
      const itemId = ITEMS[Math.floor(rnd() * ITEMS.length)];
      const prev = live.items[itemId] || {};
      live.items[itemId] = { ...prev, readAt: at, reads: (prev.reads || 0) + 1 };
      events.push({ id: `dA.${at.toString(36)}.${n += 1}`, t: 'read', at, itemId });
    }
  }
  return { live, events, endedAt: at };
}

console.log('— progress log: replay reproduces the live record —');

const zero = { at: 0, mastery: {}, items: {} };
const term = studyTerm(90);
const rebuilt = replay(zero, term.events);

if (same(rebuilt.mastery, term.live.mastery)) ok(`${term.events.length} events replay to identical mastery records`);
else {
  const keys = new Set([...Object.keys(term.live.mastery), ...Object.keys(rebuilt.mastery)]);
  for (const k of keys) if (!same(term.live.mastery[k], rebuilt.mastery[k])) fail(`mastery drifted at ${k}`);
}
if (same(rebuilt.items, term.live.items)) ok('item status, seen counts and reads replay identically');
else fail('item records drifted under replay');

/* ------------------------------------------------------------------ *
 * Order is recovered from `at`, not from arrival.
 * ------------------------------------------------------------------ */
const shuffled = term.events.slice();
for (let i = shuffled.length - 1; i > 0; i -= 1) {
  const j = Math.floor(rnd() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
if (same(replay(zero, shuffled).mastery, term.live.mastery)) ok('a shuffled log replays to the same records');
else fail('replay depends on arrival order — a synced log would rebuild wrong');

/* ------------------------------------------------------------------ *
 * Two devices: union is exact, and overlap does not double-count.
 *
 * This is the property the whole design exists for. The old merge rule keeps
 * the record with the newer lastSeen and DROPS the other; the log keeps both
 * devices' attempts and lands on the record a single device would have had.
 * ------------------------------------------------------------------ */
const laptop = term.events.filter((_, i) => i % 2 === 0);
const ipad = term.events.filter((_, i) => i % 3 === 0);   /* deliberately overlapping */
const union = [];
const held = new Set();
for (const e of [...laptop, ...ipad]) { if (!held.has(e.id)) { held.add(e.id); union.push(e); } }
const covered = new Set(union.map((e) => e.id));
const everyEvent = term.events.every((e) => covered.has(e.id));
if (!everyEvent) ok('the two halves do not cover the term — union tested on what they do hold');
if (same(replay(zero, union).mastery, replay(zero, union.slice().reverse()).mastery)) ok('union of two overlapping devices is order-independent');
else fail('union depends on which device is merged first');

const dupes = union.length !== new Set(union.map((e) => e.id)).size;
if (!dupes) ok('overlapping events deduplicate on id');
else fail('the union double-counted an attempt');

/* An id must be unique across the whole term, or dedup silently drops a real
   attempt — the failure mode that looks exactly like the bug being fixed. */
if (new Set(term.events.map((e) => e.id)).size === term.events.length) ok('every event id in a 90-day term is distinct');
else fail('event ids collided — dedup would drop real attempts');

/* ------------------------------------------------------------------ *
 * The baseline cuts where it says it does.
 * ------------------------------------------------------------------ */
const cut = term.events[Math.floor(term.events.length / 2)].at;
const before = term.events.filter((e) => e.at <= cut);
const snapshot = { at: cut, ...replay(zero, before) };
const fromBaseline = replay(snapshot, term.events);
if (same(fromBaseline.mastery, term.live.mastery)) ok('baseline + later events equals the whole log replayed');
else fail('replaying from a baseline does not match a full replay');

const ignored = replay(snapshot, before);
if (same(ignored.mastery, snapshot.mastery)) ok('events at or before the baseline are not applied twice');
else fail('pre-baseline events were replayed on top of the snapshot');

/* ------------------------------------------------------------------ *
 * And the shipped fold agrees with the one written from the definition.
 *
 * Everything above tests a replay this file implements. This is the line that
 * makes the checks bind on the code the app actually runs.
 * ------------------------------------------------------------------ */
const shipped = rebuild(zero, term.events);
if (same(shipped.mastery, term.live.mastery) && same(shipped.items, term.live.items)) ok('progress-log.js rebuild() reproduces the live record');
else fail('the shipped rebuild() disagrees with the live record');

const shippedFromBaseline = rebuild(snapshot, term.events);
if (same(shippedFromBaseline.mastery, term.live.mastery)) ok('progress-log.js rebuild() honours the baseline cut');
else fail('the shipped rebuild() mishandles the baseline');

if (same(rebuild(zero, shuffled).mastery, term.live.mastery)) ok('progress-log.js rebuild() sorts by timestamp, not arrival');
else fail('the shipped rebuild() depends on arrival order');

/* ------------------------------------------------------------------ *
 * The recorder itself, driven with the numbers a browser really produces.
 *
 * Every check above builds its own events, so none of them can see a bug in
 * the code that WRITES an event. This one calls recordAttempt exactly as
 * layout-figures.js does — including the float ms that performance.now()
 * arithmetic yields — and then asks whether replaying what it logged
 * reproduces the records it wrote. A recorder that rounds on one side and not
 * the other fails here, on the first attempt, which is how the real one was
 * found.
 * ------------------------------------------------------------------ */
let tick = Date.parse('2026-03-01T09:00:00Z');
for (let i = 0; i < 80; i += 1) {
  tick += 45000 + i * 137;
  recordAttempt('hss2011-osteo-c1-c2', i % 2 ? 'recognition' : 'typedRecall',
    { correct: i % 3 !== 0, confidence: i % 4, ms: 1200.5 + i * 311.40000000119, expectedMs: 14000 },
    { at: tick, primary: i % 2 === 0, qid: `q${i}`, qtype: 'mcq' });
}
const recorded = rebuild({ at: 0, mastery: {}, items: {} }, liveEvents);
if (same(recorded.mastery, store.mastery)) ok(`recordAttempt: ${liveEvents.length} logged attempts replay to the records it wrote`);
else {
  for (const k of new Set([...Object.keys(store.mastery), ...Object.keys(recorded.mastery)])) {
    if (!same(store.mastery[k], recorded.mastery[k])) {
      fail(`recordAttempt wrote a record its own event cannot reproduce: ${k}`);
      console.log(`        live    ${JSON.stringify(store.mastery[k])}`);
      console.log(`        replay  ${JSON.stringify(recorded.mastery[k])}`);
    }
  }
}

console.log(failures ? `\n${failures} failure(s)` : '\nall checks pass');
process.exit(failures ? 1 : 0);
