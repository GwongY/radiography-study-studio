# Session context cost — phases 0 and 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut what every new session pays to orient itself in this repo — from ~7K always-on tokens plus a 5–20K grep-and-read orientation, down to a ~2K map read — without moving a single line of application code.

**Architecture:** Three additions and one rewrite. `work/codemap.mjs` generates `docs/CODEMAP.md` from the banner comments that already section the code, so the map cannot drift. `docs/TRAPS.md` receives the area-specific traps currently sitting in `CLAUDE.md`, organised by the file they govern, so a session pays for them only when it opens that file. `work/query.mjs` lets a session *ask* the large generated data files instead of reading them. `CLAUDE.md` shrinks to what is true for every session plus pointers to the other two. Zero changes to `outputs/*.js` and `outputs/radiography-study-studio.html`, so no `CACHE_VERSION` bump and no shell risk in this phase.

**Tech Stack:** Plain Node ESM (`.mjs`, node v24, no package.json, no dependencies), following the existing `work/*.mjs` verifier idiom: print sections, count failures, `process.exit(fail ? 1 : 0)`.

---

## Context the implementer needs

Read `docs/superpowers/specs/2026-08-31-session-context-cost-design.md` first. Key facts:

- There is **no test framework**. "Tests" in this repo are `work/*.mjs` scripts that
  import the real modules, print `ok`/`FAIL` lines, and exit non-zero on failure.
  Follow that idiom exactly — see `work/region-probe.mjs` for the house style.
- **No build step, no dependencies.** Everything runs as `node work/<script>.mjs`.
- Paths from `work/` reach the app as `../outputs/<file>`.
- Exact block boundaries in `outputs/radiography-study-studio.html` (7,957 lines):

  | Lines | What |
  | --- | --- |
  | 19–765 | `<style>` — all app CSS |
  | 1082 | `<script type="importmap">` — one line |
  | 1083–4488 | `<script type="module">` — block 0, the 3D studio |
  | 4489–7935 | `<script type="module">` — block 1, the study system |
  | 7936–7955 | `<script>` — classic, service-worker registration |

- A **banner** sections the code and looks like this (this is what the generator scans for):

  ```
  /* ------------------------------------------------------------------ *
   * Storage — versioned keys, one-time migration from the osteology app
  ```

- `outputs/mesh-index.js` is **generated** — 1,686 structure rows resolving to 787
  units (`{course: 619, group: 158, lone: 10}`). Never edit it.
- `outputs/study-data.js` holds 94 study items across 6 subjects.

## File Structure

| File | Status | Responsibility |
| --- | --- | --- |
| `work/codemap.mjs` | create | Generate `docs/CODEMAP.md` from banners + exports |
| `work/codemap-check.mjs` | create | Fail if the committed map differs from a fresh generation, or if `docs/TRAPS.md` names a file that does not exist |
| `work/data-index.mjs` | create | Generate `docs/DATA-INDEX.md` — what is in the generated data files, without reading them |
| `work/query.mjs` | create | CLI: ask the index and the corpus questions instead of reading them |
| `work/baseline.mjs` | create | Run each probe twice, prove determinism, write `work/baselines/*.txt` |
| `work/baselines/*.txt` | create | Committed probe output, the safety net for phases 2–5 |
| `docs/CODEMAP.md` | create | **Generated.** The map. |
| `docs/DATA-INDEX.md` | create | **Generated.** The data summary. |
| `docs/TRAPS.md` | create | Hand-written. Area-specific traps, keyed by file. |
| `CLAUDE.md` | rewrite | 364 → ~120 lines. Always-true rules + pointers. |

---

## Task 1: Prove the probes are deterministic, and capture baselines

Phases 2–5 diff against these. A baseline that changes run to run is worse than
no baseline, because it trains the reader to ignore the diff.

**Files:**
- Create: `work/baseline.mjs`
- Create: `work/baselines/` (populated by the script)

- [ ] **Step 1: Write `work/baseline.mjs`**

```js
/*
 * Probe baselines — capture what the verifiers say TODAY, so a later
 * restructure can prove it changed nothing.
 *
 * load-check and friends prove the modules LOAD. They do not prove the
 * overlays still MEASURE, which is what most of docs/TRAPS.md is a record of.
 * These baselines are the only safety net the restructure phases have, so a
 * probe that is not reproducible is excluded rather than trusted.
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
    }));
  } catch (err) {
    /* A probe that exits non-zero still has usable output — record it and say so. */
    return scrub(`${err.stdout || ''}${err.stderr || ''}\n[exit ${err.status}]\n`);
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
```

- [ ] **Step 2: Run it and see which probes actually work**

Run: `node work/baseline.mjs`

Expected: a line per probe. Some GLB-dependent probes (`cavity-probe`,
`grid-probe`, `build-check`, `landmark-check`) may take a minute each.

**If a probe reports "not reproducible", do not try to fix the probe in this
task.** Remove it from `PROBES`, add a one-line comment above the array saying
which probe was excluded and why, and note it in the commit message. Making a
probe deterministic is a separate change with its own risk.

- [ ] **Step 3: Verify the baselines are stable**

Run: `node work/baseline.mjs --check`

Expected: `ALL PASS`, one `ok` line per captured probe.

- [ ] **Step 4: Commit**

```bash
git add work/baseline.mjs work/baselines
git commit -m "test(baselines): record what the probes say before anything moves

load-check proves the modules load, not that the overlays measure. These
are the only safety net the restructure phases have.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: The codemap check, written before the generator

**Files:**
- Create: `work/codemap-check.mjs`

- [ ] **Step 1: Write the failing check**

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node work/codemap-check.mjs`

Expected: FAIL — `docs/CODEMAP.md does not exist` and `docs/TRAPS.md does not exist`, then `2 FAILED`.

- [ ] **Step 3: Commit the failing check**

```bash
git add work/codemap-check.mjs
git commit -m "test(codemap): the map must match a fresh generation

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: The codemap generator

**Files:**
- Create: `work/codemap.mjs`
- Create: `docs/CODEMAP.md` (generated output, committed)

- [ ] **Step 1: Write the generator**

```js
/*
 * Code map generator — writes docs/CODEMAP.md. Do not edit that file by hand.
 *
 * The goal: a session should be able to find the 200 lines it needs without
 * reading anything larger than this map. It is built from the banner comments
 * that already section the code, so it cannot drift away from the source —
 * work/codemap-check.mjs regenerates and diffs on every edit.
 *
 * Usage: node work/codemap.mjs            # write docs/CODEMAP.md
 *        node work/codemap.mjs --stdout   # print it, write nothing
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputs = join(root, 'outputs');
const HTML = 'radiography-study-studio.html';

/* Generated files a session must never read. The map points at the summary. */
const GENERATED = new Map([['mesh-index.js', 'docs/DATA-INDEX.md']]);

const linesOf = (p) => readFileSync(p, 'utf8').split(/\r?\n/);

/*
 * A banner sections the code:
 *     /* ------------- *
 *      * Title
 * Returns 1-based line numbers of the rule line.
 */
function banners(ls, from, to) {
  const out = [];
  for (let i = from - 1; i < to && i < ls.length; i++) {
    if (!/^\s*\/\*\s*-{4,}\s*\*\s*$/.test(ls[i])) continue;
    const t = ls[i + 1];
    if (!t || !/^\s*\*\s+\S/.test(t)) continue;
    out.push({ line: i + 1, title: t.replace(/^\s*\*\s*/, '').trim() });
  }
  return out;
}

/* Fill a block with contiguous ranges, so no line is unaccounted for. */
function sections(ls, from, to, prefix) {
  const bs = banners(ls, from, to);
  const rows = [];
  if (!bs.length || bs[0].line > from) {
    rows.push({ from, to: bs.length ? bs[0].line - 1 : to, title: `${prefix}preamble` });
  }
  bs.forEach((b, i) => {
    rows.push({ from: b.line, to: i + 1 < bs.length ? bs[i + 1].line - 1 : to, title: prefix + b.title });
  });
  return rows;
}

/*
 * Find the <style> and <script> blocks. Detected by scanning rather than
 * hard-coded, so this still works after the blocks move to their own files.
 */
function htmlBlocks(ls) {
  const blocks = [];
  let open = null, moduleN = 0;
  for (let i = 0; i < ls.length; i++) {
    const n = i + 1, l = ls[i];
    if (open) {
      if (/<\/(style|script)>/.test(l)) { open.to = n; blocks.push(open); open = null; }
      continue;
    }
    let label = null;
    if (/<style\b/.test(l)) label = 'CSS';
    else if (/<script\b[^>]*type="importmap"/.test(l)) label = 'importmap';
    else if (/<script\b[^>]*type="module"/.test(l)) label = ['studio', 'study'][moduleN++] || `module ${moduleN}`;
    else if (/<script\b/.test(l)) label = 'classic script';
    if (!label) continue;
    open = { label, from: n, to: n };
    if (/<\/(style|script)>/.test(l)) { blocks.push(open); open = null; }
  }
  return blocks;
}

function exportsOf(ls) {
  const out = [];
  for (const l of ls) {
    const m = l.match(/^export\s+(?:async\s+)?(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/);
    if (m) out.push(m[1]);
  }
  return out;
}

/* First prose line of the file's leading block comment. */
function headline(ls) {
  for (let i = 0; i < Math.min(ls.length, 15); i++) {
    const m = ls[i].match(/^\s*\*\s+(\S.*?)\s*$/);
    if (m && !/^-+$/.test(m[1])) return m[1].slice(0, 100);
  }
  return '';
}

/*
 * file path -> every docs/TRAPS.md anchor whose heading names it.
 * The HTML is named by several sections (CSS, the studio block, visibility),
 * so this maps to a LIST — keeping only the last would silently point a
 * cavity edit at the CSS traps.
 */
function trapAnchors() {
  const p = join(root, 'docs/TRAPS.md');
  const m = new Map();
  if (!existsSync(p)) return m;
  for (const l of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const h = l.match(/^###\s+(.+?)\s*$/);
    if (!h) continue;
    const slug = h[1].toLowerCase().replace(/`/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
    const short = h[1].replace(/\s*—.*$/, '').replace(/`/g, '').trim();
    for (const f of h[1].matchAll(/`([^`]+)`/g)) {
      if (!/[./]/.test(f[1]) || f[1].includes(' ')) continue;
      if (!m.has(f[1])) m.set(f[1], []);
      m.get(f[1]).push({ slug, short });
    }
  }
  return m;
}

const traps = trapAnchors();
const trapCell = (rel) => {
  const list = traps.get(rel) || traps.get(`outputs/${rel}`) || [];
  return list.map((t) => `[${t.short}](TRAPS.md#${t.slug})`).join('<br>');
};

const out = [];
const p = (s = '') => out.push(s);

p('<!-- GENERATED by work/codemap.mjs — do not edit. Run the script instead. -->');
p('# Code map');
p();
p('Where everything is. **Read this before grepping.**');
p('Traps for a file live in [TRAPS.md](TRAPS.md) — follow the link in the Traps column.');
p();

/* ---- the HTML ---- */
const htmlLines = linesOf(join(outputs, HTML));
p(`## \`outputs/${HTML}\` — ${htmlLines.length} lines`);
p();
/*
 * Several trap sections name the HTML (CSS, the studio block, visibility).
 * List them ONCE above the table — repeating them on all ~60 rows would cost
 * more to read than the map saves.
 */
const htmlTraps = trapCell(`outputs/${HTML}`);
if (htmlTraps) { p(`Traps: ${htmlTraps.replace(/<br>/g, ' · ')}`); p(); }
p('| Lines | Section |');
p('| --- | --- |');
for (const b of htmlBlocks(htmlLines)) {
  for (const r of sections(htmlLines, b.from, b.to, `${b.label} · `)) {
    p(`| ${r.from}–${r.to} | ${r.title} |`);
  }
}
p();

/* ---- the data modules ---- */
const mods = readdirSync(outputs).filter((f) => f.endsWith('.js')).sort();
p('## Data modules — `outputs/*.js`');
p();
p('| File | Lines | What it holds | Traps |');
p('| --- | --- | --- | --- |');
for (const f of mods) {
  const ls = linesOf(join(outputs, f));
  const gen = GENERATED.get(f);
  const what = gen ? `**GENERATED — do not read, do not edit.** See \`${gen}\`, or ask: \`node work/query.mjs\`` : headline(ls);
  p(`| \`${f}\` | ${ls.length} | ${what} | ${trapCell(f)} |`);
}
p();

/* ---- exports, so a session can find a symbol without grepping ---- */
p('### Exported symbols');
p();
for (const f of mods) {
  if (GENERATED.has(f)) continue;
  const ex = exportsOf(linesOf(join(outputs, f)));
  if (!ex.length) continue;
  p(`- \`${f}\` — ${ex.map((e) => `\`${e}\``).join(', ')}`);
}
p();

/* ---- the verifiers ---- */
p('## Verifiers and generators — `work/*.mjs`');
p();
p('| Script | What it does |');
p('| --- | --- |');
for (const f of readdirSync(join(root, 'work')).filter((f) => f.endsWith('.mjs')).sort()) {
  p(`| \`work/${f}\` | ${headline(linesOf(join(root, 'work', f)))} |`);
}
p();

const text = `${out.join('\n')}\n`;
if (process.argv.includes('--stdout')) process.stdout.write(text);
else {
  writeFileSync(join(root, 'docs/CODEMAP.md'), text, 'utf8');
  console.log(`docs/CODEMAP.md — ${text.split('\n').length} lines`);
}
```

- [ ] **Step 2: Generate the map**

Run: `node work/codemap.mjs`

Expected: `docs/CODEMAP.md — <N> lines`, where N is under 250.

- [ ] **Step 3: Read the generated map and sanity-check it**

Run: `node -e "const s=require('fs').readFileSync('docs/CODEMAP.md','utf8');console.log(s.split('\n').length+' lines');console.log(s.slice(0,2500))"`

Verify by eye:
- The studio block rows cover 1083–4488 contiguously with no gaps.
- The study block rows cover 4489–7935 contiguously.
- `mesh-index.js` says GENERATED rather than showing a headline.

If the ranges have gaps, the banner regex missed a banner — check the exact
spacing of the rule line in `outputs/radiography-study-studio.html`.

- [ ] **Step 4: Run the check — it should still fail, but only on TRAPS.md**

Run: `node work/codemap-check.mjs`

Expected: `ok` on the map matching, FAIL on `docs/TRAPS.md does not exist`, `1 FAILED`.

- [ ] **Step 5: Commit**

```bash
git add work/codemap.mjs docs/CODEMAP.md
git commit -m "feat(codemap): generate the map from the banners already in the code

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: `docs/TRAPS.md` — relocate the area-specific traps

This is a **move, not a rewrite**. The trap list is the most valuable document
in the repo; every bullet is a bug someone already paid for. Nothing is deleted
and nothing is reworded. It is only regrouped by the file it governs, so a
session reads the four traps that apply to its edit instead of all thirty-five.

**Files:**
- Create: `docs/TRAPS.md`
- Read: `CLAUDE.md:130-330` (the `## 3D viewer traps`, `## CSS traps` and `## Layout model` sections)

- [ ] **Step 1: Create `docs/TRAPS.md` with this exact skeleton**

Each `###` heading **must name its file in backticks** — `work/codemap-check.mjs`
parses those headings and fails if the path does not exist.

```markdown
# Traps

Bugs this repo already paid for. Each section names the file it governs; read
the section before editing that file. `CLAUDE.md` carries only what is true for
every session — everything area-specific lives here.

Grouped by file. `docs/CODEMAP.md` links each file to its section.

### The studio block — `outputs/radiography-study-studio.html` (lines 1083–4488)

<!-- from CLAUDE.md "3D viewer traps": the fatal-ground bullet, the two-import-scopes
     bullet, the shared body frame bullet, mesh-name normalisation, the `muscle` not
     `muscles` bullet, the render-loop-stops bullet, picking restriction, the legacy
     bodyparts3d note, MODEL_CATALOG -->

### Overlays and cavities — `outputs/cavity-build.js`, `outputs/cavity-geom.js`

<!-- updateMatrixWorld(true) (both bullets), the cavity-built-before-its-layer bullet,
     overlay groups ride the pivots / syncOverlayYaw, callout anchoring /
     nearestSurfacePoint, sprites anchor by edge, verify in the BODY frame,
     the nine regions are topographic, organs excluded from the grid -->

### The region grid and classifiers — `outputs/landmarks.js`

<!-- measureGrid returns constants, never let a structure become a boundary,
     the region classifiers have no catch-all, the region filter's measured box
     and the free-limb-only upper-limb box -->

### Visibility and hiding — `outputs/radiography-study-studio.html` (lines 1101–1418)

<!-- applyVisibility is the only thing that turns meshes back on, hiding takes the
     whole structure, live physiology owns the connective layer, revealStructure must
     dedupe, the hidden tray lists structures not meshes -->

### The mesh index — `work/build-mesh-index.mjs`

<!-- the layer counts are STRUCTURES not meshes, every indexed mesh takes its unit's
     canonicalId, a group is named after the WHOLE, where a structure IS is measured,
     a kind is split by place only where real, the index is tiered, a unit label is
     derived, one node is not anatomy (Pharynx.j), search covers mesh-index,
     check NOT_MODELLED against the index -->

### Study depth and course terms — `work/build-course-terms.mjs`

<!-- study depth is READ from the sources, the Martini eBook is excluded on purpose,
     exact phrase matching alone loses the lung lobes, proximity never runs over
     Vocabulary.pdf, a numbered series is named as a series -->

### CSS — `outputs/radiography-study-studio.html` (lines 19–765)

<!-- all of CLAUDE.md "## CSS traps", plus "## Layout model" -->

### The viewer is a manipulation surface — `outputs/radiography-study-studio.html`

<!-- user-select:none / -webkit-touch-callout:none, and the hidden-element-measures-0x0
     / ResizeObserver bullet -->
```

- [ ] **Step 2: Move the bullets in, verbatim**

Copy each bullet from `CLAUDE.md` into the section its HTML comment names.
Replace the HTML comment with the bullets. **Copy the text exactly** — do not
summarise, reword, or shorten. Several bullets carry measured numbers
(`x 0.06-0.18`, `y 2.39-5.10`, `3003 parts`, `80/159, 115/344, …`) that are the
evidence for the claim; losing them makes the trap unfalsifiable.

A bullet that legitimately governs two files goes in the section for the file
you would edit first, with a `See also` line in the other.

- [ ] **Step 3: Verify nothing was lost**

Run:
```bash
node -e "
const fs=require('fs');
const bullets=(s)=>s.split('\n').filter(l=>/^\s*-\s+\*\*/.test(l)).length;
const cm=fs.readFileSync('CLAUDE.md','utf8');
const tr=fs.readFileSync('docs/TRAPS.md','utf8');
console.log('CLAUDE.md bolded bullets:',bullets(cm));
console.log('TRAPS.md bolded bullets:',bullets(tr));
"
```

Expected: `TRAPS.md` has at least as many bolded bullets as `CLAUDE.md` had
before the edit (`CLAUDE.md` is not yet trimmed, so it will still show its own).
Record the `CLAUDE.md` number — Task 7 checks the sum is preserved.

- [ ] **Step 4: Regenerate the map so the Traps links resolve**

Run: `node work/codemap.mjs`

Expected: the map is rewritten; `docs/CODEMAP.md` now has `[traps](TRAPS.md#…)`
entries in the Traps column for the files named in `docs/TRAPS.md`.

- [ ] **Step 5: Run the check — it should now pass**

Run: `node work/codemap-check.mjs`

Expected: `ALL PASS`.

- [ ] **Step 6: Commit**

```bash
git add docs/TRAPS.md docs/CODEMAP.md
git commit -m "docs(traps): group the trap list by the file each trap governs

Moved verbatim out of CLAUDE.md. Every bullet is a bug someone already
paid for, so nothing is reworded or dropped — only regrouped, so a
session reads the four that apply instead of all thirty-five.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: `docs/DATA-INDEX.md` — what the generated files hold

**Files:**
- Create: `work/data-index.mjs`
- Create: `docs/DATA-INDEX.md` (generated, committed)

- [ ] **Step 1: Write the generator**

```js
/*
 * Data index generator — writes docs/DATA-INDEX.md.
 *
 * outputs/mesh-index.js is 141 KB of generated rows, and "what does the index
 * say about X" is the most common reason a session opens it. This is the
 * summary that answers the question the file was being opened for; anything
 * more specific is a work/query.mjs call.
 *
 * Usage: node work/data-index.mjs            # write docs/DATA-INDEX.md
 *        node work/data-index.mjs --stdout   # print it, write nothing
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { SYNONYMS, COMPOSITES, NOT_MODELLED } from '../outputs/synonyms.js';
import { STUDY_ITEMS, SUBJECTS } from '../outputs/study-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = [];
const p = (s = '') => out.push(s);

const tally = (rows, key) => rows.reduce((m, r) => m.set(key(r), (m.get(key(r)) || 0) + 1), new Map());
const sorted = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));

p('<!-- GENERATED by work/data-index.mjs — do not edit. Run the script instead. -->');
p('# Data index');
p();
p('What the large generated files hold, so you never have to open them.');
p('For anything more specific: `node work/query.mjs <unit|mesh|item|layer> <term>`.');
p();

p('## `outputs/mesh-index.js` — GENERATED, never hand-edit');
p();
p(`${MESH_INDEX.length} structure rows resolving to ${UNITS.length} study units.`);
p('Rebuild: `node work/build-course-terms.mjs` (needs the Drive) then `node work/build-mesh-index.mjs`.');
p();
p('One row per named structure per layer, collapsed across side letters and');
p('Blender duplicate suffixes. Row shape:');
p();
p('```js');
p('{ name, layer, mesh, sides, tier, unitId, unit, unitKind, unitSize, isUnit,');
p('  source: { file, subject, evidence } | null }');
p('```');
p();
p('- `tier` — `0` the course names it, `1` finer than the course goes.');
p('- `unit` — what a tap actually selects. Every row resolves to one.');
p('- `sides` — `b` both, `l`, `r`, or `\'\'` unpaired.');
p('- `source` — non-null only for tier-0 rows; the course file that names it.');
p();
p('| Layer | Rows | Course-named (tier 0) |');
p('| --- | --- | --- |');
for (const [layer, n] of sorted(tally(MESH_INDEX, (r) => r.layer))) {
  const t0 = MESH_INDEX.filter((r) => r.layer === layer && r.tier === 0).length;
  p(`| ${layer} | ${n} | ${t0} |`);
}
p(`| **total** | **${MESH_INDEX.length}** | **${MESH_INDEX.filter((r) => r.tier === 0).length}** |`);
p();
p('| Unit kind | Count | Meaning |');
p('| --- | --- | --- |');
const KIND_MEANING = {
  course: 'the course names this structure — it is its own unit',
  group: 'finer than the course goes — folded into a named group',
  lone: 'one of a kind, with nothing to join',
};
for (const [kind, n] of sorted(tally(UNITS, (u) => u.kind))) {
  p(`| ${kind} | ${n} | ${KIND_MEANING[kind] || ''} |`);
}
p();
p('| Evidence | Rows | How the source names it |');
p('| --- | --- | --- |');
for (const [ev, n] of sorted(tally(MESH_INDEX.filter((r) => r.source), (r) => r.source.evidence))) {
  p(`| ${ev} | ${n} | |`);
}
p();

p('## `outputs/synonyms.js`');
p();
p(`- \`SYNONYMS\` — ${Object.keys(SYNONYMS).length} query expansions (collarbone→clavicle, CN X→vagus).`);
p(`- \`COMPOSITES\` — ${Object.keys(COMPOSITES).length} names with no mesh but real parts.`);
p(`  ${Object.keys(COMPOSITES).sort().join(', ')}`);
p(`- \`NOT_MODELLED\` — ${NOT_MODELLED.length} things genuinely absent:`);
p(`  ${NOT_MODELLED.map((r) => r.term).sort().join(', ')}`);
p();
p('**Before writing a new `NOT_MODELLED` entry, check it against the index.**');
p('`work/search-probe.mjs` fails the build if a NOT_MODELLED term names a mesh that exists.');
p();

p('## `outputs/study-data.js` — the lesson corpus');
p();
p(`${STUDY_ITEMS.length} study items across ${SUBJECTS.length} subjects.`);
p();
p('| Subject | Units | Items |');
p('| --- | --- | --- |');
for (const s of SUBJECTS) {
  p(`| ${s.id} | ${(s.units || []).length} | ${STUDY_ITEMS.filter((i) => i.subject === s.id).length} |`);
}
p();
p('Item shape: `{ status, id, subject, unit, type, title, tags, lesson, memory,');
p('practice, application, commonMistakes, skills, selfCheck, sourceRefs }`.');
p();
p('| Item type | Count |');
p('| --- | --- |');
for (const [t, n] of sorted(tally(STUDY_ITEMS, (i) => i.type))) p(`| ${t} | ${n} |`);
p();

const text = `${out.join('\n')}\n`;
if (process.argv.includes('--stdout')) process.stdout.write(text);
else {
  writeFileSync(join(root, 'docs/DATA-INDEX.md'), text, 'utf8');
  console.log(`docs/DATA-INDEX.md — ${text.split('\n').length} lines`);
}
```

- [ ] **Step 2: Generate it**

Run: `node work/data-index.mjs`

Expected: `docs/DATA-INDEX.md — <N> lines`, N under 120.

If this throws on `SYNONYMS`, `COMPOSITES` or `NOT_MODELLED` not being the
expected shape, run `node -e "import('./outputs/synonyms.js').then(m=>console.log(Object.keys(m)))"`
and adjust the three lines that read them. Do not change `synonyms.js`.

- [ ] **Step 3: Verify the numbers against the source of truth**

Run: `node -e "import('./outputs/mesh-index.js').then(m=>console.log(m.MESH_INDEX.length,'rows',m.UNITS.length,'units'))"`

Expected: `1686 rows 787 units`, matching the totals in the generated file.

- [ ] **Step 4: Commit**

```bash
git add work/data-index.mjs docs/DATA-INDEX.md
git commit -m "docs(data): summarise the generated files so nobody opens them

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: `work/query.mjs` — ask the data instead of reading it

**Files:**
- Create: `work/query.mjs`

- [ ] **Step 1: Write the CLI**

```js
/*
 * Ask the data a question instead of reading the file.
 *
 * outputs/mesh-index.js is ~36K tokens and outputs/study-data.js ~120K. Almost
 * every reason to open either is a lookup that fits in twenty lines. This
 * answers those, so a session spends tens of tokens where it used to spend
 * tens of thousands.
 *
 * Usage:
 *   node work/query.mjs unit  <term>    what a tap selects, and what is in it
 *   node work/query.mjs mesh  <term>    index rows whose name matches
 *   node work/query.mjs item  <term>    study items by id, title or tag
 *   node work/query.mjs layer <key>     one layer's counts and its top units
 *   node work/query.mjs source <term>   which course file names a structure
 */
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { STUDY_ITEMS } from '../outputs/study-data.js';

const [cmd, ...rest] = process.argv.slice(2);
const term = rest.join(' ').trim();
const LIMIT = 25;

const usage = () => {
  console.log(`Usage: node work/query.mjs <command> <term>

  unit   <term>   what a tap selects, and every structure inside it
  mesh   <term>   index rows whose name matches
  item   <term>   study items by id, title or tag
  layer  <key>    one layer's counts and its largest units
  source <term>   which course file names a structure

Layers: ${[...new Set(MESH_INDEX.map((r) => r.layer))].sort().join(', ')}`);
  process.exit(1);
};

if (!cmd || (!term && cmd !== 'layer')) usage();
const hit = (s) => String(s || '').toLowerCase().includes(term.toLowerCase());

/* More matches than fit is normal for a broad term — say so rather than
   silently truncating, or the reader trusts a partial answer. */
const show = (rows, render) => {
  rows.slice(0, LIMIT).forEach(render);
  if (rows.length > LIMIT) console.log(`  … ${rows.length - LIMIT} more (narrow the term)`);
  if (!rows.length) console.log('  no match');
};

switch (cmd) {
  case 'unit': {
    const units = UNITS.filter((u) => hit(u.label));
    console.log(`${units.length} unit(s) matching "${term}"\n`);
    show(units, (u) => {
      const rows = MESH_INDEX.filter((r) => r.unitId === u.id);
      console.log(`${u.label}  [${u.layer}, ${u.kind}, ${u.size} structure(s)]`);
      for (const r of rows.slice(0, 12)) {
        console.log(`    ${r.name}${r.sides ? ` (${r.sides})` : ''}  tier ${r.tier}` +
          `${r.source ? `  ← ${r.source.file}` : ''}`);
      }
      if (rows.length > 12) console.log(`    … ${rows.length - 12} more structures`);
      console.log();
    });
    break;
  }
  case 'mesh': {
    const rows = MESH_INDEX.filter((r) => hit(r.name) || hit(r.mesh));
    console.log(`${rows.length} row(s) matching "${term}"\n`);
    show(rows, (r) => console.log(
      `${r.name}\n    layer ${r.layer}  mesh "${r.mesh}"  sides "${r.sides}"  tier ${r.tier}\n` +
      `    unit: ${r.unit} (${r.unitKind}, ${r.unitSize})${r.isUnit ? '  ← this row IS the unit' : ''}\n` +
      `    source: ${r.source ? `${r.source.file} [${r.source.subject}, ${r.source.evidence}]` : 'not named by the course'}\n`));
    break;
  }
  case 'item': {
    const items = STUDY_ITEMS.filter((i) => hit(i.id) || hit(i.title) || (i.tags || []).some(hit));
    console.log(`${items.length} item(s) matching "${term}"\n`);
    show(items, (i) => console.log(
      `${i.id}  ${i.title}\n    ${i.subject} / ${i.unit}  type ${i.type}\n` +
      `    ${(i.practice || []).length} question(s), ${(i.sourceRefs || []).length} source ref(s)` +
      `${(i.tags || []).length ? `\n    tags: ${i.tags.join(', ')}` : ''}\n`));
    break;
  }
  case 'layer': {
    const layers = [...new Set(MESH_INDEX.map((r) => r.layer))].sort();
    if (!term) { console.log(`Layers: ${layers.join(', ')}`); break; }
    const rows = MESH_INDEX.filter((r) => r.layer === term);
    if (!rows.length) { console.log(`no layer "${term}". Layers: ${layers.join(', ')}`); break; }
    const units = UNITS.filter((u) => u.layer === term).sort((a, b) => b.size - a.size);
    console.log(`${term}: ${rows.length} structures, ${rows.filter((r) => r.tier === 0).length} course-named, ${units.length} units\n`);
    console.log('largest units:');
    for (const u of units.slice(0, 15)) console.log(`  ${String(u.size).padStart(4)}  ${u.label}  [${u.kind}]`);
    break;
  }
  case 'source': {
    const rows = MESH_INDEX.filter((r) => r.source && (hit(r.name) || hit(r.source.file)));
    console.log(`${rows.length} sourced row(s) matching "${term}"\n`);
    show(rows, (r) => console.log(`${r.name.padEnd(44)} ${r.source.file}  [${r.source.subject}, ${r.source.evidence}]`));
    break;
  }
  default:
    usage();
}
```

- [ ] **Step 2: Verify each subcommand against a known answer**

Run:
```bash
node work/query.mjs unit Deltoid
node work/query.mjs mesh Scaphoid
node work/query.mjs layer skeleton
node work/query.mjs item terminology
```

Expected:
- `unit Deltoid` — the deltoid is modelled only as pieces, so the unit is named
  after the whole and lists more than one structure inside it.
- `mesh Scaphoid` — a skeleton row, `sides "b"`, and its unit.
- `layer skeleton` — `159` structures and `80` course-named, matching the chip
  numbers recorded in `docs/TRAPS.md`.
- `item terminology` — at least one HSS2011 item.

If `layer skeleton` does not print `159`/`80`, stop: either the chip numbers in
the trap list are stale or the query is filtering wrongly. Find out which before
continuing — the numbers are load-bearing for the next phases.

- [ ] **Step 3: Verify the no-argument path**

Run: `node work/query.mjs`

Expected: usage text listing the five commands and the seven layer keys, exit 1.

- [ ] **Step 4: Commit**

```bash
git add work/query.mjs
git commit -m "feat(query): ask the index and the corpus instead of reading them

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Rewrite `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md` (364 lines → target under 130)

- [ ] **Step 1: Record the starting numbers**

Run:
```bash
node -e "
const s=require('fs').readFileSync('CLAUDE.md','utf8');
console.log('lines',s.split('\n').length,'bytes',Buffer.byteLength(s));
console.log('bolded bullets',s.split('\n').filter(l=>/^\s*-\s+\*\*/.test(l)).length);
"
```

Write the three numbers down. Step 4 compares against them.

- [ ] **Step 2: Cut the relocated sections**

Delete these sections in full — every bullet is already in `docs/TRAPS.md` as of
Task 4:
- `## 3D viewer traps`
- `## CSS traps`
- `## Layout model`

Keep, unchanged: the title and opening paragraph, `## Layout`, `### outputs/ data modules`,
`## Run`, `## Hard rules`, `## After every edit`, `## Git / deploy`.

- [ ] **Step 3: Add the pointer block**

Insert immediately after the opening paragraph (before `## Layout`):

```markdown
## Find things here first

**Read `docs/CODEMAP.md` before grepping.** It is generated from the banner
comments in the code (`node work/codemap.mjs`), so it is always current: every
section of the app, its file, its line range, and a link to the traps that
govern it.

| Want | Read | Not |
| --- | --- | --- |
| Where a behaviour lives | `docs/CODEMAP.md` | a grep sweep |
| What breaks when you edit file F | the `docs/TRAPS.md` section CODEMAP links | this file |
| What the model contains | `docs/DATA-INDEX.md`, then `node work/query.mjs` | `outputs/mesh-index.js` |
| What one structure or item says | `node work/query.mjs unit\|mesh\|item\|layer\|source <term>` | `outputs/study-data.js` |
| Why a decision was made | `outputs/README.md`, `git log` | reopening it |

`outputs/mesh-index.js` and `work/course-terms.json` are **generated**. Never
read them and never edit them; ask `work/query.mjs` instead.
```

- [ ] **Step 4: Add the new checks to `## After every edit`**

Append these two lines to the existing fenced block in that section:

```bash
node work/codemap-check.mjs  # the map matches the code; TRAPS names real files
node work/baseline.mjs --check  # the probes still say what they said
```

Then add below the block:

```markdown
- Added, moved or renamed a section banner, a file, or an export? Run
  `node work/codemap.mjs` and commit the regenerated `docs/CODEMAP.md`.
  `codemap-check.mjs` fails until you do.
- A trap you learn the hard way goes in `docs/TRAPS.md`, under the file it
  governs — not here. This file is loaded into every session; that one is read
  only by a session working in that file.
```

- [ ] **Step 5: Verify the shrink, and that nothing was lost**

Run:
```bash
node -e "
const fs=require('fs');
const b=(s)=>s.split('\n').filter(l=>/^\s*-\s+\*\*/.test(l)).length;
const cm=fs.readFileSync('CLAUDE.md','utf8'), tr=fs.readFileSync('docs/TRAPS.md','utf8');
console.log('CLAUDE.md lines',cm.split('\n').length,'bytes',Buffer.byteLength(cm));
console.log('bolded bullets — CLAUDE.md',b(cm),'+ TRAPS.md',b(tr),'=',b(cm)+b(tr));
"
```

Expected:
- `CLAUDE.md` under 130 lines and under 10,000 bytes.
- The **sum** of bolded bullets is at least the starting number from Step 1.
  If it is lower, a trap was dropped — recover it from
  `git show HEAD~1:CLAUDE.md` and put it in `docs/TRAPS.md`.

- [ ] **Step 6: Run the full check suite**

Run:
```bash
node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/shell-check.mjs && node work/search-probe.mjs && node work/region-probe.mjs && node work/figure-key-check.mjs && node work/codemap-check.mjs && node work/baseline.mjs --check
```

Expected: every script prints `ALL PASS` and exits 0.

`baseline.mjs --check` **must** pass — this phase changed no application code,
so any baseline movement means something unintended was touched.

- [ ] **Step 7: Confirm no application file was touched**

Run: `git diff --stat HEAD~6 -- outputs/`

Expected: **empty output.** Phases 0 and 1 add and rewrite documentation and
tooling only. If anything under `outputs/` appears, revert that file — and note
that `CACHE_VERSION` would then need bumping, which this phase is designed to
avoid.

- [ ] **Step 8: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude): keep only what every session needs

364 lines to <130. The traps moved to docs/TRAPS.md, grouped by the file
each one governs, and docs/CODEMAP.md now says where everything is — so a
session pays for the four traps that apply to its edit rather than all
thirty-five, on every single boot.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Measure the result

Confirms the phase did what it was for, and gives phases 2–5 a number to beat.

**Files:**
- Modify: `docs/superpowers/specs/2026-08-31-session-context-cost-design.md` (append a result section)

- [ ] **Step 1: Measure the always-on cost, before and after**

Run:
```bash
node -e "
const fs=require('fs'),cp=require('child_process');
const t=(s)=>Math.round(Buffer.byteLength(s)/3.7);
const before=cp.execSync('git show HEAD~7:CLAUDE.md',{encoding:'utf8'});
const after=fs.readFileSync('CLAUDE.md','utf8');
const map=fs.readFileSync('docs/CODEMAP.md','utf8');
console.log('always-on before:',t(before),'tokens');
console.log('always-on after: ',t(after),'tokens');
console.log('on demand: CODEMAP',t(map),'| TRAPS',t(fs.readFileSync('docs/TRAPS.md','utf8')),'| DATA-INDEX',t(fs.readFileSync('docs/DATA-INDEX.md','utf8')));
"
```

If `HEAD~7` is not the pre-rewrite commit, use `git log --oneline -12` to find
the commit before "docs(claude): keep only what every session needs" and use that.

- [ ] **Step 2: Append the measured result to the spec**

Add a `## Result — phases 0 and 1` section to
`docs/superpowers/specs/2026-08-31-session-context-cost-design.md` recording the
before/after token counts from Step 1, which probes were excluded from the
baseline set and why, and whether the success criteria for phases 0–1 were met:

- `CLAUDE.md` under 130 lines — yes/no, actual
- `docs/CODEMAP.md` under 200 lines and generated — yes/no, actual
- Every probe baseline reproducible — yes/no, list any excluded

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-08-31-session-context-cost-design.md
git commit -m "docs(spec): record what phases 0 and 1 actually saved

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Out of scope for this plan

Phases 2–5 from the spec each get their own plan, written after phase 1 has been
lived with:

- **Phase 2** — `<style>` → `app.css`, block 0 → `studio.js`, block 1 → `study.js`.
  Byte-identical extraction. Extends `shell-check.mjs` to versioned `<link>` hrefs.
- **Phase 3** — `study-data.js` → `study/corpus/*.js` behind a barrel.
- **Phase 4** — `study.js` → `study/*.js` along its banners.
- **Phase 5** — `studio.js` → `studio/*.js`, partial, with the ~30% stop rule.

Do not start any of them from this plan.
