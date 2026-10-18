/*
 * Revision registry — which subjects have a revision map, and the tours that
 * walk it.
 *
 * Adding a subject is a new data file (nodes, edges, tree, threads, tables,
 * decoder) made the way hss2011-*.js were, plus one entry here. No view code
 * knows which subject it is showing.
 */
import * as hss2011 from './hss2011-data.js';
import { THREADS_HTML } from './hss2011-threads.js';
import { TABLES_HTML } from './hss2011-tables.js';
import { DECODER_HTML, SOURCES_HTML } from './hss2011-decoder.js';

export const REVISION = {
  HSS2011: {
    id: 'HSS2011',
    label: 'HSS2011 Human Anatomy',
    data: { NODES: hss2011.NODES, EDGES: hss2011.EDGES, TREE: hss2011.TREE },
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
