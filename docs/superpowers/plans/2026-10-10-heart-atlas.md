# Heart Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Heart atlas" mode to the explorer's main 3D scene that brings in BetterHeart's four-chamber cavities, moving valves, coronary flow, conduction system, heartbeat/ECG clock and TTE/TEE echo sections, registered onto the explorer's own `dolasim.glb` heart.

**Architecture:** A new `outputs/heart/` folder holds BetterHeart's mesh data and its factory modules (decoupled from their page DOM), plus our own `atlas.js` that builds one `THREE.Group` in BetterHeart's frame and a generated `alignment.js` that maps that frame onto `dolasim.glb`. A new studio part `outputs/studio/heart-atlas.js` mounts the group under the circulatory layer's root, hides the explorer's own heart meshes while the mode is on, and drives the group from the studio's frame loop. Spec: `docs/superpowers/specs/2026-10-10-heart-atlas-design.md`.

**Tech Stack:** Plain ES modules, three.js 0.161 via the page import map, no build step. Node verifiers in `work/`.

**Facts established while planning (do not re-derive):**
- BetterHeart's frame = `dolasim.glb` body frame × **24** + a shift, no rotation. Fitting 39 same-named meshes gave per-axis slopes 23.999 / 23.984 / 24.001 and a worst centre residual of 0.016 on a ~3-unit heart.
- `outputs/studio/depth-picking.js:loadExtraModel` puts a layer's GLB under `root` carrying the body transform, inside a `pivot` added to `state.scene`. `state.extraModels.circulatory = { root, pivot, meshes }`. Layer separation moves `root.position.x`, so the atlas group must be a **child of `root`**.
- `meshOn(mesh)` in `outputs/studio/live-physiology.js` is the single predicate that decides whether a layer mesh is shown; `applyLayers()` (same file) re-applies it on every layer change.
- The frame loop is `animate()` in `outputs/studio/region-boxes-how.js`; it already computes `state.motionPhase` (seconds).
- Host picking listens on `els.stage` (`pointerup`); an atlas pick must stop it by listening on a parent in the capture phase.
- `shell-check.mjs` only walks static `from './x.js?v=N'` imports, and `load-check.mjs` cannot resolve a bare `'three'`. Therefore `outputs/heart/*` is reached only by a **dynamic** `import('../heart/atlas.js?v=1')`, and Task 6 teaches `shell-check.mjs` about dynamic literals.
- `outputs/` and `CLAUDE.md` are CRLF; `work/*.mjs` is LF. Use single-line anchors with the Edit tool, or a node patch that handles `\r\n`. New files may be LF.
- **The working tree holds another session's uncommitted edits** (`outputs/sw.js`, `outputs/app.css`, `docs/CODEMAP.md`, `docs/TRAPS.md`, `outputs/README.md`, `outputs/studio/*.js` and more). Never `git add -A` or `git add .`. Before each commit run `git diff --stat <file>` for every file you edit that was already modified; for those, stage only your hunks (see "Staging a shared file" in Task 6).

**Out of scope (user's choice):** PCI, TAVI, ASD and mitral balloon simulators; the schematic nerve tubes; right-heart catheter and the circulation-flow dots; BetterHeart's leader-line label overlay (replaced by tap-to-select and an info card).

---

## File structure

| File | Create/modify | Responsibility |
| --- | --- | --- |
| `outputs/heart/heart-meshes.bin`, `heart-manifest.json` | create (vendored, unchanged) | Mesh data, CC BY-SA 4.0 |
| `outputs/heart/MODEL-NOTICES.txt` | create (vendored) | Their attribution |
| `outputs/heart/{cardiac-cycle,conduction,coronary-flow,coronary-routes,echo-sim,heart-motion,heartbeat,transvalvular-flow,valve-apparatus,valve-rings,valve-surfaces}.js` | create (vendored, patched in Task 2) | Their factories; DOM ids prefixed `ha-`, strings made English-first |
| `outputs/heart/alignment.js` | create (generated) | `ATLAS_SCALE`, `ATLAS_SHIFT` |
| `outputs/heart/descriptions.js` | create (generated once) | Their per-structure Chinese descriptions |
| `outputs/heart/atlas.js` | create | `createHeartAtlas()` — builds the group, presets, selection, picking, update, echo |
| `outputs/studio/heart-atlas.js` | create | Panel DOM, toggle, enter/exit, host heart hiding, camera, pointer, frame hook |
| `work/lib/heart-fit.mjs`, `work/build-heart-alignment.mjs`, `work/heart-atlas-check.mjs` | create | Fit, generator, verifier |
| `outputs/studio.js` | modify | import and init the new part |
| `outputs/studio/live-physiology.js` | modify (1 line in `meshOn`) | `atlasHidden` flag |
| `outputs/studio/region-boxes-how.js` | modify (1 call in `animate`) | frame hook |
| `outputs/study/subject.js` | modify (1 listener) | refresh the layer rail after the mode changes layers |
| `outputs/app.css` | modify (append) | Panel and toggle styles, all sizes `calc(Npx * var(--ts))` |
| `outputs/sw.js` | modify | SHELL entries, lazy cache rule, `CACHE_VERSION` |
| `work/shell-check.mjs` | modify | also walk `import('./x.js?v=N')` literals |
| `outputs/THIRD-PARTY-NOTICES.txt` | modify | BetterHeart attribution |
| `docs/TRAPS.md`, `outputs/README.md`, `docs/CODEMAP.md` | modify | Trap, decision record, regenerated map |

---

### Task 1: Vendor BetterHeart's data and prove the alignment (gate)

**Files:**
- Create: `outputs/heart/*` (data + modules + notices), `work/lib/heart-fit.mjs`, `work/build-heart-alignment.mjs`, `work/heart-atlas-check.mjs`, `outputs/heart/alignment.js`
- Modify: `outputs/THIRD-PARTY-NOTICES.txt`

- [ ] **Step 1: Download the files (explicitly authorised by the user, ~1.9 MB total)**

Run from the repo root:

```bash
mkdir -p outputs/heart
B=https://skypray.synology.me/betterheart/heart-anatomy
for f in cardiac-cycle.js conduction.js coronary-flow.js coronary-routes.js echo-sim.js heart-motion.js heartbeat.js transvalvular-flow.js valve-apparatus.js valve-rings.js valve-surfaces.js heart-manifest.json heart-meshes.bin MODEL-NOTICES.txt; do
  curl -sf -o "outputs/heart/$f" "$B/$f" || echo "FAILED $f"
done
ls -l outputs/heart
```

Expected: no `FAILED` line; `heart-meshes.bin` is 957696 bytes; `heart-manifest.json` 27856 bytes. (The page imports them with `?v=` queries; those are only cache-busters, the files are the same.)

- [ ] **Step 2: Write the fit library**

Create `work/lib/heart-fit.mjs`:

```js
/*
 * heart-fit.mjs — BetterHeart's frame against the explorer's dolasim.glb.
 *
 * BetterHeart's manifest was made from the same dolasim.glb, then scaled and
 * shifted. Every manifest mesh that has a same-named mesh in our GLB gives one
 * pair of boxes; the frame is atlas = SCALE * body + shift, with no rotation.
 * Measured on 2026-10-10: per-axis slope 23.999 / 23.984 / 24.001.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { boxesIn } from './mesh-names.mjs';

export const HEART_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'outputs', 'heart');
export const SCALE = 24;
const norm = (s) => String(s).replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const centre = (b, k) => (b[0][k] + b[1][k]) / 2;

export const loadManifest = () => JSON.parse(readFileSync(join(HEART_DIR, 'heart-manifest.json'), 'utf8'));

/* Manifest meshes that are the same named mesh in dolasim.glb. The BodyParts3D
   cavities (group "chambers") and the two FJ2420/FJ2421 leaflets are not in it. */
export function matchedRows(manifest = loadManifest()) {
  const host = boxesIn('assets/dolasim.glb');
  const byName = new Map([...host].map(([k, v]) => [norm(k), v]));
  const rows = [];
  for (const m of manifest.meshes) {
    if (m.group === 'chambers') continue;
    const h = byName.get(norm(m.sourceName));
    if (h) rows.push({ name: m.sourceName, atlas: [m.min, m.max], host: h });
  }
  return rows;
}

export function fit(rows) {
  const shift = [0, 1, 2].map((k) => rows.reduce((s, r) => s + centre(r.atlas, k) - SCALE * centre(r.host, k), 0) / rows.length);
  let worst = 0, worstName = '';
  for (const r of rows) for (let k = 0; k < 3; k++) {
    const e = Math.abs(SCALE * centre(r.host, k) + shift[k] - centre(r.atlas, k));
    if (e > worst) { worst = e; worstName = r.name; }
  }
  const ratio = [0, 1, 2].map((k) => {
    let a = 0, h = 0;
    for (const r of rows) { a += r.atlas[1][k] - r.atlas[0][k]; h += r.host[1][k] - r.host[0][k]; }
    return a / h;
  });
  return { shift, worst, worstName, ratio, count: rows.length };
}
```

- [ ] **Step 3: Write the generator**

Create `work/build-heart-alignment.mjs`:

```js
/*
 * Build outputs/heart/alignment.js — the BetterHeart frame to dolasim.glb frame.
 * Usage: node work/build-heart-alignment.mjs          (report only)
 *        node work/build-heart-alignment.mjs --write  (write the module)
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { HEART_DIR, SCALE, fit, matchedRows } from './lib/heart-fit.mjs';

const r = fit(matchedRows());
const shift = r.shift.map((v) => Math.round(v * 1e4) / 1e4);
console.log(`matched ${r.count} meshes; extent ratio ${r.ratio.map((v) => v.toFixed(3)).join(' / ')}; worst centre residual ${r.worst.toFixed(4)} (${r.worstName})`);
console.log(`ATLAS_SHIFT ${JSON.stringify(shift)}`);
if (process.argv.includes('--write')) {
  const src = `/* GENERATED by work/build-heart-alignment.mjs --write. Do not edit.
 * BetterHeart frame = ATLAS_SCALE * (dolasim.glb body frame) + ATLAS_SHIFT, no rotation.
 * Fitted over ${r.count} same-named meshes; worst centre residual ${r.worst.toFixed(4)}.
 * The group in atlas.js therefore takes scale 1/ATLAS_SCALE and position -ATLAS_SHIFT/ATLAS_SCALE. */
export const ATLAS_SCALE = ${SCALE};
export const ATLAS_SHIFT = ${JSON.stringify(shift)};
`;
  writeFileSync(join(HEART_DIR, 'alignment.js'), src);
  console.log('wrote outputs/heart/alignment.js');
}
```

- [ ] **Step 4: Run it in report mode, then write**

```bash
node work/build-heart-alignment.mjs
```

Expected: `matched 39 meshes; extent ratio ≈ 24.0 / 24.0 / 24.0; worst centre residual < 0.02`. **If the ratio is not within ±0.3 of 24 or the residual exceeds 0.03, STOP and report to the user: the atlas will not sit on the body and the design must be revisited.** Otherwise:

```bash
node work/build-heart-alignment.mjs --write
```

- [ ] **Step 5: Write the verifier**

Create `work/heart-atlas-check.mjs`:

```js
/*
 * Heart atlas check — alignment, manifest and mesh data, without a browser.
 *
 *   1. the committed alignment.js still matches a fresh fit of the manifest to dolasim.glb
 *   2. the fit itself is good (uniform scale 24, small residual)
 *   3. every manifest mesh lies inside heart-meshes.bin and every index is in range
 *   4. each BodyParts3D chamber cavity sits inside the wall mesh of the same chamber
 *   5. every manifest key the atlas selects has a description
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { HEART_DIR, SCALE, fit, loadManifest, matchedRows } from './lib/heart-fit.mjs';

let fail = 0;
const ok = (c, m) => { console.log(`  ${c ? 'ok  ' : 'FAIL'} ${m}`); if (!c) fail++; };

const manifest = loadManifest();
const rows = matchedRows(manifest);
const r = fit(rows);
const { ATLAS_SCALE, ATLAS_SHIFT } = await import(pathToFileURL(join(HEART_DIR, 'alignment.js')).href);

console.log('alignment');
ok(rows.length >= 35, `${rows.length} manifest meshes matched to dolasim.glb (need >= 35)`);
ok(ATLAS_SCALE === SCALE, `ATLAS_SCALE is ${SCALE}`);
ok(r.ratio.every((v) => Math.abs(v - SCALE) < 0.3), `extent ratio per axis ${r.ratio.map((v) => v.toFixed(3)).join(' / ')} within 0.3 of ${SCALE}`);
ok(r.worst < 0.03, `worst centre residual ${r.worst.toFixed(4)} (${r.worstName}) < 0.03`);
ok(r.shift.every((v, k) => Math.abs(v - ATLAS_SHIFT[k]) < 1e-3), `committed ATLAS_SHIFT ${JSON.stringify(ATLAS_SHIFT)} matches a fresh fit`);

console.log('mesh data');
const bin = readFileSync(join(HEART_DIR, 'heart-meshes.bin'));
let bad = 0;
for (const m of manifest.meshes) {
  const posEnd = m.positionOffset + m.positionCount * 4;
  const idxEnd = m.indexOffset + m.indexCount * 4;
  if (m.positionOffset % 4 || m.indexOffset % 4 || posEnd > bin.length || idxEnd > bin.length || m.positionCount % 3 || m.indexCount % 3) { bad++; console.log('   bad range', m.key, m.sourceName); continue; }
  const verts = m.positionCount / 3;
  for (let i = 0; i < m.indexCount; i++) if (bin.readUInt32LE(m.indexOffset + i * 4) >= verts) { bad++; console.log('   index out of range', m.key, m.sourceName); break; }
}
ok(bad === 0, `all ${manifest.meshes.length} manifest meshes lie inside the .bin with valid indices`);

console.log('chambers');
for (const key of ['LV', 'RV', 'LA', 'RA']) {
  const wall = manifest.meshes.find((m) => m.group === 'wall' && m.key === key);
  const cav = manifest.meshes.find((m) => m.group === 'chambers' && m.key === key);
  const inside = wall && cav && [0, 1, 2].every((k) => {
    const pad = 0.1 * (wall.max[k] - wall.min[k]);
    const c = (cav.min[k] + cav.max[k]) / 2;
    return c > wall.min[k] - pad && c < wall.max[k] + pad;
  });
  ok(!!inside, `${key} cavity centre lies inside the ${key} wall box`);
}

console.log('descriptions');
const { DESCRIPTIONS } = await import(pathToFileURL(join(HEART_DIR, 'descriptions.js')).href).catch(() => ({ DESCRIPTIONS: null }));
if (DESCRIPTIONS) {
  const missing = [...new Set(manifest.meshes.map((m) => m.key))].filter((k) => !DESCRIPTIONS[k]);
  ok(missing.length === 0, `every manifest key has a description${missing.length ? ' (missing ' + missing.join(', ') + ')' : ''}`);
} else console.log('  skip descriptions.js not generated yet');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
```

- [ ] **Step 6: Run the verifier**

```bash
node work/heart-atlas-check.mjs
```

Expected: `ALL PASS` (the descriptions block prints `skip`). If a chamber check fails, the cavities are not in the shared frame: stop and report.

- [ ] **Step 7: Attribution**

Append to `outputs/THIRD-PARTY-NOTICES.txt` (it is CRLF; append with CRLF line endings):

```bash
sed 's/$/\r/' >> outputs/THIRD-PARTY-NOTICES.txt <<'EOF'

BetterHeart heart atlas (outputs/heart/)
Source: https://skypray.synology.me/betterheart/heart-anatomy/ — (c) Dr. Huang Tian-Chi (黃天祈醫師), BetterHeart.
Mesh data (heart-meshes.bin, heart-manifest.json) and coronary-routes.js are distributed by their
author under Creative Commons Attribution-ShareAlike 4.0 International; they are adapted from
BodyParts3D (DBCLS, CC BY-SA 2.1 JP) and Z-Anatomy / Dr. Murat Altun's Anatomi Simulatoru.
The full source and modification notice is outputs/heart/MODEL-NOTICES.txt.
The remaining scripts (conduction, heartbeat, valve, coronary-flow, echo-sim) carry no stated licence;
they are included with the repository owner's confirmation that they have the author's permission,
and were modified here (DOM ids namespaced, strings made English-first, host-driven).
EOF
tail -n 12 outputs/THIRD-PARTY-NOTICES.txt
```

- [ ] **Step 8: Commit (only the new files plus the one appended file)**

```bash
git status --short outputs/THIRD-PARTY-NOTICES.txt
git add outputs/heart work/lib/heart-fit.mjs work/build-heart-alignment.mjs work/heart-atlas-check.mjs outputs/THIRD-PARTY-NOTICES.txt
git commit -m "feat(heart): vendor BetterHeart data and prove the dolasim alignment

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

If `git status` showed `THIRD-PARTY-NOTICES.txt` was already modified by someone else, stage it with the "Staging a shared file" procedure in Task 6 instead.

---

### Task 2: Decouple the vendored modules from BetterHeart's page

**Files:**
- Modify: `outputs/heart/heartbeat.js`, `conduction.js`, `heart-motion.js`
- Create (generated once): `outputs/heart/descriptions.js`

The factories read DOM ids that only exist on BetterHeart's page. Namespace them `ha-`, make the valve visibility a callback, and make visible strings English-first. A node patch with hard assertions keeps this mechanical.

- [ ] **Step 1: Write the patch script in the scratchpad (not the repo)**

Create `<scratchpad>/patch-heart-vendor.mjs` (use the session scratchpad directory; run it from the repo root):

```js
import { readFileSync, writeFileSync } from 'node:fs';

const dir = 'outputs/heart/';
const read = (f) => readFileSync(dir + f, 'utf8');
function once(src, from, to, label) {
  const n = src.split(from).length - 1;
  if (n !== 1) throw new Error(`${label}: expected exactly 1 match, found ${n}`);
  return src.replace(from, () => to);
}
function all(src, from, to, label) {
  if (!src.includes(from)) throw new Error(`${label}: not found`);
  return src.split(from).join(to);
}

/* ---- heartbeat.js ---- */
let hb = read('heartbeat.js');
hb = once(hb, "const $=id=>document.getElementById(id);", "const $=id=>document.getElementById('ha-'+id);", 'hb $');
const hbStrings = [
  ["'慢速播放'", "'Slow motion 慢速'"],
  ["'慢速 0.35×'", "'Slow 0.35× 慢速'"],
  ["'Ⅱ 暫停心跳'", "'Ⅱ Pause 暫停'"],
  ["'▶ 播放心跳'", "'▶ Play 播放'"],
  ["'快速節律示意'", "'Rapid rhythm (schematic) 快速節律示意'"],
  ["'P 波 · 心房去極化，接續收縮'", "'P wave · atria depolarise, then contract 心房去極化'"],
  ["'QRS · 心室去極化'", "'QRS · ventricles depolarise 心室去極化'"],
  ["'心室收縮期'", "'Ventricular systole 心室收縮期'"],
  ["'T 波 · 心室再極化，逐漸舒張'", "'T wave · ventricles repolarise, then relax 心室再極化'"],
  ["'舒張期 · 心室充填'", "'Diastole · ventricles fill 舒張期'"],
];
for (const [a, b] of hbStrings) hb = all(hb, a, b, 'hb ' + a);
writeFileSync(dir + 'heartbeat.js', hb);

/* ---- conduction.js ---- */
let cd = read('conduction.js');
cd = once(cd, "document.getElementById('conductionStatus')", "document.getElementById('ha-conductionStatus')", 'cd status');
const cdStrings = [
  ["'竇房結啟動'", "'SA node fires 竇房結啟動'"],
  ["'電氣訊號在心房傳播'", "'Impulse spreads across the atria 電氣訊號在心房傳播'"],
  ["'房室結短暫延遲'", "'AV node delay 房室結短暫延遲'"],
  ["'希氏束傳導'", "'Conduction in the bundle of His 希氏束傳導'"],
  ["'左右束支傳導'", "'Conduction in the bundle branches 左右束支傳導'"],
  ["'浦肯野纖維將訊號送入心室'", "'Purkinje fibres carry the impulse into the ventricles 浦肯野纖維'"],
  ["'心室電氣恢復，準備下一次心跳'", "'Ventricles repolarise, ready for the next beat 心室電氣恢復'"],
];
for (const [a, b] of cdStrings) cd = all(cd, a, b, 'cd ' + a);
writeFileSync(dir + 'conduction.js', cd);

/* ---- heart-motion.js ---- */
let hm = read('heart-motion.js');
hm = once(hm, 'export function createHeartMotion({scene,byKey,deformPoint}){', 'export function createHeartMotion({scene,byKey,deformPoint,isPartOn=()=>true}){', 'hm sig');
hm = once(hm, "document.getElementById(d.key==='PV'?'showPVValve':'show'+d.key).checked", 'isPartOn(d.key)', 'hm part');
hm = once(hm, "document.getElementById('ecgPanel')", "document.getElementById('ha-ecgPanel')", 'hm ecg');
hm = once(hm, "document.getElementById('apparatusStatus')", "document.getElementById('ha-apparatusStatus')", 'hm app');
const hmStrings = [
  ["'心室壓力較高：瓣膜關閉，乳頭肌／腱索維持支持'", "'Ventricular pressure higher: valves closed, papillary muscles and chordae hold the leaflets 瓣膜關閉'"],
  ["'心房壓力較高：瓣膜開啟，血液流入心室'", "'Atrial pressure higher: valves open, blood fills the ventricle 瓣膜開啟'"],
  ["'壓力轉換：瓣葉正在開合'", "'Pressure changing: leaflets opening or closing 瓣葉開合'"],
];
for (const [a, b] of hmStrings) hm = all(hm, a, b, 'hm ' + a);
writeFileSync(dir + 'heart-motion.js', hm);

/* ---- nothing may still read an un-namespaced id ---- */
for (const f of ['heartbeat.js', 'conduction.js', 'heart-motion.js', 'echo-sim.js', 'valve-apparatus.js', 'coronary-flow.js']) {
  const bad = [...read(f).matchAll(/getElementById\((?!'ha-'|\s*id\b)[^)]*\)/g)].map((m) => m[0]);
  if (bad.length) throw new Error(`${f}: un-namespaced lookups remain: ${bad.join(' | ')}`);
}
console.log('patched heartbeat.js, conduction.js, heart-motion.js');
```

- [ ] **Step 2: Run it**

```bash
node "<scratchpad>/patch-heart-vendor.mjs"
git diff --stat outputs/heart   # new files are untracked: use `git status --short outputs/heart` instead
grep -n "getElementById" outputs/heart/*.js | cut -c1-160
```

Expected: `patched ...` printed; every `getElementById` hit is `'ha-...'` or the `'ha-'+id` helper in `heartbeat.js`. If `once()` throws "found 0", the downloaded file differs from the version this plan was written against — re-download (Task 1 Step 1) and retry; do not hand-edit around it.

- [ ] **Step 3: Generate `descriptions.js`**

Their per-structure texts live in `heart.js` lines 23–48 (not vendored). Fetch it to the scratchpad, evaluate those lines and write a module:

```bash
curl -sf -o "<scratchpad>/heart.js" https://skypray.synology.me/betterheart/heart-anatomy/heart.js
node -e "
const fs=require('fs');
const lines=fs.readFileSync(process.argv[1],'utf8').split('\n');
const text=lines.slice(22,48).join('\n');   // lines 23-48, 1-based
const obj=new Function(text+';return descriptions;')();
const keys=Object.keys(obj);
if(keys.length<55) throw new Error('only '+keys.length+' descriptions');
fs.writeFileSync('outputs/heart/descriptions.js',
'/* BetterHeart per-structure descriptions (Traditional Chinese), (c) BetterHeart, used with the owner\'s permission.\n * Shape: key -> [category, title, text]. Shown in the Heart atlas info card; not lesson content. */\nexport const DESCRIPTIONS = '+JSON.stringify(obj,null,1)+';\n');
console.log(keys.length,'descriptions');
" "<scratchpad>/heart.js"
node work/heart-atlas-check.mjs
```

Expected: `~62 descriptions`; the check now runs the `descriptions` block and ends `ALL PASS` (every manifest key — including `PAP` — has an entry; if `PAP` or a key is reported missing, add a one-line fallback in `atlas.js` `describe()` rather than editing the generated file).

- [ ] **Step 4: Commit**

```bash
git add outputs/heart
git commit -m "feat(heart): decouple vendored heart modules from their page, English-first strings

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: `atlas.js` — build the group, presets, selection, update

**Files:**
- Create: `outputs/heart/atlas.js`
- Test: `work/heart-atlas-check.mjs` (extend with a node-side smoke test using a stubbed DOM)

`atlas.js` is the only file of ours in `outputs/heart/`. It owns no DOM except the `ha-*` elements the factories look up, which the studio part builds first (Task 4). It exports `createHeartAtlas()`.

- [ ] **Step 1: Write `outputs/heart/atlas.js`**

```js
/*
 * Heart atlas — BetterHeart's heart, built as one THREE.Group.
 *
 * The group is in BetterHeart's own frame (heart ~3 units across) with a
 * transform that maps it onto the explorer's dolasim.glb heart, so it is meant
 * to be a child of the circulatory layer's `root` -- see alignment.js and
 * work/heart-atlas-check.mjs. The DOM elements the factories read (ids
 * `ha-...`) must exist before createHeartAtlas() is called; studio/heart-atlas.js
 * builds them.
 *
 * Nothing here runs at module scope.
 */
import * as THREE from 'three';
import { createConduction } from './conduction.js?v=2';
import { createHeartMotion } from './heart-motion.js?v=25';
import { createHeartbeat } from './heartbeat.js?v=7';
import { ATLAS_SCALE, ATLAS_SHIFT } from './alignment.js?v=1';
import { DESCRIPTIONS } from './descriptions.js?v=1';

export const CHAMBER_COLOURS = { RA: 0x668ea9, RV: 0x759fae, LA: 0xca998d, LV: 0xb76659 };
const COLOURS = { wall: 0xb97465, valves: 0xe7d6ac, coronary: 0xcf6651, cardiacVein: 0x6884aa, aorta: 0xc96758, cava: 0x7695b9, pa: 0x6c92ae, pv: 0xd78d7b };
const GROUP_NAMES = ['wall', 'chambers', 'valves', 'coronary', 'cardiacVein', 'aorta', 'cava', 'pa', 'pv', 'conduction'];
const GREAT = ['aorta', 'cava', 'pa', 'pv'];
export const PART_KEYS = ['RA', 'RV', 'LA', 'LV', 'TV', 'MV', 'AV', 'PV'];

/* The six teaching scenarios kept from BetterHeart's page. `opacity` is the
   wall's percent; `speed` is the cardiac clock's multiplier; `flow` turns on
   the coronary tracer and transvalvular flow; `dynamic` gives the larger
   ventricular excursion. */
export const PRESETS = {
  natural:    { label: 'Natural 自然外觀',         opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: false },
  chambers:   { label: 'Four chambers 四腔分色',   opacity: 15,  show: { wall: 1, chambers: 1, valves: 0, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false },
  coronary:   { label: 'Coronaries 冠狀動脈',      opacity: 100, show: { wall: 1, chambers: 0, valves: 0, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true  },
  dynamic:    { label: 'Heartbeat 心臟動態',       opacity: 22,  show: { wall: 1, chambers: 1, valves: 1, coronary: 1, great: 1, conduction: 0 }, speed: 1,   flow: true, dynamic: true },
  conduction: { label: 'Conduction 傳導系統',      opacity: 12,  show: { wall: 1, chambers: 0, valves: 0, coronary: 0, great: 1, conduction: 1 }, speed: 0.35, flow: false },
  echo:       { label: 'Ultrasound 超音波切面',    opacity: 100, show: { wall: 1, chambers: 0, valves: 1, coronary: 0, great: 1, conduction: 0 }, speed: 1,   flow: false, echo: true },
};

export async function createHeartAtlas({ base = new URL('./', import.meta.url).href } = {}) {
  const [manifest, data] = await Promise.all([
    fetch(base + 'heart-manifest.json').then((r) => { if (!r.ok) throw new Error('heart manifest ' + r.status); return r.json(); }),
    fetch(base + 'heart-meshes.bin').then((r) => { if (!r.ok) throw new Error('heart meshes ' + r.status); return r.arrayBuffer(); }),
  ]);

  const group = new THREE.Group();
  group.name = 'heartAtlas';
  group.scale.setScalar(1 / ATLAS_SCALE);
  group.position.set(-ATLAS_SHIFT[0] / ATLAS_SCALE, -ATLAS_SHIFT[1] / ATLAS_SCALE, -ATLAS_SHIFT[2] / ATLAS_SCALE);
  const groups = Object.fromEntries(GROUP_NAMES.map((k) => { const g = new THREE.Group(); g.name = 'atlas-' + k; group.add(g); return [k, g]; }));

  const meshes = [];
  const byKey = {};
  for (const def of manifest.meshes) {
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(data, def.positionOffset, def.positionCount);
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(data, def.indexOffset, def.indexCount), 1));
    geometry.computeVertexNormals();
    const colour = def.key === 'PAP' ? COLOURS.wall : def.group === 'chambers' ? CHAMBER_COLOURS[def.key] : COLOURS[def.group];
    const material = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.91, metalness: 0, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    /* `rest` is the undeformed positions: heartbeat.js rewrites the live array
       every frame, and the echo frames must be computed from the rest pose. */
    mesh.userData = { ...def, atlas: true, rest: pos.slice() };
    groups[def.group].add(mesh);
    meshes.push(mesh);
    (byKey[def.key] ||= []).push(mesh);
  }

  /* Same order as BetterHeart's page: the conduction layer is built first and
     deforms through a late-bound heartbeat. */
  let heartbeat = null;
  const conduction = createConduction({ group: groups.conduction, byKey, deformPoint: (p) => (heartbeat ? heartbeat.deformPoint(p) : p) });
  meshes.push(...conduction.meshes);
  heartbeat = createHeartbeat({ meshes });
  const parts = {};
  const motion = createHeartMotion({ scene: group, byKey, deformPoint: heartbeat.deformPoint, isPartOn: (k) => parts[k] !== false });
  meshes.push(...motion.extraMeshes);

  const S = { preset: 'natural', opacity: 100, show: { ...PRESETS.natural.show }, selected: null, active: false, last: null, beat: null };

  const shown = (m) => { for (let o = m; o && o !== group.parent; o = o.parent) if (!o.visible) return false; return true; };

  function apply() {
    const p = PRESETS[S.preset];
    const opacity = S.opacity / 100;
    motion.setInteriorHidden(!p.echo && !!S.show.wall && opacity >= 0.85);
    for (const k of ['wall', 'chambers', 'valves', 'coronary', 'conduction']) groups[k].visible = !!S.show[k] && (k !== 'wall' || opacity > 0);
    groups.cardiacVein.visible = !!S.show.coronary;
    for (const k of GREAT) groups[k].visible = !!S.show.great;
    for (const m of meshes) {
      const g = m.userData.group, key = m.userData.key;
      m.visible = !PART_KEYS.includes(key) || parts[key] !== false;
      if (!m.material) continue;
      if (g === 'wall') {
        m.material.opacity = opacity; m.material.transparent = opacity < 1; m.material.depthWrite = opacity > 0.85;
        m.material.color.setHex(S.preset === 'chambers' ? CHAMBER_COLOURS[key] : COLOURS.wall);
      }
      if (g === 'coronary') { m.renderOrder = 1; m.material.depthWrite = !p.flow; m.material.opacity = 1; m.material.transparent = false; }
      if (GREAT.includes(g)) {
        const see = S.preset === 'conduction';
        m.material.opacity = see ? 0.18 : 1; m.material.transparent = see; m.material.depthWrite = !see;
      }
      if (key === 'PAP') {
        m.material.color.setHex(COLOURS.wall);
        const cutaway = S.preset === 'dynamic';
        m.material.opacity = cutaway ? 0.78 : 1; m.material.transparent = cutaway; m.material.depthWrite = !cutaway;
      }
      if (g === 'chambers') {
        m.material.opacity = S.preset === 'chambers' ? 0.83 : S.preset === 'echo' ? 0.92 : 0.16;
        m.material.transparent = true; m.material.depthWrite = false;
      }
      m.material.needsUpdate = true;
    }
    motion.show(S.active && S.preset !== 'chambers', { flow: p.flow });
    heartbeat.setSpeed(p.speed);
  }

  function select(key) {
    S.selected = key || null;
    for (const m of meshes) {
      if (!m.material || !m.material.emissive) continue;
      const on = !!key && m.userData.key === key;
      m.material.emissive.copy(on ? m.material.color : new THREE.Color(0));
      m.material.emissiveIntensity = on ? 0.42 : 0;
    }
  }

  function describe(key) {
    const d = DESCRIPTIONS[key];
    const m = byKey[key] && byKey[key][0];
    return { key, category: d ? d[0] : '', title: d ? d[1] : (m && m.userData.label) || key, english: (m && m.userData.english) || key, text: d ? d[2] : '' };
  }

  function pick(raycaster) {
    const cands = meshes.filter((m) => m.isMesh && m.visible && shown(m) && m.material.opacity > 0.06);
    const hit = raycaster.intersectObjects(cands, false)[0];
    return hit ? hit.object.userData.key : null;
  }

  function setPreset(name) {
    const p = PRESETS[name];
    if (!p) return false;
    S.preset = name; S.opacity = p.opacity; S.show = { ...p.show };
    for (const k of Object.keys(parts)) delete parts[k];
    select(null);
    apply();
    return true;
  }
  function setShow(k, on) { S.show[k] = on ? 1 : 0; apply(); }
  function setOpacity(pct) { S.opacity = Math.max(0, Math.min(100, +pct)); apply(); }
  function setPart(k, on) { parts[k] = !!on; apply(); }

  function attach(parent) { parent.add(group); S.active = true; S.last = null; apply(); }
  function detach() { S.active = false; motion.show(false); group.removeFromParent(); }

  /* `seconds` is the studio's state.motionPhase. */
  function update(seconds) {
    if (!S.active) return;
    const dt = S.last === null ? 0 : Math.min(0.05, Math.max(0, seconds - S.last));
    S.last = seconds;
    const p = PRESETS[S.preset];
    const beat = heartbeat.update(dt, false, !!p.dynamic || !!p.echo);
    motion.update(dt, beat, heartbeat.isPlaying());
    conduction.update(beat, S.selected);
    S.beat = beat;
  }

  function dispose() {
    detach();
    group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      ms.forEach((x) => x.dispose());
    });
  }

  apply();
  return {
    group, groups, meshes, byKey, manifest, motion, heartbeat, parts,
    state: S, PRESETS,
    setPreset, setShow, setOpacity, setPart, select, describe, pick,
    attach, detach, update, dispose,
    worldBox: () => new THREE.Box3().setFromObject(groups.wall),
  };
}
```

- [ ] **Step 2: Add a node smoke test to `work/heart-atlas-check.mjs`**

The factories need a DOM and `three`. `three` is not installed as a repo dependency, so resolve it from the CDN-free copy only if it is present; otherwise skip with a clear message. Insert before the final `console.log(fail ? ...)` line:

```js
console.log('atlas build (needs three in node_modules; skipped if absent)');
let three = null;
try { three = await import('three'); } catch { /* not installed */ }
if (!three) console.log('  skip no local three; the browser check in Task 7 covers this');
else {
  const els = new Map();
  const mk = (id) => { const e = { id, dataset: {}, style: {}, textContent: '', value: '70', addEventListener() {}, setAttribute() {}, classList: { toggle() {}, add() {}, remove() {} } }; els.set(id, e); return e; };
  globalThis.document = { getElementById: (id) => els.get(id) || mk(id), createElement: () => ({ getContext: () => null, width: 0, height: 0 }) };
  globalThis.fetch = async (u) => {
    const f = String(u).split('/').pop();
    const buf = readFileSync(join(HEART_DIR, f));
    return { ok: true, json: async () => JSON.parse(buf.toString()), arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) };
  };
  const { createHeartAtlas } = await import(pathToFileURL(join(HEART_DIR, 'atlas.js')).href);
  const atlas = await createHeartAtlas({ base: 'file:///x/' });
  ok(atlas.meshes.length >= manifest.meshes.length, `atlas built ${atlas.meshes.length} meshes (manifest has ${manifest.meshes.length})`);
  ok(Math.abs(atlas.group.scale.x - 1 / SCALE) < 1e-12, 'group scale is 1/24');
  atlas.setPreset('conduction');
  ok(atlas.groups.conduction.visible && !atlas.groups.chambers.visible, 'conduction preset shows the conduction group and hides the cavities');
  atlas.setPreset('chambers');
  ok(atlas.groups.chambers.visible && !atlas.groups.valves.visible, 'chambers preset shows the cavities and hides the valves');
  atlas.attach(new three.Group());
  for (let t = 0; t < 2; t += 0.05) atlas.update(t);
  ok(atlas.state.beat && Number.isFinite(atlas.state.beat.phase), 'the cardiac clock advances');
  atlas.detach();
}
```

Note: the `import 'three'` in the vendored modules only resolves if `three` is installed locally. If it is not, the smoke test is skipped and the browser check in Task 7 is the authority — do not add three as a repo dependency.

- [ ] **Step 3: Run**

```bash
node work/heart-atlas-check.mjs
node work/syntax-check.mjs
```

Expected: `ALL PASS` and no syntax errors. (`syntax-check` covers data modules; if it does not walk `outputs/heart/`, run `node --check outputs/heart/atlas.js` — ES modules with `import` are checked with `node --input-type=module --check < outputs/heart/atlas.js`.)

- [ ] **Step 4: Commit**

```bash
git add outputs/heart/atlas.js work/heart-atlas-check.mjs
git commit -m "feat(heart): atlas builder with presets, selection, picking and cardiac clock

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: The studio part — panel, toggle, enter and exit

**Files:**
- Create: `outputs/studio/heart-atlas.js`
- Modify: `outputs/studio.js` (import + init), `outputs/studio/live-physiology.js` (`meshOn`), `outputs/studio/region-boxes-how.js` (`animate`), `outputs/study/subject.js` (listener), `outputs/app.css` (append)

- [ ] **Step 1: Make `meshOn` honour the atlas flag**

In `outputs/studio/live-physiology.js` find the line `export function meshOn(mesh){` (line ~721) and add one line directly after it with the Edit tool (single-line anchor; the file is CRLF):

```js
  if(mesh&&mesh.userData&&mesh.userData.atlasHidden)return false;
```

- [ ] **Step 2: Hook the frame loop**

In `outputs/studio/region-boxes-how.js`, in `animate()`, the text `stepPhysiology(state.motionPhase);` occurs once on one line. Replace that substring with:

```js
stepPhysiology(state.motionPhase);if(state.atlasTick)state.atlasTick(state.motionPhase);
```

- [ ] **Step 3: Refresh the layer rail when the mode changes layers**

In `outputs/study/subject.js`, find the export that wires the rail at start-up (grep `export function init` in that file; if there is none, find where `renderLayerRail()` is first called at boot). Add:

```js
window.addEventListener('osteo:layers', () => renderLayerRail());
```

- [ ] **Step 4: Write the studio part**

Create `outputs/studio/heart-atlas.js`:

```js
/*
 * Heart atlas
 *
 * BetterHeart's heart detail, drawn inside the main scene. The atlas group
 * (outputs/heart/atlas.js) is a child of the circulatory layer's `root`, so it
 * shares the body transform, the layer separation and the idle pivot. While the
 * mode is on, the explorer's own heart-system meshes are flagged `atlasHidden`
 * (meshOn honours it, so applyLayers cannot bring them back) and the atlas
 * runs its own cardiac clock; live-physiology.js is not touched. See
 * docs/superpowers/specs/2026-10-10-heart-atlas-design.md.
 *
 * Nothing runs at module scope; init() wires the button.
 */
import { $, els, state } from './imports.js';
import { applyLayers } from './live-physiology.js';
import { showToast } from './visualisation-modes.js';

const CIRC_FILE = './assets/dolasim.glb';
let atlas = null;          // createHeartAtlas() result, built once
let heartMod = null;       // the dynamically imported atlas module
let saved = null;          // { layers, target, position, minDistance, maxDistance }
let panel = null;
let toggle = null;
let busy = false;
let onPointerUp = null;

const el = (id) => document.getElementById('ha-' + id);

/* The DOM the heart modules look up. Ids are prefixed ha- (outputs/heart/*). */
function panelHtml() {
  return `
  <header class="ha-head"><div><strong>Heart atlas</strong> <span>心臟互動解剖</span></div>
    <button type="button" id="ha-close" aria-label="Close the heart atlas">Close</button></header>
  <div class="ha-scroll">
    <div class="ha-row" id="ha-presets" role="group" aria-label="Scenario"></div>
    <label class="ha-check"><input type="checkbox" id="ha-context"> Show the skeleton around the heart <span>顯示骨骼</span></label>
    <div class="ha-shows" id="ha-shows"></div>
    <label class="ha-slider">Wall opacity 外壁不透明度 <input type="range" id="ha-opacity" min="0" max="100" value="100"><output id="ha-opacityValue">100%</output></label>
    <div class="ha-parts" id="ha-parts" role="group" aria-label="Chambers and valves"></div>
    <section id="ha-ecgPanel" class="ha-ecg" aria-label="Schematic ECG">
      <div class="ha-ecg-head"><strong>Heartbeat and schematic ECG 心跳與示意心電圖</strong><span id="ha-ecgRate">70 bpm</span>
        <button type="button" id="ha-motionSpeed" aria-pressed="false">Slow motion 慢速</button>
        <button type="button" id="ha-heartPlay" aria-pressed="true">Ⅱ Pause 暫停</button></div>
      <svg class="ha-ecg-chart" viewBox="0 0 700 100" role="img" aria-label="P wave, QRS and T wave with a cursor on the current phase">
        <defs><pattern id="ha-ecgGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width=".5"/></pattern></defs>
        <rect width="700" height="100" fill="url(#ha-ecgGrid)"/>
        <path id="ha-ecgTrace" fill="none" stroke="currentColor" stroke-width="2"/>
        <line id="ha-ecgCursor" y1="4" y2="96" stroke="#e08a5a" stroke-width="1.4"/><circle id="ha-ecgDot" r="3.7" fill="#e08a5a"/>
        <text x="58" y="94">P</text><text x="101" y="94">QRS</text><text x="206" y="94">T</text><text x="388" y="94">P</text><text x="431" y="94">QRS</text><text x="536" y="94">T</text>
      </svg>
      <div class="ha-ecg-foot"><span id="ha-ecgPhase">Diastole 舒張期</span>
        <label>Rate 心率 <input type="range" id="ha-heartRate" min="45" max="120" value="70"><output id="ha-heartRateValue">70 bpm</output></label></div>
      <p class="ha-note">A schematic sinus rhythm; electrical activity precedes mechanical contraction. Not a diagnostic ECG. 示意心電圖，非診斷用。</p>
    </section>
    <p class="ha-status" id="ha-conductionStatus" hidden></p>
    <p class="ha-status" id="ha-apparatusStatus"></p>
    <section class="ha-echo" id="ha-echoPanel" hidden></section>
    <article class="ha-info" aria-live="polite"><strong id="ha-infoTitle">Tap a structure</strong><span id="ha-infoCat"></span><p id="ha-infoText">Tap the heart, or choose a chamber or valve, to read about it. Descriptions are BetterHeart's (Traditional Chinese).</p></article>
    <p class="ha-credit">Heart model and teaching scripts: BetterHeart (黃天祈醫師), meshes CC BY-SA 4.0, from BodyParts3D / Z-Anatomy. <a href="./heart/MODEL-NOTICES.txt" target="_blank" rel="noopener">Sources and licence</a></p>
  </div>`;
}

const SHOWS = [['wall', 'Myocardium 心肌外壁'], ['chambers', 'Four chambers 四個心腔'], ['valves', 'Valves 四個心臟瓣膜'], ['coronary', 'Coronary arteries and veins 冠狀動脈與心臟靜脈'], ['great', 'Great vessels 大血管'], ['conduction', 'Conduction system 傳導系統']];
const PART_LABELS = { RA: 'RA', RV: 'RV', LA: 'LA', LV: 'LV', TV: 'Tricuspid 三尖瓣', MV: 'Mitral 二尖瓣', AV: 'Aortic 主動脈瓣', PV: 'Pulmonary 肺動脈瓣' };

function buildPanel() {
  if (panel) return;
  panel = document.createElement('aside');
  panel.id = 'heartAtlasPanel';
  panel.className = 'heart-atlas-panel';
  panel.hidden = true;
  panel.innerHTML = panelHtml();
  $('stageHome').appendChild(panel);
  $('ha-close').onclick = () => exitHeartAtlas();
}

function syncControls() {
  if (!atlas) return;
  const S = atlas.state;
  for (const b of panel.querySelectorAll('[data-ha-preset]')) {
    const on = b.dataset.haPreset === S.preset;
    b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
  }
  for (const [k] of SHOWS) { const c = panel.querySelector(`[data-ha-show="${k}"]`); if (c) c.checked = !!S.show[k]; }
  $('ha-opacity').value = String(S.opacity);
  $('ha-opacityValue').textContent = Math.round(S.opacity) + '%';
  for (const k of Object.keys(PART_LABELS)) { const c = panel.querySelector(`[data-ha-part="${k}"]`); if (c) c.checked = atlas.parts[k] !== false; }
  $('ha-echoPanel').hidden = S.preset !== 'echo';
}

function wireControls() {
  const presets = $('ha-presets');
  presets.innerHTML = Object.entries(atlas.PRESETS).map(([k, p]) => `<button type="button" data-ha-preset="${k}" aria-pressed="false">${p.label}</button>`).join('');
  presets.querySelectorAll('[data-ha-preset]').forEach((b) => { b.onclick = () => { atlas.setPreset(b.dataset.haPreset); syncControls(); onPresetChanged(); }; });
  $('ha-shows').innerHTML = SHOWS.map(([k, l]) => `<label><input type="checkbox" data-ha-show="${k}"> ${l}</label>`).join('');
  $('ha-shows').querySelectorAll('[data-ha-show]').forEach((c) => { c.oninput = () => atlas.setShow(c.dataset.haShow, c.checked); });
  $('ha-parts').innerHTML = Object.entries(PART_LABELS).map(([k, l]) => `<label><input type="checkbox" data-ha-part="${k}"> ${l}</label>`).join('');
  $('ha-parts').querySelectorAll('[data-ha-part]').forEach((c) => { c.oninput = () => atlas.setPart(c.dataset.haPart, c.checked); });
  $('ha-opacity').oninput = () => { atlas.setOpacity($('ha-opacity').value); $('ha-opacityValue').textContent = Math.round(atlas.state.opacity) + '%'; };
  $('ha-context').oninput = () => setContext($('ha-context').checked);
}

/* Preset hook for the echo task; a no-op until Task 5 replaces it. */
let onPresetChanged = () => {};
export function setPresetHook(fn) { onPresetChanged = fn || (() => {}); }

function showInfo(key) {
  if (!key) { $('ha-infoTitle').textContent = 'Tap a structure'; $('ha-infoCat').textContent = ''; $('ha-infoText').textContent = 'Tap the heart, or choose a chamber or valve, to read about it.'; return; }
  const d = atlas.describe(key);
  $('ha-infoTitle').textContent = d.english === d.title ? d.title : `${d.english} · ${d.title}`;
  $('ha-infoCat').textContent = d.category;
  $('ha-infoText').textContent = d.text;
}

/* ---- the explorer's own heart ---- */
function hostHeartMeshes() {
  const circ = state.extraModels && state.extraModels.circulatory;
  if (!circ) return [];
  return circ.meshes.filter((m) => (m.userData.systems || []).includes('heart'));
}
function setHostHeartHidden(on) {
  for (const m of hostHeartMeshes()) m.userData.atlasHidden = !!on;
}

function setContext(on) {
  for (const k of ['skeleton_axial', 'skeleton_appendicular']) if (k in state.layers) state.layers[k] = !!on;
  applyLayers();
  window.dispatchEvent(new CustomEvent('osteo:layers'));
}

/* ---- camera ---- */
function frameHeart() {
  const box = atlas.worldBox();
  if (box.isEmpty()) return;
  const c = box.getCenter(new state.THREE.Vector3()), size = box.getSize(new state.THREE.Vector3());
  const camera = state.camera, controls = state.controls;
  const offset = camera.position.clone().sub(controls.target).normalize();
  const half = Math.tan(camera.fov * Math.PI / 360) / camera.zoom;
  const dist = Math.max(0.12, Math.max(size.y, size.x / Math.max(0.1, camera.aspect)) / (2 * half) + size.z / 2) * 1.5;
  controls.minDistance = Math.min(controls.minDistance, dist * 0.2);
  controls.target.copy(c);
  camera.position.copy(c).add(offset.multiplyScalar(dist));
  controls.update();
}

/* ---- picking: capture on a parent so the host's own stage handler never sees an atlas hit ---- */
function bindPicking() {
  if (onPointerUp) return;
  const THREE = state.THREE;
  const ray = new THREE.Raycaster(), p = new THREE.Vector2();
  let down = null;
  const host = els.stage.parentElement;
  const dn = (e) => { down = [e.clientX, e.clientY]; };
  onPointerUp = (e) => {
    if (!atlas || !state.heartAtlasOn || !down) return;
    if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; }
    down = null;
    const r = state.renderer.domElement.getBoundingClientRect();
    p.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(p, state.camera);
    const key = atlas.pick(ray);
    if (!key) return;
    e.stopPropagation();
    const again = atlas.state.selected === key;
    atlas.select(again ? null : key);
    showInfo(again ? null : key);
  };
  host.addEventListener('pointerdown', dn, true);
  host.addEventListener('pointerup', onPointerUp, true);
  bindPicking.off = () => { host.removeEventListener('pointerdown', dn, true); host.removeEventListener('pointerup', onPointerUp, true); onPointerUp = null; };
}

/* ---- enter / exit ---- */
export async function enterHeartAtlas() {
  if (state.heartAtlasOn || busy) return state.heartAtlasOn;
  busy = true;
  try {
    if (!state.scene) await window.__osteo.boot();
    const ok = await window.__osteo.showSystem('circulatory', CIRC_FILE);
    if (!ok) return false;
    buildPanel();
    if (!atlas) {
      try {
        heartMod = await import('../heart/atlas.js?v=1');
        atlas = await heartMod.createHeartAtlas();
      } catch (e) {
        console.error(e);
        showToast('The heart atlas could not load.');
        return false;
      }
      wireControls();
      state.heartAtlas = atlas;
    }
    const circ = state.extraModels.circulatory;
    saved = {
      layers: { ...state.layers },
      target: state.controls.target.clone(), position: state.camera.position.clone(),
      minDistance: state.controls.minDistance, maxDistance: state.controls.maxDistance,
    };
    /* Only the Heart chip: the atlas draws its own vessels and coronaries. */
    for (const k of Object.keys(state.layers)) state.layers[k] = false;
    state.layers.heart = true;
    setHostHeartHidden(true);
    applyLayers();
    circ.root.updateMatrixWorld(true);
    atlas.attach(circ.root);
    state.heartAtlasOn = true;
    state.atlasTick = (t) => atlas.update(t);
    panel.hidden = false;
    toggle.setAttribute('aria-pressed', 'true');
    $('ha-context').checked = false;
    atlas.setPreset('natural');
    syncControls();
    showInfo(null);
    bindPicking();
    frameHeart();
    window.dispatchEvent(new CustomEvent('osteo:layers'));
    return true;
  } finally { busy = false; }
}

export function exitHeartAtlas() {
  if (!state.heartAtlasOn) return;
  state.heartAtlasOn = false;
  state.atlasTick = null;
  if (bindPicking.off) bindPicking.off();
  if (atlas) { atlas.select(null); atlas.detach(); }
  setHostHeartHidden(false);
  if (saved) {
    state.layers = { ...saved.layers };
    state.controls.target.copy(saved.target); state.camera.position.copy(saved.position);
    state.controls.minDistance = saved.minDistance; state.controls.maxDistance = saved.maxDistance;
    state.controls.update();
    saved = null;
  }
  applyLayers();
  if (panel) panel.hidden = true;
  if (toggle) toggle.setAttribute('aria-pressed', 'false');
  window.dispatchEvent(new CustomEvent('osteo:layers'));
}

export const heartAtlasPanel = () => panel;

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  const home = $('stageHome');
  if (!home) return;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'heartAtlasToggle';
  toggle.className = 'heart-atlas-toggle';
  toggle.setAttribute('aria-pressed', 'false');
  toggle.textContent = 'Heart atlas';
  toggle.onclick = () => { state.heartAtlasOn ? exitHeartAtlas() : enterHeartAtlas(); };
  home.appendChild(toggle);
  window.__osteo = window.__osteo || {};
  Object.assign(window.__osteo, { enterHeartAtlas, exitHeartAtlas, heartAtlasOn: () => !!state.heartAtlasOn });
}
```

Notes for the implementer: (a) the skeleton chip keys are whatever `systemsIn('skeleton')` returns — check `outputs/systems.js` (`'axial'`/`'appendicular'` or similar) and replace the two names in `setContext` with those, ideally by importing `chipsOf('skeleton')` from `./live-physiology.js` instead of hard-coding; (b) `showToast` is exported from `visualisation-modes.js`; (c) if `state.layers` is replaced rather than mutated elsewhere, keep the same replace-by-assignment style used in `saved` restore.

- [ ] **Step 5: Wire the part into the entry point**

Add to `outputs/studio.js`, after the `tools_and_capture` import and init lines respectively (single-line anchors, CRLF file):

```js
import { init as init_heart_atlas_js } from './studio/heart-atlas.js';
```
```js
init_heart_atlas_js();
```

The init must run **after** `init_tools_and_capture_js()` and **before** the final `__osteo` comment block.

- [ ] **Step 6: Append the CSS**

`outputs/app.css` is CRLF. Append (every font size scales with `--ts`; `text-size-check` enforces it):

```bash
sed 's/$/\r/' >> outputs/app.css <<'EOF'

/* Heart atlas — outputs/studio/heart-atlas.js */
.heart-atlas-toggle{position:absolute;top:12px;right:12px;z-index:6;padding:7px 12px;border-radius:999px;border:1px solid var(--line,rgba(255,255,255,.18));background:var(--panel,rgba(20,24,30,.78));color:inherit;font-size:calc(12px * var(--ts));font-weight:700;cursor:pointer}
.heart-atlas-toggle[aria-pressed="true"]{background:var(--orange,#e08a5a);color:#1b1b1b}
.heart-atlas-panel{position:absolute;top:52px;right:12px;bottom:12px;width:min(340px,calc(100% - 24px));z-index:6;display:flex;flex-direction:column;border-radius:14px;border:1px solid var(--line,rgba(255,255,255,.18));background:var(--panel,rgba(20,24,30,.92));backdrop-filter:blur(8px);font-size:calc(12px * var(--ts));line-height:1.45;overflow:hidden}
.heart-atlas-panel[hidden]{display:none}
.ha-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-bottom:1px solid var(--line,rgba(255,255,255,.14))}
.ha-head strong{font-size:calc(14px * var(--ts))}.ha-head span{opacity:.7}
.ha-head button,.ha-row button,.ha-ecg-head button{font-size:calc(11px * var(--ts));padding:5px 9px;border-radius:8px;border:1px solid var(--line,rgba(255,255,255,.2));background:transparent;color:inherit;cursor:pointer}
.ha-row button.active,.ha-ecg-head button[aria-pressed="true"]{background:var(--orange,#e08a5a);color:#1b1b1b;border-color:transparent}
.ha-scroll{overflow:auto;padding:10px 12px;display:grid;gap:10px;align-content:start}
.ha-row,.ha-shows,.ha-parts{display:flex;flex-wrap:wrap;gap:6px}
.ha-shows label,.ha-parts label,.ha-check,.ha-slider{display:flex;align-items:center;gap:6px}
.ha-slider{flex-wrap:wrap}.ha-slider input{flex:1 1 120px}
.ha-ecg{border:1px solid var(--line,rgba(255,255,255,.14));border-radius:10px;padding:8px;color:#7fb08f}
.ha-ecg-head{display:flex;flex-wrap:wrap;align-items:center;gap:6px}.ha-ecg-head strong{flex:1 1 100%;font-size:calc(12px * var(--ts));color:inherit}
.ha-ecg-chart{width:100%;height:auto;display:block}.ha-ecg-chart text{font-size:calc(11px * var(--ts));fill:currentColor;opacity:.7}
.ha-ecg-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;color:var(--text,#e8e8e8)}
.ha-note,.ha-status,.ha-credit{margin:0;opacity:.75;font-size:calc(11px * var(--ts))}
.ha-info{display:grid;gap:4px;padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.05)}
.ha-info strong{font-size:calc(13px * var(--ts))}.ha-info span{opacity:.7;font-size:calc(11px * var(--ts))}.ha-info p{margin:0}
.ha-echo{display:grid;gap:8px}
@media(max-width:560px){.heart-atlas-panel{top:auto;left:8px;right:8px;width:auto;height:46%}}
EOF
node work/text-size-check.mjs
```

Expected: `text-size-check` passes. If it flags `.ha-*` rules it names the line; wrap the size in `calc(Npx * var(--ts))`.

- [ ] **Step 7: Run the after-every-edit set**

```bash
node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/binding-check.mjs && node work/bridge-check.mjs
```

Expected: all pass. `binding-check` fails if `heart-atlas.js` uses a name it does not import (`state`, `els`, `$`, `applyLayers`, `showToast` are imported above). `load-check` must not choke: `heart-atlas.js` has no bare `three` import (the heart modules are loaded dynamically).

- [ ] **Step 8: Stage and commit** (shared files — see Task 6 "Staging a shared file")

```bash
git add outputs/studio/heart-atlas.js
# for each pre-modified file below, stage only your hunks:
#   outputs/studio.js outputs/studio/live-physiology.js outputs/studio/region-boxes-how.js outputs/study/subject.js outputs/app.css
git commit -m "feat(heart): Heart atlas mode in the main scene (panel, toggle, host heart hidden)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Echo sections

**Files:**
- Modify: `outputs/heart/atlas.js`, `outputs/studio/heart-atlas.js`

BetterHeart rotates its whole world into the probe frame. In the explorer that would spin the body, so the echo works differently: **the body does not move.** The fan and probe are drawn in the atlas group, the heart is clipped by the scan plane (only atlas materials are clipped), and the sector image is drawn in the panel from the same geometry.

- [ ] **Step 1: Add the echo API to `atlas.js`**

Add the imports at the top of `outputs/heart/atlas.js`:

```js
import { ECHO_VIEWS, computeEchoFrames, createEchoRenderer } from './echo-sim.js?v=16';
```

Add before the `apply();` call near the end of `createHeartAtlas`, and add the returned members shown:

```js
  /* ---- Echo -------------------------------------------------------------
     The scan plane is fixed in the atlas frame. Frames are computed once from
     the REST positions (heartbeat rewrites the live arrays every frame). */
  let echoFrames = null, echoRenderer = null, echoFan = null, echoView = 'A4C', echoLast = 0;
  const echoPlane = new THREE.Plane(), echoModelPlane = new THREE.Plane(), inv = new THREE.Matrix4();
  const echoClip = [echoPlane];
  const echoKind = (u) => u.group === 'wall' ? 'wall' : u.group === 'chambers' ? 'cavity' : ['aorta', 'pa', 'cava', 'pv'].includes(u.group) ? 'vessel' : u.key === 'PAP' ? 'solid' : u.group === 'valves' ? 'valve' : null;
  const echoLabel = { AO: 'Ao', ARCH: 'Ao', PT: 'PA', PAB: 'PA', SVC: 'SVC', IVC: 'IVC' };

  function echoInit(canvas) {
    if (echoFrames) return;
    const rest = meshes.filter((m) => m.userData.positionCount && m.geometry.index)
      .map((m) => ({ key: m.userData.key, group: m.userData.group, pos: m.userData.rest, idx: m.geometry.index.array }));
    echoFrames = computeEchoFrames(rest).frames;
    echoRenderer = createEchoRenderer(canvas);
  }

  function buildFan(fr) {
    if (echoFan) { group.remove(echoFan); echoFan.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); }
    const V = (a) => new THREE.Vector3(...a), O = V(fr.O), l = V(fr.l), d = V(fr.d), pts = [O.clone()];
    for (let i = 0; i <= 40; i++) { const a = -fr.half + 2 * fr.half * i / 40; pts.push(O.clone().addScaledVector(l, Math.sin(a) * fr.depth).addScaledVector(d, Math.cos(a) * fr.depth)); }
    const geometry = new THREE.BufferGeometry().setFromPoints(pts), index = [];
    for (let i = 1; i < pts.length - 1; i++) index.push(0, i, i + 1);
    geometry.setIndex(index);
    echoFan = new THREE.Group();
    echoFan.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x5fa8d8, transparent: true, opacity: 0.17, side: THREE.DoubleSide, depthWrite: false })));
    echoFan.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x2f78ad })));
    const probe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.32, 20), new THREE.MeshStandardMaterial({ color: 0x4a5560, roughness: 0.6 }));
    probe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().negate());
    probe.position.copy(O).addScaledVector(d, -0.2);
    echoFan.add(probe);
    echoFan.traverse((o) => { o.userData.noClip = true; });
    group.add(echoFan);
  }

  function setClipping(on) {
    group.traverse((o) => { if (o.isMesh && !o.userData.noClip && o.material) { o.material.clippingPlanes = on ? echoClip : null; o.material.needsUpdate = true; } });
  }

  function setEchoView(id, canvas) {
    echoInit(canvas);
    if (!echoFrames[id]) id = 'A4C';
    echoView = id;
    const fr = echoFrames[id], V = (a) => new THREE.Vector3(...a);
    buildFan(fr);
    setClipping(true);
    echoModelPlane.setFromNormalAndCoplanarPoint(V(fr.n), V(fr.O));
    return ECHO_VIEWS.find((v) => v.id === id);
  }

  function echoRings() {
    const out = [];
    for (const r of Object.values(motion.rings || {})) { const c = new THREE.Vector3(...r.c); heartbeat.deformPoint(c); out.push({ ...r, c: [c.x, c.y, c.z] }); }
    return out;
  }
  function echoOpen() {
    const c = S.beat ? cycleAt(S.beat.phase) : { avOpen: 1, semilunarOpen: 0 };
    return { MV: c.avOpen, TV: c.avOpen, AV: c.semilunarOpen, PV: c.semilunarOpen };
  }

  /* Draw the sector image. ~30 fps is plenty. `ms` is performance.now(). */
  function echoDraw(ms) {
    if (!echoRenderer || !echoFrames) return;
    group.updateMatrixWorld(true);
    echoPlane.copy(echoModelPlane).applyMatrix4(group.matrixWorld);
    if (ms - echoLast < 30) return;
    echoLast = ms;
    inv.copy(group.matrixWorld).invert();
    const view = ECHO_VIEWS.find((v) => v.id === echoView), hide = (view && view.hide) || [], sources = [];
    for (const m of meshes) {
      const u = m.userData, k = echoKind(u);
      if (!k || !m.geometry.index || hide.includes(u.group) || hide.includes(u.key)) continue;
      if (k === 'valve' && !(m.visible && m.parent.visible)) continue;
      sources.push({ kind: k, label: u.group === 'chambers' ? u.key : echoLabel[u.key] || null, pos: m.geometry.attributes.position.array, idx: m.geometry.index.array,
        matrix: u.positionCount ? null : new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld).elements });
    }
    group.traverse((o) => {
      if (!o.isMesh || o.userData.kind !== 'valve-leaflet') return;
      for (let p = o; p && p !== group; p = p.parent) if (!p.visible) return;
      sources.push({ kind: 'leaflet', valve: o.parent && o.parent.userData.key, pos: o.geometry.attributes.position.array, idx: o.geometry.index.array,
        matrix: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld).elements });
    });
    echoRenderer.render(sources, { ...echoFrames[echoView], labels: view && view.labels, hideValves: view && view.hideValves }, { rings: echoRings(), open: echoOpen() });
  }

  function exitEcho() { setClipping(false); if (echoFan) echoFan.visible = false; }
```

`cycleAt` is exported by `heart-motion.js`; change that import line to `import { createHeartMotion, cycleAt } from './heart-motion.js?v=25';`.

In `update(seconds)`, after `S.beat = beat;` add: `if (p.echo) { if (echoFan) echoFan.visible = true; echoDraw(performance.now()); }`.

In `setPreset(name)`, before `apply()`, add `if (S.preset !== 'echo') exitEcho();` placed so it runs when leaving echo: capture `const was = S.preset;` first, and call `if (was === 'echo' && name !== 'echo') exitEcho();`.

In `detach()` add `exitEcho();`. Add to the returned object: `ECHO_VIEWS, setEchoView, echoDraw, echoRenderer: () => echoRenderer`.

The renderer must have `localClippingEnabled`; the studio part sets it (Step 2).

- [ ] **Step 2: Echo panel in the studio part**

In `outputs/studio/heart-atlas.js`, add the echo panel population and the preset hook. Add this function and call it from `wireControls()` after the presets are built:

```js
function buildEchoPanel() {
  const host = $('ha-echoPanel');
  const groups = { TTE: 'Transthoracic TTE 經胸', TEE: 'Transoesophageal TEE 經食道' };
  host.innerHTML = `<div class="ha-row" id="ha-echoTabs" role="group" aria-label="TTE or TEE">${Object.entries(groups).map(([g, l]) => `<button type="button" data-ha-etab="${g}" aria-pressed="false">${l}</button>`).join('')}</div>
    <div class="ha-row" id="ha-echoViews"></div>
    <canvas id="ha-echoCanvas" class="ha-echo-canvas" aria-label="Simulated ultrasound sector image"></canvas>
    <p class="ha-note" id="ha-echoName"></p><p class="ha-note" id="ha-echoText"></p>`;
  const render = (g) => {
    $('ha-echoViews').innerHTML = atlas.ECHO_VIEWS.filter((v) => v.group === g).map((v) => `<button type="button" data-ha-echo="${v.id}" aria-pressed="false" title="${v.name}">${v.english}</button>`).join('');
    $('ha-echoViews').querySelectorAll('[data-ha-echo]').forEach((b) => { b.onclick = () => chooseEcho(b.dataset.haEcho); });
    host.querySelectorAll('[data-ha-etab]').forEach((t) => { const on = t.dataset.haEtab === g; t.classList.toggle('active', on); t.setAttribute('aria-pressed', String(on)); });
  };
  host.querySelectorAll('[data-ha-etab]').forEach((t) => { t.onclick = () => render(t.dataset.haEtab); });
  render('TTE');
  const c = $('ha-echoCanvas');
  const size = () => { const w = Math.round(c.clientWidth * Math.min(devicePixelRatio || 1, 2)); if (w > 0 && c.width !== w) { c.width = w; c.height = Math.round(w * 7 / 8); } };
  if (typeof ResizeObserver === 'function') new ResizeObserver(size).observe(c);
  size();
}
function chooseEcho(id) {
  state.renderer.localClippingEnabled = true;
  const v = atlas.setEchoView(id, $('ha-echoCanvas'));
  $('ha-echoViews').querySelectorAll('[data-ha-echo]').forEach((b) => { const on = b.dataset.haEcho === id; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
  $('ha-echoName').textContent = `${v.angle ? 'TEE ' + v.angle + ' · ' : ''}${v.english} · ${v.name}`;
  $('ha-echoText').textContent = v.text;
}
```

Replace the `onPresetChanged` stub so entering the echo preset selects a view:

```js
onPresetChanged = () => { if (atlas.state.preset === 'echo') chooseEcho('A4C'); };
```

(Place that assignment at the end of `wireControls()`; delete the `setPresetHook` export — nothing uses it.) Add the canvas style to `app.css`: `.ha-echo-canvas{width:100%;aspect-ratio:8/7;background:#000;border-radius:8px;display:block}`.

- [ ] **Step 3: Checks**

```bash
node work/load-check.mjs && node work/binding-check.mjs && node work/syntax-check.mjs && node work/heart-atlas-check.mjs && node work/text-size-check.mjs
```

Expected: pass. The echo image itself is verified in the browser (Task 7).

- [ ] **Step 4: Commit** (stage hunks per Task 6 where files are shared)

```bash
git add outputs/heart/atlas.js outputs/studio/heart-atlas.js
git commit -m "feat(heart): TTE/TEE echo sections drawn from the atlas geometry

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Offline shell, checker, docs, regenerated maps

**Files:**
- Modify: `outputs/sw.js`, `work/shell-check.mjs`, `docs/TRAPS.md`, `outputs/README.md`; regenerate `docs/CODEMAP.md`, `docs/DATA-INDEX.md` only if the checks demand it.

- [ ] **Step 1: Teach `shell-check.mjs` about dynamic imports**

In `work/shell-check.mjs` change the `walk` regex loop so it also matches dynamic literals. Replace

```js
  for (const m of readFileSync(abs, 'utf8').matchAll(/from\s+'(\.\.?\/[^']+\.js(?:\?v=\d+)?)'/g)) {
```

with

```js
  for (const m of readFileSync(abs, 'utf8').matchAll(/(?:from\s+|import\(\s*)'(\.\.?\/[^']+\.js(?:\?v=\d+)?)'/g)) {
```

Run `node work/shell-check.mjs`. Expected: **FAIL**, listing the `heart/` modules as imported but not precached (and `studio/heart-atlas.js`). That is the failing test for the next step.

- [ ] **Step 2: Add the files to the service worker**

In `outputs/sw.js`:
1. Add to the `SHELL` array, under the **identical specifiers** the code imports (shell-check prints the exact list it wants — copy it): `./studio/heart-atlas.js`, `./heart/atlas.js?v=1`, `./heart/alignment.js?v=1`, `./heart/descriptions.js?v=1`, `./heart/conduction.js?v=2`, `./heart/heart-motion.js?v=25`, `./heart/heartbeat.js?v=7`, `./heart/echo-sim.js?v=16`, `./heart/cardiac-cycle.js`, `./heart/valve-surfaces.js?v=4`, `./heart/valve-apparatus.js?v=6`, `./heart/valve-rings.js?v=2`, `./heart/coronary-flow.js?v=10`, `./heart/coronary-routes.js?v=1`, `./heart/transvalvular-flow.js?v=2`.
   Note `heart-motion.js` imports `./valve-surfaces.js?v=4`, `./valve-apparatus.js?v=6`, `./coronary-flow.js?v=10`, `./transvalvular-flow.js?v=2`, `./cardiac-cycle.js`, `./valve-rings.js?v=2`, and `echo-sim.js` imports `./valve-rings.js?v=2`; a file imported both with and without a query needs both entries.
2. The data (`heart-manifest.json`, `heart-meshes.bin`, ~1 MB) is lazy like the GLBs. The rule near line 259 is `url.pathname.endsWith('.glb') || url.pathname.includes('/assets/physiology/')`; extend it with `|| url.pathname.includes('/heart/heart-')` so the manifest and `.bin` get the same lazy model cache. Read the surrounding lines first and match how a hit is cached.
3. Bump `CACHE_VERSION` from `'v199'` to the next number (re-read the line: another session may have bumped it already).

Run:

```bash
node work/shell-check.mjs
```

Expected: ALL PASS.

- [ ] **Step 3: Record the trap and the decision**

Add a section to `docs/TRAPS.md` (the file is read by sessions working in the governed files; follow its existing heading style `## <title> — \`path\``):

```markdown
## The heart atlas — `outputs/heart/*`, `outputs/studio/heart-atlas.js`

- The atlas group is a child of the circulatory layer's `root`, in BetterHeart's frame, with scale 1/24. Re-parenting it to the scene breaks registration, layer separation and the pivot.
- It is attached only while the mode is on, so `Box3.setFromObject(root)` and the packed spread never see it. Do not leave it attached "hidden".
- The explorer's own heart meshes are hidden with `userData.atlasHidden`, honoured by `meshOn` — not by `mesh.visible`, which `applyLayers` rewrites on every layer change.
- `outputs/heart/*` is reached by a dynamic import only (`load-check` cannot resolve a bare `three`); `shell-check` walks dynamic literals for that reason.
- The vendored modules read DOM ids prefixed `ha-`; the panel in `heart-atlas.js` must exist before `createHeartAtlas()`.
- The echo does not rotate the body (BetterHeart's page does); clipping is applied to atlas materials only.
- `alignment.js` is generated; `work/heart-atlas-check.mjs` re-fits it against `dolasim.glb` and fails if the model is ever replaced without re-running `node work/build-heart-alignment.mjs --write`.
```

Add a short decision entry to `outputs/README.md` where decisions are recorded: the mode exists, what was brought in and what was left out (nerves, catheter/flow dots, procedure sims, leader-line labels), the licence position, and that the descriptions are BetterHeart's Chinese text, not lessons.

- [ ] **Step 4: Regenerate maps, then run the full set**

```bash
git status --short docs/CODEMAP.md docs/DATA-INDEX.md work/baselines
node work/codemap.mjs
node work/codemap-check.mjs
node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/shell-check.mjs && node work/binding-check.mjs && node work/bridge-check.mjs
node work/text-size-check.mjs && node work/heart-atlas-check.mjs
node work/search-probe.mjs && node work/system-check.mjs && node work/region-probe.mjs && node work/separation-check.mjs
node work/ui-strings.mjs --check 2>/dev/null || node work/baseline.mjs --check
```

If `docs/CODEMAP.md` was already modified by another session, regenerating sweeps their unfinished work in; note that in the commit message and tell the user. `work/baselines/ui-strings.txt` will change because the new interface strings are real; run `node work/ui-strings.mjs` per its header to refresh that baseline only after confirming the diff contains only atlas strings. Expected final state: every command exits 0.

- [ ] **Step 5: Staging a shared file, and commit**

For each file that was already modified before this work (`outputs/sw.js`, `outputs/app.css`, `outputs/studio.js`, `outputs/studio/live-physiology.js`, `outputs/studio/region-boxes-how.js`, `outputs/study/subject.js`, `docs/TRAPS.md`, `outputs/README.md`, `docs/CODEMAP.md`):

```bash
git diff -U0 <file> > "<scratchpad>/full.patch"
# open the patch, delete the hunks that are NOT yours, save as "<scratchpad>/mine.patch"
git apply --cached --unidiff-zero "<scratchpad>/mine.patch"
git diff --cached --stat -- <file>
```

If every hunk in a file is yours, plain `git add <file>` is fine. Then:

```bash
git status --short
git commit -m "feat(heart): offline shell, shell-check dynamic imports, traps and decision record

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

`git status --short` afterwards should still list the other session's files as modified; none of them should be silently included.

---

### Task 7: Verify in the browser (Chrome)

**Files:** none modified unless a defect is found.

Use `node work/dev-server.mjs` (port 8420), real Chrome, `http://localhost:8420/radiography-study-studio.html`. In the in-app Browser pane the service worker caches modules: unregister it and clear caches before testing (`navigator.serviceWorker.getRegistrations()` then `caches.keys()` deletes), or you test the previous `CACHE_VERSION`.

- [ ] **Step 1: Load and open the mode**

Open the app, wait for the 3D model, press **Heart atlas**. Expected: the panel opens, the heart is framed, no console errors (`read_console_messages`), `window.__osteo.heartAtlasOn()` is `true`, and `state.extraModels.circulatory.root.children.some(c => c.name === 'heartAtlas')` is true.

- [ ] **Step 2: Registration check, by eye and by number**

The atlas heart must sit exactly where the explorer's own heart sits. Run in the page console, with the mode **off**, then on:

```js
const circ = window.__osteo.state.extraModels.circulatory;
const box = (m) => new window.__osteo.state.THREE.Box3().setFromObject(m);
const hostBox = box(circ.meshes.find(m => /^left_ventricle$/i.test(m.userData.label || m.name)));
```

Then enter the mode and compare `window.__osteo.state.heartAtlas.worldBox()` against `hostBox` (centres within ~0.5% of the heart's size; if `window.__osteo.state` is not exposed, read `state` through whatever `window.__osteo` returns — `layout-figures.js` uses `window.__osteo.state.movement`). Take a screenshot with the mode on and the **context** checkbox on: the heart must lie inside the ribcage at the normal position, not floating or scaled. If it does not, re-run `node work/heart-atlas-check.mjs` — a pass there with a visible offset means the group is parented wrongly.

- [ ] **Step 3: Each scenario**

Click each preset in turn and screenshot: Natural, Four chambers (coloured cavities), Coronaries (flow tracers moving), Heartbeat (valves opening and closing, ECG cursor sweeping, phase text changing), Conduction (SA node lighting through to Purkinje, status line changing), Ultrasound. Check `read_console_messages` after each. Wall opacity, the part checkboxes and the rate slider must change the model.

- [ ] **Step 4: Echo**

In Ultrasound, choose A4C, PLAX, PSAX AV and a TEE view. Expected: a blue fan and probe in the 3D scene, the heart clipped by the scan plane, a non-blank sector image in the panel canvas that changes with the view and with the cardiac phase. The body must not rotate. Leave the mode and confirm `localClippingEnabled` clipping is gone (the explorer's other meshes were never clipped).

- [ ] **Step 5: Coexistence with the rest of the explorer**

With the mode on: tap the heart (info card updates, tap again clears); tap a rib with context on (the host selects the rib, the atlas does not swallow it); drag-rotate; open the layer rail and toggle layers (the explorer's heart must stay hidden while the mode is on); drag the layer separation slider (the atlas must move with the circulatory layer). Exit the mode: the explorer's heart returns, layers and camera are restored, the rail reflects them, and `state.extraModels.circulatory.root.children` no longer contains `heartAtlas`.

- [ ] **Step 6: Offline**

In Chrome DevTools, Application → Service Workers: confirm the new worker activated, load once with the mode opened, switch to Offline, reload, and open the mode again. Expected: it works offline (manifest and `.bin` come from the model cache, the modules from the shell).

- [ ] **Step 7: Mobile layout**

`resize_window` to `mobile` (375×812): the toggle and panel must fit, the panel docks to the bottom at 46% height, text scales with the text-size control, no horizontal page scroll. Reset with preset `desktop`.

- [ ] **Step 8: Fix anything found, re-run the Task 6 Step 4 command set, commit**

Each fix is its own small commit with the staging discipline from Task 6. Then report to the user: what is in, what was left out, that the descriptions are BetterHeart's Chinese text, and that the other session's uncommitted files were not touched.

---

## Self-review

**Spec coverage:** Alignment + refusal (Task 1; the runtime refusal is the `heart-atlas-check` gate plus Task 7 Step 2 — the spec's "loader refuses at run time" is implemented as a cheap guard in Task 4 Step 4 only via the check; see note below) · Heart atlas mode with hidden original heart and no `live-physiology.js` edit beyond the one-line `meshOn` flag (Task 4) · Refactor of their code into builder/panel/echo (Tasks 2, 3, 4, 5) · Files, cache, licence, attribution (Tasks 1, 6) · Verification and browser check (Tasks 6, 7) · Out-of-scope list restated in the header.

**Deviation from the spec to confirm with the user:** the spec said the loader would refuse to show the atlas if the alignment comparison fails at run time. That comparison needs the GLB's per-mesh node boxes, which exist only in node (`boxesIn`), not in the browser. The plan enforces it as a committed-constants check (`heart-atlas-check.mjs`, which re-fits against the shipped GLB and fails CI) plus the browser registration check in Task 7. If a run-time guard is still wanted, add a `Box3` comparison of `atlas.byKey.LV[0]` against the host's `Left ventricle` mesh in `enterHeartAtlas()` and refuse above a tolerance.

**Placeholder scan:** no TBD/TODO; every code step carries code. Two steps depend on a fact only visible at implementation time and say so explicitly with how to resolve it: the skeleton chip keys in `setContext` (read `systemsIn('skeleton')`), and the exact `subject.js` hook for the layer-rail listener.

**Type consistency:** `createHeartAtlas()` returns `{ group, groups, meshes, byKey, manifest, motion, heartbeat, parts, state, PRESETS, setPreset, setShow, setOpacity, setPart, select, describe, pick, attach, detach, update, dispose, worldBox }` (+ `ECHO_VIEWS, setEchoView, echoDraw, echoRenderer` in Task 5); Task 4 uses exactly those names (`atlas.PRESETS`, `atlas.state.preset`, `atlas.parts`, `atlas.describe`, `atlas.pick`, `atlas.worldBox`, `atlas.attach/detach/update`) and Task 5 uses `atlas.ECHO_VIEWS` and `atlas.setEchoView(id, canvas)`. DOM ids are `ha-*` in both the patched modules (Task 2) and the panel (Task 4).
