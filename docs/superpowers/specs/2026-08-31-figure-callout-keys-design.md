# Figure callout keys — teaching from the image

## Problem

Lessons that open with a published figure (`figures.js`) or a Gray's plate
(`visual-data.js` `PLATES`) render as: kicker + title, the image, a one-line
caption, and a credit line. Nothing ties the image to the lesson, and nothing
explains the callouts drawn on it. The body-cavities figure carries twelve
marks (`1`–`7`, `a`–`e`) and the lesson names none of them, so the image is
decoration rather than teaching material.

The rule this restores: **if a lesson uses an image, it teaches from the
image** — an orientation line and a key that resolves every visible callout.

## Scope

- ~17 `FIGURES` records used by an `ITEM_VISUALS` entry (15 via `sch()` that
  resolve to a figure, 2 — `heart`, `vertebra` — via the `labelled` path).
- 5 `PLATES` records (secondary image on physiology items).

Out of scope: coordinate / hotspot overlays on the image; the hand-drawn
schematics and layouts (they render their own labels); rewording existing
`caption` fields unless an `intro` makes one redundant.

## Figure fixes uncovered during the survey (added scope)

Checking each image against its lesson turned up mismatches that the
callout-key work has to fix first:

| Figure / item | Fix |
| --- | --- |
| `synovialJoint` (*Structures of a synovial joint*) — file was `synovial-joint-structure.png`, actually Gray 349 (knee from above, menisci + cruciates) | repoint to `synovial-joints.jpg`, which is already in the repo and is OpenStax 907 "Synovial Joints" (the structure section this lesson wants); rewrite its `title`/`caption` |
| `synovialTypes` (*The six synovial joint types*) — file was `synovial-joints.jpg` (the 907 structure section, i.e. `synovialJoint`'s image) | fetch OpenStax 909 "Types of Synovial Joints" → `synovial-joint-types.jpg` |
| `vertebra` (*General structure of a vertebra*) — Gray 93, labels only the processes, missing body / foramen / pedicle / lamina / spinous | fetch OpenStax 718 "Vertebra" (Parts of a Typical Vertebra) → `vertebra-parts.jpg` |
| `nephron` (*Nephron tubule and the urine pathway*) — OpenStax 2618, shows transport per segment, segments unnamed; lesson is tubule order | fetch OpenStax 2611 "Blood Flow in the Nephron" → `nephron-blood-flow.jpg` (names the segments and the vessels) |
| `gasTransport` (*Gas exchange…*) — whole-airway overview SVG, wrong for an alveolus/pneumocyte lesson | fetch OpenStax 2310 "Structures of the Respiratory Zone" → `respiratory-zone.jpg`, add as new FIGURES key `respiratoryExchange` for `abct2326-resp-gas-transport`; repoint `abct2326-resp-pathway` from its 3D organ model to the whole-airway SVG (`FIGURES.gasTransport`, still `respiratory-system.svg`) — the airway meshes stay searchable in the Viewer; README `model` count 59 → 58 |
| `heart` (*Heart chambers…*) — SVG has zero text labels | keep the image, `intro` only, no `key` |
| `conduction` — numbered 1–12, no legend in the file | pull the legend from the Wikimedia Commons page and build the `key` from it |

New assets fetched from Wikimedia (all OpenStax, CC BY 3.0, licence checked
via the Commons API before download): `synovial-joint-types.jpg`,
`vertebra-parts.jpg`, `nephron-blood-flow.jpg`, `respiratory-zone.jpg`.
Retired assets (deleted, removed from the SW shell): `synovial-joint-structure.png`,
`vertebra-superior.png`, `nephron.jpg`.

The `conduction` figure legend (numbers 1–12) was read from the Wikimedia
Commons file page: 1 SA node, 2 Bachmann's bundle, 3–5 anterior/middle/posterior
internodal tracts, 6 AV node, 7 bundle of His, 8/9 right/left bundle branch,
10/11 left anterior/posterior fascicle, 12 Purkinje fibres.

### As built

18 `FIGURES` entries (was 17: +`respiratoryExchange`, all four mismatches
repointed/replaced). Every figure a lesson renders and all 5 plates carry
`intro` + `key` (`heart` is `intro`-only — its SVG has no printed labels).
`figureBlockHTML` / `figureKeyHTML` are shared by the schematic→figure,
labelled→figure and plate paths. `figure-key-check.mjs` passes: 18 figures,
5 plates, 0 unused. All after-edit verifiers green; browser-checked the
cavities, respiratory-pathway and nephron lessons — image + intro + key +
`beyond` dimming + glossary links all render.

## Data model

Two optional fields on each `FIGURES` entry and each `PLATES` entry:

```js
bodyCavities: {
  file: 'body-cavities.png', /* …existing fields… */
  intro: 'The figure the lesson is built on: dorsal and ventral cavities side '
       + 'by side, the ventral one opened into its thoracic and abdominopelvic '
       + 'parts. The left view is anterior, the right lateral — same numbering.',
  key: [
    { mark: '2', name: 'Thoracic cavity' },
    { mark: '3', name: 'Abdominal cavity' },
    { mark: '4', name: 'Pelvic cavity' },
    { mark: '6', name: 'Abdominopelvic cavity — abdominal plus pelvic' },
    { mark: 'c', name: 'Pleural cavity — around each lung' },
    { mark: 'd', name: 'Pericardial cavity — around the heart' },
    { mark: '1', name: 'Cranial cavity', beyond: true },
    { mark: '5', name: 'Ventral body cavity', beyond: true },
    { mark: '7', name: 'Dorsal body cavity', beyond: true },
    { mark: 'a', name: 'Mediastinum', beyond: true },
    { mark: 'b', name: 'Vertebral (spinal) cavity', beyond: true },
    { mark: 'e', name: 'Diaphragm', beyond: true },
  ],
},
```

- `intro` — a string. One or two sentences: what the image shows, why it is on
  this lesson, and how to read it (which panel, what the numbering means).
- `key` — an array of `{ mark, name, beyond? }`. `mark` is the label as drawn
  on the image (`'1'`, `'a'`, `'P'`, `'skeletal'` for a panel). `name` resolves
  it. `beyond: true` marks a callout this lesson's own sources do not name.

Both fields are app-authored reading aids, the same category as the memory
aids.

## Per-figure sourcing rule

For each of the ~22 images:

1. Enumerate every visible callout mark on the image.
2. Name each mark the lesson's own sources name (its `lesson.explanation`,
   `lesson.keyFacts`, or a cited glossary entry) → plain `key` entry.
3. Marks the lesson does not cover → `beyond: true`, named from the figure's
   own published labelling. This is defensible: the figure is already a cited,
   attributed source on the page (`author`, `commons`, `licence` in the
   record), so reading its own labels is not unsourced textbook expansion. The
   `beyond` flag keeps the distinction visible to the learner.
4. `validateCorpus()` operates on study-item `sourceRefs`, not on figure keys,
   so this adds no validation surface. The honesty burden is carried by the
   `beyond` flag and the rendered note.

Figures whose every callout is lesson-named (e.g. the ECG trace — `P`, `QRS`,
`T`, `PR`, `QT` are all in the CVS lesson) carry no `beyond` flags and render
no note.

## Rendering

`visualSlotHTML` currently duplicates the figure markup in two branches (the
`schematic`→figure path and the `labelled`→figure path). Factor both into one
`figureBlockHTML(fig)` helper. `plateHTML` gets the parallel treatment.

Markup inside `<figure class="lessonvis" data-kind="figure">`:

```
[head: "Figure" · title]                       (unchanged)
<p class="figintro">…glossify(esc(intro))…</p>  (new, above the image)
<div class="lessonvis-fig"><img …></div>        (unchanged)
<figcaption>caption + credit</figcaption>        (unchanged)
<dl class="figkey">                              (new, below the caption)
  <div><dt>2</dt><dd>Thoracic cavity</dd></div>
  …
  <div class="beyond"><dt>1</dt><dd>Cranial cavity</dd></div>
</dl>
<p class="figkey-note">Dimmed marks are the figure's own labels, beyond this
lesson's named set.</p>                          (only when a beyond entry exists)
```

- `dd` text runs through `glossify(esc())`, like every other lesson string.
- `beyond` entries sort last and take the `.beyond` class (dimmed).
- No `key` → the block degrades to exactly today's output.

CSS, added near the existing `.lessonvis-*` / `.figcredit` rules:

- `.figintro` — lead paragraph, slightly muted, caption measure.
- `.figkey` — compact grid: `dt` narrow fixed column (bold/mono mark), `dd`
  fills; rows wrap on narrow screens.
- `.figkey .beyond` — reduced opacity.
- `.figkey-note` — small, muted, like `.figcredit`.

## Cache / shell

- `figures.js?v=1` → `?v=2` — HTML import **and** `sw.js` SHELL (identical
  string).
- `visual-data.js?v=3` → `?v=4` — HTML import **and** `sw.js` SHELL.
- `CACHE_VERSION` `v52` → `v53` in `sw.js`.

## Verification

- After edits: `node work/load-check.mjs`, `syntax-check.mjs`,
  `verify-modules.mjs`, `shell-check.mjs`.
- New verifier `work/figure-key-check.mjs`: for every figure/plate an
  `ITEM_VISUALS` entry uses, assert `intro` is a non-empty string and `key` is
  a non-empty array of `{ mark, name }` with string values and unique marks;
  list any `FIGURES` entry no item references (informational). Wire into the
  after-edit set.
- Browser: `preview_start`, open the cavities item, an all-sourced figure
  (ECG), and a figure+plate item (nephron); screenshot each; confirm no
  console errors and the key wraps.

## Docs

- `outputs/README.md` — "Every lesson opens with a visual": note the
  orientation line + callout key and how `beyond` marks are sourced.
- `CLAUDE.md` — update the `figures.js` / `visual-data.js` rows (new
  `intro` / `key` fields); add `figure-key-check.mjs` to the `work/` list.
