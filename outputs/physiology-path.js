/*
 * Tube paths — pure rest-space route geometry, no three.js and no DOM.
 *
 * A travelling ring of constriction only reads as peristalsis if it is a ring
 * around the TUBE. The earlier profile squeezed every gut mesh toward one
 * global bounding-box axis, which on a bent structure pinches it toward a line
 * that leaves the lumen entirely. What is needed instead is a local frame:
 * where along the tube a vertex sits, where the centre of the tube is THERE,
 * and which way the tube is pointing THERE.
 *
 * None of that can be read off a bounding box, and surface distance alone does
 * not supply it either — a fused or coiled mesh contains shortcuts, so two
 * points close across the surface may be far apart along the tube. So every
 * route is derived offline, gated, and either accepted with evidence or
 * rejected by name; a rejected mesh keeps the existing illustrative motion.
 *
 * Rest-space only. Rate, wave width and amplitude are display parameters.
 */

const KEY_SCALE = 1e6;   /* matches transmissionField's welding tolerance */

function checkMesh(positions, indices) {
  if (!positions?.length || positions.length % 3) throw new RangeError('positions must contain xyz triples');
  if (indices && indices.length % 3) throw new RangeError('indices must contain triangles');
}

/**
 * Coincident vertices are one node: a UV or normal seam is a duplicate in the
 * buffer and a single point on the surface, and leaving it split runs the
 * distance field the long way round the tube.
 */
export function weldedGraph(positions, indices) {
  checkMesh(positions, indices);
  const count = positions.length / 3, ids = new Uint32Array(count), lookup = new Map();
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) throw new RangeError('positions must be finite');
    const key = Math.round(x * KEY_SCALE) + ',' + Math.round(y * KEY_SCALE) + ',' + Math.round(z * KEY_SCALE);
    let id = lookup.get(key);
    if (id === undefined) { id = nodes.length; lookup.set(key, id); nodes.push([x, y, z]); }
    ids[i] = id;
  }
  const adjacency = nodes.map(() => new Map());
  const order = indices || Array.from({ length: count }, (_, i) => i);
  let edgeCount = 0;
  const connect = (a, b) => {
    a = ids[a]; b = ids[b];
    if (a === b || adjacency[a].has(b)) return;      /* degenerate face, or already joined */
    const d = Math.hypot(nodes[a][0] - nodes[b][0], nodes[a][1] - nodes[b][1], nodes[a][2] - nodes[b][2]);
    adjacency[a].set(b, d); adjacency[b].set(a, d); edgeCount++;
  };
  for (let i = 0; i + 2 < order.length; i += 3) {
    connect(order[i], order[i + 1]); connect(order[i + 1], order[i + 2]); connect(order[i + 2], order[i]);
  }
  /*
   * Boundary edges — the ones with a single face — are how an OPEN tube's ends
   * are found. Seeding the distance field at a single vertex on such a rim
   * measures distance from a point ON the rim, so the first shells are little
   * discs around that point rather than cross-sections, and the derived centre
   * and tangent are wrong for the whole first tenth of the route. Measured: the
   * worst tangent error fell from 0.17 to under 0.01 when the field was seeded
   * from the whole opening instead. A closed mesh has no boundary and keeps the
   * single seed, which on a capped end is already on the axis.
   */
  const faces = new Map();
  const edgeKey = (a, b) => (a < b ? a + ':' + b : b + ':' + a);
  const face = (a, b) => { const k = edgeKey(ids[a], ids[b]); faces.set(k, (faces.get(k) || 0) + 1); };
  for (let i = 0; i + 2 < order.length; i += 3) {
    if (ids[order[i]] === ids[order[i + 1]] || ids[order[i + 1]] === ids[order[i + 2]] || ids[order[i + 2]] === ids[order[i]]) continue;
    face(order[i], order[i + 1]); face(order[i + 1], order[i + 2]); face(order[i + 2], order[i]);
  }
  const boundary = new Map();
  for (const [key, count] of faces) {
    if (count !== 1) continue;
    const [a, b] = key.split(':').map(Number);
    if (!boundary.has(a)) boundary.set(a, []);
    if (!boundary.has(b)) boundary.set(b, []);
    boundary.get(a).push(b); boundary.get(b).push(a);
  }
  const loops = [], visitedRim = new Set();
  for (const start of boundary.keys()) {
    if (visitedRim.has(start)) continue;
    const stack = [start], loop = []; visitedRim.add(start);
    while (stack.length) {
      const a = stack.pop(); loop.push(a);
      for (const b of boundary.get(a)) if (!visitedRim.has(b)) { visitedRim.add(b); stack.push(b); }
    }
    loops.push(loop);
  }

  const component = new Int32Array(nodes.length).fill(-1);
  let componentCount = 0;
  for (let i = 0; i < nodes.length; i++) {
    if (component[i] >= 0) continue;
    const stack = [i]; component[i] = componentCount;
    while (stack.length) {
      const a = stack.pop();
      for (const b of adjacency[a].keys()) if (component[b] < 0) { component[b] = componentCount; stack.push(b); }
    }
    componentCount++;
  }
  return { ids, nodes, adjacency, component, componentCount, edgeCount, loops, nodeCount: nodes.length };
}

/** Dijkstra over the welded surface. Unreachable stays Infinity — a separate
 *  component has no distance from this seed, and must not read as zero. */
export function geodesicFrom(graph, seed) {
  const { adjacency } = graph;
  const seeds = Array.isArray(seed) ? seed : [seed];
  if (!seeds.length || !seeds.every((s) => Number.isInteger(s) && s >= 0 && s < adjacency.length)) {
    throw new RangeError('seed must be a node index, or a non-empty array of them');
  }
  const dist = new Float64Array(adjacency.length).fill(Infinity), heap = seeds.map((s) => [0, s]);
  const push = (v) => { heap.push(v); let i = heap.length - 1; while (i) { const p = (i - 1) >> 1; if (heap[p][0] <= v[0]) break; heap[i] = heap[p]; i = p; } heap[i] = v; };
  const pop = () => { const first = heap[0], last = heap.pop(); if (heap.length) { let i = 0; while (i * 2 + 1 < heap.length) { let c = i * 2 + 1; if (c + 1 < heap.length && heap[c + 1][0] < heap[c][0]) c++; if (heap[c][0] >= last[0]) break; heap[i] = heap[c]; i = c; } heap[i] = last; } return first; };
  for (const s of seeds) dist[s] = 0;
  while (heap.length) {
    const [d, a] = pop();
    if (d !== dist[a]) continue;
    for (const [b, w] of adjacency[a]) if (d + w < dist[b]) { dist[b] = d + w; push([d + w, b]); }
  }
  return dist;
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const norm = (a) => Math.hypot(a[0], a[1], a[2]);
const unit = (a) => { const n = norm(a); return n > 1e-12 ? scale(a, 1 / n) : [0, 0, 0]; };
const median = (values) => { const s = Array.from(values).sort((a, b) => a - b); return s.length ? s[s.length >> 1] : 0; };

/**
 * Centroid per band of surface distance, plus the diagnostic that decides
 * whether a band is a cross-section at all.
 *
 * Radial spread was the obvious test and it is not sufficient: a SYMMETRIC
 * bifurcation puts its centroid neatly between the two limbs, so every member
 * is about equally far from it and the spread reads as a clean ring. What
 * distinguishes them is connectivity — a real cross-section is ONE ring of
 * surface, a shell that has caught two limbs is two. So each band is re-walked
 * over the mesh's own adjacency and its significant clusters counted.
 */
export function stationsOf(graph, field, count) {
  const bands = Array.from({ length: count }, () => []);
  let max = 0;
  for (const d of field) if (Number.isFinite(d) && d > max) max = d;
  if (!(max > 0)) return { points: [], spread: [], limbs: [], counts: [], max: 0 };
  for (let i = 0; i < field.length; i++) {
    if (!Number.isFinite(field[i])) continue;
    bands[Math.min(count - 1, Math.floor(field[i] / max * count))].push(i);
  }
  const points = [], spread = [], limbs = [], counts = [];
  for (const band of bands) {
    if (!band.length) continue;
    const centre = [0, 0, 0];
    for (const n of band) for (let k = 0; k < 3; k++) centre[k] += graph.nodes[n][k] / band.length;
    const radii = band.map((n) => norm(sub(graph.nodes[n], centre)));
    const mid = median(radii);
    points.push(centre); counts.push(band.length);
    spread.push(band.length >= 4 && mid > 1e-9 ? Math.max(...radii) / mid : 1);
    const inBand = new Set(band), seen = new Set();
    let significant = 0;
    for (const start of band) {
      if (seen.has(start)) continue;
      const stack = [start]; seen.add(start); let size = 0;
      while (stack.length) {
        const a = stack.pop(); size++;
        for (const b of graph.adjacency[a].keys()) if (inBand.has(b) && !seen.has(b)) { seen.add(b); stack.push(b); }
      }
      if (size >= band.length * .25) significant++;
    }
    limbs.push(significant);
  }
  return { points, spread, limbs, counts, max };
}

/** Uniform arc-length resampling, so the parameter is proportional to distance
 *  travelled along the tube rather than to however the stations happened to fall. */
export function resampleArcLength(points, count) {
  if (points.length < 2) return { points: points.map((p) => p.slice()), cumulative: [0], total: 0 };
  const cumulative = [0];
  for (let i = 1; i < points.length; i++) cumulative.push(cumulative[i - 1] + norm(sub(points[i], points[i - 1])));
  const total = cumulative[cumulative.length - 1];
  if (!(total > 0)) return { points: points.map((p) => p.slice()), cumulative, total: 0 };
  const out = [];
  let j = 0;
  for (let i = 0; i < count; i++) {
    const target = total * i / (count - 1);
    while (j + 2 < points.length && cumulative[j + 1] < target) j++;
    const span = cumulative[j + 1] - cumulative[j] || 1;
    const t = Math.min(1, Math.max(0, (target - cumulative[j]) / span));
    out.push(points[j].map((v, k) => v + (points[j + 1][k] - v) * t));
  }
  return { points: out, cumulative: out.map((_, i) => total * i / (count - 1)), total };
}

/* Smoothing the station centroids: they are noisy at the scale of one triangle,
   and the curvature vector below is a second difference of them. */
function smooth(points, passes) {
  let current = points.map((p) => p.slice());
  for (let pass = 0; pass < passes; pass++) {
    const next = current.map((p) => p.slice());
    for (let i = 1; i + 1 < current.length; i++) {
      for (let k = 0; k < 3; k++) next[i][k] = .25 * current[i - 1][k] + .5 * current[i][k] + .25 * current[i + 1][k];
    }
    current = next;
  }
  return current;
}

/**
 * Frame at normalised progress s along a resampled centreline: centre, unit
 * tangent, and dT/ds.
 *
 * The stencil is in units of s, and it matters. A resampled curve is dense
 * SAMPLES of a sparse polyline, so consecutive samples inside one segment are
 * collinear and every station join is a corner: differencing neighbouring
 * samples returns zero curvature almost everywhere and a spike at each join.
 * That spike is what refused three of the four colon segments outright, with
 * `L - b.r` driven negative by a curvature the tube does not have. Measuring
 * over one station's worth of arc instead gives the curvature at the scale the
 * tube is actually bent on.
 */
export function pointAt(curve, s) {
  const n = curve.length;
  const x = Math.min(n - 1, Math.max(0, s * (n - 1)));
  const i = Math.min(n - 2, Math.floor(x)), t = x - i;
  return curve[i].map((v, k) => v + (curve[i + 1][k] - v) * t);
}
export function frameAt(curve, s, stencil = 1 / 16) {
  const h = Math.min(.25, Math.max(1 / (curve.length - 1), stencil));
  const centre = pointAt(curve, s);
  const back = pointAt(curve, Math.max(0, s - h)), forward = pointAt(curve, Math.min(1, s + h));
  const behind = unit(sub(centre, back)), ahead = unit(sub(forward, centre));
  const tangent = unit(sub(forward, back));
  const bend = sub(ahead, behind).map((v) => v / h);      /* dT/ds, s in [0,1] */
  return { centre, tangent, bend };
}

/** grad(s) for the perpendicular-plane assignment. Differentiating the
 *  constraint (x - c(s)).T(s) = 0 gives grad(s) = T / (L - b.r). The
 *  denominator vanishes at the centre of curvature, which is exactly where
 *  this parametrisation stops being single-valued, so the gate refuses a route
 *  whose surface reaches it. */
export function pathGradient(tangent, bend, radial, total) {
  const denominator = total - dot(bend, radial);
  return { gradient: scale(tangent, 1 / denominator), denominator };
}

/**
 * The discovery gate. Returns an accepted route carrying a per-vertex frame,
 * or a refusal naming the topology it could not read. A refusal is a result,
 * not a failure: the caller keeps the existing illustrative animation.
 */
export function derivePathRoute({ positions, indices, proximal, distal, spreadRatio = 2.6, crowdRatio = 6, offsetRatio = 3.2, selfClearance = 1.15, minCalibres = 3, stepRatio = 3, samples = 160, smoothing = 2 }) {
  checkMesh(positions, indices);
  const graph = weldedGraph(positions, indices);
  if (graph.componentCount !== 1) return { accepted: false, reason: 'disconnected', components: graph.componentCount };
  const seed = graph.ids[proximal], target = graph.ids[distal];
  if (seed === undefined || target === undefined) return { accepted: false, reason: 'anchor-not-resolved' };
  /* Seed the whole opening an anchor sits on, not the one vertex it landed on. */
  const rimOf = (node) => { const loop = graph.loops.find((l) => l.includes(node)); return loop && loop.length >= 3 ? loop : node; };
  const fromProximal = geodesicFrom(graph, rimOf(seed));
  let extent = 0;
  for (const d of fromProximal) if (d > extent) extent = d;
  if (!(extent > 0)) return { accepted: false, reason: 'degenerate-extent' };
  /*
   * The distal anchor has to be at the far end, but "far" is a percentile, not
   * the argmax: on a fat, haustrated mesh the single most distant vertex is
   * often a pocket somewhere off to the side, and requiring the anchor to BE
   * that vertex refused the ascending colon at 0.52 of a maximum reached inside
   * a haustrum. The top decile is the same test without that accident.
   */
  const reachable = Array.from(fromProximal).filter(Number.isFinite).sort((a, b) => a - b);
  const decile = reachable[Math.floor(reachable.length * .9)] || extent;
  if (fromProximal[target] < decile) {
    return { accepted: false, reason: 'endpoints-not-opposed', reach: fromProximal[target] / extent, decile: decile / extent };
  }
  /*
   * Progress is the BALANCE of the two end distances, not the distance from one
   * end. Surface distance from a single end is longer round the outside of a
   * bend than the inside, so its far level sets arrive tilted and their
   * centroids slide off the lumen — measured, the last stretch of a U bend came
   * out with a tangent 35 degrees wrong and a centre half a tube-radius off
   * axis. The two fields carry that bias in opposite directions, so their ratio
   * cancels most of it and pins the ends at exactly 0 and 1.
   */
  const fromDistal = geodesicFrom(graph, rimOf(target));
  const field = new Float64Array(graph.nodeCount);
  for (let n = 0; n < graph.nodeCount; n++) {
    const a = fromProximal[n], b = fromDistal[n];
    field[n] = Number.isFinite(a) && Number.isFinite(b) && a + b > 0 ? a / (a + b) : NaN;
  }
  const spacing = 2 * median(Array.from(graph.adjacency, (m) => median(m.values())).filter((v) => v > 0));
  const bands = Math.min(512, Math.max(8, Math.round(extent / (spacing || extent))));
  const stations = stationsOf(graph, field, bands);
  if (stations.points.length < 4) return { accepted: false, reason: 'too-few-stations', stations: stations.points.length };
  /*
   * Three independent ways a band can fail to be a cross-section, because no
   * one of them catches all three shapes that matter here.
   *
   *  crowded  one band holding many times its neighbours' share of the surface.
   *           This is the branch signature: at a bifurcation the whole far limb
   *           folds back into the trunk's range of progress, so a single band
   *           swallows it. Measured on a symmetric Y: 294 nodes against a median
   *           of 20, while both other tests read clean.
   *  split    a band that is two disconnected rings of surface. This is the
   *           fusion signature — a welded contact between two limbs.
   *  wide     a band whose members are not equidistant from their own centroid,
   *           i.e. not a ring at all.
   */
  /*
   * Crowding is the branch signature: at a bifurcation the whole far limb folds
   * back into the trunk's range of progress, so one band swallows it. Measured
   * on a symmetric Y, 294 nodes against a median of 20 — while the radial
   * spread of that same band read a clean 2.0, because a symmetric fork puts
   * its centroid neatly between the limbs.
   *
   * Band CONNECTIVITY was tried as the second test and dropped as a gate: on a
   * real 203-vertex oesophagus a band is two or three coarse rings that are not
   * joined to each other inside the band, so it refused six of ten bands on a
   * mesh that is a perfectly good tube. It is still reported, because on a fine
   * mesh it is the fusion signature; the gate that survives coarse geometry is
   * the offset test further down, measured against the FITTED centreline
   * instead of a band centroid.
   */
  const worstSpread = Math.max(...stations.spread);
  const midCount = median(stations.counts), worstCount = Math.max(...stations.counts);
  const crowding = midCount > 0 ? worstCount / midCount : 0;
  const split = stations.limbs.filter((n) => n > 1).length;
  const wide = stations.spread.filter((r) => r > spreadRatio).length;
  if (crowding > crowdRatio) {
    return { accepted: false, reason: 'ambiguous-cross-section', crowding, split, wide, stations: stations.spread.length, worstSpread };
  }
  const steps = stations.points.slice(1).map((p, i) => norm(sub(p, stations.points[i])));
  const midStep = median(steps), worstStep = Math.max(...steps);
  if (midStep > 0 && worstStep > stepRatio * midStep) {
    return { accepted: false, reason: 'centreline-discontinuous', worstStep: worstStep / midStep };
  }
  const resampled = resampleArcLength(smooth(stations.points, smoothing), samples);
  if (!(resampled.total > 0)) return { accepted: false, reason: 'degenerate-extent' };
  const curve = resampled.points, total = resampled.total;

  /*
   * Per node: start from the surface-distance ordering, then refine to the
   * perpendicular foot on the centreline WITHIN that window. Refining over the
   * whole curve is exactly what lets a hairpin's far limb capture the near
   * limb's vertices, which is the failure this window exists to prevent.
   */
  /* One station's worth of arc: the scale this centreline actually resolves. */
  const stencil = Math.min(.25, Math.max(2 / samples, 1 / Math.max(4, stations.points.length - 1)));
  const window = Math.max(.05, 4 / samples);
  const nodeParam = new Float64Array(graph.nodeCount);
  const nodeOffset = new Float64Array(graph.nodeCount);
  for (let n = 0; n < graph.nodeCount; n++) {
    const guess = Number.isFinite(field[n]) ? field[n] : 0;
    let best = guess, bestDistance = Infinity;
    const lo = Math.max(0, Math.floor((guess - window) * (samples - 1)));
    const hi = Math.min(samples - 2, Math.ceil((guess + window) * (samples - 1)));
    for (let i = lo; i <= hi; i++) {
      const a = curve[i], b = curve[i + 1], ab = sub(b, a), len2 = dot(ab, ab) || 1e-18;
      const t = Math.min(1, Math.max(0, dot(sub(graph.nodes[n], a), ab) / len2));
      const foot = a.map((v, k) => v + ab[k] * t);
      const d = norm(sub(graph.nodes[n], foot));
      if (d < bestDistance) { bestDistance = d; best = (i + t) / (samples - 1); }
    }
    nodeParam[n] = best; nodeOffset[n] = bestDistance;
  }

  /*
   * Is the surface actually a tube AROUND this centreline? Each node's
   * perpendicular offset is its local radius, and a fold, a crossed coil, or a
   * limb the centreline never entered shows up as an offset far outside what
   * the tube is doing THERE.
   *
   * Against the route's overall median this refused the right ureter at a ratio
   * of 4.9 — for the funnel of the renal pelvis, which is a real part of a real
   * ureter and five times the calibre of its middle. Compared with its own
   * neighbourhood instead, a flare reads as a flare and a crossing still reads
   * as a crossing.
   */
  const lanes = Array.from({ length: Math.max(4, stations.points.length) }, () => []);
  for (let n = 0; n < graph.nodeCount; n++) {
    lanes[Math.min(lanes.length - 1, Math.floor(nodeParam[n] * lanes.length))].push(nodeOffset[n]);
  }
  let bulge = 0, radius = 0;
  const calibre = lanes.map((lane) => (lane.length >= 4 ? median(lane) : 0));
  for (let i = 0; i < calibre.length; i++) if (!calibre[i]) calibre[i] = median(calibre.filter(Boolean)) || 0;
  for (const lane of lanes) {
    if (lane.length < 4) continue;
    const mid = median(lane);
    radius = Math.max(radius, mid);
    if (mid > 1e-9) bulge = Math.max(bulge, Math.max(...lane) / mid);
  }
  const radiusAt = (t) => calibre[Math.min(calibre.length - 1, Math.max(0, Math.floor(t * calibre.length)))] || radius;
  if (bulge > offsetRatio) {
    return { accepted: false, reason: 'not-a-tube-about-this-path', bulge, radius };
  }

  /*
   * A route has to be longer than the tube is wide before a travelling ring
   * means anything: the taper alone occupies a quarter of it, and the curvature
   * of a fit this short is dominated by the fit's own noise rather than by the
   * tube. The sigmoid segment lands here — the descending colon overlaps it, so
   * the nearest-vertex anchor falls in its middle and the balanced field then
   * fits a centreline two diameters long across a mesh spanning six.
   */
  if (total < minCalibres * 2 * radius) {
    return { accepted: false, reason: 'route-shorter-than-its-calibre', length: total, radius, calibres: total / (2 * radius) };
  }

  /*
   * And does the route come back alongside itself? The parameter is refined
   * within a window of the surface-distance estimate precisely so a fold cannot
   * capture the wrong limb, but that window is only a defence while the two
   * limbs are further apart than a tube is wide. Where a centreline passes
   * within a calibre of a part of itself it is far from, the assignment is a
   * guess, and a wave drawn on it can appear to jump between adjacent loops.
   */
  let clearance = Infinity, closestGap = 0;
  for (let i = 0; i < curve.length; i++) {
    const si = i / (curve.length - 1);
    for (let j = i + 1; j < curve.length; j++) {
      const sj = j / (curve.length - 1);
      const width = Math.max(1e-9, radiusAt(si) + radiusAt(sj));
      /* Only pairs that are a long way apart ALONG the tube. Two points a
         calibre apart on a straight tube are a calibre apart in space, so
         comparing every pair measures tube width and calls it a fold. */
      if ((sj - si) * total < 4 * width) continue;
      const ratio = norm(sub(curve[i], curve[j])) / width;
      if (ratio < clearance) { clearance = ratio; closestGap = sj - si; }
    }
  }
  if (!Number.isFinite(clearance)) clearance = Infinity;   /* shorter than four calibres: nothing to fold back on */
  if (clearance < selfClearance) {
    return { accepted: false, reason: 'route-self-adjacent', clearance, radius, gap: closestGap };
  }

  const count = positions.length / 3;
  const param = new Float32Array(count), centre = new Float32Array(count * 3);
  const tangent = new Float32Array(count * 3), bend = new Float32Array(count * 3), gradient = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const s = nodeParam[graph.ids[i]];
    const frame = frameAt(curve, s, stencil);
    const point = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
    const offset = sub(point, frame.centre);
    const radial = offset.map((v, k) => v - dot(offset, frame.tangent) * frame.tangent[k]);
    const { gradient: g, denominator } = pathGradient(frame.tangent, frame.bend, radial, total);
    if (!(denominator > total * .1) || !g.every(Number.isFinite)) {
      return { accepted: false, reason: 'degenerate-frame', vertex: i, denominator, total };
    }
    param[i] = s;
    for (let k = 0; k < 3; k++) {
      centre[i * 3 + k] = frame.centre[k]; tangent[i * 3 + k] = frame.tangent[k];
      bend[i * 3 + k] = frame.bend[k]; gradient[i * 3 + k] = g[k];
    }
  }
  return {
    accepted: true, param, centre, tangent, bend, gradient,
    length: total, curve, radius, stencil, stations: stations.points.length,
    worstSpread, crowding, split, bulge, clearance, worstStep: midStep > 0 ? worstStep / midStep : 0, surfaceExtent: extent,
  };
}

/*
 * The travelling constriction.
 *
 * `taper` is what keeps a segment boundary from popping: the amplitude and its
 * ds derivative both reach zero at each end of the route, so the oesophagus and
 * the stomach it runs into do not shear against each other at the join.
 *
 * Amplitude, wave count, travel rate and crest sharpness are DISPLAY choices.
 * The sources cited for these routes give the direction and the mechanism — a
 * ring of circular-muscle contraction passing along the tube — and say nothing
 * about how fast or how deep to draw it.
 */
const TWO_PI = 6.283185307179586;
export function peristalticWave(param, time, { amplitude = 0, waves = 2, travel = 0, dir = 1, sharp = 4, taperWidth = .12 }) {
  if (!(amplitude > 0)) return { value: 0, derivative: 0 };
  const edge = Math.min(.49, Math.max(1e-6, taperWidth));
  const up = Math.min(1, Math.max(0, param / edge)), down = Math.min(1, Math.max(0, (1 - param) / edge));
  const taper = up * up * (3 - 2 * up) * (down * down * (3 - 2 * down));
  const taperDerivative = 6 * up * (1 - up) / edge * (down * down * (3 - 2 * down))
    - (up * up * (3 - 2 * up)) * 6 * down * (1 - down) / edge;
  const power = Math.max(1, sharp);
  const phase = TWO_PI * waves * (param - dir * travel * time);
  const crest = Math.max(0, .5 + .5 * Math.sin(phase));
  const ring = Math.pow(crest, power);
  const ringDerivative = crest < 1e-5 ? 0
    : power * Math.pow(Math.max(crest, 1e-5), power - 1) * .5 * Math.cos(phase) * TWO_PI * waves;
  return { value: amplitude * taper * ring, derivative: amplitude * (taperDerivative * ring + taper * ringDerivative) };
}

/*
 * x' = x - w(s) r, where r is the offset from the LOCAL tube centre with the
 * local tangent component removed. Replacing the old global axis with a path
 * parameter but keeping the global radial vector would still squeeze a bend
 * toward a line outside the lumen; the whole point is that both the centre and
 * the direction are local.
 *
 * The Jacobian carries the spatial variation of the frame as well as of the
 * amplitude: c, T and w are all functions of s, and s is a function of x, so
 *   dr/dx = I - T (L g + da)^T - b (a g)^T,   dw/dx = w'(s) g,
 * with g = grad(s) = T / (L - b.r) and da = T + (b.u - L) g. Dropping those
 * terms and scaling the normal by the amplitude alone lights a moving band
 * that does not match the surface it is on.
 *
 * Returned in column-major order, so the same nine numbers can be read as a
 * GLSL mat3 without transposing on the way.
 */
export function pathDeformation({ position, normal, centre, tangent, bend, length, wave }) {
  if (!wave || (wave.value === 0 && wave.derivative === 0)) {
    return { position: Array.from(position), normal: Array.from(normal), determinant: 1, jacobian: [1, 0, 0, 0, 1, 0, 0, 0, 1] };
  }
  const offset = sub(position, centre);
  const along = dot(offset, tangent);
  const radial = offset.map((v, k) => v - along * tangent[k]);
  const { gradient } = pathGradient(tangent, bend, radial, length);
  const w = wave.value, ws = wave.derivative;
  const da = tangent.map((v, k) => v + (dot(bend, offset) - length) * gradient[k]);
  const jacobian = new Array(9);
  for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) {
    jacobian[c * 3 + r] = (c === r ? 1 - w : 0)
      + w * tangent[r] * (length * gradient[c] + da[c])
      + w * bend[r] * along * gradient[c]
      - radial[r] * ws * gradient[c];
  }
  const column = (c) => [jacobian[c * 3], jacobian[c * 3 + 1], jacobian[c * 3 + 2]];
  const j0 = column(0), j1 = column(1), j2 = column(2);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const c0 = cross(j1, j2), c1 = cross(j2, j0), c2 = cross(j0, j1);
  const moved = [0, 1, 2].map((r) => c0[r] * normal[0] + c1[r] * normal[1] + c2[r] * normal[2]);
  const scaleBack = norm(moved) || 1;
  return {
    position: position.map((v, k) => v - w * radial[k]),
    normal: moved.map((v) => v / scaleBack),
    determinant: dot(j0, c0),
    jacobian,
  };
}

/* The per-vertex payload, in the order the generator writes and the loader
   binds. Changing this list changes the payload format, so it is one list. */
export const PATH_ATTRIBUTES = [
  ['aPathParam', 1], ['aPathCentre', 3], ['aPathTangent', 3], ['aPathBend', 3],
];

/*
 * The same map again in GLSL, for the material patch. It is written once here
 * and used by BOTH the position and the normal patch, so the two cannot drift
 * apart the way separately written shader halves do.
 */
export const PATH_SHAPE_GLSL = `
attribute float aPathParam;
attribute vec3 aPathCentre;
attribute vec3 aPathTangent;
attribute vec3 aPathBend;
uniform float uPathLength;
uniform float uPathWaves;
uniform float uPathTravel;
uniform float uPathTaper;
uniform float uPathSharp;
vec2 rssPathWave(float s,float amplitude){
  if(amplitude<=0.)return vec2(0.);
  float edge=clamp(uPathTaper,0.000001,.49);
  float up=clamp(s/edge,0.,1.),down=clamp((1.-s)/edge,0.,1.);
  float su=up*up*(3.-2.*up),sd=down*down*(3.-2.*down);
  float taper=su*sd;
  float taperD=6.*up*(1.-up)/edge*sd-su*6.*down*(1.-down)/edge;
  float power=max(1.,uPathSharp);
  float phase=6.283185307*uPathWaves*(s-uDir*uPathTravel*uT);
  float crest=max(0.,.5+.5*sin(phase));
  float ring=pow(crest,power);
  float ringD=(crest<0.00001)?0.:power*pow(max(crest,0.00001),power-1.)*.5*cos(phase)*6.283185307*uPathWaves;
  return vec2(amplitude*taper*ring,amplitude*(taperD*ring+taper*ringD));
}
mat3 rssPathDeform(inout vec3 x,float amplitude){
  vec2 w=rssPathWave(aPathParam,amplitude);
  if(w.x==0.&&w.y==0.)return mat3(1.);
  vec3 u=x-aPathCentre;
  float along=dot(u,aPathTangent);
  vec3 radial=u-along*aPathTangent;
  vec3 g=aPathTangent/(uPathLength-dot(aPathBend,radial));
  vec3 da=aPathTangent+(dot(aPathBend,u)-uPathLength)*g;
  vec3 axialTerm=w.x*aPathTangent;
  mat3 J;
  J[0]=vec3(1.-w.x,0.,0.)+axialTerm*(uPathLength*g.x+da.x)+aPathBend*(w.x*along*g.x)-radial*(w.y*g.x);
  J[1]=vec3(0.,1.-w.x,0.)+axialTerm*(uPathLength*g.y+da.y)+aPathBend*(w.x*along*g.y)-radial*(w.y*g.y);
  J[2]=vec3(0.,0.,1.-w.x)+axialTerm*(uPathLength*g.z+da.z)+aPathBend*(w.x*along*g.z)-radial*(w.y*g.z);
  x-=w.x*radial;
  return mat3(cross(J[1],J[2]),cross(J[2],J[0]),cross(J[0],J[1]));
}
`;
