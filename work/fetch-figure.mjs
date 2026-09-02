/*
 * fetch-figure.mjs — search Wikimedia Commons, and download a figure ONLY if
 * its licence is demonstrably free.
 *
 * The figures in outputs/figures.js are published images with real attribution
 * lines rendered on them. That attribution has to be the licence's own words,
 * not a human's memory of them, so this reads author / licence / source page
 * out of the same API response that authorised the download. A file whose
 * licence string is not on the allow-list below is refused, loudly. There is no
 * flag to override that: a wrongly-licensed image in a public repo is a real
 * problem, and "I checked by eye" is how it gets there.
 *
 *   node work/fetch-figure.mjs search "compact bone osteon"      # candidates
 *   node work/fetch-figure.mjs info "File:Foo.jpg"               # licence only
 *   node work/fetch-figure.mjs get "File:Foo.jpg" osteon.jpg     # verify+save
 *   node work/fetch-figure.mjs get "File:Foo.jpg" osteon.jpg 1200  # ...scaled
 *
 * The optional width fetches Commons' own rendering at that pixel width. Use it
 * for anything over ~800 kB: every figure is precached by the service worker,
 * so a 2 MB original is 2 MB every user pays for offline, and nothing in this
 * app displays a figure wider than a phone screen at 2x.
 *
 * `get` prints the figures.js stanza to paste, with author/licence/commons
 * already filled in from the response.
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'RadiographyStudyStudio/1.0 (educational, non-commercial; github.com/GwongY/radiography-study-studio)';
const OUT = 'outputs/assets/figures';

/* Free licences only. Public-domain marks and CC0 need no attribution; CC BY
   and CC BY-SA do, and the app renders it. Anything else — NC, ND, "fair use",
   a bare "GFDL" with no CC dual-licence — is refused. */
const FREE = [
  /^CC0/i, /^CC BY(-SA)? [1-4]\.\d/i, /^Public domain/i, /^PD/i,
  /^CC-BY(-SA)?-[1-4]\.\d/i, /^Attribution/i,
];
const isFree = (s) => !!s && FREE.some((re) => re.test(s.trim()));

const strip = (html) => String(html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  return res.json();
}

async function search(query) {
  const j = await api({
    action: 'query', generator: 'search', gsrsearch: `filetype:bitmap|drawing ${query}`,
    gsrnamespace: '6', gsrlimit: '18', prop: 'imageinfo',
    iiprop: 'url|size|extmetadata', iiurlwidth: '10',
  });
  const pages = Object.values(j.query?.pages || {});
  if (!pages.length) return console.log('no results');
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    const m = ii.extmetadata || {};
    const lic = strip(m.LicenseShortName?.value);
    console.log(`${isFree(lic) ? 'FREE' : 'NO  '}  ${String(lic).padEnd(16)} ${
      String(Math.round((ii.size || 0) / 1024) + 'k').padStart(7)}  ${ii.width}x${ii.height}  ${p.title}`);
  }
}

async function meta(title, width) {
  /* iiurlwidth makes Commons render the thumbnail and hand back its URL.
     Never build that URL by hand: the thumbnails moved to their own host,
     and the originals now come back carrying a tracking query string, so
     string-surgery on `url` produces a 400. Ask, don't construct. */
  const j = await api({
    action: 'query', titles: title, prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    ...(width ? { iiurlwidth: String(width) } : {}),
  });
  const p = Object.values(j.query?.pages || {})[0];
  if (!p || p.missing !== undefined) throw new Error(`no such file: ${title}`);
  const ii = p.imageinfo?.[0];
  if (!ii) throw new Error(`no imageinfo for ${title}`);
  const m = ii.extmetadata || {};
  return {
    title: p.title,
    url: ii.url,
    thumb: ii.thumburl || null,
    mime: ii.mime,
    bytes: ii.size,
    w: ii.width,
    h: ii.height,
    author: strip(m.Artist?.value) || 'unknown',
    licence: strip(m.LicenseShortName?.value),
    licenceUrl: strip(m.LicenseUrl?.value),
    commons: strip(m.DescriptionUrl?.value) || ii.descriptionurl,
    desc: strip(m.ImageDescription?.value).slice(0, 300),
  };
}

async function main() {
  const [cmd, a, b, width] = process.argv.slice(2);
  if (cmd === 'search') return search(a);

  if (cmd === 'info' || cmd === 'get') {
    const info = await meta(a, cmd === 'get' ? width : null);
    console.log(`title    ${info.title}
author   ${info.author}
licence  ${info.licence}  ${info.licenceUrl}
size     ${info.w}x${info.h}, ${Math.round(info.bytes / 1024)} kB, ${info.mime}
page     ${info.commons}
desc     ${info.desc}`);
    if (!isFree(info.licence)) {
      console.error(`\nREFUSED — "${info.licence}" is not on the free-licence allow-list.`);
      process.exit(1);
    }
    console.log('\nlicence OK (free)');
    if (cmd === 'info') return;

    if (!b) throw new Error('get needs an output filename');
    const dest = join(OUT, b);
    if (existsSync(dest)) throw new Error(`${dest} already exists — pick another name`);
    /* Commons renders a thumbnail at any width from the same original, under
       the same licence. Vector files are left alone — they are already small,
       and rasterising one loses the reason to have an SVG. */
    const src = (width && !/svg/.test(info.mime) && info.thumb) ? info.thumb : info.url;
    const res = await fetch(src, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`download ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`\nsaved ${dest} (${buf.length} bytes)\n`);
    console.log(`  FIGKEY: {
    file: '${b}', bytes: ${buf.length},
    title: 'TODO',
    caption: 'TODO',
    author: ${JSON.stringify(info.author)},
    licence: ${JSON.stringify(info.licence)},
    licenceUrl: ${JSON.stringify(info.licenceUrl)},
    commons: ${JSON.stringify(info.commons)},
    intro: 'TODO — what it shows, why it is on this lesson, how to read it',
    key: [ /* every visible callout */ ],
  },`);
    return;
  }
  console.error('usage: fetch-figure.mjs search|info|get ...');
  process.exit(2);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
