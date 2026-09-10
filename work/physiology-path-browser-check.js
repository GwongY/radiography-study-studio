/*
 * Tube paths, on a GPU.
 *
 * The node checks prove the map and the routes; nothing there runs a shader, so
 * nothing there can catch the GLSL and the JavaScript drifting apart — a
 * transposed matrix, a uniform that never reached the program, a driver that
 * folded pow(0., k) to NaN. This renders the real vertex shader into a float
 * target, one pixel per vertex, and compares the deformed position it produces
 * with the reference implementation at the same instant.
 *
 * The dev server serves outputs/ as its root, so this file is not reachable by
 * URL. Copy it in beside the app, import it, and take it out again:
 *
 *   cp work/physiology-path-browser-check.js outputs/__check.js
 *   # in the page:  (await import('/__check.js')).physiologyPathBrowserCheck()
 *   rm outputs/__check.js
 *
 * The Browser pane freezes requestAnimationFrame, so the app's own uT never
 * advances there and nothing visibly deforms; this renders on demand instead
 * and does not depend on the frame loop running.
 */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
const LOADER_URL = 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

function decodeFloats(encoded) {
  const binary = atob(encoded), bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Float32Array(bytes.buffer);
}

export async function physiologyPathBrowserCheck({ time = 3.4, amplitude = 0.18 } = {}) {
  const THREE = await import(THREE_URL);
  const { GLTFLoader } = await import(LOADER_URL);
  const kernel = await import('/physiology-path.js');
  const { PATH_PAYLOADS } = await import('/physiology-paths.js');
  const { FLOW_CLASSES } = await import('/physiology.js?v=4');
  const results = [], problems = [];

  for (const [layer, entry] of Object.entries(PATH_PAYLOADS)) {
    const response = await fetch('/' + entry.url.replace('./', ''));
    if (!response.ok) throw new Error(`payload ${layer}: HTTP ${response.status}`);
    const payload = await response.json();
    const gltf = await new GLTFLoader().loadAsync('/assets/' + (layer === 'organs' ? 'ic-organlar.glb' : ''));
    gltf.scene.updateMatrixWorld(true);
    const meshes = new Map();
    gltf.scene.traverse((o) => { if (o.isMesh) meshes.set(o.name, o); });

    for (const route of payload.routes) {
      const mesh = meshes.get(route.mesh);
      if (!mesh) { problems.push(`${route.id}: no mesh named ${route.mesh} in the loaded layer`); continue; }
      const position = mesh.geometry.attributes.position;
      if (position.count !== route.vertices) { problems.push(`${route.id}: ${position.count} runtime vertices, payload says ${route.vertices}`); continue; }

      const data = {};
      for (const [name, size] of payload.attributes) {
        data[name] = decodeFloats(route.data[name]);
        if (data[name].length !== route.vertices * size) { problems.push(`${route.id}: ${name} decoded to ${data[name].length}`); }
      }

      const rule = FLOW_CLASSES[/ureter/i.test(route.mesh) ? 'urinary' : 'gut'].rule;
      const uniforms = {
        uT: { value: time }, uDir: { value: rule.dir || 1 },
        uDeform: { value: 1 }, uMAmt: { value: amplitude },
        uPathLength: { value: route.length },
        uPathWaves: { value: Math.max(1.2, route.worldLength / (rule.pathWavelength || .1)) },
        uPathTravel: { value: (rule.pathSpeed || .08) / Math.max(1e-6, route.worldLength) },
        uPathTaper: { value: rule.pathTaper || .14 },
        uPathSharp: { value: rule.sharp || 4 },
      };

      /* One pixel per vertex, the deformed LOCAL position written straight out.
         No lighting, no projection: the only thing under test is the map. */
      const geometry = new THREE.BufferGeometry();
      const count = route.vertices;
      const local = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) local.set([position.getX(i), position.getY(i), position.getZ(i)], i * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(local, 3));
      geometry.setAttribute('aVertexIndex', new THREE.BufferAttribute(Float32Array.from({ length: count }, (_, i) => i), 1));
      for (const [name, size] of payload.attributes) geometry.setAttribute(name, new THREE.BufferAttribute(data[name], size));

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
attribute float aVertexIndex;
uniform float uT;uniform float uDir;uniform float uDeform;uniform float uMAmt;
varying vec3 vOut;
${kernel.PATH_SHAPE_GLSL}
void main(){
  vec3 p=position;
  if(uDeform*uMAmt>0.)rssPathDeform(p,uDeform*uMAmt);
  vOut=p;
  float x=(aVertexIndex+.5)/${count}.*2.-1.;
  gl_Position=vec4(x,0.,0.,1.);
  gl_PointSize=1.;
}`,
        fragmentShader: 'varying vec3 vOut;void main(){gl_FragColor=vec4(vOut,1.);}',
      });

      const renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setSize(count, 1, false);
      const target = new THREE.WebGLRenderTarget(count, 1, { type: THREE.FloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
      const scene = new THREE.Scene();
      scene.add(new THREE.Points(geometry, material));
      const camera = new THREE.Camera();
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      const pixels = new Float32Array(count * 4);
      renderer.readRenderTargetPixels(target, 0, 0, count, 1, pixels);

      let worst = 0, worstAt = -1, moved = 0;
      for (let i = 0; i < count; i++) {
        const frame = {
          param: data.aPathParam[i],
          centre: [data.aPathCentre[i * 3], data.aPathCentre[i * 3 + 1], data.aPathCentre[i * 3 + 2]],
          tangent: [data.aPathTangent[i * 3], data.aPathTangent[i * 3 + 1], data.aPathTangent[i * 3 + 2]],
          bend: [data.aPathBend[i * 3], data.aPathBend[i * 3 + 1], data.aPathBend[i * 3 + 2]],
        };
        const wave = kernel.peristalticWave(frame.param, time, {
          amplitude, waves: uniforms.uPathWaves.value, travel: uniforms.uPathTravel.value,
          dir: uniforms.uDir.value, sharp: uniforms.uPathSharp.value, taperWidth: uniforms.uPathTaper.value,
        });
        const rest = [local[i * 3], local[i * 3 + 1], local[i * 3 + 2]];
        const expected = kernel.pathDeformation({ position: rest, normal: [0, 1, 0], length: route.length, wave, ...frame });
        if (Math.hypot(...expected.position.map((v, k) => v - rest[k])) > 1e-7) moved++;
        for (let k = 0; k < 3; k++) {
          const error = Math.abs(pixels[i * 4 + k] - expected.position[k]);
          if (error > worst) { worst = error; worstAt = i; }
        }
      }

      /* And with the amplitude at zero the shader must hand back what it got. */
      uniforms.uDeform.value = 0;
      renderer.render(scene, camera);
      const still = new Float32Array(count * 4);
      renderer.readRenderTargetPixels(target, 0, 0, count, 1, still);
      let worstStill = 0;
      for (let i = 0; i < count; i++) for (let k = 0; k < 3; k++) {
        worstStill = Math.max(worstStill, Math.abs(still[i * 4 + k] - local[i * 3 + k]));
      }

      results.push({
        id: route.id, mesh: route.mesh, vertices: count, moved,
        worstGpuError: worst, worstVertex: worstAt, worstAtRest: worstStill,
      });
      if (!(worst < 2e-5)) problems.push(`${route.id}: GPU and reference differ by ${worst.toExponential(2)}`);
      if (worstStill !== 0) problems.push(`${route.id}: rest pose moved by ${worstStill.toExponential(2)} at zero amplitude`);
      if (!(moved > count / 20)) problems.push(`${route.id}: only ${moved} of ${count} vertices moved`);

      target.dispose(); renderer.dispose(); geometry.dispose(); material.dispose();
    }
    gltf.scene.traverse((o) => { o.geometry?.dispose(); });
  }
  return { pass: problems.length === 0, problems, results };
}
