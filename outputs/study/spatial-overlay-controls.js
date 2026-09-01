/*
 * Spatial overlay controls (viewer "..." sheet)
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, BODY_CONCEPTS, CONCEPT_GROUPS, SOURCE_FILES, STORAGE_PREFIX, STUDY_ITEMS, STUDY_MODES, SUBJECTS, allQuestions, conceptAncestors, conceptChildren, esc, getItem, getSubject, itemsForSubject, schedule, ui, validateApplications, validateCorpus } from './imports.js';
import { STEPS, pickItems, setStep, startSession } from './session-engine.js';
import { goTo, openSessionOverlay, setActiveNav } from './navigation-five-destinations.js';
import { itemAttempted, itemDue, itemScore, read, store, write } from './storage-versioned-keys.js';
import { openCoverage } from './coverage-report.js';
import { openDialog } from './dialog-behaviour-applied.js';
import { openResetDialog, openTransferDialog } from './reset.js';
import { renderReviewTab } from './review-mistakes-due.js';
import { showView } from './small-ui-helpers.js';

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
/*
 * The on-stage legend. The 3D tags are deliberately terse -- an overlay is
 * useless if the words cover the anatomy -- so the full name, the colour key
 * and, for a plane, what it separates all live here in DOM text instead.
 * Regions and quadrants collapse to one line: nine tags on the belly already
 * say which is which.
 */
export function renderMore() {
  setActiveNav('more');
  /* validateCorpus/validateApplications each return an ARRAY of failures. */
  const failures = validateCorpus().length + validateApplications().length;
  const hidden = SUBJECTS.filter((x) => !itemsForSubject(x.id).length);
  const rows = [
    { title: 'Sources & coverage report', badge: failures + ' failures', color: failures ? 'var(--red)' : 'var(--green)',
      note: STUDY_ITEMS.length + ' items, ' + allQuestions().length + ' questions, ' + Object.keys(SOURCE_FILES).length
        + ' files cited. Conflicts and duplicates listed in full.', open: () => openCoverage(null) },
    { title: 'Subjects with no material', badge: hidden.length + ' hidden', color: 'var(--muted)',
      note: hidden.map((x) => x.code).join(' and ') + ' have no verified sources, so they are hidden from Learn rather than shown as empty shelves.' },
    { title: 'Sources & model attribution', badge: 'CC BY-SA', color: 'var(--muted)',
      note: 'BodyParts3D / Anatomography model licensing and the candidate sources that were reviewed.',
      open: () => openDialog($$('aboutDialog')) },
    { title: 'Offline & storage', badge: 'PWA', color: 'var(--muted)',
      note: 'Shell cached at install. Each 3D model caches the first time you open it, so the footprint grows to match what you study.' },
    { title: 'Scheduling rules', badge: 'SM-2+', color: 'var(--muted)',
      note: 'SM-2 shaped, then modified by response time and repeat mistakes.' },
    { title: 'Move progress to another device', badge: 'JSON', color: 'var(--teal)',
      note: 'Mastery lives in this browser only, so the desktop and the iPad keep separate schedules. Export a file here and import it on the other device.',
      open: () => openTransferDialog() },
    { title: 'Reset progress on this device', badge: 'erase', color: 'var(--red)',
      note: 'Delete every mastery record, mistake and schedule stored in this browser. There is no server and no undo, so export a backup first if you might want it.',
      open: () => openResetDialog() },
  ];
  $$('moreRows').innerHTML = rows.map((r, i) => `
    <button class="card" data-row="${i}" style="text-align:left;cursor:${r.open ? 'pointer' : 'default'};width:100%">
      <div style="display:flex;gap:12px;align-items:baseline"><span style="font-weight:700;flex:1">${esc(r.title)}</span><span class="mono" style="color:${r.color}">${esc(r.badge)}</span></div>
      <div class="small" style="margin-top:5px">${esc(r.note)}</div>
    </button>`).join('');
  rows.forEach((r, i) => {
    if (!r.open) return;
    const el = $$('moreRows').querySelector('[data-row="' + i + '"]');
    if (el) el.onclick = r.open;
  });
  showView('moreView');
}


function getContinueTarget() {
  const raw = read(STORAGE_PREFIX + 'continue', null);
  if (!raw || !raw.itemId) return null;
  const item = getItem(raw.itemId);
  if (!item) return null;
  const siblings = itemsForSubject(item.subject);
  const index = siblings.findIndex((i) => i.id === item.id);
  return { item, step: raw.step || 'learn', index: index < 0 ? 0 : index, total: siblings.length };
}
export function saveContinue(itemId, step) { write(STORAGE_PREFIX + 'continue', { itemId, step }); }
function resumeContinue(cont) {
  ui.session = { opts: { mode: 'subject', subject: cont.item.subject }, mode: null, items: [cont.item], index: 0, step: cont.step, reveal: 0, qIndex: 0, answered: false, startedAt: 0, results: [], hooksOnly: false };
  openSessionOverlay();
  setStep(cont.step);
}
function relativeTime(ts) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
}

export function renderToday() {
  setActiveNav('today');
  const totalItems = STUDY_ITEMS.length;
  const attempted = STUDY_ITEMS.filter((i) => itemAttempted(i.id));
  const due = attempted.filter((i) => itemDue(i.id));

  const cont = getContinueTarget();
  $$('continueCard').innerHTML = cont ? `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:24px;margin:8px 0 0">${esc(cont.item.title)}</h2>
    <p class="small" style="margin-top:6px">${esc(getSubject(cont.item.subject).title)} · item ${cont.index + 1} of ${cont.total} · left off at ${esc(STEPS.find((s) => s.id === cont.step).label)}</p>
    <div style="height:6px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden;margin-top:14px"><div style="height:100%;width:${Math.round(itemScore(cont.item.id) * 100)}%;border-radius:99px;background:var(--teal)"></div></div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:14px">
      <button class="primary" id="continueBtn">Continue →</button>
      <span class="small">${Math.round(itemScore(cont.item.id) * 100)}% mastered</span>
    </div>` : `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:24px;margin:8px 0 0">Nothing in progress</h2>
    <p class="small" style="margin-top:6px">Start a session below to begin.</p>`;
  if (cont) $$('continueBtn').onclick = () => resumeContinue(cont);

  /*
   * Every mode that pickItems() implements gets a tile.
   *
   * Six of the nine were built and then never given a way in -- including
   * "Explain my mistakes", which is the one a learner wants most in the week
   * before an exam. 'subject' is the exception: it is reached by choosing a
   * topic in Learn, so a tile for it would be a second door onto the same room
   * with no topic chosen.
   *
   * The count under each tile is the real thing, taken by running the picker
   * rather than by a separate estimate that could drift from it, and a mode
   * with nothing to offer is disabled and says why instead of opening an empty
   * session and toasting an apology.
   */
  const TILE_COLOR = { new: 'var(--green)', daily: 'var(--teal)', weakest: 'var(--orange)',
    quick10: 'var(--teal)', exam: 'var(--blue)', hooks: 'var(--blue)',
    mistakes: 'var(--red)', mixed: 'var(--muted)' };
  const EMPTY_WHY = {
    new: 'Every item has been seen',
    weakest: 'Nothing attempted yet',
    quick10: 'Nothing due or weak yet',
    mistakes: 'No mistakes logged — good',
    hooks: 'No memory aids found',
  };
  const tiles = STUDY_MODES.filter((m) => m.id !== 'subject').map((m) => {
    const count = pickItems({ mode: m.id }).length;
    return { ...m, count, color: TILE_COLOR[m.id] || 'var(--teal)' };
  });
  $$('sessionTiles').innerHTML = tiles.map((m) => `
    <button class="rss-mode" style="flex-direction:column;align-items:flex-start;gap:5px;min-height:104px" data-mode="${esc(m.id)}"${m.count ? '' : ' disabled'}>
      <span class="ic" style="font-size:17px;color:${m.color}">${m.icon}</span>
      <b>${esc(m.label)}</b><small>${esc(m.hint)}</small>
      <span class="cnt">${m.count ? m.count + ' item' + (m.count === 1 ? '' : 's') + ' ready' : esc(EMPTY_WHY[m.id] || 'Nothing to study')}</span>
    </button>`).join('');
  $$('sessionTiles').querySelectorAll('[data-mode]').forEach((b) => {
    if (b.disabled) return;
    b.onclick = () => startSession({ mode: b.dataset.mode });
  });

  const weakest = attempted.slice().sort((a, b) => itemScore(a.id) - itemScore(b.id)).slice(0, 3);
  $$('weakestList').innerHTML = weakest.length ? weakest.map((i) => `
    <button class="unit-row" data-weak="${esc(i.id)}">
      <span class="grow"><b>${esc(i.title)}</b><small>${esc(getSubject(i.subject).title)}</small></span>
      <span class="meter"><span style="width:${Math.round(itemScore(i.id) * 100)}%;background:var(--orange)"></span></span>
      <span class="pc">${Math.round(itemScore(i.id) * 100)}%</span>
    </button>`).join('') : '<div class="empty">Nothing studied yet — start a session to build this list.</div>';
  $$('weakestList').querySelectorAll('[data-weak]').forEach((b) => { b.onclick = () => renderReviewTab('mistakes'); });
  $$('allWeakBtn').onclick = () => goTo('review');

  const streak = (store.meta && store.meta.streak) || 0;
  $$('todayStatrow').innerHTML = [
    [String(streak), 'day streak'], [String(due.length), 'due now'],
    [`${totalItems ? Math.round(attempted.reduce((n, i) => n + itemScore(i.id), 0) / totalItems * 100) : 0}%`, 'mastered'],
  ].map(([v, l], idx) => `<div class="s"><b${idx === 1 ? ' style="color:var(--orange)"' : ''}>${esc(v)}</b><small>${esc(l)}</small></div>`).join('');

  $$('recentList').innerHTML = store.mistakes.slice(0, 4).map((m) => {
    const item = getItem(m.itemId);
    return item ? `<div style="display:flex;gap:10px;align-items:baseline;font-size:12.5px"><span style="color:${m.correct ? 'var(--green)' : 'var(--red)'}">●</span><span style="flex:1">${esc(item.title)}</span><span class="small">${esc(relativeTime(m.at))}</span></div>` : '';
  }).join('') || '<div class="empty">No activity yet.</div>';

  showView('todayView');
}
