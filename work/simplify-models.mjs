/*
 * Simplify the anatomy GLBs — run once, offline, and commit the result.
 *
 * NOT a build step. Nothing in the app runs this; it is the same kind of tool
 * as `npx @gltf-transform/cli quantize`, and what ships is the .glb it writes.
 * The seven layers are ~21 MB of triangles exported for a desktop viewer, and
 * the app that has to fetch them is a phone on hall wifi.
 *
 * The one rule this exists to keep:
 *
 *   NO STRUCTURE MAY BE LOST.
 *
 * The app's whole model is 2,914 individually named, individually tappable
 * meshes; outputs/mesh-index.js is generated from those names and every study
 * unit, every quiz target and every cavity landmark resolves through them. A
 * blanket `gltf-transform simplify --error 0.002` over the seven files takes
 * that to 2,902 — the saphenous nerve among them — because a small mesh
 * simplified below three triangles is an empty primitive, and the CLI's
 * cleanup pass then prunes it away. Nothing in the app would have said so; the
 * nerve would simply never appear, and a question about it would have no
 * answer on screen.
 *
 * So this drives simplifyPrimitive DIRECTLY, one primitive at a time:
 *
 *   - no document-level cleanup runs at all, so nothing can be pruned;
 *   - every primitive carries a triangle FLOOR it may not be taken below,
 *     which is what keeps a thin nerve a tube rather than a sliver. Small
 *     meshes are where the rule bites and are also where there is nothing to
 *     save, so the floor costs almost nothing;
 *   - and the result is verified against the input before it is written: same
 *     meshes, same nodes, same NAME SET, every primitive still non-degenerate.
 *     A run that would drop a structure writes nothing and exits non-zero.
 *
 * Geometry moves, and that is the point of checking after: the cavity builders
 * measure real vertices, so re-run work/build-check.mjs, work/cavity-probe.mjs,
 * work/grid-probe.mjs, work/landmark-check.mjs and work/cut-level-check.mjs and
 * read the numbers before accepting a run. Then `node work/baseline.mjs` to
 * re-capture, and bump MODEL_VERSION in outputs/sw.js — never CACHE_VERSION.
 *
 * Setup (the repo has no node_modules, and does not want one):
 *   mkdir -p /tmp/glbtools && cd /tmp/glbtools \
 *     && npm i @gltf-transform/core @gltf-transform/functions meshoptimizer
 *
 * Usage:
 *   node work/simplify-models.mjs --modules /tmp/glbtools/node_modules \
 *     [--error 0.002] [--floor 96] [--out <dir>] [--write]
 *
 * Without --write it reports what a run would do and touches nothing.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(root, 'outputs', 'assets');
const LAYERS = ['z-anatomy-skeleton', 'kas', 'eklem', 'ic-organlar', 'dolasim', 'sinir', 'lenf'];

/*
 * Per-layer error budgets. Everything runs at --error unless it is named here.
 *
 * kas.glb — the muscle layer — carries the DIAPHRAGM, and the diaphragm is not
 * just something to look at: cavity-build.js samples it as a height field and
 * every thoracic and abdominal cavity is floored or roofed on it. At 0.002 the
 * dome came down about 6 mm. That is well inside the error budget and looks
 * like nothing, and it moved the mediastinum's right wall 34 mm laterally,
 * because the builder starts its bands at the diaphragm precisely to stay
 * above the base of the lungs — where each lung is a thin crescent whose
 * medial edge has already swung far out to the side. Six millimetres lower and
 * a band catches that crescent, and the compartment ends in the pair of wings
 * the builder's own comment was written to prevent.
 *
 * 0.001 was found by bisection, with work/build-check.mjs as the instrument:
 * it is the loosest budget at which the mediastinum comes back bit-identical
 * to the baseline. Re-derive it with --layer-error kas=<n> rather than
 * trusting this line.
 *
 * Nothing else needed one. The skeleton, the organs, the vessels, the nerves,
 * the ligaments and the lymphatics all move every measured cavity by under
 * 2 mm at 0.002 — checked, not assumed.
 */
const LAYER_ERROR = { kas: 0.001 };
/* --layer-error kas=0.0005, repeatable. This is how the number above was
   found; keeping it means the next person can re-derive it rather than
   trust it. */
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] !== '--layer-error') continue;
  const [k, v] = String(process.argv[i + 1] || '').split('=');
  if (k && v) LAYER_ERROR[k] = Number(v);
}

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : dflt;
};
const ERROR = Number(arg('error', '0.002'));
const FLOOR = Number(arg('floor', '96'));
const OUT = resolve(arg('out', join(ASSETS)));
const WRITE = process.argv.includes('--write');
const MODULES = resolve(arg('modules', join(root, 'node_modules')));

/* Resolved by hand off --modules, because the repo deliberately has no
   node_modules of its own and node will not look outside the package it is
   running from. package.json "exports" names the real entry file. */
const load = async (pkg) => {
  const home = join(MODULES, pkg);
  try {
    const meta = JSON.parse(readFileSync(join(home, 'package.json'), 'utf8'));
    const exp = meta.exports && (meta.exports['.'] || meta.exports);
    const entry = (exp && (exp.default?.default || exp.import || exp.default))
      || meta.module || meta.main || 'index.js';
    return await import(pathToFileURL(join(home, entry)).href);
  } catch { return import(pkg); }
};
let core, fns, exts, meshopt;
try {
  core = await load('@gltf-transform/core');
  fns = await load('@gltf-transform/functions');
  exts = await load('@gltf-transform/extensions');
  meshopt = await load('meshoptimizer');
} catch (e) {
  console.log('Could not load the glTF tools. See the header for the one-off npm install.');
  console.log(`  looked in: ${MODULES}`);
  console.log(`  ${e.message}`);
  process.exit(2);
}
const { NodeIO } = core;
const { dequantize, quantize, simplifyPrimitive, weldPrimitive } = fns;
const { MeshoptSimplifier } = meshopt;
await MeshoptSimplifier.ready;

/* Read the shipped GLB's own JSON chunk rather than the parsed document, so the
   comparison is against the bytes the app actually downloads today. */
function shape(buf) {
  const j = JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString('utf8'));
  const names = new Set();
  for (const n of j.nodes || []) if (n.name) names.add(n.name);
  for (const m of j.meshes || []) if (m.name) names.add(m.name);
  let tris = 0, prims = 0, degenerate = 0;
  for (const m of j.meshes || []) for (const p of m.primitives || []) {
    prims += 1;
    const t = p.indices !== undefined ? j.accessors[p.indices].count / 3 : 0;
    tris += t;
    if (t < 1) degenerate += 1;
  }
  return { names, meshes: (j.meshes || []).length, nodes: (j.nodes || []).length,
    prims, tris: Math.round(tris), degenerate };
}

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;

console.log(`— simplify at error ${ERROR}, floor ${FLOOR} triangles per primitive —`);
console.log(WRITE ? `  writing to ${OUT}` : '  DRY RUN — pass --write to save\n');

/* These files are already quantized (KHR_mesh_quantization) and the reader
   refuses a required extension it does not know. Registering it is also what
   lets dequantize() undo it before the simplifier sees the vertices. */
const io = new NodeIO().registerExtensions([exts.KHRMeshQuantization]);
let beforeBytes = 0, afterBytes = 0, beforeTris = 0, afterTris = 0;

const ONLY = arg('only', '');
for (const layer of LAYERS) {
  if (ONLY && layer !== ONLY) continue;
  const err = LAYER_ERROR[layer] !== undefined ? LAYER_ERROR[layer] : ERROR;
  const src = join(ASSETS, `${layer}.glb`);
  const before = shape(readFileSync(src));
  const doc = await io.read(src);
  await doc.transform(dequantize());

  let floored = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const idx = prim.getIndices();
      const tris = (idx ? idx.getCount() : prim.getAttribute('POSITION').getCount()) / 3;
      if (tris <= FLOOR) { floored += 1; continue; }
      weldPrimitive(prim);
      /* The floor as a RATIO, because that is the unit simplifyPrimitive takes:
         never below FLOOR triangles, however loose the error budget is. */
      simplifyPrimitive(prim, { simplifier: MeshoptSimplifier, ratio: FLOOR / tris, error: err });
    }
  }
  await doc.transform(quantize());
  const bytes = Buffer.from(await io.writeBinary(doc));
  const after = shape(bytes);

  const missing = [...before.names].filter((n) => !after.names.has(n));
  const added = [...after.names].filter((n) => !before.names.has(n));
  let bad = false;
  if (missing.length) { fail(`${layer}: ${missing.length} names lost — ${missing.slice(0, 4).join(', ')}`); bad = true; }
  if (added.length) { fail(`${layer}: ${added.length} names appeared — ${added.slice(0, 4).join(', ')}`); bad = true; }
  if (after.meshes !== before.meshes) { fail(`${layer}: meshes ${before.meshes} → ${after.meshes}`); bad = true; }
  if (after.nodes !== before.nodes) { fail(`${layer}: nodes ${before.nodes} → ${after.nodes}`); bad = true; }
  if (after.prims !== before.prims) { fail(`${layer}: primitives ${before.prims} → ${after.prims}`); bad = true; }
  if (after.degenerate) { fail(`${layer}: ${after.degenerate} primitives came out with no triangles`); bad = true; }

  const srcBytes = statSync(src).size;
  beforeBytes += srcBytes; afterBytes += bytes.length;
  beforeTris += before.tris; afterTris += after.tris;
  console.log(`  ${bad ? 'FAIL ' : 'ok   '}${layer.padEnd(20)}` +
    `${mb(srcBytes)} → ${mb(bytes.length)} (${Math.round(100 * bytes.length / srcBytes)}%)  ` +
    `tris ${before.tris} → ${after.tris} (${Math.round(100 * after.tris / before.tris)}%)  ` +
    `${before.meshes} meshes kept, ${floored} under the floor` +
    (err !== ERROR ? `  [error ${err}]` : ''));

  if (WRITE && !bad) { mkdirSync(OUT, { recursive: true }); writeFileSync(join(OUT, `${layer}.glb`), bytes); }
}

console.log(`\n  total ${mb(beforeBytes)} → ${mb(afterBytes)} ` +
  `(${Math.round(100 * afterBytes / beforeBytes)}%, ${mb(beforeBytes - afterBytes)} saved)`);
console.log(`  triangles ${beforeTris} → ${afterTris} (${Math.round(100 * afterTris / beforeTris)}%)`);
if (failures) console.log(`\n${failures} FAILED — nothing written for those layers`);
else console.log(WRITE ? '\nWRITTEN. Now re-run the geometry checks before committing.'
  : '\nWOULD PASS. Re-run with --write.');
process.exit(failures ? 1 : 0);
