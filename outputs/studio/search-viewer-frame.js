/*
 * Search -> viewer: frame the part, then hide only what stands in front
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, els, state } from './imports.js';
import { applyLayers, clearStudyFocus, normName } from './live-physiology.js';
import { applyVisibility, getRecord } from './region-boxes-how.js';
import { clean, clearHighlight, courseChipHTML, pool, renderRegions, selectBone, showToast } from './visualisation-modes.js';
import { enforceHidden, hiddenName, publishHidden } from './hide-and-search.js';
import { loadExtraModel, pick } from './depth-picking.js';
import { showPickCallout } from './spatial-concept-overlays.js';

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
export function meshesFor(layer,name){
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
export async function revealStructure(spec){
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
