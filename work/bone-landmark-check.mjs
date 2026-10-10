/* Bone labels: actual geometry signatures, source pages/quotes and refusal on drift. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { BONE_LANDMARKS, BONE_LANDMARK_MODEL_HASH, boneLandmarkKey, surfaceLandmarks } from '../outputs/bone-landmarks.js';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { citationEvidence } from './lib/source-lesson-map.mjs';
import { SOURCE_FILES } from '../outputs/study/corpus/schema.js';

assert.equal(createHash('sha256').update(readFileSync('outputs/assets/z-anatomy-skeleton.glb')).digest('hex'), BONE_LANDMARK_MODEL_HASH);
const sources=JSON.parse(readFileSync('work/source-text.json','utf8')).sources;
const meshes=loadGlbMeshes('assets/z-anatomy-skeleton.glb');
function localPosition(m,i) {
  // Invert the full node transform: the patella includes a small rotation.
  const [a,b,c,d,e,f,g,h,j]=[m.matrix[0],m.matrix[4],m.matrix[8],m.matrix[1],m.matrix[5],m.matrix[9],m.matrix[2],m.matrix[6],m.matrix[10]];
  const det=a*(e*j-f*h)-b*(d*j-f*g)+c*(d*h-e*g);
  assert(Math.abs(det)>1e-15,`${m.name}: singular node transform`);
  const [x,y,z]=[0,1,2].map(k=>m.positions[i*3+k]-m.matrix[12+k]);
  return [((e*j-f*h)*x+(c*h-b*j)*y+(b*f-c*e)*z)/det,
    ((f*g-d*j)*x+(a*j-c*g)*y+(c*d-a*f)*z)/det,
    ((d*h-e*g)*x+(b*g-a*h)*y+(a*e-b*d)*z)/det];
}
let names=0, sides=0;
for(const [key,spec] of Object.entries(BONE_LANDMARKS)) {
  assert.equal(new Set(spec.points.map(p=>p.name.toLowerCase().trim())).size,spec.points.length,`${key}: duplicate named feature`);
  assert.equal(spec.primaryNames.length,Math.min(5,spec.points.length),`${key}: wrong Main count`);
  assert(new Set(spec.primaryNames).size===spec.primaryNames.length,`${key}: duplicate Main name`);
  assert(spec.primaryNames.every(name=>spec.points.some(p=>p.name===name)),`${key}: missing primary feature`);
  for(const variant of spec.variants||[])assert.deepEqual(variant.points.map(p=>p.name),spec.points.filter(p=>Number.isInteger(p.vertex)).map(p=>p.name),`${key}: asymmetric bone lost a feature`);
  for(const point of spec.points) {
    assert(SOURCE_FILES[point.sourceRef.ref],`${point.name}: unregistered source`);
    assert(['hss.ul.2026','hss.ll.2026','hss.msk.2026','hss.hnt.2026'].includes(point.sourceRef.ref),`${point.name}: outside the supplied lecture scope`);
    assert(citationEvidence(point.sourceRef,sources[point.sourceRef.ref]).ok,`${point.name}: invalid source citation`);
    if(point.sourceRef.diagramLabel)assert(typeof point.sourceRef.diagramLabel==='string'&&point.sourceRef.diagramLabel.trim().length,`${point.name}: missing reviewed diagram transcription`);
    names++;
    if(point.part) assert(meshes.some(m=>boneLandmarkKey(m.name)===point.part),`${point.name}: no actual sinus mesh`);
  }
  if(!spec.vertices)continue;
  for(const m of meshes.filter(m=>boneLandmarkKey(m.name,/[lr]$/.test(m.name)?'paired':null)===key)) {
    const localAt=i=>localPosition(m,i);
    assert.equal(surfaceLandmarks(key,m.positions.length/3,localAt).length,spec.points.filter(p=>Number.isInteger(p.vertex)).length,`${m.name}: runtime signature refuses real geometry`);
    sides++;
    assert.deepEqual(surfaceLandmarks(key,m.positions.length/3+1,localAt),[],`${m.name}: reordered model must refuse`);
    const corrupted=i=>localAt(i).map(x=>x+.002);
    assert.deepEqual(surfaceLandmarks(key,m.positions.length/3,corrupted),[],`${m.name}: shifted annotation must refuse`);
  }
}
assert.equal(boneLandmarkKey('Femur','left'),'femur');
assert.equal(boneLandmarkKey('Femurr','right'),'femur');
assert.equal(boneLandmarkKey('Frontal_bone_1',null),'frontal bone');
assert.equal(BONE_LANDMARKS.femur.points.length,10,'femur must keep only the ten highlighted features');
assert.equal(BONE_LANDMARKS.humerus.points.length,12,'humerus must keep highlighted and explicitly identified features');
for(const [key,removed] of [['femur',['Fovea capitis','Pectineal line','Intercondylar fossa','Linea aspera']],['humerus',['Radial fossa','Coronoid fossa','Intertubercular sulcus','Medial supracondylar ridge']]])
  assert(!BONE_LANDMARKS[key].points.some(p=>removed.includes(p.name)),`${key}: background diagram details leaked into Parts`);
assert(BONE_LANDMARKS['frontal bone'].points.some(p=>p.name==='Supraorbital notch'),'current lecture frontal terminology missing');
assert(!BONE_LANDMARKS['frontal bone'].points.some(p=>p.name==='Supraorbital foramen'),'older frontal terminology leaked');
assert(['Pterion','Asterion'].every(n=>BONE_LANDMARKS['parietal bone'].points.some(p=>p.name===n)),'current lecture cranial junctions missing');
assert.deepEqual(surfaceLandmarks('calcaneus',200,()=>[0,0,0]),[]);
assert.equal(sides,meshes.filter(m=>BONE_LANDMARKS[boneLandmarkKey(m.name,/[lr]$/.test(m.name)?'paired':null)]?.vertices).length,'every curated bone and paired side must be checked');
assert(sides>=30,'lecture-backed skull and limb coverage missing');
console.log(`PASS: ${names} source-backed names, ${sides} real bone meshes, actual sinuses, and geometry-drift refusals`);
