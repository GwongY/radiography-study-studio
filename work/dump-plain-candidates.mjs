import { STUDY_ITEMS } from '../outputs/study-data.js';
const want = new Set([
  'hss2011-terminology-cavities-regions',
  'hss2011-terminology-word-parts',
  'hss2011-terminology-regional-systemic',
  'hss2011-joints-synovial-types',
  'hss2011-joints-movements',
  'hss2011-osteo-long-bone-structure',
  'hss2011-osteo-bone-shapes',
  'hss2011-m1-heart-wall-valves',
  'hss2011-m3-urogenital-pelvis',
  'hss2011-m2-brain-regions',
  'abct2326-resp-gas-transport',
  'abct2326-immune-adaptive',
  'abct2326-cvs-ecg-cycle',
  'abct2326-renal-nephron',
  'hti17103-radiation-therapy',
  'hti17103-radioprotection',
]);
for (const it of STUDY_ITEMS) {
  if (!want.has(it.id)) continue;
  console.log('##### ' + it.id + ' — ' + it.title);
  console.log(it.lesson.explanation);
  console.log();
}
