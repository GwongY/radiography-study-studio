/*
 * Does the studio actually expose everything the study system calls on it?
 *
 * The two halves of the app do not import each other. They talk through one
 * object, `window.__osteo`, built in outputs/studio/visualisation-modes.js and
 * called from twenty files under outputs/study/. Nothing checks that the two
 * agree, and nothing can at load time: a missing method is not a missing
 * import. It is `undefined`, and `undefined is not a function` only when a user
 * presses the button that needs it. binding-check covers imports WITHIN each
 * half; this covers the seam between them, which is the only other way a name
 * can go missing in a split app.
 *
 * ASK THE RUNTIME, NOT THE SOURCE
 *
 * The first version of this read the object literal with a regex and reported
 * four methods missing that were all plainly there — the same failure this
 * repo keeps rediscovering, in the very file written to prevent it. So it
 * imports studio.js under stubbed browser globals and reads the keys off the
 * object the code actually built. `window` has to be a REAL object for that:
 * load-check's absorb-anything Proxy swallows the assignment.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const WORK = dirname(fileURLToPath(import.meta.url));
const OUT = join(WORK, '..', 'outputs');

/* Absorbs any use — call it, construct it, read anything off it. */
function stub() {
  const fn = function () { return p; };
  const p = new Proxy(fn, {
    get: (t, k) => {
      if (k === Symbol.toPrimitive) return () => '{}';
      if (k === 'then') return undefined;      /* must not look thenable */
      if (k === Symbol.toStringTag) return 'Stub';
      return p;
    },
    apply: () => p, construct: () => p, set: () => true, has: () => true,
  });
  return p;
}

/* A real object underneath, so `window.__osteo = {...}` is still there after. */
const win = {};
globalThis.window = new Proxy(win, {
  get: (t, k) => (k in t ? t[k] : stub()),
  set: (t, k, v) => { t[k] = v; return true; },
  has: () => true,
});
for (const n of ['document', 'localStorage', 'sessionStorage', 'navigator', 'location',
  'requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia', 'indexedDB', 'caches', 'history',
  'customElements', 'getComputedStyle', 'HTMLElement', 'HTMLCanvasElement', 'CanvasRenderingContext2D',
  'Worker', 'Blob', 'AudioContext', 'OfflineAudioContext', 'THREE', 'alert', 'confirm', 'prompt',
  'ResizeObserver', 'IntersectionObserver', 'MutationObserver', 'Notification', 'fetch', 'scrollTo',
  'innerWidth', 'innerHeight', 'devicePixelRatio']) {
  if (!(n in globalThis)) { try { globalThis[n] = stub(); } catch { /* const globals */ } }
}

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

/* Load the studio half. Its module-scope work is deferred into init(), so this
   builds the bridge without needing a canvas. */
try {
  await import(pathToFileURL(join(OUT, 'studio.js')).href);
} catch (e) {
  console.log(`FAIL could not evaluate outputs/studio.js: ${String(e.message).slice(0, 120)}`);
  process.exit(1);
}

const bridge = win.__osteo;
console.log('— the studio builds its bridge —');
ok(bridge && typeof bridge === 'object', `window.__osteo exists (${bridge ? Object.keys(bridge).length : 0} names)`);
if (!bridge) { console.log('\n1 FAILED'); process.exit(1); }

const exposed = new Set(Object.keys(bridge));

/* Every __osteo.<name> the study half mentions, and where. */
const studyFiles = ['study.js', ...readdirSync(join(OUT, 'study'))
  .filter((f) => f.endsWith('.js')).map((f) => `study/${f}`)]
  .filter((f) => existsSync(join(OUT, f)));

const called = new Map();
for (const f of studyFiles) {
  for (const m of readFileSync(join(OUT, f), 'utf8').matchAll(/__osteo\.([A-Za-z_$][\w$]*)/g)) {
    if (!called.has(m[1])) called.set(m[1], new Set());
    called.get(m[1]).add(f);
  }
}

console.log('\n— every call the study system makes is answered —');
const missing = [...called].filter(([n]) => !exposed.has(n)).sort();
ok(!missing.length, `${called.size} distinct names called across ${studyFiles.length} files`);
for (const [name, where] of missing) {
  console.log(`       __osteo.${name} is called but the studio never defines it`);
  for (const w of where) console.log(`         outputs/${w}`);
}
fail += missing.length;

/* Not a failure — the bridge is also used from the HTML and the console — but
   a name nothing calls is usually a leftover, and worth seeing. */
const unused = [...exposed].filter((n) => !called.has(n)).sort();
if (unused.length) console.log(`\n  --   ${unused.length} exposed but not called from study/: ${unused.slice(0, 12).join(', ')}${unused.length > 12 ? ' …' : ''}`);

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
