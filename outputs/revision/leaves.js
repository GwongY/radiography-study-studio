/*
 * Revision leaves — the depth under a topic, one row per structure.
 *
 * Pure: no DOM, so work/ runs the same merge the app does. A row names its
 * parent (a topic, or a row earlier in the list), the week it was taught, the
 * slide page it comes from, and the few fields its kind needs. The links
 * between rows are DERIVED from those fields: a muscle's actions become its
 * links to the joints it moves, a bone's joints become "forms", a nerve's
 * targets become "supplies". So a few hundred leaves need no hand-written link
 * list, and the merged NODES / EDGES / TREE go through the week rule unchanged.
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md has the model.
 *
 * A row:
 *   { k, id, l, parent, w, src: [sourceId, page, page…], match?, old?, line?, note?,
 *     joints?, supplies?, from?, links?, s? }
 *   k        group | muscle | bone | joint | nerve | part
 *   joints   muscle: { jointId: 'action at that joint' }   bone: [jointId…]
 *   moves    muscle: { id: 'action' } on a structure that is not a joint (the eyeball, the tongue, the mandible)
 *   supplies nerve: { targetId: 'reason' }                 from: parent nerve or plexus
 *   links    any:    { id: 'reason' } for a link the fields above cannot say
 *   match    the words to look for on the cited page when the slide names it differently
 *   old      the row comes from an older deck because the 2026 slides do not name it
 */

export const KINDS = ['group', 'muscle', 'bone', 'joint', 'nerve', 'part'];
const KIND_SYS = { muscle: 'musc', bone: 'skel', joint: 'skel', nerve: 'pns' };

const escHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

/** The one line a leaf shows under its name. */
export function leafLine(row) {
  if (row.k === 'muscle') return [Object.values({ ...(row.joints || {}), ...(row.moves || {}) }).join('; '), row.note].filter(Boolean).join(' · ');
  if (row.k === 'nerve' && !row.line) return [...new Set(Object.values(row.supplies || {}))].join(', ');
  return row.line || '';
}

function leafNote(row, line, sources) {
  const [sid, ...pages] = row.src || [];
  const from = sources[sid] || sid || 'no source';
  const where = pages.length ? `${from}, p${pages.join(', ')}` : from;
  const old = row.old ? ' · an older deck: the 2026 slides do not name it' : '';
  return `${line ? escHTML(line) : ''}<p class="rv-src">From ${escHTML(where)}${old}</p>`;
}

/**
 * The topics, links and tree with the rows added.
 * Throws when a row's parent is neither a topic nor an earlier row: the tree
 * has one parent per node, so a row cannot hang in the air.
 */
export function mergeLeaves(data, rows, sources = {}) {
  const nodes = data.NODES.slice();
  const edges = data.EDGES.slice();
  const tree = JSON.parse(JSON.stringify(data.TREE));
  const sysOf = new Map(data.NODES.map((n) => [n.id, n.s]));
  const specOf = new Map();
  (function walk(s) { if (s.id) specOf.set(s.id, s); (s.kids || []).forEach(walk); })(tree);
  const seen = new Set(edges.map((e) => pairKey(e[0], e[1])));
  /* A row named exactly like its parent topic (Brainstem under Brainstem) would draw the same box twice, one inside the
     other. It is folded into the parent: its own rows hang straight from the parent, and its links end there. */
  const alias = {};
  const labelOf = new Map(data.NODES.map((n) => [n.id, n.l]));
  const to = (id) => alias[id] || id;
  const link = (a0, b0, why) => { const a = to(a0), b = to(b0); if (a === b) return; const k = pairKey(a, b); if (seen.has(k)) return; seen.add(k); edges.push([a, b, why]); };

  for (const row of rows) {
    const parent = specOf.get(row.parent);
    if (!parent) throw new Error(`revision leaf ${row.id}: parent ${row.parent} is not a topic or an earlier row`);
    if (labelOf.has(row.parent) && String(labelOf.get(row.parent)).toLowerCase() === String(row.l).toLowerCase()) {
      alias[row.id] = row.parent; specOf.set(row.id, parent); sysOf.set(row.id, sysOf.get(row.parent)); continue;
    }
    const s = row.s || KIND_SYS[row.k] || sysOf.get(row.parent);
    sysOf.set(row.id, s); labelOf.set(row.id, row.l);
    const line = leafLine(row);
    nodes.push({ id: row.id, l: row.l, s, w: [row.w], t: leafNote(row, line, sources), leaf: row.k, line, src: row.src, old: !!row.old });
    const spec = { id: row.id };
    (parent.kids = parent.kids || []).push(spec);
    specOf.set(row.id, spec);
  }
  for (const row of rows) {
    if (row.k === 'muscle') {
      for (const [j, act] of Object.entries(row.joints || {})) link(row.id, j, act);
      for (const [t, act] of Object.entries(row.moves || {})) link(row.id, t, act);
    }
    if (row.k === 'bone') for (const j of row.joints || []) link(row.id, j, 'forms');
    if (row.k === 'nerve') {
      for (const [t, why] of Object.entries(row.supplies || {})) link(row.id, t, why);
      if (row.from) link(row.id, row.from, 'branch of');
    }
    for (const [t, why] of Object.entries(row.links || {})) link(row.id, t, why);
  }
  return { NODES: nodes, EDGES: edges, TREE: tree, ALIAS: alias };
}

/**
 * The data without one body-system colour group: its headings, the rows that hang
 * from them, every link that ends at either, and its branch of the tree. Used to
 * leave a group's notes in the data while the map does not show them (the Tissues
 * & cells notes are physiology's, not anatomy's).
 */
export function dropSystem(base, rows, sys) {
  const gone = new Set(base.NODES.filter((n) => n.s === sys).map((n) => n.id));
  const kept = [];
  for (const row of rows) {
    if (gone.has(row.parent)) { gone.add(row.id); continue; }
    kept.push(row);
  }
  const clean = (row) => {
    const out = { ...row };
    for (const key of ['links', 'supplies', 'joints', 'moves']) {
      const v = out[key]; if (!v) continue;
      if (Array.isArray(v)) out[key] = v.filter((id) => !gone.has(id));
      else out[key] = Object.fromEntries(Object.entries(v).filter(([id]) => !gone.has(id)));
    }
    if (gone.has(out.from)) delete out.from;
    return out;
  };
  const prune = (spec) => (spec.id && gone.has(spec.id) ? [] : [{ ...spec, ...(spec.kids ? { kids: spec.kids.flatMap(prune) } : {}) }]);
  const tree = prune(base.TREE)[0];
  const tidy = (spec) => ({ ...spec, ...(spec.kids ? { kids: spec.kids.map(tidy).filter((k) => k.id || (k.kids || []).length) } : {}) });
  return {
    base: {
      NODES: base.NODES.filter((n) => !gone.has(n.id)),
      EDGES: base.EDGES.filter((e) => !gone.has(e[0]) && !gone.has(e[1])),
      TREE: tidy(tree),
    },
    rows: kept.map(clean),
  };
}
