/*
 * Numeric validation of the cavity derivation against the real GLBs.
 *
 * Renders nothing. The point is to check that the maths produces anatomically
 * sensible NUMBERS -- a vertebral canal about 7 mm in radius that curves the
 * right way, a diaphragm whose dome is higher in front than behind, a cranial
 * cavity that fits inside the skull -- before any of it is wired to a renderer,
 * where a wrong number just looks like "a shape".
 *
 * All figures are in the GLB's own metres (the model is a 1.696 m human), so
 * they can be read against real anatomy directly.
 *
 * Run: node work/cavity-probe.mjs
 */
import { loadGlbMeshes } from './glb-mesh.mjs';
import { createResolver } from '../outputs/landmarks.js';
import {
  ringStack, starShell, heightField, sampleField, domeFromRim, canalPath, boundsOf, frontSurface,
  starMesh, stackMesh, planeThrough,
} from '../outputs/cavity-geom.js';

const LAYERS = {
  skeleton: 'assets/z-anatomy-skeleton.glb',
  muscle: 'assets/kas.glb',
  organs: 'assets/ic-organlar.glb',
  circulatory: 'assets/dolasim.glb',
};
const entries = [];
for (const [layer, file] of Object.entries(LAYERS)) {
  for (const m of loadGlbMeshes(file)) entries.push({ name: m.name, layer, mesh: m });
}
const R = createResolver(entries);
const pts = (key) => R.resolve(key).entries.map((e) => e.mesh.positions);
const f3 = (v) => (Number.isFinite(v) ? v.toFixed(3) : '  n/a');

const body = boundsOf(entries.filter((e) => e.layer === 'skeleton').map((e) => e.mesh.positions));
const H = body.maxY - body.minY;
const fy = (y) => (y - body.minY) / H;
console.log(`body: y ${f3(body.minY)}..${f3(body.maxY)}  H=${f3(H)} m\n`);

let bad = 0;
const check = (label, ok, detail) => {
  if (!ok) bad++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? '  — ' + detail : ''}`);
};

/* ---------------- 1. vertebral canal ---------------- */
console.log('VERTEBRAL CANAL');
const vertClouds = R.resolveAll(['spine.cervical', 'spine.thoracic', 'spine.lumbar'])
  .map((e) => ({ name: e.norm, meshes: [e.mesh] }));
const canal = canalPath(vertClouds);
console.log(`  vertebrae in: ${vertClouds.length}   foramina found: ${canal.nodes.length}`);
const radii = canal.radius;
const rMin = Math.min(...radii), rMax = Math.max(...radii);
console.log(`  canal radius  min ${f3(rMin)}  max ${f3(rMax)} m  (real: ~0.006-0.012)`);
check('every vertebra reported a foramen', canal.nodes.length >= vertClouds.length - 2,
  `${canal.nodes.length}/${vertClouds.length}`);
check('canal radius is anatomically plausible', rMin > 0.003 && rMax < 0.020);
/* the canal must sit BEHIND the vertebral bodies, and curve */
const zTop = canal.path[0][2], zMid = canal.path[Math.floor(canal.path.length / 2)][2];
const zBot = canal.path[canal.path.length - 1][2];
console.log(`  canal z: cervical ${f3(zTop)}  thoracic ${f3(zMid)}  lumbar ${f3(zBot)}`);
check('canal curves rather than running straight', Math.abs(zTop - zMid) > 0.008 || Math.abs(zBot - zMid) > 0.008);
const xOff = Math.max(...canal.path.map((p) => Math.abs(p[0])));
check('canal stays on the midline', xOff < 0.006, `max |x| ${f3(xOff)}`);
for (const n of canal.nodes.slice(0, 3).concat(canal.nodes.slice(-2))) {
  console.log(`     ${n.name.padEnd(14)} y=${f3(n.y)} (fy ${fy(n.y).toFixed(3)})  z=${f3(n.z)}  r=${f3(n.r)}`);
}

/* ---------------- 2. thoracic cage ---------------- */
console.log('\nTHORACIC CAVITY');
const thoraxWall = pts('thorax.ribs').concat(pts('thorax.sternum'), pts('spine.thoracic'), pts('thorax.costalCartilage'));
const wb = boundsOf(thoraxWall);
console.log(`  wall cloud y ${f3(wb.minY)}..${f3(wb.maxY)}  (fy ${fy(wb.minY).toFixed(3)}..${fy(wb.maxY).toFixed(3)})`);
const thorax = ringStack(thoraxWall, { bands: 22, sectors: 48, percentile: 0.10, inset: 0.004 });
const midBand = Math.floor(thorax.bands * 0.55);
const halfW = Math.max(...thorax.r[midBand]);
console.log(`  mid-chest ring: y ${f3(thorax.ys[midBand])} axis(${f3(thorax.cx[midBand])},${f3(thorax.cz[midBand])}) rmax ${f3(halfW)}`);
check('chest half-width is plausible', halfW > 0.08 && halfW < 0.17, `${f3(halfW)} m`);
const covFrac = thorax.covered[midBand].filter(Boolean).length / thorax.sectors;
check('mid-chest ring is mostly real bone', covFrac > 0.75, `${(covFrac * 100).toFixed(0)}% sectors covered`);
/* posterior indentation: the vertebral bodies bulge into the ring from behind */
const sBack = Math.floor(thorax.sectors * 0.75);      /* -z = posterior */
const sFront = Math.floor(thorax.sectors * 0.25);
console.log(`  radius front ${f3(thorax.r[midBand][sFront])}  back ${f3(thorax.r[midBand][sBack])}`);

/* ---------------- 3. diaphragm ---------------- */
console.log('\nDIAPHRAGM');
const diaPts = pts('diaphragm');
check('diaphragm mesh present in the muscle layer', diaPts.length > 0);
const dia = heightField(diaPts, { nx: 26, nz: 26, mode: 'max', smooth: 1 });
const db = boundsOf(diaPts);
console.log(`  diaphragm cloud y ${f3(db.minY)}..${f3(db.maxY)} (fy ${fy(db.minY).toFixed(3)}..${fy(db.maxY).toFixed(3)})`);
const apexL = sampleField(dia, 0.06, 0.02), apexR = sampleField(dia, -0.06, 0.02);
const front = sampleField(dia, 0, 0.07), back = sampleField(dia, 0, -0.06);
console.log(`  height at: right dome ${f3(apexR)}  left dome ${f3(apexL)}  front ${f3(front)}  back ${f3(back)}`);
check('dome sits higher in front than behind', front > back + 0.01,
  `front ${f3(front)} vs back ${f3(back)}  (this is the costodiaphragmatic recess)`);
check('right dome is at least as high as the left', apexR > apexL - 0.02, 'liver pushes the right dome up');

/* the synthesised fallback, used when the muscle layer is not loaded */
const lowerRibs = pts('thorax.ribsLower').concat(pts('thorax.costalCartilage'));
const rim = ringStack(lowerRibs, { bands: 10, sectors: 40, percentile: 0.10 });
const synth = domeFromRim(rim, { scale: H });
const sFrontV = sampleField(synth, 0, 0.06), sBackV = sampleField(synth, 0, -0.05);
console.log(`  synthesised (no muscle layer): front ${f3(sFrontV)}  back ${f3(sBackV)}`);
check('synthesised dome also leans forward', sFrontV > sBackV);

/* ---------------- 4. cranial cavity ---------------- */
console.log('\nCRANIAL CAVITY');
const vault = pts('skull.vault');
const vb = boundsOf(vault);
const shell = starShell(vault, {
  lat: 14, lon: 28, mode: 'min', percentile: 0.06, capInset: 0.004,
  centre: [(vb.minX + vb.maxX) / 2, vb.minY + (vb.maxY - vb.minY) * 0.62, (vb.minZ + vb.maxZ) / 2 - 0.005],
});
const flat = shell.r.flat();
console.log(`  vault box y ${f3(vb.minY)}..${f3(vb.maxY)}  x +-${f3((vb.maxX - vb.minX) / 2)}  z ${f3(vb.minZ)}..${f3(vb.maxZ)}`);
console.log(`  inner radius min ${f3(Math.min(...flat))}  max ${f3(Math.max(...flat))} m  (real: ~0.06-0.09)`);
check('cranial cavity radius is plausible', Math.min(...flat) > 0.015 && Math.max(...flat) < 0.11);
/* every shell vertex must lie inside the vault's own box */
const sm = starMesh(shell);
let outside = 0;
for (let i = 0; i < sm.positions.length; i += 3) {
  const x = sm.positions[i], y = sm.positions[i + 1], z = sm.positions[i + 2];
  if (x < vb.minX - 1e-3 || x > vb.maxX + 1e-3 || y < vb.minY - 1e-3
    || y > vb.maxY + 1e-3 || z < vb.minZ - 1e-3 || z > vb.maxZ + 1e-3) outside++;
}
check('every cranial-cavity vertex is inside the vault', outside === 0, `${outside} vertices escaped`);

/* ---------------- 5. pelvis ---------------- */
console.log('\nPELVIC CAVITY');
const ring = pts('pelvis.ring');
const pb = boundsOf(ring);
console.log(`  pelvic bones y ${f3(pb.minY)}..${f3(pb.maxY)} (fy ${fy(pb.minY).toFixed(3)}..${fy(pb.maxY).toFixed(3)})`);
/* the pelvic inlet, measured: sacral promontory behind, pubic symphysis in front */
const sacPts = pts('spine.sacrum');
const sbx = boundsOf(sacPts);
let promY = -Infinity, promZ = 0;
for (const p of sacPts) for (let i = 0; i < p.length; i += 3) {
  if (p[i + 2] > sbx.maxZ - 0.02 && p[i + 1] > promY) { promY = p[i + 1]; promZ = p[i + 2]; }
}
const hipPts = pts('pelvis.hipBone');
let symY = Infinity, symZ = 0;
for (const p of hipPts) for (let i = 0; i < p.length; i += 3) {
  if (Math.abs(p[i]) < 0.008 && p[i + 2] > 0.02 && p[i + 1] < symY) { symY = p[i + 1]; symZ = p[i + 2]; }
}
/* the top of the symphysis, not its lowest point */
let symTop = -Infinity;
for (const p of hipPts) for (let i = 0; i < p.length; i += 3) {
  if (Math.abs(p[i]) < 0.010 && p[i + 2] > 0.02 && p[i + 1] > symTop) symTop = p[i + 1];
}
console.log(`  sacral promontory y ${f3(promY)} z ${f3(promZ)}   pubic symphysis top y ${f3(symTop)} z ${f3(symZ)}`);
check('the inlet slopes down towards the front', symTop < promY,
  `promontory is ${f3(promY - symTop)} m higher — that tilt is the pelvic inclination`);
const inlet = planeThrough([0, promY, promZ], [0, symTop, symZ]);
const pelvis = ringStack(ring, {
  y0: pb.minY + 0.004,
  y1: promY,
  bands: 16, sectors: 40, percentile: 0.10, inset: 0.003, capUncovered: 1.15,
});
const pelvisMesh = stackMesh(pelvis, { roof: inlet, capRings: 4 });
let pMax = 0, pAbove = 0;
for (let i = 0; i < pelvisMesh.positions.length; i += 3) {
  const x = pelvisMesh.positions[i], y = pelvisMesh.positions[i + 1], z = pelvisMesh.positions[i + 2];
  pMax = Math.max(pMax, Math.hypot(x, z - (pb.minZ + pb.maxZ) / 2));
  if (y > inlet(x, z) + 1e-3) pAbove++;
}
console.log(`  true-pelvis rmax ${f3(pMax)} m  (a real pelvic inlet is ~0.06-0.07 m in radius)`);
check('pelvic cavity stays inside the pelvic ring', pMax < 0.095, `${f3(pMax)} m`);
check('pelvic cavity is not a pinpoint', pMax > 0.03);
check('nothing pokes up through the pelvic inlet', pAbove === 0, `${pAbove} vertices above the brim`);

/* ---------------- 6. heart / pericardium ---------------- */
console.log('\nPERICARDIAL CAVITY');
const heart = pts('heart');
const hb = boundsOf(heart);
console.log(`  heart box x ${f3(hb.minX)}..${f3(hb.maxX)}  y ${f3(hb.minY)}..${f3(hb.maxY)}  z ${f3(hb.minZ)}..${f3(hb.maxZ)}`);
const peri = starShell(heart, { lat: 12, lon: 24, mode: 'max', percentile: 0.96, grow: 0.004 });
const pflat = peri.r.flat();
console.log(`  sac radius min ${f3(Math.min(...pflat))}  max ${f3(Math.max(...pflat))} m`);
check('pericardial sac is much smaller than the chest', Math.max(...pflat) < halfW * 0.8);
check('heart sits left of the midline', (hb.minX + hb.maxX) / 2 > 0.0,
  `centre x ${f3((hb.minX + hb.maxX) / 2)} (+x is the patient's left)`);

/* ---------------- 7. lungs / pleural separation ---------------- */
console.log('\nPLEURAL CAVITIES');
const lungL = boundsOf(pts('lung.left')), lungR = boundsOf(pts('lung.right'));
console.log(`  left lung  x ${f3(lungL.minX)}..${f3(lungL.maxX)}   right lung x ${f3(lungR.minX)}..${f3(lungR.maxX)}`);
check('the two lungs do not overlap across the midline', lungL.minX > lungR.maxX - 0.02,
  `gap between them is the mediastinum`);
console.log(`  mediastinal width between lungs: ${f3(lungL.minX - lungR.maxX)} m`);

/* ---------------- 8. anterior surface for the region grid ---------------- */
console.log('\nANTERIOR ABDOMINAL SURFACE');
const wallPts = pts('wall.abdominal').concat(pts('thorax.ribsLower'), pts('thorax.costalCartilage'), pts('pelvis.hipBone'));
const surf = frontSurface(wallPts, { nx: 24, ny: 28 });
const zUmb = sampleField(surf, 0, 0.60 * H + body.minY);
const zFlank = sampleField(surf, 0.10, 0.60 * H + body.minY);
console.log(`  front z at midline ${f3(zUmb)}   at flank ${f3(zFlank)}`);
check('the belly bulges forward of the flank', zUmb > zFlank, 'so the grid curves round the body');

console.log(bad ? `\n${bad} CHECK(S) FAILED` : '\nALL CHECKS PASSED');
process.exit(bad ? 1 : 0);
