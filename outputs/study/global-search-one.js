/*
 * Global search -- one sheet over every destination, mixing structures,
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, BODY_CONCEPTS, CONCEPT_GROUPS, ITEM_TYPES, MESH_INDEX, SEARCH_EXTRAS, STRUCTURE_MODELS, STUDY_ITEMS, UNITS, compositeFor, entryStep, esc, expandQuery, getSubject, missingFor, searchAnatomy, ui } from './imports.js';
import { adjScore, itemAttempted } from './storage-versioned-keys.js';
import { goTo, openSessionOverlay } from './navigation-five-destinations.js';
import { openStructureInViewer } from './search-viewer-open.js';
import { releaseLessonVisual } from './lesson-visuals.js';
import { renderLearn, topicsWithContent } from './subject.js';
import { setStep } from './session-engine.js';
import { showView } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Global search -- one sheet over every destination, mixing structures,
 * study items and topics. Replaces the studio-only anatomy search card.
 * ------------------------------------------------------------------ */

let searchReturnFocus = null;

export function openSearchSheet() {
  searchReturnFocus = document.activeElement;
  $$('searchScrim').classList.remove('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = true;
  /* The session overlay is a sibling of the shell, not a child — inert it too so
     focus cannot land on the lesson behind the scrim. */
  const sess = $$('sessionView');
  if (sess && !sess.classList.contains('hidden')) sess.inert = true;
  const input = $$('globalSearch');
  input.value = '';
  runSearch('');
  input.focus();
}
export function closeSearchSheet() {
  $$('searchScrim').classList.add('hidden');
  const sess = $$('sessionView');
  const sessionUp = sess && !sess.classList.contains('hidden');
  const shell = document.querySelector('.app-shell');
  /* If a lesson is still underneath, the shell stays inert for it. */
  if (shell) shell.inert = !!sessionUp;
  if (sess) sess.inert = false;
  if (searchReturnFocus && searchReturnFocus.focus) searchReturnFocus.focus();
  searchReturnFocus = null;
}

/* A search result that jumps into the viewer has to take down the lesson
   overlay first — it is a fixed layer that showView() does not touch. The
   lesson autosaves each step, so dropping the current one is safe. */
export function dismissSessionForNav() {
  const sess = $$('sessionView');
  if (!sess || sess.classList.contains('hidden')) return;
  if (typeof releaseLessonVisual === 'function') releaseLessonVisual();
  ui.session = null;
  sess.classList.add('hidden');
  sess.inert = false;
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = false;
}

/* One item, taught on its own -- used when a search result names a
   specific study item rather than a whole topic. */
function studySingleItem(item) {
  ui.session = {
    opts: { mode: 'subject', subject: item.subject }, mode: null, items: [item], index: 0,
    step: 'learn', qIndex: 0, answered: false, startedAt: 0,
    results: [], hooksOnly: false, modeLabel: 'Single item',
  };
  openSessionOverlay();
  setStep('learn');
}

/*
 * One topic, opened at the item you tapped.
 *
 * The same queue "Study this topic" builds -- the whole topic is in it, and
 * Next walks the rest -- except the item you actually asked for leads it, in
 * the weakest-first order the list on screen is already sorted by.
 */
export function studyItemWithin(topic, itemId) {
  const ordered = topic.items.slice().sort((a, b) => adjScore(a) - adjScore(b));
  const at = ordered.findIndex((i) => i.id === itemId);
  if (at < 0) return;
  const items = [ordered[at], ...ordered.slice(0, at), ...ordered.slice(at + 1)];
  ui.session = {
    opts: { mode: 'subject', subject: topic.subject.id, unit: topic.unit.id }, mode: null, items, index: 0,
    step: 'learn', qIndex: 0, answered: false, startedAt: 0,
    results: [], hooksOnly: false, modeLabel: topic.unit.label,
  };
  openSessionOverlay();
  setStep(entryStep(items[0], itemAttempted(items[0].id)));
}

/*
 * One query, every name a structure goes by.
 *
 * `terms` is the typed query plus every synonym of it (see synonyms.js), so a
 * matcher written against this finds "collarbone" when the data says clavicle.
 * `hay` is lower-cased already; callers must not re-lower it per term.
 */
function makeMatcher(needle) {
  const terms = expandQuery(needle);
  return (hay) => terms.some((t) => hay.includes(t));
}

/*
 * Where a structure's name comes from.
 *
 * "Opens in Viewer" was the same note on all 1,686 rows, so nothing on screen
 * distinguished the aortic valve from the anterior meniscotibial ligament.
 * mesh-index.js now carries, per structure, the taught or assessed file that
 * names it and how: `listed` in the examinable glossary, `named` verbatim in a
 * lecture or paper, or `described` -- all of its words in one sentence of one,
 * which is how the notes give the lung lobes.
 */
function shortSource(file) {
  const base = String(file).split('/').pop().replace(/\.(pdf|pptx)$/i, '');
  /* "Module 1 Thorax/Previous Years/1.1 Cardiovascular System and Lungs (17-18)"
     is the whole path; the leaf alone is what a student recognises, except for
     the ones every folder repeats. */
  if (/^(Lecture notes|Revision Exercise|Tutorial answer|Extra exercise|Reading \d+)$/i.test(base)) {
    const parts = String(file).split('/');
    return `${parts[parts.length - 2] || base} \u2014 ${base}`;
  }
  return base;
}
const EVIDENCE_WORD = { listed: 'in the examinable glossary',
  named: 'named in', described: 'described in' };
function sourceNote(m) {
  if (!m.source) return 'not named in your course material';
  return m.source.evidence === 'listed'
    ? 'in the examinable glossary'
    : `${EVIDENCE_WORD[m.source.evidence] || 'named in'} ${shortSource(m.source.file)}`;
}

/*
 * Unit -> its rows, and unit -> the row that IS the unit.
 *
 * EVERY row belongs to a unit, so these two cover the whole index: a
 * course-named structure together with the finer rows absorbed into it, a
 * group and its members, or a lone structure on its own.
 */
const UNIT_ROWS = new Map();
const UNIT_HEAD = new Map();
MESH_INDEX.forEach((m) => {
  const list = UNIT_ROWS.get(m.unitId) || [];
  list.push(m);
  UNIT_ROWS.set(m.unitId, list);
  if (m.isUnit) UNIT_HEAD.set(m.unitId, m);
});

function searchHits(q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const hits = [];
  const matches = makeMatcher(needle);

  topicsWithContent().forEach((t) => {
    if (t.unit.label.toLowerCase().includes(needle) || t.subject.code.toLowerCase().includes(needle)) {
      hits.push({ kind: 'Topic', title: t.unit.label, note: `${t.group.label} \u00b7 ${t.subject.code} \u00b7 ${t.items.length} items`,
        go: () => { ui.learnFilter = 'all'; ui.learnTopic = t.unit.id; ui.learnDrill = true; closeSearchSheet(); dismissSessionForNav(); renderLearn(); } });
    }
  });

  STUDY_ITEMS.forEach((i) => {
    const hay = (i.title + ' ' + (i.tags || []).join(' ')).toLowerCase();
    if (hay.includes(needle)) {
      hits.push({ kind: 'Item', title: i.title, note: `${getSubject(i.subject).title} \u00b7 ${(ITEM_TYPES[i.type] || {}).label || i.type}`,
        go: () => { closeSearchSheet(); studySingleItem(i); } });
    }
  });

  /*
   * One row per structure across all four sources.
   *
   * The curated bone records, the curated extras and the generated mesh index
   * overlap \u2014 the clavicle is in all three \u2014 so each source claims its names
   * here and later sources skip what is already claimed. Without this,
   * "collarbone" returned Clavicle twice.
   */
  const seen = new Set();
  const claim = (name) => seen.add('n:' + String(name).toLowerCase());
  const taken = (name) => seen.has('n:' + String(name).toLowerCase());

  expandQuery(needle).forEach((t) => searchAnatomy(t).forEach((r) => {
    if (seen.has('db:' + r.id)) return;
    seen.add('db:' + r.id);
    claim(r.canonicalName);
    hits.push({ kind: 'Structure', title: r.canonicalName, note: `${r.region} \u00b7 opens in Viewer`,
      go: () => openStructureInViewer({ id: r.id }) });
  }));

  /* Curated extras \u2014 structures that live in a system layer (muscles, heart
     chambers, brain, organs). These carry a teaching blurb, so they outrank the
     bare index entry for the same mesh. */
  SEARCH_EXTRAS.forEach((x) => {
    const hay = (x.name + ' ' + (x.aliases || []).join(' ') + ' ' + x.system).toLowerCase();
    if (!matches(hay) || taken(x.name)) return;
    claim(x.name);
    hits.push({ kind: 'Structure', title: x.name,
      note: `${STRUCTURE_MODELS[x.system] ? STRUCTURE_MODELS[x.system].label : x.system} \u00b7 ${x.blurb}`,
      go: () => openStructureInViewer({ system: x.system, mesh: x.mesh,
        file: STRUCTURE_MODELS[x.system] && STRUCTURE_MODELS[x.system].file, name: x.name }) });
  });

  /*
   * Every named mesh in every layer.
   *
   * The curated lists above cover ~50 structures; the model carries 1,686. A
   * search that only knew the curated ones could not find the pharynx, which
   * is in the organs layer under three separate names. Ranked so a name that
   * STARTS with what you typed beats one that merely contains it -- otherwise
   * "kidney" is buried under every renal vessel.
   */
  /*
   * Results are UNITS, not rows.
   *
   * Every one of the 1,686 rows is still findable by its own name -- typing
   * "cuboideonavicular" works -- but what comes back is the thing the viewer
   * can actually select, which for anything below course level is the group it
   * belongs to. Listing the rows themselves is what made a search for
   * "ligament" return two hundred names out of no lecture, and offered a
   * selection the viewer no longer makes.
   */
  const idxHits = [];
  const found = new Map();             /* unit id -> what matched inside it */
  MESH_INDEX.forEach((m) => {
    /* the unit's own name counts too, or "lymph node" finds nothing: the rows
       are called "Axillary nodes" and "Pre-aortic nodes", and the thing the
       viewer actually selects is "Lymph nodes of the abdomen" */
    const byName = matches(m.name.toLowerCase());
    if (!byName && !matches(m.unit.toLowerCase())) return;
    const g = found.get(m.unitId) || { rows: [], named: [] };
    g.rows.push(m);
    if (byName) g.named.push(m);
    found.set(m.unitId, g);
  });
  found.forEach((g, unitId) => {
    const rows = g.rows;
    const any = rows[0];
    const label = any.unit;
    if (taken(label)) return;
    claim(label);
    const model = STRUCTURE_MODELS[any.layer];
    /* opens the WHOLE unit, not only the rows that matched */
    const parts = (UNIT_ROWS.get(unitId) || rows).map((m) => ({ system: m.layer, mesh: m.mesh,
      file: model && model.file }));
    const go = () => openStructureInViewer({ parts, name: label });
    const hay = label.toLowerCase();
    const rank = hay === needle ? 0 : hay.startsWith(needle) ? 1 : hay.includes(needle) ? 2 : 3;
    /* matched on a name the unit is not called by: say which one, or the row
       reads as a result for something it does not appear to contain */
    const via = g.named.length && !g.named.some((m) => m.name === label)
      ? ` · found under "${g.named[0].name}"` : '';
    if (any.unitKind === 'course') {
      const head = UNIT_HEAD.get(unitId) || any;
      const side = head.sides === 'b' ? 'left and right' : head.sides === 'l' ? 'left'
        : head.sides === 'r' ? 'right' : '';
      idxHits.push({ rank, hit: { kind: 'Structure', title: label,
        note: `${model ? model.label : any.layer}${side ? ' · ' + side : ''} · ${sourceNote(head)}${via}`, go } });
      return;
    }
    if (any.unitKind === 'lone') {
      idxHits.push({ rank: rank + 4, hit: { kind: 'Beyond', title: label,
        note: `${model ? model.label : any.layer} · modelled, but named in none of your course material`, go } });
      return;
    }
    idxHits.push({ rank: rank + 4, hit: { kind: 'Group', title: `${label} — ${any.unitSize}`,
      note: `${model ? model.label : any.layer} · your course names none of these one by one`
        + ` · opens all together${via}`, go } });
  });
  idxHits.sort((a, b) => a.rank - b.rank || a.hit.title.length - b.hit.title.length);
  idxHits.slice(0, 40).forEach((r) => hits.push(r.hit));

  /*
   * Answer the whole-structure question, at the top, before the parts.
   *
   * Searching "larynx" finds no mesh, because the model has no mesh called
   * that \u2014 it has the four laryngeal cartilages, the epiglottis and the
   * intrinsic muscles. Leading with "Larynx \u2014 modelled as its parts" answers
   * what was asked; the parts themselves follow from the index below.
   */
  const comp = compositeFor(needle);
  if (comp) {
    /* Every part, in whatever layer it lives \u2014 the larynx spans the skeleton
       and organs layers, so opening only the first lit one cartilage and left
       the rest of the larynx dark. */
    const parts = comp.parts.map(([layer, mesh]) => ({
      system: layer, mesh, file: STRUCTURE_MODELS[layer] && STRUCTURE_MODELS[layer].file }));
    hits.unshift({ kind: 'Composite', title: `${comp.name} \u2014 ${comp.parts.length} parts`,
      note: comp.note,
      go: () => openStructureInViewer({ parts, name: comp.name }) });
  }

  /*
   * Name the gap rather than returning nothing.
   *
   * Silently returning no results teaches the student that they typed the
   * wrong word, which is usually false. Saying what is absent, and offering
   * the nearest structure that IS modelled, is the same honesty the coverage
   * catalogue and the cavity `exact` flag already follow.
   */
  const gap = missingFor(needle);
  if (gap) {
    const model = STRUCTURE_MODELS[gap.layer];
    hits.unshift({ kind: 'Not modelled', title: gap.near + ' \u2014 nearest to it',
      note: gap.why,
      go: () => openStructureInViewer({ system: gap.layer, mesh: gap.near,
        file: model && model.file, name: gap.near }) });
  }

  /* Spatial concepts \u2014 individual cavities/regions/quadrants/planes first, then
     the group entries that open the whole set. */
  BODY_CONCEPTS.forEach((c) => {
    const hay = (c.name + ' ' + (c.aliases || []).join(' ')).toLowerCase();
    if (!matches(hay)) return;
    const kindLabel = { cavity: 'Cavity', region: 'Region', quadrant: 'Quadrant', plane: 'Plane' }[c.kind];
    const note = c.kind === 'plane' ? `Plane \u00b7 separates ${c.separates}` : `${kindLabel} \u00b7 ${c.blurb}`;
    hits.push({ kind: kindLabel, title: c.name, note,
      go: () => { closeSearchSheet(); dismissSessionForNav(); goTo('viewer'); setTimeout(() => window.__osteo && window.__osteo.showConcept && window.__osteo.showConcept(c.id), 160); } });
  });
  CONCEPT_GROUPS.forEach((g) => {
    if (!g.words.some((w) => w === needle || w.startsWith(needle) || needle === g.kind)) return;
    hits.push({ kind: 'Overlay', title: g.name, note: `Show all in the Viewer`,
      go: () => { closeSearchSheet(); dismissSessionForNav(); goTo('viewer'); setTimeout(() => window.__osteo && window.__osteo.toggleConceptKind && window.__osteo.toggleConceptKind(g.kind), 160); } });
  });

  if (/radiograph|x-?ray|projection/.test(needle)) {
    hits.push({ kind: 'Radiograph', title: 'No radiographs bundled',
      note: 'assets/xray/ is empty \u2014 add a licence-cleared image',
      go: () => { closeSearchSheet(); goTo('viewer'); } });
  }
  return hits;
}

export function runSearch(q) {
  const box = $$('searchResultsSheet');
  const hits = searchHits(q);
  if (!q.trim()) {
    box.innerHTML = '<div class="empty">Search structures, study items and topics. Press Esc to close.</div>';
    return;
  }
  if (!hits.length) {
    box.innerHTML = `<div class="empty">Nothing matches \u201c${esc(q.trim())}\u201d.</div>`;
    return;
  }
  box.innerHTML = hits.slice(0, 30).map((h, n) =>
    `<button class="sres" data-hit="${n}"><span class="grow"><b>${esc(h.title)}</b><small>${esc(h.note)}</small></span><span class="kind">${esc(h.kind)}</span></button>`).join('');
  box.querySelectorAll('[data-hit]').forEach((b) => { b.onclick = () => hits[+b.dataset.hit].go(); });
}
