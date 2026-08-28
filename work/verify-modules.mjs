/*
 * Task #8 verification — module mapping + corpus integrity.
 *
 * Checks moduleOf()/moduleInfo() against the expected map (unit defaults,
 * the curated overrides) and confirms validateCorpus() still passes after
 * the study-data.js edits.
 *
 * Usage:  node work/verify-modules.mjs
 */
import { STUDY_ITEMS, moduleOf, moduleInfo, validateCorpus, validateApplications } from '../outputs/study-data.js';

let bad = 0;
const check = (label, got, want) => {
  if (got !== want) { bad++; console.log(`FAIL  ${label}: got ${got}, want ${want}`); }
  else console.log(`  ok  ${label}: ${got}`);
};

console.log('— unit defaults —');
check('hss.term  → 0', moduleOf({ id: 'x', unit: 'hss.term' }), 0);
check('hss.osteo → 0', moduleOf({ id: 'x', unit: 'hss.osteo' }), 0);
check('hss.joints→ 0', moduleOf({ id: 'x', unit: 'hss.joints' }), 0);
check('hss.m1    → 1', moduleOf({ id: 'x', unit: 'hss.m1' }), 1);
check('hss.m2    → 2', moduleOf({ id: 'x', unit: 'hss.m2' }), 2);
check('hss.m3    → 3', moduleOf({ id: 'x', unit: 'hss.m3' }), 3);
check('hss.m4    → 4', moduleOf({ id: 'x', unit: 'hss.m4' }), 4);
check('phys.*    → null', moduleOf({ id: 'x', unit: 'phys.heart' }), null);
check('hti.*     → null', moduleOf({ id: 'x', unit: 'hti.rad' }), null);

console.log('— curated overrides —');
check('hss2011-osteo-bone-shapes → 4', moduleOf({ id: 'hss2011-osteo-bone-shapes', unit: 'hss.osteo' }), 4);
check('hss2011-osteo-ribs-sternum → 1', moduleOf({ id: 'hss2011-osteo-ribs-sternum', unit: 'hss.osteo' }), 1);
check('hss2011-joints-rotator-cuff → 4', moduleOf({ id: 'hss2011-joints-rotator-cuff', unit: 'hss.joints' }), 4);
check('hss2011-structures-tarsals → 4', moduleOf({ id: 'hss2011-structures-tarsals', unit: 'hss.osteo' }), 4);

console.log('— live items —');
const dist = {};
for (const item of STUDY_ITEMS) {
  const n = moduleOf(item);
  dist[n ?? 'null'] = (dist[n ?? 'null'] || 0) + 1;
}
console.log('  distribution:', JSON.stringify(dist));

/* Overrides must reference real items, and no override item may be a phys/hti unit. */
for (const id of ['hss2011-osteo-bone-shapes','hss2011-osteo-long-bone-structure','hss2011-osteo-bone-functions','hss2011-osteo-skull-sutures','hss2011-osteo-pelvic-girdle','hss2011-osteo-leg-tarsals','hss2011-osteo-ribs-sternum','hss2011-bone-cranium','hss2011-bone-mandible','hss2011-bone-pelvis','hss2011-joints-rotator-cuff','hss2011-pastpaper-joints-articulations','hss2011-structures-rotatorCuff','hss2011-structures-skullBones','hss2011-structures-tarsals']) {
  const item = STUDY_ITEMS.find((i) => i.id === id);
  if (!item) { bad++; console.log(`FAIL  override id not in corpus: ${id}`); continue; }
  if (moduleOf(item) === null) { bad++; console.log(`FAIL  override id maps to null: ${id}`); }
}

console.log('— moduleInfo —');
const mi = moduleInfo(STUDY_ITEMS.find((i) => i.id === 'hss2011-osteo-bone-shapes'));
check('moduleInfo(osteo-bone-shapes).n', mi?.n, 4);
check('moduleInfo(osteo-bone-shapes).name', mi?.name, 'Musculoskeletal System');
check('moduleInfo(osteo-bone-shapes).plain non-empty', (mi?.plain || '').length > 0, true);

console.log('— plain-English leads (Task #9) —');
const plainIds = STUDY_ITEMS.filter((i) => i.lesson && i.lesson.plain).map((i) => i.id);
console.log(`  ${plainIds.length} items carry a lesson.plain`);
for (const id of plainIds) {
  const it = STUDY_ITEMS.find((i) => i.id === id);
  if (!it.lesson.plain.trim()) { bad++; console.log(`FAIL  empty plain on ${id}`); }
}
const wantPlain = ['hss2011-terminology-cavities-regions','hss2011-terminology-word-parts','hss2011-terminology-regional-systemic','hss2011-joints-synovial-types','hss2011-joints-movements','hss2011-osteo-long-bone-structure','hss2011-osteo-bone-shapes','hss2011-m1-heart-wall-valves','hss2011-m3-urogenital-pelvis','hss2011-m2-brain-regions','abct2326-resp-gas-transport','abct2326-immune-adaptive','abct2326-cvs-ecg-cycle','abct2326-renal-nephron','hti17103-radiation-therapy','hti17103-radioprotection'];
for (const id of wantPlain) if (!plainIds.includes(id)) { bad++; console.log(`FAIL  missing plain on ${id}`); }

console.log('— corpus validation —');
const failCorpus = validateCorpus();
const failApps = validateApplications();
console.log(`  validateCorpus() → ${failCorpus.length} failures`);
console.log(`  validateApplications() → ${failApps.length} failures`);
if (failCorpus.length || failApps.length) { bad++; console.log(failCorpus.slice(0, 5), failApps.slice(0, 5)); }

console.log(bad === 0 ? '\nALL PASS' : `\n${bad} FAILURES`);
process.exit(bad === 0 ? 0 : 1);
