# Phase 2 — the monolith stops being unavoidable

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the inline `<style>` and both inline `<script type="module">` blocks out of
`outputs/radiography-study-studio.html` into `outputs/app.css`, `outputs/studio.js` and
`outputs/study.js`, byte for byte, and teach every tool that reads those blocks where they went.

**Architecture:** A pure relocation. The HTML keeps its markup, its importmap and its classic
service-worker script, and gains one `<link>` and two `<script src>` tags. No code is reformatted,
renamed or restructured. The proof of correctness is a reassembly diff: gluing the extracted
pieces back into the HTML must reproduce the committed file byte for byte.

**Tech Stack:** Vanilla ES modules, no build step. Node `.mjs` verifiers. Windows host with
`core.autocrlf` on — normalise line endings in every string comparison.

---

## Why this phase is not just a text move

Five `work/` scripts read the HTML and find the inline blocks by pattern. Four of them fail
**silently and passing** once the blocks are gone:

| Script | How it breaks | Consequence |
| --- | --- | --- |
| `load-check.mjs` | `matchAll(/<script type="module">(...)<\/script>/g)` matches nothing | `blocks.length === 0`, loop body never runs, **exit 0** — the check that once caught a shipped TDZ death now checks nothing |
| `syntax-check.mjs` | same regex | same — **exit 0** on an empty set |
| `shell-check.mjs` | scrapes `from './x.js?v=N'` out of the HTML | `imports` is empty, the "every imported module is precached" section passes vacuously — **exit 0** |
| `codemap.mjs` | `htmlBlocks()` finds no inline blocks | emits its `SPLIT_WARNING`; `codemap-check.mjs` fails **loudly** — this one is already guarded |
| `region-probe.mjs` | `html.indexOf('const IMPORT_MAP=[')` returns `-1` | `throw` — fails **loudly** |

So three of the five need an anti-collapse guard, not just a new path. Every one of them must
**fail when it finds nothing to check**. This is the same defect the phase-1 review caught in
`codemap.mjs`, and it is the single most important thing in this phase.

## Facts established before writing this plan

Verified against the working tree at `e607a06`:

- `<style>` opens line 19, closes line 765. CSS content is lines **20–764**.
- `<script type="importmap">` is line 1082, self-contained, stays inline.
- Module block 0 (studio) opens 1083, closes 4488. Content is lines **1084–4487**.
- Module block 1 (study) opens 4489, closes 7935. Content is lines **4490–7934**.
- Classic `<script>` is 7936–7955, stays inline.
- No `import.meta`, no `document.currentScript`, no `document.write` anywhere in the blocks.
- Every dynamic `import()` is an absolute `https://cdn.jsdelivr.net/...` URL. No relative
  dynamic imports, so relative-resolution differences cannot bite.
- No bare specifiers are imported. The `three` importmap entry is unused by `from` statements;
  leave it exactly as it is (non-goal: no cleanup during the move).
- The one cross-script ordering dependency is `window.__rssLaunchMode`: written by the classic
  script at line 7954, read by the study module at line 7927. Classic scripts run during parse,
  module scripts (inline **and** external) are deferred, so the write still happens first.
- Both new `.js` files land in `outputs/` alongside the data modules, so every `./foo.js`
  specifier resolves to the same URL it did when inline.

## File structure

| Path | Change | Responsibility |
| --- | --- | --- |
| `outputs/app.css` | create | lines 20–764 verbatim |
| `outputs/studio.js` | create | lines 1084–4487 verbatim |
| `outputs/study.js` | create | lines 4490–7934 verbatim |
| `outputs/radiography-study-studio.html` | modify | 7957 → ~810 lines; one `<link>`, two `<script src>` |
| `outputs/sw.js` | modify | `CACHE_VERSION` bump, three new SHELL entries |
| `work/shell-check.mjs` | modify | follow imports into the extracted files; police `<link>`/`<script src>`; guard |
| `work/load-check.mjs` | modify | source app modules from wherever they live; guard |
| `work/syntax-check.mjs` | modify | same |
| `work/region-probe.mjs` | modify | lift the classifiers from `studio.js` |
| `work/codemap.mjs` | modify | map the extracted files; replace the split warning with a live guard |
| `docs/TRAPS.md` | modify | six headings renamed to the file that now governs them |
| `docs/CODEMAP.md` | regenerate | never hand-edited |

---

### Task 1: Extract the three files, byte for byte

**Files:**
- Create: `outputs/app.css`, `outputs/studio.js`, `outputs/study.js`
- Modify: `outputs/radiography-study-studio.html`
- Scratch: `C:/Users/leung/AppData/Local/Temp/claude/C--Users-leung-Documents-Codex-2026-08-24-files-pasted-by-the-user-yes/70ce6d1f-d4cc-4dc1-a78e-6b8d888ddd13/scratchpad` — referred to below as `$SCRATCH`; export it once at the start of the task and do not commit anything in it

Do **not** hand-edit a 487 KB file. Write a throwaway script that slices by line number and
proves the slice was lossless by reassembling it.

- [ ] **Step 1: Confirm the four hand-counted boundary lines**

These indices are the only part of the extraction that was counted by eye, so check them before
writing anything:

```bash
sed -n '19p;765p;766p;767p;1082p;1083p' outputs/radiography-study-studio.html
```

Expected, in order: `  <style>`, `  </style>`, `</head>`, `<body>`, the importmap script tag,
`<script type="module">`. If any line differs, correct the indices in the script below rather
than touching the file.

- [ ] **Step 2: Write the extraction script**

Create `$SCRATCH/extract.mjs`:

```js
/* One-off: split the monolith by line number. Ranges are 1-based inclusive.
   Correctness is proved by reassemble.mjs, not by reading this. */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];                       /* absolute path to outputs/ */
const HTML = join(OUT, 'radiography-study-studio.html');
const raw = readFileSync(HTML, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);                  /* trailing '' if the file ends in a newline */

const cut = (from, to) => lines.slice(from - 1, to).join(eol);

writeFileSync(join(OUT, 'app.css'), cut(20, 764) + eol, 'utf8');
writeFileSync(join(OUT, 'studio.js'), cut(1084, 4487) + eol, 'utf8');
writeFileSync(join(OUT, 'study.js'), cut(4490, 7934) + eol, 'utf8');

/* Rebuild the HTML with the three blocks replaced by references. Every kept
   range is expressed with the same 1-based cut(), so there is no slice
   arithmetic to get wrong. */
const rebuilt = [
  cut(1, 18),                                      /* <!doctype> .. the fonts <link> */
  '  <link rel="stylesheet" href="./app.css?v=1">',
  cut(766, 1082),                                  /* </head> .. the importmap */
  '<script type="module" src="./studio.js?v=1"></script>',
  '<script type="module" src="./study.js?v=1"></script>',
  cut(7936, lines.length),                         /* the classic script .. </html> */
].join(eol);
writeFileSync(HTML, rebuilt, 'utf8');
console.log('written');
```

- [ ] **Step 3: Snapshot the original, then extract**

```bash
git show HEAD:outputs/radiography-study-studio.html > "$SCRATCH/original.html"
node "$SCRATCH/extract.mjs" "$PWD/outputs"
```

- [ ] **Step 4: Prove the split was lossless**

Create `$SCRATCH/reassemble.mjs`. This is the whole safety argument for the phase: nothing was
dropped, reordered or re-indented, so every check downstream is entitled to assume the code did
not change.

```js
/* Glue the extracted pieces back into the shape of the original and diff. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2], ORIG = process.argv[3];
const norm = (s) => s.replace(/\r\n/g, '\n');
const orig = norm(readFileSync(ORIG, 'utf8')).split('\n');
/* 1-based inclusive, matching extract.mjs, so the two scripts read the same. */
const keep = (from, to) => orig.slice(from - 1, to);
const piece = (f) => {
  const t = norm(readFileSync(join(OUT, f), 'utf8'));
  return (t.endsWith('\n') ? t.slice(0, -1) : t).split('\n');
};

const rebuilt = [
  ...keep(1, 18),
  '  <style>',
  ...piece('app.css'),
  '  </style>',
  ...keep(766, 1082),
  '<script type="module">',
  ...piece('studio.js'),
  '</script>',
  '<script type="module">',
  ...piece('study.js'),
  '</script>',
  ...keep(7936, orig.length),
];

let bad = 0;
for (let i = 0; i < Math.max(rebuilt.length, orig.length); i++) {
  if (rebuilt[i] !== orig[i] && bad++ < 5) {
    console.log(`line ${i + 1}\n  orig: ${JSON.stringify(orig[i])}\n  new : ${JSON.stringify(rebuilt[i])}`);
  }
}
console.log(bad ? `\n${bad} DIFFERING LINE(S) — the extraction lost something`
                : `\nLOSSLESS — ${orig.length} lines reproduced exactly`);
process.exit(bad ? 1 : 0);
```

Run it:

```bash
node "$SCRATCH/reassemble.mjs" "$PWD/outputs" "$SCRATCH/original.html"
```

Expected: `LOSSLESS — 7958 lines reproduced exactly` (7,957 lines plus the trailing empty
element from the final newline).

**If this does not pass, stop and fix the indices.** Do not proceed on a lossy extraction —
every later check in this plan assumes the code is unchanged, so they would all pass while the
app was broken.

- [ ] **Step 5: Sanity-check the new HTML**

```bash
grep -n '<style\|</style>\|<script\|</script>\|<link rel="stylesheet"' outputs/radiography-study-studio.html
```

Expected: no `<style>`, one `<link rel="stylesheet" href="./app.css?v=1">`, the importmap,
`<script type="module" src="./studio.js?v=1"></script>`,
`<script type="module" src="./study.js?v=1"></script>`, and the classic script — **in that
order**. The two module tags must appear studio-then-study; reversing them changes when
`window.__osteo` is defined.

- [ ] **Step 6: Commit**

```bash
git add outputs/app.css outputs/studio.js outputs/study.js outputs/radiography-study-studio.html
git commit -m "refactor(app): lift the CSS and both module blocks out of the HTML"
```

---

### Task 2: Precache the three new files

**Files:**
- Modify: `outputs/sw.js:26`, `outputs/sw.js:32-89`

An unversioned or unlisted stylesheet is the same offline cache-miss bug the `?v=N` rule exists
to prevent — it only shows up offline, which is the one condition this app is built for.

- [ ] **Step 1: Bump the cache version**

In `outputs/sw.js`, change:

```js
const CACHE_VERSION = 'v53';
```

to:

```js
const CACHE_VERSION = 'v54';
```

- [ ] **Step 2: Add the three entries**

In the `SHELL` array, immediately after `'./radiography-study-studio.html',`, insert:

```js
  /* The app itself. Lifted out of the HTML in phase 2 — same code, three files.
     The queries MUST match the <link> and <script src> in the HTML exactly;
     work/shell-check.mjs enforces that. */
  './app.css?v=1',
  './studio.js?v=1',
  './study.js?v=1',
```

- [ ] **Step 3: Commit**

```bash
git add outputs/sw.js
git commit -m "fix(sw): precache app.css, studio.js and study.js"
```

---

### Task 3: Teach `shell-check.mjs` where the imports went, and make it fail on an empty set

**Files:**
- Modify: `work/shell-check.mjs`

Three changes: follow imports into the extracted files, police the `<link>`/`<script src>`
references the HTML now carries, and refuse to pass when it found nothing.

- [ ] **Step 1: Replace everything from the import scrape to the end of the first section**

Replace lines 27–43 — from `/* what the page imports, local modules only */` down to and
including the closing `}` of the "every imported module is precached" loop — with the block
below. Replacing the whole span rather than patching around it keeps `bare` (currently declared
at line 35, *after* the code that will now need it) ahead of its first use; splicing the new
sections in above it would put it in a temporal dead zone.

```js
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
```

- [ ] **Step 2: Delete the now-duplicated leftovers**

The replacement above re-emits the first section in full, so the original
`console.log('— every imported module is precached, query and all —');` header, its loop, and
the standalone `const bare = ...` line must not survive. After the edit, confirm each appears
exactly once:

```bash
grep -c "const bare\|every imported module is precached" work/shell-check.mjs
```

Expected: `2` (one of each). `existsSync` is already imported on line 16, so no import change is
needed here.

- [ ] **Step 3: Update the header comment**

Change the closing paragraph of the leading block comment (currently "Found exactly that
mismatch on anatomy-data.js, hence this file.") to:

```
 * Found exactly that mismatch on anatomy-data.js, hence this file. Phase 2 moved
 * the app's imports into studio.js / study.js and added a stylesheet the HTML
 * pulls in by <link>, so this now reads all three files and polices tag
 * references as well — and fails if it finds nothing, rather than passing on an
 * empty set.
```

- [ ] **Step 4: Verify it fails when it should**

Temporarily change `'./app.css?v=1',` in `outputs/sw.js` to `'./app.css',` and run:

```bash
node work/shell-check.mjs
```

Expected: a FAIL line naming `app.css?v=1` and a non-zero exit. **Restore the entry** and
re-run; expected `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add work/shell-check.mjs
git commit -m "test(shell-check): follow imports into the extracted app files"
```

---

### Task 4: Point `load-check.mjs` and `syntax-check.mjs` at the app wherever it lives

**Files:**
- Modify: `work/load-check.mjs:40-43`, `work/load-check.mjs:94`
- Modify: `work/syntax-check.mjs:30-33`

Both use the identical regex and both need the identical fix. They must keep working whether
the code is inline or extracted, and must fail if it is neither — a check that silently
verifies zero modules is worse than no check, because the suite still reports green.

- [ ] **Step 1: Fix `work/load-check.mjs`**

Replace lines 40–43:

```js
const html = readFileSync(join(OUT, 'radiography-study-studio.html'), 'utf8');
const blocks = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
console.log(`inline module scripts: ${blocks.length}`);
for (const [i, s] of blocks.entries()) await parseCheck(`inline-module[${i}]`, s);
```

with:

```js
/*
 * The two application modules. Phase 2 moved them out of the HTML into
 * studio.js and study.js; read them from there, falling back to the inline
 * blocks so this keeps working on older checkouts. Finding NEITHER is a
 * failure, not an empty pass — this check exists because a load-time death
 * shipped once, and a silent zero-module run would let the next one through.
 */
const html = readFileSync(join(OUT, 'radiography-study-studio.html'), 'utf8');
const EXTRACTED = ['studio.js', 'study.js'];
let blocks = [];
if (EXTRACTED.every((f) => existsSync(join(OUT, f)))) {
  blocks = EXTRACTED.map((f) => ({ label: `outputs/${f}`, src: readFileSync(join(OUT, f), 'utf8') }));
} else {
  blocks = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
    .map((m, i) => ({ label: `inline-module[${i}]`, src: m[1] }));
}
console.log(`application modules: ${blocks.length} (${blocks.map((b) => b.label).join(', ') || 'NONE'})`);
if (blocks.length < 2) fail(`expected 2 application modules, found ${blocks.length} — the app moved and this check did not follow it`);
for (const b of blocks) await parseCheck(b.label, b.src);
```

Add `existsSync` to the import on line 19:

```js
import { readFileSync, existsSync } from 'node:fs';
```

- [ ] **Step 2: Fix the stage-2 loop in `work/load-check.mjs`**

Replace lines 94–99:

```js
const sources = blocks.map((src) => src.replace(/from\s+(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => `from ${q}${moduleUrl(spec.replace(/^\.\//, '').split('?')[0])}${q}`));
for (const [i, src] of sources.entries()) {
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64');
  try { await import(url); console.log(`OK    eval  inline-module[${i}] (ran to completion under stubs)`); }
  catch (e) { classify(`inline-module[${i}]`, e); }
}
```

with:

```js
for (const b of blocks) {
  const src = b.src.replace(/from\s+(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => `from ${q}${moduleUrl(spec.replace(/^\.\//, '').split('?')[0])}${q}`);
  const url = 'data:text/javascript;base64,' + Buffer.from(src, 'utf8').toString('base64');
  try { await import(url); console.log(`OK    eval  ${b.label} (ran to completion under stubs)`); }
  catch (e) { classify(b.label, e); }
}
```

- [ ] **Step 3: Fix `work/syntax-check.mjs`**

Replace lines 30–33:

```js
const html = readFileSync(join(root, 'outputs', 'radiography-study-studio.html'), 'utf8');
const blocks = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
console.log(`inline module scripts: ${blocks.length}`);
for (const [i, s] of blocks.entries()) await check(`inline-module[${i}]`, s);
```

with:

```js
/*
 * The two application modules, wherever they live. Phase 2 extracted them to
 * studio.js / study.js; the inline fallback keeps older checkouts working.
 * Fewer than two is a failure — an empty match set used to exit 0 and report
 * ALL PARSED CLEAN having parsed nothing.
 */
const OUT = join(root, 'outputs');
const html = readFileSync(join(OUT, 'radiography-study-studio.html'), 'utf8');
const EXTRACTED = ['studio.js', 'study.js'];
const blocks = EXTRACTED.every((f) => existsSync(join(OUT, f)))
  ? EXTRACTED.map((f) => ({ label: `outputs/${f}`, src: readFileSync(join(OUT, f), 'utf8') }))
  : [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
      .map((m, i) => ({ label: `inline-module[${i}]`, src: m[1] }));
console.log(`application modules: ${blocks.length} (${blocks.map((b) => b.label).join(', ') || 'NONE'})`);
if (blocks.length < 2) { failed++; console.log(`FAIL  expected 2 application modules, found ${blocks.length}`); }
for (const b of blocks) await check(b.label, b.src);
```

Add `existsSync` to the import on line 8:

```js
import { readFileSync, existsSync } from 'node:fs';
```

- [ ] **Step 4: Verify both find the extracted files**

```bash
node work/syntax-check.mjs
```

Expected: `application modules: 2 (outputs/studio.js, outputs/study.js)` then `ALL PARSED CLEAN`.

```bash
node work/load-check.mjs
```

Expected: `application modules: 2 (outputs/studio.js, outputs/study.js)` then
`NO LOAD-TIME ERRORS FOUND`.

- [ ] **Step 5: Verify the guard bites**

```bash
mv outputs/studio.js outputs/studio.js.bak && node work/syntax-check.mjs; mv outputs/studio.js.bak outputs/studio.js
```

Expected: with `studio.js` absent the extracted branch is skipped, the inline fallback finds
zero blocks, and the run reports `FAIL expected 2 application modules, found 0` with a non-zero
exit. Confirm `outputs/studio.js` is restored afterwards with `git status`.

- [ ] **Step 6: Commit**

```bash
git add work/load-check.mjs work/syntax-check.mjs
git commit -m "test(checks): read the app modules from studio.js and study.js"
```

---

### Task 5: Lift the region classifiers from `studio.js`

**Files:**
- Modify: `work/region-probe.mjs:19-46`

This one already fails loudly (`throw` on a missing marker), so it only needs the new path. Its
output is a committed baseline — after the change `node work/baseline.mjs --check` must still
show no diff, which is the proof that the classifiers moved unchanged.

- [ ] **Step 1: Read from the extracted module**

Replace line 25:

```js
const html = readFileSync(join(root, 'outputs/radiography-study-studio.html'), 'utf8');
```

with:

```js
/*
 * Phase 2 moved the studio block out of the HTML. The variable keeps its name
 * so the lift() calls below are untouched — what matters is that this reads the
 * code that actually ships, whichever file that is today.
 */
const STUDIO = join(root, 'outputs/studio.js');
const html = readFileSync(existsSync(STUDIO) ? STUDIO : join(root, 'outputs/radiography-study-studio.html'), 'utf8');
```

Add `existsSync` to the import on line 19:

```js
import { readFileSync, existsSync } from 'node:fs';
```

- [ ] **Step 2: Update the header comment**

Change the sentence "This lifts both classifiers straight out of the HTML and runs them over the
real mesh names read from the skeleton GLB, so neither can regress silently." to:

```
 * This lifts both classifiers straight out of outputs/studio.js and runs them
 * over the real mesh names read from the skeleton GLB, so neither can regress
 * silently.
```

- [ ] **Step 3: Verify against the baseline**

```bash
node work/region-probe.mjs
```

Expected: the same output as before the move. Then:

```bash
node work/baseline.mjs --check
```

Expected: `ALL PASS` — no baseline diff. A diff here means the extraction changed the
classifiers, which would contradict Task 1's lossless proof; investigate rather than
re-baselining.

- [ ] **Step 4: Commit**

```bash
git add work/region-probe.mjs
git commit -m "test(region-probe): lift the classifiers from studio.js"
```

---

### Task 6: Teach the code map about the extracted files

**Files:**
- Modify: `work/codemap.mjs:20-21`, `work/codemap.mjs:165-227`

The map's whole value is that a session can find 200 lines without reading anything bigger. The
HTML is now ~810 lines of markup and the code lives in two banner-sectioned modules, so the map
must section those instead.

- [ ] **Step 1: Name the application files**

After the `GENERATED` map at line 21, add:

```js
/*
 * The application itself, lifted out of the HTML in phase 2. These are listed
 * separately from the data modules: they are the code a session usually wants,
 * and they are the only outputs/*.js files that are not a data layer.
 */
const APP_JS = ['studio.js', 'study.js'];
const APP_CSS = 'app.css';
```

- [ ] **Step 2: Label external module scripts by what they load**

`htmlBlocks()` classifies `<script type="module" ...>` by counting: first is `studio`, second is
`study`. After the extraction those tags are one-liners carrying a `src`, and calling them
`studio · preamble` would be actively misleading — the studio code is no longer there. Replace
the `type="module"` branch (line 74) with:

```js
    else if (/<script\b[^>]*type="module"/.test(l)) {
      /* An external module tag names its file; only an inline block is a block
         of code this map should try to section. */
      const src = (l.match(/src="\.\/([^"?]+)/) || [])[1];
      label = src ? `loads ${src}` : (['studio', 'study'][moduleN++] || `module ${moduleN}`);
    }
```

- [ ] **Step 3: Replace the HTML section and add an application section**

Replace the whole block from `/* ---- the HTML ---- */` (line 165) down to the blank `p();`
before `/* ---- the data modules ---- */` (line 213) with:

```js
/* ---- the HTML ---- */
const htmlLines = linesOf(join(outputs, HTML));
const blocks = htmlBlocks(htmlLines);
const inlineModules = blocks.filter((b) => (b.label === 'studio' || b.label === 'study') && b.to > b.from);
const hasInlineCss = blocks.some((b) => b.label === 'CSS' && b.to > b.from);
const extracted = [...APP_JS, APP_CSS].filter((f) => existsSync(join(outputs, f)));

/*
 * The app's code must be accounted for SOMEWHERE — inline in the HTML, or in
 * the extracted files. If neither is true the map has quietly lost most of its
 * rows, so say it IN the map; codemap-check.mjs fails while this warning is
 * present, which makes the collapse impossible to commit unnoticed.
 */
const SPLIT_WARNING = 'WARNING — work/codemap.mjs needs updating.';
const accounted = extracted.length === 3 || (inlineModules.length === 2 && hasInlineCss);

p(`## \`outputs/${HTML}\` — ${htmlLines.length} lines`);
p();
if (!accounted) {
  /* Build the file list outside the template — nesting backticks inside a
     template literal that is itself emitting backticks is how you get a map
     that renders as one long code span. */
  const appList = [...APP_JS, APP_CSS].map((f) => '`' + f + '`').join(', ');
  p(`> **${SPLIT_WARNING}** The app's code is neither inline in the HTML nor in`);
  p(`> ${appList}. Teach the generator where it went — until then this map is`);
  p('> missing most of what makes it useful.');
  p();
}
const htmlTraps = trapCell(`outputs/${HTML}`);
if (htmlTraps) { p(`Traps: ${htmlTraps.replace(/<br>/g, ' · ')}`); p(); }
p('| Lines | Section |');
p('| --- | --- |');
/*
 * Account for EVERY line, not just the blocks. The markup between </head> and
 * the script tags — the nav rail, the five views, the dialogs — has no banners
 * in it. Leaving it out of a table headed "where everything is" tells a session
 * working on markup that there is nothing to find, which is worse than telling
 * it to grep.
 */
let cursor = 1;
for (const b of blocks) {
  if (b.from > cursor) p(`| ${cursor}–${b.from - 1} | markup — no banners, grep here |`);
  /* A one-line tag is not a block of code to section — sectioning it produces a
     bogus "· preamble" row for a line that only names a file. */
  if (b.from === b.to) p(`| ${b.from}–${b.to} | ${b.label} |`);
  else for (const r of sections(htmlLines, b.from, b.to, `${b.label} · `)) {
    p(`| ${r.from}–${r.to} | ${r.title} |`);
  }
  cursor = b.to + 1;
}
if (cursor <= htmlLines.length) p(`| ${cursor}–${htmlLines.length} | markup — no banners, grep here |`);
p();

/* ---- the application modules ---- */
const appPresent = APP_JS.filter((f) => existsSync(join(outputs, f)));
if (appPresent.length) {
  p('## The application — `outputs/studio.js`, `outputs/study.js`');
  p();
  p('The two module blocks that were inline in the HTML until phase 2. They keep');
  p('separate import scopes and talk only through `window.__osteo`.');
  p();
  if (existsSync(join(outputs, APP_CSS))) {
    const cssLines = linesOf(join(outputs, APP_CSS));
    const cssTraps = trapCell(`outputs/${APP_CSS}`);
    p(`\`outputs/${APP_CSS}\` — ${cssLines.length} lines.${cssTraps ? ` Traps: ${cssTraps.replace(/<br>/g, ' · ')}` : ''}`);
    p();
  }
  for (const f of appPresent) {
    const ls = linesOf(join(outputs, f));
    const t = trapCell(`outputs/${f}`);
    p(`**\`outputs/${f}\`** — ${ls.length} lines`);
    p();
    if (t) { p(`Traps: ${t.replace(/<br>/g, ' · ')}`); p(); }
    p('| Lines | Section |');
    p('| --- | --- |');
    for (const r of sections(ls, 1, ls.length, '')) p(`| ${r.from}–${r.to} | ${r.title} |`);
    p();
  }
}
```

- [ ] **Step 4: Keep the application modules out of the data-module table**

At line 216, change:

```js
const mods = readdirSync(outputs).filter((f) => f.endsWith('.js')).sort();
```

to:

```js
/* studio.js and study.js are the app, not a data layer — they get their own
   section above, and listing them here would give them two homes in the map. */
const mods = readdirSync(outputs).filter((f) => f.endsWith('.js') && !APP_JS.includes(f)).sort();
```

- [ ] **Step 5: Regenerate and check the size**

```bash
node work/codemap.mjs
```

Expected: a line count report. Then confirm the warning is absent and the app section is present:

```bash
grep -c 'WARNING' docs/CODEMAP.md
```

Expected: `0`.

```bash
grep -n '^## ' docs/CODEMAP.md
```

Expected four sections: the HTML, The application, Data modules, Verifiers and generators.

- [ ] **Step 6: Verify the guard bites**

```bash
mv outputs/study.js outputs/study.js.bak && node work/codemap.mjs --stdout | grep -c 'WARNING'; mv outputs/study.js.bak outputs/study.js
```

Expected: `1`. Then regenerate the real map and confirm `git status` shows `outputs/study.js`
restored.

- [ ] **Step 7: Commit**

```bash
node work/codemap.mjs
git add work/codemap.mjs docs/CODEMAP.md
git commit -m "docs(codemap): map studio.js, study.js and app.css"
```

---

### Task 7: Reassign the traps to the files that now govern them

**Files:**
- Modify: `docs/TRAPS.md` — six `###` headings
- Regenerate: `docs/CODEMAP.md`

`codemap-check.mjs` validates that every `###` heading names a file that exists, and
`codemap.mjs` builds the Traps column by matching heading paths to files. Leaving the headings
pointing at the HTML would put the studio traps on the markup and none on the code.

- [ ] **Step 1: Rewrite the six headings**

| Line | From | To |
| --- | --- | --- |
| 9 | ``### The studio block — `outputs/radiography-study-studio.html` `` | ``### The studio block — `outputs/studio.js` `` |
| 55 | ``### Overlays and cavities — `outputs/cavity-build.js`, `outputs/cavity-geom.js`, `outputs/radiography-study-studio.html` `` | ``### Overlays and cavities — `outputs/cavity-build.js`, `outputs/cavity-geom.js`, `outputs/studio.js` `` |
| 105 | ``### The region grid and classifiers — `outputs/radiography-study-studio.html`, `outputs/cavity-build.js` `` | ``### The region grid and classifiers — `outputs/studio.js`, `outputs/cavity-build.js` `` |
| 128 | ``### Visibility and hiding — `outputs/radiography-study-studio.html` `` | ``### Visibility and hiding — `outputs/studio.js` `` |
| 251 | ``### CSS — `outputs/radiography-study-studio.html` `` | ``### CSS — `outputs/app.css` `` |
| 282 | ``### The viewer is a manipulation surface — `outputs/radiography-study-studio.html` `` | ``### The viewer is a manipulation surface — `outputs/studio.js`, `outputs/app.css` `` |

The last one names two files on purpose: its first bullet is about `resize()` and the
`ResizeObserver` on `#stage` (studio code), its second is about `#viewerView *` setting
`user-select:none` (a CSS rule). Both files must reach it from the map.

- [ ] **Step 2: Verify no trap section still names the HTML**

```bash
grep -n '^### .*radiography-study-studio.html' docs/TRAPS.md
```

Expected: no output. If a section genuinely governs the markup, keep it and say so here rather
than silently reassigning it.

- [ ] **Step 3: Confirm every trap is still reachable**

```bash
node work/codemap-check.mjs
```

Expected: `ALL PASS` — every heading names a real file, and the committed map matches a fresh
generation.

- [ ] **Step 4: Regenerate and commit**

```bash
node work/codemap.mjs
git add docs/TRAPS.md docs/CODEMAP.md
git commit -m "docs(traps): file each trap under the module that now owns it"
```

---

### Task 8: Full verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Run the whole suite**

```bash
node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/shell-check.mjs && node work/search-probe.mjs && node work/region-probe.mjs && node work/figure-key-check.mjs && node work/codemap-check.mjs && node work/data-index-check.mjs && node work/baseline.mjs --check
```

Expected: every one passes. `baseline.mjs --check` must show **no diff** — this phase changed
no behaviour, so any baseline movement is a bug in the extraction.

- [ ] **Step 2: Confirm the code is genuinely unchanged, end to end**

Task 1 proved losslessness against the working tree at the time. This re-proves it against the
merge commit the phase started from, after every later task has touched the tree. A shell
one-liner here would be a quoting minefield on Windows, so write `$SCRATCH/identical.mjs`:

```js
/* Does what ships today still equal what shipped at e607a06, character for
   character? Nothing in phase 2 was allowed to change a line of application code. */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const orig = execFileSync('git', ['show', 'e607a06:outputs/radiography-study-studio.html'],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const blocks = [...orig.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const norm = (s) => s.replace(/\r\n/g, '\n').replace(/^\n/, '').replace(/\n$/, '');

let bad = 0;
for (const [i, f] of ['studio.js', 'study.js'].entries()) {
  const same = norm(blocks[i]) === norm(readFileSync(`outputs/${f}`, 'utf8'));
  console.log(`  ${same ? 'ok  ' : 'FAIL'} outputs/${f} is character-identical to inline-module[${i}]`);
  if (!same) bad++;
}
process.exit(bad ? 1 : 0);
```

```bash
node "$SCRATCH/identical.mjs"
```

Expected: two `ok` lines. `norm` trims one leading and one trailing newline from each side — the
inline blocks began with the newline after `<script type="module">` and ended with the one before
`</script>`, and the extracted files carry a single trailing newline. Every other character must
match.

- [ ] **Step 3: Report the sizes**

```bash
wc -l outputs/radiography-study-studio.html outputs/app.css outputs/studio.js outputs/study.js docs/CODEMAP.md
```

Record the numbers — they go in the spec's result section.

- [ ] **Step 4: Manual pass in real Chrome**

The spec requires this for phases 2, 4 and 5. Start the server:

```bash
node work/dev-server.mjs
```

Open `http://localhost:8420/radiography-study-studio.html` in **real Chrome** (the in-app
Browser pane freezes animations and will not register the service worker). Check, in order:

1. The page is styled — a missing `app.css` shows as unstyled markup, which is the loudest
   possible failure and the first thing to rule out.
2. Boot on Today, then open Viewer. The model must fill the stage, not a phone-shaped strip
   (the degenerate-resize trap).
3. Open a cavity overlay, then toggle the vessel layer on afterwards. The overlay must rebuild
   (the remeasure trap).
4. Search for a structure, open it in the viewer, confirm it auto-uncovers.
5. Open the hidden tray and show something back.
6. DevTools console must be free of module-loading errors, and the Network tab must show
   `app.css?v=1`, `studio.js?v=1` and `study.js?v=1` all 200.

If anything fails, stop and report it rather than continuing to phase 3.

- [ ] **Step 5: Commit anything the checks changed**

If nothing changed, there is nothing to commit and that is the expected outcome.
