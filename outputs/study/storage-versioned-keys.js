/*
 * Storage -- versioned keys and the one-time purge of the retired testing data
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { STORAGE_PREFIX } from './imports.js';

/* ------------------------------------------------------------------ *
 * Storage -- versioned keys
 * ------------------------------------------------------------------ */

export const K = {
  /* Course tab: which sessions were attended, and which tutorial and lab
     group the student is in -- neither is derivable from the schedule. */
  attendance: STORAGE_PREFIX + 'attendance',
  groups: STORAGE_PREFIX + 'groups',
  /* Assessments: what has been handed in, and what it scored. Neither is
     derivable from any document -- the schedule knows when a thing is due and
     what it is worth, and only the student knows the rest. */
  assessDone: STORAGE_PREFIX + 'assessdone',
  marks: STORAGE_PREFIX + 'marks',
  /* A display preference: which of the three type steps the reader chose.
     text-size.js asks for it when it applies it. */
  textSize: STORAGE_PREFIX + 'textsize',
  /* Recent search queries -- a display convenience; the search sheet lists
     them when it opens on an empty box. */
  recentSearches: STORAGE_PREFIX + 'recentsearches',
};

export function read(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota or private mode -- keep running in memory */ }
}

export const store = {
  attendance: read(K.attendance, {}),
  groups: read(K.groups, {}),
  assessDone: read(K.assessDone, {}),
  marks: read(K.marks, {}),
};

/*
 * The app no longer tests. The owner asked for the saved answer history to be
 * deleted from the device (2026-10-19; docs/superpowers/specs/2026-10-19-
 * remove-testing.md), once, on the first load of the build without it.
 *
 * An explicit list, never a prefix sweep: Revise's week pick, the text size,
 * the notice token and the viewport keys all live under rss.v1.* too and must

 * survive, and so does 'osteology-studio-stats': that is the 3D studio's own
 * Identify/Find drill history, a separate engine this change does not touch
 * (see the spec's addendum). The private gist the old sync wrote to is not touched -- the app
 * never could delete it, and the owner removes it on github.com.
 */
const PURGED = STORAGE_PREFIX + 'testing-purged';
const RETIRED_KEYS = [
  'mastery', 'items', 'mistakes', 'meta', 'continue', 'log', 'baseline', 'device', 'sync',
].map((k) => STORAGE_PREFIX + k);
const RETIRED_PREFIXES = ['rss-step:', STORAGE_PREFIX + 'step:'];

export function purgeTesting() {
  try {
    if (localStorage.getItem(PURGED)) return;
    RETIRED_KEYS.forEach((k) => localStorage.removeItem(k));
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && RETIRED_PREFIXES.some((p) => k.startsWith(p))) localStorage.removeItem(k);
    }
    localStorage.setItem(PURGED, String(Date.now()));
  } catch { /* private mode: nothing was stored to remove */ }
  try { indexedDB.deleteDatabase('rss-progress'); } catch { /* no IndexedDB */ }
}
