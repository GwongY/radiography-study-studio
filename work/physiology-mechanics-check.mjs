import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {MECHANISM_SOURCES,motorRoute,motorSequence,transmissionField} from '../outputs/physiology-mechanics.js';
import {RATES,atriumEnvelope,ventricleEnvelope,cardiacEnvelope,breathEnvelope,advancePhysiology} from '../outputs/physiology.js';
const period=60/RATES.heartBpm;
assert(atriumEnvelope(.12*period)>.99&&ventricleEnvelope(.12*period)===0);
assert(atriumEnvelope(.24*period)===0&&ventricleEnvelope(.24*period)===0,'AV interval');
assert(ventricleEnvelope(.42*period)>.99&&atriumEnvelope(.42*period)===0);
assert(cardiacEnvelope(.46*period)>.99,'arterial crest follows ventricular onset');
for(const [fn,p] of [[atriumEnvelope,period],[ventricleEnvelope,period],[cardiacEnvelope,period],[breathEnvelope,60/RATES.breathsPerMin]]){
  for(let t=0;t<2*p;t+=p/1000){
    const a=fn(t),b=fn(t+1e-5);assert(Number.isFinite(a)&&a>=0&&a<=1);assert(Math.abs(a-b)<.001,'continuous envelope');
  }
  assert(Math.abs(fn(p-1e-6)-fn(p+1e-6))<1e-5,'seam continuity');
}
for(const hz of [30,60,120]){
  let clock={blend:0,lastTime:0,elapsed:0};
  for(let i=1;i<=hz/2;i++)clock=advancePhysiology(clock,i/hz,true);
  assert(Math.abs(clock.elapsed-.5)<1e-9);
  assert(Math.abs(clock.blend-(1-Math.exp(-6)))<1e-9,'frame-rate independent transition');
  assert.equal(advancePhysiology(clock,100,true).elapsed,clock.elapsed,'hidden gap pauses');
}
for(const t of [.1,.3,.55,.63])assert.equal(motorSequence(t).tension,0,'no force before excitation');
assert(motorSequence(.98).tension>.99);
assert.equal(motorSequence(1.58).tension,0);
assert.equal(motorRoute('muscle','Bursa of deltoid muscle'),null);
assert.equal(motorRoute('nervous','Maxillary_nerver'),null);
assert.equal(motorRoute('nervous','Axillary_nerver').id,'deltoid');
// A folded strip: the distal end is higher than its bend. A world-Y stripe
// would reverse there; path distance continues increasing around the bend.
const pts=[0,3,0, .1,3,0, 0,0,0, .1,0,0, 3,0,0, 3,.1,0, 3,2,0, 3.1,2,0];
const ix=[0,1,2,1,3,2,2,3,4,3,5,4,4,5,6,5,7,6];
const field=transmissionField(pts,ix,[0,3,0]);
assert(field[6]>field[4]&&field[4]>field[2]&&field[2]>field[0]);
assert(field.every(v=>Number.isFinite(v)&&v>=0&&v<=1));
const split=transmissionField([...pts,20,20,0,21,20,0,20,21,0],[...ix,8,9,10],[0,3,0]);
assert(split.every(v=>Number.isFinite(v)&&v>=0&&v<=1),'disconnected components remain finite');
const sources=JSON.parse(readFileSync(new URL('./source-text.json',import.meta.url))).sources;
for(const {ref,pages} of MECHANISM_SOURCES){
  assert(sources[ref],`missing source ${ref}`);
  for(const page of pages)assert(sources[ref].pages[page-1]?.length,`missing ${ref} p${page}`);
}
console.log('PASS: cardiac order, AV interval, breathing continuity, display-rate independence, motor latency, curved transmission and source pages');
