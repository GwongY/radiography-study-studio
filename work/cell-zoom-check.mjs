/*
 * Cell zoom check — the Viewer's Cell mode says only what an ABCT2326 source page says, every label points at
 * something drawn, every Revise link and "Show in 3D" target is real, and the nucleosome is the PDB's.
 *
 *   node work/cell-zoom-check.mjs [-v]
 *
 * outputs/cell-zoom.js names each level, label, stage and note. Those are presented as course terms, so each cites
 * a registered ABCT2326 source page and a quote; this holds every quote, label name and note against the committed
 * page text (work/source-text.json), the comparison revision-check and muscle-zoom-check use. A source must be a
 * 2026 deck, a tutorial (kind "assessment"), or an older file FALLBACK names with its reason. It also holds each
 * Revise link to a real box, each label to a part outputs/cell/zoom-scene.js builds (its PARTS export, which needs
 * no three.js), each "Show in 3D" target to a real level, label, stage and signal, refuses a label that is one of
 * the UNLABELLED terms, and checks the nucleosome data (outputs/cell/nucleosome-3afa.js): two 146-nucleotide
 * strands whose every pair is A-T or G-C, eight histone chains.
 */
import { readFileSync } from 'node:fs';
import { LEVELS, LABELS, SLIDERS, SHOW_IN_3D, CELL_SOURCES, FALLBACK, UNLABELLED, stagesFor } from '../outputs/cell-zoom.js';
import { PARTS } from '../outputs/cell/zoom-scene.js';
import { DNA_STRANDS, BASE_PAIRS, HISTONE_CHAINS, NUCLEOSOME_SOURCE } from '../outputs/cell/nucleosome-3afa.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { REVISION } from '../outputs/revision/registry.js';
import { normaliseCitationText as norm } from './lib/source-lesson-map.mjs';

let fail = 0;
const ok = (good, msg) => { if (!good) { console.log(`  FAIL ${msg}`); fail++; } else if (process.argv.includes('-v')) console.log(`  ok   ${msg}`); };
const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
const pageText = (c) => norm(((TEXT[c.ref] || { pages: [] }).pages[c.page - 1]) || '');

function checkCites(what, cite) {
  ok(Array.isArray(cite) && cite.length > 0, `${what}: cites at least one page`);
  for (const c of cite || []) {
    const src = SOURCE_FILES[c.ref];
    ok(!!src && ['ABCT2326', 'HSS2011'].includes(src.subject), `${what}: ${c.ref} is a registered core-course source`);
    ok(!!src && (/\.2026$/.test(c.ref) || src.kind === 'assessment' || !!FALLBACK[c.ref]), `${what}: ${c.ref} is a 2026 deck, a tutorial, or a named fallback`);
    ok(!!CELL_SOURCES[c.ref], `${what}: ${c.ref} has a short name for the cite line`);
    ok(pageText(c).includes(norm(c.match)), `${what}: "${c.match}" is on ${c.ref} p${c.page}`);
  }
}
const onCited = (cite, words) => (cite || []).some((c) => pageText(c).includes(norm(words)));
/* "Messenger RNA (mRNA)" is on the page whole, or both halves are */
const labelOnCited = (cite, l) => {
  const m = String(l).match(/^(.+) \((.+)\)$/);
  return onCited(cite, l) || (!!m && onCited(cite, m[1]) && onCited(cite, m[2]));
};
const boxes = new Map(Object.entries(REVISION).map(([s, sub]) => [s, new Set(sub.data.NODES.map((n) => n.id))]));
const checkRevise = (what, revise) => { for (const [subject, id] of revise || []) ok(!!boxes.get(subject) && boxes.get(subject).has(id), `${what}: Revise box ${subject} ${id} exists`); };
const checkShown = (what, x, name) => {
  checkCites(what, x.cite);
  ok(labelOnCited(x.cite, name), `${what}: "${name}" is on a cited page`);
  for (const note of [].concat(x.note || [])) ok(onCited(x.cite, note), `${what}: note "${note}" is on a cited page`);
  ok(!UNLABELLED.some((u) => norm(name).includes(norm(u))), `${what}: "${name}" is not an unlabelled term`);
  checkRevise(what, x.revise);
};

console.log('— every level is a source term, and every level is reachable —');
const ids = new Set(LEVELS.map((l) => l.id));
ok(ids.size === LEVELS.length, `${LEVELS.length} levels, ids unique`);
for (const lv of LEVELS) {
  checkShown(`level ${lv.id}`, lv, lv.title);
  for (const k of ['next', 'side', 'back']) for (const to of [].concat(lv[k] || [])) ok(ids.has(to), `level ${lv.id}: ${k} → ${to} exists`);
  ok(!!lv.next || !!lv.back || LEVELS.some((l) => l.next === lv.id) || lv === LEVELS[0], `level ${lv.id}: has a way out (Zoom out or Zoom in)`);
  if (lv.slider) ok(!!SLIDERS[lv.slider], `level ${lv.id}: slider ${lv.slider} exists`);
  ok(Array.isArray(LABELS[lv.id]), `level ${lv.id}: has a label list`);
}
/* Every level is in the panel's "Go to" menu; the path back from each must still end at the first level. */
for (const lv of LEVELS) {
  const seen = []; let at = lv;
  while (at && !seen.includes(at.id)) { seen.push(at.id); at = LEVELS.find((l) => l.id === at.back) || LEVELS.find((l) => l.next === at.id); }
  ok(seen.at(-1) === LEVELS[0].id, `level ${lv.id}: Zoom out leads back to ${LEVELS[0].id} (${seen.join(' → ')})`);
}

console.log('— every label, and every note, is on a page it cites; every label has a part —');
for (const [lvId, labels] of Object.entries(LABELS)) {
  ok(ids.has(lvId), `labels for level ${lvId}: the level exists`);
  ok(new Set(labels.map((x) => x.id)).size === labels.length, `${lvId}: label ids unique`);
  for (const x of labels) {
    checkShown(`${lvId}/${x.id}`, x, x.l);
    ok(!!(PARTS[lvId] || []).includes(x.id), `${lvId}/${x.id}: zoom-scene.js builds a part for it`);
  }
  for (const p of PARTS[lvId] || []) ok(labels.some((x) => x.id === p), `${lvId}: built part "${p}" has a label`);
}

console.log('— every stage, signal and group of the sliders —');
for (const [sid, sl] of Object.entries(SLIDERS)) {
  if (sl.ends) { checkCites(`slider ${sid}`, sl.cite); for (const e of sl.ends) ok(onCited(sl.cite, e), `slider ${sid}: "${e}" is on a cited page`); }
  const stageIds = new Set((sl.stages || []).map((s) => s.id));
  ok(stageIds.size === (sl.stages || []).length, `slider ${sid}: stage ids unique`);
  const signals = new Set((sl.signals || []).map((s) => s.id));
  for (const s of sl.stages || []) {
    checkShown(`slider ${sid}/${s.id}`, s, s.l === 'mRNA leaves nucleus' ? 'mRNA leaves nucleus' : s.l);
    if (s.group) ok(!!(sl.groups || {})[s.group], `slider ${sid}/${s.id}: group ${s.group} exists`);
    if (s.signal) ok(signals.has(s.signal), `slider ${sid}/${s.id}: signal ${s.signal} exists`);
  }
  for (const [gid, g] of Object.entries(sl.groups || {})) checkShown(`slider ${sid} group ${gid}`, g, g.l);
  for (const g of sl.signals || []) if (g.id !== 'none') checkShown(`slider ${sid} signal ${g.id}`, g, g.l.replace(/ hormone$/, ' hormones'));
  for (const g of sl.signals || []) ok(stagesFor(sid, g.id).length >= 2, `slider ${sid}: signal ${g.id} has a run of stages`);
}

console.log('— "Show in 3D" opens somewhere real —');
for (const [subject, map] of Object.entries(SHOW_IN_3D)) for (const [id, t] of Object.entries(map)) {
  const what = `Show in 3D ${subject} ${id}`;
  checkRevise(what, [[subject, id]]);
  const lv = LEVELS.find((l) => l.id === t.level);
  ok(!!lv, `${what}: level ${t.level} exists`);
  if (t.label) ok((LABELS[t.level] || []).some((x) => x.id === t.label), `${what}: label ${t.label} is on level ${t.level}`);
  if (t.stage) ok(!!lv && !!lv.slider && stagesFor(lv.slider, t.signal || 'none').some((s) => s.id === t.stage), `${what}: stage ${t.stage} is on that level's slider for signal ${t.signal || 'none'}`);
  if (t.signal) ok(!!lv && (SLIDERS[lv.slider].signals || []).some((s) => s.id === t.signal), `${what}: signal ${t.signal} exists`);
}

console.log('— the nucleosome is PDB 3AFA, whole —');
ok(NUCLEOSOME_SOURCE.pdb === '3AFA' && NUCLEOSOME_SOURCE.licence === 'CC0 1.0', 'source is PDB 3AFA, CC0 1.0');
ok(DNA_STRANDS.length === 2 && DNA_STRANDS.every((s) => s.bases.length === 146 && s.backbone.length === 146 * 3 && s.c1.length === 146 * 3), 'two strands of 146 nucleotides, each with a backbone point and a C1\'');
{
  const C = { A: 'T', T: 'A', G: 'C', C: 'G' };
  let good = BASE_PAIRS.length === 146 * 2;
  for (let k = 0; k < BASE_PAIRS.length; k += 2) if (C[DNA_STRANDS[0].bases[BASE_PAIRS[k]]] !== DNA_STRANDS[1].bases[BASE_PAIRS[k + 1]]) good = false;
  ok(good, '146 base pairs, every one A-T or G-C');
}
ok(HISTONE_CHAINS.length === 8 && ['H3.1', 'H4', 'H2A', 'H2B'].every((n) => HISTONE_CHAINS.filter((h) => h.name === n).length === 2), 'eight histone chains, two each of H3, H4, H2A, H2B');

const n = Object.values(LABELS).reduce((s, l) => s + l.length, 0);
const st = Object.values(SLIDERS).reduce((s, l) => s + (l.stages || []).length, 0);
console.log(fail ? `\n${fail} FAILED` : `\nALL PASS — ${LEVELS.length} levels, ${n} labels, ${st} stages`);
process.exit(fail ? 1 : 0);
