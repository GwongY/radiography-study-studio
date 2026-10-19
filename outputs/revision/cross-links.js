/*
 * Cross-subject links — a box in one subject that is about the same thing as a box
 * in the other (owner, 19 Oct 2026). Shown in the notes panel only, once the far
 * end's week is reached (rules.js crossFor); never drawn on the Map or in Brain 3D.
 *
 *   { a: ['ABCT2326', id], b: ['HSS2011', id], why: 'the slide\'s words', src: [sourceId, page], match: 'words on that page' }
 *
 * work/revision-check.mjs: both ends exist, the subjects differ, no pair twice, `match` on the page.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md section 4.6.
 */
export const CROSS = [];
