# Piece 1 — muscle geometry and normals

Status: draft. Depends on 0. Parent: [decomposition](2026-09-09-physiology-decomposition.md).

## Change

Replace bounding-box-axis contraction with a geometry-derived lengthwise axis on
eligible muscle meshes. Preserve the mapped motor timing and existing activity
coverage. Derivation lives in physiology-shape.js; the adapter uploads immutable data.

Use surface-area-weighted covariance/PCA so dense tessellation alone does not select
the direction. Sort eigenvalues, handle degeneracy, and establish a deterministic
axis sign from explicit anatomy metadata where direction matters. PCA is a geometric
axis, not proof of fibre direction or an origin/insertion pair. Flat, fan-shaped,
branched and near-isotropic muscles need curated profiles or the old fallback.

Project positions onto the chosen axis. Use smooth end weights to keep endpoints
stationary and concentrate shortening/thickening in the belly. Match radial expansion
to the actual local axial derivative; a nominal global inverse-square-root scale
does not preserve volume when the shortening is spatially weighted. Require a positive
Jacobian determinant throughout the intended amplitude range. Full volume conservation
is not claimed until tested on appropriate closed meshes.

## Normals and timing

Derive J for the complete tethered mapping, including tether gradients. Transform
normals with inverse-transpose J. The present constant-scale normal approximation
must not be carried over to a variable tether field. Test tangent orthogonality and
finite differences at the belly and both transition zones.

Retain the current name-hash offsets for unmapped illustrative activity in this piece;
geometry and timing should not change simultaneously. Explain those offsets as display
staggering. Any replacement by motor groups requires source-backed membership and a
separate timing change. No blanket synchronisation or disabling of unmapped muscles.

## Evidence and acceptance

Candidate real fixtures include sartorius, biceps and deltoid, resolved through the
actual model-name utilities. Inspect sartorius in anatomical coordinates: measure its
principal direction against the bbox fallback and record agreement with the elongated
mesh. Do not invent an angle threshold merely to force an expected answer. Synthetic
oblique rods provide exact rotation/eigenvector tests independent of the real model.

Require rotation covariance, sign stability, finite output on degeneracy, tethered-end
displacement limits, belly deformation, positive Jacobians and exact rest identity.
Browser checks sample actual GPU positions/normals and full-cycle front/side/oblique
views, including mapped and unmapped muscles. Check labels/taps at maximum deformation.
Apply all parent rest-pose and performance gates.

Source lead: phys.muscle.deck pages currently named in MECHANISM_SOURCES. Verify each
shortening/activation claim against its actual page before release. Geometry-derived
anchors remain illustrative unless the supplied sources and model establish anatomical
attachments. Out of scope: joint articulation, moving bones, tendon scene transforms
and new motor-route assignments.
