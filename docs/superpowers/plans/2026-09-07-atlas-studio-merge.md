# Atlas ↔ studio merge — plan

Spec: `docs/superpowers/specs/2026-09-07-atlas-studio-merge.md`.
Branch: `atlas-studio-merge` in worktree `../rss-atlas-studio`. No push, no merge to master.

## Step 1 — Generator + scene (shared renderer)

In `work/build-atlas-viewer.mjs`, extend the scene rewrite:

- Signature: `createAtlasScene(el, atlas, state, onSelect, onProgress, onError, shared)`
  (`shared?: T.WebGLRenderer`).
- `renderer = shared || new T.WebGLRenderer(...)` inside the existing try; when `shared`,
  skip `el.appendChild(renderer.domElement)` and skip `renderer.setClearColor`, and give the
  scene `scene.background = new T.Color('#f2f3f3')` instead.
- Pointer handlers (`down`/`move`/`up`) early-return when `!active` (the atlas may hold
  handlers on a canvas it no longer owns exclusively).
- Add `renderOnce()` to the returned API (render now if dirty) for snapshot().
- Regenerate: `node work/build-atlas-viewer.mjs` (Node 24) — commit both generator and
  `outputs/atlas/scene.js`.

## Step 2 — atlas/viewer.js (dock, not a workspace)

- `mountAtlas(container, host)` where `host = { stage, renderer }` (nulls allowed for
  node-evaluated checks). Builds the dock (Explore card: search, selection, results; Tools
  card: Spread, presets, systems, count, attribution; status line; hint) — no `.atlas-canvas`,
  no bottom nav (Reset / Turntable / Isolate / Clear / Explore / Tools toggles are cut;
  Reset/Turntable/Isolate route through the ctrlpill, Clear selection becomes a small button
  in the Explore card).
- `createAtlasScene(host.stage, atlas, state, ..., host.renderer)`.
- Export `atlasCommand(cmd)`: `reset | turntable | isolate | showall | focus` mapping onto
  the existing `update(...)` calls; keep `setAtlasActive`, `inspectAtlas`, `mountAtlas`.

## Step 3 — new studio part `outputs/studio/atlas-source.js`

Exports: `enterAtlas()`, `exitAtlas()`, `atlasActive()`, `atlasCommand(cmd)`,
`atlasPainting()`; `init()`:

- `enterAtlas()`: boot 3D if needed; suspend viewer state in the
  `suspendViewerState` discipline (cut, hidden, region filter, isolation, armed tool);
  disable `state.controls`; swap renderer tone mapping/exposure to the atlas pair;
  dynamically `import('../atlas/viewer.js')` and mount into the study-provided dock
  container with `{ stage: els.stage, renderer: state.renderer }`; set
  `state.atlasPainting = true`.
- `exitAtlas()`: reverse; restore renderer globals and controls; `state.atlasPainting=false`.
- `atlasCommand()` delegating to the loaded viewer module; no-ops with a toast when not
  active.
- Lesson guard: call `exitAtlas()` at the top of the `focusStructures` path
  (`visualisation-modes.js`) so a lesson always mounts the course body.
- Register on `window.__osteo`: `enterAtlas`, `exitAtlas`, `atlasActive`, `atlasCommand`
  (bridge-check guards them).

## Step 4 — studio loop and pointer gating

- `region-boxes-how.js` `animate()`: after the `stageLive` gate, if `atlasPainting()` return
  (the atlas's own loop paints).
- `tools-and-capture.js` `bindStage()` handlers and `snapshot()`: early-return / render the
  atlas scene when the atlas source is painting (`renderOnce()` then `toDataURL`).
- `depth-picking.js` ctrlpill wiring: Reset / Focus / Pause turntable / Isolate selected /
  Show all delegate to `atlasCommand()` when active (course behaviour otherwise untouched).

## Step 5 — study half + HTML

- `study/state.js`: `modelSource: 'course'` added to `ui` (cross-part mutable, TRAPS rule).
- `radiography-study-studio.html`: `#viewerAtlasPane` moves inside the 3D pane's card
  column as the atlas dock container; a `#modelSourceTabs` segbar joins the pane header.
  Markup-only edits, patched directly.
- `what-is-under.js`: `viewerTabs` becomes `[['3d','3D model'],['xray','Projection']]`;
  the source switch renders into `#modelSourceTabs` (Course body | Full atlas, persisted
  choice in-session only); `openFullAtlas()` → mounts via `window.__osteo.enterAtlas()`;
  `pauseFullAtlas()` unchanged for nav; entering Projection force-exits the atlas source;
  layer rail + course tool cards hidden while the atlas source is active
  (`renderViewerTools` already re-renders on suspend points).
- `viewer-tools.js`: while the atlas source is active the Tools card shows the same
  "suspended" note the projection uses.

## Step 6 — shell, cache, css, docs

- `sw.js`: CACHE_VERSION v142 → v143; SHELL gains `./studio/atlas-source.js`.
- `app.css`: styles for the source switch (reuse `.segbar`/`.seg`) and the dock-as-card
  layout; appended, minimal (parallel session also edits this file).
- `node work/codemap.mjs` (new part + moved pane) → commit `docs/CODEMAP.md`.
- TRAPS entry under the atlas/studio files: renderer-global state (tone mapping, exposure,
  clear colour) must be swapped per active source — a scene cannot rely on a clear colour
  it no longer sets.
- Baselines: `node work/baseline.mjs` to re-fingerprint the UI strings; commit the delta.

## Step 7 — checks, screenshots, commit

Full set: load-check, syntax-check, verify-modules, shell-check, binding-check,
bridge-check, region-probe, system-check, separation-check, cut-level-check,
full-atlas-check, toplevel.mjs on every restructured studio file, baseline --check.
Then real-Chrome before/after screenshots (dev server, service worker cleared), commit on
the branch, and report with the touched-shared-files list (`app.css`, `sw.js`,
`docs/CODEMAP.md`, `work/baselines/*`).
