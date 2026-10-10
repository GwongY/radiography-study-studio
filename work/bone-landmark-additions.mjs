/* Reviewed lecture diagrams, 2026-10-04.
 * Each target is in the shipped skeleton's native body coordinates (metres).
 * The builder pins it to a reviewed vertex; no bounding-box inference at runtime.
 * Diagram labels are transcriptions from the cited page, not PDF-text quotes.
 * The retained teaching list was shortened on request: highlighted/identified
 * features, not every background label on a borrowed diagram (femur 10, humerus 12).
 */
const diagram=(name,target,ref,page,label=name)=>[name,target,ref,page,{diagram:label}];
const upper=(name,target,page=6,label=name)=>diagram(name,target,'hss.ul.2026',page,label);
const lower=(name,target,page=7,label=name)=>diagram(name,target,'hss.ll.2026',page,label);
const head=(name,target,page=6,label=name)=>diagram(name,target,'hss.hnt.2026',page,label);
const quote=(name,target,ref,page,text=name)=>[name,target,ref,page,text];
const joint=(at,...against)=>({at,against,within:.004});

// Start with these core features, then fill Main with up to five distinct names.
// Parts also offers every feature separately and the optional Show all parts.
export const PRIMARY_BONE_LANDMARKS = {
  femur:['Head','Neck','Greater trochanter','Lesser trochanter','Patellar surface'],
  scapula:['Acromion','Coracoid process','Glenoid cavity','Subscapular fossa','Supraspinous fossa'],
  humerus:['Head','Surgical neck','Greater tubercle','Deltoid tuberosity','Olecranon fossa'],
  'hip bone':['Iliac crest','Ilium','Acetabulum','Ischial tuberosity','Obturator foramen'],
};

export const ADDITIONAL_BONE_LANDMARKS = [
  ['scapula','Scapulal',[
    upper('Subscapular fossa',{at:[.103,1.341,-.080],facing:[0,0,1]},4),
    quote('Supraspinous fossa',{at:[.102,1.400,-.083],facing:[0,1,-1]},'hss.ul.2026',19),
    quote('Infraspinous fossa',{at:[.104,1.324,-.103],facing:[0,0,-1]},'hss.ul.2026',19),
  ]],
  ['clavicle','Claviclel',[
    upper('Sternal end',[.012,1.409,.042],4),
    upper('Acromial end',[.145,1.405,-.043],4),
  ]],
  ['humerus','Humerusl',[
    upper('Anatomical neck',[.175,1.384,-.012]),
    upper('Greater tubercle',[.196,1.390,-.031]),
    upper('Lesser tubercle',[.180,1.379,-.008]),
    upper('Deltoid tuberosity',[.205,1.261,-.012]),
    upper('Olecranon fossa',[.231,1.117,-.040]),
    upper('Capitulum',[.237,1.100,-.013]),
    upper('Trochlea',[.223,1.093,-.014]),
  ]],
  ['ulna','Ulnal',[
    upper('Olecranon',[.215,1.109,-.042],8),
  ]],
  ['femur','Femurl',[
    lower('Shaft',[.106,.669,-.018]),
    lower('Patellar surface',[.087,.449,.008]),
    lower('Medial epicondyle',[.054,.466,-.018]),
    lower('Lateral epicondyle',[.115,.466,-.022]),
  ]],
  ['hip bone','Hip_bonel',[
    lower('Ischial spine',[.046,.879,-.066],6),
    lower('Ischial tuberosity',[.060,.810,-.041],6),
    lower('Obturator foramen',[.045,.838,.006],6),
  ]],
  ['manubrium of sternum','Manubrium_of_sternum',[
    upper('Jugular notch',[0,1.399,.040],4),
    upper('Clavicular notch',[.023,1.393,.044],4),
    upper('Manubriosternal joint',[0,1.352,.080],4),
  ]],
  ['body of sternum','Body_of_sternum',[
    upper('Costal notches',[.023,1.311,.096],4),
    upper('Xiphisternal joint',[0,1.241,.109],4),
  ]],
  ['xiphoid process','Xiphoid_process',[
    upper('Xiphisternal joint',[0,1.242,.107],4),
  ]],
  ['frontal bone','Frontal_bone',[
    head('Supraorbital notch',[.027,1.624,.082],8),
    head('Coronal suture',joint([.042,1.678,.033],'Parietal_bonel'),6),
    head('Bregma',joint([0,1.697,.032],'Parietal_bonel','Parietal_boner'),6),
  ]],
  ['parietal bone','Parietal_bonel',[
    head('Coronal suture',joint([.043,1.678,.028],'Frontal_bone'),6),
    head('Sagittal suture',joint([.002,1.700,-.030],'Parietal_boner'),6),
    head('Lambdoid suture',joint([.036,1.642,-.093],'Occipital_bone'),6),
    head('Squamous suture',joint([.070,1.617,-.010],'Temporal_bonel')),
    head('Bregma',joint([.002,1.698,.030],'Frontal_bone','Parietal_boner'),6),
    head('Lambda',joint([.002,1.653,-.100],'Occipital_bone','Parietal_boner'),6),
    head('Pterion',{at:[.0512,1.6196,.0323],against:['Frontal_bone','Sphenoid_bone','Temporal_bonel'],within:.006},6),
    head('Asterion',joint([.048,1.604,-.075],'Occipital_bone','Temporal_bonel'),6),
    head('Parietomastoid suture',joint([.0607,1.5928,-.0443],'Temporal_bonel'),6),
  ]],
  ['occipital bone','Occipital_bone',[
    head('Occipital condyle',[.019,1.554,-.011],19),
    head('Lambdoid suture',joint([.035,1.640,-.092],'Parietal_bonel'),6),
    head('Lambda',joint([0,1.653,-.100],'Parietal_bonel','Parietal_boner'),6),
  ]],
  ['temporal bone','Temporal_bonel',[
    quote('Mastoid process',[.048,1.555,-.036],'hss.msk.2026',10,'Mastoid process of the temporal bones'),
    head('Styloid process',[.041,1.548,-.006],4),
    quote('Internal acoustic meatus',[.021,1.579,-.020],'hss.msk.2026',11),
    quote('Mandibular fossa',[.048,1.567,.010],'hss.hnt.2026',11,'Mandibular fossa'),
    head('Squamous suture',joint([.068,1.618,-.008],'Parietal_bonel')),
    head('Occipitotemporal suture',joint([.043,1.586,-.055],'Occipital_bone'),6),
  ]],
  ['sphenoid bone','Sphenoid_bone',[
    head('Optic canal',[.012,1.605,.032],8),
    head('Superior orbital fissure',[.026,1.599,.038],8),
  ]],
  ['maxilla','Maxillal',[
    head('Infraorbital foramen',[.029,1.574,.076],8),
  ]],
  ['mandible','Mandible',[
    quote('Ramus',[.043,1.536,.019],'hss.msk.2026',10,'Ramus of the mandible'),
    quote('Mandibular condyle',[.047,1.575,.011],'hss.hnt.2026',11,'Condyle of mandible'),
  ]],
  ['axis (c2)','Axis_(C2)',[
    head('Odontoid process',[0,1.548,-.009],19,'Odontoid process'),
  ]],
];
