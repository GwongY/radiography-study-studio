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
export const CROSS = [
  { a: ['ABCT2326', 'p1_tis_tight'], b: ['HSS2011', 'w6_bbbarrier'], why: 'astrocytes contact blood capillaries, stimulates tight junctions between endothelial cells', src: ['hss.l6.2026', 15], match: 'tight junctions' },
  { a: ['ABCT2326', 'p1_tis_gap'], b: ['HSS2011', 'w5_elecsyn'], why: 'electrical: with gap junctions', src: ['hss.l5.2026', 20], match: 'gap junctions' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'w1_cartilage'], why: 'Includes: ... cartilage', src: ['hss.tut.tissues', 17], match: 'cartilage' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'bone'], why: 'Includes: ... bone', src: ['hss.tut.tissues', 17], match: 'bone' },
  { a: ['ABCT2326', 'p1_tis_fibres'], b: ['HSS2011', 'w1_collagen'], why: 'mostly contains collagen for strength', src: ['hss.tut.tissues', 17], match: 'collagen' },
  { a: ['ABCT2326', 'p_muscle_t'], b: ['HSS2011', 'w1_musfibre'], why: 'Muscle fibers are individual muscle cells', src: ['hss.tut.tissues', 19], match: 'Muscle fibers' },
  { a: ['ABCT2326', 'p_muscle_t'], b: ['HSS2011', 'w1_fascicle'], why: 'bundles called fascicles', src: ['hss.tut.tissues', 19], match: 'fascicles' },
  { a: ['ABCT2326', 'p_muscle_t'], b: ['HSS2011', 'w1_perimysium'], why: 'surrounded by connective tissue (perimysium)', src: ['hss.tut.tissues', 19], match: 'perimysium' },
  { a: ['ABCT2326', 'p_muscle_t'], b: ['HSS2011', 'w1_epimysium'], why: 'surrounded by the epimysium', src: ['hss.tut.tissues', 19], match: 'epimysium' },
  { a: ['ABCT2326', 'p_muscle_t'], b: ['HSS2011', 'w1_tendon'], why: 'Tendons are strong, fibrous connective tissues that connect muscles to bones', src: ['hss.tut.tissues', 19], match: 'Tendons' },
  { a: ['ABCT2326', 'p1_neurons'], b: ['HSS2011', 'neuron'], why: 'Consists of neurons and supporting glial cells', src: ['hss.tut.tissues', 20], match: 'neurons' },
  { a: ['ABCT2326', 'p1_tis_motorn'], b: ['HSS2011', 'w1_motorneuron'], why: 'Motor neurons: Transmit signals from the CNS to muscles or glands', src: ['hss.tut.tissues', 21], match: 'Motor neurons' },
  { a: ['ABCT2326', 'p1_tis_glia'], b: ['HSS2011', 'glia'], why: 'Consists of neurons and supporting glial cells', src: ['hss.tut.tissues', 20], match: 'glial cells' },
  { a: ['ABCT2326', 'p_epithelial'], b: ['HSS2011', 'w8_mesothelium'], why: 'Simple squamous epithelium (single layer of flat cells)', src: ['hss.l8.2026', 9], match: 'Simple squamous' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'w8_areolar'], why: 'Areolar Tissue Loose connective tissue', src: ['hss.l8.2026', 9], match: 'Loose connective tissue' },
  { a: ['ABCT2326', 'p1_tis_gap'], b: ['HSS2011', 'w8_gapj'], why: 'Gap junctions: allow electrical signals to pass quickly from one cell to another', src: ['hss.l8.2026', 29], match: 'Gap junctions' },
  { a: ['ABCT2326', 'p1_tis_tight'], b: ['HSS2011', 'w8_contcap'], why: 'Tight junctions between cells limit permeability', src: ['hss.l8.2026', 37], match: 'Tight junctions' },
  { a: ['ABCT2326', 'p_tissues'], b: ['HSS2011', 'musclestruct'], why: 'Muscle Tissue: Soft contractile tissue', src: ['hss.tut.tissues', 18], match: 'Muscle Tissue' },
  { a: ['ABCT2326', 'p_tissues'], b: ['HSS2011', 'neuron'], why: 'Nerve Tissue: Consists of neurons and supporting glial cells', src: ['hss.tut.tissues', 20], match: 'neurons' },
  { a: ['ABCT2326', 'p_epithelial'], b: ['HSS2011', 'smell'], why: 'receptor cells in the olfactory epithelium', src: ['hss.l7.2026', 23], match: 'olfactory epithelium' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'ligcart'], why: 'Localized thickenings of fibrous connective tissue Help reinforce the joint capsule', src: ['hss.msk.2026', 28], match: 'connective tissue' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'eye'], why: 'Sclera: dense collagenous connective tissue', src: ['hss.l7.2026', 41], match: 'connective tissue' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'musclestruct'], why: 'Tendons are strong, fibrous connective tissues that connect muscles to bones', src: ['hss.tut.tissues', 19], match: 'connective tissues' },
  { a: ['ABCT2326', 'p1_tis_junctions'], b: ['HSS2011', 'bbb'], why: 'Astrocytes contact blood capillaries, stimulates tight junctions between endothelial cells', src: ['hss.l6.2026', 15], match: 'tight junctions' },
  { a: ['ABCT2326', 'p1_tis_junctions'], b: ['HSS2011', 'synapse'], why: 'Electrical: With gap junctions Allows ions diffuse directly', src: ['hss.l5.2026', 20], match: 'gap junctions' },
  { a: ['ABCT2326', 'p1_tis_junctions'], b: ['HSS2011', 'cardiaccells'], why: 'Intercalated discs connect cardiac muscle cells. They contain: Desmosomes ... Gap junctions', src: ['hss.l8.2026', 29], match: 'intercalated discs' },
  { a: ['ABCT2326', 'p_epithelial'], b: ['HSS2011', 'pericardium'], why: 'Simple squamous epithelium (single layer of flat cells)', src: ['hss.l8.2026', 9], match: 'Simple squamous' },
  { a: ['ABCT2326', 'p_connective'], b: ['HSS2011', 'pericardium'], why: 'Areolar Tissue Loose connective tissue', src: ['hss.l8.2026', 9], match: 'Loose connective tissue' },
  { a: ['ABCT2326', 'p_tissues'], b: ['HSS2011', 'bloodvessels'], why: 'Both arteries and veins have the same three distinct tissue layers', src: ['hss.l8.2026', 33], match: 'tissue layers' },
];
