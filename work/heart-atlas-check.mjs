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
import { normaliseCitationText as norm } from './lib/source-lesson-map.mjs';

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

console.log('atlas build (needs three in node_modules; skipped if absent)');
let three = null;
try { three = await import('three'); } catch { /* not installed */ }
if (!three) console.log('  skip no local three; the browser check in Task 7 covers this');
else {
  const els = new Map();
  const mk = (id) => { const e = { id, dataset: {}, style: {}, textContent: '', value: '70', addEventListener() {}, setAttribute() {}, classList: { toggle() {}, add() {}, remove() {} } }; els.set(id, e); return e; };
  globalThis.document = { getElementById: (id) => els.get(id) || mk(id), createElement: () => ({ getContext: () => null, width: 0, height: 0 }) };
  globalThis.fetch = async (u) => {
    const f = String(u).split('/').pop();
    const buf = readFileSync(join(HEART_DIR, f));
    return { ok: true, json: async () => JSON.parse(buf.toString()), arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) };
  };
  const { createHeartAtlas } = await import(pathToFileURL(join(HEART_DIR, 'atlas.js')).href);
  const atlas = await createHeartAtlas({ base: 'file:///x/' });
  ok(atlas.meshes.length >= manifest.meshes.length, `atlas built ${atlas.meshes.length} meshes (manifest has ${manifest.meshes.length})`);
  ok(Math.abs(atlas.group.scale.x - 1 / SCALE) < 1e-12, 'group scale is 1/24');
  atlas.setPreset('conduction');
  ok(atlas.groups.conduction.visible && !atlas.groups.chambers.visible, 'conduction preset shows the conduction group and hides the cavities');
  atlas.setPreset('chambers');
  ok(atlas.groups.chambers.visible && !atlas.groups.valves.visible, 'chambers preset shows the cavities and hides the valves');
  atlas.attach(new three.Group());
  for (let t = 0; t < 2; t += 0.05) atlas.update(t);
  ok(atlas.state.beat && Number.isFinite(atlas.state.beat.phase), 'the cardiac clock advances');
  atlas.detach();
}

console.log('pericardium');
{
  const { PERICARDIUM } = await import(pathToFileURL(join(HEART_DIR, 'pericardium-text.js')).href);
  const peri = JSON.parse(readFileSync(join(HEART_DIR, 'pericardium.json'), 'utf8'));
  const pbin = readFileSync(join(HEART_DIR, 'pericardium.bin'));
  const keys = peri.meshes.map((m) => m.key);
  ok(['FP', 'PP', 'PC', 'EPI'].every((k) => keys.includes(k)) && keys.length === 4, `the four layers are there (${keys.join(', ')})`);
  const wall = manifest.meshes.filter((m) => m.group === 'wall');
  const lo = [0, 1, 2].map((k) => Math.min(...wall.map((m) => m.min[k]))), hi = [0, 1, 2].map((k) => Math.max(...wall.map((m) => m.max[k])));
  for (const m of peri.meshes) {
    const inBin = m.positionOffset % 4 === 0 && m.indexOffset % 4 === 0 && m.positionOffset + m.positionCount * 4 <= pbin.length && m.indexOffset + m.indexCount * 4 <= pbin.length;
    let idxOk = inBin;
    for (let i = 0; idxOk && i < m.indexCount; i++) if (pbin.readUInt32LE(m.indexOffset + i * 4) >= m.positionCount / 3) idxOk = false;
    ok(idxOk, `${m.key}: inside pericardium.bin, indices in range`);
    /* round the heart: its box holds the wall's (the epicardium, a smoothed skin on the wall, to within 0.1), and is
       no more than 0.6 bigger on any side */
    const tol = m.key === 'EPI' ? 0.1 : 0.05;
    ok([0, 1, 2].every((k) => m.min[k] < lo[k] + tol && m.max[k] > hi[k] - tol && m.min[k] > lo[k] - 0.6 && m.max[k] < hi[k] + 0.6), `${m.key}: wraps the heart wall`);
    ok(!!PERICARDIUM[m.key], `${m.key}: has a card`);
  }
  const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
  for (const [k, p] of Object.entries(PERICARDIUM)) {
    const src = TEXT[p.cite.ref], page = src && (src.pages || src)[p.cite.page - 1];
    for (const words of p.cite.match) ok(!!page && norm(page.text || page).includes(norm(words)), `${k}: "${words}" is on ${p.cite.ref} p${p.cite.page}`);
  }
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
