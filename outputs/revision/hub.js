/*
 * Revise · 3D connections hub — where each ball goes.
 *
 * Pure: no three.js, no DOM, so work/revise-pure-check.mjs runs it. The topic
 * you chose sits at the centre. What it links to sits on a sphere round it
 * (shell 1), grouped by body system; the topic it hangs from on the Map sits at
 * the top; the next step out (shell 2) is spread over a larger sphere, so the
 * whole reads as a ball. Same input, same output: no randomness and no force
 * simulation, so a topic you come back to looks the way it did.
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md.
 */

/* Sizes in the 3D library's units. GAP1 is wide enough for a name at phone width. */
export const HUB = { R1: 110, R2: 200, MAX1: 14, MAX2: 30, GAP1: 0.5, GAP2: 0.24, BAND: 0.65, YMAX: 0.8 };
export const SYSORDER = ['cns', 'pns', 'musc', 'skel', 'tissue', 'sense', 'cv'];
const GOLD = Math.PI * (3 - Math.sqrt(5));
const TOP = [0, 1, 0];

const len = (v) => Math.hypot(v[0], v[1], v[2]);
const unit = (v) => { const l = len(v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sysRank = (s) => { const i = SYSORDER.indexOf(s); return i < 0 ? SYSORDER.length : i; };
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** The angle between two directions, in radians. */
export function angle(a, b) {
  const d = (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / ((len(a) * len(b)) || 1);
  return Math.acos(Math.max(-1, Math.min(1, d)));
}

/** Which direct links get a ball (the `max` with most links) and which wait behind "+N more". */
export function pickFirst(first, max = HUB.MAX1) {
  const ranked = first.slice().sort((a, b) => (b.deg - a.deg) || byId(a, b));
  const shown = ranked.slice(0, max).sort((a, b) => (sysRank(a.sys) - sysRank(b.sys)) || byId(a, b));
  const more = ranked.slice(max).map((n) => n.id).sort();
  return { shown, more };
}

/* Keep a direction on the unit sphere with |y| <= yMax. */
function clampY(d, yMax) {
  if (Math.abs(d[1]) <= yMax) return d;
  const y = Math.sign(d[1]) * yMax; const r = Math.sqrt(1 - y * y); const h = Math.hypot(d[0], d[2]);
  return h < 1e-9 ? [r, y, 0] : [d[0] / h * r, y, d[2] / h * r];
}

/**
 * Push apart directions closer than `gap`. `fixed` directions push but never
 * move. A pair moves apart along the chord between them, which on a unit sphere
 * opens the angle by about the same amount. Deterministic: fixed order, no
 * randomness, and a coincident pair is split along a fixed axis.
 */
export function separate(dirs, gap, fixed = [], yMax = 1, passes = 300) {
  for (let p = 0; p < passes; p++) {
    let moved = false;
    for (let i = 0; i < dirs.length; i++) {
      const push = (other, j) => {
        const a = dirs[i]; const ang = angle(a, other);
        if (ang >= gap) return;
        let d = [a[0] - other[0], a[1] - other[1], a[2] - other[2]];
        if (len(d) < 1e-9) d = cross(a, [0, 0, 1]);
        if (len(d) < 1e-9) d = [1, 0, 0];
        const both = j !== undefined;
        const k = ((gap - ang) * (both ? 0.5 : 1) + 1e-4) / len(d);
        dirs[i] = clampY(unit([a[0] + d[0] * k, a[1] + d[1] * k, a[2] + d[2] * k]), yMax);
        if (both) dirs[j] = clampY(unit([other[0] - d[0] * k, other[1] - d[1] * k, other[2] - d[2] * k]), yMax);
        moved = true;
      };
      for (let j = i + 1; j < dirs.length; j++) push(dirs[j], j);
      for (const f of fixed) push(f);
    }
    if (!moved) break;
  }
  return dirs;
}

/**
 * first   [{ id, sys, deg }]  the centre's direct links
 * parent  the topic the centre hangs from on the Map, or null
 * second  [{ id, via }]       links of the direct links, in a stable order
 * Returns positions (the centre is the origin and is not listed), and what is
 * shown, what waits behind "+N more", and which ball each faint one hangs from.
 */
export function hubLayout({ first = [], parent = null, second = [] } = {}) {
  const { shown, more } = pickFirst(first.filter((n) => n.id !== parent));
  const k = shown.length;
  const d1 = shown.map((_, i) => {
    const y = k === 1 ? 0 : HUB.BAND - (2 * HUB.BAND * (i + 0.5)) / k;
    const r = Math.sqrt(1 - y * y); const th = Math.PI / 2 + i * GOLD;
    return [Math.cos(th) * r, y, Math.sin(th) * r];
  });
  separate(d1, HUB.GAP1, parent ? [TOP] : [], HUB.YMAX);
  const at = (d, r) => ({ x: d[0] * r, y: d[1] * r, z: d[2] * r });
  const pos = {};
  shown.forEach((n, i) => { pos[n.id] = at(d1[i], HUB.R1); });
  if (parent) pos[parent] = at(TOP, HUB.R1 * 1.05);

  const dirOf = Object.fromEntries(shown.map((n, i) => [n.id, d1[i]]));
  const taken = new Set(shown.map((n) => n.id).concat(parent ? [parent] : []));
  const s2 = [];
  for (const s of second) {
    if (s2.length >= HUB.MAX2) break;
    if (taken.has(s.id) || !dirOf[s.via]) continue;
    taken.add(s.id); s2.push(s);
  }
  const perVia = {};
  const d2 = s2.map((s) => {
    const b = dirOf[s.via]; const j = (perVia[s.via] = (perVia[s.via] || 0) + 1);
    const t1 = unit(cross(b, Math.abs(b[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0])); const t2 = cross(b, t1);
    const a = j * GOLD; const off = 0.32;
    return unit([0, 1, 2].map((c) => b[c] + off * (Math.cos(a) * t1[c] + Math.sin(a) * t2[c])));
  });
  separate(d2, HUB.GAP2, d1.concat(parent ? [TOP] : []), 1);
  s2.forEach((s, i) => { pos[s.id] = at(d2[i], HUB.R2); });
  return {
    pos,
    parent: parent || null,
    shown: shown.map((n) => n.id),
    more,
    second: s2.map((s) => s.id),
    via: Object.fromEntries(s2.map((s) => [s.id, s.via])),
  };
}
