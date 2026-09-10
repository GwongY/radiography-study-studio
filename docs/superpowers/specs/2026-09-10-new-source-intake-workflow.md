# Standing Intake Workflow — Processing New Source Files

This specification documents the procedure to run whenever new material arrives in `New source/` (e.g. when the student uploads slides, tutorial packets, or revision notes) or when instructed to "check this New source file".

> [!IMPORTANT]
> **Arrival is not a request.** Files sitting in `New source/` are not an automatic intake queue. The workflow runs only when explicitly directed to evaluate a source file or note.

---

## 6-Step Intake Procedure

### Step 1: Identify
1. **Text extraction**: Test extraction via `work/lib/doc-text.mjs` (PDF, PPTX, DOCX).
   - If image-only (scan/screenshot), flag immediately: it cannot be quote-verified and requires user OCR or manual key fact entry.
2. **Determine Course Slot**:
   - Cross-check `outputs/schedule.js` `SESSIONS` and Canvas teaching schedule screenshots.
   - **Published schedule strictly wins over a filename’s week number** (lecturers frequently misnumber or shift weeks).
3. **Classify Document Kind**:
   - `primary`: official current lecture slides or syllabus notes.
   - `assessment`: official tutorial sheets, revision packets, past papers, test banks.
   - `admin`: syllabus overview, orientation/icebreaker, administrative logistics.

### Step 2: New, or Newer-than-Existing?
1. Query the existing catalogue:
   ```bash
   node work/query.mjs file "<filename>"
   node work/query.mjs where "<subject>"
   ```
2. Compare content against the registered source for that slot (`node work/query.mjs pages <ref>` or `text <term>`):
   - **Genuinely new slot** (no current lessons exist for this week/topic) → Proceed to Steps 3 and 4 to register and author.
   - **Newer edition of a registered source** (e.g. 2026 slides vs 2025/2019 fallback) → Register as `<ref>.2026` (kind: `primary`). Demote old source to `older-supporting`. Re-point affected `sourceRefs` to the 2026 pages. Only rewrite lesson prose where the curriculum actually changed.
   - **Format-twin or identical duplicate** → Register nothing. Record the verdict in `outputs/README.md` and stop.

### Step 3: Register and Cache
1. Add entry to `SOURCE_FILES` in [`outputs/study/corpus/schema.js`](file:///c:/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes/outputs/study/corpus/schema.js):
   - `root`: `'newsrc'` for `New source/` files, or `'uni'` for shared drive targets.
   - `folder`: relative path within the root.
   - `file`: exact filename.
   - `kind`: `'primary'` | `'assessment'` | `'admin'` | `'reference'`.
2. Update source catalogue and cache text:
   ```bash
   node work/build-source-catalogue.mjs
   node work/build-source-text.mjs
   node work/source-check.mjs
   ```

### Step 4: Author or Update Lessons
1. Strict provenance: every factual study claim must cite the newest source for that slot with verified page numbers.
2. Maintain single ownership:
   - Apply single-concept ownership across modules; secondary items use `See [[<owner-id>]]` rather than duplicating text.
3. Timetable wiring:
   - Wire item IDs into `WEEK_STUDY.<SUBJECT>["<week>"]` in [`outputs/schedule.js`](file:///c:/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes/outputs/schedule.js).
   - If this fills a documented gap, **delete the corresponding entry in `WEEK_GAPS.<SUBJECT>["<week>"]`**.

### Step 5: Update Ledger
1. Update `outputs/README.md` (the coverage and settled decisions section) noting the source registration, demotions (if any), and rationale.
2. Commit messages in `git log` record the fine-grained provenance changes.

### Step 6: Verification Battery and Cache Bump
1. Run required verifications:
   ```bash
   node work/load-check.mjs
   node work/syntax-check.mjs
   node work/verify-modules.mjs
   node work/shell-check.mjs
   node work/binding-check.mjs
   node work/schedule-check.mjs
   node work/source-check.mjs
   node work/figure-key-check.mjs
   node work/visuals-check.mjs
   node work/gloss-coverage-check.mjs
   node work/baseline.mjs --check
   ```
2. Regenerate artifacts:
   ```bash
   node work/codemap.mjs
   node work/data-index.mjs
   ```
3. Bump `CACHE_VERSION` in [`outputs/sw.js`](file:///c:/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes/outputs/sw.js).
