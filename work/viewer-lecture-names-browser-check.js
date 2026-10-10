// Run in Chrome evaluate_script on the local viewer.
export default async function(){
  const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
  const {openViewer}=await import('./study/what-is-under.js');
  const {BODY_LAYERS}=await import('./study/subject.js');
  const {MESH_INDEX}=await import('./studio/imports.js');
  const {VIEWER_LECTURE_NAMES,lectureRow}=await import('./viewer-lecture-names.js');
  const {unitFor}=await import('./studio/live-physiology.js');
  const {onBonePicked}=await import('./studio/visualisation-modes.js');
  const {searchHits}=await import('./study/global-search-one.js');
  const {viewerStructureName}=await import('./search-name.js');
  openViewer();await window.__osteo.boot();
  const o=window.__osteo,s=o.state;o.clearStudyFocus();o.clearCut();o.setSeparation(0);s.isolated=false;s.mode='explore';s.region='all';
  for(const l of BODY_LAYERS)await o.setLayer(l.key,true,l.file);
  const meshes=[...s.fullMeshes,...Object.values(s.extraModels).flatMap(m=>m.meshes)];
  let checked=0;
  for(const n of VIEWER_LECTURE_NAMES){
    const mesh=meshes.find(m=>m.userData.layerKey===n.layer&&unitFor(n.layer,m.userData.label||m.name)?.lectureSource?.name===n.name);
    assert(mesh,`${n.name}: no selectable real mesh`);
    const row=unitFor(n.layer,mesh.userData.label||mesh.name);
    onBonePicked(mesh);
    assert(document.querySelector('#selectedName').textContent===viewerStructureName(row.unit),`${n.name}: selected label replaced by a coarse family`);
    assert(document.querySelector('#selectedChips').textContent.includes(`p${n.page}`),`${n.name}: missing lecture page on selection`);
    checked++;
  }
  for(const term of ['metacarpal','metatarsal','phalanx','brachioradialis','metacarpophalangeal','metatarsophalangeal']){
    const expected=MESH_INDEX.map(lectureRow).filter(r=>r.lectureSource&&r.unit.toLowerCase().includes(term));
    const hits=searchHits(term);
    for(const r of expected)assert(hits.some(h=>h.title===r.unit),`${r.unit}: search still hides it in a group`);
  }
  return {pass:true,lectureNames:checked,newIdentities:MESH_INDEX.filter(r=>lectureRow(r).unitId!==r.unitId).length,meshes:meshes.length};
}
