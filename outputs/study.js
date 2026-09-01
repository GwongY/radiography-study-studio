import {
  SUBJECTS, STUDY_ITEMS, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS, MEMORY_METHODS,
  SOURCE_FILES, SOURCE_ROOTS, COVERAGE, DIAGRAMS, SOCIOLOGY_NOTICE, PLACEHOLDER_NOTICES,
  STORAGE_PREFIX, LEGACY_STATS_KEY, DATA_VERSION,
  getSubject, getItem, itemsForSubject, itemsForUnit, questionsOf, allQuestions,
  describeSource, coverageFor, blankMastery, schedule, masteryScore, isDue, dimensionFor,
  tierFor, TIER_LABELS,
  isDelayedAttempt, REVEAL_MODES, structureSet, STRUCTURE_MODELS, jointMovement,
  validateCorpus, validateApplications,
  priorOf, priorSources, priorAdjustedScore, entryStep,
  moduleInfo,
} from './study-data.js';
import { searchAnatomy } from './anatomy-data.js?v=5';
import { SEARCH_EXTRAS, BODY_CONCEPTS, CONCEPT_GROUPS, conceptById, conceptAncestors, conceptChildren } from './bodymap.js?v=4';
import { MESH_INDEX, UNITS } from './mesh-index.js?v=5';
import { expandQuery, missingFor, compositeFor } from './synonyms.js?v=3';
import { visualFor, plateFor } from './visual-data.js?v=4';
import { FLOW_CLASSES, LAYER_CLASSES, RATES } from './physiology.js?v=4';
import { schematic } from './schematics.js?v=2';
import { figureFor } from './figures.js?v=2';
import { layoutFor } from './layouts.js?v=1';
import { decompose, readingOf, partOf } from './wordparts.js?v=3';
import { termNote } from './term-notes.js?v=4';
import { termGloss } from './term-gloss.js?v=3';
import { ui } from './study/state.js';

const $$ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ------------------------------------------------------------------ *
 * Storage — versioned keys, one-time migration from the osteology app
 * ------------------------------------------------------------------ */

const K = {
  mastery: STORAGE_PREFIX + 'mastery',
  items: STORAGE_PREFIX + 'items',
  mistakes: STORAGE_PREFIX + 'mistakes',
  meta: STORAGE_PREFIX + 'meta',
};

function read(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota or private mode — keep running in memory */ }
}

const store = {
  mastery: read(K.mastery, {}),
  items: read(K.items, {}),
  mistakes: read(K.mistakes, []),
  meta: read(K.meta, null),
};

function migrate() {
  if (store.meta && store.meta.version === DATA_VERSION) return;
  const meta = store.meta || {};
  let migrated = meta.migratedLegacy || 0;
  if (!meta.migratedLegacy) {
    const legacy = read(LEGACY_STATS_KEY, null);
    if (legacy && typeof legacy === 'object') {
      for (const [boneId, s] of Object.entries(legacy)) {
        if (!s || !s.attempts) continue;
        /* Imported atlas ids carry a full:/real: prefix and a side suffix. */
        const base = String(boneId).replace(/^(full:|real:)/, '').replace(/-(left|right)$/, '');
        const itemId = `hss2011-bone-${base}`;
        if (!getItem(itemId)) continue;
        const key = `${itemId}::recognition`;
        const prior = store.mastery[key] || blankMastery();
        store.mastery[key] = {
          ...prior,
          attempts: prior.attempts + s.attempts,
          correct: prior.correct + (s.correct || 0),
          lapses: prior.lapses + (s.incorrect || 0),
          avgMs: s.avgMs || prior.avgMs,
          reps: Math.max(prior.reps, Math.min(3, s.correct || 0)),
          intervalDays: Math.max(prior.intervalDays, (s.correct || 0) > 1 ? 2 : 1),
          due: Date.now(),
          lastSeen: s.lastReviewed ? Date.parse(s.lastReviewed) || Date.now() : Date.now(),
          confidenceSum: prior.confidenceSum + Math.round(((s.confidence || 0) / 100) * 3 * s.attempts),
          confidenceN: prior.confidenceN + s.attempts,
        };
        store.items[itemId] = { ...(store.items[itemId] || {}), status: 'review', seen: (store.items[itemId]?.seen || 0) + s.attempts };
        migrated += 1;
      }
    }
  }
  store.meta = { ...meta, version: DATA_VERSION, migratedLegacy: migrated, migratedAt: meta.migratedAt || Date.now() };
  write(K.mastery, store.mastery); write(K.items, store.items); write(K.meta, store.meta);
  if (migrated) toast(`Carried ${migrated} bone${migrated === 1 ? '' : 's'} of existing progress into the new mastery record.`);
}

function masteryKey(itemId, dim) { return `${itemId}::${dim}`; }
function getMastery(itemId, dim) { return store.mastery[masteryKey(itemId, dim)] || null; }
function setMastery(itemId, dim, rec) { store.mastery[masteryKey(itemId, dim)] = rec; write(K.mastery, store.mastery); }

function itemScore(itemId) {
  const recs = MASTERY_DIMENSIONS.map((d) => getMastery(itemId, d.id)).filter(Boolean);
  if (!recs.length) return 0;
  return recs.reduce((n, r) => n + masteryScore(r), 0) / recs.length;
}
function itemAttempted(itemId) {
  return MASTERY_DIMENSIONS.some((d) => (getMastery(itemId, d.id) || {}).attempts > 0);
}
function itemDue(itemId, now = Date.now()) {
  const recs = MASTERY_DIMENSIONS.map((d) => getMastery(itemId, d.id)).filter((r) => r && r.attempts);
  if (!recs.length) return true;
  return recs.some((r) => isDue(r, now));
}
function itemLapses(itemId) {
  return MASTERY_DIMENSIONS.reduce((n, d) => n + ((getMastery(itemId, d.id) || {}).lapses || 0), 0);
}

/*
 * Queue ordering and the dashboard rings run on this rather than on itemScore.
 * An unattempted item scores zero, which is right for material nobody has ever
 * taught you and wrong for material a whole school subject did: that is not
 * unknown, it is unverified. The credit is derived here and never written to
 * the mastery store, so accuracy, lapses and intervals stay a record of what
 * was actually answered in this course.
 */
function adjScore(item) {
  return priorAdjustedScore(item, itemScore(item.id), itemAttempted(item.id));
}

function logMistake(entry) {
  store.mistakes.unshift({ ...entry, at: Date.now() });
  store.mistakes = store.mistakes.slice(0, 400);
  write(K.mistakes, store.mistakes);
}


/* ------------------------------------------------------------------ *
 * Moving progress between devices
 *
 * Mastery lives in localStorage, which is per-origin and per-device, so the
 * desktop and the iPad keep separate schedules. There is no backend and there
 * is not going to be one, so the transfer is a file you carry across.
 *
 * The merge rule is the part worth being careful about. attempts, correct,
 * lapses and the confidence sums are cumulative counters, and without an event
 * log there is no way to tell whether two devices recorded the SAME attempt or
 * two different ones. Adding them would silently inflate your history; taking
 * the larger would invent a total that never happened on either device. So a
 * record is never recombined field by field: for each item and dimension the
 * whole record with the newer lastSeen wins, and the other is dropped.
 *
 * That loses the older device's practice on that one dimension, which is the
 * honest cost of having no event log, and the dialog says so rather than
 * implying the two histories were added together.
 *
 * Mistakes are different: they are a timestamped log, so they genuinely merge.
 * Entries are unioned and deduplicated on item, question and timestamp.
 * ------------------------------------------------------------------ */

const PROGRESS_FORMAT = 'rss.progress';

function buildProgressExport() {
  return {
    format: PROGRESS_FORMAT,
    formatVersion: 1,
    dataVersion: DATA_VERSION,
    exportedAt: Date.now(),
    exportedAtISO: new Date().toISOString(),
    origin: location.origin + location.pathname,
    counts: {
      mastery: Object.keys(store.mastery).length,
      items: Object.keys(store.items).length,
      mistakes: store.mistakes.length,
    },
    mastery: store.mastery,
    items: store.items,
    mistakes: store.mistakes,
    meta: store.meta,
  };
}

/* ------------------------------------------------------------------ *
 * Reset
 *
 * One subtlety worth being explicit about: clearing the rss.v1.* keys is NOT
 * enough on its own. migrate() re-runs whenever the stored meta version does
 * not match, and it imports the old osteology-studio-stats key -- so a reset
 * that left that key in place would quietly resurrect the bone history on the
 * next load and the reset would look broken. The legacy key goes too, and a
 * fresh meta is written straight away so the migration has nothing to redo.
 * ------------------------------------------------------------------ */

function resetCounts() {
  const dims = Object.keys(store.mastery).length;
  const items = new Set(Object.keys(store.mastery).map((k) => k.split('::')[0]));
  let legacy = 0;
  try {
    const raw = read(LEGACY_STATS_KEY, null);
    legacy = raw && typeof raw === 'object' ? Object.keys(raw).length : 0;
  } catch { legacy = 0; }
  return { dims, items: items.size, mistakes: store.mistakes.length, legacy,
    continued: !!read(STORAGE_PREFIX + 'continue', null) };
}

function openResetDialog() {
  const c = resetCounts();
  const nothing = !c.dims && !c.mistakes && !c.legacy;
  $$('resetSummary').textContent = nothing
    ? 'There is nothing recorded on this device yet, so there is nothing to erase.'
    : `${c.items} item${c.items === 1 ? '' : 's'} studied, across ${c.dims} mastery record${c.dims === 1 ? '' : 's'}.`;
  const rows = [
    `Mastery and review schedules — <strong>${c.dims}</strong> record${c.dims === 1 ? '' : 's'} across ${c.items} item${c.items === 1 ? '' : 's'}.`,
    `Your mistake log — <strong>${c.mistakes}</strong> entr${c.mistakes === 1 ? 'y' : 'ies'}, with the questions you got wrong.`,
    'Day streak, per-item status and the item you were last part-way through.',
  ];
  if (c.legacy) rows.push(`The original osteology quiz history — <strong>${c.legacy}</strong> bone${c.legacy === 1 ? '' : 's'}. It goes too, otherwise the next load would import it straight back.`);
  $$('resetList').innerHTML = rows.map((r) => `<li>${r}</li>`).join('');
  const go = $$('resetGo');
  go.textContent = 'Delete everything';
  go.disabled = nothing;
  go.dataset.armed = '';
  $$('resetHint').textContent = nothing
    ? 'Nothing to delete.'
    : 'The 3D models, the lessons and the source files are untouched \u2014 only your own history is.';
  openDialog($$('resetDialog'));
}

/*
 * Two taps, because a misclick here costs a term's worth of history.
 *
 * Deliberately NOT on a timer. An expiring arm punishes the careful reader: tap
 * once, actually read the list of what is about to go, decide, tap again -- and
 * a timeout would have silently re-armed instead of acting, teaching you that
 * the button is flaky rather than that it is careful. The armed state is
 * cleared where it belongs, when the dialog is opened.
 */
function armReset() {
  const go = $$('resetGo');
  if (go.dataset.armed !== '1') {
    go.dataset.armed = '1';
    go.textContent = 'Tap again to erase \u2014 this is final';
    $$('resetHint').textContent = 'Nothing has happened yet. Close this dialog and it never will.';
    return;
  }
  resetProgress();
}

function resetProgress() {
  const c = resetCounts();
  /*
   * Order matters. resetStats() clears the embedded module's in-memory history
   * and then persists it, which writes the legacy key back -- so it has to run
   * BEFORE the keys are removed, or the reset leaves an "{}" behind it.
   */
  if (window.__osteo && window.__osteo.resetStats) window.__osteo.resetStats();
  for (const key of [K.mastery, K.items, K.mistakes, K.meta, STORAGE_PREFIX + 'continue', LEGACY_STATS_KEY]) {
    try { localStorage.removeItem(key); } catch { /* private mode: the in-memory wipe below still holds */ }
  }
  store.mastery = {}; store.items = {}; store.mistakes = [];
  /* Write a completed meta immediately so migrate() has nothing left to import. */
  store.meta = { version: DATA_VERSION, migratedLegacy: 0, migratedAt: Date.now(), resetAt: Date.now() };
  write(K.meta, store.meta);
  $$('resetDialog').close();
  /* A session still holding the erased records would keep scheduling against them. */
  if (ui.session) { ui.session = null; closeSessionOverlay(); }
  toast(`Progress erased \u2014 ${c.dims} mastery record${c.dims === 1 ? '' : 's'} and ${c.mistakes} mistake${c.mistakes === 1 ? '' : 's'} gone.`);
  goTo('today');
}

function exportProgress() {
  const payload = buildProgressExport();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const day = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `study-progress-${day}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast(`Exported ${payload.counts.mastery} mastery records.`);
}

/* Never trust the file: it may be a different app's export, an older format, or
   hand-edited. Anything unexpected is refused with the reason, not merged. */
function validateProgressFile(data) {
  if (!data || typeof data !== 'object') return 'That file is not JSON this app understands.';
  if (data.format !== PROGRESS_FORMAT) return 'That is not a Study Studio progress file.';
  if (data.dataVersion !== DATA_VERSION) return `That file was written for data version ${data.dataVersion}, and this app is on ${DATA_VERSION}.`;
  if (!data.mastery || typeof data.mastery !== 'object' || Array.isArray(data.mastery)) return 'The mastery record in that file is missing or malformed.';
  if (!data.items || typeof data.items !== 'object' || Array.isArray(data.items)) return 'The item record in that file is missing or malformed.';
  if (data.mistakes && !Array.isArray(data.mistakes)) return 'The mistake log in that file is malformed.';
  return null;
}

function planProgressMerge(data) {
  const plan = { added: 0, replaced: 0, keptLocal: 0, itemsAdded: 0, itemsUpdated: 0, mistakesAdded: 0 };
  Object.entries(data.mastery).forEach(([key, rec]) => {
    if (!rec || typeof rec !== 'object') return;
    const mine = store.mastery[key];
    if (!mine) plan.added += 1;
    else if ((rec.lastSeen || 0) > (mine.lastSeen || 0)) plan.replaced += 1;
    else plan.keptLocal += 1;
  });
  Object.entries(data.items).forEach(([id, rec]) => {
    if (!rec || typeof rec !== 'object') return;
    const mine = store.items[id];
    if (!mine) plan.itemsAdded += 1;
    else if ((rec.lastSeen || 0) > (mine.lastSeen || 0)) plan.itemsUpdated += 1;
  });
  const seen = new Set(store.mistakes.map((m) => `${m.itemId}|${m.qid}|${m.at}`));
  (data.mistakes || []).forEach((m) => {
    if (m && !seen.has(`${m.itemId}|${m.qid}|${m.at}`)) plan.mistakesAdded += 1;
  });
  return plan;
}

function applyProgressImport(data, mode) {
  if (mode === 'replace') {
    store.mastery = { ...data.mastery };
    store.items = { ...data.items };
    store.mistakes = Array.isArray(data.mistakes) ? data.mistakes.slice(0, 400) : [];
  } else {
    Object.entries(data.mastery).forEach(([key, rec]) => {
      if (!rec || typeof rec !== 'object') return;
      const mine = store.mastery[key];
      if (!mine || (rec.lastSeen || 0) > (mine.lastSeen || 0)) store.mastery[key] = rec;
    });
    Object.entries(data.items).forEach(([id, rec]) => {
      if (!rec || typeof rec !== 'object') return;
      const mine = store.items[id];
      if (!mine || (rec.lastSeen || 0) > (mine.lastSeen || 0)) store.items[id] = rec;
    });
    const seen = new Set(store.mistakes.map((m) => `${m.itemId}|${m.qid}|${m.at}`));
    (data.mistakes || []).forEach((m) => {
      if (!m || seen.has(`${m.itemId}|${m.qid}|${m.at}`)) return;
      seen.add(`${m.itemId}|${m.qid}|${m.at}`);
      store.mistakes.push(m);
    });
    store.mistakes.sort((a, b) => (b.at || 0) - (a.at || 0));
    store.mistakes = store.mistakes.slice(0, 400);
  }
  store.meta = { ...(store.meta || {}), version: DATA_VERSION, importedAt: Date.now(), importedFrom: data.origin || 'unknown' };
  write(K.mastery, store.mastery);
  write(K.items, store.items);
  write(K.mistakes, store.mistakes);
  write(K.meta, store.meta);
}

let pendingImport = null;

function openTransferDialog() {
  pendingImport = null;
  const c = buildProgressExport().counts;
  $$('transferSummary').textContent =
    `This device holds ${c.mastery} mastery records across ${c.items} items, and ${c.mistakes} logged mistakes.`;
  $$('transferPlan').classList.add('hidden');
  $$('transferError').classList.add('hidden');
  $$('transferFile').value = '';
  openDialog($$('transferDialog'));
}

function handleTransferFile(file) {
  const err = $$('transferError');
  const planBox = $$('transferPlan');
  err.classList.add('hidden');
  planBox.classList.add('hidden');
  if (!file) return;
  const reader = new FileReader();
  reader.onerror = () => { err.textContent = 'That file could not be read.'; err.classList.remove('hidden'); };
  reader.onload = () => {
    let data = null;
    try { data = JSON.parse(reader.result); }
    catch { err.textContent = 'That file is not valid JSON.'; err.classList.remove('hidden'); return; }
    const problem = validateProgressFile(data);
    if (problem) { err.textContent = problem; err.classList.remove('hidden'); return; }
    const plan = planProgressMerge(data);
    pendingImport = data;
    const when = data.exportedAtISO ? data.exportedAtISO.slice(0, 16).replace('T', ' ') : 'unknown time';
    $$('transferPlanBody').innerHTML =
      `<div class="small" style="margin-bottom:8px">Exported ${esc(when)} from <span class="mono">${esc(data.origin || 'unknown')}</span>.</div>`
      + `<ul class="facts">`
      + `<li><strong>${plan.added}</strong> mastery records this device has never seen — added.</li>`
      + `<li><strong>${plan.replaced}</strong> where the file is more recent — replaced.</li>`
      + `<li><strong>${plan.keptLocal}</strong> where this device is more recent — kept as they are.</li>`
      + `<li><strong>${plan.itemsAdded}</strong> new items, <strong>${plan.itemsUpdated}</strong> updated.</li>`
      + `<li><strong>${plan.mistakesAdded}</strong> mistakes added to the log.</li>`
      + `</ul>`;
    planBox.classList.remove('hidden');
  };
  reader.readAsText(file);
}

function commitTransfer(mode) {
  if (!pendingImport) return;
  if (mode === 'replace' && !confirm('Replace wipes this device\u2019s progress and installs the file instead. There is no undo. Continue?')) return;
  applyProgressImport(pendingImport, mode);
  pendingImport = null;
  $$('transferDialog').close();
  toast(mode === 'replace' ? 'Progress replaced from file.' : 'Progress merged.');
  renderToday();
}

function subjectStats(subjectId) {
  const items = itemsForSubject(subjectId);
  const seen = items.filter((i) => itemAttempted(i.id)).length;
  const score = items.length ? items.reduce((n, i) => n + itemScore(i.id), 0) / items.length : 0;
  const due = items.filter((i) => itemAttempted(i.id) && itemDue(i.id)).length;
  return { total: items.length, seen, score, due };
}

/* ------------------------------------------------------------------ *
 * Small UI helpers
 * ------------------------------------------------------------------ */

let toastTimer = null;
function toast(msg) {
  const el = $$('toast');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

/* A missing radiograph image degrades to a plain notice instead of a
   broken-image icon or a blocked session. */
function xrayFallback(el) {
  const div = document.createElement('div');
  div.className = 'emptybox';
  div.textContent = 'Image not found — add it to assets/xray/ and reload.';
  el.replaceWith(div);
}
window.xrayFallback = xrayFallback;

const VIEWS = ['todayView', 'learnView', 'viewerView', 'reviewView', 'moreView'];
function showView(id) {
  VIEWS.forEach((v) => $$(v).classList.toggle('hidden', v !== id));
  const pane = $$('navContent');
  if (pane) pane.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'viewerView' && window.__osteo) {
    window.__osteo.boot();
    setTimeout(() => window.__osteo.resize(), 60);
  }
  if (id !== 'viewerView' && window.__osteo) {
    /* Hiding and the concept overlays are a within-viewer working state. */
    if (window.__osteo.clearConcepts) window.__osteo.clearConcepts();
    if (window.__osteo.unhide) window.__osteo.unhide('all');
  }
}

function coveragePill(status) {
  const map = { full: ['full', 'Full coverage'], substitute: ['substitute', 'Substitute source'], limited: ['limited', 'Limited source coverage'], none: ['none', 'No source materials'] };
  const [cls, label] = map[status] || ['none', status];
  return `<span class="pill ${cls}">${esc(label)}</span>`;
}

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Navigation -- five destinations, rendered into both the icon rail and
 * the phone tab bar from one definition.
 * ------------------------------------------------------------------ */

const NAV_DESTS = [
  ['today', 'Today', '\u25d4', () => renderToday()],
  ['learn', 'Learn', '\u25a6', () => renderLearn()],
  ['viewer', 'Viewer', '\u25c9', () => openViewer()],
  ['review', 'Review', '\u21bb', () => renderReviewTab(reviewTab)],
  ['more', 'More', '\u22ef', () => renderMore()],
];
const NAV_TITLES = { today: 'Today', learn: 'One learning tree', viewer: 'Viewer', review: 'Review', more: 'More' };
const NAV_KICKERS = {
  today: 'What to do now',
  learn: 'Anatomy \u00b7 physiology \u00b7 radiation science',
  viewer: 'Model and images in one place',
  review: 'Mistakes, due items, mastery',
  more: 'Sources, coverage, settings',
};
let currentTab = 'today';

function setActiveNav(id) {
  currentTab = id;
  $$('navTitle').textContent = NAV_TITLES[id] || 'Study Studio';
  if (id !== 'learn') $$('navBackBtn').classList.add('hidden');
  $$('navKicker').textContent = NAV_KICKERS[id] || '';
  /*
   * The viewer takes over the window: the page stops scrolling, the width cap
   * comes off, the header tightens and the 3D/Projection switch appears beside
   * the title. Everything else gets the ordinary reading layout back.
   */
  const viewer = id === 'viewer';
  $$('navContent').classList.toggle('bleed', viewer);
  document.querySelector('.navmain > .navhead').classList.toggle('compact', viewer);
  $$('viewerTabs').classList.toggle('hidden', !viewer);
  /* The canvas box changed size; tell the renderer before the next frame. */
  if (viewer && window.__osteo && window.__osteo.resize) requestAnimationFrame(() => window.__osteo.resize());
  document.querySelectorAll('.navrail [data-nav], .bottomtab [data-nav]').forEach((b) => {
    const on = b.dataset.nav === id;
    b.classList.toggle('active', on);
    /* .active is only a visual cue; aria-current is what gets announced. */
    b.setAttribute('aria-current', on ? 'page' : 'false');
  });
}
function goTo(id) {
  ui.learnDrill = false;
  const dest = NAV_DESTS.find((d) => d[0] === id);
  if (dest) dest[3]();
}
function renderNavButtons() {
  const html = NAV_DESTS.map(([id, label, icon]) =>
    `<button data-nav="${esc(id)}"><span class="ic">${icon}</span><span>${esc(label)}</span></button>`).join('');
  $$('navRail').insertAdjacentHTML('beforeend', html);
  $$('bottomTab').innerHTML = html;
  document.querySelectorAll('.navrail [data-nav], .bottomtab [data-nav]').forEach((b) => {
    b.onclick = () => goTo(b.dataset.nav);
  });
}

/* The session is a full-screen overlay rather than a routed view, so it can
   cover the shell whatever destination is behind it. */
let tabBeforeSession = 'today';
function openSessionOverlay() {
  tabBeforeSession = currentTab || 'today';
  $$('sessionView').classList.remove('hidden');
  /* Without this the rail, tab bar and search button stay in the tab order
     behind the overlay. `inert` needs no focus-trap code. */
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = true;
}
function closeSessionOverlay() {
  releaseLessonVisual();
  $$('sessionView').classList.add('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = false;
  goTo(tabBeforeSession);
}

/* ------------------------------------------------------------------ *
 * Review -- mistakes, due items, and the mastery map that replaced the
 * old dashboard dialog.
 * ------------------------------------------------------------------ */

let reviewTab = 'mistakes';

function reviewRow(title, note, badge, color) {
  return `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(title)}</b><small>${esc(note)}</small></span><span class="mono" style="color:${color}">${esc(badge)}</span></div>`;
}

function renderReviewTab(tab) {
  reviewTab = tab || 'mistakes';
  setActiveNav('review');
  $$('reviewTabs').innerHTML = [['mistakes', 'My mistakes'], ['due', 'Due']]
    .map(([id, label]) => `<button class="seg${reviewTab === id ? ' active' : ''}" data-rtab="${esc(id)}">${esc(label)}</button>`).join('');
  $$('reviewTabs').querySelectorAll('[data-rtab]').forEach((b) => { b.onclick = () => renderReviewTab(b.dataset.rtab); });

  let copy = '', rows = '', cta = '', ctaMode = null;

  if (reviewTab === 'mistakes') {
    const ids = [];
    store.mistakes.forEach((m) => { if (ids.indexOf(m.itemId) < 0) ids.push(m.itemId); });
    const entries = ids.map((id) => ({ item: getItem(id), n: store.mistakes.filter((m) => m.itemId === id).length }))
      .filter((r) => r.item).sort((a, b) => b.n - a.n);
    copy = 'Everything you have got wrong, most-repeated first. Each one keeps its own explanation and the confusion that caused it.';
    rows = entries.map((r) => reviewRow(r.item.title, getSubject(r.item.subject).title,
      r.n + ' lapse' + (r.n === 1 ? '' : 's'), r.n >= 3 ? 'var(--red)' : 'var(--orange)')).join('')
      || '<div class="empty">No mistakes recorded yet.</div>';
    if (entries.length) { cta = 'Drill these ' + entries.length + ' \u2192'; ctaMode = { mode: 'mistakes' }; }
  } else if (reviewTab === 'due') {
    const due = STUDY_ITEMS.filter((i) => itemAttempted(i.id) && itemDue(i.id));
    copy = due.length + ' item' + (due.length === 1 ? ' is' : 's are') + ' due. Delayed recall only scores on the first attempt after a gap of a day or more.';
    rows = due.map((i) => reviewRow(i.title, getSubject(i.subject).title, 'due', 'var(--teal)')).join('')
      || '<div class="empty">Nothing due right now.</div>';
    if (due.length) { cta = 'Start due ui.session \u2192'; ctaMode = { mode: 'weakest', limit: due.length }; }
  }

  /* .reviewrows wraps into columns instead of running one long list down the
     middle of a wide display -- the mistakes list was a 400px column with two
     thirds of a 4K screen empty on either side of it. */
  $$('reviewBody').innerHTML = `<p class="small">${esc(copy)}</p><div class="reviewrows">${rows}</div>`
    + (cta ? `<button class="primary" id="reviewCtaBtn" style="margin-top:14px">${esc(cta)}</button>` : '');
  if (ctaMode && $$('reviewCtaBtn')) $$('reviewCtaBtn').onclick = () => startSession(ctaMode);

  showView('reviewView');
}

/* ------------------------------------------------------------------ *
 * More -- sources, coverage, and the things demoted out of the topbar.
 * ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ *
 * Global search -- one sheet over every destination, mixing structures,
 * study items and topics. Replaces the studio-only anatomy search card.
 * ------------------------------------------------------------------ */

let searchReturnFocus = null;

function openSearchSheet() {
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
function closeSearchSheet() {
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
function dismissSessionForNav() {
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
    step: 'learn', reveal: 0, qIndex: 0, answered: false, startedAt: 0,
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
function studyItemWithin(topic, itemId) {
  const ordered = topic.items.slice().sort((a, b) => adjScore(a) - adjScore(b));
  const at = ordered.findIndex((i) => i.id === itemId);
  if (at < 0) return;
  const items = [ordered[at], ...ordered.slice(0, at), ...ordered.slice(at + 1)];
  ui.session = {
    opts: { mode: 'subject', subject: topic.subject.id, unit: topic.unit.id }, mode: null, items, index: 0,
    step: 'learn', reveal: 0, qIndex: 0, answered: false, startedAt: 0,
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

function runSearch(q) {
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

/* ------------------------------------------------------------------ *
 * Search -> viewer: open the model, select the part, auto-uncover, and
 * say what was hidden.
 * ------------------------------------------------------------------ */
function openStructureInViewer(spec) {
  closeSearchSheet();
  dismissSessionForNav();
  goTo('viewer');
  setTimeout(async () => {
    if (!window.__osteo || !window.__osteo.revealStructure) return;
    const res = await window.__osteo.revealStructure(spec);
    if (res && res.ok && res.covered && res.covered.length) {
      showUncoverBanner(spec.name || spec.id || 'that structure', res.covered);
    } else {
      hideUncoverBanner();
    }
  }, 140);
}
function showUncoverBanner(target, names) {
  const el = $$('uncoverBanner');
  if (!el) return;
  const list = names.slice(0, 4).join(', ') + (names.length > 4 ? ` +${names.length - 4} more` : '');
  el.innerHTML = `<span>Hid <b>${esc(list)}</b> to uncover ${esc(target)}.</span>
    <button class="show" id="uncoverShow">Show them</button>
    <button class="keep" id="uncoverKeep">Keep hidden</button>`;
  el.classList.remove('hidden');
  $$('uncoverShow').onclick = () => { if (window.__osteo) window.__osteo.unhide('auto'); hideUncoverBanner(); };
  $$('uncoverKeep').onclick = hideUncoverBanner;
  clearTimeout(showUncoverBanner.t);
  showUncoverBanner.t = setTimeout(hideUncoverBanner, 9000);
}
function hideUncoverBanner() {
  const el = $$('uncoverBanner');
  if (el) el.classList.add('hidden');
}

/* ------------------------------------------------------------------ *
 * Hidden tray
 * ------------------------------------------------------------------ */
function renderHiddenTray(rows) {
  const tray = $$('hiddenTray');
  if (!tray) return;
  rows = rows || (window.__osteo && window.__osteo.hiddenList ? window.__osteo.hiddenList() : []);
  tray.classList.toggle('empty', !rows.length);
  $$('hiddenCount').textContent = rows.length ? `Hidden (${rows.length})` : 'Hidden';
  if (!rows.length) { tray.classList.remove('open'); $$('hiddenToggle').setAttribute('aria-expanded', 'false'); }
  $$('hiddenList').innerHTML = rows.map((r) =>
    `<div class="hrow"><span class="hn">${esc(r.name)}</span>${r.auto ? '<span class="hy">auto</span>' : ''}<span class="hl">${esc(r.layer)}</span><button data-show="${esc(r.token)}">show</button></div>`).join('')
    + (rows.length > 1 ? `<button class="hall" id="hiddenShowAll">Show all</button>` : '');
  $$('hiddenList').querySelectorAll('[data-show]').forEach((b) => {
    b.onclick = () => { if (window.__osteo) window.__osteo.unhide(b.dataset.show); };
  });
  const all = $$('hiddenShowAll');
  if (all) all.onclick = () => { if (window.__osteo) window.__osteo.unhide('all'); hideUncoverBanner(); };
}

/* ------------------------------------------------------------------ *
 * Spatial overlay controls (viewer "..." sheet)
 * ------------------------------------------------------------------ */
function renderOverlayCard(active) {
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
function renderMore() {
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
function saveContinue(itemId, step) { write(STORAGE_PREFIX + 'continue', { itemId, step }); }
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

function renderToday() {
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
    <p class="small" style="margin-top:6px">Start a ui.session below to begin.</p>`;
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
    </button>`).join('') : '<div class="empty">Nothing studied yet — start a ui.session to build this list.</div>';
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

/* ------------------------------------------------------------------ *
 * Subject
 * ------------------------------------------------------------------ */

function fileRowsHTML(refs) {
  return `<div class="filelist">${refs.map((r) => {
    const s = SOURCE_FILES[r];
    if (!s) return '';
    return `<div class="filerow"><div class="fn">${esc(s.file)}</div><div class="fp">${esc((SOURCE_ROOTS[s.root] || s.root) + ' / ' + s.folder)} · ${esc(s.kind)}${s.note ? ' · ' + esc(s.note) : ''}</div></div>`;
  }).join('')}</div>`;
}

const SUBJECT_GROUP = { HSS2011: { label: 'Anatomy', accent: '#72e3cf' }, ABCT2326: { label: 'Physiology', accent: '#ffba67' }, HTI17103: { label: 'Radiation science', accent: '#8ea9ff' } };
const LEARN_FILTERS = [['all', 'Everything'], ['Anatomy', 'Anatomy'], ['Physiology', 'Physiology'], ['Radiation science', 'Radiation science'], ['3d', 'Has 3D / images']];

/* A "topic" is one subject.unit that actually has study items. Subjects with no
   items (APSS1A08, DSAI1202, LEI1101) drop out of Learn here on their own --
   there is deliberately no hide-list to maintain. */
function topicsWithContent() {
  const list = [];
  for (const subject of SUBJECTS) {
    const group = SUBJECT_GROUP[subject.id];
    if (!group) continue;
    for (const unit of subject.units) {
      const items = itemsForUnit(subject.id, unit.id);
      if (!items.length) continue;
      list.push({ subject, unit, group, items });
    }
  }
  return list;
}
function topicHasViewer(items) { return items.some((i) => ['id3d', 'structure', 'movement', 'diagram'].includes(i.type)); }
function topicPct(items) { return items.length ? Math.round(items.reduce((n, i) => n + itemScore(i.id), 0) / items.length * 100) : 0; }

function renderLearn() {
  leaveProjection();
  setActiveNav('learn');
  const visible = topicsWithContent().filter((t) => ui.learnFilter === 'all' || (ui.learnFilter === '3d' ? topicHasViewer(t.items) : t.group.label === ui.learnFilter));
  if (!ui.learnTopic || !visible.some((t) => t.unit.id === ui.learnTopic)) ui.learnTopic = visible[0] ? visible[0].unit.id : null;

  $$('learnFilters').innerHTML = LEARN_FILTERS.map(([id, label]) =>
    `<button class="filter-chip${ui.learnFilter === id ? ' active' : ''}" data-filter="${esc(id)}">${esc(label)}</button>`).join('');
  $$('learnFilters').querySelectorAll('[data-filter]').forEach((b) => { b.onclick = () => { ui.learnFilter = b.dataset.filter; renderLearn(); }; });

  $$('topicGrid').innerHTML = visible.map((t) => `
    <button class="topic-card${t.unit.id === ui.learnTopic ? ' active' : ''}" style="--accent:${t.group.accent}" data-topic="${esc(t.unit.id)}">
      <span class="topic-tag">${esc(t.group.label)} \u00b7 ${esc(t.subject.code)}</span>
      <span class="editorial" style="font-size:17px">${esc(t.unit.label)}</span>
      <span class="topic-bar"><span style="width:${topicPct(t.items)}%"></span></span>
      <span class="small">${t.items.length} item${t.items.length === 1 ? '' : 's'}${topicHasViewer(t.items) ? ' \u00b7 3D studio' : ''}</span>
    </button>`).join('') || '<div class="empty">No topics match this filter yet.</div>';
  $$('topicGrid').querySelectorAll('[data-topic]').forEach((b) => { b.onclick = () => { ui.learnTopic = b.dataset.topic; ui.learnDrill = true; renderLearn(); }; });

  const T = visible.find((t) => t.unit.id === ui.learnTopic);
  $$('topicDetailPane').innerHTML = !T ? '' : `
    <div class="card" style="animation:fadeUp .22s ease;--accent:${T.group.accent}">
      <span class="topic-tag">${esc(T.group.label)} \u00b7 ${esc(T.subject.code)}</span>
      <h2 class="editorial" style="font-size:22px;margin:7px 0 0">${esc(T.unit.label)}</h2>
      <p class="small" style="margin-top:7px">${esc(T.subject.blurb)}</p>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
        <button class="primary" id="studyTopicBtn">Study this topic</button>
        ${topicHasViewer(T.items) ? '<button class="ghost" id="openViewerBtn">Open in Viewer</button>' : ''}
      </div>
      <div class="task-kicker" style="margin:18px 0 8px">${T.items.length} items \u00b7 weakest first</div>
      <div style="display:grid;gap:7px">
        ${T.items.slice().sort((a, b) => adjScore(a) - adjScore(b)).map((i) => {
          const attempted = itemAttempted(i.id);
          const assumed = !attempted ? priorOf(i) : null;
          /* Assumed items are ringed in the dim colour: those marks are carried
             over from another syllabus, not earned against this one. */
          const tier = tierFor(adjScore(i), attempted || !!assumed);
          const color = assumed ? 'var(--dim)' : tier >= 3 ? 'var(--green)' : tier === 2 ? 'var(--orange)' : 'var(--red)';
          const sub = (ITEM_TYPES[i.type] || {}).label || i.type;
          return `<button class="unit-row" data-item="${esc(i.id)}"><span class="grow"><b>${esc(i.title)}</b><small>${esc(sub)}${assumed ? esc(' · assumed from ' + assumed.short + ', unverified') : ''}</small></span><span class="mono" style="color:${color}">${'\u25cf'.repeat(tier)}${'\u25cb'.repeat(4 - tier)}</span></button>`;
        }).join('')}
      </div>
      <div class="small" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">Sourced from <span style="color:var(--teal)">${esc(describeSource(T.items[0].sourceRefs[0]).file)}</span> \u00b7 every item carries its own reference</div>
    </div>`;
  if ($$('studyTopicBtn')) $$('studyTopicBtn').onclick = () => startSession({ mode: 'subject', subject: T.subject.id, unit: T.unit.id });
  if ($$('openViewerBtn')) $$('openViewerBtn').onclick = () => goTo('viewer');
  /*
   * A row in the item list opens THAT item.
   *
   * It used to throw away data-item and start the ordinary topic session, whose
   * queue is due-first and then shuffled -- so tapping the sixth row opened
   * whichever item the shuffle happened to put in front, and the list read as
   * broken. The clicked item leads; the rest of the topic follows behind it in
   * the order the list is already showing, so "next" still walks the topic.
   */
  $$('topicDetailPane').querySelectorAll('[data-item]').forEach((b) => {
    b.onclick = () => studyItemWithin(T, b.dataset.item);
  });

  $$('learnGrid').classList.toggle('drilled', ui.learnDrill);
  $$('navBackBtn').classList.toggle('hidden', !ui.learnDrill);
  showView('learnView');
}

/* Viewer -- the 3D studio and radiographs share one destination. Compare mode
   from the prototype is deliberately not built: the handoff lists its
   synchronised highlighting as undesigned. */

/*
 * Body layers.
 *
 * All six GLBs are exported in one shared frame, so they are layers of one
 * body rather than six alternative models -- muscle really does sit on the
 * bone it is drawn over. Each chip cycles off -> solid -> ghost, because
 * peeling is the whole point: you want the vessels solid AND the skeleton
 * ghosted behind them to see where they run.
 *
 * Layers load on demand. Precaching six models is ~37 MB of download for
 * someone who may only study bones tonight.
 */
const BODY_LAYERS = [
  { key: 'skeleton', label: 'Skeleton' },
  { key: 'muscle', label: 'Muscles' },
  { key: 'joint', label: 'Ligaments' },
  { key: 'organs', label: 'Organs' },
  { key: 'circulatory', label: 'Vessels' },
  { key: 'nervous', label: 'Nerves' },
  { key: 'lymphatic', label: 'Lymphatic' },
];
const LAYER_CYCLE = { off: 'solid', solid: 'ghost', ghost: 'off' };
const GHOST_OPACITY = 0.34;
let layerState = { skeleton: 'solid' };

/*
 * How many structures a layer contains -- not how many meshes it holds.
 *
 * The chips used to show the raw mesh counts (skeleton 277, muscles 683,
 * vessels 676), which is a count of geometry, not of anatomy. The same
 * structure is counted twice when it is paired, again for each duplicate
 * export, and once more for every sub-part the source split out. The index
 * already collapses all three, so "Muscles 345" is the number of things you
 * can actually name -- and it is the same number the search offers.
 */
/*
 * Two counts per layer, and the difference between them is the point.
 *
 * The chips used to read "Vessels 419" -- 419 individually pressable names in
 * one layer, none of them marked as more or less worth knowing than the rest.
 * mesh-index.js now carries, for every structure, whether the HSS2011 /
 * ABCT2326 material actually names it and which file does. The chip leads with
 * that number: "Vessels 186/419" is 186 names to learn inside an atlas of 419.
 */
const LAYER_STRUCTURES = MESH_INDEX.reduce((acc, m) => {
  const a = acc[m.layer] || (acc[m.layer] = { total: 0, course: 0 });
  a.total++;
  if (m.tier === 0) a.course++;
  return acc;
}, {});
function layerCount(key) {
  return (LAYER_STRUCTURES[key] || {}).total || 0;
}
function layerCourseCount(key) {
  return (LAYER_STRUCTURES[key] || {}).course || 0;
}
/*
 * How many separate things this layer lets you select.
 *
 * Not the same as either number on the chip, and that is the point: 419
 * vessels are modelled, 186 of them are named by the course, and a tap can
 * land on 217 things -- those 186 plus one per group of the other 233.
 */
const LAYER_UNIT_COUNT = UNITS.reduce((acc, u) => {
  acc[u.layer] = (acc[u.layer] || 0) + 1;
  return acc;
}, {});
function layerUnitCount(key) {
  return LAYER_UNIT_COUNT[key] || 0;
}

const hex = (n) => '#' + Number(n).toString(16).padStart(6, '0');

/*
 * The colour key.
 *
 * It lists only the classes actually on screen, with the real mesh count beside
 * each, and it leads with the pulmonary pair whenever they are showing --
 * because that is the one place the red/blue convention inverts, and a legend
 * that quietly let a student read 'artery = red = oxygenated' off a pulmonary
 * artery would be teaching the error the colours exist to prevent.
 */
function renderFlowKey() {
  if (!window.__osteo || !window.__osteo.flowCounts) return '';
  const on = Object.keys(layerState).filter((k) => layerState[k] && layerState[k] !== 'off');
  const rows = [];
  const seen = new Set();
  on.forEach((k) => {
    const counts = window.__osteo.flowCounts(k) || {};
    (LAYER_CLASSES[k] || []).forEach((cls) => {
      if (seen.has(cls) || !counts[cls]) return;
      seen.add(cls);
      rows.push({ cls, n: counts[cls], spec: FLOW_CLASSES[cls] });
    });
  });
  if (!rows.length) return '';
  const pulm = rows.some((r) => r.cls === 'pulmArtery' || r.cls === 'pulmVein');
  return `<div class="flowkey"><div class="kh">What the colours mean</div>${
    rows.map((r) => `<div class="kr"><span class="sw" style="background:${hex(r.spec.color)}"></span>${esc(r.spec.short)}<span class="kn">${r.n}</span></div>`).join('')
  }${pulm ? '<div class="note">Red is oxygenated, blue is not — which is why the pulmonary artery is blue-violet and the pulmonary veins are red. Vessel type does not decide the colour; what it carries does.</div>' : ''}
    <div class="note">Colours and rhythms are drawn by this app, not measured.</div></div>`;
}

function renderLayerRail() {
  const rail = $$('layerRail');
  if (!rail) return;
  const live = !!(window.__osteo && window.__osteo.physiologyOn && window.__osteo.physiologyOn());
  rail.innerHTML = `<button class="livechip" id="liveChip" data-on="${live ? 1 : 0}" aria-pressed="${live}">
      <span class="pulse"></span><span>${live ? 'Live physiology' : 'Static model'}</span>
    </button>` + BODY_LAYERS.map((l) => {
    const st = layerState[l.key] || 'off';
    return `<button class="layerchip" data-layer="${esc(l.key)}" data-state="${st}" aria-pressed="${st !== 'off'}">
      <span class="dot"></span><span>${esc(l.label)}</span><span class="cnt" title="${layerCourseCount(l.key)} named by your course · ${layerCount(l.key)} modelled · ${layerUnitCount(l.key)} separately selectable">${layerCourseCount(l.key)}<i>/${layerCount(l.key)}</i></span>
    </button>`;
  }).join('') + '<div class="layerhint">tap to cycle · solid → ghost → off</div>' + renderFlowKey();
  rail.querySelectorAll('[data-layer]').forEach((b) => { b.onclick = () => cycleLayer(b.dataset.layer, b); });
  const chip = $$('liveChip');
  if (chip) chip.onclick = () => {
    if (!window.__osteo || !window.__osteo.setPhysiology) { toast('Open the 3D model first.'); return; }
    const now = window.__osteo.setPhysiology(!window.__osteo.physiologyOn());
    toast(now
      ? `Live — ${RATES.heartBpm} beats and ${RATES.breathsPerMin} breaths a minute`
      : 'Motion off. The anatomical colours stay.');
    renderLayerRail();
  };
}

async function cycleLayer(key, btn) {
  if (btn && btn.dataset.busy === '1') return;
  const next = LAYER_CYCLE[layerState[key] || 'off'];
  const model = STRUCTURE_MODELS[key];
  const needsLoad = next !== 'off' && key !== 'skeleton' && !(window.__osteo && window.__osteo.layerLoaded(key));
  if (needsLoad && btn) { btn.dataset.busy = '1'; btn.querySelector('.cnt').textContent = '···'; }
  try {
    if (!window.__osteo) { toast('Open the 3D model first.'); return; }
    if (next === 'off') {
      await window.__osteo.setLayer(key, false);
    } else {
      const ok = await window.__osteo.setLayer(key, true, model ? model.file : null);
      if (!ok) return;
      window.__osteo.setLayerOpacity(key, next === 'ghost' ? GHOST_OPACITY : 1);
    }
    layerState[key] = next;
  } finally {
    if (btn) { btn.dataset.busy = '0'; }
    renderLayerRail();
    if (window.__osteo && window.__osteo.refreshStudyPool) window.__osteo.refreshStudyPool();
  }
}

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
}

function leaveProjection() {
  if (!window.__osteo || !window.__osteo.inXray || !window.__osteo.inXray()) { restoreStage(); return; }
  window.__osteo.exitXray();
  restoreStage();
  window.__osteo.resize();
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

function openViewer() {
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

/* ------------------------------------------------------------------ *
 * Session engine
 * ------------------------------------------------------------------ */

const STEPS = [
  { id: 'learn', label: 'Learn', copy: 'Read the teaching explanation and the key facts.' },
  { id: 'remember', label: 'Remember', copy: 'Memory Coach — hints revealed one stage at a time.' },
  { id: 'practise', label: 'Practise', copy: 'Answer, then see why.' },
  { id: 'apply', label: 'Apply', copy: 'Use the idea on something you have not seen.' },
  { id: 'review', label: 'Review', copy: 'Confirm what was scheduled and what to fix.' },
];


function pickItems(opts) {
  const now = Date.now();
  let pool = STUDY_ITEMS.slice();
  if (opts.subject) pool = pool.filter((i) => i.subject === opts.subject);
  if (opts.unit) pool = pool.filter((i) => i.unit === opts.unit);

  const unseen = pool.filter((i) => !itemAttempted(i.id));
  const due = pool.filter((i) => itemAttempted(i.id) && itemDue(i.id, now));
  const byWeak = (a, b) => (adjScore(a) - adjScore(b)) || (itemLapses(b.id) - itemLapses(a.id));
  const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);

  switch (opts.mode) {
    case 'new': {
      /* Revision dressed as novelty is still revision: prior-knowledge items
         fill the tail of this queue only once the genuinely new ones run out. */
      const novel = unseen.filter((i) => !priorOf(i));
      const revision = unseen.filter((i) => priorOf(i));
      return [...shuffle(novel), ...shuffle(revision)].slice(0, 8);
    }
    case 'weakest':
      return pool.filter((i) => itemAttempted(i.id)).sort(byWeak).slice(0, opts.limit || 10);
    case 'quick10': {
      /*
       * Due work first, then new material to fill the gap. The old version took
       * four due plus two unseen and stopped, so on a fresh install -- when
       * nothing can be due yet -- a session advertised as ten minutes handed
       * over two items. It under-delivered worst exactly when someone was
       * trying the app for the first time.
       */
      const QUICK = 6;
      const picked = due.sort(byWeak).slice(0, 4);
      const room = QUICK - picked.length;
      if (room > 0) picked.push(...shuffle(unseen).slice(0, room));
      /* still short (everything seen, little due)? top up with the weakest. */
      if (picked.length < QUICK) {
        const have = new Set(picked.map((i) => i.id));
        picked.push(...pool.filter((i) => itemAttempted(i.id) && !have.has(i.id)).sort(byWeak).slice(0, QUICK - picked.length));
      }
      return picked.slice(0, QUICK);
    }
    case 'exam': {
      const examItems = pool.filter((i) => questionsOf(i).some((q) => q.src && (q.type === 'mcq' || q.type === 'cloze')));
      return shuffle(examItems).slice(0, 10);
    }
    case 'hooks':
      return shuffle(pool.filter((i) => i.memory && Object.keys(i.memory).length)).slice(0, 12);
    case 'mistakes': {
      const ids = [...new Set(store.mistakes.map((m) => m.itemId))];
      return ids.map(getItem).filter(Boolean).filter((i) => !opts.subject || i.subject === opts.subject).slice(0, 12);
    }
    case 'daily': {
      const grab = (subject, unit, n) => shuffle(STUDY_ITEMS.filter((i) => i.subject === subject && (!unit || i.unit === unit))).sort((a, b) => (itemDue(b.id) - itemDue(a.id))).slice(0, n);
      return [
        ...grab('HSS2011', 'hss.term', 2),
        ...grab('HSS2011', 'hss.osteo', 3),
        ...grab('ABCT2326', null, 2),
        ...grab('HTI17103', null, 1),
      ];
    }
    case 'mixed':
      return shuffle(STUDY_ITEMS.filter((i) => ['HSS2011', 'ABCT2326', 'HTI17103'].includes(i.subject))).slice(0, 14);
    case 'subject':
    default: {
      /* Study this topic walks the whole topic in the weakest-first order the
         list already shows -- no shuffle, no 12-item cap. */
      return pool.slice().sort(byWeak);
    }
  }
}

function startSession(opts) {
  const items = pickItems(opts).filter(Boolean);
  if (!items.length) {
    if (opts.mode === 'mistakes') return toast('No mistakes recorded yet — nothing to explain.');
    if (opts.mode === 'new') return toast('Every item has been seen at least once. Try "Review my weakest topics".');
    return toast('Nothing to study for that selection yet.');
  }
  const mode = STUDY_MODES.find((m) => m.id === opts.mode);
  const hooksOnly = opts.mode === 'hooks';
  const first = items[0];
  ui.session = {
    opts, mode, items, index: 0, step: hooksOnly ? 'remember' : entryStep(first, itemAttempted(first.id)),
    /* Hooks-only is a browsing mode, so open every hint straight away. */
    reveal: hooksOnly ? REVEAL_STAGES.length : 0,
    qIndex: 0, answered: false, startedAt: 0,
    results: [], hooksOnly,
  };
  ui.session.modeLabel = mode ? mode.label : 'Study ui.session';
  openSessionOverlay();
  renderStep();
}

function currentItem() { return ui.session.items[ui.session.index]; }

/*
 * Moving to the next item. The footer control and the review card's own button
 * both land here, so where an item opens is decided once: material a previous
 * syllabus already covered opens on Practise to be verified, everything else
 * opens on Learn to be taught.
 */
function advanceItem() {
  ui.session.index += 1; ui.session.qIndex = 0; ui.session.seqOrder = null; ui.session.matchRights = null;
  ui.session.diagramTarget = null; ui.session.diagramReveal = null;
  if (window.__osteo && window.__osteo.endMovement) {
    window.__osteo.endMovement();
    const b = $$('mvBar'); if (b) b.classList.add('hidden');
    const bk = $$('mvBackToSession'); if (bk) bk.classList.add('hidden');
  }
  const next = ui.session.items[ui.session.index];
  setStep(ui.session.hooksOnly ? 'remember' : entryStep(next, itemAttempted(next.id)));
}

function setStep(step) {
  /* Step buttons stay in the DOM after a session ends; ignore late clicks. */
  if (!ui.session) return;
  ui.session.step = step;
  if (ui.session.items[ui.session.index]) saveContinue(ui.session.items[ui.session.index].id, step);
  ui.session.reveal = ui.session.hooksOnly ? REVEAL_STAGES.length : 0;
  ui.session.answered = false;
  if (step === 'practise' || step === 'apply') ui.session.startedAt = performance.now();
  renderStep();
}

function renderSteps() {
  const el = $$('rssSteps');
  const order = STEPS.map((s) => s.id);
  el.innerHTML = STEPS.map((s) => {
    const done = order.indexOf(s.id) < order.indexOf(ui.session.step);
    return `<button class="step ${s.id === ui.session.step ? 'active' : ''} ${done ? 'done' : ''}" data-step="${s.id}"><b>${esc(s.label)}</b>${esc(s.copy)}</button>`;
  }).join('');
  el.querySelectorAll('[data-step]').forEach((b) => { b.onclick = () => setStep(b.dataset.step); });
}

function renderSessionMeter() {
  const total = ui.session.items.length;
  const n = ui.session.index + 1;
  $$('rssSessionCount').textContent = `${n}/${total}`;
  $$('rssSessionMeta').textContent = `Item ${n} of ${total} \u00b7 ${ui.session.modeLabel || 'Session'}`;
  $$('rssSessionBar').style.width = `${Math.round((ui.session.index / total) * 100)}%`;
}

/* The source trace is inline under every item now, not a side card. */
function renderSourceCard(item) {
  const refs = item.sourceRefs || [];
  const first = refs.length ? describeSource(refs[0]) : null;
  const btn = $$('rssSourceInline');
  const extra = refs.length > 1 ? ` \u00b7 +${refs.length - 1} more` : '';
  btn.textContent = first ? first.file + (first.authored ? ' (app-authored)' : '') + extra : 'No reference';
  btn.onclick = () => openSourceDialog(item);
}


/* One consistent advance control. The per-step buttons the HTML builders
   emit are removed so there is never a second Next in the card. */
function renderSessionFoot(item) {
  $$('rssStage').querySelectorAll('[data-nav], #rssNextItem, #rssFinish').forEach((b) => {
    const wrap = b.closest('.rss-actions');
    b.remove();
    if (wrap && !wrap.querySelector('button')) wrap.remove();
  });
  const order = STEPS.map((x) => x.id);
  const at = order.indexOf(ui.session.step);
  const lastStep = at === order.length - 1;
  const lastItem = ui.session.index >= ui.session.items.length - 1;
  const btn = $$('rssNextStep');
  if (!lastStep) {
    btn.textContent = `Next: ${STEPS[at + 1].label} \u2192`;
    btn.onclick = () => setStep(order[at + 1]);
  } else if (!lastItem) {
    btn.textContent = 'Finish \u00b7 next item \u2192';
    btn.onclick = advanceItem;
  } else {
    btn.textContent = 'Finish ui.session \u2192';
    btn.onclick = endSession;
  }
  $$('rssFootHint').textContent = lastStep ? 'Review scheduled from your answers' : 'Autosaves as you go';
}
function renderStep() {
  const item = currentItem();
  const stepDef = STEPS.find((x) => x.id === ui.session.step) || STEPS[0];
  $$('rssSessionKicker').textContent = stepDef.label;
  renderSteps();
  renderSessionMeter();
  renderSourceCard(item);
  const stage = $$('rssStage');
  if (ui.session.step === 'learn') { stage.innerHTML = learnHTML(item); mountLessonVisual(item); }
  else if (ui.session.step === 'remember') { releaseLessonVisual(); stage.innerHTML = rememberHTML(item); wireReveal(item); }
  else if (ui.session.step === 'practise') { releaseLessonVisual(); stage.innerHTML = practiseHTML(item); wirePractise(item); }
  else if (ui.session.step === 'apply') { releaseLessonVisual(); stage.innerHTML = applyHTML(item); wireApply(item); }
  else { releaseLessonVisual(); stage.innerHTML = reviewHTML(item); }
  wireStageNav(item);
  wireTerms($$('rssStage'));
  renderSessionFoot(item);
}

function typeLabel(t) { return (ITEM_TYPES[t] || {}).label || t; }

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
function figureKeyHTML(spec) {
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

function visualSlotHTML(item) {
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
async function mountLessonVisual(item) {
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

function restoreStage() {
  const home = $$('stageHome');
  const stage = window.__osteo && window.__osteo.stageEl && window.__osteo.stageEl();
  if (home && stage && stage.parentElement !== home) home.insertBefore(stage, home.firstChild);
}

function releaseLessonVisual() {
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
function priorLeadHTML(item, prior) {
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

/* ------------------------------------------------------------------ *
 * Reading help
 *
 * Two things make a physiology page feel unreadable, and they are different
 * problems. One is the paragraph: eight sentences of continuous prose with no
 * foothold. The other is the words: nobody remembers "glossopharyngeal" as a
 * seventeen-letter string, and pretending otherwise is why it will not stick.
 *
 * So: prose is broken into numbered chunks of a couple of sentences each, and
 * any word the app can genuinely help with is underlined and tappable. Tapping
 * gives the three things that actually help -- how to SAY it, what it means in
 * ordinary English, and which shorter words it is built out of.
 *
 * The breakdown comes from the HSS2011 word-part list. The pronunciation and
 * the plain-English line are written by this app, and the panel says so.
 * ------------------------------------------------------------------ */

const glossCache = new Map();

function lookupTerm(word) {
  const key = word.toLowerCase();
  if (glossCache.has(key)) return glossCache.get(key);
  const note = termNote(word);
  const split = decompose(word);
  /* 'epi-' and 'cardi/o' are single parts, not compounds, so decompose() will
     never resolve them -- they get looked up directly instead. */
  const part = partOf(word);
  /* The meaning and the Chinese. A word is not worth tapping for a breakdown
     alone, so this is what the dialog leads with wherever it exists. */
  const gloss = termGloss(word);
  /* The glossary alone is enough to make a word tappable — the old condition
     dropped it, so words that resolve only through TERM_GLOSS (cavity, heart,
     and every adjective the fold maps to its noun) were silently inert. */
  const found = (note || split || part || gloss) ? { word, note, split, part, gloss } : null;
  glossCache.set(key, found);
  return found;
}

/*
 * Wraps helpable words in the ALREADY-ESCAPED text. Escaping first is what
 * makes this safe: by the time the regex runs there are no angle brackets or
 * ampersands left to break, only entities, and \w never matches those.
 *
 * ONE pass, with the alternatives in a single regex, because two passes would
 * let the second one scan the markup the first one just inserted.
 *
 * Word-part tokens are matched too -- epi-, -graphy, cardi/o. On the
 * terminology items the text IS a list of those, and leaving them inert while
 * the app carries an 814-stem glossary was daft.
 */
const GLOSS_RE = /([a-z]{2,12}\/[oi])|(^|[\s(])(-[a-z]{2,12})\b|\b([a-z]{2,12}-)(?=[\s,;)])|\b([A-Za-z][a-z]{5,})\b/g;

function glossify(escaped) {
  return String(escaped).replace(GLOSS_RE, (m, combForm, pre, sufForm, preForm, word) => {
    const token = combForm || sufForm || preForm || word;
    const lead = pre || '';
    const hit = lookupTerm(token);
    if (!hit) return m;
    return lead + `<button type="button" class="term" data-term="${esc(token)}">${token}</button>`;
  });
}

/*
 * Chunking.
 *
 * The first version split on . ! ? alone, which is fine until a lecture writes
 * one 961-character sentence held together with semicolons -- and then the
 * whole thing lands as a single wall, which is exactly the case this was
 * supposed to prevent. So oversized pieces are broken again at semicolons, and
 * then at comma-and-conjunction boundaries, before anything is given up on.
 */
const CHUNK_SOFT = 210;   /* aim for this */
const CHUNK_HARD = 300;   /* never knowingly exceed this */

/* Split on a separator, ignoring any that sits inside ( ) or [ ]. */
function splitTopLevel(text, sep) {
  const out = [];
  let depth = 0, buf = '';
  for (const ch of String(text)) {
    if (ch === '(' || ch === '[') depth += 1;
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
    if (ch === sep && depth === 0) { out.push(buf); buf = ''; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf);
  return out.map((x) => x.trim()).filter(Boolean);
}

function splitLong(piece) {
  if (piece.length <= CHUNK_HARD) return [piece];
  /*
   * Semicolons first: they are the author's own clause boundaries. But only at
   * bracket depth zero -- "hypo- (below; also deficient)" carries a semicolon
   * inside the parenthesis, and splitting there tore a definition in half and
   * left the following chunk starting with "also deficient)".
   */
  let parts = splitTopLevel(piece, ';');
  if (parts.length === 1) parts = piece.split(/,\s+(?=and\b|or\b|then\b|while\b|whereas\b|but\b)/i).filter(Boolean);
  if (parts.length === 1) return [piece];
  const out = [];
  let buf = '';
  for (let i = 0; i < parts.length; i += 1) {
    const bit = parts[i].trim() + (i < parts.length - 1 && !/[.!?]$/.test(parts[i].trim()) ? ';' : '');
    const joined = buf ? buf + ' ' + bit : bit;
    if (buf && joined.length > CHUNK_SOFT) { out.push(buf); buf = bit; } else buf = joined;
  }
  if (buf) { if (out.length && buf.length < 50) out[out.length - 1] += ' ' + buf; else out.push(buf); }
  return out.flatMap((x) => (x.length > CHUNK_HARD && x !== piece ? splitLong(x) : [x]));
}

function chunkText(text) {
  const sentences = String(text || '').match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [];
  const out = [];
  let buf = '';
  for (const raw of sentences) {
    const sen = raw.trim();
    if (!sen) continue;
    const joined = buf ? buf + ' ' + sen : sen;
    if (buf && (joined.length > CHUNK_SOFT || (buf.match(/[.!?]/g) || []).length >= 2)) { out.push(buf); buf = sen; }
    else buf = joined;
  }
  if (buf) {
    if (out.length && buf.length < 60) out[out.length - 1] += ' ' + buf;
    else out.push(buf);
  }
  const sized = out.flatMap(splitLong);
  return sized.length ? sized : [String(text || '')];
}

/*
 * "epi- (above, upon), hypo- (below; also deficient), inter- (between)" is a
 * table that happens to have been typed as a sentence. Three or more of those
 * pairs and it is rendered as one: the lead-in stays prose, the pairs become
 * cards, and each term is tappable like any other.
 */
/* The leading hyphen is part of the term: -graphy, not graphy. */
const PAIR_RE = /(-?[A-Za-z][A-Za-z\/-]{1,18})\s+\(([^()]{2,60})\)/g;

function asPairs(chunk) {
  const pairs = [...chunk.matchAll(PAIR_RE)];
  if (pairs.length < 3) return null;
  /* only when the pairs really are most of the chunk, not an aside in prose */
  const covered = pairs.reduce((a, m) => a + m[0].length, 0);
  if (covered / chunk.length < 0.45) return null;
  const lead = chunk.slice(0, pairs[0].index).replace(/[\s,;:]+$/, '');
  return { lead, pairs: pairs.map((m) => ({ term: m[1], gloss: m[2] })) };
}

function pairsHTML(block) {
  const cells = block.pairs.map((p) => {
    const hit = lookupTerm(p.term);
    const tag = hit ? 'button' : 'span';
    const attrs = hit ? ` type="button" data-term="${esc(p.term)}"` : '';
    return `<${tag} class="gt"${attrs}><b>${esc(p.term)}</b><span>${esc(p.gloss)}</span></${tag}>`;
  }).join('');
  return `${block.lead ? `<div class="chunklead">${glossify(esc(block.lead))}</div>` : ''}<div class="termgrid">${cells}</div>`;
}

function listHTML(chunk) {
  const bits = splitTopLevel(chunk, ';');
  if (bits.length < 3) return null;
  const lead = /:\s*$/.test(bits[0]) ? bits.shift() : '';
  return `${lead ? `<div class="chunklead">${glossify(esc(lead))}</div>` : ''}<ul class="chunklist">${bits.map((b) => `<li>${glossify(esc(b))}</li>`).join('')}</ul>`;
}

function proseHTML(text) {
  const chunks = chunkText(text);
  const body = chunks.map((c) => {
    const pairs = asPairs(c);
    if (pairs) return `<li>${pairsHTML(pairs)}</li>`;
    if (c.length > CHUNK_SOFT) {
      const list = listHTML(c);
      if (list) return `<li>${list}</li>`;
    }
    return `<li>${glossify(esc(c))}</li>`;
  }).join('');
  return `<ol class="chunks">${body}</ol>`;
}

/* Delegated: the chips are rebuilt on every render, so binding per chip would leak. */
function wireTerms(root) {
  (root || document).querySelectorAll('[data-term]').forEach((b) => { b.onclick = () => openTermDialog(b.dataset.term); });
}

/* Parse a curated `from` string — "Built out of: a-, near + b/o, thing" — into
   the shape decompose() returns, so one renderer draws both kinds of breakdown. */
function fromSplit(fromStr) {
  if (!fromStr) return null;
  const body = String(fromStr).replace(/^\s*Built out of:\s*/i, '').trim();
  if (!body) return null;
  const parts = body.split(/\s*\+\s*/).map((seg) => {
    const s = seg.trim();
    const ci = s.indexOf(',');
    const text = (ci === -1 ? s : s.slice(0, ci)).trim();
    const means = ci === -1 ? '' : s.slice(ci + 1).trim();
    const kind = /^-/.test(text) ? 'suffix' : /-$/.test(text) ? 'prefix' : 'root';
    return { text, kind, means };
  }).filter((p) => p.text);
  return parts.length ? { parts } : null;
}

function partsHTML(split) {
  if (!split || !split.parts || !split.parts.length) return '';
  const cells = split.parts.map((p) => {
    const cls = p.kind === 'link' ? 'link' : p.kind === 'ending' ? 'ending' : p.kind;
    return `<span class="termpart ${esc(cls)}"><b>${esc(p.text)}</b><span>${esc(p.means || '')}</span></span>`;
  });
  const reads = split.parts
    .filter((p) => p.kind !== 'link' && p.kind !== 'ending')
    .map((p) => (p.means || '').split(',')[0].trim())
    .filter(Boolean).join(' + ');
  return `<div class="subhead">Built out of</div>
    <div class="termparts">${cells.join('<span class="termplus">+</span>')}</div>
    ${reads ? `<p class="small" style="margin-top:9px">Reads as: <strong>${esc(reads)}</strong></p>` : ''}`;
}

/*
 * The dialog leads with what the word MEANS, in English and in Chinese.
 *
 * It used to lead with the breakdown and then spend two notice boxes saying
 * where the breakdown came from, which is the one thing nobody taps a word to
 * find out. Being told that radioulnar is radi/o + ulnar does not tell you it
 * names the joints the forearm rotates about, and it certainly does not tell
 * you it is 橈尺的 — the name a good deal of this material is already filed
 * under for anyone who met the anatomy in Chinese first.
 *
 * So: meaning first, Chinese with it, then how to say it, then the parts — and
 * no provenance notices anywhere. The part lists are definition_wordparts.pdf
 * material and speak for themselves; the rest reads as the study help it is.
 */
function openTermDialog(word) {
  const hit = lookupTerm(word);
  if (!hit) return;
  const { note, split, part, gloss } = hit;
  /* note.plain is written for this exact word, so it wins over the glossary's
     line where both exist. The Chinese only ever comes from the glossary. */
  const plain = (note && note.plain) || (gloss && gloss.meaning) || '';
  const zh = gloss ? gloss.zh : '';
  /* On a bare word part the chip below already carries the sourced meaning, and
     'upon, above' over 'above, upon' is not worth two lines. Same words in a
     different order: show the Chinese on its own and let the chip say it once. */
  const words = (t) => String(t).toLowerCase().split(/[^a-z]+/).filter(Boolean).sort().join(' ');
  const meaning = (part && !split && words(part.means) === words(plain)) ? '' : plain;
  /* When the fold or an alias resolved this word to its noun — pericardial ->
     pericardium, thoracic -> thorax — name that base form so the connection
     between the adjective and the noun is made instead of silently assumed. */
  const canon = gloss && gloss.key !== word.toLowerCase() ? gloss.key : null;
  /* One breakdown per term. A curated `from` is the hand-checked reading, so it
     is preferred over decompose()'s automatic split where a word has both
     (glomerulus has only a `from`; vestibulocochlear used to show both). */
  const breakdown = fromSplit(note && note.from) || split;
  $$('termTitle').textContent = word;
  $$('termBody').innerHTML = `
    ${canon ? `<p class="small" style="margin:0 0 10px;color:var(--muted)">Base form: <strong style="color:var(--ink)">${esc(canon)}</strong></p>` : ''}
    ${(meaning || zh) ? `<div class="meaning">
      ${meaning ? `<p class="en">${esc(meaning)}</p>` : ''}
      ${zh ? `<p class="zh" lang="zh-Hant">${esc(zh)}</p>` : ''}
    </div>` : ''}
    ${note ? `<div class="subhead">Say it</div><p class="say">${esc(note.say)}</p>` : ''}
    ${part && !split ? `<div class="subhead">Word part</div>
      <div class="termparts"><span class="termpart ${esc(part.kind)}"><b>${esc(part.forms)}</b><span>${esc(part.means)}</span></span></div>
      <p class="small" style="margin-top:9px">${part.kind === 'root'
        ? 'A root — the part carrying the meaning. The /o on the end is the vowel that joins it to whatever follows.'
        : esc('A ' + part.kind + ' — it does not stand alone, it attaches to a root.')}</p>` : ''}
    ${partsHTML(breakdown)}`;
  openDialog($$('termDialog'));
}

/*
 * The plate sits under the teaching, not over it. It is an illustration from
 * 1918, and the credit line saying so is part of the picture rather than a
 * footnote -- the same rule the rest of the app follows about where a thing
 * came from.
 */
function plateHTML(item) {
  const pl = plateFor(item);
  if (!pl) return '';
  return `<figure class="plate">
    <img src="${esc(pl.src)}" alt="${esc(pl.title)}" loading="lazy">
    <figcaption>${pl.intro ? `<p class="figintro">${glossify(esc(pl.intro))}</p>` : ''}<strong>${esc(pl.title)}</strong><br>${esc(pl.caption)}
      <span class="credit">${esc(pl.work)} \u00b7 <span class="pd">${esc(pl.licence)}</span> \u00b7 via ${esc(pl.via)}</span>
      <span class="credit">${esc(pl.note)}</span>
      ${figureKeyHTML(pl)}
    </figcaption>
  </figure>`;
}

/* ------------------------------------------------------------------ *
 * Layout figures
 *
 * The replacement for the hand-plotted SVG layouts. Cards size themselves to
 * their text, so the overflow that was measured at up to 15.4px is not a bug
 * that got fixed -- it is a bug that can no longer be expressed.
 * ------------------------------------------------------------------ */

const LAY_TONE = { teal: 'var(--teal)', orange: 'var(--orange)', blue: 'var(--blue)',
  red: 'var(--red)', green: 'var(--green)', dim: 'var(--dim)' };

function layCard(c) {
  const tone = LAY_TONE[c.tone] || LAY_TONE.teal;
  return `<div class="lay-card" style="--tone:${tone}"><b>${glossify(esc(c.t))}</b>${
    c.b ? `<span>${glossify(esc(c.b))}</span>` : ''}</div>`;
}

function layBlock(b) {
  switch (b.type) {
    case 'heading':
      return `<div class="lay-h">${esc(b.text)}</div>`;
    case 'row':
      return `<div class="lay-row${b.dense ? ' dense' : ''}">${b.cards.map(layCard).join('')}</div>`;
    case 'stack':
      return `<div class="lay-stack">${b.cards.map(layCard).join('')}</div>`;
    case 'flow':
      return `<div class="lay-flow">${b.cards.map(layCard).join('<span class="lay-arrow">\u2192</span>')}</div>`;
    case 'terms':
      return `<div class="termgrid">${b.pairs.map(([term, gloss]) => {
        const hit = lookupTerm(term);
        const tag = hit ? 'button' : 'span';
        const attrs = hit ? ` type="button" data-term="${esc(term)}"` : '';
        return `<${tag} class="gt"${attrs}><b>${esc(term)}</b><span>${esc(gloss)}</span></${tag}>`;
      }).join('')}</div>`;
    case 'scale':
      return `<div><div class="lay-scale"><span class="end">${esc(b.from)}</span><span class="bar"></span><span class="end">${esc(b.to)}</span></div>${
        b.note ? `<div class="lay-note dim" style="margin-top:7px">${glossify(esc(b.note))}</div>` : ''}</div>`;
    case 'note':
    default:
      return `<div class="lay-note${b.dim ? ' dim' : ''}${b.tone ? ' tone' : ''}">${glossify(esc(b.text))}</div>`;
  }
}

function layoutHTML(id, sc) {
  const lay = layoutFor(id);
  if (!lay) return '';
  return `<figure class="lessonvis" data-kind="layout">
    <div class="lessonvis-head"><span class="lessonvis-kick">Drawn by this app</span><span class="lessonvis-title">${esc(sc.title)}</span></div>
    <div class="lay">${lay.blocks.map(layBlock).join('')}</div>
    <figcaption class="lessonvis-cap">${esc(sc.caption)}
      <span class="figcredit">A layout, not a depiction \u2014 no anatomy is being drawn to scale here.</span>
    </figcaption>
  </figure>`;
}

/* Where in the HSS2011 course this lesson sits — app-authored framing, not a source claim. */
function moduleLine(item) {
  const m = moduleInfo(item);
  if (!m) return '';
  return `<div class="moduleline"><span class="apptag">App note</span>From <strong>Module ${m.n}</strong> · ${esc(m.name)} — ${esc(m.plain)}</div>`;
}

/* App-authored plain-English lead — a hook for dense lessons so the sourced
   explanation below has something to hang on. Tagged; not a source claim.
   Glossified like key facts so the hard words stay tappable here too. */
function plainLeadHTML(item) {
  const p = item.lesson && item.lesson.plain;
  if (!p) return '';
  return `<div class="plainlead"><span class="apptag">App note</span> ${glossify(esc(p))}</div>`;
}

/*
 * Key-facts block. Structure-set lessons carry a grouped form — an app-authored
 * hook with the organising idea (tagged APP NOTE, a study device not a source
 * claim), then the members under the group headings that already exist in the
 * data. Every other lesson renders the flat list unchanged. Member strings stay
 * glossified either way so the hard words remain tappable.
 */
function factsHTML(item) {
  const lesson = item.lesson || {};
  const groups = lesson.keyFactsGroups;
  if (groups && groups.length) {
    const hook = lesson.hook
      ? `<div class="hook"><span class="apptag">App note</span> The idea to hang it on: ${glossify(esc(lesson.hook))}</div>`
      : '';
    const blocks = groups.map((bucket) => `<div class="factgroup"><div class="factgroup-head">${esc(bucket.group)}</div>`
      + `<ul class="facts">${bucket.items.map((f) => `<li>${glossify(esc(f))}</li>`).join('')}</ul></div>`).join('');
    return `${hook}<div class="subhead">Key facts to remember</div>${blocks}`;
  }
  return lesson.keyFacts && lesson.keyFacts.length
    ? `<div class="subhead">Key facts to remember</div><ul class="facts">${lesson.keyFacts.map((f) => `<li>${glossify(esc(f))}</li>`).join('')}</ul>` : '';
}

function learnHTML(item) {
  const subject = getSubject(item.subject);
  const prior = priorOf(item);
  const facts = factsHTML(item);
  const examples = item.lesson.examples && item.lesson.examples.length
    ? `<div class="subhead">Examples</div><ul class="facts">${item.lesson.examples.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : '';
  const teaching = prior
    ? `${plainLeadHTML(item)}${priorLeadHTML(item, prior)}${facts}${examples}
    <details class="priorback"><summary>${esc(prior.short)}-level background — the part you already have</summary>${proseHTML(item.lesson.explanation)}</details>`
    : `${plainLeadHTML(item)}${proseHTML(item.lesson.explanation)}${facts}${examples}`;
  /*
   * "Skills to build" — app-authored and content-anchored: each entry names a
   * concrete thing to be able to DO with this item's own facts (draw it, run a
   * decision test, recite in order), never generic how-to-study advice. Tagged
   * App note because the skill framing is study scaffolding, even though every
   * fact it points at is source-traced on this card.
   */
  const skillsBlock = item.skills && item.skills.length
    ? `<div class="subhead">Skills to build with this content</div><ul class="facts">${item.skills.map((s) => `<li>${glossify(esc(s))}</li>`).join('')}</ul><p class="small" style="color:var(--muted);margin-top:8px"><span class="apptag">App note</span> Written by this app from the content above. The facts are the sourced ones; the skill framing is study scaffolding.</p>`
    : '';
  return `<div class="lesson">
    <div class="eyebrow" style="color:${subject ? subject.accent : 'var(--teal)'}">${esc(subject ? subject.code : item.subject)} · ${esc(typeLabel(item.type))}</div>
    ${moduleLine(item)}
    <h2>${esc(item.title)}</h2>
    ${visualSlotHTML(item)}
    ${teaching}
    ${skillsBlock}
    ${item.lesson.studyNote ? `<div class="notice"><strong>Radiography study note — written by this app</strong>${esc(item.lesson.studyNote)}<p>This framing is not a claim from the supplied sources. The anatomy above is; this sentence is study scaffolding.</p></div>` : ''}
    ${plateHTML(item)}
    ${item.tags && item.tags.length ? `<div class="tagrow">${item.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
    <div class="rss-actions"><button class="primary" data-nav="remember">Give me the memory aids →</button><button class="ghost" data-nav="practise">Skip to practice</button></div>
  </div>`;
}

/*
 * The nine structure-set items carry no memory aids, so the first two stages
 * used to fall back on filler -- "Attach the fact to something you already know
 * well" is not a hint, it is a sentence shaped like one. They do carry
 * something better: each member has its own note off the lecture, and the
 * members are grouped. Those make an actual clue.
 */
function setHint(item, wantGroups) {
  const set = item.structureSet && structureSet(item.structureSet);
  if (!set) return null;
  const members = set.members || [];
  if (wantGroups) {
    const groups = [...new Set(members.map((m) => m.group).filter(Boolean))];
    if (groups.length > 1) return `${members.length} structures in ${groups.length} groups: ${groups.join(', ')}. Name the group first, then place the members inside it.`;
    if (members.length) return `${members.length} structures to name. Work round them in a fixed order every time, so the order itself becomes the cue.`;
    return null;
  }
  const withNote = members.filter((m) => m.note);
  if (!withNote.length) return null;
  const m = withNote[0];
  return `One to start you off — ${m.label}: ${m.note}`;
}

/*
 * A hint built from the word itself, for items whose memory aids run out.
 *
 * The app already carries an 814-stem word-part list; on an item called
 * "Radioulnar joints" that is a real clue -- radi/o + ulnar, so the name is
 * telling you which two bones -- and it beats the filler line that used to sit
 * here by a distance.
 */
function originHint(item) {
  const words = String(item.title || '').split(/[^A-Za-z]+/).filter((w) => w.length >= 8);
  for (const w of words) {
    const d = decompose(w);
    if (d) return `The name is doing the work: ${w.toLowerCase()} reads as ${readingOf(d)}.`;
  }
  return null;
}

/*
 * The stages are resolved together rather than independently: each one takes
 * the first of its candidates that no earlier stage has already claimed, so a
 * hint is never shown twice inside one ladder.
 */
const REVEAL_STAGES = [
  { lab: 'Stage 1 — small clue',
    candidates: (item) => [
      { k: 'chunking', v: item.memory.chunking }, { k: 'wordOrigin', v: item.memory.wordOrigin },
      { k: 'location', v: item.memory.location }, { k: 'comparison', v: item.memory.comparison },
      { v: setHint(item, true) },
      { k: 'mnemonic', v: item.memory.mnemonic }, { k: 'firstLetter', v: item.memory.firstLetter },
      { k: 'visualCue', v: item.memory.visualCue }, { k: 'sequence', v: item.memory.sequence },
      { k: 'teachBack', v: item.memory.teachBack }, { v: originHint(item) },
    ],
    fallback: 'Start from the title and ask what category the answer belongs to.' },
  { lab: 'Stage 2 — memory hook',
    candidates: (item) => [
      { v: item.lesson.hook },
      { k: 'mnemonic', v: item.memory.mnemonic }, { k: 'firstLetter', v: item.memory.firstLetter },
      { k: 'visualCue', v: item.memory.visualCue }, { k: 'sequence', v: item.memory.sequence },
      { k: 'chunking', v: item.memory.chunking }, { v: setHint(item, false) }, { v: originHint(item) },
      { k: 'comparison', v: item.memory.comparison }, { k: 'wordOrigin', v: item.memory.wordOrigin },
      { k: 'location', v: item.memory.location }, { k: 'teachBack', v: item.memory.teachBack },
    ],
    fallback: 'Attach the fact to something you already know well.' },
  { lab: 'Stage 3 — before you move on',
    candidates: (item) => (item.commonMistakes || []).map((m) => ({ v: `Watch out: ${m}` })),
    fallback: 'Try to answer out loud before revealing anything. Producing the answer is the skill the exam tests — recognising it is not the same skill.' },
];

/*
 * Stage 3 is content-anchored, not generic: it shows this item's own common
 * confusions (authored in the corpus) as the trap to avoid, and only falls
 * back to a plain retrieval instruction when the item has none.
 */

const sameText = (a, b) => String(a).trim().toLowerCase().replace(/\s+/g, ' ') === String(b).trim().toLowerCase().replace(/\s+/g, ' ');

function stageTexts(item) {
  const out = new Array(REVEAL_STAGES.length).fill('');
  const usedKeys = new Set();
  const used = [];
  const claim = (i, cand) => {
    if (!cand || !cand.v || used.some((u) => sameText(u, cand.v))) return false;
    out[i] = cand.v;
    if (cand.k) usedKeys.add(cand.k);
    used.push(cand.v);
    return true;
  };
  REVEAL_STAGES.forEach((s, i) => {
    if (!s.candidates(item).some((c) => claim(i, c))) {
      out[i] = (typeof s.fallback === 'function' ? s.fallback(item) : s.fallback) || '';
    }
  });
  return { texts: out, usedKeys, used };
}

function rememberHTML(item) {
  const hooks = Object.entries(item.memory || {}).filter(([, v]) => v);
  const { texts, usedKeys, used } = stageTexts(item);
  const stack = REVEAL_STAGES.map((s, i) =>
    `<div class="reveal ${i < ui.session.reveal ? 'open' : ''}" data-stage="${i}">
      <div class="lab">${esc(s.lab)}</div>
      <div class="txt">${i < ui.session.reveal ? glossify(esc(texts[i]))
        : '<em style="color:var(--muted)">Hidden — reveal only if you need it. Trying to retrieve first is what makes it stick.</em>'}</div>
    </div>`).join('');
  /*
   * The coach does not list every memory aid underneath the ladder any more —
   * that list repeated the very texts the stages reveal. Once the ladder is
   * fully open, only the hooks the stages did not already show appear here.
   * Hooks-only mode has no ladder, so it keeps the full list.
   */
  const moreHooks = ui.session.reveal >= REVEAL_STAGES.length
    ? hooks.filter(([k, v]) => v && !usedKeys.has(k) && !used.some((u) => sameText(u, v)))
    : [];
  const hooksList = (list) => `${list.map(([k, v]) => `<div class="hookcard"><div class="kind">${esc(MEMORY_METHODS[k] || k)}</div><div class="txt">${esc(v)}</div></div>`).join('')}
      <p class="small" style="color:var(--muted);margin-top:10px">Memory aids are written by this app. The facts they point at are the source-traced ones on the Learn card.</p>`;
  return `<div class="lesson">
    <div class="eyebrow">Memory Coach</div>
    <h2>${esc(item.title)}</h2>
    <p class="task-copy">${ui.session.hooksOnly ? 'Browsing memory hooks — nothing is scored in this mode.' : 'Hints come one stage at a time. Try to answer before opening the next one.'}</p>
    ${ui.session.hooksOnly ? '' : `<div class="reveal-stack">${stack}</div>`}
    <div class="rss-actions">
      ${ui.session.hooksOnly ? '' : `<button class="ghost" id="rssRevealBtn">${ui.session.reveal >= REVEAL_STAGES.length ? 'All hints shown' : 'Reveal next hint'}</button>`}
      ${ui.session.hooksOnly
        ? (ui.session.index >= ui.session.items.length - 1 ? '<button class="primary" id="rssFinish">Finish</button>' : '<button class="primary" id="rssNextItem">Next hook →</button>')
        : '<button class="primary" data-nav="practise">Test me →</button>'}
    </div>
    ${item.selfCheck ? `<div class="subhead" style="margin-top:14px">Prove it to yourself</div>
      <div class="hookcard"><div class="kind">Blank-page check · <span class="apptag">App note</span></div><div class="txt">${glossify(esc(item.selfCheck))}</div></div>` : ''}
    ${ui.session.hooksOnly
      ? (hooks.length ? `<div class="subhead">All memory aids for this item</div>${hooksList(hooks)}` : '<div class="emptybox" style="margin-top:14px">No memory aid authored for this item yet.</div>')
      : (moreHooks.length ? `<div class="subhead" style="margin-top:14px">More hooks for this item</div>${hooksList(moreHooks)}` : '')}
  </div>`;
}

function wireReveal(item) {
  wireTerms($$('rssStage'));
  const b = $$('rssRevealBtn');
  if (!b) return;
  b.disabled = ui.session.reveal >= REVEAL_STAGES.length;
  b.onclick = () => { ui.session.reveal = Math.min(REVEAL_STAGES.length, ui.session.reveal + 1); renderStep(); };
}

/* ---------------- question rendering ---------------- */

function questionBody(q) {
  switch (q.type) {
    case 'mcq': case 'comparison':
      return `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-opt="${i}">${esc(o)}</button>`).join('')}</div>`;
    case 'typed': case 'cloze': case 'landmark':
      return `<div class="typed-row"><input id="rssTypedInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.type === 'landmark' ? 'List the landmarks, separated by commas' : 'Type your answer'}"><button class="primary" id="rssTypedGo">Check</button></div>`;
    case 'sequence': {
      const order = ui.session.seqOrder || (ui.session.seqOrder = q.items.map((v, i) => i).sort(() => Math.random() - 0.5));
      return `<div class="seq-list" id="rssSeq">${order.map((oi, pos) => `<div class="seq-item" data-pos="${pos}"><span class="n">${pos + 1}</span><span class="grow">${esc(q.items[oi])}</span><span class="mv"><button data-up="${pos}" aria-label="Move up">↑</button><button data-down="${pos}" aria-label="Move down">↓</button></span></div>`).join('')}</div>
        <button class="primary" id="rssSeqGo">Check order</button>`;
    }
    case 'matching': {
      const rights = ui.session.matchRights || (ui.session.matchRights = q.pairs.map((p) => p[1]).sort(() => Math.random() - 0.5));
      return `<div class="match-grid" id="rssMatch">${q.pairs.map((p, i) => `<div class="match-row" data-row="${i}"><span class="lhs">${esc(p[0])}</span><select data-sel="${i}"><option value="">Choose…</option>${rights.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join('')}</select></div>`).join('')}</div>
        <button class="primary" id="rssMatchGo" style="margin-top:10px">Check matches</button>`;
    }
    case 'diagram': {
      const d = DIAGRAMS[q.diagram];
      if (!d) return '<div class="emptybox">Diagram unavailable.</div>';
      const target = ui.session.diagramTarget ?? (ui.session.diagramTarget = Math.floor(Math.random() * q.labels.length));
      /*
       * Blank mode: labelled teaches, guided leaves a couple of anchors in,
       * blank tests. Defaults to blank so the question stays a question —
       * the learner opens the labelled view deliberately.
       */
      const reveal = ui.session.diagramReveal || (ui.session.diagramReveal = 'blank');
      const anchorCount = Math.max(1, Math.round(q.labels.length / 4));
      const named = (l, i) => reveal === 'labelled' || (reveal === 'guided' && i < anchorCount);
      const hotspots = q.labels.map((l, i) => {
        const pt = d.labels[l.id];
        if (!pt) return '';
        const text = named(l, i)
          ? `<text x="${pt[0] + 17}" y="${pt[1] + 4}" class="dlab">${esc(l.label)}</text>`
          : '';
        return `<circle class="hot" data-hot="${esc(l.id)}" cx="${pt[0]}" cy="${pt[1]}" r="13"></circle>${text}`;
      }).join('');
      const modeBtns = REVEAL_MODES.map((r) =>
        `<button class="conf ${reveal === r.id ? 'on' : ''}" data-reveal="${r.id}" title="${esc(r.hint)}">${esc(r.label)}</button>`).join('');
      return `<div class="conf-row" style="margin:0 0 10px"><span class="lab">View</span>${modeBtns}</div>
      <div class="diagram-wrap"><svg viewBox="${d.viewBox}" role="img" aria-label="${esc(d.title)}">
        ${d.shapes.map((s) => s.kind === 'ellipse' ? `<ellipse class="sk" cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}"/>`
          : s.kind === 'circle' ? `<circle class="sk" cx="${s.cx}" cy="${s.cy}" r="${s.r}" ${s.faint ? 'opacity=".4"' : ''}/>`
          : `<path class="sk" d="${s.d}"/>`).join('')}
        ${hotspots}
      </svg><p class="small" style="text-align:center;color:var(--muted);margin:8px 0 0">${esc(d.caption)}</p></div>
      <div class="q-prompt" style="font-size:15px">Click the hotspot for: <strong>${esc(q.labels[target].label)}</strong></div>`;
    }
    case 'movement': {
      const mv = jointMovement(q.movementId);
      if (!mv) return '<div class="emptybox">Movement unavailable.</div>';
      return `<div class="notice" style="margin-top:0"><strong>${esc(mv.joint)}</strong>${esc(mv.summary)}</div>
      <div class="mv-panel">
        <div class="mv-meta">
          <span><b>Range:</b> ${mv.range[0]}° to ${mv.range[1]}° — ${esc(mv.labels.min)} through ${esc(mv.labels.max)}</span>
          <span><b>Moves:</b> ${esc(mv.moves.slice(0,3).join(', '))}${mv.moves.length>3?` +${mv.moves.length-3} more`:''}</span>
          <span><b>Held still:</b> ${esc(mv.fixed.join(', '))}</span>
        </div>
        ${(mv.stages||[]).length?`<ul class="facts" style="margin-top:10px">${mv.stages.map(s=>`<li><strong>${s.at}°</strong> — ${esc(s.note)}</li>`).join('')}</ul>`:''}
        <p class="small" style="color:var(--muted);margin:11px 0 0">The controls live with the model — the render loop only runs while the studio is on screen, so a slider here would move bones you cannot see.</p>
      </div>
      <div class="rss-actions">
        <button class="primary" id="mvStudio">Open the studio and drive it →</button>
        <button class="ghost" id="mvDone">I can see how it moves</button>
        <button class="ghost" id="mvFail">I could not follow it</button>
      </div>`;
    }
    case 'structure': {
      const set = structureSet(q.setId);
      if (!set) return '<div class="emptybox">Structure set unavailable.</div>';
      const reveal = q.reveal || 'blank';
      const groups = [...new Set(set.members.map((mem) => mem.group))];
      const isNamed = (mem) => reveal === 'labelled' || (reveal === 'guided' && set.anchors.includes(mem.id));
      const rows = groups.map((g) => {
        const inGroup = set.members.filter((mem) => mem.group === g);
        return `<div class="subhead" style="margin:12px 0 6px">${esc(g)}</div>
          <div class="struct-grid">${inGroup.map((mem) => `
            <button class="struct" data-struct="${esc(mem.id)}" data-mesh="${esc(mem.mesh)}">
              <span class="n">${mem.order}</span>
              <span class="grow">${isNamed(mem) ? esc(mem.label) : '<em style="color:var(--muted)">tap to reveal</em>'}
                ${isNamed(mem) && mem.note ? `<small>${esc(mem.note)}</small>` : ''}</span>
              <span class="go">3D</span>
            </button>`).join('')}</div>`;
      }).join('');
      return `<div class="notice" style="margin-top:0"><strong>${esc(REVEAL_MODES.find((r) => r.id === reveal).label)} view</strong>${esc(REVEAL_MODES.find((r) => r.id === reveal).hint)}
        ${set.paired ? ' These are paired — the side is part of the answer.' : ''}</div>
      <div id="rssStructList">${rows}</div>
      <div class="rss-actions">
        <button class="ghost" id="rssStructStudio">Open the 3D studio</button>
        <button class="primary" id="rssStructDone">I identified them all</button>
        <button class="ghost" id="rssStructFail">I could not</button>
      </div>`;
    }
    case 'id3d': case 'laterality':
      return `<div class="notice"><strong>This one is best answered on the 3D skeleton</strong>Open the Osteology studio to find it on the model. If 3D is unavailable, answer from the landmark list instead — the explanation below covers both routes.</div>
        <div class="opts"><button class="opt" data-opt="0">I found it / I know where it is</button><button class="opt" data-opt="1">I could not place it</button></div>
        <div class="rss-actions"><button class="ghost" id="rssGoStudio">Open the 3D studio</button></div>`;
    case 'explain': case 'scenario':
      return `<div class="typed-row"><input id="rssTypedInput" autocomplete="off" placeholder="Answer in your own words, then check against the model answer"></div>
        <button class="primary" id="rssSelfGo" style="margin-top:9px">Show the model answer</button>`;
    default:
      return '<div class="emptybox">This question type is not renderable.</div>';
  }
}

function practiseHTML(item) {
  const qs = questionsOf(item);
  if (!qs.length) return '<div class="emptybox">No practice questions on this item.</div>';
  const q = qs[Math.min(ui.session.qIndex, qs.length - 1)];
  ui.session.currentQ = q;
  /*
   * A prior-knowledge item with nothing recorded against it yet opened straight
   * onto this step. Say so, rather than leaving it looking like the lesson was
   * lost, and keep the lesson one click away for when the answer does not come.
   */
  const prior = priorOf(item);
  const verifying = prior && !itemAttempted(item.id)
    ? `<div class="priorbar"><div class="txt"><span class="kick">Verifying, not teaching</span>${esc(prior.label)} already covered this, so the ui.session opens on the question.<p>Nothing is assumed about your answer — this is the first thing recorded for the item.</p></div><button class="ghost" id="rssPriorLesson">Show the lesson first</button></div>`
    : '';
  return `<div class="lesson">
    ${verifying}
    <div class="eyebrow">Practise · ${esc(typeLabel(q.type))} · question ${Math.min(ui.session.qIndex, qs.length - 1) + 1} of ${qs.length}</div>
    <div class="q-prompt">${glossify(esc(q.prompt))}</div>
    ${q.image ? `<img class="xray-img" src="assets/xray/${esc(q.image)}" alt="Radiograph" onerror="xrayFallback(this)">` : ''}
    <div id="rssQBody">${questionBody(q)}</div>
    <div id="rssVerdict"></div>
    <div class="rss-actions" id="rssPractiseNav"></div>
  </div>`;
}

function normalise(s) {
  return String(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9;,\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function looseMatch(given, accepted) {
  const g = normalise(given);
  if (!g) return false;
  return accepted.some((a) => {
    const n = normalise(a);
    if (g === n) return true;
    /* multi-part answers: accept the same set of parts in any order */
    const gp = g.split(/[;,]\s*|\s+and\s+/).map((x) => x.trim()).filter(Boolean).sort();
    const np = n.split(/[;,]\s*|\s+and\s+/).map((x) => x.trim()).filter(Boolean).sort();
    if (np.length > 1 && gp.length === np.length && gp.every((x, i) => x === np[i])) return true;
    return false;
  });
}
function spellingNear(given, accepted) {
  const g = normalise(given);
  return accepted.some((a) => {
    const n = normalise(a);
    if (Math.abs(g.length - n.length) > 3) return false;
    let d = 0, i = 0, j = 0;
    while (i < g.length && j < n.length) {
      if (g[i] === n[j]) { i++; j++; continue; }
      d++; if (d > 2) return false;
      if (g.length > n.length) i++; else if (n.length > g.length) j++; else { i++; j++; }
    }
    return d + (g.length - i) + (n.length - j) <= 2;
  });
}

function verdictHTML(item, q, correct, extra) {
  const rationale = q.explanation || q.model || '';
  const srcBtn = q.src ? ` <button class="srcbtn" id="rssQSrc">Source for this answer</button>` : '';
  return `<div class="verdict ${correct ? 'ok' : 'no'}">
    <h4>${correct ? 'Correct' : 'Not right — here is why'}</h4>
    <div class="why">${glossify(esc(rationale))}${extra ? ' ' + extra : ''}</div>
    ${!correct && item.commonMistakes && item.commonMistakes.length ? `<ul class="mistakes">${item.commonMistakes.map((m) => `<li>${glossify(esc(m))}</li>`).join('')}</ul>` : ''}
    <div class="srcline"><span>Traced to ${esc(item.sourceRefs.map((r) => describeSource(r).file).join(', '))}</span><button class="srcbtn" id="rssVSrc">Open source dialog</button>${srcBtn}</div>
  </div>`;
}

function finishQuestion(item, q, correct, extra, conf = 2) {
  if (ui.session.answered) return;
  ui.session.answered = true;
  /* Read before scheduling: the first answer is what flips itemAttempted. */
  const untestedPrior = !!priorOf(item) && !itemAttempted(item.id);
  const ms = Math.max(400, performance.now() - ui.session.startedAt);
  const dim = dimensionFor(q);

  const priorRec = getMastery(item.id, dim);
  const rec = schedule(priorRec, { correct, confidence: conf, ms, expectedMs: q.type === 'explain' || q.type === 'scenario' ? 45000 : 14000 });
  setMastery(item.id, dim, rec);
  /*
   * Delayed recall is scored only when this is the first attempt after a real
   * gap — checked against the record as it stood before this attempt. Getting
   * it right three times in one sitting says nothing about surviving a night.
   */
  if (isDelayedAttempt(priorRec)) {
    const delayedRec = schedule(getMastery(item.id, 'delayedRecall'), { correct, confidence: conf, ms, expectedMs: 20000 });
    setMastery(item.id, 'delayedRecall', delayedRec);
  }
  if ((q.type === 'typed' || q.type === 'cloze' || q.type === 'landmark')) {
    const spellRec = schedule(getMastery(item.id, 'spelling'), { correct: correct && !extra, confidence: conf, ms, expectedMs: 14000 });
    setMastery(item.id, 'spelling', spellRec);
  }
  store.items[item.id] = { ...(store.items[item.id] || {}), status: correct ? 'review' : 'learning', seen: (store.items[item.id]?.seen || 0) + 1, lastSeen: Date.now() };
  write(K.items, store.items);
  if (!correct) logMistake({ itemId: item.id, qid: q.qid, type: q.type, prompt: q.prompt });
  ui.session.results.push({ itemId: item.id, qid: q.qid, correct, ms });

  $$('rssVerdict').innerHTML = verdictHTML(item, q, correct, extra);
  wireTerms($$('rssVerdict'));
  const vs = $$('rssVSrc'); if (vs) vs.onclick = () => openSourceDialog(item);
  const qs2 = $$('rssQSrc'); if (qs2) qs2.onclick = () => openSourceDialog(item, q);

  const qs = questionsOf(item);
  const nav = $$('rssPractiseNav');
  nav.innerHTML = ui.session.qIndex < qs.length - 1
    ? '<button class="primary" id="rssNextQ">Next question →</button><button class="ghost" data-nav="apply">Go to apply</button>'
    : '<button class="primary" data-nav="apply">Apply it →</button>';
  if (untestedPrior && !correct) {
    /* The assumption that this was already known has just failed, so put the
       lesson back in front of the one item that turned out to need it. */
    nav.insertAdjacentHTML('afterbegin', '<button class="ghost" id="rssPriorLesson">Read the lesson</button>');
    const pl = $$('rssPriorLesson');
    if (pl) pl.onclick = () => setStep('learn');
    toast('Carried over as known, but missed — worth reading the lesson on this one.');
  }
  const nq = $$('rssNextQ');
  if (nq) nq.onclick = () => { ui.session.qIndex += 1; ui.session.answered = false; ui.session.seqOrder = null; ui.session.matchRights = null; ui.session.diagramTarget = null; ui.session.diagramReveal = null; if (window.__osteo && window.__osteo.endMovement) { window.__osteo.endMovement(); const b=$$('mvBar'); if(b) b.classList.add('hidden'); const bk=$$('mvBackToSession'); if(bk) bk.classList.add('hidden'); } ui.session.startedAt = performance.now(); renderStep(); };
  wireStageNav(item);
}

/*
 * Route a structure to the right bundled model. The skeleton is already in the
 * scene; organ and circulatory models are fetched the first time one is asked for.
 */
/*
 * Arms the movement control bar inside the studio. The bar lives there rather
 * than on the question because the render loop only runs while the studio is
 * on screen — a slider next to the question would move bones nobody can see.
 */
function armMovementBar(mv, cameFromSession) {
  if (!window.__osteo) { toast('The 3D model is not available.'); return false; }
  window.__osteo.showSystem(null);
  const ok = window.__osteo.startMovement(mv);
  const bar = $$('mvBar');
  if (!ok) { bar.classList.add('hidden'); toast('Could not set that movement up on the model.'); return false; }

  bar.classList.remove('hidden');
  $$('mvBarTitle').textContent = mv.label;
  $$('mvBarMin').textContent = mv.labels.min;
  $$('mvBarMid').textContent = mv.labels.mid;
  $$('mvBarMax').textContent = mv.labels.max;
  const slider = $$('mvBarSlider');
  slider.min = String(mv.range[0]); slider.max = String(mv.range[1]); slider.value = String(mv.range[0]);
  slider.oninput = () => { const wanted = +slider.value; window.__osteo.setMovementAngle(wanted); };
  const play = $$('mvBarPlay');
  play.textContent = '▶ Play';
  play.onclick = () => {
    const st = window.__osteo.state.movement;
    if (!st) return;
    st.playing = !st.playing;
    play.textContent = st.playing ? '❚❚ Pause' : '▶ Play';
  };
  $$('mvBarStop').onclick = () => {
    const st = window.__osteo.state.movement;
    if (st) { st.playing = false; play.textContent = '▶ Play'; }
    window.__osteo.setMovementAngle(mv.range[0]);
  };
  const back = $$('mvBackToSession');
  back.classList.toggle('hidden', !cameFromSession);
  back.onclick = () => {
    window.__osteo.endMovement();
    bar.classList.add('hidden'); back.classList.add('hidden');
    if (ui.session) { showView('sessionView'); renderStep(); } else { renderToday(); }
  };
  return true;
}

function targetIn3D(set, member) {
  if (!window.__osteo) return;
  const modelKey = set.model || 'skeleton';
  if (modelKey === 'skeleton') { window.__osteo.showSystem(null); window.__osteo.selectMesh(member.mesh); return; }
  const model = STRUCTURE_MODELS[modelKey];
  if (!model) return;
  window.__osteo.selectInSystem(modelKey, model.file, member.mesh);
}

function wirePractise(item) {
  const q = ui.session.currentQ;
  if (!q) return;
  /* Survives renderSessionFoot, which strips [data-nav] buttons out of the card. */
  const showLesson = $$('rssPriorLesson');
  if (showLesson) showLesson.onclick = () => setStep('learn');
  if (!ui.session.startedAt) ui.session.startedAt = performance.now();

  const lockOpts = (correctIdx, chosen) => {
    document.querySelectorAll('[data-opt]').forEach((b) => {
      const i = +b.dataset.opt;
      b.disabled = true;
      if (i === correctIdx) b.classList.add('right');
      else if (i === chosen) b.classList.add('wrong');
    });
  };

  if (q.type === 'mcq' || q.type === 'comparison') {
    document.querySelectorAll('[data-opt]').forEach((b) => {
      b.onclick = () => { const i = +b.dataset.opt; lockOpts(q.answer, i); finishQuestion(item, q, i === q.answer); };
    });
  } else if (q.type === 'typed' || q.type === 'cloze' || q.type === 'landmark') {
    const input = $$('rssTypedInput'); const go = $$('rssTypedGo');
    const submit = () => {
      const val = input.value;
      if (!val.trim()) return toast('Type an answer first — a guess still teaches you more than skipping.');
      let correct = looseMatch(val, q.accept);
      let extra = '';
      if (!correct && q.type === 'landmark') {
        const parts = normalise(val).split(/[;,]/).map((x) => x.trim()).filter(Boolean);
        const hits = q.accept.filter((a) => parts.some((p) => normalise(a).includes(p) || p.includes(normalise(a))));
        if (hits.length >= Math.ceil(q.accept.length / 2)) { correct = true; extra = `You named ${hits.length} of ${q.accept.length}.`; }
      }
      if (!correct && spellingNear(val, q.accept)) { correct = true; extra = `Spelling was off — the exact form is "${esc(q.accept[0])}".`; }
      input.disabled = true; go.disabled = true;
      if (!correct) extra = `You wrote "${esc(val.trim())}". Accepted: ${q.accept.map((a) => esc(a)).join(' / ')}.`;
      finishQuestion(item, q, correct, extra);
    };
    go.onclick = submit;
    input.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
    input.focus();
  } else if (q.type === 'sequence') {
    const redraw = () => {
      const list = $$('rssSeq');
      list.innerHTML = ui.session.seqOrder.map((oi, pos) => `<div class="seq-item" data-pos="${pos}"><span class="n">${pos + 1}</span><span class="grow">${esc(q.items[oi])}</span><span class="mv"><button data-up="${pos}">↑</button><button data-down="${pos}">↓</button></span></div>`).join('');
      bindMoves();
    };
    const bindMoves = () => {
      document.querySelectorAll('[data-up]').forEach((b) => { b.onclick = () => { const p = +b.dataset.up; if (p > 0) { const a = ui.session.seqOrder; [a[p - 1], a[p]] = [a[p], a[p - 1]]; redraw(); } }; });
      document.querySelectorAll('[data-down]').forEach((b) => { b.onclick = () => { const p = +b.dataset.down; const a = ui.session.seqOrder; if (p < a.length - 1) { [a[p + 1], a[p]] = [a[p], a[p + 1]]; redraw(); } }; });
    };
    bindMoves();
    $$('rssSeqGo').onclick = () => {
      const correct = ui.session.seqOrder.every((oi, pos) => oi === pos);
      document.querySelectorAll('#rssSeq .seq-item').forEach((el, pos) => el.classList.add(ui.session.seqOrder[pos] === pos ? 'right' : 'wrong'));
      document.querySelectorAll('#rssSeq button').forEach((b) => { b.disabled = true; });
      $$('rssSeqGo').disabled = true;
      finishQuestion(item, q, correct, correct ? '' : `Correct order: ${q.items.map((x, i) => `${i + 1}. ${esc(x)}`).join(' → ')}.`);
    };
  } else if (q.type === 'matching') {
    $$('rssMatchGo').onclick = () => {
      const sels = [...document.querySelectorAll('[data-sel]')];
      if (sels.some((s) => !s.value)) return toast('Match every row before checking.');
      let allRight = true;
      sels.forEach((s) => {
        const i = +s.dataset.sel;
        const ok = s.value === q.pairs[i][1];
        if (!ok) allRight = false;
        s.closest('.match-row').classList.add(ok ? 'right' : 'wrong');
        s.disabled = true;
      });
      $$('rssMatchGo').disabled = true;
      finishQuestion(item, q, allRight, allRight ? '' : `Correct pairs: ${q.pairs.map((p) => `${esc(p[0])} → ${esc(p[1])}`).join('; ')}.`);
    };
  } else if (q.type === 'movement') {
    const mv = jointMovement(q.movementId);
    const studio = $$('mvStudio');
    if (studio) studio.onclick = () => { openViewer(); setTimeout(() => armMovementBar(mv, true), 500); };
    const finish = (correct) => {
      [$$('mvStudio'), $$('mvDone'), $$('mvFail')].forEach((b) => b && (b.disabled = true));
      finishQuestion(item, q, correct, correct ? '' : `Held still for reference: ${esc(mv.fixed.join(', '))}. Without a fixed bone there is nothing to see the movement against.`);
    };
    $$('mvDone').onclick = () => finish(true);
    $$('mvFail').onclick = () => finish(false);
  } else if (q.type === 'structure') {
    const set = structureSet(q.setId);
    const revealed = new Set();
    document.querySelectorAll('[data-struct]').forEach((b) => {
      b.onclick = () => {
        const mem = set.members.find((mm) => mm.id === b.dataset.struct);
        if (!mem) return;
        revealed.add(mem.id);
        b.classList.add('shown');
        b.querySelector('.grow').innerHTML = `${esc(mem.label)}${mem.note ? `<small>${esc(mem.note)}</small>` : ''}`;
        /* Tapping also drives the 3D model, so the name and the place arrive together. */
        targetIn3D(set, mem);
      };
    });
    const studio = $$('rssStructStudio');
    if (studio) studio.onclick = () => { openViewer(); targetIn3D(set, set.members[0]); };
    const finish = (correct) => {
      const missed = set.members.filter((mem) => !revealed.has(mem.id));
      const note = correct
        ? (revealed.size ? `You revealed ${revealed.size} of ${set.members.length} along the way.` : '')
        : `Still unnamed: ${missed.map((mem) => esc(mem.label)).join(', ') || 'none'}.`;
      document.querySelectorAll('[data-struct]').forEach((b) => { b.disabled = true; });
      $$('rssStructDone').disabled = true; $$('rssStructFail').disabled = true;
      finishQuestion(item, q, correct, note);
    };
    $$('rssStructDone').onclick = () => finish(true);
    $$('rssStructFail').onclick = () => finish(false);
  } else if (q.type === 'diagram') {
    const target = q.labels[ui.session.diagramTarget];
    document.querySelectorAll('[data-reveal]').forEach((b) => {
      b.onclick = () => {
        if (ui.session.answered) return;
        ui.session.diagramReveal = b.dataset.reveal;
        renderStep();
      };
    });
    document.querySelectorAll('[data-hot]').forEach((c) => {
      c.onclick = () => {
        if (ui.session.answered) return;
        const ok = c.dataset.hot === target.id;
        c.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { const right = document.querySelector(`[data-hot="${target.id}"]`); if (right) right.classList.add('right'); }
        finishQuestion(item, q, ok, ok ? '' : `The highlighted hotspot is the ${esc(target.label)}.`);
      };
    });
  } else if (q.type === 'id3d' || q.type === 'laterality') {
    const studio = $$('rssGoStudio');
    if (studio) studio.onclick = () => { openViewer(); if (window.__osteo && q.boneId) window.__osteo.select(q.boneId); };
    document.querySelectorAll('[data-opt]').forEach((b) => {
      b.onclick = () => { const found = +b.dataset.opt === 0; document.querySelectorAll('[data-opt]').forEach((x) => { x.disabled = true; }); b.classList.add(found ? 'right' : 'wrong'); finishQuestion(item, q, found); };
    });
  } else if (q.type === 'explain' || q.type === 'scenario') {
    $$('rssSelfGo').onclick = () => {
      const val = ($$('rssTypedInput').value || '').trim();
      if (!val) return toast('Write something first — even a rough answer. Comparing beats reading.');
      $$('rssTypedInput').disabled = true;
      $$('rssSelfGo').disabled = true;
      const model = q.model || q.explanation;
      const rubric = q.rubric || [];
      $$('rssVerdict').innerHTML = `<div class="verdict"><h4>Compare with the model answer</h4><div class="why">${esc(model)}</div>
        ${rubric.length ? `<ul class="mistakes">${rubric.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
        <div class="conf-row"><span class="lab">Did you cover it?</span><button class="conf" id="rssSelfYes">Yes, I had it</button><button class="conf" id="rssSelfPart">Partly</button><button class="conf" id="rssSelfNo">No</button></div></div>`;
      const grade = (correct, note, conf) => finishQuestion(item, q, correct, note, conf);
      $$('rssSelfYes').onclick = () => grade(true, 'Self-graded as covered.', 2);
      $$('rssSelfPart').onclick = () => grade(false, 'Self-graded as partial — the points you missed are listed above.', 0);
      $$('rssSelfNo').onclick = () => grade(false, 'Self-graded as missed.', 0);
    };
  }
}

function applyHTML(item) {
  const apps = item.application || [];
  if (!apps.length) return `<div class="lesson"><div class="eyebrow">Apply</div><h2>${esc(item.title)}</h2><div class="emptybox">No application task authored for this item.</div><div class="rss-actions"><button class="primary" data-nav="review">Go to review →</button></div></div>`;
  const a = apps[0];
  return `<div class="lesson">
    <div class="eyebrow">Apply · scenario</div>
    <h2>${esc(item.title)}</h2>
    <div class="q-prompt">${glossify(esc(a.prompt))}</div>
    <div class="typed-row"><input id="rssApplyInput" autocomplete="off" placeholder="Work it out in your own words"></div>
    <button class="primary" id="rssApplyGo" style="margin-top:9px">Show the model answer</button>
    <div id="rssApplyVerdict"></div>
    <div class="rss-actions" id="rssApplyNav"></div>
  </div>`;
}

function wireApply(item) {
  const apps = item.application || [];
  if (!apps.length) return;
  const a = apps[0];
  if (!ui.session.startedAt) ui.session.startedAt = performance.now();
  const go = $$('rssApplyGo');
  go.onclick = () => {
    const val = ($$('rssApplyInput').value || '').trim();
    if (!val) return toast('Have a go first. Applying it badly and then correcting beats reading the answer.');
    $$('rssApplyInput').disabled = true; go.disabled = true;
    $$('rssApplyVerdict').innerHTML = `<div class="verdict"><h4>Model answer</h4><div class="why">${glossify(esc(a.model))}</div>
      <ul class="mistakes">${(a.rubric || []).map((r) => `<li>${glossify(esc(r))}</li>`).join('')}</ul>
      <div class="conf-row"><span class="lab">Did you get there?</span><button class="conf" id="rssAppYes">Yes</button><button class="conf" id="rssAppPart">Partly</button><button class="conf" id="rssAppNo">No</button></div></div>`;
    /*
     * Three buttons used to produce two outcomes -- "Partly" was scored exactly
     * as "No", which made the middle button a lie and put a lapse on the record
     * of someone who had most of it. Partly now counts as reached, but at the
     * lowest confidence, so it earns the shortest interval without the lapse
     * penalty that repeated failure carries.
     */
    const grade = (correct, conf) => {
      const ms = Math.max(800, performance.now() - ui.session.startedAt);
      for (const dim of ['application', 'explanation']) {
        setMastery(item.id, dim, schedule(getMastery(item.id, dim), { correct, confidence: conf, ms, expectedMs: 60000 }));
      }
      if (!correct) {
        logMistake({ itemId: item.id, qid: `${item.id}!app0`, type: 'scenario', prompt: a.prompt });
        /* So the Review step's missed-question recap includes the Apply miss. */
        ui.session.results.push({ itemId: item.id, qid: `${item.id}!app0`, correct, ms });
      }
      $$('rssApplyNav').innerHTML = '<button class="primary" data-nav="review">See what was scheduled →</button>';
      wireStageNav(item);
      toast(!correct ? 'Recorded — this one will come back sooner.'
        : conf >= 2 ? 'Application recorded.'
        : 'Recorded as partly — no mistake logged, but it comes back soon.');
    };
    wireTerms($$('rssApplyVerdict'));
    $$('rssAppYes').onclick = () => grade(true, 2);
    $$('rssAppPart').onclick = () => grade(true, 0);
    $$('rssAppNo').onclick = () => grade(false, 0);
  };
}

function reviewHTML(item) {
  const mine = ui.session.results.filter((r) => r.itemId === item.id);
  const right = mine.filter((r) => r.correct).length;
  const recs = MASTERY_DIMENSIONS.map((d) => ({ d, rec: getMastery(item.id, d.id) })).filter((x) => x.rec && x.rec.attempts);
  const soonest = recs.length ? Math.min(...recs.map((x) => x.rec.due)) : 0;
  const days = soonest ? Math.max(0, Math.round((soonest - Date.now()) / 86400000)) : 0;
  const last = ui.session.index >= ui.session.items.length - 1;
  /*
   * The Review step recaps what actually went wrong in this session — the
   * exact questions missed, with their own explanations — rather than generic
   * study advice. Clean pass falls back to the item's authored confusions.
   */
  const qs = questionsOf(item);
  const appTask = (item.application || [])[0];
  const missedQs = mine.filter((r) => !r.correct)
    .map((r) => r.qid === `${item.id}!app0`
      ? { prompt: appTask ? appTask.prompt : '', why: appTask ? appTask.model : '' }
      : qs.find((q) => q.qid === r.qid))
    .filter(Boolean);
  const fixBlock = missedQs.length
    ? `<div class="subhead" style="margin-top:14px">What you missed — to fix before it comes back</div>
       <ul class="facts">${missedQs.map((q) => `<li><strong>${esc(q.prompt)}</strong><br>${esc(q.why)}</li>`).join('')}</ul>`
    : (item.commonMistakes && item.commonMistakes.length
      ? `<div class="subhead" style="margin-top:14px">Common confusions on this item</div><ul class="facts">${item.commonMistakes.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`
      : '');
  return `<div class="lesson">
    <div class="eyebrow">Review · scheduled</div>
    <h2>${esc(item.title)}</h2>
    <div class="body">${mine.length ? `You answered ${right} of ${mine.length} correctly on this item.` : 'No answers recorded for this item in this ui.session.'}
      ${soonest ? (soonest <= Date.now() ? ' It stays in today’s queue.' : ` Next review in about ${days} day${days === 1 ? '' : 's'}.`) : ''}</div>
    ${fixBlock}
    ${item.selfCheck ? `<div class="subhead" style="margin-top:14px">Before it comes back</div>
      <div class="hookcard"><div class="kind">Blank-page check · <span class="apptag">App note</span></div><div class="txt">${glossify(esc(item.selfCheck))}</div></div>` : ''}
    <div class="rss-actions">
      ${last ? '<button class="primary" id="rssFinish">Finish ui.session</button>' : '<button class="primary" id="rssNextItem">Next item →</button>'}
      <button class="ghost" data-nav="learn">Re-read the lesson</button>
    </div>
  </div>`;
}

function wireStageNav(item) {
  document.querySelectorAll('#rssStage [data-nav]').forEach((b) => { b.onclick = () => setStep(b.dataset.nav); });
  const next = $$('rssNextItem');
  if (next) next.onclick = advanceItem;
  const fin = $$('rssFinish');
  if (fin) fin.onclick = endSession;
}

/*
 * A day streak that survives a gap is not a day streak.
 *
 * The old line incremented whenever the last session was on any earlier day,
 * so coming back after three weeks away read as one day longer rather than as
 * a broken run. The number is there to tell you something true about your
 * habit; inflating it makes it worth nothing.
 *
 * Same day  -> unchanged. Yesterday -> +1. Anything longer -> back to 1.
 * Exported shape kept simple and pure so it can be tested without a browser.
 */
function nextStreak(current, lastDay, today) {
  if (!lastDay) return 1;
  const gap = Math.round((Date.parse(today) - Date.parse(lastDay)) / 86400000);
  if (gap <= 0) return current || 1;
  if (gap === 1) return (current || 0) + 1;
  return 1;
}
window.__rssNextStreak = nextStreak;   /* so the behaviour can be checked from a test */

function endSession() {
  const right = ui.session.results.filter((r) => r.correct).length;
  const total = ui.session.results.length;
  const meta = store.meta || {};
  const today = new Date().toISOString().slice(0, 10);
  meta.sessionsDone = (meta.sessionsDone || 0) + 1;
  meta.streak = nextStreak(meta.streak, meta.lastSessionDay, today);
  meta.lastSessionDay = today;
  store.meta = meta; write(K.meta, meta);
  toast(total ? `Session done — ${right}/${total} correct. Reviews scheduled.` : 'Session ended.');
  ui.session = null;
  /* The resume point is deliberately NOT cleared here. Ending a session still
     leaves a sensible "pick up where you left off" target; clearing it would
     leave Today's Continue card empty almost always, which is the one thing
     that card exists to avoid. */
  closeSessionOverlay();
}

/* ------------------------------------------------------------------ *
 * Source dialog
 * ------------------------------------------------------------------ */

function sourceTableHTML(refs, heading) {
  const rows = refs.map((r) => {
    const d = describeSource(r);
    return `<tr>
      <td class="k"><strong>${esc(d.file)}</strong>${d.note ? `<div style="color:var(--muted);font-size:11.5px;margin-top:3px">${esc(d.note)}</div>` : ''}</td>
      <td>${esc(d.subject)}</td>
      <td>${esc(d.folder)}</td>
      <td>${esc(d.location || '—')}</td>
      <td>${d.authored ? '<span class="pill">App-authored aid</span>' : `<span class="pill ${d.kind === 'student' ? 'limited' : 'full'}">${esc(d.kind === 'student' ? 'Student work' : d.kind === 'assessment' ? 'Assessment' : d.kind === 'admin' ? 'Admin' : 'Source-derived')}</span>`}</td>
    </tr>`;
  }).join('');
  return `${heading ? `<div class="subhead">${esc(heading)}</div>` : ''}<table class="srctable"><thead><tr><th>File</th><th>Subject</th><th>Folder</th><th>Page / section</th><th>Type</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function openSourceDialog(item, question) {
  $$('sourceTitle').textContent = item.title;
  const memoryKeys = Object.keys(item.memory || {}).filter((k) => item.memory[k]);
  $$('sourceBody').innerHTML = `
    <p class="task-copy" style="margin-top:0">Every factual claim on this item traces to a file below. Memory aids are written by this app and are marked separately.</p>
    ${question && question.src ? sourceTableHTML([question.src], 'Source for the answer you just saw') : ''}
    ${sourceTableHTML(item.sourceRefs, question && question.src ? 'Sources for the whole item' : '')}
    ${priorSources(item).length ? sourceTableHTML(priorSources(item), 'Slides behind the "beyond DSE Biology" lines') : ''}
    ${memoryKeys.length ? `<div class="subhead">App-authored memory aids on this item</div>
      <div class="notice">These are study devices, not source claims. ${memoryKeys.map((k) => esc(MEMORY_METHODS[k] || k)).join(', ')}.</div>` : ''}
    <div class="subhead">How to read the type column</div>
    <ul class="facts">
      <li><strong>Source-derived</strong> — teaching material issued by the subject: lecture handouts, study manuals, slide decks.</li>
      <li><strong>Assessment</strong> — past papers, revision exercises, model answers and question banks.</li>
      <li><strong>Student work</strong> — coursework produced by students. Used only to confirm topic scope, never as a fact source.</li>
      <li><strong>App-authored aid</strong> — written by this app to help you remember. Not a claim from your sources.</li>
    </ul>`;
  openDialog($$('sourceDialog'));
}

$$('closeTerm').onclick = () => $$('termDialog').close();
$$('closeReset').onclick = () => $$('resetDialog').close();
$$('resetGo').onclick = armReset;
$$('resetExportFirst').onclick = () => { exportProgress(); toast('Backup exported. The erase button is still there when you are ready.'); };

/* ------------------------------------------------------------------ *
 * Coverage report
 * ------------------------------------------------------------------ */

function openCoverage(focusSubject) {
  const failures = validateCorpus().concat(validateApplications());
  const qCount = allQuestions().length;
  const subjects = focusSubject ? COVERAGE.subjects.filter((s) => s.id === focusSubject) : COVERAGE.subjects;
  $$('coverageBody').innerHTML = `
    <p class="task-copy" style="margin-top:0">${esc(COVERAGE.generated)}</p>
    <div class="statrow" style="margin:12px 0 16px">
      <div class="s"><b>${STUDY_ITEMS.length}</b><small>Study items</small></div>
      <div class="s"><b>${qCount}</b><small>Questions</small></div>
      <div class="s"><b>${Object.keys(SOURCE_FILES).length}</b><small>Source files cited</small></div>
      <div class="s"><b>${failures.length}</b><small>Validation failures</small></div>
    </div>
    ${failures.length
      ? `<div class="notice stop"><strong>${failures.length} question${failures.length === 1 ? '' : 's'} failed validation</strong>${failures.slice(0, 12).map((f) => esc(`${f.qid || f.itemId}: ${f.problems.join('; ')}`)).join('<br>')}</div>`
      : '<div class="notice"><strong>Every question validates</strong>All ' + qCount + ' questions have a resolvable correct answer and an explanation, every item has a teaching explanation, and every item carries at least one source reference.</div>'}

    ${subjects.map((s) => {
      const subject = getSubject(s.id);
      const n = itemsForSubject(s.id).length;
      return `<div class="cov-sec">
        <h4>${esc(subject ? subject.code + ' — ' + subject.title : s.id)} ${coveragePill(s.status)} <span class="tag">${n} item${n === 1 ? '' : 's'}</span> <span class="tag">${s.files} source file${s.files === 1 ? '' : 's'}</span></h4>
        ${s.covered.length ? `<div class="subhead" style="margin:8px 0 2px">Covered</div><ul class="good">${s.covered.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        ${s.gaps.length ? `<div class="subhead" style="margin:10px 0 2px">Missing or limited</div><ul>${s.gaps.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('')}

    ${focusSubject ? '' : `
    <div class="cov-sec">
      <h4>Duplicate materials</h4>
      <ul>${COVERAGE.duplicates.map((d) => `<li><strong style="color:var(--text)">${esc(d.what)}</strong><br>${d.where.map((w) => esc(w)).join('<br>')}</li>`).join('')}</ul>
    </div>
    <div class="cov-sec">
      <h4>Source conflicts and how each was handled</h4>
      <ul>${COVERAGE.conflicts.map((c) => `<li><strong style="color:var(--text)">${esc(c.what)}</strong><br>${esc(c.detail)}<br><em style="color:var(--teal)">${esc(c.handled)}</em></li>`).join('')}</ul>
    </div>
    <div class="cov-sec">
      <h4>Notes</h4>
      <ul>${COVERAGE.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`}`;
  openDialog($$('coverageDialog'));
}

/* ------------------------------------------------------------------ *
 * Mastery dashboard
 * ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

migrate();
renderNavButtons();
$$('closeSource').onclick = () => $$('sourceDialog').close();
$$('closeCoverage').onclick = () => $$('coverageDialog').close();
$$('closeAbout').onclick = () => $$('aboutDialog').close();
/* Contextual back: only meaningful on a phone drilled into a topic. */
$$('navBackBtn').onclick = () => { ui.learnDrill = false; renderLearn(); };
/* The viewer keeps four primary controls on the canvas; everything the old
   studio showed at once now sits behind this one toggle. */
$$('viewerMoreBtn').onclick = () => {
  const sheet = $$('viewerSheet');
  const open = sheet.classList.toggle('hidden') === false;
  $$('viewerMoreBtn').classList.toggle('active', open);
  $$('viewerMoreBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
  /* Opening the model controls must not shrink the model: the pane becomes a
     scroller and the sheet sits below a full-height stage. */
  $$('viewerSkeletonPane').classList.toggle('sheet-open', open);
  if (open) {
    renderOverlayCard();
    /* Show that there IS something below, without hiding the model to do it. */
    requestAnimationFrame(() => sheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  } else {
    $$('viewerSkeletonPane').scrollTop = 0;
  }
};
/* ------------------------------------------------------------------ *
 * Dialog behaviour, applied to all seven at once
 *
 * Two things a keyboard user is entitled to, neither of which was happening.
 *
 * ESCAPE. A modal <dialog> is supposed to close on Escape without any help,
 * and these are genuinely modal -- ':modal' reports true. But a keydown that
 * reached the document produced no 'cancel' event and left the dialog open,
 * and rather than decide whether that is the embedded browser or the page, the
 * handler below just does it. It costs nothing where the platform already
 * works, because by then there is no open dialog left to close.
 *
 * FOCUS. Closing a dialog dropped focus on the floor: the element that had it
 * was inside the dialog that just went away, so the next Tab started again
 * from the top of the document. Every term lookup cost a keyboard user their
 * place on the page. The opener is remembered and focus goes back to it.
 * ------------------------------------------------------------------ */

let dialogOpener = null;

window.__rssOpenDialog = (d) => openDialog(d);

function openDialog(dlg) {
  /* Remember where we came from, but only a real element still on the page. */
  const from = document.activeElement;
  dialogOpener = from && from !== document.body && document.contains(from) ? from : null;
  dlg.showModal();
}

function closeTopDialog() {
  const open = [...document.querySelectorAll('dialog[open]')];
  if (!open.length) return false;
  open[open.length - 1].close();
  return true;
}

for (const dlg of document.querySelectorAll('dialog')) {
  dlg.addEventListener('close', () => {
    const back = dialogOpener;
    dialogOpener = null;
    /* Only if nothing else has taken focus in the meantime, and it is still there. */
    if (back && document.contains(back) && (document.activeElement === document.body || !document.activeElement)) {
      try { back.focus({ preventScroll: true }); } catch { /* not focusable any more */ }
    }
  });
}

/* Global search: one sheet, reachable from every destination and Cmd/Ctrl-K. */
$$('rssSearchBtn').onclick = openSearchSheet;
$$('rssSessionSearch').onclick = openSearchSheet;
$$('searchClose').onclick = closeSearchSheet;
$$('searchScrim').onclick = (e) => { if (e.target === $$('searchScrim')) closeSearchSheet(); };
$$('globalSearch').oninput = (e) => runSearch(e.target.value);
window.addEventListener('keydown', (e) => {
  const open = !$$('searchScrim').classList.contains('hidden');
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open ? closeSearchSheet() : openSearchSheet(); return; }
  if (e.key === 'Escape' && open) { e.preventDefault(); closeSearchSheet(); return; }
  if (e.key === 'Escape' && closeTopDialog()) e.preventDefault();
});
$$('rssSessionClose').onclick = () => { if (ui.session) endSession(); else closeSessionOverlay(); };
$$('rssSkipBtn').onclick = () => {
  if (!ui.session) return;
  if (ui.session.index >= ui.session.items.length - 1) return endSession();
  ui.session.index += 1; ui.session.qIndex = 0; ui.session.seqOrder = null; ui.session.matchRights = null; ui.session.diagramTarget = null; ui.session.diagramReveal = null; if (window.__osteo && window.__osteo.endMovement) { window.__osteo.endMovement(); const b=$$('mvBar'); if(b) b.classList.add('hidden'); const bk=$$('mvBackToSession'); if(bk) bk.classList.add('hidden'); }
  setStep('learn');
};
$$('rssEndBtn').onclick = () => { if (ui.session) endSession(); else closeSessionOverlay(); };
$$('closeTransfer').onclick = () => $$('transferDialog').close();
$$('transferExport').onclick = () => exportProgress();
$$('transferFile').onchange = (e) => handleTransferFile(e.target.files && e.target.files[0]);
$$('transferMerge').onclick = () => commitTransfer('merge');
$$('transferReplace').onclick = () => commitTransfer('replace');
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.querySelector('dialog[open]') && ui.session) { /* let the osteology handler own Escape in its own view */ }
});
renderToday();

/*
 * Manifest shortcuts land here as #mode=daily etc. Start that session straight
 * away, then clear the hash so a later reload does not silently restart it.
 */
(() => {
  const wanted = window.__rssLaunchMode;
  if (!wanted) return;
  const mode = STUDY_MODES.find((m) => m.id === wanted);
  if (!mode || mode.id === 'subject') return;
  history.replaceState(null, '', location.pathname + location.search);
  startSession({ mode: mode.id });
})();

