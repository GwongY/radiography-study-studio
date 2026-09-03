/*
 * What is under the tap
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STRUCTURE_MODELS, esc, ui } from './imports.js';
import { BODY_LAYERS, GHOST_OPACITY, layerState, renderLayerRail } from './subject.js';
import { read } from './storage-versioned-keys.js';
import { renderHiddenTray } from './hidden-tray.js';
import { renderOverlayCard } from './spatial-overlay-controls.js';
import { restoreStage } from './lesson-visuals.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { showView } from './small-ui-helpers.js';
import { renderViewerTools } from './viewer-tools.js';

/* ------------------------------------------------------------------ *
 * What is under the tap
 *
 * The viewer publishes the whole line of structures the ray passed through,
 * nearest first. This renders it, so reaching the right ventricle is reading
 * it off a list rather than guessing that tapping the sternum twice quickly
 * might eventually get there.
 * ------------------------------------------------------------------ */
function renderPickStack(entries) {
  const box = $$('pickStack');
  if (!box) return;
  if (!entries || entries.length < 2) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const at = Math.max(0, entries.findIndex((e) => e.current));
  box.classList.remove('hidden');
  box.innerHTML = `<div class="ph">${entries.length} in line here
      <button class="x" id="pickStackClose" aria-label="Dismiss">×</button></div>
    <ol>${entries.map((e) => `<li data-cur="${e.current ? 1 : 0}">
      <button data-pick="${e.index}"><span class="d">${e.index + 1}</span><span>${esc(e.name)}</span><span class="ly">${esc(e.layer)}</span></button>
      <button class="peel" data-hide="${e.index}" aria-label="Hide ${esc(e.name)}">hide</button>
    </li>`).join('')}</ol>
    <div class="pf">${at > 0
      ? `${at} structure${at === 1 ? '' : 's'} in front ghosted to expose it · <button class="peel" id="pickStackRestore">put them back</button>`
      : 'Nearest first. Tap any of them, or tap the model again in the same spot to step deeper.'}</div>`;
  box.querySelectorAll('[data-pick]').forEach((b) => {
    b.onclick = () => { if (window.__osteo && window.__osteo.pickFromStack) window.__osteo.pickFromStack(+b.dataset.pick); };
  });
  box.querySelectorAll('[data-hide]').forEach((b) => {
    b.onclick = () => { if (window.__osteo && window.__osteo.hideFromStack) window.__osteo.hideFromStack(+b.dataset.hide); };
  });
  const close = $$('pickStackClose');
  if (close) close.onclick = () => { if (window.__osteo && window.__osteo.clearPeel) window.__osteo.clearPeel(); box.classList.add('hidden'); };
  const restore = $$('pickStackRestore');
  if (restore) restore.onclick = () => { if (window.__osteo && window.__osteo.clearPeel) window.__osteo.clearPeel(); };
}

const XRAY_VIEWS = [['pa', 'PA'], ['ap', 'AP'], ['lat', 'Lateral']];
const XRAY_REGION_LIST = [['chest', 'Chest'], ['abdo', 'Abdomen'], ['pelvis', 'Pelvis'], ['hand', 'Hand'], ['body', 'Whole body']];
let xrayView = 'pa';
let xrayRegion = 'chest';

/* One subscription for the session. The viewer is booted lazily, so this is
   retried each time the tab is drawn until the module is actually there. */
function bindStackHook() {
  if (bindStackHook.done || !window.__osteo || !window.__osteo.setStackHook) return;
  window.__osteo.setStackHook(renderPickStack);
  bindStackHook.done = true;
}

function renderViewerTabs() {
  bindStackHook();
  $$('viewerTabs').innerHTML = [['3d', '3D skeleton'], ['xray', 'Projection']].map(([id, label]) =>
    `<button class="seg${ui.viewerTab === id ? ' active' : ''}" data-vtab="${esc(id)}">${esc(label)}</button>`).join('');
  $$('viewerTabs').querySelectorAll('[data-vtab]').forEach((b) => { b.onclick = () => { ui.viewerTab = b.dataset.vtab; renderViewerTabs(); }; });
  $$('viewerSkeletonPane').classList.toggle('hidden', ui.viewerTab !== '3d');
  $$('viewerXrayPane').classList.toggle('hidden', ui.viewerTab !== 'xray');
  if (ui.viewerTab === 'xray') enterProjection(); else leaveProjection();
}

/*
 * The tissue rail used to live here: one chip per layer, each carrying its
 * relative attenuation coefficient, so the beam could be sent through muscle or
 * organs as well as bone. It is gone, and so is the mixing it allowed.
 *
 * A projection is a bone film. Six soft-tissue layers at 0.10-0.30 against bone
 * at 1.00 do not read as a radiograph; they read as fog with a skeleton
 * somewhere behind it, and the exposure slider then spends its whole range
 * fighting them. enterXray now passes the beam through the skeleton alone and
 * restores the 3D tab's layers on the way out, so there is nothing here to
 * control and no way for an earlier browse to change what the film looks like.
 */
function renderXrayViews() {
  $$('xrayViews').innerHTML = XRAY_VIEWS.map(([id, label]) =>
    `<button class="seg${xrayView === id ? ' active' : ''}" data-xview="${esc(id)}">${esc(label)}</button>`).join('');
  $$('xrayViews').querySelectorAll('[data-xview]').forEach((b) => {
    b.onclick = () => { xrayView = b.dataset.xview; renderXrayViews(); if (window.__osteo) window.__osteo.xrayView(xrayView); };
  });
  $$('xrayRegions').innerHTML = XRAY_REGION_LIST.map(([id, label]) =>
    `<button class="seg${xrayRegion === id ? ' active' : ''}" data-xregion="${esc(id)}">${esc(label)}</button>`).join('');
  $$('xrayRegions').querySelectorAll('[data-xregion]').forEach((b) => {
    b.onclick = () => { xrayRegion = b.dataset.xregion; renderXrayViews(); if (window.__osteo) window.__osteo.xrayRegion(xrayRegion); };
  });
}

/* The projection borrows the same canvas the studio and the lessons use. */
async function enterProjection() {
  const mount = $$('xrayMount');
  if (!mount || !window.__osteo) return;
  renderXrayViews();
  const booted = await window.__osteo.boot();
  if (!booted) { mount.innerHTML = '<div class="emptybox">3D is unavailable, so the projection cannot be drawn.</div>'; return; }
  const stage = window.__osteo.stageEl();
  if (stage && stage.parentElement !== mount) mount.appendChild(stage);
  window.__osteo.resize();
  window.__osteo.enterXray();
  window.__osteo.xrayRegion(xrayRegion);
  window.__osteo.xrayView(xrayView);
  window.__osteo.xrayExposure(+$$('xrayExposure').value / 100);
  window.__osteo.resize();
  /* The Tools card has to be told: entering the projection suspends the
     section cut, and the card is what says so. */
  renderViewerTools();
}

export function leaveProjection() {
  if (!window.__osteo || !window.__osteo.inXray || !window.__osteo.inXray()) { restoreStage(); return; }
  window.__osteo.exitXray();
  restoreStage();
  window.__osteo.resize();
  renderViewerTools();
}
async function syncLayersToRail() {
  if (!window.__osteo || !window.__osteo.setLayer) return;
  if (window.__osteo.clearStudyFocus) window.__osteo.clearStudyFocus();
  for (const l of BODY_LAYERS) {
    const st = layerState[l.key] || 'off';
    const model = STRUCTURE_MODELS[l.key];
    if (st === 'off') { await window.__osteo.setLayer(l.key, false); continue; }
    const ok = await window.__osteo.setLayer(l.key, true, model ? model.file : null);
    if (ok) window.__osteo.setLayerOpacity(l.key, st === 'ghost' ? GHOST_OPACITY : 1);
  }
}

function bindViewerExtras() {
  if (bindViewerExtras.done) return;
  if (!window.__osteo || !window.__osteo.setHiddenHook) return;
  window.__osteo.setHiddenHook(renderHiddenTray);
  window.__osteo.setConceptHook(renderOverlayCard);
  const t = $$('hiddenToggle');
  if (t) t.onclick = () => {
    const tray = $$('hiddenTray');
    const open = tray.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  bindViewerExtras.done = true;
}

export function openViewer() {
  setActiveNav('viewer');
  renderViewerTabs();
  renderLayerRail();
  bindViewerExtras();
  renderHiddenTray();
  renderOverlayCard();
  const exp = $$('xrayExposure');
  if (exp && !exp.dataset.wired) {
    exp.dataset.wired = '1';
    exp.oninput = () => {
      const v = +exp.value / 100;
      $$('xrayExposureRead').innerHTML = v.toFixed(2) + '&times;';
      if (window.__osteo && window.__osteo.inXray()) window.__osteo.xrayExposure(v);
    };
  }
  /* A lesson may have left a study focus and other layers on. */
  syncLayersToRail();
  showView('viewerView');
}
