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

/* ------------------------------------------------------------------ *
 * Where a structure is
 *
 * The grouping pass needs a position for every structure: a name says what
 * something is, but rarely where, and "Ligaments of the foot" cannot be
 * derived from "Dorsal cuboideonavicular ligament" by reading it.
 *
 * All seven layers are exported in ONE body frame (y 0.00-1.70, x +/-0.33),
 * so boxes are directly comparable across layers -- that is the same fact
 * loadExtraModel relies on when it applies the skeleton's transform verbatim
 * to every other layer.
 *
 * Node transforms are composed down the hierarchy by hand rather than trusted
 * flat: 276 of the skeleton's 277 nodes carry a TRS, several with a negative
 * scale (the mirrored side), and three nodes have children.
 * ------------------------------------------------------------------ */

function gltfJson(rel) {
  const buf = readFileSync(join(OUTPUTS, rel));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`not a glb: ${rel}`);
  return JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString('utf8'));
}

/* glTF matrices are column-major; a node's TRS composes as T * R * S. */
function localMatrix(n) {
  if (n.matrix) return n.matrix.slice();
  const t = n.translation || [0, 0, 0], q = n.rotation || [0, 0, 0, 1], s = n.scale || [1, 1, 1];
  const [x, y, z, w] = q;
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;
  return [(1 - (yy + zz)) * s[0], (xy + wz) * s[0], (xz - wy) * s[0], 0,
    (xy - wz) * s[1], (1 - (xx + zz)) * s[1], (yz + wx) * s[1], 0,
    (xz + wy) * s[2], (yz - wx) * s[2], (1 - (xx + yy)) * s[2], 0,
    t[0], t[1], t[2], 1];
}
function compose(local, parent) {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let v = 0; for (let k = 0; k < 4; k++) v += parent[k * 4 + r] * local[c * 4 + k];
    o[c * 4 + r] = v;
  }
  return o;
}
const applyM = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]];

/* raw node name -> [min, max] in body coordinates. */
export function boxesIn(rel) {
  const g = gltfJson(rel);
  const world = new Map();
  const roots = (g.scenes && g.scenes[0] && g.scenes[0].nodes) || (g.nodes || []).map((_, i) => i);
  const walk = (i, pm) => {
    const n = (g.nodes || [])[i]; if (!n) return;
    const m = compose(localMatrix(n), pm);
    world.set(i, m);
    (n.children || []).forEach((c) => walk(c, m));
  };
  roots.forEach((r) => walk(r, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));

  const out = new Map();
  (g.nodes || []).forEach((n, i) => {
    if (n.mesh == null || !n.name) return;
    const m = world.get(i); if (!m) return;
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (const p of (g.meshes[n.mesh] || {}).primitives || []) {
      const a = g.accessors[p.attributes && p.attributes.POSITION];
      if (!a || !a.min || !a.max) continue;
      /* the accessor box is axis-aligned in LOCAL space, so all eight corners
         are rotated rather than the two extremes -- a rotated node otherwise
         reports a box that does not contain it */
      for (let b = 0; b < 8; b++) {
        const w = applyM(m, [b & 1 ? a.max[0] : a.min[0], b & 2 ? a.max[1] : a.min[1], b & 4 ? a.max[2] : a.min[2]]);
        for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], w[k]); mx[k] = Math.max(mx[k], w[k]); }
      }
    }
    if (!Number.isFinite(mn[0])) return;
    out.set(n.name, [mn, mx]);
  });
  return out;
}

/*
 * Union the per-mesh boxes onto the collapsed structure rows, in place.
 *
 * `box` is every mesh of the structure; `sideBox` is ONE side of a paired
 * structure. The distinction matters: the left and right boxes are mirrors, so
 * their union straddles the midline and its centre sits at x = 0 -- which puts
 * both femurs, both scapulae and every paired vessel on the median plane and
 * makes a proximity test meaningless. Zoning reads sideBox.
 */
export function measureStructures(rows) {
  const byKey = new Map(rows.map((r) => [r.layer + ' ' + r.name.toLowerCase(), r]));
  const grow = (b, mn, mx) => {
    if (!b) return [mn.slice(), mx.slice()];
    for (let k = 0; k < 3; k++) { b[0][k] = Math.min(b[0][k], mn[k]); b[1][k] = Math.max(b[1][k], mx[k]); }
    return b;
  };
  for (const [layer, file] of LAYERS) {
    for (const [raw, [mn, mx]] of boxesIn(file)) {
      const { base, side } = split(raw);
      const name = display(base);
      if (!name || JUNK.test(name)) continue;
      const r = byKey.get(layer + ' ' + name.toLowerCase());
      if (!r) continue;
      r.box = grow(r.box, mn, mx);
      (r.perSide || (r.perSide = {}));
      r.perSide[side] = grow(r.perSide[side], mn, mx);
    }
  }
  for (const r of rows) {
    if (!r.perSide) continue;
    r.sideBox = r.perSide.r || r.perSide.l || r.perSide[''] || r.box;
  }
  return rows;
}
