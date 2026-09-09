/* Pure rest-space shape derivation. This characterises the existing bbox model;
 * it does not infer anatomical attachments or change the deformation shader. */

function vector(value, name) {
  if (!value || value.length !== 3 || !Array.from(value).every(Number.isFinite)) {
    throw new RangeError(`${name} must contain three finite coordinates`);
  }
  return Array.from(value);
}

/**
 * Inputs and returned coordinates share one undeformed local coordinate frame.
 * `bounds` preserves the loader's existing bounds exactly; `positions` is an
 * alternative flat xyz array for offline/Node callers. Explicit bounds win.
 * context.anatomicalUp must already be a unit local-space direction; the
 * Three.js adapter owns transforms/normalisation to preserve its arithmetic.
 * Optional future path/tether fields are absent, not fabricated zero arrays.
 */
export function deriveShape({ positions, bounds, rule = {}, context = {} }) {
  let min, max;
  if (bounds) {
    min = vector(bounds.min, 'bounds.min');
    max = vector(bounds.max, 'bounds.max');
  } else {
    if (!positions?.length || positions.length % 3) throw new RangeError('positions must contain xyz triples');
    min = [Infinity, Infinity, Infinity]; max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < positions.length; i++) {
      const value = positions[i], axis = i % 3;
      if (!Number.isFinite(value)) throw new RangeError('positions must be finite');
      min[axis] = Math.min(min[axis], value); max[axis] = Math.max(max[axis], value);
    }
  }
  if (min.some((v, i) => v > max[i])) throw new RangeError('bounds must be ordered');
  const size = [max[0]-min[0], max[1]-min[1], max[2]-min[2]];
  const longest = size.indexOf(Math.max(...size));
  let length = Math.max(size[longest], 1e-6);
  const centre = context.sharedCentre
    ? vector(context.sharedCentre, 'sharedCentre')
    : [(min[0]+max[0])/2, (min[1]+max[1])/2, (min[2]+max[2])/2];
  let axis, amount;
  if (rule.mode === 'descend') {
    axis = vector(context.anatomicalUp || [0,1,0], 'anatomicalUp');
    length = Math.abs(axis[0])*size[0] + Math.abs(axis[1])*size[1] + Math.abs(axis[2])*size[2];
    amount = length*.08;
  } else if (rule.mode === 'inflate') {
    axis = [0,1,0]; amount = rule.inflate || .05;
  } else {
    axis = [longest===0?1:0, longest===1?1:0, longest===2?1:0];
    if (rule.mode === 'peristalsis') amount = rule.pinch || .18;
    else {
      const ratio = Math.max(...size)/(Math.min(...size)||1e-4);
      amount = typeof rule.contract === 'number' && rule.contract > 0
        ? rule.contract : Math.min(.11,.03+.014*Math.min(6,ratio));
    }
  }
  const mode = rule.mode==='pump'?5:rule.mode==='descend'?4:rule.mode==='inflate'?2:rule.mode==='peristalsis'?3:1;
  return {axis, centre, length, amount, mode, capabilities:[]};
}
