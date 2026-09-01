/*
 * Moving progress between devices
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { DATA_VERSION } from './imports.js';
import { store } from './storage-versioned-keys.js';

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
