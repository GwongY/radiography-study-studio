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
 * WHERE THE TIMES CAME FROM
 *
 * The HSS2011 schedule published on Canvas gives week numbers and topics but
 * NO dates, times or rooms — only the test carries a time. Every HSS2011 row
 * used to be `undated`, placed in its teaching week and nowhere more precise,
 * because inventing a slot would have been worse than admitting to none.
 *
 * The times are now here, and they came from the student's own university
 * timetable in Google Calendar (`cal.2026` below). That is a different KIND
 * of source from the rest of this file — it is not a published document, and
 * it cannot be re-checked by anyone else — so it is worth being exact about
 * why it is trusted: it agrees with all three published schedules on every
 * date they both carry, all thirteen weeks of it, including the four
 * revision-exercise deadlines and the test. A source that reproduces three
 * documents it was not derived from is telling the truth about the fourth.
 *
 * Where the calendar and a published schedule disagree, the document wins on
 * WHAT happens and the calendar wins on WHEN and WHERE, and the row says so.
 * The disagreements are listed on the rows themselves, not summarised here.
 *
 * Re-checked against the calendar on 4 Sep 2026, event by event across all
 * thirteen weeks — 118 course events against 114 dated rows, compared by
 * subject, date and start time rather than by reading. Four rooms and two end
 * times were wrong and are now right; three booked slots had no row at all and
 * now do. What a re-check is FOR is the last of those: a room that moves is
 * visible the moment you walk in, and an hour nobody told you about is not.
 *
 * WHAT IS STILL NOT KNOWN
 *
 * ABCT2326 splits into tutorial groups A/B/C and lab groups 1/2/3 and the
 * supplied schedule does not say which the student is in. Both are carried, and
 * `GROUP_CHOICES` drives a picker; until one is chosen the UI shows all of them.
 *
 * The calendar half-settles it. It books a ROOM, and the tutorial rooms differ
 * per group: every one of the thirteen tutorials is in Y306, which is Group A's
 * room. That is a deduction from a room number rather than anything anyone
 * published, so it is offered on the picker and not written in — see the note
 * on `GROUP_CHOICES`. The lab groups stay genuinely unknown; all three share
 * Y719.
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
      { name: 'Revision exercise', weight: 8, group: 'Individual', note: 'FOUR separate exercises worth 2% each, due at the end of weeks 2, 5, 8 and 10. Online, open book.', src: { ref: 'hss.sched.2026b', location: 'Important Dates & Weeks' } },
      { name: 'Closed-book test', weight: 60, group: 'Individual', note: 'Individual, close book, Lectures 1–12. Sat 28 Nov 2026, 16:00–17:30.', src: { ref: 'hss.sched.2026b', location: 'Week 13 row' } },
      { name: 'In-class exercise', weight: 32, group: 'Group', note: 'The group half. An AI task allocated at random; discussion in session 1, a 3-minute presentation on 1 slide in session 2. Set in the tutorials as case studies.', src: { ref: 'hss.sched.2026b', location: 'Group Assignment (Total 32%)' } },
    ],
    assessmentNote: 'The subject states it as two halves: Individual Assignment 68% — revision exercise 8% plus closed-book test 60% — and Group Assignment 32%, the in-class exercise. The description form records the whole of it as one line, Continuous Assessment 100%. There is no separate examination in the exam period.',
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
      { name: 'Quiz', weight: 35, note: 'One quiz. The teaching schedule places it on 7 Oct and covers Lectures 1–5.', src: { ref: 'phys.overview.2026', location: 'p3 assessment method' } },
      { name: 'Lab reports', weight: 15, note: 'Three online reports worth 5% each: Measuring Blood Pressure, Digestion and Respiration.', src: { ref: 'phys.overview.2026', location: 'pp3 and 5 assessment method and laboratory topics' } },
      { name: 'Final exam', weight: 50, note: 'The current overview says MCQ and fill-in-the-blanks; the detailed format remains to be confirmed.', src: { ref: 'phys.overview.2026', location: 'p3 quiz and final exam format' } },
    ],
    assessmentNote: 'The latest Group 4 overview resolves the old ambiguity: exactly one 35% quiz, three 5% lab reports, and a 50% final exam. It supersedes the older form’s generic 50% continuous-assessment / 50% examination wording.',
    effort: [
      { what: 'Lecture', hours: 24 },
      { what: 'Tutorial', hours: 12 },
      { what: 'Practical', hours: 6 },
      { what: 'Independent study and preparation for mid-term test and examination', hours: 84 },
      { what: 'Total student study effort', hours: 126, total: true },
    ],
    teaching: 'Lectures, tutorials and three laboratory practicals: Measuring Blood Pressure, Digestion and Respiration. Reports are submitted online through Turnitin; a lab coat is mandatory.',
    texts: [
      { role: 'Recommended textbook', cite: 'Martini FH, Nath JL and Bartholomew EF (2015 or newer), Fundamentals of Anatomy and Physiology, 10th edition or newer. Pearson.' },
    ],
    src: { ref: 'phys.overview.2026', location: 'pp2–3 learning outcomes, lecture topics and assessment' },
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

  APSS1A08: {
    code: 'APSS1A08',
    title: 'Introduction to Sociology',
    credits: null,
    level: '',
    prereq: '',
    objective: 'Help students understand how society works and how far society influences them, using everyday experience as the starting point for personal discovery.',
    ilos: [
      'Cultivate a linkage between sociology and real life',
      'Describe the origin, historical development and essence of sociology',
      'Give an educated criticism of social issues beyond commonsensical viewpoints',
    ],
    assessment: [
      { name: 'Attendance and participation', weight: 10, note: 'Engagement in discussion and raising significant issues or questions. No generative-AI permission is specified because there is no take-home submission.', src: { ref: 'soc.syllabus.2026', location: 'pp4–5 assessment table and continuous assessment' } },
      { name: 'Reflective paper', weight: 20, note: 'Generative AI is not allowed. Due Sat 17 Oct 2026 at 23:59 through Blackboard as an MS Word file.', src: { ref: 'soc.syllabus.2026', location: 'pp2 and 4 reflective-paper deadline and AI policy' } },
      { name: 'Mini project', weight: 20, note: 'Generative AI is allowed. Due Sat 28 Nov 2026 at 23:59 through Blackboard as an MS Word file.', src: { ref: 'soc.syllabus.2026', location: 'pp2 and 4 mini-project deadline and AI policy' } },
      { name: 'End-of-term quiz', weight: 50, note: 'Generative AI is not allowed. Held in the Week 13 class; the syllabus separately gives Sat 5 Dec 2026 at 23:59 as the quiz-paper submission deadline.', src: { ref: 'soc.syllabus.2026', location: 'pp2, 4–5 end-of-term quiz and submission deadline' } },
    ],
    assessmentNote: 'Blackboard is the only accepted submission route. A submission must be completed, not merely uploaded; the syllabus states a 10-mark deduction per calendar day late and allows three attempts, with the final attempt marked.',
    effort: [],
    teaching: 'One three-hour face-to-face class each Friday, with lecture Q&A. Notes or reference materials are posted to Blackboard before class and face-to-face lectures are recorded through Zoom.',
    texts: [
      { role: 'Listed under “Textbook”', cite: 'Macionis J (2024), Sociology, 16th edition. Pearson.' },
    ],
    textNote: 'The same current syllabus says “There is no textbook for this subject” on p3, then labels Macionis (2024) as “Textbook” on p5. Both statements are preserved here; confirm with the instructor which one governs.',
    src: { ref: 'soc.syllabus.2026', location: 'pp1–5 objective, outcomes, schedule, administration and assessment' },
  },

  DSAI1202: {
    code: 'DSAI1202',
    title: 'Introduction to Artificial Intelligence and Data Analytics',
    credits: null,
    level: '',
    prereq: '',
    objective: 'Improve students’ general AI literacy through a non-programming, non-mathematical introduction that is not customised to one discipline.',
    objectiveNote: 'The Week 1 overview supplies this aim and the assessment schedule, but no formal intended-learning-outcome list or credit value.',
    ilos: [],
    assessment: [
      { name: 'AIDA e-module online test', weight: 4, note: 'Due Week 7 Saturday at 23:59. The highest attempt must reach at least 65% correct for full marks.', src: { ref: 'dsai.w1', location: 'Slides 4 and 7 assessment schedule and e-module instructions' } },
      { name: 'Generative-AI class exercise', weight: 6, note: 'Due Week 7 Saturday at 23:59.', src: { ref: 'dsai.w1', location: 'Slide 4 assessment schedule' } },
      { name: 'Course participation', weight: 5, note: 'IC-visit attendance and feedback, lecture participation and class exercises; IC feedback is due Week 11 Saturday at 23:59.', src: { ref: 'dsai.w1', location: 'Slide 4 assessment schedule' } },
      { name: 'Group project', weight: 25, note: 'Group formation is due Week 3 Saturday at 23:59; final submission is due Week 11 Saturday at 23:59.', src: { ref: 'dsai.w1', location: 'Slide 4 assessment schedule' } },
      { name: 'Final test', weight: 60, note: 'Week 13 lecture time: closed-book, paper-based and invigilated; multiple choice, multiple answer, true/false and short questions; about 40 minutes.', src: { ref: 'dsai.w1', location: 'Slides 4 and 8 assessment schedule and test format' } },
    ],
    assessmentNote: 'The deck also mentions a possible 2% bonus task or survey, explicitly “to be confirmed”; it is not included in the 100% total. For take-home work, this subject expects responsible generative-AI use and may require prompts, outputs and improvements to be documented.',
    effort: [],
    teaching: 'Lectures include hands-on labs and class activities, so students are told to bring a laptop. Two Industrial Centre visits are arranged in Weeks 5/6 and 10/11; each student attends one visit in each pair and the paired lecture content repeats.',
    texts: [],
    src: { ref: 'dsai.w1', location: 'Slides 3–8 and 36–47 schedule, assessment, AI policy and course scope' },
  },
};

/* ------------------------------------------------------------------ *
 * Groups the student belongs to but the schedule does not say
 * ------------------------------------------------------------------ */

export const GROUP_CHOICES = [
  {
    id: 'physTutorial', subject: 'ABCT2326', label: 'Physiology tutorial group',
    /* The timetable books Y306 for all thirteen tutorials, and Y306 is Group
       A's room. Strong, but it is still an inference off a room number — so
       it is shown as a suggestion and the student confirms it. Silently
       ticking a box on this evidence would hide the reasoning at exactly the
       point someone might want to check it. */
    suggested: 'A',
    suggestedWhy: 'Every tutorial in your timetable is booked in Y306, which is Group A’s room.',
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

/* ------------------------------------------------------------------ *
 * Weekly slots, from the university timetable
 *
 * HSS2011 published week numbers and topics and no times at all, so every
 * one of its rows used to be `undated` — placed in its week and nowhere
 * more precise. The timetable in the student's own Google Calendar has the
 * times, the rooms and every date, and it agrees with all three published
 * schedules on every date they both carry. So the sessions are now real
 * appointments, and the "week only" hedge is gone from all but nothing.
 *
 * Order inside a week is worth knowing and is easy to get backwards: the
 * HSS2011 TUTORIAL is on Wednesday and the LECTURE is on Friday. Within one
 * teaching week the small session comes first.
 * ------------------------------------------------------------------ */

/** [y, m, d] for a weekday inside a teaching week. 1 = Mon … 7 = Sun. */
export function dayOf(week, dow) {
  const s = weekStart(week);
  const d = new Date(s.getFullYear(), s.getMonth(), s.getDate() + (dow - 1));
  return [d.getFullYear(), d.getMonth(), d.getDate()];
}

/* A recurring slot, spread into a session row. Written as functions rather
   than 26 hand-typed date arrays: a mistyped one lands in the wrong week,
   which is exactly what schedule-check.mjs exists to catch, and not making
   the mistake beats catching it. */
const slot = (dow, at, room) => (week) => ({ on: dayOf(week, dow), at, room });

/* HSS2011 — Fri 16:30–18:20 V322, and Wed 12:30–13:20 CD512. */
const hssLec = slot(5, [16, 30, 18, 20], 'V322');
const hssTut = slot(3, [12, 30, 13, 20], 'CD512');

const S = (o) => o;

/* Every week of the term in one slot. Used where the timetable has a regular
   pattern; per-week source data can replace its title and lesson state.

   `perWeek` is the escape hatch for a slot that is regular except once —
   keyed by week number, merged over the row. A pattern with one exception is
   still worth writing as a pattern; writing out thirteen rows to capture one
   difference is how the other twelve drift. */
function weekly(subject, kind, dow, at, room, title, perWeek = {}) {
  const rows = [];
  for (let week = 1; week <= TERM.weeks; week++) {
    rows.push({
      subject, week, kind, on: dayOf(week, dow), at, title, noStudy: true,
      ...(room ? { room } : {}),
      ...(perWeek[week] || {}),
      src: { ref: 'cal.2026', location: `${subject} weekly slot` },
    });
  }
  return rows;
}

/* ------------------------------------------------------------------ *
 * Which lessons cover which week
 *
 * APP-AUTHORED CURATION, not a source claim: the schedule names a week's
 * topic and this says which of our items teach it. It is the answer to
 * "what should I read before Thursday", which the corpus could not give
 * before — a corpus in subject order is not a week-by-week study plan.
 *
 * Empty lists are deliberate source gaps, never placeholders hidden by the
 * renderer. WEEK_GAPS below names the missing current teaching file.
 *
 * Every id here is checked by work/schedule-check.mjs.
 * ------------------------------------------------------------------ */
/* Subjects with source-backed lessons. The Course tab uses this list rather
   than maintaining a second hard-coded list of subjects that can drift. */
export const STUDY_SUBJECTS = ['HSS2011', 'ABCT2326', 'HTI17103', 'APSS1A08', 'DSAI1202'];

export const WEEK_STUDY = {
  HSS2011: {
    1: [
      'hss2011-terminology-anatomical-position', 'hss2011-terminology-directional-pairs',
      'hss2011-terminology-planes', 'hss2011-terminology-cavities-regions',
      'hss2011-terminology-regional-systemic', 'hss2011-terminology-word-parts',
      'hss2011-osteo-axial-appendicular', 'hss2011-osteo-bone-shapes',
      'hss2011-osteo-long-bone-structure', 'hss2011-osteo-bone-functions',
      'hss2011-msk-bone-histology', 'hss2011-msk-bone-marrow',
      'hss2011-msk-tissues-of-movement', 'hss2011-msk-muscle-organisation',
      'hss2011-msk-tendon-attachment', 'hss2011-msk-motor-unit-tone',
      'hss2011-msk-joint-classifications', 'hss2011-joints-classification',
      'hss2011-joints-synovial-structure', 'hss2011-joints-synovial-types',
      'hss2011-joints-movements', 'hss2011-pastpaper-joints-articulations',
    ],
    2: [
      'hss2011-joints-movement-map-2026', 'hss2011-osteo-pectoral-girdle',
      'hss2011-bone-clavicle', 'hss2011-bone-scapula', 'hss2011-bone-humerus',
      'hss2011-osteo-forearm-carpals', 'hss2011-bone-radius', 'hss2011-bone-ulna',
      'hss2011-bone-hand', 'hss2011-structures-carpals', 'hss2011-structures-rotatorCuff',
      'hss2011-joints-rotator-cuff', 'hss2011-movement-shoulderAbduction',
      'hss2011-movement-elbowFlexion', 'hss2011-movement-supination',
      'hss2011-movement-thumbOpposition',
    ],
    3: [
      'hss2011-osteo-pelvic-girdle', 'hss2011-bone-pelvis', 'hss2011-bone-femur',
      'hss2011-bone-patella', 'hss2011-osteo-leg-tarsals', 'hss2011-bone-tibia',
      'hss2011-bone-fibula', 'hss2011-bone-foot', 'hss2011-structures-tarsals',
      'hss2011-structures-kneeJoint',
    ],
    4: [
      'hss2011-osteo-skull-sutures', 'hss2011-bone-cranium', 'hss2011-bone-mandible',
      'hss2011-structures-skullBones', 'hss2011-osteo-vertebra-parts',
      'hss2011-osteo-vertebral-column', 'hss2011-osteo-c1-c2',
      'hss2011-bone-cervical', 'hss2011-bone-thoracic', 'hss2011-bone-lumbar',
      'hss2011-bone-sacrum', 'hss2011-bone-coccyx', 'hss2011-structures-vertebralRegions',
    ],
    5: ['hss2011-m2-cns-basics'],
    6: ['hss2011-m2-brain-regions', 'hss2011-structures-brainAndCsf', 'hss2011-structures-cranialNerves'],
    7: [
      'hss2011-m2-eye-visual-pathway', 'hss2011-m2-ear-hearing',
      'hss2011-m2-static-dynamic-equilibrium', 'hss2011-m2-taste-smell',
    ],
    8: ['hss2011-m1-heart-wall-valves'],
    9: ['hss2011-m1-lungs-airway'],
    10: ['hss2011-osteo-ribs-sternum', 'hss2011-bone-ribs', 'hss2011-bone-sternum'],
    11: ['hss2011-m3-digestive'],
    12: ['hss2011-m3-urogenital-pelvis'],
  },
  ABCT2326: {
    1: [
      'abct2326-cells-organisation', 'abct2326-plasma-membrane', 'abct2326-organelles',
      'abct2326-nucleus-genetic-code', 'abct2326-protein-synthesis', 'abct2326-cell-division',
      'abct2326-epithelium-classification', 'abct2326-connective-tissue-classes',
      'abct2326-muscle-neural-tissue', 'abct2326-homeostasis', 'abct2326-feedback-loops',
    ],
    2: [
      'hss2011-structures-heartChambers', 'hss2011-structures-greatVessels',
      'abct2326-cvs-circuits', 'abct2326-cvs-heart-structure', 'abct2326-blood-composition',
      'abct2326-cvs-conduction', 'abct2326-cvs-ecg-cycle',
    ],
    3: ['hss2011-structures-airwayTree', 'abct2326-resp-pathway', 'abct2326-resp-gas-transport'],
    4: ['hss2011-structures-digestiveTract', 'abct2326-digestive-pathway'],
    5: ['hss2011-structures-urinaryTract', 'abct2326-renal-nephron'],
    7: [
      'abct2326-repro-male-regulation', 'abct2326-repro-ovarian-menstrual-cycle',
      'abct2326-repro-fertilization-implantation', 'abct2326-repro-placenta-parturition',
    ],
    8: ['abct2326-endocrine-delivery', 'abct2326-endocrine-receptors', 'abct2326-endocrine-second-messengers'],
    9: ['abct2326-nervous-divisions', 'abct2326-synapse-drug-action'],
    11: ['abct2326-muscle-types', 'abct2326-muscle-action', 'abct2326-nmj-coupling'],
    12: [
      'abct2326-crossbridge-cycle', 'abct2326-fibre-types-fuel',
      'abct2326-spindle-golgi', 'abct2326-msk-immune-overview',
    ],
    13: [
      'abct2326-innate-adaptive', 'abct2326-complement', 'abct2326-mhc-costimulation',
      'abct2326-innate-mechanisms', 'abct2326-inflammation-fever',
      'abct2326-t-cell-types', 'abct2326-acquired-immunity', 'abct2326-immune-adaptive',
    ],
  },
  HTI17103: {
    1: ['hti17103-what-is-radiography', 'hti17103-subject-2026', 'hti17103-department-and-request'],
    2: [
      'hti17103-ionizing-vs-nonionizing', 'hti17103-modality-detail',
      'hti17103-modality-choice', 'hti17103-modality-best-use',
    ],
    3: ['hti17103-radiation-therapy'],
    4: ['hti17103-radioprotection'],
  },
  APSS1A08: {
    1: [
      'apss1a08-sociological-perspective', 'apss1a08-personal-social-education',
      'apss1a08-global-perspective', 'apss1a08-research-to-change',
      'apss1a08-marx-weber-change',
    ],
    2: [], 3: [], 4: [], 5: [], 7: [], 8: [], 10: [], 11: [],
  },
  DSAI1202: {
    1: ['dsai1202-ai-in-healthcare', 'dsai1202-ai-literacy'],
    2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
  },
};

/* A syllabus title is not a lesson. These are the weeks whose current
   syllabus is known but whose official teaching notes have not been supplied.
   Keeping them beside the map makes incompleteness visible and testable. */
export const WEEK_GAPS = {
  APSS1A08: {
    2: 'T02A — Functionalist perspectives, social institutions and conflict perspectives: official lecture notes not supplied.',
    3: 'T02B — Modern Contemporary Theorists: official lecture notes not supplied.',
    4: 'T03 — Socialization: official lecture notes not supplied.',
    5: 'T04 — Social Interaction: official lecture notes not supplied.',
    7: 'T05 — Social Stratification and Social Class: official lecture notes not supplied.',
    8: 'T06 — Sexuality and Society: official lecture notes not supplied.',
    10: 'T07 — Gender Stratification: official lecture notes not supplied.',
    11: 'T08 — Deviance: official lecture notes not supplied.',
  },
  DSAI1202: {
    2: 'AI Overview: only the Week 1 overview deck is supplied; the Week 2 teaching notes are missing.',
    3: 'Generative AI and chatbots: official Week 3 teaching notes not supplied.',
    4: 'Generative-AI class exercise: official Week 4 teaching notes not supplied.',
    5: 'Industrial Centre Visit 1 / Machine Learning I: official teaching notes not supplied.',
    6: 'Industrial Centre Visit 1 / Machine Learning I: the repeated lecture’s official teaching notes are not supplied.',
    7: 'Machine Learning II: official Week 7 teaching notes not supplied.',
    8: 'Deep Learning: official Week 8 teaching notes not supplied.',
    9: 'Data Analytics and Visualization: official Week 9 teaching notes not supplied.',
    10: 'Industrial Centre Visit 2 / Societal Implications of AIDA: official teaching notes not supplied.',
    11: 'Industrial Centre Visit 2 / Societal Implications of AIDA: the repeated lecture’s official teaching notes are not supplied.',
    12: 'Additional Topics (TBC) and Course Review: official Week 12 teaching notes not supplied.',
  },
};

/** The item ids to study for a subject in a given teaching week. */
export function studyFor(subject, week) {
  return ((WEEK_STUDY[subject] || {})[week]) || null;
}

/** Why a syllabus week deliberately has no source-backed lesson yet. */
export function gapFor(subject, week) {
  return ((WEEK_GAPS[subject] || {})[week]) || '';
}

export const SESSIONS = [
  /* ---------------- HSS2011 — week-numbered, no times published --------- */
  S({ subject: 'HSS2011', week: 1, kind: 'lecture', ...hssLec(1), title: 'Subject Orientation & Introduction + Musculoskeletal System', module: 1, unit: 'hss.term', teacher: 'BL', dur: '2 hours', note: 'Half orientation, half the start of Module 1. What the subject IS and how it is marked now lives on the Syllabus tab, not in a lesson.' }),
  S({ subject: 'HSS2011', week: 1, kind: 'activity', ...hssTut(1), title: 'Ice-breaking Session', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 2, kind: 'lecture', ...hssLec(2), title: 'Upper Limbs', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 2, kind: 'activity', ...hssTut(2), title: 'Introduction to body tissues', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 3, kind: 'lecture', ...hssLec(3), title: 'Lower Limbs', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 3, kind: 'activity', ...hssTut(3), title: 'In-class exercise (Module 1)', module: 1, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 4, kind: 'lecture', ...hssLec(4), title: 'Head & Neck', module: 1, unit: 'hss.osteo', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 4, kind: 'activity', ...hssTut(4), title: 'In-class exercise (Module 1)', module: 1, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 5, kind: 'lecture', ...hssLec(5), title: 'Nervous System', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 5, kind: 'consultation', ...hssTut(5), title: 'Individual consultation', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 6, kind: 'lecture', ...hssLec(6), title: 'Brain and Cranial Nerve', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 6, kind: 'activity', ...hssTut(6), title: 'In-class exercise (Module 2)', module: 2, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 7, kind: 'lecture', ...hssLec(7), title: 'Special Senses', module: 2, unit: 'hss.m2', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 7, kind: 'consultation', ...hssTut(7), title: 'Individual consultation', dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 8, kind: 'lecture', ...hssLec(8), title: 'Cardiovascular System', module: 3, unit: 'hss.m1', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 8, kind: 'activity', ...hssTut(8), title: 'In-class exercise (Module 2)', module: 2, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 9, kind: 'lecture', ...hssLec(9), title: 'Respiratory System', module: 3, unit: 'hss.m1', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 9, kind: 'activity', ...hssTut(9), title: 'In-class exercise (Module 3)', module: 3, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 10, kind: 'lecture', ...hssLec(10), title: 'Regional Anatomy of the Thorax, Abdomen & Pelvis', module: 3, unit: 'hss.m1', dur: '2 hours', note: 'The schedule marks this week Module Three + Four.' }),
  S({ subject: 'HSS2011', week: 10, kind: 'activity', ...hssTut(10), title: 'In-class exercise (Module 3)', module: 3, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 11, kind: 'lecture', ...hssLec(11), title: 'Digestive System', module: 4, unit: 'hss.m3', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 11, kind: 'activity', ...hssTut(11), title: 'In-class exercise (Module 4)', module: 4, dur: '1 hour' }),
  S({ subject: 'HSS2011', week: 12, kind: 'lecture', ...hssLec(12), title: 'Urogenital System', module: 4, unit: 'hss.m3', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 12, kind: 'activity', ...hssTut(12), title: 'In-class exercise (Module 4)', module: 4, dur: '1 hour' }),
  /* The Wednesday slot is booked in week 13 too, and the published schedule
     names nothing for it — every other week it says what the hour is for.
     Carried because a booked hour you did not know about is the expensive
     direction to be wrong in; the title says what is known and no more. */
  S({ subject: 'HSS2011', week: 13, kind: 'activity', ...hssTut(13), title: 'Tutorial slot booked — topic not published', dur: '1 hour', note: 'From the university timetable only. The HSS2011 schedule lists no week 13 tutorial.', src: { ref: 'cal.2026', location: 'HSS2011 TUT, Wed 25 Nov' } }),
  /*
   * The four 2% exercises. The 8% is not one thing due at the end — it is
   * four deadlines, all Sunday 23:59, and they are the only hard dates
   * HSS2011 publishes apart from the test.
   */
  S({ subject: 'HSS2011', week: 2, kind: 'assessment', on: [2026, 8, 13], at: [23, 59, 23, 59], title: 'Revision exercise 1 — 2%', weight: 2, note: 'Individual, online, open book. Deadline Sun 13 Sep 2026 23:59.' }),
  S({ subject: 'HSS2011', week: 5, kind: 'assessment', on: [2026, 9, 4], at: [23, 59, 23, 59], title: 'Revision exercise 2 — 2%', weight: 2, note: 'Individual, online, open book. Deadline Sun 4 Oct 2026 23:59.' }),
  S({ subject: 'HSS2011', week: 8, kind: 'assessment', on: [2026, 9, 25], at: [23, 59, 23, 59], title: 'Revision exercise 3 — 2%', weight: 2, note: 'Individual, online, open book. Deadline Sun 25 Oct 2026 23:59.' }),
  S({ subject: 'HSS2011', week: 10, kind: 'assessment', on: [2026, 10, 8], at: [23, 59, 23, 59], title: 'Revision exercise 4 — 2%', weight: 2, note: 'Individual, online, open book. Deadline Sun 8 Nov 2026 23:59.' }),
  S({ subject: 'HSS2011', week: 13, kind: 'revision', ...hssLec(13), title: 'Online revision', dur: '2 hours' }),
  S({ subject: 'HSS2011', week: 13, kind: 'assessment', on: [2026, 10, 28], at: [16, 0, 17, 30], title: 'Closed-book test (individual) — 60%', weight: 60, note: 'Covers Lectures 1–12.' }),

  /* ---------------- ABCT2326 — Opt & Rad Group 4 (1107 & 1111) ---------- */
  /* Lecture: Wed 13:30–15:20, V322. Tutorial: Wed 17:30–18:20. Lab: Thu 13:30–15:20, Y719. */
  S({ subject: 'ABCT2326', week: 1, kind: 'lecture', on: [2026, 8, 2], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 1 — Cell / Body', teacher: 'CC', unit: 'phys.cells' }),
  S({ subject: 'ABCT2326', week: 1, kind: 'tutorial', on: [2026, 8, 2], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Cell & Body', unit: 'phys.cells', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'lecture', on: [2026, 8, 9], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 2 — Cardiovascular System', teacher: 'CC', unit: 'phys.cvs' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'tutorial', on: [2026, 8, 9], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — CVS', unit: 'phys.cvs', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 2, kind: 'lab', on: [2026, 8, 10], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'lecture', on: [2026, 8, 16], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 3 — Respiratory System', teacher: 'CC', unit: 'phys.resp' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'tutorial', on: [2026, 8, 16], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Respiration', unit: 'phys.resp', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 3, kind: 'lab', on: [2026, 8, 17], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'lecture', on: [2026, 8, 23], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 4 — Digestive System', teacher: 'CC', unit: 'phys.dig' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'tutorial', on: [2026, 8, 23], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Digestion', unit: 'phys.dig', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 4, kind: 'lab', on: [2026, 8, 24], at: [13, 30, 15, 20], room: 'Y719', title: 'CVS Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 5, kind: 'lecture', on: [2026, 8, 30], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 5 — Renal System', teacher: 'CC', unit: 'phys.renal' }),
  S({ subject: 'ABCT2326', week: 5, kind: 'tutorial', on: [2026, 8, 30], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Renal', unit: 'phys.renal', groupOf: 'physTutorial' }),
  /* CONFLICT. The teaching schedule cancels this lab for the holiday; the
     calendar still books Y719 at the usual time. The document decides what
     happens, so it stays cancelled here — but the room is booked, so this is
     worth checking rather than assuming. Same pattern in week 10 below. */
  S({ subject: 'ABCT2326', week: 5, kind: 'none', on: [2026, 9, 1], title: 'Holiday — no lab', note: 'The teaching schedule cancels it for National Day. The university timetable still shows the Y719 slot at 13:30 — confirm before skipping.' }),
  S({ subject: 'ABCT2326', week: 6, kind: 'assessment', on: [2026, 9, 7], at: [13, 30, 15, 20], room: 'V322', title: 'QUIZ — Lectures 1–5', teacher: 'CC', note: 'Counts towards the 35% quiz component.' }),
  /* Same case as week 9 below: the timetable books the tutorial hour, the
     teaching schedule names no tutorial in the quiz week. */
  S({ subject: 'ABCT2326', week: 6, kind: 'tutorial', on: [2026, 9, 7], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — slot booked, topic not published', groupOf: 'physTutorial', note: 'From the university timetable only. The teaching schedule lists no tutorial in week 6, the quiz week.', src: { ref: 'cal.2026', location: 'ABCT2326 TUT, Wed 7 Oct' } }),
  S({ subject: 'ABCT2326', week: 6, kind: 'lab', on: [2026, 9, 8], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'lecture', on: [2026, 9, 14], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 6 — Reproductive System', teacher: 'CY', unit: 'phys.repro' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'tutorial', on: [2026, 9, 14], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Reproduction', unit: 'phys.repro', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 7, kind: 'lab', on: [2026, 9, 15], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'lecture', on: [2026, 9, 21], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 7 — Endocrine System', teacher: 'CY', unit: 'phys.endo' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'tutorial', on: [2026, 9, 21], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Endocrine', unit: 'phys.endo', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 8, kind: 'lab', on: [2026, 9, 22], at: [13, 30, 15, 20], room: 'Y719', title: 'Respiratory Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 9, kind: 'lecture', on: [2026, 9, 28], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 8 — Nervous System', teacher: 'CY', unit: 'phys.nerv' }),
  /* Not in the teaching schedule; booked in the timetable. Listed because a
     tutorial you did not know about is the expensive direction to be wrong in. */
  S({ subject: 'ABCT2326', week: 9, kind: 'tutorial', on: [2026, 9, 28], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — slot booked, topic not published', groupOf: 'physTutorial', note: 'From the university timetable only. The teaching schedule lists no tutorial in week 9.', src: { ref: 'cal.2026', location: 'ABCT2326 TUT, Wed 28 Oct' } }),
  S({ subject: 'ABCT2326', week: 9, kind: 'lab', on: [2026, 9, 29], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '1', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 10, kind: 'none', on: [2026, 10, 4], title: 'No class this week', note: 'CONFLICT: the teaching schedule says no class; the university timetable books the lecture (Wed 13:30 V322), the tutorial (Wed 17:30) and the lab (Thu 5 Nov 13:30 Y719) as normal. Confirm before skipping the week.' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'lecture', on: [2026, 10, 11], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 9 — Nerve / Musculoskeletal', teacher: 'CY', unit: 'phys.msk' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'tutorial', on: [2026, 10, 11], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Nerve', unit: 'phys.nerv', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 11, kind: 'lab', on: [2026, 10, 12], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '2', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'lecture', on: [2026, 10, 18], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 10 — Musculoskeletal / Immune', teacher: 'CY', unit: 'phys.msk' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'tutorial', on: [2026, 10, 18], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Muscle', unit: 'phys.msk', groupOf: 'physTutorial' }),
  S({ subject: 'ABCT2326', week: 12, kind: 'lab', on: [2026, 10, 19], at: [13, 30, 15, 20], room: 'Y719', title: 'Digestive Lab', group: '3', groupOf: 'physLab' }),
  S({ subject: 'ABCT2326', week: 13, kind: 'lecture', on: [2026, 10, 25], at: [13, 30, 15, 20], room: 'V322', title: 'Lecture 11 — Immune System', teacher: 'CY', unit: 'phys.imm' }),
  S({ subject: 'ABCT2326', week: 13, kind: 'tutorial', on: [2026, 10, 25], at: [17, 30, 18, 20], room: 'Y306', title: 'Tutorial — Immune', unit: 'phys.imm', groupOf: 'physTutorial' }),
  /* A fourth lab the teaching schedule does not carry. Its rotation lists
     three topics across groups 1/2/3 and stops; the timetable books Y719 at
     the usual Thursday hour one more time. Whose lab group is not derivable. */
  S({ subject: 'ABCT2326', week: 13, kind: 'lab', on: [2026, 10, 26], at: [13, 30, 15, 20], room: 'Y719', title: 'Lab — slot booked, topic not published', groupOf: 'physLab', note: 'From the university timetable only. The teaching schedule’s lab rotation ends at week 12.', src: { ref: 'cal.2026', location: 'ABCT2326 LAB, Thu 26 Nov' } }),

  /* ---------------- HTI17103 — the real 2026 schedule ------------------- */
  S({ subject: 'HTI17103', week: 1, kind: 'lecture', on: [2026, 7, 31], at: [9, 30, 11, 20], room: 'GH201', title: 'About this subject; Introduction — Radiographer-to-be', teacher: 'LTL', unit: 'hti.subject', note: 'The teaching schedule puts this in HJ202; the calendar books GH201. Room from the calendar, which is the booking.' }),
  S({ subject: 'HTI17103', week: 2, kind: 'lecture', on: [2026, 8, 10], at: [9, 30, 11, 20], room: 'GH201', title: 'Medical Imaging Modalities and Instruments', teacher: 'LTL', unit: 'hti.modalities' }),
  S({ subject: 'HTI17103', week: 3, kind: 'lecture', on: [2026, 8, 17], at: [9, 30, 11, 20], room: 'GH201', title: 'Introduction — Radiotherapist-to-be', teacher: 'VL', unit: 'hti.rt' }),
  S({ subject: 'HTI17103', week: 4, kind: 'lecture', on: [2026, 8, 24], at: [9, 30, 11, 20], room: 'GH201', title: 'Basic Radiation Protection', teacher: 'LTL', unit: 'hti.protect' }),
  S({ subject: 'HTI17103', week: 5, kind: 'lecture', on: [2026, 8, 28], at: [10, 30, 12, 20], room: 'HJ305', title: 'MI vs. RT — Grand Prix of Streams', teacher: 'LTL', unit: 'hti.modalities' }),
  /* Two whole days, not one. The teaching schedule says Oct 5–6; the calendar
     books each of those days as two blocks, 08:30–12:20 and 13:30–18:20, which
     is where the subject's 12 observation contact hours actually go. */
  S({ subject: 'HTI17103', week: 6, kind: 'observation', on: [2026, 9, 5], at: [8, 30, 18, 20], title: 'Observation Day 1 (HA Hospitals)', teacher: 'CE', room: 'TBA', note: 'Mon 5 Oct. Two blocks: 08:30–12:20 and 13:30–18:20.' }),
  S({ subject: 'HTI17103', week: 6, kind: 'observation', on: [2026, 9, 6], at: [8, 30, 18, 20], title: 'Observation Day 2 (HA Hospitals)', teacher: 'CE', room: 'TBA', note: 'Tue 6 Oct. Two blocks: 08:30–12:20 and 13:30–18:20. Together these are 12 of the subject’s 26 contact hours.' }),
  S({ subject: 'HTI17103', week: 7, kind: 'seminar', on: [2026, 9, 15], at: [9, 30, 11, 20], room: 'TU201', title: 'Seminar I — Group Presentation', teacher: 'LTL', note: '10 minutes plus 5 minutes Q&A. Everyone in the group must speak.' }),
  S({ subject: 'HTI17103', week: 8, kind: 'seminar', on: [2026, 9, 22], at: [9, 30, 11, 20], room: 'TU201', title: 'Seminar II — Group Presentation', teacher: 'LTL', note: '10 minutes plus 5 minutes Q&A.' }),

  /* ---------------- The other three subjects ---------------------------- *
   * APSS1A08 and DSAI1202 now have current source files, so their real topic
   * titles and assessment deadlines replace the old anonymous recurring
   * rows. Only weeks with actual supplied teaching content get a lesson link;
   * the remaining named topics point at WEEK_GAPS above. LEI1101 still has a
   * calendar slot only and claims no course content.
   *
   * The Friday 12:30 seminar used to be labelled "LEI1000 SEM — LCR Subject"
   * in the calendar — the generic placeholder a Language & Communication
   * Requirement slot gets before the subject is named — and filing it under
   * LEI1101 was an assumption flagged here as one. The calendar has since
   * been updated and now names it: "LEI1101 SEM003 — AI as a tool of
   * learning", in QR 514. The assumption was right, and is no longer an
   * assumption.
   * --------------------------------------------------------------------- */
  ...weekly('DSAI1202', 'lecture', 3, [8, 30, 10, 20], 'TU201', 'Lecture', {
    1: { title: 'Course Overview', unit: 'dsai.overview', noStudy: false, src: { ref: 'dsai.w1', location: 'Slide 3 Week 1' } },
    2: { title: 'AI Overview', src: { ref: 'dsai.w1', location: 'Slide 3 Week 2' } },
    3: { title: 'Generative AI and Chatbots', src: { ref: 'dsai.w1', location: 'Slide 3 Week 3' } },
    4: { title: 'Generative-AI Class Exercise', src: { ref: 'dsai.w1', location: 'Slide 3 Week 4' } },
    5: { title: 'IC Visit 1 / Machine Learning I', src: { ref: 'dsai.w1', location: 'Slides 3 and 6 Week 5' } },
    6: { title: 'IC Visit 1 / Machine Learning I', src: { ref: 'dsai.w1', location: 'Slides 3 and 6 Week 6' } },
    7: { title: 'Machine Learning II', src: { ref: 'dsai.w1', location: 'Slide 3 Week 7' } },
    8: { title: 'Deep Learning', src: { ref: 'dsai.w1', location: 'Slide 3 Week 8' } },
    9: { title: 'Data Analytics and Visualization', src: { ref: 'dsai.w1', location: 'Slide 3 Week 9' } },
    10: { title: 'IC Visit 2 / Societal Implications of AIDA', src: { ref: 'dsai.w1', location: 'Slides 3 and 6 Week 10' } },
    11: { title: 'IC Visit 2 / Societal Implications of AIDA', src: { ref: 'dsai.w1', location: 'Slides 3 and 6 Week 11' } },
    12: { title: 'Additional Topics (TBC) and Course Review', src: { ref: 'dsai.w1', location: 'Slide 3 Week 12' } },
    13: { kind: 'assessment', title: 'Final Test — 60%', note: 'Closed-book, paper-based and invigilated; about 40 minutes.', src: { ref: 'dsai.w1', location: 'Slides 3, 4 and 8 Week 13 final test' } },
  }),

  /* APSS1A08 — the current syllabus gives the whole thirteen-week sequence. */
  S({ subject: 'APSS1A08', week: 1, kind: 'lecture', on: dayOf(1, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'Course Introduction + T01: Introduction to Sociology', unit: 'soc.t01', src: { ref: 'soc.syllabus.2026', location: 'pp1–2 Week 1' } }),
  S({ subject: 'APSS1A08', week: 2, kind: 'lecture', on: dayOf(2, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T02A: Functionalism, social institutions and conflict perspectives', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 2' } }),
  S({ subject: 'APSS1A08', week: 3, kind: 'lecture', on: dayOf(3, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T02B: Modern Contemporary Theorists', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 3' } }),
  S({ subject: 'APSS1A08', week: 4, kind: 'lecture', on: dayOf(4, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T03: Socialization', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 4' } }),
  S({ subject: 'APSS1A08', week: 5, kind: 'lecture', on: dayOf(5, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T04: Social Interaction', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 5' } }),
  S({ subject: 'APSS1A08', week: 6, kind: 'consultation', on: dayOf(6, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'Consultation Session 1', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 6' } }),
  S({ subject: 'APSS1A08', week: 7, kind: 'lecture', on: dayOf(7, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T05: Social Stratification and Social Class', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 7' } }),
  S({ subject: 'APSS1A08', week: 7, kind: 'assessment', on: [2026, 9, 17], at: [23, 59, 23, 59], title: 'Reflective Paper due — 20%', weight: 20, note: 'Submit through Blackboard as an MS Word file. Generative AI is not allowed.', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'pp2 and 4 deadline and AI policy' } }),
  S({ subject: 'APSS1A08', week: 8, kind: 'lecture', on: dayOf(8, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T06: Sexuality and Society', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 8' } }),
  S({ subject: 'APSS1A08', week: 9, kind: 'revision', on: dayOf(9, 5), title: 'Self-study Week', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 9' } }),
  S({ subject: 'APSS1A08', week: 10, kind: 'lecture', on: dayOf(10, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T07: Gender Stratification', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 10' } }),
  S({ subject: 'APSS1A08', week: 11, kind: 'lecture', on: dayOf(11, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'T08: Deviance', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 11' } }),
  S({ subject: 'APSS1A08', week: 12, kind: 'consultation', on: dayOf(12, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'Consultation Session 2 — Mini Project', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'p2 Week 12' } }),
  S({ subject: 'APSS1A08', week: 13, kind: 'assessment', on: dayOf(13, 5), at: [8, 30, 11, 20], room: 'SHA030', title: 'End-of-term Quiz — 50%', weight: 50, note: 'Generative AI is not allowed.', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'pp2 and 4 Week 13 quiz' } }),
  S({ subject: 'APSS1A08', week: 13, kind: 'assessment', on: [2026, 10, 28], at: [23, 59, 23, 59], title: 'Mini Project due — 20%', weight: 20, note: 'Submit through Blackboard as an MS Word file. Generative AI is allowed.', noStudy: true, src: { ref: 'soc.syllabus.2026', location: 'pp2 and 4 deadline and AI policy' } }),
  S({ subject: 'APSS1A08', week: 14, kind: 'assessment', on: [2026, 11, 5], at: [23, 59, 23, 59], title: 'Quiz paper submission deadline', note: 'The syllabus places this deadline one week after the Week 13 in-class quiz.', noStudy: true, outsideTeachingTerm: true, src: { ref: 'soc.syllabus.2026', location: 'p4 quiz paper submission deadline' } }),

  /* DSAI1202 assessment deadlines stated by teaching week in the overview. */
  S({ subject: 'DSAI1202', week: 3, kind: 'assessment', on: [2026, 8, 19], at: [23, 59, 23, 59], title: 'Group Project formation due', noStudy: true, src: { ref: 'dsai.w1', location: 'Slide 4 Week 3 Saturday deadline' } }),
  S({ subject: 'DSAI1202', week: 7, kind: 'assessment', key: 'aida-test', on: [2026, 9, 17], at: [23, 59, 23, 59], title: 'AIDA e-module online test due — 4%', weight: 4, noStudy: true, src: { ref: 'dsai.w1', location: 'Slide 4 Week 7 Saturday deadline' } }),
  S({ subject: 'DSAI1202', week: 7, kind: 'assessment', key: 'genai-exercise', on: [2026, 9, 17], at: [23, 59, 23, 59], title: 'Generative-AI Class Exercise due — 6%', weight: 6, noStudy: true, src: { ref: 'dsai.w1', location: 'Slide 4 Week 7 Saturday deadline' } }),
  S({ subject: 'DSAI1202', week: 11, kind: 'assessment', key: 'group-project', on: [2026, 10, 14], at: [23, 59, 23, 59], title: 'Group Project final submission due — 25%', weight: 25, noStudy: true, src: { ref: 'dsai.w1', location: 'Slide 4 Week 11 Saturday deadline' } }),
  S({ subject: 'DSAI1202', week: 11, kind: 'assessment', key: 'ic-feedback', on: [2026, 10, 14], at: [23, 59, 23, 59], title: 'IC Visit Feedback due', noStudy: true, src: { ref: 'dsai.w1', location: 'Slide 4 Week 11 Saturday deadline' } }),
  /* Weeks 2–13 run to 15:30. Week 1 alone ends 15:20 — not a transcription
     slip; the timetable really does book the first seminar ten minutes short. */
  ...weekly('LEI1101', 'seminar', 5, [12, 30, 15, 30], 'QR 514', 'LCR seminar', {
    1: { at: [12, 30, 15, 20] },
  }),
  /* Four extra DSAI1202 sessions the calendar calls "Special Class". Not a
     weekly pattern, so listed — and not one room block either: the October
     pair adds U301-Z3 to the three the November pair uses. */
  ...[
    [6, [2026, 9, 8], 'U301-Z3 / W311a / W402-Z2 / W402a'],
    [7, [2026, 9, 15], 'U301-Z3 / W311a / W402-Z2 / W402a'],
    [11, [2026, 10, 12], 'W311a / W402-Z2 / W402a'],
    [12, [2026, 10, 19], 'W311a / W402-Z2 / W402a'],
  ].map(
    ([week, on, room]) => S({
      subject: 'DSAI1202', week, kind: 'lab', on, at: [16, 30, 18, 20],
      room, title: 'Special class', noStudy: true,
      src: { ref: 'cal.2026', location: 'DSAI1202 LEC (Special Class)' },
    })),
];

/* A stable id per session, for storing attendance against. Derived rather
   than written out, so a row cannot be given the same id twice by hand. */
for (const s of SESSIONS) {
  const when = s.on ? s.on.join('-') : `w${s.week}`;
  s.id = `${s.subject}:${when}:${s.kind}${s.group ? ':' + s.group : ''}:${s.at ? s.at[0] : 'x'}${s.key ? ':' + s.key : ''}`;
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
  { subject: 'HSS2011', ref: 'hss.sched.2026b', what: 'Schedule for Learning & Teaching Activities on Canvas — assessment split and Important Dates' },
  { subject: 'HSS2011', ref: 'hss.w1.2026', what: 'Week 1 orientation deck — the assessment weights' },
  { subject: 'ABCT2326', ref: 'phys.sdf', what: 'Subject description form — objective, learning outcomes, syllabus, study effort, textbook' },
  { subject: 'ABCT2326', ref: 'phys.sched.2026', what: 'Teaching schedule 2026, Opt & Rad Group 4 — every date, time, room, group and the 35/15 split' },
  { subject: 'ABCT2326', ref: 'phys.overview.2026', what: 'Current Group 4 course overview — ten lecture topics, one 35% quiz, three 5% lab reports and the 50% final exam' },
  { subject: 'HTI17103', ref: 'hti.sched.2026', what: 'Teaching schedule 2026 — all eight sessions and both assessments' },
  { subject: 'APSS1A08', ref: 'soc.syllabus.2026', what: 'Current 2026/27 syllabus — objectives, all thirteen weeks, assessments, AI permissions and deadlines' },
  { subject: 'DSAI1202', ref: 'dsai.w1', what: 'Current Week 1 overview — tentative weekly sequence, assessment schedule, course scope and generative-AI policy' },
  /* Not a document, and deliberately not in SOURCE_FILES: source-check.mjs
     verifies that every SOURCE_FILES entry is a real file on the shared
     drive, and this one is a calendar. It is labelled here instead so the
     view can name it honestly rather than printing a bare ref. */
  { subject: 'All six', ref: 'cal.2026', label: 'PolyU timetable, via the student’s Google Calendar', what: 'Every date, time and room — including the HSS2011 times no published schedule gives and the LEI1101 slot whose syllabus has not been supplied. Re-checked event by event on 4 Sep 2026.' },
];
