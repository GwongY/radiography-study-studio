/*
 * The heart atlas's pericardium: how each layer looks, and what its card says, in the words of HSS2011
 * Cardiovascular system p7 ("The pericardium is a double-walled sac that surrounds and protects the heart"). Every
 * `match` must be on the cited page (work/heart-atlas-check.mjs). The geometry is outputs/heart/pericardium.json and
 * .bin, built in Blender from this heart by work/blender/pericardium.py. A sentence in brackets is the app's own
 * reading help, not the slide's: the cavity is drawn far wider than it is, and a window is cut in the front of the
 * sac, stepped so each layer shows. The epicardium and the cavity move with the heartbeat (`beats`); the sac does not.
 *
 * No three.js here, so the check can read it in Node. Nothing runs at module scope.
 */
const P7 = (...match) => ({ ref: 'hss.l8.2026', page: 7, match });

export const PERICARDIUM = {
  FP: { colour: 0xd9c38c, opacity: 1, beats: false, cite: P7('double-walled sac that surrounds and protects the heart', 'Outer fibrous pericardium'),
    text: ['Pericardium · FIBROUS PERICARDIUM', 'Fibrous pericardium', 'The pericardium is a double-walled sac that surrounds and protects the heart. Outer fibrous pericardium. (A window is cut in the front of the sac to show the heart inside; every layer has a smaller window than the one outside it, so each shows as a ring.)'] },
  PP: { colour: 0xe58f8f, opacity: 1, beats: false, cite: P7('Inner serous pericardium', 'Outer parietal layer'),
    text: ['Pericardium · SEROUS PERICARDIUM', 'Serous pericardium: parietal layer', 'Inner serous pericardium: outer parietal layer.'] },
  PC: { colour: 0x5fb8e0, opacity: 0.42, beats: true, cite: P7('Pericardial cavity', 'Between parietal and visceral layers', 'Contains pericardial fluid', 'Normally, this fluid measures about 15'),
    text: ['Pericardium · PERICARDIAL CAVITY', 'Pericardial cavity', 'Between parietal and visceral layers. Contains pericardial fluid. Normally, this fluid measures about 15–50 mL. (Drawn much wider than it is, so it can be seen.)'] },
  EPI: { colour: 0xf2cf6b, opacity: 0.5, beats: true, cite: P7('Inner serous pericardium', 'Inner visceral layer (epicardium)'),
    text: ['Pericardium · SEROUS PERICARDIUM', 'Serous pericardium: visceral layer (epicardium)', 'Inner serous pericardium: inner visceral layer (epicardium), on the surface of the heart.'] },
};
