/*
 * Reset
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, DATA_VERSION, LEGACY_STATS_KEY, STORAGE_PREFIX, esc, itemsForSubject, ui } from './imports.js';
import { K, itemAttempted, itemDue, itemScore, read, store, write } from './storage-versioned-keys.js';
import { PROGRESS_FORMAT, buildProgressExport } from './moving-progress-between.js';
import { closeSessionOverlay, goTo } from './navigation-five-destinations.js';
import { openDialog } from './dialog-behaviour-applied.js';
import { renderToday } from './spatial-overlay-controls.js';
import { toast } from './small-ui-helpers.js';

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

export function openResetDialog() {
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
export function armReset() {
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

export function exportProgress() {
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

export function openTransferDialog() {
  pendingImport = null;
  const c = buildProgressExport().counts;
  $$('transferSummary').textContent =
    `This device holds ${c.mastery} mastery records across ${c.items} items, and ${c.mistakes} logged mistakes.`;
  $$('transferPlan').classList.add('hidden');
  $$('transferError').classList.add('hidden');
  $$('transferFile').value = '';
  openDialog($$('transferDialog'));
}

export function handleTransferFile(file) {
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

export function commitTransfer(mode) {
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
