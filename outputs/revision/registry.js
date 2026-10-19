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
import { mergeLeaves } from './leaves.js';
import * as hss2011W1 from './hss2011-leaves-w1.js';
import * as hss2011W2 from './hss2011-leaves-w2.js';
import { THREADS_HTML } from './hss2011-threads.js';
import { TABLES_HTML } from './hss2011-tables.js';
import { DECODER_HTML, SOURCES_HTML } from './hss2011-decoder.js';

/* Leaf rows, week by week (outputs/revision/leaves.js). */
const HSS2011_ROWS = [...hss2011W1.ROWS, ...hss2011W2.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W1.SOURCES, ...hss2011W2.SOURCES };

export const REVISION = {
  HSS2011: {
    id: 'HSS2011',
    label: 'HSS2011 Human Anatomy',
    data: mergeLeaves({ NODES: hss2011.NODES, EDGES: hss2011.EDGES, TREE: hss2011.TREE }, HSS2011_ROWS, HSS2011_LEAF_SOURCES),
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
      { th: 't11', stops: ['tissues', 'epithelium', 'connective', 'musclestruct', 'neuron'] },
    ],
  },
};

/** The subject shown first. */
export const DEFAULT_SUBJECT = 'HSS2011';
