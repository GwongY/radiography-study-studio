async function physiologyMuscleVisualCheck(){
 const s=__osteo.state,T=s.THREE;
 const names=['Sartorius_musclel','Long_head_of_biceps_brachiil','Acromial_part_of_deltoid_musclel'];
 const sheet=document.createElement('canvas');sheet.width=1200;sheet.height=690;
 const ctx=sheet.getContext('2d');ctx.fillStyle='#eef1f4';ctx.fillRect(0,0,1200,690);
 const renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(200,200);renderer.setClearColor(0xeef1f4);
 const evidence=[];
 for(let row=0;row<names.length;row++){
  const original=s.extraModels.muscle.meshes.find(m=>m.name===names[row]);if(!original)throw Error(names[row]);
  const scene=new T.Scene(),mesh=new T.Mesh(original.geometry,original.material.clone());
  original.updateWorldMatrix(true,false);mesh.matrixAutoUpdate=false;mesh.matrix.copy(original.matrixWorld);mesh.visible=true;
  const callback=original.material.onBeforeCompile;let amplitude=0;const probe={value:0};
  mesh.material.side=T.FrontSide;mesh.material.onBeforeCompile=shader=>{callback(shader);shader.uniforms.uDeform=probe;shader.uniforms.uOn={value:0};};
  scene.add(mesh,new T.AmbientLight(0xffffff,1.5));
  const light=new T.DirectionalLight(0xffffff,3);light.position.set(3,6,5);scene.add(light);
  scene.updateMatrixWorld(true);const box=new T.Box3().setFromObject(mesh),centre=box.getCenter(new T.Vector3()),extent=box.getSize(new T.Vector3()).length()*.6;
  for(let view=0;view<3;view++){
   const camera=new T.OrthographicCamera(-extent,extent,extent,-extent,.01,100);
   const direction=[new T.Vector3(0,0,1),new T.Vector3(1,0,0),new T.Vector3(1,.25,1).normalize()][view];
   camera.position.copy(centre).addScaledVector(direction,extent*4);camera.lookAt(centre);
   const target=new T.WebGLRenderTarget(160,160);let first,last,changed=0;
   for(let phase=0;phase<=24;phase++){
    amplitude=.5-.5*Math.cos(phase/24*Math.PI*2);
    probe.value=amplitude;renderer.setRenderTarget(target);renderer.render(scene,camera);
    const pixels=new Uint8Array(160*160*4);renderer.readRenderTargetPixels(target,0,0,160,160,pixels);
    if(!phase)first=pixels;
    if(phase===12)changed=pixels.reduce((n,v,i)=>n+(Math.abs(v-first[i])>2),0);
    if(phase===24)last=pixels;
    if(phase===0||phase===12){renderer.setRenderTarget(null);renderer.render(scene,camera);const col=view*2+(phase===12?1:0);ctx.drawImage(renderer.domElement,col*200,row*230+30);ctx.fillStyle='#15202b';ctx.font='12px sans-serif';ctx.fillText(names[row].replace(/_/g,' ').slice(0,29),col*200+4,row*230+13);ctx.fillText(['front','side','oblique'][view]+(phase?' peak':' rest'),col*200+4,row*230+27);}
   }
   if(!changed||!first.every((v,i)=>v===last[i]))throw Error('No movement or incomplete return: '+names[row]+' '+view);
   evidence.push({name:names[row],view,changedChannels:changed});target.dispose();
  }
  mesh.material.dispose();
 }
 renderer.dispose();sheet.id='muscleVisualEvidence';sheet.style.cssText='position:fixed;inset:0;z-index:99999;width:1200px;height:690px';document.body.append(sheet);
 return {pass:true,cycleFrames:25,views:3,frontSide:true,evidence};
}
