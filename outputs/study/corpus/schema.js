/*
 * Scaffolding: the source registry, the subjects and their units, the item
 * types and mastery dimensions, what prior knowledge is assumed, and the study
 * modes. No study item lives here.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

export const DATA_VERSION = 1;
export const STORAGE_PREFIX = 'rss.v1.';
export const LEGACY_STATS_KEY = 'osteology-studio-stats';

/* ------------------------------------------------------------------ *
 * Source registry
 * ------------------------------------------------------------------ */

/* Root folders as they appear on the supplied drive. */
export const SOURCE_ROOTS = {
  y1s1: 'Year 1 Sem 1 Source',
  radio: 'Radiography Sources (祝返工順利)',
  green: '綠柚皮高質source',
  white: '白組sources',
  gold: '依吖温金牌梳士',
  star: '超神秘星巴黑材料',
  extra: 'extra source',
  torti: '21 Torti Source',
  oste20: '20 Oste sourcesssss',
  greengrp: 'Green Group Source',
  edb: 'EDB — external, fetched from edb.gov.hk',
  /* Not a shared drive folder: material dropped straight into the repo as the
     semester runs. Catalogued alongside the drive by build-source-catalogue. */
  newsrc: 'New source',
};

/*
 * kind:
 *   'primary'    teaching material issued by the subject (lecture / manual / slides)
 *   'assessment' past papers, exercises, answer keys, question banks
 *   'student'    student-produced coursework — evidence of topics, NOT authoritative
 *   'admin'      schedules, rubrics, subject description forms
 *   'syllabus'   an external curriculum document. The ONLY thing it is allowed
 *                to support is a claim about what a previous course already
 *                taught. It never sources anatomy or physiology itself.
 */
export const SOURCE_FILES = {
  /* ---------------- HSS2011 Human Anatomy ---------------- */
  'hss.vocab': { file: 'Vocabulary.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy', kind: 'primary', note: 'Glossary of examinable term names. Lists terms only — it carries no definitions, so it fixes scope but never supplies wording.' },
  'hss.manual1920': { file: 'Study Manual 1920.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy', kind: 'primary', note: 'Study Manual, 2nd Edition 2019/20. Module structure, study guides, guiding questions, revision exercises and model answers.' },
  'hss.manual1819': { file: 'Study Manual 1819.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy', kind: 'primary' },
  'hss.manual1819b': { file: 'Human Anatomy Manual 1819.pdf', subject: 'HSS2011', root: 'radio', folder: 'Yr1 Sem1 Radiography/HSS2011 Human Anatomy', kind: 'primary', note: 'Duplicate of the 1819 manual held in a second shared folder.' },
  'hss.orientation': { file: 'Anatomical orientation and terminologies.docx', subject: 'HSS2011', root: 'green', folder: 'year 1 sem 1/HSS2011 Human Anatomy', kind: 'primary' },
  'hss.wordparts': { file: 'definition_wordparts.pdf', subject: 'HSS2011', root: 'green', folder: 'year 1 sem 1/HSS2011 Human Anatomy', kind: 'primary' },
  'hss.m0': { file: '0. Human Body and Movement.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 0 Online Studies on Human Body and Movement/Previous Years', kind: 'primary' },
  'hss.m0.1718': { file: '0 Human Body and Movement (17-18).pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 0 Online Studies on Human Body and Movement/Previous Years', kind: 'primary', note: 'Handout version 2017/18. Slide footers run L1 p2 … L1 p60, which is what the page references below point at.' },
  'hss.m0.rev': { file: '0 Human Body and Movement_Revision Exercise.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 0 Online Studies on Human Body and Movement/Previous Years', kind: 'assessment' },
  'hss.1.1': { file: '1.1 Cardiovascular System and Lungs (17-18).pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 1 Thorax/Previous Years', kind: 'primary' },
  'hss.1.2': { file: '1.2 Cardiopulmonary System and Associated Structures.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 1 Thorax/Previous Years', kind: 'primary' },
  'hss.1.3': { file: '1.3 Regional Anatomy of the Thorax.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 1 Thorax/Previous Years', kind: 'primary' },
  'hss.2.2': { file: '3.2 Nervous System and Special Sense.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 2 Neuroanatomy/Previous Years', kind: 'primary', note: 'Filed under Module 2 Neuroanatomy but numbered 3.2 from the older module ordering.' },
  'hss.2.3': { file: '3.3 Neuroanatomy.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 2 Neuroanatomy/Previous Years', kind: 'primary' },
  'hss.3.1': { file: '2.1 Digestive System.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 3 Abdomen and Pelvis/Previous Years', kind: 'primary' },
  'hss.3.2': { file: '2.2 Urogenital System.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 3 Abdomen and Pelvis/Previous Years', kind: 'primary' },
  'hss.3.3': { file: '2.3 Regional Anatomy of the Abdominopelvic.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 3 Abdomen and Pelvis/Previous Years', kind: 'primary' },
  'hss.4.1': { file: '4.1 Musculoskeletal System.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 4 Musculoskeletal System/Previous Years', kind: 'primary', note: 'Skeletal, joint and muscular systems — Dr William Tsang, 2018.' },
  'hss.4.2': { file: '4.2 Head and Neck.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 4 Musculoskeletal System/Previous Years', kind: 'primary' },
  'hss.4.3': { file: '4.3 Upper and Lower Limbs.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Module 4 Musculoskeletal System/Previous Years', kind: 'primary', note: 'Anatomy of Upper & Lower Limbs — Dr Shamay Ng, 2018-2019.' },
  'hss.revans': { file: 'Revision Exercise Answer.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy', kind: 'assessment', note: 'Model answers for every module revision exercise. Same content as the Study Manual appendix; read with layout preserved so the three-column answer table resolves correctly.' },
  'hss.pp1718': { file: '2017-2018 Human Anatomy Exam.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Final Exam', kind: 'assessment' },
  'hss.ppans': { file: '2012-2017 Human Anatomy Exam Answer.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Final Exam', kind: 'assessment' },
  'hss.fib5yr': { file: '5yrs PP module 1-4 FIB.pdf', subject: 'HSS2011', root: 'green', folder: 'year 1 sem 1/HSS2011 Human Anatomy', kind: 'assessment' },
  'hss.1920.m1.cp': { file: '1920_L1_cardiopulmonary_systems.pdf', subject: 'HSS2011', root: 'gold', folder: 'Sem 1 (Year 1)/Human Anatomy/Lecture ppt_1920/Module 1', kind: 'primary', note: 'The 2019/20 lecture set — the same academic year as Study Manual 1920, so its module numbering matches the manual rather than the older Previous Years copies.' },
  'hss.1920.m1.thorax': { file: '1920_L2_thorax.pdf', subject: 'HSS2011', root: 'gold', folder: 'Sem 1 (Year 1)/Human Anatomy/Lecture ppt_1920/Module 1', kind: 'primary' },
  'hss.1516.lec11': { file: 'Lec11_Skeletal, joint and muscular system.pdf', subject: 'HSS2011', root: 'gold', folder: 'Sem 1 (Year 1)/Human Anatomy/Lectures ppt_1516', kind: 'primary', note: 'The 2015/16 lecture set, kept as a second reading of the same material.' },
  'hss.vocab.jack': { file: 'LAST MINUTE VOCAB LIST (Jack).pdf', subject: 'HSS2011', root: 'gold', folder: 'Sem 1 (Year 1)/Human Anatomy', kind: 'student', note: 'Student-compiled, module-grouped term list. Mostly names rather than definitions, but carries useful equivalences such as "visceral = epicardium".' },
  'hss.ga.pp': { file: 'Exam Past paper by year 2003-2013/ (11 papers, 2003-04 to 2013-14)', subject: 'HSS2011', root: 'star', folder: 'Human anatomy/useful HA!!!!/Exam', kind: 'assessment', note: 'Sat under the predecessor subject code. The 2012-13 paper header reads "HSS201/HSS2011(2012) Final Exam", which is how the university itself writes the two codes — HSS201 is the earlier code for the same subject.' },
  'hss.ga.topics': { file: 'MC + SQ by topic 2005-2011/ (14 topic folders)', subject: 'HSS2011', root: 'star', folder: 'Human anatomy/useful HA!!!!/Exam', kind: 'assessment', note: 'Past-paper questions sorted by topic across 14 folders. QUESTIONS ONLY — it carries no answer key, so it cannot by itself supply a verified answer. Used here only where the answer is independently confirmed by a current HSS2011 source.' },
  'hss.ga.sqans': { file: 'SQ Answer by year 2007-2011/ (photographs)', subject: 'HSS2011', root: 'star', folder: 'Human anatomy/useful HA!!!!/Exam', kind: 'assessment', note: 'Short-question answers, but as JPG photographs of handwritten pages. Not machine-readable offline, so they could not be used to verify anything.' },
  'hss.mooc1': { file: 'MOOC 1 Arterial Supply of Body Trunk and Upper Limbs.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Old MOOC', kind: 'primary' },
  'hss.mooc3': { file: 'MOOC 3 Anatomical Correlates of Stroke.pdf', subject: 'HSS2011', root: 'y1s1', folder: 'HSS2011 Human Anatomy/Old MOOC', kind: 'primary' },
  /*
   * The 2026 material, dropped into the repo as the semester runs. These two
   * are the first HSS2011 files from the year the student is actually sitting,
   * and the orientation deck RENUMBERS THE MODULES — see MODULES in modules.js.
   */
  'hss.w1.2026': { file: 'HSS2011_Wk1__orientat_intro.pdf', subject: 'HSS2011', root: 'newsrc', folder: '', kind: 'primary', note: 'Week 1 subject orientation, Benson Lau, 18 pages. The authority for the 2026 module ordering — Module 1 Musculoskeletal, 2 Nervous, 3 Cardiovascular and pulmonary, 4 Digestive and urogenital — which is a different numbering from the "Module 1 Thorax … Module 4 Musculoskeletal System" folders every older file is filed under. Also carries the assessment weights and the body-orientation terminology.' },
  'hss.msk.2026': { file: 'W1_MusculoskeletalSystem_2026_CKK_upload.pdf', subject: 'HSS2011', root: 'newsrc', folder: '', kind: 'primary', note: 'Module 1 Week 1, Dr Alex Cheung, 39 pages. Bone histology and gross structure, marrow, the five bone types, the three joint classifications and the six synovial types, ligaments, cartilage, muscle organisation from epimysium down to myofilament, tendon and the Golgi tendon organ, origin and insertion, the fascicle arrangements, motor units and muscle tone. Its fibre-type comparison table and its movement-terminology slides are pictures, so neither extracts as text.' },

  /* ---------------- ABCT2326 Human Physiology ---------------- */
  'phys.ebook': { file: 'Fundamentals of Anatomy and Physiology_eBook.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology', kind: 'primary', note: 'Martini, Nath & Bartholomew (2015), 10th ed. — the core textbook named on the lecture-note title slides.' },
  'phys.qbank': { file: 'Fundamentals of Anatomy and Physiology_Question Bank.pdf', subject: 'ABCT2326', root: 'y1s1', folder: '(subject root)', kind: 'assessment' },
  'phys.1': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/1. Cells and Body Organization', kind: 'primary' },
  /*
   * The 2026 edition of the same lecture, dropped into New source. It is the
   * Martini Chapter 3 lecture presentation at full length — 62 pages — where
   * phys.1 is the shorter deck the older folder holds. Registering it was
   * missed when the other two New source files were: everything before
   * "An Introduction to Tissues" — the membrane, the organelles, the nucleus,
   * protein synthesis, mitosis and meiosis — had no source to be cited to.
   */
  'phys.1.2026': { file: 'Lecture 1 - Cells and Body Organization.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Chapter 3 of Martini as delivered, 62 pages: the plasma membrane and its six protein classes, every organelle in turn, the nucleus and the genetic code, transcription and translation, the cell cycle and mitosis, meiosis, then body organisation, the four tissue types and homeostasis. A second copy of the same filename sits on the drive under "extra source" at a different size; this entry means the New source copy.' },
  'phys.2': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/2. Cardiovascular System', kind: 'primary' },
  'phys.3': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/3. Respiratory System', kind: 'primary' },
  'phys.4': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/4. Digestive System', kind: 'primary' },
  'phys.5': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/5. Renal System', kind: 'primary' },
  'phys.6': { file: 'Lecture notes.ppt', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/6. Reproductive System', kind: 'primary', note: 'Legacy binary .ppt, not readable offline. Superseded here by Lec6_Reproduction.pdf, which is the same lecture in a readable form.' },
  'phys.6.pdf': { file: 'Lec6_Reproduction.pdf', subject: 'ABCT2326', root: 'gold', folder: 'Sem 1 (Year 1)/Human Physiology/Lecture', kind: 'primary', note: 'Readable copy of the reproductive-system lecture, from the 2020/21 set.' },
  'phys.2.supp': { file: '2. Cardiovascular System_Supplementary Information.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/2. Cardiovascular System', kind: 'primary' },
  'phys.7': { file: 'Lecture notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/7. Endocrine System', kind: 'primary' },
  'phys.hormech': { file: 'ABCT2326 Hormone Mechanism _ABCT2326_.pdf', subject: 'ABCT2326', root: 'gold', folder: 'Human Physiology/Lecture', kind: 'primary', note: 'Nine pages of prose on how a hormone actually acts: receptors and up/downregulation, the three hydrophilic second-messenger systems (adenylate cyclase-cAMP, phospholipase C-Ca2+, tyrosine kinase), and the hydrophobic/genomic route. The Week 7 slide deck names the mechanisms; this is the file that explains them.' },
  'phys.8': { file: 'Lecture notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/8. Nervous System', kind: 'primary' },
  'phys.9': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/9. Musculoskeletal System', kind: 'primary' },
  'phys.10': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/10. Immune System', kind: 'primary' },
  /*
   * The lecturer's own prose notes, one per system, filed inside the numbered
   * lecture folders alongside the deck. They are the same author writing at
   * length: where the deck gives a labelled diagram, these give the mechanism
   * in sentences.
   *
   * The endocrine one is NOT listed here because it is already registered — it
   * is byte-identical to phys.hormech, which arrived under a different name
   * from a different folder. Four files, three ids.
   */
  'phys.susan8': { file: 'Susan notes.docx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/8. Nervous System', kind: 'primary', note: 'A page written in answer to a student question, on how drugs act at synapses: the eight points in the mechanism a drug can attack, why long-term effects resist prediction, and SSRIs as the worked example.' },
  'phys.susan9': { file: 'Susan notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/9. Musculoskeletal System', kind: 'primary', note: 'Twenty-one pages on muscle: sarcomere banding, the crossbridge cycle step by step, the neuromuscular junction and excitation-contraction coupling, muscle fuel and VO2 max, slow/fast twitch, spindles and the Golgi tendon organ, pyramidal and extrapyramidal control.' },
  'phys.susan10': { file: 'Susan notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/10. Immune System', kind: 'primary', note: 'Seventeen pages on immunity: the seven innate defences one by one, both complement pathways in sequence, then the adaptive side — MHC class I and II, CD4/CD8, costimulation, and how a B cell waits for a helper T cell.' },
  'phys.tut': { file: 'Tutorial answer.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/<system folder>', kind: 'assessment', note: 'One per system folder (1–10).' },
  'phys.extra': { file: 'Extra exercise.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/<system folder>', kind: 'assessment', note: 'One per system folder (1–10).' },
  'phys.qblank': { file: 'question blank/Chapter 1–29.pdf', subject: 'ABCT2326', root: 'green', folder: 'year 1 sem 1/ABCT2326 Human Physiology', kind: 'assessment', note: '29 chapter-level question sets.' },
  'phys.sdf': { file: 'Subject Description Form.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology', kind: 'admin' },

  /* ---------------- HTI17101 Exploring Radiography (stand-in for HTI17103) ---------------- */
  'hti.w1a': { file: 'Week 1 About the Subject.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w1b': { file: 'Week 1 Radiographer To Be.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w1.2026': { file: 'ER_Lec1%282026%29.pdf', subject: 'HTI17103', root: 'newsrc', folder: '', kind: 'primary', note: 'The 2026 edition of the opening lecture, by Liang-Ting Lin. Most of it restates hti.w1b — same etymology, same six professional roles, same tungsten/rhenium target. What is new is the back half: the radiotherapy technique list, structural versus functional imaging, and the criteria by which a modality is chosen.' },
  'hti.w2': { file: 'Week 2 Medical Imaging Modalities and Equipment.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w3': { file: 'Week 3 Introduction to Radiation Therapy.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w5': { file: 'Week 5 Radiographer Role Extension.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w6': { file: 'Week 6 Basic Radioprotection and Cancers.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.mi': { file: 'ER MI Worksheet 2016-17 MI.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Assignment', kind: 'assessment' },
  'hti.rt': { file: 'ER RT Worksheet 2016-17_SL.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Assignment', kind: 'assessment' },
  'hti.rni': { file: 'RADIONUCLIDE IMAGING  (RNI).pptx', subject: 'HTI17103', root: 'greengrp', folder: 'Exploring Radiography', kind: 'student' },
  'hti.pres': { file: 'Guidelines and Topics for Presentations 2018-19.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Class Information', kind: 'admin' },
  'hti.sdf': { file: 'Subject Desciption Form.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography', kind: 'admin' },

  /* ---------------- DSAI1202 Introduction to AI and Data Analytics ---------------- */
  'dsai.w1': { file: '1.+Week1-Overview.pptx', subject: 'DSAI1202', root: 'newsrc', folder: '', kind: 'primary', note: 'Week 1 overview, 47 slides, Dr Xiuling Wang. Half course admin, half a tour of where AI already sits in daily life, healthcare and work. The deck states its own limits: this is an AI-literacy General University Requirement, and programming and the mathematics of AI are explicitly not included.' },

  /* ---------------- APSS1A08 Introduction to Sociology ---------------- */
  'soc.a1.star': { file: 'assignment 1.docx', subject: 'APSS1A08', root: 'star', folder: 'CAR/introduction to sociology', kind: 'student' },
  'soc.a2.star': { file: 'assignment 2.docx', subject: 'APSS1A08', root: 'star', folder: 'CAR/introduction to sociology', kind: 'student' },
  'soc.fp.star': { file: 'final paper.docx', subject: 'APSS1A08', root: 'star', folder: 'CAR/introduction to sociology', kind: 'student' },
  'soc.a1.green': { file: 'YipYiuChung_18063215D_Assignment1_docx.docx', subject: 'APSS1A08', root: 'green', folder: 'CAR/Introduction to Sociology', kind: 'student' },
  'soc.hw2.green': { file: 'Sociology HW 2.docx', subject: 'APSS1A08', root: 'green', folder: 'CAR/Introduction to Sociology', kind: 'student' },
  'soc.tp.green': { file: 'Term Sociology paper .docx', subject: 'APSS1A08', root: 'green', folder: 'CAR/Introduction to Sociology', kind: 'student' },
  'soc.tp.extra': { file: 'APSS1A08_TermPaper_LeeManDik_19051838D.docx', subject: 'APSS1A08', root: 'extra', folder: 'SEM 2/soci', kind: 'student' },
  'soc.a1.extra': { file: 'APSS1A08_assignment1_LeeManDik_19051838D.docx', subject: 'APSS1A08', root: 'extra', folder: 'SEM 2/soci', kind: 'student' },
  'soc.a2.extra': { file: 'APSS1A08_assignment2_LeeManDik_19051838D.docx', subject: 'APSS1A08', root: 'extra', folder: 'SEM 2/soci', kind: 'student' },
  'soc.a2.gold': { file: 'Au Chung Chin - APSS1A08 Assignment 2.docx', subject: 'APSS1A08', root: 'gold', folder: 'Sociology', kind: 'student' },
  'soc.ass1.oste': { file: 'ASS1.doc', subject: 'APSS1A08', root: 'oste20', folder: 'GUR Subjects/CAR Subjects/Sociology', kind: 'student' },
  'soc.ass2.oste': { file: 'Assessment 2.docx', subject: 'APSS1A08', root: 'oste20', folder: 'GUR Subjects/CAR Subjects/Sociology', kind: 'student' },
  /* ---------------- Prior knowledge ---------------- */
  'edb.bio': { file: 'Biology Curriculum and Assessment Guide (S4–6), updated Nov 2015', subject: 'HKDSE', root: 'edb', folder: 'Science Education KLA — edb.gov.hk', kind: 'syllabus', note: 'Fetched from edb.gov.hk, not from the supplied shared folders. It is here for exactly one purpose: to say what HKDSE Biology already covered, and whether a topic sat in the compulsory part or in the Human Physiology elective. No anatomy or physiology claim in this file is sourced to it.' },

  'soc.img.torti': { file: 'IMG_4192.JPG / IMG_4193.JPG / IMG_4194.JPG', subject: 'APSS1A08', root: 'torti', folder: 'GUR subjects/CAR/Introduction to Sociology', kind: 'student', note: 'Photographs. Not machine-readable offline, so their contents are unverified.' },
};

export function sourceRef(ref) {
  return SOURCE_FILES[ref] || null;
}

export function describeSource(entry) {
  const src = SOURCE_FILES[entry.ref];
  if (!src) {
    return { file: entry.ref || 'App-authored', subject: '—', folder: '—', location: entry.location || '', kind: 'authored', note: '', authored: true };
  }
  return {
    file: src.file,
    subject: src.subject,
    folder: (SOURCE_ROOTS[src.root] || src.root) + ' / ' + src.folder,
    location: entry.location || '',
    kind: src.kind,
    note: src.note || '',
    authored: !!entry.authored,
  };
}

/* ------------------------------------------------------------------ *
 * Subjects
 * ------------------------------------------------------------------ */

export const SUBJECTS = [
  {
    id: 'HSS2011',
    code: 'HSS2011',
    title: 'Human Anatomy',
    accent: '#5fd0c5',
    coverage: 'full',
    blurb: 'Four modules plus the online foundation module, taught through a flipped-classroom study manual with revision exercises and model answers.',
    units: [
      /*
       * Ordered and numbered by the 2026 orientation deck (hss.w1.2026 p10-13),
       * not by the source folders. The unit KEYS still carry the folder numbers
       * because saved progress is keyed by them — see modules.js.
       */
      { id: 'hss.subject', label: 'About the subject & how it is assessed', note: '2026 orientation' },
      { id: 'hss.term', label: 'Anatomical orientation & terminology', note: 'Week 1 foundation' },
      { id: 'hss.osteo', label: 'Osteology — bones, landmarks, articulations', note: 'Interactive 3D skeleton', hasStudio: true },
      { id: 'hss.joints', label: 'Joints & movements' },
      { id: 'hss.m4', label: 'Module 1 — Musculoskeletal system', note: 'Filed as Module 4 on the drive' },
      { id: 'hss.m2', label: 'Module 2 — Nervous system' },
      { id: 'hss.m1', label: 'Module 3 — Cardiovascular & pulmonary', note: 'Filed as Module 1 on the drive' },
      { id: 'hss.m3', label: 'Module 4 — Digestive & urogenital', note: 'Filed as Module 3 on the drive' },
    ],
  },
  {
    id: 'ABCT2326',
    code: 'ABCT2326',
    title: 'Human Physiology',
    accent: '#ffba67',
    coverage: 'full',
    blurb: 'Ten system lectures with supplementary decks, tutorial answers and extra exercises, built on the Martini Fundamentals of Anatomy & Physiology eBook.',
    units: [
      { id: 'phys.cells', label: '1 — Cells & body organisation' },
      { id: 'phys.cvs', label: '2 — Cardiovascular system' },
      { id: 'phys.resp', label: '3 — Respiratory system' },
      { id: 'phys.dig', label: '4 — Digestive system' },
      { id: 'phys.renal', label: '5 — Renal system' },
      { id: 'phys.repro', label: '6 — Reproductive system', note: 'Legacy .ppt — not extractable offline' },
      { id: 'phys.endo', label: '7 — Endocrine system' },
      { id: 'phys.nerv', label: '8 — Nervous system' },
      { id: 'phys.msk', label: '9 — Musculoskeletal system' },
      { id: 'phys.imm', label: '10 — Immune system' },
    ],
  },
  {
    id: 'HTI17103',
    code: 'HTI17103',
    title: 'Introduction to Medical Radiation Science',
    accent: '#8ea9ff',
    coverage: 'substitute',
    substituteFor: 'HTI17101 Exploring Radiography',
    blurb: 'Built from the HTI17101 Exploring Radiography lecture set — the closest available material. The exact HTI17103 source set was not found.',
    units: [
      { id: 'hti.subject', label: 'About the subject & the radiographer role' },
      { id: 'hti.modalities', label: 'Medical imaging modalities & equipment' },
      { id: 'hti.rt', label: 'Introduction to radiation therapy' },
      { id: 'hti.roleext', label: 'Radiographer role extension' },
      { id: 'hti.protect', label: 'Basic radioprotection & cancers' },
    ],
  },
  {
    id: 'APSS1A08',
    code: 'APSS1A08',
    title: 'Introduction to Sociology',
    accent: '#d3a0ff',
    coverage: 'limited',
    blurb: 'Limited source coverage. Only student assignments and term papers were found — no verified lecture syllabus.',
    units: [{ id: 'soc.files', label: 'Supplied files' }],
  },
  {
    id: 'DSAI1202',
    code: 'DSAI1202',
    title: 'Introduction to AI and Data Analytics',
    accent: '#7fd1a0',
    coverage: 'limited',
    blurb: 'The Week 1 overview deck only, dropped into New source/ as the semester started. It is a General University Requirement AI-literacy subject, explicitly not technical: the deck says programming and the mathematics of AI are not included. The other twelve weeks — AI overview, GenAI, machine learning — have not been supplied.',
    units: [
      { id: 'dsai.overview', label: 'Week 1 — Course overview & AI in practice' },
    ],
  },
  {
    id: 'LEI1101',
    code: 'LEI1101',
    title: 'AI as a Tool for Language Learning',
    accent: '#ff9aa8',
    coverage: 'none',
    blurb: 'No verified LEI1101 materials were found in the supplied source folders.',
    units: [],
  },
];

export function getSubject(id) {
  return SUBJECTS.find((s) => s.id === id) || null;
}

export function getUnit(subjectId, unitId) {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  return subject.units.find((u) => u.id === unitId) || null;
}

/* ------------------------------------------------------------------ *
 * Item types and mastery dimensions
 * ------------------------------------------------------------------ */

export const ITEM_TYPES = {
  definition: { label: 'Definition', dimension: 'recognition' },
  mcq: { label: 'Multiple choice', dimension: 'recognition' },
  typed: { label: 'Typed recall', dimension: 'typedRecall' },
  cloze: { label: 'Cloze', dimension: 'typedRecall' },
  sequence: { label: 'Sequence ordering', dimension: 'sequence' },
  matching: { label: 'Matching', dimension: 'recognition' },
  diagram: { label: 'Diagram labelling', dimension: 'location' },
  id3d: { label: '3D identification', dimension: 'location' },
  structure: { label: 'Structure set — tap to identify', dimension: 'location' },
  movement: { label: 'Joint movement — drive it on the model', dimension: 'location' },
  laterality: { label: 'Laterality', dimension: 'location' },
  landmark: { label: 'Landmark identification', dimension: 'location' },
  comparison: { label: 'Comparison', dimension: 'comparison' },
  explain: { label: 'Short explanation', dimension: 'explanation' },
  scenario: { label: 'Scenario application', dimension: 'application' },
};

export const MASTERY_DIMENSIONS = [
  { id: 'recognition', label: 'Recognition', hint: 'Picking the right answer when you can see it.' },
  { id: 'typedRecall', label: 'Typed recall', hint: 'Producing the term from memory with no options on screen.' },
  { id: 'spelling', label: 'Spelling', hint: 'Getting the term letter-perfect, not just close.' },
  { id: 'location', label: 'Location', hint: 'Finding it on the model, on a diagram, or on the correct side.' },
  { id: 'sequence', label: 'Sequence', hint: 'Putting a pathway or order into the right sequence.' },
  { id: 'explanation', label: 'Explanation', hint: 'Saying why, in your own words.' },
  { id: 'application', label: 'Application', hint: 'Using the fact in a scenario you have not seen before.' },
  { id: 'comparison', label: 'Comparison', hint: 'Telling it apart from the structure it is most confused with.' },
  { id: 'delayedRecall', label: 'Delayed recall', hint: 'Getting it right on the first attempt after a gap of a day or more — not just within a session.' },
];

export const MEMORY_METHODS = {
  mnemonic: 'Mnemonic',
  firstLetter: 'First-letter mnemonic',
  chunking: 'Chunking',
  wordOrigin: 'Word origin',
  visualCue: 'Visual association',
  comparison: 'Contrast with a confusable',
  sequence: 'Sequence grouping',
  teachBack: 'Teach-back',
  location: 'Location-based association',
};

/* ------------------------------------------------------------------ *
 * Prior knowledge
 *
 * Some of this corpus is not new material for the person studying it. Where a
 * whole school subject already taught the same content, teaching it again from
 * zero wastes the session and, worse, buries the two or three things the
 * lecture actually adds on top of it.
 *
 * An item carrying a priorKnowledge entry is therefore VERIFIED rather than
 * taught: the session opens on Practise, the lesson stays one click away, and
 * the Learn card leads with what the lecture adds instead of the shared
 * background.
 *
 *   covers: 'most'  the prior subject taught the substance of this item; the
 *                   lecture adds terminology, a named list or specific numbers.
 *   covers: 'part'  the prior subject taught the foundation only; a substantial
 *                   part of this item is genuinely new.
 *
 * beyond[] is drawn from the lecture deck itself, and each line carries its own
 * src the way a practice question does: { ref, location } pointing at the slide
 * it came off. Nothing here is textbook expansion or DSE-syllabus knowledge
 * written from memory — if a line has no slide behind it, it does not belong.
 * ------------------------------------------------------------------ */

export const PRIOR_KNOWLEDGE = {
  'dse-bio': {
    label: 'HKDSE Biology',
    short: 'DSE Bio',
    blurb: 'Covered at HKDSE Biology level. Verify it rather than sit through it — the full lesson is one click away if the answer does not come.',
  },
};

/*
 * Which part of the DSE syllabus carried it.
 *
 * This distinction is not pedantry. The nephron, the cardiac cycle, the
 * pacemaker and the respiratory centres are NOT in the compulsory part — they
 * sit in the elective "Human Physiology: Regulation and Control". Tagging them
 * as already-known is only correct for someone who took that elective, and
 * sending anyone else straight to a question on unseen material would be the
 * opposite of helpful. Every dsePart below is checked against the EDB guide.
 */
export const DSE_PARTS = {
  core: { label: 'compulsory part', note: 'Every HKDSE Biology candidate takes this.' },
  'elective-hp': { label: 'elective — Human Physiology: Regulation and Control', note: 'Only assumed because this learner took that elective.' },
};

export function priorOf(item) {
  const pk = item && item.priorKnowledge;
  if (!pk) return null;
  const level = PRIOR_KNOWLEDGE[pk.level];
  if (!level) return null;
  /* A bare string is accepted so a line can be sketched before its slide is found. */
  const beyond = (pk.beyond || []).map((b) => (typeof b === 'string' ? { t: b, src: null } : b));
  const part = DSE_PARTS[pk.dsePart] || DSE_PARTS.core;
  return { ...level, id: pk.level, covers: pk.covers || 'part', beyond, dsePart: pk.dsePart || 'core', part };
}

/* Every beyond line's citation, for the source dialog. */
export function priorSources(item) {
  const prior = priorOf(item);
  if (!prior) return [];
  return prior.beyond.map((b) => b.src).filter(Boolean);
}

/*
 * An unattempted item scores zero, which puts it at the front of every
 * weakest-first queue. A prior-knowledge item is not zero — it is unverified,
 * which is a different thing — so ordering treats it as half known until the
 * first real answer replaces the assumption with evidence.
 *
 * This is a DERIVED value, used for ordering and for the dashboard label. It is
 * never written into the mastery store: attempts, accuracy, lapses and
 * intervals stay a record of what was actually answered in this course, with no
 * seeded attempts inflating them.
 */
export const PRIOR_ASSUMED_SCORE = 0.5;

export function priorAdjustedScore(item, score, attempted) {
  if (attempted) return score;
  return priorOf(item) ? PRIOR_ASSUMED_SCORE : 0;
}

/* Where a session opens an item: verify what is already known, teach what is not. */
export function entryStep(item, attempted) {
  return !attempted && priorOf(item) ? 'practise' : 'learn';
}

/* ------------------------------------------------------------------ *
 * Study modes
 * ------------------------------------------------------------------ */

export const STUDY_MODES = [
  { id: 'new', label: 'Teach me something new', hint: 'Unseen items, taught before they are tested.', icon: '✦' },
  { id: 'daily', label: 'Daily pre-study session', hint: 'A mixed warm-up: terminology, bones, one physiology sequence, one radiation-science concept.', icon: '◔' },
  { id: 'weakest', label: 'Review my weakest topics', hint: 'Lowest mastery first, weighted by repeated mistakes.', icon: '▼' },
  { id: 'quick10', label: 'Quick 10-minute session', hint: 'A short due-and-weak mix, capped at roughly ten minutes.', icon: '⏱' },
  { id: 'exam', label: 'Exam-style recall', hint: 'MCQ and fill-in-blank items drawn from the supplied revision exercises.', icon: '⌸' },
  { id: 'hooks', label: 'Memory hooks only', hint: 'Just the memory aids, no scoring.', icon: '⚓' },
  { id: 'mistakes', label: 'Explain my mistakes', hint: 'Everything you have got wrong, with the explanation and the confusion that caused it.', icon: '⚠' },
  { id: 'subject', label: 'Subject-specific study', hint: 'Stay inside one subject or one unit.', icon: '▦' },
  { id: 'mixed', label: 'Mixed Semester 1 review', hint: 'Everything across HSS2011, ABCT2326, the radiation-science set and DSAI1202.', icon: '⇄' },
];
