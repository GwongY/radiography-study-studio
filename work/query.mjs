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
 *   node work/query.mjs file  <term>    which source document on the drive
 *   node work/query.mjs where <term>    which folder on the drive holds them
 *   node work/query.mjs text  <term>    what the sources SAY, with file and page
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { STUDY_ITEMS } from '../outputs/study-data.js';

/*
 * The drive catalogue: 8,801 distinct documents across 46.9 GB of shared
 * folders. Read lazily and never printed whole — the point of `file` and
 * `where` is that a session stops walking Google Drive to find out what it
 * already knows. See work/build-source-catalogue.mjs.
 */
const WORK = dirname(fileURLToPath(import.meta.url));
let catalogue = null;
function drive() {
  if (catalogue) return catalogue;
  try { catalogue = JSON.parse(readFileSync(join(WORK, 'source-catalogue.json'), 'utf8')); }
  catch { catalogue = { roots: [], docs: [] }; }
  return catalogue;
}
/* Where a document lives, as "<shared folder>/<path below it>". */
const at = (c, [ri, p]) => `${ri < 0 ? '?' : c.roots[ri].split('/').pop()}/${p}`;
const MB = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

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
  file   <term>   which source document on the drive, and where its copies are
  where  <term>   which folders on the drive match, and how much is in them
  text   <term>   what the sources say, quoted with the file and page it is on

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
  case 'file': {
    const c = drive();
    if (!c.docs.length) { console.log('no catalogue — run: node work/build-source-catalogue.mjs'); break; }
    /* Match the filename first, then any path it lives at, so "past paper"
       finds the folder as readily as "Vocabulary.pdf" finds the file. */
    const rows = c.docs.filter((d) => hit(d.n) || d.at.some(([, p]) => hit(p)));
    console.log(`${rows.length} document(s) matching "${term}"\n`);
    show(rows, (d) => {
      console.log(`${d.n}  [${MB(d.b)}${d.code ? `, ${d.code}` : ''}${d.kind ? `, ${d.kind}` : ''}]`);
      for (const loc of d.at.slice(0, 3)) console.log(`    ${at(c, loc)}`);
      /* Copies matter: a session that opens one has opened all of them. */
      if (d.at.length > 3) console.log(`    … ${d.at.length - 3} more copies of the same file`);
    });
    break;
  }
  case 'where': {
    const c = drive();
    if (!c.docs.length) { console.log('no catalogue — run: node work/build-source-catalogue.mjs'); break; }
    /* Group by containing folder rather than by file, for "is there anything
       on X at all, and if so where do I look". */
    const folders = new Map();
    for (const d of c.docs) {
      for (const loc of d.at) {
        const full = at(c, loc);
        const dir = full.slice(0, full.lastIndexOf('/'));
        if (!hit(dir)) continue;
        const e = folders.get(dir) || { n: 0, b: 0 };
        e.n++; e.b += d.b;
        folders.set(dir, e);
      }
    }
    const rows = [...folders].sort((a, b) => b[1].n - a[1].n);
    console.log(`${rows.length} folder(s) matching "${term}"\n`);
    show(rows, ([dir, e]) => console.log(`  ${String(e.n).padStart(4)} docs  ${MB(e.b).padStart(8)}  ${dir}`));
    break;
  }
  case 'text': {
    /*
     * The one that replaces opening a PDF. Searches the cited sources first —
     * those are committed, so this works with the drive unmounted — then the
     * local cache if it has been built. A hit is quoted with the file and the
     * PAGE, because that is the shape every sourceRefs entry is written in.
     */
    const needle = term.toLowerCase();
    const hits = [];

    const cited = join(WORK, 'source-text.json');
    if (existsSync(cited)) {
      const { sources } = JSON.parse(readFileSync(cited, 'utf8'));
      for (const [id, s] of Object.entries(sources)) {
        s.pages.forEach((page, i) => {
          if (page.toLowerCase().includes(needle)) hits.push({ id, file: s.file, page: i + 1, page_text: page, cited: true });
        });
      }
    }

    /* The cache holds everything else, gzipped, one file per document. */
    const cache = join(WORK, '.source-text');
    const cacheIndex = join(cache, 'index.json');
    if (existsSync(cacheIndex)) {
      const index = JSON.parse(readFileSync(cacheIndex, 'utf8'));
      for (const [k, e] of Object.entries(index)) {
        if (!e.ok) continue;
        let text;
        try { text = gunzipSync(readFileSync(join(cache, `${k}.txt.gz`))).toString('utf8'); } catch { continue; }
        if (!text.toLowerCase().includes(needle)) continue;
        text.split('\f').forEach((page, i) => {
          if (page.toLowerCase().includes(needle)) hits.push({ id: null, file: e.n, page: i + 1, page_text: page, cited: false });
        });
      }
    }

    if (!hits.length && !existsSync(cited)) {
      console.log('no source text — run: node work/build-source-text.mjs');
      break;
    }
    /* Cited sources first: a claim should be sourced to something the corpus
       already registers, not to whatever else on the drive happens to say it. */
    hits.sort((a, b) => (b.cited - a.cited) || a.file.localeCompare(b.file) || a.page - b.page);
    console.log(`${hits.length} page(s) mentioning "${term}"\n`);
    show(hits, (h) => {
      /* One line of context around the hit, trimmed — the point is to locate
         the passage, not to reproduce the page. */
      const line = h.page_text.split('\n').find((l) => l.toLowerCase().includes(needle)) || '';
      const at = line.toLowerCase().indexOf(needle);
      const snippet = line.slice(Math.max(0, at - 60), at + needle.length + 60).trim();
      console.log(`${h.file}  p${h.page}${h.id ? `  [${h.id}]` : '  (uncited source)'}`);
      console.log(`    …${snippet}…`);
    });
    break;
  }
  default:
    usage();
}
