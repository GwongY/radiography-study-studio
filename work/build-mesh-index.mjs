/*
 * Build outputs/mesh-index.js — the searchable name index for every mesh in
 * every GLB layer, and the STUDY UNITS the viewer lets you select.
 *
 * WHY THIS EXISTS
 *
 * Search used to cover only the curated lists: ANATOMY_DATABASE (20 bone
 * records), SEARCH_EXTRAS (~30 hand-written entries) and BODY_CONCEPTS. The
 * model itself carries ~2,900 named meshes, so the overwhelming majority of
 * what the viewer can actually show could not be found by typing its name.
 * "Pharynx" returned nothing while `Pharynx.j`, `Nasopharynx`, `Oropharynx`
 * and `Laryngopharynx` all sat in the organs layer.
 *
 * The layers are lazy-loaded (~39 MB total), so the index cannot be built in
 * the browser — reading it would mean downloading every layer up front. It is
 * generated here instead and shipped as a small data module.
 *
 * WHAT IT COLLAPSES
 *
 * One entry per structure, not per mesh:
 *   Kidney.l / Kidney.r                  -> "Kidney", sides both
 *   Parotid gland / .l / .r / .001       -> "Parotid gland"
 * See work/lib/mesh-names.mjs for that pass.
 *
 * STUDY DEPTH — WHICH NAMES YOU ARE ASKED TO KNOW
 *
 * 1,686 structures is not a vocabulary list; it is an atlas. Tier 0 is what
 * the course names, and therefore what to memorise. Tier 1 is everything
 * finer.
 *
 * The tier used to be decided by a hand-written regex of "detail" words
 * (\bsegmental\b, \bbranch of\b, …). That was this repo guessing at the
 * syllabus — the exact thing the source-traceability rule forbids — and it was
 * wrong in both directions: it kept 1,488 rows at course level, including
 * every ligament and lymph node no lecture mentions.
 *
 * It is now read from work/course-terms.json, which work/build-course-terms.mjs
 * derives from the HSS2011 and ABCT2326 teaching and assessment material on
 * the shared drive. Each tier-0 row carries the file that names it, so the app
 * shows provenance instead of asserting importance.
 *
 * STUDY UNITS — WHAT A TAP CAN SELECT
 *
 * Knowing the tier is not enough on its own. Tiering alone still left 1,374
 * separately selectable things, because a tier-1 row that grouped with nothing
 * stayed on its own: 172 in the ligament layer, 148 in muscles, 99 in vessels.
 * Tapping the wrist returned "Dorsal scaphotriquetral ligament" — a name that
 * appears in no lecture, no exercise and no paper.
 *
 * So every row now resolves to a UNIT, and the unit is the only thing the
 * viewer will select:
 *
 *   course  a structure the course names. It is its own unit and keeps its
 *           name — these are exactly the names to learn.
 *   group   a set of finer structures, named after something more general:
 *           the whole they are part of ("Bronchi of the left lung") or their
 *           kind and where they are ("Ligaments of the foot"). Where they are
 *           is MEASURED, not guessed from the name.
 *   lone    one of a kind: no whole to join, nothing of its kind nearby. It
 *           stays selectable and the app says it is beyond the course.
 *
 * Usage: node work/build-mesh-index.mjs      (rebuild course-terms.json first
 *        with `node work/build-course-terms.mjs` if the sources have changed)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectStructures, measureStructures, LAYERS, OUTPUTS } from './lib/mesh-names.mjs';

const WORK = dirname(fileURLToPath(import.meta.url));

const termsPath = join(WORK, 'course-terms.json');
if (!existsSync(termsPath)) {
  console.error('work/course-terms.json is missing. Run: node work/build-course-terms.mjs');
  process.exit(2);
}
const TERMS = JSON.parse(readFileSync(termsPath, 'utf8'));

const { rows, rawTotal, dropped } = collectStructures();
measureStructures(rows);

for (const r of rows) {
  const hit = TERMS.named[r.layer + '|' + r.name];
  r.tier = hit ? 0 : 1;
  r.src = hit ? hit[0] : -1;
  r.evidence = hit ? hit[1] : '';
}

const clean = (s) => s.replace(/\*/g, '').replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
const cap = (s) => s.replace(/^./, (c) => c.toUpperCase());
const byName = new Map(rows.map((r) => [r.layer + '|' + r.name.toLowerCase(), r]));
const anyLayer = new Map();
for (const r of rows) {
  const k = r.name.toLowerCase();
  /* a course-named row wins the name over a finer one in another layer */
  if (!anyLayer.has(k) || (r.tier === 0 && anyLayer.get(k).tier === 1)) anyLayer.set(k, r);
}

/* ------------------------------------------------------------------ *
 * Where each structure is — measured, not read off the name
 *
 * "Dorsal cuboideonavicular ligament" is in the foot and "Capitohamate
 * interosseous ligament" is in the hand, and no amount of reading the strings
 * establishes that. Both are answered in one line by asking which bone they
 * are nearest, which is what the GLB geometry is for.
 *
 * Limb zones come from the nearest bone; axial zones come from height,
 * because the nearest bone to a kidney is a rib. A structure within 5 cm of
 * the median plane is axial whatever bone happens to be closest — that is
 * what keeps the trachea out of "the shoulder", the clavicle being nearer to
 * it than any vertebra.
 * ------------------------------------------------------------------ */

const BONE_ZONE = [
  ['hand', /\bhand\b|metacarp|scaphoid|lunate|triquetrum|pisiform|trapezi|capitate|hamate|carpal bone/],
  ['forearm', /^radius|^ulna/],
  ['arm', /humerus/],
  ['shoulder', /clavicle|scapula/],
  ['foot', /\bfoot\b|metatars|talus|calcaneus|cuboid|cuneiform bone|navicular|tarsal bone|sesamoid/],
  ['knee', /patella/],
  ['leg', /tibia|fibula/],
  ['thigh', /femur/],
  ['axial', /.*/],
];
const zoneOfBone = (n) => { const s = n.toLowerCase(); for (const [z, re] of BONE_ZONE) if (re.test(s)) return z; return 'axial'; };

/* one box per bone per side: the union of a paired bone straddles the midline
   and its centre lands on the median plane, which no femur is near */
const bones = rows.filter((r) => r.layer === 'skeleton' && r.perSide)
  .flatMap((r) => Object.values(r.perSide).map((b) => ({ b, zone: zoneOfBone(r.name) })));

/* the braincase, so cerebral structures are "of the brain" and not "of the head" */
const NEUROCRANIUM = (() => {
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (const r of rows) {
    if (r.layer !== 'skeleton' || !r.box) continue;
    if (!/^(frontal|parietal|occipital|temporal|sphenoid|ethmoid) bone$/i.test(r.name)) continue;
    for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], r.box[0][k]); mx[k] = Math.max(mx[k], r.box[1][k]); }
  }
  return [mn, mx];
})();

const centreOf = (b) => [0, 1, 2].map((k) => (b[0][k] + b[1][k]) / 2);
const distTo = (p, b) => {
  let d = 0;
  for (let k = 0; k < 3; k++) { const v = Math.max(b[0][k] - p[k], 0, p[k] - b[1][k]); d += v * v; }
  return Math.sqrt(d);
};
const within = (p, b) => [0, 1, 2].every((k) => p[k] >= b[0][k] - 0.005 && p[k] <= b[1][k] + 0.005);

/*
 * Measured on the skeleton: top of the manubrium (the jugular notch) 1.404,
 * lower border of the mandible 1.496, diaphragm 1.042-1.262, iliac crest
 * 1.012. The bands below sit inside those: the liver's centre is 1.175 and
 * the kidney's 1.104, both abdominal; the heart's is 1.30, thoracic.
 */
const axialZone = (y) => (y >= 1.40 ? 'head and neck' : y >= 1.20 ? 'thorax' : y >= 1.01 ? 'abdomen' : 'pelvis');

/*
 * A bone is the one thing whose own name settles this.
 *
 * Height alone splits the rib cage: the second rib's centre is at 1.30 and the
 * tenth's at 1.15, so four of the twelve ribs came out "of the abdomen" and
 * the costal cartilages split the same way. Every rib is thoracic by
 * definition, so for the skeleton the name decides and the measurement is
 * only the fallback. (This is a coarser split than REGIONS in the HTML, and
 * for a different purpose: naming a group of bones, not filtering the view.)
 */
const AXIAL_BONE = [
  ['head and neck', /skull|cranium|frontal bone|parietal|occipital|temporal bone|sphenoid|ethmoid|lacrimal|nasal|vomer|palatine|zygomat|maxilla|mandible|concha|hyoid|incus|malleus|stapes|tooth|molar|premolar|incisor|canine|arytenoid|corniculate|cricoid|thyroid cartilage|cuneiform cartilage|epiglot|alar cartilage|orbit|septal cartilage|vertebra c\d|^atlas|^axis/i],
  ['thorax', /\brib\b|\brib$|costal|sternum|manubrium|xiphoid|vertebra t\d/i],
  ['abdomen', /vertebra l\d/i],
  ['pelvis', /hip bone|ilium|ischium|pubis|pubic|acetabul|sacrum|coccyx/i],
];

function zoneOf(r) {
  const b = r.sideBox || r.box;
  if (!b) return null;
  const p = centreOf(b);
  if (r.layer === 'nervous' && within(p, NEUROCRANIUM)) return 'brain';
  if (r.layer === 'skeleton') {
    const own = zoneOfBone(r.name);
    if (own !== 'axial') return own;
    for (const [z, re] of AXIAL_BONE) if (re.test(r.name)) return z;
  }
  let best = null, bd = Infinity;
  for (const bo of bones) { const d = distTo(p, bo.b); if (d < bd) { bd = d; best = bo; } }
  if (!best || best.zone === 'axial' || Math.abs(p[0]) < 0.05) return axialZone(p[1]);
  return best.zone;
}
for (const r of rows) r.zone = zoneOf(r);

/* ------------------------------------------------------------------ *
 * Absorption — a piece of a structure the course names IS that structure
 *
 * "Anterior branch of obturator nerve" is the obturator nerve; "Segment I of
 * liver" is the liver. Selecting the whole and selecting the piece should not
 * be two different things, and the piece should not be offered under a name
 * no lecture uses.
 *
 * Only genuine part-of relations absorb. "of" does not mean "part of": a
 * bursa OF the piriformis is not the piriformis, a ligament OF the radius is
 * not the radius, and a nucleus OF the oculomotor nerve is in the midbrain.
 * So the head noun has to name a piece, and the whole has to be in the same
 * layer — a bronchial artery is not part of the lung it supplies.
 * ------------------------------------------------------------------ */

const ABSORB = new Set(('part parts head heads belly bellies segment segments lobe lobes lobule '
  + 'lobules branch branches tributary tributaries ramus rami root roots division divisions '
  + 'portion portions apex base body bodies neck wall walls layer layers cusp cusps leaflet '
  + 'leaflets horn horns crus crura limb limbs tendon tendons aponeurosis bifurcation lingula '
  + 'uvula nodule tonsil pyramis tuber wing process chamber ampulla cord peduncle matter '
  + 'surface border margin angle spine tubercle trochanter condyle facet fossa notch groove '
  + 'canal foramen sinus septum sulcus cells cell').split(' '));

/* Names as written, and names with their parentheses taken off, so "Motor root
   of trigeminal nerve" finds the row called "Trigeminal nerve (V)". */
const byClean = new Map();
for (const r of rows) {
  const k = r.layer + '|' + clean(r.name).toLowerCase();
  if (!byClean.has(k)) byClean.set(k, r);
}
const wholeNamed = (layer, name) => byName.get(layer + '|' + name.toLowerCase())
  || byClean.get(layer + '|' + clean(name).toLowerCase()) || null;

function parentOf(r) {
  if (r.tier === 0) return null;
  const s = clean(r.name);
  const low = s.toLowerCase();
  /*
   * The IMMEDIATE whole first. "Anterior division of inferior trunk of
   * brachial plexus" is a piece of the inferior trunk, which is a piece of the
   * plexus; reading only the last "of" would look for a plexus that has no
   * mesh and give up, when the trunk one word earlier is right there.
   */
  for (const i of [low.indexOf(' of '), low.lastIndexOf(' of ')]) {
    if (i < 0) continue;
    if (!ABSORB.has(low.slice(0, i).split(' ').pop())) continue;
    const whole = wholeNamed(r.layer, s.slice(i + 4).trim());
    if (whole && whole !== r) return whole;
  }
  return null;
}
for (const r of rows) r.parent = parentOf(r);

/* Follow the chain to whatever it is ultimately a piece of. A cycle would
   hang this loop, so the walk is bounded by the length of the chain. */
function rootOf(r) {
  let cur = r;
  for (let n = 0; n < 12 && cur.parent; n++) cur = cur.parent;
  return cur;
}
for (const r of rows) r.root = rootOf(r);

/* ------------------------------------------------------------------ *
 * Grouping — a general name for what is left
 * ------------------------------------------------------------------ */

/* What kind of thing it is. Plural, because a group is a set. */
const KIND = { ligament: 'Ligaments', ligaments: 'Ligaments', capsule: 'Capsules', capsules: 'Capsules',
  disc: 'Discs', discs: 'Discs', bursa: 'Bursae', bursae: 'Bursae', node: 'Lymph nodes', nodes: 'Lymph nodes',
  artery: 'Arteries', arteries: 'Arteries', vein: 'Veins', veins: 'Veins', nerve: 'Nerves', nerves: 'Nerves',
  branch: 'Branches', branches: 'Branches', muscle: 'Muscles', muscles: 'Muscles', tendon: 'Tendons',
  tendons: 'Tendons', fascia: 'Fasciae', sheath: 'Tendon sheaths', sheaths: 'Tendon sheaths',
  gyrus: 'Gyri', sulcus: 'Sulci', nucleus: 'Nuclei', nuclei: 'Nuclei', tract: 'Tracts',
  ganglion: 'Ganglia', plexus: 'Plexuses', trunk: 'Trunks', duct: 'Ducts', gland: 'Glands',
  membrane: 'Membranes', cartilage: 'Cartilages', cartilages: 'Cartilages', bone: 'Bones', bones: 'Bones',
  joint: 'Joints', vessel: 'Vessels', vessels: 'Vessels', lobe: 'Lobes', lobes: 'Lobes',
  segment: 'Segments', segments: 'Segments', sinus: 'Sinuses', sinuses: 'Sinuses', bronchus: 'Bronchi',
  retinaculum: 'Retinacula', aponeurosis: 'Aponeuroses', raphe: 'Raphes', labrum: 'Labra',
  meniscus: 'Menisci', arch: 'Arches', network: 'Networks', anastomosis: 'Anastomoses',
  tonsil: 'Tonsils', valve: 'Valves', septum: 'Septa', septa: 'Septa', fissure: 'Fissures',
  commissure: 'Commissures', peduncle: 'Peduncles', lobule: 'Lobules', lobules: 'Lobules',
  cell: 'Air cells', cells: 'Air cells', tributary: 'Tributaries', tributaries: 'Tributaries',
  ramus: 'Rami', rami: 'Rami', root: 'Roots', roots: 'Roots', cord: 'Cords', body: 'Bodies',
  papilla: 'Papillae', taenia: 'Taeniae', phalanx: 'Phalanges', rib: 'Ribs', vertebra: 'Vertebrae',
  ring: 'Rings', canal: 'Canals', fold: 'Folds', ligamentum: 'Ligaments', chamber: 'Chambers',
  tooth: 'Teeth', teeth: 'Teeth', molar: 'Teeth', premolar: 'Teeth', incisor: 'Teeth', canine: 'Teeth',
  division: 'Divisions', divisions: 'Divisions', leaflet: 'Leaflets', leaflets: 'Leaflets',
  cusp: 'Cusps', cusps: 'Cusps', crus: 'Crura', horn: 'Horns', wall: 'Walls', ostium: 'Ostia',
  process: 'Processes', spine: 'Spines', tubercle: 'Tubercles', facet: 'Facets',
  fossa: 'Fossae', notch: 'Notches', groove: 'Grooves', foramen: 'Foramina' };

/* When the name carries no kind word at all — "Abductor pollicis brevis",
   "Culmen" — the layer says what kind of thing it must be. */
const LAYER_KIND = { skeleton: 'Bones', muscle: 'Muscles', joint: 'Joint structures',
  organs: 'Structures', circulatory: 'Vessels', nervous: 'Structures', lymphatic: 'Lymph nodes' };

function kindOf(r) {
  const s = clean(r.name).toLowerCase();
  /* the kind is in the HEAD of the phrase: "Branch to angular gyrus" is a
     branch, not a gyrus, and "Distal phalanx of fifth finger" is a phalanx */
  const head = s.split(/ (?:of|to|in|with|from|for) /)[0];
  return KIND[head.split(' ').pop()] || LAYER_KIND[r.layer];
}

const ZONE_LABEL = { brain: 'the brain', 'head and neck': 'the head and neck', thorax: 'the thorax',
  abdomen: 'the abdomen', pelvis: 'the pelvis', shoulder: 'the shoulder', arm: 'the arm',
  forearm: 'the forearm', hand: 'the hand', thigh: 'the thigh', knee: 'the knee',
  leg: 'the leg', foot: 'the foot' };

/*
 * Pieces of a whole the model does not have.
 *
 * The deltoid exists only as three "parts", the trapezius only as three; there
 * is no mesh called "Deltoid muscle". Selecting the three IS selecting the
 * deltoid, so the group takes the whole's name -- "Parts of deltoid muscle"
 * names a thing nobody is asked to identify. Where the whole DOES exist the
 * pieces are absorbed into it instead, higher up.
 */
const PARTITIVE = new Set(['part', 'parts', 'head', 'heads', 'belly', 'bellies',
  'leaflet', 'leaflets', 'cusp', 'cusps', 'layer', 'layers']);

/*
 * The two wholes no name states.
 *
 * The aortic valve's three cusps are "Left coronary leaflet", "Right coronary
 * leaflet" and "Non-coronary leaflet" -- correct anatomy, and not one of them
 * says which valve; the pulmonary valve's three say so themselves. The
 * pituitary is modelled as its anterior and posterior lobes under their
 * histological names and never as itself.
 */
const WHOLE_OF = {
  'circulatory|Left coronary leaflet': 'Aortic valve',
  'circulatory|Right coronary leaflet': 'Aortic valve',
  'circulatory|Non-coronary leaflet': 'Aortic valve',
  'organs|Adenohypophysis': 'Pituitary gland',
  'organs|Neurohypophysis': 'Pituitary gland',
};

/* The tail of "<pieces> of <whole>", cleaned. */
function tailOf(r) {
  const s = clean(r.name);
  const i = s.toLowerCase().lastIndexOf(' of ');
  return i < 0 ? null : s.slice(i + 4).trim();
}
function headLastOf(r) {
  const s = clean(r.name).toLowerCase();
  const i = s.lastIndexOf(' of ');
  return (i < 0 ? s : s.slice(0, i)).split(' of ')[0].split(' ').pop();
}

/* How many rows in a layer say they are "of" the same thing. */
const tailCount = new Map();
for (const r of rows) {
  const t = tailOf(r);
  if (!t) continue;
  const k = r.layer + '|' + t.toLowerCase();
  tailCount.set(k, (tailCount.get(k) || 0) + 1);
}

/*
 * Where to say it is. A whole the model actually refers to beats a body zone:
 * "Bronchi of the right lung" locates them better than "Bronchi of the
 * thorax". The whole counts if the course names it, or if the model itself
 * keeps coming back to it -- there is no mesh called "Right lung", only its
 * three lobes, and yet thirty-two rows across two layers are named "... of
 * right lung", which is the model stating that the right lung is a thing.
 */
function namedWholeOf(r) {
  const tail = tailOf(r);
  if (!tail) return null;
  const key = tail.toLowerCase();
  const whole = anyLayer.get(key);
  if ((whole && whole !== r && whole.tier === 0) || (tailCount.get(r.layer + '|' + key) || 0) >= 3)
    return 'the ' + (whole ? whole.name : tail).toLowerCase();
  return null;
}
const zoneLabelOf = (r) => ZONE_LABEL[r.zone] || 'the body';

/*
 * Every row gets an ordered list of names it could be grouped under, from the
 * most specific to the most general, and takes the first one that turns out to
 * describe more than itself. Two ligaments of the hand are "Ligaments of the
 * hand"; the only labrum of the thigh is not "Labra of the thigh", it is one
 * of the "Joint structures of the thigh".
 */
function candidates(r) {
  const out = [];
  const whole = namedWholeOf(r);
  const kind = kindOf(r);
  const layerKind = LAYER_KIND[r.layer];
  if (whole) out.push(`${kind} of ${whole}`);
  out.push(`${kind} of ${zoneLabelOf(r)}`);
  if (whole && layerKind !== kind) out.push(`${layerKind} of ${whole}`);
  if (layerKind !== kind) out.push(`${layerKind} of ${zoneLabelOf(r)}`);
  return out;
}

const roots = rows.filter((r) => r.root === r && r.tier === 1);
const groups = new Map();
function put(label, r, opts = {}) {
  const key = r.layer + '|' + label.toLowerCase();
  let g = groups.get(key);
  if (!g) g = { key, label, layer: r.layer, kind: kindOf(r), members: [], zones: new Set(), ...opts },
    groups.set(key, g);
  g.members.push(r);
  g.zones.add(r.zone);
  return g;
}

const pending = [];
for (const r of roots) {
  const forced = WHOLE_OF[r.layer + '|' + r.name];
  const tail = tailOf(r);
  /* one "of" only: "Cruciform part of fibrous sheath of digit of hand" is not
     a part of the hand, and its immediate whole is not a name worth a group */
  const partitive = tail && PARTITIVE.has(headLastOf(r))
    && clean(r.name).toLowerCase().split(' of ').length === 2
    && !wholeNamed(r.layer, tail);
  if (forced || partitive) { put(cap(forced || tail), r, { whole: true, zoned: false }); continue; }
  pending.push({ r, list: candidates(r), at: 0 });
}
/* Take the first candidate that describes more than one thing. Assigning one
   row can rescue another's group, so this repeats until nothing moves. */
for (let pass = 0; pass < 6; pass++) {
  for (const p of pending) {
    const label = p.list[Math.min(p.at, p.list.length - 1)];
    put(label, p.r, { zoned: true });
  }
  let moved = 0;
  for (const p of pending) {
    if (p.at >= p.list.length - 1) continue;
    const g = groups.get(p.r.layer + '|' + p.list[p.at].toLowerCase());
    if (g && g.members.length < 2) { p.at++; moved++; }
  }
  for (const [key, g] of [...groups]) if (g.zoned) groups.delete(key);
  if (!moved) break;
}
for (const p of pending) put(p.list[Math.min(p.at, p.list.length - 1)], p.r, { zoned: true });

/*
 * Split a kind by place only where the split is real.
 *
 * Ligaments genuinely need it: thirty-nine in the foot, thirty-three in the
 * hand, thirteen in the thigh — one bucket of two hundred would be useless.
 * The three taeniae of the colon do not: two of them centre below the pelvic
 * brim and the third above it, so splitting by zone produced "Taeniae of the
 * pelvis" and one lonely free taenia. A kind is split only when at least two
 * places would each hold two or more of it; otherwise it becomes one group,
 * named after where most of it is.
 *
 * A few kinds name their own place — every rib is thoracic, every tooth is in
 * the head — so those drop the "of ..." rather than say it twice.
 */
const SELF_LOCATING = new Set(['Ribs', 'Teeth', 'Vertebrae']);
{
  const byKind = new Map();
  for (const g of groups.values()) {
    if (!g.zoned) continue;
    const k = g.layer + '|' + g.label.slice(0, g.label.lastIndexOf(' of '));
    byKind.set(k, [...(byKind.get(k) || []), g]);
  }
  for (const [k, gs] of byKind) {
    const kind = k.slice(k.indexOf('|') + 1);
    if (gs.length < 2 || gs.filter((g) => g.members.length >= 2).length >= 2) {
      if (gs.length === 1 && SELF_LOCATING.has(kind)) {
        groups.delete(gs[0].key);
        gs[0].label = kind;
        gs[0].key = gs[0].layer + '|' + kind.toLowerCase();
        groups.set(gs[0].key, gs[0]);
      }
      continue;
    }
    const all = gs.flatMap((g) => g.members);
    gs.forEach((g) => groups.delete(g.key));
    const biggest = gs.slice().sort((a, b) => b.members.length - a.members.length)[0];
    const label = SELF_LOCATING.has(kind) ? kind
      : `${kind} of ${ZONE_LABEL[biggest.members[0].zone] || 'the body'}`;
    const g = put(label, all[0], { zoned: true });
    g.members = all;
  }
}

/* ------------------------------------------------------------------ *
 * Units
 * ------------------------------------------------------------------ */

const UNIT_KIND = ['course', 'group', 'lone'];
const units = [];
const unitIndex = new Map();

/* every course-named structure is its own unit and keeps its own name */
for (const r of rows) {
  if (r.tier !== 0) continue;
  r.unit = units.length;
  unitIndex.set(r, r.unit);
  units.push({ label: r.name, layer: r.layer, kind: 0, size: 0 });
}
/* everything else joins the group its root landed in */
for (const g of groups.values()) {
  /* a group named after the whole is a group even at one member: "Aortic
     valve" is the right name for its cusps however many are modelled */
  const kind = (g.members.length >= 2 || g.whole) ? 1 : 2;
  const label = kind === 2 ? g.members[0].name : g.label;
  const u = units.length;
  units.push({ label, layer: g.layer, kind, size: 0 });
  for (const m of g.members) unitIndex.set(m, u);
}
for (const r of rows) {
  const u = unitIndex.get(r.root);
  if (u == null) throw new Error(`no unit for ${r.layer}|${r.name}`);
  r.unit = u;
  units[u].size++;
}

/* Only the files that actually name something. */
const srcList = [];
{
  const used = new Map();
  for (const r of rows) {
    if (r.src < 0) continue;
    if (!used.has(r.src)) { used.set(r.src, srcList.length); srcList.push(TERMS.sources[r.src]); }
    r.src = used.get(r.src);
  }
}

/* ------------------------------------------------------------------ *
 * Emit
 * ------------------------------------------------------------------ */

const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const EVIDENCE = ['', 'listed', 'named', 'described', 'mirrored', 'series'];

const body = rows.map((r) => {
  const sides = r.sides.size === 2 ? 'b' : r.sides.size === 1 ? [...r.sides][0] : '';
  const mesh = r.mesh === r.name ? '' : r.mesh;
  return `[${lit(r.name)},${lit(r.layer)},${lit(mesh)},${lit(sides)},${r.tier},${r.unit},${r.src},${EVIDENCE.indexOf(r.evidence || '')}]`;
}).join(',\n');

const unitBody = units.map((u) => `[${lit(u.label)},${lit(u.layer)},${u.kind},${u.size}]`).join(',\n');
const srcBody = srcList.map((s) => `[${lit(s.file)},${lit(s.subject)}]`).join(',\n');

const t0 = rows.filter((r) => r.tier === 0).length;
const nCourse = units.filter((u) => u.kind === 0).length;
const nGroup = units.filter((u) => u.kind === 1).length;
const nLone = units.filter((u) => u.kind === 2).length;

const out = `/*
 * Mesh name index — GENERATED, do not edit by hand.
 *
 * Run \`node work/build-mesh-index.mjs\` to rebuild from the GLB files plus
 * work/course-terms.json (itself rebuilt by work/build-course-terms.mjs from
 * the course material on the shared drive).
 *
 * One row per named structure per layer, collapsed across side letters and
 * Blender duplicate suffixes, so global search can reach every structure the
 * model actually contains rather than only the ~50 curated records.
 *
 * Row shape: [displayName, layerKey, meshName, sides, tier, unit, source, evidence]
 *   meshName  '' when identical to displayName
 *   sides     'b' both, 'l', 'r', or '' for unpaired
 *   tier      0 = the course names it, so the name is worth learning
 *             1 = finer than the course goes
 *   unit      index into UNITS: the thing a tap selects and the name it is
 *             given. Every row has one; a tier-0 row is its own.
 *   source    index into SOURCES for tier-0 rows, -1 otherwise
 *   evidence  index into EVIDENCE: how that source names it
 *
 * ${rows.length} structures from ${rawTotal} raw mesh names across ${LAYERS.length} layers.
 * ${t0} are named by the course material and carry the file that names them.
 * They resolve to ${units.length} study units: ${nCourse} course-named structures,
 * ${nGroup} groups covering the ${rows.length - t0} structures beyond the course, and ${nLone}
 * one of a kind with nothing to join.
 * ${dropped.length} degenerate node(s) dropped: ${dropped.join(', ') || 'none'}.
 */

/* The taught and assessed files that name at least one modelled structure. */
const SOURCES = [
${srcBody}
];

/* How a source names a structure. 'listed' is the examinable glossary, which
   is the course's own statement of which names are examinable; 'named' is the
   exact name in a lecture, exercise or paper; 'described' is all of its words
   together in one sentence of one — which is how the notes say "the right lung
   is divided into superior, middle and inferior lobes"; 'mirrored' is the same
   structure on the other side of a body that is symmetrical about it;
   'series' is the rest of a numbered set the sources name repeatedly. */
const EVIDENCE = ${JSON.stringify(EVIDENCE)};

/*
 * What a tap can select.
 *
 * [label, layerKey, kind, size] where kind is an index into UNIT_KINDS:
 *   course  a structure the course names — its own name, its own unit
 *   group   finer structures selected together under a more general name
 *   lone    one structure with nothing to group with, beyond the course
 * size is how many index rows resolve to it.
 */
const UNIT_KINDS = ${JSON.stringify(UNIT_KIND)};
const UNITS_RAW = [
${unitBody}
];

const ROWS = [
${body}
];

export const UNITS = UNITS_RAW.map(([label, layer, kind, size], id) =>
  ({ id, label, layer, kind: UNIT_KINDS[kind], size }));

export const MESH_INDEX = ROWS.map(([name, layer, mesh, sides, tier, unit, src, ev]) => ({
  name, layer, mesh: mesh || name, sides, tier,
  unitId: unit,
  unit: UNITS_RAW[unit][0],
  unitKind: UNIT_KINDS[UNITS_RAW[unit][2]],
  unitSize: UNITS_RAW[unit][3],
  /* true when this row IS the unit rather than one of the things inside it */
  isUnit: UNITS_RAW[unit][0] === name && UNITS_RAW[unit][2] !== 1,
  source: src < 0 ? null
    : { file: SOURCES[src][0], subject: SOURCES[src][1], evidence: EVIDENCE[ev] || 'named' },
}));

export default MESH_INDEX;
`;

writeFileSync(join(OUTPUTS, 'mesh-index.js'), out);
console.log(`mesh-index.js: ${rows.length} structures from ${rawTotal} raw names`);
console.log(`${'layer'.padEnd(12)} ${'rows'.padStart(5)} ${'course'.padStart(7)} ${'groups'.padStart(7)} ${'lone'.padStart(5)} ${'tappable'.padStart(9)}`);
for (const [layer] of LAYERS) {
  const n = rows.filter((r) => r.layer === layer).length;
  const u = units.filter((x) => x.layer === layer);
  const c = u.filter((x) => x.kind === 0).length;
  const g = u.filter((x) => x.kind === 1).length;
  const l = u.filter((x) => x.kind === 2).length;
  console.log(`${layer.padEnd(12)} ${String(n).padStart(5)} ${String(c).padStart(7)} ${String(g).padStart(7)} ${String(l).padStart(5)} ${String(c + g + l).padStart(9)}`);
}
console.log(`${'TOTAL'.padEnd(12)} ${String(rows.length).padStart(5)} ${String(nCourse).padStart(7)} ${String(nGroup).padStart(7)} ${String(nLone).padStart(5)} ${String(units.length).padStart(9)}`);
console.log(`  ${srcList.length} source files name at least one structure`);
if (dropped.length) console.log(`  dropped degenerate: ${dropped.join(', ')}`);
