// Regression gate for current session-step retention and unrelated study helpers.
import assert from 'node:assert/strict';
const mem = new Map();
globalThis.localStorage = {getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,String(v)),removeItem:k=>mem.delete(k)};
const el=()=>({classList:{add(){},remove(){},toggle(){}},style:{},addEventListener(){},setAttribute(){},appendChild(){}});
globalThis.document={getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],createElement:el,addEventListener(){},body:el(),documentElement:el()};
globalThis.window=globalThis;
globalThis.location={origin:'http://localhost',pathname:'/',search:'',hash:''};
globalThis.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
globalThis.addEventListener=()=>{};
const {saveContinue,getItemStep}=await import('../outputs/study/home.js');
const {STORAGE_PREFIX}=await import('../outputs/study/imports.js');
for(const [step,want] of [['practise','practise'],['apply','apply'],['practise','apply']]){
  saveContinue('stage-regression',step);assert.equal(getItemStep('stage-regression'),want);
}
localStorage.setItem('rss-step:legacy',JSON.stringify('learn'));
localStorage.setItem(STORAGE_PREFIX+'step:legacy',JSON.stringify('apply'));
assert.equal(getItemStep('legacy'),'apply');
saveContinue('legacy','remember');assert.equal(getItemStep('legacy'),'apply');
console.log('PASS: Practise and Apply retain their highest saved step; legacy names are ignored');
const {breathEnvelope}=await import('../outputs/physiology.js');
const cycle=60/14;
for(const phase of [0,.4,1])assert(Math.abs(breathEnvelope((phase+1e-7)*cycle)-breathEnvelope((phase+1-1e-7)*cycle))<1e-5);
console.log('PASS: breathing is continuous at inhalation, exhalation and cycle boundaries');
const {expandQuery,compositeFor}=await import('../outputs/synonyms.js');
assert.equal(compositeFor('carpals').parts.length,8);
assert.equal(compositeFor('tarsals').parts.length,7);
assert(!expandQuery('scaphoid bone').includes('hamate bone'));
assert(!expandQuery('cornea').includes('retina'));
console.log('PASS: composite groups expand to members without confusing sibling structures');
