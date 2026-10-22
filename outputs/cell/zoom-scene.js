/*
 * Cell zoom — the scene: one empty group per level, which the level's Blender model (cell/models.js) fills when it
 * has loaded. Nothing is drawn in code (CLAUDE.md: no code-drawn 3D); until a model arrives its level is empty and
 * the viewer says "Loading the 3D model…". The models are built offline by work/build-cell-models.mjs from the parts
 * named here; the shared helpers are cell/kit.js.
 *
 * three.js is passed in (state.THREE), so PARTS can be read in Node without it. Nothing runs at module scope.
 */
import { makeKit } from './kit.js?v=1';
import { MODELS, attachModel } from './models.js?v=1';

/* Which labelled part each level has; work/cell-zoom-check.mjs holds this to outputs/cell-zoom.js and to each .glb. */
export const PARTS = {
  cell: ['membrane', 'cytoplasm', 'nucleus', 'envelope', 'pores', 'nucleolus', 'ribosomes', 'rer', 'ser', 'golgi', 'vesicles', 'mito', 'lyso', 'peroxisomes', 'centrosome', 'centrioles', 'microtubules'],
  centrosome: ['centrosome', 'centrioles', 'triplets'],
  nucleus: ['envelope', 'pores', 'nucleoplasm', 'nucleolus', 'chromatin'],
  dna: ['nucleosome', 'chromatin', 'supercoiled', 'chromosome', 'sisters', 'centromere', 'kinetochore'],
  nucleosome: ['histones', 'dna', 'helix', 'bases', 'gene', 'nucleosome'],
  cycle: ['membrane', 'envelope', 'chromatin', 'sisters', 'centromere', 'kinetochore', 'centrioles', 'spindle', 'daughters'],
  meiosis: ['primary', 'secondary', 'spermatids', 'sisters', 'centrioles'],
  expression: ['gene', 'promoter', 'polymerase', 'mrna', 'envelope', 'pores', 'ribosome', 'rer', 'trna', 'chain', 'membrane', 'lipo', 'carrier', 'nreceptor', 'hre', 'hydro', 'gpcr', 'gprotein', 'ac', 'camp', 'kinase', 'creb'],
  membrane: ['ecf', 'bilayer', 'heads', 'tails', 'cholesterol', 'glycolipids', 'integral', 'anchoring', 'recognition', 'enzymes', 'receptor', 'carrier', 'channels', 'microfilaments', 'cytoplasm'],
  epithelium: ['cilia', 'microvilli', 'apical', 'basolateral', 'junctions', 'basement', 'golgi', 'nucleus', 'mito'],
  blood: ['rbc', 'wbc', 'platelets', 'plasma'],
  sperm: ['head', 'acrosome', 'nucleus', 'neck', 'centrioles', 'middle', 'spiral', 'tail', 'sheath'],
  neuron: ['body', 'nucleus', 'nucleolus', 'nissl', 'neurofibrils', 'dendrites', 'hillock', 'axon', 'myelin', 'schwann', 'node', 'terminals'],
  nk: ['nkcell', 'abnormal', 'golgi', 'vesicles', 'perforin', 'pores'],
  apc: ['pathogen', 'lysosome', 'fragments', 'er', 'mhc', 'nucleus', 'membrane'],
  alveolus: ['type1', 'type2', 'surfactant', 'macrophage', 'capillary', 'endothelial', 'basement', 'membrane', 'alveolus', 'rbc'],
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
  capbed: ['arteriole', 'metart', 'sphincter', 'truecap', 'thorough', 'ava', 'venule', 'smooth'],
  stomach: ['pit', 'mucous', 'gland', 'parietal', 'chief', 'gcell', 'dcell', 'gastrin', 'somatostatin', 'pepsin', 'lamina', 'mm', 'submucosa', 'oblique', 'circular', 'longitudinal', 'externa', 'serosa', 'vessels', 'lymph', 'plexus'],
  glomerulus: ['capsule', 'glomerulus', 'fenestrated', 'podocyte', 'pedicels', 'slit', 'afferent', 'efferent', 'pct', 'filtrate', 'proteins'],
  duct: ['duct', 'aquaporins', 'adh', 'aldosterone', 'isf', 'vasa', 'h2o', 'na', 'k'],
  heartwall: ['epicardium', 'myocardium', 'endocardium', 'parietal', 'fibrous', 'cavity', 'mesothelium', 'areolar', 'endothelium', 'vessels', 'cells', 'discs', 'desmosomes', 'gap', 'nucleus', 'myofibrils'],
  osteon: ['osteon', 'canal', 'vessels', 'osteocytes', 'canaliculi', 'matrix', 'periosteum', 'fibrous', 'cellular', 'osteoblasts', 'osteoclasts', 'compact', 'spongy', 'trabeculae'],
};

/* the extent a level frames before its model arrives (the models are built to about this size) */
const MODEL_EXTENT = 11;

export function createCellZoom(THREE) {
  const root = new THREE.Group();
  root.name = 'cellZoom';
  const K = makeKit(THREE, root);
  const stageFns = {}, tickFns = {};
  for (const lv of Object.keys(PARTS)) K.level(lv);
  let current = null;
  /* level -> 'loading' | 'ready'; the scene extras of a level wearing its model */
  const models = {}, extras = {};
  /* a level stays hidden while its model is on its way, so nothing but the model is ever seen; if the download
     fails the level stays empty and the viewer says so */
  const waiting = new Set();
  const paintShown = () => { for (const [k, grp] of Object.entries(K.levels)) grp.visible = k === current && !waiting.has(k); };
  return {
    root, levels: K.levels, PARTS,
    show(id) { current = id; paintShown(); },
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
      waiting.add(lv); paintShown();
      try {
        const gltf = await load(MODELS[lv].file);
        extras[lv] = attachModel(THREE, K, lv, gltf, stageFns, tickFns);
        models[lv] = 'ready';
        return true;
      } catch (error) { delete models[lv]; throw error; }
      finally { waiting.delete(lv); paintShown(); }
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
        return b.isEmpty() ? new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(), new THREE.Vector3(1, 1, 1).multiplyScalar(MODEL_EXTENT * 2)).applyMatrix4(g.matrixWorld) : b;
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
