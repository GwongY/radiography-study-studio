/*
 * Data index check — is docs/DATA-INDEX.md what work/data-index.mjs would
 * generate right now?
 *
 * The map has codemap-check.mjs; without this its twin rots in silence. Add a
 * study item, a synonym or a COMPOSITE, or rebuild mesh-index.js, and every
 * count in DATA-INDEX.md is quietly wrong — while the whole point of that file
 * is that you can trust it INSTEAD of opening the 141 KB it summarises. A
 * summary nobody verifies is worse than no summary, because it is believed.
 *
 * It doubles as a corpus digest. The probe baselines freeze the geometry and
 * overlay engine; nothing froze the item counts, the subject tallies or the
 * NOT_MODELLED list, so a later split of study-data.js could alter content
 * while validateCorpus() still passed. This diff catches that.
 *
 * Usage: node work/data-index-check.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const norm = (s) => s.replace(/\r\n/g, '\n').trimEnd();

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

console.log('— the committed data index matches a fresh generation —');
const path = join(root, 'docs/DATA-INDEX.md');
if (!existsSync(path)) {
  ok(false, 'docs/DATA-INDEX.md does not exist — run: node work/data-index.mjs');
} else {
  let fresh = null;
  try {
    fresh = execFileSync(process.execPath, [join(root, 'work/data-index.mjs'), '--stdout'],
      { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch (err) {
    ok(false, `work/data-index.mjs failed: ${(err.stderr || err.message).split('\n')[0]}`);
  }
  if (fresh !== null) {
    ok(norm(fresh) === norm(readFileSync(path, 'utf8')),
      'docs/DATA-INDEX.md is current — if this fails, run: node work/data-index.mjs');
  }
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
