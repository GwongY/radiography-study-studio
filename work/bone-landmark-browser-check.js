// Run this default function through Chrome evaluate_script on the local app.
export default async function(){
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  const until=async(fn)=>{for(let i=0;i<150;i++){if(fn())return;await new Promise(r=>setTimeout(r,100));}throw new Error('Timed out');};
  const {openViewer}=await import('./study/what-is-under.js');
  const {renderViewerTools}=await import('./study/viewer-tools.js');
  const {BONE_LANDMARKS,boneLandmarkKey,surfaceLandmarks}=await import('./bone-landmarks.js');
  const {focusSelected,applyVisibility}=await import('./studio/region-boxes-how.js');
  const {updateHudSprites}=await import('./studio/spatial-concept-overlays.js');
  const {onBonePicked,openDetail}=await import('./studio/visualisation-modes.js');
  const {getRecord}=await import('./studio/region-boxes-how.js');
  const {viewerStructureName}=await import('./search-name.js');
  openViewer();await window.__osteo.boot();
  const o=window.__osteo,s=o.state,T=s.THREE;
  s.motionEnabled=false;s.fullModel.rotation.y=0;
  if(s.realModel)s.realModel.rotation.y=0;
  o.clearStudyFocus();o.setSeparation(0);s.mode='explore';s.isolated=false;
  await o.setLayer('axial',true);await o.setLayer('appendicular',true);
  renderViewerTools();
  const slider=(key,pct)=>{
    const input=document.querySelector(`[data-depth="${key}"]`);
    assert(input,`no ${key} depth control`);input.value=pct;input.dispatchEvent(new Event('input'));
    assert(document.querySelector(`[data-depthread="${key}"]`).textContent===`${pct}%`,'depth readout differs');
  };
  const opacity=(axial,appendicular)=>{
    for(const m of s.fullMeshes){
      const expected=m.userData.systems.includes('appendicular')?appendicular:axial;
      assert(Math.abs(m.material.opacity-expected)<1e-9,`${m.name}: opacity ${m.material.opacity}, wanted ${expected}`);
      assert(m.material.depthWrite===(expected>=.99),`${m.name}: wrong depth-write mode`);
    }
  };
  slider('axial',100);slider('appendicular',100);opacity(1,1);
  slider('axial',25);opacity(.25,1);
  slider('appendicular',45);opacity(.25,.45);
  openViewer();await o.boot();renderViewerTools();opacity(.25,.45);
  assert(document.querySelector('[data-depth="axial"]').value==='25','reopen reset axial slider');
  assert(document.querySelector('[data-depth="appendicular"]').value==='45','reopen reset appendicular slider');
  await o.setLayer('axial',false);await o.setLayer('axial',true);opacity(.25,.45);
  slider('axial',100);slider('appendicular',100);opacity(1,1);
  // The panel has separate coverage; close it to leave the picture available.
  const {setTaskPanelExpanded}=await import('./study/small-ui-helpers.js');setTaskPanelExpanded(false);
  if(innerWidth<1024&&getComputedStyle(document.querySelector('#layerRail')).display!=='none')document.querySelector('#layerRailToggle').click();
  s.controls.enableDamping=false;
  const pose=(direction,distance)=>{
    s.camera.position.copy(s.controls.target).add(new T.Vector3(...direction).normalize().multiplyScalar(distance));
    s.controls.update();s.camera.updateMatrixWorld(true);updateHudSprites();
  };
  const layout=()=>{
    const ui=s.boneLabelOverlay,rect=s.renderer.domElement.getBoundingClientRect();
    if(!ui||ui.host.hidden)return;
    const visible=ui.points.filter(p=>!p.label.hidden);
    const limit=ui.activeName==='*'?ui.points.length:ui.activeName?1:5;
    assert(visible.length<=limit,'too many simultaneous tags');
    assert(new Set(visible.map(p=>p.name.toLowerCase())).size===visible.length,'duplicate feature tags on one bone');
    for(const p of visible){
      const r=p.label.getBoundingClientRect();
      assert(r.left>=rect.left-1&&r.right<=rect.right+1&&r.top>=rect.top-1&&r.bottom<=rect.bottom-60,`${p.name}: label clipped or under toolbar`);
      const dot=[Number(p.dot.getAttribute('cx')),Number(p.dot.getAttribute('cy'))];
      const x=dot[0]+rect.left,y=dot[1]+rect.top;
      const gap=Math.hypot(Math.max(r.left,Math.min(r.right,x))-x,Math.max(r.top,Math.min(r.bottom,y))-y);
      assert(gap>=30,`${p.name}: tag is too close to its feature (${gap.toFixed(1)}px)`);
      for(const q of visible){
        const b=q.label.getBoundingClientRect(),x=dot[0]+rect.left,y=dot[1]+rect.top;
        assert(x<=b.left-3||x>=b.right+3||y<=b.top-3||y>=b.bottom+3,`${p.name}: marker covered by ${q.name} label`);
      }
      assert(p.locals.some(local=>{
        const v=local.clone().applyMatrix4(ui.mesh.matrixWorld).project(s.camera);
        return Math.hypot(dot[0]-(v.x+1)*rect.width/2,dot[1]-(1-v.y)*rect.height/2)<.1;
      }),`${p.name}: marker detached from the actual bone`);
      const route=p.line.getAttribute('d').match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);
      assert(route.length===6&&Math.abs(route[3]-route[5])<.01,`${p.name}: leader must incline then run horizontally`);
      assert(Math.abs(route[0]-route[2])>1&&Math.abs(route[1]-route[3])>1,`${p.name}: first leader segment is not diagonal`);
      assert(Math.abs(route[3]-route[1])>=7.99&&Math.abs(route[3]-route[1])>=Math.abs(route[2]-route[0])*Math.tan(10*Math.PI/180)-.01,`${p.name}: incline is too flat to see the elbow`);
      assert((route[2]-route[0])*(route[4]-route[2])>0,`${p.name}: leader doubles back into an acute bend`);
      assert(Math.abs(route[4]-route[2])>=27,`${p.name}: horizontal segment is too short`);
      const elbowX=route[2]+rect.left;
      assert(elbowX<r.left-26||elbowX>r.right+26,`${p.name}: horizontal segment collides with its box`);
      assert(Math.abs(parseFloat(getComputedStyle(p.label).fontSize)-(ui.activeName==='*'?12.1:13.2))<.1,`${p.name}: label follows reading text size`);
      assert(Math.abs(route[3]-route[1])<=Math.abs(route[2]-route[0])*Math.tan(35*Math.PI/180)+.01,`${p.name}: diagonal is too steep (bend must be at least 145 degrees)`);
      const endX=route[4]+rect.left,endY=route[5]+rect.top;
      assert(endX>=r.left-1&&endX<=r.right+1&&endY>=r.top-1&&endY<=r.bottom+1
        &&Math.min(Math.abs(endX-r.left),Math.abs(endX-r.right),Math.abs(endY-r.top),Math.abs(endY-r.bottom))<1,`${p.name}: horizontal leader misses tag edge`);
      if(ui.activeName&&ui.activeName!=='*') {
        const x=dot[0]+rect.left,y=dot[1]+rect.top;
        assert(gap<260,`${p.name}: single tag is far from its feature`);
      }
      for(const q of visible)if(q!==p){
        const b=q.label.getBoundingClientRect();
        assert(r.right<=b.left+1||b.right<=r.left+1||r.bottom<=b.top+1||b.bottom<=r.top+1,`${p.name}/${q.name}: labels overlap`);
        assert(endY<=b.top-1||endY>=b.bottom+1||Math.max(elbowX,endX)<=b.left-1||Math.min(elbowX,endX)>=b.right+1,`${p.name}: horizontal segment hidden by ${q.name}`);
      }
    }
  };
  const choosePart=name=>{
    const ui=s.boneLabelOverlay;assert(ui&&!ui.host.hidden,'no Parts control');
    ui.toggle.click();assert(!ui.menu.hidden,'Parts menu did not open');
    assert(ui.points.every(p=>p.label.hidden),'tags crowd the open Parts list');
    const button=[...ui.menu.querySelectorAll('button')].find(b=>(b.dataset.landmarkChoice||null)===name);
    assert(button,`${name}: missing Parts choice`);button.scrollIntoView({block:'nearest'});
    const r=button.getBoundingClientRect(),hit=document.elementFromPoint((r.left+r.right)/2,(r.top+r.bottom)/2);
    assert(hit===button||button.contains(hit),`${name}: Parts choice is covered by another control`);button.click();
    assert(ui.menu.hidden,'Parts menu did not close after selection');
    assert(button.getAttribute('aria-pressed')==='true','Parts choice lost its selection');
  };
  let geometries=0;
  for(const mesh of s.fullMeshes){
    const key=boneLandmarkKey(mesh.userData.label||mesh.name,mesh.userData.side),spec=BONE_LANDMARKS[key];
    if(!spec?.vertices)continue;
    const attr=mesh.geometry.attributes.position;
    assert(surfaceLandmarks(key,attr.count,i=>new T.Vector3().fromBufferAttribute(attr,i).toArray()).length===spec.points.filter(p=>Number.isInteger(p.vertex)).length,`${mesh.name}: real GLTFLoader geometry refused`);
    geometries++;
  }
  assert(geometries===32,'missing a lecture-backed paired side');
  const frontal=s.fullMeshes.find(m=>m.name==='Frontal_bone_1');
  assert(frontal&&frontal.userData.label==='Frontal_bone','loader suffix leaked into the frontal course identity');
  onBonePicked(frontal);assert(document.querySelector('#selectedName').textContent==='Frontal','frontal tap name still has bone 1');
  const frontalRecord=getRecord(frontal.userData.canonicalId);
  assert(frontalRecord.canonicalName==='Frontal bone','frontal did not resolve its actual course unit');
  openDetail(frontalRecord);assert(document.querySelector('#detailTitle').textContent==='Frontal','frontal detail name still has bone 1');
  document.querySelector('#closeDetail').click();
  assert(viewerStructureName('Vertebra T1')==='Vertebra T1','anatomical numbering was stripped');
  const coverage=[];
  for(const [key,spec] of Object.entries(BONE_LANDMARKS)){
    const mesh=s.fullMeshes.find(m=>boneLandmarkKey(m.userData.label||m.name,m.userData.side)===key);
    assert(mesh,`${key}: missing mesh`);assert(o.selectMesh(mesh.userData.label),`${key}: cannot select`);
    document.querySelector('#focusBtn').click();updateHudSprites();
    assert(!s.boneLabelOverlay||s.boneLabelOverlay.host.hidden,`${key}: parts appear before zooming closer than Focus`);
    const distance=s.camera.position.distanceTo(s.controls.target)*.9,seen=new Set();
    pose([0,0,1],distance);choosePart(null);layout();
    assert(s.boneLabelOverlay.shown===spec.primaryNames.length,'main diagram omitted a primary feature');
    assert(spec.primaryNames.length===Math.min(5,spec.points.length),'Main does not offer up to five parts');
    for(const mode of [null,'*']) {
      choosePart(mode);
      for(const v of [[0,0,1],[0,0,-1],[1,0,0],[-1,0,0],[0,1,.1],[0,-1,.1],[1,1,1],[-1,-1,-1]]) {
        pose(v,distance);layout();
        assert(s.boneLabelOverlay.shown===(mode==='*'?spec.points.length:spec.primaryNames.length),`${key}: Main/Show all lost tags with angle`);
      }
    }
    for(const point of spec.points){
      choosePart(point.name);
      for(const v of [[0,0,1],[0,0,-1],[1,0,0],[-1,0,0],[0,1,.1],[0,-1,.1],[1,1,1],[-1,-1,-1]]){
        pose(v,distance);layout();
        assert(!s.boneLabelOverlay.host.hidden&&s.boneLabelOverlay.shown===1,`${key}/${point.name}: selected tag disappears with angle`);
        for(const p of s.boneLabelOverlay.points)if(!p.label.hidden)seen.add(p.name);
      }
    }
    assert(spec.points.every(p=>seen.has(p.name)),`${key}: no view exposes ${spec.points.filter(p=>!seen.has(p.name)).map(p=>p.name).join(', ')}`);
    coverage.push({bone:key,landmarks:seen.size});
  }
  const femur=(isolate=true)=>{o.selectMesh('Femur','left');if(isolate)document.querySelector('#focusBtn').click();else focusSelected();return s.camera.position.distanceTo(s.controls.target)*.9;};
  let distance=femur();pose([0,0,1],distance);choosePart('Lesser trochanter');
  const lesser=s.boneLabelOverlay.points.find(p=>p.name==='Lesser trochanter');
  assert(!lesser.label.hidden&&lesser.farSide&&lesser.line.getAttribute('stroke-dasharray'),'far-side feature lost its name or depth cue');
  assert(!s.pickGroup.visible,'whole-bone callout competes with part labels');
  pose([0,0,-1],distance);assert(!s.boneLabelOverlay.points.find(p=>p.name==='Lesser trochanter').label.hidden,'rotation did not expose lesser trochanter');
  // Names must remain available while feature-relative tags follow the orbit.
  for(const bone of ['Femur','Humerus','Scapula','Parietal bone']) {
    o.selectMesh(bone,'left');document.querySelector('#focusBtn').click();
    const d=s.camera.position.distanceTo(s.controls.target)*.9;pose([0,0,1],d);
    for(const mode of [null,'*']) {
      choosePart(mode);
      const expected=mode==='*'?s.boneLabelOverlay.points.length:s.boneLabelOverlay.primaryNames.size;
      for(let step=0;step<=120;step++) {
        const angle=step*Math.PI/60;pose([Math.sin(angle),.08,Math.cos(angle)],d);
        assert(!s.boneLabelOverlay.host.hidden&&s.boneLabelOverlay.shown===expected,`${bone}: labels disappear at ${step*3} degrees`);
        layout();
      }
    }
  }
  distance=femur();pose([0,0,1],distance);
  pose([0,0,1],distance*10);assert(s.boneLabelOverlay.host.hidden,'overview cluttered with small bone labels');
  assert(s.pickGroup.visible,'overview lost the whole-bone name');
  pose([0,0,1],distance);
  s.mode='identify';updateHudSprites();assert(s.boneLabelOverlay.host.hidden,'landmark revealed quiz answer');s.mode='explore';
  o.setCut('axial',.5,false);updateHudSprites();assert(s.boneLabelOverlay.host.hidden,'labels paint over section cut');o.clearCut();
  s.isolated=false;applyVisibility();
  o.setSpreadMode('pieces');o.setSeparation(0);distance=femur(false);pose([0,0,1],distance);
  const assembled=s.selectionAnchor.matrixWorld.toArray();
  o.setSeparation(1);distance=femur(false);pose([0,0,1],distance);layout();
  assert(!s.boneLabelOverlay.host.hidden&&s.boneLabelOverlay.shown>=4,'close spread specimen lacks labels');
  assert(s.selectionAnchor.matrixWorld.toArray().some((v,i)=>v!==assembled[i]),'spread did not move bone');
  o.setSeparation(0);s.scene.updateMatrixWorld(true);
  assert(s.selectionAnchor.matrixWorld.toArray().every((v,i)=>v===assembled[i]),'landmarks changed assembly');
  document.querySelector('[data-vtab="xray"]').click();await until(()=>o.inXray());updateHudSprites();
  assert(s.boneLabelOverlay.host.hidden,'landmarks painted over projection');
  document.querySelector('[data-vtab="3d"]').click();await until(()=>!o.inXray());
  o.selectMesh('Calcaneus','left');document.querySelector('#focusBtn').click();pose([0,0,1],s.camera.position.distanceTo(s.controls.target)*.9);
  assert(!s.boneLabelOverlay.host.hidden&&!s.boneLabelOverlay.note.hidden&&s.boneLabelOverlay.points.length===0,'unmapped bone has misleading labels');
  distance=femur();pose([0,0,1],distance);layout();s.controls.enableDamping=true;
  return {pass:true,viewport:[innerWidth,innerHeight],textSize:document.documentElement.dataset.ts||'standard',geometries,coverage,checks:['independent axial/appendicular opacity','slider readouts and reopen','layer off/on','both paired surfaces','frontal tap/detail/course identity without loader suffix','anatomical numbering retained','all lecture names selectable through Parts','five-tag Main and duplicate refusal','Show all parts from eight directions','single selected tag from eight directions','28px horizontal tails outside every tag box','standard label size independent of reading text','closer zoom required after Focus','projected mesh anchors','label packing','far-side depth cues','360-degree label continuity','overview and quiz guards','cut and projection guards','packed spread and exact assembly','unmapped bone notice']};
}
