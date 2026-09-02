/*
 * Depth picking
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, ANATOMY_DATABASE, LAYER_NAMES, classify, els, getAnatomy, state } from './imports.js';
import { answer, clean, clearHighlight, highlight, onBonePicked, pool, rebuildConcepts, record, renderRegions, renderReview, setMode, showToast, startQuestion, startQuestionFor } from './visualisation-modes.js';
import { applyVisibility, boot3D, cameraView, confirmPick, focusSelected, getRecord, isSelfOrAncestorVisible, mapImportedName, nearestVisibleMesh, resize, toggleIsolation, zoomCamera } from './region-boxes-how.js';
import { clearPickCallout } from './spatial-concept-overlays.js';
import { hideMesh } from './hide-and-search.js';
import { installLayerFlow, layerPool, setXrayView, unitBlurb, unitFor } from './live-physiology.js';

  /* ------------------------------------------------------------------ *
   * Depth picking
   *
   * A tap is a ray, and a ray fired into a body hits everything standing in
   * line behind the surface -- the sternum, then the pericardium, then the
   * right ventricle, then a rib on the way out. The old pick() built exactly
   * that list, kept the nearest, and threw the rest away unless you happened
   * to tap the identical pixel twice inside 900ms. Nothing enclosed by
   * anything else could be selected, because nothing told you there was a
   * queue to walk.
   *
   * The queue is now kept, published to the panel, and stays put until you tap
   * somewhere else. Three ways to reach the thing you actually meant:
   *
   *   tap again    walks one step deeper (no time limit any more)
   *   alt/⌘ tap    jumps straight to the deepest hit under the pointer
   *   the list     names all of them and takes you to any one directly
   *
   * Selecting from below the surface also ghosts whatever was in front of it,
   * because being selected is no use if it is still buried behind bone.
   * ------------------------------------------------------------------ */
  state.pickStack=[];
  state.peeled=[];
  export function restorePeel(){
    state.peeled.forEach(({m,op,tr,dw})=>{
      if(!m.material)return;
      m.material.opacity=op;m.material.transparent=tr;m.material.depthWrite=dw;m.material.needsUpdate=true;
    });
    state.peeled=[];
  }
  /* Ghost only the meshes this particular ray passed through on the way in.
     Hiding whole layers would take the context away with the obstruction. */
  function peelTo(obj){
    restorePeel();
    const at=state.pickStack.indexOf(obj);
    if(at<=0)return 0;
    state.pickStack.slice(0,at).forEach(m=>{
      if(!m.material)return;
      state.peeled.push({m,op:m.material.opacity,tr:m.material.transparent,dw:m.material.depthWrite});
      m.material.transparent=true;m.material.opacity=.06;m.material.depthWrite=false;m.material.needsUpdate=true;
    });
    return at;
  }
  export function stackEntries(){
    return state.pickStack.map((m,i)=>({
      index:i,
      id:m.userData.canonicalId,
      name:(getRecord(m.userData.canonicalId)||{}).canonicalName||m.userData.label||'Unnamed',
      layer:LAYER_NAMES[m.userData.layerKey||(m.userData.extraKey)]||(m.userData.landmarkId?'Landmark':'Skeleton'),
      current:m===state.pickCurrent,
    }));
  }
  export function hideFromStack(index){const m=state.pickStack[index];if(m)hideMesh(m);}
  export function publishStack(){ if(state.stackHook)try{state.stackHook(stackEntries())}catch(e){} }
  export function selectFromStack(index){
    const obj=state.pickStack[index];
    if(!obj)return false;
    state.pickCurrent=obj;
    peelTo(obj);
    onBonePicked(obj);
    const rec=getRecord(obj.userData.canonicalId);
    if(rec&&state.pickHook)try{state.pickHook(rec)}catch(e){}
    publishStack();
    return true;
  }

  export function pick(event,focusAfter=false){
    if(!state.renderer)return;
    const rect=state.renderer.domElement.getBoundingClientRect();
    state.pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
    state.pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
    state.raycaster.setFromCamera(state.pointer,state.camera);
    const hotspotTargets=state.mode==='landmarks'?state.hotspots:[];
    const layerTargets=Object.entries(state.extraModels||{}).filter(([k])=>state.layers[k]).flatMap(([,m])=>m.meshes);
    /* A focused lesson names only what it is teaching. The ghosted body behind
       it is context, so tapping a lymph node must not answer 'Sacrum'. */
    const targets=state.focus?layerPool(state.focus.key):[...state.meshes,...state.fullMeshes,...layerTargets,...hotspotTargets];
    const hits=state.raycaster.intersectObjects(targets,true)
      .filter(h=>isSelfOrAncestorVisible(h.object)&&h.object.userData.canonicalId);
    hits.sort((a,b)=>{
      const d=a.distance-b.distance;
      if(Math.abs(d)>.05)return d;
      const sa=new state.THREE.Box3().setFromObject(a.object).getSize(new state.THREE.Vector3()).length();
      const sb=new state.THREE.Box3().setFromObject(b.object).getSize(new state.THREE.Vector3()).length();
      return sa-sb;
    });
    /* One entry per structure, nearest face first: a rib hit going in and again
       going out is one rib, and listing it twice would make the queue lie. */
    const seen=new Set();
    const stack=[];
    hits.forEach(h=>{
      const id=h.object.userData.canonicalId;
      if(seen.has(id))return;
      seen.add(id);stack.push(h.object);
    });

    /* Same spot as last time? Walk deeper instead of re-selecting the surface.
       No time limit -- the old 900ms window made this feel like a glitch. */
    const sameSpot=!focusAfter&&Math.hypot(event.clientX-state.lastPick.x,event.clientY-state.lastPick.y)<14
      &&state.pickStack.length>1&&stack.length===state.pickStack.length
      &&stack[0]===state.pickStack[0];
    const deepest=event.altKey||event.metaKey;

    if(!sameSpot){
      restorePeel();
      state.pickStack=stack;
      state.lastPick={x:event.clientX,y:event.clientY,t:performance.now(),candidates:stack,index:0};
      state.pickCurrent=null;
    }

    if(state.pickStack.length){
      let at;
      if(deepest)at=state.pickStack.length-1;
      else if(sameSpot)at=(state.pickStack.indexOf(state.pickCurrent)+1)%state.pickStack.length;
      else at=0;
      state.lastPick.index=at;
      const chosen=state.pickStack[at];
      state.pickCurrent=chosen;
      peelTo(chosen);
      confirmPick(chosen,event);
      publishStack();
      if(focusAfter&&state.selectionAnchor)focusSelected();
      return;
    }

    /* Nothing named under the pointer: fall back to the coarse click zones and
       then to the nearest thing on screen, as before. */
    restorePeel();state.pickStack=[];state.pickCurrent=null;publishStack();
    const zones=state.raycaster.intersectObjects(state.fullPickables,false).filter(h=>isSelfOrAncestorVisible(h.object));
    if(zones[0]){confirmPick(zones[0].object,event);if(focusAfter&&state.selectionAnchor)focusSelected();return}
    const nearest=nearestVisibleMesh(event,rect);
    if(nearest){confirmPick(nearest,event);if(focusAfter&&state.selectionAnchor)focusSelected()}
  }
  let pointerDown=null;function bindCanvas(){let lastTap=0;els.stage.addEventListener('pointerdown',(e)=>{pointerDown={x:e.clientX,y:e.clientY}});els.stage.addEventListener('pointerup',(e)=>{/* An armed tool owns the stage: a tap that pins a label must not also re-select and peel. See studio/tools-and-capture.js. */if(state.tool){pointerDown=null;return}if(pointerDown&&Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)<7){const now=performance.now();const isDouble=now-lastTap<320;lastTap=now;pick(e,isDouble)}pointerDown=null})}
  /*
   * The studio's own "Anatomy search" card is gone.
   *
   * It searched ANATOMY_DATABASE plus the imported atlas records -- about
   * fifty structures -- and lived two taps deep inside the viewer's "..."
   * sheet, next to a global search box that covers all 1,686 indexed
   * structures, the study items and the topics. Two search boxes with
   * different reach, one of them much worse, is a trap rather than a
   * convenience, so the weaker one is removed rather than improved.
   *
   * Nothing else called renderSearch; the global search is searchHits() in
   * the study module below.
   */
  export function clearSelection(){state.selectedId=null;state.selectedSide=null;state.selectionAnchor=null;state.isolated=false;clearPickCallout();$('isolateBtn').classList.remove('active');clearHighlight();restorePeel();state.pickStack=[];state.pickCurrent=null;publishStack();applyVisibility();els.selectedName.textContent='Nothing selected';els.selectedChips.innerHTML='';els.selectedDetails.innerHTML=''}
  document.querySelectorAll('.mode-btn').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$('resetBtn').onclick=()=>{if(state.xray){setXrayView(state.xray.view);return}cameraView('front');state.isolated=false;$('isolateBtn').classList.remove('active');applyVisibility()};els.zoomIn.onclick=()=>zoomCamera(.72);els.zoomOut.onclick=()=>zoomCamera(1.38);els.focus.onclick=focusSelected;$('frontBtn').onclick=()=>cameraView('front');$('lateralBtn').onclick=()=>cameraView('lateral');$('isolateBtn').onclick=toggleIsolation;$('showAllBtn').onclick=()=>{state.region='all';els.regionMeta.textContent='All regions';renderRegions();clearSelection()};els.next.onclick=()=>startQuestion();/* This button used to be a second, differently-named way to press Identify.
   It now does the thing its name promises: opens the drill on the structure
   you have got wrong most often, rather than a fresh weighted pick. */
$('reviewBtn').onclick=()=>{
  const worst=[...pool()].sort((a,b)=>((state.stats[b.id]?.incorrect||0)-(state.stats[a.id]?.incorrect||0))||((state.stats[a.id]?.attempts||0)-(state.stats[b.id]?.attempts||0)))[0];
  setMode('identify');
  if(worst&&(state.stats[worst.id]?.incorrect||0)>0){startQuestionFor(worst);highlight(worst.id);els.taskTitle.textContent='What bone is this?';els.taskKicker.textContent='Level 1 · Your weakest';showToast(`Starting with ${worst.canonicalName} — ${state.stats[worst.id].incorrect} missed`)}
  else showToast('No mistakes recorded yet — starting a normal Identify drill.');
};$('closeDetail').onclick=()=>{els.detailDialog.close();state.lastDetailId=null;history.replaceState(null,'',location.pathname+location.search)};els.retry.onclick=()=>{try{state.controls?.dispose()}catch{}if(state.renderer){state.renderer.domElement.remove();state.renderer=null;state.controls=null}state.scene=null;state.camera=null;state.fullModel=null;state.realModel=null;state.meshes=[];state.fullMeshes=[];state.hotspots=[];state.fullPickables=[];boot3D()};
/* Belt and braces around the observer: iPadOS fires visualViewport resize on
   rotation and on the keyboard opening, sometimes before layout settles. */
  /* The turntable is the slow idle yaw of the whole body. It is a different
   thing from Live physiology, and calling both of them 'animation' was half
   the reason the controls read as duplicated. */
/*
 * Extra system models (organs, circulatory) live in their own GLB files and are
 * loaded only when a structure set from them is opened. They are shown INSTEAD
 * of the skeleton rather than alongside it: the files come from different
 * captures and are not spatially registered to each other, so overlaying them
 * would place organs in the wrong place relative to bone.
 */
export async function loadExtraModel(key,file){
  if(state.extraModels[key])return state.extraModels[key];
  if(!state.scene)throw new Error('3D scene not ready');
  const THREE=state.THREE||await import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js');
  const {GLTFLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js');
  const gltf=await new Promise((ok,err)=>new GLTFLoader().load(file,ok,undefined,err));
  const root=gltf.scene;
  /*
   * All six BodyParts3D / Z-Anatomy layers are exported in ONE shared source
   * frame. Measured, every full-body layer spans y 0.00-1.70 and x +-0.33 to
   * within a few millimetres of the skeleton; the organ layer is torso-only
   * (y 0.73-1.62) and sits exactly where the ribcage puts it.
   *
   * Normalising each layer to its OWN bounding box is what used to break that
   * registration: fitting the torso-only organ layer to the same 11 units
   * scaled it ~1.9x and floated it off the skeleton, which is why overlaying
   * looked impossible. Apply the skeleton's transform verbatim instead and the
   * layers line up, because they were already aligned before we touched them.
   */
  const bt=state.bodyTransform;
  if(bt){root.scale.setScalar(bt.scalar);root.position.set(bt.offset[0],bt.offset[1],bt.offset[2])}
  else{
    const box=new THREE.Box3().setFromObject(root);
    const size=box.getSize(new THREE.Vector3());
    root.scale.setScalar(11/(Math.max(size.x,size.y,size.z)||1));
    const sb=new THREE.Box3().setFromObject(root);
    const c=sb.getCenter(new THREE.Vector3());
    root.position.set(-c.x,.5-c.y,-c.z);
  }
  const meshes=[];
  const raws=[];
  root.traverse(o=>{if(o.isMesh){meshes.push(o);raws.push(o.name||o.parent?.name||'Unnamed structure')}});
  /*
   * Side letters are glued straight onto the name -- "Kidneyl", "Vagus nerve
   * (X)r", "Internal thoracic veinsl". Stripping any trailing l/r would maim
   * Femur and Vomer, so only strip when the opposite-side twin actually exists
   * in this layer. That needs every name in hand, hence the two passes.
   */
  const flat=new Set(raws.map(r=>r.replace(/_/g,' ').trim().toLowerCase()));
  const readable=(raw)=>{
    const clean=String(raw).replace(/_/g,' ').replace(/\s+/g,' ').trim();
    const m=clean.match(/^(.*\S)(l|r)$/i);
    if(m){
      const stem=m[1].trim();
      const twin=(stem+(m[2].toLowerCase()==='l'?'r':'l')).toLowerCase();
      if(flat.has(twin))return {label:stem,side:m[2].toLowerCase()==='l'?'left':'right'};
    }
    return {label:clean,side:'bilateral'};
  };
  meshes.forEach((o,i)=>{
    const raw=raws[i];
    const {label,side}=readable(raw);
    /* A canonicalId is what makes a mesh pickable: pick() filters on it and
       confirmPick looks the record up. Without one these layers could only be
       selected programmatically from a structure-set question. */
    /*
     * Sub-parts share ONE id, so they are one selectable structure.
     *
     * The source splits further than the course does: the deltoid is three
     * "parts", the trapezius three, the left lung eleven segmental bronchi.
     * Given an id each, tapping the shoulder selected "Acromial part of
     * deltoid muscle" and left the other two thirds of the muscle dark --
     * naming a fragment nobody is asked to identify.
     *
     * mesh-index.js already marks those rows tier 1 and groups them into a
     * family; here that grouping becomes the identity of the thing. Because
     * picking, highlighting, isolation and the quiz all key off canonicalId,
     * merging it here merges them everywhere at once.
     *
     * The side stays in the id: left and right are never merged, because
     * telling them apart is the entire L2 drill.
     */
    const unit=unitFor(key,raw);
    const id=unit?`sys:${key}:u:${unit.unitId}${side?':'+side:''}`:`sys:${key}:${i}:${raw}`;
    const shownName=unit?unit.unit:label;
    if(!state.importedRecords.has(id)){
      const mapped=mapImportedName(raw);
      const known=mapped&&getAnatomy(mapped);
      state.importedRecords.set(id, known
        ? {...known,id,canonicalName:shownName,side}
        : {id,canonicalName:shownName,aliases:[],region:key,side,
           category:`${LAYER_NAMES[key]||key} layer structure`,landmarks:[],articulations:[],
           radiographyImportance:unitBlurb(unit,key),
           difficulty:3,modelObjectIds:[],commonConfusions:[]});
    }
    o.userData={...(o.userData||{}),label:raw,extraKey:key,canonicalId:id,layerKey:key,side,region:key,
      baseScale:o.scale.toArray(),basePosition:o.position.toArray(),presentationActive:false};
    if(o.material){o.material=o.material.clone();o.material.roughness=.72;o.material.metalness=.03;o.material.transparent=false;o.material.opacity=1}
  });
  /* Colour and classify before the layer is ever drawn, so it never appears
     in the flat atlas beige and then change under the learner. */
  installLayerFlow(key,meshes);
  root.visible=false;
  /* A pivot at the world origin, exactly like the skeleton's, so the idle
     rotation can be applied to every layer identically. Rotating the roots
     themselves would spin each about its own offset and pull the body apart. */
  const pivot=new THREE.Group();
  pivot.name=`${key}Pivot`;
  pivot.add(root);
  state.scene.add(pivot);
  state.extraModels[key]={root,pivot,meshes};
  /*
   * A cavity that could not be measured before this layer arrived can be now.
   *
   * The pericardial sac has no bony definition at all: with the vessel layer
   * unloaded it is placed in the lower mediastinum, tilted left, and flagged
   * as estimated. Turning the vessels on afterwards left that estimate on
   * screen -- a tapered drum sitting beside the heart it is meant to be
   * wrapped round -- because nothing re-ran the builders. Same for the
   * thoracic cavity, whose lateral walls are the medial surfaces of the lungs
   * once the organ layer exists, and the vertebral canal, and the abdominal
   * cavity's roof. rebuildConcepts() returns immediately when nothing is
   * showing, which is the common case.
   */
  rebuildConcepts();
  return state.extraModels[key];
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.addEventListener('resize',resize);
  window.addEventListener('orientationchange',()=>setTimeout(resize,120));
  if(window.visualViewport)window.visualViewport.addEventListener('resize',resize);
  els.motion.onclick=()=>{state.motionEnabled=!state.motionEnabled;els.motion.textContent=state.motionEnabled?'Pause turntable':'Spin turntable';els.motion.classList.toggle('active',state.motionEnabled)};renderRegions();renderReview();bindCanvas();setMode('explore');
  state.extraModels=state.extraModels||{};
  state.layers=state.layers||{skeleton:true};
}
