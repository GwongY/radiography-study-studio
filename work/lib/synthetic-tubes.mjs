/*
 * Synthetic tube meshes for the path checks.
 *
 * Written so the ANSWER is known before the code under test runs: the curve is
 * given analytically, so the true centreline, arc length and tangent at any
 * station are known and the derived ones can be compared against them rather
 * than against a previous run of the same code.
 */

/* Parallel transport, so a bent tube carries no spurious twist that would make
   a "radial direction" test pass or fail for the wrong reason. */
export function frames(curve, rings) {
  const points = [], tangents = [];
  for (let i = 0; i < rings; i++) {
    const u = i / (rings - 1), h = 1e-4;
    const a = curve(Math.max(0, u - h)), b = curve(Math.min(1, u + h));
    const t = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const n = Math.hypot(...t) || 1;
    points.push(curve(u)); tangents.push(t.map(v => v / n));
  }
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const unit = (v) => { const n = Math.hypot(...v) || 1; return v.map(x => x / n); };
  let up = Math.abs(tangents[0][1]) > .9 ? [1, 0, 0] : [0, 1, 0];
  let normal = unit(cross(tangents[0], up));
  const normals = [normal];
  for (let i = 1; i < rings; i++) {
    const axis = cross(tangents[i - 1], tangents[i]);
    const sin = Math.hypot(...axis), cos = dot(tangents[i - 1], tangents[i]);
    if (sin < 1e-12) { normals.push(normal); continue; }
    const k = unit(axis), angle = Math.atan2(sin, cos), c = Math.cos(angle), s = Math.sin(angle);
    const rotated = normal.map((v, j) => v * c + cross(k, normal)[j] * s + k[j] * dot(k, normal) * (1 - c));
    normal = unit(rotated); normals.push(normal);
  }
  return { points, tangents, normals, binormals: normals.map((n, i) => cross(tangents[i], n)) };
}

/*
 * `seam` duplicates the closing column of vertices at IDENTICAL positions, the
 * way a UV unwrap does. Welding must fuse them; an unwelded graph splits the
 * tube lengthwise and the geodesic field runs the long way round.
 */
export function tubeMesh(curve, radius, rings, segments, options = {}) {
  const { seam = false, taper = () => 1 } = options;
  const f = frames(curve, rings), positions = [], indices = [];
  const columns = seam ? segments + 1 : segments;
  for (let i = 0; i < rings; i++) {
    const r = radius * taper(i / (rings - 1));
    for (let j = 0; j < columns; j++) {
      const a = 2 * Math.PI * (j % segments) / segments;
      for (let k = 0; k < 3; k++) {
        positions.push(f.points[i][k] + r * (Math.cos(a) * f.normals[i][k] + Math.sin(a) * f.binormals[i][k]));
      }
    }
  }
  const at = (i, j) => i * columns + (seam ? j : j % segments);
  for (let i = 0; i + 1 < rings; i++) for (let j = 0; j < segments; j++) {
    const a = at(i, j), b = at(i, j + 1), c = at(i + 1, j + 1), d = at(i + 1, j);
    indices.push(a, b, c, a, c, d);
  }
  const columnsCount = columns;
  return {
    positions: Float32Array.from(positions), indices: Uint32Array.from(indices),
    rings, columns: columnsCount,
    ring: (i) => Array.from({ length: segments }, (_, j) => i * columnsCount + j),
  };
}

/* A band of triangles between two rings of EXISTING vertices. Real branch and
   fusion topology is a shared edge loop, not two meshes that merely abut: an
   abutting pair welds to nothing and reads as two components, which would test
   the disconnected gate over again instead of the one under test. */
export function joinRings(mesh, a, b) {
  const indices = Array.from(mesh.indices);
  for (let j = 0; j < a.length; j++) {
    const j2 = (j + 1) % a.length;
    indices.push(a[j], b[j], b[j2], a[j], b[j2], a[j2]);
  }
  return { ...mesh, indices: Uint32Array.from(indices) };
}

/* Two vertices at ONE position: welding fuses them, so surface distance leaps
   the gap. This is the shortcut a fused export really contains. */
export function fuse(mesh, from, to) {
  const positions = Float32Array.from(mesh.positions);
  for (let k = 0; k < 3; k++) positions[from * 3 + k] = positions[to * 3 + k];
  return { ...mesh, positions };
}

export function merge(...meshes) {
  const positions = [], indices = [], parts = [];
  for (const m of meshes) {
    const base = positions.length / 3;
    parts.push({ base, mesh: m });
    positions.push(...m.positions);
    for (const i of m.indices) indices.push(i + base);
  }
  return { positions: Float32Array.from(positions), indices: Uint32Array.from(indices), parts };
}

/* A degenerate fan: real exports contain zero-area triangles, and a welded
   graph must survive them rather than dividing by their length. */
export function withDegenerateTriangles(mesh) {
  const indices = Array.from(mesh.indices);
  indices.push(0, 0, 1, 2, 3, 3);
  return { positions: mesh.positions, indices: Uint32Array.from(indices) };
}

export const STRAIGHT = (length = 1, axis = [0, 1, 0]) => (u) => axis.map(v => v * (u - .5) * length);
export const U_BEND = (u) => { const a = Math.PI * u; return [.25 * Math.cos(a) - .25, .35 * Math.sin(a), 0]; };
export const S_BEND = (u) => [.18 * Math.sin(2 * Math.PI * u), u * .8 - .4, .05 * Math.sin(4 * Math.PI * u)];
