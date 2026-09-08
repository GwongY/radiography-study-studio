# Course body only

Approved by the user on 2026-09-08: option (a), no alternate Human Atlas surface.
This supersedes the 2026-09-07 source-switch design and its deferred course Spread.

| Capability | Course body | Decision |
|---|---|---|
| Search, isolation, orbit, turntable | Existing | Keep |
| Packed piece Spread | New | Adapt the MIT rectangle packer to course mesh presentation parents |
| Layer separation | Existing | Keep as Layers layout |
| System presets | New | All, skeleton, organs, hide all and individual rail systems |
| Cuts, annotations, overlays, projection, lesson picking | Existing | Preserve; assemble before measurement and lessons |
| Alternate source, viewer, concept data, model chunks | Removed | No alternate tab or source switch |

At 100% pieces occupy non-overlapping frontal bounding-box cells. Orbiting can overlap
pieces in perspective; intermediate values interpolate from anatomy into the layout.
Mesh geometry and its highlight transforms stay unchanged. Presentation parents return
exactly to zero. Packed mode pauses the turntable, fits the full layout and restores the
previous view on assembly. System changes repack visible meshes. Projection refuses spread.
Only course assets download lazily. Existing anatomy credits and retained MIT notices stay.
Work remains on atlas-studio-merge; no push or merge to master.
