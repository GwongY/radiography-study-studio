/*
 * Does every mesh in a split layer land in a system?
 *
 * outputs/systems.js splits two of the seven GLB layers into the systems the
 * course names: the circulatory file into Arterial / Venous / Heart, the organ
 * file into Respiratory / Digestive / Urogenital / Endocrine. That is a
 * classifier over mesh names, and this app has already learned twice what an
 * unchecked name classifier does — sixty toe phalanges filed as upper limb,
 * the carpals filed under the cranium. Both were found by a probe, not by
 * looking, because a misfiled mesh does not throw: it just shows up on the
 * wrong chip, or on none.
 *
 * So, against the real GLB names:
 *
 *   placed     every name in a split layer gets a system, except the five whose
 *              names say nothing — Blender's "Mesh"/"Circle", and three in the
 *              circulatory GLB whose names arrived as literal question marks.
 *              Those five are printed rather than failed, and the print is what
 *              keeps them countable: they carry real geometry and they show on
 *              every chip of their layer, so a sixth appearing silently would
 *              be a structure on screen that no chip can turn off. Anything
 *              else unplaced IS a failure — systems.js has no catch-all.
 *   populated  every chip has meshes. A chip that shows nothing is a control
 *              that does nothing, which is the defect this whole feature set
 *              was written to stop shipping.
 *   agreement  the systems agree with physiology.js's flow classes wherever
 *              the two overlap. They are separate classifiers written for
 *              separate purposes — colour vs. chip — and separate classifiers
 *              drift. Every mesh the flow calls venous must be in Venous;
 *              every airway in Respiratory; every gut in Digestive; every
 *              urinary in Urogenital; every chamber in Heart. Where they
 *              deliberately disagree (the flow's 'gland' spans the salivary
 *              glands AND the thyroid; its 'organ' catch-all holds the
 *              genitalia) the disagreement is named below rather than tested.
 *
 * Needs no drive, no browser: the GLBs are committed and both modules are pure.
 * Run: node work/system-check.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SYSTEMS, UNREADABLE, isSplit, systemsIn, systemsOf } from '../outputs/systems.js';
import { classify } from '../outputs/physiology.js';
import { STRUCTURE_MODELS } from '../outputs/study-data.js';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');

/* The GLB's own node and mesh names, read from the JSON chunk. Same source the
   loader sees, so a name that classifies here classifies in the browser. */
function namesIn(rel) {
  const buf = readFileSync(join(OUT, rel));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`${rel} is not a glb`);
  const json = JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString('utf8'));
  const names = new Set();
  for (const n of json.nodes || []) if (n.name) names.add(n.name);
  for (const m of json.meshes || []) if (m.name) names.add(m.name);
  return [...names].sort();
}

let fails = 0;
const fail = (m) => { console.log('  !! ' + m); fails++; };

/* ------------------------------------------------------------------ *
 * Every chip names a layer this app actually ships
 * ------------------------------------------------------------------ */
console.log('— every chip draws from a real GLB layer —');
for (const s of SYSTEMS) {
  if (!STRUCTURE_MODELS[s.layer]) fail(`chip "${s.key}" names layer "${s.layer}", which is not in STRUCTURE_MODELS`);
}
console.log(`  ${SYSTEMS.length} chips over ${new Set(SYSTEMS.map((s) => s.layer)).size} layers\n`);

/* ------------------------------------------------------------------ *
 * Every mesh of a split layer is placed, and every chip is populated
 * ------------------------------------------------------------------ */
const counts = {};
const flowSeen = {};
for (const layer of Object.keys(STRUCTURE_MODELS)) {
  if (!isSplit(layer)) continue;
  const names = namesIn(STRUCTURE_MODELS[layer].file.replace(/^\.\//, ''));
  console.log(`— ${layer}: ${names.length} names in ${STRUCTURE_MODELS[layer].file} —`);
  const unplaced = [];
  const unreadable = [];
  for (const raw of names) {
    const sys = systemsOf(layer, raw);
    if (!sys.length) {
      if (UNREADABLE.test(String(raw).replace(/[._]/g, ' ').toLowerCase())) unreadable.push(raw);
      else unplaced.push(raw);
      continue;
    }
    for (const k of sys) counts[k] = (counts[k] || 0) + 1;
    const flow = classify(layer, raw);
    (flowSeen[flow] = flowSeen[flow] || []).push({ raw, sys });
  }
  for (const raw of unplaced) fail(`${layer}: "${raw}" is placed in no system`);
  /* Not a failure — see UNREADABLE in systems.js. Printed so the count is in
     the baseline: these meshes show on every chip of their layer, and a new
     one arriving unnoticed would quietly do the same. */
  for (const raw of unreadable) console.log(`  -  ${JSON.stringify(raw)} has no readable name; it follows the whole ${layer} layer`);
  for (const s of systemsIn(layer)) {
    if (!counts[s.key]) fail(`chip "${s.key}" has no meshes — it would show an empty layer`);
    else console.log(`  ok ${s.label.padEnd(13)} ${String(counts[s.key]).padStart(4)} meshes`);
  }
  console.log('');
}

/* ------------------------------------------------------------------ *
 * The two classifiers agree where they mean the same thing
 * ------------------------------------------------------------------ */
/*
 * Left deliberately untested, because the two are not claiming the same thing:
 *   gland   spans the salivary glands (Digestive here) and the thyroid,
 *           parathyroid and suprarenal (Endocrine here). The flow class asks
 *           what a structure secretes; the chip asks which system it serves.
 *   organ   is the flow's fallback and holds the genitalia, the mouth and the
 *           peritoneal folds, all of which this file places properly.
 */
const MUST = {
  venous: 'venous', pulmVein: 'venous',
  arterial: 'arterial', pulmArtery: 'arterial',
  heart: 'heart', heartAtrium: 'heart', heartVentricle: 'heart',
  airway: 'respiratory', gut: 'digestive', urinary: 'urogenital',
};
console.log('— the systems agree with the flow classes wherever both speak —');
for (const [flow, want] of Object.entries(MUST)) {
  const rows = flowSeen[flow] || [];
  if (!rows.length) { console.log(`  -  ${flow.padEnd(15)} no meshes carry this class`); continue; }
  const bad = rows.filter((r) => !r.sys.includes(want));
  if (bad.length) {
    for (const b of bad.slice(0, 6)) fail(`flow class "${flow}" but system ${JSON.stringify(b.sys)}: ${b.raw}`);
    if (bad.length > 6) fail(`...and ${bad.length - 6} more disagreements on "${flow}"`);
  } else {
    console.log(`  ok ${flow.padEnd(15)} ${String(rows.length).padStart(4)} meshes, all in ${want}`);
  }
}

console.log(fails ? `\n${fails} PROBLEM(S)` : '\nEVERY MESH IS IN A SYSTEM');
process.exit(fails ? 1 : 0);
