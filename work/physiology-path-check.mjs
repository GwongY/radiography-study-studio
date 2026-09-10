/*
 * Path kernel check — the geometry piece 4 rests on, run without a browser.
 *
 * Every case here has a known answer before the code runs: the synthetic tubes
 * are built from an analytic curve, so the true centreline, arc length and
 * tangent are known and the derived ones are compared against THOSE rather
 * than against a stored run of the same function.
 *
 * Usage: node work/physiology-path-check.mjs
 */
import assert from 'node:assert/strict';
import {
  S_BEND, STRAIGHT, U_BEND, fuse, joinRings, merge, tubeMesh, withDegenerateTriangles,
} from './lib/synthetic-tubes.mjs';
import { derivePathRoute, geodesicFrom, weldedGraph } from '../outputs/physiology-path.js';

let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };

/* --- welding ------------------------------------------------------------ */
{
  const open = tubeMesh(STRAIGHT(1), .05, 12, 10, { seam: false });
  const seamed = tubeMesh(STRAIGHT(1), .05, 12, 10, { seam: true });
  const a = weldedGraph(open.positions, open.indices);
  const b = weldedGraph(seamed.positions, seamed.indices);
  ok(a.nodeCount === 120, 'unseamed tube welds to its own vertices');
  ok(seamed.positions.length / 3 === 132, 'the seamed tube really does carry duplicates');
  ok(b.nodeCount === 120, `a UV seam welds away: ${b.nodeCount}`);
  ok(b.componentCount === 1, 'a welded tube is one component');
  ok(a.edgeCount === b.edgeCount, 'welding restores the unseamed edge set');
}

/* --- degenerate triangles ----------------------------------------------- */
{
  const mesh = withDegenerateTriangles(tubeMesh(STRAIGHT(1), .05, 8, 8));
  const g = weldedGraph(mesh.positions, mesh.indices);
  ok(g.componentCount === 1, 'zero-area triangles do not split the graph');
  const field = geodesicFrom(g, 0);
  ok(Array.from(field).every(Number.isFinite), 'no infinite or NaN distance from a degenerate face');
}

/* --- disconnected components are not silently ordered -------------------- */
{
  const two = merge(tubeMesh(STRAIGHT(.5), .04, 8, 8), tubeMesh((u) => [.4, u * .5, 0], .04, 8, 8));
  const g = weldedGraph(two.positions, two.indices);
  ok(g.componentCount === 2, 'two tubes in one mesh are two components');
  const field = geodesicFrom(g, 0);
  ok(Array.from(field).some((d) => !Number.isFinite(d)), 'the far component is unreachable, not distance zero');
}

/* --- the gate: what it accepts and what it refuses ----------------------- */
const seedNearest = (mesh, target) => {
  let best = Infinity, index = 0;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    const d = Math.hypot(mesh.positions[i] - target[0], mesh.positions[i + 1] - target[1], mesh.positions[i + 2] - target[2]);
    if (d < best) { best = d; index = i / 3; }
  }
  return index;
};
const route = (mesh, from, to, options) => derivePathRoute({
  positions: mesh.positions, indices: mesh.indices,
  proximal: seedNearest(mesh, from), distal: seedNearest(mesh, to), ...options,
});
{
  const straight = tubeMesh(STRAIGHT(1), .05, 40, 12, { seam: true });
  const accepted = route(straight, [0, -.5, 0], [0, .5, 0]);
  ok(accepted.accepted === true, `a straight tube is accepted: ${accepted.reason || ''}`);

  const two = merge(tubeMesh(STRAIGHT(.5), .04, 20, 10), tubeMesh((u) => [.4, u * .5, 0], .04, 20, 10));
  ok(route(two, [0, -.25, 0], [0, .25, 0]).reason === 'disconnected', 'a disconnected mesh is rejected by name');

  /* A real bifurcation: one component, sharing the junction edge loop. */
  const trunk = tubeMesh((u) => [0, u * .5, 0], .04, 24, 12);
  const left = tubeMesh((u) => [-u * .34, .5 + u * .34, 0], .04, 24, 12);
  const right = tubeMesh((u) => [u * .34, .5 + u * .34, 0], .04, 24, 12);
  const y = merge(trunk, left, right);
  const [tBase, lBase, rBase] = y.parts.map((p) => p.base);
  const branch = joinRings(
    joinRings(y, trunk.ring(trunk.rings - 1).map((i) => i + tBase), left.ring(0).map((i) => i + lBase)),
    trunk.ring(trunk.rings - 1).map((i) => i + tBase), right.ring(0).map((i) => i + rBase),
  );
  const yResult = route(branch, [0, 0, 0], [.34, .84, 0]);
  ok(yResult.reason === 'ambiguous-cross-section',
    `a Y junction is rejected rather than averaged into a centreline between the limbs: ${JSON.stringify(yResult).slice(0, 140)}`);

  const sameEnd = route(straight, [0, -.5, 0], [0, -.5, 0]);
  ok(sameEnd.reason === 'endpoints-not-opposed', 'both anchors at one end is rejected');
}

/* --- a fused shortcut across a bend -------------------------------------- */
{
  /* Two limbs of a hairpin that TOUCH: welding fuses them, so surface distance
     jumps the gap and the far limb reads as adjacent to the near one. */
  const gap = .09;
  const down = tubeMesh((u) => [0, .3 - u * .6, 0], .03, 40, 12);
  const bend = tubeMesh((u) => [gap * .5 * (1 - Math.cos(Math.PI * u)), -.3 - gap * .5 * Math.sin(Math.PI * u), 0], .03, 12, 12);
  const up = tubeMesh((u) => [gap, -.3 + u * .6, 0], .03, 40, 12);
  const hairpin = merge(down, bend, up);
  const [dBase, bBase, uBase] = hairpin.parts.map((p) => p.base);
  let joined = joinRings(hairpin, down.ring(down.rings - 1).map((i) => i + dBase), bend.ring(0).map((i) => i + bBase));
  joined = joinRings(joined, bend.ring(bend.rings - 1).map((i) => i + bBase), up.ring(0).map((i) => i + uBase));
  const clean = route(joined, [0, .3, 0], [gap, .3, 0]);
  ok(clean.accepted === true, `the clean hairpin is a legitimate route: ${clean.reason || ''}`);
  /* Now fuse one vertex of the descending limb onto the ascending limb, the way
     a welded export does, and the same route must stop being accepted. */
  const contact = fuse(joined, dBase + down.ring(20)[0], uBase + up.ring(20)[6]);
  const result = route(contact, [0, .3, 0], [gap, .3, 0]);
  ok(result.accepted !== true, `a fused hairpin is not silently accepted: ${JSON.stringify(result).slice(0, 140)}`);
}

/* --- bends are accepted and keep their own local direction --------------- */
for (const [name, curve] of [['U', U_BEND], ['S', S_BEND]]) {
  const mesh = tubeMesh(curve, .035, 60, 14, { seam: true });
  const result = route(mesh, curve(0), curve(1));
  ok(result.accepted === true, `${name}-bend accepted: ${result.reason || ''}`);
  const n = mesh.positions.length / 3;
  ok(result.param.length === n, `${name}: one parameter per vertex`);
  ok(result.centre.length === n * 3 && result.tangent.length === n * 3, `${name}: a frame per vertex`);
  /* Monotone ALONG THE ROUTE, not along a world axis: the U bend doubles back
     in y, so a world-Y test would pass on the wrong thing. */
  let monotone = true;
  for (let i = 1; i < 40; i++) {
    const before = curve((i - 1) / 40), after = curve(i / 40);
    if (result.param[seedNearest(mesh, before)] >= result.param[seedNearest(mesh, after)]) monotone = false;
  }
  ok(monotone, `${name}: sampling the true curve downstream gives increasing parameter`);
  /* The stored tangent is the curve's own tangent, not the bounding-box axis. */
  let worst = 0;
  for (let i = 0; i < n; i++) {
    const s = result.param[i], h = 1e-3;
    const a = curve(Math.max(0, s - h)), b = curve(Math.min(1, s + h));
    const t = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], len = Math.hypot(...t) || 1;
    const dot = t.reduce((acc, v, k) => acc + (v / len) * result.tangent[i * 3 + k], 0);
    worst = Math.max(worst, 1 - dot);
  }
  ok(worst < .04, `${name}: stored tangent follows the curve (worst 1-cos = ${worst.toFixed(4)})`);
  ok(Array.from(result.gradient).every(Number.isFinite) && Array.from(result.bend).every(Number.isFinite),
    `${name}: gradient and bend are finite everywhere`);
}

console.log(`PASS: ${checks} path-kernel assertions (welding, degenerate faces, components, gate rejections, bent-tube frames)`);
