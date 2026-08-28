/*
 * Syntax-checks every inline <script type="module"> block in the app HTML, plus
 * the data modules, as real ES modules. A source is dynamic-imported from a
 * data: URL: a SyntaxError means the parse failed; ANY other error (unresolved
 * relative import, runtime throw) means the file parsed fine. Run:
 *   node work/syntax-check.mjs
 */
import { readFileSync } from 'node:fs';
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

const html = readFileSync(join(root, 'outputs', 'radiography-study-studio.html'), 'utf8');
const blocks = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
console.log(`inline module scripts: ${blocks.length}`);
for (const [i, s] of blocks.entries()) await check(`inline-module[${i}]`, s);

for (const f of ['study-data.js', 'anatomy-data.js', 'term-notes.js', 'term-gloss.js', 'wordparts.js']) {
  try {
    await check(`outputs/${f}`, readFileSync(join(root, 'outputs', f), 'utf8'));
  } catch {
    console.log(`SKIP  outputs/${f} (not found)`);
  }
}

console.log(failed ? `\n${failed} PARSE FAILURE(S)` : '\nALL PARSED CLEAN');
process.exit(failed ? 1 : 0);
