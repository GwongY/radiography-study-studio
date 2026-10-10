/* Bone landmark curation: vertex indices were inspected on the shipped skeleton.
 * Names are course-backed; positions are app-authored annotations, not source measurements.
 * Reordering or replacing the GLB requires a fresh visual review, never a blind rebuild.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { loadGlbMeshes } from './glb-mesh.mjs';
import { citationEvidence } from './lib/source-lesson-map.mjs';
import { ADDITIONAL_BONE_LANDMARKS, PRIMARY_BONE_LANDMARKS } from './bone-landmark-additions.mjs';

const model = 'outputs/assets/z-anatomy-skeleton.glb';
const stamp = 'd7d08a44b1020f1096dcc6364068eac6ba672986e98c992597878034b17b7040';
if (createHash('sha256').update(readFileSync(model)).digest('hex') !== stamp)
  throw new Error('Skeleton changed: review landmark positions before rebuilding.');
const meshes = loadGlbMeshes('assets/z-anatomy-skeleton.glb');
const sources = JSON.parse(readFileSync('work/source-text.json', 'utf8')).sources;

// [display name, vertex or native-body target, source ref, page, quote or reviewed diagram label]
// Targets select a real vertex once, offline; the runtime never guesses from a box.
const entries = [
  ['femur', 'Femurl', [
    ['Head', {at:512,also:[[.058,.87,.009]]}, 'hss.ll.2026', 16, 'Head of femur'],
    ['Neck', {at:458,also:[[.083,.845,.008]]}, 'hss.ll.2026', 7, {diagram:'Neck'}],
    ['Greater trochanter', {at:60,also:[[.135,.852,.002]]}, 'hss.ll.2026', 7, {diagram:'Greater trochanter'}],
    ['Lesser trochanter', 345, 'hss.ll.2026', 7, {diagram:'Lesser trochanter'}],
    ['Medial condyle', {at:215,also:[[.064,.451,-.047]]}, 'hss.ll.2026', 7, {diagram:'Medial condyle'}],
    ['Lateral condyle', {at:20,also:[[.106,.453,-.05]]}, 'hss.ll.2026', 7, {diagram:'Lateral condyle'}],
  ]],
  ['hip bone', 'Hip_bonel', [
    ['Iliac crest', 703, 'hss.ll.2026', 5, 'Iliac crest'],
    ['Ilium', [.11,.973,-.012], 'hss.ll.2026', 6, 'Ilium'],
    ['Ischium', 13, 'hss.ll.2026', 6, 'Ischium'],
    ['Pubis', 62, 'hss.ll.2026', 6, 'Pubis'],
    ['Acetabulum', 374, 'hss.ll.2026', 6, {diagram:'Acetabulum'}],
  ]],
  ['humerus', 'Humerusl', [
    ['Head', {at:406,also:[[.173119,1.386956,-.002291]]}, 'hss.ul.2026', 7, 'Head of humerus'],
    ['Surgical neck', {at:[.19,1.355,-.042],also:[[.178951,1.35572,-.014129]]}, 'hss.ul.2026', 6, {diagram:'Surgical neck'}],
    ['Shaft', {at:[.205,1.25,-.037],also:[[.20592,1.264883,-.020387]]}, 'hss.ul.2026', 6, 'Shaft'],
    ['Medial epicondyle', 221, 'hss.ul.2026', 6, 'M & l epicondyles'],
    ['Lateral epicondyle', {at:12,also:[[.24667,1.109621,-.029221]]}, 'hss.ul.2026', 6, 'M & l epicondyles'],
  ]],
  ['scapula', 'Scapulal', [
    ['Acromion', 895, 'hss.ul.2026', 4, {diagram:'Acromion'}],
    ['Coracoid process', 644, 'hss.ul.2026', 4, {diagram:'Coracoid process'}],
    ['Glenoid cavity', [.168,1.374,-.029], 'hss.ul.2026', 4, {diagram:'Glenoid cavity'}],
  ]],
  ['tibia', 'Tibial', [
    ['Medial condyle', 115, 'hss.ll.2026', 9, 'Medial tibial condyle'],
    ['Lateral condyle', 299, 'hss.ll.2026', 9, 'Lateral tibial condyle'],
    ['Medial malleolus', 22, 'hss.ll.2026', 10, 'Medial malleolus'],
  ]],
  ['fibula', 'Fibulal', [
    ['Lateral malleolus', [.112,.057,-.041], 'hss.ll.2026', 10, 'Lateral malleolus'],
  ]],
  ['radius', 'Radiusl', [
    ['Head', [.209,1.093,.014], 'hss.ul.2026', 8, {diagram:'Head of radius'}],
    ['Neck', {at:150,also:[[.23611,1.07641,-.03578]]}, 'hss.ul.2026', 8, {diagram:'Neck of radius'}],
  ]],
  ['ulna', 'Ulnal', [
    ['Trochlear notch', 145, 'hss.ul.2026', 8, {diagram:'Trochlear notch'}],
  ]],
  ['occipital bone', 'Occipital_bone', [
    ['Foramen magnum', 692, 'hss.hnt.2026', 19, 'Foramen magnum'],
  ]],
];

function localPoint(m, vertex) {
  const p = Array.from(m.positions.slice(vertex * 3, vertex * 3 + 3));
  const a = [0,1,2].map(r => [m.matrix[r],m.matrix[4+r],m.matrix[8+r],p[r]-m.matrix[12+r]]);
  for (let i=0;i<3;i++) {
    const pivot = a[i][i];
    for (let j=i;j<4;j++) a[i][j]/=pivot;
    for (let k=0;k<3;k++) if(k!==i) {
      const f=a[k][i];for(let j=i;j<4;j++) a[k][j]-=f*a[i][j];
    }
  }
  return a.map(row=>Number(row[3].toFixed(6)));
}
function vertexAt(m, target) {
  if (typeof target === 'number') return target;
  const options=Array.isArray(target)?{at:target}:target;
  if(typeof options.at==='number')return options.at;
  const neighbours=(options.against||[]).map(name=>{
    const neighbour=meshes.find(m=>m.name===name);
    if(!neighbour)throw new Error(`Missing suture neighbour ${name}`);
    return neighbour;
  });
  if(options.facing&&!m.landmarkNormals) {
    m.landmarkNormals=Array.from({length:m.positions.length/3},()=>[0,0,0]);
    const a=m.matrix;
    const parity=Math.sign(a[0]*(a[5]*a[10]-a[9]*a[6])-a[4]*(a[1]*a[10]-a[9]*a[2])+a[8]*(a[1]*a[6]-a[5]*a[2]));
    for(let f=0;f<m.indices.length;f+=3) {
      const ids=Array.from(m.indices.slice(f,f+3)),[a,b,c]=ids.map(i=>Array.from(m.positions.slice(i*3,i*3+3)));
      const u=b.map((x,k)=>x-a[k]),v=c.map((x,k)=>x-a[k]);
      const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
      // A mirrored GLTF node reverses geometric winding. Correct that sign
      // before deciding which side of a thin scapula owns a fossa.
      for(const i of ids)for(let k=0;k<3;k++)m.landmarkNormals[i][k]+=n[k]*parity;
    }
  }
  let best=Infinity, vertex=-1;
  for(let i=0;i<m.positions.length;i+=3) {
    if(options.plane&&Math.abs(m.positions[i+options.plane.axis]-options.plane.value)>options.plane.tolerance)continue;
    if(options.facing) {
      const n=m.landmarkNormals[i/3];
      if(Math.hypot(...n)<1e-15||n.reduce((sum,x,k)=>sum+x*options.facing[k],0)/Math.hypot(...n)/Math.hypot(...options.facing)<.3)continue;
    }
    if(neighbours.some(n=>{
      for(let j=0;j<n.positions.length;j+=3) {
        const d=[0,1,2].reduce((v,k)=>v+(n.positions[j+k]-m.positions[i+k])**2,0);
        if(d<options.within**2)return false;
      }
      return true;
    }))continue;
    const d=options.at.reduce((v,x,k)=>v+(x-m.positions[i+k])**2,0);
    if(d<best){best=d;vertex=i/3;}
  }
  if(vertex<0)throw new Error(`No reviewed joint boundary on ${m.name} near ${JSON.stringify(options)}`);
  return vertex;
}
function sourceRef(ref,page,quote) {
  if(!['hss.ul.2026','hss.ll.2026','hss.msk.2026','hss.hnt.2026'].includes(ref))throw new Error(`Outside supplied lecture scope: ${ref}`);
  const r=typeof quote==='object'
    ? {ref,location:`p${page}: labelled anatomy diagram`,diagramLabel:quote.diagram}
    : {ref,location:`p${page}: "${quote}"`};
  if(typeof quote==='object'&&(!quote.diagram||typeof quote.diagram!=='string'))throw new Error('Diagram label requires a reviewed transcription.');
  if(!citationEvidence(r,sources[ref]).ok) throw new Error(`Unverified landmark name: ${JSON.stringify(r)}`);
  return r;
}
const grouped=new Map();
for(const [key,mesh,points] of [...entries,...ADDITIONAL_BONE_LANDMARKS]) {
  const group=grouped.get(key)||{mesh,points:[]};
  if(group.mesh!==mesh)throw new Error(`Conflicting host mesh for ${key}`);
  group.points.push(...points);if(group.points.length)grouped.set(key,group);
}
const registry = Object.fromEntries([...grouped].map(([key,{mesh:name,points}])=>{
  if(new Set(points.map(p=>p[0].trim().toLowerCase())).size!==points.length)throw new Error(`Duplicate label for ${key}`);
  const m=meshes.find(m=>m.name===name);
  if(!m)throw new Error(`Missing mesh: ${name}`);
  const spec={mesh:name,vertices:m.positions.length/3,points:points.map(([name,target,ref,page,quote])=>{
    const vertex=vertexAt(m,target);
    const result={name,vertex,expected:localPoint(m,vertex),sourceRef:sourceRef(ref,page,quote)};
    if(target.also) result.alternates=target.also.map(t=>{const vertex=vertexAt(m,t);return {vertex,expected:localPoint(m,vertex)}});
    return result;
  })};
  if(name.endsWith('l')) {
    const other=meshes.find(mesh=>mesh.name===name.slice(0,-1)+'r');
    if(!other)throw new Error(`Missing opposite bone: ${name}`);
    const matches=other.positions.length/3===spec.vertices&&spec.points.every(p=>[p,...(p.alternates||[])].every(a=>localPoint(other,a.vertex).every((x,i)=>Math.abs(x-a.expected[i])<.0001)));
    if(!matches) {
      // Cranial bones are asymmetric and have their own topology. Review and
      // pin each opposite marker, rather than reusing the left vertex number.
      const mirror=(a,curation)=>{const target=Array.from(m.positions.slice(a.vertex*3,a.vertex*3+3));target[0]*=-1;
        const options=curation?.against?{at:target,within:curation.within,against:curation.against.map(n=>n.endsWith('l')?n.slice(0,-1)+'r':n.endsWith('r')?n.slice(0,-1)+'l':n)}:target;
        const vertex=vertexAt(other,options);return {vertex,expected:localPoint(other,vertex)};};
      spec.variants=[{mesh:other.name,vertices:other.positions.length/3,points:spec.points.map((p,i)=>{
        const result={name:p.name,...mirror(p,points[i][1]),sourceRef:p.sourceRef};
        if(p.alternates)result.alternates=p.alternates.map(mirror);
        return result;
      })}];
    }
  }
  return [key,spec];
}));
for(const [host,part,name,quote] of [
  ['frontal bone','sinus of frontal bone','Frontal sinus','Frontal sinus'],
  ['sphenoid bone','sinus of sphenoid bone','Sphenoidal sinus','Sphenoidal sinus'],
]) {
  registry[host]||={points:[]};
  registry[host].points.push({name,part,inside:true,sourceRef:sourceRef('hss.msk.2026',11,quote)});
}
for(const [key,spec] of Object.entries(registry)) {
  spec.primaryNames=[...new Set([...(PRIMARY_BONE_LANDMARKS[key]||[]),...spec.points.map(p=>p.name)])].slice(0,5);
  if(spec.primaryNames.length>5||!spec.primaryNames.every(name=>spec.points.some(p=>p.name===name)))throw new Error(`Invalid primary labels for ${key}`);
}

const code=`/* Bone landmarks — curated on the shipped skeleton by work/build-bone-landmarks.mjs.
 * Course citations establish names; mesh-local markers are app-authored annotations.
 * No inferred landmarks on unmapped bones. Changed geometry fails the runtime signature.
 */
export const BONE_LANDMARK_MODEL_HASH = '${stamp}';
export const BONE_LANDMARKS = ${JSON.stringify(registry,null,2)};

export function boneLandmarkKey(name, side) {
  let value=String(name||'').replace(/_/g,' ').toLowerCase().trim();
  value=value.replace(/ \\d+$/,''); // three.js disambiguates Frontal_bone_1
  if(side&&!BONE_LANDMARKS[value]) value=value.replace(/[lr]$/,'').trim();
  return value;
}
export function surfaceLandmarks(key, count, positionAt) {
  const spec=BONE_LANDMARKS[key];
  if(!spec)return [];
  for(const candidate of [spec,...(spec.variants||[])]) {
    if(candidate.vertices!==count)continue;
    const points=candidate.points.filter(p=>Number.isInteger(p.vertex));
    if(points.every(p=>[p,...(p.alternates||[])].every(a=>a.vertex<count&&a.expected.every((x,i)=>Math.abs(x-positionAt(a.vertex)[i])<0.0001))))return points;
  }
  return [];
}
`;
const output=code.replace(/\r?\n/g,'\r\n');
if(process.argv.includes('--check')) {
  if(readFileSync('outputs/bone-landmarks.js','utf8').replace(/\r\n/g,'\n')!==code.replace(/\r\n/g,'\n'))throw new Error('Landmark payload differs from reviewed curation.');
} else writeFileSync('outputs/bone-landmarks.js',output);
console.log(`${Object.keys(registry).length} bone types; ${Object.values(registry).reduce((n,s)=>n+s.points.length,0)} cited landmarks`);
