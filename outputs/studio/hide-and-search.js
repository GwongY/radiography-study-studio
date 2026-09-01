/*
 * Hide, and search-driven uncover
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, LAYER_NAMES, state } from './imports.js';
import { applyLayers } from './live-physiology.js';
import { applyVisibility, getRecord } from './region-boxes-how.js';
import { clearSelection } from './depth-picking.js';
import { showToast } from './visualisation-modes.js';

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
export function enforceHidden(){
  state.hidden.forEach(m=>{ if(m) m.visible=false; });
  state.autoHidden.forEach(m=>{ if(m) m.visible=false; });
}
export function hiddenName(m){
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
export function hiddenRows(){
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
export function publishHidden(){
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
export function hideMesh(mesh){
  const m=mesh||state.selectionAnchor;
  if(!m){ showToast('Select a structure first'); return false; }
  kinOf(m).forEach(o=>{ state.hidden.add(o); state.autoHidden.delete(o); });
  if(state.selectionAnchor&&kinOf(m).includes(state.selectionAnchor)){ clearSelection(); }
  applyLayers(); applyVisibility(); enforceHidden(); publishHidden();
  showToast(`${hiddenName(m)} hidden`);
  return true;
}
export function unhide(token){
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

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  state.hidden = new Set();
  state.autoHidden = new Set();
}
