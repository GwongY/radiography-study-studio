/*
 * Code map generator — writes docs/CODEMAP.md. Do not edit that file by hand.
 *
 * The goal: a session should be able to find the 200 lines it needs without
 * reading anything larger than this map. It is built from the banner comments
 * that already section the code, so it cannot drift away from the source —
 * work/codemap-check.mjs regenerates and diffs on every edit.
 *
 * Usage: node work/codemap.mjs            # write docs/CODEMAP.md
 *        node work/codemap.mjs --stdout   # print it, write nothing
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputs = join(root, 'outputs');
const HTML = 'radiography-study-studio.html';

/* Generated files a session must never read. The map points at the summary. */
const GENERATED = new Map([['mesh-index.js', 'docs/DATA-INDEX.md']]);

/* Drop the trailing newline before splitting, or every count in the map is one
   too many and the last section row points at a line that does not exist. */
const linesOf = (p) => readFileSync(p, 'utf8').replace(/\r?\n$/, '').split(/\r?\n/);

/*
 * A banner sections the code: a rule line of dashes, then a title line.
 * Returns 1-based line numbers of the rule line.
 */
function banners(ls, from, to) {
  const out = [];
  for (let i = from - 1; i < to && i < ls.length; i++) {
    if (!/^\s*\/\*\s*-{4,}\s*\*\s*$/.test(ls[i])) continue;
    const t = ls[i + 1];
    if (!t || !/^\s*\*\s+\S/.test(t)) continue;
    out.push({ line: i + 1, title: t.replace(/^\s*\*\s*/, '').trim() });
  }
  return out;
}

/* Fill a block with contiguous ranges, so no line is unaccounted for. */
function sections(ls, from, to, prefix) {
  const bs = banners(ls, from, to);
  const rows = [];
  if (!bs.length || bs[0].line > from) {
    rows.push({ from, to: bs.length ? bs[0].line - 1 : to, title: `${prefix}preamble` });
  }
  bs.forEach((b, i) => {
    rows.push({ from: b.line, to: i + 1 < bs.length ? bs[i + 1].line - 1 : to, title: prefix + b.title });
  });
  return rows;
}

/*
 * Find the <style> and inline <script> blocks by scanning the tags. This
 * works ONLY while the CSS and the two module blocks are still inline in the
 * HTML. A later phase extracts them to app.css / studio.js / study.js; after
 * that this scan finds nothing to section and the caller emits a loud warning
 * into the map rather than shipping a map that lost most of its rows.
 */
function htmlBlocks(ls) {
  const blocks = [];
  let open = null, moduleN = 0;
  for (let i = 0; i < ls.length; i++) {
    const n = i + 1, l = ls[i];
    if (open) {
      if (/<\/(style|script)>/.test(l)) { open.to = n; blocks.push(open); open = null; }
      continue;
    }
    let label = null;
    if (/<style\b/.test(l)) label = 'CSS';
    else if (/<script\b[^>]*type="importmap"/.test(l)) label = 'importmap';
    else if (/<script\b[^>]*type="module"/.test(l)) label = ['studio', 'study'][moduleN++] || `module ${moduleN}`;
    else if (/<script\b/.test(l)) label = 'classic script';
    if (!label) continue;
    open = { label, from: n, to: n };
    if (/<\/(style|script)>/.test(l)) { blocks.push(open); open = null; }
  }
  return blocks;
}

function exportsOf(ls) {
  const out = [];
  for (const l of ls) {
    const m = l.match(/^export\s+(?:async\s+)?(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/);
    if (m) out.push(m[1]);
  }
  return out;
}

/*
 * What a file says it is: the first prose line of its leading block comment.
 * Handles both house forms — prose on the opening line (dev-server, glb-names)
 * and prose on the following ` * ` lines (the probes) — and never returns a
 * closing fragment (dev-server.mjs used to come out as a trailing "outages."
 * plus a comment terminator).
 */
function headline(ls) {
  for (let i = 0; i < Math.min(ls.length, 15); i++) {
    const open = ls[i].match(/^\s*\/\*+\s*(.*)$/);
    if (!open) continue;
    /* Prose on the opening line wins. */
    const first = open[1].replace(/\*\/\s*$/, '').trim();
    if (first && !/^-+$/.test(first)) return first.slice(0, 100);
    /* Otherwise the first prose line beneath it. */
    for (let j = i + 1; j < Math.min(ls.length, i + 15); j++) {
      const m = ls[j].match(/^\s*\*\s+(\S.*?)\s*$/);
      if (!m) continue;
      const t = m[1].replace(/\*\/\s*$/, '').trim();
      if (t && !/^-+$/.test(t)) return t.slice(0, 100);
    }
    return '';
  }
  return '';
}

/* A heading names files AND code identifiers; only the former get checked. */
const isPath = (s) => /^(outputs|work|docs|assets)\//.test(s) || /\.(mjs|js|html|css|md|json|glb)$/.test(s);

/*
 * file path -> every docs/TRAPS.md anchor whose heading names it.
 * The HTML is named by several sections (CSS, the studio block, visibility),
 * so this maps to a LIST — keeping only the last would silently point a
 * cavity edit at the CSS traps.
 *
 * The slug must match GitHub's own slugger: it turns EACH whitespace char
 * into a dash, so a stripped em-dash (` — ` -> `  `) becomes `--`. Collapsing
 * the run with \s+ gave a single dash and every trap link 404'd on the render.
 */
function trapAnchors() {
  const p = join(root, 'docs/TRAPS.md');
  const m = new Map();
  if (!existsSync(p)) return m;
  for (const l of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const h = l.match(/^###\s+(.+?)\s*$/);
    if (!h) continue;
    const slug = h[1].toLowerCase().replace(/`/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s/g, '-');
    const short = h[1].replace(/\s*—.*$/, '').replace(/`/g, '').trim();
    for (const f of h[1].matchAll(/`([^`]+)`/g)) {
      if (!isPath(f[1])) continue;
      if (!m.has(f[1])) m.set(f[1], []);
      m.get(f[1]).push({ slug, short });
    }
  }
  return m;
}

const traps = trapAnchors();
const trapCell = (rel) => {
  const list = traps.get(rel) || traps.get(`outputs/${rel}`) || [];
  return list.map((t) => `[${t.short}](TRAPS.md#${t.slug})`).join('<br>');
};

const out = [];
const p = (s = '') => out.push(s);

p('<!-- GENERATED by work/codemap.mjs — do not edit. Run the script instead. -->');
p('# Code map');
p();
p('Where everything is. **Read this before grepping.**');
p('Traps for a file live in [TRAPS.md](TRAPS.md) — follow the link in the Traps column.');
p();

/* ---- the HTML ---- */
const htmlLines = linesOf(join(outputs, HTML));
/*
 * A later phase moves the CSS to app.css and the two module blocks to
 * studio.js / study.js. When that lands this scan finds nothing to section
 * and the map quietly loses most of its rows — so say it IN the map.
 * codemap-check.mjs fails while this warning is present, which makes the
 * collapse impossible to commit unnoticed.
 */
const blocks = htmlBlocks(htmlLines);
const inlineModules = blocks.filter((b) => (b.label === 'studio' || b.label === 'study') && b.to > b.from);
const hasCss = blocks.some((b) => b.label === 'CSS' && b.to > b.from);
const SPLIT_WARNING = 'WARNING — work/codemap.mjs needs updating.';

p(`## \`outputs/${HTML}\` — ${htmlLines.length} lines`);
p();
if (inlineModules.length < 2 || !hasCss) {
  p(`> **${SPLIT_WARNING}** The inline blocks this map was built from are gone`);
  p('> (the CSS and/or the two module blocks moved to their own files). Teach the');
  p('> generator about the extracted files — until then this map is missing most');
  p('> of what makes it useful.');
  p();
}
/*
 * Several trap sections name the HTML (CSS, the studio block, visibility).
 * List them ONCE above the table — repeating them on all ~60 rows would cost
 * more to read than the map saves.
 */
const htmlTraps = trapCell(`outputs/${HTML}`);
if (htmlTraps) { p(`Traps: ${htmlTraps.replace(/<br>/g, ' · ')}`); p(); }
p('| Lines | Section |');
p('| --- | --- |');
for (const b of blocks) {
  for (const r of sections(htmlLines, b.from, b.to, `${b.label} · `)) {
    p(`| ${r.from}–${r.to} | ${r.title} |`);
  }
}
p();

/* ---- the data modules ---- */
const mods = readdirSync(outputs).filter((f) => f.endsWith('.js')).sort();
p('## Data modules — `outputs/*.js`');
p();
p('| File | Lines | What it holds | Traps |');
p('| --- | --- | --- | --- |');
for (const f of mods) {
  const ls = linesOf(join(outputs, f));
  const gen = GENERATED.get(f);
  const what = gen ? `**GENERATED — do not read, do not edit.** See \`${gen}\`, or ask: \`node work/query.mjs\`` : headline(ls);
  p(`| \`${f}\` | ${ls.length} | ${what} | ${trapCell(f)} |`);
}
p();

/* ---- exports, so a session can find a symbol without grepping ---- */
p('### Exported symbols');
p();
for (const f of mods) {
  if (GENERATED.has(f)) continue;
  const ex = exportsOf(linesOf(join(outputs, f)));
  if (!ex.length) continue;
  p(`- \`${f}\` — ${ex.map((e) => `\`${e}\``).join(', ')}`);
}
p();

/* ---- section maps for the modules big enough to carry banners ---- */
const sectioned = mods.filter((f) => !GENERATED.has(f))
  .map((f) => ({ f, ls: linesOf(join(outputs, f)) }))
  .filter(({ ls }) => banners(ls, 1, ls.length).length);
if (sectioned.length) {
  p('### Sections inside the larger modules');
  p();
  for (const { f, ls } of sectioned) {
    p(`**\`${f}\`** — ${ls.length} lines`);
    p();
    p('| Lines | Section |');
    p('| --- | --- |');
    for (const r of sections(ls, 1, ls.length, '')) p(`| ${r.from}–${r.to} | ${r.title} |`);
    p();
  }
}

/* ---- the verifiers ---- */
p('## Verifiers and generators — `work/*.mjs`');
p();
p('| Script | What it does |');
p('| --- | --- |');
for (const f of readdirSync(join(root, 'work')).filter((f) => f.endsWith('.mjs')).sort()) {
  p(`| \`work/${f}\` | ${headline(linesOf(join(root, 'work', f)))} |`);
}
p();

const text = `${out.join('\n')}\n`;
if (process.argv.includes('--stdout')) process.stdout.write(text);
else {
  writeFileSync(join(root, 'docs/CODEMAP.md'), text, 'utf8');
  console.log(`docs/CODEMAP.md — ${text.split('\n').length} lines`);
}
