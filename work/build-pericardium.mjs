/*
 * The heart atlas's pericardium, step 1 of 2: hand Blender the atlas's own heart.
 *
 *   node work/build-pericardium.mjs
 *   blender --background --factory-startup --python work/blender/pericardium.py
 *   node work/heart-atlas-check.mjs
 *
 * Writes work/.heart-build/heart.obj (ignored): the four chamber walls and the roots of the aorta, pulmonary trunk
 * and venae cavae from outputs/heart/heart-manifest.json and heart-meshes.bin, in the atlas's own frame, untouched.
 * work/blender/pericardium.py builds the layers round them and writes outputs/heart/pericardium.json and .bin.
 * NOT a build step: nothing in the app runs this.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const HEART = join(ROOT, 'outputs', 'heart');
const OUT = join(ROOT, 'work', '.heart-build');

const manifest = JSON.parse(readFileSync(join(HEART, 'heart-manifest.json'), 'utf8'));
const bin = readFileSync(join(HEART, 'heart-meshes.bin'));
const buf = bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength);
const WANT = { wall: ['LA', 'LV', 'RA', 'RV'], aorta: ['AO'], pa: ['PT'], cava: ['SVC', 'IVC'] };

let obj = '', base = 1, n = 0;
for (const d of manifest.meshes) {
  if (!(WANT[d.group] || []).includes(d.key)) continue;
  const pos = new Float32Array(buf, d.positionOffset, d.positionCount), idx = new Uint32Array(buf, d.indexOffset, d.indexCount);
  obj += `o ${d.group}_${d.key}\n`;
  for (let i = 0; i < pos.length; i += 3) obj += `v ${pos[i]} ${pos[i + 1]} ${pos[i + 2]}\n`;
  for (let i = 0; i < idx.length; i += 3) obj += `f ${idx[i] + base} ${idx[i + 1] + base} ${idx[i + 2] + base}\n`;
  base += pos.length / 3;
  n++;
}
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'heart.obj'), obj);
console.log(`wrote work/.heart-build/heart.obj (${n} meshes)`);
