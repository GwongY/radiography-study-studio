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
 * Found exactly that mismatch on anatomy-data.js, hence this file. Phase 2 moved
 * the app's imports into studio.js / study.js and added a stylesheet the HTML
 * pulls in by <link>, so this now reads all three files and polices tag
 * references as well — and fails if it finds nothing, rather than passing on an
 * empty set.
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

/*
 * What the app imports, local modules only. Phase 2 moved the two module blocks
 * out of the HTML, so the imports now live in studio.js and study.js — scrape
 * all three. Anything the HTML pulls in by tag counts too: an unversioned
 * stylesheet in the shell is the same offline cache miss as an unversioned
 * import, and nothing else would catch it.
 */
const APP_FILES = ['radiography-study-studio.html', 'studio.js', 'study.js'];
const imports = new Set();
for (const f of APP_FILES) {
  if (!existsSync(join(root, f))) continue;
  for (const m of readFileSync(join(root, f), 'utf8')
    .matchAll(/from\s+'\.\/([A-Za-z0-9._-]+\.js(?:\?v=\d+)?)'/g)) imports.add(m[1]);
}

/* Tag references in the HTML: <link href> and <script src>, local only. */
const tagRefs = new Set();
for (const m of html.matchAll(/(?:href|src)="\.\/([A-Za-z0-9._-]+\.(?:js|css)(?:\?v=\d+)?)"/g)) {
  tagRefs.add(m[1]);
}

/* what the service worker precaches */
const shell = new Set();
for (const m of sw.matchAll(/'\.\/([A-Za-z0-9._/-]+(?:\?v=\d+)?)'/g)) shell.add(m[1]);

const bare = (s) => s.split('?')[0];

console.log('— every imported module is precached, query and all —');
/*
 * A check that finds nothing to check must not report success. Before phase 2
 * this scraped the HTML's inline modules; had the extraction landed without
 * this guard, `imports` would have been empty and the loop below would have
 * passed vacuously while every module fell out of the offline shell.
 */
ok(imports.size > 0, `found ${imports.size} local module imports across ${APP_FILES.join(', ')}`);
for (const imp of [...imports].sort()) {
  const hit = shell.has(imp);
  const near = [...shell].find((s) => bare(s) === bare(imp));
  ok(hit, hit ? imp
    : `${imp} is imported but the shell lists ${near ? `"${near}"` : 'nothing for it'} — offline cache miss`);
}

console.log('— every file the HTML references by tag is versioned and precached —');
ok(tagRefs.size > 0, `found ${tagRefs.size} local <link>/<script src> references`);
for (const ref of [...tagRefs].sort()) {
  ok(/\?v=\d+$/.test(ref), `${ref} carries a ?v= query`);
  const hit = shell.has(ref);
  const near = [...shell].find((s) => bare(s) === bare(ref));
  ok(hit, hit ? `${ref} is precached`
    : `${ref} is referenced but the shell lists ${near ? `"${near}"` : 'nothing for it'} — offline cache miss`);
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
