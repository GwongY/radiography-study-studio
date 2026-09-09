// Run in a fresh, isolated dev-server Chrome tab. Re-run after reload as well.
async function reportedRegressionsBrowserCheck() {
  const failures = [], evidence = {};
  const check = (ok, message) => { if (!ok) failures.push(message); };
  const aligned = (searchId, sizeId) => {
    const a=document.getElementById(searchId).getBoundingClientRect(), b=document.getElementById(sizeId).getBoundingClientRect();
    check(a.left >= b.right && a.right <= innerWidth && Math.abs(a.y+a.height/2-b.y-b.height/2)<2, `${searchId}: misaligned with text size`);
  };
  const {ui} = await import('/study/state.js');
  const {goTo} = await import('/study/navigation-five-destinations.js');
  const {topicsWithContent, renderLearn} = await import('/study/subject.js');
  const {startSession, setStep} = await import('/study/session-engine.js');
  const {getItemStep} = await import('/study/home.js');
  const topic = topicsWithContent().find(t => t.items.length >= 2);
  ui.learnFilter = 'all'; ui.learnTopic = topic.unit.id;
  evidence.stages = [];
  for (const [index, stage, dots] of [[0, 'practise', '●●●○'], [1, 'apply', '●●●●']]) {
    const id = topic.items[index].id;
    startSession({mode:'ids', ids:[id]}); setStep(stage);
    aligned('rssSessionSearch','rssSessionTextSize');
    document.getElementById('rssSessionClose').click();
    goTo('learn'); renderLearn();
    aligned('rssSearchBtn','rssTextSize');
    const row = document.querySelector(`[data-item="${id}"]`);
    evidence.stages.push({id, saved:getItemStep(id), row:row?.textContent});
    check(row?.querySelector('.mono').textContent === dots, `${stage}: displayed lesson dots lost saved stage`);
    row.click();
    check(ui.session.step === stage, `${stage}: lesson reopened at ${ui.session.step}`);
    document.getElementById('rssSessionClose').click();
  }
  goTo('viewer'); await __osteo.boot();
  const s = __osteo.state; s.motionEnabled = false;
  aligned('rssSearchBtn','rssTextSize');
  const femur=s.fullMeshes.find(m=>/femur/i.test(m.name));
  s.scene.updateMatrixWorld(true);
  const point=new s.THREE.Box3().setFromObject(femur).getCenter(new s.THREE.Vector3()).project(s.camera);
  const canvas=s.renderer.domElement, rect=canvas.getBoundingClientRect();
  const x=rect.left+(point.x+1)*rect.width/2,y=rect.top+(1-point.y)*rect.height/2;
  // Synthetic pointers have no browser capture slot; only stub capture during dispatch.
  const capture=canvas.setPointerCapture,release=canvas.releasePointerCapture;
  try {
    canvas.setPointerCapture=()=>{};canvas.releasePointerCapture=()=>{};
    for(const type of ['pointerdown','pointerup']) canvas.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:71,isPrimary:true,clientX:x,clientY:y,pointerType:'touch'}));
  } finally {canvas.setPointerCapture=capture;canvas.releasePointerCapture=release;}
  check(s.pickStack.length>0 && s.pickGroup?.children.length>0,'canvas tap did not show a selection label');
  const {loadExtraModel} = await import('/studio/depth-picking.js');
  const {STRUCTURE_MODELS} = await import('/study-data.js');
  for (const key of ['muscle','nervous','organs']) await loadExtraModel(key, STRUCTURE_MODELS[key].file);
  const {selectBone} = await import('/studio/visualisation-modes.js');
  for (const m of [s.fullMeshes.find(m=>/femur/i.test(m.name)), s.extraModels.muscle.meshes.find(m=>m.userData.flowClass==='muscle')]) {
    try { selectBone(m.userData.canonicalId,m.userData.side); check(s.pickGroup?.children.length > 0, `${m.name}: missing tap label`); }
    catch(e) { failures.push(`${m.name}: ${e.message}`); }
  }
  evidence.animation = {};
  for (const key of ['muscle','nervous']) {
    const cls = key === 'muscle' ? 'muscle' : 'nerve';
    const meshes = s.extraModels[key].meshes.filter(m=>m.userData.flowClass===cls);
    const installed = meshes.filter(m=>m.material.customProgramCacheKey().startsWith('rssflow')).length;
    evidence.animation[key] = {total:meshes.length, installed};
    check(installed === meshes.length, `${key}: animations only installed on ${installed}/${meshes.length} meshes`);
  }
  const {focusPhysiologyExample,stepPhysiology} = await import('/studio/live-physiology.js');
  focusPhysiologyExample('breathing');
  const {pick} = await import('/studio/depth-picking.js');
  const intersect = s.raycaster.intersectObjects;
  let targets;
  try { s.raycaster.intersectObjects = list => {targets=list;return [];}; pick({clientX:100,clientY:100}); }
  finally { s.raycaster.intersectObjects = intersect; }
  check(targets?.some(m=>m.userData.flowClass==='diaphragm'), 'breathing preset excludes diaphragm from tapping');
  const {focusStructures} = await import('/studio/live-physiology.js');
  const m=s.extraModels.muscle.meshes.find(m=>m.userData.flowClass==='muscle'&&!/deltoid|biceps|vastus|rectus.femoris/i.test(m.name));
  await focusStructures({layer:'muscle',meshes:[m.userData.label],file:STRUCTURE_MODELS.muscle.file});
  // Isolate this unmapped muscle for a GPU comparison, independent of camera motion.
  for(const layer of Object.values(s.extraModels)) for(const mesh of layer.meshes) mesh.visible=mesh===m;
  m.visible=true; __osteo.setPhysiology(true);
  const rt=new s.THREE.WebGLRenderTarget(128,128);
  const pixels=t=>{
    s.flow.elapsed=t;s.flow.lastTime=0;s.flow.blend=1;stepPhysiology(0);
    const p=new Uint8Array(128*128*4);s.renderer.setRenderTarget(rt);s.renderer.render(s.scene,s.camera);
    s.renderer.readRenderTargetPixels(rt,0,0,128,128,p);s.renderer.setRenderTarget(null);return p;
  };
  const a=pixels(0), b=pixels(.8);
  evidence.changedChannels=a.reduce((n,v,i)=>n+(Math.abs(v-b[i])>2?1:0),0);
  check(evidence.changedChannels>10,'unmapped muscle produces no visible animation');rt.dispose();
  return {pass:!failures.length, failures, evidence};
}
