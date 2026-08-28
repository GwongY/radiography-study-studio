# Structure-set lessons: make the Key Facts actually learnable

Date: 2026-08-28 · Status: approved by user, implementing

## Problem

A structure-set lesson's "Key facts to remember" is a flat column of names.
Example — "The airway and the lung lobes" renders twelve lines, Trachea down to
Pleura, with no headings and no organising idea. For a self pre-learner fresh
from DSE biology the reaction is "but remember what? I don't even know."

The underlying data already has the answer to that: every structure-set member
carries a `group` label ("Conducting — proximal", "Right lung — three lobes",
…), and the 3D studio already groups by it. The Learn view simply flattens it
away. And of the thirteen structure sets, only four (carpals, tarsals,
skullBones, vertebralRegions) have any memory hooks authored; the other nine
have none.

## Scope

All thirteen structure sets. The user chose "All structure-set lessons" and the
"hook + grouped list" rendering (the Key Facts keep their members, but a tagged
app-authored hook gives the organising idea first, then the list is grouped
under the group headings that already exist in the data).

## Data — `outputs/study-data.js`

1. **`STRUCTURE_HOOKS`** (line ~3955): add a one-line `hook` — "the idea to hang
   it on" — to all thirteen entries. Nine sets get brand-new hooks; the four
   bone sets get a hook too (condensed from their existing chunking/location
   text, or verbatim where one already states the organising idea). Each hook is
   an app-authored memory aid that restates the set's own members and groups —
   it adds no new facts, so the source-traceability rule is untouched.

2. **`structureItem()`** (line ~3979): keep `keyFacts` exactly as it is (the
   Remember step reads `keyFacts[0]` as a partial answer), and add two fields to
   the generated lesson object:
   - `hook` — `hooks.hook || null` (from `STRUCTURE_HOOKS[set.id]`)
   - `keyFactsGroups` — the members bucketed under their `group` label,
     preserving `order` within each group and keeping each member's `note` in
     the `"Label — note"` form already used by the flat `keyFacts`.

   Both fields are additive and unvalidated (same as `lesson.plain`), so
   `validateCorpus()` stays at 0.

## Renderer — `outputs/radiography-study-studio.html`

3. **Learn view** (`learnHTML`, line ~4345): extract the facts block into a
   helper. When `item.lesson.keyFactsGroups` is present, render:
   - the tagged hook — `<span class="apptag">App note</span> The idea to hang
     it on: …` (dashed box, same style family as `.plainlead`), then
   - the members under their group headings (small uppercase heading per group,
     then the existing `.facts` list).
   Every member string still passes through `glossify(esc(…))`, so hard words
   stay tappable and open the reading-help dialog. Lessons without
   `keyFactsGroups` render the current flat list unchanged.

4. **Remember step** (line ~4424): add `item.lesson.hook` as the first candidate
   in the Stage 2 (memory hook) reveal. Candidates are `.filter(Boolean)`-ed, so
   the null hook on non-structure items is inert. The Memory Coach then opens
   with the organising idea before the group/name hints in later reveals.

## Version stamps

`study-data.js` is deliberately **not** `?v=`-stamped (it is revalidated by the
shell's `networkFirst` handler), so the data + HTML change is carried by the
shell cache version: bump `CACHE_VERSION` in `sw.js` from `v30` to `v31`.

## Verification

- `node work/verify-modules.mjs` — `validateCorpus()` and `validateApplications()`
  both 0 failures.
- `node work/gloss-gap-scan.mjs` — count stays ≤ 1897 (hooks are app-authored
  and may add words; keep hooks short so the number does not jump — if it does,
  re-baseline only on review, not silently).
- Real Chrome (server on `:8420`): "The airway and the lung lobes" renders the
  hook + five grouped headings; a bone set (e.g. carpals) renders its hook +
  its two rows; tapping a term inside a grouped fact still opens the dialog;
  the Remember step's first hint is the hook for a structure item.

## Non-goals

- No change to the 3D blank-mode quiz, the Practise questions, or the Apply
  step — they already use the set's groups where it matters.
- No new factual content; hooks are memory-aid framing only.
