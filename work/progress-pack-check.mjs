// Regression gate for lesson stage retention and subject access to private packs.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
for(const [step,want] of [['learn','learn'],['remember','remember'],['practise','practise'],['apply','apply'],['learn','apply'],['remember','apply'],['practise','apply']]){
  saveContinue('stage-regression',step);assert.equal(getItemStep('stage-regression'),want);
}
localStorage.setItem('rss-step:legacy',JSON.stringify('learn'));
localStorage.setItem(STORAGE_PREFIX+'step:legacy',JSON.stringify('apply'));
assert.equal(getItemStep('legacy'),'apply');
saveContinue('legacy','remember');assert.equal(getItemStep('legacy'),'apply');
console.log('PASS: stages advance 1/4 through 4/4; earlier visits and conflicting legacy keys cannot lower them');
const {holdPack,packQuestions,packShortQuestions}=await import('../outputs/study/question-pack.js');
const {examPool,markPaper}=await import('../outputs/study/exam-mode.js');
const base={HSS2011:examPool({subject:'HSS2011'}).length,ABCT2326:examPool({subject:'ABCT2326'}).length};
await holdPack({format:'rss.pack',packId:'fixture',questions:[
  {qid:'a',type:'mcq',stem:'Fixture A',subject:'HSS2011',options:[{letter:'A',text:'Fixture'}],answer:'A'},
  {qid:'b',type:'mcq',stem:'Fixture B',bank:'abct2326-bank-v1',options:[{letter:'A',text:'Fixture'}],answer:'A'},
  {qid:'c',type:'short',stem:'Fixture C',bank:'abct2326-bank-v1',answer:'Fixture answer'},
  {qid:'u',type:'mcq',stem:'Unassigned',options:[{letter:'A',text:'Fixture'}],answer:'A'},
]});
for(const code of Object.keys(base)) assert.equal(examPool({subject:code}).length,base[code]+1);
assert.equal(packShortQuestions()[0].subject,'ABCT2326');
assert.equal(markPaper(packQuestions()).rows[1].subject,'ABCT2326');
console.log('PASS: explicit subjects and legacy bank IDs enter only the matching subject paper');
if(process.argv[2]){
  const pack=JSON.parse(readFileSync(process.argv[2],'utf8'));
  await holdPack(pack);
  const mcq=packQuestions(),short=packShortQuestions();
  assert.equal(mcq.length+short.length,pack.questions.length);
  assert(mcq.every(q=>q.subject));assert(short.every(q=>q.subject));
  for(const code of Object.keys(base))assert.equal(examPool({subject:code}).length,base[code]+mcq.filter(q=>q.subject===code).length);
  console.log(`PASS: private bank has ${mcq.length} accessible MCQs and ${short.length} other questions; all assigned by subject`);
}
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
