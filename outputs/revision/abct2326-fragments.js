/*
 * ABCT2326 Threads, Tables, Decoder and Brain 3D tours, as sourced data.
 * Rendered by outputs/revision/fragments.js; every step and table row cites a page
 * (work/revision-check.mjs holds `match` to it). Written by plan Task 21; the content moved
 * to abct2326-threads.js, abct2326-tables.js and abct2326-decoder.js in the 20 Oct 2026
 * completeness pass (docs/superpowers/notes/2026-10-20-physiology-gap-analysis.md).
 * A thread without a hand-written tour below gets one from its steps (registry.js).
 */
export { THREADS } from './abct2326-threads.js';
export { TABLES } from './abct2326-tables.js';
export { DECODER } from './abct2326-decoder.js';
export const THREADS_INTRO = 'Each thread follows one process across lectures and tags every step with the week it came from. A sentence from the Martini textbook chapter the lecture is built on, beyond the slides, carries its page. The 廣東話 line retells the thread in Cantonese and shows once every step is taught.';
export const TABLES_INTRO = 'Look-ups that tie the lectures together. Every row names the slide it comes from.';
export const DECODER_INTRO = 'Key words (hormones, enzymes, ions, transmitters and cells) with what the slide says about each, and long words split into their parts from the word-part list. Type in the box to filter.';

export const TOURS = [
  { th: 't1', stops: ['p_ventilation', 'p_gasex', 'p_o2', 'p_circuits'] },
  { th: 't2', stops: ['p_plasma', 'p_kidneyfn', 'p_raas', 'p_hypothal'] },
  { th: 't3', stops: ['p_feedback', 'p_respcontrol', 'p_raas', 'p_pit_feedback', 'p_parturition'] },
  { th: 't4', stops: ['p_oral', 'p_stomach', 'p_gastric_reg', 'p_pancreas', 'p_gallbladder', 'p_largeint'] },
  { th: 't5', stops: ['p_ap', 'p_synapses', 'p_ach', 'p_nmj', 'p_ecc', 'p_relax'] },
  { th: 't6', stops: ['p_barriers', 'p_phagocytes', 'p_complement', 'p_inflammation', 'p_fever', 'p_tcells', 'p_bcells'] },
];
export const SOURCES_HTML = '<p class="foot" style="margin-top:12px">Week sources: W1 cells and body organisation · W2 cardiovascular system · W3 respiratory system · W4 digestive system · W5 renal system · W7 reproductive system · W8 endocrine system · W9 nervous system · W11 muscle and bone · W12 immune system (2026 lecture decks). Textbook sentences: Martini, Fundamentals of Anatomy and Physiology.</p>';
