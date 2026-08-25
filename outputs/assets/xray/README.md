# assets/xray

Real radiograph image files for radiograph-style study items go here. This
folder is empty by default — no placeholder or sample images are included.

## Filename convention

Lowercase, hyphenated, matching the `image` field on the `practice` question
that references it — e.g. `cxr-pa-001.jpg`.

## Adding a case

1. Drop the image file in this folder.
2. In `outputs/study-data.js`, add a real `STUDY_ITEM` (or a `practice`
   entry on an existing item) with `image: '<filename>'` on the question,
   and a `sourceRefs` entry pointing at a file that actually exists in your
   source folders. See the schema comment directly above where `HTI_ITEMS`
   closes in that file for the exact shape.
3. If the referenced image can't be found at render time, the question
   shows "Image not found — add it to assets/xray/ and reload" instead of a
   broken image or a stuck session.

## The rule that applies here too

This project's governing rule is: every factual study claim must trace to a
file that exists in your supplied source folders. No internet research, no
generic textbook expansion, no invented syllabus content. That applies to
radiograph cases exactly as it does to every other subject — do not invent
positioning notes, landmark facts or mnemonics for an image just because it
"looks right." See the top of `outputs/study-data.js` and the main
`outputs/README.md` for the full rule and how source references work.
