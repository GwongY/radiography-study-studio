/*
 * Decode POSITION vertices out of an uncompressed GLB, node-side.
 *
 * The cavity geometry is derived from real vertices (inner surface of the rib
 * cage, the dome of the diaphragm, the ring of the true pelvis), and that math
 * has to be developed and checked against the actual anatomy rather than eyeballed
 * in a browser. This gives the node harness the same point clouds the runtime sees.
 *
 * All four bundled layers are plain float32 VEC3, tightly packed, no Draco or
 * meshopt -- checked before relying on it. If a compressed layer is ever added
 * this throws rather than returning silently wrong numbers.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');

const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function mul(a, b) {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  }
  return o;
}
function fromTRS(t, r, s) {
  const [x, y, z, w] = r, [sx, sy, sz] = s;
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2;
  const yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    t[0], t[1], t[2], 1,
  ];
}
const nodeMatrix = (n) => (n.matrix ? n.matrix.slice()
  : fromTRS(n.translation || [0, 0, 0], n.rotation || [0, 0, 0, 1], n.scale || [1, 1, 1]));

/*
 * three.js sanitises node names on import: whitespace becomes '_', and the
 * reserved set [ ] . : / is deleted outright. So "Hip bone.l" reaches the
 * runtime as "Hip_bonel". The resolver has to match what the RUNTIME sees, so
 * reproduce that here exactly rather than matching the pretty GLB name.
 */
export function sanitizeNodeName(name) {
  return String(name).replace(/\s/g, '_').replace(/[\[\]\.:\/]/g, '');
}

export function loadGlbMeshes(relPath) {
  const buf = readFileSync(join(root, relPath));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a glb: ' + relPath);
  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));
  /*
   * KHR_mesh_quantization is understood below — readPositions decodes the
   * normalized integer attributes it introduces. Every OTHER required
   * extension is still a hard stop, because silently reading a buffer this
   * decoder does not understand would produce plausible, wrong anatomy rather
   * than an error.
   */
  const KNOWN_EXTENSIONS = new Set(['KHR_mesh_quantization']);
  const unknown = (json.extensionsRequired || []).filter((e) => !KNOWN_EXTENSIONS.has(e));
  if (unknown.length) {
    throw new Error(`${relPath} requires extensions ${unknown.join(',')} — decoder does not handle these`);
  }
  /* chunk 1 is BIN; its header sits right after the JSON chunk */
  const binOff = 20 + jsonLen;
  const binLen = buf.readUInt32LE(binOff);
  const bin = buf.slice(binOff + 8, binOff + 8 + binLen);

  /*
   * POSITION is float in a plain file and a normalized integer in a quantized
   * one, where the metres are recovered by dividing by the component type's
   * maximum and then applying the node transform, which carries the scale and
   * offset. Everything downstream works in the node's local frame exactly as
   * before, so decoding here is the whole of the change.
   *
   * byteStride is honoured rather than assumed: quantized attributes are packed
   * tighter than floats and are padded to a four-byte boundary, so a hard-coded
   * 12 reads the wrong vertex from the second one onward.
   */
  const COMPONENT = {
    5126: { size: 4, norm: 1, read: (b, o) => b.readFloatLE(o) },
    5122: { size: 2, norm: 32767, read: (b, o) => b.readInt16LE(o) },
    5123: { size: 2, norm: 65535, read: (b, o) => b.readUInt16LE(o) },
    5120: { size: 1, norm: 127, read: (b, o) => b.readInt8(o) },
    5121: { size: 1, norm: 255, read: (b, o) => b.readUInt8(o) },
  };
  const readPositions = (accIdx) => {
    const acc = json.accessors[accIdx];
    const c = COMPONENT[acc.componentType];
    if (!c || acc.type !== 'VEC3') {
      throw new Error(`unexpected POSITION accessor ${acc.componentType}/${acc.type}`);
    }
    const div = acc.normalized ? c.norm : 1;
    const bv = json.bufferViews[acc.bufferView];
    const start = (bv.byteOffset || 0) + (acc.byteOffset || 0);
    const stride = bv.byteStride || c.size * 3;
    const out = new Float32Array(acc.count * 3);
    for (let i = 0; i < acc.count; i++) {
      const o = start + i * stride;
      out[i * 3] = c.read(bin, o) / div;
      out[i * 3 + 1] = c.read(bin, o + c.size) / div;
      out[i * 3 + 2] = c.read(bin, o + c.size * 2) / div;
    }
    return out;
  };

  /*
   * Indices matter as much as positions here: finding the vertebral foramen
   * means slicing the mesh with a plane, and a plane can only be intersected
   * with TRIANGLES. A bare vertex cloud is far too sparse -- these bones carry
   * only a few hundred vertices each, so a thin slice of the cloud is a
   * scattering of dots with gaps a flood fill pours straight through.
   */
  const readIndices = (accIdx, vertexCount) => {
    if (accIdx == null) {
      const out = new Uint32Array(vertexCount);
      for (let i = 0; i < vertexCount; i++) out[i] = i;      /* non-indexed: sequential */
      return out;
    }
    const acc = json.accessors[accIdx];
    const bv = json.bufferViews[acc.bufferView];
    const start = (bv.byteOffset || 0) + (acc.byteOffset || 0);
    const out = new Uint32Array(acc.count);
    const size = acc.componentType === 5125 ? 4 : acc.componentType === 5123 ? 2 : 1;
    for (let i = 0; i < acc.count; i++) {
      const o = start + i * size;
      out[i] = size === 4 ? bin.readUInt32LE(o) : size === 2 ? bin.readUInt16LE(o) : bin.readUInt8(o);
    }
    return out;
  };

  const out = [];
  const scene = json.scenes?.[json.scene ?? 0];
  const roots = scene?.nodes ?? json.nodes.map((_, i) => i);
  /*
   * A mesh takes the name of the nearest NAMED node at or above it.
   *
   * Quantization cannot give a node its own attribute transform while that node
   * also parents children quantized differently, so for the 36 nodes across the
   * seven layers that carry both a mesh and children — Liver over its segments,
   * Medulla oblongata.l over its parts, Frontal bone over its sinus — it moves
   * the parent's own mesh down onto a new unnamed child.
   *
   * Falling through to mesh?.name there is what silently renamed things: the
   * mesh record is shared and unsided, so "Medulla oblongata.l" and
   * "Medulla oblongata.r" both came back as "medulla oblongata" and the brain
   * landmark counted ten meshes where it had counted eleven. Inheriting the
   * name keeps the side, and on an unquantized file every mesh-carrying node
   * has its own name, so the inherited value is never consulted.
   */
  const visit = (idx, parent, inherited) => {
    const n = json.nodes[idx];
    if (!n) return;
    const world = mul(parent, nodeMatrix(n));
    const owned = n.name || inherited;
    if (n.mesh != null) {
      const mesh = json.meshes[n.mesh];
      const name = owned || mesh?.name || `mesh${n.mesh}`;
      const chunks = [], idxChunks = [];
      let base = 0;
      for (const prim of mesh?.primitives || []) {
        const pi = prim.attributes?.POSITION;
        if (pi == null) continue;
        const p = readPositions(pi);
        /* bake the node transform so every layer lands in one shared frame */
        for (let i = 0; i < p.length; i += 3) {
          const x = p[i], y = p[i + 1], z = p[i + 2];
          p[i] = world[0] * x + world[4] * y + world[8] * z + world[12];
          p[i + 1] = world[1] * x + world[5] * y + world[9] * z + world[13];
          p[i + 2] = world[2] * x + world[6] * y + world[10] * z + world[14];
        }
        const ix = readIndices(prim.indices, p.length / 3);
        const shifted = new Uint32Array(ix.length);
        for (let i = 0; i < ix.length; i++) shifted[i] = ix[i] + base;
        chunks.push(p); idxChunks.push(shifted);
        base += p.length / 3;
      }
      if (chunks.length) {
        const all = new Float32Array(chunks.reduce((s, c) => s + c.length, 0));
        let o = 0;
        for (const c of chunks) { all.set(c, o); o += c.length; }
        const allIdx = new Uint32Array(idxChunks.reduce((s, c) => s + c.length, 0));
        o = 0;
        for (const c of idxChunks) { allIdx.set(c, o); o += c.length; }
        out.push({ name: sanitizeNodeName(name), rawName: name, positions: all, indices: allIdx });
      }
    }
    for (const c of n.children || []) visit(c, world, owned);
  };
  for (const r of roots) visit(r, ident(), null);
  return out;
}

if (process.argv[1]?.endsWith('glb-mesh.mjs')) {
  const meshes = loadGlbMeshes(process.argv[2]);
  const filter = (process.argv[3] || '').toLowerCase();
  let verts = 0;
  for (const m of meshes) verts += m.positions.length / 3;
  console.log(`${process.argv[2]}: ${meshes.length} meshes, ${verts} vertices`);
  for (const m of meshes) {
    if (filter && !m.name.toLowerCase().includes(filter)) continue;
    console.log(`  ${m.name.padEnd(50)} ${(m.positions.length / 3).toString().padStart(7)} verts`);
  }
}
