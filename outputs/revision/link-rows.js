/*
 * Revise · which links a topic lists, in which order, under which numbers.
 *
 * Pure, and shared by the Map and the 3D hub, so a topic's links carry the
 * same numbers in both. Every link is numbered, even one the view cannot draw
 * (its target folded away on the Map, or behind "+N more" in 3D): the number
 * belongs to the link, not to the picture.
 *
 * nb         [[otherId, reason], …], i.e. ix.NB[id]
 * label      id -> display name (a Map heading key included)
 * visibleAs  id -> the id the line is drawn to (itself, or the folded branch it
 *            is inside), or null when there is nowhere to draw it
 */
export function linkRows(nb, { label, visibleAs = (id) => id }) {
  return (nb || [])
    .map(([id, why]) => ({ id, why, label: label(id) }))
    .sort((a, b) => a.label.localeCompare(b.label) || (a.id < b.id ? -1 : 1))
    .map((r, i) => {
      const at = visibleAs(r.id) || null;
      return { ...r, n: i + 1, at, inside: at && at !== r.id ? label(at) : '' };
    });
}
