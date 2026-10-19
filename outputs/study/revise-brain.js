/*
 * Revise · Brain 3D — the connections hub
 *
 * One topic at the centre, what it links to round it, the next step out faint
 * behind. Tap anything to bring it to the centre; the trail keeps the chain you
 * walked. The Map shows what belongs where; this shows how things connect, so
 * it draws cross-links only, never the tree (the tree appears as one grey ball
 * at the top: the branch the topic sits in on the Map).
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md.
 *
 * Where each ball goes is decided by revision/hub.js (pure, checked in node);
 * the 3d-force-graph library only draws it. Its forces are set to nothing and
 * its engine kept ticking, so every ball sits exactly at fx/fy/fz and moves only
 * when this module tweens it there. The library (three.js inside it) is loaded
 * by revise.js on first open; this module runs only while its tab is showing.
 */
import { $$, esc } from './imports.js';
import { hubLayout } from '../revision/hub.js?v=1';
import { linkRows } from '../revision/link-rows.js?v=1';
import { bindLinkList, markLinkRow, renderLinkList } from './revise-links.js';

/* the stage is dark, so these are the dark-theme system colours */
const COL = { tissue: '#9FB2BB', skel: '#D1A94F', musc: '#E3786B', pns: '#6FA8E8', cns: '#AE98EC', sense: '#55C4A4', cv: '#E879C6' };
const BG = '#071318';
const PARENT_COL = '#7F9FA7';
const LINK = '#3B6F7B';
const LINK_FAINT = '#163238';
const LINK_PARENT = '#4D6A71';
const LINK_HOT = '#8FE6F2';
const TWEEN_MS = 600;

function mix(a, b, t) {
  const p = (h, i) => parseInt(h.slice(i, i + 2), 16);
  let out = '#';
  for (let i = 1; i < 7; i += 2) { const v = Math.round(p(a, i) * (1 - t) + p(b, i) * t); out += (`0${v.toString(16)}`).slice(-2); }
  return out;
}
const DIM = Object.fromEntries(Object.keys(COL).map((k) => [k, mix(COL[k], BG, 0.55)]));

export function createBrain(env) {
  const { ix } = env;
  const NARROW = window.matchMedia('(max-width: 700px)').matches;
  const TRAIL_MAX = NARROW ? 3 : 5;
  const wrap = $$('rvBwrap'); const host = $$('rvBgraph');
  const labelsEl = $$('rvBlabels'); const dotsEl = $$('rvBdots'); const cap = $$('rvBcap');
  const side = $$('rvBside'); const trailEl = $$('rvBTrail'); const moreBtn = $$('rvBMore');
  const listEl = $$('rvBLinkList');
  const jump = $$('rvBJump'); const tourSel = $$('rvBTour');
  const bprev = $$('rvBPrev'); const bnext = $$('rvBNext'); const bplay = $$('rvBPlay');
  const bspin = $$('rvBSpin'); const bnotes = $$('rvBNotesBtn');

  let G = null; let visible = false; let looping = false;
  let centre = null; let trail = []; let lay = null; let rows = []; let hot = null;
  let shownNow = new Set(); let tween = null; let seenMapSel = null; let down = null;
  let tour = null; let step = 0; let playTimer = null; let TOURS = [];
  const nodeById = {}; const labelEls = {}; const dotEls = [];

  const label = (id) => ix.byId[id].l;
  const degree = (id) => (ix.NB[id] || []).length;
  const why = (a, b) => { const hit = (ix.NB[a] || []).filter((p) => p[0] === b)[0]; return hit ? hit[1] : ''; };
  /* the nearest real topic above id on the Map, if it is shown this week */
  const parentOf = (id) => { let k = ix.PARENT[id]; while (k && !ix.byId[k]) k = ix.PARENT[k]; return k && ix.ids.has(k) ? k : null; };

  /* ---------- the layout for one centre ---------- */
  function layoutFor(id) {
    const parent = parentOf(id);
    const first = (ix.NB[id] || []).filter(([o]) => ix.ids.has(o) && o !== parent).map(([o]) => ({ id: o, sys: ix.byId[o].s, deg: degree(o) }));
    const second = [];
    first.forEach((f) => (ix.NB[f.id] || []).forEach(([o]) => { if (o !== id && ix.ids.has(o)) second.push({ id: o, via: f.id }); }));
    return hubLayout({ first, parent, second });
  }

  /* ---------- drawing ---------- */
  const nodeVal = (n) => (n.ring === 0 ? 9 : n.ring === 1 ? 2 + Math.min(3, degree(n.id) * 0.15) : n.ring === 'p' ? 1.6 : 0.7);
  const nodeColor = (n) => (n.ring === 'p' ? PARENT_COL : n.ring === 2 ? DIM[n.s] : COL[n.s]);
  const isHot = (l) => l.ring !== 2 && l.id === hot;
  const linkColor = (l) => (isHot(l) ? LINK_HOT : l.ring === 2 ? LINK_FAINT : l.ring === 'p' ? LINK_PARENT : LINK);

  function graphFor(L) {
    const ids = [centre].concat(L.parent ? [L.parent] : [], L.shown, L.second);
    /* a fresh object per layout (the library hangs its own state on node objects, so one it
       dropped is not handed back), carrying the old position so place() can tween from it */
    const nodes = ids.map((id) => {
      const old = nodeById[id];
      const n = { id, s: ix.byId[id].s, ring: id === centre ? 0 : id === L.parent ? 'p' : L.via[id] ? 2 : 1 };
      if (old && old.x !== undefined) { n.x = old.x; n.y = old.y; n.z = old.z; }
      nodeById[id] = n;
      return n;
    });
    const links = L.shown.map((o) => ({ source: centre, target: o, id: o, ring: 1 }));
    if (L.parent) links.push({ source: centre, target: L.parent, id: L.parent, ring: 'p' });
    L.second.forEach((o) => links.push({ source: L.via[o], target: o, id: o, ring: 2 }));
    return { nodes, links };
  }

  /* Hand the library the new set. Each ball starts where it was (or, if new, where the new
     centre was) and tweens to its place, so the chosen topic is seen flying to the middle. */
  function place(L, animate) {
    const c = nodeById[centre];
    const origin = c && c.x !== undefined && shownNow.has(centre) ? { x: c.x, y: c.y, z: c.z } : { x: 0, y: 0, z: 0 };
    const data = graphFor(L);
    const from = {};
    data.nodes.forEach((n) => {
      from[n.id] = n.x !== undefined && shownNow.has(n.id) ? { x: n.x, y: n.y, z: n.z } : origin;
      n.to = n.id === centre ? { x: 0, y: 0, z: 0 } : L.pos[n.id];
      n.x = n.fx = from[n.id].x; n.y = n.fy = from[n.id].y; n.z = n.fz = from[n.id].z;
    });
    shownNow = new Set(data.nodes.map((n) => n.id));
    G.graphData(data);
    tween = { t0: performance.now(), ms: animate ? TWEEN_MS : 0, from, nodes: data.nodes };
    stepTween(performance.now());
  }
  function stepTween(now) {
    if (!tween) return;
    const t = tween.ms ? Math.min(1, (now - tween.t0) / tween.ms) : 1;
    const e = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
    tween.nodes.forEach((n) => {
      const a = tween.from[n.id]; const b = n.to;
      n.fx = a.x + (b.x - a.x) * e; n.fy = a.y + (b.y - a.y) * e; n.fz = a.z + (b.z - a.z) * e;
    });
    if (t >= 1) tween = null;
  }
  function refresh() {
    if (!G) return;
    G.nodeVal(G.nodeVal()).nodeColor(G.nodeColor()).linkColor(G.linkColor()).linkWidth(G.linkWidth()).linkDirectionalParticles(G.linkDirectionalParticles());
  }

  /* ---------- the list, the trail, the panel ---------- */
  const linkList = bindLinkList(listEl, {
    onHot: (id) => { hot = id; refresh(); },
    onOpen: (id) => { stopTour(); recentre(id, true); wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
  });

  function paintTrail() {
    trailEl.innerHTML = trail.map((id, i) => (i === trail.length - 1
      ? `<b>${esc(label(id))}</b>`
      : `<button type="button" data-trail="${i}">${esc(label(id))}</button>`)).join('<span aria-hidden="true">›</span>')
      + (trail.length > 1 ? '<button type="button" class="rv-back" data-back="1">Back</button>' : '');
  }

  function home() {
    side.innerHTML = `<h3>Brain 3D: how things connect</h3><div class="rv-hint"><p>One topic sits in the middle. Round it are the topics it links to; the faint dots further out are the next step. The Map shows what belongs where; this shows the links across it.</p><ul>
      <li><b>Tap any ball or name</b> to bring it to the middle. The trail at the top keeps the chain you walked; <b>Back</b> steps back.</li>
      <li>The numbers on the lines match the <b>Links</b> list under the picture. Tap a row to light up its line, tap it again to go there.</li>
      <li>The grey ball at the top is the branch the topic sits in on the Map.</li>
      <li><b>Tour</b> walks one pathway stop by stop. 跟住條路行一次，個次序就會記得。</li>
      <li>Drag to turn, pinch or scroll to zoom.</li></ul></div>`;
  }

  /* ---------- bring a topic to the centre ---------- */
  function recentre(id, push) {
    if (!ix.ids.has(id)) return;
    if (push) {
      const i = trail.indexOf(id);
      if (i >= 0) trail = trail.slice(0, i + 1);
      else { trail.push(id); if (trail.length > TRAIL_MAX) trail = trail.slice(-TRAIL_MAX); }
    }
    centre = id; hot = null;
    lay = layoutFor(id);
    rows = linkRows(ix.NB[id], { label });
    renderLinkList(listEl, rows);
    linkList.reset();
    jump.value = id;
    env.renderPanel(id, side);
    bnotes.hidden = !NARROW;
    paintTrail();
    moreBtn.hidden = !lay.more.length;
    moreBtn.textContent = `+${lay.more.length} more in the list`;
    if (G) { place(lay, true); refresh(); }
  }

  /* ---------- labels and numbered dots, placed over the 3D every frame ---------- */
  function labelFor(id) {
    let el = labelEls[id];
    if (!el) { el = document.createElement('span'); el.dataset.id = id; el.style.display = 'none'; labelsEl.appendChild(el); labelEls[id] = el; }
    const par = lay && id === lay.parent;
    const cls = id === centre ? 'sel' : par ? 'par' : id === hot ? 'rel' : '';
    const text = par ? `in ${label(id)}` : label(id);
    if (el.className !== cls || el.__t !== text) { el.className = cls; el.textContent = text; el.__t = text; el.__w = 0; }
    el.style.setProperty('--bc', par ? PARENT_COL : COL[ix.byId[id].s]);
    return el;
  }
  function dotEl(i) {
    if (!dotEls[i]) { const s = document.createElement('span'); dotsEl.appendChild(s); dotEls[i] = s; }
    return dotEls[i];
  }
  function loop() {
    if (!visible || !G) { looping = false; return; }
    looping = true;
    stepTween(performance.now());
    const cam = G.camera(); const e = cam.matrixWorld.elements;
    const fx = -e[8]; const fy = -e[9]; const fz = -e[10];
    const cx = cam.position.x; const cy = cam.position.y; const cz = cam.position.z;
    const depthOf = (x, y, z) => (x - cx) * fx + (y - cy) * fy + (z - cz) * fz;
    const W = wrap.clientWidth; const H = wrap.clientHeight;
    const c0 = nodeById[centre];
    const dc = c0 && c0.x !== undefined ? depthOf(c0.x, c0.y, c0.z) : 0;
    const placed = [];
    const free = (r) => placed.every((q) => !(r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y));
    const showing = new Set();
    if (lay) {
      const pr = (id) => (id === centre ? 0 : id === hot ? 1 : id === lay.parent ? 2 : 3);
      const cands = [centre].concat(lay.parent ? [lay.parent] : [], lay.shown)
        .map((id) => ({ id, n: nodeById[id] })).filter((c) => c.n && c.n.x !== undefined)
        .map((c) => ({ ...c, d: depthOf(c.n.x, c.n.y, c.n.z) }));
      cands.sort((a, b) => pr(a.id) - pr(b.id) || a.d - b.d);
      cands.forEach((c) => {
        const el = labelFor(c.id);
        const p = G.graph2ScreenCoords(c.n.x, c.n.y, c.n.z);
        if (!el.__w) { el.style.display = ''; el.__w = el.offsetWidth; el.__h = el.offsetHeight; }
        const r = { x: Math.max(2, Math.min(W - el.__w - 2, p.x - el.__w / 2)), y: p.y - el.__h - (c.id === centre ? 16 : 9), w: el.__w, h: el.__h };
        if (r.y < 0 || r.y > H || (pr(c.id) > 1 && !free(r))) return;
        placed.push({ x: r.x - 3, y: r.y - 2, w: r.w + 6, h: r.h + 4 });
        showing.add(c.id);
        el.style.display = '';
        el.style.opacity = c.d > dc + 40 ? '0.7' : '1';
        el.style.transform = `translate(${r.x.toFixed(1)}px,${r.y.toFixed(1)}px)`;
      });
    }
    Object.keys(labelEls).forEach((id) => { if (!showing.has(id)) labelEls[id].style.display = 'none'; });
    let used = 0;
    if (lay && c0 && c0.x !== undefined) {
      rows.forEach((r) => {
        const n = nodeById[r.id];
        if (!lay.pos[r.id] || !n || n.x === undefined || !shownNow.has(r.id)) return;
        const mx = c0.x + (n.x - c0.x) * 0.55; const my = c0.y + (n.y - c0.y) * 0.55; const mz = c0.z + (n.z - c0.z) * 0.55;
        const p = G.graph2ScreenCoords(mx, my, mz);
        const el = dotEl(used++);
        if (el.__t !== r.n) { el.textContent = r.n; el.__t = r.n; }
        el.className = r.id === hot ? 'hot' : '';
        el.style.display = '';
        el.style.opacity = depthOf(mx, my, mz) > dc + 30 ? '0.7' : '1';
        el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px)`;
      });
    }
    for (let i = used; i < dotEls.length; i++) dotEls[i].style.display = 'none';
    requestAnimationFrame(loop);
  }

  /* ---------- the scene ---------- */
  function supportsWebGL() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch { return false; }
  }
  function setSpin(on) {
    if (G) G.controls().autoRotate = on;
    bspin.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function init() {
    if (G !== null) return;
    if (typeof window.ForceGraph3D !== 'function' || !supportsWebGL()) {
      host.innerHTML = '<div id="rvBfallback">This device cannot draw 3D graphics. The Links list and the Map show the same links.</div>';
      G = false; return;
    }
    G = window.ForceGraph3D({ controlType: 'orbit' })(host)
      .width(wrap.clientWidth).height(wrap.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .showNavInfo(false)
      .enableNodeDrag(false)
      .enablePointerInteraction(false)
      .nodeRelSize(4)
      .nodeResolution(20)
      .nodeOpacity(1)
      .nodeVal(nodeVal)
      .nodeLabel(() => '')
      .nodeColor(nodeColor)
      .linkColor(linkColor)
      .linkOpacity(0.75)
      .linkWidth((l) => (isHot(l) ? 1.4 : 0))
      .linkDirectionalParticles((l) => (isHot(l) ? 3 : 0))
      .linkDirectionalParticleWidth(1.8)
      .linkDirectionalParticleResolution(8)
      .linkDirectionalParticleSpeed(0.008)
      .linkDirectionalParticleColor(() => '#D4FBFF')
      .d3AlphaDecay(0)
      .d3VelocityDecay(1)
      .cooldownTicks(Infinity)
      .cooldownTime(Infinity)
      .graphData({ nodes: [], links: [] });
    /* The balls sit where hub.js puts them: no pull, no push, no drift. The link force
       stays, at zero strength, because it is what turns link ids into node objects. */
    G.d3Force('charge').strength(0);
    G.d3Force('link').strength(0);
    G.d3Force('center', null);
    const ctl = G.controls();
    ctl.autoRotate = true; ctl.autoRotateSpeed = 0.6; ctl.enableDamping = true;
    ctl.addEventListener('start', () => setSpin(false));
    G.cameraPosition({ x: 0, y: 60, z: NARROW ? 560 : 470 }, { x: 0, y: 0, z: 0 });
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (G) G.width(wrap.clientWidth).height(wrap.clientHeight); }).observe(wrap);
    }
  }

  /* ---------- tours ---------- */
  function setTourButtons() {
    const on = !!tour;
    bprev.disabled = !on || step === 0;
    bnext.disabled = !on || step >= tour.stops.length - 1;
    bplay.disabled = !on;
  }
  function startTour(i) {
    stopPlay();
    tour = TOURS[i]; step = 0;
    setSpin(false);
    go(0);
  }
  function go(j) {
    step = j;
    const id = tour.stops[j]; const prev = j ? tour.stops[j - 1] : null;
    trail = tour.stops.slice(0, j + 1).slice(-TRAIL_MAX);
    recentre(id, false);
    hot = prev && lay && lay.pos[prev] ? prev : null;
    markLinkRow(listEl, hot);
    refresh();
    const r = prev ? why(prev, id) : '';
    cap.innerHTML = `<span class="step">${esc(ix.threadTitles[tour.th] || '')} · stop ${j + 1} of ${tour.stops.length}</span>${
      prev ? `${esc(label(prev))} → ` : ''}<b>${esc(label(id))}</b>${r ? `: ${esc(r)}` : ''}`;
    cap.hidden = false;
    setTourButtons();
  }
  function stopPlay() {
    if (playTimer) { clearInterval(playTimer); playTimer = null; }
    bplay.setAttribute('aria-pressed', 'false'); bplay.textContent = 'Play';
  }
  function stopTour() {
    if (!tour) return;
    stopPlay(); tour = null; cap.hidden = true; tourSel.value = '';
    setTourButtons();
  }

  /* ---------- controls: bound once ---------- */
  tourSel.addEventListener('change', () => { if (tourSel.value === '') stopTour(); else startTour(+tourSel.value); });
  bprev.addEventListener('click', () => { if (tour && step > 0) { stopPlay(); go(step - 1); } });
  bnext.addEventListener('click', () => { if (tour && step < tour.stops.length - 1) { stopPlay(); go(step + 1); } });
  bplay.addEventListener('click', () => {
    if (!tour) return;
    if (playTimer) { stopPlay(); return; }
    if (step >= tour.stops.length - 1) go(0);
    bplay.setAttribute('aria-pressed', 'true'); bplay.textContent = 'Pause';
    playTimer = setInterval(() => {
      if (step >= tour.stops.length - 1) { stopPlay(); return; }
      go(step + 1);
    }, 4200);
  });
  jump.addEventListener('change', () => { if (jump.value) { stopTour(); recentre(jump.value, true); } });
  bspin.addEventListener('click', () => { setSpin(bspin.getAttribute('aria-pressed') !== 'true'); });
  bnotes.addEventListener('click', () => { side.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  moreBtn.addEventListener('click', () => { listEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  trailEl.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    stopTour();
    if (b.dataset.back) { trail.pop(); recentre(trail[trail.length - 1], false); return; }
    const i = Number(b.dataset.trail); trail = trail.slice(0, i + 1); recentre(trail[i], false);
  });
  labelsEl.addEventListener('click', (ev) => {
    const s = ev.target.closest('span[data-id]');
    if (s && s.dataset.id !== centre) { stopTour(); recentre(s.dataset.id, true); }
  });
  /* A tap (not a drag) picks the nearest ball within 24 px: easier on a phone than hitting the ball itself. */
  host.addEventListener('pointerdown', (ev) => { down = { x: ev.clientX, y: ev.clientY }; });
  host.addEventListener('pointerup', (ev) => {
    if (!down || !G || Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = host.getBoundingClientRect(); const x = ev.clientX - r.left; const y = ev.clientY - r.top;
    let best = null; let bd = 24;
    shownNow.forEach((id) => {
      const n = nodeById[id]; if (!n || n.x === undefined) return;
      const p = G.graph2ScreenCoords(n.x, n.y, n.z); const d = Math.hypot(p.x - x, p.y - y);
      if (d < bd) { bd = d; best = id; }
    });
    if (best && best !== centre) { stopTour(); recentre(best, true); }
  });
  side.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.node) { stopTour(); recentre(b.dataset.node, true); wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (b.dataset.thread) env.openThread(b.dataset.thread);
    if (b.dataset.to3d && b.dataset.to3d !== centre) { stopTour(); recentre(b.dataset.to3d, true); }
  });

  /* ---------- the week changed: same centre if it is still taught ---------- */
  function fillControls() {
    jump.innerHTML = '<option value="">Pick a topic…</option>';
    [...ix.ids].map((id) => ix.byId[id]).sort((a, b) => a.l.localeCompare(b.l)).forEach((n) => {
      const o = document.createElement('option'); o.value = n.id; o.textContent = n.l; jump.appendChild(o);
    });
    tourSel.innerHTML = '<option value="">Pick a pathway…</option>';
    TOURS.forEach((t, i) => { const o = document.createElement('option'); o.value = i; o.textContent = ix.threadTitles[t.th] || t.th; tourSel.appendChild(o); });
  }
  function setData() {
    TOURS = env.tours().map((t) => ({ ...t, stops: t.stops.filter((s) => ix.ids.has(s)) })).filter((t) => t.stops.length >= 2);
    fillControls();
    if (tour && !TOURS.some((t) => t.th === tour.th)) stopTour();
    trail = trail.filter((id) => ix.ids.has(id));
    if (centre && !ix.ids.has(centre)) centre = trail.length ? trail[trail.length - 1] : null;
    const fallback = centre ? null : env.newest();
    if (centre) recentre(centre, false);
    else if (fallback) recentre(fallback, true);
    else { lay = null; rows = []; renderLinkList(listEl, rows); moreBtn.hidden = true; paintTrail(); home(); }
  }

  /* ---------- only run while the tab is showing ---------- */
  function show() {
    visible = true;
    init();
    const sel = env.mapSelected();
    if (sel && ix.ids.has(sel) && sel !== seenMapSel) {
      seenMapSel = sel;
      if (sel !== centre) { stopTour(); recentre(sel, true); }
    } else if (!centre) {
      const n = env.newest(); if (n) recentre(n, true);
    }
    if (!G) return;
    G.width(wrap.clientWidth).height(wrap.clientHeight);
    G.resumeAnimation();
    if (lay && !shownNow.size) { place(lay, false); refresh(); }
    if (!looping) requestAnimationFrame(loop);
  }
  function hide() {
    visible = false; stopPlay();
    if (G) G.pauseAnimation();
  }

  home();
  return {
    setData, show, hide,
    focus: (id) => { stopTour(); if (id !== centre) recentre(id, true); },
  };
}
