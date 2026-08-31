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
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
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
  /*
   * There is no mesh called "Pharynx" and there should not be. The organs
   * layer carried a node called `Pharynx.j` which was a zero-height sliver,
   * not anatomy — it won the name and framed an invisible nothing in the
   * neck. The generator drops degenerate nodes; the whole is a composite of
   * the three real floors.
   */
  ok(!MESH_INDEX.some((m) => m.name === 'Pharynx'),
    `the degenerate "Pharynx" node is not in the index`);
  ok(!!compositeFor('pharynx'), `"pharynx" resolves to a composite`);
  ok(p.includes('Nasopharynx') && p.includes('Oropharynx') && p.includes('Laryngopharynx'),
    `"pharynx" finds all three named parts`);
  ok(hitsFor('throat').includes('Nasopharynx'), `"throat" reaches the pharynx via synonym`);
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

/*
 * Names in the GLB are not the names in the scene.
 *
 * three.js runs every node name through PropertyBinding.sanitizeNodeName on
 * import: whitespace becomes '_', and `[ ] . : /` are deleted outright. The
 * viewer's normName then turns '.' into a space -- so the catalogue's
 * `Pharynx.j` read as "pharynx j" while the loaded mesh read as "pharynxj",
 * and clicking the Pharynx search result reported "could not locate that
 * structure" for a mesh that was loaded and visible.
 *
 * meshesFor() in the page now has a tight pass that strips both sides to
 * letters and digits. This checks every row in the index survives it.
 */
const sanitize = (n) => n.replace(/\s/g, '_').replace(/[[\]./:]/g, '');
const normName = (v) => String(v || '').toLowerCase().replace(/[()'’]/g, '')
  .replace(/[_\-.,]+/g, ' ').replace(/\s+/g, ' ').trim();
const tight = (s) => normName(s).replace(/[^a-z0-9]/g, '');

console.log(`— catalogue names survive the loader's mangling —`);
{
  const broken = [];
  for (const m of MESH_INDEX) {
    const loaded = sanitize(m.mesh);            /* what the scene will call it */
    const w = tight(m.mesh), t = tight(loaded);
    /* the page tries: exact, tight-exact (+side letter), startsWith, tight-startsWith */
    const found = normName(loaded) === normName(m.mesh)
      || t === w || t === w + 'l' || t === w + 'r'
      || normName(loaded).startsWith(normName(m.mesh)) || t.startsWith(w);
    if (!found) broken.push(`${m.layer}:${m.mesh} -> ${loaded}`);
  }
  ok(!broken.length, broken.length
    ? `${broken.length} index rows cannot be resolved after import, e.g. ${broken.slice(0, 3).join('; ')}`
    : `all ${MESH_INDEX.length} index rows resolve after sanitizeNodeName`);
  /* every row whose GLB name the loader actually alters */
  const mangled = MESH_INDEX.filter((m) => sanitize(m.mesh) !== m.mesh);
  ok(mangled.every((m) => tight(sanitize(m.mesh)).startsWith(tight(m.mesh))
    || tight(sanitize(m.mesh)) === tight(m.mesh) + 'l' || tight(sanitize(m.mesh)) === tight(m.mesh) + 'r'),
    `all ${mangled.length} rows the loader renames still match (e.g. ${mangled[0] ? mangled[0].mesh + ' -> ' + sanitize(mangled[0].mesh) : 'none'})`);
}

console.log(`\u2014 study depth is read from the sources, not guessed \u2014`);
{
  const t0 = MESH_INDEX.filter((m) => m.tier === 0);
  const t1 = MESH_INDEX.filter((m) => m.tier === 1);
  ok(t0.length > 400 && t0.length < MESH_INDEX.length * 0.5,
    `${t0.length} of ${MESH_INDEX.length} structures are named by the course material`);
  ok(t0.every((m) => m.source && m.source.file),
    'every course-level row names the file that names it');
  ok(t1.every((m) => !m.source), 'no row beyond the course claims a source');
  ok(t0.every((m) => ['listed', 'named', 'described', 'mirrored', 'series'].includes(m.source.evidence)),
    'every source carries how it names the structure');
  /*
   * The tier used to come from a hand-written regex of "detail" words in this
   * repo. That is the syllabus guessing this app was told not to do, and it
   * left 1,488 of 1,687 rows at course level -- every lymph node, every
   * ligament, every named sulcus. The tier now comes from
   * work/course-terms.json, built from the HSS2011 / ABCT2326 material.
   */
  const gloss = t0.filter((m) => m.source.evidence === 'listed');
  ok(gloss.length > 200, `${gloss.length} rows are in the examinable glossary itself`);

  /* What the course does name stays visible, one row each. */
  for (const n of ['Liver', 'Stomach', 'Trachea', 'Kidney', 'Urinary bladder',
    'Thyroid cartilage', 'Femur', 'Scapula', 'Oesophagus', 'Body of sternum', 'Diaphragm']) {
    const r = MESH_INDEX.find((m) => m.name === n);
    if (!r) { ok(false, `${n} is missing from the index`); continue; }
    ok(r.tier === 0, `${n} is named by the course (${r.source ? r.source.evidence : 'NOT'})`);
  }
  /*
   * The lung lobes are the point of a chest film and the notes give them as
   * "the right lung is divided into superior, middle and inferior lobes" --
   * never as the atlas's "Superior lobe of right lung". Phrase matching alone
   * lost all five; proximity matching is why they are back.
   */
  const lobes = MESH_INDEX.filter((m) => /lobe of (left|right) lung/i.test(m.name));
  ok(lobes.length === 5 && lobes.every((m) => m.tier === 0),
    `all ${lobes.length} lung lobes are at course level`);
  ok(lobes.every((m) => ['described', 'mirrored'].includes(m.source.evidence)),
    'and they got there by being described in place, or mirrored from the other side');

  /*
   * The thoracic vertebrae come in by series, and nothing else does.
   *
   * Six of the twelve are named one by one across six different documents,
   * which is a course teaching the thoracic vertebrae rather than six of
   * them. The bar that admits them (three named, and a quarter of the set)
   * has to stay high enough to leave the ribs alone: two of the twelve are
   * named, and two is not a pattern.
   */
  const tv = MESH_INDEX.filter((m) => /^Vertebra T\d+$/.test(m.name));
  ok(tv.length === 12 && tv.every((m) => m.tier === 0),
    `all ${tv.length} thoracic vertebrae are at course level`);
  ok(tv.filter((m) => m.source.evidence === 'series').length === 6,
    'six of them by their siblings, six named outright');
  ok(MESH_INDEX.filter((m) => m.source && m.source.evidence === 'series').length === 7,
    'and the series pass admits nothing else but Vertebra L4');

  /* What it does not name is grouped away. */
  const seg = MESH_INDEX.filter((m) => /segmental bronchus/i.test(m.name));
  ok(seg.length > 15 && seg.every((m) => m.tier === 1),
    `all ${seg.length} segmental bronchi are folded away`);
  ok(MESH_INDEX.find((m) => m.name === 'First rib').tier === 0,
    'the first rib, which the glossary lists, stays on its own');

  console.log(`       sources: ${new Set(t0.map((m) => m.source.file)).size} files name at least one structure`);
}

console.log(`${'\u2014'} every structure resolves to something a tap can select ${'\u2014'}`);
{
  /*
   * The reported failure: 186 of 419 vessels are named by the course and all
   * 419 were separately selectable, so tapping the wrist answered "Dorsal
   * scaphotriquetral ligament". Every row now belongs to a unit, and the unit
   * is what the viewer selects.
   */
  ok(MESH_INDEX.every((m) => m.unit && m.unitId >= 0), 'every row has a unit');
  ok(MESH_INDEX.every((m) => ['course', 'group', 'lone'].includes(m.unitKind)),
    'and every unit is course-named, a group, or one of a kind');
  ok(UNITS.length < MESH_INDEX.length / 2,
    `${MESH_INDEX.length} structures resolve to ${UNITS.length} units`);

  const byId = new Map(UNITS.map((u) => [u.id, u]));
  ok(MESH_INDEX.every((m) => byId.get(m.unitId) && byId.get(m.unitId).label === m.unit),
    'the row and the unit table agree on the label');
  ok(MESH_INDEX.every((m) => byId.get(m.unitId).layer === m.layer),
    'a unit never spans two layers -- the viewer keys ids by layer');

  /* Course-named structures keep their own name and their own unit. */
  const t0 = MESH_INDEX.filter((m) => m.tier === 0);
  ok(t0.every((m) => m.unitKind === 'course' && m.unit === m.name),
    'no course-named structure is grouped away under another name');
  ok(UNITS.filter((u) => u.kind === 'course').length === t0.length,
    `${t0.length} course-named structures, ${t0.length} course units`);

  /* A group is a group: at least two of something, or named after a whole. */
  const sized = new Map();
  MESH_INDEX.forEach((m) => sized.set(m.unitId, (sized.get(m.unitId) || 0) + 1));
  ok(UNITS.every((u) => u.size === sized.get(u.id)), 'every unit knows how many rows it holds');
  ok(UNITS.filter((u) => u.kind === 'lone').every((u) => u.size === 1),
    'a lone unit holds exactly one structure');
  ok(UNITS.filter((u) => u.kind === 'lone').length < 20,
    `only ${UNITS.filter((u) => u.kind === 'lone').length} structures are one of a kind`);

  /* And the layer the user asked about. */
  const vessels = MESH_INDEX.filter((m) => m.layer === 'circulatory');
  const vUnits = UNITS.filter((u) => u.layer === 'circulatory');
  ok(vUnits.length < vessels.length / 1.7,
    `vessels: ${vessels.length} structures, ${vessels.filter((m) => m.tier === 0).length} named by the course, `
    + `${vUnits.length} selectable (${vUnits.filter((u) => u.kind === 'group').length} groups, `
    + `${vUnits.filter((u) => u.kind === 'lone').length} one of a kind)`);
}

console.log(`${'\u2014'} unit names read as anatomy, not as string surgery ${'\u2014'}`);
{
  const labels = UNITS.filter((u) => u.kind === 'group').map((u) => u.label);
  /* Double plurals were the give-away that the label was assembled rather than
     read: "Axillary nodeses", "Orbital gyris", "Fasciculus propriuses".
     -is is a normal Latin genitive (pollicis, hallucis, ulnaris), not a plural. */
  const doubled = labels.filter((l) => /(ses|ums|uses)$/.test(l)
    && !/(sinuses|plexuses|arches|bursae)$/i.test(l));
  ok(!doubled.length, doubled.length ? `double plurals: ${doubled.join(', ')}` : 'no double plurals');
  ok(!labels.some((l) => /^Fingers of (foot|hand)$/.test(l)),
    'a phalanx of the foot is not a finger of it');
  ok(!labels.some((l) => /^Parts of |^Heads of |^Leaflets\b/.test(l)),
    'no group is named after its pieces where the whole could be named');
  ok(!labels.some((l) => / of the body$/.test(l)),
    'no group gave up and said "of the body"');
}

console.log(`${'\u2014'} groups are named after the thing, not the pieces ${'\u2014'}`);
{
  const unit = (n) => { const r = MESH_INDEX.find((m) => m.name === n); return r && r.unit; };
  /*
   * Where the source models a structure ONLY as its parts, the group takes the
   * structure's name -- selecting the deltoid's three parts is selecting the
   * deltoid, and "Parts of deltoid muscle" names nothing anyone is asked to
   * identify.
   */
  const whole = [
    ['Acromial part of deltoid muscle', 'Deltoid muscle'],
    ['Descending part of trapezius muscle', 'Trapezius muscle'],
    ['Sternocostal head of pectoralis major muscle', 'Pectoralis major muscle'],
    ['Left coronary leaflet', 'Aortic valve'],
    ['Anterior semilunar leaflet of pulmonary valve', 'Pulmonary valve'],
    ['Adenohypophysis', 'Pituitary gland'],
  ];
  for (const [part, want] of whole) ok(unit(part) === want,
    `"${part}" belongs to ${want}${unit(part) === want ? '' : ` (got ${unit(part)})`}`);
  /*
   * The triceps used to be in that list. It is not any more, and the reason is
   * the whole change: the 2019/20 musculoskeletal deck names the long, lateral
   * and medial heads of triceps brachii one by one, so all three are at course
   * level and are listed one by one. A part is only folded into its whole when
   * the course does not name the part.
   */
  for (const n of ['Long head of triceps brachii', 'Lateral head of triceps brachii',
    'Medial head of triceps brachii']) {
    const r = MESH_INDEX.find((m) => m.name === n);
    ok(r && r.tier === 0 && r.unit === n, `${n} is named by the course, so it stands alone`);
  }

  /*
   * Where the whole DOES have a mesh AND the course names it, the piece is
   * absorbed into it: the branches of the ulnar nerve ARE the ulnar nerve, and
   * offering them separately offers a name no lecture uses.
   */
  const absorbed = [
    ['Deep branch of ulnar nerve', 'Ulnar nerve'],
    ['Left medial segment of liver (IV)', 'Liver'],
    ['Motor root of trigeminal nerve', 'Trigeminal nerve (V)'],
  ];
  for (const [part, want] of absorbed) {
    ok(unit(part) === want, `"${part}" is selected as ${want} (got ${unit(part)})`);
    const w = MESH_INDEX.find((m) => m.name === want);
    ok(w && w.tier === 0 && w.unit === want, `${want} still stands on its own`);
  }
  /*
   * "of" is not "part of". A bursa OF the piriformis is not the piriformis and
   * a ligament OF the radius is not the radius, so neither is absorbed.
   */
  ok(unit('Annular ligament of radius') !== 'Radius',
    'a ligament of a bone is not absorbed into the bone');

  /*
   * Where the whole has no mesh but the model keeps naming it, it becomes the
   * place rather than the thing: there is no "Right lung" mesh, only its three
   * lobes, and yet thirty-two rows say they are "of right lung".
   */
  ok(unit('Anterior segmental bronchus of left lung (BIII)') === 'Bronchi of the left lung',
    'segmental bronchi group as bronchi of the lung, not as the lung');
  ok(unit('Superior lobar artery of right lung') === 'Arteries of the right lung',
    'and the vessels of a lung are named after it too');

  /*
   * Where the name says nothing about place, the model is measured. Nothing in
   * "capitohamate interosseous ligament" says hand.
   */
  const zoned = [
    ['Capitohamate interosseous ligament', 'Ligaments of the hand'],
    ['Dorsal cuboideonavicular ligament', 'Ligaments of the foot'],
    ['Abductor pollicis brevis', 'Muscles of the hand'],
    ['Abductor hallucis', 'Muscles of the foot'],
    ['Anconeus muscle', 'Muscles of the forearm'],
    ['Retropharyngeal nodes', 'Lymph nodes of the head and neck'],
    ['Pararectal nodes', 'Lymph nodes of the pelvis'],
    ['Angular gyrus', 'Gyri of the brain'],
  ];
  for (const [n, want] of zoned) ok(unit(n) === want,
    `"${n}" is measured into ${want}${unit(n) === want ? '' : ` (got ${unit(n)})`}`);

  /* A kind that is only ever in one place does not need the place naming it. */
  const ribs = MESH_INDEX.filter((m) => /^(Second|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth) rib$/.test(m.name));
  ok(ribs.length === 10 && ribs.every((m) => m.unit === 'Ribs'),
    `the ${ribs.length} ribs the notes never number individually group under "Ribs"`);
  const teeth = MESH_INDEX.filter((m) => m.layer === 'skeleton' && /(canine|premolar|incisor|molar)( tooth)?$/i.test(m.name));
  ok(teeth.length === 14 && teeth.every((m) => m.unit === 'Teeth'),
    `the ${teeth.length} teeth group under "Teeth", not "Bones of the head and neck"`);
  /* but one that is in several does. */
  const toes = MESH_INDEX.filter((m) => /phalanx of .* of foot/i.test(m.name));
  ok(toes.length === 14 && toes.every((m) => m.unit === 'Phalanges of the foot'),
    `all ${toes.length} phalanges of the foot group under one row`);
  ok(MESH_INDEX.some((m) => m.unit === 'Phalanges of the hand'),
    'and the hand keeps its own, because a phalanx is not always in the foot');

  const groups = UNITS.filter((u) => u.kind === 'group').sort((a, b) => b.size - a.size);
  console.log(`       ${groups.length} groups, largest: `
    + groups.slice(0, 3).map((u) => `${u.label} (${u.size})`).join(', '));
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
