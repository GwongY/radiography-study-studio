/*
 * Does every source the corpus cites actually exist on the drive?
 *
 * CLAUDE.md's first hard rule is that every factual study claim cites a
 * sourceRefs entry "keyed to a file that actually exists in the supplied source
 * folders". Until there was a catalogue, that rule was enforced by hand — which
 * is to say it was enforced by remembering. A file that was renamed, moved
 * between shared folders, or never existed under the name written down would
 * sit in SOURCE_FILES indefinitely, and every claim citing it would look
 * sourced while pointing at nothing.
 *
 * This checks the registry against work/source-catalogue.json:
 *
 *   found        a document with that filename exists, in the folder claimed
 *   moved        it exists, but not where SOURCE_FILES says — the path is stale
 *   missing      nothing of that name anywhere in 8,801 catalogued documents
 *
 * `moved` is a warning, not a failure: the shared folders get reorganised and
 * the file is still there to read. `missing` is a failure — it means a claim
 * cites something unreadable.
 *
 * NOT EVERY CITATION IS ONE FILENAME
 *
 * The first version of this check reported six failures and every one of them
 * was the check being wrong, which is the exact failure mode this repo keeps
 * finding: a test that locates its subject by pattern and quietly reports
 * nonsense the moment the subject is shaped differently. A `file` value is any
 * of four things, and each needs its own question asked:
 *
 *   file      one document           -> is there a document of that name?
 *   folder    a set cited as a unit  -> "Exam Past paper by year 2003-2013/
 *             (11 papers)", "question blank/Chapter 1-29.pdf". Ask whether the
 *             FOLDER exists, and report how much is in it.
 *   image     photographs of pages   -> the catalogue indexes documents, not
 *             JPGs. Unverifiable here by construction; say so rather than
 *             calling it missing.
 *   external  not from the drive     -> the EDB syllabus is fetched from
 *             edb.gov.hk and SOURCE_ROOTS says so in as many words. Absence
 *             from the shared folders is correct, not a fault.
 *
 * Needs only the committed catalogue, so it runs without the drive mounted.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOURCE_FILES, SOURCE_ROOTS } from '../outputs/study/corpus/schema.js';

const WORK = dirname(fileURLToPath(import.meta.url));
const CATALOGUE = join(WORK, 'source-catalogue.json');

if (!existsSync(CATALOGUE)) {
  console.log('no work/source-catalogue.json — run: node work/build-source-catalogue.mjs');
  console.log('(needs the shared drive mounted; the catalogue is committed so this check does not)');
  process.exit(0);
}
const cat = JSON.parse(readFileSync(CATALOGUE, 'utf8'));

/* Filename is the only reliable join. The drive holds the same document under
   several shared folders, so a name maps to a list of locations. */
const byName = new Map();
for (const d of cat.docs) {
  const k = d.n.toLowerCase();
  if (!byName.has(k)) byName.set(k, []);
  byName.get(k).push(d);
}
/* "<shared folder>/<path below it>" for every copy of a document. */
const locations = (d) => d.at.map(([ri, p]) => `${ri < 0 ? '?' : cat.roots[ri].split('/').pop()}/${p}`);

/* Every folder path the catalogue knows about, for folder-shaped citations. */
const folders = new Set();
for (const d of cat.docs) {
  for (const p of locations(d)) {
    const parts = p.split('/');
    for (let i = 1; i < parts.length; i++) folders.add(parts.slice(0, i).join('/').toLowerCase());
  }
}
const folderSize = (needle) => {
  let n = 0;
  for (const d of cat.docs) if (locations(d).some((p) => p.toLowerCase().includes(`/${needle}/`))) n++;
  return n;
};

/* See the header: a `file` value is one of four shapes. */
function shape(e) {
  if (/external/i.test(SOURCE_ROOTS[e.root] || '')) return 'external';
  if (/\.(jpe?g|png|gif|heic|tiff?)\b/i.test(e.file)) return 'image';
  if (String(e.file).includes('/')) return 'folder';
  return 'file';
}

const found = [], moved = [], missing = [], sets = [], skipped = [];
for (const [id, e] of Object.entries(SOURCE_FILES)) {
  const kind = shape(e);

  if (kind === 'external' || kind === 'image') { skipped.push({ id, e, kind }); continue; }

  if (kind === 'folder') {
    /* The folder is whatever precedes the first "/" — the rest is either a
       filename pattern ("Chapter 1-29.pdf") or a human count ("(11 papers)"). */
    const needle = String(e.file).split('/')[0].trim().toLowerCase();
    const hitFolder = [...folders].find((f) => f.endsWith(`/${needle}`) || f === needle);
    if (hitFolder) { sets.push({ id, e, needle, at: hitFolder, n: folderSize(needle) }); continue; }
    /*
     * A folder the catalogue cannot see may hold no DOCUMENTS rather than not
     * exist: "SQ Answer by year 2007-2011" is five years of handwritten pages
     * photographed as JPGs, and the registry's own note says so. Believe the
     * note over the absence — reporting it missing would be the check calling
     * a correct citation broken, which is how this file got rewritten once.
     */
    if (/\b(photograph|jpe?g|png|scan)/i.test(`${e.file} ${e.note || ''}`)) {
      skipped.push({ id, e, kind: 'image' });
      continue;
    }
    missing.push({ id, e, kind });
    continue;
  }

  const docs = byName.get(String(e.file).toLowerCase());
  if (!docs || !docs.length) { missing.push({ id, e, kind }); continue; }

  /*
   * Where does the registry SAY it is? SOURCE_ROOTS maps the key to the shared
   * folder's display name; `folder` is the path below it. Compare loosely —
   * the registry writes the folder a human would, and the drive nests it under
   * a group's own arrangement ("Year 1/Radiography Yr1 Sem1/...").
   */
  const wantRoot = (SOURCE_ROOTS[e.root] || e.root || '').toLowerCase();
  const wantFolder = String(e.folder || '').toLowerCase();
  const where = docs.flatMap(locations);
  const ok = where.some((p) => {
    const lower = p.toLowerCase();
    const rootOk = !wantRoot || lower.startsWith(`${wantRoot}/`) || lower.includes(wantRoot);
    const folderOk = !wantFolder || lower.includes(wantFolder);
    return rootOk && folderOk;
  });
  (ok ? found : moved).push({ id, e, where });
}

const total = Object.keys(SOURCE_FILES).length;
console.log('— every cited source exists on the drive —');
console.log(`  ok   ${found.length} single documents found where SOURCE_FILES says`);
console.log(`  ok   ${sets.length} folder citations resolve to a real folder`);
console.log(`       ${moved.length} found but at a different path, ${skipped.length} not checkable here`);
console.log(`       ${total} registered sources in total`);

if (sets.length) {
  console.log(`\n— cited as a set, and the set is there (${sets.length}) —`);
  for (const s of sets) console.log(`  ok   ${s.id.padEnd(16)} ${String(s.n).padStart(3)} documents  ${s.at}`);
}

if (skipped.length) {
  console.log(`\n— not checkable against the catalogue (${skipped.length}) —`);
  for (const s of skipped) {
    const why = s.kind === 'external'
      ? `external: ${SOURCE_ROOTS[s.e.root]}`
      : 'photographs — the catalogue indexes documents, not images';
    console.log(`  --   ${s.id.padEnd(16)} ${why}`);
  }
}

if (moved.length) {
  console.log(`\n— found, but not at the registered path (${moved.length}) —`);
  for (const m of moved) {
    console.log(`  warn ${m.id}  ${m.e.file}`);
    console.log(`         registry: ${SOURCE_ROOTS[m.e.root] || m.e.root}/${m.e.folder || ''}`);
    for (const p of m.where.slice(0, 2)) console.log(`         drive:    ${p}`);
    if (m.where.length > 2) console.log(`         … and ${m.where.length - 2} more copies`);
  }
}

if (missing.length) {
  console.log(`\n— cited but NOT on the drive (${missing.length}) —`);
  for (const m of missing) {
    console.log(`  FAIL ${m.id}  ${m.e.file}  [${m.e.subject}, ${m.e.kind}]`);
  }
  console.log('\nA claim citing one of these cannot be checked against anything.');
  console.log('Either the file is named wrongly in SOURCE_FILES, or it is not in the shared folders.');
}

/* ------------------------------------------------------------------ *
 * And one level deeper: does the cited page actually say it?
 *
 * A sourceRef is `{ ref, location }`, and a location is written the way a
 * person cites — `L1 p4 "The anatomical position"`, `Section "Directional
 * Terms"`. Where it carries a quoted phrase, that phrase is a claim about what
 * the source says, and work/source-text.json can now settle it. Nothing has
 * ever checked this: a quote could drift, or be transcribed from a different
 * edition of the same lecture, and look perfectly sourced.
 *
 * Only quoted phrases are checked. `Opening section` and `Glossary entries for
 * each term` describe where to look rather than assert wording, and inventing a
 * test for them would manufacture failures out of prose.
 * ------------------------------------------------------------------ */

const TEXT = join(WORK, 'source-text.json');
let quoteFails = 0;
if (existsSync(TEXT)) {
  const { sources, failed: noText } = JSON.parse(readFileSync(TEXT, 'utf8'));
  const { STUDY_ITEMS } = await import('../outputs/study-data.js');

  /* Compare on collapsed whitespace: pdftotext -layout pads columns out with
     runs of spaces, so a phrase that reads as one line in the PDF is not one
     line here. Curly quotes and dashes differ between source and transcription
     for the same reason nobody notices them. */
  const flat = (s) => String(s).toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ').trim();

  const checked = [], drifted = [], unverifiable = [];
  for (const item of STUDY_ITEMS) {
    for (const r of item.sourceRefs || []) {
      const quote = (String(r.location || '').match(/"([^"]{4,})"/) || [])[1];
      if (!quote) continue;
      const src = sources[r.ref];
      if (!src) { unverifiable.push({ item: item.id, r, why: noText?.[r.ref] || 'no text for this source' }); continue; }

      /*
       * A spaced em dash inside a quote is the CITATION's connector, not text
       * in the source: `Slide "Fibrous joints — Sutures"` points at a slide
       * headed "Fibrous joints" with "Sutures" beneath it, two lines apart on
       * page 29. Requiring the literal string called two accurate citations
       * broken. Split on it and require every part on the same page; a quote
       * without one is matched whole, exactly as before.
       */
      const parts = quote.split(/\s+[—–]\s+/).map(flat).filter(Boolean);
      const on = (i) => {
        const f = flat(src.pages[i] || '');
        return parts.every((x) => f.includes(x));
      };

      /*
       * If the location names a page, ask about THAT page — do not go hunting
       * for the first page that happens to contain the words.
       *
       * A lecture states its headings more than once: "How many modalities are
       * applied in hospitals?" is a question on the opening slide and the
       * heading of slide 15, and the three second-messenger systems are listed
       * on p3 before each gets its own section later. Reporting the first hit
       * called four correct citations wrong, because it answered "where does
       * this phrase first appear" when the citation claims something narrower
       * and checkable: that the phrase is on the page named.
       */
      const claimed = Number((String(r.location).match(/\bp\.?\s?(\d+)/i) || [])[1]);
      if (claimed && claimed >= 1 && claimed <= src.pages.length && on(claimed - 1)) {
        checked.push({ item: item.id, r, file: src.file, at: claimed, claimed, ok: true });
        continue;
      }

      const pageHit = src.pages.findIndex((_, i) => on(i));
      if (pageHit < 0) { drifted.push({ item: item.id, r, file: src.file }); continue; }
      checked.push({ item: item.id, r, file: src.file, at: pageHit + 1, claimed, ok: !claimed });
    }
  }

  const onPage = checked.filter((c) => c.ok);
  const offPage = checked.filter((c) => !c.ok);
  console.log('\n— and the cited page says what the citation quotes —');
  console.log(`  ok   ${onPage.length} quoted citations found in the source they name`);
  console.log(`       ${offPage.length} on a different page, ${drifted.length} not found, ${unverifiable.length} no text to check against`);

  if (offPage.length) {
    console.log(`\n— quote found, but not on the page cited (${offPage.length}) —`);
    for (const c of offPage) console.log(`  warn ${c.item}  ${c.file}  cited p${c.claimed}, found p${c.at}  "${(c.r.location.match(/"([^"]+)"/) || [])[1]}"`);
  }
  if (drifted.length) {
    console.log(`\n— quoted, but the source does not contain it (${drifted.length}) —`);
    for (const d of drifted) console.log(`  FAIL ${d.item}  ${d.r.ref} (${d.file})  ${d.r.location}`);
    console.log('\nEither the wording drifted from the source, or it came from a different edition.');
    quoteFails = drifted.length;
  }
} else {
  console.log('\n— quoted citations not checked: no work/source-text.json —');
  console.log('  run: node work/build-source-text.mjs');
}

const fails = missing.length + quoteFails;
console.log(fails ? `\n${fails} FAILED` : '\nALL PASS');
process.exit(fails ? 1 : 0);
