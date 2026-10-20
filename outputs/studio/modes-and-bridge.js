/*
 * Visualisation modes.
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { viewerStructureName } from '../search-name.js';
import { $, BODY_CONCEPTS, CM_PER_UNIT, FLOW_CLASSES, LAYER_NAMES, MESH_INDEX, REGIONS, conceptById, els, layerOf, mu, state } from './imports.js';
import { XRAY_LAYERS, XRAY_LAYER_FILES, applyLayers, enterXray, exitXray, setExtraVisible, setLayer, setPhysiology, setXrayAec, setXrayKvp, setXrayMas, setXrayRegion, setXrayView, setXrayWindow, setXrayZoom, unitFor, xrayDepthMaterial } from './live-physiology.js';
import { applyVisibility, boot3D, getRecord, resize } from './scene.js';
import { bodyMetrics, ensureConceptGroup, showPickCallout } from './spatial-concept-overlays.js';
import { buildCavity, buildCellGrid, buildPlane, cavityContext, cavityStyle } from './cavity-geometry-derived.js';
import { hiddenRows, hideMesh, publishHidden, unhide } from './hide-and-search.js';
import { hideFromStack, loadExtraModel, publishStack, restorePeel, selectFromStack, stackEntries, pick } from './depth-picking.js';
import { frameRegion, setSeparation } from './tools-and-capture.js';
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
export function clearConcepts(){
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
  /*
   * Every overlay below is measured off the assembled body, through the
   * skeleton pivot. Separated, a cavity would be built from lungs sitting a
   * body-depth in front of the ribs that bound them -- and meshPointsLocal
   * would cache those vertices. Collapse first; setSeparation drops the
   * caches on the way past.
   */
  if(state.separation) setSeparation(0);
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
  if(state.separation) setSeparation(0);
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

/* `layerOnly`: an ordinary layer change (a chip, an opacity, a layer load). The enhanced heart is a view of the
   normal viewer and survives those; every other action that closes an atlas closes it too. */
function closeHeartAtlasForAction(layerOnly = false) {
  if (state.heartAtlasLoading) {
    showToast('The heart atlas is loading. Please wait.');
    return false;
  }
  if (layerOnly && state.enhancedHeartOn) return true;
  if (state.heartAtlasOn && typeof window !== 'undefined') window.__osteo?.exitHeartAtlas?.();
  return !state.heartAtlasOn;
}

window.__osteo={boot:()=>{if(!state.__booted){state.__booted=true;state.bootPromise=boot3D()}return state.bootPromise||Promise.resolve(!!state.scene)},resize,
  hide:(m)=>hideMesh(m||null),
  unhide:(t)=>unhide(t),
  hiddenList:()=>hiddenRows(),
  setHiddenHook:(fn)=>{state.hiddenHook=fn||null;publishHidden();},
  revealStructure:(spec)=>revealStructure(spec),
  showConcept:(id)=>showConcept(id),
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
  setConceptHook:(fn)=>{state.conceptHook=fn||null;publishConcepts();},
  /*
   * The beam's tissue layers, RESIDENT, before the projection is entered.
   *
   * enterXray turns the chips on, and turning a chip on does not fetch a GLB:
   * the muscle and organ files are lazy-loaded, and enterXray is synchronous.
   * Without this the film is a chest with no lungs in it -- which is exactly
   * the thing the layer set was widened to fix.
   *
   * Note the key here is a GLB LAYER key, which is what loadExtraModel takes.
   * setLayer above takes a CHIP key and does not load anything, so it is the
   * wrong call for this -- see outputs/systems.js for the difference.
   *
   * A layer that will not load is reported once and then left out; the beam
   * draws what it has rather than refusing to draw at all.
   */
  ensureXrayLayers:async()=>{
    for(const k of XRAY_LAYERS){
      if(k==='skeleton'||state.extraModels[k])continue;
      const file=XRAY_LAYER_FILES[k];
      if(!file)continue;
      try{await loadExtraModel(k,file)}
      catch(e){showToast(`Could not load the ${LAYER_NAMES[k]||k} layer — the beam is drawing what it has.`)}
    }
    return XRAY_LAYERS.filter(k=>k==='skeleton'?!!state.fullModel:!!state.extraModels[k]);
  },
  enterXray:()=>enterXray(),
  exitXray:()=>exitXray(),
  xrayView:(v)=>setXrayView(v),
  xrayRegion:(v)=>setXrayRegion(v),
  xrayKvp:(v)=>setXrayKvp(v),
  xrayMas:(v)=>setXrayMas(v),
  xrayAec:(v)=>setXrayAec(v),
  xrayWindow:(w,l)=>setXrayWindow(w,l),
  xrayZoom:(v)=>setXrayZoom(v),
  layerOpacity:()=>({...state.layerOpacity}),
  inXray:()=>!!state.xray,
  /* The panel subscribes; the viewer publishes the whole line of structures
     under the last tap, nearest first. */
  setStackHook:(fn)=>{state.stackHook=fn||null},
  pickStack:()=>stackEntries(),
  /* The mesh-index study units of what is selected (ids carry them as ':u:<id>'), so the study half
     can say where the selection sits in Revise. */
  selectedUnits:()=>[...new Set([state.selectedId,...(state.selectionMeshes||[]).map(m=>m.userData&&m.userData.canonicalId)]
    .map(id=>/:u:(\d+)/.exec(String(id||''))).filter(Boolean).map(m=>Number(m[1])))],
  pickFromStack:(i)=>selectFromStack(i),
  hideFromStack:(i)=>hideFromStack(i),
  clearPeel:()=>{restorePeel();publishStack()},
  stageEl:()=>els.stage,
  setLayer:async(key,on,file)=>{
    if(!closeHeartAtlasForAction(true))return false;
    /* The skeleton is already in the scene -- there is no file to fetch for
       either of its two chips, so they switch and return. */
    if(layerOf(key)==='skeleton'){setLayer(key,on);return true}
    if(!on){setLayer(key,false);return true}
    /* One GLB can draw several chips, so the file loads under its LAYER key
       while the CHIP is what gets switched on -- see outputs/systems.js. */
    try{await loadExtraModel(layerOf(key),file);setLayer(key,true);return true}
    catch(e){showToast('Could not load that layer — the others are still there.');return false}
  },
  layerState:()=>({...state.layers}),
  setPhysiology:(on)=>setPhysiology(on,true),
  physiologyOn:()=>state.flow.on,
  /*
   * What is on screen RIGHT NOW, by flow class.
   *
   * The per-file counts are a property of the FILE, counted once as it loaded,
   * and two of the files now draw several chips each. With only Venous on, a
   * legend built from the file printed the artery swatch and a count of 723
   * beside a screen with no arteries on it. This counts what is visible.
   */
  visibleFlowCounts:()=>{
    const out={};
    [...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes||[])]
      .forEach(o=>{if(o.visible===false)return;const c=o.userData&&o.userData.flowClass;if(c)out[c]=(out[c]||0)+1});
    return out;
  },
  layerLoaded:(key)=>layerOf(key)==='skeleton'?!!state.fullModel:!!state.extraModels[layerOf(key)],
  setLayerOpacity:(key,v)=>{if(!closeHeartAtlasForAction(true))return;state.layerOpacity={...(state.layerOpacity||{}),[key]:v};applyLayers()},
  showSystem:async(key,file,options={})=>{
    if(!options.atlasEntry&&!closeHeartAtlasForAction(true))return false;
    if(!key){setExtraVisible(null);return true}
    try{await loadExtraModel(key,file);setExtraVisible(key);return true}
    catch(e){showToast(options.failureMessage||'Could not load that model — the skeleton is still available.');return false}
  },
  select:(id)=>{const r=getRecord(id);if(r)selectBone(r.id)},selectMesh:(meshName,preferSide)=>{
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


  export function showToast(message){ els.toast.textContent=message; els.toast.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>els.toast.classList.remove('show'),2200); }
  export function clean(text){return String(text ?? '').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function memoryTipHTML(record){const key=record?.id?.replace(/^(full:|real:)/,'')?.replace(/-(left|right)$/,'');const tip=MEMORY_TIPS[key]||MEMORY_TIPS[record?.modelObjectIds?.map(id=>id.replace(/-(left|right)$/,'')).find(id=>MEMORY_TIPS[id])];return tip?`<div class="memtip"><span class="mem-root">Memory hook · ${clean(tip.root)}</span><span class="mem-body">💡 ${clean(tip.tip)}</span></div>`:''}
  export function regionLabel(id){if(id==='all')return 'All regions';if(!id)return 'Unclassified';/* System layers carry their layer key as a region -- a vein has no bone region. */if(LAYER_NAMES[id])return LAYER_NAMES[id];return REGIONS.find(r=>r.id===id)?.label || id}
  export function renderRegions(){ els.regions.innerHTML=''; [['all','All regions'],...REGIONS.map(r=>[r.id,r.label])].forEach(([id,label])=>{const b=document.createElement('button');b.className='region-btn'+(state.region===id?' active':'');b.textContent=label;b.onclick=()=>{state.region=id;els.regionMeta.textContent=regionLabel(id);applyVisibility();/* Filtering without moving left you looking at a whole skeleton with most of it off. See frameRegion in studio/tools-and-capture.js. */frameRegion();renderRegions()};els.regions.appendChild(b)}) }
  export function selectBone(id, side=null){state.selectedId=id;state.selectedSide=side;const record=getRecord(id);if(!record)return;const layerMeshes=Object.values(state.extraModels||{}).flatMap(m=>m.meshes);state.selectionAnchor=layerMeshes.find(m=>m.userData.canonicalId===id)||state.fullMeshes.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||state.fullPickables.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||null;renderSelected(record,side);highlight(id,side);
    state.selectionMeshes=[...layerMeshes,...state.fullMeshes,...state.fullPickables].filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()));
    /* the name stays on the model until the selection changes. Only a real
       side is shown: the unpaired meshes of a layer carry the side bilateral,
       which keeps their ids apart from the paired ones, and the liver used to
       read Liver, bilateral. */
    const shownSide=/^(left|right)$/i.test(side||'')?side[0].toUpperCase()+side.slice(1).toLowerCase():'';
    if(state.selectionAnchor)showPickCallout(state.selectionAnchor,shownSide?`${record.canonicalName}\n${shownSide}`:record.canonicalName);
    if(state.isolated){clearHighlight();applyVisibility()}}
  export function openDetail(record,side=null){els.detailTitle.textContent=viewerStructureName(record.canonicalName);els.detailChips.innerHTML='';els.detailBody.innerHTML=`<div class="info-grid"><div><div class="info-label">Landmarks</div><ul class="compact-list">${record.landmarks.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div><div><div class="info-label">Articulations</div><ul class="compact-list">${record.articulations.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div></div>${memoryTipHTML(record)}<h3>Radiography</h3><p>${clean(record.radiographyImportance)}</p><h3>Common confusions</h3><p>${record.commonConfusions?.map(clean).join(', ')||'None listed.'}</p>`;state.lastDetailId=record.id;location.hash=`detail/${record.id}`;(window.__rssOpenDialog ? window.__rssOpenDialog(els.detailDialog) : els.detailDialog.showModal())}
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
  const INDEX_HEAD=new Map();
  MESH_INDEX.forEach(m=>{
    INDEX_ROW.set(m.layer+'|'+m.name.toLowerCase(),m);
    if(m.unitKind!=='course') INDEX_UNIT.set(m.layer+'|'+m.unit.toLowerCase(),m);
    if(m.isUnit) INDEX_HEAD.set(m.layer+'|'+m.unitId,m);
  });
  export function courseChipHTML(record,anchor){
    const ud=anchor&&anchor.userData||{};
    const layer=ud.layerKey||ud.extraKey||'skeleton';
    const key=layer+'|'+String(record.canonicalName||'').toLowerCase();
    /* The row that IS the unit speaks for it. The anchor of a selection can be
       any of its meshes (a branch of the femoral nerve, a segment of the liver),
       and the chip lost the lecture page whenever it was one of those. */
    const own=unitFor(layer,ud.label||record.canonicalName);
    const head=own&&INDEX_HEAD.get(layer+'|'+own.unitId);
    const lecture=own?.lectureSource||(head&&unitFor(layer,head.name)?.lectureSource);
    if(lecture){
      const leaf=lecture.file.replace(/\.pdf$/i,'').replace(/_/g,' ');
      return `<span class="chip learn" title="${clean(lecture.file)} · p${lecture.page}">Named in ${clean(leaf)} · p${lecture.page}</span>`;
    }
    const row=head||INDEX_ROW.get(key);
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
  /* Landmarks and Radiography, each only when it says something: a soft-tissue structure has no landmarks, and
     its "radiography" line is only the atlas's generic "Named structure in the ... layer" (unitBlurb), so a
     muscle's card showed two boxes with nothing in them. */
  function infoGridHTML(record){const lm=(record.landmarks||[]).slice(0,4),rad=String(record.radiographyImportance||'').trim();const boxes=[lm.length?`<div><div class="info-label">Landmarks</div><ul class="compact-list">${lm.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div>`:'',rad&&!/^Named structure in the /.test(rad)?`<div><div class="info-label">Radiography</div><div class="info-value">${clean(rad)}</div></div>`:''].filter(Boolean);return boxes.length?`<div class="info-grid">${boxes.join('')}</div>`:''}
  function renderSelected(record,side){const card=$('selectedCard');if(card)card.classList.remove('quiet');els.selectedName.textContent=viewerStructureName(record.canonicalName);els.selectedChips.innerHTML=courseChipHTML(record,state.selectionAnchor);els.selectedDetails.innerHTML=`${physLineHTML(record.id)}${infoGridHTML(record)}${memoryTipHTML(record)}<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="primary detail-open" id="openDetailBtn" style="margin-top:0">Open detail</button><button class="icon-btn" id="hideSelectedBtn" style="min-height:38px;border:1px solid var(--line);border-radius:9px;background:rgba(255,186,103,.12);color:var(--orange);padding:0 12px;font-size:12px">Hide this</button></div>`;$('openDetailBtn').onclick=()=>openDetail(record,side);const hb=$('hideSelectedBtn');if(hb)hb.onclick=()=>hideMesh(state.selectionAnchor)}
  /* Tapping a bone selects it. */
  export function onBonePicked(obj){const {canonicalId,side}=obj.userData;if(getRecord(canonicalId))selectBone(canonicalId,side)}
  export function clearHighlight(){[...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].forEach(m=>{m.material.emissive?.setHex(0x000000);m.material.emissiveIntensity=0;m.userData.presentationActive=false;if(state.xray&&m.userData.xrayHot){m.material.dispose();m.material=state.xray.shared.get(m.userData.xrayTissue);delete m.userData.xrayHot}if(m.userData.baseScale)m.scale.set(...m.userData.baseScale);if(m.userData.basePosition)m.position.set(...m.userData.basePosition)});state.fullPickables.forEach(m=>{m.material.opacity=0})}
  export function highlight(id,side=null){clearHighlight();if(state.isolated&&!state.xray)return;[...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{/* In the projection there is no emissive channel to light up, so a pick   reads as a brighter, tinted accumulation instead. */if(state.xray&&m.userData.xrayTissue){/* A hot pick is a marker, not a tissue: the real coefficient at the set   kVp, lifted, and no cortical shell -- an edge-brightened highlight would   read as anatomy. */const hot=mu(m.userData.xrayTissue,state.xray.kvp)*3.4;m.material=xrayDepthMaterial(state.THREE,hot,CM_PER_UNIT,0);m.userData.xrayHot=true}else{m.material.emissive?.setHex(0x1eb9a6);m.material.emissiveIntensity=.95}m.userData.presentationActive=true});state.fullPickables.filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{m.material.opacity=.26})}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  state.cavityMode='normal';
  state._conceptObjs=new Map();
}
