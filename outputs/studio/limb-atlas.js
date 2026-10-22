/*
 * Limb vessels
 *
 * BetterHeart's arm and leg vessel pages as a mode of the explorer: blood-flow dots along every vessel, the
 * whole course of a tapped vessel lit on both sides, camera regions along each limb, and three peripheral
 * interventions on the leg. The scene (outputs/limb/limb.js) is a pair of limb-frame groups parented to the
 * circulatory layer's `root`; the vessels themselves are the explorer's own meshes, so nothing is drawn twice.
 *
 * It is the second atlas mode, beside studio/heart-atlas.js, and shares its machinery: an exclusive layer
 * mode with a transactional entry, the same dock, the same `window.__osteo.exitHeartAtlas` hook that the other
 * viewer modes call before they start (state.heartAtlasOn means "an atlas mode is open"; state.limbAtlasOn says
 * which). See docs/TRAPS.md, "The limb vessels mode".
 *
 * Nothing runs at module scope; init() wires the button.
 */
import { $, state } from './imports.js';
import { applyLayers, meshOn, setLayerChips } from './live-physiology.js';
import { showToast } from './modes-and-bridge.js';
import { frameWorldBox, restoreSnapshot, takeSnapshot } from './heart-atlas.js';

const CIRC_FILE = './assets/dolasim.glb';
let limb = null;           // createLimbAtlas() result, built once
let saved = null;          // the snapshot taken on entry
let panel = null, toggle = null, busy = false, controlsWired = false;
let onPointerUp = null;
let circ = null, groups = new Map(), selectedKey = null, armSide = 'R', lastArmRegion = null, vesselGroups = null;

function setBusy(on) {
  busy = on;
  if (!toggle) return;
  toggle.disabled = on;
  toggle.setAttribute('aria-busy', String(on));
  toggle.textContent = on ? 'Loading limb vessels…' : 'Limb vessels';
}

function setDockMode(on) {
  $('viewerDock')?.classList.toggle('heart-atlas-open', on);
  $('stageHome')?.classList.toggle('heart-atlas-open', on);
}

const notifyLayersChanged = () => window.dispatchEvent(new CustomEvent('osteo:layers'));

/* A failed dynamic import() is remembered by the browser for the life of the page; a retry asks for a new URL
   (the first specifier stays the one the service worker precaches). See the heart atlas for the story. */
let limbModule = null, importFailures = 0;
async function loadLimbModule() {
  if (limbModule) return limbModule;
  try {
    limbModule = importFailures === 0 ? await import('../limb/limb.js?v=1') : await import(`../limb/limb.js?v=1&retry=${importFailures}`);
  } catch (error) { importFailures += 1; throw error; }
  return limbModule;
}

function loadFailureMessage() {
  if (importFailures >= 2 && !(typeof navigator !== 'undefined' && navigator.onLine === false)) return 'The limb vessels still could not load. Reload the page, then try again.';
  return typeof navigator !== 'undefined' && navigator.onLine === false
    ? 'Connect once to download the circulatory layer for offline use.'
    : 'The limb vessels could not load. Your viewer has been restored; try again.';
}

function panelHtml() {
  return `
  <div class="ha-head"><strong>Limb vessels</strong><button type="button" id="la-close" aria-label="Close limb vessels">Close</button></div>
  <div class="ha-scroll">
    <div class="ha-row" id="la-presets" role="group" aria-label="Scenario"></div>
    <label class="ha-check"><input type="checkbox" id="la-context"> Show the skeleton around the vessels</label>
    <div class="ha-shows"><label><input type="checkbox" id="la-flowArt" checked> Arterial flow</label><label><input type="checkbox" id="la-flowVein" checked> Venous flow</label></div>
    <div class="ha-row" id="la-regionsArm" role="group" aria-label="Arm regions"></div>
    <div class="ha-row" id="la-side" role="group" aria-label="Which arm"><button type="button" data-la-side="R" aria-pressed="true" class="active">Right arm</button><button type="button" data-la-side="L" aria-pressed="false">Left arm</button></div>
    <div class="ha-row" id="la-regionsLeg" role="group" aria-label="Leg regions"></div>
    <section id="la-procPanel" class="ha-proc" aria-label="Procedure" hidden>
      <div class="ha-row" id="la-devices" role="group" aria-label="Device"></div>
      <p class="ha-note" id="la-procHint"></p>
      <div class="ha-row"><button type="button" id="la-procPlay" aria-pressed="true">Pause</button><button type="button" id="la-procReplay">Replay</button></div>
      <input type="range" id="la-procScrub" min="0" max="1000" value="0" aria-label="Position in the procedure">
      <ol id="la-procSteps" class="ha-proc-steps" aria-label="Procedure steps"></ol>
      <p id="la-procCaption" class="ha-proc-caption" aria-live="polite"></p>
    </section>
    <article class="ha-info" aria-live="polite"><strong id="la-infoTitle"></strong><span id="la-infoCat"></span><p id="la-infoText"></p></article>
    <p class="ha-credit"><a href="./heart/MODEL-NOTICES.txt" target="_blank" rel="noopener">Model credits</a></p>
  </div>`;
}

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'limbAtlasPanel';
  panel.className = 'heart-atlas-panel';
  panel.setAttribute('aria-label', 'Limb vessels controls');
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('viewerDock').appendChild(panel);
  $('la-close').onclick = () => exitLimbAtlas();
  panel.onkeydown = (event) => { if (event.key === 'Escape') { event.preventDefault(); exitLimbAtlas(); } };
}

function showIntro(i) {
  $('la-infoTitle').textContent = i.title;
  $('la-infoCat').textContent = i.category;
  $('la-infoText').textContent = i.text;
}

/* The circulatory chips' opacity for the current scenario: the procedures ghost the vessels so the devices show. */
function applyLook() {
  const op = { ...(state.layerOpacity || {}) };
  delete op.arterial; delete op.venous;
  Object.assign(op, limb.PRESETS[limb.state.preset].opacity);
  state.layerOpacity = op;
  applyLayers();
  notifyLayersChanged();
}

function renderDevices() {
  const host = $('la-devices');
  host.textContent = '';
  for (const d of limb.devices()) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = d.label; b.className = d.on ? 'active' : ''; b.setAttribute('aria-pressed', String(d.on));
    b.onclick = () => { limb.setDevice(d.id); renderDevices(); };
    host.append(b);
  }
}

function syncControls() {
  const S = limb.state, p = limb.PRESETS[S.preset];
  for (const b of panel.querySelectorAll('[data-la-preset]')) {
    const on = b.dataset.laPreset === S.preset;
    b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
  }
  $('la-procPanel').hidden = !p.proc;
  $('la-flowArt').checked = S.flow.art; $('la-flowVein').checked = S.flow.vein;
  if (p.proc) renderDevices();
}

function choosePreset(name) {
  limb.setPreset(name);
  syncControls();
  applyLook();
  showIntro(limb.intro());
  selectedKey = null; limb.highlight(null);
}

function wireControls() {
  const presets = $('la-presets');
  presets.innerHTML = Object.entries(limb.PRESETS).map(([k, p]) => `<button type="button" data-la-preset="${k}" aria-pressed="false">${p.label}</button>`).join('');
  presets.querySelectorAll('[data-la-preset]').forEach((b) => { b.onclick = () => choosePreset(b.dataset.laPreset); });
  $('la-flowArt').oninput = () => limb.setFlow('art', $('la-flowArt').checked);
  $('la-flowVein').oninput = () => limb.setFlow('vein', $('la-flowVein').checked);
  $('la-context').oninput = () => { setLayerChips('skeleton', $('la-context').checked); applyLayers(); notifyLayersChanged(); };
  for (const [page, host] of [['upper', 'la-regionsArm'], ['lower', 'la-regionsLeg']]) {
    $(host).innerHTML = limb.regions(page).map((r) => `<button type="button" data-la-region="${page}:${r.key}">${r.label}</button>`).join('');
  }
  panel.querySelectorAll('[data-la-region]').forEach((b) => { b.onclick = () => focusRegion(...b.dataset.laRegion.split(':')); });
  panel.querySelectorAll('[data-la-side]').forEach((b) => {
    b.onclick = () => {
      armSide = b.dataset.laSide;
      panel.querySelectorAll('[data-la-side]').forEach((o) => { const on = o === b; o.classList.toggle('active', on); o.setAttribute('aria-pressed', String(on)); });
      /* the side takes effect at once: the arm region last framed moves to this arm. The arch is midline and
         looks the same from either side, so then (or before any region) it frames the upper arm. */
      const sided = limb.regions('upper').map((r) => r.key).filter((k) => limb.regionBox('upper', k, 'R').min[0] !== limb.regionBox('upper', k, 'L').min[0]);
      focusRegion('upper', sided.includes(lastArmRegion) ? lastArmRegion : (sided.includes('upper') ? 'upper' : sided[0]));
    };
  });
  controlsWired = true;
}

/* Frame one of BetterHeart's camera regions: a box in a limb's own frame, moved into the world. */
function focusRegion(page, key) {
  if (page === 'upper') lastArmRegion = key;
  const r = limb.regionBox(page, key, armSide);
  if (!r || !state.THREE) return;
  const T = state.THREE;
  const g = limb.frames[page];
  g.updateWorldMatrix(true, false);
  const box = new T.Box3(new T.Vector3(...r.min), new T.Vector3(...r.max)).applyMatrix4(g.matrixWorld);
  const dir = new T.Vector3(...r.dir).transformDirection(g.matrixWorld);
  frameWorldBox(box, dir, 1.25);
}

/* ---- tapping a vessel: its whole course, both sides ---- */
function vesselMeshes() {
  return circ.meshes.filter((m) => (m.userData.systems || []).some((k) => k === 'arterial' || k === 'venous'));
}

function selectVessel(mesh) {
  const g = groups.get(mesh);
  if (!g) return;
  if (selectedKey === g.key) { selectedKey = null; limb.highlight(null); showIntro(limb.intro()); return; }
  selectedKey = g.key;
  limb.highlight(vesselMeshes().filter((m) => groups.get(m) && groups.get(m).key === g.key && meshOn(m)));
  const artery = (mesh.userData.systems || []).includes('arterial');
  showIntro({ category: artery ? 'Artery' : 'Vein', title: g.title, text: 'Lit in green along its whole course on both sides, from origin to end. Tap it again to clear.' });
}

function bindPicking() {
  if (onPointerUp) return;
  const THREE = state.THREE;
  const ray = new THREE.Raycaster(), p = new THREE.Vector2();
  let down = null;
  const canvas = state.renderer.domElement;
  const isPick = (e) => e.target === canvas && e.isPrimary && e.button === 0;
  const dn = (e) => { down = isPick(e) ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null; };
  onPointerUp = (e) => {
    if (!isPick(e) || !limb || !state.limbAtlasOn || !down || e.pointerId !== down.id) { down = null; return; }
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = canvas.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const hit = ray.intersectObjects(vesselMeshes().filter((m) => meshOn(m) && m.visible), false)[0];
    if (!hit) return;
    e.stopPropagation();
    selectVessel(hit.object);
  };
  const cancel = () => { down = null; };
  canvas.addEventListener('pointerdown', dn);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', cancel);
  bindPicking.off = () => {
    canvas.removeEventListener('pointerdown', dn);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', cancel);
    onPointerUp = null;
  };
}

function cleanupEntry(snapshot, disposeLimb = false) {
  const returnFocus = !!panel && panel.contains(document.activeElement);
  state.heartAtlasOn = false;
  state.limbAtlasOn = false;
  state.atlasTick = null;
  if (bindPicking.off) bindPicking.off();
  if (limb) {
    try { limb.detach(); } catch (error) { console.error('Limb vessels detach failed', error); }
  }
  selectedKey = null;
  restoreSnapshot(snapshot);
  if (snapshot && state.scene && state.controls) { applyLayers(); notifyLayersChanged(); }
  if (panel) panel.hidden = true;
  if (toggle) toggle.setAttribute('aria-pressed', 'false');
  setDockMode(false);
  if (disposeLimb && limb) {
    try { limb.dispose(); } catch (error) { console.error('Limb vessels disposal failed', error); }
    limb = null; controlsWired = false;
  }
  if (returnFocus && toggle) toggle.focus();
}

export async function enterLimbAtlas() {
  if (state.limbAtlasOn) return true;
  if (state.heartAtlasOn) window.__osteo?.exitHeartAtlas?.(); /* the heart atlas is the other mode: close it first */
  if (state.heartAtlasOn || busy) return false;
  if (state.xray) {
    showToast('Close Projection before opening the limb vessels.');
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
    if (state.xray) { showToast('Close Projection before opening the limb vessels.'); return false; }
    before = takeSnapshot();
    buildPanel();
    if (!limb) {
      const mod = await loadLimbModule();
      limb = await mod.createLimbAtlas();
      vesselGroups = mod.vesselGroups;
      createdHere = true;
    }
    if (!controlsWired) wireControls();
    const ok = await window.__osteo.showSystem('circulatory', CIRC_FILE, { atlasEntry: true, failureMessage: loadFailureMessage() });
    if (!ok) { cleanupEntry(before, createdHere); return false; }
    circ = state.extraModels.circulatory;
    if (!circ) throw new Error('The circulatory layer did not load.');
    groups = vesselGroups(vesselMeshes());
    limb.setHost({ camera: state.camera, controls: state.controls }, showIntro);
    limb.attach(circ.root);
    circ.root.updateMatrixWorld(true);
    state.scene.updateMatrixWorld(true);
    /* An exclusive viewing mode: the arteries and veins (and, if asked, the skeleton) replace the layer
       selection for as long as the panel is open; the snapshot gives it all back. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    state.layers.arterial = true; state.layers.venous = true;
    $('la-context').checked = false;
    state.heartAtlasOn = true; state.limbAtlasOn = true;
    state.atlasTick = (t) => {
      try { limb.update(t); }
      catch (error) {
        state.atlasTick = null;
        console.error('Limb vessels animation stopped; closing the mode.', error);
        showToast('The limb vessels stopped after an error. The 3D viewer is still running.');
        exitLimbAtlas();
      }
    };
    saved = before;
    panel.hidden = false;
    setDockMode(true);
    toggle.setAttribute('aria-pressed', 'true');
    choosePreset(limb.state.preset);
    bindPicking();
    frameWorldBox(new state.THREE.Box3().setFromObject(circ.root), null, 1.25);
    $('la-close').focus();
    return true;
  } catch (error) {
    console.error('Limb vessels entry failed; restoring the viewer.', error);
    cleanupEntry(before, createdHere);
    showToast(loadFailureMessage());
    return false;
  } finally {
    state.heartAtlasLoading = false;
    setBusy(false);
  }
}

export function exitLimbAtlas() {
  if (!state.limbAtlasOn && !saved) return;
  const before = saved;
  saved = null;
  cleanupEntry(before);
}

/* Runs after every part has evaluated -- and after the heart atlas's init, whose exit hook it wraps. */
export function init() {
  const home = $('stageHome'), dock = $('viewerDock');
  if (!home || !dock) return;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'limbAtlasToggle';
  toggle.className = 'heart-atlas-toggle limb-atlas-toggle';
  toggle.setAttribute('aria-controls', 'limbAtlasPanel');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-busy', 'false');
  toggle.textContent = 'Limb vessels';
  toggle.onclick = () => {
    if (state.limbAtlasOn) exitLimbAtlas();
    else void enterLimbAtlas().catch((error) => { console.error('Limb vessels toggle failed.', error); showToast(loadFailureMessage()); });
  };
  ($('viewerModes') || dock).appendChild(toggle);
  window.__osteo = window.__osteo || {};
  const heartExit = window.__osteo.exitHeartAtlas;
  Object.assign(window.__osteo, {
    enterLimbAtlas, exitLimbAtlas, limbAtlasOn: () => !!state.limbAtlasOn,
    /* the viewer's other modes call this before they start; whichever atlas is open closes */
    exitHeartAtlas: () => { if (state.limbAtlasOn) exitLimbAtlas(); else if (heartExit) heartExit(); },
  });
}
