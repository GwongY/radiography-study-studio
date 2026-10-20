/*
 * Codemap check — is docs/CODEMAP.md what work/codemap.mjs would generate
 * right now, and does docs/TRAPS.md still name files that exist?
 *
 * The map is only worth reading if it is true. Regenerating and diffing is
 * the cheapest way to guarantee that, and it makes the map safe to trust
 * without opening the files it describes.
 *
 * Usage: node work/codemap-check.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const norm = (s) => s.replace(/\r\n/g, '\n').trimEnd();

/* A heading names files AND code identifiers; only the former get checked. */
const isPath = (s) => /^(outputs|work|docs|assets)\//.test(s) || /\.(mjs|js|html|css|md|json|glb)$/.test(s);

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

console.log('— the committed map matches a fresh generation —');
const mapPath = join(root, 'docs/CODEMAP.md');
if (!existsSync(mapPath)) {
  ok(false, 'docs/CODEMAP.md does not exist — run: node work/codemap.mjs');
} else {
  let fresh = null;
  try {
    fresh = execFileSync(process.execPath, [join(root, 'work/codemap.mjs'), '--stdout'],
      { cwd: root, encoding: 'utf8' });
  } catch (err) {
    ok(false, `work/codemap.mjs failed: ${(err.stderr || err.message).split('\n')[0]}`);
  }
  if (fresh !== null) {
    ok(norm(fresh) === norm(readFileSync(mapPath, 'utf8')),
      'docs/CODEMAP.md is current — if this fails, run: node work/codemap.mjs');
  }
}

console.log('— every file docs/TRAPS.md governs still exists —');
const trapPath = join(root, 'docs/TRAPS.md');
if (!existsSync(trapPath)) {
  ok(false, 'docs/TRAPS.md does not exist');
} else {
  const heads = readFileSync(trapPath, 'utf8').split(/\r?\n/).filter((l) => /^###\s/.test(l));
  ok(heads.length > 0, `${heads.length} trap sections found`);
  for (const h of heads) {
    const paths = [...h.matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter(isPath);
    if (!paths.length) { ok(false, `no file named in heading: ${h.trim()}`); continue; }
    for (const p of paths) ok(existsSync(join(root, p)), `${p} (${h.replace(/^###\s*/, '').trim()})`);
  }
}

console.log('— the map has not silently collapsed —');
if (existsSync(mapPath)) {
  ok(!readFileSync(mapPath, 'utf8').includes('WARNING — work/codemap.mjs needs updating'),
    'the generator still finds the sections it maps — if this fails, teach work/codemap.mjs about the extracted files');
}

console.log('\u2014 the counts docs/LAYOUT.md states by hand are the counts on disk \u2014');
/*
 * docs/LAYOUT.md (until 2026-10-20 part of CLAUDE.md) has two numbers
 * kept by hand: how many parts study/ and studio/ are split into. Everything
 * around them is generated and checked, which is exactly why nobody noticed
 * when they rotted — 9 studio parts against 10. A number in a guide nobody
 * verifies is a number that is eventually wrong, and this one is read before
 * every edit.
 *
 * Counted from disk, not from prose.
 */
const countJs = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith('.js')).length;
const claude = readFileSync(join(root, 'docs', 'LAYOUT.md'), 'utf8');

const claims = [
  { what: 'study/ parts',  re: /The study system, (\d+) parts/,                  got: () => countJs('outputs/study') },
  { what: 'studio/ parts', re: /The 3D studio, (\d+) parts/,                     got: () => countJs('outputs/studio') },
];

for (const c of claims) {
  const stated = claude.match(c.re);
  if (!stated) { ok(false, `${c.what}: docs/LAYOUT.md no longer states this in the form this check reads`); continue; }
  const actual = c.got();
  if (actual === null) continue;
  const agree = Number(stated[1]) === actual;
  ok(agree, `${c.what}: docs/LAYOUT.md says ${stated[1]}, disk says ${actual}` +
    (agree ? '' : ' — fix the number in docs/LAYOUT.md'));
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
