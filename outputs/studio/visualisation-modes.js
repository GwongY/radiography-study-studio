/*
 * Visualisation modes.
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, ANATOMY_DATABASE, BODY_CONCEPTS, FLOW_CLASSES, LANDMARK_HOTSPOTS, LAYER_NAMES, MESH_INDEX, REGIONS, conceptById, els, getAnatomy, state } from './imports.js';
import { XRAY_MU, applyLayers, clearStudyFocus, endMovement, enterXray, exitXray, focusStructures, highlightExtra, setExtraVisible, setLayer, setMovementAngle, setPhysiology, setXrayExposure, setXrayRegion, setXrayView, startMovement, xrayDepthMaterial } from './live-physiology.js';
import { addHotspots, applyVisibility, between, boot3D, getRecord, remapHotspotsToReal, resize, showHotspots } from './region-boxes-how.js';
import { bodyMetrics, ensureConceptGroup, showPickCallout } from './spatial-concept-overlays.js';
import { buildCavity, buildCellGrid, buildPlane, cavityContext, cavityStyle, layerSignature } from './cavity-geometry-derived.js';
import { hiddenRows, hideMesh, publishHidden, unhide } from './hide-and-search.js';
import { hideFromStack, loadExtraModel, pick, publishStack, restorePeel, selectFromStack, stackEntries } from './depth-picking.js';
import { revealStructure } from './search-viewer-frame.js';

/* ------------------------------------------------------------------ *
 * Visualisation modes.
 *
 * A cavity is a space, so it is always going to be behind something. The
 * temptation is to draw it bigger or to let it punch through the bone, and
 * both of those lie about where it is. Instead the ANATOMY gives way: bones
 * fade, or the structures in front are lifted out, and the cavity keeps its
 * true size and its true depth ordering throughout.
 * ------------------------------------------------------------------ */
const CAVITY_MODES=[
  {id:'normal',label:'Normal',hint:'Cavities behind the anatomy, correctly occluded.'},
  {id:'isolation',label:'Isolate',hint:'Fade everything except the structures that define the cavity.'},
  {id:'cutaway',label:'Cutaway',hint:'Lift out whatever sits in front of the cavity.'},
  {id:'xray',label:'X-ray',hint:'Bone goes translucent; the cavity reads straight through it.'},
  {id:'anatomy',label:'Anatomy first',hint:'Cavities drop back to a hint so the structures lead.'},
];

function anatomyMeshes(){
  return [...state.fullMeshes,
    ...Object.values(state.extraModels||{}).flatMap((m)=>m.meshes||[])];
}
/* the meshes a currently shown cavity is actually defined by */
function cavityBasisObjects(){
  const ctx=cavityContext();
  if(!ctx||!state._cavInfo) return new Set();
  const keys=new Set();
  state.concepts.forEach((id)=>{
    const info=state._cavInfo.get(id);
    (info&&info.basis||[]).forEach((k)=>keys.add(k));
  });
  const out=new Set();
  keys.forEach((k)=>ctx.objectsFor(k).forEach((o)=>out.add(o)));
  return out;
}
/* the box the visible cavities occupy, in the pivot frame */
function activeCavityBox(){
  const THREE=state.THREE;
  const grp=state.conceptGroup;
  if(!grp||!grp.children.length) return null;
  const box=new THREE.Box3();
  grp.children.forEach((o)=>{ if(o.isMesh) box.expandByObject(o); });
  return box.isEmpty()?null:box;
}
function restoreAnatomyMaterials(){
  anatomyMeshes().forEach((o)=>{
    const st=o.userData&&o.userData._cavStash;
    if(!st) return;
    if(o.material){
      o.material.transparent=st.t; o.material.opacity=st.o; o.material.depthWrite=st.d;
    }
    o.visible=st.v;
    delete o.userData._cavStash;
  });
}
function applyCavityMode(mode){
  const next=CAVITY_MODES.some((m)=>m.id===mode)?mode:'normal';
  state.cavityMode=next;
  restoreAnatomyMaterials();
  const st=cavityStyle();
  const active=state.concepts&&state.concepts.size;
  if(active&&(st.bone!=null||st.keepBasis||next==='cutaway')){
    const keep=st.keepBasis?cavityBasisObjects():new Set();
    const box=next==='cutaway'?activeCavityBox():null;
    const THREE=state.THREE;
    const tmp=box?new THREE.Box3():null;
    const skeleton=new Set(state.fullMeshes);
    anatomyMeshes().forEach((o)=>{
      if(!o.material) return;
      o.userData._cavStash={t:o.material.transparent,o:o.material.opacity,
        d:o.material.depthWrite,v:o.visible};
      if(st.keepBasis){
        /* the cavity plus the structures that define it, and nothing else */
        if(!keep.has(o)) o.visible=false;
        return;
      }
      if(st.skeletonOnly&&!skeleton.has(o)){ o.visible=false; return; }
      if(next==='cutaway'){
        /*
         * Hide what is genuinely in the way: a structure that reaches in front
         * of the cavity's front surface AND sits over it. Testing the front
         * EDGE rather than the centre matters, because a rib wraps right round
         * the chest -- its centre is level with the middle of the cavity even
         * though its costal end is well in front of it, so a centre test hides
         * nothing at all. Requiring real overlap keeps the arms, which are
         * beside the trunk rather than over it, on screen.
         */
        tmp.setFromObject(o);
        const ox=Math.min(tmp.max.x,box.max.x)-Math.max(tmp.min.x,box.min.x);
        const oy=Math.min(tmp.max.y,box.max.y)-Math.max(tmp.min.y,box.min.y);
        const covers=ox>0&&oy>0
          &&ox>(tmp.max.x-tmp.min.x)*0.25&&oy>(tmp.max.y-tmp.min.y)*0.25;
        /* the cavity's own mid-depth is the cut: anything reaching in front of
           that over the cavity is lifted out, which takes the sternum, the
           costal cartilages and the anterior half of the ribs and leaves the
           vertebrae -- the same cut an anatomical cutaway drawing makes */
        if(covers&&tmp.max.z>(box.min.z+box.max.z)/2) o.visible=false;
      } else if(st.bone!=null&&!keep.has(o)){
        o.material.transparent=true;
        o.material.opacity=st.bone;
        o.material.depthWrite=false;
      }
    });
  }
  rebuildConcepts();
  publishConcepts();
  return state.cavityMode;
}
/* re-draw the active overlays with the current mode's materials */
export function rebuildConcepts(){
  if(!state.concepts||!state.concepts.size) return;
  const ids=[...state.concepts];
  const kinds=new Set(ids.map((id)=>{ const c=conceptById(id); return c&&c.kind; }));
  ids.forEach((id)=>{
    const objs=state._conceptObjs.get(id);
    if(objs){ objs.forEach(disposeConceptObj); state._conceptObjs.delete(id); }
  });
  state.concepts.clear();
  /* regions and quadrants are one panel: restore the group, not each cell */
  const gridKind=kinds.has('region')?'region':kinds.has('quadrant')?'quadrant':null;
  ids.forEach((id)=>{
    const c=conceptById(id);
    if(!c||c.kind==='region'||c.kind==='quadrant') return;
    const objs=conceptObjects(id);
    state._conceptObjs.set(id,objs);
    state.concepts.add(id);
  });
  if(gridKind){
    const grp=ensureConceptGroup();
    const objs=buildCellGrid(gridKind,null,bodyMetrics(),grp);
    const first=BODY_CONCEPTS.find((x)=>x.kind===gridKind);
    if(first) state._conceptObjs.set(first.id,objs);
    BODY_CONCEPTS.filter((x)=>x.kind===gridKind).forEach((x)=>state.concepts.add(x.id));
  }
}

function conceptObjects(id){
  const c=conceptById(id);
  if(!c||!state.THREE||!state.scene) return [];
  const grp=ensureConceptGroup();
  const M=bodyMetrics();
  if(c.kind==='cavity') return buildCavity(c,M,grp);
  if(c.kind==='plane') return buildPlane(c,M,grp);
  if(c.kind==='region'||c.kind==='quadrant') return buildCellGrid(c.kind,c.id,M,grp);
  return [];
}
export function disposeConceptObj(o){
  o.traverse&&o.traverse(x=>{ x.geometry&&x.geometry.dispose&&x.geometry.dispose(); if(x.material){ x.material.map&&x.material.map.dispose&&x.material.map.dispose(); x.material.dispose&&x.material.dispose(); } });
  if(o.material){ o.material.map&&o.material.map.dispose&&o.material.map.dispose(); o.material.dispose&&o.material.dispose(); }
  o.parent&&o.parent.remove(o);
}
function clearConcepts(){
  if(state.conceptGroup){ [...state.conceptGroup.children].forEach(disposeConceptObj); }
  state.concepts.clear();
  state._conceptObjs&&state._conceptObjs.clear();
  state._cavInfo&&state._cavInfo.clear();
  /* a mode that faded or hid anatomy must not outlive the overlay it was for */
  if(state.cavityMode!=='normal'){ restoreAnatomyMaterials(); state.cavityMode='normal'; }
  publishConcepts();
}
function showConcept(id){
  const c=conceptById(id);
  if(!c) return false;
  if(!state.scene){ window.__osteo.boot().then(()=>showConcept(id)); return true; }
  /* regions/quadrants share one panel: rebuild so the emphasis follows the last pick */
  if(c.kind==='region'||c.kind==='quadrant'){
    BODY_CONCEPTS.filter(x=>x.kind===c.kind).forEach(x=>{
      const objs=state._conceptObjs.get(x.id); if(objs){ objs.forEach(disposeConceptObj); state._conceptObjs.delete(x.id); state.concepts.delete(x.id); }
    });
    const grp=ensureConceptGroup();
    const M=bodyMetrics();
    const objs=buildCellGrid(c.kind,c.id,M,grp);
    state._conceptObjs.set(c.id,objs);
    BODY_CONCEPTS.filter(x=>x.kind===c.kind).forEach(x=>state.concepts.add(x.id));
  } else {
    if(state.concepts.has(id)) return true;
    const objs=conceptObjects(id);
    state._conceptObjs.set(id,objs);
    state.concepts.add(id);
  }
  publishConcepts();
  return true;
}
function hideConcept(id){
  const objs=state._conceptObjs.get(id);
  if(objs){ objs.forEach(disposeConceptObj); state._conceptObjs.delete(id); }
  state.concepts.delete(id);
  publishConcepts();
}
function toggleConcept(id){ return state.concepts.has(id)?(hideConcept(id),false):(showConcept(id),true); }
/*
 * The group button is an on/off switch for the WHOLE kind.
 *
 * It used to turn off only the ids in its default set, and only when every one
 * of those was already on. Two ways that went wrong: a standalone cavity — the
 * pericardial, pleural, mediastinal ones, reachable individually from search
 * and from the item list — was excluded from the sweep and survived, so
 * pressing "Body cavities" to clear the view left cavities on screen; and with
 * a partial selection `allOn` was false, so the button turned MORE on instead
 * of clearing.
 *
 * Off now means off: if anything of this kind is showing, the button clears all
 * of it, standalone included.
 */
function showConceptKind(kind){
  const ids=BODY_CONCEPTS.filter(c=>c.kind===kind&&!c.standalone).map(c=>c.id);
  const every=BODY_CONCEPTS.filter(c=>c.kind===kind).map(c=>c.id);
  if(every.some(i=>state.concepts.has(i))){ every.forEach(hideConcept); return false; }
  if(kind==='region'||kind==='quadrant'){
    /* one build draws the whole grid; null emphasis = every cell equal */
    BODY_CONCEPTS.filter(x=>x.kind===kind).forEach(x=>{
      const o=state._conceptObjs.get(x.id); if(o){ o.forEach(disposeConceptObj); state._conceptObjs.delete(x.id); }
    });
    const grp=ensureConceptGroup();
    const objs=buildCellGrid(kind,null,bodyMetrics(),grp);
    state._conceptObjs.set(ids[0],objs);
    ids.forEach(i=>state.concepts.add(i));
    publishConcepts();
    return true;
  }
  ids.forEach(showConcept);
  return true;
}
function publishConcepts(){ if(state.conceptHook) try{ state.conceptHook([...state.concepts]); }catch(e){} }

window.__osteo={boot:()=>{if(!state.__booted){state.__booted=true;state.bootPromise=boot3D()}return state.bootPromise||Promise.resolve(!!state.scene)},resize,
  hide:(m)=>hideMesh(m||null),
  hideSelected:()=>hideMesh(null),
  unhide:(t)=>unhide(t),
  hiddenList:()=>hiddenRows(),
  setHiddenHook:(fn)=>{state.hiddenHook=fn||null;publishHidden();},
  revealStructure:(spec)=>revealStructure(spec),
  showConcept:(id)=>showConcept(id),
  hideConcept:(id)=>hideConcept(id),
  toggleConcept:(id)=>toggleConcept(id),
  toggleConceptKind:(k)=>showConceptKind(k),
  clearConcepts:()=>clearConcepts(),
  activeConcepts:()=>[...state.concepts],
  /* how a shown cavity was derived, so the card can say rather than imply */
  conceptProvenance:(id)=>{
    const info=state._cavInfo&&state._cavInfo.get(id);
    if(!info) return null;
    const ctx=state._cavCtx;
    const label=(k)=>{ try{ return ctx&&ctx.resolver.resolve(k).label||k; }catch(e){ return k; } };
    return {exact:info.exact,built:info.built,notes:info.notes,
      basis:info.basis.map(label)};
  },
  cavityModes:()=>CAVITY_MODES.map((m)=>({...m})),
  cavityMode:()=>state.cavityMode||'normal',
  setCavityMode:(m)=>applyCavityMode(m),
  /* which optional layers are loaded — the card explains what loading one adds */
  loadedLayers:()=>layerSignature().split(',').filter(Boolean),
  setConceptHook:(fn)=>{state.conceptHook=fn||null;publishConcepts();},
  startMovement:(mv)=>startMovement(mv),
  setMovementAngle:(d)=>setMovementAngle(d),
  endMovement:()=>endMovement(),
  movementState:()=>state.movement?{id:state.movement.mv.id,angle:state.movement.angle,moving:state.movement.restore.length}:null,
  focusStructures:(spec)=>focusStructures(spec),
  enterXray:()=>enterXray(),
  exitXray:()=>exitXray(),
  xrayView:(v)=>setXrayView(v),
  xrayRegion:(v)=>setXrayRegion(v),
  xrayExposure:(v)=>setXrayExposure(v),
  inXray:()=>!!state.xray,
  setPickHook:(fn)=>{state.pickHook=fn||null},
  /* The panel subscribes; the viewer publishes the whole line of structures
     under the last tap, nearest first. */
  setStackHook:(fn)=>{state.stackHook=fn||null},
  pickStack:()=>stackEntries(),
  pickFromStack:(i)=>selectFromStack(i),
  hideFromStack:(i)=>hideFromStack(i),
  clearPeel:()=>{restorePeel();publishStack()},
  peelDepth:()=>state.peeled.length,
  clearStudyFocus:()=>clearStudyFocus(),
  stageEl:()=>els.stage,
  /* The embedded osteology module keeps its quiz history in memory as well as in
     localStorage, so a reset has to reach in here or the review meter keeps
     showing a history whose storage has already gone. */
  resetStats:()=>{state.stats={};saveStats();renderReview()},
  setLayer:async(key,on,file)=>{
    if(key==='skeleton'){setLayer('skeleton',on);return true}
    if(!on){setLayer(key,false);return true}
    try{await loadExtraModel(key,file);setLayer(key,true);return true}
    catch(e){showToast('Could not load that layer — the others are still there.');return false}
  },
  layerState:()=>({...state.layers}),
  /* The pool line counts the layers that are on, so the rail tells it when
     that changes rather than the line going stale. */
  refreshStudyPool:()=>renderStudyPool(),
  setPhysiology:(on)=>setPhysiology(on),
  physiologyOn:()=>state.flow.on,
  /* How many meshes of each class a loaded layer turned out to hold -- the
     legend prints the real count rather than a claim about the atlas. */
  flowCounts:(key)=>key?{...(state.flow.counts[key]||{})}:JSON.parse(JSON.stringify(state.flow.counts)),
  flowClassOf:(id)=>{
    const all=[...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)];
    const hit=all.find(m=>m.userData.canonicalId===id);
    return hit?hit.userData.flowClass||null:null;
  },
  layerLoaded:(key)=>key==='skeleton'?!!state.fullModel:!!state.extraModels[key],
  setLayerOpacity:(key,v)=>{state.layerOpacity={...(state.layerOpacity||{}),[key]:v};applyLayers()},
  showSystem:async(key,file)=>{
    if(!key){setExtraVisible(null);return true}
    try{await loadExtraModel(key,file);setExtraVisible(key);return true}
    catch(e){showToast('Could not load that model — the skeleton is still available.');return false}
  },
  selectInSystem:async(key,file,meshName)=>{
    try{
      const m=await loadExtraModel(key,file);
      setExtraVisible(key);
      const norm=s=>String(s||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim();
      const want=norm(meshName);
      let hit=null;
      for(const cand of [want,want+'l',want+'r']){
        hit=m.meshes.find(o=>norm(o.userData.label||o.name)===cand);
        if(hit)break;
      }
      if(!hit)hit=m.meshes.find(o=>norm(o.userData.label||o.name).startsWith(want));
      if(!hit)return false;
      highlightExtra(hit);
      return true;
    }catch(e){return false}
  },select:(id)=>{const r=getRecord(id);if(r)selectBone(r.id)},selectMesh:(meshName,preferSide)=>{
    /*
     * Target one of the 277 atlas meshes by its source name. The loader
     * normalises names on import: "Scaphoid bone.r" arrives as "Scaphoid_boner",
     * so the side suffix loses its dot and glues onto the end.
     * We APPEND a candidate l/r rather than stripping one, because plenty of
     * bones legitimately end in those letters (femur, vomer, patella).
     */
    const norm=(s)=>String(s||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim();
    const want=norm(meshName);
    if(!want)return false;
    const candidates=preferSide==='left'?[want+'l',want,want+'r']
      :preferSide==='right'?[want+'r',want,want+'l']
      :[want,want+'l',want+'r'];
    let hit=null;
    for(const cand of candidates){
      hit=state.fullMeshes.find(mesh=>norm(mesh.userData?.label||mesh.name)===cand);
      if(hit)break;
    }
    if(!hit)hit=state.fullMeshes.find(mesh=>norm(mesh.userData?.label||mesh.name).startsWith(want));
    if(!hit)return false;
    const id=hit.userData?.canonicalId;
    if(!id)return false;
    selectBone(id,hit.userData?.side||null);
    return true;
  },state};
  export const MEMORY_TIPS={
    cranium:{root:'Greek kranion — helmet/skull',tip:'CRANium is the cap that holds the brain.'},
    mandible:{root:'Latin mandere — to chew',tip:'MANdible = MAN-chews. It is the mobile skull bone.'},
    cervical:{root:'Latin cervix — neck',tip:'Seven vertebrae: breakfast at 7. C1 Atlas holds the head; C2 Axis lets you say no.'},
    thoracic:{root:'Greek thorax — chest armour',tip:'Twelve vertebrae: lunch at 12, with ribs attached.'},
    lumbar:{root:'Latin lumbus — loin',tip:'Five large load-bearing vertebrae: dinner at 5. Lumbar bodies are chunky.'},
    sacrum:{root:'Latin os sacrum — sacred bone',tip:'The sacred wedge-shaped keystone locks the pelvic ring together.'},
    coccyx:{root:'Greek kokkyx — cuckoo',tip:'It is shaped like a cuckoo beak: the tail remnant left behind.'},
    sternum:{root:'Greek sternon — chest',tip:'Manubrium, body, xiphoid: head, torso, sword-tip.'},
    ribs:{root:'Rib-count memory',tip:'1–7 go alone, 8–10 carpool, 11–12 walk free.'},
    clavicle:{root:'Latin clavicula — little key',tip:'The only horizontal long bone: an S-shaped key between sternum and shoulder.'},
    scapula:{root:'Shoulder blade / spade',tip:'A flat triangle with a spine and a shallow glenoid socket: mobility over stability.'},
    humerus:{root:'The funny-bone groove',tip:'The humerus has the radial nerve spiral groove: the funny bone grooves.'},
    radius:{root:'Latin radius — spoke/rod',tip:'The radius rotates over the ulna like a wheel spoke. It is on the thumb side.'},
    ulna:{root:'Latin ulna — elbow',tip:'ULna = yoUr elbow side: the pinky-side stable hinge.'},
    hand:{root:'8 carpals, 5 metacarpals, 14 phalanges',tip:'Carpals: Some Lovers Try Positions That They Can’t Handle.'},
    pelvis:{root:'Latin pelvis — basin',tip:'A basin made of ilium, ischium and pubis: I sit on my ischial tuberosity.'},
    femur:{root:'The thigh bone',tip:'The longest and strongest bone angles inward from hip to knee.'},
    patella:{root:'Latin — small pan/dish',tip:'The largest sesamoid bone slides like a dish in the trochlear groove.'},
    tibia:{root:'Latin tibia — flute/shinbone',tip:'TIBia = TIBe weight-bearing. The medial malleolus is the inner ankle bump.'},
    fibula:{root:'Latin fibula — pin/buckle',tip:'FiBUla is the thin lateral pin and ends in the lower lateral malleolus.'},
    foot:{root:'26 bones per foot',tip:'Tarsals, metatarsals, phalanges: 7–5–14.'}
  };


  function saveStats(){ try{localStorage.setItem('osteology-studio-stats',JSON.stringify(state.stats))}catch{} }
  export function record(id, correct, elapsed){ const s=state.stats[id] || {attempts:0,correct:0,incorrect:0,avgMs:0,lastReviewed:null,confidence:0}; s.attempts++; correct?s.correct++:s.incorrect++; s.avgMs=Math.round(((s.avgMs*(s.attempts-1))+elapsed)/s.attempts); s.lastReviewed=new Date().toISOString(); s.confidence=Math.round((s.correct/s.attempts)*100); state.stats[id]=s; saveStats(); renderReview(); }
  export function showToast(message){ els.toast.textContent=message; els.toast.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>els.toast.classList.remove('show'),2200); }
  export function clean(text){return text.replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function memoryTipHTML(record){const key=record?.id?.replace(/^(full:|real:)/,'')?.replace(/-(left|right)$/,'');const tip=MEMORY_TIPS[key]||MEMORY_TIPS[record?.modelObjectIds?.map(id=>id.replace(/-(left|right)$/,'')).find(id=>MEMORY_TIPS[id])];return tip?`<div class="memtip"><span class="mem-root">Memory hook · ${clean(tip.root)}</span><span class="mem-body">💡 ${clean(tip.tip)}</span></div>`:''}
  export function regionLabel(id){if(id==='all')return 'All regions';if(!id)return 'Unclassified';/* System layers carry their layer key as a region -- a vein has no bone region. */if(LAYER_NAMES[id])return LAYER_NAMES[id];return REGIONS.find(r=>r.id===id)?.label || id}
  /*
   * The quiz pool.
   *
   * A question is only fair if the answer exists on the model in front of you.
   * Four of the 21 canonical records are groupings the atlas does not carry a
   * single mesh for -- it names 'Frontal bone' and 'Vertebra T5', not 'cranium'
   * and 'thoracic' -- so asking you to find one had no right answer to tap.
   * Those are dropped from the drill and kept everywhere else.
   */
  function selectableIds(){
    if(state.selectableCache&&state.selectableCache.n===state.fullMeshes.length)return state.selectableCache.set;
    const set=new Set(state.fullMeshes.map(m=>m.userData.sourceCanonicalId).filter(Boolean));
    state.meshes.forEach(m=>{if(m.userData.canonicalId)set.add(m.userData.canonicalId)});
    state.selectableCache={n:state.fullMeshes.length,set};
    return set;
  }
  export function pool(){
    const byRegion=ANATOMY_DATABASE.filter((r)=>state.region==='all'||r.region===state.region);
    /* Before the model is up there is nothing to check against, so everything
       stays in rather than the drill silently emptying. */
    const ok=selectableIds();
    if(!ok.size)return byRegion;
    const drillable=byRegion.filter(r=>ok.has(r.id));
    return drillable.length?drillable:byRegion;
  }
  /* The pool a given mode can actually use, and why it is smaller if it is. */
  function modePool(mode){
    const base=pool();
    if(mode==='side')return {records:base.filter(r=>r.modelObjectIds.some(id=>id.includes('-left')||id.includes('-right'))),need:'a left and a right in the model'};
    if(mode==='landmarks')return {records:base.filter(r=>LANDMARK_HOTSPOTS[r.id]?.length),need:'named landmark hotspots'};
    if(mode==='memory')return {records:base.filter(r=>MEMORY_TIPS[r.id]),need:'an authored memory hook'};
    return {records:base,need:null};
  }
  function weightedPick(records=pool()){const sorted=[...records].sort((a,b)=>((state.stats[b.id]?.incorrect||0)-(state.stats[a.id]?.incorrect||0))||((state.stats[a.id]?.attempts||0)-(state.stats[b.id]?.attempts||0)));return sorted[Math.floor(Math.random()*Math.min(5,sorted.length))] || records[0]}

  export function renderRegions(){ els.regions.innerHTML=''; [['all','All regions'],...REGIONS.map(r=>[r.id,r.label])].forEach(([id,label])=>{const b=document.createElement('button');b.className='region-btn'+(state.region===id?' active':'');b.textContent=label;b.onclick=()=>{state.region=id;els.regionMeta.textContent=regionLabel(id);applyVisibility();if(state.mode!=='explore')startQuestion();renderRegions();renderStudyPool()};els.regions.appendChild(b)}) }
  export function renderReview(){const reviewed=Object.values(state.stats).filter(s=>s.attempts>0).length;const accuracy=Object.values(state.stats).reduce((n,s)=>n+s.correct,0)/Math.max(1,Object.values(state.stats).reduce((n,s)=>n+s.attempts,0));els.reviewNumber.textContent=`${reviewed} / ${ANATOMY_DATABASE.length} reviewed`;els.reviewBar.style.width=`${Math.round(accuracy*100)}%`;els.reviewHint.textContent=reviewed?`${Math.round(accuracy*100)}% correct overall · weaker structures are prioritised.`:'Start with Identify to create your first review history.'}
  export function selectBone(id, side=null){state.selectedId=id;state.selectedSide=side;const record=getRecord(id);if(!record)return;const layerMeshes=Object.values(state.extraModels||{}).flatMap(m=>m.meshes);state.selectionAnchor=state.meshes.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||layerMeshes.find(m=>m.userData.canonicalId===id)||state.fullMeshes.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||state.fullPickables.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||null;renderSelected(record,side);highlight(id,side);
    /* the name stays on the model until the selection changes */
    if(state.selectionAnchor)showPickCallout(state.selectionAnchor,side?`${record.canonicalName}\n${side}`:record.canonicalName);
    if(state.isolated)applyVisibility()}
  export function openDetail(record,side=null){els.detailTitle.textContent=record.canonicalName;els.detailChips.innerHTML=`<span class="chip">${regionLabel(record.region)}</span><span class="chip">${side||record.side}</span><span class="chip">Level ${record.difficulty}</span>`;els.detailBody.innerHTML=`<div class="info-grid"><div><div class="info-label">Landmarks</div><ul class="compact-list">${record.landmarks.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div><div><div class="info-label">Articulations</div><ul class="compact-list">${record.articulations.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div></div>${memoryTipHTML(record)}<h3>Radiography</h3><p>${clean(record.radiographyImportance)}</p><h3>Common confusions</h3><p>${record.commonConfusions?.map(clean).join(', ')||'None listed.'}</p>`;state.lastDetailId=record.id;location.hash=`detail/${record.id}`;(window.__rssOpenDialog ? window.__rssOpenDialog(els.detailDialog) : els.detailDialog.showModal())}
  /*
   * What the selected structure DOES, not just what it is called.
   *
   * The class is the one the shader is already animating it as, so the line
   * always agrees with the colour on screen -- a vessel described as carrying
   * oxygenated blood is the one drawn red, every time.
   */
  function physLineHTML(id){
    const all=[...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)];
    const hit=all.find(m=>m.userData.canonicalId===id);
    const spec=hit&&FLOW_CLASSES[hit.userData.flowClass];
    if(!spec||!spec.says) return '';
    return `<div class="physline" style="--tone:#${spec.color.toString(16).padStart(6,'0')}"><b>${clean(spec.label)}</b><span>${clean(spec.says)}</span></div>`;
  }
  /*
   * Does the course name this, and where?
   *
   * The panel used to say the same thing about every structure in the model,
   * so tapping the aortic valve and tapping the anterior meniscotibial
   * ligament produced identically confident cards. mesh-index.js now carries
   * the taught or assessed file that names each structure -- or records that
   * none does -- so the card can say which of the two you are looking at.
   */
  const INDEX_ROW=new Map();
  const INDEX_UNIT=new Map();
  MESH_INDEX.forEach(m=>{
    INDEX_ROW.set(m.layer+'|'+m.name.toLowerCase(),m);
    if(m.unitKind!=='course') INDEX_UNIT.set(m.layer+'|'+m.unit.toLowerCase(),m);
  });
  export function courseChipHTML(record,anchor){
    const ud=anchor&&anchor.userData||{};
    const layer=ud.layerKey||ud.extraKey||'skeleton';
    const key=layer+'|'+String(record.canonicalName||'').toLowerCase();
    const row=INDEX_ROW.get(key);
    if(row&&row.tier===0&&row.source){
      const leaf=row.source.file.split('/').pop().replace(/\.(pdf|pptx)$/i,'');
      const how=row.source.evidence==='listed'?'In the examinable glossary'
        :row.source.evidence==='mirrored'?'Named in your notes, on the other side'
        :row.source.evidence==='described'?`Described in ${leaf}`
        :`Named in ${leaf}`;
      return `<span class="chip learn" title="${clean(row.source.file)}">${clean(how)}</span>`;
    }
    const unit=INDEX_UNIT.get(key);
    if(unit) return unit.unitKind==='lone'
      ? '<span class="chip beyond">Beyond your course \u2014 one of a kind</span>'
      : `<span class="chip beyond">Beyond your course \u2014 ${unit.unitSize} under one name</span>`;
    if(row) return '<span class="chip beyond">Not named in your course material</span>';
    return '';
  }
  function renderSelected(record,side){const card=$('selectedCard');if(card)card.classList.remove('quiet');els.selectedName.textContent=record.canonicalName;els.selectedChips.innerHTML=`<span class="chip">${regionLabel(record.region)}</span><span class="chip">${side||record.side}</span><span class="chip">Level ${record.difficulty}</span>${courseChipHTML(record,state.selectionAnchor)}`;els.selectedDetails.innerHTML=`${physLineHTML(record.id)}<div class="info-grid"><div><div class="info-label">Landmarks</div><ul class="compact-list">${record.landmarks.slice(0,4).map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div><div><div class="info-label">Radiography</div><div class="info-value">${clean(record.radiographyImportance)}</div></div></div>${memoryTipHTML(record)}<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="primary detail-open" id="openDetailBtn" style="margin-top:0">Open detail</button><button class="icon-btn" id="hideSelectedBtn" style="min-height:38px;border:1px solid var(--line);border-radius:9px;background:rgba(255,186,103,.12);color:var(--orange);padding:0 12px;font-size:12px">Hide this</button></div>`;$('openDetailBtn').onclick=()=>openDetail(record,side);const hb=$('hideSelectedBtn');if(hb)hb.onclick=()=>hideMesh(state.selectionAnchor)}
  function clearFeedback(){els.feedback.className='feedback';els.feedback.textContent='';els.next.classList.remove('show')}
  /*
   * Choosing a mode used to silently rewrite the region to 'upper limb'.
   *
   * That dated from when the five BodyParts3D arm bones were the only
   * individually selectable meshes; the whole 277-mesh skeleton has been
   * selectable for a while, and the leftover switch meant picking 'Identify'
   * threw away the region you had chosen, swapped the model under you and then
   * asked you the same six bones forever. It is gone. Nothing moves when you
   * change mode except the question.
   */
  export function setMode(mode){
    state.mode=mode;state.current=null;clearFeedback();
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
    if(mode==='explore'){
      els.taskKicker.textContent='Explore';
      els.taskTitle.textContent='Select a structure';
      els.taskCopy.textContent='Tap any named structure. Tap the same spot again to step through whatever is behind it.';
      els.answers.innerHTML='';
      els.next.classList.remove('show');
      if(state.selectedId)renderSelected(getRecord(state.selectedId),state.selectedSide);
    } else startQuestion();
    const card=$('selectedCard');
    if(card)card.classList.toggle('quiet',mode!=='explore'&&!state.selectedId);
    renderStudyPool();
    applyModeVisuals();applyVisibility();
  }

  /* The line under the mode buttons: what is in the pool, and how to change it.
     The old build left you to infer both. */
  const MODE_LABEL={explore:'Explore',identify:'Identify',side:'Left / right',landmarks:'Landmarks',find:'Find',memory:'Memory hooks'};
  function renderStudyPool(){
    const box=$('studyPool');if(!box)return;
    const region=state.region==='all'?'whole skeleton':regionLabel(state.region);
    if(state.mode==='explore'){
      const layers=Object.keys(state.layers||{}).filter(k=>state.layers[k]).length;
      box.innerHTML=`<span>Browsing the <span class="sc">${clean(region)}</span> · ${layers} layer${layers===1?'':'s'} on</span>`;
      return;
    }
    const {records,need}=modePool(state.mode);
    const total=pool().length;
    const short=records.length<total;
    box.innerHTML=`<span><span class="sc${records.length?'':' warn'}">${records.length}</span> structure${records.length===1?'':'s'} in this drill · ${clean(region)}`
      +(short&&need?` · only these have ${clean(need)}`:'')
      +`</span>`+(state.region!=='all'?` <button id="poolWiden">use the whole skeleton</button>`:'');
    const w=$('poolWiden');
    if(w)w.onclick=()=>{state.region='all';els.regionMeta.textContent='All regions';renderRegions();applyVisibility();startQuestion();renderStudyPool()};
  }

  /* Attempts, accuracy and the run you are on, where you are actually drilling
     rather than only in the sheet behind the '⋯'. */
  function scoreHTML(){
    const vals=Object.values(state.stats||{});
    const attempts=vals.reduce((n,s)=>n+(s.attempts||0),0);
    const correct=vals.reduce((n,s)=>n+(s.correct||0),0);
    if(!attempts)return '<div class="studyscore">no attempts yet on this device</div>';
    return `<div class="studyscore"><span><b>${correct}</b>/${attempts} correct</span>`
      +`<span><b>${Math.round(correct/attempts*100)}%</b></span>`
      +(state.runStreak>1?`<span class="hot"><b>${state.runStreak}</b> in a row</span>`:'')+`</div>`;
  }
  function applyModeVisuals(){if(state.mode==='landmarks'&&!state.hotspots.length&&state.THREE&&state.scene){addHotspots(state.THREE,state.realModel||state.scene);if(!state.realIsProcedural)remapHotspotsToReal(state.THREE)}state.hotspots.forEach(h=>h.visible=state.mode==='landmarks'&&(!state.selectedId||h.userData.parentId===state.selectedId));if(state.mode==='find'&&state.current){clearHighlight()}else if(state.current?.id){highlight(state.current.id,state.current.side)} }
  /*
   * One question.
   *
   * Every mode now says the same three things in the same three places: what
   * level you are on, what you are being asked, and what you are supposed to
   * DO about it. The old copy left 'Find' explaining itself and 'Identify'
   * not, and a mode with an empty pool rendered nothing at all -- the card
   * simply kept the previous question and looked broken.
   */
  const MODE_ASK={
    identify:{kick:'Level 1 · Identify',title:()=>'What bone is this?',copy:'It is lit up on the model. Choose its canonical name.'},
    side:{kick:'Level 2 · Left or right',title:(r)=>`Is this a left or right ${r.canonicalName.toLowerCase()}?`,copy:'Judge it from the landmarks in anatomical position, not from which side of the screen it is on.'},
    landmarks:{kick:'Level 3 · Landmarks',title:()=>'Identify the highlighted landmark',copy:'The hotspots are showing. Tap the one you are asked for.'},
    find:{kick:'Level 4 · Find',title:(r)=>`Find the ${r.canonicalName.toLowerCase()}`,copy:'Nothing is highlighted. Rotate the model and tap it. Tapping the same spot twice steps behind whatever is in front.'},
    memory:{kick:'Level 5 · Memory hooks',title:()=>'Which bone does this hook belong to?',copy:'Read the hook, then choose the structure it describes.'},
  };
  export function startQuestion(){
    const mode=state.mode;
    const {records,need}=modePool(mode);
    if(!records.length){
      /* Say why, and offer the one action that fixes it. */
      els.taskKicker.textContent=MODE_LABEL[mode]||mode;
      els.taskTitle.textContent='Nothing to ask here yet';
      els.taskCopy.textContent=state.region==='all'
        ?`No structure in the database has ${need||'what this mode needs'} yet.`
        :`No structure in ${regionLabel(state.region)} has ${need||'what this mode needs'}. Widen the region, or try another level.`;
      els.answers.innerHTML='';clearHighlight();els.next.classList.remove('show');
      return;
    }
    const record=weightedPick(records);
    if(!record)return;
    let side=null;
    if(mode==='side'){
      const ids=record.modelObjectIds.filter(id=>id.includes('-left')||id.includes('-right'));
      side=ids[Math.floor(Math.random()*ids.length)].includes('-left')?'Left':'Right';
    }
    state.current={id:record.id,side,started:performance.now(),mode};
    state.quizStarted=true;
    const ask=MODE_ASK[mode]||MODE_ASK.identify;
    els.taskKicker.textContent=ask.kick;
    els.taskTitle.textContent=ask.title(record);
    els.taskCopy.textContent=ask.copy;
    if(mode==='identify')highlight(record.id);
    else if(mode==='side')highlight(record.id,side);
    else clearHighlight();
    if(mode==='memory'){
      if(state.memoryStreak>=2){state.current.cloze=true;renderMemoryCloze(record)}
      else renderMemoryAnswers(record);
    } else renderAnswers(record,mode);
    if(mode==='landmarks')renderLandmarkQuestion(record);
    renderStudyPool();
  }
  export function startQuestionFor(record){state.current={id:record.id,side:null,started:performance.now(),mode:state.mode};renderAnswers(record,state.mode)}
  /*
   * Distractors come from the whole selectable skeleton, not from the filtered
   * region. Drawing them from the region meant a one-bone filter produced a
   * one-option multiple choice, and even at three it was giving the answer
   * away: if every option is a skull bone, 'which of these is a skull bone'
   * has stopped being a question.
   */
  function distractorPool(){
    const ok=selectableIds();
    const wide=ok.size?ANATOMY_DATABASE.filter(r=>ok.has(r.id)):ANATOMY_DATABASE;
    return wide.length>3?wide:ANATOMY_DATABASE;
  }
  function renderAnswers(record,mode){els.answers.innerHTML='';if(mode==='find'||mode==='landmarks')return;let options=[];if(mode==='side'){options=['Left','Right']}else{const others=distractorPool().filter(r=>r.id!==record.id).sort(()=>Math.random()-.5).slice(0,3);options=[record,...others].sort(()=>Math.random()-.5).map(r=>r.id)}options.forEach((option,i)=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<b>${String.fromCharCode(65+i)}</b>${mode==='side'?option:clean(getAnatomy(option).canonicalName)}`;b.onclick=()=>answer(option,b);els.answers.appendChild(b)})}
  function renderMemoryAnswers(record){els.answers.innerHTML='';const tip=MEMORY_TIPS[record.id];if(!tip){startQuestion();return}const box=document.createElement('div');box.className='memtip';box.innerHTML=`<span class="mem-root">Memory hook</span><span class="mem-body">💡 ${clean(tip.tip)}</span>`;els.answers.appendChild(box);const others=distractorPool().filter(r=>r.id!==record.id&&MEMORY_TIPS[r.id]).sort(()=>Math.random()-.5).slice(0,3);[record,...others].sort(()=>Math.random()-.5).forEach((r,i)=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<b>${String.fromCharCode(65+i)}</b>${clean(r.canonicalName)}`;b.onclick=()=>answer(r.id,b);els.answers.appendChild(b)})}
  function renderMemoryCloze(record){const tip=MEMORY_TIPS[record.id];els.answers.innerHTML='';const box=document.createElement('div');box.className='memtip';box.innerHTML=`<span class="mem-root">Cloze recall</span><span class="mem-body">💡 ${clean(tip.tip)}</span>`;const input=document.createElement('input');input.type='search';input.placeholder='Type the bone name';input.autocomplete='off';input.style.cssText='width:100%;background:#0a141b;color:var(--text);border:1px solid var(--line);border-radius:10px;padding:11px 12px;outline:none';const button=document.createElement('button');button.className='primary next show';button.textContent='Check answer';button.onclick=()=>{const normalize=s=>s.toLowerCase().replace(/[^a-z]/g,'');recordAnswer(normalize(input.value)===normalize(record.canonicalName),record,null)};els.answers.append(box,input,button);setTimeout(()=>input.focus(),50)}
  function renderLandmarkQuestion(record){const hotspots=LANDMARK_HOTSPOTS[record.id]||[];if(!hotspots.length){els.taskTitle.textContent='Landmark data next';els.taskCopy.textContent='This bone is in the database, but high-yield hotspot coordinates have not been added yet.';return}const target=hotspots[Math.floor(Math.random()*hotspots.length)];state.current.landmark=target.id;els.taskTitle.textContent=`Find the ${target.label.toLowerCase()}`;els.answers.innerHTML='';hotspots.forEach((h)=>{const b=document.createElement('button');b.className='answer';b.textContent=h.label;b.onclick=()=>answer(h.id,b);els.answers.appendChild(b)});showHotspots(record.id)}
  export function answer(option,button){if(!state.current)return;const correct=state.current.mode==='side'?option===state.current.side:state.current.mode==='landmarks'?option===state.current.landmark:option===state.current.id;const record=getRecord(state.current.id);if(record)recordAnswer(correct,record,button);}
  function recordAnswer(correct,bone,button){const elapsed=performance.now()-state.current.started;if(state.current.mode==='memory')state.memoryStreak=correct?state.memoryStreak+1:0;state.runStreak=correct?(state.runStreak||0)+1:0;record(bone.id,correct,elapsed);document.querySelectorAll('.answer').forEach(b=>b.disabled=true);if(button)button.classList.add(correct?'correct':'wrong');if(!correct){const correctText=state.current.mode==='side'?state.current.side:state.current.mode==='landmarks'?(LANDMARK_HOTSPOTS[bone.id]||[]).find(h=>h.id===state.current.landmark)?.label:bone.canonicalName;const hook=MEMORY_TIPS[bone.id]?.tip?` Memory hook: ${MEMORY_TIPS[bone.id].tip}`:'';els.feedback.className='feedback bad show';els.feedback.textContent=`Not quite. Correct: ${correctText}. ${bone.landmarks[0]} is the useful distinguishing landmark.${hook}`}else{els.feedback.className='feedback good show';els.feedback.textContent=state.current.mode==='find'?'Correct — you found it in space.':`Correct. ${bone.radiographyImportance}`;}highlight(bone.id,state.current.side);els.feedback.insertAdjacentHTML('beforeend',scoreHTML());els.next.classList.add('show')}
  export function onBonePicked(obj){const {canonicalId,side}=obj.userData;const record=getRecord(canonicalId);const sourceId=obj.userData.sourceCanonicalId;/* Tapping a bone selects it. It used to also flip the viewer to the   upper-limb region and swap the model, which is a surprise at the best of   times and left the other layers standing next to a different skeleton. */if(state.mode==='find'&&state.current){const correct=canonicalId===state.current.id;const questionRecord=getAnatomy(state.current.id);recordAnswer(correct,questionRecord,null);if(!correct){selectBone(canonicalId,side);els.feedback.className='feedback bad show';els.feedback.textContent=`Not that one — try again. You tapped ${getRecord(canonicalId)?.canonicalName||'another structure'}.`;els.next.classList.remove('show');document.querySelectorAll('.answer').forEach(b=>b.disabled=false);state.current.started=performance.now();return}return}if(state.mode==='landmarks'&&obj.userData.landmarkId){answer(obj.userData.landmarkId,null);return}if(record)selectBone(canonicalId,side)}
  export function clearHighlight(){[...state.meshes,...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].forEach(m=>{m.material.emissive?.setHex(0x000000);m.material.emissiveIntensity=0;m.userData.presentationActive=false;if(state.xray&&m.userData.xrayHot){m.material.dispose();m.material=state.xray.shared.get(m.userData.xrayKey);delete m.userData.xrayHot}if(m.userData.baseScale)m.scale.set(...m.userData.baseScale);if(m.userData.basePosition)m.position.set(...m.userData.basePosition)});state.fullPickables.forEach(m=>{m.material.opacity=0})}
  export function highlight(id,side=null){clearHighlight();[...state.meshes,...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{/* In the projection there is no emissive channel to light up, so a pick   reads as a brighter, tinted accumulation instead. */if(state.xray&&m.userData.xrayKey){const mu=(XRAY_MU[m.userData.xrayKey]||.12)*3.4;m.material=xrayDepthMaterial(state.THREE,mu);m.userData.xrayHot=true}else{m.material.emissive?.setHex(0x1eb9a6);m.material.emissiveIntensity=.95}m.userData.presentationActive=true});state.fullPickables.filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{m.material.opacity=.26})}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  state.cavityMode='normal';
  state._conceptObjs=new Map();
}
