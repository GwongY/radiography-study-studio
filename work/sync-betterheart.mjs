/*
 * Follow BetterHeart's site: https://skypray.synology.me/betterheart/heart-anatomy/
 *
 *   node work/sync-betterheart.mjs            report only: what changed upstream since the last accept
 *   node work/sync-betterheart.mjs --write    also pull the mesh data (heart-meshes.bin + manifest) if it changed
 *   node work/sync-betterheart.mjs --accept   record the upstream state as "reviewed" in work/betterheart-baseline.json
 *
 * Two kinds of upstream change, handled differently on purpose:
 *   - MESH DATA (CC BY-SA 4.0) is a straight copy. --write replaces outputs/heart/heart-meshes.bin and
 *     heart-manifest.json (keeping only the manifest fields the atlas reads), then tells you to refit
 *     alignment.js and run the checks. Nothing is fetched at run time: the app stays offline-first.
 *   - CODE is adapted (our modules read `ha-` ids, import three through the import map, run inside the
 *     explorer scene), so it can never be overwritten. The report lists which upstream modules changed
 *     since the last --accept, so you know which of ours to re-port, and which modules are new.
 * Hashes ignore line endings and the copyright banner on the first lines.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VERSIONS } from './lib/bh-js.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEART = join(ROOT, 'outputs', 'heart');
const BASELINE = join(ROOT, 'work', 'betterheart-baseline.json');
const BASE = 'https://skypray.synology.me/betterheart/heart-anatomy/';
const args = new Set(process.argv.slice(2));

const get = async (path, as = 'text') => {
  const r = await fetch(BASE + path, { headers: { 'cache-control': 'no-cache' } });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  return as === 'buffer' ? Buffer.from(await r.arrayBuffer()) : r.text();
};
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const normalise = (s) => s.replace(/\r/g, '').replace(/^\/\*![\s\S]*?\*\/\n?/, '');

const html = await get('');
const entry = await get('heart.js');
/* Every local module the page or the entry script pulls in, one level deep, plus the entry itself. */
const specs = new Set(['heart.js']);
for (const src of [html, entry]) for (const m of src.matchAll(/['"]\.?\/?([\w-]+\.js)(?:\?v=\d+)?['"]/g)) if (!m[1].startsWith('three')) specs.add(m[1]);
for (const s of [...specs]) { /* heart.js imports are what the page lists; follow one more level */
  if (s === 'heart.js') continue;
  try { for (const m of (await get(s)).matchAll(/from\s*['"]\.\/([\w-]+\.js)/g)) specs.add(m[1]); } catch { /* listed but gone */ }
}

const modules = {};
for (const s of [...specs].sort()) { try { modules[s] = sha(normalise(await get(s))); } catch (e) { modules[s] = 'MISSING ' + e.message; } }

const manifestText = await get('heart-manifest.json');
const manifest = JSON.parse(manifestText);
const bin = await get('heart-meshes.bin', 'buffer');
const meshesHash = sha(sha(bin) + JSON.stringify([manifest.meshes, manifest.alignment]));

const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : null;
const state = { buildTag: manifest.buildTag || null, meshesHash, modules };

console.log(`upstream build ${state.buildTag || '(none)'} -- ${Object.keys(modules).length} modules, ${manifest.meshes.length} meshes`);
if (!base) console.log('no baseline yet: run with --accept once you have reviewed the current upstream state');
else {
  const changed = Object.keys(modules).filter((k) => base.modules[k] && base.modules[k] !== modules[k]);
  const added = Object.keys(modules).filter((k) => !(k in base.modules));
  const removed = Object.keys(base.modules).filter((k) => !(k in modules));
  console.log(`build tag     ${base.buildTag === state.buildTag ? 'unchanged' : `${base.buildTag} -> ${state.buildTag}`}`);
  console.log(`mesh data     ${base.meshesHash === meshesHash ? 'unchanged' : 'CHANGED'}`);
  console.log(`modules       ${changed.length} changed, ${added.length} new, ${removed.length} removed`);
  /* modules in VERSIONS are re-ported by work/port-betterheart.mjs; the rest carry hand adaptations (heart-motion, conduction, valve-*, ...) */
  for (const k of changed) console.log('   changed  ' + k + (k in VERSIONS ? '   -> node work/port-betterheart.mjs ' + k : '   -> hand-adapted: diff it against outputs/heart/' + k));
  for (const k of added) console.log('   new      ' + k);
  for (const k of removed) console.log('   removed  ' + k);
}

const localBin = existsSync(join(HEART, 'heart-meshes.bin')) ? readFileSync(join(HEART, 'heart-meshes.bin')) : null;
const localManifest = existsSync(join(HEART, 'heart-manifest.json')) ? JSON.parse(readFileSync(join(HEART, 'heart-manifest.json'), 'utf8')) : null;
const same = localBin && localBin.equals(bin) && localManifest
  && JSON.stringify([localManifest.meshes, localManifest.alignment]) === JSON.stringify([manifest.meshes, manifest.alignment]);
console.log(`local mesh data ${same ? 'matches upstream' : 'DIFFERS from upstream'}`);

if (args.has('--write') && !same) {
  /* Only what atlas.js and the checks read; upstream's own build metadata stays in the baseline. */
  const kept = { version: manifest.version, meshes: manifest.meshes, alignment: manifest.alignment, source: manifest.source };
  writeFileSync(join(HEART, 'heart-manifest.json'), JSON.stringify(kept, null, 2) + '\n');
  writeFileSync(join(HEART, 'heart-meshes.bin'), bin);
  console.log('wrote outputs/heart/heart-manifest.json and heart-meshes.bin. Next:');
  console.log('  node work/build-heart-alignment.mjs --write   (refit to dolasim.glb)');
  console.log('  node work/heart-atlas-check.mjs');
  console.log('  bump CACHE_VERSION in outputs/sw.js, then commit');
}
if (args.has('--accept')) { writeFileSync(BASELINE, JSON.stringify(state, null, 2) + '\n'); console.log('baseline written: ' + BASELINE); }
