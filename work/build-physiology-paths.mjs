/*
 * Build the curated routes into a committed, immutable payload.
 *
 * Nothing here runs in the browser. Recovering a route means a welded triangle
 * graph, two Dijkstra sweeps and a banded centroid fit per mesh — and a tube
 * route a centreline fit on top of that; doing it at layer-load time would add
 * hundreds of milliseconds of main-thread graph work, over fifty-odd meshes, to
 * the one moment the viewer is already busy. So it is done once, offline, and
 * the result is committed like mesh-index.js.
 *
 * A payload is keyed to the exact geometry it was derived from: model version,
 * GLB content hash, mesh name, vertex and index counts, a hash of the LOCAL
 * position buffer, this generator, the path kernel and the route definitions.
 * Any of those moving invalidates the payload, and the runtime then keeps the
 * existing illustrative animation rather than binding attributes to vertices
 * they were not derived for.
 *
 *   node work/build-physiology-paths.mjs            # report only
 *   node work/build-physiology-paths.mjs --write    # write the payload
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { LAYERS, OUTPUTS } from './lib/mesh-names.mjs';
import { PATH_ATTRIBUTES, PROGRESS_ATTRIBUTES, derivePathRoute, deriveProgressRoute, geodesicFrom, weldedGraph } from '../outputs/physiology-path.js';

const here = (name) => fileURLToPath(new URL(name, import.meta.url));
const sha = (data) => createHash('sha256').update(data).digest('hex');
const short = (data) => sha(data).slice(0, 12);
const ROUTES = JSON.parse(readFileSync(here('./physiology-routes.json'), 'utf8'));
const MODEL_VERSION = readFileSync(join(OUTPUTS, 'sw.js'), 'utf8').match(/const MODEL_VERSION = '([^']+)'/)[1];
const GENERATOR = short(readFileSync(here('./build-physiology-paths.mjs')));
const KERNEL = short(readFileSync(join(OUTPUTS, 'physiology-path.js')));
const DEFINITIONS = short(readFileSync(here('./physiology-routes.json')));
/* Decoder world units. This model stands 1.698 tall, so this is a centimetre. */
const ANCHOR_GAP = 0.01;

/*
 * The runtime's vertex shader works in the mesh's OWN local frame; the decoder
 * here bakes the node transform so every layer lands in one shared frame. So
 * the derived frame has to be pushed back through that transform before it can
 * be bound as an attribute. Only a similarity is handled — a non-uniform scale
 * would make "perpendicular to the tube" mean different things on the two sides
 * of the transform, so it is refused rather than approximated.
 */
export function similarityOf(matrix) {
  const columns = [0, 1, 2].map((c) => [matrix[c * 4], matrix[c * 4 + 1], matrix[c * 4 + 2]]);
  const lengths = columns.map((c) => Math.hypot(...c));
  const scale = (lengths[0] + lengths[1] + lengths[2]) / 3;
  if (!(scale > 0)) return null;
  if (lengths.some((l) => Math.abs(l - scale) > 1e-5 * scale)) return null;
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  for (const [a, b] of [[0, 1], [1, 2], [0, 2]]) {
    if (Math.abs(dot(columns[a], columns[b])) > 1e-5 * scale * scale) return null;
  }
  const rotation = columns.map((c) => c.map((v) => v / scale));   /* columns of R */
  const translation = [matrix[12], matrix[13], matrix[14]];
  return {
    scale,
    /* world = scale * R * local + t, so local = R^T (world - t) / scale */
    point: (p) => {
      const d = [p[0] - translation[0], p[1] - translation[1], p[2] - translation[2]];
      return rotation.map((c) => dot(c, d) / scale);
    },
    direction: (v) => rotation.map((c) => dot(c, v)),
  };
}

/*
 * A cheap, order-sensitive hash over the INDEX buffer, which is integers and so
 * is bit-identical on both sides.
 *
 * The first version hashed rounded positions instead, and it does not work: a
 * quantised coordinate is n/32767, the reconstruction here carries a float
 * rounding of about 1e-7, and rounding to a 1e-4 bucket puts a couple of
 * coordinates per mesh within that error of a bucket edge. Measured against the
 * running app, four of six routes disagreed — not because anything was wrong,
 * but because the tie-break fell the other way. The ureters happened to agree,
 * which is exactly how a check like that survives review.
 *
 * Reordering vertices means renumbering indices, so this still catches it, and
 * the local bounds recorded alongside catch geometry that moved without the
 * topology changing. Anything larger — a replaced GLB — moves MODEL_VERSION,
 * which is part of the payload URL.
 */
export function layoutHash(indices) {
  let h = 0x811c9dc5;
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i] | 0;
    h = Math.imul(h ^ (v & 255), 0x01000193) >>> 0;
    h = Math.imul(h ^ ((v >> 8) & 255), 0x01000193) >>> 0;
    h = Math.imul(h ^ ((v >> 16) & 255), 0x01000193) >>> 0;
    h = Math.imul(h ^ ((v >> 24) & 255), 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
export function localBounds(local) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < local.length; i++) {
    const axis = i % 3;
    min[axis] = Math.min(min[axis], local[i]); max[axis] = Math.max(max[axis], local[i]);
  }
  return [...min, ...max].map((v) => +v.toFixed(5));
}

const nearestTo = (mesh, other) => {
  let best = Infinity, index = 0;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    for (let j = 0; j < other.positions.length; j += 3) {
      const d = (mesh.positions[i] - other.positions[j]) ** 2
        + (mesh.positions[i + 1] - other.positions[j + 1]) ** 2
        + (mesh.positions[i + 2] - other.positions[j + 2]) ** 2;
      if (d < best) { best = d; index = i / 3; }
    }
  }
  return { index, distance: Math.sqrt(best) };
};

export function buildLayer(layer, file, definitions) {
  const meshes = new Map(loadGlbMeshes(file).map((m) => [m.name, m]));
  const glbHash = short(readFileSync(join(OUTPUTS, file)));
  const accepted = [], rejected = [];
  for (const definition of definitions) {
    const mesh = meshes.get(definition.mesh);
    if (!mesh) { rejected.push({ ...definition, reason: 'mesh-not-found' }); continue; }
    if (mesh.primitives !== 1) { rejected.push({ ...definition, reason: 'multi-primitive', primitives: mesh.primitives }); continue; }
    const similarity = similarityOf(mesh.matrix);
    if (!similarity) { rejected.push({ ...definition, reason: 'non-similarity-node' }); continue; }

    /* Resolve both ends. 'far' is the topologically opposite end of the same
       mesh, for a neighbour this atlas layer does not contain at all. */
    let proximal, distal, anchors = {}, tooFar = null;
    /*
     * An anchor is only an anchor if the atlas puts the two surfaces together.
     * Naming a plausible neighbour that this model does not actually place next
     * to the mesh reads as a justified ordering and is a guess: the
     * musculocutaneous nerve anchored at the roots of the brachial plexus
     * measured 0.172 away — a tenth of the body's height — and the route
     * derived from it was accepted, because the seed still landed SOMEWHERE.
     * ANCHOR_GAP is in the decoder's world units, in which this model stands
     * 1.698 tall, so it is about a centimetre.
     */
    const adjacent = (name, hit) => {
      anchors[name] = hit.distance;
      if (hit.distance > ANCHOR_GAP) tooFar = { anchor: name, distance: hit.distance };
      return hit;
    };
    if (definition.to === 'far' || definition.from === 'far') {
      const named = definition.to === 'far' ? definition.from : definition.to;
      const other = meshes.get(named);
      if (!other) { rejected.push({ ...definition, reason: 'anchor-mesh-not-found', anchor: named }); continue; }
      const hit = adjacent(named, nearestTo(mesh, other));
      const far = farthestFrom(mesh, hit.index);
      if (definition.to === 'far') { proximal = hit.index; distal = far; }
      else { proximal = far; distal = hit.index; }
    } else {
      const fromMesh = meshes.get(definition.from), toMesh = meshes.get(definition.to);
      if (!fromMesh || !toMesh) {
        rejected.push({ ...definition, reason: 'anchor-mesh-not-found', anchor: fromMesh ? definition.to : definition.from });
        continue;
      }
      const a = adjacent(definition.from, nearestTo(mesh, fromMesh));
      const b = adjacent(definition.to, nearestTo(mesh, toMesh));
      proximal = a.index; distal = b.index;
    }
    if (tooFar) { rejected.push({ ...definition, reason: 'anchor-not-adjacent', ...tooFar, anchors }); continue; }

    /*
     * Two kinds, two gates. A tube route earns a local frame and a Jacobian
     * because something is going to MOVE along it; a glow route earns an
     * ordering and nothing else, because nothing moves. The weaker gate is
     * deliberate, and outputs/physiology-path.js records exactly which four
     * refusals it drops and why.
     */
    const glow = definition.kind === 'glow';
    const route = glow
      ? deriveProgressRoute({ positions: mesh.positions, indices: mesh.indices, proximal, distal })
      : derivePathRoute({ positions: mesh.positions, indices: mesh.indices, proximal, distal });
    if (!route.accepted) { rejected.push({ ...definition, ...route, accepted: undefined, anchors }); continue; }

    const count = mesh.positions.length / 3;
    const local = new Float32Array(mesh.positions.length);
    for (let i = 0; i < count; i++) {
      const p = similarity.point([mesh.positions[i * 3], mesh.positions[i * 3 + 1], mesh.positions[i * 3 + 2]]);
      local.set(p, i * 3);
    }
    const encode = (array) => Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('base64');
    let data;
    if (glow) {
      /* One number per vertex. There is nothing to push back through the node
         transform: progress along the route is a scalar, and a similarity does
         not change it. The transform is still resolved above, because a
         non-similarity node would mean the runtime's local frame is not the
         frame this was derived in, and that is worth refusing either way. */
      data = { aPathProgress: encode(route.param) };
    } else {
      const centre = new Float32Array(count * 3), tangent = new Float32Array(count * 3), bend = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        centre.set(similarity.point([route.centre[i * 3], route.centre[i * 3 + 1], route.centre[i * 3 + 2]]), i * 3);
        tangent.set(similarity.direction([route.tangent[i * 3], route.tangent[i * 3 + 1], route.tangent[i * 3 + 2]]), i * 3);
        bend.set(similarity.direction([route.bend[i * 3], route.bend[i * 3 + 1], route.bend[i * 3 + 2]]).map((v) => v / similarity.scale), i * 3);
      }
      data = {
        aPathParam: encode(route.param),
        aPathCentre: encode(centre),
        aPathTangent: encode(tangent),
        aPathBend: encode(bend),
      };
    }
    accepted.push({
      id: definition.id, mesh: definition.mesh, kind: glow ? 'glow' : 'tube',
      circuit: definition.circuit || null, after: definition.after || null,
      /*
       * The glTF NODE index, not just the name. three.js renames a duplicate to
       * `Stomach_1`, and this layer really does contain such pairs, so a lookup
       * by sanitized name alone can bind one node's route to a different node's
       * vertices. The runtime matches on this when the loader can supply it.
       */
      node: mesh.node, primitive: 0,
      digest: sha(Object.values(data).join('')).slice(0, 16),
      vertices: count, indexCount: mesh.indices.length,
      layout: layoutHash(mesh.indices), bounds: localBounds(local),
      length: route.length / similarity.scale,
      radius: glow ? null : route.radius / similarity.scale,
      worldLength: route.length, stations: route.stations,
      crowding: +route.crowding.toFixed(2), worstSpread: +route.worstSpread.toFixed(2), worstStep: +route.worstStep.toFixed(2),
      anchors,
      /* The full derivation, for the checks. Stripped before the payload is
         written — param and curve are megabytes and the runtime never wants
         them, but a checker re-deriving a route needs them in hand. */
      derived: route,
      data,
    });
  }
  return { layer, file, glbHash, accepted, rejected, circuits: circuitsOf(accepted, rejected) };
}

/*
 * Where each route starts along its circuit, and how long the circuit is.
 *
 * A crest has to cross the ascending aorta, the arch, the thoracic aorta and
 * the abdominal aorta as ONE wave. Four independent routes each running 0 to 1
 * would put four crests on the aorta at once, all moving together, which is a
 * picture of nothing. So each route names the route it comes after, the offset
 * is the sum of the measured world lengths before it, and the runtime lights
 * (offset + s * length) / circuitLength instead of s.
 *
 * A circuit is a tree, not a list: both pulmonary arteries come after the
 * trunk and therefore start at the same offset, which is what the anatomy says.
 * A route whose predecessor was REFUSED starts a new run at offset 0 rather
 * than guessing the missing length, and says so.
 */
export function circuitsOf(accepted, rejected) {
  const byId = new Map(accepted.map((route) => [route.id, route]));
  const refused = new Set(rejected.map((route) => route.id));
  const offsetOf = (route, seen = new Set()) => {
    if (!route.after) return { offset: 0, broken: null };
    if (seen.has(route.id)) return { offset: 0, broken: route.id };      /* a cycle in the curated order */
    const previous = byId.get(route.after);
    if (!previous) return { offset: 0, broken: route.after };
    seen.add(route.id);
    const back = offsetOf(previous, seen);
    return { offset: back.offset + previous.worldLength, broken: back.broken };
  };
  const circuits = {};
  for (const route of accepted) {
    if (!route.circuit) continue;
    const { offset, broken } = offsetOf(route);
    route.offset = offset;
    if (broken) route.chainBrokenAt = broken;
    const circuit = circuits[route.circuit] || (circuits[route.circuit] = { id: route.circuit, worldLength: 0, routes: [], broken: [] });
    circuit.routes.push(route.id);
    circuit.worldLength = Math.max(circuit.worldLength, offset + route.worldLength);
    if (broken) circuit.broken.push({ route: route.id, after: broken, refused: refused.has(broken) });
  }
  for (const route of accepted) {
    if (!route.circuit) continue;
    const total = circuits[route.circuit].worldLength || 1;
    route.uStart = +(route.offset / total).toFixed(6);
    route.uSpan = +(route.worldLength / total).toFixed(6);
  }
  return circuits;
}

/* Farthest vertex over the SURFACE, not through the air: the far end of a bent
   tube is not the far end of its bounding box. */
function farthestFrom(mesh, index) {
  const graph = weldedGraph(mesh.positions, mesh.indices);
  const loop = graph.loops.find((l) => l.includes(graph.ids[index]));
  const field = geodesicFrom(graph, loop && loop.length >= 3 ? loop : graph.ids[index]);
  let best = -1, at = index;
  for (let i = 0; i < mesh.positions.length / 3; i++) {
    const d = field[graph.ids[i]];
    if (Number.isFinite(d) && d > best) { best = d; at = i; }
  }
  return at;
}

/* The cache key, as a function so a checker can recompute it. A committed
   manifest whose stamp is not this one was built from different inputs. */
export function stampOf() { return short(GENERATOR + KERNEL + DEFINITIONS + MODEL_VERSION); }

/* Importing this file gives a checker buildLayer and the hashes; only running
   it directly does the work and writes anything. */
if (process.argv[1]?.endsWith('build-physiology-paths.mjs')) {
  const layers = [];
  for (const [layer, definitions] of Object.entries(ROUTES.layers)) {
    const file = new Map(LAYERS).get(layer);
    if (!file) throw new Error(`no GLB for layer ${layer}`);
    layers.push(buildLayer(layer, file, definitions));
  }

  const stamp = stampOf();
  let total = 0;
  for (const built of layers) {
    console.log(`\n${built.layer}  (${built.file}, glb ${built.glbHash})`);
    for (const route of built.accepted) {
      const bytes = Object.values(route.data).reduce((s, b) => s + b.length, 0);
      total += bytes;
      const place = route.circuit ? `  ${route.circuit} ${route.uStart.toFixed(2)}\u2013${(route.uStart + route.uSpan).toFixed(2)}` : '';
      console.log(`  ok ${route.kind === 'glow' ? 'glow' : 'tube'} ${route.id.padEnd(30)} ${String(route.vertices).padStart(5)} verts  length ${route.worldLength.toFixed(3)}  stations ${String(route.stations).padStart(3)}  crowd ${route.crowding}  ${(bytes / 1024).toFixed(0)} KiB${place}`);
    }
    for (const route of built.rejected) {
      const why = ['components', 'reach', 'decile', 'crowding', 'split', 'wide', 'worstStep', 'bulge', 'clearance', 'calibres', 'distance']
        .filter((key) => route[key] !== undefined)
        .map((key) => `${key} ${typeof route[key] === 'number' ? +route[key].toFixed(3) : route[key]}`);
      console.log(`  SKIP      ${route.id.padEnd(30)} ${route.reason}${why.length ? ` (${why.join(', ')})` : ''}`);
    }
    for (const circuit of Object.values(built.circuits)) {
      console.log(`  circuit   ${circuit.id.padEnd(30)} ${circuit.routes.length} routes over ${circuit.worldLength.toFixed(3)}${circuit.broken.length ? `  BROKEN AFTER ${circuit.broken.map((b) => b.after).join(', ')}` : ''}`);
    }
  }
  console.log(`\ntotal encoded payload ${(total / 1024).toFixed(0)} KiB, stamp ${stamp}`);

  if (process.argv.includes('--write')) {
    mkdirSync(join(OUTPUTS, 'assets', 'physiology'), { recursive: true });
    const manifest = [];
    for (const built of layers) {
      const payload = {
        schemaVersion: 2, layer: built.layer, modelVersion: MODEL_VERSION,
        glbHash: built.glbHash, generator: GENERATOR, kernel: KERNEL, definitions: DEFINITIONS,
        attributes: { tube: PATH_ATTRIBUTES, glow: PROGRESS_ATTRIBUTES },
        circuits: built.circuits,
        routes: built.accepted.map(({ derived, ...route }) => route),
        rejected: built.rejected.map((r) => ({ id: r.id, mesh: r.mesh, kind: r.kind || 'tube', circuit: r.circuit || null, reason: r.reason })),
      };
      const name = `${built.layer}-paths.json`;
      const text = JSON.stringify(payload);
      writeFileSync(join(OUTPUTS, 'assets', 'physiology', name), text);
      manifest.push({ layer: built.layer, name, bytes: text.length, routes: built.accepted.length, rejected: built.rejected.length });
    }
    const lines = [
      '/*',
      ' * Where the curated route payloads live, and what they were derived from.',
      ' *',
      ' * One file per layer, fetched with the layer it belongs to: tube routes for the',
      ' * travelling constriction, glow routes for the travelling light.',
      ' *',
      ' * GENERATED by work/build-physiology-paths.mjs — do not hand-edit. The `?g=`',
      ' * stamp is the cache key: it changes whenever the generator, the path kernel,',
      ' * the route definitions or the model version change, so a regenerated payload',
      ' * is a new URL rather than a stale entry in the model cache.',
      ' */',
      `export const PATH_STAMP = '${stamp}';`,
      'export const PATH_PAYLOADS = {',
      ...manifest.map((m) => `  ${m.layer}: { url: './assets/physiology/${m.name}?g=${stamp}', bytes: ${m.bytes}, routes: ${m.routes}, rejected: ${m.rejected} },`),
      '};',
      '',
    ];
    writeFileSync(join(OUTPUTS, 'physiology-paths.js'), lines.join('\r\n'));
    console.log(`\nwrote ${manifest.length} payload(s) and outputs/physiology-paths.js`);
  }
}
