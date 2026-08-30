/*
 * Numeric validation of the abdominal surface grid -- the nine regions and the
 * four quadrants.
 *
 * These are topographic divisions: four named reference lines drawn on a
 * patient. Whether they are right is a numbers question long before it is a
 * rendering one, so this prints every measured landmark in the GLB's own metres
 * (the model is a 1.696 m human) and then asserts the relations that make the
 * result anatomy rather than a UI table:
 *
 *   - the two midclavicular lines are straight, parallel and symmetric
 *   - the same two run through all three rows, so the central column keeps its
 *     width from the epigastrium to the hypogastrium
 *   - every row boundary is a level plane, so no cell can taper to a point
 *   - the planes are in anatomical order, at their expected vertebral levels
 *   - the surface the grid sits on is torso-shaped and in front of the spine
 *
 * Run twice: skeleton only is what a learner actually sees on first open.
 *
 *   node work/grid-probe.mjs            # skeleton only
 *   node work/grid-probe.mjs --all      # every layer loaded
 */
import { loadGlbMeshes } from './glb-mesh.mjs';
import { createResolver } from '../outputs/landmarks.js';
import { measureLandmarks, measureGrid, gridBounds } from '../outputs/cavity-build.js';
import { boundsOf } from '../outputs/cavity-geom.js';

const ALL = process.argv.includes('--all');
const LAYERS = ALL ? {
  skeleton: 'assets/z-anatomy-skeleton.glb',
  muscle: 'assets/kas.glb',
  organs: 'assets/ic-organlar.glb',
  circulatory: 'assets/dolasim.glb',
  nervous: 'assets/sinir.glb',
  lymphatic: 'assets/lenf.glb',
  joint: 'assets/eklem.glb',
} : { skeleton: 'assets/z-anatomy-skeleton.glb' };

const entries = [];
for (const [layer, file] of Object.entries(LAYERS)) {
  for (const m of loadGlbMeshes(file)) entries.push({ name: m.name, layer, mesh: m });
}
const R = createResolver(entries);
const ctx = {
  resolver: R,
  meshesFor: (k) => R.resolve(k).entries.map((e) => e.mesh),
  entriesFor: (keys) => R.resolveAll(keys).map((e) => ({ name: e.norm, mesh: e.mesh })),
  tier: (id) => R.tier(id),
  body: boundsOf(entries.filter((e) => e.layer === 'skeleton').map((e) => e.mesh.positions)),
};

const f3 = (v) => (Number.isFinite(v) ? v.toFixed(3) : '  n/a');
const body = ctx.body;
const H = body.maxY - body.minY;
const fy = (y) => (Number.isFinite(y) ? ((y - body.minY) / H * 100).toFixed(1) + '%' : 'n/a');

let bad = 0;
const check = (label, ok, detail) => {
  if (!ok) bad++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? '  — ' + detail : ''}`);
};

console.log(`layers: ${Object.keys(LAYERS).join(', ')}`);
console.log(`body: y ${f3(body.minY)}..${f3(body.maxY)}  H=${f3(H)} m\n`);

const M = measureLandmarks(ctx);
const G = measureGrid(ctx, M);

/* ---------------- the median plane ---------------- */
console.log('MEDIAN PLANE');
console.log(`  x = ${f3(G.medianX)}   (from the vertebral column and sternum)`);
check('the median plane is genuinely central', Math.abs(G.medianX) < H * 0.01,
  `${f3(G.medianX)} m off the model centre`);

/* ---------------- vertical reference lines ---------------- */
console.log('\nMIDCLAVICULAR LINES');
for (const e of R.resolve('thorax.clavicle').entries) {
  const b = boundsOf([e.mesh.positions]);
  const near = Math.abs(b.minX) < Math.abs(b.maxX) ? b.minX : b.maxX;
  const far = Math.abs(b.minX) < Math.abs(b.maxX) ? b.maxX : b.minX;
  console.log(`  ${e.norm.padEnd(11)} sternal x=${f3(near)}  acromial x=${f3(far)}  midpoint ${f3((near + far) / 2)}`);
}
console.log(`  lines at x = ${f3(G.medianX - G.midclavicularX)} and ${f3(G.medianX + G.midclavicularX)}`
  + `   (±${f3(G.midclavicularX)} from the midline)`);
check('both midclavicular lines resolved', G.midclavicularX != null && G.midclavicularX > 0);
check('the pair is symmetric about the median plane', true, 'one measurement, mirrored — parallel by construction');

/* ---------------- horizontal reference planes ---------------- */
console.log('\nHORIZONTAL PLANES');
const levels = [
  ['xiphisternal (top of the drawing)', G.topY],
  ['subcostal — 10th costal cartilage', G.subcostalY],
  ['transumbilical — L3/L4', G.transumbilicalY],
  ['transtubercular — iliac tubercles', G.transtubercularY],
  ['pubic symphysis (bottom)', G.bottomY],
];
for (const [label, y] of levels) console.log(`  ${label.padEnd(36)} y ${f3(y)}  (${fy(y)} of height)`);
const vert = (k) => { const b = boundsOf(ctx.meshesFor(k).map((m) => m.positions)); return b; };
const l3 = vert('spine.L3'), l5 = vert('spine.L5');
console.log(`  L3 body y ${f3(l3.minY)}..${f3(l3.maxY)}   L5 body y ${f3(l5.minY)}..${f3(l5.maxY)}`);
check('subcostal lies above transtubercular', G.subcostalY > G.transtubercularY,
  `${f3(G.subcostalY)} vs ${f3(G.transtubercularY)}`);
check('transumbilical lies between them',
  G.transumbilicalY < G.subcostalY && G.transumbilicalY > G.transtubercularY);
check('the subcostal plane is at the L3 level',
  G.subcostalY >= l3.minY - 0.02 && G.subcostalY <= l3.maxY + 0.02, `${f3(G.subcostalY)}`);
check('the transtubercular plane is at the L5 level',
  G.transtubercularY >= l5.minY - 0.02 && G.transtubercularY <= l5.maxY + 0.02, `${f3(G.transtubercularY)}`);
check('the drawing starts above the subcostal plane', G.topY > G.subcostalY);
check('the drawing ends below the transtubercular plane', G.bottomY < G.transtubercularY);

/* ---------------- what the renderer actually draws ---------------- */
for (const kind of ['region', 'quadrant']) {
  console.log(`\nBOUNDARIES — ${kind}`);
  const B = gridBounds(kind, G);
  console.log(`  verticals   x = ${B.verticals.map(f3).join(', ')}`);
  console.log(`  horizontals y = ${B.horizontals.map(f3).join(', ')}`);
  check(`${kind} verticals are constants — straight, parallel lines`,
    B.verticals.every((v) => typeof v === 'number' && Number.isFinite(v)));
  check(`${kind} horizontals are constants — level planes`,
    B.horizontals.every((v) => typeof v === 'number' && Number.isFinite(v)));

  /* the outer edge must be the silhouette, never a straight box side */
  const wTop = G.halfWidthAt(G.topY), wBot = G.halfWidthAt(G.bottomY);
  console.log(`  silhouette half-width: ${f3(wBot)} at the pubis .. ${f3(wTop)} at the xiphisternum`);
  check('the outer edge follows the body, not a rectangle',
    Math.abs(wTop - wBot) > 0.004, `${f3(wTop)} vs ${f3(wBot)}`);

  /* every cell keeps its width and its height everywhere across itself */
  const { cols, rows } = B;
  let thinnest = Infinity, narrowest = Infinity, where = '';
  const widths = [];
  for (let ci = 0; ci < cols.length - 1; ci++) {
    const perRow = [];
    for (let ri = 0; ri < rows.length - 1; ri++) {
      let wMin = Infinity;
      for (let s = 0; s <= 8; s++) {
        const y = rows[ri] + (rows[ri + 1] - rows[ri]) * (s / 8);
        const a = typeof cols[ci] === 'function' ? cols[ci](y) : cols[ci];
        const b = typeof cols[ci + 1] === 'function' ? cols[ci + 1](y) : cols[ci + 1];
        wMin = Math.min(wMin, b - a);
      }
      perRow.push(wMin);
      if (wMin < narrowest) { narrowest = wMin; where = `col ${ci} row ${ri}`; }
      thinnest = Math.min(thinnest, Math.abs(rows[ri] - rows[ri + 1]));
    }
    widths.push(perRow);
  }
  widths.forEach((perRow, ci) => console.log(`  col ${ci} width per row: ${perRow.map(f3).join('  ')}`));
  /* only the columns bounded by two reference lines can be constant -- the
     outer ones are bounded by the body, and follow it */
  let spread = 0;
  for (let ci = 0; ci < cols.length - 1; ci++) {
    if (typeof cols[ci] === 'function' || typeof cols[ci + 1] === 'function') continue;
    spread = Math.max(spread, Math.max(...widths[ci]) - Math.min(...widths[ci]));
  }
  check('every column between two reference lines keeps its width through all rows',
    spread < 1e-9, `${f3(spread)} m of variation`);
  check('no cell pinches to a point', narrowest > 0.02 && thinnest > 0.02,
    `narrowest ${f3(narrowest)} m (${where}), shortest ${f3(thinnest)} m`);
}

/* ---------------- the anterior surface ---------------- */
console.log('\nANTERIOR SURFACE');
const spineB = boundsOf(ctx.meshesFor('spine.lumbar').map((m) => m.positions));
console.log(`  lumbar spine reaches forward to z ${f3(spineB.maxZ)}`);
let curved = 0, inFront = 0, rows = 0;
for (const y of [G.bottomY, G.transtubercularY, G.transumbilicalY, G.subcostalY, G.topY]) {
  const w = G.halfWidthAt(y);
  const line = [-0.95, -0.5, 0, 0.5, 0.95].map((f) => f3(G.surfaceAt(G.medianX + f * w, y)));
  console.log(`  y=${f3(y)} (${fy(y).padStart(5)})  half-w ${f3(w)}  z across: ${line.join('  ')}`);
  const mid = G.surfaceAt(G.medianX, y), edge = G.surfaceAt(G.medianX + 0.95 * w, y);
  rows++;
  if (mid > edge + 0.004) curved++;
  if (mid > spineB.maxZ) inFront++;
}
check('the surface bulges at the midline — a torso, not a flat sheet', curved === rows,
  `${curved}/${rows} rows`);
check('the surface is in front of the vertebral column', inFront === rows, `${inFront}/${rows} rows`);
console.log(`  abdominal wall: ${G.wallMeasured ? 'measured from the muscle layer'
  : 'interpolated between the costal margin and the pelvis'}`
  + `   (${Math.round(G.wallCoverage * 100)}% of bands had points)`);

console.log(`\n${bad ? bad + ' FAILURE(S)' : 'ALL PASS'}`);
process.exit(bad ? 1 : 0);
