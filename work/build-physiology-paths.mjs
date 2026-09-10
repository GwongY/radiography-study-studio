/*
 * Build the curated tube routes into a committed, immutable payload.
 *
 * Nothing here runs in the browser. Recovering a tube's centreline means a
 * welded triangle graph, two Dijkstra sweeps and a banded centroid fit per
 * mesh; doing that at layer-load time would add hundreds of milliseconds of
 * main-thread graph work to the one moment the viewer is already busy. So it
 * is done once, offline, and the result is committed like mesh-index.js.
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
import { PATH_ATTRIBUTES, derivePathRoute, geodesicFrom, weldedGraph } from '../outputs/physiology-path.js';

const here = (name) => fileURLToPath(new URL(name, import.meta.url));
const sha = (data) => createHash('sha256').update(data).digest('hex');
const short = (data) => sha(data).slice(0, 12);
const ROUTES = JSON.parse(readFileSync(here('./physiology-routes.json'), 'utf8'));
const MODEL_VERSION = readFileSync(join(OUTPUTS, 'sw.js'), 'utf8').match(/const MODEL_VERSION = '([^']+)'/)[1];
const GENERATOR = short(readFileSync(here('./build-physiology-paths.mjs')));
const KERNEL = short(readFileSync(join(OUTPUTS, 'physiology-path.js')));
const DEFINITIONS = short(readFileSync(here('./physiology-routes.json')));

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
    let proximal, distal, anchors = {};
    if (definition.to === 'far' || definition.from === 'far') {
      const named = definition.to === 'far' ? definition.from : definition.to;
      const other = meshes.get(named);
      if (!other) { rejected.push({ ...definition, reason: 'anchor-mesh-not-found', anchor: named }); continue; }
      const hit = nearestTo(mesh, other);
      anchors[named] = hit.distance;
      const far = farthestFrom(mesh, hit.index);
      if (definition.to === 'far') { proximal = hit.index; distal = far; }
      else { proximal = far; distal = hit.index; }
    } else {
      const fromMesh = meshes.get(definition.from), toMesh = meshes.get(definition.to);
      if (!fromMesh || !toMesh) {
        rejected.push({ ...definition, reason: 'anchor-mesh-not-found', anchor: fromMesh ? definition.to : definition.from });
        continue;
      }
      const a = nearestTo(mesh, fromMesh), b = nearestTo(mesh, toMesh);
      anchors[definition.from] = a.distance; anchors[definition.to] = b.distance;
      proximal = a.index; distal = b.index;
    }

    const route = derivePathRoute({ positions: mesh.positions, indices: mesh.indices, proximal, distal });
    if (!route.accepted) { rejected.push({ ...definition, ...route, accepted: undefined, anchors }); continue; }

    const count = mesh.positions.length / 3;
    const local = new Float32Array(mesh.positions.length);
    for (let i = 0; i < count; i++) {
      const p = similarity.point([mesh.positions[i * 3], mesh.positions[i * 3 + 1], mesh.positions[i * 3 + 2]]);
      local.set(p, i * 3);
    }
    const centre = new Float32Array(count * 3), tangent = new Float32Array(count * 3), bend = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      centre.set(similarity.point([route.centre[i * 3], route.centre[i * 3 + 1], route.centre[i * 3 + 2]]), i * 3);
      tangent.set(similarity.direction([route.tangent[i * 3], route.tangent[i * 3 + 1], route.tangent[i * 3 + 2]]), i * 3);
      bend.set(similarity.direction([route.bend[i * 3], route.bend[i * 3 + 1], route.bend[i * 3 + 2]]).map((v) => v / similarity.scale), i * 3);
    }
    const data = {
      aPathParam: Buffer.from(route.param.buffer, route.param.byteOffset, route.param.byteLength).toString('base64'),
      aPathCentre: Buffer.from(centre.buffer).toString('base64'),
      aPathTangent: Buffer.from(tangent.buffer).toString('base64'),
      aPathBend: Buffer.from(bend.buffer).toString('base64'),
    };
    accepted.push({
      id: definition.id, mesh: definition.mesh,
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
      length: route.length / similarity.scale, radius: route.radius / similarity.scale,
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
  return { layer, file, glbHash, accepted, rejected };
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

/* Importing this file gives a checker buildLayer and the hashes; only running
   it directly does the work and writes anything. */
if (process.argv[1]?.endsWith('build-physiology-paths.mjs')) {
  const layers = [];
  for (const [layer, definitions] of Object.entries(ROUTES.layers)) {
    const file = new Map(LAYERS).get(layer);
    if (!file) throw new Error(`no GLB for layer ${layer}`);
    layers.push(buildLayer(layer, file, definitions));
  }

  const stamp = short(GENERATOR + KERNEL + DEFINITIONS + MODEL_VERSION);
  let total = 0;
  for (const built of layers) {
    console.log(`\n${built.layer}  (${built.file}, glb ${built.glbHash})`);
    for (const route of built.accepted) {
      const bytes = Object.values(route.data).reduce((s, b) => s + b.length, 0);
      total += bytes;
      console.log(`  ok    ${route.id.padEnd(18)} ${String(route.vertices).padStart(5)} verts  length ${route.worldLength.toFixed(3)}  stations ${String(route.stations).padStart(3)}  crowd ${route.crowding}  spread ${route.worstSpread}  ${(bytes / 1024).toFixed(0)} KiB`);
    }
    for (const route of built.rejected) {
      console.log(`  SKIP  ${route.id.padEnd(18)} ${route.reason}${route.crowding ? ` (crowding ${route.crowding.toFixed(1)}, split ${route.split}, wide ${route.wide})` : ''}${route.reach ? ` (reach ${route.reach.toFixed(2)})` : ''}`);
    }
  }
  console.log(`\ntotal encoded payload ${(total / 1024).toFixed(0)} KiB, stamp ${stamp}`);

  if (process.argv.includes('--write')) {
    mkdirSync(join(OUTPUTS, 'assets', 'physiology'), { recursive: true });
    const manifest = [];
    for (const built of layers) {
      const payload = {
        schemaVersion: 1, layer: built.layer, modelVersion: MODEL_VERSION,
        glbHash: built.glbHash, generator: GENERATOR, kernel: KERNEL, definitions: DEFINITIONS,
        attributes: PATH_ATTRIBUTES,
        routes: built.accepted.map(({ derived, ...route }) => route),
        rejected: built.rejected.map((r) => ({ id: r.id, mesh: r.mesh, reason: r.reason })),
      };
      const name = `${built.layer}-paths.json`;
      const text = JSON.stringify(payload);
      writeFileSync(join(OUTPUTS, 'assets', 'physiology', name), text);
      manifest.push({ layer: built.layer, name, bytes: text.length, routes: built.accepted.length, rejected: built.rejected.length });
    }
    const lines = [
      '/*',
      ' * Where the curated tube-route payloads live, and what they were derived from.',
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
