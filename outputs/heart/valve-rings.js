// Valve annulus rings from where the upstream and downstream cavities meet (atlas leaflet meshes include chordae, so their bounds sit inside the ventricles).
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>{const l=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/l,a[1]/l,a[2]/l];};
function verts(list){const out=[];for(const pos of list)for(let i=0;i<pos.length;i+=3)out.push([pos[i],pos[i+1],pos[i+2]]);return out;}
function centroid(p){const c=[0,0,0];for(const q of p){c[0]+=q[0];c[1]+=q[1];c[2]+=q[2];}return c.map(v=>v/p.length);}
function ring(up,down,th=.16){const a=verts(up),b=verts(down),pts=[],t2=th*th;
for(const p of a){let best=Infinity,q0=null;for(const q of b){const d=(p[0]-q[0])**2+(p[1]-q[1])**2+(p[2]-q[2])**2;if(d<best){best=d;q0=q;}}if(best<t2)pts.push([(p[0]+q0[0])/2,(p[1]+q0[1])/2,(p[2]+q0[2])/2]);}
const c=centroid(pts),C=[[0,0,0],[0,0,0],[0,0,0]];for(const p of pts){const d=sub(p,c);for(let i=0;i<3;i++)for(let j=0;j<3;j++)C[i][j]+=d[i]*d[j];}
const mv=v=>C.map(r=>dot(r,v));let e1=norm([1,.31,.17]);for(let i=0;i<80;i++)e1=norm(mv(e1));let e2=norm(cross(e1,[.2,.9,.4]));for(let i=0;i<80;i++){e2=mv(e2);e2=norm(sub(e2,e1.map(v=>v*dot(e2,e1))));}
let n=norm(cross(e1,e2));if(dot(n,sub(centroid(b),centroid(a)))<0)n=n.map(v=>-v);
const r=pts.reduce((s,p)=>s+Math.hypot(...sub(p,c)),0)/pts.length;return{c,n,r};}
// meshes: [{key,group,pos}] in model coordinates; n points downstream (atrium→ventricle, ventricle→artery).
export function computeValveRings(meshes){const cav=k=>meshes.filter(m=>m.key===k&&m.group==='chambers').map(m=>m.pos),vessel=k=>meshes.filter(m=>m.key===k).map(m=>m.pos);
const rings={MV:ring(cav('LA'),cav('LV')),TV:ring(cav('RA'),cav('RV')),AV:ring(cav('LV'),vessel('AO')),PV:ring(cav('RV'),vessel('PT'))};
// The anterior mitral leaflet faces the aortic valve; keep that as the leaflet split axis.
const toAV=sub(rings.AV.c,rings.MV.c),n=rings.MV.n;rings.MV.split=norm(sub(toAV,n.map(v=>v*dot(toAV,n))));
const toSeptum=sub(rings.MV.c,rings.TV.c),m=rings.TV.n;rings.TV.split=norm(sub(toSeptum,m.map(v=>v*dot(toSeptum,m))));
for(const k in rings)rings[k].key=k;return rings;}
