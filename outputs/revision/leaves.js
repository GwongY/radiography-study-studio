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
 *   k        group | muscle | bone | joint | nerve | part | cell | substance | process
 *   joints   muscle: { jointId: 'action at that joint' }   bone: [jointId…]
 *   moves    muscle: { id: 'action' } on a structure that is not a joint (the eyeball, the tongue, the mandible)
 *   supplies nerve: { targetId: 'reason' }                 from: parent nerve or plexus
 *   links    any:    { id: 'reason' } for a link the fields above cannot say
 *   makes    part or cell: { substanceId: 'secretes …' }        acts  substance: { targetId: 'effect' }
 *   next     process: { processOrTopicId: 'leads to …' }         own   one sentence in the app's own words
 *            (spec 2026-10-19-physiology-revise.md: physiology leaves)
 *   match    the words to look for on the cited page when the slide names it differently
 *   old      the row comes from an older deck because the 2026 slides do not name it
 */

export const KINDS = ['group', 'muscle', 'bone', 'joint', 'nerve', 'part', 'cell', 'substance', 'process'];
const KIND_SYS = { muscle: 'musc', bone: 'skel', joint: 'skel', nerve: 'pns' };

const escHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

/** The one line a leaf shows under its name. */
export function leafLine(row) {
  if (row.k === 'muscle') return [Object.values({ ...(row.joints || {}), ...(row.moves || {}) }).join('; '), row.note].filter(Boolean).join(' · ');
  if (row.k === 'nerve' && !row.line) return [...new Set(Object.values(row.supplies || {}))].join(', ');
  if (row.k === 'substance' && !row.line) return [...new Set(Object.values(row.acts || {}))].join(', ');
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
    nodes.push({ id: row.id, l: row.l, s, w: [row.w], t: leafNote(row, line, sources), leaf: row.k, line, src: row.src, old: !!row.old, ...(row.own ? { own: row.own } : {}), ...(row.viewer === false ? { viewer: false } : {}) });
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
    if (row.k === 'substance') for (const [t, why] of Object.entries(row.acts || {})) link(row.id, t, why);
    if (row.k === 'part' || row.k === 'cell') for (const [t, why] of Object.entries(row.makes || {})) link(row.id, t, why);
    if (row.k === 'process') for (const [t, why] of Object.entries(row.next || {})) link(row.id, t, why);
    for (const [t, why] of Object.entries(row.links || {})) link(row.id, t, why);
  }
  return { NODES: nodes, EDGES: edges, TREE: tree, ALIAS: alias };
}

/**
 * Threads written as data (physiology) name the map boxes each step is about (`ids`). Every such box
 * gets the thread under "Pathways through this topic" (`th`), with the first week a step names it
 * (`thWk`): a box can be taught before the step that links it, and the link waits for that step.
 * Returns new nodes; the input is left alone.
 */
export function linkThreads(nodes, threads) {
  const at = new Map();
  for (const t of threads) for (const s of t.steps) for (const id of s.ids || []) {
    const m = at.get(id) || new Map();
    m.set(t.id, Math.min(m.has(t.id) ? m.get(t.id) : Infinity, s.wk));
    at.set(id, m);
  }
  return nodes.map((n) => {
    const m = at.get(n.id);
    if (!m) return n;
    return { ...n, th: [...new Set([...(n.th || []), ...m.keys()])], thWk: { ...(n.thWk || {}), ...Object.fromEntries(m) } };
  });
}

/**
 * The Brain 3D tour of a thread that has no hand-made one: the boxes its steps name, each lifted to the
 * topic it hangs under (`data` is mergeLeaves' result), in step order, without repeats.
 */
export function threadTour(thread, data) {
  const parent = new Map();
  (function walk(s) { for (const k of s.kids || []) { if (s.id) parent.set(k.id, s.id); walk(k); } })(data.TREE);
  const leaf = new Set(data.NODES.filter((n) => n.leaf).map((n) => n.id));
  const topic = (id) => { let x = id; while (leaf.has(x) && parent.has(x)) x = parent.get(x); return x; };
  const stops = [];
  for (const s of thread.steps) for (const id of s.ids || []) { const t = topic(id); if (!stops.includes(t)) stops.push(t); }
  return { th: thread.id, stops };
}

/**
 * Topics written like rows (physiology): { id, l, s, w, src, line?, own?, match?, th?, viewer? }.
 * The note is made the way a leaf's is, so a topic says only what its slide says,
 * and work/revision-check.mjs holds its name to the page it cites. A topic is not
 * a viewer target unless it says `viewer: true` (physiology topics are processes).
 */
export function topicNodes(topics, sources = {}) {
  return topics.map((t) => {
    const line = t.line || '';
    return {
      id: t.id, l: t.l, s: t.s, w: Array.isArray(t.w) ? t.w.slice() : [t.w],
      t: leafNote(t, line, sources), line, src: t.src, viewer: t.viewer === true,
      ...(t.th ? { th: t.th } : {}), ...(t.own ? { own: t.own } : {}), ...(t.match ? { match: t.match } : {}),
    };
  });
}

