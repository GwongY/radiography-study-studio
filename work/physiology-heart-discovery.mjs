/*
 * Piece-3 heart discovery: measure on the real circulatory GLB what the spec's
 * discovery gate requires (docs/superpowers/specs/2026-09-11-physiology-3-heart-constrained.md).
 *
 *   1. Rest gaps between every chamber and the meshes beside it — the named
 *      valve leaflets and the proximal great vessels.
 *   2. Full-cycle separation under the CURRENT maps (affine chamber contraction;
 *      arterial neighbours at their own worst-case swell), so any penetration
 *      that already exists is on the record before anything changes.
 *   3. The valve-plane anchor per chamber, derived from the adjacent leaflets'
 *      attachment edge, in the chamber's OWN local frame — the frame the
 *      runtime deformation actually runs in.
 *
 * Run: node work/physiology-heart-discovery.mjs
 */
import { loadGlbMeshes } from './glb-mesh.mjs';
import { LAYERS } from './lib/mesh-names.mjs';
import { classify, FLOW_CLASSES } from '../outputs/physiology.js';
import { deriveShape } from '../outputs/physiology-shape.js';

const file = LAYERS.find(e => e[0] === 'circulatory')[1];
const meshes = loadGlbMeshes(file);

const chamberRe = /^(Left|Right)_(ventricle|atrium)$/;
const chambers = meshes.filter(m => chamberRe.test(m.name));
const leaflets = meshes.filter(m => /leaflet/i.test(m.name));
const vesselRe = /^(Ascending_aorta|Pulmonary_trunk|Superior_vena_cava.*|Inferior_vena_cava.*|.*Pulmonary_vein.*)$/i;
const vessels = meshes.filter(m => vesselRe.test(m.name));
console.log('chambers:', chambers.map(m => m.name).join(', '));
console.log('leaflets:', leaflets.map(m => m.name).join(', '));
console.log('vessels :', vessels.map(m => m.name).join(', ') || '(none matched)');

/* Column-major 4x4 in, column-major 4x4 out. Gauss-Jordan with partial
   pivoting on a row-major working copy — checked below against the source. */
function invert4(m) {
  const R = [];                                   /* row-major copy */
  for (let r = 0; r < 4; r++) R.push([m[r], m[4 + r], m[8 + r], m[12 + r]]);
  const I = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let col = 0; col < 4; col++) {
    let piv = col;
    for (let r = col + 1; r < 4; r++) if (Math.abs(R[r][col]) > Math.abs(R[piv][col])) piv = r;
    if (Math.abs(R[piv][col]) < 1e-12) throw new Error('singular matrix');
    [R[col], R[piv]] = [R[piv], R[col]];
    [I[col], I[piv]] = [I[piv], I[col]];
    const d = R[col][col];
    for (let c = 0; c < 4; c++) { R[col][c] /= d; I[col][c] /= d; }
    for (let r = 0; r < 4; r++) {
      if (r === col) continue;
      const f = R[r][col];
      if (!f) continue;
      for (let c = 0; c < 4; c++) { R[r][c] -= f * R[col][c]; I[r][c] -= f * I[col][c]; }
    }
  }
  const o = new Array(16);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) o[c * 4 + r] = I[r][c];
  return o;
}
function apply(m, p) {
  return [
    m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],
    m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],
    m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14],
  ];
}

const local = new Map();      /* mesh name -> Float32Array local positions */
const toWorld = new Map();    /* mesh name -> fn(local xyz) -> world xyz */
for (const mesh of meshes) {
  const inv = invert4(mesh.matrix);
  for (let i = 0; i < 3; i++) {   /* self-check: inverse really inverts */
    const p = [mesh.positions[i*3], mesh.positions[i*3+1], mesh.positions[i*3+2]];
    const back = apply(mesh.matrix, apply(inv, p));
    const err = Math.max(...p.map((v, k) => Math.abs(v - back[k])));
    if (err > 1e-6) throw new Error(`inverse check failed on ${mesh.name}: ${err}`);
  }
  const lp = new Float32Array(mesh.positions.length);
  for (let i = 0; i < mesh.positions.length; i += 3) {
    const q = apply(inv, [mesh.positions[i], mesh.positions[i+1], mesh.positions[i+2]]);
    lp[i] = q[0]; lp[i+1] = q[1]; lp[i+2] = q[2];
  }
  local.set(mesh.name, lp);
  toWorld.set(mesh.name, (x, y, z) => apply(mesh.matrix, [x, y, z]));
  const s = [0, 1, 2].map(k => Math.hypot(mesh.matrix[k], mesh.matrix[4+k], mesh.matrix[8+k]));
  mesh.uniformScale = Math.max(...s) <= Math.min(...s) * (1 + 1e-5);
}

function boundsOf(p) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i++) {
    const j = i % 3;
    min[j] = Math.min(min[j], p[i]); max[j] = Math.max(max[j], p[i]);
  }
  return { min, max };
}
function minGap(A, B) {
  let best = Infinity;
  for (let i = 0; i < A.length; i += 3) {
    const ax = A[i], ay = A[i+1], az = A[i+2];
    for (let j = 0; j < B.length; j += 3) {
      const dx = ax - B[j], dy = ay - B[j+1], dz = az - B[j+2];
      const d = dx*dx + dy*dy + dz*dz;
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best);
}
/* Min distance from every (possibly moved) A vertex to B, in world space.
   aLoc/aMat: A's local positions and local->world matrix; aMap: local map or null. */
function gapTo(A, aMap, aMat, Bworld) {
  let best = Infinity;
  const B = Bworld;
  for (let i = 0; i < A.length; i += 3) {
    let p = [A[i], A[i+1], A[i+2]];
    if (aMap) p = aMap([p[0], p[1], p[2]]);
    const w = apply(aMat, p);
    for (let j = 0; j < B.length; j += 3) {
      const dx = w[0]-B[j], dy = w[1]-B[j+1], dz = w[2]-B[j+2];
      const d = dx*dx + dy*dy + dz*dz;
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best);
}
/* The current uMode-5 chamber contraction, as the shader writes it. */
function currentPump([x, y, z], { axis, centre, amount: amt }) {
  const u = [x - centre[0], y - centre[1], z - centre[2]];
  const s = u[0]*axis[0] + u[1]*axis[1] + u[2]*axis[2];
  return [
    x - amt*(u[0] - s*axis[0] + .55*s*axis[0]),
    y - amt*(u[1] - s*axis[1] + .55*s*axis[1]),
    z - amt*(u[2] - s*axis[2] + .55*s*axis[2]),
  ];
}
/* The current uMode-2 uniform swell. */
function currentInflate([x, y, z], { centre, amount: amt }) {
  return [x + (x-centre[0])*amt, y + (y-centre[1])*amt, z + (z-centre[2])*amt];
}

const shapes = new Map();
for (const c of [...chambers, ...vessels]) {
  const cls = classify('circulatory', c.name);
  const rule = (FLOW_CLASSES[cls] || {}).rule;
  if (!rule) continue;
  const lp = local.get(c.name);
  const shape = deriveShape({ bounds: boundsOf(lp), rule });
  shape.cls = cls;
  shape.matrix = c.matrix;
  shape.lp = lp;
  shape.uniformScale = c.uniformScale;
  shapes.set(c.name, shape);
  console.log(`${c.name.padEnd(22)} cls=${cls.padEnd(13)} axis=[${shape.axis}] amt=${shape.amount.toFixed(3)} uniform=${c.uniformScale}`);
}

console.log('\n== rest gaps (world units; body ~1.7 tall) ==');
const rest = new Map();
for (const c of chambers) {
  const cw = c.positions;
  for (const other of [...leaflets, ...vessels]) {
    if (other.name === c.name) continue;
    const g = minGap(cw, other.positions);
    rest.set(c.name + '|' + other.name, g);
    if (g < 0.2) console.log(`${c.name.padEnd(14)} <-> ${other.name.padEnd(46)} ${g.toFixed(5)}`);
  }
}

console.log('\n== full-cycle min gap under CURRENT maps, 25 phases ==');
const STEPS = 25;
for (const c of chambers) {
  const shape = shapes.get(c.name);
  const cls = classify('circulatory', c.name);
  const amt = shape.amount;
  for (const other of [...leaflets, ...vessels]) {
    const rg = rest.get(c.name + '|' + other.name);
    if (rg === undefined || rg >= 0.2) continue;
    const ocls = classify('circulatory', other.name);
    const orule = (FLOW_CLASSES[ocls] || {}).rule;
    const oshape = shapes.get(other.name);
    let worst = Infinity;
    for (let k = 0; k < STEPS; k++) {
      const tau = k / (STEPS - 1);
      const a = amt * tau;
      const map = a > 0 ? (p) => currentPump(p, { axis: shape.axis, centre: shape.centre, amount: a }) : null;
      /* neighbour: arterial neighbours swell at their own worst case, always on */
      let oB = other.positions;
      if (oshape && orule && orule.mode === 'inflate') {
        const swelled = new Float32Array(oshape.lp.length);
        for (let i = 0; i < oshape.lp.length; i += 3) {
          const q = currentInflate([oshape.lp[i], oshape.lp[i+1], oshape.lp[i+2]], oshape);
          const w = apply(oshape.matrix, q);
          swelled[i] = w[0]; swelled[i+1] = w[1]; swelled[i+2] = w[2];
        }
        oB = swelled;
      }
      const g = gapTo(shape.lp, map, shape.matrix, oB);
      if (g < worst) worst = g;
    }
    const verdict = worst < rg * 0.999 ? '  <-- SHRINKS' : '';
    console.log(`${c.name.padEnd(14)} <-> ${other.name.padEnd(46)} rest ${rg.toFixed(5)}  cycle-min ${worst.toFixed(5)}${verdict}`);
  }
}

console.log('\n== valve-plane anchors from adjacent leaflet attachments ==');
for (const c of chambers) {
  const shape = shapes.get(c.name);
  const side = c.name.startsWith('Left') ? 'Left' : 'Right';
  const atrium = byNameMaybe(side + '_atrium');
  function byNameMaybe(n) { return meshes.find(m => new RegExp('^' + n + '$').test(m.name)); }
  if (!atrium) { console.log(c.name, ': same-side atrium not found'); continue; }
  const aShape = shapes.get(atrium.name);
  const aCentreWorld = apply(aShape.matrix, aShape.centre);
  const aCentreLocal = apply(invert4(shape.matrix), aCentreWorld);
  const sAtrium = (aCentreLocal[0]-shape.centre[0])*shape.axis[0]
    + (aCentreLocal[1]-shape.centre[1])*shape.axis[1]
    + (aCentreLocal[2]-shape.centre[2])*shape.axis[2];
  const dir = Math.sign(sAtrium) || 1;
  const half = shape.length / 2;
  console.log(`\n${c.name} (axis=[${shape.axis}], half=${half.toFixed(4)}, atrium ${dir > 0 ? '+' : '-'}axial):`);
  for (const lf of leaflets) {
    const rg = rest.get(c.name + '|' + lf.name);
    if (rg === undefined || rg >= 0.2) continue;
    /* leaflet vertices in the CHAMBER's local frame */
    const invC = invert4(shape.matrix);
    let extreme = -Infinity, sum = 0, n = 0;
    for (let i = 0; i < lf.positions.length; i += 3) {
      const p = apply(invC, [lf.positions[i], lf.positions[i+1], lf.positions[i+2]]);
      const z = (p[0]-shape.centre[0])*shape.axis[0]
        + (p[1]-shape.centre[1])*shape.axis[1]
        + (p[2]-shape.centre[2])*shape.axis[2];
      if (dir*z > extreme) extreme = dir*z;
      sum += z; n++;
    }
    console.log(`  ${lf.name.padEnd(46)} restGap ${rg.toFixed(4)}  attachZ ${(dir*extreme/half).toFixed(3)}  centroidZ ${(sum/n/half).toFixed(3)}`);
  }
}
console.log('\nModel height reference: body spans ~1.7 world units.');
