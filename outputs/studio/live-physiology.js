/*
 * Live physiology
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, FLOW_ANCHORS, FLOW_CLASSES, LAYER_NAMES, MESH_INDEX, UNITS, atriumEnvelope, breathEnvelope, cardiacEnvelope, classify, contractEnvelope, els, spikeEnvelope, state, ventricleEnvelope } from './imports.js';
import { MEMORY_TIPS, answer, clean, openDetail, pool, record, regionLabel, selectBone, showToast } from './visualisation-modes.js';
import { animate, applyVisibility, between, getRecord, tube } from './region-boxes-how.js';
import { clearSelection, loadExtraModel, restorePeel } from './depth-picking.js';
import { enforceHidden } from './hide-and-search.js';
import { showPickCallout } from './spatial-concept-overlays.js';

/* ------------------------------------------------------------------ *
 * Live physiology
 *
 * The atlas hands over 2,800 meshes in one shade of beige. That is a diagram
 * of where things are with everything they DO taken out, and for a first-year
 * the doing is most of the lesson: which vessel carries which blood, which way
 * lymph is allowed to travel, what a muscle is doing when it fires.
 *
 * Two separate things happen here, and they are deliberately separable.
 *
 *   Colour  is permanent. Every mesh is classified from its own name and given
 *           the colour of what it is. Arteries red, veins blue -- and the
 *           pulmonary vessels the other way round, because that convention is
 *           about oxygen, and the pulmonary circulation is where it inverts.
 *
 *   Motion  is a toggle. A travelling crest of emissive light runs along each
 *           system in its own direction, at its own rate, gated to its own
 *           rhythm: the pulse wave leaves the heart 72 times a minute, lymph
 *           creeps upward toward the venous angle and never back, nerve
 *           volleys fire outward from the cord far faster than blood moves,
 *           and muscle really does shorten along its own long axis.
 *
 * It runs on ONE shared time uniform and one shared uniform object per class,
 * so driving 2,800 meshes costs a dozen float writes a frame rather than 2,800
 * material updates. The per-mesh values -- a muscle's own centre and fibre
 * axis -- are computed once at load and never touched again.
 *
 * The colours and the rhythms are a display convention written by this app,
 * not a measurement and not a claim traced to a source file. The legend in the
 * viewer says so.
 * ------------------------------------------------------------------ */

/* On by default. A body that does not move is the thing this exists to fix,
   and with only the skeleton loaded there is nothing with a rule, so it costs
   nothing until a system layer is actually on. */

/* World Y of the top and bottom of the body, so anchors can be fractions. */
function bodySpanY(){
  if(state.bodySpan) return state.bodySpan;
  const THREE=state.THREE; if(!THREE) return null;
  const root=state.fullModel||Object.values(state.extraModels||{})[0]?.pivot;
  if(!root) return null;
  const b=new THREE.Box3().setFromObject(root);
  if(!isFinite(b.min.y)||!isFinite(b.max.y)) return null;
  state.bodySpan={min:b.min.y,max:b.max.y};
  return state.bodySpan;
}
function anchorY(name){
  const span=bodySpanY(); if(!span) return 0;
  return span.min + (FLOW_ANCHORS[name]!==undefined?FLOW_ANCHORS[name]:.75) * (span.max-span.min);
}

/* One uniform object per class. Every mesh of that class shares it, which is
   what makes the whole system one write per frame instead of hundreds. */
function classUniforms(cls){
  if(state.flow.classes[cls]) return state.flow.classes[cls];
  const THREE=state.THREE;
  const spec=FLOW_CLASSES[cls]||FLOW_CLASSES.bone;
  const r=spec.rule||{};
  state.flow.classes[cls]={
    uBeat:{value:1},
    uFlowColor:{value:new THREE.Color(spec.flow)},
    uOrigin:{value:anchorY(r.from||'heart')},
    uWrap:{value:r.wrap==='down'?-1:r.wrap==='up'?1:0},
    uDir:{value:r.dir||1},
    uSpeed:{value:r.speed||0},
    uFreq:{value:r.freq||0},
    uSharp:{value:r.sharp||1},
    uGain:{value:r.gain||0},
    /* Deformation amount and mode are decoupled from the glow (uBeat) so a
       class can deform on its own envelope: lungs ride the breath, muscle the
       squeeze, peristalsis runs steady. */
    uDeform:{value:0},
    uMode:{value:r.mode==='inflate'?2:r.mode==='peristalsis'?3:1},
  };
  return state.flow.classes[cls];
}

/*
 * Patch one material.
 *
 * onBeforeCompile is the only way into the standard material's lighting without
 * reimplementing it, and three does NOT fold the patch into its program cache
 * key -- so customProgramCacheKey has to name the variant, or every class after
 * the first silently reuses the first one's compiled program.
 */
function installFlow(mesh,cls){
  const spec=FLOW_CLASSES[cls]; if(!spec||!mesh.material) return;
  const mat=mesh.material;
  if(mat.color) mat.color.setHex(spec.color);
  if(!spec.rule) return;                    /* coloured, but nothing to animate */
  const uni=classUniforms(cls);
  const rule=spec.rule;
  /* A rule can deform only some meshes of a class -- peristalsis on the gut
     tube but not the liver, ureters but not the kidneys. Meshes that do not
     match are coloured but otherwise static. */
  const deform=!!rule && (rule.contract || rule.mode)
    && (!rule.match || rule.match.test(mesh.userData.label||mesh.name||''));
  let mCenter=null,mAxis=null,mAmt=0;
  if(deform){
    const g=mesh.geometry;
    if(!g.boundingBox) g.computeBoundingBox();
    const bb=g.boundingBox;
    const size=[bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z];
    const longest=size.indexOf(Math.max(...size));
    mCenter=new state.THREE.Vector3((bb.min.x+bb.max.x)/2,(bb.min.y+bb.max.y)/2,(bb.min.z+bb.max.z)/2);
    const mode=rule.mode;
    if(mode==='inflate'){
      /* A lung expands evenly from its own centre; the contract squash would
         read as the lung being squeezed, not breathing. */
      mAxis=new state.THREE.Vector3(0,1,0);
      mAmt=rule.inflate||.05;
    }else if(mode==='peristalsis'){
      /* The tube direction is taken as the mesh's longest axis, and a narrow
         band of constriction travels along it, pinching perpendicular at the
         front. */
      mAxis=new state.THREE.Vector3(longest===0?1:0,longest===1?1:0,longest===2?1:0);
      mAmt=rule.pinch||.18;
    }else{
      mAxis=new state.THREE.Vector3(longest===0?1:0,longest===1?1:0,longest===2?1:0);
      /* A long strap muscle shortens visibly; a short stubby one barely moves in
         life either, so the amount tracks how elongated the mesh actually is --
         unless the rule sets its own squeeze ('contract: 0.14'), as the heart
         chambers do. */
      const ratio=Math.max(...size)/(Math.min(...size)||1e-4);
      mAmt=(typeof rule.contract==='number'&&rule.contract>0)
        ?rule.contract
        :Math.min(.11,.03+.014*Math.min(6,ratio));
    }
  }
  /* The deformed and colour-only meshes of a class compile to different
     programs, so the cache key has to name the variant or the first to compile
     is silently reused for every mesh of the class. */
  mat.customProgramCacheKey=()=>'rssflow:'+cls+(deform?':d':':c');
  mat.onBeforeCompile=(sh)=>{
    sh.uniforms.uT=state.flow.uT;
    sh.uniforms.uOn=state.flow.uOn;
    Object.assign(sh.uniforms,uni);
    if(deform){
      sh.uniforms.uMCenter={value:mCenter};
      sh.uniforms.uMAxis={value:mAxis};
      sh.uniforms.uMAmt={value:mAmt};
    }
    sh.vertexShader='varying float vFlowY;\n'
      +(deform?'uniform float uDeform;uniform vec3 uMCenter;uniform vec3 uMAxis;uniform float uMAmt;uniform float uMode;\nuniform float uT;uniform float uSpeed;uniform float uDir;uniform float uFreq;uniform float uSharp;\n':'')
      +sh.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\n'
        +(deform
          ?'float rssAlong=dot(transformed-uMCenter,uMAxis);\n'
           +'vec3 rssPerp=(transformed-uMCenter)-rssAlong*uMAxis;\n'
           +'if(uMode>2.5){/* peristalsis: a ring of constriction travelling along the tube */\n'
           +'  float rssW=rssAlong*uFreq-uT*uSpeed*uDir*uFreq;\n'
           +'  float rssRip=pow(max(0.,.5+.5*sin(rssW*6.2831853)),uSharp);\n'
           +'  transformed-=rssPerp*rssRip*uMAmt*uDeform;\n'
           +'}else if(uMode>1.5){/* inflate: even expansion away from the centre */\n'
           +'  transformed+=(transformed-uMCenter)*uDeform*uMAmt;\n'
           +'}else{/* contract: shorten along the axis, thicken across it */\n'
           +'  transformed-=uMAxis*rssAlong*uDeform*uMAmt;\n'
           +'  transformed+=rssPerp*uDeform*uMAmt*.55;\n'
           +'}\n'
          :'')
        +'vFlowY=(modelMatrix*vec4(transformed,1.0)).y;');
    sh.fragmentShader='varying float vFlowY;\n'
      +'uniform float uT;uniform float uOn;uniform float uBeat;uniform vec3 uFlowColor;\n'
      +'uniform float uOrigin;uniform float uWrap;uniform float uDir;uniform float uSpeed;\n'
      +'uniform float uFreq;uniform float uSharp;uniform float uGain;\n'
      +sh.fragmentShader.replace('#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\n'
        +'float rssD=vFlowY-uOrigin;\n'
        /* An 'up' or 'down' rule lights only the half of the body it applies
           to: lymph does not drain downward, so nothing below the duct glows. */
        +'float rssSide=uWrap>.5?step(0.,rssD):(uWrap<-.5?step(rssD,0.):1.);\n'
        +'float rssBand=1.;\n'
        +'if(uFreq>0.){float w=abs(rssD)*uFreq-uT*uSpeed*uDir*uFreq;\n'
        +'rssBand=pow(max(0.,.5+.5*sin(w*6.2831853)),uSharp);}\n'
        +'totalEmissiveRadiance+=uFlowColor*rssBand*rssSide*uGain*uBeat*uOn;');
  };
  mat.needsUpdate=true;
}

/* Classify and colour a whole layer as it lands. */
export function installLayerFlow(key,meshes){
  const counts={};
  meshes.forEach(o=>{
    const cls=classify(key,o.userData.label||o.name);
    o.userData.flowClass=cls;
    counts[cls]=(counts[cls]||0)+1;
    installFlow(o,cls);
    /* Tendons, bursae and the other connective tissue do not contract, and while
       physiology is on they sit pale and static over the contracting muscles --
       so they are dropped for the animation and restored when it is off. */
    if(cls==='tendon'||cls==='bursa'){ state.flow.connective.push(o); o.visible=!state.flow.on; }
  });
  state.flow.counts[key]=counts;
  /* The span is only knowable once something is in the scene, so anchors set
     against a not-yet-loaded skeleton get corrected here. */
  Object.entries(state.flow.classes).forEach(([cls,u])=>{
    const r=(FLOW_CLASSES[cls]||{}).rule;
    if(r) u.uOrigin.value=anchorY(r.from||'heart');
  });
  return counts;
}

/* Tendons, bursae and the other connective tissue drop out of view while
   physiology is running so the contracting muscles are not occluded, and come
   back when it is turned off. Re-applied from applyLayers too, so a layer
   toggle or a cleared study focus cannot resurrect them mid-animation. */
export function applyConnectiveVisibility(){
  /* applyVisibility now calls this on every pass, including the ones that run
     while the scene is still booting -- before state.flow exists. */
  if(!state.flow||!state.flow.connective) return;
  const show=!state.flow.on;
  state.flow.connective.forEach(m=>{ m.visible=show; });
}
export function setPhysiology(on){
  state.flow.on=!!on;
  state.flow.uOn.value=on?1:0;
  /* stepPhysiology only writes these while live is on, so turning it off mid-
     cycle would leave uDeform frozen at the last value -- a muscle stuck at
     full bulge or a lung held half-swollen under the restored structures. Zero
     them so every mesh returns to its rest shape. */
  if(!on){
    state.flow.uT.value=0;
    Object.values(state.flow.classes).forEach(u=>{ if(u.uDeform) u.uDeform.value=0; });
  }
  applyConnectiveVisibility();
  return state.flow.on;
}

/* Called every frame. A dozen float writes drive every mesh in the body. */
export function stepPhysiology(t){
  if(!state.flow.on) return;
  state.flow.uT.value=t;
  const beat=cardiacEnvelope(t),spike=spikeEnvelope(t),breath=breathEnvelope(t),squeeze=contractEnvelope(t),atrial=atriumEnvelope(t),ventricular=ventricleEnvelope(t);
  Object.entries(state.flow.classes).forEach(([cls,u])=>{
    const r=(FLOW_CLASSES[cls]||{}).rule; if(!r) return;
    u.uBeat.value=r.beat==='cardiac'?.25+.75*beat
      :r.beat==='spike'?.1+.9*spike
      :r.beat==='breath'?.3+.7*breath
      :r.beat==='contract'?.2+.8*squeeze
      :1;
    /* The deformation amount is its own envelope per class: lungs ride the
       breath, muscle the squeeze, peristalsis runs steady at full strength,
       the arteries swell with the pulse, and the two chamber types contract
       at their own moment of the cardiac cycle. */
    u.uDeform.value=r.deform==='breath'?breath
      :r.deform==='contract'?squeeze
      :r.deform==='cardiac'?beat
      :r.deform==='atrial'?atrial
      :r.deform==='ventricular'?ventricular
      :r.deform==='steady'?1 : 0;
  });
}
/* Named structures per layer, from the index -- the same collapsing the chips
   and the search use, so all three agree. Meshes are geometry; this is anatomy. */
const LAYER_NAMED=MESH_INDEX.reduce((a,m)=>{a[m.layer]=(a[m.layer]||0)+1;return a},{});
/* and, of those, how many the course material actually names */
const LAYER_COURSE=MESH_INDEX.reduce((a,m)=>{if(m.tier===0)a[m.layer]=(a[m.layer]||0)+1;return a},{});
/* and how many separate things a tap can select: every course-named structure
   plus one per group of the rest. The three numbers only agree because they
   all come out of the same index -- see UNITS in mesh-index.js. */
const LAYER_UNITS=UNITS.reduce((a,u)=>{a[u.layer]=(a[u.layer]||0)+1;return a},{});
export function updateStageMeta(){
  const on=Object.keys(state.layers).filter(k=>state.layers[k]);
  if(!on.length){els.stageMeta.textContent='No layer shown — turn one on to study it';return}
  const named=on.reduce((t,k)=>t+(LAYER_NAMED[k]||0),0);
  const course=on.reduce((t,k)=>t+(LAYER_COURSE[k]||0),0);
  const units=on.reduce((t,k)=>t+(LAYER_UNITS[k]||0),0);
  /* The second number is the one that answers "which of these do I have to
     remember?" -- see the Sources & model dialog. */
  const base=on.length===1&&on[0]==='skeleton'
    ?`Precise Z-Anatomy / BodyParts3D skeleton · ${LAYER_NAMED.skeleton} structures, ${LAYER_COURSE.skeleton} named by your course, ${LAYER_UNITS.skeleton} you can select`
    :`${on.map(k=>LAYER_NAMES[k]||k).join(' + ')} · ${named} structures, ${course} named by your course, ${units} you can select · tap one`;
  /* Say what the region filter did, or it looks like nothing happened. */
  if(state.region&&state.region!=='all'){
    const bones=state.fullMeshes.filter(m=>m.visible).length;
    const soft=Object.entries(state.extraModels||{})
      .filter(([k])=>state.layers[k]).reduce((t,[,m])=>t+m.meshes.filter(o=>o.visible).length,0);
    els.stageMeta.textContent=`${regionLabel(state.region)} only · ${bones} bone mesh${bones===1?'':'es'}`
      +(soft?` + ${soft} soft-tissue mesh${soft===1?'':'es'} inside its measured box`:'');
    return;
  }
  els.stageMeta.textContent=base;
}
/*
 * Layers composite. They are not alternatives to each other: the whole point
 * of a shared body frame is that muscle over bone is the real spatial
 * relationship, so any combination can be on at once.
 */
export function applyLayers(){
  Object.entries(state.extraModels).forEach(([k,m])=>{
    m.root.visible=!!state.layers[k];
    const op=state.layerOpacity?.[k];
    if(op!==undefined)m.meshes.forEach(o=>{
      if(!o.material)return;
      const t=op<.99;
      if(o.material.transparent!==t)o.material.needsUpdate=true;
      o.material.transparent=t;o.material.opacity=op;o.material.depthWrite=!t;
    });
  });
  /* The skeleton ghosts too -- seeing vessels against translucent bone is the
     whole reason to put two layers on at once. */
  const so=state.layerOpacity?.skeleton;
  if(so!==undefined)[...state.fullMeshes,...state.meshes].forEach(o=>{
    if(!o.material)return;
    const t=so<.99;
    /* three.js compiles transparency into the shader program, so flipping the
       flag without needsUpdate leaves the mesh stubbornly opaque. */
    if(o.material.transparent!==t)o.material.needsUpdate=true;
    o.material.transparent=t;o.material.opacity=so;o.material.depthWrite=!t;
  });
  state.activeExtra=Object.keys(state.extraModels).filter(k=>state.layers[k]).pop()||null;
  applyVisibility();
  applyConnectiveVisibility();
  if(typeof enforceHidden==='function')enforceHidden();
  updateStageMeta();
}
/*
 * Study focus.
 *
 * A lesson does not want the whole body -- it wants the four carpal rows, or
 * the heart valves, framed and named. focusStructures resolves names against a
 * layer, hides that layer's other meshes, ghosts the skeleton behind them for
 * context, and frames the camera on what is left.
 *
 * Names resolve exactly or with the glued side letter. Prefix a name with '~'
 * to match on containment instead -- "~vertebra" is how you ask for all 24 of
 * them without listing every one.
 */
export function normName(v){return String(v||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim()}
export function layerPool(key){return key==='skeleton'?state.fullMeshes:(state.extraModels[key]?.meshes||[])}
function resolveMeshNames(key,names){
  const pool=layerPool(key);
  const out=new Set();
  (names||[]).forEach(n=>{
    const loose=String(n).startsWith('~');
    const w=normName(loose?String(n).slice(1):n);
    if(!w)return;
    pool.forEach(o=>{
      const l=normName(o.userData.label||o.name);
      if(loose?l.includes(w):(l===w||l===w+'l'||l===w+'r'))out.add(o);
    });
  });
  return [...out];
}
export function clearStudyFocus(){
  if(!state.focus)return;
  const {key}=state.focus;
  layerPool(key).forEach(o=>{o.visible=true;if(o.material)o.material.emissive?.setHex(0x000000)});
  state.focus=null;
  applyLayers();
}
export async function focusStructures(spec){
  if(!state.scene)return {ok:false,reason:'not-booted',found:0};
  const key=spec.layer||'skeleton';
  if(key!=='skeleton'){
    if(!state.extraModels[key]){
      if(!spec.file)return {ok:false,reason:'no-file',found:0};
      await loadExtraModel(key,spec.file);
    }
  }
  clearStudyFocus();
  const hits=resolveMeshNames(key,spec.meshes);
  /* An unresolvable name must not silently show the whole body as if it were
     the answer -- the caller shows a still diagram instead. */
  if(!hits.length)return {ok:false,reason:'no-match',found:0};
  Object.keys(state.layers).forEach(k=>{state.layers[k]=false});
  state.layers[key]=true;
  state.layerOpacity={...(state.layerOpacity||{}),[key]:1};
  if(spec.ghostBody&&key!=='skeleton'){state.layers.skeleton=true;state.layerOpacity.skeleton=.16}
  applyLayers();
  if(spec.isolate!==false){
    const keep=new Set(hits);
    layerPool(key).forEach(o=>{o.visible=keep.has(o)});
  }
  if(typeof enforceHidden==='function')enforceHidden();
  const THREE=state.THREE;
  hits.forEach(o=>{if(o.material)o.material.emissive?.setHex(0x14574f)});
  if(THREE&&state.camera&&state.controls){
    const box=new THREE.Box3();
    hits.forEach(o=>box.expandByObject(o));
    const c=box.getCenter(new THREE.Vector3());
    const size=box.getSize(new THREE.Vector3());
    const radius=Math.max(size.x,size.y,size.z,.4);
    const dir=state.camera.position.clone().sub(state.controls.target).normalize();
    const dist=Math.min(state.controls.maxDistance,Math.max(state.controls.minDistance,radius*2.6));
    state.controls.target.copy(c);
    state.camera.position.copy(c).add(dir.multiplyScalar(dist));
    state.controls.update();
  }
  state.focus={key,count:hits.length};
  els.stageMeta.textContent=`${spec.label||LAYER_NAMES[key]||key} · ${hits.length} named mesh${hits.length===1?'':'es'} · tap to name them`;
  return {ok:true,found:hits.length};
}

/*
 * Projection view.
 *
 * A radiograph is an accumulation of attenuation along a ray, so the honest
 * cheap analogue is additive blending with depth-write off: every surface the
 * ray crosses adds a little brightness, and thick or overlapping bone comes out
 * bright while soft tissue is a haze. Bone carries roughly ten times the weight
 * of muscle here, which is the right order for the effect, not a dose figure.
 *
 * The camera is a very narrow field of view pulled a long way back, which is a
 * near-parallel projection. That is also this view's honest limit: a parallel
 * projection CANNOT distinguish PA from AP. The difference between them is beam
 * direction, object-to-detector distance and the resulting magnification -- none
 * of which geometry alone reproduces. The pane says so.
 */

/*
 * Projection view.
 *
 * The first version accumulated surfaces: every polygon the ray crossed added a
 * fixed amount of brightness. That is wrong in a way worth spelling out. These
 * meshes are hollow shells, so a femur contributed the same two crossings as a
 * sheet of bone one millimetre thick, and everything came out looking like
 * outlines rather than solid bone.
 *
 * This version measures the path length THROUGH material and applies
 * Beer-Lambert. Each fragment writes its own distance from the camera, signed
 * by facing: back faces add, front faces subtract. Summed over a ray with
 * additive blending, sum(exits) - sum(entries) is exactly the distance spent
 * inside solid material, and it stays correct for any number of separate
 * objects stacked along the ray. Scaled by a per-tissue attenuation
 * coefficient, that sum is optical depth, and the film reads 1 - exp(-tau).
 *
 * So bone is bright because the ray spent longer in bone, not because it
 * crossed more polygons. Cortex and marrow still do not differ -- the source
 * meshes are surfaces with nothing inside them -- and the pane says so.
 *
 * mu values below are relative, chosen so bone/soft-tissue contrast lands in
 * the familiar range. They are not tabulated linear attenuation coefficients
 * and no dose or kVp is implied.
 */
export const XRAY_MU={skeleton:1.0,joint:.30,organs:.16,muscle:.10,circulatory:.13,nervous:.10,lymphatic:.12};

const XRAY_VERT=`
varying float vDist;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const XRAY_FRAG=`
uniform float uMu;
varying float vDist;
void main(){
  /* Back faces are where the ray leaves material, front faces where it enters. */
  float sgn = gl_FrontFacing ? -1.0 : 1.0;
  gl_FragColor = vec4(sgn * vDist * uMu, 0.0, 0.0, 1.0);
}`;
const XRAY_POST_FRAG=`
uniform sampler2D tTau;
uniform float uGain, uLatitude, uGrain, uSeed, uFlipX;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  /* Shells that are not quite closed can integrate slightly negative. */
  vec2 uv = vec2(uFlipX > 0.5 ? 1.0 - vUv.x : vUv.x, vUv.y);
  float tau = max(0.0, texture2D(tTau, uv).r) * uGain;
  float transmitted = exp(-tau);
  float density = 1.0 - transmitted;
  /* Film latitude: the toe and shoulder of the characteristic curve. */
  density = pow(density, uLatitude);
  /* Quantum mottle. Noise rises where fewer photons arrive, as it does on film. */
  float n = hash(uv * 1024.0 + uSeed) - 0.5;
  density += n * uGrain * (0.35 + 0.65 * density);
  gl_FragColor = vec4(vec3(clamp(density, 0.0, 1.0)), 1.0);
}`;

export function xrayDepthMaterial(THREE,mu){
  return new THREE.ShaderMaterial({
    uniforms:{uMu:{value:mu}},
    vertexShader:XRAY_VERT, fragmentShader:XRAY_FRAG,
    side:THREE.DoubleSide, depthTest:false, depthWrite:false,
    blending:THREE.CustomBlending, blendEquation:THREE.AddEquation,
    blendSrc:THREE.OneFactor, blendDst:THREE.OneFactor,
  });
}

export function enterXray(){
  /* A peel in progress would be captured as the 'original' opacity by the
     material swap below and come back at 6% when the projection exits. */
  if(typeof restorePeel==='function')restorePeel();
  if(state.xray||!state.scene)return false;
  const THREE=state.THREE;
  const c=state.camera, ctr=state.controls;
  /*
   * Size the film in DEVICE pixels, not CSS pixels.
   *
   * getSize returns CSS pixels; the canvas the post pass blits onto is
   * pixelRatio times that (capped at 1.7 in boot3D). Sizing the target from
   * getSize therefore rendered the projection at 1/pixelRatio and let the GPU
   * upscale it -- on any HiDPI screen the film came out visibly softer than the
   * 3D view beside it, which is a poor look for the one view meant to resemble
   * a radiograph. getDrawingBufferSize is that same number already multiplied.
   */
  const size=new THREE.Vector2();
  state.renderer.getDrawingBufferSize(size);
  const rt=new THREE.WebGLRenderTarget(Math.max(2,size.x),Math.max(2,size.y),{
    type:THREE.FloatType, format:THREE.RedFormat,
    minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter, depthBuffer:false,
  });
  const post=new THREE.Scene();
  const postCam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const postMat=new THREE.ShaderMaterial({
    uniforms:{tTau:{value:rt.texture},uGain:{value:1.6},uLatitude:{value:.78},uGrain:{value:.05},uSeed:{value:0},uFlipX:{value:0}},
    vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }',
    fragmentShader:XRAY_POST_FRAG, depthTest:false, depthWrite:false,
  });
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),postMat));

  state.xray={
    mats:new Map(), shared:new Map(), rt, post, postCam, postMat,
    bg:state.scene.background, fog:state.scene.fog,
    fov:c.fov, near:c.near, far:c.far,
    minD:ctr.minDistance, maxD:ctr.maxDistance,
    pos:c.position.clone(), target:ctr.target.clone(),
    layers:{...state.layers}, layerOpacity:{...(state.layerOpacity||{})},
    motion:state.motionEnabled, autoClear:state.renderer.autoClear,
    concepts:state.conceptGroup?state.conceptGroup.visible:true,
    clip:state.renderer.clippingPlanes,
    tools:state.toolGroup?state.toolGroup.visible:true,
    exposure:1.6, view:'pa', region:'chest',
  };
  /*
   * The projection is a skeleton film.
   *
   * It used to pass the beam through whatever the 3D tab happened to have
   * loaded, which made the exposure a function of what had been browsed earlier
   * in the session rather than of the controls: the same Chest / PA button read
   * at mean 15.6 before the muscle layer had ever been opened and at 43.1 after,
   * with a fifth of the pane blown out. Six soft-tissue layers at 0.10-0.30
   * against bone at 1.00 also do not add up to a radiograph -- they add up to a
   * fog with a skeleton somewhere in it. So the beam sees bone, always, and only.
   * Whatever is on in the 3D tab is restored on the way out.
   */
  state.layers.skeleton=true;
  Object.keys(state.extraModels||{}).forEach((k)=>{state.layers[k]=false});
  /*
   * Cavities, regions and planes are teaching overlays drawn ON the anatomy.
   * A radiograph has nothing painted on it, and an additive beam would render
   * them as bright fog anyway, so they are hidden here rather than composited.
   */
  if(state.conceptGroup)state.conceptGroup.visible=false;
  if(state.pickGroup)state.pickGroup.visible=false;
  /*
   * The pen strokes and pinned labels go with them, and unlike the cut this
   * one was doing real damage. renderXray renders the WHOLE scene, and the
   * annotation materials are never swapped for the depth material, so ink
   * composited into an additive beam as light rather than as marks. Measured
   * before this line existed: five pinned labels lifted the mean density of a
   * chest PA from 19.15 to 25.86, a third brighter. The group is a scene
   * sibling rather than a child of the body root (see
   * studio/tools-and-capture.js), so hiding the model does not hide these --
   * they have to be turned off by name.
   */
  if(state.toolGroup)state.toolGroup.visible=false;
  /*
   * And the section cut is SUSPENDED, explicitly.
   *
   * It was already inert here, which is the actual problem. xrayDepthMaterial
   * builds a raw ShaderMaterial, and three.js only clips a material that opts
   * into clipping -- so renderer.clippingPlanes has no effect on the beam at
   * all. A student could set "axial at the sternal angle", switch to
   * Projection, and be shown a whole undivided chest with nothing anywhere
   * saying the cut had been ignored. Measured: with the cut applied and this
   * line absent, a chest PA came back at mean density 26.210 against 26.207
   * without it -- inside the grain, i.e. no effect whatsoever. A control that
   * quietly does nothing is worse than one that is unavailable, so the cut is
   * suspended here and the Tools card says so in as many words.
   *
   * Emptying the list rather than leaving it is what makes that suspension
   * true rather than accidental: if anyone later gives the x-ray material
   * clipping support, the beam would start leaving each shell through a cut
   * face that has no back face to subtract, and the depth integral -- front
   * faces minus back faces, which assumes closed surfaces -- would run away
   * into densities no exposure produced. This line means that change cannot
   * silently corrupt the film.
   *
   * state.cut itself is left alone, so the plane the student set comes back
   * exactly as it was when they leave the projection -- only the renderer's
   * list is emptied, and exitXray puts it back.
   */
  state.renderer.clippingPlanes=[];
  const shared=(key)=>{
    if(!state.xray.shared.has(key))state.xray.shared.set(key,xrayDepthMaterial(THREE,XRAY_MU[key]||.12));
    return state.xray.shared.get(key);
  };
  const apply=(mesh,key)=>{state.xray.mats.set(mesh,mesh.material);mesh.material=shared(key);mesh.userData.xrayKey=key};
  state.fullMeshes.forEach(m=>apply(m,'skeleton'));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>l.meshes.forEach(m=>apply(m,k)));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>{l.root.visible=!!state.layers[k]});
  state.scene.background=null;
  state.scene.fog=null;
  /* A yaw would smear a projection that is meant to be read square on. */
  state.motionEnabled=false;
  [state.fullModel,state.realModel,...Object.values(state.extraModels||{}).map(m=>m.pivot)]
    .forEach(r=>{if(r)r.rotation.y=0});
  ctr.minDistance=.5; ctr.maxDistance=900;
  setXrayRegion('chest');
  return true;
}

/*
 * Collimation.
 *
 * A whole-body film is not a thing anyone is handed, so the view offers regions
 * that are. Every centre and field size below was measured off the loaded
 * skeleton rather than guessed -- ribs centre at y 3.74 and stand 2.71 tall,
 * the hip bones centre at y 1.33, a hand centres near x 2.1, y 0.47.
 *
 * The model is 11.8 units for a 1.7 m body, so one metre is about 6.94 units.
 * Source-to-image distances are set in real terms and converted: 180 cm for a
 * chest, 100 cm for the rest. The beam diverges from that point, which is what
 * makes PA and AP genuinely different here rather than a label -- whatever lies
 * further from the detector is magnified more.
 */
const XRAY_UNITS_PER_M=6.94;
const XRAY_REGIONS={
  chest: {label:'Chest',      c:[0,3.80,0], half:1.95, sid:1.80},
  abdo:  {label:'Abdomen',    c:[0,2.30,0], half:1.95, sid:1.00},
  pelvis:{label:'Pelvis',     c:[0,1.33,0], half:1.15, sid:1.00},
  hand:  {label:'Hand',       c:[2.10,0.47,0], half:0.78, sid:1.00},
  body:  {label:'Whole body', c:[0,1.00,0], half:6.10, sid:4.00},
};
export function setXrayRegion(key){
  if(!state.xray)return;
  state.xray.region=key;
  applyXrayCamera();
}
export function setXrayView(view){
  if(!state.xray)return;
  state.xray.view=view;
  applyXrayCamera();
}
function applyXrayCamera(){
  const x=state.xray; if(!x)return;
  const THREE=state.THREE, c=state.camera, ctr=state.controls;
  const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
  const dist=R.sid*XRAY_UNITS_PER_M;
  c.fov=2*Math.atan(R.half/dist)*180/Math.PI;
  c.updateProjectionMatrix();
  xrayClip();
  ctr.target.set(R.c[0],R.c[1],R.c[2]);
  /*
   * +z is anterior on this model -- the face looks that way. PA puts the source
   * behind the patient, AP in front.
   */
  const dir=x.view==='lat'?new THREE.Vector3(1,0,0)
    :new THREE.Vector3(0,0,x.view==='ap'?1:-1);
  c.position.copy(ctr.target).add(dir.multiplyScalar(dist));
  c.up.set(0,1,0);
  ctr.update();
  /*
   * Both a PA and an AP film are read as though you were facing the patient,
   * their right on your left. Viewed from behind, PA comes out mirrored, so the
   * image is flipped to match how it would actually be hung.
   */
  x.postMat.uniforms.uFlipX.value=x.view==='pa'?1:0;
  x.shownSid=null; x.shownOff=null;
}
/*
 * The clip planes have to follow the dolly. Pinning them to the distance the
 * region was set up at meant zooming out pushed the body past the far plane and
 * the whole pane went black. Depth precision is irrelevant here -- the depth
 * test is off -- so the span can be generous enough to always contain the body.
 */
function xrayOffAxis(){
  const x=state.xray; if(!x)return 0;
  const THREE=state.THREE, c=state.camera, ctr=state.controls;
  const nominal=x.view==='lat'?new THREE.Vector3(1,0,0)
    :new THREE.Vector3(0,0,x.view==='ap'?1:-1);
  const actual=c.position.clone().sub(ctr.target).normalize();
  return Math.acos(Math.max(-1,Math.min(1,actual.dot(nominal))))*180/Math.PI;
}
function xrayClip(){
  const c=state.camera, ctr=state.controls;
  const d=c.position.distanceTo(ctr.target);
  const span=40;
  const near=Math.max(.05,d-span), far=d+span;
  if(c.near!==near||c.far!==far){c.near=near;c.far=far;c.updateProjectionMatrix()}
  return d;
}
export function setXrayExposure(v){
  if(!state.xray)return;
  state.xray.exposure=v;
  state.xray.postMat.uniforms.uGain.value=v;
}
export function renderXray(){
  const x=state.xray; if(!x)return false;
  const r=state.renderer;
  const d=xrayClip();
  /* Dollying really is changing the source-to-image distance, so say so. */
  const sid=Math.round(d/XRAY_UNITS_PER_M*100);
  /*
   * Orbit away from the nominal axis and this stops being the projection its
   * button claims. Saying "AP" over an oblique is exactly the kind of quiet
   * wrongness this view is supposed to avoid, so the label degrades to oblique
   * with the angle off axis.
   */
  const off=Math.round(xrayOffAxis());
  if(sid!==x.shownSid||off!==x.shownOff){
    x.shownSid=sid; x.shownOff=off;
    const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
    const names={pa:'PA',ap:'AP',lat:'Lateral'};
    const proj=off>4?`oblique · ${off}° off ${names[x.view]||x.view}`:(names[x.view]||x.view);
    els.stageMeta.textContent=`${R.label} · ${proj} · SID ${sid} cm · simulated · tap to name`;
  }
  x.postMat.uniforms.uSeed.value=(performance.now()*.06)%1000;
  r.autoClear=true;
  r.setRenderTarget(x.rt);
  r.setClearColor(0x000000,1);
  r.clear(true,false,false);
  r.render(state.scene,state.camera);
  r.setRenderTarget(null);
  r.render(x.post,x.postCam);
  return true;
}
export function exitXray(){
  const x=state.xray; if(!x)return;
  const c=state.camera, ctr=state.controls;
  x.mats.forEach((orig,mesh)=>{mesh.material=orig;delete mesh.userData.xrayKey});
  x.shared.forEach(m=>m.dispose());
  x.postMat.dispose(); x.rt.dispose();
  state.scene.background=x.bg; state.scene.fog=x.fog;
  c.fov=x.fov;c.near=x.near;c.far=x.far;c.updateProjectionMatrix();
  ctr.minDistance=x.minD;ctr.maxDistance=x.maxD;
  c.position.copy(x.pos);ctr.target.copy(x.target);ctr.update();
  state.layers=x.layers;state.layerOpacity=x.layerOpacity;
  state.motionEnabled=x.motion;
  if(state.conceptGroup)state.conceptGroup.visible=x.concepts;
  if(state.pickGroup)state.pickGroup.visible=true;
  if(state.toolGroup)state.toolGroup.visible=x.tools!==false;
  /* the suspended section, put back exactly as it was */
  state.renderer.clippingPlanes=x.clip||[];
  state.renderer.autoClear=x.autoClear;
  state.renderer.setRenderTarget(null);
  state.xray=null;
  applyLayers();
}
export function setLayer(key,on){
  /* Meshes carried by a movement live under the pivot group, not their layer
     root, so a toggle mid-movement could not hide them. End it first. */
  if(state.movement)endMovement();
  state.layers[key]=!!on;
  applyLayers();
}
export function setExtraVisible(key){
  /* Exclusive mode, kept for the structure-set flow: show one system alone. */
  Object.keys(state.extraModels).forEach(k=>{state.layers[k]=(k===key)});
  state.layers.skeleton=!key;
  applyLayers();
}
/*
 * Sub-parts are not separately selectable.
 *
 * The model breaks structures down further than the course does -- the deltoid
 * is three "parts", the trapezius three, the left lung's bronchial tree eleven
 * segmental branches. Tapping one of those selected that fragment alone and
 * named it "Acromial part of deltoid muscle", which is not a thing anyone is
 * asked to identify and left the rest of the muscle dark.
 *
 * mesh-index.js already marks those rows tier 1 and gives each a family. Here
 * that grouping decides what a TAP selects: the whole unit lights together
 * and is named as the unit. Left and right stay separate -- the L2 drill is
 * exactly about telling them apart -- so sides are never merged.
 */
const tightKey=(v)=>normName(v).replace(/[^a-z0-9]/g,'');
let _unitMap=null;
/* layer -> Map(tight mesh name -> its index row, which carries its unit). */
function unitMap(){
  if(_unitMap) return _unitMap;
  _unitMap=new Map();
  MESH_INDEX.forEach((r)=>{
    if(!_unitMap.has(r.layer)) _unitMap.set(r.layer,new Map());
    _unitMap.get(r.layer).set(tightKey(r.name),r);
  });
  return _unitMap;
}
/*
 * What the panel says about a structure the course does not name.
 *
 * It has to answer the question the student actually has -- "why is this one
 * thing called something else, and do I have to learn it?" -- rather than
 * repeat the atlas's own confidence about every mesh equally.
 */
export function unitBlurb(unit,key){
  const layer=(LAYER_NAMES[key]||key).toLowerCase();
  if(!unit) return `Named structure in the ${layer} layer of the BodyParts3D atlas.`;
  if(unit.unitKind==='group')
    return `Your course material names none of these one by one, so the ${unit.unitSize} of them are selected together under a name it does use. The atlas calls this one "${unit.name}".`;
  if(unit.unitKind==='lone')
    return `Modelled in the ${layer} layer and named in none of your course material. Nothing of its kind is near enough to group it with, so it stays on its own.`;
  return `Named structure in the ${layer} layer of the BodyParts3D atlas.`;
}
/* The study unit a raw GLB name belongs to, or null if the index has no such
   name (unnamed geometry, and the handful of modelling artefacts). */
export function unitFor(layerKey,raw){
  const fm=unitMap().get(layerKey);
  if(!fm) return null;
  const k=tightKey(raw);
  return fm.get(k)||(/[lr]$/.test(k)?fm.get(k.slice(0,-1)):null)||null;
}

export function highlightExtra(mesh){
  const m=state.extraModels[state.activeExtra];
  if(!m)return;
  m.meshes.forEach(o=>{o.material.emissive?.setHex(0x000000)});
  /* Sub-parts share one canonicalId (see loadExtraModel), so the thing that
     was tapped is every mesh carrying that id, not the one triangle hit. */
  const kin=m.meshes.filter(o=>o.userData.canonicalId===mesh.userData.canonicalId);
  const lit=kin.length?kin:[mesh];
  lit.forEach(o=>o.material.emissive?.setHex(0x1c6f66));
  if(state.camera&&state.controls&&state.THREE){
    const box=new state.THREE.Box3();
    lit.forEach(o=>box.expandByObject(o));
    const c=box.getCenter(new state.THREE.Vector3());
    state.controls.target.copy(c);
    state.controls.update();
  }
  /* Mesh names arrive normalised — "Kidneyl" — so restore a readable label. */
  const raw=String(mesh.userData.label||mesh.name||'');
  let side='';
  let clean=raw.replace(/_/g,' ').trim();
  /*
   * Any non-space char may precede the glued side letter — "Vagus nerve (X)r"
   * ends in ')r'. The partner check below is what makes this safe: we only
   * strip when the opposite-side twin actually exists, so Femur and Vomer,
   * which genuinely end in r, are left alone.
   */
  const m2=clean.match(/^(.*\S)(l|r)$/i);
  if(m2){
    const stem=m2[1].trim();
    const partner=state.extraModels[state.activeExtra]?.meshes.some(o=>{
      const n=String(o.userData.label||o.name||'').replace(/_/g,' ').trim();
      return n.toLowerCase()===(stem+(m2[2].toLowerCase()==='l'?'r':'l')).toLowerCase();
    });
    if(partner){clean=stem;side=m2[2].toLowerCase()==='l'?'Left':'Right'}
  }
  els.selectedName.textContent=clean;
  els.selectedChips.innerHTML=side?`<span class="chip">${side}</span>`:'';
  showPickCallout(lit,side?`${clean}\n${side}`:clean);
}
/*
 * Joint movement player.
 *
 * The skeleton has no skin and no animation track, so movement is driven by
 * rigid-body rotation: the moving meshes are reparented into a pivot group
 * whose origin sits on the joint axis, and that group is rotated. A bone
 * really is a rigid body rotating about a joint axis, so this is the honest
 * representation rather than a shortcut.
 *
 * Pivot and axis are resolved from the bounding boxes of named meshes at
 * runtime, never hard-coded, because the model is rescaled and recentred on
 * import — any baked-in coordinate would silently drift.
 */
function meshesNamed(names,side){
  const norm=s=>String(s||'').toLowerCase().replace(/[()'’]/g,'').replace(/[_\-.,]+/g,' ').replace(/\s+/g,' ').trim();
  const want=names.map(norm);
  const suffix=side==='left'?'l':side==='right'?'r':null;
  return state.fullMeshes.filter(mesh=>{
    const n=norm(mesh.userData?.label||mesh.name);
    return want.some(w=> n===w || (suffix && n===w+suffix) || (!suffix && (n===w+'l'||n===w+'r')) );
  });
}
function endPoint(THREE,names,side,at){
  const ms=meshesNamed(names,side);
  if(!ms.length)return null;
  const box=new THREE.Box3();
  ms.forEach(m=>box.expandByObject(m));
  const c=box.getCenter(new THREE.Vector3());
  /* 'proximal' is the higher end for a limb hanging at the side. */
  if(at==='proximal')c.y=box.max.y;
  else if(at==='distal')c.y=box.min.y;
  return c;
}

/*
 * Soft tissue and a moving joint.
 *
 * A bone genuinely is a rigid body rotating about a joint axis, which is why
 * this player rotates bone meshes directly. Soft tissue splits in two:
 *
 *   distal to the joint  — the hand's vessels, nerves and intrinsic muscles
 *     travel with the forearm as one piece. Rotating them rigidly is right,
 *     so they are attached to the pivot group along with the bones.
 *
 *   crossing the joint   — biceps, the forearm flexors, anything anchored on a
 *     bone that is being held still. These shorten and bulge; they do not
 *     swing. Rotating them would tear them off their origin and quietly teach
 *     something false, so they are ghosted and held, and the panel says so.
 *
 * Classification is by bounding box against the movement's own fixed and
 * moving bone sets, so it follows the data rather than a hard-coded list.
 */
function worldBox(THREE,mesh){
  if(!mesh.geometry)return null;
  if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
  if(!mesh.geometry.boundingBox)return null;
  mesh.updateMatrixWorld();
  return mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
}
function unionBox(THREE,meshes){
  const box=new THREE.Box3();
  let any=false;
  meshes.forEach(m=>{const b=worldBox(THREE,m);if(b){box.union(b);any=true}});
  return any?box:null;
}
function classifySoftTissue(THREE,movingBones,fixedBones){
  const carried=[],held=[];
  const movingBox=unionBox(THREE,movingBones);
  const fixedBox=unionBox(THREE,fixedBones);
  if(!movingBox)return {carried,held};
  /* Err towards holding: a little margin round the fixed bones means anything
     that merely grazes an origin is held rather than rotated. */
  if(fixedBox){
    const pad=fixedBox.getSize(new THREE.Vector3()).multiplyScalar(.03);
    fixedBox.expandByVector(pad);
  }
  Object.entries(state.extraModels||{}).forEach(([key,layer])=>{
    if(!state.layers[key])return;
    layer.meshes.forEach(mesh=>{
      const b=worldBox(THREE,mesh);
      if(!b||!b.intersectsBox(movingBox))return;
      if(fixedBox&&b.intersectsBox(fixedBox))held.push(mesh);
      else carried.push(mesh);
    });
  });
  return {carried,held};
}
export function startMovement(mv){
  const THREE=state.THREE;
  if(!THREE||!state.fullModel){showToast('Open the 3D model first.');return false}
  endMovement();
  const moving=meshesNamed(mv.moves,mv.side);
  if(!moving.length){showToast('Those bones are not in the loaded model.');return false}
  const pivot=endPoint(THREE,[mv.pivot.mesh],mv.side,mv.pivot.at);
  if(!pivot)return false;
  let axis;
  if(mv.axis.vector)axis=new THREE.Vector3(...mv.axis.vector).normalize();
  else{
    const a=endPoint(THREE,[mv.axis.from.mesh],mv.side,mv.axis.from.at);
    const b=endPoint(THREE,[mv.axis.to.mesh],mv.side,mv.axis.to.at);
    if(!a||!b)return false;
    axis=b.clone().sub(a).normalize();
  }
  const group=new THREE.Group();
  group.position.copy(pivot);
  state.fullModel.add(group);
  const {carried,held}=classifySoftTissue(THREE,moving,meshesNamed(mv.fixed,mv.side));
  /* Reparent while preserving world transform, so nothing jumps on attach. */
  const travelling=[...moving,...carried];
  const restore=travelling.map(mesh=>({mesh,parent:mesh.parent}));
  travelling.forEach(mesh=>group.attach(mesh));
  const ghosted=held.map(mesh=>({mesh,opacity:mesh.material?mesh.material.opacity:1,
    transparent:mesh.material?mesh.material.transparent:false}));
  ghosted.forEach(({mesh})=>{
    if(!mesh.material)return;
    if(!mesh.material.transparent)mesh.material.needsUpdate=true;
    mesh.material.transparent=true;mesh.material.opacity=.1;mesh.material.depthWrite=false;
  });
  const note=document.getElementById('mvBarNote');
  if(note){
    if(held.length){
      note.textContent=`${carried.length} soft-tissue structures travel with the bone. `
        +`${held.length} cross the joint and are ghosted and held still — muscle and vessel deform across a joint `
        +`rather than rotating rigidly, so swinging them would tear them off their origin.`;
      note.classList.remove('hidden');
    } else if(carried.length){
      note.textContent=`${carried.length} soft-tissue structures travel with the bone.`;
      note.classList.remove('hidden');
    } else note.classList.add('hidden');
  }
  state.movement={mv,group,axis,restore,ghosted,angle:0,playing:false,dir:1};
  setMovementAngle(mv.range[0]);
  return true;
}
export function setMovementAngle(deg){
  const m=state.movement; if(!m)return;
  const lo=m.mv.range[0], hi=m.mv.range[1];
  m.angle=Math.max(lo,Math.min(hi,deg));
  m.group.setRotationFromAxisAngle(m.axis, m.angle*Math.PI/180);
  const el=document.getElementById('mvBarReadout');
  if(el){
    const stage=(m.mv.stages||[]).filter(s=>m.angle>=s.at).pop();
    el.textContent=`${Math.round(m.angle)}°`+(stage?` — ${stage.note}`:'');
  }
  const sl=document.getElementById('mvBarSlider');
  if(sl&&Math.round(+sl.value)!==Math.round(m.angle))sl.value=String(Math.round(m.angle));
}
export function endMovement(){
  const m=state.movement; if(!m)return;
  m.restore.forEach(({mesh,parent})=>parent&&parent.attach(mesh));
  (m.ghosted||[]).forEach(({mesh,opacity,transparent})=>{
    if(!mesh.material)return;
    if(mesh.material.transparent!==transparent)mesh.material.needsUpdate=true;
    mesh.material.transparent=transparent;mesh.material.opacity=opacity;mesh.material.depthWrite=!transparent;
  });
  m.group.parent&&m.group.parent.remove(m.group);
  state.movement=null;
  const note=document.getElementById('mvBarNote');
  if(note)note.classList.add('hidden');
}
  if(false&&!sessionStorage.getItem('osteology-memory-tip-shown')){const tips=Object.values(MEMORY_TIPS);if(tips.length){showToast(`💡 ${tips[Math.floor(Math.random()*tips.length)].tip}`);sessionStorage.setItem('osteology-memory-tip-shown','1')}}
  window.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&state.selectedId&&!document.getElementById('viewerView').classList.contains('hidden')&&!document.querySelector('dialog[open]'))clearSelection()});
  function restoreFromHash(){if(!location.hash)return;const m=location.hash.match(/^#detail\/([\w:-]+)/);if(!m||m[1]===state.lastDetailId)return;state.hashTries=(state.hashTries||0)+1;const record=getRecord(m[1]);if(!record){if(!state.fullMeshes.length&&!state.meshes.length&&state.hashTries<20)setTimeout(restoreFromHash,250);return}selectBone(record.id);openDetail(record)}
  window.addEventListener('hashchange',restoreFromHash);setTimeout(restoreFromHash,250);
  const activeModelCopy=document.querySelector('#aboutDialog .about p');
  if(activeModelCopy)activeModelCopy.innerHTML='<strong>Active model:</strong> a precise Z-Anatomy / BodyParts3D full skeleton, plus six further BodyParts3D layers — muscles, ligaments, organs, vessels, nerves and lymphatic — in the same registered body frame. The seven layers hold 4,474 named nodes, which collapse to <strong>1,686 named structures</strong>: the counts shown on the layer chips are structures, not meshes, because the same thing is exported once per side, again per duplicate, and again per sub-part. Tapping a sub-part selects the whole structure it belongs to. Each chip carries two numbers &mdash; <strong>612 of those 1,686 structures are named somewhere in your own HSS2011 / ABCT2326 material</strong>, and those are the names worth learning. Which file names each one is read off the taught and assessed documents by <code>work/build-course-terms.mjs</code>, not decided here; the set textbook is deliberately excluded, because a reference that names every structure in the body is no evidence that a name is examinable. The rest are still modelled, still searchable and still tappable &mdash; the search groups them rather than listing them beside the ones you are asked to know. Five separate per-bone upper-limb GLBs are still loaded as the anchor that positions the landmark hotspots, but they are no longer drawn: the full skeleton already names those five bones. The procedural scene is only a last-resort fallback.';

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  state.flow = { on:true, uT:{value:0}, uOn:{value:1}, classes:{}, counts:{}, connective:[] };
  state.focus=null;
  state.xray=null;
  state.movement=null;
}
