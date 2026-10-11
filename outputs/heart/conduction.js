import * as T from 'three';
const V=a=>new T.Vector3(...a),SA=[-.98,.67,.18],AV=[-.52,-.28,-.20],HIS=[-.12,-.55,.19],SPLIT=[.12,-.72,.30],RAPEX=[-.07,-1.38,.64],LAPEX=[.44,-1.43,.04];
const routes=[
['ATRIAL',[SA,[-1.04,.17,.49],[-.79,-.13,.36],[-.71,-.14,.07],[-.71,-.25,.01],AV],.07,.14],
['ATRIAL',[SA,[-1.28,.25,-.11],[-1.34,-.02,-.23],[-.73,-.22,-.58],[-.57,-.28,-.20],AV],.07,.14],
['ATRIAL',[SA,[-.73,.62,.09],[-.61,.61,-.20],[-.26,.43,-.49],[-.01,.43,-.46],[.22,.43,-.66],[.36,.08,-.68]],.07,.14],
['HIS',[AV,[-.34,-.40,.00],HIS,SPLIT],.225,.065],
['RBB',[SPLIT,[-.10,-.87,.46],[-.13,-1.12,.62],RAPEX],.245,.075],
['LBB',[SPLIT,[.27,-.87,.17],[.35,-1.10,.10],LAPEX],.245,.075],
['LBB',[[.27,-.87,.17],[.64,-.88,.30],[.95,-1.07,.29]],.245,.075],
['LBB',[[.27,-.87,.17],[.26,-.98,-.26],[.47,-1.19,-.54]],.245,.075],
['PK',[RAPEX,[-.52,-1.23,.69],[-.88,-.89,.65],[-.89,-.54,.50]],.275,.10],
['PK',[RAPEX,[.20,-1.27,.90],[.50,-.98,1.01],[.52,-.59,.96]],.275,.10],
['PK',[RAPEX,[-.17,-1.41,.32],[-.52,-1.15,.18],[-.71,-.70,.10]],.275,.10],
['PK',[LAPEX,[.91,-1.23,.23],[1.14,-.83,.20],[.98,-.47,.11]],.275,.10],
['PK',[LAPEX,[.62,-1.30,-.42],[.77,-.96,-.65],[.58,-.51,-.58]],.275,.10],
['PK',[LAPEX,[.05,-1.18,-.22],[-.20,-.91,-.12],[-.17,-.62,-.16]],.275,.10]
];
const names={SA:['Sinoatrial node','Sinoatrial node'],AVN:['Atrioventricular node','AV node'],ATRIAL:['Intra-atrial conduction','Atrial conduction'],HIS:['Bundle of His','His bundle'],LBB:['Left bundle branch','Left bundle branch'],RBB:['Right bundle branch','Right bundle branch'],PK:['Purkinje fibres','Purkinje network']};
export function createConduction({group,byKey,deformPoint}){
const meshes=[],records=[],material=()=>new T.MeshStandardMaterial({color:0xffc61a,emissive:0xff9a00,emissiveIntensity:.4,roughness:.75});
function add(key,geometry,start,width){const mesh=new T.Mesh(geometry,material());mesh.userData={key,group:'conduction',label:names[key][0],english:names[key][1],deformsWithHeart:true};group.add(mesh);meshes.push(mesh);(byKey[key]||=[]).push(mesh);geometry.computeBoundingSphere();geometry.computeBoundingBox();records.push({mesh,start,width,restCenter:geometry.boundingSphere.center.clone(),restRadius:geometry.boundingSphere.radius,restBox:geometry.boundingBox.clone(),original:geometry.attributes.position.array.slice()});return mesh;}
add('SA',new T.SphereGeometry(.062,16,10).translate(...SA),.045,.065);add('AVN',new T.SphereGeometry(.054,16,10).translate(...AV),.16,.11);
const impulses=[];for(const[key,points,start,width]of routes){const curve=new T.CatmullRomCurve3(points.map(V));add(key,new T.TubeGeometry(curve,34,key==='PK'?.013:.019,6,false),start,width);const impulse=new T.Mesh(new T.SphereGeometry(.032,10,7),new T.MeshBasicMaterial({color:0xfff2a0}));impulse.userData.kind='conduction-impulse';group.add(impulse);impulses.push({impulse,curve,start,width});}
const point=new T.Vector3();return{meshes,update(beat,selected){if(!group.visible)return;const p=beat.phase;for(const r of records){const t=(p-r.start)/r.width,active=t>=0&&t<=1,pulse=active?Math.sin(t*Math.PI):0;const pos=r.mesh.geometry.attributes.position;for(let i=0;i<pos.count;i++){point.fromArray(r.original,i*3);deformPoint?.(point);pos.setXYZ(i,point.x,point.y,point.z);}pos.needsUpdate=true;r.mesh.geometry.boundingSphere.center.copy(r.restCenter);deformPoint?.(r.mesh.geometry.boundingSphere.center);r.mesh.geometry.boundingSphere.radius=r.restRadius*1.1;const box=r.mesh.geometry.boundingBox;box.makeEmpty();for(let k=0;k<8;k++){point.set(k&1?r.restBox.max.x:r.restBox.min.x,k&2?r.restBox.max.y:r.restBox.min.y,k&4?r.restBox.max.z:r.restBox.min.z);deformPoint?.(point);box.expandByPoint(point);}box.expandByScalar(.01);r.mesh.material.emissiveIntensity=selected===r.mesh.userData.key?1.8:.4+.9*pulse;}for(const i of impulses){const t=(p-i.start)/i.width;i.impulse.visible=t>=0&&t<=1;if(i.impulse.visible){i.impulse.position.copy(i.curve.getPointAt(t));deformPoint?.(i.impulse.position);}}const status=document.getElementById('ha-conductionStatus');if(status)status.textContent=p<.07?'SA node fires':p<.16?'Impulse spreads across the atria':p<.225?'AV node delay':p<.245?'Conduction in the bundle of His':p<.275?'Conduction in the bundle branches':p<.38?'Purkinje fibres carry the impulse into the ventricles':'Ventricles repolarise, ready for the next beat';}};
}
