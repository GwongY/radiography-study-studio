/*
 * Pages workflow check — every script .github/workflows/pages.yml runs exists.
 *
 *   node work/pages-workflow-check.mjs
 *
 * The workflow only runs on GitHub. A check deleted here that it still named
 * once broke the deploy and nothing local noticed.
 */
import { existsSync, readFileSync } from 'node:fs';

const yml = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
const named = [...new Set([...yml.matchAll(/node\s+(work\/[\w./-]+\.m?js)/g)].map((m) => m[1]))];
let fail = 0;
if (!named.length) { console.log('  FAIL no `node work/…` step found in pages.yml'); fail++; }
for (const f of named) {
  const here = existsSync(new URL(`../${f}`, import.meta.url));
  console.log(`  ${here ? 'ok  ' : 'FAIL'} ${f}`);
  if (!here) fail++;
}
console.log(fail ? `\n${fail} FAILED` : `\nALL PASS (${named.length} scripts)`);
process.exit(fail ? 1 : 0);
