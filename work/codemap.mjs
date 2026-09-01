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

/*
 * The application itself, lifted out of the HTML in phase 2. These are listed
 * separately from the data modules: they are the code a session usually wants,
 * and they are the only outputs/*.js files that are not a data layer.
 */
const APP_JS = ['studio.js', 'study.js'];
const APP_CSS = 'app.css';

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
    else if (/<script\b[^>]*type="module"/.test(l)) {
      /* An external module tag names its file; only an inline block is a block
         of code this map should try to section. */
      const src = (l.match(/src="\.\/([^"?]+)/) || [])[1];
      label = src ? `loads ${src}` : (['studio', 'study'][moduleN++] || `module ${moduleN}`);
    }
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
const blocks = htmlBlocks(htmlLines);
const inlineModules = blocks.filter((b) => (b.label === 'studio' || b.label === 'study') && b.to > b.from);
const hasInlineCss = blocks.some((b) => b.label === 'CSS' && b.to > b.from);
const extracted = [...APP_JS, APP_CSS].filter((f) => existsSync(join(outputs, f)));

/*
 * The app's code must be accounted for SOMEWHERE — inline in the HTML, or in
 * the extracted files. If neither is true the map has quietly lost most of its
 * rows, so say it IN the map; codemap-check.mjs fails while this warning is
 * present, which makes the collapse impossible to commit unnoticed.
 */
const SPLIT_WARNING = 'WARNING — work/codemap.mjs needs updating.';
const accounted = extracted.length === 3 || (inlineModules.length === 2 && hasInlineCss);

p(`## \`outputs/${HTML}\` — ${htmlLines.length} lines`);
p();
if (!accounted) {
  /* Build the file list outside the template — nesting backticks inside a
     template literal that is itself emitting backticks is how you get a map
     that renders as one long code span. */
  const appList = [...APP_JS, APP_CSS].map((f) => '`' + f + '`').join(', ');
  p(`> **${SPLIT_WARNING}** The app's code is neither inline in the HTML nor in`);
  p(`> ${appList}. Teach the generator where it went — until then this map is`);
  p('> missing most of what makes it useful.');
  p();
}
const htmlTraps = trapCell(`outputs/${HTML}`);
if (htmlTraps) { p(`Traps: ${htmlTraps.replace(/<br>/g, ' · ')}`); p(); }
p('| Lines | Section |');
p('| --- | --- |');
/*
 * Account for EVERY line, not just the blocks. The markup between </head> and
 * the script tags — the nav rail, the five views, the dialogs — has no banners
 * in it. Leaving it out of a table headed "where everything is" tells a session
 * working on markup that there is nothing to find, which is worse than telling
 * it to grep.
 */
let cursor = 1;
for (const b of blocks) {
  if (b.from > cursor) p(`| ${cursor}–${b.from - 1} | markup — no banners, grep here |`);
  /* A one-line tag is not a block of code to section — sectioning it produces a
     bogus "· preamble" row for a line that only names a file. */
  if (b.from === b.to) p(`| ${b.from}–${b.to} | ${b.label} |`);
  else for (const r of sections(htmlLines, b.from, b.to, `${b.label} · `)) {
    p(`| ${r.from}–${r.to} | ${r.title} |`);
  }
  cursor = b.to + 1;
}
if (cursor <= htmlLines.length) p(`| ${cursor}–${htmlLines.length} | markup — no banners, grep here |`);
p();

/* ---- the application modules ---- */
const appPresent = APP_JS.filter((f) => existsSync(join(outputs, f)));
if (appPresent.length) {
  p('## The application — `outputs/studio.js`, `outputs/study.js`');
  p();
  p('The two module blocks that were inline in the HTML until phase 2. They keep');
  p('separate import scopes and talk only through `window.__osteo`.');
  p();
  if (existsSync(join(outputs, APP_CSS))) {
    const cssLines = linesOf(join(outputs, APP_CSS));
    const cssTraps = trapCell(`outputs/${APP_CSS}`);
    p(`\`outputs/${APP_CSS}\` — ${cssLines.length} lines.${cssTraps ? ` Traps: ${cssTraps.replace(/<br>/g, ' · ')}` : ''}`);
    p();
  }
  for (const f of appPresent) {
    const ls = linesOf(join(outputs, f));
    const t = trapCell(`outputs/${f}`);
    p(`**\`outputs/${f}\`** — ${ls.length} lines`);
    p();
    if (t) { p(`Traps: ${t.replace(/<br>/g, ' · ')}`); p(); }
    p('| Lines | Section |');
    p('| --- | --- |');
    for (const r of sections(ls, 1, ls.length, '')) p(`| ${r.from}–${r.to} | ${r.title} |`);
    p();
  }
}

/* ---- the data modules ---- */
/* studio.js and study.js are the app, not a data layer — they get their own
   section above, and listing them here would give them two homes in the map. */
const mods = readdirSync(outputs).filter((f) => f.endsWith('.js') && !APP_JS.includes(f)).sort();
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

/*
 * ---- the study system's parts ----
 * study.js is an entry point now; the code is in study/*.js. Without this the
 * map points at a 40-line list of imports and says nothing about where the
 * session engine or the reading help actually live.
 */
const studyDir = join(outputs, 'study');
const parts = existsSync(studyDir)
  ? readdirSync(studyDir).filter((f) => f.endsWith('.js')).sort() : [];
if (parts.length) {
  p('## The study system — `outputs/study/*.js`');
  p();
  p('`outputs/study.js` imports these in order, then calls their `init()`s.');
  p('They import each other cyclically, so nothing may run at module scope —');
  p('side effects belong in `init()`. See [TRAPS.md](TRAPS.md).');
  p();
  p('| File | Lines | What it holds |');
  p('| --- | --- | --- |');
  for (const f of parts) {
    const ls = linesOf(join(studyDir, f));
    p(`| \`${f}\` | ${ls.length} | ${headline(ls)} |`);
  }
  p();
}

/*
 * ---- the corpus ----
 * study-data.js is a barrel; readdirSync is not recursive, so without this the
 * seventeen files holding every lesson are invisible to a map whose whole
 * promise is "read this before grepping".
 */
const corpusDir = join(outputs, 'study', 'corpus');
const corpus = existsSync(corpusDir) ? readdirSync(corpusDir).filter((f) => f.endsWith('.js')).sort() : [];
if (corpus.length) {
  p('## The corpus — `outputs/study/corpus/*.js`');
  p();
  p('Every lesson lives here. `outputs/study-data.js` is a barrel that re-exports');
  p('these under the same 57 names, so importers never name these files.');
  p('To read one item without opening a file: `node work/query.mjs item <id>`.');
  p();
  p('| File | Lines | What it holds |');
  p('| --- | --- | --- |');
  for (const f of corpus) {
    const ls = linesOf(join(corpusDir, f));
    p(`| \`${f}\` | ${ls.length} | ${headline(ls)} |`);
  }
  p();
}

/* ---- the verifiers ---- */
p('## Verifiers and generators — `work/*.mjs`');
p();
/*
 * These carry traps too, and the sharpest ones: how a unit label is derived,
 * what ABSORB does, why the Martini eBook is excluded. Without the column a
 * session told to read the map first opens build-mesh-index.mjs and sees only
 * a one-line headline.
 */
p('| Script | What it does | Traps |');
p('| --- | --- | --- |');
for (const f of readdirSync(join(root, 'work')).filter((f) => f.endsWith('.mjs')).sort()) {
  p(`| \`work/${f}\` | ${headline(linesOf(join(root, 'work', f)))} | ${trapCell(`work/${f}`)} |`);
}
p();

const text = `${out.join('\n')}\n`;
if (process.argv.includes('--stdout')) process.stdout.write(text);
else {
  writeFileSync(join(root, 'docs/CODEMAP.md'), text, 'utf8');
  console.log(`docs/CODEMAP.md — ${text.split('\n').length} lines`);
}
