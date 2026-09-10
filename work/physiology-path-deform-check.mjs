/*
 * Path deformation check — the constriction itself, and the normals that have
 * to travel with it.
 *
 * The shape half is checked against an ANALYTIC arc, so the Jacobian formula is
 * compared with a numerical derivative of the same continuous map rather than
 * with a discretised centreline; the discretisation is checked separately
 * against the real route in physiology-path-check.mjs.
 *
 * Usage: node work/physiology-path-deform-check.mjs
 */
import assert from 'node:assert/strict';
import { S_BEND, STRAIGHT, U_BEND, tubeMesh } from './lib/synthetic-tubes.mjs';
import {
  PATH_SHAPE_GLSL, derivePathRoute, pathDeformation, peristalticWave,
} from '../outputs/physiology-path.js';

let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a) => Math.hypot(a[0], a[1], a[2]);
const unit = (a) => { const n = norm(a); return a.map((v) => v / n); };

/*
 * An exact circular arc in the xy plane, radius R, swept over [0, PI].
 * s is normalised arc length, so c'(s) = L T and dT/ds is exact.
 */
const R = .35, ARC = Math.PI * R;
const arcFrame = (s) => {
  const a = Math.PI * s;
  return {
    centre: [R * Math.cos(a) - R, R * Math.sin(a), 0],
    tangent: [-Math.sin(a), Math.cos(a), 0],
    bend: [-Math.PI * Math.cos(a), -Math.PI * Math.sin(a), 0],   /* dT/ds */
  };
};
/* For a circular arc the perpendicular foot is exact: it is the angle of x
   about the centre of curvature, which is the origin shifted by -R in x. */
const arcParam = (x) => Math.atan2(x[1], x[0] + R) / Math.PI;

const WAVE = { amplitude: .18, waves: 2.5, travel: .4, dir: 1, sharp: 4, taperWidth: .12 };

/* --- the wave itself ----------------------------------------------------- */
{
  const at = (s, t) => peristalticWave(s, t, WAVE);
  ok(at(0, 0).value === 0 && at(1, 0).value === 0, 'the wave tapers to nothing at both ends of the route');
  ok(at(0, 0).derivative === 0 && at(1, 0).derivative === 0, 'and its gradient tapers with it, so no step at a segment boundary');
  let worst = 0;
  for (let i = 0; i <= 400; i++) {
    const s = i / 400, h = 1e-5;
    const numeric = (at(Math.min(1, s + h), .7).value - at(Math.max(0, s - h), .7).value) / (Math.min(1, s + h) - Math.max(0, s - h));
    worst = Math.max(worst, Math.abs(numeric - at(s, .7).derivative));
  }
  ok(worst < 2e-3, `the stated ds derivative matches a numerical one (worst ${worst.toExponential(2)})`);
  let peak = 0;
  for (let i = 0; i <= 400; i++) peak = Math.max(peak, at(i / 400, .7).value);
  ok(peak <= WAVE.amplitude + 1e-9, 'the constriction never exceeds its stated amplitude');
  ok(at(.5, 0).value !== at(.5, .5).value, 'the wave actually travels with time');
}

/* --- zero amplitude is the identity, exactly ----------------------------- */
{
  const frame = arcFrame(.4);
  const position = [.02, .1, .03], normal = unit([.3, -.5, .81]);
  const result = pathDeformation({
    position, normal, param: .4, length: ARC, ...frame,
    wave: peristalticWave(.4, 0, { ...WAVE, amplitude: 0 }),
  });
  ok(result.position.every((v, i) => v === position[i]), 'zero amplitude returns the incoming position unchanged');
  ok(result.normal.every((v, i) => v === normal[i]), 'zero amplitude returns the incoming normal unchanged');
  ok(result.determinant === 1, 'and a determinant of exactly one');
}

/* --- the Jacobian is the derivative of the map it ships with ------------- */
{
  const map = (x, time) => {
    const s = arcParam(x), frame = arcFrame(s);
    const wave = peristalticWave(s, time, WAVE);
    return pathDeformation({ position: x, normal: [1, 0, 0], param: s, length: ARC, ...frame, wave });
  };
  let worst = 0, samples = 0;
  for (let i = 1; i < 12; i++) for (let j = 0; j < 8; j++) {
    const s = i / 12, a = Math.PI * s, f = arcFrame(s);
    const theta = 2 * Math.PI * j / 8, radius = .03;
    /* A point on the tube surface: radial in the plane of the arc, plus z. */
    const point = [
      f.centre[0] + radius * Math.cos(theta) * Math.cos(a),
      f.centre[1] + radius * Math.cos(theta) * Math.sin(a),
      f.centre[2] + radius * Math.sin(theta),
    ];
    const analytic = map(point, .3).jacobian;
    for (let c = 0; c < 3; c++) {
      const h = 1e-6, up = point.slice(), down = point.slice();
      up[c] += h; down[c] -= h;
      const numeric = sub(map(up, .3).position, map(down, .3).position).map((v) => v / (2 * h));
      for (let r = 0; r < 3; r++) worst = Math.max(worst, Math.abs(numeric[r] - analytic[c * 3 + r]));
      samples++;
    }
  }
  ok(worst < 2e-4, `the analytic Jacobian matches a central difference of the map (worst ${worst.toExponential(2)}, ${samples} columns)`);
}

/* --- the normal is perpendicular to the DEFORMED surface ---------------- */
{
  let worst = 0, worstDeterminant = Infinity;
  for (let i = 1; i < 12; i++) for (let j = 0; j < 8; j++) {
    const s = i / 12, a = Math.PI * s, f = arcFrame(s), theta = 2 * Math.PI * j / 8, radius = .03;
    const surface = (sv, tv) => {
      const av = Math.PI * sv, fv = arcFrame(sv);
      return [
        fv.centre[0] + radius * Math.cos(tv) * Math.cos(av),
        fv.centre[1] + radius * Math.cos(tv) * Math.sin(av),
        fv.centre[2] + radius * Math.sin(tv),
      ];
    };
    const point = surface(s, theta);
    const offset = sub(point, f.centre);
    const restNormal = unit(offset.map((v, k) => v - dot(offset, f.tangent) * f.tangent[k]));
    const wave = peristalticWave(s, .3, WAVE);
    const out = pathDeformation({ position: point, normal: restNormal, param: s, length: ARC, ...f, wave });
    ok(out.determinant > 0, 'the map never folds the surface through itself');
    worstDeterminant = Math.min(worstDeterminant, out.determinant);
    /* Push the two rest-space surface tangents through the same Jacobian. */
    const h = 1e-5;
    for (const rest of [sub(surface(s + h, theta), surface(s - h, theta)), sub(surface(s, theta + h), surface(s, theta - h))]) {
      const pushed = [0, 1, 2].map((r) => [0, 1, 2].reduce((acc, c) => acc + out.jacobian[c * 3 + r] * rest[c], 0));
      worst = Math.max(worst, Math.abs(dot(unit(pushed), out.normal)));
    }
  }
  ok(worst < 1e-3, `the deformed normal stays perpendicular to the deformed surface (worst |cos| ${worst.toExponential(2)})`);
  ok(worstDeterminant > .3, `and the map stays well conditioned (smallest determinant ${worstDeterminant.toFixed(3)})`);
}

/* --- on a real derived route: the squeeze is around the LOCAL axis ------- */
for (const [name, curve] of [['straight', STRAIGHT(1)], ['U', U_BEND], ['S', S_BEND]]) {
  const mesh = tubeMesh(curve, .035, 60, 14, { seam: true });
  const nearest = (t) => { let best = Infinity, index = 0; for (let i = 0; i < mesh.positions.length; i += 3) { const d = Math.hypot(mesh.positions[i] - t[0], mesh.positions[i + 1] - t[1], mesh.positions[i + 2] - t[2]); if (d < best) { best = d; index = i / 3; } } return index; };
  const route = derivePathRoute({ positions: mesh.positions, indices: mesh.indices, proximal: nearest(curve(0)), distal: nearest(curve(1)) });
  ok(route.accepted, `${name}: route accepted`);
  let worstAxial = 0, moved = 0;
  for (let i = 0; i < mesh.positions.length / 3; i++) {
    const position = [mesh.positions[i * 3], mesh.positions[i * 3 + 1], mesh.positions[i * 3 + 2]];
    const frame = {
      centre: [route.centre[i * 3], route.centre[i * 3 + 1], route.centre[i * 3 + 2]],
      tangent: [route.tangent[i * 3], route.tangent[i * 3 + 1], route.tangent[i * 3 + 2]],
      bend: [route.bend[i * 3], route.bend[i * 3 + 1], route.bend[i * 3 + 2]],
    };
    const wave = peristalticWave(route.param[i], .37, WAVE);
    const out = pathDeformation({ position, normal: [0, 1, 0], param: route.param[i], length: route.length, ...frame, wave });
    const shift = sub(out.position, position);
    if (norm(shift) > 1e-9) { moved++; worstAxial = Math.max(worstAxial, Math.abs(dot(shift, frame.tangent)) / norm(shift)); }
    ok(out.determinant > 0, `${name}: determinant stays positive`);
    checks -= 1;   /* counted once below rather than per vertex */
  }
  checks += 1;
  ok(moved > mesh.positions.length / 30, `${name}: the wave actually moves a fair share of the surface (${moved})`);
  ok(worstAxial < 1e-6, `${name}: every displacement is purely radial to the LOCAL tube axis (worst axial fraction ${worstAxial.toExponential(2)})`);
}

/*
 * --- the crest is ONE band, and it travels -------------------------------
 *
 * This is the numeric form of what a browser is asked to show: a wave that
 * traverses a bend without jumping across the loop next to it. Every vertex
 * being squeezed at one instant has to fall inside a contiguous stretch of the
 * route parameter, and that stretch has to advance the way the rule says.
 */
{
  const mesh = tubeMesh(U_BEND, .035, 60, 14, { seam: true });
  const nearest = (t) => { let best = Infinity, index = 0; for (let i = 0; i < mesh.positions.length; i += 3) { const d = Math.hypot(mesh.positions[i] - t[0], mesh.positions[i + 1] - t[1], mesh.positions[i + 2] - t[2]); if (d < best) { best = d; index = i / 3; } } return index; };
  const route = derivePathRoute({ positions: mesh.positions, indices: mesh.indices, proximal: nearest(U_BEND(0)), distal: nearest(U_BEND(1)) });
  const wave = { ...WAVE, waves: 1, travel: .25, taperWidth: .1 };
  const bins = 60, centres = [];
  for (const time of [0, .4, .8, 1.2, 1.6, 2]) {
    const hit = new Array(bins).fill(false);
    for (let i = 0; i < route.param.length; i++) {
      if (peristalticWave(route.param[i], time, wave).value > wave.amplitude * .3) {
        hit[Math.min(bins - 1, Math.floor(route.param[i] * bins))] = true;
      }
    }
    let runs = 0, total = 0, sum = 0;
    for (let i = 0; i < bins; i++) {
      if (hit[i]) { total++; sum += i + .5; if (!hit[i - 1]) runs++; }
    }
    ok(runs === 1, `t=${time}: the crest is one band along the route, not ${runs}`);
    ok(total > 2 && total < bins * .6, `t=${time}: and it is a band, not the whole tube (${total}/${bins} bins)`);
    centres.push(sum / total);
  }
  let advancing = true;
  for (let i = 1; i < centres.length; i++) if (!(centres[i] > centres[i - 1])) advancing = false;
  ok(advancing, `the band advances along the route: ${centres.map((v) => (v / bins).toFixed(2)).join(' -> ')}`);
}

/* --- the shader shares the coefficients, it does not restate them -------- */
{
  for (const token of ['rssPathWave', 'rssPathDeform', 'uPathLength']) {
    ok(PATH_SHAPE_GLSL.includes(token), `the shared GLSL declares ${token}`);
  }
  ok(!/\bfor\s*\(/.test(PATH_SHAPE_GLSL), 'no loops in the per-vertex path shader');
}

console.log(`PASS: ${checks} deformation assertions (wave taper and derivative, exact zero-amplitude identity, Jacobian against central differences, normals against deformed tangents, purely local radial squeeze on straight/U/S routes)`);
