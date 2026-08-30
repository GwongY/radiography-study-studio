/*
 * Does every landmark actually resolve against the real GLBs?
 *
 * Runs the browser resolver over the true mesh-name set of all seven layers,
 * so a typo'd pattern or a rename in a future model shows up here rather than
 * as a silently missing cavity wall. Run: node work/landmark-check.mjs
 */
import { loadGlbMeshes } from './glb-mesh.mjs';
import { createResolver, LANDMARK_KEYS, LANDMARKS, REFERENCE_CHAINS } from '../outputs/landmarks.js';

const LAYERS = {
  skeleton: 'assets/z-anatomy-skeleton.glb',
  muscle: 'assets/kas.glb',
  joint: 'assets/eklem.glb',
  organs: 'assets/ic-organlar.glb',
  circulatory: 'assets/dolasim.glb',
  nervous: 'assets/sinir.glb',
  lymphatic: 'assets/lenf.glb',
};

const entries = [];
for (const [layer, file] of Object.entries(LAYERS)) {
  for (const m of loadGlbMeshes(file)) {
    entries.push({ name: m.name, layer, mesh: m });
  }
}
console.log(`loaded ${entries.length} meshes across ${Object.keys(LAYERS).length} layers\n`);

const R = createResolver(entries);
let missing = 0;
console.log('LANDMARK'.padEnd(24) + 'LAYER'.padEnd(13) + 'N'.padStart(5) + '  examples');
for (const key of LANDMARK_KEYS) {
  const r = R.resolve(key);
  const ex = r.entries.slice(0, 3).map((e) => e.norm).join(', ');
  if (!r.available) missing++;
  console.log(
    `${r.available ? ' ' : '!'}${key.padEnd(23)}${String(LANDMARKS[key].layer).padEnd(13)}` +
    `${String(r.entries.length).padStart(5)}  ${ex.slice(0, 78)}`
  );
}

console.log('\n--- skeleton-only availability (the worst case at runtime) ---');
const skelOnly = createResolver(entries.filter((e) => e.layer === 'skeleton'));
for (const id of Object.keys(REFERENCE_CHAINS)) {
  const t = skelOnly.tier(id);
  console.log(`  ${id.padEnd(22)} ${t.exact ? 'exact   ' : 'approx  '}` +
    `usable:${String(t.usable.length).padStart(2)}   ${t.usable.join(' ')}`);
  if (!t.usable.length) { console.log(`     !! NO USABLE REFERENCE with only the skeleton loaded`); missing++; }
}

console.log(missing ? `\n${missing} PROBLEM(S)` : '\nALL LANDMARKS RESOLVE');
process.exit(missing ? 1 : 0);
