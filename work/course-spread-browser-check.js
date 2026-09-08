// Run the default function in Chrome on the local app (evaluate_script).
export default async function(){
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  const until=async(fn)=>{for(let i=0;i<300;i++){if(fn())return;await new Promise(r=>setTimeout(r,100));}throw new Error('Timed out');};
  document.querySelector('[data-nav="viewer"]').click();
  await until(()=>window.__osteo?.state.fullMeshes.length>0);
  const o=window.__osteo,s=o.state;
  const {applySeparation}=await import('./studio/tools-and-capture.js');
  const {bodyMetrics}=await import('./studio/spatial-concept-overlays.js');
  const {cavityContext}=await import('./studio/cavity-geometry-derived.js');
  const {clearHighlight}=await import('./studio/visualisation-modes.js');
  const {pick}=await import('./studio/depth-picking.js');
  document.querySelector('[data-vtab="3d"]').click();
  assert(!document.querySelector('#modelSourceTabs,#viewerAtlasPane'),'alternate surface remains');
  o.setSpreadMode('pieces');s.motionEnabled=false;
  s.scene.updateMatrixWorld(true);
  const home=s.fullMeshes.map(m=>({m,matrix:m.matrixWorld.toArray()}));
  const metrics=bodyMetrics();
  o.setSeparation(1);
  assert(s.packedLayout.parts.length>0,'no packed course meshes');
  const changed=bodyMetrics();
  for(const k of ['H','cx','cz','halfX','halfZ','minY','maxY'])assert(Math.abs(metrics[k]-changed[k])<1e-9,`measurement drift: ${k}`);
  const preset=async(id)=>{
    const el=document.querySelector('#systemPreset');el.value=id;el.dispatchEvent(new Event('change'));
    await until(()=>!document.querySelector('#systemPreset').disabled);
  };
  await preset('all');
  assert(Object.keys(s.extraModels).length===6,'all preset did not load six extra layers');
  const pieces=s.packedLayout.parts.length;
  const before=s.packedLayout.parts.map(p=>p.mesh.matrixWorld.toArray());
  for(let i=0;i<12;i++)applySeparation();
  clearHighlight();s.scene.updateMatrixWorld(true);
  assert(s.packedLayout.parts.every((p,i)=>p.mesh.matrixWorld.toArray().every((v,j)=>v===before[i][j])),'spread drifts or highlight resets it');
  const ctx=cavityContext();assert(ctx.body.maxY-ctx.body.minY<12,'cavity measured spread geometry');
  const cells=[...s.packedLayout.cells.values()];
  for(let i=0;i<cells.length;i++)for(let j=0;j<i;j++){
    const a=cells[i],b=cells[j];
    assert(Math.abs(a.x-b.x)>=(a.width+b.width)/2-1e-8||Math.abs(a.y-b.y)>=(a.height+b.height)/2-1e-8,'packed cells overlap');
  }
  o.setSeparation(0);
  assert(home.every(p=>p.m.matrixWorld.toArray().every((v,j)=>v===p.matrix[j])),'assembly did not restore original world matrices');
  o.setSeparation(1);await preset('respiratory');
  assert(Object.entries(o.layerState()).filter(([,on])=>on).map(([k])=>k).join(',')==='respiratory','individual preset failed');
  assert(s.packedLayout.parts.length<pieces,'system change did not repack');
  await preset('none');assert(s.packedLayout.parts.length===0,'Hide all left pieces');
  await preset('skeleton');o.setSeparation(0);
  o.setSeparation(1);o.setCut('axial',.5,false);assert(o.separation()===0,'cut left spread active');o.clearCut();
  o.setSeparation(1);o.setTool('pin');assert(o.separation()===0,'annotation left spread active');o.setTool('off');
  o.setSeparation(1);
  const focus=await o.focusStructures({layer:'organs',meshes:['~lung'],ghostBody:true});
  assert(focus.ok&&o.separation()===0,'lesson did not assemble/focus');
  const intersect=s.raycaster.intersectObjects;
  let targets=[];s.raycaster.intersectObjects=(pool)=>{targets=pool;return [];};
  try{pick({clientX:100,clientY:100});}finally{s.raycaster.intersectObjects=intersect;}
  assert(targets.length>0&&targets.every(m=>s.extraModels.organs.meshes.includes(m)),'lesson picking escaped the taught layer');
  o.clearStudyFocus();o.setSeparation(1);
  document.querySelector('[data-vtab="xray"]').click();await until(()=>o.inXray());
  assert(o.separation()===0&&o.setSeparation(1)===0,'projection accepted spread');
  document.querySelector('[data-vtab="3d"]').click();
  assert(!o.inXray(),'projection failed to return');
  await preset('skeleton');o.setSpreadMode('layers');o.setSeparation(.5);o.setSpreadMode('pieces');
  assert(o.separation()===0,'layout switching did not assemble');
  assert(document.querySelectorAll('#stage canvas').length<=1,'extra renderer canvas');
  return {pass:true,pieces,checks:['presets and lazy loading','packed non-overlap','idempotence','highlight','exact assembly','anatomical measurements','system repack','hide all','cut and annotation guards','lesson picking','projection round trip','layout switching']};
}
