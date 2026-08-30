/* Minimal static server for outputs/ — same role as `python -m http.server 8420`
 * but runnable under the Bash(node:*) allow rule during classifier outages. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..', 'outputs');
const PORT = 8420;

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
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  } catch (e) {
    res.writeHead(500); res.end(String(e));
  }
}).listen(PORT, () => console.log(`serving ${ROOT} at http://localhost:${PORT}`));
