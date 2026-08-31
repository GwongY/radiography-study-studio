/*
 * Build every cavity from the real GLBs and assert the results are anatomy.
 *
 * Run twice over: once with all layers loaded, once with ONLY the skeleton,
 * because that second case is what a user actually sees on first open and it
 * is the one most likely to be quietly broken.
 *
 * Checks are relational, not absolute -- "the pericardial sac is inside the
 * mediastinum, which is inside the thorax" -- so they keep meaning if the
 * model is ever swapped for a different body.
 *
 * Run: node work/build-check.mjs
 */
import { loadGlbMeshes } from './glb-mesh.mjs';
import { createResolver } from '../outputs/landmarks.js';
import { buildCavityGeometry, measureLandmarks, BUILDABLE } from '../outputs/cavity-build.js';
import { boundsOf } from '../outputs/cavity-geom.js';

const LAYERS = {
  skeleton: 'assets/z-anatomy-skeleton.glb',
  muscle: 'assets/kas.glb',
  organs: 'assets/ic-organlar.glb',
  circulatory: 'assets/dolasim.glb',
  nervous: 'assets/sinir.glb',
  lymphatic: 'assets/lenf.glb',
  joint: 'assets/eklem.glb',
};

const all = [];
for (const [layer, file] of Object.entries(LAYERS)) {
  for (const m of loadGlbMeshes(file)) all.push({ name: m.name, layer, mesh: m });
}

let bad = 0;
const check = (label, ok, detail) => {
  if (!ok) bad++;
  console.log(`    ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? '  — ' + detail : ''}`);
};
const f3 = (v) => (Number.isFinite(v) ? v.toFixed(3) : ' n/a');

function makeCtx(entries) {
  const R = createResolver(entries);
  return {
    resolver: R,
    meshesFor: (k) => R.resolve(k).entries.map((e) => e.mesh),
    entriesFor: (keys) => R.resolveAll(keys).map((e) => ({ name: e.norm, mesh: e.mesh })),
    tier: (id) => R.tier(id),
    body: boundsOf(entries.filter((e) => e.layer === 'skeleton').map((e) => e.mesh.positions)),
  };
}

function partBounds(res) {
  const b = boundsOf(res.parts.map((p) => p.positions));
  return b;
}
const inside = (a, b, tol) => a.minX > b.minX - tol && a.maxX < b.maxX + tol
  && a.minY > b.minY - tol && a.maxY < b.maxY + tol
  && a.minZ > b.minZ - tol && a.maxZ < b.maxZ + tol;

function run(label, entries) {
  console.log(`\n================ ${label} ================`);
  const ctx = makeCtx(entries);
  const t0 = Date.now();
  const M = measureLandmarks(ctx);
  const built = {};
  for (const id of BUILDABLE) built[id] = buildCavityGeometry(id, ctx, M);
  const ms = Date.now() - t0;

  console.log(`  built in ${ms} ms   diaphragm: ${M.diaphragmReal ? 'real mesh' : 'synthesised from the costal margin'}`);
  for (const id of BUILDABLE) {
    const r = built[id];
    if (!r) { console.log(`  ${id.padEnd(18)} — not built`); continue; }
    const b = partBounds(r);
    const verts = r.parts.reduce((s, p) => s + p.positions.length / 3, 0);
    console.log(`  ${id.padEnd(18)} ${r.exact ? 'exact ' : 'approx'} parts=${r.parts.length} verts=${String(verts).padStart(5)}` +
      `  y ${f3(b.minY)}..${f3(b.maxY)}  x ${f3(b.minX)}..${f3(b.maxX)}  z ${f3(b.minZ)}..${f3(b.maxZ)}`);
    if (r.note) console.log(`  ${' '.repeat(18)}   note: ${r.note}`);
  }

  console.log('  --- relationships ---');
  const B = (id) => (built[id] ? partBounds(built[id]) : null);
  const H = ctx.body.maxY - ctx.body.minY;
  const tol = H * 0.02;

  const thx = B('cav-thoracic'), med = B('cav-mediastinum'), per = B('cav-pericardial');
  const abd = B('cav-abdominal'), pel = B('cav-pelvic'), cra = B('cav-cranial'), ver = B('cav-vertebral');

  if (thx && med) check('mediastinum is inside the thoracic cavity', inside(med, thx, tol));
  if (med && per) check('pericardial sac is inside the mediastinum', inside(per, med, tol * 1.6));
  if (thx && per) {
    const vt = (per.maxX - per.minX) * (per.maxY - per.minY) * (per.maxZ - per.minZ);
    const vth = (thx.maxX - thx.minX) * (thx.maxY - thx.minY) * (thx.maxZ - thx.minZ);
    check('pericardial sac is much smaller than the thorax', vt < vth * 0.25,
      `${(vt / vth * 100).toFixed(1)}% of its box volume`);
  }
  if (thx && abd) {
    check('abdominal cavity sits below the thoracic cavity', abd.minY < thx.minY && abd.maxY < thx.maxY,
      `abdomen ${f3(abd.minY)}..${f3(abd.maxY)}  thorax ${f3(thx.minY)}..${f3(thx.maxY)}`);
  }
  if (abd && pel) {
    check('pelvic cavity sits below the abdominal cavity', pel.minY < abd.minY);
    check('abdomen and pelvis meet without a gap', pel.maxY > abd.minY - tol,
      `pelvis top ${f3(pel.maxY)} vs abdomen floor ${f3(abd.minY)}`);
  }
  if (pel) {
    const ring = boundsOf(ctx.meshesFor('pelvis.ring').map((m) => m.positions));
    check('pelvic cavity stays inside the pelvic bones', inside(pel, ring, tol * 0.5),
      `cavity x ${f3(pel.minX)}..${f3(pel.maxX)} vs bone ${f3(ring.minX)}..${f3(ring.maxX)}`);
  }
  if (cra) {
    const vault = boundsOf(ctx.meshesFor('skull.vault').map((m) => m.positions));
    check('cranial cavity stays inside the skull', inside(cra, vault, H * 0.004));
  }
  if (ver && thx) {
    check('vertebral canal is behind the thoracic cavity centre',
      (ver.minZ + ver.maxZ) / 2 < (thx.minZ + thx.maxZ) / 2,
      `canal z ${f3((ver.minZ + ver.maxZ) / 2)} vs thorax centre ${f3((thx.minZ + thx.maxZ) / 2)}`);
    check('vertebral canal is narrow', (ver.maxX - ver.minX) < H * 0.035,
      `${f3(ver.maxX - ver.minX)} m wide`);
    check('vertebral canal runs most of the trunk', (ver.maxY - ver.minY) > H * 0.28,
      `${f3(ver.maxY - ver.minY)} m long`);
  }
  const ple = built['cav-pleural'];
  if (ple && ple.parts.length === 2) {
    const a = boundsOf([ple.parts[0].positions]), c = boundsOf([ple.parts[1].positions]);
    check('the two pleural cavities are separate', a.minX > c.maxX - tol || c.minX > a.maxX - tol,
      `left x ${f3(a.minX)}..${f3(a.maxX)}   right x ${f3(c.minX)}..${f3(c.maxX)}`);
    if (med) {
      check('pleural cavities are lateral to the mediastinum',
        Math.max(a.maxX, c.maxX) > med.maxX - tol && Math.min(a.minX, c.minX) < med.minX + tol);
    }
  }
  /* nothing may escape the body */
  for (const id of BUILDABLE) {
    const r = built[id];
    if (!r) continue;
    const b = partBounds(r);
    if (!inside(b, ctx.body, H * 0.01)) { check(`${id} stays inside the body`, false); }
  }
  return built;
}

run('ALL SEVEN LAYERS LOADED', all);
run('SKELETON ONLY (first open)', all.filter((e) => e.layer === 'skeleton'));

/*
 * Every layer combination a user can actually reach, not just the two ends.
 *
 * The layers load one at a time, on demand, so the interesting states are the
 * ones in between -- and a builder that quietly returns null in one of them
 * takes its children with it. With only the organ layer up, the mediastinum is
 * measured from the lungs rather than from the vertebral bodies, and the
 * pericardial sac is a subset of the mediastinum: one null there and the sac
 * disappears with no error anywhere.
 *
 * Shapes are checked in run() above; this asks the cheaper question of every
 * combination -- did it build at all.
 */
console.log('\n================ EVERY LAYER COMBINATION ================');
{
  const COMBOS = [
    ['skeleton'], ['skeleton', 'organs'], ['skeleton', 'muscle'], ['skeleton', 'circulatory'],
    ['skeleton', 'muscle', 'organs'], ['skeleton', 'organs', 'circulatory'],
    ['skeleton', 'muscle', 'organs', 'circulatory'], Object.keys(LAYERS),
  ];
  const ids = [...BUILDABLE];
  console.log('  ' + 'cavity'.padEnd(20) + COMBOS.map((_, i) => ('#' + i).padStart(6)).join(''));
  const missing = [];
  for (const id of ids) {
    const row = [];
    for (const combo of COMBOS) {
      const set = new Set(combo);
      const ctx = makeCtx(all.filter((e) => set.has(e.layer)));
      const r = buildCavityGeometry(id, ctx, measureLandmarks(ctx));
      if (!r) missing.push(`${id} with ${combo.join('+')}`);
      row.push(r ? (r.exact ? '  ok' : ' est') : 'NULL');
    }
    console.log('  ' + id.padEnd(20) + row.map((v) => v.padStart(6)).join(''));
  }
  COMBOS.forEach((c, i) => console.log(`    #${i} ${c.join(' + ')}`));
  check('every cavity builds in every layer combination', !missing.length,
    missing.slice(0, 4).join('; '));
}

console.log(bad ? `\n${bad} CHECK(S) FAILED` : '\nALL BUILD CHECKS PASSED');
process.exit(bad ? 1 : 0);
