/*
 * What is under the tap
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc, ui } from './imports.js';
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
let projectionRequest = 0;
/* Pausing the atlas source is now a studio-side exit -- it restores the
   renderer globals and the controls the atlas borrowed -- so this half only
   asks. See studio/atlas-source.js. */
export function pauseFullAtlas(){ if (window.__osteo && window.__osteo.exitAtlas) window.__osteo.exitAtlas(); }
function atlasSourceActive(){ return ui.viewerTab === '3d' && ui.modelSource === 'atlas'; }
async function openFullAtlas(){
  const dock = $$('viewerAtlasPane');
  if (!dock || !window.__osteo || !window.__osteo.enterAtlas) return;
  const ok = await window.__osteo.enterAtlas(dock);
  if (!ok) { ui.modelSource = 'course'; renderSourceSwitch(); }
}
function renderSourceSwitch() {
  const bar = $$('modelSourceTabs');
  if (!bar) return;
  bar.classList.toggle('hidden', ui.viewerTab !== '3d');
  bar.innerHTML = [['course', 'Course body'], ['atlas', 'Full atlas']].map(([id, label]) =>
    `<button class="seg${ui.modelSource === id ? ' active' : ''}" aria-pressed="${ui.modelSource === id}" data-source="${esc(id)}">${esc(label)}</button>`).join('');
  bar.querySelectorAll('[data-source]').forEach((b) => { b.onclick = () => { ui.modelSource = b.dataset.source; renderViewerTabs(); }; });
}

/* One subscription for the session. The viewer is booted lazily, so this is
   retried each time the tab is drawn until the module is actually there. */
function bindStackHook() {
  if (bindStackHook.done || !window.__osteo || !window.__osteo.setStackHook) return;
  window.__osteo.setStackHook(renderPickStack);
  bindStackHook.done = true;
}

function renderViewerTabs() {
  bindStackHook();
  $$('viewerTabs').innerHTML = [['3d', '3D model'], ['xray', 'Projection']].map(([id, label]) =>
    `<button class="seg${ui.viewerTab === id ? ' active' : ''}" aria-pressed="${ui.viewerTab === id}" data-vtab="${esc(id)}">${esc(label)}</button>`).join('');
  $$('viewerTabs').querySelectorAll('[data-vtab]').forEach((b) => { b.onclick = () => { ui.viewerTab = b.dataset.vtab; renderViewerTabs(); }; });
  $$('viewerSkeletonPane').classList.toggle('hidden', ui.viewerTab !== '3d');
  $$('viewerXrayPane').classList.toggle('hidden', ui.viewerTab !== 'xray');
  renderSourceSwitch();
  /* One canvas, two bodies: the class is what hides the course chrome (rail,
     tools, overlays) and shows the atlas dock -- see app.css. */
  $$('viewerSkeletonPane').classList.toggle('source-atlas', atlasSourceActive());
  if(atlasSourceActive())openFullAtlas();else pauseFullAtlas();
  if (ui.viewerTab === 'xray') {
    enterProjection();
  } else {
    leaveProjection();
  }
}

/*
 * The tissue rail that used to live here is gone: the beam's layer set is not
 * a user choice, it is skeleton + muscle + organs, chosen so that no volume is
 * counted twice. enterXray() in studio/live-physiology.js says why -- including
 * why the diagnosis this comment used to carry, that soft tissue read as fog
 * because its coefficients were wrong, was itself wrong.
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
  const request = ++projectionRequest;
  const current = () => request === projectionRequest && ui.viewerTab === 'xray';
  if (window.__osteo.inXray()) return;
  renderXrayViews();
  $$('xrayStatus').textContent = 'Loading skeleton, muscle, organs and heart…';
  mount.setAttribute('aria-busy', 'true');
  try {
  const booted = await window.__osteo.boot();
  if (!current()) return;
  if (!booted) throw new Error('3D is unavailable, so the projection cannot be drawn.');
  // Only the winning request may move the shared stage after loading finishes.
  const loaded = await window.__osteo.ensureXrayLayers();
  if (!current()) return;
  mount.innerHTML = '';
  const stage = window.__osteo.stageEl();
  if (stage && stage.parentElement !== mount) mount.appendChild(stage);
  window.__osteo.resize();
  window.__osteo.enterXray();
  window.__osteo.xrayRegion(xrayRegion);
  window.__osteo.xrayView(xrayView);
  window.__osteo.xrayKvp(+$$('xrayKvp').value);
  window.__osteo.xrayMas(+$$('xrayMas').value);
  window.__osteo.xrayAec($$('xrayAec').checked);
  window.__osteo.xrayWindow(+$$('xrayWindow').value, +$$('xrayLevel').value);
  window.__osteo.xrayZoom(+$$('xrayZoom').value);
  window.__osteo.resize();
  $$('xraySelection').textContent = loaded.length < 4
    ? 'Some tissue layers could not load. This is an incomplete projection; reopen this tab to retry.'
    : 'Tap the image to name a structure. Drag to pan; use Zoom to enlarge the image.';
  /* The Tools card has to be told: entering the projection suspends the
     section cut, and the card is what says so. */
  renderViewerTools();
  } catch (error) {
    if (!current()) return;
    if (window.__osteo.inXray()) window.__osteo.exitXray();
    restoreStage();
    $$('xrayStatus').textContent = error.message || 'Projection could not load. Reopen this tab to retry.';
  } finally {
    if (current()) mount.setAttribute('aria-busy', 'false');
  }
}

export function leaveProjection() {
  projectionRequest += 1;
  $$('xrayMount')?.setAttribute('aria-busy', 'false');
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
    if (ui.viewerTab !== '3d') return;
    const st = layerState[l.key] || 'off';
    if (st === 'off') { await window.__osteo.setLayer(l.key, false); continue; }
    const ok = await window.__osteo.setLayer(l.key, true, l.file);
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
  const wire = (id, readId, fmt, call) => {
    const el = $$(id);
    if (!el || el.dataset.wired) return;
    el.dataset.wired = '1';
    const push = () => {
      const v = el.type === 'checkbox' ? el.checked : +el.value;
      $$(readId).textContent = fmt(v);
      if (id === 'xrayAec') $$('xrayMas').disabled = el.checked;
      if (window.__osteo && window.__osteo.inXray()) call(v);
    };
    el.oninput = push; el.onchange = push;
  };
  wire('xrayKvp', 'xrayKvpRead', (v) => `${v} kVp`, (v) => window.__osteo.xrayKvp(v));
  wire('xrayMas', 'xrayMasRead', (v) => `${v} mAs`, (v) => window.__osteo.xrayMas(v));
  wire('xrayAec', 'xrayAecRead', (v) => (v ? 'on' : 'off'), (v) => window.__osteo.xrayAec(v));
  /* A lesson may have left a study focus and other layers on. */
  if (ui.viewerTab === '3d') syncLayersToRail();
  showView('viewerView');
  const windowInput = $$('xrayWindow'), levelInput = $$('xrayLevel'), zoomInput = $$('xrayZoom');
  const display = () => {
    $$('xrayWindowRead').textContent = windowInput.value;
    $$('xrayLevelRead').textContent = levelInput.value;
    $$('xrayZoomRead').textContent = `${zoomInput.value}×`;
    window.__osteo.xrayWindow(+windowInput.value, +levelInput.value);
    window.__osteo.xrayZoom(+zoomInput.value);
  };
  windowInput.oninput = levelInput.oninput = zoomInput.oninput = display;
  const aec = $$('xrayAec');
  $$('xrayMas').disabled = aec.checked;
  $$('xrayReset').onclick = () => {
    windowInput.value = '19'; levelInput.value = '10.5'; zoomInput.value = '1';
    $$('xrayKvp').value = '75'; $$('xrayMas').value = '10'; aec.checked = true;
    $$('xrayKvp').oninput(); $$('xrayMas').oninput(); aec.oninput();
    display(); window.__osteo.xrayRegion(xrayRegion); window.__osteo.xrayView(xrayView);
  };

}
