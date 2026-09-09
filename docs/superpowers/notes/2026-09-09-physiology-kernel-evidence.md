# Piece 0A verification

Base: 58cf422, isolated branch codex/physiology-kernel.
This is a characterisation extraction, not a visible realism upgrade or piece 0B.

## Implementation

deriveShape accepts immutable local rest bounds (the runtime path) or decoded xyz
positions (the offline/test path), the original rule, and explicit shared-centre /
local-up context. Returns axis, centre, length, amount, numerical mode and an empty
capability list. No invented path/tether arrays. Three.js still owns transforms.
The GPU deformation and normal snippets were not changed. SW shell is v158.

## Evidence

- Node: 948 real deforming meshes, all five modes, two contexts per mesh;
  exact legacy-oracle equality for scanned and explicit bounds. Input immutability,
  output ownership, degenerate bounds and invalid input checks pass.
- Actual injected GLSL: 948 meshes, up to 64 vertices per mesh, amplitudes
  0/.35/.8, 180,324 position/normal samples. Separate WebGL2 transform-feedback
  context; same browser/driver for the old app (8437) and extracted app (8438).
- Before/after shape hash:
  `17450f799aa8bf1044933a50ed20e7c241fb027ac29ab1be705cf4f680951b0d`.
- Before/after GPU float-buffer hash:
  `c17ede71d2d61e9c98187a934420e49b791a8ab2166b62607429a0df6623d1bb`.
- CPU position/normal arrays, local matrices and rest bounding boxes remain unchanged.
- Decoder/browser correspondence: jejunum (4,219 vertices), left ventricle (1,179),
  left sartorius (248), diaphragm (3,142). Counts, first 24 indices and 12 ordered
  position samples agree; maximum float32 world-space error 5.960464477539063e-8.
  This characterises selected merged world-space fixtures, not a general licence
  to bind decoder output directly as primitive-local attributes.
- Existing physiology-browser-check passes all 1,686 names, eight nerve paths,
  breathing/motor rendering and Spread restoration. Reported-regressions and
  progress-viewer checks pass, including saved dots, labels and scroll return.
- Load, syntax, module, binding, shell, mechanics, codemap, separation, cut-level,
  build and both grid probes pass. Path profiler was re-run: 20 meshes, 12,062
  vertices, 35,882 edges, 26 components. Saved timing observations are in its JSON.

## Characterisation discoveries

The initial capture differed because layers had loaded in different orders. The
probe now sorts layer keys so arrival order cannot change the digest. It then
matched the unchanged original and the extraction exactly.

Zero-amplitude POSITION identity is exact. Normal identity is not byte-exact in
the old shader: modes 1/3/5 renormalise quantized input normals. Maximum component
change from the input is 0.00125199556350708, unchanged by extraction. The guard
allows 0.002 for this measured legacy behaviour. Do not claim exact incoming-normal
identity; future shape pieces must explicitly decide whether to preserve or change
this normalization. Correcting it here would violate the unchanged-GLSL scope.

The named left-ventricle parent includes a separately named papillary child. The
decoder check initially included that child's geometry by traversing the parent.
It now follows source GLB node associations and inherited names, matching the
decoder's ownership rules. Future payloads must use node/primitive identity, not
parent display names.

## Pre-existing suite exception

`node work/baseline.mjs --check` passes 11 of 12 baselines. corpus-snapshot differs
at the branch base: the saved baseline last changed at fc9ddde, while 58cf422
updated limb lesson citations. Its mismatches name those lessons and derived
study exports. `git diff HEAD -- outputs/study-data.js outputs/study/corpus
work/corpus-snapshot.mjs work/baselines/corpus-snapshot.txt` is empty. No corpus
baseline was regenerated or lesson file changed by this work.

## Reproduction

Run the Node shape check with `--fixtures` to write decoder samples. Evaluate the
decoder browser function with that JSON as its argument. Evaluate the shape browser
function with mode `capture` on the old app, copy only its localStorage
`physiology-shape-baseline` JSON into the isolated edited app, then run `compare`.
Use the same Chrome/driver. Passing a JavaScript wrapper is sufficient; no production
debug hook is installed. Digests are same-driver evidence, not portable golden pixels.

Before integrating, reconcile the current master and SW version. The branch is
local; these results do not claim deployment or physical-phone performance.
