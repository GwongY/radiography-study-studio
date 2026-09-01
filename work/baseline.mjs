/*
 * Probe baselines — capture what the verifiers say TODAY, so a later
 * restructure can prove it changed nothing.
 *
 * load-check and friends prove the modules LOAD. They do not prove the
 * overlays still MEASURE, which is what most of docs/TRAPS.md is a record of.
 * These baselines are the only safety net the restructure phases have, so a
 * probe that is not reproducible is excluded rather than trusted.
 *
 * Adding a 9th probe: append a PROBES row, run `node work/baseline.mjs` (no
 * --check), and commit the generated work/baselines/<name>.txt alongside it.
 *
 * stderr is deliberately discarded on the success path — the probes write
 * everything to stdout and signal via exit code, and folding stderr in would
 * drag Node deprecation warnings into the baselines. "Reproducible" here means
 * identical across two fresh processes ON THIS HOST; it is not a portability
 * claim across OS or CI.
 *
 * Usage: node work/baseline.mjs           # verify determinism, write baselines
 *        node work/baseline.mjs --check   # compare against committed baselines
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'work', 'baselines');
const CHECK = process.argv.includes('--check');

/* Probes that need only the repo. build-course-terms is excluded on purpose:
   it needs the Google Drive mount, so it cannot be a baseline. */
const PROBES = [
  ['search-probe', ['work/search-probe.mjs']],
  ['region-probe', ['work/region-probe.mjs']],
  ['figure-key-check', ['work/figure-key-check.mjs']],
  ['landmark-check', ['work/landmark-check.mjs']],
  ['cavity-probe', ['work/cavity-probe.mjs']],
  ['grid-probe', ['work/grid-probe.mjs']],
  ['grid-probe-all', ['work/grid-probe.mjs', '--all']],
  ['build-check', ['work/build-check.mjs']],
  /* Content, not geometry: the hash of every export and every study item.
     Captured before phase 3 split the corpus, so the split has to prove it
     moved no lesson wording, not merely no item counts. */
  ['corpus-snapshot', ['work/corpus-snapshot.mjs']],
  /* Words, not data: every sentence the interface can show. A rename that runs
     over a string literal moves this and nothing else. */
  ['ui-strings', ['work/ui-strings.mjs']],
];

/* Wall-clock timings and absolute paths differ between runs and machines.
   Blank them rather than dropping the line, so a vanished line still shows. */
function scrub(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\d+(\.\d+)?\s?ms\b/g, '<ms>')
    .replace(/\b\d{4}-\d{2}-\d{2}T[\d:.]+Z?\b/g, '<time>')
    .replace(new RegExp(root.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<root>')
    .replace(/[A-Za-z]:\\[^\s"']+/g, '<path>');
}

function run(args) {
  /* Script paths are repo-relative and must be absolute; flags pass through. */
  const argv = args.map((a) => (a.startsWith('-') ? a : join(root, a)));
  try {
    return scrub(execFileSync(process.execPath, argv, {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000,
      /* 1 MiB default would truncate err.stdout silently on ENOBUFS — exactly
         when a restructure makes a probe list many diffs. */
      maxBuffer: 64 * 1024 * 1024,
    }));
  } catch (err) {
    /* A probe that exits non-zero still has usable output — record it and say so.
       On the 300 s timeout status is null and signal is SIGTERM, so keep both. */
    return scrub(`${err.stdout || ''}${err.stderr || ''}\n[exit ${err.status}${err.signal ? ` ${err.signal}` : ''}]\n`);
  }
}

if (!CHECK) mkdirSync(dir, { recursive: true });

let fail = 0;
const note = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

console.log(CHECK ? '— baselines match —' : '— capturing baselines —');
for (const [name, args] of PROBES) {
  const file = join(dir, `${name}.txt`);
  const first = run(args);

  if (CHECK) {
    if (!existsSync(file)) { note(false, `${name}: no committed baseline`); continue; }
    const want = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    note(first === want, `${name}${first === want ? '' : ' — OUTPUT CHANGED'}`);
    continue;
  }

  const second = run(args);
  if (first !== second) { note(false, `${name}: not reproducible, excluded from the baseline set`); continue; }
  writeFileSync(file, first, 'utf8');
  note(true, `${name} (${first.split('\n').length} lines)`);
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
