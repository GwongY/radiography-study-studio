/*
 * Revise · Brain 3D
 *
 * The same topics and links as the Map, drawn as a 3D network you can fly
 * through. Ported from the HSS2011_build reference (54_brain.js). It draws only
 * what ix says is shown for the chosen week, and is given a new set when the week
 * changes: nodes the graph already holds keep their place, new ones join them, so
 * a week visibly adds to the same cloud rather than starting another.
 *
 * The 3d-force-graph library (three.js bundled inside it) is loaded by revise.js
 * on first open; this module is only created once it is there. It runs only
 * while its tab is showing.
 */
import { $$, esc } from './imports.js';

/* the stage is dark, so these are the dark-theme system colours */
const COL = { tissue: '#9FB2BB', skel: '#D1A94F', musc: '#E3786B', pns: '#6FA8E8', cns: '#AE98EC', sense: '#55C4A4' };
const BG = '#071318';
const LINK = '#2E5560';
const LINK_DIM = '#10252B';
const LINK_HOT = '#8FE6F2';
const SYSORDER = ['cns', 'pns', 'musc', 'skel', 'tissue', 'sense'];

function mix(a, b, t) {
  const p = (h, i) => parseInt(h.slice(i, i + 2), 16);
  let out = '#';
  for (let i = 1; i < 7; i += 2) { const v = Math.round(p(a, i) * (1 - t) + p(b, i) * t); out += (`0${v.toString(16)}`).slice(-2); }
  return out;
}
const DIM = Object.fromEntries(Object.keys(COL).map((k) => [k, mix(COL[k], BG, 0.84)]));
const lkey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

export function createBrain(env) {
  const { ix, rv } = env;
  const NARROW = window.matchMedia('(max-width: 700px)').matches;
  const wrap = $$('rvBwrap'); const host = $$('rvBgraph');
  const labelsEl = $$('rvBlabels'); const cap = $$('rvBcap');
  const side = $$('rvBside'); const hint = $$('rvBhint');
  const jump = $$('rvBJump'); const tourSel = $$('rvBTour');
  const bprev = $$('rvBPrev'); const bnext = $$('rvBNext'); const bplay = $$('rvBPlay');
  const bspin = $$('rvBSpin'); const breset = $$('rvBReset'); const bnotes = $$('rvBNotesBtn');

  let G = null; let nodes = []; let links = []; const nodeById = {}; const labelEls = {}; const regionEls = {};
  let halosDone = false;
  let selId = null; let hoverId = null; let tour = null; let step = 0; let playTimer = null; let looping = false; let visible = false;
  let related = {}; let hotLinks = {}; let onTour = {};
  let deg = {}; let HUBS = {}; let TOURS = [];

  const why = (a, b) => { const hit = (ix.NB[a] || []).filter((p) => p[0] === b)[0]; return hit ? hit[1] : ''; };

  /* ---------- data: rebuilt on every week ---------- */
  function derive() {
    deg = {};
    ix.ids.forEach((id) => { deg[id] = (ix.NB[id] || []).length; });
    HUBS = {};
    Object.keys(deg).sort((a, b) => deg[b] - deg[a]).slice(0, NARROW ? 6 : 9).forEach((id) => { HUBS[id] = 1; });
    TOURS = env.tours().map((t) => ({ ...t, stops: t.stops.filter((s) => ix.ids.has(s)) })).filter((t) => t.stops.length >= 2);
    nodes = [...ix.ids].map((id) => {
      const n = nodeById[id] || (nodeById[id] = { id });
      n.s = ix.byId[id].s; n.deg = deg[id];
      return n;
    });
    links = [];
    const seen = {};
    ix.edges.forEach((e) => {
      const k = lkey(e[0], e[1]); if (seen[k]) return; seen[k] = 1;
      links.push({ source: e[0], target: e[1], why: e[2], k });
    });
  }

  function fillControls() {
    jump.innerHTML = '<option value="">Pick a topic…</option>';
    [...ix.ids].map((id) => ix.byId[id]).sort((a, b) => a.l.localeCompare(b.l)).forEach((n) => {
      const o = document.createElement('option'); o.value = n.id; o.textContent = n.l; jump.appendChild(o);
    });
    tourSel.innerHTML = '<option value="">Pick a pathway…</option>';
    TOURS.forEach((t, i) => { const o = document.createElement('option'); o.value = i; o.textContent = ix.threadTitles[t.th] || t.th; tourSel.appendChild(o); });
  }

  function home() {
    side.innerHTML = `<h3>Brain 3D</h3><div class="rv-hint"><p>The ${ix.ids.size} topics you have learnt so far and their ${ix.edges.length} links, as a network floating in space. Bigger dots have more links, so the hubs stand out. Each week you reach adds dots and joins them to the ones already there.</p><ul>
      <li><b>Tap a dot</b> to fly to it. Its links light up and small pulses run along them, like signals along a nerve. Its notes open here.</li>
      <li><b>Tour</b> flies you through a pathway stop by stop. Press <b>Play</b> to let it run, or use ◀ ▶. 跟住條路行一次，個次序就會記得。</li>
      <li>Colours group into six neighbourhoods. A line that jumps between two colours is a link across systems, and those are the ones exams like to ask about.</li>
      <li>Drag to turn, pinch or scroll to zoom. <b>Reset</b> zooms out to the whole brain.</li></ul></div>`;
  }

  /* ---------- build the 3D scene ---------- */
  function supportsWebGL() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch { return false; }
  }

  /* ---------- colours follow the current focus ---------- */
  const lit = (id) => { if (tour) return !!onTour[id]; if (!selId) return true; return id === selId || !!related[id]; };
  const nodeColor = (n) => (lit(n.id) ? COL[n.s] : DIM[n.s]);
  const linkColor = (l) => { if (hotLinks[l.k]) return LINK_HOT; return (selId || tour) ? LINK_DIM : LINK; };
  function refresh() {
    if (!G) return;
    G.nodeColor(G.nodeColor()).linkColor(G.linkColor()).linkWidth(G.linkWidth()).linkDirectionalParticles(G.linkDirectionalParticles());
    nodes.forEach((n) => { const m = n.__threeObj; if (m && m.__halo) m.__halo.material.opacity = lit(n.id) ? (n.id === selId ? 0.3 : 0.16) : 0.025; });
  }

  function ensureLabels() {
    nodes.forEach((n) => {
      if (labelEls[n.id]) return;
      const s = document.createElement('span'); s.textContent = ix.byId[n.id].l; s.style.display = 'none';
      s.style.setProperty('--bc', COL[n.s]);
      labelsEl.appendChild(s); labelEls[n.id] = s;
    });
    SYSORDER.forEach((sy) => {
      if (regionEls[sy]) return;
      const b = document.createElement('b'); b.className = 'region'; b.textContent = env.sysName[sy]; b.style.display = 'none';
      b.style.setProperty('--bc', COL[sy]);
      labelsEl.appendChild(b); regionEls[sy] = b;
    });
  }

  function init() {
    if (G) return;
    if (typeof window.ForceGraph3D !== 'function' || !supportsWebGL()) {
      host.innerHTML = '<div id="rvBfallback">This device cannot draw 3D graphics. The Map has the same topics and links.</div>';
      G = false; return;
    }
    /* six anchors spread around a wide ring, so each body system settles into its own named neighbourhood */
    const ANCH = {};
    SYSORDER.forEach((s, i) => {
      const a = i / SYSORDER.length * Math.PI * 2 - Math.PI / 2;
      ANCH[s] = { x: Math.cos(a) * 190, y: Math.sin(a) * 150, z: (i % 2 ? 35 : -35) };
    });
    let cn = [];
    const cluster = (alpha) => {
      cn.forEach((n) => {
        const a = ANCH[n.s]; const k = 0.2 * alpha;
        n.vx += (a.x - n.x) * k; n.vy += (a.y - n.y) * k; n.vz += (a.z - n.z) * k;
      });
    };
    cluster.initialize = (ns) => { cn = ns; };

    G = window.ForceGraph3D({ controlType: 'orbit' })(host)
      .width(wrap.clientWidth).height(wrap.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .showNavInfo(false)
      .enableNodeDrag(false)
      .nodeRelSize(3)
      .nodeResolution(24)
      .nodeOpacity(1)
      .nodeVal((n) => 1 + n.deg * 0.55)
      .nodeLabel(() => '')
      .nodeColor(nodeColor)
      .linkColor(linkColor)
      .linkOpacity(0.5)
      .linkWidth((l) => (hotLinks[l.k] ? 1.1 : 0))
      .linkDirectionalParticles((l) => (hotLinks[l.k] ? 3 : 0))
      .linkDirectionalParticleWidth(1.7)
      .linkDirectionalParticleResolution(8)
      .linkDirectionalParticleSpeed(0.007)
      .linkDirectionalParticleColor(() => '#D4FBFF')
      .onNodeHover((n) => { hoverId = n ? n.id : null; host.style.cursor = n ? 'pointer' : 'grab'; })
      .onNodeClick((n) => { stopTour(); focus(n.id, true); })
      .onBackgroundClick(() => { if (!tour) clearSel(); })
      .cooldownTicks(220)
      .graphData({ nodes, links });
    G.d3Force('cluster', cluster);
    G.d3Force('charge').strength(-70);
    G.d3Force('link').distance((l) => (l.source.s === l.target.s ? 28 : 60)).strength((l) => (l.source.s === l.target.s ? 0.4 : 0.08));

    const ctl = G.controls();
    ctl.autoRotate = true; ctl.autoRotateSpeed = 0.5; ctl.enableDamping = true;
    ctl.addEventListener('start', () => { setSpin(false); hint.hidden = true; });
    G.onEngineStop(() => { if (!selId) G.zoomToFit(900, NARROW ? 10 : 40); });
    G.cameraPosition({ x: 0, y: -60, z: NARROW ? 700 : 560 });
    ensureLabels();
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (G) G.width(wrap.clientWidth).height(wrap.clientHeight); }).observe(wrap);
    }
  }

  /* soft glow: a larger, faint, additive sphere around each dot.
     three.js is bundled inside the library, so borrow its classes from a dot the library already made. */
  function addHalos() {
    nodes.forEach((n) => {
      const m = n.__threeObj; if (!m || m.__halo || !m.geometry || !m.material) return;
      try {
        const r = (m.geometry.parameters && m.geometry.parameters.radius) || 4;
        const geo = new m.geometry.constructor(r * 2.1, 20, 14);
        const mat = new m.material.constructor({ color: COL[n.s], transparent: true, opacity: 0.16, depthWrite: false, blending: 2 });
        const h = new m.constructor(geo, mat);
        h.raycast = () => {};
        m.add(h); m.__halo = h;
      } catch { /* a halo is decoration; the dot is the point */ }
    });
  }

  /* ---------- labels: card-style HTML placed over the 3D dots every frame.
     Higher-priority labels claim their space first; a label that would overlap one already placed is skipped,
     so text never piles up. Zoom in and more labels fit. ---------- */
  function priority(id) {
    if (id === selId) return 0;
    if (id === hoverId) return 1;
    if (tour) return onTour[id] ? 2 : -1;
    if (selId) return related[id] ? 3 : -1;
    return HUBS[id] ? 4 : 6;
  }
  function labelText(id) {
    const name = esc(ix.byId[id].l);
    if (selId && related[id] && id !== selId && (id === hoverId || Object.keys(related).length <= 5)) {
      const r = why(selId, id); if (r) return `${name} <i>· ${esc(r)}</i>`;
    }
    return name;
  }
  const hideEl = (el) => { if (el.style.display !== 'none') el.style.display = 'none'; };
  function loop() {
    if (!visible || !G) { looping = false; return; }
    looping = true;
    if (!halosDone) { addHalos(); halosDone = nodes.every((n) => n.__threeObj && n.__threeObj.__halo); }
    const cam = G.camera(); const e = cam.matrixWorld.elements;
    const fx = -e[8]; const fy = -e[9]; const fz = -e[10];
    const cx = cam.position.x; const cy = cam.position.y; const cz = cam.position.z;
    const W = wrap.clientWidth; const Hh = wrap.clientHeight;
    const pxPerUnit = G.renderer().domElement.clientHeight / (2 * Math.tan(cam.fov * Math.PI / 360));
    const depthOf = (x, y, z) => (x - cx) * fx + (y - cy) * fy + (z - cz) * fz;
    const placed = [];
    const free = (r) => {
      for (let i = 0; i < placed.length; i++) {
        const q = placed[i];
        if (r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y) return false;
      }
      return true;
    };
    /* region titles first (overview only), placed just above the highest dot of each system on screen */
    const showRegions = !selId && !tour; const box = {};
    if (showRegions) {
      nodes.forEach((n) => {
        if (n.x === undefined || depthOf(n.x, n.y, n.z) < 5) return;
        const p = G.graph2ScreenCoords(n.x, n.y, n.z); const b = box[n.s] || (box[n.s] = { sx: 0, k: 0, top: Infinity });
        b.sx += p.x; b.k++; b.top = Math.min(b.top, p.y - 3 * Math.cbrt(1 + n.deg * 0.55) * pxPerUnit / depthOf(n.x, n.y, n.z));
      });
    }
    Object.keys(regionEls).forEach((sy) => {
      const el = regionEls[sy]; const b = box[sy];
      if (!showRegions || !b) { hideEl(el); return; }
      if (!el.__w) { el.style.display = ''; el.__w = el.offsetWidth; }
      const w = el.__w; const h = 16;
      const r = { x: b.sx / b.k - w / 2, y: b.top - h - 10, w, h };
      if (r.x < 0 || r.x + w > W || r.y < 0 || r.y > Hh) { hideEl(el); return; }
      el.style.display = ''; placed.push({ x: r.x - 6, y: r.y - 4, w: w + 12, h: h + 8 });
      el.style.transform = `translate(${r.x.toFixed(1)}px,${r.y.toFixed(1)}px)`;
    });
    /* topic cards, best first: selected, hovered, linked or tour stops, hubs, then the nearest of the rest */
    const cands = [];
    Object.keys(labelEls).forEach((id) => {
      const n = nodeById[id]; const el = labelEls[id];
      if (!n || !ix.ids.has(id)) { hideEl(el); return; }
      const pr = priority(id);
      if (n.x === undefined || pr < 0) { hideEl(el); return; }
      const d = depthOf(n.x, n.y, n.z);
      if (d < 5) { hideEl(el); return; }
      cands.push({ n, el, pr, d });
    });
    cands.sort((a, b) => a.pr - b.pr || a.d - b.d);
    cands.forEach((c) => {
      const { n, el } = c;
      const p = G.graph2ScreenCoords(n.x, n.y, n.z);
      const html = labelText(n.id);
      if (el.__h !== html) { el.innerHTML = html; el.__h = html; el.__w = 0; }
      const cls = n.id === selId ? 'sel' : (related[n.id] || onTour[n.id] ? 'rel' : (HUBS[n.id] ? 'hub' : ''));
      if (el.className !== cls) { el.className = cls; el.__w = 0; }
      if (!el.__w) { el.style.display = ''; el.__w = el.offsetWidth; el.__hh = el.offsetHeight; }
      const rad = 3 * Math.cbrt(1 + n.deg * 0.55) * pxPerUnit / c.d;
      const r = { x: p.x + rad + 5, y: p.y - el.__hh / 2, w: el.__w, h: el.__hh };
      if (r.x + r.w > W - 4) r.x = p.x - rad - 5 - r.w;
      const must = c.pr <= 1;
      if (r.x > W || r.x + r.w < 0 || r.y > Hh || r.y + r.h < 0 || (!must && !free(r))) { hideEl(el); return; }
      placed.push({ x: r.x - 3, y: r.y - 2, w: r.w + 6, h: r.h + 4 });
      el.style.display = '';
      el.style.opacity = c.pr <= 3 ? 1 : Math.max(0.7, Math.min(1, 380 / c.d)).toFixed(2);
      el.style.transform = `translate(${r.x.toFixed(1)}px,${r.y.toFixed(1)}px)`;
    });
    requestAnimationFrame(loop);
  }

  /* ---------- focus a topic: fly the camera to it, light its links ---------- */
  function setSpin(on) {
    if (G) G.controls().autoRotate = on;
    bspin.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function flyTo(n, ms) {
    const dist = NARROW ? 240 : 185;
    const h = Math.hypot(n.x, n.y, n.z) || 1; const r = 1 + dist / h;
    G.cameraPosition({ x: n.x * r, y: n.y * r, z: n.z * r + 1 }, { x: n.x, y: n.y, z: n.z }, ms);
  }
  function focus(id, fly) {
    if (!ix.ids.has(id)) return;
    selId = id; related = {}; hint.hidden = true;
    if (!tour) {
      hotLinks = {};
      (ix.NB[id] || []).forEach((p) => { related[p[0]] = 1; hotLinks[lkey(id, p[0])] = 1; });
    }
    jump.value = id;
    env.renderPanel(id, side);
    bnotes.hidden = !NARROW;
    refresh();
    if (G && fly) { const n = nodeById[id]; if (n && n.x !== undefined) flyTo(n, 1300); }
  }
  function clearSel() {
    selId = null; related = {}; hotLinks = {}; jump.value = ''; bnotes.hidden = true;
    home(); refresh();
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
    tour = TOURS[i]; step = 0; onTour = {}; hotLinks = {};
    tour.stops.forEach((id, j) => {
      onTour[id] = 1;
      if (j && why(tour.stops[j - 1], id)) hotLinks[lkey(tour.stops[j - 1], id)] = 1;
    });
    setSpin(false);
    go(0);
  }
  function go(j) {
    step = j;
    const id = tour.stops[j]; const prev = j ? tour.stops[j - 1] : null;
    focus(id, true);
    const r = prev ? why(prev, id) : '';
    cap.innerHTML = `<span class="step">${esc(ix.threadTitles[tour.th] || '')} · stop ${j + 1} of ${tour.stops.length}</span>${
      prev ? `${esc(ix.byId[prev].l)} → ` : ''}<b>${esc(ix.byId[id].l)}</b>${r ? `: ${esc(r)}` : ''}`;
    cap.hidden = false;
    setTourButtons();
  }
  function stopPlay() {
    if (playTimer) { clearInterval(playTimer); playTimer = null; }
    bplay.setAttribute('aria-pressed', 'false'); bplay.textContent = 'Play';
  }
  function stopTour() {
    if (!tour) return;
    stopPlay(); tour = null; onTour = {}; hotLinks = {}; cap.hidden = true; tourSel.value = '';
    setTourButtons();
  }

  /* ---------- controls: bound once ---------- */
  tourSel.addEventListener('change', () => { if (!G) return; if (tourSel.value === '') { stopTour(); clearSel(); } else startTour(+tourSel.value); });
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
  jump.addEventListener('change', () => { if (!G) return; stopTour(); if (jump.value) focus(jump.value, true); else clearSel(); });
  bspin.addEventListener('click', () => { setSpin(bspin.getAttribute('aria-pressed') !== 'true'); });
  breset.addEventListener('click', () => { if (!G) return; stopTour(); clearSel(); G.zoomToFit(900, 30); setSpin(true); });
  bnotes.addEventListener('click', () => { side.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  side.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.node) { stopTour(); focus(b.dataset.node, true); wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (b.dataset.thread) env.openThread(b.dataset.thread);
  });
  side.addEventListener('mouseover', (ev) => {
    const b = ev.target.closest && ev.target.closest('.nbtn[data-node]');
    hoverId = b ? b.dataset.node : null;
  });
  side.addEventListener('mouseleave', () => { hoverId = null; });

  /* ---------- the week changed: same cloud, more in it ---------- */
  function setData() {
    derive();
    fillControls();
    if (tour && !TOURS.some((t) => t.th === tour.th)) stopTour();
    if (selId && !ix.ids.has(selId)) { selId = null; related = {}; hotLinks = {}; }
    if (G) {
      ensureLabels();
      halosDone = false;
      G.graphData({ nodes, links });
      if (G.d3ReheatSimulation) G.d3ReheatSimulation();
      G.onEngineStop(() => { if (!selId) G.zoomToFit(900, NARROW ? 10 : 40); });
      refresh();
    }
    if (selId) env.renderPanel(selId, side); else home();
  }

  /* ---------- only run while the tab is showing ---------- */
  function show() {
    visible = true;
    init();
    if (!G) return;
    G.width(wrap.clientWidth).height(wrap.clientHeight);
    G.resumeAnimation();
    if (!looping) requestAnimationFrame(loop);
  }
  function hide() {
    visible = false; stopPlay();
    if (G) G.pauseAnimation();
  }

  home();
  return { setData, show, hide, focus: (id) => focus(id, true) };
}
