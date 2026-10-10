import * as T from 'three';
// Crossing particles are gated by the same pressure-phase opening used by the valve.
export function createTransvalvularFlow(valves){
const flows=valves.map(valve=>{const color=['MV','AV'].includes(valve.key)?0xc62828:0x367db4,particles=[];for(let i=0;i<8;i++){const mesh=new T.Mesh(new T.SphereGeometry(valve.radius*.042,10,7),new T.MeshBasicMaterial({color,transparent:true,opacity:.9}));mesh.userData.kind='transvalvular-flow';mesh.userData.key=valve.key;valve.g.add(mesh);particles.push(mesh);}return{valve,particles};});
return{update(beat,cycle){const p=beat.phase;for(const f of flows){const v=f.valve,open=v.av?cycle.avOpen:cycle.semilunarOpen,window=v.av?((p-.66+1)%1)/.59:(p-.335)/.20;f.particles.forEach((o,i)=>{const t=((window*1.8+i/8)%1+1)%1;o.visible=v.g.visible&&open>.45;const y=v.av?(.9-2.35*t)*v.radius:(-.8+1.95*t)*v.radius;o.position.set(Math.sin(i*2.4)*v.radius*.075,y,Math.cos(i*2.4)*v.radius*.075);});}}};}
