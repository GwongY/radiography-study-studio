/*
 * Build the Cell zoom's 3D models — offline, in three steps, and commit what the last one writes.
 *
 * NOT a build step. Nothing in the app runs this; what ships is outputs/cell/models/<level>.glb. The older levels of
 * the Viewer's Cell mode are also drawn in code (outputs/cell/zoom-scene.js, lecture-cells.js): that drawing opens at
 * once and offline, and outputs/cell/models.js swaps the level's model in when its .glb arrives. The newer ones
 * (zoom-scene.js MODEL_ONLY) are their model alone, built from PARTS and LEVELS like the rest. A level's model is an
 * openly licensed download wherever one exists (Sketchfab, CC BY 4.0 — never NC) and Blender-modelled everything
 * else: the downloads are never redrawn, and nothing is drawn in code that ships as a model.
 *
 *   1. node work/build-cell-models.mjs prepare --modules <dir> --src <unzipped downloads>
 *        each download (<src>/<name>/{scene.gltf, scene.bin, textures/, license.txt}) -> work/.cell-build/prep/<name>.glb:
 *        its pieces renamed to the level's labelled parts (extras.czPart), normalised into the level's frame, decimated,
 *        textures shrunk; plus prep/layout.json, where the drawn levels put the things a model must match.
 *   2. blender --background --factory-startup --python work/blender/build.py -- [--level cell,blood]
 *        each level -> work/.cell-build/blender/<level>.glb: the prepared downloads imported, every other part modelled,
 *        the stage slider keyed on the scene timeline (stage k from second k), label anchors as empties.
 *   3. node work/build-cell-models.mjs finish --modules <dir> [--only cell,blood] [--write]
 *        each Blender .glb held to the level (every mesh node a part zoom-scene.js PARTS names, or decoration; every
 *        part there; a slider level animated; every anchor a part), quantized, written to outputs/cell/models/.
 *
 * outputs/cell/models.js MODEL_SOURCES credits each download (author, title, URL), outputs/THIRD-PARTY-NOTICES.txt
 * the same; work/cell-zoom-check.mjs holds them together and re-reads every shipped .glb.
 *
 * Setup (the repo has no node_modules, and does not want one) — the same one-off install as simplify-models.mjs,
 * plus sharp for the textures and three for the procedural layout:
 *   mkdir -p /tmp/glbtools && cd /tmp/glbtools \
 *     && npm i @gltf-transform/core @gltf-transform/extensions @gltf-transform/functions meshoptimizer sharp three@0.161.0
 *
 * Without --write, finish reports what it would write and touches nothing. Bump MODEL_VERSION in outputs/sw.js when a
 * shipped .glb is replaced (a new file needs no bump: a .glb is cache-first on first use).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : dflt;
};
const MODE = process.argv[2];
if (!['prepare', 'finish'].includes(MODE)) { console.log('usage: node work/build-cell-models.mjs prepare|finish --modules <dir> [...] (see the header)'); process.exit(2); }
const WRITE = process.argv.includes('--write');
const MODULES = resolve(arg('modules', join(root, 'node_modules')));
const SRC = resolve(arg('src', join(root, 'work', '.cell-build', 'src')));
const BUILD = resolve(arg('build', join(root, 'work', '.cell-build')));
const PREP = join(BUILD, 'prep'), BLENDED = join(BUILD, 'blender');
const OUT = resolve(arg('out', join(root, 'outputs', 'cell', 'models')));
const ONLY = arg('only', '') ? new Set(arg('only', '').split(',')) : null;

/* Resolved by hand off --modules, as simplify-models.mjs does: the repo has no node_modules of its own. */
const load = async (pkg) => {
  const home = join(MODULES, pkg);
  const meta = JSON.parse(readFileSync(join(home, 'package.json'), 'utf8'));
  const exp = meta.exports && (meta.exports['.'] || meta.exports);
  const pick = (e) => (typeof e === 'string' ? e : e && (pick(e.import) || pick(e.node) || pick(e.default)));
  const entry = pick(exp) || meta.module || meta.main || 'index.js';
  return import(pathToFileURL(join(home, entry)).href);
};
let core, fns, exts, meshopt, sharp, THREE;
try {
  [core, fns, exts, meshopt] = await Promise.all(['@gltf-transform/core', '@gltf-transform/functions', '@gltf-transform/extensions', 'meshoptimizer'].map(load));
  sharp = (await load('sharp')).default;
  THREE = await import(pathToFileURL(join(MODULES, 'three', 'build', 'three.module.js')).href);
} catch (e) {
  console.log('Could not load the glTF tools. See the header for the one-off npm install.');
  console.log(`  looked in: ${MODULES}\n  ${e.message}`);
  process.exit(2);
}
const { NodeIO, Document } = core;
const { MeshoptSimplifier } = meshopt;
await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(exts.ALL_EXTENSIONS);
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
/* the procedural levels, built in Node, so a model can be put where the drawing put its part */
const { createCellZoom, PARTS } = await import(pathToFileURL(join(root, 'outputs', 'cell', 'zoom-scene.js')).href + '?v=1');
const procedural = createCellZoom(THREE);

/* ------------------------------------------------------------------ pieces: one primitive's triangles ---- */
/* { mat, pos, nrm, uv, col, colSize, idx }, all in world space; mat is a source Material or a { color, ... } */
async function readSource(name) {
  const file = join(SRC, name, 'scene.gltf');
  if (!existsSync(file)) throw new Error(`missing source ${file}`);
  const doc = await io.read(file);
  await doc.transform(fns.metalRough());
  const out = [];
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    const W = new THREE.Matrix4().fromArray(node.getWorldMatrix()), N = new THREE.Matrix3().getNormalMatrix(W);
    for (const p of mesh.listPrimitives()) {
      const a = p.getAttribute('POSITION'), n = a.getCount(), v = new THREE.Vector3(), tmp = [0, 0, 0];
      const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3);
      const na = p.getAttribute('NORMAL'), ua = p.getAttribute('TEXCOORD_0'), ca = p.getAttribute('COLOR_0');
      for (let i = 0; i < n; i++) {
        a.getElement(i, tmp); v.fromArray(tmp).applyMatrix4(W); v.toArray(pos, i * 3);
        if (na) { na.getElement(i, tmp); v.fromArray(tmp).applyMatrix3(N).normalize(); v.toArray(nrm, i * 3); }
      }
      let uv = null, col = null, colSize = 0;
      if (ua) { uv = new Float32Array(n * 2); for (let i = 0; i < n; i++) { ua.getElement(i, tmp); uv[i * 2] = tmp[0]; uv[i * 2 + 1] = tmp[1]; } }
      if (ca) { colSize = ca.getElementSize(); col = new Float32Array(n * colSize); const t = new Array(colSize); for (let i = 0; i < n; i++) { ca.getElement(i, t); col.set(t, i * colSize); } }
      const ind = p.getIndices();
      const idx = ind ? Uint32Array.from(ind.getArray()) : Uint32Array.from({ length: n }, (_, i) => i);
      const piece = { name: node.getName(), mat: p.getMaterial(), pos, nrm, uv, col, colSize, idx };
      if (!na) normals(piece);
      out.push(piece);
    }
  }
  return out;
}
const tris = (pc) => pc.idx.length / 3;
/* a piece of a piece: the triangles listed, its vertices compacted */
function sub(pc, triList) {
  const map = new Map(), idx = new Uint32Array(triList.length * 3);
  let k = 0;
  for (const t of triList) for (let j = 0; j < 3; j++) { const o = pc.idx[t * 3 + j]; if (!map.has(o)) map.set(o, map.size); idx[k++] = map.get(o); }
  const pick = (arr, size) => { if (!arr) return null; const out = new Float32Array(map.size * size); for (const [o, i] of map) for (let c = 0; c < size; c++) out[i * size + c] = arr[o * size + c]; return out; };
  return { ...pc, pos: pick(pc.pos, 3), nrm: pick(pc.nrm, 3), uv: pick(pc.uv, 2), col: pick(pc.col, pc.colSize), idx };
}
function stats(pc) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < pc.pos.length; i += 3) for (let a = 0; a < 3; a++) { min[a] = Math.min(min[a], pc.pos[i + a]); max[a] = Math.max(max[a], pc.pos[i + a]); }
  return { min: V(...min), max: V(...max), centre: V((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2), size: V(max[0] - min[0], max[1] - min[1], max[2] - min[2]), tris: tris(pc) };
}
/* connected components, vertices welded by position; largest first, each with its stats */
function components(pc) {
  const n = pc.pos.length / 3, parent = new Int32Array(n), key = new Map();
  for (let i = 0; i < n; i++) { const k = `${pc.pos[i * 3].toFixed(5)},${pc.pos[i * 3 + 1].toFixed(5)},${pc.pos[i * 3 + 2].toFixed(5)}`; parent[i] = key.has(k) ? key.get(k) : (key.set(k, i), i); }
  const find = (a) => { while (parent[a] !== a) a = parent[a] = parent[parent[a]]; return a; };
  for (let t = 0; t < pc.idx.length; t += 3) { const a = find(pc.idx[t]); parent[find(pc.idx[t + 1])] = a; parent[find(pc.idx[t + 2])] = a; }
  const groups = new Map();
  for (let t = 0; t < pc.idx.length / 3; t++) { const r = find(pc.idx[t * 3]); (groups.get(r) || groups.set(r, []).get(r)).push(t); }
  return [...groups.values()].map((list) => { const p = sub(pc, list); return { piece: p, ...stats(p) }; }).sort((a, b) => b.tris - a.tris);
}
/* split by triangle: key(centroid) -> pieces */
function splitTris(pc, key) {
  const groups = new Map(), c = V();
  for (let t = 0; t < pc.idx.length / 3; t++) {
    c.set(0, 0, 0);
    for (let j = 0; j < 3; j++) { const o = pc.idx[t * 3 + j] * 3; c.x += pc.pos[o] / 3; c.y += pc.pos[o + 1] / 3; c.z += pc.pos[o + 2] / 3; }
    const k = key(c, t);
    if (k != null) (groups.get(k) || groups.set(k, []).get(k)).push(t);
  }
  return new Map([...groups].map(([k, list]) => [k, sub(pc, list)]));
}
function merge(list) {
  const n = list.reduce((s, p) => s + p.pos.length / 3, 0), first = list[0];
  const hasUv = list.every((p) => p.uv), hasCol = list.every((p) => p.col && p.colSize === first.colSize);
  const pos = new Float32Array(n * 3), nrm = new Float32Array(n * 3), uv = hasUv ? new Float32Array(n * 2) : null, col = hasCol ? new Float32Array(n * first.colSize) : null;
  const idx = new Uint32Array(list.reduce((s, p) => s + p.idx.length, 0));
  let v = 0, k = 0;
  for (const p of list) {
    pos.set(p.pos, v * 3); nrm.set(p.nrm, v * 3); if (uv) uv.set(p.uv, v * 2); if (col) col.set(p.col, v * first.colSize);
    for (const i of p.idx) idx[k++] = i + v;
    v += p.pos.length / 3;
  }
  return { ...first, pos, nrm, uv, col, colSize: hasCol ? first.colSize : 0, idx };
}
/* an affine map on a piece (normals by the inverse transpose) */
function transform(pc, M) {
  const N = new THREE.Matrix3().getNormalMatrix(M), v = V(), pos = new Float32Array(pc.pos.length), nrm = new Float32Array(pc.nrm.length);
  for (let i = 0; i < pc.pos.length; i += 3) {
    v.fromArray(pc.pos, i).applyMatrix4(M).toArray(pos, i);
    v.fromArray(pc.nrm, i).applyMatrix3(N).normalize().toArray(nrm, i);
  }
  const flip = M.determinant() < 0, idx = Uint32Array.from(pc.idx);
  if (flip) for (let t = 0; t < idx.length; t += 3) [idx[t + 1], idx[t + 2]] = [idx[t + 2], idx[t + 1]];
  return { ...pc, pos, nrm, idx };
}
/* x' = f(x) with slope df(x), y and z scaled by s: the piecewise stretch that puts a long cell into the slide's proportions */
function remapX(pc, f, df, s = 1) {
  const pos = new Float32Array(pc.pos.length), nrm = new Float32Array(pc.nrm.length), n = V();
  for (let i = 0; i < pc.pos.length; i += 3) {
    const x = pc.pos[i], k = df(x);
    pos[i] = f(x); pos[i + 1] = pc.pos[i + 1] * s; pos[i + 2] = pc.pos[i + 2] * s;
    n.set(pc.nrm[i] / k, pc.nrm[i + 1] / s, pc.nrm[i + 2] / s).normalize().toArray(nrm, i);
  }
  return { ...pc, pos, nrm };
}
function normals(pc) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pc.pos, 3)); g.setIndex(new THREE.BufferAttribute(pc.idx, 1));
  g.computeVertexNormals(); pc.nrm = Float32Array.from(g.getAttribute('normal').array);
  return pc;
}
/* one vertex per position (normals recomputed smooth): for meshes exported a triangle at a time */
function weld(pc) {
  const key = new Map(), remap = new Uint32Array(pc.pos.length / 3), keep = [];
  for (let i = 0; i < remap.length; i++) {
    const k = `${pc.pos[i * 3].toFixed(5)},${pc.pos[i * 3 + 1].toFixed(5)},${pc.pos[i * 3 + 2].toFixed(5)}${pc.uv ? `,${pc.uv[i * 2].toFixed(4)},${pc.uv[i * 2 + 1].toFixed(4)}` : ''}`;
    if (!key.has(k)) { key.set(k, keep.length); keep.push(i); }
    remap[i] = key.get(k);
  }
  if (keep.length === remap.length) return pc;
  const pick = (arr, size) => { if (!arr) return null; const out = new Float32Array(keep.length * size); keep.forEach((o, i) => { for (let c = 0; c < size; c++) out[i * size + c] = arr[o * size + c]; }); return out; };
  return normals({ ...pc, pos: pick(pc.pos, 3), nrm: null, uv: pick(pc.uv, 2), col: pick(pc.col, pc.colSize), idx: pc.idx.map((i) => remap[i]) });
}
/* meshoptimizer, down to a share of the triangles (never below a floor) */
function simplify(pc, ratio, error = 0.02, floor = 24, lock = true) {
  const target = Math.max(floor * 3, Math.floor(pc.idx.length * ratio / 3) * 3);
  if (target >= pc.idx.length) return pc;
  pc = weld(pc);
  const [idx] = MeshoptSimplifier.simplify(pc.idx, pc.pos, 3, target, error, lock ? ['LockBorder'] : []);
  if (idx.length < 9) return pc;
  return sub({ ...pc, idx }, Array.from({ length: idx.length / 3 }, (_, t) => t));
}
const boxOf = (pieces) => {
  const b = new THREE.Box3();
  for (const p of pieces) { const s = stats(p); b.expandByPoint(s.min); b.expandByPoint(s.max); }
  return b;
};
/* a similarity: centre -> to, longest extent (or the axis named) -> size */
function fit(pieces, { to = V(), size = 10, along = null, rotate = null }) {
  const b = boxOf(rotate ? pieces.map((p) => transform(p, rotate)) : pieces), s = b.getSize(V());
  const ext = along ? s[along] : Math.max(s.x, s.y, s.z);
  const M = new THREE.Matrix4().makeTranslation(to.x, to.y, to.z).multiply(new THREE.Matrix4().makeScale(size / ext, size / ext, size / ext))
    .multiply(new THREE.Matrix4().makeTranslation(...b.getCenter(V()).negate().toArray()));
  return rotate ? M.multiply(rotate) : M;
}

/* ------------------------------------------------------------------ step 1: prepare the downloads ---- */
const texCache = new Map();
async function shrink(image, max, keepAlpha) {
  const key = `${image.length}:${max}:${keepAlpha}:${Buffer.from(image.subarray(0, 64)).toString('hex')}`;
  if (texCache.has(key)) return texCache.get(key);
  const img = sharp(Buffer.from(image)).resize(max, max, { fit: 'inside', withoutEnlargement: true });
  const out = keepAlpha ? { data: await img.png({ compressionLevel: 9 }).toBuffer(), mime: 'image/png' } : { data: await img.jpeg({ quality: 82 }).toBuffer(), mime: 'image/jpeg' };
  texCache.set(key, out);
  return out;
}
/*
 * parts: [{ part, pieces, shell? }] -> prep/<name>.glb, one node per (part, material), extras { czPart, czShell? }.
 * A source material keeps its base colour texture and normal map (shrunk to texSize) and is made opaque; emissive,
 * occlusion and the metal-rough map are dropped: the app's highlight is an emissive tint, and a phone pays for maps.
 */
async function writePrep(name, parts, { texSize = 1024 } = {}) {
  const doc = new Document(), buffer = doc.createBuffer(), scene = doc.createScene(name);
  const mats = new Map();
  const material = async (src) => {
    if (mats.has(src)) return mats.get(src);
    const m = doc.createMaterial(src.getName() || 'm')
      .setBaseColorFactor([...src.getBaseColorFactor().slice(0, 3), 1]).setRoughnessFactor(Math.max(0.35, src.getRoughnessFactor()))
      .setMetallicFactor(Math.min(0.1, src.getMetallicFactor())).setDoubleSided(src.getDoubleSided());
    const bc = src.getBaseColorTexture(), nt = src.getNormalTexture();
    if (bc) { const s = await shrink(bc.getImage(), texSize, false); m.setBaseColorTexture(doc.createTexture().setImage(s.data).setMimeType(s.mime)); }
    if (nt) { const s = await shrink(nt.getImage(), Math.min(512, texSize), false); m.setNormalTexture(doc.createTexture().setImage(s.data).setMimeType(s.mime)); }
    mats.set(src, m);
    return m;
  };
  const accessor = (arr, type) => doc.createAccessor().setArray(arr).setType(type).setBuffer(buffer);
  const report = [];
  for (const { part, pieces, shell } of parts) {
    if (!pieces.length) throw new Error(`${name}: part ${part} has no pieces`);
    const byMat = new Map();
    for (const p of pieces) (byMat.get(p.mat) || byMat.set(p.mat, []).get(p.mat)).push(p);
    let t = 0;
    for (const [src, list] of byMat) {
      const pc = merge(list);
      const textured = !!(src.getBaseColorTexture() || src.getNormalTexture());
      const prim = doc.createPrimitive().setMaterial(await material(src))
        .setAttribute('POSITION', accessor(pc.pos, 'VEC3')).setAttribute('NORMAL', accessor(pc.nrm, 'VEC3'))
        .setIndices(accessor(pc.idx, 'SCALAR'));
      if (pc.uv && textured) prim.setAttribute('TEXCOORD_0', accessor(pc.uv, 'VEC2'));
      if (pc.col) prim.setAttribute('COLOR_0', accessor(pc.col, pc.colSize === 4 ? 'VEC4' : 'VEC3'));
      scene.addChild(doc.createNode(`cz-${part}`).setMesh(doc.createMesh(`cz-${part}`).addPrimitive(prim)).setExtras(shell ? { czPart: part, czShell: true } : { czPart: part }));
      t += tris(pc);
    }
    report.push(`${part} ${t}`);
  }
  doc.getRoot().setDefaultScene(scene);
  const bin = await io.writeBinary(doc);
  mkdirSync(PREP, { recursive: true });
  writeFileSync(join(PREP, `${name}.glb`), bin);
  console.log(`prep/${name}.glb  ${(bin.byteLength / 1024).toFixed(0)} KB  [${report.join(', ')}]`);
}

/* the procedural part's meshes, posed, in the level's frame (three.js coordinates, y up) */
const drawn = (lv, part) => procedural.meshesOf(lv, part).map((m) => { m.updateMatrix(); return m; });
const pose = (m) => ({ at: m.position.toArray(), q: m.quaternion.toArray(), s: m.scale.toArray() });

const PREPARE = {
  /* "Animal cell - Downloadable" (Lauri Purhonen): a cell cut across, its organelles in the cut face, radius 10. */
  async cell() {
    const src = await readSource('cell');
    const P = {};
    const put = (part, pc) => (P[part] || (P[part] = [])).push(pc);
    src.forEach((pc, i) => {
      if (i === 0) put('cytoplasm', pc);
      else if (i === 1 || i === 10) put('mito', pc);
      else if (i === 2) put('envelope', pc);
      else if (i === 3) put('rer', pc);
      else if (i === 4) for (const c of components(pc)) put(c.tris > 1000 ? 'golgi' : 'vesicles', c.piece);
      else if (i === 5) put('membrane', pc);
      else if (i === 6) for (const c of components(pc)) put(c.tris === 1728 ? 'lyso' : 'centrioles', c.piece);
      else if (i === 7) put('nucleolus', pc);
      else if (i === 8) put('nucleus', pc);
      else if (i === 9) put('pores', pc);
    });
    const M = fit(P.membrane, { size: 20 });
    for (const k of Object.keys(P)) P[k] = P[k].map((pc) => simplify(transform(pc, M), k === 'vesicles' || k === 'nucleus' ? 1 : 0.35, 0.01));
    const shell = new Set(['membrane', 'cytoplasm', 'nucleus']);
    await writePrep('cell', Object.entries(P).map(([part, pieces]) => ({ part, pieces, shell: shell.has(part) })), { texSize: 512 });
  },
  /* "Structure of Centrosome" (arloopa): the two centrioles, each nine triplets of microtubules. Its appendages and its
     own text labels (not the slides' terms) are left out. */
  async centrosome() {
    const src = await readSource('centrosome');
    const cent = src.filter((pc) => pc.mat && pc.mat.getName() === 'yellow');
    const M = fit(cent, { size: 9 });
    await writePrep('centrosome', [{ part: 'centrioles', pieces: cent.map((pc) => transform(pc, M)) }]);
  },
  /* one red cell of the three, flat side down, radius 1 */
  async rbc() {
    let rbc = components((await readSource('rbc'))[0])[0].piece;
    rbc = simplify(transform(rbc, flatToY(rbc)), 0.6, 0.005);
    await writePrep('rbc', [{ part: 'rbc', pieces: [transform(rbc, fit([rbc], { size: 2 }))] }], { texSize: 512 });
  },
  /* a lymphocyte for the leukocytes: its surface (two halves) over its nucleus, radius 1 */
  async lymphocyte() {
    const lym = await readSource('lymphocyte');
    const M = fit([lym[0], lym[1]], { size: 2 });
    await writePrep('lymphocyte', [
      { part: 'wbc', pieces: [lym[0], lym[1]].map((pc) => simplify(transform(pc, M), 0.25, 0.01)) },
      { part: 'wbcnucleus', pieces: [simplify(transform(lym[2], M), 0.3, 0.01)] },
    ]);
  },
  async platelet() {
    const pl = (await readSource('platelet'))[0];
    await writePrep('platelet', [{ part: 'platelets', pieces: [simplify(transform(pl, fit([pl], { size: 2 })), 0.35, 0.01)] }]);
  },
  /* "Macrophage" (andrewfrueh): the body, its longest reach 2; and the three bacteria it is reaching for */
  async macrophage() {
    const src = await readSource('macrophage');
    const body = src.find((pc) => pc.mat && pc.mat.getName() === 'Macrophage_body_bake');
    const bacteria = src.filter((pc) => pc.mat && pc.mat.getName() === 'Bacteria');
    const M = fit([body], { size: 2 });
    await writePrep('macrophage', [
      { part: 'macrophage', pieces: [simplify(transform(body, M), 0.5, 0.01)] },
      { part: 'bacteria', pieces: bacteria.map((pc) => simplify(transform(pc, M), 0.5, 0.01)) },
    ]);
  },
};

/* the centre and radius of the biggest ball inside a piece near a point: where its cell body is. Clearance is to points
   spread over its triangles (a few long triangles would hide a wall), and a centre must be inside (a ray crosses the
   surface an odd number of times). */
function bodyOf(pc, near, reach) {
  const pts = [], a = V(), b = V(), c = V();
  for (let t = 0; t < pc.idx.length; t += 3) {
    a.fromArray(pc.pos, pc.idx[t] * 3); b.fromArray(pc.pos, pc.idx[t + 1] * 3); c.fromArray(pc.pos, pc.idx[t + 2] * 3);
    if (a.distanceTo(near) > reach * 3) continue;
    const area = b.clone().sub(a).cross(c.clone().sub(a)).length() / 2, n = Math.min(60, 1 + Math.ceil(area / (reach * reach * 0.0004)));
    for (let i = 0; i < n; i++) { let u = Math.random(), v = Math.random(); if (u + v > 1) { u = 1 - u; v = 1 - v; } pts.push(a.clone().addScaledVector(b.clone().sub(a), u).addScaledVector(c.clone().sub(a), v)); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pc.pos, 3)); g.setIndex(new THREE.BufferAttribute(pc.idx, 1));
  const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })), ray = new THREE.Raycaster();
  const inside = (p) => { ray.set(p, V(0.577, 0.577, 0.577)); return ray.intersectObject(mesh, false).length % 2 === 1; };
  const clear = (p) => pts.reduce((m, q) => Math.min(m, p.distanceToSquared(q)), Infinity) ** 0.5;
  let best = null, r = -1;
  const N = 9;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
    const p = near.clone().add(V(i / (N - 1) - 0.5, j / (N - 1) - 0.5, k / (N - 1) - 0.5).multiplyScalar(2 * reach));
    const rc = clear(p);
    if (rc > r && inside(p)) { best = p; r = rc; }
  }
  for (let step = reach / N; step > reach / 400; step /= 2) {
    for (let moved = true; moved;) {
      moved = false;
      for (const d of [V(1, 0, 0), V(-1, 0, 0), V(0, 1, 0), V(0, -1, 0), V(0, 0, 1), V(0, 0, -1)]) {
        const p = best.clone().addScaledVector(d, step), rc = clear(p);
        if (rc > r && inside(p)) { best = p; r = rc; moved = true; }
      }
    }
  }
  return { centre: best, r };
}

PREPARE.neuron = async function neuron() {
  /* "Neuron" (Versal): a myelinated multipolar neuron. Its cell body and dendrites are at the +x end; the far end
     ends in terminal branches. Nodes 0-5 are the Schwann cells' nuclei, 6-12 the myelin segments, 13 the neuron. */
  const src = await readSource('neuron');
  const cellPc = src[13];
  const st = stats(cellPc);
  const guess = V(); let ng = 0;
  for (let i = 0; i < cellPc.pos.length; i += 3) if (cellPc.pos[i] > st.max.x - st.size.x * 0.12) { guess.add(V().fromArray(cellPc.pos, i)); ng++; }
  guess.multiplyScalar(1 / ng);
  /* the soma: the biggest ball inside the dense end; search from several starts */
  const soma = bodyOf(cellPc, guess, st.size.x * 0.08);
  const far = V(); let n = 0;
  for (let i = 0; i < cellPc.pos.length; i += 3) if (cellPc.pos[i] < st.min.x + st.size.x * 0.06) { far.add(V().fromArray(cellPc.pos, i)); n++; }
  far.multiplyScalar(1 / n);
  const RS = 2.2, k = RS / soma.r;
  const axis = far.clone().sub(soma.centre).normalize();
  const R = new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(axis, V(1, 0, 0)));
  const M = new THREE.Matrix4().makeScale(k, k, k).multiply(R).multiply(new THREE.Matrix4().makeTranslation(...soma.centre.clone().negate().toArray()));
  const all = src.map((pc) => transform(pc, M));
  const myelin = all.slice(6, 13), nuclei = all.slice(0, 6), body = all[13];
  const segs = myelin.map((pc) => stats(pc)).sort((a, b) => a.min.x - b.min.x);
  const uA = Math.max(RS * 1.5, segs[0].min.x), uB = segs.at(-1).max.x, len = uB - uA, keep = 34;
  console.log(`neuron: soma r ${soma.r.toFixed(1)} (scale ${k.toExponential(2)}), myelin ${segs[0].min.x.toFixed(1)}..${uB.toFixed(1)}, far end ${stats(body).max.x.toFixed(1)}; axon ${len.toFixed(1)} -> ${keep}`);
  /* the myelinated stretch shortened to `keep`, as a slide breaks a long axon; both ends as they are */
  const f = (x) => (x < uA ? x : x > uB ? x - len + keep : uA + (x - uA) * keep / len), df = (x) => (x < uA || x > uB ? 1 : keep / len);
  const squash = (pc) => remapX(pc, f, df, 1);
  const B = squash(body), sq = myelin.map(squash);
  /* the axon's line: the soma, the middle of each myelin segment, the start of the terminal end */
  const line = [V(), ...sq.map((pc) => stats(pc).centre).sort((p, q) => p.x - q.x)];
  const termFrom = f(uB) + RS * 0.3;
  const toLine = (p) => {
    let m = Infinity;
    for (let i = 0; i + 1 < line.length; i++) { const a = line[i], d = line[i + 1].clone().sub(a), t = Math.max(0, Math.min(1, p.clone().sub(a).dot(d) / d.lengthSq())); m = Math.min(m, p.distanceTo(a.clone().addScaledVector(d, t))); }
    return m;
  };
  const parts = splitTris(B, (c) => {
    const r = c.length(), ang = Math.acos(Math.max(-1, Math.min(1, c.x / Math.max(r, 1e-6))));
    if (r < RS * 2.0) return 'body';
    if (c.x > 0 && r < RS * 2.8 && ang < 0.6) return 'hillock';
    if (c.x > termFrom) return 'terminals';
    if (c.x > 0 && toLine(c) < RS * 0.6) return 'axon';
    return 'dendrites';
  });
  console.log('neuron parts', [...parts].map(([p, pc]) => `${p} ${tris(pc)}`).join(', '));
  await writePrep('neuron', [
    ...[...parts].map(([part, pc]) => ({ part, pieces: [simplify(pc, 0.6, 0.004)], shell: part === 'body' })),
    { part: 'myelin', pieces: sq.map((pc) => simplify(pc, 0.2, 0.004)) },
    { part: 'schwann', pieces: nuclei.map((pc) => simplify(squash(pc), 0.15, 0.004)) },
  ]);
};

PREPARE.sperm = async function sperm() {
  /* "CC0 - Sperm" (plaggy; CC BY 4.0 as downloaded): one mesh along x, head at -x. Its radius profile (work notes:
     head to x = -0.050, neck to -0.047, middle piece to -0.031, then the tail) is stretched piece by piece to the
     slide's proportions — head 5, neck 1, middle piece 5, tail 55 (outputs/cell/lecture-cells.js, 0.4 a unit) — and
     its thickness scaled so the head is 1.5 across, as the drawn level's is. */
  const pc = (await readSource('sperm'))[0], st = stats(pc), U = 0.4;
  const from = [st.min.x, -0.050, -0.047, -0.031, st.max.x], to = [0, 5 * U, 6 * U, 11 * U, 66 * U];
  const seg = (x) => Math.max(0, Math.min(3, from.findIndex((b, i) => i > 0 && x <= b) - 1));
  const f = (x) => { const i = seg(x); return to[i] + (x - from[i]) * (to[i + 1] - to[i]) / (from[i + 1] - from[i]); };
  const df = (x) => { const i = seg(x); return (to[i + 1] - to[i]) / (from[i + 1] - from[i]); };
  const s = 0.75 / 0.009;
  const centred = transform(pc, new THREE.Matrix4().makeTranslation(0, -(st.min.y + st.max.y) / 2 * 0, -(st.min.z + st.max.z) / 2));
  const P = remapX(centred, f, df, s);
  const parts = splitTris(P, (c) => (c.x < to[1] ? 'head' : c.x < to[2] ? 'neck' : c.x < to[3] ? 'middle' : 'tail'));
  console.log('sperm', [...parts].map(([p, q]) => `${p} ${tris(q)}`).join(', '), JSON.stringify(stats(P).size.toArray().map((x) => +x.toFixed(2))));
  await writePrep('sperm', [...parts].map(([part, q]) => ({ part, pieces: [q], shell: part === 'head' || part === 'middle' })));
};

/* The membrane: where the model's own proteins land, and where Blender adds the others (x, z in the level's frame). */
const MEMBRANE = {
  window: { x: [12, 44], z: [-30.5, -10.5] },         /* holds one channel, one integral protein, one inner one, uncut */
  added: { carrier: [-3.0, 1.8], receptor: [3.2, -2.6], recognition: [-6.0, 2.6], anchoring: [3.6, 3.6] },
  carve: 1.2,
};
PREPARE.membrane = async function membrane() {
  /* "Plasma Membrane" (Konstantin_Keller): a phospholipid bilayer with four kinds of protein. A window of it, scaled to
     the drawn level's 16 x 10; each lipid split into its head and tails; every twelfth lipid left out for a
     cholesterol (Blender puts one there); room carved for the proteins Blender adds. Its torus protein is a channel,
     its transmembrane cylinder an integral protein, the one sunk in the inner leaflet an enzyme. */
  const src = await readSource('membrane'), W = MEMBRANE.window;
  const cx = (W.x[0] + W.x[1]) / 2, cz = (W.z[0] + W.z[1]) / 2, k = 16 / (W.x[1] - W.x[0]);
  const M = new THREE.Matrix4().makeScale(k, k, k).multiply(new THREE.Matrix4().makeTranslation(-cx, 0, -cz));
  const inWin = (c) => c.x >= W.x[0] && c.x <= W.x[1] && c.z >= W.z[0] && c.z <= W.z[1];
  const P = { heads: [], tails: [], channels: [], integral: [], enzymes: [] }, glyco = [], chol = [];
  const PROT = { protein1: 'channels', protein4: 'integral', protein3: 'enzymes', protein2: 'receptor' };
  const added = Object.values(MEMBRANE.added);
  let n = 0;
  const lipids = [];
  for (const pc of src) {
    const name = pc.mat && pc.mat.getName();
    if (name !== 'lipid') {
      const st = stats(pc);
      if (inWin(st.centre)) { const part = PROT[name]; if (!P[part]) throw new Error(`membrane: a ${name} in the window has no part`); P[part].push(pc); }
      continue;
    }
    for (const c of components(pc)) if (inWin(c.centre)) lipids.push(c);
  }
  /* which leaflet: above or below the middle of the lipids round it (the bilayer undulates) */
  const midAt = (c) => { const ys = lipids.filter((o) => Math.hypot(o.centre.x - c.centre.x, o.centre.z - c.centre.z) < 2.5).map((o) => o.centre.y).sort((p, q) => p - q); return ys[ys.length >> 1]; };
  for (const c of lipids) {
    {
      const q = c.centre.clone().applyMatrix4(M);
      if (added.some(([x, z]) => Math.hypot(q.x - x, q.z - z) < MEMBRANE.carve)) continue;
      const len = c.size.y, up = c.centre.y > midAt(c);
      if (++n % 12 === 0) { chol.push([+q.x.toFixed(3), +q.y.toFixed(3), +q.z.toFixed(3), up ? 1 : -1]); continue; }
      /* a tail runs the lipid's length in a few long triangles; a head is the compact bulb at the fatter end */
      const ys = c.piece.pos, ix = c.piece.idx;
      const halves = splitTris(c.piece, (t, i) => {
        const y0 = Math.min(ys[ix[i * 3] * 3 + 1], ys[ix[i * 3 + 1] * 3 + 1], ys[ix[i * 3 + 2] * 3 + 1]), y1 = Math.max(ys[ix[i * 3] * 3 + 1], ys[ix[i * 3 + 1] * 3 + 1], ys[ix[i * 3 + 2] * 3 + 1]);
        if (y1 - y0 > len * 0.45) return 'tails';
        return (up ? y1 > c.max.y - len * 0.33 : y0 < c.min.y + len * 0.33) ? 'heads' : 'tails';
      });
      for (const [part, h] of halves) P[part].push(h);
      if (up && n % 23 === 5) glyco.push([+q.x.toFixed(3), +(c.max.y * k).toFixed(3), +q.z.toFixed(3)]);
    }
  }
  const out = Object.entries(P).filter(([, l]) => l.length).map(([part, list]) => {
    const merged = transform(merge(list), M);
    return { part, pieces: [part === 'heads' ? simplify(merged, 0.4, 0.002) : part === 'tails' ? simplify(merged, 0.12, 0.004) : merged] };
  });
  extraLayout.membrane = { cholesterol: chol, glycolipids: glyco, added: MEMBRANE.added };
  console.log(`membrane: ${n} lipids, ${chol.length} for cholesterol, ${glyco.length} glycolipid heads`);
  await writePrep('membrane', out);
};

/* the height where a cell's body ends and its crown of hairs (cilia, microvilli) begins: where vertices crowd */
function crownStart(pc) {
  const st = stats(pc), B = 40, n = new Array(B).fill(0);
  for (let i = 1; i < pc.pos.length; i += 3) n[Math.min(B - 1, Math.floor((pc.pos[i] - st.min.y) / st.size.y * B))]++;
  const mid = [...n.slice(B * 0.3, B * 0.6)].sort((a, b) => a - b)[Math.floor(B * 0.15)] || 1;
  /* from the crowded peak in the top half, down to where the crowd thins to the body's */
  let b = B / 2;
  for (let i = B / 2; i < B; i++) if (n[i] > n[b]) b = i;
  if (n[b] < mid * 2.5) return st.max.y;
  while (b > B * 0.5 && n[b - 1] > mid * 3) b--;
  return st.min.y + (b / B) * st.size.y;
}
PREPARE.epithelium = async function epithelium() {
  /* "Epithelium of the Trachea" (Sieben Medical Art): ciliated columnar cells, cells with a brush of microvilli, goblet
     and basal cells on a basement membrane. Each cell's crown (cilia, or microvilli) is cut from its body; the top of
     the body is its apical surface, the rest its basolateral surfaces. 14 wide, base at y = -3.5. */
  const src = await readSource('trachea');
  const all = boxOf(src), k = 14 / all.getSize(V()).x, c = all.getCenter(V());
  const M = new THREE.Matrix4().makeTranslation(0, -3.5, 0).multiply(new THREE.Matrix4().makeScale(k, k, k)).multiply(new THREE.Matrix4().makeTranslation(-c.x, -all.min.y, -c.z));
  const P = { cilia: [], microvilli: [], apical: [], basolateral: [], basement: [] };
  for (const raw of src) {
    const name = raw.mat && raw.mat.getName(), pc = transform(raw, M);
    if (name === 'defaultMat') { P.basement.push(simplify(pc, 0.5, 0.005)); continue; }
    const crown = name === 'material_2' ? 'cilia' : name === 'material_0' ? 'microvilli' : null;
    /* basal cells (material_3) do not reach the surface: all of them is basolateral */
    const top = crown ? crownStart(pc) : name === 'material_3' ? Infinity : stats(pc).max.y, apical = top - 0.25;
    /* a hair is a thin tube: long sliver triangles; the top of the body is not */
    const A = V(), Bv = V(), Cv = V();
    const hair = (i) => {
      A.fromArray(pc.pos, pc.idx[i * 3] * 3); Bv.fromArray(pc.pos, pc.idx[i * 3 + 1] * 3); Cv.fromArray(pc.pos, pc.idx[i * 3 + 2] * 3);
      const nrm = Bv.clone().sub(A).cross(Cv.clone().sub(A)), e = Math.max(A.distanceTo(Bv), Bv.distanceTo(Cv), Cv.distanceTo(A)), area = nrm.length() / 2;
      /* a hair's side faces sideways; the dome of the cell faces up */
      return (area / (e * e) < 0.06 || e < 0.03) && Math.abs(nrm.normalize().y) < 0.6;
    };
    /* the hairs cut off and simplified on their own; the body simplified whole, then cut at the apical line (its border
       with the hairs left free: locked, the dense ring of hair roots would not simplify) */
    for (const [part, q] of splitTris(pc, (t, i) => (crown && t.y > top - 0.6 && (t.y > top + 0.25 || hair(i)) ? crown : 'body'))) {
      if (part !== 'body') { P[part].push(simplify(q, part === 'cilia' ? 0.05 : 0.06, 0.02)); continue; }
      for (const [side, r] of splitTris(simplify(q, 0.03, 0.035, 24, false), (t) => (t.y > apical ? 'apical' : 'basolateral'))) P[side].push(r);
    }
  }
  console.log('epithelium', Object.entries(P).map(([p, l]) => `${p} ${l.reduce((a, q) => a + tris(q), 0)}`).join(', '));
  await writePrep('epithelium', Object.entries(P).map(([part, pieces]) => ({ part, pieces })));
};

PREPARE.chromosome = async function chromosome() {
  /* "Chromosome X" (LucasPresoto): one duplicated chromosome standing along y, its centromere a ball where the two
     chromatids cross. Split into the ball and the chromatid either side of it (x below or above the ball's centre);
     6.5 tall, the ball at the origin. The DNA level wears it whole; the cell cycle and meiosis use one chromatid. */
  const src = await readSource('chromosome');
  const comps = src.flatMap((pc) => components(pc));
  for (const c of comps) console.log('  component', c.tris, 'tris, size', c.size.toArray().map((x) => x.toFixed(1)).join(' x '), 'at', c.centre.toArray().map((x) => x.toFixed(1)).join(','));
  /* the ball: the roundest component, no bigger than a fifth of the whole */
  const all = boxOf(src), H = all.getSize(V()).y;
  const round = (c) => Math.max(c.size.x, c.size.y, c.size.z) / Math.max(1e-6, Math.min(c.size.x, c.size.y, c.size.z));
  const balls = comps.filter((c) => c.size.y < H / 5).sort((a, b) => round(a) - round(b));
  let ball = balls[0], centre;
  const P = { left: [], right: [], centromere: [] };
  if (ball && round(ball) < 1.4) { centre = ball.centre; P.centromere.push(ball.piece); }
  else {
    /* one mesh: the ball is what lies within the narrowest waist's radius of the middle */
    centre = all.getCenter(V());
    console.log('  no separate ball; cutting at the middle');
  }
  const rBall = ball && round(ball) < 1.4 ? Math.max(ball.size.x, ball.size.y) / 2 : H * 0.035;
  for (const c of comps) {
    if (c === ball && P.centromere.length) continue;
    for (const [k, q] of splitTris(c.piece, (t) => (!P.centromere.length && t.distanceTo(centre) < rBall ? 'centromere' : t.x < centre.x ? 'left' : 'right'))) P[k].push(q);
  }
  const M = new THREE.Matrix4().makeScale(6.5 / H, 6.5 / H, 6.5 / H).multiply(new THREE.Matrix4().makeTranslation(...centre.clone().negate().toArray()));
  for (const k of Object.keys(P)) P[k] = P[k].map((pc) => simplify(transform(pc, M), 0.5, 0.005));
  await writePrep('chromosome', Object.entries(P).map(([part, pieces]) => ({ part, pieces })), { texSize: 512 });
};

PREPARE.nucleosome = async function nucleosome() {
  /* not a download: PDB 3AFA as outputs/cell/nucleosome-3afa.js keeps it, in the drawn level's units (10 Å), for
     Blender to model the histone surfaces, the DNA, its bases and the linker DNA from */
  const N = await import(pathToFileURL(join(root, 'outputs', 'cell', 'nucleosome-3afa.js')).href + '?v=1');
  const sc = (arr) => Array.from(arr, (x) => x * 0.01);
  const out = {
    histones: N.HISTONE_CHAINS.map((h) => ({ name: h.name, ca: sc(h.ca) })),
    strands: N.DNA_STRANDS.map((d) => ({ bases: d.bases, backbone: sc(d.backbone), c1: sc(d.c1) })),
    pairs: Array.from(N.BASE_PAIRS),
  };
  mkdirSync(PREP, { recursive: true });
  writeFileSync(join(PREP, 'nucleosome.json'), JSON.stringify(out));
  console.log(`prep/nucleosome.json  ${out.histones.length} histone chains, ${out.strands[0].bases.length} bp`);
};

/* where the drawn levels put what a model must match */
const extraLayout = {};
function writeLayout() {
  const old = existsSync(join(PREP, 'layout.json')) ? JSON.parse(readFileSync(join(PREP, 'layout.json'), 'utf8')) : {};
  const layout = {
    ...old, ...extraLayout,
    blood: { rbc: drawn('blood', 'rbc').map(pose), wbc: drawn('blood', 'wbc').filter((m) => m.scale.x > 1.5).map(pose), platelets: drawn('blood', 'platelets').map(pose) },
    alveolus: { macrophage: drawn('alveolus', 'macrophage').map(pose) },
  };
  mkdirSync(PREP, { recursive: true });
  writeFileSync(join(PREP, 'layout.json'), JSON.stringify(layout, null, 1));
  console.log('prep/layout.json');
}

/* turn a disc so its thinnest axis is y */
function flatToY(pc) {
  const c = stats(pc).centre, n = pc.pos.length / 3;
  const C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < n; i++) { const d = [pc.pos[i * 3] - c.x, pc.pos[i * 3 + 1] - c.y, pc.pos[i * 3 + 2] - c.z]; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) C[a][b] += d[a] * d[b] / n; }
  let best = null, bv = Infinity;
  for (let k = 0; k < 4000; k++) {
    const y = 1 - (2 * (k + 0.5)) / 4000, r = Math.sqrt(1 - y * y), t = k * Math.PI * (3 - Math.sqrt(5)), d = [Math.cos(t) * r, y, Math.sin(t) * r];
    let v = 0; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) v += d[a] * C[a][b] * d[b];
    if (v < bv) { bv = v; best = V(...d); }
  }
  return new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(best, V(0, 1, 0)));
}

/* ------------------------------------------------------------------ step 3: finish Blender's output ---- */
const { LEVELS: CELL_LEVELS } = await import(pathToFileURL(join(root, 'outputs', 'cell-zoom.js')).href + '?v=1');
const VIEW = { cell: [0.85, 1.5, 1], centrosome: [1, 0.6, 1], alveolus: [1, 0.45, 1], nucleus: [1, 0.5, 1], membrane: [0.35, 0.55, 1], epithelium: [0.45, 0.35, 1], apc: [1, 0.4, 1.1], nucleosome: [0.15, 0.35, 1] };
async function finish(level, file) {
  const doc = await io.read(file), rt = doc.getRoot(), errors = [];
  const parts = new Set(PARTS[level] || []), lv = CELL_LEVELS.find((l) => l.id === level);
  if (!lv) errors.push(`no level ${level} in outputs/cell-zoom.js`);
  /* Blender writes an action per object; the app plays one clip (the first), so they become one */
  const [clip, ...more] = rt.listAnimations();
  for (const a of more) {
    for (const c of a.listChannels()) { clip.addChannel(c); clip.addSampler(c.getSampler()); }
    a.dispose();
  }
  if (clip) clip.setName(level);
  const animated = new Set();
  for (const a of rt.listAnimations()) for (const c of a.listChannels()) if (c.getTargetNode()) animated.add(c.getTargetNode());
  const movesWith = (node) => { for (let n = node; n; n = n.getParentNode()) if (animated.has(n)) return true; return false; };
  const seen = new Set(), anchored = new Set(), dir = V(...(VIEW[level] || [0.2, 0.3, 1])).normalize();
  for (const node of rt.listNodes()) {
    const ex = node.getExtras() || {};
    if (ex.czAnchorOf) { if (!parts.has(ex.czAnchorOf)) errors.push(`anchor ${node.getName()} names ${ex.czAnchorOf}, not a part of ${level}`); anchored.add(ex.czAnchorOf); }
    if (!node.getMesh() || ex.czDecor) continue;
    if (!ex.czPart) { errors.push(`mesh node ${node.getName()} has no czPart (or czDecor)`); continue; }
    if (!parts.has(ex.czPart)) { errors.push(`node ${node.getName()}: ${ex.czPart} is not a part of ${level} (zoom-scene.js PARTS)`); continue; }
    seen.add(ex.czPart);
  }
  for (const p of parts) if (!seen.has(p)) errors.push(`part ${p} is missing`);
  if (lv && lv.slider && !rt.listAnimations().length) errors.push(`${level} has a stage slider but no animation`);
  /* a still part with no anchor empty gets one: the vertex of its biggest mesh that faces the default view most */
  for (const p of seen) {
    if (anchored.has(p)) continue;
    const nodes = rt.listNodes().filter((n) => n.getMesh() && (n.getExtras() || {}).czPart === p);
    if (nodes.some(movesWith)) continue;
    let best = -Infinity, at = null;
    for (const n of nodes) {
      const W = new THREE.Matrix4().fromArray(n.getWorldMatrix()), v = [0, 0, 0];
      for (const prim of n.getMesh().listPrimitives()) {
        const a = prim.getAttribute('POSITION'), pts = [];
        for (let i = 0; i < a.getCount(); i++) { a.getElement(i, v); pts.push(V(...v).applyMatrix4(W)); }
        const c = pts.reduce((s, q) => s.add(q), V()).multiplyScalar(1 / pts.length);
        for (const q of pts) { const d = q.clone().sub(c).dot(dir) + q.dot(dir) * 0.15 + Math.log(pts.length); if (d > best) { best = d; at = q; } }
      }
    }
    nodes[0].setExtras({ ...nodes[0].getExtras(), czAnchor: at.toArray().map((x) => +x.toFixed(4)) });
  }
  if (errors.length) { console.log(`${level}: REFUSED\n  ${errors.join('\n  ')}`); return false; }
  for (const t of rt.listTextures()) {
    const img = t.getImage(), meta = await sharp(Buffer.from(img)).metadata();
    if (Math.max(meta.width, meta.height) > 1024 || (t.getMimeType() === 'image/png' && !meta.hasAlpha)) {
      const s = await shrink(img, 1024, !!meta.hasAlpha); t.setImage(s.data).setMimeType(s.mime);
    }
  }
  /* texture coordinates and vertex colours a plain material never reads are dead weight */
  for (const m of rt.listMeshes()) for (const p of m.listPrimitives()) {
    const mt = p.getMaterial(), textured = mt && (mt.getBaseColorTexture() || mt.getNormalTexture() || mt.getEmissiveTexture() || mt.getOcclusionTexture() || mt.getMetallicRoughnessTexture());
    for (const sem of p.listSemantics()) if ((!textured && sem.startsWith('TEXCOORD_')) || sem.startsWith('COLOR_')) p.setAttribute(sem, null);
  }
  await doc.transform(fns.dedup(), fns.prune({ keepLeaves: true, keepExtras: true }), fns.resample(), fns.quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12, quantizeColor: 8 }));
  const bin = await io.writeBinary(doc);
  let t = 0;
  for (const m of rt.listMeshes()) for (const p of m.listPrimitives()) t += (p.getIndices() ? p.getIndices().getCount() : p.getAttribute('POSITION').getCount()) / 3;
  console.log(`${level}.glb  ${(bin.byteLength / 1024).toFixed(0)} KB  ${t} tris  ${seen.size} parts  ${rt.listAnimations().length} animation(s)`);
  if (WRITE) { mkdirSync(OUT, { recursive: true }); writeFileSync(join(OUT, `${level}.glb`), bin); }
  return true;
}

if (MODE === 'prepare') {
  for (const [name, build] of Object.entries(PREPARE)) if (!ONLY || ONLY.has(name)) await build();
  writeLayout();
} else {
  let bad = 0;
  const files = existsSync(BLENDED) ? readdirSync(BLENDED).filter((f) => f.endsWith('.glb')) : [];
  if (!files.length) console.log(`nothing in ${BLENDED}: run step 2 (Blender) first`);
  for (const f of files) { const level = f.slice(0, -4); if (!ONLY || ONLY.has(level)) bad += (await finish(level, join(BLENDED, f))) ? 0 : 1; }
  if (!WRITE) console.log('\n(dry run: nothing written; add --write)');
  process.exit(bad ? 1 : 0);
}
