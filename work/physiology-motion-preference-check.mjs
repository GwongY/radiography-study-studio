import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('outputs/studio/live-physiology.js','utf8');
const setter=source.slice(source.indexOf('export function setPhysiology('),source.indexOf('/* The live/static transition')).replace('export ','');
const init=source.slice(source.lastIndexOf('export function init()')).replace('export ','');
for(const api of ['modern','legacy','absent'])for(const reduced of [false,true]){
  const listeners=new Set();let events=0;
  const media={matches:reduced};
  if(api==='modern'){media.addEventListener=(_,f)=>listeners.add(f);media.removeEventListener=(_,f)=>listeners.delete(f);}
  if(api==='legacy'){media.addListener=f=>listeners.add(f);media.removeListener=f=>listeners.delete(f);}
  const state={};
  const ctx=vm.createContext({state,prefersStill:()=>api!=='absent'&&media.matches,
    ...(api==='absent'?{}:{matchMedia:()=>media}),
    applyConnectiveVisibility:()=>{},CustomEvent:class {},window:{dispatchEvent:()=>events++}});
  vm.runInContext(setter+'\n'+init+'\ninit();',ctx);
  const set=(on,explicit=false)=>ctx.setPhysiology(on,explicit);
  assert.equal(state.flow.on,api==='absent'||!reduced);
  assert.equal(state.flow.uOn.value,Number(state.flow.on));
  set(true);assert.equal(state.flow.on,api==='absent'||!reduced,'preset cannot bypass initial reduce');
  set(true,true);assert.equal(state.flow.on,true,'explicit Live works');
  set(false,true);assert.equal(state.flow.on,false);
  if(api!=='absent'){
    const change=matches=>{media.matches=matches;for(const f of listeners)f({matches});};
    change(false);assert.equal(state.flow.on,false,'no automatic restart');
    set(true,true);state.flow.blend=1;state.flow.uOn.value=1;
    state.flow.classes={muscle:{uDeform:{value:1}}};
    state.flow.motors={arm:{uDeform:{value:1}}};state.flow.activity=[{uDeform:{value:1}}];
    change(true);
    assert.equal(state.flow.on,false);assert.equal(state.flow.blend,0);assert.equal(state.flow.uOn.value,0);
    assert.equal(state.flow.classes.muscle.uDeform.value,0);assert.equal(state.flow.motors.arm.uDeform.value,0);assert.equal(state.flow.activity[0].uDeform.value,0);
    set(true);assert.equal(state.flow.on,false,'Spread restore cannot bypass changed preference');
    set(true,true);assert.equal(state.flow.on,true,'new explicit Live overrides');
    ctx.init();assert.equal(listeners.size,1,'reinitialisation removes old listener');
  }
  assert.ok(events>0);
}
console.log('PASS: reduced-motion defaults, explicit choices, OS changes, immediate uniforms, presets/restoration and listener cleanup.');
