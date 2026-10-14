/* Eases the host camera onto the camera a procedure asks for, expressed in the frame of a group (the atlas group, or
 * a limb's own frame). `auto` is cleared when the reader takes the orbit controls and set again by a step, replay or
 * seek. Shared by the heart scenarios (heart/scenarios.js) and the limb vessels (limb/limb.js).
 *
 * Nothing here runs at module scope. */
import * as THREE from 'three';

export function createFollow(ctx) {
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

export const ease = (dt) => 1 - Math.exp(-dt * 2.6);

