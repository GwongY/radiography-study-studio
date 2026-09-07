import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import {createExplosionLayout} from '../outputs/atlas/explosion-layout.js';
const atlas=JSON.parse(readFileSync('outputs/atlas/models/atlas.json','utf8'));
assert.equal(atlas.parts.length,2234);assert.equal(atlas.concepts.length,3432);
const ids=new Set(atlas.parts.map(p=>p.id));assert.equal(ids.size,2234);
const buffers=atlas.chunks.map(c=>{const compressed=readFileSync('outputs/atlas/models/'+c.gzip.split('/').pop());assert.equal(compressed.length,c.gzipBytes);const b=gunzipSync(compressed);assert.equal(b.length,c.bytes);return b;});
let triangles=0;
for(const p of atlas.parts){
  assert.ok(p.name&&p.conceptId);const b=buffers[p.chunk];
  assert.ok(p.positions>=0&&p.positions+p.vertexCount*12<=b.length);
  assert.ok(p.normals>=0&&p.normals+p.vertexCount*6<=b.length);
  assert.ok(p.indices>=0&&p.indices+p.indexCount*4<=b.length);
  for(let i=0;i<p.indexCount;i++)assert.ok(b.readUInt32LE(p.indices+i*4)<p.vertexCount);
  for(let axis=0;axis<3;axis++)assert.ok(Number.isFinite(p.bounds[0][axis])&&p.bounds[0][axis]<=p.bounds[1][axis]);
  triangles+=p.indexCount/3;
}
assert.equal(triangles,atlas.triangles);
for(const c of atlas.concepts)for(const id of c.elements)assert.ok(ids.has(id),`${c.id}: ${id}`);
for(const aspect of [.5,1,1.8])for(const parts of [atlas.parts,atlas.parts.filter(p=>p.system==='skeletal'),atlas.parts.filter(p=>p.system==='sensory')]){
  const layout=createExplosionLayout(parts,aspect),cells=[...layout.cells.values()];assert.equal(cells.length,parts.length);
  for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++){
    const a=cells[i],b=cells[j];
    assert.ok(Math.abs(a.x-b.x)>=(a.width+b.width)/2-1e-9||Math.abs(a.y-b.y)>=(a.height+b.height)/2-1e-9,'Packed pieces overlap');
  }
}
assert.equal(createExplosionLayout([]).cells.size,0);
console.log(`PASS: ${ids.size} meshes, ${atlas.concepts.length} concepts, ${triangles} triangles; all 15 chunks intact; nine layouts do not overlap.`);
