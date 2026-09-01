/*
 * Spatial concept overlays -- cavities, regions, quadrants, planes.
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, state } from './imports.js';
import { animate, between, tube } from './region-boxes-how.js';
import { answer, clean, disposeConceptObj, pool } from './visualisation-modes.js';
import { cavityContext } from './cavity-geometry-derived.js';
import { pick } from './depth-picking.js';

/* ------------------------------------------------------------------ *
 * Spatial concept overlays -- cavities, regions, quadrants, planes.
 * Drawn procedurally, sized to the rendered body's bounding box, never
 * from a GLB. See bodymap.js for the fractions.
 * ------------------------------------------------------------------ */
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
export function bodyMetrics(){
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
export function labelSprite(text,color,hud){
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
export function updateHudSprites(){
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
export function calloutAt(anchor,text,color,M,opts){
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
export function clearPickCallout(){
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
export function showPickCallout(obj,text){
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

export function ensureConceptGroup(){
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

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  state.concepts = new Set();          /* ids currently shown */
  state.conceptGroup = null;
}
