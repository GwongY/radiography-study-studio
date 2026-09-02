/*
 * schedule.js — the semester itself: what the syllabus says, and when each
 * class actually happens.
 *
 * WHY THIS IS A DATA MODULE AND NOT A LESSON
 *
 * Everything else in this repo answers "what does the course teach". This
 * answers "what is the course, and where should I be on Tuesday". It is course
 * logistics, not anatomy, so nothing here is a factual study claim — but it is
 * held to the same traceability rule anyway: every row cites the document it
 * came off, and `SCHEDULE_SOURCES` below lists them.
 *
 * THE WEEK GRID IS DERIVED, AND HERE IS THE DERIVATION
 *
 * Only two of the three schedules carry dates. The grid that reconciles them:
 *
 *   Teaching week N runs Monday to Sunday. Week 1 Monday is 31 Aug 2026.
 *
 * Three independent confirmations, from three separate documents:
 *   - HTI17103 week 1 is "Aug 31st (Mon)"                    (hti.sched.2026)
 *   - ABCT2326 week 1 lecture is 02/09/26, a Wednesday       (phys.sched.2026)
 *   - HSS2011 week 13 holds the test on 28 Nov 2026 (Sat),
 *     and Mon 23 Nov + 5 = Sat 28 Nov                        (hss.sched.2026)
 * Every date in all three schedules lands on the weekday its own document
 * names. Nothing here is guessed from a calendar.
 *
 * WHAT IS NOT KNOWN
 *
 * The HSS2011 schedule published on Canvas gives week numbers and topics but
 * NO dates, times or rooms — only the test carries a time. Those sessions are
 * `undated: true`: they are placed in their teaching week and nowhere more
 * precise, and the UI says so rather than inventing a slot. If a timetable with
 * times appears, fill in `at` and drop the flag.
 *
 * ABCT2326 splits into tutorial groups A/B/C and lab groups 1/2/3 and the
 * supplied schedule does not say which the student is in. Both are carried, and
 * `GROUP_CHOICES` drives a picker; until one is chosen the UI shows all of them.
 */

/* ------------------------------------------------------------------ *
 * The term
 * ------------------------------------------------------------------ */

export const TERM = {
  id: '2026s1',
  name: 'Semester 1, 2026/27',
  /* Local-time Monday of teaching week 1. Months are 0-based in Date. */
  week1: [2026, 7, 31],
  weeks: 13,
};

/* A local-midnight Date for [y, m, d]. Never parse an ISO string for this:
   "2026-08-31" is parsed as UTC and comes back a day early west of Greenwich. */
export function ymd(y, m, d) { return new Date(y, m, d); }

/** Monday 00:00 of teaching week n (1-based). */
export function weekStart(n) {
  const [y, m, d] = TERM.week1;
  return ymd(y, m, d + (n - 1) * 7);
}
/** The instant a teaching week is over — Sunday 23:59:59.999. */
export function weekEnd(n) {
  const s = weekStart(n);
  return new Date(s.getFullYear(), s.getMonth(), s.getDate() + 7, 0, 0, 0, -1);
}
/** Which teaching week a moment falls in, or null outside the term. */
export function weekOf(when) {
  const t = when instanceof Date ? when : new Date(when);
  for (let n = 1; n <= TERM.weeks; n++) if (t >= weekStart(n) && t <= weekEnd(n)) return n;
  return null;
}

/* ------------------------------------------------------------------ *
 * Who teaches
 * ------------------------------------------------------------------ */

export const STAFF = {
  CC: { name: 'Dr Chartia Cheung', subject: 'ABCT2326' },
  CY: { name: 'Dr Clare Yan', subject: 'ABCT2326' },
  MC: { name: 'Dr Mary Chau', subject: 'ABCT2326' },
  BL: { name: 'Benson Lau', subject: 'HSS2011', note: 'Associate Professor, Rehabilitation Sciences — subject orientation' },
  AC: { name: 'Dr Alex Cheung', subject: 'HSS2011', note: 'Musculoskeletal module' },
  LTL: { name: 'Liang-Ting Lin', subject: 'HTI17103' },
  VL: { name: 'Vincent Leung', subject: 'HTI17103' },
  CE: { name: 'Clinical educators', subject: 'HTI17103' },
};

/* ------------------------------------------------------------------ *
 * The syllabus, per subject — straight off the subject description forms
 * ------------------------------------------------------------------ */

export const SUBJECT_ADMIN = {
  HSS2011: {
    code: 'HSS2011',
    title: 'Human Anatomy',
    credits: 3,
    level: '2 · Year 1, Semester 1',
    prereq: 'Nil',
    objective: 'By completing this subject using a systemic and regional approach in teaching and learning, students will be able to demonstrate a basic understanding of the structure, organization and function of the human body.',
    ilos: [
      'Understand and familiarize anatomical terminology of the human body',
      'Identify and locate relevant anatomical structures',
      'Demonstrate a basic understanding of tissue organization within the human body',
      'Integrate systemic and regional aspects of human anatomy and understand their spatial relationship',
      'Explain function of anatomical structures',
      'Recognize anatomical pathway of important body systems and regions',
    ],
    /* The SDF gives one line — Continuous Assessment 100%. The orientation
       deck breaks that 100% into three, and the Canvas schedule confirms the
       60% test and its date. Same total, three documents. */
    assessment: [
      { name: 'Revision Exercise', weight: 8, note: 'Online, open book. Modules 1–4.', src: { ref: 'hss.w1.2026', location: 'p7 "Revision Exercise (8%)"' } },
      { name: 'In-class activities', weight: 32, note: 'AI task allocated at random; discussion in session 1, a 3-minute presentation on 1 slide in session 2. Group assignments are set in the tutorials as case studies.', src: { ref: 'hss.w1.2026', location: 'p7 "In-class activities (32%)"' } },
      { name: 'Final quiz', weight: 60, note: 'Individual, close book, Lectures 1–12. Sat 28 Nov 2026, 16:00–17:30.', src: { ref: 'hss.w1.2026', location: 'p7 "Final quiz (60%)"' } },
    ],
    assessmentNote: 'The subject description form records all of this as one line — Continuous Assessment (Group assignments & Individual written test), 100%. There is no separate examination in the exam period.',
    effort: [
      { what: 'Face-to-face lecture', hours: 26 },
      { what: 'Discipline-specific tutorials', hours: 10 },
      { what: 'Class contact', hours: 36, total: true },
      { what: 'Independent study and collaborative learning', hours: 93, total: true },
      { what: 'Total student study effort', hours: 129, total: true },
    ],
    effortNote: 'The form splits the 93 into independent study and collaborative learning, but its table comes out of text extraction shifted by one row, so the split between those two is not quoted here. The three totals are unambiguous and they close: 26 + 10 = 36, 36 + 93 = 129.',
    teaching: 'Various eLearning methods, plus self-paced practical sessions facilitated by the 3D anatomical visualizer in the FHSS Virtual Anatomy & Physiology Laboratory. Tutorial groups are self-formed by students to discuss anatomical pathways and functions from lecture-based questions or case studies.',
    texts: [
      { role: 'Textbook', cite: 'Martini FH, Nath JL, Bartholomew EF (2024) Fundamentals of Anatomy and Physiology, 12th edition. Pearson.' },
      { role: 'Reading list', cite: 'Moore KL, Dalley AF, Agur AMR (2017) Clinically Oriented Anatomy, 8th edition. Lippincott Williams & Wilkins.' },
      { role: 'Reading list', cite: "Abrahams PH, Hutchings RT, Marks Jr SC (2008) McMinn's Colour Atlas of Human Anatomy, 5th edition. Mosby Elsevier." },
      { role: 'Reading list', cite: 'Gosling JA, Harris PF, Humpherson JR, Whitmore I, Willan PLT (2016) Human Anatomy Color Atlas and Text, 6th edition. Mosby.' },
      { role: 'Reading list', cite: 'Martini FH, Nath JL, Bartholomew EF (2018) Fundamentals of Anatomy and Physiology, 11th edition. Pearson.' },
      { role: 'Free, named in the orientation deck', cite: 'OpenStax, Anatomy and Physiology 2e — openstax.org/details/books/anatomy-and-physiology-2e', url: 'https://openstax.org/details/books/anatomy-and-physiology-2e' },
    ],
    src: { ref: 'hss.sdf.2627', location: 'p1 "Understand and familiarize anatomical terminology of the human body"' },
  },

  ABCT2326: {
    code: 'ABCT2326',
    title: 'Human Physiology',
    credits: 3,
    level: '2',
    prereq: 'Nil',
    objective: 'By completing this subject using an organ system-based approach in teaching and learning, students will be able to demonstrate a basic understanding of the function of the human body and the physiological mechanisms of the operation of major body systems.',
    ilos: [
      'Demonstrate a basic understanding of the different levels from cells to systems of body organization',
      'Understand the function and inter-relatedness of the major body systems',
      'Describe the basic physiologic mechanisms of how body systems work and interact',
      'Discuss the importance of communication and homeostasis at different levels of body organization in health and disease',
      'Collect and interpret the data derived from scientific experimentation to address physiological question',
    ],
    assessment: [
      { name: 'Quizzes', weight: 35, note: 'Continuous assessment. The one on the schedule covers Lectures 1–5.', src: { ref: 'phys.sched.2026', location: 'Assessment table' } },
      { name: 'Lab report', weight: 15, note: 'Continuous assessment. Practical laboratory reports assess ILO (e).', src: { ref: 'phys.sched.2026', location: 'Assessment table' } },
      { name: 'Written examination', weight: 50, note: 'Multiple choice and short questions, assessing ILOs (a) to (d).', src: { ref: 'phys.sdf', location: 'p3 "The examination will consist of multiple choice questions and short questions"' } },
    ],
    assessmentNote: 'The subject description form gives only the halves — Continuous Assessment 50%, Examination 50%. The 35/15 split inside the continuous half comes from the teaching schedule for this group.',
    effort: [
      { what: 'Lecture', hours: 24 },
      { what: 'Tutorial', hours: 12 },
      { what: 'Practical', hours: 6 },
      { what: 'Independent study and preparation for mid-term test and examination', hours: 84 },
      { what: 'Total student study effort', hours: 126, total: true },
    ],
    teaching: 'Mass lecturing with multimedia and animations; tutorials grouped by health professional discipline, using interactive multimedia, online activities and case study; laboratory practicals on cardiovascular, pulmonary and endocrine responses to different stimuli.',
    texts: [
      { role: 'Textbook', cite: 'Fox SI (2010) Human Physiology, 12th edition. McGraw Hill.' },
      { role: 'Reference textbook named on the schedule', cite: 'Martini FH, Nath JL, Bartholomew EF, Fundamentals of Anatomy & Physiology, 11th edition or latest.' },
    ],
    src: { ref: 'phys.sdf', location: 'p1 "Demonstrate a basic understanding of the different levels from cells to systems"' },
  },

  HTI17103: {
    code: 'HTI17103',
    title: 'Introduction to Medical Radiation Science',
    credits: 2,
    level: '1',
    prereq: 'Nil',
    objective: 'Introduce medical radiation science through the two professional streams — medical imaging and radiotherapy — and a period of clinical observation in Hospital Authority hospitals.',
    objectiveNote: 'App-authored summary of the schedule, not a quoted objective: the 2026 schedule is the only HTI17103 document supplied, and it carries no objectives section.',
    ilos: [],
    assessment: [
      { name: 'Worksheet', weight: 50, note: 'Submitted via the designated portal before the deadline.', src: { ref: 'hti.sched.2026', location: 'p1 "Worksheet"' } },
      { name: 'Seminar presentation', weight: 50, note: '10 minutes per group plus 5 minutes of Q&A. Everyone in the group must speak.', src: { ref: 'hti.sched.2026', location: 'p1 "Seminar Presentation"' } },
    ],
    effort: [
      { what: 'Lecture', hours: 10 },
      { what: 'Seminar presentation', hours: 4 },
      { what: 'Clinical observation', hours: 12 },
      { what: 'Total contact hours', hours: 26, total: true },
    ],
    teaching: 'Five lectures, two group seminars, and a two-day clinical observation placement in Hospital Authority hospitals.',
    texts: [],
    src: { ref: 'hti.sched.2026', location: 'p1 "This is a 2-credit subject with a subtotal of 26 contact hours required"' },
  },
};

/* ------------------------------------------------------------------ *
 * Groups the student belongs to but the schedule does not say
 * ------------------------------------------------------------------ */

export const GROUP_CHOICES = [
  {
    id: 'physTutorial', subject: 'ABCT2326', label: 'Physiology tutorial group',
    options: [
      { id: 'A', label: 'Group A · Y306 · Dr Clare Yan' },
      { id: 'B', label: 'Group B · PQ304 · Dr Chartia Cheung' },
      { id: 'C', label: 'Group C · Y303 · Dr Mary Chau' },
    ],
  },
  {
    id: 'physLab', subject: 'ABCT2326', label: 'Physiology lab group',
    options: [
      { id: '1', label: 'Lab Group 1' },
      { id: '2', label: 'Lab Group 2' },
      { id: '3', label: 'Lab Group 3' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Every timetabled session
 *
 * kind:  lecture | tutorial | lab | seminar | observation | assessment
 *        | consultation | activity | revision | none
 * `at`   [hour, minute, endHour, endMinute] local. Absent when undated.
 * `on`   [year, monthIndex, day] local. Absent when undated.
 * `unit` the study unit this session teaches, so a row can open the lessons.
 * ------------------------------------------------------------------ */

const S = (o) => o;

export const SESSIONS = [
  /* ---------------- HSS2011 — week-numbered, no times published --------- */
  S({ subject: 'HSS2011', week: 1, kind: 'lecture', undated: true, title: 'Subject Orientation & Introduction + Musculoskeletal System', module: 1, unit: 'hss.subject', teacher: 'BL', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 1, kind: 'activity', undated: true, title: 'Ice-breaking Session', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 2, kind: 'lecture', undated: true, title: 'Upper Limbs', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 2, kind: 'activity', undated: true, title: 'Introduction to body tissues', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 3, kind: 'lecture', undated: true, title: 'Lower Limbs', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 3, kind: 'activity', undated: true, title: 'In-class exercise (Module 1)', module: 1, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 4, kind: 'lecture', undated: true, title: 'Head & Neck', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 4, kind: 'activity', undated: true, title: 'In-class exercise (Module 1)', module: 1, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 5, kind: 'lecture', undated: true, title: 'Nervous System', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 5, kind: 'consultation', undated: true, title: 'Individual consultation', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 6, kind: 'lecture', undated: true, title: 'Brain and Cranial Nerve', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 6, kind: 'activity', undated: true, title: 'In-class exercise (Module 2)', module: 2, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 7, kind: 'lecture', undated: true, title: 'Special Senses', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 7, kind: 'consultation', undated: true, title: 'Individual consultation', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 8, kind: 'lecture', undated: true, title: 'Cardiovascular System', module: 3, unit: 'hss.m1', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 8, kind: 'activity', undated: true, title: 'In-class exercise (Module 2)', module: 2, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 9, kind: 'lecture', undated: true, title: 'Respiratory System', module: 3, unit: 'hss.m1', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 9, kind: 'activity', undated: true, title: 'In-class exercise (Module 3)', module: 3, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 10, kind: 'lecture', undated: true, title: 'Regional Anatomy of the Thorax, Abdomen & Pelvis', module: 3, unit: 'hss.m1', dur: '2 hours', note: 'The schedule marks this week Module Three + Four.' }),
  S({ subject: 'HSS2011', week: 10, kind: 'activity', undated: true, title: 'In-class exercise (Module 3)', module: 3, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 11, kind: 'lecture', undated: true, title: 'Digestive System', module: 4, unit: 'hss.m3', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 11, kind: 'activity', undated: true, title: 'In-class exercise (Module 4)', module: 4, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 12, kind: 'lecture', undated: true, title: 'Urogenital System', module: 4, unit: 'hss.m3', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 12, kind: 'activity', undated: true, title: 'In-class exercise (Module 4)', module: 4, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 13, kind: 'revision', undated: true, title: 'Online revision', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 13, kind: 'assessment', on: [2026, 10, 28], at: [16, 0, 17, 30], title: 'Closed-book test (individual) — 60%', weight: 60, note: 'Covers Lectures 1–12.' }),

  /* ---------------- ABCT2326 — Opt & Rad Group 4 (1107 & 1111) ---------- */
  /* Lecture: Wed 13:30–15:20, V322. Tutorial: Wed 17:30–18:20. Lab: Thu 13:30–15:20, Y719. */
  S({ subject: 'ABCT2326', week: 1, kind: 'lecture', on: [2026, 8, 2], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 1 — Cell / Body', teacher: 'CC', unit: 'phys.cells' }),
  S({ subject: 'ABCT2326', week: 1, kind: 'tutorial', on: [2026, 8, 2], at: [17, 30, 18, 20], title: 'Tutorial — Cell & Body', unit: 'phys.cells', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'lecture', on: [2026, 8, 9], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 2 — Cardiovascular System', teacher: 'CC', unit: 'phys.cvs' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'tutorial', on: [2026, 8, 9], at: [17, 30, 18, 20], title: 'Tutorial — CVS', unit: 'phys.cvs', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'lab', on: [2026, 8, 10], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'lecture', on: [2026, 8, 16], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 3 — Respiratory System', teacher: 'CC', unit: 'phys.resp' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'tutorial', on: [2026, 8, 16], at: [17, 30, 18, 20], title: 'Tutorial — Respiration', unit: 'phys.resp', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'lab', on: [2026, 8, 17], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'lecture', on: [2026, 8, 23], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 4 — Digestive System', teacher: 'CC', unit: 'phys.dig' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'tutorial', on: [2026, 8, 23], at: [17, 30, 18, 20], title: 'Tutorial — Digestion', unit: 'phys.dig', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'lab', on: [2026, 8, 24], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 5, kind: 'lecture', on: [2026, 8, 30], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 5 — Renal System', teacher: 'CC', unit: 'phys.renal' }),
  S({ subject: 'ABCT2326', week: 5, kind: 'tutorial', on: [2026, 8, 30], at: [17, 30, 18, 20], title: 'Tutorial — Renal', unit: 'phys.renal', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 5, kind: 'none', on: [2026, 9, 1], title: 'Holiday — no lab' }),
  S({ subject: 'ABCT2326', week: 6, kind: 'assessment', on: [2026, 9, 7], at: [13, 30, 15, 20], room: 'V322', title: 'QUIZ — Lectures 1–5', teacher: 'CC', note: 'Counts towards the 35% quiz component.' }),
  S({ subject: 'ABCT2326', week: 6, kind: 'lab', on: [2026, 9, 8], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'lecture', on: [2026, 9, 14], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 6 — Reproductive System', teacher: 'CY', unit: 'phys.repro' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'tutorial', on: [2026, 9, 14], at: [17, 30, 18, 20], title: 'Tutorial — Reproduction', unit: 'phys.repro', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'lab', on: [2026, 9, 15], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'lecture', on: [2026, 9, 21], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 7 — Endocrine System', teacher: 'CY', unit: 'phys.endo' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'tutorial', on: [2026, 9, 21], at: [17, 30, 18, 20], title: 'Tutorial — Endocrine', unit: 'phys.endo', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'lab', on: [2026, 9, 22], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 9, kind: 'lecture', on: [2026, 9, 28], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 8 — Nervous System', teacher: 'CY', unit: 'phys.nerv' }),
  S({ subject: 'ABCT2326', week: 9, kind: 'lab', on: [2026, 9, 29], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 10, kind: 'none', on: [2026, 10, 4], title: 'No class this week' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'lecture', on: [2026, 10, 11], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 9 — Nerve / Musculoskeletal', teacher: 'CY', unit: 'phys.msk' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'tutorial', on: [2026, 10, 11], at: [17, 30, 18, 20], title: 'Tutorial — Nerve', unit: 'phys.nerv', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'lab', on: [2026, 10, 12], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'lecture', on: [2026, 10, 18], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 10 — Musculoskeletal / Immune', teacher: 'CY', unit: 'phys.msk' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'tutorial', on: [2026, 10, 18], at: [17, 30, 18, 20], title: 'Tutorial — Muscle', unit: 'phys.msk', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'lab', on: [2026, 10, 19], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 13, kind: 'lecture', on: [2026, 10, 25], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 11 — Immune System', teacher: 'CY', unit: 'phys.imm' }),
  S({ subject: 'ABCT2326', week: 13, kind: 'tutorial', on: [2026, 10, 25], at: [17, 30, 18, 20], title: 'Tutorial — Immune', unit: 'phys.imm', groupOf: 'physTutorial' }),

  /* ---------------- HTI17103 — the real 2026 schedule ------------------- */
  S({ subject: 'HTI17103', week: 1, kind: 'lecture', on: [2026, 7, 31], at: [9, 30, 11, 30], room: 'HJ202', title: 'About this subject; Introduction — Radiographer-to-be', teacher: 'LTL', unit: 'hti.subject' }),
  S({ subject: 'HTI17103', week: 2, kind: 'lecture', on: [2026, 8, 10], at: [9, 30, 11, 30], room: 'GH201', title: 'Medical Imaging Modalities and Instruments', teacher: 'LTL', unit: 'hti.modalities' }),
  S({ subject: 'HTI17103', week: 3, kind: 'lecture', on: [2026, 8, 17], at: [9, 30, 11, 30], room: 'GH201', title: 'Introduction — Radiotherapist-to-be', teacher: 'VL', unit: 'hti.rt' }),
  S({ subject: 'HTI17103', week: 4, kind: 'lecture', on: [2026, 8, 24], at: [9, 30, 11, 30], room: 'GH201', title: 'Basic Radiation Protection', teacher: 'LTL', unit: 'hti.protect' }),
  S({ subject: 'HTI17103', week: 5, kind: 'lecture', on: [2026, 8, 28], at: [10, 30, 12, 30], room: 'HJ305', title: 'MI vs. RT — Grand Prix of Streams', teacher: 'LTL', unit: 'hti.modalities' }),
  S({ subject: 'HTI17103', week: 6, kind: 'observation', on: [2026, 9, 5], title: 'Observation Day (HA Hospitals)', teacher: 'CE', room: 'TBA', note: 'Oct 5–6 (Mon, Tue). 12 of the subject’s 26 contact hours.' }),
  S({ subject: 'HTI17103', week: 7, kind: 'seminar', on: [2026, 9, 15], at: [9, 30, 11, 30], room: 'TU201', title: 'Seminar I — Group Presentation', teacher: 'LTL', note: '10 minutes plus 5 minutes Q&A. Everyone in the group must speak.' }),
  S({ subject: 'HTI17103', week: 8, kind: 'seminar', on: [2026, 9, 22], at: [9, 30, 11, 30], room: 'TU201', title: 'Seminar II — Group Presentation', teacher: 'LTL', note: '10 minutes plus 5 minutes Q&A.' }),
];

/* A stable id per session, for storing attendance against. Derived rather
   than written out, so a row cannot be given the same id twice by hand. */
for (const s of SESSIONS) {
  const when = s.on ? s.on.join('-') : `w${s.week}`;
  s.id = `${s.subject}:${when}:${s.kind}${s.group ? ':' + s.group : ''}:${s.at ? s.at[0] : 'x'}`;
}

/* ------------------------------------------------------------------ *
 * Where a session sits in time
 * ------------------------------------------------------------------ */

/** Start and end Dates for a session. An undated one spans its whole week. */
export function sessionSpan(s) {
  if (!s.on) return { from: weekStart(s.week), to: weekEnd(s.week), vague: true };
  const [y, m, d] = s.on;
  if (!s.at) return { from: ymd(y, m, d), to: new Date(y, m, d + 1, 0, 0, 0, -1), vague: true };
  const [h1, mi1, h2, mi2] = s.at;
  return { from: new Date(y, m, d, h1, mi1), to: new Date(y, m, d, h2, mi2), vague: false };
}

/**
 * 'past' | 'now' | 'open' | 'next' | 'upcoming'.
 *
 * 'open' is the honest answer for a session whose span is a whole week or a
 * whole day: it is somewhere inside that span, and the published schedule does
 * not say where. Calling it 'now' would have put the HSS2011 orientation
 * lecture on the now-card for seven days.
 *
 * 'next' is only ever given to one session per call, by sessionsWithStatus —
 * status() itself cannot know which of the upcoming ones is soonest.
 */
export function sessionStatus(s, now = new Date()) {
  const { from, to, vague } = sessionSpan(s);
  if (now > to) return 'past';
  if (now >= from) return vague ? 'open' : 'now';
  return 'upcoming';
}

/** Every session, in time order, each tagged with its status and span. */
export function sessionsWithStatus(now = new Date(), filter = null) {
  const rows = SESSIONS
    .filter((s) => (filter ? filter(s) : true))
    .map((s) => ({ s, ...sessionSpan(s), status: sessionStatus(s, now) }))
    .sort((a, b) => a.from - b.from || String(a.s.subject).localeCompare(b.s.subject));
  const next = rows.find((r) => r.status === 'upcoming');
  if (next) next.status = 'next';
  return rows;
}

/** True where this session belongs to a group the student has not chosen. */
export function isOtherGroup(s, groups) {
  if (!s.groupOf || !s.group) return false;
  const picked = groups && groups[s.groupOf];
  return !!picked && picked !== s.group;
}

/* ------------------------------------------------------------------ *
 * Formatting — kept here so the view has no date arithmetic in it
 * ------------------------------------------------------------------ */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n) => String(n).padStart(2, '0');

export function fmtDate(d) { return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`; }
export function fmtTime(d) { return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
export function fmtWeekRange(n) {
  const a = weekStart(n); const b = weekEnd(n);
  return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
}
/** "Wed 2 Sep · 13:30–15:20", or "Week 5 · 28 Sep – 4 Oct" when undated. */
export function fmtWhen(s) {
  const { from, to, vague } = sessionSpan(s);
  if (!s.on) return `Week ${s.week} · ${fmtWeekRange(s.week)}`;
  if (vague) return fmtDate(from);
  return `${fmtDate(from)} · ${fmtTime(from)}–${fmtTime(to)}`;
}

/* Human-readable kind labels, and the accent each uses. */
export const KINDS = {
  lecture: { label: 'Lecture', tone: 'teal' },
  tutorial: { label: 'Tutorial', tone: 'blue' },
  lab: { label: 'Lab', tone: 'blue' },
  seminar: { label: 'Seminar', tone: 'blue' },
  observation: { label: 'Clinical observation', tone: 'orange' },
  assessment: { label: 'Assessment', tone: 'red' },
  consultation: { label: 'Consultation', tone: 'muted' },
  activity: { label: 'Collaborative session', tone: 'muted' },
  revision: { label: 'Revision', tone: 'muted' },
  none: { label: 'No class', tone: 'muted' },
};

/* Which documents every row above came from. Shown in the view, so the
   timetable can be checked the same way a lesson can. */
export const SCHEDULE_SOURCES = [
  { subject: 'HSS2011', ref: 'hss.sdf.2627', what: 'Subject description form 2026/27 — objective, learning outcomes, module contents, study effort, texts' },
  { subject: 'HSS2011', ref: 'hss.sched.2026', what: 'Schedule for Learning & Teaching Activities on Canvas — the thirteen weeks and the test date' },
  { subject: 'HSS2011', ref: 'hss.w1.2026', what: 'Week 1 orientation deck — the assessment weights' },
  { subject: 'ABCT2326', ref: 'phys.sdf', what: 'Subject description form — objective, learning outcomes, syllabus, study effort, textbook' },
  { subject: 'ABCT2326', ref: 'phys.sched.2026', what: 'Teaching schedule 2026, Opt & Rad Group 4 — every date, time, room, group and the 35/15 split' },
  { subject: 'HTI17103', ref: 'hti.sched.2026', what: 'Teaching schedule 2026 — all eight sessions and both assessments' },
];
