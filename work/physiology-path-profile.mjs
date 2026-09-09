/* Offline engineering profile, not an anatomical route generator.
 * Run: node work/physiology-path-profile.mjs [--write]
 * Graph welding intentionally matches transmissionField's 1e-6 world-unit key.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { LAYERS, OUTPUTS } from './lib/mesh-names.mjs';
import { motorRoute, transmissionField } from '../outputs/physiology-mechanics.js';

const hash = data => createHash('sha256').update(data).digest('hex');
const jsonHash = value => hash(JSON.stringify(value));
const selectors = {
  organs: /^(?:Ureter[lr]|(?:Ascending|Descending|Sigmoid|Transverse)_colon|Jejunum|Ileum|Oesophagus)$/i,
  circulatory: /^(?:(?:Thoracic|Abdominal|Ascending)_aorta|(?:Superior|Inferior)_vena_cava)$/i,
};
function graph(points, indices) {
  const ids = [], lookup = new Map(), adjacency = [];
  for (let i = 0; i < points.length; i += 3) {
    const key = points.slice(i, i + 3).map(v => Math.round(v * 1e6)).join(',');
    if (!lookup.has(key)) { lookup.set(key, adjacency.length); adjacency.push(new Set()); }
    ids.push(lookup.get(key));
  }
  const edge = (a, b) => { a = ids[a]; b = ids[b]; if (a !== b) { adjacency[a].add(b); adjacency[b].add(a); } };
  for (let i = 0; i < indices.length; i += 3) {
    edge(indices[i], indices[i + 1]); edge(indices[i + 1], indices[i + 2]); edge(indices[i + 2], indices[i]);
  }
  const visited = new Set(), sizes = [];
  for (let i = 0; i < adjacency.length; i++) {
    if (visited.has(i)) continue;
    const stack = [i]; visited.add(i); let size = 0;
    while (stack.length) { const a = stack.pop(); size++; for (const b of adjacency[a]) if (!visited.has(b)) { visited.add(b); stack.push(b); } }
    sizes.push(size);
  }
  return { weldedVertices: adjacency.length, edges: adjacency.reduce((sum, a) => sum + a.size, 0) / 2, components: sizes.length, componentSizes: sizes.sort((a,b) => b-a) };
}
const report = {
  schemaVersion: 1,
  modelVersion: readFileSync(join(OUTPUTS, 'sw.js'), 'utf8').match(/const MODEL_VERSION = '([^']+)'/)[1],
  generatorHash: hash(readFileSync(fileURLToPath(import.meta.url))),
  decoderHash: hash(readFileSync(new URL('./glb-mesh.mjs', import.meta.url))),
  routeDefinitionHash: hash(readFileSync(join(OUTPUTS, 'physiology-mechanics.js'))),
  note: 'Decoded world-space merged node arrays; NOT runtime primitive-layout payload. Timings are local Node observations, not phone performance. Tube/vessel fields use highest-world-Y seed for cost measurement only, not approved routes.',
  layers: [], rows: [],
};
for (const [layer, path] of LAYERS) {
  if (!(layer in selectors) && layer !== 'nervous') continue;
  const raw = readFileSync(join(OUTPUTS, path));
  const gltf = JSON.parse(raw.subarray(20, 20 + raw.readUInt32LE(12)).toString());
  report.layers.push({ layer, path, glbHash: hash(raw), primitiveLayoutHash: jsonHash({ scene: gltf.scene, scenes: gltf.scenes, nodes: gltf.nodes, meshes: gltf.meshes, accessors: gltf.accessors, bufferViews: gltf.bufferViews }) });
  for (const mesh of loadGlbMeshes(path)) {
    const route = layer === 'nervous' ? motorRoute(layer, mesh.name) : null;
    if (!route && !selectors[layer]?.test(mesh.name)) continue;
    const points = Array.from(mesh.positions), indices = Array.from(mesh.indices);
    if (indices.length % 3) throw new Error(`Non-triangular indices: ${mesh.name}`);
    let top = -Infinity, seed;
    for (let i = 0; i < points.length; i += 3) if (points[i + 1] > top) { top = points[i + 1]; seed = points.slice(i, i + 3); }
    const durations = []; let field;
    for (let trial = 0; trial < 3; trial++) { const start = performance.now(); field = transmissionField(points, indices, seed); durations.push(performance.now() - start); }
    if (field.length !== points.length / 3 || !field.every(v => Number.isFinite(v) && v >= 0 && v <= 1)) throw new Error(`Invalid field: ${mesh.name}`);
    const repeat = transmissionField(points, indices, seed);
    if (!repeat.every((v,i) => v === field[i])) throw new Error(`Non-deterministic field: ${mesh.name}`);
    report.rows.push({ layer, name: mesh.name, routeId: route?.id ?? null, vertices: points.length / 3, triangles: indices.length / 3, ...graph(points, indices), decodedGeometryHash: jsonHash({ points, indices }), fieldHash: jsonHash(Array.from(field)), transmissionMs: durations.map(v => +v.toFixed(3)), payloadBytes: { scalarFloat32: field.length * 4, tubeFloat32Estimate: field.length * 40 }, seed });
  }
}
for (const id of ['deltoid','biceps','quadriceps']) if (!report.rows.some(row => row.routeId === id)) throw new Error(`Missing existing route ${id}`);
report.totals = report.rows.reduce((s,r) => ({ meshes:s.meshes+1, vertices:s.vertices+r.vertices, edges:s.edges+r.edges, components:s.components+r.components, scalarBytes:s.scalarBytes+r.payloadBytes.scalarFloat32, tubeBytes:s.tubeBytes+r.payloadBytes.tubeFloat32Estimate }), {meshes:0,vertices:0,edges:0,components:0,scalarBytes:0,tubeBytes:0});
if (process.argv.includes('--write')) writeFileSync(new URL('./physiology-path-profile.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.table(report.rows.map(r => ({ name:r.name, vertices:r.vertices, edges:r.edges, components:r.components, ms:r.transmissionMs.join('/') })));
console.log(JSON.stringify(report.totals));
