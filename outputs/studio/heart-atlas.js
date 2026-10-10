/*
 * Heart atlas
 *
 * BetterHeart's heart detail, drawn inside the main scene. The atlas group
 * (outputs/heart/atlas.js) is a child of the circulatory layer's `root`, so it
 * shares the body transform, the layer separation and the idle pivot. While the
 * mode is on, the explorer's own heart-system meshes are flagged `atlasHidden`
 * (meshOn honours it, so applyLayers cannot bring them back) and the atlas
 * runs its own cardiac clock; live-physiology.js is not touched. See
 * docs/superpowers/specs/2026-10-10-heart-atlas-design.md.
 *
 * Nothing runs at module scope; init() wires the button.
 */
import { $, els, state } from './imports.js';
import { applyLayers, setLayerChips } from './live-physiology.js';
import { showToast } from './visualisation-modes.js';

const CIRC_FILE = './assets/dolasim.glb';
let atlas = null;          // createHeartAtlas() result, built once
let heartMod = null;       // the dynamically imported atlas module
let saved = null;          // { layers, target, position, minDistance, maxDistance }
let panel = null;
let toggle = null;
let busy = false;
let onPointerUp = null;

/* The DOM the heart modules look up. Ids are prefixed ha- (outputs/heart/*). */
function panelHtml() {
  return `
  <header class="ha-head"><div><strong>Heart atlas</strong> <span>心臟互動解剖</span></div>
    <button type="button" id="ha-close" aria-label="Close the heart atlas">Close</button></header>
  <div class="ha-scroll">
    <div class="ha-row" id="ha-presets" role="group" aria-label="Scenario"></div>
    <label class="ha-check"><input type="checkbox" id="ha-context"> Show the skeleton around the heart <span>顯示骨骼</span></label>
    <div class="ha-shows" id="ha-shows"></div>
    <label class="ha-slider">Wall opacity 外壁不透明度 <input type="range" id="ha-opacity" min="0" max="100" value="100"><output id="ha-opacityValue">100%</output></label>
    <div class="ha-parts" id="ha-parts" role="group" aria-label="Chambers and valves"></div>
    <section id="ha-ecgPanel" class="ha-ecg" aria-label="Schematic ECG">
      <div class="ha-ecg-head"><strong>Heartbeat and schematic ECG 心跳與示意心電圖</strong><span id="ha-ecgRate">70 bpm</span>
        <button type="button" id="ha-motionSpeed" aria-pressed="false">Slow motion 慢速</button>
        <button type="button" id="ha-heartPlay" aria-pressed="true">Ⅱ Pause 暫停</button></div>
      <svg class="ha-ecg-chart" viewBox="0 0 700 100" role="img" aria-label="P wave, QRS and T wave with a cursor on the current phase">
        <defs><pattern id="ha-ecgGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width=".5"/></pattern></defs>
        <rect width="700" height="100" fill="url(#ha-ecgGrid)"/>
        <path id="ha-ecgTrace" fill="none" stroke="currentColor" stroke-width="2"/>
        <line id="ha-ecgCursor" y1="4" y2="96" stroke="#e08a5a" stroke-width="1.4"/><circle id="ha-ecgDot" r="3.7" fill="#e08a5a"/>
        <text x="58" y="94">P</text><text x="101" y="94">QRS</text><text x="206" y="94">T</text><text x="388" y="94">P</text><text x="431" y="94">QRS</text><text x="536" y="94">T</text>
      </svg>
      <div class="ha-ecg-foot"><span id="ha-ecgPhase">Diastole 舒張期</span>
        <label>Rate 心率 <input type="range" id="ha-heartRate" min="45" max="120" value="70"><output id="ha-heartRateValue">70 bpm</output></label></div>
      <p class="ha-note">A schematic sinus rhythm; electrical activity precedes mechanical contraction. Not a diagnostic ECG. 示意心電圖，非診斷用。</p>
    </section>
    <p class="ha-status" id="ha-conductionStatus" hidden></p>
    <p class="ha-status" id="ha-apparatusStatus"></p>
    <section class="ha-echo" id="ha-echoPanel" hidden></section>
    <article class="ha-info" aria-live="polite"><strong id="ha-infoTitle">Tap a structure</strong><span id="ha-infoCat"></span><p id="ha-infoText">Tap the heart, or choose a chamber or valve, to read about it. Descriptions are BetterHeart's (Traditional Chinese).</p></article>
    <p class="ha-credit">Heart model and teaching scripts: BetterHeart (黃天祈醫師), meshes CC BY-SA 4.0, from BodyParts3D / Z-Anatomy. <a href="./heart/MODEL-NOTICES.txt" target="_blank" rel="noopener">Sources and licence</a></p>
  </div>`;
}

const SHOWS = [['wall', 'Myocardium 心肌外壁'], ['chambers', 'Four chambers 四個心腔'], ['valves', 'Valves 四個心臟瓣膜'], ['coronary', 'Coronary arteries and veins 冠狀動脈與心臟靜脈'], ['great', 'Great vessels 大血管'], ['conduction', 'Conduction system 傳導系統']];
const PART_LABELS = { RA: 'RA', RV: 'RV', LA: 'LA', LV: 'LV', TV: 'Tricuspid 三尖瓣', MV: 'Mitral 二尖瓣', AV: 'Aortic 主動脈瓣', PV: 'Pulmonary 肺動脈瓣' };

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'heartAtlasPanel';
  panel.className = 'heart-atlas-panel';
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('stageHome').appendChild(panel);
  $('ha-close').onclick = () => exitHeartAtlas();
}

function syncControls() {
  if (!atlas) return;
  const S = atlas.state;
  for (const b of panel.querySelectorAll('[data-ha-preset]')) {
    const on = b.dataset.haPreset === S.preset;
    b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
  }
  for (const [k] of SHOWS) { const c = panel.querySelector(`[data-ha-show="${k}"]`); if (c) c.checked = !!S.show[k]; }
  $('ha-opacity').value = String(S.opacity);
  $('ha-opacityValue').textContent = Math.round(S.opacity) + '%';
  for (const k of Object.keys(PART_LABELS)) { const c = panel.querySelector(`[data-ha-part="${k}"]`); if (c) c.checked = atlas.parts[k] !== false; }
  $('ha-echoPanel').hidden = S.preset !== 'echo';
}

function wireControls() {
  const presets = $('ha-presets');
  presets.innerHTML = Object.entries(atlas.PRESETS).map(([k, p]) => `<button type="button" data-ha-preset="${k}" aria-pressed="false">${p.label}</button>`).join('');
  presets.querySelectorAll('[data-ha-preset]').forEach((b) => { b.onclick = () => { atlas.setPreset(b.dataset.haPreset); syncControls(); onPresetChanged(); }; });
  $('ha-shows').innerHTML = SHOWS.map(([k, l]) => `<label><input type="checkbox" data-ha-show="${k}"> ${l}</label>`).join('');
  $('ha-shows').querySelectorAll('[data-ha-show]').forEach((c) => { c.oninput = () => atlas.setShow(c.dataset.haShow, c.checked); });
  $('ha-parts').innerHTML = Object.entries(PART_LABELS).map(([k, l]) => `<label><input type="checkbox" data-ha-part="${k}"> ${l}</label>`).join('');
  $('ha-parts').querySelectorAll('[data-ha-part]').forEach((c) => { c.oninput = () => atlas.setPart(c.dataset.haPart, c.checked); });
  $('ha-opacity').oninput = () => { atlas.setOpacity($('ha-opacity').value); $('ha-opacityValue').textContent = Math.round(atlas.state.opacity) + '%'; };
  $('ha-context').oninput = () => setContext($('ha-context').checked);
}

/* Preset hook for the echo task; a no-op until Task 5 replaces it. */
let onPresetChanged = () => {};
export function setPresetHook(fn) { onPresetChanged = fn || (() => {}); }

function showInfo(key) {
  if (!key) { $('ha-infoTitle').textContent = 'Tap a structure'; $('ha-infoCat').textContent = ''; $('ha-infoText').textContent = 'Tap the heart, or choose a chamber or valve, to read about it.'; return; }
  const d = atlas.describe(key);
  $('ha-infoTitle').textContent = d.english === d.title ? d.title : `${d.english} · ${d.title}`;
  $('ha-infoCat').textContent = d.category;
  $('ha-infoText').textContent = d.text;
}

/* ---- the explorer's own heart ---- */
function hostHeartMeshes() {
  const circ = state.extraModels && state.extraModels.circulatory;
  if (!circ) return [];
  return circ.meshes.filter((m) => (m.userData.systems || []).includes('heart'));
}
function setHostHeartHidden(on) {
  for (const m of hostHeartMeshes()) m.userData.atlasHidden = !!on;
}

/* The skeleton is two chips (Axial, Appendicular) -- setLayerChips names them. */
function setContext(on) {
  setLayerChips('skeleton', on);
  applyLayers();
  window.dispatchEvent(new CustomEvent('osteo:layers'));
}

/* ---- camera ---- */
function frameHeart() {
  const box = atlas.worldBox();
  if (box.isEmpty()) return;
  const c = box.getCenter(new state.THREE.Vector3()), size = box.getSize(new state.THREE.Vector3());
  const camera = state.camera, controls = state.controls;
  const offset = camera.position.clone().sub(controls.target).normalize();
  const half = Math.tan(camera.fov * Math.PI / 360) / camera.zoom;
  const dist = Math.max(0.12, Math.max(size.y, size.x / Math.max(0.1, camera.aspect)) / (2 * half) + size.z / 2) * 1.5;
  controls.minDistance = Math.min(controls.minDistance, dist * 0.2);
  controls.target.copy(c);
  camera.position.copy(c).add(offset.multiplyScalar(dist));
  controls.update();
}

/* ---- picking: capture on a parent so the host's own stage handler never sees an atlas hit ---- */
function bindPicking() {
  if (onPointerUp) return;
  const THREE = state.THREE;
  const ray = new THREE.Raycaster(), p = new THREE.Vector2();
  let down = null;
  const host = els.stage.parentElement;
  const dn = (e) => { down = [e.clientX, e.clientY]; };
  onPointerUp = (e) => {
    if (!atlas || !state.heartAtlasOn || !down) return;
    if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; }
    down = null;
    const r = state.renderer.domElement.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const key = atlas.pick(ray);
    if (!key) return;
    e.stopPropagation();
    const again = atlas.state.selected === key;
    atlas.select(again ? null : key);
    showInfo(again ? null : key);
  };
  host.addEventListener('pointerdown', dn, true);
  host.addEventListener('pointerup', onPointerUp, true);
  bindPicking.off = () => { host.removeEventListener('pointerdown', dn, true); host.removeEventListener('pointerup', onPointerUp, true); onPointerUp = null; };
}

/* ---- enter / exit ---- */
export async function enterHeartAtlas() {
  if (state.heartAtlasOn || busy) return state.heartAtlasOn;
  busy = true;
  try {
    if (!state.scene) await window.__osteo.boot();
    /* Taken BEFORE showSystem, which swaps the visible layer: exit puts back what the reader had. */
    const before = {
      layers: { ...state.layers },
      target: state.controls.target.clone(), position: state.camera.position.clone(),
      minDistance: state.controls.minDistance, maxDistance: state.controls.maxDistance,
    };
    const ok = await window.__osteo.showSystem('circulatory', CIRC_FILE);
    if (!ok) return false;
    buildPanel();
    if (!atlas) {
      try {
        heartMod = await import('../heart/atlas.js?v=1');
        atlas = await heartMod.createHeartAtlas();
      } catch (e) {
        console.error(e);
        showToast('The heart atlas could not load.');
        return false;
      }
      wireControls();
      state.heartAtlas = atlas;
    }
    const circ = state.extraModels.circulatory;
    saved = before;
    /* Only the Heart chip: the atlas draws its own vessels and coronaries. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    state.layers.heart = true;
    setHostHeartHidden(true);
    applyLayers();
    atlas.attach(circ.root);
    /* After attach: a freshly added group's matrixWorld is stale until updated, and worldBox() reads it. */
    circ.root.updateMatrixWorld(true);
    state.heartAtlasOn = true;
    state.atlasTick = (t) => atlas.update(t);
    panel.hidden = false;
    toggle.setAttribute('aria-pressed', 'true');
    $('ha-context').checked = false;
    atlas.setPreset('natural');
    syncControls();
    showInfo(null);
    bindPicking();
    frameHeart();
    window.dispatchEvent(new CustomEvent('osteo:layers'));
    return true;
  } finally { busy = false; }
}

export function exitHeartAtlas() {
  if (!state.heartAtlasOn) return;
  state.heartAtlasOn = false;
  state.atlasTick = null;
  if (bindPicking.off) bindPicking.off();
  if (atlas) { atlas.select(null); atlas.detach(); }
  setHostHeartHidden(false);
  if (saved) {
    Object.assign(state.layers, saved.layers);
    state.controls.target.copy(saved.target); state.camera.position.copy(saved.position);
    state.controls.minDistance = saved.minDistance; state.controls.maxDistance = saved.maxDistance;
    state.controls.update();
    saved = null;
  }
  applyLayers();
  if (panel) panel.hidden = true;
  if (toggle) toggle.setAttribute('aria-pressed', 'false');
  window.dispatchEvent(new CustomEvent('osteo:layers'));
}

export const heartAtlasPanel = () => panel;

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  const home = $('stageHome');
  if (!home) return;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'heartAtlasToggle';
  toggle.className = 'heart-atlas-toggle';
  toggle.setAttribute('aria-pressed', 'false');
  toggle.textContent = 'Heart atlas';
  toggle.onclick = () => { state.heartAtlasOn ? exitHeartAtlas() : enterHeartAtlas(); };
  home.appendChild(toggle);
  window.__osteo = window.__osteo || {};
  Object.assign(window.__osteo, { enterHeartAtlas, exitHeartAtlas, heartAtlasOn: () => !!state.heartAtlasOn });
}
