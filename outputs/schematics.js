/*
 * schematics.js — hand-authored SVG for the concepts no mesh can show.
 *
 * Every label here is a term that appears in that item's own lesson or key
 * facts in study-data.js. Nothing was added from outside the supplied sources:
 * these are drawings of content the app already carries, not new teaching.
 * Where a bundled model genuinely cannot show something (the cardiac
 * conducting system, an alveolus, the inside of a long bone), this is what
 * stands in its place — and the item's caption says so.
 *
 * Colours come from the page's CSS custom properties, so the drawings follow
 * the app's theme rather than carrying their own palette.
 */

const P = {
  line: 'var(--line)', text: 'var(--text)', muted: 'var(--muted)', dim: 'var(--dim)',
  teal: 'var(--teal)', orange: 'var(--orange)', blue: 'var(--blue)',
  green: 'var(--green)', red: 'var(--red)',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Greedy wrap. SVG has no text flow, so line breaks are computed here against
   an average glyph width for the size in use. */
function wrap(text, width, size = 12) {
  const per = size * 0.55;
  const max = Math.max(4, Math.floor(width / per));
  const out = [];
  let line = '';
  String(text).split(/\s+/).forEach((w) => {
    if (!line) { line = w; return; }
    if ((line + ' ' + w).length <= max) line += ' ' + w;
    else { out.push(line); line = w; }
  });
  if (line) out.push(line);
  return out;
}

function textBlock(x, y, lines, { size = 12, fill = P.muted, anchor = 'start', weight = 400, lh = 1.35 } = {}) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${
    lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : (size * lh).toFixed(1)}">${esc(l)}</tspan>`).join('')
  }</text>`;
}

function box(x, y, w, h, title, body, tone = P.teal, opts = {}) {
  const pad = 11;
  const titleLines = wrap(title, w - pad * 2, 13);
  const bodyLines = body ? wrap(body, w - pad * 2, 11) : [];
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${opts.fill || 'rgba(255,255,255,.035)'}" stroke="${tone}" stroke-opacity="${opts.strokeOpacity || .55}"/>
    ${textBlock(x + pad, y + 19, titleLines, { size: 13, fill: tone, weight: 700 })}
    ${bodyLines.length ? textBlock(x + pad, y + 19 + titleLines.length * 17 + 4, bodyLines, { size: 11, fill: P.muted }) : ''}
  </g>`;
}

function arrow(x1, y1, x2, y2, tone = P.dim, label = '') {
  const mx = (x1 + x2) / 2; const my = (y1 + y2) / 2;
  return `<g>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${tone}" stroke-width="1.4" marker-end="url(#ar)"/>
    ${label ? `<text x="${mx}" y="${my - 6}" font-size="10" fill="${P.dim}" text-anchor="middle">${esc(label)}</text>` : ''}
  </g>`;
}

function svg(height, body) {
  return `<svg viewBox="0 0 720 ${height}" width="100%" role="img" preserveAspectRatio="xMidYMid meet">
    <defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${P.dim}"/></marker></defs>
    ${body}
  </svg>`;
}

/* A row of equal boxes. Defaults to the full width, but takes an explicit
   left edge and span so rows can be placed side by side. */
function row(items, y, h, { gap = 12, tone, x0 = 20, span = 680 } = {}) {
  const w = (span - gap * (items.length - 1)) / items.length;
  return items.map((it, i) => box(x0 + i * (w + gap), y, w, h, it.t, it.b, it.tone || tone || P.teal)).join('');
}

/* A vertical chain of boxes joined by arrows. */
function chain(steps, { x = 20, y = 26, w = 680, h = 40, gap = 16, tone = P.teal } = {}) {
  let out = '';
  steps.forEach((s, i) => {
    const yy = y + i * (h + gap);
    out += box(x, yy, w, h, s.t, s.b, s.tone || tone);
    if (i < steps.length - 1) out += arrow(x + w / 2, yy + h, x + w / 2, yy + h + gap - 2);
  });
  return out;
}

function heading(x, y, t, tone = P.dim) {
  return `<text x="${x}" y="${y}" font-size="10" letter-spacing="1.4" fill="${tone}" font-weight="700">${esc(String(t).toUpperCase())}</text>`;
}

/* A generic human outline, reused by the orientation drawings. */
function bodyOutline(cx, top, scale = 1, stroke = P.line) {
  const s = (n) => n * scale;
  return `<g stroke="${stroke}" fill="none" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <circle cx="${cx}" cy="${top + s(20)}" r="${s(18)}"/>
    <path d="M${cx} ${top + s(38)} L${cx} ${top + s(128)}"/>
    <path d="M${cx - s(34)} ${top + s(58)} L${cx + s(34)} ${top + s(58)}"/>
    <path d="M${cx - s(34)} ${top + s(58)} L${cx - s(52)} ${top + s(116)}"/>
    <path d="M${cx + s(34)} ${top + s(58)} L${cx + s(52)} ${top + s(116)}"/>
    <path d="M${cx - s(24)} ${top + s(128)} L${cx + s(24)} ${top + s(128)}"/>
    <path d="M${cx - s(24)} ${top + s(128)} L${cx - s(26)} ${top + s(216)}"/>
    <path d="M${cx + s(24)} ${top + s(128)} L${cx + s(26)} ${top + s(216)}"/>
    <path d="M${cx - s(38)} ${top + s(216)} L${cx - s(16)} ${top + s(216)}"/>
    <path d="M${cx + s(16)} ${top + s(216)} L${cx + s(38)} ${top + s(216)}"/>
  </g>`;
}

/* ------------------------------------------------------------------ *
 * The schematics
 * ------------------------------------------------------------------ */

export const SCHEMATICS = {

  anatomicalPosition: {
    title: 'The anatomical position',
    caption: 'Every directional term in the subject is defined against this one pose, whatever position the patient is actually in.',
    svg: () => svg(290, `
      ${bodyOutline(250, 24, 1.05, P.teal)}
      <g stroke="${P.orange}" stroke-width="1.2" fill="none">
        <path d="M198 86 l-14 0" marker-end="url(#ar)"/>
        <path d="M302 86 l14 0" marker-end="url(#ar)"/>
      </g>
      ${textBlock(420, 46, wrap('Upright stance, feet shoulder width apart and parallel, toes pointing forward.', 270), { size: 12 })}
      ${textBlock(420, 100, wrap('Upper limbs out to each side, palms facing forward — this is the detail people get wrong.', 270), { size: 12, fill: P.orange })}
      ${textBlock(420, 154, wrap('Terms are applied as if the body were in this position regardless of its real orientation.', 270), { size: 12 })}
      ${textBlock(420, 208, wrap('So a scar in the "anterior carpal region" is on the palm side of the wrist — always.', 270), { size: 12, fill: P.teal })}
      ${heading(420, 24, 'Four things that define it')}
      <g fill="${P.orange}" font-size="11">
        <text x="196" y="150" text-anchor="end">palm</text>
        <text x="304" y="150">palm</text>
      </g>
      <g stroke="${P.orange}" stroke-width="1.1" fill="none" opacity=".8">
        <path d="M199 146 L214 138"/><path d="M301 146 L286 138"/>
      </g>
    `),
  },

  bodyPlanes: {
    title: 'The three planes',
    caption: 'Each plane answers one question: which two halves does this cut separate?',
    svg: () => svg(300, `
      ${bodyOutline(170, 30, 1.05, P.line)}
      <g opacity=".9">
        <path d="M170 22 L170 268" stroke="${P.teal}" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M96 138 L244 138" stroke="${P.orange}" stroke-width="2" stroke-dasharray="6 4"/>
        <ellipse cx="170" cy="196" rx="74" ry="15" fill="none" stroke="${P.blue}" stroke-width="2" stroke-dasharray="6 4"/>
      </g>
      ${box(330, 30, 370, 62, 'Mid-sagittal / median plane', 'Separates left from right. Vertical, straight down the midline.', P.teal)}
      ${box(330, 106, 370, 62, 'Coronal / frontal plane', 'Separates anterior from posterior. Vertical, front half from back half.', P.orange)}
      ${box(330, 182, 370, 62, 'Transverse / horizontal plane', 'Separates superior from inferior. The plane a CT slice lies in.', P.blue)}
      ${textBlock(330, 268, wrap('The glossary lists both names for the first two, so either is acceptable in an answer.', 370), { size: 11, fill: P.dim })}
    `),
  },

  bodyCavities: {
    title: 'Cavities, quadrants and regions',
    caption: 'Three different ways of dividing the same trunk — cavities are spaces, quadrants and regions are surface map references.',
    svg: () => svg(320, `
      ${heading(20, 20, 'Cavities named in the glossary')}
      ${row([
        { t: 'Thoracic', b: 'pericardial · pleural', tone: P.teal },
        { t: 'Abdominal', b: 'peritoneal', tone: P.teal },
        { t: 'Pelvic', b: 'with abdominal = abdominopelvic', tone: P.teal },
        { t: 'Others', b: 'oral · medullary · scrotal', tone: P.dim },
      ], 30, 62)}
      ${heading(20, 122, 'Four quadrants')}
      <g>
        <rect x="20" y="132" width="150" height="150" rx="8" fill="none" stroke="${P.orange}" stroke-opacity=".5"/>
        <line x1="95" y1="132" x2="95" y2="282" stroke="${P.orange}" stroke-opacity=".5"/>
        <line x1="20" y1="207" x2="170" y2="207" stroke="${P.orange}" stroke-opacity=".5"/>
        <g font-size="11" fill="${P.muted}" text-anchor="middle">
          <text x="57" y="175">RUQ</text><text x="132" y="175">LUQ</text>
          <text x="57" y="250">RLQ</text><text x="132" y="250">LLQ</text>
        </g>
      </g>
      ${heading(200, 122, 'Nine regions')}
      <g>
        <rect x="200" y="132" width="150" height="150" rx="8" fill="none" stroke="${P.blue}" stroke-opacity=".5"/>
        <line x1="250" y1="132" x2="250" y2="282" stroke="${P.blue}" stroke-opacity=".4"/>
        <line x1="300" y1="132" x2="300" y2="282" stroke="${P.blue}" stroke-opacity=".4"/>
        <line x1="200" y1="182" x2="350" y2="182" stroke="${P.blue}" stroke-opacity=".4"/>
        <line x1="200" y1="232" x2="350" y2="232" stroke="${P.blue}" stroke-opacity=".4"/>
        <g font-size="9" fill="${P.muted}" text-anchor="middle">
          <text x="225" y="156">R hypo-</text><text x="225" y="170">chondriac</text>
          <text x="275" y="166">epigastric</text>
          <text x="325" y="156">L hypo-</text><text x="325" y="170">chondriac</text>
          <text x="225" y="212">R lumbar</text><text x="275" y="212">umbilical</text><text x="325" y="212">L lumbar</text>
          <text x="225" y="262">R inguinal</text><text x="275" y="262">hypogastric</text><text x="325" y="262">L inguinal</text>
        </g>
      </g>
      ${textBlock(380, 145, wrap('The transtubercular plane is one of the lines used to build the nine-region grid — the glossary names it separately.', 320), { size: 12 })}
      ${textBlock(380, 205, wrap('Quadrants are the quick clinical shorthand; regions are the finer grid over the same abdomen.', 320), { size: 12, fill: P.dim })}
    `),
  },

  wordParts: {
    title: 'How a term comes apart',
    caption: 'Take the term apart and you can read one you have never met before.',
    svg: () => svg(300, `
      <g>
        ${box(20, 24, 200, 52, 'Prefix', 'describes the root', P.orange)}
        ${box(240, 24, 200, 52, 'Root', 'organ, tissue or condition', P.teal)}
        ${box(460, 24, 240, 52, 'Suffix', 'describes the root', P.orange)}
      </g>
      ${heading(20, 106, 'Worked example from the source')}
      <g>
        ${box(20, 116, 200, 46, 'hyper-', 'high / over', P.orange)}
        ${box(240, 116, 200, 46, 'tension', 'pressure', P.teal)}
        ${box(460, 116, 240, 46, '= hypertension', 'abnormally high blood pressure', P.green)}
      </g>
      ${heading(20, 192, 'Position prefixes')}
      ${textBlock(20, 208, wrap('epi- above/upon · hypo- below or deficient · inter- between · circum- around · pre- before · post- after · retro- backward · ab- away from', 320, 11), { size: 11 })}
      ${heading(380, 192, 'Roots of place')}
      ${textBlock(380, 208, wrap('cardi/o heart · oste/o bone · arthr/o joint · my/o muscle · neur/o nerve · nephr/o and ren/o kidney · crani/o skull · cost/o rib', 320, 11), { size: 11 })}
      ${heading(20, 264, 'Suffixes of process')}
      ${textBlock(20, 280, wrap('-graphy process of recording · -graph the instrument · -scopy process of viewing · -itis inflammation · -algia pain · -megaly enlargement · -osis abnormal condition · -emia blood condition', 680, 11), { size: 11 })}
    `),
  },

  longBone: {
    title: 'Inside a long bone',
    caption: 'The skeleton model is a surface capture — it has no interior. This is the internal structure the lecture names.',
    svg: () => svg(300, `
      <g transform="translate(0,0)">
        <path d="M120 34 C96 34 88 54 92 70 C96 86 112 88 112 104 L112 208 C112 224 96 226 92 242 C88 258 96 278 120 278 C144 278 152 258 148 242 C144 226 128 224 128 208 L128 104 C128 88 144 86 148 70 C152 54 144 34 120 34 Z"
          fill="rgba(255,255,255,.05)" stroke="${P.teal}" stroke-opacity=".7"/>
        <path d="M112 118 L128 118 L128 194 L112 194 Z" fill="rgba(255,186,103,.16)" stroke="${P.orange}" stroke-opacity=".7"/>
        <path d="M100 46 C92 52 92 64 98 70 C106 76 134 76 142 70 C148 64 148 52 140 46 Z" fill="rgba(114,227,207,.18)" stroke="${P.teal}" stroke-opacity=".5"/>
        <path d="M100 266 C92 260 92 248 98 242 C106 236 134 236 142 242 C148 248 148 260 140 266 Z" fill="rgba(114,227,207,.18)" stroke="${P.teal}" stroke-opacity=".5"/>
        <circle cx="128" cy="150" r="3" fill="${P.red}"/>
      </g>
      <g stroke="${P.dim}" stroke-width="1" opacity=".7">
        <path d="M146 52 L206 44"/><path d="M150 92 L206 86"/><path d="M132 150 L206 128"/>
        <path d="M120 150 L206 170"/><path d="M150 210 L206 212"/><path d="M146 260 L206 254"/>
      </g>
      <g>
        ${textBlock(212, 48, ['Epiphysis — the bone end'], { size: 12, fill: P.teal, weight: 700 })}
        ${textBlock(212, 88, wrap('Metaphysis — recently developed end, next to the epiphyseal cartilage', 240), { size: 12, fill: P.teal, weight: 700 })}
        ${textBlock(212, 132, wrap('Nutrient foramen — large nutrient arteries enter the shaft here', 240), { size: 12, fill: P.red, weight: 700 })}
        ${textBlock(212, 176, wrap('Medullary cavity — contains bone marrow', 240), { size: 12, fill: P.orange, weight: 700 })}
        ${textBlock(212, 220, ['Diaphysis — the central region'], { size: 12, fill: P.teal, weight: 700 })}
        ${textBlock(212, 254, wrap('Periosteum — covers the outer shaft; inner layer osteogenic, rich in capillaries and nerve', 240), { size: 12, fill: P.green, weight: 700 })}
      </g>
      ${box(470, 34, 230, 78, 'Compact bone', 'Dense solid mass. Forms the outer surface layer of all bones.', P.teal)}
      ${box(470, 124, 230, 78, 'Cancellous (spongy) bone', 'Larger cavities, supported by trabeculae.', P.orange)}
    `),
  },

  boneFunctions: {
    title: 'What bone is for',
    caption: 'Five functions from the Module 0 slide — two mechanical, three biological.',
    svg: () => svg(200, `
      ${heading(20, 20, 'Mechanical')}
      ${box(20, 30, 220, 64, 'Supporting framework', 'The body keeps its shape because bone holds it.', P.teal)}
      ${box(20, 104, 220, 64, 'Levers for muscles', 'Muscle pulls; bone turns the pull into movement.', P.teal)}
      ${heading(260, 20, 'Biological')}
      ${box(260, 30, 210, 64, 'Protection of viscera', 'Brain, spinal cord, heart, lungs, liver, bladder.', P.orange)}
      ${box(260, 104, 210, 64, 'Red blood cell production', 'Bone marrow makes them.', P.orange)}
      ${box(490, 30, 210, 138, 'Mineral storehouse', 'Calcium and phosphates are banked in bone and drawn out when the body needs them.', P.orange)}
    `),
  },

  jointClassification: {
    title: 'Three classes of joint',
    caption: 'Classified by what holds the two bones together, which is also what decides how much they can move.',
    svg: () => svg(250, `
      ${row([
        { t: 'Fibrous', b: 'Sutures (skull) · gomphosis (tooth in socket) · syndesmosis (inferior tibiofibular, united by an interosseous ligament)', tone: P.teal },
        { t: 'Cartilaginous', b: 'Synchondrosis — primary, temporary, ossifies about 25 years. Symphysis — secondary, fibrocartilage: intervertebral joints, pubic symphysis', tone: P.orange },
        { t: 'Synovial', b: 'Hinge · pivot · condylar · saddle · plane · ball-and-socket', tone: P.blue },
      ], 26, 130)}
      <g>
        <line x1="20" y1="180" x2="700" y2="180" stroke="${P.line}"/>
        ${arrow(20, 200, 700, 200, P.dim)}
        <text x="24" y="220" font-size="11" fill="${P.muted}">least movable — a suture is the least movable of those in the revision exercise</text>
        <text x="696" y="220" font-size="11" fill="${P.muted}" text-anchor="end">most movable</text>
      </g>
    `),
  },

  synovialJoint: {
    title: 'A synovial joint in section',
    caption: 'The parts the study manual names, and what each one is made of.',
    svg: () => svg(300, `
      <g>
        <path d="M150 30 C110 30 100 70 104 104 L104 130 C104 150 196 150 196 130 L196 104 C200 70 190 30 150 30 Z" fill="rgba(255,255,255,.05)" stroke="${P.line}"/>
        <path d="M104 130 C104 150 196 150 196 130 L196 140 C196 160 104 160 104 140 Z" fill="rgba(114,227,207,.35)" stroke="${P.teal}"/>
        <path d="M104 186 C104 166 196 166 196 186 L196 176 C196 156 104 156 104 176 Z" fill="rgba(114,227,207,.35)" stroke="${P.teal}"/>
        <path d="M150 286 C110 286 100 246 104 212 L104 186 C104 166 196 166 196 186 L196 212 C200 246 190 286 150 286 Z" fill="rgba(255,255,255,.05)" stroke="${P.line}"/>
        <rect x="106" y="152" width="88" height="16" fill="rgba(255,186,103,.28)"/>
        <path d="M96 120 C78 140 78 178 96 198" fill="none" stroke="${P.blue}" stroke-width="3"/>
        <path d="M204 120 C222 140 222 178 204 198" fill="none" stroke="${P.blue}" stroke-width="3"/>
        <path d="M100 126 C86 142 86 176 100 192" fill="none" stroke="${P.green}" stroke-width="1.6" stroke-dasharray="4 3"/>
        <path d="M200 126 C214 142 214 176 200 192" fill="none" stroke="${P.green}" stroke-width="1.6" stroke-dasharray="4 3"/>
        <ellipse cx="228" cy="106" rx="16" ry="8" fill="rgba(241,129,129,.25)" stroke="${P.red}"/>
      </g>
      <g stroke="${P.dim}" stroke-width="1" opacity=".7">
        <path d="M150 140 L300 96"/><path d="M150 160 L300 140"/><path d="M222 158 L300 184"/>
        <path d="M100 160 L300 228"/><path d="M240 106 L300 60"/>
      </g>
      <g>
        ${textBlock(306, 60, wrap('Bursa — a protrusion of synovial membrane that reduces friction, e.g. between tendon and bone.', 380), { size: 12, fill: P.red })}
        ${textBlock(306, 100, wrap('Articular cartilage — hyaline cartilage: wear-resistant, low-friction, lubricated.', 380), { size: 12, fill: P.teal })}
        ${textBlock(306, 144, wrap('Joint cavity holding synovial fluid — clear, colourless, secreted by the synovial membrane.', 380), { size: 12, fill: P.orange })}
        ${textBlock(306, 188, wrap('Synovial membrane — carries the vascular net that feeds the cartilage.', 380), { size: 12, fill: P.green })}
        ${textBlock(306, 232, wrap('Fibrous capsule — dense connective tissue cuff. Its localised thickenings are the joint ligaments.', 380), { size: 12, fill: P.blue })}
      </g>
      ${textBlock(20, 296, ['Cartilage is fed three ways: synovial fluid, the vascular net in the synovial membrane, and vessels in the marrow spaces underneath.'], { size: 11, fill: P.dim })}
    `),
  },

  synovialTypes: {
    title: 'Six synovial joint types',
    caption: 'Ordered by how many planes each one moves in — that is the whole classification.',
    svg: () => svg(276, `
      ${heading(20, 20, 'Monoaxial — one plane only')}
      ${row([
        { t: 'Hinge', b: 'Elbow; interphalangeal joints.', tone: P.teal },
        { t: 'Pivot', b: 'Rotation about one axis. Median atlanto-axial; proximal radioulnar.', tone: P.teal },
        { t: 'Plane', b: 'Gliding. Apophyseal (facet); acromioclavicular.', tone: P.teal },
      ], 30, 84)}
      ${heading(20, 148, 'Biaxial and triaxial')}
      ${row([
        { t: 'Condylar', b: 'Two planes. Radiocarpal (wrist); metacarpophalangeal joints.', tone: P.orange },
        { t: 'Saddle', b: 'Two planes plus opposition. Carpo-metacarpal joint of the thumb.', tone: P.orange },
        { t: 'Ball-and-socket', b: 'All three planes. Glenohumeral; hip.', tone: P.blue },
      ], 158, 84)}
      ${textBlock(20, 262, wrap('Monoaxial means movement in one plane only — that is the word the revision exercise uses.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  jointMovements: {
    title: 'Which joint gives which movement',
    caption: 'The movement is a property of the joint, not of the limb — match them one to one.',
    svg: () => svg(302, `
      ${[
        ['Elbow joint', 'Flexion and extension of the forearm', P.teal],
        ['Superior and inferior radioulnar joints', 'Supination and pronation', P.teal],
        ['Radiocarpal (wrist) joint', 'Abduction (radial flexion) and adduction (ulnar flexion)', P.orange],
        ['Carpo-metacarpal joint of the thumb', 'Flexion, extension, abduction, adduction, opposition', P.orange],
      ].map(([j, mv, tone], i) => `
        ${box(20, 24 + i * 54, 290, 44, j, '', tone)}
        ${arrow(314, 46 + i * 54, 356, 46 + i * 54)}
        ${box(360, 24 + i * 54, 340, 44, mv, '', tone)}
      `).join('')}
      ${textBlock(20, 256, wrap('Opposition = tip-to-tip contact of thumb with any finger; its opposite is reposition. Circumduction is a combination — flexion, abduction, lateral rotation, medial rotation, adduction, extension. Finger abduction is referenced to the middle finger; thumb movement to the palm.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  cellOrganisation: {
    title: 'Levels of organisation',
    caption: 'Each level is built from the one before it. The four tissue types are the hinge in the middle.',
    svg: () => svg(240, `
      ${[['Cell', 'somatic = all body cells; sex (germ) cells = sperm and oocyte'],
         ['Tissue', 'epithelial · connective · muscle · neural'],
         ['Organ', 'several tissue types working as one structure'],
         ['System', 'eleven of them']].map(([t, b], i) => `
        ${box(20 + i * 178, 30, 158, 74, t, b, i === 1 ? P.orange : P.teal)}
        ${i < 3 ? arrow(182 + i * 178, 67, 194 + i * 178, 67) : ''}`).join('')}
      ${heading(20, 132, 'The eleven organ systems')}
      ${textBlock(20, 150, wrap('integumentary · nervous · endocrine · skeletal · muscular · circulatory · immune · respiratory · urinary · digestive · reproductive', 680, 12), { size: 12 })}
      ${textBlock(20, 200, wrap('Epithelium: cellularity, polarity, attachment to a basement membrane, avascularity, regeneration. Blood is a connective tissue — that one catches people out.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  homeostasis: {
    title: 'The feedback loop',
    caption: 'Receptor, control centre, effector. Negative feedback returns the variable; positive feedback drives it further.',
    svg: () => svg(280, `
      ${box(40, 40, 180, 58, 'Receptor', 'detects the change', P.teal)}
      ${box(270, 40, 180, 58, 'Control centre', 'compares to the set point', P.teal)}
      ${box(500, 40, 180, 58, 'Effector', 'produces the response', P.teal)}
      ${arrow(224, 69, 266, 69)}
      ${arrow(454, 69, 496, 69)}
      <path d="M590 102 L590 150 L130 150 L130 102" fill="none" stroke="${P.orange}" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#ar)"/>
      <text x="360" y="144" font-size="11" fill="${P.orange}" text-anchor="middle">negative feedback — the response removes the original stimulus</text>
      ${box(40, 176, 300, 84, 'Autoregulation (intrinsic)', 'Automatic response within a cell, tissue or organ. No outside instruction needed.', P.blue)}
      ${box(380, 176, 300, 84, 'Extrinsic regulation', 'Controlled by the nervous and endocrine systems.', P.blue)}
      ${textBlock(40, 24, ['Homeostasis — all systems working together to keep the internal environment within a normal range'], { size: 12, fill: P.muted })}
    `),
  },

  circuits: {
    title: 'Two circuits, one pump',
    caption: 'Flow through the systemic circuit equals flow through the pulmonary circuit — they are in series, not in parallel.',
    svg: () => svg(300, `
      ${box(270, 118, 180, 74, 'HEART', 'right side fills the lungs, left side fills the body', P.red)}
      ${box(270, 24, 180, 56, 'LUNGS', 'gas exchange', P.blue)}
      ${box(270, 230, 180, 56, 'BODY', 'all other tissues', P.orange)}
      <path d="M300 118 L300 82" fill="none" stroke="${P.blue}" stroke-width="1.6" marker-end="url(#ar)"/>
      <path d="M420 82 L420 118" fill="none" stroke="${P.red}" stroke-width="1.6" marker-end="url(#ar)"/>
      <path d="M420 192 L420 228" fill="none" stroke="${P.red}" stroke-width="1.6" marker-end="url(#ar)"/>
      <path d="M300 228 L300 192" fill="none" stroke="${P.blue}" stroke-width="1.6" marker-end="url(#ar)"/>
      <text x="286" y="100" font-size="10" fill="${P.blue}" text-anchor="end">pulmonary</text>
      <text x="286" y="116" font-size="10" fill="${P.blue}" text-anchor="end">arteries</text>
      <text x="434" y="104" font-size="10" fill="${P.red}">pulmonary veins</text>
      <text x="434" y="216" font-size="10" fill="${P.red}">aorta</text>
      <text x="286" y="216" font-size="10" fill="${P.blue}" text-anchor="end">vena cavae</text>
      ${heading(20, 24, 'Pulmonary circuit')}
      ${textBlock(20, 42, wrap('Right ventricle → lungs → back to the heart.', 220), { size: 12, fill: P.blue })}
      ${heading(20, 90, 'Systemic circuit')}
      ${textBlock(20, 108, wrap('Left ventricle → body → back to the heart.', 220), { size: 12, fill: P.orange })}
      ${textBlock(20, 160, wrap('Right ventricle wall is thinner and pouch-shaped. The left ventricle is round and develops far more pressure — same volume, different job.', 230, 11), { size: 11, fill: P.dim })}
      ${heading(478, 24, 'The full loop')}
      ${textBlock(478, 42, wrap('vena cavae → right atrium → right ventricle → pulmonary arteries → lungs → pulmonary veins → left atrium → left ventricle → aorta', 220, 11), { size: 11 })}
    `),
  },

  conduction: {
    title: 'The cardiac conducting system',
    caption: 'The bundled circulatory model has no conducting tissue in it — this is the route the lecture describes.',
    svg: () => svg(290, `
      <g>
        <path d="M120 40 C70 40 50 100 60 160 C70 226 110 262 150 262 C190 262 230 226 240 160 C250 100 230 40 180 40 Z" fill="rgba(255,255,255,.04)" stroke="${P.line}"/>
        <path d="M150 60 L150 250" stroke="${P.line}" stroke-dasharray="4 4"/>
        <path d="M64 132 L236 132" stroke="${P.line}" stroke-dasharray="4 4"/>
        <circle cx="106" cy="72" r="7" fill="${P.orange}"/>
        <circle cx="132" cy="122" r="6" fill="${P.teal}"/>
        <path d="M132 128 L146 152 L146 200" fill="none" stroke="${P.teal}" stroke-width="2.4"/>
        <path d="M146 200 L104 236" fill="none" stroke="${P.teal}" stroke-width="2"/>
        <path d="M146 200 L196 236" fill="none" stroke="${P.teal}" stroke-width="2"/>
        <path d="M104 236 C92 246 88 250 86 254" fill="none" stroke="${P.green}" stroke-width="1.6"/>
        <path d="M196 236 C208 246 212 250 214 254" fill="none" stroke="${P.green}" stroke-width="1.6"/>
      </g>
      <g stroke="${P.dim}" opacity=".65"><path d="M112 70 L300 46"/><path d="M138 120 L300 106"/><path d="M150 172 L300 166"/><path d="M170 218 L300 222"/></g>
      ${textBlock(306, 42, wrap('SA node — posterior wall of the right atrium. Pacemaker cells set the heart rate.', 390), { size: 12, fill: P.orange, weight: 700 })}
      ${textBlock(306, 96, wrap('AV node — floor of the right atrium. Receives the impulse, then delays it.', 390), { size: 12, fill: P.teal, weight: 700 })}
      ${textBlock(306, 150, wrap('AV bundle (bundle of His) in the septum → left and right bundle branches.', 390), { size: 12, fill: P.teal, weight: 700 })}
      ${textBlock(306, 204, wrap('Purkinje fibres. The moderator band conducts to the papillary muscles.', 390), { size: 12, fill: P.green, weight: 700 })}
      ${textBlock(306, 252, wrap('The fibrous cardiac skeleton is why this dedicated route exists at all — the impulse cannot simply spread from atria to ventricles.', 390, 11), { size: 11, fill: P.dim })}
    `),
  },

  ecgCycle: {
    title: 'ECG, cycle and sounds',
    caption: 'Read the trace as three electrical events, then line the mechanical ones up underneath.',
    svg: () => svg(308, `
      <g>
        <line x1="20" y1="120" x2="700" y2="120" stroke="${P.line}"/>
        <path d="M20 120 L80 120 Q100 92 120 120 L160 120 L176 120 L184 152 L196 48 L208 140 L220 120 L280 120 Q312 84 344 120 L420 120 L480 120 Q500 92 520 120 L560 120 L576 120 L584 152 L596 48 L608 140 L620 120 L680 120"
          fill="none" stroke="${P.teal}" stroke-width="2"/>
      </g>
      <g font-size="11" fill="${P.orange}" text-anchor="middle">
        <text x="100" y="84">P</text><text x="196" y="40">QRS</text><text x="312" y="76">T</text>
      </g>
      <g stroke="${P.orange}" stroke-dasharray="3 3" opacity=".6">
        <line x1="80" y1="60" x2="80" y2="200"/><line x1="176" y1="60" x2="176" y2="200"/><line x1="344" y1="60" x2="344" y2="200"/>
      </g>
      ${arrow(80, 176, 176, 176, P.orange, 'P–R interval')}
      ${arrow(176, 200, 344, 200, P.orange, 'Q–T interval')}
      ${row([
        { t: 'P wave', b: 'atria depolarise', tone: P.teal },
        { t: 'QRS complex', b: 'ventricles depolarise', tone: P.teal },
        { t: 'T wave', b: 'ventricles repolarise', tone: P.teal },
      ], 214, 54)}
      ${textBlock(20, 276, wrap('Systole = contraction, diastole = relaxation. Ventricles follow the atria by 0.1–0.2 s. S1 is made by the AV valves, S2 by the semilunar valves. End-diastolic volume → stroke volume ejected → end-systolic volume left behind. Frank–Starling: more filling stretches the wall, which increases the force of contraction.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  bloodComposition: {
    title: 'Blood, spun down',
    caption: 'What separates out, in what proportion, and what the vessel wall carrying it is made of.',
    svg: () => svg(338, `
      <g>
        <rect x="40" y="30" width="70" height="240" rx="10" fill="none" stroke="${P.line}"/>
        <rect x="42" y="32" width="66" height="132" fill="rgba(255,186,103,.2)"/>
        <rect x="42" y="164" width="66" height="10" fill="rgba(240,238,231,.35)"/>
        <rect x="42" y="174" width="66" height="94" fill="rgba(241,129,129,.3)"/>
        <g font-size="10" fill="${P.muted}">
          <text x="120" y="96">plasma — about 55%</text>
          <text x="120" y="172">buffy coat: WBC + platelets</text>
          <text x="120" y="224">red cells — the haematocrit</text>
        </g>
      </g>
      ${textBlock(120, 244, wrap('Haematocrit 36–46% in women, 41–53% in men. Total volume about 5 L.', 250, 11), { size: 11, fill: P.dim })}
      ${box(400, 30, 300, 96, 'Three plasma protein types', 'Albumins 60–80% — create the colloid osmotic pressure that holds blood volume and pressure. Globulins — the gamma ones are antibodies. Fibrinogen — converts to fibrin.', P.orange)}
      ${box(400, 136, 300, 62, 'Serum', 'What is left when blood clots — plasma minus the clotting proteins.', P.dim)}
      ${heading(400, 224, 'Vessel wall, outside in')}
      <g transform="translate(400,232)">
        <rect x="0" y="0" width="300" height="20" rx="4" fill="rgba(114,227,207,.10)" stroke="${P.teal}" stroke-opacity=".5"/>
        <rect x="26" y="20" width="248" height="20" fill="rgba(114,227,207,.18)" stroke="${P.teal}" stroke-opacity=".5"/>
        <rect x="52" y="40" width="196" height="20" rx="4" fill="rgba(114,227,207,.3)" stroke="${P.teal}" stroke-opacity=".5"/>
        <g font-size="10" fill="${P.muted}"><text x="6" y="14">tunica externa</text><text x="32" y="34">tunica media</text><text x="58" y="54">tunica interna</text></g>
      </g>
      ${textBlock(20, 292, wrap('Capillaries are endothelium only. Small arteries and arterioles provide most of the resistance in the circulation.', 360, 11), { size: 11, fill: P.dim })}
    `),
  },

  gasTransport: {
    title: 'Where the gas actually crosses',
    caption: 'Below the resolution of the organ model: the alveolar wall, and the reflex loop that sets how often you breathe.',
    svg: () => svg(320, `
      <g>
        <circle cx="130" cy="106" r="72" fill="rgba(255,255,255,.04)" stroke="${P.line}"/>
        <path d="M60 106 C60 66 96 34 130 34" fill="none" stroke="${P.teal}" stroke-width="4"/>
        <circle cx="96" cy="60" r="7" fill="rgba(255,186,103,.5)" stroke="${P.orange}"/>
        <circle cx="150" cy="44" r="6" fill="rgba(140,226,174,.5)" stroke="${P.green}"/>
        <path d="M206 60 C230 90 230 122 206 152" fill="none" stroke="${P.red}" stroke-width="5"/>
        ${arrow(160, 92, 200, 92, P.blue, 'O₂')}
        ${arrow(200, 124, 160, 124, P.blue, 'CO₂')}
      </g>
      <g font-size="11" fill="${P.muted}">
        <text x="30" y="196">alveolus</text><text x="196" y="196">capillary</text>
      </g>
      ${textBlock(250, 40, wrap('Type I pneumocytes — thin; most gas exchange happens across them.', 210, 11), { size: 11, fill: P.teal })}
      ${textBlock(250, 92, wrap('Type II pneumocytes — produce surfactant.', 210, 11), { size: 11, fill: P.orange })}
      ${textBlock(250, 132, wrap('Alveolar macrophages — the dust cells.', 210, 11), { size: 11, fill: P.green })}
      ${box(478, 24, 222, 92, 'Oxygen transport', 'O₂ binds the iron ions of haemoglobin to form oxyhaemoglobin. Saturation = the percentage of heme units carrying bound oxygen.', P.red)}
      ${heading(20, 224, 'Control of respiration')}
      ${row([
        { t: 'Respiratory centres', b: 'Ventral and dorsal groups set pace and depth; the pneumotaxic centre modifies the pace.', tone: P.blue },
        { t: 'Peripheral chemoreceptors', b: 'Glossopharyngeal (CN IX) from the carotid bodies; vagus (CN X) from the aortic bodies.', tone: P.blue },
        { t: 'Central chemoreceptors', b: 'Ventrolateral medulla oblongata, monitoring CSF. Respond to PCO₂, PO₂ or pH.', tone: P.blue },
      ], 234, 54)}
    `),
  },

  nephron: {
    title: 'The nephron, in order',
    caption: 'One tubule, six named segments. Get the order and the gross path follows.',
    svg: () => svg(300, `
      <g>
        <circle cx="72" cy="70" r="26" fill="rgba(241,129,129,.25)" stroke="${P.red}"/>
        <circle cx="72" cy="70" r="13" fill="rgba(241,129,129,.5)"/>
        <path d="M98 70 C140 70 140 40 178 40 C210 40 210 78 186 78 L186 150 C186 196 232 196 232 150 L232 78 C232 42 268 42 268 74 C268 104 300 104 300 74" fill="none" stroke="${P.teal}" stroke-width="3.2"/>
        <path d="M300 74 L300 200" fill="none" stroke="${P.orange}" stroke-width="4"/>
      </g>
      <g stroke="${P.dim}" opacity=".6">
        <path d="M72 100 L72 132"/><path d="M170 34 L170 16"/><path d="M186 120 L150 120"/><path d="M232 120 L262 120"/><path d="M290 60 L280 40"/><path d="M304 160 L330 160"/>
      </g>
      <g font-size="10" fill="${P.muted}">
        <text x="20" y="148">glomerular capsule</text>
        <text x="120" y="12">proximal convoluted tubule</text>
        <text x="146" y="124" text-anchor="end">descending</text>
        <text x="266" y="124">ascending</text>
        <text x="278" y="34" text-anchor="middle">distal convoluted tubule</text>
        <text x="336" y="164">collecting duct</text>
      </g>
      ${box(400, 24, 300, 78, 'Renal corpuscle', 'Glomerulus + glomerular (Bowman’s) capsule. This is where glomerular filtration happens.', P.red)}
      ${box(400, 112, 300, 78, 'Cortex and medulla', 'Cortex holds capillaries and the outer nephron parts. Medulla holds the renal pyramids, separated by renal columns.', P.teal)}
      ${box(400, 200, 300, 74, 'Then out', 'Minor calyces unite into a major calyx → kidney → ureter → bladder → urethra. The bladder wall muscle is the detrusor.', P.orange)}
      ${textBlock(20, 218, wrap('Over one million nephrons per kidney. GFR averages 115 ml/min in women, 125 ml/min in men — about 180 L a day, of which only 1–2 L is excreted.', 360, 11), { size: 11, fill: P.dim })}
    `),
  },

  endocrineDelivery: {
    title: 'Four ways a hormone arrives',
    caption: 'The difference is only how far the signal travels and whether blood carries it.',
    svg: () => svg(272, `
      ${row([
        { t: 'Autocrine', b: 'Same cell. No blood involved.', tone: P.teal },
        { t: 'Paracrine', b: 'Adjacent cells through extracellular space. Blood not directly involved.', tone: P.teal },
        { t: 'Endocrine', b: 'The classical mode — delivered by the blood.', tone: P.orange },
        { t: 'Neuroendocrine', b: 'Produced by a neuron, delivered by the bloodstream.', tone: P.orange },
      ], 26, 100)}
      ${textBlock(20, 156, wrap('Hormone = a chemical transferring information and instructions between cells.', 680, 12), { size: 12 })}
      ${heading(20, 190, 'Four hormone functions')}
      ${textBlock(20, 208, wrap('growth and development · control tissue function · support reproduction · regulate metabolism', 680, 12), { size: 12 })}
      ${textBlock(20, 240, wrap('Endocrine glands are ductless. A cell is a target only because it carries the receptor protein — proximity has nothing to do with it.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  nervousDivisions: {
    title: 'Dividing the nervous system',
    caption: 'Split by location first, then by what the neurons do.',
    svg: () => svg(280, `
      ${box(240, 20, 240, 44, 'Nervous system', '', P.dim)}
      ${arrow(300, 64, 180, 88)} ${arrow(420, 64, 540, 88)}
      ${box(20, 90, 300, 52, 'CNS', 'Brain + spinal cord. The adult brain holds almost 97% of neural tissue.', P.teal)}
      ${box(400, 90, 300, 52, 'PNS', 'Somatic + autonomic nervous systems.', P.orange)}
      ${heading(20, 168, 'Three classes of neuron')}
      ${row([
        { t: 'Sensory', b: 'Receptors → CNS.', tone: P.blue },
        { t: 'Motor', b: 'CNS → target organs: muscles or glands.', tone: P.blue },
        { t: 'Association / interneuron', b: 'Entirely within the CNS, integrating function.', tone: P.blue },
      ], 178, 62)}
      ${textBlock(20, 262, wrap('Somatic motor neurons: reflexes and voluntary control of skeletal muscle. Autonomic motor neurons: smooth muscle, cardiac muscle and glands, via sympathetic and parasympathetic divisions.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  muscleTypes: {
    title: 'Three muscle tissues',
    caption: 'Four properties they all share; four features that tell them apart.',
    svg: () => svg(268, `
      ${heading(20, 20, 'Shared by all three')}
      ${textBlock(20, 38, wrap('contractility · excitability · extensibility · elasticity', 680, 13), { size: 13, fill: P.orange })}
      ${row([
        { t: 'Skeletal', b: 'On bones. Multiple peripheral nuclei. Striated. Voluntary, and reflex.', tone: P.teal },
        { t: 'Smooth', b: 'Hollow organ walls. Single central nucleus. Not striated. Involuntary. Gap junctions in visceral smooth muscle.', tone: P.teal },
        { t: 'Cardiac', b: 'Heart. Single central nucleus. Striated. Involuntary. Intercalated discs.', tone: P.teal },
      ], 62, 116)}
      ${textBlock(20, 202, wrap('Sarcomeres are the contractile units of skeletal muscle, between two Z discs. The sarcoplasmic reticulum stores Ca²⁺.', 400, 11), { size: 11, fill: P.dim })}
      ${textBlock(440, 202, wrap('Skeletal muscle is about 40% of body weight in males, 32% in females.', 260, 11), { size: 11, fill: P.dim })}
    `),
  },

  muscleAction: {
    title: 'Origin, insertion, agonist, antagonist',
    caption: 'Two attachments and two roles. The bone that moves is the one that names the insertion.',
    svg: () => svg(270, `
      <g>
        <rect x="60" y="40" width="26" height="150" rx="8" fill="rgba(255,255,255,.05)" stroke="${P.line}"/>
        <rect x="150" y="120" width="150" height="24" rx="10" fill="rgba(255,255,255,.05)" stroke="${P.line}" transform="rotate(20 150 132)"/>
        <path d="M74 60 C104 66 128 96 146 124" fill="none" stroke="${P.teal}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="74" cy="58" r="6" fill="${P.orange}"/>
        <circle cx="150" cy="128" r="6" fill="${P.green}"/>
      </g>
      ${textBlock(20, 214, wrap('Origin — the attachment on the bone that does not move, closer to the body.', 170, 11), { size: 11, fill: P.orange })}
      ${textBlock(200, 214, wrap('Insertion — the attachment on the bone that moves, distal to the body.', 170, 11), { size: 11, fill: P.green })}
      ${box(400, 30, 300, 74, 'Agonist', 'The main muscle producing the movement — the one contracting.', P.teal)}
      ${box(400, 114, 300, 74, 'Antagonist', 'The opposing muscle. Flexors and extensors are antagonists to each other.', P.orange)}
      ${textBlock(400, 214, wrap('Flexor decreases the joint angle; extensor increases it. More fibres per motor unit means less precise control.', 300, 11), { size: 11, fill: P.dim })}
    `),
  },

  innateAdaptive: {
    title: 'Innate and adaptive',
    caption: 'One is present from birth and treats everything alike; the other is built after exposure and is specific.',
    svg: () => svg(326, `
      ${box(20, 24, 330, 74, 'Innate — nonspecific', 'The same response to any agent. Present from birth.', P.teal)}
      ${box(370, 24, 330, 74, 'Adaptive — specific', 'Depends on lymphocytes. Develops after exposure.', P.orange)}
      ${heading(20, 128, 'Seven innate categories')}
      ${row([
        { t: 'Physical barriers', b: '', tone: P.teal }, { t: 'Phagocytes', b: '', tone: P.teal },
        { t: 'Immune surveillance', b: '', tone: P.teal }, { t: 'Interferons', b: '', tone: P.teal },
      ], 138, 40)}
      ${row([
        { t: 'Complement', b: '', tone: P.teal }, { t: 'Inflammatory response', b: '', tone: P.teal },
        { t: 'Fever', b: '', tone: P.teal },
      ], 186, 40)}
      ${textBlock(20, 250, wrap('Microphages = neutrophils and eosinophils; macrophages derive from monocytes. Fixed macrophages (histiocytes) include microglia in the CNS and Kupffer cells in liver sinusoids; alveolar macrophages are free. NK cells release perforins that lyse the abnormal membrane. Interferons trigger antiviral proteins that block replication rather than killing viruses. Pathogens carry PAMPs, recognised by toll-like receptors — a class of pattern-recognition receptor.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  immuneAdaptive: {
    title: 'Inflammation',
    caption: 'Four signs, three effects, three products — the whole of what the lecture asks for.',
    svg: () => svg(230, `
      ${heading(20, 20, 'Four signs')}
      ${row([
        { t: 'Swelling', b: 'tumor', tone: P.red }, { t: 'Redness', b: 'rubor', tone: P.red },
        { t: 'Heat', b: 'calor', tone: P.red }, { t: 'Pain', b: 'dolor', tone: P.red },
      ], 30, 56)}
      ${heading(20, 110, 'Three effects')}
      ${row([
        { t: 'Temporary repair and barrier', b: '', tone: P.teal },
        { t: 'Retarding the spread', b: '', tone: P.teal },
        { t: 'Mobilising defences, facilitating repair', b: '', tone: P.teal },
      ], 120, 52)}
      ${heading(20, 196, 'Products')}
      ${textBlock(120, 204, wrap('necrosis · pus · abscess', 500, 13), { size: 13, fill: P.orange })}
    `),
  },

  radiographyRoles: {
    title: 'Who does what',
    caption: 'The word itself tells you what the job is; the roles around it are separate professions.',
    svg: () => svg(250, `
      ${box(20, 24, 320, 58, 'radio-', 'radial spread-out of energy — radiation', P.orange)}
      ${box(360, 24, 340, 58, '-graphy', 'snapshot, photo', P.orange)}
      ${box(20, 94, 680, 50, 'Radiography', 'The art and science of using ionizing radiation to create images of the body and its inner structures.', P.teal)}
      ${heading(20, 176, 'Three distinct roles')}
      ${row([
        { t: 'Radiographer', b: 'Takes the radiographs.', tone: P.blue },
        { t: 'Radiotherapist', b: 'Plans and switches on the beam for treatments.', tone: P.blue },
        { t: 'Radiation chemist / pharmacist', b: 'Prepares radiopharmaceuticals.', tone: P.blue },
      ], 186, 56)}
    `),
  },

  emSpectrum: {
    title: 'Ionizing or not',
    caption: 'The dividing line is one ability: can it free an outer-shell electron?',
    svg: () => svg(280, `
      <g>
        <rect x="20" y="30" width="330" height="30" rx="6" fill="rgba(114,227,207,.14)" stroke="${P.teal}" stroke-opacity=".5"/>
        <rect x="360" y="30" width="340" height="30" rx="6" fill="rgba(255,186,103,.14)" stroke="${P.orange}" stroke-opacity=".5"/>
        <text x="34" y="50" font-size="12" fill="${P.teal}" font-weight="700">NON-IONIZING</text>
        <text x="686" y="50" font-size="12" fill="${P.orange}" font-weight="700" text-anchor="end">IONIZING</text>
        <line x1="355" y1="22" x2="355" y2="70" stroke="${P.red}" stroke-width="2"/>
        <text x="355" y="84" font-size="11" fill="${P.red}" text-anchor="middle">ionization — the ability to free outer-shell electrons</text>
      </g>
      ${box(20, 100, 330, 92, 'Non-ionizing modalities', 'Magnetic resonance imaging · ultrasonography. Units: W/kg and tesla.', P.teal)}
      ${box(360, 100, 340, 92, 'Ionizing modalities', 'General X-ray · fluoroscopy/angiography · mammography · computed tomography · radionuclide imaging. Units: J/kg, gray, sievert.', P.orange)}
      ${textBlock(20, 214, wrap('Other ionizing sources listed: high-energy ultraviolet, characteristic X-ray, electron beams, radioisotopes.', 330, 11), { size: 11, fill: P.dim })}
      ${textBlock(360, 214, wrap('MRI uses a magnetic field (permanent or superconductor magnet) and radiofrequency at 6–340 MHz, exploiting water (hydrogen) resonance. Good soft-tissue contrast, and non-ionizing.', 340, 11), { size: 11, fill: P.dim })}
    `),
  },

  modalities: {
    title: 'Four modalities in detail',
    caption: 'What each one produces, and what it costs you to get it.',
    svg: () => svg(318, `
      ${row([
        { t: 'General X-ray', b: 'Roentgen 1895, Nobel 1901. Film: developing → fixation → washing → drying.', tone: P.teal },
        { t: 'Fluoroscopy', b: 'Edison 1896. Real-time and intraoperative: angiography, stent installation, bone cement, digestive function.', tone: P.teal },
        { t: 'Digital capture', b: 'Computed radiography since the 1980s — needs readers, PACS-compatible. Direct digital — no readers, time-saving, no films, expensive.', tone: P.orange },
        { t: 'Nuclear medicine', b: 'Radiopharmaceutical = a radioisotope plus a specific compound.', tone: P.orange },
      ], 24, 140)}
      ${textBlock(20, 180, wrap('Contrast agents: oral barium sulfate solution; intravenous ionic vs non-ionic.', 680, 11), { size: 11, fill: P.dim })}
      ${heading(20, 204, 'SPECT vs PET')}
      ${box(20, 214, 330, 88, 'SPECT', 'Gamma emitters, longer half-lives, less expensive, widely available. Technetium-99m: 6.02 hours, gamma.', P.blue)}
      ${box(370, 214, 330, 88, 'PET', 'Positron emitters, very short half-lives, more quantitative, expensive, cyclotron-dependent. Fluorine-18: 109.75 minutes, positron.', P.blue)}
    `),
  },

  modalityBestUse: {
    title: 'What each one is for',
    caption: 'Match on the physics: what the modality is sensitive to decides what it is good at.',
    svg: () => svg(250, `
      ${row([
        { t: 'X-ray', b: 'Dense structure — bone and gross chest anatomy.', tone: P.teal },
        { t: 'Fluoroscopy', b: 'Anything that has to be watched moving, in real time.', tone: P.teal },
        { t: 'CT', b: 'Cross-sectional detail, quickly.', tone: P.orange },
        { t: 'MRI', b: 'Soft-tissue contrast, without ionizing radiation.', tone: P.orange },
        { t: 'Nuclear medicine', b: 'Function rather than structure.', tone: P.blue },
      ], 30, 120)}
      ${textBlock(20, 180, wrap('Ultrasonography is the other non-ionizing modality. Note the trade the table keeps making: the modalities that show soft tissue best are the ones that either take longest or cost most.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  radioprotection: {
    title: 'Four measures, and the limits',
    caption: 'Time, distance, shielding, decay — then ALARA on top of all four.',
    svg: () => svg(342, `
      ${row([
        { t: 'Time', b: 'Less time in the beam.', tone: P.teal },
        { t: 'Distance', b: 'Works through the inverse square law.', tone: P.teal },
        { t: 'Shielding', b: 'Put material in the way.', tone: P.teal },
        { t: 'Decay', b: 'Half-life — physical, biological and effective.', tone: P.teal },
      ], 26, 92)}
      <g transform="translate(20,132)">
        <circle cx="30" cy="40" r="7" fill="${P.orange}"/>
        <path d="M40 40 L300 40" stroke="${P.orange}" stroke-opacity=".4" stroke-dasharray="3 4"/>
        <g font-size="10" fill="${P.muted}">
          <text x="86" y="26" text-anchor="middle">1 m</text><text x="86" y="60" text-anchor="middle">×1</text>
          <text x="166" y="26" text-anchor="middle">2 m</text><text x="166" y="60" text-anchor="middle">×¼</text>
          <text x="246" y="26" text-anchor="middle">4 m</text><text x="246" y="60" text-anchor="middle">×¹⁄₁₆</text>
        </g>
        <text x="0" y="86" font-size="11" fill="${P.orange}">inverse square law</text>
      </g>
      ${box(360, 132, 340, 50, 'ALARA', 'As low as reasonably achievable.', P.orange)}
      ${heading(360, 204, 'Dose limits')}
      ${textBlock(360, 222, wrap('Worker: 20 mSv/year averaged over five consecutive years; 50 mSv in any single year; 1 mSv if pregnancy is declared. Public: 1 mSv in a year.', 340, 11), { size: 11 })}
      ${textBlock(20, 258, wrap('TLD detection range 0.05 mSv – 10 Sv, so it is not feasible for accidental exposure. Damage paradigm: stochastic and deterministic effects. Medical needs account for over 90% of artificial radiation exposure.', 320, 11), { size: 11, fill: P.dim })}
    `),
  },

  radiotherapyPath: {
    title: 'The radiation therapy pathway',
    caption: 'Three planning steps before any beam is switched on.',
    svg: () => svg(330, `
      ${chain([
        { t: 'Referral to clinical oncology', b: 'Not every patient with cancer is referred.', tone: P.dim },
        { t: 'Step 1 — treatment position', b: 'Determined with personalised immobilisation devices. Weighed on comfort, treatment accuracy, planning feasibility and reproducibility.', tone: P.teal },
        { t: 'Step 2 — simulation', b: 'Acquire images for planning and simulate the real setup.', tone: P.teal },
        { t: 'Step 3 — RT treatment planning', b: '', tone: P.teal },
      ], { y: 22, h: 46, gap: 14 })}
      ${textBlock(20, 268, wrap('Hong Kong title: radiation therapist, previously therapeutic radiographer. In the USA the roles split differently — radiologic technologists, and dosimetrists who do planning and dose calculation. Twelve RT centres in Hong Kong: six public (QMH, PYNEH, QEH, PMH, PWH, TMH) and six private, with about 420 registered radiation therapists.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },

  requestForm: {
    title: 'The department and the request',
    caption: 'Who is in the room, and what the form has to tell them.',
    svg: () => svg(290, `
      ${heading(20, 20, 'Staffing example')}
      ${row([
        { t: '29 radiologists', b: '', tone: P.blue },
        { t: '84 radiographers', b: 'A pair per room: one handles the patient, one controls the panel.', tone: P.blue },
        { t: '16 nurses / PCAs', b: 'PCA prepares the patient; a nurse is involved in CT, MRI and A&E.', tone: P.blue },
      ], 30, 78)}
      ${heading(380, 128, 'Request form fields')}
      ${textBlock(380, 146, wrap('clinical information · diagnosis · examination requested · priority · transport · drug allergy · LMP', 320, 12), { size: 12 })}
      ${box(20, 128, 340, 96, 'Worked example', 'A chest X-ray specified as PA + Lat. Those are the only two projection abbreviations that appear anywhere in the supplied lecture set.', P.orange)}
      ${textBlock(20, 250, wrap('Hospital Authority: 7 clusters, 39 departments of radiology, 16 A&E radiology services, 6 clinical oncology centres. About 800 diagnostic radiographers and 180–200 radiotherapists.', 680, 11), { size: 11, fill: P.dim })}
    `),
  },
};

export function schematic(id) { return SCHEMATICS[id] || null; }
