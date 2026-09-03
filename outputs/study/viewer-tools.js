/*
 * Viewer tools — annotate, cut, layer depth, capture
 *
 * The panel side of studio/tools-and-capture.js. Everything here is DOM; every
 * line that touches the model goes through window.__osteo, like the rest of
 * the study half.
 *
 * One card, grouped in the order you reach for the tools: mark what you are
 * looking at, section it to see inside, fade what is in the way, keep the
 * picture. Choosing a REGION is deliberately not here — the Region filter card
 * beside it already does that, and now frames the camera too.
 *
 * Split out along the banner sections. See docs/CODEMAP.md.
 */
import { $$, describeSource, esc } from './imports.js';
import { BODY_LAYERS, GHOST_OPACITY, layerState, renderLayerRail } from './subject.js';
import { toast } from './small-ui-helpers.js';

/* Local mirror of the cut, so the slider knows what it is moving. */
const cut = { axis: null, t: 0.5, flip: false, level: null };

function osteo() { return window.__osteo || null; }

export function renderViewerTools() {
  const o = osteo();
  const tools = $$('toolButtons');
  if (!tools) return;
  const armed = o && o.toolState ? o.toolState() : 'off';
  const list = o && o.tools ? o.tools() : [];
  tools.innerHTML = list.map((t) => `<button class="icon-btn${armed === t.id ? ' active' : ''}"
      data-tool="${esc(t.id)}" title="${esc(t.hint || '')}" aria-pressed="${armed === t.id}">${esc(t.label)}</button>`).join('')
    + `<button class="icon-btn${armed === 'off' ? ' active' : ''}" data-tool="off" aria-pressed="${armed === 'off'}">Off</button>`;
  tools.querySelectorAll('[data-tool]').forEach((b) => {
    b.onclick = () => {
      if (!osteo() || !osteo().setTool) { toast('Open the 3D model first.'); return; }
      osteo().setTool(b.dataset.tool);
      renderViewerTools();
    };
  });

  const axes = $$('cutButtons');
  if (axes) {
    const live = o && o.cutState ? o.cutState() : null;
    if (live) { cut.axis = live.axis; cut.t = live.t; cut.flip = live.flip; cut.level = live.level; }
    else cut.level = null;
    const specs = o && o.cutAxes ? o.cutAxes() : [];
    axes.innerHTML = specs.map((a) => `<button class="icon-btn${cut.axis === a.id ? ' active' : ''}"
        data-cut="${esc(a.id)}" title="${esc(a.hint)}" aria-pressed="${cut.axis === a.id}">${esc(a.label)}</button>`).join('');
    axes.querySelectorAll('[data-cut]').forEach((b) => {
      b.onclick = () => {
        if (!osteo() || !osteo().setCut) { toast('Open the 3D model first.'); return; }
        /* Pressing the axis you are already on clears it — the same chip is
           the way in and the way out, as the layer chips already work. */
        if (cut.axis === b.dataset.cut) { osteo().clearCut(); cut.axis = null; }
        else { cut.axis = b.dataset.cut; osteo().setCut(cut.axis, cut.t, cut.flip); }
        renderViewerTools();
      };
    });
    const slider = $$('cutSlider');
    if (slider) slider.value = String(Math.round(cut.t * 100));
    const read = $$('cutRead');
    /* On a named level the percentage is noise -- the level IS the position,
       and it is the thing an exam question would have asked for. */
    const named = cut.level && (o && o.cutLevels ? o.cutLevels() : []).find((r) => r.id === cut.level);
    if (read) read.textContent = !cut.axis ? 'no cut' : named ? named.label : `${Math.round(cut.t * 100)}%`;
    const flip = $$('cutFlip');
    if (flip) flip.classList.toggle('active', !!cut.flip);
  }

  const count = $$('toolCount');
  if (count) {
    const n = o && o.annotationCount ? o.annotationCount() : 0;
    count.textContent = n ? `${n} annotation${n === 1 ? '' : 's'}` : 'nothing drawn yet';
  }

  renderCutLevels();
  renderLayerDepth();
  renderToolChip();
}

/* ------------------------------------------------------------------ *
 * Named levels
 *
 * The axis buttons say which way the plane faces; these say WHERE it sits, in
 * the words the course uses. A student is asked for the axial section at the
 * sternal angle, never for one at 62%, so the levels are the primary control
 * and the slider is what you reach for afterwards to look either side of it.
 *
 * Every level shown here measured against the model that is actually loaded --
 * studio/tools-and-capture.js leaves out any level whose structure is missing,
 * so a chip that is drawn is a chip that works. The citation under the row is
 * the same source machinery the lesson cards use, because a level IS a claim:
 * it says the sternal angle is here, and the student is entitled to the page.
 * ------------------------------------------------------------------ */
const AXIS_TITLE = { axial: 'Axial', sagittal: 'Sagittal', coronal: 'Coronal' };

function renderCutLevels() {
  const host = $$('cutLevels');
  if (!host) return;
  const o = osteo();
  if (o && o.inXray && o.inXray()) {
    host.innerHTML = '<p class="small">The section is put away while the Projection tab is open — that beam is drawn by a shader that ignores clipping planes, so a cut there would be silently ignored. It comes back exactly as you left it.</p>';
    return;
  }
  const rows = o && o.cutLevels ? o.cutLevels() : [];
  if (!rows.length) {
    host.innerHTML = '<p class="small">Open the 3D model to measure its levels.</p>';
    return;
  }
  const groups = [];
  for (const r of rows) {
    let g = groups.find((x) => x.axis === r.axis);
    if (!g) { g = { axis: r.axis, rows: [] }; groups.push(g); }
    g.rows.push(r);
  }
  const active = rows.find((r) => r.active) || null;
  host.innerHTML = groups.map((g) => `<div class="cut-levelrow">
      <span class="cut-levelax">${esc(AXIS_TITLE[g.axis] || g.axis)}</span>
      ${g.rows.map((r) => `<button class="icon-btn sm${r.active ? ' active' : ''}" data-level="${esc(r.id)}"
        aria-pressed="${r.active}">${esc(r.label)}</button>`).join('')}
    </div>`).join('')
    /* Coronal is absent by decision, not by accident, so the panel says so
       rather than leaving a student to wonder which button they are missing. */
    + '<p class="small cut-levelnote">No named coronal levels: a coronal section is named against the mid-axillary line, and none of this app&rsquo;s sources name it. Use the slider.</p>'
    + (active ? `<p class="small cut-levelnote"><strong>${esc(active.label)}.</strong> ${esc(active.note)}${citationHTML(active)}</p>` : '');

  host.querySelectorAll('[data-level]').forEach((b) => {
    b.onclick = () => {
      if (!osteo() || !osteo().setCutLevel) { toast('Open the 3D model first.'); return; }
      /* Pressing the level you are already on clears the cut, the same way the
         axis chips and the layer chips already work. */
      if (b.classList.contains('active')) osteo().clearCut();
      else osteo().setCutLevel(b.dataset.level, cut.flip);
      renderViewerTools();
    };
  });
}

/*
 * The page behind a level, written the way the source dialog writes one.
 *
 * Grouped by file: the sternal angle cites two lines of the same lecture page,
 * and naming the PDF twice in a 250px column reads as two sources rather than
 * as one page saying two things.
 */
function citationHTML(level) {
  const refs = level.refs || [];
  if (!refs.length) return '';
  const byFile = [];
  for (const r of refs) {
    const d = describeSource(r);
    let g = byFile.find((x) => x.file === d.file);
    if (!g) { g = { file: d.file, where: [] }; byFile.push(g); }
    if (d.location && !g.where.includes(d.location)) g.where.push(d.location);
  }
  return ' <span class="cut-levelcite">' + byFile
    .map((g) => esc(g.file + (g.where.length ? ' — ' + g.where.join('; ') : '')))
    .join('<br>') + '</span>';
}

/* ------------------------------------------------------------------ *
 * Layer depth
 *
 * An atlas app numbers its layers — "Layer 7, Muscular" — and the number is a
 * peel depth: how far in you have dug on that system. This app peels by tap
 * instead, so the equivalent control is the one thing the chips cannot say:
 * how far through each loaded system you can see. Solid, ghost and off are the
 * three stops the chip cycles; this is the same axis, continuous, and it only
 * lists layers that are actually loaded, because there is nothing to fade in a
 * layer that was never downloaded.
 * ------------------------------------------------------------------ */
function renderLayerDepth() {
  const host = $$('layerDepth');
  if (!host) return;
  const o = osteo();
  const loaded = BODY_LAYERS.filter((l) => o && o.layerLoaded && o.layerLoaded(l.key) && (layerState[l.key] || 'off') !== 'off');
  if (!loaded.length) {
    host.innerHTML = '<p class="small">Turn a layer on below the model and its opacity appears here.</p>';
    return;
  }
  host.innerHTML = loaded.map((l) => {
    const pct = Math.round((layerState[l.key] === 'ghost' ? GHOST_OPACITY : 1) * 100);
    return `<label class="depthrow"><span>${esc(l.label)}</span>
      <input type="range" min="8" max="100" value="${pct}" data-depth="${esc(l.key)}" aria-label="${esc(l.label)} opacity">
      <span class="mono" data-depthread="${esc(l.key)}">${pct}%</span></label>`;
  }).join('');
  host.querySelectorAll('[data-depth]').forEach((r) => {
    r.oninput = () => {
      const key = r.dataset.depth;
      const v = Number(r.value) / 100;
      if (osteo() && osteo().setLayerOpacity) osteo().setLayerOpacity(key, v);
      /* Keep the chip honest: anything below solid reads as a ghosted layer. */
      layerState[key] = v > 0.92 ? 'solid' : 'ghost';
      const read = host.querySelector(`[data-depthread="${key}"]`);
      if (read) read.textContent = `${r.value}%`;
      renderLayerRail();
    };
  });
}

/* ------------------------------------------------------------------ *
 * The armed-tool badge
 *
 * The tools live in the sheet, and the sheet is usually shut while you use
 * them. Without this you arm the pen, scroll back to the model, and the stage
 * has silently stopped selecting with nothing on screen saying why.
 * ------------------------------------------------------------------ */
function renderToolChip() {
  const chip = $$('toolChip');
  if (!chip) return;
  const o = osteo();
  const armed = o && o.toolState ? o.toolState() : 'off';
  const spec = (o && o.tools ? o.tools() : []).find((t) => t.id === armed);
  chip.classList.toggle('hidden', armed === 'off');
  const text = $$('toolChipText');
  if (text && spec) text.textContent = `${spec.label} — ${spec.hint}`;
}

export function init() {
  const note = $$('toolNote');
  if (note) note.oninput = () => { if (osteo() && osteo().setNoteText) osteo().setNoteText(note.value); };

  const slider = $$('cutSlider');
  if (slider) slider.oninput = () => {
    cut.t = Number(slider.value) / 100;
    const read = $$('cutRead');
    if (read) read.textContent = cut.axis ? `${slider.value}%` : 'no cut';
    if (cut.axis && osteo() && osteo().setCut) osteo().setCut(cut.axis, cut.t, cut.flip);
  };

  const flip = $$('cutFlip');
  if (flip) flip.onclick = () => {
    cut.flip = !cut.flip;
    /* Flipping keeps the level. It is the same plane seen from the other side,
       so going back through setCut -- which rebuilds the cut from a raw t and
       forgets what it was named -- would silently drop the label. */
    if (cut.level && osteo() && osteo().setCutLevel) osteo().setCutLevel(cut.level, cut.flip);
    else if (cut.axis && osteo() && osteo().setCut) osteo().setCut(cut.axis, cut.t, cut.flip);
    renderViewerTools();
  };
  const clear = $$('cutClear');
  if (clear) clear.onclick = () => {
    if (osteo() && osteo().clearCut) osteo().clearCut();
    cut.axis = null; cut.level = null;
    renderViewerTools();
  };

  const undo = $$('toolUndo');
  if (undo) undo.onclick = () => {
    if (!osteo() || !osteo().undoAnnotation) { toast('Open the 3D model first.'); return; }
    if (!osteo().undoAnnotation()) toast('Nothing to undo.');
    renderViewerTools();
  };
  const wipe = $$('toolClear');
  if (wipe) wipe.onclick = () => {
    if (osteo() && osteo().clearAnnotations) osteo().clearAnnotations();
    renderViewerTools();
  };
  const off = $$('toolChipOff');
  if (off) off.onclick = () => {
    if (osteo() && osteo().setTool) osteo().setTool('off');
    renderViewerTools();
  };

  const shot = $$('toolShot');
  if (shot) shot.onclick = () => {
    if (!osteo() || !osteo().snapshot) { toast('Open the 3D model first.'); return; }
    const url = osteo().snapshot();
    if (!url) { toast('The model is not rendering yet.'); return; }
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-studio-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Saved the current view as a PNG.');
  };

  /* The engine tells the panel when a tap changed something — a pinned label
     is created on the stage, not in here. */
  if (osteo() && osteo().setToolHook) osteo().setToolHook(() => renderViewerTools());
  renderViewerTools();
}
