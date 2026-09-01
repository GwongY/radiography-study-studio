/*
 * APSS1A08 — limited coverage. The notices that say so, in the app, rather
 * than inventing a syllabus that was never supplied.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
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
