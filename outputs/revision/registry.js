/*
 * Revision registry — which subjects have a revision map, and the tours that
 * walk it.
 *
 * Adding a subject is a new data file (nodes, edges, tree, threads, tables,
 * decoder) made the way hss2011-*.js were, plus one entry here, and its depth is
 * leaf rows merged here (outputs/revision/leaves.js). No view code knows which
 * subject it is showing.
 */
import * as hss2011 from './hss2011-data.js';
import { dropSystem, mergeLeaves } from './leaves.js';
import * as hss2011W1 from './hss2011-leaves-w1.js';
import * as hss2011W2 from './hss2011-leaves-w2.js';
import * as hss2011W3 from './hss2011-leaves-w3.js';
import * as hss2011W4 from './hss2011-leaves-w4.js';
import * as hss2011W5 from './hss2011-leaves-w5.js';
import * as hss2011W6 from './hss2011-leaves-w6.js';
import * as hss2011W7 from './hss2011-leaves-w7.js';
import * as hss2011W8 from './hss2011-leaves-w8.js';
import { THREADS_HTML } from './hss2011-threads.js';
import { TABLES_HTML } from './hss2011-tables.js';
import { DECODER_HTML, SOURCES_HTML } from './hss2011-decoder.js';

/* Leaf rows, week by week (outputs/revision/leaves.js). */
const HSS2011_ROWS = [...hss2011W1.ROWS, ...hss2011W2.ROWS, ...hss2011W3.ROWS, ...hss2011W4.ROWS, ...hss2011W5.ROWS, ...hss2011W6.ROWS, ...hss2011W7.ROWS, ...hss2011W8.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W1.SOURCES, ...hss2011W2.SOURCES, ...hss2011W3.SOURCES, ...hss2011W4.SOURCES, ...hss2011W5.SOURCES, ...hss2011W6.SOURCES, ...hss2011W7.SOURCES, ...hss2011W8.SOURCES };

/* Week 8 brings new headings and one new branch; the earlier weeks' headings stay as they are. */
const HSS2011_ALL = {
  NODES: [...hss2011.NODES, ...hss2011W8.TOPICS],
  EDGES: [...hss2011.EDGES, ...hss2011W8.EDGES],
  TREE: { ...hss2011.TREE, kids: [...hss2011.TREE.kids, hss2011W8.BRANCH] },
};

/* The Tissues & cells notes are physiology's (the owner moved the file back to the physiology folder), so the anatomy map leaves them out.
   The rows stay in hss2011-leaves-w1.js and -w2.js for the physiology subject. */
const HSS2011_SHOWN = dropSystem(HSS2011_ALL, HSS2011_ROWS, 'tissue');

export const REVISION = {
  HSS2011: {
    id: 'HSS2011',
    label: 'HSS2011 Human Anatomy',
    data: mergeLeaves(HSS2011_SHOWN.base, HSS2011_SHOWN.rows, HSS2011_LEAF_SOURCES),
    rows: HSS2011_SHOWN.rows,
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
  },
};

/** The subject shown first. */
export const DEFAULT_SUBJECT = 'HSS2011';
