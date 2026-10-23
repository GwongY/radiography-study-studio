/* Vertebra landmark targets, derived once from the shipped skeleton's own vertices and committed as
 *   work/bone-landmark-vertebrae.mjs
 * (node work/derive-vertebra-landmarks.mjs). The NAMES come from the W4 Head, Neck & Trunk deck: p19 (atlas: superior
 * articular facet), p20 (a cervical vertebra, C3-C6), p22 (thoracic), p26 (lumbar). The POSITIONS are app-authored
 * annotations, reviewed on screen. Never rebuild blind: if the GLB changes, bone-landmarks.js fails its signature and
 * these must be reviewed again.
 *
 * Every part is placed relative to the vertebral foramen, found as the enclosed hole in a horizontal slice of the bone
 * (bounding-box fractions put the pedicle on the lamina, the lamina on the spinous process and the lumbar foramen under
 * the body, 24 Oct 2026). Pedicle = the bone beside the front of the hole, lamina = beside its back, foramen = the hole's
 * front wall, articular process = highest point of the arch above the pedicle-lamina junction, costal facets = the
 * body's posterolateral upper and lower edges. Markers go on the +x side; the build mirrors nothing for vertebrae.
 */
import { writeFileSync } from 'node:fs';
import { loadGlbMeshes } from './glb-mesh.mjs';

const meshes = loadGlbMeshes('assets/z-anatomy-skeleton.glb');
const RES = 0.00025;                                   /* slice raster, metres per cell */
const norm = (a) => { const l = Math.hypot(...a) || 1; return a.map((x) => x / l); };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function shape(name) {
  const m = meshes.find((x) => x.name === name);
  if (!m) throw new Error(`Missing mesh ${name}`);
  const P = m.positions, I = m.indices, n = P.length / 3;
  const pts = Array.from({ length: n }, (_, i) => [P[i * 3], P[i * 3 + 1], P[i * 3 + 2]]);
  const normals = pts.map(() => [0, 0, 0]);
  for (let t = 0; t < I.length; t += 3) {
    const [a, b, c] = [pts[I[t]], pts[I[t + 1]], pts[I[t + 2]]];
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const f = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    for (const i of [I[t], I[t + 1], I[t + 2]]) for (let k = 0; k < 3; k++) normals[i][k] += f[k];
  }
  normals.forEach((v, i) => { normals[i] = norm(v); });
  const min = [1e9, 1e9, 1e9], max = [-1e9, -1e9, -1e9];
  for (const p of pts) for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], p[k]); max[k] = Math.max(max[k], p[k]); }
  return { m, pts, normals, min, max, I };
}

/* The bone's cross-section at one height, as a top-view raster (x across, z along): the plane cuts the surface
 * into closed outlines, and a cell is bone when a ray from it crosses an odd number of them. */
function slab(s, y) {
  const { pts, I, min, max } = s;
  const nx = Math.ceil((max[0] - min[0]) / RES) + 3, nz = Math.ceil((max[2] - min[2]) / RES) + 3;
  const bone = new Uint8Array(nx * nz);
  const cell = (x, z) => [(x - min[0]) / RES + 1, (z - min[2]) / RES + 1];
  const mark = (x, z) => { x = Math.floor(x); z = Math.floor(z); if (x >= 0 && z >= 0 && x < nx && z < nz) bone[z * nx + x] = 1; };
  const segs = [];
  for (let t = 0; t < I.length; t += 3) {
    const tri = [pts[I[t]], pts[I[t + 1]], pts[I[t + 2]]], cut = [];
    for (let i = 0; i < 3; i++) {
      const a = tri[i], b = tri[(i + 1) % 3];
      if ((a[1] < y) !== (b[1] < y)) { const k = (y - a[1]) / (b[1] - a[1]); cut.push(cell(a[0] + (b[0] - a[0]) * k, a[2] + (b[2] - a[2]) * k)); }
    }
    if (cut.length === 2) segs.push(cut);
  }
  for (let z = 0; z < nz; z++) {
    const pz = z + .5, xs = [];
    for (const [a, b] of segs) if ((a[1] < pz) !== (b[1] < pz)) xs.push(a[0] + (b[0] - a[0]) * (pz - a[1]) / (b[1] - a[1]));
    xs.sort((p, q) => p - q);
    for (let i = 0; i + 1 < xs.length; i += 2) for (let x = Math.ceil(xs[i] - .5); x + .5 <= xs[i + 1]; x++) mark(x, z);
  }
  /* the outline itself too, so a wall thinner than a cell still closes the ring */
  for (const [a, b] of segs) { const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2) + 1;
    for (let i = 0; i <= n; i++) mark(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n); }
  /* everything empty that the border cannot reach is a hole */
  const seen = new Int32Array(nx * nz).fill(-1);
  const flood = (start, id) => {
    const stack = [start], cells = []; seen[start] = id;
    while (stack.length) {
      const c = stack.pop(); cells.push(c);
      const x = c % nx, z = (c / nx) | 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx, Z = z + dz; if (X < 0 || Z < 0 || X >= nx || Z >= nz) continue;
        const k = Z * nx + X; if (!bone[k] && seen[k] < 0) { seen[k] = id; stack.push(k); }
      }
    }
    return cells;
  };
  flood(0, 0);
  const holes = [];
  for (let k = 0; k < nx * nz; k++) if (!bone[k] && seen[k] < 0) holes.push(flood(k, holes.length + 1));
  const X = (i) => min[0] + (i - 1 + .5) * RES, Z = (i) => min[2] + (i - 1 + .5) * RES;
  return { bone, nx, nz, X, Z, holes: holes.map((cells) => {
    let sx = 0, sz = 0, x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (const c of cells) { const x = X(c % nx), z = Z((c / nx) | 0); sx += x; sz += z; x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
    return { cells, area: cells.length * RES * RES, cx: sx / cells.length, cz: sz / cells.length, x0, x1, z0, z1 };
  }) };
}

/* The vertebral foramen: the biggest midline hole over a sweep of slice heights. */
function foramen(s) {
  const { min, max } = s, W = max[0] - min[0], mid = (min[0] + max[0]) / 2, H = max[1] - min[1];
  let best = null;
  for (let f = .25; f <= .8; f += .05) {
    const y = min[1] + H * f, sl = slab(s, y);
    for (const h of sl.holes) if (Math.abs(h.cx - mid) < W * .12 && (!best || h.area > best.h.area)) best = { h, sl, y };
  }
  if (!best) throw new Error(`No vertebral foramen in ${s.m.name}`);
  return best;
}

/* Along one row of the slice, the run of bone that starts at the hole's +x edge. */
function boneBeside(f, z) {
  const { sl, h } = f, row = Math.round((z - sl.Z(1)) / RES) + 1;
  const inHole = new Set(h.cells);
  let x = -1;
  for (let i = sl.nx - 1; i >= 0; i--) if (inHole.has(row * sl.nx + i)) { x = i; break; }
  if (x < 0) throw new Error('row misses the hole');
  let a = x + 1; while (a < sl.nx && !sl.bone[row * sl.nx + a]) a++;
  let b = a; while (b < sl.nx && sl.bone[row * sl.nx + b]) b++;
  /* the run can carry on into the articular pillar or transverse process: stay within 3 mm of the hole */
  return { x: Math.min((sl.X(a) + sl.X(b - 1)) / 2, sl.X(a) + .003), inner: sl.X(a), outer: sl.X(b - 1) };
}

function measure(name, { archReach, laminaAt = .3 } = {}) {
  const s = shape(name), { pts, normals, min, max } = s;
  const nearest = (target, { facing, minDot = .3, weight = [1, 1, 1] } = {}) => {
    let b = Infinity, bi = -1;
    pts.forEach((p, i) => {
      if (facing && dot(normals[i], norm(facing)) < minDot) return;
      const d = weight.reduce((v, w, k) => v + w * (p[k] - target[k]) ** 2, 0);
      if (d < b) { b = d; bi = i; }
    });
    if (bi < 0) throw new Error(`No vertex on ${name} for ${JSON.stringify(target)}`);
    return pts[bi];
  };
  const f = foramen(s), h = f.h, y0 = f.y, depth = h.z1 - h.z0, cx = h.cx;
  /* body = everything in front of the hole */
  const body = pts.filter((p) => p[2] > h.z1 + .001);
  const bTop = Math.max(...body.filter((p) => Math.abs(p[0] - cx) < .006).map((p) => p[1]));
  const bBot = Math.min(...body.filter((p) => Math.abs(p[0] - cx) < .006).map((p) => p[1]));
  const bFront = Math.max(...body.map((p) => p[2]));
  const ped = boneBeside(f, h.z1 - depth * .2), lam = boneBeside(f, h.z0 + depth * laminaAt);
  /* widest point of the hole marks the pedicle-lamina junction; the articular process rises above it */
  const wide = boneBeside(f, h.cz);
  const reach = archReach ? wide.inner + archReach : wide.outer + .006;
  const arch = pts.filter((p) => p[0] > wide.inner - .002 && p[0] < reach && p[2] < h.z1 - depth * .1 && p[2] > h.z0 - .004 && p[1] > y0);
  const tip = arch.reduce((a, p) => (p[1] > a[1] ? p : a));
  /* costal facets: a side-facing vertex at each margin where the pedicle joins the body. The body's back is hollowed
   * at the midline, so its posterolateral corners sit ~3 mm behind the front edge of the foramen. */
  const bh = bTop - bBot;
  const costal = (y, up) => {
    let b = Infinity, best = null;
    pts.forEach((p, i) => {
      if (p[0] < cx + .004 || normals[i][0] < .3 || (up ? normals[i][1] < -.3 : normals[i][1] > .3)) return;
      const sc = Math.abs(p[2] - (h.z1 - .003)) + .5 * Math.abs(p[1] - y);
      if (sc < b) { b = sc; best = p; }
    });
    if (!best) throw new Error(`No costal facet vertex on ${name}`);
    return best;
  };
  return {
    hole: h, y0,
    body: nearest([cx, (bTop + bBot) / 2, bFront], { facing: [0, 0, 1], minDot: .5 }),
    spinous: pts.reduce((a, p) => (p[2] + Math.abs(p[0] - cx) * .6 < a[2] + Math.abs(a[0] - cx) * .6 ? p : a)),
    transverse: pts.reduce((a, p) => (p[0] > a[0] ? p : a)),
    foramen: nearest([cx, (bTop + bBot) / 2, h.z1], { facing: [0, 0, -1], minDot: .5 }),
    pedicle: nearest([ped.x, y0, h.z1 - depth * .2], { facing: [1, -.4, 0], minDot: .2 }),
    lamina: nearest([lam.x, y0, h.z0 + depth * laminaAt], { facing: [.3, .3, -1], minDot: .3 }),
    supArticProcess: tip,
    /* facets sit just below the process tip, on the face the lecture gives: posterior (thoracic), medial (lumbar) */
    supArticFacetThoracic: nearest([tip[0], tip[1] - .003, tip[2]], { facing: [.2, .3, -1], minDot: .5 }),
    supArticFacetLumbar: nearest([tip[0], tip[1] - .006, tip[2]], { facing: [-1, .1, -.3], minDot: .5 }),
    costalUp: costal(bTop - bh * .12, true),
    costalLow: costal(bBot + bh * .12, false),
  };
}
/* The atlas has no body: its superior articular facet is the cupped top of the lateral mass beside the ring. */
function atlasFacet() {
  const s = shape('Atlas_(C1)'), f = foramen(s), lm = boneBeside(f, f.h.cz);
  let b = Infinity, best = null;
  s.pts.forEach((p, i) => {
    if (dot(s.normals[i], norm([-.4, 1, 0])) < .5) return;
    const d = (p[0] - lm.x) ** 2 + (p[2] - f.h.cz) ** 2;
    if (d < b) { b = d; best = p; }
  });
  return best;
}

const r = (p) => `[${p.map((x) => +x.toFixed(6)).join(',')}]`;
const out = [];
const add = (key, mesh, rows) => out.push(`  ['${key}','${mesh}',[\n${rows.map(([n, p, page]) => `    head('${n}',${r(p)},${page}),`).join('\n')}\n  ]],`);
for (const c of ['C3', 'C4', 'C5', 'C6']) {
  const f = measure(`Vertebra_${c}`);
  add(`vertebra ${c.toLowerCase()}`, `Vertebra_${c}`, [['Vertebral body', f.body, 20], ['Vertebral foramen', f.foramen, 20], ['Pedicle', f.pedicle, 20],
    ['Transverse process', f.transverse, 20], ['Spinous process', f.spinous, 20], ['Lamina', f.lamina, 20], ['Superior articular process', f.supArticProcess, 20]]);
}
for (let t = 1; t <= 12; t++) {
  const f = measure(`Vertebra_T${t}`, { archReach: .01 });
  add(`vertebra t${t}`, `Vertebra_T${t}`, [['Transverse process', f.transverse, 22], ['Superior articular facet', f.supArticFacetThoracic, 22],
    ['Superior costal facet', f.costalUp, 22], ['Inferior costal facet', f.costalLow, 22]]);
}
for (let l = 1; l <= 5; l++) {
  const f = measure(`Vertebra_L${l}`, { archReach: .012, laminaAt: .15 });
  add(`vertebra l${l}`, `Vertebra_L${l}`, [['Vertebral body', f.body, 26], ['Vertebral foramen', f.foramen, 26], ['Lamina', f.lamina, 26], ['Articular facet', f.supArticFacetLumbar, 26]]);
}
add('atlas (c1)', 'Atlas_(C1)', [['Superior articular facet', atlasFacet(), 19]]);
if (process.argv.includes('--dry')) { console.log(out.join('\n')); process.exit(0); }
writeFileSync('work/bone-landmark-vertebrae.mjs', `/* GENERATED by work/derive-vertebra-landmarks.mjs, then reviewed on screen. See that file's header. */
const head = (name, target, page, label = name) => [name, target, 'hss.hnt.2026', page, { diagram: label }];
export const VERTEBRA_LANDMARKS = [
${out.join('\n')}
];
`);
console.log('wrote work/bone-landmark-vertebrae.mjs', out.length, 'vertebrae');
