/*
 * Moving progress between devices
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { DATA_VERSION } from './imports.js';
import { K, store, write } from './storage-versioned-keys.js';
import { absorb, events, readBaseline } from './progress-log.js';

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

export const PROGRESS_FORMAT = 'rss.progress';

export function buildProgressExport() {
  return {
    format: PROGRESS_FORMAT,
    formatVersion: 1,
    dataVersion: DATA_VERSION,
    exportedAt: Date.now(),
    exportedAtISO: new Date().toISOString(),
    /* Informational, and guarded: this module is deliberately DOM-free so the
       sync checks can build a real payload in node, where there is no page. */
    origin: typeof location === 'undefined' ? 'unknown' : location.origin + location.pathname,
    counts: {
      mastery: Object.keys(store.mastery).length,
      items: Object.keys(store.items).length,
      mistakes: store.mistakes.length,
      log: events.length,
    },
    mastery: store.mastery,
    items: store.items,
    mistakes: store.mistakes,
    meta: store.meta,
    /*
     * The log travels with the file, and it is the part that merges exactly.
     * Older exports have neither key; the importer treats both as optional, so
     * a file written before the log existed still imports on the old rule.
     */
    baseline: readBaseline(),
    log: events,
  };
}

/* ------------------------------------------------------------------ *
 * Reading a payload back in
 *
 * These three live here rather than with the dialog that first used them,
 * because a progress payload now arrives by two routes -- a file the reader
 * picked, and a gist the app fetched -- and both deserve the same suspicion and
 * the same merge. Keeping them beside the export they mirror also keeps this
 * module free of the DOM, so work/gist-sync-check.mjs can drive a whole sync in
 * node without a browser.
 * ------------------------------------------------------------------ */

/* Never trust the file: it may be a different app's export, an older format, or
   hand-edited. Anything unexpected is refused with the reason, not merged.
   Exported because gist-sync.js puts remote payloads through the SAME gate --
   a document fetched from the network deserves no more trust than a file. */
export function validateProgressFile(data) {
  if (!data || typeof data !== 'object') return 'That file is not JSON this app understands.';
  if (data.format !== PROGRESS_FORMAT) return 'That is not a Study Studio progress file.';
  if (data.dataVersion !== DATA_VERSION) return `That file was written for data version ${data.dataVersion}, and this app is on ${DATA_VERSION}.`;
  if (!data.mastery || typeof data.mastery !== 'object' || Array.isArray(data.mastery)) return 'The mastery record in that file is missing or malformed.';
  if (!data.items || typeof data.items !== 'object' || Array.isArray(data.items)) return 'The item record in that file is missing or malformed.';
  if (data.mistakes && !Array.isArray(data.mistakes)) return 'The mistake log in that file is malformed.';
  if (data.log && !Array.isArray(data.log)) return 'The answer log in that file is malformed.';
  return null;
}

export function planProgressMerge(data) {
  const plan = { added: 0, replaced: 0, keptLocal: 0, itemsAdded: 0, itemsUpdated: 0, mistakesAdded: 0, eventsNew: 0 };
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
  const held = new Set(events.map((e) => e.id));
  (data.log || []).forEach((e) => { if (e && e.id && !held.has(e.id)) plan.eventsNew += 1; });
  return plan;
}

export function applyProgressImport(data, mode) {
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
  /*
   * The log is unioned whichever mode the reader chose, including replace.
   * Events are facts about attempts that happened, not a view of state: two
   * logs cannot contradict each other, so there is nothing for a "replace" to
   * resolve and dropping the local half would throw away real practice.
   */
  if (Array.isArray(data.log)) absorb(data.log);
  store.meta = { ...(store.meta || {}), version: DATA_VERSION, importedAt: Date.now(), importedFrom: data.origin || 'unknown' };
  write(K.mastery, store.mastery);
  write(K.items, store.items);
  write(K.mistakes, store.mistakes);
  write(K.meta, store.meta);
}

