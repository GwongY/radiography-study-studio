/* Course-only replacement gate: removed surface plus retained packing algorithm. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createExplosionLayout } from '../outputs/studio/explosion-layout.js';
import { LAYERS, boxesIn } from './lib/mesh-names.mjs';
import { runInNewContext } from 'node:vm';
for(const path of ['outputs/atlas','outputs/studio/atlas-source.js','work/atlas-source','work/build-atlas-viewer.mjs'])
  assert.equal(existsSync(path),false,`${path} must remain removed`);
for(const path of ['outputs/radiography-study-studio.html','outputs/study/what-is-under.js','outputs/sw.js'])
  assert.doesNotMatch(readFileSync(path,'utf8'),/viewerAtlasPane|modelSourceTabs|\.\/atlas\/|Full atlas|Human Atlas/);
const sets=LAYERS.map(([system,file])=>[...boxesIn(file)].map(([name,bounds])=>({id:`${system}:${name}`,system,bounds})));
sets.push(sets.flat());sets.push([]);
let layouts=0;
for(const parts of sets)for(const aspect of [.5,1,1.5]){
  const a=createExplosionLayout(parts,aspect),b=createExplosionLayout(parts,aspect);
  assert.deepEqual(a,b,'packing must be deterministic');
  assert.equal(a.cells.size,parts.length);
  const cells=[...a.cells.values()];
  for(let i=0;i<cells.length;i++)for(let j=0;j<i;j++){
    const x=cells[i],y=cells[j];
    assert.ok(Math.abs(x.x-y.x)>=(x.width+y.width)/2-1e-9||Math.abs(x.y-y.y)>=(x.height+y.height)/2-1e-9,'packed cells overlap');
  }
  layouts++;
}
let activate;
const removed=[];
const requests=['https://app.test/atlas/models/body-0.bin.gz','https://app.test/assets/kas.glb','https://other.test/atlas/models/body-0.bin.gz'].map(url=>({url}));
runInNewContext(readFileSync('outputs/sw.js','utf8'),{
  URL,console,
  self:{location:{origin:'https://app.test'},clients:{claim:async()=>{}},addEventListener:(name,fn)=>{if(name==='activate')activate=fn;}},
  caches:{keys:async()=>[],open:async()=>({keys:async()=>requests,delete:async request=>{removed.push(request.url);}})},
});
let activation;activate({waitUntil:promise=>{activation=promise;}});await activation;
assert.deepEqual(removed,[requests[0].url],'migration must purge only obsolete local model data');
console.log(`ALL PASS: no alternate atlas surface/data; ${layouts} deterministic, non-overlapping layouts over course GLB bounds; obsolete model cache cleanup.`);
