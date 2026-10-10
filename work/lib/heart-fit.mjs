/*
 * heart-fit.mjs — BetterHeart's frame against the explorer's dolasim.glb.
 *
 * BetterHeart's manifest was made from the same dolasim.glb, then scaled and
 * shifted. Every manifest mesh that has a same-named mesh in our GLB gives one
 * pair of boxes; the frame is atlas = SCALE * body + shift, with no rotation.
 * Measured on 2026-10-10: per-axis slope 23.999 / 23.984 / 24.001.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { boxesIn } from './mesh-names.mjs';

export const HEART_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'outputs', 'heart');
export const SCALE = 24;
const norm = (s) => String(s).replace(/_/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const centre = (b, k) => (b[0][k] + b[1][k]) / 2;

export const loadManifest = () => JSON.parse(readFileSync(join(HEART_DIR, 'heart-manifest.json'), 'utf8'));

/* Manifest meshes that are the same named mesh in dolasim.glb. The BodyParts3D
   cavities (group "chambers") and the two FJ2420/FJ2421 leaflets are not in it. */
export function matchedRows(manifest = loadManifest()) {
  const host = boxesIn('assets/dolasim.glb');
  const byName = new Map([...host].map(([k, v]) => [norm(k), v]));
  const rows = [];
  for (const m of manifest.meshes) {
    if (m.group === 'chambers') continue;
    const h = byName.get(norm(m.sourceName));
    if (h) rows.push({ name: m.sourceName, atlas: [m.min, m.max], host: h });
  }
  return rows;
}

export function fit(rows) {
  const shift = [0, 1, 2].map((k) => rows.reduce((s, r) => s + centre(r.atlas, k) - SCALE * centre(r.host, k), 0) / rows.length);
  let worst = 0, worstName = '';
  for (const r of rows) for (let k = 0; k < 3; k++) {
    const e = Math.abs(SCALE * centre(r.host, k) + shift[k] - centre(r.atlas, k));
    if (e > worst) { worst = e; worstName = r.name; }
  }
  const ratio = [0, 1, 2].map((k) => {
    let a = 0, h = 0;
    for (const r of rows) { a += r.atlas[1][k] - r.atlas[0][k]; h += r.host[1][k] - r.host[0][k]; }
    return a / h;
  });
  return { shift, worst, worstName, ratio, count: rows.length };
}
