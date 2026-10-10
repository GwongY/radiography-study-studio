/* Anatomical name matching shared by search and its regression gate. */
const PLURALS = {bones:'bone',muscles:'muscle',ligaments:'ligament',arteries:'artery',veins:'vein',nerves:'nerve',lobes:'lobe',lungs:'lung',vertebrae:'vertebra',phalanges:'phalanx',ribs:'rib',digits:'digit',fingers:'finger',toes:'toe'};
const ORDINALS = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'];
export function normaliseSearch(value) {
  return String(value||'').toLowerCase().replace(/([1-9]|1[0-2])(?:st|nd|rd|th)\b/g,(_,n)=>ORDINALS[Number(n)-1])
    .replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).map(w=>PLURALS[w]||w).join(' ');
}
export function matchesSearch(name, query) {
  const words=normaliseSearch(name).split(' ');
  const wanted=normaliseSearch(query).split(' ').filter(w=>w&&!['of','the'].includes(w));
  return wanted.length>0&&wanted.every((w,i)=>words.some(n=>n===w||(i===wanted.length-1&&w.length>=4&&n.startsWith(w))));
}
export function exactSearch(name, query) {
  const n=normaliseSearch(name),q=normaliseSearch(query);
  return n===q || n===q+' bone' || n===q+' muscle';
}
export function namedSide(name) {
  const words=normaliseSearch(name).split(' '),left=words.includes('left'),right=words.includes('right');
  return left!==right?(left?'left':'right'):null;
}
// Two catalogue names differ from the shipped, simplified GLB nodes.
export function modelSearchNames(name) {
  const n=normaliseSearch(name);
  if(n==='coccygeus muscle t')return ['Coccygeus muscle'];
  if(n==='pubic symphysis')return ['Interpubic disc','Superior pubic ligament','Inferior pubic ligament'];
  return [name];
}

// GLTFLoader adds a numerical suffix when a mesh shares its parent's name.
// Resolve that actual parent; keep genuine anatomical numbers intact.
export function modelMeshName(mesh) {
  const raw=mesh.name||mesh.parent?.name||'Unnamed structure',parent=mesh.parent?.name;
  return parent&&raw.startsWith(parent+'_')&&/^\d+$/.test(raw.slice(parent.length+1))?parent:raw;
}

// Viewer labels are concise; canonical names and side-aware matching stay intact.
export function viewerStructureName(value) {
  const name=String(value||'').replace(/_/g,' ').replace(/(\b(?:bone|muscle))\s+\d+$/i,'$1')
    .replace(/\b(?:left|right)\b/gi,' ')
    .replace(/\b(?:bones?|muscles?)\s*$/i,'').replace(/\s+/g,' ').trim();
  return name ? name[0].toUpperCase()+name.slice(1) : String(value||'').trim();
}
