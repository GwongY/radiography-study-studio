/*
 * Ask the data a question instead of reading the file.
 *
 * outputs/mesh-index.js is ~36K tokens and outputs/study-data.js ~120K. Almost
 * every reason to open either is a lookup that fits in twenty lines. This
 * answers those, so a session spends tens of tokens where it used to spend
 * tens of thousands.
 *
 * Usage:
 *   node work/query.mjs unit  <term>    what a tap selects, and what is in it
 *   node work/query.mjs mesh  <term>    index rows whose name matches
 *   node work/query.mjs item  <term>    study items by id, title or tag
 *   node work/query.mjs layer <key>     one layer's counts and its top units
 *   node work/query.mjs source <term>   which course file names a structure
 */
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { STUDY_ITEMS } from '../outputs/study-data.js';

const [cmd, ...rest] = process.argv.slice(2);
const term = rest.join(' ').trim();
const LIMIT = 25;

const usage = () => {
  console.log(`Usage: node work/query.mjs <command> <term>

  unit   <term>   what a tap selects, and every structure inside it
  mesh   <term>   index rows whose name matches
  item   <term>   study items by id, title or tag
  layer  <key>    one layer's counts and its largest units
  source <term>   which course file names a structure

Layers: ${[...new Set(MESH_INDEX.map((r) => r.layer))].sort().join(', ')}`);
  process.exit(1);
};

if (!cmd || (!term && cmd !== 'layer')) usage();
const hit = (s) => String(s || '').toLowerCase().includes(term.toLowerCase());

/* More matches than fit is normal for a broad term — say so rather than
   silently truncating, or the reader trusts a partial answer. */
const show = (rows, render) => {
  rows.slice(0, LIMIT).forEach(render);
  if (rows.length > LIMIT) console.log(`  … ${rows.length - LIMIT} more (narrow the term)`);
  if (!rows.length) console.log('  no match');
};

switch (cmd) {
  case 'unit': {
    const units = UNITS.filter((u) => hit(u.label));
    console.log(`${units.length} unit(s) matching "${term}"\n`);
    show(units, (u) => {
      const rows = MESH_INDEX.filter((r) => r.unitId === u.id);
      console.log(`${u.label}  [${u.layer}, ${u.kind}, ${u.size} structure(s)]`);
      for (const r of rows.slice(0, 12)) {
        console.log(`    ${r.name}${r.sides ? ` (${r.sides})` : ''}  tier ${r.tier}` +
          `${r.source ? `  ← ${r.source.file}` : ''}`);
      }
      if (rows.length > 12) console.log(`    … ${rows.length - 12} more structures`);
      console.log();
    });
    break;
  }
  case 'mesh': {
    const rows = MESH_INDEX.filter((r) => hit(r.name) || hit(r.mesh));
    console.log(`${rows.length} row(s) matching "${term}"\n`);
    show(rows, (r) => console.log(
      `${r.name}\n    layer ${r.layer}  mesh "${r.mesh}"  sides "${r.sides}"  tier ${r.tier}\n` +
      `    unit: ${r.unit} (${r.unitKind}, ${r.unitSize})${r.isUnit ? '  ← this row IS the unit' : ''}\n` +
      `    source: ${r.source ? `${r.source.file} [${r.source.subject}, ${r.source.evidence}]` : 'not named by the course'}\n`));
    break;
  }
  case 'item': {
    const items = STUDY_ITEMS.filter((i) => hit(i.id) || hit(i.title) || (i.tags || []).some(hit));
    console.log(`${items.length} item(s) matching "${term}"\n`);
    show(items, (i) => console.log(
      `${i.id}  ${i.title}\n    ${i.subject} / ${i.unit}  type ${i.type}\n` +
      `    ${(i.practice || []).length} question(s), ${(i.sourceRefs || []).length} source ref(s)` +
      `${(i.tags || []).length ? `\n    tags: ${i.tags.join(', ')}` : ''}\n`));
    break;
  }
  case 'layer': {
    const layers = [...new Set(MESH_INDEX.map((r) => r.layer))].sort();
    if (!term) { console.log(`Layers: ${layers.join(', ')}`); break; }
    const rows = MESH_INDEX.filter((r) => r.layer === term);
    if (!rows.length) { console.log(`no layer "${term}". Layers: ${layers.join(', ')}`); break; }
    const units = UNITS.filter((u) => u.layer === term).sort((a, b) => b.size - a.size);
    console.log(`${term}: ${rows.length} structures, ${rows.filter((r) => r.tier === 0).length} course-named, ${units.length} units\n`);
    console.log('largest units:');
    for (const u of units.slice(0, 15)) console.log(`  ${String(u.size).padStart(4)}  ${u.label}  [${u.kind}]`);
    break;
  }
  case 'source': {
    const rows = MESH_INDEX.filter((r) => r.source && (hit(r.name) || hit(r.source.file)));
    console.log(`${rows.length} sourced row(s) matching "${term}"\n`);
    show(rows, (r) => console.log(`${r.name.padEnd(44)} ${r.source.file}  [${r.source.subject}, ${r.source.evidence}]`));
    break;
  }
  default:
    usage();
}
