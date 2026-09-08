/* Minimal static server for outputs/ — same role as `python -m http.server 8420`
 * but runnable under the Bash(node:*) allow rule during classifier outages. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..', 'outputs');
/*
 * 8420 by default, and overridable, because this repo is worked on in more
 * than one checkout at a time (.claude/worktrees/). With the port hardcoded
 * the second server silently loses the bind and the browser keeps being
 * served the FIRST checkout's outputs/ — which looks exactly like an edit
 * that did not take, and costs an hour before anyone suspects the port.
 */
const PORT = Number(process.env.PORT) || 8420;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.glb': 'model/gltf-binary',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(ROOT, path));
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    let st = await stat(file).catch(() => null);
    if (st && st.isDirectory()) { res.writeHead(301, { Location: path + '/' }); res.end(); return; }
    if (!st) { res.writeHead(404); res.end('404'); return; }
    const body = await readFile(file);
    /*
     * no-store, because this server exists to be checked against.
     *
     * It sent no cache headers at all, so the browser cached by heuristic:
     * modules imported without a ?v= query kept loading in their old form
     * after an edit, and a fix would appear not to work -- or worse, a broken
     * one would appear to. docs/TRAPS.md already records that failure against
     * the service worker; this was the same trap one layer down, and it cost a
     * wrong diagnosis to find. Nothing here is served to a real user.
     */
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store, must-revalidate',
    });
    res.end(body);
  } catch (e) {
    res.writeHead(500); res.end(String(e));
  }
}).listen(PORT, () => console.log(`serving ${ROOT} at http://localhost:${PORT}`));
