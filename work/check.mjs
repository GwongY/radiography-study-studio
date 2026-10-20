/*
 * Every check that runs without a browser, the source drive or Python — once.
 *
 *   node work/check.mjs            # run them all; exit 1 if any fails
 *   node work/check.mjs --list     # print the list and stop
 *   node work/check.mjs shell bind # only the checks whose name contains a word
 *
 * This is the "after every edit" list, and it is what .github/workflows/pages.yml
 * runs before publishing. Four checks went red unnoticed because nothing ran
 * them; a check that is not listed here is a check nobody runs, so add new ones
 * to CHECKS (pages-workflow-check.mjs confirms every script named here exists).
 *
 * Left out on purpose:
 *   - the probes that baseline.mjs already runs and compares (search-probe,
 *     region-probe, system-check, gloss-coverage-check, landmark-check,
 *     cavity-probe, grid-probe and --all, build-check, ui-strings): baseline
 *     runs each one and fails if its output moved, so listing them again would
 *     run them twice;
 *   - doc-text-check (needs Python with pdf/docx/pptx readers and the drive);
 *   - the generators that read the source drive (build-course-terms,
 *     build-source-catalogue, build-source-text) and the --write generators;
 *   - work/*-browser-check.js, which run inside a page (see each file's header).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* [name, script, ...args]. Roughly cheapest and most fundamental first. */
export const CHECKS = [
  ['load', 'work/load-check.mjs'],
  ['syntax', 'work/syntax-check.mjs'],
  ['undef', 'work/undef-check.mjs'],
  ['binding', 'work/binding-check.mjs'],
  ['bridge', 'work/bridge-check.mjs'],
  ['shell', 'work/shell-check.mjs'],
  ['pages-workflow', 'work/pages-workflow-check.mjs'],
  ['codemap', 'work/codemap-check.mjs'],
  ['data-index', 'work/data-index-check.mjs'],
  ['revision', 'work/revision-check.mjs'],
  ['revise-pure', 'work/revise-pure-check.mjs'],
  ['today-navigation', 'work/today-navigation-check.mjs'],
  ['schedule', 'work/schedule-check.mjs'],
  ['assessment', 'work/assessment-check.mjs'],
  ['viewport', 'work/viewport-check.mjs'],
  ['text-size', 'work/text-size-check.mjs'],
  ['reading-help-priority', 'work/reading-help-priority-check.mjs'],
  ['source', 'work/source-check.mjs'],
  ['programme', 'work/programme-check.mjs'],
  ['source-resolve', 'work/source-resolve-check.mjs'],
  ['viewer-lecture-names-build', 'work/build-viewer-lecture-names.mjs', '--check'],
  ['viewer-lecture-names', 'work/viewer-lecture-names-check.mjs'],
  ['bone-landmarks-build', 'work/build-bone-landmarks.mjs', '--check'],
  ['bone-landmarks', 'work/bone-landmark-check.mjs'],
  ['cut-level', 'work/cut-level-check.mjs'],
  ['muscle-zoom', 'work/muscle-zoom-check.mjs'],
  ['cell-zoom', 'work/cell-zoom-check.mjs'],
  ['separation', 'work/separation-check.mjs'],
  ['full-atlas', 'work/full-atlas-check.mjs'],
  ['heart-atlas', 'work/heart-atlas-check.mjs'],
  ['limb', 'work/limb-check.mjs'],
  ['radiography', 'work/radiography-check.mjs'],
  ['search-accuracy', 'work/search-accuracy-check.mjs'],
  ['physiology-path', 'work/physiology-path-check.mjs'],
  ['physiology-path-deform', 'work/physiology-path-deform-check.mjs'],
  ['physiology-path-model', 'work/physiology-path-model-check.mjs'],
  ['physiology-shape', 'work/physiology-shape-check.mjs'],
  ['physiology-heart', 'work/physiology-heart-check.mjs'],
  ['physiology-breathing', 'work/physiology-breathing-check.mjs'],
  ['physiology-muscle', 'work/physiology-muscle-check.mjs'],
  ['physiology-mechanics', 'work/physiology-mechanics-check.mjs'],
  ['physiology-motion-preference', 'work/physiology-motion-preference-check.mjs'],
  /* Last: re-runs the probes listed above and compares their output. */
  ['baseline', 'work/baseline.mjs', '--check'],
];

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes('--list')) {
    for (const [name, script, ...rest] of CHECKS) console.log(`${name.padEnd(30)} node ${[script, ...rest].join(' ')}`);
    process.exit(0);
  }
  const words = args.filter((a) => !a.startsWith('-'));
  const chosen = words.length ? CHECKS.filter(([name]) => words.some((w) => name.includes(w))) : CHECKS;
  const ci = !!process.env.GITHUB_ACTIONS;
  const failed = [];
  const started = Date.now();
  for (const [name, script, ...rest] of chosen) {
    if (!existsSync(join(root, script))) { console.log(`FAIL ${name} — ${script} does not exist`); failed.push(name); continue; }
    const t = Date.now();
    const r = spawnSync(process.execPath, [script, ...rest], { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    const secs = ((Date.now() - t) / 1000).toFixed(1);
    if (r.status === 0) { console.log(`ok   ${name} (${secs}s)`); continue; }
    failed.push(name);
    if (ci) console.log(`::group::FAIL ${name}`);
    console.log(`FAIL ${name} (${secs}s) — node ${[script, ...rest].join(' ')}`);
    const out = `${r.stdout || ''}${r.stderr || ''}`.trimEnd().split('\n');
    /* The lines that say what failed, else the tail of the output. */
    const said = out.filter((l) => /FAIL|Error|error|✖|MISSING|differ|CHANGED/.test(l));
    console.log((said.length ? said.slice(0, 40) : out.slice(-40)).map((l) => `     ${l}`).join('\n'));
    if (ci) console.log('::endgroup::');
    if (ci) console.log(`::error title=${name}::node ${[script, ...rest].join(' ')} failed`);
  }
  const total = ((Date.now() - started) / 1000).toFixed(0);
  console.log(failed.length
    ? `\n${failed.length} of ${chosen.length} FAILED (${total}s): ${failed.join(', ')}`
    : `\nALL ${chosen.length} PASS (${total}s)`);
  process.exit(failed.length ? 1 : 0);
}
