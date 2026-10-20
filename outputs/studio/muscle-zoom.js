/*
 * Muscle zoom
 *
 * Tap a skeletal muscle, then "Zoom inside" on its selection card: the muscle itself (the model's own mesh), then
 * the slide's "Organization of muscle" walked down level by level — fascicle, muscle fiber, myofibril, sarcomere —
 * and, from the fiber, the neuromuscular junction. Every label is a 2026 slide term with its page and, where Revise
 * has the box, an "In Revise" link (outputs/muscle-zoom.js; work/muscle-zoom-check.mjs). The levels below the
 * muscle are procedural (outputs/muscle/zoom-scene.js), reached by a dynamic import like the two atlas modes and
 * precached in the shell, so the mode opens offline.
 *
 * It is the third atlas mode beside studio/heart-atlas.js and studio/limb-atlas.js and shares their machinery: an
 * exclusive view with a snapshot taken on entry and given back on exit, the same dock, and the same
 * `window.__osteo.exitHeartAtlas` hook the other viewer modes call before they start (state.heartAtlasOn means "an
 * atlas mode is open"; state.muscleZoomOn says which). See docs/TRAPS.md, "The muscle zoom mode".
 *
 * Nothing runs at module scope; init() wires the selection card.
 */
import { $, els, state, prefersStill } from './imports.js';
import { applyLayers } from './live-physiology.js';
import { showToast } from './modes-and-bridge.js';
import { frameWorldBox, restoreSnapshot, takeSnapshot } from './heart-atlas.js';
import { LEVELS, LABELS, CONTRACTION, ZOOM_SOURCES, levelById } from '../muscle-zoom.js?v=1';

let zoom = null;            /* createMuscleZoom() result, built once */
let saved = null;           /* the snapshot taken on entry */
let panel = null, tags = null, zoomBtn = null, busy = false;
let whole = null;           /* the cloned muscle, rebuilt on each entry */
let muscleName = '';
let current = 'whole', selected = null;
let tween = null, playing = false, playT0 = 0;

const notifyLayersChanged = () => window.dispatchEvent(new CustomEvent('osteo:layers'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* A failed dynamic import() is remembered for the life of the page; a retry asks for a new URL (the first
   specifier stays the one the service worker precaches). See the heart atlas for the story. */
let sceneModule = null, importFailures = 0;
async function loadSceneModule() {
  if (sceneModule) return sceneModule;
  try {
    sceneModule = importFailures === 0 ? await import('../muscle/zoom-scene.js?v=1') : await import(`../muscle/zoom-scene.js?v=1&retry=${importFailures}`);
  } catch (error) { importFailures += 1; throw error; }
  return sceneModule;
}

/* A skeletal muscle: a mesh of the muscle layer in its Muscles chip, not a tendon, fascia or bursa. */
function selectedMuscle() {
  const lit = (state.selectionMeshes && state.selectionMeshes.length ? state.selectionMeshes : [state.selectionAnchor]).filter(Boolean);
  const ms = lit.filter((m) => m.userData && m.userData.layerKey === 'muscle' && (!(m.userData.systems || []).length || m.userData.systems.includes('muscle')));
  return ms.length ? ms : null;
}

/* ---- the selection card's button ---- */
function paintZoomButton() {
  if (!zoomBtn) return;
  zoomBtn.hidden = !selectedMuscle() || !!state.muscleZoomOn;
}

function setBusy(on) {
  busy = on;
  if (!zoomBtn) return;
  zoomBtn.disabled = on;
  zoomBtn.setAttribute('aria-busy', String(on));
  zoomBtn.textContent = on ? 'Loading the zoom…' : 'Zoom inside';
}

function setDockMode(on) {
  $('viewerDock')?.classList.toggle('heart-atlas-open', on);
  $('viewerDock')?.classList.toggle('muscle-zoom-open', on);
  $('stageHome')?.classList.toggle('heart-atlas-open', on);
}

/* ---- the panel ---- */
function panelHtml() {
  return `
  <div class="ha-head"><strong>Muscle zoom</strong><span>from the slides</span><button type="button" id="mz-close" aria-label="Close muscle zoom">Close</button></div>
  <div class="ha-scroll">
    <nav class="mz-path" id="mz-path" aria-label="Levels"></nav>
    <div class="ha-row mz-nav"><button type="button" id="mz-out">← Zoom out</button><button type="button" id="mz-in" class="primary">Zoom in →</button><button type="button" id="mz-side" hidden>Neuromuscular junction →</button></div>
    <p class="mz-level"><strong id="mz-title"></strong> <small id="mz-cite"></small></p>
    <section id="mz-contract" class="mz-contract" hidden>
      <div class="mz-ends"><span id="mz-end0"></span><span id="mz-end1"></span></div>
      <input type="range" id="mz-slider" min="0" max="100" value="0" aria-label="Relaxed to contracted">
      <div class="ha-row"><button type="button" id="mz-play" aria-pressed="false">Play</button></div>
      <div class="sel-revise mz-revise" data-mz-revise="contract" hidden></div>
    </section>
    <ol class="mz-labels" id="mz-labels" aria-label="Labels"></ol>
    <article class="ha-info mz-info" id="mz-info" aria-live="polite" hidden><strong id="mz-infoTitle"></strong><p id="mz-infoNote"></p><small id="mz-infoCite"></small><div class="sel-revise mz-revise" data-mz-revise="label" hidden></div></article>
    <p class="ha-credit">The muscle is the model's own (BodyParts3D, CC BY-SA 2.1 JP). The levels inside it are drawn for this app, schematic, not to scale. Labels and notes are the 2026 HSS2011 and ABCT2326 slides' words. <a href="./THIRD-PARTY-NOTICES.txt" target="_blank" rel="noopener">Notices</a></p>
  </div>`;
}

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'muscleZoomPanel';
  panel.className = 'heart-atlas-panel muscle-zoom-panel';
  panel.setAttribute('aria-label', 'Muscle zoom controls');
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('viewerDock').appendChild(panel);
  $('mz-close').onclick = () => exitMuscleZoom();
  panel.onkeydown = (event) => { if (event.key === 'Escape') { event.preventDefault(); exitMuscleZoom(); } };
  $('mz-in').onclick = () => { const n = levelById(current)?.next; if (n) goTo(n); };
  $('mz-side').onclick = () => { const s = levelById(current)?.side; if (s) goTo(s); };
  $('mz-out').onclick = () => { const p = parentOf(current); if (p) goTo(p, true); };
  $('mz-slider').oninput = () => { stopPlay(); zoom.setContraction(Number($('mz-slider').value) / 100); };
  $('mz-play').onclick = () => { if (playing) stopPlay(); else startPlay(); };
  $('mz-end0').textContent = CONTRACTION.ends[0];
  $('mz-end1').textContent = CONTRACTION.ends[1];
  tags = document.createElement('div');
  tags.id = 'muscleZoomTags';
  tags.className = 'mz-tags';
  tags.hidden = true;
  els.stage.appendChild(tags);
}

const parentOf = (id) => { const lv = levelById(id); return lv && lv.back ? lv.back : (LEVELS.find((l) => l.next === id) || {}).id || null; };
const pathTo = (id) => { const out = []; for (let at = id; at; at = parentOf(at)) out.unshift(at); return out; };
const titleOf = (id) => (id === 'whole' ? muscleName : levelById(id).title);
const citeLine = (cite) => (cite || []).map((c) => `${ZOOM_SOURCES[c.ref]} p${c.page}`).filter((v, i, a) => a.indexOf(v) === i).join(' · ');

/* The study half paints Revise links for the boxes its week has taught; the studio only says which boxes. */
function reviseSlot(el, boxes) {
  if (!el) return;
  el.hidden = true; el.innerHTML = '';
  if (boxes && boxes.length) window.dispatchEvent(new CustomEvent('osteo:revise-slot', { detail: { el, boxes } }));
}

function paintPanel() {
  const lv = levelById(current);
  const path = pathTo(current);
  $('mz-path').innerHTML = path.map((id) => `<button type="button" data-mz-level="${id}" ${id === current ? 'aria-current="true" class="active"' : ''}>${esc(titleOf(id))}</button>`).join('<span aria-hidden="true">›</span>');
  $('mz-path').querySelectorAll('[data-mz-level]').forEach((b) => { b.onclick = () => { if (b.dataset.mzLevel !== current) goTo(b.dataset.mzLevel, true); }; });
  $('mz-in').hidden = !lv.next;
  $('mz-in').textContent = lv.next ? `Zoom in: ${levelById(lv.next).title} →` : '';
  $('mz-side').hidden = !lv.side;
  if (lv.side) $('mz-side').textContent = `${levelById(lv.side).title} →`;
  $('mz-out').hidden = !parentOf(current);
  $('mz-title').textContent = titleOf(current);
  $('mz-cite').textContent = current === 'whole' ? 'the model’s own muscle' : citeLine(lv.cite);
  const contract = CONTRACTION.levels.includes(current);
  $('mz-contract').hidden = !contract;
  if (contract) reviseSlot(panel.querySelector('[data-mz-revise="contract"]'), CONTRACTION.revise);
  else stopPlay();
  const labels = LABELS[current] || [];
  $('mz-labels').innerHTML = labels.map((x, i) => `<li><button type="button" data-mz-label="${x.id}" aria-pressed="false"><span class="mz-n">${i + 1}</span>${esc(x.l)}</button></li>`).join('');
  $('mz-labels').querySelectorAll('[data-mz-label]').forEach((b) => { b.onclick = () => selectLabel(b.dataset.mzLabel); });
  tags.innerHTML = labels.map((x, i) => `<button type="button" class="mz-tag" data-mz-tag="${x.id}" tabindex="-1"><span class="mz-n">${i + 1}</span><span class="mz-name">${esc(x.l)}</span></button>`).join('');
  tags.querySelectorAll('[data-mz-tag]').forEach((b) => { b.onclick = () => selectLabel(b.dataset.mzTag); });
  selectLabel(null);
}

function setHighlight(part, on) {
  if (!part || current === 'whole') return;
  for (const o of zoom.meshesOf(current, part)) {
    const m = o.material;
    if (m && m.emissive) { m.emissive.setHex(on ? 0x1eb9a6 : 0x000000); m.emissiveIntensity = on ? 0.55 : 1; }
  }
}

function selectLabel(id) {
  if (selected) setHighlight(selected, false);
  selected = id && selected !== id ? id : null;
  const x = selected ? (LABELS[current] || []).find((l) => l.id === selected) : null;
  if (x) setHighlight(x.id, true);
  panel.querySelectorAll('[data-mz-label]').forEach((b) => { const on = b.dataset.mzLabel === selected; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  tags.querySelectorAll('[data-mz-tag]').forEach((b) => b.classList.toggle('active', b.dataset.mzTag === selected));
  const info = $('mz-info');
  info.hidden = !x;
  if (!x) return;
  $('mz-infoTitle').textContent = x.l;
  $('mz-infoNote').textContent = x.note ? `“${x.note}”` : '';
  $('mz-infoNote').hidden = !x.note;
  $('mz-infoCite').textContent = citeLine(x.cite);
  reviseSlot(info.querySelector('[data-mz-revise="label"]'), x.revise);
}

/* ---- levels and the camera ---- */
const VIEW = { whole: null, organisation: [0.55, 0.35, 1], fascicle: [0.7, 0.35, 1], fiber: [0.7, 0.4, 1], myofibril: [0.25, 0.35, 1], sarcomere: [0.35, 0.45, 1], nmj: [0.25, 0.75, 1] };

function levelBox(id) { return id === 'whole' ? new state.THREE.Box3().setFromObject(whole) : zoom.box(id); }

/* Where frameWorldBox would put the camera, without leaving it there. */
function framePose(id) {
  const cam = state.camera, ctl = state.controls;
  const p = cam.position.clone(), t = ctl.target.clone();
  const dir = VIEW[id] ? new state.THREE.Vector3(...VIEW[id]).applyQuaternion(zoom.root.quaternion) : null;
  frameWorldBox(levelBox(id), dir, id === 'whole' ? 1.6 : 1.15);
  const out = { position: cam.position.clone(), target: ctl.target.clone() };
  cam.position.copy(p); ctl.target.copy(t); ctl.update();
  return out;
}

/* The levels are built along x. On a stage taller than it is wide (a tablet held upright, beside the dock) they
   stand up, so a fiber or a sarcomere fills the stage instead of a strip across it. Not the junction: its fiber
   lies under the nerve. */
function orientLevels(id) {
  /* the part of the stage the dock leaves: on a phone the dock lies over its lower half */
  const sr = els.stage.getBoundingClientRect(), dr = $('viewerDock')?.getBoundingClientRect();
  const over = dr && dr.height > 0 && Math.min(sr.right, dr.right) - Math.max(sr.left, dr.left) > sr.width * 0.6 && dr.top > sr.top && dr.top < sr.bottom;
  const visH = over ? dr.top - sr.top : sr.height;
  const upright = id !== 'nmj' && visH > sr.width * 1.3;
  zoom.root.rotation.set(0, 0, upright ? Math.PI / 2 : 0);
}

function showLevel(id) {
  current = id;
  orientLevels(id);
  whole.visible = id === 'whole';
  zoom.show(id === 'whole' ? null : id);
  paintPanel();
}

/* Zoom: fly into the level shown, swap, then settle on the next from further out — or the reverse going out. */
function goTo(id, out = false) {
  if (!zoom || id === current) return;
  const still = prefersStill();
  if (still) { showLevel(id); const p = framePose(id); state.camera.position.copy(p.position); state.controls.target.copy(p.target); state.controls.update(); return; }
  const cam = state.camera, ctl = state.controls;
  const from = { position: cam.position.clone(), target: ctl.target.clone() };
  const dive = { target: from.target.clone(), position: from.target.clone().add(from.position.clone().sub(from.target).multiplyScalar(out ? 2.2 : 0.3)) };
  tween = { t0: performance.now(), dur: 320, from, to: dive, then: () => {
    showLevel(id);
    const end = framePose(id);
    const start = { target: end.target.clone(), position: end.target.clone().add(end.position.clone().sub(end.target).multiplyScalar(out ? 0.3 : 2.4)) };
    cam.position.copy(start.position); ctl.target.copy(start.target); ctl.update();
    tween = { t0: performance.now(), dur: 420, from: start, to: end, then: null };
  } };
}

function stepTween(now) {
  if (!tween) return;
  const k = Math.min(1, (now - tween.t0) / tween.dur), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
  state.camera.position.lerpVectors(tween.from.position, tween.to.position, e);
  state.controls.target.lerpVectors(tween.from.target, tween.to.target, e);
  state.controls.update();
  if (k >= 1) { const then = tween.then; tween = null; if (then) then(); }
}

function startPlay() {
  if (prefersStill()) return;
  playing = true; playT0 = performance.now() - Math.acos(1 - 2 * zoom.contraction) * 1600 / Math.PI; $('mz-play').textContent = 'Stop'; $('mz-play').setAttribute('aria-pressed', 'true');
}
function stopPlay() {
  playing = false;
  if (panel) { $('mz-play').textContent = 'Play'; $('mz-play').setAttribute('aria-pressed', 'false'); }
}

/* The tags follow their parts on screen. */
function placeTags() {
  if (!tags || tags.hidden || current === 'whole') { if (tags) tags.querySelectorAll('.mz-tag').forEach((t) => { t.style.display = 'none'; }); return; }
  const canvas = state.renderer.domElement, w = canvas.clientWidth, h = canvas.clientHeight;
  const at = new Map(zoom.anchors(current).map((a) => [a.id, a.pos]));
  tags.querySelectorAll('[data-mz-tag]').forEach((t) => {
    const p = at.get(t.dataset.mzTag);
    if (!p) { t.style.display = 'none'; return; }
    const v = p.clone().project(state.camera);
    if (v.z > 1 || v.z < -1 || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05) { t.style.display = 'none'; return; }
    t.style.display = '';
    let x = (v.x + 1) / 2 * w;
    /* a name that would run off the right edge goes on the left of its number */
    const flip = x + t.offsetWidth > w - 4;
    t.classList.toggle('flip', flip);
    if (flip) x -= t.offsetWidth - 18;
    t.style.transform = `translate(${x.toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px)`;
  });
}

function tick(t) {
  const now = performance.now();
  stepTween(now);
  if (playing) {
    const c = (1 - Math.cos((now - playT0) / 1000 * Math.PI / 1.6)) / 2;
    zoom.setContraction(c);
    $('mz-slider').value = String(Math.round(c * 100));
  }
  zoom.update(t, prefersStill());
  placeTags();
}

/* ---- tapping a part in 3D picks its label ---- */
let unbindPicking = null;
function bindPicking() {
  if (unbindPicking) return;
  const THREE = state.THREE, ray = new THREE.Raycaster(), p = new THREE.Vector2(), canvas = state.renderer.domElement;
  let down = null;
  const isPick = (e) => e.target === canvas && e.isPrimary && e.button === 0;
  const dn = (e) => { down = isPick(e) ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null; };
  const up = (e) => {
    if (!isPick(e) || !state.muscleZoomOn || !down || e.pointerId !== down.id || current === 'whole') { down = null; return; }
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = canvas.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const hit = ray.intersectObjects(zoom.pickables(current), false).find((h) => h.object.userData.mzPart);
    if (hit) selectLabel(hit.object.userData.mzPart);
  };
  const cancel = () => { down = null; };
  canvas.addEventListener('pointerdown', dn);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', cancel);
  unbindPicking = () => {
    canvas.removeEventListener('pointerdown', dn);
    canvas.removeEventListener('pointerup', up);
    canvas.removeEventListener('pointercancel', cancel);
    unbindPicking = null;
  };
}

/* The model's own muscle, cloned in place: the original stays where it is, hidden with its layer. */
function cloneMuscle(meshes) {
  const THREE = state.THREE, g = new THREE.Group();
  g.name = 'muscleZoomWhole';
  const material = new THREE.MeshStandardMaterial({ color: 0xb5484e, roughness: 0.6 });
  for (const m of meshes) {
    m.updateWorldMatrix(true, false);
    const c = new THREE.Mesh(m.geometry, material);
    c.matrixAutoUpdate = false;
    c.matrix.copy(m.matrixWorld);
    g.add(c);
  }
  g.userData.dispose = () => material.dispose();
  return g;
}

function cleanupEntry(snapshot) {
  const returnFocus = !!panel && panel.contains(document.activeElement);
  state.heartAtlasOn = false;
  state.muscleZoomOn = false;
  state.atlasTick = null;
  tween = null; stopPlay();
  if (unbindPicking) unbindPicking();
  if (zoom) { if (selected) setHighlight(selected, false); selected = null; zoom.root.removeFromParent(); zoom.show(null); }
  if (whole) { whole.removeFromParent(); whole.userData.dispose(); whole = null; }
  restoreSnapshot(snapshot);
  if (snapshot && state.scene && state.controls) { applyLayers(); notifyLayersChanged(); }
  if (panel) panel.hidden = true;
  if (tags) tags.hidden = true;
  setDockMode(false);
  paintZoomButton();
  if (returnFocus && zoomBtn && !zoomBtn.hidden) zoomBtn.focus();
}

export async function enterMuscleZoom() {
  if (state.muscleZoomOn) return true;
  const meshes = selectedMuscle();
  if (!meshes) { showToast('Tap a muscle first.'); return false; }
  if (state.heartAtlasOn) window.__osteo?.exitHeartAtlas?.(); /* another atlas mode is open: close it first */
  if (state.heartAtlasOn || busy) return false;
  if (state.xray || state.focus) {
    showToast(state.xray ? 'Close Projection before zooming inside the muscle.' : 'Close the focused lesson before zooming inside the muscle.');
    return false;
  }
  if (!state.scene || !state.camera || !state.controls || !state.renderer) return false;
  setBusy(true);
  state.heartAtlasLoading = true;
  let before = null;
  try {
    muscleName = $('selectedName')?.textContent?.trim() || 'Muscle';
    before = takeSnapshot();
    buildPanel();
    if (!zoom) zoom = (await loadSceneModule()).createMuscleZoom(state.THREE);
    whole = cloneMuscle(meshes);
    state.scene.add(whole);
    /* the levels sit where the muscle is, about its size */
    const box = new state.THREE.Box3().setFromObject(whole), size = box.getSize(new state.THREE.Vector3());
    zoom.root.position.copy(box.getCenter(new state.THREE.Vector3()));
    zoom.root.scale.setScalar(Math.max(0.05, Math.max(size.x, size.y, size.z) / 15));
    state.scene.add(zoom.root);
    zoom.setContraction(0);
    $('mz-slider').value = '0';
    /* An exclusive viewing mode: every layer off for as long as the panel is open; the snapshot gives it all back. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    applyLayers();
    notifyLayersChanged();
    state.heartAtlasOn = true; state.muscleZoomOn = true;
    state.atlasTick = (t) => {
      try { tick(t); }
      catch (error) {
        state.atlasTick = null;
        console.error('Muscle zoom stopped; closing the mode.', error);
        showToast('The muscle zoom stopped after an error. The 3D viewer is still running.');
        exitMuscleZoom();
      }
    };
    saved = before;
    panel.hidden = false; tags.hidden = false;
    setDockMode(true);
    paintZoomButton();
    /* "Zoom inside" means inside: start framed on the tapped muscle and fly straight into its organisation.
       The muscle stays the first step of the path, so Zoom out goes back to it. */
    showLevel('whole');
    frameWorldBox(levelBox('whole'), null, 1.6);
    goTo('organisation');
    bindPicking();
    $('mz-in').focus();
    return true;
  } catch (error) {
    console.error('Muscle zoom entry failed; restoring the viewer.', error);
    cleanupEntry(before);
    showToast(typeof navigator !== 'undefined' && navigator.onLine === false
      ? 'Connect once to download the muscle zoom for offline use.'
      : 'The muscle zoom could not open. Your viewer has been restored; try again.');
    return false;
  } finally {
    state.heartAtlasLoading = false;
    setBusy(false);
  }
}

export function exitMuscleZoom() {
  if (!state.muscleZoomOn && !saved) return;
  const before = saved;
  saved = null;
  cleanupEntry(before);
}

/* Runs after the limb vessels' init, whose exit hook it wraps. */
export function init() {
  const card = $('selectedCard');
  if (!card) return;
  zoomBtn = document.createElement('button');
  zoomBtn.type = 'button';
  zoomBtn.id = 'muscleZoomBtn';
  zoomBtn.className = 'primary muscle-zoom-btn';
  zoomBtn.hidden = true;
  zoomBtn.setAttribute('aria-controls', 'muscleZoomPanel');
  zoomBtn.textContent = 'Zoom inside';
  zoomBtn.onclick = () => { void enterMuscleZoom().catch((error) => { console.error('Muscle zoom failed.', error); }); };
  const revise = $('selectedRevise');
  if (revise) card.insertBefore(zoomBtn, revise); else card.appendChild(zoomBtn);
  const name = $('selectedName');
  if (name && typeof MutationObserver === 'function') new MutationObserver(paintZoomButton).observe(name, { childList: true, characterData: true, subtree: true });
  window.__osteo = window.__osteo || {};
  const prevExit = window.__osteo.exitHeartAtlas;
  Object.assign(window.__osteo, {
    enterMuscleZoom, exitMuscleZoom, muscleZoomOn: () => !!state.muscleZoomOn,
    /* the viewer's other modes call this before they start; whichever atlas is open closes */
    exitHeartAtlas: () => { if (state.muscleZoomOn) exitMuscleZoom(); else if (prevExit) prevExit(); },
  });
}
