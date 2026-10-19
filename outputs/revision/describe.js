/*
 * Revision describe — the one sentence every Map box shows under its name.
 *
 * Pure: no DOM, so work/ runs the same rule the app does. A box gets, in order:
 * the slide's own line for a leaf, the first sentence of a topic's note, then a
 * sentence made only from where the box sits (what it covers, or what it is
 * part of and what that is in). The last step says nothing the tree does not already
 * say, so no box is ever empty and none carries an unsourced claim.
 */

const plain = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const list = (a, n) => a.slice(0, n).join(', ') + (a.length > n ? ` and ${a.length - n} more` : '');
const ended = (s) => (/[.!?…]$/.test(s) ? s : `${s}.`);

/** The first sentence of a note, cut at a word if it runs past `max`. */
export function firstSentence(text, max = 150) {
  const t = plain(text); if (!t) return '';
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  let s = m ? m[0] : t;
  if (s.length > max) s = `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
  return s;
}

/**
 * @param node   a merged NODES row, or null for a branch with no row (a group heading, the root)
 * @param ctx    { parent, grand, kids }: labels of what the box sits in, what that sits in, and what it covers
 */
export function describe(node, { parent = '', grand = '', kids = [] } = {}) {
  if (node && node.leaf && node.line && node.line.trim()) return ended(node.line.trim());
  if (node && !node.leaf && node.t) { const s = firstSentence(node.t); if (s) return ended(s); }
  if (kids.length) return `Covers ${list(kids, 4)}.`;
  return `Part of ${parent || 'this map'}${grand && grand !== parent ? `, in ${grand}` : ''}.`;
}
