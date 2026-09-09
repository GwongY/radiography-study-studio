# Atlas ↔ studio merge — design

**Date:** 2026-09-07
**Status:** written from the brainstorm below; the end-state choice (option b) was put to the
user with (a) and (c) as alternatives and **adopted as the recommended default without a
returned answer** — everything lands on a branch for veto.

## Goal

The user asked to merge the Full atlas (BodyParts3D 4.0: 2,234 meshes, 3,432 FMA concepts,
15 systems) into the 3D model page — "discard useless things and enhance my 3D model features".
Today the app runs **two separate three.js renderers behind separate Viewer tabs**: the course
studio (7 curated GLB layers, curriculum-linked, cuts/overlays/projection) and the full atlas
(own canvas, own OrbitControls, own reset/turntable/isolate chrome, own attribution block,
own dock).

## The brainstorm, condensed

### Audit

| Capability | Course model | Full atlas | Verdict |
|---|---|---|---|
| Orbit / zoom / pan / damping / reset | yes | duplicate | **cut** the atlas duplicate; one chrome set |
| Turntable | yes (motion button) | duplicate (autoRotate) | **cut** the duplicate; ctrlpill routes to the active source |
| Tap-to-select + hover tooltip | study-unit picking, lesson-restricted | own pointer-tap + spread-mode screen-space fallback | **keep** the atlas picker for the atlas body; the course picker is untouched |
| Packed piece-level Spread | no (only 7-layer Separation) | yes, signature feature | **kept**, on the atlas body inside the merged page |
| 7-layer Separation slider | yes | — | untouched |
| Search | curated, syllabus-tiered, occluder auto-hide | raw 3,432 FMA concepts | **both kept, one box each** — scope follows the active source; corpus decision C (no raw atlas search in the course search) stays settled |
| Isolate selected | isolate state + Focus camera-fit | camera-fit isolation | **kept** on both; ctrlpill routes |
| System visibility | 13-chip rail over 7 files | 15 checkboxes + presets | **kept** separately — different data, different bodies |
| FMA concept graph (3,432) | absent | yes | **kept** as the atlas search/detail data |
| Cuts, ink, pins, capture, measured overlays, physiology, projection | yes | no | untouched, scoped to the course body |
| Attribution | About dialog (CC BY-SA 2.1 JP via anatomi-simulatoru) | second block in the atlas dock (CC BY 4.0) | **kept in both places** — they attribute different assets, not the same thing twice |
| Second WebGLRenderer + its own lighting/env/ground | — | yes | **cut** — the atlas renders through the studio's renderer |

### What "enhance the 3D model features" concretely means here

1. The Full atlas becomes a **source inside the 3D model tab** (Course body | Full atlas),
   on the same canvas, behind the same chrome — no tab switch, no second context.
2. The ctrlpill (Reset view / Focus / Pause turntable / Isolate selected / Show all) becomes
   **source-aware**: the same five buttons drive whichever body is on the canvas.
3. The atlas keeps every capability that is genuinely its own: concept search, packed Spread,
   system presets and checkboxes, camera-fit isolation, hover names, spread-mode picking
   fallback, and its CC BY 4.0 attribution.
4. Deliberately **deferred**, with reasons, as a named follow-up: a piece-level packed Spread
   for the COURSE body's own meshes. It would move individual meshes inside the pivots that
   `meshPointsLocal` caches vertices against — exactly the class of poisoning
   `separation-check.mjs` exists for, touching cavity measurement, the region grid, and the
   idempotent re-application every layer load triggers. The capability survives the merge
   (on the atlas body, where the shader-side state textures already solve it correctly);
   porting it onto course meshes is its own spec.

### End-state UX

- Viewer tabs: **3D model** (source switch: Course body | Full atlas) and **Projection**.
  The separate "Full atlas" tab, `#viewerAtlasPane` as a workspace pane, and the
  `atlas` viewerTab value are gone.
- First-time load is unchanged: skeleton GLB. The atlas's 33 MB of chunks still download
  only when the Full atlas source is first opened, into the existing runtime model cache
  (`sw.js` `isModel()`), never precached.
- The atlas dock (Explore / Tools cards) renders in the 3D pane's card column, visible only
  while the Full atlas source is active. The course layer rail and course tool cards hide
  while it is active.

## Architecture

The pattern to follow is the projection's: "The projection borrows the same canvas the studio
and the lessons use." The atlas now borrows it too.

- **One renderer.** `atlas/scene.js` is GENERATED from `work/atlas-source/scene.ts` by
  `work/build-atlas-viewer.mjs`, so the shared-renderer change is made in the generator:
  `createAtlasScene` gains a trailing `shared` parameter; when given, it uses that renderer,
  does not append `renderer.domElement` (the stage's canvas is already in the DOM), and sets
  `scene.background` instead of a renderer-global clear colour. The shipped file is
  regenerated with `node work/build-atlas-viewer.mjs`, never hand-edited.
- **One paint per frame.** The atlas scene keeps its own rAF loop and dirty-flag rendering,
  gated by its existing `active` flag (`setAtlasActive`), sizing to the stage it now draws
  into. The studio's animate loop skips its course render while the atlas source is painting,
  exactly as it defers to `renderXray()`.
- **One control set at a time.** The atlas keeps its own camera and OrbitControls (different
  fov, near plane, pan-at-spread behaviour); while the atlas source is active the studio's
  controls are disabled and the studio's pointer handlers early-return. Renderer-global state
  the atlas touches (tone mapping, exposure) is swapped on enter and restored on exit — the
  same suspend/resume discipline `suspendViewerState` established for lessons.
- **Chrome routing.** The ctrlpill buttons are wired in the studio half
  (`studio/depth-picking.js`); the four that make sense for the atlas (Reset view, Focus,
  Pause turntable, Isolate selected — plus Show all = clear isolation + all systems)
  delegate to `atlasCommand()` from the new `studio/atlas-source.js` when the atlas source
  is active.
- **Lessons win.** `focusStructures` (studio side) force-exits the atlas source before
  mounting a lesson, so a lesson card always gets the course body and the
  "picking is restricted to the layer being taught" behaviour is untouched.
- **Study half.** `what-is-under.js` renders the source switch, mounts the atlas dock, and
  keeps `pauseFullAtlas()` as the nav-away pause (called from
  `navigation-five-destinations.js` exactly as today). The active source is a new cross-part
  mutable in `study/state.js`, per the TRAPS rule.

## Risks

- **One WebGL context** becomes literally true; today two live renderers coexist when the
  atlas tab has been opened. Renderer still paused whenever hidden (atlas loop's `active`
  gate; the studio loop's `stageLive` gate).
- **Offline SHELL + CACHE_VERSION**: new `studio/atlas-source.js` joins the SHELL;
  CACHE_VERSION v142 → v143; `shell-check.mjs` enforces the import graph; atlas chunks stay
  runtime-cached.
- **The studio/study split** talks only through `window.__osteo`; the new surface
  (`stageEl` reuse, enter/exit) is guarded by `bridge-check.mjs`.
- **Regeneration**: `scene.js` changes ship WITH the generator change, or
  `build-atlas-viewer.mjs` would silently revert them.
- **full-atlas-check.mjs** validates the geometry chunks and packed layouts at the data
  level and is untouched by the merge; it must still pass.
- **separation-check.mjs** is untouched (course spread is deferred, not implemented).
- **Baselines**: the UI-string baseline moves (strings added/removed around the tab and
  dock) — re-baselined consciously, listed in the report.
- **Parallel content session** touches `app.css`, `sw.js`, `docs/CODEMAP.md`,
  `work/baselines/*` — this work keeps its edits to those files appended/minimal; every
  touch is listed in the report so the merges stay mechanical.
