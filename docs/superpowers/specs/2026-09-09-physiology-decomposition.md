# Physiology animation: six draft specifications

Status: proposed decomposition for review; no runtime implementation authorised by this document.
Inspected base: fc9ddde. The existing uncommitted HSS lesson edit is unrelated.
Request: retain the successfully restored activity and interaction, improve anatomical
motion, and decompose the work before implementation.

## Delivery boundaries

| Piece | Specification | Dependency | Deliverable |
| --- | --- | --- | --- |
| 0 | [Shape kernel and harness](2026-09-09-physiology-0-kernel.md) | None | Characterisation extraction, pure geometry tests, path contract and cost policy; separately gated reduced-motion behaviour |
| 1 | [Muscles](2026-09-09-physiology-1-muscles.md) | 0 | Geometry-derived axis, tethered belly deformation and matching normals |
| 2 | [Breathing and coupling](2026-09-09-physiology-2-breathing.md) | 0 | Lung/diaphragm shape and normals, source-supported respiratory coupling |
| 3 | [Heart boundaries](2026-09-09-physiology-3-heart.md) | 0 | Regional cardiac deformation with measured boundary behaviour |
| 4 | [Tubes on paths](2026-09-09-physiology-4-tubes.md) — **done** | 0 | Curved tube coordinates, radial constriction, topology-aware fallback. Six routes accepted, three refused by name; [evidence](../notes/2026-09-09-physiology-tube-evidence.md) |
| 5 | [Vessel and nerve paths](2026-09-09-physiology-5-transmission.md) — **done** | 0, 4 | Curved activity fields on a curated, defensible route set. Forty vessels and six nerves accepted in chained circuits, six refused by name; [evidence](../notes/2026-09-09-physiology-transmission-evidence.md) |

Recommended implementation order: 0A (characterisation), 0B (accessibility), 1,
2, 3, 4, 5. Pieces 1–4 are independently reviewable after 0; their shared
integration points in live-physiology.js still require sequential integration.
This is not an instruction to launch parallel agents.

## Decisions common to every piece

1. **Deformation remains on the GPU.** No animated writes to position/normal
   buffers, morph targets, object transforms or parent transforms. One-time CPU
   derivation of immutable custom attributes is allowed. Reference evaluation in
   Node is test-only. Rest-pose bounds, cuts, cavities and projection stay stable.
2. **Shape and normals ship together.** For x' = F(x), the normal follows the
   inverse transpose of J = dF/dx. Include derivatives of spatial weights, not
   just the unweighted scale. Avoid singular deformation maps. At zero amplitude,
   the shader explicitly returns the incoming position and normal unchanged.
3. **Retain activity coverage.** An unsupported new profile retains its existing
   illustrative animation; a missing path must not disable a layer. An explicit
   Static choice or reduced-motion preference is the deliberate exception.
4. **Source checks concern claims, not just page existence.** The current mechanics
   test checks that cited pages contain text; that is not proof of an animation's
   anatomical claim. Each new profile records the exact claim, source key, page,
   supporting excerpt in the verification evidence, and what remains illustrative.
5. **Interaction remains a release condition.** GPU displacement does not move
   CPU raycast surfaces or existing label attachments. Test tapping and labels
   at motion extremes. Reject amplitudes that visibly detach labels or make the
   visible structure impractical to pick; do not solve this by moving CPU geometry.
6. **No blanket shared deformation.** Adjacent surfaces are not necessarily
   mechanically identical. Pair anatomically corresponding regions explicitly;
   do not join nearby surfaces solely because their vertices are close.

## Path cost policy

Use a curated set of routes with offline-generated, committed attribute payloads.
This avoids adding hundreds of synchronous graph traversals to layer loading.
The first route set covers only validated tubes; piece 5 expands it under the same
budget. No topology solving is added to the browser's frame loop.

A payload is keyed by model version, source GLB content hash, mesh/primitive identity,
vertex/index layout hash, generator version and route-definition hash. Model version
alone is insufficient: vertex order can change without a correct version bump.
Decode in the exact runtime attribute order; do not assume the Node helper's merged,
world-transformed vertices match a runtime primitive's local-space buffer.

Load only the selected layer's payload. Proposed initial limits: 1 MiB compressed
additional route data per layer and 8 MiB total resident derived attributes. These
are acceptance budgets, not measured results. Profile current models first. If a
curated route set exceeds either budget, narrow the set or reduce representation
before release. Version mismatch or load failure retains the old activity cue.
The app remains a no-build static deployment; this is an offline asset generator,
like existing model/index generators, not a runtime build system.

## Corrections to assumptions in the review

- Current physiology shares state.flow.elapsed. The missing coupling concerns
  relationships between system envelopes, not separate wall clocks.
- transmissionField supplies scalar surface distance. It does not supply a tube
  centreline, tangent, radial direction or guaranteed anatomical downstream order.
  Its per-component reseeding does not prove continuity across disconnected meshes.
- The old uniform lung scale preserves normal direction. Anisotropic scaling and
  tethering require a new derivative; the existing diaphragm weighting already does.
- Reduced-motion defaults are an intentional behaviour change. They cannot be
  included in an unconditional claim that piece 0 has no visible changes.
- GPU-only rib motion does not invalidate CPU bounds. It does introduce visible
  alignment and picking questions; it remains deferred pending a separate decision.

## Evidence and release gates

For 0A, compare derived values and deterministic GPU samples with the old formulas
before replacing them. Existing prose/corpus baselines alone cannot prove visual
equivalence. For changed shapes, require pure tests plus complete-cycle rendering
under fixed cameras and lighting, front/side/oblique views, and surface-normal checks.
Record geometry hashes and CPU world bounds before/after cycle samples.

Run the relevant load, syntax, module, binding, shell, mechanics and new shape gates;
separation-check, cut-level-check, build-check, grid-probe (both variants), and the
browser progress/viewer regression checks protect the rest-pose contract. Run
baseline --check without blessing unrelated corpus changes. Each shell release
updates the SW version and registers any new module/asset URLs consistently.

Performance evidence compares the same camera, visible layers, hardware and viewport
against the current version. Target no more than 10% added p95 frame time and no new
main-thread topology work. Report actual phone validation separately from desktop
emulation; an emulator is not evidence of iOS GPU performance.

## Review scope

These files define proposed contracts and acceptance criteria. They do not claim
that curated anchors, topology or new anatomical claims have already been validated.
Each piece includes a discovery gate with an explicit fallback if the supplied model
cannot support the intended representation. Approve piece 0 first; downstream
implementations receive their own review after its contract is proven.
