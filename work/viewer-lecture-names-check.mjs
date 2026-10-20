/*
 * The viewer's names follow the 2026 decks, and the older decks only where
 * this year has not taught a thing yet.
 *
 * The owner's report (2026-10-20): the liver came apart into "Liver" and its
 * segments, the jejunum had no ileum, taught muscles had no name of their own
 * and untaught ones did. Each of those is held here, with the rule behind the
 * fix: work/build-viewer-lecture-names.mjs (what the 2026 decks name) and
 * work/build-mesh-index.mjs (how that becomes what a tap selects), with
 * work/lib/fallback-names.mjs for the older decks' corrections.
 *
 * Reads committed data only (outputs/, work/source-text.json), so CI runs it.
 * Run `node work/build-viewer-lecture-names.mjs --check` beside it: that one
 * says the generated names are current.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { VIEWER_LECTURE_NAMES, VIEWER_LECTURE_SOURCES, lectureRow } from '../outputs/viewer-lecture-names.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { normaliseCitationText } from './lib/source-lesson-map.mjs';
import { NAMED_GROUPS, RENAMED } from './lib/fallback-names.mjs';

const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
const onPage = (ref, page, words) => !!TEXT[ref] && page >= 1 && page <= TEXT[ref].pages.length
  && normaliseCitationText(TEXT[ref].pages[page - 1]).includes(normaliseCitationText(words));
let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };

/* Every name cites a page that exists, in a registered deck. */
const sources = new Map(VIEWER_LECTURE_SOURCES.map((s) => [s.ref, s]));
ok(new Set(VIEWER_LECTURE_NAMES.map((n) => n.layer + '|' + n.name)).size === VIEWER_LECTURE_NAMES.length, 'one entry per structure');
for (const n of VIEWER_LECTURE_NAMES) {
  const old = /older deck/.test(n.evidence);
  ok(SOURCE_FILES[n.ref] && SOURCE_FILES[n.ref].file === n.file, `${n.name}: ${n.ref} is not the registered file`);
  ok(old ? !!TEXT[n.ref] : sources.has(n.ref), `${n.name}: cites ${n.ref}, which is not a 2026 deck`);
  ok(n.page >= 1 && n.page <= TEXT[n.ref].pages.length, `${n.name}: ${n.ref} has no p${n.page}`);
  ok(MESH_INDEX.some((r) => r.layer === n.layer && (r.name === n.name || r.mesh === n.name)), `${n.name}: no such structure in the ${n.layer} layer`);
  /* the owner's rule: a figure's own label is not taught; one the lecturer
     marked is, and says how (docs/DECISIONS.md, "What on a slide counts as taught") */
  if (/figure/.test(n.evidence)) ok(/^marked figure label \(.+\)$/.test(n.evidence) && n.diagram, `${n.name}: a figure label with no mark`);
}

/* The older decks' corrections quote their page. */
for (const [key, r] of Object.entries(RENAMED))
  ok(onPage(r.ref, r.page, r.says), `RENAMED ${key}: "${r.says}" is not on ${r.ref} p${r.page}`);
for (const g of NAMED_GROUPS)
  ok(onPage(g.ref, g.page, g.says), `NAMED_GROUPS ${g.group}: "${g.says}" is not on ${g.ref} p${g.page}`);

/* What the names decide is what the index carries. */
const rows = MESH_INDEX.map(lectureRow);
for (const r of rows) {
  const lec = r.lectureSource;
  if (!lec) continue;
  if (lec.whole) ok(r.unitKind === 'course' && r.unit === lec.whole, `${r.name}: should be selected as ${lec.whole}, is ${r.unit}`);
  else ok(r.tier === 0 && r.unitKind === 'course' && r.unit === (lec.displayName || r.name), `${r.name}: should be the course unit ${lec.displayName || r.name}, is ${r.unit}`);
}
const unitOf = (name) => rows.find((r) => r.name === name)?.unit;
const unitRows = (label) => rows.filter((r) => r.unit === label).map((r) => r.name);

/* The report, one item at a time. */
const liver = rows.filter((r) => r.layer === 'organs' && /^Liver$|segment of liver/.test(r.name));
ok(liver.length === 9 && liver.every((r) => r.unit === 'Liver'), `the liver is one unit (${[...new Set(liver.map((r) => r.unit))].join(', ')})`);
ok(unitOf('Mucosa of stomach') === 'Stomach', 'the mucosa of the stomach is the stomach');
const jej = rows.find((r) => r.layer === 'organs' && r.mesh === 'Jejunum');
ok(jej && jej.name === 'Jejunum and ileum' && jej.unit === 'Jejunum and ileum', 'the one jejunum mesh is the jejunum and ileum');
ok(!UNITS.some((u) => u.label === 'Jejunum'), 'and nothing is called the jejunum alone');
for (const [whole, parts] of [
  ['Biceps brachii', ['Long head of biceps brachii', 'Short head of biceps brachii']],
  ['Triceps brachii', ['Long head of triceps brachii', 'Lateral head of triceps brachii', 'Medial head of triceps brachii']],
  ['Biceps femoris', ['Long head of biceps femoris', 'Short head of biceps femoris']],
  ['Gastrocnemius', ['Lateral head of gastrocnemius', 'Medial head of gastrocnemius']],
  ['Digastric muscle', ['Anterior belly of digastric muscle', 'Posterior belly of digastric muscle', 'Intermediate tendon of digastric muscle']],
  ['Intercostal muscles', ['External intercostal muscles', 'Internal intercostal muscles', 'Innermost intercostal muscles']],
  ['Taeniae coli', ['Free taenia', 'Mesocolic taenia', 'Omental taenia']],
]) ok(parts.every((p) => unitOf(p) === whole), `${whole} is ${parts.join(' + ')} (got ${parts.map(unitOf).join(', ')})`);

/* Every muscle a Revise row names off a slide is a unit by that name, unless
   the model does not have it. */
const NOT_A_UNIT = {
  Iliopsoas: 'iliacus and psoas major are taught one by one too; the search composite opens both',
  'Semispinalis capitis': 'not modelled', 'Tensor tympani': 'not modelled', Stapedius: 'not modelled',
};
const squash = (s) => String(s).toLowerCase().replace(/\([^)]*\)/g, '').replace(/[^a-z]/g, '');
const unitNames = UNITS.filter((u) => u.layer === 'muscle').map((u) => squash(u.label).replace(/muscles?$/, ''));
/* "Lumbricals" under the hand's heading is the unit "Lumbricals of hand" */
const hasUnit = (leaf) => { const k = squash(leaf).replace(/muscles?$/, ''); return unitNames.some((u) => u === k || u.startsWith(k + 'of')); };
for (let w = 1; w <= 13; w++) {
  let leaves;
  try { leaves = (await import(`../outputs/revision/hss2011-leaves-w${w}.js`)).ROWS; } catch (e) { if (e.code === 'ERR_MODULE_NOT_FOUND') continue; throw e; }
  for (const l of leaves.filter((x) => x.k === 'muscle' && x.viewer !== false))
    ok(NOT_A_UNIT[l.l] || hasUnit(l.l), `Revise muscle "${l.l}" (week ${w}) has no viewer unit of that name`);
}

/* A muscle an older file alone names is not a course name: Module I is taught.
   What is left is the pelvic floor and the inguinal region, Module IV. */
const oldOnly = rows.filter((r) => r.layer === 'muscle' && r.tier === 0 && !r.lectureSource).map((r) => r.name).sort();
ok(JSON.stringify(oldOnly) === JSON.stringify(['Coccygeus muscle', 'External anal sphincter', 'Inguinal ligament']),
  `muscle-layer names from the older files only: ${oldOnly.join(', ')}`);
for (const n of ['Zygomaticus major muscle', 'Orbicularis oris muscle', 'Frontalis muscle', 'Gracilis muscle', 'Stylohyoid muscle'])
  ok(rows.find((r) => r.name === n)?.tier === 1, `${n} is on no 2026 slide except as an unmarked picture label, so it is not a course name`);
ok(!UNITS.some((u) => u.kind === 'group' && u.layer === 'muscle' && /^Muscles of /.test(u.label)
  && rows.some((r) => r.unit === u.label && /fascia|aponeurosis|tract|retinacul|tarsus|ring/i.test(r.name))),
  'no "Muscles of ..." group holds a fascia, an aponeurosis or a retinaculum');

/* Numbered sets the slides name as sets stay one unit per bone. */
for (const term of ['metacarpal', 'metatarsal', 'phalanx']) {
  const set = rows.filter((r) => r.layer === 'skeleton' && r.name.toLowerCase().includes(term));
  ok(set.length && set.every((r) => r.unitKind === 'course' && r.unit === r.name), `${term}: swallowed by an atlas family`);
}
for (const name of ['Metacarpophalangeal joints', 'Metatarsophalangeal joints'])
  ok(rows.some((r) => r.unit === name && r.lectureSource?.evidence === 'joint represented by articular capsule'), `${name}: not named by its capsule`);
ok(rows.find((r) => r.name === 'Dorsal scaphotriquetral ligament').tier === 1, 'an unnamed ligament was promoted');

const wholes = new Set(VIEWER_LECTURE_NAMES.filter((n) => n.whole).map((n) => n.layer + '|' + n.whole)).size;
console.log(`PASS: ${checks} checks; ${VIEWER_LECTURE_NAMES.length} names from ${VIEWER_LECTURE_SOURCES.length} decks, ${wholes} wholes.`
  + ` Liver ${unitRows('Liver').length} meshes in one unit.`);
