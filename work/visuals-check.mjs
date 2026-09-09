/*
 * Visuals check — every entry in every item's `visuals` list resolves to
 * something real: a FIGURES id with a file on disk, a PLATES id, a SCHEMATICS
 * or layout id, a model spec whose layer is a known GLB, or gen. Shape is
 * validate.js's job (it runs in the browser too); this is the half that needs
 * the filesystem.
 *
 * `--selftest` feeds known-bad lists through the same resolver and asserts each
 * is caught, so a refactor that loosens the gate fails here.
 *
 * Usage:  node work/visuals-check.mjs [--selftest]
 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIGURES } from '../outputs/figures.js';
import { PLATES } from '../outputs/visual-data.js';
import { SCHEMATICS } from '../outputs/schematics.js';
import { LAYOUTS } from '../outputs/layouts.js';
import { STRUCTURE_MODELS, STUDY_ITEMS } from '../outputs/study-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');
let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL  ${m}`); };
const ok = (m) => console.log(`  ok  ${m}`);

const layoutIds = new Set(Object.keys(LAYOUTS || {}));
const schematicIds = new Set(Object.keys(SCHEMATICS || {}));
const layerKeys = new Set(Object.keys(STRUCTURE_MODELS || {}));

function resolveEntry(where, e) {
  const p = [];
  if (e.fig) {
    const f = FIGURES[e.fig];
    if (!f) p.push(`${where}: no FIGURES entry "${e.fig}"`);
    else if (!existsSync(join(root, 'assets', 'figures', f.file))) p.push(`${where}: figure file assets/figures/${f.file} missing`);
  } else if (e.plate) {
    if (!PLATES[e.plate]) p.push(`${where}: no PLATES entry "${e.plate}"`);
  } else if (e.schematic) {
    if (!schematicIds.has(e.schematic) && !layoutIds.has(e.schematic) && !FIGURES[e.schematic]) p.push(`${where}: "${e.schematic}" is not a schematic, layout or figure id`);
  } else if (e.model) {
    if (!layerKeys.has(e.model.layer)) p.push(`${where}: model layer "${e.model.layer}" is not a known GLB layer`);
  } else if (!e.gen) {
    p.push(`${where}: entry has no recognised key`);
  }
  return p;
}

if (process.argv.includes('--selftest')) {
  console.log('— selftest: known-bad entries must all be caught —');
  const cases = [
    ['unknown fig', { fig: 'definitely-not-a-figure' }],
    ['unknown fig with focus', { fig: 'definitely-not-a-figure', focus: ['Plasma membrane'] }],
    ['unknown plate', { plate: 'definitely-not-a-plate' }],
    ['unknown schematic', { schematic: 'definitely-not-a-schematic' }],
    ['unknown layer', { model: { layer: 'notALayer' } }],
    ['empty entry', {}],
  ];
  for (const [name, e] of cases) {
    const p = resolveEntry(`selftest ${name}`, e);
    if (!p.length) fail(`selftest "${name}" was NOT caught`);
    else ok(`selftest "${name}" caught: ${p[0]}`);
  }
  const scopedValid = resolveEntry('selftest valid scoped entry', { fig: 'cellAnatomy', focus: ['Plasma membrane'] });
  if (scopedValid.length) fail(`selftest valid scoped entry failed: ${scopedValid.join('; ')}`);
  else ok('selftest valid scoped entry resolves cleanly');
  console.log(bad === 0 ? '\nSELFTEST OK' : `\n${bad} SELFTEST FAILURES`);
  process.exit(bad === 0 ? 0 : 1);
}

console.log('— every visuals[] entry resolves —');
let items = 0;
let entries = 0;
for (const item of STUDY_ITEMS) {
  if (!Array.isArray(item.visuals) || !item.visuals.length) continue;
  items++;
  item.visuals.forEach((e, i) => {
    entries++;
    for (const prob of resolveEntry(`${item.id} visuals[${i}]`, e)) fail(prob);
  });
}
ok(`${items} items with visuals, ${entries} entries checked`);

console.log(bad === 0 ? '\nALL PASS' : `\n${bad} FAILURES`);
process.exit(bad === 0 ? 0 : 1);
