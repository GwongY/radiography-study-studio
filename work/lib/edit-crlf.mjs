/* Exact-match edits on a CRLF file: matches against LF text, writes CRLF back. Throws on a miss or an ambiguous match. */
import { readFileSync, writeFileSync } from 'node:fs';
export function editFile(path, edits) {
  const crlf = readFileSync(path, 'utf8').includes('\r\n');
  let s = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  for (const [from, to, all] of edits) {
    const n = s.split(from).length - 1;
    if (n === 0) throw new Error(`no match in ${path}:\n${from.slice(0, 120)}`);
    if (n > 1 && !all) throw new Error(`${n} matches in ${path}:\n${from.slice(0, 120)}`);
    s = s.split(from).join(to);
  }
  writeFileSync(path, crlf ? s.replace(/\n/g, '\r\n') : s);
}
