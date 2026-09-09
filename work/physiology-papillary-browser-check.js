async function physiologyPapillaryBrowserCheck(){
 const {loadExtraModel}=await import('/studio/depth-picking.js');
 const {STRUCTURE_MODELS}=await import('/study-data.js');
 await __osteo.boot();await loadExtraModel('circulatory',STRUCTURE_MODELS.circulatory.file);
 const s=__osteo.state,T=s.THREE,rows=[];
 const params=m=>{const sh={uniforms:{},vertexShader:T.ShaderLib.standard.vertexShader,fragmentShader:T.ShaderLib.standard.fragmentShader};m.material.onBeforeCompile(sh);return sh.uniforms;};
 const transform=(m,u,p,a)=>{const q=m.worldToLocal(p.clone()),d=q.clone().sub(u.uMCenter.value),z=d.dot(u.uMAxis.value);q.addScaledVector(d,-a*u.uMAmt.value).addScaledVector(u.uMAxis.value,.45*z*a*u.uMAmt.value);return m.localToWorld(q);};
 const worldPoints=m=>{const p=m.geometry.attributes.position;return Array.from({length:p.count},(_,i)=>m.localToWorld(new T.Vector3().fromBufferAttribute(p,i)));};
 for(const side of ['Left','Right']){
  const chamber=s.extraModels.circulatory.meshes.find(m=>new RegExp('^'+side+'_ventricle(?:_\\d+)?$').test(m.name));
  const cp=worldPoints(chamber),cu=params(chamber);
  for(const m of s.extraModels.circulatory.meshes.filter(m=>new RegExp('papillary.*'+side+'_ventricle$','i').test(m.name))){
   if(!m.userData.flowPumpShape)throw Error('Missing named chamber field '+m.name);
   const pp=worldPoints(m),u=params(m),before=m.geometry.attributes.position.array.slice();
   const pairs=pp.map(p=>{let j=0;for(let i=1;i<cp.length;i++)if(p.distanceToSquared(cp[i])<p.distanceToSquared(cp[j]))j=i;return {p,q:cp[j],gap:p.distanceTo(cp[j])};}).sort((a,b)=>a.gap-b.gap).slice(0,5);
   let maxFieldError=0,maxGapRatio=0,maxPeakGap=0;
   for(let k=0;k<=24;k++){
    const a=.5-.5*Math.cos(k/24*2*Math.PI);
    for(const p of pp)maxFieldError=Math.max(maxFieldError,transform(m,u,p,a).distanceTo(transform(chamber,cu,p,a)));
    for(const {p,q,gap} of pairs){const current=transform(m,u,p,a).distanceTo(transform(chamber,cu,q,a));maxGapRatio=Math.max(maxGapRatio,current/gap);if(k===12)maxPeakGap=Math.max(maxPeakGap,current);}
   }
   if(maxFieldError>1e-6||maxGapRatio>1+1e-6)throw Error('Shared field mismatch '+m.name);
   if(!before.every((v,i)=>v===m.geometry.attributes.position.array[i]))throw Error('CPU vertices changed');
   rows.push({name:m.name,nearestRestGap:pairs[0].gap,maxPeakGap,maxFieldError,maxGapRatio});
  }
 }
 if(rows.length!==4)throw Error('Papillary coverage changed');
 return {pass:true,frames:25,rows};
}
