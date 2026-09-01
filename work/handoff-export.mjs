/*
 * Turn the unread manifest into a folder another AI can actually read.
 *
 * unread-manifest.mjs answers "what has nobody judged yet". It names gzipped
 * cache files, which is right for a work list and useless for a handoff: a chat
 * assistant cannot open a .gz, and the drive paths it names are on a Google
 * Drive that only this machine has mounted.
 *
 * So this writes PLAIN .txt, one per distinct document, into a folder that can
 * be dragged into another assistant wholesale.
 *
 * Two things in the output exist purely so the returned notes can be CHECKED,
 * and neither is decoration:
 *
 *   the header block   carries the exact SOURCE name and drive path. A note
 *                      that comes back naming a document I cannot resolve to a
 *                      catalogued file cannot become a sourceRef, and the
 *                      source-traceability rule makes it unusable.
 *
 *   [[page N]] markers the extractor keeps form feeds; nothing downstream can
 *                      read them. Made explicit, the other assistant can cite a
 *                      page, and work/source-check.mjs then verifies the quote
 *                      really is on that page — the same check that caught
 *                      resolveSource handing ten physiology sources the wrong
 *                      lecture's text.
 *
 * Without those two, the returned work is a pile of plausible sentences with no
 * way to tell the sound ones from the invented ones.
 *
 * Usage:
 *   node work/handoff-export.mjs                     teaching-shaped Sem 1 docs
 *   node work/handoff-export.mjs --shape=EXAM        past papers instead
 *   node work/handoff-export.mjs --manifest=all      every subject
 *   node work/handoff-export.mjs --batch=40          files per upload folder
 *   node work/handoff-export.mjs --kind=student      include what is excluded
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WORK = dirname(fileURLToPath(import.meta.url));
const CACHE = join(WORK, '.source-text');

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`)) || `=${d}`).split('=').pop();
const SCOPE = arg('manifest', 'sem1');
const SHAPES = arg('shape', 'PROSE,SLIDES').split(',');
const BATCH = Number(arg('batch', 40));
const OUT = join(CACHE, 'handoff');

const manifest = join(CACHE, `UNREAD-MANIFEST-${SCOPE}.tsv`);
if (!existsSync(manifest)) {
  console.error(`no manifest at ${manifest} — run: node work/unread-manifest.mjs${SCOPE === 'all' ? ' --all' : ''}`);
  process.exit(1);
}

const lines = readFileSync(manifest, 'utf8').trim().split('\n');
const head = lines[0].split('\t');
const rows = lines.slice(1).map((l) => Object.fromEntries(l.split('\t').map((v, i) => [head[i], v])));

/*
 * Two kinds are held back by default, for different reasons.
 *
 * student   marked coursework, and the drive names the files after the people
 *           who wrote them — "19048843D_Yum_Ka_Wing_Assignment.docx". Handing
 *           those to an outside service sends a named third party's schoolwork
 *           somewhere they never agreed to, which is not a call this script
 *           gets to make quietly. They are also answers, not teaching: a claim
 *           traced to a classmate's assignment inherits whatever that student
 *           got wrong.
 *
 * admin     timetables and rubrics. Nothing to learn.
 *
 * --kind=student overrides, deliberately explicitly.
 */
const SKIP_KIND = new Set(['student', 'admin']);
for (const k of arg('kind', '').split(',')) SKIP_KIND.delete(k);

/* Only READABLE rows can be exported: NEEDS-OCR rows have no text by
   definition, and their whole point is that the work happens on the drive. */
const want = rows
  .filter((r) => r.status === 'READABLE' && SHAPES.includes(r.shape) && !SKIP_KIND.has(r.kind))
  /* Lecture material first, so a reader who stops after two batches has read
     the two most valuable ones. Alphabetical order put 40 student assignments
     in batch-01 and the lecturer's slides in batch-09. */
  .sort((a, b) => (rank(a) - rank(b)) || Number(b.chars) - Number(a.chars));

function rank(r) {
  if (r.kind === 'primary') return 0;      /* lecture decks, official handouts */
  if (r.kind === '-') return 1;            /* unclassified — often lecture too */
  if (r.kind === 'assessment') return 2;   /* tutorials, revision sheets       */
  return 3;
}
if (!want.length) { console.error(`no ${SHAPES.join('/')} rows in ${manifest}`); process.exit(1); }

/* A fresh folder every run: a stale file from a previous scope silently
   enlarges the upload, and nothing in the folder says which run wrote it. */
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const safe = (s) => s.replace(/\.[a-z0-9]+$/i, '').replace(/[^\w\- ]+/g, '_').replace(/\s+/g, ' ').trim().slice(0, 70);

let n = 0, chars = 0, batches = 0;
const index = [['batch', 'file', 'subject', 'kind', 'shape', 'pages', 'source'].join('\t')];
for (const r of want) {
  let text;
  try { text = gunzipSync(readFileSync(join(WORK, '..', r.textFile))).toString('utf8'); } catch { continue; }

  /* Page markers, from the form feeds the extractor preserved. Numbered from 1
     so a returned "p. 12" means what a reader opening the PDF would call p. 12. */
  const paged = text.split('\f').map((p, i) => `\n[[page ${i + 1}]]\n${p.trim()}`).join('\n');

  const batch = String(Math.floor(n / BATCH) + 1).padStart(2, '0');
  batches = Math.max(batches, Number(batch));
  const dir = join(OUT, `batch-${batch}`);
  mkdirSync(dir, { recursive: true });

  const header = [
    '===== DOCUMENT HEADER — quote these values back verbatim =====',
    `SOURCE: ${r.name}`,
    `SUBJECT: ${r.subject}`,
    `SHAPE: ${r.shape}`,
    `PAGES: ${r.pages}`,
    `DRIVE: ${r.drivePath}`,
    '===== END HEADER — document text follows =====',
  ].join('\n');

  const file = `${r.subject}__${safe(r.name)}.txt`;
  writeFileSync(join(dir, file), `${header}\n${paged}\n`, 'utf8');
  index.push([`batch-${batch}`, file, r.subject, r.kind, r.shape, r.pages, r.name].join('\t'));
  n++; chars += text.length;
}

writeFileSync(join(OUT, 'EXTRACTION-PROMPT.md'), PROMPT(), 'utf8');
writeFileSync(join(OUT, 'INDEX.tsv'), `${index.join('\n')}\n`, 'utf8');

const byKind = {};
for (const r of want) byKind[r.kind] = (byKind[r.kind] || 0) + 1;

console.log(`${n} documents, ${(chars / 1048576).toFixed(1)} MB of text, ${batches} batches of <=${BATCH}`);
console.log(`shapes: ${SHAPES.join(', ')}   scope: ${SCOPE}`);
console.log(`kinds:  ${Object.entries(byKind).map(([k, v]) => `${k} ${v}`).join(', ')}`);
if (SKIP_KIND.size) console.log(`held back: ${[...SKIP_KIND].join(', ')} (--kind=<name> to include)`);
console.log(`\n-> ${OUT}`);
console.log(`   upload one batch-NN folder at a time, with EXTRACTION-PROMPT.md`);

/*
 * The prompt ships INSIDE the folder rather than living in a chat message,
 * because the folder is what gets handed over and a prompt that arrives
 * separately gets lost or half-pasted.
 */
function PROMPT() {
  return `# Extraction brief

You are reading university course material for a first-year diagnostic radiography
student (HSS2011 Human Anatomy, ABCT2326 Human Physiology, HTI17103 Radiography
Profession). Your notes will be fed into a study app whose single hard rule is
that **every factual claim must be traceable to a named document and a page
number**, and this is checked mechanically afterwards. An unciteable note is
discarded, however true it is.

## What to do with each file

Each \`.txt\` begins with a DOCUMENT HEADER giving \`SOURCE\`, \`SUBJECT\` and
\`PAGES\`. The body is marked up with \`[[page N]]\` before each page.

For each file, output one block in exactly this format:

\`\`\`
## SOURCE: <copy the SOURCE line verbatim>
SUBJECT: <copy>
VERDICT: TEACHES | DUPLICATE | ADMIN | THIN

### <topic heading>
- CLAIM: <one sentence, in plain English, that a student could be examined on>
  PAGE: <the N from the nearest [[page N]] above the sentence you used>
  QUOTE: "<= 20 words copied exactly from that page>"
\`\`\`

Repeat \`### topic\` / \`- CLAIM\` as many times as the document supports.

## The verdict, first

Before extracting, judge the document and say which it is:

- **TEACHES** — real subject content. Extract from it.
- **DUPLICATE** — the same lecture or chapter as another file in this batch,
  under a different name. Name the file it duplicates and extract nothing.
- **ADMIN** — timetables, marking rubrics, lab safety forms, group lists,
  assignment briefs. Extract nothing.
- **THIN** — a title page, an index, a handful of images with no prose.
  Extract nothing.

Getting this wrong in the direction of "extract anyway" is worse than useless:
it fills the app with course-admin trivia that looks like syllabus.

## Rules for CLAIM lines

1. **Teach the thing, do not describe the slide.** Write "The scaphoid is the
   most commonly fractured carpal bone", never "This slide covers carpal
   fractures".
2. **PAGE must be the page the QUOTE is on.** Count \`[[page N]]\` markers. This
   is verified against the original file; a wrong page voids the claim.
3. **QUOTE is copied, not paraphrased**, 20 words maximum, and must appear on
   that page character-for-character apart from whitespace. If no single short
   span supports the claim, drop the claim.
4. **Nothing from outside the file.** Do not complete a half-covered topic from
   your own knowledge, do not correct the lecturer, do not add the textbook
   version. If the document is wrong or partial, extract what it says.
5. **Skip anything already obvious** at the level of secondary-school biology —
   that the heart pumps blood, that bones are hard. Extract what a first-year
   would not already know.
6. **Numbers, names, values and classifications are the priority.** Normal
   ranges, counts, nerve roots, muscle attachments, exposure factors, projection
   names, hormone targets. These are what gets examined and what generic
   knowledge cannot supply.
7. **No images.** If a claim depends on reading a figure, skip it — the text
   file has no figure.

## What not to bother with

Do not summarise the document. Do not write an introduction or a conclusion. Do
not rank or grade the material. Do not suggest study strategies. The output is
consumed by a program, and prose around the blocks has to be stripped out by
hand.

## If a document is unreadable

Output the SOURCE line and \`VERDICT: THIN\` with a one-line reason. Garbled
extraction is expected in a minority of files; do not attempt to reconstruct it.
`;
}
