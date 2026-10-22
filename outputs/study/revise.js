/*
 * Revise
 *
 * The destination that replaced Learn. The app no longer teaches new chapters;
 * it links the ones already learnt. Five views over one week-gated dataset per
 * subject; the subject switch (setSubject) picks which.
 *
 * THE WEEK RULE lives in outputs/revision/weeks.js and is checked by
 * work/revision-check.mjs; this file only draws it. Revise through week N shows
 * everything taught in weeks 1..N and nothing after. N follows the teaching
 * week by itself (Auto) until the student picks a week, and goes back to
 * following it when they press Auto.
 *
 * Ported from the owner's HSS2011_build reference. Libraries (d3, markmap-view,
 * 3d-force-graph) are vendored in outputs/revision/vendor/ and loaded on first
 * use, so Today and the rest of the app pay nothing for them.
 */
import { $$, STORAGE_PREFIX, esc, weekOf, weekStart } from './imports.js';
import { read, write } from './storage-versioned-keys.js';
import { setActiveNav } from './navigation-destinations.js';
import { leaveProjection } from './what-is-under.js';
import { scrollViewTop, showView } from './small-ui-helpers.js';
import { glossifyNode } from './reading-help.js';
import { bindLinkList, markLinkRow, renderLinkList } from './revise-links.js';
import { DEFAULT_SUBJECT, REVISION } from '../revision/registry.js?v=1';
import { autoWeek, lastWeekOf, newIds, pruneTree, releasedLast, resolveWeek, visibleEdges, visibleIds } from '../revision/weeks.js?v=1';
import { linkRows } from '../revision/link-rows.js?v=1';
import { describe } from '../revision/describe.js?v=1';
import { OWN } from '../revision/own-words.js?v=1';
import { crossFor, legendKeys, viewerEligible } from '../revision/rules.js?v=1';
import { CROSS } from '../revision/cross-links.js?v=1';
import { UNIT_BOXES, VIEWER_UNITS } from '../revision/viewer-units.js?v=1';
import { openUnitInViewer } from './global-search.js';
import { openCellInViewer } from './search-viewer-open.js';
import { showIn3D } from '../cell-zoom.js?v=1';
import { createBrain } from './revise-brain.js';

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */

/* Body-system colour groups belong to the subject (registry `systems`); applySubject() writes their colours as
   --rv-c-<key> and --c-<key> on #reviseView. */
const sysOf = (k) => (subjectData().systems || []).find((s) => s.key === k) || { key: k, label: k };
const SUBJECT_KEY = `${STORAGE_PREFIX}revise:subject`;
/* The first week a box of any subject is taught, or null when that subject has no such box (rules.js crossFor). */
const firstWeekIn = (sub, nid) => { const n = REVISION[sub] && REVISION[sub].data.NODES.find((x) => x.id === nid); return n ? Math.min(...n.w) : null; };

const rv = {
  subject: DEFAULT_SUBJECT,
  week: 1,
  last: 1,
  mode: 'auto',
  tab: 'map',
  mounted: false,
};
/* Everything derived from (subject, week). Rebuilt by deriveWeek(). */
const ix = {
  byId: {}, ids: new Set(), edges: [], fresh: new Set(),
  PARENT: {}, KIDS: {}, LABEL: {}, NB: {}, DATA: null, threadTitles: {},
};
let map = null;
let brain = null;
const loaded = {};

const subjectData = () => REVISION[rv.subject];
const prefKey = () => `${STORAGE_PREFIX}revise:${rv.subject}`;

function loadScript(rel) {
  const src = new URL(`../revision/vendor/${rel}`, import.meta.url).href;
  if (!loaded[src]) {
    loaded[src] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => { delete loaded[src]; reject(new Error(`could not load ${rel}`)); };
      document.head.appendChild(s);
    });
  }
  return loaded[src];
}

/* ------------------------------------------------------------------ *
 * The week
 * ------------------------------------------------------------------ */

function calendarWeek() {
  const now = new Date();
  return { teaching: weekOf(now), before: now < weekStart(1) };
}
/* Auto means the last week taught by Thursday, not the one just starting: weeks 1-7 show until week 8's Thursday, when
   week 8 joins (the date is read four days ahead, which lands in the next week from Thursday, and one week is taken off). */
function autoNow(last = rv.last) {
  const c = calendarWeek();
  const ahead = weekOf(new Date(Date.now() + 4 * 864e5));
  return autoWeek(ahead == null ? null : Math.max(1, ahead - 1), c.before, last);
}

function savedPref(subject = rv.subject) {
  const p = read(`${STORAGE_PREFIX}revise:${subject}`, null);
  return p && typeof p === 'object' ? p : null;
}

/* The week Revise shows a subject at, whether or not Revise has been opened: the student's
   saved choice, else the calendar. Today, search and the viewer gate what they offer by it. */
export function weekFor(subject) {
  const sub = REVISION[subject];
  if (!sub) return null;
  if (rv.mounted && subject === rv.subject) return rv.week;
  const last = releasedLast(lastWeekOf(sub.data), sub.released);
  return resolveWeek(savedPref(subject), autoNow(last), last).week;
}
const visCache = new Map();
function visibleAt(subject, week) {
  const k = `${subject}:${week}`;
  if (!visCache.has(k)) visCache.set(k, visibleIds(REVISION[subject].data, week));
  return visCache.get(k);
}
const nodeCache = new Map();
function nodeOf(subject, id) {
  if (!nodeCache.has(subject)) nodeCache.set(subject, new Map(REVISION[subject].data.NODES.map((n) => [n.id, n])));
  return nodeCache.get(subject).get(id) || null;
}
const firstWk = (n) => Math.min(...n.w);

/* Choose a week. mode 'manual' sticks; 'auto' goes back to following the calendar. */
export function setWeek(n, mode) {
  const next = resolveWeek(mode === 'manual' ? { mode: 'manual', week: n } : null, autoNow(), rv.last);
  rv.week = next.week;
  rv.mode = next.mode;
  write(prefKey(), next.mode === 'manual' ? { mode: 'manual', week: next.week } : { mode: 'auto' });
  deriveWeek();
  paintAll();
}

function paintWeekBar() {
  /* a body-system colour appears in the key only once something of it is taught */
  const shown = legendKeys(subjectData().data, ix.ids);
  document.querySelectorAll('#reviseView [data-sys]').forEach((e) => { e.hidden = !shown.has(e.dataset.sys); });
  const bar = $$('rvWeekBar');
  const chips = [];
  for (let n = 1; n <= rv.last; n++) {
    chips.push(`<button type="button" class="rv-chip" data-week="${n}" aria-pressed="${n === rv.week}">W${n}</button>`);
  }
  bar.innerHTML = `<span class="rv-lab">Revise through</span>${chips.join('')}<button type="button" class="rv-chip rv-auto" data-auto="1" aria-pressed="${rv.mode === 'auto'}" title="Follow the teaching week by itself">Auto</button>`;
  bar.querySelectorAll('[data-week]').forEach((b) => { b.onclick = () => setWeek(Number(b.dataset.week), 'manual'); });
  bar.querySelector('[data-auto]').onclick = () => setWeek(autoNow(), 'auto');

  const c = calendarWeek();
  const total = `${ix.ids.size} topics · ${ix.edges.length} links${ix.fresh.size ? ` · ${ix.fresh.size} new in week ${rv.week}` : ''}`;
  let where;
  if (rv.mode === 'auto') {
    where = c.teaching == null
      ? (c.before ? 'The term has not started — showing week 1.' : `The term is over — showing everything, weeks 1–${rv.last}.`)
      : (rv.week >= rv.last
        ? `It is teaching week ${c.teaching}; weeks 1–${rv.last} are shown, the latest with notes.`
        : `Teaching week ${c.teaching} — weeks 1–${rv.week} are shown; week ${rv.week + 1} joins on Thursday.`);
  } else {
    where = `You chose week ${rv.week}. Press Auto to follow the teaching week${c.teaching != null ? ` (now week ${autoNow()})` : ''}.`;
  }
  $$('rvWeekNote').textContent = `${where} ${total}.`;
}

/* ------------------------------------------------------------------ *
 * The subject
 * ------------------------------------------------------------------ */

function paintSubjects() {
  const box = $$('rvSubjects');
  const subs = Object.values(REVISION);
  box.innerHTML = subs.length < 2 ? '' : subs.map((s) => `<button type="button" class="seg${s.id === rv.subject ? ' active' : ''}" data-subject="${esc(s.id)}" aria-pressed="${s.id === rv.subject}">${esc(s.copy.name)}</button>`).join('');
  box.querySelectorAll('[data-subject]').forEach((b) => { b.onclick = () => setSubject(b.dataset.subject); });
}

/* What belongs to the subject rather than the week: its colours, its legend (every entry hidden until
   paintWeekBar finds something of it taught), and its few words. */
function applySubject() {
  const sub = subjectData();
  const view = $$('reviseView');
  for (const s of sub.systems) {
    view.style.setProperty(`--rv-c-${s.key}`, s.col);
    view.style.setProperty(`--c-${s.key}`, s.map || s.col);
  }
  document.querySelectorAll('#reviseView .rv-legend').forEach((lg) => {
    const lab = lg.querySelector('.rv-lab');
    lg.textContent = '';
    if (lab) lg.appendChild(lab);
    lg.insertAdjacentHTML('beforeend', sub.systems.map((s) => `<span data-sys="${esc(s.key)}" hidden><i style="background:var(--rv-c-${esc(s.key)})"></i>${esc(s.label)}</span>`).join(''));
  });
  $$('rvFind').placeholder = sub.copy.findHint;
  $$('rvMm').setAttribute('aria-label', `Mind map of the topics learnt so far, grouped into ${sub.data.TREE.kids.length} branches. Use the Find box or the Jump to menu for a text route into the same content.`);
  paintSubjects();
}

/* Switch subject. Each subject keeps its own saved week (prefKey is per subject). */
export function setSubject(id) {
  if (!REVISION[id]) return;
  rv.subject = id;
  write(SUBJECT_KEY, id);
  if (!rv.mounted) return;
  const sub = subjectData();
  rv.last = releasedLast(lastWeekOf(sub.data), sub.released);
  const next = resolveWeek(savedPref(), autoNow(), rv.last);
  rv.week = next.week; rv.mode = next.mode;
  applySubject();
  deriveWeek();
  mountFragments();
  const tabOf = { threads: 'rvTabThreads', tables: 'rvTabTables', decoder: 'rvTabDecoder' };
  if (tabOf[rv.tab] && $$(tabOf[rv.tab]).hidden) showTab('map');
  paintAll();
}

/* ------------------------------------------------------------------ *
 * Derive everything that depends on the week
 * ------------------------------------------------------------------ */

function deriveWeek() {
  const sub = subjectData();
  const data = sub.data;
  ix.byId = Object.fromEntries(data.NODES.map((n) => [n.id, n]));
  ix.ids = visibleIds(data, rv.week);
  ix.edges = visibleEdges(data, ix.ids);
  ix.fresh = newIds(data, rv.week);
  const pruned = pruneTree(data, rv.week);

  ix.PARENT = {}; ix.KIDS = {}; ix.LABEL = {};
  const build = (spec, sys, parent, depth) => {
    const real = !!spec.id;
    const sy = spec.sys || sys;
    const key = real ? spec.id : (depth === 0 ? 'root' : `g:${spec.label}`);
    const label = real ? ix.byId[spec.id].l : (depth === 0 ? `${rv.subject} · ${rv.week === 1 ? 'Week 1' : `Weeks 1–${rv.week}`}` : spec.label);
    ix.LABEL[key] = label;
    ix.PARENT[key] = parent;
    let html;
    if (depth === 0) html = `<span class="mmt mmb mmroot" style="--bc:var(--c-accent)">${esc(label)}</span>`;
    else if (depth === 1) html = `<span class="mmt mmb" style="--bc:var(--c-${sy})">${esc(label)}</span>`;
    else html = `<span class="mmt">${esc(label)}</span>`;
    if (real) {
      const weeks = ix.byId[spec.id].w.slice().sort((a, b) => a - b);
      html += `<span class="mwk">${weeks.filter((w) => w <= rv.week).map((w) => `W${w}`).join(' ')}</span>`;
      if (ix.fresh.has(spec.id)) html += '<span class="wknew">new</span>';
    }
    const kids = (spec.kids || []).map((k) => build(k, sy, key, depth + 1));
    ix.KIDS[key] = kids.map((k) => k.payload.id);
    return { content: html, payload: { id: key, sys: depth === 0 ? null : sy }, children: kids };
  };
  ix.DATA = build(pruned.tree, null, null, 0);

  ix.NB = {};
  ix.edges.forEach((e) => {
    (ix.NB[e[0]] = ix.NB[e[0]] || []).push([e[1], e[2]]);
    (ix.NB[e[1]] = ix.NB[e[1]] || []).push([e[0], e[2]]);
  });
}

/* ------------------------------------------------------------------ *
 * Side panel (shared by Map and Brain 3D)
 * ------------------------------------------------------------------ */

function descendantsOf(id) {
  let out = [];
  (ix.KIDS[id] || []).forEach((k) => { out.push(k); out = out.concat(descendantsOf(k)); });
  return out;
}

function homeHTML() {
  return '';
}

function weeksTags(n) {
  return n.w.slice().sort((a, b) => a - b).filter((x) => x <= rv.week).map((x) => `<span class="rv-tag">Week ${x}</span>`).join('');
}

/* The viewer unit for a box: a lookup in outputs/revision/viewer-units.js, generated and checked by
   work/build-revision-units.mjs and revision-check. No unit, no button. */
function viewerUnit(id, subject = rv.subject) {
  const u = VIEWER_UNITS[subject] && VIEWER_UNITS[subject][id];
  return u == null ? null : u;
}

function renderPanel(id, el) {
  const side = el || $$('rvSide');
  const n = ix.byId[id];
  let h;
  if (n) {
    h = `<h3>${esc(n.l)}</h3><div class="rv-tags"><span class="rv-tag sys" style="background:var(--rv-c-${n.s})">${esc(sysOf(n.s).label)}</span>${weeksTags(n)}</div>`;
    /* a row with no slide line of its own still opens with one sentence: where it sits in the tree */
    const bare = n.leaf && !(n.line && n.line.trim());
    const own = n.own || OWN[id];
    const said = own ? `<p class="rv-said">${esc(own)}</p><p class="rv-ownnote">In brief, in the app's own words, not the slide's.</p>` : bare ? `<p class="rv-said">${esc(describe(n, {
      parent: ix.LABEL[ix.PARENT[id]] || '',
      kids: (ix.KIDS[id] || []).map((k) => ix.LABEL[k]),
      grand: ix.LABEL[ix.PARENT[ix.PARENT[id]]] || '',
    }))}</p>` : '';
    h += `<div class="rv-note">${said}${n.t}</div>`;
    const vh = viewerUnit(id) != null;
    h += `<p class="rv-to3d">${(ix.NB[id] || []).length ? `<button type="button" class="rv-linkbtn" data-to3d="${esc(id)}">Connections in 3D (${(ix.NB[id] || []).length})</button>` : ''}${vh ? ` <button type="button" class="rv-linkbtn" data-toviewer="${esc(id)}">Show in the viewer</button>` : ''}${showIn3D(rv.subject, id, n.l) ? ` <button type="button" class="rv-linkbtn" data-tocell="${esc(id)}">Show in 3D</button>` : ''}${decoderFor(n) ? ` <button type="button" class="rv-linkbtn" data-todecoder="${esc(decoderFor(n))}">Word in Decoder</button>` : ''}</p>`;
    /* The owner's answer 8: the same thing in the other subject, once its week is reached. Tapping switches subject. */
    const cross = crossFor(CROSS, rv.subject, id, rv.week, firstWeekIn);
    for (const sub of [...new Set(cross.map((c) => c.subject))]) {
      h += `<h4>In ${esc(REVISION[sub].copy.name)}</h4><div class="nlist">`;
      cross.filter((c) => c.subject === sub).forEach((c) => {
        const o = REVISION[sub].data.NODES.find((x) => x.id === c.id);
        h += `<button type="button" class="nbtn" data-cross="${esc(sub)}" data-crossid="${esc(c.id)}"><span>${esc(o.l)}</span><span class="rel">${esc(c.why)}</span></button>`;
      });
      h += '</div>';
    }
    /* a thread linked by a later step than the box's own week waits for that step (revision/leaves.js linkThreads) */
    const th = (n.th || []).filter((t) => !n.thWk || !(t in n.thWk) || n.thWk[t] <= rv.week);
    if (th.length) {
      h += '<h4>Pathways through this topic</h4><div class="nlist">';
      th.forEach((t) => { h += `<button type="button" class="nbtn" data-thread="${esc(t)}"><span>${esc(ix.threadTitles[t] || t)}</span><span class="rel">open →</span></button>`; });
      h += '</div>';
    }
  } else {
    /* a branch heading takes its colour from the first topic under it */
    const first = descendantsOf(id).map((d) => ix.byId[d]).find(Boolean);
    const sys = first ? first.s : null;
    h = `<h3>${esc(ix.LABEL[id])}</h3>`;
    if (sys) h += `<div class="rv-tags"><span class="rv-tag sys" style="background:var(--rv-c-${sys})">${esc(sysOf(sys).label)}</span></div>`;
    h += '<div class="rv-note shown">Branch heading. Topics inside:</div><div class="nlist" style="margin-top:8px">';
    descendantsOf(id).filter((d) => ix.byId[d]).forEach((d) => {
      h += `<button type="button" class="nbtn" data-node="${esc(d)}"><span>${esc(ix.byId[d].l)}</span><span class="rel">${ix.byId[d].w.slice().sort((a, b) => a - b).filter((x) => x <= rv.week).map((x) => `W${x}`).join(' ')}</span></button>`;
    });
    h += '</div>';
  }
  side.innerHTML = h;
  side.scrollTop = 0;
  /* Reading help: tappable terms in the revision notes. */
  side.querySelectorAll('.rv-note').forEach((e) => glossifyNode(e));
}

/* ------------------------------------------------------------------ *
 * Map (Markmap)
 * ------------------------------------------------------------------ */

function createMap() {
  const NARROW = window.matchMedia('(max-width: 700px)').matches;
  const svgEl = $$('rvMm');
  const wrap = $$('rvMmwrap');
  const ov = $$('rvLinks');
  const side = $$('rvSide');
  const notesBtn = $$('rvNotesBtn');
  let mm = null;
  let fitted = false;
  let selId = null;
  let hits = {};
  let hotKey = null;
  let linkKey = {};
  let tracking = 0;
  let rows = [];
  let hotRow = null;
  let linkList = null;
  const DOT_DX = 24; /* a dot sits this far right of the target's underline, clear of Markmap's fold circle */
  const labelOf = (id) => (ix.byId[id] ? ix.byId[id].l : ix.LABEL[id]);

  const colorFn = (node) => {
    const sy = node.payload && node.payload.sys;
    const cs = getComputedStyle(wrap);
    return (sy ? cs.getPropertyValue(`--c-${sy}`) : cs.getPropertyValue('--c-accent')).trim();
  };

  const ancestors = (id) => { const out = []; let k = ix.PARENT[id]; while (k) { out.push(k); k = ix.PARENT[k]; } return out; };
  const findNode = (id) => {
    let hit = null;
    (function walk(n) { if (hit) return; if (n.payload && n.payload.id === id) { hit = n; return; } (n.children || []).forEach(walk); })(mm.state.data);
    return hit;
  };

  /* On a phone, opening a branch folds the open branches beside it, so the map stays about one screen tall. */
  function foldSiblings(id) {
    (ix.KIDS[ix.PARENT[id]] || []).forEach((k) => {
      if (k === id) return;
      const n = findNode(k);
      if (n && (n.children || []).length && !n.payload.fold) n.payload = Object.assign({}, n.payload, { fold: 1 });
    });
  }

  function applyMarks() {
    const rel = {}; const anc = {}; const kid = {};
    if (selId) {
      (ix.KIDS[selId] || []).forEach((k) => { kid[k] = 1; });
      (ix.NB[selId] || []).forEach((p) => { rel[p[0]] = 1; });
      ancestors(selId).forEach((a) => { anc[a] = 1; });
      if (!ix.byId[selId]) descendantsOf(selId).forEach((d) => { rel[d] = 1; });
    }
    const hanc = {}; const searching = Object.keys(hits).length > 0;
    Object.keys(hits).forEach((h) => { ancestors(h).forEach((a) => { hanc[a] = 1; }); });
    svgEl.querySelectorAll('g.markmap-node').forEach((g) => {
      const d = g.__data__; const id = d && d.payload && d.payload.id; if (!id) return;
      g.classList.toggle('sel', id === selId);
      g.classList.toggle('rel', !!rel[id]);
      g.classList.toggle('anc', !!anc[id]);
      g.classList.toggle('kid', !!kid[id]);
      g.classList.toggle('hit', !!hits[id]);
      g.classList.toggle('hanc', !!hanc[id]);
    });
    svgEl.classList.toggle('focus', !!selId);
    svgEl.classList.toggle('searching', searching && !selId);
  }

  /* Cross-link arcs for the selected topic only. Every arc leaves from the right end of a node's underline and
     bows out to the right, into the empty space beside the tree, so it does not run across text. */
  function boxes() {
    const m = {}; const wr = wrap.getBoundingClientRect();
    svgEl.querySelectorAll('g.markmap-node').forEach((g) => {
      const d = g.__data__; const id = d && d.payload && d.payload.id; if (!id) return;
      const fo = g.querySelector('foreignObject'); if (!fo) return;
      const r = fo.getBoundingClientRect(); let xr = r.right; let y = r.bottom;
      const ln = g.querySelector('line'); const ci = g.querySelector('circle');
      if (ln) { const lr = ln.getBoundingClientRect(); xr = Math.max(xr, lr.right); y = (lr.top + lr.bottom) / 2; }
      if (ci) { const cr = ci.getBoundingClientRect(); if (cr.width) xr = Math.max(xr, cr.right); }
      m[id] = { x1: r.left - wr.left, xr: xr - wr.left, y: y - wr.top };
    });
    return m;
  }
  function markHot() {
    svgEl.querySelectorAll('g.markmap-node').forEach((g) => {
      const d = g.__data__; const id = d && d.payload && d.payload.id;
      g.classList.toggle('hot', !!hotKey && id === hotKey);
    });
  }
  /* The links list (numbers and reasons) is made when the selection or the folding changes;
     the arcs and their numbered dots are redrawn every frame while the map moves. */
  function refreshList() {
    const list = $$('rvLinkList');
    if (!selId || !ix.byId[selId]) { rows = []; renderLinkList(list, rows); return; }
    const bx = boxes();
    rows = linkRows(ix.NB[selId], {
      label: labelOf,
      visibleAs: (id) => { let k = id; while (k && !bx[k]) k = ix.PARENT[k]; return k && k !== selId && k !== 'root' ? k : null; },
    });
    renderLinkList(list, rows);
    markLinkRow(list, hotRow);
    if (linkList) linkList.reset();
  }

  /* Cross-link arcs for the selected topic. Each leaves from the right end of the selected node's underline,
     bows out into the space beside the tree, and ends in a numbered dot just right of its target. The reason
     is in the Links list under the map, never written over the tree. */
  function drawLinks() {
    const W = wrap.clientWidth; const H = wrap.clientHeight;
    ov.setAttribute('viewBox', `0 0 ${W} ${H}`);
    linkKey = {};
    if (!selId || !rows.length) { ov.innerHTML = ''; markHot(); return; }
    const bx = boxes(); const s = bx[selId]; if (!s) { ov.innerHTML = ''; markHot(); return; }
    const targets = {}; const order = [];
    rows.forEach((r) => {
      /* the list fixed r.at when the folding last changed; while a branch is still animating
         shut, its box can already be gone, so fall back to the nearest box above it */
      let k = r.at;
      while (k && !bx[k]) k = ix.PARENT[k];
      if (!k || k === selId || k === 'root') return;
      linkKey[r.id] = k;
      /* parent and children are already joined by the tree itself, so no extra arc */
      if (ix.PARENT[k] === selId || ix.PARENT[selId] === k) return;
      if (!targets[k]) { targets[k] = { far: true, ns: [] }; order.push(k); }
      if (k === r.id) targets[k].far = false;
      targets[k].ns.push(r.n);
    });
    let paths = ''; let dots = '';
    order.forEach((k) => {
      const t = bx[k]; const { far, ns } = targets[k]; const hot = (k === hotKey);
      const x1 = s.xr + 2; const y1 = s.y; const x2 = t.xr + DOT_DX; const y2 = t.y;
      const dy = Math.abs(y2 - y1);
      let d;
      if (t.xr < s.x1 - 20 && dy < (NARROW ? 160 : 230)) {
        /* nearby target in a column to the left: leave from the start of the underline and cross the gap between
           columns, where only tree lines run, instead of looping back along a row of labels */
        const sx = s.x1 - 9; const g = Math.max(24, (sx - x2) * 0.45);
        d = `M${sx.toFixed(1)},${y1.toFixed(1)} C${(sx - g).toFixed(1)},${y1.toFixed(1)} ${(x2 + g).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      } else {
        const bow = Math.min(NARROW ? 90 : 220, 26 + dy * (NARROW ? 0.3 : 0.42));
        const xm = Math.max(x1, x2) + bow;
        d = `M${x1.toFixed(1)},${y1.toFixed(1)} C${xm.toFixed(1)},${y1.toFixed(1)} ${xm.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      }
      paths += `<path class="${far ? 'far' : ''}${hot ? ' hot' : ''}" d="${d}"/>`;
      dots += `<g class="rv-dot${hot ? ' hot' : ''}" data-at="${esc(k)}" transform="translate(${x2.toFixed(1)},${y2.toFixed(1)})"><circle class="hit" r="22"/><circle class="ring" r="9"/><text dy="3.8">${ns.length === 1 ? ns[0] : `${ns[0]}+`}</text></g>`;
    });
    ov.innerHTML = paths + dots;
    markHot();
  }
  function setHot(k) { if (k === hotKey) return; hotKey = k; if (selId) drawLinks(); }
  function track(ms) {
    const end = Date.now() + ms;
    if (tracking >= end) return;
    const running = tracking > Date.now();
    tracking = end;
    if (running) return;
    (function loop() {
      drawLinks();
      if (Date.now() < tracking) requestAnimationFrame(loop); else { tracking = 0; drawLinks(); }
    })();
  }

  /* A tapped branch is framed: the tapped box on the left edge, everything open under it filling the rest, zoomed
     as far as that fits (never past 1.6x, never below 0.35x). Reads each box's laid-out rectangle from the library. */
  function focusBranch(d) {
    const rects = [];
    (function walk(n) {
      const r = n.state && n.state.rect; if (r && r.width) rects.push(r);
      /* a folded box keeps stale zero rectangles on its hidden children */
      if (!(n.payload && n.payload.fold)) (n.children || []).forEach(walk);
    })(d);
    if (!rects.length || wrap.clientWidth < 10) return;
    const x0 = Math.min(...rects.map((r) => r.x)), x1 = Math.max(...rects.map((r) => r.x + r.width));
    const y0 = Math.min(...rects.map((r) => r.y)), y1 = Math.max(...rects.map((r) => r.y + r.height));
    const W = wrap.clientWidth, H = wrap.clientHeight, padL = 10, pad = 14;
    const k = Math.max(0.35, Math.min(1.6, (W - padL - pad) / (x1 - x0), (H - 2 * pad) / (y1 - y0)));
    const tx = padL - k * x0, ty = (H - k * (y1 - y0)) / 2 - k * y0;
    mm.svg.transition().duration(450).call(mm.zoom.transform, window.d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  function fitNow() {
    if (wrap.clientWidth < 10) return;
    fitted = true;
    mm.fit();
  }

  function home() {
    side.innerHTML = homeHTML();
    notesBtn.hidden = true;
  }
  function select(id) {
    if (!(id in ix.PARENT)) return;
    hotKey = null; hotRow = null;
    selId = (id === 'root') ? null : id;
    if (!selId) { home(); refreshList(); applyMarks(); track(300); $$('rvJump').value = ''; return; }
    renderPanel(id);
    $$('rvJump').value = ix.byId[id] ? id : '';
    notesBtn.hidden = false;
    refreshList();
    applyMarks(); track(500);
  }
  function clearSel() { selId = null; hotKey = null; hotRow = null; home(); refreshList(); applyMarks(); drawLinks(); $$('rvJump').value = ''; }

  async function reveal(id) {
    const anc = ancestors(id); let changed = false;
    (function walk(n) {
      if (n.payload && anc.indexOf(n.payload.id) >= 0 && n.payload.fold) { n.payload = Object.assign({}, n.payload, { fold: 0 }); changed = true; }
      (n.children || []).forEach(walk);
    })(mm.state.data);
    if (changed) await mm.renderData();
    select(id);
    const node = findNode(id);
    if (node) mm.centerNode(node, NARROW ? { left: 8, right: 130 } : { left: 20, right: 20 });
    track(800);
    commitSoon(600);
  }

  /* ---- undo / redo: what is open and what is chosen, one step per tap ---- */
  const hist = []; let hi = -1; let restoring = false; let commitTimer = null;
  function capture() {
    const folds = {};
    (function walk(n) { if (n.payload && n.payload.fold) folds[n.payload.id] = 1; (n.children || []).forEach(walk); })(mm.state.data);
    return { sel: selId, folds };
  }
  const sameSnap = (a, b) => a.sel === b.sel && Object.keys(a.folds).length === Object.keys(b.folds).length && Object.keys(a.folds).every((k) => b.folds[k]);
  function paintHist() { $$('rvUndo').disabled = hi <= 0; $$('rvRedo').disabled = hi >= hist.length - 1; }
  function commit() {
    clearTimeout(commitTimer);
    if (restoring || !mm || !mm.state) return;
    const s = capture();
    if (hi >= 0 && sameSnap(hist[hi], s)) return;
    hist.length = hi + 1; hist.push(s); if (hist.length > 60) hist.shift();
    hi = hist.length - 1; paintHist();
  }
  const commitSoon = (ms = 800) => { clearTimeout(commitTimer); commitTimer = setTimeout(commit, ms); };
  async function goHist(to) {
    if (to < 0 || to >= hist.length) return;
    hi = to; restoring = true;
    const s = hist[hi];
    (function walk(n) {
      if (n.payload && n.payload.id !== 'root' && (n.children || []).length) n.payload = Object.assign({}, n.payload, { fold: s.folds[n.payload.id] ? 1 : 0 });
      (n.children || []).forEach(walk);
    })(mm.state.data);
    await mm.renderData();
    if (s.sel) select(s.sel); else clearSel();
    applyMarks(); track(500);
    restoring = false; paintHist();
  }

  /* ---- find: matches stay with their parent branches, so each hit keeps its context ---- */
  let TEXT = {}; let TREE_ORDER = [];
  function indexText() {
    TEXT = {};
    Object.keys(ix.LABEL).forEach((k) => {
      const n = ix.byId[k];
      const text = n && n.leaf ? `${n.l} ${n.line}` : n ? `${n.l} ${n.t.replace(/<[^>]+>/g, ' ')}` : '';
      TEXT[k] = (n ? text : ix.LABEL[k]).toLowerCase();
    });
    TREE_ORDER = [];
    (function walk(n) { TREE_ORDER.push(n.payload.id); (n.children || []).forEach(walk); })(ix.DATA);
  }
  let findTimer = null;
  function runFind() {
    const find = $$('rvFind'); const count = $$('rvFindCount');
    const q = find.value.trim().toLowerCase();
    hits = {};
    if (q.length < 2) { count.textContent = ''; applyMarks(); return; }
    const list = TREE_ORDER.filter((k) => k !== 'root' && TEXT[k] && TEXT[k].indexOf(q) > -1);
    list.forEach((k) => { hits[k] = 1; });
    count.textContent = list.length ? `${list.length} found` : 'none found';
    if (!list.length) { applyMarks(); return; }
    if (selId) clearSel();
    const need = {}; list.forEach((k) => { ancestors(k).forEach((a) => { need[a] = 1; }); });
    let changed = false;
    (function walk(n) {
      if (n.payload && need[n.payload.id] && n.payload.fold) { n.payload = Object.assign({}, n.payload, { fold: 0 }); changed = true; }
      (n.children || []).forEach(walk);
    })(mm.state.data);
    (changed ? mm.renderData() : Promise.resolve()).then(() => { applyMarks(); mm.fit(); commitSoon(300); });
  }

  function fillJump() {
    const jump = $$('rvJump');
    jump.innerHTML = '<option value="">Pick a topic…</option>';
    Object.values(ix.byId).filter((n) => ix.ids.has(n.id)).sort((a, b) => a.l.localeCompare(b.l)).forEach((n) => {
      const o = document.createElement('option'); o.value = n.id; o.textContent = n.l; jump.appendChild(o);
    });
  }

  /* A new week changes the topics, so the map is given the new tree and everything keyed to the old one is dropped. */
  function setData() {
    hits = {}; hotKey = null;
    if (selId && !(selId in ix.PARENT)) selId = null;
    indexText();
    fillJump();
    $$('rvFind').value = ''; $$('rvFindCount').textContent = '';
    if (mm) {
      /* Markmap's setData() keeps nodes it already drew, whatever the new tree says, so a new week
         would show last week's topics under this week's heading. The map is made again instead. */
      try { mm.destroy(); } catch { /* already gone */ }
      makeInstance();
      if (selId) renderPanel(selId); else home();
    }
  }

  function makeInstance() {
    svgEl.innerHTML = '';
    fitted = false;
    mm = window.markmap.Markmap.create(svgEl, {
      initialExpandLevel: NARROW ? 1 : 2, maxWidth: 210, spacingHorizontal: NARROW ? 48 : 70, spacingVertical: NARROW ? 12 : 14, paddingX: 8,
      nodeMinHeight: 24, duration: 300,
      lineWidth: (node) => { const d = (node.state && node.state.depth) || 0; return Math.max(1.6, 4.2 - d * 0.85); },
      fitRatio: 0.96, maxInitialScale: NARROW ? 1.3 : 1.15,
      color: colorFn, zoom: true, pan: true, scrollForPan: false,
    }, ix.DATA);
    window.__rvMm = mm; /* test hook, as the reference build had */
    mm.zoom.on('zoom.links', () => { if (selId) drawLinks(); });
    const origRender = mm.renderData.bind(mm);
    mm.renderData = async function renderPatched(...args) {
      const r = await origRender(...args);
      svgEl.querySelectorAll('path.markmap-link').forEach((pth) => { const c = pth.getAttribute('stroke'); if (c) pth.style.setProperty('--glow', c); });
      applyMarks(); refreshList(); track(500);
      return r;
    };
    /* The fold circle opens or closes a branch. The tree re-lays itself out around the branch, which can carry
       the tapped node clean off the screen, so the view follows it, as a tap on its text already does. */
    mm.handleClick = (e, d) => {
      const opening = !!(d.payload && d.payload.fold);
      mm.toggleNode(d, false).then(() => {
        if (opening) focusBranch(d); else mm.ensureVisible(d, { left: 20, right: 40, top: 20, bottom: 20 });
        track(700);
      });
    };
    mm.svg.on('dblclick.zoom', null);
    setTimeout(() => { applyMarks(); fitNow(); refreshList(); drawLinks(); }, 60);
  }

  let mounting = null;
  function mount() {
    if (!mounting) mounting = doMount().catch((e) => { mounting = null; throw e; });
    return mounting;
  }
  async function doMount() {
    await loadScript('d3.min.js');
    await loadScript('markmap-view.min.js');
    indexText();
    fillJump();
    makeInstance();
    /* The library fits once, on creation. If the map was made while its box had no size (the tab was
       hidden, the pane not laid out yet) that fit is NaN and nothing recovers it, so the first real size
       triggers the fit again. */
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (!fitted && wrap.clientWidth >= 10 && wrap.clientHeight >= 10) fitNow(); }).observe(wrap);
    }
    /* the mouse wheel zooms the map (no Ctrl needed); the page scrolls from outside the map */

    /* clicking text: select, and open the branch; clicking the small circle only folds/unfolds */
    svgEl.addEventListener('click', (ev) => {
      const t = ev.target;
      if (t.tagName && t.tagName.toLowerCase() === 'circle') return;
      const g = t.closest && t.closest('g.markmap-node'); if (!g) return;
      const d = g.__data__; if (!d || !d.payload) return;
      const { id } = d.payload;
      const hasKids = d.children && d.children.length;
      const folded = d.payload.fold;
      const wasSel = (selId === id);
      if (id === 'root') { clearSel(); return; }
      select(id);
      if (hasKids && (folded || wasSel)) {
        if (NARROW && folded) foldSiblings(id);
        mm.toggleNode(d, false).then(() => {
          if (folded) focusBranch(d);
          track(700);
        });
      } else if (hasKids) { focusBranch(d); track(700); }
    });
    /* hover (or tap) a linked topic, on the map or in the side panel, to show why it links */
    svgEl.addEventListener('mouseover', (ev) => {
      const g = ev.target.closest && ev.target.closest('g.markmap-node'); if (!g || !selId) return;
      const id = g.__data__ && g.__data__.payload && g.__data__.payload.id;
      setHot(Object.keys(linkKey).some((n) => linkKey[n] === id) ? id : null);
    });
    svgEl.addEventListener('mouseleave', () => setHot(null));
    side.addEventListener('mouseover', (ev) => {
      const b = ev.target.closest && ev.target.closest('.nbtn[data-node]');
      setHot(b ? (linkKey[b.dataset.node] || null) : null);
    });
    side.addEventListener('mouseleave', () => setHot(null));
    side.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.node) reveal(b.dataset.node);
      if (b.dataset.thread) openThread(b.dataset.thread);
      if (b.dataset.to3d) openIn3D(b.dataset.to3d);
    });
    linkList = bindLinkList($$('rvLinkList'), {
      onHot: (id) => { hotRow = id; setHot(linkKey[id] || null); },
      onOpen: (id) => { reveal(id); },
    });
    ov.addEventListener('click', (ev) => {
      const g = ev.target.closest && ev.target.closest('.rv-dot'); if (!g) return;
      const r = rows.find((x) => x.at === g.dataset.at);
      hotRow = r ? r.id : null;
      markLinkRow($$('rvLinkList'), hotRow);
      linkList.reset();
      setHot(g.dataset.at);
    });
    notesBtn.addEventListener('click', () => side.scrollIntoView({ behavior: 'smooth', block: 'start' }));

    $$('rvJump').addEventListener('change', () => { const v = $$('rvJump').value; if (v) reveal(v); else clearSel(); });
    $$('rvFit').addEventListener('click', () => { clearSel(); mm.fit(); track(700); });
    $$('rvUndo').addEventListener('click', () => goHist(hi - 1));
    $$('rvRedo').addEventListener('click', () => goHist(hi + 1));
    /* every tap on the map, the Jump menu, a link in the side panel or the Find box is one step */
    [svgEl, side, $$('rvLinkList'), $$('rvJump'), $$('rvFit')].forEach((el) => { if (el) el.addEventListener('click', () => commitSoon()); });
    $$('rvJump').addEventListener('change', () => commitSoon());
    $$('rvFind').addEventListener('input', () => { clearTimeout(findTimer); findTimer = setTimeout(runFind, 220); });
    $$('rvFind').addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') { ev.preventDefault(); clearTimeout(findTimer); runFind(); const first = TREE_ORDER.filter((k) => hits[k])[0]; if (first) reveal(first); }
      if (ev.key === 'Escape') { $$('rvFind').value = ''; runFind(); }
    });
    window.addEventListener('resize', () => { if (selId) track(200); });
    try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => mm.renderData()); } catch { /* older browsers: no change listener */ }

    home();
    setTimeout(() => { applyMarks(); fitNow(); commit(); }, 60);
  }

  return {
    mount,
    setData,
    /* A map made while its tab was hidden has no size to fit to; fit it the first time it can be seen. */
    shown() { if (mm && !fitted) setTimeout(fitNow, 30); },
    reveal,
    select,
    ready: () => !!mm,
    selected: () => selId,
  };
}

/* ------------------------------------------------------------------ *
 * Threads, Tables, Decoder — static fragments, gated by data-wk
 * ------------------------------------------------------------------ */

function openThread(id) {
  showTab('threads');
  const d = $$('rvThreads').querySelector(`#${CSS.escape(id)}`);
  if (d && !d.hidden) { d.open = true; setTimeout(() => d.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40); }
}

function mountFragments() {
  const sub = subjectData();
  ix.threadTitles = {};
  /* a subject still being written has no Threads, Tables or Decoder yet: its tabs are hidden */
  [['threads', 'rvTabThreads'], ['tables', 'rvTabTables'], ['decoder', 'rvTabDecoder']].forEach(([k, tab]) => { $$(tab).hidden = !sub[k]; });
  $$('rvThreads').innerHTML = sub.threads;
  $$('rvTables').innerHTML = sub.tables;
  $$('rvDecoder').innerHTML = `${sub.decoder}<div class="rv-foot">${sub.sources}</div>`;
  /* class names that would collide with the app's own */
  ['rvThreads', 'rvTables', 'rvDecoder'].forEach((id) => {
    const root = $$(id);
    root.querySelectorAll('.pill').forEach((e) => { e.classList.replace('pill', 'rv-pill'); });
    root.querySelectorAll('.mono').forEach((e) => { e.classList.replace('mono', 'rv-mono'); });
    root.querySelectorAll('.foot').forEach((e) => { e.classList.replace('foot', 'rv-foot'); });
    root.querySelectorAll('[id]').forEach((e) => { if (e.id === 'dq' || e.id === 'dcount' || e.id === 'dtable') e.id = `rv${e.id}`; });
    root.querySelectorAll('label[for="dq"]').forEach((e) => { e.setAttribute('for', 'rvdq'); });
  });
  $$('rvThreads').querySelectorAll('details.thread').forEach((d) => {
    ix.threadTitles[d.id] = d.querySelector('summary').firstChild.textContent.trim();
  });
  /* Reading help spans every static fragment, including the Decoder rows. */
  ['rvThreads', 'rvTables', 'rvDecoder'].forEach((id) => glossifyNode($$(id)));
  $$('rvTables').querySelectorAll('.subnav a').forEach((a) => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const t = $$('rvTables').querySelector(`#${CSS.escape(a.dataset.jump)}`);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  const dq = $$('rvdq');
  if (dq) dq.addEventListener('input', filterDecoder);
}

function filterDecoder() {
  const dq = $$('rvdq'); if (!dq) return;
  const q = dq.value.trim().toLowerCase();
  let show = 0;
  $$('rvDecoder').querySelectorAll('#rvdtable tbody tr').forEach((r) => {
    const gated = r.dataset.gated === '1';
    if (r.classList.contains('grp')) { r.hidden = gated || !!q; return; }
    const hit = !q || r.textContent.toLowerCase().indexOf(q) > -1;
    r.hidden = gated || !hit;
    if (!r.hidden) show++;
  });
  $$('rvdcount').textContent = q ? `${show} match${show === 1 ? '' : 'es'}` : '';
}

function applyWeekToFragments() {
  const n = rv.week;
  /* Threads: a step shows once every week it draws on is reached. */
  $$('rvThreads').querySelectorAll('details.thread').forEach((d) => {
    /* a step is a chain item, a list item or, in the tissue map, a table row */
    const steps = [...d.querySelectorAll('li[data-wk], tr[data-wk]')];
    let hiddenCount = 0;
    steps.forEach((li) => { const on = Number(li.dataset.wk) <= n; li.hidden = !on; if (!on) hiddenCount += 1; });
    /* a 廣東話 line retells the whole thread, so it waits for the thread's last week */
    d.querySelectorAll('.yue[data-wk]').forEach((y) => { y.hidden = Number(y.dataset.wk) > n; });
    d.querySelectorAll('.tw').forEach((t) => { t.hidden = ![...t.querySelectorAll('tr[data-wk]')].some((r) => !r.hidden); });
    d.querySelectorAll('.col').forEach((c) => {
      const lis = [...c.querySelectorAll('li[data-wk]')];
      if (lis.length) c.hidden = !lis.some((li) => !li.hidden);
    });
    const shown = steps.length - hiddenCount;
    d.hidden = shown === 0;
    const weeks = new Set();
    steps.filter((li) => !li.hidden).forEach((li) => li.querySelectorAll('.wk').forEach((w) => weeks.add(Number(w.textContent.replace('W', '')))));
    const small = d.querySelector('summary small');
    if (small && weeks.size) small.textContent = [...weeks].sort((a, b) => a - b).map((w) => `W${w}`).join(' · ');
    let note = d.querySelector('.rv-hidden-note');
    if (hiddenCount && shown) {
      if (!note) {
        note = document.createElement('p'); note.className = 'rv-hidden-note';
        const body = d.querySelector('.tbody') || d;
        const chains = body.querySelectorAll('ol.chain');
        if (chains.length) chains[chains.length - 1].after(note); else body.appendChild(note);
      }
      note.textContent = `${hiddenCount} more step${hiddenCount === 1 ? '' : 's'} in this pathway come from later weeks and appear once you reach them.`;
    } else if (note) note.remove();
  });
  /* Tables: every row, and every double-check box, has its own week. */
  $$('rvTables').querySelectorAll('.rv-sec').forEach((sec) => {
    const items = [...sec.querySelectorAll('tr[data-wk], .note-box[data-wk]')];
    items.forEach((it) => { it.hidden = Number(it.dataset.wk) > n; });
    const any = items.some((it) => !it.hidden);
    sec.hidden = !any;
    const h = sec.querySelector('h3[id]');
    if (h) { const link = $$('rvTables').querySelector(`.subnav a[data-jump="${h.id}"]`); if (link) link.hidden = !any; }
  });
  /* Decoder: a group and its rows appear with their week. */
  $$('rvDecoder').querySelectorAll('tr[data-wk]').forEach((r) => { r.dataset.gated = Number(r.dataset.wk) > n ? '1' : ''; });
  filterDecoder();
}

/* ------------------------------------------------------------------ *
 * Tabs
 * ------------------------------------------------------------------ */

function showTab(name) {
  const ids = { map: 'rvMap', brain: 'rvBrain', threads: 'rvThreads', tables: 'rvTables', decoder: 'rvDecoder' };
  if (!ids[name]) name = 'map';
  rv.tab = name;
  document.querySelectorAll('#reviseView .rv-tabs [data-rvtab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.rvtab === name ? 'true' : 'false'));
  Object.keys(ids).forEach((k) => { $$(ids[k]).hidden = k !== name; });
  if (name === 'map') ensureMap().then(() => map.shown());
  if (name === 'brain') ensureBrain().then(() => brain && brain.show());
  else if (brain) brain.hide();
}

async function ensureMap() {
  if (!map) map = createMap();
  if (!map.ready()) { try { await map.mount(); } catch (e) {
    /* mount() resolves once; a failed one may be retried on the next visit. */ $$('rvSide').innerHTML = `<div class="rv-later">The map library could not load (${esc(e.message)}). Threads, Tables and Decoder still work.</div>`; } }
  return map;
}

/* The 3D tab and "Connections in 3D" can both ask for the hub while the library is
   still loading; one promise, so there is only ever one hub. */
let brainLoading = null;
function ensureBrain() {
  if (!brainLoading) brainLoading = loadBrain().then((b) => { if (!b) brainLoading = null; return b; });
  return brainLoading;
}

async function loadBrain() {
  if (brain) return brain;
  try {
    await loadScript('3d-force-graph.min.js');
  } catch (e) {
    $$('rvBgraph').innerHTML = `<div id="rvBfallback">The 3D library could not load (${esc(e.message)}). The Map has the same topics and links.</div>`;
    return null;
  }
  brain = createBrain({
    ix, rv, renderPanel, openThread,
    colour: (s) => sysOf(s).col,
    order: () => subjectData().hubOrder,
    tours: () => subjectData().tours,
    mapSelected: () => (map && map.ready() ? map.selected() : null),
    newest: newestTopic,
  });
  brain.setData();
  return brain;
}

/* Where the 3D hub starts when nothing is chosen: the best-linked topic new this week, else the best-linked of all. */
function newestTopic() {
  const deg = (id) => (ix.NB[id] || []).length;
  const pick = (ids) => ids.filter((id) => ix.byId[id] && ix.ids.has(id)).sort((a, b) => deg(b) - deg(a) || (a < b ? -1 : 1))[0] || null;
  return pick([...ix.fresh]) || pick([...ix.ids]);
}

/* "Connections in 3D" in a topic's notes: the same topic, at the centre of the hub. */
async function openIn3D(id) {
  showTab('brain');
  scrollViewTop();
  const b = await ensureBrain();
  if (b) b.focus(id);
}

/* ------------------------------------------------------------------ *
 * Entry points
 * ------------------------------------------------------------------ */

function paintAll() {
  paintWeekBar();
  if (map) map.setData();
  applyWeekToFragments();
  if (brain) brain.setData();
}

/* Re-reads the calendar. Called on every visit and when the app comes back to the
   front, so a week that rolls over while the app sits in the background is picked
   up without a reload. Does nothing to a week the student chose themselves. */
function followCalendar() {
  if (!rv.mounted) return;
  if (rv.mode !== 'auto') { paintWeekBar(); return; }
  const a = autoNow();
  if (a !== rv.week) { rv.week = a; deriveWeek(); paintAll(); }
  else paintWeekBar();
}

export function renderRevise() {
  leaveProjection();
  setActiveNav('revise');
  if (!rv.mounted) {
    rv.mounted = true;
    const savedSubject = read(SUBJECT_KEY, null);
    if (savedSubject && REVISION[savedSubject]) rv.subject = savedSubject;
    applySubject();
    const sub = subjectData();
    rv.last = releasedLast(lastWeekOf(sub.data), sub.released);
    const next = resolveWeek(savedPref(), autoNow(), rv.last);
    rv.week = next.week; rv.mode = next.mode;
    deriveWeek();
    mountFragments();
    document.querySelectorAll('#reviseView .rv-tabs [data-rvtab]').forEach((b) => { b.onclick = () => { showTab(b.dataset.rvtab); scrollViewTop(); }; });
    applyWeekToFragments();
    paintWeekBar();
    showTab('map');
  } else {
    followCalendar();
  }
  showView('reviseView');
  if (rv.tab === 'map') ensureMap().then(() => map.shown());
}

/* The viewer's selection card: where the selected structure sits in Revise. The studio names the selection's
   units (__osteo.selectedUnits); outputs/revision/viewer-units.js says which boxes they are. */
function paintSelectedRevise() {
  const slot = $$('selectedRevise');
  if (!slot) return;
  const units = window.__osteo && window.__osteo.selectedUnits ? window.__osteo.selectedUnits() : [];
  paintReviseSlot(slot, units.length ? reviseBoxesFor(units) : []);
}
function paintReviseSlot(slot, boxes) {
  slot.hidden = !boxes.length;
  slot.innerHTML = boxes.length ? `<div class="info-label">In Revise</div>${boxes.map((b) => `<button type="button" class="sel-revise-btn" data-openrevise="${esc(b.subject)}" data-openreviseid="${esc(b.id)}">${esc(b.label)} <small>${esc(b.name)}, week ${b.week} →</small></button>`).join('')}` : '';
}

/* A studio panel (the muscle zoom) names boxes as [subject, id] and asks for their links in a slot of its own:
   only the boxes the week each subject shows has taught get one, as on the selection card. */
function paintAskedSlot(ev) {
  const { el, boxes } = (ev && ev.detail) || {};
  if (!el || !Array.isArray(boxes)) return;
  const out = [];
  for (const [subject, id] of boxes) {
    if (!REVISION[subject] || !visibleAt(subject, weekFor(subject)).has(id)) continue;
    const n = nodeOf(subject, id);
    if (n) out.push({ subject, id, label: n.l, week: firstWk(n), name: REVISION[subject].copy.name });
  }
  paintReviseSlot(el, out);
}

export function init() {
  document.addEventListener('visibilitychange', () => { if (!document.hidden) followCalendar(); });
  window.addEventListener('osteo:revise-slot', paintAskedSlot);
  const selName = $$('selectedName');
  if (selName && typeof MutationObserver === 'function') new MutationObserver(paintSelectedRevise).observe(selName, { childList: true, characterData: true, subtree: true });
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-openrevise]'); if (!b) return;
    openRevise({ subject: b.dataset.openrevise, id: b.dataset.openreviseid });
  });
  /* "Show in the viewer" in the notes, on the Map and on Brain 3D alike */
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-toviewer]'); if (!b) return;
    const n = ix.byId[b.dataset.toviewer]; const u = n ? viewerUnit(n.id) : null;
    if (u != null) openUnitInViewer(u, n.l);
  });
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-todecoder]'); if (!b) return;
    openRevise({ subject: rv.subject, tab: 'decoder', q: b.dataset.todecoder });
  });
  /* "Show in 3D": the viewer's Cell mode at this box's level, stage and label */
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-tocell]'); if (!b) return;
    const t = showIn3D(rv.subject, b.dataset.tocell, (ix.byId[b.dataset.tocell] || {}).l);
    if (t) openCellInViewer(t);
  });
  /* A link into the other subject: switch to it, at this week if the far box needs it, and open the box. */
  document.addEventListener('click', async (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-cross]'); if (!b) return;
    const week = rv.week;
    setSubject(b.dataset.cross);
    const w = firstWeekIn(b.dataset.cross, b.dataset.crossid);
    if (w != null && w > rv.week) setWeek(week, 'manual');
    showTab('map');
    await ensureMap(); /* the Jump menu's listener lives in the map (createMap) */
    const j = $$('rvJump'); j.value = b.dataset.crossid; j.dispatchEvent(new Event('change'));
  });
}

/* ------------------------------------------------------------------ *
 * Ways in from the rest of the app
 * ------------------------------------------------------------------ */

const STOP = new Set(['lecture', 'tutorial', 'system', 'systems', 'the', 'and', 'of', 'to', 'in', 'a', 'body']);
const wordsOf = (t) => new Set(String(t || '').toLowerCase().split(/[^a-z]+/).map((w) => w.replace(/s$/, '')).filter((w) => w.length > 2 && !STOP.has(w)));
/* The branch a lecture filled: the one sharing a word with the session's title ("Digestive System" -> Digestive
   system), else the one holding at least half of what joined that week. Neither: no branch, just the week. */
function lectureBranch(week, title) {
  const branches = (ix.KIDS.root || []).filter((b) => b in ix.PARENT);
  const want = wordsOf(title);
  const named = want.size ? branches.filter((b) => [...wordsOf(ix.LABEL[b])].some((w) => want.has(w))) : [];
  if (named.length === 1) return named[0];
  let best = null, bestN = 0, total = 0;
  branches.forEach((b) => {
    const n = [b, ...descendantsOf(b)].filter((k) => ix.byId[k] && firstWk(ix.byId[k]) === week).length;
    total += n;
    if (n > bestN) { best = b; bestN = n; }
  });
  return bestN && bestN * 2 >= total ? best : null;
}

/*
 * Open Revise at a subject, a week and, if given, one box -- from a Course session row, Today, search or the
 * viewer's selection card. A week given here is the student's choice, so it sticks as a manual week unless it
 * is the calendar's own; a box not taught by the week shown moves the week to the one that teaches it.
 * tab 'decoder' with q opens the Decoder filtered to that word.
 */
export async function openRevise({ subject, week, id, title, tab, q } = {}) {
  renderRevise();
  scrollViewTop();
  if (subject && REVISION[subject] && subject !== rv.subject) setSubject(subject);
  const pick = (w) => { if (w !== rv.week) setWeek(w, w === autoNow() ? 'auto' : 'manual'); };
  if (Number(week) > 0) pick(Math.min(Number(week), rv.last));
  if (id && ix.byId[id] && !ix.ids.has(id) && firstWk(ix.byId[id]) <= rv.last) pick(firstWk(ix.byId[id]));
  if (tab === 'decoder' && !$$('rvTabDecoder').hidden) {
    showTab('decoder');
    const dq = $$('rvdq');
    if (dq && q) { dq.value = q; filterDecoder(); }
    return true;
  }
  showTab('map');
  const m = await ensureMap();
  if (!m.ready()) return false;
  const target = id && ix.ids.has(id) ? id : (Number(week) > 0 ? lectureBranch(rv.week, title) : null);
  if (target && target in ix.PARENT) await m.reveal(target);
  return true;
}

/* Decoder words per subject, read once from its fragment: [{ term, wk }]. */
const decoderCache = new Map();
/* The Decoder word that is this box's own word: its name, the name without its kind (Vagus nerve -> Vagus), or a
   single word of it the Decoder splits. Only a word taught by the week shown. */
const KIND_WORDS = /\s+(muscles?|bones?|nerves?|arter(?:y|ies)|veins?|joints?|glands?|nucle(?:us|i)|ligaments?|tract|lobe|gyrus|cortex)$/i;
function decoderFor(n, subject = rv.subject) {
  const week = weekFor(subject);
  const terms = decoderTerms(subject).filter((r) => r.wk <= week);
  const find = (t) => { const l = t.toLowerCase(); const r = terms.find((x) => x.term.toLowerCase() === l); return r ? r.term : null; };
  const label = n.l.replace(/\s*\([^)]*\)/g, '').trim();
  const words = label.split(/[\s/]+/);
  return find(label) || find(label.replace(KIND_WORDS, '')) || (words.length === 1 ? null : words.filter((w) => w.length > 4).map(find).find(Boolean)) || null;
}

function decoderTerms(subject) {
  if (!decoderCache.has(subject)) {
    const html = REVISION[subject].decoder || '';
    const rows = [...html.matchAll(/<tr data-wk="(\d+)"><td>([\s\S]*?)<\/td>/g)]
      .map((m) => ({ wk: Number(m[1]), term: m[2].replace(/<[^>]+>/g, '').trim() })).filter((r) => r.term);
    decoderCache.set(subject, rows);
  }
  return decoderCache.get(subject);
}

/* Every Revise box that stands for several structures (a group, or a row naming a set), with the units it opens.
   The viewer's search offers each by name, so a grouped name always finds all of its members. */
export function viewerGroups() {
  const out = [];
  for (const subject of Object.keys(REVISION)) {
    const table = VIEWER_UNITS[subject] || {};
    for (const n of REVISION[subject].data.NODES) {
      const u = table[n.id];
      if (u != null && (Array.isArray(u) || n.leaf === 'group')) out.push({ label: n.l, units: [].concat(u), subject });
    }
  }
  return out;
}

/* Global search: the Revise boxes and Decoder words taught by the week each subject shows. */
export function reviseSearch(needle) {
  const q = String(needle || '').trim().toLowerCase();
  if (q.length < 3) return [];
  const out = [];
  for (const [subject, sub] of Object.entries(REVISION)) {
    const week = weekFor(subject);
    const vis = visibleAt(subject, week);
    sub.data.NODES.forEach((n) => {
      if (!vis.has(n.id)) return;
      const l = n.l.toLowerCase();
      if (!l.includes(q)) return;
      out.push({ rank: l === q ? 0 : l.startsWith(q) ? 1 : 2, hit: { kind: 'Revise', title: n.l,
        note: `${sub.copy.name} · ${n.leaf || 'topic'} · week ${firstWk(n)} · opens in Revise`,
        go: () => openRevise({ subject, id: n.id }) } });
    });
    decoderTerms(subject).forEach((r) => {
      if (r.wk > week || !r.term.toLowerCase().includes(q)) return;
      out.push({ rank: 3, hit: { kind: 'Decoder', title: r.term, note: `${sub.copy.name} Decoder · week ${r.wk}`,
        go: () => openRevise({ subject, tab: 'decoder', q: r.term }) } });
    });
  }
  return out.sort((a, b) => a.rank - b.rank || a.hit.title.length - b.hit.title.length).slice(0, 12).map((r) => r.hit);
}

/* The viewer's way back: the boxes for these units, in each subject, that the week shown has taught. */
export function reviseBoxesFor(unitIds) {
  const seen = new Set();
  const out = [];
  for (const u of unitIds) {
    for (const [subject, id] of UNIT_BOXES.get(u) || []) {
      const key = `${subject}:${id}`;
      if (seen.has(key) || !visibleAt(subject, weekFor(subject)).has(id)) continue;
      seen.add(key);
      const n = nodeOf(subject, id);
      out.push({ subject, id, label: n.l, week: firstWk(n), name: REVISION[subject].copy.name });
    }
  }
  return out;
}

/* Today: per subject, what joined Revise in the week it shows, topics before rows. */
export function newToLink() {
  return Object.entries(REVISION).map(([subject, sub]) => {
    const week = weekFor(subject);
    const fresh = [...newIds(sub.data, week)].map((id) => nodeOf(subject, id)).filter(Boolean)
      .sort((a, b) => (a.leaf ? 1 : 0) - (b.leaf ? 1 : 0));
    return { subject, name: sub.copy.name, week, count: fresh.length, first: fresh.slice(0, 3).map((n) => ({ id: n.id, label: n.l })) };
  });
}

/* Test hook: what the view believes, for work/ checks that drive it in a browser. */
export function reviseState() { return { subject: rv.subject, week: rv.week, mode: rv.mode, last: rv.last, topics: ix.ids.size, links: ix.edges.length }; }
