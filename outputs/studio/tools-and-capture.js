/*
 * Tools — section cuts, surface ink, pinned labels, capture.
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
import { bodyMetrics, calloutAt } from './spatial-concept-overlays.js';
import { cavityContext, gridMetrics } from './cavity-geometry-derived.js';
import { getRecord } from './region-boxes-how.js';
import { showToast } from './visualisation-modes.js';
import { renderXray } from './live-physiology.js';

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

/* ------------------------------------------------------------------ *
 * The annotation stack
 *
 * Ink strokes and pins go on one stack so a single Undo means "take back the
 * last thing I did", which is what an undo button is for. Pins also hold a
 * band reservation — calloutAt slides a tag down past the tags already on that
 * side — so undoing a pin has to release its band or the next one starts lower
 * than it should.
 * ------------------------------------------------------------------ */
function annots(){ return state.annots||(state.annots=[]); }
function bands(){ return state.pinBands||(state.pinBands=[]); }

function dropObjects(objs){
  objs.forEach((o)=>{
    o.removeFromParent();
    if(o.geometry) o.geometry.dispose();
    const m=o.material;
    if(m){ if(m.map) m.map.dispose(); m.dispose(); }
  });
}
export function undoAnnotation(){
  const st=annots();
  const last=st.pop();
  if(!last) return false;
  dropObjects(last.objs);
  if(last.band){
    const i=bands().indexOf(last.band);
    if(i>=0) bands().splice(i,1);
  }
  return true;
}
export function clearAnnotations(){
  annots().forEach((a)=>dropObjects(a.objs));
  state.annots=[];
  state.pinBands=[];
}
export function annotationCount(){ return annots().length; }

/* ------------------------------------------------------------------ *
 * Pins — a structure's own name, or one of yours
 *
 * calloutAt already knows how to put a tag beside the body with a leader back
 * to the point it names, how to pick a side, and how to stack tags without
 * overlapping. A pin is one of those, kept.
 * ------------------------------------------------------------------ */
function pinAt(anchor,text,color){
  const g=ensureToolGroup();
  if(!g) return false;
  const M=bodyMetrics();
  const taken=bands();
  const before=taken.length;
  /* Clear the silhouette — a tag lying across the ribs names nothing — but
     stay inside a framed close-up, which is what maxReach is for. */
  const objs=calloutAt(anchor,text,color,M,{clear:M.halfX*0.95,maxReach:M.halfX*1.55,taken,size:0.026});
  objs.forEach((o)=>g.add(o));
  annots().push({kind:'pin',objs,band:taken.length>before?taken[taken.length-1]:null});
  return true;
}

/* ------------------------------------------------------------------ *
 * Ink — a pen that draws on the anatomy, not on the glass
 *
 * Each sample is raycast onto whatever surface is under the pointer and stored
 * in the body frame, lifted a hair along the hit normal so the line reads as
 * being ON the structure rather than inside it. Rotate the model afterwards
 * and the stroke turns with the part you drew it on.
 *
 * One honest limit: the raycaster does not know about the clipping plane, so
 * with a cut open the pen can land on a surface the cut has removed. Draw
 * first, cut second.
 * ------------------------------------------------------------------ */
function inkTargets(){
  const layers=Object.entries(state.extraModels||{})
    .filter(([k])=>state.layers&&state.layers[k])
    .flatMap(([,m])=>m.meshes||[]);
  return [...state.fullMeshes,...layers].filter((o)=>o.visible!==false);
}
function surfaceHit(event){
  const THREE=state.THREE;
  if(!THREE||!state.renderer||!state.camera) return null;
  const rect=state.renderer.domElement.getBoundingClientRect();
  state.pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
  state.pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
  state.raycaster.setFromCamera(state.pointer,state.camera);
  const hits=state.raycaster.intersectObjects(inkTargets(),true);
  return hits.length?hits[0]:null;
}
/* World point -> body frame, the one conversion every annotation goes through. */
function toBody(v){
  const THREE=state.THREE, root=bodyRoot();
  const out=v.clone();
  if(root) out.applyMatrix4(new THREE.Matrix4().copy(root.matrixWorld).invert());
  return out;
}
function inkPoint(hit,M){
  const THREE=state.THREE;
  const p=hit.point.clone();
  if(hit.face&&hit.object){
    const n=hit.face.normal.clone()
      .applyMatrix3(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).normalize();
    p.add(n.multiplyScalar(M.H*0.006));
  }
  return toBody(p);
}
function startStroke(hit){
  const THREE=state.THREE;
  const g=ensureToolGroup();
  if(!g) return null;
  const M=bodyMetrics();
  const pts=[inkPoint(hit,M)];
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const line=new THREE.Line(geo,new THREE.LineBasicMaterial({
    color:0xffba67,transparent:true,opacity:0.95,depthTest:false,depthWrite:false}));
  line.renderOrder=996;
  g.add(line);
  state.stroke={line,pts,M};
  return line;
}
function extendStroke(hit){
  const s=state.stroke;
  if(!s) return;
  const p=inkPoint(hit,s.M);
  const last=s.pts[s.pts.length-1];
  if(last&&p.distanceTo(last)<s.M.H*0.002) return;   /* don't pile samples on one spot */
  s.pts.push(p);
  s.line.geometry.dispose();
  s.line.geometry=new state.THREE.BufferGeometry().setFromPoints(s.pts);
}
/*
 * A finished stroke becomes a tube, not a line.
 *
 * WebGL ignores LineBasicMaterial.linewidth on every desktop driver, so a
 * stroke drawn as a Line is one hairline pixel wide however far you zoom in —
 * it was there on the sternum and you could not see it. The Line stays as the
 * live preview because it is free to rebuild on every pointermove; the moment
 * the stroke ends it is swapped for a tube of real thickness, which is also
 * the point at which depth testing can come back on: ink lying on a bone
 * should disappear when you turn that bone away from you.
 */
function finishStroke(s){
  const THREE=state.THREE;
  try{
    const curve=new THREE.CatmullRomCurve3(s.pts);
    const geo=new THREE.TubeGeometry(curve,Math.min(400,s.pts.length*2),s.M.H*0.0035,6,false);
    const tube=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xffba67}));
    tube.renderOrder=996;
    const g=ensureToolGroup();
    if(!g) return null;
    g.add(tube);
    dropObjects([s.line]);
    return tube;
  }catch(e){ return s.line; }   /* a degenerate curve keeps the hairline */
}
function endStroke(){
  const s=state.stroke;
  state.stroke=null;
  if(!s) return;
  if(s.pts.length<2){ dropObjects([s.line]); return; }
  const obj=finishStroke(s);
  if(!obj) return;
  annots().push({kind:'ink',objs:[obj]});
  publishTool();
}

/* ------------------------------------------------------------------ *
 * Arming a tool
 *
 * While a tool is armed the stage stops being a selector: depth-picking's
 * pointerup handler checks state.tool and steps aside, and orbit is suspended
 * for the pen so a stroke does not also spin the body.
 * ------------------------------------------------------------------ */
export const TOOLS={
  off:{label:'Off'},
  pen:{label:'Pen',hint:'Drag on a structure to draw on it.'},
  label:{label:'Label',hint:'Tap a structure to pin the name it is taught under.'},
  note:{label:'Note',hint:'Tap a structure to pin your own text to it.'},
};
export function setTool(id){
  const next=TOOLS[id]?id:'off';
  state.tool=next==='off'?null:next;
  /*
   * The pen takes the whole surface, orbit included.
   *
   * The first version left OrbitControls enabled and captured the pointer on
   * the stage instead. That silently broke the controls: OrbitControls calls
   * setPointerCapture on the CANVAS in its own pointerdown, so a second
   * capture on the stage (the canvas's parent) meant its pointerup never
   * fired, its `pointers` list kept a stale id, and the NEXT pointerup read
   * `pointerPositions[staleId].x` off undefined — an exception thrown from
   * inside the library, on a later gesture, with nothing pointing back here.
   * Two capture owners for one pointer is the bug; one is the fix. Disarm the
   * pen to orbit again — the badge on the stage says which tool holds it.
   */
  if(state.controls) state.controls.enabled=state.tool!=='pen';
  if(els.stage) els.stage.classList.toggle('tooling',!!state.tool);
  publishTool();
  return state.tool;
}
export function toolState(){ return state.tool||'off'; }
export function setNoteText(t){ state.noteText=String(t||'').slice(0,90); }
function publishTool(){
  if(state.toolHook) try{ state.toolHook({tool:toolState(),annotations:annotationCount(),cut:cutState()}); }catch(e){}
}

function bindStage(){
  const stage=els.stage;
  if(!stage||stage.dataset.toolsBound==='1') return;
  stage.dataset.toolsBound='1';
  stage.addEventListener('pointerdown',(e)=>{
    if(!state.tool) return;
    if(state.tool==='pen'){
      const hit=surfaceHit(e);
      if(!hit){ showToast('Start the stroke on a structure.'); return; }
      startStroke(hit);
    }
  });
  stage.addEventListener('pointermove',(e)=>{
    if(state.tool!=='pen'||!state.stroke) return;
    const hit=surfaceHit(e);
    if(hit) extendStroke(hit);
  });
  const finish=()=>{ if(state.stroke) endStroke(); };
  stage.addEventListener('pointerup',(e)=>{
    if(!state.tool) return;
    if(state.tool==='pen'){ finish(); return; }
    const hit=surfaceHit(e);
    if(!hit){ showToast('Tap a structure to pin it.'); return; }
    const M=bodyMetrics();
    const anchor=inkPoint(hit,M);
    if(state.tool==='label'){
      const id=hit.object.userData&&hit.object.userData.canonicalId;
      const rec=id?getRecord(id):null;
      const name=(rec&&rec.canonicalName)||(hit.object.userData&&hit.object.userData.label)||'Unnamed structure';
      pinAt(anchor,String(name).replace(/_/g,' '),0x72e3cf);
    }else{
      const text=state.noteText;
      if(!text){ showToast('Type the note first, then tap the structure.'); return; }
      pinAt(anchor,text,0xffba67);
    }
    publishTool();
  });
  stage.addEventListener('pointercancel',finish);
  stage.addEventListener('pointerleave',finish);
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
  bindStage();
  if(typeof window==='undefined'||!window.__osteo) return;
  Object.assign(window.__osteo,{
    cutAxes:()=>CUT_AXES.map((a)=>({id:a.id,label:a.label,hint:a.hint})),
    /* the anatomical levels that measured against THIS model, with their pages */
    cutLevels:()=>cutLevels(),
    setCutLevel:(id,flip)=>setCutLevel(id,flip),
    setCut:(axis,t,flip)=>setCut(axis,t,flip),
    clearCut:()=>clearCut(),
    cutState:()=>cutState(),
    setTool:(id)=>setTool(id),
    toolState:()=>toolState(),
    tools:()=>Object.entries(TOOLS).filter(([k])=>k!=='off').map(([id,t])=>({id,label:t.label,hint:t.hint})),
    setNoteText:(t)=>setNoteText(t),
    undoAnnotation:()=>undoAnnotation(),
    clearAnnotations:()=>clearAnnotations(),
    annotationCount:()=>annotationCount(),
    setToolHook:(fn)=>{state.toolHook=fn||null},
    snapshot:()=>snapshot(),
  });
}
