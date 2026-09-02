import { readFileSync, writeFileSync } from 'node:fs';
const patch = (path, ops) => {
  const L = readFileSync(path, 'utf8').split(/\r?\n/);
  for (const [find, mode, ...lines] of ops) {
    const i = L.findIndex((l) => l.includes(find));
    if (i < 0) { console.error(`MISSING in ${path}: ${find.slice(0, 60)}`); process.exit(1); }
    if (mode === 'before') L.splice(i, 0, ...lines);
    else if (mode === 'after') L.splice(i + 1, 0, ...lines);
    else L.splice(i, 1, ...lines);
  }
  writeFileSync(path, L.join('\r\n'), 'utf8');
  console.log('patched ' + path);
};

patch('CLAUDE.md', [
  ['node work/data-index-check.mjs # the data summary matches the data', 'after',
    'node work/schedule-check.mjs    # the timetable points at units and items that',
    '                                 # exist, the weights add to 100, and every',
    '                                 # session falls in the week it claims'],
  ['`figure-key-check.mjs`', 'replace',
    '`figure-key-check.mjs` (every published figure/plate a lesson renders carries a well-formed `intro` + `key`), `schedule-check.mjs` (`outputs/schedule.js` points at real units and real item ids, the assessment weights sum to 100, and every dated session falls inside the teaching week it claims — a wrong id there loses a "Study this" button silently and nothing else would notice),'],
]);

patch('outputs/README.md', [
  ['## Course — the timetable, the syllabus, and what you have already missed', 'before',
    '## Reading help — every technical word the corpus uses',
    '',
    'Tapping a word gives its plain-English meaning **and its Traditional Chinese term**, because this is',
    'a Hong Kong course taught in English off English sources and a lot of this anatomy is already known',
    'under its Chinese name.',
    '',
    'Eighteen lessons were written before the glossary caught up with them, and the result was measurable:',
    '**83 of 147 technical words in those lessons were not tappable at all.** A lesson could say "introns',
    'will be removed and exons spliced together" — the exact words the lecture slide uses — and neither',
    'word was underlined, defined in the lesson, or defined anywhere else. The glossary went from 656',
    'entries to 775 and that number is now zero.',
    '',
    'Two structural fixes came with it:',
    '',
    '- **The tokenizer floor was six letters**, which made `fossa`, `bursa`, `ramus`, `gyrus`, `crest`,',
    '  `facet`, `hilum`, `sulci`, `cilia`, `codon`, `actin` and `exons` permanently inert however good',
    '  their entry was — and that is anatomy\u2019s own working vocabulary. It is five now, but a five-letter',
    '  word has to earn it: it needs a curated WHOLE-WORD entry, not merely a decomposition. Without that',
    '  guard "costs" underlines as the rib root `cost/o`, "later" as `later/o`, and "inter" as a prefix.',
    '- **Word parts gained the anatomy set** — `ab-`, `ad-`, `bi-`, `syn-`, `amphi-`, `dia-`, `iso-`, and',
    '  the stems behind epimysium, osteoblast, acetabulofemoral and glenohumeral.',
    '',
    'Where a term is used but its source never defines it — introns and exons are exactly this: the slide',
    'names them and explains neither — the lesson\u2019s plain lead now carries an app-authored sentence that',
    'does, tagged the way every app-authored line is.',
    ''],
  ['- **Syllabus.** Each subject as its description form states it', 'after',
    '- **What to read before each week.** The schedule names a topic; `WEEK_STUDY` says which of our',
    '  lessons teach it, in order, with a button that runs them as one session. 128 lessons in subject',
    '  order is not a study plan. Week 7 is deliberately **empty** — the schedule teaches Special Senses',
    '  and nothing in the corpus covers it, and the tab says so rather than hiding the gap.'],
]);
