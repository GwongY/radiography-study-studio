/*
 * Revision registry — which subjects have a revision map, and the tours that
 * walk it.
 *
 * Adding a subject is a new data file (nodes, edges, tree, threads, tables,
 * decoder) made the way hss2011-*.js were, plus one entry here, and its depth is
 * leaf rows merged here (outputs/revision/leaves.js). A subject also lists its
 * `systems` (legend label, legend colour, Map shade, body), its `hubOrder` and
 * its `copy`, and a subject written from scratch sets `sourced: true` and lists
 * its `decks`. No view code knows which subject it is showing.
 */
import * as hss2011 from './hss2011-data.js';
import { linkThreads, mergeLeaves, threadTour, topicNodes } from './leaves.js';
import * as hss2011W1 from './hss2011-leaves-w1.js';
import * as hss2011W2 from './hss2011-leaves-w2.js';
import * as hss2011W3 from './hss2011-leaves-w3.js';
import * as hss2011W4 from './hss2011-leaves-w4.js';
import * as hss2011W5 from './hss2011-leaves-w5.js';
import * as hss2011W6 from './hss2011-leaves-w6.js';
import * as hss2011W7 from './hss2011-leaves-w7.js';
import * as hss2011W8 from './hss2011-leaves-w8.js';
import * as hss2011W9 from './hss2011-leaves-w9.js';
import { THREADS_HTML } from './hss2011-threads.js';
import { TABLES_HTML } from './hss2011-tables.js';
import { DECODER_HTML, SOURCES_HTML } from './hss2011-decoder.js';
import { SYSORDER } from './hub.js';
import { keyWords, renderDecoder, renderTables, renderThreads } from './fragments.js';
import { decompose } from '../wordparts.js?v=3';
import * as abct from './abct2326-topics.js';
import * as abctW1 from './abct2326-leaves-w1.js';
import * as abctTis from './abct2326-leaves-tissues.js';
import * as abctW2 from './abct2326-leaves-w2.js';
import * as abctW3 from './abct2326-leaves-w3.js';
import * as abctW4 from './abct2326-leaves-w4.js';
import * as abctW5 from './abct2326-leaves-w5.js';
import * as abctW7 from './abct2326-leaves-w7.js';
import * as abctW8 from './abct2326-leaves-w8.js';
import * as abctW9 from './abct2326-leaves-w9.js';
import * as abctW11 from './abct2326-leaves-w11.js';
import * as abctW12 from './abct2326-leaves-w12.js';
import * as abctFrag from './abct2326-fragments.js';

/* Leaf rows, week by week (outputs/revision/leaves.js). */
const HSS2011_ROWS = [...hss2011W1.ROWS, ...hss2011W2.ROWS, ...hss2011W3.ROWS, ...hss2011W4.ROWS, ...hss2011W5.ROWS, ...hss2011W6.ROWS, ...hss2011W7.ROWS, ...hss2011W8.ROWS, ...hss2011W9.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W1.SOURCES, ...hss2011W2.SOURCES, ...hss2011W3.SOURCES, ...hss2011W4.SOURCES, ...hss2011W5.SOURCES, ...hss2011W6.SOURCES, ...hss2011W7.SOURCES, ...hss2011W8.SOURCES, ...hss2011W9.SOURCES };

/* Weeks 8 and 9 each bring new headings and one new branch; the earlier weeks' headings stay as they are. */
const HSS2011_ALL = {
  NODES: [...hss2011.NODES, ...hss2011W8.TOPICS, ...hss2011W9.TOPICS],
  EDGES: [...hss2011.EDGES, ...hss2011W8.EDGES, ...hss2011W9.EDGES],
  TREE: { ...hss2011.TREE, kids: [...hss2011.TREE.kids, hss2011W8.BRANCH, hss2011W9.BRANCH] },
};

/* Colour groups. col = legend, notes tag and Brain 3D; map = the Map's own shade. The HSS2011 values are app.css's
   (--rv-c-* line 1409, --c-* line 1441), so anatomy looks as it did. Tissues & cells is not listed: those rows are
   physiology's (merged into Lecture 1, owner 19 Oct 2026). A shared colour across subjects means the
   same body system (rules.js checkSystems). */
const HSS2011_SYSTEMS = [
  { key: 'skel', label: 'Skeleton & joints', col: '#d1a94f', map: '#e2b65a' },
  { key: 'musc', label: 'Muscles', col: '#e3786b', map: '#f0806f', body: 'muscle' },
  { key: 'pns', label: 'Peripheral nerves', col: '#6fa8e8', map: '#78b2f2' },
  { key: 'cns', label: 'Brain & spinal cord', col: '#ae98ec', map: '#b9a1f5' },
  { key: 'sense', label: 'Senses & autonomic', col: '#55c4a4', map: '#5ed0ae' },
  { key: 'cv', label: 'Heart & vessels', col: '#e879c6', map: '#ee86cc', body: 'heart' },
  { key: 'resp', label: 'Airways & lungs', col: '#4fd6e6', map: '#62dcea', body: 'lungs' },
];

/* Physiology's groups, one per lecture system (spec 4.3). Cells, heart and muscle share anatomy's colour on purpose:
   same body system (owner, 19 Oct 2026). */
const ABCT2326_SYSTEMS = [
  { key: 'p_cell', label: 'Cells & tissues', col: '#9fb2bb', body: 'cells' },
  { key: 'p_cvs', label: 'Blood & heart', col: '#e879c6', body: 'heart' },
  { key: 'p_resp', label: 'Breathing', col: '#7dd3f0' },
  { key: 'p_gi', label: 'Digestion', col: '#c6d86b' },
  { key: 'p_renal', label: 'Kidney & urine', col: '#f2a65a' },
  { key: 'p_repro', label: 'Reproduction', col: '#b58cf0' },
  { key: 'p_endo', label: 'Hormones', col: '#f5e08a' },
  { key: 'p_nerve', label: 'Nerves', col: '#5b8def' },
  { key: 'p_musc', label: 'Muscle & bone', col: '#e3786b', body: 'muscle' },
  { key: 'p_immune', label: 'Immunity', col: '#4fd1b0' },
];

const ABCT2326_FILES = [abctW1, abctTis, abctW2, abctW3, abctW4, abctW5, abctW7, abctW8, abctW9, abctW11, abctW12];
const ABCT2326_ROWS = ABCT2326_FILES.flatMap((f) => f.ROWS);
const ABCT2326_SOURCES = Object.assign({ 'phys.ebook': 'Martini textbook' }, abct.SOURCES, ...ABCT2326_FILES.map((f) => f.SOURCES));
const ABCT2326_BASE = { NODES: topicNodes(abct.TOPICS, ABCT2326_SOURCES), EDGES: abct.EDGES, TREE: abct.TREE };
/* Every box a thread step names offers that thread in its notes; a thread with no hand-made tour gets one from its steps. */
const ABCT2326_MERGED = mergeLeaves(ABCT2326_BASE, ABCT2326_ROWS, ABCT2326_SOURCES);
const ABCT2326_DATA = { ...ABCT2326_MERGED, NODES: linkThreads(ABCT2326_MERGED.NODES, abctFrag.THREADS) };
const ABCT2326_TOURS = [...abctFrag.TOURS, ...abctFrag.THREADS.filter((t) => !abctFrag.TOURS.some((x) => x.th === t.id)).map((t) => threadTour(t, ABCT2326_MERGED))];

export const REVISION = {
  HSS2011: {
    id: 'HSS2011',
    label: 'HSS2011 Human Anatomy',
    data: mergeLeaves(HSS2011_ALL, HSS2011_ROWS, HSS2011_LEAF_SOURCES),
    rows: HSS2011_ROWS,
    threads: THREADS_HTML,
    tables: TABLES_HTML,
    decoder: DECODER_HTML,
    sources: SOURCES_HTML,
    /* Pathway tours for Brain 3D. `th` is the thread id whose title names it;
       each hop's caption is the link reason in EDGES, so no new facts. */
    tours: [
      { th: 't1', stops: ['cortexareas', 'tracts', 'spinalcord', 'spinalnerves', 'plexuses', 'synapse', 'motorunit', 'musclestruct', 'ul_muscles', 'joints'] },
      { th: 't2', stops: ['receptors', 'dermatomes', 'spinalnerves', 'spinalcord', 'reflexes', 'tracts', 'thalamus', 'cortexareas'] },
      { th: 't3', stops: ['orbit', 'extraocular', 'eye', 'visualpath', 'thalamus', 'cortexareas'] },
      { th: 't4', stops: ['ear_hearing', 'ear_balance', 'brainstem', 'cerebellum'] },
      { th: 't5', stops: ['taste', 'smell', 'limbic', 'hypothalamus'] },
      { th: 't6', stops: ['hypothalamus', 'brainstem', 'ans', 'symp', 'parasymp'] },
      { th: 't7', stops: ['cortexareas', 'brainstem', 'cranialnerves', 'headneck_muscles'] },
      { th: 't8', stops: ['ear_balance', 'cerebellum', 'basalnuclei', 'reticular', 'motorunit', 'trunk_muscles'] },
      { th: 't10', stops: ['musclestruct', 'nervestruct', 'meninges', 'csf', 'bbb'] },
    ],
    systems: HSS2011_SYSTEMS,
    hubOrder: SYSORDER.filter((k) => k !== 'tissue'),
    copy: { name: 'Anatomy', leafWords: 'single muscles, bones, joints and nerves', findHint: 'e.g. foramen, CN VII' },
  },
  ABCT2326: {
    id: 'ABCT2326',
    label: 'ABCT2326 Human Physiology',
    data: ABCT2326_DATA,
    rows: ABCT2326_ROWS,
    threads: renderThreads(abctFrag.THREADS, ABCT2326_SOURCES, abctFrag.THREADS_INTRO),
    tables: renderTables(abctFrag.TABLES, ABCT2326_SOURCES, abctFrag.TABLES_INTRO),
    decoder: renderDecoder(abctFrag.DECODER, decompose, abctFrag.DECODER_INTRO, keyWords(ABCT2326_DATA.NODES), ABCT2326_SOURCES),
    sources: abctFrag.SOURCES_HTML,
    fragmentData: { threads: abctFrag.THREADS, tables: abctFrag.TABLES, decoder: abctFrag.DECODER },
    tours: ABCT2326_TOURS,
    /* topics, topic links and fragment steps cite pages (work/revision-check.mjs) */
    sourced: true,
    /* The only sources a physiology row, topic or step may cite: the lecture decks in iCloud Human Physology
       (owner, 19 Oct 2026: no labs, no tutorials, no old decks), with the teaching weeks each was lectured in
       (outputs/schedule.js; a deck run over two lectures lists both, and its rows start at the first) and the
       Martini chapters it is built on (the only chapters a ★ fact may come from). The tissue tutorial is the one
       tutorial: filed with the physiology decks, merged into Lecture 1, week 1, by the owner's answer. */
    decks: {
      'phys.1.2026': { weeks: [1], ch: [1, 3, 4] },
      'hss.tut.tissues': { weeks: [1], ch: [4] },
      'phys.l2.2026': { weeks: [2], ch: [19, 20, 21] },
      'phys.l3.2026': { weeks: [3], ch: [23] },
      'phys.l4.2026': { weeks: [4], ch: [24] },
      'phys.l5.2026': { weeks: [5], ch: [26] },
      'phys.l6.2026': { weeks: [7], ch: [28, 29] },
      'phys.l7.2026': { weeks: [8], ch: [18] },
      'phys.l8.2026': { weeks: [9, 11], ch: [12] },
      'phys.l9.2026': { weeks: [11, 12], ch: [10] },
      'phys.10.2026': { weeks: [12, 13], ch: [22] },
    },
    systems: ABCT2326_SYSTEMS,
    hubOrder: ['p_cell', 'p_cvs', 'p_resp', 'p_gi', 'p_renal', 'p_repro', 'p_endo', 'p_nerve', 'p_musc', 'p_immune'],
    copy: { name: 'Physiology', leafWords: 'single cells, structures, substances and steps', findHint: 'e.g. renin, SA node' },
  },
};

/** The subject shown first. */
export const DEFAULT_SUBJECT = 'HSS2011';
