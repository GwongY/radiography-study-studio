/*
 * Region boxes — how the region filter reaches the six soft-tissue layers
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, LANDMARK_HOTSPOTS, MODEL_CATALOG, els, getAnatomy, state } from './imports.js';
import { applyConnectiveVisibility, applyLayers, renderXray, setMovementAngle, stepPhysiology, unitBlurb, unitFor, updateStageMeta } from './live-physiology.js';
import { bodyMetrics, clearPickCallout, updateHudSprites } from './spatial-concept-overlays.js';
import { clean, onBonePicked, pool, record, renderRegions, selectBone, showToast } from './visualisation-modes.js';
import { enforceHidden } from './hide-and-search.js';
import { loadExtraModel } from './depth-picking.js';

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
  export function applyVisibility(){const skelOn=state.layers?state.layers.skeleton!==false:true;/* 'upper_limb' is now an ordinary region filter on the full skeleton. The   separate five-bone set is never drawn -- the skeleton already names those   five -- but its group stays visible so the landmark hotspots parented to   it can show. */if(state.fullModel)state.fullModel.visible=skelOn;if(state.realModel)state.realModel.visible=true;state.fullPickables.forEach(m=>m.visible=skelOn);state.fullMeshes.forEach(m=>{const inRegion=state.region==='all'||(m.userData.regions||[m.userData.region]).includes(state.region);const isolated=!state.isolated||!state.selectedId||m.userData.canonicalId===state.selectedId;m.visible=skelOn&&inRegion&&isolated});state.meshes.forEach(m=>{m.visible=false});state.hotspots.forEach(h=>h.visible=skelOn&&state.mode==='landmarks'&&(!state.selectedId||h.userData.parentId===state.selectedId));
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
  export function between(THREE,group,a,b,r,id,region,side=null){const dir=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));const mesh=addMesh(THREE,group,new THREE.CylinderGeometry(r,r*.9,dir.length(),10),new THREE.Vector3(...a).add(new THREE.Vector3(...b)).multiplyScalar(.5).toArray(),id,region,side);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return mesh}
  export function tube(THREE,group,points,r,id,region,side=null){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return addMesh(THREE,group,new THREE.TubeGeometry(curve,14,r,6,false),[0,0,0],id,region,side)}
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
  export function showHotspots(parentId){state.hotspots.forEach(h=>h.visible=h.userData.parentId===parentId)}
  export function addHotspots(THREE,scene){const parentNode=state.realModel||scene;state.hotspots=[];Object.entries(LANDMARK_HOTSPOTS).forEach(([parent,spots])=>spots.forEach((spot)=>{const mat=new THREE.MeshBasicMaterial({color:0xffba67});const mesh=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),mat);mesh.position.set(...spot.position);mesh.userData={canonicalId:parent,parentId:parent,landmarkId:spot.id,label:spot.label};mesh.visible=false;parentNode.add(mesh);state.hotspots.push(mesh)}))}
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
  export function mapImportedName(raw){const value=String(raw||'').toLowerCase().replace(/[_.\-]+/g,' ');for(const [re,id] of IMPORT_MAP)if(re.test(value))return id;return null}
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
  export function getRecord(id){return getAnatomy(id)||state.importedRecords.get(id)||null}
  function prepareFullReference(THREE,root){state.THREE=THREE;state.fullMeshes=[];state.fullPickables=[];root.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(root);const size=box.getSize(new THREE.Vector3());const maxDim=Math.max(size.x,size.y,size.z)||1;root.scale.setScalar(11.8/maxDim);const scaledBox=new THREE.Box3().setFromObject(root);const center=scaledBox.getCenter(new THREE.Vector3());root.position.x-=center.x;root.position.y+=1-center.y;root.position.z-=center.z;root.updateMatrixWorld(true);/* The canonical body frame. Every other layer gets THIS transform verbatim -- see loadExtraModel. */state.bodyTransform={scalar:11.8/maxDim,offset:[root.position.x,root.position.y,root.position.z]};/* * Side letters are glued onto the name -- 'Costal_cartilage_of_fifth_ribl', * 'Incusr'. cleanImportedLabel only knew a fixed list of bone words, so 148 * of the 277 structures displayed their side letter as part of the name. * Strip it only when the opposite-side twin actually exists, which needs * every name in hand first -- hence two passes. Femur and Vomer genuinely * end in r and have no twin, so they are left alone. */const objs=[];root.traverse((o)=>{if(o.isMesh)objs.push(o)});const raws=objs.map(o=>o.name||o.parent?.name||'Unnamed structure');const flatNames=new Set(raws.map(r=>r.replace(/_/g,' ').trim().toLowerCase()));const sideAware=(raw)=>{const clean=String(raw).replace(/_/g,' ').replace(/\s+/g,' ').trim();const mm=clean.match(/^(.*\S)(l|r)$/i);if(mm){const stem=mm[1].trim();const twin=(stem+(mm[2].toLowerCase()==='l'?'r':'l')).toLowerCase();if(flatNames.has(twin))return {label:stem,side:mm[2].toLowerCase()==='l'?'left':'right'}}return {label:clean,side:null}};objs.forEach((obj,i)=>{const raw=raws[i];const {label,side:sd}=sideAware(raw);const mapped=mapImportedName(raw);const region=importedRegion(raw,mapped);const regions=importedRegions(raw,mapped);/* The same study units as every other layer -- see unitFor. Before this the skeleton handed every mesh its own id, so tapping a toe returned "Distal phalanx of fifth finger of foot", a name no lecture uses. */const unit=unitFor('skeleton',raw);const id=unit?`full:u:${unit.unitId}${sd?':'+sd:''}`:`full:${i}:${raw}`;const base=importedRecord(id,raw,mapped,region);if(!state.importedRecords.has(id)){const rec={...base,canonicalName:(unit?unit.unit:label)||base.canonicalName,side:sd||base.side};if(unit&&unit.unitKind!=='course'&&!(mapped&&getAnatomy(mapped)))rec.radiographyImportance=unitBlurb(unit,'skeleton');state.importedRecords.set(id,rec);}obj.userData={...(obj.userData||{}),baseScale:obj.scale.toArray(),basePosition:obj.position.toArray(),presentationActive:false,canonicalId:id,sourceCanonicalId:mapped,region,regions,side:sd||sideFromImportedName(raw),label:raw,precise:true};if(obj.material){obj.material=obj.material.clone();obj.material.color?.setHex(0xd9d1bc);obj.material.roughness=.8;obj.material.metalness=.02}state.fullMeshes.push(obj)});const pivot=new THREE.Group();pivot.name='fullSkeletonPivot';pivot.add(root);return pivot}
  function prepareImportedModel(THREE,root){state.realIsProcedural=false;/* Same shared body frame as every other layer. Normalising this set to its   OWN bounding box scaled five arm bones to the height of a whole body. */const bt=state.bodyTransform;if(bt){root.scale.setScalar(bt.scalar);root.position.set(bt.offset[0],bt.offset[1],bt.offset[2])}else{const box=new THREE.Box3().setFromObject(root);const size=box.getSize(new THREE.Vector3());const maxDim=Math.max(size.x,size.y,size.z)||1;root.scale.setScalar(11/maxDim);const scaledBox=new THREE.Box3().setFromObject(root);const center=scaledBox.getCenter(new THREE.Vector3());root.position.x-=center.x;root.position.y+=.5-center.y;root.position.z-=center.z}state.meshes=[];let mapped=0,unmapped=0;const importedNames=[];root.traverse((obj)=>{if(!obj.isMesh)return;importedNames.push(obj.name||obj.parent?.name||'unnamed');const canonicalId=obj.userData.sourceCanonicalId||mapImportedName(obj.name||obj.parent?.name);if(!canonicalId){unmapped++;obj.visible=false;return}const known=getAnatomy(canonicalId);if(!known){unmapped++;obj.visible=false;return}mapped++;obj.userData={...(obj.userData||{}),baseScale:obj.scale.toArray(),basePosition:obj.position.toArray(),presentationActive:false,canonicalId,region:known.region,side:obj.userData.sourceSide||sideFromImportedName(obj.name||obj.parent?.name),label:obj.userData.sourceLabel||obj.name};if(obj.material){obj.material=obj.material.clone();obj.material.color?.setHex(0xd9d1bc);obj.material.roughness=.78;obj.material.metalness=.02}state.meshes.push(obj)});return {mapped,unmapped}}
  export function remapHotspotsToReal(THREE){if(!state.realModel||state.realIsProcedural)return;const byId=new Map();state.meshes.forEach(m=>{if(!byId.has(m.userData.canonicalId))byId.set(m.userData.canonicalId,m)});state.realModel.updateMatrixWorld(true);Object.entries(LANDMARK_HOTSPOTS).forEach(([parent,spots])=>{const mesh=byId.get(parent);if(!mesh)return;mesh.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(mesh),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());spots.forEach(spot=>{const h=state.hotspots.find(x=>x.userData.parentId===parent&&x.userData.landmarkId===spot.id);if(!h)return;const rel=new THREE.Vector3(...spot.position).sub(new THREE.Vector3(-2.4,7.7,.45));rel.x=Math.max(-1.2,Math.min(1.2,rel.x));rel.y=Math.max(-1.2,Math.min(1.2,rel.y));rel.z=Math.max(-.8,Math.min(.8,rel.z));const worldPoint=center.clone().add(rel.multiply(new THREE.Vector3(size.x*.5,size.y*.5,size.z*.5)));h.position.copy(state.realModel.worldToLocal(worldPoint));h.visible=false})})}
  async function loadImportedModel(THREE,GLTFLoader,DRACOLoader){const root=new THREE.Group();const loader=new GLTFLoader();const draco=new DRACOLoader();draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/libs/draco/');loader.setDRACOLoader(draco);for(let i=0;i<MODEL_CATALOG.active.files.length;i++){const source=MODEL_CATALOG.active.files[i];const gltf=await new Promise((resolve,reject)=>loader.load(source.file,resolve,(event)=>{const ratio=event.total?event.loaded/event.total:0;els.progress.style.width=`${Math.round(((i+ratio)/MODEL_CATALOG.active.files.length)*60)+28}%`},reject));gltf.scene.traverse((obj)=>{obj.userData={...(obj.userData||{}),sourceCanonicalId:source.id,sourceSide:source.side,sourceLabel:source.label}});root.add(gltf.scene)}const pivot=new THREE.Group();pivot.name='realUpperLimbPivot';pivot.add(root);return pivot}
  async function loadFullReference(THREE,GLTFLoader){const loader=new GLTFLoader();const gltf=await new Promise((resolve,reject)=>loader.load(MODEL_CATALOG.fullSkeletonFile,resolve,(event)=>{const ratio=event.total?event.loaded/event.total:0;els.progress.style.width=`${Math.round(ratio*25)+3}%`},reject));return gltf.scene}
  export function cameraView(kind){if(!state.camera||!state.controls)return;if(kind==='lateral'){state.camera.position.set(24,1,0);state.controls.target.set(0,1,0)}else{state.camera.position.set(0,1,25);state.controls.target.set(0,1,0)}state.controls.update()}
  export async function boot3D(){els.state.classList.remove('hidden');els.stateTitle.textContent='Loading the skeleton layer';els.stateCopy.textContent='Loading the Z-Anatomy skeleton — 159 named structures, 80 of them named by your course material, 88 things you can select. The other six system layers load on demand.';els.retry.style.display='none';els.progress.style.width='3%';try{const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js');const {OrbitControls}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js');const {GLTFLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js');const {DRACOLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/DRACOLoader.js');state.scene=new THREE.Scene();state.scene.background=new THREE.Color(0x0b151b);state.camera=new THREE.PerspectiveCamera(32,1,.1,100);state.camera.position.set(0,1,25);state.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});state.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));state.renderer.outputColorSpace=THREE.SRGBColorSpace;els.stage.prepend(state.renderer.domElement);state.controls=new OrbitControls(state.camera,state.renderer.domElement);state.controls.enableDamping=true;state.controls.dampingFactor=.08;state.controls.minDistance=2.5;state.controls.maxDistance=45;state.controls.target.set(0,1,0);state.raycaster=new THREE.Raycaster();state.pointer=new THREE.Vector2();state.scene.add(new THREE.HemisphereLight(0xdce9e7,0x102026,2.1));const key=new THREE.DirectionalLight(0xffffff,2.4);key.position.set(5,12,16);state.scene.add(key);state.scene.add(new THREE.DirectionalLight(0x5cd1c4,.8));try{state.fullModel=prepareFullReference(THREE,await loadFullReference(THREE,GLTFLoader));state.scene.add(state.fullModel);addFullPickables(THREE,state.scene);els.stageMeta.textContent='Z-Anatomy / BodyParts3D skeleton · 159 named structures';}catch(fullError){console.warn('Full reference failed',fullError)}try{state.realModel=await loadImportedModel(THREE,GLTFLoader,DRACOLoader);const info=prepareImportedModel(THREE,state.realModel);state.scene.add(state.realModel);els.stageMeta.textContent+=` · ${info.mapped} real BodyParts3D upper-limb meshes`;}catch(importError){console.warn('Real upper-limb model failed, using local fallback',importError);state.realModel=createProceduralModel(THREE);state.scene.add(state.realModel);addHotspots(THREE,state.scene);els.stageMeta.textContent='Full reference + fallback upper-limb meshes';}resize();watchStageSize();applyVisibility();els.progress.style.width='100%';setTimeout(()=>els.state.classList.add('hidden'),500);animate();return true}catch(error){els.stateTitle.textContent='3D model unavailable';els.stateCopy.textContent='The study tools still work. Check your connection, then retry the model layer.';els.retry.style.display='inline-flex';els.progress.style.width='100%';console.warn(error);return false}}
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
  export function resize(){
    if(!state.renderer||!state.camera)return;
    const rect=els.stage.getBoundingClientRect();
    const w=Math.floor(rect.width), h=Math.floor(rect.height);
    if(w<2||h<2)return;                       /* hidden: measure again when shown */
    state.renderer.setSize(w,h,false);
    state.camera.aspect=w/h;
    state.camera.updateProjectionMatrix();
    /* In device pixels, matching enterXray -- see the note there. Passing the
       CSS size here would undo that fix on the first resize. */
    if(state.xray&&state.xray.rt){
      const pr=state.renderer.getPixelRatio();
      state.xray.rt.setSize(Math.max(2,Math.floor(w*pr)),Math.max(2,Math.floor(h*pr)));
    }
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
  export function animate(){if(!state.renderer)return;requestAnimationFrame(animate);
  if(state.movement&&state.movement.playing){
    const mv=state.movement.mv, step=(mv.range[1]-mv.range[0])/90;
    let a=state.movement.angle+step*state.movement.dir;
    if(a>=mv.range[1]){a=mv.range[1];state.movement.dir=-1}
    else if(a<=mv.range[0]){a=mv.range[0];state.movement.dir=1}
    setMovementAngle(a);
  }state.motionPhase=performance.now()*.001;stepPhysiology(state.motionPhase);if(state.motionEnabled){const turn=Math.sin(state.motionPhase*.55)*.24;[state.fullModel,state.realModel,state.conceptGroup,state.pickGroup,...Object.values(state.extraModels||{}).map(m=>m.pivot)].forEach(root=>{if(root)root.rotation.y=turn})}const pulse=.72+.28*Math.sin(state.motionPhase*3.2);[...state.meshes,...state.fullMeshes].filter(m=>m.userData.presentationActive).forEach(m=>{if(m.material.emissive)m.material.emissiveIntensity=.95*pulse});state.controls.update();if(typeof updateHudSprites==='function')updateHudSprites();if(!renderXray())state.renderer.render(state.scene,state.camera)}
  export function zoomCamera(factor){if(!state.camera||!state.controls)return;const offset=state.camera.position.clone().sub(state.controls.target);const distance=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,offset.length()*factor));state.camera.position.copy(state.controls.target).add(offset.normalize().multiplyScalar(distance));state.controls.update()}
  export function focusSelected(){if(!state.camera||!state.controls||!state.selectionAnchor){showToast('Select a structure first');return}state.controls.minDistance=2.5;const box=new state.THREE.Box3().setFromObject(state.selectionAnchor);const center=box.getCenter(new state.THREE.Vector3());const size=box.getSize(new state.THREE.Vector3());const radius=Math.max(size.x,size.y,size.z,.35);const offset=state.camera.position.clone().sub(state.controls.target).normalize();const distance=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*3.6));state.controls.target.copy(center);state.camera.position.copy(center).add(offset.multiplyScalar(distance));state.controls.update()}
  export function toggleIsolation(){if(!state.selectedId){showToast('Select a structure first');return}const record=getRecord(state.selectedId);if(!state.fullMeshes.length&&record?.region!=='upper_limb'&&state.region!=='upper_limb'){showToast('This fallback reference is fused. Use Upper limb for per-bone isolation.');focusSelected();return}if(state.region!=='upper_limb'&&record?.region==='upper_limb'&&state.meshes.length){state.region='upper_limb';els.regionMeta.textContent='Upper limb';renderRegions();applyVisibility()}state.isolated=!state.isolated;$('isolateBtn').classList.toggle('active',state.isolated);applyVisibility();focusSelected()}
  export function isSelfOrAncestorVisible(obj){let o=obj;while(o){if(!o.visible)return false;o=o.parent}return true}
  export function nearestVisibleMesh(event,rect){if(!state.THREE)return null;const pool=state.fullMeshes;let best=null;for(const mesh of pool){if(!isSelfOrAncestorVisible(mesh))continue;const box=new state.THREE.Box3().setFromObject(mesh);const boxSize=box.getSize(new state.THREE.Vector3());box.expandByScalar(-Math.min(boxSize.length()*.08,.15));const center=box.getCenter(new state.THREE.Vector3()).project(state.camera);const px=rect.left+(center.x+1)*rect.width/2;const py=rect.top+(1-center.y)*rect.height/2;const radiusPx=Math.max(4,Math.min(32,Math.max(boxSize.x,boxSize.y,boxSize.z)*state.camera.position.distanceTo(state.controls.target)*3));const distance=Math.hypot(event.clientX-px,event.clientY-py);const tolerance=Math.max(18,radiusPx+10);if(distance<=tolerance&&(!best||distance<best.distance))best={mesh,distance}}return best?.mesh||null}
  /*
   * The 900ms fading DOM tag that used to live here is gone: selectBone now
   * raises a callout attached to the structure itself, which persists until the
   * selection changes and turns with the model. A screen-pinned tag could not
   * do either -- it slid off the thing it named on the first drag, and by the
   * time you had rotated to see the structure the name had already faded.
   */
  export function confirmPick(obj,event){if(!obj)return;onBonePicked(obj);const picked=getRecord(obj.userData.canonicalId);if(picked){if(navigator.vibrate)navigator.vibrate(10);/* The lesson card owns no selection panel, so it listens instead. */if(state.pickHook)try{state.pickHook(picked)}catch(e){}}}
