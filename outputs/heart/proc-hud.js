/* The procedure player shared by the step-by-step scenarios (PCI, IVUS/OCT): a clock, a step list,
 * a caption, play / replay and a position slider, all in the `ha-proc*` elements that heart/panels.js
 * mounts. It owns no 3D; a scenario asks it for the time each frame and draws that moment.
 *
 * Original code for the explorer (the site's own player is tied to its page), written to the same
 * behaviour: steps jump the clock, scrubbing pauses, the clock stops at the end and Play restarts it.
 *
 * Nothing here runs at module scope. */

export function createProcHud() {
  const $ = (id) => document.getElementById('ha-' + id);
  let steps = [], duration = 1, t = 0, playing = true, shown = -1, onSeek = null, bound = false;

  const els = () => ({ list: $('procSteps'), caption: $('procCaption'), play: $('procPlay'), replay: $('procReplay'), scrub: $('procScrub'), hint: $('procHint') });

  function build() {
    const { list } = els();
    list.textContent = '';
    steps.forEach((st, i) => {
      const li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.dataset.step = String(i);
      const n = document.createElement('b'); n.textContent = String(i + 1);
      const s = document.createElement('span'); s.textContent = st.name;
      b.append(n, s);
      b.onclick = () => { t = Math.min(duration, st.t + 0.0001); playing = true; shown = -1; changed(true); };
      li.append(b); list.append(li);
    });
    shown = -1;
  }

  function showStep() {
    let k = 0;
    steps.forEach((st, i) => { if (t >= st.t) k = i; });
    if (t >= duration) k = steps.length - 1;
    if (k === shown) return;
    shown = k;
    const { list, caption } = els();
    [...list.querySelectorAll('[data-step]')].forEach((b, i) => {
      b.classList.toggle('active', i === k); b.classList.toggle('done', i < k);
      b.setAttribute('aria-current', i === k ? 'step' : 'false');
    });
    caption.textContent = '';
    const head = document.createElement('b'); head.textContent = `${k + 1}. ${steps[k].name}`;
    caption.append(head, ' ', steps[k].text);
  }

  function syncButtons() {
    const { play, scrub } = els();
    const label = playing ? 'Pause' : t >= duration ? 'Replay' : 'Play';
    if (play.textContent !== label) { play.textContent = label; play.setAttribute('aria-pressed', String(playing)); }
    scrub.value = String(Math.round(t / duration * 1000));
  }

  function changed(seeked) { showStep(); syncButtons(); if (seeked && onSeek) onSeek(t); }

  function bind() {
    if (bound) return;
    bound = true;
    const { play, replay, scrub } = els();
    play.onclick = () => {
      if (!playing && t >= duration) t = 0;
      playing = !playing; shown = -1; changed(true);
    };
    replay.onclick = () => { t = 0; playing = true; shown = -1; changed(true); };
    scrub.oninput = () => { t = scrub.value / 1000 * duration; playing = false; changed(true); };
  }

  return {
    /* Begin a procedure: `steps` is [{t, name, text}], `duration` seconds; onSeek(t) runs when the reader moves the clock. */
    start({ steps: s, duration: d, hint = '', onSeek: cb = null }) {
      steps = s; duration = d; t = 0; playing = true; onSeek = cb;
      bind(); build();
      els().hint.textContent = hint;
      changed(false);
    },
    /* Same procedure, different step text (IVUS <-> OCT). */
    setSteps(s) { steps = s; build(); showStep(); },
    tick(dt) {
      if (playing) { t += dt; if (t >= duration) { t = duration; playing = false; } }
      changed(false);
      return t;
    },
    seek(time, { pause = true } = {}) { t = Math.max(0, Math.min(duration, time)); if (pause) playing = false; shown = -1; changed(false); },
    get t() { return t; },
    get playing() { return playing; },
    get duration() { return duration; },
  };
}
