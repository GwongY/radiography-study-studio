// Evaluate on a fresh dev-server tab in real Chrome, after modules settle.
async function physiologyBrowserCheck(){
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  const {goTo}=await import('/study/navigation-five-destinations.js');
  const {renderLayerRail}=await import('/study/subject.js');
  const {searchHits}=await import('/study/global-search-one.js');
  const {loadExtraModel}=await import('/studio/depth-picking.js');
  const {meshesFor}=await import('/studio/search-viewer-frame.js');
  const {stepPhysiology,focusPhysiologyExample,clearStudyFocus}=await import('/studio/live-physiology.js');
  const {STRUCTURE_MODELS}=await import('/study-data.js');
  const {MESH_INDEX}=await import('/mesh-index.js?v=5');
  goTo('viewer');await __osteo.boot();
  const s=__osteo.state;s.motionEnabled=false;
  for(const key of Object.keys(STRUCTURE_MODELS).filter(k=>k!=='skeleton'))
    await loadExtraModel(key,STRUCTURE_MODELS[key].file);
  const missed=MESH_INDEX.filter(row=>!meshesFor(row.layer==='skeleton'?{meshes:s.fullMeshes}:s.extraModels[row.layer],row.mesh).length);
  check(!missed.length,'unresolved real meshes: '+missed.map(m=>m.name).join(', '));
  const selections=[];
  for(const [q,want,pattern] of [
    ['left first metacarpal bone',1,/First_metacarpal_bonel/],
    ['right axillary nerve',1,/^Axillary_nerver$/],
    ['left main bronchus',1,/^Left_main_bronchus$/],
    ['rotator cuff',8,/Supraspinatus|Infraspinatus|Teres_minor|Subscapularis/],
    ['hamstrings',6,/Long_head_of_biceps_femoris|Semitendinosus|Semimembranosus/],
    ['quadriceps',8,/Rectus_femoris|Vastus/],
  ]){
    const hit=searchHits(q)[0],original=__osteo.revealStructure;
    let result;
    try{result=await new Promise((resolve,reject)=>{
      __osteo.revealStructure=async spec=>{try{const r=await original(spec);resolve(r);return r;}catch(e){reject(e);throw e;}};
      hit.go();
    });}finally{__osteo.revealStructure=original;}
    check(result.ok&&result.found===want,`${q}: wrong resolved parts ${result.found}`);
    const selected=[...s.fullMeshes,...Object.values(s.extraModels).flatMap(v=>v.meshes)].filter(m=>m.userData.presentationActive);
    check(selected.length===want&&selected.every(m=>pattern.test(m.name)),`${q}: wrong highlight`);
    check(document.getElementById('selectedName').textContent.toLowerCase()===hit.title.toLowerCase().replace(/ — \d+ parts$/,''),`${q}: wrong label`);
    selections.push({query:q,parts:want});
  }
  __osteo.unhide('all');
  renderLayerRail();
  const preset=async kind=>kind==='all'?clearStudyFocus():focusPhysiologyExample(kind);
  await preset('breathing');
  check(s.focus.count===6,'breathing needs five lung lobes and diaphragm');
  for(const side of ['left','right']){
    const lobes=s.extraModels.organs.meshes.filter(m=>m.name.toLowerCase().includes(side)&&m.userData.flowCenter);
    const centres=lobes.map(m=>m.localToWorld(m.userData.flowCenter.clone()));
    check(centres.length===(side==='left'?2:3)&&centres.every(c=>c.distanceTo(centres[0])<1e-8),'lobes must share world centre');
  }
  const rt=new s.THREE.WebGLRenderTarget(256,256);
  const pixels=t=>{
    s.flow.elapsed=t;s.flow.lastTime=0;s.flow.blend=1;stepPhysiology(0);
    const b=new Uint8Array(256*256*4);
    s.renderer.setRenderTarget(rt);s.renderer.render(s.scene,s.camera);
    s.renderer.readRenderTargetPixels(rt,0,0,256,256,b);s.renderer.setRenderTarget(null);return b;
  };
  const a=pixels(0),b=pixels(60/14*.4);
  const changed=a.reduce((n,v,i)=>n+(Math.abs(v-b[i])>3?1:0),0);
  check(changed>100,'breathing shader produced no visible change');
  await preset('motor');
  check(s.focus.count===26,'motor examples lost a participating structure');
  const nerves=s.extraModels.nervous.meshes.filter(m=>m.geometry.attributes.aTransmission);
  check(nerves.length===8,'motor nerve paths missing');
  for(const m of nerves){const f=m.geometry.attributes.aTransmission.array;check(f.every(x=>Number.isFinite(x)&&x>=0&&x<=1)&&Math.max(...f)>.99,'invalid transmission field');}
  const c=pixels(.20),d=pixels(.98);
  check(c.some((v,i)=>Math.abs(v-d[i])>5),'motor shader produced no visible change');
  __osteo.setSeparation(.5);
  check(Object.values(s.flow.motors).every(u=>u.uDeform.value===0),'spread retains motor deformation');
  __osteo.setSeparation(0);
  await preset('all');
  check(!s.focus?.keep,'leaving example retains hidden participants');
  s.renderer.compile(s.scene,s.camera);rt.dispose();
  check(![...document.querySelectorAll('select,input')].some(e=>/physiology.*speed|speed.*physiology/i.test(e.id+' '+e.getAttribute('aria-label'))),'speed control remains');
  return {pass:true,resolvedNames:MESH_INDEX.length,selections,nervePaths:nerves.length,breathingChangedChannels:changed,programs:s.renderer.info.programs.length};
}
