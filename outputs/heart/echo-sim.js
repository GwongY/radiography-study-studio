import {computeValveRings} from './valve-rings.js?v=2';
// Schematic B-mode echo: slices the heart meshes with a plane and renders a sector image.
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],mul=(a,s)=>[a[0]*s,a[1]*s,a[2]*s],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>mul(a,1/Math.hypot(a[0],a[1],a[2])),mid=(a,b,t=.5)=>add(a,mul(sub(b,a),t));

export const ECHO_VIEWS=[
{id:'PLAX',group:'TTE',name:'胸骨旁長軸',english:'Parasternal long axis',labels:['RV','LV','LA','Ao'],text:'探頭放在胸骨左緣，切面沿左心室長軸。靠近探頭的是右心室，下方依序是左心室、二尖瓣與左心房；畫面右側是主動脈根部與主動脈瓣。'},
{id:'PSAX_AV',group:'TTE',name:'胸骨旁短軸：主動脈瓣',english:'PSAX aortic valve level',labels:['RA','RV','LA','Ao','PA'],text:'探頭在胸骨旁轉 90 度，橫切主動脈根部。中央是主動脈瓣（三片瓣葉），周圍環繞右心房、右心室流出道、肺動脈與左心房。'},
{id:'PSAX_MV',hideValves:['TV'],group:'TTE',name:'胸骨旁短軸：二尖瓣',english:'PSAX mitral valve level',labels:['RV','LV'],text:'往心尖方向移一些，橫切二尖瓣高度。左心室呈圓形，可看到二尖瓣前後瓣葉開合，像魚嘴；右心室在前方呈新月形。'},
{id:'PSAX_PM',hideValves:['TV','MV'],group:'TTE',name:'胸骨旁短軸：乳頭肌',english:'PSAX papillary muscle level',labels:['RV','LV'],text:'再往心尖移，橫切乳頭肌高度。左心室呈圓環，可評估各段心肌收縮是否均勻。'},
{id:'A4C',group:'TTE',name:'心尖四腔',english:'Apical four-chamber',labels:['LV','RV','LA','RA'],text:'探頭放在心尖，朝向心臟底部。上方是左右心室，下方是左右心房；左心室在畫面右側，可同時看到二尖瓣與三尖瓣。'},
{id:'A5C',hide:['pv','DAO','RPA','LPA','PAB'],group:'TTE',name:'心尖五腔',english:'Apical five-chamber',labels:['LV','RV','LA','RA','Ao'],text:'由四腔切面把探頭稍微往前傾，多切到左心室流出道與主動脈瓣，常用來看主動脈瓣與流出道。'},
{id:'TEE_0',group:'TEE',angle:'0°',name:'食道中段四腔',english:'ME four-chamber (0°)',labels:['LA','RA','LV','RV'],text:'經食道超音波的探頭在左心房正後方，所以畫面最上方、最靠近探頭的是左心房。0° 時切出四個心腔：上方左右心房，下方左右心室，左心室在畫面右側。'},
{id:'TEE_45',group:'TEE',angle:'約 45°',name:'主動脈瓣短軸',english:'ME aortic valve SAX (~45°)',labels:['LA','RA','RV','Ao','PA'],text:'把影像平面轉到約 45°，正面切到主動脈瓣：三片瓣葉關閉時像 Y 字，周圍上方是左心房、左側右心房、下方右心室流出道、右側肺動脈。'},
{id:'TEE_90B',hideValves:['TV','MV','AV','PV'],group:'TEE',angle:'約 90°（右轉）',name:'雙腔靜脈',english:'ME bicaval (~90°)',labels:['LA','RA','SVC','IVC'],text:'平面轉到約 90° 並把探頭往右轉，看到右心房與上、下腔靜脈：畫面右側是上腔靜脈（頭側）、左側是下腔靜脈，上方是左心房，中間是心房中膈。'},
{id:'TEE_90',group:'TEE',angle:'約 90°',name:'食道中段兩腔',english:'ME two-chamber (~90°)',labels:['LA','LV'],text:'探頭不轉向、平面轉到約 90°，只切到左心房與左心室兩個心腔，可看到二尖瓣前後瓣葉，以及左心室前壁與下壁。'},
{id:'TEE_135',group:'TEE',angle:'約 135°',name:'食道中段長軸',english:'ME long axis (~135°)',labels:['LA','LV','Ao','RV'],text:'平面轉到約 120–135°，類似經胸的胸骨旁長軸：上方左心房，下方左心室，右側是左心室流出道、主動脈瓣與主動脈根部。'}];

function box(meshes){const mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];for(const m of meshes)for(let i=0;i<m.pos.length;i+=3)for(let k=0;k<3;k++){const v=m.pos[i+k];if(v<mn[k])mn[k]=v;if(v>mx[k])mx[k]=v;}return mid(mn,mx);}
function farthest(meshes,from){let best=-1,p=from;for(const m of meshes)for(let i=0;i<m.pos.length;i+=3){const q=[m.pos[i],m.pos[i+1],m.pos[i+2]],d=Math.hypot(...sub(q,from));if(d>best){best=d;p=q;}}return p;}

// meshes: [{key,group,pos,idx}] in rest (model) coordinates.
export function computeEchoFrames(meshes){
const by=(k,g)=>meshes.filter(m=>m.key===k&&(!g||m.group===g));
const rings=computeValveRings(meshes),MV=rings.MV.c,TV=rings.TV.c,AV=rings.AV.c,apex=farthest(by('LV','chambers'),MV);
const frame=(O,l,d)=>{l=norm(l);d=norm(sub(d,mul(l,dot(d,l))));return{O,l,d,n:cross(l,d)};};
const f={};
{const base=mid(MV,TV),d=norm(sub(base,apex)),n=norm(cross(sub(MV,apex),sub(TV,apex)));let l=cross(n,d);if(dot(l,sub(MV,TV))<0)l=mul(l,-1);f.A4C=frame(apex,l,d);
const toAV=norm(sub(AV,apex)),n5=norm(cross(toAV,f.A4C.l));let d5=norm(cross(f.A4C.l,n5));if(dot(d5,d)<0)d5=mul(d5,-1);f.A5C=frame(apex,f.A4C.l,d5);}
{const b=mid(MV,AV),u=norm(sub(b,apex)),n=norm(cross(sub(MV,apex),sub(AV,apex)));let d=cross(n,u);if(d[2]>0)d=mul(d,-1);f.PLAX=frame(mid(apex,b,.55),u,d);
let dd=sub([0,0,-1],mul(u,-u[2]));dd=norm(dd);const right=cross(dd,u);
{const PV=rings.PV.c;let n1=norm(cross(sub(TV,AV),sub(PV,AV))),n2=norm(cross(sub(PV,AV),sub(box(by('PAB')),AV)));if(dot(n1,rings.AV.n)<0)n1=mul(n1,-1);if(dot(n2,rings.AV.n)<0)n2=mul(n2,-1);
// Rotate about the AV–PV line between the tricuspid plane and the pulmonary-bifurcation plane so RA/TV, RVOT/PV and the PA trunk share one view.
const tw=.5;let ua=norm(add(mul(n1,1-tw),mul(n2,tw)));let da=sub([0,0,-1],mul(ua,-ua[2]));da=norm(da);f.PSAX_AV=frame(AV,cross(da,ua),da);}{const um=norm(sub(MV,apex));let dm=norm(sub([0,0,-1],mul(um,-um[2])));f.PSAX_MV=frame(add(MV,mul(um,-.44)),cross(dm,um),dm);f.PSAX_PM=frame(mid(MV,apex,.5),cross(dm,um),dm);}}
const walls=meshes.filter(m=>m.group==='wall'),cav=meshes.filter(m=>m.group==='chambers');
{const la=by('LA','chambers'),lac=box(la);let minz=Infinity;for(const m of la)for(let i=0;i<m.pos.length;i+=3)if(Math.abs(m.pos[i]-lac[0])<.25&&Math.abs(m.pos[i+1]-lac[1])<.25)minz=Math.min(minz,m.pos[i+2]);
const O=[lac[0],lac[1],minz-.12],tee=(target,deg)=>{const d=norm(sub(target,O)),ex=norm(sub([1,0,0],mul(d,d[0]))),es=norm(sub(sub([0,1,0],mul(d,d[1])),mul(ex,dot([0,1,0],ex)))),t=deg*Math.PI/180;return{...frame(O,add(mul(ex,Math.cos(t)),mul(es,Math.sin(t))),d),tee:true,angle:deg};};
const best=(target,lo,hi,score)=>{let bd=lo,bs=Infinity;for(let a=lo;a<=hi;a+=1){const s=score(tee(target,a));if(s<bs){bs=s;bd=a;}}return tee(target,bd);},off=(P,p)=>Math.abs(dot(sub(p,P.O),P.n));
const svc=meshes.filter(m=>m.key==='SVC'),ivc=meshes.filter(m=>m.key==='IVC'),ext=(ms,k,lowest)=>{let v=lowest?Infinity:-Infinity;for(const m of ms)for(let i=k;i<m.pos.length;i+=3)v=lowest?Math.min(v,m.pos[i]):Math.max(v,m.pos[i]);return v;};
const sv=box(svc);sv[1]=ext(svc,1,true)+.25;const iv=box(ivc);iv[1]=ext(ivc,1,false)-.25;
f.TEE_0=tee(mid(apex,mid(MV,TV),.35),0);f.TEE_45=best(AV,25,65,P=>-Math.abs(dot(P.n,rings.AV.n)));f.TEE_90B=best(box(by('RA','chambers')),60,130,P=>off(P,sv)+off(P,iv));f.TEE_90=tee(mid(apex,MV,.35),90);f.TEE_135=best(mid(MV,AV),105,150,P=>off(P,MV)+off(P,AV)+.5*off(P,apex));}
for(const [id,fr] of Object.entries(f)){if(fr.tee){const P=fr;let far=0;for(const m of cav)for(const s of sliceMesh(m,P))for(const [x,y] of [[s[0],s[1]],[s[2],s[3]]])if(y>0&&Math.abs(Math.atan2(x,y))<.8)far=Math.max(far,Math.hypot(x,y));fr.depth=Math.min(5,Math.max(2.4,far*1.08));fr.half=.78;continue;}
// Put the transducer just outside the near surface, then size depth and sector to the heart cross-section.
const P={...fr,O:fr.O};let near=Infinity;for(const m of walls)for(const s of sliceMesh(m,P))for(const [x,y] of [[s[0],s[1]],[s[2],s[3]]])if(Math.abs(x)<.35&&y<near)near=y;
if(!isFinite(near))near=0;const O=add(fr.O,mul(fr.d,near-(id.startsWith('PSAX')||id==='PLAX'?.55:.22)));P.O=O;
let far=0,half=0;for(const m of cav)for(const s of sliceMesh(m,P))for(const [x,y] of [[s[0],s[1]],[s[2],s[3]]]){far=Math.max(far,Math.hypot(x,y));half=Math.max(half,Math.abs(Math.atan2(x,Math.max(.05,y))));}
fr.O=O;fr.depth=Math.min(5.2,Math.max(2.4,far*1.12));fr.half=Math.min(.82,Math.max(.55,half+.06));}
return{frames:f,rings,landmarks:{MV,TV,AV,apex}};}

// Returns [lateral0,depth0,lateral1,depth1,...] segments where the plane crosses the triangles.
const spheres=new WeakMap();
function sphere(pos){let s=spheres.get(pos);if(s)return s;let mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];for(let i=0;i<pos.length;i+=3)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],pos[i+k]);mx[k]=Math.max(mx[k],pos[i+k]);}s={c:mid(mn,mx),r:Math.hypot(...sub(mx,mn))/2+.25};spheres.set(pos,s);return s;}
export function sliceMesh(m,P,out=[]){const {O,l,d,n}=P,pos=m.pos,idx=m.idx,e=m.matrix,count=pos.length/3;
{const sp=sphere(pos);let c=sp.c;if(e)c=[e[0]*c[0]+e[4]*c[1]+e[8]*c[2]+e[12],e[1]*c[0]+e[5]*c[1]+e[9]*c[2]+e[13],e[2]*c[0]+e[6]*c[1]+e[10]*c[2]+e[14]];if(Math.abs(dot(sub(c,O),n))>sp.r)return out;}
let w=m._w;if(!w||w.length!==pos.length)w=m._w=new Float32Array(pos.length);
for(let i=0;i<count;i++){let x=pos[i*3],y=pos[i*3+1],z=pos[i*3+2];if(e){const X=e[0]*x+e[4]*y+e[8]*z+e[12],Y=e[1]*x+e[5]*y+e[9]*z+e[13],Z=e[2]*x+e[6]*y+e[10]*z+e[14];x=X;y=Y;z=Z;}w[i*3]=x-O[0];w[i*3+1]=y-O[1];w[i*3+2]=z-O[2];}
let sd=m._sd;if(!sd||sd.length!==count)sd=m._sd=new Float32Array(count);for(let i=0;i<count;i++)sd[i]=w[i*3]*n[0]+w[i*3+1]*n[1]+w[i*3+2]*n[2];
const res=[];const pt=(a,b)=>{if(a>b){const q=a;a=b;b=q;}const t=sd[a]/(sd[a]-sd[b]),x=w[a*3]+(w[b*3]-w[a*3])*t,y=w[a*3+1]+(w[b*3+1]-w[a*3+1])*t,z=w[a*3+2]+(w[b*3+2]-w[a*3+2])*t;res.push(x*l[0]+y*l[1]+z*l[2],x*d[0]+y*d[1]+z*d[2]);};
for(let t=0;t<idx.length;t+=3){const a=idx[t],b=idx[t+1],c=idx[t+2],sa=sd[a]>0,sb=sd[b]>0,sc=sd[c]>0;if(sa===sb&&sb===sc)continue;res.length=0;if(sa!==sb)pt(a,b);if(sb!==sc)pt(b,c);if(sc!==sa)pt(c,a);if(res.length===4)out.push(res.slice());}
return out;}

// Correlated speckle: elongated laterally like a real beam, log-compressed for granular contrast.
function noiseField(W,H,seed,sx,sy,gain){let s=seed;const r=()=>(s=(s*16807)%2147483647)/2147483647;const a=new Float32Array(W*H);for(let i=0;i<a.length;i++){const u=r()||1e-6,v=r();a[i]=Math.sqrt(-2*Math.log(u))*Math.cos(6.2831853*v);}
const blur=(src,dx,dy,rad)=>{const out=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let t=0,c=0;for(let k=-rad;k<=rad;k++){const xx=x+k*dx,yy=y+k*dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;const w=Math.exp(-(k*k)/(2*(rad/2+.01)**2));t+=src[yy*W+xx]*w;c+=w;}out[y*W+x]=t/c;}return out;};
let b=blur(blur(a,1,0,sx),0,1,sy);let m=0,v2=0;for(const v of b){m+=v;v2+=v*v;}m/=b.length;const sd=Math.sqrt(v2/b.length-m*m)||1;let mean=0;for(let i=0;i<b.length;i++){b[i]=Math.exp(gain*(b[i]-m)/sd);mean+=b[i];}mean/=b.length;for(let i=0;i<b.length;i++)b[i]/=mean;return b;}

// sources: [{kind:'wall'|'cavity'|'vessel'|'solid'|'valve'|'leaflet', label, pos, idx, matrix}]
// rings: [{c,n,r}] valve annuli in model coordinates (n points downstream); their orifices are opened to blood.
export function createEchoRenderer(canvas,{W=320,H=280,makeCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;}}={}){
const off=makeCanvas(W,H),octx=off.getContext('2d'),img=octx.createImageData(W,H),N=W*H,top=8;
const cls=new Uint8Array(N),lab=new Uint8Array(N),bars=new Uint8Array(N),seen=new Uint8Array(N),q=new Int32Array(N),spec=new Float32Array(N),A=new Float32Array(N),B=new Float32Array(N),edge=new Float32Array(N);
const fine=noiseField(W,H,7,3,1,.55),coarse=noiseField(W,H,11,9,5,.45),flow=noiseField(W,H,23,2,1,.5),gamma=new Float32Array(1025).map((_,i)=>Math.pow(i/1024,.92)*255),fanW=new Float32Array(N),depthF=new Float32Array(N),rows=Array.from({length:H},()=>[]),cols=Array.from({length:W},()=>[]);
let frame=0,fanKey='',S=1;const X=v=>W/2+v*S,Y=v=>top+v*S;
function scanFill(segs,bit,labelId,maxSpan=Infinity,vertical=false){const L=vertical?cols:rows,len=vertical?W:H;for(const r of L)r.length=0;
for(const s of segs){let a0=vertical?X(s[0]):Y(s[1]),b0=vertical?Y(s[1]):X(s[0]),a1=vertical?X(s[2]):Y(s[3]),b1=vertical?Y(s[3]):X(s[2]);if(a0===a1)continue;const lo=Math.min(a0,a1),hi=Math.max(a0,a1);for(let r=Math.max(0,Math.ceil(lo-.5));r<=Math.min(len-1,Math.floor(hi-.5));r++){const c=r+.5;if(c<lo||c>=hi)continue;L[r].push(b0+(b1-b0)*(c-a0)/(a1-a0));}}
for(let r=0;r<len;r++){const xs=L[r];if(xs.length<2||(maxSpan<Infinity&&xs.length%2))continue;xs.sort((a,b)=>a-b);for(let k=0;k+1<xs.length;k+=2){if(xs[k+1]-xs[k]>maxSpan)continue;const lim=vertical?H:W;for(let t=Math.max(0,Math.ceil(xs[k]-.5));t<=Math.min(lim-1,Math.floor(xs[k+1]-.5));t++){const i=vertical?t*W+r:r*W+t;cls[i]|=bit;if(labelId)lab[i]=labelId;}}}}
function stroke(s,fn){const x0=X(s[0]),y0=Y(s[1]),x1=X(s[2]),y1=Y(s[3]),n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0))*2)+1;for(let i=0;i<=n;i++){const x=Math.round(x0+(x1-x0)*i/n),y=Math.round(y0+(y1-y0)*i/n);if(x>=0&&y>=0&&x<W&&y<H)fn(y*W+x,x,y);}}
const dot2=(i,v,r)=>{const x=i%W,y=(i/W)|0;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;const f=dx*dx+dy*dy<=r*r?1:.55;const j=yy*W+xx;if(spec[j]<v*f)spec[j]=v*f;}};
function loops(segs){const key=(x,y)=>x.toFixed(5)+','+y.toFixed(5),adj=new Map(),used=new Uint8Array(segs.length);segs.forEach((s,i)=>{for(const k of [key(s[0],s[1]),key(s[2],s[3])]){(adj.get(k)||adj.set(k,[]).get(k)).push(i);}});
const chains=[];for(let i=0;i<segs.length;i++){if(used[i])continue;used[i]=1;const pts=[[segs[i][0],segs[i][1]],[segs[i][2],segs[i][3]]];for(const dir of [1,0]){for(;;){const end=dir?pts[pts.length-1]:pts[0],nx=(adj.get(key(end[0],end[1]))||[]).find(j=>!used[j]);if(nx===undefined)break;used[nx]=1;const s2=segs[nx],a=[s2[0],s2[1]],b=[s2[2],s2[3]],other=key(a[0],a[1])===key(end[0],end[1])?b:a;dir?pts.push(other):pts.unshift(other);}}chains.push(pts);}
const closed=c=>c.length>2&&key(...c[0])===key(...c[c.length-1]),open=chains.filter(c=>!closed(c)),out=chains.filter(closed);
while(open.length){let a=open.pop();for(;;){const e=a[a.length-1];let best=Math.hypot(e[0]-a[0][0],e[1]-a[0][1]),bi=-1,rev=false;open.forEach((c,j)=>{const d0=Math.hypot(e[0]-c[0][0],e[1]-c[0][1]),d1=Math.hypot(e[0]-c[c.length-1][0],e[1]-c[c.length-1][1]);if(d0<best){best=d0;bi=j;rev=false;}if(d1<best){best=d1;bi=j;rev=true;}});if(bi<0)break;const c=open.splice(bi,1)[0];a=a.concat(rev?c.reverse():c);}out.push(a);}
const res=[];for(const c of out)for(let i=0;i<c.length;i++){const p=c[i],q=c[(i+1)%c.length];res.push([p[0],p[1],q[0],q[1]]);}return res;}
function fillPoly(pts,bit){const segs=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];segs.push([a[0],a[1],b[0],b[1]]);}scanFill(segs,bit,0);}
function carve(ring,P){const {O,l,d,n}=P,nn=ring.n,cosA=Math.abs(dot(n,nn));if(cosA>.8)return;
let e1=norm(cross(nn,Math.abs(nn[1])<.9?[0,1,0]:[1,0,0])),e2=cross(nn,e1);const a=dot(sub(ring.c,O),n),b=ring.r*dot(e1,n),c=ring.r*dot(e2,n),h=Math.hypot(b,c);if(h<1e-6||Math.abs(a)>h*.97)return;
const phi=Math.atan2(c,b),dth=Math.acos(-a/h),pts=[phi+dth,phi-dth].map(t=>{const p=add(ring.c,add(mul(e1,ring.r*Math.cos(t)),mul(e2,ring.r*Math.sin(t)))),r=sub(p,O);return[dot(r,l),dot(r,d)];});
let f=[dot(nn,l),dot(nn,d)];const fl=Math.hypot(f[0],f[1])||1;f=[f[0]/fl,f[1]/fl];const m=[(pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2],ins=p=>[p[0]+(m[0]-p[0])*.08,p[1]+(m[1]-p[1])*.08],p0=ins(pts[0]),p1=ins(pts[1]),t=.16;
fillPoly([[p0[0]-f[0]*t,p0[1]-f[1]*t],[p1[0]-f[0]*t,p1[1]-f[1]*t],[p1[0]+f[0]*t,p1[1]+f[1]*t],[p0[0]+f[0]*t,p0[1]+f[1]*t]],16);}
function enFace(ring,P){const cosA=Math.abs(dot(P.n,ring.n)),dist=dot(sub(ring.c,P.O),P.n);return cosA>.8&&Math.abs(dist)<.5;}
function lumenCentre(label,cx,cy,R){const segs=vesselSegs[label];if(!segs||!segs.length)return null;let best=null,bd=Infinity;const ss=loops(segs),polys=[];let cur=[],pe=null;for(const g of ss){if(pe&&(Math.abs(g[0]-pe[0])>1e-9||Math.abs(g[1]-pe[1])>1e-9)){polys.push(cur);cur=[];}cur.push([g[0],g[1]]);pe=[g[2],g[3]];}if(cur.length)polys.push(cur);for(const poly of polys){if(poly.length<4)continue;let a=0,x=0,y=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],c=p[0]*q[1]-q[0]*p[1];a+=c;x+=(p[0]+q[0])*c;y+=(p[1]+q[1])*c;}if(Math.abs(a)<1e-9)continue;const area=Math.abs(a)/2,mx=x/(3*a),my=y/(3*a),dd=Math.hypot(mx-cx,my-cy),rr=Math.sqrt(area/Math.PI);if(dd<R*2.5&&rr>R*.5&&rr<R*1.8&&dd<bd){bd=dd;best=[mx,my,rr];}}return best;}
function drawEnFace(ring,P,open){const r0=sub(ring.c,P.O);let cx=dot(r0,P.l),cy=dot(r0,P.d),R=ring.r;if(ring.key==='AV'||ring.key==='PV'){const c=lumenCentre(ring.key==='AV'?'Ao':'PA',cx,cy,R);if(c){cx=c[0];cy=c[1];R=Math.min(R,c[2]);}}const pl=v=>{const a=dot(v,P.l),b=dot(v,P.d),h=Math.hypot(a,b)||1;return[a/h,b/h];},seg=(a,b)=>stroke([a[0],a[1],b[0],b[1]],i=>dot2(i,1,1));
if(ring.key==='AV'||ring.key==='PV'){const lid=labelNames.indexOf(ring.key==='AV'?'Ao':'PA')+1||(labelNames.push(ring.key==='AV'?'Ao':'PA'),labelNames.length);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const px=(x-W/2)/S-cx,py=(y-top)/S-cy;if(px*px+py*py<R*R*.96){cls[y*W+x]|=16;lab[y*W+x]=lid;}}const inner=.72*R*Math.min(1,open*1.2),pt=(t,rr)=>[cx+Math.cos(t)*rr,cy+Math.sin(t)*rr];for(let k=0;k<3;k++){const t0=Math.PI/2+k*2*Math.PI/3,t1=t0+Math.PI/3,t2=t0+2*Math.PI/3,a=pt(t0,R*.96),m=pt(t1,inner),b=pt(t2,R*.96);seg(a,m);seg(m,b);}return;}
const ax=pl(ring.split||[1,0,0]),cm=[-ax[1],ax[0]],w=.82*R,b=.5*R*Math.min(1,open*1.1);let prev=null,prev2=null;
for(let i=0;i<=24;i++){const t=-1+2*i/24,sx=t*w,sq=Math.sqrt(Math.max(0,1-t*t)),bow=.1*R*(1-t*t),p1=[cx+cm[0]*sx+ax[0]*(b*sq+bow),cy+cm[1]*sx+ax[1]*(b*sq+bow)],p2=[cx+cm[0]*sx-ax[0]*(b*sq-bow),cy+cm[1]*sx-ax[1]*(b*sq-bow)];if(prev){seg(prev,p1);seg(prev2,p2);}prev=p1;prev2=p2;}}
const labelNames=[];let vesselSegs={};
function render(sources,P,{labels=true,rings=[],open={}}={}){
frame++;S=Math.min((H-14)/P.depth,(W/2-6)/(P.depth*Math.sin(P.half)));cls.fill(0);lab.fill(0);bars.fill(0);spec.fill(0);labelNames.length=0;vesselSegs={};
const hidden=new Set(P.hideValves||[]),faced=new Set(rings.filter(r=>r.key&&r.key!=='TV'&&!hidden.has(r.key)&&enFace(r,P)).map(r=>r.key));
for(const src of sources){if(src.valve&&(faced.has(src.valve)||hidden.has(src.valve)))continue;const segs=sliceMesh(src,P);if(!segs.length)continue;
if(src.kind==='leaflet'||src.kind==='valve'){const v=src.kind==='leaflet'?1:.8;for(const s of segs)stroke(s,i=>dot2(i,v,1));continue;}
let id=0;if(src.label){id=labelNames.indexOf(src.label)+1;if(!id){labelNames.push(src.label);id=labelNames.length;}}
if(src.kind==='wall'){for(const s of segs)stroke(s,i=>{bars[i]=1;});continue;}
if(src.kind==='vessel'){if(src.label)(vesselSegs[src.label]||(vesselSegs[src.label]=[])).push(...segs);for(const s of segs)stroke(s,i=>{bars[i]=1;if(spec[i]<.5)spec[i]=.5;});scanFill(loops(segs),4,id);continue;}
scanFill(segs,src.kind==='cavity'?2:8,src.kind==='cavity'?id:0);}
for(const r of rings)carve(r,P);for(const r of rings)if(faced.has(r.key))drawEnFace(r,P,open[r.key]??.5);
// Wall meshes are open, so myocardium is what an outside flood cannot reach.
{let qh=0,qt=0;seen.fill(0);const push=i=>{if(seen[i]||bars[i]||(cls[i]&30))return;seen[i]=1;q[qt++]=i;};for(let x=0;x<W;x++){push(x);push((H-1)*W+x);}for(let y=0;y<H;y++){push(y*W);push(y*W+W-1);}
while(qh<qt){const i=q[qh++],x=i%W;if(x>0)push(i-1);if(x<W-1)push(i+1);if(i>=W)push(i-W);if(i<N-W)push(i+W);}}
// 0 outside the heart, 1 myocardium, 2 blood, 3 papillary/solid
for(let i=0;i<N;i++){const c=cls[i];let k=c&8?3:c&22?2:seen[i]?0:1;cls[i]=k;}
for(let i=0;i<N;i++){const k=cls[i];A[i]=k===2?.03:k===1?.36:k===3?.42:.17;edge[i]=0;}
// Pericardium/epicardium is the brightest interface; endocardium is moderate.
for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x,k=cls[i];if(k===2)continue;let epi=0,endo=0;for(const j of [i-1,i+1,i-W,i+W,i-W-1,i-W+1,i+W-1,i+W+1]){const o=cls[j];if(k!==0&&o===0)epi=1;else if(k===0&&o===1)epi=Math.max(epi,.75);if(k!==2&&o===2)endo=1;}edge[i]=Math.max(epi*.62,endo*.22);}
for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;if(cls[i]===2)continue;const e=Math.max(edge[i-1],edge[i+1],edge[i-W],edge[i+W])*.7;if(e>edge[i])B[i]=e;else B[i]=edge[i];}
const fk=P.depth+':'+P.half;if(fk!==fanKey){fanKey=fk;const tanH=Math.tan(P.half),R=P.depth*S;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,dx=x-W/2,dy=y-top,r=Math.hypot(dx,dy);let w=0;if(dy>0&&Math.abs(dx)<=dy*tanH+.5&&r<=R)w=Math.max(0,Math.min(1,(dy*tanH-Math.abs(dx))/5+.15,(R-r)/6+.1));fanW[i]=w;depthF[i]=r/S;}}
const shift=(frame>>1)%7;
for(let i=0;i<N;i++){const k=cls[i],dep=depthF[i];let v;
if(k===2){v=.012+.035*flow[(i+shift*(W+1))%N]*fine[i]*(dep<1.1?1.6:1);}
else{const tex=Math.min(2.2,fine[i])*(.6+.4*coarse[i]);v=A[i]*Math.min(tex,1.7)*(k===0?(.45+.55*Math.min(coarse[i],1.6)):1)+B[i]*(.7+.45*fine[i]);}
v+=spec[i]*(.75+.3*fine[i]);v+=.42*Math.exp(-dep/.22)*fine[i]+.08*Math.exp(-dep/.9)*coarse[i];
A[i]=v;}
// Point-spread blur: wider laterally and with depth.
for(let y=0;y<H;y++){const rad=1+((2.2*y/H)|0);for(let x=0;x<W;x++){let t=0,c=0;for(let k=-rad;k<=rad;k++){const xx=x+k;if(xx<0||xx>=W)continue;const w=k===0?2:1;t+=A[y*W+xx]*w;c+=w;}B[y*W+x]=t/c;}}
const data=img.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,w=fanW[i];let out=0;if(w>0){const v=(y>0&&y<H-1?(B[i]*2+B[i-W]+B[i+W])/4:B[i])*1.05;out=gamma[v>=1?1024:v<=0?0:(v*1024)|0]*w;}const j=i*4;data[j]=out;data[j+1]=out;data[j+2]=out;data[j+3]=255;}
octx.putImageData(img,0,0);
const ctx=canvas.getContext('2d'),cw=canvas.width,ch=canvas.height;ctx.fillStyle='#000';ctx.fillRect(0,0,cw,ch);const k=Math.min(cw/W,ch/H),ox=(cw-W*k)/2,oy=(ch-H*k)/2;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(off,ox,oy,W*k,H*k);
// Depth scale: 1 model unit is roughly 4 cm in this atlas.
ctx.fillStyle='rgba(220,230,240,.8)';ctx.font=`${Math.max(10,Math.round(7*k))}px sans-serif`;ctx.textAlign='right';for(let cm=1;cm<=P.depth*4;cm++){const yy=oy+(top+cm/4*S)*k;ctx.fillRect(ox+W*k-(cm%5?7:12),yy,cm%5?5:10,1.5);if(cm%5===0)ctx.fillText(cm+'',ox+W*k-15,yy+4);}
const placed=[];
if(labels){ctx.textAlign='center';ctx.font=`600 ${Math.max(11,Math.round(8*k))}px sans-serif`;const sums=labelNames.map(()=>[0,0,0]);const tanH=Math.tan(P.half),R=P.depth*S;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const id=lab[y*W+x];if(!id||fanW[y*W+x]<.5)continue;const s=sums[id-1];s[0]+=x;s[1]+=y;s[2]++;}
const fan=R*R*P.half;labelNames.forEach((name,j)=>{const s=sums[j];if(!s||s[2]<fan*.006||!P.labels?.includes(name)||placed.some(p=>p.name===name))return;placed.push({name,x:ox+s[0]/s[2]*k,y:oy+s[1]/s[2]*k});});
for(const p of placed){ctx.lineWidth=3;ctx.strokeStyle='rgba(0,0,0,.7)';ctx.strokeText(p.name,p.x,p.y);ctx.fillStyle='#f4f4f4';ctx.fillText(p.name,p.x,p.y);}}
return{placed,scale:k,offset:[ox,oy],S};}
return{render,size:[W,H]};}
