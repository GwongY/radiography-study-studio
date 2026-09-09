// Run in an isolated browser context: uses real lesson launchers and persistence.
async function newLessonProgressBrowserCheck(){
 const {STUDY_ITEMS,priorOf,STORAGE_PREFIX}=await import('/study-data.js');
 const {ui}=await import('/study/state.js');
 const {startSession,setStep,advanceItem}=await import('/study/session-engine.js');
 const {studyItemWithin}=await import('/study/global-search-one.js');
 const {getItemStep}=await import('/study/home.js');
 const {store}=await import('/study/storage-versioned-keys.js');
 const items=[...STUDY_ITEMS.filter(i=>priorOf(i)).slice(0,3),STUDY_ITEMS.find(i=>!priorOf(i))];
 if(items.length!==4||items.some(i=>!i))throw Error('Need prior and new-content fixtures');
 const check=(condition,message)=>{if(!condition)throw Error(message);};
 for(const item of items){localStorage.removeItem('rss-step:'+item.id);localStorage.removeItem(STORAGE_PREFIX+'step:'+item.id);delete store.items[item.id];}
 const evidence=[];
 startSession({mode:'ids',ids:[items[0].id,items[1].id]});
 check(ui.session.step==='learn'&&getItemStep(items[0].id)==='learn','New prior-covered lesson must start at 1/4');
 setStep('practise');advanceItem();
 check(ui.session.step==='learn'&&getItemStep(items[1].id)==='learn','Next lesson inherited Practise');
 setStep('apply');
 for(const [item,expected] of [[items[0],'practise'],[items[1],'apply']]){
  startSession({mode:'ids',ids:[item.id]});check(ui.session.step===expected,'Saved stage lost');
  evidence.push({id:item.id,reopened:ui.session.step});
 }
 studyItemWithin({items:[items[2]],id:'test',title:'Test'},items[2].id);
 check(ui.session.step==='learn'&&getItemStep(items[2].id)==='learn','Topic/search launcher skipped Learn');
 startSession({mode:'ids',ids:[items[3].id]});
 check(ui.session.step==='learn'&&getItemStep(items[3].id)==='learn','New-content lesson skipped Learn');
 for(const item of [items[2],items[3]])evidence.push({id:item.id,newStage:getItemStep(item.id)});
 document.getElementById('rssSessionClose').click();
 return {pass:true,evidence};
}
