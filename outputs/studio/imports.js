
  import { ANATOMY_DATABASE, LANDMARK_HOTSPOTS, MODEL_CATALOG, REGIONS, getAnatomy, searchAnatomy } from '../anatomy-data.js?v=5';
  import { FLOW_CLASSES, FLOW_ANCHORS, LAYER_CLASSES, classify,
    cardiacEnvelope, breathEnvelope, spikeEnvelope, contractEnvelope, atriumEnvelope, ventricleEnvelope, RATES } from '../physiology.js?v=4';
  import { BODY_CONCEPTS, CONCEPT_GROUPS, conceptById, conceptAncestors, conceptChildren, conceptLeaves } from '../bodymap.js?v=4';
  import { createResolver } from '../landmarks.js?v=2';
  import { buildCavityGeometry, measureLandmarks, measureGrid, gridBounds } from '../cavity-build.js?v=2';
  import { boundsOf, sampleField } from '../cavity-geom.js?v=2';
  /* Block 0 has its own import scope -- block 1's copy is not visible here.
     Picking needs the index to know which meshes are sub-parts of one
     named structure. See the note in CLAUDE.md about the two scopes. */
  import { MESH_INDEX, UNITS } from '../mesh-index.js?v=5';
  /* Which body system a mesh belongs to inside its GLB layer -- the two
     composite layers show several chips each. See outputs/systems.js. */
  import { SYSTEMS, isSplit, layerOf, systemCounts, systemsIn, systemsOf } from '../systems.js?v=1';

  export const $ = (id) => document.getElementById(id);
  export const els = { stage:$('stage'), state:$('stageState'), stateTitle:$('stateTitle'), stateCopy:$('stateCopy'), retry:$('retryBtn'), progress:$('progressBar'), stageMeta:$('stageMeta'), regionMeta:$('regionMeta'), selectedName:$('selectedName'), selectedChips:$('selectedChips'), selectedDetails:$('selectedDetails'), taskKicker:$('taskKicker'), taskTitle:$('taskTitle'), taskCopy:$('taskCopy'), answers:$('answers'), feedback:$('feedback'), next:$('nextBtn'), regions:$('regionButtons'), reviewBar:$('reviewBar'), reviewNumber:$('reviewNumber'), reviewHint:$('reviewHint'), toast:$('toast'), detailDialog:$('detailDialog'), detailTitle:$('detailTitle'), detailChips:$('detailChips'), detailBody:$('detailBody'), zoomIn:$('zoomInBtn'), zoomOut:$('zoomOutBtn'), focus:$('focusBtn'), motion:$('motionBtn') };
  export const state = { mode:'explore', region:'all', selectedId:null, selectedSide:null, current:null, quizStarted:false, isolated:false, meshes:[], fullMeshes:[], hotspots:[], fullPickables:[], importedRecords:new Map(), selectionAnchor:null, lastPick:{x:0,y:0,t:0,candidates:[],index:-1}, lastDetailId:null, hashRestored:false, scene:null, camera:null, controls:null, renderer:null, raycaster:null, pointer:null, fullModel:null, realModel:null, realIsProcedural:false, memoryStreak:0, motionEnabled:true, motionPhase:0, stats:loadStats() };
export const LAYER_NAMES={skeleton:'Skeleton',muscle:'Muscles',organs:'Organs',circulatory:'Vessels',nervous:'Nerves',joint:'Ligaments',lymphatic:'Lymphatic'};

  function loadStats(){ try{return JSON.parse(localStorage.getItem('osteology-studio-stats') || '{}')}catch{return {}} }

/* Passed through to the parts: these come from the data modules above. */
export {
  ANATOMY_DATABASE,
  BODY_CONCEPTS,
  FLOW_ANCHORS,
  FLOW_CLASSES,
  LANDMARK_HOTSPOTS,
  MESH_INDEX,
  MODEL_CATALOG,
  REGIONS,
  SYSTEMS,
  UNITS,
  atriumEnvelope,
  boundsOf,
  breathEnvelope,
  buildCavityGeometry,
  cardiacEnvelope,
  classify,
  conceptById,
  conceptLeaves,
  contractEnvelope,
  createResolver,
  getAnatomy,
  gridBounds,
  isSplit,
  layerOf,
  measureGrid,
  measureLandmarks,
  spikeEnvelope,
  systemCounts,
  systemsIn,
  systemsOf,
  ventricleEnvelope,
};
