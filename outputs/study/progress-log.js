/*
 * Progress log — the append-only record every other progress number is derived from
 *
 * Split out along the banner sections. See docs/CODEMAP.md.
 */
import { STORAGE_PREFIX, schedule } from './imports.js';
import { K, getMastery, markRead, read, setMastery, store, write } from './storage-versioned-keys.js';

/* ------------------------------------------------------------------ *
 * Progress log
 *
 * Mastery records are COUNTERS -- attempts, correct, lapses, a rolling avgMs,
 * a confidence sum. A counter cannot say where it came from, and that is the
 * whole problem this file exists to fix. Two devices holding 40 attempts each
 * might have answered the same 40 questions or 80 different ones, and nothing
 * in the record can tell you which; moving-progress-between.js documents the
 * consequence honestly -- the record with the newer lastSeen wins and the
 * other is DROPPED, because adding them would invent history and taking the
 * larger would too.
 *
 * Over one transfer that is a fair trade. Over four years of a degree, across
 * an iPad and a laptop and at least one phone upgrade, it is a slow leak: every
 * merge silently discards real practice, and nothing ever says so.
 *
 * So the source of truth moves. An attempt is an EVENT -- when, which item,
 * which dimension, right or wrong, how sure, how long -- and it is appended,
 * never modified. Two logs merge by set union on the event id, which is exact
 * by construction: the same attempt appears once however many times the two
 * devices are synced, and two different attempts both survive.
 *
 * The mastery record becomes derived state. schedule() is a pure function of
 * (previous record, outcome, timestamp), so folding it over the events of one
 * (item, dimension) in timestamp order reproduces the live record exactly --
 * which is what makes rebuild() a repair tool and verify() a check rather than
 * a guess. Nothing is thrown away to get there: the live records are still
 * written as they always were, on the same code path, so a reader whose log is
 * lost is exactly as well off as they were before this file existed.
 *
 * BASELINE. The log starts the day it is installed, and it cannot invent the
 * history that came before it. So the state as it stood at that moment is
 * snapshotted once, and a rebuild is baseline + every event after it. That
 * makes the pre-log record a single opaque starting point rather than a lie
 * about what was practised when.
 *
 * WHERE IT LIVES. IndexedDB, not localStorage: four years at twenty answers a
 * day is on the order of 20,000 events, which is comfortable in IndexedDB and
 * uncomfortably close to Safari's ~5 MB localStorage quota -- and the quota is
 * shared with the mastery records the app cannot run without. localStorage is
 * the fallback for browsers with no IndexedDB, capped, newest kept.
 *
 * None of this survives the browser deciding to clear the origin. That is what
 * the export file is for, and what off-device sync will be for.
 * ------------------------------------------------------------------ */

const DB_NAME = 'rss-progress';
const DB_VERSION = 1;
const STORE = 'events';

export const LOG_FALLBACK_KEY = STORAGE_PREFIX + 'log';
export const BASELINE_KEY = STORAGE_PREFIX + 'baseline';
export const DEVICE_KEY = STORAGE_PREFIX + 'device';

/* The localStorage fallback is bounded; IndexedDB is not. */
const FALLBACK_CAP = 6000;
/* A stubbed or wedged IndexedDB must not hold appends in memory forever. */
const OPEN_TIMEOUT_MS = 3000;

/*
 * Every event carries the device that recorded it, so ids are unique without
 * coordination and a union across devices needs no clock agreement. Kept in
 * localStorage: a device that loses it becomes a "new" device, which costs
 * nothing but a longer id space -- ids already recorded keep the old one.
 */
let device = null;
export function deviceId() {
  if (device) return device;
  device = read(DEVICE_KEY, null);
  if (typeof device !== 'string' || !device) {
    device = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    write(DEVICE_KEY, device);
  }
  return device;
}

/* Ordered by `at`. Appends are chronological, so push keeps that true. */
export const events = [];
const seen = new Set();

let db = null;
let mode = 'pending';          /* pending | idb | local | memory */
let pending = [];              /* appended before the store was ready */
let loaded = null;             /* the load promise, for callers that must wait */

function eventId(at) {
  return `${deviceId()}.${at.toString(36)}.${Math.random().toString(36).slice(2, 8)}`;
}

/*
 * Deliberately tolerant. An event that arrives twice -- from a re-import, or a
 * sync that overlapped -- is the same event, and dropping the duplicate is the
 * whole point of giving it an id.
 */
export function absorb(list) {
  let added = 0;
  for (const e of list || []) {
    if (!e || typeof e !== 'object' || typeof e.id !== 'string' || typeof e.at !== 'number') continue;
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    events.push(e);
    added += 1;
  }
  if (added) events.sort((a, b) => a.at - b.at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return added;
}

function openDb() {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => { if (!settled) { settled = true; resolve(v); } };
    setTimeout(() => done(null), OPEN_TIMEOUT_MS);
    try {
      if (typeof indexedDB === 'undefined' || typeof indexedDB.open !== 'function') return done(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const d = req.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = () => done(req.result || null);
      req.onerror = () => done(null);
      req.onblocked = () => done(null);
    } catch { done(null); }
  });
}

function readAll(d) {
  return new Promise((resolve) => {
    try {
      const tx = d.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : []);
      req.onerror = () => resolve([]);
    } catch { resolve([]); }
  });
}

function persist(ev) {
  if (mode === 'idb' && db) {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(ev);
      return;
    } catch { /* fall through to the bounded local copy */ }
  }
  if (mode === 'memory') return;
  /* Bounded, newest kept: losing the oldest beats losing the ability to write. */
  const kept = events.slice(-FALLBACK_CAP);
  write(LOG_FALLBACK_KEY, kept);
}

/*
 * Load is asynchronous and answering a question is not, so an attempt recorded
 * before the store opens is held in memory and written when it does. Nothing
 * waits on this: the live mastery record is written synchronously either way.
 */
export function loadLog() {
  if (loaded) return loaded;
  loaded = (async () => {
    const stored = read(LOG_FALLBACK_KEY, []);
    absorb(Array.isArray(stored) ? stored : []);
    const d = await openDb();
    if (d) { db = d; mode = 'idb'; absorb(await readAll(d)); }
    else mode = typeof localStorage === 'undefined' ? 'memory' : 'local';
    const held = pending; pending = [];
    for (const ev of held) persist(ev);
    /* An IndexedDB that opened after events were held locally takes them over. */
    if (mode === 'idb' && Array.isArray(stored) && stored.length) {
      for (const ev of stored) persist(ev);
    }
    return mode;
  })();
  return loaded;
}

export function append(partial) {
  const at = typeof partial.at === 'number' ? partial.at : Date.now();
  const ev = { ...partial, at, id: eventId(at) };
  seen.add(ev.id);
  events.push(ev);
  if (mode === 'pending') pending.push(ev); else persist(ev);
  return ev;
}

/* ------------------------------------------------------------------ *
 * Recording
 *
 * The single door every scheduled attempt goes through. It exists so the live
 * record and the log cannot disagree: they are written from the same outcome,
 * with the same timestamp, in the same call. A call site that schedules by
 * hand would be a silently unlogged attempt, and verify() is what catches one.
 * ------------------------------------------------------------------ */

export function recordAttempt(itemId, dim, outcome, meta = {}) {
  const at = typeof meta.at === 'number' ? meta.at : Date.now();
  /*
   * Normalised ONCE, here, and then used for both the record and the event.
   *
   * This is not tidiness. ms arrives as performance.now() arithmetic -- a
   * float like 5524.800000011921 -- and the first attempt on a record stores
   * it in avgMs unrounded. Rounding it on the way into the log but not on the
   * way into the record made the two disagree in the twelfth decimal place,
   * which is invisible, permanent, and exactly the kind of drift that turns a
   * rebuild from a repair into a corruption. verify() caught it in the browser
   * on the first answer ever recorded. One value, computed once, used twice.
   */
  const norm = {
    correct: !!outcome.correct,
    confidence: outcome.confidence ?? 2,
    ms: Math.round(outcome.ms || 0),
    expectedMs: outcome.expectedMs || 12000,
  };
  const rec = schedule(getMastery(itemId, dim), norm, at);
  setMastery(itemId, dim, rec);
  append({
    t: 'attempt', at, itemId, dim, ...norm,
    qid: meta.qid || null,
    qtype: meta.qtype || null,
    /* Only the dimension a question actually tests advances the seen count --
       delayedRecall and spelling ride along on the same answer. */
    primary: !!meta.primary,
  });
  return rec;
}

/*
 * markRead throttles to one write a minute, so paging between the steps of one
 * item does not write storage on every render. The log has to agree with that
 * or a rebuild would count reads the app never recorded -- hence the return
 * value, and hence appending only when it says something was actually written.
 */
export function recordRead(itemId, at = Date.now()) {
  if (!markRead(itemId, at)) return false;
  append({ t: 'read', at, itemId });
  return true;
}

/* ------------------------------------------------------------------ *
 * Baseline and rebuild
 * ------------------------------------------------------------------ */

export function readBaseline() {
  const b = read(BASELINE_KEY, null);
  if (!b || typeof b !== 'object' || typeof b.at !== 'number') return null;
  return b;
}

/*
 * Taken once, after migrate() has folded in anything older, so the snapshot is
 * the whole of the pre-log history and no mutation falls between the two.
 */
export function ensureBaseline(now = Date.now()) {
  const existing = readBaseline();
  if (existing) return existing;
  const b = { at: now, mastery: { ...store.mastery }, items: { ...store.items } };
  write(BASELINE_KEY, b);
  return b;
}

export function rebuild(baseline = readBaseline(), list = events) {
  const base = baseline || { at: 0, mastery: {}, items: {} };
  const mastery = {};
  for (const [k, v] of Object.entries(base.mastery || {})) mastery[k] = { ...v };
  const items = {};
  for (const [k, v] of Object.entries(base.items || {})) items[k] = { ...v };

  const after = list.filter((e) => e && e.at > base.at)
    .sort((a, b) => a.at - b.at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  for (const e of after) {
    if (e.t === 'attempt') {
      const key = `${e.itemId}::${e.dim}`;
      mastery[key] = schedule(mastery[key] || null, {
        correct: e.correct, confidence: e.confidence, ms: e.ms, expectedMs: e.expectedMs,
      }, e.at);
      if (e.primary) {
        const prev = items[e.itemId] || {};
        items[e.itemId] = { ...prev, status: e.correct ? 'review' : 'learning', seen: (prev.seen || 0) + 1, lastSeen: e.at };
      }
    } else if (e.t === 'read') {
      const prev = items[e.itemId] || {};
      items[e.itemId] = { ...prev, readAt: e.at, reads: (prev.reads || 0) + 1 };
    }
  }
  return { mastery, items };
}

/*
 * The check that keeps the claim honest. If the log really is the source of
 * truth then replaying it must reproduce the live records byte for byte, and
 * any drift means something mutated progress without going through this file.
 * Reported, never silently repaired -- a rebuild that overwrites a record it
 * cannot explain is how you lose the history you were trying to protect.
 */
export function verify(now = Date.now()) {
  const baseline = readBaseline();
  if (!baseline) return { ok: false, reason: 'no baseline', drift: [] };
  const built = rebuild(baseline, events);
  const drift = [];
  const keys = new Set([...Object.keys(store.mastery), ...Object.keys(built.mastery)]);
  for (const k of keys) {
    const a = store.mastery[k];
    const b = built.mastery[k];
    if (JSON.stringify(a || null) !== JSON.stringify(b || null)) drift.push(k);
  }
  return { ok: !drift.length, at: now, events: events.length, since: baseline.at, drift };
}

export function applyRebuild() {
  const built = rebuild();
  store.mastery = built.mastery;
  store.items = built.items;
  write(K.mastery, store.mastery);
  write(K.items, store.items);
  return { mastery: Object.keys(built.mastery).length, items: Object.keys(built.items).length };
}

/*
 * Erasing progress has to erase the log with it, for exactly the reason the
 * reset banner gives about the legacy key: a wipe that left the events behind
 * would leave a rebuild able to resurrect the history the reader just deleted,
 * and the delete would look broken. The baseline goes too -- a baseline with no
 * events describes a past that no longer exists.
 */
export function clearLog() {
  const n = events.length;
  events.length = 0;
  seen.clear();
  pending = [];
  try { localStorage.removeItem(LOG_FALLBACK_KEY); } catch { /* private mode */ }
  try { localStorage.removeItem(BASELINE_KEY); } catch { /* private mode */ }
  if (db) {
    try { db.transaction(STORE, 'readwrite').objectStore(STORE).clear(); } catch { /* gone already */ }
  }
  return n;
}

export function init() {
  ensureBaseline();
  loadLog();
  /*
   * Exposed for the console and for the work/ checks, not wired to any button.
   * The log is substrate: it changes nothing a reader can see until a merge or
   * a repair needs it, and a repair button offered before anything needs
   * repairing is a button that invites a reader to press it.
   */
  try {
    window.__rssLog = { events, verify, rebuild, applyRebuild, readBaseline, deviceId, loadLog, mode: () => mode };
  } catch { /* no window: the node load-check evaluates this file too */ }
}
