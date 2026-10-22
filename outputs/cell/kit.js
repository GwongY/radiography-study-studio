/*
 * Cell zoom — the shared building kit for the level groups (cell/zoom-scene.js) and the models put on them (cell/models.js).
 *
 * makeKit(THREE, root) returns the helpers every level is built with: one material per labelled part (so a
 * highlight or a fade never spills onto another part), tagging a mesh with its part, label anchors, fading a part
 * in and out (`presence`, which also decides which labels a stage shows), cylinders between two points, tubes,
 * cut-away spheres, and the "peanut" a dividing cell pinches through. three.js is passed in, so this module
 * imports nothing and Node can import the modules that import it. Nothing runs at module scope.
 */

/* A deterministic scatter, so the scenes are the same on every open. */
export function rand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export const clamp01 = (x) => Math.min(1, Math.max(0, x));
/* progress of f through [a, b], eased */
export const span = (f, a, b) => { const k = clamp01((f - a) / (b - a)); return k * k * (3 - 2 * k); };
export const mix = (a, b, k) => a + (b - a) * k;

export function makeKit(THREE, root) {
  const disposables = [];
  const keep = (x) => { disposables.push(x); return x; };
  const parts = {};      /* level -> part -> [objects] */
  const anchorFns = {};  /* level -> part -> () => local Vector3 */
  const presence = {};   /* level -> part -> 0..1 */
  const levels = {};
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

  const mat = (color, o = {}) => keep(new THREE.MeshStandardMaterial({
    color, roughness: o.rough ?? 0.6, metalness: 0, transparent: (o.opacity ?? 1) < 1, opacity: o.opacity ?? 1,
    depthWrite: o.depthWrite ?? (o.opacity ?? 1) >= 1, side: o.side ?? THREE.FrontSide, emissive: 0x000000,
  }));
  const level = (id) => {
    const g = new THREE.Group();
    g.name = `cz-${id}`;
    g.visible = false;
    root.add(g);
    levels[id] = g; parts[id] = {}; anchorFns[id] = {}; presence[id] = {};
    return g;
  };
  /* tag an object (and remember its material's own opacity, for fading) */
  const tag = (lv, part, obj, o = {}) => {
    obj.userData.czPart = part;
    if (o.shell) obj.userData.shell = true;   /* picked only when nothing else is under the tap */
    if (o.noPick) obj.userData.noPick = true;
    const ms = [].concat(obj.material || []);
    for (const m of ms) if (m.userData.base == null) m.userData.base = m.opacity;
    (parts[lv][part] || (parts[lv][part] = [])).push(obj);
    if (presence[lv][part] == null) presence[lv][part] = 1;
    return obj;
  };
  const anchor = (lv, part, fn) => { anchorFns[lv][part] = typeof fn === 'function' ? fn : () => fn; };
  /* fade a part: 0 hides it (and its label), 1 is as built */
  const show = (lv, part, a) => {
    presence[lv][part] = a;
    for (const o of parts[lv][part] || []) {
      o.visible = a > 0.02;
      for (const m of [].concat(o.material || [])) {
        const op = m.userData.base * a;
        m.opacity = op;
        m.transparent = op < 0.999;
        m.depthWrite = op >= 0.999 && m.userData.base >= 0.999;
      }
    }
  };
  const add = (g, lv, part, obj, o) => { g.add(part ? tag(lv, part, obj, o) : obj); return obj; };

  /* geometry */
  const up = V(0, 1, 0);
  const placeBetween = (obj, a, b, r = 1) => {
    const d = b.clone().sub(a), len = Math.max(1e-4, d.length());
    obj.position.copy(a).addScaledVector(d, 0.5);
    obj.quaternion.setFromUnitVectors(up, d.divideScalar(len));
    obj.scale.set(r, len, r);
    return obj;
  };
  const unitCyl = keep(new THREE.CylinderGeometry(1, 1, 1, 10));
  const unitSphere = keep(new THREE.SphereGeometry(1, 20, 14));
  const lowSphere = keep(new THREE.SphereGeometry(1, 10, 8));
  const between = (a, b, r, material) => placeBetween(new THREE.Mesh(unitCyl, material), a, b, r);
  const sphere = (r, material, at = null, seg = null) => {
    const m = new THREE.Mesh(seg ? keep(new THREE.SphereGeometry(1, seg[0], seg[1])) : unitSphere, material);
    m.scale.setScalar(r);
    if (at) m.position.copy(at);
    return m;
  };
  const tube = (points, r, material, seg = null, closed = false) => {
    const curve = new THREE.CatmullRomCurve3(points, closed);
    return new THREE.Mesh(keep(new THREE.TubeGeometry(curve, seg || Math.max(16, points.length * 6), r, 8, closed)), material);
  };
  /* a sphere with the wedge facing the default view (+x, +z) cut away */
  const cutSphere = (r, material, seg = 48) => new THREE.Mesh(keep(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75), Math.PI, Math.PI * 1.5)), material);
  /* instanced copies of one geometry; each(i, dummy) poses instance i */
  const instanced = (geometry, material, n, each) => {
    const im = new THREE.InstancedMesh(geometry, material, n);
    const d = new THREE.Object3D();
    for (let i = 0; i < n; i++) { d.position.set(0, 0, 0); d.rotation.set(0, 0, 0); d.quaternion.identity(); d.scale.set(1, 1, 1); each(i, d); d.updateMatrix(); im.setMatrixAt(i, d.matrix); }
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere();
    return im;
  };
  /* instanced cylinders whose ends move: set(i, a, b, r) then commit() */
  const rods = (material, n, r = 0.05) => {
    const im = new THREE.InstancedMesh(unitCyl, material, n);
    const d = new THREE.Object3D();
    im.userData.set = (i, a, b, rr = r) => { placeBetween(d, a, b, rr); d.updateMatrix(); im.setMatrixAt(i, d.matrix); };
    im.userData.hide = (i) => { d.position.set(0, 0, 0); d.scale.set(0, 0, 0); d.updateMatrix(); im.setMatrixAt(i, d.matrix); };
    im.userData.commit = () => { im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere(); };
    for (let i = 0; i < n; i++) im.userData.hide(i);
    return im;
  };
  /* points spread evenly over a sphere (Fibonacci), as unit vectors */
  const fib = (n) => Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), t = i * Math.PI * (3 - Math.sqrt(5));
    return V(Math.cos(t) * r, y, Math.sin(t) * r);
  });
  /* in the cut-away wedge (+x, +z)? */
  const inWedge = (v) => v.x > 0 && v.z > 0;

  /*
   * The dividing cell: two spheres of radius R whose centres sit at -d and +d along the axis, pinched at the
   * middle by `pinch` (0 none .. 1 two cells). Returned as a lathe geometry along x ('x') or y ('y').
   */
  const peanut = (R, d, pinch, axis = 'x', seg = 40) => {
    const H = d + R, pts = [];
    const n = 48;
    for (let i = 0; i <= n; i++) {
      const t = -H + (2 * H * i) / n;
      const a = Math.sqrt(Math.max(0, R * R - (t - d) ** 2)), b = Math.sqrt(Math.max(0, R * R - (t + d) ** 2));
      const w = Math.max(a, b, Math.abs(t) < d ? R : 0) * (1 - pinch * Math.exp(-((t / (0.35 * R)) ** 2)));
      pts.push(new THREE.Vector2(Math.max(0.001, w), t));
    }
    pts[0].x = 0.001; pts[n].x = 0.001;
    const geo = new THREE.LatheGeometry(pts, seg);
    if (axis === 'x') geo.rotateZ(-Math.PI / 2);
    return geo;
  };
  /* swap a mesh's geometry for a new one, disposing the old */
  const regeo = (mesh, geo) => { const old = mesh.geometry; mesh.geometry = geo; if (old && !disposables.includes(old)) old.dispose(); };

  return {
    THREE, V, keep, disposables, parts, anchorFns, presence, levels,
    mat, level, tag, anchor, show, add, between, placeBetween, sphere, tube, cutSphere, instanced, rods, fib, inWedge,
    peanut, regeo, unitCyl, unitSphere, lowSphere,
  };
}
