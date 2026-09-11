// Evaluate in an isolated dev-server Chrome tab: mode='capture', then 'compare'
// after reloading the edited app. Exercises the actual injected vertex GLSL.
async function physiologyShapeBrowserCheck(mode='compare') {
  const {deformMuscle,deformBreathing,deformChamber}=await import('/physiology-shape.js');
  const {goTo}=await import('/study/navigation-five-destinations.js');
  const {loadExtraModel}=await import('/studio/depth-picking.js');
  const {STRUCTURE_MODELS}=await import('/study-data.js');
  goTo('viewer');await __osteo.boot();
  const s=__osteo.state;s.motionEnabled=false;
  for(const key of Object.keys(STRUCTURE_MODELS).filter(k=>k!=='skeleton'))
    await loadExtraModel(key,STRUCTURE_MODELS[key].file);
  const canvas=document.createElement('canvas'),gl=canvas.getContext('webgl2');
  if(!gl)throw Error('WebGL2 required for shader characterisation');
  const hash=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
  const compile=(type,source)=>{const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh;};
  const programs=new Map(),rows=[],gpu=[],modes=new Set();
  let vertices=0,maxRestPositionError=0,maxRestNormalError=0,muscleSamples=0,maxMusclePositionError=0,maxMuscleNormalError=0;
  const fragment=compile(gl.FRAGMENT_SHADER,'#version 300 es\nprecision highp float;out vec4 color;void main(){color=vec4(1.);}');
  const sample=(a,n=64)=>{const count=Math.min(n,a.count),out=new Float32Array(count*3);for(let i=0;i<count;i++){const j=Math.floor(i*(a.count-1)/Math.max(1,count-1));out.set([a.getX(j),a.getY(j),a.getZ(j)],i*3);}return out;};
  const sampleIdx=(a,n=64)=>{const count=Math.min(n,a.count);return Array.from({length:count},(_,i)=>Math.floor(i*(a.count-1)/Math.max(1,count-1)));};
  try {
    for(const [key,layer] of Object.entries(s.extraModels).sort(([a],[b])=>a.localeCompare(b))) for(const mesh of layer.meshes){
      const sh={uniforms:{},vertexShader:s.THREE.ShaderLib.standard.vertexShader,fragmentShader:s.THREE.ShaderLib.standard.fragmentShader};
      mesh.material.onBeforeCompile(sh);
      if(!sh.uniforms.uMCenter)continue;
      const prefix=sh.vertexShader.slice(0,sh.vertexShader.indexOf('#define STANDARD')).replace(/\bvarying\b/g,'out').replace(/\battribute\b/g,'in');
      const injected=marker=>{const rest=sh.vertexShader.slice(sh.vertexShader.indexOf(marker)+marker.length);return rest.slice(0,rest.indexOf('#include'));};
      const source='#version 300 es\nprecision highp float;in vec3 position;in vec3 normal;uniform mat4 modelMatrix;'+prefix+
        '\nout vec3 probePosition;out vec3 probeNormal;void main(){vec3 objectNormal=normal;'+injected('#include <beginnormal_vertex>')+
        '\nvec3 transformed=position;'+injected('#include <begin_vertex>')+'\nprobePosition=transformed;probeNormal=objectNormal;gl_Position=vec4(0.,0.,0.,1.);}';
      let program=programs.get(source);
      if(!program){program=gl.createProgram();const vs=compile(gl.VERTEX_SHADER,source);gl.attachShader(program,vs);gl.attachShader(program,fragment);gl.transformFeedbackVaryings(program,['probePosition','probeNormal'],gl.INTERLEAVED_ATTRIBS);gl.linkProgram(program);gl.deleteShader(vs);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));programs.set(source,program);}
      const p=sample(mesh.geometry.attributes.position),n=sample(mesh.geometry.attributes.normal);
      const originalPosition=mesh.geometry.attributes.position.array.slice(),originalNormal=mesh.geometry.attributes.normal.array.slice();
      const matrix=mesh.matrix.toArray(),bounds=mesh.geometry.boundingBox.clone();
      const vao=gl.createVertexArray();gl.bindVertexArray(vao);gl.useProgram(program);
      const buffers=[];
      const tw=mesh.geometry.attributes.aTetherW,tg=mesh.geometry.attributes.aTetherGrad;
      const bind3=(name,data,size)=>{const at=gl.getAttribLocation(program,name);if(at<0||!data)return;const b=gl.createBuffer();buffers.push(b);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,size,gl.FLOAT,false,0,0);};
      bind3('position',p,3);bind3('normal',n,3);bind3('aTetherW',tw?tw.array:null,1);bind3('aTetherGrad',tg?tg.array:null,3);
      gl.uniformMatrix4fv(gl.getUniformLocation(program,'modelMatrix'),false,new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]));
      for(const [name,{value}] of Object.entries(sh.uniforms)){const at=gl.getUniformLocation(program,name);if(at===null)continue;if(typeof value==='number')gl.uniform1f(at,value);else if(value.isVector3)gl.uniform3fv(at,value.toArray());}
      gl.uniform1f(gl.getUniformLocation(program,'uT'),.37);
      const shape={key,name:mesh.name,centre:sh.uniforms.uMCenter.value.toArray(),axis:sh.uniforms.uMAxis.value.toArray(),length:sh.uniforms.uMLength.value,amount:sh.uniforms.uMAmt.value,mode:sh.uniforms.uMode.value};rows.push(shape);modes.add(shape.mode);
      const target=gl.createBuffer();gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER,target);gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER,p.length*2*4,gl.DYNAMIC_READ);gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER,0,target);
      for(const amplitude of (['muscle','breathing','pump'].includes(mode)?[0,.2,.5,.8,1]:[0,.35,.8])){
        gl.uniform1f(gl.getUniformLocation(program,'uDeform'),amplitude);gl.enable(gl.RASTERIZER_DISCARD);gl.beginTransformFeedback(gl.POINTS);gl.drawArrays(gl.POINTS,0,p.length/3);gl.endTransformFeedback();gl.disable(gl.RASTERIZER_DISCARD);
        const out=new Float32Array(p.length*2);gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER,0,out);
        if(!out.every(Number.isFinite))throw Error('Nonfinite shader output: '+mesh.name);
        if(!amplitude)for(let i=0;i<p.length/3;i++)for(let j=0;j<3;j++){maxRestPositionError=Math.max(maxRestPositionError,Math.abs(out[i*6+j]-p[i*3+j]));maxRestNormalError=Math.max(maxRestNormalError,Math.abs(out[i*6+j+3]-n[i*3+j]));}
        if((mode==='muscle'&&mesh.userData.flowClass==='muscle')||(mode==='breathing'&&['diaphragm','airway'].includes(mesh.userData.flowClass))||(mode==='pump'&&['heartVentricle','heartAtrium'].includes(mesh.userData.flowClass)))for(let i=0;i<p.length/3;i++){
          const idx=sampleIdx(mesh.geometry.attributes.position)[i];
          const tether=tw?{weight:tw.getX(idx),gradient:[tg.getX(idx*3),tg.getX(idx*3+1),tg.getX(idx*3+2)]}:null;
          const args=mode==='pump'?[Array.from(p.slice(i*3,i*3+3)),Array.from(n.slice(i*3,i*3+3)),shape,amplitude,tether]
            :[Array.from(p.slice(i*3,i*3+3)),Array.from(n.slice(i*3,i*3+3)),shape,amplitude,mesh.userData.flowClass==='airway'];
          const expected=(mode==='pump'?deformChamber:mode==='breathing'?deformBreathing:deformMuscle)(...args);
          for(let j=0;j<3;j++){
            maxMusclePositionError=Math.max(maxMusclePositionError,Math.abs(expected.position[j]-out[i*6+j])/Math.max(shape.length,1e-6));
            maxMuscleNormalError=Math.max(maxMuscleNormalError,Math.abs(expected.normal[j]-out[i*6+j+3]));
          }
          muscleSamples++;
        }
        gpu.push(out);vertices+=p.length/3;
      }
      if(!originalPosition.every((v,i)=>Object.is(v,mesh.geometry.attributes.position.array[i]))||!originalNormal.every((v,i)=>Object.is(v,mesh.geometry.attributes.normal.array[i]))||!mesh.geometry.boundingBox.equals(bounds)||!matrix.every((v,i)=>v===mesh.matrix.elements[i]))throw Error('Rest geometry mutated: '+mesh.name);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER,0,null);gl.deleteBuffer(target);buffers.forEach(b=>gl.deleteBuffer(b));gl.deleteVertexArray(vao);
    }
    const all=new Float32Array(gpu.reduce((n,a)=>n+a.length,0));let offset=0;for(const a of gpu){all.set(a,offset);offset+=a.length;}
    const result={meshes:rows.length,vertices,modes:[...modes].sort(),shapes:await hash(new TextEncoder().encode(JSON.stringify(rows))),gpu:await hash(all),maxRestPositionError,maxRestNormalError};
    if(result.meshes<100||result.modes.length!==5)throw Error('Shape fixture coverage collapsed');
    // Quantized input normals are not exactly unit length. The legacy shader
    // normalizes even at rest in modes 1/3/5; preserve this measured behaviour.
    if(maxRestPositionError!==0||maxRestNormalError>.002)throw Error('Unexpected legacy rest deviation '+JSON.stringify(result));
    if(['muscle','breathing','pump'].includes(mode)){if(muscleSamples<(mode==='muscle'?1000:100)||maxMusclePositionError>2e-5||maxMuscleNormalError>2e-4)throw Error(JSON.stringify({muscleSamples,maxMusclePositionError,maxMuscleNormalError}));return {pass:true,...result,muscleSamples,maxMusclePositionError,maxMuscleNormalError};}
    if(mode==='capture')localStorage.setItem('physiology-shape-baseline',JSON.stringify(result));
    else {const before=JSON.parse(localStorage.getItem('physiology-shape-baseline')||'null');if(!before)throw Error('Capture the unchanged app first');if(JSON.stringify(before)!==JSON.stringify(result))throw Error('Characterisation mismatch '+JSON.stringify({before,after:result}));}
    return {pass:true,mode,...result};
  } finally {for(const p of programs.values())gl.deleteProgram(p);gl.deleteShader(fragment);gl.getExtension('WEBGL_lose_context')?.loseContext();}
}
