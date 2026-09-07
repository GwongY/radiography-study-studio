/*
 * Diagrams — authored schematics, drawn inline as SVG so the app needs no
 * image assets for them.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Diagrams — authored schematics, drawn inline as SVG so the app needs
 * no image files and works with no network. Label names come from the
 * sources cited on the owning item.
 * ------------------------------------------------------------------ */

export const DIAGRAMS = {
  vertebra: {
    title: 'Typical vertebra, superior view',
    viewBox: '0 0 400 300',
    caption: 'Anterior is at the bottom. Label set matches the Module 4 labelling answers B1–B6.',
    shapes: [
      { kind: 'ellipse', cx: 200, cy: 232, rx: 88, ry: 44 },
      { kind: 'path', d: 'M120 212 L138 150 L172 96 L200 88 L228 96 L262 150 L280 212' },
      { kind: 'path', d: 'M172 96 L200 44 L228 96' },
      { kind: 'path', d: 'M138 150 L64 178' },
      { kind: 'path', d: 'M262 150 L336 178' },
      { kind: 'circle', cx: 200, cy: 162, r: 4, faint: true },
    ],
    labels: {
      body: [200, 236], foramen: [200, 166], pedicle: [126, 198],
      lamina: [156, 116], transverse: [70, 180], spinous: [200, 48], sap: [268, 132],
    },
  },
  heart: {
    title: 'Heart, anterior view schematic',
    viewBox: '0 0 400 300',
    caption: 'The patient’s right side is on the left of the diagram. Chamber and valve names from the cardiovascular lecture.',
    shapes: [
      { kind: 'path', d: 'M200 30 L200 268' },
      { kind: 'path', d: 'M92 152 L308 152' },
      { kind: 'path', d: 'M200 30 C120 30 78 96 78 152 C78 226 130 274 200 274 C270 274 322 226 322 152 C322 96 280 30 200 30 Z' },
      { kind: 'circle', cx: 170, cy: 58, r: 11 },
      { kind: 'circle', cx: 232, cy: 58, r: 11 },
    ],
    labels: {
      ra: [140, 104], rv: [140, 210], la: [262, 104], lv: [262, 210],
      tri: [140, 152], bi: [262, 152], pv: [170, 58], av: [232, 58],
    },
  },
};
