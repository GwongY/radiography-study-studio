/*
 * Storage — versioned keys, one-time migration from the osteology app
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { DATA_VERSION, LEGACY_STATS_KEY, MASTERY_DIMENSIONS, STORAGE_PREFIX, blankMastery, getItem, isDue, masteryScore, priorAdjustedScore } from './imports.js';
import { toast } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Storage — versioned keys, one-time migration from the osteology app
 * ------------------------------------------------------------------ */

export const K = {
  mastery: STORAGE_PREFIX + 'mastery',
  items: STORAGE_PREFIX + 'items',
  mistakes: STORAGE_PREFIX + 'mistakes',
  meta: STORAGE_PREFIX + 'meta',
  /* Course tab: which sessions were attended, and which tutorial and lab
     group the student is in — neither is derivable from the schedule. */
  attendance: STORAGE_PREFIX + 'attendance',
  groups: STORAGE_PREFIX + 'groups',
  /* A display preference, not progress: which of the three type steps
     the reader chose. Kept out of `store` because nothing reads it in a
     loop — text-size.js asks for it when it applies it. */
  textSize: STORAGE_PREFIX + 'textsize',
};

export function read(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota or private mode — keep running in memory */ }
}

export const store = {
  mastery: read(K.mastery, {}),
  items: read(K.items, {}),
  mistakes: read(K.mistakes, []),
  meta: read(K.meta, null),
  attendance: read(K.attendance, {}),
  groups: read(K.groups, {}),
};

export function migrate() {
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
export function getMastery(itemId, dim) { return store.mastery[masteryKey(itemId, dim)] || null; }
export function setMastery(itemId, dim, rec) { store.mastery[masteryKey(itemId, dim)] = rec; write(K.mastery, store.mastery); }

export function itemScore(itemId) {
  const recs = MASTERY_DIMENSIONS.map((d) => getMastery(itemId, d.id)).filter(Boolean);
  if (!recs.length) return 0;
  return recs.reduce((n, r) => n + masteryScore(r), 0) / recs.length;
}
export function itemAttempted(itemId) {
  return MASTERY_DIMENSIONS.some((d) => (getMastery(itemId, d.id) || {}).attempts > 0);
}

/*
 * Reading a lesson is progress, and until this existed the app did not think
 * so: mastery only moves when a question is ANSWERED, so opening an item,
 * reading the whole lesson and leaving -- by Save & exit or by closing the
 * app -- left it reading "Not started", exactly as it had before it was
 * opened. There was nothing wrong with the save; there was nothing to save.
 *
 * It is kept apart from the mastery record on purpose. itemAttempted decides
 * what is due, what counts as unseen and how the queue is ordered, so writing
 * a reading into it would mean a lesson you have only looked at starts
 * competing for revision slots and drags the accuracy figures down with
 * attempts nobody made. Read is read; answered is answered.
 *
 * The one-minute floor stops paging back and forth between the steps of one
 * item writing localStorage on every render.
 */
export function markRead(itemId) {
  const rec = store.items[itemId] || {};
  const now = Date.now();
  if (rec.readAt && now - rec.readAt < 60000) return;
  store.items[itemId] = { ...rec, readAt: now, reads: (rec.reads || 0) + 1 };
  write(K.items, store.items);
}
export function itemRead(itemId) { return !!(store.items[itemId] || {}).readAt; }
export function itemDue(itemId, now = Date.now()) {
  const recs = MASTERY_DIMENSIONS.map((d) => getMastery(itemId, d.id)).filter((r) => r && r.attempts);
  if (!recs.length) return true;
  return recs.some((r) => isDue(r, now));
}
export function itemLapses(itemId) {
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
export function adjScore(item) {
  return priorAdjustedScore(item, itemScore(item.id), itemAttempted(item.id));
}

export function logMistake(entry) {
  store.mistakes.unshift({ ...entry, at: Date.now() });
  store.mistakes = store.mistakes.slice(0, 400);
  write(K.mistakes, store.mistakes);
}
