/*
 * Build outputs/mesh-index.js — the searchable name index for every mesh in
 * every GLB layer.
 *
 * WHY THIS EXISTS
 *
 * Search used to cover only the curated lists: ANATOMY_DATABASE (20 bone
 * records), SEARCH_EXTRAS (~30 hand-written entries) and BODY_CONCEPTS. The
 * model itself carries ~2,900 named meshes, so the overwhelming majority of
 * what the viewer can actually show could not be found by typing its name.
 * "Pharynx" returned nothing while `Pharynx.j`, `Nasopharynx`, `Oropharynx`
 * and `Laryngopharynx` all sat in the organs layer.
 *
 * The layers are lazy-loaded (~39 MB total), so the index cannot be built in
 * the browser — reading it would mean downloading every layer up front. It is
 * generated here instead and shipped as a small data module.
 *
 * WHAT IT COLLAPSES
 *
 * One entry per structure, not per mesh:
 *   Kidney.l / Kidney.r                  -> "Kidney", sides both
 *   Parotid gland / .l / .r / .001       -> "Parotid gland"
 * See work/lib/mesh-names.mjs for that pass.
 *
 * STUDY DEPTH — WHICH NAMES YOU ARE ASKED TO KNOW
 *
 * 1,687 structures is not a vocabulary list; it is an atlas. Tier 0 is what
 * the course names, and therefore what to memorise. Tier 1 is everything
 * finer, which the search folds into one row per family rather than listing.
 *
 * The tier used to be decided by a hand-written regex of "detail" words
 * (\bsegmental\b, \bbranch of\b, …). That was this repo guessing at the
 * syllabus — the exact thing the source-traceability rule forbids — and it was
 * wrong in both directions: it kept 1,488 rows at course level, including
 * every ligament and lymph node no lecture mentions.
 *
 * It is now read from work/course-terms.json, which work/build-course-terms.mjs
 * derives from the HSS2011 and ABCT2326 teaching and assessment material on
 * the shared drive. Each tier-0 row carries the file that names it, so the app
 * shows provenance instead of asserting importance.
 *
 * Usage: node work/build-mesh-index.mjs      (rebuild course-terms.json first
 *        with `node work/build-course-terms.mjs` if the sources have changed)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectStructures, LAYERS, OUTPUTS } from './lib/mesh-names.mjs';

const WORK = dirname(fileURLToPath(import.meta.url));

const termsPath = join(WORK, 'course-terms.json');
if (!existsSync(termsPath)) {
  console.error('work/course-terms.json is missing. Run: node work/build-course-terms.mjs');
  process.exit(2);
}
const TERMS = JSON.parse(readFileSync(termsPath, 'utf8'));

const { rows, rawTotal, dropped } = collectStructures();

/* ------------------------------------------------------------------ *
 * Families — what a structure below course level is grouped under
 *
 * A tier-1 row is not listed on its own; it joins a family, and the family is
 * one row in the search that opens all of its members together. The label has
 * to name something the student recognises, so it is derived from the atlas
 * name rather than invented.
 * ------------------------------------------------------------------ */

/* bronchus -> bronchi, artery -> arteries, and so on */
const PLURAL = { bronchus: 'bronchi', artery: 'arteries', vein: 'veins', nerve: 'nerves',
  ramus: 'rami', nucleus: 'nuclei', segment: 'segments', leaflet: 'leaflets',
  branch: 'branches', branches: 'branches', part: 'parts', head: 'heads',
  belly: 'bellies', muscle: 'muscles', node: 'nodes', tributary: 'tributaries',
  phalanx: 'phalanges', tooth: 'teeth', rib: 'ribs', bone: 'bones', gyrus: 'gyri',
  sulcus: 'sulci', fasciculus: 'fasciculi', ganglion: 'ganglia', bursa: 'bursae',
  plexus: 'plexuses', arch: 'arches', sinus: 'sinuses', trunk: 'trunks',
  ligament: 'ligaments', capsule: 'capsules', cartilage: 'cartilages',
  disc: 'discs', membrane: 'membranes', vertebra: 'vertebrae', lobe: 'lobes',
  septum: 'septa', fossa: 'fossae', canal: 'canals', duct: 'ducts',
  meniscus: 'menisci', tarsus: 'tarsi', retinaculum: 'retinacula',
  lobule: 'lobules', tract: 'tracts', body: 'bodies', valve: 'valves',
  gland: 'glands', concha: 'conchae', ala: 'alae' };
const plural = (w) => PLURAL[w] || (/(s|x|ch|sh)$/.test(w) ? w + 'es'
  : /[^aeiou]y$/.test(w) ? w.slice(0, -1) + 'ies' : w + 's');
const cap = (s) => s.replace(/^./, (c) => c.toUpperCase());

/*
 * Words that say WHERE a structure is, or WHICH of a set it is, but not what
 * kind of thing it is. Dropping them is what turns eleven separately named
 * ribs into "Ribs" and four pancreaticoduodenal arteries into one row.
 */
const POSITIONAL = new Set(('anterior posterior superior inferior medial lateral left right '
  + 'deep superficial internal external common accessory great greater lesser small middle '
  + 'proximal distal ascending descending transverse upper lower anteroinferior anterosuperior '
  + 'posteroinferior posterosuperior anterolateral anteromedial posterolateral posteromedial '
  + 'dorsal ventral first second third fourth fifth sixth seventh eighth ninth tenth eleventh '
  + 'twelfth apical basal segmental subsegmental terminal short long central peripheral '
  + 'intermediate cranial caudal rostral').split(' '));

const ORDINAL = /^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)$/;

/*
 * Partitive heads: words meaning "a piece of", where the pieces together ARE
 * the whole. A "part of the deltoid" is deltoid; a "branch of the ulnar nerve"
 * is not the ulnar nerve.
 */
const PARTITIVE = new Set(['part', 'parts', 'head', 'heads', 'belly', 'bellies',
  'leaflet', 'leaflets', 'cusp', 'cusps', 'layer', 'layers']);

/*
 * The one case the name cannot supply.
 *
 * The aortic valve's cusps are named "Left coronary leaflet", "Right coronary
 * leaflet" and "Non-coronary leaflet" — correct anatomy, but none of them says
 * which valve, so the derived family came out as the bare word "Leaflets".
 * The pulmonary valve's three say so in their own names and need no help.
 */
const OVERRIDES = { 'circulatory|Coronary leaflets': 'Aortic valve',
  'circulatory|Non-coronary leaflets': 'Aortic valve' };

const strip = (words) => { const o = words.filter((w) => !POSITIONAL.has(w)); return o.length ? o : words; };

/* Words that are already plural must not be pluralised again -- "Axillary
   nodes" became "Axillary nodeses" and "Orbital gyri" became "Orbital gyris". */
const PLURALS = new Set(Object.values(PLURAL));
function pluralise(w) {
  if (PLURALS.has(w)) return w;
  if (/s$/.test(w) && !/(us|ss|is)$/.test(w)) return w;
  /* Latin -i plurals: minimi, proprii, gyri. "Abductor digiti minimi of hand"
     and "... of foot" are one muscle in two places, not "minimis". */
  if (/[a-z]{3}i$/.test(w)) return w;
  return plural(w);
}
/* Latin phrases where the noun, not the trailing adjective, takes the plural. */
const PHRASE = { 'fasciculus proprius': 'Fasciculi proprii' };
function pluralPhrase(words) {
  const key = words.join(' ');
  if (PHRASE[key]) return PHRASE[key];
  return cap([...words.slice(0, -1), pluralise(words[words.length - 1])].join(' '));
}

function familyOf(name, exists) {
  const s = name.replace(/\*/g, '').replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  const i = s.toLowerCase().lastIndexOf(' of ');
  if (i < 0) {
    /*
     * No "of": the family is the name with its positional words removed, so
     * "Fifth rib" and "Eleventh rib" meet at "Ribs", and the anterior and
     * posterior ethmoidal arteries meet at "Ethmoidal arteries".
     */
    return { label: pluralPhrase(strip(s.toLowerCase().split(' '))) };
  }
  const tail = s.slice(i + 4).trim();
  const head = s.slice(0, i).trim().toLowerCase();
  const headWords = head.split(' ');
  const last = headWords[headWords.length - 1];
  /*
   * When the pieces are partitive AND the whole has no mesh of its own, the
   * family simply IS the whole and takes its name: the deltoid is modelled
   * only as three "parts", so selecting them is selecting the deltoid, and
   * "Parts of deltoid muscle" names a thing nobody is asked to identify.
   *
   * When the whole DOES exist separately -- the liver beside its eight
   * segments, the ulnar nerve beside its branches -- the family has to stay
   * distinguishable from it, so it keeps the "<pieces> of <whole>" form.
   */
  if (PARTITIVE.has(last) && !exists.has(tail.toLowerCase())) return { label: cap(tail) };
  /*
   * The head keeps its WHOLE noun phrase, not just its final noun. Collapsing
   * on the final noun alone merged things that are not one thing: the abductor
   * and the flexor of digiti minimi both end in "minimi" and came out as a
   * family called "Minimis of foot".
   *
   * Only the head's own first phrase counts, so "Distal phalanx of fifth
   * finger of foot" is a phalanx of the foot rather than a finger of it.
   */
  const hw = strip(head.split(' of ')[0].split(' '));
  const tw = tail.toLowerCase().split(' ').filter((w) => !ORDINAL.test(w));
  const tidy = (tw.length ? tw : tail.toLowerCase().split(' ')).join(' ')
    .replace(/^(finger|toe)s? of /, '');
  const label = pluralPhrase(hw);
  /* "Costal cartilages of rib" says nothing "Costal cartilages" does not. */
  if (hw.length >= 2 && tidy.split(' ').length <= 1) return { label };
  const the = /^(left|right)\b/.test(tidy) ? 'the ' : '';
  return { label: `${label} of ${the}${tidy}` };
}

/* ------------------------------------------------------------------ *
 * Tier, family and provenance
 * ------------------------------------------------------------------ */

const famList = [];
const famIndex = new Map();
const existing = new Set(rows.map((r) => r.name.toLowerCase()));

for (const r of rows) {
  const hit = TERMS.named[r.layer + '|' + r.name];
  if (hit) { r.tier = 0; r.fam = -1; r.src = hit[0]; r.evidence = hit[1]; continue; }
  r.tier = 1; r.src = -1; r.evidence = '';
  let { label } = familyOf(r.name, existing);
  label = OVERRIDES[r.layer + '|' + label] || label;
  const k = r.layer + '|' + label.toLowerCase();
  if (!famIndex.has(k)) { famIndex.set(k, famList.length); famList.push([label, r.layer]); }
  r.fam = famIndex.get(k);
}

/*
 * A family of one is not a family.
 *
 * "Ligament of head of femur" is the only "head of femur" there is, so it was
 * grouping into a family called "Heads of femur" — a row offering one item
 * under a name for a thing the row is not. Singletons keep tier 1 (they are
 * still finer than the course goes) but lose the family; the search collects
 * them into one "beyond your course" row per layer instead.
 */
{
  const size = new Map();
  for (const r of rows) if (r.fam >= 0) size.set(r.fam, (size.get(r.fam) || 0) + 1);
  for (const r of rows) if (r.fam >= 0 && size.get(r.fam) < 2) r.fam = -1;
}

/* Re-pack the family table so it holds only families that survived. */
{
  const used = new Map();
  const kept = [];
  for (const r of rows) {
    if (r.fam < 0) continue;
    if (!used.has(r.fam)) { used.set(r.fam, kept.length); kept.push(famList[r.fam]); }
    r.fam = used.get(r.fam);
  }
  famList.length = 0;
  famList.push(...kept);
}

/* Likewise the source table: only the files that actually name something. */
const srcList = [];
{
  const used = new Map();
  for (const r of rows) {
    if (r.src < 0) continue;
    if (!used.has(r.src)) { used.set(r.src, srcList.length); srcList.push(TERMS.sources[r.src]); }
    r.src = used.get(r.src);
  }
}

/* ------------------------------------------------------------------ *
 * Emit
 * ------------------------------------------------------------------ */

const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const EVIDENCE = ['', 'listed', 'named', 'described', 'mirrored'];

const body = rows.map((r) => {
  const sides = r.sides.size === 2 ? 'b' : r.sides.size === 1 ? [...r.sides][0] : '';
  const mesh = r.mesh === r.name ? '' : r.mesh;
  return `[${lit(r.name)},${lit(r.layer)},${lit(mesh)},${lit(sides)},${r.tier},${r.fam},${r.src},${EVIDENCE.indexOf(r.evidence || '')}]`;
}).join(',\n');

const famBody = famList.map(([label, layer]) => `[${lit(label)},${lit(layer)}]`).join(',\n');
const srcBody = srcList.map((s) => `[${lit(s.file)},${lit(s.subject)}]`).join(',\n');

const t0 = rows.filter((r) => r.tier === 0).length;
const t1 = rows.length - t0;
const grouped = rows.filter((r) => r.fam >= 0).length;

const out = `/*
 * Mesh name index — GENERATED, do not edit by hand.
 *
 * Run \`node work/build-mesh-index.mjs\` to rebuild from the GLB files plus
 * work/course-terms.json (itself rebuilt by work/build-course-terms.mjs from
 * the course material on the shared drive).
 *
 * One row per named structure per layer, collapsed across side letters and
 * Blender duplicate suffixes, so global search can reach every structure the
 * model actually contains rather than only the ~50 curated records.
 *
 * Row shape: [displayName, layerKey, meshName, sides, tier, family, source, evidence]
 *   meshName  '' when identical to displayName
 *   sides     'b' both, 'l', 'r', or '' for unpaired
 *   tier      0 = the course names it, so the name is worth learning
 *             1 = finer than the course goes; grouped rather than listed
 *   family    index into FAMILIES for grouped tier-1 rows, -1 otherwise
 *   source    index into SOURCES for tier-0 rows, -1 otherwise
 *   evidence  index into EVIDENCE: how that source names it
 *
 * ${rows.length} structures from ${rawTotal} raw mesh names across ${LAYERS.length} layers.
 * ${t0} are named by the course material and carry the file that names them;
 * the other ${t1} are beyond it — ${grouped} of those group into ${famList.length} families
 * and the remaining ${t1 - grouped} are one of a kind, collected per layer by the search.
 * ${dropped.length} degenerate node(s) dropped: ${dropped.join(', ') || 'none'}.
 */

/* The taught and assessed files that name at least one modelled structure. */
const SOURCES = [
${srcBody}
];

/* How a source names a structure. 'listed' is the examinable glossary, which
   is the course's own statement of which names are examinable; 'named' is the
   exact name in a lecture, exercise or paper; 'described' is all of its words
   together in one sentence of one — which is how the notes say "the right lung
   is divided into superior, middle and inferior lobes"; 'mirrored' is the same
   structure on the other side of a body that is symmetrical about it. */
const EVIDENCE = ${JSON.stringify(EVIDENCE)};

const FAMILIES = [
${famBody}
];

const ROWS = [
${body}
];

export const MESH_INDEX = ROWS.map(([name, layer, mesh, sides, tier, fam, src, ev]) => ({
  name, layer, mesh: mesh || name, sides, tier,
  family: fam < 0 ? null : FAMILIES[fam][0],
  familyId: fam < 0 ? null : fam,
  source: src < 0 ? null
    : { file: SOURCES[src][0], subject: SOURCES[src][1], evidence: EVIDENCE[ev] || 'named' },
}));

export default MESH_INDEX;
`;

writeFileSync(join(OUTPUTS, 'mesh-index.js'), out);
console.log(`mesh-index.js: ${rows.length} structures from ${rawTotal} raw names`);
for (const [layer] of LAYERS) {
  const n = rows.filter((r) => r.layer === layer);
  console.log(`  ${layer.padEnd(12)} ${String(n.length).padStart(4)} structures, `
    + `${String(n.filter((r) => r.tier === 0).length).padStart(4)} named by the course`);
}
console.log(`  ${'families'.padEnd(12)} ${String(famList.length).padStart(4)} covering ${grouped} rows; `
  + `${t1 - grouped} one-of-a-kind rows beyond the course`);
console.log(`  ${'sources'.padEnd(12)} ${String(srcList.length).padStart(4)} files name at least one structure`);
if (dropped.length) console.log(`  dropped degenerate: ${dropped.join(', ')}`);
