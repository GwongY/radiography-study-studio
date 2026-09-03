/*
 * Read the text out of a course document, whatever kind it is.
 *
 * Shared by build-source-text.mjs (the cited sources, committed) and the local
 * cache it also fills. Returns pages, not one string: every sourceRefs entry in
 * the corpus cites a page — `L1 p4 "The anatomical position"` — so text that
 * has lost its page boundaries cannot answer the question anyone actually asks.
 *
 * No dependencies beyond `pdftotext` (poppler) on PATH. .docx and .pptx are zip
 * archives of XML, which node can open with zlib alone.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { inflateRawSync } from 'node:zlib';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

/*
 * pdftotext on Windows cannot open a path containing non-ASCII characters, and
 * most of these shared folders are named things like
 * "🏅🥇依吖温金牌梳士🥇🏅/Sem 1我哋又重新上路🌟". It fails with a bare "Command
 * failed", which reads exactly like a corrupt PDF -- nine of the ten documents
 * that "failed" extraction were fine, and extracted first try once copied to an
 * ASCII path. Copy only when the path needs it: some of these files are 200 MB.
 *
 * LENGTH is the same failure wearing different clothes, and it took longer to
 * find. Windows still refuses a path at or past MAX_PATH (260) to a program
 * that has not opted out, and these shared folders nest deeply enough to reach
 * it: the Green Group copy of "New development in arc radiation therapy.pdf"
 * sits at exactly 260 characters. The FILE is fine and extracts instantly once
 * copied; the PATH is what cannot be passed. pdftotext reports an I/O error,
 * unread-manifest wrote that down as "no extractable text (scanned images?)",
 * and three perfectly readable journal articles sat in the NEEDS-OCR pile --
 * the one pile where the work is expensive, slow and manual, so nobody goes
 * back to re-check the diagnosis. Threshold is well under 260: the copy needs
 * room for the temp directory too.
 */
const NEEDS_COPY = /[^\x20-\x7e]/;
const TOO_LONG = 220;
const needsCopy = (f) => NEEDS_COPY.test(f) || f.length >= TOO_LONG;

/* Every entry in a zip whose name matches, decompressed. The central directory
   is walked backwards from the End Of Central Directory record. */
function zipEntries(file, match) {
  let buf;
  try { buf = readFileSync(file); } catch { return []; }
  const out = [];
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) return out;
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOff = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nameLen).toString('utf8');
    p += 46 + nameLen + extraLen + commentLen;
    if (!match.test(name)) continue;
    const lNameLen = buf.readUInt16LE(localOff + 26);
    const lExtraLen = buf.readUInt16LE(localOff + 28);
    const start = localOff + 30 + lNameLen + lExtraLen;
    const raw = buf.slice(start, start + compSize);
    try { out.push([name, method === 0 ? raw.toString('utf8') : inflateRawSync(raw).toString('utf8')]); }
    catch { /* one unreadable entry should not lose the document */ }
  }
  return out;
}

const unxml = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/[ \t]+/g, ' ').trim();

function pdfPages(file, timeout) {
  const tmp = mkdtempSync(join(tmpdir(), 'rss-doc-'));
  try {
    let src = file;
    if (needsCopy(file)) { src = join(tmp, `in${extname(file)}`); copyFileSync(file, src); }
    const out = join(tmp, 'out.txt');
    execFileSync('pdftotext', ['-layout', src, out], { stdio: 'ignore', timeout });
    /* pdftotext separates pages with a form feed. That IS the page boundary. */
    return readFileSync(out, 'utf8').split('\f');
  } finally { rmSync(tmp, { recursive: true, force: true }); }
}

function docxPages(file) {
  const [doc] = zipEntries(file, /^word\/document\.xml$/);
  if (!doc) return [];
  /* A .docx has no pages until it is laid out — one paragraph per line, and the
     whole document is page 1. Callers must not invent page numbers for these. */
  const text = doc[1].replace(/<\/w:p>/g, '\n');
  return [unxml(text)];
}

const runs = (xml) => [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((m) => unxml(m[1])).join('\n');
const slideNo = (name) => +(name.match(/(\d+)/) || [])[1] || 0;

function pptxPages(file) {
  const slides = zipEntries(file, /^ppt\/slides\/slide\d+\.xml$/)
    .sort((a, b) => slideNo(a[0]) - slideNo(b[0]));

  /*
   * The speaker notes are teaching text and belong to their slide. Reading the
   * slides alone lost structures the lecturer named only in the notes —
   * coracobrachialis, in the Week 11 upper-limb deck, appears in no slide at
   * all.
   *
   * The mapping has to come from the relationships file, never from the
   * numbering: in that same deck slide22 points at notesSlide12. Pairing
   * slideN with notesSlideN would attach a note to a slide it does not belong
   * to, and a page citation checked against it would then verify against text
   * that is not on that page — the exact failure this library exists to make
   * impossible.
   */
  const notes = new Map(zipEntries(file, /^ppt\/notesSlides\/notesSlide\d+\.xml$/));
  const relOf = new Map();
  for (const [name, xml] of zipEntries(file, /^ppt\/slides\/_rels\/slide\d+\.xml\.rels$/)) {
    const target = (xml.match(/Target="[^"]*\/(notesSlide\d+\.xml)"/) || [])[1];
    if (target) relOf.set(slideNo(name), `ppt/notesSlides/${target}`);
  }

  /* A slide is a page, and its number is the page number a citation would use. */
  return slides.map(([name, xml]) => {
    const note = notes.get(relOf.get(slideNo(name)));
    /* The note is appended, so every offset a slide citation already relies on
       still falls on the same page. Text can be added to a page; it must never
       move between pages. */
    return note ? `${runs(xml)}\n${runs(note)}` : runs(xml);
  });
}

/*
 * Returns { ok, pages, why }. `why` names the reason when ok is false, because
 * "no text" and "cannot read this format" are different facts and a source that
 * cannot be read must not look like a source with nothing in it.
 */
export function extractText(file, { timeout = 180000 } = {}) {
  if (!existsSync(file)) return { ok: false, pages: [], why: 'not on the drive' };
  const ext = extname(file).toLowerCase();
  try {
    let pages;
    if (ext === '.pdf') pages = pdfPages(file, timeout);
    else if (ext === '.docx') pages = docxPages(file);
    else if (ext === '.pptx') pages = pptxPages(file);
    else if (ext === '.txt' || ext === '.md') pages = [readFileSync(file, 'utf8')];
    else if (ext === '.doc' || ext === '.ppt' || ext === '.xls') {
      /* Legacy binary Office formats. Reading them needs a converter this repo
         will not take a dependency on; say so rather than returning nothing. */
      return { ok: false, pages: [], why: `legacy ${ext.slice(1)} format — not extractable without a converter` };
    } else return { ok: false, pages: [], why: `unsupported ${ext || 'file'}` };

    pages = pages.map((p) => p.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim());
    const chars = pages.reduce((a, p) => a + p.length, 0);
    /* A PDF of scanned pages extracts to nothing. That is not a read failure,
       but it is not text either, and a search that silently skips it is lying. */
    if (!chars) return { ok: false, pages: [], why: 'no extractable text (scanned images?)' };
    return { ok: true, pages, why: null };
  } catch (e) {
    const msg = String(e.message || e);
    return { ok: false, pages: [], why: /ETIMEDOUT/.test(msg) ? `timed out after ${timeout / 1000}s` : msg.slice(0, 120) };
  }
}

export { zipEntries };
