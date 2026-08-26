/*
 * Radiography Study Studio — study data layer
 *
 * Scope rule for this file:
 *   Every factual claim carries a sourceRefs entry pointing at a file that
 *   exists in the supplied source folders. Nothing here comes from internet
 *   research, generic textbook expansion or invented syllabus content.
 *   App-authored memory aids are allowed but are tagged authored:true so the
 *   source dialog can say "app-authored memory aid, not a source claim".
 *
 * anatomy-data.js stays as the 3D model adapter + canonical bone records.
 * This file is the broader learning layer that wraps it.
 */
import { ANATOMY_DATABASE, REGIONS, getAnatomy } from './anatomy-data.js';

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
};

/*
 * kind:
 *   'primary'    teaching material issued by the subject (lecture / manual / slides)
 *   'assessment' past papers, exercises, answer keys, question banks
 *   'student'    student-produced coursework — evidence of topics, NOT authoritative
 *   'admin'      schedules, rubrics, subject description forms
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

  /* ---------------- ABCT2326 Human Physiology ---------------- */
  'phys.ebook': { file: 'Fundamentals of Anatomy and Physiology_eBook.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology', kind: 'primary', note: 'Martini, Nath & Bartholomew (2015), 10th ed. — the core textbook named on the lecture-note title slides.' },
  'phys.qbank': { file: 'Fundamentals of Anatomy and Physiology_Question Bank.pdf', subject: 'ABCT2326', root: 'y1s1', folder: '(subject root)', kind: 'assessment' },
  'phys.1': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/1. Cells and Body Organization', kind: 'primary' },
  'phys.2': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/2. Cardiovascular System', kind: 'primary' },
  'phys.3': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/3. Respiratory System', kind: 'primary' },
  'phys.4': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/4. Digestive System', kind: 'primary' },
  'phys.5': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/5. Renal System', kind: 'primary' },
  'phys.6': { file: 'Lecture notes.ppt', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/6. Reproductive System', kind: 'primary', note: 'Legacy binary .ppt, not readable offline. Superseded here by Lec6_Reproduction.pdf, which is the same lecture in a readable form.' },
  'phys.6.pdf': { file: 'Lec6_Reproduction.pdf', subject: 'ABCT2326', root: 'gold', folder: 'Sem 1 (Year 1)/Human Physiology/Lecture', kind: 'primary', note: 'Readable copy of the reproductive-system lecture, from the 2020/21 set.' },
  'phys.2.supp': { file: '2. Cardiovascular System_Supplementary Information.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/2. Cardiovascular System', kind: 'primary' },
  'phys.7': { file: 'Lecture notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/7. Endocrine System', kind: 'primary' },
  'phys.8': { file: 'Lecture notes.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/8. Nervous System', kind: 'primary' },
  'phys.9': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/9. Musculoskeletal System', kind: 'primary' },
  'phys.10': { file: 'Lecture notes.pptx', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/10. Immune System', kind: 'primary' },
  'phys.tut': { file: 'Tutorial answer.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/<system folder>', kind: 'assessment', note: 'One per system folder (1–10).' },
  'phys.extra': { file: 'Extra exercise.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology/<system folder>', kind: 'assessment', note: 'One per system folder (1–10).' },
  'phys.qblank': { file: 'question blank/Chapter 1–29.pdf', subject: 'ABCT2326', root: 'green', folder: 'year 1 sem 1/ABCT2326 Human Physiology', kind: 'assessment', note: '29 chapter-level question sets.' },
  'phys.sdf': { file: 'Subject Description Form.pdf', subject: 'ABCT2326', root: 'y1s1', folder: 'ABCT2326 Human Physiology', kind: 'admin' },

  /* ---------------- HTI17101 Exploring Radiography (stand-in for HTI17103) ---------------- */
  'hti.w1a': { file: 'Week 1 About the Subject.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w1b': { file: 'Week 1 Radiographer To Be.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w2': { file: 'Week 2 Medical Imaging Modalities and Equipment.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w3': { file: 'Week 3 Introduction to Radiation Therapy.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w5': { file: 'Week 5 Radiographer Role Extension.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.w6': { file: 'Week 6 Basic Radioprotection and Cancers.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography/Lecture notes', kind: 'primary' },
  'hti.mi': { file: 'ER MI Worksheet 2016-17 MI.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Assignment', kind: 'assessment' },
  'hti.rt': { file: 'ER RT Worksheet 2016-17_SL.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Assignment', kind: 'assessment' },
  'hti.rni': { file: 'RADIONUCLIDE IMAGING  (RNI).pptx', subject: 'HTI17103', root: 'greengrp', folder: 'Exploring Radiography', kind: 'student' },
  'hti.pres': { file: 'Guidelines and Topics for Presentations 2018-19.pdf', subject: 'HTI17103', root: 'radio', folder: 'Yr1 Sem1 Radiography/HTI17101 Exploring Radiography/Class Information', kind: 'admin' },
  'hti.sdf': { file: 'Subject Desciption Form.pdf', subject: 'HTI17103', root: 'y1s1', folder: 'HTI17101 Exploring Radiography', kind: 'admin' },

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
      { id: 'hss.term', label: 'Anatomical orientation & terminology', note: 'Module 0 foundation' },
      { id: 'hss.osteo', label: 'Osteology — bones, landmarks, articulations', note: 'Interactive 3D skeleton', hasStudio: true },
      { id: 'hss.joints', label: 'Joints & movements' },
      { id: 'hss.m1', label: 'Module 1 — Thorax' },
      { id: 'hss.m2', label: 'Module 2 — Neuroanatomy' },
      { id: 'hss.m3', label: 'Module 3 — Abdomen & pelvis' },
      { id: 'hss.m4', label: 'Module 4 — Musculoskeletal system' },
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
    coverage: 'none',
    blurb: 'No verified DSAI1202 materials were found in the supplied source folders.',
    units: [],
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
  { id: 'confidence', label: 'Confidence', hint: 'How sure you were, checked against whether you were right.' },
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
  { id: 'mixed', label: 'Mixed Semester 1 review', hint: 'Everything across HSS2011, ABCT2326 and the radiation-science set.', icon: '⇄' },
];

/* ------------------------------------------------------------------ *
 * Study items — HSS2011 Human Anatomy
 * ------------------------------------------------------------------ */

const HSS_TERMINOLOGY = [
  {
    id: 'hss2011-terminology-anatomical-position',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Anatomical position',
    tags: ['terminology', 'foundation'],
    lesson: {
      explanation: 'Anatomists standardise how the body is viewed, the way a map is always drawn with north at the top. The anatomical position is the body standing upright, feet at shoulder width and parallel, toes forward, upper limbs held out to each side with the palms facing forward. Every directional term is used as if the body were in this position, whatever position it is actually in.',
      keyFacts: [
        'Upright stance, feet shoulder width apart and parallel, toes pointing forward.',
        'Upper limbs out to each side, palms facing forward.',
        'Terms are applied as if the body were in this position regardless of its real orientation.',
        'A scar in the "anterior carpal region" is therefore on the palm side of the wrist.',
      ],
      prerequisites: [],
      examples: ['A patient lying face down is still described using anterior and posterior as defined in the anatomical position.'],
    },
    memory: {
      visualCue: 'Picture a person standing at an ID checkpoint: feet planted, arms slightly out, palms shown to the camera. That palms-forward detail is the whole trick.',
      comparison: 'Palms forward is what separates anatomical position from standing at ease. Palms-back would swap radius and ulna in your mental picture.',
      teachBack: 'Say out loud why the standard position exists at all — it removes ambiguity so "above the wrist" cannot mean two different places.',
    },
    practice: [
      { type: 'mcq', prompt: 'In the anatomical position, where do the palms face?', options: ['Backward, against the thighs', 'Forward', 'Medially, facing each other', 'Downward'], answer: 1,
        explanation: 'The source describes the upper limbs held out to each side with the palms of the hands facing forward. This is the detail people most often get wrong.' },
      { type: 'cloze', prompt: 'A scar described as being in the anterior carpal region is on the ______ side of the wrist.', accept: ['palm', 'palmar', 'anterior', 'front'],
        explanation: 'Because the palms face forward in the anatomical position, anterior at the wrist means the palm side.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiographer writes "lesion anterior to the elbow" for a patient who was lying prone during the scan. Does anterior mean toward the ceiling or toward the couch?',
        model: 'Toward the couch. Directional terms are always applied as if the body were in the anatomical position, not in the position the patient happened to be in.',
        rubric: ['Names the anatomical position as the fixed reference', 'Concludes anterior is the front of the body, i.e. toward the couch when prone'] },
    ],
    commonMistakes: [
      'Drawing the anatomical position with palms facing backward — that is standing at ease, and it flips your mental map of the forearm bones.',
      'Re-defining anterior and posterior to match how the patient is actually lying.',
    ],
    sourceRefs: [{ ref: 'hss.orientation', location: 'Section "Anatomical Position"' }, { ref: 'hss.m0.1718', location: 'L1 p4 "The anatomical position"' }],
  },
  {
    id: 'hss2011-terminology-regional-systemic',
    subject: 'HSS2011', unit: 'hss.term', type: 'comparison',
    title: 'Regional vs systemic anatomy',
    tags: ['terminology', 'foundation'],
    lesson: {
      explanation: 'There are two general approaches to studying the body. Regional anatomy studies the interrelationships of all the structures in one body region, such as the abdomen, so you can see how muscles, nerves and vessels work together there. Systemic anatomy studies the structures making up one discrete body system that shares a function, such as all the skeletal muscles. HSS2011 uses both approaches, which is why the modules mix system lectures with "regional anatomy of" lectures.',
      keyFacts: [
        'Regional anatomy = one region, all systems in it.',
        'Systemic anatomy = one system, wherever it goes in the body.',
        'The subject is taught with a systemic and regional approach together.',
      ],
      prerequisites: ['hss2011-terminology-anatomical-position'],
      examples: ['Module 1.1 and 1.2 are systemic (cardiovascular, respiratory); Module 1.3 Regional Anatomy of the Thorax is regional.'],
    },
    memory: {
      chunking: 'Region = a place. System = a job. Ask "where am I standing?" versus "what job am I following?"',
      comparison: 'Regional anatomy is a street map of one neighbourhood; systemic anatomy is the whole water-pipe network across the city.',
    },
    practice: [
      { type: 'mcq', prompt: 'Studying every skeletal muscle in the body as one group is an example of which approach?', options: ['Regional anatomy', 'Systemic anatomy', 'Surface anatomy', 'Comparative anatomy'], answer: 1,
        explanation: 'A systemic anatomical study of the muscular system would consider all of the skeletal muscles of the body — one system, followed wherever it goes.' },
      { type: 'typed', prompt: 'Which approach studies the interrelationships of all structures within one body region?', accept: ['regional', 'regional anatomy'],
        explanation: 'Regional anatomy studies all structures in a specific region, such as the abdomen, and how they work together.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Module 1.3 is titled "Regional Anatomy of the Thorax" and follows two systemic lectures. What does the module ordering tell you about how you are meant to revise?',
        model: 'You learn the cardiovascular and respiratory systems separately first, then put them back into the thoracic cavity together and study their spatial relationships. Revision should therefore end with relationships between structures, not with lists.',
        rubric: ['Recognises systemic lectures come first', 'States the regional lecture reassembles them in one cavity', 'Mentions spatial relationships'] },
    ],
    commonMistakes: ['Treating the "regional anatomy of" lectures as revision of the system lectures rather than as a new relational layer.'],
    sourceRefs: [{ ref: 'hss.orientation', location: 'Opening section' }, { ref: 'hss.manual1920', location: 'Subject Description Form, Objectives' }],
  },
  {
    id: 'hss2011-terminology-directional-pairs',
    subject: 'HSS2011', unit: 'hss.term', type: 'matching',
    title: 'The ten directional terms',
    tags: ['terminology', 'high-yield'],
    lesson: {
      explanation: 'Ten directional terms carry almost all of the precision in anatomical description. They work in opposed pairs, and each one comes with a worked example in the source. Anterior/ventral is toward the front; posterior/dorsal toward the back; superior/cranial above; inferior/caudal below; lateral toward the side; medial toward the middle; proximal nearer the point of attachment in a limb; distal further from it; superficial closer to the surface; deep further from the surface.',
      keyFacts: [
        'Anterior (ventral) — the toes are anterior to the foot.',
        'Posterior (dorsal) — the popliteus is posterior to the patella.',
        'Superior (cranial) — the orbits are superior to the oris.',
        'Inferior (caudal) — the pelvis is inferior to the abdomen.',
        'Lateral — the thumb (pollex) is lateral to the digits.',
        'Medial — the hallux is the medial toe.',
        'Proximal — the brachium is proximal to the antebrachium.',
        'Distal — the crus is distal to the femur.',
        'Superficial — the skin is superficial to the bones.',
        'Deep — the brain is deep to the skull.',
      ],
      prerequisites: ['hss2011-terminology-anatomical-position'],
      examples: [],
    },
    memory: {
      firstLetter: 'Five pairs, five questions: Front/Back, Up/Down, Side/Middle, Near/Far, Shallow/Deep.',
      chunking: 'Learn them as five opposed pairs, never as ten separate words. Half the exam errors are picking the partner of the right answer.',
      wordOrigin: 'Proximal shares its root with "proximity" — nearness to the attachment. Distal shares its root with "distance".',
      location: 'Proximal and distal only make sense inside a limb, measured from where the limb joins the trunk. If there is no limb, the pair does not apply.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each term to its worked example from the source.',
        pairs: [['Proximal', 'The brachium is ___ to the antebrachium'], ['Lateral', 'The thumb (pollex) is ___ to the digits'], ['Deep', 'The brain is ___ to the skull'], ['Inferior', 'The pelvis is ___ to the abdomen']],
        explanation: 'These are the exact examples given in the anatomical orientation and terminologies handout.' },
      { type: 'mcq', prompt: 'The sternal region is __________ to the scapular region.', options: ['Superior', 'Lateral', 'Anterior', 'Proximal'], answer: 2,
        explanation: 'Model answer C. The sternum is on the front of the chest and the scapula on the back, so the relationship is anterior, not superior or proximal. Proximal and distal are limb terms and do not apply between two trunk regions.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 1' } },
      { type: 'mcq', prompt: 'The thumb is __________ to the index finger.', options: ['Superior', 'Lateral', 'Anterior', 'Proximal'], answer: 1,
        explanation: 'Model answer B. In the anatomical position the palms face forward, which puts the thumb on the outer (radial) side — lateral.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 2' } },
      { type: 'typed', prompt: 'Which term describes a position in a limb nearer to the point of attachment to the trunk?', accept: ['proximal'],
        explanation: 'Proximal. Its partner, distal, is further from the attachment.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A report says "fracture of the distal radius". Without looking anything up, which end of the forearm bone is broken and why?',
        model: 'The wrist end. Distal means further from the point of attachment to the trunk, so on the radius it is the end away from the elbow — the wrist end.',
        rubric: ['Identifies the wrist end', 'Justifies it from the definition of distal rather than from memory of the injury'] },
    ],
    commonMistakes: [
      'Using proximal or distal between two trunk regions — those two terms only work along a limb.',
      'Forgetting that palms-forward is what makes the thumb lateral; with palms back it would look medial.',
      'Swapping a term for its own partner under time pressure, which is the single most common terminology error.',
    ],
    sourceRefs: [{ ref: 'hss.orientation', location: 'Section "Directional Terms"' }, { ref: 'hss.vocab', location: 'Glossary entries for each term' }],
  },
  {
    id: 'hss2011-terminology-planes',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body planes and what each one separates',
    tags: ['terminology', 'high-yield'],
    lesson: {
      explanation: 'Three standard planes cut the body, and each plane is tied to one pair of directional terms. The coronal (frontal) plane separates anterior from posterior. The transverse (horizontal) plane separates superior from inferior. The mid-sagittal (median) plane separates left from right. Naming the plane and naming the pair it creates is the fastest way to keep them straight.',
      keyFacts: [
        'Coronal / frontal plane → anterior vs posterior.',
        'Transverse / horizontal plane → superior vs inferior.',
        'Mid-sagittal / median plane → left vs right.',
        'The glossary lists these as "Frontal/Coronal Plane" and "Mid-sagittal/Median Plane", so either name is acceptable.',
      ],
      prerequisites: ['hss2011-terminology-directional-pairs'],
      examples: [],
    },
    memory: {
      chunking: 'Do not memorise three planes; memorise three splits. Front/back, top/bottom, left/right. The plane name is just the label on the split.',
      visualCue: 'Coronal is a crown sitting on the head, so the cut runs down through the ears — everything in front, everything behind.',
      wordOrigin: 'Sagittal comes from the Latin for arrow: an arrow entering the back of the skull travels along the midline, splitting left from right.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each plane to the pair of terms it creates.',
        pairs: [['Coronal / frontal plane', 'Anterior vs posterior'], ['Transverse / horizontal plane', 'Superior vs inferior'], ['Mid-sagittal / median plane', 'Left vs right']],
        explanation: 'Each plane on the Module 0 slide is annotated with exactly the pair of directional terms it separates.' },
      { type: 'typed', prompt: 'Which plane divides the body into left and right halves?', accept: ['mid-sagittal', 'midsagittal', 'median', 'mid sagittal', 'sagittal'],
        explanation: 'The mid-sagittal or median plane. The glossary gives both names for the same plane.' },
      { type: 'cloze', prompt: 'A slice separating superior from inferior is taken in the ______ plane.', accept: ['transverse', 'horizontal', 'transverse/horizontal'],
        explanation: 'The transverse (horizontal) plane creates superior and inferior parts.' },
    ],
    application: [
      { type: 'scenario', prompt: 'You need a view that shows how far forward a structure sits relative to another. Which plane do you want, and which pair of terms will you be using to describe the result?',
        model: 'A coronal (frontal) plane view, described with anterior and posterior. That plane is the one that separates front from back, so it is the one that lets you talk about how far forward something lies.',
        rubric: ['Chooses coronal / frontal', 'Names anterior and posterior as the resulting pair'] },
    ],
    commonMistakes: [
      'Mixing coronal and sagittal because both are vertical cuts — anchor each one to the pair of terms it produces instead of to its orientation.',
      'Assuming only one name is correct; the glossary lists frontal/coronal and mid-sagittal/median as paired names.',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p4 "The anatomical position" — plane annotations' }, { ref: 'hss.vocab', location: 'Glossary: Frontal/Coronal Plane; Mid-sagittal/Median Plane' }],
  },
  {
    id: 'hss2011-terminology-cavities-regions',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body cavities, regions and quadrants',
    tags: ['terminology'],
    lesson: {
      explanation: 'Module 0 introduces the body cavities alongside the directional references. The glossary fixes which cavity and surface-region names are examinable: the thoracic cavity with the pericardial and pleural cavities inside it, the abdominal and pelvic cavities which together form the abdominopelvic cavity, and the peritoneal cavity. Surface description uses either the four-quadrant scheme or the nine-region scheme, and the glossary lists both.',
      keyFacts: [
        'Cavities named in the glossary: thoracic, pericardial, pleural, abdominal, pelvic, abdominopelvic, peritoneal, oral, medullary, scrotal.',
        'Four quadrants: right upper, left upper, right lower, left lower.',
        'Nine regions named in the glossary include epigastric, hypogastric, right and left hypochondriac, right and left lumbar, and right and left inguinal.',
        'The glossary also lists the transtubercular plane/line, one of the lines used to build the nine-region grid.',
      ],
      prerequisites: ['hss2011-terminology-planes'],
      examples: [],
    },
    memory: {
      chunking: 'Two schemes, not one. Quadrants are four boxes for quick clinical shorthand; regions are a nine-box grid for precise description.',
      location: 'Build the nine-box grid top to bottom: hypochondriac–epigastric–hypochondriac, then lumbar–umbilical–lumbar, then inguinal–hypogastric–inguinal. Middle column runs down the midline.',
      wordOrigin: 'Hypochondriac literally means "below the cartilage" — under the costal cartilages, nothing to do with the modern everyday meaning.',
    },
    practice: [
      { type: 'typed', prompt: 'Which single name covers the abdominal and pelvic cavities together?', accept: ['abdominopelvic', 'abdominopelvic cavity'],
        explanation: 'The glossary lists Abdominopelvic Cavity as its own entry alongside the separate abdominal and pelvic cavities.' },
      { type: 'mcq', prompt: 'Which of these is listed in the glossary as a cavity found inside the thoracic cavity?', options: ['Peritoneal cavity', 'Pericardial cavity', 'Scrotal cavity', 'Medullary cavity'], answer: 1,
        explanation: 'The pericardial cavity surrounds the heart and lies within the thorax. The peritoneal cavity is abdominal, the scrotal cavity is in the perineum, and the medullary cavity is inside a long bone.' },
      { type: 'cloze', prompt: 'The region directly above the umbilical region in the nine-region scheme is the ______ region.', accept: ['epigastric'],
        explanation: 'Epigastric sits in the top middle box, between the two hypochondriac regions.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A note records pain in the right hypochondriac region. Describe that location using the quadrant scheme instead, and say what you lose in the translation.',
        model: 'It falls in the right upper quadrant. You lose height information: the right upper quadrant also contains the right lumbar territory closer to the midline, so the quadrant name is a coarser description than the region name.',
        rubric: ['Maps right hypochondriac to right upper quadrant', 'Notes the quadrant scheme is less precise'] },
    ],
    commonMistakes: [
      'Treating quadrants and regions as the same scheme — they are two different grids over the same abdomen.',
      'Reading "hypochondriac" with its everyday meaning instead of "below the costal cartilage".',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p5 "Body cavities"; L1 p6–7 "Directional references"' }, { ref: 'hss.vocab', location: 'Glossary: cavity, region and quadrant entries' }],
  },
];

const HSS_OSTEOLOGY = [
  {
    id: 'hss2011-osteo-axial-appendicular',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Axial and appendicular skeleton',
    tags: ['osteology', 'high-yield'], boneRefs: ['cranium', 'mandible', 'cervical', 'thoracic', 'lumbar', 'sacrum', 'coccyx', 'sternum', 'ribs'],
    lesson: {
      explanation: 'The adult skeleton has 206 bones, split into two divisions. The axial skeleton is the central column: the skull, the vertebrae, the ribs and the sternum. The appendicular skeleton is everything hanging off it: the shoulder girdle, the upper limbs, the pelvic girdle and the lower limbs.',
      keyFacts: [
        '206 bones in the adult skeleton.',
        'Axial skeleton: skull, vertebrae, ribs, sternum.',
        'Appendicular skeleton: shoulder girdle, upper limb, pelvic girdle, lower limb.',
        'The girdles belong to the appendicular division even though they attach onto the axial skeleton.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      wordOrigin: 'Axial from axis — the central line you spin around. Appendicular from appendage — the things appended to it.',
      chunking: 'Axial = the mast. Appendicular = the sails and the rigging hung off it.',
      comparison: 'The commonest slip is filing the clavicle and scapula as axial because they sit on the trunk. They are appendicular: the girdle exists to carry the limb.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of these belongs to the appendicular skeleton?', options: ['Sternum', 'Scapula', 'Thoracic vertebrae', 'Ribs'], answer: 1,
        explanation: 'The scapula is part of the shoulder girdle, which the lecture lists under the appendicular skeleton. The sternum, thoracic vertebrae and ribs are all axial.' },
      { type: 'typed', prompt: 'How many bones are in the adult skeleton?', accept: ['206'],
        explanation: 'The lecture states 206 bones in the adult skeleton.' },
      { type: 'matching', prompt: 'Sort each into its division.',
        pairs: [['Skull', 'Axial'], ['Ribs', 'Axial'], ['Pelvic girdle', 'Appendicular'], ['Upper limb', 'Appendicular']],
        explanation: 'Axial is the central column — skull, vertebrae, ribs, sternum. Everything else, including both girdles, is appendicular.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Someone argues the pelvis must be axial because it carries body weight and sits in the trunk. Correct them using the definition.',
        model: 'Weight-bearing is not the criterion. The pelvic girdle is classed as appendicular because its role is to attach the lower limb to the axial skeleton. The sacrum, which is a vertebral structure, is the axial part it attaches to.',
        rubric: ['Rejects weight-bearing as the criterion', 'Names the girdle role of attaching a limb', 'Distinguishes sacrum (axial) from hip bone (appendicular)'] },
    ],
    commonMistakes: [
      'Filing the clavicle, scapula or hip bone as axial because they sit on the trunk.',
      'Forgetting the sacrum is axial while the hip bone it joins is appendicular.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slide "Bones" — 206 in adult skeleton' }, { ref: 'hss.m0.1718', location: 'L1 p13–14 Axial and Appendicular Skeleton' }, { ref: 'hss.vocab', location: 'Glossary: Axial Skeleton; Appendicular Skeleton' }],
  },
  {
    id: 'hss2011-osteo-bone-shapes',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Classification of bones by shape',
    tags: ['osteology', 'high-yield'],
    lesson: {
      explanation: 'Bones are classified by shape. Long bones are tubular, found in the limbs, and serve as levers for muscles; they have a shaft and two expanded ends. Short bones are cubical — the carpus and tarsus — and are cancellous bone inside a thin compact shell. Flat bones are built like sandwiches, two layers of compact bone with cancellous bone between. Irregular bones have a mixed shape and include some skull bones, the vertebrae and the hip bones. The lecture adds two special categories: pneumatic bones, where cancellous tissue has been absorbed and an air sinus is present, such as the frontal and sphenoidal sinuses; and sesamoid bones, nodules that develop inside tendons and alter the direction of pull, the patella being the example.',
      keyFacts: [
        'Long — tubular, in limbs, levers for muscles, shaft plus two expanded ends.',
        'Short — cubical; carpus and tarsus.',
        'Flat — two compact layers sandwiching cancellous bone.',
        'Irregular — some skull bones, vertebrae, hip bones.',
        'Pneumatic — contains an air sinus, e.g. frontal sinus, sphenoidal sinus.',
        'Sesamoid — develops in a tendon and alters the direction of pull, e.g. patella.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      firstLetter: 'The four main shapes are Long, Short, Flat, Irregular — L-S-F-I. Then two extras the lecture adds: Pneumatic and Sesamoid.',
      visualCue: 'Flat bone as a sandwich is the lecture’s own image: two slices of compact bread, spongy filling.',
      comparison: 'A vertebra is irregular, not flat and not short. It is the classic trap: it looks blocky, so people answer short.',
    },
    practice: [
      { type: 'mcq', prompt: 'A thoracic vertebra is an example of what type of bone?', options: ['Long', 'Flat', 'Irregular', 'Short'], answer: 2,
        explanation: 'Model answer C. The lecture lists vertebrae under irregular bones, alongside some skull bones and the hip bones. Short bones are the cubical carpals and tarsals.',
        src: { ref: 'hss.revans', location: 'Module 4.1, MCQ 2' } },
      { type: 'matching', prompt: 'Match each shape to the example the lecture gives.',
        pairs: [['Short bone', 'Carpus and tarsus'], ['Sesamoid bone', 'Patella'], ['Pneumatic bone', 'Frontal sinus'], ['Irregular bone', 'Vertebrae']],
        explanation: 'These are the worked examples from the bone-shape slides.' },
      { type: 'typed', prompt: 'What is the name for a nodule of bone that develops inside a tendon and alters the direction of its pull?', accept: ['sesamoid', 'sesamoid bone'],
        explanation: 'A sesamoid bone. The patella is the example given.' },
    ],
    application: [
      { type: 'scenario', prompt: 'You are told a bone is cancellous inside with only a thin compact shell, and it is cubical. Which two shape categories could that describe, and how do you decide between them?',
        model: 'Short bones are described exactly that way — cubical, cancellous inside a thin compact layer. Irregular bones also have cancellous bone, marrow and a thin compact layer, but they are irregular or mixed in shape rather than cubical. Shape is the deciding feature, so cubical points to short.',
        rubric: ['Names short and irregular as the candidates', 'Uses shape as the discriminator'] },
    ],
    commonMistakes: [
      'Calling a vertebra a short bone because it looks blocky — it is irregular.',
      'Forgetting pneumatic and sesamoid, which the lecture treats as their own categories.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides "Shape of bones", "Short bones", "Flat bones", "Irregular bones", "Pneumatic bones", "Sesamoid bones"' }],
  },
  {
    id: 'hss2011-osteo-long-bone-structure',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Structure of a long bone',
    tags: ['osteology', 'high-yield'],
    lesson: {
      explanation: 'A long bone runs diaphysis, metaphysis, epiphysis from the centre outward. The diaphysis is the central region; the metaphysis is the recently developed end next to the epiphyseal cartilage; the epiphysis is the bone end. Covering the outer surface of the shaft is the periosteum, whose inner layer is osteogenic — able to differentiate into osteoblasts — and which is richly supplied with capillaries and nerves. Bone itself comes in two forms: compact bone, a dense solid mass forming the outer surface layer of all bones, and cancellous or spongy bone with larger cavities, supported by trabeculae. In the shaft, compact bone surrounds cancellous bone around a medullary cavity containing bone marrow. The bone end is spongy bone under a thin layer of compact bone.',
      keyFacts: [
        'Diaphysis = central region; metaphysis = recently developed end next to the epiphyseal cartilage; epiphysis = bone end.',
        'Periosteum covers the outer surface of the shaft; inner layer is osteogenic and richly supplied with capillaries and nerve.',
        'Compact bone: dense solid mass, forms the outer surface layer of all bones.',
        'Cancellous (spongy) bone: larger cavities, supported by trabeculae.',
        'Medullary cavity in the shaft contains bone marrow.',
        'Bone is nourished through small vessels in the periosteum, plus large nutrient arteries entering the shaft through the nutrient foramen.',
      ],
      prerequisites: ['hss2011-osteo-bone-shapes'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Epi- means upon, so epiphysis is the growth upon the end. Dia- means through, so diaphysis is the part running through the middle. Meta- means after, and the metaphysis is the part that came after, next to the growth plate.',
      sequence: 'Centre outward: diaphysis → metaphysis → epiphysis. Three words, one direction.',
      chunking: 'Two bone forms, two locations: compact on the outside of everything, cancellous on the inside and at the ends.',
    },
    practice: [
      { type: 'mcq', prompt: 'The connective tissue covering the outer surface of a bone is the _______.', options: ['Matrix', 'Osteon', 'Periosteum', 'Endosteum'], answer: 2,
        explanation: 'Model answer C. The periosteum covers the outer surface of the shaft; the endosteum lines internal surfaces instead.',
        src: { ref: 'hss.revans', location: 'Module 4.1, MCQ 1' } },
      { type: 'sequence', prompt: 'Order the regions of a long bone from the centre outward.', items: ['Diaphysis', 'Metaphysis', 'Epiphysis'],
        explanation: 'The diaphysis is the central region, the metaphysis the recently developed end adjacent to the epiphyseal cartilage, and the epiphysis the bone end.' },
      { type: 'cloze', prompt: 'There are two types of bone. ______ bone covers bone surfaces; ______ bone is located internally and gives strength with minimum weight, and its ______ develop along the bone’s lines of stress.', accept: ['compact; spongy; trabeculae', 'compact spongy trabeculae', 'compact, cancellous, trabeculae', 'compact; cancellous; trabeculae'],
        explanation: 'Model answers: compact, then spongy/cancellous, then trabeculae. The trabeculae are not randomly arranged but follow the lines of stress.',
        src: { ref: 'hss.revans', location: 'Module 4.1, Fill-in-blanks 1–3' } },
      { type: 'typed', prompt: 'Large nutrient arteries enter the shaft of a long bone through which opening?', accept: ['nutrient foramen'],
        explanation: 'The nutrient foramen. Smaller vessels in the periosteum supply the rest.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does stripping the periosteum off a bone during surgery matter more than the name suggests?',
        model: 'The periosteum is not just a wrapper. Its inner layer is osteogenic, able to differentiate into osteoblasts, and it is richly furnished with capillaries and nerves. Removing it removes both a blood supply route and the cell layer that lays down new bone.',
        rubric: ['Names the osteogenic inner layer', 'Names the capillary supply', 'Links both to healing'] },
    ],
    commonMistakes: [
      'Confusing periosteum (outer surface) with endosteum (internal surfaces) — this is the exact distractor used in the revision exercise.',
      'Describing trabeculae as randomly arranged; the source is explicit that they develop along the lines of stress.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides "Long bone", "Long bone — structures", "Structures", "Blood supply to bone"' }, { ref: 'hss.revans', location: 'Module 4.1 answers' }],
  },
  {
    id: 'hss2011-osteo-bone-functions',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'explain',
    title: 'Functions of bone',
    tags: ['osteology'],
    lesson: {
      explanation: 'The lecture gives five functions of bone: a supporting framework; levers for muscles; protection for visceral organs such as brain, spinal cord, heart, lungs, liver and bladder; bone marrow, which produces red blood cells; and a storehouse for calcium and phosphates.',
      keyFacts: [
        'Supporting framework.',
        'Levers for muscles.',
        'Protection of visceral organs — brain, spinal cord, heart, lungs, liver, bladder.',
        'Bone marrow produces red blood cells.',
        'Storehouse for calcium and phosphates.',
      ],
      prerequisites: ['hss2011-osteo-bone-shapes'],
      examples: [],
    },
    memory: {
      firstLetter: 'Support, Levers, Protection, Production, Storage — the two P-words are the ones people drop.',
      chunking: 'Three mechanical jobs (support, levers, protection) and two chemical/biological ones (marrow, mineral store).',
    },
    practice: [
      { type: 'typed', prompt: 'Name the two non-mechanical functions of bone given in the lecture.', accept: ['bone marrow and calcium storage', 'marrow, calcium', 'red blood cell production and mineral storage', 'marrow and storehouse'],
        explanation: 'Bone marrow producing red blood cells, and acting as a storehouse for calcium and phosphates. The other three functions are mechanical.' },
      { type: 'explain', prompt: 'In your own words, why does a bone need to be both a lever and a mineral store?',
        model: 'Muscles cannot move anything without a rigid structure to pull against, so bone acts as a lever. The same mineralised matrix that gives it that rigidity is a calcium and phosphate reserve the body can draw on, so the two functions share one material.',
        rubric: ['Links rigidity to the lever role', 'Links the mineral matrix to the storage role', 'Notes the two functions share the same material'] },
    ],
    application: [
      { type: 'scenario', prompt: 'The Module 4 introduction says that without a skeleton to pull against, contracting muscle fibres could not make us sit, stand, walk or run. Which of the five functions is that sentence describing?',
        model: 'The lever function. Muscles generate force but need a rigid structure to act on; bones provide that, which is why the manual frames posture and movement as a joint achievement of muscle and skeleton.',
        rubric: ['Names the lever function', 'Explains muscles need something rigid to pull against'] },
    ],
    commonMistakes: ['Listing only the mechanical functions and forgetting marrow and mineral storage.'],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slide "Functions"' }, { ref: 'hss.manual1920', location: 'Module 4 introduction, p.41' }],
  },
  {
    id: 'hss2011-osteo-vertebra-parts',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'diagram',
    title: 'General structure of a vertebra',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'thoracic', 'lumbar'],
    lesson: {
      explanation: 'Every typical vertebra shares the same parts. The vertebral body sits anteriorly and is the primary weight-bearing component of the spine. Behind it the vertebral arch, built from the pedicles and the laminae, encloses the vertebral foramen — a hole that forms the vertebral canal for the passage of the spinal cord. Projecting from the arch are the spinous process posteriorly, the transverse processes laterally, and the superior and inferior articular processes.',
      keyFacts: [
        'Vertebral body — anterior, primary weight-bearing component.',
        'Vertebral foramen — forms the vertebral canal for the spinal cord.',
        'Vertebral arch = pedicle + lamina.',
        'Spinous process — posterior projection.',
        'Transverse process — lateral projection.',
        'Superior and inferior articular processes form the facet joints.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      location: 'Walk the ring: body in front, pedicle out from the body, lamina closing the back, spinous process sticking out where you can feel it through the skin.',
      chunking: 'Pedicle then lamina, front to back. Pedicle is the stalk, lamina is the plate — a stalk always comes before the plate it carries.',
      comparison: 'Vertebral foramen is the hole for the spinal cord; the intervertebral foramen between two vertebrae is where a spinal nerve exits. Different hole, different traffic.',
    },
    practice: [
      { type: 'diagram', prompt: 'Label the parts of a typical vertebra, superior view.', diagram: 'vertebra',
        labels: [
          { id: 'body', label: 'Vertebral body' },
          { id: 'foramen', label: 'Vertebral foramen' },
          { id: 'pedicle', label: 'Pedicle' },
          { id: 'lamina', label: 'Lamina' },
          { id: 'transverse', label: 'Transverse process' },
          { id: 'spinous', label: 'Spinous process' },
          { id: 'sap', label: 'Superior articular facet' },
        ],
        explanation: 'These are the labels used on the Module 0 vertebra slide and repeated in the Module 4 labelling answers (B1 vertebral foramen, B2 pedicle, B3 transverse process, B4 spinous process, B5 lamina, B6 superior articular facet).',
        src: { ref: 'hss.revans', location: 'More exercises, Module 4, labels B1–B6' } },
      { type: 'typed', prompt: 'Which part of a vertebra is the primary weight-bearing component?', accept: ['vertebral body', 'body'],
        explanation: 'The vertebral body, described on the slide as serving as the primary weight-bearing component of the spine.' },
      { type: 'mcq', prompt: 'The vertebral foramen exists to allow passage of what?', options: ['The spinal nerve root', 'The vertebral artery', 'The spinal cord', 'The intervertebral disc'], answer: 2,
        explanation: 'The vertebral foramen forms the vertebral canal for the passage of the spinal cord. The vertebral artery runs in the transverse foramina of the cervical vertebrae, which is a different opening.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A cervical vertebra has an extra pair of holes that a lumbar vertebra does not. What are they for?',
        model: 'They are the transverse foramina, and the vertebral arteries pass through them. That is a cervical-only feature; the lumbar transverse processes have no such opening.',
        rubric: ['Names the transverse foramina', 'States the vertebral arteries pass through them', 'Identifies it as cervical-specific'] },
    ],
    commonMistakes: [
      'Swapping pedicle and lamina — the pedicle is the stalk from the body, the lamina is the plate closing the arch behind.',
      'Confusing the vertebral foramen (spinal cord) with the intervertebral foramen (spinal nerve) and the transverse foramen (vertebral artery).',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p21 "General structures of a vertebra"; L1 p28 cervical vertebrae' }, { ref: 'hss.revans', location: 'More exercises, Module 4, labels B1–B6' }],
  },
  {
    id: 'hss2011-osteo-vertebral-column',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'sequence',
    title: 'Vertebral column — regions and curvatures',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'thoracic', 'lumbar', 'sacrum', 'coccyx'],
    lesson: {
      explanation: 'The vertebral column runs cervical C1–C7, thoracic T1–T12, lumbar L1–L5, then the sacrum (S1–S5 fused) and the coccyx (Co1–Co4 fused). It carries four curvatures. The primary curvatures — thoracic and pelvic — are concave anteriorly and develop during the embryonic stage. The secondary curvatures — cervical and lumbar — are concave posteriorly and develop after birth.',
      keyFacts: [
        'C1–C7 cervical, T1–T12 thoracic, L1–L5 lumbar.',
        'Sacrum: S1–S5 fused. Coccyx: Co1–Co4 fused.',
        'Primary curvatures (thoracic, pelvic) — concave anteriorly, present from the embryonic stage.',
        'Secondary curvatures (cervical, lumbar) — concave posteriorly, developed after birth.',
      ],
      prerequisites: ['hss2011-osteo-vertebra-parts'],
      examples: [],
    },
    memory: {
      mnemonic: 'Breakfast at 7, lunch at 12, dinner at 5 — cervical 7, thoracic 12, lumbar 5.',
      chunking: 'Primary curves are the ones you were born with and they stay concave anteriorly. Secondary curves arrive with lifting your head and with walking, and they curve the other way.',
      comparison: 'Primary vs secondary is not about importance, it is about timing: embryonic versus after birth.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the regions of the vertebral column from superior to inferior.', items: ['Cervical (C1–C7)', 'Thoracic (T1–T12)', 'Lumbar (L1–L5)', 'Sacrum (S1–S5 fused)', 'Coccyx (Co1–Co4 fused)'],
        explanation: 'This is the order and the segment counts given on the Module 0 vertebral column slide.' },
      { type: 'mcq', prompt: 'Which pair are the secondary curvatures?', options: ['Thoracic and pelvic', 'Cervical and lumbar', 'Cervical and thoracic', 'Lumbar and pelvic'], answer: 1,
        explanation: 'The cervical and lumbar curvatures are secondary — concave posteriorly and developed after birth. The thoracic and pelvic curves are primary, concave anteriorly, from the embryonic stage.' },
      { type: 'cloze', prompt: '______ articulates with the inferior apex of the sacrum.', accept: ['coccyx', 'the coccyx'],
        explanation: 'Model answer: Coccyx. It is the fused Co1–Co4 remnant sitting below the sacrum.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 3' } },
    ],
    application: [
      { type: 'scenario', prompt: 'An infant’s spine looks like a single C-shaped curve. Which curvatures are present, and which are missing?',
        model: 'Only the primary curvatures — thoracic and pelvic — are present, because those develop during the embryonic stage and are concave anteriorly. The secondary cervical and lumbar curves develop after birth, so they are missing at that point.',
        rubric: ['Names thoracic and pelvic as present', 'Names cervical and lumbar as later', 'Links the difference to embryonic vs after birth'] },
    ],
    commonMistakes: [
      'Guessing the segment counts. They are fixed: 7, 12, 5.',
      'Assuming "primary" means larger or more important rather than earlier.',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p15 "Vertebral column"; L1 p16 "Curvatures"' }, { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks' }],
  },
  {
    id: 'hss2011-osteo-c1-c2',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'comparison',
    title: 'Atlas, axis and the two head movements',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'cranium'],
    lesson: {
      explanation: 'The top two cervical vertebrae are specialised and each one carries a different head movement. The atlanto-occipital joint, between the occipital condyles of the skull and the lateral masses of the atlas (C1), allows flexion and extension — the "yes" nod. The median atlanto-axial joint, between C1 and the dens of the axis (C2), allows rotation of the head — the "no" shake. The transverse ligament holds the atlas and the dens of the axis in place.',
      keyFacts: [
        'Atlanto-occipital joint (occipital condyles onto C1 lateral masses) → flexion and extension, the nod.',
        'Median atlanto-axial joint (C1 on the dens of C2) → rotation, the shake.',
        'The transverse ligament holds the atlas and the dens (odontoid process) of the axis in place.',
        'Cervical vertebrae also carry transverse foramina through which the vertebral arteries pass, and a bifid spinous process.',
      ],
      prerequisites: ['hss2011-osteo-vertebral-column'],
      examples: [],
    },
    memory: {
      mnemonic: 'Atlas held up the world on his shoulders — C1 holds up the head, and nodding is what a tired Atlas does. The axis is the pin you turn around, so C2 gives you the shake.',
      comparison: 'YES at the atlanto-occipital joint, NO at the atlanto-axial joint. If you only remember one, remember that the dens is the pivot pin and pins mean rotation.',
      wordOrigin: 'Dens is Latin for tooth; the odontoid process gets its name from the same idea, odont- meaning tooth.',
    },
    practice: [
      { type: 'mcq', prompt: 'The lateral mass of the atlas, which articulates with the occipital condyle of the skull, is the articular facet where ________ motion of the skull takes place.', options: ['Nodding', 'Shaking', 'Lateral flexion', 'Rotational'], answer: 0,
        explanation: 'Model answer A. The atlanto-occipital joint allows flexion and extension — the nod. Rotation happens one level lower, at the median atlanto-axial joint.',
        src: { ref: 'hss.revans', location: 'Module 4.2, MCQ 3' } },
      { type: 'mcq', prompt: 'Which bone articulates with the dens?', options: ['Temporal', 'Atlas', 'Occipital', 'Mandible'], answer: 1,
        explanation: 'Model answer B. The dens of the axis (C2) projects up into the ring of the atlas (C1), forming the median atlanto-axial joint.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 5' } },
      { type: 'cloze', prompt: 'The transverse ligament holds the atlas and the ______ of the axis in place.', accept: ['dens', 'odontoid process', 'odontoid process (dens)', 'odontoid'],
        explanation: 'Model answer: odontoid process (dens). Both names are accepted for the same peg.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 3' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient can nod but cannot shake their head. Which joint is most likely affected, and which bones form it?',
        model: 'The median atlanto-axial joint, between the atlas (C1) and the dens of the axis (C2). Nodding is preserved because that happens at the atlanto-occipital joint one level above, which is unaffected.',
        rubric: ['Names the atlanto-axial joint', 'Names C1 and C2 / the dens', 'Explains why nodding is spared'] },
    ],
    commonMistakes: [
      'Swapping the two joints — the nod is higher (skull on C1), the shake is lower (C1 on C2).',
      'Not recognising "odontoid process" and "dens" as the same structure under two names.',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p28–29 cervical vertebrae, atlanto-axial joint' }, { ref: 'hss.4.2', location: 'Head and neck — cervical spine features' }, { ref: 'hss.revans', location: 'Module 0 and Module 4.2 answers' }],
  },
  {
    id: 'hss2011-osteo-skull-sutures',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Skull bones and the four sutures',
    tags: ['osteology', 'skull', 'high-yield'], boneRefs: ['cranium', 'mandible'],
    lesson: {
      explanation: 'Sutures are fibrous joints of the skull, articulating by process and indentation, with the bones bound by fibrous connective tissue. Four are named in the module: the coronal suture binds the frontal and parietal bones; the sagittal suture runs between the two parietal bones; the lambdoid suture lies between parietal and occipital; and the squamous suture joins the parietal bone to the temporal bone. The Module 4 labelling answers also name the squamous part of the temporal bone, the external acoustic meatus, the mastoid process, the sphenoid, the nasal bone, the lacrimal bone, the ethmoid, the maxilla and the zygomatic bone. The mandible is the only movable bone in the skull.',
      keyFacts: [
        'Coronal suture — frontal to parietal.',
        'Sagittal suture — parietal to parietal.',
        'Lambdoid suture — parietal to occipital.',
        'Squamous suture — parietal to temporal.',
        'Sutures are fibrous joints: articulation by process and indentation, bound by fibrous connective tissue.',
        'The mandible is the only movable bone in the skull.',
        'Named facial and cranial bones in the labelling answers: sphenoid, nasal, lacrimal, ethmoid, maxilla, zygomatic, temporal (squamous part), plus the external acoustic meatus and mastoid process.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      location: 'Put a crown on your head: the coronal suture is exactly where the band sits, frontal in front, parietal behind. Then an arrow (sagittal) down the midline between the parietals. Lambdoid is the Greek letter lambda at the back of the skull. Squamous is the scaly overlap low on the side, where the temporal bone slides under the parietal.',
      firstLetter: 'Going front to back along the top: Coronal, Sagittal, Lambdoid. C-S-L. Squamous is the odd one out because it is on the side, not the top.',
      comparison: 'Squamous vs sagittal is the classic distractor pair. Sagittal is on top between two parietals; squamous is on the side between parietal and temporal.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which suture joins the parietal bone and the temporal bone together?', options: ['Squamous suture', 'Coronal suture', 'Lambdoid suture', 'Sagittal suture'], answer: 0,
        explanation: 'Model answer A. The squamous suture is the scale-like overlap on the side of the skull between parietal and temporal. Sagittal is the midline joint between the two parietals.',
        src: { ref: 'hss.revans', location: 'Module 4.2, MCQ 2' } },
      { type: 'cloze', prompt: 'The joint between the frontal and parietal bones is correctly called the ______ suture.', accept: ['coronal'],
        explanation: 'Model answer: coronal. The lecture uses this exact example when defining sutures as fibrous joints.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 4' } },
      { type: 'cloze', prompt: 'The ______ bone is the only movable bone in the skull.', accept: ['mandible', 'mandibular'],
        explanation: 'Model answer: mandible. It articulates with the temporal bones at the temporomandibular joints.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 2' } },
      { type: 'matching', prompt: 'Match each suture to the bones it joins.',
        pairs: [['Coronal', 'Frontal – parietal'], ['Sagittal', 'Parietal – parietal'], ['Lambdoid', 'Parietal – occipital'], ['Squamous', 'Parietal – temporal']],
        explanation: 'These are the four sutures the module asks you to locate on the skull.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Sutures are classed as fibrous joints. What does that classification tell you about how much they move, and why is a suture a useful example of that class?',
        model: 'Fibrous joints allow very limited movement because the bones are connected by fibrous tissue rather than by a cavity and cartilage. A suture is the clearest example: the bones interlock by process and indentation and are bound by fibrous connective tissue, so the skull vault is effectively rigid.',
        rubric: ['States fibrous joints allow very limited movement', 'Describes the process-and-indentation interlock', 'Names fibrous connective tissue as the binding'] },
    ],
    commonMistakes: [
      'Answering sagittal when asked about parietal-to-temporal. Sagittal is parietal-to-parietal on the midline.',
      'Forgetting the mandible when asked which skull bone moves.',
    ],
    sourceRefs: [{ ref: 'hss.4.2', location: 'Head and neck — skull, sutures' }, { ref: 'hss.4.1', location: 'Slide "Fibrous joints — Sutures"' }, { ref: 'hss.revans', location: 'Module 4.2 answers; More exercises Module 4, labels A1–A12' }],
  },
  {
    id: 'hss2011-osteo-pectoral-girdle',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Pectoral girdle and the shoulder joints',
    tags: ['osteology', 'upper limb', 'high-yield'], boneRefs: ['clavicle', 'scapula', 'humerus'],
    lesson: {
      explanation: 'The pectoral girdle consists of the clavicle and the scapula. Three joints sit around the shoulder region: the sternoclavicular joint, the acromioclavicular joint, and the glenohumeral joint, where the head of the humerus articulates with the glenoid fossa of the scapula. The scapula itself moves in six ways: elevation, depression, retraction, protraction, lateral rotation and medial rotation.',
      keyFacts: [
        'Pectoral girdle = clavicle + scapula.',
        'Joints around the shoulder: sternoclavicular, acromioclavicular, glenohumeral.',
        'Glenohumeral joint = head of humerus in the glenoid fossa of the scapula.',
        'Six scapular movements: elevation, depression, retraction, protraction, lateral rotation, medial rotation.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      chunking: 'Two bones, three joints. Follow the chain inward from the arm: glenohumeral, acromioclavicular, sternoclavicular — the only bony link back to the axial skeleton is at the sternum.',
      mnemonic: 'Retraction pulls the shoulders back — think of squaring up for a photograph. Protraction pushes them forward, like reaching for something.',
      visualCue: 'The scapula is a flat triangle sliding on the back of the ribcage; its six movements are just the ways a plate can slide and tilt on a curved surface.',
    },
    practice: [
      { type: 'cloze', prompt: 'The pectoral girdle consists of the clavicle and the ______.', accept: ['scapula'],
        explanation: 'Model answer: scapula. Only two bones make up the pectoral girdle on each side.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 4' } },
      { type: 'mcq', prompt: 'Pulling your shoulders back, or squaring them, involves which motion of the scapula?', options: ['Retraction', 'Opposition', 'Pronation', 'Abduction'], answer: 0,
        explanation: 'Model answer A. Retraction draws the scapula back toward the midline; protraction is the opposite. Opposition and pronation are not scapular movements at all.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 4' } },
      { type: 'typed', prompt: 'The head of the humerus articulates with which part of the scapula?', accept: ['glenoid fossa', 'glenoid cavity', 'glenoid'],
        explanation: 'The glenoid fossa (glenoid cavity) of the scapula, forming the glenohumeral joint.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Name the three joints that must move for you to raise your arm fully overhead, working from the humerus inward.',
        model: 'Glenohumeral first, where the humeral head moves on the glenoid fossa; then acromioclavicular, as the scapula rotates on the clavicle; then sternoclavicular, the only bony joint back to the axial skeleton, at the sternum.',
        rubric: ['Names all three joints', 'Orders them from lateral to medial', 'Identifies the sternoclavicular joint as the axial link'] },
    ],
    commonMistakes: [
      'Adding the humerus to the pectoral girdle. The girdle is clavicle and scapula only; the humerus is the limb it carries.',
      'Confusing retraction and protraction; retraction is backwards.',
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Pectoral Girdle", "Joints Around Shoulder Region" (Fig. 8-2)' }, { ref: 'hss.m0.1718', location: 'L1 p36 movements of the scapula; L1 p39 shoulder joint' }],
  },
  {
    id: 'hss2011-osteo-forearm-carpals',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Forearm bones, wrist and the carpal bones',
    tags: ['osteology', 'upper limb', 'high-yield'], boneRefs: ['radius', 'ulna', 'hand', 'humerus'],
    lesson: {
      explanation: 'The forearm has two bones, the radius laterally and the ulna medially, joined by an interosseous membrane and meeting at the proximal and distal radioulnar joints. At the elbow, the trochlea of the humerus meets the trochlear notch of the ulna and the capitulum meets the head of the radius. The wrist (radiocarpal) joint is formed by the radius with the scaphoid, lunate and triquetrum. The eight carpal bones sit in two rows: the proximal row is scaphoid, lunate, triquetrum and pisiform; the distal row is trapezium, trapezoid, capitate and hamate. The scaphoid is lateral to the lunate.',
      keyFacts: [
        'Radius is lateral (thumb side); ulna is medial (little-finger side).',
        'Elbow: humeral trochlea to the trochlear notch of the ulna; humeral capitulum to the head of the radius.',
        'Radiocarpal joint articular bones: radius, scaphoid, lunate, triquetrum.',
        'Proximal carpal row: scaphoid, lunate, triquetrum, pisiform.',
        'Distal carpal row: trapezium, trapezoid, capitate, hamate.',
        'The scaphoid is lateral to the lunate.',
        'The major extensor of the elbow is triceps brachii; the trochlear notch is the ulnar feature that receives the humerus.',
      ],
      prerequisites: ['hss2011-osteo-pectoral-girdle'],
      examples: [],
    },
    memory: {
      mnemonic: 'Radius is on the same side as your Ring — no: radius is on the thumb side, and the thumb points to the RADIO you are tuning. Ulna is the side you rest on the desk, the same side as your little finger.',
      firstLetter: 'Carpals, proximal row then distal row, lateral to medial: Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate.',
      chunking: 'Four and four, two rows. Learn the rows as units; almost every carpal question is really asking which row a bone is in.',
      comparison: 'Trapezium sits under the thumb; trapezoid is next to it. Trapezium has an "M" for thuMb.',
    },
    practice: [
      { type: 'mcq', prompt: 'What is the collective name for wrist bones?', options: ['Carpal bones', 'Tarsal bones', 'Phalangeal bones', 'Lumbar bones', 'Radial bones'], answer: 0,
        explanation: 'Model answer A. Carpal bones are in the wrist; tarsal bones are the equivalent group in the ankle.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 1' } },
      { type: 'mcq', prompt: 'The scaphoid bone is ________ to the lunate.', options: ['Superior', 'Inferior', 'Lateral', 'Medial', 'Anterior'], answer: 2,
        explanation: 'Model answer C. In the anatomical position the palms face forward, putting the scaphoid on the thumb (radial) side — lateral to the lunate.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 2' } },
      { type: 'cloze', prompt: 'The arrow points to the ______ of the ulna — the notch that receives the trochlea of the humerus.', accept: ['trochlear notch'],
        explanation: 'Model answer: trochlear notch. It is the C-shaped hollow on the proximal ulna gripping the humeral trochlea.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 4' } },
      { type: 'sequence', prompt: 'Order the proximal carpal row from lateral (thumb side) to medial.', items: ['Scaphoid', 'Lunate', 'Triquetrum', 'Pisiform'],
        explanation: 'The proximal row runs scaphoid, lunate, triquetrum, pisiform from the thumb side across.' },
      { type: 'cloze', prompt: 'The major extensor of the elbow is the ______ muscle.', accept: ['triceps brachii', 'triceps'],
        explanation: 'Model answer: triceps brachii, innervated by the radial nerve.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 2' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient has pain at the base of the thumb after falling on an outstretched hand. Which carpal bone is the first one to think about, which row is it in, and which forearm bone does it sit against?',
        model: 'The scaphoid. It is in the proximal carpal row and it is the most lateral bone of that row, so it sits against the radius and forms part of the radiocarpal joint along with the lunate and triquetrum.',
        rubric: ['Names the scaphoid', 'Places it in the proximal row', 'Links it to the radius / radiocarpal joint'] },
    ],
    commonMistakes: [
      'Putting the radius on the medial side. Palms forward means the radius is lateral.',
      'Mixing trapezium and trapezoid; trapeziuM is under the thuMb.',
      'Calling wrist bones tarsals — tarsals are in the ankle.',
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Radius and Ulna" (Fig. 8-5b), "Elbow Joint" (Fig. 8-4c), "Carpal Bones"' }, { ref: 'hss.m0.1718', location: 'L1 p45 right wrist (radiocarpal) joint; L1 p47 joints of thumb and fingers' }, { ref: 'hss.revans', location: 'Module 4.3 answers' }],
  },
  {
    id: 'hss2011-osteo-pelvic-girdle',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Pelvic girdle and the hip joint',
    tags: ['osteology', 'lower limb', 'high-yield'], boneRefs: ['pelvis', 'femur', 'sacrum'],
    lesson: {
      explanation: 'Each hip bone is formed from three bones: the ilium, the ischium and the pubis. The head of the femur articulates with the acetabulum, the socket where those three meet. The proximal femur carries the head, the neck, the greater trochanter and the lesser trochanter, and the shaft angles inward to the medial and lateral condyles at the knee.',
      keyFacts: [
        'The three bones forming the hip bone: ilium, ischium, pubis.',
        'Head of femur articulates with the acetabulum.',
        'Proximal femur landmarks: head, neck, greater trochanter, lesser trochanter, angle of inclination.',
        'Distal femur landmarks: medial condyle, lateral condyle.',
        'Gluteus medius is a hip abductor.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      firstLetter: 'Ilium, Ischium, Pubis — I, I, P. Top, bottom-back, bottom-front.',
      location: 'Rest your hands on your hips and you are on the ilium. Sit down and you are on the ischium — I Sit on my ischial tuberosity. The pubis is the front join.',
      comparison: 'Acetabulum takes the femoral head; glenoid cavity takes the humeral head. Deep socket versus shallow one — that is why the hip is stable and the shoulder is mobile.',
    },
    practice: [
      { type: 'mcq', prompt: 'The head of the femur articulates with _______.', options: ['Acetabulum', 'Glenoid cavity', 'Acromion', 'Greater trochanter', 'Medial condyle'], answer: 0,
        explanation: 'Model answer A. The acetabulum is the hip socket. The glenoid cavity is the shoulder socket and the acromion is a scapular process.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 4' } },
      { type: 'cloze', prompt: 'The three bones forming the hip bone are ______, ______ and ______.', accept: ['ilium; ischium; pubis', 'ilium, ischium, pubis', 'ilium ischium pubis'],
        explanation: 'Model answer: ilium, ischium, pubis. They meet at the acetabulum.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 1' } },
      { type: 'mcq', prompt: 'Which of the following muscles is a hip abductor?', options: ['Gluteus medius', 'Tibialis anterior', 'Adductor magnus', 'Gastrocnemius', 'Rectus femoris'], answer: 0,
        explanation: 'Model answer A. Gluteus medius abducts the hip. Adductor magnus does the opposite, and the other three act at the knee or ankle.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A fracture is described as being at the "neck of femur". Using the proximal femoral landmarks, say where that is relative to the greater trochanter and why the site matters for the joint.',
        model: 'The neck is the narrow segment between the head and the trochanters, so it lies medial and superior to the greater trochanter. It matters because the head sits inside the acetabulum, so a break across the neck separates the articulating head from the shaft.',
        rubric: ['Places the neck between head and trochanters', 'Relates the head to the acetabulum'] },
    ],
    commonMistakes: [
      'Answering glenoid cavity for the femoral head — that is the shoulder socket.',
      'Listing the sacrum as one of the three bones of the hip bone; it is axial and articulates with the ilium, but it is not part of it.',
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Hip & Gluteal Region: Pelvic Girdle", "Femur (Right)" (Fig. 8-11), "Proximal End of Femur"' }, { ref: 'hss.revans', location: 'Module 4.3 answers' }],
  },
  {
    id: 'hss2011-osteo-leg-tarsals',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Leg bones, ankle and the tarsal bones',
    tags: ['osteology', 'lower limb'], boneRefs: ['tibia', 'fibula', 'foot', 'patella'],
    lesson: {
      explanation: 'The leg has the tibia medially and the fibula laterally, joined by an interosseous membrane and meeting at the proximal and distal tibiofibular joints. The tibia ends in the medial malleolus and the fibula in the lateral malleolus. The patella has a base superiorly and an apex inferiorly. The tarsal bones named in the lecture are the talus, calcaneus, navicular, cuboid, and the medial, intermediate and lateral cuneiforms. The foot has three arches: medial longitudinal, lateral longitudinal and transverse.',
      keyFacts: [
        'Tibia medial, fibula lateral.',
        'Medial malleolus belongs to the tibia; lateral malleolus belongs to the fibula.',
        'Proximal and distal tibiofibular joints, with an interosseous membrane between.',
        'Patella: base superiorly, apex inferiorly.',
        'Tarsals: talus, calcaneus, navicular, cuboid, medial / intermediate / lateral cuneiforms.',
        'Three arches of the foot: medial longitudinal, lateral longitudinal, transverse.',
        'Gastrocnemius, the ankle plantarflexor, is innervated by the tibial nerve.',
      ],
      prerequisites: ['hss2011-osteo-pelvic-girdle'],
      examples: [],
    },
    memory: {
      mnemonic: 'Tibia = TIB takes the weight, and it is the one you can feel as your shin. Fibula = fine, thin pin on the outside.',
      comparison: 'Malleolus pairs: Medial with tibia, Lateral with fibula. Both pairs share their first letter with the side they are on, except the tibia — so learn lateral–fibula and derive the other.',
      location: 'The talus sits on top of the calcaneus and takes the whole leg’s load into the foot. Everything else in the tarsus fans forward from those two.',
    },
    practice: [
      { type: 'typed', prompt: 'Which bone carries the lateral malleolus?', accept: ['fibula'],
        explanation: 'The fibula ends distally in the lateral malleolus; the tibia ends in the medial malleolus.' },
      { type: 'cloze', prompt: 'The gastrocnemius muscle (ankle plantarflexor) is innervated by the ______ nerve.', accept: ['tibial'],
        explanation: 'Model answer: tibial.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 5' } },
      { type: 'matching', prompt: 'Match each tarsal bone group to its description from the lecture.',
        pairs: [['Talus', 'Sits at the ankle joint, above the calcaneus'], ['Calcaneus', 'The heel bone'], ['Cuneiforms', 'Medial, intermediate and lateral — three of them'], ['Navicular', 'Lies between the talus and the cuneiforms']],
        explanation: 'These are the tarsal bones named on the "Ankle & Foot" slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A swelling is described over the lateral malleolus. Which bone is involved, and which of the two leg bones bears most of the body weight?',
        model: 'The lateral malleolus is the distal end of the fibula. The tibia is the weight-bearing bone of the leg; the fibula is the slender lateral bone, so a lateral malleolar problem is not primarily a weight-bearing one.',
        rubric: ['Identifies the fibula', 'Names the tibia as weight-bearing'] },
    ],
    commonMistakes: [
      'Assigning the medial malleolus to the fibula. Medial goes with tibia.',
      'Calling tarsals "carpals" — carpals are in the wrist.',
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Patella (Right)" (Fig. 8-12), "Tibia and Fibula (Right)" (Fig. 8-13), "Ankle & Foot"' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 5' }],
  },
  {
    id: 'hss2011-osteo-ribs-sternum',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Thoracic cage — ribs, sternum and the thoracic inlet',
    tags: ['osteology', 'thorax', 'high-yield'], boneRefs: ['ribs', 'sternum', 'thoracic'],
    lesson: {
      explanation: 'The thorax is the region formed by the sternum, the thoracic vertebrae and the ribs, extending from the neck down to the diaphragm. Module 1.3 asks you to define the thoracic cage, classify the ribs as true, false or floating, and describe how ribs articulate with the sternum and vertebral column. The thoracic inlet is bounded by the first ribs, the first thoracic vertebra and the manubrium of the sternum — and the revision exercise makes the point that the scapula is not part of it.',
      keyFacts: [
        'Thorax = sternum + thoracic vertebrae + ribs, from the neck to the diaphragm.',
        'Thoracic inlet is bounded by the 1st ribs, the 1st thoracic vertebra and the sternum (manubrium).',
        'Ribs classify as true, false and floating.',
        'The arch of the aorta lies in the superior mediastinum.',
        'The phrenic nerve innervates the muscle fibres of the diaphragm.',
        'The azygos vein drains blood from the posterior thoracic wall.',
      ],
      prerequisites: ['hss2011-osteo-vertebral-column'],
      examples: [],
    },
    memory: {
      chunking: 'Ribs 1–7 attach to the sternum on their own; 8–10 share a cartilage; 11–12 attach to nothing in front. Alone, carpool, walk free.',
      location: 'The thoracic inlet is a ring you can trace with your fingers: sternum in front, first ribs at the sides, T1 behind. The scapula floats on the back and never joins the ring.',
      wordOrigin: 'Azygos is Greek for "unpaired" — it is the vein with no partner on the other side, which is why it can drain the whole posterior wall.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following is NOT part of the thoracic inlet?', options: ['Clavicle', 'Scapula', 'Sternum', 'Cervical vertebrae C7'], answer: 1,
        explanation: 'The model answer for this question is A, B, D — the inlet is bounded by the 1st ribs, the 1st thoracic vertebra and the manubrium, so clavicle, scapula and C7 are all outside it. Of the four, the scapula is the one that is never involved in the thoracic boundary at all.',
        src: { ref: 'hss.revans', location: 'Module 1.3, MCQ 1 (model answer A, B, D)' } },
      { type: 'cloze', prompt: 'The thoracic outlet is bounded by ______.', accept: ['1st ribs, 1st thoracic vertebrae, sternum', '1st ribs, 1st thoracic vertebra, manubrium', 'first ribs, first thoracic vertebra and the manubrium'],
        explanation: 'Model answer: 1st ribs, 1st thoracic vertebrae, sternum (manubrium).',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 1' } },
      { type: 'cloze', prompt: 'The ______ nerve innervates the muscle fibres of the diaphragm.', accept: ['phrenic'],
        explanation: 'Model answer: phrenic.',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 3' } },
      { type: 'cloze', prompt: 'The ______ drains blood from the posterior thoracic wall.', accept: ['azygos vein', 'azygos'],
        explanation: 'Model answer: azygos vein.',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'The Module 3 exercise asks which organs a broken left 10th rib could damage. What is the answer, and what does it tell you about how far the thoracic cage extends over the abdomen?',
        model: 'The left kidney and the spleen. That shows the lower ribs overlie upper abdominal organs, so the bony thorax and the thoracic cavity are not the same extent — the cage continues down over structures that are anatomically abdominal.',
        rubric: ['Names left kidney and spleen', 'Draws the distinction between the bony cage and the thoracic cavity'] },
    ],
    commonMistakes: [
      'Including the clavicle or scapula in the thoracic inlet — the boundary is ribs, vertebra and sternum only.',
      'Assuming everything under the ribs is thoracic; the lower ribs cover abdominal organs.',
    ],
    sourceRefs: [{ ref: 'hss.1.3', location: 'Regional anatomy of the thorax — boundaries, rib classification' }, { ref: 'hss.manual1920', location: 'Submodule 1.3 guiding questions, p.22' }, { ref: 'hss.revans', location: 'Module 1.3 answers; More exercises Module 3' }],
  },
];

const HSS_JOINTS = [
  {
    id: 'hss2011-joints-classification',
    subject: 'HSS2011', unit: 'hss.joints', type: 'definition',
    title: 'Classification of joints',
    tags: ['joints', 'high-yield'],
    lesson: {
      explanation: 'Arthrology is the study of joints — from the Greek arthron, joint, and logos, study. Joints fall into three classes. Fibrous joints allow very limited movement, with the bones connected by fibrous tissue; their three types are sutures, gomphoses and syndesmoses. Cartilaginous joints come in two types: synchondroses, the primary cartilaginous joints, which are temporary and ossify in adult life around 25 years, such as the epiphysis of a child; and symphyses, the secondary cartilaginous joints, where two bones are joined by fibrocartilage, such as the inter-body joints of the spine and the pubic symphysis. Synovial joints are the most common in the body and come in six types: hinge, pivot, condylar, saddle, plane and ball-and-socket.',
      keyFacts: [
        'Fibrous: sutures (skull), gomphosis (tooth root in its socket), syndesmosis (inferior tibiofibular articulation, united by an interosseous ligament).',
        'Cartilaginous: synchondrosis (primary, temporary, ossifies ~25 years, e.g. epiphysis of a child); symphysis (secondary, fibrocartilage, e.g. intervertebral joints, pubic symphysis).',
        'Synovial: hinge, pivot, condylar, saddle, plane, ball-and-socket.',
        'A suture is the least movable joint of those listed in the revision exercise.',
      ],
      prerequisites: ['hss2011-osteo-bone-shapes'],
      examples: [],
    },
    memory: {
      chunking: 'Three classes, and each class is named after what fills the gap: fibrous tissue, cartilage, or a synovial cavity. Once you know the filling, the mobility follows — no gap means no movement.',
      firstLetter: 'Six synovial types: Hinge, Pivot, Condylar, Saddle, Plane, Ball-and-socket.',
      wordOrigin: 'Gomphosis comes from the Greek for bolt or nail — a peg driven into a socket, which is exactly a tooth in its alveolus.',
      comparison: 'Synchondrosis vs symphysis: syn-CHONDR-osis has hyaline cartilage and is temporary; SYM-physis has fibrocartilage and is permanent. Primary comes first and disappears; secondary stays.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following is the least movable joint?', options: ['A diarthrosis', 'A suture', 'A synchondrosis', 'A symphysis'], answer: 1,
        explanation: 'Model answer B. Sutures are fibrous joints bound by fibrous connective tissue and interlocked by process and indentation, so they permit the least movement. A diarthrosis is a freely movable synovial joint.',
        src: { ref: 'hss.revans', location: 'Module 4.1, MCQ 4' } },
      { type: 'mcq', prompt: 'In monoaxial articulation,', options: ['Movement can occur in only one plane.', 'Movement can occur in two planes.', 'Movement can occur in all three planes.', 'Only circumduction is possible'], answer: 0,
        explanation: 'Model answer A. Mono- means one, so a monoaxial joint moves in one plane only.',
        src: { ref: 'hss.revans', location: 'Module 4.1, MCQ 3' } },
      { type: 'matching', prompt: 'Match each fibrous or cartilaginous joint type to the example the lecture gives.',
        pairs: [['Suture', 'Coronal suture of the skull'], ['Gomphosis', 'Root of a tooth in its alveolus'], ['Syndesmosis', 'Inferior tibiofibular articulation'], ['Symphysis', 'Pubic symphysis']],
        explanation: 'These are the worked examples on the joint classification slides.' },
      { type: 'sequence', prompt: 'List the six types of synovial joint in the order the lecture gives them.', items: ['Hinge', 'Pivot', 'Condylar', 'Saddle', 'Plane', 'Ball-and-socket'],
        explanation: 'This is the order used on the "Classification of Joints — Synovial joints" slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A child’s growth plate is described as a joint. Which class and type is it, and what happens to it later?',
        model: 'It is a cartilaginous joint, specifically a synchondrosis or primary cartilaginous joint. It is temporary: the cartilage ossifies in adult life, around 25 years, so the joint disappears once growth is complete.',
        rubric: ['Names cartilaginous / synchondrosis', 'States it is temporary', 'Gives the approximate age of ossification'] },
    ],
    commonMistakes: [
      'Treating "cartilaginous" as one type rather than two — synchondrosis and symphysis behave very differently.',
      'Assuming a diarthrosis is immobile because the word sounds technical; it is the freely movable class.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides "Arthrology", "Classification of Joints", "Fibrous joints", "Cartilaginous joints"' }, { ref: 'hss.m0.1718', location: 'L1 p18 "Joints"' }, { ref: 'hss.revans', location: 'Module 4.1 answers' }],
  },
  {
    id: 'hss2011-joints-synovial-structure',
    subject: 'HSS2011', unit: 'hss.joints', type: 'definition',
    title: 'Structures of a synovial joint',
    tags: ['joints', 'high-yield'],
    lesson: {
      explanation: 'A synovial joint has bone ends covered by articular cartilage, a joint cavity between them in the normal healthy state, an articular capsule, and synovial membranes producing synovial fluid. The articular cartilage is hyaline cartilage and is wear-resistant and low-friction; it is nourished by synovial fluid, by the vascular net in the synovial membrane, and by blood vessels in the underlying marrow spaces. The fibrous capsule is a cuff of connective fibrous tissue around the joint close to the articular surface; its localised thickenings are the joint ligaments. A ligament is a cord or band of tough collagenous tissue binding one bone to another. A bursa is a protrusion of synovial membrane that reduces friction, for example between tendons and bony areas.',
      keyFacts: [
        'Articular cartilage is hyaline cartilage — wear-resistant, low-friction, lubricated.',
        'Articular cartilage nutrition: synovial fluid, vascular net in the synovial membrane, blood vessels in underlying marrow spaces.',
        'Fibrous capsule = dense connective tissue cuff; localised thickenings are joint ligaments.',
        'Ligament = cord or band of tough collagenous tissue binding one bone to another.',
        'Bursa = protrusion of synovial membrane reducing friction, e.g. between tendon and bone.',
        'Synovial fluid is clear and colourless, secreted by the synovial membrane.',
        'The intervertebral disc acts as a shock absorber.',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [],
    },
    memory: {
      location: 'Build the joint from the bone outward: cartilage on the bone, fluid in the gap, membrane lining the gap, capsule wrapping it, ligaments thickening the capsule. Five layers, one direction.',
      comparison: 'Ligament joins bone to bone. Tendon joins muscle to bone. If a question says "binding one bone to another", the answer is ligament every time.',
      visualCue: 'A bursa is a small water balloon slipped between a tendon and a bony corner so the two do not grind.',
    },
    practice: [
      { type: 'cloze', prompt: 'A synovial joint is surrounded by a(n) ______ composed of a thick layer of dense connective tissue. The bony surfaces cannot contact one another because the articulating surfaces are covered by ______, which function as ______ and reduce friction. The ______ of a joint is a cord or band of tough collagenous tissue binding one bone to another.',
        accept: ['joint capsule; articular cartilage; shock absorber; ligament', 'articular capsule, articular cartilage, shock absorber, ligament', 'capsule cartilage shock absorber ligament'],
        explanation: 'Model answers: joint capsule / articular capsule, articular cartilage, shock absorber, ligament.',
        src: { ref: 'hss.revans', location: 'Module 4.1, Fill-in-blanks 4–7' } },
      { type: 'typed', prompt: 'What type of cartilage forms the articular cartilage of a synovial joint?', accept: ['hyaline', 'hyaline cartilage'],
        explanation: 'Hyaline cartilage — wear-resistant and low-friction.' },
      { type: 'explain', prompt: 'Articular cartilage has no blood vessels of its own. How is it nourished?',
        model: 'From three sources given in the lecture: synovial fluid, the vascular net in the synovial membrane, and blood vessels in the underlying marrow spaces.',
        rubric: ['Names synovial fluid', 'Names the synovial membrane vascular net', 'Names underlying marrow-space vessels'] },
    ],
    application: [
      { type: 'scenario', prompt: 'Why would a joint that has been immobilised for weeks have unhealthy cartilage even if nothing was ever injured?',
        model: 'Articular cartilage relies on synovial fluid for much of its nutrition, and synovial fluid is secreted and circulated by the synovial membrane. Without movement to circulate the fluid over the surface, the main nutrition route for the cartilage is compromised.',
        rubric: ['Names synovial fluid as a nutrition route', 'Links movement to circulation of that fluid'] },
    ],
    commonMistakes: [
      'Calling a ligament a tendon. Ligament is bone to bone.',
      'Thinking articular cartilage has its own blood supply.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides "Synovial joints" — articular cartilage, fibrous capsule, ligaments, synovial membrane' }, { ref: 'hss.revans', location: 'Module 4.1 fill-in-blanks' }, { ref: 'hss.m0.1718', location: 'L1 p26 intervertebral disc as shock absorber' }],
  },
  {
    id: 'hss2011-joints-movements',
    subject: 'HSS2011', unit: 'hss.joints', type: 'definition',
    title: 'Movements and where each one happens',
    tags: ['joints', 'movements', 'high-yield'],
    lesson: {
      explanation: 'Module 0 pins each movement to the joint that produces it. Flexion and extension of the forearm take place at the elbow joint. Supination and pronation of the forearm take place at the radioulnar joints, superior and inferior, with the radius rotating against the ulna and bringing the hand with it. Abduction and adduction of the wrist — also called radial and ulnar flexion — happen at the radiocarpal joint. Flexion, extension, abduction, adduction and opposition of the thumb all happen at the carpo-metacarpal joint of the thumb, with the palm as the fixed plane of reference. Opposition is tip-to-tip contact of the thumb with any finger; its opposite is reposition. Circumduction is a combination of flexion, abduction, lateral rotation, medial rotation, adduction and extension. For the fingers, abduction and adduction are measured against the middle finger as the fixed reference.',
      keyFacts: [
        'Elbow joint → flexion and extension of the forearm.',
        'Superior and inferior radioulnar joints → supination and pronation.',
        'Radiocarpal (wrist) joint → abduction (radial flexion) and adduction (ulnar flexion).',
        'Carpo-metacarpal joint of the thumb → thumb flexion, extension, abduction, adduction, opposition.',
        'Opposition = tip-to-tip attachment of the thumb with any finger; opposite is reposition.',
        'Circumduction = a combination of flexion, abduction, lateral rotation, medial rotation, adduction and extension.',
        'Finger abduction/adduction is referenced to the middle finger; thumb movement is referenced to the palm.',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [],
    },
    memory: {
      mnemonic: 'Supination: you hold a bowl of SOUP in a supinated palm. Turn it over and you spill it — that is pronation.',
      location: 'For every movement, ask "which joint?" before "which direction?". Half the fill-in-blank marks in Module 0 are for naming the joint, not the movement.',
      chunking: 'The thumb is its own system: five movements, all at one joint, all referenced to the palm rather than to the middle finger.',
    },
    practice: [
      { type: 'cloze', prompt: '______ is the action by which the thumb touches the tips of the other fingers.', accept: ['opposition'],
        explanation: 'Model answer: Opposition. Its opposite is reposition, and it happens at the carpo-metacarpal joint of the thumb.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 1' } },
      { type: 'cloze', prompt: '______ causes the forearm to rotate laterally.', accept: ['supination'],
        explanation: 'Model answer: Supination. It occurs at the superior and inferior radioulnar joints, with the radius rotating against the ulna.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 2' } },
      { type: 'cloze', prompt: 'Flexion and extension of the thumb take place at the ______.', accept: ['carpo-metacarpal joint', 'carpometacarpal joint', 'carpo-metacarpal joint of the thumb', 'cmc joint'],
        explanation: 'Model answer: Carpo-metacarpal joint. All five characteristic thumb movements occur there.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 5' } },
      { type: 'matching', prompt: 'Match each movement to the joint where it takes place.',
        pairs: [['Supination and pronation', 'Radioulnar joints'], ['Flexion and extension of forearm', 'Elbow joint'], ['Radial and ulnar flexion', 'Radiocarpal (wrist) joint'], ['Opposition', 'Carpo-metacarpal joint of the thumb']],
        explanation: 'Each Module 0 movement slide names the responsible joint in its title.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Someone says their wrist rotates when they turn a doorknob. Correct the anatomy of that statement.',
        model: 'The wrist does not rotate. Turning the knob is supination and pronation of the forearm at the superior and inferior radioulnar joints, where the radius rotates against the ulna. The hand comes along with the forearm, which is why it feels like the wrist is turning.',
        rubric: ['Names supination/pronation', 'Names the radioulnar joints', 'Explains the hand follows the forearm'] },
    ],
    commonMistakes: [
      'Attributing forearm rotation to the wrist joint rather than the radioulnar joints.',
      'Referencing thumb abduction to the middle finger; the thumb is referenced to the palm.',
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p42–53 movement slides' }, { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks' }],
  },
  {
    id: 'hss2011-joints-rotator-cuff',
    subject: 'HSS2011', unit: 'hss.joints', type: 'definition',
    title: 'Rotator cuff and full abduction of the arm',
    tags: ['joints', 'upper limb', 'high-yield'],
    lesson: {
      explanation: 'The rotator cuff is four muscles: supraspinatus, infraspinatus, teres minor and subscapularis. Supraspinatus initiates the first 15 degrees of abduction; infraspinatus and teres minor laterally rotate the humerus; subscapularis medially rotates it. Full abduction of the arm is a four-part sequence: supraspinatus initiates, deltoid abducts, infraspinatus and teres minor laterally rotate, and trapezius upwardly rotates the scapula. The major shoulder-girdle muscles are pectoralis major, latissimus dorsi and deltoid.',
      keyFacts: [
        'Rotator cuff: supraspinatus, infraspinatus, teres minor, subscapularis.',
        'Supraspinatus initiates the first 15 degrees of abduction (suprascapular nerve).',
        'Infraspinatus (suprascapular nerve) and teres minor (axillary nerve) laterally rotate the humerus.',
        'Subscapularis medially rotates the humerus (subscapular nerve).',
        'Deltoid is a powerful abductor of the arm (axillary nerve).',
        'Full abduction: supraspinatus initiates → deltoid abducts → infraspinatus and teres minor laterally rotate → trapezius upwardly rotates the scapula.',
      ],
      prerequisites: ['hss2011-osteo-pectoral-girdle'],
      examples: [],
    },
    memory: {
      firstLetter: 'SITS — Supraspinatus, Infraspinatus, Teres minor, Subscapularis. The cuff SITS on the shoulder.',
      sequence: 'Abduction has a running order, not a single muscle: start, lift, rotate, tilt the scapula. Supraspinatus is only the starter.',
      comparison: 'Three of the four cuff muscles are on the back of the scapula and rotate laterally or start abduction. Subscapularis is the only one in front, and it is the only medial rotator — front means in, back means out.',
    },
    practice: [
      { type: 'cloze', prompt: 'The rotator cuff consists of four muscles: ______, ______, ______ and ______.',
        accept: ['supraspinatus; infraspinatus; teres minor; subscapularis', 'supraspinatus, infraspinatus, teres minor, subscapularis'],
        explanation: 'Model answer: supraspinatus, infraspinatus, teres minor, subscapularis.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 3' } },
      { type: 'typed', prompt: 'Which rotator cuff muscle initiates the first 15 degrees of abduction?', accept: ['supraspinatus'],
        explanation: 'Supraspinatus. Deltoid then takes over as the powerful abductor.' },
      { type: 'sequence', prompt: 'Order the muscle roles in full abduction of the arm.', items: ['Supraspinatus — initiation of abduction', 'Deltoid — abduction', 'Infraspinatus & teres minor — lateral rotation', 'Trapezius — upward rotation of scapula'],
        explanation: 'This is the order given on the "Muscles Involved in Full Abduction of the Arm" slide.' },
      { type: 'matching', prompt: 'Match each muscle to its innervation as given in the lecture.',
        pairs: [['Deltoid', 'Axillary nerve'], ['Supraspinatus', 'Suprascapular nerve'], ['Subscapularis', 'Subscapular nerve'], ['Triceps brachii', 'Radial nerve']],
        explanation: 'Each limb-muscle slide states the innervation directly beneath the action.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient can hold their arm out to the side once you lift it there, but cannot start the lift themselves. Which muscle would you suspect and why?',
        model: 'Supraspinatus. It initiates the first 15 degrees of abduction; deltoid is the powerful abductor beyond that. If deltoid works but the movement cannot be started, the initiator is the problem.',
        rubric: ['Names supraspinatus', 'States it initiates the first 15 degrees', 'Distinguishes its role from deltoid'] },
    ],
    commonMistakes: [
      'Including deltoid in the rotator cuff — it is a shoulder-girdle muscle, not a cuff muscle.',
      'Answering "deltoid" for the initiation of abduction.',
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Rotator Cuff Muscles", "Muscle of Upper Arm: Deltoid", "Muscles Involved in Full Abduction of the Arm"' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 3' }],
  },
];

const HSS_MODULES = [
  {
    id: 'hss2011-m1-heart-wall-valves',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Heart wall, valves and the great vessels',
    tags: ['thorax', 'high-yield'],
    lesson: {
      explanation: 'The heart wall has three layers: epicardium, myocardium and endocardium. The pericardium is a separate sac around the heart and is not part of the heart wall itself — that distinction is the point of the revision question. Cardiac muscle cells are interconnected by intercalated discs. The AV valves separate the atria from the ventricles; the right AV valve is the tricuspid, with three cusps, and it closes when the right ventricle contracts to prevent backflow into the right atrium. The anterior interventricular sulcus marks the boundary between the left and right ventricles on the front of the heart, and the interventricular septum is the muscular partition between them inside.',
      keyFacts: [
        'Heart wall layers: epicardium, myocardium, endocardium. The pericardium is not one of them.',
        'Cardiac muscle cells are interconnected by intercalated discs.',
        'AV valves separate the atria from the ventricles.',
        'Right AV valve = tricuspid, three cusps, closes on right ventricular contraction.',
        'Anterior interventricular sulcus = surface boundary between the ventricles.',
        'Interventricular septum = the muscular partition between the two ventricles.',
        'The mediastinum is the region of the chest between the two pleural cavities.',
        'The cisterna chyli is an expanded, sac-like chamber at the base of the thoracic duct.',
        'Elastic arteries have the most resilient vessel wall.',
      ],
      prerequisites: ['hss2011-osteo-ribs-sternum'],
      examples: [],
    },
    memory: {
      chunking: 'Three layers, outside in: epi- (upon), myo- (muscle), endo- (within). The prefixes are the answer.',
      comparison: 'Pericardium wraps the heart; epicardium is the heart’s own outer layer and is the visceral pericardium. Same neighbourhood, different question — the exam asks which is part of the wall.',
      wordOrigin: 'Cisterna chyli: a cistern is a storage tank, chyle is the milky fat-laden lymph from the gut. A tank of chyle at the bottom of the thoracic duct.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following structures does NOT form part of the heart wall?', options: ['Epicardium', 'Pericardium', 'Myocardium', 'Endocardium'], answer: 1,
        explanation: 'Model answer B. The three layers of the heart wall are epicardium, myocardium and endocardium. The pericardium is the surrounding sac.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 1' } },
      { type: 'mcq', prompt: 'Cardiac muscle cells in the heart are interconnected by:', options: ['Dense fibrous layers', 'Mesothelium', 'Intercalated discs', 'Areolar tissues'], answer: 2,
        explanation: 'Model answer C. Intercalated discs join cardiac muscle cells, secured by desmosomes and linked by gap junctions.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 2' } },
      { type: 'mcq', prompt: 'Which of the following statements is correct?', options: ['The human heart has two AV valves and two aortic valves', 'The human heart has two tricuspid valves and two semilunar valves', 'Aortic valve and left AV valve are both semilunar valves', 'AV valves separate the atria from ventricles'], answer: 3,
        explanation: 'Model answer D. There is one aortic valve, one tricuspid valve, and the left AV valve is bicuspid rather than semilunar — so only the last statement holds.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 3' } },
      { type: 'cloze', prompt: 'The ______ valve consists of three cusps and closes when the right ventricle contracts, preventing backflow into the right atrium.', accept: ['right av', 'tricuspid', 'right atrioventricular', 'right av/ tricuspid'],
        explanation: 'Model answer: Right AV / tricuspid.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 3' } },
      { type: 'cloze', prompt: 'The region of the chest situated between the two pleural cavities is called the ______.', accept: ['mediastinum'],
        explanation: 'Model answer: mediastinum. The arch of the aorta lies in its superior part.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A question asks which valves are closed while the two ventricles are contracting. Reason it out from what the AV valves are for.',
        model: 'The AV valves are closed. They separate atria from ventricles, so when the ventricles contract the AV valves must shut to stop blood going back into the atria; the semilunar valves open at the same time to let blood out into the aorta and pulmonary trunk.',
        rubric: ['Identifies the AV valves as closed', 'Explains preventing backflow into the atria', 'Notes the semilunar valves are open'] },
    ],
    commonMistakes: [
      'Counting the pericardium as a layer of the heart wall.',
      'Calling the left AV valve semilunar — it is bicuspid (mitral).',
    ],
    sourceRefs: [{ ref: 'hss.1.2', location: 'Cardiopulmonary system and associated structures' }, { ref: 'hss.manual1920', location: 'Submodule 1.2 guiding questions, p.19' }, { ref: 'hss.revans', location: 'Module 1.2 answers' }],
  },
  {
    id: 'hss2011-m1-lungs-airway',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Pleura, lung surfaces and the upper airway',
    tags: ['thorax'],
    lesson: {
      explanation: 'The visceral pleura covers the surface of the lungs; the parietal pleura lines the thoracic cavity. The hilum of the lung is on the mediastinal surface. Type II pneumocytes produce pulmonary surfactant in the alveoli. Among the laryngeal cartilages, the thyroid cartilage is the largest, and the epiglottis is the structure most important in keeping food out of the trachea. Bronchial arteries supply oxygenated blood to the lungs and bronchi themselves.',
      keyFacts: [
        'Visceral pleura covers the lung surface; parietal pleura lines the thoracic cavity.',
        'The hilum of the lung is on the mediastinal surface.',
        'Type II pneumocytes produce pulmonary surfactant.',
        'Thyroid cartilage is the largest laryngeal cartilage.',
        'The epiglottis is most important in keeping food out of the trachea.',
        'Bronchial arteries supply the lung tissue itself.',
        'The main muscles of forced expiration include the diaphragm and external intercostal muscles.',
      ],
      prerequisites: ['hss2011-m1-heart-wall-valves'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Viscus means an internal organ, so visceral pleura is the layer stuck to the organ. Paries means a wall, so parietal pleura lines the wall.',
      comparison: 'Bronchial arteries feed the lung tissue; pulmonary arteries bring blood to be oxygenated. One is plumbing for the organ, the other is cargo passing through.',
      visualCue: 'Picture pushing your fist into a balloon: your fist is the lung, the layer touching it is visceral, the outer layer is parietal, and the thin gap between is the pleural cavity.',
    },
    practice: [
      { type: 'mcq', prompt: 'Visceral pleura can be found ____________.', options: ['Lining the surface of the thoracic cavity', 'Covering the surface of the lungs', 'Attached to the diaphragm', 'None of the above'], answer: 1,
        explanation: 'Model answer B. Visceral pleura covers the lung; the parietal layer lines the cavity and covers the diaphragm.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 1' } },
      { type: 'mcq', prompt: 'The cells that produce pulmonary surfactant in the alveoli are the:', options: ['Alveolar macrophages', 'Squamous epithelial cells', 'Type II pneumocytes', 'Goblet cells'], answer: 2,
        explanation: 'Model answer C. Alveolar macrophages clear debris; type II pneumocytes make surfactant.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 2' } },
      { type: 'mcq', prompt: 'The hilum of the lung is located on the ___________.', options: ['Cardiac notch', 'Mediastinal surface', 'Costal surface', 'Base of the lung'], answer: 1,
        explanation: 'Model answer B. The hilum faces the mediastinum, which is where the root structures enter and leave.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 3' } },
      { type: 'mcq', prompt: 'Which of the following is most important in keeping food out of the trachea?', options: ['Extrinsic muscles of the larynx', 'Glottis', 'Epiglottis', 'Soft palate'], answer: 2,
        explanation: 'Model answer C. The epiglottis folds over the laryngeal inlet during swallowing.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 5' } },
      { type: 'cloze', prompt: 'The artery that supplies oxygenated blood to the lungs and bronchi is called the ______.', accept: ['bronchial artery', 'bronchial arteries', 'bronchial'],
        explanation: 'Model answer: bronchial arteries. They nourish lung tissue, unlike the pulmonary arteries which carry blood for gas exchange.',
        src: { ref: 'hss.revans', location: 'Module 1.1, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does the lung need bronchial arteries at all when it already receives the entire output of the right ventricle?',
        model: 'The pulmonary arteries carry deoxygenated blood that is passing through the lung to be oxygenated — that blood is cargo, not supply. The lung tissue itself, including the bronchial walls, needs its own oxygenated supply, and that is what the bronchial arteries provide.',
        rubric: ['Distinguishes blood passing through from blood supplying the tissue', 'Names the bronchial arteries as the tissue supply'] },
    ],
    commonMistakes: [
      'Swapping visceral and parietal pleura.',
      'Assuming the pulmonary arteries nourish the lung tissue.',
    ],
    sourceRefs: [{ ref: 'hss.1.1', location: 'Cardiovascular system and lungs' }, { ref: 'hss.manual1920', location: 'Submodule 1.1 guiding questions, p.17' }, { ref: 'hss.revans', location: 'Module 1.1 answers' }],
  },
  {
    id: 'hss2011-m2-cns-basics',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Spinal cord, roots and cortical surface',
    tags: ['neuroanatomy', 'high-yield'],
    lesson: {
      explanation: 'The ventral root of a spinal nerve carries motor information away from the spinal cord; sensory information travels in through the dorsal root. The spinal cord begins at the foramen magnum and ends at the L1 or L2 level. On the cerebrum, the elevated ridges of the cortical surface are gyri and the grooves between them are sulci; the central sulcus separates the sensory and motor areas. The tentorium cerebelli is the connective tissue sheet separating the cerebrum from the cerebellum, and the subarachnoid space, between arachnoid mater and pia mater, is filled with cerebrospinal fluid.',
      keyFacts: [
        'Ventral root = motor, away from the cord. Dorsal root = sensory, toward the cord.',
        'The spinal cord runs from the foramen magnum to L1 or L2.',
        'Gyri are ridges; sulci are grooves. The central sulcus separates sensory from motor areas.',
        'Tentorium cerebelli separates cerebrum from cerebellum.',
        'Subarachnoid space lies between arachnoid and pia mater and holds CSF.',
        'The white communicating ramus carries sympathetic preganglionic fibres to a sympathetic chain ganglion.',
        'A Purkinje cell is the large pear-shaped neuron of the cerebellum.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      mnemonic: 'Ventral is toward the front, and you move forward — ventral root is motor. Dorsal is the back, where sensation comes in over your shoulder.',
      chunking: 'Gyrus has a bump in the middle of the word if you picture the G as a curl. Sulcus sinks — both start with S.',
      location: 'The cord stops at L1–L2 but the vertebral column keeps going, which is exactly why a lumbar puncture below that level is safe.',
    },
    practice: [
      { type: 'mcq', prompt: 'The ventral root of a spinal nerve transmits ________ information ________ the spinal cord.', options: ['Sensory; toward', 'Sensory; away from', 'Motor; toward', 'Motor; away from'], answer: 3,
        explanation: 'Model answer D. Motor fibres leave through the ventral root; sensory fibres enter through the dorsal root.',
        src: { ref: 'hss.revans', location: 'Module 2.1, MCQ 1' } },
      { type: 'mcq', prompt: 'The spinal cord begins at the foramen magnum and ends at the ________.', options: ['C7 or C8 level', 'T9 or T10 level', 'L1 or L2 level', 'S4 or S5 level'], answer: 2,
        explanation: 'Model answer C. The cord ends at L1–L2 while the vertebral canal continues below it.',
        src: { ref: 'hss.revans', location: 'Module 2.1, MCQ 2' } },
      { type: 'mcq', prompt: 'The cortical surface of the cerebral hemispheres forms a series of elevated ridges called ______.', options: ['Nuclei', 'Sulci', 'Gyri', 'Lobes'], answer: 2,
        explanation: 'Model answer C. Gyri are the ridges; sulci are the grooves between them.',
        src: { ref: 'hss.revans', location: 'Module 2.1, MCQ 4' } },
      { type: 'cloze', prompt: 'The ______ is a connective tissue sheet that separates the cerebrum from the cerebellum.', accept: ['tentorium cerebelli', 'tentorium'],
        explanation: 'Model answer: tentorium cerebelli.',
        src: { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 1' } },
      { type: 'cloze', prompt: 'The gap between the arachnoid mater and the pia mater, filled with cerebrospinal fluid, is the ______ space.', accept: ['subarachnoid'],
        explanation: 'Model answer: subarachnoid.',
        src: { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Why is a lumbar puncture performed below the L2 level?',
        model: 'Because the spinal cord itself ends at L1 or L2. Below that the vertebral canal contains only the cauda equina in cerebrospinal fluid within the subarachnoid space, so a needle can sample the fluid without risking the cord.',
        rubric: ['States the cord ends at L1–L2', 'Names the subarachnoid space as the fluid compartment'] },
    ],
    commonMistakes: [
      'Reversing ventral (motor out) and dorsal (sensory in).',
      'Swapping gyri and sulci.',
    ],
    sourceRefs: [{ ref: 'hss.2.2', location: 'Nervous system and special sense' }, { ref: 'hss.manual1920', location: 'Submodule 2.1 revision exercises, p.27' }, { ref: 'hss.revans', location: 'Module 2.1 answers' }],
  },
  {
    id: 'hss2011-m2-brain-regions',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Brain regions, glia and CSF drainage',
    tags: ['neuroanatomy'],
    lesson: {
      explanation: 'Blood and cerebrospinal fluid drain from the brain into the dural sinuses. The thalamus forms the walls of the diencephalon around the third ventricle. In the peripheral nervous system it is the Schwann cells that provide the myelin sheath, whereas oligodendrocytes do that job in the CNS. The parietal lobe is primarily sensory. Wernicke’s area is not a limbic structure — hippocampus, cingulate gyrus and amygdala are. The interventricular foramen connects the lateral ventricle to the third ventricle, the corpus callosum is the principal commissural tract linking the hemispheres, the trigeminal nerve controls the muscles of mastication, the vagus is the longest cranial nerve, and the reticular formation is the loosely organised web of grey matter running vertically through all levels of the brainstem.',
      keyFacts: [
        'Blood and CSF drain from the brain into the dural sinuses.',
        'The thalamus forms the walls of the diencephalon around the third ventricle.',
        'Schwann cells myelinate in the PNS; oligodendrocytes myelinate in the CNS.',
        'The parietal lobe is primarily sensory.',
        'Limbic structures include hippocampus, cingulate gyrus and amygdala — Wernicke’s area is not one.',
        'Interventricular foramen: lateral ventricle → third ventricle.',
        'Corpus callosum: principal commissural tract between the hemispheres.',
        'Trigeminal nerve → muscles of mastication. Vagus nerve → the longest cranial nerve.',
        'Reticular formation: grey matter running vertically through all levels of the brainstem.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: [],
    },
    memory: {
      comparison: 'Schwann for the PNS, Oligodendrocyte for the CNS. One Schwann cell wraps one segment out in the periphery; one oligodendrocyte reaches several axons centrally.',
      wordOrigin: 'Commissure means a joining. The corpus callosum is literally the "tough body" that joins the two hemispheres.',
      firstLetter: 'Limbic trio to remember: Hippocampus, Amygdala, Cingulate gyrus. Wernicke’s area is language cortex and does not belong.',
    },
    practice: [
      { type: 'mcq', prompt: 'Blood and cerebrospinal fluid drain from the brain in the ______.', options: ['Ventricles', 'Subarachnoid space', 'Dural sinuses', 'Epidural space'], answer: 2,
        explanation: 'Model answer C. The dural venous sinuses are the drainage route out of the cranial cavity.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 1' } },
      { type: 'mcq', prompt: 'Which of the following cells provide the myelin sheath for neurons in the PNS?', options: ['Astrocytes', 'Oligodendrocytes', 'Microglia', 'Schwann cells'], answer: 3,
        explanation: 'Model answer D. Schwann cells myelinate peripheral axons; oligodendrocytes do the same job centrally.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 3' } },
      { type: 'mcq', prompt: 'All of the following are structures of the limbic system except the:', options: ['Hippocampus', 'Cingulate gyrus', 'Wernicke’s area', 'Amygdala'], answer: 2,
        explanation: 'Model answer C. Wernicke’s area is a language region of the cerebral cortex, not part of the limbic system.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 5' } },
      { type: 'cloze', prompt: 'The ______ ______ connects the lateral ventricle to the third ventricle.', accept: ['interventricular foramen'],
        explanation: 'Model answer: interventricular foramen.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 2' } },
      { type: 'cloze', prompt: '______ controls movement of the muscles of mastication.', accept: ['trigeminal nerve', 'trigeminal', 'cn v', 'trigeminal nerve (cn v)'],
        explanation: 'Model answer: trigeminal nerve. Note the facial nerve (CN VII) supplies facial expression instead, including frontalis.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient cannot chew but their facial expression is normal. Which cranial nerve is affected, and which one is intact?',
        model: 'The trigeminal nerve is affected, because it controls the muscles of mastication. The facial nerve is intact — it innervates the muscles of facial expression, including frontalis, which is a separate answer in the same module.',
        rubric: ['Names trigeminal for mastication', 'Names facial for expression', 'Keeps the two functions apart'] },
    ],
    commonMistakes: [
      'Mixing up trigeminal (chewing) and facial (expression).',
      'Putting Wernicke’s area in the limbic system because it sounds anatomical rather than cortical.',
    ],
    sourceRefs: [{ ref: 'hss.2.3', location: 'Neuroanatomy lecture' }, { ref: 'hss.manual1920', location: 'Submodule 2.3 revision exercises, p.31–32' }, { ref: 'hss.revans', location: 'Module 2.3 answers' }],
  },
  {
    id: 'hss2011-m3-digestive',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Digestive tract — regions, layers and the portal route',
    tags: ['abdomen', 'high-yield'],
    lesson: {
      explanation: 'Of the parts of the gut, the ileum is the longest. Gastric pits sit in the mucosa of the stomach wall, and the stomach uniquely has a third muscle layer, the oblique muscle, overlying the mucosa. Teniae coli are found in the colon. The parotid is the largest salivary gland. A hepatic lobule contains six hepatic triads. Most of the digestive tract is lined by simple columnar epithelium. The cardiac orifice is where the oesophagus enters the stomach, the duodenojejunal junction is the boundary between duodenum and jejunum, and nutrients absorbed in the gut travel to the liver through the hepatic portal vein.',
      keyFacts: [
        'Longest part of the gut: ileum.',
        'Gastric pits are in the mucosa.',
        'The stomach has a third, oblique muscle layer overlying the mucosa.',
        'Teniae coli: colon.',
        'Largest salivary gland: parotid.',
        'Six hepatic triads per hepatic lobule.',
        'Most of the digestive tract is lined by simple columnar epithelium.',
        'Cardiac orifice = oesophagus into stomach. Duodenojejunal junction = duodenum into jejunum.',
        'Nutrients travel from gut to liver through the hepatic portal vein; venous return from the liver to the heart is by the hepatic vein.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      comparison: 'Hepatic portal vein goes INTO the liver carrying gut nutrients. Hepatic vein comes OUT of the liver to the heart. Portal means a gateway in; drop the word "portal" and you are heading out.',
      wordOrigin: 'Taenia is Latin for a ribbon or tape — teniae coli are the three ribbons of longitudinal muscle on the colon.',
      location: 'Walk the tube and name the door at each junction: cardiac orifice into the stomach, pylorus out of it, duodenojejunal junction into the jejunum.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which part of the gut has the longest length?', options: ['Oesophagus', 'Duodenum', 'Jejunum', 'Ileum'], answer: 3,
        explanation: 'Model answer D. The ileum is the longest segment.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 1' } },
      { type: 'mcq', prompt: 'Where are gastric pits located within the stomach wall?', options: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], answer: 0,
        explanation: 'Model answer A. Gastric pits are invaginations of the mucosal epithelium.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 2' } },
      { type: 'mcq', prompt: 'Teniae coli are found in which part of the digestive tract?', options: ['Jejunum', 'Cecum', 'Colon', 'Rectum'], answer: 2,
        explanation: 'Model answer C. Teniae coli are the longitudinal muscle bands of the colon.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 3' } },
      { type: 'mcq', prompt: 'The largest salivary gland is:', options: ['Submandibular gland', 'Parotid gland', 'Sublingual gland', 'Minor salivary gland'], answer: 1,
        explanation: 'Model answer B. The parotid is the largest of the three paired salivary glands.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 4' } },
      { type: 'cloze', prompt: 'Nutrients absorbed in the gut are transported to the liver through the ______.', accept: ['hepatic portal vein', 'portal vein', 'hepatic portal'],
        explanation: 'Model answer: hepatic portal vein. Do not confuse it with the hepatic vein, which drains the liver to the heart.',
        src: { ref: 'hss.revans', location: 'Module 3.1, Fill-in-blanks 5' } },
      { type: 'mcq', prompt: 'The venous return from the liver to the heart is by way of ________.', options: ['Portal vein', 'Hepatic portal vein', 'Hepatic vein', 'Superior mesenteric vein'], answer: 2,
        explanation: 'Model answer C. The hepatic vein carries blood out of the liver toward the inferior vena cava; the hepatic portal vein brings blood in from the gut.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'The Study Manual describes hepatic circulation as nutrients being carried to the liver for metabolism before reaching the body systems. Trace that path by vessel name, in and out.',
        model: 'Nutrients absorbed in the gut enter the hepatic portal vein, which carries them into the liver for metabolism. After processing, blood leaves the liver by the hepatic vein into the inferior vena cava and so on to the heart and the rest of the body.',
        rubric: ['Names hepatic portal vein inbound', 'Names hepatic vein outbound', 'Places metabolism in the liver between the two'] },
    ],
    commonMistakes: [
      'Using "hepatic vein" and "hepatic portal vein" interchangeably. They run in opposite directions.',
      'Placing gastric pits in the submucosa.',
    ],
    sourceRefs: [{ ref: 'hss.3.1', location: 'Digestive system lecture' }, { ref: 'hss.manual1920', location: 'Module 3.1 revision exercises, p.33; Module 3.3 p.37' }, { ref: 'hss.revans', location: 'Module 3.1 and 3.3 answers' }],
  },
  {
    id: 'hss2011-m3-urogenital-pelvis',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Urinary tract, pelvis and abdominal landmarks',
    tags: ['abdomen', 'pelvis'],
    lesson: {
      explanation: 'The arcuate arteries arch along the boundary between the cortex and medulla of the kidney. The cervical canal is the passageway between the internal os and the external os. The detrusor is the powerful muscle in the muscularis layer of the bladder wall, and a calyx is the cup-shaped drain receiving urine discharged from a renal papilla. Regionally, the pylorus of the stomach lies at the level of L1, the oesophagus pierces the diaphragm at the level of T10, the fundus is the most superior part of the stomach, the ureters penetrate the posterior wall of the bladder, and the posterior abdominal wall is mainly formed by psoas, quadratus lumborum and erector spinae. The uterine artery, unlike the suprarenal, testicular and ovarian arteries, does not originate from the aorta. The female pelvis is not more massive than the male pelvis — it is lighter, with an obtuse subpubic arch and an oval shape.',
      keyFacts: [
        'Arcuate arteries arch at the corticomedullary boundary of the kidney.',
        'Cervical canal runs between the internal os and external os.',
        'Detrusor = bladder wall muscle. Calyx = cup receiving urine from a renal papilla.',
        'Pylorus at L1; oesophagus pierces the diaphragm at T10.',
        'Fundus is the most superior part of the stomach.',
        'Ureters enter the posterior wall of the bladder.',
        'Posterior abdominal wall: psoas, quadratus lumborum, erector spinae.',
        'The uterine artery does not arise from the aorta.',
        'Ureteric stones commonly obstruct at the ureteropelvic junction, at the crossing of the external iliac vessels / pelvic brim, and where the ureter enters the bladder.',
      ],
      prerequisites: ['hss2011-m3-digestive'],
      examples: [],
    },
    memory: {
      chunking: 'Vertebral levels worth owning: T10 oesophageal hiatus, L1 pylorus. Two numbers, two doorways.',
      mnemonic: 'Three narrow points where a stone sticks: where the ureter starts, where it crosses the pelvic brim, and where it ends. Start, cross, finish.',
      wordOrigin: 'Detrusor comes from the Latin for "to push down" — the muscle that pushes urine out.',
    },
    practice: [
      { type: 'mcq', prompt: 'The arterial vessel arching along the boundary between the cortex and medulla of the kidney is:', options: ['Interlobar arteries', 'Arcuate arteries', 'Cortical radiate arteries', 'Afferent arterioles'], answer: 1,
        explanation: 'Model answer B. "Arcuate" means arched, which is exactly what they do at the corticomedullary junction.',
        src: { ref: 'hss.revans', location: 'Module 3.2, MCQ 1' } },
      { type: 'mcq', prompt: 'The pylorus of the stomach is at the level of ______.', options: ['Xiphoid process', 'L1', 'L3', 'L5'], answer: 1,
        explanation: 'Model answer B. L1 is the transpyloric level.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 1' } },
      { type: 'mcq', prompt: 'Which statement is FALSE about the female pelvis?', options: ['It is more massive than the male pelvis', 'The subpubic arch is in an obtuse angle', 'It is oval in shape', 'The ischial spine is less pointed into the outlet'], answer: 0,
        explanation: 'Model answer A. The female pelvis is the lighter of the two; the other three statements are true of it.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 3' } },
      { type: 'mcq', prompt: 'The ________ does not originate from the aorta.', options: ['Suprarenal artery', 'Testicular artery', 'Uterine artery', 'Ovarian artery'], answer: 2,
        explanation: 'Model answer C. Suprarenal, testicular and ovarian arteries all come off the aorta; the uterine artery does not.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 4' } },
      { type: 'cloze', prompt: 'The oesophagus pierces through the diaphragm at the level of ______.', accept: ['t10', 'the 10th thoracic vertebra', '10th thoracic vertebra', 'the 10th thoracic vertebra (t10)'],
        explanation: 'Model answer: the 10th thoracic vertebra (T10).',
        src: { ref: 'hss.revans', location: 'Module 3.3, Fill-in-blanks 2' } },
      { type: 'cloze', prompt: 'The posterior abdominal wall is mainly formed by the ______, ______ and ______ muscles.', accept: ['psoas; quadratus lumborum; erector spinae', 'psoas, quadratus lumborum, erector spinae'],
        explanation: 'Model answer: psoas, quadratus lumborum, erector spinae.',
        src: { ref: 'hss.revans', location: 'Module 3.3, Fill-in-blanks 1' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Name the three sites where a ureteric stone typically gets stuck, and say what they have in common.',
        model: 'The ureteropelvic junction, where the ureter crosses the external iliac vessels at the pelvic brim, and where the ureter enters the urinary bladder. All three are natural narrowings along the ureter’s course — the tube is not uniformly wide.',
        rubric: ['Names all three sites', 'Identifies them as points of narrowing'] },
    ],
    commonMistakes: [
      'Assuming the female pelvis is the heavier one because it must carry a pregnancy — it is the lighter, broader one.',
      'Assuming every abdominal artery arises from the aorta.',
    ],
    sourceRefs: [{ ref: 'hss.3.2', location: 'Urogenital system lecture' }, { ref: 'hss.3.3', location: 'Regional anatomy of the abdominopelvic region' }, { ref: 'hss.revans', location: 'Module 3.2 and 3.3 answers; More exercises Module 3' }],
  },
];

/* ------------------------------------------------------------------ *
 * Study items — ABCT2326 Human Physiology
 * ------------------------------------------------------------------ */

const PHYS_ITEMS = [
  {
    id: 'abct2326-cells-organisation',
    subject: 'ABCT2326', unit: 'phys.cells', type: 'sequence',
    title: 'Cell → tissue → organ → system',
    tags: ['foundation', 'high-yield'],
    lesson: {
      explanation: 'Tissues are structures with discrete structural and functional properties. Tissues in combination form organs such as the heart or the liver, and organs can be grouped into eleven organ systems: integumentary, nervous, endocrine, skeletal, muscular, circulatory, immune, respiratory, urinary, digestive and reproductive. There are four types of tissue: epithelial, connective, muscle and neural. Cells themselves split into somatic cells — all body cells — and sex or germ cells, the sperm and the oocyte.',
      keyFacts: [
        'Four tissue types: epithelial, connective, muscle, neural.',
        'Eleven organ systems: integumentary, nervous, endocrine, skeletal, muscular, circulatory, immune, respiratory, urinary, digestive, reproductive.',
        'Somatic cells are all body cells; sex (germ) cells are sperm and oocyte.',
        'Epithelial characteristics: cellularity, polarity, attachment to a basement membrane, avascularity, regeneration.',
        'Epithelial functions: physical protection, control permeability, provide sensation, produce specialised secretions.',
        'Blood is a connective tissue.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      sequence: 'Four levels, each one built from the level below: cell → tissue → organ → system. Never skip a rung when you answer.',
      firstLetter: 'Four tissues: Epithelial, Connective, Muscle, Neural — E-C-M-N.',
      comparison: 'Blood catches people out. It is connective tissue, not muscle and not epithelial, because connective tissue is defined by cells scattered in a matrix — and plasma is the matrix.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the levels of body organisation from smallest to largest.', items: ['Cell', 'Tissue', 'Organ', 'Organ system'],
        explanation: 'Tissues have discrete structural and functional properties, tissues in combination form organs, and organs are grouped into the eleven organ systems.' },
      { type: 'mcq', prompt: 'Blood is an example of which of the following tissue categories?', options: ['Muscle', 'Nervous', 'Connective', 'Epithelial'], answer: 2,
        explanation: 'Model answer C from the HSS2011 Module 0 revision exercise. Connective tissue is cells within a matrix, and in blood the matrix is plasma.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 3' } },
      { type: 'typed', prompt: 'How many organ systems does the lecture group organs into?', accept: ['11', 'eleven'],
        explanation: 'Eleven: integumentary, nervous, endocrine, skeletal, muscular, circulatory, immune, respiratory, urinary, digestive and reproductive.' },
      { type: 'cloze', prompt: 'The four types of tissue are ______, ______, ______ and ______.', accept: ['epithelial; connective; muscle; neural', 'epithelial, connective, muscle, neural', 'epithelial connective muscle nervous'],
        explanation: 'Epithelial, connective, muscle and neural tissue.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Epithelium is described as avascular. Given that, how does it get oxygen, and what does that imply about how thick an epithelium can be?',
        model: 'Because epithelia have no blood vessels of their own, they depend on diffusion from the vascular connective tissue beneath the basement membrane. That limits how thick a living epithelial layer can be — anything beyond diffusion distance cannot be supported.',
        rubric: ['States avascularity means no own vessels', 'Names diffusion from underlying tissue', 'Draws the thickness consequence'] },
    ],
    commonMistakes: [
      'Calling blood a muscle or an epithelial tissue.',
      'Listing organ systems from memory of another course; this lecture names eleven specific ones.',
    ],
    sourceRefs: [{ ref: 'phys.1', location: 'Slides 33–35 "An Introduction to Tissues", "Epithelial Tissue"' }, { ref: 'hss.revans', location: 'HSS2011 Module 0, MCQ 3' }],
  },
  {
    id: 'abct2326-homeostasis',
    subject: 'ABCT2326', unit: 'phys.cells', type: 'explain',
    title: 'Homeostasis and the feedback loop',
    tags: ['foundation', 'high-yield'],
    lesson: {
      explanation: 'Homeostasis is all body systems working together to maintain a stable internal environment; systems respond to external and internal changes so the body functions within a normal range, for example body temperature and fluid balance. Regulation happens two ways: autoregulation, an intrinsic and automatic response within a cell, tissue or organ to an environmental change; and extrinsic regulation, controlled by the nervous and endocrine systems. Any homeostatic loop has three parts — a receptor that receives the stimulus, a control centre that processes the signal and sends instructions, and an effector that carries out the instructions. Negative and positive feedback are the two forms this regulation takes.',
      keyFacts: [
        'Homeostasis = all systems working together to keep a stable internal environment within a normal range.',
        'Autoregulation (intrinsic): automatic response within a cell, tissue or organ.',
        'Extrinsic regulation: controlled by nervous and endocrine systems.',
        'Loop components: receptor → control centre → effector.',
        'Negative and positive feedback are both involved in homeostatic regulation.',
      ],
      prerequisites: ['abct2326-cells-organisation'],
      examples: ['Body temperature and fluid balance are the two examples the lecture names.'],
    },
    memory: {
      sequence: 'Receptor, control centre, effector. Sense it, decide it, do it. Three words in that order answers most homeostasis questions.',
      chunking: 'Two kinds of control: the organ sorting itself out (intrinsic) or being told what to do by nerves and hormones (extrinsic).',
      teachBack: 'Explain a thermostat out loud using receptor / control centre / effector, then swap in the body’s own words. If the analogy breaks anywhere, that is the bit you have not learned.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the three components of a homeostatic regulation loop.', items: ['Receptor — receives the stimulus', 'Control centre — processes the signal and sends instructions', 'Effector — carries out instructions'],
        explanation: 'This is the order given on the homeostasis slide.' },
      { type: 'mcq', prompt: 'An automatic response within a single organ to a local environmental change, with no involvement of nerves or hormones, is:', options: ['Extrinsic regulation', 'Autoregulation', 'Positive feedback', 'Effector activity'], answer: 1,
        explanation: 'Autoregulation is defined as the intrinsic, automatic response in a cell, tissue or organ. Extrinsic regulation is the one that involves the nervous and endocrine systems.' },
      { type: 'typed', prompt: 'Which two body systems carry out extrinsic regulation?', accept: ['nervous and endocrine', 'nervous, endocrine', 'endocrine and nervous'],
        explanation: 'The nervous and endocrine systems.' },
    ],
    application: [
      { type: 'scenario', prompt: 'The renal lecture says sympathetic activity constricts the afferent arteriole to help maintain blood pressure. Is that autoregulation or extrinsic regulation, and how do you know?',
        model: 'Extrinsic regulation. Sympathetic activity is nervous-system control coming from outside the kidney, and extrinsic regulation is defined as responses controlled by the nervous and endocrine systems. The kidney’s own intrinsic autoregulation is a separate mechanism named alongside it in the same lecture.',
        rubric: ['Chooses extrinsic', 'Names the nervous system as the controller', 'Contrasts with intrinsic autoregulation'] },
    ],
    commonMistakes: [
      'Treating homeostasis as "keeping things constant" — the lecture says within a normal range, not at a fixed point.',
      'Forgetting that positive feedback is also part of homeostatic regulation, not an error state.',
    ],
    sourceRefs: [{ ref: 'phys.1', location: 'Slides 58–59 "Homeostasis", "Mechanisms of Regulation"; learning outcomes 4-3 and 4-4' }, { ref: 'phys.5', location: 'Slides 18–19 regulation of GFR — worked example of intrinsic vs extrinsic' }],
  },
  {
    id: 'abct2326-cvs-circuits',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'sequence',
    title: 'Pulmonary and systemic circuits',
    tags: ['cardiovascular', 'high-yield'],
    lesson: {
      explanation: 'The pulmonary circulation is the path of blood from the right ventricle through the lungs and back to the heart. The systemic circulation is the path from the left ventricle to the body and back. Blood coming from the tissues enters the superior and inferior vena cavae, which empty into the right atrium, then the right ventricle, which pumps it through the pulmonary arteries to the lungs. Oxygenated blood returns from the lungs through the pulmonary veins to the left atrium, then the left ventricle, which pumps it through the aorta to the body. The rate of flow through the systemic circulation equals the flow rate through the pulmonary circuit.',
      keyFacts: [
        'Pulmonary circuit: right ventricle → lungs → back to the heart.',
        'Systemic circuit: left ventricle → body → back to the heart.',
        'Full loop: vena cavae → right atrium → right ventricle → pulmonary arteries → lungs → pulmonary veins → left atrium → left ventricle → aorta.',
        'Flow through the systemic circuit equals flow through the pulmonary circuit.',
        'Right ventricle wall is thinner and pouch-shaped; the left ventricle is round and develops more pressure.',
      ],
      prerequisites: ['abct2326-cells-organisation'],
      examples: [],
    },
    memory: {
      sequence: 'Right side handles the short trip to the lungs, left side handles the long trip to the body. Thin wall for the short trip, thick wall for the long one — the structure follows the distance.',
      mnemonic: 'Pulmonary arteries are the only arteries carrying deoxygenated blood, and pulmonary veins the only veins carrying oxygenated blood. Artery means "away from the heart", not "oxygen-rich".',
      visualCue: 'Draw a figure of eight with the heart at the crossing point. Top loop is the lungs, bottom loop is the body.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the full circuit starting from blood returning from the tissues.',
        items: ['Superior and inferior vena cavae', 'Right atrium', 'Right ventricle', 'Pulmonary arteries → lungs', 'Pulmonary veins', 'Left atrium', 'Left ventricle', 'Aorta → body'],
        explanation: 'This is the sequence given on the "Pulmonary and Systemic Circulations" slide.' },
      { type: 'mcq', prompt: 'Which vessel carries deoxygenated blood away from the heart?', options: ['Aorta', 'Pulmonary vein', 'Pulmonary artery', 'Superior vena cava'], answer: 2,
        explanation: 'The pulmonary artery carries blood from the right ventricle to the lungs to be oxygenated. It is an artery because it leaves the heart, not because of what it carries.' },
      { type: 'explain', prompt: 'Why is the left ventricle wall thicker than the right?',
        model: 'The right ventricle pumps only to the lungs and develops less pressure, so its wall is thinner and pouch-shaped. The left ventricle pumps into the systemic circuit against much higher resistance, so it is round and thick-walled.',
        rubric: ['Links the right ventricle to the short pulmonary circuit', 'Links the left ventricle to the systemic circuit and higher pressure'] },
    ],
    application: [
      { type: 'scenario', prompt: 'If the systemic and pulmonary flow rates must be equal, what would happen over a few minutes if the right ventricle consistently pumped slightly more than the left?',
        model: 'Blood would accumulate in the pulmonary circuit, because more is entering the lungs than is leaving them for the systemic side. The lecture states the two rates are equal precisely because the circuits are in series — any mismatch builds up on one side.',
        rubric: ['Identifies accumulation in the pulmonary circuit', 'Explains the circuits are in series'] },
    ],
    commonMistakes: [
      'Assuming arteries always carry oxygenated blood — the pulmonary artery is the exception.',
      'Reversing the two circuits by starting from the left ventricle when asked about pulmonary flow.',
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 18–20 "An Introduction to the Cardiovascular System", "Pulmonary and Systemic Circulations"; Figure 20-1' }],
  },
  {
    id: 'abct2326-cvs-heart-structure',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'diagram',
    title: 'Heart chambers, valves and the cardiac skeleton',
    tags: ['cardiovascular', 'high-yield'],
    lesson: {
      explanation: 'The heart has four chambers: two atria receive blood from the venous system and two ventricles pump blood to the arteries, with the two sides separated by a muscular septum. Blood flows from atria into ventricles through the one-way atrioventricular valves — the tricuspid on the right, the bicuspid or mitral on the left. The semilunar valves, pulmonary and aortic, prevent backflow from the pulmonary arteries and the aorta into the right and left ventricles. Valve opening and closing results from pressure differences. The AV valves are stopped from everting by the papillary muscles, which connect to them by the chordae tendineae. Between atria and ventricles sits the cardiac (fibrous) skeleton, a layer of dense connective tissue that encircles the heart valves and the bases of the pulmonary trunk and aorta; it separates the ventricles from the atria both structurally and electrically.',
      keyFacts: [
        'Four chambers: two atria receive, two ventricles pump.',
        'Right AV valve = tricuspid. Left AV valve = bicuspid / mitral.',
        'Semilunar valves = pulmonary and aortic.',
        'Papillary muscles hold the AV valves via chordae tendineae.',
        'Cardiac (fibrous) skeleton encircles the valves and electrically insulates the ventricular cells from the atrial cells.',
        'Heart wall layers: epicardium (visceral pericardium), myocardium, endocardium.',
        'Intercalated discs join cardiac muscle cells, secured by desmosomes and linked by gap junctions.',
      ],
      prerequisites: ['abct2326-cvs-circuits'],
      examples: [],
    },
    memory: {
      mnemonic: 'TRI before you BI — Tricuspid is on the Right, Bicuspid on the Left. Say it as "tri-right".',
      visualCue: 'Chordae tendineae are the guy-ropes of a tent; the papillary muscles are the pegs. Pressure tries to blow the valve inside out and the ropes hold.',
      chunking: 'Two valve families: AV valves between atrium and ventricle, semilunar valves at the exits. Every valve question is really asking which family.',
    },
    practice: [
      { type: 'diagram', prompt: 'Label the heart: chambers and valves.', diagram: 'heart',
        labels: [
          { id: 'ra', label: 'Right atrium' },
          { id: 'rv', label: 'Right ventricle' },
          { id: 'la', label: 'Left atrium' },
          { id: 'lv', label: 'Left ventricle' },
          { id: 'tri', label: 'Tricuspid (right AV) valve' },
          { id: 'bi', label: 'Bicuspid (left AV) valve' },
          { id: 'pv', label: 'Pulmonary valve' },
          { id: 'av', label: 'Aortic valve' },
        ],
        explanation: 'Chamber and valve names as given on the heart structure and valve slides.' },
      { type: 'typed', prompt: 'What structure electrically insulates the ventricular muscle cells from the atrial muscle cells?', accept: ['cardiac skeleton', 'fibrous skeleton', 'cardiac (fibrous) skeleton', 'fibrous cardiac skeleton'],
        explanation: 'The cardiac (fibrous) skeleton — a layer of dense connective tissue that separates the ventricles and atria structurally and electrically.' },
      { type: 'matching', prompt: 'Match each valve to its position.',
        pairs: [['Tricuspid valve', 'Right atrium to right ventricle'], ['Bicuspid (mitral) valve', 'Left atrium to left ventricle'], ['Pulmonary valve', 'Right ventricle to pulmonary arteries'], ['Aortic valve', 'Left ventricle to aorta']],
        explanation: 'AV valves sit between atrium and ventricle; semilunar valves sit at the two ventricular exits.' },
      { type: 'explain', prompt: 'What stops the AV valves turning inside out when the ventricles contract hard?',
        model: 'The papillary muscles contract and hold the valve cusps through the chordae tendineae. The high pressure of ventricular contraction is prevented from everting the AV valves by that arrangement.',
        rubric: ['Names papillary muscles', 'Names chordae tendineae', 'Links to ventricular contraction pressure'] },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does the heart need the cardiac skeleton to be electrically insulating, given that gap junctions elsewhere are there to spread the signal?',
        model: 'Gap junctions in the intercalated discs let an action potential spread through a mass of cardiac muscle so it contracts together. But atria and ventricles must contract in sequence, not simultaneously, so the cardiac skeleton blocks direct spread between them and forces the signal through the conducting system instead.',
        rubric: ['Notes gap junctions spread signals within a mass', 'States atria and ventricles must fire in sequence', 'Names the cardiac skeleton as the block'] },
    ],
    commonMistakes: [
      'Putting the bicuspid valve on the right. Tricuspid is right.',
      'Calling the chordae tendineae muscles — they are cords; the papillary muscles are the muscular part.',
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 21–36 heart structure, AV valves, semilunar valves, functions of the valves; Figures 20-4, 20-5, 20-8' }],
  },
  {
    id: 'abct2326-resp-pathway',
    subject: 'ABCT2326', unit: 'phys.resp', type: 'sequence',
    title: 'The respiratory pathway and its two zones',
    tags: ['respiratory', 'high-yield'],
    lesson: {
      explanation: 'The respiratory system is divided at the larynx: the upper respiratory system is above it — nose, nasal cavity, sinuses and pharynx — and the lower respiratory system is below it — larynx, trachea, bronchus, bronchioles, smallest bronchioles and alveoli. The tract also divides functionally: the conducting portion runs from the nasal cavity to the terminal bronchioles, and the respiratory portion is the respiratory bronchioles and alveoli. The lecture gives five functions: providing an extensive gas-exchange surface between air and circulating blood, moving air to and from those surfaces, protecting the respiratory surfaces from the outside environment, producing sounds, and participating in the olfactory sense.',
      keyFacts: [
        'Split at the larynx: upper (nose, nasal cavity, sinuses, pharynx) vs lower (larynx, trachea, bronchi, bronchioles, alveoli).',
        'Conducting portion: nasal cavity → terminal bronchioles.',
        'Respiratory portion: respiratory bronchioles and alveoli.',
        'Airway branching: trachea → left/right primary bronchus → secondary bronchus → tertiary bronchi → smaller bronchi → bronchioles → terminal bronchiole → respiratory bronchiole → alveoli.',
        'Five functions: gas exchange surface, air movement, protection, sound production, olfaction.',
      ],
      prerequisites: ['abct2326-cvs-circuits'],
      examples: [],
    },
    memory: {
      sequence: 'Two ways to cut the same tube. Anatomically at the larynx, functionally at the terminal bronchiole. If a question says "conducting", it wants the second cut.',
      chunking: 'Terminal bronchiole is the last stop of the conducting zone; respiratory bronchiole is the first stop of the respiratory zone. The word "respiratory" in the name is the signal that gas exchange has started.',
      firstLetter: 'Five functions: Exchange, Move, Protect, Sound, Smell.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the airway from the trachea down to the gas-exchange surface.',
        items: ['Trachea', 'Primary bronchus', 'Secondary bronchus', 'Tertiary bronchi', 'Bronchioles', 'Terminal bronchiole', 'Respiratory bronchiole', 'Alveoli'],
        explanation: 'This is the branching order given on the conducting/respiratory portion slide.' },
      { type: 'mcq', prompt: 'The conducting portion of the respiratory tract ends at the:', options: ['Alveoli', 'Respiratory bronchiole', 'Terminal bronchiole', 'Tertiary bronchus'], answer: 2,
        explanation: 'The conducting portion runs from the nasal cavity to the terminal bronchioles. The respiratory bronchiole is the first part of the respiratory portion.' },
      { type: 'typed', prompt: 'Which structure divides the upper from the lower respiratory system?', accept: ['larynx', 'the larynx'],
        explanation: 'The upper respiratory system is above the larynx and the lower respiratory system is below it.' },
      { type: 'cloze', prompt: 'List the parts of the respiratory system that belong to the conducting zone: ______.', accept: ['nostrils; pharynx; larynx; trachea; bronchial tree', 'nostrils, pharynx, larynx, trachea, bronchial tree'],
        explanation: 'Model answer from the HSS2011 revision key: nostrils; pharynx; larynx; trachea; bronchial tree.',
        src: { ref: 'hss.revans', location: 'Module 1.1, Fill-in-blanks 2' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A structure is named "respiratory bronchiole". What does the word "respiratory" in its name tell you about its wall, compared to a terminal bronchiole?',
        model: 'It tells you gas exchange happens there, so its wall must include alveoli. The terminal bronchiole is the last purely conducting segment and has no gas-exchange surface; the respiratory bronchiole is where the respiratory portion begins.',
        rubric: ['Links the name to gas exchange', 'Contrasts with the purely conducting terminal bronchiole'] },
    ],
    commonMistakes: [
      'Ending the conducting zone at the respiratory bronchiole instead of the terminal bronchiole.',
      'Placing the larynx in the upper respiratory system; the split is above the larynx.',
    ],
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 3–8 functions, organisation, the respiratory tract' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.1, Fill-in-blanks 2' }],
  },
  {
    id: 'abct2326-renal-nephron',
    subject: 'ABCT2326', unit: 'phys.renal', type: 'sequence',
    title: 'Nephron tubule and the urine pathway',
    tags: ['renal', 'high-yield'],
    lesson: {
      explanation: 'The nephron is the functional unit of the kidney, responsible for forming urine, with more than one million per kidney. The tubular part begins with the glomerular capsule, transitions into the proximal convoluted tubule, then the descending and ascending limbs of the loop of Henle, then the distal convoluted tubule, and ends where it empties into a collecting duct. The glomerular capsule surrounds the glomerulus and together they form the renal corpuscle, where glomerular filtration occurs. Beyond the nephron, urine flows from the kidneys into the ureters, which empty into the bladder, and the urethra drains urine from the bladder. Inside the kidney, the cortex contains many capillaries and the outer parts of nephrons, the medulla consists of renal pyramids separated by renal columns, and a pyramid contains minor calyces which unite to form a major calyx.',
      keyFacts: [
        'Nephron = functional unit of the kidney; >1 million per kidney.',
        'Tubule order: glomerular capsule → proximal convoluted tubule → descending limb → ascending limb → distal convoluted tubule → collecting duct.',
        'Renal corpuscle = glomerulus + glomerular (Bowman’s) capsule; the site of glomerular filtration.',
        'Gross path: kidney → ureter → bladder → urethra.',
        'Cortex holds capillaries and outer nephron parts; medulla holds renal pyramids separated by renal columns.',
        'Minor calyces unite to form a major calyx.',
        'GFR averages 115 ml/min in women and 125 ml/min in men — about 180 L/day, of which only 1–2 L is excreted.',
        'The bladder wall smooth muscle is the detrusor muscle.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      sequence: 'Capsule, proximal, down, up, distal, collect. Six stops — say them as a rhythm rather than a list.',
      chunking: 'Two journeys, not one. The tubule journey is inside the nephron; the drainage journey is calyx → pelvis → ureter → bladder → urethra. Questions usually want one or the other, rarely both.',
      wordOrigin: 'Calyx is Greek for the cup of a flower — cup-shaped drains catching urine from the papilla.',
      visualCue: '180 litres filtered, 1–2 litres out. Picture ninety two-litre bottles going in and one coming out; that is why reabsorption is most of what the tubule does.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the nephron tubule from the filtration site to the collecting duct.',
        items: ['Glomerular (Bowman’s) capsule', 'Proximal convoluted tubule', 'Descending limb of the loop of Henle', 'Ascending limb of the loop of Henle', 'Distal convoluted tubule', 'Collecting duct'],
        explanation: 'This is the order given on the "Nephron Tubules" slide.' },
      { type: 'sequence', prompt: 'Order the urine drainage pathway out of the body.', items: ['Kidney', 'Ureter', 'Urinary bladder', 'Urethra'],
        explanation: 'Urine flows from the kidneys into the ureters, which empty into the bladder; the urethra drains urine from the bladder.' },
      { type: 'typed', prompt: 'What is the functional unit of the kidney?', accept: ['nephron', 'the nephron'],
        explanation: 'The nephron — responsible for forming urine, with more than a million per kidney.' },
      { type: 'cloze', prompt: 'The glomerulus and the glomerular capsule together form the ______.', accept: ['renal corpuscle'],
        explanation: 'The renal corpuscle, where glomerular filtration occurs.' },
      { type: 'cloze', prompt: 'The powerful muscle in the muscularis layer of the bladder wall is called the ______.', accept: ['detrusor', 'detrusor muscle'],
        explanation: 'Model answer: detrusor.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 3.2, Fill-in-blanks 2' } },
    ],
    application: [
      { type: 'scenario', prompt: 'About 180 L of filtrate is produced per day but only 1–2 L of urine is excreted. What does that ratio tell you about the main job of the tubule?',
        model: 'Almost all of the filtered water and solute has to be reabsorbed, so the tubule’s dominant job is reabsorption rather than filtration. The lecture makes the same point directly: most filtered water must be reabsorbed or death would follow from water lost through urination.',
        rubric: ['Calculates or states that nearly all filtrate is reabsorbed', 'Names reabsorption as the dominant tubular function'] },
    ],
    commonMistakes: [
      'Putting the distal convoluted tubule before the loop of Henle.',
      'Treating the glomerulus alone as the renal corpuscle — the corpuscle is glomerulus plus capsule.',
    ],
    sourceRefs: [{ ref: 'phys.5', location: 'Slides 4–17 structure of the urinary system, kidney, nephron, nephron tubules, glomerular filtration, GFR' }, { ref: 'hss.revans', location: 'HSS2011 Module 3.2 answers' }],
  },
  {
    id: 'abct2326-digestive-pathway',
    subject: 'ABCT2326', unit: 'phys.dig', type: 'sequence',
    title: 'Digestive tract, accessory organs and the six functions',
    tags: ['digestive', 'high-yield'],
    lesson: {
      explanation: 'The major organs of the digestive tract in order are the oral cavity, pharynx, oesophagus, stomach, small intestine, large intestine and anus. The oral cavity handles ingestion, mechanical processing with the teeth and tongue, moistening and mixing with salivary secretions; the pharynx propels material into the oesophagus; the oesophagus transports it to the stomach; the stomach breaks material down chemically with acid and enzymes and mechanically through muscular contraction; the small intestine performs enzymatic digestion and absorption of water, organic substrates, vitamins and ions; the large intestine dehydrates and compacts indigestible material for elimination. The accessory organs are the teeth, tongue, salivary glands, liver, gallbladder and pancreas. The six functions of the digestive system are ingestion, mechanical processing, digestion, secretion, absorption and excretion.',
      keyFacts: [
        'Tract order: oral cavity → pharynx → oesophagus → stomach → small intestine → large intestine → anus.',
        'Accessory organs: teeth, tongue, salivary glands, liver, gallbladder, pancreas.',
        'Six functions: ingestion, mechanical processing, digestion, secretion, absorption, excretion.',
        'Liver secretes bile, important for lipid digestion; the gallbladder stores and concentrates bile.',
        'Pancreas: exocrine cells secrete buffers and digestive enzymes, endocrine cells secrete hormones.',
        'Absorption is movement across the digestive epithelium into the interstitial fluid of the tract.',
      ],
      prerequisites: ['abct2326-cells-organisation'],
      examples: [],
    },
    memory: {
      firstLetter: 'Six functions: Ingestion, Mechanical processing, Digestion, Secretion, Absorption, Excretion — I-M-D-S-A-E, roughly the order food actually experiences them.',
      comparison: 'Accessory organs are not part of the tube. Food never passes through the liver, gallbladder or pancreas — they deliver into the tube instead. That distinction is the usual exam hinge.',
      chunking: 'Tube first, then the three glands that feed into it. Six tube stations, six accessory organs.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the major organs of the digestive tract.',
        items: ['Oral cavity', 'Pharynx', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Anus'],
        explanation: 'This is the order given on the "Major Organs of the Digestive Tract" slide.' },
      { type: 'mcq', prompt: 'Which of these is an accessory organ rather than part of the digestive tract itself?', options: ['Stomach', 'Pancreas', 'Small intestine', 'Pharynx'], answer: 1,
        explanation: 'The pancreas is listed among the accessory organs of the digestive system. Food does not pass through it; it secretes buffers and enzymes into the tract.' },
      { type: 'matching', prompt: 'Match each accessory organ to the role the lecture gives it.',
        pairs: [['Liver', 'Secretion of bile, important for lipid digestion'], ['Gallbladder', 'Storage and concentration of bile'], ['Salivary glands', 'Lubricating fluid with enzymes that break down carbohydrates'], ['Pancreas', 'Exocrine buffers and enzymes; endocrine hormones']],
        explanation: 'These are the descriptions on the "Accessory Organs of the Digestive System" slide.' },
      { type: 'typed', prompt: 'Which digestive function is defined as the movement of organic substrates, electrolytes, vitamins and water across the digestive epithelium?', accept: ['absorption'],
        explanation: 'Absorption — across the epithelium into the interstitial fluid of the digestive tract.' },
    ],
    application: [
      { type: 'scenario', prompt: 'The large intestine is described as dehydrating and compacting indigestible material. What would you expect to happen if material passed through it too quickly?',
        model: 'It would not be dehydrated or compacted properly, so what is eliminated would still contain the water the large intestine normally reclaims. The lecture defines that reclamation as the large intestine’s specific job, distinct from the small intestine’s absorption of nutrients.',
        rubric: ['Names dehydration/compaction as the large intestine’s role', 'Predicts retained water in the eliminated material'] },
    ],
    commonMistakes: [
      'Counting the liver or pancreas as part of the tract.',
      'Attributing nutrient absorption to the large intestine; that is the small intestine’s role.',
    ],
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 2–6 major organs, accessory organs, six functions of the digestive system' }],
  },
  {
    id: 'abct2326-endocrine-delivery',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'comparison',
    title: 'Hormones and the four modes of delivery',
    tags: ['endocrine', 'high-yield'],
    lesson: {
      explanation: 'A hormone is a chemical that transfers information and instructions between cells. Hormones regulate growth and development, control the function of various tissues, support reproductive function and regulate metabolism. There are four classes of hormone delivery. Autocrine: the hormone feeds back on the same cell without entering blood circulation. Paracrine: it diffuses to adjacent target cells through the immediate extracellular space, with blood not directly involved. Endocrine: the most common, classical mode, where hormones are delivered to target cells by the blood circulation. Neuroendocrine: the hormone is produced and released by a neuron and delivered to targets by the bloodstream. Endocrine glands are ductless and secrete hormones into the bloodstream, where they travel to target cells containing receptor proteins for them.',
      keyFacts: [
        'Hormone = a chemical transferring information and instructions between cells.',
        'Four hormone functions: growth and development, control tissue function, support reproduction, regulate metabolism.',
        'Autocrine — same cell, no blood.',
        'Paracrine — adjacent cells through extracellular space, blood not directly involved.',
        'Endocrine — the classical mode, delivered by the blood.',
        'Neuroendocrine — produced by a neuron, delivered by the bloodstream.',
        'Endocrine glands are ductless; targets are defined by having the receptor protein.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Auto = self, para = beside, endo = within (the bloodstream), neuro = nerve. All four names describe the route, so translating the prefix gives you the answer.',
      chunking: 'Sort by whether blood is involved: autocrine and paracrine do not use it, endocrine and neuroendocrine do.',
      comparison: 'What makes a cell a target is not proximity but having the receptor protein. A hormone in the blood reaches every cell and acts only where the receptor is.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each delivery class to its route.',
        pairs: [['Autocrine', 'Feeds back on the same cell, no blood circulation'], ['Paracrine', 'Diffuses to adjacent cells through extracellular space'], ['Endocrine', 'Delivered to target cells by the blood circulation'], ['Neuroendocrine', 'Released by a neuron, delivered by the bloodstream']],
        explanation: 'These are the four classes of hormone delivery as defined in the endocrine lecture.' },
      { type: 'mcq', prompt: 'Which mode of hormone delivery does the lecture call the most common, classical mode?', options: ['Autocrine', 'Paracrine', 'Endocrine', 'Neuroendocrine'], answer: 2,
        explanation: 'Endocrine is described as the most common (classical) mode, with hormones delivered to target cells by blood circulation.' },
      { type: 'explain', prompt: 'A hormone circulates to every cell in the body. Why does it only affect some of them?',
        model: 'Because hormones act on target cells that contain receptor proteins for that hormone. Cells without the receptor are exposed to the hormone but cannot respond to it.',
        rubric: ['Names receptor proteins', 'States non-target cells lack the receptor'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A signalling molecule acts on the cell that released it and never enters the blood. Which class is that, and which other class is it most easily confused with?',
        model: 'That is autocrine. It is most easily confused with paracrine, because neither uses the blood — but paracrine acts on adjacent cells through the immediate extracellular space, whereas autocrine acts back on the same cell.',
        rubric: ['Names autocrine', 'Names paracrine as the confusable', 'Gives the same-cell vs adjacent-cell discriminator'] },
    ],
    commonMistakes: [
      'Treating "endocrine" as a synonym for any hormone signalling; it is one of four specific routes.',
      'Assuming nearness determines which cells respond rather than receptor presence.',
    ],
    sourceRefs: [{ ref: 'phys.7', location: 'Slides 3–7 "What is a Hormone?", "Hormone Function", "Classes of Hormone Delivery", "Endocrine Glands"' }],
  },
  {
    id: 'abct2326-blood-composition',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'definition',
    title: 'Blood composition and the vessel wall',
    tags: ['cardiovascular'],
    lesson: {
      explanation: 'Total blood volume is about 5 L, made of formed elements and plasma. Red blood cells make up most of the formed elements; the percentage of RBCs in a centrifuged sample is the haematocrit, 36–46% in women and 41–53% in men. Plasma is a straw-coloured liquid of water and dissolved solutes. Plasma proteins are 7–9% of plasma and come in three types: albumins, which are 60–80% and create the colloid osmotic pressure maintaining blood volume and pressure; globulins, which carry lipids and include the gamma globulins that are antibodies; and fibrinogen, the clotting factor converted to fibrin. Serum is the fluid left when blood clots. Every vessel has endothelium as its innermost layer; capillaries are made of endothelial cells alone, while arteries and veins have three layers — tunica externa (connective tissue), media (mostly smooth muscle) and interna (endothelium, basement membrane and elastin).',
      keyFacts: [
        'Total blood volume about 5 L.',
        'Haematocrit: 36–46% in women, 41–53% in men.',
        'Three plasma protein types: albumins (60–80%), globulins, fibrinogen.',
        'Albumin creates colloid osmotic pressure maintaining blood volume and pressure.',
        'Gamma globulins are antibodies; fibrinogen converts to fibrin.',
        'Serum is the fluid left when blood clots.',
        'RBCs are biconcave discs lacking nuclei and mitochondria; about 300 billion produced each day.',
        'Platelets are fragments of megakaryocytes, survive 5–9 days, and are not true cells.',
        'Vessel layers: tunica externa, media, interna; capillaries are endothelium only.',
        'Small arteries and arterioles provide most of the resistance in the circulatory system.',
      ],
      prerequisites: ['abct2326-cvs-circuits'],
      examples: [],
    },
    memory: {
      comparison: 'Plasma versus serum: serum is plasma minus the clotting factors, because they were used up making the clot. If fibrinogen is present, you are looking at plasma.',
      chunking: 'Three plasma proteins, three jobs: albumin holds water in, globulin carries and defends, fibrinogen clots.',
      visualCue: 'Three vessel layers from the outside in: externa is the coat, media is the muscle, interna is the lining. A capillary is just the lining with the coat and muscle stripped away.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which type of artery contains the most resilient vessel wall?', options: ['Arteriole', 'Muscular artery', 'Elastic artery', 'None of the above'], answer: 2,
        explanation: 'Model answer C. Large elastic arteries contain a great deal of elastin, expanding during systole and recoiling during diastole.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, MCQ 4' } },
      { type: 'typed', prompt: 'What is the fluid left when blood clots called?', accept: ['serum'],
        explanation: 'Serum — plasma with the clotting factors consumed.' },
      { type: 'matching', prompt: 'Match each plasma protein to its role.',
        pairs: [['Albumin', 'Creates colloid osmotic pressure maintaining blood volume'], ['Gamma globulin', 'Acts as an antibody'], ['Globulin', 'Carries lipids'], ['Fibrinogen', 'Clotting factor converted to fibrin']],
        explanation: 'These are the three plasma protein types and their functions from the plasma slide.' },
      { type: 'cloze', prompt: 'The innermost layer of every blood vessel is the ______.', accept: ['endothelium'],
        explanation: 'The endothelium. Capillaries are made of endothelial cells alone.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does a fall in plasma albumin cause fluid to leave the bloodstream?',
        model: 'Albumin creates the colloid osmotic pressure that maintains blood volume and pressure. With less albumin, that inward osmotic pull weakens, so fluid filtered out at the capillaries is not drawn back in as effectively.',
        rubric: ['Names colloid osmotic pressure', 'Attributes it to albumin', 'Links the loss to fluid leaving the circulation'] },
    ],
    commonMistakes: [
      'Using plasma and serum interchangeably.',
      'Assuming large arteries provide most of the resistance — the lecture says small arteries and arterioles do.',
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 6–17 composition of blood, plasma, formed elements, structure of blood vessels, arteries, capillaries, veins' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.2, MCQ 4' }],
  },
  {
    id: 'abct2326-msk-immune-overview',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'definition',
    title: 'Lymphoid tissue and where MALT sits',
    tags: ['immune'],
    lesson: {
      explanation: 'The lymphatic system picks up excess fluid filtered out in capillary beds and returns it to the veins, and its lymph nodes are part of the immune system. MALT — mucosa-associated lymphoid tissue — describes clusters of lymphoid nodules located in the mucosa layer of organs. The cisterna chyli is the expanded, sac-like chamber at the base of the thoracic duct, and lymph drainage is asymmetric: not everything drains into the left lymphatic duct.',
      keyFacts: [
        'The lymphatic system returns excess capillary filtrate to the veins; lymph nodes are part of the immune system.',
        'MALT clusters sit in the mucosa layer.',
        'The cisterna chyli is an expanded sac-like chamber at the base of the thoracic duct.',
        'Lymph drainage is not symmetrical — the right upper body drains separately from the rest.',
      ],
      prerequisites: ['abct2326-blood-composition'],
      examples: [],
    },
    memory: {
      wordOrigin: 'MALT spells out its own location: Mucosa-Associated Lymphoid Tissue. The first word is the answer.',
      location: 'Lymphoid tissue guards doorways. Mucosa is the layer facing the lumen — the doorway — so that is where the guards stand.',
    },
    practice: [
      { type: 'mcq', prompt: 'MALT describes clusters of lymphoid nodules located at which tissue layer of organs?', options: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], answer: 0,
        explanation: 'Model answer A. The name itself says mucosa-associated lymphoid tissue.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, MCQ 5' } },
      { type: 'cloze', prompt: '______ is an expanded, sac-like chamber located at the base of the thoracic duct.', accept: ['cisterna chyli', 'the cisterna chyli'],
        explanation: 'Model answer: cisterna chyli.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, Fill-in-blanks 5' } },
      { type: 'explain', prompt: 'What job does the lymphatic system do for the cardiovascular system?',
        model: 'It picks up the excess fluid that has been filtered out in the capillary beds and returns it to the veins, so the circulating volume is maintained. Its lymph nodes also form part of the immune system.',
        rubric: ['Names recovery of excess capillary filtrate', 'Names return to the veins'] },
    ],
    application: [
      { type: 'scenario', prompt: 'The HSS2011 revision exercise asks which organ does NOT drain into the left lymphatic duct, and the answer is the right eye. What general principle does that single answer encode?',
        model: 'That lymphatic drainage is asymmetric. The right upper quadrant of the body — including the right side of the head and the right upper limb — drains by a separate route, while everything else converges on the left. Knowing the exception is the way to remember the rule.',
        rubric: ['States drainage is asymmetric', 'Identifies the right upper body as the exception'] },
    ],
    commonMistakes: ['Assuming lymph drainage is symmetrical left and right.'],
    sourceRefs: [{ ref: 'phys.10', location: 'Immune system lecture' }, { ref: 'phys.2', location: 'Slide 4 "Circulatory System" — lymphatic role' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.2 and 1.3 answers' }],
  },
  {
    id: 'abct2326-nervous-divisions',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'definition',
    title: 'Divisions of the nervous system and classes of neuron',
    tags: ['nervous', 'high-yield'],
    lesson: {
      explanation: 'The nervous system provides information from the outside world — light, sounds, taste, touch — and keeps the body in a homeostatic condition, letting the brain know what is happening in the rest of the body. It divides into the central nervous system, the brain and spinal cord, and the peripheral nervous system, which subdivides into the somatic and autonomic nervous systems. Neurons come in three classes: sensory neurons conduct impulses from sensory receptors to the CNS; motor neurons conduct impulses from the CNS to target organs, muscles or glands; and association neurons, or interneurons, lie completely within the CNS and integrate the functions of the nervous system. Motor neurons split further: somatic motor neurons are responsible for reflexes and voluntary control of skeletal muscle, while autonomic motor neurons innervate involuntary targets such as smooth muscle, cardiac muscle and glands, through sympathetic and parasympathetic divisions.',
      keyFacts: [
        'CNS = brain + spinal cord. PNS = somatic + autonomic nervous systems.',
        'Sensory neurons: receptors → CNS.',
        'Motor neurons: CNS → target organs (muscles or glands).',
        'Association neurons / interneurons: entirely within the CNS, integrating function.',
        'Somatic motor neurons: reflexes and voluntary control of skeletal muscle.',
        'Autonomic motor neurons: smooth muscle, cardiac muscle and glands, via sympathetic and parasympathetic divisions.',
        'The adult brain holds almost 97% of the body’s neural tissue, about 100 billion neurons and 1,000 billion neuroglia.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      chunking: 'Two questions sort any neuron: which way is the traffic going, and does it ever leave the CNS? Sensory in, motor out, interneuron stays put.',
      wordOrigin: 'Afferent arrives, efferent exits — the a and the e tell you the direction, and sensory fibres are afferent, motor fibres efferent.',
      comparison: 'Somatic motor neurons reach skeletal muscle you can command. Autonomic motor neurons reach the muscle and glands you cannot. Same output side, different level of control.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each neuron class to what it does.',
        pairs: [['Sensory neuron', 'Conducts impulses from receptors to the CNS'], ['Motor neuron', 'Conducts impulses from the CNS to muscles or glands'], ['Interneuron', 'Lies entirely within the CNS and integrates function'], ['Autonomic motor neuron', 'Innervates smooth muscle, cardiac muscle and glands']],
        explanation: 'These are the three neuron classes and the autonomic subdivision as defined in the lecture.' },
      { type: 'mcq', prompt: 'Which division of the PNS controls skeletal muscle voluntarily and handles reflexes?', options: ['Autonomic nervous system', 'Somatic nervous system', 'Sympathetic division', 'Parasympathetic division'], answer: 1,
        explanation: 'Somatic motor neurons are responsible for reflexes and voluntary control of skeletal muscles. The sympathetic and parasympathetic divisions are both parts of the autonomic system.' },
      { type: 'cloze', prompt: 'Activation of a sensory neuron results in conduction of action potentials into the spinal cord along a(n) ______ fibre.', accept: ['afferent'],
        explanation: 'Model answer: afferent. Afferent fibres arrive at the CNS; efferent fibres exit it.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 2.1, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A reflex happens faster than a voluntary movement. Using the three neuron classes, explain why.',
        model: 'A reflex runs sensory neuron → interneuron in the CNS → somatic motor neuron, so the loop is short and local. A voluntary movement has to be integrated at higher levels before a motor neuron fires, which adds processing between the input and the output.',
        rubric: ['Names the sensory–interneuron–motor loop', 'Contrasts the shorter reflex path with higher-level integration'] },
    ],
    commonMistakes: [
      'Treating the autonomic nervous system as separate from the PNS — it is one of its two divisions.',
      'Calling interneurons peripheral; they are located completely within the CNS.',
    ],
    sourceRefs: [{ ref: 'phys.8', location: 'Slides 2–8 what the nervous system is, its divisions, classification of neurons, PNS' }, { ref: 'hss.revans', location: 'HSS2011 Module 2.1, Fill-in-blanks 4' }],
  },
  {
    id: 'abct2326-muscle-types',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'Three muscle tissue types and the four properties',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'Muscle has four properties: contractility, the ability to shorten with force; excitability, the capacity to respond to a stimulus; extensibility, the ability to be stretched to normal resting length and beyond to a limited degree; and elasticity, the ability to recoil to the original resting length after being stretched. There are three muscle tissue types. Skeletal muscle attaches to bones, has multiple peripherally located nuclei, is striated, and is voluntary as well as involuntary in reflexes. Smooth muscle lies in the walls of hollow organs, blood vessels, the eye, glands and skin, has a single centrally located nucleus, is not striated, is involuntary and has gap junctions in visceral smooth muscle. Cardiac muscle is in the heart, has a single centrally located nucleus, is striated, is involuntary and has intercalated discs. Voluntary muscles are directed by thought via the nervous system; involuntary muscles are directed by the autonomic nervous system. Skeletal muscle makes up about 40% of body weight in males and about 32% in females.',
      keyFacts: [
        'Four properties: contractility, excitability, extensibility, elasticity.',
        'Skeletal: on bones, multiple peripheral nuclei, striated, voluntary (and reflex).',
        'Smooth: hollow organ walls, single central nucleus, not striated, involuntary, gap junctions in visceral smooth muscle.',
        'Cardiac: heart, single central nucleus, striated, involuntary, intercalated discs.',
        'Sarcomeres are the contractile units of skeletal muscle, between two Z discs.',
        'The sarcoplasmic reticulum stores Ca2+.',
        'Skeletal muscle is about 40% of body weight in males, 32% in females.',
      ],
      prerequisites: ['abct2326-cells-organisation'],
      examples: [],
    },
    memory: {
      chunking: 'Three tissues, three questions: striated or not, one nucleus or many, under your control or not. Cardiac is the hybrid — striated like skeletal, involuntary like smooth.',
      firstLetter: 'Four properties: Contractility, Excitability, Extensibility, Elasticity — the two E-x words are stretch, the two others are shorten and respond.',
      comparison: 'Intercalated discs are cardiac only. Multiple peripheral nuclei are skeletal only. Either feature alone identifies the tissue.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each muscle type to its distinguishing feature.',
        pairs: [['Skeletal', 'Multiple, peripherally located nuclei'], ['Cardiac', 'Intercalated discs'], ['Smooth', 'Not striated, gap junctions in visceral smooth muscle'], ['Cardiac and skeletal', 'Striated']],
        explanation: 'From the "Classification of 3 Muscle Tissue Types" slide.' },
      { type: 'mcq', prompt: 'Which property is defined as the ability of a muscle to recoil to its original resting length after being stretched?', options: ['Contractility', 'Excitability', 'Extensibility', 'Elasticity'], answer: 3,
        explanation: 'Elasticity is the recoil property. Extensibility is the ability to be stretched in the first place.' },
      { type: 'typed', prompt: 'What is the contractile unit of skeletal muscle, lying between two Z discs?', accept: ['sarcomere', 'sarcomeres'],
        explanation: 'The sarcomere — the components between two Z discs.' },
      { type: 'mcq', prompt: 'Which of the following is NOT performed by muscles?', options: ['Locomotion', 'Excretion', 'Maintenance of posture', 'Heat production'], answer: 1,
        explanation: 'Model answer B. Locomotion, maintenance of posture and heat production are muscle functions; excretion is not.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'You are shown a striated muscle cell with a single central nucleus. Which type is it, and which feature ruled out the alternative?',
        model: 'Cardiac muscle. Striation rules out smooth muscle, and the single central nucleus rules out skeletal muscle, which has multiple peripherally located nuclei. Intercalated discs would confirm it.',
        rubric: ['Identifies cardiac', 'Uses striation to exclude smooth', 'Uses nucleus number/position to exclude skeletal'] },
    ],
    commonMistakes: [
      'Assuming striated means voluntary — cardiac muscle is striated and involuntary.',
      'Forgetting that skeletal muscle also acts involuntarily in reflexes.',
    ],
    sourceRefs: [{ ref: 'phys.9', location: 'Slides 4–8 introduction, four properties of muscle, classification of muscle tissue types' }, { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 5' }],
  },
  {
    id: 'abct2326-muscle-action',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'definition',
    title: 'Origin, insertion, agonist and antagonist',
    tags: ['musculoskeletal'],
    lesson: {
      explanation: 'When a muscle contracts it shortens, placing tension on the tendons connecting it to bone and moving the bone at a joint. The bone that moves is attached at the muscle insertion, which is distal to the body; the muscle is attached at its origin to a bone that does not move, closer to the body. Flexor muscles decrease the angle between two bones at a joint and extensor muscles increase it. The main muscle responsible for movement in a given direction is the agonist — the one that is contracting — and flexors and extensors that work together are antagonists. The greater the number of muscle fibres in each motor unit, the less precise the control will be.',
      keyFacts: [
        'Insertion = the attachment on the bone that moves, distal to the body.',
        'Origin = the attachment on the bone that does not move, closer to the body.',
        'Flexor decreases the joint angle; extensor increases it.',
        'Agonist = the main muscle producing the movement, the one contracting.',
        'Antagonist = the opposing muscle; flexors and extensors are antagonists to each other.',
        'More fibres per motor unit means less precise control.',
      ],
      prerequisites: ['abct2326-muscle-types'],
      examples: [],
    },
    memory: {
      location: 'Origin is where the movement originates from — the anchor. Insertion is where the force is inserted into the moving bone. Anchor is proximal, target is distal.',
      comparison: 'Agonist and antagonist are roles, not names. The same muscle is agonist for one movement and antagonist for the opposite one.',
      chunking: 'Few fibres per motor unit means fine control — think of the muscles moving your eye or your fingers versus the ones moving your thigh.',
    },
    practice: [
      { type: 'mcq', prompt: 'The greater the number of muscle fibres in each motor unit, …', options: ['The greater the number of stimuli required to produce a contraction.', 'The longer each contraction will last.', 'The slower the contraction of the muscle will be.', 'The less precise the control will be.'], answer: 3,
        explanation: 'Model answer D. One motor neuron drives every fibre in its unit, so a large unit means a coarser smallest possible step of force.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 6' } },
      { type: 'matching', prompt: 'Match each term to its definition.',
        pairs: [['Origin', 'Attachment on the bone that does not move'], ['Insertion', 'Attachment on the bone that moves'], ['Agonist', 'The main muscle contracting to produce the movement'], ['Antagonist', 'The opposing muscle, e.g. the extensor to a flexor']],
        explanation: 'From the "Skeletal Muscle Action" and "Skeletal Muscles" slides.' },
      { type: 'typed', prompt: 'A muscle that decreases the angle between two bones at a joint is called a what?', accept: ['flexor', 'flexor muscle'],
        explanation: 'A flexor. An extensor increases the angle.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Biceps brachii is described in HSS2011 as a powerful flexor and supinator of the forearm, and triceps brachii as the extensor. Describe their relationship in both directions of movement.',
        model: 'During elbow flexion biceps brachii is the agonist and triceps brachii the antagonist. During extension the roles swap: triceps is the agonist and biceps the antagonist. Flexors and extensors working at the same joint are antagonists to each other, and which one is the agonist depends only on the direction being produced.',
        rubric: ['Assigns agonist/antagonist for flexion', 'Swaps them for extension', 'States the roles depend on the movement direction'] },
    ],
    commonMistakes: [
      'Treating agonist and antagonist as fixed labels for particular muscles.',
      'Swapping origin and insertion — the insertion is on the bone that moves.',
    ],
    sourceRefs: [{ ref: 'phys.9', location: 'Slides 10–11 skeletal muscle action, flexors and extensors, agonist and antagonist' }, { ref: 'hss.4.3', location: 'Biceps brachii and triceps brachii actions' }, { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 6' }],
  },
  {
    id: 'abct2326-innate-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Innate vs adaptive immunity and the seven innate categories',
    tags: ['immune', 'high-yield'],
    lesson: {
      explanation: 'Innate, or nonspecific, immunity always works the same way against any type of invading agent — nonspecific resistance you are born with. Adaptive, or specific, immunity protects against specific pathogens, depends on the activities of lymphocytes, and develops after exposure to hazardous microbes in the environment. Innate immunity has seven major categories: physical barriers, phagocytes, immune surveillance, interferons, complement, the inflammatory response and fever. Physical barriers keep pathogens outside. Phagocytes attack and remove dangerous microorganisms, and come in two classes — microphages, which are neutrophils and eosinophils that leave the bloodstream to enter peripheral tissues, and macrophages, large phagocytic cells derived from monocytes. Immune surveillance is carried out by natural killer cells, which form perforin vesicles and release perforins that lyse the abnormal plasma membrane, also attacking cancer cells and virus-infected cells. Interferons are chemical messengers that trigger production of antiviral proteins in normal cells; the antiviral proteins do not kill viruses but block replication in neighbouring cells. Complement is a system of circulating proteins amplifying in a cascade and assisting antibodies in destroying pathogens. The inflammatory response is a localised tissue-level response limiting the spread of injury or infection. Fever increases metabolism, accelerates defences and inhibits some viruses and bacteria.',
      keyFacts: [
        'Innate = nonspecific, same response to any agent, present from birth.',
        'Adaptive = specific, depends on lymphocytes, develops after exposure.',
        'Seven innate categories: physical barriers, phagocytes, immune surveillance, interferons, complement, inflammatory response, fever.',
        'Microphages = neutrophils and eosinophils. Macrophages derive from monocytes.',
        'Fixed macrophages (histiocytes) include microglia in the CNS and Kupffer cells in liver sinusoids; alveolar macrophages are free macrophages.',
        'NK cells release perforins that lyse the abnormal plasma membrane.',
        'Interferons trigger antiviral proteins that block replication rather than killing viruses.',
        'Innate activation: pathogens carry PAMPs, recognised by toll-like receptors, a class of pattern-recognition receptor.',
      ],
      prerequisites: ['abct2326-blood-composition'],
      examples: [],
    },
    memory: {
      firstLetter: 'Seven innate categories: Barriers, Phagocytes, Surveillance, Interferons, Complement, Inflammation, Fever.',
      comparison: 'Innate is a smoke alarm — same sound for any fire, no memory. Adaptive is a witness who recognises a specific face and remembers it next time.',
      chunking: 'Micro- and macro-phage are sorted by size and origin, not by importance: microphages are neutrophils and eosinophils, macrophages come from monocytes.',
      wordOrigin: 'Perforin perforates. Interferon interferes with viral replication — both names are the mechanism.',
    },
    practice: [
      { type: 'sequence', prompt: 'List the seven major categories of innate immunity in the order the lecture gives them.',
        items: ['Physical barriers', 'Phagocytes', 'Immune surveillance', 'Interferons', 'Complement', 'Inflammatory response', 'Fever'],
        explanation: 'This is the order on the "7 Major Categories of Innate Immunity" slide.' },
      { type: 'mcq', prompt: 'Which cells carry out immunological surveillance?', options: ['Neutrophils', 'Natural killer cells', 'B lymphocytes', 'Eosinophils'], answer: 1,
        explanation: 'Immune surveillance constantly monitors normal tissues with natural killer cells, which release perforins to lyse abnormal cell membranes.' },
      { type: 'mcq', prompt: 'What do interferons actually do?', options: ['Kill viruses directly', 'Trigger antiviral proteins that block replication in neighbouring cells', 'Lyse abnormal plasma membranes', 'Form a cascade that punches holes in bacteria'], answer: 1,
        explanation: 'The lecture is explicit: antiviral proteins do not kill viruses, they block replication in the neighbouring cell. Membrane lysis is the NK cell / perforin mechanism, and the cascade is complement.' },
      { type: 'matching', prompt: 'Match each fixed or free macrophage to where it is found.',
        pairs: [['Microglia', 'Central nervous system'], ['Kupffer cells', 'Liver sinusoids'], ['Alveolar macrophages', 'Lungs — free macrophages'], ['Histiocytes', 'Fixed in tissues such as dermis and bone marrow']],
        explanation: 'From the "Examples of Fixed and Free Macrophages" slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A person meets the same pathogen for the second time and clears it much faster. Which arm of immunity explains the difference, and why can the other arm not explain it?',
        model: 'Adaptive immunity. It is specific, depends on lymphocytes and develops after exposure, so a second encounter meets a prepared response. Innate immunity cannot explain it because it always works the same way against any invading agent — it does not improve with repeat exposure.',
        rubric: ['Names adaptive immunity', 'Cites lymphocyte-dependent specificity and post-exposure development', 'States innate immunity is unchanged by repetition'] },
    ],
    commonMistakes: [
      'Saying interferons kill viruses — they block replication in neighbouring cells instead.',
      'Grouping natural killer cells with the adaptive system because they are lymphocytes by lineage; the lecture places them under innate immune surveillance.',
    ],
    sourceRefs: [{ ref: 'phys.10', location: 'Slides 5–21 defense mechanisms, seven innate categories, phagocytes, macrophage types, immunological surveillance' }],
  },
];

/* ------------------------------------------------------------------ *
 * Study items — HTI17103 (from the HTI17101 Exploring Radiography set)
 * ------------------------------------------------------------------ */

const HTI_ITEMS = [
  {
    id: 'hti17103-what-is-radiography',
    subject: 'HTI17103', unit: 'hti.subject', type: 'definition',
    title: 'What radiography is, and who does what',
    tags: ['profession', 'high-yield'],
    lesson: {
      explanation: 'Radio- derives from the Latin radius, meaning a radial spread-out of energy, that is, radiation. The suffix -graphy means a snapshot or photo. Combined, radiography is taking photos using ionizing radiation: the art and science of using ionizing radiation to create images of the body and its inner structures, and those images aid in the diagnosis of disease and pathology. The lecture then separates the roles: the radiographer takes the radiographs; the radiotherapist plans and switches on the beam for treatments; the radiation chemist or pharmacist prepares the radiopharmaceuticals; the radiologist interprets radiographic images; the radio-oncologist diagnoses and plans therapy for cancer patients; and the medical physicist calibrates and measures the radiation dose of instruments.',
      keyFacts: [
        'Radio- = radial spread-out of energy (radiation); -graphy = snapshot, photo.',
        'Radiography: the art and science of using ionizing radiation to create images of the body and inner structures.',
        'Radiographer — takes the radiographs.',
        'Radiotherapist — plans and switches on the beam for treatments.',
        'Radiation chemist / pharmacist — prepares radiopharmaceuticals.',
        'Radiologist — interprets radiographic images.',
        'Radio-oncologist — diagnoses and plans therapy for cancer patients.',
        'Medical physicist — calibrates and measures the radiation dose of instruments.',
        'X-rays are produced when an electron stream strikes a target made of a mixture of tungsten and rhenium.',
      ],
      prerequisites: [],
      examples: ['The lecture notes radiography is not confined to hospitals: airport security, customs cargo checks and industrial X-ray checks all use the same physics.'],
    },
    memory: {
      wordOrigin: 'Split every job title at the hyphen. Radio-grapher writes the image. Radio-logist studies it. Radio-therapist treats with it. The suffix tells you the verb.',
      comparison: 'Radiographer and radiologist are the pair most often confused: one acquires the image, the other reads it.',
      chunking: 'Six roles, three groups: two who operate the beam (radiographer, radiotherapist), two who interpret and prescribe (radiologist, radio-oncologist), two who prepare and measure (radiation pharmacist, medical physicist).',
    },
    practice: [
      { type: 'matching', prompt: 'Match each professional to their role as defined in the lecture.',
        pairs: [['Radiographer', 'Takes the radiographs'], ['Radiologist', 'Interprets radiographic images'], ['Medical physicist', 'Calibrates and measures the radiation dose of instruments'], ['Radiation chemist / pharmacist', 'Prepares the radiopharmaceuticals']],
        explanation: 'These are the exact role definitions on the "Who is working with radiation in hospitals?" slide.' },
      { type: 'mcq', prompt: 'Which professional plans and switches on the beam for treatments?', options: ['Radiologist', 'Radiographer', 'Radiotherapist', 'Medical physicist'], answer: 2,
        explanation: 'The radiotherapist plans and switches on the treatment beam. The radiographer takes diagnostic radiographs.' },
      { type: 'typed', prompt: 'The X-ray tube target is made of a mixture of which two metals?', accept: ['tungsten and rhenium', 'tungsten, rhenium', 'rhenium and tungsten'],
        explanation: 'The target is made of a mixture of tungsten and rhenium; the electron stream striking it emits characteristic rays, i.e. X-rays.' },
    ],
    application: [
      { type: 'scenario', prompt: 'The lecture calls radiology "a science of everything" and lists physiology, anatomy, biology, chemistry and physics. Pick two of those and say what question each answers for a radiographer.',
        model: 'Anatomy answers "where to apply" the beam and "what is expected to see" on the image. Physics answers "how to protect from ionizing radiation" and underlies image formation. The lecture pairs the disciplines with exactly those practical questions.',
        rubric: ['Picks two named disciplines', 'Attaches a practical question to each, drawn from the lecture list'] },
    ],
    commonMistakes: [
      'Using radiographer and radiologist as synonyms.',
      'Assuming radiography only happens in hospitals — the lecture lists security, customs and industrial uses.',
    ],
    sourceRefs: [{ ref: 'hti.w1b', location: 'Slides 3–9 "What is Radiography?", "Where does the radiation light come?", "Who is working with radiation in hospitals?"' }],
  },
  {
    id: 'hti17103-ionizing-vs-nonionizing',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'comparison',
    title: 'Ionizing vs non-ionizing modalities',
    tags: ['modalities', 'high-yield'],
    lesson: {
      explanation: 'The Week 2 lecture sorts every imaging modality into two columns. Ionizing radiation covers general X-ray, fluoroscopy and angiography, mammography, computed tomography, and radionuclide imaging. Non-ionizing radiation covers magnetic resonance imaging and ultrasonography. Ionization is defined as the ability to free outer-shell electrons; the sources listed are high-energy ultraviolet, characteristic X-ray, electron beams and radioisotopes. The lecture explicitly addresses urban myths about microwave ovens at 2,450 MHz and cell phones at 900, 1,800 and 2,600 MHz, and notes the difference in units — W/kg and tesla for non-ionizing exposure versus J/kg, gray and sievert for ionizing dose.',
      keyFacts: [
        'Ionizing: general X-ray, fluoroscopy/angiography, mammography, computed tomography, radionuclide imaging.',
        'Non-ionizing: magnetic resonance imaging, ultrasonography.',
        'Ionization = the ability to free outer-shell electrons.',
        'Ionizing sources listed: high-energy ultraviolet, characteristic X-ray, electron beams, radioisotopes.',
        'Units differ: W/kg and tesla for non-ionizing; J/kg, gray and sievert for ionizing dose.',
        'MRI uses a magnetic field (permanent or superconductor magnet) and radiofrequency at 6–340 MHz, exploiting water (hydrogen) resonance; it gives good soft-tissue contrast and is non-ionizing.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      chunking: 'Five in the ionizing column, two in the non-ionizing column. Learn the short list: MRI and ultrasound are the only two that do not ionize.',
      comparison: 'The test is not "does it use energy" but "can it free an outer-shell electron". A microwave oven carries far more power than a chest X-ray and still cannot ionize.',
      mnemonic: 'The two safe-from-ionization modalities both work on something other than photons of the X-ray kind: Magnets and Mechanical waves — MRI and ultrasound.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of these is classed as a non-ionizing modality?', options: ['Computed tomography', 'Mammography', 'Ultrasonography', 'Radionuclide imaging'], answer: 2,
        explanation: 'Ultrasonography sits in the non-ionizing column alongside MRI. CT, mammography and radionuclide imaging are all in the ionizing column.' },
      { type: 'typed', prompt: 'Ionizing radiation is defined by what ability?', accept: ['free outer shell electrons', 'to free outer-shell electrons', 'freeing outer shell electrons', 'free electrons'],
        explanation: 'The ability to free outer-shell electrons. That is the whole definition the lecture gives.' },
      { type: 'matching', prompt: 'Sort each modality into its column.',
        pairs: [['General X-ray', 'Ionizing'], ['Computed tomography', 'Ionizing'], ['Magnetic resonance imaging', 'Non-ionizing'], ['Ultrasonography', 'Non-ionizing']],
        explanation: 'This is the two-column table repeated throughout the Week 2 lecture.' },
      { type: 'mcq', prompt: 'MRI produces its signal by exploiting the resonance of which molecule?', options: ['Sodium', 'Water (hydrogen)', 'Calcium', 'Oxygen'], answer: 1,
        explanation: 'The MRI summary slide names water (hydrogen) molecule resonance, driven by radiofrequency at 6–340 MHz within the magnetic field.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Someone claims their phone is dangerous because it "emits radiation". Answer them using the lecture’s own framing.',
        model: 'Cell phones operate at 900, 1,800 and 2,600 MHz, which is non-ionizing — it cannot free outer-shell electrons, which is the defining ability of ionizing radiation. The lecture flags this exact claim as an urban myth, and notes that the two are even measured in different units: W/kg for non-ionizing exposure versus J/kg, gray and sievert for ionizing dose.',
        rubric: ['Applies the free-an-electron test', 'Cites the frequency range as non-ionizing', 'Mentions the different unit systems'] },
    ],
    commonMistakes: [
      'Assuming higher power means ionizing — power and ionizing ability are different properties.',
      'Putting MRI in the ionizing column because it is a large hospital machine.',
    ],
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 3, 5 "Imaging Modalities", "Ionizing vs. non-ionizing Radiation"; slide 49 "MRI - summary"' }],
  },
  {
    id: 'hti17103-modality-detail',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'definition',
    title: 'Modality detail — X-ray, fluoroscopy, CT and nuclear medicine',
    tags: ['modalities'],
    lesson: {
      explanation: 'X-rays were discovered by Wilhelm Conrad Roentgen in 1895 and earned the first Nobel Prize in 1901; Thomas Edison invented X-ray fluoroscopy in 1896. General X-ray moved from film — developing, fixation, washing, drying in a darkroom — to computed radiography from the 1980s, which needs readers but is compatible with PACS, and then to direct digital radiography, which needs no readers, saves time and uses no physical film but is expensive. Fluoroscopy offers real-time monitoring and is applicable intraoperatively, with contrast agents taken orally as barium sulfate solution or injected intravenously as ionic or non-ionic contrast agents. CT was developed because radiologists normally need two views and CT offers a 360-degree view; modern spiral CT gives multiplanar reconstruction and 3D angiographic reconstruction. Radionuclide imaging uses a radiopharmaceutical — a radioisotope combined with a specific compound — to visualise bio-distribution non-invasively; the gamma camera images agents such as technetium-99m MDP for bone scans, thallium-201 for cardiac scans and technetium-99m DTPA for renal function scans.',
      keyFacts: [
        'Roentgen discovered X-rays in 1895; first Nobel Prize 1901. Edison invented X-ray fluoroscopy in 1896.',
        'Film processing sequence: developing → fixation → washing → drying.',
        'Computed radiography: since the 1980s, needs readers, compatible with PACS (picture archiving and communication system).',
        'Direct digital radiography: no readers, time-saving, no physical films, expensive.',
        'Fluoroscopy: real-time, intraoperative, used for angiography, stent installation, bone cement, digestive-system function imaging.',
        'Contrast agents: oral barium sulfate solution; intravenous ionic vs non-ionic agents.',
        'Radiopharmaceutical = a radioisotope plus a specific compound.',
        'SPECT agents are gamma emitters with longer half-lives, less expensive and widely available; PET agents are positron emitters with very short half-lives, more quantitative, expensive and cyclotron-dependent.',
        'Technetium-99m: 6.02 hours, gamma, SPECT. Fluorine-18: 109.75 minutes, positron, PET.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      sequence: 'Film processing is a fixed order: develop, fix, wash, dry. Anything out of order ruins the film, which is why the sequence is worth owning.',
      comparison: 'SPECT versus PET: longer half-life, cheaper, everywhere versus very short half-life, quantitative, needs a cyclotron on site. Half-life is the fact that drives every other difference.',
      wordOrigin: 'Radiopharmaceutical is literally radiation plus drug — the lecture calls the isotope "the siren" and the compound the part that decides where it goes.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the traditional film processing steps.', items: ['Developing', 'Fixation', 'Washing', 'Drying'],
        explanation: 'The Week 2 slide gives this exact sequence for the old film workflow.' },
      { type: 'mcq', prompt: 'Which of these is a stated disadvantage of direct digital radiography compared with computed radiography?', options: ['It needs readers', 'It uses physical films', 'It is expensive', 'It is not PACS compatible'], answer: 2,
        explanation: 'The lecture lists direct digital radiography as needing no readers, being time-saving and using no physical films — but expensive.' },
      { type: 'typed', prompt: 'What does PACS stand for?', accept: ['picture archiving and communication system', 'picture archiving & communication system'],
        explanation: 'Picture archiving and communication system, named on the computed radiography slide.' },
      { type: 'matching', prompt: 'Match each radionuclide to its imaging technique as tabulated in the lecture.',
        pairs: [['Technetium-99m', 'Gamma, SPECT'], ['Fluorine-18', 'Positron, PET'], ['Iodine-123', 'Gamma, SPECT'], ['Carbon-11', 'Positron, PET']],
        explanation: 'From the "Commonly Used Radionuclides for Imaging and Therapy" table reproduced in the lecture.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A hospital wants to start PET imaging. Using the SPECT/PET comparison, name two practical consequences they must plan for that SPECT would not have required.',
        model: 'First, a cyclotron is required, because PET tracers have very short half-lives and cannot simply be shipped in. Second, robotic handling and the associated expense, since the lecture lists PET as expensive and requiring robotic handling, whereas SPECT is easier to prepare and worldwide available.',
        rubric: ['Names the cyclotron requirement', 'Links it to short half-lives', 'Names cost or robotic handling'] },
    ],
    commonMistakes: [
      'Confusing computed radiography (cassettes plus readers) with direct digital radiography (no readers).',
      'Assuming PET is simply a better SPECT rather than a different trade-off around half-life and cost.',
    ],
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 6–41 discovery of X-ray, general X-ray, cassettes, fluoroscopy, CT, radiopharmaceuticals, RNI, SPECT/PET' }],
  },
  {
    id: 'hti17103-radioprotection',
    subject: 'HTI17103', unit: 'hti.protect', type: 'definition',
    title: 'Radioprotective measures and dose limits',
    tags: ['radioprotection', 'high-yield'],
    lesson: {
      explanation: 'The Week 6 lecture gives four radioprotective measures. Time: potential exposure to radiation should be as short as possible, because of the dose-rate issue. Distance: personnel should keep as far as possible from radiation sources, following the inverse square law. Shielding: without obstructing the work, personnel should be protected by shielding as comprehensively as possible. Decay: if the radioactive material cannot be removed, a certain time period should be given until its natural decay, and the relevant concept is half-life — physical, biological and effective. The governing principle is ALARA, as low as reasonably achievable. Dose limits from ICRP Publication 103 are, for radiology workers, 20 mSv per year averaged over five consecutive years with 50 mSv in any single year, and 1 mSv if pregnancy is declared; for the public the limit is 1 mSv in a year. Exposure is monitored with a thermoluminescent dosimeter, whose detection range is 0.05 mSv to 10 Sv but which is not feasible for accidental exposure. Radiation-induced damage is divided into stochastic and deterministic effects.',
      keyFacts: [
        'Four measures: time, distance, shielding, decay.',
        'Distance works through the inverse square law.',
        'Decay relies on half-life — physical, biological and effective.',
        'ALARA = as low as reasonably achievable.',
        'Worker dose limit: 20 mSv/year averaged over five consecutive years; 50 mSv in any single year; 1 mSv if pregnancy is declared.',
        'Public dose limit: 1 mSv in a year.',
        'TLD detection range: 0.05 mSv – 10 Sv; not feasible for accidental exposure.',
        'Damage paradigm: stochastic effect and deterministic effect.',
        'Medical needs account for over 90% of artificial radiation exposure.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      firstLetter: 'Time, Distance, Shielding, Decay. The first three are the classic trio; this course adds Decay as a fourth, and that is the one most likely to be missed.',
      chunking: 'Three of the four change what you do (stand back, stand behind something, stay briefly). Decay changes when you do it.',
      mnemonic: 'Two limits worth memorising as a pair: 20 for workers averaged, 1 for the public — and 1 again for a declared pregnancy, which drops a worker to public level.',
    },
    practice: [
      { type: 'sequence', prompt: 'List the four radioprotective measures in the order the lecture gives them.', items: ['Time', 'Distance', 'Shielding', 'Decay'],
        explanation: 'Time, distance, shielding and decay, with half-life attached to the decay measure.' },
      { type: 'typed', prompt: 'What does ALARA stand for?', accept: ['as low as reasonably achievable'],
        explanation: 'As low as reasonably achievable — the governing principle of radiation protection in the lecture.' },
      { type: 'mcq', prompt: 'What is the dose limit for a member of the public in a year?', options: ['0.05 mSv', '1 mSv', '20 mSv', '50 mSv'], answer: 1,
        explanation: '1 mSv in a year for the public. Radiology workers are limited to 20 mSv/year averaged over five consecutive years, with 50 mSv in any single year.' },
      { type: 'cloze', prompt: 'The dose limit for radiology workers is ______ mSv per year averaged over five consecutive years, and ______ mSv for any single year.', accept: ['20; 50', '20, 50', '20 and 50'],
        explanation: '20 mSv/year averaged over five consecutive years, 50 mSv for every single year, per ICRP Publication 103.' },
      { type: 'typed', prompt: 'Which device is named as the monitoring tool for high-risk radiation workers?', accept: ['thermoluminescent dosimeter', 'tld', 'thermoluminescent dosimeter (tld)'],
        explanation: 'The thermoluminescent dosimeter (TLD), with a detection range of 0.05 mSv to 10 Sv.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiographer must stay in the room during a fluoroscopy case. Which of the four measures can they still use, and which one is unavailable?',
        model: 'Time, distance and shielding are all still available: keep screening time short, stand as far back as the task allows because of the inverse square law, and wear or stand behind shielding. Decay is unavailable, because the X-ray source is switched on and off rather than decaying — decay applies to radioactive material that cannot be removed.',
        rubric: ['Names time, distance and shielding as available', 'Rules out decay', 'Gives the reason: an X-ray tube is not a decaying source'] },
    ],
    commonMistakes: [
      'Listing only time, distance and shielding — this course names four measures.',
      'Confusing the annual averaged worker limit (20 mSv) with the single-year ceiling (50 mSv).',
    ],
    sourceRefs: [{ ref: 'hti.w6', location: 'Slides 3, 10–16 TLD, dose limits (ICRP Publication 103), radioprotective measures, ALARA' }],
  },
  {
    id: 'hti17103-radiation-therapy',
    subject: 'HTI17103', unit: 'hti.rt', type: 'sequence',
    title: 'The radiation therapy pathway',
    tags: ['radiation therapy'],
    lesson: {
      explanation: 'In Hong Kong the job title is radiation therapist, previously therapeutic radiographer; in the USA the equivalent roles are radiologic technologists, whose duties differ from those in Hong Kong, and dosimetrists, who specialise in treatment planning and dose calculation. Radiation therapy and oncology services are provided by six public hospitals — Queen Mary, Pamela Youde Nethersole Eastern, Queen Elizabeth, Princess Margaret, Prince of Wales and Tuen Mun — and six private hospitals, giving twelve RT centres in Hong Kong with around 420 registered radiation therapists. The patient pathway runs: diagnosis confirmed by doctors from various specialities, referral to clinical oncology, oncologists meeting the patient and relatives to decide an initial treatment plan, then referral for radiation therapy if that is part of the regimen. The RT planning session then proceeds step by step: determine the treatment position with personalised immobilisation devices to minimise movement, considering patient comfort, treatment accuracy, planning feasibility and reproducibility; then simulation, acquiring medical images for treatment planning and simulating the real treatment setup; then RT treatment planning.',
      keyFacts: [
        'Hong Kong title: radiation therapist (previously therapeutic radiographer).',
        'USA: radiologic technologists (different role) and dosimetrists (planning and dose calculation).',
        'Six public RT hospitals: QMH, PYNEH, QEH, PMH, PWH, TMH. Six private. Twelve RT centres in total.',
        'About 420 registered radiation therapists in Hong Kong.',
        'Not all patients with cancer are referred to clinical oncology.',
        'Planning session step 1: determine treatment position with personalised immobilisation devices.',
        'Immobilisation considerations: patient comfort, treatment accuracy, planning feasibility, reproducibility.',
        'Planning session step 2: simulation — acquire images for planning and simulate the real setup.',
        'Planning session step 3: RT treatment planning.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      sequence: 'Position, simulate, plan. You cannot plan a beam until you know exactly how the patient will lie, and you cannot know that until you have fixed them in place.',
      chunking: 'Six public plus six private equals twelve centres. One number to hold, two halves to derive.',
      firstLetter: 'The four immobilisation considerations: Comfort, Accuracy, Feasibility, Reproducibility. Reproducibility is the one people forget, and it is the reason immobilisation exists at all.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the three steps of the RT planning session.', items: ['Determine treatment position (immobilisation devices)', 'Simulation — acquire images and simulate the setup', 'RT treatment planning'],
        explanation: 'Steps 1, 2 and 3 as numbered in the Week 3 lecture.' },
      { type: 'typed', prompt: 'What was the previous job title for a radiation therapist in Hong Kong?', accept: ['therapeutic radiographer'],
        explanation: 'Therapeutic radiographer. The current title is radiation therapist.' },
      { type: 'mcq', prompt: 'In the USA, which role specialises in treatment planning and dose calculation?', options: ['Radiologic technologist', 'Dosimetrist', 'Radiation therapist', 'Medical physicist'], answer: 1,
        explanation: 'The lecture names dosimetrists as specialists in treatment planning and dose calculation, distinguishing them from radiologic technologists.' },
      { type: 'typed', prompt: 'How many RT centres are there in Hong Kong in total?', accept: ['12', 'twelve'],
        explanation: 'Twelve — six public hospitals and six private hospitals.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does the planning session start with immobilisation rather than with imaging?',
        model: 'Because reproducibility is one of the four stated considerations. The images acquired at simulation are used to plan the beam, so they must be taken in exactly the position the patient will be in for every treatment fraction. Fixing the position first is what makes the planning images meaningful.',
        rubric: ['Names reproducibility', 'Links simulation images to the planned treatment position', 'Explains the ordering as a consequence'] },
    ],
    commonMistakes: [
      'Assuming every cancer patient is referred to clinical oncology — the lecture explicitly says not all are.',
      'Treating simulation as the first step; determining treatment position comes first.',
    ],
    sourceRefs: [{ ref: 'hti.w3', location: 'Slides 2–15 job titles, RT services in HK, patient pathway, planning session steps 1–3' }],
  },
  {
    id: 'hti17103-department-and-request',
    subject: 'HTI17103', unit: 'hti.roleext', type: 'definition',
    title: 'Inside a radiology department: staffing and the request form',
    tags: ['role extension'],
    lesson: {
      explanation: 'The Hospital Authority is organised into 7 clusters, with 39 departments of radiology for medical imaging, 16 A&E radiology services and 6 clinical oncology centres for radiation therapy, employing about 800 diagnostic radiographers and about 180–200 radiotherapists. In one named hospital the staffing example given is 29 radiologists, 84 radiographers and 16 nurses or patient-care assistants. Team work is presented as a requirement: a pair of radiographers, one handling the patient and one controlling the panel; a patient care assistant for patient preparation; and a nurse for CT, MRI and A&E work. The lecture then walks through reading an X-ray request form, whose fields include clinical information, diagnosis, the examination requested — the worked example is "CXR (PA + Lat)" — routine, early or urgent priority, the form of transport, drug allergy and, where applicable, LMP.',
      keyFacts: [
        'Hospital Authority: 7 clusters, 39 departments of radiology, 16 A&E radiology services, 6 clinical oncology centres.',
        'About 800 diagnostic radiographers; about 180–200 radiotherapists.',
        'Staffing example: 29 radiologists, 84 radiographers, 16 nurses / patient-care assistants.',
        'A pair of radiographers: one for patient handling, one for panel controlling.',
        'Patient care assistant prepares the patient; a nurse is involved in CT, MRI and A&E.',
        'Request form fields include clinical information, diagnosis, examination requested, priority, transport, drug allergy and LMP.',
        'The worked request example is a chest X-ray specified as PA + Lat.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      chunking: 'Two radiographers, two jobs: one on the patient, one on the panel. Everything else in the room supports one of those two.',
      location: 'Read a request form the way you would read a boarding pass: who, what examination, how urgent, how they are arriving. Four questions, and the form answers all of them.',
    },
    practice: [
      { type: 'typed', prompt: 'How many clusters is the Hospital Authority organised into?', accept: ['7', 'seven'],
        explanation: 'Seven clusters, containing 39 departments of radiology, 16 A&E radiology services and 6 clinical oncology centres.' },
      { type: 'mcq', prompt: 'In the pair-of-radiographers model, what are the two roles?', options: ['Imaging and reporting', 'Patient handling and panel controlling', 'Preparation and archiving', 'Planning and dose calculation'], answer: 1,
        explanation: 'The lecture describes a pair of radiographers, one handling the patient and one controlling the panel.' },
      { type: 'typed', prompt: 'In the worked request form example, which examination was requested and in which two projections?', accept: ['cxr pa and lat', 'chest x-ray pa and lateral', 'cxr (pa + lat)', 'cxr pa + lat', 'chest x-ray, pa and lat'],
        explanation: 'CXR (PA + Lat) — a chest X-ray in the posteroanterior and lateral projections. These are the only projection abbreviations that appear in the supplied Exploring Radiography lecture set.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A request form gives clinical information "Cough x 2/12. SOB" and diagnosis "Chest infection". Why does the radiographer need those two fields rather than just the examination name?',
        model: 'They tell the radiographer what the image is being asked to answer, which is what the "what is expected to see" question in the Week 1 lecture is about. The examination name says which images to take; the clinical information and diagnosis say what the referrer is looking for, which affects positioning and image assessment.',
        rubric: ['Distinguishes the examination requested from the clinical question', 'Links clinical information to what the image needs to show'] },
    ],
    commonMistakes: [
      'Reading only the "Examination Requested" line and ignoring the clinical information, diagnosis and LMP fields.',
    ],
    sourceRefs: [{ ref: 'hti.w5', location: 'Slides 3–7 Hospital Authority structure, manpower, team work, floor plan, reading the order form' }],
  },
];

/*
 * Radiograph image questions — schema for later use, not live data.
 *
 * A radiograph question is a normal STUDY_ITEM (any subject/unit) whose
 * `practice` entries carry an extra `image` field: a filename resolved
 * against outputs/assets/xray/. No new item type is needed — `mcq` and
 * `typed` questions both support it as-is, and dimensionFor() already
 * routes any question with an `image` field to the 'location' mastery
 * dimension.
 *
 * Add real cases only once you have a licensed image file AND a genuine
 * sourceRefs entry pointing at a file that exists in the supplied source
 * folders — see outputs/assets/xray/README.md and the project rule at the
 * top of this file. Do not invent positioning notes, landmark facts or
 * mnemonics. The supplied HTI17103/HTI17101 materials only establish "PA"
 * and "Lat" as projection terms so far (see the
 * 'hti17103-department-and-request' item above) — a real case's prompt and
 * explanation text must stay inside what the cited source actually says.
 *
 * Example shape (illustrative only — do not add this object to STUDY_ITEMS):
 *
 * {
 *   id: 'hti17103-cxr-pa-example',
 *   subject: 'HTI17103', unit: 'hti.modalities', type: 'mcq',
 *   title: 'Reading a CXR PA radiograph',
 *   lesson: { explanation: '...', keyFacts: ['...'], prerequisites: [], examples: [] },
 *   practice: [
 *     { type: 'mcq', image: 'cxr-pa-001.jpg',
 *       prompt: 'Which projection is shown here?',
 *       options: ['PA', 'Lat', 'AP', 'Oblique'], answer: 0,
 *       explanation: '...cite exactly what the source says...' },
 *   ],
 *   sourceRefs: [{ ref: 'hti.w2', location: '...' }],
 * }
 */

/* ------------------------------------------------------------------ *
 * APSS1A08 — limited coverage. No syllabus is invented here.
 * These entries only record which concept words appear in the supplied
 * student coursework, and are explicitly marked as unverified.
 * ------------------------------------------------------------------ */

export const SOCIOLOGY_NOTICE = {
  banner: 'Limited source coverage',
  headline: 'No verified lecture syllabus found in supplied sources',
  detail: 'The supplied folders contain student assignments, homework and term papers for Introduction to Sociology, plus three unreadable photographs. No lecture slides, subject description form, reading list or past paper was found. Study content has therefore not been generated for this subject. The files below are listed so they can be opened directly, and the concept words below are recorded only as evidence of what the coursework discusses — they are not definitions and have not been checked against any course material.',
  conceptMentions: [
    { term: 'Social reality', ref: 'soc.a1.star', note: 'Used in a student answer about why a freshman joined orientation activities.' },
    { term: 'Social norm', ref: 'soc.a1.star', note: 'Used in the same student answer.' },
    { term: 'Socialization', ref: 'soc.a1.star', note: 'Described by the student as taking place at home, at school, from peers and from caregivers.' },
    { term: 'Deviant behaviour', ref: 'soc.a1.star', note: 'Used by the student to describe acting against a social norm.' },
  ],
  fileRefs: ['soc.a1.star', 'soc.a2.star', 'soc.fp.star', 'soc.a1.green', 'soc.hw2.green', 'soc.tp.green', 'soc.tp.extra', 'soc.a1.extra', 'soc.a2.extra', 'soc.a2.gold', 'soc.ass1.oste', 'soc.ass2.oste', 'soc.img.torti'],
};

export const PLACEHOLDER_NOTICES = {
  DSAI1202: {
    headline: 'No verified DSAI1202 materials were found',
    detail: 'A search of all 22 supplied shared folders returned no file whose name or path contains DSAI1202, "data analytics" or "artificial intelligence". No lessons, flashcards or questions have been generated for this subject. Add source files to the folder and they will be listed here for review before any study content is created.',
    searched: ['DSAI1202', 'DSAI', 'data analytic', 'artificial intell'],
  },
  LEI1101: {
    headline: 'No verified LEI1101 materials were found',
    detail: 'A search of all 22 supplied shared folders returned no file whose name or path contains LEI1101 or a matching language-learning subject. ELC1011 Practical English for University Studies and ELC1012 English for University Studies do exist in the supplied folders, but they are different subjects and have deliberately not been substituted. No language-learning syllabus has been generated.',
    searched: ['LEI1101', 'LEI'],
    doNotSubstitute: ['ELC1011 Practical English for University Studies', 'ELC1012 English for University Studies'],
  },
};

/* ------------------------------------------------------------------ *
 * Structure sets — granular 3D targets
 *
 * The bundled Z-Anatomy / BodyParts3D skeleton carries 277 individually
 * named meshes, including every carpal, every tarsal, the separate skull
 * bones and all 24 presacral vertebrae. `mesh` is the exact node name in
 * that file, minus the .l / .r side suffix, which the picker matches on
 * either side. These sets drive tap-to-identify with a blank test view.
 * ------------------------------------------------------------------ */

export const REVEAL_MODES = [
  { id: 'labelled', label: 'Teaching', hint: 'Everything named. Read it and build the picture.' },
  { id: 'guided', label: 'Guided', hint: 'A couple of anchors left in. Work out the rest from them.' },
  { id: 'blank', label: 'Test', hint: 'Nothing named. Identify every structure yourself.' },
];

/*
 * `model` names which bundled GLB a set's meshes live in:
 *   'skeleton'    z-anatomy-skeleton.glb   277 named meshes, bones only
 *   'organs'      ic-organlar.glb          120 named meshes, viscera
 *   'circulatory' dolasim.glb              676 named meshes, heart and vessels
 */
export const STRUCTURE_SETS = {
  carpals: {
    id: 'carpals', label: 'The eight carpal bones', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'upper_limb', paired: true,
    anchors: ['scaphoid', 'pisiform'],
    members: [
      { id: 'scaphoid', label: 'Scaphoid', mesh: 'Scaphoid bone', group: 'Proximal row', order: 1, note: 'Most lateral of the proximal row — the thumb side.' },
      { id: 'lunate', label: 'Lunate', mesh: 'Lunate bone', group: 'Proximal row', order: 2, note: 'Sits medial to the scaphoid.' },
      { id: 'triquetrum', label: 'Triquetrum', mesh: 'Triquetrum bone', group: 'Proximal row', order: 3 },
      { id: 'pisiform', label: 'Pisiform', mesh: 'Pisiform bone', group: 'Proximal row', order: 4, note: 'The pea-shaped sesamoid sitting on the triquetrum.' },
      { id: 'trapezium', label: 'Trapezium', mesh: 'Trapezium bone', group: 'Distal row', order: 5, note: 'Under the thumb — trapeziuM for thuMb.' },
      { id: 'trapezoid', label: 'Trapezoid', mesh: 'Trapezoid bone', group: 'Distal row', order: 6 },
      { id: 'capitate', label: 'Capitate', mesh: 'Capitate bone', group: 'Distal row', order: 7, note: 'The largest carpal.' },
      { id: 'hamate', label: 'Hamate', mesh: 'Hamate bone', group: 'Distal row', order: 8 },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slide "Carpal Bones" — proximal and distal row key' }, { ref: 'hss.m0.1718', location: 'L1 p45 right wrist (radiocarpal) joint' }],
  },
  tarsals: {
    id: 'tarsals', label: 'The seven tarsal bones', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'lower_limb', paired: true,
    anchors: ['talus', 'calcaneus'],
    members: [
      { id: 'talus', label: 'Talus', mesh: 'Talus', group: 'Proximal', order: 1, note: 'Sits on the calcaneus and takes the leg’s load into the foot.' },
      { id: 'calcaneus', label: 'Calcaneus', mesh: 'Calcaneus', group: 'Proximal', order: 2, note: 'The heel bone.' },
      { id: 'navicular', label: 'Navicular', mesh: 'Navicular bone', group: 'Intermediate', order: 3, note: 'Between the talus and the cuneiforms.' },
      { id: 'cuboid', label: 'Cuboid', mesh: 'Cuboid bone', group: 'Lateral', order: 4 },
      { id: 'medial-cuneiform', label: 'Medial cuneiform', mesh: 'Medial cuneiform bone', group: 'Distal', order: 5 },
      { id: 'intermediate-cuneiform', label: 'Intermediate cuneiform', mesh: 'Intermediate cuneiform bone', group: 'Distal', order: 6 },
      { id: 'lateral-cuneiform', label: 'Lateral cuneiform', mesh: 'Lateral cuneiform bone', group: 'Distal', order: 7 },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slide "Ankle & Foot" — tarsal bones' }],
  },
  skullBones: {
    id: 'skullBones', label: 'Bones of the skull', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'skull', paired: false,
    anchors: ['frontal', 'mandible'],
    members: [
      { id: 'frontal', label: 'Frontal bone', mesh: 'Frontal bone', group: 'Cranial', order: 1 },
      { id: 'parietal', label: 'Parietal bone', mesh: 'Parietal bone', group: 'Cranial', order: 2, note: 'Paired — meets its partner at the sagittal suture.' },
      { id: 'temporal', label: 'Temporal bone', mesh: 'Temporal bone', group: 'Cranial', order: 3, note: 'Meets the parietal at the squamous suture.' },
      { id: 'occipital', label: 'Occipital bone', mesh: 'Occipital bone', group: 'Cranial', order: 4, note: 'Meets the parietals at the lambdoid suture.' },
      { id: 'sphenoid', label: 'Sphenoid bone', mesh: 'Sphenoid bone', group: 'Cranial', order: 5 },
      { id: 'ethmoid', label: 'Ethmoid bone', mesh: 'Ethmoid bone', group: 'Cranial', order: 6 },
      { id: 'maxilla', label: 'Maxilla', mesh: 'Maxilla', group: 'Facial', order: 7 },
      { id: 'zygomatic', label: 'Zygomatic bone', mesh: 'Zygomatic bone', group: 'Facial', order: 8 },
      { id: 'nasal', label: 'Nasal bone', mesh: 'Nasal bone', group: 'Facial', order: 9 },
      { id: 'lacrimal', label: 'Lacrimal bone', mesh: 'Lacrimal bone', group: 'Facial', order: 10 },
      { id: 'vomer', label: 'Vomer', mesh: 'Vomer', group: 'Facial', order: 11 },
      { id: 'mandible', label: 'Mandible', mesh: 'Mandible', group: 'Facial', order: 12, note: 'The only movable bone in the skull.' },
    ],
    sourceRefs: [{ ref: 'hss.4.2', location: 'Head and neck — bones of the skull' }, { ref: 'hss.revans', location: 'More exercises Module 4, labels A4–A12' }],
  },
  vertebralRegions: {
    id: 'vertebralRegions', label: 'Regions of the vertebral column', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'spine', paired: false,
    anchors: ['atlas'],
    members: [
      { id: 'atlas', label: 'Atlas (C1)', mesh: 'Atlas (C1)', group: 'Cervical', order: 1, note: 'Carries the skull; the nod happens here.' },
      { id: 'axis', label: 'Axis (C2)', mesh: 'Axis (C2)', group: 'Cervical', order: 2, note: 'Its dens is the pivot the head shakes on.' },
      { id: 'c-typical', label: 'Typical cervical vertebra (C3–C7)', mesh: 'Vertebra C5', group: 'Cervical', order: 3, note: 'Seven cervical vertebrae in all.' },
      { id: 't-typical', label: 'Typical thoracic vertebra (T1–T12)', mesh: 'Vertebra T6', group: 'Thoracic', order: 4, note: 'Twelve of them, one per rib pair.' },
      { id: 'l-typical', label: 'Typical lumbar vertebra (L1–L5)', mesh: 'Vertebra L3', group: 'Lumbar', order: 5, note: 'Five, with the largest bodies.' },
      { id: 'sacrum', label: 'Sacrum', mesh: 'Sacrum', group: 'Sacral', order: 6, note: 'S1–S5 fused.' },
      { id: 'coccyx', label: 'Coccyx', mesh: 'Coccyx', group: 'Coccygeal', order: 7, note: 'Co1–Co4 fused.' },
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p15 vertebral column; p21 general structure; p28–29 cervical vertebrae' }],
  },
  heartChambers: {
    id: 'heartChambers', label: 'Heart chambers and valves', subject: 'ABCT2326', unit: 'phys.cvs',
    model: 'circulatory', view: 'thorax', paired: false,
    anchors: ['ra', 'lv'],
    members: [
      { id: 'ra', label: 'Right atrium', mesh: 'Right atrium', group: 'Chambers', order: 1, note: 'Receives from the venae cavae.' },
      { id: 'rv', label: 'Right ventricle', mesh: 'Right ventricle', group: 'Chambers', order: 2, note: 'Thinner, pouch-shaped wall; pumps to the lungs.' },
      { id: 'la', label: 'Left atrium', mesh: 'Left atrium', group: 'Chambers', order: 3, note: 'Receives the pulmonary veins.' },
      { id: 'lv', label: 'Left ventricle', mesh: 'Left ventricle', group: 'Chambers', order: 4, note: 'Round and thick-walled; pumps into the aorta.' },
      { id: 'tricuspid', label: 'Right AV (tricuspid) valve', mesh: 'Septal leaflet of right atrioventricular valve', group: 'Valves', order: 5, note: 'Three cusps; closes when the right ventricle contracts.' },
      { id: 'mitral', label: 'Left AV (bicuspid) valve', mesh: 'Posterior leaflet of left atrioventricular valve', group: 'Valves', order: 6, note: 'Two cusps — bicuspid, or mitral.' },
      { id: 'pulmvalve', label: 'Pulmonary valve', mesh: 'Anterior semilunar leaflet of pulmonary valve', group: 'Valves', order: 7, note: 'Semilunar; guards the exit to the pulmonary trunk.' },
      { id: 'papillary', label: 'Papillary muscle', mesh: 'Anterior papillary muscle of right ventricle', group: 'Valve apparatus', order: 8, note: 'Holds the AV valve through the chordae tendineae.' },
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 28–39 heart chambers, AV valves, semilunar valves, functions of the valves' }, { ref: 'hss.1.2', location: 'Cardiopulmonary system and associated structures' }],
    modelGap: 'The aortic valve leaflets are not separately named in this model, and neither is the conducting system.',
  },
  greatVessels: {
    id: 'greatVessels', label: 'Great vessels of the heart', subject: 'ABCT2326', unit: 'phys.cvs',
    model: 'circulatory', view: 'thorax', paired: false,
    anchors: ['aorticarch'],
    members: [
      { id: 'svc', label: 'Superior vena cava', mesh: 'Superior vena cava', group: 'Venous inflow', order: 1 },
      { id: 'ivc', label: 'Inferior vena cava', mesh: 'Inferior vena cava (thoracic part)', group: 'Venous inflow', order: 2 },
      { id: 'pulmtrunk', label: 'Pulmonary trunk', mesh: 'Pulmonary trunk', group: 'Pulmonary circuit', order: 3, note: 'Leaves the right ventricle carrying deoxygenated blood.' },
      { id: 'rpa', label: 'Right pulmonary artery', mesh: 'Right pulmonary artery', group: 'Pulmonary circuit', order: 4 },
      { id: 'lpa', label: 'Left pulmonary artery', mesh: 'Left pulmonary artery', group: 'Pulmonary circuit', order: 5 },
      { id: 'aorticarch', label: 'Aortic arch', mesh: 'Aortic arch', group: 'Systemic outflow', order: 6, note: 'Lies in the superior mediastinum.' },
      { id: 'coronarysinus', label: 'Coronary sinus', mesh: 'Coronary sinus', group: 'Coronary circulation', order: 7 },
      { id: 'rca', label: 'Right coronary artery', mesh: 'Right coronary artery', group: 'Coronary circulation', order: 8 },
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 18–20 pulmonary and systemic circulations; Figure 20-1' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.2 and 1.3 answers' }],
  },
  airwayTree: {
    id: 'airwayTree', label: 'The airway and the lung lobes', subject: 'ABCT2326', unit: 'phys.resp',
    model: 'organs', view: 'thorax', paired: false,
    anchors: ['trachea'],
    members: [
      { id: 'trachea', label: 'Trachea', mesh: 'Trachea', group: 'Conducting — proximal', order: 1 },
      { id: 'rmain', label: 'Right main bronchus', mesh: 'Right main bronchus', group: 'Conducting — proximal', order: 2 },
      { id: 'lmain', label: 'Left main bronchus', mesh: 'Left main bronchus', group: 'Conducting — proximal', order: 3 },
      { id: 'rsuplobar', label: 'Right superior lobar bronchus', mesh: 'Right superior lobar bronchus', group: 'Conducting — lobar', order: 4 },
      { id: 'rmidlobar', label: 'Right middle lobar bronchus', mesh: 'Middle lobar bronchus', group: 'Conducting — lobar', order: 5 },
      { id: 'rinflobar', label: 'Right inferior lobar bronchus', mesh: 'Right inferior lobar bronchus', group: 'Conducting — lobar', order: 6 },
      { id: 'rsuplobe', label: 'Superior lobe of right lung', mesh: 'Superior lobe of right lung', group: 'Right lung — three lobes', order: 7 },
      { id: 'rmidlobe', label: 'Middle lobe of right lung', mesh: 'Middle lobe of right lung', group: 'Right lung — three lobes', order: 8 },
      { id: 'rinflobe', label: 'Inferior lobe of right lung', mesh: 'Inferior lobe of right lung', group: 'Right lung — three lobes', order: 9 },
      { id: 'lsuplobe', label: 'Superior lobe of left lung', mesh: 'Superior lobe of left lung', group: 'Left lung — two lobes', order: 10 },
      { id: 'linflobe', label: 'Inferior lobe of left lung', mesh: 'Inferior lobe of left lung', group: 'Left lung — two lobes', order: 11 },
      { id: 'pleura', label: 'Pleura', mesh: 'Pleura', group: 'Covering', order: 12, note: 'Visceral pleura covers the lung; parietal lines the cavity.' },
    ],
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 5–7 organisation of the respiratory system, the respiratory tract' }, { ref: 'hss.1.1', location: 'Cardiovascular system and lungs — pleura and lung surfaces' }],
  },
  urinaryTract: {
    id: 'urinaryTract', label: 'The urinary tract', subject: 'ABCT2326', unit: 'phys.renal',
    model: 'organs', view: 'abdomen', paired: false,
    anchors: ['kidney'],
    members: [
      { id: 'suprarenal', label: 'Suprarenal gland', mesh: 'Suprarenal gland', group: 'Related', order: 1, note: 'Sits on the kidney but is endocrine, not urinary.' },
      { id: 'kidney', label: 'Kidney', mesh: 'Kidney', group: 'Urine formation', order: 2, note: 'Holds over a million nephrons.' },
      { id: 'renalpelvis', label: 'Renal pelvis', mesh: 'Renal pelvis', group: 'Drainage', order: 3, note: 'Minor calyces unite into a major calyx, then the pelvis.' },
      { id: 'ureter', label: 'Ureter', mesh: 'Ureter', group: 'Drainage', order: 4, note: 'Enters the posterior wall of the bladder.' },
      { id: 'bladder', label: 'Urinary bladder', mesh: 'Urinary bladder', group: 'Storage', order: 5, note: 'Its muscular wall is the detrusor.' },
      { id: 'urethra', label: 'Urethra', mesh: 'Urethra', group: 'Outflow', order: 6 },
    ],
    sourceRefs: [{ ref: 'phys.5', location: 'Slides 4–5 structure of the urinary system and the kidney' }, { ref: 'hss.3.2', location: 'Urogenital system lecture' }],
  },
  digestiveTract: {
    id: 'digestiveTract', label: 'The digestive tract and its accessory organs', subject: 'ABCT2326', unit: 'phys.dig',
    model: 'organs', view: 'abdomen', paired: false,
    anchors: ['stomach'],
    members: [
      { id: 'oesophagus', label: 'Oesophagus', mesh: 'Oesophagus', group: 'Tract — upper', order: 1, note: 'Pierces the diaphragm at T10.' },
      { id: 'stomach', label: 'Stomach', mesh: 'Stomach', group: 'Tract — upper', order: 2, note: 'Entered at the cardiac orifice; pylorus lies at L1.' },
      { id: 'duodenum', label: 'Duodenum', mesh: 'Duodenum', group: 'Tract — small intestine', order: 3 },
      { id: 'jejunum', label: 'Jejunum', mesh: 'Jejunum', group: 'Tract — small intestine', order: 4, note: 'Begins at the duodenojejunal junction.' },
      { id: 'ascending', label: 'Ascending colon', mesh: 'Ascending colon', group: 'Tract — large intestine', order: 5 },
      { id: 'transverse', label: 'Transverse colon', mesh: 'Transverse colon', group: 'Tract — large intestine', order: 6 },
      { id: 'descending', label: 'Descending colon', mesh: 'Descending colon', group: 'Tract — large intestine', order: 7 },
      { id: 'sigmoid', label: 'Sigmoid colon', mesh: 'Sigmoid colon', group: 'Tract — large intestine', order: 8 },
      { id: 'appendix', label: 'Vermiform appendix', mesh: 'Vermiform appendix', group: 'Tract — large intestine', order: 9 },
      { id: 'liver', label: 'Liver', mesh: 'Liver', group: 'Accessory', order: 10, note: 'Secretes bile; receives gut blood by the hepatic portal vein.' },
      { id: 'gallbladder', label: 'Gallbladder', mesh: 'Gallbladder', group: 'Accessory', order: 11, note: 'Stores and concentrates bile.' },
      { id: 'pancreas', label: 'Pancreas', mesh: 'Pancreas', group: 'Accessory', order: 12, note: 'Exocrine buffers and enzymes; endocrine hormones.' },
    ],
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 2–3 major organs of the digestive tract and accessory organs' }, { ref: 'hss.3.1', location: 'Digestive system lecture' }],
  },
  rotatorCuff: {
    id: 'rotatorCuff', label: 'Rotator cuff and the abduction muscles', subject: 'HSS2011', unit: 'hss.joints',
    model: 'muscle', view: 'upper_limb', paired: true,
    anchors: ['supraspinatus'],
    members: [
      { id: 'supraspinatus', label: 'Supraspinatus', mesh: 'Supraspinatus muscle', group: 'Rotator cuff', order: 1, note: 'Initiates the first 15 degrees of abduction. Suprascapular nerve.' },
      { id: 'infraspinatus', label: 'Infraspinatus', mesh: 'Infraspinatus muscle', group: 'Rotator cuff', order: 2, note: 'Lateral rotation. Suprascapular nerve.' },
      { id: 'teres-minor', label: 'Teres minor', mesh: 'Teres minor muscle', group: 'Rotator cuff', order: 3, note: 'Lateral rotation. Axillary nerve.' },
      { id: 'subscapularis', label: 'Subscapularis', mesh: 'Subscapularis muscle', group: 'Rotator cuff', order: 4, note: 'The only one in front, and the only medial rotator. Subscapular nerve.' },
      { id: 'deltoid', label: 'Deltoid (acromial part)', mesh: 'Acromial part of deltoid muscle', group: 'Abduction sequence', order: 5, note: 'The powerful abductor, taking over from supraspinatus. Axillary nerve.' },
      { id: 'trapezius', label: 'Trapezius (transverse part)', mesh: 'Transverse part of trapezius muscle', group: 'Abduction sequence', order: 6, note: 'Upward rotation of the scapula, the last stage of full abduction.' },
      { id: 'latissimus', label: 'Latissimus dorsi', mesh: 'Latissimus dorsi muscle', group: 'Shoulder girdle', order: 7, note: 'Adduction and medial rotation. Thoracodorsal nerve.' },
      { id: 'pec-major', label: 'Pectoralis major (sternocostal head)', mesh: 'Sternocostal head of pectoralis major muscle', group: 'Shoulder girdle', order: 8, note: 'Flexion, adduction and medial rotation. Pectoral nerve.' },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides 16–26 shoulder girdle muscles, rotator cuff, muscles involved in full abduction of the arm' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 3' }],
    modelGap: 'Deltoid, pectoralis major and trapezius are split into named parts in this model, so one representative part is used for each.',
  },
  cranialNerves: {
    id: 'cranialNerves', label: 'Cranial nerves', subject: 'HSS2011', unit: 'hss.m2',
    model: 'nervous', view: 'skull', paired: true,
    anchors: ['trigeminal'],
    members: [
      { id: 'olfactory', label: 'Olfactory nerve (I)', mesh: 'Olfactory nerve (I)', group: 'Special sense', order: 1 },
      { id: 'optic', label: 'Optic nerve (II)', mesh: 'Optic nerve (II)', group: 'Special sense', order: 2 },
      { id: 'trochlear', label: 'Trochlear nerve (IV)', mesh: 'Trochlear nerve (IV)', group: 'Eye movement', order: 3 },
      { id: 'abducens', label: 'Abducens nerve (VI)', mesh: 'Abducens nerve (VI)', group: 'Eye movement', order: 4 },
      { id: 'trigeminal', label: 'Trigeminal nerve (V)', mesh: 'Trigeminal nerve (V)', group: 'Face', order: 5, note: 'Controls the muscles of mastication.' },
      { id: 'facial', label: 'Facial nerve (VII)', mesh: 'Facial nerve (VII)', group: 'Face', order: 6, note: 'Muscles of facial expression, including frontalis.' },
      { id: 'vestibulocochlear', label: 'Vestibulocochlear nerve (VIII)', mesh: 'Vestibulocochlear nerve (VIII)', group: 'Special sense', order: 7 },
      { id: 'glossopharyngeal', label: 'Glossopharyngeal nerve (IX)', mesh: 'Glossopharyngeal nerve (IX)', group: 'Pharynx & viscera', order: 8, note: 'Carries carotid body chemoreceptor input.' },
      { id: 'vagus', label: 'Vagus nerve (X)', mesh: 'Vagus nerve (X)', group: 'Pharynx & viscera', order: 9, note: 'The longest cranial nerve. Carries aortic body chemoreceptor input.' },
      { id: 'hypoglossal', label: 'Hypoglossal nerve (XII)', mesh: 'Hypoglossal nerve (XII)', group: 'Tongue', order: 10 },
    ],
    sourceRefs: [{ ref: 'hss.vocab', location: 'Glossary — the cranial nerves listed as examinable terms' }, { ref: 'hss.revans', location: 'Module 2.3 Fill-in-blanks 1 and 4; Module 4.2 Fill-in-blanks 1' }, { ref: 'phys.3', location: 'Slides 68–69 glossopharyngeal and vagus chemoreceptor input' }],
    modelGap: 'Oculomotor (III) and accessory (XI) are in the model but are not named in the HSS2011 glossary, so they are left out of this set rather than added on assumption.',
  },
  brainAndCsf: {
    id: 'brainAndCsf', label: 'Brainstem, ventricles and the spinal cord', subject: 'HSS2011', unit: 'hss.m2',
    model: 'nervous', view: 'skull', paired: false,
    anchors: ['medulla'],
    members: [
      { id: 'midbrain', label: 'Midbrain', mesh: 'Midbrain', group: 'Brainstem', order: 1 },
      { id: 'pons', label: 'Pons', mesh: 'Pons', group: 'Brainstem', order: 2 },
      { id: 'medulla', label: 'Medulla oblongata', mesh: 'Medulla oblongata', group: 'Brainstem', order: 3, note: 'Its ventrolateral surface carries the central chemoreceptors.' },
      { id: 'lateralvent', label: 'Lateral ventricle', mesh: 'Lateral ventricle', group: 'Ventricular system', order: 4 },
      { id: 'thirdvent', label: 'Third ventricle', mesh: 'Third ventricle', group: 'Ventricular system', order: 5, note: 'Reached from the lateral ventricle through the interventricular foramen.' },
      { id: 'aqueduct', label: 'Aqueduct of midbrain', mesh: 'Aqueduct of midbrain', group: 'Ventricular system', order: 6 },
      { id: 'fourthvent', label: 'Fourth ventricle', mesh: 'Fourth ventricle', group: 'Ventricular system', order: 7 },
      { id: 'corpuscallosum', label: 'Corpus callosum', mesh: 'Corpus callosum', group: 'Forebrain', order: 8, note: 'The principal commissural tract between the hemispheres.' },
      { id: 'thalamus', label: 'Thalamus', mesh: 'Thalamus', group: 'Forebrain', order: 9, note: 'Forms the walls of the diencephalon around the third ventricle.' },
      { id: 'spinaldura', label: 'Spinal dura', mesh: 'Spinal dura', group: 'Spinal cord', order: 10 },
      { id: 'caudaequina', label: 'Cauda equina', mesh: 'Cauda equina', group: 'Spinal cord', order: 11, note: 'Below L1–L2, where the cord itself has ended.' },
    ],
    sourceRefs: [{ ref: 'hss.2.3', location: 'Neuroanatomy lecture' }, { ref: 'hss.revans', location: 'Module 2.1 and 2.3 answers' }],
  },
  kneeJoint: {
    id: 'kneeJoint', label: 'Inside the knee — a synovial joint', subject: 'HSS2011', unit: 'hss.joints',
    model: 'joint', view: 'lower_limb', paired: true,
    anchors: ['capsule'],
    members: [
      { id: 'capsule', label: 'Articular capsule', mesh: 'Articular capsule of knee joint', group: 'Capsule', order: 1, note: 'The dense connective tissue cuff; its thickenings are the joint ligaments.' },
      { id: 'acl', label: 'Anterior cruciate ligament', mesh: 'Anterior cruciate ligament', group: 'Ligaments', order: 2, note: 'A ligament binds bone to bone.' },
      { id: 'pcl', label: 'Posterior cruciate ligament', mesh: 'Posterior cruciate ligament', group: 'Ligaments', order: 3 },
      { id: 'medmen', label: 'Medial meniscus', mesh: 'Medial meniscus', group: 'Menisci', order: 4, note: 'Acts as a shock absorber, like the intervertebral disc.' },
      { id: 'latmen', label: 'Lateral meniscus', mesh: 'Lateral meniscus', group: 'Menisci', order: 5 },
      { id: 'hipcapsule', label: 'Articular capsule of hip joint', mesh: 'Articular capsule of hip joint', group: 'Compare', order: 6, note: 'The hip capsule, for comparison — deep socket, far more stable.' },
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides 37–42 synovial joints — articular cartilage, fibrous capsule, ligaments' }, { ref: 'hss.m0.1718', location: 'L1 p26 intervertebral disc as shock absorber; p56 right knee joint' }],
    modelGap: 'The synovial membrane and joint cavity are not separate meshes, so the layered structure still comes from the lecture diagram.',
  },
};

export function structureSet(id) { return STRUCTURE_SETS[id] || null; }

/* Which bundled GLB a structure set needs. */
export const STRUCTURE_MODELS = {
  skeleton: { file: './assets/z-anatomy-skeleton.glb', label: 'Skeleton', meshes: 277 },
  organs: { file: './assets/ic-organlar.glb', label: 'Internal organs', meshes: 120 },
  circulatory: { file: './assets/dolasim.glb', label: 'Circulatory system', meshes: 676 },
  nervous: { file: './assets/sinir.glb', label: 'Nervous system', meshes: 582 },
  muscle: { file: './assets/kas.glb', label: 'Muscular system', meshes: 683 },
  joint: { file: './assets/eklem.glb', label: 'Ligaments and joints', meshes: 413 },
};

/* ------------------------------------------------------------------ *
 * Expansion batch — fills gaps found in a coverage audit
 * ------------------------------------------------------------------ */

const EXPANSION_ITEMS = [
  {
    id: 'hss2011-terminology-word-parts',
    subject: 'HSS2011', unit: 'hss.term', type: 'matching',
    title: 'Word parts — prefixes, suffixes and roots',
    tags: ['terminology', 'foundation', 'high-yield'],
    lesson: {
      explanation: 'Anatomical terms are built from roots, prefixes and suffixes. The root usually names an organ, tissue or condition; the prefix or suffix describes it. Once you can take a term apart, you can read one you have never met. The subject supplies a word-part list prepared by the Module 0 lecturer: prefixes of position such as epi- (above, upon), hypo- (below; also deficient), inter- (between), peri- and circum- (around), pre- (before, in front of), post- (behind, after), retro- (backward), ab- (away from), para- (near, beside; also abnormal); roots of place such as cardi/o (heart), oste/o (bone), arthr/o (joint), my/o (muscle), neur/o (nerve), nephr/o and ren/o (kidney), pulmon/o (lung), crani/o (skull), cost/o (rib), later/o (side), medi/o (middle), anter/o (front), poster/o and dors/o (back), ventr/o (belly side), proxim/o (near), infer/o (downward); and suffixes of process such as -graphy (process of recording), -graph (instrument to record), -scopy (process of viewing), -tomy (incision, cutting), -stomy (new opening), -itis (inflammation), -algia and -dynia (pain), -megaly (enlargement), -osis (abnormal condition), -emia (blood condition), -pathy (disease process).',
      keyFacts: [
        'Root = organ, tissue or condition. Prefix/suffix = describes the root.',
        'epi- above/upon · hypo- below or deficient · inter- between · circum- around · pre- before · post- after · retro- backward · ab- away from.',
        'cardi/o heart · oste/o bone · arthr/o joint · my/o muscle · neur/o nerve · nephr/o and ren/o kidney · crani/o skull · cost/o rib.',
        'later/o side · medi/o middle · anter/o front · poster/o and dors/o back · ventr/o belly side · proxim/o near · infer/o downward.',
        '-graphy process of recording · -graph the instrument · -scopy process of viewing · -itis inflammation · -algia pain · -megaly enlargement · -osis abnormal condition · -emia blood condition.',
        'hypertension = hyper- (high/over) + tension (pressure) = abnormally high blood pressure.',
      ],
      prerequisites: ['hss2011-terminology-directional-pairs'],
      examples: ['Radiography itself is a word part exercise: radio- (radiation) + -graphy (process of recording).'],
    },
    memory: {
      chunking: 'Three slots, always in the same order: prefix (where/how much) → root (what) → suffix (what is happening to it). Read any term left to right in those slots.',
      wordOrigin: 'The directional roots are the Latin words behind the directional terms you already know — proxim/o is proximal, later/o is lateral, medi/o is medial. You have half of this list already.',
      comparison: '-graphy is the process, -graph is the machine, -gram is the result. Radiography is what you do, the radiograph is what you get.',
      teachBack: 'Take a term you have never seen — say "costochondritis" — and split it out loud: cost/o rib + chondr/o cartilage + -itis inflammation. If you can do that cold, you have the skill.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each prefix to its meaning.',
        pairs: [['epi-', 'Above, upon'], ['hypo-', 'Below; deficient'], ['inter-', 'Between'], ['retro-', 'Backward']],
        explanation: 'These are the meanings given in the subject word-part list.' },
      { type: 'matching', prompt: 'Match each suffix to its meaning.',
        pairs: [['-itis', 'Inflammation'], ['-algia', 'Pain'], ['-megaly', 'Enlargement'], ['-graphy', 'Process of recording']],
        explanation: 'Note -graphy is the process; -graph is the instrument that records.' },
      { type: 'typed', prompt: 'Which root means bone?', accept: ['oste/o', 'osteo', 'oste', 'oss/i', 'osse/o'],
        explanation: 'oste/o (also oss/i, osse/o). It is the root inside "osteology", the study of bones.' },
      { type: 'typed', prompt: 'Split the word "radiography" into its two parts and give the meaning of each.', accept: ['radio- radiation, -graphy process of recording', 'radio radiation graphy recording', 'radio = radiation, graphy = process of recording'],
        explanation: 'radio- is the radial spread-out of energy, i.e. radiation; -graphy is the process of recording. The HTI17103 lecture makes exactly this split.' },
      { type: 'mcq', prompt: 'A term ending in -ostomy describes what?', options: ['An incision', 'A new opening', 'An instrument to view', 'An abnormal condition'], answer: 1,
        explanation: '-stomy is a new opening. -tomy is incision or cutting, -scope is the instrument to view, -osis is an abnormal condition.' },
    ],
    application: [
      { type: 'scenario', prompt: 'You meet the term "pericarditis" for the first time in a report. Work out what it means from its parts, and say which structure from your thorax study it involves.',
        model: 'peri- (around) + cardi/o (heart) + -itis (inflammation) — inflammation of the structure around the heart, which is the pericardium. That is the sac you already distinguish from the epicardium, which is the heart wall’s own outer layer.',
        rubric: ['Splits the term into all three parts', 'Gives the meaning of each part', 'Identifies the pericardium and separates it from the epicardium'] },
    ],
    commonMistakes: [
      'Confusing -graphy (the process), -graph (the instrument) and -gram (the record produced).',
      'Reading hypo- only as "below in position" — the list also gives it as "deficient, below, under", which is how it is used in words like hypoglycaemia.',
    ],
    sourceRefs: [{ ref: 'hss.wordparts', location: 'Full word-part list, prepared by Josephine Lau (HTI)' }, { ref: 'hss.orientation', location: 'Opening paragraph on roots, prefixes and suffixes' }],
  },
  {
    id: 'hss2011-pastpaper-joints-articulations',
    subject: 'HSS2011', unit: 'hss.joints', type: 'cloze',
    title: 'Past-paper drill — joints and articulations',
    tags: ['joints', 'exam', 'high-yield'],
    lesson: {
      explanation: 'These are fill-in-the-blank questions taken from the topic-sorted past-paper bank, kept only where the answer is independently confirmed by a current HSS2011 lecture or the revision-exercise answer key. They are worth drilling because they show how the same handful of facts — joint classification, which bones meet where, and the names of the resulting joints — get asked year after year in slightly different wording.',
      keyFacts: [
        'The humerus articulates with the ulna and radius to form the elbow joint.',
        'The intervertebral disc is a cartilaginous joint, between the vertebral bodies of two adjacent vertebrae.',
        'A sutural joint of the skull is a fibrous joint.',
        'The medial end of the clavicle meets the sternum at the sternoclavicular joint.',
        'The glenoid fossa articulates with the head of the humerus to form the shoulder joint.',
        'The carpal bones articulate with the radius to form the radiocarpal (wrist) joint.',
        'The femoral and tibial condyles are the articular parts of the knee joint.',
        'The patella is the largest sesamoid bone in the body.',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [],
    },
    memory: {
      chunking: 'Almost every one of these is the same question in disguise: name the two bones, then name the joint. Answer in that order and the wording stops mattering.',
      comparison: 'Three joint classes, three giveaway words in the question. "Suture" means fibrous. "Disc" means cartilaginous. Anything with a named cavity or free movement means synovial.',
      teachBack: 'Take any joint in your own body, say which two bones form it and which class it belongs to, out loud. If you can do ten in a row you have covered most of what this bank asks.',
    },
    practice: [
      { type: 'cloze', prompt: 'The ______ is a long bone of the arm. It articulates with the ulna and radius to form the ______ joint.', accept: ['humerus; elbow', 'humerus, elbow', 'humerus and elbow'],
        explanation: 'Humerus, elbow. The lecture shows the humeral trochlea meeting the trochlear notch of the ulna and the capitulum meeting the head of the radius.',
        src: { ref: 'hss.4.3', location: 'Slide "Elbow Joint (Anterior View)", Fig. 8-4c' } },
      { type: 'cloze', prompt: 'The intervertebral disc is typed as a ______ joint, located between the vertebral ______ of two adjacent vertebrae.', accept: ['cartilaginous; bodies', 'cartilaginous, bodies', 'cartilaginous and bodies', 'symphysis; bodies'],
        explanation: 'Cartilaginous, bodies. The lecture names the inter-body joints of the spine as symphyses — secondary cartilaginous joints where two bones are joined by fibrocartilage.',
        src: { ref: 'hss.4.1', location: 'Slide "Cartilaginous joints — Symphyses"' } },
      { type: 'cloze', prompt: 'The sutural joint of the skull is typed as a ______ joint.', accept: ['fibrous'],
        explanation: 'Fibrous. Sutures articulate by process and indentation with the bones bound by fibrous connective tissue, which is why they permit the least movement of any joint.',
        src: { ref: 'hss.4.1', location: 'Slide "Fibrous joints — Sutures"' } },
      { type: 'cloze', prompt: 'The medial end of the clavicle articulates with the sternum to form the ______ joint.', accept: ['sternoclavicular', 'sternoclavicular joint'],
        explanation: 'Sternoclavicular — and it is the only bony joint linking the upper limb back to the axial skeleton.',
        src: { ref: 'hss.4.3', location: 'Slide "Joints Around Shoulder Region", Fig. 8-2' } },
      { type: 'cloze', prompt: 'The carpal bones articulate with the radius to form the ______ joint.', accept: ['radiocarpal', 'wrist', 'radiocarpal (wrist)', 'wrist joint', 'radiocarpal joint'],
        explanation: 'The radiocarpal, or wrist, joint. Its articular bones are the radius with the scaphoid, lunate and triquetrum.',
        src: { ref: 'hss.m0.1718', location: 'L1 p45 right wrist (radiocarpal) joint' } },
      { type: 'cloze', prompt: 'The largest sesamoid bone in the human body is the ______.', accept: ['patella', 'kneecap'],
        explanation: 'The patella. A sesamoid bone develops within a tendon and alters the direction of its pull.',
        src: { ref: 'hss.4.1', location: 'Slide "Sesamoid bones"' } },
      { type: 'cloze', prompt: 'The outer surfaces and walls of bones are composed of ______ bone.', accept: ['compact'],
        explanation: 'Compact bone — a dense solid mass forming the outer surface layer of all bones. Cancellous (spongy) bone lies internally.',
        src: { ref: 'hss.revans', location: 'Module 4.1, Fill-in-blanks 1' } },
      { type: 'cloze', prompt: 'Tip-to-tip attachment of the thumb with any one of the fingers is called ______.', accept: ['opposition'],
        explanation: 'Opposition — and its opposite is reposition. Both happen at the carpo-metacarpal joint of the thumb. This question appears in the past-paper bank in almost the same words as the Module 0 slide.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 1' } },
    ],
    application: [
      { type: 'scenario', prompt: 'The same bank asks, in different years, for "the joint formed by the carpal bones and the radius" and for "the articular bones of the right wrist joint". What single piece of knowledge answers both, and what does that tell you about how to revise this topic?',
        model: 'Knowing that the radiocarpal joint is formed by the radius with the scaphoid, lunate and triquetrum answers both — one asks for the joint name, the other for its components. The lesson is to learn each joint as a small package (name, the bones, the class, the movements) rather than as an isolated fact, because the examiner can enter that package from any side.',
        rubric: ['Identifies the radiocarpal joint and its articular bones', 'Notes the two questions probe the same package from different directions', 'Draws the revision conclusion'] },
    ],
    commonMistakes: [
      'Answering "cartilage" when the question asks for the joint TYPE — the answer wanted is cartilaginous, or more precisely a symphysis.',
      'Giving the acromioclavicular joint for the medial end of the clavicle; medial means the sternal end, so it is the sternoclavicular joint.',
    ],
    sourceRefs: [
      { ref: 'hss.ga.topics', location: 'Skeletal Joint and Muscular systems; Upper Limbs and Lower Limbs — questions 2006-07 to 2011-12' },
      { ref: 'hss.4.1', location: 'Joint classification and bone structure slides' },
      { ref: 'hss.4.3', location: 'Upper and lower limb bones and joints' },
      { ref: 'hss.revans', location: 'Module 0 and Module 4.1 answer keys — used to verify every answer above' },
    ],
  },
  {
    id: 'hss2011-joints-synovial-types',
    subject: 'HSS2011', unit: 'hss.joints', type: 'comparison',
    title: 'The six synovial joint types, with examples',
    tags: ['joints', 'high-yield'],
    lesson: {
      explanation: 'Synovial joints are the most common in the body and come in six types, classified by the shape of the articulating surfaces and by how many axes of movement they allow. Hinge joints move in one plane only — the elbow, where the humeral trochlea sits in the trochlear notch of the ulna, and the interphalangeal joints. Pivot joints allow rotation about a single axis — the median atlanto-axial joint, where the atlas turns on the dens of the axis, and the proximal radioulnar joint that carries supination and pronation. Condylar joints allow movement in two planes — the radiocarpal (wrist) joint and the metacarpophalangeal joints. Saddle joints also allow two planes plus opposition — the carpo-metacarpal joint of the thumb. Plane joints allow gliding — the apophyseal (facet) joints of the vertebral column and the acromioclavicular joint. Ball-and-socket joints allow movement in all three planes — the glenohumeral joint, where the humeral head sits in the shallow glenoid fossa, and the hip joint, where the femoral head sits in the deep acetabulum.',
      keyFacts: [
        'Hinge — one plane. Elbow; interphalangeal joints.',
        'Pivot — rotation about one axis. Median atlanto-axial joint; proximal radioulnar joint.',
        'Condylar — two planes. Radiocarpal (wrist); metacarpophalangeal joints.',
        'Saddle — two planes plus opposition. Carpo-metacarpal joint of the thumb.',
        'Plane — gliding. Apophyseal (facet) joints; acromioclavicular joint.',
        'Ball-and-socket — all three planes. Glenohumeral; hip.',
        'Monoaxial means movement in one plane only.',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [],
    },
    memory: {
      chunking: 'Sort by how many planes first, then name the shape. One plane: hinge and pivot. Two planes: condylar and saddle. Three planes: ball-and-socket. Gliding sits outside the count.',
      comparison: 'Glenohumeral and hip are both ball-and-socket, and both let you move in three planes — but the glenoid fossa is shallow and the acetabulum is deep. Same class, opposite trade-off between mobility and stability.',
      visualCue: 'A saddle joint really is a saddle: two surfaces each curved one way and hollow the other, sitting across each other. That is why the thumb can oppose and the wrist cannot.',
      mnemonic: 'The thumb is the saddle. If a question mentions opposition, it is the carpo-metacarpal joint of the thumb every time.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each synovial joint type to its example.',
        pairs: [['Hinge', 'Elbow joint'], ['Pivot', 'Median atlanto-axial joint'], ['Saddle', 'Carpo-metacarpal joint of the thumb'], ['Ball-and-socket', 'Glenohumeral joint']],
        explanation: 'These are the worked examples used across the Module 0 and Module 4 material.' },
      { type: 'mcq', prompt: 'Which joint type allows movement in all three planes?', options: ['Hinge', 'Pivot', 'Plane', 'Ball-and-socket'], answer: 3,
        explanation: 'Ball-and-socket is the triaxial type — the glenohumeral and hip joints. A hinge is monoaxial, moving in one plane only.' },
      { type: 'comparison', prompt: 'Both the glenohumeral and hip joints are ball-and-socket. What is the anatomical difference that changes their behaviour?',
        options: [
          'The glenoid fossa is shallow while the acetabulum is deep, so the shoulder trades stability for mobility',
          'The hip has no articular cartilage',
          'The shoulder is a fibrous joint',
          'The hip allows movement in only two planes',
        ], answer: 0,
        explanation: 'Both are ball-and-socket and both are triaxial. The difference is socket depth: the shallow glenoid fossa allows a much wider range but far less bony stability than the deep acetabulum.' },
      { type: 'typed', prompt: 'Which synovial joint type carries supination and pronation of the forearm?', accept: ['pivot', 'pivot joint'],
        explanation: 'A pivot joint — the radioulnar joints, where the radius rotates against the ulna.' },
      { type: 'sequence', prompt: 'Order these synovial joint types by how many planes of movement they allow, fewest first.', items: ['Hinge — one plane', 'Condylar — two planes', 'Ball-and-socket — three planes'],
        explanation: 'Monoaxial hinge, then biaxial condylar, then triaxial ball-and-socket.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A joint allows you to flex, extend, abduct, adduct and oppose. Which type is it, where is it, and which single movement rules out the alternatives?',
        model: 'A saddle joint — the carpo-metacarpal joint of the thumb. Opposition is the deciding movement: a condylar joint gives you two planes but cannot oppose, and only the thumb’s saddle joint carries opposition among the types listed.',
        rubric: ['Names saddle', 'Locates it at the thumb CMC joint', 'Uses opposition as the discriminator'] },
    ],
    commonMistakes: [
      'Calling the wrist a hinge. It is condylar — it abducts and adducts as well as flexing and extending.',
      'Forgetting that both the elbow and the proximal radioulnar joint sit at the elbow region but are different joint types doing different jobs.',
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides "Classification of Joints — Synovial joints", "Synovial joints"' }, { ref: 'hss.m0.1718', location: 'L1 p18 joint types; p29 atlanto-axial; p43–51 elbow, radioulnar, wrist and thumb movements' }, { ref: 'hss.1516.lec11', location: 'Skeletal, joint and muscular system lecture' }],
  },
  {
    id: 'abct2326-cvs-conduction',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'sequence',
    title: 'The cardiac conducting system',
    tags: ['cardiovascular', 'high-yield'],
    lesson: {
      explanation: 'The heart holds two types of cardiac muscle cell: the conducting system, which initiates and distributes the electrical impulses that stimulate contraction and so controls and coordinates the heartbeat, and the contractile cells, which produce the contractions that propel blood. The cardiac cycle begins with an action potential at the sinoatrial node, which is transmitted through the conducting system and produces action potentials in the contractile cells. The SA node sits in the posterior wall of the right atrium, contains pacemaker cells and begins atrial activation. Its prepotential, or pacemaker potential, drifts spontaneously from about −60 mV toward a −40 mV threshold — the drift is caused by Na⁺ flowing through an HCN channel that opens when the cell is hyperpolarised — and at threshold voltage-gated Ca²⁺ channels open to produce the upstroke. Because the SA node depolarises first, it sets the heart rate. The impulse spreads through the atrial myocardium via gap junctions, but needs a special route to the ventricles because the fibrous cardiac skeleton does not conduct. It reaches the AV node in the floor of the right atrium, which delays it while atrial contraction begins, then passes to the AV bundle (bundle of His) in the septum, out to the left and right bundle branches, and finally to the Purkinje fibres, which distribute it through the ventricles so ventricular contraction begins.',
      keyFacts: [
        'Two cell types: conducting system (initiates and distributes) and contractile cells (propel blood).',
        'SA node — posterior wall of right atrium, holds pacemaker cells, sets heart rate.',
        'Pacemaker potential drifts from about −60 mV to a −40 mV threshold via an HCN Na⁺ channel; Ca²⁺ channels then open for the upstroke.',
        'AV node — floor of the right atrium; receives, then delays the impulse.',
        'AV bundle (bundle of His) in the septum → left and right bundle branches → Purkinje fibres.',
        'The moderator band conducts to the papillary muscles.',
        'The fibrous cardiac skeleton is why a special conducting route to the ventricles is needed at all.',
        'Myocardial cells rest at −90 mV and have a 200–300 ms plateau from balanced Ca²⁺ influx and K⁺ efflux.',
      ],
      prerequisites: ['abct2326-cvs-heart-structure'],
      examples: [],
    },
    memory: {
      sequence: 'SA → AV → bundle of His → bundle branches → Purkinje. Five stops, top to bottom, right to left. Say it as a route, not a list.',
      location: 'Both nodes are in the right atrium — SA in the posterior wall, AV in the floor. If you can remember they are neighbours, you only have to remember which is higher.',
      chunking: 'The AV node’s job is a pause, not a relay. That delay is what lets the atria finish emptying before the ventricles squeeze.',
      wordOrigin: 'Sino-atrial names its location: the sinus of the atrium. Atrio-ventricular names the border it sits on.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the structures of the conducting system as the impulse travels.',
        items: ['Sinoatrial (SA) node', 'Internodal pathways / atrial myocardium', 'Atrioventricular (AV) node', 'AV bundle (bundle of His)', 'Left and right bundle branches', 'Purkinje fibres'],
        explanation: 'This is the five-step route given across the conducting-system slides, from atrial activation to ventricular contraction.' },
      { type: 'typed', prompt: 'Where in the heart is the SA node located?', accept: ['posterior wall of the right atrium', 'right atrium', 'posterior wall of right atrium', 'wall of the right atrium'],
        explanation: 'The posterior wall of the right atrium. The AV node is lower, in the floor of the same chamber.' },
      { type: 'mcq', prompt: 'What is the functional point of the delay at the AV node?', options: ['To slow the overall heart rate', 'To let atrial contraction complete before the ventricles contract', 'To protect the Purkinje fibres', 'To recharge the SA node'], answer: 1,
        explanation: 'The AV node delays the impulse while atrial contraction begins, so the atria finish emptying into the ventricles before ventricular contraction starts.' },
      { type: 'cloze', prompt: 'The SA node sets the heart rate because its ______ depolarises spontaneously and reaches threshold first.', accept: ['prepotential', 'pacemaker potential', 'prepotential (pacemaker potential)'],
        explanation: 'The prepotential, also called the pacemaker potential — the resting potential of conducting cells, which drifts toward threshold on its own.' },
      { type: 'explain', prompt: 'Why does the impulse need the AV node and bundle of His at all, rather than simply spreading from atria to ventricles?',
        model: 'Because the fibrous cardiac skeleton between the atria and ventricles does not conduct. Atrial impulses spread through the atrial myocardium via gap junctions but cannot cross that insulating layer, so the AV node and AV bundle provide the only electrical route through to the ventricles.',
        rubric: ['Names the fibrous cardiac skeleton as non-conducting', 'States it separates atria from ventricles electrically', 'Identifies the AV node/bundle as the only route through'] },
    ],
    application: [
      { type: 'scenario', prompt: 'If the SA node stopped firing but the AV node kept working, what would happen to the heart rate, and why does any beat survive at all?',
        model: 'A beat survives because pacemaker cells are not unique to the SA node — the conducting system as a whole has cells whose prepotential depolarises spontaneously. The SA node normally sets the rate only because it reaches threshold first. With it silent, a slower downstream pacemaker takes over, so the heart keeps beating but more slowly.',
        rubric: ['States the SA node leads because it depolarises fastest', 'Recognises other conducting cells also have a prepotential', 'Predicts a slower rate rather than arrest'] },
    ],
    commonMistakes: [
      'Treating the AV node as a simple relay — its defining contribution is the delay.',
      'Placing the bundle of His in the atria; it is in the interventricular septum.',
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 40–53 the conducting system, SA node, pacemaker potential, AV node, AV bundle, Purkinje fibres, myocardial action potentials' }],
  },
  {
    id: 'abct2326-cvs-ecg-cycle',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'definition',
    title: 'ECG waves, the cardiac cycle and heart sounds',
    tags: ['cardiovascular', 'high-yield'],
    lesson: {
      explanation: 'An electrocardiogram is a recording of the electrical events in the heart, obtained by electrodes at specific body locations, and abnormal patterns are used to diagnose damage. It has three features: the P wave, atrial depolarisation; the QRS complex, ventricular depolarisation; and the T wave, ventricular repolarisation. The P–R interval runs from the start of atrial depolarisation to the start of the QRS complex, and the Q–T interval from ventricular depolarisation to ventricular repolarisation. The cardiac cycle itself is the repeating pattern of contraction and relaxation: systole is the contraction phase, diastole the relaxation phase, and both atria contract simultaneously with the ventricles following 0.1–0.2 seconds later. End-diastolic volume is the blood in the ventricles at the end of diastole, stroke volume is the amount ejected during systole, and end-systolic volume is what is left afterwards. The Frank–Starling law states that stroke volume increases as end-diastolic volume increases, because the increased blood volume stretches the ventricular wall and the force of contraction rises. Two loud heart sounds mark the cycle: S1 is produced by the AV valves and S2 by the semilunar valves. Cardiac muscle also has a long absolute refractory period — the ventricular action potential lasts 250–300 ms, about thirty times longer than a skeletal muscle fibre — which prevents summation and tetany.',
      keyFacts: [
        'P wave — atria depolarise. QRS complex — ventricles depolarise. T wave — ventricles repolarise.',
        'P–R interval: start of atrial depolarisation to start of QRS. Q–T interval: ventricular depolarisation to repolarisation.',
        'Systole = contraction; diastole = relaxation. Ventricles follow the atria by 0.1–0.2 s.',
        'End-diastolic volume → stroke volume ejected → end-systolic volume left behind.',
        'Frank–Starling law: stroke volume rises as end-diastolic volume rises, because stretch increases force of contraction.',
        'S1 is produced by the AV valves; S2 by the semilunar valves.',
        'Ventricular action potential lasts 250–300 ms — about 30× a skeletal muscle fibre — and the long refractory period prevents summation and tetany.',
      ],
      prerequisites: ['abct2326-cvs-conduction'],
      examples: [],
    },
    memory: {
      mnemonic: 'P before QRS before T, in the order the heart actually fires: atria depolarise, ventricles depolarise, ventricles recover. There is no wave for atrial repolarisation because the QRS buries it.',
      chunking: 'Three volumes, one subtraction: end-diastolic minus stroke volume equals end-systolic. If you know two you can derive the third.',
      visualCue: 'S1 "lubb" is the AV valves shutting as the ventricles start to squeeze; S2 "dupp" is the semilunar valves shutting as they finish. The sounds are doors closing, in order.',
      comparison: 'Systole and diastole are easy to swap under pressure. SyStole = Squeeze.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each ECG feature to the electrical event it represents.',
        pairs: [['P wave', 'Atria depolarise'], ['QRS complex', 'Ventricles depolarise'], ['T wave', 'Ventricles repolarise'], ['P–R interval', 'Start of atrial depolarisation to start of QRS']],
        explanation: 'These are the ECG features listed on the electrocardiogram slide.' },
      { type: 'mcq', prompt: 'Which valves produce the first heart sound, S1?', options: ['The semilunar valves', 'The AV valves', 'The aortic valve alone', 'The pulmonary valve alone'], answer: 1,
        explanation: 'S1 is produced by the AV valves and S2 by the semilunar valves.' },
      { type: 'typed', prompt: 'What is the name of the law stating that stroke volume increases as end-diastolic volume increases?', accept: ['frank-starling', 'frank starling', 'frank-starling law', 'starling'],
        explanation: 'The Frank–Starling law. Increased blood volume stretches the ventricular wall, and the force of contraction rises.' },
      { type: 'cloze', prompt: 'The contraction phase of the cardiac cycle is called ______ and the relaxation phase ______.', accept: ['systole; diastole', 'systole, diastole', 'systole and diastole'],
        explanation: 'Systole is contraction, diastole is relaxation.' },
      { type: 'explain', prompt: 'Why does the long refractory period of cardiac muscle matter?',
        model: 'The ventricular action potential lasts 250–300 ms, roughly thirty times a skeletal muscle fibre. That long absolute refractory period means the cell cannot respond to a second stimulus during it, so cardiac muscle cannot summate or go into tetany — it has to relax and refill between beats.',
        rubric: ['Gives the 250–300 ms duration or the 30× comparison', 'States it prevents summation and tetany', 'Connects that to the need to refill'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient’s end-diastolic volume rises after a fluid infusion. Using the Frank–Starling law, predict what happens to stroke volume and say why.',
        model: 'Stroke volume increases. The extra blood volume stretches the ventricular wall further at the end of diastole, and the force of contraction rises with that stretch, so more blood is ejected during systole.',
        rubric: ['Predicts an increase in stroke volume', 'Names ventricular wall stretch as the mechanism', 'Links stretch to force of contraction'] },
    ],
    commonMistakes: [
      'Looking for a wave representing atrial repolarisation — the lecture lists only P, QRS and T.',
      'Swapping S1 and S2. S1 is the AV valves, at the start of ventricular contraction.',
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 55–64 refractory periods, electrocardiogram, cardiac cycle, heart sounds; Figure 20-18b' }],
  },
  {
    id: 'abct2326-resp-gas-transport',
    subject: 'ABCT2326', unit: 'phys.resp', type: 'definition',
    title: 'Gas exchange, oxygen transport and the control of respiration',
    tags: ['respiratory', 'high-yield'],
    lesson: {
      explanation: 'Gas exchange happens across the alveolar epithelium, which is simple squamous epithelium made of thin type I pneumocytes patrolled by alveolar macrophages, or dust cells, alongside type II pneumocytes that produce surfactant. The majority of gas exchange occurs across the type I pneumocytes, and a single capillary may exchange with several alveoli at once. Gases move down partial-pressure gradients between alveolar air and the alveolar capillaries. Oxygen binds to the iron ions in haemoglobin molecules to form oxyhaemoglobin; haemoglobin saturation is the percentage of heme units carrying bound oxygen, and the oxygen–haemoglobin saturation curve relates that saturation to the partial pressure of oxygen. Respiration is controlled by respiratory centres whose ventral and dorsal respiratory groups establish the basic pace and depth, modified by the pneumotaxic centre. Reflex input comes from chemoreceptors sensitive to PCO₂, PO₂ or pH of blood or cerebrospinal fluid; baroreceptors in the aortic or carotid sinuses sensitive to blood pressure; stretch receptors responding to lung volume; and irritant, pain, temperature and visceral sensations. Peripheral chemoreceptor input arrives by the glossopharyngeal nerve from the carotid bodies and the vagus nerve from the aortic bodies, while central chemoreceptors on the ventrolateral surface of the medulla oblongata respond to the PCO₂ and pH of cerebrospinal fluid. Chemoreceptor stimulation increases the depth and rate of respiration, and is subject to adaptation — sensitivity falls under chronic stimulation.',
      keyFacts: [
        'Type I pneumocytes — thin, where the majority of gas exchange occurs. Type II pneumocytes — produce surfactant. Alveolar macrophages — dust cells.',
        'Oxygen binds the iron ions of haemoglobin to form oxyhaemoglobin.',
        'Haemoglobin saturation = the percentage of heme units carrying bound oxygen.',
        'Respiratory centres: ventral and dorsal respiratory groups set pace and depth; the pneumotaxic centre modifies the pace.',
        'Chemoreceptors respond to PCO₂, PO₂ or pH of blood or CSF.',
        'Glossopharyngeal nerve (CN IX) from the carotid bodies; vagus nerve (CN X) from the aortic bodies.',
        'Central chemoreceptors sit on the ventrolateral surface of the medulla oblongata and monitor CSF.',
        'Chemoreceptor stimulation raises depth and rate, and adapts under chronic stimulation.',
      ],
      prerequisites: ['abct2326-resp-pathway'],
      examples: [],
    },
    memory: {
      comparison: 'Type I is thin so gas crosses it; type II is secretory so it makes surfactant. One roman numeral, one job: I for interchange, II for the substance.',
      location: 'Two peripheral sensing sites, two nerves, and each nerve serves the body part it is named near: glossopharyngeal from the carotid bodies in the neck, vagus from the aortic bodies in the chest.',
      chunking: 'Control has three layers: a rhythm generator (VRG/DRG), a modifier (pneumotaxic centre), and sensors feeding back (chemo-, baro-, stretch).',
      wordOrigin: 'Oxyhaemoglobin is simply oxygen + haem + globin — the carrier named after what it is carrying.',
    },
    practice: [
      { type: 'mcq', prompt: 'Across which cell type does the majority of gas exchange occur?', options: ['Type II pneumocytes', 'Alveolar macrophages', 'Type I pneumocytes', 'Goblet cells'], answer: 2,
        explanation: 'Type I pneumocytes are the thin, delicate cells of the alveolar epithelium and the majority of gas exchange occurs across them. Type II pneumocytes make surfactant.' },
      { type: 'typed', prompt: 'Oxygen binds to which part of the haemoglobin molecule?', accept: ['iron ions', 'iron', 'the iron ions', 'heme iron'],
        explanation: 'The iron ions in haemoglobin. The result is called oxyhaemoglobin.' },
      { type: 'matching', prompt: 'Match each receptor site to the nerve carrying its input.',
        pairs: [['Carotid bodies', 'Glossopharyngeal nerve (CN IX)'], ['Aortic bodies', 'Vagus nerve (CN X)'], ['Cerebrospinal fluid', 'Central chemoreceptors on the medulla oblongata'], ['Aortic and carotid sinuses', 'Baroreceptors sensitive to blood pressure']],
        explanation: 'These are the chemoreceptor and baroreceptor routes given in the control-of-respiration slides.' },
      { type: 'cloze', prompt: 'Haemoglobin ______ is the percentage of heme units in a haemoglobin molecule that contain bound oxygen.', accept: ['saturation'],
        explanation: 'Saturation. The oxygen–haemoglobin saturation curve plots it against the partial pressure of oxygen.' },
      { type: 'explain', prompt: 'What does it mean that chemoreceptor stimulation "is subject to adaptation"?',
        model: 'Sensitivity falls under chronic stimulation. A chemoreceptor that is being stimulated continuously stops driving the same increase in depth and rate that the same signal would produce acutely, so a long-standing abnormality provokes less of a response than a sudden one.',
        rubric: ['States sensitivity decreases with chronic stimulation', 'Contrasts acute with chronic response'] },
    ],
    application: [
      { type: 'scenario', prompt: 'Your respiratory rate rises sharply during exercise. Name two different receptor types from this lecture that could be contributing, and say what each is responding to.',
        model: 'Chemoreceptors responding to rising PCO₂, falling PO₂ or falling pH in blood or cerebrospinal fluid; and stretch receptors responding to the changes in lung volume as breathing deepens. Baroreceptors in the aortic and carotid sinuses could also contribute, since they respond to the blood-pressure changes exercise produces.',
        rubric: ['Names at least two receptor types from the lecture list', 'States correctly what each responds to'] },
    ],
    commonMistakes: [
      'Attributing surfactant production to type I pneumocytes — that is type II.',
      'Assuming central chemoreceptors sense blood; they monitor cerebrospinal fluid.',
    ],
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 10–12 alveolar epithelium; 66–74 control of respiration, respiratory and chemoreceptor reflexes, homeostasis of arterial PCO₂; partial pressure and oxygen–haemoglobin saturation slides' }],
  },
  {
    id: 'abct2326-immune-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Inflammation, complement and adaptive immunity',
    tags: ['immune', 'high-yield'],
    lesson: {
      explanation: 'Inflammation is a localised response triggered by any stimulus that kills cells or injures tissue. Its four principal signs carry Latin names: swelling (tumor), redness (rubor), heat (calor) and pain (dolor). It has three effects — temporary repair and a barrier against pathogens, retarding the spread of pathogens into surrounding areas, and mobilising local and systemic defences while facilitating repair. Its products include necrosis, the destruction of injured cells; pus, the viscous mixture of debris, fluid and dead cells that accumulates at the injury site; and an abscess, an accumulation of pus in an enclosed tissue space. Complement is a system of about thirty plasma proteins that work in cascades. There are two activation pathways: the classical pathway, which requires antibody binding and C1 attachment and is the most rapid and effective, and the alternative pathway, which involves no antibody, occurs more slowly and less effectively, and is activated by exposure to foreign materials. Either pathway turns on the common pathway from C5 to C9, generating the membrane attack complex on the bacterial surface and causing cell lysis. Adaptive immunity is not present at birth: you acquire immunity to a specific antigen only after exposure to it or by receiving antibodies. It splits into active immunity, where antibodies develop after exposure to an antigen, and passive immunity, where antibodies are transferred from another source; and it is studied as cell-mediated (cellular) immunity versus antibody-mediated (humoral) immunity, involving T cells and B cells respectively.',
      keyFacts: [
        'Four signs of inflammation: swelling (tumor), redness (rubor), heat (calor), pain (dolor).',
        'Three effects: temporary repair and barrier, retarding spread, mobilising defences and facilitating repair.',
        'Products: necrosis, pus, abscess.',
        'Complement = about 30 plasma proteins working in a cascade.',
        'Classical pathway needs antibody binding and C1; it is the most rapid and effective. Alternative pathway needs no antibody, is slower and less effective.',
        'Both converge on the common pathway C5–C9, forming the membrane attack complex (MAC) and lysing the cell.',
        'Adaptive immunity is acquired after birth — by exposure to an antigen or by receiving antibodies.',
        'Active immunity: antibodies develop after exposure. Passive immunity: antibodies transferred from another source.',
        'Cell-mediated immunity involves T cells; antibody-mediated (humoral) immunity involves B cells.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [],
    },
    memory: {
      firstLetter: 'The four Latin signs are easier as a set than singly: tumor, rubor, calor, dolor — swelling, redness, heat, pain. They rhyme, which is the point.',
      comparison: 'Classical vs alternative complement: classical needs an antibody and is fast; alternative needs none and is slow. The pathway that waits for a specific antibody is the one that works best once it arrives.',
      chunking: 'Active vs passive immunity is about who made the antibody. Active — you did, after exposure. Passive — someone else did, and it was transferred.',
      mnemonic: 'B cells make antiBodies. T cells do the cell-mediated work. One letter each, and it holds.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each Latin sign of inflammation to its meaning.',
        pairs: [['Tumor', 'Swelling'], ['Rubor', 'Redness'], ['Calor', 'Heat'], ['Dolor', 'Pain']],
        explanation: 'These are the four principal signs and symptoms of inflammation as given in the lecture, with their Latin names.' },
      { type: 'comparison', prompt: 'What distinguishes the classical from the alternative complement pathway?',
        options: [
          'The classical pathway requires antibody binding and is faster and more effective; the alternative requires no antibody and is slower',
          'The classical pathway is slower and requires no antibody',
          'Only the alternative pathway forms a membrane attack complex',
          'They use entirely separate proteins with no common pathway',
        ], answer: 0,
        explanation: 'The classical pathway begins with antibody binding and C1 attachment and is the most rapid and effective. The alternative involves no antibody, is slower and less effective. Both converge on the common pathway C5–C9 and both end in the membrane attack complex.' },
      { type: 'typed', prompt: 'What is the name of the structure generated by the common complement pathway that lyses the target cell?', accept: ['membrane attack complex', 'mac', 'membrane attack complex (mac)'],
        explanation: 'The membrane attack complex (MAC), formed from C5b with C6, C7, C8 and C9.' },
      { type: 'mcq', prompt: 'Antibodies transferred from another source rather than made after your own exposure describes:', options: ['Active immunity', 'Passive immunity', 'Innate immunity', 'Cell-mediated immunity'], answer: 1,
        explanation: 'Passive immunity — antibodies are transferred from another source. Active immunity is where antibodies develop after your own exposure to the antigen.' },
      { type: 'cloze', prompt: 'Cell-mediated immunity involves ______ cells, while antibody-mediated (humoral) immunity involves ______ cells.', accept: ['t; b', 't, b', 't cells and b cells', 't and b'],
        explanation: 'T cells for cell-mediated, B cells for antibody-mediated (humoral) immunity.' },
    ],
    application: [
      { type: 'scenario', prompt: 'An accumulation of pus has formed in an enclosed tissue space. Name it, and trace it back through the inflammatory process that produced it.',
        model: 'That is an abscess. Inflammation was triggered by a stimulus that killed cells or injured tissue; injured cells underwent necrosis; as local inflammation continued, debris, fluid and dead and dying cells accumulated at the site as pus; and pus enclosed in a tissue space is an abscess.',
        rubric: ['Names abscess', 'Traces necrosis → pus → abscess', 'Identifies the triggering injury'] },
    ],
    commonMistakes: [
      'Assuming the alternative complement pathway is an equal substitute — the lecture says it is slower and less effective.',
      'Treating adaptive immunity as present at birth. It is acquired only after exposure or antibody transfer.',
    ],
    sourceRefs: [{ ref: 'phys.10', location: 'Slides 27–35 complement system and pathways, inflammation, products of inflammation, forms of immunity; learning outcomes slide 2' }],
  },
  {
    id: 'hti17103-modality-best-use',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'matching',
    title: 'What each modality is best used for',
    tags: ['modalities', 'high-yield'],
    lesson: {
      explanation: 'Each modality in the Week 2 lecture is introduced with the job it is suited to. Fluoroscopy provides real-time monitoring and is applicable intraoperatively, which is what makes it the choice for angiography, stent installation, bone cement work and function imaging of the digestive system. Mammography is presented as an extreme of resolution. Computed tomography exists because radiologists normally need two views and CT offers a 360-degree view; modern spiral CT adds multiplanar reconstruction and 3D angiographic reconstruction, up to a simulated heart model. Radionuclide imaging gives the non-invasive visualisation of bio-distribution, using a radiopharmaceutical made of a radioisotope plus a specific compound — the compound decides where it goes. MRI is summarised as giving good soft-tissue contrast, being compatible with function imaging and 3D/4D reconstruction, and being non-ionising. General X-ray, in its direct digital form, is the time-saving workhorse with no readers and no physical film.',
      keyFacts: [
        'Fluoroscopy — real-time, intraoperative: angiography, stent installation, bone cement, digestive function imaging.',
        'Mammography — an extreme of resolution.',
        'CT — a 360-degree view where two projections are not enough; multiplanar and 3D angiographic reconstruction.',
        'Radionuclide imaging — non-invasive visualisation of bio-distribution.',
        'MRI — good soft-tissue contrast, function imaging, 3D/4D, non-ionising.',
        'Direct digital radiography — no readers, time-saving, no physical films, but expensive.',
        'Contrast agents extend fluoroscopy: oral barium sulfate, or intravenous ionic vs non-ionic agents.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      chunking: 'Sort by what the modality gives you that others cannot: time (fluoroscopy), resolution (mammography), a third dimension (CT), function and distribution (RNI), soft tissue without ionising radiation (MRI).',
      comparison: 'CT and MRI both give cross-sections. CT is fast and ionising; MRI has better soft-tissue contrast and no ionising radiation. If the question is about soft tissue, it is MRI.',
      mnemonic: 'Fluoroscopy is the only one that shows you *change over time*. Anything described as real-time or intraoperative is pointing at it.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each modality to the capability the lecture highlights.',
        pairs: [['Fluoroscopy', 'Real-time monitoring, applicable intraoperatively'], ['Computed tomography', 'A 360-degree view with multiplanar reconstruction'], ['Magnetic resonance imaging', 'Good soft-tissue contrast, non-ionising'], ['Radionuclide imaging', 'Non-invasive visualisation of bio-distribution']],
        explanation: 'These are the defining capabilities each modality is introduced with in the Week 2 lecture.' },
      { type: 'mcq', prompt: 'A stent is being installed and the operator needs to watch it move into position. Which modality does the lecture point to?', options: ['Computed tomography', 'Fluoroscopy', 'Mammography', 'Magnetic resonance imaging'], answer: 1,
        explanation: 'Fluoroscopy — real-time monitoring, intraoperatively applicable, and stent installation is one of the listed applications.' },
      { type: 'typed', prompt: 'Which modality does the lecture describe as "an extreme of resolution"?', accept: ['mammography', 'mammogram'],
        explanation: 'Mammography.' },
      { type: 'comparison', prompt: 'CT and MRI both produce cross-sectional images. Which difference matters most when choosing between them?',
        options: [
          'MRI gives better soft-tissue contrast and uses no ionising radiation, while CT is an ionising modality',
          'CT cannot produce 3D reconstructions',
          'MRI is an ionising modality and CT is not',
          'They produce identical images by different means',
        ], answer: 0,
        explanation: 'Both give cross-sections, but the lecture puts CT in the ionising column and MRI in the non-ionising column, and summarises MRI as giving good soft-tissue contrast. Both can reconstruct in 3D.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiopharmaceutical is described as a radioisotope combined with a specific compound. Which half decides what you can image, and why does that make radionuclide imaging different from CT?',
        model: 'The specific compound decides where the agent goes in the body, so it determines what you can image; the radioisotope only makes that distribution visible. That is what the lecture means by non-invasive visualisation of bio-distribution — RNI images function and where a substance travels, whereas CT images structure.',
        rubric: ['Identifies the compound as determining distribution', 'Identifies the isotope as providing the signal', 'Contrasts function/distribution with structure'] },
    ],
    commonMistakes: [
      'Choosing CT whenever cross-sections are wanted, without weighing the ionising-radiation difference against MRI.',
      'Forgetting that fluoroscopy is defined by being real-time, not by being an X-ray technique.',
    ],
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 12–49 general X-ray cassettes, fluoroscopy and contrast enhancement, mammography, computed tomography, radiopharmaceuticals, RNI, MRI summary' }],
  },
];

/* ------------------------------------------------------------------ *
 * Osteology items generated from the canonical bone records
 *
 * The bone names, landmarks, sides and articulations are all covered by
 * the HSS2011 module sources below. The radiography positioning note on
 * each bone record is app-authored study framing, not a source claim,
 * and is tagged as such.
 * ------------------------------------------------------------------ */

const REGION_SOURCES = {
  skull: [{ ref: 'hss.4.2', location: 'Head and neck — skull and cervical spine' }, { ref: 'hss.vocab', location: 'Glossary — skull entries' }],
  spine: [{ ref: 'hss.m0.1718', location: 'L1 p15–32 vertebral column, curvatures, cervical and lumbar vertebrae' }, { ref: 'hss.vocab', location: 'Glossary — vertebral entries' }],
  thorax: [{ ref: 'hss.1.3', location: 'Regional anatomy of the thorax — thoracic cage' }, { ref: 'hss.m0.1718', location: 'L1 p34–35 a typical rib, rib articulations' }],
  upper_limb: [{ ref: 'hss.4.3', location: 'Anatomy of the upper limb — bones, Figs 8-2 to 8-5' }, { ref: 'hss.m0.1718', location: 'L1 p36–53 shoulder, elbow, wrist and hand' }],
  pelvis: [{ ref: 'hss.4.3', location: 'Hip and gluteal region — pelvic girdle' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 1' }],
  lower_limb: [{ ref: 'hss.4.3', location: 'Anatomy of the lower limb — bones, Figs 8-11 to 8-13' }, { ref: 'hss.m0.1718', location: 'L1 p54–56 hip and knee joints' }],
};

/* App-authored memory hooks. Every entry is a study aid, never a fact claim. */
export const BONE_HOOKS = {
  cranium: { wordOrigin: 'Greek kranion — helmet, skull.', mnemonic: 'CRANium is the cap that holds the brain.' },
  mandible: { wordOrigin: 'Latin mandere — to chew.', mnemonic: 'MANdible = MAN-chews. It is the one skull bone that moves.' },
  cervical: { wordOrigin: 'Latin cervix — neck.', mnemonic: 'Seven vertebrae, breakfast at 7. C1 Atlas holds the head up; C2 Axis is the pin it turns on.' },
  thoracic: { wordOrigin: 'Greek thorax — chest armour.', mnemonic: 'Twelve vertebrae, lunch at 12 — one for each pair of ribs.' },
  lumbar: { wordOrigin: 'Latin lumbus — loin.', mnemonic: 'Five large load-bearing vertebrae, dinner at 5. The bodies are the biggest because they carry the most.' },
  sacrum: { wordOrigin: 'Latin os sacrum — sacred bone.', mnemonic: 'The sacred wedge is the keystone locking the pelvic ring together.' },
  coccyx: { wordOrigin: 'Greek kokkyx — cuckoo.', mnemonic: 'Shaped like a cuckoo’s beak — the tail remnant left behind.' },
  sternum: { wordOrigin: 'Greek sternon — chest.', mnemonic: 'Manubrium, body, xiphoid: handle, blade, tip — the sternum is a sword pointing down.' },
  ribs: { chunking: 'Ribs 1–7 attach to the sternum alone, 8–10 share a cartilage, 11–12 attach to nothing in front.', mnemonic: '1–7 go alone, 8–10 carpool, 11–12 walk free.' },
  clavicle: { wordOrigin: 'Latin clavicula — little key.', mnemonic: 'The only horizontal long bone: an S-shaped key bolting the arm onto the sternum.' },
  scapula: { visualCue: 'A flat triangle sliding on the back of the ribcage, with a shallow socket. Shallow socket means mobile but unstable.', comparison: 'Glenoid cavity is shallow, the acetabulum is deep — that one difference explains why shoulders dislocate and hips do not.' },
  humerus: { mnemonic: 'The humerus carries the radial nerve in its spiral groove — the funny bone that is not funny when you hit it.', comparison: 'Trochlea meets the ulna, capitulum meets the radius. Capitulum and radius both have rounded heads.' },
  radius: { wordOrigin: 'Latin radius — spoke or rod.', mnemonic: 'The radius rotates over the ulna like a wheel spoke. It is the thumb-side bone, so it is lateral.' },
  ulna: { wordOrigin: 'Latin ulna — elbow.', mnemonic: 'ULna = yoUr eLbow side, the little-finger side. Its trochlear notch is the hinge.' },
  hand: { firstLetter: 'Carpals lateral to medial, proximal row then distal: Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate.', chunking: '8 carpals, 5 metacarpals, 14 phalanges.' },
  pelvis: { wordOrigin: 'Latin pelvis — basin.', mnemonic: 'A basin made of ilium, ischium and pubis: I stand on my Ilium, I Sit on my Ischium, and the Pubis is the front join.' },
  femur: { mnemonic: 'The longest and strongest bone, angling inward from hip to knee — that inward angle is the angle of inclination.' },
  patella: { wordOrigin: 'Latin patella — small pan or dish.', mnemonic: 'The largest sesamoid bone, riding in the groove like a dish in a rack. Base up, apex down.' },
  tibia: { wordOrigin: 'Latin tibia — flute, shinbone.', mnemonic: 'TIBia Takes the weight. Medial bone, medial malleolus.' },
  fibula: { wordOrigin: 'Latin fibula — pin or buckle.', mnemonic: 'The thin lateral pin, ending in the lateral malleolus.' },
  foot: { chunking: 'Tarsals, metatarsals, phalanges — 7, 5, 14. Talus on top of calcaneus takes the whole load.' },
};

function boneItem(record) {
  const region = REGIONS.find((r) => r.id === record.region);
  const regionLabel = region ? region.label : record.region;
  const hooks = BONE_HOOKS[record.id] || {};
  const sideText = record.side === 'paired' ? 'Paired — there is a left and a right, so laterality is always part of the answer.' : 'Midline or bilateral — it is not a left/right pair.';
  const practice = [
    { type: 'typed', prompt: `Which bone or bone group has these landmarks: ${record.landmarks.join(', ')}?`, accept: [record.canonicalName.toLowerCase(), ...record.aliases.map((a) => a.toLowerCase())],
      explanation: `${record.canonicalName}. Its landmarks are ${record.landmarks.join(', ')}.` },
    { type: 'mcq', prompt: `In which region does the ${record.canonicalName.toLowerCase()} sit?`, options: REGIONS.map((r) => r.label), answer: REGIONS.findIndex((r) => r.id === record.region),
      explanation: `${record.canonicalName} belongs to the ${regionLabel.toLowerCase()}.` },
    { type: 'matching', prompt: `Match the ${record.canonicalName.toLowerCase()} to what it articulates with.`,
      pairs: record.articulations.slice(0, 4).map((a) => [record.canonicalName, a]),
      explanation: `${record.canonicalName} articulates with ${record.articulations.join(', ')}.` },
  ];
  if (record.side === 'paired') {
    practice.push({ type: 'laterality', prompt: `Identify the side of the ${record.canonicalName.toLowerCase()} shown on the 3D model.`, boneId: record.id,
      explanation: `${record.canonicalName} is a paired bone. Use the model’s orientation, not the screen, to decide the side: the model faces you, so its left is on your right.` });
  }
  if (record.commonConfusions && record.commonConfusions.length) {
    const confusable = record.commonConfusions[0];
    const other = ANATOMY_DATABASE.find((r) => r.id === confusable || r.canonicalName.toLowerCase() === String(confusable).toLowerCase());
    practice.push({ type: 'comparison', prompt: `How do you tell the ${record.canonicalName.toLowerCase()} apart from the ${String(confusable).toLowerCase()}?`,
      options: [
        `By its landmarks: ${record.landmarks.slice(0, 2).join(' and ')}`,
        'By its colour on the model',
        'They cannot be distinguished',
        'By counting the total number of bones',
      ], answer: 0,
      explanation: `The reliable discriminator is the landmark set. ${record.canonicalName} carries ${record.landmarks.join(', ')}${other ? `, whereas the ${other.canonicalName.toLowerCase()} carries ${other.landmarks.slice(0, 3).join(', ')}` : ''}.` });
  }
  practice.push({ type: 'id3d', prompt: `Find the ${record.canonicalName.toLowerCase()} on the 3D skeleton.`, boneId: record.id,
    explanation: `${record.canonicalName} sits in the ${regionLabel.toLowerCase()}. If the 3D model is unavailable, answer from the landmark list instead: ${record.landmarks.join(', ')}.` });
  if (record.landmarks.length >= 2) {
    practice.push({ type: 'landmark', prompt: `Name the landmarks of the ${record.canonicalName.toLowerCase()}.`, boneId: record.id, accept: record.landmarks.map((l) => l.toLowerCase()),
      explanation: `Landmarks: ${record.landmarks.join(', ')}.` });
  }
  return {
    id: `hss2011-bone-${record.id}`,
    subject: 'HSS2011', unit: 'hss.osteo', type: 'id3d',
    title: record.canonicalName,
    tags: ['osteology', 'bone', record.region],
    boneId: record.id,
    lesson: {
      explanation: `${record.canonicalName} — ${regionLabel.toLowerCase()}. ${sideText} Landmarks to know: ${record.landmarks.join(', ')}. It articulates with ${record.articulations.join(', ')}.` +
        (record.aliases.length ? ` Also called ${record.aliases.join(', ')}.` : ''),
      keyFacts: [
        `Region: ${regionLabel}.`,
        `Side: ${record.side}.`,
        `Landmarks: ${record.landmarks.join(', ')}.`,
        `Articulates with: ${record.articulations.join(', ')}.`,
        `Commonly confused with: ${(record.commonConfusions || []).join(', ') || 'nothing in particular'}.`,
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
      studyNote: record.radiographyImportance,
    },
    memory: hooks,
    practice,
    application: [
      { type: 'scenario', prompt: `You are handed an isolated ${record.canonicalName.toLowerCase()}${record.side === 'paired' ? ' and asked which side it is from' : ' and asked to place it in the skeleton'}. What do you look at first?`,
        model: record.side === 'paired'
          ? `Find an asymmetric landmark — ${record.landmarks.slice(0, 2).join(' or ')} — and work out which way it must face when the bone is in the anatomical position. Side is decided by orientation of the landmarks, never by which hand you are holding it in.`
          : `Look at its articulations: it must meet ${record.articulations.join(' and ')}, and only one place in the skeleton offers those neighbours. Landmarks (${record.landmarks.slice(0, 2).join(', ')}) then confirm the orientation.`,
        rubric: record.side === 'paired'
          ? ['Names a specific asymmetric landmark', 'Refers the decision to the anatomical position']
          : ['Uses articulations to locate it', 'Uses landmarks to orient it'] },
    ],
    commonMistakes: (record.commonConfusions || []).map((c) => `Mistaking it for the ${String(c).toLowerCase()} — compare landmark sets rather than overall shape.`)
      .concat(record.side === 'paired' ? ['Calling the side from the screen rather than from the model’s own left and right.'] : []),
    sourceRefs: (REGION_SOURCES[record.region] || [{ ref: 'hss.vocab', location: 'Glossary' }])
      .concat(record.radiographyImportance ? [{ ref: null, location: 'Radiography study note authored by this app — not a claim from the supplied sources', authored: true }] : []),
  };
}

const BONE_ITEMS = ANATOMY_DATABASE.map(boneItem);

/* ------------------------------------------------------------------ *
 * Structure-set items — tap-to-identify with a three-state reveal
 * ------------------------------------------------------------------ */

const STRUCTURE_HOOKS = {
  carpals: {
    firstLetter: 'Proximal row then distal row, lateral to medial: Scaphoid, Lunate, Triquetrum, Pisiform — Trapezium, Trapezoid, Capitate, Hamate.',
    chunking: 'Four and four, two rows. Almost every carpal question is really asking which row a bone is in, so learn the rows as units before the individual bones.',
    comparison: 'TrapeziuM sits under the thuMb; the trapezoid is its neighbour. That one letter settles the pair people most often swap.',
    location: 'Start at the thumb side of the wrist crease and work across, then step down a row and come back. Same path every time.',
  },
  tarsals: {
    location: 'Build it in layers rather than a row: talus on top of calcaneus takes the load, navicular in front of the talus, cuboid on the lateral side, three cuneiforms fanning forward.',
    comparison: 'Carpals are in the wrist, tarsals in the ankle. If a question says "collective name for wrist bones", the answer is carpal — tarsal is the distractor.',
    chunking: 'Seven bones, four groups: two big weight-bearers, one navicular, one cuboid, three cuneiforms.',
  },
  skullBones: {
    chunking: 'Split cranial from facial first. Six cranial bones form the vault and floor; the facial bones hang off the front.',
    location: 'Trace it as a face: forehead is frontal, sides are parietal then temporal, back is occipital, cheek is zygomatic, upper jaw is maxilla, lower jaw is mandible.',
    comparison: 'Sphenoid and ethmoid are the two you cannot see from outside — both sit deep in the floor of the cranium, which is why they are the two most often missed.',
  },
  vertebralRegions: {
    mnemonic: 'Breakfast at 7, lunch at 12, dinner at 5 — cervical 7, thoracic 12, lumbar 5.',
    comparison: 'Atlas carries the world and gives you the nod; Axis is the pin and gives you the shake.',
    chunking: 'Five regions top to bottom, two of them fused: cervical, thoracic, lumbar, then sacrum and coccyx.',
  },
};

function structureItem(set) {
  const hooks = STRUCTURE_HOOKS[set.id] || {};
  const groups = [...new Set(set.members.map((mem) => mem.group))];
  const listing = set.members.map((mem) => `${mem.label}${mem.note ? ` — ${mem.note}` : ''}`);
  return {
    id: `hss2011-structures-${set.id}`,
    subject: set.subject, unit: set.unit, type: 'structure',
    title: set.label,
    tags: ['osteology', '3d', 'blank-mode'],
    structureSet: set.id,
    lesson: {
      explanation: `${set.label} — ${set.members.length} structures in ${groups.length} group${groups.length === 1 ? '' : 's'}: ${groups.join(', ')}. `
        + `Every one of these is a separately named mesh in the bundled skeleton, so you can rotate to it and tap it directly. `
        + `Work through the labelled view first, then the guided view with only ${set.anchors.length} anchor${set.anchors.length === 1 ? '' : 's'} left in, then the blank view where nothing is named.`
        + (set.paired ? ' These are paired structures, so the side is always part of the answer.' : ''),
      keyFacts: listing,
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: hooks,
    practice: [
      { type: 'structure', prompt: `Name every structure in the set, working from the labelled view.`, setId: set.id, reveal: 'labelled',
        explanation: `Teaching view. All ${set.members.length} are named — read them in group order (${groups.join(' → ')}) and say each one out loud before moving on.` },
      { type: 'structure', prompt: `Only the anchors are named now. Identify the rest.`, setId: set.id, reveal: 'guided',
        explanation: `Guided view. ${set.anchors.map((a) => (set.members.find((mem) => mem.id === a) || {}).label).filter(Boolean).join(' and ')} stay labelled — everything else is worked out from their position relative to those.` },
      { type: 'structure', prompt: `Blank view. Identify all ${set.members.length}.`, setId: set.id, reveal: 'blank',
        explanation: `Test view. Nothing is named. If you can do this cold, the set is learned: ${listing.map((l) => l.split(' — ')[0]).join(', ')}.` },
      { type: 'typed', prompt: `How many structures are in the set "${set.label.toLowerCase()}"?`, accept: [String(set.members.length)],
        explanation: `${set.members.length}. Counting the set is the fastest check that you have not dropped one.` },
      { type: 'matching', prompt: 'Match each structure to the group it belongs to.',
        pairs: set.members.slice(0, 4).map((mem) => [mem.label, mem.group]),
        explanation: `Groups in this set: ${groups.join(', ')}. Knowing the group narrows any identification question before you look at shape.` },
    ],
    application: [
      { type: 'scenario', prompt: `You are shown one structure from this set in isolation, with no neighbours visible. What do you use to identify it, and what do you lose without the neighbours?`,
        model: `You fall back on the shape and any distinctive feature of that individual structure. What you lose is position, which is what the group and the ordering normally give you — ${groups.join(' and ')} are defined by where they sit relative to each other, so isolating a structure removes the most reliable clue.`,
        rubric: ['Names shape/individual features as the fallback', 'Identifies relative position as what is lost', 'Refers to the group structure of the set'] },
    ],
    commonMistakes: [
      `Learning the names as a flat list. This set has ${groups.length} group${groups.length === 1 ? '' : 's'} (${groups.join(', ')}), and the group is usually what a question is really testing.`,
      ...(set.paired ? ['Reading the side off the screen instead of the model’s own left and right.'] : []),
    ],
    sourceRefs: set.sourceRefs,
  };
}

const STRUCTURE_ITEMS = Object.values(STRUCTURE_SETS).map(structureItem);

/* ------------------------------------------------------------------ *
 * Assembled corpus
 * ------------------------------------------------------------------ */

export const STUDY_ITEMS = [
  ...HSS_TERMINOLOGY,
  ...HSS_OSTEOLOGY,
  ...BONE_ITEMS,
  ...STRUCTURE_ITEMS,
  ...HSS_JOINTS,
  ...HSS_MODULES,
  ...PHYS_ITEMS,
  ...HTI_ITEMS,
  ...EXPANSION_ITEMS,
].map((item) => ({ status: 'unseen', ...item }));

export const ITEM_BY_ID = new Map(STUDY_ITEMS.map((i) => [i.id, i]));

export function getItem(id) {
  return ITEM_BY_ID.get(id) || null;
}

export function itemsForSubject(subjectId) {
  return STUDY_ITEMS.filter((i) => i.subject === subjectId);
}

export function itemsForUnit(subjectId, unitId) {
  return STUDY_ITEMS.filter((i) => i.subject === subjectId && i.unit === unitId);
}

/* Every practice question, flattened, with a stable per-question id. */
export function questionsOf(item) {
  return (item.practice || []).map((q, i) => ({ ...q, qid: `${item.id}#${i}`, itemId: item.id, index: i }));
}

export function allQuestions() {
  return STUDY_ITEMS.flatMap(questionsOf);
}

/* ------------------------------------------------------------------ *
 * Validation — every question must have a resolvable answer and an
 * explanation. The coverage report surfaces anything that fails.
 * ------------------------------------------------------------------ */

export function validateQuestion(q) {
  const problems = [];
  /* explain/scenario questions carry their explanation as the model answer. */
  const rationale = q.explanation || (q.type === 'explain' || q.type === 'scenario' ? q.model : '');
  if (!rationale || !String(rationale).trim()) problems.push('no explanation');
  switch (q.type) {
    case 'mcq':
    case 'comparison':
      if (!Array.isArray(q.options) || q.options.length < 2) problems.push('needs at least two options');
      if (typeof q.answer !== 'number' || q.answer < 0 || (q.options && q.answer >= q.options.length)) problems.push('answer index out of range');
      break;
    case 'typed':
    case 'cloze':
    case 'landmark':
      if (!Array.isArray(q.accept) || !q.accept.length || q.accept.some((a) => !String(a).trim())) problems.push('no accepted answers');
      break;
    case 'sequence':
      if (!Array.isArray(q.items) || q.items.length < 2) problems.push('needs at least two sequence items');
      break;
    case 'matching':
      if (!Array.isArray(q.pairs) || !q.pairs.length || q.pairs.some((p) => !Array.isArray(p) || p.length !== 2 || !p[0] || !p[1])) problems.push('malformed pairs');
      break;
    case 'diagram':
      if (!Array.isArray(q.labels) || q.labels.length < 2) problems.push('needs at least two labels');
      if (!q.diagram) problems.push('no diagram key');
      break;
    case 'explain':
    case 'scenario':
      if (!q.model || !String(q.model).trim()) problems.push('no model answer');
      if (!Array.isArray(q.rubric) || !q.rubric.length) problems.push('no rubric');
      break;
    case 'id3d':
    case 'laterality':
      if (!q.boneId) problems.push('no bone reference');
      break;
    case 'structure': {
      const set = STRUCTURE_SETS[q.setId];
      if (!set) problems.push(`unknown structure set "${q.setId}"`);
      else if (!Array.isArray(set.members) || set.members.length < 2) problems.push('structure set needs at least two members');
      else if (set.members.some((mem) => !mem.mesh || !mem.label)) problems.push('structure set member missing mesh or label');
      if (q.reveal && !REVEAL_MODES.some((r) => r.id === q.reveal)) problems.push(`unknown reveal mode "${q.reveal}"`);
      break;
    }
    default:
      problems.push(`unknown question type "${q.type}"`);
  }
  if (!q.prompt || !String(q.prompt).trim()) problems.push('no prompt');
  return problems;
}

export function validateCorpus() {
  const failures = [];
  for (const item of STUDY_ITEMS) {
    if (!item.sourceRefs || !item.sourceRefs.length) failures.push({ itemId: item.id, qid: null, problems: ['no source reference'] });
    if (!item.lesson || !item.lesson.explanation) failures.push({ itemId: item.id, qid: null, problems: ['no teaching explanation'] });
    if (!item.practice || !item.practice.length) failures.push({ itemId: item.id, qid: null, problems: ['no practice questions'] });
    for (const q of questionsOf(item)) {
      const problems = validateQuestion(q);
      if (problems.length) failures.push({ itemId: item.id, qid: q.qid, problems });
    }
  }
  return failures;
}

/* Application questions live outside `practice` but still need a model + rubric. */
export function validateApplications() {
  const failures = [];
  for (const item of STUDY_ITEMS) {
    for (const [i, a] of (item.application || []).entries()) {
      const problems = [];
      if (!a.prompt) problems.push('no prompt');
      if (!a.model) problems.push('no model answer');
      if (!Array.isArray(a.rubric) || !a.rubric.length) problems.push('no rubric');
      if (problems.length) failures.push({ itemId: item.id, qid: `${item.id}!app${i}`, problems });
    }
  }
  return failures;
}

/* ------------------------------------------------------------------ *
 * Diagrams — authored schematics, drawn inline as SVG so the app needs
 * no image files and works with no network. Label names come from the
 * sources cited on the owning item.
 * ------------------------------------------------------------------ */

export const DIAGRAMS = {
  vertebra: {
    title: 'Typical vertebra, superior view',
    viewBox: '0 0 400 300',
    caption: 'Anterior is at the bottom. Label set matches the Module 4 labelling answers B1–B6.',
    shapes: [
      { kind: 'ellipse', cx: 200, cy: 232, rx: 88, ry: 44 },
      { kind: 'path', d: 'M120 212 L138 150 L172 96 L200 88 L228 96 L262 150 L280 212' },
      { kind: 'path', d: 'M172 96 L200 44 L228 96' },
      { kind: 'path', d: 'M138 150 L64 178' },
      { kind: 'path', d: 'M262 150 L336 178' },
      { kind: 'circle', cx: 200, cy: 162, r: 4, faint: true },
    ],
    labels: {
      body: [200, 236], foramen: [200, 166], pedicle: [126, 198],
      lamina: [156, 116], transverse: [70, 180], spinous: [200, 48], sap: [268, 132],
    },
  },
  heart: {
    title: 'Heart, anterior view schematic',
    viewBox: '0 0 400 300',
    caption: 'The patient’s right side is on the left of the diagram. Chamber and valve names from the cardiovascular lecture.',
    shapes: [
      { kind: 'path', d: 'M200 30 L200 268' },
      { kind: 'path', d: 'M92 152 L308 152' },
      { kind: 'path', d: 'M200 30 C120 30 78 96 78 152 C78 226 130 274 200 274 C270 274 322 226 322 152 C322 96 280 30 200 30 Z' },
      { kind: 'circle', cx: 170, cy: 58, r: 11 },
      { kind: 'circle', cx: 232, cy: 58, r: 11 },
    ],
    labels: {
      ra: [140, 104], rv: [140, 210], la: [262, 104], lv: [262, 210],
      tri: [140, 152], bi: [262, 152], pv: [170, 58], av: [232, 58],
    },
  },
};

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
        'Module 1 thorax, Module 2 neuroanatomy, Module 3 abdomen and pelvis',
      ],
      gaps: [
        'MOOC 1–3 arterial supply and stroke correlates are present in the folders but no study items have been generated from them yet.',
        'Detailed muscle attachments beyond those named in the revision-exercise answers were deliberately not added.',
        'No local labelled diagram images exist in the app assets, so diagram labelling uses authored schematics plus the 3D model.',
      ],
      files: 138,
    },
    {
      id: 'ABCT2326', status: 'full',
      covered: [
        'Cells, four tissue types, eleven organ systems',
        'Homeostasis, autoregulation vs extrinsic regulation, receptor–control centre–effector',
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

/* ------------------------------------------------------------------ *
 * Spaced repetition
 *
 * A record is kept per (item, mastery dimension). Interval growth is
 * SM-2 shaped, then modified by confidence, response time and the
 * number of times this item has previously lapsed.
 * ------------------------------------------------------------------ */

export const DAY_MS = 86400000;

export function blankMastery() {
  return { reps: 0, lapses: 0, ease: 2.4, intervalDays: 0, due: 0, streak: 0, attempts: 0, correct: 0, avgMs: 0, confidenceSum: 0, confidenceN: 0, lastSeen: 0 };
}

/*
 * outcome: { correct:boolean, confidence:0..3, ms:number, expectedMs:number }
 * confidence 0 = guessed, 1 = unsure, 2 = fairly sure, 3 = certain.
 */
export function schedule(prev, outcome, now = Date.now()) {
  const rec = { ...blankMastery(), ...(prev || {}) };
  const conf = Math.max(0, Math.min(3, outcome.confidence ?? 2));
  const expected = outcome.expectedMs || 12000;
  const slow = outcome.ms > expected * 1.6;
  const fast = outcome.ms < expected * 0.6;

  rec.attempts += 1;
  rec.lastSeen = now;
  rec.avgMs = rec.avgMs ? Math.round(rec.avgMs * 0.7 + outcome.ms * 0.3) : outcome.ms;
  rec.confidenceSum += conf;
  rec.confidenceN += 1;

  if (outcome.correct) {
    rec.correct += 1;
    rec.streak += 1;
    rec.reps += 1;
    /* Confident and quick is worth more interval than hesitant and slow. */
    let quality = 3 + (conf >= 3 ? 1 : 0) + (fast ? 1 : 0) - (slow ? 1 : 0) - (conf <= 1 ? 1 : 0);
    quality = Math.max(2, Math.min(5, quality));
    rec.ease = Math.max(1.3, Math.min(3.0, rec.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))));
    if (rec.reps === 1) rec.intervalDays = 1;
    else if (rec.reps === 2) rec.intervalDays = conf <= 1 ? 2 : 3;
    else rec.intervalDays = Math.max(1, Math.round(rec.intervalDays * rec.ease));
    /* Repeat offenders get pulled back regardless of how well this rep went. */
    if (rec.lapses >= 3) rec.intervalDays = Math.max(1, Math.min(rec.intervalDays, 4));
    else if (rec.lapses === 2) rec.intervalDays = Math.max(1, Math.min(rec.intervalDays, 9));
    /* Confidently wrong in the past, or answered slowly now — cap the jump. */
    if (slow) rec.intervalDays = Math.max(1, Math.round(rec.intervalDays * 0.7));
  } else {
    rec.lapses += 1;
    rec.streak = 0;
    rec.reps = 0;
    /* Being confidently wrong is the worst case: it means the wrong thing is well learned. */
    const penalty = conf >= 2 ? 0.35 : 0.2;
    rec.ease = Math.max(1.3, rec.ease - penalty);
    rec.intervalDays = 0;
  }
  rec.due = now + Math.max(0, rec.intervalDays) * DAY_MS;
  if (!outcome.correct) rec.due = now + 10 * 60 * 1000; /* back within the same session */
  return rec;
}

/*
 * Delayed recall only means something on the first attempt after a real gap.
 * Answering correctly three times inside one session says nothing about
 * whether it survived a night's sleep, so the caller checks this against the
 * record as it stood *before* the current attempt was folded in.
 * 20h rather than 24h so a morning session still counts against an evening one.
 */
export const DELAY_THRESHOLD_MS = 20 * 60 * 60 * 1000;

export function isDelayedAttempt(prevRec, now = Date.now()) {
  if (!prevRec || !prevRec.attempts || !prevRec.lastSeen) return false;
  return (now - prevRec.lastSeen) >= DELAY_THRESHOLD_MS;
}

export function masteryScore(rec) {
  if (!rec || !rec.attempts) return 0;
  const accuracy = rec.correct / rec.attempts;
  const depth = Math.min(1, rec.reps / 4);
  const confidence = rec.confidenceN ? rec.confidenceSum / (rec.confidenceN * 3) : 0.5;
  const penalty = Math.min(0.35, rec.lapses * 0.07);
  return Math.max(0, Math.min(1, accuracy * 0.5 + depth * 0.3 + confidence * 0.2 - penalty));
}

export function isDue(rec, now = Date.now()) {
  if (!rec || !rec.attempts) return true;
  return rec.due <= now;
}

/*
 * Five-tier mastery ladder for the dashboard. Pure function over a score
 * (masteryScore()'s 0..1 output) and an attempted flag — no storage access,
 * so it's testable without a browser.
 */
export const TIER_LABELS = ['Not started', 'Seen', 'Recognised', 'Recalled', 'Mastered'];

export function tierFor(score, attempted) {
  if (!attempted) return 0;
  if (score >= 0.85) return 4;
  if (score >= 0.65) return 3;
  if (score >= 0.4) return 2;
  return 1;
}

export function dimensionFor(question) {
  if (question.image) return 'location';
  if (question.type === 'typed' || question.type === 'cloze') return 'typedRecall';
  return (ITEM_TYPES[question.type] || {}).dimension || 'recognition';
}

export default {
  SUBJECTS, STUDY_ITEMS, SOURCE_FILES, COVERAGE, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS,
};
