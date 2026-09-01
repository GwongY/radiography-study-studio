/*
 * Shell check — every module the page imports is precached under the SAME
 * `?v=` query, and every module in the shell list actually exists.
 *
 * This is the failure CLAUDE.md warns about and that nothing enforced: a
 * module imported as `./anatomy-data.js?v=4` but listed in the service worker
 * as `./anatomy-data.js` is a different cache key, so the precache stores a
 * file the page never asks for and the page asks for a file that was never
 * stored. Everything works online and the module 404s offline — the one
 * condition this app is built for.
 *
 * Found exactly that mismatch on anatomy-data.js, hence this file.
 *
 * Usage: node work/shell-check.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');
const html = readFileSync(join(root, 'radiography-study-studio.html'), 'utf8');
const sw = readFileSync(join(root, 'sw.js'), 'utf8');

let fail = 0;
const ok = (cond, msg) => { console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) fail++; };

/* what the page imports, local modules only */
const imports = new Set();
for (const m of html.matchAll(/from\s+'\.\/([A-Za-z0-9._-]+\.js(?:\?v=\d+)?)'/g)) imports.add(m[1]);

/* what the service worker precaches */
const shell = new Set();
for (const m of sw.matchAll(/'\.\/([A-Za-z0-9._/-]+(?:\?v=\d+)?)'/g)) shell.add(m[1]);

const bare = (s) => s.split('?')[0];

console.log('— every imported module is precached, query and all —');
for (const imp of [...imports].sort()) {
  const hit = shell.has(imp);
  const near = [...shell].find((s) => bare(s) === bare(imp));
  ok(hit, hit ? imp
    : `${imp} is imported but the shell lists ${near ? `"${near}"` : 'nothing for it'} — offline cache miss`);
}

console.log('— every shell entry is a real file —');
for (const entry of [...shell].sort()) {
  if (entry === '' || entry.endsWith('/')) continue;
  ok(existsSync(join(root, bare(entry))), `${entry} exists`);
}

console.log('— the cache version moved —');
const ver = (sw.match(/CACHE_VERSION\s*=\s*'([^']+)'/) || [])[1];
ok(!!ver, `CACHE_VERSION is set (${ver})`);

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
