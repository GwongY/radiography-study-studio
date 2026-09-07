// Full BodyParts3D explorer; geometry and scene adapted from Human Atlas (MIT/CC BY 4.0).
//
// Merged into the 3D model page: there is no second canvas and no second
// renderer here. mountAtlas receives the studio's stage element and the
// studio's WebGL renderer, and the scene draws the atlas body onto THE
// studio canvas -- see docs/superpowers/specs/2026-09-07-atlas-studio-merge.md.
// Reset / turntable / isolate live on the shared ctrlpill (studio/depth-picking.js
// routes them here through atlasCommand); only what the course model has no
// equivalent of is docked: concept search, the packed Spread, system presets.
import {SYSTEMS,DEFAULT_VISIBLE} from './anatomy.js';
import {createAtlasScene} from './scene.js';

let host,dock,stageEl,atlas,scene,request=0,active=true;
let state={explode:0,visible:[...DEFAULT_VISIBLE],selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0};
const el=id=>dock.querySelector(`[data-atlas="${id}"]`);
const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function update(patch){state={...state,...patch};scene?.update(state);renderControls();}
function choose(concept){
  update({selected:[...concept.elements],isolate:false,rotate:false});
  el('selection').innerHTML=`<strong>${escape(concept.name)}</strong><span>${escape(concept.id)} · ${concept.elements.length} selected pieces</span><button data-atlas="clear" ${state.selected.length?'':'disabled'}>Clear</button>`;
  wireClear();
}
function wireClear(){const c=el('selection').querySelector('[data-atlas="clear"]');if(c)c.onclick=()=>{update({selected:[],isolate:false});el('selection').textContent='Select a structure';};}
function search(){
  if(!atlas)return;
  const query=el('search').value.trim().toLowerCase();
  const results=atlas.concepts.filter(c=>query?c.name.toLowerCase().includes(query)||c.id.toLowerCase().includes(query):['heart','brain','liver','femur','eye'].includes(c.name.toLowerCase())).sort((a,b)=>a.name.length-b.name.length).slice(0,60);
  el('results').innerHTML=results.map(c=>`<button type="button" data-concept="${escape(c.id)}">${escape(c.name)}<small>${c.elements.length} pieces</small></button>`).join('')||'<span>No matching structures</span>';
  el('results').querySelectorAll('[data-concept]').forEach(button=>button.onclick=()=>choose(atlas.concepts.find(c=>c.id===button.dataset.concept)));
}
function renderControls(){
  if(!atlas)return;
  const count=atlas.parts.filter(p=>state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id)).length;
  el('count').textContent=`${count.toLocaleString()} / ${atlas.parts.length.toLocaleString()} pieces visible`;
  el('spread').value=Math.round(state.explode*100);el('spreadRead').textContent=`${Math.round(state.explode*100)}%`;
  el('hint').textContent=state.explode>.8?'Drag to pan · pinch or scroll to zoom · tap to inspect':'Drag to orbit · pinch or scroll to zoom · tap to inspect';
  el('systems').querySelectorAll('input').forEach(input=>input.checked=state.visible.includes(input.value));
}
function flash(message){
  const status=el('status');if(!status)return;
  status.textContent=message;
  clearTimeout(flash.timer);
  flash.timer=setTimeout(()=>{if(atlas&&el('status'))el('status').textContent='2,234 meshes · 15 systems · adult male reference';},2400);
}
async function load(){
  const ticket=++request;scene?.dispose();scene=null;
  el('status').textContent='Loading full atlas · approximately 33 MB on first use…';el('retry').hidden=true;
  const error=message=>{if(ticket!==request)return;el('status').textContent=message;el('retry').hidden=false;};
  try{
    const response=await fetch(new URL('./models/atlas.json',import.meta.url));if(!response.ok)throw Error('The full atlas catalogue could not load.');
    const data=await response.json();if(ticket!==request)return;atlas=data;
    el('systems').innerHTML=SYSTEMS.map(system=>`<label><span style="--system-color:${system.color}">${escape(system.name)} <small>${atlas.parts.filter(p=>p.system===system.id).length}</small></span><input type="checkbox" value="${system.id}" aria-label="Show ${escape(system.name)}"></label>`).join('');
    el('systems').querySelectorAll('input').forEach(input=>input.onchange=()=>update({visible:input.checked?[...state.visible,input.value]:state.visible.filter(id=>id!==input.value),selected:[],isolate:false}));
    // The stage IS the canvas: one WebGL context serves both bodies, so the
    // shared renderer must never find a replaceChildren() behind it.
    scene=createAtlasScene(stageEl,atlas,state,id=>{const part=atlas.parts.find(p=>p.id===id);if(part)choose({id:part.conceptId,name:part.name,elements:[id]});},percent=>{if(ticket===request)el('status').textContent=percent===100?'2,234 meshes · 15 systems · adult male reference':`Loading full atlas · ${percent}%`;},error,host.renderer);
    scene?.setActive(active);search();renderControls();
  }catch(e){error(e.message||'The full atlas could not load.');}
}
export function setAtlasActive(value){active=value;scene?.setActive(value);}
/* Capture needs the pixels drawn in the same task that reads the buffer. */
export function renderAtlasOnce(){scene?.renderOnce();}
export function inspectAtlas(){return {...scene?.inspect(),state:{...state},concepts:atlas?.concepts.length};}
/* The ctrlpill buttons the course model already has, pointed at the atlas body
   while it is the one on the canvas. studio/depth-picking.js routes here. */
export function atlasCommand(cmd){
  if(cmd==='reset'){update({explode:0,rotate:false,isolate:false,selected:[],visible:[...DEFAULT_VISIBLE],view:'three-quarter',reset:state.reset+1});el('selection').textContent='Select a structure';return true;}
  if(cmd==='turntable'){update({rotate:!state.rotate});return state.rotate?'on':'off';}
  if(cmd==='isolate'){if(!state.selected.length){flash('Select a structure first');return true;}update({isolate:!state.isolate,rotate:false,explode:0});return true;}
  if(cmd==='focus'){if(!state.selected.length){flash('Select a structure first');return true;}update({isolate:true,rotate:false,explode:0});return true;}
  if(cmd==='showall'){update({visible:SYSTEMS.map(s=>s.id),isolate:false});return true;}
  return false;
}
export function mountAtlas(container,options){
  dock=container;host=options||{};stageEl=host.stage;
  if(el('search')){setAtlasActive(true);return;}
  dock.innerHTML=`<div class="atlas-status"><span data-atlas="status" role="status"></span><button data-atlas="retry" hidden>Retry</button></div>
  <div class="atlas-dock">
    <section data-atlas="explorePanel"><h2>Explore</h2><input type="search" data-atlas="search" placeholder="Find a structure or FMA identifier" aria-label="Search full atlas"><div class="atlas-selection" data-atlas="selection" aria-live="polite">Select a structure</div><div class="atlas-results" data-atlas="results"></div></section>
    <section data-atlas="toolsPanel"><h2>Tools</h2><div class="atlas-tools-scroll"><label class="atlas-spread">Spread <output data-atlas="spreadRead">0%</output><input data-atlas="spread" type="range" min="0" max="100" value="0" aria-label="Spread full atlas"></label><div class="atlas-endpoints"><span>Assembled</span><span>Every piece</span></div><div class="atlas-presets"><button data-preset="all">All systems</button><button data-preset="skeleton">Skeleton</button><button data-preset="organs">Organs</button><button data-preset="none">Hide all</button></div><div class="atlas-systems" data-atlas="systems"></div><div data-atlas="count"></div><a href="./atlas/ATTRIBUTION.md" target="_blank" rel="noopener">BodyParts3D · DBCLS · CC BY 4.0</a><a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noopener">Human Atlas · ashemag · MIT</a><small>Adult male reference; does not represent every human structure or variation.</small></div></section>
  </div>
  <div data-atlas="hint" class="atlas-hint"></div>`;
  el('search').oninput=search;
  el('retry').onclick=load;
  el('spread').oninput=()=>update({explode:+el('spread').value/100,rotate:false,view:+el('spread').value>80?'front':state.view});
  wireClear();
  dock.querySelectorAll('[data-preset]').forEach(button=>button.onclick=()=>{
    const presets={all:SYSTEMS.map(s=>s.id),skeleton:['skeletal'],organs:['cardiac','respiratory','digestive','urinary','endocrine','reproductive'],none:[]};
    update({visible:presets[button.dataset.preset],selected:[],isolate:false});el('selection').textContent='Select a structure';
  });
  load();
}
