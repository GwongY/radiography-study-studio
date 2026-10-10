/*
 * Spatial concept overlays -- cavities, regions, quadrants, planes.
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { viewerStructureName } from '../search-name.js';
import { BONE_LANDMARKS, boneLandmarkKey, surfaceLandmarks } from '../bone-landmarks.js';
import { anatomicalMatrix } from './packed-spread.js';
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
      m4.multiplyMatrices(inv,anatomicalMatrix(o));
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
  const lines=String(text).split('\n').flatMap(line=>line.match(/.{1,30}(?:\s|$)|.{1,30}/g)||['']).map(line=>line.trim());
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
  /*
   * state.THREE is set by prepareFullReference, which runs when the skeleton
   * finishes loading -- but the frame loop starts as soon as the camera exists.
   * So there is a window every single time the viewer opens where cam is truthy
   * and state.THREE is not, and `new state.THREE.Vector3()` threw through all
   * of it: thousands of uncaught TypeErrors per viewer open, invisible unless
   * you had the console up.
   *
   * The cost is not the noise. This runs on the same line as
   * state.renderer.render(), BEFORE it, so the throw pre-empted the draw --
   * and if a model ever fails to load, state.THREE is never set, this throws
   * on every frame forever, and the retryable fallback the About dialog
   * promises is never reached. A dead black viewport and no way to tell why.
   *
   * Guard the thing actually used, not just the camera.
   */
  if(!cam||!state.THREE) return;
  state.scene?.updateMatrixWorld(true);
  const tan=Math.tan(cam.fov*Math.PI/360);
  const p=state._hudVec||(state._hudVec=new state.THREE.Vector3());
  const walk=(grp)=>{
  if(!grp||!grp.children.length) return;
  grp.traverse((o)=>{
    const attachment=o.userData?.meshAttachment;
    if(attachment){
      const {mesh,local,origin,base,root}=attachment;
      const point=local.clone().applyMatrix4(mesh.matrixWorld);
      if(root) point.applyMatrix4(new state.THREE.Matrix4().copy(root.matrixWorld).invert());
      o.position.copy(base).add(point.sub(origin));
    }
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
  walk(state.toolGroup); // Pinned annotations need the same aspect-preserving HUD sizing.
  walk(state.pickGroup);      /* the selection callout obeys the same band */
  updateBoneLandmarks();
}

/* ------------------------------------------------------------------ *
 * Bone landmarks in a close view
 *
 * Positions belong to a specific, verified vertex of the current skeleton.
 * Only the final projection and label packing are in screen coordinates.
 * Reprojecting from mesh.matrixWorld keeps the leader on the exact feature
 * through orbit, zoom, highlighting and the per-piece spread parents.
 * ------------------------------------------------------------------ */
function boneLabelOverlay(){
  if(state.boneLabelOverlay?.host.isConnected)return state.boneLabelOverlay;
  const stage=$('stage');if(!stage)return null;
  const host=document.createElement('div');host.className='bone-landmarks';
  host.id='boneLandmarkLabels';host.setAttribute('aria-label','Bone landmarks');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('aria-hidden','true');host.append(svg);
  const note=document.createElement('p');note.className='bone-landmark-note';
  note.textContent='Landmark labels are not mapped for this bone yet.';host.append(note);
  const key=document.createElement('p');key.className='bone-landmark-key';
  key.textContent='Dashed leaders: far side or inside';host.append(key);
  const controls=document.createElement('div');controls.className='bone-landmark-controls';
  const toggle=document.createElement('button');toggle.type='button';toggle.className='bone-landmark-toggle';
  toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','boneLandmarkMenu');
  const menu=document.createElement('div');menu.id='boneLandmarkMenu';menu.className='bone-landmark-menu';
  menu.hidden=true;menu.setAttribute('aria-label','Choose a bone landmark');
  controls.append(toggle,menu);host.append(controls);
  stage.append(host);
  const overlay=state.boneLabelOverlay={host,svg,note,key,controls,toggle,menu,mesh:null,points:[],pose:'',close:false};
  const closeMenu=()=>{menu.hidden=true;host.classList.remove('choosing');toggle.setAttribute('aria-expanded','false');overlay.pose='';};
  toggle.onclick=()=>{menu.hidden=!menu.hidden;host.classList.toggle('choosing',!menu.hidden);toggle.setAttribute('aria-expanded',String(!menu.hidden));overlay.pose='';updateBoneLandmarks();};
  controls.addEventListener('pointerdown',e=>e.stopPropagation());
  controls.addEventListener('click',e=>e.stopPropagation());
  controls.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle.focus();updateBoneLandmarks();}});
  stage.addEventListener('pointerdown',e=>{if(!controls.contains(e.target)&&!menu.hidden){closeMenu();updateBoneLandmarks();}});
  return overlay;
}
function landmarkVisible(mesh){
  for(let p=mesh;p;p=p.parent)if(!p.visible)return false;
  return true;
}
function prepareBoneLabels(overlay,mesh){
  overlay.mesh=mesh;overlay.pose='';overlay.points=[];overlay.close=false;overlay.activeName=null;
  overlay.menu.hidden=true;overlay.host.classList.remove('choosing','all-parts');overlay.toggle.setAttribute('aria-expanded','false');overlay.menu.replaceChildren();
  overlay.host.querySelectorAll('.bone-landmark-label').forEach(e=>e.remove());
  overlay.svg.replaceChildren();
  const T=state.THREE,attr=mesh.geometry.attributes.position;
  const key=boneLandmarkKey(mesh.userData.label||mesh.name,mesh.userData.side);
  const spec=BONE_LANDMARKS[key];
  const points=surfaceLandmarks(key,attr.count,i=>new T.Vector3().fromBufferAttribute(attr,i).toArray());
  const markers=points.map(p=>({...p,locals:[p,...(p.alternates||[])].map(a=>new T.Vector3().fromBufferAttribute(attr,a.vertex))}));
  for(const p of spec?.points||[]){
    if(!p.part)continue;
    const part=state.fullMeshes.find(m=>boneLandmarkKey(m.userData.label||m.name,m.userData.side)===p.part);
    if(!part)continue;
    // Measure the actual sinus in assembled anatomy, then carry its interior
    // location with the host bone when that bone becomes a spread specimen.
    part.geometry.computeBoundingBox();
    const center=part.geometry.boundingBox.getCenter(new T.Vector3()).applyMatrix4(anatomicalMatrix(part));
    const local=center.applyMatrix4(new T.Matrix4().copy(anatomicalMatrix(mesh)).invert());
    markers.push({...p,locals:[local],partMesh:part});
  }
  // One named feature has one tag, including alternate vertices for its faces.
  const unique=[...new Map(markers.map(p=>[p.name.toLowerCase().trim(),p])).values()];
  overlay.primaryNames=new Set(spec?.primaryNames||unique.slice(0,5).map(p=>p.name));
  overlay.toggle.textContent=`Parts · ${unique.length}`;overlay.controls.hidden=!unique.length;
  const choose=name=>{
    overlay.activeName=name;overlay.menu.hidden=true;overlay.host.classList.remove('choosing');overlay.toggle.setAttribute('aria-expanded','false');
    overlay.host.classList.toggle('all-parts',name==='*');
    overlay.menu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.landmarkChoice||null)===name)));
    overlay.pose='';updateBoneLandmarks();overlay.toggle.focus();
  };
  const main=document.createElement('button');main.type='button';main.textContent='Main landmarks';
  main.setAttribute('aria-pressed','true');main.onclick=()=>choose(null);overlay.menu.append(main);
  const all=document.createElement('button');all.type='button';all.textContent='Show all parts';
  all.dataset.landmarkChoice='*';all.setAttribute('aria-pressed','false');all.onclick=()=>choose('*');overlay.menu.append(all);
  for(const marker of unique){
    const label=document.createElement('span');label.className='bone-landmark-label';
    label.textContent=marker.name+(marker.inside?' · inside':'');
    label.dataset.landmark=marker.name;
    overlay.host.append(label);
    const line=document.createElementNS('http://www.w3.org/2000/svg','path');
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('r','3');
    if(marker.inside)line.setAttribute('stroke-dasharray','3 3');
    overlay.svg.append(line,dot);
    overlay.points.push({...marker,label,line,dot});
    const choice=document.createElement('button');choice.type='button';choice.textContent=marker.name;
    choice.dataset.landmarkChoice=marker.name;choice.setAttribute('aria-pressed','false');
    choice.onclick=()=>choose(marker.name);overlay.menu.append(choice);
  }
}
function boneLabelOutline(mesh,cam,rect){
  const T=state.THREE,attr=mesh.geometry.attributes.position,vertices=[];
  const v=new T.Vector3();
  for(let i=0;i<attr.count;i++){
    v.fromBufferAttribute(attr,i).applyMatrix4(mesh.matrixWorld).project(cam);
    if(v.z>=-1&&v.z<=1)vertices.push({x:(v.x+1)*rect.width/2,y:(1-v.y)*rect.height/2});
  }
  vertices.sort((a,b)=>a.x-b.x||a.y-b.y);
  const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
  const half=rows=>{const h=[];for(const p of rows){while(h.length>1&&cross(h[h.length-2],h[h.length-1],p)<=0)h.pop();h.push(p);}h.pop();return h;};
  const hull=[...half(vertices),...half(vertices.slice().reverse())];
  const axes=[{x:1,y:0},{x:0,y:1}];
  for(let i=0;i<hull.length;i++){
    const a=hull[i],b=hull[(i+1)%hull.length],length=Math.hypot(b.x-a.x,b.y-a.y);
    if(length)axes.push({x:(a.y-b.y)/length,y:(b.x-a.x)/length});
  }
  return hull.length<3?null:axes.map(a=>({...a,min:Math.min(...hull.map(p=>p.x*a.x+p.y*a.y)),max:Math.max(...hull.map(p=>p.x*a.x+p.y*a.y))}));
}
function placeBoneLabels(points,frame,box,outline){
  // Tags travel with their feature, instead of joining fixed margin queues.
  // Search locally first; dense Show all views can use more of the canvas.
  const cx=(box.minX+box.maxX)/2,cy=(box.minY+box.maxY)/2;
  const minGap=frame.right-frame.left<500?32:46;
  const leader=(r,p)=>{
    const side=r.lx+r.width/2>=p.x?1:-1;
    const edge=side===1?r.lx:r.lx+r.width;
    const run=(edge-p.x)*side,tail=28;
    const rise=Math.max(8,(run-tail)*Math.tan(22*Math.PI/180));
    const options=[r.ly+r.height/2,p.y+rise,p.y-rise]
      .map(y=>({x:edge,y:Math.max(r.ly+6,Math.min(r.ly+r.height-6,y))}));
    for(const q of options){
      const rise=Math.abs(q.y-p.y);
      // A visible incline, then an exposed tail: a bend of 145-170 degrees.
      if(run-tail>2&&rise>=8&&rise>=(run-tail)*Math.tan(10*Math.PI/180)
        &&rise<=(run-tail)*Math.tan(35*Math.PI/180))
        return {...q,elbow:q.x-side*tail};
    }
    return null;
  };
  const nearBone=r=>outline&&outline.every(a=>{
    const center=(r.lx+r.width/2)*a.x+(r.ly+r.height/2)*a.y;
    const radius=r.width/2*Math.abs(a.x)+r.height/2*Math.abs(a.y)+12;
    return center+radius>=a.min&&center-radius<=a.max;
  });
  const overlap=(a,b,gap=4)=>a.lx<b.lx+b.width+gap&&a.lx+a.width+gap>b.lx
    &&a.ly<b.ly+b.height+gap&&a.ly+a.height+gap>b.ly;
  const crossesTag=(r,q)=>{
    const route=leader(r,r.p);if(!route)return false;
    return route.y>q.ly-2&&route.y<q.ly+q.height+2
      &&Math.max(route.x,route.elbow)>q.lx-2&&Math.min(route.x,route.elbow)<q.lx+q.width+2;
  };
  const compatible=(r,q)=>!overlap(r,q)&&!crossesTag(r,q)&&!crossesTag(q,r);
  const place=order=>{
    const placed=[];
    for(const p of order){
      let best=null,score=Infinity;
      const consider=(x,y)=>{
        const r={lx:Math.max(frame.left,Math.min(frame.right-p.width,x-p.width/2)),
          ly:Math.max(frame.top,Math.min(frame.bottom-p.height,y-p.height/2)),width:p.width,height:p.height,p};
        if(placed.some(q=>!compatible(r,q))||points.some(q=>q.x>r.lx-7&&q.x<r.lx+r.width+7&&q.y>r.ly-7&&q.y<r.ly+r.height+7))return;
        const dx=r.lx+p.width/2-p.x,dy=r.ly+p.height/2-p.y;
        const edgeX=Math.max(r.lx,Math.min(r.lx+r.width,p.x)),edgeY=Math.max(r.ly,Math.min(r.ly+r.height,p.y));
        const distance=(edgeX-p.x)**2+(edgeY-p.y)**2;
        if(distance<minGap**2)return;
        if(points.length===1&&distance>=250**2)return;
        if(!leader(r,p))return;
        const stay=p.tagOffset?((dx-p.tagOffset.x)**2+(dy-p.tagOffset.y)**2)*.12:0;
        const cost=distance+(dx*dx+dy*dy)*.03+stay+(nearBone(r)?100000:0);
        if(cost<score){score=cost;best=r;}
      };
      if(p.tagOffset)consider(p.x+p.tagOffset.x,p.y+p.tagOffset.y);
      const bearing=Math.atan2(p.y-cy,p.x-cx);
      for(let gap=minGap;gap<=300;gap+=24)for(let i=0;i<12;i++){
        const angle=bearing+i*Math.PI/6;
        consider(p.x+Math.cos(angle)*(p.width/2+gap),p.y+Math.sin(angle)*(p.height/2+gap));
      }
      // Use the actual free edges as well as the radial samples. This avoids
      // wasting narrow gaps when a phone canvas wraps a long name.
      for(const q of placed)for(const x of [q.lx-p.width/2-4,q.lx+q.width+p.width/2+4,q.lx+p.width/2])
        for(const y of [q.ly-p.height/2-4,q.ly+q.height+p.height/2+4,q.ly+p.height/2])consider(x,y);
      for(const q of points)for(const y of [q.y-7.1-p.height/2,q.y+7.1+p.height/2])
        for(const x of [frame.left+p.width/2,frame.right-p.width/2,p.x-p.width/2-50,p.x+p.width/2+50])consider(x,y);
      if(!best)for(let y=frame.top+p.height/2;y<=frame.bottom-p.height/2;y+=12)
        for(let x=frame.left+p.width/2;x<=frame.right-p.width/2;x+=12)consider(x,y);
      if(!best)continue;
      placed.push(best);
    }
    return placed;
  };
  const orders=[points.slice().sort((a,b)=>b.width*b.height-a.width*a.height),
    points.slice().sort((a,b)=>a.y-b.y),points.slice().sort((a,b)=>b.y-a.y)];
  for(let seed=1;seed<=12;seed++)orders.push(points.slice().sort((a,b)=>{
    const rank=p=>Math.sin((points.indexOf(p)+1)*seed*17.31)*10000;
    return rank(a)-rank(b);
  }));
  let placed=[];
  for(const order of orders){const attempt=place(order);if(attempt.length>placed.length)placed=attempt;if(placed.length===points.length)break;}
  if(placed.length<points.length){
    // Dense views need to reserve the few usable slots near edge pins before
    // less constrained tags take them. Backtrack over real, legal placements.
    const choices=new Map();
    for(const p of points){
      const options=[];
      const xs=[frame.right-p.width],ys=[frame.bottom-p.height];
      for(let lx=frame.left;lx<=frame.right-p.width;lx+=8)xs.push(lx);
      for(let ly=frame.top;ly<=frame.bottom-p.height;ly+=8)ys.push(ly);
      for(const q of points)ys.push(q.y+7.1,q.y-7.1-p.height);
      for(const ly of ys.filter(y=>y>=frame.top&&y<=frame.bottom-p.height))
        for(const lx of xs){
          const r={lx,ly,width:p.width,height:p.height,p};
          if(!leader(r,p)||points.some(q=>q.x>lx-7&&q.x<lx+p.width+7&&q.y>ly-7&&q.y<ly+p.height+7))continue;
          const distance=(Math.max(lx,Math.min(lx+p.width,p.x))-p.x)**2
            +(Math.max(ly,Math.min(ly+p.height,p.y))-p.y)**2;
          if(distance<minGap**2||points.length===1&&distance>=250**2)continue;
          options.push({...r,cost:distance});
        }
      choices.set(p,options.sort((a,b)=>a.cost-b.cost).slice(0,600));
    }
    let budget=4000;
    const solve=(remaining,chosen)=>{
      if(!remaining.length)return chosen;
      if(budget--<=0)return null;
      const available=remaining.map(p=>({p,options:choices.get(p).filter(r=>chosen.every(q=>compatible(r,q)))}))
        .sort((a,b)=>a.options.length-b.options.length);
      const next=available[0];if(!next.options.length)return null;
      for(const r of next.options){const found=solve(remaining.filter(p=>p!==next.p),[...chosen,r]);if(found)return found;}
      return null;
    };
    const complete=solve(points,[]);if(complete)placed=complete;
  }
  for(const p of points){
    const r=placed.find(r=>r.p===p);
    // Never drop a chosen feature just because the camera moved. A very dense
    // canvas still names every point, with its nearest free placement preferred.
    p.lx=r?.lx??Math.max(frame.left,Math.min(frame.right-p.width,p.x+12));
    p.ly=r?.ly??Math.max(frame.top,Math.min(frame.bottom-p.height,p.y-p.height-12));
    p.tagOffset={x:p.lx+p.width/2-p.x,y:p.ly+p.height/2-p.y};
    p.label.style.transform=`translate(${p.lx}px,${p.ly}px)`;
    const {x,y,elbow}=leader({lx:p.lx,ly:p.ly,width:p.width,height:p.height},p)
      ??{x:p.lx,y:p.ly+p.height/2,elbow:p.lx-20};
    p.line.setAttribute('d',`M${p.x},${p.y} L${elbow},${y} L${x},${y}`);
    p.dot.setAttribute('cx',p.x);p.dot.setAttribute('cy',p.y);
  }
}
function updateBoneLandmarks(){
  if(state.pickGroup)state.pickGroup.visible=!state.xray;
  const overlay=state.boneLabelOverlay,mesh=state.selectionAnchor;
  const stage=$('stage'),view=$('viewerView');
  const allowed=mesh?.geometry?.attributes.position&&mesh.userData.layerKey==='skeleton'
    &&state.mode==='explore'&&!state.focus&&!state.xray&&!state.cut
    &&view&&!view.hidden&&view.contains(stage)&&landmarkVisible(mesh);
  if(!allowed){if(overlay)overlay.host.hidden=true;return;}
  const T=state.THREE,cam=state.camera,rect=state.renderer.domElement.getBoundingClientRect();
  if(rect.width<1||rect.height<1)return;
  const bounds=new T.Box3().setFromObject(mesh),box={minX:Infinity,maxX:-Infinity,minY:Infinity,maxY:-Infinity};
  for(let i=0;i<8;i++){
    const v=new T.Vector3(i&1?bounds.max.x:bounds.min.x,i&2?bounds.max.y:bounds.min.y,i&4?bounds.max.z:bounds.min.z).project(cam);
    const x=(v.x+1)*rect.width/2,y=(1-v.y)*rect.height/2;
    box.minX=Math.min(box.minX,x);box.maxX=Math.max(box.maxX,x);box.minY=Math.min(box.minY,y);box.maxY=Math.max(box.maxY,y);
  }
  const wasClose=overlay?.mesh===mesh&&overlay.close;
  // Focus proximity is independent of angle: foreshortening a long bone must
  // not remove its names. Zooming back to the body still clears the detail.
  const size=bounds.getSize(new T.Vector3());
  const fit=Math.max(.07,Math.max(size.y,size.x/Math.max(.1,cam.aspect*.5))
    /(2*Math.tan(cam.fov*Math.PI/360)/cam.zoom)+size.z/2);
  const focusSpan=fit/cam.position.distanceTo(bounds.getCenter(new T.Vector3()));
  const close=focusSpan>(wasClose ? .76 : .82);
  if(!close){if(overlay){overlay.host.hidden=true;overlay.close=false;}return;}
  const ui=overlay||boneLabelOverlay();if(!ui)return;
  ui.host.hidden=false;
  if(ui.mesh!==mesh)prepareBoneLabels(ui,mesh);
  ui.close=true;
  ui.note.hidden=ui.points.length>0;
  ui.key.hidden=false;
  const frame={left:8,right:rect.width-8,top:ui.controls.hidden?14:Math.max(ui.toggle.offsetHeight+24,52+ui.key.offsetHeight+10),bottom:rect.height-86};
  for(const id of ['layerRail','taskCard','viewerToolsPanel']){
    const e=$(id);if(!e||e.classList.contains('hidden')||e.hidden||!e.getClientRects().length)continue;
    const r=e.getBoundingClientRect();
    if(id==='layerRail')frame.left=Math.max(frame.left,r.right-rect.left+10);
    else frame.right=Math.min(frame.right,r.left-rect.left-10);
  }
  // A phone sheet can occupy the whole picture: avoid labels under its controls.
  if(frame.right-frame.left<150){ui.host.hidden=true;return;}
  ui.controls.style.right=`${rect.width-frame.right}px`;
  ui.key.style.left=`${frame.left}px`;ui.key.style.maxWidth=`${frame.right-frame.left}px`;
  const pose=[...mesh.matrixWorld.elements,...cam.matrixWorld.elements,cam.aspect,cam.zoom,
    rect.width,rect.height,frame.left,frame.right,document.documentElement.dataset.ts,ui.activeName,ui.menu.hidden,mesh.material.opacity,
    ...Object.values(state.layers),...Object.values(state.layerOpacity||{}),state.hidden?.size||0,state.autoHidden?.size||0].join(',');
  if(ui.pose===pose){ui.key.hidden=!ui.hasFarSide;if((ui.shown||!ui.menu.hidden)&&state.pickGroup)state.pickGroup.visible=false;return;}ui.pose=pose;
  const maxWidth=Math.min(210,(frame.right-frame.left)*(ui.activeName==='*'?.4:.30));
  const visible=[];
  const ray=state.boneLabelRay||(state.boneLabelRay=new T.Raycaster());
  const occluders=[...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes)]
    .filter(m=>landmarkVisible(m)&&m.material.opacity>=.95);
  const epsilon=bounds.getSize(new T.Vector3()).length()*.006;
  for(const p of ui.points){
    const chosen=ui.menu.hidden&&(ui.activeName==='*'||(ui.activeName?p.name===ui.activeName:ui.primaryNames.has(p.name)));
    if(!chosen){p.label.hidden=true;p.line.style.display=p.dot.style.display='none';continue;}
    let screen=null,farSide=false;
    for(const local of p.locals){
      const world=local.clone().applyMatrix4(mesh.matrixWorld),candidate=world.clone().project(cam);
      if(candidate.z < -1||candidate.z > 1||Math.abs(candidate.x)>=1||Math.abs(candidate.y)>=1)continue;
      const origin=cam.getWorldPosition(new T.Vector3()),dir=world.clone().sub(origin);
      ray.set(origin,dir.clone().normalize());ray.far=dir.length()+epsilon;
      const hit=ray.intersectObjects(p.inside?occluders.filter(m=>m!==mesh&&m!==p.partMesh):occluders,false)[0];
      // A feature remains named as it turns away. Depth changes its leader,
      // not its availability; a small dead band avoids edge-on style flicker.
      farSide=!!p.inside||!!hit&&hit.distance<dir.length()-epsilon*(p.farSide ? .7 : 1.5);
      screen=candidate;break;
    }
    const shown=!!screen;
    p.label.hidden=p.line.hidden=p.dot.hidden=!shown;
    p.line.style.display=p.dot.style.display=shown?'':'none';
    if(!shown)continue;
    p.farSide=farSide;p.label.classList.toggle('far-side',farSide);
    p.line.setAttribute('stroke-dasharray',farSide?'4 3':'');
    p.dot.classList.toggle('far-side',farSide);
    p.x=(screen.x+1)*rect.width/2;p.y=(1-screen.y)*rect.height/2;
    // Leave room for both segments even when a long name is near the centre
    // of a phone canvas. Wrap the text; keep the standard font unchanged.
    const sideRoom=Math.max(p.x-frame.left,frame.right-p.x)-42;
    p.label.style.maxWidth=`${Math.min(maxWidth,Math.max(60,sideRoom))}px`;
    p.width=p.label.offsetWidth;p.height=p.label.offsetHeight;visible.push(p);
  }
  placeBoneLabels(visible,frame,box,boneLabelOutline(mesh,cam,rect));
  ui.shown=visible.filter(p=>!p.label.hidden).length;
  ui.hasFarSide=visible.some(p=>p.farSide&&!p.label.hidden);ui.key.hidden=!ui.hasFarSide;
  if((ui.shown||!ui.menu.hidden)&&state.pickGroup)state.pickGroup.visible=false;
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
export function attachCalloutToMesh(objects,mesh,anchor){
  if(!mesh||!state.THREE) return;
  const root=state.fullModel||state.realModel||(Object.values(state.extraModels||{})[0]||{}).pivot;
  state.scene.updateMatrixWorld(true);
  const world=anchor.clone();
  if(root)world.applyMatrix4(root.matrixWorld);
  const local=mesh.worldToLocal(world);
  objects.forEach(o=>{o.userData.meshAttachment={mesh,local,origin:anchor.clone(),base:o.position.clone(),root};});
}

export function showPickCallout(obj,text){
  text=viewerStructureName(text);
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
  const objects=calloutAt(anchor,text,0x72e3cf,M,{size:0.030,leaderOpacity:0.6,clear,maxReach});
  objects.forEach((o)=>grp.add(o));
  const world=anchor.clone();
  if(root)world.applyMatrix4(root.matrixWorld);
  const mesh=list.slice().sort((a,b)=>new THREE.Box3().setFromObject(a).distanceToPoint(world)-new THREE.Box3().setFromObject(b).distanceToPoint(world))[0];
  attachCalloutToMesh(objects,mesh,anchor);
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
