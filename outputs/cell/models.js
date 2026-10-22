/*
 * Cell zoom — the 3D models the levels wear, and how one is put on a level.
 *
 * Most levels are drawn procedurally first (cell/zoom-scene.js, cell/lecture-cells.js), so they open at once and
 * offline; the newer ones (zoom-scene.js MODEL_ONLY) are their model alone. Every level also has a model, outputs/cell/models/<level>.glb, built offline in Blender by
 * work/build-cell-models.mjs and work/blender/: a CC BY download wherever one exists, everything else modelled there.
 * Its nodes are the level's labelled parts (extras.czPart), already in the level's frame; a level with a stage slider
 * is animated, stage k from second k (scene extras czClips: where each signal's run starts). When it arrives,
 * attachModel() puts it on in place of the whole drawing. A .glb is cache-first in the service worker's model
 * cache, so a level seen once online keeps its model offline.
 *
 * MODEL_SOURCES credits each download (author, title, URL, licence); outputs/THIRD-PARTY-NOTICES.txt carries the
 * same, and work/cell-zoom-check.mjs holds the two together, every level to its .glb and every node of every .glb
 * to a part PARTS names.
 * three.js is passed in. Nothing runs at module scope.
 */

/* Sketchfab downloads, all CC BY 4.0. "Changed" is what work/build-cell-models.mjs did to each. */
export const MODEL_SOURCES = {
  cell: { title: 'Animal cell - Downloadable', author: 'Lauri Purhonen', url: 'https://sketchfab.com/3d-models/animal-cell-downloadable-ddc40bb0900544959f02d3ff83c32615' },
  rbc: { title: 'Red Blood Cells (Erythrocytes)', author: '_Bonehead14', url: 'https://sketchfab.com/3d-models/red-blood-cells-erythrocytes-657f7b34ab2e43878c4f366e3e940ebd' },
  lymphocyte: { title: 'Lympocyte', author: 'Vikrama Raghuraman', url: 'https://sketchfab.com/3d-models/lympocyte-f84f96cc9a9847a18e6b469eb2a81fb8' },
  platelet: { title: 'blood platelet / thrombocyte', author: 'i.isabelgordon', url: 'https://sketchfab.com/3d-models/blood-platelet-thrombocyte-08fed7ab59514804b07804e40a57ef33' },
  macrophage: { title: 'Macrophage', author: 'andrewfrueh', url: 'https://sketchfab.com/3d-models/macrophage-1aa1ce1930f54580b83d4b47f9d405c0' },
  neuron: { title: 'Neuron', author: 'Versal', url: 'https://sketchfab.com/3d-models/neuron-d40557a1e4154267b78117433bc51296' },
  sperm: { title: 'CC0 - Sperm', author: 'plaggy', url: 'https://sketchfab.com/3d-models/cc0-sperm-af340f33a8574d60a65fa008233ad934' },
  membrane: { title: 'Plasma Membrane', author: 'Konstantin_Keller', url: 'https://sketchfab.com/3d-models/plasma-membrane-53304c29aa2c41479488f06d3470c796' },
  trachea: { title: 'Epithelium of the Trachea', author: 'Sieben Medical Art', url: 'https://sketchfab.com/3d-models/epithelium-of-the-trachea-cb418d1b3f234f04bd3e17075970b222' },
  chromosome: { title: 'Chromosome X', author: 'LucasPresoto', url: 'https://sketchfab.com/3d-models/chromosome-x-4ab2fe1dfcba469097e2d0fe4a0f942b' },
  capnet: { title: 'Capillary network (毛細血管)', author: 'yanosen', url: 'https://sketchfab.com/3d-models/capillary-network-dabe5b7050494e66be33be3bb65592f0' },
  bone: { title: 'Long Bone', author: 'iqcenter', url: 'https://sketchfab.com/3d-models/long-bone-900a320bdc6244bd8f6b761441031ae9' },
};
export const MODEL_LICENCE = 'CC BY 4.0';

/* level -> its .glb (relative to the page) and the downloads in it (none: modelled whole in Blender) */
export const MODELS = {
  cell: { file: './cell/models/cell.glb', sources: ['cell'] },
  centrosome: { file: './cell/models/centrosome.glb', sources: [] },
  blood: { file: './cell/models/blood.glb', sources: ['rbc', 'lymphocyte', 'platelet'] },
  alveolus: { file: './cell/models/alveolus.glb', sources: ['macrophage'] },
  neuron: { file: './cell/models/neuron.glb', sources: ['neuron'] },
  sperm: { file: './cell/models/sperm.glb', sources: ['sperm'] },
  membrane: { file: './cell/models/membrane.glb', sources: ['membrane'] },
  epithelium: { file: './cell/models/epithelium.glb', sources: ['trachea'] },
  nucleus: { file: './cell/models/nucleus.glb', sources: [] },
  dna: { file: './cell/models/dna.glb', sources: ['chromosome'] },
  nucleosome: { file: './cell/models/nucleosome.glb', sources: [] },
  cycle: { file: './cell/models/cycle.glb', sources: ['chromosome'] },
  meiosis: { file: './cell/models/meiosis.glb', sources: ['chromosome'] },
  expression: { file: './cell/models/expression.glb', sources: [] },
  parietal: { file: './cell/models/parietal.glb', sources: [] },
  nk: { file: './cell/models/nk.glb', sources: ['lymphocyte'] },
  apc: { file: './cell/models/apc.glb', sources: ['macrophage'] },
  redcell: { file: './cell/models/redcell.glb', sources: [] },
  hemoglobin: { file: './cell/models/hemoglobin.glb', sources: [] },
  plasma: { file: './cell/models/plasma.glb', sources: [] },
  pct: { file: './cell/models/pct.glb', sources: ['rbc'] },
  pacemaker: { file: './cell/models/pacemaker.glb', sources: ['membrane'] },
  myocardial: { file: './cell/models/myocardial.glb', sources: ['membrane'] },
  rmp: { file: './cell/models/rmp.glb', sources: ['membrane'] },
  testis: { file: './cell/models/testis.glb', sources: [] },
  follicle: { file: './cell/models/follicle.glb', sources: [] },
  oogenesis: { file: './cell/models/oogenesis.glb', sources: [] },
  vessels: { file: './cell/models/vessels.glb', sources: [] },
  capillaries: { file: './cell/models/capillaries.glb', sources: [] },
  gutwall: { file: './cell/models/gutwall.glb', sources: [] },
  capbed: { file: './cell/models/capbed.glb', sources: ['capnet'] },
  stomach: { file: './cell/models/stomach.glb', sources: [] },
  glomerulus: { file: './cell/models/glomerulus.glb', sources: [] },
  duct: { file: './cell/models/duct.glb', sources: [] },
  heartwall: { file: './cell/models/heartwall.glb', sources: [] },
  osteon: { file: './cell/models/osteon.glb', sources: ['bone'] },
};

/* the credit line for a level's model */
export function modelCredit(lv) {
  const m = MODELS[lv];
  if (!m) return '';
  if (lv === 'nucleosome') return 'PDB 3AFA (CC0), modelled in Blender for this app';
  if (!m.sources.length) return 'modelled in Blender for this app';
  return m.sources.map((id) => { const s = MODEL_SOURCES[id]; return `“${s.title}” by ${s.author}`; }).join(', ') + ` (${MODEL_LICENCE}), with the rest modelled in Blender for this app`;
}

/* a node's own extras, or the nearest ancestor's (GLTFLoader makes a group of a node with several primitives) */
const extra = (o, k, stop) => { for (let x = o; x && x !== stop; x = x.parent) if (x.userData[k] != null) return x.userData[k]; return null; };

/*
 * Put a loaded model (a GLTFLoader result) on level lv of a kit K, in place of the whole drawing. Its meshes are
 * tagged with their parts (one material per part, so a highlight or a fade stays on its part); its anchor empties
 * (czAnchorOf) carry the labels, and follow what they are parented to; a still part without one uses czAnchor. If the
 * model is animated, the level's stage function becomes "set the timeline to second s" (plus the signal's offset,
 * scene extras czClips), and a part is on show while any of its meshes is scaled above 2%. Returns the scene extras.
 */
export function attachModel(THREE, K, lv, gltf, stageFns, tickFns) {
  const g = K.levels[lv], scene = gltf.scene, extras = { ...(scene.userData || {}) };
  for (const o of [...g.children]) {
    o.removeFromParent();
    o.traverse((x) => { if (x.geometry && !K.disposables.includes(x.geometry)) x.geometry.dispose(); });
  }
  K.parts[lv] = {}; K.anchorFns[lv] = {};
  for (const k of Object.keys(K.presence[lv])) delete K.presence[lv][k];
  g.add(scene);
  const seenMat = new Map(), anchors = [], firstMesh = {};
  scene.traverse((o) => {
    if (o.userData.czAnchorOf) anchors.push(o);
    if (!o.isMesh) return;
    const part = extra(o, 'czPart', g);
    if (!part) { o.userData.noPick = true; return; }
    if (seenMat.has(o.material) && seenMat.get(o.material) !== part) o.material = o.material.clone();
    seenMat.set(o.material, part);
    if (!o.material.emissive) o.material.emissive = new THREE.Color(0);
    K.tag(lv, part, o, { shell: !!extra(o, 'czShell', g) });
    if (!firstMesh[part]) firstMesh[part] = o;
  });
  const v = new THREE.Vector3(), box = new THREE.Box3();
  for (const e of anchors) K.anchor(lv, e.userData.czAnchorOf, () => g.worldToLocal(e.getWorldPosition(v).clone()));
  for (const [part, o] of Object.entries(firstMesh)) {
    if (K.anchorFns[lv][part]) continue;
    const at = extra(o, 'czAnchor', g);
    if (Array.isArray(at)) { const p = new THREE.Vector3().fromArray(at); K.anchor(lv, part, () => p); }
    else K.anchor(lv, part, () => { box.setFromObject(o); return g.worldToLocal(box.getCenter(v).setY(box.max.y).clone()); });
  }
  delete tickFns[lv];
  if (gltf.animations && gltf.animations.length) {
    const mixer = new THREE.AnimationMixer(scene), clip = gltf.animations[0], action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1); action.clampWhenFinished = true; action.play(); action.paused = true;
    const clips = extras.czClips || {};
    const scaleOf = (o) => { let s = 1; for (let x = o; x && x !== g; x = x.parent) s *= Math.max(Math.abs(x.scale.x), Math.abs(x.scale.y), Math.abs(x.scale.z)); return s; };
    stageFns[lv] = (s, signal = 'none') => {
      action.time = Math.min(clip.duration - 1e-4, Math.max(0, (clips[signal] ?? clips.none ?? 0) + s));
      mixer.update(0);
      for (const [part, objs] of Object.entries(K.parts[lv])) {
        let on = false;
        for (const o of objs) { o.visible = scaleOf(o) > 0.02; on = on || o.visible; }
        K.presence[lv][part] = on ? 1 : 0;
      }
    };
    extras.mixer = mixer; extras.action = action;
    stageFns[lv](0, 'none');
  } else delete stageFns[lv];
  return extras;
}
