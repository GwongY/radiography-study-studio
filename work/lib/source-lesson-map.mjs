function decodeName(name) {
  try {
    return decodeURIComponent(String(name));
  } catch {
    return String(name);
  }
}

export function normaliseSourceFile(name) {
  return decodeName(name)
    .replaceAll('\\', '/')
    .split('/')
    .at(-1)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/* Keep this normalization in one place. source-check.mjs uses the same
   comparison for its existing quote gate, while the source-map generator also
   requires a positive page or quoted section/slide locator before a teaching
   source can be promoted. */
export function normaliseCitationText(value) {
  return String(value).toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ').trim();
}

export function citationQuoteParts(reference) {
  const quote = (String(reference?.location || '').match(/"([^"]{4,})"/) || [])[1] || '';
  return quote.split(/\s+[—–]\s+/).map(normaliseCitationText).filter(Boolean);
}

export function citationPageNumbers(reference) {
  const location = String(reference?.location || '');
  const match = location.match(/\b(?:pp?|slides?)\.?\s*((?:\d+\s*(?:[–—-]\s*\d+)?)(?:\s*(?:,|and)\s*\d+\s*(?:[–—-]\s*\d+)?)*)/i);
  if (!match) return [];
  const pages = [];
  for (const part of match[1].split(/\s*(?:,|and)\s*/i)) {
    const range = part.match(/^(\d+)\s*(?:[–—-]\s*(\d+))?$/);
    if (!range) continue;
    const from = Number(range[1]);
    const to = Number(range[2] || range[1]);
    if (from < 1 || to < from || to - from > 500) return [];
    for (let page = from; page <= to; page++) pages.push(page);
  }
  return [...new Set(pages)];
}

export function citationEvidence(reference, sourceText) {
  const pages = Array.isArray(sourceText?.pages) ? sourceText.pages : [];
  if (!pages.length) return { ok: false, reason: 'no committed source text' };

  const claimedPages = citationPageNumbers(reference);
  const quoteParts = citationQuoteParts(reference);
  const invalidPage = claimedPages.find((page) => page > pages.length);
  if (invalidPage) return { ok: false, claimedPages, reason: 'citation names a page outside committed source text' };

  const containsQuote = (pageNumber) => {
    const page = normaliseCitationText(pages[pageNumber - 1] || '');
    return quoteParts.every((part) => page.includes(part));
  };
  if (quoteParts.length) {
    const candidates = claimedPages.length ? claimedPages : pages.map((_, index) => index + 1);
    const matchedPage = candidates.find(containsQuote);
    if (matchedPage) return { ok: true, claimedPages, matchedPage, kind: claimedPages.length ? 'page' : 'section' };
    const foundPage = pages.findIndex((_, index) => containsQuote(index + 1)) + 1;
    return {
      ok: false,
      claimedPages,
      foundPage: foundPage || 0,
      reason: foundPage ? 'quoted citation is on a different page' : 'quoted section or slide is absent from committed source text',
    };
  }

  if (claimedPages.length) return { ok: true, claimedPages, kind: 'page' };
  return { ok: false, reason: 'citation has no verifiable page or quoted section/slide' };
}

export function groupReferencesByRef(references = []) {
  const grouped = new Map();
  for (const reference of references) {
    if (!reference?.ref) continue;
    if (!grouped.has(reference.ref)) grouped.set(reference.ref, []);
    grouped.get(reference.ref).push(reference);
  }
  return grouped;
}

function locationIsNew(location) {
  const path = decodeName(typeof location === 'string' ? location : location?.path ?? location?.location ?? '');
  return path.replaceAll('\\', '/').toLowerCase().split('/').includes('new source');
}

export function sourceSetFor(source, newFiles) {
  const file = normaliseSourceFile(source?.file ?? '');
  if (newFiles?.has(file)) return 'new';
  if ((source?.locations ?? []).some(locationIsNew)) return 'new';
  return 'old';
}

export function sourceRoleFor({ set, kind, verified, hasNewPrimary }) {
  if (!verified) return 'needs-review';
  if (kind === 'assessment') return 'assessment';
  if (kind === 'admin' || kind === 'syllabus') return 'administration';
  if (kind === 'student') return 'student-work';
  if (set === 'new' && kind === 'primary') return 'current-primary';
  if (set === 'old' && kind === 'primary' && hasNewPrimary) return 'older-supporting';
  return 'older-fallback';
}

export function lessonStatus({ primary, supporting, unresolved, hasGap: _hasGap }) {
  if ((primary?.length ?? 0) > 0) return 'complete';
  if ((supporting?.length ?? 0) > 0) return 'partial';
  if (unresolved) return 'needs-review';
  return 'missing';
}

export function indexMap(sources = []) {
  return new Map(sources.map((source) => [source.lessonId, source]));
}
