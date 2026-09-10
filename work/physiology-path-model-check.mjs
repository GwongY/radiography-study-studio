/*
 * Path routes against the real model, and against the payload that ships.
 *
 * The synthetic checks prove the geometry; this proves it was pointed at the
 * right anatomy. Every curated name has to resolve, every accepted route has to
 * put INDEPENDENT landmarks — structures that are not its own anchors — in the
 * order the taught sequence puts them, and every refusal has to be a refusal
 * with a reason rather than a silently wrong path.
 *
 * The committed payload is then re-derived and compared, so a payload that has
 * drifted from the generator, the kernel, the routes or the GLB fails here
 * rather than in a browser.
 *
 * Usage: node work/physiology-path-model-check.mjs
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { LAYERS, OUTPUTS } from './lib/mesh-names.mjs';
import { buildLayer, layoutHash, localBounds, similarityOf, stampOf } from './build-physiology-paths.mjs';
import { PATH_ATTRIBUTES, PROGRESS_ATTRIBUTES } from '../outputs/physiology-path.js';
import { FLOW_CIRCUITS } from '../outputs/physiology.js';

const attributesFor = (kind) => (kind === 'glow' ? PROGRESS_ATTRIBUTES : PATH_ATTRIBUTES);

const ROUTES = JSON.parse(readFileSync(fileURLToPath(new URL('./physiology-routes.json', import.meta.url)), 'utf8'));
const SOURCE_TEXT = JSON.parse(readFileSync(fileURLToPath(new URL('./source-text.json', import.meta.url)), 'utf8')).sources;
let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };

/*
 * Same comparison source-check.mjs uses, so passing here means a citation would
 * still pass there: collapse whitespace and case, then look for the quote on
 * the page it names.
 *
 * `pages` is a zero-based array and a page number is one-based, which is how
 * work/lib/source-lesson-map.mjs reads it. This check originally indexed it
 * directly and so tested the page AFTER the one cited; every route citation
 * written against it was therefore one page low, and all eleven were corrected
 * when the indexing was.
 */
const flatten = (text) => String(text).replace(/\s+/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').toLowerCase().trim();

const layers = new Map(LAYERS);
const built = new Map();
for (const [layer, definitions] of Object.entries(ROUTES.layers)) {
  built.set(layer, { definitions, result: buildLayer(layer, layers.get(layer), definitions), meshes: new Map(loadGlbMeshes(layers.get(layer)).map((m) => [m.name, m])) });
}

/* --- every curated name is a real mesh ---------------------------------- */
for (const [layer, { definitions, meshes }] of built) {
  for (const definition of definitions) {
    ok(meshes.has(definition.mesh), `${layer}/${definition.id}: ${definition.mesh} is a mesh in this layer`);
    for (const anchor of [definition.from, definition.to]) {
      if (anchor === 'far') continue;
      ok(meshes.has(anchor), `${layer}/${definition.id}: anchor ${anchor} is a mesh in this layer`);
    }
  }
}

/* --- every claim is on the page it cites -------------------------------- */
for (const [, { definitions }] of built) {
  for (const definition of definitions) {
    ok(definition.sourceRefs?.length > 0, `${definition.id}: carries at least one source`);
    for (const { ref, page, quote } of definition.sourceRefs) {
      const source = SOURCE_TEXT[ref];
      ok(!!source, `${definition.id}: ${ref} is a cited source in source-text.json`);
      const text = source.pages?.[page - 1];
      ok(!!text, `${definition.id}: ${ref} p${page} has captured text`);
      ok(flatten(text).includes(flatten(quote)), `${definition.id}: the quote really is on ${ref} p${page}`);
    }
  }
}

/* --- a refusal is a refusal, with a reason ------------------------------ */
const REASONS = new Set([
  'disconnected', 'anchor-not-resolved', 'anchor-mesh-not-found', 'mesh-not-found',
  'multi-primitive', 'non-similarity-node', 'degenerate-extent', 'endpoints-not-opposed',
  'too-few-stations', 'ambiguous-cross-section', 'centreline-discontinuous', 'degenerate-frame',
  'not-a-tube-about-this-path', 'route-shorter-than-its-calibre', 'route-self-adjacent',
  'anchor-not-adjacent', 'progress-not-finite',
]);
for (const [layer, { result }] of built) {
  for (const route of result.rejected) {
    ok(REASONS.has(route.reason), `${layer}/${route.id}: refused by a named reason, not a silent failure (${route.reason})`);
  }
  ok(result.accepted.length > 0, `${layer}: at least one route survives the gate`);
}

/* --- the small-bowel coil is refused, and refused for its topology ------ */
{
  const organs = built.get('organs').result;
  const jejunum = organs.rejected.find((r) => r.id === 'jejunum');
  ok(!!jejunum, 'the jejunum candidate is refused rather than shipped');
  ok(jejunum.reason === 'route-self-adjacent', `and refused because its own loops lie alongside each other (${jejunum.reason})`);
  ok(jejunum.clearance < 1, `measured: the coil closes to ${jejunum.clearance.toFixed(2)} of a combined calibre, where the next tightest accepted route is 2.28`);
  ok(!organs.accepted.some((r) => r.mesh === 'Jejunum'), 'and no accepted route claims that mesh');
}

/* --- independent landmarks fall in the taught order --------------------- */
const nearestParam = (mesh, route, other) => {
  let best = Infinity, index = 0;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    for (let j = 0; j < other.positions.length; j += 3) {
      const d = (mesh.positions[i] - other.positions[j]) ** 2
        + (mesh.positions[i + 1] - other.positions[j + 1]) ** 2
        + (mesh.positions[i + 2] - other.positions[j + 2]) ** 2;
      if (d < best) { best = d; index = i / 3; }
    }
  }
  return route.param[index];
};
{
  const { meshes } = built.get('organs');
  const routes = new Map(built.get('organs').result.accepted.map((r) => [r.id, r]));
  /*
   * Each pair is a structure UPSTREAM and a structure DOWNSTREAM of the route,
   * neither of which is one of its own anchors — so this tests the derived
   * ordering rather than restating the input.
   */
  const ORDERED = [
    ['oesophagus', 'Nasopharynx', 'Liver'],
    ['duodenum', 'Gallbladder', 'Transverse_colon'],
    ['colon-transverse', 'Liver', 'Suprarenal_glandl'],
    ['colon-descending', 'Suprarenal_glandl', 'Urinary_bladder'],
    ['ureter-left', 'Renal_pelvisl', 'Sigmoid_colon'],
    /* The bladder IS this route's distal anchor; the renal pelvis is not its
       proximal one, and it is the structure the ureter actually begins at, so
       it is the half of this pair that is doing the testing. */
    ['ureter-right', 'Renal_pelvisr', 'Urinary_bladder'],
  ];
  for (const [id, upstream, downstream] of ORDERED) {
    const route = routes.get(id);
    ok(!!route, `${id}: accepted, so it can be checked against landmarks`);
    const mesh = meshes.get(route.mesh);
    const before = nearestParam(mesh, route.derived, meshes.get(upstream));
    const after = nearestParam(mesh, route.derived, meshes.get(downstream));
    ok(before < after, `${id}: ${upstream} sits upstream of ${downstream} along the derived route (${before.toFixed(2)} < ${after.toFixed(2)})`);
    ok(before < .35 && after > .65, `${id}: and they land at the two ends of it, not adjacent in the middle`);
  }
}

/* --- the route runs one way, and covers the tube ------------------------ */
for (const route of built.get('organs').result.accepted) {
  const values = Array.from(route.derived.param);
  ok(Math.min(...values) < .05 && Math.max(...values) > .95, `${route.id}: the parameter covers the whole route`);
  ok(values.every((v) => v >= 0 && v <= 1), `${route.id}: and never leaves [0,1]`);
  let ordered = true;
  for (let i = 1; i < route.derived.curve.length; i++) {
    if (!route.derived.curve[i].some((v, k) => v !== route.derived.curve[i - 1][k])) ordered = false;
  }
  ok(ordered, `${route.id}: the centreline never stalls`);
}

/* --- the committed payload is the one this code produces ---------------- */
{
  const manifest = readFileSync(join(OUTPUTS, 'physiology-paths.js'), 'utf8');
  ok(/GENERATED by work\/build-physiology-paths\.mjs/.test(manifest), 'the manifest says it is generated');
  const stamp = manifest.match(/export const PATH_STAMP = '([0-9a-f]+)'/)?.[1];
  ok(!!stamp, 'the manifest carries a stamp');
  /* And the stamp is the one THESE inputs produce. Without this the payload URL
     only has to agree with itself, so a rebuilt generator, kernel or route file
     would ship under the cache key of the version it replaced. */
  ok(stamp === stampOf(), `the committed stamp is the one this generator, kernel, route file and model version produce (${stamp} vs ${stampOf()})`);
  for (const [layer, { result }] of built) {
    const url = manifest.match(new RegExp(`${layer}: \\{ url: '([^']+)'`))?.[1];
    ok(!!url && url.endsWith(`?g=${stamp}`), `${layer}: the payload URL carries the stamp, so a rebuild is a new cache key`);
    const payload = JSON.parse(readFileSync(join(OUTPUTS, url.split('?')[0].replace('./', '')), 'utf8'));
    ok(payload.glbHash === result.glbHash, `${layer}: the payload names the GLB it was derived from`);
    ok(payload.schemaVersion === 2, `${layer}: the payload declares the schema the loader accepts`);
    ok(JSON.stringify(payload.attributes) === JSON.stringify({ tube: PATH_ATTRIBUTES, glow: PROGRESS_ATTRIBUTES }),
      `${layer}: the payload declares both attribute layouts the kernel defines`);
    ok(payload.routes.length === result.accepted.length, `${layer}: the payload holds every accepted route and no others`);
    for (const shipped of payload.routes) {
      const fresh = result.accepted.find((r) => r.id === shipped.id);
      ok(!!fresh, `${layer}/${shipped.id}: still accepted when re-derived`);
      ok(shipped.layout === fresh.layout && shipped.vertices === fresh.vertices && shipped.indexCount === fresh.indexCount,
        `${layer}/${shipped.id}: keyed to the same vertex layout`);
      ok(Number.isInteger(shipped.node) && shipped.node === fresh.node,
        `${layer}/${shipped.id}: carries the glTF node index, so a duplicate NAME cannot claim it`);
      ok(shipped.digest === fresh.digest && /^[0-9a-f]{16}$/.test(shipped.digest),
        `${layer}/${shipped.id}: carries a digest of its own encoded arrays`);
      ok(createHash('sha256').update(Object.values(shipped.data).join('')).digest('hex').slice(0, 16) === shipped.digest,
        `${layer}/${shipped.id}: and the digest is of the bytes that shipped`);
      ok(Object.keys(shipped.data).length === attributesFor(shipped.kind).length,
        `${layer}/${shipped.id}: a ${shipped.kind} route ships exactly its own attributes and nothing else`);
      for (const [name, size] of attributesFor(shipped.kind)) {
        const bytes = Buffer.from(shipped.data[name], 'base64');
        ok(bytes.length === shipped.vertices * size * 4, `${layer}/${shipped.id}: ${name} decodes to ${size} float(s) per vertex`);
        ok(bytes.equals(Buffer.from(fresh.data[name], 'base64')), `${layer}/${shipped.id}: ${name} matches a fresh derivation byte for byte`);
      }
    }
    /* The budgets piece 0 set: compressed route data per layer, and resident
       derived attributes overall. Reported, not assumed. */
    const encoded = payload.routes.reduce((sum, r) => sum + Object.values(r.data).reduce((s, b) => s + b.length, 0), 0);
    const resident = payload.routes.reduce((sum, r) => sum + r.vertices * (r.kind === 'glow' ? 1 : 10) * 4, 0);
    ok(encoded < 1024 * 1024, `${layer}: ${(encoded / 1024).toFixed(0)} KiB of encoded route data, under the 1 MiB per-layer budget`);
    ok(resident < 8 * 1024 * 1024, `${layer}: ${(resident / 1024).toFixed(0)} KiB of resident attributes, under the 8 MiB budget`);
  }
}

/* --- the local frame really is the frame the runtime will bind ---------- */
{
  const { meshes, result } = built.get('organs');
  for (const route of result.accepted) {
    const mesh = meshes.get(route.mesh);
    const similarity = similarityOf(mesh.matrix);
    ok(!!similarity, `${route.id}: its node transform is a similarity, so directions survive it`);
    const local = new Float32Array(mesh.positions.length);
    for (let i = 0; i < mesh.positions.length / 3; i++) {
      local.set(similarity.point([mesh.positions[i * 3], mesh.positions[i * 3 + 1], mesh.positions[i * 3 + 2]]), i * 3);
    }
    ok(layoutHash(mesh.indices) === route.layout, `${route.id}: the layout hash is over the index buffer, which is integers on both sides`);
    ok(JSON.stringify(localBounds(local)) === JSON.stringify(route.bounds), `${route.id}: the recorded bounds are the LOCAL bounds the shader sees`);
    ok(route.bounds.every((v) => Math.abs(v) <= 1.0001), `${route.id}: and they lie inside the quantised unit cube`);
    /* Decode through a fresh copy: a Buffer from base64 is a view into a
       pooled ArrayBuffer, so reading `.buffer` hands back the whole pool at
       whatever offset this allocation happened to land on. */
    const floats = (encoded) => new Float32Array(Uint8Array.from(Buffer.from(encoded, 'base64')).buffer);
    const centre = floats(route.data.aPathCentre), tangent = floats(route.data.aPathTangent);
    let worstUnit = 0;
    for (let i = 0; i < route.vertices; i++) {
      worstUnit = Math.max(worstUnit, Math.abs(1 - Math.hypot(tangent[i * 3], tangent[i * 3 + 1], tangent[i * 3 + 2])));
    }
    ok(worstUnit < 1e-5, `${route.id}: every stored tangent is a unit vector in local space (worst ${worstUnit.toExponential(1)})`);
    let inside = 0;
    for (let i = 0; i < route.vertices; i++) {
      const d = Math.hypot(local[i * 3] - centre[i * 3], local[i * 3 + 1] - centre[i * 3 + 1], local[i * 3 + 2] - centre[i * 3 + 2]);
      if (d < route.radius * 6) inside++;
    }
    ok(inside === route.vertices, `${route.id}: every vertex sits within a few calibres of its own stored centre (${inside}/${route.vertices})`);
  }
}

/* --- a glow route ships an ordering and nothing that could move a vertex - */
for (const [layer, { result }] of built) {
  for (const route of result.accepted.filter((r) => r.kind === 'glow')) {
    ok(!('aPathCentre' in route.data) && !('aPathTangent' in route.data) && !('aPathBend' in route.data),
      `${layer}/${route.id}: carries no centre, tangent or bend, so nothing in the payload can displace a vertex`);
    ok(route.radius === null, `${layer}/${route.id}: and no calibre, which only a deformation would need`);
    const values = Array.from(route.derived.param);
    ok(Math.min(...values) < .05 && Math.max(...values) > .95, `${layer}/${route.id}: the parameter covers the whole route`);
    ok(values.every((v) => v >= 0 && v <= 1), `${layer}/${route.id}: and never leaves [0,1]`);
  }
}

/* --- every anchor is one the model actually places against the mesh ------ */
for (const [layer, { result }] of built) {
  for (const route of result.accepted) {
    for (const [name, distance] of Object.entries(route.anchors || {})) {
      ok(distance <= 0.01, `${layer}/${route.id}: ${name} touches this mesh (${distance.toFixed(4)} of a 1.7-unit body)`);
    }
  }
}

/*
 * --- the circuits: one crest, crossing a chain of separate meshes ---------
 *
 * The ordering being tested is the curated one, so the assertions here are
 * about ARITHMETIC rather than anatomy: that a route starts exactly where its
 * predecessor finished, that nothing runs off the end of its circuit, and that
 * the display half knows every circuit the data half produced. The anatomy is
 * tested below, against structures that are not the route's own anchors.
 */
for (const [layer, { result }] of built) {
  const byId = new Map(result.accepted.map((r) => [r.id, r]));
  for (const [id, circuit] of Object.entries(result.circuits)) {
    ok(!!FLOW_CIRCUITS[id], `${layer}: circuit ${id} has a display entry in physiology.js`);
    ok(circuit.worldLength > 0, `${layer}: circuit ${id} has a measured length`);
    ok(circuit.broken.length === 0, `${layer}: circuit ${id} has no route continuing one that was refused`);
  }
  for (const route of result.accepted) {
    if (!route.circuit) continue;
    ok(route.uStart >= 0 && route.uStart + route.uSpan <= 1.000001,
      `${layer}/${route.id}: sits inside its circuit (${route.uStart.toFixed(3)}\u2013${(route.uStart + route.uSpan).toFixed(3)})`);
    if (!route.after) {
      ok(route.uStart === 0, `${layer}/${route.id}: starts its circuit at 0`);
      continue;
    }
    const previous = byId.get(route.after);
    ok(!!previous, `${layer}/${route.id}: the route it comes after was accepted too`);
    ok(previous.circuit === route.circuit, `${layer}/${route.id}: and belongs to the same circuit`);
    ok(Math.abs(route.uStart - (previous.uStart + previous.uSpan)) < 1e-5,
      `${layer}/${route.id}: begins exactly where ${route.after} ends, so the crest does not jump the join`);
  }
}

/*
 * --- direction, tested against the model rather than against the input ----
 *
 * Every route's two ends come from the curated definition, so re-reading them
 * proves nothing. World height does not: the abdominal aorta descends and the
 * inferior vena cava ascends, and whether the parameter agrees is a fact about
 * the derived field. The gate could accept a route and still have run it
 * backwards; this is what would catch that.
 */
{
  const DESCENDS = ['aorta-abdominal', 'aorta-thoracic', 'femoral-artery-left', 'femoral-artery-right',
    'iliac-external-left', 'iliac-external-right', 'jugular-internal-left', 'jugular-internal-right'];
  const ASCENDS = ['aorta-ascending', 'carotid-common-left', 'carotid-common-right', 'carotid-internal-left',
    'carotid-internal-right', 'vertebral-artery-left', 'vertebral-artery-right', 'femoral-vein-left',
    'femoral-vein-right', 'vena-cava-inferior-abdominal', 'vena-cava-inferior-thoracic', 'azygos-vein'];
  const { meshes, result } = built.get('circulatory');
  const byId = new Map(result.accepted.map((r) => [r.id, r]));
  for (const [ids, sign, word] of [[DESCENDS, -1, 'downwards'], [ASCENDS, 1, 'upwards']]) {
    for (const id of ids) {
      const route = byId.get(id);
      ok(!!route, `${id}: accepted, so its direction can be checked`);
      const mesh = meshes.get(route.mesh), param = route.derived.param;
      /* Mean world Y of the first and last tenth of the parameter. */
      let lowSum = 0, lowN = 0, highSum = 0, highN = 0;
      for (let i = 0; i < param.length; i++) {
        if (param[i] < .1) { lowSum += mesh.positions[i * 3 + 1]; lowN++; }
        if (param[i] > .9) { highSum += mesh.positions[i * 3 + 1]; highN++; }
      }
      ok(lowN > 0 && highN > 0, `${id}: has surface at both ends of its parameter`);
      const rise = highSum / highN - lowSum / lowN;
      ok(Math.sign(rise) === sign, `${id}: runs ${word} as the parameter increases (${rise.toFixed(3)})`);
    }
  }
}

/* --- and against independent structures, the way the organ routes are ---- */
{
  const { meshes, result } = built.get('circulatory');
  const byId = new Map(result.accepted.map((r) => [r.id, r]));
  /* Neither member of a pair is one of the route's own anchors. */
  const ORDERED = [
    ['aorta-abdominal', 'Coeliac_trunk', 'Common_iliac_arteryl'],
    ['aorta-arch', 'Pulmonary_trunk', 'Left_subclavian_artery'],
    ['carotid-common-left', 'Brachiocephalic_trunk', 'External_carotid_arteryl'],
    ['vena-cava-inferior-abdominal', 'Internal_iliac_veinr', 'Hemi-azygos_vein'],
  ];
  for (const [id, upstream, downstream] of ORDERED) {
    const route = byId.get(id);
    ok(!!route, `${id}: accepted, so it can be checked against landmarks`);
    const mesh = meshes.get(route.mesh);
    ok(!!meshes.get(upstream) && !!meshes.get(downstream), `${id}: both landmarks are meshes in this layer`);
    ok(![route.anchors && Object.keys(route.anchors)].flat().includes(upstream), `${id}: ${upstream} is not one of its own anchors`);
    const before = nearestParam(mesh, route.derived, meshes.get(upstream));
    const after = nearestParam(mesh, route.derived, meshes.get(downstream));
    ok(before < after, `${id}: ${upstream} sits upstream of ${downstream} along the derived route (${before.toFixed(2)} < ${after.toFixed(2)})`);
  }
}

/*
 * --- coverage does not shrink -------------------------------------------
 *
 * A refused route must leave the mesh with the animation it already had, not
 * with nothing. Every refused mesh is classified the way the runtime will
 * classify it, and asked whether that class still carries a rule.
 */
{
  const { classify: classifyMesh, FLOW_CLASSES } = await import('../outputs/physiology.js');
  let refusedButAnimated = 0;
  for (const [layer, { result }] of built) {
    for (const route of result.rejected) {
      const cls = classifyMesh(layer, route.mesh);
      ok(!!FLOW_CLASSES[cls]?.rule, `${layer}/${route.id}: refused, and its mesh still classifies to ${cls}, which has an animation rule`);
      refusedButAnimated++;
    }
  }
  ok(refusedButAnimated > 0, `${refusedButAnimated} refused meshes keep an activity cue rather than going static`);
}

console.log(`PASS: ${checks} model-side assertions (curated names resolve, quotes are on their pages, refusals are named, landmarks fall in the taught order, the committed payload matches a fresh derivation, glow routes carry no deformation data, chains join exactly, direction agrees with the model, budgets hold)`);
