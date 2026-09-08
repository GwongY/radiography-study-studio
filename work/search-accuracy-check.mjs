// Exercise the actual UI search, including every generated name.
import assert from 'node:assert/strict';
const el=()=>({classList:{add(){},remove(){},toggle(){}},style:{},addEventListener(){},setAttribute(){},appendChild(){}});
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.document={getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],createElement:el,addEventListener(){},body:el(),documentElement:el()};
globalThis.window=globalThis;
globalThis.location={origin:'http://localhost',pathname:'/',search:'',hash:''};
globalThis.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
globalThis.addEventListener=()=>{};
const {searchHits}=await import('../outputs/study/global-search-one.js');
const {MESH_INDEX}=await import('../outputs/mesh-index.js');
const {matchesSearch,exactSearch}=await import('../outputs/search-name.js');
const failed=[];
for(const row of MESH_INDEX){
  const hits=searchHits(row.name).slice(0,30);
  if(!hits.some(h=>h.kind==='Structure'&&exactSearch(h.title,row.name)))failed.push(row.name);
}
assert.deepEqual(failed,[],'full model names must remain individually accessible');
for(const [q,name] of [['1st metacarpal','First metacarpal bone'],['axillary nerve','Axillary nerve'],['femoral nerve','Femoral nerve'],['triquetral','Triquetrum'],['heel bone','Calcaneus']]){
  assert(searchHits(q).slice(0,10).some(h=>exactSearch(h.title,name)),`${q} missing ${name}`);
}
assert(!matchesSearch('Maxillary nerve','axillary nerve'));
assert(!matchesSearch('Metatarsal bone','tarsal'));
assert(matchesSearch('First rib','1st ribs'));
for(const q of ['carpus','tarsus','metacarpals','metatarsals','rotator cuff','quadriceps','hamstrings','biceps femoris','lungs','colon']){
  assert(searchHits(q)[0]?.kind==='Composite',`${q} should lead with its modelled parts`);
}
for(const side of ['left','right']){
  const opposite=side==='left'?'right':'left';
  assert(!searchHits(`${side} kidney`).some(h=>h.kind==='Structure'&&h.title.toLowerCase().includes(opposite)));
}
console.log(`PASS: all ${MESH_INDEX.length} exact structure names, grouped structures, ordinals, aliases, sides and substring collisions`);
