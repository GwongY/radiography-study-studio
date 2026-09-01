/*
 * Figure key check — every published figure and plate a lesson shows carries an
 * `intro` and a `key`, and every `key` entry is well formed.
 *
 * The point of a figure on a lesson is to teach from it: an orientation line and
 * a key resolving every callout. This verifies that apparatus is present and
 * structurally sound. It does NOT judge the prose — that is a reading job — but
 * it catches the mechanical failures: a figure wired to a lesson with no intro,
 * an empty key, a key row missing its mark or name, a duplicate mark, a file
 * that does not exist on disk.
 *
 * Usage:  node work/figure-key-check.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIGURES, figureFor } from '../outputs/figures.js';
import { ITEM_VISUALS, PLATES } from '../outputs/visual-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');
let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL  ${m}`); };
const ok = (m) => console.log(`  ok  ${m}`);

/* Which FIGURES keys does a lesson actually render?
   - via sch('<id>') in ITEM_VISUALS where that id is a figure
   - via the labelled path: a type:'diagram' item whose id matches /vertebra/
     or /heart/ resolves to FIGURES.vertebra / FIGURES.heart */
const usedFigureIds = new Set();
for (const spec of Object.values(ITEM_VISUALS)) {
  if (spec && spec.kind === 'schematic' && FIGURES[spec.id]) usedFigureIds.add(spec.id);
}
const studyData = readFileSync(join(root, 'study-data.js'), 'utf8');
for (const m of studyData.matchAll(/type:\s*'diagram'/g)) {
  const before = studyData.slice(Math.max(0, m.index - 600), m.index);
  const idm = [...before.matchAll(/id:\s*'([^']+)'/g)].pop();
  const id = idm ? idm[1] : '';
  if (/vertebra/.test(id) && FIGURES.vertebra) usedFigureIds.add('vertebra');
  if (/heart/.test(id) && FIGURES.heart) usedFigureIds.add('heart');
}

/* Figures with no printed callouts at all (labels are outlined paths, or the
   image is a shape study). Intro required, key not. */
const NO_CALLOUTS = new Set(['heart']);

function checkEntry(label, e, { keyRequired = true } = {}) {
  if (typeof e.intro !== 'string' || !e.intro.trim()) fail(`${label}: no intro`);
  const hasKey = Array.isArray(e.key) && e.key.length > 0;
  if (!hasKey) {
    if (keyRequired) fail(`${label}: no key`);
    return;
  }
  const marks = new Set();
  e.key.forEach((row, i) => {
    if (!row || typeof row.mark !== 'string' || !row.mark.trim()) fail(`${label}: key[${i}] has no mark`);
    if (!row || typeof row.name !== 'string' || !row.name.trim()) fail(`${label}: key[${i}] has no name`);
    if (row && 'beyond' in row && typeof row.beyond !== 'boolean') fail(`${label}: key[${i}].beyond is not a boolean`);
    if (row && typeof row.mark === 'string') {
      const m = row.mark.toLowerCase();
      if (marks.has(m)) fail(`${label}: duplicate mark "${row.mark}"`);
      marks.add(m);
    }
  });
}

console.log('— every figure a lesson shows has intro (+ key) —');
for (const id of [...usedFigureIds].sort()) {
  const fig = FIGURES[id];
  checkEntry(`figure ${id}`, fig, { keyRequired: !NO_CALLOUTS.has(id) });
  if (!existsSync(join(root, 'assets', 'figures', fig.file))) fail(`figure ${id}: file assets/figures/${fig.file} missing`);
}
ok(`${usedFigureIds.size} figures checked`);

console.log('— every plate has intro + key —');
for (const item of Object.keys(PLATES).sort()) {
  const pl = PLATES[item];
  checkEntry(`plate ${item}`, pl);
  if (!existsSync(join(root, 'assets', 'plates', pl.file))) fail(`plate ${item}: file assets/plates/${pl.file} missing`);
}
ok(`${Object.keys(PLATES).length} plates checked`);

console.log('— unused FIGURES entries (informational) —');
for (const id of Object.keys(FIGURES)) {
  if (!usedFigureIds.has(id)) console.log(`  note  FIGURES.${id} is defined but no lesson renders it`);
}

/* figureFor() shape sanity */
const f = figureFor('bodyCavities');
if (!f || !f.src.startsWith('assets/figures/')) fail('figureFor() did not resolve a src path');

console.log(bad === 0 ? '\nALL PASS' : `\n${bad} FAILURES`);
process.exit(bad === 0 ? 0 : 1);
