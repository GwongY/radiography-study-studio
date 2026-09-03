/*
 * Region probe — does the region filter put every bone in the right region?
 *
 * The reported failure was "the not working region filter". Measured on the
 * loaded model before the fix: 60 phalanges of the TOES classified as upper
 * limb, every carpal and tarsal and both ear ossicles classified as skull,
 * and only two meshes in the whole pelvis. Two causes, both silent:
 *
 *   - mapImportedName walked an object literal with String.includes, so
 *     'phalanx' -> 'hand' won over 'metatarsal' -> 'foot' purely on key order;
 *   - importedRegion ended in a bare `return 'skull'`, so every name no rule
 *     matched was absorbed into the cranium rather than reported.
 *
 * This lifts both classifiers straight out of outputs/studio.js and runs them
 * over the real mesh names read from the skeleton GLB, so neither can regress
 * silently.
 *
 * Usage: node work/region-probe.mjs [--list]
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REGIONS, getAnatomy } from '../outputs/anatomy-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
/*
 * Read the code that actually ships, wherever it lives today. Phase 2 moved the
 * studio block out of the HTML into studio.js; phase 5 split that into
 * studio/*.js, leaving studio.js a list of imports. Rather than name the file
 * that currently holds the classifiers, concatenate every candidate and let the
 * markers below find them — a rename or another split cannot break this, and a
 * missing marker still throws rather than passing quietly.
 */
const candidates = [
  join(root, 'outputs/radiography-study-studio.html'),
  join(root, 'outputs/studio.js'),
  ...(existsSync(join(root, 'outputs/studio'))
    ? readdirSync(join(root, 'outputs/studio')).filter((f) => f.endsWith('.js'))
      .map((f) => join(root, 'outputs/studio', f))
    : []),
];
const html = candidates.filter((p) => existsSync(p)).map((p) => readFileSync(p, 'utf8')).join('\n');

/* Take the two rule tables and their functions from the page itself, so the
   probe can never drift away from what actually ships. */
function lift(startMarker, endMarker) {
  const i = html.indexOf(startMarker);
  if (i < 0) throw new Error(`region-probe: could not find ${startMarker}`);
  const j = html.indexOf(endMarker, i);
  if (j < 0) throw new Error(`region-probe: could not find ${endMarker}`);
  return html.slice(i, j + endMarker.length);
}
const src = lift('const IMPORT_MAP=[', 'function mapImportedName(raw){')
  + html.slice(html.indexOf('function mapImportedName(raw){')).split('\n')[0].slice('function mapImportedName(raw){'.length)
  + '\n'
  + lift('const REGION_RULES=[', 'function importedRegion(raw,mapped){')
  + html.slice(html.indexOf('function importedRegion(raw,mapped){')).split('\n')[0].slice('function importedRegion(raw,mapped){'.length);

const alsoSrc = html.slice(html.indexOf('const REGION_ALSO=['),
  html.indexOf('\n  }', html.indexOf('function importedRegions(raw,mapped){')) + 4);
/* The split gave these declarations an `export` prefix; new Function() is not a
   module, so drop it. The bodies are what this probe is checking, not the
   keyword in front of them. */
const noExport = (s) => s.replace(/(^|\n)(\s*)export\s+/g, '$1$2');

const { mapImportedName, importedRegion, importedRegions } =
  new Function('getAnatomy', noExport(src) + '\n' + noExport(alsoSrc)
    + '\nreturn { mapImportedName, importedRegion, importedRegions };')(getAnatomy);

/* Every named node in the skeleton layer, straight out of the GLB. */
function namesIn(rel) {
  const buf = readFileSync(join(root, 'outputs', rel));
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`not a glb: ${rel}`);
  const json = JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString('utf8'));
  const out = new Set();
  for (const n of json.nodes || []) if (n.name && n.mesh != null) out.add(n.name);
  return [...out];
}

const names = namesIn('assets/z-anatomy-skeleton.glb');
let fail = 0;
const ok = (cond, msg) => { console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) fail++; };
const regionOf = (raw) => importedRegion(raw, mapImportedName(raw));

const placed = new Map();
const unplaced = [];
for (const raw of names) {
  const region = regionOf(raw);
  if (!region) { unplaced.push(raw); continue; }
  placed.set(region, [...(placed.get(region) || []), raw]);
}

console.log('— every mesh lands somewhere —');
ok(names.length > 250, `${names.length} named meshes in the skeleton layer`);
ok(!unplaced.length, unplaced.length
  ? `${unplaced.length} unplaced, e.g. ${unplaced.slice(0, 6).join(', ')}`
  : 'no mesh falls through to a catch-all');
ok([...placed.keys()].every((r) => REGIONS.some((x) => x.id === r)),
  `every region used is a real one (${[...placed.keys()].sort().join(', ')})`);

console.log('— the reported failure —');
const toes = names.filter((n) => /phalanx.*finger.*foot/i.test(n));
ok(toes.length > 20 && toes.every((n) => regionOf(n) === 'lower_limb'),
  `all ${toes.length} phalanges of the foot are lower limb`);
const fingers = names.filter((n) => /phalanx.*finger.*hand/i.test(n));
ok(fingers.length > 20 && fingers.every((n) => regionOf(n) === 'upper_limb'),
  `all ${fingers.length} phalanges of the hand are upper limb`);
const carpals = names.filter((n) => /^(Scaphoid|Lunate|Triquetrum|Pisiform|Trapezium|Trapezoid|Capitate|Hamate)/i.test(n));
ok(carpals.length === 16 && carpals.every((n) => regionOf(n) === 'upper_limb'),
  `all ${carpals.length} carpals are upper limb, not skull`);
const tarsals = names.filter((n) => /^(Talus|Calcaneus|Navicular|Cuboid)|cuneiform.bone/i.test(n));
ok(tarsals.length >= 12 && tarsals.every((n) => regionOf(n) === 'lower_limb'),
  `all ${tarsals.length} tarsals are lower limb, not skull`);
const ossicles = names.filter((n) => /^(Incus|Malleus|Stapes)/i.test(n));
ok(ossicles.length === 6 && ossicles.every((n) => regionOf(n) === 'skull'),
  `the ${ossicles.length} ear ossicles are head & neck`);

console.log('— spot checks across all six —');
const CASES = [
  ['Femurl', 'lower_limb'], ['Patellal', 'lower_limb'], ['Tibiar', 'lower_limb'],
  ['Fibulal', 'lower_limb'], ['Fifth_metatarsal_bonel', 'lower_limb'],
  ['Humerusl', 'upper_limb'], ['Radiusr', 'upper_limb'], ['Ulnal', 'upper_limb'],
  ['Clavicler', 'upper_limb'], ['Scapulal', 'upper_limb'], ['First_metacarpal_bonel', 'upper_limb'],
  ['Hip_bonel', 'pelvis'],
  ['Vertebra_C3', 'spine'], ['Vertebra_T7', 'spine'], ['Vertebra_L5', 'spine'],
  ['Atlas_(C1)', 'spine'], ['Sacrum', 'spine'], ['Coccyx', 'spine'],
  ['Eighth_ribl', 'thorax'], ['Costal_cartilage_of_first_ribr', 'thorax'],
  ['Body_of_sternum', 'thorax'], ['Manubrium_of_sternum', 'thorax'], ['Xiphoid_process', 'thorax'],
  ['Mandible', 'skull'], ['Frontal_bone', 'skull'], ['Vomer', 'skull'],
  ['Hyoid_bone', 'skull'], ['Thyroid_cartilage', 'skull'], ['Cricoid_cartilage', 'skull'],
  ['Upper_first_molar_toothl', 'skull'], ['Sinus_of_sphenoid_bone', 'skull'],
  ['Nasal_septal_cartilage', 'skull'],
];
for (const [raw, want] of CASES) {
  const got = regionOf(raw);
  ok(got === want, `${raw} -> ${want}${got === want ? '' : ` (got ${got})`}`);
}

console.log('— the curated mapping —');
ok(mapImportedName('Distal_phalanx_of_third_finger_of_footl') === 'foot',
  'a toe maps to the foot record, not the hand');
ok(mapImportedName('Vertebra_C5') === 'cervical', 'C5 maps to the cervical record');
ok(mapImportedName('Vertebra_T9') === 'thoracic', 'T9 maps to the thoracic record');
ok(mapImportedName('Vertebra_L2') === 'lumbar', 'L2 maps to the lumbar record');
ok(mapImportedName('Costal_cartilage_of_fifth_ribl') === 'ribs', 'costal cartilage maps to the ribs');
ok(mapImportedName('Thyroid_cartilage') === null, 'the thyroid cartilage has no curated bone record');

console.log('— bones that belong to more than one region —');
{
  const both = (raw) => importedRegions(raw, mapImportedName(raw));
  ok(both('Sacrum').join(',') === 'spine,pelvis,abdomen,back', `the sacrum is spine, pelvis, abdomen AND back (${both('Sacrum')})`);
  ok(both('Coccyx').join(',') === 'spine,pelvis,back', `the coccyx is spine, pelvis AND back (${both('Coccyx')})`);
  ok(both('Femurl').join(',') === 'lower_limb', 'an ordinary bone still has exactly one region');
  const pelvic = names.filter((n) => both(n).includes('pelvis'));
  ok(pelvic.length === 4, `the pelvic ring shows ${pelvic.length} meshes, not 2 (${pelvic.join(', ')})`);
}

/*
 * The abdomen is the one region with no bones of its own — see REGIONS in
 * anatomy-data.js. Its frame is borrowed, so it can only ever appear as a
 * SECONDARY membership, and the primary distribution below would report it as
 * empty and say nothing about whether it works. These are the bones the filter
 * shows and the bones its box is measured from, so an empty or a wildly wrong
 * count here is the failure that would otherwise reach the screen.
 */
console.log('\n— the abdomen, which borrows every bone it shows —');
{
  const inAbdomen = names.filter((n) => importedRegions(n, mapImportedName(n)).includes('abdomen'));
  const want = ['Sacrum', 'Hip bone.l', 'Twelfth rib.r', 'Vertebra L3', 'Costal cartilage of tenth rib.l'];
  for (const w of want) {
    ok(inAbdomen.includes(w), `${w} frames the abdomen`);
  }
  const wrong = ['First rib.l', 'Costal cartilage of second rib.l', 'Vertebra T4', 'Femurl', 'Coccyx'];
  for (const w of wrong) {
    ok(!inAbdomen.includes(w), `${w} does not`);
  }
  /* 5 lumbar + 1 sacrum + 2 hip bones + 12 ribs (7th-12th, both sides)
     + 8 costal cartilages (7th-10th, both sides) = 28. Spelled out because a
     count that only has to be "about right" cannot catch a rule that has
     started matching one word too many. */
  ok(inAbdomen.length === 28,
    `${inAbdomen.length} meshes frame the abdomen (expected 28 = 5 lumbar + sacrum + 2 hip bones + 12 lower ribs + 8 costal cartilages)`);
}

/*
 * The back, which is the one region defined by a measured surface rather than
 * by a box, so it is the one that can be wrong in a way names alone cannot see.
 *
 * Two questions, and the second is the one that matters:
 *   1. Do the right bones frame it? (Names. Same shape as the abdomen above.)
 *   2. Is the per-height depth profile in studio/region-boxes-how.js doing any
 *      work a single flat plane could not do? That function is thirty lines of
 *      geometry justified entirely by the claim that the vertebral column
 *      travels forward and back. If it turned out not to on this model, the
 *      honest response would be to delete the function, not to keep it -- so
 *      this measures the travel off the real GLB and fails if it is small.
 */
console.log('\n— the back, and the column it is measured from —');
{
  const inBack = names.filter((n) => importedRegions(n, mapImportedName(n)).includes('back'));
  /* C1 and C2 are exported as Atlas and Axis, not as Vertebra C1/C2 -- which
     is exactly why the REGION_ALSO pattern has to name them separately, and
     why they are the two worth asserting here. */
  for (const want of ['Atlas', 'Axis', 'Vertebra C7', 'Vertebra T6', 'Vertebra L3', 'Sacrum', 'Coccyx', 'Scapula.l'])
    ok(inBack.some((n) => n.replace(/_/g, ' ').toLowerCase().startsWith(want.toLowerCase().replace('.l', ''))),
      `${want} frames the back`);
  for (const not of ['Sternum', 'First rib.l', 'Femurl', 'Cranium'])
    ok(!inBack.some((n) => n.replace(/_/g, ' ').toLowerCase().startsWith(not.toLowerCase().replace('.l', ''))),
      `${not} does not`);
  /* 24 vertebrae + sacrum + coccyx + 2 scapulae. Spelled out for the same
     reason as the abdomen's 28: a count that only has to be about right
     cannot catch a pattern that has started matching one word too many. */
  ok(inBack.length === 28,
    `${inBack.length} meshes frame the back (expected 28 = 24 vertebrae + sacrum + coccyx + 2 scapulae)`);

  const { loadGlbMeshes } = await import('./glb-mesh.mjs');
  const meshes = loadGlbMeshes('assets/z-anatomy-skeleton.glb');
  const COLUMN = /\bvertebra|\batlas\b|\baxis\b|\bsacrum|\bcoccyx/;
  const bands = [];
  let bodyMinY = Infinity, bodyMaxY = -Infinity, bodyMinZ = Infinity, bodyMaxZ = -Infinity;
  for (const m of meshes) {
    for (let i = 0; i < m.positions.length; i += 3) {
      const y = m.positions[i + 1], z = m.positions[i + 2];
      if (y < bodyMinY) bodyMinY = y; if (y > bodyMaxY) bodyMaxY = y;
      if (z < bodyMinZ) bodyMinZ = z; if (z > bodyMaxZ) bodyMaxZ = z;
    }
    if (!COLUMN.test(m.name.replace(/_/g, ' ').toLowerCase())) continue;
    let y0 = Infinity, y1 = -Infinity, z1 = -Infinity;
    for (let i = 0; i < m.positions.length; i += 3) {
      const y = m.positions[i + 1], z = m.positions[i + 2];
      if (y < y0) y0 = y; if (y > y1) y1 = y; if (z > z1) z1 = z;
    }
    bands.push({ name: m.name, y0, y1, z: z1 });
  }
  ok(bands.length >= 26, `${bands.length} column pieces contribute a band (need every vertebra, not a handful)`);

  const front = (y) => {
    let hit = null, near = null, nearD = Infinity;
    for (const s of bands) {
      if (y >= s.y0 && y <= s.y1) { if (hit == null || s.z > hit) hit = s.z; continue; }
      const d = y < s.y0 ? s.y0 - y : y - s.y1;
      if (d < nearD) { nearD = d; near = s.z; }
    }
    return hit != null ? hit : near;
  };
  const top = Math.max(...bands.map((b) => b.y1)), bot = Math.min(...bands.map((b) => b.y0));
  const samples = [];
  for (let i = 0; i <= 40; i++) samples.push(front(bot + (top - bot) * (i / 40)));
  ok(samples.every((v) => Number.isFinite(v)), 'the profile is defined at every height of the column');

  const lo = Math.min(...samples), hi = Math.max(...samples);
  const depth = bodyMaxZ - bodyMinZ;
  const travel = (hi - lo) / depth;
  console.log(`  column front sweeps z ${lo.toFixed(3)} .. ${hi.toFixed(3)} — ${(travel * 100).toFixed(1)}% of the body's depth`);
  /*
   * The threshold is the point below which a flat plane would be honest. A
   * body's front-to-back depth is roughly a fifth of its height, so 8% of that
   * depth is around two centimetres of travel -- more than a boundary drawn
   * for the lumbar spine could absorb at the neck.
   */
  ok(travel > 0.08, `the column travels ${(travel * 100).toFixed(1)}% of body depth, so a per-height profile earns its keep (a flat plane would not)`);

  /*
   * Now run the rule over the muscles, which is where it either works or
   * embarrasses itself. Same centroid test as applyVisibility: a mesh is in
   * the back when its centre is at or behind the front of the column at the
   * centre's own height. (The box test is not repeated here -- this block is
   * about the DEPTH rule, which is the part with no precedent in the file.)
   */
  const muscles = loadGlbMeshes('assets/kas.glb');
  const centreOf = (m) => { let y = 0, z = 0, n = 0;
    for (let i = 0; i < m.positions.length; i += 3) { y += m.positions[i + 1]; z += m.positions[i + 2]; n++; }
    return { y: y / n, z: z / n }; };
  const inBackByDepth = (m) => { const c = centreOf(m), f = front(c.y); return f != null && c.z <= f; };
  const one = (re) => muscles.find((m) => re.test(m.name.replace(/_/g, ' ')));
  for (const [label, re] of [
    ['erector spinae (iliocostalis)', /^Iliocostalis thoracis/], ['multifidus', /^Multifidus thoracis/],
    ['splenius capitis', /^Splenius capitis/], ['semispinalis', /^Semispinalis thoracis/],
    ['latissimus dorsi', /^Latissimus dorsi/], ['trapezius', /^Descending part of trapezius/],
    ['rhomboid major', /^Rhomboid major/], ['serratus posterior inferior', /^Serratus posterior inferior/],
  ]) ok(inBackByDepth(one(re)), `${label} is in the back`);
  for (const [label, re] of [
    ['rectus abdominis', /^Rectus abdominis/], ['pectoralis minor', /^Pectoralis minor/],
    ['sternocleidomastoid', /^Sternocleidomastoid/], ['scalenus anterior', /^Scalenus anterior/],
    ['omohyoid', /^Omohyoid/], ['lateral crico-arytenoid', /^Lateral crico-arytenoid/],
  ]) ok(!inBackByDepth(one(re)), `${label} is not`);

  /*
   * Where the rule and the textbook part company, written down rather than
   * hidden.
   *
   * These six sit BEHIND the front of the cervical column and so the rule
   * admits them, but a textbook files them under the neck: the prevertebral
   * muscles lie on the front of the bodies, the posterior scalenes take the
   * posterior tubercles of the transverse processes, and the posterior
   * crico-arytenoid is on the back of the cricoid a centimetre off the spine.
   * The rule is not wrong about the geometry -- they really are posterior to
   * that line -- it is that "the back" is a chapter heading as well as a
   * space, and the two do not coincide in the neck.
   *
   * Kept as a rule with a stated exception list rather than fixed by naming
   * muscles in the app: a hand-maintained list of what counts as back would
   * be a claim about the course with nothing behind it, and this file exists
   * to stop exactly that. Asserted so that a future change to the profile is
   * reported here rather than discovered on screen.
   */
  const CERVICAL_STRAYS = [/^Longus colli/, /^Longus capitis/, /^Rectus anterior capitis/,
    /^Scalenus medius/, /^Scalenus posterior/, /^Posterior crico-arytenoid/];
  const strays = CERVICAL_STRAYS.filter((re) => inBackByDepth(one(re)));
  ok(strays.length === CERVICAL_STRAYS.length,
    `the ${CERVICAL_STRAYS.length} known cervical inclusions are all still included — the exception list matches the code`);
}

console.log('\n— distribution, by PRIMARY region —');
for (const r of REGIONS) {
  const n = (placed.get(r.id) || []).length;
  const also = names.filter((x) => importedRegions(x, mapImportedName(x)).includes(r.id)).length;
  console.log(`  ${r.label.padEnd(18)} ${String(n).padStart(4)}${also !== n ? `   (${also} counting the bones it borrows)` : ''}`);
}
if (process.argv.includes('--list')) {
  for (const r of REGIONS) console.log(`\n${r.label}:\n  ${(placed.get(r.id) || []).join('\n  ')}`);
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
