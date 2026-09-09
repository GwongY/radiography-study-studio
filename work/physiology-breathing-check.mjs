import assert from 'node:assert/strict';
import {deformBreathing} from '../outputs/physiology-shape.js';
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),unit=a=>a.map(x=>x/Math.hypot(...a));
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
let samples=0,maxError=0,minDet=Infinity;
for(const lung of [false,true])for(const axis of [[0,1,0],unit([1,2,3])])for(const amplitude of [0,.2,.5,1])for(let j=-60;j<=60;j++){
 const shape={axis,centre:[.2,.3,-.4],length:2,amount:lung?.05:.16};
 const radial=unit(cross(axis,[1,0,0])),p=shape.centre.map((v,i)=>v+axis[i]*j/50+radial[i]*.3),n=unit([.3,.4,.5]);
 const out=deformBreathing(p,n,shape,amplitude,lung);
 minDet=Math.min(minDet,out.determinant);assert(out.determinant>0);
 if(!amplitude){assert.deepEqual(out.position,p);assert.deepEqual(out.normal,n);}
 for(const t of [unit(cross(n,[1,0,0])),unit(cross(n,[0,1,0]))]){
  const h=1e-6,plus=deformBreathing(p.map((v,i)=>v+h*t[i]),n,shape,amplitude,lung).position,minus=deformBreathing(p.map((v,i)=>v-h*t[i]),n,shape,amplitude,lung).position;
  maxError=Math.max(maxError,Math.abs(dot(out.normal,plus.map((v,i)=>(v-minus[i])/(2*h)))));
 }
 samples++;
}
assert(maxError<1e-6);
const shape={axis:[0,1,0],centre:[0,1,0],length:2,amount:.05};
const apex=deformBreathing([0,1,0],[0,1,0],shape,1,true).position;
const base=deformBreathing([0,-1,0],[0,1,0],shape,1,true).position;
assert.deepEqual(apex,[0,1,0]);assert(base[1]<-1);
console.log(JSON.stringify({pass:true,samples,maxError,minDet}));
