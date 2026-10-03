/*
 * Tools — section cuts, layer separation, capture.
 *
 * The Complete Anatomy side of the viewer: the things you DO to the model
 * rather than the things you look at. Four tools, and the rule they all obey
 * is the same rule the overlays obey — everything is stored in the BODY's
 * own coordinate frame, never in screen space, so a cut, a pen stroke and a
 * label all stay registered on the anatomy while the turntable turns and the
 * camera moves. A screen-space annotation slides off whatever it was naming
 * the moment you drag, which is exactly the failure the callout machinery in
 * spatial-concept-overlays.js was written to avoid; this reuses it rather
 * than repeating it.
 *
 * Split out along the banner sections. See docs/CODEMAP.md.
 */
import { $, boundsOf, els, state } from './imports.js';
import { attachCalloutToMesh, bodyMetrics, calloutAt } from './spatial-concept-overlays.js';
import { cavityContext, gridMetrics } from './cavity-geometry-derived.js';
import { getRecord } from './region-boxes-how.js';
import { clearConcepts, showToast } from './visualisation-modes.js';
/* layerOn: a layer is on when any of the systems it draws is -- systems.js. */
import { endMovement, layerOn, renderXray } from './live-physiology.js';
import { applyPackedSpread, endPackedSpread, restorePackedSpread } from './packed-spread.js';

/* ------------------------------------------------------------------ *
 * The body frame
 *
 * bodyMetrics() measures every mesh through the inverse of this root's world
 * matrix, so "the body frame" IS this root's local space. Everything below is
 * built there and mapped out to the world once, per frame, in syncTools().
 * ------------------------------------------------------------------ */
function bodyRoot(){
  return state.fullModel||state.realModel
    ||(Object.values(state.extraModels||{})[0]||{}).pivot||null;
}
/*
 * The annotation group is NOT parented to that root, even though it shares its
 * frame. applyVisibility() sets fullModel.visible from the skeleton chip, and
 * a pen stroke on the liver has no business disappearing because somebody
 * turned the bones off. It is a sibling in the scene that copies the root's
 * world matrix every frame instead.
 */
function ensureToolGroup(){
  const THREE=state.THREE;
  if(!THREE||!state.scene) return null;
  if(!state.toolGroup||!state.toolGroup.parent){
    const g=new THREE.Group();
    g.name='toolGroup';
    state.scene.add(g);
    state.toolGroup=g;
  }
  return state.toolGroup;
}

/* ------------------------------------------------------------------ *
 * Section cuts
 *
 * Three anatomical planes, positioned as a fraction of the measured body, and
 * clipped for real rather than faked by hiding meshes: a clipping plane cuts
 * THROUGH geometry, so a vertebra sectioned at T8 shows its own cross-section
 * the way a CT slice does. That is the whole point for a radiography student,
 * and it is why this is a renderer clipping plane and not a visibility filter.
 *
 * The plane lives in the body frame; the turntable yaws the pivots every
 * frame, so the world-space plane is re-derived from the root's world matrix
 * on every frame rather than being computed once at the moment you set it.
 * Compute it once and the cut swings away from the body as the model turns.
 * ------------------------------------------------------------------ */
/*
 * Which way each plane faces was MEASURED off the loaded skeleton, not assumed:
 * the right clavicle sits at x -0.58 (so +x is the patient's LEFT), the sternum
 * at z +0.55 against T8 at z -0.53 (so +z is ANTERIOR), and the frontal bone at
 * y 6.5 against the femur at y -0.4 (so +y is SUPERIOR). A clipping plane keeps
 * the half its normal points into, so those three facts are what each hint below
 * promises — and getting one backwards would teach a student the wrong side of
 * their own section.
 */
export const CUT_AXES=[
  {id:'axial',label:'Axial',hint:'A transverse slice, the plane a CT slice is taken in. Keeps everything above it; flip to keep what is below.',
   normal:[0,1,0]},
  {id:'coronal',label:'Coronal',hint:'A frontal slice. Keeps the anterior half; flip for the posterior.',
   normal:[0,0,1]},
  {id:'sagittal',label:'Sagittal',hint:"A sagittal slice, median at 50%. Keeps the patient's left; flip for the right.",
   normal:[1,0,0]},
];

/* Where the plane sits, in body-frame units, for a 0..1 slider position. */
function cutPoint(M,axis,t){
  if(axis==='axial')    return [M.cx, M.yAt(t), M.cz];
  if(axis==='coronal')  return [M.cx, M.yAt(0.5), M.cz+(t*2-1)*M.halfZ];
  return [M.cx+(t*2-1)*M.halfX, M.yAt(0.5), M.cz];
}

/*
 * The outline of the cut, drawn in the body frame so it turns with the model.
 * Without it the section reads as "half the model has gone missing"; with it
 * you can see which plane you are on and where it is. It sits a hair on the
 * KEPT side of the plane, or the clip discards the very fragments that draw it.
 */
function cutFrame(M,axis,t,flip){
  const THREE=state.THREE;
  const [px,py,pz]=cutPoint(M,axis,t);
  const eps=M.H*0.002*(flip?-1:1);
  const w=M.halfX*1.25, d=M.halfZ*1.35, h=M.H*0.56;
  let pts;
  if(axis==='axial'){
    const y=py+eps;
    pts=[[-w,y,-d],[w,y,-d],[w,y,d],[-w,y,d]].map(([x,yy,z])=>[M.cx+x,yy,M.cz+z]);
  }else if(axis==='coronal'){
    const z=pz+eps, cy=M.yAt(0.5);
    pts=[[-w,cy-h,z],[w,cy-h,z],[w,cy+h,z],[-w,cy+h,z]].map(([x,y,zz])=>[M.cx+x,y,zz]);
  }else{
    const x=px+eps, cy=M.yAt(0.5);
    pts=[[x,cy-h,-d],[x,cy-h,d],[x,cy+h,d],[x,cy+h,-d]].map(([xx,y,z])=>[xx,y,M.cz+z]);
  }
  const flat=[];
  for(let i=0;i<4;i++){
    const a=pts[i], b=pts[(i+1)%4];
    flat.push(a[0],a[1],a[2],b[0],b[1],b[2]);
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(flat,3));
  const line=new THREE.LineSegments(g,new THREE.LineBasicMaterial({
    color:0x72e3cf,transparent:true,opacity:0.5,depthTest:false,depthWrite:false}));
  line.renderOrder=997;
  return line;
}


/* ------------------------------------------------------------------ *
 * Named levels
 *
 * A 0-1 slider is not how sectional anatomy is taught, and it is not how it is
 * examined. Nobody is asked for a section at 62%: they are asked for the axial
 * section at the sternal angle, or at L1, and the whole skill is knowing what
 * that plane passes through. So every level below is an anatomical definition,
 * MEASURED off the loaded skeleton the same way the cavity overlays are, and
 * carrying the course page that names it.
 *
 * Two rules govern this table, and both are enforced by
 * work/cut-level-check.mjs rather than by remembering:
 *
 *   1. Nothing appears here that the HSS2011 / ABCT2326 material does not
 *      name. The subcostal plane is measured elsewhere in this app -- it is
 *      one of the nine-region grid's lines -- and is deliberately NOT offered
 *      here, because no source in work/source-text.json calls it that. Neither
 *      is the iliac crest / L4 level: the one handout that states it is not
 *      among the cited sources, so the quote cannot be checked, so the claim
 *      is not made. A level with no page behind it is exactly the "generic
 *      textbook expansion" CLAUDE.md's first rule forbids.
 *   2. Each level is derived from the structure it is NAMED for. The sternal
 *      angle is the manubriosternal junction, so it is measured between the
 *      manubrium and the body of the sternum -- not read off a vertebra, and
 *      not eyeballed. That the junction then lands between T4 and T5, which is
 *      what the lecture says it should, is the check that the measurement is
 *      right; it is asserted in work/cut-level-check.mjs against the real GLB.
 *
 * The coronal axis has no entries on purpose. The line a coronal section is
 * named against clinically is the mid-axillary line, and no cited source in
 * this repo names it, so coronal stays a free slider and the card says so.
 * ------------------------------------------------------------------ */

/* body-frame bounds of one landmark key, or null when it is not loaded */
function levelBounds(ctx,key){
  const parts=ctx.meshesFor(key).map((m)=>m.positions).filter(Boolean);
  if(!parts.length) return null;
  const b=boundsOf(parts);
  return b.empty?null:b;
}
/*
 * A joint between two bones, taken as the midpoint of the gap between them.
 * The inferior border of the manubrium and the superior border of the body of
 * the sternum are a few millimetres apart on this model, and the junction is
 * between the two -- taking either edge alone biases the plane onto one bone
 * or the other by that much.
 */
function junctionY(ctx,upperKey,lowerKey){
  const up=levelBounds(ctx,upperKey), lo=levelBounds(ctx,lowerKey);
  if(!up||!lo) return null;
  return (up.minY+lo.maxY)/2;
}
const centreY=(ctx,key)=>{ const b=levelBounds(ctx,key); return b?(b.minY+b.maxY)/2:null; };
const topY=(ctx,key)=>{ const b=levelBounds(ctx,key); return b?b.maxY:null; };

export const CUT_LEVELS=[
  {id:'jugular', axis:'axial', label:'Jugular notch',
   note:'The hollow at the top of the sternum. Measured at the superior border of the manubrium.',
   at:(ctx)=>topY(ctx,'thorax.manubrium'),
   refs:[{ref:'hss.1.3', location:'p4 "Jugular notch = suprasternal notch"'}]},

  {id:'sternalAngle', axis:'axial', label:'Sternal angle',
   note:'The manubriosternal junction. Vertebral level T4/T5, and the boundary between the superior and inferior mediastinum.',
   at:(ctx)=>junctionY(ctx,'thorax.manubrium','thorax.sternumBody'),
   refs:[{ref:'hss.1.3', location:'p5 "junction between manubrium and body of sternum"'},
         {ref:'hss.1.3', location:'p5 "vertebral level of T4/T5"'}]},

  {id:'xiphisternal', axis:'axial', label:'Xiphisternal joint',
   note:'Where the xiphoid process meets the body of the sternum, at the anterior end of the thoracic outlet.',
   at:(ctx)=>junctionY(ctx,'thorax.sternumBody','thorax.xiphoid'),
   refs:[{ref:'hss.1.3', location:'p13 "xiphoid process"'}]},

  {id:'transpyloric', axis:'axial', label:'Transpyloric (L1)',
   note:'The upper horizontal line of the nine abdominopelvic regions. Measured at the body of L1.',
   at:(ctx)=>centreY(ctx,'spine.L1'),
   refs:[{ref:'hss.3.3', location:'p3 "L1 - transpyloric"'}]},

  {id:'transtubercular', axis:'axial', label:'Transtubercular (L5)',
   note:'The lower horizontal line of the nine abdominopelvic regions. Measured at the body of L5.',
   at:(ctx)=>centreY(ctx,'spine.L5'),
   refs:[{ref:'hss.3.3', location:'p3 "L5 - transtubercular"'}]},

  {id:'median', axis:'sagittal', label:'Median plane',
   note:'The mid-sagittal plane, measured from the midline structures themselves — the vertebral column and the sternum — rather than assumed to be x = 0.',
   at:(ctx,G)=>(G&&Number.isFinite(G.medianX)?G.medianX:null),
   refs:[{ref:'hss.vocab', location:'p9 "Mid-sagittal/Median Plane"'}]},

  {id:'midclavRight', axis:'sagittal', label:'Mid-clavicular, right',
   note:'A vertical line dropped from the midpoint of the right clavicle. One of the two verticals of the nine-region grid.',
   at:(ctx,G)=>(G&&Number.isFinite(G.midclavicularX)?G.medianX-G.midclavicularX:null),
   refs:[{ref:'hss.3.3', location:'p3 "Mid-clavicular lines"'}]},

  {id:'midclavLeft', axis:'sagittal', label:'Mid-clavicular, left',
   note:'A vertical line dropped from the midpoint of the left clavicle. The other vertical of the nine-region grid.',
   at:(ctx,G)=>(G&&Number.isFinite(G.midclavicularX)?G.medianX+G.midclavicularX:null),
   refs:[{ref:'hss.3.3', location:'p3 "Mid-clavicular lines"'}]},
];

/*
 * A measured level, expressed as the 0..1 position setCut already takes.
 *
 * Going back through `t` rather than adding a second way to place a plane is
 * deliberate: the slider, the flip and the outline all keep working unchanged,
 * and a level becomes simply a way of ARRIVING at a position. cutPoint() is
 * the one place that maps t onto the body, so this inverts exactly that map
 * and the two cannot drift apart.
 */
function levelT(axis,M,v){
  if(!Number.isFinite(v)) return null;
  if(axis==='axial')    return M.H?(v-M.minY)/M.H:null;
  if(axis==='sagittal') return M.halfX?(((v-M.cx)/M.halfX)+1)/2:null;
  return null;
}
/* The grid's measurements. Only the sagittal levels need them. */
function levelGrid(){
  try{ return gridMetrics(); }catch(e){ return null; }
}
/*
 * Which levels can be offered right now.
 *
 * A level whose structure is not loaded is left out of the list rather than
 * listed and dead. The skeleton is always present, so the five axial levels
 * are always there; the two mid-clavicular lines need the grid to have
 * measured, and say nothing at all if it has not.
 */
export function cutLevels(){
  const ctx=(()=>{ try{ return cavityContext(); }catch(e){ return null; } })();
  if(!ctx) return [];
  const G=levelGrid();
  const M=bodyMetrics();
  const live=state.cut;
  return CUT_LEVELS.map((L)=>{
    const t=levelT(L.axis,M,L.at(ctx,G));
    if(t==null||t<0||t>1) return null;
    return {id:L.id, axis:L.axis, label:L.label, note:L.note, t,
      refs:(L.refs||[]).map((r)=>({...r})),
      active:!!(live&&live.level===L.id)};
  }).filter(Boolean);
}
/* Put the plane on a named level. The axis comes from the level, not the UI. */
export function setCutLevel(id,flip){
  const L=CUT_LEVELS.find((x)=>x.id===id);
  if(!L) return false;
  const row=cutLevels().find((r)=>r.id===id);
  if(!row){ showToast('That level needs a structure this model has not loaded.'); return false; }
  const on=flip==null?!!(state.cut&&state.cut.flip):!!flip;
  if(!setCut(L.axis,row.t,on)) return false;
  if(state.cut) state.cut.level=id;
  return true;
}

export function setCut(axis,t,flip){
  if(state.separation)setSeparation(0);
  const THREE=state.THREE;
  if(!THREE||!state.renderer){ showToast('Open the 3D model first.'); return false; }
  /*
   * Not while the projection is open. The x-ray pass integrates optical depth
   * by adding front faces and subtracting back faces, which only works on
   * CLOSED surfaces; a clipping plane opens every shell it passes through, so
   * the beam would leave the body through a hole that was never there and the
   * film would read densities that are simply wrong. See enterXray().
   */
  if(state.xray){ showToast('The projection reads through closed surfaces — section it in the 3D view.'); return false; }
  const spec=CUT_AXES.find((a)=>a.id===axis);
  if(!spec){ clearCut(); return false; }
  const M=bodyMetrics();
  const pos=Math.min(1,Math.max(0,t==null?0.5:t));
  const on=!!flip;
  const n=new THREE.Vector3(...spec.normal).multiplyScalar(on?-1:1);
  const p=new THREE.Vector3(...cutPoint(M,axis,pos));
  const local=new THREE.Plane().setFromNormalAndCoplanarPoint(n,p);
  state.cut={axis,t:pos,flip:on,local,world:state.cut&&state.cut.world?state.cut.world:new THREE.Plane()};
  const g=ensureToolGroup();
  if(state.cutFrame){ state.cutFrame.geometry.dispose(); state.cutFrame.material.dispose(); state.cutFrame.removeFromParent(); }
  state.cutFrame=cutFrame(M,axis,pos,on);
  if(g) g.add(state.cutFrame);
  syncCut();
  state.renderer.clippingPlanes=[state.cut.world];
  return true;
}
export function clearCut(){
  if(state.cutFrame){ state.cutFrame.geometry.dispose(); state.cutFrame.material.dispose(); state.cutFrame.removeFromParent(); state.cutFrame=null; }
  state.cut=null;
  if(state.renderer) state.renderer.clippingPlanes=[];
}
/* `level` is the named level the plane is currently ON, or null once the
   slider has been dragged off it -- setCut rebuilds state.cut from scratch,
   so the label cannot outlive the position it described. */
export function cutState(){ return state.cut?{axis:state.cut.axis,t:state.cut.t,flip:state.cut.flip,level:state.cut.level||null}:null; }

/* Body frame -> world, every frame, because the turntable never stops. */
function syncCut(){
  const root=bodyRoot();
  if(!state.cut||!root) return;
  state.cut.world.copy(state.cut.local).applyMatrix4(root.matrixWorld);
}

/* ------------------------------------------------------------------ *
 * Per-frame sync
 *
 * Called from animate(). Two jobs: keep the annotation group sitting exactly
 * on the body frame, and re-derive the world-space cut plane from it.
 * ------------------------------------------------------------------ */
export function syncTools(){
  const root=bodyRoot(), g=state.toolGroup;
  if(g&&root){
    g.position.setFromMatrixPosition(root.matrixWorld);
    g.quaternion.setFromRotationMatrix(root.matrixWorld);
    g.scale.setFromMatrixScale(root.matrixWorld);
    g.updateMatrixWorld(true);
  }
  syncCut();
}

/* Annotation (pen, pinned labels, notes) was removed on the reader's request.
   state.tool stays null; depth-picking and live-physiology still read it. */

/* Tell the Tools panel that something it shows (the spread) changed, when the
   change did not come from the panel itself. */
function notifyPanel(){
  if(state.toolHook) try{ state.toolHook({cut:cutState(),separation:separation()}); }catch(e){}
}

/* ------------------------------------------------------------------ *
 * Framing a region
 *
 * The "Models" panel of an atlas app loads a separate regional model. This one
 * body already carries every region, and the Region filter card already picks
 * between them — what it never did was MOVE, so choosing "Thoracic cage" left
 * you looking at a whole skeleton with most of it switched off. Framing is the
 * half that makes a filter feel like a model, so the region buttons call this
 * rather than a second panel being added beside them.
 * ------------------------------------------------------------------ */
export function frameRegion(){
  const THREE=state.THREE;
  if(!THREE||!state.camera||!state.controls) return false;
  const objs=state.fullMeshes.filter((o)=>o.visible!==false);
  if(!objs.length) return false;
  const box=new THREE.Box3();
  objs.forEach((o)=>box.expandByObject(o));
  if(box.isEmpty()) return false;
  const c=box.getCenter(new THREE.Vector3());
  const size=box.getSize(new THREE.Vector3());
  const radius=Math.max(size.x,size.y,size.z,.35);
  const dir=state.camera.position.clone().sub(state.controls.target).normalize();
  const dist=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*2.1));
  state.controls.target.copy(c);
  state.camera.position.copy(c).add(dir.multiplyScalar(dist));
  state.controls.update();
  return true;
}

/* ------------------------------------------------------------------ *
 * Separating the layers
 *
 * Seven files occupy one body, so by design they are inside each other and
 * whichever is outermost hides the rest. The opacity rows above answer that
 * by making a layer see-through; this answers it by moving the layer out of
 * the way instead, which is the one thing fading cannot do. A ghosted muscle
 * is still drawn over the bone it covers, and a ghosted vessel tree over a
 * ghosted muscle over a ghosted lung is a fog with nothing readable in it.
 *
 * THE SKELETON DOES NOT MOVE, and that is load-bearing rather than tidy. It
 * is the frame everything else is measured through -- cavityContext takes the
 * skeleton pivot's inverse, bodyMetrics prefers state.fullMeshes, and every
 * pin and callout is stored in that frame. Holding rank 0 still means the
 * body's metrics read exactly the same separated as assembled, so nothing
 * already on the model drifts while the layers fan out.
 *
 * The order is the LAYER RAIL's order and is not a claim about depth. Vessels
 * and nerves each run both superficial and deep, so no one number is their
 * depth; the honest thing is to lay them out in the order the reader already
 * scans the chips in, sideways where no depth is implied, and to say in the
 * panel that that is what it is.
 *
 * The offset goes on each layer's ROOT, never on its meshes. Mesh positions
 * belong to the highlight machinery -- clearHighlight() puts every mesh back
 * to userData.basePosition on the next selection -- so a separation written
 * there would survive exactly until the reader tapped something.
 * ------------------------------------------------------------------ */

/* Rail order, from outputs/systems.js. The skeleton is not in the fan. */
export const SEPARATION_ORDER=['muscle','joint','organs','circulatory','nervous','lymphatic'];
/*
 * Body units per slot at full spread. The shared frame is 11.8 units tall,
 * which puts the body at roughly 4.6 across the shoulders, so 2.4 opens the
 * first pair just clear of the arms.
 */
export const SEPARATION_STEP=2.4;

export function separation(){ return state.separation||0; }

/*
 * Which way, and how far, each loaded layer goes.
 *
 * SIDEWAYS, alternating about the midline, and that is a decision the first
 * version got wrong: it fanned along +z, anterior, which is the meaningful
 * axis anatomically and completely invisible from the view the app opens in.
 * The stage looks straight at the front of the body, so six layers sliding
 * toward the camera stayed in exactly the same silhouette -- a slider that
 * did nothing until you thought to orbit. Captured at full spread and
 * compared against the assembled body, the two pictures were the same body.
 *
 * Sideways reads from the default camera and from a lateral orbit both, it
 * stays balanced about the midline so the still skeleton is still the middle
 * of the picture, and it claims nothing: an anterior fan implies a depth
 * order these layers do not have, whereas a specimen laid out on a bench
 * beside the body is plainly a display.
 *
 * Slots are counted over the layers ACTUALLY LOADED, not over the fixed list.
 * With muscles and nerves on, a fixed list gives them slots 1 and 5 and puts
 * two body-widths of nothing between them.
 */
function separationSlots(){
  const loaded=SEPARATION_ORDER.filter((k)=>state.extraModels&&state.extraModels[k]);
  const out=new Map();
  loaded.forEach((key,i)=>{
    const step=Math.floor(i/2)+1;              /* 1,1,2,2,3,3 */
    out.set(key,(i%2?-1:1)*step);              /* left, right, left, right */
  });
  return out;
}

/*
 * Idempotent, and deliberately so: loadExtraModel calls it again for every
 * layer switched on, which both re-slots the fan for its new member and puts
 * that member straight into it rather than at the midline until the slider is
 * touched. Each root's home x is captured before it is first moved and every
 * write is home + offset, so re-running never accumulates.
 *
 * Deliberately NOT driven from the animate loop, which is where this started.
 * animate() returns early whenever the stage is not on screen, so a guard
 * hung there is a guard that silently stops guarding -- the smoke test caught
 * exactly that, with the projection failing to collapse a standing fan.
 */
export function applySeparation(){
  const t=state.separation||0;
  if(state.spreadMode==='pieces'){
    if(t>0)applyPackedSpread(t);else endPackedSpread();
    return;
  }
  const slots=separationSlots();
  Object.entries(state.extraModels||{}).forEach(([key,m])=>{
    const root=m&&m.root;
    if(!root) return;
    if(root.userData.homeX===undefined) root.userData.homeX=root.position.x;
    root.position.x=root.userData.homeX+(slots.get(key)||0)*SEPARATION_STEP*t;
  });
}

export function setSeparation(v){
  const t=Math.max(0,Math.min(1,Number(v)||0));
  /*
   * The projection is a radiograph: it sums attenuation along one axis
   * through the assembled body. Separated, it would still produce a
   * confident-looking image, of a patient whose lungs are in front of their
   * chest wall. Refused rather than allowed to lie.
   */
  if(state.xray&&t>0){ showToast('The projection needs the body assembled.'); return separation(); }
  if(t>0&&state.movement)endMovement();
  const was=state.separation||0;
  if(t>0&&was===0){clearCut();}
  state.separation=t;
  if(t!==was){
    /*
     * Every derived shape in the app is measured off the assembled body, and
     * meshPointsLocal CACHES those vertices per mesh for the life of the
     * session. Building a cavity from a separated body would not just draw
     * one wrong overlay -- it would poison the cache with vertices that stay
     * wrong after the layers come back together. So the caches go, and any
     * overlay standing on them goes with them.
     */
    state._cavPts=null;
    state._cavCtx=null;
    if(t>0) clearConcepts();
    /*
     * The panel is not always the one that moved this. showConcept collapses
     * the fan to measure a cavity, and the projection collapses it from the
     * frame loop; without this the slider keeps reading 60% over a body that
     * is back together, which makes the reader doubt the model rather than
     * the control.
     */
  }
  applySeparation();
  if(t!==was)notifyPanel();
  return t;
}

export function setSpreadMode(mode){
  if(!['pieces','layers'].includes(mode))return;
  setSeparation(0);
  restorePackedSpread();
  state.spreadMode=mode;
  notifyPanel();
}

/* ------------------------------------------------------------------ *
 * Capture
 *
 * The canvas is not created with preserveDrawingBuffer, so the pixels are only
 * readable inside the same task that drew them — render, then read, with
 * nothing awaited in between. The x-ray view renders through its own path, so
 * capture asks it first exactly as the animate loop does, or a capture taken
 * on the projection tab comes back as the 3D scene.
 * ------------------------------------------------------------------ */
export function snapshot(){
  if(!state.renderer||!state.scene||!state.camera) return null;
  try{
    if(!renderXray()) state.renderer.render(state.scene,state.camera);
    return state.renderer.domElement.toDataURL('image/png');
  }catch(e){ return null; }
}

export function init(){
  state.separation=0;
  state.spreadMode='pieces';
  if(typeof window==='undefined'||!window.__osteo) return;
  Object.assign(window.__osteo,{
    cutAxes:()=>CUT_AXES.map((a)=>({id:a.id,label:a.label,hint:a.hint})),
    /* the anatomical levels that measured against THIS model, with their pages */
    cutLevels:()=>cutLevels(),
    setCutLevel:(id,flip)=>setCutLevel(id,flip),
    setCut:(axis,t,flip)=>setCut(axis,t,flip),
    clearCut:()=>clearCut(),
    cutState:()=>cutState(),
    setToolHook:(fn)=>{state.toolHook=fn||null},
    snapshot:()=>snapshot(),
    separation:()=>separation(),
    setSeparation:(v)=>setSeparation(v),
    setSpreadMode:(mode)=>setSpreadMode(mode),
    spreadMode:()=>state.spreadMode||'pieces',
  });
}
