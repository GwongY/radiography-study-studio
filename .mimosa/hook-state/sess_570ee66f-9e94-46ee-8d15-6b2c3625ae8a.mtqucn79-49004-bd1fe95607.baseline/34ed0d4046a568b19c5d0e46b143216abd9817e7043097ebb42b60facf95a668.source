/*
 * Text size
 *
 * A reading app on a tablet held at arm's length is not the same reading
 * distance as a laptop, and the type here was set for the laptop. This scales
 * it, in three steps, remembered across sessions.
 *
 * HOW IT SCALES, AND WHY NOT `zoom`
 *
 * `zoom` on the scroll container would have been one line, and it is wrong
 * here: it scales the padding, the borders, the 3D stage and the max-width
 * that keeps a line of prose from running the full width of an iPad, so at
 * 125% the layout is not a larger version of itself — it is a narrower one.
 * Browser page zoom already does that job for anyone who wants it.
 *
 * Instead `--ts` multiplies the type on the READING surfaces only, in one
 * block at the end of app.css. Chrome and everything else, the same rules.
 * The cost is that the block has to name those surfaces: a size added to a
 * new lesson element will not scale until it is listed there. That is a real
 * maintenance cost and it is the right trade — it is visible, greppable, and
 * it never surprises the layout.
 *
 * Split out along its banner sections. See docs/CODEMAP.md.
 */
import { $$ } from './imports.js';
import { toast } from './small-ui-helpers.js';
import { K, read, write } from './storage-versioned-keys.js';

/* ------------------------------------------------------------------ *
 * Text size — three steps, remembered
 * ------------------------------------------------------------------ */

/* id: what goes in html[data-ts]. '' is the default and sets no attribute,
   so a reader who never touches this pays no selector at all. */
const STEPS = [
  { id: '', label: 'Standard' },
  { id: 'l', label: 'Large' },
  { id: 'xl', label: 'Largest' },
];

function stepIndex(id) {
  const i = STEPS.findIndex((s) => s.id === id);
  return i < 0 ? 0 : i;
}

/** The saved step, or the default. Never trusts what is in storage. */
export function textSize() {
  return STEPS[stepIndex(read(K.textSize, ''))].id;
}

/** Put the current step on <html>, where the CSS block can see it. */
export function applyTextSize() {
  const id = textSize();
  if (id) document.documentElement.setAttribute('data-ts', id);
  else document.documentElement.removeAttribute('data-ts');
  /* The button reads the size it will give you next, not the one you have —
     an 'Aa' that never changes tells you nothing about what tapping does. */
  const next = STEPS[(stepIndex(id) + 1) % STEPS.length];
  for (const el of document.querySelectorAll('[data-textsize]')) {
    el.setAttribute('aria-label', `Text size — currently ${STEPS[stepIndex(id)].label}, tap for ${next.label}`);
    el.classList.toggle('active', !!id);
  }
}

export function cycleTextSize() {
  const next = STEPS[(stepIndex(textSize()) + 1) % STEPS.length];
  write(K.textSize, next.id);
  applyTextSize();
  toast(`Text size: ${next.label}`);
}

export function init() {
  applyTextSize();
  for (const el of document.querySelectorAll('[data-textsize]')) el.onclick = cycleTextSize;
  /* $$ is imported for the same reason every other part imports it: the
     button ids are checked here so a renamed one fails loudly at boot
     rather than silently doing nothing when tapped. */
  for (const id of ['rssTextSize', 'rssSessionTextSize']) {
    if (!$$(id)) console.warn(`text-size: #${id} is missing from the markup`);
  }
}
