/*
 * Heart atlas — BetterHeart's heart, built as one THREE.Group.
 *
 * The group is in BetterHeart's own frame (heart ~3 units across) with a
 * transform that maps it onto the explorer's dolasim.glb heart, so it is meant
 * to be a child of the circulatory layer's `root` -- see alignment.js and
 * work/heart-atlas-check.mjs. The DOM elements the factories read (ids
 * `ha-...`) must exist before createHeartAtlas() is called; studio/heart-atlas.js
 * builds them.
 *
 * Nothing here runs at module scope.
 */
import * as THREE from 'three';
import { createConduction } from './conduction.js?v=3';
import { createHeartMotion, cycleAt } from './heart-motion.js?v=26';
import { createHeartbeat } from './heartbeat.js?v=11';
import { ATLAS_SCALE, ATLAS_SHIFT } from './alignment.js?v=1';
import { DESCRIPTIONS } from './descriptions.js?v=2';
import { ECHO_VIEWS, computeEchoFrames, createEchoRenderer } from './echo-sim.js?v=17';
import { mountClinicalPanels, PANEL_SECTIONS } from './panels.js?v=1';
export { mountClinicalPanels };

export const CHAMBER_COLOURS = { RA: 0x668ea9, RV: 0x759fae, LA: 0xca998d, LV: 0xb76659 };
const COLOURS = { wall: 0xb97465, valves: 0xe7d6ac, coronary: 0xcf6651, cardiacVein: 0x6884aa, aorta: 0xc96758, cava: 0x7695b9, pa: 0x6c92ae, pv: 0xd78d7b };
const GROUP_NAMES = ['wall', 'chambers', 'valves', 'coronary', 'cardiacVein', 'aorta', 'cava', 'pa', 'pv', 'conduction'];
const GREAT = ['aorta', 'cava', 'pa', 'pv'];
export const PART_KEYS = ['RA', 'RV', 'LA', 'LV', 'TV', 'MV', 'AV', 'PV'];

/* The six teaching scenarios kept from BetterHeart's page. `opacity` is the
   wall's percent; `speed` is the cardiac clock's multiplier; `flow` turns on
   the coronary tracer and transvalvular flow; `dynamic` gives the larger
   ventricular excursion. */
export const PRESETS = {
  natural:    { label: 'Natural',         opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: false },
  chambers:   { label: 'Four chambers',   opacity: 15,  show: { wall: 1, chambers: 1, valves: 0, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false },
  coronary:   { label: 'Coronaries',      opacity: 100, show: { wall: 1, chambers: 0, valves: 0, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true  },
  dynamic:    { label: 'Heartbeat',       opacity: 22,  show: { wall: 1, chambers: 1, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true, dynamic: true },
  conduction: { label: 'Conduction & rhythms', opacity: 12,  show: { wall: 1, chambers: 0, valves: 0, coronary: 0, great: 1, conduction: 1 }, speed: 0.35, flow: false, feature: 'arrhythmia' },
  echo:       { label: 'Ultrasound',    opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false, echo: true },
  /* Clinical scenarios: `feature` names a lazily-built module (see prepare()), `section` the panel section it owns. */
  /* greatSee: great-vessel groups drawn see-through; hideGreat: groups left out; coronarySee: coronary keys drawn see-through;
     flowOnTop: tracers in these coronary keys draw over the vessel wall (the imaging catheter sits inside it). */
  hemo:       { label: 'Cath pressures', opacity: 14, show: { wall: 1, chambers: 0, valves: 1, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false, feature: 'hemo', greatSee: ['aorta', 'cava', 'pa'] },
  pci:        { label: 'PCI (right coronary)', opacity: 50, show: { wall: 1, chambers: 0, valves: 0, coronary: 1, great: 1, conduction: 0 }, speed: 1, flow: true, feature: 'pci', greatSee: ['aorta'], hideGreat: ['cava', 'pv', 'pa'], coronarySee: ['RCA', 'RPL'] },
  ivus:       { label: 'IVUS / OCT', opacity: 100, show: { wall: 1, chambers: 0, valves: 0, coronary: 1, great: 1, conduction: 0 }, speed: 1, flow: true, feature: 'ivus', greatSee: ['aorta'], coronarySee: ['LAD', 'LADS', 'LM'], flowOnTop: ['LAD', 'LM'] },
};

export async function createHeartAtlas({ base = new URL('./', import.meta.url).href, startPaused = false } = {}) {
  const [manifest, data] = await Promise.all([
    fetch(base + 'heart-manifest.json').then((r) => { if (!r.ok) throw new Error('heart manifest ' + r.status); return r.json(); }),
    fetch(base + 'heart-meshes.bin').then((r) => { if (!r.ok) throw new Error('heart meshes ' + r.status); return r.arrayBuffer(); }),
  ]);

  const group = new THREE.Group();
  group.name = 'heartAtlas';
  group.scale.setScalar(1 / ATLAS_SCALE);
  group.position.set(-ATLAS_SHIFT[0] / ATLAS_SCALE, -ATLAS_SHIFT[1] / ATLAS_SCALE, -ATLAS_SHIFT[2] / ATLAS_SCALE);
  const groups = Object.fromEntries(GROUP_NAMES.map((k) => { const g = new THREE.Group(); g.name = 'atlas-' + k; group.add(g); return [k, g]; }));

  const meshes = [];
  const byKey = {};
  for (const def of manifest.meshes) {
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(data, def.positionOffset, def.positionCount);
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(data, def.indexOffset, def.indexCount), 1));
    geometry.computeVertexNormals();
    const colour = def.key === 'PAP' ? COLOURS.wall : def.group === 'chambers' ? CHAMBER_COLOURS[def.key] : COLOURS[def.group];
    const material = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.91, metalness: 0, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    /* `rest` is the undeformed positions: heartbeat.js rewrites the live array
       every frame, and the echo frames must be computed from the rest pose. */
    mesh.userData = { ...def, atlas: true, rest: pos.slice() };
    groups[def.group].add(mesh);
    meshes.push(mesh);
    (byKey[def.key] ||= []).push(mesh);
  }

  /* Same order as BetterHeart's page: the conduction layer is built first and
     deforms through a late-bound heartbeat. */
  let heartbeat = null;
  const conduction = createConduction({ group: groups.conduction, byKey, deformPoint: (p) => (heartbeat ? heartbeat.deformPoint(p) : p) });
  meshes.push(...conduction.meshes);
  heartbeat = createHeartbeat({ meshes, startPaused });
  const parts = {};
  const motion = createHeartMotion({ scene: group, byKey, deformPoint: heartbeat.deformPoint, isPartOn: (k) => parts[k] !== false });
  meshes.push(...motion.extraMeshes);

  const S = { preset: 'natural', opacity: 100, show: { ...PRESETS.natural.show }, selected: null, active: false, last: null, beat: null };

  const shown = (m) => { for (let o = m; o && o !== group.parent; o = o.parent) if (!o.visible) return false; return true; };

  function apply() {
    const p = PRESETS[S.preset];
    const opacity = S.opacity / 100;
    motion.setInteriorHidden(!p.echo && !!S.show.wall && opacity >= 0.85);
    for (const k of ['wall', 'chambers', 'valves', 'coronary', 'conduction']) groups[k].visible = !!S.show[k] && (k !== 'wall' || opacity > 0);
    groups.cardiacVein.visible = !!S.show.coronary;
    for (const k of GREAT) groups[k].visible = !!S.show.great && !(p.hideGreat || []).includes(k);
    for (const m of meshes) {
      const g = m.userData.group, key = m.userData.key;
      m.visible = !PART_KEYS.includes(key) || parts[key] !== false;
      if (!m.material) continue;
      if (g === 'wall') {
        m.material.opacity = opacity; m.material.transparent = opacity < 1; m.material.depthWrite = opacity > 0.85;
        m.material.color.setHex(S.preset === 'chambers' ? CHAMBER_COLOURS[key] : COLOURS.wall);
      }
      if (g === 'coronary') {
        const see = (p.coronarySee || []).includes(key);
        m.renderOrder = 1; m.material.depthWrite = !p.flow; m.material.opacity = see ? 0.4 : 1; m.material.transparent = see;
      }
      if (GREAT.includes(g)) {
        const proc = (p.greatSee || []).includes(g), conduct = S.preset === 'conduction', see = conduct || proc;
        m.material.opacity = conduct ? 0.18 : proc ? 0.3 : 1; m.material.transparent = see; m.material.depthWrite = !see;
      }
      if (key === 'PAP') {
        m.material.color.setHex(COLOURS.wall);
        const cutaway = S.preset === 'dynamic';
        m.material.opacity = cutaway ? 0.78 : 1; m.material.transparent = cutaway; m.material.depthWrite = !cutaway;
      }
      if (g === 'chambers') {
        m.material.opacity = S.preset === 'chambers' ? 0.83 : S.preset === 'echo' ? 0.92 : 0.16;
        m.material.transparent = true; m.material.depthWrite = false;
      }
      m.material.needsUpdate = true;
    }
    motion.show(S.active && S.preset !== 'chambers', { flow: p.flow });
    const pf = features[p.feature];
    heartbeat.setSpeed(pf && pf.speed ? pf.speed() : p.speed);
    for (const [k, f] of Object.entries(features)) f.group.visible = S.active && PRESETS[S.preset].feature === k;
    group.traverse((o) => {
      if (o.userData.kind !== 'coronary-flow' || !o.material) return;
      const on = (p.flowOnTop || []).includes(o.userData.key);
      o.material.depthTest = !on; o.renderOrder = on ? 19.5 : 0;
    });
  }

  /* ---- Clinical scenarios ----
     Built on first use (their modules are imported then, not at atlas load). The panel section a
     scenario reads must already be in the DOM: studio/heart-atlas.js mounts heart/panels.js first. */
  const features = {};
  async function prepare(name) {
    const p = PRESETS[name];
    if (!p || !p.feature || features[p.feature]) return features[p.feature] || null;
    if (p.feature === 'hemo') {
      const [{ createHemo }, { createHemoPanel }] = await Promise.all([import('./hemo-sim.js?v=3'), import('./hemo-panel.js?v=11')]);
      if (features.hemo) return features.hemo;
      const g = new THREE.Group();
      g.name = 'atlas-hemo'; g.visible = false; group.add(g);
      const sim = createHemo({ parent: g, deformPoint: heartbeat.deformPoint, motion, byKey });
      const panel = createHemoPanel({ sim, heartbeat });
      features.hemo = { group: g, update() { sim.update(); panel.update(); }, enter() { panel.reset(); }, exit() {} };
    }
    if (p.feature === 'pci' || p.feature === 'ivus' || p.feature === 'arrhythmia') {
      const sc = await import('./scenarios.js?v=3');
      if (features[p.feature]) return features[p.feature];
      const ctx = { group, heartbeat, motion, byKey, host: () => host, onIntro: (i) => { if (onIntro) onIntro(i); } };
      features[p.feature] = p.feature === 'pci' ? await sc.createPciFeature(ctx) : p.feature === 'ivus' ? await sc.createIvusFeature(ctx) : await sc.createArrhythmiaFeature(ctx);
    }
    return features[p.feature] || null;
  }
  let host = null, onIntro = null;
  function setHost(h, introCallback) { host = h; onIntro = introCallback || null; }

  function select(key) {
    S.selected = key || null;
    for (const m of meshes) {
      if (!m.material || !m.material.emissive) continue;
      const on = !!key && m.userData.key === key;
      m.material.emissive.copy(on ? m.material.color : new THREE.Color(0));
      m.material.emissiveIntensity = on ? 0.42 : 0;
    }
  }

  function describe(key) {
    const d = DESCRIPTIONS[key];
    const m = byKey[key] && byKey[key][0];
    return { key, category: d ? d[0] : '', title: d ? d[1] : (m && m.userData.english) || key, english: (m && m.userData.english) || key, text: d ? d[2] : '' };
  }

  function pick(raycaster) {
    const cands = meshes.filter((m) => m.isMesh && m.visible && shown(m) && m.material.opacity > 0.06);
    const hit = raycaster.intersectObjects(cands, false)[0];
    return hit ? hit.object.userData.key : null;
  }

  function setPreset(name) {
    const p = PRESETS[name];
    if (!p) return false;
    const was = S.preset;
    S.preset = name; S.opacity = p.opacity; S.show = { ...p.show };
    for (const k of Object.keys(parts)) delete parts[k];
    select(null);
    if (was === 'echo' && name !== 'echo') exitEcho();
    const wasF = features[PRESETS[was].feature], nowF = features[p.feature];
    if (was !== name && wasF) wasF.exit();
    apply();
    if (was !== name && nowF) nowF.enter();
    return true;
  }
  function setShow(k, on) { S.show[k] = on ? 1 : 0; apply(); }
  function setOpacity(pct) { S.opacity = Math.max(0, Math.min(100, +pct)); apply(); }
  function setPart(k, on) { parts[k] = !!on; apply(); }

  function attach(parent) {
    parent.add(group); S.active = true; S.last = null; apply();
    const f = features[PRESETS[S.preset].feature];
    if (f) f.enter(); /* detach() stopped it; a scenario left on is restarted from the top */
  }
  function detach() { const f = features[PRESETS[S.preset].feature]; if (f) f.exit(); S.active = false; motion.show(false); exitEcho(); group.removeFromParent(); }

  /* `seconds` is the studio's state.motionPhase. */
  function update(seconds) {
    if (!S.active) return;
    const dt = S.last === null ? 0 : Math.min(0.05, Math.max(0, seconds - S.last));
    S.last = seconds;
    const p = PRESETS[S.preset];
    const beat = heartbeat.update(dt, false, !!p.dynamic || !!p.echo);
    motion.update(dt, beat, heartbeat.isPlaying());
    const pf = features[p.feature];
    conduction.update(pf && pf.suppressConduction && pf.suppressConduction() ? { phase: 0.97 } : beat, S.selected);
    S.beat = beat;
    if (p.echo) { if (echoFan) echoFan.visible = true; echoDraw(performance.now()); }
    if (p.feature && features[p.feature]) features[p.feature].update(beat, dt);
  }

  function dispose() {
    detach();
    group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      ms.forEach((x) => x.dispose());
    });
  }

  /* ---- Echo -------------------------------------------------------------
     The scan plane is fixed in the atlas frame and the BODY NEVER MOVES:
     BetterHeart rotates its whole world into the probe frame; here the fan and
     probe are drawn inside the atlas group, the atlas materials are clipped by
     the plane, and the sector image is drawn in the panel from the same
     geometry. Frames are computed once from the REST positions (heartbeat
     rewrites the live arrays every frame). */
  let echoFrames = null, echoRenderer = null, echoFan = null, echoView = 'A4C', echoLast = 0;
  const echoPlane = new THREE.Plane(), echoModelPlane = new THREE.Plane(), inv = new THREE.Matrix4();
  const echoClip = [echoPlane];
  const echoKind = (u) => u.group === 'wall' ? 'wall' : u.group === 'chambers' ? 'cavity' : ['aorta', 'pa', 'cava', 'pv'].includes(u.group) ? 'vessel' : u.key === 'PAP' ? 'solid' : u.group === 'valves' ? 'valve' : null;
  const echoLabel = { AO: 'Ao', ARCH: 'Ao', PT: 'PA', PAB: 'PA', SVC: 'SVC', IVC: 'IVC' };

  function echoInit(canvas) {
    if (echoFrames) return;
    const rest = meshes.filter((m) => m.userData.positionCount && m.geometry.index)
      .map((m) => ({ key: m.userData.key, group: m.userData.group, pos: m.userData.rest, idx: m.geometry.index.array }));
    echoFrames = computeEchoFrames(rest).frames;
    echoRenderer = createEchoRenderer(canvas);
  }

  function buildFan(fr) {
    if (echoFan) { group.remove(echoFan); echoFan.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); }
    const V = (a) => new THREE.Vector3(...a), O = V(fr.O), l = V(fr.l), d = V(fr.d), pts = [O.clone()];
    for (let i = 0; i <= 40; i++) { const a = -fr.half + 2 * fr.half * i / 40; pts.push(O.clone().addScaledVector(l, Math.sin(a) * fr.depth).addScaledVector(d, Math.cos(a) * fr.depth)); }
    const geometry = new THREE.BufferGeometry().setFromPoints(pts), index = [];
    for (let i = 1; i < pts.length - 1; i++) index.push(0, i, i + 1);
    geometry.setIndex(index);
    echoFan = new THREE.Group();
    echoFan.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x5fa8d8, transparent: true, opacity: 0.17, side: THREE.DoubleSide, depthWrite: false })));
    echoFan.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x2f78ad })));
    const probe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.32, 20), new THREE.MeshStandardMaterial({ color: 0x4a5560, roughness: 0.6 }));
    probe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().negate());
    probe.position.copy(O).addScaledVector(d, -0.2);
    echoFan.add(probe);
    echoFan.traverse((o) => { o.userData.noClip = true; });
    group.add(echoFan);
  }

  /* Atlas materials only: the plane is never given to the host's meshes, and noClip keeps the fan whole. */
  function setClipping(on) {
    group.traverse((o) => {
      if (!o.isMesh || o.userData.noClip || !o.material) return;
      const next = on ? echoClip : null;
      if (o.material.clippingPlanes === next) return;
      o.material.clippingPlanes = next; o.material.needsUpdate = true;
    });
  }

  function setEchoView(id, canvas) {
    echoInit(canvas);
    if (!echoFrames[id]) id = 'A4C';
    echoView = id;
    const fr = echoFrames[id], V = (a) => new THREE.Vector3(...a);
    buildFan(fr);
    setClipping(true);
    echoModelPlane.setFromNormalAndCoplanarPoint(V(fr.n), V(fr.O));
    echoLast = 0;
    return ECHO_VIEWS.find((v) => v.id === id);
  }

  function echoRings() {
    const out = [];
    for (const r of Object.values(motion.rings || {})) { const c = new THREE.Vector3(...r.c); heartbeat.deformPoint(c); out.push({ ...r, c: [c.x, c.y, c.z] }); }
    return out;
  }
  function echoOpen() {
    const c = S.beat ? cycleAt(S.beat.phase) : { avOpen: 1, semilunarOpen: 0 };
    return { MV: c.avOpen, TV: c.avOpen, AV: c.semilunarOpen, PV: c.semilunarOpen };
  }

  /* Draw the sector image. ~30 fps is plenty. `ms` is performance.now(). */
  function echoDraw(ms) {
    if (!echoRenderer || !echoFrames) return;
    group.updateMatrixWorld(true);
    echoPlane.copy(echoModelPlane).applyMatrix4(group.matrixWorld);
    if (ms - echoLast < 30) return;
    echoLast = ms;
    inv.copy(group.matrixWorld).invert();
    const view = ECHO_VIEWS.find((v) => v.id === echoView), hide = (view && view.hide) || [], sources = [];
    for (const m of meshes) {
      const u = m.userData, k = echoKind(u);
      if (!k || !m.geometry.index || hide.includes(u.group) || hide.includes(u.key)) continue;
      if (k === 'valve' && !(m.visible && m.parent.visible)) continue;
      sources.push({ kind: k, label: u.group === 'chambers' ? u.key : echoLabel[u.key] || null, pos: m.geometry.attributes.position.array, idx: m.geometry.index.array,
        matrix: u.positionCount ? null : new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld).elements });
    }
    group.traverse((o) => {
      if (!o.isMesh || o.userData.kind !== 'valve-leaflet') return;
      for (let p = o; p && p !== group; p = p.parent) if (!p.visible) return;
      sources.push({ kind: 'leaflet', valve: o.parent && o.parent.userData.key, pos: o.geometry.attributes.position.array, idx: o.geometry.index.array,
        matrix: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld).elements });
    });
    echoRenderer.render(sources, { ...echoFrames[echoView], labels: view && view.labels, hideValves: view && view.hideValves }, { rings: echoRings(), open: echoOpen() });
  }

  function exitEcho() { setClipping(false); if (echoFan) echoFan.visible = false; }

  apply();
  return {
    group, groups, meshes, byKey, manifest, motion, heartbeat, parts,
    state: S, PRESETS,
    setPreset, setShow, setOpacity, setPart, select, describe, pick, prepare, features, setHost,
    intro: () => { const f = features[PRESETS[S.preset].feature]; return f && f.intro ? f.intro() : null; },
    attach, detach, update, dispose,
    PANEL_SECTIONS, ECHO_VIEWS, setEchoView, echoDraw, echoRenderer: () => echoRenderer,
    worldBox: () => new THREE.Box3().setFromObject(groups.wall),
  };
}
