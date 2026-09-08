/* Packed course pieces — presentation parents keep mesh highlight transforms intact. */
import { els, state } from './imports.js';
import { createExplosionLayout } from './explosion-layout.js';
import { setPhysiology } from './live-physiology.js';

function meshes(){
  return [...state.fullMeshes,...Object.values(state.extraModels||{}).flatMap(m=>m.meshes||[])];
}
function visible(mesh){
  for(let p=mesh;p;p=p.parent) if(!p.visible)return false;
  return true;
}
export function anatomicalMatrix(mesh){
  const g=mesh.userData.spreadParent;
  return g&&mesh.parent===g
    ?new state.THREE.Matrix4().multiplyMatrices(g.parent.matrixWorld,mesh.matrix)
    :mesh.matrixWorld;
}
export function restorePackedSpread(){
  for(const m of meshes()){
    const g=m.userData.spreadParent;
    if(g)g.position.set(0,0,0);
  }
  state.scene?.updateMatrixWorld(true);
}
export function endPackedSpread(){
  restorePackedSpread();
  const saved=state.packedView;
  if(saved&&state.camera&&state.controls){
    state.camera.position.copy(saved.position);
    state.controls.target.copy(saved.target);
    state.controls.maxDistance=saved.maxDistance;
    state.camera.far=saved.far;
    state.motionEnabled=saved.motion;
    if(els.motion){els.motion.textContent=saved.motion?'Pause turntable':'Spin turntable';els.motion.classList.toggle('active',saved.motion);}
    if(saved.physiology)setPhysiology(true);
    state.camera.updateProjectionMatrix();
    state.controls.update();
  }
  state.packedView=null;
  state.packedLayout=null;
}
export function applyPackedSpread(t){
  const T=state.THREE;
  if(!T||!state.scene||!state.camera||!state.controls)return;
  restorePackedSpread();
  if(!state.packedView){
    state.packedView={position:state.camera.position.clone(),target:state.controls.target.clone(),
      maxDistance:state.controls.maxDistance,far:state.camera.far,motion:state.motionEnabled,physiology:!!state.flow?.on};
    state.motionEnabled=false;
    if(els.motion){els.motion.textContent='Spin turntable';els.motion.classList.remove('active');}
    if(state.flow?.on)setPhysiology(false);
  }
  const shown=meshes().filter(visible);
  const sig=shown.map(m=>m.uuid).join(',');
  if(!state.packedLayout||state.packedLayout.sig!==sig){
    // Bounding boxes are measured only with all presentation parents at home.
    const parts=shown.map(m=>{
      const b=new T.Box3().setFromObject(m);
      return {id:m.uuid,mesh:m,bounds:[b.min.toArray(),b.max.toArray()],center:b.getCenter(new T.Vector3())};
    });
    const canvas=state.renderer.domElement.getBoundingClientRect();
    const width=Math.max(1,canvas.width);
    const rail=document.getElementById('layerRail')?.getBoundingClientRect();
    const inset=rail?.width?Math.max(0,Math.min(width*.35,rail.right-canvas.left+12)):0;
    const usableAspect=state.camera.aspect*(1-inset/width);
    const layout=createExplosionLayout(parts,usableAspect);
    const centre=parts.reduce((v,p)=>v.add(p.center),new T.Vector3()).divideScalar(parts.length||1);
    for(const p of parts){
      let g=p.mesh.userData.spreadParent;
      if(!g){
        g=new T.Group();g.name='coursePieceSpread';
        p.mesh.parent.add(g);g.add(p.mesh);p.mesh.userData.spreadParent=g;
      }
      const cell=layout.cells.get(p.id);
      const target=new T.Vector3(centre.x+cell.x,centre.y+cell.y,centre.z);
      p.offset=g.parent.worldToLocal(target).sub(g.parent.worldToLocal(p.center.clone()));
    }
    state.packedLayout={sig,parts,...layout};
    // Fit the complete layout once, then leave orbit and zoom under user control.
    const half=Math.max(layout.height/2,layout.width/(2*usableAspect),1);
    const depth=Math.max(0,...parts.map(p=>p.bounds[1][2]-p.bounds[0][2]));
    const distance=half/Math.tan(state.camera.fov*Math.PI/360)*1.12+depth;
    state.controls.maxDistance=Math.max(state.controls.maxDistance,distance*3);
    state.camera.far=Math.max(state.camera.far,distance*5);
    const shift=distance*Math.tan(state.camera.fov*Math.PI/360)*state.camera.aspect*inset/width;
    state.camera.position.set(centre.x-shift,centre.y,centre.z+distance);
    state.controls.target.set(centre.x-shift,centre.y,centre.z);
    state.camera.updateProjectionMatrix();state.controls.update();
  }
  for(const p of state.packedLayout.parts)p.mesh.userData.spreadParent.position.copy(p.offset).multiplyScalar(t);
  state.scene.updateMatrixWorld(true);
}
