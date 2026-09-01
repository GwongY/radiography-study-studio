/*
 * Which names does a module declare at TOP level? Ask Node, not the indentation.
 *
 * outputs/studio.js writes its top level at two different columns: 94 functions
 * sit at column 0 (so their bodies sit at indent 2), while `const els` and
 * `const state` — the two objects every section uses — sit at indent 2
 * themselves, alongside 382 nested locals at the same column. No column rule can
 * separate top-level from first-level-nested there, and a brace counter is
 * defeated by the multi-line template literals this file is full of.
 *
 * So use the only parser already in the room. Appending `export { name };` to a
 * module is a LINK-time error if `name` is not a top-level binding:
 *
 *     SyntaxError: Export 'foo' is not defined in module
 *
 * Start with every candidate, drop whichever name the error blames, repeat. What
 * survives is exactly the top-level set, decided by V8 rather than by a regex.
 *
 * The probe is written next to the real file so its relative imports resolve;
 * it is deleted afterwards even if the run throws.
 *
 * Usage: node work/toplevel.mjs outputs/studio.js
 *        node work/toplevel.mjs outputs/studio.js --json
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const target = process.argv[2];
if (!target) { console.error('usage: node work/toplevel.mjs <file.js> [--json]'); process.exit(2); }
const src = readFileSync(target, 'utf8');
const dir = dirname(target);
const probe = join(dir, `__toplevel_probe_${process.pid}.js`);

/* Every identifier declared anywhere, at any depth — the candidate set. */
const candidates = new Set();
for (const m of src.matchAll(/(?:^|\n)\s*(?:export\s+)?(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)) {
  candidates.add(m[1]);
}
/* Imported names are top-level bindings too, and the split needs them listed. */
for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from/g)) {
  for (const n of m[1].split(',')) {
    const name = n.trim().split(/\s+as\s+/).pop().trim();
    if (/^[A-Za-z_$][\w$]*$/.test(name)) candidates.add(name);
  }
}

/*
 * Browser globals, so evaluation gets far enough to be uninteresting. Link
 * errors are raised before any of the body runs, so this only reduces noise.
 */
for (const n of ['document', 'window', 'localStorage', 'navigator', 'location', 'requestAnimationFrame',
  'matchMedia', 'getComputedStyle', 'fetch', 'history', 'caches', 'ResizeObserver', 'IntersectionObserver',
  'MutationObserver', 'innerWidth', 'innerHeight', 'devicePixelRatio', 'scrollTo', 'alert', 'confirm',
  'Worker', 'Blob', 'customElements', 'HTMLElement', 'sessionStorage', 'indexedDB', 'Notification']) {
  if (!(n in globalThis)) {
    const p = new Proxy(function () { return p; }, {
      get: (t, k) => (k === 'then' ? undefined : p), apply: () => p, construct: () => p,
      set: () => true, has: () => true,
    });
    try { globalThis[n] = p; } catch { /* some globals are read-only */ }
  }
}

let names = [...candidates].sort();
const rejected = [];
let round = 0;
try {
  for (;;) {
    round++;
    writeFileSync(probe, `${src}\nexport { ${names.join(', ')} };\n`, 'utf8');
    let err = null;
    try {
      /* A fresh query each round, or the module cache returns the first result. */
      await import(`${pathToFileURL(probe).href}?r=${round}`);
    } catch (e) { err = e; }
    if (!err) break;
    const bad = (String(err.message).match(/Export '([^']+)' is not defined in module/) || [])[1];
    if (!bad) break;              /* a runtime throw: linking already succeeded */
    rejected.push(bad);
    names = names.filter((n) => n !== bad);
  }
} finally {
  if (existsSync(probe)) unlinkSync(probe);
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(names));
} else {
  console.log(`${basename(target)}: ${names.length} top-level names (${rejected.length} candidates were nested)`);
  for (const n of names) console.log(`  ${n}`);
}
