/*
 * Path routes, on a GPU.
 *
 * The node checks prove the maps and the routes; nothing there runs a shader, so
 * nothing there can catch the GLSL and the JavaScript drifting apart — a
 * transposed matrix, a uniform that never reached the program, a driver that
 * folded pow(0., k) to NaN. This renders the real vertex and fragment shaders
 * into a float target, one pixel per vertex, and compares what they produce
 * with the reference implementation at the same instant.
 *
 * Two kinds, two things to prove:
 *
 *   tube  the deformed position matches pathDeformation, and zero amplitude
 *         returns the rest pose bit for bit.
 *   glow  the band matches progressBand at the same phase, the chained
 *         parameter is inside its circuit's slice, and the position the vertex
 *         stage emits does NOT change when the phase advances — which is the
 *         whole claim of a glow route: it moves light, not geometry.
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
const GLB = { organs: 'ic-organlar.glb', circulatory: 'dolasim.glb', nervous: 'sinir.glb' };

function decodeFloats(encoded) {
  const binary = atob(encoded), bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Float32Array(bytes.buffer);
}

export async function physiologyPathBrowserCheck({ time = 3.4, amplitude = 0.18, phase = 0.37 } = {}) {
  const THREE = await import(THREE_URL);
  const { GLTFLoader } = await import(LOADER_URL);
  const kernel = await import('/physiology-path.js');
  const { PATH_PAYLOADS } = await import('/physiology-paths.js');
  const { FLOW_CIRCUITS, FLOW_CLASSES } = await import('/physiology.js?v=4');
  const results = [], problems = [];

  /* One render, one pixel per vertex, whatever the shader is. */
  const renderPixels = (count, geometry, material) => {
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(count, 1, false);
    const target = new THREE.WebGLRenderTarget(count, 1, { type: THREE.FloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    const scene = new THREE.Scene();
    scene.add(new THREE.Points(geometry, material));
    const camera = new THREE.Camera();
    renderer.setRenderTarget(target);
    const read = () => {
      renderer.render(scene, camera);
      const pixels = new Float32Array(count * 4);
      renderer.readRenderTargetPixels(target, 0, 0, count, 1, pixels);
      return pixels;
    };
    const dispose = () => { target.dispose(); renderer.dispose(); };
    return { read, dispose };
  };
  const pointGeometry = (THREE, count, local) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(local, 3));
    geometry.setAttribute('aVertexIndex', new THREE.BufferAttribute(Float32Array.from({ length: count }, (_, i) => i), 1));
    return geometry;
  };
  const PLACE = (count) => `float x=(aVertexIndex+.5)/${count}.*2.-1.;gl_Position=vec4(x,0.,0.,1.);gl_PointSize=1.;`;

  for (const [layer, entry] of Object.entries(PATH_PAYLOADS)) {
    const response = await fetch('/' + entry.url.replace('./', ''));
    if (!response.ok) throw new Error(`payload ${layer}: HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.schemaVersion !== 2) problems.push(`${layer}: payload schema ${payload.schemaVersion}, expected 2`);
    const gltf = await new GLTFLoader().loadAsync('/assets/' + GLB[layer]);
    gltf.scene.updateMatrixWorld(true);
    const meshes = new Map();
    gltf.scene.traverse((o) => { if (o.isMesh) meshes.set(o.name, o); });

    for (const route of payload.routes) {
      const mesh = meshes.get(route.mesh);
      if (!mesh) { problems.push(`${route.id}: no mesh named ${route.mesh} in the loaded layer`); continue; }
      const position = mesh.geometry.attributes.position;
      if (position.count !== route.vertices) { problems.push(`${route.id}: ${position.count} runtime vertices, payload says ${route.vertices}`); continue; }

      const layout = payload.attributes[route.kind];
      const data = {};
      for (const [name, size] of layout) {
        data[name] = decodeFloats(route.data[name]);
        if (data[name].length !== route.vertices * size) problems.push(`${route.id}: ${name} decoded to ${data[name].length}`);
      }
      const count = route.vertices;
      const local = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) local.set([position.getX(i), position.getY(i), position.getZ(i)], i * 3);

      /* ---------------------------------------------------------- glow --- */
      if (route.kind === 'glow') {
        const spec = FLOW_CIRCUITS[route.circuit];
        if (!spec) { problems.push(`${route.id}: circuit ${route.circuit} has no display entry`); continue; }
        const waves = spec.mode === 'drift'
          ? Math.max(1, (payload.circuits[route.circuit]?.worldLength || 1) / (spec.wavelength || .16)) : 1;
        const sharp = spec.sharp || 5;
        const uniforms = {
          uRouteStart: { value: route.uStart }, uRouteSpan: { value: route.uSpan },
          uRouteWaves: { value: waves }, uRoutePhase: { value: phase }, uRouteSharp: { value: sharp },
        };
        const geometry = pointGeometry(THREE, count, local);
        for (const [name, size] of layout) geometry.setAttribute(name, new THREE.BufferAttribute(data[name], size));
        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: `
attribute float aVertexIndex;
${kernel.PATH_GLOW_VERTEX_GLSL}
varying vec3 vRest;
void main(){
  vec3 p=position;              /* a glow route touches nothing here */
  vFlowS=rssRouteProgress();
  vRest=p;
  ${PLACE(count)}
}`,
          fragmentShader: `
${kernel.PATH_GLOW_FRAGMENT_GLSL}
varying vec3 vRest;
void main(){gl_FragColor=vec4(rssRouteBand(vFlowS),vFlowS,vRest.x,vRest.y);}`,
        });
        const pass = renderPixels(count, geometry, material);
        const pixels = pass.read();
        let worstBand = 0, worstParam = 0, outside = 0, lit = 0;
        for (let i = 0; i < count; i++) {
          const u = route.uStart + data.aPathProgress[i] * route.uSpan;
          worstParam = Math.max(worstParam, Math.abs(pixels[i * 4 + 1] - u));
          if (u < route.uStart - 1e-5 || u > route.uStart + route.uSpan + 1e-5) outside++;
          const expected = kernel.progressBand(u, phase, { waves, sharp });
          worstBand = Math.max(worstBand, Math.abs(pixels[i * 4] - expected));
          if (expected > .5) lit++;
        }
        /* Advance the phase: the light must move and the geometry must not. */
        uniforms.uRoutePhase.value = phase + .21;
        const moved = pass.read();
        let bandChanged = 0, worstDrift = 0;
        for (let i = 0; i < count; i++) {
          if (Math.abs(moved[i * 4] - pixels[i * 4]) > 1e-4) bandChanged++;
          worstDrift = Math.max(worstDrift, Math.abs(moved[i * 4 + 2] - local[i * 3]), Math.abs(moved[i * 4 + 3] - local[i * 3 + 1]));
        }
        results.push({
          id: route.id, kind: 'glow', mesh: route.mesh, vertices: count, circuit: route.circuit,
          worstGpuError: worstBand, worstParamError: worstParam, litAtThisPhase: lit,
          bandChangedOnPhase: bandChanged, worstPositionDrift: worstDrift,
        });
        if (!(worstBand < 2e-5)) problems.push(`${route.id}: GPU band and reference differ by ${worstBand.toExponential(2)}`);
        if (!(worstParam < 2e-6)) problems.push(`${route.id}: chained parameter differs by ${worstParam.toExponential(2)}`);
        if (outside) problems.push(`${route.id}: ${outside} vertices fall outside this route's slice of its circuit`);
        if (!bandChanged) problems.push(`${route.id}: advancing the phase did not move the light at all`);
        if (worstDrift !== 0) problems.push(`${route.id}: advancing the phase MOVED the geometry by ${worstDrift.toExponential(2)}`);
        pass.dispose(); geometry.dispose(); material.dispose();
        continue;
      }

      /* ---------------------------------------------------------- tube --- */
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
      const geometry = pointGeometry(THREE, count, local);
      for (const [name, size] of layout) geometry.setAttribute(name, new THREE.BufferAttribute(data[name], size));
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
  ${PLACE(count)}
}`,
        fragmentShader: 'varying vec3 vOut;void main(){gl_FragColor=vec4(vOut,1.);}',
      });
      const pass = renderPixels(count, geometry, material);
      const pixels = pass.read();

      let worst = 0, worstAt = -1, movedCount = 0;
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
        if (Math.hypot(...expected.position.map((v, k) => v - rest[k])) > 1e-7) movedCount++;
        for (let k = 0; k < 3; k++) {
          const error = Math.abs(pixels[i * 4 + k] - expected.position[k]);
          if (error > worst) { worst = error; worstAt = i; }
        }
      }

      /* And with the amplitude at zero the shader must hand back what it got. */
      uniforms.uDeform.value = 0;
      const still = pass.read();
      let worstStill = 0;
      for (let i = 0; i < count; i++) for (let k = 0; k < 3; k++) {
        worstStill = Math.max(worstStill, Math.abs(still[i * 4 + k] - local[i * 3 + k]));
      }

      results.push({
        id: route.id, kind: 'tube', mesh: route.mesh, vertices: count, moved: movedCount,
        worstGpuError: worst, worstVertex: worstAt, worstAtRest: worstStill,
      });
      if (!(worst < 2e-5)) problems.push(`${route.id}: GPU and reference differ by ${worst.toExponential(2)}`);
      if (worstStill !== 0) problems.push(`${route.id}: rest pose moved by ${worstStill.toExponential(2)} at zero amplitude`);
      if (!(movedCount > count / 20)) problems.push(`${route.id}: only ${movedCount} of ${count} vertices moved`);

      pass.dispose(); geometry.dispose(); material.dispose();
    }
    gltf.scene.traverse((o) => { o.geometry?.dispose(); });
  }
  return { pass: problems.length === 0, problems, results };
}
