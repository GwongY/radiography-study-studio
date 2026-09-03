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
import { $$, esc } from './imports.js';
import { BODY_LAYERS, GHOST_OPACITY, layerState, renderLayerRail } from './subject.js';
import { toast } from './small-ui-helpers.js';

/* Local mirror of the cut, so the slider knows what it is moving. */
const cut = { axis: null, t: 0.5, flip: false };

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
    if (live) { cut.axis = live.axis; cut.t = live.t; cut.flip = live.flip; }
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
    if (read) read.textContent = cut.axis ? `${Math.round(cut.t * 100)}%` : 'no cut';
    const flip = $$('cutFlip');
    if (flip) flip.classList.toggle('active', !!cut.flip);
  }

  const count = $$('toolCount');
  if (count) {
    const n = o && o.annotationCount ? o.annotationCount() : 0;
    count.textContent = n ? `${n} annotation${n === 1 ? '' : 's'}` : 'nothing drawn yet';
  }

  renderLayerDepth();
  renderToolChip();
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
    if (cut.axis && osteo() && osteo().setCut) osteo().setCut(cut.axis, cut.t, cut.flip);
    renderViewerTools();
  };
  const clear = $$('cutClear');
  if (clear) clear.onclick = () => {
    if (osteo() && osteo().clearCut) osteo().clearCut();
    cut.axis = null;
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
