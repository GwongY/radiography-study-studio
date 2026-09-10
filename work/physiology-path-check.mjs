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
import {
  PATH_GLOW_FRAGMENT_GLSL, PATH_GLOW_VERTEX_GLSL, PROGRESS_ATTRIBUTES,
  derivePathRoute, deriveProgressRoute, geodesicFrom, progressBand, progressField, weldedGraph,
} from '../outputs/physiology-path.js';

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

/* --- the glow gate: weaker, and weaker in exactly the intended places ---- */
const glowRoute = (mesh, from, to, options) => deriveProgressRoute({
  positions: mesh.positions, indices: mesh.indices,
  proximal: seedNearest(mesh, from), distal: seedNearest(mesh, to), ...options,
});
{
  const straight = tubeMesh(STRAIGHT(1), .05, 40, 12, { seam: true });
  const accepted = glowRoute(straight, [0, -.5, 0], [0, .5, 0]);
  ok(accepted.accepted === true, `a straight tube carries a glow route: ${accepted.reason || ''}`);
  ok(accepted.param.length === straight.positions.length / 3, 'one parameter per vertex, seam duplicates included');
  ok(Array.from(accepted.param).every((v) => v >= 0 && v <= 1), 'the parameter never leaves [0,1]');
  ok(Math.min(...accepted.param) < .02 && Math.max(...accepted.param) > .98, 'and reaches both ends');
  ok(!('centre' in accepted) && !('tangent' in accepted) && !('bend' in accepted) && !('gradient' in accepted),
    'a glow route returns no frame: there is nothing for it to deform');
  ok(PROGRESS_ATTRIBUTES.length === 1 && PROGRESS_ATTRIBUTES[0][1] === 1, 'and its payload is one float per vertex');
  /* Monotone downstream along the true curve. */
  let monotone = true;
  for (let i = 1; i < 30; i++) {
    const before = STRAIGHT(1)((i - 1) / 30), after = STRAIGHT(1)(i / 30);
    if (accepted.param[seedNearest(straight, before)] >= accepted.param[seedNearest(straight, after)]) monotone = false;
  }
  ok(monotone, 'progress increases downstream');
  /* Reversing the anchors reverses the parameter, so direction is curated and
     not something the geometry decided on its own. */
  const back = glowRoute(straight, [0, .5, 0], [0, -.5, 0]);
  ok(back.accepted === true, 'and the same tube runs the other way when the anchors say so');
  let worstMirror = 0;
  for (let i = 0; i < accepted.param.length; i++) {
    worstMirror = Math.max(worstMirror, Math.abs(accepted.param[i] - (1 - back.param[i])));
  }
  ok(worstMirror < .02, `reversing the anchors mirrors the parameter (worst ${worstMirror.toFixed(4)})`);
}
{
  /* The four refusals both gates share, on the same inputs, with the same
     names — because they come from the same code. */
  const straight = tubeMesh(STRAIGHT(1), .05, 40, 12, { seam: true });
  const two = merge(tubeMesh(STRAIGHT(.5), .04, 20, 10), tubeMesh((u) => [.4, u * .5, 0], .04, 20, 10));
  for (const [mesh, from, to, reason] of [
    [two, [0, -.25, 0], [0, .25, 0], 'disconnected'],
    [straight, [0, -.5, 0], [0, -.5, 0], 'endpoints-not-opposed'],
  ]) {
    ok(glowRoute(mesh, from, to).reason === reason, `a glow route is refused by name too: ${reason}`);
    ok(route(mesh, from, to).reason === reason, `and the tube gate gives the identical reason: ${reason}`);
    const shared = progressField(mesh.positions, mesh.indices, seedNearest(mesh, from), seedNearest(mesh, to));
    ok(shared.reason === reason, 'because both read it off the one shared field');
  }
}
{
  /* A branch is still refused: a crest that lit two limbs at once would read as
     two crests, so this is a failure for a light as much as for a ring. */
  const trunk = tubeMesh((u) => [0, u * .5, 0], .04, 24, 12);
  const left = tubeMesh((u) => [-u * .34, .5 + u * .34, 0], .04, 24, 12);
  const right = tubeMesh((u) => [u * .34, .5 + u * .34, 0], .04, 24, 12);
  const y = merge(trunk, left, right);
  const [tBase, lBase, rBase] = y.parts.map((p) => p.base);
  const branch = joinRings(
    joinRings(y, trunk.ring(trunk.rings - 1).map((i) => i + tBase), left.ring(0).map((i) => i + lBase)),
    trunk.ring(trunk.rings - 1).map((i) => i + tBase), right.ring(0).map((i) => i + rBase),
  );
  ok(glowRoute(branch, [0, 0, 0], [.34, .84, 0]).reason === 'ambiguous-cross-section',
    'a Y junction is refused for a glow route as well');
}
{
  /*
   * And the point of the whole exercise: a stub too short to carry a ring of
   * constriction still carries a light. The tube gate refuses it because the
   * taper alone would swallow it and the fitted curvature would be fit noise;
   * neither of those exists for a glow route, so it is accepted. The aortic
   * arch is the real case — 2.9 diameters long, and the arch is exactly where
   * a wave drawn on a vertical stripe goes visibly wrong.
   */
  const stub = tubeMesh(STRAIGHT(.16), .04, 20, 14, { seam: true });
  const tube = route(stub, [0, -.08, 0], [0, .08, 0]);
  ok(tube.reason === 'route-shorter-than-its-calibre', `the tube gate refuses a two-diameter stub: ${tube.reason}`);
  const light = glowRoute(stub, [0, -.08, 0], [0, .08, 0]);
  ok(light.accepted === true, `and the glow gate accepts it: ${light.reason || ''}`);
  ok(light.length > 0, 'with a measured length for the wavelength to be read against');
}
for (const [name, curve] of [['U', U_BEND], ['S', S_BEND]]) {
  const mesh = tubeMesh(curve, .035, 60, 14, { seam: true });
  const result = glowRoute(mesh, curve(0), curve(1));
  ok(result.accepted === true, `${name}-bend carries a glow route: ${result.reason || ''}`);
  let monotone = true;
  for (let i = 1; i < 40; i++) {
    if (result.param[seedNearest(mesh, curve((i - 1) / 40))] >= result.param[seedNearest(mesh, curve(i / 40))]) monotone = false;
  }
  ok(monotone, `${name}: progress increases downstream round the bend, where a world axis would not`);
}

/* --- the travelling light itself ---------------------------------------- */
{
  ok(progressBand(0, 0) >= 0 && progressBand(0, 0) <= 1, 'the band is in [0,1]');
  for (let i = 0; i <= 20; i++) {
    const s = i / 20;
    ok(progressBand(s, .25, { waves: 1, sharp: 5 }) >= 0, `band stays non-negative at s=${s}`);
  }
  /* One crest, and it crosses the route once per cycle of phase. */
  const crestAt = (phase) => {
    let best = -1, at = 0;
    for (let i = 0; i <= 400; i++) {
      const v = progressBand(i / 400, phase, { waves: 1, sharp: 5 });
      if (v > best) { best = v; at = i / 400; }
    }
    return at;
  };
  /* Sampled inside one crossing: with waves=1 the crest sits at phase+0.25, so
     phases 0.05 to 0.65 walk it from 0.30 to 0.90 without wrapping. */
  let previous = -1, advances = 0;
  for (let k = 0; k <= 6; k++) {
    const at = crestAt(.05 + k / 10);
    if (at > previous) advances++;
    previous = at;
  }
  ok(advances === 7, `the crest advances monotonically across the route as the phase runs (${advances}/7)`);
  ok(Math.abs(crestAt(.05) - .30) < .01 && Math.abs(crestAt(.65) - .90) < .01,
    'and it is where the phase says it is, so the crest leaves the upstream end on cue');
  ok(Math.abs(progressBand(.5, .3, { waves: 1, sharp: 5 }) - progressBand(.5, 1.3, { waves: 1, sharp: 5 })) < 1e-12,
    'and the band is periodic in the phase, so a long session does not drift');
  /* Sharper means narrower: the half-width shrinks. */
  const width = (sharp) => {
    let n = 0;
    for (let i = 0; i <= 1000; i++) if (progressBand(i / 1000, .25, { waves: 1, sharp }) > .5) n++;
    return n / 1000;
  };
  ok(width(9) < width(5) && width(5) < width(3), 'a higher sharpness is a tighter crest');
}

/* --- the GLSL is the same map, and moves nothing -------------------------- */
{
  for (const token of ['attribute float aPathProgress', 'uniform float uRouteStart', 'uniform float uRouteSpan',
    'varying float vFlowS', 'float rssRouteProgress()']) {
    ok(PATH_GLOW_VERTEX_GLSL.includes(token), `the glow vertex GLSL declares ${token}`);
  }
  for (const token of ['varying float vFlowS', 'uniform float uRouteWaves', 'uniform float uRoutePhase',
    'uniform float uRouteSharp', 'float rssRouteBand(float s)', 'pow(crest,max(1.,uRouteSharp))']) {
    ok(PATH_GLOW_FRAGMENT_GLSL.includes(token), `the glow fragment GLSL declares ${token}`);
  }
  ok(!/\bposition\b|transformed|objectNormal/.test(PATH_GLOW_VERTEX_GLSL),
    'and the glow vertex GLSL never touches position, transformed or objectNormal');
  ok(!/\bfor\s*\(|\bwhile\s*\(/.test(PATH_GLOW_VERTEX_GLSL + PATH_GLOW_FRAGMENT_GLSL),
    'neither half loops: this runs per vertex and per fragment on a phone');
  ok(PATH_GLOW_FRAGMENT_GLSL.includes('6.283185307179586'), 'and the fragment carries the same 2*pi the reference uses');
}

console.log(`PASS: ${checks} path-kernel assertions (welding, degenerate faces, components, gate rejections, bent-tube frames, the glow gate and its travelling band)`);
