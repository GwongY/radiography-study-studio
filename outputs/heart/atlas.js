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
import { createConduction } from './conduction.js?v=2';
import { createHeartMotion } from './heart-motion.js?v=25';
import { createHeartbeat } from './heartbeat.js?v=7';
import { ATLAS_SCALE, ATLAS_SHIFT } from './alignment.js?v=1';
import { DESCRIPTIONS } from './descriptions.js?v=1';

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
  natural:    { label: 'Natural 自然外觀',         opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: false },
  chambers:   { label: 'Four chambers 四腔分色',   opacity: 15,  show: { wall: 1, chambers: 1, valves: 0, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false },
  coronary:   { label: 'Coronaries 冠狀動脈',      opacity: 100, show: { wall: 1, chambers: 0, valves: 0, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true  },
  dynamic:    { label: 'Heartbeat 心臟動態',       opacity: 22,  show: { wall: 1, chambers: 1, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true, dynamic: true },
  conduction: { label: 'Conduction 傳導系統',      opacity: 12,  show: { wall: 1, chambers: 0, valves: 0, coronary: 0, great: 1, conduction: 1 }, speed: 0.35, flow: false },
  echo:       { label: 'Ultrasound 超音波切面',    opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false, echo: true },
};

export async function createHeartAtlas({ base = new URL('./', import.meta.url).href } = {}) {
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
  heartbeat = createHeartbeat({ meshes });
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
    for (const k of GREAT) groups[k].visible = !!S.show.great;
    for (const m of meshes) {
      const g = m.userData.group, key = m.userData.key;
      m.visible = !PART_KEYS.includes(key) || parts[key] !== false;
      if (!m.material) continue;
      if (g === 'wall') {
        m.material.opacity = opacity; m.material.transparent = opacity < 1; m.material.depthWrite = opacity > 0.85;
        m.material.color.setHex(S.preset === 'chambers' ? CHAMBER_COLOURS[key] : COLOURS.wall);
      }
      if (g === 'coronary') { m.renderOrder = 1; m.material.depthWrite = !p.flow; m.material.opacity = 1; m.material.transparent = false; }
      if (GREAT.includes(g)) {
        const see = S.preset === 'conduction';
        m.material.opacity = see ? 0.18 : 1; m.material.transparent = see; m.material.depthWrite = !see;
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
    heartbeat.setSpeed(p.speed);
  }

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
    return { key, category: d ? d[0] : '', title: d ? d[1] : (m && m.userData.label) || key, english: (m && m.userData.english) || key, text: d ? d[2] : '' };
  }

  function pick(raycaster) {
    const cands = meshes.filter((m) => m.isMesh && m.visible && shown(m) && m.material.opacity > 0.06);
    const hit = raycaster.intersectObjects(cands, false)[0];
    return hit ? hit.object.userData.key : null;
  }

  function setPreset(name) {
    const p = PRESETS[name];
    if (!p) return false;
    S.preset = name; S.opacity = p.opacity; S.show = { ...p.show };
    for (const k of Object.keys(parts)) delete parts[k];
    select(null);
    apply();
    return true;
  }
  function setShow(k, on) { S.show[k] = on ? 1 : 0; apply(); }
  function setOpacity(pct) { S.opacity = Math.max(0, Math.min(100, +pct)); apply(); }
  function setPart(k, on) { parts[k] = !!on; apply(); }

  function attach(parent) { parent.add(group); S.active = true; S.last = null; apply(); }
  function detach() { S.active = false; motion.show(false); group.removeFromParent(); }

  /* `seconds` is the studio's state.motionPhase. */
  function update(seconds) {
    if (!S.active) return;
    const dt = S.last === null ? 0 : Math.min(0.05, Math.max(0, seconds - S.last));
    S.last = seconds;
    const p = PRESETS[S.preset];
    const beat = heartbeat.update(dt, false, !!p.dynamic || !!p.echo);
    motion.update(dt, beat, heartbeat.isPlaying());
    conduction.update(beat, S.selected);
    S.beat = beat;
  }

  function dispose() {
    detach();
    group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      ms.forEach((x) => x.dispose());
    });
  }

  apply();
  return {
    group, groups, meshes, byKey, manifest, motion, heartbeat, parts,
    state: S, PRESETS,
    setPreset, setShow, setOpacity, setPart, select, describe, pick,
    attach, detach, update, dispose,
    worldBox: () => new THREE.Box3().setFromObject(groups.wall),
  };
}
