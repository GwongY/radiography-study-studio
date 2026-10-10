/*
 * Heart atlas check — alignment, manifest and mesh data, without a browser.
 *
 *   1. the committed alignment.js still matches a fresh fit of the manifest to dolasim.glb
 *   2. the fit itself is good (uniform scale 24, small residual)
 *   3. every manifest mesh lies inside heart-meshes.bin and every index is in range
 *   4. each BodyParts3D chamber cavity sits inside the wall mesh of the same chamber
 *   5. every manifest key the atlas selects has a description
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { HEART_DIR, SCALE, fit, loadManifest, matchedRows } from './lib/heart-fit.mjs';

let fail = 0;
const ok = (c, m) => { console.log(`  ${c ? 'ok  ' : 'FAIL'} ${m}`); if (!c) fail++; };

const manifest = loadManifest();
const rows = matchedRows(manifest);
const r = fit(rows);
const { ATLAS_SCALE, ATLAS_SHIFT } = await import(pathToFileURL(join(HEART_DIR, 'alignment.js')).href);

console.log('alignment');
ok(rows.length >= 35, `${rows.length} manifest meshes matched to dolasim.glb (need >= 35)`);
ok(ATLAS_SCALE === SCALE, `ATLAS_SCALE is ${SCALE}`);
ok(r.ratio.every((v) => Math.abs(v - SCALE) < 0.3), `extent ratio per axis ${r.ratio.map((v) => v.toFixed(3)).join(' / ')} within 0.3 of ${SCALE}`);
ok(r.worst < 0.03, `worst centre residual ${r.worst.toFixed(4)} (${r.worstName}) < 0.03`);
ok(r.shift.every((v, k) => Math.abs(v - ATLAS_SHIFT[k]) < 1e-3), `committed ATLAS_SHIFT ${JSON.stringify(ATLAS_SHIFT)} matches a fresh fit`);

console.log('mesh data');
const bin = readFileSync(join(HEART_DIR, 'heart-meshes.bin'));
let bad = 0;
for (const m of manifest.meshes) {
  const posEnd = m.positionOffset + m.positionCount * 4;
  const idxEnd = m.indexOffset + m.indexCount * 4;
  if (m.positionOffset % 4 || m.indexOffset % 4 || posEnd > bin.length || idxEnd > bin.length || m.positionCount % 3 || m.indexCount % 3) { bad++; console.log('   bad range', m.key, m.sourceName); continue; }
  const verts = m.positionCount / 3;
  for (let i = 0; i < m.indexCount; i++) if (bin.readUInt32LE(m.indexOffset + i * 4) >= verts) { bad++; console.log('   index out of range', m.key, m.sourceName); break; }
}
ok(bad === 0, `all ${manifest.meshes.length} manifest meshes lie inside the .bin with valid indices`);

console.log('chambers');
for (const key of ['LV', 'RV', 'LA', 'RA']) {
  const wall = manifest.meshes.find((m) => m.group === 'wall' && m.key === key);
  const cav = manifest.meshes.find((m) => m.group === 'chambers' && m.key === key);
  const inside = wall && cav && [0, 1, 2].every((k) => {
    const pad = 0.1 * (wall.max[k] - wall.min[k]);
    const c = (cav.min[k] + cav.max[k]) / 2;
    return c > wall.min[k] - pad && c < wall.max[k] + pad;
  });
  ok(!!inside, `${key} cavity centre lies inside the ${key} wall box`);
}

console.log('descriptions');
const { DESCRIPTIONS } = await import(pathToFileURL(join(HEART_DIR, 'descriptions.js')).href).catch(() => ({ DESCRIPTIONS: null }));
if (DESCRIPTIONS) {
  const missing = [...new Set(manifest.meshes.map((m) => m.key))].filter((k) => !DESCRIPTIONS[k]);
  ok(missing.length === 0, `every manifest key has a description${missing.length ? ' (missing ' + missing.join(', ') + ')' : ''}`);
} else console.log('  skip descriptions.js not generated yet');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
