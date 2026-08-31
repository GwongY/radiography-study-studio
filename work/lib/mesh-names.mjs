/*
 * The named structures in the seven GLB layers.
 *
 * Shared by build-mesh-index.mjs (which turns them into outputs/mesh-index.js)
 * and build-course-terms.mjs (which asks the course sources which of them the
 * student is actually expected to know by name). Both need the same list, and
 * two copies of this drift.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const OUTPUTS = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'outputs');

/* layer key -> GLB, matching STRUCTURE_MODELS in study-data.js */
export const LAYERS = [
  ['skeleton', 'assets/z-anatomy-skeleton.glb'],
  ['organs', 'assets/ic-organlar.glb'],
  ['circulatory', 'assets/dolasim.glb'],
  ['nervous', 'assets/sinir.glb'],
  ['muscle', 'assets/kas.glb'],
  ['joint', 'assets/eklem.glb'],
  ['lymphatic', 'assets/lenf.glb'],
];

/* Names that are modelling artefacts rather than anatomy. */
export const JUNK = /^(mesh|circle|cube|plane|sphere|cylinder|icosphere|empty|armature|scene|object|curve|text|torus|cone|grid|node|group|root)\b/i;

/*
 * A node whose geometry has zero extent on any axis is a construction
 * artefact, not a structure: it cannot be seen, picked or framed. There is
 * exactly one in the whole set -- `Pharynx.j` in the organs layer, extent
 * [0.038, 0.000007, 0.000000] -- and because it sorted as the plainest
 * "Pharynx" it became THE search result for the pharynx, so clicking it framed
 * an invisible sliver instead of the three real pharyngeal parts.
 *
 * Bounds come from the POSITION accessor's min/max, which glTF requires, so no
 * mesh data has to be decoded.
 */
const DEGENERATE = 1e-5;      /* 10 microns: nothing anatomical is that thin */

export function namesIn(rel) {
  const buf = readFileSync(join(OUTPUTS, rel));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`not a glb: ${rel}`);
  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

  const flat = new Set();
  for (const n of json.nodes || []) {
    if (n.mesh == null || !n.name) continue;
    const prims = (json.meshes[n.mesh] || {}).primitives || [];
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (const p of prims) {
      const a = json.accessors[p.attributes && p.attributes.POSITION];
      if (!a || !a.min || !a.max) continue;
      for (let i = 0; i < 3; i++) { mn[i] = Math.min(mn[i], a.min[i]); mx[i] = Math.max(mx[i], a.max[i]); }
    }
    if (!Number.isFinite(mx[0])) continue;
    if ([0, 1, 2].some((i) => mx[i] - mn[i] < DEGENERATE)) flat.add(n.name);
  }

  const out = new Set();
  for (const n of json.nodes || []) if (n.name && !flat.has(n.name)) out.add(n.name);
  for (const m of json.meshes || []) if (m.name && !flat.has(m.name)) out.add(m.name);
  return { names: [...out], dropped: [...flat] };
}

/*
 * Strip the suffixes that make one structure look like four.
 *
 * Order matters: .001 can sit after the side letter ("Ductus deferens.r.001"),
 * so numeric duplicates come off first, then the side, then the stray `.j`.
 * Returns { base, side } where side is 'l' | 'r' | ''.
 */
export function split(name) {
  let s = name.trim();
  s = s.replace(/\.\d{3}$/, '');            /* Blender duplicate */
  let side = '';
  const m = s.match(/\.([lr])$/i);
  if (m) { side = m[1].toLowerCase(); s = s.slice(0, -2); }
  s = s.replace(/\.[jt]$/i, '');            /* Z-Anatomy's own markers: `Pharynx.j`,
                                               `Coccygeus muscle.t` beside .l/.r */
  s = s.replace(/\.\d{3}$/, '');
  return { base: s.trim(), side };
}

/* "(Accessory parotid gland)" reads as a parenthetical in the source; the
   brackets are noise once it is a search result. */
export function display(base) {
  let s = base.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^\(.*\)$/.test(s)) s = s.slice(1, -1).trim();
  return s;
}

/*
 * One record per structure per layer, collapsed across side letters and
 * duplicate suffixes. `mesh` keeps one real mesh name so the viewer can still
 * resolve it -- the plainest available, since that is the one most likely to
 * exist on its own.
 */
export function collectStructures() {
  const byKey = new Map();
  let rawTotal = 0;
  const dropped = [];

  for (const [layer, file] of LAYERS) {
    const { names, dropped: flat } = namesIn(file);
    flat.forEach((n) => dropped.push(`${layer}: ${n}`));
    for (const raw of names) {
      rawTotal++;
      const { base, side } = split(raw);
      const name = display(base);
      if (!name || JUNK.test(name)) continue;
      if (!/[a-z]/i.test(name)) continue;
      const key = layer + ' ' + name.toLowerCase();
      let rec = byKey.get(key);
      if (!rec) { rec = { name, layer, mesh: raw, sides: new Set() }; byKey.set(key, rec); }
      if (side) rec.sides.add(side);
      const cost = (a) => (a.match(/\.\d{3}$/) ? 2 : 0) + (/\.[lr]$/i.test(a) ? 1 : 0);
      if (cost(raw) < cost(rec.mesh)) rec.mesh = raw;
    }
  }

  const rows = [...byKey.values()].sort((a, b) =>
    a.layer.localeCompare(b.layer) || a.name.localeCompare(b.name));
  return { rows, rawTotal, dropped };
}
