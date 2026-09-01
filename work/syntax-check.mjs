/*
 * Syntax-checks every inline <script type="module"> block in the app HTML, plus
 * the data modules, as real ES modules. A source is dynamic-imported from a
 * data: URL: a SyntaxError means the parse failed; ANY other error (unresolved
 * relative import, runtime throw) means the file parsed fine. Run:
 *   node work/syntax-check.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let failed = 0;

async function check(label, source) {
  const url = 'data:text/javascript;base64,' + Buffer.from(source, 'utf8').toString('base64');
  try {
    await import(url);
    console.log(`OK    ${label} (parsed, evaluated clean)`);
  } catch (e) {
    if (e instanceof SyntaxError) {
      failed++;
      console.log(`FAIL  ${label}: ${e.message}`);
    } else {
      console.log(`OK    ${label} (parsed; stopped at: ${e.code || e.constructor.name} — ${String(e.message).split('\n')[0].slice(0, 90)})`);
    }
  }
}

/*
 * The two application modules, wherever they live. Phase 2 extracted them to
 * studio.js / study.js; the inline fallback keeps older checkouts working.
 * Fewer than two is a failure — an empty match set used to exit 0 and report
 * ALL PARSED CLEAN having parsed nothing.
 */
const OUT = join(root, 'outputs');
const html = readFileSync(join(OUT, 'radiography-study-studio.html'), 'utf8');
const EXTRACTED = ['studio.js', 'study.js'];
const blocks = EXTRACTED.every((f) => existsSync(join(OUT, f)))
  ? EXTRACTED.map((f) => ({ label: `outputs/${f}`, src: readFileSync(join(OUT, f), 'utf8') }))
  : [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
      .map((m, i) => ({ label: `inline-module[${i}]`, src: m[1] }));
console.log(`application modules: ${blocks.length} (${blocks.map((b) => b.label).join(', ') || 'NONE'})`);
if (blocks.length < 2) { failed++; console.log(`FAIL  expected 2 application modules, found ${blocks.length}`); }
for (const b of blocks) await check(b.label, b.src);

for (const f of ['study-data.js', 'anatomy-data.js', 'term-notes.js', 'term-gloss.js', 'wordparts.js', 'bodymap.js', 'mesh-index.js', 'synonyms.js']) {
  try {
    await check(`outputs/${f}`, readFileSync(join(root, 'outputs', f), 'utf8'));
  } catch {
    console.log(`SKIP  outputs/${f} (not found)`);
  }
}

console.log(failed ? `\n${failed} PARSE FAILURE(S)` : '\nALL PARSED CLEAN');
process.exit(failed ? 1 : 0);
