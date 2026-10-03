/*
 * Weekly briefing — the file format, and nothing else.
 *
 * A weekly briefing is a summary of the reader's own university email, written
 * by the Sunday task and pushed to the PRIVATE pack repository. It is read on
 * Today with the same read-only token question-pack.js already holds. This
 * repository and its deployed site are public, so the briefing is never in
 * outputs/, never in the SW shell, never in the answer log or the export.
 *
 * Pure and import-free on purpose: work/weekly-briefing.mjs validates with this
 * same function before it pushes, so the writer and the reader cannot disagree
 * about what a valid file is.
 */
export const BRIEFING_PATH = 'briefing/latest.json';
export const BRIEFING_PRIORITIES = ['urgent', 'normal', 'check'];
export const MAX_NOTICES = 100;
export const MAX_SKIPPED = 300;

const isoWithOffset = (s) => typeof s === 'string' && /T.*(?:Z|[+-]\d\d:\d\d)$/.test(s) && Number.isFinite(Date.parse(s));
const text = (s, max) => typeof s === 'string' && s.trim().length > 0 && s.length <= max;

/* Returns null when valid, or the first problem as a sentence. */
export function briefingProblem(b) {
  if (!b || typeof b !== 'object') return 'Not a briefing object.';
  if (b.version !== 1) return `Unsupported version ${b.version}.`;
  for (const k of ['generatedAt', 'coverageStart', 'coverageEnd']) {
    if (!isoWithOffset(b[k])) return `${k} must be an ISO timestamp with an offset.`;
  }
  if (Date.parse(b.coverageEnd) < Date.parse(b.coverageStart)) return 'coverageEnd is before coverageStart.';
  if (!Array.isArray(b.notices)) return 'notices must be an array.';
  if (b.notices.length > MAX_NOTICES) return `More than ${MAX_NOTICES} notices.`;
  if (!Array.isArray(b.skipped)) return 'skipped must be an array.';
  if (b.skipped.length > MAX_SKIPPED) return `More than ${MAX_SKIPPED} skipped lines.`;
  if (b.incomplete != null && typeof b.incomplete !== 'string') return 'incomplete must be a string or absent.';
  const ids = new Set();
  for (const [i, n] of b.notices.entries()) {
    const at = `Notice ${i + 1}`;
    if (!n || typeof n !== 'object') return `${at} is not an object.`;
    if (!text(n.id, 160)) return `${at} has no id.`;
    if (ids.has(n.id)) return `${at} repeats id ${n.id}.`;
    ids.add(n.id);
    if (!text(n.title, 500)) return `${at} has no title.`;
    if (!text(n.summary, 3000)) return `${at} has no summary.`;
    if (!BRIEFING_PRIORITIES.includes(n.priority)) return `${at} priority must be urgent, normal or check.`;
    if (!text(n.action, 1000)) return `${at} has no action.`;
    if (n.deadline != null && !isoWithOffset(n.deadline)) return `${at} deadline must be null or ISO with an offset.`;
    const s = n.source;
    if (!s || typeof s !== 'object') return `${at} has no source.`;
    if (!/^[a-f0-9]+$/i.test(s.threadId || '')) return `${at} source.threadId must be hexadecimal.`;
    if (!text(s.from, 500)) return `${at} source.from is missing.`;
    if (!isoWithOffset(s.receivedAt)) return `${at} source.receivedAt must be ISO with an offset.`;
    if (!text(s.quote, 3000)) return `${at} source.quote is missing.`;
  }
  for (const [i, s] of b.skipped.entries()) {
    if (!text(s, 1000)) return `Skipped line ${i + 1} is empty or too long.`;
  }
  return null;
}

/* Urgent first, then normal, then check; within a band, nearest deadline first. */
export function orderNotices(notices) {
  const rank = (p) => BRIEFING_PRIORITIES.indexOf(p);
  const when = (n) => (n.deadline ? Date.parse(n.deadline) : Infinity);
  return notices.slice().sort((a, b) => rank(a.priority) - rank(b.priority) || when(a) - when(b));
}
