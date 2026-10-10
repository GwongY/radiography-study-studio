import assert from 'node:assert/strict';
import { MESH_INDEX, UNITS } from '../outputs/mesh-index.js';
import { VIEWER_LECTURE_NAMES, VIEWER_LECTURE_SOURCES, lectureRow } from '../outputs/viewer-lecture-names.js';

const sources=new Map(VIEWER_LECTURE_SOURCES.map(s=>[s.file,s]));
assert.equal(sources.size,13);
assert.equal(new Set(VIEWER_LECTURE_NAMES.map(n=>n.layer+'|'+n.name)).size,VIEWER_LECTURE_NAMES.length);
for(const n of VIEWER_LECTURE_NAMES){
  assert(sources.has(n.file)&&n.page>=1&&n.page<=sources.get(n.file).pages,`${n.name}: missing source page`);
  assert(MESH_INDEX.some(r=>r.layer===n.layer&&r.name===n.name)||UNITS.some(u=>u.layer===n.layer&&u.label===n.name),`${n.name}: no model structure or family`);
}
const rows=MESH_INDEX.map(lectureRow);
const promoted=rows.filter((r,i)=>r.unitId!==MESH_INDEX[i].unitId);
assert.equal(promoted.length,66);
assert.equal(new Set(promoted.map(r=>r.layer+'|'+r.unitId)).size,promoted.length);
for(let i=0;i<rows.length;i++){
  const original=MESH_INDEX[i],r=rows[i];
  if(original.unitKind==='course')assert.equal(r.unitId,original.unitId,'existing course/progress identity changed');
  if(r.unitId!==original.unitId)assert(r.lectureSource&&r.unitKind==='course'&&r.unitSize===1&&r.isUnit);
}
for(const term of ['metacarpal','metatarsal','phalanx']){
  const set=rows.filter(r=>r.layer==='skeleton'&&r.name.toLowerCase().includes(term));
  assert(set.length&&set.every(r=>r.unitKind==='course'&&r.unit===r.name),`${term}: still swallowed by an atlas family`);
}
for(const name of ['Metacarpophalangeal joints','Metatarsophalangeal joints'])
  assert(rows.some(r=>r.unit===name&&r.lectureSource?.evidence==='joint represented by articular capsule'));
const deep=MESH_INDEX.find(r=>r.name==='Dorsal scaphotriquetral ligament');
assert.equal(lectureRow(deep).unitId,deep.unitId,'unnamed detail promoted without lecture evidence');
console.log(`PASS: ${VIEWER_LECTURE_NAMES.length} cited names, ${promoted.length} restored identities; previous course IDs preserved.`);
