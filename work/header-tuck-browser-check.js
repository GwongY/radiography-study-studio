async function headerTuckBrowserCheck(){
 const {startSession}=await import('/study/session-engine.js');
 startSession({mode:'ids',ids:['hss2011-terminology-anatomical-position']});
 const head=document.querySelector('#sessionView>.navhead'),pane=head.nextElementSibling;
 document.getElementById('rssSessionMeta').textContent='Item 1 of 23 · Week 1 — Subject Orientation & Introduction + Musculoskeletal System';
 const wait=()=>new Promise(r=>setTimeout(r,300));await wait();
 const geometry=()=>{const b=pane.getBoundingClientRect();return [b.top,b.height,pane.scrollHeight-pane.clientHeight];};
 const before=geometry();const evidence=[];
 for(const [scroll,hidden] of [[350,true],[200,false],[450,true],[0,false]]){
  pane.scrollTop=scroll;pane.dispatchEvent(new Event('scroll'));await wait();
  if(head.classList.contains('tucked')!==hidden)throw Error('Header direction state');
  for(const id of ['rssSessionTextSize','rssSessionSearch']){
   const el=document.getElementById(id),css=getComputedStyle(el),rect=el.getBoundingClientRect();
   if((css.visibility==='hidden')!==hidden)throw Error(id+' remains visible');
   if(hidden&&css.pointerEvents!=='none')throw Error(id+' remains interactive');
   if(!hidden&&(rect.right>innerWidth||rect.left<0))throw Error(id+' outside viewport');
  }
  if(geometry().some((v,i)=>Math.abs(v-before[i])>.1))throw Error('Scroll geometry shifted');
  evidence.push({scroll,hidden,controlsVisible:!hidden});
 }
 return {pass:true,width:innerWidth,evidence};
}
