/*
 * Spaced repetition — the schedule, the mastery score and its dimensions, and
 * what counts as due.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */
import { SOURCE_FILES, SUBJECTS, ITEM_TYPES, MASTERY_DIMENSIONS, STUDY_MODES } from './schema.js';
import { STUDY_ITEMS } from './corpus.js';
import { COVERAGE } from './coverage.js';

/* ------------------------------------------------------------------ *
 * Spaced repetition
 *
 * A record is kept per (item, mastery dimension). Interval growth is
 * SM-2 shaped, then modified by confidence, response time and the
 * number of times this item has previously lapsed.
 * ------------------------------------------------------------------ */

export const DAY_MS = 86400000;

export function blankMastery() {
  return { reps: 0, lapses: 0, ease: 2.4, intervalDays: 0, due: 0, streak: 0, attempts: 0, correct: 0, avgMs: 0, confidenceSum: 0, confidenceN: 0, lastSeen: 0 };
}

/*
 * outcome: { correct:boolean, confidence:0..3, ms:number, expectedMs:number }
 * confidence 0 = guessed, 1 = unsure, 2 = fairly sure, 3 = certain.
 */
export function schedule(prev, outcome, now = Date.now()) {
  const rec = { ...blankMastery(), ...(prev || {}) };
  const conf = Math.max(0, Math.min(3, outcome.confidence ?? 2));
  const expected = outcome.expectedMs || 12000;
  const slow = outcome.ms > expected * 1.6;
  const fast = outcome.ms < expected * 0.6;

  rec.attempts += 1;
  rec.lastSeen = now;
  rec.avgMs = rec.avgMs ? Math.round(rec.avgMs * 0.7 + outcome.ms * 0.3) : outcome.ms;
  rec.confidenceSum += conf;
  rec.confidenceN += 1;

  if (outcome.correct) {
    rec.correct += 1;
    rec.streak += 1;
    rec.reps += 1;
    /* Confident and quick is worth more interval than hesitant and slow. */
    let quality = 3 + (conf >= 3 ? 1 : 0) + (fast ? 1 : 0) - (slow ? 1 : 0) - (conf <= 1 ? 1 : 0);
    quality = Math.max(2, Math.min(5, quality));
    rec.ease = Math.max(1.3, Math.min(3.0, rec.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))));
    if (rec.reps === 1) rec.intervalDays = 1;
    else if (rec.reps === 2) rec.intervalDays = conf <= 1 ? 2 : 3;
    else rec.intervalDays = Math.max(1, Math.round(rec.intervalDays * rec.ease));
    /* Repeat offenders get pulled back regardless of how well this rep went. */
    if (rec.lapses >= 3) rec.intervalDays = Math.max(1, Math.min(rec.intervalDays, 4));
    else if (rec.lapses === 2) rec.intervalDays = Math.max(1, Math.min(rec.intervalDays, 9));
    /* Confidently wrong in the past, or answered slowly now — cap the jump. */
    if (slow) rec.intervalDays = Math.max(1, Math.round(rec.intervalDays * 0.7));
  } else {
    rec.lapses += 1;
    rec.streak = 0;
    rec.reps = 0;
    /* Being confidently wrong is the worst case: it means the wrong thing is well learned. */
    const penalty = conf >= 2 ? 0.35 : 0.2;
    rec.ease = Math.max(1.3, rec.ease - penalty);
    rec.intervalDays = 0;
  }
  rec.due = now + Math.max(0, rec.intervalDays) * DAY_MS;
  if (!outcome.correct) rec.due = now + 10 * 60 * 1000; /* back within the same session */
  return rec;
}

/*
 * Delayed recall only means something on the first attempt after a real gap.
 * Answering correctly three times inside one session says nothing about
 * whether it survived a night's sleep, so the caller checks this against the
 * record as it stood *before* the current attempt was folded in.
 * 20h rather than 24h so a morning session still counts against an evening one.
 */
export const DELAY_THRESHOLD_MS = 20 * 60 * 60 * 1000;

export function isDelayedAttempt(prevRec, now = Date.now()) {
  if (!prevRec || !prevRec.attempts || !prevRec.lastSeen) return false;
  return (now - prevRec.lastSeen) >= DELAY_THRESHOLD_MS;
}

export function masteryScore(rec) {
  if (!rec || !rec.attempts) return 0;
  const accuracy = rec.correct / rec.attempts;
  const depth = Math.min(1, rec.reps / 4);
  const confidence = rec.confidenceN ? rec.confidenceSum / (rec.confidenceN * 3) : 0.5;
  const penalty = Math.min(0.35, rec.lapses * 0.07);
  return Math.max(0, Math.min(1, accuracy * 0.5 + depth * 0.3 + confidence * 0.2 - penalty));
}

export function isDue(rec, now = Date.now()) {
  if (!rec || !rec.attempts) return true;
  return rec.due <= now;
}

/*
 * Five-tier mastery ladder for the dashboard. Pure function over a score
 * (masteryScore()'s 0..1 output) and an attempted flag — no storage access,
 * so it's testable without a browser.
 */
export const TIER_LABELS = ['Not started', 'Seen', 'Recognised', 'Recalled', 'Mastered'];

export function tierFor(score, attempted) {
  if (!attempted) return 0;
  if (score >= 0.85) return 4;
  if (score >= 0.65) return 3;
  if (score >= 0.4) return 2;
  return 1;
}

export function dimensionFor(question) {
  if (question.image) return 'location';
  if (question.type === 'typed' || question.type === 'cloze') return 'typedRecall';
  return (ITEM_TYPES[question.type] || {}).dimension || 'recognition';
}
