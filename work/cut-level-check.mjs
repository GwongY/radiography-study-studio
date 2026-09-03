/*
 * Do the named section levels mean what they say?
 *
 * studio/tools-and-capture.js offers the section cut at named anatomical
 * levels -- "axial at the sternal angle", "transpyloric (L1)". Each of those
 * is two claims at once, and nothing else in the repo checks either:
 *
 *   1. A SOURCE claim. The level is presented as course fact, so CLAUDE.md's
 *      first rule applies to it. But source-check.mjs only walks STUDY_ITEMS,
 *      and these levels are viewer code, not corpus -- so a quote here could
 *      drift, or cite a page that never said it, and every existing check
 *      would still pass.
 *   2. A GEOMETRY claim. "The sternal angle is at the manubriosternal
 *      junction" is a statement about where the plane lands on THIS model. A
 *      pattern that quietly stopped matching -- a renamed bone in a future
 *      GLB -- would not throw. The level would simply be dropped from the
 *      list, or worse, measured off whatever else the pattern still caught,
 *      and the app would section a student at the wrong level in silence.
 *
 * So this checks both, against the committed source text and the real GLB:
 *
 *   quotes     every quoted phrase is on the page its citation names, using
 *              the SAME comparison as source-check.mjs -- so a level that
 *              passes here would still pass if it were moved into the corpus
 *   refs       every `ref` is a real SOURCE_FILES id
 *   resolve    every landmark a level measures from resolves against the true
 *              mesh names of the skeleton layer
 *   order      the axial levels come out in anatomical order, top to bottom.
 *              This is the check that catches a measurement being right in
 *              isolation and wrong in company.
 *   T4/T5      the measured sternal angle lands between T4 and T5, which is
 *              what the lecture says it should. That is the one place where a
 *              source claim and a geometry measurement can be held against
 *              each other, so it is worth doing explicitly.
 *
 * Needs no drive: source-text.json and the GLBs are both committed.
 * Run: node work/cut-level-check.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { createResolver } from '../outputs/landmarks.js';
import { SOURCE_FILES } from '../outputs/study/corpus/schema.js';

const WORK = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------------ *
 * The table under test, read from the module that ships it
 * ------------------------------------------------------------------ */
/*
 * CUT_LEVELS is exported from a module that imports the whole studio -- three,
 * the DOM, the lot -- so it cannot simply be imported here. The table itself
 * is a plain literal, and what this check needs from each entry is its id, its
 * axis, its citations and the landmark keys it measures from. Those are read
 * out of the source text, which also means a level that stops being declared
 * the expected way is reported rather than skipped.
 */
const SRC = readFileSync(join(WORK, '..', 'outputs', 'studio', 'tools-and-capture.js'), 'utf8');
const TABLE = (SRC.match(/export const CUT_LEVELS=\[([\s\S]*?)\n\];/) || [])[1];
if (!TABLE) {
  console.error('could not find CUT_LEVELS in studio/tools-and-capture.js — has it been renamed?');
  process.exit(1);
}
const levels = [];
/*
 * Split on the `{id:` boundary, not on blank lines. The first version split on
 * /\n\n/ and found ONE level in a table of eight: the working tree checks these
 * files out with CRLF endings, so there is no \n\n in the file anywhere, every
 * entry after the first went unchecked, and the run still printed a confident
 * pass over all nine citations. A structural boundary cannot be spelled with
 * whitespace. The count printed below is the guard against it happening again.
 */
for (const block of TABLE.split(/(?=\{id:')/)) {
  const id = (block.match(/^\{id:'([^']+)'/) || [])[1];
  if (!id) continue;
  const axis = (block.match(/axis:'([^']+)'/) || [])[1];
  const label = (block.match(/label:'([^']+)'/) || [])[1];
  const refs = [...block.matchAll(/\{ref:'([^']+)',\s*location:'([^']*)'\}/g)]
    .map((m) => ({ ref: m[1], location: m[2] }));
  /* the landmark keys the `at` expression measures from */
  const keys = [...block.matchAll(/'((?:thorax|spine|pelvis|wall|grid|skull)\.[A-Za-z0-9]+)'/g)].map((m) => m[1]);
  levels.push({ id, axis, label, refs, keys, block });
}
console.log(`${levels.length} named levels declared\n`);

let fails = 0;
const fail = (m) => { console.log('  !! ' + m); fails++; };

/* ------------------------------------------------------------------ *
 * The citations
 * ------------------------------------------------------------------ */
/* Identical to work/source-check.mjs on purpose — see the note there. */
const flat = (s) => String(s).toLowerCase()
  .replace(/[‘’“”]/g, "'")
  .replace(/[‐-―]/g, '-')
  .replace(/\s+/g, ' ').trim();

const TEXT = join(WORK, 'source-text.json');
const text = existsSync(TEXT) ? JSON.parse(readFileSync(TEXT, 'utf8')).sources : null;

console.log('— every level cites a real file, and the page says what it quotes —');
let cited = 0;
for (const L of levels) {
  if (!L.refs.length) {
    /* A level with no citation is only allowed if it makes no course claim.
       None currently do, so this is a failure rather than a warning. */
    fail(`${L.id}: no sourceRef — every named level is a claim about the course`);
    continue;
  }
  for (const r of L.refs) {
    if (!SOURCE_FILES[r.ref]) { fail(`${L.id}: ref "${r.ref}" is not in SOURCE_FILES`); continue; }
    const quote = (r.location.match(/"([^"]{4,})"/) || [])[1];
    const page = Number((r.location.match(/\bp\.?\s?(\d+)/i) || [])[1]);
    if (!quote) { fail(`${L.id}: citation "${r.location}" quotes nothing — a level must assert what its page says`); continue; }
    if (!page) { fail(`${L.id}: citation "${r.location}" names no page`); continue; }
    if (!text) { console.log(`  ?  ${L.id}: no source-text.json, cannot check "${quote}"`); continue; }
    const src = text[r.ref];
    if (!src) { console.log(`  ?  ${L.id}: ${r.ref} has no cached text (deliberately unshared source)`); continue; }
    const body = src.pages[page - 1];
    if (body && flat(body).includes(flat(quote))) {
      cited++;
      console.log(`  ok ${L.id.padEnd(16)} ${src.file} p${page}  "${quote}"`);
    } else {
      const found = src.pages.findIndex((p) => flat(p).includes(flat(quote)));
      fail(found >= 0
        ? `${L.id}: "${quote}" is on p${found + 1} of ${src.file}, not the p${page} it cites`
        : `${L.id}: "${quote}" is nowhere in ${src.file}`);
    }
  }
}
console.log(`  ${cited} citation(s) verified against the page they name\n`);

/* ------------------------------------------------------------------ *
 * The geometry
 * ------------------------------------------------------------------ */
const meshes = loadGlbMeshes('assets/z-anatomy-skeleton.glb');
const R = createResolver(meshes.map((m) => ({ name: m.name, layer: 'skeleton', mesh: m })));

const boundsFor = (key) => {
  const hits = R.resolve(key).meshes;
  if (!hits.length) return null;
  let minY = Infinity, maxY = -Infinity;
  for (const m of hits) {
    for (let i = 1; i < m.positions.length; i += 3) {
      const y = m.positions[i];
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return minY <= maxY ? { minY, maxY } : null;
};

console.log('— every landmark a level measures from resolves against the real GLB —');
for (const L of levels) {
  for (const k of L.keys) {
    const b = boundsFor(k);
    if (!b) fail(`${L.id}: landmark "${k}" resolves to no mesh in the skeleton layer`);
    else console.log(`  ok ${L.id.padEnd(16)} ${k.padEnd(22)} y ${b.minY.toFixed(3)} .. ${b.maxY.toFixed(3)}`);
  }
}
console.log('');

/* The same three measurements the app makes, reproduced here. */
const centre = (k) => { const b = boundsFor(k); return b ? (b.minY + b.maxY) / 2 : NaN; };
const top = (k) => { const b = boundsFor(k); return b ? b.maxY : NaN; };
const junction = (a, b) => {
  const up = boundsFor(a), lo = boundsFor(b);
  return up && lo ? (up.minY + lo.maxY) / 2 : NaN;
};
const AXIAL = [
  ['jugular', top('thorax.manubrium')],
  ['sternalAngle', junction('thorax.manubrium', 'thorax.sternumBody')],
  ['xiphisternal', junction('thorax.sternumBody', 'thorax.xiphoid')],
  ['transpyloric', centre('spine.L1')],
  ['transtubercular', centre('spine.L5')],
];

console.log('— the axial levels come out in anatomical order, superior to inferior —');
for (const [id, y] of AXIAL) {
  if (!Number.isFinite(y)) { fail(`${id}: does not measure`); continue; }
  console.log(`  ${id.padEnd(16)} y ${y.toFixed(4)}`);
}
for (let i = 1; i < AXIAL.length; i++) {
  const [aId, aY] = AXIAL[i - 1], [bId, bY] = AXIAL[i];
  if (Number.isFinite(aY) && Number.isFinite(bY) && !(aY > bY)) {
    fail(`${aId} (${aY.toFixed(4)}) is not above ${bId} (${bY.toFixed(4)})`);
  }
}
/* Every declared axial level must be in that ordered list, or the order check
   is quietly passing over a level nobody added to it. */
for (const L of levels.filter((x) => x.axis === 'axial')) {
  if (!AXIAL.some(([id]) => id === L.id)) fail(`axial level "${L.id}" is not in this check's order list`);
}
console.log('');

/*
 * The one claim that can be tested rather than merely quoted: the lecture puts
 * the sternal angle at "vertebral level of T4/T5", and the app measures it
 * from the manubriosternal junction without reference to any vertebra. If the
 * two agree, both the source and the measurement are right about this model.
 */
console.log('— the measured sternal angle sits at the vertebral level the lecture claims —');
const angle = junction('thorax.manubrium', 'thorax.sternumBody');
const t4 = boundsFor('spine.T4'), t5 = boundsFor('spine.T5');
if (!t4 || !t5) fail('T4 or T5 does not resolve, so the claim cannot be checked');
else {
  const lo = Math.min(t4.minY, t5.minY), hi = Math.max(t4.maxY, t5.maxY);
  console.log(`  sternal angle y ${angle.toFixed(4)}`);
  console.log(`  T4 y ${t4.minY.toFixed(4)} .. ${t4.maxY.toFixed(4)}`);
  console.log(`  T5 y ${t5.minY.toFixed(4)} .. ${t5.maxY.toFixed(4)}`);
  if (angle >= lo && angle <= hi) console.log(`  ok within the T4-T5 span (${lo.toFixed(4)} .. ${hi.toFixed(4)})`);
  else fail(`the junction at ${angle.toFixed(4)} is outside the T4-T5 span ${lo.toFixed(4)} .. ${hi.toFixed(4)}`);
}

console.log(fails ? `\n${fails} PROBLEM(S)` : '\nALL NAMED LEVELS CHECK OUT');
process.exit(fails ? 1 : 0);
