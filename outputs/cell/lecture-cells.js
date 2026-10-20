/*
 * Cell zoom — the cells of the other lectures, each its own level beside the typical cell.
 *
 * The plasma membrane and an epithelial cell row (ABCT2326 Cells), blood (Cardiovascular), the alveolar epithelium
 * (Respiratory), a parietal cell making acid (Digestive), a spermatozoon in the slide's proportions (Reproduction),
 * a neuron (HSS2011 W5 Nervous system I), an NK cell killing an abnormal cell and a phagocytic antigen-presenting
 * cell (Immune). Which page each comes from is its cite in outputs/cell-zoom.js, with the labels, stages and notes.
 * Procedural and schematic. The shared helpers are cell/kit.js. Nothing runs at module scope.
 */
import { rand, span, mix, clamp01 } from './kit.js?v=1';

export const LECTURE_PARTS = {
  membrane: ['ecf', 'bilayer', 'heads', 'tails', 'cholesterol', 'glycolipids', 'integral', 'anchoring', 'recognition', 'enzymes', 'receptor', 'carrier', 'channels', 'microfilaments', 'cytoplasm'],
  epithelium: ['cilia', 'microvilli', 'apical', 'basolateral', 'junctions', 'basement', 'golgi', 'nucleus', 'mito'],
  blood: ['rbc', 'wbc', 'platelets', 'plasma'],
  alveolus: ['type1', 'type2', 'surfactant', 'macrophage', 'capillary', 'endothelial'],
  parietal: ['ca', 'hplus', 'hco3', 'cl', 'clchannels', 'lumen', 'isf', 'tide'],
  sperm: ['head', 'acrosome', 'nucleus', 'neck', 'centrioles', 'middle', 'spiral', 'tail', 'sheath'],
  neuron: ['body', 'nucleus', 'nucleolus', 'nissl', 'neurofibrils', 'dendrites', 'hillock', 'axon', 'myelin', 'schwann', 'node', 'terminals'],
  nk: ['nkcell', 'abnormal', 'golgi', 'vesicles', 'perforin', 'pores'],
  apc: ['pathogen', 'lysosome', 'fragments', 'er', 'mhc', 'nucleus', 'membrane'],
};

/* progress through stage i of a slider at s (stage k runs from s = k to s = k + 1) */
const stageProg = (s, n) => { const k = Math.min(n - 1, Math.floor(s)), f = s - k; return (i) => (k > i ? 1 : k < i ? 0 : f); };
/* along a polyline of points, t in 0..1 */
const along = (pts, t) => { const n = pts.length - 1, u = clamp01(t) * n, i = Math.min(n - 1, Math.floor(u)); return pts[i].clone().lerp(pts[i + 1], u - i); };

/* ---------------------------------------------------------------- The Plasma Membrane ---- */
function buildMembrane(K) {
  const { THREE, V, mat, level, add, anchor, sphere, instanced, rods, tube } = K;
  const lv = 'membrane', g = level(lv), rnd = rand(51);
  const W = 16, D = 10, Y = 1.5, S = 0.62;
  /* fluid on each side, drawn as faint slabs */
  const slab = (y, h, colour, part) => { const m = new THREE.Mesh(K.keep(new THREE.BoxGeometry(W, h, D)), mat(colour, { opacity: 0.1 })); m.position.y = y; return add(g, lv, part, m, { shell: true }); };
  slab(Y + 3.1, 5.2, 0x90e0ef, 'ecf'); slab(-Y - 3.1, 5.2, 0xffd6a5, 'cytoplasm');
  anchor(lv, 'ecf', V(-7, 5.4, 4)); anchor(lv, 'cytoplasm', V(-7, -5.4, 4));
  /* the proteins, where the lipids leave room */
  const P = {
    integral: { at: V(-5.2, 0, 1.6), r: 1.25, c: 0x6a4c93 }, channels: { at: V(-1.2, 0, -2.4), r: 1.0, c: 0x1982c4 },
    carrier: { at: V(2.4, 0, 1.4), r: 1.15, c: 0x8ac926 }, receptor: { at: V(5.6, 0, -1.8), r: 1.05, c: 0xff595e },
    recognition: { at: V(-4.2, 0, -3.0), r: 0.95, c: 0xffca3a }, anchoring: { at: V(0.6, 0, 3.4), r: 0.95, c: 0xf15bb5 },
  };
  const taken = (x, z) => Object.values(P).some((p) => Math.hypot(x - p.at.x, z - p.at.z) < p.r + 0.35) || Math.hypot(x - 4.4, z - 3.8) < 1.1;
  const lip = [];
  for (let x = -W / 2 + S / 2; x < W / 2; x += S) for (let z = -D / 2 + S / 2; z < D / 2; z += S) if (!taken(x, z)) for (const side of [1, -1]) lip.push({ x: x + (rnd() - 0.5) * 0.12, z: z + (rnd() - 0.5) * 0.12, side });
  /* cholesterol takes some of the slots between the tails */
  const chol = lip.filter((l, i) => i % 11 === 3);
  const lipids = lip.filter((l, i) => i % 11 !== 3);
  add(g, lv, 'heads', instanced(K.lowSphere, mat(0xef8354), lipids.length, (i, d) => { const l = lipids[i]; d.position.set(l.x, l.side * Y, l.z); d.scale.setScalar(0.27); }));
  const tails = rods(mat(0xf4d58d), lipids.length * 2, 0.06);
  lipids.forEach((l, i) => { for (const k of [0, 1]) { const dx = (k - 0.5) * 0.18; tails.userData.set(2 * i + k, V(l.x + dx, l.side * (Y - 0.2), l.z), V(l.x + dx * 1.3, l.side * 0.12, l.z + (rnd() - 0.5) * 0.12)); } });
  tails.userData.commit();
  add(g, lv, 'tails', tails);
  const c = chol;
  const cholR = rods(mat(0xffe066), c.length, 0.11);
  c.forEach((l, i) => cholR.userData.set(i, V(l.x, l.side * (Y - 0.15), l.z), V(l.x, l.side * 0.35, l.z)));
  cholR.userData.commit();
  add(g, lv, 'cholesterol', cholR);
  /* the bilayer as a whole: a faint skin over both leaflets, picked when nothing else is under the tap */
  const skin = new THREE.Mesh(K.keep(new THREE.BoxGeometry(W, 2 * Y + 0.5, D)), mat(0xf6bd60, { opacity: 0.08 }));
  add(g, lv, 'bilayer', skin, { shell: true });
  const front = lipids.find((l) => l.z > D / 2 - 0.8 && l.x > -1 && l.side === 1) || lipids[0];
  anchor(lv, 'heads', V(front.x, Y + 0.3, front.z)); anchor(lv, 'tails', V(front.x + 0.3, 0.6, front.z)); anchor(lv, 'bilayer', V(W / 2, 0, D / 2));
  const ch = c.find((l) => l.z > D / 2 - 1.5) || c[0];
  anchor(lv, 'cholesterol', V(ch.x, ch.side * 0.8, ch.z));
  /* glycolipids: sugar chains on outer-leaflet lipids */
  const gMat = mat(0x52b788);
  const outer = lipids.filter((l) => l.side === 1);
  let gl0 = null;
  for (let i = 0; i < 9; i++) {
    const l = outer[Math.floor(rnd() * outer.length)], b = V(l.x, Y + 0.25, l.z);
    const pts = [b, b.clone().add(V(0.1, 0.5, 0)), b.clone().add(V(-0.15, 0.95, 0.1)), b.clone().add(V(0.05, 1.35, -0.1))];
    for (const p of pts.slice(1)) add(g, lv, 'glycolipids', sphere(0.15, gMat, p));
    if (!gl0) gl0 = pts[3];
  }
  anchor(lv, 'glycolipids', gl0);
  /* proteins: blobs through the bilayer; a channel has its pore; carbohydrate on the recognition protein */
  const blob = (part, h, y = 0) => { const p = P[part]; const m = new THREE.Mesh(K.keep(new THREE.CapsuleGeometry(p.r, h, 6, 18)), mat(p.c, { rough: 0.5 })); m.position.copy(p.at).setY(y); return add(g, lv, part, m); };
  blob('integral', 2.4); blob('carrier', 2.2); blob('receptor', 2.0, 0.3); blob('recognition', 2.0, 0.2); blob('anchoring', 2.0);
  const ch0 = P.channels;
  const chan = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(ch0.r, ch0.r, 3.6, 20, 1, true)), mat(ch0.c, { side: THREE.DoubleSide }));
  chan.position.copy(ch0.at); add(g, lv, 'channels', chan);
  add(g, lv, 'channels', new THREE.Mesh(K.keep(new THREE.TorusGeometry(ch0.r, 0.18, 8, 20)), mat(ch0.c))).position.copy(ch0.at).setY(1.8);
  g.children.at(-1).rotation.x = Math.PI / 2;
  const rp = P.receptor.at;
  for (const dx of [-0.35, 0.35]) add(g, lv, 'receptor', K.between(V(rp.x + dx, 2.2, rp.z), V(rp.x + dx * 2.2, 3.1, rp.z), 0.16, mat(P.receptor.c)));
  const rc = P.recognition.at;
  for (let i = 0; i < 4; i++) add(g, lv, 'recognition', sphere(0.17, mat(0x52b788), V(rc.x + 0.12 * (i % 2), 2.35 + 0.38 * i, rc.z)));
  /* an enzyme on the inner face */
  add(g, lv, 'enzymes', sphere(0.95, mat(0x00b4d8), V(4.4, -Y - 0.4, 3.8))).scale.set(1.1, 0.75, 1.1);
  /* microfilaments under the membrane, held by the anchoring protein */
  const mfMat = mat(0x9d0208);
  for (let k = 0; k < 4; k++) {
    const pts = []; for (let x = -W / 2 + 0.5; x <= W / 2 - 0.5; x += 0.6) pts.push(V(x, -Y - 1.2 - 0.25 * k + 0.12 * Math.sin(x * 1.3 + k), 3.4 + (k - 1.5) * 0.4));
    add(g, lv, 'microfilaments', tube(pts, 0.09, mfMat, 120));
  }
  for (const p of Object.keys(P)) anchor(lv, p, P[p].at.clone().add(V(0, 2.1, 0)));
  anchor(lv, 'anchoring', P.anchoring.at.clone().add(V(0, -1.7, 0.6)));
  anchor(lv, 'enzymes', V(4.4, -Y - 1.2, 3.8));
  anchor(lv, 'microfilaments', V(-6, -Y - 1.6, 3.6));
}

/* ---------------------------------------------------------------- Characteristics of Epithelia ---- */
function buildEpithelium(K) {
  const { THREE, V, mat, level, add, anchor, sphere, instanced } = K;
  const lv = 'epithelium', g = level(lv), rnd = rand(61);
  const N = 5, CW = 2.4, H = 6, D = 2.4;
  const body = mat(0xffc8dd, { opacity: 0.35, side: THREE.DoubleSide });
  const apical = mat(0xff8fab, { opacity: 0.75 });
  const nMat = mat(0x7b2cbf), gMat = mat(0xf2c14e), mMat = mat(0xe4774a), jMat = mat(0x3a0ca3);
  const cyl = K.keep(new THREE.CylinderGeometry(1, 1, 1, 8));
  for (let i = 0; i < N; i++) {
    const x = (i - (N - 1) / 2) * CW;
    const box = new THREE.Mesh(K.keep(new THREE.BoxGeometry(CW - 0.06, H, D)), body); box.position.set(x, 0, 0);
    add(g, lv, 'basolateral', box, { shell: true });
    const top = new THREE.Mesh(K.keep(new THREE.BoxGeometry(CW - 0.06, 0.08, D)), apical); top.position.set(x, H / 2, 0);
    add(g, lv, 'apical', top);
    add(g, lv, 'nucleus', sphere(0.62, nMat, V(x, -H / 2 + 1.6, 0))).scale.set(0.62, 0.95, 0.62);
    for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(K.keep(new THREE.TorusGeometry(0.55 - 0.08 * k, 0.07, 6, 16, 2.2)), gMat); c.position.set(x, 0.55 + 0.2 * k, 0); c.rotation.z = Math.PI / 2 - 1.1; add(g, lv, 'golgi', c); }
    for (let k = 0; k < 3; k++) { const m = new THREE.Mesh(K.keep(new THREE.CapsuleGeometry(0.17, 0.5, 4, 8)), mMat); m.position.set(x + (rnd() - 0.5) * 1.4, -0.6 + (rnd() - 0.5) * 1.2, (rnd() - 0.5) * 1.4); m.rotation.set(rnd() * 3, 0, rnd() * 3); add(g, lv, 'mito', m); }
    if (i > 0) { const j = new THREE.Mesh(K.keep(new THREE.BoxGeometry(0.12, 0.45, D)), jMat); j.position.set(x - CW / 2, H / 2 - 0.4, 0); add(g, lv, 'junctions', j); }
    /* the first two cells ciliated, the rest with microvilli */
    const ciliated = i < 2, n = ciliated ? 20 : 42;
    add(g, lv, ciliated ? 'cilia' : 'microvilli', instanced(cyl, mat(ciliated ? 0x06d6a0 : 0xff5d8f), n, (k, d) => {
      const u = ((k % (ciliated ? 5 : 7)) + 0.5) / (ciliated ? 5 : 7) - 0.5, w = (Math.floor(k / (ciliated ? 5 : 7)) + 0.5) / (ciliated ? 4 : 6) - 0.5;
      const L = ciliated ? 1.9 : 0.55;
      d.position.set(x + u * (CW - 0.4), H / 2 + L / 2, w * (D - 0.4)); d.scale.set(ciliated ? 0.05 : 0.08, L, ciliated ? 0.05 : 0.08);
      if (ciliated) d.rotation.z = -0.25;
    }));
  }
  const base = new THREE.Mesh(K.keep(new THREE.BoxGeometry(N * CW + 1, 0.35, D + 1)), mat(0x8d99ae, { opacity: 0.8 }));
  base.position.y = -H / 2 - 0.2; add(g, lv, 'basement', base);
  const x0 = -(N - 1) / 2 * CW;
  anchor(lv, 'cilia', V(x0, H / 2 + 2, 0)); anchor(lv, 'microvilli', V(x0 + 3 * CW, H / 2 + 0.6, 0));
  anchor(lv, 'apical', V(x0 + 2 * CW, H / 2 + 0.1, D / 2)); anchor(lv, 'basolateral', V(x0 + 4 * CW + CW / 2, -1, D / 2));
  anchor(lv, 'junctions', V(x0 + 2.5 * CW, H / 2 - 0.4, D / 2)); anchor(lv, 'basement', V(x0 + 1 * CW, -H / 2 - 0.3, D / 2 + 0.5));
  anchor(lv, 'nucleus', V(x0 + 2 * CW, -H / 2 + 1.6, 0.4)); anchor(lv, 'golgi', V(x0 + 3 * CW, 0.8, 0.4)); anchor(lv, 'mito', V(x0 + CW, -0.6, 0.4));
}

/* ---------------------------------------------------------------- Composition of Blood ---- */
function buildBlood(K) {
  const { THREE, V, mat, level, add, anchor, sphere } = K;
  const lv = 'blood', g = level(lv), rnd = rand(71);
  /* a red blood cell: a biconcave disc */
  const pts = [];
  for (let i = 0; i <= 24; i++) { const r = Math.max(0.001, (i / 24) * 1.0); const t = 0.1 + 0.5 * r * r * (1 - r * r) + 0.2 * r * r; pts.push(new THREE.Vector2(r, t * Math.sqrt(Math.max(0, 1 - r ** 8)) + 0.001)); }
  const loop = [...pts, ...pts.slice(0, -1).reverse().map((p) => new THREE.Vector2(p.x, -p.y))];
  const disc = K.keep(new THREE.LatheGeometry(loop, 32));
  const rbcMat = mat(0xd62828, { rough: 0.45 });
  const spot = () => V((rnd() - 0.5) * 16, (rnd() - 0.5) * 9, (rnd() - 0.5) * 6);
  let r0 = null;
  for (let i = 0; i < 22; i++) { const m = new THREE.Mesh(disc, rbcMat); m.position.copy(i ? spot() : V(-3, 1.2, 2.4)); m.rotation.set(rnd() * 3, rnd() * 3, 0); m.scale.setScalar(1.25); add(g, lv, 'rbc', m); if (!r0) r0 = m.position.clone(); }
  /* leukocytes: larger, with a lobed nucleus */
  const wMat = mat(0xf1faee, { opacity: 0.6 }), wn = mat(0x5a189a);
  const wAt = [V(3.5, -1.5, 1.5), V(-6, -2.8, -1.5)];
  for (const w of wAt) {
    add(g, lv, 'wbc', sphere(1.9, wMat, w), { shell: false });
    for (let k = 0; k < 3; k++) add(g, lv, 'wbc', sphere(0.55, wn, w.clone().add(V((k - 1) * 0.6, 0.2 * Math.sin(k * 2), 0))));
  }
  /* platelets: small fragments */
  const pMat = mat(0xb5838d);
  let p0 = null;
  for (let i = 0; i < 12; i++) { const m = sphere(0.35, pMat, i ? spot() : V(0.6, 3, 2)); m.scale.set(0.45, 0.2, 0.32); m.rotation.set(rnd() * 3, rnd() * 3, 0); add(g, lv, 'platelets', m); if (!p0) p0 = m.position.clone(); }
  /* plasma: the fluid all of it is in */
  add(g, lv, 'plasma', new THREE.Mesh(K.keep(new THREE.BoxGeometry(19, 12, 8)), mat(0xffe8a3, { opacity: 0.12, side: THREE.BackSide })), { shell: true });
  anchor(lv, 'rbc', r0.clone().add(V(0, 0.6, 0))); anchor(lv, 'wbc', wAt[0].clone().add(V(0, 1.9, 0)));
  anchor(lv, 'platelets', p0); anchor(lv, 'plasma', V(8, 5, 3.5));
}

/* ---------------------------------------------------------------- Alveolar epithelium ---- */
function buildAlveolus(K) {
  const { THREE, V, mat, level, add, anchor, sphere, cutSphere, tube, fib, inWedge } = K;
  const lv = 'alveolus', g = level(lv), R = 6;
  /* the wall: thin type I cells, with type II cells set into it; surfactant lines the inside */
  add(g, lv, 'type1', cutSphere(R, mat(0xffc8dd, { opacity: 0.55, side: THREE.DoubleSide })), { shell: true });
  add(g, lv, 'surfactant', cutSphere(R - 0.18, mat(0x90e0ef, { opacity: 0.35, side: THREE.DoubleSide })), { shell: true });
  const t2 = fib(14).filter((p) => !inWedge(p) && p.y > -0.6).slice(0, 4);
  const t2Mat = mat(0xc9184a);
  for (const p of t2) { const m = sphere(0.95, t2Mat, p.clone().multiplyScalar(R - 0.1)); m.scale.set(0.95, 0.95, 0.95); add(g, lv, 'type2', m); }
  anchor(lv, 'type1', V(-R * 0.6, R * 0.6, R * 0.3)); anchor(lv, 'surfactant', V(-R * 0.75, -R * 0.2, -0.4));
  anchor(lv, 'type2', t2[0].clone().multiplyScalar(R + 0.8));
  /* an alveolar macrophage inside, on the wall */
  const mac = V(-1.5, -R + 1.4, -1.5);
  add(g, lv, 'macrophage', sphere(1.2, mat(0x9b5de5), mac)).scale.set(1.3, 0.8, 1.1);
  anchor(lv, 'macrophage', mac.clone().add(V(0, 1, 0)));
  /* a capillary wrapped over the outside: endothelial wall, blood inside */
  const pts = []; for (let i = 0; i <= 60; i++) { const a = -0.3 + (i / 60) * 4.4; pts.push(V(-Math.sin(a) * (R + 1.0), 2.8 * Math.sin(a * 1.3) - 1, -Math.cos(a) * (R + 1.0))); }
  add(g, lv, 'endothelial', tube(pts, 0.85, mat(0xff99ac, { opacity: 0.45, side: THREE.DoubleSide }), 200), { shell: true });
  add(g, lv, 'capillary', tube(pts, 0.55, mat(0xd00000), 200));
  anchor(lv, 'endothelial', pts[18].clone().add(V(0, 0.9, 0))); anchor(lv, 'capillary', pts[40]);
}

/* ---------------------------------------------------------------- Parietal cell ---- */
function buildParietal(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, sphere, instanced } = K;
  const lv = 'parietal', g = level(lv);
  const cell = new THREE.Mesh(K.keep(new THREE.BoxGeometry(10, 8, 5)), mat(0xbde0fe, { opacity: 0.22, side: THREE.DoubleSide }));
  g.add(cell);   /* the cell itself (drawn, unlabelled: the level's title names it) */
  const lumen = new THREE.Mesh(K.keep(new THREE.BoxGeometry(10, 3, 5)), mat(0xfff3b0, { opacity: 0.18 })); lumen.position.y = 5.5;
  add(g, lv, 'lumen', lumen, { shell: true });
  const isf = new THREE.Mesh(K.keep(new THREE.BoxGeometry(10, 3, 5)), mat(0xffd6e0, { opacity: 0.18 })); isf.position.y = -5.5;
  add(g, lv, 'isf', isf, { shell: true });
  anchor(lv, 'lumen', V(-4, 6.4, 2.5)); anchor(lv, 'isf', V(-4, -6.4, 2.5));
  /* carbonic anhydrase in the middle, chloride channels in the apical membrane; pumps drawn, unlabelled */
  add(g, lv, 'ca', sphere(0.9, mat(0x2a9d8f), V(0, 0, 0))).scale.set(1.2, 0.9, 0.9);
  anchor(lv, 'ca', V(0, 0.9, 0.6));
  const chan = K.keep(new THREE.CylinderGeometry(0.45, 0.45, 0.6, 16, 1, true)), cMat = mat(0x4cc9f0, { side: THREE.DoubleSide });
  for (const x of [2.5, 3.6]) { const c = new THREE.Mesh(chan, cMat); c.position.set(x, 4, 0); add(g, lv, 'clchannels', c); }
  anchor(lv, 'clchannels', V(3.05, 4.5, 0.6));
  const pump = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 16)), mat(0xe63946)); pump.position.set(-2, 4, 0); g.add(pump);
  const counter = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 16)), mat(0x8338ec)); counter.position.set(1, -4, 0); g.add(counter);
  /* the ions: four of each, moving with the stages */
  const N = 4, D = new THREE.Object3D();
  const ions = (part, colour, r) => add(g, lv, part, instanced(K.lowSphere, mat(colour), N, (i, d) => d.scale.setScalar(r)));
  const H = ions('hplus', 0xe63946, 0.22), B = ions('hco3', 0x8338ec, 0.3), C = ions('cl', 0x06d6a0, 0.28);
  const tide = add(g, lv, 'tide', instanced(K.lowSphere, mat(0xc77dff, { opacity: 0.7 }), 16, (i, d) => { d.position.set(-3 + (i % 8) * 1.1, -5.2 - Math.floor(i / 8) * 0.8, ((i * 7) % 5) * 0.4 - 0.8); d.scale.setScalar(0.24); }));
  const jit = (i) => V(((i * 37) % 7) / 7 - 0.5, ((i * 53) % 5) / 5 - 0.5, ((i * 11) % 3) / 3 - 0.5).multiplyScalar(0.8);
  const set = (im, i, p, r) => { D.position.copy(p); D.scale.setScalar(r); D.updateMatrix(); im.setMatrixAt(i, D.matrix); };
  const st = { h: V(), b: V(), c: V() };
  stageFns[lv] = (s) => {
    const prog = stageProg(s, 4), make = prog(0), pumpP = prog(1), cnt = prog(2), dif = prog(3);
    const born = span(make, 0, 0.6);
    for (let i = 0; i < N; i++) {
      const j = jit(i);
      const h = along([V(0.6, 0.3, 0).add(j), V(-2, 3.5, 0), V(-2, 5.4, 0).add(j)], pumpP);
      const b = along([V(-0.6, -0.3, 0).add(j), V(1, -3.5, 0), V(1, -5.4, 0).add(j)], cnt);
      const c = along([V(1, -5.6, 0).add(j), V(1, -3.5, 0), V(1.5, -2.6, 0).add(j), V(3.05, 3.6, 0), V(3.05, 5.4, 0).add(j)], mix(0, 0.5, cnt) + mix(0, 0.5, dif));
      set(H, i, h, 0.22 * Math.max(0.001, born)); set(B, i, b, 0.3 * Math.max(0.001, born)); set(C, i, c, 0.28);
      if (i === 0) { st.h = h; st.b = b; st.c = c; }
    }
    for (const im of [H, B, C]) { im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere(); }
    K.show(lv, 'hplus', born > 0.05 ? 1 : 0); K.show(lv, 'hco3', born > 0.05 ? 1 : 0);
    K.show(lv, 'tide', span(cnt, 0.6, 1));
  };
  anchor(lv, 'hplus', () => st.h.clone().add(V(0, 0.4, 0.3)));
  anchor(lv, 'hco3', () => st.b.clone().add(V(0, 0.45, 0.3)));
  anchor(lv, 'cl', () => st.c.clone().add(V(0, 0.45, 0.3)));
  anchor(lv, 'tide', V(2.5, -6.2, 0.6));
  void tide;
}

/* ---------------------------------------------------------------- Spermatozoon ---- */
/* Along x, in the slide's proportions: head 5, neck 1, middle piece 5, tail 55 (units of 0.4). */
function buildSperm(K, tickFns) {
  const { THREE, V, mat, level, add, anchor, sphere, tube, regeo } = K;
  const lv = 'sperm', g = level(lv), U = 0.4;
  const HEAD = 5 * U, NECK = 1 * U, MID = 5 * U, TAIL = 55 * U;
  const x0 = 0, xNeck = HEAD, xMid = xNeck + NECK, xTail = xMid + MID, xEnd = xTail + TAIL;
  const head = sphere(1, mat(0xcdb4db, { opacity: 0.55 }), V(HEAD / 2, 0, 0)); head.scale.set(HEAD / 2, 0.75, 0.5);
  add(g, lv, 'head', head, { shell: true });
  const nuc = sphere(1, mat(0x5a189a), V(HEAD / 2 + 0.15, 0, 0)); nuc.scale.set(HEAD / 2 - 0.35, 0.58, 0.38);
  add(g, lv, 'nucleus', nuc);
  const acro = new THREE.Mesh(K.keep(new THREE.SphereGeometry(1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)), mat(0xff70a6, { opacity: 0.85, side: THREE.DoubleSide }));
  acro.rotation.z = Math.PI / 2; acro.position.set(HEAD / 2 - 0.05, 0, 0); acro.scale.set(0.8, HEAD / 2 + 0.06, 0.55);
  add(g, lv, 'acrosome', acro);
  add(g, lv, 'neck', K.between(V(xNeck - 0.05, 0, 0), V(xMid, 0, 0), 0.24, mat(0xa2d2ff)));
  const cMat = mat(0xffb703);
  add(g, lv, 'centrioles', K.between(V(xNeck + 0.05, -0.16, 0), V(xNeck + 0.05, 0.16, 0), 0.07, cMat));
  add(g, lv, 'centrioles', K.between(V(xNeck + 0.25, 0, -0.16), V(xNeck + 0.25, 0, 0.16), 0.07, cMat));
  add(g, lv, 'middle', K.between(V(xMid, 0, 0), V(xTail, 0, 0), 0.22, mat(0xbde0fe, { opacity: 0.6 })), { shell: true });
  const spiral = []; for (let i = 0; i <= 160; i++) { const t = i / 160, a = t * 18 * Math.PI; spiral.push(V(xMid + t * MID, 0.27 * Math.cos(a), 0.27 * Math.sin(a))); }
  add(g, lv, 'spiral', tube(spiral, 0.06, mat(0xe4774a), 480));
  /* the tail beats; the fibrous sheath wraps its first part */
  const SHEATH = 0.7, NT = 70;
  const tailMat = mat(0x8ecae6), sheathMat = mat(0x219ebc, { opacity: 0.55 });
  const tail = add(g, lv, 'tail', new THREE.Mesh(new THREE.BufferGeometry(), tailMat));
  const sheath = add(g, lv, 'sheath', new THREE.Mesh(new THREE.BufferGeometry(), sheathMat));
  const wave = (ph) => Array.from({ length: NT + 1 }, (_, i) => { const t = i / NT; return V(xTail + t * TAIL, 1.4 * t * t * Math.sin(t * 2.6 * Math.PI - ph), 0); });
  const pose = (ph) => {
    const pts = wave(ph), cut = Math.round(NT * SHEATH);
    regeo(tail, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), NT * 2, 0.07, 6, false));
    regeo(sheath, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.slice(0, cut + 1)), cut * 2, 0.15, 8, false));
    st.pts = pts;
  };
  const st = { pts: null };
  pose(0);
  let last = -1;
  tickFns[lv] = (t) => { if (t - last < 1 / 30) return; last = t; pose(t * 4); };
  anchor(lv, 'head', V(HEAD * 0.3, 0.8, 0)); anchor(lv, 'nucleus', V(HEAD * 0.6, 0.2, 0.4));
  anchor(lv, 'acrosome', V(0.15, 0.4, 0.45)); anchor(lv, 'neck', V(xNeck + NECK / 2, 0.3, 0));
  anchor(lv, 'centrioles', V(xNeck + 0.15, -0.25, 0.2)); anchor(lv, 'middle', V(xMid + MID * 0.7, 0.3, 0));
  anchor(lv, 'spiral', V(xMid + MID * 0.3, -0.3, 0.25));
  anchor(lv, 'sheath', () => st.pts[Math.round(NT * 0.3)]); anchor(lv, 'tail', () => st.pts[Math.round(NT * 0.9)]);
  void x0; void xEnd;
}

/* ---------------------------------------------------------------- Neuron ---- */
function buildNeuron(K) {
  const { THREE, V, mat, level, add, anchor, sphere, tube, instanced } = K;
  const lv = 'neuron', g = level(lv), rnd = rand(81);
  const soma = sphere(2.6, mat(0xffafcc, { opacity: 0.4, side: THREE.DoubleSide }), V(0, 0, 0), [36, 26]);
  soma.scale.set(1, 0.9, 0.85); add(g, lv, 'body', soma, { shell: true });
  add(g, lv, 'nucleus', sphere(1.0, mat(0xcdb4db, { opacity: 0.75 }), V(-0.3, 0.2, 0)));
  add(g, lv, 'nucleolus', sphere(0.35, mat(0x5a189a), V(-0.15, 0.35, 0.3)));
  const nissl = []; for (let i = 0; i < 26; i++) { let p; do { p = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(4.2); } while (p.length() < 1.4 || p.length() > 2.1); nissl.push(p); }
  add(g, lv, 'nissl', instanced(K.lowSphere, mat(0x3a0ca3), nissl.length, (i, d) => { d.position.copy(nissl[i]); d.scale.set(0.28, 0.12, 0.2); d.rotation.set(rnd() * 3, rnd() * 3, 0); }));
  const nfMat = mat(0x7209b7);
  for (let k = 0; k < 5; k++) { const a = k * 1.3; add(g, lv, 'neurofibrils', tube([V(-1.8, Math.sin(a) * 1.4, Math.cos(a) * 1.1), V(-0.4, Math.sin(a + 1) * 1.6, Math.cos(a + 1) * 0.9), V(1.6, Math.sin(a) * 0.5, Math.cos(a) * 0.4), V(3.2, Math.sin(a) * 0.12, Math.cos(a) * 0.12)], 0.035, nfMat, 40)); }
  /* dendrites: branching out of the far side */
  const dMat = mat(0xff8fab);
  const branch = (from, dir, len, r, depth) => {
    const to = from.clone().addScaledVector(dir, len), mid = from.clone().lerp(to, 0.5).add(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(len * 0.25));
    add(g, lv, 'dendrites', tube([from, mid, to], r, dMat, 16));
    if (depth > 0) for (const s of [-1, 1]) branch(to, dir.clone().add(V(rnd() - 0.5, s * 0.6, (rnd() - 0.5) * 0.6)).normalize(), len * 0.65, r * 0.65, depth - 1);
  };
  for (let k = 0; k < 5; k++) { const a = (k / 5) * 2 * Math.PI; const d = V(-0.8, Math.sin(a), Math.cos(a)).normalize(); branch(d.clone().multiplyScalar(2.3), d, 2.6, 0.24, 2); }
  /* axon hillock, axon, myelin from Schwann cells with nodes between, axon terminals */
  const hill = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(0.22, 0.9, 1.4, 20)), mat(0xff70a6)); hill.rotation.z = Math.PI / 2; hill.position.set(3.0, 0, 0);
  add(g, lv, 'hillock', hill);
  const AX0 = 3.7, AX1 = 26;
  add(g, lv, 'axon', K.between(V(AX0, 0, 0), V(AX1, 0, 0), 0.2, mat(0xf72585)));
  const myMat = mat(0xf1faee), swMat = mat(0x48cae4, { opacity: 0.45 }), swN = mat(0x0077b6), ndMat = mat(0xffd60a);
  const SEG = 3.6, GAP = 0.5;
  let x = 5, firstSeg = null, firstNode = null;
  while (x + SEG < AX1 - 1.5) {
    add(g, lv, 'myelin', K.between(V(x, 0, 0), V(x + SEG, 0, 0), 0.5, myMat));
    add(g, lv, 'schwann', K.between(V(x, 0, 0), V(x + SEG, 0, 0), 0.6, swMat), { shell: true });
    add(g, lv, 'schwann', sphere(0.28, swN, V(x + SEG / 2, 0.58, 0))).scale.set(1.4, 0.5, 0.9);
    if (!firstSeg) firstSeg = x;
    x += SEG;
    const ring = new THREE.Mesh(K.keep(new THREE.TorusGeometry(0.27, 0.06, 6, 16)), ndMat); ring.rotation.y = Math.PI / 2; ring.position.set(x + GAP / 2, 0, 0);
    add(g, lv, 'node', ring);
    if (!firstNode) firstNode = x + GAP / 2;
    x += GAP;
  }
  const tMat = mat(0xb5179e), kMat = mat(0x7209b7);
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * 2 * Math.PI, end = V(AX1 + 2.2, Math.sin(a) * 1.6, Math.cos(a) * 1.6);
    add(g, lv, 'terminals', tube([V(AX1, 0, 0), V(AX1 + 1, end.y * 0.4, end.z * 0.4), end], 0.1, tMat, 12));
    add(g, lv, 'terminals', sphere(0.32, kMat, end));
  }
  anchor(lv, 'body', V(0.6, 2.5, 0.8)); anchor(lv, 'nucleus', V(-0.6, -0.4, 0.8)); anchor(lv, 'nucleolus', V(-0.15, 0.45, 0.6));
  anchor(lv, 'nissl', nissl[0]); anchor(lv, 'neurofibrils', V(1.8, 0.4, 0.3));
  anchor(lv, 'dendrites', V(-4.5, 2.4, 0)); anchor(lv, 'hillock', V(3.0, 0.8, 0));
  anchor(lv, 'axon', V(AX1 - 0.8, 0.3, 0)); anchor(lv, 'myelin', V(firstSeg + SEG * 0.3, 0.5, 0.4));
  anchor(lv, 'schwann', V(firstSeg + SEG / 2, 0.9, 0)); anchor(lv, 'node', V(firstNode, -0.4, 0.2));
  anchor(lv, 'terminals', V(AX1 + 2.2, 1.9, 0.4));
}

/* ---------------------------------------------------------------- Immunological Surveillance (NK cell) ---- */
function buildNk(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, sphere, instanced } = K;
  const lv = 'nk', g = level(lv);
  const nkMat = mat(0x90e0ef, { opacity: 0.35, side: THREE.DoubleSide }), abMat = mat(0xffadad, { opacity: 0.4, side: THREE.DoubleSide });
  const nk = add(g, lv, 'nkcell', sphere(3.6, nkMat, V(-5, 0, 0), [36, 26]), { shell: true });
  const nkNuc = sphere(1.3, mat(0x0077b6), V(-6, -0.4, 0)); nk.add(nkNuc); nkNuc.position.set(-0.28, -0.1, 0); nkNuc.scale.setScalar(1.3 / 3.6);
  K.tag(lv, 'nkcell', nkNuc);
  const ab = add(g, lv, 'abnormal', sphere(4, abMat, V(4.2, 0, 0), [36, 26]), { shell: true });
  /* Golgi apparatus inside the NK cell */
  const golgi = new THREE.Group(); g.add(golgi);
  const gMat = mat(0xf2c14e);
  for (let k = 0; k < 4; k++) { const c = new THREE.Mesh(K.keep(new THREE.TorusGeometry(1.0 - 0.12 * k, 0.1, 6, 18, 2.2)), gMat); c.rotation.z = -1.1; c.position.set(-0.25 * k, 0, 0); golgi.add(K.tag(lv, 'golgi', c)); }
  /* perforin vesicles, perforin molecules, and the pores they form */
  const vMat = mat(0xb5179e), N = 6, D = new THREE.Object3D();
  const ves = add(g, lv, 'vesicles', instanced(K.lowSphere, vMat, N, (i, d) => d.scale.setScalar(0.001)));
  const mol = add(g, lv, 'perforin', instanced(K.unitCyl, mat(0xf72585), 18, (i, d) => d.scale.setScalar(0.001)));
  const pores = add(g, lv, 'pores', instanced(K.keep(new THREE.TorusGeometry(0.32, 0.1, 6, 14)), mat(0x7209b7), 5, (i, d) => d.scale.setScalar(0.001)));
  const st = { gap: 0, golgi: V(), ves: V(), mol: V(), pore: V() };
  stageFns[lv] = (s) => {
    const prog = stageProg(s, 4), adh = prog(0), re = prog(1), sec = prog(2), lys = prog(3);
    /* the NK cell moves up to the abnormal cell and holds on */
    const nkX = mix(-5.5, -3.55, span(adh, 0, 1)); nk.position.x = nkX;
    const contact = V(nkX + 3.6, 0, 0);
    /* its Golgi apparatus turns to face the contact */
    const gp = V(nkX - 1.2, 1.2, 0).lerp(V(nkX + 1.8, 0.3, 0), span(re, 0, 1));
    golgi.position.copy(gp); golgi.rotation.z = mix(0, -0.6, span(re, 0, 1));
    st.golgi = gp;
    /* vesicles bud off it (realignment), travel to the contact and release perforins (secretion) */
    for (let i = 0; i < N; i++) {
      const off = V(0, (i - (N - 1) / 2) * 0.42, ((i % 2) - 0.5) * 0.5);
      const p = gp.clone().add(V(0.6, 0, 0)).add(off).lerp(contact.clone().add(V(-0.5, 0, 0)).add(off), span(sec, 0, 0.5));
      D.position.copy(p); D.scale.setScalar(re > 0.4 && sec < 0.6 ? 0.24 : 0.001); D.updateMatrix(); ves.setMatrixAt(i, D.matrix);
      if (i === 1) st.ves = p;
    }
    ves.instanceMatrix.needsUpdate = true; ves.computeBoundingSphere();
    for (let i = 0; i < 18; i++) {
      const y = ((i % 6) - 2.5) * 0.4, z = (Math.floor(i / 6) - 1) * 0.45;
      const a = contact.clone().add(V(-0.2, y, z)), b = V(4.2 - 3.95, y * 0.9, z * 0.9);
      const p = a.lerp(b, span(sec, 0.5, 1));
      D.position.copy(p); D.quaternion.identity(); D.rotation.set(0, 0, Math.PI / 2); D.scale.set(sec > 0.5 && lys < 0.5 ? 0.05 : 0.001, 0.28, 0.05); D.updateMatrix(); mol.setMatrixAt(i, D.matrix);
      if (i === 7) st.mol = p;
    }
    mol.instanceMatrix.needsUpdate = true; mol.computeBoundingSphere();
    for (let i = 0; i < 5; i++) {
      const y = (i - 2) * 0.7, p = V(4.2 - Math.sqrt(16 - y * y), y, (i % 2 - 0.5) * 0.6);
      D.position.copy(p); D.rotation.set(0, Math.PI / 2, 0); D.scale.setScalar(Math.max(0.001, span(lys, 0, 0.5))); D.updateMatrix(); pores.setMatrixAt(i, D.matrix);
      if (i === 2) st.pore = p;
    }
    pores.instanceMatrix.needsUpdate = true; pores.computeBoundingSphere();
    K.show(lv, 'vesicles', re > 0.4 && sec < 0.6 ? 1 : 0);
    K.show(lv, 'perforin', sec > 0.5 && lys < 0.5 ? 1 : 0);
    K.show(lv, 'pores', lys > 0.05 ? 1 : 0);
    /* the abnormal cell swells and fades as it is lysed */
    ab.scale.setScalar(4 * mix(1, 1.08, span(lys, 0.4, 1)));
    K.show(lv, 'abnormal', mix(1, 0.45, span(lys, 0.5, 1)));
    st.gap = nkX;
  };
  anchor(lv, 'nkcell', () => V(st.gap - 1.5, 3.4, 0.6)); anchor(lv, 'abnormal', V(5.5, 3.6, 0.8));
  anchor(lv, 'golgi', () => st.golgi.clone().add(V(0, 0.9, 0.3)));
  anchor(lv, 'vesicles', () => st.ves.clone().add(V(0, 0.3, 0.3)));
  anchor(lv, 'perforin', () => st.mol.clone().add(V(0, 0.3, 0.3)));
  anchor(lv, 'pores', () => st.pore.clone().add(V(0, 0.4, 0.3)));
}

/* ---------------------------------------------------------------- Phagocytic antigen-presenting cell ---- */
function buildApc(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, sphere, instanced } = K;
  const lv = 'apc', g = level(lv), R = 6;
  add(g, lv, 'membrane', K.cutSphere(R, mat(0xcaffbf, { opacity: 0.4, side: THREE.DoubleSide })), { shell: true });
  add(g, lv, 'nucleus', sphere(1.8, mat(0x6a4c93), V(-2.2, -1.5, -1.5)));
  /* ER: curved sheets beside the nucleus */
  const erMat = mat(0x5fa8d3, { opacity: 0.85, side: THREE.DoubleSide });
  for (let k = 0; k < 3; k++) { const s = new THREE.Mesh(K.keep(new THREE.SphereGeometry(2.4 + 0.45 * k, 20, 8, 0.2, 1.4, 0.9, 1.2)), erMat); s.position.set(-2.2, -1.5, -1.5); add(g, lv, 'er', s); }
  const lyso = add(g, lv, 'lysosome', sphere(0.55, mat(0x9b5de5), V(-1, 2.5, 0.5)));
  /* the pathogens: rods outside, one taken in and broken down */
  const bMat = mat(0x80b918);
  const bug = K.keep(new THREE.CapsuleGeometry(0.3, 0.9, 4, 10));
  const outside = [V(9.2, 2.5, 0.6), V(8.6, -1.6, -0.8), V(10.2, 0.4, 1.4)];
  const bugs = outside.map((p, i) => { const m = new THREE.Mesh(bug, bMat); m.position.copy(p); m.rotation.z = i * 0.9; return add(g, lv, 'pathogen', m); });
  const vesicle = add(g, lv, 'pathogen', sphere(0.95, mat(0xd8f3dc, { opacity: 0.4 }), V(3.6, 1.6, 0.4)));
  const NF = 6, NM = 6, D = new THREE.Object3D();
  const frags = add(g, lv, 'fragments', instanced(K.lowSphere, mat(0xff006e), NF, (i, d) => d.scale.setScalar(0.001)));
  const mhcGeo = K.keep(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 8));
  const mhc = add(g, lv, 'mhc', instanced(mhcGeo, mat(0xffbe0b), NM, (i, d) => d.scale.setScalar(0.001)));
  const st = { frag: V(), mhc: V(), bug: V() };
  stageFns[lv] = (s) => {
    const prog = stageProg(s, 5), eng = prog(0), dig = prog(1), mk = prog(2), bd = prog(3), dsp = prog(4);
    /* engulfment: the first pathogen is drawn in, in its vesicle; the lysosome joins it */
    const vAt = V(R + 0.6, 1.6, 0.4).lerp(V(2.6, 1.6, 0.4), span(eng, 0, 1));
    bugs[0].position.copy(outside[0].clone().lerp(vAt, span(eng, 0, 0.6)));
    bugs[0].visible = dig < 0.5; vesicle.position.copy(vAt); vesicle.visible = eng > 0.5;
    lyso.position.copy(V(-1, 2.5, 0.5).lerp(vAt.clone().add(V(-0.6, 0.3, 0)), span(dig, 0, 0.5)));
    st.bug = bugs[0].position;
    /* fragments, then bound to Class II MHC proteins from the ER, then shown on the membrane */
    const fragOn = dig > 0.4;
    const mhcFrom = V(-0.6, 0.4, 0.8), meet = vAt.clone().add(V(-0.2, -0.2, 0));
    const shown = (i) => { const a = (i / NM) * 1.6 - 0.8; return V(Math.cos(a) * R, Math.sin(a) * R * 0.9, 1.6 + 0.3 * (i % 2)).normalize().multiplyScalar(R + 0.1); };
    for (let i = 0; i < NM; i++) {
      const jit = V(((i * 37) % 7) / 7 - 0.5, ((i * 53) % 5) / 5 - 0.5, ((i * 11) % 3) / 3 - 0.5).multiplyScalar(0.7);
      let m = mhcFrom.clone().add(jit).lerp(meet.clone().add(jit.clone().multiplyScalar(0.6)), span(bd, 0, 0.6));
      m = m.lerp(shown(i), span(dsp, 0, 1));
      const dirOut = dsp > 0.5 ? m.clone().normalize() : V(0, 1, 0);
      D.position.copy(m); D.quaternion.setFromUnitVectors(V(0, 1, 0), dirOut); D.scale.setScalar(mk > 0.2 ? Math.min(1, mk * 1.2) : 0.001); D.updateMatrix(); mhc.setMatrixAt(i, D.matrix);
      const f0 = vAt.clone().add(jit.clone().multiplyScalar(0.8));
      const fAt = bd > 0.4 || dsp > 0 ? m.clone().addScaledVector(dirOut, 0.55) : f0;
      D.position.copy(fAt); D.quaternion.identity(); D.scale.setScalar(fragOn ? 0.17 : 0.001); D.updateMatrix(); frags.setMatrixAt(i, D.matrix);
      if (i === 2) { st.frag = fAt; st.mhc = m; }
    }
    for (const im of [mhc, frags]) { im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere(); }
    K.show(lv, 'fragments', fragOn ? 1 : 0); K.show(lv, 'mhc', mk > 0.2 ? 1 : 0);
  };
  anchor(lv, 'membrane', V(-R * 0.6, R * 0.6, -R * 0.3)); anchor(lv, 'nucleus', V(-2.2, -1.5, 0.4));
  anchor(lv, 'er', V(-2.2, 1.0, -0.4)); anchor(lv, 'lysosome', () => lyso.position.clone().add(V(0, 0.6, 0)));
  anchor(lv, 'pathogen', () => (bugs[0].visible ? st.bug.clone().add(V(0, 0.7, 0)) : outside[1].clone().add(V(0, 0.7, 0))));
  anchor(lv, 'fragments', () => st.frag.clone().add(V(0, 0.3, 0.2)));
  anchor(lv, 'mhc', () => st.mhc.clone().add(V(0, -0.4, 0.3)));
}

export function buildLectureCells(K, stageFns, tickFns) {
  buildMembrane(K); buildEpithelium(K); buildBlood(K); buildAlveolus(K); buildParietal(K, stageFns);
  buildSperm(K, tickFns); buildNeuron(K); buildNk(K, stageFns); buildApc(K, stageFns);
}
