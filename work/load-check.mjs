/*
 * Load-time verification for radiography-study-studio.html.
 *
 * Stage 1 — parse: every inline <script type="module"> and every data module
 * must parse as a real ES module (dynamic-imported from a data: URL).
 *
 * Stage 2 — evaluate: the two inline modules are re-inlined with their
 * relative imports rewritten to data: URLs and evaluated in node with the
 * browser globals stubbed by absorb-anything proxies. The goal is to catch
 * load-time runtime errors — the temporal-dead-zone class that killed the app
 * on 2026-08-29 (a const referenced before its declaration line inside a
 * top-level object literal) which a parse-only check cannot see.
 *
 * Classification of stage-2 throws:
 *   SyntaxError, or "Cannot access 'X' before initialization"  -> FAIL
 *   "<Name> is not defined" / obvious missing-browser globals   -> tolerated
 * Run:  node work/load-check.mjs
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, normalize } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'outputs');
let failed = 0;
const fail = (msg) => { failed++; console.log(`FAIL  ${msg}`); };

/* ---------- stage 1: parse ---------- */
async function parseCheck(label, source) {
  const url = 'data:text/javascript;base64,' + Buffer.from(source, 'utf8').toString('base64');
  try {
    await import(url);
    console.log(`OK    parse ${label} (evaluated clean)`);
  } catch (e) {
    if (e instanceof SyntaxError) fail(`parse ${label}: ${e.message}`);
    else console.log(`OK    parse ${label} (parsed; ${e.code || e.constructor.name})`);
  }
}

/*
 * The two application modules. Phase 2 moved them out of the HTML into
 * studio.js and study.js; read them from there, falling back to the inline
 * blocks so this keeps working on older checkouts. Finding NEITHER is a
 * failure, not an empty pass — this check exists because a load-time death
 * shipped once, and a silent zero-module run would let the next one through.
 */
const html = readFileSync(join(OUT, 'radiography-study-studio.html'), 'utf8');
const EXTRACTED = ['studio.js', 'study.js'];
const blocks = EXTRACTED.every((f) => existsSync(join(OUT, f)))
  ? EXTRACTED.map((f) => ({ label: `outputs/${f}`, file: f, src: readFileSync(join(OUT, f), 'utf8') }))
  : [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
      .map((m, i) => ({ label: `inline-module[${i}]`, src: m[1] }));
console.log(`application modules: ${blocks.length} (${blocks.map((b) => b.label).join(', ') || 'NONE'})`);
if (blocks.length < 2) fail(`expected 2 application modules, found ${blocks.length} — the app moved and this check did not follow it`);
for (const b of blocks) await parseCheck(b.label, b.src);
for (const f of ['study-data.js', 'anatomy-data.js', 'visual-data.js', 'physiology.js', 'schematics.js', 'figures.js', 'layouts.js', 'wordparts.js', 'term-notes.js', 'term-gloss.js', 'bodymap.js']) {
  try { await parseCheck(`outputs/${f}`, readFileSync(join(OUT, f), 'utf8')); }
  catch { console.log(`SKIP  parse outputs/${f} (not found)`); }
}

/* ---------- stage 2: evaluate with stubbed browser ---------- */
function stub() {
  const fn = function () { return p; };
  const p = new Proxy(fn, {
    get: (t, k) => {
      if (k === Symbol.toPrimitive) return () => '{}';
      if (k === 'then') return undefined; /* must not look thenable */
      if (k === Symbol.toStringTag) return 'Stub';
      return p;
    },
    apply: () => p,
    construct: () => p,
    set: () => true,
    has: () => true,
  });
  return p;
}
for (const n of ['document', 'window', 'localStorage', 'sessionStorage', 'navigator', 'location',
  'requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia', 'indexedDB', 'caches', 'history',
  'customElements', 'getComputedStyle', 'HTMLElement', 'HTMLCanvasElement', 'CanvasRenderingContext2D',
  'Worker', 'Blob', 'AudioContext', 'OfflineAudioContext', 'THREE', 'alert', 'confirm', 'prompt',
  'ResizeObserver', 'IntersectionObserver', 'MutationObserver', 'Notification', 'fetch', 'scrollTo',
  'innerWidth', 'innerHeight', 'devicePixelRatio']) {
  if (!(n in globalThis)) { try { globalThis[n] = stub(); } catch { /* const globals can't be set */ } }
}

/*
 * Inline every relative import as a data: URL, depth first.
 *
 * Paths are relative to outputs/ with forward slashes, and a specifier is
 * resolved against the file that WROTE it. This used to strip a leading './'
 * and treat the rest as a filename in outputs/, which worked only while every
 * module was a sibling. Phase 3 put the corpus in study/corpus/, where
 * './structures.js' means study/corpus/structures.js and '../../anatomy-data.js'
 * did not match the pattern at all — the first crashed on ENOENT, the second
 * would have been left unresolved.
 */
const urls = new Map();
const rel = (dir, spec) => normalize(join(dir, spec.split('?')[0])).replace(/\\/g, '/');

function inline(src, dir) {
  return src
    .replace(/from\s+(['"])(\.\.?\/[^'"]+)\1/g, (m, q, spec) => `from ${q}${moduleUrl(rel(dir, spec))}${q}`)
    /*
     * A side-effect import — `import './parts/x.js';` — has no `from`, so the
     * rule above never sees it. An entry point that is nothing but a list of
     * these would be inlined to nothing at all and this check would report
     * NO LOAD-TIME ERRORS having evaluated an empty module. Found while trying
     * a barrel-of-side-effects split in phase 4.
     */
    .replace(/(^|\n)(\s*import\s+)(['"])(\.\.?\/[^'"]+)\3/g,
      (m, nl, kw, q, spec) => `${nl}${kw}${q}${moduleUrl(rel(dir, spec))}${q}`)
    .replace(/import\(\s*(['"])(\.\.?\/[^'"]+)\1\s*\)/g, (m, q, spec) => `import(${q}${moduleUrl(rel(dir, spec))}${q})`);
}

function moduleUrl(fname) {
  if (urls.has(fname)) return urls.get(fname);
  /*
   * The rewrites above are regexes over the raw text, so they also match an
   * example import written inside a COMMENT. Leaving the specifier alone when
   * nothing is there turns that into an ordinary unresolved-import message
   * instead of an ENOENT stack trace with no hint of which file to look at.
   */
  if (!existsSync(join(OUT, fname))) { urls.set(fname, `./${fname}`); return `./${fname}`; }
  urls.set(fname, `PENDING(${fname})`); /* cycle guard */
  const src = inline(readFileSync(join(OUT, fname), 'utf8'), dirname(fname));
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64');
  urls.set(fname, url);
  return url;
}

/*
 * Names the data modules export. A "<name> is not defined" for one of these is
 * a broken wiring — a split that forgot to pass a binding down — not a missing
 * browser global, and tolerating it let exactly that ship once: the study parts
 * used STORAGE_PREFIX from the entry module's imports without importing it, and
 * this check called it a browser-only call and passed.
 */
const dataExports = new Set();
for (const f of readdirSync(OUT).filter((n) => n.endsWith('.js'))) {
  const src = readFileSync(join(OUT, f), 'utf8');
  for (const m of src.matchAll(/^export\s+(?:async\s+)?(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/gm)) {
    dataExports.add(m[1]);
  }
  /* study-data.js is a barrel, so its whole surface is `export { … } from`. */
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const n of m[1].split(',')) {
      const name = n.trim().split(/\s+as\s+/).pop().trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name) && name !== 'default') dataExports.add(name);
    }
  }
}

function classify(label, e) {
  const msg = String(e.message || '');
  if (e instanceof SyntaxError) return fail(`eval  ${label}: SyntaxError — ${msg}`);
  if (/before initialization|Cannot access/.test(msg)) return fail(`eval  ${label}: LOAD-TIME ERROR — ${msg}`);
  const undef = (msg.match(/^([A-Za-z_$][\w$]*) is not defined$/) || [])[1];
  if (undef && dataExports.has(undef)) {
    return fail(`eval  ${label}: MISSING BINDING — ${undef} is exported by a data module but nothing here imports it`);
  }
  console.log(`OK    eval  ${label} (parsed fully; stopped on browser-only call: ${e.constructor.name}: ${msg.split('\n')[0].slice(0, 100)})`);
}

for (const b of blocks) {
  /*
   * Evaluate what actually ships. When the app is real files, import them from
   * disk — Node resolves the whole graph itself, query strings and all.
   *
   * The data: URL inlining below is only for the INLINE fallback, where there
   * is no file to import. It also cannot survive a large cyclic graph: each
   * module's base64 embeds its dependencies' base64, so phase 4's 24 mutually
   * importing parts blew up with "RangeError: Invalid string length" before
   * evaluating anything.
   */
  let url;
  if (b.file) url = pathToFileURL(join(OUT, b.file)).href;
  else url = 'data:text/javascript;base64,' + Buffer.from(inline(b.src, '.'), 'utf8').toString('base64');
  try { await import(url); console.log(`OK    eval  ${b.label} (ran to completion under stubs)`); }
  catch (e) { classify(b.label, e); }
}

console.log(failed ? `\n${failed} PROBLEM(S) — see FAIL lines` : '\nNO LOAD-TIME ERRORS FOUND');
process.exit(failed ? 1 : 0);
