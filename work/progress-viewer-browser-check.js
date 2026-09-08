// Evaluate this function on a fresh dev-server tab. Uses synthetic questions only.
async function progressViewerBrowserCheck() {
  const check=(value,message)=>{if(!value)throw new Error(message);};
  const engine=await import('/study/session-engine.js');
  const home=await import('/study/home.js');
  const {ui}=await import('/study/state.js');
  const search=await import('/study/global-search-one.js');
  const hud=await import('/studio/spatial-concept-overlays.js');
  const {compositeFor}=await import('/synonyms.js?v=3');
  const {STRUCTURE_MODELS}=await import('/study-data.js');
  engine.startSession({mode:'daily'});
  const id=ui.session.items[0].id;
  for(const stage of ['remember','practise','apply']){
    engine.setStep(stage);check(home.getItemStep(id)===stage,'stage did not advance');
  }
  engine.setStep('learn');check(home.getItemStep(id)==='apply','progress fell on revisit');
  const session=ui.session,html=document.getElementById('rssStage').innerHTML;
  const pane=document.querySelector('#sessionView>.navcontent');pane.scrollTop=300;
  const scroll=pane.scrollTop;
  document.querySelector('#sessionView>.navhead').classList.add('tucked');
  const button=document.getElementById('rssSessionSearch'),r=button.getBoundingClientRect();
  check(r.right<=innerWidth&&r.left>innerWidth-100,'search not at upper right');
  check(document.elementFromPoint(r.x+22,r.y+22)===button,'search not tappable');
  search.openSearchSheet();search.runSearch('carpus');
  check(document.querySelector('#searchResultsSheet button b').textContent.startsWith('Carpus'),'wrong first result');
  document.querySelector('#searchResultsSheet button').click();
  await window.__osteo.boot();
  await new Promise(resolve=>setTimeout(resolve,250));
  const st=window.__osteo.state;
  for(const [term,count] of [['carpus',16],['tarsus',14]]){
    const c=compositeFor(term);
    const result=await window.__osteo.revealStructure({name:c.name,parts:c.parts.map(([system,mesh])=>({system,mesh,file:STRUCTURE_MODELS[system].file}))});
    check(result.ok&&result.found===count,`${term}: wrong bone count`);
  }
  const label=st.pickGroup.children.find(o=>o.userData.meshAttachment),initial=label.position.clone();
  window.__osteo.setSeparation(.8);hud.updateHudSprites();
  check(label.position.distanceTo(initial)>.01,'selection label did not move');
  const a=label.userData.meshAttachment;
  const expected=a.local.clone().applyMatrix4(a.mesh.matrixWorld).applyMatrix4(new st.THREE.Matrix4().copy(a.root.matrixWorld).invert()).sub(a.origin).add(a.base);
  check(label.position.distanceTo(expected)<1e-8,'selection label lost mesh registration');
  window.__osteo.setSeparation(0);hud.updateHudSprites();
  check(label.position.distanceTo(initial)<1e-8,'selection label did not collapse home');
  document.getElementById('viewerLessonQuit').click();
  check(ui.session===session,'viewer discarded session');
  check(document.getElementById('rssStage').innerHTML===html,'viewer changed lesson content');
  check(Math.abs(pane.scrollTop-scroll)<1,'viewer lost scroll position');
  return {pass:true,stages:'1/4 → 4/4, no regression',carpus:16,tarsus:14,returnScroll:scroll};
}
