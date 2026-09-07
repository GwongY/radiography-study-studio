/*
 * Cavity geometry, derived from the loaded anatomy.
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { BODY_CONCEPTS, boundsOf, buildCavityGeometry, conceptLeaves, createResolver, gridBounds, measureGrid, measureLandmarks, state } from './imports.js';
import { answer } from './visualisation-modes.js';
import { between } from './region-boxes-how.js';
import { calloutAt, labelSprite } from './spatial-concept-overlays.js';
import { meshesFor } from './search-viewer-frame.js';

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
export function layerSignature(){
  return [state.fullMeshes.length?'skeleton':'',
    ...Object.keys(state.extraModels||{}).sort()].filter(Boolean).join(',');
}

/*
 * The build context: a landmark resolver over every loaded mesh, plus lazy
 * access to their vertices. Meshes are named but not yet measured -- only the
 * landmarks a builder actually asks for get their points extracted.
 */
export function cavityContext(){
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
export function cavityStyle(){ return CAVITY_STYLE[state.cavityMode||'normal']||CAVITY_STYLE.normal; }
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
export function buildCavity(c,M,grp){
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
export function buildPlane(c,M,grp){
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
export function gridMetrics(){
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
export function buildCellGrid(kind,emphId,M,grp){
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
