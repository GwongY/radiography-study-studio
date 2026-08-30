/*
 * Search probe — does typing a structure's name find it?
 *
 * The reported failure was that "pharynx" and "larynx" returned nothing while
 * the organs layer carried Pharynx, Nasopharynx, Oropharynx and Laryngopharynx.
 * The cause was that search only ever looked at the curated lists (~50
 * structures) and never at the 1,688 the model actually contains.
 *
 * This runs the same index + synonym expansion the page runs, outside the
 * browser, so the regression cannot come back silently.
 *
 * Usage: node work/search-probe.mjs [extra query ...]
 */
import { MESH_INDEX } from '../outputs/mesh-index.js';
import { expandQuery, missingFor, compositeFor, NOT_MODELLED, COMPOSITES } from '../outputs/synonyms.js';
import { SEARCH_EXTRAS } from '../outputs/bodymap.js';
import { ANATOMY_DATABASE } from '../outputs/anatomy-data.js';

let fail = 0;
const ok = (cond, msg) => { console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) fail++; };

/* The matcher the page uses, reproduced exactly — gap row included, because
   that row is a real hit on the page and not finding it here would be the
   probe modelling the page wrong. */
function hitsFor(q) {
  const terms = expandQuery(q);
  const match = (hay) => terms.some((t) => hay.includes(t));
  const out = [];
  const gap = missingFor(q);
  if (gap) out.push(gap.near);
  const comp = compositeFor(q);
  if (comp) out.push(comp.parts[0][1]);
  for (const r of ANATOMY_DATABASE) {
    if (match([r.canonicalName, ...r.aliases, r.region].join(' ').toLowerCase())) out.push(r.canonicalName);
  }
  for (const x of SEARCH_EXTRAS) {
    if (match((x.name + ' ' + (x.aliases || []).join(' ') + ' ' + x.system).toLowerCase())) out.push(x.name);
  }
  for (const m of MESH_INDEX) {
    if (match(m.name.toLowerCase())) out.push(m.name);
  }
  return [...new Set(out)];
}

console.log(`— index —`);
ok(MESH_INDEX.length > 1200, `${MESH_INDEX.length} structures indexed`);
ok(MESH_INDEX.every((m) => m.name && m.layer && m.mesh), 'every row has name, layer and mesh');
ok(!MESH_INDEX.some((m) => /\.\d{3}$/.test(m.name)), 'no Blender duplicate suffix survived into a display name');
ok(!MESH_INDEX.some((m) => /^(Mesh|Circle|Cube)$/i.test(m.name)), 'no modelling artefacts indexed');
{
  const layers = new Set(MESH_INDEX.map((m) => m.layer));
  ok(layers.size === 7, `all seven layers present (${[...layers].sort().join(', ')})`);
}

console.log(`— the reported failure —`);
{
  const p = hitsFor('pharynx');
  ok(p.includes('Pharynx'), `"pharynx" finds Pharynx`);
  ok(p.includes('Nasopharynx') && p.includes('Oropharynx') && p.includes('Laryngopharynx'),
    `"pharynx" finds all three named parts (${p.filter((n) => /pharynx$/i.test(n)).length} pharynx meshes)`);
  ok(hitsFor('throat').includes('Pharynx'), `"throat" finds Pharynx via synonym`);
}
{
  /* The larynx has no mesh of its own but IS modelled, as its cartilages. An
     earlier draft claimed it was absent; this is the assertion that would have
     caught that, so it checks the claim in both directions. */
  const l = hitsFor('larynx');
  ok(!missingFor('larynx'), `"larynx" is NOT claimed to be missing — its cartilages are loaded`);
  ok(!!compositeFor('larynx'), `"larynx" resolves to a composite`);
  ok(l.includes('Thyroid cartilage') && l.includes('Cricoid cartilage'),
    `"larynx" surfaces the laryngeal cartilages`);
  ok(!!compositeFor('voice box'), `"voice box" reaches the same composite`);
  ok(hitsFor('eye').includes('Retina'), `"eye" reaches the eyeball's parts`);
  ok(hitsFor('ossicles').includes('Stapes'), `"ossicles" reaches the ear bones`);
  ok(hitsFor('thymus').includes('Left lobe of thymus'), `"thymus" finds the thymus`);
}

console.log(`— multiple names for one thing —`);
const PAIRS = [
  ['collarbone', 'Clavicle'], ['kneecap', 'Patella'], ['breastbone', 'Sternum'],
  ['tailbone', 'Coccyx'], ['shoulder blade', 'Scapula'], ['thigh bone', 'Femur'],
  ['windpipe', 'Trachea'], ['esophagus', 'Oesophagus'], ['gullet', 'Oesophagus'],
  ['adrenal gland', 'Suprarenal gland'], ['vas deferens', 'Ductus deferens'],
  ['appendix', 'Vermiform appendix'], ['gall bladder', 'Gallbladder'],
  ['achilles tendon', 'Calcaneal tendon'],
  /* the valves are modelled as separate leaflets, never as one valve mesh --
     finding a leaflet IS finding the valve here */
  ['mitral valve', 'Posterior leaflet of left atrioventricular valve'],
  ['tricuspid valve', 'Septal leaflet of right atrioventricular valve'],
  ['cranial nerve x', 'Vagus nerve (X)'], ['tenth cranial nerve', 'Vagus nerve (X)'],
  ['posterior pituitary', 'Neurohypophysis'],
  /* the model is male; the gap note is the correct answer, not a mesh */
  ['fallopian tube', 'Urinary bladder'],
];
for (const [q, want] of PAIRS) {
  const got = hitsFor(q);
  const hit = got.some((n) => n.toLowerCase() === want.toLowerCase());
  ok(hit, `"${q}" finds ${want}${hit ? '' : ` (got: ${got.slice(0, 4).join(', ') || 'nothing'})`}`);
}

console.log(`— expansion stays narrow —`);
ok(expandQuery('ren').length === 1, `a 3-letter fragment does not pull in whole synonym groups`);
ok(!hitsFor('rib').includes('Cribriform plate'), `"rib" does not match by accident inside another word group`);
{
  const k = hitsFor('kidney');
  ok(k.includes('Kidney'), `"kidney" finds Kidney`);
  ok(k.length < 60, `"kidney" stays focused (${k.length} hits, not every renal vessel)`);
}

console.log(`— composites point at real meshes —`);
for (const row of COMPOSITES) {
  for (const [layer, mesh] of row.parts) {
    const exists = MESH_INDEX.some((m) => m.name === mesh && m.layer === layer);
    ok(exists, `${row.name}: ${mesh} exists in the ${layer} layer`);
  }
}

console.log(`— gap notes are usable, and honest —`);
for (const row of NOT_MODELLED) {
  const exists = MESH_INDEX.some((m) => m.name === row.near && m.layer === row.layer);
  ok(exists, `"${row.term}" points at ${row.near}, which exists in the ${row.layer} layer`);
  /*
   * The claim "not modelled" must be TRUE. An earlier list asserted the
   * larynx, eye, ear and thymus were all absent; every one was wrong, and a
   * false absence is worse than no answer because the student stops looking.
   * So: no term on this list may name a mesh that actually exists.
   */
  const contradicted = [row.term, ...row.also].filter((t) =>
    MESH_INDEX.some((m) => m.name.toLowerCase() === t));
  ok(!contradicted.length,
    `"${row.term}" really is absent${contradicted.length ? ` — but ${contradicted.join(', ')} IS in the index` : ''}`);
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
