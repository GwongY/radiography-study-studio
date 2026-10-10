# Bone landmark labels and independent skeleton depth

Selecting a bone and bringing it close shows up to five named parts. The Parts
chooser keeps every distinct mapped name available; choosing a part shows its
single tag, Show all parts displays every mapped feature, and Main landmarks
restores the five-tag default diagram. Names are
deduplicated per bone, including features with several possible marker positions.
Supraspinous fossa and infraspinous fossa remain separate choices.

Focus frames the selection, hides all other structures across the loaded layers,
and removes the selection glow. Reset restores the enabled layers. Multi-part
structures and search groups stay whole. Zooming into a selected packed Spread
specimen works too. The whole body overview keeps the existing structure name.
Tap names omit category and left/right badges; anatomical side still controls the
actual mesh selection.

## Current coverage

| Bone | Available names | Examples |
| --- | --- | --- |
| Femur | 10 | Head, neck, trochanters, shaft, patellar surface, condyles and epicondyles |
| Hip bone | 8 | Iliac crest, acetabulum, obturator foramen, ischial spine and tuberosity |
| Humerus | 12 | Head, anatomical and surgical necks, tubercles, deltoid tuberosity, shaft, capitulum, trochlea, epicondyles and olecranon fossa |
| Scapula | 6 | Acromion, coracoid process, glenoid cavity and three distinct fossae |
| Tibia | 3 | Condyles, medial malleolus |
| Fibula | 1 | Lateral malleolus |
| Radius | 2 | Head and neck |
| Ulna | 2 | Trochlear notch and olecranon |
| Clavicle | 2 | Sternal and acromial ends |
| Manubrium | 3 | Jugular and clavicular notches, manubriosternal joint |
| Body of sternum | 2 | Costal notches, xiphisternal joint |
| Xiphoid process | 1 | Xiphisternal joint |
| Frontal bone | 4 | Supraorbital notch, coronal suture, bregma, frontal sinus |
| Parietal bone | 9 | Coronal, sagittal, lambdoid, squamous and parietomastoid sutures; bregma, lambda, pterion and asterion |
| Occipital bone | 4 | Foramen magnum, occipital condyle, lambdoid suture, lambda |
| Temporal bone | 6 | Mastoid and styloid processes, internal acoustic meatus, mandibular fossa, squamous and occipitotemporal sutures |
| Sphenoid bone | 3 | Optic canal, superior orbital fissure, sphenoidal sinus |
| Maxilla | 1 | Infraorbital foramen |
| Mandible | 2 | Ramus, mandibular condyle |
| Axis C2 | 1 | Odontoid process |

These are 82 named landmarks across 20 bone types and 32 actual bone meshes,
including both sides of paired bones. An unmapped bone shows a notice. Not every
part of every bone is mapped, and tiny openings on simplified meshes are marked
as anatomical sites rather than presented as detailed reconstructions.

## Evidence and geometry

`work/build-bone-landmarks.mjs` and `work/bone-landmark-additions.mjs` record
reviewed markers and citations. Review date: 2026-10-04. The user restricted
viewer tags to the supplied Human Anatomy lecture folder. The Upper Limb,
Lower Limb and Musculoskeletal decks were verified byte-identical to the
registered current PDFs. The newer Head, Neck and Trunk deck dated 20260920
was registered as `hss.hnt.2026` and its diagrams reviewed directly.

Only these four current lecture refs are permitted by the builder and check:
Upper Limb pp4,6,8,19; Lower Limb pp5-7,9-10,16; Musculoskeletal System pp10-11;
and Head, Neck and Trunk pp4,6,8,11,19. Thirty features supported solely by older
references were removed. Four currently taught sutures/junctions were added:
pterion, asterion, parietomastoid and occipitotemporal sutures. Supraorbital
notch replaces the older foramen wording. Main keeps five tags; additional
lecture identification detail is available through individual choices or Show all.
No older vocabulary-only extras, web anatomy, lesson or quiz content is added.

The user then clarified that being printed somewhere in a lecture diagram is
insufficient: use highlighted labels and explicit identification teaching points.
A second curation pass removed 39 unneeded diagram details from the Parts lists.
Femur is now the ten boxed features on Lower Limb p7; humerus keeps the highlighted
features and those named in the p6 identification bullets (12 distinct names).
Its background radial/coronoid fossae, supracondylar ridges and intertubercular
sulcus are removed. Femoral lines, additional fossae and minor projections are
removed too. Forearm, scapular and lower-limb lists were shortened to core lecture
identification features; the three distinct scapular fossae remain available.
Show all parts means all retained study features, never every printed reference
label. This scope is deliberately conservative and does not claim a reconstruction
of what was said orally during the lecture.

The source was copied into the ignored local source folder and registered with
`build-source-catalogue.mjs --add-file`; this preserves the existing catalogue
without scanning remote drives. `build-source-text.mjs --ref hss.hnt.2026`
extracts only this source and preserves all other cached sources. The current
lecture registration changes SOURCE_FILES; every study-item hash is unchanged.

Source quotes are checked against their claimed page using the same citation
comparison as the corpus verifier. Image-only labels carry `diagramLabel` with
the reviewed transcription and page; the citation gate checks that the page
exists, not the text inside its diagram. Those labels were reviewed visually
against the registered PDF. Private lecture images remain in ignored work files.
All positions are app-authored annotations, not measurements from the lectures.

Surface markers are actual vertices of the shipped skeleton, including separate
reviewed views of the same feature where useful. Joint and suture markers must
lie near the actual neighbouring bones. The simplified four-bone pterion
junction uses a reviewed 6 mm boundary tolerance; other sutures use 4 mm. Thin scapular surfaces use outward
normals, corrected for the mirrored GLTF node transforms, to distinguish the
three fossae. The asymmetric right parietal bone has its own reviewed markers.
The generated payload stores vertex counts and local-position signatures and
refuses incompatible geometry. The builder also refuses a changed model hash:
a replacement mesh needs fresh visual curation, not a blind regeneration.

Sinus centres come from the actual separately named sinus meshes. Their
positions are measured in assembled anatomy and converted to the host bone's
local frame. An inside cue distinguishes these cavities from surface features.

The overlay projects local markers through the current bone and camera matrices.
Ray casting distinguishes far-side features with dashed leaders and a hollow
marker instead of hiding their names at a narrow range of angles. Close-view
thresholds have hysteresis. Each tag follows its feature with a diagonal then horizontal leader,
using nearby free space rather than fixed left/right columns or queued tag lists.
The diagonal rises at least 8 px and stays between 10 and 35 degrees from
horizontal, so the elbow is visible and the bend stays obtuse. The horizontal tail
is 28 px long, enters a side edge, and remains outside every tag box. A top/bottom
attachment would hide the tail along the tag border and is not used.
The placement prefers previous relative offsets for stability while rotating.
Tag edges stay at least 32 px from their own feature on narrow views (46 px with
more space). A convex outline projected from the actual mesh vertices gives
preference to placements outside the bone, with 12 px of outline clearance.
Markers and leaders still attach to the original reviewed vertices. Screen-space packing avoids labels, markers, panels and the
bottom toolbar. Only one instance of each named feature is shown. The Parts
menu temporarily hides tags and supports keyboard dismissal and focus return.
Tags and their chooser keep the standard text scale (1.1); reading text size
still changes the surrounding study interface. The compact Show all style has
its standard 12.1 px font, and Main/single tags use 13.2 px. Long tags also wrap
within the space that leaves room for both leader segments. Parts require a closer
zoom than the default Focus frame: the aspect-aware fit/distance ratio enters
at 0.82 and leaves at 0.76. This remains stable through camera rotation.
The overlay keeps canvas gestures available, and hides
annotations in quizzes, focused lessons, cuts and projection.

## Lecture-named structures

`work/build-viewer-lecture-names.mjs` audits all 13 PDFs (380 pages) in the supplied
Human Anatomy folder. Only names, file/page references and source hashes are
published in `viewer-lecture-names.js`; full extracted pages and rendered diagrams
stay in the ignored local cache. Exact names are checked before concise aliases;
category conflicts such as deltoid ligament versus deltoid muscle are excluded.
UL p14 and LL p12 explicitly teach the numbered metacarpal/metatarsal and phalanx
sets. LL p12 also identifies the three cuneiforms. These whole structures remain
individually selectable and searchable, without expanding the 82 part markers.

The payload cites 223 model structure/family names and restores 66 individual
identities previously folded into generic families. Previously named course IDs
retain their original values. Nine named muscle families still select their
whole unnamed fragments. Eight lecture joints are represented by their actual
modelled articular capsules and display the joint name. The browser gate selects
each cited name on the actual 2,914 meshes, checks its displayed name and source
page, and checks search results for formerly hidden hand/foot and muscle names.

## Skeleton depth repair

The previous skeleton path used the maximum opacity across both system chips
for every mesh. A solid Appendicular chip therefore overrode an Axial slider,
and vice versa. Apply opacity to each mesh using its own imported system keys;
use the existing shared classifier for fallback meshes. Clear peel snapshots
before changing the underlying materials. Preserve the exact opacity when
reopening the viewer instead of replacing every ghost setting with 0.34.

## Verification

- `node work/build-bone-landmarks.mjs --check`: reviewed curation and model hash.
- `node work/bone-landmark-check.mjs`: citations, diagram transcription metadata,
  all 32 actual bone meshes, unique names, the five-tag default limit, sinus mesh
  presence, name resolution and refusal on changed geometry.
- `work/bone-landmark-browser-check.js`: actual depth sliders and readouts,
  reopening, system toggles, GLTFLoader geometry on both sides, all 82 names
  selected through Parts from eight camera directions, projected markers,
  clipping/collisions, chooser hit targets, whole-orbit continuity and two-segment
  feature-relative tags, far-side styling, overview/quiz/cut/projection guards, close packed
  Spread, exact assembly restoration and an unmapped bone.
- `work/viewer-lecture-names-check.mjs` and
  `work/viewer-lecture-names-browser-check.js`: cited source pages, unchanged
  existing course identities, restored names, real selection and search.
- Browser checks at desktop and 402 × 874 with touch emulation, including the
  largest text setting. This is browser viewport verification, not an on-device
  installed-PWA run.
- `work/viewer-focus-browser-check.js`: the actual Focus and Reset buttons,
  all loaded layers, no selection glow even after replacement/legacy picks,
  repeated focus, depth changes, retained manual hiding, multi-part muscle and
  cross-layer groups, lazy loads and packed Spread.
- `work/course-spread-browser-check.js`: the existing complete Spread regression.

The viewer remains a reference surface. No lesson or quiz wording is changed.

Verified locally: module/load/binding/shell, source citations, text size,
separation, generated payload, maps and all probe baselines pass. Viewer checks
pass at 1386 × 1043 and 402 × 874 (Standard and Largest), with no console warnings
or errors. Focus and the complete 2,914-piece Spread regression also pass.
The whole-corpus array-integrity check still reports six existing consecutive
blank-line findings in physiology-depth.js and physiology-items.js; both files
were verified unchanged from HEAD. This viewer change introduces none of them.
No public deployment was performed.
