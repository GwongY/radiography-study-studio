import assert from 'node:assert/strict';
import {muscleProfile,deformMuscle} from '../outputs/physiology-shape.js';
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>a.map(x=>x/Math.hypot(...a));
let samples=0,maxOrthogonality=0,maxDeterminantError=0;
for(const axis of [[0,1,0],unit([1,2,3]),unit([-3,1,2])]){
 const shape={axis,centre:[.2,-.4,.7],length:2,amount:.11};
 const radial=unit(cross(axis,[1,0,0]));
 for(const amplitude of [0,.2,.5,1,2.5])for(let j=-110;j<=110;j++){
  const along=j/100,position=shape.centre.map((v,i)=>v+along*axis[i]+.2*radial[i]);
  const normal=unit([.3,.5,.8]);
  const t1=unit(cross(normal,[1,0,0])),t2=cross(normal,t1);
  const before=JSON.stringify({position,normal,shape});
  const result=deformMuscle(position,normal,shape,amplitude);
  assert.equal(JSON.stringify({position,normal,shape}),before);
  if(amplitude===0||Math.abs(along)>1.001){assert.deepEqual(result.position,position);assert.deepEqual(result.normal,normal);}
  const h=1e-7;
  const derivative=t=>{const plus=deformMuscle(position.map((v,i)=>v+h*t[i]),normal,shape,amplitude).position;
   const minus=deformMuscle(position.map((v,i)=>v-h*t[i]),normal,shape,amplitude).position;
   return plus.map((v,i)=>(v-minus[i])/(2*h));};
  for(const t of [t1,t2])maxOrthogonality=Math.max(maxOrthogonality,Math.abs(dot(result.normal,derivative(t))));
  const cols=[[1,0,0],[0,1,0],[0,0,1]].map(derivative);
  maxDeterminantError=Math.max(maxDeterminantError,Math.abs(dot(cols[0],cross(cols[1],cols[2]))-1));
  const profile=muscleProfile(along,2,amplitude*.11);
  assert(profile.axialDerivative>=.75-1e-12);assert(Math.abs(result.determinant-1)<1e-12);samples++;
 }
 const end=shape.centre.map((v,i)=>v+axis[i]);
 assert(Math.hypot(...deformMuscle(end,[0,1,0],shape,1).position.map((v,i)=>v-end[i]))<1e-12);
}
assert(maxOrthogonality<1e-7);assert(maxDeterminantError<1e-7);
const belly=muscleProfile(0,2,.11);assert(belly.radialScale>1);assert(belly.axialDerivative<1);
console.log(JSON.stringify({pass:true,samples,maxOrthogonality,maxDeterminantError}));


import {principalMuscleAxis,deriveMuscleShape} from '../outputs/physiology-shape.js';
import {loadGlbMeshes} from './glb-mesh.mjs';
import {LAYERS} from './lib/mesh-names.mjs';
const box=[-5,-.4,-.3,5,-.4,-.3,5,.4,-.3,-5,.4,-.3,-5,-.4,.3,5,-.4,.3,5,.4,.3,-5,.4,.3];
const triangles=[0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,7,6,3,6,2,0,4,7,0,7,3,1,2,6,1,6,5];
const rotate=([x,y,z])=>[.6*x-.8*y,.8*x+.6*y,z];
const rotated=[];for(let i=0;i<box.length;i+=3)rotated.push(...rotate(box.slice(i,i+3)));
const base=principalMuscleAxis(box,triangles),oblique=principalMuscleAxis(rotated,triangles);
assert(Math.abs(dot(oblique.axis,[.6,.8,0]))>1-1e-12);
for(let i=0;i<3;i++)assert(Math.abs(base.eigenvalues[i]-oblique.eigenvalues[i])<1e-12);
assert(Math.abs(oblique.length-10)<1e-12);
// Subdivide one triangle, retaining exactly its surface. Dense vertices must not bias PCA.
const refined=box.slice(),ids=triangles.slice(3),tri=triangles.slice(0,3);
const midpoint=tri.map(i=>box.slice(i*3,i*3+3)).reduce((s,v)=>s.map((x,i)=>x+v[i]/3),[0,0,0]);
refined.push(...midpoint);ids.push(tri[0],tri[1],8,tri[1],tri[2],8,tri[2],tri[0],8);
const subdivision=principalMuscleAxis(refined,ids);
assert(Math.abs(dot(base.axis,subdivision.axis))>1-1e-12);
for(let i=0;i<3;i++)assert(Math.abs(base.eigenvalues[i]-subdivision.eigenvalues[i])<1e-12);
assert.equal(principalMuscleAxis([0,0,0,0,0,0,0,0,0]),null);
assert.equal(principalMuscleAxis([NaN,0,0]),null);
const synthetic={positions:rotated,indices:triangles,rule:{contract:.1},context:{name:'Sartorius_musclel'}};
assert.deepEqual(deriveMuscleShape(synthetic).capabilities,['principal-muscle-axis']);
assert.deepEqual(deriveMuscleShape({...synthetic,context:{name:'Deltoid'}}).capabilities,[]);
const real=[];
for(const mesh of loadGlbMeshes(LAYERS.find(([key])=>key==='muscle')[1])){
 if(!/sartorius_muscle[lr]$|head_of_biceps_brachii[lr]$/i.test(mesh.name)||/bursa/i.test(mesh.name))continue;
 const input={positions:mesh.positions,indices:mesh.indices,rule:{contract:.1},context:{name:mesh.name}};
 const shape=deriveMuscleShape(input),fit=principalMuscleAxis(mesh.positions,mesh.indices);
 real.push({name:mesh.name,axis:shape.axis,eigenvalues:fit.eigenvalues,eligible:!!shape.capabilities.length});
}
assert.equal(real.length,6);assert(real.filter(x=>x.eligible).length>=2);
console.log(JSON.stringify({pass:true,principalAxisFixtures:real},null,2));
