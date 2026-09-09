# Offline physiology path contract (piece 0A)

This settles the artifact boundary for later pieces 4 and 5. Piece 0A adds an
engineering profiler only: no route artifact, runtime loader, new anatomy claim,
or replacement of the currently displayed motor routes.

Run `node work/physiology-path-profile.mjs --write` from the repository root.
The small `work/physiology-path-profile.json` records the exact model, script,
decoder and mechanics hashes. Timings are three local Node runs including graph
construction, with no warm-up excluded; they are not device frame budgets.

## Observed geometry

The curated sample selects named digestive/urinary meshes, aortic/caval meshes,
and every nerve matched by the current `motorRoute` definitions. Selection is
an engineering sample, not a claim of anatomical route completeness. Actual
matches are listed in the JSON rather than assuming every selector exists.

The measured sample has 20 meshes, 12,062 vertices, 35,882 welded undirected
edges and 26 connected components. Each femoral nerve has four components;
the other sampled meshes each have one. Welding uses the existing field's
rounded world coordinates at 1e-6 world units, so these are algorithmic graph
components, not claims about biological continuity.

The 4,219-vertex jejunum took 10.234–15.964 ms; the 56–102-vertex current motor
nerve samples took 0.043–0.507 ms in the saved run. A scalar float32 field for
the complete sample costs 48,248 bytes; ten float32 values per vertex cost
482,480 bytes, excluding manifest, masks, alignment and transfer compression.
This supports measuring and generating larger fields offline; it does not
establish phone performance or prove that geodesic distance is a tube centreline.

## Version 1 artifact schema

Use a JSON manifest plus little-endian binary typed arrays. The manifest must
contain all of these identities; `modelVersion` alone is insufficient:

- `schemaVersion: 1`, `modelVersion`, `glbUrl`, `glbSha256` (exact GLB bytes).
- `primitiveLayoutSha256`: canonical serialized scene selection, node hierarchy
  and transforms, primitive order/mode, POSITION/index accessor descriptors,
  buffer views, counts, component types, normalization and byte strides.
- `routeSha256`: canonical curated route definition including seed orientation,
  ordered branch/component identity, coordinate frame, validity masks and any
  component timing offsets. Regex display names are not stable geometry IDs.
- `generatorSha256`, `decoderSha256`, and generator schema/algorithm version.
- `payloadSha256`, `byteLength`, and per-array type, offset, count and item size.

Each entry targets an explicit scene/node index path, mesh index and primitive
index plus POSITION/index accessor identity. Per-vertex data is ordered exactly
like that runtime primitive's POSITION accessor, preserving duplicate seam
vertices. Require a mapping digest if generation remaps, welds or reorders data.
Never match only by a sanitized label, which can collide or identify many nodes.

Scalar display transmission uses `s: float32[N]`, normalized to [0,1], plus
component/branch IDs and a validity mask. Tubular deformation additionally needs
`centre: float32[N,3]`, `tangent: float32[N,3]`, and
`gradientS: float32[N,3]`: ten floats per vertex including `s`. Store centre and
tangent in primitive-local undeformed coordinates; gradientS is the derivative
of normalized s with respect to those same local coordinates. Store transform
and units explicitly. This is the baseline payload estimate, not a declaration
that these attributes alone solve every deformation Jacobian: the later tube
design must derive or store any centre/tangent derivatives its normal update
requires. Branch validity, orientation and transitions must be curated rather
than inferred merely from shared extrema or proximity.

## Decoder boundary and future stale-data rejection

`loadGlbMeshes` bakes node world transforms into float32 positions and merges a
node's primitives, offsetting their indices. The profiler's decoded geometry
hash describes **that merged world-space analysis representation**, not a
GLTFLoader BufferGeometry layout. It must never authorize attaching an array
directly to a runtime primitive. The profiler's whole-layer layout hash is a
conservative fingerprint of raw GLB JSON descriptors; the future generator must
implement the canonical entry mapping above and verify round trips explicitly.

Piece 4's future loader must compare every identity before installing attributes,
check payload digest/bounds/counts and finite values, reject unknown schema or
generator versions, and reject geometry/mapping/route mismatches as stale.
Version/hash expectations must come from the trusted shipped manifest and loaded
model identity, not from accepting the candidate payload's own assertions.
On rejection, preserve the existing animation fallback and report a diagnostic;
do not partially install fields or disable the mesh's activity. Cache entries
must include these identities so a model replacement cannot reuse stale fields.
None of that runtime loading or rejection behaviour is implemented in 0A.

The profiler checks finite [0,1] output, exact repeatability within a run and
presence of all three current motor route IDs. Its highest-world-Y seed mirrors
the current runtime's seed policy for cost comparison. It is not an approved
proximal endpoint for future tube or vessel animation.
