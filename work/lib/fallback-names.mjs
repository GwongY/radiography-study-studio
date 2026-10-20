/*
 * Names from the older decks, for what the 2026 decks have not taught yet.
 *
 * The thorax's lungs and the abdomen and pelvis (Modules III and IV) are still
 * to come this term, so for those the older PolyU decks are the fallback
 * (CLAUDE.md, source precedence). Where the atlas's own name or the grouping
 * pass gets a structure wrong, the deck's name goes here, with the words it
 * uses and the page. work/viewer-lecture-names-check.mjs holds every `says` to
 * its page with the same comparison source-check.mjs uses.
 *
 * Read by work/build-mesh-index.mjs.
 */

/* One structure, the deck's name for it. `why` says what the atlas name gets wrong. */
export const RENAMED = {
  'organs|Jejunum': { name: 'Jejunum and ileum', ref: 'hss.3.3.2019', page: 29, says: 'The jejunum and ileum',
    why: 'the one mesh runs from the duodenum (3 mm away) to the caecum (2 mm from the ascending colon): it is the whole jejunum and ileum, and the atlas has no ileum of its own' },
  'organs|Left main bronchus': { name: 'Left primary bronchus', ref: 'hss.1.2', page: 33, says: 'Left primary',
    why: 'the deck calls the main bronchi primary bronchi' },
  'organs|Right main bronchus': { name: 'Right primary bronchus', ref: 'hss.1.2', page: 33, says: 'Primary bronchi',
    why: 'the deck calls the main bronchi primary bronchi' },
};

/* Several structures selected together under the deck's name for the set. */
export const NAMED_GROUPS = [
  { layer: 'organs', rows: /^(?:Free|Mesocolic|Omental) taenia$/, group: 'Taeniae coli', ref: 'hss.3.1.2019', page: 28, says: 'taeniae coli',
    why: 'the three bands of the colon; by height alone two were "Taeniae of the pelvis" and the third went in with the meso-appendix as "Structures of the abdomen"' },
  { layer: 'organs', rows: /^(?:Inferior|Superior) parathyroid gland$/, group: 'Parathyroid glands', ref: 'hss.4.2', page: 46, says: 'parathyroid glands',
    why: 'they were "Glands of the head and neck"' },
  { layer: 'organs', rows: /^(?:Left|Right) (?:superior|inferior) lobar bronchus$|^Middle lobar bronchus$/, group: 'Secondary (lobar) bronchi', ref: 'hss.1.2', page: 33, says: 'Secondary (lobar) bronchi',
    why: 'they were "Bronchi of the thorax" together with the main bronchi' },
  { layer: 'organs', rows: /segmental bronchus of left lung/, group: 'Segmental bronchi of left lung', ref: 'hss.1.2', page: 33, says: 'segmental bronchi' },
  { layer: 'organs', rows: /segmental bronchus of right lung/, group: 'Segmental bronchi of right lung', ref: 'hss.1.2', page: 33, says: 'segmental bronchi' },
];
