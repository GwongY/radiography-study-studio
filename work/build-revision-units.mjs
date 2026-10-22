/*
 * Revise box -> viewer unit, decided once, offline, and committed.
 *
 *   node work/build-revision-units.mjs           # report: matched, how, and every row with no unit
 *   node work/build-revision-units.mjs --write   # write outputs/revision/viewer-units.js
 *
 * "Show in the viewer" in Revise used to find its structure by running the
 * viewer's name search at tap time and taking the first title that started
 * with the box's name. The viewer had no way back at all. Both directions are
 * now a lookup in one table: a viewer-eligible box (rules.js viewerEligible)
 * -> the mesh-index study unit a tap on that structure selects.
 *
 * Matching is exact and deterministic, never fuzzy. In order:
 *   1. the box's name is a unit's name (punctuation and case ignored);
 *   2. one of its direct synonyms (synonyms.js SYNONYMS, never the wider
 *      expandQuery, which pulls in composites and containing phrases) is a
 *      unit's name ("Tricuspid valve" -> "Right atrioventricular valve");
 *   3. the name is a mesh-index row's name and that row's unit shares a word
 *      with it ("External intercostal muscles" -> "Intercostal muscles", but
 *      not "Tendon" -> "Soft tissues of the leg");
 *   4. one unit's name is the box's name plus more words, where the row's
 *      kind says which layer ("Lunate" bone -> "Lunate bone", not "Lunate
 *      sulcus"), or plus only a parenthesis ("Vagus nerve" -> "Vagus nerve (X)").
 * Where a rule finds several units, the one whose name is the box's name
 * letter for letter wins, else the one in the layer the row's kind belongs to
 * (a bone row -> the skeleton, a muscle row -> the muscle layer: "Lunate" is
 * the Lunate bone, not the Lunate sulcus). Still several: ambiguous, left out. A row
 * with no unit is REPORTED, not guessed; topics such as "Joints" or a cell
 * organelle have no single structure in the model and are expected here.
 *
 * work/revision-check.mjs re-derives this table and fails if the committed one
 * has drifted (a new leaf row, a rebuilt mesh index, a new synonym).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { REVISION } from '../outputs/revision/registry.js';
import { viewerEligible } from '../outputs/revision/rules.js';
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { SYNONYMS } from '../outputs/synonyms.js';

const OUT = fileURLToPath(new URL('../outputs/revision/viewer-units.js', import.meta.url));
/* Boxes whose name matches a unit that is a different structure. Each says why. */
const NOT_THE_SAME = {
  ABCT2326: { p5_renal_medulla: 'the renal medulla (under Kidneys), not the medulla oblongata' },
};
/* A box that names a set of structures (a row "Splenius" is two muscles; "True ribs" is ribs 1-7) opens the whole set.
   Each entry lists unit labels exactly, case ignored; every label must exist, the builder throws otherwise. */
const ORD = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];
const FINGERS = ['first', 'second', 'third', 'fourth', 'fifth'];
const phal = (side) => ['Proximal', 'Middle', 'Distal'].flatMap((p) => FINGERS.filter((f) => !(p === 'Middle' && f === 'first')).map((f) => `${p} phalanx of ${f} finger of ${side}`));
const SETS = {
  HSS2011: {
    w2_cuneiforms: ['Medial cuneiform bone', 'Intermediate cuneiform bone', 'Lateral cuneiform bone'],
    w2_metatarsals: ORD.slice(0, 5).map((o) => `${o} metatarsal bone`),
    w3_metacarpals: ORD.slice(0, 5).map((o) => `${o} metacarpal bone`),
    w2_phalanges: phal('foot'),
    w3_phalanges: phal('hand'),
    w3_sternum: ['Manubrium of sternum', 'Body of sternum', 'Xiphoid process'],
    w4_trueribs: ORD.slice(0, 7).map((o) => `${o} rib`),
    w4_falseribs: ORD.slice(7, 10).map((o) => `${o} rib`),
    w4_floatribs: ORD.slice(10, 12).map((o) => `${o} rib`),
    w4_transpin: ['Semispinalis cervicis', 'Semispinalis thoracis muscle', 'Multifidus', 'Rotatores'],
    w4_backextr: ['Trapezius muscle', 'Latissimus dorsi muscle', 'Levator scapulae', 'Rhomboid major muscle', 'Rhomboid minor muscle'],
    w2_medthigh: ['Adductor longus', 'Adductor brevis', 'Adductor magnus'],
    w4_splcap: ['Splenius capitis muscle', 'Splenius cervicis'],
    w2_iliopsoas: ['Psoas major', 'Iliacus muscle'],
    w3_lumbricals: ['Lumbricals of hand'],
    w3_dorsalinteross: ['Dorsal interossei of hand'],
  },
};
/* The layer each structure row's kind lives in. */
const KIND_LAYERS = { bone: ['skeleton'], muscle: ['muscle'], joint: ['joint'], nerve: ['nervous'] };
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function indexBy(list, key, val) {
  const m = new Map();
  for (const x of list) { const k = norm(key(x)); if (!m.has(k)) m.set(k, new Set()); m.get(k).add(val(x)); }
  return m;
}

/* The row index, keeping only units that share a word with the box's name. */
function byRowShared(byRow, sharesWord) {
  return { get: (t) => { const s = byRow.get(t); if (!s) return s; const k = new Set([...s].filter(sharesWord)); return k.size ? k : undefined; } };
}

/** { [subject]: { units: { nodeId: unitId }, how: { nodeId: rule }, missing: [nodeId], ambiguous: [nodeId] } } */
export function deriveViewerUnits() {
  const byUnit = indexBy(UNITS, (u) => u.label, (u) => u.id);
  const byRow = indexBy(MESH_INDEX, (r) => r.name, (r) => r.unitId);
  const unitNames = UNITS.map((u) => [norm(u.label), u.id]);
  const out = {};
  for (const [sub, S] of Object.entries(REVISION)) {
    const res = { units: {}, how: {}, missing: [], ambiguous: [] };
    const nodeById = new Map(S.data.NODES.map((x) => [x.id, x]));
    for (const n of S.data.NODES) {
      const set = SETS[sub] && SETS[sub][n.id];
      if (!viewerEligible(n) && !set) continue;
      if (set) {
        const ids = set.map((lab) => { const u = UNITS.find((x) => x.label.toLowerCase() === lab.toLowerCase()); if (!u) throw new Error(`viewer set ${n.id}: no unit called ${lab}`); return u.id; });
        res.units[n.id] = ids.length === 1 ? ids[0] : ids; res.how[n.id] = 'set'; continue;
      }
      if (NOT_THE_SAME[sub] && NOT_THE_SAME[sub][n.id]) { res.missing.push(n.id); continue; }
      const own = norm(n.l);
      const syn = [...new Set([...(SYNONYMS.get(n.l.toLowerCase()) || [])].map(norm))].filter((t) => t && t !== own);
      const words = new Set(own.split(' ').map((w) => w.replace(/s$/, '')));
      const sharesWord = (id) => norm(UNITS[id].label).split(' ').some((w) => words.has(w.replace(/s$/, '')));
      let unit = null, how = null, amb = false;
      const layers = KIND_LAYERS[n.leaf] || null;
      /* one unit out of several, by the exact label, then by the row's layer */
      const narrow = (ids) => {
        if (ids.length === 1) return ids[0];
        const exact = ids.filter((id) => UNITS[id].label.toLowerCase() === n.l.toLowerCase());
        if (exact.length === 1) return exact[0];
        const inLayer = layers ? ids.filter((id) => layers.includes(UNITS[id].layer)) : [];
        return inLayer.length === 1 ? inLayer[0] : null;
      };
      const tryMap = (map, terms, rule) => {
        for (const t of terms) {
          const s = map.get(t);
          if (!s) continue;
          const one = narrow([...s]);
          if (one != null) { unit = one; how = rule; return true; }
          amb = true;
        }
        return false;
      };
      if (!tryMap(byUnit, [own], 'name')
        && !tryMap(byUnit, syn, 'synonym')
        && !tryMap(byRowShared(byRow, sharesWord), [own], 'row')) {
        const c = [...new Set(unitNames.filter(([k, id]) => k.startsWith(`${own} `)
          && ((layers && layers.includes(UNITS[id].layer)) || /^\([^)]*\)\*?$/.test(UNITS[id].label.slice(n.l.length).trim())))
          .map(([, id]) => id))];
        const one = c.length ? narrow(c) : null;
        if (one != null) { unit = one; how = 'prefix'; } else if (c.length > 1) amb = true;
      }
      if (unit != null) { res.units[n.id] = unit; res.how[n.id] = how; } else (amb ? res.ambiguous : res.missing).push(n.id);
    }
    /* A heading row that groups structures (Quadriceps, Transversospinalis, Anterior compartment) opens all of its
       members that have a unit; it is not a unit of its own, so the viewer's way back skips it (FROM_MEMBERS). */
    res.members = [];
    const collect = (spec) => [...(res.units[spec.id] != null ? [].concat(res.units[spec.id]) : []), ...(spec.kids || []).flatMap(collect)];
    (function walk(spec) {
      (spec.kids || []).forEach(walk);
      const n = nodeById.get(spec.id);
      if (!n || !n.leaf || n.leaf !== 'group' || res.units[n.id] != null) return;
      const ids = [...new Set((spec.kids || []).flatMap(collect))];
      if (ids.length && ids.length <= 60) { res.units[n.id] = ids.length === 1 ? ids[0] : ids; res.how[n.id] = 'members'; res.members.push(n.id); }
    })(S.data.TREE);
    out[sub] = res;
  }
  return out;
}

export function viewerUnitsSource(derived = deriveViewerUnits()) {
  const table = Object.fromEntries(Object.entries(derived).map(([sub, r]) => [sub, r.units]));
  return `/*
 * GENERATED by work/build-revision-units.mjs --write — do not edit.
 *
 * Revise box id -> the mesh-index study unit (outputs/mesh-index.js UNITS id)
 * that a tap on the same structure selects in the viewer. Used both ways:
 * "Show in the viewer" in Revise, and "In Revise" on the viewer's selection card.
 * Rows with no unit are listed by the generator's report, not guessed.
 */
export const VIEWER_UNITS = ${JSON.stringify(table)};

/** Boxes whose units are only their members' (a heading row): they open the viewer, but are not what a unit "is" in Revise. */
export const FROM_MEMBERS = new Set(${JSON.stringify(Object.entries(derived).flatMap(([sub, r]) => r.members.map((id) => `${sub}:${id}`)))});

/** unit id -> [[subject, box id], ...], for the viewer's way back. */
export const UNIT_BOXES = (() => {
  const m = new Map();
  for (const [sub, t] of Object.entries(VIEWER_UNITS)) for (const [id, us] of Object.entries(t)) for (const u of [].concat(us)) {
    if (FROM_MEMBERS.has(sub + ":" + id)) continue;
    if (!m.has(u)) m.set(u, []);
    m.get(u).push([sub, id]);
  }
  return m;
})();
`;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const d = deriveViewerUnits();
  for (const [sub, r] of Object.entries(d)) {
    const how = {};
    Object.values(r.how).forEach((h) => { how[h] = (how[h] || 0) + 1; });
    const label = (id) => REVISION[sub].data.NODES.find((n) => n.id === id).l;
    console.log(`${sub}: ${Object.keys(r.units).length} boxes linked (${Object.entries(how).map(([k, v]) => `${v} by ${k}`).join(', ')}); ${r.ambiguous.length} ambiguous, ${r.missing.length} with no unit`);
    if (process.argv.includes('--verbose')) {
      if (r.ambiguous.length) console.log(`  ambiguous: ${r.ambiguous.map(label).join('; ')}`);
      console.log(`  no unit: ${r.missing.map(label).join('; ')}`);
    }
  }
  if (process.argv.includes('--write')) { writeFileSync(OUT, viewerUnitsSource(d)); console.log('wrote outputs/revision/viewer-units.js'); }
}
