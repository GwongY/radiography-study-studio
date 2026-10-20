/*
 * Revision check — the week rule, and the data it runs over, without a browser.
 *
 *   node work/revision-check.mjs
 *
 * What it holds:
 *   - every leaf row (outputs/revision/leaves.js) hangs from a real parent, is not
 *     taught before it, says what it moves or supplies, and its name is on a page
 *     of the slide deck it cites (the comparison source-check.mjs uses);
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
import { OWN } from '../outputs/revision/own-words.js';
import { autoWeek, clampWeek, releasedLast, firstWeek, lastWeekOf, newIds, pruneTree, resolveWeek, visibleEdges, visibleIds } from '../outputs/revision/weeks.js';
import { TERM, weekOf, weekStart, weekEnd, SESSIONS } from '../outputs/schedule.js';
import { readFileSync } from 'node:fs';
import { normaliseCitationText } from './lib/source-lesson-map.mjs';
import { KINDS } from '../outputs/revision/leaves.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { checkSystems, needsOwn, ownProblems, rowWeekOk, starProblems, yueProblems } from '../outputs/revision/rules.js';
import { decoderProblems, decoderReading } from '../outputs/revision/fragments.js';
import { decompose } from '../outputs/wordparts.js';
import { CROSS } from '../outputs/revision/cross-links.js';
import { COVERAGE } from './revision-coverage.mjs';

const SOURCE_TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

/* Rule 1: `needle` is on one of the cited pages (the same comparison source-check.mjs uses). */
const onPage = (src, needle) => {
  const [sid, ...pages] = src || [];
  const text = SOURCE_TEXT[sid];
  const n = normaliseCitationText(needle);
  return !!text && pages.length > 0 && pages.every((p) => Number.isInteger(p) && p >= 1 && p <= text.pages.length) && pages.some((p) => normaliseCitationText(text.pages[p - 1]).includes(n));
};
/* The week a source's deck was first lectured, from any subject's decks (1 when none says). */
const firstWeekOfSource = (src) => { const sid = (src || [])[0]; for (const s of Object.values(REVISION)) if (s.decks && s.decks[sid]) return s.decks[sid].weeks[0]; return 1; };

/*
 * Coverage: Threads, Tables and Decoder may not stay thin (owner, 20 Oct 2026: "a lot missing").
 * `cov` is work/revision-coverage.mjs's entry for the subject; the gap analysis it records is
 * docs/superpowers/notes/2026-10-20-physiology-gap-analysis.md. Every step and table row names the
 * map boxes it is about (`ids`), and from those:
 *   (i)   every teaching week with content has at least cov.minSteps thread steps and cov.minRows table rows;
 *   (ii)  every cross-chapter concept of the gap analysis has its own thread, and every box it lists is a step
 *         of that thread; and every box whose name is printed on the slides of two or more lectures (computed
 *         here, from the slide text) is in some step or table row, or on cov.skipCross with a reason;
 *   (iii) every box name wordparts.js gives a reading for has a reviewed decoder entry (a wrong reading is fixed in wordparts.js);
 *   (iv)  the counts per week are printed, so thinness shows.
 */
const lectureWeek = (subject, sid) => ((subject.decks || {})[sid] || { weeks: [] }).weeks[0];
/** The box names printed on the slides of two or more lectures (by lecture week; a tutorial filed with a lecture counts as that week). */
function crossNamed(subject) {
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const decks = Object.keys(subject.decks || {}).filter((sid) => SOURCE_TEXT[sid]);
  const pages = Object.fromEntries(decks.map((sid) => [sid, SOURCE_TEXT[sid].pages.map(normaliseCitationText)]));
  const out = new Map();
  for (const n of subject.data.NODES) {
    const name = normaliseCitationText(String(n.l).replace(/\s*\([^)]*\)\s*$/, ''));
    if (name.length < 3) continue;
    const re = new RegExp(`(^|[^a-z0-9])${esc(name)}(s|es)?([^a-z0-9]|$)`);
    const weeks = new Set(decks.filter((sid) => pages[sid].some((p) => re.test(p))).map((sid) => lectureWeek(subject, sid)));
    if (weeks.size >= 2) out.set(n.id, [...weeks].sort((a, b) => a - b));
  }
  return out;
}
function coverage(subject, cov, steps, tRows) {
  const { data } = subject;
  const fd = subject.fragmentData;
  const byId = new Map(data.NODES.map((n) => [n.id, n]));
  const first = (id) => Math.min(...byId.get(id).w);
  const all = [...steps, ...tRows];
  const badIds = all.filter(([, s]) => !Array.isArray(s.ids) || !s.ids.length || s.ids.some((id) => !byId.has(id) || first(id) > s.wk)).map(([id, s]) => `${id} "${s.hd || s.cells[0]}"`);
  ok(!badIds.length, `every thread step and table row names the map boxes it is about, none taught after the step${badIds.length ? ` (${badIds.slice(0, 6).join(', ')}${badIds.length > 6 ? ` and ${badIds.length - 6} more` : ''})` : ''}`);
  const covered = new Set(all.flatMap(([, s]) => s.ids || []));
  /* (i) and (iv) */
  const weeks = [...new Set(data.NODES.map((n) => Math.min(...n.w)))].sort((a, b) => a - b);
  const count = (list, w) => list.filter(([, s]) => s.wk === w).length;
  const thinWeeks = weeks.filter((w) => count(steps, w) < cov.minSteps || count(tRows, w) < cov.minRows);
  console.log(`      per week (steps/table rows/decoder terms)  ${weeks.map((w) => `${w}:${count(steps, w)}/${count(tRows, w)}/${(fd.decoder || []).filter((d) => d.wk === w).length}`).join('  ')}`);
  console.log(`      totals  ${fd.threads.length} threads, ${steps.length} steps, ${fd.tables.length} tables, ${tRows.length} rows, ${(fd.decoder || []).length} decoder terms`);
  ok(!thinWeeks.length, `every teaching week with content has at least ${cov.minSteps} thread steps and ${cov.minRows} table rows${thinWeeks.length ? ` (thin: ${thinWeeks.map((w) => `W${w}`).join(' ')})` : ''}`);
  /* (ii) the gap analysis's cross-chapter concepts */
  const threadOf = new Map(fd.threads.map((t) => [t.id, t]));
  const conceptBad = [];
  for (const c of cov.concepts) {
    const t = threadOf.get(c.th);
    if (!t) { conceptBad.push(`${c.name}: no thread ${c.th}`); continue; }
    const missing = c.boxes.filter((id) => !byId.has(id));
    if (missing.length) { conceptBad.push(`${c.name}: no box ${missing.join(' ')}`); continue; }
    const inThread = new Set(t.steps.flatMap((s) => s.ids || []));
    const out = c.boxes.filter((id) => !inThread.has(id));
    if (out.length) conceptBad.push(`${c.name}: ${out.join(' ')} not a step of ${c.th}`);
    const lect = new Set(c.boxes.map((id) => lectureWeek(subject, (byId.get(id).src || [])[0])));
    if (lect.size < 2) conceptBad.push(`${c.name}: its boxes come from one lecture only`);
  }
  ok(!conceptBad.length, `every cross-chapter concept (${cov.concepts.length}) has its own thread and each of its boxes is a step there${conceptBad.length ? ` — ${conceptBad.slice(0, 6).join('; ')}${conceptBad.length > 6 ? ` and ${conceptBad.length - 6} more` : ''}` : ''}`);
  const named = crossNamed(subject);
  const loose = [...named.keys()].filter((id) => !covered.has(id) && !cov.skipCross[id]);
  ok(!loose.length, `every box named on two or more lectures' slides (${named.size}) is in a thread or table, or skipped with a reason${loose.length ? ` (${loose.length} loose: ${loose.slice(0, 20).map((id) => `${id}[${named.get(id).join(',')}]`).join(' ')}${loose.length > 20 ? ' …' : ''})` : ''}`);
  const staleCross = Object.entries(cov.skipCross).filter(([id, why]) => !named.has(id) || covered.has(id) || String(why).trim().length < 12).map(([id]) => id);
  ok(!staleCross.length, `every cross-name skip is still needed and says why${staleCross.length ? ` (${staleCross.slice(0, 12).join(' ')})` : ''}`);
  /* (iii) the decoder */
  const terms = new Set((fd.decoder || []).map((d) => d.term));
  const eligible = [...new Set(data.NODES.map((n) => n.l))].filter((l) => decoderReading(l, decompose));
  const undecoded = eligible.filter((l) => !terms.has(l));
  ok(!undecoded.length, `every box name with a word-part reading (${eligible.length}) is in the decoder${undecoded.length ? ` (${undecoded.length} not: ${undecoded.slice(0, 15).join(', ')}${undecoded.length > 15 ? ' …' : ''})` : ''}`);
}

console.log('\nacross subjects');
const allSubjects = Object.values(REVISION);
const sysProblems = checkSystems(allSubjects);
ok(!sysProblems.length, `colour groups: every node's system is listed, keys unique, colours apart and readable${sysProblems.length ? ` — ${sysProblems.slice(0, 6).join('; ')}` : ''}`);
const idOwner = new Map(); const shared = [];
for (const s of allSubjects) for (const n of s.data.NODES) { if (idOwner.has(n.id)) shared.push(`${n.id} (${idOwner.get(n.id)}, ${s.id})`); else idOwner.set(n.id, s.id); }
ok(!shared.length, `no topic or row is in two subjects${shared.length ? ` (${shared.slice(0, 6).join(', ')})` : ''}`);
const rowKey = (r) => `${r.src[0]}|${r.src[1]}|${String(r.l).toLowerCase()}`;
const keyOwner = new Map(); const sameRow = [];
for (const s of allSubjects) for (const r of s.rows || []) { const k = rowKey(r); if (keyOwner.has(k) && keyOwner.get(k) !== s.id) sameRow.push(k); else keyOwner.set(k, s.id); }
ok(!sameRow.length, `no slide row is written into two subjects${sameRow.length ? ` (${sameRow.slice(0, 4).join(', ')})` : ''}`);
/* The owner's answer 8: a box can point at the same thing in the other subject (cross-links.js). */
const nodeIn = (sub, id) => !!REVISION[sub] && REVISION[sub].data.NODES.some((n) => n.id === id);
const crossBad = CROSS.filter((c) => !nodeIn(c.a[0], c.a[1]) || !nodeIn(c.b[0], c.b[1]) || c.a[0] === c.b[0]).map((c) => `${c.a.join(':')}-${c.b.join(':')}`);
ok(!crossBad.length, `every cross-subject link joins two real boxes in two subjects${crossBad.length ? ` (${crossBad.slice(0, 6).join(', ')})` : ''}`);
const crossKey = (c) => [c.a.join(':'), c.b.join(':')].sort().join('|');
ok(new Set(CROSS.map(crossKey)).size === CROSS.length, 'no cross-subject link is written twice');
const crossOff = CROSS.filter((c) => !String(c.why || '').trim() || !c.match || !onPage(c.src, c.match)).map(crossKey);
ok(!crossOff.length, `every cross-subject link's reason is on the page it cites${crossOff.length ? ` (${crossOff.slice(0, 6).join(', ')})` : ''}`);
/* Rule 3: the Map draws a box's name only; the sentence lives in the notes. */
const reviseSrc = readFileSync(new URL('../outputs/study/revise.js', import.meta.url), 'utf8');
const deriveBody = (reviseSrc.match(/function deriveWeek\(\)[\s\S]*?\n\}/) || [''])[0];
ok(deriveBody.length > 0 && !/describe\(|rv-said|firstSentence\(/.test(deriveBody), 'the Map builder puts no sentence under a box');

for (const subject of Object.values(REVISION)) {
  const { data } = subject;
  console.log(`\n${subject.id}`);
  const ids = new Set(data.NODES.map((n) => n.id));
  /* Rule 4 (rules.js): every row's notes say something useful. A row — or a sourced topic — whose slide line is not
     useful (under 25 characters, a count or fragment, or under three words) needs an own-words sentence. The Week 1
     position words of HSS2011 say where in full already. */
  const PLAIN = subject.id === 'HSS2011' ? new Set(['w1_proximal', 'w1_distal', 'w1_medial', 'w1_lateral', 'w1_anterior', 'w1_posterior', 'w1_caudal', 'w1_superior', 'w1_inferior', 'w1_cranial']) : new Set();
  const ownOf = (n) => n.own || OWN[n.id];
  const needy = data.NODES.filter((n) => (n.leaf || n.src) && !PLAIN.has(n.id) && needsOwn(n) && !ownOf(n)).map((n) => n.id);
  ok(!needy.length, `every row whose slide line is not useful has an own-words sentence${needy.length ? ` (missing: ${needy.slice(0, 30).join(' ')}${needy.length > 30 ? ` and ${needy.length - 30} more` : ''})` : ''}`);
  const badOwn = data.NODES.filter((n) => n.own).map((n) => [n.id, ownProblems(n.own, n.l)]).filter(([, p]) => p.length);
  ok(!badOwn.length, `every own-words sentence on a row is plain: a sentence, no digit, no star${badOwn.length ? ` — ${badOwn.slice(0, 6).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
  if (subject.id === 'ABCT2326') {
    const extra = data.NODES.filter((n) => n.own && !needsOwn(n)).map((n) => n.id);
    ok(!extra.length, `an own-words sentence only where the slide line is not useful${extra.length ? ` (needless: ${extra.slice(0, 12).join(' ')}${extra.length > 12 ? ` and ${extra.length - 12} more` : ''})` : ''}`);
  }
  if (subject.id === 'HSS2011') ok(Object.keys(OWN).every((id) => ids.has(id)), 'every own-words id is a real row');
  const last = lastWeekOf(data);

  ok(ids.size === data.NODES.length, 'topic ids are unique');
  ok(data.NODES.every((n) => n.s), 'every topic and row has a colour group');
  ok(data.EDGES.every((e) => ids.has(e[0]) && ids.has(e[1]) && e[0] !== e[1] && e[2]), 'every edge joins two real, different topics and says why');
  ok(new Set(data.EDGES.map((e) => [e[0], e[1]].sort().join('|'))).size === data.EDGES.length, 'no link is listed twice');

  const seen = [];
  (function walk(s) { if (s.id) seen.push(s.id); (s.kids || []).forEach(walk); })(data.TREE);
  ok(seen.length === ids.size && seen.every((id) => ids.has(id)) && new Set(seen).size === seen.length, 'every topic is in the tree exactly once');

  const threadIds = new Set([...subject.threads.matchAll(/<details class="thread" id="(t\d+)"/g)].map((m) => m[1]));
  ok(data.NODES.every((n) => (n.th || []).every((t) => threadIds.has(t))), 'every thread a topic names exists');
  ok(subject.tours.every((t) => threadIds.has(t.th) && t.stops.every((s) => ids.has(s))), 'every tour names a real thread and real topics');

  const nodeOf = new Map(data.NODES.map((n) => [n.id, n]));
  const twins = [];
  (function walk(spec, parent) {
    const me = nodeOf.get(spec.id), up = parent && nodeOf.get(parent.id);
    if (me && up && String(me.l).toLowerCase() === String(up.l).toLowerCase()) twins.push(`${parent.id} > ${spec.id}`);
    (spec.kids || []).forEach((k) => walk(k, spec));
  })(data.TREE, null);
  ok(!twins.length, `no box has a child of the same name${twins.length ? ` (${twins.join(', ')})` : ''}`);

  /* ---- leaves: the depth under a topic (outputs/revision/leaves.js) ---- */
  const leafRows = subject.rows || [];
  if (leafRows.length) {
    const order = new Map(leafRows.map((r, i) => [r.id, i]));
    const kindOf = new Map(leafRows.map((r) => [r.id, r.k]));
    const topicIds = new Set(data.NODES.filter((n) => !n.leaf).map((n) => n.id));
    /* a row named like its parent topic is folded into it (mergeLeaves ALIAS) */
    const real = (id) => (data.ALIAS || {})[id] || id;
    ok(leafRows.every((r) => KINDS.includes(r.k)), `every leaf has a known kind (${leafRows.length} leaves)`);
    ok(leafRows.every((r) => topicIds.has(r.parent) || (order.has(r.parent) && order.get(r.parent) < order.get(r.id))), 'every leaf hangs from a topic or an earlier leaf');
    ok(leafRows.every((r) => Number.isInteger(r.w) && nodeOf.has(real(r.parent)) && r.w >= firstWeek(nodeOf.get(real(r.parent)))), 'no leaf is taught before what it hangs from');
    const movesTarget = (id) => ['bone', 'part', 'group'].includes(kindOf.get(id));
    ok(leafRows.filter((r) => r.k === 'muscle').every((r) => { const j = Object.entries(r.joints || {}); const m = Object.entries(r.moves || {}); return j.length + m.length > 0 && j.every(([id, act]) => kindOf.get(id) === 'joint' && String(act).trim()) && m.every(([id, act]) => movesTarget(id) && String(act).trim()); }), 'every muscle acts at a joint row (joints) or moves a bone, part or group (moves), and says how');
    ok(leafRows.filter((r) => r.k === 'bone').every((r) => (r.joints || []).every((id) => kindOf.get(id) === 'joint')), "every bone's joints are joint rows");
    ok(leafRows.filter((r) => r.k === 'nerve').every((r) => Object.keys(r.supplies || {}).length > 0 && Object.keys(r.supplies).every((id) => ids.has(real(id))) && (!r.from || ids.has(real(r.from)))), 'every nerve supplies something real');
    ok(leafRows.every((r) => Object.keys(r.links || {}).every((id) => ids.has(real(id)))), 'every hand-written leaf link points at something real');
    const badSrc = [];
    for (const r of leafRows) {
      const [sid, ...pages] = r.src || [];
      const text = SOURCE_TEXT[sid];
      const needle = normaliseCitationText(r.match || r.l);
      const inRange = !!text && pages.length > 0 && pages.every((p) => Number.isInteger(p) && p >= 1 && p <= text.pages.length);
      if (!inRange || !pages.some((p) => normaliseCitationText(text.pages[p - 1]).includes(needle))) badSrc.push(`${r.id} (${sid} p${pages.join(',')}: "${needle}")`);
    }
    ok(!badSrc.length, `every leaf's name is on a page it cites${badSrc.length ? ` — ${badSrc.slice(0, 6).join('; ')}` : ''}`);
    const current = (sid) => /\.2026$/.test(sid) || (!!SOURCE_FILES[sid] && SOURCE_FILES[sid].root === 'newsrc');
    ok(leafRows.every((r) => (r.old ? !current(r.src[0]) : current(r.src[0]))), 'a row marked old cites an older deck, and every other row a current 2026/27 file');
    /* Rule 5: no two rows under one parent share a name. */
    const sib = new Map(); const sibDup = [];
    for (const r of leafRows) { const k = `${real(r.parent)}|${String(r.l).toLowerCase()}`; if (sib.has(k)) sibDup.push(`${sib.get(k)} = ${r.id}`); else sib.set(k, r.id); }
    ok(!sibDup.length, `no two rows under one parent share a name${sibDup.length ? ` (${sibDup.slice(0, 6).join(', ')})` : ''}`);
    /* Physiology link fields point at real rows of the right kind. */
    ok(leafRows.filter((r) => r.makes).every((r) => ['part', 'cell'].includes(r.k) && Object.entries(r.makes).every(([id, why]) => kindOf.get(id) === 'substance' && String(why).trim())), 'every makes is on a part or cell and points at a substance row, with a reason');
    ok(leafRows.filter((r) => r.acts).every((r) => r.k === 'substance' && Object.entries(r.acts).every(([id, why]) => ids.has(real(id)) && String(why).trim())), 'every acts is on a substance and points at something real, with a reason');
    ok(leafRows.filter((r) => r.next).every((r) => r.k === 'process' && Object.entries(r.next).every(([id, why]) => (kindOf.get(id) === 'process' || topicIds.has(id)) && String(why).trim())), 'every next is on a process and points at a process row or a topic, with a reason');
    /* Rule 2 and the owner's answers 2-3: a row cites one of the subject's lecture decks and is in a week that deck
       was lectured (subjects that list their decks). */
    if (subject.decks) {
      const wrong = leafRows.map((r) => [r.id, rowWeekOk(r, subject.decks, SESSIONS, subject.id)]).filter(([, why]) => why);
      ok(!wrong.length, `every row cites a lecture deck and sits in a week it was lectured${wrong.length ? ` — ${wrong.slice(0, 6).map(([id, why]) => `${id}: ${why}`).join('; ')}` : ''}`);
      ok(!leafRows.some((r) => r.old), 'no row leans on an old deck (iCloud lecture decks only)');
    }
  }

  /* Rule 1 for a subject written from scratch: topics, topic links and fragment steps cite a page that says them. */
  if (subject.sourced) {
    const badTopic = data.NODES.filter((n) => !n.leaf).filter((n) => !onPage(n.src, n.match || n.l)).map((n) => n.id);
    ok(!badTopic.length, `every topic's name is on a page it cites${badTopic.length ? ` (${badTopic.slice(0, 8).join(' ')})` : ''}`);
    const topicWeek = data.NODES.filter((n) => !n.leaf).map((n) => [n.id, rowWeekOk({ w: Math.min(...n.w), src: n.src }, subject.decks, SESSIONS, subject.id)]).filter(([, why]) => why);
    ok(!topicWeek.length, `every topic cites a lecture deck and sits in a week it was lectured${topicWeek.length ? ` — ${topicWeek.slice(0, 6).map(([id, why]) => `${id}: ${why}`).join('; ')}` : ''}`);
    const topicEdges = data.EDGES.filter((e) => !data.NODES.find((n) => n.id === e[0]).leaf && !data.NODES.find((n) => n.id === e[1]).leaf);
    /* e[3] = [source, page…, 'words on the page naming the far end'?]: the words are a string, the pages integers. */
    const edgeSrc = (e) => [e[3][0], ...e[3].slice(1).filter(Number.isInteger)];
    const edgeWords = (e) => { const w = e[3][e[3].length - 1]; return typeof w === 'string' ? w : data.NODES.find((n) => n.id === e[1]).l; };
    ok(topicEdges.every((e) => Array.isArray(e[3]) && onPage(edgeSrc(e), edgeWords(e))), 'every topic link cites a page that names its far end');
    /* Rule 5 at branch level: no topic is named like the branch heading above it. */
    const labelOf = new Map(data.NODES.map((n) => [n.id, String(n.l).toLowerCase()]));
    const branchTwins = (data.TREE.kids || []).flatMap((b) => (b.kids || []).filter((k) => k.id && b.label && labelOf.get(k.id) === b.label.toLowerCase()).map((k) => k.id));
    ok(!branchTwins.length, `no topic is named like its branch heading${branchTwins.length ? ` (${branchTwins.join(' ')})` : ''}`);
    const fd = subject.fragmentData || { threads: [], tables: [], decoder: [] };
    const steps = fd.threads.flatMap((t) => t.steps.map((s) => [t.id, s]));
    const tRows = fd.tables.flatMap((t) => t.rows.map((r) => [t.id, r]));
    const badSteps = [...steps, ...tRows].filter(([, s]) => !s.match || !onPage(s.src, s.match)).map(([id, s]) => `${id} "${s.match}"`);
    ok(!badSteps.length, `every thread step and table row is on the page it cites${badSteps.length ? ` (${badSteps.slice(0, 6).join(', ')})` : ''}`);
    ok([...steps, ...tRows].every(([, s]) => Number.isInteger(s.wk) && s.wk >= firstWeekOfSource(s.src)), 'no step or table row is tagged before its source was taught');
    /* The owner's answers 6, 7, 9: ★ facts cite a Martini page of the lecture's chapter; every thread has a 廣東話 line
       that adds no English word or number of its own; every decoder reading is the one a session reviewed. */
    const chOf = (src) => ((subject.decks[(src || [])[0]] || {}).ch || []);
    const badStar = steps.filter(([, s]) => s.star).map(([id, s]) => [id, starProblems(s.star, chOf(s.src))]).filter(([, p]) => p.length);
    ok(!badStar.length, `every ★ fact is one sentence with a textbook page from its lecture's chapter${badStar.length ? ` — ${badStar.slice(0, 4).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
    ok(!steps.some(([, s]) => s.star) || !!SOURCE_FILES['phys.ebook'], 'the textbook a ★ cites is a registered source');
    const badYue = fd.threads.map((t) => [t.id, yueProblems(t.yue, t.steps.map((s) => s.text))]).filter(([, p]) => p.length);
    ok(!badYue.length, `every thread's 廣東話 line retells only its steps${badYue.length ? ` — ${badYue.slice(0, 4).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
    const decBad = decoderProblems(fd.decoder || [], decompose, new Set(data.NODES.map((n) => n.l)));
    ok(!decBad.length, `every decoder reading is the reviewed one, every term a name on the map${decBad.length ? ` — ${decBad.slice(0, 4).join('; ')}` : ''}`);
    if (COVERAGE[subject.id]) coverage(subject, COVERAGE[subject.id], steps, tRows);
  }

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
  for (let n = 1; n <= last; n++) {
    const { tree } = pruneTree(data, n);
    const inTree = [];
    (function walk(s) { if (s.id) inTree.push(s.id); (s.kids || []).forEach(walk); })(tree);
    const want = visibleIds(data, n);
    for (const id of want) if (!inTree.includes(id)) treeOk = false;
    for (const id of inTree) if (!want.has(id)) treeOk = false;
    /* a heading with nothing under it must not survive */
    (function walk(s) { if (!s.id && s !== tree && !(s.kids || []).length) treeOk = false; (s.kids || []).forEach(walk); })(tree);
  }
  ok(treeOk, 'the pruned tree holds every shown topic, no empty heading, and nothing taught later');

  /* the week tags baked into the fragments */
  const need = subject.requireFragments !== false;
  const tagged = (html, re) => [...html.matchAll(re)].map((m) => Number(m[1]));
  const steps = tagged(subject.threads, /<li data-wk="(\d+)"/g);
  const untaggedSteps = (subject.threads.match(/<li>/g) || []).length;
  const untaggedRows = (subject.threads.match(/<tr>\s*<td/g) || []).length;
  ok(untaggedRows === 0, 'every thread table row has a week');
  ok(!/<div class="yue">/.test(subject.threads || ''), 'every 廣東話 line carries the week it may show from');
  ok((need ? steps.length > 0 : true) && untaggedSteps === 0, `every thread step has a week (${steps.length} steps)${need ? '' : ' — fragments not required yet'}`);
  const rows = tagged(subject.tables, /<tr data-wk="(\d+)"/g);
  const boxes = tagged(subject.tables, /<div class="note-box" data-wk="(\d+)"/g);
  ok((need ? rows.length > 0 : true) && !/<tr>\s*<td/.test(subject.tables), `every table row has a week (${rows.length} rows, ${boxes.length} boxes)`);
  const dec = tagged(subject.decoder, /<tr [^>]*data-wk="(\d+)"/g);
  ok((need ? dec.length > 0 : true) && !/<tr>\s*<td/.test(subject.decoder), `every decoder row has a week (${dec.length} rows)`);
  const all = [...steps, ...rows, ...boxes, ...dec];
  ok(all.every((w) => w >= 1 && w <= last), `no fragment is tagged outside weeks 1-${last}`);
  /* each week should add something to every list that has anything */
  if (need) ok(steps.some((w) => w <= 2), 'threads have something from the first weeks');
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
ok(releasedLast(8, 7) === 7 && releasedLast(8, 8) === 8 && releasedLast(8, 13) === 8 && releasedLast(7, 3) === 3, 'a week beyond the released one is not offered: the chips stop there');
ok(releasedLast(8, null) === 8 && releasedLast(8, 0) === 1, 'no released limit holds nothing back');
ok(REVISION.HSS2011.released == null && lastWeekOf(REVISION.HSS2011.data) === 8, 'every week with notes (through Week 8) is offered; the auto week follows the calendar');
ok(!REVISION.ABCT2326 || REVISION.ABCT2326.released == null, 'ABCT2326 has no released cap: every week with notes is a chip');

console.log('\nsaved choice');
ok(resolveWeek(null, 5, 7).mode === 'auto' && resolveWeek(null, 5, 7).week === 5, 'nothing saved: automatic');
ok(resolveWeek({ mode: 'manual', week: 6 }, 7, 7).week === 6 && resolveWeek({ mode: 'manual', week: 6 }, 7, 7).mode === 'manual', 'a manual week 6 wins over automatic week 7');
ok(resolveWeek({ mode: 'manual', week: 12 }, 3, 7).week === 7, 'a saved week beyond the content is re-clamped');
ok(resolveWeek({ mode: 'auto', week: 2 }, 5, 7).week === 5, 'a saved auto ignores the stored week and follows the calendar');
ok(resolveWeek({ mode: 'manual', week: null }, 5, 7).mode === 'auto', 'a manual choice with no week falls back to automatic');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
