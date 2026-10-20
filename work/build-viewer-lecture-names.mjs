/*
 * The names the 2026/27 HSS2011 decks give the model's structures.
 *
 * WHY THIS EXISTS
 *
 * work/course-terms.json (and so mesh-index.js) reads the OLD course material:
 * exam papers and decks from 2012 to 2020. For anything this year's decks have
 * already taught, that is the wrong authority. It named the long, lateral and
 * medial heads of triceps one by one (a 2019 deck did) while the 2026 slide
 * says "Triceps brachii"; it named the scalenes "Scalenus anterior muscle"
 * where the slide says "Anterior Scalene"; and it named the gracilis and the
 * thirteen face muscles off old readings and question banks, where the 2026
 * decks name neither (W4 p13 is an atlas picture with nothing marked on it).
 * build-mesh-index.mjs reads this file and lets the 2026 decks decide (its
 * "2026 PRECEDENCE" section says how far).
 *
 * WHAT COUNTS AS NAMED
 *
 *   slide row   a Revise leaf names it (outputs/revision/hss2011-leaves-w*.js).
 *               Those rows were read off the slides page by page, and
 *               revision-check.mjs holds every one to the page it cites.
 *   slide name  SLIDE_NAMES below: where the slide's words and the atlas's
 *               differ ("Anterior Scalene" for "Scalenus anterior muscle",
 *               "Adductor halluces" for "Adductor hallucis"), or where one slide
 *               name covers several meshes (Erector spinae). Each entry quotes
 *               the slide, and the build stops if the quote is not on the page.
 *   named       the structure's own name appears in a deck's text, outside a
 *               longer name ("extensor digitorum" inside "extensor digitorum
 *               longus" is the leg muscle, not the forearm one) and not as part
 *               of a brain nucleus ("nucleus gracilis" is not the gracilis).
 *   named whole a structure the model has only as parts ("Long head of biceps
 *               brachii", "Short head of …"): the WHOLE is named, so every part
 *               is selected and named as the whole.
 *   marked figure label  FIGURE_LABELS below: a label the slide boxes, circles
 *               or highlights in a picture, which the committed text cannot
 *               hold, transcribed by eye. An unmarked atlas label never counts.
 *   named set / joint represented by articular capsule: as before.
 *
 * WHERE THE TEXT COMES FROM
 *
 * work/source-text.json -- the committed text of every registered source, the
 * same text source-check.mjs and revision-check.mjs read, compared the same way
 * (normaliseCitationText). So no iCloud or drive is needed, and `--check` runs
 * in CI. Add a new deck by registering it in SOURCE_FILES and rebuilding
 * source-text.json; this picks it up.
 *
 * Usage: node work/build-viewer-lecture-names.mjs [--check]
 *        then node work/build-mesh-index.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { collectStructures } from './lib/mesh-names.mjs';
import { normaliseCitationText } from './lib/source-lesson-map.mjs';
import { normaliseSearch } from '../outputs/search-name.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';

const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;

/* Every current anatomy deck and tutorial whose text is committed. The subject
   description form and the schedules are left out: they name books ("Colour
   Atlas") and dates, not structures. */
const DECKS = Object.entries(SOURCE_FILES)
  .filter(([ref, s]) => s.subject === 'HSS2011' && s.root === 'newsrc' && TEXT[ref]
    && (s.kind === 'primary' || /^hss\.tut\./.test(ref)))
  .map(([ref, s]) => ({ ref, file: s.file, pages: TEXT[ref].pages }));
const deckOf = new Map(DECKS.map((d) => [d.ref, d]));

/* "Femoral n.", "Common peroneal n." -- the lower-limb motor summary abbreviates
   every nerve, so read the abbreviation as the word. */
const nerveWord = (s) => String(s).replace(/\b(nn?)\.(?=[\s,:;)]|$)/gi, (_, n) => (n.length === 2 ? 'nerves' : 'nerve'));
const norm = (s) => normaliseSearch(nerveWord(s).replace(/\([^)]*\)/g, ' '))
  .replace(/\bmetacarpals\b/g, 'metacarpal').replace(/\bmetatarsals\b/g, 'metatarsal');
const pages = DECKS.flatMap((d) => d.pages.map((text, i) => ({ ref: d.ref, file: d.file, page: i + 1, text: ' ' + norm(text) + ' ' })));
const onPage = (ref, page, words) => {
  const d = TEXT[ref];
  return !!d && page >= 1 && page <= d.pages.length
    && normaliseCitationText(d.pages[page - 1]).includes(normaliseCitationText(words));
};

const { rows } = collectStructures();
const rowByName = new Map(rows.map((r) => [r.layer + '|' + r.name, r]));

/* Word prefixes of every structure name, per layer, and who owns them: a phrase
   followed by a word that continues ANOTHER structure's name is that structure. */
const prefixOwners = new Map();
for (const r of rows) {
  const w = norm(r.name).split(' ');
  for (let i = 1; i <= w.length; i++) {
    const k = r.layer + '|' + w.slice(0, i).join(' ');
    if (!prefixOwners.has(k)) prefixOwners.set(k, new Set());
    prefixOwners.get(k).add(r.name);
  }
}
/* "Nucleus cuneatus and gracilis" is two brain nuclei, not the thigh muscle. */
const NOT_AFTER = new Set(['nucleus', 'nuclei', 'fasciculus', 'tract', 'tubercle']);

/* The first deck page that names `phrase` as THIS structure, or null. */
function named(phrase, r) {
  for (const p of pages) {
    let from = 0;
    for (;;) {
      const at = p.text.indexOf(' ' + phrase + ' ', from);
      if (at < 0) break;
      from = at + 1;
      const next = p.text.slice(at + phrase.length + 2).split(' ')[0];
      const before = p.text.slice(0, at).trim().split(' ').slice(-3);
      if (/bone$/.test(r.name) && !/bone$/.test(phrase) && !/^hss\.(ll|ul|hnt|msk)\.2026$/.test(p.ref)) continue;
      if (/bone$/.test(r.name) && /^(?:lobe|cortex|plane|sinus)$/.test(next)) continue;
      if (/muscle$/.test(r.name) && /^(?:ligament|nerve|artery|vein|fascia)$/.test(next)) continue;
      if (r.layer !== 'nervous' && before.some((w) => NOT_AFTER.has(w))) continue;
      const longer = prefixOwners.get(r.layer + '|' + phrase + ' ' + next);
      if (next && longer && [...longer].some((n) => n !== r.name)) continue;
      return p;
    }
  }
  return null;
}

const UL = 'hss.ul.2026', LL = 'hss.ll.2026', HN = 'hss.hnt.2026', MSK = 'hss.msk.2026';

/*
 * Slide names the atlas words differently, and slide names that cover several
 * meshes. `says` is the slide's own wording and must be on `page`; `rows` are
 * atlas names (strings) or a pattern; `name` is what the viewer calls it.
 */
const SLIDE_NAMES = [
  /* foot: the slide's key spells several of these its own way (p34) */
  { ref: LL, page: 34, says: 'Abductor digiti minimi', layer: 'muscle', rows: ['Abductor digiti minimi of foot'] },
  { ref: LL, page: 34, says: 'Flexor digiti minimi', layer: 'muscle', rows: ['Flexor digiti minimi of foot'] },
  { ref: LL, page: 34, says: 'Flexor digiti brevis', layer: 'muscle', rows: ['Flexor digitorum brevis'] },
  { ref: LL, page: 34, says: 'Extensor digiti brevis', layer: 'muscle', rows: ['Extensor digitorum brevis'] },
  { ref: LL, page: 34, says: 'Extensor halluces brevis', layer: 'muscle', rows: ['Extensor hallucis brevis'] },
  { ref: LL, page: 34, says: 'Adductor halluces', layer: 'muscle', rows: /^(?:Oblique|Transverse) head of adductor hallucis$/, name: 'Adductor hallucis' },
  { ref: LL, page: 34, says: 'Dorsal interossei', layer: 'muscle', rows: ['Dorsal interossei muscles of foot'], name: 'Dorsal interossei of foot' },
  { ref: LL, page: 34, says: 'Lumbricals', layer: 'muscle', rows: ['Lumbrical muscles of foot'], name: 'Lumbricals of foot' },
  { ref: LL, page: 18, says: 'Tensor fascia latae', layer: 'muscle', rows: ['Tensor fasciae latae'], name: 'Tensor fascia latae' },
  { ref: LL, page: 14, says: 'Iliotibial band', layer: 'muscle', rows: ['Iliotibial tract'], name: 'Iliotibial band' },
  { ref: LL, page: 33, says: 'Common peroneal n.', layer: 'nervous', rows: ['Common fibular nerve'], name: 'Common peroneal nerve' },
  /* hand: the five compartments of p25, and the central and interosseous ones of p26 */
  { ref: UL, page: 25, says: 'Thenar', layer: 'muscle', rows: ['Abductor pollicis brevis', 'Deep head of flexor pollicis brevis', 'Superficial head of flexor pollicis brevis', 'Opponens pollicis muscle'], name: 'Thenar compartment' },
  { ref: UL, page: 25, says: 'Hypothenar', layer: 'muscle', rows: ['Abductor digiti minimi of hand', 'Flexor digiti minimi of hand', 'Opponens digiti minimi muscle of hand'], name: 'Hypothenar compartment' },
  { ref: UL, page: 26, says: 'Lumbricals', layer: 'muscle', rows: ['Lumbrical muscles of hand'], name: 'Lumbricals of hand' },
  { ref: UL, page: 26, says: 'Dorsal Interossei', layer: 'muscle', rows: ['Dorsal interossei muscles of hand'], name: 'Dorsal interossei of hand' },
  /* neck (p16), back (p30-31), abdominal wall (p33) */
  { ref: HN, page: 16, says: 'Anterior Scalene', layer: 'muscle', rows: ['Scalenus anterior muscle'], name: 'Anterior scalene' },
  { ref: HN, page: 16, says: 'Middle Scalene', layer: 'muscle', rows: ['Scalenus medius muscle'], name: 'Middle scalene' },
  { ref: HN, page: 16, says: 'Posterior Scalene', layer: 'muscle', rows: ['Scalenus posterior muscle'], name: 'Posterior scalene' },
  { ref: HN, page: 16, says: 'Prevertebral muscles', layer: 'muscle', rows: ['Longus colli muscle', 'Longus capitis muscle'], name: 'Prevertebral muscles' },
  { ref: HN, page: 30, says: 'Erector Spinae', layer: 'muscle', rows: /^(?:Iliocostalis|Longissimus) (?:capitis|colli|thoracis|lumborum) muscle$/, name: 'Erector spinae' },
  { ref: HN, page: 30, says: 'Spinalis', layer: 'muscle', rows: /^Spinalis (?:capitis|colli|thoracis) muscle$/, name: 'Spinalis' },
  { ref: HN, page: 30, says: 'Splenius cervicis', layer: 'muscle', rows: ['Splenius colli muscle'], name: 'Splenius cervicis' },
  { ref: HN, page: 31, says: 'Multifidus', layer: 'muscle', rows: /^Multifidus (?:colli|thoracis|lumborum) muscle$/, name: 'Multifidus' },
  { ref: HN, page: 31, says: 'Semispinalis cervicis', layer: 'muscle', rows: ['Semispinalis colli muscle'], name: 'Semispinalis cervicis' },
  { ref: HN, page: 25, says: 'Intercostal muscles', layer: 'muscle', rows: /^(?:External|Internal|Innermost) intercostal muscles$/, name: 'Intercostal muscles' },
  { ref: HN, page: 33, says: 'External oblique abdominis', layer: 'muscle', rows: ['External abdominal oblique muscle'], name: 'External oblique abdominis' },
  { ref: HN, page: 33, says: 'Internal oblique abdominis', layer: 'muscle', rows: ['Internal abdominal oblique muscle'], name: 'Internal oblique abdominis' },
  { ref: HN, page: 33, says: 'Transverse abdominis', layer: 'muscle', rows: ['Transversus abdominis muscle'], name: 'Transverse abdominis' },
  /* heart (Week 8): the slide teaches the papillary muscle, not which one */
  { ref: 'hss.l8.2026', page: 24, says: 'Papillary Muscle', layer: 'circulatory', rows: /papillary muscle of (?:left|right) ventricle$/, name: 'Papillary muscles' },
  /* skeleton */
  { ref: HN, page: 23, says: 'costal cartilage', layer: 'skeleton', rows: /^Costal cartilage of \w+ rib$/, name: 'Costal cartilages' },
  { ref: MSK, page: 11, says: 'Frontal sinus', layer: 'skeleton', rows: ['Sinus of frontal bone'], name: 'Frontal sinus' },
  { ref: MSK, page: 11, says: 'Sphenoidal sinus', layer: 'skeleton', rows: ['Sinus of sphenoid bone'], name: 'Sphenoidal sinus' },
];

/*
 * Labels the slide MARKS on a figure -- boxed, circled or highlighted -- that
 * live in the picture rather than the text, so source-text.json cannot hold
 * them: transcribed by eye, as the bone landmarks' diagram labels are
 * (work/build-bone-landmarks.mjs). A plain label that came with an atlas picture
 * does NOT count: the owner's rule is that only what the lecturer marked is
 * taught, and that is usually in the text as well. (So W4 p13's labelled face,
 * a picture with no text and nothing marked, names none of its muscles.)
 * `mark` says how the slide marks it; `diagram` is the label as printed;
 * `title` is a phrase of the page's text that must be there, so a deck
 * re-exported with its pages moved stops the build instead of pointing at the
 * wrong slide.
 */
const FIGURE_LABELS = [
  /* LL p19: the adductors in green boxes (the gracilis is on no 2026 slide) */
  { ref: LL, page: 19, title: 'Medial thigh muscles (Adductor group)', mark: 'green box', diagram: 'Adductor longus', layer: 'muscle', rows: ['Adductor longus'] },
  { ref: LL, page: 19, title: 'Medial thigh muscles (Adductor group)', mark: 'green box', diagram: 'Adductor brevis', layer: 'muscle', rows: ['Adductor brevis'] },
  /* W4 p11: the text names "Infrahyoid muscles" beside a blue box drawn round
     these four; their own labels are unmarked, so the box is named, not them */
  { ref: HN, page: 11, title: 'Infrahyoid muscles', mark: 'blue box', diagram: 'Infrahyoid muscles (box round Sternohyoid, Omohyoid, Thyrohyoid, Sternothyroid)', layer: 'muscle',
    rows: ['Sternohyoid muscle', 'Omohyoid muscle', 'Thyrohyoid muscle', 'Sternothyroid muscle'], name: 'Infrahyoid muscles' },
  /* W4 p12: the extrinsic tongue muscles, green and underlined (styloglossus and
     palatoglossus are not modelled) */
  { ref: HN, page: 12, title: 'Muscles of the tongue', mark: 'green, underlined', diagram: 'Genioglossus', layer: 'muscle', rows: ['Genioglossus muscle'] },
  { ref: HN, page: 12, title: 'Muscles of the tongue', mark: 'green, underlined', diagram: 'Hyoglossus', layer: 'muscle', rows: ['Hyoglossus muscle'] },
];

const entries = new Map();
/* A whole beats a structure's own name: the clavicular head of pectoralis major
   is on a slide too, but tapping it is tapping pectoralis major. Then a 2026
   page beats an older deck's. `force` (the slide's own words, a joint's name)
   replaces anything but a whole. */
const rank = (e) => (e.whole ? 2 : 0) + (/older deck/.test(e.evidence) ? 0 : 1);
function put(r, e, { force = false } = {}) {
  const k = r.layer + '|' + r.name;
  const had = entries.get(k);
  if (had && (force ? had.whole && !e.whole : rank(e) <= rank(had))) return;
  entries.set(k, { layer: r.layer, name: r.name, ...e });
}
const at = (ref, page) => ({ ref, file: SOURCE_FILES[ref].file, page });

/* 1. the slide's own words */
for (const s of SLIDE_NAMES) {
  if (!onPage(s.ref, s.page, s.says)) throw new Error(`SLIDE_NAMES: "${s.says}" is not on ${s.ref} p${s.page}`);
  const hit = rows.filter((r) => r.layer === s.layer && (s.rows instanceof RegExp ? s.rows.test(r.name) : s.rows.includes(r.name)));
  const want = s.rows instanceof RegExp ? 1 : s.rows.length;
  if (hit.length < want) throw new Error(`SLIDE_NAMES: "${s.says}" names ${want} model rows, found ${hit.length}`);
  for (const r of hit) {
    const e = { ...at(s.ref, s.page), evidence: 'slide name' };
    if (hit.length > 1) e.whole = s.name;
    else if (s.name && s.name !== r.name) e.displayName = s.name;
    put(r, e, { force: true });
  }
}
for (const f of FIGURE_LABELS) {
  const pageCount = TEXT[f.ref]?.pages.length || 0;
  if (f.page < 1 || f.page > pageCount) throw new Error(`FIGURE_LABELS: ${f.ref} has no p${f.page}`);
  if (!f.mark) throw new Error(`FIGURE_LABELS: "${f.diagram}" does not say how the slide marks it; an unmarked figure label is not taught`);
  if (!onPage(f.ref, f.page, f.title)) throw new Error(`FIGURE_LABELS: ${f.ref} p${f.page} is not the slide "${f.diagram}" was read from`);
  const hit = rows.filter((r) => r.layer === f.layer && f.rows.includes(r.name));
  if (hit.length < f.rows.length) throw new Error(`FIGURE_LABELS: "${f.diagram}" names ${f.rows.length} model rows, found ${hit.length}`);
  for (const r of hit) {
    const e = { ...at(f.ref, f.page), evidence: `marked figure label (${f.mark})`, diagram: f.diagram };
    if (hit.length > 1) e.whole = f.name;
    else if (f.name && f.name !== r.name) e.displayName = f.name;
    put(r, e, { force: true });
  }
}

/* Wholes the model has only as parts: "<x> head of Biceps brachii". */
const PARTITIVE = /^(.+?) (?:part|parts|head|heads|belly|bellies) of ([^]+)$/i;
const partsOf = new Map();
for (const r of rows) {
  const m = r.name.match(PARTITIVE);
  /* one "of" only: "Ligament of head of femur" is a ligament, not part of the femur */
  if (!m || /\bof\b/i.test(m[1]) || /\bof\b/i.test(m[2]) || rowByName.has(r.layer + '|' + m[2])
    || rows.some((o) => o.layer === r.layer && o.name.toLowerCase() === m[2].toLowerCase())) continue;
  const k = r.layer + '|' + norm(m[2]).replace(/ muscle$/, '');
  if (!partsOf.has(k)) partsOf.set(k, { whole: m[2][0].toUpperCase() + m[2].slice(1), rows: [] });
  partsOf.get(k).rows.push(r);
}
/* The digastric is its two bellies and the tendon between them. */
for (const r of rows) {
  const m = r.name.match(/^Intermediate tendon of ([^]+)$/i);
  const g = m && partsOf.get(r.layer + '|' + norm(m[1]).replace(/ muscle$/, ''));
  if (g) g.rows.push(r);
}

/* 2. the Revise leaves */
const LEAF_LAYERS = { muscle: ['muscle'], bone: ['skeleton'], joint: ['joint'], nerve: ['nervous'],
  part: ['skeleton', 'joint', 'organs', 'nervous', 'circulatory', 'lymphatic'] };
const leaves = [];
for (let w = 1; w <= 13; w++) {
  try { leaves.push(...(await import(`../outputs/revision/hss2011-leaves-w${w}.js`)).ROWS); } catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e; }
}
/* "Hemiazygos vein" on the slide is "Hemi-azygos vein" in the atlas, and the
   slide's "Lateral ventricles" are its one "Lateral ventricle". */
const squash = (s) => norm(s).replace(/[\s-]+/g, '');
const sameName = (row, leaf) => {
  const a = norm(row), b = norm(leaf);
  return a === b || a === b + ' muscle' || a === b + ' bone' || a === b + ' nerve' || a === b + ' joint'
    || squash(row) === squash(leaf) || squash(row) === squash(leaf).replace(/s$/, '');
};
/* A row marked `old` is one the owner kept in Revise from an older deck because
   the 2026 slide does not spell it out (the 2026 figure labels the hamstrings
   as one); the viewer names what Revise names, and says which deck it is from. */
for (const l of leaves) {
  const layers = LEAF_LAYERS[l.k];
  if (!layers || l.viewer === false) continue;
  const [ref, ...cited] = l.src || [];
  if (!deckOf.has(ref) && !(l.old && TEXT[ref])) continue;
  const page = cited.find((p) => onPage(ref, p, l.match || l.l));
  if (!page) throw new Error(`leaf ${l.id}: "${l.match || l.l}" is not on ${ref} p${cited.join(',')}`);
  const e = { ...at(ref, page), evidence: l.old ? 'slide row, older deck' : 'slide row' };
  const own = rows.filter((r) => layers.includes(r.layer) && sameName(r.name, l.l));
  for (const r of own) put(r, e);
  if (own.length || l.k !== 'muscle') continue;
  const parts = partsOf.get('muscle|' + norm(l.l).replace(/ muscle$/, ''));
  if (parts) for (const r of parts.rows) put(r, { ...e, whole: parts.whole });
}

/* 3. wholes named in a deck's text */
for (const [k, g] of partsOf) {
  const phrase = k.slice(k.indexOf('|') + 1);
  const found = phrase.length > 3 && named(phrase, g.rows[0]);
  if (found) for (const r of g.rows) put(r, { ...at(found.ref, found.page), evidence: 'named whole', whole: g.whole });
}

/* 4. structures named in a deck's text */
for (const r of rows) {
  const phrase = norm(r.name), short = phrase.replace(/\s+(?:muscle|bone)$/, '');
  const found = [phrase, ...(short !== phrase ? [short] : [])].filter((v) => v.length > 3).map((v) => named(v, r)).find(Boolean);
  if (found) put(r, { ...at(found.ref, found.page), evidence: 'named' });
}

/* 5. The model represents these joints by their articular capsules. Name the
   lecture joint, without asking the student to learn an unmentioned capsule. */
for (const r of rows.filter((x) => x.layer === 'joint' && /^Articular capsules? of /i.test(x.name))) {
  const joint = r.name.replace(/^Articular capsules? of /i, '');
  const found = named(norm(joint), r);
  if (!found) continue;
  put(r, { ...at(found.ref, found.page), evidence: 'joint represented by articular capsule',
    displayName: joint[0].toUpperCase() + joint.slice(1) }, { force: true });
}

/* 6. These diagrams name the numbered sets rather than spelling every GLB name.
   A set does not justify an unmentioned depression, muscle part or branch. */
const families = [
  { re: /^(?:First|Second|Third|Fourth|Fifth) metatarsal bone$/, ref: LL, page: 12, term: 'Metatarsal' },
  { re: /^(?:Proximal|Middle|Distal) phalanx of (?:first|second|third|fourth|fifth) finger of foot$/, ref: LL, page: 12, term: 'phalanx' },
  { re: /^(?:First|Second|Third|Fourth|Fifth) metacarpal bone$/, ref: UL, page: 14, term: 'metacarpal bones' },
  { re: /^(?:Proximal|Middle|Distal) phalanx of (?:first|second|third|fourth|fifth) finger of hand$/, ref: UL, page: 14, term: 'phalanx' },
  { re: /^(?:Medial|Intermediate|Lateral) cuneiform bone$/, ref: LL, page: 12, term: 'Cuneiform bones' },
];
for (const f of families) {
  if (!onPage(f.ref, f.page, f.term)) throw new Error(`Missing family evidence: ${f.term} on ${f.ref} p${f.page}`);
  for (const r of rows.filter((x) => x.layer === 'skeleton' && f.re.test(x.name))) put(r, { ...at(f.ref, f.page), evidence: 'named set' });
}

const names = [...entries.values()].sort((a, b) => a.layer.localeCompare(b.layer) || a.name.localeCompare(b.name))
  .map(({ layer, name, ref, file, page, evidence, diagram, displayName, whole }) =>
    ({ layer, name, ref, file, page, evidence, ...(diagram ? { diagram } : {}), ...(displayName ? { displayName } : {}), ...(whole ? { whole } : {}) }));
const used = [...new Set(names.map((n) => n.ref))];
const output = '/* GENERATED by work/build-viewer-lecture-names.mjs. Names and source pages only. */\n'
  + `export const VIEWER_LECTURE_SOURCES = ${JSON.stringify(DECKS.filter((d) => used.includes(d.ref)).map(({ ref, file, pages: p }) => ({ ref, file, pages: p.length })), null, 2)};\n`
  + `export const VIEWER_LECTURE_NAMES = ${JSON.stringify(names, null, 2)};\n`
  + `const lectureMap=new Map(VIEWER_LECTURE_NAMES.map(r=>[r.layer+'|'+r.name.toLowerCase(),r]));
/* The 2026 deck and page behind a row. mesh-index.js already carries the unit
   these names decide (work/build-mesh-index.mjs); this adds the page to show. */
export function lectureRow(row){
  const own=lectureMap.get(row.layer+'|'+row.name.toLowerCase());
  return own?{...row,lectureSource:own}:row;
}
`;
if (process.argv.includes('--check')) {
  /* line endings aside: a Windows checkout (core.autocrlf) has CRLF, CI has LF */
  const lf = (s) => s.replace(/\r\n/g, '\n');
  if (lf(readFileSync(new URL('../outputs/viewer-lecture-names.js', import.meta.url), 'utf8')) !== lf(output)) {
    console.error('outputs/viewer-lecture-names.js needs regeneration: node work/build-viewer-lecture-names.mjs');
    process.exit(1);
  }
} else writeFileSync(new URL('../outputs/viewer-lecture-names.js', import.meta.url), output);
const count = (f) => Object.fromEntries([...new Set(names.map((n) => n.layer))].map((k) => [k, names.filter((n) => n.layer === k && f(n)).length]));
console.log(JSON.stringify({ decks: DECKS.length, names: names.length, byLayer: count(() => true), wholes: count((n) => n.whole), renamed: count((n) => n.displayName) }));
