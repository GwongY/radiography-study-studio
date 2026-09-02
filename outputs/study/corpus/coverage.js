/*
 * Coverage report — what the supplied sources actually cover, and what they
 * do not.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Coverage report
 * ------------------------------------------------------------------ */

export const COVERAGE = {
  generated: 'Built from a recursive scan of the 22 shared source folders reachable from the supplied drive. The first scan was capped at depth 6 and saw 8,554 files; a full-depth re-scan found 15,499 (12,810 excluding desktop.ini and Drive stubs), so roughly 45% of the corpus was invisible to the original pass. Coverage below reflects the full-depth scan.',
  subjects: [
    {
      id: 'HSS2011', status: 'full',
      covered: [
        'Anatomical position, directional terms, planes, cavities, regions and quadrants',
        'Axial and appendicular skeleton; bone shapes; long bone structure; bone functions',
        'Vertebra structure, vertebral column regions and curvatures, atlas and axis',
        'Skull bones and the four sutures',
        'Pectoral girdle, upper limb bones, carpal rows',
        'Pelvic girdle, lower limb bones, tarsal bones',
        'Thoracic cage, thoracic inlet, mediastinum',
        'Joint classification, synovial joint structure, movements and their joints',
        'The six synovial joint types with worked examples, sorted by axes of movement',
        'Tap-to-identify structure sets on the 3D model with a three-state reveal: all 8 carpals, all 7 tarsals, 12 skull bones and the vertebral regions',
        'Word parts — prefixes, suffixes and roots, and how to take an unfamiliar term apart',
        'Rotator cuff and full abduction sequence',
      'The four teaching modules, NUMBERED BY THE 2026 ORIENTATION DECK: 1 Musculoskeletal, 2 Nervous, 3 Cardiovascular and pulmonary, 4 Digestive and urogenital. Every source folder on the drive uses the older ordering (1 Thorax … 4 Musculoskeletal) and the app now prints both.',
      'What the subject is and how it is marked: the objective, the four modules, and the 8 / 32 / 60 assessment split with which parts are open book.',
      'Bone histology — the two matrix components and the four cell types — and red versus yellow marrow.',
      'Muscle organisation from epimysium to myofilament, the five fascicle arrangements, tendon and its two junctions, origin and insertion, the motor unit and muscle tone.',
      ],
      gaps: [
      'The 2026 Module 1 deck has slides that carry no extractable text: the slow/fast oxidative/glycolytic comparison table and the movement-terminology slides are pictures. Those two topics are therefore NOT taught from this source — fibre types are covered on the physiology side (phys.susan9), and the movement terminology from the older HSS2011 files.',
      'Only Week 1 of the 2026 material has been supplied. Modules 2–4 are still covered from the previous years’ files, which is why their citations carry the old module numbers.',
        'MOOC 1–3 arterial supply and stroke correlates are present in the folders but no study items have been generated from them yet.',
        'Detailed muscle attachments beyond those named in the revision-exercise answers were deliberately not added.',
        'No local labelled diagram images exist in the app assets, so diagram labelling uses authored schematics plus the 3D model.',
      ],
      files: 138,
    },
    {
      id: 'ABCT2326', status: 'full',
      covered: [
      'The cell itself: plasma membrane and its six protein classes, the membranous and non-membranous organelles, the nucleus and the genetic code, transcription and translation, the cell cycle, mitosis and meiosis.',
      'Four tissue types, eleven organ systems, and each tissue in detail: epithelial classification by shape and by layers plus the glandular split, the three connective tissue classes with the blood argument, the three muscle types, neurons and neuroglia.',
      'Homeostasis, autoregulation vs extrinsic regulation, receptor–control centre–effector, and both feedback loops with the lecture’s worked examples (body temperature, blood clotting).',
        'Pulmonary and systemic circuits; heart chambers, valves, cardiac skeleton',
        'Blood composition, plasma proteins, vessel wall layers',
        'Respiratory pathway and conducting vs respiratory zones',
        'Digestive tract order, accessory organs, six functions',
        'Nephron tubule order, urine drainage pathway, GFR figures',
        'Hormone delivery classes and endocrine gland principle',
        'Lymphatic return and MALT',
        'Cardiac conducting system: SA node, pacemaker potential, AV delay, bundle of His, Purkinje fibres',
        'ECG waves and intervals, cardiac cycle, stroke volume, Frank–Starling law, heart sounds, refractory period',
        'Gas exchange at the alveolus, oxyhaemoglobin and saturation, and the full control-of-respiration reflex set',
        'Inflammation, the complement pathways and the membrane attack complex, active vs passive and cell- vs antibody-mediated immunity',
      ],
      gaps: [
        'BLOOD-PRESSURE REGULATION IS NOT IN THE SUPPLIED SOURCES. Neither the cardiovascular lecture deck nor its supplementary deck mentions blood-pressure regulation or baroreceptors as a cardiovascular topic. No items were written for it. (Baroreceptors do appear, but only in the respiratory lecture, as an input to the control of respiration — which is where they are covered here.)',
        'Reproductive system: the folder-6 lecture is a legacy binary .ppt that cannot be read offline, but the same lecture exists in readable form as Lec6_Reproduction.pdf in the 2020/21 set, so this is no longer a blocker — items simply have not been written yet.',
        'The 29-chapter question blank, the per-system tutorial-answer PDFs and the 2020/21 Lec1–Lec10 deck set are catalogued but not yet turned into items.',
        'Digestive-organ function and absorption is covered at pathway level only; the enzyme-by-enzyme detail in the lecture has not been mined.',
      ],
      files: 191,
    },
    {
      id: 'HTI17103', status: 'substitute',
      covered: [
        'What radiography is; the six radiation-related professional roles',
        'Ionizing vs non-ionizing modality split; MRI principles',
        'General X-ray, film processing, CR vs DDR, PACS',
        'Fluoroscopy and contrast agents; CT; radionuclide imaging; SPECT vs PET',
        'Time, distance, shielding, decay; ALARA; ICRP dose limits; TLD',
        'Radiation therapy roles, HK service structure and the three planning steps',
        'Radiology department staffing and reading an X-ray request form',
      ],
      gaps: [
        'The exact HTI17103 source set was not found anywhere in the supplied folders. Everything here comes from HTI17101 Exploring Radiography, which is the closest available material.',
        'Projection terminology: only "PA" and "Lat" appear anywhere in the supplied lecture set, in one worked chest X-ray request form. "AP" and "oblique" do not appear, so no items claim them.',
        'MI and RT worksheets are student submissions and were used only to confirm topic scope, not as fact sources.',
      ],
      files: 80,
    },
    {
      id: 'APSS1A08', status: 'limited',
      covered: [],
      gaps: [
        'No lecture slides, subject description form, reading list or past paper found.',
        'Only student assignments, homework and term papers, plus three photographs that cannot be read offline.',
        'No study content generated. Concept words appearing in student coursework are listed but are explicitly unverified.',
      ],
      files: 17,
    },
    {
      id: 'DSAI1202', status: 'none',
      covered: [],
      gaps: ['No file in any of the 22 shared folders matches DSAI1202, "data analytics" or "artificial intelligence".'],
      files: 0,
    },
    {
      id: 'LEI1101', status: 'none',
      covered: [],
      gaps: [
        'No file in any of the 22 shared folders matches LEI1101.',
        'ELC1011 and ELC1012 exist but are different subjects and have not been substituted.',
      ],
      files: 0,
    },
  ],
  duplicates: [
    { what: 'HSS2011 Study Manual 1819', where: ['Year 1 Sem 1 Source / HSS2011 Human Anatomy / Study Manual 1819.pdf', 'Radiography Sources / Yr1 Sem1 Radiography / HSS2011 Human Anatomy / Human Anatomy Manual 1819.pdf', 'White group sources / Year 1 / Radiography Yr1 Sem1 / HSS2011 Human Anatomy / Human Anatomy Manual 1819.pdf'] },
    { what: 'HSS2011 module lecture PDFs (0, 1.1–1.3, 2.x/3.x, 4.1–4.3)', where: ['Year 1 Sem 1 Source / … / Previous Years', 'Radiography Sources / Yr1 Sem1 Radiography / HSS2011 Human Anatomy'] },
    { what: 'HSS2011 past papers 2012-13 to 2017-18', where: ['Year 1 Sem 1 Source / HSS2011 Human Anatomy / Final Exam', 'Radiography Sources / … / Past Paper', 'Green source / year 1 sem 1 / HSS2011 Human Anatomy (named 2012"13.pdf … 2017"18.pdf)'] },
    { what: 'HSS2011 revision-exercise model answers', where: ['Revision Exercise Answer.pdf (standalone)', 'Study Manual 1920.pdf, Appendix — identical content'] },
    { what: 'ABCT2326 lecture decks', where: ['Year 1 Sem 1 Source / ABCT2326 Human Physiology / <system folders>', 'Radiography Sources / … / ABCT2326 Human Physiology / Lecture Note'] },
    { what: 'ABCT2326 past papers 2014-15, 2016-17, 2017-18', where: ['Year 1 Sem 1 Source / … / Final Exam', 'Radiography Sources / … / Past Paper', 'Green source / year 1 sem 1 / ABCT2326 Human Physiology'] },
    { what: 'Exploring Radiography MI and RT worksheets', where: ['Green Group Source / Exploring Radiography', 'Green Group Source / Others / Temp all / Exploring Radiography', 'Radiography Sources / … / Assignment'] },
  ],
  conflicts: [
    {
      what: 'The two ABCT2326 immune documents disagree on how many complement proteins there are',
      detail: 'The Week 10 slide deck says "Plasma contains 30 special complement (C) proteins". The lecturer\'s own prose notes filed in the same folder say "The blood plasma contains 11 special complement (C) proteins", in an otherwise identical sentence. Both are course material by the same author, neither corrects the other, and nothing else on the drive settles it. Counting the named C proteins gives eleven; counting the whole system including its factors gives about thirty, so the two are probably answering different questions — but that reading is inference, not something either document states.',
      handled: 'Both numbers carried, both cited, and the lesson says they disagree. The item teaches the cascade instead, and its common-mistakes list warns against quoting either count as settled.',
    },
    {
      what: 'HSS2011 module numbering differs between the two shared folder sets',
      detail: 'The "Year 1 Sem 1 Source" set numbers Module 2 as Neuroanatomy and Module 3 as Abdomen and Pelvis, matching the Study Manual 1920. The "Radiography Sources" set numbers them the other way round, and the underlying lecture PDFs still carry the older numbering (2.x for abdomen, 3.x for neuro). This app follows the Study Manual 1920 ordering and records the original filename in every source reference.',
      handled: 'Followed the newer manual ordering; original filenames preserved in the source dialog.',
    },
    {
      what: 'A model answer conflicts with its own study-guide text',
      detail: 'Module 1.1 fill-in-blank 1 asks for the epithelium of the oropharynx. The answer key gives "pseudostratified ciliated columnar epithelium", while the Submodule 1.1 study guide asks students to identify the areas lined with stratified squamous epithelium and understand why. Rather than propagate either reading as settled, no study item was generated from this question.',
      handled: 'Question excluded from the corpus and flagged here instead.',
    },
    {
      what: 'Two revision answers are ambiguous as written',
      detail: 'Module 3.2 MCQ 2 asks for "the tubular portion that is distal to the loop of Henle" with "ascending limb" keyed as correct, which only holds if "distal" means the later part of the loop rather than the segment after it. Module 3.3 MCQ 2 places the caecum in the "false pelvis" rather than the right iliac region. Neither was turned into a study item.',
      handled: 'Both questions excluded from the corpus.',
    },
    {
      what: 'RESOLVED — the "Generic Anatomy" material is the same subject under its old code',
      detail: 'A large topic-sorted question bank and 11 past papers sit under folders naming "Generic Anatomy" and "HSS201", which raised the question of whether they belong to a different subject. The 2012-13 paper header settles it: it reads "HSS201/HSS2011(2012) Final Exam", writing both codes together, so HSS201 is simply the predecessor code for HSS2011. The topic list also maps cleanly onto Modules 0-4, and some wording is near-verbatim — the bank asks for "tip to tip attachment of the thumb with any one of the fingers", which is the Module 0 slide almost word for word.',
      handled: 'Accepted as in scope and registered as a source. But the bank carries NO answer key — the only answers are photographs of handwritten pages that cannot be read offline — so items were built ONLY from questions whose answers are independently confirmed by a current HSS2011 lecture or the revision-exercise key. Questions it asks that current sources cannot verify (brachial plexus M-shape, femoral triangle borders, epimysium, amphiarthroses/synarthroses, TMJ muscles) were deliberately left out.',
    },
    {
      what: 'The answer-key table extracts incorrectly without layout preservation',
      detail: 'The three-column MCQ answer table in Revision Exercise Answer.pdf flattens into an ambiguous single column under ordinary text extraction, which silently mis-assigns answers between Modules 3.3, 4.1 and 4.2. All answers used here were re-read with layout preserved and cross-checked against the question text.',
      handled: 'Answers verified against layout-preserved extraction before use.',
    },
  ],
  notes: [
    'THE COVERAGE REPORT ITSELF HID A GAP. Until 2026-09-02 this entry listed "Cells, four tissue types, eleven organ systems" as covered for ABCT2326 and marked the subject full. Only two items existed for that unit and both were written from the back of the lecture — tissues and homeostasis. Everything before it (membrane, organelles, nucleus, protein synthesis, cell division) had been catalogued in ONE item’s prior-knowledge sidebar as things that go beyond DSE Biology, and never turned into lessons. Listing a topic as covered because a related item mentions it is how a gap becomes invisible: nothing downstream had any reason to look again. Nine items now teach it. When adding a covered line, describe what a lesson TEACHES, not what the corpus has read.',
    'The 2026 orientation deck renumbers the four HSS2011 modules and every source folder on the drive still uses the old ordering. The app numbers by the deck and prints the old number underneath, because a lesson headed Module 1 that cites "Module 4.1" looks wrong otherwise. The unit KEYS (hss.m1 … hss.m4) were deliberately NOT renamed — saved progress in the browser is keyed by them.',
    'The "downloaded ZIP" referred to in the brief was not present anywhere on this machine. The only downloaded asset found was Skeleton_NIH3D.glb. It has since been removed: it carried just 2 named nodes, so it could not support structure-level picking, and no code ever loaded it.',
    'No labelled diagram image files exist in the supplied app assets — only .glb 3D models — so diagram labelling uses authored inline SVG schematics whose label names come from the cited sources.',
    'The bundled Z-Anatomy / BodyParts3D skeleton is far more granular than the app originally used: 277 individually named meshes covering every carpal and tarsal, the separate skull bones, all 24 presacral vertebrae, and even the ear ossicles. It contains NO soft tissue — no heart, lung, brain, kidney, liver, muscle or vessel — so any 3D work on organs, muscles, pathways or neuroanatomy needs models this project does not yet have.',
    'Structure-set questions and diagram labelling both support a three-state reveal — labelled (teaching), guided (a couple of anchors left in) and blank (test). Blank is the default so a question stays a question; the labelled view is opened deliberately.',
    'Note on 3D mesh names: the loader normalises them on import, so "Scaphoid bone.r" in the source file becomes "Scaphoid_boner" in the scene. Structure sets store the clean source name and the matcher appends a candidate side letter rather than stripping one, because several bones legitimately end in l or r (femur, vomer, patella).',
    'Student coursework (lab reports, assignments, worksheets, presentations) was used only to confirm which topics are examined, never as a source for factual claims.',
    'Two scan bugs were found and fixed. The first pass was capped at depth 6, hiding about 45% of the files. It also filtered on subject codes, which missed folders that organise by topic name instead — the 2019/20 and 2015/16 HSS2011 lecture sets and the 2020/21 ABCT2326 set are all filed under plain "Human Anatomy" and "Human Physiology" with no code in the path.',
    'ICRP dose limits are quoted only because the exact values appear on Week 6 slide 10 of the supplied lecture, which cites ICRP Publication 103 directly. They are recorded as current-as-taught. If ICRP revises them, the app will still show what your course taught — check the source dialog before relying on them outside the exam.',
    'The topic-sorted question bank at 超神秘星巴黑材料 / Human anatomy / useful HA!!!! / Exam has been verified as in scope — see the resolved conflict above — and 11 further past papers (2003-04 to 2013-14) come with it. Because the bank has no answer key, it is a source of exam-style PROMPTS rather than verified answers: treat any question in it whose answer is not confirmed elsewhere as something to look up, not something the app can mark.',
  ],
};

export function coverageFor(subjectId) {
  return COVERAGE.subjects.find((s) => s.id === subjectId) || null;
}
