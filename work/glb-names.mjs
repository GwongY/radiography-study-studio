/* Dump mesh/node names from a GLB (JSON chunk only). Usage: node work/glb-names.mjs assets/kas.glb [filter] */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');
const rel = process.argv[2];
const filter = (process.argv[3] || '').toLowerCase();
const buf = readFileSync(join(root, rel));
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a glb');
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));
const names = new Set();
for (const n of json.nodes || []) if (n.name) names.add(n.name);
for (const m of json.meshes || []) if (m.name) names.add(m.name);
const list = [...names].sort();
const shown = filter ? list.filter((n) => n.toLowerCase().includes(filter)) : list;
console.log(`${rel}: ${list.length} names${filter ? `, ${shown.length} match "${filter}"` : ''}`);
for (const n of shown) console.log('  ' + n);
