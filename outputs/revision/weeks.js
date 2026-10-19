/*
 * Revision weeks — what "revise through week N" means.
 *
 * Pure: no DOM, no storage, so work/revision-check.mjs runs the same rules.
 *
 * The map is ONE growing thing. A topic is first taught in the earliest week
 * of its `w` list and from then on belongs to every N at or above it; nothing
 * is ever drawn for a week the student has not reached, and no week has a map
 * of its own. docs/superpowers/specs/2026-10-18-revision-map.md has the rule.
 */

/** The week a topic first appears: the earliest week it was taught. */
export function firstWeek(node) {
  return Math.min(...node.w);
}

/** The last week a dataset has anything for — a chip beyond it would be empty. */
export function lastWeekOf(data) {
  return Math.max(...data.NODES.map(firstWeek));
}

export function clampWeek(n, last) {
  const w = Math.round(Number(n));
  if (!Number.isFinite(w)) return last;
  return Math.max(1, Math.min(last, w));
}

/**
 * The week to revise through when the student has not chosen one.
 *
 * `teachingWeek` is what schedule.js's weekOf() says for now: 1..13 inside the
 * term, null outside it. Before week 1 the answer is 1 (the first thing to
 * revise is the first thing taught), and after the term — or in a week the
 * subject has no content for yet — it is the last week with content.
 */
export function autoWeek(teachingWeek, beforeTerm, last) {
  if (teachingWeek == null) return beforeTerm ? 1 : last;
  return clampWeek(teachingWeek, last);
}

/**
 * Which week applies, given what was saved. A saved manual choice wins and is
 * re-clamped (the dataset may have grown or shrunk since it was saved); anything
 * else is automatic.
 */
export function resolveWeek(pref, auto, last) {
  if (pref && pref.mode === 'manual' && pref.week != null) {
    return { week: clampWeek(pref.week, last), mode: 'manual' };
  }
  return { week: clampWeek(auto, last), mode: 'auto' };
}

/** ids of every topic taught by week n. */
export function visibleIds(data, n) {
  const ids = new Set();
  for (const node of data.NODES) if (firstWeek(node) <= n) ids.add(node.id);
  return ids;
}

/**
 * The tree, cut down to what week n shows.
 *
 * A topic stays if it is taught by n. A heading with no topic of its own stays
 * if anything under it does. A topic taught LATER than n is never drawn, not
 * even dimmed: what hangs from it and is taught moves up to the nearest drawn
 * parent, so the map holds only what has been learnt.
 */
export function pruneTree(data, n) {
  const byId = new Map(data.NODES.map((x) => [x.id, x]));
  const walk = (spec) => {
    const kids = (spec.kids || []).flatMap(walk);
    if (spec.id) return firstWeek(byId.get(spec.id)) <= n ? [{ ...spec, kids }] : kids;
    return kids.length || !spec.kids ? [{ ...spec, kids }] : [];
  };
  return { tree: walk(data.TREE)[0] || { ...data.TREE, kids: [] } };
}

/** A cross-link is drawn only when both of its topics are. */
export function visibleEdges(data, ids) {
  return data.EDGES.filter((e) => ids.has(e[0]) && ids.has(e[1]));
}

/** A step (thread step, table row, decoder row) shows once its week is reached. */
export function weekShows(wk, n) {
  return Number(wk) <= n;
}

/** Topics whose first week is exactly n — the ones this week added. */
export function newIds(data, n) {
  return new Set(data.NODES.filter((x) => firstWeek(x) === n).map((x) => x.id));
}
