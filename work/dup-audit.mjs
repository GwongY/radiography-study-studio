/*
 * dup-audit.mjs — the duplication gate: shared figures, and lesson text that
 * repeats itself.
 *
 * Two questions, asked the way a reader would ask them:
 *
 *   A. IMAGE REUSE. Every study item's resolved visuals (visualsFor() +
 *      plateFor(), the same two paths the renderer takes) are grouped by the
 *      figure / plate / schematic / model-spec they show. The table says which
 *      (unit, item) shows each one. Flagged:
 *        - a visual id shown in MORE THAN 2 distinct units;
 *        - a visual id whose uses span more than one SUBJECT;
 *        - a model spec (same layer + same mesh set) shown by items in more
 *          than one unit;
 *        - two different figures carrying an IDENTICAL intro line, or an
 *          identical set of key callout names (copy-paste between figures).
 *
 *   B. TEXT DUPLICATION. Every text-bearing field of every item is walked
 *      (lesson prose, key facts, memory aids, practice prompts and
 *      explanations, application scenarios, common mistakes, skills,
 *      self-check, prior-knowledge beyond lines), split into sentences where
 *      it is prose, and normalised (lowercase, punctuation stripped).
 *      Flagged, by trigram Dice similarity >= 0.8:
 *        - near-duplicate sentences ACROSS FIELDS within one item;
 *        - near-duplicate sentences ACROSS ITEMS within one unit;
 *        - IDENTICAL normalised sentences appearing in more than one unit
 *          (the cheap global net; catches copy-paste across subjects).
 *
 * Repeats that are DELIBERATE are not silent: each one is listed in ALLOWED
 * below with its reason, and the gate stays green only while every flag is
 * either fixed or allowed there.
 *
 * Usage:
 *   node work/dup-audit.mjs                 # gate: exits 1 on any unallowed flag
 *   node work/dup-audit.mjs --report <path> # also write the full markdown report
 *   node work/dup-audit.mjs --uses          # print the full multi-use table
 */
import { writeFileSync } from 'node:fs';
import { FIGURES } from '../outputs/figures.js';
import { PLATES, visualsFor, plateFor } from '../outputs/visual-data.js';
import { SCHEMATICS } from '../outputs/schematics.js';
import { LAYOUTS } from '../outputs/layouts.js';
import { STUDY_ITEMS } from '../outputs/study-data.js';

/* ------------------------------------------------------------------ *
 * Deliberate repeats. Every entry must carry a reason a reader can
 * judge. Key forms (kind, then key):
 *   visual  <registry>:<id>            a published image reused as flagged
 *   model   <layer>::<hash>            the same 3D capture reused as flagged
 *   figure-intro <figId>|<figId>       two figures sharing an intro line
 *   figure-key   <figId>|<figId>       two figures sharing a key name set
 *   text    <scope>:<hash>             scope = sameItem | sameUnit | crossUnit
 * ------------------------------------------------------------------ */
const ALLOWED = [];

/* ------------------------------------------------------------------ *
 * helpers                                                            */
/* ------------------------------------------------------------------ */

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const trigrams = (s) => {
  const t = new Set();
  for (let i = 0; i + 3 <= s.length; i++) t.add(s.slice(i, i + 3));
  return t;
};
function dice(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return (2 * inter) / (a.size + b.size);
}
function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
const excerpt = (s, n = 170) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
};

const flags = [];
const allowReasons = [];
function allow(kind, key) {
  const a = ALLOWED.find((x) => x.kind === kind && x.key === key);
  if (a) allowReasons.push({ kind, key, reason: a.reason });
  return !!a;
}
function pushFlag(kind, key, detail) {
  if (!allow(kind, key)) flags.push({ kind, key, detail });
}

/* ------------------------------------------------------------------ *
 * A. image reuse                                                     */
/* ------------------------------------------------------------------ */

function registryOf(id) {
  if (FIGURES[id]) return 'figure';
  if (PLATES[id]) return 'plate';
  if (SCHEMATICS[id]) return 'schematic';
  if (LAYOUTS[id]) return 'layout';
  return 'MISSING';
}

const visualUses = new Map(); // key -> [{ unit, subject, itemId, focuses }]
function addUse(key, item, focus) {
  if (!visualUses.has(key)) visualUses.set(key, []);
  const list = visualUses.get(key);
  const hit = list.find((u) => u.itemId === item.id);
  if (hit) { if (focus) hit.focuses.push(focus); }
  else list.push({ unit: item.unit, subject: item.subject, itemId: item.id, focuses: focus ? [focus] : [] });
}

for (const item of STUDY_ITEMS) {
  for (const spec of visualsFor(item)) {
    if (!spec) continue;
    if (spec.kind === 'schematic') {
      addUse(`visual ${registryOf(spec.id)}:${spec.id}`, item, spec.focus || null);
    } else if (spec.kind === 'plateRef') {
      addUse(`visual plate:${spec.id}`, item, null);
    } else if (spec.kind === 'labelled') {
      addUse(`visual diagram:${spec.id}`, item, null);
    } else if (spec.kind === 'model') {
      const meshes = [...(spec.meshes || [])].sort().join('|');
      addUse(`model ${spec.layer}::${hash(meshes)}`, item, null);
    }
    /* kind 'generated' derives from the item's own data — never shared. */
  }
  const pl = plateFor(item);
  if (pl) addUse(`plate-by-item ${item.id}`, item, null);
}

console.log(`— A. image reuse: ${visualUses.size} distinct visual ids across ${STUDY_ITEMS.length} items —`);

for (const [key, uses] of visualUses) {
  const units = new Set(uses.map((u) => u.unit));
  const subjects = new Set(uses.map((u) => u.subject));
  if (units.size > 2) {
    pushFlag('visual', key, { uses, why: `shown in ${units.size} distinct units` });
  } else if (subjects.size > 1) {
    pushFlag('visual', key, { uses, why: `spans ${subjects.size} subjects (${[...subjects].join(', ')})` });
  }
}

/* identical intro / key text across DIFFERENT figures */
function publishedEntries() {
  const out = [];
  for (const [id, f] of Object.entries(FIGURES)) out.push({ id, kind: 'figure', ...f });
  for (const [id, p] of Object.entries(PLATES)) out.push({ id, kind: 'plate', ...p });
  return out;
}
const intros = new Map();
const keysets = new Map();
for (const f of publishedEntries()) {
  if (f.intro) {
    const k = norm(f.intro);
    if (!intros.has(k)) intros.set(k, []);
    intros.get(k).push(f.id);
  }
  const names = (f.key || []).map((r) => norm(r.name || '')).filter(Boolean).sort().join('|');
  if (names) {
    if (!keysets.has(names)) keysets.set(names, []);
    keysets.get(names).push(f.id);
  }
}
for (const [, ids] of intros) {
  if (ids.length > 1) pushFlag('figure-intro', ids.slice().sort().join('|'), { ids });
}
for (const [, ids] of keysets) {
  if (ids.length > 1) pushFlag('figure-key', ids.slice().sort().join('|'), { ids });
}

/* ------------------------------------------------------------------ *
 * B. text duplication                                                */
/* ------------------------------------------------------------------ */

function splitSentences(text) {
  return String(text).split(/(?<=[.!?])\s+/);
}

function segmentsOf(item) {
  const segs = [];
  const push = (loc, text) => {
    if (typeof text !== 'string') return;
    const t = text.replace(/\s+/g, ' ').trim();
    if (t.length < 25) return;
    segs.push({ loc, text: t });
  };
  const prose = (loc, text) => {
    if (typeof text !== 'string') return;
    for (const s of splitSentences(text)) push(loc, s);
  };

  /* lesson.prerequisites is written on many items but has NO consumer in
     outputs/study/ — nothing renders it — and its values are item-id
     cross-references, not prose. Excluded from the walk; counted once in
     the systemic section. */
  push('title', item.title);
  const L = item.lesson || {};
  prose('lesson.explanation', L.explanation);
  prose('lesson.plain', L.plain);
  /* factsHTML() in layout-figures.js renders keyFactsGroups INSTEAD of the
     flat keyFacts list when both are present, so the flat list is shadowed —
     it reaches no reader. Its duplication is counted once, as a systemic
     `shadowed-keyfacts` finding below, not as per-sentence text flags. */
  const shadowed = (L.keyFactsGroups || []).length > 0;
  if (!shadowed) (L.keyFacts || []).forEach((t, i) => push(`lesson.keyFacts[${i}]`, t));
  (L.keyFactsGroups || []).forEach((g, gi) =>
    (g.items || []).forEach((t, i) => push(`lesson.keyFactsGroups[${gi}][${i}]`, t)));
  (L.examples || []).forEach((t, i) => push(`lesson.examples[${i}]`, t));
  prose('lesson.hook', L.hook);
  prose('lesson.studyNote', L.studyNote);
  for (const [k, v] of Object.entries(item.memory || {})) push(`memory.${k}`, v);
  (item.practice || []).forEach((q, i) => {
    prose(`practice[${i}].prompt`, q.prompt);
    prose(`practice[${i}].explanation`, q.explanation);
    prose(`practice[${i}].model`, q.model);
    (q.rubric || []).forEach((t, j) => push(`practice[${i}].rubric[${j}]`, t));
  });
  (item.application || []).forEach((a, i) => {
    prose(`application[${i}].prompt`, a.prompt);
    prose(`application[${i}].model`, a.model);
    (a.rubric || []).forEach((t, j) => push(`application[${i}].rubric[${j}]`, t));
  });
  (item.commonMistakes || []).forEach((t, i) => push(`commonMistakes[${i}]`, t));
  (item.skills || []).forEach((t, i) => push(`skills[${i}]`, t));
  prose('selfCheck', item.selfCheck);
  /* priorKnowledge.beyond lines are owned by the DSE re-tag pass, which will
     rewrite every one against the Supplement — deduping beyond-vs-teaching
     here would touch every physiology item twice. Excluded from this walk. */
  return segs.map((s) => ({ ...s, norm: norm(s.text), grams: null }));
}

const SIM_THRESHOLD = 0.8;   // trigram Dice
const FUZZY_MIN = 40;        // fuzzy-match only sentences at least this many normalised chars
const EXACT_MIN = 20;        // below FUZZY_MIN, exact normalised match still counts

const groups = {
  sameItem: new Map(),  // key -> { sim, occ: ['itemId · loc', ...], sample }
  sameUnit: new Map(),
  crossUnit: new Map(),
};
function addPair(bucket, a, b, sim) {
  const [x, y] = [a.norm, b.norm].sort();
  const key = `${hash(x)}~${hash(y)}`;
  if (!groups[bucket].has(key)) groups[bucket].set(key, { sim, occ: [] });
  const g = groups[bucket].get(key);
  g.sim = Math.max(g.sim, sim);
  const where = (s) => `${s.item.id} · ${s.loc}`;
  if (!g.occ.includes(where(a))) g.occ.push(where(a));
  if (!g.occ.includes(where(b))) g.occ.push(where(b));
  if (!g.sample) g.sample = a.text;
}

/* the loops below know their own scope and pass it in, so a segment pair
   found in two scopes reports once in each — which is what the report wants */
function comparePair(bucket, a, b) {
  if (a.norm.length < EXACT_MIN || b.norm.length < EXACT_MIN) return;
  if (a.norm === b.norm) { addPair(bucket, a, b, 1); return; }
  if (a.norm.length < FUZZY_MIN || b.norm.length < FUZZY_MIN) return;
  if (Math.abs(a.norm.length - b.norm.length) / Math.max(a.norm.length, b.norm.length) > 0.45) return;
  if (!a.grams) a.grams = trigrams(a.norm);
  if (!b.grams) b.grams = trigrams(b.norm);
  const s = dice(a.grams, b.grams);
  if (s >= SIM_THRESHOLD) addPair(bucket, a, b, s);
}

function compareAll(bucket, segsA, segsB) {
  for (const a of segsA) for (const b of segsB) {
    if (a === b) continue;
    if (bucket === 'sameItem' && a.loc === b.loc) continue;
    comparePair(bucket, a, b);
  }
}

const itemSegs = new Map();
for (const item of STUDY_ITEMS) {
  const segs = segmentsOf(item).map((s) => ({ ...s, item }));
  itemSegs.set(item.id, segs);
}
const totalSegs = [...itemSegs.values()].reduce((n, s) => n + s.length, 0);
console.log(`— B. text: ${totalSegs} text segments walked —`);

/* within one item, across different fields */
for (const item of STUDY_ITEMS) {
  compareAll('sameItem', itemSegs.get(item.id), itemSegs.get(item.id));
}

/* within one unit, across items */
const byUnit = new Map();
for (const item of STUDY_ITEMS) {
  if (!byUnit.has(item.unit)) byUnit.set(item.unit, []);
  byUnit.get(item.unit).push(item);
}
for (const items of byUnit.values()) {
  const prepared = items.map((it) => itemSegs.get(it.id));
  for (let i = 0; i < prepared.length; i++)
    for (let j = i + 1; j < prepared.length; j++)
      compareAll('sameUnit', prepared[i], prepared[j]);
}

/* identical sentences across units (global net, exact normalised match) */
{
  const global = new Map();
  for (const item of STUDY_ITEMS) {
    for (const s of itemSegs.get(item.id)) {
      if (s.norm.length < EXACT_MIN) continue;
      if (!global.has(s.norm)) global.set(s.norm, []);
      global.get(s.norm).push(s);
    }
  }
  for (const [k, hits] of global) {
    const units = new Set(hits.map((h) => h.item.unit));
    if (units.size <= 1) continue;
    const [x, y] = [k, k].sort();
    const key = `${hash(x)}~${hash(y)}`;
    groups.crossUnit.set(key, {
      sim: 1,
      occ: hits.map((h) => `${h.item.id} · ${h.loc}`),
      sample: hits[0].text,
    });
  }
}

/* text groups -> flags.
 *
 * Gate semantics (deliberate): a one-line restatement of the key fact as the
 * teaching's takeaway is legitimate pedagogy, so NEAR-duplicates (sim
 * 0.8–0.99) are reported, not failed. What fails the gate is a VERBATIM
 * copy — normalised sim 1.00 — in any scope: within an item, across items of
 * a unit, or across units. A paraphrased copy-paste evades the gate by
 * design; the report keeps it visible on every run for the human to judge. */
const reportOnlyText = [];
for (const [scope, map] of Object.entries(groups)) {
  for (const [gkey, g] of map) {
    if (g.sim < 1.0) { reportOnlyText.push({ scope, ...g }); continue; }
    pushFlag('text', `text ${scope}:${gkey}`, { scope, ...g });
  }
}

/* systemic: dead data that never reaches a reader */
{
  const shadowedItems = STUDY_ITEMS.filter((it) =>
    (it.lesson && (it.lesson.keyFacts || []).length > 0) &&
    (it.lesson.keyFactsGroups || []).length > 0);
  if (shadowedItems.length) {
    pushFlag('shadowed-keyfacts', 'shadowed-keyfacts', {
      items: shadowedItems.map((it) => `${it.unit} · ${it.id}`),
    });
  }
  const prereqItems = STUDY_ITEMS.filter((it) => (it.lesson && it.lesson.prerequisites || []).length > 0);
  if (prereqItems.length) {
    pushFlag('dead-prerequisites', 'dead-prerequisites', {
      items: prereqItems.map((it) => `${it.unit} · ${it.id}`),
    });
  }
}

/* ------------------------------------------------------------------ *
 * report                                                             */
/* ------------------------------------------------------------------ */

const reportPathIdx = process.argv.indexOf('--report');
const reportPath = reportPathIdx >= 0 ? process.argv[reportPathIdx + 1] : null;
const showUses = process.argv.includes('--uses');

if (reportPath) {
  const lines = [];
  lines.push('# Duplication audit — generated by `node work/dup-audit.mjs --report`');
  lines.push('');
  lines.push(`Items: ${STUDY_ITEMS.length}, units: ${byUnit.size}, distinct visual ids in use: ${visualUses.size}, text segments walked: ${totalSegs}.`);
  lines.push('');
  lines.push(`Flags: ${flags.length} (allowed as deliberate: ${allowReasons.length}).`);
  lines.push('');

  lines.push('## A. Image reuse — flags');
  lines.push('');
  const visFlags = flags.filter((f) => f.kind === 'visual' || f.kind === 'figure-intro' || f.kind === 'figure-key');
  const sysFlags = flags.filter((f) => f.kind === 'shadowed-keyfacts' || f.kind === 'dead-prerequisites');
  if (!visFlags.length) lines.push('_none_');
  for (const f of visFlags) {
    if (f.kind === 'visual') {
      lines.push(`### \`${f.key}\``);
      lines.push('');
      lines.push(`**${f.detail.why}.**`);
      lines.push('');
      lines.push('| unit | subject | item | focus |');
      lines.push('| --- | --- | --- | --- |');
      for (const u of f.detail.uses) {
        lines.push(`| ${u.unit} | ${u.subject} | ${u.itemId} | ${u.focuses.map((x) => excerpt(x.join('; '), 90)).join(' <br> ') || ''} |`);
      }
    } else {
      lines.push(`### ${f.kind}: \`${f.key}\``);
      if (f.detail.excerpt) lines.push(`Shared text: “${excerpt(f.detail.excerpt, 220)}”`);
      else lines.push('Identical set of key callout names across these figures.');
    }
    lines.push('');
  }

  lines.push('## Systemic — dead data that never reaches a reader');
  lines.push('');
  if (!sysFlags.length) lines.push('_none_');
  for (const f of sysFlags) {
    if (f.kind === 'shadowed-keyfacts') {
      lines.push(`### lesson.keyFacts shadowed by lesson.keyFactsGroups (${f.detail.items.length} items)`);
      lines.push('');
      lines.push('`factsHTML()` in `layout-figures.js` renders the grouped form INSTEAD of the flat list, so the flat `keyFacts` on these items reaches no reader — duplicated data, invisible duplication.');
    } else {
      lines.push(`### lesson.prerequisites written but rendered nowhere (${f.detail.items.length} items)`);
      lines.push('');
      lines.push('No consumer for `lesson.prerequisites` exists anywhere in `outputs/study/` — the field is dead weight, and its values are item-id cross-references in any case.');
    }
    lines.push('');
    for (const it of f.detail.items) lines.push(`- ${it}`);
    lines.push('');
  }

  lines.push('## A. Image reuse — full use table');
  lines.push('');
  lines.push('| visual id | uses | units | items (unit · id) |');
  lines.push('| --- | --- | --- | --- |');
  for (const [key, uses] of [...visualUses.entries()].sort((x, y) => y[1].length - x[1].length)) {
    const units = new Set(uses.map((u) => u.unit));
    lines.push(`| ${key} | ${uses.length} | ${units.size} | ${uses.map((u) => `${u.unit} · ${u.itemId}`).join(', ')} |`);
  }
  lines.push('');

  for (const [scope, title] of [
    ['sameItem', 'B. Text duplication — within one item, across fields'],
    ['sameUnit', 'B. Text duplication — within one unit, across items'],
    ['crossUnit', 'B. Text duplication — identical sentences across units'],
  ]) {
    lines.push(`## ${title}`);
    lines.push('');
    const list = [...groups[scope].values()].sort((a, b) => b.sim - a.sim);
    if (!list.length) lines.push('_none_');
    /* rollup first: the same few patterns or the same boilerplate sentence
       produce most flags, and the rollup is what makes them readable */
    if (scope === 'sameItem') {
      const fam = new Map();
      for (const g of list) {
        const pat = [...g.occ].map((o) => o.split(' · ')[1].replace(/\[\d+\]/g, '[]')).sort().join('  ↔  ');
        fam.set(pat, (fam.get(pat) || 0) + 1);
      }
      lines.push('**Families** (field pattern → how many distinct repeats):');
      lines.push('');
      for (const [pat, n] of [...fam.entries()].sort((a, b) => b[1] - a[1])) lines.push(`- ${n} × ${pat}`);
      lines.push('');
    } else if (scope === 'sameUnit') {
      const fam = new Map();
      for (const g of list) fam.set(excerpt(g.sample, 90), (fam.get(excerpt(g.sample, 90)) || 0) + 1);
      lines.push('**Families** (repeated sentence → how many distinct repeats of it):');
      lines.push('');
      for (const [pat, n] of [...fam.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40)) lines.push(`- ${n} × “${pat}”`);
      lines.push('');
    }
    lines.push('_Verbatim copies (sim 1.00) fail the gate; near-duplicates (0.8–0.99) are informational — a one-line restatement of a key fact as the teaching takeaway is legitimate pedagogy._');
    lines.push('');
    for (const g of list) {
      const tag = g.sim >= 1.0 ? 'verbatim' : 'near';
      lines.push(`- **sim ${g.sim.toFixed(2)} · ${tag}** — ${g.occ.length} occurrences:`);
      for (const o of g.occ) lines.push(`  - ${o}`);
      lines.push(`  > ${excerpt(g.sample, 220)}`);
    }
    lines.push('');
  }
  writeFileSync(reportPath, lines.join('\n') + '\n');
}

/* ------------------------------------------------------------------ *
 * gate                                                               */
/* ------------------------------------------------------------------ */

console.log(`— flags: ${flags.length} (${allowReasons.length} allowed as deliberate) —`);
const byKind = {};
for (const f of flags) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
for (const [k, n] of Object.entries(byKind)) console.log(`  ${k}: ${n}`);
console.log(`  (report-only near-duplicates, not gate-failing: ${reportOnlyText.length})`);
if (showUses) {
  for (const [key, uses] of [...visualUses.entries()].sort((x, y) => y[1].length - x[1].length)) {
    if (uses.length > 1) console.log(`  ${key} -> ${uses.map((u) => `${u.unit}·${u.itemId}`).join(', ')}`);
  }
}
if (reportPath) console.log(`  report: ${reportPath}`);
if (flags.length) {
  console.log('GATE FAIL — repeats above are neither fixed nor listed in ALLOWED with a reason.');
  process.exit(1);
}
console.log('GATE PASS');
