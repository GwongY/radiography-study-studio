/*
 * Programme -- the BSc (Hons) in Radiography [55403] normal progression pattern
 *
 * Every subject of the four years, by year and semester: code, title, level,
 * credits, compulsory or elective, which stream takes it, and whether the app
 * treats it as an important core course. This is the official programme
 * document, so it is the one place the rest of the app (and the source
 * folders on E:\UNI sources) takes "which subject belongs where" from.
 *
 * SOURCE: SOURCE_FILES['prog.pattern'] -- "260805_Normal Progression Patterns_
 * 55403 wef 2026 intake_total credits_138 (for students).xlsx", sheets
 * "MI Pattern" and "RT Pattern". Rows below are those sheets row for row.
 * Subjects the two sheets share carry stream 'both'; a subject that is on one
 * sheet only carries 'MI' or 'RT'. Where the sheets differ only in a title
 * (the Year 1 Sem 2 service-learning slot) both rows are kept, one per stream.
 *
 * STREAM. The owner has NOT chosen yet. chosenStream stays null until they
 * set it to 'RT' or 'MI' -- nothing here may assume either. Both streams'
 * subjects stay in the data.
 *
 * IMPORTANT. A subject is important when ALL of these hold, read off the
 * sheet and nothing else:
 *   1. it is compulsory (not a Free Elective / Major-Elective slot);
 *   2. it is discipline-specific, i.e. NOT a general requirement. The sheet
 *      marks the general ones itself: "GUR-", "GUR/CAR", "LCR-" (language),
 *      "Service Learning", "Healthy Lifestyle", and the generic CLC / ELC
 *      language codes. ELC3626 Professional English for HTI Students is a
 *      language subject by its code, so it is not important either;
 *   3. its credits across the whole programme are at least IMPORTANT_MIN_CREDITS.
 *      The sheet's smallest discipline-specific subjects are 2 credits
 *      (Introduction to Medical Radiation Science, Imaging Anatomy, Clinical
 *      Studies II), and all three are anatomy / imaging / clinical content,
 *      so the bar is 2: it only removes the zero-credit "L" row of Project
 *      in Sem 1 -- whose credits are counted with its Sem 2 row, so Project
 *      is important.
 *   4. it is not known to have NO examination (exam !== 'no', see EXAM).
 * work/programme-check.mjs holds the stored flags to this rule.
 *
 * EXAM. The owner's rule: a subject with no examination (a closed-book test or
 * an exam-period exam) is NOT important. They do not yet know which subjects
 * have one, so every subject carries
 *     exam:      'yes' | 'no' | 'unknown'
 *     examBasis: 'confirmed' | 'estimated'
 *     examNote:  the evidence, with the file or SOURCE_FILES ref it came from
 * 'confirmed' = read off a 2026/27 syllabus, schedule or told by the owner.
 * 'estimated' = a best guess from PAST material (the old-source catalogue,
 * work/source-catalogue.json: how many past-paper / Exams-folder files the
 * subject or its predecessor code has) and may be wrong; the Programme panel
 * shows an "exam: estimated" chip so it is never mistaken for fact. 'unknown'
 * is not 'no': an unknown subject stays important until the owner says so.
 *
 * TO CORRECT AN ESTIMATE: edit that subject's line in EXAM below -- change
 * the first value to 'yes' or 'no', the second to 'confirmed', and put the
 * source (e.g. "2026/27 SDF" or "owner, <date>") in the note. Then run
 * `node work/check.mjs programme` (the flag follows by itself) and bump
 * CACHE_VERSION in sw.js. A 'confirmed' line must not cite past papers.
 *
 * Pure data and pure functions: no DOM, no three.js, so work/ runs it.
 */

export const PROGRAMME_SOURCE = 'prog.pattern';
export const PROGRAMME_CODE = '55403';
export const TOTAL_CREDITS = 138;
export const IMPORTANT_MIN_CREDITS = 2;

/* Section totals the sheet prints under each pattern ("Y1-s1 19" ...). The
   check holds the subject rows to these, per stream. */
export const SHEET_SEMESTER_CREDITS = {
  '1-1': 19, '1-2': 18, '1-S': 0,
  '2-1': 19, '2-2': 17, '2-S': 8,
  '3-1': 17, '3-2': 6, '3-S': 8,
  '4-1': 12, '4-2': 14,
};

/* group: how the sheet itself classes the slot (see IMPORTANT above). */
const GENERAL = new Set(['gur', 'language', 'service', 'lifestyle']);

/* [year, sem ('1'|'2'|'S'), stream, code, title, level, credits, required, group, note] */
const ROWS = [
  // ---- Year 1 -------------------------------------------------------
  [1, '1', 'both', 'ABCT2326', 'Human Physiology', 2, 3, 'compulsory', 'discipline'],
  [1, '1', 'both', 'DSAI1202', 'Introduction to AI and Data Analytics (GUR-AIDA)', 1, 2, 'compulsory', 'gur'],
  [1, '1', 'both', 'HSS2011', 'Human Anatomy', 2, 3, 'compulsory', 'discipline'],
  [1, '1', 'both', 'HTI17103', 'Introduction to Medical Radiation Science', 1, 2, 'compulsory', 'discipline'],
  [1, '1', 'both', 'LEI1101', 'LCR-AI-as-Tool for Language Learning (AITLL)', null, 3, 'compulsory', 'language'],
  [1, '1', 'both', null, 'GUR/CAR-1', null, 3, 'compulsory', 'gur'],
  [1, '1', 'both', null, 'GUR/CAR-2', null, 3, 'compulsory', 'gur'],
  [1, '1', 'both', null, 'Healthy Lifestyle', null, 0, 'compulsory', 'lifestyle'],
  [1, '2', 'both', 'AP10006', 'Physics II', 1, 3, 'compulsory', 'discipline'],
  [1, '2', 'both', 'APSS1L01', 'Tomorrow\u2019s Leaders (GUR-LEAD)', 1, 3, 'compulsory', 'gur'],
  [1, '2', 'both', 'CLC', 'LCR-Chinese Subject', null, 3, 'compulsory', 'language'],
  [1, '2', 'both', 'HTI17102', 'Imaging Anatomy', 1, 2, 'compulsory', 'discipline'],
  [1, '2', 'both', 'ELC', 'LCR-English Subject', null, 3, 'compulsory', 'language'],
  [1, '2', 'both', 'MM1031', 'Introduction to Innovation and Entrepreneurship (GUR-IE)', 1, 1, 'compulsory', 'gur'],
  [1, '2', 'MI', null, 'Service Learning or Major-Service Learning', null, 3, 'compulsory', 'service'],
  [1, '2', 'RT', null, 'Service Learning or DSR-Service Learning', null, 3, 'compulsory', 'service'],
  // ---- Year 2 -------------------------------------------------------
  [2, '1', 'both', 'ABCT2329', 'Systemic Physiology', 2, 3, 'compulsory', 'discipline'],
  [2, '1', 'both', 'AP20015', 'Physics in Radiological Science', 2, 3, 'compulsory', 'discipline'],
  [2, '1', 'both', 'HTI27107', 'Principles in Medical Radiation Instrumentation', 2, 4, 'compulsory', 'discipline'],
  [2, '1', 'both', 'HTI37101', 'Legal and Ethical Issues in Healthcare', 3, 3, 'compulsory', 'discipline'],
  [2, '1', 'both', 'HTI37105', 'Radiobiology and Radiation Protection', 3, 3, 'compulsory', 'discipline'],
  [2, '1', 'both', null, 'Major-Elective', '2/3', 3, 'elective', 'elective'],
  [2, '2', 'both', 'HTI27101', 'Foundation Pathology', 2, 3, 'compulsory', 'discipline'],
  [2, '2', 'both', 'HTI27106', 'Clinical Skills in Radiography Practice', 2, 3, 'compulsory', 'discipline'],
  [2, '2', 'both', 'HTI28102', 'Medical Imaging Studies I', 2, 4, 'compulsory', 'discipline'],
  [2, '2', 'both', 'HTI29102', 'Radiotherapy Studies I', 2, 4, 'compulsory', 'discipline'],
  [2, '2', 'both', null, 'Free Elective-1', null, 3, 'elective', 'elective'],
  [2, 'S', 'both', 'HTI27001', 'Clinical Studies I', 2, 8, 'compulsory', 'discipline', '8 weeks MI, 2 weeks RT'],
  // ---- Year 3 -------------------------------------------------------
  [3, '1', 'both', 'HTI37102', 'Medical Informatics', 3, 3, 'compulsory', 'discipline'],
  [3, '1', 'both', 'HTI37104', 'Introduction to Clinical Research for Radiography', 3, 3, 'compulsory', 'discipline'],
  [3, '1', 'MI', 'ELC3626', 'Professional English for HTI Students', 3, 3, 'compulsory', 'language'],
  [3, '1', 'MI', 'HTI38102', 'Medical Imaging Studies II', 3, 3, 'compulsory', 'discipline'],
  [3, '1', 'MI', 'HTI38203', 'Clinical Studies II (MI)', 3, 2, 'compulsory', 'discipline'],
  [3, '1', 'MI', 'HTI48101', 'Computed Tomography', 4, 3, 'compulsory', 'discipline'],
  [3, '1', 'RT', 'HTI39103', 'Radiotherapy Patient Management', 3, 3, 'compulsory', 'discipline'],
  [3, '1', 'RT', 'HTI29101', 'Radiotherapy Equipment & Dosimetry I', 2, 3, 'compulsory', 'discipline'],
  [3, '1', 'RT', 'HTI39104', 'Radiotherapy Studies II', 3, 3, 'compulsory', 'discipline'],
  [3, '1', 'RT', 'HTI39303', 'Clinical Studies II (RT)', 3, 2, 'compulsory', 'discipline'],
  [3, '2', 'both', null, 'Free Elective-2', null, 3, 'elective', 'elective'],
  [3, '2', 'both', null, 'GUR/CAR-3', null, 3, 'compulsory', 'gur'],
  [3, 'S', 'MI', 'HTI38204', 'Clinical Studies III (MI)', 3, 8, 'compulsory', 'discipline'],
  [3, 'S', 'RT', 'HTI39304', 'Clinical Studies III (RT)', 3, 8, 'compulsory', 'discipline'],
  // ---- Year 4 -------------------------------------------------------
  [4, '1', 'both', 'HTI47103', 'Project', 4, 0, 'compulsory', 'discipline', 'credit shown as "L" in Sem 1; the 6 credits are in Sem 2'],
  [4, '1', 'MI', 'HTI38103', 'Medical Imaging Studies III', 3, 3, 'compulsory', 'discipline'],
  [4, '1', 'MI', 'HTI48102', 'Radionuclide Imaging', 4, 3, 'compulsory', 'discipline'],
  [4, '1', 'MI', 'HTI48103', 'Ultrasonography', 4, 3, 'compulsory', 'discipline'],
  [4, '1', 'MI', 'HTI48105', 'Magnetic Resonance Imaging', 4, 3, 'compulsory', 'discipline'],
  [4, '1', 'RT', 'HTI39101', 'Radiotherapy Equipment & Dosimetry II', 3, 3, 'compulsory', 'discipline'],
  [4, '1', 'RT', 'HTI39105', 'Radiotherapy Studies III', 3, 3, 'compulsory', 'discipline'],
  [4, '1', 'RT', 'ELC3626', 'Professional English for HTI Students', 3, 3, 'compulsory', 'language'],
  [4, '1', 'RT', 'HTI49105', 'Imaging in Radiotherapy (combined class w/CT and MRI)', 4, 3, 'compulsory', 'discipline'],
  [4, '2', 'both', 'HTI47103', 'Project', 4, 6, 'compulsory', 'discipline'],
  [4, '2', 'MI', 'HTI48201', 'Clinical Studies IV (MI)', 4, 8, 'compulsory', 'discipline'],
  [4, '2', 'RT', 'HTI49301', 'Clinical Studies IV (RT)', 4, 8, 'compulsory', 'discipline'],
];

/* Examination per subject code: [exam, basis, evidence]. Counts are DISTINCT
   file names in work/source-catalogue.json whose folder or name says past
   paper / exam / test / quiz (`node work/query.mjs where "<code>"`), including
   predecessor codes (docs/SOURCES.md). Subjects with no old-source material
   at all (the Radiotherapy stream, new codes) are 'unknown'. */
const E = (exam, basis, note) => ({ exam, examBasis: basis, examNote: note });
export const EXAM = {
  // ---- confirmed ------------------------------------------------------
  HSS2011: E('yes', 'confirmed', '60% closed-book test; outputs/schedule.js, SOURCE hss.manual1819 p7 (final exam)'),
  ABCT2326: E('yes', 'confirmed', '50% final examination; outputs/schedule.js, SOURCE phys.sdf p2'),
  HTI17103: E('no', 'confirmed', 'worksheet + seminar, 100% continuous (SOURCE hti.sdf p2); owner confirmed no exam'),
  DSAI1202: E('yes', 'confirmed', '60% final test, closed-book, paper-based (outputs/schedule.js; SOURCE dsai.w1 p8)'),
  // ---- estimated: past papers exist ----------------------------------
  AP10006: E('yes', 'estimated', 'predecessor AP10009 University Physics II: past-paper solutions (9 exam-ish files)'),
  HTI17102: E('yes', 'estimated', '21 files in "Past Paper" folders incl. 2013-14 Imaging Anatomy Exam'),
  ABCT2329: E('yes', 'estimated', '8 files, 2013-14..2015-16 "Systemic Physiology Exam" + answers'),
  AP20015: E('yes', 'estimated', '50 exam-ish files: past papers 08-09 onward, mid-term test 2019-20'),
  HTI37105: E('yes', 'estimated', 'predecessor HTI37103/HTI27103 Radiobiology: 16 files, mid-term and final papers'),
  HTI27101: E('yes', 'estimated', '17 files in "Past Paper", 2011-12 Foundation Pathology Exam'),
  HTI28102: E('yes', 'estimated', '9 files in "Examination": 2019-20 MIS I Written Test MC'),
  HTI37102: E('yes', 'estimated', '22 files in "Exam"/"Test": 2015 exam + answers, 2018 final'),
  HTI37104: E('yes', 'estimated', '35 files: 2011 test 1, test 2 (ICR) papers'),
  HTI38102: E('yes', 'estimated', 'folder "Examination part info" + past exam files (6); weaker evidence'),
  HTI38103: E('yes', 'estimated', 'MIS III final test and online test questions (2 files); weaker evidence'),
  HTI48101: E('yes', 'estimated', 'CT Final Exam 2016, 2017-18 CT exam (5 files)'),
  // ---- estimated: no examination --------------------------------------
  HTI27001: E('no', 'estimated', 'clinical placement: no past papers (0 of 11 files); assessed in the clinic'),
  HTI38203: E('no', 'estimated', 'clinical studies (MI): no past papers; same pattern as Clinical Studies I'),
  HTI39303: E('no', 'estimated', 'clinical studies (RT): no past papers; same pattern as Clinical Studies I'),
  HTI38204: E('no', 'estimated', 'clinical studies (MI): no past papers; same pattern as Clinical Studies I'),
  HTI39304: E('no', 'estimated', 'clinical studies (RT): no past papers; same pattern as Clinical Studies I'),
  HTI48201: E('no', 'estimated', 'clinical studies (MI): no past papers; same pattern as Clinical Studies I'),
  HTI49301: E('no', 'estimated', 'clinical studies (RT): no past papers; same pattern as Clinical Studies I'),
  HTI47103: E('no', 'estimated', 'final-year project: thesis/report; 0 exam files of 8'),
  // ---- unknown: weak or no evidence -----------------------------------
  HTI27107: E('unknown', 'estimated', 'only lab quizzes (3 files), no past paper; predecessor HTI27104 Radiographical Imaging Science'),
  HTI37101: E('unknown', 'estimated', 'one online mid-term quiz (2020-21); no past paper'),
  HTI27106: E('unknown', 'estimated', '"Exam preparation tutorial" only; likely practical/OSCE'),
  HTI48102: E('unknown', 'estimated', 'a single 2022 exam file; mostly pre-class assignments'),
  HTI48103: E('unknown', 'estimated', '26 files, none exam-ish'),
  HTI48105: E('unknown', 'estimated', 'take-home exam 2020-21 only (not a closed-book test)'),
  HTI29102: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI39103: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI29101: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI39104: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI39101: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI39105: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
  HTI49105: E('unknown', 'estimated', 'no old-source material (Radiotherapy stream)'),
};
/* General / elective / language slots: not important whatever the exam. */
const EXAM_GENERAL = E('unknown', 'estimated', 'general or elective subject: not a core course, exam not researched');
const examOf = (code) => EXAM[code] || EXAM_GENERAL;

/* Credits of a subject across the whole programme, by code (Project is one
   subject on two rows). Subjects without a code stand alone. */
function programmeCredits(code, title, stream) {
  return ROWS.filter((r) => (code ? r[3] === code : r[4] === title) && (r[2] === stream || r[2] === 'both' || stream === 'both'))
    .reduce((n, r) => n + r[6], 0);
}

/* The rule in the header, as a function so the check can hold the stored
   flags to it. */
export function isImportant({ required, group, credits, code, title, stream, exam }) {
  if (required !== 'compulsory' || GENERAL.has(group) || group === 'elective') return false;
  if ((exam ?? examOf(code).exam) === 'no') return false;
  return programmeCredits(code, title, stream) >= IMPORTANT_MIN_CREDITS;
}

const SEM_LABEL = { '1': 'Semester 1', '2': 'Semester 2', S: 'Summer' };

export const PROGRAMME = {
  programme: 'BSc (Hons) in Radiography',
  code: PROGRAMME_CODE,
  intake: 2026,
  totalCredits: TOTAL_CREDITS,
  source: PROGRAMME_SOURCE,
  /* Set to 'RT' or 'MI' once chosen. Until then nothing may assume either. */
  chosenStream: null,
  subjects: ROWS.map(([year, sem, stream, code, title, level, credits, required, group, note]) => ({
    year, sem, stream, code, title, level, credits, required, group,
    ...examOf(code),
    important: isImportant({ required, group, credits, code, title, stream }),
    ...(note ? { note } : {}),
  })),
};

export const semLabel = (sem) => SEM_LABEL[sem] || sem;

/* The subjects of one year/semester that a stream takes: its own plus the
   shared ones. stream = null (nothing chosen) returns every stream's. */
export function subjectsOf(year, sem, stream = null) {
  return PROGRAMME.subjects.filter((s) => s.year === year && s.sem === sem
    && (!stream || s.stream === 'both' || s.stream === stream));
}

/* Credits of a stream's semester -- the number the sheet prints. */
export function semesterCredits(year, sem, stream) {
  return subjectsOf(year, sem, stream).reduce((n, s) => n + s.credits, 0);
}

/* Years and their semesters in order, for the panel. */
export const PROGRAMME_TERMS = [1, 2, 3, 4].map((year) => ({
  year,
  sems: ['1', '2', 'S'].filter((sem) => PROGRAMME.subjects.some((s) => s.year === year && s.sem === sem)),
}));
