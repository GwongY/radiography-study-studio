/*
 * Cell zoom — the scenes, one group per level.
 *
 * A typical cell cut open, its nucleus, "The Organization of DNA within the Nucleus" (chromatin to a visible
 * chromosome, with the Nondividing cell ↔ Cell prepared for division slider), one nucleosome, the cell life cycle
 * (interphase to cytokinesis), meiosis (primary spermatocyte to spermatids) and protein synthesis with a hormone
 * signal in front of it. The cells of the other lectures are cell/lecture-cells.js; the helpers are cell/kit.js.
 *
 * The nucleosome is the Protein Data Bank's human nucleosome, PDB 3AFA (CC0; cell/nucleosome-3afa.js, built by
 * work/build-cell-nucleosome.mjs): its DNA, its base pairs and its histones are the measured atoms. The linker DNA
 * and the two neighbouring nucleosomes are drawn for this app. Everything else is procedural and schematic, not to
 * scale; the stage sliders show only the steps the sources name (outputs/cell-zoom.js).
 *
 * three.js is passed in (state.THREE), so PARTS can be read in Node without it. Nothing runs at module scope.
 */
import { makeKit, rand, span, mix, clamp01 } from './kit.js?v=1';
import { buildLectureCells, LECTURE_PARTS } from './lecture-cells.js?v=1';
import { DNA_STRANDS, BASE_PAIRS, HISTONE_CHAINS } from './nucleosome-3afa.js?v=1';
import { stagesFor } from '../cell-zoom.js?v=1';
import { MODELS, attachModel } from './models.js?v=1';

/* Which labelled part each level builds; work/cell-zoom-check.mjs holds this to outputs/cell-zoom.js. */
export const PARTS = {
  cell: ['membrane', 'cytoplasm', 'nucleus', 'envelope', 'pores', 'nucleolus', 'ribosomes', 'rer', 'ser', 'golgi', 'vesicles', 'mito', 'lyso', 'peroxisomes', 'centrosome', 'centrioles', 'microtubules'],
  centrosome: ['centrosome', 'centrioles', 'triplets'],
  nucleus: ['envelope', 'pores', 'nucleoplasm', 'nucleolus', 'chromatin'],
  dna: ['nucleosome', 'chromatin', 'supercoiled', 'chromosome', 'sisters', 'centromere', 'kinetochore'],
  nucleosome: ['histones', 'dna', 'helix', 'bases', 'gene', 'nucleosome'],
  cycle: ['membrane', 'envelope', 'chromatin', 'sisters', 'centromere', 'kinetochore', 'centrioles', 'spindle', 'daughters'],
  meiosis: ['primary', 'secondary', 'spermatids', 'sisters', 'centrioles'],
  expression: ['gene', 'promoter', 'polymerase', 'mrna', 'envelope', 'pores', 'ribosome', 'rer', 'trna', 'chain', 'membrane', 'lipo', 'carrier', 'nreceptor', 'hre', 'hydro', 'gpcr', 'gprotein', 'ac', 'camp', 'kinase', 'creb'],
  ...LECTURE_PARTS,
  /* the levels that are their model and nothing else (MODEL_ONLY) */
  redcell: ['rbc', 'hemoglobin'],
  hemoglobin: ['globin', 'heme', 'iron', 'o2', 'co2', 'hplus'],
  plasma: ['water', 'ions', 'albumin', 'globulins', 'lipids', 'gamma', 'fibrinogen', 'plasma'],
  pct: ['fluid', 'microvilli', 'apical', 'basolateral', 'junctions', 'basement', 'isf', 'capillary', 'cells', 'nucleus', 'mito', 'coupled', 'pump', 'carrier', 'kchannels', 'aquaporins', 'na', 'k', 'glucose', 'cl', 'h2o'],
  pacemaker: ['membrane', 'ecf', 'cytoplasm', 'hcn', 'cachannels', 'kchannels', 'na', 'ca', 'k', 'potential', 'threshold'],
  myocardial: ['membrane', 'ecf', 'cytoplasm', 'nachannels', 'cachannels', 'kchannels', 'na', 'ca', 'k', 'potential'],
  rmp: ['membrane', 'ecf', 'cytoplasm', 'kpassive', 'napassive', 'pump', 'proteins', 'charge', 'potential', 'na', 'k'],
  testis: ['tubule', 'lumen', 'sertoli', 'spermatogonium', 'primary', 'secondary', 'spermatids', 'spermatozoa', 'leydig', 'capillary', 'lh', 'fsh', 'testosterone', 'abp', 'inhibin'],
  oogenesis: ['oogonia', 'primary', 'follicle', 'antrum', 'secondary', 'polar1', 'polar2', 'ovum', 'sperm'],
  follicle: ['ovary', 'capillary', 'primordial', 'follicle', 'antrum', 'primary', 'oocyte', 'polar1', 'zona', 'corona', 'cl', 'fsh', 'lh', 'estrogen', 'progesterone'],
  parietal: ['ca', 'hplus', 'hco3', 'cl', 'clchannels', 'lumen', 'isf', 'tide', 'cell', 'blood', 'pump', 'counter', 'co2', 'h2o', 'h2co3', 'vagus', 'gcell', 'gastrin', 'cck', 'gip', 'secretin'],
  vessels: ['artery', 'vein', 'externa', 'media', 'intima', 'endothelium', 'valves', 'vasa'],
  capillaries: ['continuous', 'fenestrated', 'sinusoid', 'endothelial', 'tight', 'fenestrations', 'basement', 'rbc'],
  gutwall: ['mucosa', 'epithelium', 'enteroendocrine', 'lamina', 'mm', 'submucosa', 'bloodvessels', 'lymph', 'glands', 'externa', 'serosa'],
};

/* Levels drawn by no code: the Blender model (cell/models.js) is the whole level, so until it loads the level is
   empty and the viewer says "Loading the 3D model…". Newer levels are made this way (CLAUDE.md: no code-drawn 3D). */
export const MODEL_ONLY = ['redcell', 'hemoglobin', 'plasma', 'pct', 'pacemaker', 'myocardial', 'rmp', 'testis', 'follicle', 'oogenesis', 'parietal', 'vessels', 'capillaries', 'gutwall'];
/* the extent a model-only level frames before its model arrives (the models are built to about this size) */
const MODEL_ONLY_EXTENT = 11;

const COL = {
  membrane: 0xe7a0b4, cyto: 0xbfe6f2, envelope: 0x8f7fd6, nucleoplasm: 0xc9b8f5, nucleolus: 0x4b2a7b, chromatin: 0x7b4fa3,
  rer: 0x5fa8d3, ribo: 0x24395c, ser: 0x8fd0ea, golgi: 0xf2c14e, vesicle: 0xf7e1a0, mito: 0xe4774a, lyso: 0x9b5de5,
  perox: 0x52b788, centro: 0xffe08a, centriole: 0xffb703, mt: 0x2a9d8f, dna: 0xe9ecef, gene: 0xffb703, histone: 0x7aa6e0,
};
const BASE_COLOUR = { A: 0xe76f51, T: 0xf4a261, G: 0x2a9d8f, C: 0x8ab17d };
const HISTONE_COLOUR = { 'H3.1': 0x4895ef, H4: 0x4cc9f0, H2A: 0xf72585, H2B: 0xb5179e };

/* spherical to cartesian, the same parameterisation as THREE.SphereGeometry */
const sph = (K, r, phi, theta) => K.V(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));

/* a random walk inside a ball of radius R (for chromatin) */
function walk(K, rnd, R, n, step, start = null) {
  const pts = [start ? start.clone() : K.V((rnd() - 0.5) * R, (rnd() - 0.5) * R, (rnd() - 0.5) * R)];
  for (let i = 1; i < n; i++) {
    const p = pts[i - 1].clone().add(K.V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(step));
    if (p.length() > R) p.multiplyScalar(R / p.length() * 0.9);
    pts.push(p);
  }
  return pts;
}

/* ---------------------------------------------------------------- the typical cell ---- */
function buildCell(K) {
  const { THREE, V, mat, level, add, anchor, cutSphere, sphere, tube, instanced, fib, inWedge, rods } = K;
  const lv = 'cell', g = level(lv), rnd = rand(11);
  add(g, lv, 'membrane', cutSphere(10, mat(COL.membrane, { opacity: 0.5, side: THREE.DoubleSide })), { shell: true });
  anchor(lv, 'membrane', V(-6.2, 7.6, 2.5));
  add(g, lv, 'cytoplasm', cutSphere(9.85, mat(COL.cyto, { opacity: 0.18, side: THREE.BackSide })), { shell: true });
  anchor(lv, 'cytoplasm', V(5.6, -5.2, 4.2));
  /* the nucleus: nucleoplasm, a double envelope, pores, the nucleolus and some chromatin */
  const nMat = mat(COL.nucleoplasm, { opacity: 0.45, side: THREE.DoubleSide });
  add(g, lv, 'nucleus', cutSphere(3.5, nMat, 36), { shell: true });
  const chromMat = mat(COL.chromatin);
  for (let i = 0; i < 6; i++) add(g, lv, 'nucleus', tube(walk(K, rnd, 3.1, 9, 1.0), 0.07, chromMat, 60));
  anchor(lv, 'nucleus', V(1.2, -1.4, 1.2));
  const envMat = mat(COL.envelope, { opacity: 0.8, side: THREE.DoubleSide });
  add(g, lv, 'envelope', cutSphere(3.75, envMat, 36), { shell: true });
  add(g, lv, 'envelope', cutSphere(3.95, mat(COL.envelope, { opacity: 0.4, side: THREE.DoubleSide }), 36), { shell: true });
  anchor(lv, 'envelope', V(2.75, 2.75, 0));
  const p0 = V(0.75, 0.55, -0.35).normalize();
  const poreDirs = [p0, ...fib(80).filter((p) => !inWedge(p))];
  const torus = K.keep(new THREE.TorusGeometry(0.26, 0.08, 6, 14));
  add(g, lv, 'pores', instanced(torus, mat(0x3c2f80), poreDirs.length, (i, d) => { d.position.copy(poreDirs[i]).multiplyScalar(3.97); d.quaternion.setFromUnitVectors(V(0, 0, 1), poreDirs[i]); }));
  anchor(lv, 'pores', p0.clone().multiplyScalar(3.97));
  const nuc = V(0.9, 0.4, 0.9);
  add(g, lv, 'nucleolus', sphere(1.1, mat(COL.nucleolus), nuc));
  anchor(lv, 'nucleolus', nuc);
  /* rough ER: curved sheets beyond the nucleus, studded with ribosomes */
  const erMat = mat(COL.rer, { opacity: 0.85, side: THREE.DoubleSide });
  for (let k = 0; k < 4; k++) add(g, lv, 'rer', new THREE.Mesh(K.keep(new THREE.SphereGeometry(4.7 + 0.6 * k, 28, 10, 4.6, 1.6, 0.8, 1.4)), erMat));
  const riboOnEr = [];
  for (let i = 0; i < 180; i++) riboOnEr.push(sph(K, 4.78 + 0.6 * Math.floor(rnd() * 4), 4.6 + rnd() * 1.6, 0.8 + rnd() * 1.4));
  add(g, lv, 'rer', instanced(K.lowSphere, mat(COL.ribo), riboOnEr.length, (i, d) => { d.position.copy(riboOnEr[i]); d.scale.setScalar(0.09); }));
  anchor(lv, 'rer', sph(K, 5.3, 5.0, 1.3));
  /* smooth ER: tubules on the other side */
  const serMat = mat(COL.ser);
  let serAnchor = null;
  for (let i = 0; i < 6; i++) {
    const pts = []; let phi = 3.4 + rnd() * 0.9, th = 1.1 + rnd() * 0.9, r = 5.4 + rnd() * 2;
    for (let j = 0; j < 7; j++) { pts.push(sph(K, r, phi, th)); phi += (rnd() - 0.5) * 0.35; th += (rnd() - 0.5) * 0.35; r += (rnd() - 0.5) * 0.6; }
    add(g, lv, 'ser', tube(pts, 0.2, serMat, 40));
    if (!serAnchor) serAnchor = pts[3];
  }
  anchor(lv, 'ser', serAnchor);
  /* Golgi apparatus: stacked, curved cisternae, with secretory vesicles budding outwards */
  const gc = sph(K, 6.6, 5.4, 1.15);
  const golgi = new THREE.Group(); golgi.position.copy(gc); golgi.lookAt(0, 0, 0); g.add(golgi);
  const gMat = mat(COL.golgi);
  for (let k = 0; k < 5; k++) {
    const R = 2.0 - 0.15 * k;
    const c = new THREE.Mesh(K.keep(new THREE.TorusGeometry(R, 0.2, 8, 24, 1.7)), gMat);
    c.rotation.z = Math.PI / 2 - 0.85; c.position.set(0, -R, (k - 2) * 0.45); c.scale.set(1, 1, 0.6);
    golgi.add(K.tag(lv, 'golgi', c));
  }
  anchor(lv, 'golgi', gc);
  const n = gc.clone().normalize(), vMat = mat(COL.vesicle);
  let vAnchor = null;
  for (let i = 0; i < 6; i++) {
    const p = gc.clone().addScaledVector(n, 1.4 + i * 0.4).add(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(1.4));
    add(g, lv, 'vesicles', sphere(0.32, vMat, p));
    if (!vAnchor) vAnchor = p;
  }
  anchor(lv, 'vesicles', vAnchor);
  /* scattered organelles, kept out of the open wedge */
  const spot = (rmin, rmax) => { for (;;) { const p = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(rmin + rnd() * (rmax - rmin)); if (!inWedge(p)) return p; } };
  const caps = K.keep(new THREE.CapsuleGeometry(0.5, 1.4, 6, 12));
  const mMat = mat(COL.mito);
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(caps, mMat); m.position.copy(i === 0 ? V(6.5, -2.5, -2.2) : spot(5, 8.3)); m.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    add(g, lv, 'mito', m);
  }
  anchor(lv, 'mito', V(6.5, -2.5, -2.2));
  const lMat = mat(COL.lyso), pMat = mat(COL.perox);
  const ly0 = V(-3.5, -6.5, 3.5), px0 = V(-6.5, 1.5, 4.5);
  for (let i = 0; i < 5; i++) add(g, lv, 'lyso', sphere(0.45, lMat, i ? spot(4.8, 8.8) : ly0));
  for (let i = 0; i < 4; i++) add(g, lv, 'peroxisomes', sphere(0.36, pMat, i ? spot(4.8, 8.8) : px0));
  anchor(lv, 'lyso', ly0); anchor(lv, 'peroxisomes', px0);
  const free = Array.from({ length: 240 }, () => spot(4.4, 9.3));
  add(g, lv, 'ribosomes', instanced(K.lowSphere, mat(COL.ribo), free.length, (i, d) => { d.position.copy(free[i]); d.scale.setScalar(0.09); }));
  anchor(lv, 'ribosomes', free[0]);
  /* centrosome: two centrioles at right angles, each nine triplets of microtubules; microtubules radiate from it */
  const cc = V(4.6, -3.2, -1.2);
  add(g, lv, 'centrosome', sphere(0.95, mat(COL.centro, { opacity: 0.35 }), cc), { shell: true });
  anchor(lv, 'centrosome', cc.clone().add(V(0, 0.95, 0)));
  const axes = [V(0, 1, 0), V(1, 0, 0)];
  add(g, lv, 'centrioles', instanced(K.unitCyl, mat(COL.centriole), 54, (i, d) => {
    const b = Math.floor(i / 27), t = Math.floor((i % 27) / 3), j = i % 3, ax = axes[b];
    const u = b === 0 ? V(1, 0, 0) : V(0, 0, 1), w = ax.clone().cross(u);
    const a = t * 2 * Math.PI / 9 + j * 0.13;
    d.position.copy(cc).addScaledVector(u, Math.cos(a) * 0.2).addScaledVector(w, Math.sin(a) * 0.2).addScaledVector(V(0.42, 0, 0), b);
    d.quaternion.setFromUnitVectors(V(0, 1, 0), ax); d.scale.set(0.03, 0.62, 0.03);
  }));
  anchor(lv, 'centrioles', cc.clone().add(V(0.3, -0.3, 0)));
  const mts = rods(mat(COL.mt, { opacity: 0.9 }), 40, 0.03);
  for (let i = 0; i < 40; i++) { let dir; do { dir = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(); } while (inWedge(cc.clone().addScaledVector(dir, 5))); const end = cc.clone().addScaledVector(dir, 12); end.multiplyScalar(Math.min(1, 9.3 / end.length())); mts.userData.set(i, cc, end); }
  mts.userData.commit();
  add(g, lv, 'microtubules', mts);
  anchor(lv, 'microtubules', V(5.8, 1.0, -3.5));
}

/* ---------------------------------------------------------------- the centrosome ---- */
/* Until its model arrives (cell/models/centrosome.glb): two centrioles at right angles, nine triplets each. */
function buildCentrosome(K) {
  const { V, mat, level, add, anchor, sphere, instanced } = K;
  const lv = 'centrosome', g = level(lv);
  add(g, lv, 'centrosome', sphere(4.2, mat(COL.centro, { opacity: 0.22 })), { shell: true });
  anchor(lv, 'centrosome', V(0, 4.2, 0));
  const axes = [V(0, 1, 0), V(1, 0, 0)];
  add(g, lv, 'centrioles', instanced(K.unitCyl, mat(COL.centriole), 54, (i, d) => {
    const b = Math.floor(i / 27), t = Math.floor((i % 27) / 3), j = i % 3, ax = axes[b];
    const u = b === 0 ? V(1, 0, 0) : V(0, 0, 1), w = ax.clone().cross(u);
    const a = t * 2 * Math.PI / 9 + j * 0.13;
    d.position.addScaledVector(u, Math.cos(a) * 0.9).addScaledVector(w, Math.sin(a) * 0.9).add(b ? V(1.6, -1.4, 0) : V(-1.2, 0.4, 0));
    d.quaternion.setFromUnitVectors(V(0, 1, 0), ax); d.scale.set(0.12, 3.2, 0.12);
  }));
  anchor(lv, 'centrioles', V(-1.2, 2.2, 0.9));
}

/* ---------------------------------------------------------------- the nucleus ---- */
function buildNucleus(K) {
  const { THREE, V, mat, level, add, anchor, cutSphere, sphere, tube, instanced, fib, inWedge } = K;
  const lv = 'nucleus', g = level(lv), rnd = rand(23);
  add(g, lv, 'nucleoplasm', cutSphere(7.6, mat(COL.nucleoplasm, { opacity: 0.22, side: THREE.DoubleSide })), { shell: true });
  anchor(lv, 'nucleoplasm', V(3.2, -3.6, 1.2));
  add(g, lv, 'envelope', cutSphere(8, mat(COL.envelope, { opacity: 0.8, side: THREE.DoubleSide })), { shell: true });
  add(g, lv, 'envelope', cutSphere(8.45, mat(COL.envelope, { opacity: 0.4, side: THREE.DoubleSide })), { shell: true });
  anchor(lv, 'envelope', V(5.8, 5.8, 0));
  const p0 = V(0.6, 0.5, -0.62).normalize();
  const dirs = [p0, ...fib(70).filter((p) => !inWedge(p))];
  const ring = K.keep(new THREE.TorusGeometry(0.55, 0.17, 8, 18));
  add(g, lv, 'pores', instanced(ring, mat(0x3c2f80), dirs.length, (i, d) => { d.position.copy(dirs[i]).multiplyScalar(8.47); d.quaternion.setFromUnitVectors(V(0, 0, 1), dirs[i]); }));
  anchor(lv, 'pores', p0.clone().multiplyScalar(8.47));
  const nuc = V(2, 1.5, 2.2);
  add(g, lv, 'nucleolus', sphere(2, mat(COL.nucleolus), nuc));
  anchor(lv, 'nucleolus', nuc);
  const cMat = mat(COL.chromatin);
  let first = null;
  for (let i = 0; i < 22; i++) { const pts = walk(K, rnd, 7, 10, 1.3); add(g, lv, 'chromatin', tube(pts, 0.1, cMat, 70)); if (!first) first = pts[4]; }
  anchor(lv, 'chromatin', first);
}

/* ------------------------------------------------ The Organization of DNA within the Nucleus ---- */
function buildDna(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, tube, instanced, show } = K;
  const lv = 'dna', g = level(lv);
  /* nucleosomes on their DNA string */
  const beadMat = mat(0xf4a261), strMat = mat(COL.dna);
  const string = []; for (let x = -16; x <= -9; x += 0.25) string.push(V(x, 0.25 * Math.sin(x * 2), 0));
  add(g, lv, 'nucleosome', tube(string, 0.07, strMat, 80));
  const bead = K.keep(new THREE.CylinderGeometry(0.5, 0.5, 0.55, 18));
  for (let k = 0; k < 5; k++) { const b = new THREE.Mesh(bead, beadMat); b.rotation.x = Math.PI / 2; b.position.set(-15.2 + 1.4 * k, 0.25 * Math.sin((-15.2 + 1.4 * k) * 2), 0); add(g, lv, 'nucleosome', b); }
  anchor(lv, 'nucleosome', V(-12.4, 0.9, 0));
  /* chromatin: the nucleosomes packed into a coiled fibre */
  const fibre = []; for (let i = 0; i <= 70; i++) { const a = i * Math.PI / 3; fibre.push(V(-9 + i * 0.1, 0.9 * Math.sin(a), 0.9 * Math.cos(a))); }
  add(g, lv, 'chromatin', tube(fibre, 0.06, mat(COL.dna), 280));
  add(g, lv, 'chromatin', instanced(bead, mat(0xf4a261), fibre.length, (i, d) => { d.position.copy(fibre[i]); d.scale.setScalar(0.62); d.lookAt(fibre[i].x, 0, 0); }));
  anchor(lv, 'chromatin', V(-5.5, 1.2, 0.6));
  /* supercoiled region: the fibre coiled again */
  const coil = []; for (let i = 0; i <= 120; i++) { const t = i / 120, a = t * 7 * Math.PI; coil.push(V(-2 + 6.3 * t, 1.5 * Math.sin(a), 1.5 * Math.cos(a))); }
  add(g, lv, 'supercoiled', tube(coil, 0.36, mat(0xc77dff), 360));
  anchor(lv, 'supercoiled', V(1.2, 2.1, 0));
  /* the visible chromosome: two sister chromatids joined at the centromere, a kinetochore on each side */
  const chrom = new THREE.Group(); chrom.position.set(9.5, 0, 0); g.add(chrom);
  const cap = K.keep(new THREE.CapsuleGeometry(0.85, 4.6, 8, 16));
  const halo = K.keep(new THREE.CapsuleGeometry(1.15, 4.8, 8, 16));
  const haloMat = mat(0xe0aaff, { opacity: 0.16, side: THREE.DoubleSide });
  const sMats = [mat(0x9d4edd), mat(0xb185db)];
  [0.32, -0.32].forEach((tilt, i) => {
    const s = new THREE.Mesh(cap, sMats[i]); s.rotation.z = tilt; s.position.x = i ? 0.55 : -0.55; chrom.add(K.tag(lv, 'sisters', s));
    const h = new THREE.Mesh(halo, haloMat); h.rotation.z = tilt; h.position.x = s.position.x; chrom.add(K.tag(lv, 'chromosome', h, { noPick: true }));
  });
  chrom.add(K.tag(lv, 'centromere', K.sphere(0.8, mat(0x5a189a))));
  const disc = K.keep(new THREE.CylinderGeometry(0.5, 0.5, 0.18, 18));
  const kMat = mat(0xffd166);
  for (const z of [0.85, -0.85]) { const k = new THREE.Mesh(disc, kMat); k.rotation.x = Math.PI / 2; k.position.z = z; chrom.add(K.tag(lv, 'kinetochore', k)); }
  let sc = 1;
  anchor(lv, 'chromosome', () => V(9.5, 3.4 * sc, 0));
  anchor(lv, 'sisters', () => V(9.5 + 1.5 * sc, -1.9 * sc, 0.8 * sc));
  anchor(lv, 'centromere', () => V(9.5 - 0.6 * sc, -0.6 * sc, 0.6 * sc));
  anchor(lv, 'kinetochore', () => V(9.5, 0, 0.95 * sc));
  stageFns[lv] = (c) => {
    const s = span(c, 0.25, 0.6), x = span(c, 0.55, 1);
    show(lv, 'supercoiled', s);
    sc = mix(0.35, 1, x);
    chrom.scale.setScalar(sc);
    for (const p of ['chromosome', 'sisters', 'centromere', 'kinetochore']) show(lv, p, x);
  };
}

/* ---------------------------------------------------------------- one nucleosome (PDB 3AFA) ---- */
function buildNucleosome(K) {
  const { THREE, V, mat, level, add, anchor, tube, instanced, rods } = K;
  const lv = 'nucleosome', g = level(lv);
  const P = (arr, i) => V(arr[3 * i] * 0.01, arr[3 * i + 1] * 0.01, arr[3 * i + 2] * 0.01);   /* tenths of Å -> 10 Å units */
  /* histones: one bead per C-alpha, coloured by histone (H3, H4, H2A, H2B; unlabelled) */
  const ca = HISTONE_CHAINS.flatMap((h) => Array.from({ length: h.ca.length / 3 }, (_, i) => ({ p: P(h.ca, i), c: HISTONE_COLOUR[h.name] || COL.histone })));
  const hist = instanced(K.lowSphere, mat(0xffffff, { rough: 0.5 }), ca.length, (i, d) => { d.position.copy(ca[i].p); d.scale.setScalar(0.36); });
  ca.forEach((x, i) => hist.setColorAt(i, new THREE.Color(x.c)));
  add(g, lv, 'histones', hist);
  anchor(lv, 'histones', ca[Math.floor(ca.length / 3)].p);
  /* DNA: the two backbones; the first 58 base pairs drawn as a gene */
  const [s0, s1] = DNA_STRANDS;
  const n = s0.bases.length, pairOf = new Map();
  for (let k = 0; k < BASE_PAIRS.length; k += 2) pairOf.set(BASE_PAIRS[k], BASE_PAIRS[k + 1]);
  const bb0 = Array.from({ length: n }, (_, i) => P(s0.backbone, i)), bb1 = Array.from({ length: n }, (_, i) => P(s1.backbone, i));
  const c10 = Array.from({ length: n }, (_, i) => P(s0.c1, i)), c11 = Array.from({ length: n }, (_, i) => P(s1.c1, i));
  const GENE = 58;
  const geneMat = mat(COL.gene, { rough: 0.4 }), dnaMat = mat(COL.dna, { rough: 0.4 });
  add(g, lv, 'gene', tube(bb0.slice(0, GENE + 1), 0.13, geneMat, GENE * 6));
  add(g, lv, 'dna', tube(bb0.slice(GENE), 0.13, dnaMat, (n - GENE) * 6));
  const partner = [...Array(GENE).keys()].map((i) => pairOf.get(i)).filter((j) => j != null);
  const lo = Math.min(...partner), hi = Math.max(...partner);
  add(g, lv, 'gene', tube(bb1.slice(lo, hi + 1), 0.13, geneMat, (hi - lo + 1) * 6));
  if (lo > 0) add(g, lv, 'dna', tube(bb1.slice(0, lo + 1), 0.13, dnaMat, (lo + 1) * 6));
  if (hi < n - 1) add(g, lv, 'dna', tube(bb1.slice(hi), 0.13, dnaMat, (n - hi) * 6));
  anchor(lv, 'gene', bb0[25]);
  anchor(lv, 'dna', bb0[105]);
  /* the bases: half a rung from each strand's sugar to the middle, coloured A, T, C or G */
  const pairs = [...pairOf.entries()];
  const bases = rods(mat(0xffffff, { rough: 0.5 }), pairs.length * 2, 0.08);
  pairs.forEach(([i, j], k) => {
    const mid = c10[i].clone().add(c11[j]).multiplyScalar(0.5);
    bases.userData.set(2 * k, c10[i], mid); bases.userData.set(2 * k + 1, c11[j], mid);
    bases.setColorAt(2 * k, new THREE.Color(BASE_COLOUR[s0.bases[i]])); bases.setColorAt(2 * k + 1, new THREE.Color(BASE_COLOUR[s1.bases[j]]));
  });
  bases.userData.commit();
  add(g, lv, 'bases', bases);
  anchor(lv, 'bases', c10[120].clone().add(c11[pairOf.get(120)]).multiplyScalar(0.5));
  /* linker DNA leaving each end as a right-handed double helix (drawn), to a neighbouring nucleosome (drawn) */
  const axis = (i) => c10[i].clone().add(c11[pairOf.get(i)]).multiplyScalar(0.5);
  const helixMat = mat(0xd0dbe6, { rough: 0.4 }), rungMat = mat(0x9aa5b1), nbMat = mat(COL.histone, { opacity: 0.95 }), nbDna = mat(0xd0dbe6);
  const STEPS = 34, RISE = 0.34, TURN = 2 * Math.PI / 10.5;
  let linkerMid = null, neighbour = null;
  for (const [end, inner] of [[0, 4], [n - 1, n - 5]]) {
    const a0 = axis(end), dir = a0.clone().sub(axis(inner)).normalize();
    const rad = (p) => { const u = p.clone().sub(a0); return u.addScaledVector(dir, -u.dot(dir)); };
    const u0 = rad(bb0[end]), u1 = rad(bb1[pairOf.get(end)]);
    const st0 = [bb0[end]], st1 = [bb1[pairOf.get(end)]];
    const rung = rods(rungMat, STEPS, 0.06);
    for (let m = 1; m <= STEPS; m++) {
      const c = a0.clone().addScaledVector(dir, m * RISE), q = new THREE.Quaternion().setFromAxisAngle(dir, m * TURN);
      const p0 = c.clone().add(u0.clone().applyQuaternion(q)), p1 = c.clone().add(u1.clone().applyQuaternion(q));
      st0.push(p0); st1.push(p1); rung.userData.set(m - 1, p0, p1);
    }
    rung.userData.commit();
    add(g, lv, 'helix', tube(st0, 0.12, helixMat, STEPS * 5)); add(g, lv, 'helix', tube(st1, 0.12, helixMat, STEPS * 5)); add(g, lv, 'helix', rung);
    if (!linkerMid) linkerMid = st0[Math.floor(STEPS / 2)];
    /* the neighbour: a histone core with DNA wrapped 1.65 turns */
    const tip = a0.clone().addScaledVector(dir, STEPS * RISE);
    const side = dir.clone().cross(V(0, 0, 1)); if (side.lengthSq() < 1e-3) side.set(1, 0, 0); side.normalize();
    const ax2 = dir.clone().cross(side).normalize();
    const centre = tip.clone().addScaledVector(side, 4.2).addScaledVector(dir, 1.2);
    const core = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(3.2, 3.2, 4.2, 28)), nbMat);
    core.position.copy(centre); core.quaternion.setFromUnitVectors(V(0, 1, 0), ax2);
    add(g, lv, 'nucleosome', core);
    const wrap = [];
    const e1 = side.clone().negate(), e2 = dir.clone();
    for (let i = 0; i <= 80; i++) { const t = i / 80, a = t * 1.65 * 2 * Math.PI; wrap.push(centre.clone().addScaledVector(e1, 4.2 * Math.cos(a)).addScaledVector(e2, 4.2 * Math.sin(a)).addScaledVector(ax2, (t - 0.5) * 2.6)); }
    add(g, lv, 'nucleosome', tube(wrap, 0.5, nbDna, 160));
    if (!neighbour) neighbour = centre.clone().addScaledVector(ax2, 2.4);
  }
  anchor(lv, 'helix', linkerMid);
  anchor(lv, 'nucleosome', neighbour);
}

/* --------------------------------------------- one duplicated chromosome, as two chromatids ---- */
/* A chromatid: a capsule along y, its centromere (tagged cenPart), and a kinetochore on the side facing its pole. */
function makeChromatid(K, lv, L, colourMat, cenMat, kinMat, side, cenPart = 'centromere') {
  const { THREE } = K;
  const g = new THREE.Group();
  g.add(K.tag(lv, 'sisters', new THREE.Mesh(K.keep(new THREE.CapsuleGeometry(0.3, Math.max(0.1, L - 0.6), 4, 10)), colourMat)));
  const cen = K.sphere(0.3, cenMat); g.add(K.tag(lv, cenPart, cen));
  if (kinMat) { const k = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12)), kinMat); k.rotation.z = Math.PI / 2; k.position.x = side * 0.3; g.add(K.tag(lv, 'kinetochore', k)); }
  return g;
}

/* ---------------------------------------------------------------- the cell life cycle ---- */
function buildCycle(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, tube, show, rods, peanut, regeo, sphere } = K;
  const lv = 'cycle', g = level(lv), rnd = rand(31), R = 8;
  const memMat = mat(COL.membrane, { opacity: 0.28, side: THREE.DoubleSide });
  const mem = add(g, lv, 'membrane', new THREE.Mesh(peanut(R, 0, 0), memMat), { shell: true });
  const dMat = mat(COL.membrane, { opacity: 0.3, side: THREE.DoubleSide });
  const daughters = [-1, 1].map((sgn) => add(g, lv, 'daughters', sphere(6.2, dMat, V(sgn * 6.6, 0, 0), [40, 28]), { shell: true }));
  /* nuclear envelope: the parent's, then the two daughters' */
  const envMat = mat(COL.envelope, { opacity: 0.45, side: THREE.DoubleSide });
  const env0 = add(g, lv, 'envelope', sphere(3.4, envMat, null, [36, 24]), { shell: true });
  const envD = [-1, 1].map(() => add(g, lv, 'envelope', sphere(2.2, envMat, null, [28, 20]), { shell: true }));
  /* chromatin: the parent's (doubled by DNA replication), then the daughters' */
  const cMat = mat(COL.chromatin);
  const chromA = new THREE.Group(), chromB = new THREE.Group(); g.add(chromA, chromB);
  for (let i = 0; i < 7; i++) chromA.add(K.tag(lv, 'chromatin', tube(walk(K, rnd, 2.9, 9, 0.9), 0.07, cMat, 50)));
  for (let i = 0; i < 7; i++) chromB.add(K.tag(lv, 'chromatin', tube(walk(K, rnd, 2.9, 9, 0.9), 0.07, cMat, 50)));
  const chromD = [-1, 1].map(() => { const grp = new THREE.Group(); g.add(grp); for (let i = 0; i < 5; i++) grp.add(K.tag(lv, 'chromatin', tube(walk(K, rnd, 1.8, 8, 0.7), 0.06, cMat, 40))); return grp; });
  /* four chromosomes, each two sister chromatids */
  const LEN = [2.2, 1.7, 2.0, 1.4], COLS = [0xe63946, 0x457b9d, 0x2a9d8f, 0xf4a261], PLATE = [-3.6, -1.2, 1.2, 3.6];
  const cenMat = mat(0x3d0e61), kinMat = mat(0xffd166);
  const chromatids = [];   /* [i][c] */
  const proPos = LEN.map(() => V((rnd() - 0.5) * 3.4, (rnd() - 0.5) * 3.4, (rnd() - 0.5) * 1.6)), proRot = LEN.map(() => rnd() * Math.PI);
  LEN.forEach((L, i) => { const m = mat(COLS[i]); chromatids.push([-1, 1].map((side) => { const c = makeChromatid(K, lv, L, m, cenMat, kinMat, side); g.add(c); return c; })); });
  /* centrioles (two pairs) and the mitotic spindle */
  const cenRods = rods(mat(COL.centriole), 4, 0.13);
  add(g, lv, 'centrioles', cenRods);
  const spindle = rods(mat(COL.mt, { opacity: 0.85 }), 44, 0.035);
  add(g, lv, 'spindle', spindle);
  const astral = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * 2 * Math.PI; return V(0, Math.cos(a), Math.sin(a) * 0.6); });
  const polar = Array.from({ length: 6 }, (_, i) => V(0, (i - 2.5) * 0.7, ((i % 2) - 0.5) * 0.8));
  const P0 = V(0, 4.6, 1.5);
  const st = { pole: 5.8, cx: 0, kin: [], pair2: 0, cenPos: [P0, P0] };

  const place = (s) => {
    const k = Math.min(6, Math.floor(s)), f = s - k;
    const at = (id) => (k > id ? 1 : k < id ? 0 : f);
    const pro = at(2), meta = at(3), ana = at(4), telo = at(5), cyto = at(6);
    /* the cell's outline */
    let Rm = R, d = 0, pinch = 0;
    if (k >= 4) d = mix(0, 1.2, ana) * 0.5;
    if (k >= 5) { d = mix(0.6, 1.2, telo); pinch = mix(0, 0.25, telo); }
    if (k >= 6) { Rm = mix(R, 6.2, cyto); d = mix(1.2, 6.6, cyto); pinch = mix(0.25, 1, cyto); }
    regeo(mem, peanut(Rm, d, pinch));
    const split = k >= 6 && f > 0.85;
    show(lv, 'membrane', split ? 0 : 1); show(lv, 'daughters', split ? 1 : 0);
    st.cx = k >= 6 ? mix(4.6, 6.6, cyto) : 4.6;
    st.pole = k >= 6 ? st.cx + 2.4 : k >= 5 ? 5.8 + 1.2 * telo : 5.8;
    /* envelope and chromatin */
    env0.visible = k < 3; envD.forEach((e, i) => { e.visible = k >= 5; e.position.set((i ? 1 : -1) * st.cx, 0, 0); });
    show(lv, 'envelope', k < 2 ? 1 : k < 3 ? 1 - span(f, 0.2, 0.8) : k < 5 ? 0 : k < 6 ? span(f, 0.4, 1) : 1);
    env0.visible = k < 3; envD.forEach((e) => { e.visible = k >= 5; });
    chromA.visible = k < 3; chromB.visible = k < 3; chromD.forEach((c, i) => { c.visible = k >= 5; c.position.set((i ? 1 : -1) * st.cx, 0, 0); });
    chromB.scale.setScalar(k === 0 ? 0.001 : k === 1 ? Math.max(0.001, f) : 1);
    chromB.position.set(0.25, 0.2, 0);
    show(lv, 'chromatin', k < 2 ? 1 : k < 3 ? 1 - span(f, 0, 0.6) : k < 5 ? 0 : k < 6 ? span(f, 0.5, 1) : 1);
    /* chromosomes */
    const cond = k < 2 ? 0 : k === 2 ? span(f, 0.1, 0.7) : k < 5 ? 1 : k === 5 ? 1 - span(f, 0.4, 1) : 0;
    for (const p of ['sisters', 'centromere', 'kinetochore']) show(lv, p, cond);
    st.kin = [];
    LEN.forEach((L, i) => {
      const plate = V(0, PLATE[i], (i % 2 ? 0.4 : -0.4));
      let centre = proPos[i].clone(), rot = proRot[i] * (1 - span(meta, 0, 0.6));
      if (k >= 3) centre = proPos[i].clone().lerp(plate, k > 3 ? 1 : span(f, 0, 0.6));
      chromatids[i].forEach((c, ci) => {
        const sgn = ci ? 1 : -1;
        let x = centre.x + sgn * 0.3, y = centre.y, z = centre.z;
        if (k >= 4) x = sgn * mix(0.3, st.pole - 1.2, k > 4 ? 1 : span(ana, 0, 1));
        if (k >= 5) { x = sgn * (st.pole - 1.2); y = PLATE[i] * mix(1, 0.45, telo); }
        c.position.set(x, y, z); c.rotation.set(0, 0, rot);
        c.scale.setScalar(k === 2 ? mix(0.4, 1, span(f, 0.1, 0.7)) : 1);
        st.kin.push({ side: sgn, p: V(x + sgn * 0.3, y, z) });
      });
    });
    /* centrosomes: one pair, duplicated with the DNA, moving to the poles */
    st.pair2 = k === 0 ? 0 : k === 1 ? span(f, 0.3, 1) : 1;
    const toPole = k < 2 ? 0 : k === 2 ? span(f, 0, 0.8) : 1;
    const c0 = P0.clone().lerp(V(-st.pole, 0, 0), toPole), c1 = P0.clone().add(V(0.7, 0, 0)).lerp(V(st.pole, 0, 0), toPole);
    st.cenPos = [c0, c1];
    [c0, c1].forEach((c, i) => {
      if (i === 1 && st.pair2 < 0.05) { cenRods.userData.hide(2); cenRods.userData.hide(3); return; }
      cenRods.userData.set(2 * i, c.clone().add(V(0, -0.28, 0)), c.clone().add(V(0, 0.28, 0)), 0.13);
      cenRods.userData.set(2 * i + 1, c.clone().add(V(0.12, 0, -0.28)), c.clone().add(V(0.12, 0, 0.28)), 0.13);
    });
    cenRods.userData.commit();
    show(lv, 'centrioles', 1);
    /* the spindle: astral and polar microtubules from prophase, kinetochore ones from metaphase */
    const sp = k < 2 ? 0 : k === 2 ? span(f, 0.3, 1) : k < 5 ? 1 : k === 5 ? 1 - span(f, 0, 0.7) : 0;
    show(lv, 'spindle', sp);
    let r = 0;
    [c0, c1].forEach((pole, pi) => {
      const toward = pi ? -1 : 1;
      for (const a of astral) spindle.userData.set(r++, pole, pole.clone().add(V(-toward * 0.9, a.y * 1.6, a.z * 1.6)));
      for (const q of polar) spindle.userData.set(r++, pole, V(toward * 1.2 * (k >= 4 ? 1 + ana : 1), q.y, q.z));
      for (const kk of st.kin.filter((x) => x.side === (pi ? 1 : -1))) { if (k >= 3) spindle.userData.set(r++, pole, kk.p); else spindle.userData.hide(r++); }
    });
    while (r < 44) spindle.userData.hide(r++);
    spindle.userData.commit();
  };
  anchor(lv, 'membrane', () => V(0, 7.6, 2.2));
  anchor(lv, 'daughters', () => V(6.6, 6.0, 1.2));
  anchor(lv, 'envelope', () => (env0.visible ? V(0, 3.4, 0) : V(st.cx, 2.2, 0)));
  anchor(lv, 'chromatin', () => (chromA.visible ? V(0.6, 0.9, 0.6) : V(st.cx, 0.6, 0.6)));
  anchor(lv, 'sisters', () => chromatids[0][0].position.clone().add(V(0, 1.1, 0.3)));
  anchor(lv, 'centromere', () => chromatids[3][1].position.clone().add(V(0, 0, 0.35)));
  anchor(lv, 'kinetochore', () => (st.kin[1] ? st.kin[1].p.clone().add(V(0.15, 0, 0)) : V()));
  anchor(lv, 'centrioles', () => st.cenPos[0].clone().add(V(0, 0.4, 0)));
  anchor(lv, 'spindle', () => st.cenPos[1].clone().lerp(V(0, 0.6, 0), 0.45));
  /* The drawing has one interphase step before DNA replication; the slider has G1, S and G2. G2 holds the end of S,
     and mitosis on is one step later. The model (cell/models/cycle.glb) shows the three phases themselves. */
  stageFns[lv] = (s) => place(s < 2 ? s : s < 3 ? 1.999 : s - 1);
}

/* ---------------------------------------------------------------- meiosis ---- */
function buildMeiosis(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, show, rods, peanut, regeo, sphere } = K;
  const lv = 'meiosis', g = level(lv), rnd = rand(41), R = 5;
  const m1 = mat(COL.membrane, { opacity: 0.3, side: THREE.DoubleSide }), m2 = mat(0xf2b5d4, { opacity: 0.3, side: THREE.DoubleSide }), m3 = mat(0xcdb4db, { opacity: 0.34, side: THREE.DoubleSide });
  const primary = add(g, lv, 'primary', new THREE.Mesh(peanut(R, 0, 0), m1), { shell: true });
  const CX = 4.6, CY = 3.4;
  const secondary = [-1, 1].map((sgn) => { const m = add(g, lv, 'secondary', new THREE.Mesh(peanut(3.9, 0, 0, 'y'), m2), { shell: true }); m.position.x = sgn * CX; return m; });
  const spermatids = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) spermatids.push(add(g, lv, 'spermatids', sphere(3.0, m3, V(sx * CX, sy * CY, 0), [32, 22]), { shell: true }));
  /* two pairs of chromosomes (a long and a short); a pair's two members drawn in different colours, unlabelled */
  const DEF = [{ L: 2.2, c: 0xe63946, pair: 0, side: -1 }, { L: 2.2, c: 0x457b9d, pair: 0, side: 1 }, { L: 1.5, c: 0xf4a261, pair: 1, side: -1 }, { L: 1.5, c: 0x2a9d8f, pair: 1, side: 1 }];
  const cenMat = mat(0x3d0e61);
  const chroms = DEF.map((d) => { const m = mat(d.c); return [-1, 1].map((sd) => { const c = makeChromatid(K, lv, d.L, m, cenMat, null, sd, 'sisters'); g.add(c); return c; }); });
  const start = DEF.map(() => V((rnd() - 0.5) * 4, (rnd() - 0.5) * 4, (rnd() - 0.5) * 1.5));
  const cRods = rods(mat(COL.centriole), 8, 0.12);
  add(g, lv, 'centrioles', cRods);
  let firstCen = V();
  const place = (s) => {
    const k = Math.min(4, Math.floor(s)), f = s - k;
    const at = (id) => (k > id ? 1 : k < id ? 0 : f);
    const mI = at(1), mII = at(3);
    /* cells */
    regeo(primary, peanut(mix(R, 3.9, span(mI, 0.5, 1)), mix(0, CX, span(mI, 0.5, 1)), span(mI, 0.5, 1)));
    for (const m of secondary) regeo(m, peanut(mix(3.9, 3.0, span(mII, 0.45, 1)), mix(0, CY, span(mII, 0.45, 1)), span(mII, 0.45, 1), 'y'));
    show(lv, 'primary', s < 1.95 ? 1 : 0);
    show(lv, 'secondary', s >= 1.95 && s < 3.95 ? 1 : 0);
    show(lv, 'spermatids', s >= 3.95 ? 1 : 0);
    /* chromosomes */
    DEF.forEach((d, i) => {
      const y = d.pair ? -1.3 : 1.3, cellX = d.side * CX;
      let centre = start[i].clone(), theta = 0, sep = 0.28;
      if (k >= 1) {
        const plate = V(d.side * 0.55, y, 0), there = V(cellX, d.pair ? -1.0 : 1.0, 0);
        centre = start[i].clone().lerp(plate, span(mI, 0, 0.35)).lerp(there, span(mI, 0.35, 1));
      }
      if (k >= 3) {
        const plateII = V(cellX + (d.pair ? 0.8 : -0.8), 0, 0);
        centre = centre.clone().lerp(plateII, span(mII, 0, 0.3));
        theta = (Math.PI / 2) * span(mII, 0, 0.3);
        sep = mix(0.28, CY, span(mII, 0.3, 0.8));
      }
      chroms[i].forEach((c, ci) => {
        const sgn = ci ? 1 : -1, off = V(sgn * sep, 0, 0).applyAxisAngle(V(0, 0, 1), theta);
        c.position.copy(centre).add(off); c.rotation.set(0, 0, theta);
      });
    });
    /* centrioles at the poles while a cell divides */
    let r = 0;
    const pairAt = (p) => { cRods.userData.set(r++, p.clone().add(V(0, -0.25, 0)), p.clone().add(V(0, 0.25, 0))); cRods.userData.set(r++, p.clone().add(V(0.1, 0, -0.25)), p.clone().add(V(0.1, 0, 0.25))); };
    if (k === 1) { pairAt(V(-mix(3.8, CX + 2.2, span(mI, 0.4, 1)), 0, 0)); pairAt(V(mix(3.8, CX + 2.2, span(mI, 0.4, 1)), 0, 0)); firstCen = V(-3.8, 0.5, 0); }
    if (k === 3) for (const sx of [-1, 1]) for (const sy of [-1, 1]) pairAt(V(sx * CX, sy * mix(3.0, CY + 1.6, span(mII, 0.4, 1)), 0));
    if (k === 3) firstCen = V(-CX, 3.4, 0);
    while (r < 8) cRods.userData.hide(r++);
    cRods.userData.commit();
    show(lv, 'centrioles', k === 1 || k === 3 ? 1 : 0);
    show(lv, 'sisters', 1);
  };
  anchor(lv, 'primary', V(0, 4.8, 1.2));
  anchor(lv, 'secondary', V(-CX, 3.8, 0.8));
  anchor(lv, 'spermatids', V(-CX, CY + 2.9, 0.6));
  anchor(lv, 'sisters', () => chroms[0][0].position.clone().add(V(0, 0.9, 0.35)));
  anchor(lv, 'centrioles', () => firstCen);
  stageFns[lv] = (s) => place(s);
}

/* ---------------------------------------------------- protein synthesis, and a hormone signal ---- */
function buildExpression(K, stageFns) {
  const { THREE, V, mat, level, add, anchor, show, tube, rods, instanced, sphere, regeo } = K;
  const lv = 'expression', g = level(lv);
  /* nuclear envelope: a double wall at x = -2 with one pore */
  const envMat = mat(COL.envelope, { opacity: 0.5, side: THREE.DoubleSide });
  const slab = (w, h, d, x, y, z) => { const m = new THREE.Mesh(K.keep(new THREE.BoxGeometry(w, h, d)), envMat); m.position.set(x, y, z); return m; };
  for (const x of [-2.3, -1.7]) {
    add(g, lv, 'envelope', slab(0.22, 5.8, 12, x, 5.1, 0), { shell: true });
    add(g, lv, 'envelope', slab(0.22, 8.8, 12, x, -3.6, 0), { shell: true });
    add(g, lv, 'envelope', slab(0.22, 1.4, 5.3, x, 1.5, 3.35), { shell: true });
    add(g, lv, 'envelope', slab(0.22, 1.4, 5.3, x, 1.5, -3.35), { shell: true });
  }
  anchor(lv, 'envelope', V(-2, 6.5, 3));
  const pore = new THREE.Mesh(K.keep(new THREE.TorusGeometry(0.85, 0.3, 10, 24)), mat(0x3c2f80)); pore.rotation.y = Math.PI / 2; pore.position.set(-2, 1.5, 0);
  add(g, lv, 'pores', pore);
  anchor(lv, 'pores', V(-2, 2.6, 0));
  /* the DNA: a double helix along x, with the hormone response element, the promoter and the gene marked */
  const helix = (x0, x1, ph) => { const pts = []; for (let x = x0; x <= x1 + 1e-6; x += 0.12) { const a = x * 2 * Math.PI / 3.4 + ph; pts.push(V(x, -3 + 0.5 * Math.sin(a), 0.5 * Math.cos(a))); } return pts; };
  const dMat = mat(COL.dna, { rough: 0.4 });
  g.add(tube(helix(-13, -3.2, 0), 0.08, dMat, 300)); g.add(tube(helix(-13, -3.2, 2.4), 0.08, dMat, 300));
  const rung = rods(mat(0x9aa5b1), 30, 0.05);
  for (let i = 0; i < 30; i++) { const x = -13 + i * 0.34, a = x * 2 * Math.PI / 3.4; rung.userData.set(i, V(x, -3 + 0.5 * Math.sin(a), 0.5 * Math.cos(a)), V(x, -3 + 0.5 * Math.sin(a + 2.4), 0.5 * Math.cos(a + 2.4))); }
  rung.userData.commit(); g.add(rung);
  const sleeve = (x0, x1, colour, part, op = 0.4) => { const m = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(0.72, 0.72, x1 - x0, 20, 1, true)), mat(colour, { opacity: op, side: THREE.DoubleSide })); m.rotation.z = Math.PI / 2; m.position.set((x0 + x1) / 2, -3, 0); return add(g, lv, part, m); };
  sleeve(-10.7, -10.0, 0xff8fab, 'hre', 0.55);
  sleeve(-9.9, -8.9, 0x80ed99, 'promoter', 0.5);
  sleeve(-8.8, -4.2, COL.gene, 'gene', 0.35);
  anchor(lv, 'hre', V(-10.35, -2.1, 0.7)); anchor(lv, 'promoter', V(-9.4, -2.1, 0.7)); anchor(lv, 'gene', V(-6.5, -2.1, 0.8));
  /* nucleosomes on the DNA; the two on the gene slide off at gene activation (uncoiling DNA to use it) */
  const bead = K.keep(new THREE.CylinderGeometry(0.95, 0.95, 0.9, 20)), bMat = mat(0xf4a261);
  const beads = [-12, -7.5, -5.2].map((x) => { const b = new THREE.Mesh(bead, bMat); b.position.set(x, -3, 0); b.rotation.z = Math.PI / 2; g.add(b); return b; });
  /* RNA polymerase, the mRNA it makes, and the way out */
  const pol = add(g, lv, 'polymerase', sphere(1, mat(0x06d6a0), V(-9.3, 0.2, 1.8)));
  pol.scale.set(1.05, 0.85, 0.85);
  const mrnaMat = mat(0xef476f, { rough: 0.45 });
  const mrna = add(g, lv, 'mrna', tube([V(0, 0, 0), V(0.1, 0, 0)], 0.13, mrnaMat, 8));
  const track = new THREE.CatmullRomCurve3([V(-5, -1.6, 0.4), V(-3.6, 0.6, 0), V(-2, 1.5, 0), V(0.4, 1.4, 0), V(2.2, -0.6, 0), V(3.6, -1.35, 0), V(10, -1.35, 0)]);
  const TL = track.getLength(), M = 40, STEP = 0.22;
  /* rough ER below, studded with ribosomes; one ribosome translates the mRNA */
  const er = new THREE.Mesh(K.keep(new THREE.BoxGeometry(10, 1.2, 8)), mat(COL.rer, { opacity: 0.45 }));
  er.position.set(5.5, -2.4, 0); add(g, lv, 'rer', er, { shell: true });
  add(g, lv, 'rer', instanced(K.lowSphere, mat(COL.ribo), 40, (i, d) => { d.position.set(1 + (i % 10) * 0.95, -1.7, -3.4 + Math.floor(i / 10) * 1.9 + (i % 3) * 0.2); d.scale.setScalar(0.22); }));
  anchor(lv, 'rer', V(2, -1.9, 3.6));
  const ribo = new THREE.Group(); g.add(ribo);
  ribo.add(K.tag(lv, 'ribosome', sphere(0.62, mat(0x415a77), V(0, 0.15, 0))), K.tag(lv, 'ribosome', sphere(0.42, mat(0x778da9), V(0, 0.9, 0))));
  const trna = rods(mat(0xb5838d), 6, 0.08); add(g, lv, 'trna', trna);
  const chain = instanced(K.lowSphere, mat(0xffd166), 24, (i, d) => d.scale.setScalar(0.001)); add(g, lv, 'chain', chain);
  /* Golgi apparatus (drawn, unlabelled here), where processing ends */
  const gMat = mat(COL.golgi);
  for (let k = 0; k < 4; k++) { const c = new THREE.Mesh(K.keep(new THREE.CylinderGeometry(1.6 - 0.2 * k, 1.6 - 0.2 * k, 0.18, 24)), gMat); c.position.set(8, -5 - k * 0.38, 0); g.add(c); }
  /* plasma membrane on the right, extracellular fluid beyond it */
  add(g, lv, 'membrane', new THREE.Mesh(K.keep(new THREE.BoxGeometry(0.6, 16, 12)), mat(COL.membrane, { opacity: 0.45 })), { shell: true }).position.set(11.5, 0, 0);
  anchor(lv, 'membrane', V(11.5, 6.5, 3));
  /* lipophilic hormone: carried in blood, through the membrane, to a nuclear hormone receptor, to the DNA */
  const carrier = add(g, lv, 'carrier', sphere(0.8, mat(0x8d99ae), V(14.6, 4, 0)));
  const lipo = add(g, lv, 'lipo', sphere(0.34, mat(0xffd60a), V(14.6, 4.75, 0)));
  const nhr = add(g, lv, 'nreceptor', sphere(0.7, mat(0xff8fab), V(5, 3.5, 1.5)));
  /* hydrophilic hormone: a G-protein coupled receptor, a G-protein subunit, adenylate cyclase, cAMP, protein kinase, CREB */
  const hydro = add(g, lv, 'hydro', sphere(0.4, mat(0x4cc9f0), V(14.6, -2.5, 2)));
  const gpcr = rods(mat(0x4361ee), 7, 0.17), acR = rods(mat(0x7209b7), 6, 0.2);
  for (let i = 0; i < 7; i++) { const a = i * 2 * Math.PI / 7; gpcr.userData.set(i, V(10.9, -2.5 + 0.48 * Math.cos(a), 2 + 0.48 * Math.sin(a)), V(12.1, -2.5 + 0.48 * Math.cos(a), 2 + 0.48 * Math.sin(a))); }
  for (let i = 0; i < 6; i++) { const a = i * 2 * Math.PI / 6; acR.userData.set(i, V(10.9, -5.8 + 0.45 * Math.cos(a), -1 + 0.45 * Math.sin(a)), V(12.1, -5.8 + 0.45 * Math.cos(a), -1 + 0.45 * Math.sin(a))); }
  gpcr.userData.commit(); acR.userData.commit();
  add(g, lv, 'gpcr', gpcr); add(g, lv, 'ac', acR);
  anchor(lv, 'gpcr', V(11.5, -1.6, 2.5)); anchor(lv, 'ac', V(11.5, -4.9, -1));
  const gp = add(g, lv, 'gprotein', sphere(0.34, mat(0xb5179e), V(10.5, -2.5, 2)));
  const campPts = Array.from({ length: 14 }, (_, i) => V(Math.cos(i * 2.4), Math.sin(i * 1.7), Math.sin(i * 3.1)).normalize());
  const camp = instanced(K.lowSphere, mat(0xf72585), 14, (i, d) => d.scale.setScalar(0.001)); add(g, lv, 'camp', camp);
  const kinase = add(g, lv, 'kinase', sphere(0.7, mat(0xffb703), V(7, -5.2, 1.5)));
  const creb = add(g, lv, 'creb', sphere(0.55, mat(0xfb5607), V(-6, 1, 1)));
  const dummy = new THREE.Object3D();
  const st = { mrnaMid: V(), chainMid: V(), camp: V(9.3, -5.8, -1) };

  const path = (pts, t) => { const n = pts.length - 1, u = clamp01(t) * n, i = Math.min(n - 1, Math.floor(u)); return pts[i].clone().lerp(pts[i + 1], u - i); };
  stageFns[lv] = (s, signal) => {
    const list = stagesFor('expression', signal), k = Math.min(list.length - 1, Math.floor(s)), f = s - k;
    const idx = (id) => list.findIndex((x) => x.id === id);
    const prog = (id) => { const i = idx(id); return i < 0 ? 0 : k > i ? 1 : k < i ? 0 : f; };
    const lipoOn = signal === 'lipophilic', hydroOn = signal === 'hydrophilic';
    for (const p of ['lipo', 'carrier', 'nreceptor', 'hre']) show(lv, p, lipoOn ? 1 : 0);
    for (const p of ['hydro', 'gpcr', 'gprotein', 'ac', 'camp', 'kinase', 'creb']) show(lv, p, hydroOn ? 1 : 0);
    /* lipophilic: off the carrier, through the membrane, onto the receptor; together through the pore to the DNA */
    if (lipoOn) {
      const a = prog('lipo_enter'), b = prog('lipo_bind');
      const h = path([V(14.6, 4.75, 0), V(13.4, 4.4, 0), V(9.6, 3.9, 0.8), V(5, 4.15, 1.5)], a);
      const r0 = V(5, 3.5, 1.5), rr = path([r0, V(-0.4, 1.5, 0), V(-3.6, 1.5, 0), V(-10.35, -2.0, 0.2)], b);
      nhr.position.copy(rr); lipo.position.copy(b > 0 ? rr.clone().add(V(0, 0.65, 0)) : h);
    }
    /* hydrophilic: hormone binds, a G-protein subunit leaves for adenylate cyclase, cAMP, kinase, CREB to the DNA */
    if (hydroOn) {
      const a = prog('hydro_bind'), c = prog('hydro_camp'), d = prog('hydro_creb');
      hydro.position.copy(V(14.6, -2.5, 2).lerp(V(12.45, -2.5, 2), span(a, 0, 0.5)));
      gp.position.copy(V(10.5, -2.5, 2).lerp(V(10.5, -5.4, -1), span(a, 0.5, 1)));
      show(lv, 'camp', c > 0.02 ? 1 : 0);
      for (let i = 0; i < 14; i++) { dummy.position.copy(st.camp).addScaledVector(campPts[i], 0.4 + 2.6 * c * ((i % 4) + 1) / 4).add(V(-1.6 * c, 0.4 * c, 0)); dummy.scale.setScalar(c > 0.02 ? 0.2 : 0.001); dummy.updateMatrix(); camp.setMatrixAt(i, dummy.matrix); }
      camp.instanceMatrix.needsUpdate = true; camp.computeBoundingSphere();
      kinase.position.copy(path([V(7, -5.2, 1.5), V(2, 0.5, 0.6), V(-0.4, 1.5, 0), V(-3.8, 1.2, 0.8)], span(d, 0, 0.6)));
      creb.position.copy(V(-6, 1, 1).lerp(V(-9.5, -2.0, 0.6), span(d, 0.5, 1)));
    }
    /* gene activation: the nucleosomes on the gene uncoil; the polymerase finds the promoter */
    const act = prog('activation'), tr = prog('transcription'), ex = prog('export'), tl = prog('translation'), pr = prog('processing');
    beads.forEach((b, i) => { if (i === 0) return; b.position.y = -3 + 2.6 * act; b.scale.setScalar(Math.max(0.001, 1 - act)); b.visible = act < 0.99; });
    const polAt = V(-9.3, 0.2, 1.8).lerp(V(-9.3, -3, 0), span(act, 0.4, 1)).lerp(V(-4.4, -3, 0), tr).lerp(V(-4.6, -0.6, 2.2), span(ex, 0, 0.4));
    pol.position.copy(polAt);
    /* the mRNA: grows behind the polymerase, then runs along its track through the pore to the ER */
    show(lv, 'mrna', tr > 0.02 ? 1 : 0);
    if (tr <= 0.02) st.mrnaPts = null;
    if (tr > 0.02) {
      const nPts = Math.max(3, Math.round(M * tr)), made = [];
      const from = V(-9.3, -3, 0).lerp(V(-4.4, -3, 0), tr).add(V(0, 0.9, 0));
      for (let j = 0; j < nPts; j++) made.push(from.clone().add(V(-0.16 * j, 0.1 * j + 0.3 * Math.sin(j * 0.6), 0.3 * Math.cos(j * 0.5))));
      let pts = made;
      if (ex > 0 || tl > 0 || pr > 0) {
        const w = mix(0, TL - M * STEP, span(ex, 0.2, 1));
        const onTrack = Array.from({ length: M }, (_, j) => track.getPointAt(clamp01((w + (M - 1 - j) * STEP) / TL)));
        const blend = span(ex, 0, 0.3);
        pts = onTrack.map((p, j) => (made[j] || made[made.length - 1]).clone().lerp(p, blend));
      }
      regeo(mrna, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), pts.length * 3, 0.13, 6, false));
      st.mrnaMid = pts[Math.floor(pts.length / 2)].clone();
      st.mrnaPts = pts;
    }
    /* translation: a ribosome on the ER reads the mRNA; tRNAs bring amino acids; the chain grows into the ER */
    show(lv, 'ribosome', ex > 0.95 || tl > 0 || pr > 0 ? 1 : 0);
    show(lv, 'trna', tl > 0 && tl < 1 ? 1 : 0);
    show(lv, 'chain', tl > 0.04 ? 1 : 0);
    const onEr = st.mrnaPts && ex > 0.95 ? st.mrnaPts : null;
    const rp = onEr ? onEr[Math.min(onEr.length - 1, Math.max(0, Math.round((M - 6) * (1 - tl))))].clone() : V(9, -1.35, 0);
    rp.y = -1.35 + 0.55;
    ribo.position.copy(rp);
    for (let i = 0; i < 3; i++) {
      const ph = (tl * 5 + i / 3) % 1, top = rp.clone().add(V(0.3 * (i - 1), 3.4 - 2.3 * ph, 0.9));
      trna.userData.set(2 * i, top, top.clone().add(V(0, -0.6, 0))); trna.userData.set(2 * i + 1, top, top.clone().add(V(0.45, 0.1, 0)));
    }
    trna.userData.commit();
    const nBeads = Math.round(24 * tl), fold = V(6.5, -2.4, 0).lerp(V(8, -4.2, 0), span(pr, 0.5, 1));
    for (let b = 0; b < 24; b++) {
      const free = rp.clone().add(V(-0.25 * b, -1.15 - 0.22 * Math.sin(b * 0.9), 0.3 * Math.cos(b * 0.7)));
      const ball = fold.clone().add(V(Math.sin(b * 2.1), Math.cos(b * 1.3), Math.sin(b * 0.7)).multiplyScalar(0.45));
      dummy.position.copy(free.lerp(ball, span(pr, 0, 0.5))); dummy.scale.setScalar(b < nBeads ? 0.17 : 0.001); dummy.updateMatrix(); chain.setMatrixAt(b, dummy.matrix);
      if (b === Math.floor(nBeads / 2)) st.chainMid = dummy.position.clone();
    }
    chain.instanceMatrix.needsUpdate = true; chain.computeBoundingSphere();
  };
  anchor(lv, 'polymerase', () => pol.position.clone().add(V(0, 0.9, 0)));
  anchor(lv, 'mrna', () => st.mrnaMid);
  anchor(lv, 'ribosome', () => ribo.position.clone().add(V(0, 1.3, 0)));
  anchor(lv, 'trna', () => ribo.position.clone().add(V(0, 2.6, 0.9)));
  anchor(lv, 'chain', () => st.chainMid);
  anchor(lv, 'lipo', () => lipo.position);
  anchor(lv, 'carrier', () => carrier.position.clone().add(V(0, -0.8, 0)));
  anchor(lv, 'nreceptor', () => nhr.position.clone().add(V(0, -0.7, 0)));
  anchor(lv, 'hydro', () => hydro.position.clone().add(V(0, 0.4, 0)));
  anchor(lv, 'gprotein', () => gp.position);
  anchor(lv, 'camp', () => st.camp.clone().add(V(-1.4, 0.6, 0)));
  anchor(lv, 'kinase', () => kinase.position);
  anchor(lv, 'creb', () => creb.position);
}

export function createCellZoom(THREE) {
  const root = new THREE.Group();
  root.name = 'cellZoom';
  const K = makeKit(THREE, root);
  const stageFns = {}, tickFns = {};
  buildCell(K); buildCentrosome(K); buildNucleus(K); buildDna(K, stageFns); buildNucleosome(K);
  buildCycle(K, stageFns); buildMeiosis(K, stageFns); buildExpression(K, stageFns);
  buildLectureCells(K, stageFns, tickFns);
  for (const lv of MODEL_ONLY) K.level(lv);
  for (const lv of Object.keys(stageFns)) stageFns[lv](0, 'none');
  let current = null;
  /* level -> 'loading' | 'ready'; the scene extras of a level wearing its model */
  const models = {}, extras = {};
  return {
    root, levels: K.levels, PARTS,
    show(id) { current = id; for (const [k, grp] of Object.entries(K.levels)) grp.visible = k === id; },
    setStage(lv, s, signal = 'none') { if (stageFns[lv]) stageFns[lv](s, signal); },
    hasStage: (lv) => !!stageFns[lv],
    /* the level's model (cell/models.js): null if it has none */
    modelFor: (lv) => MODELS[lv] || null,
    modelReady: (lv) => models[lv] === 'ready',
    viewOf: (lv) => (extras[lv] && extras[lv].czView) || null,
    /* load(url) -> a GLTFLoader result; resolves true once the level wears its model */
    async loadModel(lv, load) {
      if (!MODELS[lv]) return false;
      if (models[lv]) return models[lv] === 'ready';
      models[lv] = 'loading';
      try {
        const gltf = await load(MODELS[lv].file);
        extras[lv] = attachModel(THREE, K, lv, gltf, stageFns, tickFns);
        models[lv] = 'ready';
        return true;
      } catch (error) { delete models[lv]; throw error; }
    },
    meshesOf: (lv, part) => (K.parts[lv] && K.parts[lv][part]) || [],
    /* what a tap can hit: meshes on show, not the see-through ones flagged noPick */
    pickables: (lv) => Object.values(K.parts[lv] || {}).flat().filter((o) => o.isMesh && o.visible && !o.userData.noPick),
    visibleParts: (lv) => new Set(Object.entries(K.presence[lv] || {}).filter(([, a]) => a > 0.15).map(([p]) => p)),
    /* label anchors in world space, for the HTML tags; only parts on show */
    anchors(lv) {
      root.updateMatrixWorld(true);
      return Object.entries(K.anchorFns[lv] || {}).filter(([id]) => (K.presence[lv][id] ?? 1) > 0.15).map(([id, fn]) => ({ id, pos: fn().clone().applyMatrix4(K.levels[lv].matrixWorld) }));
    },
    /* the level's extent; for an animated model, over its whole timeline (a part scaled away at one stage is the
       part the camera must leave room for at another), the stage it shows put back after */
    box(lv) {
      root.updateMatrixWorld(true);
      const e = extras[lv], g = K.levels[lv];
      if (!e || !e.action) {
        const b = new THREE.Box3().setFromObject(g);
        return b.isEmpty() ? new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(), new THREE.Vector3(1, 1, 1).multiplyScalar(MODEL_ONLY_EXTENT * 2)).applyMatrix4(g.matrixWorld) : b;
      }
      const b = new THREE.Box3(), was = e.action.time, d = e.action.getClip().duration;
      for (const k of [0, 0.25, 0.5, 0.75, 1]) { e.action.time = k * d; e.mixer.update(0); root.updateMatrixWorld(true); b.union(new THREE.Box3().setFromObject(g)); }
      e.action.time = was; e.mixer.update(0); root.updateMatrixWorld(true);
      return b;
    },
    update(t, still) { if (current && tickFns[current] && !still) tickFns[current](t); },
    dispose() {
      root.removeFromParent();
      for (const lv of Object.keys(extras)) if (extras[lv].mixer) extras[lv].mixer.stopAllAction();
      root.traverse((o) => {
        if (o.geometry && !K.disposables.includes(o.geometry)) o.geometry.dispose();
        for (const m of [].concat(o.material || [])) if (!K.disposables.includes(m)) { for (const k of ['map', 'normalMap']) if (m[k]) m[k].dispose(); m.dispose(); }
      });
      for (const x of K.disposables) x.dispose && x.dispose();
    },
  };
}
