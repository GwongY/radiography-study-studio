# Course body only implementation plan

Goal: execute the approved course-only correction in the existing atlas-studio-merge worktree.
Spec: docs/superpowers/specs/2026-09-08-course-body-only.md.
Architecture: vanilla ES modules; one existing renderer, course GLBs, presentation parents.

- Remove source routing, alternate dock, viewer/data/generator and obsolete browser checks.
- Move MIT packing helper to studio; add packed-spread.js and integrate separation lifecycle.
- Add piece/layer mode and system presets through window.__osteo and the existing rail.
- Verify exact restoration, repacking, lesson/projection guards and non-overlap in node and Chrome.
- Update shell cache, documentation, codemap and intentional UI baseline; run project checks.
- Commit the scoped change on the existing branch; do not merge or push.

## Completed validation

All fourteen checks passed: load-check, syntax-check, verify-modules, shell-check,
binding-check, bridge-check, region-probe, system-check, separation-check,
cut-level-check, full-atlas-check, text-size-check, codemap-check, data-index-check.
All twelve baseline probes pass; only ui-strings changed intentionally.

Chrome course-spread-browser-check passed with 2,914 visible course pieces, all
system presets/lazy loading, cell non-overlap, twelve repeated applications,
highlight clearing, exact original world matrices on assembly, anatomy measurements,
repacking/hide-all, cut/annotation/lesson assembly, taught-layer picking, projection
round trips, and mode switching. Console contained no errors. Assembled and packed
screenshots were inspected in Chrome. The initial worktree already contained partial
source-switch removal, so the assembled screenshot is not a pristine pre-change UI.

Shared integration files touched: outputs/app.css, outputs/sw.js (v144),
docs/CODEMAP.md and work/baselines/ui-strings.txt. CLAUDE.md's studio count is 12.
No lesson corpus or progress data changes. No merge or push.
