/*
 * Revision rules — the owner's standing rules for Revise as pure functions, so
 * the app (study/revise.js) and work/revision-check.mjs apply the same ones.
 * No DOM. docs/superpowers/specs/2026-10-19-physiology-revise.md, section 2.
 */

/* ---- rule 4: every row's notes say something useful ---- */

/** Shorter than this, a slide line is a label ("x2", "8 pairs"), not a sentence. */
export const USEFUL_MIN = 25;
const FRAGMENT = /^[\s\d().,;:x×~–\-+/%<>=≈]*$/i;

/** True when a slide line says something on its own: 25+ characters, not a count, three or more words. */
export function lineIsUseful(line) {
  const s = String(line || '').trim();
  if (s.length < USEFUL_MIN || FRAGMENT.test(s)) return false;
  return s.split(/\s+/).filter((w) => /[a-z]{2,}/i.test(w)).length >= 3;
}

/** A row (or a sourced topic) needs an own-words sentence when its slide line is not useful. */
export function needsOwn(node) {
  return !lineIsUseful(node && node.line);
}

const letters = (s) => String(s || '').toLowerCase().replace(/[^a-z]+/g, ' ').trim();

/**
 * What is wrong with an own-words sentence, as a list (empty = fine). Own words
 * may not carry a number (numbers come from a slide line) or a star (the ★ marks a focus row and is drawn by the app), and must be a real
 * sentence about the row.
 */
export function ownProblems(own, label) {
  const s = String(own || '').trim();
  if (!s) return ['missing'];
  const out = [];
  if (s.length < 40) out.push('under 40 characters');
  if (s.length > 220) out.push('over 220 characters');
  if (!s.endsWith('.')) out.push('no full stop at the end');
  if (/\d/.test(s)) out.push('a digit (numbers come only from a slide line)');
  if (/[★*]/.test(s)) out.push('a star (the ★ marks a focus row and is drawn by the app, not written)');
  if (letters(s) === letters(label)) out.push('only the name');
  return out;
}

/* ---- the owner's answers 6 and 7: 廣東話 lines and textbook facts add nothing unsourced ---- */

/**
 * What is wrong with a thread's 廣東話 line (empty = fine). It retells the
 * thread's own steps, so every English word (three letters or more) and every
 * number in it must already be in one of them.
 */
export function yueProblems(yue, stepTexts) {
  const s = String(yue || '').trim();
  if (!s) return ['missing'];
  const out = [];
  if (s.length > 400) out.push('over 400 characters');
  if (!/[一-鿿]/.test(s)) out.push('no Chinese');
  if (/[★*]/.test(s)) out.push('a star');
  const said = stepTexts.join(' ').toLowerCase();
  const extra = [...new Set((s.match(/[A-Za-z]{3,}|\d+(?:\.\d+)?/g) || []).filter((w) => !said.includes(w.toLowerCase())))];
  if (extra.length) out.push(`not in the steps: ${extra.slice(0, 6).join(', ')}`);
  return out;
}

/**
 * What is wrong with a textbook fact on a thread step (empty = fine): one
 * sentence, a PDF page of the Martini textbook, and a chapter the step's own
 * lecture deck is built on (`chapters`, from the registry's `decks`).
 */
export function starProblems(star, chapters) {
  const st = star || {};
  const t = String(st.text || '').trim();
  const out = [];
  if (t.length < 20 || t.length > 200) out.push('text not 20 to 200 characters');
  if (!t.endsWith('.')) out.push('no full stop at the end');
  if (!Number.isInteger(st.page) || st.page < 1) out.push('no textbook page');
  if (!(chapters || []).includes(st.ch)) out.push(`chapter ${st.ch} is not one the lecture is built on (${(chapters || []).join(', ')})`);
  return out;
}

/* ---- the owner's answer 8: a box can point at the same thing in the other subject ---- */

/**
 * The far ends of the cross-subject links at (subject, id) that are taught by
 * `week`. cross: [{ a: [subject, id], b: [subject, id], why, src, match }];
 * firstWeek(subject, id) is that box's first week, or null when it does not exist.
 */
export function crossFor(cross, subject, id, week, firstWeek) {
  const out = [];
  for (const c of cross || []) {
    const far = c.a[0] === subject && c.a[1] === id ? c.b : c.b[0] === subject && c.b[1] === id ? c.a : null;
    if (!far) continue;
    const w = firstWeek(far[0], far[1]);
    if (w != null && w <= week) out.push({ subject: far[0], id: far[1], why: c.why, src: c.src });
  }
  return out;
}

/* ---- rule 7: a viewer button only where a structure can exist ---- */

export const VIEWER_KINDS = new Set(['part', 'muscle', 'bone', 'joint', 'nerve']);

/** Whether "Show in the viewer" may be offered. The viewer's own search still decides whether it is. */
export function viewerEligible(node) {
  if (!node || node.viewer === false) return false;
  if (!node.leaf) return true;
  return VIEWER_KINDS.has(node.leaf);
}

/* ---- rule 6: the legend holds what is taught, colours stay apart ---- */

/** The body-system keys of the nodes on screen. */
export function legendKeys(data, ids) {
  const byId = new Map(data.NODES.map((n) => [n.id, n]));
  return new Set([...ids].map((id) => byId.get(id)).filter(Boolean).map((n) => n.s));
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
  const c = rgb(h).map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
export const colourDistance = (a, b) => { const p = rgb(a), q = rgb(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };

/** The legend chip's background in #reviseView (app.css --rv-surface). */
export const LEGEND_SURFACE = '#162428';
export const MIN_DISTANCE = 50;
const HEX = /^#[0-9a-f]{6}$/i;

/** Every problem with the subjects' colour groups, as sentences (empty = fine). */
export function checkSystems(subjects) {
  const out = [];
  const owner = new Map();
  const byCol = new Map();
  for (const sub of subjects) {
    const sys = sub.systems || [];
    const keys = new Set(sys.map((s) => s.key));
    if (!sys.length) out.push(`${sub.id}: no systems listed`);
    if (keys.size !== sys.length) out.push(`${sub.id}: a system key is listed twice`);
    for (const s of sys) {
      if (!HEX.test(s.col) || (s.map && !HEX.test(s.map))) { out.push(`${sub.id} ${s.key}: colour is not #rrggbb`); continue; }
      if (owner.has(s.key)) out.push(`${s.key}: used by ${owner.get(s.key)} and ${sub.id}`); else owner.set(s.key, sub.id);
      if (contrast(s.col, LEGEND_SURFACE) < 4.5) out.push(`${sub.id} ${s.key}: under 4.5:1 on the legend`);
      const c = s.col.toLowerCase();
      const prev = byCol.get(c);
      if (prev && prev.sub !== sub.id && (!s.body || prev.body !== s.body)) out.push(`${sub.id} ${s.key}: same colour as ${prev.sub} ${prev.key} for a different body system`);
      if (!prev) byCol.set(c, { sub: sub.id, key: s.key, body: s.body });
    }
    for (let i = 0; i < sys.length; i++) {
      for (let j = i + 1; j < sys.length; j++) {
        if (HEX.test(sys[i].col) && HEX.test(sys[j].col) && colourDistance(sys[i].col, sys[j].col) < MIN_DISTANCE) out.push(`${sub.id}: ${sys[i].key} and ${sys[j].key} are too alike`);
      }
    }
    const stray = ((sub.data && sub.data.NODES) || []).find((n) => !keys.has(n.s));
    if (stray) out.push(`${sub.id}: ${stray.id} has system ${stray.s}, not in the list`);
    for (const k of sub.hubOrder || []) if (!keys.has(k)) out.push(`${sub.id}: hub order names ${k}, not a system`);
  }
  return out;
}

/* ---- rule 2: a row is taught in its deck's week, and that week had a lecture ---- */

/**
 * '' when the row's week is right, else why not. `decks` maps each source the
 * subject may cite to { weeks: [the teaching weeks its deck was lectured in] }
 * (two weeks when a deck runs over two lectures). The row's week must be one of
 * them and hold a lecture of `subject`: tutorials, labs and old decks are not
 * sources (owner, 19 Oct 2026).
 */
export function rowWeekOk(row, decks, sessions, subject) {
  const sid = (row.src || [])[0];
  const deck = decks[sid];
  if (!deck) return `source ${sid} is not one of the subject's decks`;
  if (!deck.weeks.includes(row.w)) return `week ${row.w}, deck weeks ${deck.weeks.join('/')}`;
  const held = sessions.some((s) => s.subject === subject && s.week === row.w && s.kind === 'lecture');
  return held ? '' : `no ${subject} lecture in week ${row.w}`;
}
