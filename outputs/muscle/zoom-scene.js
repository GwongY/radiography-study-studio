/*
 * Muscle zoom — the procedural scenes, one group per level.
 *
 * No openly licensed mesh of these levels could be fetched and verified (see
 * docs/superpowers/specs/2026-10-20-muscle-zoom.md), and they are regular
 * geometry, so they are built here: a muscle cut open to its fascicles, a
 * fascicle to its fibers, a fiber to its myofibrils, three sarcomeres of a
 * myofibril, one sarcomere's hexagonal lattice of thick and thin filaments,
 * and a neuromuscular junction. The whole-muscle level is not here: it is the
 * model's own tapped muscle, cloned by studio/muscle-zoom.js.
 *
 * Proportions are schematic. The sarcomere obeys the slides' sliding-filament
 * rules (ABCT2326 Muscle p21-22, p27): filaments keep their length, the A band
 * keeps its length, the I bands and the H zone shorten, Z comes closer to Z.
 *
 * three.js is passed in (state.THREE), so this module imports nothing and the
 * check can read PARTS in Node. Nothing runs at module scope.
 */

/* Which labelled part each level builds; work/muscle-zoom-check.mjs holds this to outputs/muscle-zoom.js. */
export const PARTS = {
  whole: [],
  organisation: ['tendon', 'epimysium', 'fascicles', 'perimysium'],
  fascicle: ['perimysium', 'fibers', 'endomysium'],
  fiber: ['endomysium', 'sarcolemma', 'nuclei', 'myofibrils', 'sr', 'ttubules'],
  myofibril: ['sarcomere', 'aband', 'iband', 'hzone', 'zdisc'],
  sarcomere: ['thick', 'thin', 'gactins', 'heads', 'zdisc', 'mline', 'titin', 'aband', 'iband', 'hzone'],
  nmj: ['neuron', 'terminal', 'vesicles', 'ach', 'cleft', 'receptors', 'ache', 'endplate', 'sarcolemma'],
};

/* Sarcomere proportions, in half-sarcomere units: A band, thin filament, and the half-length relaxed and contracted. */
const A_BAND = 1.6, THIN = 1.0, H_REST = 1.25, H_FULL = 1.0;
/* The half-sarcomere at contraction c (0 relaxed .. 1 contracted): the thin tips meet at full contraction, H zone 0. */
export const halfSarcomere = (c) => H_REST - (H_REST - H_FULL) * Math.min(1, Math.max(0, c));

/* A deterministic scatter, so the scenes are the same on every open. */
function rand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/* Hexagonally packed centres inside a circle of radius R. */
function hexPack(R, step) {
  const out = [];
  const rows = Math.ceil(R / (step * 0.866)) + 1;
  for (let j = -rows; j <= rows; j++) {
    const y = j * step * 0.866, off = (j & 1) ? step / 2 : 0;
    for (let i = -rows; i <= rows; i++) {
      const z = i * step + off;
      if (Math.hypot(y, z) <= R) out.push([y, z]);
    }
  }
  return out;
}

export function createMuscleZoom(THREE) {
  const disposables = [];
  const keep = (x) => { disposables.push(x); return x; };
  const parts = {};          /* level -> part -> [meshes] */
  const anchorFns = {};      /* level -> part -> () => local Vector3 */
  const levels = {};
  const root = new THREE.Group();
  root.name = 'muscleZoom';

  const mat = (color, o = {}) => keep(new THREE.MeshStandardMaterial({
    color, roughness: o.rough ?? 0.62, metalness: 0, transparent: (o.opacity ?? 1) < 1, opacity: o.opacity ?? 1,
    depthWrite: (o.opacity ?? 1) >= 1, side: o.side ?? THREE.FrontSide, map: o.map || null, alphaMap: o.alphaMap || null,
    emissive: 0x000000,
  }));
  /* a cylinder along +X, from x0 to x1 */
  const cylX = (r0, r1, x0, x1, material, seg = 24, open = false) => {
    const g = keep(new THREE.CylinderGeometry(r1, r0, x1 - x0, seg, 1, open));
    g.rotateZ(-Math.PI / 2);
    const m = new THREE.Mesh(g, material);
    m.position.x = (x0 + x1) / 2;
    return m;
  };
  const stripes = (bands, repeat) => {
    if (typeof document === 'undefined') return null;
    const cv = document.createElement('canvas');
    cv.width = 4; cv.height = 128;
    const cx = cv.getContext('2d');
    let y = 0;
    for (const [frac, colour] of bands) { cx.fillStyle = colour; cx.fillRect(0, Math.round(y * 128), 4, Math.ceil(frac * 128)); y += frac; }
    const t = keep(new THREE.CanvasTexture(cv));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, repeat);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const lace = () => {
    if (typeof document === 'undefined') return null;
    const cv = document.createElement('canvas');
    cv.width = cv.height = 64;
    const cx = cv.getContext('2d');
    cx.fillStyle = '#000'; cx.fillRect(0, 0, 64, 64);
    cx.strokeStyle = '#fff'; cx.lineWidth = 5;
    for (let i = -64; i < 128; i += 16) { cx.beginPath(); cx.moveTo(i, 0); cx.lineTo(i + 40, 64); cx.stroke(); cx.beginPath(); cx.moveTo(i + 40, 0); cx.lineTo(i, 64); cx.stroke(); }
    const t = keep(new THREE.CanvasTexture(cv));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 4);
    return t;
  };
  const level = (id) => {
    const g = new THREE.Group();
    g.name = `mz-${id}`;
    g.visible = false;
    root.add(g);
    levels[id] = g; parts[id] = {}; anchorFns[id] = {};
    return g;
  };
  const tag = (lv, part, obj) => {
    obj.userData.mzPart = part;
    (parts[lv][part] || (parts[lv][part] = [])).push(obj);
    return obj;
  };
  const anchor = (lv, part, fn) => { anchorFns[lv][part] = typeof fn === 'function' ? fn : () => fn; };
  const V = (x, y, z) => new THREE.Vector3(x, y, z);

  /* ---------------- Organization of muscle ---------------- */
  {
    const lv = 'organisation', g = level(lv);
    const X0 = -5, X1 = 3;
    const r = (x) => 0.6 + 1.7 * Math.sin(Math.min(1, ((x - X0) / (X1 - X0)) * 1.25) * Math.PI / 2);
    const profile = (dr, x1 = X1) => {
      const pts = [];
      for (let i = 0; i <= 24; i++) { const x = X0 + (x1 - X0) * i / 24; pts.push(new THREE.Vector2(r(x) + dr, x)); }
      const geo = keep(new THREE.LatheGeometry(pts, 40));
      geo.rotateZ(-Math.PI / 2);
      return geo;
    };
    const body = new THREE.Mesh(profile(0), mat(0xa63a3f));
    g.add(body);
    g.add(tag(lv, 'epimysium', new THREE.Mesh(profile(0.12, 2.3), mat(0xeadfd4, { opacity: 0.42, side: THREE.DoubleSide }))));
    anchor(lv, 'epimysium', V(-1.2, r(-1.2) + 0.12, 0.6));
    const face = new THREE.Mesh(keep(new THREE.CircleGeometry(r(X1), 40)), mat(0x6e2530));
    face.rotation.y = Math.PI / 2; face.position.x = X1 + 0.001;
    g.add(face);
    const tendonMat = mat(0xe9e2d2, { rough: 0.35 });
    g.add(tag(lv, 'tendon', cylX(0.62, 0.42, -9.5, X0 + 0.05, tendonMat)));
    anchor(lv, 'tendon', V(-8, 0.5, 0));
    const fasc = mat(0xb8454b), peri = mat(0xf2e6da, { opacity: 0.5, side: THREE.DoubleSide });
    const rnd = rand(7);
    let longest = null;
    for (const [y, z] of hexPack(r(X1) - 0.45, 0.84)) {
      const ext = 0.3 + rnd() * 2.2;
      const f = tag(lv, 'fascicles', cylX(0.36, 0.36, X1 - 1, X1 + ext, fasc, 16));
      f.position.y = y; f.position.z = z; g.add(f);
      const p = tag(lv, 'perimysium', cylX(0.41, 0.41, X1 - 1, X1 + ext - 0.25, peri, 16, true));
      p.position.y = y; p.position.z = z; g.add(p);
      if (!longest || ext > longest.ext) longest = { y, z, ext };
    }
    anchor(lv, 'fascicles', V(X1 + longest.ext, longest.y + 0.36, longest.z));
    anchor(lv, 'perimysium', V(X1 + 0.5, r(X1) - 0.45, 0.2));
  }

  /* ---------------- Fascicle ---------------- */
  {
    const lv = 'fascicle', g = level(lv);
    const R = 2.2, X0 = -6, X1 = 2;
    g.add(tag(lv, 'perimysium', cylX(R + 0.08, R + 0.08, X0, X1, mat(0xf2e6da, { opacity: 0.35, side: THREE.DoubleSide }), 40, true)));
    anchor(lv, 'perimysium', V(-3, R + 0.08, 0.4));
    const back = new THREE.Mesh(keep(new THREE.CircleGeometry(R, 40)), mat(0x6e2530, { side: THREE.DoubleSide }));
    back.rotation.y = Math.PI / 2; back.position.x = X0;
    g.add(back);
    const fibreMat = mat(0xffffff, { map: stripes([[0.5, '#b4434a'], [0.5, '#d9777a']], 1) });
    const endo = mat(0xf7efe6, { opacity: 0.45, side: THREE.DoubleSide });
    const rnd = rand(11);
    let longest = null;
    for (const [y, z] of hexPack(R - 0.32, 0.66)) {
      const ext = 0.2 + rnd() * 2.6;
      const f = tag(lv, 'fibers', cylX(0.28, 0.28, X0, X1 + ext, fibreMat, 14));
      f.position.y = y; f.position.z = z; g.add(f);
      const e = tag(lv, 'endomysium', cylX(0.31, 0.31, X0, X1 + ext - 0.35, endo, 14, true));
      e.position.y = y; e.position.z = z; g.add(e);
      if (!longest || ext > longest.ext) longest = { y, z, ext };
    }
    anchor(lv, 'fibers', V(X1 + longest.ext, longest.y + 0.28, longest.z));
    anchor(lv, 'endomysium', V(X1 + longest.ext - 0.6, longest.y + 0.31, longest.z));
  }

  /* ---------------- Muscle fiber ---------------- */
  {
    const lv = 'fiber', g = level(lv);
    const R = 2.4, X0 = -6, X1 = 1.2;
    g.add(tag(lv, 'sarcolemma', cylX(R, R, X0, X1, mat(0xd9878e, { opacity: 0.32, side: THREE.DoubleSide }), 48, true)));
    anchor(lv, 'sarcolemma', V(0, R, 0.5));
    g.add(tag(lv, 'endomysium', cylX(R + 0.14, R + 0.14, X0, -1.5, mat(0xf4ece2, { opacity: 0.4, side: THREE.DoubleSide }), 48, true)));
    anchor(lv, 'endomysium', V(-4, R + 0.14, 0.4));
    const nucMat = mat(0x5b4aa8);
    const nucGeo = keep(new THREE.SphereGeometry(1, 16, 12));
    const rnd = rand(5);
    let firstNuc = null;
    for (let i = 0; i < 9; i++) {
      const x = X0 + 0.6 + i * 0.75, a = i * 2.4 + rnd();
      const n = tag(lv, 'nuclei', new THREE.Mesh(nucGeo, nucMat));
      n.scale.set(0.5, 0.16, 0.26);
      n.position.set(x, Math.cos(a) * (R - 0.2), Math.sin(a) * (R - 0.2));
      n.lookAt(V(x, 0, 0)); n.rotateX(Math.PI / 2);
      g.add(n);
      if (!firstNuc && Math.cos(a) > 0.3 && Math.sin(a) > -0.2) firstNuc = n.position.clone();
    }
    anchor(lv, 'nuclei', firstNuc || V(-3, R - 0.2, 0));
    /* the slide's bands, on every myofibril: Z dark, I light, A dark, H lighter */
    const band = stripes([[0.04, '#3a1420'], [0.16, '#f0d2d2'], [0.24, '#8d2a35'], [0.12, '#c76a6a'], [0.24, '#8d2a35'], [0.16, '#f0d2d2'], [0.04, '#3a1420']], 1);
    const rnd2 = rand(3);
    let longest = null;
    const fibrils = hexPack(R - 0.45, 0.7);
    for (const [y, z] of fibrils) {
      const ext = 0.4 + rnd2() * 2.2, len = X1 + ext - X0;
      const m = band ? mat(0xffffff, { map: band.clone() }) : mat(0x8d2a35);
      if (m.map) { m.map.repeat.set(1, len / 0.9); m.map.needsUpdate = true; keep(m.map); }
      const f = tag(lv, 'myofibrils', cylX(0.3, 0.3, X0, X1 + ext, m, 14));
      f.position.y = y; f.position.z = z; g.add(f);
      if (!longest || ext > longest.ext) longest = { y, z, ext };
    }
    anchor(lv, 'myofibrils', V(X1 + longest.ext, longest.y + 0.3, longest.z));
    /* SR sleeves and T tubule rings on the outermost myofibrils near the cut, where they can be seen */
    const top = fibrils.filter(([y]) => y > 0.9).sort((a, b) => b[0] - a[0]).slice(0, 4);
    const srMat = mat(0x8fc9e6, { opacity: 0.75, alphaMap: lace(), side: THREE.DoubleSide });
    if (srMat.alphaMap) srMat.alphaTest = 0.4;
    const tMat = mat(0xf0c54a, { rough: 0.4 });
    const ringGeo = keep(new THREE.TorusGeometry(0.4, 0.04, 8, 28));
    for (const [y, z] of top) {
      const s = tag(lv, 'sr', cylX(0.37, 0.37, X1 - 0.9, X1 + 0.9, srMat, 16, true));
      s.position.y = y; s.position.z = z; g.add(s);
      for (const x of [X1 - 0.95, X1 + 0.95]) {
        const t = tag(lv, 'ttubules', new THREE.Mesh(ringGeo, tMat));
        t.rotation.y = Math.PI / 2; t.position.set(x, y, z); g.add(t);
      }
    }
    if (top.length) {
      anchor(lv, 'sr', V(X1, top[0][0] + 0.37, top[0][1]));
      anchor(lv, 'ttubules', V(X1 + 0.95, top[0][0] + 0.44, top[0][1]));
    }
  }

  /* ---------------- Myofibril: three sarcomeres, banded, that shorten ---------------- */
  const fibril = { segs: [], brackets: {} };
  const bracket = (lv, part, colour) => {
    const geo = keep(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    const line = tag(lv, part, new THREE.Line(geo, keep(new THREE.LineBasicMaterial({ color: colour }))));
    line.userData.set = (x0, x1, y, dir) => {
      const p = geo.attributes.position;
      p.setXYZ(0, x0, y - 0.25 * dir, 0); p.setXYZ(1, x0, y, 0); p.setXYZ(2, x1, y, 0); p.setXYZ(3, x1, y - 0.25 * dir, 0);
      p.needsUpdate = true; geo.computeBoundingSphere();
      line.userData.mid = V((x0 + x1) / 2, y + 0.12 * dir, 0);
    };
    return line;
  };
  {
    const lv = 'myofibril', g = level(lv);
    const K = 2.2, R = 1;
    const seg = (part, colour, r = R) => {
      const m = tag(lv, part, cylX(r, r, -0.5, 0.5, mat(colour), 32));
      g.add(m);
      return m;
    };
    for (let s = -1; s <= 1; s++) {
      fibril.segs.push({ s, iL: seg('iband', 0xf0d2d2), aL: seg('aband', 0x8d2a35), h: seg('hzone', 0xc76a6a), aR: seg('aband', 0x8d2a35), iR: seg('iband', 0xf0d2d2) });
    }
    fibril.z = [-2, -1, 0, 1].map(() => seg('zdisc', 0x2a0f18, R + 0.04));
    for (const k of ['sarcomere', 'aband', 'iband', 'hzone']) g.add(fibril.brackets[k] = bracket(lv, k, 0xe8f2f0));
    fibril.K = K; fibril.R = R;
    anchor(lv, 'sarcomere', () => fibril.brackets.sarcomere.userData.mid);
    anchor(lv, 'aband', () => fibril.brackets.aband.userData.mid);
    anchor(lv, 'iband', () => fibril.brackets.iband.userData.mid);
    anchor(lv, 'hzone', () => fibril.brackets.hzone.userData.mid);
    anchor(lv, 'zdisc', () => V(fibril.z[2].position.x, R + 0.1, 0.3));
  }
  function layoutFibril(c) {
    const h = halfSarcomere(c), K = fibril.K, L = 2 * h * K, a = A_BAND / 2 * K, hz = Math.max(0.0001, (h - THIN) * K);
    const put = (m, x0, x1) => { m.scale.set(Math.max(0.0001, x1 - x0), 1, 1); m.position.x = (x0 + x1) / 2; };
    for (const sg of fibril.segs) {
      const cx = sg.s * L;
      put(sg.iL, cx - h * K, cx - a); put(sg.aL, cx - a, cx - hz); put(sg.h, cx - hz, cx + hz); put(sg.aR, cx + hz, cx + a); put(sg.iR, cx + a, cx + h * K);
    }
    fibril.z.forEach((z, i) => { z.scale.x = 0.06; z.position.x = (i - 1.5) * L; });
    const top = fibril.R + 0.45, bot = -fibril.R - 0.45;
    fibril.brackets.sarcomere.userData.set(-h * K, h * K, top, 1);
    fibril.brackets.aband.userData.set(-a, a, bot, -1);
    fibril.brackets.hzone.userData.set(-hz, hz, bot - 0.55, -1);
    fibril.brackets.iband.userData.set(L - h * K - (h * K - a), L - h * K + (h * K - a), top, 1);
  }

  /* ---------------- Sarcomere: the hexagonal lattice ---------------- */
  const sarc = { brackets: {} };
  {
    const lv = 'sarcomere', g = level(lv);
    const K = 4, D = 1.0;
    sarc.K = K;
    const thickAt = [[0, 0], ...[0, 1, 2, 3, 4, 5].map((k) => [Math.cos(k * Math.PI / 3) * D, Math.sin(k * Math.PI / 3) * D])];
    const thinAt = [];
    for (let k = 0; k < 6; k++) {
      const t = Math.PI / 6 + k * Math.PI / 3;
      thinAt.push([Math.cos(t) * D / Math.sqrt(3), Math.sin(t) * D / Math.sqrt(3)], [Math.cos(t) * 2 * D / Math.sqrt(3), Math.sin(t) * 2 * D / Math.sqrt(3)]);
    }
    const aHalf = A_BAND / 2 * K, bare = 0.35;
    const thickMat = mat(0x7b3fa0), headMat = mat(0x9b5cc4);
    for (const [y, z] of thickAt) { const m = tag(lv, 'thick', cylX(0.08, 0.08, -aHalf, aHalf, thickMat, 10)); m.position.y = y; m.position.z = z; g.add(m); }
    /* myosin heads: along each thick filament but its bare middle, pointing away from the M line */
    const headGeo = keep(new THREE.SphereGeometry(1, 8, 6));
    const headPos = [];
    for (const [y, z] of thickAt) {
      let k = 0;
      for (let x = bare; x <= aHalf - 0.1; x += 0.22, k++) {
        for (const side of [-1, 1]) {
          const a = k * 2.1 + (side > 0 ? 0 : 1);
          headPos.push([side * x, y + Math.cos(a) * 0.16, z + Math.sin(a) * 0.16, side, a]);
        }
      }
    }
    const heads = tag(lv, 'heads', new THREE.InstancedMesh(headGeo, headMat, headPos.length));
    const dummy = new THREE.Object3D();
    headPos.forEach(([x, y, z, side, a], i) => {
      dummy.position.set(x, y, z); dummy.rotation.set(a, 0, side * 0.6); dummy.scale.set(0.09, 0.05, 0.05);
      dummy.updateMatrix(); heads.setMatrixAt(i, dummy.matrix);
    });
    g.add(heads);
    anchor(lv, 'heads', V(aHalf - 0.7, D + 0.2, 0));
    anchor(lv, 'thick', V(aHalf * 0.45, -D, 0));
    /* thin filaments: two strands of G-actin beads, anchored on a Z disc, one set from each end */
    const beadGeo = keep(new THREE.SphereGeometry(1, 8, 6));
    const thinLen = THIN * K, step = 0.13;
    const beadsPer = Math.floor(thinLen / step);
    const makeHalf = (dir, part) => {
      const grp = new THREE.Group();
      const im = tag(lv, part, new THREE.InstancedMesh(beadGeo, mat(0x4fb39a), thinAt.length * beadsPer * 2));
      let n = 0;
      for (const [y, z] of thinAt) for (let i = 0; i < beadsPer; i++) for (const strand of [0, Math.PI]) {
        const a = i * 0.5 + strand;
        dummy.position.set(dir * i * step, y + Math.cos(a) * 0.045, z + Math.sin(a) * 0.045);
        dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(0.055); dummy.updateMatrix(); im.setMatrixAt(n++, dummy.matrix);
      }
      grp.add(im);
      tag(lv, 'gactins', im);
      return grp;
    };
    sarc.left = makeHalf(1, 'thin'); sarc.right = makeHalf(-1, 'thin');
    g.add(sarc.left, sarc.right);
    /* the next sarcomeres' thin filaments, past each Z disc, faded */
    const stubMat = mat(0x4fb39a, { opacity: 0.3 });
    sarc.stubs = [-1, 1].map((dir) => {
      const grp = new THREE.Group();
      for (const [y, z] of thinAt) { const m = cylX(0.05, 0.05, 0, 1.8 * dir, stubMat, 6); if (dir < 0) m.position.x = -0.9; m.position.y = y; m.position.z = z; grp.add(m); }
      g.add(grp);
      return grp;
    });
    const plate = (colour, opacity) => { const geo = keep(new THREE.CylinderGeometry(1.75, 1.75, 0.07, 6)); geo.rotateZ(-Math.PI / 2); return new THREE.Mesh(geo, mat(colour, { opacity, side: THREE.DoubleSide })); };
    sarc.zL = tag(lv, 'zdisc', plate(0x2a0f18, 0.75)); sarc.zR = tag(lv, 'zdisc', plate(0x2a0f18, 0.75));
    g.add(sarc.zL, sarc.zR);
    const m = tag(lv, 'mline', plate(0xd7c0f0, 0.55)); m.scale.set(0.6, 0.85, 0.85); g.add(m);
    anchor(lv, 'mline', V(0, 1.55, 0));
    /* titin: a coil from the end of a thick filament to the Z disc, on both sides */
    const coil = [];
    for (let i = 0; i <= 80; i++) { const t = i / 80; coil.push(V(t, Math.cos(t * 40) * 0.05, Math.sin(t * 40) * 0.05)); }
    const titinGeo = keep(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coil), 160, 0.015, 5));
    const titinMat = mat(0xe0b04a);
    sarc.titin = [-1, 1].map((dir) => {
      const t = tag(lv, 'titin', new THREE.Mesh(titinGeo, titinMat));
      t.position.set(dir * aHalf, D, 0); t.scale.x = dir;
      g.add(t);
      return t;
    });
    for (const k of ['aband', 'iband', 'hzone']) g.add(sarc.brackets[k] = bracket(lv, k, 0xe8f2f0));
    anchor(lv, 'aband', () => sarc.brackets.aband.userData.mid);
    anchor(lv, 'iband', () => sarc.brackets.iband.userData.mid);
    anchor(lv, 'hzone', () => sarc.brackets.hzone.userData.mid);
    anchor(lv, 'zdisc', () => V(sarc.zL.position.x, 1.6, 0.4));
    anchor(lv, 'thin', () => V(sarc.left.position.x + 1.2, thinAt[1][0], thinAt[1][1]));
    const low = thinAt.reduce((a, b) => (b[0] < a[0] ? b : a));
    anchor(lv, 'gactins', () => V(sarc.left.position.x + 1.6, low[0] - 0.06, low[1]));
    anchor(lv, 'titin', () => V((aHalf + sarc.zR.position.x) / 2, D + 0.1, 0));
    sarc.aHalf = aHalf; sarc.D = D;
  }
  function layoutSarcomere(c) {
    const h = halfSarcomere(c) * sarc.K, a = sarc.aHalf, tip = h - THIN * sarc.K;
    sarc.left.position.x = -h; sarc.right.position.x = h;
    sarc.zL.position.x = -h; sarc.zR.position.x = h;
    sarc.stubs[0].position.x = -h; sarc.stubs[1].position.x = h;
    for (const t of sarc.titin) t.scale.x = Math.sign(t.scale.x) * (h - a);
    const top = 2.15, bot = -2.15;
    sarc.brackets.aband.userData.set(-a, a, top, 1);
    sarc.brackets.hzone.userData.set(-Math.max(0.001, tip), Math.max(0.001, tip), bot, -1);
    sarc.brackets.iband.userData.set(h - (h - a), h + (h - a), bot, -1);
  }

  /* ---------------- Neuromuscular junction ---------------- */
  const nmj = {};
  {
    const lv = 'nmj', g = level(lv);
    const fibreMat = mat(0xffffff, { map: stripes([[0.5, '#b24750'], [0.5, '#c9636a']], 1) });
    if (fibreMat.map) fibreMat.map.repeat.set(1, 18);
    const fibre = tag(lv, 'sarcolemma', cylX(5, 5, -8, 8, fibreMat, 64));
    fibre.position.y = -5; g.add(fibre);
    anchor(lv, 'sarcolemma', V(-5.5, -1.2, 4.7));
    const plateGeo = keep(new THREE.CircleGeometry(1, 48)); plateGeo.rotateX(-Math.PI / 2);
    const plate = tag(lv, 'endplate', new THREE.Mesh(plateGeo, mat(0xe39ab0, { side: THREE.DoubleSide })));
    plate.scale.set(2.8, 1, 1.8); plate.position.y = 0.02; g.add(plate);
    const foldMat = mat(0x8a3550);
    for (let i = -2; i <= 2; i++) { const f = tag(lv, 'endplate', new THREE.Mesh(keep(new THREE.BoxGeometry(0.08, 0.04, 2.6 - Math.abs(i) * 0.5)), foldMat)); f.position.set(i * 0.9, 0.03, 0); g.add(f); }
    anchor(lv, 'endplate', V(2.4, 0.05, 1.2));
    const neuronMat = mat(0xe8c35a, { rough: 0.45 });
    const path = new THREE.CatmullRomCurve3([V(-7, 7, -1), V(-4, 5.5, -0.5), V(-1.2, 3.2, 0), V(0, 2.2, 0)]);
    g.add(tag(lv, 'neuron', new THREE.Mesh(keep(new THREE.TubeGeometry(path, 40, 0.38, 12)), neuronMat)));
    anchor(lv, 'neuron', V(-4, 5.9, -0.5));
    const term = tag(lv, 'terminal', new THREE.Mesh(keep(new THREE.SphereGeometry(1, 32, 20)), mat(0xe8c35a, { opacity: 0.45, side: THREE.DoubleSide })));
    term.scale.set(2.3, 1.05, 1.4); term.position.y = 1.3; g.add(term);
    anchor(lv, 'terminal', V(-1.6, 2.0, 0.6));
    const dummy = new THREE.Object3D(), rnd = rand(19);
    const ves = tag(lv, 'vesicles', new THREE.InstancedMesh(keep(new THREE.SphereGeometry(1, 10, 8)), mat(0xf6f1de), 46));
    for (let i = 0; i < 46; i++) {
      let x, y, z;
      do { x = (rnd() * 2 - 1) * 2; y = 0.35 + rnd() * 1.2; z = (rnd() * 2 - 1) * 1.2; } while ((x / 2.1) ** 2 + ((y - 1.3) / 0.95) ** 2 + (z / 1.3) ** 2 > 0.85);
      dummy.position.set(x, y, z); dummy.scale.setScalar(0.13); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); ves.setMatrixAt(i, dummy.matrix);
    }
    g.add(ves);
    anchor(lv, 'vesicles', V(0.6, 0.9, 0.9));
    const cleft = tag(lv, 'cleft', new THREE.Mesh(plateGeo, mat(0x7fd3f2, { opacity: 0.22, side: THREE.DoubleSide })));
    cleft.scale.set(2.3, 1, 1.45); cleft.position.y = 0.16; g.add(cleft);
    anchor(lv, 'cleft', V(2.2, 0.16, -0.6));
    const rec = tag(lv, 'receptors', new THREE.InstancedMesh(keep(new THREE.CylinderGeometry(1, 1, 1, 6)), mat(0x2bb5a0), 54));
    for (let i = 0; i < 54; i++) {
      let x, z; do { x = (rnd() * 2 - 1) * 2.4; z = (rnd() * 2 - 1) * 1.5; } while ((x / 2.5) ** 2 + (z / 1.6) ** 2 > 1);
      dummy.position.set(x, 0.07, z); dummy.scale.set(0.05, 0.1, 0.05); dummy.updateMatrix(); rec.setMatrixAt(i, dummy.matrix);
    }
    g.add(rec);
    anchor(lv, 'receptors', V(-2.1, 0.1, 0.9));
    nmj.ach = tag(lv, 'ach', new THREE.InstancedMesh(keep(new THREE.SphereGeometry(1, 6, 4)), mat(0x6fe36f), 70));
    nmj.achSeed = Array.from({ length: 70 }, () => [(rnd() * 2 - 1) * 1.9, rnd(), (rnd() * 2 - 1) * 1.1]);
    g.add(nmj.ach);
    anchor(lv, 'ach', V(0.3, 0.2, 1.1));
    const ache = tag(lv, 'ache', new THREE.InstancedMesh(keep(new THREE.OctahedronGeometry(1)), mat(0xf08a3c), 14));
    for (let i = 0; i < 14; i++) { dummy.position.set((rnd() * 2 - 1) * 2, 0.12, (rnd() * 2 - 1) * 1.2); dummy.scale.setScalar(0.07); dummy.updateMatrix(); ache.setMatrixAt(i, dummy.matrix); }
    g.add(ache);
    anchor(lv, 'ache', V(-1.0, 0.13, -1.1));
  }
  function moveAch(t) {
    const dummy = new THREE.Object3D();
    nmj.achSeed.forEach(([x, p, z], i) => {
      const f = (p + t * 0.25) % 1;
      dummy.position.set(x, 0.3 - f * 0.26, z); dummy.scale.setScalar(0.04); dummy.updateMatrix(); nmj.ach.setMatrixAt(i, dummy.matrix);
    });
    nmj.ach.instanceMatrix.needsUpdate = true;
  }
  moveAch(0);

  let contraction = 0;
  const setContraction = (c) => { contraction = Math.min(1, Math.max(0, c)); layoutFibril(contraction); layoutSarcomere(contraction); };
  setContraction(0);

  return {
    root, levels, PARTS,
    get contraction() { return contraction; },
    setContraction,
    show(id) { for (const [k, g] of Object.entries(levels)) g.visible = k === id; },
    meshesOf: (lv, part) => (parts[lv] && parts[lv][part]) || [],
    pickables: (lv) => Object.values(parts[lv] || {}).flat().filter((o) => o.isMesh),
    /* label anchors in world space, for the HTML tags */
    anchors(lv) {
      root.updateMatrixWorld(true);
      return Object.entries(anchorFns[lv] || {}).map(([id, fn]) => ({ id, pos: fn().clone().applyMatrix4(levels[lv].matrixWorld) }));
    },
    box(lv) { levels[lv].updateMatrixWorld(true); return new THREE.Box3().setFromObject(levels[lv]); },
    update(t, still) { if (!still && levels.nmj.visible) moveAch(t); },
    dispose() {
      root.removeFromParent();
      for (const d of disposables) { try { d.dispose(); } catch { /* already gone */ } }
      disposables.length = 0;
    },
  };
}
