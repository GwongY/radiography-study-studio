/* Pure rest-space shape derivation and illustrative deformation profiles.
 * The bbox fallback is preserved; geometric axes are not anatomical attachments. */

function vector(value, name) {
  if (!value || value.length !== 3 || !Array.from(value).every(Number.isFinite)) {
    throw new RangeError(`${name} must contain three finite coordinates`);
  }
  return Array.from(value);
}

/**
 * Inputs and returned coordinates share one undeformed local coordinate frame.
 * `bounds` preserves the loader's existing bounds exactly; `positions` is an
 * alternative flat xyz array for offline/Node callers. Explicit bounds win.
 * context.anatomicalUp must already be a unit local-space direction; the
 * Three.js adapter owns transforms/normalisation to preserve its arithmetic.
 * Optional future path/tether fields are absent, not fabricated zero arrays.
 */
export function deriveShape({ positions, bounds, rule = {}, context = {} }) {
  let min, max;
  if (bounds) {
    min = vector(bounds.min, 'bounds.min');
    max = vector(bounds.max, 'bounds.max');
  } else {
    if (!positions?.length || positions.length % 3) throw new RangeError('positions must contain xyz triples');
    min = [Infinity, Infinity, Infinity]; max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < positions.length; i++) {
      const value = positions[i], axis = i % 3;
      if (!Number.isFinite(value)) throw new RangeError('positions must be finite');
      min[axis] = Math.min(min[axis], value); max[axis] = Math.max(max[axis], value);
    }
  }
  if (min.some((v, i) => v > max[i])) throw new RangeError('bounds must be ordered');
  const size = [max[0]-min[0], max[1]-min[1], max[2]-min[2]];
  const longest = size.indexOf(Math.max(...size));
  let length = Math.max(size[longest], 1e-6);
  const centre = context.sharedCentre
    ? vector(context.sharedCentre, 'sharedCentre')
    : [(min[0]+max[0])/2, (min[1]+max[1])/2, (min[2]+max[2])/2];
  let axis, amount;
  if (rule.mode === 'descend') {
    axis = vector(context.anatomicalUp || [0,1,0], 'anatomicalUp');
    length = Math.abs(axis[0])*size[0] + Math.abs(axis[1])*size[1] + Math.abs(axis[2])*size[2];
    amount = length*.08;
  } else if (rule.mode === 'inflate') {
    axis = [0,1,0]; amount = rule.inflate || .05;
  } else {
    axis = [longest===0?1:0, longest===1?1:0, longest===2?1:0];
    if (rule.mode === 'peristalsis') amount = rule.pinch || .18;
    else {
      const ratio = Math.max(...size)/(Math.min(...size)||1e-4);
      amount = typeof rule.contract === 'number' && rule.contract > 0
        ? rule.contract : Math.min(.11,.03+.014*Math.min(6,ratio));
    }
  }
  const mode = rule.mode==='pump'?5:rule.mode==='descend'?4:rule.mode==='inflate'?2:rule.mode==='peristalsis'?3:1;
  return {axis, centre, length, amount, mode, capabilities:[]};
}


/** Illustrative muscle belly map, not measured fibres or attachments.
 * The cubic end weight has zero first/second derivatives at both endpoints.
 * f'(z) drives radial scale, so det(J)=f'(z)*s(z)^2=1 (continuous map).
 * This does not claim exact volume conservation of the tessellated surface.
 */
export function muscleProfile(along, length, activation) {
  const half=Math.max(length,1e-6)/2, x=along/half;
  const a=Math.max(0,Math.min(.25,activation));
  if(a===0||Math.abs(x)>=1)return {axial:along, axialDerivative:1, radialScale:1, radialDerivative:0};
  const x2=x*x, q=1-x2, weight=q*q*q;
  const axialDerivative=1-a*q*q*(1-7*x2);
  const axialSecond=a/half*(18*x-60*x*x2+42*x*x2*x2);
  const radialScale=1/Math.sqrt(axialDerivative);
  return {axial:along*(1-a*weight),axialDerivative,radialScale,
    radialDerivative:-.5*axialSecond*radialScale/axialDerivative};
}

export function deformMuscle(position, normal, shape, amplitude) {
  const {axis,centre,length,amount}=shape;
  const offset=position.map((v,i)=>v-centre[i]);
  const along=offset.reduce((v,x,i)=>v+x*axis[i],0);
  const radial=offset.map((v,i)=>v-along*axis[i]);
  const p=muscleProfile(along,length,amplitude*amount);
  if(p.axial===along&&p.radialScale===1&&p.radialDerivative===0)
    return {position:Array.from(position),normal:Array.from(normal),determinant:1};
  const na=normal.reduce((v,x,i)=>v+x*axis[i],0);
  const nr=normal.map((v,i)=>v-na*axis[i]);
  const shear=radial.reduce((v,x,i)=>v+x*nr[i],0)*p.radialDerivative/p.radialScale;
  const n=nr.map((v,i)=>v/p.radialScale+axis[i]*(na-shear)/p.axialDerivative);
  const norm=Math.hypot(...n);
  return {position:centre.map((v,i)=>v+axis[i]*p.axial+radial[i]*p.radialScale),
    normal:n.map(v=>v/norm),determinant:p.axialDerivative*p.radialScale*p.radialScale};
}

// Same map used in the material's position AND inverse-transpose normal patch.
// Keeping the coefficients shared prevents the two shader paths drifting apart.
export const MUSCLE_SHAPE_GLSL = `
vec4 rssMuscleProfile(float along){
  float halfLength=max(uMLength,0.000001)*.5;
  float x=along/halfLength;
  float a=clamp(uDeform*uMAmt,0.,.25);
  if(a==0.||abs(x)>=1.)return vec4(along,1.,1.,0.);
  float x2=x*x,q=1.-x2;
  float derivative=1.-a*q*q*(1.-7.*x2);
  float second=a/halfLength*(18.*x-60.*x*x2+42.*x*x2*x2);
  float radial=inversesqrt(derivative);
  return vec4(along*(1.-a*q*q*q),derivative,radial,-.5*second*radial/derivative);
}
`;


/** Surface-area moments integrated over triangles, rather than vertex density.
 * Returns a geometric principal axis only. No fibre/attachment inference.
 */
export function principalMuscleAxis(positions, indices) {
  if(!positions?.length||positions.length%3)return null;
  const count=positions.length/3, order=indices||Array.from({length:count},(_,i)=>i);
  if(order.length%3||!Array.from(positions).every(Number.isFinite))return null;
  let area=0;const mean=[0,0,0],second=Array.from({length:3},()=>[0,0,0]);
  // Translate first to avoid subtracting large nearly equal raw moments.
  const origin=Array.from(positions.slice(0,3));
  for(let t=0;t<order.length;t+=3){
    const ids=[order[t],order[t+1],order[t+2]];
    if(ids.some(i=>!Number.isInteger(i)||i<0||i>=count))return null;
    const v=ids.map(i=>origin.map((o,j)=>positions[i*3+j]-o));
    const a=v[1].map((x,i)=>x-v[0][i]),b=v[2].map((x,i)=>x-v[0][i]);
    const weight=Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])/2;
    if(!weight)continue;
    area+=weight;
    const sum=[0,1,2].map(i=>v[0][i]+v[1][i]+v[2][i]);
    for(let i=0;i<3;i++){
      mean[i]+=weight*sum[i]/3;
      for(let j=0;j<3;j++)second[i][j]+=weight*(sum[i]*sum[j]+v.reduce((n,p)=>n+p[i]*p[j],0))/12;
    }
  }
  if(!(area>0))return null;
  for(let i=0;i<3;i++)mean[i]/=area;
  const matrix=second.map((row,i)=>row.map((v,j)=>v/area-mean[i]*mean[j]));
  const vectors=[[1,0,0],[0,1,0],[0,0,1]];
  for(let sweep=0;sweep<32;sweep++){
    let p=0,q=1;
    for(const [i,j] of [[0,2],[1,2]])if(Math.abs(matrix[i][j])>Math.abs(matrix[p][q])){p=i;q=j;}
    if(Math.abs(matrix[p][q])<1e-14*Math.max(...matrix.map((r,i)=>Math.abs(r[i])),1e-30))break;
    const angle=.5*Math.atan2(2*matrix[p][q],matrix[q][q]-matrix[p][p]);
    const c=Math.cos(angle),sn=Math.sin(angle),app=matrix[p][p],aqq=matrix[q][q],apq=matrix[p][q];
    for(let k=0;k<3;k++)if(k!==p&&k!==q){const x=matrix[k][p],y=matrix[k][q];matrix[k][p]=matrix[p][k]=c*x-sn*y;matrix[k][q]=matrix[q][k]=sn*x+c*y;}
    matrix[p][p]=c*c*app-2*sn*c*apq+sn*sn*aqq;
    matrix[q][q]=sn*sn*app+2*sn*c*apq+c*c*aqq;matrix[p][q]=matrix[q][p]=0;
    for(let k=0;k<3;k++){const x=vectors[k][p],y=vectors[k][q];vectors[k][p]=c*x-sn*y;vectors[k][q]=sn*x+c*y;}
  }
  const sorted=[0,1,2].sort((a,b)=>matrix[b][b]-matrix[a][a]);
  const eigenvalues=sorted.map(i=>Math.max(0,matrix[i][i]));
  const axis=vectors.map(row=>row[sorted[0]]);
  // Sign has no effect on this symmetric map; largest component makes it stable.
  const major=axis.reduce((best,v,i)=>Math.abs(v)>Math.abs(axis[best])?i:best,0);
  if(axis[major]<0)for(let i=0;i<3;i++)axis[i]*=-1;
  const centre=mean.map((v,i)=>v+origin[i]);let lo=Infinity,hi=-Infinity;
  for(let i=0;i<count;i++){
    const z=axis.reduce((n,a,j)=>n+a*(positions[i*3+j]-centre[j]),0);
    lo=Math.min(lo,z);hi=Math.max(hi,z);
  }
  return {axis,centre:centre.map((v,i)=>v+axis[i]*(lo+hi)/2),length:hi-lo,eigenvalues};
}

export function deriveMuscleShape(input) {
  const fallback=deriveShape(input);
  // Curated geometric candidates only. Fan-shaped/branched muscles retain the
  // established axis until they have their own reviewed profile.
  if(input.context?.uniformMetric===false)return fallback;
  const name=String(input.context?.name||'').replace(/_/g,' ');
  if(!/^(?:sartorius muscle|(?:long|short) head of biceps brachii)(?:[lr])?$/i.test(name))return fallback;
  const fit=principalMuscleAxis(input.positions,input.indices);
  if(!fit||fit.eigenvalues[0]<4*fit.eigenvalues[1]||fit.eigenvalues[1]>6*fit.eigenvalues[2]||fit.length<1e-6)return fallback;
  return {...fallback,axis:fit.axis,centre:fit.centre,length:fit.length,capabilities:['principal-muscle-axis']};
}


/** Shared superior geometric reference for lung lobes; not a hilum landmark.
 * Directional gains are display parameters, not measured respiratory strain.
 */
export function deriveBreathingShape(input) {
  const shape=deriveShape(input);
  if(input.rule?.mode==='inflate'&&input.context?.lung){
    shape.axis=vector(input.context.anatomicalUp,'anatomicalUp');
    shape.capabilities=['directional-lung'];
  }
  return shape;
}


/* Chamber contraction under a shared tether field (piece 3, constrained).
 *
 * The rejected boundary collar added displacement near the chamber seams; the
 * static valve leaflets cannot yield, so annulus-region wall motion can only
 * penetrate. Measured on the real GLB (work/physiology-heart-discovery.mjs),
 * the leaflet bodies lie against the chamber walls over wide regions that no
 * single axial plane anchors — so the mask is per-vertex PROXIMITY to the
 * measured static set: zero where the wall actually touches a static mesh,
 * rising to full contraction beyond the influence radius.
 *
 * The field is ONE function of position shared by every deforming heart
 * surface (chambers and papillary muscles alike). Sharing it preserves the
 * 5b5355c guarantee in its general form: surfaces moving under the same map
 * keep their rest relationship, provided the map stays a homeomorphism —
 * which the positive-determinant assertion in work/physiology-heart-check.mjs
 * samples for. The per-vertex arrays are samples of that one field, because a
 * vertex shader cannot walk a point set.
 */

/* Per-vertex samples of the field w = smoothstep(dist/radius) against the
 * static point set, with the field's analytic gradient. Both arrays are in
 * ONE common (the moving mesh's local) frame; the caller converts the static
 * vertices and scales the radius. Vertices at or beyond `radius` get w=1 and
 * a zero gradient, which makes deformChamber there exactly the unmasked map.
 * Coincident vertices (w=0) get a zero gradient: smoothstep's derivative is
 * zero there anyway, so this is the limit, not a fudge.
 *
 * maxGrad bounds the shipped gradient. Unclamped, the mask's slope near its
 * midpoint can make the map's Jacobian fold (det J <= 0) — the mechanism that
 * killed the boundary collar. The fold condition is a*|grad|*lambda*|v| < 1
 * with lambda the largest inverse scale of the unmasked part; the caller
 * derives maxGrad from it once for the whole heart, so every mesh samples the
 * SAME clamped field and the maps stay one map.
 */
export function chamberTetherField(positions, staticPositions, radius, maxGrad = Infinity) {
  const count=positions.length/3, statics=staticPositions.length/3;
  const weights=new Float32Array(count).fill(1), gradients=new Float32Array(count*3);
  if(!(radius>0)||!statics)return {weights,gradients};
  const r2=radius*radius;
  for(let i=0;i<count;i++){
    const px=positions[i*3],py=positions[i*3+1],pz=positions[i*3+2];
    let best=r2,bx=0,by=0,bz=0;
    for(let j=0;j<statics;j++){
      const dx=px-staticPositions[j*3],dy=py-staticPositions[j*3+1],dz=pz-staticPositions[j*3+2];
      const d2=dx*dx+dy*dy+dz*dz;
      if(d2<best){best=d2;bx=dx;by=dy;bz=dz;}
    }
    if(best>=r2)continue;
    const d=Math.sqrt(best),x=d/radius;
    weights[i]=x*x*(3-2*x);
    let dw=6*x*(1-x)/radius;
    if(dw>maxGrad)dw=maxGrad;
    if(d>1e-9){
      gradients[i*3]=dw*bx/d;gradients[i*3+1]=dw*by/d;gradients[i*3+2]=dw*bz/d;
    }
  }
  return {weights,gradients};
}

/**
 * The chamber map. `tether` carries this vertex's field sample; null means an
 * untouched field (w=1, zero gradient), which is EXACTLY the map the inline
 * uMode-5 branch shipped before this piece — contraction toward the centre
 * with the axial component weighted .55, and the matching inverse-transpose
 * normal. Where the field is 1 with zero gradient the two agree term for term.
 * The gradient term is the derivative of the spatial weight, without which
 * the normal field would not match the surface it is lit on.
 */
export function deformChamber(position,normal,shape,amplitude,tether=null) {
  const {axis,centre,amount}=shape;
  const a=Math.max(0,Math.min(.25,(Number(amplitude)||0)*amount));
  if(a===0)return {position:Array.from(position),normal:Array.from(normal),determinant:1,jacobian:[1,0,0,0,1,0,0,0,1]};
  const w=tether?tether.weight:1, gw=tether?tether.gradient:[0,0,0];
  const k=a*w;
  const offset=position.map((v,i)=>v-centre[i]);
  const s=offset.reduce((n,v,i)=>n+v*axis[i],0);
  const v=offset.map((d,i)=>d-s*axis[i]+.55*s*axis[i]);
  const moved=position.map((p,i)=>p-k*v[i]);
  /* J[r][c] = dr_c - k*(dr_c - .45*axis[r]axis[c]) - a*gw[c]*v[r], column-major. */
  const jacobian=new Array(9);
  for(let c=0;c<3;c++)for(let r=0;r<3;r++){
    jacobian[c*3+r]=(r===c?1-k:0)+k*.45*axis[r]*axis[c]-a*gw[c]*v[r];
  }
  const col=c=>[jacobian[c*3],jacobian[c*3+1],jacobian[c*3+2]];
  const cross=(p,q)=>[p[1]*q[2]-p[2]*q[1],p[2]*q[0]-p[0]*q[2],p[0]*q[1]-p[1]*q[0]];
  const c0=cross(col(1),col(2)),c1=cross(col(2),col(0)),c2=cross(col(0),col(1));
  const movedN=[0,1,2].map(r=>c0[r]*normal[0]+c1[r]*normal[1]+c2[r]*normal[2]);
  const scale=Math.hypot(...movedN)||1;
  return {position:moved,normal:movedN.map(v2=>v2/scale),determinant:col(0).reduce((n,p,i)=>n+p*c0[i],0),jacobian};
}

// Same map in GLSL, on the MUSCLE_SHAPE_GLSL pattern: written once, called by
// the position patch on `transformed` and the normal patch on `position`, so
// the two halves cannot drift. uMAxis/uMCenter/uMAmt come from the existing
// deform uniforms; aTetherW/aTetherGrad are the field samples the adapter
// binds (constant 1/0 where a mesh runs unmasked).
export const CHAMBER_SHAPE_GLSL = `
attribute float aTetherW;
attribute vec3 aTetherGrad;
mat3 rssChamberDeform(inout vec3 x,float amp){
  float a=clamp(amp*uMAmt,0.,.25);
  if(a<=0.)return mat3(1.);
  float k=a*aTetherW;
  vec3 u=x-uMCenter;
  float s=dot(u,uMAxis);
  vec3 v=u-s*uMAxis+.55*s*uMAxis;
  mat3 J;
  J[0]=vec3(1.-k,0.,0.)+(k*.45*uMAxis.x)*uMAxis-(a*aTetherGrad.x)*v;
  J[1]=vec3(0.,1.-k,0.)+(k*.45*uMAxis.y)*uMAxis-(a*aTetherGrad.y)*v;
  J[2]=vec3(0.,0.,1.-k)+(k*.45*uMAxis.z)*uMAxis-(a*aTetherGrad.z)*v;
  x-=k*v;
  return mat3(cross(J[1],J[2]),cross(J[2],J[0]),cross(J[0],J[1]));
}
`;

export function deformBreathing(position,normal,shape,amplitude,lung=false){
  const {axis,centre,length,amount}=shape;
  if(!amplitude||!amount)return {position:Array.from(position),normal:Array.from(normal),determinant:1};
  const offset=position.map((v,i)=>v-centre[i]),z=offset.reduce((s,v,i)=>s+v*axis[i],0);
  let out,n,determinant;
  const na=normal.reduce((s,v,i)=>s+v*axis[i],0);
  if(lung){
    const transverse=1+.65*amount*amplitude,longitudinal=1+1.4*amount*amplitude;
    out=position.map((v,i)=>v+(offset[i]-z*axis[i])*(transverse-1)+z*axis[i]*(longitudinal-1));
    n=normal.map((v,i)=>(v-na*axis[i])/transverse+na*axis[i]/longitudinal);
    determinant=transverse*transverse*longitudinal;
  }else{
    const safeLength=Math.max(length,1e-6);
    const t=Math.max(0,Math.min(1,(z/safeLength+.2)/.65)),weight=t*t*(3-2*t);
    const derivative=1-amount*amplitude*6*t*(1-t)/(.65*safeLength);
    out=position.map((v,i)=>v-axis[i]*amount*amplitude*weight);
    n=normal.map((v,i)=>v-na*axis[i]+na*axis[i]/derivative);
    determinant=derivative;
  }
  const norm=Math.hypot(...n);
  return {position:out,normal:n.map(v=>v/norm),determinant};
}
