import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {loadGlbMeshes} from './glb-mesh.mjs';
import {LAYERS} from './lib/mesh-names.mjs';
import {classify,FLOW_CLASSES} from '../outputs/physiology.js';
import {deriveShape} from '../outputs/physiology-shape.js';

// Frozen pre-extraction algorithm. This oracle deliberately keeps bbox axes.
function legacy(bounds,rule,context={}) {
  const {min,max}=bounds,size=max.map((v,i)=>v-min[i]);
  const longest=size.indexOf(Math.max(...size));
  let length=Math.max(size[longest],1e-6),amount;
  const centre=context.sharedCentre||min.map((v,i)=>(v+max[i])/2);
  let axis=[+(longest===0),+(longest===1),+(longest===2)];
  if(rule.mode==='descend'){axis=context.anatomicalUp||[0,1,0];length=Math.abs(axis[0])*size[0]+Math.abs(axis[1])*size[1]+Math.abs(axis[2])*size[2];amount=length*.08;}
  else if(rule.mode==='inflate'){axis=[0,1,0];amount=rule.inflate||.05;}
  else if(rule.mode==='peristalsis')amount=rule.pinch||.18;
  else {const ratio=Math.max(...size)/(Math.min(...size)||1e-4);amount=typeof rule.contract==='number'&&rule.contract>0?rule.contract:Math.min(.11,.03+.014*Math.min(6,ratio));}
  return {axis,centre,length,amount,mode:rule.mode==='pump'?5:rule.mode==='descend'?4:rule.mode==='inflate'?2:rule.mode==='peristalsis'?3:1,capabilities:[]};
}
function boundsOf(p){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<p.length;i++){const j=i%3;min[j]=Math.min(min[j],p[i]);max[j]=Math.max(max[j],p[i]);}return {min,max};}
let tested=0;const modes=new Set();
const fixtures=[];
for(const [layer,file] of LAYERS)for(const mesh of loadGlbMeshes(file)){
  const rule=FLOW_CLASSES[classify(layer,mesh.name)]?.rule;
  if(!rule||!(rule.contract||rule.mode)||rule.match&&!rule.match.test(mesh.name))continue;
  if(/^(Diaphragm|Sartorius_musclel|Jejunum|Left_ventricle)$/.test(mesh.name)){
    const sampleIndices=Array.from({length:12},(_,i)=>Math.floor(i*(mesh.positions.length/3-1)/11));
    fixtures.push({file,name:mesh.name,count:mesh.positions.length/3,indexCount:mesh.indices.length,samples:sampleIndices.map(i=>({i,p:Array.from(mesh.positions.slice(i*3,i*3+3))})),indices:Array.from(mesh.indices.slice(0,24))});
  }
  const before=mesh.positions.slice(),bounds=boundsOf(mesh.positions);
  for(const context of [{},{sharedCentre:[.2,.4,.6],anatomicalUp:[.6,.8,0]}]){
    const expected=legacy(bounds,rule,context);
    assert.deepEqual(deriveShape({positions:mesh.positions,rule,context}),expected,mesh.name);
    assert.deepEqual(deriveShape({bounds,rule,context}),expected,'explicit bounds '+mesh.name);
    modes.add(expected.mode);
  }
  assert.deepEqual(mesh.positions,before,'input mutated');tested++;
}
assert(tested>100);assert.equal(modes.size,5);
for(const bounds of [{min:[0,0,0],max:[0,0,0]},{min:[-1,-2,-3],max:[1,2,3]},{min:[0,0,0],max:[1,1,1]}])for(const mode of ['contract','pump','inflate','descend','peristalsis']){
  const rule={mode};assert.deepEqual(deriveShape({bounds,rule}),legacy(bounds,rule));
}
assert.throws(()=>deriveShape({positions:[],rule:{}}),RangeError);
assert.throws(()=>deriveShape({positions:[NaN,0,0],rule:{}}),RangeError);
assert.throws(()=>deriveShape({positions:[0,1],rule:{}}),RangeError);
assert.throws(()=>deriveShape({bounds:{min:[2,0,0],max:[1,1,1]},rule:{}}),RangeError);
const context={sharedCentre:[1,2,3],anatomicalUp:[0,1,0]},bounds={min:[0,0,0],max:[1,2,3]};
const result=deriveShape({bounds,rule:{mode:'descend'},context});result.axis[0]=9;result.centre[0]=9;
assert.deepEqual(context,{sharedCentre:[1,2,3],anatomicalUp:[0,1,0]},'output aliases context');
console.log(`PASS: ${tested} real deforming meshes; five modes match legacy derivation exactly; inputs immutable; degenerate/invalid cases checked`);
if(process.argv.includes('--fixtures')){
  assert.equal(fixtures.length,4,'decoder fixture names changed');
  writeFileSync(new URL('./physiology-decoder-fixtures.json',import.meta.url),JSON.stringify(fixtures,null,2)+'\n');
}
