/*
 * Per-mesh axis-aligned bounding boxes straight out of a GLB, without three.js.
 *
 * Why this exists: the cavity/region overlays are supposed to be derived from
 * the real anatomy rather than from guessed constants, and to design that
 * derivation you need to see the actual numbers. glTF requires accessor
 * min/max on POSITION, so a bbox per primitive is available from the JSON
 * chunk alone -- no need to decode a single vertex buffer.
 *
 * Usage:
 *   node work/glb-bounds.mjs assets/z-anatomy-skeleton.glb            # all
 *   node work/glb-bounds.mjs assets/z-anatomy-skeleton.glb rib        # filter
 *   node work/glb-bounds.mjs assets/z-anatomy-skeleton.glb --json     # machine-readable
 *
 * Output is in the GLB's own coordinate space. Axis meaning is reported in the
 * header so the caller can see which way is up before trusting anything.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');

/* ---- minimal mat4 (column-major, same convention as glTF) ---- */
const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function mul(a, b) {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  }
  return o;
}
function fromTRS(t, r, s) {
  const [x, y, z, w] = r, [sx, sy, sz] = s;
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2;
  const yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    t[0], t[1], t[2], 1,
  ];
}
const apply = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
];

function nodeMatrix(n) {
  if (n.matrix) return n.matrix.slice();
  return fromTRS(n.translation || [0, 0, 0], n.rotation || [0, 0, 0, 1], n.scale || [1, 1, 1]);
}

export function glbBounds(relPath) {
  const buf = readFileSync(join(root, relPath));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a glb: ' + relPath);
  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

  const out = new Map();          /* name -> {min:[x,y,z], max:[x,y,z]} */
  const scene = json.scenes?.[json.scene ?? 0];
  const roots = scene?.nodes ?? json.nodes.map((_, i) => i);

  const visit = (idx, parent) => {
    const n = json.nodes[idx];
    if (!n) return;
    const world = mul(parent, nodeMatrix(n));
    if (n.mesh != null) {
      const mesh = json.meshes[n.mesh];
      const name = n.name || mesh?.name || `mesh${n.mesh}`;
      for (const prim of mesh?.primitives || []) {
        const acc = json.accessors?.[prim.attributes?.POSITION];
        if (!acc?.min || !acc?.max) continue;
        /* A quantized file stores POSITION as a normalized integer, so min/max
           are raw ints and the metres come back by dividing by the type's max
           before the node transform. Non-normalized divides by 1, as before. */
        const NORM = { 5120: 127, 5121: 255, 5122: 32767, 5123: 65535 };
        const d = (acc.normalized && NORM[acc.componentType]) || 1;
        const [ax, ay, az] = acc.min.map((v) => v / d), [bx, by, bz] = acc.max.map((v) => v / d);
        let e = out.get(name);
        if (!e) out.set(name, e = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] });
        /* a rotated node means the local bbox corners must all be transformed */
        for (let i = 0; i < 8; i++) {
          const p = apply(world, [i & 1 ? bx : ax, i & 2 ? by : ay, i & 4 ? bz : az]);
          for (let k = 0; k < 3; k++) { if (p[k] < e.min[k]) e.min[k] = p[k]; if (p[k] > e.max[k]) e.max[k] = p[k]; }
        }
      }
    }
    for (const c of n.children || []) visit(c, world);
  };
  for (const r of roots) visit(r, ident());
  return out;
}

/* ---- CLI ---- */
if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, '/')
    || process.argv[1]?.endsWith('glb-bounds.mjs')) {
  const rel = process.argv[2];
  const rest = process.argv.slice(3);
  const asJson = rest.includes('--json');
  const filter = (rest.find((a) => !a.startsWith('--')) || '').toLowerCase();
  const b = glbBounds(rel);

  const overall = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (const e of b.values()) for (let k = 0; k < 3; k++) {
    if (e.min[k] < overall.min[k]) overall.min[k] = e.min[k];
    if (e.max[k] > overall.max[k]) overall.max[k] = e.max[k];
  }

  const rows = [...b.entries()].filter(([n]) => !filter || n.toLowerCase().includes(filter)).sort();
  if (asJson) {
    console.log(JSON.stringify({ file: rel, overall, meshes: Object.fromEntries(rows) }, null, 1));
  } else {
    const f = (v) => v.map((x) => x.toFixed(3).padStart(9)).join(' ');
    const size = overall.max.map((v, i) => v - overall.min[i]);
    console.log(`${rel}: ${b.size} meshes`);
    console.log(`  overall min ${f(overall.min)}`);
    console.log(`  overall max ${f(overall.max)}`);
    console.log(`  size        ${f(size)}   <- tallest axis is index ${size.indexOf(Math.max(...size))}`);
    console.log(`  ${'name'.padEnd(46)} ${'min x/y/z'.padStart(29)} ${'max x/y/z'.padStart(29)}`);
    for (const [n, e] of rows) console.log(`  ${n.slice(0, 46).padEnd(46)} ${f(e.min)} ${f(e.max)}`);
  }
}
