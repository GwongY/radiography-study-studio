/*
 * Cell zoom
 *
 * The "Cell" button in the viewer's dock, or "Show in 3D" on a Revise box: a typical cell cut open, then zoom in to
 * its nucleus, the organisation of DNA (chromatin to a visible chromosome) and one nucleosome; beside them the cell
 * life cycle with a mitosis stage slider, meiosis, protein synthesis with a hormone signal in front of it, and the
 * cells of the other lectures (the plasma membrane, epithelium, blood, alveolus, parietal cell, spermatozoon, neuron,
 * NK cell, antigen-presenting cell). Every label, stage and note is a course term with its page and, where Revise has
 * the box, an "In Revise" link (outputs/cell-zoom.js; work/cell-zoom-check.mjs). The scenes are outputs/cell/,
 * reached by a dynamic import and precached in the shell, so the mode opens offline. The nucleosome is PDB 3AFA (CC0);
 * everything else is drawn for this app.
 *
 * The fourth atlas mode beside studio/heart-atlas.js, studio/limb-atlas.js and studio/muscle-zoom.js, sharing their
 * machinery: an exclusive view with a snapshot taken on entry and given back on exit, the same dock, and the same
 * `window.__osteo.exitHeartAtlas` hook (state.heartAtlasOn means "an atlas mode is open"; state.cellZoomOn says
 * which). See docs/TRAPS.md, "The cell zoom mode".
 *
 * Nothing runs at module scope; init() adds the dock button.
 */
import { $, els, state, prefersStill } from './imports.js';
import { applyLayers } from './live-physiology.js';
import { showToast } from './modes-and-bridge.js';
import { collapsible, frameWorldBox, restoreSnapshot, takeSnapshot } from './heart-atlas.js';
import { LEVELS, LABELS, SLIDERS, CELL_SOURCES, SYSTEMS, levelById, stagesFor, zoomFrom } from '../cell-zoom.js?v=1';
import { EXPLAIN } from '../cell-explain.js?v=1';
import { modelMeshName } from '../search-name.js';

let zoom = null;            /* createCellZoom() result, built once */
let saved = null;           /* the snapshot taken on entry */
let panel = null, tags = null, toggle = null, busy = false;
let current = null, selected = null;
let zoomInto = null;        /* the level the selection card's "Zoom inside" opens */
let tween = null, playing = false, lastNow = 0;
let stageAnim = null;       /* { from, to, t0, dur } while a stage chip plays its step */
const stageVal = {}, signalVal = {};

const notifyLayersChanged = () => window.dispatchEvent(new CustomEvent('osteo:layers'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const loadFailureMessage = () => (typeof navigator !== 'undefined' && navigator.onLine === false
  ? 'Connect once to download the cell zoom for offline use.'
  : 'The cell zoom could not open. Your viewer has been restored; try again.');

/* A failed dynamic import() is remembered for the life of the page; a retry asks for a new URL (the first
   specifier stays the one the service worker precaches). See the heart atlas for the story. */
let sceneModule = null, importFailures = 0;
async function loadSceneModule() {
  if (sceneModule) return sceneModule;
  try {
    sceneModule = importFailures === 0 ? await import('../cell/zoom-scene.js?v=1') : await import(`../cell/zoom-scene.js?v=1&retry=${importFailures}`);
  } catch (error) { importFailures += 1; throw error; }
  return sceneModule;
}

function setBusy(on) {
  busy = on;
  if (!toggle) return;
  toggle.disabled = on;
  toggle.setAttribute('aria-busy', String(on));
  toggle.textContent = on ? 'Loading the cell…' : 'Cell';
}

function setDockMode(on) {
  $('viewerDock')?.classList.toggle('heart-atlas-open', on);
  $('viewerDock')?.classList.toggle('cell-zoom-open', on);
  $('stageHome')?.classList.toggle('heart-atlas-open', on);
}

/* ---- the panel ---- */
function panelHtml() {
  /* "Go to": every level, grouped by body system (anatomy and physiology together) */
  const options = SYSTEMS.map(([k, ids]) => `<optgroup label="${esc(k)}">${ids.map(levelById).map((lv) => `<option value="${lv.id}">${esc(lv.title)}</option>`).join('')}</optgroup>`).join('');
  return `
  <div class="ha-head"><strong>Cell</strong><button type="button" id="cz-close" aria-label="Close cell zoom">Close</button></div>
  <div class="ha-scroll">
    <nav class="mz-path" id="cz-path" aria-label="Levels"></nav>
    <div class="ha-row mz-nav"><button type="button" id="cz-out">← Zoom out</button><button type="button" id="cz-in" class="primary">Zoom in →</button><span id="cz-side" class="cz-side"></span></div>
    <label class="cz-goto"><span>Go to</span><select id="cz-goto">${options}</select></label>
    <p class="mz-level"><strong id="cz-title"></strong> <small id="cz-cite"></small></p>
    <p class="cz-levelnote" id="cz-levelnote" hidden></p>
    <div class="sel-revise mz-revise" data-cz-revise="level" hidden></div>
    <section id="cz-stages" class="mz-contract cz-stages" hidden>
      <label class="cz-signal" id="cz-signalWrap" hidden><span>Hormone</span><select id="cz-signal"></select></label>
      <div class="mz-ends" id="cz-ends" hidden><span id="cz-end0"></span><span id="cz-end1"></span></div>
      <p class="cz-group" id="cz-group" hidden></p>
      <div class="cz-chips" id="cz-chips" role="group" aria-label="Stages"></div>
      <input type="range" id="cz-slider" min="0" max="100" value="0" aria-label="Stage">
      <div class="ha-row"><button type="button" id="cz-play" aria-pressed="false">Play</button></div>
      <article class="cz-stage" id="cz-stage" aria-live="polite" hidden><strong id="cz-stageTitle"></strong><p id="cz-stageNote"></p><small id="cz-stageCite"></small><div class="cz-links" id="cz-stageLinks" hidden></div><div class="sel-revise mz-revise" data-cz-revise="stage" hidden></div></article>
    </section>
    <article class="ha-info mz-info" id="cz-info" aria-live="polite" hidden><strong id="cz-infoTitle"></strong><div id="cz-infoNote"></div><small id="cz-infoCite"></small><div class="sel-revise mz-revise" data-cz-revise="label" hidden></div></article>
    <ol class="mz-labels" id="cz-labels" aria-label="Labels"></ol>
    <p class="ha-credit cz-model" id="cz-model" aria-live="polite" hidden></p>
    <p class="ha-credit"><a href="./THIRD-PARTY-NOTICES.txt" target="_blank" rel="noopener">Model credits</a></p>
  </div>`;
}

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'cellZoomPanel';
  panel.className = 'heart-atlas-panel muscle-zoom-panel cell-zoom-panel';
  panel.setAttribute('aria-label', 'Cell zoom controls');
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('viewerDock').appendChild(panel);
  collapsible(panel);
  $('cz-close').onclick = () => exitCellZoom();
  panel.onkeydown = (event) => { if (event.key === 'Escape') { event.preventDefault(); exitCellZoom(); } };
  $('cz-in').onclick = () => { const n = levelById(current)?.next; if (n) goTo(n); };
  $('cz-out').onclick = () => { const p = parentOf(current); if (p) goTo(p, true); };
  $('cz-goto').onchange = () => { const id = $('cz-goto').value; if (id !== current) goTo(id); };
  $('cz-slider').oninput = () => { stopPlay(); stageAnim = null; setStage(Number($('cz-slider').value) / 100, false); };
  $('cz-play').onclick = () => { if (playing) stopPlay(); else startPlay(); };
  $('cz-signal').onchange = () => { stopPlay(); stageAnim = null; signalVal[current] = $('cz-signal').value; paintStages(0); };
  tags = document.createElement('div');
  tags.id = 'cellZoomTags';
  tags.className = 'mz-tags';
  tags.hidden = true;
  els.stage.appendChild(tags);
}

const parentOf = (id) => { const lv = levelById(id); return lv && lv.back ? lv.back : (LEVELS.find((l) => l.next === id) || {}).id || null; };
const pathTo = (id) => { const out = []; for (let at = id; at && !out.includes(at); at = parentOf(at)) out.unshift(at); return out; };
const citeLine = (cite) => (cite || []).map((c) => `${CELL_SOURCES[c.ref]} p${c.page}${c.figure ? ' figure' : ''}`).filter((v, i, a) => a.indexOf(v) === i).join(' · ');
const notesHtml = (note) => [].concat(note || []).map((n) => `<p>“${esc(n)}”</p>`).join('');

/* The study half paints Revise links for the boxes its week has taught; the studio only says which boxes. */
function reviseSlot(el, boxes) {
  if (!el) return;
  el.hidden = true; el.innerHTML = '';
  if (boxes && boxes.length) window.dispatchEvent(new CustomEvent('osteo:revise-slot', { detail: { el, boxes } }));
}

function paintPanel() {
  const lv = levelById(current);
  $('cz-path').innerHTML = pathTo(current).map((id) => `<button type="button" data-cz-level="${id}" ${id === current ? 'aria-current="true" class="active"' : ''}>${esc(levelById(id).title)}</button>`).join('<span aria-hidden="true">›</span>');
  $('cz-path').querySelectorAll('[data-cz-level]').forEach((b) => { b.onclick = () => { if (b.dataset.czLevel !== current) goTo(b.dataset.czLevel, true); }; });
  $('cz-in').hidden = !lv.next;
  $('cz-in').textContent = lv.next ? `Zoom in: ${levelById(lv.next).title} →` : '';
  const sides = [].concat(lv.side || []);
  $('cz-side').innerHTML = sides.map((id) => `<button type="button" data-cz-side="${id}">${esc(levelById(id).title)} →</button>`).join('');
  $('cz-side').querySelectorAll('[data-cz-side]').forEach((b) => { b.onclick = () => goTo(b.dataset.czSide); });
  $('cz-out').hidden = !parentOf(current);
  $('cz-goto').value = current;
  $('cz-title').textContent = lv.title;
  $('cz-cite').textContent = citeLine(lv.cite);
  $('cz-levelnote').innerHTML = notesHtml(lv.note);
  $('cz-levelnote').hidden = !lv.note;
  reviseSlot(panel.querySelector('[data-cz-revise="level"]'), lv.revise);
  const labels = LABELS[current] || [];
  $('cz-labels').innerHTML = labels.map((x, i) => `<li><button type="button" data-cz-label="${x.id}" aria-pressed="false"><span class="mz-n">${i + 1}</span>${esc(x.l)}</button></li>`).join('');
  $('cz-labels').querySelectorAll('[data-cz-label]').forEach((b) => { b.onclick = () => selectLabel(b.dataset.czLabel); });
  tags.innerHTML = labels.map((x, i) => `<button type="button" class="mz-tag" data-cz-tag="${x.id}" tabindex="-1"><span class="mz-n">${i + 1}</span><span class="mz-name">${esc(x.l)}</span></button>`).join('');
  tags.querySelectorAll('[data-cz-tag]').forEach((b) => { b.onclick = () => selectLabel(b.dataset.czTag); });
  selectLabel(null);
  paintStages(stageVal[current] ?? 0);
}

/* ---- the stage slider: the ends of a continuous change, or the named stages of a process ---- */
const sliderOf = (id) => { const lv = levelById(id); return lv && lv.slider ? SLIDERS[lv.slider] : null; };
const stagesNow = () => { const lv = levelById(current); return lv.slider ? stagesFor(lv.slider, signalVal[current] || 'none') : []; };
/* stage k runs from s = k to s = k + 1; at s = k + 1 it is done and still the one shown */
const activeStage = (s, n) => Math.min(n - 1, Math.max(0, Math.ceil(s - 1e-6) - 1));

function paintStages(s) {
  const sl = sliderOf(current);
  $('cz-stages').hidden = !sl;
  if (!sl) { stopPlay(); return; }
  const continuous = !!sl.ends;
  $('cz-ends').hidden = !continuous;
  $('cz-chips').hidden = continuous;
  $('cz-signalWrap').hidden = !sl.signals;
  if (sl.signals) {
    $('cz-signal').innerHTML = sl.signals.map((g) => `<option value="${g.id}">${esc(g.l)}</option>`).join('');
    $('cz-signal').value = signalVal[current] || 'none';
  }
  if (continuous) {
    $('cz-end0').textContent = sl.ends[0]; $('cz-end1').textContent = sl.ends[1];
    $('cz-slider').max = '100';
    $('cz-slider').setAttribute('aria-label', `${sl.ends[0]} to ${sl.ends[1]}`);
  } else {
    const list = stagesNow();
    $('cz-chips').innerHTML = list.map((st, k) => `<button type="button" data-cz-stage="${k}" aria-pressed="false">${esc(st.l)}</button>`).join('');
    $('cz-chips').querySelectorAll('[data-cz-stage]').forEach((b) => { b.onclick = () => playStage(Number(b.dataset.czStage)); });
    $('cz-slider').max = String(list.length * 100);
    $('cz-slider').setAttribute('aria-label', 'Stage');
  }
  setStage(s, true);
}

function setStage(s, repaint) {
  const sl = sliderOf(current);
  if (!sl || !zoom) return;
  stageVal[current] = s;
  zoom.setStage(current, s, signalVal[current] || 'none');
  $('cz-slider').value = String(Math.round(s * 100));
  if (sl.ends) { $('cz-stage').hidden = true; $('cz-group').hidden = true; paintLabelPresence(); return; }
  const list = stagesNow(), k = activeStage(s, list.length), st = list[k];
  $('cz-chips').querySelectorAll('[data-cz-stage]').forEach((b) => { const on = Number(b.dataset.czStage) === k; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  const grp = st.group && sl.groups ? sl.groups[st.group] : null;
  $('cz-group').hidden = !grp;
  if (grp) $('cz-group').textContent = grp.l;
  const stageEl = $('cz-stage');
  if (repaint || stageEl.dataset.k !== `${current}:${signalVal[current] || 'none'}:${k}`) {
    stageEl.dataset.k = `${current}:${signalVal[current] || 'none'}:${k}`;
    stageEl.hidden = false;
    $('cz-stageTitle').textContent = st.l;
    $('cz-stageNote').innerHTML = notesHtml(st.note);
    $('cz-stageCite').textContent = citeLine(st.cite);
    paintLinks(st.link);
    reviseSlot(stageEl.querySelector('[data-cz-revise="stage"]'), st.revise || (grp && grp.revise));
  }
  paintLabelPresence();
}

/* a stage's links: the same moment of a process on another level (the oocyte in its follicle, the sperm in its tubule) */
const linkName = (t) => { const lv = levelById(t.level), st = t.stage && lv.slider ? stagesFor(lv.slider, 'none').find((x) => x.id === t.stage) : null; return st ? `${lv.title}: ${st.l}` : lv.title; };
function paintLinks(links) {
  const el = $('cz-stageLinks'), list = [].concat(links || []);
  el.hidden = !list.length;
  el.innerHTML = list.map((t, i) => `<button type="button" data-cz-link="${i}">${esc(linkName(t))} →</button>`).join('');
  el.querySelectorAll('[data-cz-link]').forEach((b) => { b.onclick = () => { stopPlay(); stageAnim = null; applyTarget(list[Number(b.dataset.czLink)]); }; });
}

/* the labels of parts this stage does not show are dimmed in the list (their tags hide themselves) */
function paintLabelPresence() {
  if (!zoom || !panel) return;
  const on = zoom.visibleParts(current);
  panel.querySelectorAll('[data-cz-label]').forEach((b) => b.classList.toggle('cz-absent', !on.has(b.dataset.czLabel)));
}

/* a stage chip plays its own step: from the start of the stage to its end */
function playStage(k) {
  stopPlay();
  if (prefersStill()) { stageAnim = null; setStage(k + 1, false); return; }
  stageAnim = { from: k, to: k + 1, t0: performance.now(), dur: 1400 };
}

function startPlay() {
  const sl = sliderOf(current);
  if (!sl || prefersStill()) return;
  stageAnim = null;
  const max = sl.ends ? 1 : stagesNow().length;
  if ((stageVal[current] ?? 0) >= max - 1e-3) setStage(0, false);
  playing = true; lastNow = performance.now();
  $('cz-play').textContent = 'Stop'; $('cz-play').setAttribute('aria-pressed', 'true');
}
function stopPlay() {
  playing = false;
  if (panel) { $('cz-play').textContent = 'Play'; $('cz-play').setAttribute('aria-pressed', 'false'); }
}

/* ---- labels ---- */
function setHighlight(part, on) {
  if (!part || !current) return;
  for (const o of zoom.meshesOf(current, part)) {
    for (const m of [].concat(o.material || [])) if (m && m.emissive) { m.emissive.setHex(on ? 0x1eb9a6 : 0x000000); m.emissiveIntensity = on ? 0.55 : 1; }
  }
}

function selectLabel(id) {
  if (selected) setHighlight(selected, false);
  selected = id && selected !== id ? id : null;
  const x = selected ? (LABELS[current] || []).find((l) => l.id === selected) : null;
  if (x) setHighlight(x.id, true);
  panel.querySelectorAll('[data-cz-label]').forEach((b) => { const on = b.dataset.czLabel === selected; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  tags.querySelectorAll('[data-cz-tag]').forEach((b) => b.classList.toggle('active', b.dataset.czTag === selected));
  const info = $('cz-info');
  info.hidden = !x;
  if (!x) return;
  $('cz-infoTitle').textContent = x.l;
  const sentence = (EXPLAIN[current] || {})[x.id] || '';
  $('cz-infoNote').innerHTML = sentence ? `<p>${esc(sentence)}</p>` : '';
  $('cz-infoNote').hidden = !sentence;
  $('cz-infoCite').textContent = citeLine(x.cite);
  reviseSlot(info.querySelector('[data-cz-revise="label"]'), x.revise);
}

/* ---- levels and the camera ---- */
/* the cut-away wedge faces +x +z, so the round cells are seen from there */
const VIEW = { cell: [1, 0.55, 1], nucleus: [1, 0.5, 1], alveolus: [1, 0.45, 1], apc: [1, 0.4, 1.1], nucleosome: [0.15, 0.35, 1], membrane: [0.35, 0.55, 1], epithelium: [0.45, 0.35, 1] };
const DEFAULT_VIEW = [0.2, 0.3, 1];
/* The long levels, built along x, stand up when the open part of the stage is taller than it is wide (a tablet held
   upright, beside the dock): the extracellular side of protein synthesis then sits on top. */
const LONG = new Set(['dna', 'sperm', 'neuron', 'expression', 'cycle']);

function orientLevels(id) {
  const { fx, fy, sr } = openFraction();
  zoom.root.rotation.set(0, 0, LONG.has(id) && sr.height * fy > sr.width * fx * 1.3 ? Math.PI / 2 : 0);
}

/* The part of the stage the dock leaves, as fractions of its width and height (on a phone the dock lies over the
   lower part; on a wide screen, the right). */
function openFraction() {
  const sr = els.stage.getBoundingClientRect(), dr = $('viewerDock')?.getBoundingClientRect();
  if (!dr || !sr.width || !sr.height || !dr.width || !dr.height) return { fx: 1, fy: 1, sr, dr: null };
  const overlaps = Math.min(sr.right, dr.right) > Math.max(sr.left, dr.left) && Math.min(sr.bottom, dr.bottom) > Math.max(sr.top, dr.top);
  if (!overlaps) return { fx: 1, fy: 1, sr, dr: null };
  const across = dr.width >= sr.width * 0.6;
  const fy = across ? Math.max(0.2, (Math.max(dr.top, sr.top) - sr.top) / sr.height) : 1;
  const fx = across ? 1 : Math.max(0.2, (Math.max(dr.left, sr.left) - sr.left) / sr.width);
  return { fx, fy, sr, dr };
}

/* Where frameWorldBox would put the camera, without leaving it there. frameWorldBox fits the whole stage and then
   shifts into the open part; the margin here makes the level fit the open part itself. */
function framePose(id) {
  const cam = state.camera, ctl = state.controls;
  const p = cam.position.clone(), t = ctl.target.clone();
  const dir = new state.THREE.Vector3(...(zoom.viewOf(id) || VIEW[id] || DEFAULT_VIEW)).applyQuaternion(zoom.root.quaternion);
  const box = zoom.box(id), size = box.getSize(new state.THREE.Vector3()), { fx, fy } = openFraction();
  const whole = Math.max(size.y, size.x / Math.max(0.1, cam.aspect)), open = Math.max(size.y / fy, size.x / Math.max(0.1, cam.aspect * fx));
  /* the viewer's own zoom-out limit would pull the camera in; the exit snapshot gives it back */
  ctl.maxDistance = Math.max(ctl.maxDistance, cam.far * 0.8);
  frameWorldBox(box, dir, 1.12 * (whole > 0 ? open / whole : 1));
  const out = { position: cam.position.clone(), target: ctl.target.clone() };
  cam.position.copy(p); ctl.target.copy(t); ctl.update();
  return out;
}

function showLevel(id) {
  if (selected) setHighlight(selected, false);
  selected = null;
  current = id;
  stopPlay(); stageAnim = null;
  orientLevels(id);
  zoom.show(id);
  paintPanel();
  void ensureModel(id);
}

/* ---- a level's model (cell/models.js): the level is empty until its model has loaded ---- */
let gltfLoader = null;
async function loadGLTF(url) {
  if (!gltfLoader) {
    const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js');
    gltfLoader = new GLTFLoader();
  }
  return gltfLoader.loadAsync(url);
}
function paintModelNote(id, text) {
  const el = panel && $('cz-model');
  if (!el || id !== current) return;
  el.textContent = text;
  el.hidden = !text;
}
async function ensureModel(id) {
  if (!zoom || !zoom.modelFor(id)) { paintModelNote(id, ''); return; }
  if (zoom.modelReady(id)) { paintModelNote(id, ''); return; }
  paintModelNote(id, 'Loading the 3D model…');
  try {
    if (!(await zoom.loadModel(id, loadGLTF)) || !state.cellZoomOn) return;
  } catch (error) {
    console.warn('Cell zoom: the model did not load.', error);
    paintModelNote(id, typeof navigator !== 'undefined' && navigator.onLine === false ? 'Connect once to download this level’s 3D model.' : 'This level’s 3D model did not load.');
    return;
  }
  if (id !== current) return;
  paintModelNote(id, '');
  /* the model's parts take over: stage, highlight and label presence again, then settle the camera on it */
  if (sliderOf(id)) setStage(stageVal[id] ?? 0, true);
  if (selected) setHighlight(selected, true);
  paintLabelPresence();
  /* a zoom still flying lands on the model instead; otherwise glide to it */
  const end = framePose(id), cam = state.camera, ctl = state.controls;
  if (tween && !tween.dive) tween.to = end;
  else if (!tween && prefersStill()) { cam.position.copy(end.position); ctl.target.copy(end.target); ctl.update(); }
  else if (!tween) tween = { t0: performance.now(), dur: 420, from: { position: cam.position.clone(), target: ctl.target.clone() }, to: end };
}

/* Zoom: fly into the level shown, swap, then settle on the next from further out — or the reverse going out. */
function goTo(id, out = false, then = null) {
  if (!zoom || !levelById(id)) return;
  if (id === current) { if (then) then(); return; }
  if (prefersStill() || !current) {
    showLevel(id); const p = framePose(id);
    state.camera.position.copy(p.position); state.controls.target.copy(p.target); state.controls.update();
    if (then) then();
    return;
  }
  const cam = state.camera, ctl = state.controls;
  const from = { position: cam.position.clone(), target: ctl.target.clone() };
  const dive = { target: from.target.clone(), position: from.target.clone().add(from.position.clone().sub(from.target).multiplyScalar(out ? 2.2 : 0.3)) };
  tween = { t0: performance.now(), dur: 320, from, to: dive, dive: true, then: () => {
    showLevel(id);
    const end = framePose(id);
    const start = { target: end.target.clone(), position: end.target.clone().add(end.position.clone().sub(end.target).multiplyScalar(out ? 0.3 : 2.4)) };
    cam.position.copy(start.position); ctl.target.copy(start.target); ctl.update();
    tween = { t0: performance.now(), dur: 420, from: start, to: end, then };
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

/* The tags follow their parts on screen; a part the stage does not show has no tag. They are placed from a microtask
   queued by tick(), which runs after the frame's controls.update() and render (outputs/studio/scene.js animate): placed
   inside the tick itself they were projected with the previous frame's camera, so while the model turned slowly every
   tag trailed it by a frame and shuddered. Every width is read before any transform is written, so there is one layout. */
let placing = false;
function placeTagsAfterFrame() {
  if (placing) return;
  placing = true;
  queueMicrotask(() => { placing = false; placeTags(); });
}
function placeTags() {
  if (!tags || tags.hidden || !current || !state.cellZoomOn) return;
  const canvas = state.renderer.domElement, w = canvas.clientWidth, h = canvas.clientHeight;
  const at = new Map(zoom.anchors(current).map((a) => [a.id, a.pos]));
  /* a tag the dock would cover is not drawn */
  const { fx, fy } = openFraction();
  const list = [...tags.querySelectorAll('[data-cz-tag]')];
  const widths = list.map((t) => t.offsetWidth);
  list.forEach((t, i) => {
    const p = at.get(t.dataset.czTag);
    if (!p) { if (t.style.display !== 'none') t.style.display = 'none'; return; }
    const v = p.clone().project(state.camera);
    if (v.z > 1 || v.z < -1 || v.x < -1.05 || v.y > 1.05 || (v.x + 1) / 2 > fx + 0.02 || (1 - v.y) / 2 > fy + 0.02) { if (t.style.display !== 'none') t.style.display = 'none'; return; }
    if (t.style.display) t.style.display = '';
    const tw = widths[i];
    let x = (v.x + 1) / 2 * w;
    /* the side a tag sits on changes only once the anchor is clear of the edge, so one near it does not flicker */
    const flipped = t.classList.contains('flip');
    const flip = flipped ? x + tw > w - 4 - 24 : x + tw > w - 4;
    if (flip !== flipped) t.classList.toggle('flip', flip);
    if (flip) x -= tw - 18;
    /* a name wider than the room on either side (a long one, on a phone) stays on the stage */
    x = Math.max(4, Math.min(x, w - 4 - tw));
    t.style.transform = `translate(${x.toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px)`;
  });
}

function tick(t) {
  const now = performance.now();
  stepTween(now);
  if (stageAnim) {
    const k = Math.min(1, (now - stageAnim.t0) / stageAnim.dur);
    setStage(stageAnim.from + (stageAnim.to - stageAnim.from) * k, false);
    if (k >= 1) stageAnim = null;
  } else if (playing) {
    const sl = sliderOf(current);
    if (!sl) stopPlay();
    else {
      const max = sl.ends ? 1 : stagesNow().length, rate = sl.ends ? 0.25 : 0.7;   /* per second */
      const s = Math.min(max, (stageVal[current] ?? 0) + (now - lastNow) / 1000 * rate);
      setStage(s, false);
      if (s >= max) stopPlay();
    }
  }
  lastNow = now;
  zoom.update(t, prefersStill());
  placeTagsAfterFrame();
}

/* ---- tapping a part in 3D picks its label: a solid part before a see-through shell ---- */
let unbindPicking = null;
function bindPicking() {
  if (unbindPicking) return;
  const THREE = state.THREE, ray = new THREE.Raycaster(), p = new THREE.Vector2(), canvas = state.renderer.domElement;
  let down = null;
  const isPick = (e) => e.target === canvas && e.isPrimary && e.button === 0;
  const dn = (e) => { down = isPick(e) ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null; };
  const up = (e) => {
    if (!isPick(e) || !state.cellZoomOn || !down || e.pointerId !== down.id || !current) { down = null; return; }
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = canvas.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const hits = ray.intersectObjects(zoom.pickables(current), false).filter((h) => h.object.userData.czPart);
    const hit = hits.find((h) => !h.object.userData.shell) || hits[0];
    if (hit) selectLabel(hit.object.userData.czPart);
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

/* Open a target: a level, then (once there) its stage and signal, then a label. */
function applyTarget(target) {
  const lv = levelById(target.level) || LEVELS[0];
  const then = () => {
    const sl = sliderOf(lv.id);
    if (sl && sl.signals && target.signal) { signalVal[lv.id] = target.signal; }
    if (sl && !sl.ends && target.stage) {
      const k = stagesFor(lv.slider, signalVal[lv.id] || 'none').findIndex((s) => s.id === target.stage);
      if (k >= 0) { paintStages(k); playStage(k); }
    } else if (sl) paintStages(stageVal[lv.id] ?? 0);
    if (target.label) selectLabel(target.label);
  };
  goTo(lv.id, false, then);
}

function cleanupEntry(snapshot) {
  const returnFocus = !!panel && panel.contains(document.activeElement);
  state.heartAtlasOn = false;
  state.cellZoomOn = false;
  state.atlasTick = null;
  tween = null; stageAnim = null; stopPlay();
  if (unbindPicking) unbindPicking();
  if (zoom) { if (selected) setHighlight(selected, false); selected = null; zoom.root.removeFromParent(); zoom.show(null); }
  current = null;
  restoreSnapshot(snapshot);
  if (snapshot && state.scene && state.controls) { applyLayers(); notifyLayersChanged(); }
  if (panel) panel.hidden = true;
  if (tags) tags.hidden = true;
  if (toggle) toggle.setAttribute('aria-pressed', 'false');
  setDockMode(false);
  if (returnFocus && toggle) toggle.focus();
}

/* target: { level, label, stage, signal } (outputs/cell-zoom.js SHOW_IN_3D), all optional */
export async function enterCellZoom(target = {}) {
  if (state.cellZoomOn) { applyTarget(target); return true; }
  if (state.heartAtlasOn) window.__osteo?.exitHeartAtlas?.(); /* another atlas mode is open: close it first */
  if (state.heartAtlasOn || busy) return false;
  if (state.xray || state.focus) {
    showToast(state.xray ? 'Close Projection before opening the cell.' : 'Close the focused lesson before opening the cell.');
    return false;
  }
  setBusy(true);
  state.heartAtlasLoading = true;
  let before = null;
  try {
    if (!state.scene) {
      if (!window.__osteo || typeof window.__osteo.boot !== 'function') throw new Error('The 3D viewer could not start.');
      await window.__osteo.boot();
    }
    if (!state.scene || !state.camera || !state.controls || !state.renderer) throw new Error('The 3D viewer did not finish booting.');
    if (state.xray) { showToast('Close Projection before opening the cell.'); return false; }
    before = takeSnapshot();
    buildPanel();
    if (!zoom) zoom = (await loadSceneModule()).createCellZoom(state.THREE);
    /* The cell sits where the viewer is looking, sized so that its widest level, framed in the open part of a phone's
       stage, stays inside the camera's far plane (a level is ~10-35 units across). */
    zoom.root.position.copy(state.controls.target);
    zoom.root.scale.setScalar(Math.max(0.005, Math.min(state.controls.maxDistance, state.camera.far * 0.5) / 375));
    state.scene.add(zoom.root);
    /* An exclusive viewing mode: every layer off for as long as the panel is open; the snapshot gives it all back. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    applyLayers();
    notifyLayersChanged();
    state.heartAtlasOn = true; state.cellZoomOn = true;
    state.atlasTick = (t) => {
      try { tick(t); }
      catch (error) {
        state.atlasTick = null;
        console.error('Cell zoom stopped; closing the mode.', error);
        showToast('The cell zoom stopped after an error. The 3D viewer is still running.');
        exitCellZoom();
      }
    };
    saved = before;
    panel.hidden = false; tags.hidden = false;
    setDockMode(true);
    if (toggle) toggle.setAttribute('aria-pressed', 'true');
    current = null;
    applyTarget(target);
    bindPicking();
    $('cz-close').focus();
    return true;
  } catch (error) {
    console.error('Cell zoom entry failed; restoring the viewer.', error);
    cleanupEntry(before);
    showToast(loadFailureMessage());
    return false;
  } finally {
    state.heartAtlasLoading = false;
    setBusy(false);
  }
}

export function exitCellZoom() {
  if (!state.cellZoomOn && !saved) return;
  const before = saved;
  saved = null;
  cleanupEntry(before);
}

/* Runs after the muscle zoom's init, whose exit hook it wraps. */
export function init() {
  const home = $('stageHome'), dock = $('viewerDock');
  if (!home || !dock) return;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'cellZoomToggle';
  toggle.className = 'heart-atlas-toggle cell-zoom-toggle';
  toggle.setAttribute('aria-controls', 'cellZoomPanel');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-busy', 'false');
  toggle.textContent = 'Cell';
  toggle.onclick = () => {
    if (state.cellZoomOn) exitCellZoom();
    else void enterCellZoom().catch((error) => { console.error('Cell zoom toggle failed.', error); showToast(loadFailureMessage()); });
  };
  ($('viewerModes') || dock).appendChild(toggle);
  /* "Zoom inside" on the selection card, as the muscle zoom has: a tapped organ or vessel opens the level inside it */
  const card = $('selectedCard');
  if (card) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'cellZoomBtn';
    btn.className = 'primary muscle-zoom-btn';
    btn.hidden = true;
    btn.setAttribute('aria-controls', 'cellZoomPanel');
    btn.textContent = 'Zoom inside';
    const paint = () => {
      zoomInto = null;
      if (!state.cellZoomOn) {
        for (const m of [state.selectionAnchor, ...(state.selectionMeshes || [])].filter(Boolean)) {
          zoomInto = zoomFrom(m.userData?.layerKey, modelMeshName(m));
          if (zoomInto) break;
        }
      }
      btn.hidden = !zoomInto;
    };
    btn.onclick = () => { if (zoomInto) void enterCellZoom({ level: zoomInto }).catch((error) => { console.error('Cell zoom failed.', error); showToast(loadFailureMessage()); }); };
    const revise = $('selectedRevise');
    if (revise) card.insertBefore(btn, revise); else card.appendChild(btn);
    const name = $('selectedName');
    if (name && typeof MutationObserver === 'function') new MutationObserver(paint).observe(name, { childList: true, characterData: true, subtree: true });
  }
  window.__osteo = window.__osteo || {};
  const prevExit = window.__osteo.exitHeartAtlas;
  Object.assign(window.__osteo, {
    enterCellZoom, exitCellZoom, cellZoomOn: () => !!state.cellZoomOn,
    /* the viewer's other modes call this before they start; whichever atlas is open closes */
    exitHeartAtlas: () => { if (state.cellZoomOn) exitCellZoom(); else if (prevExit) prevExit(); },
  });
}
