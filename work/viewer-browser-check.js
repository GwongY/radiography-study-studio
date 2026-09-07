// Run this async function in a fresh dev-server browser tab after opening the app.
// It exercises the real modules, WebGL shader and DOM, without writing study data.
async () => {
  const checks = [];
  const assert = (value, label) => { if (!value) throw new Error(label); checks.push(label); };
  const pause = ms => new Promise(r => setTimeout(r, ms));
  const {state:s} = await import('./studio/imports.js');
  const engine = await import('./studio/live-physiology.js');
  const viewer = await import('./study/what-is-under.js');
  const {applyVisibility} = await import('./studio/region-boxes-how.js');
  const {ui} = await import('./study/imports.js');
  const o = window.__osteo;
  viewer.openViewer(); await o.boot(); await o.ensureXrayLayers();
  if (o.inXray()) viewer.leaveProjection();
  document.querySelector('[data-vtab="3d"]').click();
  await pause(100);
  const sheet = document.getElementById('viewerSheet');
  const stage = document.getElementById('stage');
  const stageRect = stage.getBoundingClientRect();
  assert(sheet.clientHeight > 80 && sheet.scrollHeight > sheet.clientHeight, 'Tools has an independent scroll area');
  const exploreRect = document.getElementById('taskCard').getBoundingClientRect();
  assert(document.getElementById('viewerToolsPanel').getBoundingClientRect().top >= exploreRect.bottom, 'Tools is beneath Explore');
  sheet.scrollTop = 300;
  assert(stage.getBoundingClientRect().height === stageRect.height, 'Scrolling Tools preserves canvas height');
  document.getElementById('viewerMoreBtn').click();
  assert(getComputedStyle(sheet).display === 'none', 'Tools toggle collapses panel');
  document.getElementById('viewerMoreBtn').click(); sheet.scrollTop = 0;

  // A loading projection must not take the shared canvas after another destination wins.
  const originalEnsure = o.ensureXrayLayers;
  let release;
  o.ensureXrayLayers = () => new Promise(r => { release = r; });
  document.querySelector('[data-vtab="xray"]').click(); await pause(20);
  document.querySelector('[data-vtab="3d"]').click();
  release(['skeleton','muscle','organs','circulatory']); await pause(30);
  assert(!o.inXray() && stage.parentElement.id === 'stageHome', 'Late tissue load cannot steal canvas from 3D');
  document.querySelector('[data-vtab="xray"]').click(); await pause(20);
  (await import('./study/navigation-five-destinations.js')).goTo('today');
  release(['skeleton','muscle','organs','circulatory']); await pause(30);
  assert(!o.inXray() && stage.parentElement.id === 'stageHome', 'Leaving viewer cancels pending projection');
  o.ensureXrayLayers = originalEnsure;
  ui.viewerTab='3d'; viewer.openViewer(); await pause(80);

  // GPU fixture: closed cubes have the same optical path at different source distances.
  const T = s.THREE, r = s.renderer;
  const fixture = new T.Scene(), camera = new T.PerspectiveCamera(20,1,.1,100);
  const material = engine.xrayDepthMaterial(T,.5,1,0);
  const cube = new T.Mesh(new T.BoxGeometry(2,2,2),material);fixture.add(cube);
  const target = new T.WebGLRenderTarget(32,32,{type:T.FloatType,format:T.RGBAFormat,depthBuffer:false});
  const pixel = new Float32Array(4);
  const previousColor = r.getClearColor(new T.Color()), previousAlpha = r.getClearAlpha();
  const readCube = distance => {
    camera.position.set(0,0,distance);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
    r.setRenderTarget(target);r.setClearColor(0,0);r.clear();r.render(fixture,camera);
    r.readRenderTargetPixels(target,16,16,1,1,pixel);return pixel[0];
  };
  const near=readCube(10), far=readCube(20);
  assert(Math.abs(near-1)<.002 && Math.abs(far-near)<.002, 'GPU closed-volume attenuation is distance invariant');
  r.setRenderTarget(null);r.setClearColor(previousColor,previousAlpha);
  target.dispose();cube.geometry.dispose();material.dispose();

  // Start from a deliberately altered workspace: filter, hidden mesh, cut and active pen.
  s.motionEnabled=false;s.fullModel.rotation.y=.18;s.region='upper_limb';s.isolated=true;
  s.selectedId=s.fullMeshes[0].userData.canonicalId;applyVisibility();
  o.setCut('axial',.54,false);o.setTool('pen');
  s.scene.updateMatrixWorld(true);
  const before = {pos:s.camera.position.clone(),target:s.controls.target.clone(),layers:JSON.stringify(s.layers),
    visibility:new Map(),materials:new Map(),rotation:s.fullModel.rotation.y,clip:s.renderer.clippingPlanes};
  s.scene.traverse(m=>before.visibility.set(m,m.visible));
  [...s.fullMeshes,...Object.values(s.extraModels).flatMap(m=>m.meshes)].forEach(m=>before.materials.set(m,m.material));
  document.querySelector('[data-vtab="xray"]').click();await pause(80);
  assert(o.inXray() && stage.parentElement.id==='xrayMount', 'Projection owns shared canvas');
  assert(s.fullMeshes.every(m=>m.visible) && s.fullModel.visible, '3D filtering and isolation cannot remove projected bones');
  assert(s.extraModels.circulatory.meshes.filter(m=>m.visible).length===17, 'Heart is included without vessel trees');
  assert(s.tool===null && s.renderer.clippingPlanes.length===0, 'Pen and section are suspended');
  const capture = async () => {
    const src=o.snapshot(), img=new Image(); img.src=src;await img.decode();
    const c=document.createElement('canvas');c.width=96;c.height=96;
    const ctx=c.getContext('2d');ctx.drawImage(img,0,0,96,96);
    const pixels=ctx.getImageData(0,0,96,96).data;
    let sum=0,lit=0;
    for(let i=0;i<pixels.length;i+=4){sum+=pixels[i];if(pixels[i]>12)lit++;}
    return {src,mean:sum/(96*96),lit};
  };
  const films=[];
  for(const region of ['chest','abdo','pelvis','hand','body']){
    o.xrayRegion(region);
    for(const view of ['pa','ap','lat']){
      o.xrayView(view);
      const film=await capture();films.push({region,view,mean:+film.mean.toFixed(2),lit:film.lit});
      assert(film.lit>12 && film.mean>1 && film.mean<245, `${region}/${view} renders a nonblank film`);
    }
  }
  o.xrayRegion('chest');o.xrayView('pa');
  const first=await capture(), second=await capture();
  assert(first.src===second.src,'Repeated exposure has stable grain and geometry');
  const sid=s.xray.sidCm;
  o.xrayZoom(2);assert(s.xray.sidCm===sid,'Image zoom keeps SID fixed');o.xrayZoom(1);
  const rect=stage.getBoundingClientRect(), start={clientX:rect.x+rect.width/2,clientY:rect.y+rect.height/2};
  stage.dispatchEvent(new PointerEvent('pointerdown',{...start,pointerId:77,isPrimary:true,bubbles:true}));
  stage.dispatchEvent(new PointerEvent('pointermove',{clientX:start.clientX+60,clientY:start.clientY+30,pointerId:77,isPrimary:true,bubbles:true}));
  stage.dispatchEvent(new PointerEvent('pointerup',{clientX:start.clientX+60,clientY:start.clientY+30,pointerId:77,isPrimary:true,bubbles:true}));
  assert(s.xray.postMat.uniforms.uPan.value.x>0 && s.xray.postMat.uniforms.uPan.value.y<0 && s.xray.sidCm===sid,'PA image pans in pointer direction without changing SID');
  o.xrayView('pa');
  const matBefore=s.fullMeshes[0].material;
  const left=s.fullMeshes.find(m=>m.name.includes('Clavicle')&&m.name.endsWith('l'));
  assert(!!left,'Left clavicle fixture exists');
  const point=new T.Box3().setFromObject(left).getCenter(new T.Vector3()).project(s.camera);
  (await import('./studio/depth-picking.js')).pick({clientX:rect.x+(1-point.x)*rect.width/2,clientY:rect.y+(1-point.y)*rect.height/2});
  assert(s.pickStack.some(m=>m===left),'PA picking accounts for horizontal film mirror');
  assert(s.fullMeshes[0].material===matBefore,'Projection picking does not rewrite attenuation');
  o.xrayAec(false);o.xrayMas(2);const low=(await capture()).mean;
  o.xrayMas(60);const high=(await capture()).mean;
  assert(Math.abs(low-high)>2,'Manual exposure changes the film');
  o.xrayAec(true);o.xrayMas(2);const aecLow=(await capture()).mean;
  o.xrayMas(60);const aecHigh=(await capture()).mean;
  assert(aecLow===aecHigh,'AEC holds fluence despite manual mAs state');
  o.xrayWindow(8,5);assert(Math.abs((await capture()).mean-first.mean)>2,'Window and level change displayed range');
  document.getElementById('xrayReset').click();
  assert(s.camera.zoom===1 && s.xray.win.lo===1 && s.xray.view==='pa','Reset restores display and alignment');
  document.querySelector('[data-vtab="3d"]').click();
  assert(!o.inXray() && stage.parentElement.id==='stageHome','Exit returns canvas to 3D');
  assert(s.camera.position.distanceTo(before.pos)<1e-8 && s.controls.target.distanceTo(before.target)<1e-8,'Exit restores camera exactly');
  assert(JSON.stringify(s.layers)===before.layers,'Exit restores system switches');
  assert([...before.materials].every(([m,mat])=>m.material===mat),'Exit restores original materials');
  assert([...before.visibility].every(([m,v])=>m.visible===v),'Exit restores mesh and overlay visibility');
  assert(s.fullModel.rotation.y===before.rotation && s.renderer.clippingPlanes===before.clip && s.tool==='pen','Exit restores rotation, cut and tool');
  o.setTool('off');o.clearCut();s.region='all';s.isolated=false;applyVisibility();
  return {checks,films,gpu:{near,far}};
}
