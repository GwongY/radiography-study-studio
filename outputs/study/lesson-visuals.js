/*
 * Lesson visuals
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, DIAGRAMS, describeSource, esc, figureFor, schematic, visualFor } from './imports.js';
import { glossify } from './reading-help.js';
import { layoutHTML } from './layout-figures.js';

/* ------------------------------------------------------------------ *
 * Lesson visuals
 *
 * Every lesson opens with something to look at. Where the structure exists in
 * one of the six registered layers, that IS the visual: the studio canvas is
 * moved into the lesson card and focused on the named meshes, so it stays
 * tappable and rotatable rather than becoming a picture of itself. There is
 * only ever one WebGL context — it is relocated, never duplicated.
 * ------------------------------------------------------------------ */

let visMounted = null;   /* the spec currently occupying the shared canvas */

/*
 * A published figure, rendered with its teaching apparatus: an orientation line
 * above the image, and a key resolving every callout below it. A `beyond` entry
 * is a callout this lesson's own sources do not name -- it is read off the
 * figure's own published labelling, which is legitimate because the figure is a
 * cited, attributed source. Those are dimmed, sorted last, and trigger the note.
 * Shared by the schematic->figure and labelled->figure paths and by plateHTML.
 */
export function figureKeyHTML(spec) {
  if (!Array.isArray(spec.key) || !spec.key.length) return '';
  const rows = [...spec.key].sort((a, b) => (a.beyond ? 1 : 0) - (b.beyond ? 1 : 0));
  const anyBeyond = rows.some((r) => r.beyond);
  return `<dl class="figkey">${rows.map((r) =>
    `<div${r.beyond ? ' class="beyond"' : ''}><dt>${esc(r.mark)}</dt><dd>${glossify(esc(r.name))}</dd></div>`).join('')}</dl>`
    + (anyBeyond ? '<p class="figkey-note">Dimmed marks are the figure’s own labels, beyond this lesson’s named set.</p>' : '');
}

function figureBlockHTML(fig) {
  const lic = fig.licenceUrl
    ? `<a href="${esc(fig.licenceUrl)}" target="_blank" rel="noreferrer">${esc(fig.licence)}</a>`
    : esc(fig.licence);
  return `<figure class="lessonvis" data-kind="figure">
    <div class="lessonvis-head"><span class="lessonvis-kick">Figure</span><span class="lessonvis-title">${esc(fig.title)}</span></div>
    ${fig.intro ? `<p class="figintro">${glossify(esc(fig.intro))}</p>` : ''}
    <div class="lessonvis-fig"><img src="${esc(fig.src)}" alt="${esc(fig.title)}" loading="lazy"></div>
    <figcaption class="lessonvis-cap">${esc(fig.caption)}
      <span class="figcredit">${esc(fig.author)} · ${lic} · <a href="${esc(fig.commons)}" target="_blank" rel="noreferrer">Wikimedia Commons</a></span>
    </figcaption>
    ${figureKeyHTML(fig)}
  </figure>`;
}

export function visualSlotHTML(item) {
  const spec = visualFor(item);
  if (!spec) return '';
  if (spec.kind === 'model') {
    return `<figure class="lessonvis" id="lessonVis" data-kind="model">
      <div class="lessonvis-head"><span class="lessonvis-kick">3D · tap to name</span><span class="lessonvis-title">${esc(spec.label || item.title)}</span></div>
      <div class="lessonvis-mount" id="lessonVisMount"><div class="lessonvis-busy" id="lessonVisBusy">preparing the model…</div></div>
      <div class="lessonvis-readout" id="lessonVisReadout"><span class="dim">tap a structure to name it</span></div>
      <figcaption class="lessonvis-cap">${esc(spec.caption || '')}</figcaption>
    </figure>`;
  }
  if (spec.kind === 'schematic') {
    /*
     * A published figure wins over anything drawn here. The hand-plotted SVGs
     * were fine for a feedback loop and wrong for anatomy -- they were plotted
     * from guessed coordinates, so proportions and positions were whatever the
     * numbers happened to be. Where a real one exists it is used instead.
     */
    const fig = figureFor(spec.id);
    if (fig) return figureBlockHTML(fig);
    const sc = schematic(spec.id);
    if (!sc) return '';
    /* HTML where the content has been rebuilt as a layout; the plotted SVG only
       still renders for anything that has not been converted. */
    const lay = layoutHTML(spec.id, sc);
    if (lay) return lay;
    return `<figure class="lessonvis" data-kind="schematic">
      <div class="lessonvis-head"><span class="lessonvis-kick">Drawn by this app</span><span class="lessonvis-title">${esc(sc.title)}</span></div>
      <div class="lessonvis-body">${sc.svg()}</div>
      <figcaption class="lessonvis-cap">${esc(sc.caption)}
        <span class="figcredit">A layout, not a depiction \u2014 no anatomy is being drawn to scale here.</span>
      </figcaption>
    </figure>`;
  }
  if (spec.kind === 'labelled') {
    /*
     * Same rule as the schematics, and the same reason. The plotted heart put
     * all four chambers at mirrored coordinates as equal quadrants of one oval,
     * on an item that teaches the right ventricle is thin and pouch-shaped while
     * the left is round and thick. A real figure replaces it where one exists.
     */
    const fig = figureFor(spec.id);
    if (fig) return figureBlockHTML(fig);
    const d = DIAGRAMS[spec.id];
    if (!d) return '';
    const shapes = d.shapes.map((x) => x.kind === 'ellipse' ? `<ellipse class="sk" cx="${x.cx}" cy="${x.cy}" rx="${x.rx}" ry="${x.ry}"/>`
      : x.kind === 'circle' ? `<circle class="sk" cx="${x.cx}" cy="${x.cy}" r="${x.r}" ${x.faint ? 'opacity=".4"' : ''}/>`
      : `<path class="sk" d="${x.d}"/>`).join('');
    /* The teaching view: the shape with its anchor points. The blank, guided
       and labelled views belong to the practice question, not to the lesson. */
    const dots = Object.entries(d.labels).map(([, pt]) =>
      `<circle class="hot" cx="${pt[0]}" cy="${pt[1]}" r="6" style="pointer-events:none"/>`).join('');
    return `<figure class="lessonvis" data-kind="labelled">
      <div class="lessonvis-head"><span class="lessonvis-kick">Diagram</span><span class="lessonvis-title">${esc(d.title)}</span></div>
      <div class="lessonvis-body"><svg viewBox="${d.viewBox}" role="img" aria-label="${esc(d.title)}">${shapes}${dots}</svg></div>
      <figcaption class="lessonvis-cap">${esc(d.caption)} Every point is answerable in the practice question.</figcaption>
    </figure>`;
  }
  if (spec.kind === 'generated') return generatedVisualHTML(spec);
  return '';
}

/*
 * Generated visuals draw the item's own sourced data. Nothing new is asserted
 * here — the same steps, pairs and facts the lesson already lists, laid out so
 * that the shape of the answer is visible instead of buried in a paragraph.
 */
function generatedVisualHTML(spec) {
  let kick = 'From this item';
  let body = '';
  if (spec.form === 'flow') {
    kick = 'Order';
    body = `<div class="vis-flow">${spec.steps.map((st, i) =>
      `${i ? '<span class="vis-arrow">→</span>' : ''}<div class="vis-step"><b>${i + 1}</b>${esc(st)}</div>`).join('')}</div>`;
  } else if (spec.form === 'grid') {
    kick = 'Pairs';
    body = `<div class="vis-grid">${spec.pairs.map(([k, v]) =>
      `<span class="k">${esc(k)}</span><span class="a">→</span><span class="v">${esc(v)}</span>`).join('')}</div>`;
  } else if (spec.form === 'contrast') {
    kick = 'The contrast';
    body = `<div class="vis-contrast">${esc(spec.text)}</div>${spec.facts.length
      ? `<div class="vis-facts" style="margin-top:10px">${spec.facts.map((f) => `<div class="vis-fact">${esc(f)}</div>`).join('')}</div>` : ''}`;
  } else {
    kick = 'At a glance';
    body = `<div class="vis-facts">${spec.facts.map((f) => `<div class="vis-fact">${esc(f)}</div>`).join('')}</div>`;
  }
  return `<figure class="lessonvis" data-kind="generated">
    <div class="lessonvis-head"><span class="lessonvis-kick">${esc(kick)}</span><span class="lessonvis-title">${esc(spec.label)}</span></div>
    <div class="lessonvis-body">${body}</div>
  </figure>`;
}

/*
 * Move the shared studio canvas into the lesson and focus it. Reparenting a
 * canvas keeps its WebGL context alive, so this costs a resize and nothing else.
 */
export async function mountLessonVisual(item) {
  const mount = $$('lessonVisMount');
  if (!mount) { releaseLessonVisual(); return; }
  const spec = visualFor(item);
  if (!spec || spec.kind !== 'model') { releaseLessonVisual(); return; }
  const busy = $$('lessonVisBusy');
  try {
    if (!window.__osteo) throw new Error('no engine');
    /* boot3D is async and may still be fetching three.js and the skeleton. */
    const booted = await window.__osteo.boot();
    if (!booted) throw new Error('boot failed');
    const stage = window.__osteo.stageEl();
    if (!stage) throw new Error('no stage');
    mount.appendChild(stage);
    visMounted = spec;
    window.__osteo.resize();
    if (busy) busy.textContent = 'loading the layer…';
    const res = await window.__osteo.focusStructures(spec);
    window.__osteo.resize();
    if (!res || !res.ok) {
      /* Never quietly fall back to the whole body — that would read as though
         the entire skeleton were the answer to the question being taught. */
      visualFallback(res && res.reason === 'no-match'
        ? 'None of this item’s structures resolved in the model, so no 3D is shown.'
        : 'The 3D layer could not be loaded right now.');
      return;
    }
    if (busy) busy.remove();
    window.__osteo.setPickHook((rec) => {
      const out = $$('lessonVisReadout');
      if (!out || !rec) return;
      const side = rec.side && rec.side !== 'bilateral' ? `<span class="side">${esc(rec.side)}</span>` : '';
      out.innerHTML = `${esc(rec.canonicalName)}${side}`;
    });
  } catch (e) {
    visualFallback('3D is unavailable right now.');
  }
}

function visualFallback(msg) {
  restoreStage();
  visMounted = null;
  const fig = $$('lessonVis');
  if (fig) fig.innerHTML = `<div class="lessonvis-fallback">${esc(msg)} The lesson below is unaffected.</div>`;
}

export function restoreStage() {
  const home = $$('stageHome');
  const stage = window.__osteo && window.__osteo.stageEl && window.__osteo.stageEl();
  if (home && stage && stage.parentElement !== home) home.insertBefore(stage, home.firstChild);
}

export function releaseLessonVisual() {
  if (window.__osteo && window.__osteo.setPickHook) window.__osteo.setPickHook(null);
  if (!visMounted) { restoreStage(); return; }
  visMounted = null;
  if (window.__osteo && window.__osteo.clearStudyFocus) window.__osteo.clearStudyFocus();
  restoreStage();
  if (window.__osteo && window.__osteo.resize) window.__osteo.resize();
}

/*
 * Two orderings of the same sourced material.
 *
 * Without prior knowledge the lecture explanation leads, as it always has.
 * With it, the lecture's own additions lead and the shared background drops
 * into a fold: nothing is deleted and every sourceRefs claim still stands, it
 * simply stops being the first thing read for the fourth time.
 */
export function priorLeadHTML(item, prior) {
  const pitch = prior.covers === 'most'
    ? 'This lecture mostly re-treads it. The lines below are what it adds on top, and they are the examinable part.'
    : 'A real part of this item is new. The background you already have is folded away at the foot of the card.';
  /*
   * Same discipline as everywhere else in this app: each line shows the slide
   * it came off, so nothing here can quietly drift into textbook expansion.
   */
  const line = (b) => {
    const cite = b.src && b.src.location
      ? `<span class="beyondcite">${esc((describeSource(b.src).file || b.src.ref) + " \u00b7 " + b.src.location)}</span>`
      : '';
    return `<li>${glossify(esc(b.t))}${cite}</li>`;
  };
  return `<div class="priorbar"><div class="txt"><span class="kick">Already covered · ${esc(prior.label)}</span>${esc(prior.blurb)}<p>${esc(pitch)}</p></div></div>
    <div class="subhead">What this lecture adds beyond ${esc(prior.short)}</div>
    <ul class="facts">${prior.beyond.map(line).join('')}</ul>`;
}
