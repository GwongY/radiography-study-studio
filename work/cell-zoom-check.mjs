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
 * the UNLABELLED terms, and checks the nucleosome data (work/data/nucleosome-3afa.js): two 146-nucleotide
 * strands whose every pair is A-T or G-C, eight histone chains. Last, the models (outputs/cell/models.js): every
 * level has its .glb, each .glb's nodes are that level's parts and all of them, its label anchors name real parts,
 * a level with a slider is animated (and a signal's run, czClips, is one of the slider's signals), and every
 * download a model is made from is credited in outputs/THIRD-PARTY-NOTICES.txt by title, author and URL. A .glb is
 * read by its JSON chunk alone, so the check needs no glTF library.
 */
import { readFileSync, existsSync } from 'node:fs';
import { LEVELS, LABELS, SLIDERS, SHOW_IN_3D, CELL_SOURCES, FALLBACK, UNLABELLED, SYSTEMS, stagesFor } from '../outputs/cell-zoom.js';
import { PARTS } from '../outputs/cell/zoom-scene.js';
import { MODELS, MODEL_SOURCES, MODEL_LICENCE } from '../outputs/cell/models.js';
import { DNA_STRANDS, BASE_PAIRS, HISTONE_CHAINS, NUCLEOSOME_SOURCE } from './data/nucleosome-3afa.js';
import { EXPLAIN } from '../outputs/cell-explain.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { REVISION } from '../outputs/revision/registry.js';
import { normaliseCitationText as norm } from './lib/source-lesson-map.mjs';

let fail = 0;
const ok = (good, msg) => { if (!good) { console.log(`  FAIL ${msg}`); fail++; } else if (process.argv.includes('-v')) console.log(`  ok   ${msg}`); };
const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
/* A cite marked figure: true quotes a label drawn inside a slide's figure, which no text extraction reaches; those
   labels are transcribed, page by page, in work/figure-labels.json (read off the slide image). */
const FIGURE = JSON.parse(readFileSync(new URL('./figure-labels.json', import.meta.url), 'utf8')).labels;
const pageText = (c) => c.figure
  ? (((FIGURE[c.ref] || {})[c.page] || {}).labels || []).map((l) => norm(l)).join(' | ')
  : norm(((TEXT[c.ref] || { pages: [] }).pages[c.page - 1]) || '');

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
const grouped = SYSTEMS.flatMap(([, ids]) => ids);
ok(grouped.length === new Set(grouped).size, 'Go to: no level is in two body systems');
for (const lv of LEVELS) ok(grouped.includes(lv.id), `Go to: level ${lv.id} is under a body system`);
for (const id of grouped) ok(ids.has(id), `Go to: ${id} is a level`);
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

console.log('— every label has one plain sentence of its own —');
for (const [lvId, labels] of Object.entries(LABELS)) {
  for (const x of labels) {
    const t = (EXPLAIN[lvId] || {})[x.id];
    ok(typeof t === 'string' && t.length > 20 && t.length <= 240, `${lvId}/${x.id}: has an explanation of a sentence`);
    ok(typeof t === 'string' && /[.]$/.test(t) && !/[.!?]\s+[A-Z]/.test(t) && !/[“”"]/.test(t), `${lvId}/${x.id}: the explanation is exactly one sentence, not a quotation`);
  }
  for (const id of Object.keys(EXPLAIN[lvId] || {})) ok(labels.some((x) => x.id === id), `${lvId}/${id}: the explanation belongs to a label`);
}
for (const lvId of Object.keys(EXPLAIN)) ok(!!LABELS[lvId], `explanations for level ${lvId}: the level exists`);

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
    for (const t of [].concat(s.link || [])) {
      const to = LEVELS.find((l) => l.id === t.level);
      ok(!!to, `slider ${sid}/${s.id}: link → ${t.level} exists`);
      if (t.stage) ok(!!to && !!to.slider && stagesFor(to.slider, 'none').some((x) => x.id === t.stage), `slider ${sid}/${s.id}: link → ${t.level}/${t.stage} is a stage there`);
      if (t.label) ok((LABELS[t.level] || []).some((x) => x.id === t.label), `slider ${sid}/${s.id}: link → label ${t.label} is on ${t.level}`);
    }
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

console.log('— every level wears a model made of its own parts, and every download is credited —');
/* the JSON chunk of a .glb: 12-byte header, then [length, type 'JSON', bytes] */
const glbJson = (file) => { const b = readFileSync(file); return JSON.parse(b.subarray(20, 20 + b.readUInt32LE(12)).toString('utf8')); };
const NOTICES = readFileSync(new URL('../outputs/THIRD-PARTY-NOTICES.txt', import.meta.url), 'utf8');
ok(MODEL_LICENCE === 'CC BY 4.0', 'the downloads are CC BY 4.0 (no NC licence)');
for (const [id, src] of Object.entries(MODEL_SOURCES)) {
  for (const k of ['title', 'author', 'url']) ok(NOTICES.includes(src[k]), `download ${id}: its ${k} is in THIRD-PARTY-NOTICES.txt`);
  ok(Object.values(MODELS).some((m) => m.sources.includes(id)), `download ${id}: a model uses it`);
}
for (const lv of LEVELS) ok(!!MODELS[lv.id], `level ${lv.id}: has a model`);
for (const [lvId, m] of Object.entries(MODELS)) {
  const what = `model ${lvId}`, file = new URL(`../outputs/${m.file.slice(2)}`, import.meta.url);
  ok(ids.has(lvId), `${what}: the level exists`);
  for (const s of m.sources) ok(!!MODEL_SOURCES[s], `${what}: download ${s} is credited in MODEL_SOURCES`);
  if (!existsSync(file)) { ok(false, `${what}: ${m.file} exists`); continue; }
  const j = glbJson(file), scene = (j.scenes || [])[j.scene || 0] || {}, ex = scene.extras || {};
  ok(ex.czLevel === lvId, `${what}: the .glb says it is level ${lvId}`);
  const parts = new Set(PARTS[lvId] || []), seen = new Set();
  for (const nd of j.nodes || []) {
    const e = nd.extras || {};
    if (e.czAnchorOf) ok(parts.has(e.czAnchorOf), `${what}: anchor ${nd.name} names part ${e.czAnchorOf}`);
    /* a mesh node without extras is one quantization put under an animated node: it is that node's (the app looks
       up the nearest ancestor's part too) */
    const up = (j.nodes.find((p) => (p.children || []).includes(j.nodes.indexOf(nd))) || {}).extras || {};
    if (nd.mesh == null || e.czDecor || (!e.czPart && up.czDecor)) continue;
    const own = e.czPart || up.czPart;
    ok(!!own && parts.has(own), `${what}: node ${nd.name} is a part of the level (${own || 'none'})`);
    if (own) seen.add(own);
  }
  for (const p of parts) ok(seen.has(p), `${what}: carries part ${p}`);
  const lv = LEVELS.find((l) => l.id === lvId);
  if (lv && lv.slider) {
    ok((j.animations || []).length === 1, `${what}: its stage slider has one animation`);
    const signals = new Set((SLIDERS[lv.slider].signals || [{ id: 'none' }]).map((g) => g.id));
    for (const sig of Object.keys(ex.czClips || {})) ok(signals.has(sig), `${what}: czClips ${sig} is a signal of slider ${lv.slider}`);
    if ((SLIDERS[lv.slider].signals || []).length) for (const sig of signals) ok(ex.czClips && ex.czClips[sig] != null, `${what}: signal ${sig} has its run (czClips)`);
  }
}

const n = Object.values(LABELS).reduce((s, l) => s + l.length, 0);
const st = Object.values(SLIDERS).reduce((s, l) => s + (l.stages || []).length, 0);
console.log(fail ? `\n${fail} FAILED` : `\nALL PASS — ${LEVELS.length} levels, ${n} labels, ${st} stages`);
process.exit(fail ? 1 : 0);
