# SP4 — HSS2011 Weeks 1–4 Depth and Visuals Design Spec

Extend the 39 existing HSS2011 Weeks 1–4 lessons to full syllabus depth (~3000–5000 characters each where source material allows), add 9 new items to cover all lecture material across Weeks 1–4 (total 48 items), and attach topic-appropriate `visuals: [...]` lists (2–5 visuals per lesson) using 3D models, free-licensed figures, schematics, and generated layouts.

---

## Background & Scope

- **Week 1 (23 items)**:
  - Terminology (6 items): Anatomical position, directional pairs, planes, cavities & regions, regional vs systemic, word parts.
  - Osteology foundations (4 items): Axial vs appendicular, bone shapes, long bone structure, bone functions.
  - Bone histology & tissues (3 items): Bone matrix & 4 cell types, periosteum, bone marrow.
  - Muscle foundations & movement (4 items): 5 movement tissues, skeletal muscle organisation, tendon attachments, motor units & muscle tone.
  - Joint classifications & mechanics (6 items): Structural/functional classifications, fibrous & cartilaginous joints, synovial joint structure, synovial types, movement definitions, muscle functional roles (agonist, antagonist, synergist, fixator).
- **Week 2 (6 existing + 3 new = 9 items)**:
  - Existing: Upper limb movement map, pectoral girdle, forearm & carpals, carpal bones structure, rotator cuff structure, rotator cuff & full abduction.
  - New: Brachial plexus & nerve distribution (`hss2011-upper-brachial-plexus-nerves`), arm & forearm muscle compartments (`hss2011-upper-limb-muscles-compartments`), upper limb blood vessels (`hss2011-upper-limb-blood-vessels`).
- **Week 3 (4 existing + 3 new = 7 items)**:
  - Existing: Pelvic girdle, leg & tarsals, tarsal bones structure, knee joint internal anatomy.
  - New: Thigh and gluteal muscles (`hss2011-lower-thigh-gluteal-muscles`), leg muscles and foot arches (`hss2011-lower-leg-foot-muscles-arches`), femoral triangle and lower limb vessels/nerves (`hss2011-lower-femoral-triangle-vessels-nerves`).
- **Week 4 (6 existing + 3 new = 9 items)**:
  - Existing: Skull bones & sutures, skull base & foramina, vertebra parts, vertebral column & curvatures, C1 & C2 craniovertebral joints, vertebral regions & ligaments.
  - New: Cranial cavities, paranasal sinuses & orbital/nasal complexes (`hss2011-head-cranial-cavities-sinuses`), scalp and facial expression muscles via CN VII (`hss2011-head-facial-expression-muscles`), muscles of mastication via CN V3, TMJ & neck muscles via CN XI (`hss2011-head-mastication-neck-muscles`).

---

## Visual Density & Sourcing Strategy

Each lesson carries an ordered `visuals: [...]` array:
1. **3D Models**: Interactive views from the `skeleton`, `muscles`, and `organs` layers (`{ model: { layer, meshes, label, caption } }`). Verified against `mesh-index.js`.
2. **Published Free Figures**: Sourced via `node work/fetch-figure.mjs` from Wikimedia Commons (strictly CC-BY, CC-BY-SA, or Public Domain). Added to `outputs/figures.js` with required `intro` and callout `key` (marking unreferenced parts as `beyond: true`).
3. **Schematics & Layouts**: Hand-authored SVGs in `outputs/schematics.js` or data-driven layouts in `outputs/layouts.js` for abstract relationships (e.g. brachial plexus branching, joint classifications, movement axes, foot arches).
4. **Generated Visuals**: `{ gen: true }` rendering structured summaries directly from the item's own facts.

---

## Constraints

- **Zero Invention**: Every factual claim is page-cited to cached sources (`hss.w1.2026`, `hss.msk.2026`, `hss.move.2026`, `hss.4.1`, `hss.4.2`, `hss.4.3`, `hss.manual1920`, `hss.fib5yr`, `hss.revans`, `hss.pp1718`, `hss.ppans`).
- **Stable IDs**: All 39 existing item IDs remain unchanged to preserve mastery records.
- **Weekly Schedule Wiring**: All 9 new IDs are registered in `outputs/schedule.js` `WEEK_STUDY.HSS2011[2..4]`.
- **Precache & Offline**: Bump `CACHE_VERSION` in `outputs/sw.js`. Figures load on-demand into `rss-figures-v1` runtime cache.
