/* Source-backed sequences; display timings are slowed for the motor example. */
export const MECHANISM_SOURCES = [
  {ref:'phys.2',pages:[43,44,45,49,50,51,52]},
  {ref:'phys.muscle.deck',pages:[27,29,30,32,35]},
  {ref:'phys.3',pages:[21,22,24]},
  {ref:'hss.4.3',pages:[19,24]},
  {ref:'hss.ppans',pages:[27]},
];
export const MOTOR_ROUTES = [
  {id:'deltoid',label:'Axillary nerve → deltoid',nerve:/^(?:muscular branches of )?axillary nerve(?:[lr])?$/i,muscle:/deltoid/i,offset:0},
  {id:'biceps',label:'Musculocutaneous nerve → biceps',nerve:/^musculocutaneous nerve(?:[lr])?$/i,muscle:/biceps brachii/i,offset:1.1},
  {id:'quadriceps',label:'Femoral nerve → quadriceps',nerve:/^femoral nerve(?:[lr])?$/i,muscle:/rectus femoris|vastus (?:medialis|lateralis|intermedius)/i,offset:2.2},
];
export function motorRoute(layer,name) {
  const n=String(name||'').replace(/_/g,' ').trim();
  if(layer==='muscle'&&/bursa|tendon|fascia|sheath/i.test(n))return null;
  return MOTOR_ROUTES.find(r=>(layer==='nervous'?r.nerve:layer==='muscle'?r.muscle:/$a/).test(n))||null;
}
const ease=x=>{x=Math.min(1,Math.max(0,x));return Math.min(1,Math.max(0,x*x*x*(x*(x*6-15)+10)));};
export function motorSequence(t,offset=0) {
  const p=((t-offset)%4+4)%4;
  // Nerve wave 0.10–0.55; end-plate excitation/Ca release precede force.
  const tension=p<.64?0:p<.98?ease((p-.64)/.34):p<1.58?1-ease((p-.98)/.60):0;
  const excitation=p<.56||p>=.72?0:p<.60?ease((p-.56)/.04):1-ease((p-.60)/.12);
  return {clock:p,tension,activation:Math.max(excitation,tension),stage:p<.1?'Rest':p<.56?'Motor impulse':p<.64?'Muscle excitation':p<.98?'Contraction':p<1.58?'Relaxation':'Rest'};
}

/* Distance follows triangle edges, not a world-Y stripe. Coincident vertices
   are welded for UV/normal seams. Disconnected components get their own seed. */
export function transmissionField(points,indices,proximal) {
  const n=points.length/3,ids=new Uint32Array(n),nodes=[],lookup=new Map();
  for(let i=0;i<n;i++){
    const p=points.slice(i*3,i*3+3),key=p.map(x=>Math.round(x*1e6)).join(',');
    let id=lookup.get(key);if(id===undefined){id=nodes.length;lookup.set(key,id);nodes.push({p,edges:new Map()});}ids[i]=id;
  }
  const connect=(a,b)=>{a=ids[a];b=ids[b];if(a===b)return;const d=Math.hypot(...nodes[a].p.map((v,i)=>v-nodes[b].p[i]));nodes[a].edges.set(b,d);nodes[b].edges.set(a,d);};
  const ix=indices||Array.from({length:n},(_,i)=>i);
  for(let i=0;i+2<ix.length;i+=3){connect(ix[i],ix[i+1]);connect(ix[i+1],ix[i+2]);connect(ix[i+2],ix[i]);}
  const dist=new Float64Array(nodes.length).fill(Infinity),heap=[];
  const push=(v)=>{heap.push(v);let i=heap.length-1;while(i){const p=(i-1)>>1;if(heap[p][0]<=v[0])break;heap[i]=heap[p];i=p;}heap[i]=v;};
  const pop=()=>{const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1][0]<heap[c][0])c++;if(heap[c][0]>=last[0])break;heap[i]=heap[c];i=c;}heap[i]=last;}return first;};
  let remaining=nodes.length;
  while(remaining){
    let seed=-1,best=Infinity;
    nodes.forEach((o,i)=>{if(Number.isFinite(dist[i]))return;const d=Math.hypot(...o.p.map((v,j)=>v-proximal[j]));if(d<best){best=d;seed=i;}});
    if(seed<0)break;
    dist[seed]=0;push([0,seed]);remaining--;
    while(heap.length){const [d,a]=pop();if(d!==dist[a])continue;for(const [b,w] of nodes[a].edges){if(d+w<dist[b]){if(!Number.isFinite(dist[b]))remaining--;dist[b]=d+w;push([d+w,b]);}}}
  }
  const max=dist.reduce((a,b)=>Math.max(a,b),1e-9);
  return Float32Array.from(ids,i=>dist[i]/max);
}
