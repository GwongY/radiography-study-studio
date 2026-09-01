# Phase 3 — the corpus splits behind a barrel

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `outputs/study-data.js` (4,897 lines) into seventeen files under
`outputs/study/corpus/`, leaving `study-data.js` as a barrel whose public surface is **exactly
the same 57 exports**, so all thirteen importers are untouched.

**Architecture:** Every corpus file is one contiguous line range of the original, moved verbatim.
The only edits to moved code are a prefixed `export ` on ten arrays that were file-private and
now cross a file boundary. The barrel re-exports the 57 names **explicitly** — not `export *`,
which would leak those ten and widen the API.

**Tech Stack:** Vanilla ES modules, no build step. Windows host, `core.autocrlf` on.

---

## Why this is safe to attempt

Measured before planning, with a dependency analyser over the file's 22 banner sections:

- **The sections form a DAG — no mutual dependencies.** Fifteen of the twenty-two need nothing
  from any other section. Only five have edges at all: structure-set items → structure sets,
  movement items → joint movements, the assembled corpus → eight item arrays, validation → five
  sections, spaced repetition → six sections.
- **One external import**, `./anatomy-data.js`, used in exactly one section (osteology items,
  lines 4111–4236). Of the three names it imports, `getAnatomy` is **never used** anywhere in the
  file.
- **74 top-level names**, 57 of them already exported.

## The proof this phase rests on

Phase 2 could prove byte-identity. Phase 3 cannot — file headers and imports are added by
definition — so the proof is semantic instead, and it is stronger:

`work/baselines/corpus-snapshot.txt`, captured **before** the split, hashes every one of the 57
exports and every one of the 94 study items individually by id. A moved lesson word, a dropped
`sourceRefs` entry, a reordered `options` array, or a 58th export leaking out of the barrel each
move exactly one line of it, and the line names what changed. `node work/baseline.mjs --check`
must show no diff.

That is also why the barrel must not use `export *`: the ten newly-exported arrays would widen
the surface from 57 to 67, and the snapshot would (correctly) fail.

## File structure

Each file is one contiguous range of the original. `→` marks names that gain an `export ` prefix
because they now cross a file boundary.

| File under `outputs/study/corpus/` | Lines | Count | Needs |
| --- | --- | --- | --- |
| `schema.js` | 16–403 | 388 | — |
| `hss-terminology.js` | 404–642 | 239 | → `HSS_TERMINOLOGY` |
| `hss-osteology.js` | 643–1288 | 646 | → `HSS_OSTEOLOGY` |
| `hss-joints.js` | 1289–1500 | 212 | → `HSS_JOINTS` |
| `modules.js` | 1501–1562 | 62 | — |
| `hss-modules.js` | 1563–1924 | 362 | → `HSS_MODULES` |
| `physiology-items.js` | 1925–2836 | 912 | → `PHYS_ITEMS` |
| `hti-items.js` | 2837–3187 | 351 | → `HTI_ITEMS` |
| `notices.js` | 3188–3220 | 33 | — |
| `structures.js` | 3221–3560 | 340 | — |
| `expansion-items.js` | 3561–4110 | 550 | → `EXPANSION_ITEMS` |
| `derived-items.js` | 4111–4435 | 325 | `../../anatomy-data.js`, `./structures.js`; → `BONE_ITEMS`, `STRUCTURE_ITEMS`, `MOVEMENT_ITEMS` |
| `corpus.js` | 4436–4475 | 40 | the ten item arrays |
| `validate.js` | 4476–4589 | 114 | `./schema.js`, `./structures.js`, `./corpus.js` |
| `diagrams.js` | 4590–4631 | 42 | — |
| `coverage.js` | 4632–4784 | 153 | — |
| `mastery.js` | 4785–4897 | 113 | `./schema.js`, `./corpus.js`, `./coverage.js` |

Lines 1–13 are the file header; line 14 is the `anatomy-data.js` import; line 15 is blank. The
header is rewritten for the barrel, and the import moves to `derived-items.js` **minus
`getAnatomy`** — the one deliberate deviation from "no cleanup", called out here because carrying
a dead specifier into a new file is not preserving behaviour, it is preserving a wart. Nothing
observable changes; the snapshot proves it.

## The offline trap this phase walks into

`shell-check.mjs` scrapes `from './x.js'` with a character class that excludes `/`, and only from
the HTML, `studio.js` and `study.js`. The barrel's seventeen `./study/corpus/*.js` imports match
neither the pattern nor the file list, so **every corpus file would fall out of the offline shell
and 404, and the check would still say ALL PASS.**

The fix is not to widen the regex — it is to walk the import graph transitively from the entry
points, so any module reachable from the app must be precached whatever its depth or path. That
is what the rule was always trying to say.

---

### Task 1: Make `shell-check.mjs` follow the whole import graph

**Files:** Modify `work/shell-check.mjs`

Do this **before** the split, so the check is ready to catch a missing SHELL entry the moment
one exists.

- [ ] **Step 1: Replace the import scrape with a transitive walk**

Replace the `APP_FILES` / `imports` block with:

```js
/*
 * Every local module reachable from the app, at any depth. Phase 2 moved the
 * imports into studio.js / study.js; phase 3 put the corpus two directories
 * down behind a barrel. A flat scrape of the entry points would have missed all
 * seventeen corpus files — they would have 404'd offline while this said ALL
 * PASS — so walk the graph instead of pattern-matching one level of it.
 */
const ENTRIES = ['radiography-study-studio.html', 'studio.js', 'study.js'];
const imports = new Set();            /* specifier as written, query and all */
const seen = new Set();
function walk(rel) {
  if (seen.has(rel)) return;
  seen.add(rel);
  const abs = join(root, rel);
  if (!existsSync(abs)) return;
  const dir = dirname(rel);
  for (const m of readFileSync(abs, 'utf8').matchAll(/from\s+'(\.\.?\/[^']+\.js(?:\?v=\d+)?)'/g)) {
    /* Resolve against the importing file, then record it as the service worker
       would see it: a path relative to outputs/, forward slashes. */
    const resolved = normalize(join(dir, m[1])).replace(/\\/g, '/');
    imports.add(resolved);
    walk(resolved.split('?')[0]);
  }
}
for (const e of ENTRIES) walk(e);
```

Add `dirname` and `normalize` to the `node:path` import on line 17:

```js
import { join, dirname, normalize } from 'node:path';
```

- [ ] **Step 2: Report the depth reached**

Change the guard line so a collapse is visible as a number, not just a boolean:

```js
ok(imports.size > 0, `found ${imports.size} local modules reachable from ${ENTRIES.join(', ')}`);
```

- [ ] **Step 3: Verify it still passes before anything moves**

```bash
node work/shell-check.mjs
```

Expected: `ALL PASS`, and the count is 16 — the same modules as before, since nothing has been
split yet. If the count dropped, the walker is wrong; fix it now rather than after the split,
when a real miss and a walker bug look identical.

- [ ] **Step 4: Commit**

```bash
git add work/shell-check.mjs
git commit -m "test(shell-check): walk the import graph instead of scraping one level"
```

---

### Task 2: Split the corpus

**Files:** Create `outputs/study/corpus/*.js` (17), rewrite `outputs/study-data.js`

- [ ] **Step 1: Write the split script**

`$SCRATCH/split-corpus.mjs`, driven by the file table above. Each entry carries the range, the
banner to put at the top, the imports to add, and the names to make exported.

- [ ] **Step 2: Run it, then check the surface immediately**

```bash
node "$SCRATCH/split-corpus.mjs" "$PWD/outputs" && node work/corpus-snapshot.mjs | head -3
```

Expected: `57 exports`. **58 or 56 means stop** — the barrel is leaking or dropping a name, and
every later check would be measuring the wrong surface.

- [ ] **Step 3: Prove the content did not move**

```bash
node work/baseline.mjs --check
```

Expected: `ALL PASS`, `corpus-snapshot` included. This is the phase's whole safety argument.

- [ ] **Step 4: Commit**

```bash
git add outputs/study outputs/study-data.js
git commit -m "refactor(corpus): split study-data.js into study/corpus behind a barrel"
```

---

### Task 3: Precache the corpus, and prove the walker catches it

**Files:** Modify `outputs/sw.js`

- [ ] **Step 1: Watch the check fail first**

```bash
node work/shell-check.mjs
```

Expected: seventeen FAIL lines, one per corpus file, each saying it is imported but the shell
lists nothing for it. **If this passes, Task 1 is broken** — the walker is not reaching the
corpus, and the offline build is silently broken.

- [ ] **Step 2: Add the entries and bump the version**

`CACHE_VERSION` to `'v55'`, and after `'./study-data.js',` add the seventeen
`'./study/corpus/<name>.js',` lines with a comment saying the barrel is what the app imports and
these are what the barrel needs.

- [ ] **Step 3: Verify**

```bash
node work/shell-check.mjs
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/sw.js
git commit -m "fix(sw): precache the corpus files behind the barrel"
```

---

### Task 4: Map, document, verify

- [ ] **Step 1: Regenerate both generated documents**

```bash
node work/codemap.mjs && node work/data-index.mjs
```

- [ ] **Step 2: Run everything**

```bash
node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/shell-check.mjs && node work/search-probe.mjs && node work/region-probe.mjs && node work/figure-key-check.mjs && node work/codemap-check.mjs && node work/data-index-check.mjs && node work/baseline.mjs --check
```

Expected: all pass. `verify-modules` and `load-check` both exercise `validateCorpus()`, which
must stay at zero failures.

- [ ] **Step 3: Browser pass**

Reload the app and confirm a lesson still renders with its sources — the corpus is what a lesson
is made of, so a broken barrel shows up as an empty session list.

- [ ] **Step 4: Commit**

```bash
git add docs/CODEMAP.md docs/DATA-INDEX.md
git commit -m "docs: regenerate the map and data index for the split corpus"
```
