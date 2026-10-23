/*
 * Global search -- one sheet over every destination, mixing structures,
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, BODY_CONCEPTS, CONCEPT_GROUPS, MESH_INDEX as ATLAS_MESH_INDEX, SEARCH_EXTRAS, STRUCTURE_MODELS, compositeFor, esc, expandQuery, missingFor, searchAnatomy } from './imports.js';
import { K, read, write } from './storage-versioned-keys.js';
import { goTo } from './navigation-destinations.js';
import { openStructureInViewer } from './search-viewer-open.js';
import { reviseSearch, viewerGroups } from './revise.js';
import { exactSearch, matchesSearch, modelSearchNames } from '../search-name.js';
import { lectureRow } from '../viewer-lecture-names.js';
import { BONE_LANDMARKS } from '../bone-landmarks.js';
const lectureRows=ATLAS_MESH_INDEX.map(lectureRow);
const unitSizes=new Map();
lectureRows.forEach(r=>unitSizes.set(r.unitId,(unitSizes.get(r.unitId)||0)+1));
const MESH_INDEX=lectureRows.map(r=>({...r,unitSize:unitSizes.get(r.unitId)}));

/* ------------------------------------------------------------------ *
 * Global search -- one sheet over every destination, mixing structures
 * and topics. Replaces the studio-only anatomy search card.
 * ------------------------------------------------------------------ */

let searchReturnFocus = null;
let searchActiveHit = -1;
let searchLastQuery = '';

/* Where the query landed, marked. The matcher is literal `includes` over the
   typed query and its synonyms (see makeMatcher), so the first term that
   occurs in the title marks the same spot the match was made on; a title
   matched by no term of its own — a unit found only via a member row —
   renders unmarked rather than marking something it does not say. */
function markHit(text, terms) {
  const hay = String(text).toLowerCase();
  for (const t of terms) {
    if (t && hay.includes(t)) {
      const at = hay.indexOf(t);
      return esc(text.slice(0, at)) + '<mark>' + esc(text.slice(at, at + t.length)) + '</mark>' + esc(text.slice(at + t.length));
    }
  }
  return esc(text);
}

/* Recent searches — the queries this device acted on a result for, newest
   first. A display convenience, so its own versioned key, never the progress
   export. */
function recentSearches() { return read(K.recentSearches, []); }
function rememberSearch(q) {
  const term = String(q).trim();
  if (term.length < 2) return;
  const rest = recentSearches().filter((s) => s.toLowerCase() !== term.toLowerCase());
  write(K.recentSearches, [term, ...rest].slice(0, 8));
}

/* Arrow keys walk the results while the input keeps focus; Enter opens the
   one under the caret, defaulting to the first result. Rows render as real
   buttons, so Tab and the existing hover/focus styles still work. */
export function searchKeydown(e) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;
  const box = $$('searchResultsSheet');
  const rows = box ? box.querySelectorAll('[data-hit]') : [];
  if (!rows.length) return;
  e.preventDefault();
  if (e.key === 'Enter') {
    const n = searchActiveHit >= 0 ? searchActiveHit : 0;
    const row = box.querySelector(`[data-hit="${n}"]`);
    if (row) row.click();
    return;
  }
  searchActiveHit = e.key === 'ArrowDown'
    ? (searchActiveHit + 1) % rows.length
    : (searchActiveHit - 1 + rows.length) % rows.length;
  rows.forEach((b) => b.classList.toggle('active', +b.dataset.hit === searchActiveHit));
  const el = box.querySelector(`[data-hit="${searchActiveHit}"]`);
  if (el) el.scrollIntoView({ block: 'nearest' });
}

export function openSearchSheet() {
  searchReturnFocus = document.activeElement;
  $$('searchScrim').classList.remove('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = true;
  const input = $$('globalSearch');
  input.value = '';
  runSearch('');
  input.focus();
}
export function closeSearchSheet() {
  $$('searchScrim').classList.add('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = false;
  if (searchReturnFocus && searchReturnFocus.focus) searchReturnFocus.focus();
  searchReturnFocus = null;
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
  return (hay) => terms.some((t) => matchesSearch(hay,t));
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
  if(m.lectureSource)return EVIDENCE_WORD.named+' '+shortSource(m.lectureSource.file)+' · p'+m.lectureSource.page;
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

/* One study unit, opened whole in the viewer, exactly as a unit search hit opens it.
   Revise's "Show in the viewer" uses it with the unit outputs/revision/viewer-units.js names. */
export function openUnitInViewer(unitId, setName) {
  const ids = [].concat(unitId);
  const rows = ids.flatMap((id) => UNIT_ROWS.get(id) || []);
  if (!rows.length) return false;
  const head = UNIT_HEAD.get(ids[0]) || rows[0];
  openStructureInViewer({ parts: rows.map((m) => ({ system: m.layer, mesh: m.mesh, file: STRUCTURE_MODELS[m.layer] && STRUCTURE_MODELS[m.layer].file })), name: ids.length > 1 ? setName : head.unit });
  return true;
}

/* Once the bone is open its Parts menu exists; press the entry for this landmark (it may take a moment to appear). */
function showBoneLandmark(name, tries = 0) {
  const b = [...document.querySelectorAll('.bone-landmark-menu [data-landmark-choice]')].find((x) => x.dataset.landmarkChoice === name);
  if (b) { b.click(); return; }
  if (tries < 20) setTimeout(() => showBoneLandmark(name, tries + 1), 250);
}

export function searchHits(q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  if (/^(more|settings|about|more\/settings\/about)$/.test(needle)) return [{
    kind: 'Settings', title: 'More', note: 'Settings, sources and about this app',
    go: () => { closeSearchSheet(); goTo('more'); },
  }];
  const hits = [];
  const side = /^(left|right)\s/.exec(needle)?.[1] || null;
  const structureNeedle = side ? needle.slice(side.length).trim() : needle;
  const matches = makeMatcher(structureNeedle);
  const openStructure = (spec) => openStructureInViewer({...spec, side});

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

  expandQuery(structureNeedle).forEach((t) => searchAnatomy(t).filter((r) => [r.canonicalName,...r.aliases].some((n) => matchesSearch(n,t))).forEach((r) => {
    if (seen.has('db:' + r.id)) return;
    seen.add('db:' + r.id);
    claim(r.canonicalName);
    hits.push({ kind: 'Structure', title: r.canonicalName, note: `${r.region} \u00b7 opens in Viewer`,
      go: () => openStructure({ id: r.id }) });
  }));

  /* Curated extras \u2014 structures that live in a system layer (muscles, heart
     chambers, brain, organs). These carry a teaching blurb, so they outrank the
     bare index entry for the same mesh. */
  SEARCH_EXTRAS.forEach((x) => {
    if(side&&x.name.toLowerCase().includes(side==='left'?'right':'left'))return;
    const hay = (x.name + ' ' + (x.aliases || []).join(' ') + ' ' + x.system).toLowerCase();
    if (!matches(hay) || taken(x.name)) return;
    claim(x.name);
    hits.push({ kind: 'Structure', title: x.name,
      note: `${STRUCTURE_MODELS[x.system] ? STRUCTURE_MODELS[x.system].label : x.system} \u00b7 ${x.blurb}`,
      go: () => openStructure({ system: x.system, mesh: x.mesh,
        file: STRUCTURE_MODELS[x.system] && STRUCTURE_MODELS[x.system].file, name: x.name }) });
  });

  /* Bone landmarks (lambda, bregma, a suture, a tubercle): each opens its bone and turns that label on. The bone's own
     Parts menu holds the same names, so the two agree by construction. */
  Object.entries(BONE_LANDMARKS).forEach(([bone, spec]) => {
    /* a curated bone record where there is one, else the skeleton mesh the landmarks were pinned to */
    const rec = searchAnatomy(bone).find((r) => String(r.canonicalName).toLowerCase() === bone);
    const title = (bone.charAt(0).toUpperCase() + bone.slice(1)).replace(/\b([a-z])(\d+)\b/g, (m, a, n) => a.toUpperCase() + n);
    const names = new Set();
    (spec.points || []).forEach((p) => {
      const key = p.name.toLowerCase();
      if (names.has(key) || !matches(`${p.name} ${bone}`.toLowerCase()) || !matchesSearch(p.name, structureNeedle)) return;
      names.add(key);
      hits.push({ kind: 'Landmark', title: `${p.name} · ${title}`, note: 'Bone landmark · opens in Viewer',
        go: () => { openStructure(rec ? { id: rec.id } : { system: 'skeleton', mesh: spec.mesh, name: title, exact: true }); showBoneLandmark(p.name); } });
    });
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
  // Exact names remain individually reachable even when their teaching unit
  // groups many finer structures. Search must never silently substitute a group.
  // The row that IS its unit opens the whole unit, as a tap does: the liver is
  // the Liver mesh and its eight segments, and lit alone it was one ninth.
  const exactTerms = [...new Set([...expandQuery(structureNeedle),needle])];
  const sideFits = (m) => !side || (m.sides === 'b' || m.sides === side[0]
    || (!m.sides && !m.name.toLowerCase().includes(side === 'left' ? 'right' : 'left')));
  MESH_INDEX.filter(m=>sideFits(m)&&exactTerms.some(t=>exactSearch(m.name,t))).forEach(m=>{
    // Replace a broader curated entry carrying the same name with its exact mesh.
    const existing=hits.findIndex(h=>exactSearch(h.title,m.name));
    if(existing>=0)hits.splice(existing,1);
    claim(m.name);
    const mesh=m.sides==='b'?m.mesh.replace(/\.[lr]$/i,''):m.mesh;
    hits.push({kind:'Structure',title:m.name,note:`${m.layer} · ${sourceNote(m)}`,
      go:()=>openStructure({system:m.layer,mesh,file:STRUCTURE_MODELS[m.layer]?.file,name:m.name,exact:!m.isUnit,
        ...(modelSearchNames(mesh).length>1?{parts:modelSearchNames(mesh).map(n=>({system:m.layer,mesh:n,file:STRUCTURE_MODELS[m.layer]?.file}))}:{})})});
  });
  const idxHits = [];
  const found = new Map();             /* unit id -> what matched inside it */
  MESH_INDEX.forEach((m) => {
    /* the unit's own name counts too, or "lymph node" finds nothing: the rows
       are called "Axillary nodes" and "Pre-aortic nodes", and the thing the
       viewer actually selects is "Lymph nodes of the abdomen" */
    if(!sideFits(m))return;
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
    const go = () => openStructure({ parts, name: label });
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
      note: `${model ? model.label : any.layer} · ${any.lectureSource?sourceNote(any):'your course names none of these one by one'}`
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
  const comp = compositeFor(structureNeedle);
  if (comp) {
    /* Every part, in whatever layer it lives \u2014 the larynx spans the skeleton
       and organs layers, so opening only the first lit one cartilage and left
       the rest of the larynx dark. */
    const parts = comp.parts.map(([layer, mesh]) => ({
      system: layer, mesh, file: STRUCTURE_MODELS[layer] && STRUCTURE_MODELS[layer].file }));
    hits.unshift({ kind: 'Composite', title: `${comp.name} \u2014 ${comp.parts.length} parts`,
      note: comp.note,
      go: () => openStructure({ parts, name: comp.name, exact:true }) });
  }

  /* Revise's grouped names (Quadriceps, Glutei, Anterior compartment, Transversospinalis...): each opens ALL its members
     together, and a group already offered as a composite above is not listed twice. */
  viewerGroups().forEach((g) => {
    const t = g.label.toLowerCase();
    if (!matches(t) || hits.some((h) => h.kind === 'Composite' && h.title.toLowerCase().startsWith(t))) return;
    if (hits.some((h) => h.kind === 'Group' && h.title.toLowerCase().startsWith(t))) return;
    hits.unshift({ kind: 'Group', title: `${g.label} — ${g.units.length} structure${g.units.length === 1 ? "" : "s"}`, note: 'Grouped in Revise · opens all in Viewer',
      go: () => { openUnitInViewer(g.units, g.label); } });
  });

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
      go: () => openStructure({ system: gap.layer, mesh: gap.near,
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
      go: () => { closeSearchSheet(); goTo('viewer'); setTimeout(() => window.__osteo && window.__osteo.showConcept && window.__osteo.showConcept(c.id), 160); } });
  });
  CONCEPT_GROUPS.forEach((g) => {
    if (!g.words.some((w) => w === needle || w.startsWith(needle) || needle === g.kind)) return;
    hits.push({ kind: 'Overlay', title: g.name, note: `Show all in the Viewer`,
      go: () => { closeSearchSheet(); goTo('viewer'); setTimeout(() => window.__osteo && window.__osteo.toggleConceptKind && window.__osteo.toggleConceptKind(g.kind), 160); } });
  });

  /* Revise boxes and Decoder words (HSS2011, ABCT2326), only those taught by the week each subject shows. */
  reviseSearch(needle).forEach((h) => hits.push({ ...h, go: () => { closeSearchSheet(); h.go(); } }));
  const rank = (h) => h.kind === 'Composite' ? -1
    : exactTerms.some(t=>exactSearch(h.title,t)) ? 0
    : h.title.toLowerCase().startsWith(needle) ? 1 : 2;
  return hits.sort((a, b) => rank(a) - rank(b));
}

export function runSearch(q) {
  const box = $$('searchResultsSheet');
  searchLastQuery = q;
  searchActiveHit = -1;
  const hits = searchHits(q);
  if (!q.trim()) {
    /* An empty box is not nothing: the queries this device acted on, run
       again with a tap, beat a blank hint every time a student comes back
       to look up the same structure. */
    const recents = recentSearches();
    if (!recents.length) {
      box.innerHTML = '<div class="empty">Search structures, Revise topics and Decoder words. Press Esc to close.</div>';
      return;
    }
    box.innerHTML = '<div class="empty">Recent searches</div>'
      + recents.map((r, n) =>
        `<button class="sres" data-recent="${n}"><span class="grow"><b>${esc(r)}</b></span><span class="kind">Recent</span></button>`).join('');
    box.querySelectorAll('[data-recent]').forEach((b) => {
      b.onclick = () => {
        const again = recentSearches()[+b.dataset.recent];
        const input = $$('globalSearch');
        input.value = again;
        runSearch(again);
        input.focus();
      };
    });
    return;
  }
  if (!hits.length) {
    box.innerHTML = `<div class="empty">Nothing matches \u201c${esc(q.trim())}\u201d.</div>`;
    return;
  }
  const terms = expandQuery(q.trim().toLowerCase());
  box.innerHTML = hits.slice(0, 30).map((h, n) =>
    `<button class="sres" data-hit="${n}"><span class="grow"><b>${markHit(h.title, terms)}</b></span><span class="kind">${esc(h.kind)}</span></button>`).join('');
  box.querySelectorAll('[data-hit]').forEach((b) => { b.onclick = () => { rememberSearch(searchLastQuery); hits[+b.dataset.hit].go(); }; });
}
