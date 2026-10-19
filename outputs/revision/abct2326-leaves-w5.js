/*
 * ABCT2326 · Week 5 leaves — kidney and urine.
 *
 * Read off ABCT2326 Renal System 2019.pdf (phys.l5.2026), pages 2–44.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L5 = 'phys.l5.2026';

export const SOURCES = {
  [L5]: 'Lecture 5 renal system slides',
};

export const ROWS = [
  /* ---------------- Kidney function (p2) ---------------- */
  { k: 'process', id: 'p5_blood_plasma_vol', l: 'Volume of blood plasma', match: 'Volume of blood plasma', parent: 'p_kidneyfn', w: 5, src: [L5, 2], line: 'regulated by kidneys and contributes to blood pressure' },
  { k: 'substance', id: 'p5_waste_products', l: 'Waste products', match: 'Waste products', parent: 'p_kidneyfn', w: 5, src: [L5, 2, 21], line: 'metabolic wastes eliminated in the process of urine formation' },
  { k: 'process', id: 'p5_plasma_ph', l: 'Plasma pH', match: 'Plasma pH', parent: 'p_kidneyfn', w: 5, src: [L5, 2], line: 'regulated by kidneys through formation of urine' },

  /* ---------------- Gross structure of urinary system and kidney (p3-5) ---------------- */
  { k: 'part', id: 'p5_kidneys', l: 'Kidneys', match: 'kidneys', parent: 'p_urinary', w: 5, src: [L5, 4, 2, 5], line: 'paired fist-sized organs on either side of vertebral column' },
  { k: 'part', id: 'p5_ureters', l: 'Ureters', match: 'ureters', parent: 'p_urinary', w: 5, src: [L5, 4], line: 'tubes carrying urine from kidneys into bladder' },
  { k: 'part', id: 'p5_bladder', l: 'Urinary bladder', match: 'bladder', parent: 'p_urinary', w: 5, src: [L5, 4, 6], line: 'receives urine from ureters and drains into urethra' },
  { k: 'part', id: 'p5_urethra', l: 'Urethra', match: 'Urethra', parent: 'p_urinary', w: 5, src: [L5, 4], line: 'drains urine from bladder' },
  { k: 'part', id: 'p5_renal_cortex', l: 'Cortex', match: 'Cortex', parent: 'p5_kidneys', w: 5, src: [L5, 5], line: 'contains many capillaries and outer parts of nephrons' },
  { k: 'part', id: 'p5_renal_medulla', l: 'Medulla', match: 'Medulla', parent: 'p5_kidneys', w: 5, src: [L5, 5, 27, 30], line: 'consists of renal pyramids separated by renal columns' },
  { k: 'part', id: 'p5_renal_pyramids', l: 'Renal pyramids', match: 'renal pyramids', parent: 'p5_renal_medulla', w: 5, src: [L5, 5], line: 'pyramids in medulla containing calyces' },
  { k: 'part', id: 'p5_renal_columns', l: 'Renal columns', match: 'renal columns', parent: 'p5_renal_medulla', w: 5, src: [L5, 5], line: 'separate renal pyramids in the medulla' },
  { k: 'part', id: 'p5_minor_calyces', l: 'Minor calyces', match: 'minor calyces', parent: 'p5_kidneys', w: 5, src: [L5, 5], line: 'unite to form a major calyx' },
  { k: 'part', id: 'p5_major_calyx', l: 'Major calyx', match: 'major calyx', parent: 'p5_minor_calyces', w: 5, src: [L5, 5], line: 'formed by union of minor calyces' },

  /* ---------------- Micturition reflex (p6) ---------------- */
  { k: 'part', id: 'p5_detrusor', l: 'Detrusor muscle', match: 'detrusor muscle', parent: 'p_micturition', w: 5, src: [L5, 6], line: 'smooth muscle wall of the bladder' },
  { k: 'process', id: 'p5_detrusor_stretch', l: 'Detrusor contraction', match: 'contraction', parent: 'p_micturition', w: 5, src: [L5, 6], line: 'stretch can cause spontaneous action potential and contraction' },
  { k: 'process', id: 'p5_parasympathetic_bladder', l: 'Parasympathetic control', match: 'parasympathetic', parent: 'p_micturition', w: 5, src: [L5, 6], line: 'innervates and controls bladder smooth muscle' },
  { k: 'part', id: 'p5_muscarinic_receptors', l: 'Muscarinic acetylcholine receptors', match: 'muscarinic acetocholine receptors', parent: 'p_micturition', w: 5, src: [L5, 6], line: 'targeted by drugs for overactive bladders' },

  /* ---------------- Renal blood vessels (p9) ---------------- */
  { k: 'group', id: 'p5_renal_vessels', l: 'Renal Blood Vessels', match: 'Renal Blood Vessels', parent: 'p_nephron', w: 5, src: [L5, 9], line: 'arteries, arterioles, capillaries and veins supplying the nephron' },
  { k: 'part', id: 'p5_interlobular_arteries', l: 'Interlobular arteries', match: 'Interlobular arteries', parent: 'p5_renal_vessels', w: 5, src: [L5, 9], line: 'give rise to afferent arterioles which supply glomeruli' },
  { k: 'part', id: 'p5_afferent_arteriole', l: 'Afferent arterioles', match: 'afferent arterioles', parent: 'p5_renal_vessels', w: 5, src: [L5, 9, 18, 19, 39, 43], line: 'supply glomeruli', own: 'Arterioles that arise from the interlobular arteries; the slide says their constriction or dilation affects blood flow to glomeruli and so GFR.' },
  { k: 'part', id: 'p5_glomerulus', l: 'Glomeruli', match: 'Glomeruli', parent: 'p5_renal_vessels', w: 5, src: [L5, 9, 11], line: 'mass of capillaries inside glomerular capsule that produces filtrate' },
  { k: 'part', id: 'p5_efferent_arteriole', l: 'Efferent arteriole', match: 'Efferent arteriole', parent: 'p5_renal_vessels', w: 5, src: [L5, 9], line: 'drains glomerulus and delivers blood to peritubular capillaries' },
  { k: 'part', id: 'p5_peritubular_capillaries', l: 'Peritubular capillaries', match: 'peritubular capillaries', parent: 'p5_renal_vessels', w: 5, src: [L5, 9, 12, 21, 34], line: 'surround nephron tubules for reabsorption and secretion' },
  { k: 'part', id: 'p5_vasa_recta', l: 'Vasa recta', match: 'vasa recta', parent: 'p5_renal_vessels', w: 5, src: [L5, 9, 30, 31], line: 'peritubular capillaries that reabsorb water and recirculate salt' },
  { k: 'part', id: 'p5_interlobular_veins', l: 'Interlobular veins', match: 'interlobular veins', parent: 'p5_renal_vessels', w: 5, src: [L5, 9], line: 'receive blood from peritubular capillaries' },

  /* ---------------- Nephron corpuscle and tubules (p10-12) ---------------- */
  { k: 'part', id: 'p5_renal_corpuscle', l: 'Renal corpuscle', match: 'renal corpuscle', parent: 'p_nephron', w: 5, src: [L5, 11], line: 'glomerulus and capsule together where filtration occurs' },
  { k: 'part', id: 'p5_glomerular_capsule', l: 'Glomerular capsule', match: 'glomerular capsule', parent: 'p5_renal_corpuscle', w: 5, src: [L5, 10, 9, 11, 14, 15], line: 'surrounds glomerulus and transitions into proximal convoluted tubule' },
  { k: 'part', id: 'p5_pct', l: 'Proximal convoluted tubule', match: 'proximal convoluted tubule', parent: 'p_nephron', w: 5, src: [L5, 10, 11, 12, 21, 26, 38], line: 'single layer of cuboidal cells with millions of microvilli' },
  { k: 'part', id: 'p5_microvilli_pct', l: 'Microvilli', match: 'microvilli', parent: 'p5_pct', w: 5, src: [L5, 12], line: 'increase surface area for reabsorption in proximal tubule' },
  { k: 'part', id: 'p5_loop_of_henle', l: 'Loop of Henle', match: 'Loop of Henle', parent: 'p_nephron', w: 5, src: [L5, 10, 26, 27], line: 'hairpin loop connecting proximal and distal convoluted tubules' },
  { k: 'part', id: 'p5_descending_limb', l: 'Descending limb', match: 'descending', parent: 'p5_loop_of_henle', w: 5, src: [L5, 10, 26, 27, 30], line: 'permeable to water which diffuses into hypertonic medulla' },
  { k: 'part', id: 'p5_ascending_limb', l: 'Ascending limb', match: 'ascending', parent: 'p5_loop_of_henle', w: 5, src: [L5, 10, 27, 39], line: 'thick segment that actively transports salt out of filtrate' },
  { k: 'part', id: 'p5_dct', l: 'Distal convoluted tubule', match: 'distal convoluted tubule', parent: 'p_nephron', w: 5, src: [L5, 10, 37], line: 'site of variable reabsorption regulated by hormones' },
  { k: 'part', id: 'p5_collecting_duct', l: 'Collecting duct', match: 'collecting duct', parent: 'p_nephron', w: 5, src: [L5, 10, 31, 37, 38, 42], line: 'receives fluid from multiple nephron tubules' },

  /* ---------------- Glomerular filtration (p14-16) ---------------- */
  { k: 'part', id: 'p5_fenestrated_capillaries', l: 'Fenestrated capillaries', match: 'fenestrated', parent: 'p_gfiltration', w: 5, src: [L5, 14, 30], line: 'large pores between endothelial cells allow plasma molecules to pass' },
  { k: 'cell', id: 'p5_endothelial_cells', l: 'Endothelial cells', match: 'endothelial cells', parent: 'p_gfiltration', w: 5, src: [L5, 14], line: 'have large pores making capillaries permeable' },
  { k: 'cell', id: 'p5_podocytes', l: 'Podocytes', match: 'podocytes', parent: 'p_gfiltration', w: 5, src: [L5, 15], line: 'cells of glomerular capsule with foot processes called pedicels' },
  { k: 'part', id: 'p5_pedicels', l: 'Pedicels', match: 'pedicels', parent: 'p5_podocytes', w: 5, src: [L5, 15], line: 'foot processes forming narrow slit diaphragms' },
  { k: 'part', id: 'p5_slit_diaphragms', l: 'Slit diaphragms', match: 'slit diaphragms', parent: 'p_gfiltration', w: 5, src: [L5, 15, 16], line: 'lined with negative charges which repel negatively-charged proteins' },
  { k: 'substance', id: 'p5_plasma_proteins', l: 'Plasma proteins', match: 'Plasma proteins', parent: 'p_gfiltration', w: 5, src: [L5, 16], line: 'mostly excluded from filtrate by size and negative charge' },
  { k: 'substance', id: 'p5_albumin', l: 'Albumin', match: 'albumin', parent: 'p_gfiltration', w: 5, src: [L5, 16], line: 'small amounts entering filtrate are reabsorbed by endocytosis' },

  /* ---------------- Glomerular filtration rate (p17-19) ---------------- */
  { k: 'substance', id: 'p5_ultrafiltrate', l: 'Filtrate', match: 'filtrate', parent: 'p_gfr', w: 5, src: [L5, 17, 9, 10, 11, 15, 16, 21], line: 'totals about 180 L/day produced by both kidneys' },
  { k: 'process', id: 'p5_vasoconstriction_afferent', l: 'Vasoconstriction of afferent arterioles', match: 'Vasoconstriction', parent: 'p_gfr', w: 5, src: [L5, 18, 19], line: 'affects rate of blood flow to glomeruli and thus GFR' },
  { k: 'process', id: 'p5_autoregulation_gfr', l: 'Autoregulation of GFR', match: 'autoregulation', parent: 'p_gfr', w: 5, src: [L5, 18, 43], line: 'intrinsic mechanism keeping GFR constant via afferent arteriole diameter' },
  { k: 'process', id: 'p5_sympathetic_gfr', l: 'Sympathetic nerve activity', match: 'Sympathetic nerve activity', parent: 'p_gfr', w: 5, src: [L5, 19, 41, 42], line: 'constricts afferent arterioles to reduce GFR and conserve blood volume' },

  /* ---------------- Reabsorption of salt and water (p20-26) ---------------- */
  { k: 'process', id: 'p5_obligatory_water_loss', l: 'Obligatory water loss', match: 'obligatory water loss', parent: 'p_reabs', w: 5, src: [L5, 21], line: 'minimum of 400 ml/day urine necessary to excrete metabolic wastes' },
  { k: 'process', id: 'p5_osmosis_h2o', l: 'Osmosis', match: 'osmosis', parent: 'p_reabs', w: 5, src: [L5, 22, 25], line: 'water is never transported actively and follows salt by osmosis' },
  { k: 'part', id: 'p5_nak_pump', l: 'Na+/K+ pump', match: 'Na+/K+ pump', parent: 'p_reabs', w: 5, src: [L5, 24], line: 'primary active transport of sodium across basolateral membrane' },
  { k: 'process', id: 'p5_coupled_transport', l: 'Coupled transport of glucose and Na+', match: 'coupled transport of glucose', parent: 'p_reabs', w: 5, src: [L5, 24], line: 'secondary active transport into tubular cytoplasm' },
  { k: 'process', id: 'p5_facilitated_diffusion', l: 'Facilitated diffusion', match: 'facilitated diffusion', parent: 'p_reabs', w: 5, src: [L5, 24], line: 'transports glucose out of cell to be reabsorbed into blood' },
  { k: 'substance', id: 'p5_sodium_ion', l: 'Sodium ion', match: 'Na+', parent: 'p_reabs', w: 5, src: [L5, 24, 2, 25, 26, 36, 37], line: 'active transport drives about sixty-five percent of proximal reabsorption' },
  { k: 'substance', id: 'p5_chloride_ion', l: 'Chloride ion', match: 'Cl', parent: 'p_reabs', w: 5, src: [L5, 25, 26, 36], line: 'passively follows sodium electrical gradient during proximal reabsorption' },
  { k: 'substance', id: 'p5_glucose', l: 'Glucose', match: 'Glucose', parent: 'p_reabs', w: 5, src: [L5, 24], line: 'coupled to sodium transport and completely reabsorbed into blood' },

  /* ---------------- Countercurrent multiplier and exchange (p27-30) ---------------- */
  { k: 'process', id: 'p5_countercurrent_multiplier', l: 'Countercurrent multiplier', match: 'countercurrent multiplier', parent: 'p_countercurrent', w: 5, src: [L5, 27, 30], line: 'ascending and descending limb interaction builds medullary osmolality to 1400' },
  { k: 'process', id: 'p5_countercurrent_exchange', l: 'Countercurrent exchange', match: 'Countercurrent Exchange', parent: 'p_countercurrent', w: 5, src: [L5, 30], line: 'vasa recta maintain medullary gradient while reabsorbing water' },
  { k: 'substance', id: 'p5_urea', l: 'Urea', match: 'urea', parent: 'p_countercurrent', w: 5, src: [L5, 30], line: 'recirculates and traps in medulla interstitial fluid' },
  { k: 'part', id: 'p5_urea_transporters', l: 'Urea transporters', match: 'urea transporters', parent: 'p_countercurrent', w: 5, src: [L5, 30], line: 'located in descending section of vasa recta' },

  /* ---------------- Plasma concentration and clearance (p31-34) ---------------- */
  { k: 'cell', id: 'p5_osmoreceptors', l: 'Osmoreceptors', match: 'Osmoreceptors', parent: 'p_clearance', w: 5, src: [L5, 31], line: 'hypothalamic sensors detecting increased plasma osmolality during dehydration' },
  { k: 'part', id: 'p5_aquaporins', l: 'Aquaporins', match: 'aquaporins', parent: 'p_clearance', w: 5, src: [L5, 31, 30], line: 'water channels inserted into plasma membrane of collecting duct' },
  { k: 'substance', id: 'p5_adh', l: 'Antidiuretic hormone (ADH)', match: 'ADH', parent: 'p_clearance', w: 5, src: [L5, 31, 41, 42], line: 'secreted by posterior pituitary to stimulate aquaporin insertion', acts: { p5_aquaporins: 'stimulates insertion into collecting duct membrane' } },
  { k: 'process', id: 'p5_secretion', l: 'Secretion', match: 'secretion', parent: 'p_clearance', w: 5, src: [L5, 34, 37, 38, 43], line: 'active transport from peritubular capillaries into tubular fluid' },
  { k: 'process', id: 'p5_excretion_rate', l: 'Excretion rate', match: 'Excretion rate', parent: 'p_clearance', w: 5, src: [L5, 34], line: 'equals filtration rate plus secretion rate minus reabsorption rate' },

  /* ---------------- Electrolyte balance (p36-38) ---------------- */
  { k: 'part', id: 'p5_cortical_collecting_duct', l: 'Cortical collecting duct', match: 'cortical collecting duct', parent: 'p_electrolyte', w: 5, src: [L5, 37, 38, 42], line: 'site of aldosterone-stimulated sodium reabsorption and potassium secretion' },
  { k: 'substance', id: 'p5_aldosterone', l: 'Aldosterone', match: 'aldosterone', parent: 'p_electrolyte', w: 5, src: [L5, 37, 38, 40, 42], line: 'controls potassium secretion and sodium reabsorption in collecting duct', acts: { p5_cortical_collecting_duct: 'stimulates sodium reabsorption and potassium secretion' } },
  { k: 'substance', id: 'p5_potassium_ion', l: 'Potassium ion', match: 'K+', parent: 'p_electrolyte', w: 5, src: [L5, 36, 2, 24, 37, 38], line: 'secreted into cortical collecting duct under aldosterone stimulation' },

  /* ---------------- Juxtaglomerular complex and RAAS (p39-43) ---------------- */
  { k: 'substance', id: 'p5_angiotensinogen', l: 'Angiotensinogen', match: 'angiotensinogen', parent: 'p_raas', w: 5, src: [L5, 40], line: 'plasma protein precursor converted by renin to angiotensin I' },
  { k: 'substance', id: 'p5_angiotensin_1', l: 'Angiotensin I', match: 'angiotensin I', parent: 'p_raas', w: 5, src: [L5, 40], line: 'decapeptide converted to angiotensin II by ACE in lungs' },
  { k: 'substance', id: 'p5_angiotensin_2', l: 'Angiotensin II', match: 'angiotensin II', parent: 'p_raas', w: 5, src: [L5, 40, 42], line: 'potent vasoconstrictor that stimulates aldosterone release from adrenal cortex', acts: { p5_aldosterone: 'stimulates release' } },
  { k: 'substance', id: 'p5_ace', l: 'Angiotensin-converting enzyme (ACE)', match: 'angiotensin-converting enzyme (ACE)', parent: 'p_raas', w: 5, src: [L5, 40], line: 'enzyme in lungs that converts angiotensin I to angiotensin II', acts: { p5_angiotensin_1: 'converts to angiotensin II' } },
  { k: 'substance', id: 'p5_renin', l: 'Renin', match: 'renin', parent: 'p_raas', w: 5, src: [L5, 40, 41, 42, 43], line: 'enzyme converting angiotensinogen to angiotensin I', acts: { p5_angiotensinogen: 'converts to angiotensin I' } },
  { k: 'part', id: 'p5_jgc', l: 'Juxtaglomerular complex', match: 'Juxtaglomerular Complex', parent: 'p_raas', w: 5, src: [L5, 39, 42], line: 'region where afferent arteriole contacts thick ascending limb' },
  { k: 'cell', id: 'p5_jg_cells', l: 'Juxtaglomerular cells', match: 'juxtaglomerular cells', parent: 'p5_jgc', w: 5, src: [L5, 40, 41, 43], line: 'specialized smooth muscle cells that release renin', makes: { p5_renin: 'secretes renin' } },
  { k: 'cell', id: 'p5_macula_densa', l: 'Macula densa', match: 'Macula Densa', parent: 'p5_jgc', w: 5, src: [L5, 43], line: 'sensor for tubuloglomerular feedback regulating GFR and renin secretion' },
  { k: 'process', id: 'p5_renin_release', l: 'Renin release', match: 'release of renin', parent: 'p_raas', w: 5, src: [L5, 40, 41], line: 'activated by low blood volume, low renal blood flow, or sympathetic activity', next: { p5_ang1_formation: 'cleaves angiotensinogen to angiotensin I' } },
  { k: 'process', id: 'p5_ang1_formation', l: 'Angiotensin I formation', match: 'angiotensin I', parent: 'p_raas', w: 5, src: [L5, 40], line: 'renin converts circulating angiotensinogen to angiotensin I', next: { p5_ang2_conversion: 'converted by ACE in lungs' } },
  { k: 'process', id: 'p5_ang2_conversion', l: 'Angiotensin II conversion', match: 'angiotensin II', parent: 'p_raas', w: 5, src: [L5, 40], line: 'angiotensin-converting enzyme in lungs converts angiotensin I to angiotensin II', next: { p5_aldosterone_secretion: 'stimulates aldosterone release' } },
  { k: 'process', id: 'p5_aldosterone_secretion', l: 'Aldosterone secretion', match: 'release of aldosterone', parent: 'p_raas', w: 5, src: [L5, 40, 42], line: 'angiotensin II stimulates adrenal cortex to release aldosterone', next: { p_electrolyte: 'enhances sodium reabsorption in collecting ducts' } },

  /* ---------------- Urinary buffers (p44) ---------------- */
  { k: 'substance', id: 'p5_hydrogen_ion', l: 'Hydrogen ion', match: 'H+', parent: 'p_buffers', w: 5, src: [L5, 44, 2, 36], line: 'secreted into filtrate and buffered to keep urine pH above four point five' },
  { k: 'substance', id: 'p5_phosphate_buffer', l: 'Monohydrogen phosphate buffer', match: 'HPO4', parent: 'p_buffers', w: 5, src: [L5, 44], line: 'enters tubule during filtration to buffer hydrogen ions', acts: { p5_hydrogen_ion: 'buffers excess hydrogen ions in filtrate' } },
  { k: 'substance', id: 'p5_ammonia_buffer', l: 'Ammonia', match: 'NH3', parent: 'p_buffers', w: 5, src: [L5, 44], line: 'produced in tubule by deaminating amino acids', acts: { p5_hydrogen_ion: 'buffers hydrogen ions to form ammonium ion' } },
  { k: 'substance', id: 'p5_ammonium_ion', l: 'Ammonium ion', match: 'ammonium ion', parent: 'p_buffers', w: 5, src: [L5, 44], line: 'formed when ammonia buffers hydrogen ions before excretion' },
];
