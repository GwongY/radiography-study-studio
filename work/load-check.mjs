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
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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
  ? EXTRACTED.map((f) => ({ label: `outputs/${f}`, src: readFileSync(join(OUT, f), 'utf8') }))
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

const urls = new Map();
function moduleUrl(fname) {
  if (urls.has(fname)) return urls.get(fname);
  urls.set(fname, `PENDING(${fname})`); /* cycle guard */
  let src = readFileSync(join(OUT, fname), 'utf8');
  src = src.replace(/from\s+(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => `from ${q}${moduleUrl(spec.replace(/^\.\//, '').split('?')[0])}${q}`);
  src = src.replace(/import\(\s*(['"])(\.\/[^'"]+)\1\s*\)/g, (m, q, spec) => `import(${q}${moduleUrl(spec.replace(/^\.\//, '').split('?')[0])}${q})`);
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64');
  urls.set(fname, url);
  return url;
}

function classify(label, e) {
  const msg = String(e.message || '');
  if (e instanceof SyntaxError) return fail(`eval  ${label}: SyntaxError — ${msg}`);
  if (/before initialization|Cannot access/.test(msg)) return fail(`eval  ${label}: LOAD-TIME ERROR — ${msg}`);
  console.log(`OK    eval  ${label} (parsed fully; stopped on browser-only call: ${e.constructor.name}: ${msg.split('\n')[0].slice(0, 100)})`);
}

for (const b of blocks) {
  const src = b.src.replace(/from\s+(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => `from ${q}${moduleUrl(spec.replace(/^\.\//, '').split('?')[0])}${q}`);
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64');
  try { await import(url); console.log(`OK    eval  ${b.label} (ran to completion under stubs)`); }
  catch (e) { classify(b.label, e); }
}

console.log(failed ? `\n${failed} PROBLEM(S) — see FAIL lines` : '\nNO LOAD-TIME ERRORS FOUND');
process.exit(failed ? 1 : 0);
