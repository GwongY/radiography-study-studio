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
