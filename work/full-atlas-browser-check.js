// Evaluate in the dev-server app using a fresh isolated Chrome context.
async () => {
  const checks=[],assert=(ok,name)=>{if(!ok)throw Error(name);checks.push(name);};
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const until=async(fn)=>{for(let i=0;i<120;i++){if(fn())return;await wait(100);}throw Error('Atlas timed out');};
  const viewer=await import('./study/what-is-under.js');viewer.openViewer();
  document.querySelector('[data-vtab=atlas]').click();
  const a=await import('./atlas/viewer.js');await until(()=>a.inspectAtlas().ready);
  const el=id=>document.querySelector(`[data-atlas="${id}"]`);
  assert(a.inspectAtlas().parts===2234,'All 2,234 meshes loaded');
  assert(a.inspectAtlas().concepts===3432,'All 3,432 concepts available');
  assert(a.inspectAtlas().drawCalls<100,'Batched rendering uses fewer than 100 draw calls');
  assert(el('systems').querySelectorAll('input').length===15,'All 15 systems exposed');
  document.querySelector('[data-preset=skeleton]').click();
  assert(a.inspectAtlas().state.visible.join()==='skeletal','Skeleton preset');
  el('spread').value=100;el('spread').dispatchEvent(new Event('input'));
  await until(()=>a.inspectAtlas().amount>.999);
  assert(a.inspectAtlas().packingWidth>0,'Full spread reaches a packed inventory');
  const target=a.inspectAtlas().target,rect=el('canvas').getBoundingClientRect();
  assert(target&&target.x>0&&target.x<rect.width&&target.y>0&&target.y<rect.height,'Packed targets remain within the canvas');
  const canvas=el('canvas').querySelector('canvas');
  // Synthetic pointers are not registered with the OS, so capture has no owner.
  const capture=canvas.setPointerCapture,release=canvas.releasePointerCapture;
  try{
    canvas.setPointerCapture=canvas.releasePointerCapture=()=>{};
    for(const type of ['pointerdown','pointerup'])canvas.dispatchEvent(new PointerEvent(type,{pointerId:101,pointerType:'mouse',isPrimary:true,clientX:rect.left+target.x,clientY:rect.top+target.y,bubbles:true}));
  }finally{canvas.setPointerCapture=capture;canvas.releasePointerCapture=release;}
  assert(a.inspectAtlas().state.selected.length>0,'Packed piece can be picked');
  el('search').value='heart';el('search').dispatchEvent(new Event('input'));
  const heart=[...el('results').querySelectorAll('button')].find(b=>b.firstChild.textContent==='heart');assert(heart,'Heart search result');heart.click();
  assert(a.inspectAtlas().state.selected.length===83,'Compound heart concept selects all 83 members');
  el('isolate').click();await until(()=>a.inspectAtlas().amount<.001);
  assert(a.inspectAtlas().state.isolate,'Isolation assembles and frames selection');
  el('clear').click();assert(!a.inspectAtlas().state.isolate&&!a.inspectAtlas().state.selected.length,'Clear selection exits isolation');
  for(const id of ['explore','tools']){el(id).click();assert(el(id+'Panel').hidden,`${id} collapses`);el(id).click();assert(!el(id+'Panel').hidden,`${id} expands`);}
  el('reset').click();assert(a.inspectAtlas().state.explode===0,'Reset reassembles anatomy');
  document.querySelector('[data-vtab="3d"]').click();await wait(100);
  assert(!a.inspectAtlas().active,'Full atlas rendering pauses on Course model');
  const before=a.inspectAtlas().renderedFrames;await wait(150);
  assert(a.inspectAtlas().renderedFrames===before,'Hidden atlas draws no frames');
  document.querySelector('[data-vtab=atlas]').click();await until(()=>a.inspectAtlas().active);
  assert(document.querySelectorAll('.atlas-canvas canvas').length===1,'Reopening reuses one renderer');
  assert(document.documentElement.scrollWidth<=innerWidth,'No horizontal page overflow');
  return {checks,render:a.inspectAtlas()};
}
