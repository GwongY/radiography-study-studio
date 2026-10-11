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
import { $, els, prefersStill, state } from './imports.js';
import { applyLayers, setLayerChips } from './live-physiology.js';
import { showToast } from './visualisation-modes.js';

const CIRC_FILE = './assets/dolasim.glb';
let atlas = null;          // createHeartAtlas() result, built once
let saved = null;          // { layers, target, position, minDistance, maxDistance }
let panel = null;
let toggle = null;
let busy = false;
let controlsWired = false;
let echoResizeObserver = null;
let onPointerUp = null;

function setBusy(on) {
  busy = on;
  if (!toggle) return;
  toggle.disabled = on;
  toggle.setAttribute('aria-busy', String(on));
  toggle.textContent = on ? 'Loading heart atlas…' : 'Heart atlas';
}

function setDockMode(on) {
  $('viewerDock')?.classList.toggle('heart-atlas-open', on);
  $('stageHome')?.classList.toggle('heart-atlas-open', on);
}

/* A failed dynamic import() is remembered by the browser for the life of the
   page: the same specifier fails again at once on every retry, even after the
   network is back, which looked like a button that flashes "Loading" and then
   fails forever. A retry therefore asks for a new URL. The exact first
   specifier stays the one the service worker precaches, so the offline path is
   unchanged; if a dependency of atlas.js was the part that failed, only a page
   reload clears it, and the message says so. */
let heartModule = null;
let importFailures = 0;
async function loadHeartModule() {
  if (heartModule) return heartModule;
  try {
    heartModule = importFailures === 0
      ? await import('../heart/atlas.js?v=2')
      : await import(`../heart/atlas.js?v=2&retry=${importFailures}`);
  } catch (error) {
    importFailures += 1;
    throw error;
  }
  return heartModule;
}

function loadFailureMessage() {
  if (importFailures >= 2 && !(typeof navigator !== 'undefined' && navigator.onLine === false)) return 'The heart atlas still could not load. Reload the page, then try again.';
  return typeof navigator !== 'undefined' && navigator.onLine === false
    ? 'Connect once to download the circulatory layer for offline use.'
    : 'The heart atlas could not load. Your viewer has been restored; try again.';
}

function notifyLayersChanged() {
  window.dispatchEvent(new CustomEvent('osteo:layers'));
}

/* The DOM the heart modules look up. Ids are prefixed ha- (outputs/heart/*). */
function panelHtml() {
  return `
  <header class="ha-head"><div><strong>Heart atlas</strong></div>
    <button type="button" id="ha-close" aria-label="Close the heart atlas">Close</button></header>
  <div class="ha-scroll">
    <div class="ha-row" id="ha-presets" role="group" aria-label="Scenario"></div>
    <label class="ha-check"><input type="checkbox" id="ha-context"> Show the skeleton around the heart</label>
    <div class="ha-shows" id="ha-shows"></div>
    <label class="ha-slider">Wall opacity <input type="range" id="ha-opacity" min="0" max="100" value="100"><output id="ha-opacityValue">100%</output></label>
    <div class="ha-parts" id="ha-parts" role="group" aria-label="Chambers and valves"></div>
    <section id="ha-ecgPanel" class="ha-ecg" aria-label="Schematic ECG">
      <div class="ha-ecg-head"><strong>Heartbeat and schematic ECG</strong><span id="ha-ecgRate">70 bpm</span>
        <button type="button" id="ha-motionSpeed" aria-pressed="false">Slow motion</button>
        <button type="button" id="ha-heartPlay">Pause heartbeat</button></div>
      <svg class="ha-ecg-chart" viewBox="0 0 700 100" role="img" aria-label="P wave, QRS and T wave with a cursor on the current phase">
        <defs><pattern id="ha-ecgGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width=".5"/></pattern></defs>
        <rect width="700" height="100" fill="url(#ha-ecgGrid)"/>
        <path id="ha-ecgTrace" fill="none" stroke="currentColor" stroke-width="2"/>
        <line id="ha-ecgCursor" y1="4" y2="96" stroke="#e08a5a" stroke-width="1.4"/><circle id="ha-ecgDot" r="3.7" fill="#e08a5a"/>
        <text x="58" y="94">P</text><text x="101" y="94">QRS</text><text x="206" y="94">T</text><text x="388" y="94">P</text><text x="431" y="94">QRS</text><text x="536" y="94">T</text>
      </svg>
      <div class="ha-ecg-foot"><span id="ha-ecgPhase">Diastole · ventricular filling</span>
        <label>Rate <input type="range" id="ha-heartRate" min="45" max="120" value="70"><output id="ha-heartRateValue">70 bpm</output></label></div>
      <p class="ha-note">A schematic sinus rhythm; electrical activity precedes mechanical contraction. Not a diagnostic ECG.</p>
    </section>
    <p class="ha-status" id="ha-conductionStatus" hidden></p>
    <p class="ha-status" id="ha-apparatusStatus"></p>
    <section class="ha-echo" id="ha-echoPanel" hidden></section>
    <article class="ha-info" aria-live="polite"><strong id="ha-infoTitle">Tap a structure</strong><span id="ha-infoCat"></span><p id="ha-infoText">Tap the heart, or choose a chamber or valve, to read about it. Descriptions are adapted from BetterHeart.</p></article>
    <p class="ha-credit">Heart model and teaching scripts: BetterHeart, meshes CC BY-SA 4.0, from BodyParts3D / Z-Anatomy. <a href="./heart/MODEL-NOTICES.txt" target="_blank" rel="noopener">Sources and licence</a></p>
  </div>`;
}

const SHOWS = [['wall', 'Myocardium'], ['chambers', 'Four chambers'], ['valves', 'Valves'], ['coronary', 'Coronary arteries and veins'], ['great', 'Great vessels'], ['conduction', 'Conduction system']];
const PART_LABELS = { RA: 'RA', RV: 'RV', LA: 'LA', LV: 'LV', TV: 'Tricuspid', MV: 'Mitral', AV: 'Aortic', PV: 'Pulmonary' };

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'heartAtlasPanel';
  panel.className = 'heart-atlas-panel';
  panel.setAttribute('aria-label', 'Heart atlas controls');
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('viewerDock').appendChild(panel);
  $('ha-close').onclick = () => exitHeartAtlas();
  panel.onkeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      exitHeartAtlas();
    }
  };
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
  $('ha-conductionStatus').hidden = !S.show.conduction;
}

function wireControls() {
  const presets = $('ha-presets');
  presets.innerHTML = Object.entries(atlas.PRESETS).map(([k, p]) => `<button type="button" data-ha-preset="${k}" aria-pressed="false">${p.label}</button>`).join('');
  presets.querySelectorAll('[data-ha-preset]').forEach((b) => { b.onclick = () => { atlas.setPreset(b.dataset.haPreset); syncControls(); onPresetChanged(); }; });
  $('ha-shows').innerHTML = SHOWS.map(([k, l]) => `<label><input type="checkbox" data-ha-show="${k}"> ${l}</label>`).join('');
  $('ha-shows').querySelectorAll('[data-ha-show]').forEach((c) => { c.oninput = () => { atlas.setShow(c.dataset.haShow, c.checked); syncControls(); }; });
  $('ha-parts').innerHTML = Object.entries(PART_LABELS).map(([k, l]) => `<label><input type="checkbox" data-ha-part="${k}"> ${l}</label>`).join('');
  $('ha-parts').querySelectorAll('[data-ha-part]').forEach((c) => { c.oninput = () => atlas.setPart(c.dataset.haPart, c.checked); });
  $('ha-opacity').oninput = () => { atlas.setOpacity($('ha-opacity').value); $('ha-opacityValue').textContent = Math.round(atlas.state.opacity) + '%'; };
  $('ha-context').oninput = () => setContext($('ha-context').checked);
  buildEchoPanel();
  controlsWired = true;
}

/* ---- Ultrasound: TTE / TEE sections ----
   The body never rotates. The scan plane clips the ATLAS materials only (see
   outputs/heart/atlas.js); the sector image is drawn into #ha-echoCanvas from the
   same geometry. renderer.localClippingEnabled is on only while the echo preset is,
   so no other material in the explorer can be clipped by it. */
let sizeEcho = () => {};
let echoLastView = 'A4C';

function buildEchoPanel() {
  const host = $('ha-echoPanel');
  const groups = { TTE: 'Transthoracic (TTE)', TEE: 'Transoesophageal (TEE)' };
  host.innerHTML = `<div class="ha-row" id="ha-echoTabs" role="group" aria-label="TTE or TEE">${Object.entries(groups).map(([g, l]) => `<button type="button" data-ha-etab="${g}" aria-pressed="false">${l}</button>`).join('')}</div>
    <div class="ha-row" id="ha-echoViews"></div>
    <canvas id="ha-echoCanvas" class="ha-echo-canvas" role="img" aria-label="Simulated ultrasound sector image"></canvas>
    <p class="ha-note" id="ha-echoName"></p><p class="ha-note" id="ha-echoText"></p>`;
  const render = (g) => {
    $('ha-echoViews').innerHTML = atlas.ECHO_VIEWS.filter((v) => v.group === g).map((v) => `<button type="button" data-ha-echo="${v.id}" aria-pressed="false">${v.english}</button>`).join('');
    $('ha-echoViews').querySelectorAll('[data-ha-echo]').forEach((b) => { b.onclick = () => chooseEcho(b.dataset.haEcho); });
    host.querySelectorAll('[data-ha-etab]').forEach((t) => { const on = t.dataset.haEtab === g; t.classList.toggle('active', on); t.setAttribute('aria-pressed', String(on)); });
    markEchoView();
  };
  host.querySelectorAll('[data-ha-etab]').forEach((t) => { t.onclick = () => render(t.dataset.haEtab); });
  render('TTE');
  const c = $('ha-echoCanvas');
  sizeEcho = () => { const w = Math.round(c.clientWidth * Math.min(devicePixelRatio || 1, 2)); if (w > 0 && c.width !== w) { c.width = w; c.height = Math.round(w * 7 / 8); } };
  if (echoResizeObserver) echoResizeObserver.disconnect();
  if (typeof ResizeObserver === 'function') {
    echoResizeObserver = new ResizeObserver(sizeEcho);
    echoResizeObserver.observe(c);
  }
  sizeEcho();
}

function markEchoView() {
  $('ha-echoViews').querySelectorAll('[data-ha-echo]').forEach((b) => { const on = b.dataset.haEcho === echoLastView; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
}

function chooseEcho(id) {
  state.renderer.localClippingEnabled = true;
  sizeEcho();
  const v = atlas.setEchoView(id, $('ha-echoCanvas'));
  echoLastView = v.id;
  markEchoView();
  $('ha-echoName').textContent = `${v.angle ? 'TEE ' + v.angle + ' · ' : ''}${v.english}`;
  $('ha-echoText').textContent = v.text;
}

/* Entering the echo preset selects a view (the last one, else A4C); leaving it
   -- atlas.setPreset has already cleared the clipping -- turns the renderer's
   local clipping off again. */
function onPresetChanged() {
  if (atlas.state.preset === 'echo') chooseEcho(echoLastView);
  else if (state.renderer) state.renderer.localClippingEnabled = false;
}

function showInfo(key) {
  if (!key) { $('ha-infoTitle').textContent = 'Tap a structure'; $('ha-infoCat').textContent = ''; $('ha-infoText').textContent = 'Tap the heart, or choose a chamber or valve, to read about it.'; return; }
  const d = atlas.describe(key);
  $('ha-infoTitle').textContent = d.title;
  $('ha-infoCat').textContent = d.category;
  $('ha-infoText').textContent = d.text;
}

/* ---- the explorer's own heart ---- */
/* The heart-system meshes, plus EVERY unclassified mesh (no system rule). The GLB
   carries a few whose names did not survive export, shown as "????????" or "?x":
   the host's coronary arteries sit among them, and so do two tiny strays at neck
   height, 0.3 m above the heart ("?x.l" and "?x.r"). An unclassified mesh follows
   its whole layer, so with the Heart chip on it is drawn whatever the atlas shows;
   it is not limited to the heart's own box for that reason. The list is taken once
   per entry and the same one is un-hidden on exit. */
let hostHidden = [];
function hostHeartMeshes() {
  const circ = state.extraModels && state.extraModels.circulatory;
  if (!circ) return [];
  return circ.meshes.filter((m) => {
    const systems = m.userData.systems || [];
    return !systems.length || systems.includes('heart');
  });
}
function setHostHeartHidden(on) {
  if (on) hostHidden = hostHeartMeshes();
  for (const m of hostHidden) m.userData.atlasHidden = !!on;
  if (!on) hostHidden = [];
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
  /* The dock overlays part of the stage (the bottom on a phone, the right side
     on a wide screen). Centre the heart in what is left, not in the whole stage. */
  const dock = $('viewerDock'), sr = els.stage.getBoundingClientRect(), dr = dock ? dock.getBoundingClientRect() : null;
  if (dr && dr.width > 0 && dr.height > 0 && sr.width > 0 && sr.height > 0) {
    const view = offset.clone().negate().normalize(), right = view.clone().cross(camera.up).normalize(), up = right.clone().cross(view).normalize();
    const visH = 2 * dist * half, visW = visH * camera.aspect;
    const dy = dr.width >= sr.width * 0.6 ? Math.max(0, sr.bottom - Math.max(dr.top, sr.top)) / sr.height : 0;
    const dx = dr.width < sr.width * 0.6 ? Math.max(0, sr.right - Math.max(dr.left, sr.left)) / sr.width : 0;
    const shift = up.multiplyScalar(-dy / 2 * visH).add(right.multiplyScalar(dx / 2 * visW));
    controls.target.add(shift);
    camera.position.add(shift);
  }
  controls.update();
}

function takeSnapshot() {
  if (!state.controls || !state.camera) throw new Error('The 3D viewer has not finished booting.');
  return {
    layers: { ...state.layers },
    layerOpacity: { ...(state.layerOpacity || {}) },
    target: state.controls.target.clone(), position: state.camera.position.clone(),
    minDistance: state.controls.minDistance, maxDistance: state.controls.maxDistance,
  };
}

function restoreSnapshot(snapshot) {
  if (!snapshot) return;
  const layers = state.layers || (state.layers = {});
  for (const key of Object.keys(layers)) if (!(key in snapshot.layers)) delete layers[key];
  Object.assign(layers, snapshot.layers);
  state.layerOpacity = { ...snapshot.layerOpacity };
  if (state.controls && state.camera) {
    state.controls.target.copy(snapshot.target);
    state.camera.position.copy(snapshot.position);
    state.controls.minDistance = snapshot.minDistance;
    state.controls.maxDistance = snapshot.maxDistance;
    state.controls.update();
  }
}

function cleanupEntry(snapshot, disposeAtlas = false) {
  const returnFocus = !!panel && panel.contains(document.activeElement);
  state.heartAtlasOn = false;
  state.atlasTick = null;
  if (bindPicking.off) bindPicking.off();
  if (atlas) {
    try { atlas.select(null); } catch (error) { console.error('Heart atlas selection cleanup failed', error); }
    try { atlas.detach(); } catch (error) { console.error('Heart atlas detach failed', error); }
  }
  if (state.renderer) state.renderer.localClippingEnabled = false;
  setHostHeartHidden(false);
  restoreSnapshot(snapshot);
  if (snapshot && state.scene && state.controls) {
    applyLayers();
    notifyLayersChanged();
  }
  if (panel) panel.hidden = true;
  if (toggle) toggle.setAttribute('aria-pressed', 'false');
  setDockMode(false);
  if (disposeAtlas && atlas) {
    try { atlas.dispose(); } catch (error) { console.error('Heart atlas disposal failed', error); }
    atlas = null;
  }
  if (returnFocus && toggle) toggle.focus();
}

function normalizedMeshName(value) {
  return String(value || '').replace(/_/g, ' ').replace(/[-.,()'’]+/g, ' ')
    .replace(/\s+/g, ' ').trim().toLowerCase();
}

/* The offline fit check is repeated against the loaded scene before the atlas
   becomes visible. Compare every same-named source mesh, not two broad boxes
   that could agree while one local structure is misplaced. */
function checkAtlasAlignment(circ) {
  if (!atlas || !atlas.manifest || !state.scene) return { ok: false, matched: 0, worst: Infinity };
  const hostByName = new Map(circ.meshes.map((mesh) => [normalizedMeshName(mesh.userData.label || mesh.name), mesh]));
  const atlasByName = new Map(atlas.meshes
    .filter((mesh) => mesh.userData && mesh.userData.sourceName)
    .map((mesh) => [normalizedMeshName(mesh.userData.sourceName), mesh]));
  const T = state.THREE, pairs = [], hostBounds = new T.Box3();
  state.scene.updateMatrixWorld(true);
  for (const def of atlas.manifest.meshes) {
    if (def.group === 'chambers') continue;
    const key = normalizedMeshName(def.sourceName);
    const host = hostByName.get(key), model = atlasByName.get(key);
    if (!host || !model) continue;
    host.updateWorldMatrix(true, false);
    model.updateWorldMatrix(true, false);
    const hostBox = new T.Box3().setFromObject(host);
    const atlasBox = new T.Box3().setFromObject(model);
    if (hostBox.isEmpty() || atlasBox.isEmpty()) continue;
    hostBounds.union(hostBox);
    pairs.push([hostBox, atlasBox]);
  }
  const size = hostBounds.getSize(new T.Vector3());
  const span = Math.max(size.x, size.y, size.z);
  if (pairs.length < 35 || !Number.isFinite(span) || span <= 0) {
    return { ok: false, matched: pairs.length, worst: Infinity };
  }
  let worst = 0;
  for (const [hostBox, atlasBox] of pairs) {
    for (const axis of ['x', 'y', 'z']) {
      worst = Math.max(worst,
        Math.abs(hostBox.min[axis] - atlasBox.min[axis]) / span,
        Math.abs(hostBox.max[axis] - atlasBox.max[axis]) / span);
    }
  }
  return { ok: worst <= 0.03, matched: pairs.length, worst };
}

/* ---- picking ----
   The handlers sit on the canvas itself, the same element the orbit controls
   listen on. stopPropagation there keeps a tap on the atlas away from the
   stage's own picker (an ancestor) while the controls still see the release.
   Swallowing pointerup in the capture phase on a parent, as this once did,
   left the controls believing the button was still down: the view kept
   rotating with no button pressed and the next right-click became a pan. */
function bindPicking() {
  if (onPointerUp) return;
  const THREE = state.THREE;
  const ray = new THREE.Raycaster(), p = new THREE.Vector2();
  let down = null;
  const host = state.renderer.domElement;
  const canvas = state.renderer.domElement;
  const isPickPointer = (e) => e.target === canvas && e.isPrimary && e.button === 0;
  const dn = (e) => {
    down = isPickPointer(e) ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null;
  };
  onPointerUp = (e) => {
    if (!isPickPointer(e) || !atlas || !state.heartAtlasOn || !down || e.pointerId !== down.id) { down = null; return; }
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = canvas.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const key = atlas.pick(ray);
    if (!key) return;
    e.stopPropagation();
    const again = atlas.state.selected === key;
    atlas.select(again ? null : key);
    showInfo(again ? null : key);
  };
  host.addEventListener('pointerdown', dn);
  host.addEventListener('pointerup', onPointerUp);
  const cancel = () => { down = null; };
  host.addEventListener('pointercancel', cancel);
  bindPicking.off = () => {
    host.removeEventListener('pointerdown', dn);
    host.removeEventListener('pointerup', onPointerUp);
    host.removeEventListener('pointercancel', cancel);
    onPointerUp = null;
  };
}

/* ---- enter / exit ---- */
export async function enterHeartAtlas() {
  if (state.heartAtlasOn || busy) return state.heartAtlasOn;
  if (state.xray || state.focus) {
    showToast(state.xray ? 'Close Projection before opening the heart atlas.' : 'Close the focused lesson before opening the heart atlas.');
    return false;
  }
  setBusy(true);
  state.heartAtlasLoading = true;
  let before = null, createdHere = false;
  try {
    if (!state.scene) {
      if (!window.__osteo || typeof window.__osteo.boot !== 'function') throw new Error('The 3D viewer could not start.');
      await window.__osteo.boot();
    }
    if (!state.scene || !state.camera || !state.controls || !state.renderer) throw new Error('The 3D viewer did not finish booting.');
    if (state.xray || state.focus) {
      showToast(state.xray ? 'Close Projection before opening the heart atlas.' : 'Close the focused lesson before opening the heart atlas.');
      return false;
    }
    before = takeSnapshot();
    buildPanel();
    if (!atlas) {
      const heartMod = await loadHeartModule();
      atlas = await heartMod.createHeartAtlas({ startPaused: prefersStill() });
      createdHere = true;
    }
    if (!controlsWired) wireControls();
    const ok = await window.__osteo.showSystem('circulatory', CIRC_FILE, {
      atlasEntry: true,
      failureMessage: loadFailureMessage(),
    });
    if (!ok) { cleanupEntry(before, createdHere); return false; }
    const circ = state.extraModels.circulatory;
    if (!circ) throw new Error('The circulatory layer did not load.');
    atlas.attach(circ.root);
    circ.root.updateMatrixWorld(true);
    state.scene.updateMatrixWorld(true);
    const alignment = checkAtlasAlignment(circ);
    if (!alignment.ok) {
      console.error('Heart atlas registration check failed', alignment);
      showToast('The heart atlas did not align with the model. Your previous viewer state was restored.');
      cleanupEntry(before, createdHere);
      return false;
    }
    /* This is an exclusive viewing mode: its own heart and optional skeleton
       context replace the layer selection only for as long as the panel is open. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    state.layers.heart = true;
    state.layerOpacity = { ...(state.layerOpacity || {}), heart: 1 };
    setHostHeartHidden(true);
    applyLayers();
    state.heartAtlasOn = true;
    state.atlasTick = (t) => {
      try { atlas.update(t); }
      catch (error) {
        state.atlasTick = null;
        console.error('Heart atlas animation stopped; closing the mode.', error);
        showToast('The heart atlas stopped after an error. The 3D viewer is still running.');
        exitHeartAtlas();
      }
    };
    saved = before;
    panel.hidden = false;
    setDockMode(true);
    toggle.setAttribute('aria-pressed', 'true');
    $('ha-context').checked = false;
    syncControls();
    onPresetChanged();
    showInfo(null);
    bindPicking();
    frameHeart();
    notifyLayersChanged();
    $('ha-close').focus();
    return true;
  } catch (error) {
    console.error('Heart atlas entry failed; restoring the viewer.', error);
    cleanupEntry(before, createdHere);
    showToast(loadFailureMessage());
    return false;
  } finally {
    state.heartAtlasLoading = false;
    setBusy(false);
  }
}

export function exitHeartAtlas() {
  if (!state.heartAtlasOn && !saved) return;
  const before = saved;
  saved = null;
  cleanupEntry(before);
}

export const heartAtlasPanel = () => panel;

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  const home = $('stageHome');
  const dock = $('viewerDock');
  if (!home || !dock) return;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'heartAtlasToggle';
  toggle.className = 'heart-atlas-toggle';
  toggle.setAttribute('aria-controls', 'heartAtlasPanel');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-busy', 'false');
  toggle.textContent = 'Heart atlas';
  toggle.onclick = () => {
    if (state.heartAtlasOn) exitHeartAtlas();
    else void enterHeartAtlas().catch((error) => {
      console.error('Heart atlas toggle failed.', error);
      showToast(loadFailureMessage());
    });
  };
  dock.appendChild(toggle);
  window.__osteo = window.__osteo || {};
  Object.assign(window.__osteo, { enterHeartAtlas, exitHeartAtlas, heartAtlasOn: () => !!state.heartAtlasOn });
}
