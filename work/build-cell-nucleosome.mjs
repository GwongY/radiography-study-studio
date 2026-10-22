/*
 * Build work/data/nucleosome-3afa.js — the nucleosome the cell zoom shows,
 * from the Protein Data Bank's own coordinates. Run once, offline, and commit.
 *
 *   curl -o <scratch>/3AFA.cif https://files.rcsb.org/download/3AFA.cif
 *   node work/build-cell-nucleosome.mjs <scratch>/3AFA.cif
 *
 * PDB 3AFA, "The human nucleosome structure" (Tachiwana et al., PNAS 2010;
 * 107:10454), is the structure NIH 3D publishes as 3DPX-002662 (Public Domain).
 * wwPDB data files are CC0 1.0 (https://www.rcsb.org/pages/usage-policy,
 * read 2026-10-20). The .cif itself is not committed: 1.4 MB for what the app
 * needs in 25 KB.
 *
 * What is kept, and nothing else:
 *   - each DNA strand: per nucleotide its base letter, its phosphorus (the
 *     backbone) and its C1' atom (where the base hangs off the sugar);
 *   - which nucleotide pairs with which, found from the atoms (the closest
 *     N1/N3 across the strands) and refused unless every pair is A-T or G-C;
 *   - each histone chain: its C-alpha trace.
 * Coordinates are in ångströms, centred on the particle and turned so the
 * superhelix axis is z (the least-spread axis of the DNA phosphates), rounded
 * to 0.1 Å and stored as integers of tenths.
 *
 * The stamp is the SHA-256 of the .cif with line endings normalised to LF, so
 * a CRLF copy cannot move it.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'work/data/nucleosome-3afa.js');
const src = process.argv[2];
if (!src) { console.error('Usage: node work/build-cell-nucleosome.mjs <path to 3AFA.cif>'); process.exit(2); }

const text = readFileSync(src, 'utf8').replace(/\r\n/g, '\n');
const stamp = createHash('sha256').update(text).digest('hex');
if (!/_struct\.title\s+'The human nucleosome structure'/.test(text)) throw new Error('This is not PDB 3AFA.');

/* ---- the atom_site loop ---- */
const lines = text.split('\n');
const cols = [];
let i = lines.findIndex((l) => l.startsWith('_atom_site.'));
for (; lines[i].startsWith('_atom_site.'); i++) cols.push(lines[i].trim().slice('_atom_site.'.length));
const col = (name) => { const k = cols.indexOf(name); if (k < 0) throw new Error(`no column ${name}`); return k; };
const C = { group: col('group_PDB'), atom: col('label_atom_id'), alt: col('label_alt_id'), comp: col('label_comp_id'), chain: col('auth_asym_id'), entity: col('label_entity_id'), seq: col('auth_seq_id'), x: col('Cartn_x'), y: col('Cartn_y'), z: col('Cartn_z'), model: col('pdbx_PDB_model_num') };
const atoms = [];
for (; i < lines.length && !lines[i].startsWith('#'); i++) {
  const f = lines[i].trim().split(/\s+/);
  if (f[C.group] !== 'ATOM' || f[C.model] !== '1' || (f[C.alt] !== '.' && f[C.alt] !== 'A')) continue;
  atoms.push({ atom: f[C.atom].replace(/"/g, ''), comp: f[C.comp], chain: f[C.chain], entity: f[C.entity], seq: Number(f[C.seq]), p: [Number(f[C.x]), Number(f[C.y]), Number(f[C.z])] });
}

/* ---- entities: which chain is DNA, which histone ---- */
const ENTITY = {};
{
  const k = lines.findIndex((l) => l.startsWith('_entity.details'));
  for (let j = k + 1; j < lines.length && !lines[j].startsWith('#'); j++) {
    const m = lines[j].match(/^(\d+)\s+\S+\s+\S+\s+'([^']+)'/);
    if (m) ENTITY[m[1]] = m[2];
  }
}
const chainsOf = (test) => [...new Set(atoms.filter((a) => test(ENTITY[a.entity] || '')).map((a) => a.chain))].sort();
const DNA = chainsOf((d) => /DNA/.test(d));
const HISTONE = chainsOf((d) => /^Histone/.test(d));
if (DNA.length !== 2 || HISTONE.length !== 8) throw new Error(`expected 2 DNA strands and 8 histones, got ${DNA.length} and ${HISTONE.length}`);

/* ---- the frame: centre, and the superhelix axis as z ---- */
const P = atoms.filter((a) => DNA.includes(a.chain) && a.atom === 'P').map((a) => a.p);
const mean = [0, 1, 2].map((d) => P.reduce((s, p) => s + p[d], 0) / P.length);
function smallestAxis(pts) {
  const c = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const p of pts) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) c[a][b] += (p[a] - mean[a]) * (p[b] - mean[b]);
  /* power iteration on (trace*I - C) gives the least-spread axis */
  const tr = c[0][0] + c[1][1] + c[2][2];
  let v = [0.3, 0.5, 0.8];
  for (let n = 0; n < 200; n++) {
    const w = [0, 1, 2].map((a) => tr * v[a] - (c[a][0] * v[0] + c[a][1] * v[1] + c[a][2] * v[2]));
    const l = Math.hypot(...w); v = w.map((x) => x / l);
  }
  return v;
}
const zA = smallestAxis(P);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const l = Math.hypot(...a); return a.map((x) => x / l); };
/* x: towards the DNA's dyad side is not needed; any axis normal to z, fixed by the first phosphate */
const first = P[0].map((x, d) => x - mean[d]);
const xA = unit(cross(cross(zA, first), zA).map((x) => -x));
const yA = cross(zA, xA);
const tenth = (p) => { const q = p.map((x, d) => x - mean[d]); return [xA, yA, zA].map((ax) => Math.round((q[0] * ax[0] + q[1] * ax[1] + q[2] * ax[2]) * 10)); };

/* ---- DNA ---- */
const BASE = { DA: 'A', DT: 'T', DG: 'G', DC: 'C' };
const strands = DNA.map((ch) => {
  const res = new Map();
  for (const a of atoms.filter((x) => x.chain === ch)) {
    if (!res.has(a.seq)) res.set(a.seq, { seq: a.seq, base: BASE[a.comp], at: {} });
    res.get(a.seq).at[a.atom] = a.p;
  }
  const list = [...res.values()].sort((a, b) => a.seq - b.seq);
  for (const r of list) {
    if (!r.base) throw new Error(`${ch}${r.seq}: not a DNA nucleotide`);
    if (!r.at["C1'"]) throw new Error(`${ch}${r.seq}: no C1'`);
    /* the 5' end has no phosphate: its backbone point is the sugar's C5' */
    r.backbone = r.at.P || r.at["C5'"];
    r.pairAtom = r.base === 'A' || r.base === 'G' ? r.at.N1 : r.at.N3;
    if (!r.backbone || !r.pairAtom) throw new Error(`${ch}${r.seq}: missing backbone or pairing atom`);
  }
  return list;
});
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const COMPLEMENT = { A: 'T', T: 'A', G: 'C', C: 'G' };
const pairs = strands[0].map((r, k) => {
  let best = -1, bd = Infinity;
  strands[1].forEach((s, j) => { const d = dist(r.pairAtom, s.pairAtom); if (d < bd) { bd = d; best = j; } });
  if (bd > 3.6) throw new Error(`${DNA[0]}${r.seq}: no partner within 3.6 Å (closest ${bd.toFixed(2)})`);
  if (COMPLEMENT[r.base] !== strands[1][best].base) throw new Error(`${DNA[0]}${r.seq}${r.base} pairs with ${strands[1][best].base}`);
  return [k, best];
});
if (new Set(pairs.map((p) => p[1])).size !== pairs.length) throw new Error('a nucleotide pairs twice');

/* ---- histones ---- */
const histones = HISTONE.map((ch) => {
  const ca = atoms.filter((a) => a.chain === ch && a.atom === 'CA').sort((a, b) => a.seq - b.seq);
  const name = ENTITY[ca[0].entity].replace(/^Histone\s+/, '').split(/\s/)[0];
  return { chain: ch, name, ca: ca.flatMap((a) => tenth(a.p)) };
});

/* ---- write ---- */
const fmt = (arr) => `[${arr.join(',')}]`;
const out = `/*
 * GENERATED by work/build-cell-nucleosome.mjs — do not edit; rerun the script.
 *
 * The nucleosome of the cell zoom: PDB 3AFA, "The human nucleosome structure"
 * (Tachiwana H, Kagawa W, Osakabe A, Kawaguchi K, Shiga T, Hayashi-Takanaka Y,
 * Kimura H, Kurumizaka H. PNAS 2010;107:10454-10459), from RCSB PDB
 * (https://www.rcsb.org/structure/3AFA). wwPDB data files are CC0 1.0. The same
 * structure is NIH 3D entry 3DPX-002662 (Public Domain).
 *
 * Kept: per DNA nucleotide its base, backbone point (P, or C5' at the 5' end)
 * and C1'; the base pairs, found from the atoms and all A-T or G-C; per histone
 * chain its C-alpha trace. Tenths of an ångström, centred, superhelix axis = z.
 * Arrays are flat [x, y, z, x, y, z, …].
 */
export const NUCLEOSOME_STAMP = '${stamp}';
export const NUCLEOSOME_SOURCE = { pdb: '3AFA', url: 'https://www.rcsb.org/structure/3AFA', licence: 'CC0 1.0', nih3d: '3DPX-002662' };
export const DNA_STRANDS = [
${strands.map((s, k) => `  { chain: '${DNA[k]}', bases: '${s.map((r) => r.base).join('')}',\n    backbone: ${fmt(s.flatMap((r) => tenth(r.backbone)))},\n    c1: ${fmt(s.flatMap((r) => tenth(r.at["C1'"])))} }`).join(',\n')},
];
/* [index on strand 0, index on strand 1] */
export const BASE_PAIRS = ${fmt(pairs.flat())};
export const HISTONE_CHAINS = [
${histones.map((h) => `  { chain: '${h.chain}', name: '${h.name}', ca: ${fmt(h.ca)} }`).join(',\n')},
];
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out);
console.log(`wrote ${OUT.slice(root.length + 1)}: ${strands.map((s) => s.length).join('+')} nucleotides, ${pairs.length} base pairs, ${histones.map((h) => `${h.name} ${h.ca.length / 3}`).join(', ')}; ${(out.length / 1024).toFixed(1)} KB`);
