/*
 * Limb vessels -- BetterHeart's arm and leg vessel pages, as a mode of the explorer.
 *
 * What it adds to the explorer's own circulatory layer (it draws no second copy of the body):
 *   - travelling dots along every vessel centre-line, arterial (surging in systole) and venous (steady), for the
 *     arm and the leg                                            limb-flow.js, routes-*.json   (ported / data)
 *   - three peripheral-intervention simulations on the leg: clot retrieval, clot lysis, calcium treatment
 *                                                                leg-proc.js                   (ported)
 *   - the whole course of a tapped vessel lit on both sides, and camera regions along each limb
 *
 * The routes are in BetterHeart's limb frame, limb = scale * (body - origin) (alignment.js, checked against
 * dolasim.glb by work/limb-check.mjs). Each limb is a Group with scale 1/scale and position origin, so it sits
 * on the circulatory layer's `root` exactly as the heart atlas does.
 *
 * Nothing here runs at module scope.
 */
import * as THREE from 'three';
import { LIMB_FRAMES } from './alignment.js?v=1';
import { createFlow } from './limb-flow.js?v=1';
import { createLegProc, SCENARIOS } from './leg-proc.js?v=11';
import { PX, DEVN, LEG_FOCUS, ARM_FOCUS } from './limb-text.js?v=1';
import { createFollow, ease } from '../heart/camera-follow.js?v=1';
import { createProcHud } from '../heart/proc-hud.js?v=2';

const ROUTES_VERSION = 1;

/* greatSee-style look data, as the heart atlas does: `opacity` is per circulatory chip; the procedure scenarios
   ghost the vessels so the devices show through (the site does the same, at 0.32). */
export const PRESETS = {
  natural: { label: 'Natural', opacity: {}, flow: false },
  flow: { label: 'Blood flow', opacity: { arterial: 0.62, venous: 0.55 }, flow: true },
  thromb: { label: 'Clot retrieval', opacity: { arterial: 0.32, venous: 0.32 }, flow: true, proc: 'thromb' },
  lysis: { label: 'Clot lysis (DVT)', opacity: { arterial: 0.32, venous: 0.32 }, flow: true, proc: 'lysis' },
  calc: { label: 'Calcium treatment', opacity: { arterial: 0.32, venous: 0.32 }, flow: true, proc: 'calc' },
};

const DEFAULT_DEVICE = { thromb: 'rotarex', lysis: 'ekos', calc: 'jetstream' };

/* Mesh names reach the viewer with the side letter glued on ("Femoral_arteryr"). Strip it only where the other
   side's twin exists, so "Aortic arch" and "Vomer"-like names that genuinely end in r or l are left alone.
   Returns Map(mesh -> { key, title }): every mesh of one structure, both sides, shares a key. */
export function vesselGroups(meshes) {
  const clean = (m) => String(m.userData.label || m.name || '').replace(/_/g, ' ').trim();
  const all = new Set(meshes.map((m) => clean(m).toLowerCase()));
  const out = new Map();
  for (const m of meshes) {
    const c = clean(m), hit = c.match(/^(.*\S)(l|r)$/i);
    let title = c;
    if (hit && all.has((hit[1] + (hit[2].toLowerCase() === 'l' ? 'r' : 'l')).toLowerCase())) title = hit[1].trim();
    out.set(m, { key: title.toLowerCase(), title: title ? title[0].toUpperCase() + title.slice(1) : c });
  }
  return out;
}

export async function createLimbAtlas({ base = new URL('./', import.meta.url).href } = {}) {
  const [up, low] = await Promise.all(['upper', 'lower'].map((page) =>
    fetch(`${base}routes-${page}.json?v=${ROUTES_VERSION}`).then((r) => { if (!r.ok) throw new Error(`limb routes ${page}: ${r.status}`); return r.json(); })));

  const group = new THREE.Group();
  group.name = 'limbAtlas';
  const frames = {};
  for (const page of ['upper', 'lower']) {
    const { scale, origin } = LIMB_FRAMES[page];
    const g = new THREE.Group();
    g.name = 'limb-' + page; g.scale.setScalar(1 / scale); g.position.set(...origin);
    group.add(g); frames[page] = g;
  }
  const routes = { upper: up.routes, lower: low.routes };

  /* ---- flow dots ---- */
  const dots = {};
  for (const page of ['upper', 'lower']) {
    dots[page] = {
      art: createFlow(routes[page].filter((r) => r.group !== 'vein'), { color: 0xe5372c, parent: frames[page] }),
      vein: createFlow(routes[page].filter((r) => r.group === 'vein'), { color: 0x2f66d6, vein: true, parent: frames[page] }),
    };
  }

  /* ---- the leg procedures ---- */
  const procGroup = new THREE.Group();
  procGroup.name = 'limb-proc'; frames.lower.add(procGroup);
  /* leg-proc builds its own vessel lumen from the route radii; its mesh-snapping pass is switched off upstream,
     so the explorer's meshes are not passed in. */
  const proc = createLegProc({ parent: procGroup, routes: routes.lower, vessels: [] });
  const hud = createProcHud({ prefix: 'la-' });
  const device = { ...DEFAULT_DEVICE };
  let host = null, onIntro = null;
  const follow = createFollow({ group: frames.lower, host: () => host });

  const S = { preset: 'natural', flow: { art: true, vein: true }, active: false, last: null, selected: null };
  const dev = (p) => device[p];

  function steps(p) {
    const out = [];
    for (const [t, v] of Object.entries(PX[p].steps)) {
      const x = Array.isArray(v) ? v : v[device[p]];
      if (x) out.push({ t: +t, name: x[0], text: x[1] });
    }
    return out.sort((a, b) => a.t - b.t);
  }

  function intro() {
    const p = PRESETS[S.preset];
    if (p.proc) return { category: PX[p.proc].cat, title: PX[p.proc].title, text: PX[p.proc].text };
    if (S.preset === 'flow') return {
      category: 'Blood flow',
      title: 'Arteries carry blood down, veins bring it back',
      text: 'Red dots run from the aorta along the arteries to the fingertips and toes, surging in systole and slowing in diastole. Blue dots return along the deep and superficial veins to the vena cava, slower and steadier. Speed and rhythm are teaching illustrations, not measurements.',
    };
    return { category: 'Limb vessels', title: 'Tap a vessel', text: 'Tap an artery or vein, in the model or from its name, and its whole course lights up on both sides, from origin to end; tap it again to clear. Choose a scenario above for blood flow or a leg procedure.' };
  }

  /* ---- highlight: the structure's meshes, drawn again in green on top ---- */
  const hlMat = new THREE.MeshStandardMaterial({ color: 0x14b886, emissive: 0x0c8a63, emissiveIntensity: 0.35, roughness: 0.55, transparent: true, opacity: 0.97, depthTest: false, depthWrite: false, side: THREE.DoubleSide });
  let overlays = [];
  function highlight(meshes) {
    for (const o of overlays) o.removeFromParent();
    overlays = [];
    for (const m of meshes || []) {
      const o = new THREE.Mesh(m.geometry, hlMat);
      o.renderOrder = 15; o.userData.limbHighlight = true; o.raycast = () => {};
      m.add(o); overlays.push(o);
    }
  }

  function apply() {
    const p = PRESETS[S.preset];
    const leg = !!p.proc;
    for (const page of ['upper', 'lower']) {
      const upperOk = page === 'upper' ? !leg : true;
      dots[page].art.mesh.visible = S.active && p.flow && S.flow.art && upperOk;
      dots[page].vein.mesh.visible = S.active && p.flow && S.flow.vein && upperOk;
    }
    procGroup.visible = S.active && leg;
  }

  function setPreset(name) {
    const was = PRESETS[S.preset];
    if (!PRESETS[name]) return false;
    if (was.proc) { proc.stop(); follow.disarm(); }
    S.preset = name;
    const p = PRESETS[name];
    if (p.proc) startProc();
    apply();
    return true;
  }

  function startProc() {
    const p = PRESETS[S.preset].proc;
    hud.start({ steps: steps(p), duration: SCENARIOS[p].dur, onSeek: () => follow.resume() });
    follow.arm();
  }

  function setDevice(d) {
    const p = PRESETS[S.preset].proc;
    if (!p || !SCENARIOS[p].devices.includes(d)) return;
    device[p] = d;
    startProc();
    if (onIntro) onIntro(intro());
  }

  function setFlow(kind, on) { S.flow[kind] = !!on; apply(); }

  /* a camera region as a box in the limb's own frame, and the page whose frame it is in */
  const zMid = (page, y0, y1) => { let s = 0, n = 0; for (const r of routes[page]) for (const q of r.pts) if (q[1] >= y0 && q[1] <= y1) { s += q[2]; n++; } return n ? s / n : 0; };
  const xRange = (page) => { let lo = 1e9, hi = -1e9; for (const r of routes[page]) for (const q of r.pts) { lo = Math.min(lo, q[0]); hi = Math.max(hi, q[0]); } return [lo, hi]; };
  function regionBox(page, key, side = 'R') {
    const F = page === 'upper' ? ARM_FOCUS[key] : LEG_FOCUS[key];
    if (!F) return null;
    const [y0, y1] = Array.isArray(F.y) ? F.y : [F.y - F.h / 2, F.y + F.h / 2];
    let x = 0, w;
    if (page === 'upper') { x = F.arm ? (side === 'R' ? -1 : 1) * F.arm : F.x || 0; w = F.w; }
    else { const [lo, hi] = xRange('lower'); w = Math.min(hi - lo, (y1 - y0) * 1.2 + 0.6); x = (lo + hi) / 2; }
    const z = zMid(page, y0, y1);
    return { page, label: F.label, dir: F.dir || [0, 0.08, 1], min: [x - w / 2, y0, z - 0.4], max: [x + w / 2, y1, z + 0.4] };
  }
  const regions = (page) => Object.entries(page === 'upper' ? ARM_FOCUS : LEG_FOCUS).map(([key, f]) => ({ key, label: f.label }));

  function attach(parent) {
    parent.add(group);
    S.active = true; S.last = null;
    apply();
    if (PRESETS[S.preset].proc) startProc();
  }
  function detach() {
    if (PRESETS[S.preset].proc) { proc.stop(); follow.disarm(); }
    highlight(null);
    S.active = false;
    group.removeFromParent();
  }

  /* `seconds` is the studio's state.motionPhase, as for the heart atlas. */
  function update(seconds) {
    if (!S.active) return;
    const dt = S.last === null ? 0 : Math.min(0.05, Math.max(0, seconds - S.last));
    S.last = seconds;
    const p = PRESETS[S.preset];
    let gates = {};
    if (p.proc) {
      const t = hud.tick(dt);
      proc.update(p.proc, t, dev(p.proc));
      gates = proc.flowGate(p.proc, t, dev(p.proc)) || {};
      follow.step(proc.cam, ease(dt));
    }
    for (const page of ['upper', 'lower']) {
      if (dots[page].art.mesh.visible) dots[page].art.update(dt, gates);
      if (dots[page].vein.mesh.visible) dots[page].vein.update(dt, gates);
    }
  }

  function dispose() {
    detach();
    group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      ms.forEach((x) => x.dispose());
    });
    hlMat.dispose();
  }

  return {
    group, frames, state: S, PRESETS, SCENARIOS, DEVN,
    setPreset, setFlow, setDevice, intro, highlight, regionBox, regions, attach, detach, update, dispose,
    devices: () => { const p = PRESETS[S.preset].proc; return p ? SCENARIOS[p].devices.map((d) => ({ id: d, label: DEVN[d], on: d === device[p] })) : []; },
    setHost(h, introCallback) { host = h; onIntro = introCallback || null; },
  };
}
