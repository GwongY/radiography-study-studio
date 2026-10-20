/*
 * Region boxes — how the region filter reaches the six soft-tissue layers
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, MODEL_CATALOG, els, getAnatomy, prefersStill, state, systemsOf } from './imports.js';
import { applyConnectiveVisibility, layerOn, meshOn, renderXray, resizeXray, setMovementAngle, stepPhysiology, unitBlurb, unitFor, updateStageMeta, applyLayers } from './live-physiology.js';
import { bodyMetrics, clearPickCallout, updateHudSprites } from './spatial-concept-overlays.js';
import { clearHighlight, onBonePicked, renderRegions, showToast } from './modes-and-bridge.js';
import { enforceHidden } from './hide-and-search.js';
import { restorePeel, loadExtraModel } from './depth-picking.js';
/* The abdomen's box is cut to the levels the nine-region grid is drawn on --
   see regionBoxes. Imported as a function, called only from inside one, so the
   cycle with cavity-geometry-derived.js resolves like the others here. */
import { gridMetrics } from './cavity-geometry-derived.js';
import { syncTools, applySeparation } from './tools-and-capture.js';
import { restorePackedSpread } from './packed-spread.js';

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
    const THREE=state.THREE,root=state.fullModel||null;
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
  /*
   * The back is not a box, and this is the function that admits it.
   *
   * Every other region is the space its own bones occupy, and an axis-aligned
   * box round them is a fair answer. The back is a HALF-SPACE: everything
   * behind the vertebral column, from the base of the skull to the coccyx. A
   * box cannot say "behind", and a single flat depth cannot either, because
   * the column is not straight -- measured on this model it travels about a
   * tenth of the body's height forward and back between the cervical lordosis
   * and the sacrum, so one plane drawn at the lumbar depth cuts the neck in
   * half and one drawn at the cervical depth puts the kidneys in the back.
   *
   * So the boundary is measured band by band from the column itself. Each
   * vertebra (and the sacrum, and the coccyx) contributes its own body-frame
   * box; the front of the back, at a given height, is the frontmost of the
   * vertebrae that reach that height. Between and beyond them the nearest
   * vertebra answers, which is what keeps the neck and the coccyx from
   * falling off the ends of the profile.
   *
   * +z is ANTERIOR -- see the axis note in docs/TRAPS.md -- so "behind" is
   * z <= front(y), with no padding: a region called Back that let the lungs
   * in would be worse than no region at all.
   *
   * What this rule gets WRONG, measured and left alone on purpose: six deep
   * neck muscles. The prevertebral three (longus colli, longus capitis,
   * rectus anterior capitis), the two posterior scalenes and the posterior
   * crico-arytenoid all sit behind the front of the cervical column, so the
   * rule admits them, while a textbook files them under the neck. The
   * geometry is not in dispute -- they really are posterior to that line --
   * it is that the back is a chapter heading as well as a space, and in the
   * neck the two do not coincide. Naming those muscles in the app to force
   * the issue would be a claim about the course with nothing behind it; the
   * rule stays, and work/region-probe.mjs asserts the exception list so a
   * change to the profile is reported rather than discovered on screen.
   *
   * A vertex-fraction test was tried instead of the centroid ("is most of
   * this mesh behind the line") and classified the SAME six the same way,
   * for twice the work -- the centroid is not the problem, so it stays.
   */
  const COLUMN=/\bvertebra|\batlas\b|\baxis\b|\bsacrum|\bcoccyx/;
  function columnFront(inv){
    if(state._colFront&&state._colFront.n===state.fullMeshes.length)return state._colFront.f;
    const THREE=state.THREE;
    if(!THREE||!inv)return null;
    const bands=[];
    state.fullMeshes.forEach(o=>{
      if(!COLUMN.test(String(o.userData.label||'').replace(/_/g,' ').toLowerCase()))return;
      if(!o.geometry)return;
      if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();
      const bb=o.geometry.boundingBox;if(!bb)return;
      const m4=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld),v=new THREE.Vector3(),b=new THREE.Box3();
      for(let k=0;k<8;k++){v.set(k&1?bb.max.x:bb.min.x,k&2?bb.max.y:bb.min.y,k&4?bb.max.z:bb.min.z).applyMatrix4(m4);b.expandByPoint(v)}
      bands.push({y0:b.min.y,y1:b.max.y,z:b.max.z});
    });
    if(!bands.length)return null;
    const f=(y)=>{
      let hit=null,near=null,nearD=Infinity;
      for(const s of bands){
        if(y>=s.y0&&y<=s.y1){ if(hit==null||s.z>hit)hit=s.z; continue }
        const d=y<s.y0?s.y0-y:y-s.y1;
        if(d<nearD){nearD=d;near=s.z}
      }
      return hit!=null?hit:near;
    };
    state._colFront={f,n:state.fullMeshes.length};
    return f;
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
    /*
     * The abdomen's floor and roof are LEVELS, not bones.
     *
     * Every other region is the space its own bones occupy, so an axis-aligned
     * box round them is the region. The abdomen is not: the bones that frame it
     * belong to the thorax, the column and the pelvic girdle, and a box round
     * them runs from the seventh rib -- most of the chest -- down to the
     * ischial tuberosity. So x and z come from those bones, and y is cut to the
     * span the nine-region grid is drawn on: the tip of the xiphoid process
     * above, the top of the pubic symphysis below, both measured in
     * cavity-build.js from the model in front of you.
     *
     * Taking them from measureGrid rather than measuring them again here is the
     * point. The grid overlay and this filter are then the same two numbers,
     * and "Abdomen & pelvis" selects exactly the body the nine regions are
     * painted on rather than something a few centimetres taller.
     *
     * gridMetrics returns null until it has every measurement it needs. In that
     * case the bone box stands, unclipped -- too tall, but never empty.
     */
    if(region==='abdomen'&&boxes.length){
      const G=(()=>{try{return gridMetrics()}catch(e){return null}})();
      if(G&&Number.isFinite(G.topY)&&Number.isFinite(G.bottomY)){
        boxes.forEach(b=>{
          b.min.y=Math.max(b.min.y,G.bottomY-pad);
          b.max.y=Math.min(b.max.y,G.topY+pad);
        });
      }
    }
    state._regionBoxes={region,boxes,n:state.fullMeshes.length};
    return boxes.length?boxes:null;
  }
  /*
   * The skeleton became two chips -- Axial and Appendicular -- so "is the
   * skeleton showing" splits in two as well. skelOn is the LAYER question,
   * and it still governs the things that belong to the whole file: the
   * pickable proxies. Whether an
   * individual bone shows is meshOn, exactly as it already was for the two
   * composite soft-tissue layers, which is why nothing here needed a special
   * case for the skeleton beyond stamping userData.systems in
   * prepareFullReference.
   */
  export function applyVisibility(){if(state.xray)return;if(state.spreadMode==='pieces'&&state.separation)restorePackedSpread();const skelOn=state.layers?layerOn('skeleton'):true;/* 'upper_limb' is an ordinary region filter on the full skeleton. */if(state.fullModel)state.fullModel.visible=skelOn;state.fullPickables.forEach(m=>m.visible=skelOn);state.fullMeshes.forEach(m=>{const inRegion=state.region==='all'||(m.userData.regions||[m.userData.region]).includes(state.region);m.visible=(state.layers?meshOn(m):true)&&inRegion});
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
      /* 4. Depth, for the one region that needs it -- see columnFront. */
      const front=state.region==='back'&&inv?columnFront(inv):null;
      Object.entries(state.extraModels||{}).forEach(([k,mdl])=>{
        mdl.meshes.forEach(o=>{
          /* 3. System. Two of the seven files draw several chips, so a mesh
                whose own system is off goes away even though its layer is on
                -- turning Venous off must not take the arteries with it. */
          if(!meshOn(o)){o.visible=false;return}
          if(!boxes){o.visible=true;return}
          const c=bodyCentreOf(o,inv);
          if(!c||!boxes.some(b=>b.containsPoint(c))){o.visible=false;return}
          if(front){const z=front(c.y);o.visible=z!=null&&c.z<=z;return}
          o.visible=true;
        });
      });
    }
    if(typeof applyConnectiveVisibility==='function')applyConnectiveVisibility();
    if(typeof enforceHidden==='function')enforceHidden();
    // Focus keeps every part of the selection, including groups across layers.
    if(state.isolated&&state.selectedId){
      const keep=new Set(state.selectionMeshes.length?state.selectionMeshes:[state.selectionAnchor]);
      [...state.fullMeshes,...state.fullPickables,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)].forEach(m=>{if(!keep.has(m))m.visible=false});
    }
    /*
     * A leader line pointing at something no longer on screen.
     *
     * Selecting a tooth and then filtering to the thoracic cage left the tag
     * "Upper first molar tooth" hanging in the empty air above the ribs, its
     * leader ending nowhere. If the selected structure has just been filtered
     * or hidden away, the callout goes with it.
     */
    if(state.selectionAnchor&&state.selectionAnchor.visible===false
      &&typeof clearPickCallout==='function')clearPickCallout();if(state.fullMeshes.length&&typeof updateStageMeta==='function')updateStageMeta();if(state.spreadMode==='pieces'&&state.separation)applySeparation()}
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
  /*
   * The abdomen borrows its frame from three regions and owns none of it: the
   * lower ribs and the costal margin above, the lumbar column and the sacrum
   * behind, the hip bones below and to the sides. Those are the bones the
   * filter shows, and what the box is measured from -- but for x and z only.
   * Its floor and roof are levels, not bones; regionBoxes takes them from the
   * grid.
   */
  const REGION_ALSO=[
    [/\bsacrum|\bcoccyx/,'pelvis'],
    [/\bvertebra l[1-5]|\bsacrum|\bhip bone|\bilium|\bischium|\bpubis|\b(seventh|eighth|ninth|tenth|eleventh|twelfth) rib|costal cartilage of (seventh|eighth|ninth|tenth) rib/,'abdomen'],
    /*
     * The bones of the back: the whole column, and the two scapulae that ride
     * on it. The RIBS are deliberately not here, and they are the interesting
     * exclusion -- their posterior thirds genuinely are the back, but a rib is
     * one mesh and most of it is not, so including them would both draw a
     * whole ribcage under a chip called Back and push the measured box forward
     * to the sternum. The column and the scapulae give the box the width and
     * depth the back actually has; the depth limit below does the rest.
     */
    [/\bvertebra|\batlas\b|\baxis\b|\bsacrum|\bcoccyx|\bscapula/,'back'],
  ];
  function importedRegions(raw,mapped){
    const primary=importedRegion(raw,mapped);
    const value=String(raw||'').replace(/_/g,' ').toLowerCase();
    const out=primary?[primary]:[];
    for(const [re,id] of REGION_ALSO)if(re.test(value)&&!out.includes(id))out.push(id);
    return out;
  }
  function importedRecord(id,raw,mapped,region){const known=mapped&&getAnatomy(mapped);const label=cleanImportedLabel(raw);const side=sideFromImportedName(raw);if(known)return {...known,id,canonicalName:label||known.canonicalName,side:side||known.side};return {id,canonicalName:label||'Unnamed structure',aliases:[],region,side:side||'bilateral',category:'named atlas structure',landmarks:[],articulations:[],radiographyImportance:'Named atlas structure from the interactive skeleton source.',difficulty:3,modelObjectIds:[],commonConfusions:[]}}
  export function getRecord(id){return getAnatomy(id)||state.importedRecords.get(id)||null}
  function skeletonMeshName(mesh){
    const raw=mesh.name||mesh.parent?.name||'Unnamed structure',parent=mesh.parent?.name;
    // GLTFLoader disambiguates the Frontal_bone mesh from its containing node
    // as Frontal_bone_1. Resolve it against that actual parent, so the course
    // unit and every tap agree; anatomical numbers such as T1 stay intact.
    return parent&&raw.startsWith(parent+'_')&&/^\d+$/.test(raw.slice(parent.length+1))?parent:raw;
  }
  function prepareFullReference(THREE,root){state.THREE=THREE;state.fullMeshes=[];state.fullPickables=[];root.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(root);const size=box.getSize(new THREE.Vector3());const maxDim=Math.max(size.x,size.y,size.z)||1;root.scale.setScalar(11.8/maxDim);const scaledBox=new THREE.Box3().setFromObject(root);const center=scaledBox.getCenter(new THREE.Vector3());root.position.x-=center.x;root.position.y+=1-center.y;root.position.z-=center.z;root.updateMatrixWorld(true);/* The canonical body frame. Every other layer gets THIS transform verbatim -- see loadExtraModel. */state.bodyTransform={scalar:11.8/maxDim,offset:[root.position.x,root.position.y,root.position.z]};/* * Side letters are glued onto the name -- 'Costal_cartilage_of_fifth_ribl', * 'Incusr'. cleanImportedLabel only knew a fixed list of bone words, so 148 * of the 277 structures displayed their side letter as part of the name. * Strip it only when the opposite-side twin actually exists, which needs * every name in hand first -- hence two passes. Femur and Vomer genuinely * end in r and have no twin, so they are left alone. */const objs=[];root.traverse((o)=>{if(o.isMesh)objs.push(o)});const raws=objs.map(skeletonMeshName);const flatNames=new Set(raws.map(r=>r.replace(/_/g,' ').trim().toLowerCase()));const sideAware=(raw)=>{const clean=String(raw).replace(/_/g,' ').replace(/\s+/g,' ').trim();const mm=clean.match(/^(.*\S)(l|r)$/i);if(mm){const stem=mm[1].trim();const twin=(stem+(mm[2].toLowerCase()==='l'?'r':'l')).toLowerCase();if(flatNames.has(twin))return {label:stem,side:mm[2].toLowerCase()==='l'?'left':'right'}}return {label:clean,side:null}};objs.forEach((obj,i)=>{const raw=raws[i];const {label,side:sd}=sideAware(raw);const mapped=mapImportedName(raw);const region=importedRegion(raw,mapped);const regions=importedRegions(raw,mapped);/* The same study units as every other layer -- see unitFor. Before this the skeleton handed every mesh its own id, so tapping a toe returned "Distal phalanx of fifth finger of foot", a name no lecture uses. */const unit=unitFor('skeleton',raw);const id=unit?`full:u:${unit.unitId}${sd?':'+sd:''}`:`full:${i}:${raw}`;const base=importedRecord(id,raw,mapped,region);if(!state.importedRecords.has(id)){const rec={...base,canonicalName:(unit?unit.unit:label)||base.canonicalName,side:sd||base.side};if(unit&&unit.unitKind!=='course'&&!(mapped&&getAnatomy(mapped)))rec.radiographyImportance=unitBlurb(unit,'skeleton');state.importedRecords.set(id,rec);}/* layerKey and systems are what meshOn reads -- the same two fields the
       soft-tissue layers get in loadExtraModel. Computed once here rather than
       per visibility pass: 388 meshes times two regexes on every applyLayers
       is work whose result never changes. */
    obj.userData={...(obj.userData||{}),baseScale:obj.scale.toArray(),basePosition:obj.position.toArray(),presentationActive:false,canonicalId:id,sourceCanonicalId:mapped,region,regions,side:sd||sideFromImportedName(raw),label:raw,precise:true,layerKey:'skeleton',systems:systemsOf('skeleton',raw)};if(obj.material){obj.material=obj.material.clone();obj.material.color?.setHex(0xd9d1bc);obj.material.roughness=.8;obj.material.metalness=.02}state.fullMeshes.push(obj)});const pivot=new THREE.Group();pivot.name='fullSkeletonPivot';pivot.add(root);return pivot}
  async function loadFullReference(THREE,GLTFLoader){const loader=new GLTFLoader();const gltf=await new Promise((resolve,reject)=>loader.load(MODEL_CATALOG.fullSkeletonFile,resolve,(event)=>{const ratio=event.total?event.loaded/event.total:0;els.progress.style.width=`${Math.round(ratio*25)+3}%`},reject));return gltf.scene}
  export function cameraView(kind){if(!state.camera||!state.controls)return;if(kind==='lateral'){state.camera.position.set(24,1,0);state.controls.target.set(0,1,0)}else{state.camera.position.set(0,1,25);state.controls.target.set(0,1,0)}state.controls.update()}
  export async function boot3D(){els.state.classList.remove('hidden');els.stateTitle.textContent='Loading the skeleton layer';els.stateCopy.textContent='Loading the Z-Anatomy skeleton — 159 named structures, 80 of them named by your course material, 88 things you can select. The other six system layers load on demand.';els.retry.style.display='none';els.progress.style.width='3%';try{/* Four awaits in a row cost four serial round trips to jsDelivr before the
     first byte of geometry was asked for. None of them needs another's result,
     so they go together. */
  const [THREE,{OrbitControls},{GLTFLoader}]=await Promise.all([
    import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js'),
    import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js'),
  ]);state.scene=new THREE.Scene();state.scene.background=new THREE.Color(0x0b151b);state.camera=new THREE.PerspectiveCamera(32,1,.1,100);state.camera.position.set(0,1,25);state.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});state.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));state.renderer.outputColorSpace=THREE.SRGBColorSpace;els.stage.prepend(state.renderer.domElement);state.controls=new OrbitControls(state.camera,state.renderer.domElement);state.controls.enableDamping=true;state.controls.dampingFactor=.08;state.controls.minDistance=2.5;state.controls.maxDistance=45;state.controls.target.set(0,1,0);state.raycaster=new THREE.Raycaster();state.pointer=new THREE.Vector2();state.scene.add(new THREE.HemisphereLight(0xdce9e7,0x102026,2.1));const key=new THREE.DirectionalLight(0xffffff,2.4);key.position.set(5,12,16);state.scene.add(key);state.scene.add(new THREE.DirectionalLight(0x5cd1c4,.8));/* The skeleton is the viewer: without it there is nothing to show, so a failure goes to the retryable state below. */state.fullModel=prepareFullReference(THREE,await loadFullReference(THREE,GLTFLoader));state.scene.add(state.fullModel);addFullPickables(THREE,state.scene);els.stageMeta.textContent='Z-Anatomy / BodyParts3D skeleton · 159 named structures';resize();watchStageSize();applyVisibility();els.progress.style.width='100%';setTimeout(()=>els.state.classList.add('hidden'),500);animate();return true}catch(error){els.stateTitle.textContent='3D model unavailable';els.stateCopy.textContent='The study tools still work. Check your connection, then retry the model layer.';els.retry.style.display='inline-flex';els.progress.style.width='100%';console.warn(error);return false}}
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
    /* Kept, not just returned on: animate() reads it to stop rendering a scene
       nobody can see. Zero area is how a display:none view presents itself. */
    state.stageLive=w>=2&&h>=2;
    if(!state.stageLive)return;               /* hidden: measure again when shown */
    state.renderer.setSize(w,h,false);
    state.camera.aspect=w/h;
    state.camera.updateProjectionMatrix();
    /* In device pixels, matching enterXray -- see the note there. Passing the
       CSS size here would undo that fix on the first resize. */
    if(state.xray&&state.xray.rt){
      resizeXray();
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
  /*
   * The turntable, the emissive pulse and the whole scene used to keep running
   * at 60fps while the viewer sat behind a lesson.
   *
   * The views are switched with display:none, and that does NOT stop
   * requestAnimationFrame -- only a hidden TAB does. So once the studio had
   * booted, a reader on a phone paid for a render they could not see for the
   * rest of the page's life. resize() already measures the stage and refuses a
   * 0x0 read; stageLive is that same measurement kept rather than discarded.
   *
   * The frame is still SCHEDULED above, so showing the view resumes on the very
   * next frame with nothing to re-arm. Compared against ===false so that a
   * browser without ResizeObserver, where stageLive is never written, keeps the
   * old always-on behaviour rather than freezing.
   */
  export function animate(){if(!state.renderer)return;requestAnimationFrame(animate);
  if(state.stageLive===false)return;
  if(state.movement&&state.movement.playing){
    const mv=state.movement.mv, step=(mv.range[1]-mv.range[0])/90;
    let a=state.movement.angle+step*state.movement.dir;
    if(a>=mv.range[1]){a=mv.range[1];state.movement.dir=-1}
    else if(a<=mv.range[0]){a=mv.range[0];state.movement.dir=1}
    setMovementAngle(a);
  }state.motionPhase=performance.now()*.001;stepPhysiology(state.motionPhase);if(state.atlasTick)state.atlasTick(state.motionPhase);if(state.extrasTick)state.extrasTick(state.motionPhase);/* Held at full rather than oscillating when the reader asked for stillness:
     the highlight still marks the structure, it just stops breathing. */
  const pulse=prefersStill()?1:.72+.28*Math.sin(state.motionPhase*3.2);state.fullMeshes.filter(m=>m.userData.presentationActive).forEach(m=>{if(m.material.emissive)m.material.emissiveIntensity=.95*pulse});state.controls.update();syncTools();if(typeof updateHudSprites==='function')updateHudSprites();if(!renderXray())state.renderer.render(state.scene,state.camera)}
  export function zoomCamera(factor){if(!state.camera||!state.controls)return;const offset=state.camera.position.clone().sub(state.controls.target);const distance=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,offset.length()*factor));state.camera.position.copy(state.controls.target).add(offset.normalize().multiplyScalar(distance));state.controls.update()}
  // Aspect-aware framing adapted from ashemag/human-atlas app/scene.tsx (MIT).
  function leaveAtlasBeforeFocus(){
    if(state.heartAtlasLoading){showToast('The heart atlas is loading. Please wait.');return false;}
    if(state.heartAtlasOn&&typeof window!=='undefined')window.__osteo?.exitHeartAtlas?.();
    return !state.heartAtlasOn;
  }
  export function focusSelected(isolate=false){
    if(!state.camera||!state.controls||!state.selectionAnchor){showToast('Select a structure first');return}
    if(!leaveAtlasBeforeFocus())return;
    if(isolate){restorePeel();state.isolated=true;clearHighlight();$('isolateBtn')?.classList.add('active');applyVisibility();}
    state.scene.updateMatrixWorld(true);
    const box=new state.THREE.Box3();
    (state.selectionMeshes.length?state.selectionMeshes:[state.selectionAnchor]).forEach(m=>box.expandByObject(m));
    const center=box.getCenter(new state.THREE.Vector3()),size=box.getSize(new state.THREE.Vector3());
    const camera=state.camera,controls=state.controls;
    const offset=camera.position.clone().sub(controls.target).normalize();
    const halfFov=Math.tan(camera.fov*Math.PI/360)/camera.zoom;
    const labelSpace=state.selectionAnchor.userData.layerKey==='skeleton' ? .5 : 1;
    let distance=Math.max(.07,Math.max(size.y,size.x/Math.max(.1,camera.aspect*labelSpace))/(2*halfFov)+size.z/2)*1.35;
    /* Focus must land inside the close view that draws a bone's part names (updateBoneLandmarks asks for the
       camera to be within about 1/.82 of the bone's own fit). The room left for labels above can put a wide bone
       just outside it, so the names only appeared after a small zoom; stop short of that. */
    if(state.selectionAnchor.userData.layerKey==='skeleton'){
      const ab=new state.THREE.Box3().setFromObject(state.selectionAnchor),as=ab.getSize(new state.THREE.Vector3());
      const own=Math.max(.07,Math.max(as.y,as.x/Math.max(.1,camera.aspect*.5))/(2*halfFov)+as.z/2);
      distance=Math.min(distance,own/.9);
    }
    controls.minDistance=Math.min(2.5,distance*.25);
    controls.maxDistance=Math.max(controls.maxDistance,distance*2);
    controls.target.copy(center);camera.position.copy(center).add(offset.multiplyScalar(distance));controls.update();
  }
  export function toggleIsolation(){if(state.heartAtlasLoading){showToast('The heart atlas is loading. Please wait.');return}if(state.heartAtlasOn&&!leaveAtlasBeforeFocus())return;if(!state.selectedId){showToast('Select a structure first');return}const record=getRecord(state.selectedId);if(!state.fullMeshes.length&&record?.region!=='upper_limb'&&state.region!=='upper_limb'){showToast('This fallback reference is fused. Use Upper limb for per-bone isolation.');focusSelected();return}if(state.region!=='upper_limb'&&record?.region==='upper_limb'&&state.fullMeshes.length){state.region='upper_limb';els.regionMeta.textContent='Upper limb';renderRegions();applyVisibility()}state.isolated=!state.isolated;if(state.isolated)clearHighlight();$('isolateBtn')?.classList.toggle('active',state.isolated);applyVisibility();focusSelected()}
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
