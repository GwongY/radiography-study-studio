/* M-mode for the atlas's ultrasound scenario: a yellow cursor over the 2D sector, the M-mode strip it
 * produces, and the automatic measurements (Ao/LA, LV dimensions and wall thickness, TAPSE).
 *
 * The cursor geometry and the strip are BetterHeart's (mmode.js, ported by work/port-betterheart.mjs);
 * this module is the host side: it reads the sector's placement from the echo renderer, handles the
 * pointer, paints the cursor and the measurement bars, and keeps the panel in step. It is written for the
 * atlas's own echo code (atlas.js) rather than the site's page.
 *
 * Nothing here runs at module scope. */
import * as THREE from 'three';
import { tr } from './i18n.js?v=1';
import { sliceMesh } from './echo-sim.js?v=21';
import { computeValveRings } from './valve-rings.js?v=2';
import { createMmodeGeometry, createMmode, rotateBeam, MM_COLORS } from './mmode.js?v=9';

const HINT = tr('左右拖曳 2D 影像上的黃色游標可調整 M-mode 位置：游標在二尖瓣左側量左心室（IVS、LVID、LVPW、EF），在右側量 Ao、LA；按左上角暫停鈕後自動量測。');

/* ctx: { rest(): [{key, group, pos, idx}], frames(): the echo frames, views: ECHO_VIEWS, heartbeat, beat(): the current beat,
          view(): the echo view id, setView(id), size(): the renderer's [W, H], canvas(): the 2D sector canvas } */
export function createMmodeUi(ctx) {
  const $ = (id) => document.getElementById('ha-' + id);
  let mode = null, data = null, mm = null, last = 0, pausedDrawn = false, theta = 0, measure = null, rr = null, cursor3d = null, drag = false, pending = false, wired = false;

  function ensure() {
    if (data) return;
    const rest = ctx.rest();
    data = createMmodeGeometry(ctx.frames(), computeValveRings(rest), rest, sliceMesh);
    const plax = ctx.views.find((v) => v.id === 'PLAX'), a4c = ctx.views.find((v) => v.id === 'A4C');
    /* group 'MM' keeps these out of the TTE/TEE view buttons; they are reached from the M-mode row. */
    const metas = {
      AO: { ...plax, id: 'MM_AO', group: 'MM', name: tr('胸骨旁長軸 M-mode（Ao／LA）'), english: 'PLAX M-mode (Ao/LA)', text: tr('游標從探頭垂直穿過主動脈根部與左心房：上方是右心室流出道，中間兩條平行亮線是主動脈前後壁，收縮期一起往前移動；主動脈瓣打開時呈「箱形」。舒張末期（QRS）量 Ao，收縮末期量 LA。') },
      LV: { ...plax, id: 'MM_LV', group: 'MM', name: tr('胸骨旁長軸 M-mode（左心室）'), english: 'PLAX M-mode (LV)', text: tr('游標在二尖瓣瓣尖下方，垂直穿過心室中隔與左心室後壁：由上而下是右心室、心室中隔、左心室腔、左心室後壁與心包膜。收縮期中隔與後壁向內移動並增厚。舒張末期（QRS）量 IVSd、LVIDd、LVPWd，收縮末期量 IVSs、LVIDs、LVPWs。') },
      TAPSE: { ...a4c, id: 'MM_TAPSE', group: 'MM', name: tr('心尖四腔 M-mode（TAPSE）'), english: 'A4C M-mode (TAPSE)', text: tr('游標從心尖沿右心室游離壁穿過三尖瓣外側瓣環：收縮期瓣環往心尖（探頭）移動，呈波浪狀亮線。瓣環最低點到最高點的距離就是 TAPSE，正常 ≥ 1.7 cm。') },
    };
    for (const k of ['AO', 'LV', 'TAPSE']) {
      ctx.frames()['MM_' + k] = data.P[k];
      if (!ctx.views.some((v) => v.id === 'MM_' + k)) ctx.views.push(metas[k]);
    }
    mm = createMmode($('mmodeCanvas'));
  }

  /* PLAX presets measure whatever the cursor crosses: LV parameters left of the mitral valve, Ao/LA right of it. */
  function apply(preset) {
    const kind = preset === 'TAPSE' ? 'TAPSE' : data.side(preset, theta);
    mm.reset(kind, data.rest(kind, theta, preset), data.P[preset]);
  }

  const rate = () => +$('heartRate').value || 70;
  const phase = () => { const b = ctx.beat(); return b ? b.phase : 0; };

  function updateButtons() {
    for (const b of document.querySelectorAll('[data-ha-mmode]')) {
      const on = (b.dataset.haMmode || null) === mode;
      b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
    }
  }

  function updateCursor3d() {
    if (!cursor3d || !mode) return;
    const fr = ctx.frames()[ctx.view()], q = rotateBeam(fr, theta), O = new THREE.Vector3(...fr.O);
    cursor3d.geometry.setFromPoints([O, O.clone().addScaledVector(new THREE.Vector3(...q.d), fr.depth)]);
    cursor3d.computeLineDistances();
  }

  function setTheta(a) {
    const frame = ctx.frames()[ctx.view()], h = (frame && frame.half) || 0.6;
    theta = Math.max(-h * 0.95, Math.min(h * 0.95, a));
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      if (!mode) return;
      apply(mode); mm.prefill(phase(), rate()); pausedDrawn = false; measure = null; updateCursor3d();
    });
  }

  function wire() {
    if (wired) return;
    wired = true;
    const c = ctx.canvas();
    const ang = (e) => {
      if (!rr) return null;
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) * c.width / r.width, py = (e.clientY - r.top) * c.height / r.height;
      const [ox, oy] = rr.offset, k = rr.scale, ay = oy + 8 * k;
      if (py <= ay) return null;
      return Math.atan2(px - (ox + ctx.size()[0] / 2 * k), py - ay);
    };
    c.addEventListener('pointerdown', (e) => {
      if (!mode) return;
      const a = ang(e), frame = ctx.frames()[ctx.view()];
      if (a === null || Math.abs(a) > ((frame && frame.half) || 0.6)) return;
      drag = true; try { c.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
      setTheta(a); e.preventDefault();
    });
    c.addEventListener('pointermove', (e) => { if (!drag) return; const a = ang(e); if (a !== null) setTheta(a); });
    const end = () => { drag = false; };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  }

  return {
    active: () => !!mode,
    mode: () => mode,
    /* Start (or, with null, stop) an M-mode. Returns the echo view now showing. */
    set(m) {
      wire();
      if (!m) { const base = mode === 'TAPSE' ? 'A4C' : 'PLAX'; this.deactivate(); return ctx.setView(base); }
      ensure();
      mode = m; theta = data.theta0[m] || 0;
      apply(m); mm.prefill(phase(), rate());
      pausedDrawn = false; last = 0;
      $('mmodeWrap').hidden = false; $('mmodeValues').innerHTML = ''; $('mmodeHint').textContent = HINT;
      const v = ctx.setView('MM_' + m);
      updateButtons();
      return v;
    },
    deactivate() {
      if (!mode) return;
      mode = null; cursor3d = null;
      $('mmodeWrap').hidden = true;
      updateButtons();
    },
    /* The dashed cursor in the 3D scene, added to the fan group each time atlas.js rebuilds it for an M-mode view. */
    attachCursor(fan, fr, id) {
      cursor3d = null;
      if (!id.startsWith('MM_') || !mode) return;
      const O = new THREE.Vector3(...fr.O), qd = new THREE.Vector3(...rotateBeam(fr, theta).d);
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([O.clone(), O.clone().addScaledVector(qd, fr.depth)]),
        new THREE.LineDashedMaterial({ color: 0xffc94a, dashSize: 0.08, gapSize: 0.05, depthTest: false, transparent: true }));
      line.computeLineDistances(); line.renderOrder = 12;
      fan.add(line); cursor3d = line;
    },
    /* Called after each sector redraw with the renderer's placement of the sector in the canvas. */
    tick(time, placed) {
      if (!mode || !mm || !placed) return;
      const g = ctx.canvas().getContext('2d'), [ox, oy] = placed.offset, k = placed.scale, fr = ctx.frames()[ctx.view()], cx = ox + ctx.size()[0] / 2 * k;
      rr = placed;
      const len = fr.depth * placed.S * k, ay = oy + 8 * k, sx = Math.sin(theta), cy = Math.cos(theta);
      g.save();
      g.setLineDash([6, 5]); g.strokeStyle = 'rgba(255,214,90,.92)'; g.lineWidth = Math.max(1.5, k * 0.7);
      g.beginPath(); g.moveTo(cx, ay); g.lineTo(cx + sx * len, ay + cy * len); g.stroke();
      g.setLineDash([]); g.fillStyle = 'rgba(255,214,90,.95)'; g.strokeStyle = 'rgba(0,0,0,.6)';
      g.beginPath(); g.arc(cx + sx * len * 0.9, ay + cy * len * 0.9, Math.max(6, k * 3.2), 0, Math.PI * 2); g.fill(); g.stroke();
      g.restore();
      if (measure && !ctx.heartbeat.isPlaying()) {
        const px = (cm) => cm / 4 * placed.S * k;
        g.save(); g.lineCap = 'butt';
        for (const [n, , , a, z] of measure.rows) {
          if (/s$/.test(n)) continue;
          const pa = px(Math.min(a, z)), pz = px(Math.max(a, z));
          for (const [w, col] of [[Math.max(6, k * 3.2), 'rgba(0,0,0,.65)'], [Math.max(4, k * 2.2), MM_COLORS[n] || '#ffd65a']]) {
            g.lineWidth = w; g.strokeStyle = col;
            g.beginPath(); g.moveTo(cx + sx * pa, ay + cy * pa); g.lineTo(cx + sx * pz, ay + cy * pz); g.stroke();
          }
        }
        g.restore();
      }
      const dt = last ? Math.min(0.1, (time - last) / 1000) : 0;
      last = time;
      if (ctx.heartbeat.isPlaying() && ctx.beat()) {
        measure = null; mm.push(phase(), dt);
        if (pausedDrawn) { pausedDrawn = false; $('mmodeValues').innerHTML = ''; $('mmodeHint').textContent = HINT; }
      } else if (!pausedDrawn) {
        const r = mm.measure();
        mm.setOverlay(r); measure = r; pausedDrawn = true;
        $('mmodeHint').textContent = r ? tr('已暫停：彩色量尺為自動量測（教學示意）。') : tr('影像累積不足一個心跳，請繼續播放幾秒後再暫停。');
        $('mmodeCanvas').setAttribute('aria-label', r
          ? r.rows.map(([n, v]) => n + ' ' + v.toFixed(2) + ' cm').concat((r.extra || []).map(([n, v, u]) => n + ' ' + (u === '%' ? v.toFixed(0) + '%' : v.toFixed(2)))).join(', ')
          : tr('M-mode 示意影像'));
        $('mmodeValues').innerHTML = '';
      }
      mm.paint();
    },
  };
}
