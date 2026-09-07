/*
 * Spatial overlay controls (viewer "..." sheet)
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, BODY_CONCEPTS, CONCEPT_GROUPS, conceptAncestors, conceptChildren, esc } from './imports.js';

/* ------------------------------------------------------------------ *
 * Spatial overlay controls (viewer "..." sheet)
 * ------------------------------------------------------------------ */
export function renderOverlayCard(active) {
  active = active || (window.__osteo && window.__osteo.activeConcepts ? window.__osteo.activeConcepts() : []);
  const set = new Set(active);
  const groups = $$('overlayGroups');
  const items = $$('overlayItems');
  if (!groups || !items) return;
  groups.innerHTML = CONCEPT_GROUPS.map((g) => {
    /* Lit whenever ANY of the kind is showing, standalone included — the
       button clears all of them, so it must look on whenever there is
       something for it to clear. */
    const on = BODY_CONCEPTS.some((c) => c.kind === g.kind && set.has(c.id));
    return `<button class="ochip" data-kind="${g.kind}" aria-pressed="${on}">${esc(g.name)}</button>`;
  }).join('');
  const swatch = (c) => `<i style="background:#${(c.color >>> 0).toString(16).padStart(6, '0')}"></i>`;
  const btn = (c, cls) => `<button class="oitem${cls ? ' ' + cls : ''}" data-concept="${c.id}"`
    + ` aria-pressed="${set.has(c.id)}" title="${esc(c.blurb || '')}">${swatch(c)}${esc(c.name)}</button>`;
  /*
   * Cavities nest, so the list nests: the two body cavities first, then what
   * each contains, indented. A flat list of eleven gives no clue that the
   * pericardial sac is inside the mediastinum, which is the relationship the
   * exam actually asks about.
   */
  const cavityRows = () => {
    const out = ['<div class="ohead">Cavities</div>'];
    const emitted = new Set();
    const emit = (c, depth) => {
      if (emitted.has(c.id)) return;
      emitted.add(c.id);
      out.push(btn(c, depth ? 'child' : ''));
      conceptChildren(c.id).forEach((k) => emit(k, depth + 1));
    };
    BODY_CONCEPTS.filter((c) => c.kind === 'cavity' && !c.parent).forEach((c) => emit(c, 0));
    BODY_CONCEPTS.filter((c) => c.kind === 'cavity' && !emitted.has(c.id)).forEach((c) => emit(c, 0));
    return out.join('');
  };
  const planeRows = '<div class="ohead">Planes</div>'
    + BODY_CONCEPTS.filter((c) => c.kind === 'plane').map((c) => btn(c)).join('');
  items.innerHTML = cavityRows() + planeRows;
  groups.querySelectorAll('[data-kind]').forEach((b) => {
    b.onclick = () => { if (window.__osteo && window.__osteo.toggleConceptKind) { window.__osteo.toggleConceptKind(b.dataset.kind); } };
  });
  items.querySelectorAll('[data-concept]').forEach((b) => {
    b.onclick = () => { if (window.__osteo && window.__osteo.toggleConcept) { window.__osteo.toggleConcept(b.dataset.concept); } };
  });
  renderOverlayModes(set);
  renderOverlayProvenance(set);
}
/*
 * The five ways of looking. Only offered while something is shown, because
 * every one of them works by changing how the ANATOMY is drawn.
 */
function renderOverlayModes(set) {
  const el = $$('overlayModes');
  if (!el) return;
  const api = window.__osteo;
  if (!api || !api.cavityModes || !set.size) { el.classList.add('hidden'); el.innerHTML = ''; return; }
  const cur = api.cavityMode ? api.cavityMode() : 'normal';
  el.classList.remove('hidden');
  el.innerHTML = '<div class="ohead">How to look</div>'
    + api.cavityModes().map((m) =>
      `<button class="omode" data-mode="${m.id}" aria-pressed="${m.id === cur}" title="${esc(m.hint)}">${esc(m.label)}</button>`).join('');
  el.querySelectorAll('[data-mode]').forEach((b) => {
    b.onclick = () => { api.setCavityMode(b.dataset.mode); renderOverlayCard(); };
  });
}
/*
 * Where the shape came from.
 *
 * Every cavity is derived from real meshes, but they are not all derived
 * equally well: with the organ layer unloaded the mediastinum is estimated
 * from the vertebral bodies rather than measured between the lungs. Saying so
 * costs three lines and is the difference between a model and a claim.
 */
function renderOverlayProvenance(set) {
  const el = $$('overlayProv');
  if (!el) return;
  const api = window.__osteo;
  const shown = BODY_CONCEPTS.filter((c) => c.kind === 'cavity' && set.has(c.id));
  /*
   * A grid is one construction from one set of landmarks, so the nine regions
   * get one entry rather than nine identical ones. The lines they are built
   * from are the whole claim being made, and this is where it gets stated.
   */
  const GRID_TITLE = { region: 'The nine abdominopelvic regions', quadrant: 'The four quadrants' };
  Object.keys(GRID_TITLE).forEach((kind) => {
    const first = BODY_CONCEPTS.find((c) => c.kind === kind && set.has(c.id));
    if (first) shown.push(first);
  });
  if (!api || !api.conceptProvenance || !shown.length) {
    el.classList.add('hidden'); el.innerHTML = ''; return;
  }
  const parts = [];
  shown.forEach((c) => {
    const p = api.conceptProvenance(c.id);
    if (!p) return;
    const trail = conceptAncestors(c.id).map((a) => esc(a.name));
    const kids = conceptChildren(c.id).map((k) => esc(k.name));
    const bits = [];
    if (trail.length) bits.push(`inside ${trail.join(' → ')}`);
    if (kids.length) bits.push(`contains ${kids.join(', ')}`);
    const title = GRID_TITLE[c.kind] || c.name;
    parts.push(`<div class="otrail"><b>${esc(title)}</b>${bits.length ? ' — ' + bits.join('; ') : ''}`
      + (p.basis && p.basis.length ? `<br>measured from ${esc(p.basis.join(', ').toLowerCase())}` : '')
      + (p.notes || []).map((n) => `<br><span class="oapprox">${esc(n)}</span>`).join('')
      + '</div>');
  });
  if (!parts.length) { el.classList.add('hidden'); el.innerHTML = ''; return; }
  el.classList.remove('hidden');
  el.innerHTML = '<h4>Derived from</h4>' + parts.join('');
}
