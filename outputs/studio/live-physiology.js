/*
 * Live physiology
 *
 * Split out of studio.js along its banner sections. See docs/CODEMAP.md.
 */
import { $, CM_PER_UNIT, CORTEX_CM, DEFAULT_WINDOW, FLOW_ANCHORS, FLOW_CLASSES, GRAZE_CLAMP, LAYER_NAMES, MESH_INDEX, MODEL_CATALOG, REF_MAS, REF_SID_CM, SYSTEMS, UNITS, atriumEnvelope, breathEnvelope, cardiacEnvelope, classify, contractEnvelope, els, fluence, mottleSigma, mu, spikeEnvelope, state, systemCounts, systemsIn, tissueForMesh, ventricleEnvelope } from './imports.js';
import { MEMORY_TIPS, answer, clean, openDetail, pool, record, regionLabel, selectBone, showToast } from './visualisation-modes.js';
import { animate, applyVisibility, between, getRecord, tube } from './region-boxes-how.js';
import { clearSelection, loadExtraModel, restorePeel } from './depth-picking.js';
import { enforceHidden } from './hide-and-search.js';
import { showPickCallout } from './spatial-concept-overlays.js';
import { setSeparation, setTool } from './tools-and-capture.js';
import { advancePhysiology } from '../physiology.js?v=4';
import { MOTOR_ROUTES, motorRoute, motorSequence, transmissionField } from '../physiology-mechanics.js';
import { deriveShape } from '../physiology-shape.js';

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
    uMode:{value:r.mode==='pump'?5:r.mode==='descend'?4:r.mode==='inflate'?2:r.mode==='peristalsis'?3:1},
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
  const route=motorRoute(mesh.userData.layerKey,mesh.userData.label||mesh.name);
  // Unmapped structures retain illustrative activity, with staggered phases.
  // Only the named motor examples claim a nerve-to-muscle sequence.
  let activity=null;
  if((cls==='nerve'||cls==='muscle')&&!route){
    const name=(mesh.userData.label||mesh.name).replace(/left|right/gi,'');
    const hash=[...name].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0);
    activity={uT:{value:0},uDeform:{value:0},uBeat:{value:0},offset:(hash%2000)/1000};
    (state.flow.activity||(state.flow.activity=[])).push(activity);
  }
  let motor=null;
  if(route){
    state.flow.motors=state.flow.motors||{};
    motor=state.flow.motors[route.id]||(state.flow.motors[route.id]={uMotorClock:{value:0},uDeform:{value:0},uBeat:{value:0}});
    if(cls==='nerve'){
      mesh.updateWorldMatrix(true,false);
      const p=mesh.geometry.attributes.position,vertices=[];
      let top=-Infinity,seed=[0,0,0];
      const v=new state.THREE.Vector3();
      for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);vertices.push(v.x,v.y,v.z);if(v.y>top){top=v.y;seed=v.toArray();}}
      mesh.geometry.setAttribute('aTransmission',new state.THREE.BufferAttribute(transmissionField(vertices,mesh.geometry.index?.array,seed),1));
    }
  }
  if(!spec.rule) return;                    /* coloured, but nothing to animate */
  const uni=classUniforms(cls);
  const rule=spec.rule;
  /* A rule can deform only some meshes of a class -- peristalsis on the gut
     tube but not the liver, ureters but not the kidneys. Meshes that do not
     match are coloured but otherwise static. */
  const deform=!!rule && (rule.contract || rule.mode)
    && (!rule.match || rule.match.test(mesh.userData.label||mesh.name||''));
  let mCenter=null,mAxis=null,mAmt=0,mLength=1;
  if(deform){
    const g=mesh.geometry;
    if(!g.boundingBox) g.computeBoundingBox();
    const bb=g.boundingBox;
    const context={sharedCentre:mesh.userData.flowCenter?.toArray()};
    if(rule.mode==='descend')context.anatomicalUp=new state.THREE.Vector3(0,1,0)
      .transformDirection(new state.THREE.Matrix4().copy(mesh.matrixWorld).invert()).toArray();
    const shape=deriveShape({bounds:{min:bb.min.toArray(),max:bb.max.toArray()},rule,context});
    mCenter=new state.THREE.Vector3(...shape.centre);
    mAxis=new state.THREE.Vector3(...shape.axis);
    mLength=shape.length;mAmt=shape.amount;
  }
  /* The deformed and colour-only meshes of a class compile to different
     programs, so the cache key has to name the variant or the first to compile
     is silently reused for every mesh of the class. */
  mat.customProgramCacheKey=()=>'rssflow-mechanics:'+cls+(deform?':d':':c')+(route?':motor':'');
  mat.onBeforeCompile=(sh)=>{
    sh.uniforms.uT=state.flow.uT;
    sh.uniforms.uOn=state.flow.uOn;
    Object.assign(sh.uniforms,uni);
    if(activity){sh.uniforms.uT=activity.uT;sh.uniforms.uDeform=activity.uDeform;sh.uniforms.uBeat=activity.uBeat;}
    if(motor){sh.uniforms.uMotorClock=motor.uMotorClock;if(deform){sh.uniforms.uDeform=motor.uDeform;sh.uniforms.uBeat=motor.uBeat;}}
    if(cls==='nerve'&&route){
      const branch=/muscular branches/i.test((mesh.userData.label||mesh.name).replace(/_/g,' '));
      sh.uniforms.uArrivalStart={value:branch?.40:.10};
      sh.uniforms.uArrivalSpan={value:branch?.15:route.id==='deltoid'?.30:.45};
    }
    if(deform){
      sh.uniforms.uMCenter={value:mCenter};
      sh.uniforms.uMAxis={value:mAxis};
      sh.uniforms.uMAmt={value:mAmt};
      sh.uniforms.uMLength={value:mLength};
    }
    sh.vertexShader=(cls==='nerve'&&route?'attribute float aTransmission;varying float vTransmission;\n':'')+'varying float vFlowY;\n'
      +(deform?'uniform float uDeform;uniform vec3 uMCenter;uniform vec3 uMAxis;uniform float uMAmt;uniform float uMLength;uniform float uMode;\nuniform float uT;uniform float uSpeed;uniform float uDir;uniform float uFreq;uniform float uSharp;\n':'')
      +sh.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\n'
        +(deform
          ?'float rssAlong=dot(transformed-uMCenter,uMAxis);\n'
           +'vec3 rssPerp=(transformed-uMCenter)-rssAlong*uMAxis;\n'
           +'if(uMode>4.5){/* chamber contraction reduces enclosed volume */\n'
           +'  transformed-=uDeform*uMAmt*(rssPerp+.55*rssAlong*uMAxis);\n'
           +'}else if(uMode>3.5){/* diaphragm: central dome descends; peripheral rim is tethered */\n'
           +'  float dome=smoothstep(-.2,.45,rssAlong/uMLength);transformed-=uMAxis*uMAmt*uDeform*dome;\n'
           +'}else if(uMode>2.5){/* peristalsis: a ring of constriction travelling along the tube */\n'
           +'  float rssW=(rssAlong/uMLength)*2.-uT*uSpeed*uDir;\n'
           +'  float rssRip=pow(max(0.,.5+.5*sin(rssW*6.2831853)),uSharp);\n'
           +'  transformed-=rssPerp*rssRip*uMAmt*uDeform;\n'
           +'}else if(uMode>1.5){/* inflate: even expansion away from the centre */\n'
           +'  transformed+=(transformed-uMCenter)*uDeform*uMAmt;\n'
           +'}else{/* contract: shorten along the axis, thicken across it */\n'
           +(cls==='muscle'?'  float tether=pow(max(0.,1.-pow(2.*rssAlong/uMLength,2.)),2.);\n':'  float tether=1.;\n')
           +'  transformed-=uMAxis*rssAlong*uDeform*uMAmt*tether;\n'
           +'  transformed+=rssPerp*(inversesqrt(max(.1,1.-uDeform*uMAmt*tether))-1.);\n'
           +'}\n'
          :'')
        +(cls==='nerve'&&route?'vTransmission=aTransmission;\n':'')
        +'vFlowY=(modelMatrix*vec4(transformed,1.0)).y;');
    if(deform)sh.vertexShader=sh.vertexShader.replace('#include <beginnormal_vertex>',
      '#include <beginnormal_vertex>\n'
      +'if(uMode>4.5){vec3 na=uMAxis*dot(objectNormal,uMAxis);objectNormal=normalize(na/max(.1,1.-.55*uDeform*uMAmt)+(objectNormal-na)/max(.1,1.-uDeform*uMAmt));}\n'
      +'if(uMode<1.5){float k=max(.1,1.-uDeform*uMAmt);vec3 na=uMAxis*dot(objectNormal,uMAxis);objectNormal=normalize(na/k+(objectNormal-na)*sqrt(k));}\n'
      +'else if(uMode>2.5&&uMode<3.5){float along=dot(position-uMCenter,uMAxis);vec3 radial=position-uMCenter-along*uMAxis;float phase=(along/uMLength*2.-uT*uSpeed*uDir)*6.2831853;float wave=max(0.,.5+.5*sin(phase));float k=max(.1,1.-pow(wave,uSharp)*uMAmt*uDeform);float dk=-uMAmt*uDeform*uSharp*pow(wave,max(0.,uSharp-1.))*.5*cos(phase)*12.5663706/uMLength;float na=dot(objectNormal,uMAxis);vec3 nr=objectNormal-na*uMAxis;objectNormal=normalize(nr/k+uMAxis*(na-dk*dot(radial,nr)/k));}\n');
    sh.fragmentShader=(cls==='nerve'&&route?'varying float vTransmission;uniform float uMotorClock;uniform float uArrivalStart;uniform float uArrivalSpan;\n':'')+'varying float vFlowY;\n'
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
        +(cls==='nerve'&&route?'float arrival=uArrivalStart+vTransmission*uArrivalSpan;float age=uMotorClock-arrival;rssBand=smoothstep(0.,.025,age)*(1.-smoothstep(.05,.10,age));rssSide=1.;\n':'')
        +'float rssGlow=rssBand*rssSide*uGain*uBeat*uOn;totalEmissiveRadiance+=uFlowColor*(rssGlow/(1.+rssGlow*.65));');
  };
  mat.needsUpdate=true;
}

/* Classify and colour a whole layer as it lands. */
export function installLayerFlow(key,meshes){
  const counts={};
  meshes.forEach(m=>m.updateWorldMatrix(true,false));
  // A lung's lobes breathe around one shared centre, keeping their seams joined.
  if(key==='organs'&&state.THREE){
    state.scene?.updateMatrixWorld(true);
    for(const side of ['left','right']){
      const lobes=meshes.filter(m=>new RegExp('lobe.*'+side+'.*lung','i').test(m.userData.label||m.name));
      const box=new state.THREE.Box3();lobes.forEach(m=>box.expandByObject(m));
      if(!box.isEmpty()){
        const centre=box.getCenter(new state.THREE.Vector3());
        lobes.forEach(m=>{m.userData.flowCenter=m.worldToLocal(centre.clone());});
      }
    }
  }
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
  if(state.focus?.keep){
    Object.values(state.extraModels).forEach(layer=>layer.meshes.forEach(m=>{if(!state.focus.keep.has(m))m.visible=false;}));
  }
}
export function setPhysiology(on){
  state.flow.on=!!on;
  // Spread needs an undeformed model immediately for its layout measurements.
  if(!on&&state.separation){
    state.flow.blend=0;
    state.flow.uOn.value=0;
    Object.values(state.flow.classes).forEach(u=>{if(u.uDeform)u.uDeform.value=0;});
    Object.values(state.flow.motors||{}).forEach(u=>{u.uDeform.value=0;});
    (state.flow.activity||[]).forEach(u=>{u.uDeform.value=0;});
  }
  applyConnectiveVisibility();
  return state.flow.on;
}

/* The live/static transition eases to the rest shape without a material swap. */
export function stepPhysiology(t){
  Object.assign(state.flow,advancePhysiology(state.flow,t,state.flow.on));
  const blend=state.flow.blend;
  state.flow.uOn.value=blend;
  t=state.flow.elapsed;
  state.flow.uT.value=t;
  for(const u of state.flow.activity||[]){
    const local=t+u.offset;
    u.uT.value=local;u.uDeform.value=contractEnvelope(local)*blend;
    u.uBeat.value=.1+.9*spikeEnvelope(local);
  }
  for(const route of MOTOR_ROUTES){
    const u=state.flow.motors?.[route.id];if(!u)continue;
    const seq=motorSequence(t,route.offset);
    u.uMotorClock.value=seq.clock;u.uDeform.value=seq.tension*blend;
    u.uBeat.value=seq.activation;
  }
  const beat=cardiacEnvelope(t),spike=spikeEnvelope(t),breath=breathEnvelope(t),squeeze=contractEnvelope(t),atrial=atriumEnvelope(t),ventricular=ventricleEnvelope(t);
  Object.entries(state.flow.classes).forEach(([cls,u])=>{
    const r=(FLOW_CLASSES[cls]||{}).rule; if(!r) return;
    u.uBeat.value=r.deform==='atrial'?.2+.8*atrial
      :r.deform==='ventricular'?.2+.8*ventricular
      :r.beat==='cardiac'?.25+.75*beat
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
    u.uDeform.value*=blend;
  });
}
/*
 * A GLB layer is on when ANY of the systems it draws is on, and a mesh is on
 * when one of its own systems is. Two of the seven files carry several chips
 * each -- see outputs/systems.js -- so every place that used to read
 * state.layers[glbKey] has to ask one of these instead. A mesh no rule placed
 * follows its layer, so an unclassified structure is never invisible.
 */
export function layerOn(layerKey){return systemsIn(layerKey).some(s=>!!state.layers[s.key])}
/* The chips of one layer, as keys. The skeleton is two of them now (Axial and
   Appendicular), so everything that used to write state.layers.skeleton has to
   write both -- and say so through this rather than by naming them. */
export const chipsOf=(layerKey)=>systemsIn(layerKey).map(s=>s.key);
export function setLayerChips(layerKey,on){chipsOf(layerKey).forEach(k=>{state.layers[k]=!!on})}
export function meshOn(mesh){
  const sys=mesh&&mesh.userData&&mesh.userData.systems;
  if(!sys||!sys.length)return layerOn(mesh&&mesh.userData&&mesh.userData.layerKey);
  return sys.some(k=>!!state.layers[k]);
}
/* Named structures per SYSTEM, from the index -- the same collapsing the chips
   and the search use, so all three agree. Meshes are geometry; this is anatomy. */
const SYS_COUNT=systemCounts(MESH_INDEX,UNITS);
const SYS_LABEL=SYSTEMS.reduce((a,s)=>{a[s.key]=s.label;return a},{});
const LAYER_NAMED=Object.fromEntries(Object.entries(SYS_COUNT).map(([k,v])=>[k,v.total]));
/* and, of those, how many the course material actually names */
const LAYER_COURSE=Object.fromEntries(Object.entries(SYS_COUNT).map(([k,v])=>[k,v.course]));
/* and how many separate things a tap can select: every course-named structure
   plus one per group of the rest. The three numbers only agree because they
   all come out of the same index -- see UNITS in mesh-index.js. */
const LAYER_UNITS=Object.fromEntries(Object.entries(SYS_COUNT).map(([k,v])=>[k,v.units]));
export function updateStageMeta(){
  const on=Object.keys(state.layers).filter(k=>state.layers[k]);
  if(!on.length){els.stageMeta.textContent='No layer shown — turn one on to study it';return}
  const named=on.reduce((t,k)=>t+(LAYER_NAMED[k]||0),0);
  const course=on.reduce((t,k)=>t+(LAYER_COURSE[k]||0),0);
  const units=on.reduce((t,k)=>t+(LAYER_UNITS[k]||0),0);
  /* The second number is the one that answers "which of these do I have to
     remember?" -- see the Sources & model dialog. */
  /* Both halves of the skeleton and nothing else: still "the skeleton", and
     still worth naming the source of, which no combination of chips is. */
  const wholeSkeleton=on.length===chipsOf('skeleton').length&&chipsOf('skeleton').every(k=>on.includes(k));
  const base=wholeSkeleton
    ?`Precise Z-Anatomy / BodyParts3D skeleton · ${named} structures, ${course} named by your course, ${units} you can select`
    :`${on.map(k=>SYS_LABEL[k]||LAYER_NAMES[k]||k).join(' + ')} · ${named} structures, ${course} named by your course, ${units} you can select · tap one`;
  /* Say what the region filter did, or it looks like nothing happened. */
  if(state.region&&state.region!=='all'){
    const bones=state.fullMeshes.filter(m=>m.visible).length;
    const soft=Object.entries(state.extraModels||{})
      .filter(([k])=>layerOn(k)).reduce((t,[,m])=>t+m.meshes.filter(o=>o.visible).length,0);
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
  if(state.xray)return;
  Object.entries(state.extraModels).forEach(([k,m])=>{
    m.root.visible=layerOn(k);
    /* Opacity is per CHIP, not per file: the arteries can be solid while the
       veins behind them are ghosted, and they share one GLB. A mesh takes the
       opacity of whichever of its systems is on, so the split layers fade
       independently and the unsplit ones behave exactly as they did. */
    m.meshes.forEach(o=>{
      if(!o.material)return;
      const sys=(o.userData.systems&&o.userData.systems.length?o.userData.systems:systemsIn(k).map(s=>s.key))
        .filter(key=>state.layers[key]);
      const op=sys.reduce((v,key)=>{const x=state.layerOpacity?.[key];return x===undefined?v:(v===undefined?x:Math.max(v,x))},undefined);
      if(op===undefined)return;
      const t=op<.99;
      if(o.material.transparent!==t)o.material.needsUpdate=true;
      o.material.transparent=t;o.material.opacity=op;o.material.depthWrite=!t;
    });
  });
  /* The skeleton ghosts too -- seeing vessels against translucent bone is the
     whole reason to put two layers on at once. */
  const so=chipsOf('skeleton').reduce((v,k)=>{const x=state.layerOpacity?.[k];return x===undefined?v:(v===undefined?x:Math.max(v,x))},undefined);
  if(so!==undefined)[...state.fullMeshes,...state.meshes].forEach(o=>{
    if(!o.material)return;
    const t=so<.99;
    /* three.js compiles transparency into the shader program, so flipping the
       flag without needsUpdate leaves the mesh stubbornly opaque. */
    if(o.material.transparent!==t)o.material.needsUpdate=true;
    o.material.transparent=t;o.material.opacity=so;o.material.depthWrite=!t;
  });
  state.activeExtra=Object.keys(state.extraModels).filter(k=>layerOn(k)).pop()||null;
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
/*
 * The lesson borrows the canvas. It must not borrow the viewer's settings.
 *
 * There is one WebGL context and one scene, moved into the lesson card rather
 * than duplicated, so everything the viewer page was left in is still in force
 * when a lesson mounts. focusStructures already handles the LAYERS -- it turns
 * every chip off and its own back on. Five other pieces of viewer state were
 * not handled, and each of them can silently break the thing being taught:
 *
 *   the cut       renderer.clippingPlanes is global. A coronal cut left armed
 *                 in the viewer sliced the lesson's carpal bones in half.
 *   hidden meshes focusStructures ended by calling enforceHidden(), so a bone
 *                 hidden by hand in the viewer stayed hidden in the lesson
 *                 teaching that bone -- the worst case in the list, because
 *                 the card renders successfully and shows nothing.
 *   the region    a lesson with isolate:false is subject to it, so a femur
 *                 taught while the filter said Thorax did not appear.
 *   isolation     same expression, same result.
 *   an armed tool a tap on the stage places ink or a pin instead of naming
 *                 the structure, on a card whose caption says "tap to name".
 *
 * They are suspended, not discarded: the viewer is a workspace and the state
 * a reader set up in it is theirs. Everything goes back when the lesson lets
 * the canvas go. state.cut itself is untouched -- only the planes handed to
 * the renderer -- which is the same shape the projection view already uses.
 */
export function suspendViewerState(){
  if(state.studySuspended)return;
  state.studySuspended={
    region:state.region,isolated:state.isolated,tool:state.tool,
    hidden:state.hidden,autoHidden:state.autoHidden,
    clip:state.renderer?state.renderer.clippingPlanes:null,
  };
  state.region='all';state.isolated=false;state.tool=null;
  state.hidden=new Set();state.autoHidden=new Set();
  if(state.renderer)state.renderer.clippingPlanes=[];
}
export function resumeViewerState(){
  const was=state.studySuspended;
  if(!was)return false;
  state.studySuspended=null;
  state.region=was.region;state.isolated=was.isolated;state.tool=was.tool;
  state.hidden=was.hidden;state.autoHidden=was.autoHidden;
  if(state.renderer&&was.clip)state.renderer.clippingPlanes=was.clip;
  return true;
}
/* Just the meshes. focusStructures calls THIS on its way in -- it is replacing
   one focus with another and must not hand the viewer's state back mid-way. */
function releaseFocusMeshes(){
  if(!state.focus)return false;
  (state.focus.keys||[state.focus.key]).flatMap(layerPool).forEach(o=>{o.visible=true;if(o.material)o.material.emissive?.setHex(0x000000)});
  state.focus=null;
  return true;
}
export function clearStudyFocus(){
  const had=releaseFocusMeshes();
  /* Even when there was no focus to clear: a lesson whose names did not
     resolve suspended the viewer's state on the way in and still owes it. */
  const resumed=resumeViewerState();
  if(had||resumed)applyLayers();
}
/* A focused mechanism keeps the actual participating structures in view. */
export function focusPhysiologyExample(kind){
  if(!['breathing','motor'].includes(kind)||!state.THREE)return false;
  if(state.separation)setSeparation(0);
  clearStudyFocus();clearSelection();suspendViewerState();
  const keys=kind==='breathing'?['organs','muscle']:['nervous','muscle'];
  const hits=keys.flatMap(key=>layerPool(key).filter(m=>kind==='breathing'
    ?m.userData.flowClass==='diaphragm'||(key==='organs'&&/lobe.*lung/i.test(m.userData.label||m.name))
    :!!motorRoute(key,m.userData.label||m.name)));
  if(!hits.length){resumeViewerState();return false;}
  state.focus={key:keys[0],keys,keep:new Set(hits),count:hits.length};
  setPhysiology(true);applyLayers();
  const box=new state.THREE.Box3();hits.forEach(m=>box.expandByObject(m));
  const centre=box.getCenter(new state.THREE.Vector3()),size=box.getSize(new state.THREE.Vector3());
  const dir=state.camera.position.clone().sub(state.controls.target).normalize();
  state.controls.target.copy(centre);
  state.camera.position.copy(centre).addScaledVector(dir,Math.max(size.x,size.y,size.z,.4)*2.6);
  state.controls.update();
  els.stageMeta.textContent=kind==='breathing'?'Breathing · diaphragm and lungs':'Motor transmission · deltoid, biceps and quadriceps · slowed';
  return true;
}
export async function focusStructures(spec){
  if(state.separation)setSeparation(0);
  if(!state.scene)return {ok:false,reason:'not-booted',found:0};
  suspendViewerState();
  const key=spec.layer||'skeleton';
  if(key!=='skeleton'){
    if(!state.extraModels[key]){
      if(!spec.file)return {ok:false,reason:'no-file',found:0};
      await loadExtraModel(key,spec.file);
    }
  }
  releaseFocusMeshes();
  const hits=resolveMeshNames(key,spec.meshes);
  /* An unresolvable name must not silently show the whole body as if it were
     the answer -- the caller shows a still diagram instead. */
  if(!hits.length)return {ok:false,reason:'no-match',found:0};
  Object.keys(state.layers).forEach(k=>{state.layers[k]=false});
  /* focusStructures is called with a GLB LAYER key, so it turns on every chip
     that file draws -- a lesson that focuses the organ layer must not have to
     know which of the four organ systems its structures happen to fall in. */
  const focusChips=systemsIn(key).map(s=>s.key);
  focusChips.forEach(k=>{state.layers[k]=true});
  state.layerOpacity={...(state.layerOpacity||{})};
  focusChips.forEach(k=>{state.layerOpacity[k]=1});
  if(spec.ghostBody&&key!=='skeleton'){setLayerChips('skeleton',true);chipsOf('skeleton').forEach(k=>{state.layerOpacity[k]=.16})}
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
 * Projection integrates signed entry/exit distances through the source meshes.
 * Measure relative to each mesh centre: on a closed surface this cancels
 * exactly; on an open source mesh it avoids charging the entire source distance
 * for a missing face. Open surfaces remain an approximation, not CT volumes.
 * The heart lives in the circulatory GLB; only its Heart system enters the beam.
 */
export const XRAY_LAYERS = ['skeleton','muscle','organs','circulatory'];
export const XRAY_LAYER_FILES = { muscle: MODEL_CATALOG.muscleFile, organs: MODEL_CATALOG.organSystemFile, circulatory: MODEL_CATALOG.circulatoryFile };

const XRAY_VERT=`
uniform vec3 uCenter;
varying vec3 vPosition;
varying float vCenterDepth;
varying float vCos;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vPosition = mv.xyz;
  vCenterDepth = -(modelViewMatrix * vec4(uCenter,1.0)).z;
  /* Incidence angle of the ray on this surface, for the cortical slab. */
  vec3 n = normalize(normalMatrix * normal);
  vCos = abs(dot(n, normalize(-mv.xyz)));
  gl_Position = projectionMatrix * mv;
}`;
const XRAY_FRAG=`
uniform float uMu, uCmPerUnit, uShell, uGraze;
varying vec3 vPosition;
varying float vCenterDepth;
varying float vCos;
void main(){
  /* Back faces are where the ray leaves material, front faces where it enters. */
  float sgn = gl_FrontFacing ? -1.0 : 1.0;
  // Perspective interpolation gives the surface point. Correct the axial
  // depth to distance along this ray; subtract the same plane at both crossings.
  float rayCos = max(0.01, -normalize(vPosition).z);
  float bulk = sgn * (-vPosition.z - vCenterDepth) / rayCos * uCmPerUnit * uMu;
  /* One cortical slab per crossing, at the true incidence angle. Added on
     BOTH faces (not signed) because entering and leaving each cross one.
     uShell is zero for the soft-tissue layers. See radiography.js boneTau(). */
  float shell = uShell / max(uGraze, vCos);
  gl_FragColor = vec4(bulk + shell, 0.0, 0.0, 1.0);
}`;
const XRAY_POST_FRAG=`
uniform sampler2D tTau;
uniform float uWinLo, uWinHi, uSigma, uSeed, uFlipX;
uniform vec2 uPan;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  /* Shells that are not quite closed can integrate slightly negative. */
  vec2 displayed = vUv - uPan;
  if(any(lessThan(displayed,vec2(0.0)))||any(greaterThan(displayed,vec2(1.0)))){gl_FragColor=vec4(0.0,0.0,0.0,1.0);return;}
  vec2 uv = vec2(uFlipX > 0.5 ? 1.0 - displayed.x : displayed.x, displayed.y);
  float tau = max(0.0, texture2D(tTau, uv).r);
  /* tau is -ln(transmission), so a linear window here is a LOG window on
     intensity -- which is what a detector applies, and what the previous
     1-exp(-tau) did not. MIRRORS radiography.js filmDensity(): change one,
     change both, because the node check only tests that copy. */
  float density = clamp((tau - uWinLo) / (uWinHi - uWinLo), 0.0, 1.0);
  /* Quantum mottle: sigma comes from mAs and SID via radiography.js. */
  float n = hash(uv * 1024.0 + uSeed) - 0.5;
  density += n * uSigma * (0.35 + 0.65 * density);
  gl_FragColor = vec4(vec3(clamp(density, 0.0, 1.0)), 1.0);
}`;

export function xrayDepthMaterial(THREE,muCm,cmPerUnit,shell){
  return new THREE.ShaderMaterial({
    uniforms:{uCenter:{value:new THREE.Vector3()},uMu:{value:muCm}, uCmPerUnit:{value:cmPerUnit},
      uShell:{value:shell||0}, uGraze:{value:GRAZE_CLAMP}},
    vertexShader:XRAY_VERT, fragmentShader:XRAY_FRAG,
    side:THREE.DoubleSide, depthTest:false, depthWrite:false, forceSinglePass:true, toneMapped:false,
    blending:THREE.CustomBlending, blendEquation:THREE.AddEquation,
    blendSrc:THREE.OneFactor, blendDst:THREE.OneFactor,
  });
}

/*
 * The material for one layer, at the CURRENT kVp.
 *
 * Module-level rather than a closure inside enterXray because setXrayKvp has
 * to rebuild every one of these: mu depends on kVp, so a cache built at 75
 * is wrong at 110. Mutating uMu on the materials you happen to hold and
 * leaving the rest is the bug this shape prevents -- it produces a film where
 * some tissues moved with the slider and some did not, which looks like a
 * rendering quirk rather than like a mistake.
 */
/* Cached per TISSUE, not per layer: two meshes in one GLB can be different
   tissues -- a lung and a liver share the organ file -- so a layer-keyed
   cache would hand the second one the first one's coefficient. */
function sharedFor(tissue){
  const x=state.xray; if(!x)return null;
  if(!x.shared.has(tissue)){
    const THREE=state.THREE;
    const isBone=tissue==='bone';
    const bulk=isBone?mu('marrow',x.kvp):mu(tissue,x.kvp);
    const shell=isBone?(mu('bone',x.kvp)-mu('marrow',x.kvp))*CORTEX_CM:0;
    x.shared.set(tissue,xrayDepthMaterial(THREE,bulk,CM_PER_UNIT,shell));
  }
  return x.shared.get(tissue);
}

export function enterXray(){
  /* A peel in progress would be captured as the 'original' opacity by the
     material swap below and come back at 6% when the projection exits. */
  if(typeof restorePeel==='function')restorePeel();
  /* A radiograph sums attenuation along one axis through the body. Taken over
     a separated body it still produces a confident-looking image -- of a
     patient whose lungs are a body-depth in front of their chest wall. */
  if(state.separation)setSeparation(0);
  if(state.xray||!state.scene)return false;
  if(state.movement)endMovement();
  if(!state.renderer.extensions.has('EXT_color_buffer_float') && !state.renderer.extensions.has('EXT_color_buffer_half_float')) {
    throw new Error('This device cannot render the floating-point projection. The 3D viewer is still available.');
  }
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
    type:state.renderer.extensions.has('EXT_float_blend')?THREE.FloatType:THREE.HalfFloatType,
    format:THREE.RGBAFormat,
    minFilter:THREE.NearestFilter, magFilter:THREE.NearestFilter, depthBuffer:false,
  });
  const post=new THREE.Scene();
  const postCam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const postMat=new THREE.ShaderMaterial({
    uniforms:{tTau:{value:rt.texture},uWinLo:{value:DEFAULT_WINDOW.lo},
      uWinHi:{value:DEFAULT_WINDOW.hi},
      uSigma:{value:mottleSigma({mAs:REF_MAS,sidCm:REF_SID_CM})},
      uSeed:{value:0},uFlipX:{value:0},uPan:{value:new THREE.Vector2()}},
    vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }',
    fragmentShader:XRAY_POST_FRAG, depthTest:false, depthWrite:false,
  });
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),postMat));

  state.xray={
    mats:new Map(), shared:new Map(), rt, post, postCam, postMat,
    bg:state.scene.background, fog:state.scene.fog,
    fov:c.fov, near:c.near, far:c.far, zoom:c.zoom,
    controls:{enabled:ctr.enabled,enableRotate:ctr.enableRotate,enableZoom:ctr.enableZoom,enablePan:ctr.enablePan,enableDamping:ctr.enableDamping,mouseButtons:{...ctr.mouseButtons},touches:{...ctr.touches}},
    tool:state.tool, visibility:new Map(), hooks:new Map(), rotations:new Map(),
    clearColor:state.renderer.getClearColor(new THREE.Color()), clearAlpha:state.renderer.getClearAlpha(),
    minD:ctr.minDistance, maxD:ctr.maxDistance,
    pos:c.position.clone(), target:ctr.target.clone(),
    layers:{...state.layers}, layerOpacity:{...(state.layerOpacity||{})},
    motion:state.motionEnabled, autoClear:state.renderer.autoClear,
    concepts:state.conceptGroup?state.conceptGroup.visible:true,
    clip:state.renderer.clippingPlanes,
    tools:state.toolGroup?state.toolGroup.visible:true,
    kvp:75, mAs:10, aec:true, sidCm:REF_SID_CM, effMas:REF_MAS,
    win:{...DEFAULT_WINDOW},
    view:'pa', region:'chest',
  };
  /* Projection has a fixed tissue set, independent of the 3D layer switches,
   * opacity, isolation and hidden meshes. The source GLBs still overlap in
   * places: selecting fewer systems does not make them disjoint CT volumes.
   * The UI awaits ensureXrayLayers before this synchronous material swap. */
  XRAY_LAYERS.forEach((k)=>setLayerChips(k,true));
  state.layers.arterial=false;state.layers.venous=false;state.layers.heart=true;
  setTool('off');
  // Drain orbit damping before choosing a fixed beam direction.
  ctr.enableDamping=false;ctr.update();
  ctr.enabled=true;ctr.enableRotate=false;ctr.enableZoom=false;ctr.enablePan=false;
  ctr.mouseButtons={LEFT:THREE.MOUSE.PAN,MIDDLE:THREE.MOUSE.PAN,RIGHT:THREE.MOUSE.PAN};
  ctr.touches={ONE:THREE.TOUCH.PAN,TWO:THREE.TOUCH.DOLLY_PAN};
  c.zoom=1;
  state.scene.traverse(o=>state.xray.visibility.set(o,o.visible));
  state.fullModel.visible=true;
  state.fullPickables.forEach(o=>o.visible=false);
  state.hotspots.forEach(o=>o.visible=false);
  SYSTEMS.forEach((s)=>{if(!XRAY_LAYERS.includes(s.layer))state.layers[s.key]=false});
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
  /* xrayTissue is what every other reader wants -- the shared cache is keyed
     by it, and re-deriving a tissue from the layer is the bug this whole
     change removes. xrayKey stays: it still says which GLB the mesh is from. */
  const apply=(mesh,key)=>{
    const x=state.xray;
    const tissue=key==='circulatory'?'soft':tissueForMesh(mesh.name,key);
    x.mats.set(mesh,mesh.material);x.hooks.set(mesh,mesh.onBeforeRender);
    mesh.material=sharedFor(tissue);mesh.userData.xrayKey=key;mesh.userData.xrayTissue=tissue;
    mesh.visible=XRAY_LAYERS.includes(key)&&(key!=='circulatory'||mesh.userData.systems?.includes('heart'))
      &&!(key==='muscle'&&['tendon','bursa'].includes(mesh.userData.flowClass));
    if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
    const center=mesh.geometry.boundingBox.getCenter(new THREE.Vector3());
    mesh.onBeforeRender=(_r,_s,_c,_g,mat)=>{
      mat.uniforms.uCenter.value.copy(center);
      mat.uniformsNeedUpdate=true;
    };
  };
  state.fullMeshes.forEach(m=>apply(m,'skeleton'));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>l.meshes.forEach(m=>apply(m,k)));
  Object.entries(state.extraModels||{}).forEach(([k,l])=>{l.root.visible=layerOn(k)});
  if(state.realModel)state.realModel.visible=false;
  state.scene.background=null;
  state.scene.fog=null;
  /* A yaw would smear a projection that is meant to be read square on. */
  state.motionEnabled=false;
  [state.fullModel,state.realModel,...Object.values(state.extraModels||{}).map(m=>m.pivot)]
    .forEach(r=>{if(r){state.xray.rotations.set(r,r.rotation.clone());r.rotation.y=0}});
  state.scene.updateMatrixWorld(true);
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
  hand:  {label:'Left hand',  c:[2.10,0.47,0], half:0.78, sid:1.00},
  body:  {label:'Whole body', c:[0,1.00,0], half:6.10, sid:4.00},
};
export function setXrayRegion(key){
  if(!state.xray)return;
  if(!XRAY_REGIONS[key])return;
  state.xray.region=key;
  // Without this field selection a lateral hand ray also crosses the pelvis
  // and opposite hand in the atlas's anatomical position.
  state.xray.mats.forEach((_material,m)=>{
    const eligible=XRAY_LAYERS.includes(m.userData.xrayKey)
      &&(m.userData.xrayKey!=='circulatory'||m.userData.systems?.includes('heart'))
      &&!(m.userData.xrayKey==='muscle'&&['tendon','bursa'].includes(m.userData.flowClass));
    m.visible=eligible;
    if(eligible&&key==='hand'){
      const b=new state.THREE.Box3().setFromObject(m),R=XRAY_REGIONS.hand;
      m.visible=b.max.x>=R.c[0]-R.half&&b.min.x<=R.c[0]+R.half
        &&b.max.y>=R.c[1]-R.half&&b.min.y<=R.c[1]+R.half;
    }
  });
  state.xray.postMat.uniforms.uPan.value.set(0,0);
  applyXrayCamera();
}
export function setXrayView(view){
  if(!state.xray)return;
  if(!['pa','ap','lat'].includes(view))return;
  state.xray.view=view;
  state.xray.postMat.uniforms.uPan.value.set(0,0);
  applyXrayCamera();
}
function applyXrayCamera(){
  const x=state.xray; if(!x)return;
  const THREE=state.THREE, c=state.camera, ctr=state.controls;
  const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
  const sid=R.sid*XRAY_UNITS_PER_M;
  const dir=x.view==='lat'?new THREE.Vector3(1,0,0):new THREE.Vector3(0,0,x.view==='ap'?1:-1);
  const center=new THREE.Vector3(...R.c);
  state.scene.updateMatrixWorld(true);
  // Detector lies just beyond the regional anatomy, not at its centre.
  let detectorDepth=0;
  x.mats.forEach((_mat,m)=>{
    if(!m.visible)return;
    const box=new THREE.Box3().setFromObject(m);
    if(box.max.y<center.y-R.half||box.min.y>center.y+R.half)return;
    if(x.region==='hand'&&(box.max.x<center.x-R.half||box.min.x>center.x+R.half))return;
    const depth=x.view==='lat'?center.x-box.min.x:x.view==='ap'?center.z-box.min.z:box.max.z-center.z;
    detectorDepth=Math.max(detectorDepth,depth);
  });
  const dist=Math.max(sid*.5,sid-detectorDepth-.05);
  // Fit the region on the shorter screen dimension as well as in height.
  resizeXray();
  ctr.target.copy(center);
  c.position.copy(center).add(dir.multiplyScalar(dist));
  x.sidCm=R.sid*100;
  c.updateProjectionMatrix();
  xrayClip();
  applyBeam();
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
export function resizeXray(){
  const x=state.xray;if(!x)return;
  const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
  state.camera.fov=2*Math.atan(R.half/Math.min(1,state.camera.aspect)/(R.sid*XRAY_UNITS_PER_M))*180/Math.PI;
  state.camera.updateProjectionMatrix();
}
/*
 * Keep every closed surface inside the clip span. A clipped entry or exit
 * would invalidate the signed path integral. Image zoom leaves this span alone.
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
/* Changing kVp changes every coefficient, so the shared materials are rebuilt. */
export function setXrayKvp(kvp){
  const x=state.xray; if(!x)return;
  x.kvp=Math.max(50,Math.min(125,Number(kvp)||75));
  x.shared.forEach((m)=>m.dispose());
  x.shared.clear();
  x.mats.forEach((_orig,mesh)=>{
    mesh.material=sharedFor(mesh.userData.xrayTissue);
  });
  applyBeam();
}
export function setXrayMas(mAs){ const x=state.xray; if(!x)return; x.mAs=Math.max(1,Math.min(80,Number(mAs)||10)); applyBeam(); }
export function setXrayAec(on){ const x=state.xray; if(!x)return; x.aec=!!on; applyBeam(); }

export function setXrayWindow(width,level){
  const x=state.xray;if(!x)return;
  const w=Math.max(2,Math.min(40,Number(width)||19));
  const l=Math.max(0,Math.min(25,Number(level)||0));
  x.win={lo:l-w/2,hi:l+w/2};applyBeam();
}
export function setXrayZoom(value){
  if(!state.xray)return;
  state.camera.zoom=Math.max(.5,Math.min(3,Number(value)||1));
  state.camera.updateProjectionMatrix();
}

/*
 * mAs and SID set the fluence; the window and the mottle both follow from it.
 * With AEC on the fluence is held at its reference value, so the film stays
 * readable while the camera moves -- and the readout still shows what mAs the
 * compensation is spending, because a control that silently corrects is a
 * control that teaches nothing.
 *
 * The window follows the fluence in LOG units. The detector's raw signal is
 * fluence * exp(-tau), and the film shown is a window on -ln(signal), so the
 * window slides by ln(fluence) -- it does not scale, and the difference is the
 * difference between exposure physics and a brightness knob. Overexpose and
 * every path reads lower: the film goes dark, which is all "density is
 * proportional to mAs" ever meant on a film. AEC pins fluence at 1, the slide
 * is zero, and the film holds.
 */
function applyBeam(){
  const x=state.xray; if(!x)return;
  const sidCm=x.sidCm||REF_SID_CM;
  const effMas=x.aec?REF_MAS*(sidCm/REF_SID_CM)**2:x.mAs;
  x.effMas=effMas;
  const shift=Math.log(fluence({mAs:effMas,sidCm}));
  x.postMat.uniforms.uSigma.value=mottleSigma({mAs:effMas,sidCm});
  x.postMat.uniforms.uWinLo.value=x.win.lo+shift;
  x.postMat.uniforms.uWinHi.value=x.win.hi+shift;
}
export function renderXray(){
  const x=state.xray; if(!x)return false;
  const r=state.renderer;
  xrayClip();
  const sid=Math.round(x.sidCm);
  /*
   * Orbit away from the nominal axis and this stops being the projection its
   * button claims. Saying "AP" over an oblique is exactly the kind of quiet
   * wrongness this view is supposed to avoid, so the label degrades to oblique
   * with the angle off axis.
   */
  const off=Math.round(xrayOffAxis());
  /*
   * kVp and mAs move the beam line without the camera moving, so the beam
   * string is part of the cache key -- without it the readout would sit at
   * the last-used kVp until the next dolly refreshed it.
   */
  const aec=x.aec?` · AEC ${Math.round(x.effMas)} mAs`:'';
  const beam=`${x.kvp} kVp · ${x.mAs} mAs${aec}`;
  if(sid!==x.shownSid||off!==x.shownOff||beam!==x.shownBeam){
    x.shownSid=sid; x.shownOff=off; x.shownBeam=beam;
    const R=XRAY_REGIONS[x.region]||XRAY_REGIONS.body;
    const names={pa:'PA',ap:'AP',lat:'Lateral'};
    const proj=off>4?`oblique · ${off}° off ${names[x.view]||x.view}`:(names[x.view]||x.view);
    els.stageMeta.textContent=`${R.label} · ${proj} · SID ${sid} cm · ${beam} · simulated · tap to name`;
    const status=$('xrayStatus');if(status)status.textContent=els.stageMeta.textContent;
  }
  // A projection is one exposure; grain must not flicker every animation frame.
  x.postMat.uniforms.uSeed.value=17;
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
  x.mats.forEach((orig,mesh)=>{if(mesh.userData.xrayHot){mesh.material.dispose();delete mesh.userData.xrayHot}mesh.material=orig;mesh.onBeforeRender=x.hooks.get(mesh);delete mesh.userData.xrayKey;delete mesh.userData.xrayTissue});
  x.shared.forEach(m=>m.dispose());
  x.post.children.forEach(o=>o.geometry?.dispose());
  x.postMat.dispose(); x.rt.dispose();
  state.scene.background=x.bg; state.scene.fog=x.fog;
  c.zoom=x.zoom;c.fov=x.fov;c.near=x.near;c.far=x.far;c.updateProjectionMatrix();
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
  state.renderer.setClearColor(x.clearColor,x.clearAlpha);
  state.xray=null;
  Object.assign(ctr,x.controls);
  setTool(x.tool||'off');
  ctr.enabled=x.controls.enabled;
  applyLayers();
  x.visibility.forEach((v,o)=>{o.visible=v});
  x.rotations.forEach((rot,o)=>o.rotation.copy(rot));
  state.scene.updateMatrixWorld(true);
}
export function setLayer(key,on){
  if(state.xray)return;
  if(state.focus?.keep)clearStudyFocus();
  /* Meshes carried by a movement live under the pivot group, not their layer
     root, so a toggle mid-movement could not hide them. End it first. */
  if(state.movement)endMovement();
  state.layers[key]=!!on;
  applyLayers();
}
export function setExtraVisible(key){
  /* Exclusive mode, kept for the structure-set flow: show one system alone.
     Called with a GLB layer key, so every chip that layer draws comes on. */
  SYSTEMS.forEach(s=>{if(s.layer!=='skeleton')state.layers[s.key]=(s.layer===key)});
  setLayerChips('skeleton',!key);
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
    if(!layerOn(key))return;
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
  if(state.separation)setSeparation(0);
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
  state.flow = { on:true, blend:1, uT:{value:0}, uOn:{value:1}, classes:{}, counts:{}, connective:[] };
  state.focus=null;
  state.xray=null;
  state.movement=null;
}
