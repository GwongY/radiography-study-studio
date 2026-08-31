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
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const norm = (s) => s.replace(/\r\n/g, '\n').trimEnd();

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
    const paths = [...h.matchAll(/`([^`]+)`/g)].map((m) => m[1])
      .filter((p) => /[./]/.test(p) && !p.includes(' '));
    if (!paths.length) { ok(false, `no file named in heading: ${h.trim()}`); continue; }
    for (const p of paths) ok(existsSync(join(root, p)), `${p} (${h.replace(/^###\s*/, '').trim()})`);
  }
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
