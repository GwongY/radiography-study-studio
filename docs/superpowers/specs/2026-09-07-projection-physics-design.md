# The projection, dimensioned

**2026-09-07.** Part A of a two-part arc. Part B — named projections, central-ray
angulation, collimation and image critique — gets its own spec once Clark's is
registered as a source. Nothing here depends on B, and B depends on all of this.

## The problem

The projection's maths is honest and its subject is not.

`live-physiology.js` integrates Beer-Lambert properly: each fragment writes its
distance from the camera signed by facing, additive blending sums the ray, and
`sum(exits) - sum(entries)` is the distance spent inside solid material for any
number of stacked objects. The camera diverges from a real source-to-image
distance, so PA and AP genuinely differ. There is a film latitude curve and
quantum mottle. That is a real radiograph engine.

It is pointed at a skeleton, in arbitrary units, with invented coefficients.

```js
export const XRAY_MU={skeleton:1.0,joint:.30,organs:.16,muscle:.10,…};
```

Its own comment says what these are: *"relative, chosen so bone/soft-tissue
contrast lands in the familiar range … not tabulated linear attenuation
coefficients and no dose or kVp is implied."* And `enterXray` forces every
soft-tissue layer off, so a chest PA has no lungs, no mediastinum, no diaphragm
and no heart border. The silhouette sign cannot be taught on it. Neither can
exposure factors: kVp and mAs are collapsed into one `Exposure` gain, and the
inverse square law does not act on the image at all.

## The misdiagnosis worth correcting first

`what-is-under.js:74-85` records why soft tissue was removed:

> Six soft-tissue layers at 0.10-0.30 against bone at 1.00 do not read as a
> radiograph; they read as fog with a skeleton somewhere behind it.

The observation was right and the cause was not. Those ratios are close to
correct — NIST puts cortical bone at 6.4× soft tissue at 30 keV, against the
6.3× those constants imply. The fog came from **double counting**. Muscle,
organs, circulatory, nervous and lymphatic are overlapping closed shells
occupying the same physical volume, so a ray crossing the thorax charges for the
same soft tissue three to five times over. Turning the layers on did not add
tissue. It added the same tissue repeatedly.

So the fix is not to exclude soft tissue. It is to count each volume once.

## The principle

The beam is measured in centimetres, and every coefficient is a published
number. What the film shows should be derivable on paper, and disagreeing with
the film should mean one of us is wrong about physics rather than about taste.

```
mesh crossings → path in cm → μ(tissue, kVp) from NIST → τ → log transfer → film
```

## Modules

| file | responsibility |
|---|---|
| `outputs/radiography.js` | **new.** μ/ρ tables, densities, μ(tissue,kVp), inverse square, magnification, mottle, heel profile. Pure. |
| `outputs/studio/live-physiology.js` | shaders and render target only; feeds uniforms it is handed |
| `outputs/study/what-is-under.js` | the control pane — kVp, mAs, SID, AEC |
| `work/radiography-check.mjs` | **new.** every number above, verified in node |

`radiography.js` is pure — no three.js, no DOM — for the reason `cavity-geom.js`
is: the maths is the part that can be quietly wrong, so it has to be runnable
where a wrong number is a number rather than a picture. It is also why the study
half can eventually teach exposure factors from the same module the image is
made of, rather than from a second copy that drifts.

## Dimensioning the beam

The model is 11.8 units for a 1.7 m body, so **1 unit = 14.41 cm**. The existing
integral already produces path length in model units; multiplying by that
constant makes τ physically real instead of arbitrary.

Linear attenuation is μ = (μ/ρ) · ρ, with μ/ρ from the NIST X-Ray Mass
Attenuation Coefficient tables and ρ from ICRU-44:

| tissue | ρ (g/cm³) | μ at 20 keV | at 30 keV | at 50 keV |
|---|---|---|---|---|
| cortical bone | 1.92 | 7.68 | 2.556 | 0.814 |
| soft tissue | 1.06 | 0.872 | 0.402 | 0.240 |
| lung, inflated | 0.26 | 0.216 | 0.099 | 0.059 |
| **bone : soft** | | **8.8×** | **6.4×** | **3.4×** |

That last row is the whole of subject contrast, and it is why kVp is a contrast
control. Note also that NIST gives lung and soft tissue **the same μ/ρ** — they
are compositionally alike. Lung is lucent purely because it is a quarter as
dense. This is worth saying in the pane; it is the sort of thing that is much
easier to believe once you have seen the two numbers side by side.

### The consequence that forces a log curve

A 20 cm chest at 30 keV:

| ray | τ | transmission |
|---|---|---|
| lung field (15 cm lung + 5 cm soft) | 3.50 | 3.0% |
| mediastinum (20 cm soft tissue) | 8.04 | 0.03% |

A hundred to one. That ratio *is* why a chest film looks like a chest film — and
the current linear `1 - exp(-τ)` maps both to white with nothing between them.
The transfer function becomes logarithmic in transmitted intensity, which is
also what a real digital detector does before display.

## kVp and mAs, as separate controls

The single `Exposure` slider goes. In its place, the three things a radiographer
actually sets:

| control | drives | law |
|---|---|---|
| kVp | effective energy → μ → **contrast** | NIST tables, interpolated |
| mAs | fluence → **density** and **noise** | density ∝ mAs; σ ∝ 1/√N |
| SID | fluence | I ∝ 1/d² |

Effective energy is taken as **E_eff = 0.40 · kVp**, so the 50–120 kVp range maps
onto 20–48 keV and lands squarely on the tabulated rows above. This is an
approximation of a polyenergetic spectrum by a single energy; it is stated as one
in the pane and pinned here so the check has something to assert against, not
smuggled in as fact.

Mottle stops being decoration. `uGrain` becomes σ ∝ 1/√N with N ∝ mAs/SID²,
so underexposure gets noisy and overexposure gets clean, in the right proportion
and for the right reason.

The examinable consequence is that doubling SID and quadrupling mAs returns the
same film, and you can watch it happen.

### AEC

Because SID now drives brightness, dollying the camera changes exposure — which
is correct, and which turns an accidental scroll into a black pane. Automatic
exposure control is on by default and compensates, with the readout still
showing what mAs the compensation is spending, so the mechanism stays visible.
Switching AEC off gives the raw inverse-square behaviour.

## Cortex and medulla

Every bone currently reads as a uniform slab. The GLB meshes are single closed
surfaces — the outer cortex — with nothing inside, and the existing pane says so.

The vertex shader gains the surface normal, and each crossing adds a shell term
over a marrow-μ bulk:

```
τ = Σ_crossings (μ_cortical − μ_marrow) · t / max(|N·V|, ε)
  + μ_marrow · pathLength
```

That is a constant-thickness cortical slab entered at the true incidence angle.
It produces the bright cortical rim, the darker medullary canal, and the
tangential edge-brightening that makes bone read as bone rather than as a shape.

`t` defaults to **2 mm**, μ_cortical is ICRU-44 cortical bone, and μ_marrow is
ICRU-44 adipose tissue (ρ 0.95) — yellow marrow being fat, which is why a
medullary canal reads darker than the soft tissue around the bone rather than
merely darker than cortex. `ε` clamps `|N·V|` at 0.05, capping the grazing-angle
term at 20 t; without it a silhouette edge integrates to infinity.

**Stated limitation:** `t` is uniform per layer, so a rib is given a femur's
cortical thickness. This is a large improvement over no cortex at all and it is
not a cortical thickness model. The pane says which.

## Which tissues the beam sees

Skeleton, muscle, organs. Once each.

Circulatory, nervous and lymphatic are excluded, and the exclusion is a fact
rather than a compromise: unenhanced vessels and nerves are not visible on a
plain film. The pane says this, because a student who notices the aorta is
missing should find out why, and the answer teaches something.

The `ε` clamp on `1/|N·V|` and the existing `max(0.0, τ)` both matter more with
three layers than with one, because not every shell in the GLBs is perfectly
closed. `radiography-check.mjs` bounds the error rather than assuming it away.

## Verification

`work/radiography-check.mjs`, run in node against the pure module:

- μ ratios reproduce NIST at 20, 30, 40, 50, 60, 80 and 100 keV
- bone:soft contrast falls monotonically across the diagnostic kVp range
- intensity quarters when SID doubles; density is restored by 4× mAs
- magnification equals SID/SOD, measured against hand-worked cases
- the chest τ table above reproduces from the module's own constants
- mottle σ scales as 1/√(mAs) and as SID

The existing `work/` checks that this change touches: `shell-check` (a new
module and a new query), `codemap` and `codemap-check` (new banners, new file),
`binding-check` (new imports across the split), `text-size-check` (new inline
sizes in the control pane), `load-check` and `syntax-check`. `CACHE_VERSION`
bumps; `MODEL_VERSION` does not, since no GLB changes.

## Cost, stated plainly

Entering the projection now loads three GLBs where it loaded one, so it needs a
loading state rather than a long blank pane. This is the only user-visible
regression in the change and it is not optional — the lungs are in the organs
file.

## Not in this spec

Named projections, central-ray angulation, collimator field and borders, L/R
markers, scatter and grid, anode heel effect, image critique against acceptance
criteria. All of that is part B. Heel effect and scatter are physics and could
have landed here; they are held back because both are only meaningful once
there is a collimated field to apply them across.

Beam spectra, beam hardening and Monte Carlo scatter are out of scope entirely.
They are more correct and they are invisible to a student.

## Sources

Attenuation constants are NIST reference data, not course material, and are
tagged app-authored in the pane exactly as the existing AP/PA panel is
("written by this app, not from your sources"). No `sourceRefs` entry is
created, no study claim is made, and `validateCorpus()` is untouched.

- NIST X-Ray Mass Attenuation Coefficients — cortical bone, soft tissue (ICRU-44),
  lung tissue, skeletal muscle
- ICRU Report 44 — tissue densities

Part B's positioning claims will cite `CLARK_S_POSITIONING_IN_RADIOGRAPHY.pdf`,
`X-Ray_Patient_Positioning_Manual_2008.pdf` and the Additional Views handout,
all already on the drive and all currently uncited, via
`unread-manifest → handoff-export → verify-notes`.
