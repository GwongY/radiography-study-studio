/*
 * Muscle zoom check — the zoom from a tapped muscle down to the sarcomere says
 * only what a 2026 slide says, and every label points at something drawn.
 *
 *   node work/muscle-zoom-check.mjs
 *
 * outputs/muscle-zoom.js names each level, each label and its one-line note.
 * Those are presented as course terms, so each cites a registered 2026 source
 * page and a quote; this holds every quote, every label name and every note
 * against the committed page text (work/source-text.json), the comparison
 * movement-check and revision-check use. It also holds each Revise link to a
 * real box, and each label to a part outputs/muscle/zoom-scene.js builds (read
 * from its PARTS export, which needs no three.js).
 */
import { readFileSync } from 'node:fs';
import { LEVELS, LABELS, CONTRACTION, ZOOM_SOURCES } from '../outputs/muscle-zoom.js';
import { PARTS } from '../outputs/muscle/zoom-scene.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { REVISION } from '../outputs/revision/registry.js';
import { normaliseCitationText as norm } from './lib/source-lesson-map.mjs';

let fail = 0;
const ok = (good, msg) => { if (!good) { console.log(`  FAIL ${msg}`); fail++; } else if (process.argv.includes('-v')) console.log(`  ok   ${msg}`); };
const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
const pageText = (c) => norm(((TEXT[c.ref] || { pages: [] }).pages[c.page - 1]) || '');

function checkCites(what, cite) {
  ok(Array.isArray(cite) && cite.length > 0, `${what}: cites at least one page`);
  for (const c of cite || []) {
    const src = SOURCE_FILES[c.ref];
    ok(!!src && ['HSS2011', 'ABCT2326'].includes(src.subject) && /\.2026$/.test(c.ref), `${what}: ${c.ref} is a registered 2026 core-course source`);
    ok(!!ZOOM_SOURCES[c.ref], `${what}: ${c.ref} has a short name for the cite line`);
    ok(pageText(c).includes(norm(c.match)), `${what}: "${c.match}" is on ${c.ref} p${c.page}`);
  }
}
/* a shown word is on one of the cited pages */
const onCited = (cite, words) => (cite || []).some((c) => pageText(c).includes(norm(words)));
/* a label written "Acetylcholine (ACh)" is on the page if it is there whole, or if both halves are */
const labelOnCited = (cite, l) => {
  const m = String(l).match(/^(.+) \((.+)\)$/);
  return onCited(cite, l) || (!!m && onCited(cite, m[1]) && onCited(cite, m[2]));
};
const boxes = new Map(Object.entries(REVISION).map(([s, sub]) => [s, new Set(sub.data.NODES.map((n) => n.id))]));
function checkRevise(what, revise) {
  for (const [subject, id] of revise || []) ok(!!boxes.get(subject) && boxes.get(subject).has(id), `${what}: Revise box ${subject} ${id} exists`);
}

console.log('— every level is a slide term, in a chain that reaches the sarcomere —');
const ids = new Set(LEVELS.map((l) => l.id));
ok(ids.size === LEVELS.length, `${LEVELS.length} levels, ids unique`);
for (const lv of LEVELS) {
  if (lv.title) { checkCites(`level ${lv.id}`, lv.cite); ok(labelOnCited(lv.cite, lv.title), `level ${lv.id}: "${lv.title}" is on a cited page`); }
  for (const k of ['next', 'side', 'back']) if (lv[k]) ok(ids.has(lv[k]), `level ${lv.id}: ${k} → ${lv[k]} exists`);
  ok(Array.isArray(LABELS[lv.id]), `level ${lv.id}: has a label list`);
}
{
  const seen = []; let at = LEVELS[0];
  while (at && !seen.includes(at.id)) { seen.push(at.id); at = at.next && LEVELS.find((l) => l.id === at.next); }
  ok(seen.at(-1) === 'sarcomere', `"Zoom in" walks ${seen.join(' → ')}`);
}

console.log('— every label, and every note, is on a page it cites —');
for (const [lvId, labels] of Object.entries(LABELS)) {
  ok(ids.has(lvId), `labels for level ${lvId}: the level exists`);
  ok(new Set(labels.map((x) => x.id)).size === labels.length, `${lvId}: label ids unique`);
  for (const x of labels) {
    const what = `${lvId}/${x.id}`;
    checkCites(what, x.cite);
    ok(labelOnCited(x.cite, x.l), `${what}: "${x.l}" is on a cited page`);
    if (x.note) ok(onCited(x.cite, x.note), `${what}: note "${x.note}" is on a cited page`);
    checkRevise(what, x.revise);
    ok(!!(PARTS[lvId] || []).includes(x.id), `${what}: zoom-scene.js builds a part for it`);
  }
  for (const p of PARTS[lvId] || []) ok(labels.some((x) => x.id === p), `${lvId}: built part "${p}" has a label`);
}

console.log('— the contraction slider says what p27 says —');
checkCites('contraction', CONTRACTION.cite);
for (const e of CONTRACTION.ends) ok(onCited(CONTRACTION.cite, e), `contraction: "${e}" is on a cited page`);
for (const l of CONTRACTION.levels) ok(ids.has(l), `contraction: level ${l} exists`);
checkRevise('contraction', CONTRACTION.revise);

const n = Object.values(LABELS).reduce((s, l) => s + l.length, 0);
console.log(fail ? `\n${fail} FAILED` : `\nALL PASS — ${LEVELS.length} levels, ${n} labels`);
process.exit(fail ? 1 : 0);
