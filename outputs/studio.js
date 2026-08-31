  import { ANATOMY_DATABASE, LANDMARK_HOTSPOTS, MODEL_CATALOG, REGIONS, getAnatomy, searchAnatomy } from './anatomy-data.js?v=5';
  import { FLOW_CLASSES, FLOW_ANCHORS, LAYER_CLASSES, classify,
    cardiacEnvelope, breathEnvelope, spikeEnvelope, contractEnvelope, atriumEnvelope, ventricleEnvelope, RATES } from './physiology.js?v=4';
  import { BODY_CONCEPTS, CONCEPT_GROUPS, conceptById, conceptAncestors, conceptChildren, conceptLeaves } from './bodymap.js?v=4';
  import { createResolver } from './landmarks.js?v=2';
  import { buildCavityGeometry, measureLandmarks, measureGrid, gridBounds } from './cavity-build.js?v=2';
  import { boundsOf, sampleField } from './cavity-geom.js?v=2';
  /* Block 0 has its own import scope -- block 1's copy is not visible here.
     Picking needs the index to know which meshes are sub-parts of one
     named structure. See the note in CLAUDE.md about the two scopes. */
  import { MESH_INDEX, UNITS } from './mesh-index.js?v=5';

  const $ = (id) => document.getElementById(id);
  const els = { stage:$('stage'), state:$('stageState'), stateTitle:$('stateTitle'), stateCopy:$('stateCopy'), retry:$('retryBtn'), progress:$('progressBar'), stageMeta:$('stageMeta'), regionMeta:$('regionMeta'), selectedName:$('selectedName'), selectedChips:$('selectedChips'), selectedDetails:$('selectedDetails'), taskKicker:$('taskKicker'), taskTitle:$('taskTitle'), taskCopy:$('taskCopy'), answers:$('answers'), feedback:$('feedback'), next:$('nextBtn'), regions:$('regionButtons'), reviewBar:$('reviewBar'), reviewNumber:$('reviewNumber'), reviewHint:$('reviewHint'), toast:$('toast'), detailDialog:$('detailDialog'), detailTitle:$('detailTitle'), detailChips:$('detailChips'), detailBody:$('detailBody'), zoomIn:$('zoomInBtn'), zoomOut:$('zoomOutBtn'), focus:$('focusBtn'), motion:$('motionBtn') };
  const state = { mode:'explore', region:'all', selectedId:null, selectedSide:null, current:null, quizStarted:false, isolated:false, meshes:[], fullMeshes:[], hotspots:[], fullPickables:[], importedRecords:new Map(), selectionAnchor:null, lastPick:{x:0,y:0,t:0,candidates:[],index:-1}, lastDetailId:null, hashRestored:false, scene:null, camera:null, controls:null, renderer:null, raycaster:null, pointer:null, fullModel:null, realModel:null, realIsProcedural:false, memoryStreak:0, motionEnabled:true, motionPhase:0, stats:loadStats() };
const LAYER_NAMES={skeleton:'Skeleton',muscle:'Muscles',organs:'Organs',circulatory:'Vessels',nervous:'Nerves',joint:'Ligaments',lymphatic:'Lymphatic'};

/* ------------------------------------------------------------------ *
 * Hide, and search-driven uncover
 *
 * state.hidden      meshes the learner hid by hand
 * state.autoHidden  meshes hidden automatically to expose a searched part,
 *                   kept apart so the banner and tray can say so and restore
 *                   them as one group.
 *
 * Every visibility pass in the engine ends by calling enforceHidden(), so a
 * layer toggle or a region filter can never quietly bring a hidden part back.
 * ------------------------------------------------------------------ */
state.hidden = new Set();
state.autoHidden = new Set();
function enforceHidden(){
  state.hidden.forEach(m=>{ if(m) m.visible=false; });
  state.autoHidden.forEach(m=>{ if(m) m.visible=false; });
}
function hiddenName(m){
  const rec=getRecord(m.userData?.canonicalId);
  return rec?.canonicalName || m.userData?.label && String(m.userData.label).replace(/[_]+/g,' ').replace(/\.(l|r)$/i,'').trim() || 'Unnamed structure';
}
function hiddenLayerName(m){
  return LAYER_NAMES[m.userData?.layerKey||m.userData?.extraKey] || (m.userData?.landmarkId?'Landmark':'Skeleton');
}
/*
 * One row per STRUCTURE, not per mesh.
 *
 * Hiding takes the whole structure (see kinOf) and a structure is many meshes
 * -- the fourteen phalanges of a hand are one study unit -- so a per-mesh tray
 * listed "Phalanges of the hand" fourteen times, with fourteen identical
 * "show" buttons that each did the same thing. unhide() already restores the
 * whole kin from any one of them, so collapsing here is only about the list.
 */
function hiddenRows(){
  const seen=new Map();
  const add=(m,auto)=>{
    const key=(m.userData&&m.userData.canonicalId)||m.uuid;
    const row=seen.get(key);
    if(row){ row.auto=row.auto&&auto; return; }
    seen.set(key,{token:m.uuid,name:hiddenName(m),layer:hiddenLayerName(m),auto});
  };
  state.hidden.forEach(m=>add(m,false));
  state.autoHidden.forEach(m=>add(m,true));
  return [...seen.values()];
}
function publishHidden(){
  if(!state.hiddenHook) return;
  try{ state.hiddenHook(hiddenRows()); }catch(e){}
}
function meshByUuid(uuid){
  const all=[...state.fullMeshes,...state.meshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)];
  return all.find(m=>m.uuid===uuid)||null;
}
/* Every mesh that IS this structure. Sub-parts share a canonicalId, so hiding
   the deltoid must take all three of its parts, not the one that was tapped. */
function kinOf(m){
  const id=m&&m.userData&&m.userData.canonicalId;
  if(!id) return [m];
  const all=[...state.fullMeshes,...state.meshes,...Object.values(state.extraModels||{}).flatMap(x=>x.meshes)];
  const kin=all.filter(o=>o.userData&&o.userData.canonicalId===id);
  return kin.length?kin:[m];
}
function hideMesh(mesh){
  const m=mesh||state.selectionAnchor;
  if(!m){ showToast('Select a structure first'); return false; }
  kinOf(m).forEach(o=>{ state.hidden.add(o); state.autoHidden.delete(o); });
  if(state.selectionAnchor&&kinOf(m).includes(state.selectionAnchor)){ clearSelection(); }
  applyLayers(); applyVisibility(); enforceHidden(); publishHidden();
  showToast(`${hiddenName(m)} hidden`);
  return true;
}
function unhide(token){
  let restored=[];
  if(token==='all'){ restored=[...state.hidden,...state.autoHidden]; state.hidden.clear(); state.autoHidden.clear(); }
  else if(token==='auto'){ restored=[...state.autoHidden]; state.autoHidden.clear(); }
  else if(token==='manual'){ restored=[...state.hidden]; state.hidden.clear(); }
  else {
    const m=meshByUuid(token);
    if(m) kinOf(m).forEach(o=>{ restored.push(o); state.hidden.delete(o); state.autoHidden.delete(o); });
  }
  applyLayers(); applyVisibility(); publishHidden();
  /*
   * "Show" that shows nothing is the same bug reported once already, in a
   * second guise. Live physiology suppresses the connective layer -- bursae,
   * fascia, sheaths -- so unhiding one of those while it is running leaves the
   * structure exactly as invisible as it was, with the tray now empty and no
   * explanation. Say which switch is holding it.
   */
  const stuck=restored.filter(o=>o&&!o.visible);
  if(stuck.length){
    const conn=state.flow&&state.flow.on&&state.flow.connective
      &&stuck.some(o=>state.flow.connective.includes(o));
    showToast(conn
      ?`${hiddenName(stuck[0])} is held back by Live physiology — turn it off to see it`
      :`${hiddenName(stuck[0])} is outside the current region filter`);
  }
}

/* ------------------------------------------------------------------ *
 * Search -> viewer: frame the part, then hide only what stands in front
 * ------------------------------------------------------------------ */
function frameOn(objs){
  const THREE=state.THREE;
  if(!THREE||!state.camera||!state.controls||!objs.length) return null;
  const box=new THREE.Box3();
  objs.forEach(o=>box.expandByObject(o));
  if(box.isEmpty()) return null;
  const c=box.getCenter(new THREE.Vector3());
  const size=box.getSize(new THREE.Vector3());
  const radius=Math.max(size.x,size.y,size.z,.35);
  const dir=state.camera.position.clone().sub(state.controls.target).normalize();
  const dist=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*3.4));
  state.controls.target.copy(c);
  state.camera.position.copy(c).add(dir.multiplyScalar(dist));
  state.controls.update();
  return {center:c,radius};
}
function occludersOf(targets,frame){
  const THREE=state.THREE;
  if(!THREE||!frame||!targets.length) return [];
  const targetSet=new Set(targets);
  const from=state.camera.position.clone();
  const ray=new THREE.Raycaster();
  const covered=new Set();
  /* A few rays across the target, not just its centre, so a part half behind
     something still reads as covered. */
  const samples=[frame.center.clone()];
  for(const dx of [-.5,.5]) for(const dy of [-.5,.5]){
    samples.push(frame.center.clone().add(new THREE.Vector3(dx*frame.radius,dy*frame.radius,0)));
  }
  const pool=[...state.fullMeshes,...state.meshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)]
    .filter(m=>m.userData&&m.userData.canonicalId&&!targetSet.has(m));
  samples.forEach(pt=>{
    const d=pt.clone().sub(from);
    const len=d.length();
    ray.set(from,d.normalize());
    ray.far=len-0.02;
    ray.intersectObjects(pool,true).forEach(h=>{
      if(h.object.userData&&h.object.userData.canonicalId&&h.object.visible) covered.add(h.object);
    });
  });
  return [...covered];
}
/*
 * Find the meshes a catalogue name refers to, inside one loaded layer.
 *
 * The trap: names in the GLB are NOT the names in the scene. three.js runs
 * every node name through sanitizeNodeName on import, which deletes `. [ ] : /`
 * and turns whitespace into underscores. So the catalogue's `Pharynx.j` is
 * `Pharynxj` once loaded, and `Kidney.l` is `Kidneyl`.
 *
 * normName turns a dot into a SPACE, so it read the catalogue name as
 * "pharynx j" and the loaded name as "pharynxj" -- no match on either the
 * equality pass or the startsWith pass, and the search result reported
 * "could not locate that structure" for a mesh that was sitting right there.
 *
 * Hence the tight pass: both sides stripped to letters and digits, which is
 * the one form the loader's mangling cannot change. Side letters are still
 * APPENDED, never stripped, so Femur and Vomer survive (see CLAUDE.md).
 */
function meshesFor(layer,name){
  const tight=(s)=>normName(s).replace(/[^a-z0-9]/g,'');
  const want=normName(name), wantT=tight(name);
  const nameOf=(o)=>o.userData.label||o.name;
  const pick=(pred)=>layer.meshes.filter(pred);
  let hits=pick(o=>{ const l=normName(nameOf(o)); return l===want||l===want+' l'||l===want+' r'; });
  if(!hits.length) hits=pick(o=>{ const t=tight(nameOf(o)); return t===wantT||t===wantT+'l'||t===wantT+'r'; });
  if(!hits.length) hits=pick(o=>normName(nameOf(o)).startsWith(want));
  if(!hits.length) hits=pick(o=>tight(nameOf(o)).startsWith(wantT));
  return hits;
}
async function revealStructure(spec){
  if(!state.scene){ await window.__osteo.boot(); }
  if(!state.scene) return {ok:false,found:0,covered:[]};
  state.autoHidden.clear();
  clearStudyFocus && clearStudyFocus();
  let targets=[];
  if(spec.id){
    const rec=getRecord(spec.id);
    if(rec){
      /* Real-skeleton meshes carry a per-mesh id (full:N:name); the canonical
         'ribs' lives on userData.sourceCanonicalId. Match either. */
      const pools=[state.meshes,state.fullMeshes,...Object.values(state.extraModels||{}).map(m=>m.meshes)];
      pools.forEach(p=>p.forEach(m=>{
        if(m.userData&&(m.userData.canonicalId===rec.id||m.userData.sourceCanonicalId===rec.id||m.userData.canonicalId===spec.id)) targets.push(m);
      }));
      if(spec.side) targets=targets.filter(m=>!m.userData.side||m.userData.side===spec.side);
      if(targets.length){
        const pm=targets[0];
        selectBone(pm.userData.canonicalId, pm.userData.side||spec.side||null);
      } else {
        selectBone(rec.id, spec.side||null);
        if(state.selectionAnchor) targets=[state.selectionAnchor];
      }
    }
  } else if(spec.parts||(spec.system&&spec.mesh)){
    /*
     * One spec can name several meshes across several layers.
     *
     * A composite -- the larynx, the ossicles, the eyeball -- has no single
     * mesh; it IS its parts, and opening it should light all of them, in
     * whichever layers they live. `spec.parts` carries that list. A plain
     * {system, mesh} is just the one-part case.
     */
    const parts=spec.parts||[{system:spec.system,mesh:spec.mesh,file:spec.file}];
    for(const p of parts){
      let layer=state.extraModels[p.system];
      if(!layer&&p.file){
        try{ layer=await loadExtraModel(p.system,p.file); }catch(e){ console.warn('layer load failed',p.system,e); layer=null; }
      }
      if(!layer) continue;
      state.layers[p.system]=true;
      state.layerOpacity={...(state.layerOpacity||{}),[p.system]:1};
      const hits=meshesFor(layer,p.mesh);
      /*
       * Widen to the whole structure.
       *
       * Sub-parts share a canonicalId (see loadExtraModel), so naming any one
       * of them names all of them. Without this, the curated "Deltoid" entry
       * lit one of its three parts while the grouped search row lit all three
       * -- two routes to the same muscle disagreeing about what it is.
       */
      const ids=new Set(hits.map(o=>o.userData.canonicalId).filter(Boolean));
      targets=targets.concat(ids.size
        ?layer.meshes.filter(o=>ids.has(o.userData.canonicalId))
        :hits);
    }
    /* Each part widens to its whole unit, so a 39-part spec collected the same
       77 meshes 39 times and the panel read "3003 parts". */
    targets=[...new Set(targets)];
    applyLayers();
    if(targets.length){
      const id=targets[0].userData.canonicalId;
      if(id) selectBone(id, targets[0].userData.side||null);
    }
  }
  if(!targets.length){ showToast('Could not locate that structure in the model'); return {ok:false,found:0,covered:[]}; }
  /*
   * A region filter must not silently swallow what you just searched for.
   *
   * Leaving "Thoracic cage" on and opening a knee ligament from search framed
   * the camera on a structure the filter had already switched off, so the
   * result of the search was an empty stage. If nothing the search found is
   * inside the current region, the filter stands down and says so.
   */
  if(state.region!=='all'
    &&!targets.some(o=>o.visible)
    &&!targets.some(o=>state.hidden.has(o))){
    state.region='all';
    if(els.regionMeta)els.regionMeta.textContent='All regions';
    if(typeof renderRegions==='function')renderRegions();
    applyVisibility();
    showToast('Region filter cleared \u2014 that structure is outside it');
  }
  /* A curated group ('ribs' -> 24 meshes) is one structure: frame and light the
     whole set. A left/right pair from the system path unions to a midline box,
     so frame only the nearest of the two. */
  /*
   * One structure made of many meshes -- frame and light the whole set, not
   * the nearest of them. Three ways that happens: a curated group ('ribs' is
   * 24 meshes), a composite (the larynx spans two layers), and a merged
   * family, where the source split one structure into parts that now share a
   * canonicalId. Without the last case, opening the deltoid lit one third of
   * it and framed that third.
   */
  const curatedGroup=(!!spec.id||!!spec.parts)&&targets.length>1;
  let primary=targets[0];
  if(targets.length>1&&state.camera){
    primary=targets.map(o=>{ const b=new state.THREE.Box3().setFromObject(o); return {o,d:b.getCenter(new state.THREE.Vector3()).distanceTo(state.camera.position)}; })
      .sort((a,b)=>a.d-b.d)[0].o;
  }
  /*
   * Everything that IS the selected structure.
   *
   * Sub-parts share a canonicalId, so a merged structure -- the deltoid's
   * three parts -- lights and frames as one. Left and right keep separate ids
   * on purpose, so a paired result still frames the nearer side rather than
   * a midline box spanning both, which is the behaviour the pair case wanted
   * all along.
   */
  const kin=targets.filter(o=>o.userData.canonicalId
    &&o.userData.canonicalId===primary.userData.canonicalId);
  const frameTargets=curatedGroup?targets:(kin.length>1?kin:[primary]);
  const frame=frameOn(frameTargets);
  const occ=occludersOf(frameTargets,frame);
  occ.forEach(m=>state.autoHidden.add(m));
  applyLayers(); applyVisibility(); enforceHidden();
  clearHighlight();
  frameTargets.forEach(m=>{
    if(m.material){ m.material.emissive&&m.material.emissive.setHex(0x1eb9a6); m.material.emissiveIntensity=.95; m.userData.presentationActive=true; }
  });
  publishHidden();
  /*
   * Name it what the catalogue calls it.
   *
   * Two reasons the mesh's own name is the wrong label here. A composite is
   * named as the WHOLE -- selection has just labelled it with whichever part
   * came first, which is not what was searched for. And a single mesh carries
   * the loader's mangling: `Pharynx.j` arrives as `Pharynxj`, which is what
   * the panel was showing. The catalogue name is the clean one.
   */
  if(spec.name&&(spec.parts||spec.system)){
    /* Anchor on what was actually selected and lit, not on every mesh the
       name matched. A bilateral result frames and lights ONE side, so
       anchoring over both put the vagus nerve's dot on the opposite nerve. */
    showPickCallout(frameTargets,spec.name);
    els.selectedName.textContent=spec.name;
    /* selectBone already rendered the card; overwriting the chips here dropped
       the one that says whether the course names this. Put it back. */
    const chip=courseChipHTML({canonicalName:spec.name},state.selectionAnchor);
    els.selectedChips.innerHTML=(spec.parts
      ?`<span class="chip">${targets.length} parts</span>`
      :(targets[0]&&targets[0].userData.side?`<span class="chip">${targets[0].userData.side}</span>`:''))+chip;
  }
  const names=[...new Set(occ.map(hiddenName))];
  return {ok:true,found:targets.length,covered:names};
}

/* ------------------------------------------------------------------ *
 * Spatial concept overlays -- cavities, regions, quadrants, planes.
 * Drawn procedurally, sized to the rendered body's bounding box, never
 * from a GLB. See bodymap.js for the fractions.
 * ------------------------------------------------------------------ */
state.concepts = new Set();          /* ids currently shown */
state.conceptGroup = null;
/*
 * The body is measured in the MODEL's own frame, not in world space. The idle
 * turntable spins state.fullModel (and conceptGroup with it), so a world-space
 * bounding box swings by several centimetres a second and would drag every
 * overlay around with it. Un-rotating each mesh's box back through the pivot
 * gives a still, upright frame -- and conceptGroup shares that frame, so
 * overlays built here ride the turntable exactly as the skeleton does.
 *
 * All three axes are returned in the same unit: fractions of body height.
 * fx 0 is the median plane (+ = patient's left), fz 0 the trunk's front-back
 * centre (+ = anterior). See bodymap.js for the landmark measurements.
 */
function bodyMetrics(){
  const THREE=state.THREE;
  const root=state.fullModel||state.realModel
    ||(Object.values(state.extraModels||{})[0]||{}).pivot||null;
  const src=state.fullMeshes.length?state.fullMeshes
    :state.meshes.length?state.meshes
    :Object.values(state.extraModels||{}).flatMap(m=>m.meshes||[]);
  /* the whole scene, for the reason spelled out in cavityContext */
  if(state.scene) state.scene.updateMatrixWorld(true);
  const box=new THREE.Box3();
  if(root){
    const inv=new THREE.Matrix4().copy(root.matrixWorld).invert();
    const v=new THREE.Vector3(), m4=new THREE.Matrix4();
    src.forEach(o=>{
      if(o.visible===false||!o.geometry) return;
      if(!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      const bb=o.geometry.boundingBox; if(!bb) return;
      m4.multiplyMatrices(inv,o.matrixWorld);
      for(let i=0;i<8;i++){
        v.set(i&1?bb.max.x:bb.min.x,i&2?bb.max.y:bb.min.y,i&4?bb.max.z:bb.min.z).applyMatrix4(m4);
        box.expandByPoint(v);
      }
    });
  }
  if(box.isEmpty()) box.set(new THREE.Vector3(-2.3,-4.9,-1.05),new THREE.Vector3(2.3,6.9,1.05));
  const H=Math.max(box.max.y-box.min.y,1);
  const cx=(box.min.x+box.max.x)/2, cz=(box.min.z+box.max.z)/2;
  return {
    H, cx, cz, minY:box.min.y, maxY:box.max.y,
    halfX:(box.max.x-box.min.x)/2, halfZ:(box.max.z-box.min.z)/2,
    yAt:(f)=>box.min.y+f*H,
    xAt:(f)=>cx+f*H,
    zAt:(f)=>cz+f*H,
  };
}
/*
 * Overlay tags.
 *
 * A sprite sized in world units balloons the moment you zoom in -- that is what
 * made the first version's labels unreadable. One pinned to a fixed share of
 * the viewport has the opposite fault: zooming in can never make a small tag
 * legible. So each tag carries a userData.hud descriptor and is resized every
 * frame to its natural world size CLAMPED between a floor and a ceiling
 * expressed as fractions of the viewport height:
 *
 *   world  natural size in world units (e.g. a region tag is sized to its cell)
 *   px     use this fraction of the viewport instead of a world size
 *   minPx  never smaller than this fraction -- readable when zoomed out
 *   maxPx  never larger  than this fraction -- never swamps the anatomy
 *
 * Text wraps on \n; the concept colour rides a small chip so the words stay
 * near-white and legible against bone.
 */
function labelSprite(text,color,hud){
  const THREE=state.THREE;
  const lines=String(text).split('\n');
  const S=2;                                   /* supersample for crisp text */
  const font=30*S, lh=Math.round(font*1.16), padX=10*S, padY=7*S, chip=6*S, gap=7*S;
  const c=document.createElement('canvas'), g=c.getContext('2d');
  const setFont=()=>{ g.font=`600 ${font}px "Instrument Sans", system-ui, -apple-system, sans-serif`; };
  setFont();
  const tw=Math.max(...lines.map(l=>g.measureText(l).width));
  c.width=Math.ceil(tw+padX*2+chip+gap);
  c.height=Math.ceil(lines.length*lh+padY*2);
  setFont();
  const hex='#'+(((color==null?0x9fb0b3:color)>>>0)&0xffffff).toString(16).padStart(6,'0');
  g.beginPath();
  const r=Math.min(13*S,c.height/2);
  if(g.roundRect) g.roundRect(1,1,c.width-2,c.height-2,r); else g.rect(1,1,c.width-2,c.height-2);
  g.fillStyle='rgba(7,14,19,.88)'; g.fill();
  g.lineWidth=1.6*S; g.strokeStyle=hex+'99'; g.stroke();
  g.beginPath(); g.arc(padX+chip/2,c.height/2,chip/2,0,Math.PI*2); g.fillStyle=hex; g.fill();
  g.fillStyle='#e9f1f0'; g.textBaseline='middle'; g.textAlign='left';
  const tx=padX+chip+gap, ty=c.height/2-(lines.length-1)*lh/2;
  lines.forEach((l,i)=>g.fillText(l,tx,ty+i*lh));
  const tex=new THREE.CanvasTexture(c);
  tex.colorSpace=THREE.SRGBColorSpace;
  tex.minFilter=THREE.LinearFilter; tex.generateMipmaps=false;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthTest:false,depthWrite:false,transparent:true}));
  /*
   * minLine/maxLine bound a single LINE of text rather than the whole pill, so
   * a two-line tag and a one-line tag end up with type of the same size on
   * screen instead of the two-liner being drawn at half scale.
   */
  const ratio=c.height/lh;
  const o=Object.assign({},typeof hud==='number'?{px:hud}:(hud||{}));
  if(o.minLine!=null){ o.minPx=o.minLine*ratio; delete o.minLine; }
  if(o.maxLine!=null){ o.maxPx=o.maxLine*ratio; delete o.maxLine; }
  sp.userData.hud=Object.assign({aspect:c.width/c.height,lineRatio:ratio,minPx:0.023,maxPx:0.052},o);
  sp.renderOrder=999;
  return sp;
}
/* Called every frame: keeps every tag inside its legible band. */
function updateHudSprites(){
  const cam=state.camera;
  if(!cam) return;
  const tan=Math.tan(cam.fov*Math.PI/360);
  const p=state._hudVec||(state._hudVec=new state.THREE.Vector3());
  const walk=(grp)=>{
  if(!grp||!grp.children.length) return;
  grp.traverse((o)=>{
    const h=o.userData&&o.userData.hud;
    if(!h) return;
    o.getWorldPosition(p);
    const span=2*cam.position.distanceTo(p)*tan;   /* viewport height, in world units */
    let ht=h.world!=null?h.world:(h.px||0.03)*span;
    if(h.minPx!=null) ht=Math.max(ht,h.minPx*span);
    if(h.maxPx!=null) ht=Math.min(ht,h.maxPx*span);
    /*
     * A hard tag keeps the size it was given. The legibility floor exists so a
     * tag does not vanish when you zoom out, but a region name that grows past
     * its own region has stopped naming that region, and a tag whose position
     * was computed from its width has to keep that width to stay put.
     */
    if(h.hard&&h.world!=null) ht=h.world;
    o.scale.set(ht*h.aspect,ht,1);
  });
  };
  walk(state.conceptGroup);
  walk(state.pickGroup);      /* the selection callout obeys the same band */
}
/*
 * Callout: a named tag beside the body with a leader back to what it names.
 *
 * The atlas convention, and the one the region grid already uses when a name
 * is too long for its cell. Everything is in the BODY's coordinate frame, not
 * in screen space, so the tag and its leader turn with the model, stay
 * registered under zoom and pan, and survive a view change -- a screen-space
 * label would slide off whatever it was naming the moment you dragged.
 *
 * `anchor` is the point being named. The tag goes out sideways to clear the
 * silhouette; midline structures go to the viewer's LEFT (world -x), away from
 * the Explore panel, which occupies the right of the stage.
 */
function calloutAt(anchor,text,color,M,opts){
  const THREE=state.THREE, o=opts||{};
  const lab=labelSprite(text,color,{world:M.H*(o.size||0.030),minLine:0.019,maxLine:0.030});
  const hud=lab.userData.hud;
  /* Which way out. A structure clearly on one side is labelled on that side;
     anything within a few centimetres of the midline goes left by default. */
  const dx=anchor.x-M.cx;
  const sign=Math.abs(dx)<M.H*0.03?-1:(dx<0?-1:1);
  /*
   * How far out to go.
   *
   * Body-scale overlays (the cavities) clear the whole silhouette, so their
   * tags line up in one margin column. A single selected structure passes
   * `clear` -- how far from the MIDLINE the tip must sit, measured from what
   * is visible at that height -- and the tag hugs the anatomy instead: the
   * camera has usually just framed that structure, so a tag parked at the
   * body's outer edge would be off the side of the screen, or under the
   * Explore panel, which is exactly where the femur's label was landing.
   */
  let reach=o.clear!=null
    ? Math.max(Math.abs(dx),o.clear)+M.H*0.015
    : Math.max(Math.abs(dx)+M.H*0.02,M.halfX+M.H*0.03);
  /*
   * ...but never further out than the camera can see.
   *
   * Clearing the silhouette is the right anatomical answer and the wrong one
   * when the camera has just framed a two-centimetre tube: the oesophagus's
   * tag cleared the rib cage correctly and landed off the side of the stage.
   * `maxReach` is the framed half-width less the tag's own width, so the tag
   * lands inside the picture even when the body does not fit in it.
   */
  if(o.maxReach!=null) reach=Math.min(reach,Math.max(Math.abs(dx)+M.H*0.01,o.maxReach));
  const tipX=M.cx+sign*reach;
  const z=anchor.z;
  /*
   * Tags form a COLUMN just outside the silhouette, not a row marching away
   * from it. Stepping each successive tag further out sideways was the obvious
   * thing and it is wrong: five cavities put the last tag six body-widths off
   * the midline, well outside the viewport, so the pericardial cavity was
   * labelled somewhere off screen.
   *
   * `taken` carries the y-bands already occupied on this side. A tag that would
   * land on one slides DOWN until it is clear, and its leader -- which still
   * ends on the real anchor -- says which shape it belongs to.
   */
  let y=anchor.y+(o.rise||0)*M.H;
  const band=hud.world*1.35;
  const taken=o.taken;
  if(taken){
    let guard=0;
    while(guard++<40&&taken.some((t)=>t.side===sign&&Math.abs(t.y-y)<band)) y-=band;
    taken.push({y,side:sign});
  }
  /*
   * Anchor the tag by the edge nearest the body, not by its centre.
   *
   * updateHudSprites rescales every tag each frame to keep it legible, so its
   * world width changes with the camera. A centre-anchored tag placed with a
   * creation-time half-width therefore walks outward as you zoom in -- framing
   * a small structure pushed the pharynx's label clean off the left of the
   * stage. Sprite.center moves the anchor to the inner edge, so the tag grows
   * away from the leader instead of dragging itself off screen.
   */
  lab.center.set(sign<0?1:0,0.5);
  lab.position.set(tipX,y,z);
  lab.renderOrder=999;
  lab.userData.calloutBand={y,side:sign};   /* read back by the next callout */
  const lg=new THREE.BufferGeometry();
  lg.setAttribute('position',new THREE.Float32BufferAttribute(
    [anchor.x,anchor.y,anchor.z, tipX,y,z],3));
  const leader=new THREE.Line(lg,new THREE.LineBasicMaterial({color:color==null?0x9fb0b3:color,
    transparent:true,opacity:o.leaderOpacity||0.55,depthWrite:false,depthTest:false}));
  leader.renderOrder=998;
  /* A dot on the anchor: without it a leader ending in mid-air inside a
     translucent shell reads as an unfinished line rather than as a pointer. */
  const dot=new THREE.Mesh(new THREE.SphereGeometry(M.H*0.004,10,8),
    new THREE.MeshBasicMaterial({color:color==null?0x9fb0b3:color,transparent:true,
      opacity:0.9,depthWrite:false,depthTest:false}));
  dot.position.copy(anchor);
  dot.renderOrder=998;
  return [leader,dot,lab];
}

/*
 * The selection callout.
 *
 * Tapping a structure used to flash its name in a DOM tag that faded out after
 * 900ms, pinned to the pixel you touched -- so a moment later you had a
 * highlighted mesh and no idea what it was called unless the side panel
 * happened to be in view. The name now stays until the selection changes, and
 * it is attached to the structure rather than to the screen.
 */
/*
 * Overlay groups are built in the body's un-rotated frame and then yawed to
 * match the pivots, which the animate loop keeps in step while the turntable
 * runs. While it is PAUSED the loop does not touch them, so a group created at
 * that moment has to adopt the pivot's current yaw itself -- otherwise it is
 * drawn square-on against a body that is turned a few degrees away.
 */
function syncOverlayYaw(grp){
  const root=state.fullModel||state.realModel
    ||(Object.values(state.extraModels||{})[0]||{}).pivot||null;
  if(grp&&root) grp.rotation.y=root.rotation.y;
}
function ensurePickGroup(){
  if(state.pickGroup) return state.pickGroup;
  const grp=new state.THREE.Group();
  grp.name='pickCallout';
  grp.visible=!state.xray;          /* a film carries no annotations */
  state.scene.add(grp);
  state.pickGroup=grp;
  return grp;
}
function clearPickCallout(){
  if(!state.pickGroup) return;
  [...state.pickGroup.children].forEach(disposeConceptObj);
}
/*
 * How wide the visible body is at a given height, measured in the body's own
 * upright frame. Bounding boxes only -- this runs once per selection, and a
 * box is close enough for deciding where a label goes.
 */
function silhouetteHalfAt(y,band){
  const THREE=state.THREE;
  const root=state.fullModel||state.realModel
    ||(Object.values(state.extraModels||{})[0]||{}).pivot||null;
  if(!root) return 0;
  const inv=new THREE.Matrix4().copy(root.matrixWorld).invert();
  const v=new THREE.Vector3(), m4=new THREE.Matrix4();
  const pools=[state.fullMeshes,state.meshes,
    ...Object.values(state.extraModels||{}).map(m=>m.meshes||[])];
  let half=0;
  pools.forEach(pool=>pool.forEach(o=>{
    if(!o.visible||!o.geometry) return;
    if(!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    const bb=o.geometry.boundingBox; if(!bb) return;
    m4.multiplyMatrices(inv,o.matrixWorld);
    let lo=Infinity,hi=-Infinity,x=0;
    for(let i=0;i<8;i++){
      v.set(i&1?bb.max.x:bb.min.x,i&2?bb.max.y:bb.min.y,i&4?bb.max.z:bb.min.z).applyMatrix4(m4);
      if(v.y<lo)lo=v.y; if(v.y>hi)hi=v.y;
      const d=Math.abs(v.x); if(d>x)x=d;
    }
    if(hi<y-band||lo>y+band) return;      /* not at this height */
    if(x>half) half=x;
  }));
  return half;
}
/*
 * The point on a structure nearest its own centre.
 *
 * A leader has to land ON the thing it names, and a bounding-box centre is not
 * on the thing whenever the thing is curved, hollow or elongated -- which
 * covers most of the body. The oesophagus is the clear case: it runs behind
 * the trachea at the top and swings forward to reach the stomach, so its box
 * centre sits about 1.7 cm ANTERIOR to the tube, floating in the trachea's
 * depth. The dot appeared to point at empty space in front of the windpipe.
 *
 * Snapping to the nearest actual vertex fixes that for every such structure --
 * vessels, nerves, ribs, bowel, the aortic arch -- and for solid ones it just
 * moves the dot from inside the mesh onto its surface, where it can be seen.
 *
 * Vertices are sampled with a stride: a few thousand points across the whole
 * selection is far more than enough to find the middle, and this runs once per
 * selection rather than per frame.
 */
function nearestSurfacePoint(list,target,inv){
  const THREE=state.THREE;
  const v=new THREE.Vector3(), m4=new THREE.Matrix4();
  const BUDGET=6000;
  const total=list.reduce((n,o)=>n+((o.geometry&&o.geometry.attributes.position)?o.geometry.attributes.position.count:0),0);
  const stride=Math.max(1,Math.ceil(total/BUDGET));
  /* Pass 1, strided: which mesh holds the nearest point. */
  let best=Infinity,pick=null;
  list.forEach((o)=>{
    const pos=o.geometry&&o.geometry.attributes.position;
    if(!pos) return;
    m4.multiplyMatrices(inv,o.matrixWorld);
    for(let i=0;i<pos.count;i+=stride){
      v.fromBufferAttribute(pos,i).applyMatrix4(m4);
      const d=v.distanceToSquared(target);
      if(d<best){ best=d; pick=o; }
    }
  });
  if(!pick) return null;
  /* Pass 2, exact on that one mesh. Striding alone left the anchor up to 7mm
     off on structures that run the length of the body -- the anterior
     longitudinal ligament, the vagus -- where consecutive samples are far
     apart. Scanning one mesh in full is bounded and costs nothing here: this
     runs once per selection, not per frame. */
  const pos=pick.geometry.attributes.position;
  m4.multiplyMatrices(inv,pick.matrixWorld);
  let bd=Infinity,out=null;
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos,i).applyMatrix4(m4);
    const d=v.distanceToSquared(target);
    if(d<bd){ bd=d; out=out?out.copy(v):v.clone(); }
  }
  return out;
}
/*
 * `obj` may be one mesh or a set of them -- a composite is named once, over the
 * union of its parts, not once per part.
 *
 * The box is measured in the BODY's own upright frame, un-rotated back through
 * the pivot, exactly as bodyMetrics does and for the same reason: the idle
 * turntable yaws the pivots continuously, so a world-space measurement is only
 * true for the frame it was taken in. The callout group rides the same pivots
 * (see the animate loop), so a world-space anchor would be rotated twice and
 * the leader would point somewhere the structure used to be.
 */
function showPickCallout(obj,text){
  if(!state.scene||!state.THREE||!obj||!text) return;
  const list=Array.isArray(obj)?obj.filter(Boolean):[obj];
  if(!list.length) return;
  clearPickCallout();
  const THREE=state.THREE;
  const root=state.fullModel||state.realModel
    ||(Object.values(state.extraModels||{})[0]||{}).pivot||null;
  /*
   * Update the WHOLE scene, not just this object's branch.
   *
   * o.updateMatrixWorld() composes against the parent's cached matrix, so a
   * layer loaded moments ago -- whose pivot has been scaled and offset into
   * the body frame but not yet flushed -- still reports its meshes in raw GLB
   * metres. That is one structure at y 1.6 among six at y 5.3, which dragged
   * the larynx's anchor from the throat down to mid-chest.
   */
  state.scene.updateMatrixWorld(true);
  const box=new THREE.Box3();
  if(root){
    const inv=new THREE.Matrix4().copy(root.matrixWorld).invert();
    const v=new THREE.Vector3(), m4=new THREE.Matrix4();
    list.forEach((o)=>{
      if(!o.geometry) return;
      if(!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      const bb=o.geometry.boundingBox; if(!bb) return;
      m4.multiplyMatrices(inv,o.matrixWorld);
      for(let i=0;i<8;i++){
        v.set(i&1?bb.max.x:bb.min.x,i&2?bb.max.y:bb.min.y,i&4?bb.max.z:bb.min.z).applyMatrix4(m4);
        box.expandByPoint(v);
      }
    });
  } else {
    list.forEach((o)=>box.expandByObject(o));
  }
  if(box.isEmpty()) return;
  const size=box.getSize(new THREE.Vector3());
  /* The middle of the structure, moved onto the structure. */
  const centre=box.getCenter(new THREE.Vector3());
  const anchor=(root
    ? nearestSurfacePoint(list,centre,new THREE.Matrix4().copy(root.matrixWorld).invert())
    : null)||centre;
  const grp=ensurePickGroup();
  const M=bodyMetrics();
  /*
   * Clear whatever is actually VISIBLE at this height, not the structure's own
   * width and not the whole body's.
   *
   * Using the structure's own half-width put the oesophagus's tag flat on top
   * of the rib cage: the tube is two centimetres wide and sits on the midline,
   * so "just outside it" is deep inside the chest. Using the body's half-width
   * instead throws a thigh label out past the shoulders. The silhouette at the
   * anchor's own height is the thing a tag has to get past, and it accounts
   * for which layers are switched on -- with the skeleton hidden, the organ
   * outline is much narrower and the tag comes in to meet it.
   */
  const clear=Math.max(Math.abs(anchor.x-M.cx)+size.x/2,
    silhouetteHalfAt(anchor.y,Math.max(size.y/2,M.H*0.02)));
  /* What the camera can show at the anchor's depth, less the tag's own width.
     updateHudSprites resizes tags every frame within a legibility band, so the
     width is worked out the same way here rather than from hud.world alone. */
  let maxReach=null;
  const cam=state.camera;
  if(cam){
    const span=2*cam.position.distanceTo(anchor)*Math.tan(cam.fov*Math.PI/360);
    const ht=Math.min(Math.max(M.H*0.030,0.023*span),0.052*span);
    maxReach=Math.max(0,span*cam.aspect/2-ht*6.2-M.H*0.02);
  }
  calloutAt(anchor,text,0x72e3cf,M,{size:0.030,leaderOpacity:0.6,clear,maxReach})
    .forEach((o)=>grp.add(o));
  syncOverlayYaw(grp);
  grp.visible=!state.xray;
}

function ensureConceptGroup(){
  if(state.conceptGroup) return state.conceptGroup;
  const THREE=state.THREE;
  const grp=new THREE.Group();
  grp.name='conceptOverlays';
  /* an overlay created while the projection is up belongs to the 3D view, not
     to the film -- it appears when the projection is left, not on top of it */
  grp.visible=!state.xray;
  state.scene.add(grp);
  state.conceptGroup=grp;
  syncOverlayYaw(grp);
  return grp;
}
/* ------------------------------------------------------------------ *
 * Cavity geometry, derived from the loaded anatomy.
 *
 * Nothing below chooses a size or a position. The shapes come out of
 * cavity-build.js, which measures them from the meshes that are actually in
 * the scene; this section's job is only to feed it those meshes in the body's
 * own upright frame, and to turn what comes back into three.js objects.
 * ------------------------------------------------------------------ */

/*
 * Vertices of one mesh, expressed in the skeleton pivot's frame.
 *
 * Cached per mesh: this is the expensive part of a build (tens of thousands of
 * vertices), and it never changes. The idle turntable spins the PIVOTS, and
 * every layer's pivot carries the same rotation, so factoring the pivot out
 * leaves a still frame that all seven layers agree on -- which is what lets a
 * cavity measured off the ribs line up with one measured off the lungs.
 */
function meshPointsLocal(o,inv){
  const cache=state._cavPts||(state._cavPts=new Map());
  const hit=cache.get(o.uuid);
  if(hit) return hit;
  const THREE=state.THREE;
  const g=o.geometry, src=g&&g.attributes&&g.attributes.position;
  if(!src) return null;
  const m=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);
  const positions=new Float32Array(src.count*3);
  const v=new THREE.Vector3();
  for(let i=0;i<src.count;i++){
    v.fromBufferAttribute(src,i).applyMatrix4(m);
    positions[i*3]=v.x; positions[i*3+1]=v.y; positions[i*3+2]=v.z;
  }
  let indices;
  if(g.index) indices=g.index.array;
  else { indices=new Uint32Array(src.count); for(let i=0;i<src.count;i++) indices[i]=i; }
  const entry={positions,indices};
  cache.set(o.uuid,entry);
  return entry;
}

/* which layers are loaded right now -- the cache key for every derived shape */
function layerSignature(){
  return [state.fullMeshes.length?'skeleton':'',
    ...Object.keys(state.extraModels||{}).sort()].filter(Boolean).join(',');
}

/*
 * The build context: a landmark resolver over every loaded mesh, plus lazy
 * access to their vertices. Meshes are named but not yet measured -- only the
 * landmarks a builder actually asks for get their points extracted.
 */
function cavityContext(){
  const sig=layerSignature();
  if(state._cavCtx&&state._cavCtx.sig===sig) return state._cavCtx;
  const THREE=state.THREE;
  const root=state.fullModel;
  if(!root||!THREE||!state.scene) return null;
  /*
   * Flush the WHOLE scene, forced, before reading a single vertex.
   *
   * `root.updateMatrixWorld(true)` walks the skeleton's branch and nothing
   * else, so a layer loaded moments ago -- pivot scaled and offset into the
   * body frame, matrixWorld still identity -- had every one of its meshes read
   * through `inv` alone. Measured: the left lung came back at x 0.06-0.18,
   * y -0.08-0.10 while the ribs it sits inside are x +/-0.99, y 2.39-5.10. No
   * lung point then falls in any mediastinal band, so the mediastinum built
   * from nothing and returned null, and the pericardial sac inside it went
   * with it. The thoracic cavity survived only because it can fall back to
   * bone. Nothing in the picture says "wrong transform" -- it says "cavity
   * missing", or "cavity out in front of the body".
   */
  state.scene.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(root.matrixWorld).invert();

  const entries=[];
  state.fullMeshes.forEach((o)=>{
    if(o.isMesh) entries.push({name:o.userData.label||o.name||'',layer:'skeleton',obj:o});
  });
  Object.entries(state.extraModels||{}).forEach(([key,m])=>{
    (m.meshes||[]).forEach((o)=>{
      if(o.isMesh) entries.push({name:o.userData.label||o.name||'',layer:key,obj:o});
    });
  });
  const resolver=createResolver(entries.map((e)=>({name:e.name,layer:e.layer,mesh:e})));
  const points=(e)=>meshPointsLocal(e.obj,inv);
  const ctx={
    sig, resolver,
    meshesFor:(k)=>resolver.resolve(k).entries.map((e)=>points(e.mesh)).filter(Boolean),
    entriesFor:(keys)=>resolver.resolveAll(keys)
      .map((e)=>({name:e.norm,mesh:points(e.mesh)})).filter((e)=>e.mesh),
    objectsFor:(k)=>resolver.resolve(k).entries.map((e)=>e.mesh.obj),
    tier:(id)=>resolver.tier(id),
    body:null,
  };
  const skel=state.fullMeshes.map((o)=>meshPointsLocal(o,inv)).filter(Boolean).map((e)=>e.positions);
  ctx.body=boundsOf(skel);
  state._cavCtx=ctx;
  state._cavMeasured=null;
  state._cavCache=new Map();
  /*
   * The vertex cache goes too. It is keyed by mesh uuid and survives every
   * rebuild, so one measurement taken against an unflushed matrix used to
   * poison every later build of every cavity for the rest of the session --
   * which is what made this bug look permanent rather than transient.
   */
  state._cavPts=new Map();
  return ctx;
}

function cavityMeasured(ctx){
  if(!state._cavMeasured) state._cavMeasured=measureLandmarks(ctx);
  return state._cavMeasured;
}

/* build once per (cavity, layer signature) -- rotation never re-derives anything */
function cavityShape(id){
  const ctx=cavityContext();
  if(!ctx) return null;
  const cache=state._cavCache||(state._cavCache=new Map());
  if(cache.has(id)) return cache.get(id);
  const res=buildCavityGeometry(id,ctx,cavityMeasured(ctx));
  cache.set(id,res);
  return res;
}

/*
 * A cavity is a membrane, so it gets two surfaces: a lit translucent skin that
 * the bones in front of it correctly occlude -- which is what makes it read as
 * being INSIDE the body rather than painted over it -- and a fine wireframe
 * that picks out the shape. Both depth-test in the normal view; only the x-ray
 * mode lifts that, and it does so by making the BONE transparent rather than by
 * letting the cavity punch through it.
 */
/*
 * Fading is not enough on its own. With every layer loaded there are ~2,900
 * overlapping surfaces, and forty of them at 16% alpha stack up to something
 * indistinguishable from solid. So the modes that need to see past the anatomy
 * HIDE it: isolate keeps only the structures the cavity is defined by, and
 * x-ray drops the soft-tissue layers and leaves the skeleton faint.
 *
 *   skin/wire    the cavity's own opacities
 *   wireThrough  let the outline read through solid anatomy
 *   bone         fade every remaining anatomy mesh to this
 *   keepBasis    hide everything except the cavity's defining structures
 *   skeletonOnly hide the six soft-tissue layers
 */
const CAVITY_STYLE={
  normal:{skin:0.30,wire:0.30,wireThrough:false,bone:null},
  isolation:{skin:0.44,wire:0.42,wireThrough:false,bone:null,keepBasis:true},
  cutaway:{skin:0.40,wire:0.38,wireThrough:false,bone:null},
  xray:{skin:0.50,wire:0.55,wireThrough:true,bone:0.12,skeletonOnly:true},
  anatomy:{skin:0.10,wire:0.14,wireThrough:false,bone:null},
};
function cavityStyle(){ return CAVITY_STYLE[state.cavityMode||'normal']||CAVITY_STYLE.normal; }
function cavitySkin(color){
  const THREE=state.THREE, st=cavityStyle();
  return new THREE.MeshStandardMaterial({color,transparent:true,opacity:st.skin,roughness:.45,
    metalness:0,side:THREE.DoubleSide,depthWrite:false});
}
function cavityWire(color){
  const THREE=state.THREE, st=cavityStyle();
  return new THREE.MeshBasicMaterial({color,transparent:true,opacity:st.wire,wireframe:true,
    depthTest:!st.wireThrough,depthWrite:false});
}

/* {positions, indices} from the builder -> a drawable pair of meshes */
function cavityMeshes(part,color){
  const THREE=state.THREE;
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(part.positions,3));
  g.setIndex(Array.from(part.indices));
  g.computeVertexNormals();
  const mesh=new THREE.Mesh(g,cavitySkin(color));
  mesh.renderOrder=6;
  const wire=new THREE.Mesh(g,cavityWire(color));
  wire.renderOrder=7;
  mesh.add(wire);
  return mesh;
}

/*
 * `combine` cavities borrow their members' geometry rather than building their
 * own. That is what makes the abdominopelvic cavity exactly the abdominal plus
 * the pelvic one: it is literally the same triangles, so switching between the
 * two views cannot show the shared boundary in one place and then somewhere else.
 */
function buildCavity(c,M,grp){
  const out=[];
  const ids=conceptLeaves(c.id);
  let exact=true; const notes=[], basis=[];
  ids.forEach((id)=>{
    const res=cavityShape(id);
    if(!res) return;
    if(!res.exact) exact=false;
    if(res.note) notes.push(res.note);
    basis.push(...(res.basis||[]));
    res.parts.forEach((p)=>{
      const m=cavityMeshes(p,c.color);
      grp.add(m); out.push(m);
    });
  });
  state._cavInfo=state._cavInfo||new Map();
  state._cavInfo.set(c.id,{exact,notes,basis:[...new Set(basis)],built:out.length>0});
  if(!out.length) return out;
  /* the tag goes at the middle of what was actually built, not at a stored spot */
  const box=new state.THREE.Box3();
  out.forEach((m)=>box.expandByObject(m));
  const centre=box.getCenter(new state.THREE.Vector3());
  const h=Math.max(box.max.y-box.min.y,1e-4);
  /*
   * A callout, the same treatment the region grid uses: tag outside the
   * silhouette, leader back to the cavity's centre, dot on the anchor.
   *
   * It used to be a bare tag parked at box.max.x with no leader. Two cavities
   * that overlap in x -- and most of them do, the mediastinum sits inside the
   * thoracic -- produced two labels side by side with nothing saying which
   * named which.
   */
  /*
   * The occupied bands are read off what is on screen NOW rather than kept in
   * a counter, so toggling cavities on and off cannot drift the column.
   */
  const taken=grp.children.filter((o)=>o.userData.calloutBand)
    .map((o)=>o.userData.calloutBand);
  calloutAt(centre,c.name,c.color,M,{size:0.026,rise:h*0.18/M.H,taken})
    .forEach((o)=>{ grp.add(o); out.push(o); });
  return out;
}
function buildPlane(c,M,grp){
  const THREE=state.THREE;
  /* a plane is a cut, so it must be visible straight through the body */
  const mat=new THREE.MeshBasicMaterial({color:c.color,transparent:true,opacity:.13,
    depthWrite:false,depthTest:false,side:THREE.DoubleSide});
  const spanY=M.H*1.03, spanX=M.halfX*2.15, spanZ=M.halfZ*2.5;
  let geo, mesh;
  if(c.axis==='x'){
    geo=new THREE.PlaneGeometry(spanZ,spanY);
    mesh=new THREE.Mesh(geo,mat);
    mesh.rotation.y=Math.PI/2;
    mesh.position.set(M.xAt(c.at),M.yAt(0.5),M.cz);
  } else if(c.axis==='z'){
    geo=new THREE.PlaneGeometry(spanX,spanY);
    mesh=new THREE.Mesh(geo,mat);
    mesh.position.set(M.cx,M.yAt(0.5),M.zAt(c.at));
  } else if(c.axis==='y'){
    geo=new THREE.PlaneGeometry(spanX,spanZ);
    mesh=new THREE.Mesh(geo,mat);
    mesh.rotation.x=Math.PI/2;
    mesh.position.set(M.cx,M.yAt(c.at),M.cz);
  }
  /* the syllabus has exactly three plane axes; anything else is a data error */
  if(!mesh) return [];
  mesh.renderOrder=8;
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({color:c.color,transparent:true,opacity:.7,depthTest:false})));
  grp.add(mesh);
  const out=[mesh];
  /*
   * The two tags name what the plane SEPARATES, so each has to sit on its own
   * side of the cut -- offset along the plane's normal, never along the plane
   * itself, or both words end up in the same place on the midline.
   */
  const tag=(text,x,y,z)=>{ const s=labelSprite(text,c.color,{world:M.H*0.024,minLine:0.018,maxLine:0.025});
    s.position.set(x,y,z); grp.add(s); out.push(s); return s; };
  if(c.ends&&(c.ends[0]||c.ends[1])){
    if(c.axis==='x'){            /* normal is x: right (-x) and left (+x) */
      tag(c.ends[0],M.xAt(c.at-0.155),M.yAt(0.50),M.zAt(0.10));
      tag(c.ends[1],M.xAt(c.at+0.155),M.yAt(0.50),M.zAt(0.10));
    } else if(c.axis==='z'){     /* normal is z: back (-z) and front (+z) */
      tag(c.ends[0],M.xAt(0.16),M.yAt(0.50),M.zAt(c.at-0.145));
      tag(c.ends[1],M.xAt(0.16),M.yAt(0.50),M.zAt(c.at+0.145));
    } else if(c.axis==='y'){     /* normal is y: below and above */
      tag(c.ends[0],M.xAt(0.235),M.yAt(c.at-0.075),M.zAt(0.02));
      tag(c.ends[1],M.xAt(0.235),M.yAt(c.at+0.075),M.zAt(0.02));
    }
  }
  return out;
}

/* ---- the nine regions / four quadrants, painted on the front of the body ---- */
/*
 * These are not cavities and they are not sections: they are lines a clinician
 * draws ON a patient, so they are drawn on the patient here too.
 *
 * The construction is deliberately one-way. measureGrid finds the anatomical
 * levels -- two midclavicular lines, the subcostal and transtubercular planes,
 * the median and transumbilical planes for the quadrants -- and every one of
 * them comes back as a CONSTANT. This module then projects those constants onto
 * the body's own anterior surface. The anatomy can bend the lines in three
 * dimensions, because the belly is curved; it can never move the level they
 * were measured at. That direction matters: the previous version let the costal
 * arch be a boundary, which pulled the top of the grid into a triangle pointed
 * at the xiphoid and made the epigastric region taper to nothing.
 *
 * There is also no outer frame. The lateral edge of an outer cell is the body's
 * own silhouette at that height, so the set reads as lines drawn on a torso
 * rather than as a box parked in front of one.
 */
function gridMetrics(){
  const ctx=cavityContext();
  if(!ctx) return null;
  if(state._cavGrid&&state._cavGrid.sig===ctx.sig) return state._cavGrid;
  const G=measureGrid(ctx,cavityMeasured(ctx));
  if(!G.surfaceAt||!G.halfWidthAt||G.topY==null||G.bottomY==null
     ||G.subcostalY==null||G.transtubercularY==null
     ||G.transumbilicalY==null||G.midclavicularX==null) return null;
  G.sig=ctx.sig;
  state._cavGrid=G;
  return G;
}
/* a column edge is either a reference line (a number) or the silhouette (f(y)) */
const gridEdge=(v,y)=>(typeof v==='function'?v(y):v);

/* a curved panel: a tessellated patch of the anterior surface between four boundaries */
function gridPanel(G,xa,xb,yBot,yTop,nx,ny){
  const THREE=state.THREE;
  nx=nx||14; ny=ny||10;
  const pos=[], idx=[];
  for(let j=0;j<=ny;j++){
    const y=yBot+(yTop-yBot)*(j/ny);
    const a=gridEdge(xa,y), b=gridEdge(xb,y);
    for(let i=0;i<=nx;i++){
      const x=a+(b-a)*(i/nx);
      pos.push(x,y,G.surfaceAt(x,y));
    }
  }
  for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){
    const p=j*(nx+1)+i, q=p+nx+1;
    idx.push(p,q,p+1,p+1,q,q+1);
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
/* the border of one cell, walked round on the surface */
function gridOutline(G,xa,xb,yBot,yTop,n){
  const THREE=state.THREE;
  n=n||14;
  const pos=[], lift=(yTop-yBot)*0.004;
  const push=(x,y)=>pos.push(x,y,G.surfaceAt(x,y)+lift);
  const across=(y,rev)=>{
    const a=gridEdge(xa,y), b=gridEdge(xb,y);
    for(let k=0;k<=n;k++){ const t=rev?1-k/n:k/n; push(a+(b-a)*t,y); }
  };
  const down=(edge,rev)=>{
    for(let k=0;k<=n;k++){ const t=rev?1-k/n:k/n; const y=yBot+(yTop-yBot)*t; push(gridEdge(edge,y),y); }
  };
  across(yBot,false); down(xb,false); across(yTop,true); down(xa,true);
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  return g;
}
/*
 * One reference line, laid on the surface. A vertical runs the height of the
 * drawing at a fixed x; a horizontal runs from silhouette to silhouette at a
 * fixed y. Both are sampled densely enough to follow the curve of the belly.
 */
function gridLine(G,B,axis,at,tint,opacity){
  const THREE=state.THREE, n=32;
  const pos=[], lift=(B.top-B.bottom)*0.006;
  for(let k=0;k<=n;k++){
    const t=k/n;
    let x,y;
    if(axis==='x'){ x=at; y=B.bottom+(B.top-B.bottom)*t; }
    else { y=at; const w=G.halfWidthAt(y); x=G.medianX+(2*t-1)*w; }
    pos.push(x,y,G.surfaceAt(x,y)+lift);
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  const line=new THREE.Line(g,new THREE.LineBasicMaterial({color:tint,transparent:true,
    opacity,depthWrite:false}));
  line.renderOrder=7;
  return line;
}
function buildCellGrid(kind,emphId,M,grp){
  const THREE=state.THREE, tint=0x72e3cf;
  const G=gridMetrics();
  if(!G) return [];
  const B=gridBounds(kind,G);
  const {cols,rows}=B;
  const out=[], all=!emphId;

  /*
   * The cells carry a wash, not a border. Nine outlined boxes is what made the
   * old overlay look like a cage bolted to the abdomen; the divisions the
   * learner is meant to see are the four reference lines, drawn once below.
   * Only a singled-out region gets its own edge, because then the edge IS the
   * answer to "how far does this region reach".
   */
  BODY_CONCEPTS.filter((c)=>c.kind===kind).forEach((c)=>{
    const [col,row]=c.cell;
    /* patient's right is world -x, so column 0 is the leftmost boundary pair */
    const xa=cols[col], xb=cols[col+1], yTop=rows[row], yBot=rows[row+1];
    const emph=!all&&c.id===emphId;
    const mesh=new THREE.Mesh(gridPanel(G,xa,xb,yBot,yTop),
      new THREE.MeshBasicMaterial({color:tint,transparent:true,
        opacity:emph?0.28:(all?0.075:0.035),
        depthWrite:false,side:THREE.DoubleSide}));
    mesh.renderOrder=5;
    if(emph) mesh.add(new THREE.LineLoop(gridOutline(G,xa,xb,yBot,yTop),
      new THREE.LineBasicMaterial({color:tint,transparent:true,opacity:0.95,depthWrite:false})));
    grp.add(mesh); out.push(mesh);
    if(all||emph){
      const yc=(yTop+yBot)/2;
      const a=gridEdge(xa,yc), b=gridEdge(xb,yc), xc=(a+b)/2;
      const lift=M.H*0.008;
      const lab=labelSprite(c.short||c.name,tint);
      const hud=lab.userData.hud, asp=hud.aspect;
      hud.hard=true;
      /* one type size for every region name, so a two-line tag reads the same
         as a one-line one instead of being drawn at half scale */
      const want=M.H*0.013*hud.lineRatio;
      const fit=Math.min((b-a)*0.88/asp,(yTop-yBot)*0.75);
      const ht=fit>=want*0.8?Math.min(fit,want):want;
      hud.world=ht;
      if(fit>=want*0.8){
        lab.position.set(xc,yc,G.surfaceAt(xc,yc)+lift);
      } else {
        /*
         * A lateral column is about four centimetres wide and "Right
         * hypochondriac" is not. Shrinking the tag until it fits makes it
         * unreadable; letting it spill puts the name of one region across the
         * next one, which is worse. So it goes beside the body with a leader
         * back to its cell, the way an atlas plate labels a narrow field.
         */
        const sign=xc<G.medianX?-1:1;
        const w=G.halfWidthAt(yc);
        const edge=G.medianX+sign*(w+M.H*0.010);
        const z=G.surfaceAt(G.medianX+sign*w*0.97,yc)+lift;
        lab.position.set(edge+sign*ht*asp/2,yc,z);
        const lg=new THREE.BufferGeometry();
        lg.setAttribute('position',new THREE.Float32BufferAttribute(
          [xc,yc,G.surfaceAt(xc,yc)+lift, edge,yc,z],3));
        const leader=new THREE.Line(lg,new THREE.LineBasicMaterial({color:tint,
          transparent:true,opacity:0.4,depthWrite:false,depthTest:false}));
        leader.renderOrder=7;
        grp.add(leader); out.push(leader);
      }
      grp.add(lab); out.push(lab);
    }
  });

  /* the boundaries themselves: the four (or two) lines that define the set */
  const strong=all?0.9:0.55;
  B.verticals.forEach((x)=>{ const l=gridLine(G,B,'x',x,tint,strong); grp.add(l); out.push(l); });
  B.horizontals.forEach((y)=>{ const l=gridLine(G,B,'y',y,tint,strong); grp.add(l); out.push(l); });

  /* how it was derived, for the overlay card -- see conceptProvenance */
  state._cavInfo=state._cavInfo||new Map();
  const info={exact:!!G.wallMeasured,built:out.length>0,
    notes:[kind==='quadrant'
      ? 'median plane from the vertebral column and sternum; transumbilical plane at the L3/L4 junction'
      : 'midclavicular lines from the midpoint of each clavicle; subcostal plane at the tenth costal cartilage; transtubercular plane at the iliac tubercles',
      G.wallMeasured?'drawn on the abdominal wall muscles'
        :'wall interpolated between the costal margin and the pelvis (muscle layer not loaded)'],
    basis:kind==='quadrant'?['spine.lumbar','thorax.sternum','spine.L3','spine.L4']
      :['thorax.clavicle','thorax.cartilageTenth','pelvis.hipBone']};
  BODY_CONCEPTS.filter((c)=>c.kind===kind).forEach((c)=>state._cavInfo.set(c.id,info));
  return out;
}
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
state.cavityMode='normal';

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
function rebuildConcepts(){
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
function disposeConceptObj(o){
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
state._conceptObjs=new Map();
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
  const MEMORY_TIPS={
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

  function loadStats(){ try{return JSON.parse(localStorage.getItem('osteology-studio-stats') || '{}')}catch{return {}} }
  function saveStats(){ try{localStorage.setItem('osteology-studio-stats',JSON.stringify(state.stats))}catch{} }
  function record(id, correct, elapsed){ const s=state.stats[id] || {attempts:0,correct:0,incorrect:0,avgMs:0,lastReviewed:null,confidence:0}; s.attempts++; correct?s.correct++:s.incorrect++; s.avgMs=Math.round(((s.avgMs*(s.attempts-1))+elapsed)/s.attempts); s.lastReviewed=new Date().toISOString(); s.confidence=Math.round((s.correct/s.attempts)*100); state.stats[id]=s; saveStats(); renderReview(); }
  function showToast(message){ els.toast.textContent=message; els.toast.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>els.toast.classList.remove('show'),2200); }
  function clean(text){return text.replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function memoryTipHTML(record){const key=record?.id?.replace(/^(full:|real:)/,'')?.replace(/-(left|right)$/,'');const tip=MEMORY_TIPS[key]||MEMORY_TIPS[record?.modelObjectIds?.map(id=>id.replace(/-(left|right)$/,'')).find(id=>MEMORY_TIPS[id])];return tip?`<div class="memtip"><span class="mem-root">Memory hook · ${clean(tip.root)}</span><span class="mem-body">💡 ${clean(tip.tip)}</span></div>`:''}
  function regionLabel(id){if(id==='all')return 'All regions';if(!id)return 'Unclassified';/* System layers carry their layer key as a region -- a vein has no bone region. */if(LAYER_NAMES[id])return LAYER_NAMES[id];return REGIONS.find(r=>r.id===id)?.label || id}
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
  function pool(){
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

  function renderRegions(){ els.regions.innerHTML=''; [['all','All regions'],...REGIONS.map(r=>[r.id,r.label])].forEach(([id,label])=>{const b=document.createElement('button');b.className='region-btn'+(state.region===id?' active':'');b.textContent=label;b.onclick=()=>{state.region=id;els.regionMeta.textContent=regionLabel(id);applyVisibility();if(state.mode!=='explore')startQuestion();renderRegions();renderStudyPool()};els.regions.appendChild(b)}) }
  function renderReview(){const reviewed=Object.values(state.stats).filter(s=>s.attempts>0).length;const accuracy=Object.values(state.stats).reduce((n,s)=>n+s.correct,0)/Math.max(1,Object.values(state.stats).reduce((n,s)=>n+s.attempts,0));els.reviewNumber.textContent=`${reviewed} / ${ANATOMY_DATABASE.length} reviewed`;els.reviewBar.style.width=`${Math.round(accuracy*100)}%`;els.reviewHint.textContent=reviewed?`${Math.round(accuracy*100)}% correct overall · weaker structures are prioritised.`:'Start with Identify to create your first review history.'}
  function selectBone(id, side=null){state.selectedId=id;state.selectedSide=side;const record=getRecord(id);if(!record)return;const layerMeshes=Object.values(state.extraModels||{}).flatMap(m=>m.meshes);state.selectionAnchor=state.meshes.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||layerMeshes.find(m=>m.userData.canonicalId===id)||state.fullMeshes.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||state.fullPickables.find(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase()))||null;renderSelected(record,side);highlight(id,side);
    /* the name stays on the model until the selection changes */
    if(state.selectionAnchor)showPickCallout(state.selectionAnchor,side?`${record.canonicalName}\n${side}`:record.canonicalName);
    if(state.isolated)applyVisibility()}
  function openDetail(record,side=null){els.detailTitle.textContent=record.canonicalName;els.detailChips.innerHTML=`<span class="chip">${regionLabel(record.region)}</span><span class="chip">${side||record.side}</span><span class="chip">Level ${record.difficulty}</span>`;els.detailBody.innerHTML=`<div class="info-grid"><div><div class="info-label">Landmarks</div><ul class="compact-list">${record.landmarks.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div><div><div class="info-label">Articulations</div><ul class="compact-list">${record.articulations.map(x=>`<li>${clean(x)}</li>`).join('')}</ul></div></div>${memoryTipHTML(record)}<h3>Radiography</h3><p>${clean(record.radiographyImportance)}</p><h3>Common confusions</h3><p>${record.commonConfusions?.map(clean).join(', ')||'None listed.'}</p>`;state.lastDetailId=record.id;location.hash=`detail/${record.id}`;(window.__rssOpenDialog ? window.__rssOpenDialog(els.detailDialog) : els.detailDialog.showModal())}
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
  function courseChipHTML(record,anchor){
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
  function setMode(mode){
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
  function startQuestion(){
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
  function startQuestionFor(record){state.current={id:record.id,side:null,started:performance.now(),mode:state.mode};renderAnswers(record,state.mode)}
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
  function answer(option,button){if(!state.current)return;const correct=state.current.mode==='side'?option===state.current.side:state.current.mode==='landmarks'?option===state.current.landmark:option===state.current.id;const record=getRecord(state.current.id);if(record)recordAnswer(correct,record,button);}
  function recordAnswer(correct,bone,button){const elapsed=performance.now()-state.current.started;if(state.current.mode==='memory')state.memoryStreak=correct?state.memoryStreak+1:0;state.runStreak=correct?(state.runStreak||0)+1:0;record(bone.id,correct,elapsed);document.querySelectorAll('.answer').forEach(b=>b.disabled=true);if(button)button.classList.add(correct?'correct':'wrong');if(!correct){const correctText=state.current.mode==='side'?state.current.side:state.current.mode==='landmarks'?(LANDMARK_HOTSPOTS[bone.id]||[]).find(h=>h.id===state.current.landmark)?.label:bone.canonicalName;const hook=MEMORY_TIPS[bone.id]?.tip?` Memory hook: ${MEMORY_TIPS[bone.id].tip}`:'';els.feedback.className='feedback bad show';els.feedback.textContent=`Not quite. Correct: ${correctText}. ${bone.landmarks[0]} is the useful distinguishing landmark.${hook}`}else{els.feedback.className='feedback good show';els.feedback.textContent=state.current.mode==='find'?'Correct — you found it in space.':`Correct. ${bone.radiographyImportance}`;}highlight(bone.id,state.current.side);els.feedback.insertAdjacentHTML('beforeend',scoreHTML());els.next.classList.add('show')}
  function onBonePicked(obj){const {canonicalId,side}=obj.userData;const record=getRecord(canonicalId);const sourceId=obj.userData.sourceCanonicalId;/* Tapping a bone selects it. It used to also flip the viewer to the   upper-limb region and swap the model, which is a surprise at the best of   times and left the other layers standing next to a different skeleton. */if(state.mode==='find'&&state.current){const correct=canonicalId===state.current.id;const questionRecord=getAnatomy(state.current.id);recordAnswer(correct,questionRecord,null);if(!correct){selectBone(canonicalId,side);els.feedback.className='feedback bad show';els.feedback.textContent=`Not that one — try again. You tapped ${getRecord(canonicalId)?.canonicalName||'another structure'}.`;els.next.classList.remove('show');document.querySelectorAll('.answer').forEach(b=>b.disabled=false);state.current.started=performance.now();return}return}if(state.mode==='landmarks'&&obj.userData.landmarkId){answer(obj.userData.landmarkId,null);return}if(record)selectBone(canonicalId,side)}
  function clearHighlight(){[...state.meshes,...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].forEach(m=>{m.material.emissive?.setHex(0x000000);m.material.emissiveIntensity=0;m.userData.presentationActive=false;if(state.xray&&m.userData.xrayHot){m.material.dispose();m.material=state.xray.shared.get(m.userData.xrayKey);delete m.userData.xrayHot}if(m.userData.baseScale)m.scale.set(...m.userData.baseScale);if(m.userData.basePosition)m.position.set(...m.userData.basePosition)});state.fullPickables.forEach(m=>{m.material.opacity=0})}
  function highlight(id,side=null){clearHighlight();[...state.meshes,...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{/* In the projection there is no emissive channel to light up, so a pick   reads as a brighter, tinted accumulation instead. */if(state.xray&&m.userData.xrayKey){const mu=(XRAY_MU[m.userData.xrayKey]||.12)*3.4;m.material=xrayDepthMaterial(state.THREE,mu);m.userData.xrayHot=true}else{m.material.emissive?.setHex(0x1eb9a6);m.material.emissiveIntensity=.95}m.userData.presentationActive=true});state.fullPickables.filter(m=>m.userData.canonicalId===id&&(!side||m.userData.side===side.toLowerCase())).forEach(m=>{m.material.opacity=.26})}
  /* ------------------------------------------------------------------ *
   * Region boxes — how the region filter reaches the six soft-tissue layers
   *
   * The filter used to touch the skeleton alone, so choosing "Thoracic cage"
   * with the organ layer on left the whole abdomen standing there and the
   * filter read as dead. The other six layers carry no region label of their
   * own, and inventing one from a vessel's name is exactly the kind of guess
   * this app refuses. So the region is MEASURED: that region's own bones give
   * an axis-aligned box in the body frame, and a soft-tissue mesh belongs to
   * the region when its centre lies inside it.
   *
   * Paired limbs get one box per side. A single box around both arms spans the
   * whole chest between them and would let everything through.
   *
   * Centres are measured in the BODY frame (through the skeleton pivot's
   * inverse), never the world frame — the turntable yaws every pivot together,
   * so a world-space centre swings with it. All pivots take the same transform,
   * so the body-frame centre is constant and is cached on the mesh.
   * ------------------------------------------------------------------ */
  function bodyInverse(){
    const THREE=state.THREE,root=state.fullModel||state.realModel||null;
    if(!THREE||!root)return null;
    if(state.scene)state.scene.updateMatrixWorld(true);
    return new THREE.Matrix4().copy(root.matrixWorld).invert();
  }
  function bodyCentreOf(o,inv){
    if(o.userData._bodyC)return o.userData._bodyC;
    const THREE=state.THREE;
    if(!THREE||!o.geometry)return null;
    if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();
    const bb=o.geometry.boundingBox;if(!bb)return null;
    const m4=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);
    const box=new THREE.Box3(),v=new THREE.Vector3();
    for(let k=0;k<8;k++){v.set(k&1?bb.max.x:bb.min.x,k&2?bb.max.y:bb.min.y,k&4?bb.max.z:bb.min.z).applyMatrix4(m4);box.expandByPoint(v)}
    const c=box.getCenter(new THREE.Vector3());
    o.userData._bodyC=c;
    return c;
  }
  function regionBoxes(region){
    const THREE=state.THREE;
    if(!THREE||region==='all')return null;
    if(state._regionBoxes&&state._regionBoxes.region===region&&state._regionBoxes.n===state.fullMeshes.length)
      return state._regionBoxes.boxes;
    const inv=bodyInverse();if(!inv)return null;
    let own=state.fullMeshes.filter(m=>(m.userData.regions||[m.userData.region]).includes(region));
    if(!own.length)return null;
    /*
     * The pectoral girdle defines the shoulder, not the arm.
     *
     * Measured: the clavicle reaches the midline at the sternoclavicular joint
     * and the scapula's medial border sits a couple of centimetres off the
     * spine, so a box drawn round the whole upper limb ran from fingertip to
     * midline on each side and the two together swallowed the entire trunk --
     * "Upper limb" showed 90 of the 120 organs, the oesophagus among them.
     * The box is measured from the FREE limb only (humerus and distal), which
     * is the same girdle/free-limb split the course uses. The girdle bones
     * are still shown; they just do not define the soft tissue.
     */
    if(region==='upper_limb'){
      const free=own.filter(m=>!/clavicle|scapula/i.test(String(m.userData.label||'')));
      if(free.length)own=free;
    }
    const paired=region==='upper_limb'||region==='lower_limb';
    const groups=paired
      ?[own.filter(m=>m.userData.side==='left'),own.filter(m=>m.userData.side==='right')]
      :[own];
    /* a couple of centimetres of body height, so a vessel hugging the bone is
       not clipped off the region it plainly belongs to */
    const mets=bodyMetrics(),pad=mets.H*0.02;
    const boxes=[];
    groups.forEach(g=>{
      if(!g.length)return;
      const b=new THREE.Box3();
      g.forEach(o=>{const c=bodyCentreOf(o,inv);if(!c)return;
        if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();
        const bb=o.geometry.boundingBox,m4=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld),v=new THREE.Vector3();
        for(let k=0;k<8;k++){v.set(k&1?bb.max.x:bb.min.x,k&2?bb.max.y:bb.min.y,k&4?bb.max.z:bb.min.z).applyMatrix4(m4);b.expandByPoint(v)}
      });
      if(!b.isEmpty()){b.expandByScalar(pad);boxes.push(b)}
    });
    state._regionBoxes={region,boxes,n:state.fullMeshes.length};
    return boxes.length?boxes:null;
  }
  function applyVisibility(){const skelOn=state.layers?state.layers.skeleton!==false:true;/* 'upper_limb' is now an ordinary region filter on the full skeleton. The   separate five-bone set is never drawn -- the skeleton already names those   five -- but its group stays visible so the landmark hotspots parented to   it can show. */if(state.fullModel)state.fullModel.visible=skelOn;if(state.realModel)state.realModel.visible=true;state.fullPickables.forEach(m=>m.visible=skelOn);state.fullMeshes.forEach(m=>{const inRegion=state.region==='all'||(m.userData.regions||[m.userData.region]).includes(state.region);const isolated=!state.isolated||!state.selectedId||m.userData.canonicalId===state.selectedId;m.visible=skelOn&&inRegion&&isolated});state.meshes.forEach(m=>{m.visible=false});state.hotspots.forEach(h=>h.visible=skelOn&&state.mode==='landmarks'&&(!state.selectedId||h.userData.parentId===state.selectedId));
    /*
     * The six system layers.
     *
     * Two things happen here that nothing else in the engine did.
     *
     * 1. Restore. applyLayers only ever set the layer ROOT's visibility, so a
     *    mesh hidden by hand kept visible === false for ever: pressing "show"
     *    in the hidden tray removed it from state.hidden and the structure
     *    still did not come back. Anything not hidden and not owned by a study
     *    focus is turned back on here, every pass.
     * 2. Region. A mesh outside the chosen region's measured box goes off, so
     *    the region filter finally means something with organs or vessels on.
     */
    {
      const boxes=regionBoxes(state.region),inv=boxes?bodyInverse():null;
      Object.entries(state.extraModels||{}).forEach(([k,mdl])=>{
        if(state.focus&&state.focus.key===k)return;   /* focus owns this layer */
        mdl.meshes.forEach(o=>{
          if(!boxes){o.visible=true;return}
          const c=bodyCentreOf(o,inv);
          o.visible=!!c&&boxes.some(b=>b.containsPoint(c));
        });
      });
    }
    if(typeof applyConnectiveVisibility==='function')applyConnectiveVisibility();
    if(typeof enforceHidden==='function')enforceHidden();
    /*
     * A leader line pointing at something no longer on screen.
     *
     * Selecting a tooth and then filtering to the thoracic cage left the tag
     * "Upper first molar tooth" hanging in the empty air above the ribs, its
     * leader ending nowhere. If the selected structure has just been filtered
     * or hidden away, the callout goes with it.
     */
    if(state.selectionAnchor&&state.selectionAnchor.visible===false
      &&typeof clearPickCallout==='function')clearPickCallout();if(state.fullMeshes.length&&typeof updateStageMeta==='function')updateStageMeta()}
  function addMesh(THREE,group,geometry,position,canonicalId,region,side=null,scale=[1,1,1],label=''){const mat=new THREE.MeshStandardMaterial({color:0xd9d1bc,roughness:.74,metalness:.03});const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(...position);mesh.scale.set(...scale);mesh.userData={canonicalId,region,side,baseScale:[...scale],basePosition:[...position],presentationActive:false,label};group.add(mesh);state.meshes.push(mesh);return mesh}
  function between(THREE,group,a,b,r,id,region,side=null){const dir=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));const mesh=addMesh(THREE,group,new THREE.CylinderGeometry(r,r*.9,dir.length(),10),new THREE.Vector3(...a).add(new THREE.Vector3(...b)).multiplyScalar(.5).toArray(),id,region,side);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return mesh}
  function tube(THREE,group,points,r,id,region,side=null){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return addMesh(THREE,group,new THREE.TubeGeometry(curve,14,r,6,false),[0,0,0],id,region,side)}
  function createProceduralModel(THREE){state.realIsProcedural=true;const group=new THREE.Group();state.meshes=[];const sphere=new THREE.SphereGeometry(1,16,12), smallSphere=new THREE.SphereGeometry(1,12,8);
    addMesh(THREE,group,sphere,[0,11.2,.15],'cranium','skull',null,[1.35,1.55,1.1]);addMesh(THREE,group,new THREE.BoxGeometry(1.6,.4,.85),[0,9.85,.35],'mandible','skull',null,[1,1,1]);
    for(let i=0;i<7;i++)addMesh(THREE,group,new THREE.CylinderGeometry(.38,.43,.25,10),[0,8.95-i*.62,0],'cervical','spine',null,[1,1,1],`C${i+1}`);
    for(let i=0;i<12;i++)addMesh(THREE,group,new THREE.CylinderGeometry(.46,.52,.24,10),[0,4.55-i*.43,0],'thoracic','spine',null,[1,1,1],`T${i+1}`);
    for(let i=0;i<5;i++)addMesh(THREE,group,new THREE.CylinderGeometry(.6,.68,.3,10),[0,-.65-i*.5,0],'lumbar','spine',null,[1,1,1],`L${i+1}`);
    addMesh(THREE,group,new THREE.ConeGeometry(1.7,2.6,8),[0,-3.4,0],'sacrum','spine',null,[1,.9,.45]);addMesh(THREE,group,new THREE.ConeGeometry(.48,1.2,8),[0,-4.85,0],'coccyx','spine',null,[1,.9,.5]);
    addMesh(THREE,group,new THREE.BoxGeometry(.5,3.2,.38),[0,4.55,1.25],'sternum','thorax',null,[1,1,1]);
    for(let i=0;i<12;i++){const y=4.4-i*.42;const bend=i<7?1.65:1.42;for(const s of [-1,1])tube(THREE,group,[[0.25*s,y,-.05],[.8*s,y+.1,.65],[bend*s,y-.1,1.05],[2.0*s,y-.24,1.15]],.075,'ribs','thorax',s<0?'left':'right')}
    for(const s of [-1,1]){const side=s<0?'left':'right';between(THREE,group,[.1*s,8.65,1.0],[2.25*s,8.35,.9],.16,'clavicle','upper_limb',side);addMesh(THREE,group,sphere,[2.35*s,7.25,.15],'scapula','upper_limb',side,[.9,1.35,.22]);between(THREE,group,[2.55*s,7.05,.15],[2.85*s,3.85,.12],.23,'humerus','upper_limb',side);between(THREE,group,[2.78*s,3.65,.14],[2.55*s,.75,.15],.14,'radius','upper_limb',side);between(THREE,group,[3.04*s,3.68,-.02],[2.98*s,.78,-.02],.16,'ulna','upper_limb',side);addMesh(THREE,group,new THREE.BoxGeometry(1.1,.7,.4),[2.75*s,.25,.15],'hand','upper_limb',side,[1,1,1]);
      addMesh(THREE,group,sphere,[1.25*s,-.25,.1],'pelvis','pelvis',side,[1.1,1.25,.5]);between(THREE,group,[1.0*s,-1.0,0],[1.18*s,-5.0,.05],.32,'femur','lower_limb',side);addMesh(THREE,group,smallSphere,[1.18*s,-5.12,.38],'patella','lower_limb',side,[.38,.32,.18]);between(THREE,group,[1.18*s,-5.3,0],[1.18*s,-9.0,.02],.24,'tibia','lower_limb',side);between(THREE,group,[1.52*s,-5.3,-.04],[1.5*s,-8.95,-.02],.12,'fibula','lower_limb',side);addMesh(THREE,group,new THREE.BoxGeometry(1.2,1.55,.55),[1.3*s,-9.5,.4],'foot','lower_limb',side,[1,1,1])}
    return group;
  }
  function showHotspots(parentId){state.hotspots.forEach(h=>h.visible=h.userData.parentId===parentId)}
  function addHotspots(THREE,scene){const parentNode=state.realModel||scene;state.hotspots=[];Object.entries(LANDMARK_HOTSPOTS).forEach(([parent,spots])=>spots.forEach((spot)=>{const mat=new THREE.MeshBasicMaterial({color:0xffba67});const mesh=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),mat);mesh.position.set(...spot.position);mesh.userData={canonicalId:parent,parentId:parent,landmarkId:spot.id,label:spot.label};mesh.visible=false;parentNode.add(mesh);state.hotspots.push(mesh)}))}
  function addFullPickables(THREE,scene){if(state.fullMeshes.length)return;const parentNode=state.fullModel||scene;state.fullPickables=[];const zones=[['cranium',null,[0,6.25,.15],.62],['mandible',null,[0,5.5,.2],.38],['clavicle','left',[-1.15,4.75,.15],.35],['clavicle','right',[1.15,4.75,.15],.35],['scapula','left',[-1.3,4.25,.15],.58],['scapula','right',[1.3,4.25,.15],.58],['humerus','left',[-1.52,3.65,.12],.43],['humerus','right',[1.52,3.65,.12],.43],['radius','left',[-1.72,2.75,.1],.28],['radius','right',[1.72,2.75,.1],.28],['ulna','left',[-1.98,2.75,.1],.28],['ulna','right',[1.98,2.75,.1],.28],['hand','left',[-1.82,1.8,.1],.34],['hand','right',[1.82,1.8,.1],.34],['sternum',null,[0,4.0,.3],.34],['ribs',null,[0,3.65,.1],.82],['cervical',null,[0,4.65,-.05],.24],['thoracic',null,[0,3.3,-.05],.34],['lumbar',null,[0,2.15,-.05],.34],['sacrum',null,[0,.65,.1],.36],['coccyx',null,[0,.15,.1],.22],['pelvis','left',[-.72,.45,.15],.58],['pelvis','right',[.72,.45,.15],.58],['femur','left',[-.82,-1.15,.1],.38],['femur','right',[.82,-1.15,.1],.38],['patella','left',[-.82,-3.0,.1],.25],['patella','right',[.82,-3.0,.1],.25],['tibia','left',[-.82,-4.45,.1],.25],['tibia','right',[.82,-4.45,.1],.25],['fibula','left',[-1.05,-4.45,.1],.2],['fibula','right',[1.05,-4.45,.1],.2],['foot','left',[-.82,-6.05,.18],.38],['foot','right',[.82,-6.05,.18],.38]];zones.forEach(([id,side,position,radius])=>{const mat=new THREE.MeshBasicMaterial({color:0x72e3cf,transparent:true,opacity:0,depthWrite:false});const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,12,8),mat);mesh.position.set(...position);mesh.userData={canonicalId:id,side};parentNode.add(mesh);state.fullPickables.push(mesh)})}
  /*
   * Mesh name -> curated bone record.
   *
   * This was an object literal walked with `value.includes(needle)`, so the
   * winner was whichever key happened to come first in insertion order.
   * 'phalanx' sat before 'metatarsal' and 'talus', so every phalanx of every
   * TOE mapped to the hand record -- 60 meshes -- and inherited the hand's
   * region, which is the visible half of the broken region filter. The
   * vertebrae matched nothing at all ('Vertebra_C3' contains neither
   * 'cervical' nor 'thoracic'), so C3-C7, T1-T12 and L1-L5 had no curated
   * record and only the atlas and axis did.
   *
   * An ordered list of anchored patterns, foot before hand, with the vertebral
   * levels read off the name.
   */
  const IMPORT_MAP=[
    [/\bfoot|\bmetatars|\btarsal|\bcalcaneus|\btalus|\bcuboid|\bcuneiform bone|\bnavicular/,'foot'],
    [/\bhand\b|\bhandl\b|\bhandr\b|\bmetacarp|\bcarpal|\bscaphoid|\blunate|\btriquetrum|\bpisiform|\btrapezium|\btrapezoid|\bcapitate|\bhamate/,'hand'],
    [/\bcranium|\bskull/,'cranium'],
    [/\bmandible|\bjaw/,'mandible'],
    [/\batlas\b|\baxis\b|\bvertebra c\d/,'cervical'],
    [/\bvertebra t\d/,'thoracic'],
    [/\bvertebra l\d/,'lumbar'],
    [/\bsacrum/,'sacrum'],
    [/\bcoccyx/,'coccyx'],
    [/\bsternum|\bmanubrium|\bxiphoid/,'sternum'],
    [/\brib|\bcosta/,'ribs'],
    [/\bclavicle|\bcollarbone/,'clavicle'],
    [/\bscapula/,'scapula'],
    [/\bhumerus/,'humerus'],
    [/\bradius/,'radius'],
    [/\bulna/,'ulna'],
    [/\bhip bone|\bilium|\bischium|\bpubis|\bpelvis|\bacetabul/,'pelvis'],
    [/\bfemur/,'femur'],
    [/\bpatella/,'patella'],
    [/\btibia/,'tibia'],
    [/\bfibula/,'fibula'],
  ];
  function mapImportedName(raw){const value=String(raw||'').toLowerCase().replace(/[_.\-]+/g,' ');for(const [re,id] of IMPORT_MAP)if(re.test(value))return id;return null}
  function sideFromImportedName(raw){const value=String(raw||'').toLowerCase().replace(/[_.\-]+/g,' ');if(/\b(left|l)\b/.test(value)||value.endsWith(' l')||/(bone|phalanx|humerus|radius|ulna|scapula|clavicle|femur|tibia|fibula|patella|talus|calcaneus)l$/.test(value))return 'left';if(/\b(right|r)\b/.test(value)||value.endsWith(' r')||/(bone|phalanx|humerus|radius|ulna|scapula|clavicle|femur|tibia|fibula|patella|talus|calcaneus)r$/.test(value))return 'right';return null}
  function cleanImportedLabel(raw){let value=String(raw||'').replace(/[_.\-]+/g,' ').replace(/\s+/g,' ').trim();value=value.replace(/(bone|phalanx|humerus|radius|ulna|scapula|clavicle|femur|tibia|fibula|patella|talus|calcaneus)([lr])$/i,'$1');return value.replace(/\s+[lr]$/i,'').trim()}
  /*
   * Which region a skeleton mesh belongs to.
   *
   * The old rule put 'phalanx' and 'hand' in the same alternation as humerus
   * and radius and tested it BEFORE the foot, so every phalanx of every toe
   * classified as upper limb; and anything no rule matched fell through to a
   * bare `return 'skull'`, which is how the carpals, the tarsals and the ear
   * ossicles came to be filed under the cranium. Measured on the loaded model:
   * skull 103, upper limb 76 (60 of them toes), pelvis 2. Choosing "Lower
   * limb" showed metatarsals with no toes; choosing "Skull" showed a handful
   * of wrist bones. That is the "region filter does not work" report.
   *
   * Rewritten as an ordered list, most specific first, foot before hand
   * ('Distal phalanx of third finger of foot' names a finger), and with NO
   * catch-all: a name no rule places returns null and is reported rather than
   * silently absorbed. work/region-probe.mjs fails if one of the 277 meshes
   * is left unplaced.
   *
   * Matching runs on the underscore-flattened name and never requires a
   * trailing word boundary, because side letters are glued onto the end --
   * 'Eighth_ribl', 'Femurr'. Leading \b is kept, so 'cribriform' is not a rib.
   */
  const REGION_RULES=[
    ['lower_limb',/\bfoot|\bmetatars|\bcalcaneus|\btalus|\bcuboid|\bcuneiform bone|\bnavicular|\bfemur|\btibia|\bfibula|\bpatella|\bhallux|\btarsal/],
    ['upper_limb',/\bhand\b|\bhandl|\bhandr|\bmetacarp|\bscaphoid|\blunate|\btriquetrum|\bpisiform|\btrapezium|\btrapezoid|\bcapitate|\bhamate|\bclavicle|\bscapula|\bhumerus|\bradius|\bulna|\bcarpal/],
    ['pelvis',/\bhip bone|\bilium|\bischium|\bpubis|\bpubic|\bacetabul|\binnominate/],
    ['spine',/\bvertebra|\batlas\b|\baxis\b|\bsacrum|\bsacral|\bcoccyx|\bintervertebral/],
    ['thorax',/\brib|\bcostal|\bsternum|\bmanubrium|\bxiphoid/],
    ['skull',/\bcranium|\bskull|\bfrontal bone|\bparietal|\boccipital|\btemporal bone|\bsphenoid|\bethmoid|\blacrimal|\bnasal|\bvomer|\bpalatine|\bzygomat|\bmaxilla|\bmandible|\bconcha|\bhyoid|\bincus|\bmalleus|\bstapes|\bossicle|\btooth|\bteeth|\bmolar|\bpremolar|\bincisor|\bcanine|\barytenoid|\bcorniculate|\bcricoid|\bthyroid cartilage|\bcuneiform cartilage|\bepiglot|\balar cartilage|\bmastoid|\borbit/],
  ];
  function importedRegion(raw,mapped){if(mapped&&getAnatomy(mapped))return getAnatomy(mapped).region;const value=String(raw||'').replace(/_/g,' ').toLowerCase();for(const [id,re] of REGION_RULES)if(re.test(value))return id;return null}
  /*
   * A few bones honestly belong to two regions.
   *
   * The sacrum and the coccyx close the pelvic ring AND finish the vertebral
   * column; the course teaches them under the column, so that stays the
   * primary region and the record keeps it. But filtering to "Pelvis" and
   * being shown two hip bones with the back of the ring missing is the same
   * kind of wrong the filter had before. A mesh therefore carries a LIST of
   * regions; everything else in the app still reads the single primary one.
   */
  const REGION_ALSO=[[/\bsacrum|\bcoccyx/,'pelvis']];
  function importedRegions(raw,mapped){
    const primary=importedRegion(raw,mapped);
    const value=String(raw||'').replace(/_/g,' ').toLowerCase();
    const out=primary?[primary]:[];
    for(const [re,id] of REGION_ALSO)if(re.test(value)&&!out.includes(id))out.push(id);
    return out;
  }
  function importedRecord(id,raw,mapped,region){const known=mapped&&getAnatomy(mapped);const label=cleanImportedLabel(raw);const side=sideFromImportedName(raw);if(known)return {...known,id,canonicalName:label||known.canonicalName,side:side||known.side};return {id,canonicalName:label||'Unnamed structure',aliases:[],region,side:side||'bilateral',category:'named atlas structure',landmarks:[],articulations:[],radiographyImportance:'Named atlas structure from the interactive skeleton source.',difficulty:3,modelObjectIds:[],commonConfusions:[]}}
  function getRecord(id){return getAnatomy(id)||state.importedRecords.get(id)||null}
  function prepareFullReference(THREE,root){state.THREE=THREE;state.fullMeshes=[];state.fullPickables=[];root.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(root);const size=box.getSize(new THREE.Vector3());const maxDim=Math.max(size.x,size.y,size.z)||1;root.scale.setScalar(11.8/maxDim);const scaledBox=new THREE.Box3().setFromObject(root);const center=scaledBox.getCenter(new THREE.Vector3());root.position.x-=center.x;root.position.y+=1-center.y;root.position.z-=center.z;root.updateMatrixWorld(true);/* The canonical body frame. Every other layer gets THIS transform verbatim -- see loadExtraModel. */state.bodyTransform={scalar:11.8/maxDim,offset:[root.position.x,root.position.y,root.position.z]};/* * Side letters are glued onto the name -- 'Costal_cartilage_of_fifth_ribl', * 'Incusr'. cleanImportedLabel only knew a fixed list of bone words, so 148 * of the 277 structures displayed their side letter as part of the name. * Strip it only when the opposite-side twin actually exists, which needs * every name in hand first -- hence two passes. Femur and Vomer genuinely * end in r and have no twin, so they are left alone. */const objs=[];root.traverse((o)=>{if(o.isMesh)objs.push(o)});const raws=objs.map(o=>o.name||o.parent?.name||'Unnamed structure');const flatNames=new Set(raws.map(r=>r.replace(/_/g,' ').trim().toLowerCase()));const sideAware=(raw)=>{const clean=String(raw).replace(/_/g,' ').replace(/\s+/g,' ').trim();const mm=clean.match(/^(.*\S)(l|r)$/i);if(mm){const stem=mm[1].trim();const twin=(stem+(mm[2].toLowerCase()==='l'?'r':'l')).toLowerCase();if(flatNames.has(twin))return {label:stem,side:mm[2].toLowerCase()==='l'?'left':'right'}}return {label:clean,side:null}};objs.forEach((obj,i)=>{const raw=raws[i];const {label,side:sd}=sideAware(raw);const mapped=mapImportedName(raw);const region=importedRegion(raw,mapped);const regions=importedRegions(raw,mapped);/* The same study units as every other layer -- see unitFor. Before this the skeleton handed every mesh its own id, so tapping a toe returned "Distal phalanx of fifth finger of foot", a name no lecture uses. */const unit=unitFor('skeleton',raw);const id=unit?`full:u:${unit.unitId}${sd?':'+sd:''}`:`full:${i}:${raw}`;const base=importedRecord(id,raw,mapped,region);if(!state.importedRecords.has(id)){const rec={...base,canonicalName:(unit?unit.unit:label)||base.canonicalName,side:sd||base.side};if(unit&&unit.unitKind!=='course'&&!(mapped&&getAnatomy(mapped)))rec.radiographyImportance=unitBlurb(unit,'skeleton');state.importedRecords.set(id,rec);}obj.userData={...(obj.userData||{}),baseScale:obj.scale.toArray(),basePosition:obj.position.toArray(),presentationActive:false,canonicalId:id,sourceCanonicalId:mapped,region,regions,side:sd||sideFromImportedName(raw),label:raw,precise:true};if(obj.material){obj.material=obj.material.clone();obj.material.color?.setHex(0xd9d1bc);obj.material.roughness=.8;obj.material.metalness=.02}state.fullMeshes.push(obj)});const pivot=new THREE.Group();pivot.name='fullSkeletonPivot';pivot.add(root);return pivot}
  function prepareImportedModel(THREE,root){state.realIsProcedural=false;/* Same shared body frame as every other layer. Normalising this set to its   OWN bounding box scaled five arm bones to the height of a whole body. */const bt=state.bodyTransform;if(bt){root.scale.setScalar(bt.scalar);root.position.set(bt.offset[0],bt.offset[1],bt.offset[2])}else{const box=new THREE.Box3().setFromObject(root);const size=box.getSize(new THREE.Vector3());const maxDim=Math.max(size.x,size.y,size.z)||1;root.scale.setScalar(11/maxDim);const scaledBox=new THREE.Box3().setFromObject(root);const center=scaledBox.getCenter(new THREE.Vector3());root.position.x-=center.x;root.position.y+=.5-center.y;root.position.z-=center.z}state.meshes=[];let mapped=0,unmapped=0;const importedNames=[];root.traverse((obj)=>{if(!obj.isMesh)return;importedNames.push(obj.name||obj.parent?.name||'unnamed');const canonicalId=obj.userData.sourceCanonicalId||mapImportedName(obj.name||obj.parent?.name);if(!canonicalId){unmapped++;obj.visible=false;return}const known=getAnatomy(canonicalId);if(!known){unmapped++;obj.visible=false;return}mapped++;obj.userData={...(obj.userData||{}),baseScale:obj.scale.toArray(),basePosition:obj.position.toArray(),presentationActive:false,canonicalId,region:known.region,side:obj.userData.sourceSide||sideFromImportedName(obj.name||obj.parent?.name),label:obj.userData.sourceLabel||obj.name};if(obj.material){obj.material=obj.material.clone();obj.material.color?.setHex(0xd9d1bc);obj.material.roughness=.78;obj.material.metalness=.02}state.meshes.push(obj)});return {mapped,unmapped}}
  function remapHotspotsToReal(THREE){if(!state.realModel||state.realIsProcedural)return;const byId=new Map();state.meshes.forEach(m=>{if(!byId.has(m.userData.canonicalId))byId.set(m.userData.canonicalId,m)});state.realModel.updateMatrixWorld(true);Object.entries(LANDMARK_HOTSPOTS).forEach(([parent,spots])=>{const mesh=byId.get(parent);if(!mesh)return;mesh.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(mesh),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());spots.forEach(spot=>{const h=state.hotspots.find(x=>x.userData.parentId===parent&&x.userData.landmarkId===spot.id);if(!h)return;const rel=new THREE.Vector3(...spot.position).sub(new THREE.Vector3(-2.4,7.7,.45));rel.x=Math.max(-1.2,Math.min(1.2,rel.x));rel.y=Math.max(-1.2,Math.min(1.2,rel.y));rel.z=Math.max(-.8,Math.min(.8,rel.z));const worldPoint=center.clone().add(rel.multiply(new THREE.Vector3(size.x*.5,size.y*.5,size.z*.5)));h.position.copy(state.realModel.worldToLocal(worldPoint));h.visible=false})})}
  async function loadImportedModel(THREE,GLTFLoader,DRACOLoader){const root=new THREE.Group();const loader=new GLTFLoader();const draco=new DRACOLoader();draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/draco/');loader.setDRACOLoader(draco);for(let i=0;i<MODEL_CATALOG.active.files.length;i++){const source=MODEL_CATALOG.active.files[i];const gltf=await new Promise((resolve,reject)=>loader.load(source.file,resolve,(event)=>{const ratio=event.total?event.loaded/event.total:0;els.progress.style.width=`${Math.round(((i+ratio)/MODEL_CATALOG.active.files.length)*60)+28}%`},reject));gltf.scene.traverse((obj)=>{obj.userData={...(obj.userData||{}),sourceCanonicalId:source.id,sourceSide:source.side,sourceLabel:source.label}});root.add(gltf.scene)}const pivot=new THREE.Group();pivot.name='realUpperLimbPivot';pivot.add(root);return pivot}
  async function loadFullReference(THREE,GLTFLoader){const loader=new GLTFLoader();const gltf=await new Promise((resolve,reject)=>loader.load(MODEL_CATALOG.fullSkeletonFile,resolve,(event)=>{const ratio=event.total?event.loaded/event.total:0;els.progress.style.width=`${Math.round(ratio*25)+3}%`},reject));return gltf.scene}
  function cameraView(kind){if(!state.camera||!state.controls)return;if(kind==='lateral'){state.camera.position.set(24,1,0);state.controls.target.set(0,1,0)}else{state.camera.position.set(0,1,25);state.controls.target.set(0,1,0)}state.controls.update()}
  async function boot3D(){els.state.classList.remove('hidden');els.stateTitle.textContent='Loading the skeleton layer';els.stateCopy.textContent='Loading the Z-Anatomy skeleton — 159 named structures, 80 of them named by your course material, 88 things you can select. The other six system layers load on demand.';els.retry.style.display='none';els.progress.style.width='3%';try{const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js');const {OrbitControls}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js');const {GLTFLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js');const {DRACOLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/DRACOLoader.js');state.scene=new THREE.Scene();state.scene.background=new THREE.Color(0x0b151b);state.camera=new THREE.PerspectiveCamera(32,1,.1,100);state.camera.position.set(0,1,25);state.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});state.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));state.renderer.outputColorSpace=THREE.SRGBColorSpace;els.stage.prepend(state.renderer.domElement);state.controls=new OrbitControls(state.camera,state.renderer.domElement);state.controls.enableDamping=true;state.controls.dampingFactor=.08;state.controls.minDistance=2.5;state.controls.maxDistance=45;state.controls.target.set(0,1,0);state.raycaster=new THREE.Raycaster();state.pointer=new THREE.Vector2();state.scene.add(new THREE.HemisphereLight(0xdce9e7,0x102026,2.1));const key=new THREE.DirectionalLight(0xffffff,2.4);key.position.set(5,12,16);state.scene.add(key);state.scene.add(new THREE.DirectionalLight(0x5cd1c4,.8));try{state.fullModel=prepareFullReference(THREE,await loadFullReference(THREE,GLTFLoader));state.scene.add(state.fullModel);addFullPickables(THREE,state.scene);els.stageMeta.textContent='Z-Anatomy / BodyParts3D skeleton · 159 named structures';}catch(fullError){console.warn('Full reference failed',fullError)}try{state.realModel=await loadImportedModel(THREE,GLTFLoader,DRACOLoader);const info=prepareImportedModel(THREE,state.realModel);state.scene.add(state.realModel);els.stageMeta.textContent+=` · ${info.mapped} real BodyParts3D upper-limb meshes`;}catch(importError){console.warn('Real upper-limb model failed, using local fallback',importError);state.realModel=createProceduralModel(THREE);state.scene.add(state.realModel);addHotspots(THREE,state.scene);els.stageMeta.textContent='Full reference + fallback upper-limb meshes';}resize();watchStageSize();applyVisibility();els.progress.style.width='100%';setTimeout(()=>els.state.classList.add('hidden'),500);animate();return true}catch(error){els.stateTitle.textContent='3D model unavailable';els.stateCopy.textContent='The study tools still work. Check your connection, then retry the model layer.';els.retry.style.display='inline-flex';els.progress.style.width='100%';console.warn(error);return false}}
  /*
   * Canvas sizing.
   *
   * The old version measured els.stage on window 'resize' alone. A hidden
   * element measures 0x0, and the viewer starts hidden -- the app opens on
   * Today. So the sequence "boot on Today, then tap Viewer" never fired a
   * resize at a moment when the stage had a size, and the canvas kept whatever
   * dimensions it happened to be built with: the model came up squeezed into a
   * phone-shaped strip. Rotating the iPad or entering Split View reproduced it
   * the same way, because the element was measured while it was still hidden.
   *
   * Two changes fix it for good:
   *   - a degenerate 0x0 measurement is REFUSED, not applied. Writing
   *     aspect = 0/0 = NaN into the camera is what made the wrong shape stick.
   *   - a ResizeObserver watches the element itself, so every cause of a size
   *     change -- tab switch, rotation, Split View, Stage Manager, the sheet
   *     opening, the window resizing -- lands here without needing to be
   *     enumerated.
   */
  function resize(){
    if(!state.renderer||!state.camera)return;
    const rect=els.stage.getBoundingClientRect();
    const w=Math.floor(rect.width), h=Math.floor(rect.height);
    if(w<2||h<2)return;                       /* hidden: measure again when shown */
    state.renderer.setSize(w,h,false);
    state.camera.aspect=w/h;
    state.camera.updateProjectionMatrix();
    if(state.xray&&state.xray.rt)state.xray.rt.setSize(w,h);
  }
  function watchStageSize(){
    if(state._sizeWatch||typeof ResizeObserver!=='function')return;
    state._sizeWatch=new ResizeObserver(()=>{
      /* coalesce: a tab switch can fire several observations in one frame */
      cancelAnimationFrame(state._sizeRaf);
      state._sizeRaf=requestAnimationFrame(resize);
    });
    state._sizeWatch.observe(els.stage);
  }
  function animate(){if(!state.renderer)return;requestAnimationFrame(animate);
  if(state.movement&&state.movement.playing){
    const mv=state.movement.mv, step=(mv.range[1]-mv.range[0])/90;
    let a=state.movement.angle+step*state.movement.dir;
    if(a>=mv.range[1]){a=mv.range[1];state.movement.dir=-1}
    else if(a<=mv.range[0]){a=mv.range[0];state.movement.dir=1}
    setMovementAngle(a);
  }state.motionPhase=performance.now()*.001;stepPhysiology(state.motionPhase);if(state.motionEnabled){const turn=Math.sin(state.motionPhase*.55)*.24;[state.fullModel,state.realModel,state.conceptGroup,state.pickGroup,...Object.values(state.extraModels||{}).map(m=>m.pivot)].forEach(root=>{if(root)root.rotation.y=turn})}const pulse=.72+.28*Math.sin(state.motionPhase*3.2);[...state.meshes,...state.fullMeshes].filter(m=>m.userData.presentationActive).forEach(m=>{if(m.material.emissive)m.material.emissiveIntensity=.95*pulse});state.controls.update();if(typeof updateHudSprites==='function')updateHudSprites();if(!renderXray())state.renderer.render(state.scene,state.camera)}
  function zoomCamera(factor){if(!state.camera||!state.controls)return;const offset=state.camera.position.clone().sub(state.controls.target);const distance=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,offset.length()*factor));state.camera.position.copy(state.controls.target).add(offset.normalize().multiplyScalar(distance));state.controls.update()}
  function focusSelected(){if(!state.camera||!state.controls||!state.selectionAnchor){showToast('Select a structure first');return}state.controls.minDistance=2.5;const box=new state.THREE.Box3().setFromObject(state.selectionAnchor);const center=box.getCenter(new state.THREE.Vector3());const size=box.getSize(new state.THREE.Vector3());const radius=Math.max(size.x,size.y,size.z,.35);const offset=state.camera.position.clone().sub(state.controls.target).normalize();const distance=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*3.6));state.controls.target.copy(center);state.camera.position.copy(center).add(offset.multiplyScalar(distance));state.controls.update()}
  function toggleIsolation(){if(!state.selectedId){showToast('Select a structure first');return}const record=getRecord(state.selectedId);if(!state.fullMeshes.length&&record?.region!=='upper_limb'&&state.region!=='upper_limb'){showToast('This fallback reference is fused. Use Upper limb for per-bone isolation.');focusSelected();return}if(state.region!=='upper_limb'&&record?.region==='upper_limb'&&state.meshes.length){state.region='upper_limb';els.regionMeta.textContent='Upper limb';renderRegions();applyVisibility()}state.isolated=!state.isolated;$('isolateBtn').classList.toggle('active',state.isolated);applyVisibility();focusSelected()}
  function isSelfOrAncestorVisible(obj){let o=obj;while(o){if(!o.visible)return false;o=o.parent}return true}
  function nearestVisibleMesh(event,rect){if(!state.THREE)return null;const pool=state.fullMeshes;let best=null;for(const mesh of pool){if(!isSelfOrAncestorVisible(mesh))continue;const box=new state.THREE.Box3().setFromObject(mesh);const boxSize=box.getSize(new state.THREE.Vector3());box.expandByScalar(-Math.min(boxSize.length()*.08,.15));const center=box.getCenter(new state.THREE.Vector3()).project(state.camera);const px=rect.left+(center.x+1)*rect.width/2;const py=rect.top+(1-center.y)*rect.height/2;const radiusPx=Math.max(4,Math.min(32,Math.max(boxSize.x,boxSize.y,boxSize.z)*state.camera.position.distanceTo(state.controls.target)*3));const distance=Math.hypot(event.clientX-px,event.clientY-py);const tolerance=Math.max(18,radiusPx+10);if(distance<=tolerance&&(!best||distance<best.distance))best={mesh,distance}}return best?.mesh||null}
  /*
   * The 900ms fading DOM tag that used to live here is gone: selectBone now
   * raises a callout attached to the structure itself, which persists until the
   * selection changes and turns with the model. A screen-pinned tag could not
   * do either -- it slid off the thing it named on the first drag, and by the
   * time you had rotated to see the structure the name had already faded.
   */
  function confirmPick(obj,event){if(!obj)return;onBonePicked(obj);const picked=getRecord(obj.userData.canonicalId);if(picked){if(navigator.vibrate)navigator.vibrate(10);/* The lesson card owns no selection panel, so it listens instead. */if(state.pickHook)try{state.pickHook(picked)}catch(e){}}}
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
  function restorePeel(){
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
  function stackEntries(){
    return state.pickStack.map((m,i)=>({
      index:i,
      id:m.userData.canonicalId,
      name:(getRecord(m.userData.canonicalId)||{}).canonicalName||m.userData.label||'Unnamed',
      layer:LAYER_NAMES[m.userData.layerKey||(m.userData.extraKey)]||(m.userData.landmarkId?'Landmark':'Skeleton'),
      current:m===state.pickCurrent,
    }));
  }
  function hideFromStack(index){const m=state.pickStack[index];if(m)hideMesh(m);}
  function publishStack(){ if(state.stackHook)try{state.stackHook(stackEntries())}catch(e){} }
  function selectFromStack(index){
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

  function pick(event,focusAfter=false){
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
  let pointerDown=null;function bindCanvas(){let lastTap=0;els.stage.addEventListener('pointerdown',(e)=>{pointerDown={x:e.clientX,y:e.clientY}});els.stage.addEventListener('pointerup',(e)=>{if(pointerDown&&Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)<7){const now=performance.now();const isDouble=now-lastTap<320;lastTap=now;pick(e,isDouble)}pointerDown=null})}
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
  function clearSelection(){state.selectedId=null;state.selectedSide=null;state.selectionAnchor=null;state.isolated=false;clearPickCallout();$('isolateBtn').classList.remove('active');clearHighlight();restorePeel();state.pickStack=[];state.pickCurrent=null;publishStack();applyVisibility();els.selectedName.textContent='Nothing selected';els.selectedChips.innerHTML='';els.selectedDetails.innerHTML=''}
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
window.addEventListener('resize',resize);
window.addEventListener('orientationchange',()=>setTimeout(resize,120));
if(window.visualViewport)window.visualViewport.addEventListener('resize',resize);
  /* The turntable is the slow idle yaw of the whole body. It is a different
   thing from Live physiology, and calling both of them 'animation' was half
   the reason the controls read as duplicated. */
els.motion.onclick=()=>{state.motionEnabled=!state.motionEnabled;els.motion.textContent=state.motionEnabled?'Pause turntable':'Spin turntable';els.motion.classList.toggle('active',state.motionEnabled)};renderRegions();renderReview();bindCanvas();setMode('explore');/*
 * Extra system models (organs, circulatory) live in their own GLB files and are
 * loaded only when a structure set from them is opened. They are shown INSTEAD
 * of the skeleton rather than alongside it: the files come from different
 * captures and are not spatially registered to each other, so overlaying them
 * would place organs in the wrong place relative to bone.
 */
state.extraModels=state.extraModels||{};
state.layers=state.layers||{skeleton:true};
async function loadExtraModel(key,file){
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

/* ------------------------------------------------------------------ *
 * Live physiology
 *
 * The atlas hands over 2,800 meshes in one shade of beige. That is a diagram
 * of where things are with everything they DO taken out, and for a first-year
 * the doing is most of the lesson: which vessel carries which blood, which way
 * lymph is allowed to travel, what a muscle is doing when it fires.
 *
 * Two separate things happen here, and they are deliberately separable.
 *
 *   Colour  is permanent. Every mesh is classified from its own name and given
 *           the colour of what it is. Arteries red, veins blue -- and the
 *           pulmonary vessels the other way round, because that convention is
 *           about oxygen, and the pulmonary circulation is where it inverts.
 *
 *   Motion  is a toggle. A travelling crest of emissive light runs along each
 *           system in its own direction, at its own rate, gated to its own
 *           rhythm: the pulse wave leaves the heart 72 times a minute, lymph
 *           creeps upward toward the venous angle and never back, nerve
 *           volleys fire outward from the cord far faster than blood moves,
 *           and muscle really does shorten along its own long axis.
 *
 * It runs on ONE shared time uniform and one shared uniform object per class,
 * so driving 2,800 meshes costs a dozen float writes a frame rather than 2,800
 * material updates. The per-mesh values -- a muscle's own centre and fibre
 * axis -- are computed once at load and never touched again.
 *
 * The colours and the rhythms are a display convention written by this app,
 * not a measurement and not a claim traced to a source file. The legend in the
 * viewer says so.
 * ------------------------------------------------------------------ */

/* On by default. A body that does not move is the thing this exists to fix,
   and with only the skeleton loaded there is nothing with a rule, so it costs
   nothing until a system layer is actually on. */
state.flow = { on:true, uT:{value:0}, uOn:{value:1}, classes:{}, counts:{}, connective:[] };

/* World Y of the top and bottom of the body, so anchors can be fractions. */
function bodySpanY(){
  if(state.bodySpan) return state.bodySpan;
  const THREE=state.THREE; if(!THREE) return null;
  const root=state.fullModel||Object.values(state.extraModels||{})[0]?.pivot;
  if(!root) return null;
  const b=new THREE.Box3().setFromObject(root);
  if(!isFinite(b.min.y)||!isFinite(b.max.y)) return null;
  state.bodySpan={min:b.min.y,max:b.max.y};
  return state.bodySpan;
}
function anchorY(name){
  const span=bodySpanY(); if(!span) return 0;
  return span.min + (FLOW_ANCHORS[name]!==undefined?FLOW_ANCHORS[name]:.75) * (span.max-span.min);
}

/* One uniform object per class. Every mesh of that class shares it, which is
   what makes the whole system one write per frame instead of hundreds. */
function classUniforms(cls){
  if(state.flow.classes[cls]) return state.flow.classes[cls];
  const THREE=state.THREE;
  const spec=FLOW_CLASSES[cls]||FLOW_CLASSES.bone;
  const r=spec.rule||{};
  state.flow.classes[cls]={
    uBeat:{value:1},
    uFlowColor:{value:new THREE.Color(spec.flow)},
    uOrigin:{value:anchorY(r.from||'heart')},
    uWrap:{value:r.wrap==='down'?-1:r.wrap==='up'?1:0},
    uDir:{value:r.dir||1},
    uSpeed:{value:r.speed||0},
    uFreq:{value:r.freq||0},
    uSharp:{value:r.sharp||1},
    uGain:{value:r.gain||0},
    /* Deformation amount and mode are decoupled from the glow (uBeat) so a
       class can deform on its own envelope: lungs ride the breath, muscle the
       squeeze, peristalsis runs steady. */
    uDeform:{value:0},
    uMode:{value:r.mode==='inflate'?2:r.mode==='peristalsis'?3:1},
  };
  return state.flow.classes[cls];
}

/*
 * Patch one material.
 *
 * onBeforeCompile is the only way into the standard material's lighting without
 * reimplementing it, and three does NOT fold the patch into its program cache
 * key -- so customProgramCacheKey has to name the variant, or every class after
 * the first silently reuses the first one's compiled program.
 */
function installFlow(mesh,cls){
  const spec=FLOW_CLASSES[cls]; if(!spec||!mesh.material) return;
  const mat=mesh.material;
  if(mat.color) mat.color.setHex(spec.color);
  if(!spec.rule) return;                    /* coloured, but nothing to animate */
  const uni=classUniforms(cls);
  const rule=spec.rule;
  /* A rule can deform only some meshes of a class -- peristalsis on the gut
     tube but not the liver, ureters but not the kidneys. Meshes that do not
     match are coloured but otherwise static. */
  const deform=!!rule && (rule.contract || rule.mode)
    && (!rule.match || rule.match.test(mesh.userData.label||mesh.name||''));
  let mCenter=null,mAxis=null,mAmt=0;
  if(deform){
    const g=mesh.geometry;
    if(!g.boundingBox) g.computeBoundingBox();
    const bb=g.boundingBox;
    const size=[bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z];
    const longest=size.indexOf(Math.max(...size));
    mCenter=new state.THREE.Vector3((bb.min.x+bb.max.x)/2,(bb.min.y+bb.max.y)/2,(bb.min.z+bb.max.z)/2);
    const mode=rule.mode;
    if(mode==='inflate'){
      /* A lung expands evenly from its own centre; the contract squash would
         read as the lung being squeezed, not breathing. */
      mAxis=new state.THREE.Vector3(0,1,0);
      mAmt=rule.inflate||.05;
    }else if(mode==='peristalsis'){
      /* The tube direction is taken as the mesh's longest axis, and a narrow
         band of constriction travels along it, pinching perpendicular at the
         front. */
      mAxis=new state.THREE.Vector3(longest===0?1:0,longest===1?1:0,longest===2?1:0);
      mAmt=rule.pinch||.18;
    }else{
      mAxis=new state.THREE.Vector3(longest===0?1:0,longest===1?1:0,longest===2?1:0);
      /* A long strap muscle shortens visibly; a short stubby one barely moves in
         life either, so the amount tracks how elongated the mesh actually is --
         unless the rule sets its own squeeze ('contract: 0.14'), as the heart
         chambers do. */
      const ratio=Math.max(...size)/(Math.min(...size)||1e-4);
      mAmt=(typeof rule.contract==='number'&&rule.contract>0)
        ?rule.contract
        :Math.min(.11,.03+.014*Math.min(6,ratio));
    }
  }
  /* The deformed and colour-only meshes of a class compile to different
     programs, so the cache key has to name the variant or the first to compile
     is silently reused for every mesh of the class. */
  mat.customProgramCacheKey=()=>'rssflow:'+cls+(deform?':d':':c');
  mat.onBeforeCompile=(sh)=>{
    sh.uniforms.uT=state.flow.uT;
    sh.uniforms.uOn=state.flow.uOn;
    Object.assign(sh.uniforms,uni);
    if(deform){
      sh.uniforms.uMCenter={value:mCenter};
      sh.uniforms.uMAxis={value:mAxis};
      sh.uniforms.uMAmt={value:mAmt};
    }
    sh.vertexShader='varying float vFlowY;\n'
      +(deform?'uniform float uDeform;uniform vec3 uMCenter;uniform vec3 uMAxis;uniform float uMAmt;uniform float uMode;\nuniform float uT;uniform float uSpeed;uniform float uDir;uniform float uFreq;uniform float uSharp;\n':'')
      +sh.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\n'
        +(deform
          ?'float rssAlong=dot(transformed-uMCenter,uMAxis);\n'
           +'vec3 rssPerp=(transformed-uMCenter)-rssAlong*uMAxis;\n'
           +'if(uMode>2.5){/* peristalsis: a ring of constriction travelling along the tube */\n'
           +'  float rssW=rssAlong*uFreq-uT*uSpeed*uDir*uFreq;\n'
           +'  float rssRip=pow(max(0.,.5+.5*sin(rssW*6.2831853)),uSharp);\n'
           +'  transformed-=rssPerp*rssRip*uMAmt*uDeform;\n'
           +'}else if(uMode>1.5){/* inflate: even expansion away from the centre */\n'
           +'  transformed+=(transformed-uMCenter)*uDeform*uMAmt;\n'
           +'}else{/* contract: shorten along the axis, thicken across it */\n'
           +'  transformed-=uMAxis*rssAlong*uDeform*uMAmt;\n'
           +'  transformed+=rssPerp*uDeform*uMAmt*.55;\n'
           +'}\n'
          :'')
        +'vFlowY=(modelMatrix*vec4(transformed,1.0)).y;');
    sh.fragmentShader='varying float vFlowY;\n'
      +'uniform float uT;uniform float uOn;uniform float uBeat;uniform vec3 uFlowColor;\n'
      +'uniform float uOrigin;uniform float uWrap;uniform float uDir;uniform float uSpeed;\n'
      +'uniform float uFreq;uniform float uSharp;uniform float uGain;\n'
      +sh.fragmentShader.replace('#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\n'
        +'float rssD=vFlowY-uOrigin;\n'
        /* An 'up' or 'down' rule lights only the half of the body it applies
           to: lymph does not drain downward, so nothing below the duct glows. */
        +'float rssSide=uWrap>.5?step(0.,rssD):(uWrap<-.5?step(rssD,0.):1.);\n'
        +'float rssBand=1.;\n'
        +'if(uFreq>0.){float w=abs(rssD)*uFreq-uT*uSpeed*uDir*uFreq;\n'
        +'rssBand=pow(max(0.,.5+.5*sin(w*6.2831853)),uSharp);}\n'
        +'totalEmissiveRadiance+=uFlowColor*rssBand*rssSide*uGain*uBeat*uOn;');
  };
  mat.needsUpdate=true;
}

/* Classify and colour a whole layer as it lands. */
function installLayerFlow(key,meshes){
  const counts={};
  meshes.forEach(o=>{
    const cls=classify(key,o.userData.label||o.name);
    o.userData.flowClass=cls;
    counts[cls]=(counts[cls]||0)+1;
    installFlow(o,cls);
    /* Tendons, bursae and the other connective tissue do not contract, and while
       physiology is on they sit pale and static over the contracting muscles --
       so they are dropped for the animation and restored when it is off. */
    if(cls==='tendon'||cls==='bursa'){ state.flow.connective.push(o); o.visible=!state.flow.on; }
  });
  state.flow.counts[key]=counts;
  /* The span is only knowable once something is in the scene, so anchors set
     against a not-yet-loaded skeleton get corrected here. */
  Object.entries(state.flow.classes).forEach(([cls,u])=>{
    const r=(FLOW_CLASSES[cls]||{}).rule;
    if(r) u.uOrigin.value=anchorY(r.from||'heart');
  });
  return counts;
}

/* Tendons, bursae and the other connective tissue drop out of view while
   physiology is running so the contracting muscles are not occluded, and come
   back when it is turned off. Re-applied from applyLayers too, so a layer
   toggle or a cleared study focus cannot resurrect them mid-animation. */
function applyConnectiveVisibility(){
  /* applyVisibility now calls this on every pass, including the ones that run
     while the scene is still booting -- before state.flow exists. */
  if(!state.flow||!state.flow.connective) return;
  const show=!state.flow.on;
  state.flow.connective.forEach(m=>{ m.visible=show; });
}
function setPhysiology(on){
  state.flow.on=!!on;
  state.flow.uOn.value=on?1:0;
  /* stepPhysiology only writes these while live is on, so turning it off mid-
     cycle would leave uDeform frozen at the last value -- a muscle stuck at
     full bulge or a lung held half-swollen under the restored structures. Zero
     them so every mesh returns to its rest shape. */
  if(!on){
    state.flow.uT.value=0;
    Object.values(state.flow.classes).forEach(u=>{ if(u.uDeform) u.uDeform.value=0; });
  }
  applyConnectiveVisibility();
  return state.flow.on;
}

/* Called every frame. A dozen float writes drive every mesh in the body. */
function stepPhysiology(t){
  if(!state.flow.on) return;
  state.flow.uT.value=t;
  const beat=cardiacEnvelope(t),spike=spikeEnvelope(t),breath=breathEnvelope(t),squeeze=contractEnvelope(t),atrial=atriumEnvelope(t),ventricular=ventricleEnvelope(t);
  Object.entries(state.flow.classes).forEach(([cls,u])=>{
    const r=(FLOW_CLASSES[cls]||{}).rule; if(!r) return;
    u.uBeat.value=r.beat==='cardiac'?.25+.75*beat
      :r.beat==='spike'?.1+.9*spike
      :r.beat==='breath'?.3+.7*breath
      :r.beat==='contract'?.2+.8*squeeze
      :1;
    /* The deformation amount is its own envelope per class: lungs ride the
       breath, muscle the squeeze, peristalsis runs steady at full strength,
       the arteries swell with the pulse, and the two chamber types contract
       at their own moment of the cardiac cycle. */
    u.uDeform.value=r.deform==='breath'?breath
      :r.deform==='contract'?squeeze
      :r.deform==='cardiac'?beat
      :r.deform==='atrial'?atrial
      :r.deform==='ventricular'?ventricular
      :r.deform==='steady'?1 : 0;
  });
}
/* Named structures per layer, from the index -- the same collapsing the chips
   and the search use, so all three agree. Meshes are geometry; this is anatomy. */
const LAYER_NAMED=MESH_INDEX.reduce((a,m)=>{a[m.layer]=(a[m.layer]||0)+1;return a},{});
/* and, of those, how many the course material actually names */
const LAYER_COURSE=MESH_INDEX.reduce((a,m)=>{if(m.tier===0)a[m.layer]=(a[m.layer]||0)+1;return a},{});
/* and how many separate things a tap can select: every course-named structure
   plus one per group of the rest. The three numbers only agree because they
   all come out of the same index -- see UNITS in mesh-index.js. */
const LAYER_UNITS=UNITS.reduce((a,u)=>{a[u.layer]=(a[u.layer]||0)+1;return a},{});
function updateStageMeta(){
  const on=Object.keys(state.layers).filter(k=>state.layers[k]);
  if(!on.length){els.stageMeta.textContent='No layer shown — turn one on to study it';return}
  const named=on.reduce((t,k)=>t+(LAYER_NAMED[k]||0),0);
  const course=on.reduce((t,k)=>t+(LAYER_COURSE[k]||0),0);
  const units=on.reduce((t,k)=>t+(LAYER_UNITS[k]||0),0);
  /* The second number is the one that answers "which of these do I have to
     remember?" -- see the Sources & model dialog. */
  const base=on.length===1&&on[0]==='skeleton'
    ?`Precise Z-Anatomy / BodyParts3D skeleton · ${LAYER_NAMED.skeleton} structures, ${LAYER_COURSE.skeleton} named by your course, ${LAYER_UNITS.skeleton} you can select`
    :`${on.map(k=>LAYER_NAMES[k]||k).join(' + ')} · ${named} structures, ${course} named by your course, ${units} you can select · tap one`;
  /* Say what the region filter did, or it looks like nothing happened. */
  if(state.region&&state.region!=='all'){
    const bones=state.fullMeshes.filter(m=>m.visible).length;
    const soft=Object.entries(state.extraModels||{})
      .filter(([k])=>state.layers[k]).reduce((t,[,m])=>t+m.meshes.filter(o=>o.visible).length,0);
    els.stageMeta.textContent=`${regionLabel(state.region)} only · ${bones} bone mesh${bones===1?'':'es'}`
      +(soft?` + ${soft} soft-tissue mesh${soft===1?'':'es'} inside its measured box`:'');
    return;
  }
  els.stageMeta.textContent=base;
}
/*
 * Layers composite. They are not alternatives to each other: the whole point
 * of a shared body frame is that muscle over bone is the real spatial
 * relationship, so any combination can be on at once.
 */
function applyLayers(){
  Object.entries(state.extraModels).forEach(([k,m])=>{
    m.root.visible=!!state.layers[k];
    const op=state.layerOpacity?.[k];
    if(op!==undefined)m.meshes.forEach(o=>{
      if(!o.material)return;
      const t=op<.99;
      if(o.material.transparent!==t)o.material.needsUpdate=true;
      o.material.transparent=t;o.material.opacity=op;o.material.depthWrite=!t;
    });
  });
  /* The skeleton ghosts too -- seeing vessels against translucent bone is the
     whole reason to put two layers on at once. */
  const so=state.layerOpacity?.skeleton;
  if(so!==undefined)[...state.fullMeshes,...state.meshes].forEach(o=>{
    if(!o.material)return;
    const t=so<.99;
    /* three.js compiles transparency into the shader program, so flipping the
       flag without needsUpdate leaves the mesh stubbornly opaque. */
    if(o.material.transparent!==t)o.material.needsUpdate=true;
    o.material.transparent=t;o.material.opacity=so;o.material.depthWrite=!t;
  });
  state.activeExtra=Object.keys(state.extraModels).filter(k=>state.layers[k]).pop()||null;
  applyVisibility();
  applyConnectiveVisibility();
  if(typeof enforceHidden==='function')enforceHidden();
  updateStageMeta();
}
/*
 * Study focus.
 *
 * A lesson does not want the whole body -- it wants the four carpal rows, or
 * the heart valves, framed and named. focusStructures resolves names against a
 * layer, hides that layer's other meshes, ghosts the skeleton behind them for
 * context, and frames the camera on what is left.
 *
 * Names resolve exactly or with the glued side letter. Prefix a name with '~'
 * to match on containment instead -- "~vertebra" is how you ask for all 24 of
 * them without listing every one.
 */
state.focus=null;
function normName(v){return String(v||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim()}
function layerPool(key){return key==='skeleton'?state.fullMeshes:(state.extraModels[key]?.meshes||[])}
function resolveMeshNames(key,names){
  const pool=layerPool(key);
  const out=new Set();
  (names||[]).forEach(n=>{
    const loose=String(n).startsWith('~');
    const w=normName(loose?String(n).slice(1):n);
    if(!w)return;
    pool.forEach(o=>{
      const l=normName(o.userData.label||o.name);
      if(loose?l.includes(w):(l===w||l===w+'l'||l===w+'r'))out.add(o);
    });
  });
  return [...out];
}
function clearStudyFocus(){
  if(!state.focus)return;
  const {key}=state.focus;
  layerPool(key).forEach(o=>{o.visible=true;if(o.material)o.material.emissive?.setHex(0x000000)});
  state.focus=null;
  applyLayers();
}
async function focusStructures(spec){
  if(!state.scene)return {ok:false,reason:'not-booted',found:0};
  const key=spec.layer||'skeleton';
  if(key!=='skeleton'){
    if(!state.extraModels[key]){
      if(!spec.file)return {ok:false,reason:'no-file',found:0};
      await loadExtraModel(key,spec.file);
    }
  }
  clearStudyFocus();
  const hits=resolveMeshNames(key,spec.meshes);
  /* An unresolvable name must not silently show the whole body as if it were
     the answer -- the caller shows a still diagram instead. */
  if(!hits.length)return {ok:false,reason:'no-match',found:0};
  Object.keys(state.layers).forEach(k=>{state.layers[k]=false});
  state.layers[key]=true;
  state.layerOpacity={...(state.layerOpacity||{}),[key]:1};
  if(spec.ghostBody&&key!=='skeleton'){state.layers.skeleton=true;state.layerOpacity.skeleton=.16}
  applyLayers();
  if(spec.isolate!==false){
    const keep=new Set(hits);
    layerPool(key).forEach(o=>{o.visible=keep.has(o)});
  }
  if(typeof enforceHidden==='function')enforceHidden();
  const THREE=state.THREE;
  hits.forEach(o=>{if(o.material)o.material.emissive?.setHex(0x14574f)});
  if(THREE&&state.camera&&state.controls){
    const box=new THREE.Box3();
    hits.forEach(o=>box.expandByObject(o));
    const c=box.getCenter(new THREE.Vector3());
    const size=box.getSize(new THREE.Vector3());
    const radius=Math.max(size.x,size.y,size.z,.4);
    const dir=state.camera.position.clone().sub(state.controls.target).normalize();
    const dist=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*2.6));
    state.controls.target.copy(c);
    state.camera.position.copy(c).add(dir.multiplyScalar(dist));
    state.controls.update();
  }
  state.focus={key,count:hits.length};
  els.stageMeta.textContent=`${spec.label||LAYER_NAMES[key]||key} · ${hits.length} named mesh${hits.length===1?'':'es'} · tap to name them`;
  return {ok:true,found:hits.length};
}

/*
 * Projection view.
 *
 * A radiograph is an accumulation of attenuation along a ray, so the honest
 * cheap analogue is additive blending with depth-write off: every surface the
 * ray crosses adds a little brightness, and thick or overlapping bone comes out
 * bright while soft tissue is a haze. Bone carries roughly ten times the weight
 * of muscle here, which is the right order for the effect, not a dose figure.
 *
 * The camera is a very narrow field of view pulled a long way back, which is a
 * near-parallel projection. That is also this view's honest limit: a parallel
 * projection CANNOT distinguish PA from AP. The difference between them is beam
 * direction, object-to-detector distance and the resulting magnification -- none
 * of which geometry alone reproduces. The pane says so.
 */
state.xray=null;

/*
 * Projection view.
 *
 * The first version accumulated surfaces: every polygon the ray crossed added a
 * fixed amount of brightness. That is wrong in a way worth spelling out. These
 * meshes are hollow shells, so a femur contributed the same two crossings as a
 * sheet of bone one millimetre thick, and everything came out looking like
 * outlines rather than solid bone.
 *
 * This version measures the path length THROUGH material and applies
 * Beer-Lambert. Each fragment writes its own distance from the camera, signed
 * by facing: back faces add, front faces subtract. Summed over a ray with
 * additive blending, sum(exits) - sum(entries) is exactly the distance spent
 * inside solid material, and it stays correct for any number of separate
 * objects stacked along the ray. Scaled by a per-tissue attenuation
 * coefficient, that sum is optical depth, and the film reads 1 - exp(-tau).
 *
 * So bone is bright because the ray spent longer in bone, not because it
 * crossed more polygons. Cortex and marrow still do not differ -- the source
 * meshes are surfaces with nothing inside them -- and the pane says so.
 *
 * mu values below are relative, chosen so bone/soft-tissue contrast lands in
 * the familiar range. They are not tabulated linear attenuation coefficients
 * and no dose or kVp is implied.
 */
const XRAY_MU={skeleton:1.0,joint:.30,organs:.16,muscle:.10,circulatory:.13,nervous:.10,lymphatic:.12};

const XRAY_VERT=`
varying float vDist;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const XRAY_FRAG=`
uniform float uMu;
varying float vDist;
void main(){
  /* Back faces are where the ray leaves material, front faces where it enters. */
  float sgn = gl_FrontFacing ? -1.0 : 1.0;
  gl_FragColor = vec4(sgn * vDist * uMu, 0.0, 0.0, 1.0);
}`;
const XRAY_POST_FRAG=`
uniform sampler2D tTau;
uniform float uGain, uLatitude, uGrain, uSeed, uFlipX;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  /* Shells that are not quite closed can integrate slightly negative. */
  vec2 uv = vec2(uFlipX > 0.5 ? 1.0 - vUv.x : vUv.x, vUv.y);
  float tau = max(0.0, texture2D(tTau, uv).r) * uGain;
  float transmitted = exp(-tau);
  float density = 1.0 - transmitted;
  /* Film latitude: the toe and shoulder of the characteristic curve. */
  density = pow(density, uLatitude);
  /* Quantum mottle. Noise rises where fewer photons arrive, as it does on film. */
  float n = hash(uv * 1024.0 + uSeed) - 0.5;
  density += n * uGrain * (0.35 + 0.65 * density);
  gl_FragColor = vec4(vec3(clamp(density, 0.0, 1.0)), 1.0);
}`;

function xrayDepthMaterial(THREE,mu){
  return new THREE.ShaderMaterial({
    uniforms:{uMu:{value:mu}},
    vertexShader:XRAY_VERT, fragmentShader:XRAY_FRAG,
    side:THREE.DoubleSide, depthTest:false, depthWrite:false,
    blending:THREE.CustomBlending, blendEquation:THREE.AddEquation,
    blendSrc:THREE.OneFactor, blendDst:THREE.OneFactor,
  });
}

function enterXray(){
  /* A peel in progress would be captured as the 'original' opacity by the
     material swap below and come back at 6% when the projection exits. */
  if(typeof restorePeel==='function')restorePeel();
  if(state.xray||!state.scene)return false;
  const THREE=state.THREE;
  const c=state.camera, ctr=state.controls;
  const size=new THREE.Vector2();
  state.renderer.getSize(size);
  const rt=new THREE.WebGLRenderTarget(Math.max(2,size.x),Math.max(2,size.y),{
    type:THREE.FloatType, format:THREE.RedFormat,
    minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter, depthBuffer:false,
  });
  const post=new THREE.Scene();
  const postCam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const postMat=new THREE.ShaderMaterial({
    uniforms:{tTau:{value:rt.texture},uGain:{value:1.6},uLatitude:{value:.78},uGrain:{value:.05},uSeed:{value:0},uFlipX:{value:0}},
    vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }',
    fragmentShader:XRAY_POST_FRAG, depthTest:false, depthWrite:false,
  });
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),postMat));

  state.xray={
    mats:new Map(), shared:new Map(), rt, post, postCam, postMat,
    bg:state.scene.background, fog:state.scene.fog,
    fov:c.fov, near:c.near, far:c.far,
    minD:ctr.minDistance, maxD:ctr.maxDistance,
    pos:c.position.clone(), target:ctr.target.clone(),
    layers:{...state.layers}, layerOpacity:{...(state.layerOpacity||{})},
    motion:state.motionEnabled, autoClear:state.renderer.autoClear,
    concepts:state.conceptGroup?state.conceptGroup.visible:true,
    exposure:1.6, view:'pa', region:'chest',
  };
  /*
   * The projection is a skeleton film.
   *
   * It used to pass the beam through whatever the 3D tab happened to have
   * loaded, which made the exposure a function of what had been browsed earlier
   * in the session rather than of the controls: the same Chest / PA button read
   * at mean 15.6 before the muscle layer had ever been opened and at 43.1 after,
   * with a fifth of the pane blown out. Six soft-tissue layers at 0.10-0.30
   * against bone at 1.00 also do not add up to a radiograph -- they add up to a
   * fog with a skeleton somewhere in it. So the beam sees bone, always, and only.
   * Whatever is on in the 3D tab is restored on the way out.
   */
  state.layers.skeleton=true;
  Object.keys(state.extraModels||{}).forEach((k)=>{state.layers[k]=false});
  /*
   * Cavities, regions and planes are teaching overlays drawn ON the anatomy.
   * A radiograph has nothing painted on it, and an additive beam would render
   * them as bright fog anyway, so they are hidden here rather than composited.
   */
  if(state.conceptGroup)state.conceptGroup.visible=false;
  if(state.pickGroup)state.pickGroup.visible=false;
  const shared=(key)=>{
    if(!state.xray.shared.has(key))state.xray.shared.set(key,xrayDepthMaterial(THREE,XRAY_MU[key]||.12));
    return state.xray.shared.get(key);
  };
  const apply=(mesh,key)=>{state.xray.mats.set(mesh,mesh.material);mesh.material=shared(key);mesh.userData.xrayKey=key};
  state.fullMeshes.forEach(m=>apply(m,'skeleton'));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>l.meshes.forEach(m=>apply(m,k)));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>{l.root.visible=!!state.layers[k]});
  state.scene.background=null;
  state.scene.fog=null;
  /* A yaw would smear a projection that is meant to be read square on. */
  state.motionEnabled=false;
  [state.fullModel,state.realModel,...Object.values(state.extraModels||{}).map(m=>m.pivot)]
    .forEach(r=>{if(r)r.rotation.y=0});
  ctr.minDistance=.5; ctr.maxDistance=900;
  setXrayRegion('chest');
  return true;
}

/*
 * Collimation.
 *
 * A whole-body film is not a thing anyone is handed, so the view offers regions
 * that are. Every centre and field size below was measured off the loaded
 * skeleton rather than guessed -- ribs centre at y 3.74 and stand 2.71 tall,
 * the hip bones centre at y 1.33, a hand centres near x 2.1, y 0.47.
 *
 * The model is 11.8 units for a 1.7 m body, so one metre is about 6.94 units.
 * Source-to-image distances are set in real terms and converted: 180 cm for a
 * chest, 100 cm for the rest. The beam diverges from that point, which is what
 * makes PA and AP genuinely different here rather than a label -- whatever lies
 * further from the detector is magnified more.
 */
const XRAY_UNITS_PER_M=6.94;
const XRAY_REGIONS={
  chest: {label:'Chest',      c:[0,3.80,0], half:1.95, sid:1.80},
  abdo:  {label:'Abdomen',    c:[0,2.30,0], half:1.95, sid:1.00},
  pelvis:{label:'Pelvis',     c:[0,1.33,0], half:1.15, sid:1.00},
  hand:  {label:'Hand',       c:[2.10,0.47,0], half:0.78, sid:1.00},
  body:  {label:'Whole body', c:[0,1.00,0], half:6.10, sid:4.00},
};
function setXrayRegion(key){
  if(!state.xray)return;
  state.xray.region=key;
  applyXrayCamera();
}
function setXrayView(view){
  if(!state.xray)return;
  state.xray.view=view;
  applyXrayCamera();
}
function applyXrayCamera(){
  const x=state.xray; if(!x)return;
  const THREE=state.THREE, c=state.camera, ctr=state.controls;
  const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
  const dist=R.sid*XRAY_UNITS_PER_M;
  c.fov=2*Math.atan(R.half/dist)*180/Math.PI;
  c.updateProjectionMatrix();
  xrayClip();
  ctr.target.set(R.c[0],R.c[1],R.c[2]);
  /*
   * +z is anterior on this model -- the face looks that way. PA puts the source
   * behind the patient, AP in front.
   */
  const dir=x.view==='lat'?new THREE.Vector3(1,0,0)
    :new THREE.Vector3(0,0,x.view==='ap'?1:-1);
  c.position.copy(ctr.target).add(dir.multiplyScalar(dist));
  c.up.set(0,1,0);
  ctr.update();
  /*
   * Both a PA and an AP film are read as though you were facing the patient,
   * their right on your left. Viewed from behind, PA comes out mirrored, so the
   * image is flipped to match how it would actually be hung.
   */
  x.postMat.uniforms.uFlipX.value=x.view==='pa'?1:0;
  x.shownSid=null; x.shownOff=null;
}
/*
 * The clip planes have to follow the dolly. Pinning them to the distance the
 * region was set up at meant zooming out pushed the body past the far plane and
 * the whole pane went black. Depth precision is irrelevant here -- the depth
 * test is off -- so the span can be generous enough to always contain the body.
 */
function xrayOffAxis(){
  const x=state.xray; if(!x)return 0;
  const THREE=state.THREE, c=state.camera, ctr=state.controls;
  const nominal=x.view==='lat'?new THREE.Vector3(1,0,0)
    :new THREE.Vector3(0,0,x.view==='ap'?1:-1);
  const actual=c.position.clone().sub(ctr.target).normalize();
  return Math.acos(Math.max(-1,Math.min(1,actual.dot(nominal))))*180/Math.PI;
}
function xrayClip(){
  const c=state.camera, ctr=state.controls;
  const d=c.position.distanceTo(ctr.target);
  const span=40;
  const near=Math.max(.05,d-span), far=d+span;
  if(c.near!==near||c.far!==far){c.near=near;c.far=far;c.updateProjectionMatrix()}
  return d;
}
function setXrayExposure(v){
  if(!state.xray)return;
  state.xray.exposure=v;
  state.xray.postMat.uniforms.uGain.value=v;
}
function renderXray(){
  const x=state.xray; if(!x)return false;
  const r=state.renderer;
  const d=xrayClip();
  /* Dollying really is changing the source-to-image distance, so say so. */
  const sid=Math.round(d/XRAY_UNITS_PER_M*100);
  /*
   * Orbit away from the nominal axis and this stops being the projection its
   * button claims. Saying "AP" over an oblique is exactly the kind of quiet
   * wrongness this view is supposed to avoid, so the label degrades to oblique
   * with the angle off axis.
   */
  const off=Math.round(xrayOffAxis());
  if(sid!==x.shownSid||off!==x.shownOff){
    x.shownSid=sid; x.shownOff=off;
    const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
    const names={pa:'PA',ap:'AP',lat:'Lateral'};
    const proj=off>4?`oblique · ${off}° off ${names[x.view]||x.view}`:(names[x.view]||x.view);
    els.stageMeta.textContent=`${R.label} · ${proj} · SID ${sid} cm · simulated · tap to name`;
  }
  x.postMat.uniforms.uSeed.value=(performance.now()*.06)%1000;
  r.autoClear=true;
  r.setRenderTarget(x.rt);
  r.setClearColor(0x000000,1);
  r.clear(true,false,false);
  r.render(state.scene,state.camera);
  r.setRenderTarget(null);
  r.render(x.post,x.postCam);
  return true;
}
function exitXray(){
  const x=state.xray; if(!x)return;
  const c=state.camera, ctr=state.controls;
  x.mats.forEach((orig,mesh)=>{mesh.material=orig;delete mesh.userData.xrayKey});
  x.shared.forEach(m=>m.dispose());
  x.postMat.dispose(); x.rt.dispose();
  state.scene.background=x.bg; state.scene.fog=x.fog;
  c.fov=x.fov;c.near=x.near;c.far=x.far;c.updateProjectionMatrix();
  ctr.minDistance=x.minD;ctr.maxDistance=x.maxD;
  c.position.copy(x.pos);ctr.target.copy(x.target);ctr.update();
  state.layers=x.layers;state.layerOpacity=x.layerOpacity;
  state.motionEnabled=x.motion;
  if(state.conceptGroup)state.conceptGroup.visible=x.concepts;
  if(state.pickGroup)state.pickGroup.visible=true;
  state.renderer.autoClear=x.autoClear;
  state.renderer.setRenderTarget(null);
  state.xray=null;
  applyLayers();
}
function setLayer(key,on){
  /* Meshes carried by a movement live under the pivot group, not their layer
     root, so a toggle mid-movement could not hide them. End it first. */
  if(state.movement)endMovement();
  state.layers[key]=!!on;
  applyLayers();
}
function setExtraVisible(key){
  /* Exclusive mode, kept for the structure-set flow: show one system alone. */
  Object.keys(state.extraModels).forEach(k=>{state.layers[k]=(k===key)});
  state.layers.skeleton=!key;
  applyLayers();
}
/*
 * Sub-parts are not separately selectable.
 *
 * The model breaks structures down further than the course does -- the deltoid
 * is three "parts", the trapezius three, the left lung's bronchial tree eleven
 * segmental branches. Tapping one of those selected that fragment alone and
 * named it "Acromial part of deltoid muscle", which is not a thing anyone is
 * asked to identify and left the rest of the muscle dark.
 *
 * mesh-index.js already marks those rows tier 1 and gives each a family. Here
 * that grouping decides what a TAP selects: the whole unit lights together
 * and is named as the unit. Left and right stay separate -- the L2 drill is
 * exactly about telling them apart -- so sides are never merged.
 */
const tightKey=(v)=>normName(v).replace(/[^a-z0-9]/g,'');
let _unitMap=null;
/* layer -> Map(tight mesh name -> its index row, which carries its unit). */
function unitMap(){
  if(_unitMap) return _unitMap;
  _unitMap=new Map();
  MESH_INDEX.forEach((r)=>{
    if(!_unitMap.has(r.layer)) _unitMap.set(r.layer,new Map());
    _unitMap.get(r.layer).set(tightKey(r.name),r);
  });
  return _unitMap;
}
/*
 * What the panel says about a structure the course does not name.
 *
 * It has to answer the question the student actually has -- "why is this one
 * thing called something else, and do I have to learn it?" -- rather than
 * repeat the atlas's own confidence about every mesh equally.
 */
function unitBlurb(unit,key){
  const layer=(LAYER_NAMES[key]||key).toLowerCase();
  if(!unit) return `Named structure in the ${layer} layer of the BodyParts3D atlas.`;
  if(unit.unitKind==='group')
    return `Your course material names none of these one by one, so the ${unit.unitSize} of them are selected together under a name it does use. The atlas calls this one "${unit.name}".`;
  if(unit.unitKind==='lone')
    return `Modelled in the ${layer} layer and named in none of your course material. Nothing of its kind is near enough to group it with, so it stays on its own.`;
  return `Named structure in the ${layer} layer of the BodyParts3D atlas.`;
}
/* The study unit a raw GLB name belongs to, or null if the index has no such
   name (unnamed geometry, and the handful of modelling artefacts). */
function unitFor(layerKey,raw){
  const fm=unitMap().get(layerKey);
  if(!fm) return null;
  const k=tightKey(raw);
  return fm.get(k)||(/[lr]$/.test(k)?fm.get(k.slice(0,-1)):null)||null;
}

function highlightExtra(mesh){
  const m=state.extraModels[state.activeExtra];
  if(!m)return;
  m.meshes.forEach(o=>{o.material.emissive?.setHex(0x000000)});
  /* Sub-parts share one canonicalId (see loadExtraModel), so the thing that
     was tapped is every mesh carrying that id, not the one triangle hit. */
  const kin=m.meshes.filter(o=>o.userData.canonicalId===mesh.userData.canonicalId);
  const lit=kin.length?kin:[mesh];
  lit.forEach(o=>o.material.emissive?.setHex(0x1c6f66));
  if(state.camera&&state.controls&&state.THREE){
    const box=new state.THREE.Box3();
    lit.forEach(o=>box.expandByObject(o));
    const c=box.getCenter(new state.THREE.Vector3());
    state.controls.target.copy(c);
    state.controls.update();
  }
  /* Mesh names arrive normalised — "Kidneyl" — so restore a readable label. */
  const raw=String(mesh.userData.label||mesh.name||'');
  let side='';
  let clean=raw.replace(/_/g,' ').trim();
  /*
   * Any non-space char may precede the glued side letter — "Vagus nerve (X)r"
   * ends in ')r'. The partner check below is what makes this safe: we only
   * strip when the opposite-side twin actually exists, so Femur and Vomer,
   * which genuinely end in r, are left alone.
   */
  const m2=clean.match(/^(.*\S)(l|r)$/i);
  if(m2){
    const stem=m2[1].trim();
    const partner=state.extraModels[state.activeExtra]?.meshes.some(o=>{
      const n=String(o.userData.label||o.name||'').replace(/_/g,' ').trim();
      return n.toLowerCase()===(stem+(m2[2].toLowerCase()==='l'?'r':'l')).toLowerCase();
    });
    if(partner){clean=stem;side=m2[2].toLowerCase()==='l'?'Left':'Right'}
  }
  els.selectedName.textContent=clean;
  els.selectedChips.innerHTML=side?`<span class="chip">${side}</span>`:'';
  showPickCallout(lit,side?`${clean}\n${side}`:clean);
}
/*
 * Joint movement player.
 *
 * The skeleton has no skin and no animation track, so movement is driven by
 * rigid-body rotation: the moving meshes are reparented into a pivot group
 * whose origin sits on the joint axis, and that group is rotated. A bone
 * really is a rigid body rotating about a joint axis, so this is the honest
 * representation rather than a shortcut.
 *
 * Pivot and axis are resolved from the bounding boxes of named meshes at
 * runtime, never hard-coded, because the model is rescaled and recentred on
 * import — any baked-in coordinate would silently drift.
 */
state.movement=null;
function meshesNamed(names,side){
  const norm=s=>String(s||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim();
  const want=names.map(norm);
  const suffix=side==='left'?'l':side==='right'?'r':null;
  return state.fullMeshes.filter(mesh=>{
    const n=norm(mesh.userData?.label||mesh.name);
    return want.some(w=> n===w || (suffix && n===w+suffix) || (!suffix && (n===w+'l'||n===w+'r')) );
  });
}
function endPoint(THREE,names,side,at){
  const ms=meshesNamed(names,side);
  if(!ms.length)return null;
  const box=new THREE.Box3();
  ms.forEach(m=>box.expandByObject(m));
  const c=box.getCenter(new THREE.Vector3());
  /* 'proximal' is the higher end for a limb hanging at the side. */
  if(at==='proximal')c.y=box.max.y;
  else if(at==='distal')c.y=box.min.y;
  return c;
}

/*
 * Soft tissue and a moving joint.
 *
 * A bone genuinely is a rigid body rotating about a joint axis, which is why
 * this player rotates bone meshes directly. Soft tissue splits in two:
 *
 *   distal to the joint  — the hand's vessels, nerves and intrinsic muscles
 *     travel with the forearm as one piece. Rotating them rigidly is right,
 *     so they are attached to the pivot group along with the bones.
 *
 *   crossing the joint   — biceps, the forearm flexors, anything anchored on a
 *     bone that is being held still. These shorten and bulge; they do not
 *     swing. Rotating them would tear them off their origin and quietly teach
 *     something false, so they are ghosted and held, and the panel says so.
 *
 * Classification is by bounding box against the movement's own fixed and
 * moving bone sets, so it follows the data rather than a hard-coded list.
 */
function worldBox(THREE,mesh){
  if(!mesh.geometry)return null;
  if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
  if(!mesh.geometry.boundingBox)return null;
  mesh.updateMatrixWorld();
  return mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
}
function unionBox(THREE,meshes){
  const box=new THREE.Box3();
  let any=false;
  meshes.forEach(m=>{const b=worldBox(THREE,m);if(b){box.union(b);any=true}});
  return any?box:null;
}
function classifySoftTissue(THREE,movingBones,fixedBones){
  const carried=[],held=[];
  const movingBox=unionBox(THREE,movingBones);
  const fixedBox=unionBox(THREE,fixedBones);
  if(!movingBox)return {carried,held};
  /* Err towards holding: a little margin round the fixed bones means anything
     that merely grazes an origin is held rather than rotated. */
  if(fixedBox){
    const pad=fixedBox.getSize(new THREE.Vector3()).multiplyScalar(.03);
    fixedBox.expandByVector(pad);
  }
  Object.entries(state.extraModels||{}).forEach(([key,layer])=>{
    if(!state.layers[key])return;
    layer.meshes.forEach(mesh=>{
      const b=worldBox(THREE,mesh);
      if(!b||!b.intersectsBox(movingBox))return;
      if(fixedBox&&b.intersectsBox(fixedBox))held.push(mesh);
      else carried.push(mesh);
    });
  });
  return {carried,held};
}
function startMovement(mv){
  const THREE=state.THREE;
  if(!THREE||!state.fullModel){showToast('Open the 3D model first.');return false}
  endMovement();
  const moving=meshesNamed(mv.moves,mv.side);
  if(!moving.length){showToast('Those bones are not in the loaded model.');return false}
  const pivot=endPoint(THREE,[mv.pivot.mesh],mv.side,mv.pivot.at);
  if(!pivot)return false;
  let axis;
  if(mv.axis.vector)axis=new THREE.Vector3(...mv.axis.vector).normalize();
  else{
    const a=endPoint(THREE,[mv.axis.from.mesh],mv.side,mv.axis.from.at);
    const b=endPoint(THREE,[mv.axis.to.mesh],mv.side,mv.axis.to.at);
    if(!a||!b)return false;
    axis=b.clone().sub(a).normalize();
  }
  const group=new THREE.Group();
  group.position.copy(pivot);
  state.fullModel.add(group);
  const {carried,held}=classifySoftTissue(THREE,moving,meshesNamed(mv.fixed,mv.side));
  /* Reparent while preserving world transform, so nothing jumps on attach. */
  const travelling=[...moving,...carried];
  const restore=travelling.map(mesh=>({mesh,parent:mesh.parent}));
  travelling.forEach(mesh=>group.attach(mesh));
  const ghosted=held.map(mesh=>({mesh,opacity:mesh.material?mesh.material.opacity:1,
    transparent:mesh.material?mesh.material.transparent:false}));
  ghosted.forEach(({mesh})=>{
    if(!mesh.material)return;
    if(!mesh.material.transparent)mesh.material.needsUpdate=true;
    mesh.material.transparent=true;mesh.material.opacity=.1;mesh.material.depthWrite=false;
  });
  const note=document.getElementById('mvBarNote');
  if(note){
    if(held.length){
      note.textContent=`${carried.length} soft-tissue structures travel with the bone. `
        +`${held.length} cross the joint and are ghosted and held still — muscle and vessel deform across a joint `
        +`rather than rotating rigidly, so swinging them would tear them off their origin.`;
      note.classList.remove('hidden');
    } else if(carried.length){
      note.textContent=`${carried.length} soft-tissue structures travel with the bone.`;
      note.classList.remove('hidden');
    } else note.classList.add('hidden');
  }
  state.movement={mv,group,axis,restore,ghosted,angle:0,playing:false,dir:1};
  setMovementAngle(mv.range[0]);
  return true;
}
function setMovementAngle(deg){
  const m=state.movement; if(!m)return;
  const lo=m.mv.range[0], hi=m.mv.range[1];
  m.angle=Math.max(lo,Math.min(hi,deg));
  m.group.setRotationFromAxisAngle(m.axis, m.angle*Math.PI/180);
  const el=document.getElementById('mvBarReadout');
  if(el){
    const stage=(m.mv.stages||[]).filter(s=>m.angle>=s.at).pop();
    el.textContent=`${Math.round(m.angle)}°`+(stage?` — ${stage.note}`:'');
  }
  const sl=document.getElementById('mvBarSlider');
  if(sl&&Math.round(+sl.value)!==Math.round(m.angle))sl.value=String(Math.round(m.angle));
}
function endMovement(){
  const m=state.movement; if(!m)return;
  m.restore.forEach(({mesh,parent})=>parent&&parent.attach(mesh));
  (m.ghosted||[]).forEach(({mesh,opacity,transparent})=>{
    if(!mesh.material)return;
    if(mesh.material.transparent!==transparent)mesh.material.needsUpdate=true;
    mesh.material.transparent=transparent;mesh.material.opacity=opacity;mesh.material.depthWrite=!transparent;
  });
  m.group.parent&&m.group.parent.remove(m.group);
  state.movement=null;
  const note=document.getElementById('mvBarNote');
  if(note)note.classList.add('hidden');
}
  if(false&&!sessionStorage.getItem('osteology-memory-tip-shown')){const tips=Object.values(MEMORY_TIPS);if(tips.length){showToast(`💡 ${tips[Math.floor(Math.random()*tips.length)].tip}`);sessionStorage.setItem('osteology-memory-tip-shown','1')}}
  window.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&state.selectedId&&!document.getElementById('viewerView').classList.contains('hidden')&&!document.querySelector('dialog[open]'))clearSelection()});
  function restoreFromHash(){if(!location.hash)return;const m=location.hash.match(/^#detail\/([\w:-]+)/);if(!m||m[1]===state.lastDetailId)return;state.hashTries=(state.hashTries||0)+1;const record=getRecord(m[1]);if(!record){if(!state.fullMeshes.length&&!state.meshes.length&&state.hashTries<20)setTimeout(restoreFromHash,250);return}selectBone(record.id);openDetail(record)}
  window.addEventListener('hashchange',restoreFromHash);setTimeout(restoreFromHash,250);
  const activeModelCopy=document.querySelector('#aboutDialog .about p');
  if(activeModelCopy)activeModelCopy.innerHTML='<strong>Active model:</strong> a precise Z-Anatomy / BodyParts3D full skeleton, plus six further BodyParts3D layers — muscles, ligaments, organs, vessels, nerves and lymphatic — in the same registered body frame. The seven layers hold 4,474 named nodes, which collapse to <strong>1,686 named structures</strong>: the counts shown on the layer chips are structures, not meshes, because the same thing is exported once per side, again per duplicate, and again per sub-part. Tapping a sub-part selects the whole structure it belongs to. Each chip carries two numbers &mdash; <strong>612 of those 1,686 structures are named somewhere in your own HSS2011 / ABCT2326 material</strong>, and those are the names worth learning. Which file names each one is read off the taught and assessed documents by <code>work/build-course-terms.mjs</code>, not decided here; the set textbook is deliberately excluded, because a reference that names every structure in the body is no evidence that a name is examinable. The rest are still modelled, still searchable and still tappable &mdash; the search groups them rather than listing them beside the ones you are asked to know. Five separate per-bone upper-limb GLBs are still loaded as the anchor that positions the landmark hotspots, but they are no longer drawn: the full skeleton already names those five bones. The procedural scene is only a last-resort fallback.';
