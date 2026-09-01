/*
 * Which document on the drive is this SOURCE_FILES entry?
 *
 * Not "the one with that filename". The shared folders contain EIGHTEEN
 * distinct documents named "Lecture notes.pptx" or "Lecture notes.pdf" — one
 * per lecture, each in its own folder — and SOURCE_FILES tells them apart the
 * only way it can, by `folder`:
 *
 *   phys.1  Lecture notes.pptx  ABCT2326 Human Physiology/1. Cells and Body Organization
 *   phys.2  Lecture notes.pptx  ABCT2326 Human Physiology/2. Cardiovascular System
 *
 * Resolving on the filename alone silently hands back the same document for
 * every one of them. That is not a lookup that returns nothing — it is a lookup
 * that returns the WRONG source, confidently, and everything downstream reads
 * as correctly sourced. It put an anatomy lecture's text under ten physiology
 * ids before the quoted-citation check noticed.
 *
 * Returns { doc, where, ambiguous } — or null. `ambiguous` is set when the
 * folder still does not separate the candidates, so a caller can refuse to
 * guess rather than take the first.
 */
export function resolveSource(entry, cat, roots) {
  /* Two spellings of every location: the short one to show a reader, and the
     absolute one to open. They must come from the SAME copy — resolving to one
     copy and then reading a different one is the bug this file exists to stop. */
  const locations = (d) => d.at.map(([ri, p]) => ({
    where: `${ri < 0 ? '?' : cat.roots[ri].split('/').pop()}/${p}`,
    full: ri < 0 ? p : `${cat.roots[ri]}/${p}`,
  }));

  const named = cat.docs.filter((d) => d.n.toLowerCase() === String(entry.file).toLowerCase());
  if (!named.length) return null;
  if (named.length === 1) return { doc: named[0], ...locations(named[0])[0], ambiguous: false };

  /* Narrow by the folder the registry names. Compare loosely: the registry
     writes the path a person would, and each study group nests it under its own
     arrangement ("Year 1/Radiography Yr1 Sem1/..."). */
  const wantFolder = String(entry.folder || '').toLowerCase();
  const wantRoot = String(roots[entry.root] || entry.root || '').toLowerCase();

  const scored = [];
  for (const d of named) {
    for (const loc of locations(d)) {
      const lower = loc.where.toLowerCase();
      if (wantFolder && !lower.includes(wantFolder)) continue;
      /* Prefer a copy in the shared folder the registry names, but do not
         require it — the same lecture is re-shared between study groups. */
      scored.push({ doc: d, ...loc, rootMatch: wantRoot ? lower.includes(wantRoot) : false });
    }
  }
  if (!scored.length) return { doc: named[0], ...locations(named[0])[0], ambiguous: true };

  scored.sort((a, b) => b.rootMatch - a.rootMatch);
  /* Several DIFFERENT documents still matching the folder means the registry
     cannot distinguish them either; say so instead of picking one. */
  const distinct = new Set(scored.map((s) => `${s.doc.n}|${s.doc.b}`));
  return { doc: scored[0].doc, where: scored[0].where, full: scored[0].full, ambiguous: distinct.size > 1 };
}
