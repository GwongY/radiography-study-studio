// Pass JSON produced by: node work/physiology-shape-check.mjs --fixtures
// This verifies decoded world-space samples; it does NOT authorise binding those
// merged arrays as runtime local-space vertex attributes.
async function physiologyDecoderBrowserCheck(fixtures) {
  const {GLTFLoader}=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js');
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js');
  const loader=new GLTFLoader(),results=[],loaded=new Map();
  for(const fixture of fixtures){
    let gltf=loaded.get(fixture.file);
    if(!gltf){gltf=await loader.loadAsync('/'+fixture.file);gltf.scene.updateMatrixWorld(true);loaded.set(fixture.file,gltf);}
    const json=gltf.parser.json,parents=new Map();
    json.nodes.forEach((node,i)=>(node.children||[]).forEach(child=>parents.set(child,i)));
    const meshes=[];gltf.scene.traverse(o=>{
      if(!o.isMesh)return;
      const association=gltf.parser.associations.get(o);let node=association?.nodes,owned;
      while(node!==undefined){owned=json.nodes[node].name;if(owned)break;node=parents.get(node);}
      owned=owned||json.meshes[association?.meshes]?.name||o.name;
      if(owned.replace(/\s/g,'_').replace(/[\[\].:/]/g,'')===fixture.name)meshes.push(o);
    });
    meshes.sort((a,b)=>(gltf.parser.associations.get(a).primitives||0)-(gltf.parser.associations.get(b).primitives||0));
    if(!meshes.length)throw Error('Missing '+fixture.name);
    const positions=[],indices=[],v=new THREE.Vector3();
    for(const m of meshes){const base=positions.length/3,p=m.geometry.attributes.position;for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(m.matrixWorld);positions.push(v.x,v.y,v.z);}const ix=m.geometry.index;for(let i=0;i<(ix?.count||p.count);i++)indices.push(base+(ix?ix.getX(i):i));}
    if(positions.length/3!==fixture.count||indices.length!==fixture.indexCount)throw Error('Decoder counts differ '+fixture.name);
    if(!fixture.indices.every((n,i)=>n===indices[i]))throw Error('Index order differs '+fixture.name);
    let maxError=0;for(const {i,p} of fixture.samples)for(let j=0;j<3;j++)maxError=Math.max(maxError,Math.abs(Math.fround(positions[i*3+j])-p[j]));
    if(maxError>1e-6)throw Error('World-position order differs '+fixture.name+': '+maxError);
    results.push({name:fixture.name,vertices:fixture.count,primitives:meshes.length,maxWorldError:maxError});
  }
  for(const gltf of loaded.values())gltf.scene.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});
  return {pass:true,fixtures:results};
}
