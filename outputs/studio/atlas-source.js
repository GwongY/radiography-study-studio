/*
 * The Full atlas as a SOURCE of the one 3D view, not a second one.
 *
 * Until now the atlas tab carried its own WebGLRenderer, its own canvas and
 * its own copy of every view control. There is one WebGL context in this app
 * (see docs/TRAPS.md, "The viewer is a workspace"), and the projection already
 * showed the pattern for borrowing THE stage. enterAtlas applies that pattern
 * to the atlas: it renders through state.renderer onto els.stage, the studio's
 * controls are handed over for the duration, and the renderer-global state the
 * atlas scene sets (tone mapping, exposure) is saved and put back exactly the
 * way suspendViewerState put back the cut, the peels and the region filter.
 *
 * The study half reaches this through window.__osteo (enterAtlas / exitAtlas /
 * atlasActive / atlasCommand), guarded by work/bridge-check.mjs. The ctrlpill
 * buttons route here while the atlas body is the one on the canvas --
 * see studio/depth-picking.js.
 *
 * A lesson always wins: focusStructures, revealStructure and startMovement
 * force-exit this source on their way in, so a lesson card never mounts the
 * stage under an atlas that is still painting.
 */
import { els, state } from './imports.js';
import { suspendViewerState, resumeViewerState, applyLayers } from './live-physiology.js';
import { boot3D, resize } from './region-boxes-how.js';

let mod=null,saved=null;

export function atlasActive(){return !!state.atlasPainting;}
/* The capture path reads the flag as a predicate name; same function. */
export const atlasPainting = atlasActive;

async function ensureBooted(){
  if(state.scene)return true;
  if(!state.__booted){state.__booted=true;state.bootPromise=boot3D();}
  return !!(await state.bootPromise);
}

export async function enterAtlas(dock){
  if(state.atlasPainting)return true;
  if(state.xray)return false;
  if(!dock)return false;
  if(!await ensureBooted())return false;
  /* The same suspension a lesson gets: the course body the reader goes back
     to keeps its cut, its peels, its region filter -- and none of it leaks. */
  suspendViewerState();
  saved={tone:state.renderer.toneMapping,exposure:state.renderer.toneMappingExposure};
  state.renderer.toneMapping=state.THREE.ACESFilmicToneMapping;
  state.renderer.toneMappingExposure=1.12;
  if(state.controls)state.controls.enabled=false;
  try{
    mod=mod||await import('../atlas/viewer.js');
    mod.mountAtlas(dock,{stage:els.stage,renderer:state.renderer});
    mod.setAtlasActive(true);
  }catch(error){
    console.error(error);
    if(saved){state.renderer.toneMapping=saved.tone;state.renderer.toneMappingExposure=saved.exposure;saved=null;}
    if(state.controls)state.controls.enabled=true;
    resumeViewerState();
    return false;
  }
  state.atlasPainting=true;
  return true;
}

export function exitAtlas(){
  if(!state.atlasPainting)return;
  state.atlasPainting=false;
  mod?.setAtlasActive(false);
  if(saved){state.renderer.toneMapping=saved.tone;state.renderer.toneMappingExposure=saved.exposure;saved=null;}
  if(state.controls)state.controls.enabled=true;
  resumeViewerState();
  applyLayers();
  /* The canvas was the atlas's while it painted; hand the sizing back before
     the course body's next frame, or the aspect drifts until a real resize. */
  resize();
}

/* The shared ctrlpill, pointed at the atlas body. Returns whatever the atlas
   made of the command -- truthy when it was handled -- so the caller knows
   whether the course handler must still run. The turntable command returns
   the new rotate state so the button can paint itself from it. */
export function atlasCommand(cmd){
  if(!state.atlasPainting||!mod)return false;
  try{return mod.atlasCommand(cmd)??true;}catch(e){return false;}
}

/* Capture renders in the same task it reads the buffer (no
   preserveDrawingBuffer), so snapshot() asks this first exactly as it asks
   renderXray(). */
export function atlasRenderOnce(){
  if(!state.atlasPainting||!mod)return false;
  try{mod.renderAtlasOnce();return true;}catch(e){return false;}
}

export function init(){
  if(typeof window==='undefined'||!window.__osteo)return;
  Object.assign(window.__osteo,{
    enterAtlas:(dock)=>enterAtlas(dock),
    exitAtlas:()=>exitAtlas(),
    atlasActive:()=>atlasActive(),
    atlasCommand:(cmd)=>atlasCommand(cmd),
  });
}
