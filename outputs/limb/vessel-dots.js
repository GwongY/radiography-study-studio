/*
 * Vessel flow dots for the explorer's own Arterial and Venous layers.
 *
 * The same travelling dots the Limb vessels mode draws (limb-flow.js, from BetterHeart), on the same
 * centre-line routes (routes-*.json, in each limb page's frame -- see limb.js and alignment.js), but without the
 * mode: no panel, no scenarios, nothing hidden. They cover the arch and neck branches, both arms, the abdominal
 * aorta and both legs; vessels of the head and the viscera have no route, so they get no dots (Live physiology's
 * own curated routes still animate what it covers). Dots are drawn over the body (depthTest off), as the limb pages
 * do, because a solid vessel wall would otherwise hide them: ghost the vessel chips to see them as a stream.
 *
 * Nothing here runs at module scope.
 */
import * as THREE from 'three';
import { LIMB_FRAMES } from './alignment.js?v=1';
import { createFlow } from './limb-flow.js?v=1';

const ROUTES_VERSION = 1;

export async function createVesselDots({ base = new URL('./', import.meta.url).href } = {}) {
  const routes = {};
  await Promise.all(['upper', 'lower'].map(async (page) => {
    const r = await fetch(`${base}routes-${page}.json?v=${ROUTES_VERSION}`);
    if (!r.ok) throw new Error(`vessel routes ${page}: ${r.status}`);
    routes[page] = (await r.json()).routes;
  }));

  const group = new THREE.Group();
  group.name = 'vesselDots';
  const dots = [];
  for (const page of ['upper', 'lower']) {
    const { scale, origin } = LIMB_FRAMES[page];
    const g = new THREE.Group();
    g.name = 'dots-' + page; g.scale.setScalar(1 / scale); g.position.set(...origin);
    group.add(g);
    dots.push({ kind: 'arterial', flow: createFlow(routes[page].filter((r) => r.group !== 'vein'), { color: 0xe5372c, parent: g }) });
    dots.push({ kind: 'venous', flow: createFlow(routes[page].filter((r) => r.group === 'vein'), { color: 0x2f66d6, vein: true, parent: g }) });
  }
  let last = null;

  return {
    group,
    attach(parent) { parent.add(group); last = null; },
    detach() { group.removeFromParent(); },
    /* `seconds` is the studio's state.motionPhase. `run` false freezes the dots (Static model). */
    update(seconds, { arterial, venous, visible = true, run = true }) {
      const dt = last === null || !run ? 0 : Math.min(0.05, Math.max(0, seconds - last));
      if (run || last === null) last = seconds;
      for (const d of dots) {
        d.flow.mesh.visible = visible && (d.kind === 'arterial' ? arterial : venous);
        if (d.flow.mesh.visible) d.flow.update(dt, {});
      }
    },
    dispose() {
      group.removeFromParent();
      group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    },
  };
}
