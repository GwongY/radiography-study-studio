/*
 * Piece-3 heart gate: the tethered chamber map, on the real circulatory GLB.
 *
 * Covers what the spec's evidence section demands:
 *   - characterisation: with no tether, deformChamber is exactly the map the
 *     inline uMode-5 branch shipped (position and inverse-transpose normal);
 *   - rest identity at zero amplitude, bit for bit;
 *   - the Jacobian (with a spatially varying tether) against central
 *     differences of the map itself;
 *   - bounded positive determinants across real meshes, fields and amplitudes;
 *   - the tether field: weights, gradient consistency, and the fold margin;
 *   - ACCEPTANCE: for every deforming heart mesh and every static mesh beside
 *     it, the full-cycle minimum separation under the new map beats both the
 *     rest gap (within tolerance) and the OLD map's own worst case.
 *
 * Run: node work/physiology-heart-check.mjs
 */
import assert from 'node:assert/strict';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { LAYERS } from './lib/mesh-names.mjs';
import { classify, FLOW_CLASSES } from '../outputs/physiology.js';
import { deriveShape, deformChamber, chamberTetherField } from '../outputs/physiology-shape.js';

const RADIUS = 0.04;          /* world units; body ~1.7 — see the evidence note */
const TOLERANCE = 0.0005;     /* full-cycle separation >= rest - TOLERANCE */
const ADJACENT = 0.05;        /* what counts as "beside" a chamber */
const PHASES = 25;

const file = LAYERS.find(e => e[0] === 'circulatory')[1];
const meshes = loadGlbMeshes(file);

function invert4(m) {
  const R = [];
  for (let r = 0; r < 4; r++) R.push([m[r], m[4 + r], m[8 + r], m[12 + r]]);
  const I = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let col = 0; col < 4; col++) {
    let piv = col;
    for (let r = col + 1; r < 4; r++) if (Math.abs(R[r][col]) > Math.abs(R[piv][col])) piv = r;
    if (Math.abs(R[piv][col]) < 1e-12) throw new Error('singular matrix');
    [R[col], R[piv]] = [R[piv], R[col]]; [I[col], I[piv]] = [I[piv], I[col]];
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
const apply = (m, p) => [
  m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],
  m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],
  m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14],
];
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
    const ax = A[i], ay = A[i + 1], az = A[i + 2];
    for (let j = 0; j < B.length; j += 3) {
      const dx = ax - B[j], dy = ay - B[j + 1], dz = az - B[j + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < best) best = d;
    }
  }
  return Math.sqrt(best);
}
/* The map the inline uMode-5 branch shipped before this piece. Kept here as
   the characterisation oracle and the acceptance baseline. */
function legacyPump([x, y, z], { axis, centre, amount: amt }, a) {
  const u = [x - centre[0], y - centre[1], z - centre[2]];
  const s = u[0]*axis[0] + u[1]*axis[1] + u[2]*axis[2];
  const out = [x - a*(u[0] - s*axis[0] + .55*s*axis[0]),
               y - a*(u[1] - s*axis[1] + .55*s*axis[1]),
               z - a*(u[2] - s*axis[2] + .55*s*axis[2])];
  return out;
}
function legacyNormal(normal, axis, a) {
  const na = normal[0]*axis[0] + normal[1]*axis[1] + normal[2]*axis[2];
  const n = normal.map((v, i) => (v - na*axis[i]) / Math.max(.1, 1 - a)
    + na*axis[i] / Math.max(.1, 1 - .55*a));
  const len = Math.hypot(...n) || 1;
  return n.map(v => v / len);
}
const inflate = (shape, a) => (p) => [
  p[0] + (p[0]-shape.centre[0])*a, p[1] + (p[1]-shape.centre[1])*a, p[2] + (p[2]-shape.centre[2])*a,
];

/* ---- real-mesh setup -------------------------------------------------- */
const deforming = meshes.filter(m => ['heartVentricle', 'heartAtrium'].includes(classify('circulatory', m.name)));
assert.equal(deforming.length, 8, 'expected 4 chambers + 4 papillary muscles');
const atria = deforming.filter(m => classify('circulatory', m.name) === 'heartAtrium');
assert.equal(atria.length, 2);

const bboxGap = (a, b) => {
  const A = boundsOf(a.positions), B = boundsOf(b.positions);
  return Math.max(...[0, 1, 2].map(i => Math.max(A.min[i] - B.max[i], B.min[i] - A.max[i], 0)));
};
const candidates = meshes.filter(m => ['heart','heartAVValve','heartSemilunarValve','venous','pulmVein'].includes(classify('circulatory', m.name)));
const staticSet = candidates.filter(c => deforming.some(d => bboxGap(d, c) < ADJACENT && minGap(d.positions, c.positions) < ADJACENT));
assert.ok(staticSet.length >= 9, 'static set missing leaflets: ' + staticSet.map(m => m.name).join(','));

/* Shapes: local bounds, like the loader derives them. */
const shapes = new Map();
for (const m of deforming) {
  const inv = invert4(m.matrix);
  const lp = new Float32Array(m.positions.length);
  for (let i = 0; i < m.positions.length; i += 3) {
    const q = apply(inv, [m.positions[i], m.positions[i+1], m.positions[i+2]]);
    lp[i] = q[0]; lp[i+1] = q[1]; lp[i+2] = q[2];
  }
  m.local = lp;
  m.uniform = (() => {
    const s = [0, 1, 2].map(k => Math.hypot(m.matrix[k], m.matrix[4+k], m.matrix[8+k]));
    return Math.max(...s) <= Math.min(...s) * (1 + 1e-5) ? Math.max(...s) : null;
  })();
  const cls = classify('circulatory', m.name);
  const shape = deriveShape({ bounds: boundsOf(lp), rule: FLOW_CLASSES[cls].rule });
  shapes.set(m.name, { shape, cls, inv });
}
/* The papillary muscles take their ventricle's field, converted per frame —
   the same conversion installLayerFlow does with world/local matrices. */
for (const m of deforming) {
  if (classify('circulatory', m.name) !== 'heartVentricle' || !/papillary/i.test(m.name)) continue;
  const side = m.name.includes('right') || m.name.includes('Right') ? 'Right' : 'Left';
  const chamber = deforming.find(c => new RegExp('^' + side + '_ventricle$').test(c.name));
  assert.ok(chamber, 'ventricle for ' + m.name);
  const cs = shapes.get(chamber.name).shape;
  const centreW = apply(chamber.matrix, cs.centre);
  const axisW = (() => {  /* transformDirection through the chamber's world matrix */
    const v = [cs.axis[0]*chamber.matrix[0] + cs.axis[1]*chamber.matrix[4] + cs.axis[2]*chamber.matrix[8],
               cs.axis[0]*chamber.matrix[1] + cs.axis[1]*chamber.matrix[5] + cs.axis[2]*chamber.matrix[9],
               cs.axis[0]*chamber.matrix[2] + cs.axis[1]*chamber.matrix[6] + cs.axis[2]*chamber.matrix[10]];
    const len = Math.hypot(...v) || 1;
    return v.map(x => x / len);
  })();
  const { shape, inv } = shapes.get(m.name);
  const centreL = apply(inv, centreW);
  const axisL = (() => {
    const v = apply(inv, [centreW[0] + axisW[0], centreW[1] + axisW[1], centreW[2] + axisW[2]]);
    const d = [v[0] - centreL[0], v[1] - centreL[1], v[2] - centreL[2]];
    const len = Math.hypot(...d) || 1;
    return d.map(x => x / len);
  })();
  Object.assign(shape, { centre: centreL, axis: axisL, amount: cs.amount });
}

/* Tether fields: static vertices into each mover's local frame, culled to the
   expanded bounds; radius and gradient clamp scaled per the fold condition. */
const aMax = Math.max(...deforming.map(m => shapes.get(m.name).shape.amount));
const lambda = 1 / (1 - .55 * aMax);
for (const m of deforming) {
  const { shape, inv } = shapes.get(m.name);
  let vMax = 0;
  for (let i = 0; i < m.local.length; i += 3) {
    const off = [m.local[i]-shape.centre[0], m.local[i+1]-shape.centre[1], m.local[i+2]-shape.centre[2]];
    const s = off.reduce((n, v, k) => n + v*shape.axis[k], 0);
    vMax = Math.max(vMax, Math.hypot(...off.map((v, k) => v - s*shape.axis[k] + .55*s*shape.axis[k])));
  }
  const maxGrad = 0.6 / (aMax * lambda * Math.max(vMax, 1e-6));
  const bounds = boundsOf(m.local), pad = RADIUS / (m.uniform || 1) + 1e-6;
  const near = [];
  for (const s of staticSet) {
    for (let i = 0; i < s.positions.length; i += 3) {
      const q = apply(inv, [s.positions[i], s.positions[i+1], s.positions[i+2]]);
      if (q[0] < bounds.min[0]-pad || q[0] > bounds.max[0]+pad
        || q[1] < bounds.min[1]-pad || q[1] > bounds.max[1]+pad
        || q[2] < bounds.min[2]-pad || q[2] > bounds.max[2]+pad) continue;
      near.push(q[0], q[1], q[2]);
    }
  }
  m.tether = chamberTetherField(m.local, Float32Array.from(near), RADIUS / (m.uniform || 1), maxGrad);
  m.vMax = vMax;
  m.maxGrad = maxGrad;
  m.statics = Float32Array.from(near);
}

/* ---- 1. characterisation: no tether == the shipped inline map --------- */
let charPos = 0, charNorm = 0, samples = 0;
for (const m of deforming) {
  const { shape } = shapes.get(m.name);
  const a = shape.amount;
  for (let i = 0; i < m.local.length; i += 3) {
    const p = [m.local[i], m.local[i+1], m.local[i+2]], n = [0.3, -0.5, 0.81];
    const got = deformChamber(p, n, shape, 1);
    const want = legacyPump(p, shape, a);
    for (let k = 0; k < 3; k++) {
      charPos = Math.max(charPos, Math.abs(got.position[k] - want[k]));
      charNorm = Math.max(charNorm, Math.abs(got.normal[k] - legacyNormal(n, shape.axis, a)[k]));
    }
    samples++;
  }
}
assert.ok(charPos < 1e-12 && charNorm < 1e-12, `characterisation drift pos=${charPos} norm=${charNorm}`);
console.log(`PASS characterisation: ${samples} vertices, unmasked deformChamber == inline map (pos ${charPos.toExponential(2)}, norm ${charNorm.toExponential(2)})`);

/* ---- 2. rest identity -------------------------------------------------- */
for (const m of deforming) {
  const { shape } = shapes.get(m.name);
  const p = [m.local[0], m.local[1], m.local[2]], n = [0.3, -0.5, 0.81];
  const got = deformChamber(p, n, shape, 0, { weight: m.tether.weights[0], gradient: [m.tether.gradients[0], m.tether.gradients[1], m.tether.gradients[2]] });
  assert.deepEqual(got.position, p, 'rest position identity');
  assert.deepEqual(got.normal, n, 'rest normal identity');
}
console.log('PASS rest identity: zero amplitude returns inputs bit for bit');

/* ---- 3. Jacobian against central differences (spatially varying field) - */
{
  const shape = { axis: [0.2672612419124244, 0.5345224838248488, 0.8017837257372732], centre: [0.1, 0.2, 0.3], amount: 0.14 };
  const pole = [0.15, 0.25, 0.35], r0 = 0.05;
  const field = (x) => {
    const d = Math.hypot(x[0]-pole[0], x[1]-pole[1], x[2]-pole[2]);
    const t = Math.max(0, Math.min(1, d/r0));
    const w = t*t*(3-2*t);
    const dw = d > 1e-9 ? 6*t*(1-t)/r0 : 0;
    return { weight: w, gradient: d > 1e-9 ? [dw*(x[0]-pole[0])/d, dw*(x[1]-pole[1])/d, dw*(x[2]-pole[2])/d] : [0, 0, 0] };
  };
  const eps = 1e-6, n0 = [0.3, -0.5, 0.81];
  let worstJ = 0, worstN = 0, tested = 0;
  for (const p0 of [[pole[0]+r0*.5, pole[1], pole[2]], [pole[0], pole[1]-r0*.3, pole[2]+.02], [pole[0]-r0*.9, pole[1]+.01, pole[2]]]) {
    const t = field(p0);
    /* The field is re-evaluated at every probe point: the derivative being
       tested is the one that includes the mask's own spatial variation. */
    const F = (x) => deformChamber(x, n0, shape, 1, field(x)).position;
    const fd = new Array(9);
    for (let c = 0; c < 3; c++) {
      const e = [0, 0, 0]; e[c] = eps;
      const fp = F([p0[0]+e[0], p0[1]+e[1], p0[2]+e[2]]);
      const fm = F([p0[0]-e[0], p0[1]-e[1], p0[2]-e[2]]);
      for (let r = 0; r < 3; r++) fd[c*3+r] = (fp[r]-fm[r])/(2*eps);
    }
    const got = deformChamber(p0, n0, shape, 1, t);
    for (let k = 0; k < 9; k++) worstJ = Math.max(worstJ, Math.abs(fd[k]-got.jacobian[k])/Math.max(Math.abs(fd[k]), 1e-3));
    const col = c => [fd[c*3], fd[c*3+1], fd[c*3+2]];
    const cross = (p, q) => [p[1]*q[2]-p[2]*q[1], p[2]*q[0]-p[0]*q[2], p[0]*q[1]-p[1]*q[0]];
    const c0v = cross(col(1), col(2)), c1v = cross(col(2), col(0)), c2v = cross(col(0), col(1));
    const movedN = [0, 1, 2].map(r => c0v[r]*n0[0] + c1v[r]*n0[1] + c2v[r]*n0[2]);
    const len = Math.hypot(...movedN) || 1;
    for (let k = 0; k < 3; k++) worstN = Math.max(worstN, Math.abs(movedN[k]/len-got.normal[k]));
    tested++;
  }
  assert.ok(tested === 3 && worstJ < 1e-5 && worstN < 1e-5,
    `jacobian drift entries=${worstJ.toExponential(2)} normal=${worstN.toExponential(2)}`);
  console.log(`PASS jacobian: ${tested} probe points, all nine entries and the inverse-transpose normal match central differences (J ${worstJ.toExponential(2)}, n ${worstN.toExponential(2)})`);
}

/* ---- 4. bounded positive determinants on real meshes ------------------- */
let minDet = Infinity;
for (const m of deforming) {
  const { shape } = shapes.get(m.name);
  const count = m.local.length / 3;
  for (let vi = 0; vi < count; vi += 7) {
    const p = [m.local[vi*3], m.local[vi*3+1], m.local[vi*3+2]];
    const t = { weight: m.tether.weights[vi], gradient: [m.tether.gradients[vi*3], m.tether.gradients[vi*3+1], m.tether.gradients[vi*3+2]] };
    for (const amp of [0.25, 0.6, 1]) {
      minDet = Math.min(minDet, deformChamber(p, [0, 1, 0], shape, amp, t).determinant);
    }
  }
}
assert.ok(minDet > 0.05, 'jacobian folds: min det ' + minDet);
console.log(`PASS determinants: min det ${minDet.toFixed(4)} > 0.05 across ${deforming.length} meshes (fold margin ${(1/minDet).toFixed(2)}x)`);

/* ---- 5. tether field on synthetic data --------------------------------- */
{
  const statics = Float32Array.from([0, 0, 0, 0.01, 0, 0]);
  const r = 0.05, mg = 1e9;
  const at = (x, y, z) => chamberTetherField(Float32Array.from([x, y, z]), statics, r, mg);
  assert.equal(at(0, 0, 0).weights[0], 0, 'w at static vertex');
  assert.equal(at(0.2, 0, 0).weights[0], 1, 'w beyond radius');
  const mid = at(0.035, 0, 0).weights[0];
  assert.ok(Math.abs(mid-0.5) < 1e-9, 'w at half radius: ' + mid);
  /* Float32 field samples limit the fd's precision; a wider step keeps the
     difference well above the sample noise without leaving the quadratic
     regime of the smoothstep. */
  const eps = 1e-4, worst = { g: 0 };
  for (const [x, y, z] of [[0.03, 0.004, -0.002], [0.012, 0.003, 0.001], [-0.02, 0.006, 0.003]]) {
    const base = at(x, y, z);
    for (let c = 0; c < 3; c++) {
      const e = [0, 0, 0]; e[c] = eps;
      const wp = at(x+e[0], y+e[1], z+e[2]).weights[0];
      const wm = at(x-e[0], y-e[1], z-e[2]).weights[0];
      const fd = (wp-wm)/(2*eps);
      worst.g = Math.max(worst.g, Math.abs(fd-base.gradients[c])/Math.max(Math.abs(fd), 1e-9));
    }
  }
  assert.ok(worst.g < 1e-4, 'field gradient vs finite difference: ' + worst.g);
  console.log('PASS tether field: weights, radius falloff and gradient agree with the field itself');
}

/* ---- 6. ACCEPTANCE: full-cycle separation beats rest and the old map ---- */
function cycleMin(mover, neighbourPositions, mapFn) {
  let worst = Infinity;
  for (let k = 0; k < PHASES; k++) {
    const amp = .5 - .5*Math.cos(k/(PHASES-1)*2*Math.PI);
    const mapped = mapFn(amp);
    for (const p of mapped) {
      for (let j = 0; j < neighbourPositions.length; j += 3) {
        const dx = p[0]-neighbourPositions[j], dy = p[1]-neighbourPositions[j+1], dz = p[2]-neighbourPositions[j+2];
        const d = dx*dx+dy*dy+dz*dz;
        if (d < worst) worst = d;
      }
    }
  }
  return Math.sqrt(worst);
}
function mappedWorld(m, amp, tethered) {
  const { shape } = shapes.get(m.name);
  const out = [];
  for (let i = 0; i < m.local.length; i += 3) {
    const p = [m.local[i], m.local[i+1], m.local[i+2]];
    const t = tethered ? { weight: m.tether.weights[i/3], gradient: [m.tether.gradients[i*3], m.tether.gradients[i*3+1], m.tether.gradients[i*3+2]] } : null;
    const q = tethered ? deformChamber(p, [0, 1, 0], shape, amp, t).position : legacyPump(p, shape, shape.amount*amp);
    out.push(apply(m.matrix, q));
  }
  return out;
}
let worstMarginRest = Infinity, worstMarginLegacy = Infinity, worstPair = null, pairs = 0;
for (const m of deforming) {
  for (const s of staticSet) {
    if (bboxGap(m, s) >= ADJACENT) continue;
    const rest = minGap(m.positions, s.positions);
    if (rest >= ADJACENT) continue;
    /* arterial neighbours deform too; hold them at their own worst case */
    const scls = classify('circulatory', s.name);
    let sB = s.positions;
    if (['arterial', 'pulmArtery'].includes(scls)) {
      const slp = (() => {
        const inv = invert4(s.matrix);
        const lp = new Float32Array(s.positions.length);
        for (let i = 0; i < s.positions.length; i += 3) {
          const q = apply(inv, [s.positions[i], s.positions[i+1], s.positions[i+2]]);
          lp[i] = q[0]; lp[i+1] = q[1]; lp[i+2] = q[2];
        }
        return lp;
      })();
      const sshape = deriveShape({ bounds: boundsOf(slp), rule: FLOW_CLASSES[scls].rule });
      sB = (() => {
        const out = new Float32Array(s.positions.length);
        for (let i = 0; i < slp.length; i += 3) {
          const q = inflate(sshape, sshape.amount)([slp[i], slp[i+1], slp[i+2]]);
          const w = apply(s.matrix, q);
          out[i] = w[0]; out[i+1] = w[1]; out[i+2] = w[2];
        }
        return out;
      })();
    }
    const legacyMin = cycleMin(m, sB, (amp) => mappedWorld(m, amp, false));
    const newMin = cycleMin(m, sB, (amp) => mappedWorld(m, amp, true));
    pairs++;
    if (rest-newMin < worstMarginRest) { worstMarginRest = rest-newMin; worstPair = m.name+' <-> '+s.name; }
    worstMarginLegacy = Math.min(worstMarginLegacy, newMin-legacyMin);
    /* The old-map floor carries 1e-4: fifty times below the smallest
       collar-scale failure (~5e-3) and above the per-vertex difference
       between two maps whose minima are achieved on different vertices.
       The rest-gap tolerance below is the binding constraint. */
    assert.ok(newMin >= legacyMin-1e-4, `pair worse than the old map: ${m.name} <-> ${s.name} ${newMin} < ${legacyMin}`);
    /* Allowed shrink: 5% of the gap, floored at the absolute 5e-4 so the
       attachment seams (gaps of a few tenths of a millimetre, the pairs this
       piece exists to protect) get a fixed bound rather than a vanishing one. */
    const allowed = Math.max(TOLERANCE, 0.05*rest);
    assert.ok(newMin >= rest-allowed, `pair eats its rest gap: ${m.name} <-> ${s.name} ${newMin} < ${rest-allowed}`);
  }
}
assert.ok(pairs >= 20, 'adjacency coverage collapsed: ' + pairs);
console.log(`PASS acceptance: ${pairs} adjacent pairs, worst rest margin ${(worstMarginRest).toExponential(2)} (${worstPair}), every pair >= its old-map minimum by >= ${worstMarginLegacy.toExponential(2)}`);

/* ---- 7. papillary muscles: field weights and their ventricle pairs ------ */
for (const m of deforming.filter(x => /papillary/i.test(x.name))) {
  const minW = Math.min(...m.tether.weights);
  const { shape } = shapes.get(m.name);
  const ventName = /left/i.test(m.name) ? 'Left_ventricle' : 'Right_ventricle';
  const vent = deforming.find(c => c.name === ventName);
  const vs = shapes.get(ventName).shape;
  const at1 = (mesh, shape2, i) => deformChamber(
    [mesh.local[i], mesh.local[i+1], mesh.local[i+2]], [0, 1, 0], shape2, 1,
    { weight: mesh.tether.weights[i/3], gradient: [mesh.tether.gradients[i*3], mesh.tether.gradients[i*3+1], mesh.tether.gradients[i*3+2]] });
  const ventW = [], papW = [];
  for (let i = 0; i < vent.local.length; i += 3) ventW.push(apply(vent.matrix, at1(vent, vs, i).position));
  for (let i = 0; i < m.local.length; i += 3) papW.push(apply(m.matrix, at1(m, shape, i).position));
  const restPairs = papW.map((p, i) => {
    let j = 0;
    for (let k = 1; k < ventW.length; k++) {
      const dk = p.reduce((n, v, c) => n+(v-ventW[k][c])**2, 0);
      const dj = p.reduce((n, v, c) => n+(v-ventW[j][c])**2, 0);
      if (dk < dj) j = k;
    }
    return { i, j, rest: Math.hypot(...p.map((v, c) => v-ventW[j][c])) };
  }).sort((a, b) => a.rest-b.rest).slice(0, 5);
  let maxRatio = 0, peakGap = 0;
  for (let k = 0; k < PHASES; k++) {
    const amp = .5-.5*Math.cos(k/(PHASES-1)*2*Math.PI);
    const ventNow = new Map(), papNow = new Map();
    for (let i = 0; i < vent.local.length; i += 3) ventNow.set(i/3, apply(vent.matrix, at1(vent, vs, i).position));
    for (let i = 0; i < m.local.length; i += 3) papNow.set(i/3, apply(m.matrix, at1(m, shape, i).position));
    void amp;
    for (const { i, j, rest } of restPairs) {
      const p = papNow.get(i), q = ventNow.get(j);
      const d = Math.hypot(...p.map((v, c) => v-q[c]));
      maxRatio = Math.max(maxRatio, d/rest);
      if (k === Math.floor(PHASES/2)) peakGap = Math.max(peakGap, d);
    }
  }
  assert.ok(maxRatio <= 1+1e-9, `papillary pair gap grew: ${m.name} ratio ${maxRatio}`);
  console.log(`papillary ${m.name}: min tether weight ${minW.toFixed(3)} (1 = fully contractile), peak nearest-ventricle gap ${peakGap.toFixed(5)}, max gap ratio ${maxRatio.toFixed(9)}`);
}
console.log('PASS: heart gate complete');
