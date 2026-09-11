async function physiologyPapillaryBrowserCheck(){
 const {loadExtraModel}=await import('/studio/depth-picking.js');
 const {STRUCTURE_MODELS}=await import('/study-data.js');
 const {deformChamber}=await import('/physiology-shape.js');
 await __osteo.boot();await loadExtraModel('circulatory',STRUCTURE_MODELS.circulatory.file);
 const s=__osteo.state,T=s.THREE,rows=[];
 const params=m=>{const sh={uniforms:{},vertexShader:T.ShaderLib.standard.vertexShader,fragmentShader:T.ShaderLib.standard.fragmentShader};m.material.onBeforeCompile(sh);return sh.uniforms;};
 /* Each mesh moves under its own attribute-sampled copy of the shared tether
    field; the reference evaluates the map per vertex from that mesh's own
    uniforms and attribute values. */
 const verts=m=>{const p=m.geometry.attributes.position,tw=m.geometry.attributes.aTetherW,tg=m.geometry.attributes.aTetherGrad,out=[],v=new T.Vector3();
   for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);
     out.push({local:v.clone(),world:m.localToWorld(v.clone()),
       tether:tw?{weight:tw.getX(i),gradient:tg?[tg.getX(i*3),tg.getX(i*3+1),tg.getX(i*3+2)]:[0,0,0]}:null});}
   return out;};
 const mapped=(m,u,vx,a)=>{const shape={centre:u.uMCenter.value.toArray(),axis:u.uMAxis.value.toArray(),amount:u.uMAmt.value};
   const r=deformChamber(vx.local.toArray(),[0,1,0],shape,a,vx.tether);
   return m.localToWorld(new T.Vector3(...r.position));};
 for(const side of ['Left','Right']){
  const isVentricle=(m,side)=>{const n=m.name;if(!n.startsWith(side+'_ventricle'))return false;const rest=n.slice(side.length+10);return rest===''||((rest[0]==='_')&&!isNaN(Number(rest.slice(1))));};
  const chamber=s.extraModels.circulatory.meshes.find(m=>isVentricle(m,side));
  const cv=verts(chamber),cu=params(chamber);
  for(const m of s.extraModels.circulatory.meshes.filter(m=>new RegExp('papillary.*'+side+'_ventricle$','i').test(m.name))){
   if(!m.userData.flowPumpShape)throw Error('Missing named chamber field '+m.name);
   if(!m.geometry.attributes.aTetherW)throw Error('Missing tether field '+m.name);
   const pv=verts(m),u=params(m),before=m.geometry.attributes.position.array.slice();
   const pairs=pv.map((vx,i)=>{let j=0;for(let k=1;k<cv.length;k++)if(vx.world.distanceToSquared(cv[k].world)<vx.world.distanceToSquared(cv[j].world))j=k;return {i,j,gap:vx.world.distanceTo(cv[j].world)};}).sort((a,b)=>a.gap-b.gap).slice(0,5);
   let maxGapRatio=0,maxPeakGap=0;
   for(let k=0;k<=24;k++){
    const a=.5-.5*Math.cos(k/24*2*Math.PI);
    for(const {i,j,gap} of pairs){
     const d=mapped(m,u,pv[i],a).distanceTo(mapped(chamber,cu,cv[j],a));
     maxGapRatio=Math.max(maxGapRatio,d/gap);
     if(k===12)maxPeakGap=Math.max(maxPeakGap,d);
    }
   }
   if(maxGapRatio>1+1e-6)throw Error('Papillary gap grew '+m.name);
   if(!before.every((v,i)=>v===m.geometry.attributes.position.array[i]))throw Error('CPU vertices changed');
   rows.push({name:m.name,nearestRestGap:pairs[0].gap,maxPeakGap,maxGapRatio});
  }
 }
 if(rows.length!==4)throw Error('Papillary coverage changed');
 return {pass:true,frames:25,rows};
}
