/* The step-by-step clinical scenarios of the heart atlas: PCI of the right coronary artery and
 * IVUS / OCT of the left anterior descending. Each factory returns a "feature" the atlas
 * (atlas.js, prepare()) shows while its preset is on:
 *
 *   { group, intro(), enter(), exit(), update(beat, dt) }
 *
 * The simulations themselves (pci-sim.js, ivus-sim.js, ivus-image.js) are ported from BetterHeart
 * by work/port-betterheart.mjs; the player (proc-hud.js), the camera follow and the panel wiring here
 * are ours. Chinese literals are the site's own strings and go through tr() (outputs/heart/i18n.js),
 * so a change to the site's wording shows up as a missing translation in work/build-heart-i18n.mjs.
 *
 * Nothing here runs at module scope. */
import * as THREE from 'three';
import { tr } from './i18n.js?v=1';
import { createProcHud } from './proc-hud.js?v=1';

/* The camera the procedure asks for, expressed in the atlas frame, eased onto the host's camera.
   `auto` is cleared when the reader takes the orbit controls and set again by a step, replay or seek. */
function createFollow(ctx) {
  let auto = true, offHost = null;
  const offset = new THREE.Vector3(), target = new THREE.Vector3(), dir = new THREE.Vector3();
  const onStart = () => { auto = false; };
  return {
    arm() {
      auto = true;
      const host = ctx.host();
      if (host && host.controls && !offHost) { host.controls.addEventListener('start', onStart); offHost = host.controls; }
    },
    resume() { auto = true; },
    disarm() { if (offHost) { offHost.removeEventListener('start', onStart); offHost = null; } },
    step(cam, k) {
      const host = ctx.host();
      if (!auto || !host || !cam) return;
      const { camera, controls } = host;
      const m = ctx.group.matrixWorld;
      target.copy(cam.target).applyMatrix4(m);
      dir.copy(cam.dir).transformDirection(m);
      const want = cam.dist * m.getMaxScaleOnAxis() * (innerWidth < 500 ? 1.18 : 1);
      offset.copy(camera.position).sub(controls.target);
      const dist = offset.length();
      offset.normalize().lerp(dir, k).normalize();
      controls.target.lerp(target, k);
      controls.minDistance = Math.min(controls.minDistance, want * 0.4);
      camera.position.copy(controls.target).addScaledVector(offset, dist + (want - dist) * k);
    },
  };
}

const ease = (dt) => 1 - Math.exp(-dt * 2.6);

/* ---- PCI: acute right coronary occlusion ---- */
export async function createPciFeature(ctx) {
  const { createPci, PCI_STEPS, PCI_DURATION } = await import('./pci-sim.js?v=17');
  const g = new THREE.Group();
  g.name = 'atlas-pci'; g.visible = false; ctx.group.add(g);
  const sim = createPci({ parent: g, deformPoint: ctx.heartbeat.deformPoint, flow: ctx.motion.coronaryFlow, byKey: ctx.byKey });
  const hud = createProcHud(), follow = createFollow(ctx);
  return {
    group: g,
    intro: () => ({
      category: tr('冠狀動脈介入 · PCI 教學示意'),
      title: tr('右冠狀動脈急性阻塞，如何打通血管'),
      text: tr('右冠狀動脈供應右心室與左心室下壁；中段被血栓塞住時，會造成下壁心肌梗塞。心導管經手腕或鼠蹊部動脈進入，依序放入導引導管、導絲、吸栓導管、氣球與支架，恢復血流。動畫約 27 秒，可點下方步驟跳轉或重播。'),
    }),
    enter() {
      hud.start({ steps: PCI_STEPS, duration: PCI_DURATION, onSeek: () => follow.resume() });
      follow.arm(); sim.update(0); follow.step(sim.cam, 1);
    },
    exit() { sim.stop(); follow.disarm(); },
    update(beat, dt) { const t = hud.tick(dt); sim.update(t); follow.step(sim.cam, ease(dt)); },
  };
}

/* ---- IVUS / OCT: pull-back through a diseased LAD ---- */
export async function createIvusFeature(ctx) {
  const [{ createIvus, IVUS_DURATION, ivusSteps, PB0 }, { createIvusView, zoneAt }, { IVUS_HINT, IVUS_TXT, IVUS_FIND }] = await Promise.all([
    import('./ivus-sim.js?v=7'), import('./ivus-image.js?v=6'), import('./heart-text.js?v=1'),
  ]);
  const $ = (id) => document.getElementById('ha-' + id);
  const g = new THREE.Group();
  g.name = 'atlas-ivus'; g.visible = false; ctx.group.add(g);
  const sim = createIvus({ parent: g, deformPoint: ctx.heartbeat.deformPoint, flow: ctx.motion.coronaryFlow, byKey: ctx.byKey });
  const hud = createProcHud(), follow = createFollow(ctx);
  let mode = 'ivus', seen = 2, last = 0, contours = true, view = null, wired = false;

  const modeName = () => (mode === 'oct' ? tr('光學同調斷層 · 橫切面') : tr('血管內超音波 · 橫切面'));
  const intro = () => ({ category: tr('冠狀動脈介入 · 血管內影像教學示意'), title: IVUS_TXT[mode].title, text: IVUS_TXT[mode].text });

  function setMode(next) {
    mode = next;
    for (const b of document.querySelectorAll('[data-ha-ivus]')) { const on = b.dataset.haIvus === mode; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); }
    $('ivusModeName').textContent = modeName();
    hud.setSteps(ivusSteps(mode));
    if (view) view.invalidate();
    if (ctx.onIntro) ctx.onIntro(intro());
  }

  function scrubTo(x) { hud.seek(sim.xToTime(Math.min(1, Math.max(0, x)))); follow.resume(); }

  function wire() {
    if (wired) return;
    wired = true;
    for (const b of document.querySelectorAll('[data-ha-ivus]')) b.onclick = () => setMode(b.dataset.haIvus);
    $('ivusMeasure').onclick = () => {
      contours = !contours;
      $('ivusMeasure').setAttribute('aria-pressed', String(contours)); $('ivusMeasure').classList.toggle('active', contours);
      if (view) view.invalidate();
    };
    let drag = null;
    const end = () => { drag = null; };
    for (const [el, lm] of [[$('ivusCanvas'), false], [$('ivusLmode'), true]]) {
      el.onpointerdown = (e) => {
        if (e.button > 0) return;
        drag = { el, lm, x0: e.clientX, v0: sim.state.x };
        try { el.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
        if (lm) { const r = el.getBoundingClientRect(); scrubTo((e.clientX - r.left) / r.width); }
      };
      el.onpointermove = (e) => {
        if (!drag || drag.el !== el) return;
        const r = el.getBoundingClientRect();
        if (drag.lm) scrubTo((e.clientX - r.left) / r.width);
        else { const dx = (e.clientX - drag.x0) / r.width; if (Math.abs(dx) > 0.008) scrubTo(drag.v0 + dx * 0.6); }
      };
      el.onpointerup = end; el.onpointercancel = end;
    }
  }

  return {
    group: g, intro,
    enter() {
      wire();
      mode = 'ivus'; seen = 2;
      hud.start({ steps: ivusSteps(mode), duration: IVUS_DURATION, hint: IVUS_HINT, onSeek: () => follow.resume() });
      setMode('ivus');
      follow.arm(); sim.update(0, mode); follow.step(sim.cam, 1);
      if (view) view.invalidate();
    },
    exit() { sim.stop(); follow.disarm(); },
    update(beat, dt) {
      const t = hud.tick(dt), st = sim.update(t, mode);
      follow.step(sim.cam, ease(dt));
      if (!view) view = createIvusView({ canvas: $('ivusCanvas'), lmode: $('ivusLmode') });
      if (t < PB0 - 0.01) seen = 2; else if (st.acquired >= 0) seen = Math.min(seen, st.acquired);
      const now = performance.now();
      if (hud.playing && now - last < 55) return;
      last = now;
      view.draw({ x: st.x, mode, paused: !hud.playing && st.inVessel, acquired: seen > 1 ? -1 : seen, inVessel: st.inVessel, contours });
      const key = mode + (st.inVessel ? zoneAt(st.x) : '-'), find = $('ivusFind');
      if (find.dataset.k !== key) {
        find.dataset.k = key;
        find.textContent = st.inVessel ? IVUS_FIND[mode][zoneAt(st.x)] : tr('影像導管還在導引導管內，尚未進入左前降支。');
      }
    },
  };
}
