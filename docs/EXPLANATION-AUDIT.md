# Revise explanation audit

**Status: in progress.** The previous pass was incomplete and did not justify
claiming that all explanations were distinct and useful. This note records the
current inventory and confirmed changes; it is not an all-clear.

## Inventory

The current content inventory has 2,159 Map nodes (1,062 HSS2011 and 1,097
ABCT2326), 413 one-sentence `own` details, 1,796 Map source lines, 525 Decoder
rows, 2,068 glossary entries, 788 term notes and 565 memory tips.

An automated same-term text screen surfaced 75 possible Reading-help
meaning/memory-tip overlaps (similarity at least 0.65 against the smaller
meaningful-word set) and 157 possible overlaps across Map details, source
lines, Reading help and Decoder content. These are candidates, not confirmed
duplicate counts: shared anatomy terms can describe complementary facts, so
each must be reviewed before deleting or rewriting content. The screen also
found Decoder/Map/Reading-help pairs for review in both subjects.

## Confirmed changes in this update

- Map explanations for Prime mover, Synergists, Antagonists and Fixators now
  state the role and its example instead of presenting only a name or list.
- Five HSS Decoder entries were revised to reduce overlap flagged in the first
  screen: Sartorius, Pseudounipolar, Insula, Pericardium and Pharynx. Pericardium
  remains a candidate for manual review.
- The durable rule in `DECISIONS.md` says not to add explanatory UI copy and
  requires Map sentences to explain the term or relationship.

## Still to review

- Manually classify the candidate overlaps, including the 75
  meaning/memory-tip pairs and the 157 cross-surface pairs.
- Check Map lines that are examples, fragments or lists for a useful
  explanation where the Map needs one.
- Recheck Decoder against Map and Reading help after the remaining content
  review; do not report the audit complete until the candidate set has been
  resolved and all relevant surfaces have been covered.

`git diff --check` passed for this update. No browser or full check suite was
run, so runtime rendering has not been verified here.
