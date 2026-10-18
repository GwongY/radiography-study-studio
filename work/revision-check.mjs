/*
 * Revision check — the week rule, and the data it runs over, without a browser.
 *
 *   node work/revision-check.mjs
 *
 * What it holds:
 *   - every edge and every tree id is a real topic; every topic is in the tree
 *     exactly once; every thread id a topic names is a real thread;
 *   - visibility is MONOTONIC in the week: what week n shows, week n+1 shows too
 *     (the map only ever grows), and the last week shows everything;
 *   - no link points at a hidden topic, and a topic taught later than the week
 *     is on screen only as structure;
 *   - the automatic week is right at the term's edges and inside it, and a saved
 *     manual choice survives, re-clamped;
 *   - every thread step, table row, double-check box and decoder row carries a
 *     week, and no week is outside what the topics cover.
 */
import { REVISION } from '../outputs/revision/registry.js';
import { autoWeek, clampWeek, firstWeek, lastWeekOf, newIds, pruneTree, resolveWeek, visibleEdges, visibleIds } from '../outputs/revision/weeks.js';
import { TERM, weekOf, weekStart, weekEnd } from '../outputs/schedule.js';

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

for (const subject of Object.values(REVISION)) {
  const { data } = subject;
  console.log(`\n${subject.id}`);
  const ids = new Set(data.NODES.map((n) => n.id));
  const last = lastWeekOf(data);

  ok(ids.size === data.NODES.length, 'topic ids are unique');
  ok(data.EDGES.every((e) => ids.has(e[0]) && ids.has(e[1]) && e[0] !== e[1] && e[2]), 'every edge joins two real, different topics and says why');
  ok(new Set(data.EDGES.map((e) => [e[0], e[1]].sort().join('|'))).size === data.EDGES.length, 'no link is listed twice');

  const seen = [];
  (function walk(s) { if (s.id) seen.push(s.id); (s.kids || []).forEach(walk); })(data.TREE);
  ok(seen.length === ids.size && seen.every((id) => ids.has(id)) && new Set(seen).size === seen.length, 'every topic is in the tree exactly once');

  const threadIds = new Set([...subject.threads.matchAll(/<details class="thread" id="(t\d+)"/g)].map((m) => m[1]));
  ok(data.NODES.every((n) => (n.th || []).every((t) => threadIds.has(t))), 'every thread a topic names exists');
  ok(subject.tours.every((t) => threadIds.has(t.th) && t.stops.every((s) => ids.has(s))), 'every tour names a real thread and real topics');

  ok(data.NODES.every((n) => n.w.length && n.w.every((w) => Number.isInteger(w) && w >= 1)), 'every topic has weeks');
  ok(last >= 1 && last <= TERM.weeks, `last week with content is ${last}, inside the ${TERM.weeks}-week term`);

  let prev = new Set();
  let monotonic = true, cleanLinks = true, firstOnly = true;
  for (let n = 1; n <= last; n++) {
    const now = visibleIds(data, n);
    for (const id of prev) if (!now.has(id)) monotonic = false;
    const edges = visibleEdges(data, now);
    if (!edges.every((e) => now.has(e[0]) && now.has(e[1]))) cleanLinks = false;
    const fresh = newIds(data, n);
    for (const id of fresh) if (prev.has(id) || !now.has(id)) firstOnly = false;
    prev = now;
  }
  ok(monotonic, 'what week n shows, week n+1 shows too');
  ok(cleanLinks, 'no link points at a hidden topic');
  ok(firstOnly, '"new" marks only topics first taught that week');
  ok(visibleIds(data, last).size === ids.size, 'the last week shows every topic');
  ok(visibleIds(data, 0).size === 0, 'week 0 shows nothing');

  const sizes = [];
  for (let n = 1; n <= last; n++) sizes.push(`${n}:${visibleIds(data, n).size}t/${visibleEdges(data, visibleIds(data, n)).length}l`);
  console.log(`      growth  ${sizes.join('  ')}`);

  let treeOk = true;
  const structuralNotes = [];
  for (let n = 1; n <= last; n++) {
    const { tree, structural } = pruneTree(data, n);
    const inTree = [];
    (function walk(s) { if (s.id) inTree.push(s.id); (s.kids || []).forEach(walk); })(tree);
    const want = visibleIds(data, n);
    for (const id of want) if (!inTree.includes(id)) treeOk = false;
    for (const id of inTree) if (!want.has(id) && !structural.has(id)) treeOk = false;
    /* a heading with nothing under it must not survive */
    (function walk(s) { if (!s.id && s !== tree && !(s.kids || []).length) treeOk = false; (s.kids || []).forEach(walk); })(tree);
    if (structural.size) structuralNotes.push(`week ${n}: ${[...structural].join(', ')}`);
  }
  ok(treeOk, 'the pruned tree holds every shown topic, no empty heading, and no unexplained extra');
  console.log(`      structural-only (taught later, shown as structure): ${structuralNotes.length ? structuralNotes.join(' | ') : 'none'}`);

  /* the week tags baked into the fragments */
  const tagged = (html, re) => [...html.matchAll(re)].map((m) => Number(m[1]));
  const steps = tagged(subject.threads, /<li data-wk="(\d+)"/g);
  const untaggedSteps = (subject.threads.match(/<li>/g) || []).length;
  const untaggedRows = (subject.threads.match(/<tr>\s*<td/g) || []).length;
  ok(untaggedRows === 0, 'every thread table row has a week');
  ok(steps.length > 0 && untaggedSteps === 0, `every thread step has a week (${steps.length} steps)`);
  const rows = tagged(subject.tables, /<tr data-wk="(\d+)"/g);
  const boxes = tagged(subject.tables, /<div class="note-box" data-wk="(\d+)"/g);
  ok(rows.length > 0 && !/<tr>\s*<td/.test(subject.tables), `every table row has a week (${rows.length} rows, ${boxes.length} boxes)`);
  const dec = tagged(subject.decoder, /<tr [^>]*data-wk="(\d+)"/g);
  ok(dec.length > 0 && !/<tr>\s*<td/.test(subject.decoder), `every decoder row has a week (${dec.length} rows)`);
  const all = [...steps, ...rows, ...boxes, ...dec];
  ok(all.every((w) => w >= 1 && w <= last), `no fragment is tagged outside weeks 1-${last}`);
  /* each week should add something to every list that has anything */
  ok(steps.some((w) => w === 1) || steps.some((w) => w <= 2), 'threads have something from the first weeks');
}

console.log('\nautomatic week');
const last = 7;
const ymdAt = (d, add) => new Date(d.getTime() + add);
const before = ymdAt(weekStart(1), -86400000);
const after = ymdAt(weekEnd(TERM.weeks), 86400000);
ok(weekOf(before) === null && autoWeek(weekOf(before), before < weekStart(1), last) === 1, 'the day before the term starts revises week 1');
ok(autoWeek(weekOf(weekStart(1)), false, last) === 1, 'Monday of week 1 is week 1');
ok(autoWeek(weekOf(weekStart(4)), false, last) === 4, 'Monday of week 4 is week 4');
ok(autoWeek(weekOf(weekEnd(7)), false, last) === 7, 'Sunday of week 7 is week 7');
ok(autoWeek(weekOf(weekStart(8)), false, last) === 7, 'week 8, with no week-8 content yet, stays on the last week with content');
ok(autoWeek(weekOf(weekStart(13)), false, last) === 7, 'week 13 clamps to the last week with content');
ok(weekOf(after) === null && autoWeek(weekOf(after), after < weekStart(1), last) === 7, 'after the term it is the last week with content');
ok(autoWeek(5, false, 13) === 5, 'once a subject has content to week 13 the current week is used as is');
ok(clampWeek('3', 7) === 3 && clampWeek(0, 7) === 1 && clampWeek(99, 7) === 7 && clampWeek('x', 7) === 7, 'clampWeek holds 1..last and survives rubbish');

console.log('\nsaved choice');
ok(resolveWeek(null, 5, 7).mode === 'auto' && resolveWeek(null, 5, 7).week === 5, 'nothing saved: automatic');
ok(resolveWeek({ mode: 'manual', week: 6 }, 7, 7).week === 6 && resolveWeek({ mode: 'manual', week: 6 }, 7, 7).mode === 'manual', 'a manual week 6 wins over automatic week 7');
ok(resolveWeek({ mode: 'manual', week: 12 }, 3, 7).week === 7, 'a saved week beyond the content is re-clamped');
ok(resolveWeek({ mode: 'auto', week: 2 }, 5, 7).week === 5, 'a saved auto ignores the stored week and follows the calendar');
ok(resolveWeek({ mode: 'manual', week: null }, 5, 7).mode === 'auto', 'a manual choice with no week falls back to automatic');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
