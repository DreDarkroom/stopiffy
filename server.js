// Zero-dependency static + API server for Stopiffy. CC0-1.0
// Usage: node server.js [port]    (also serves any static host-able folder: public/)
const http = require('http');
const fs = require('fs');
const path = require('path');
const sdk = require('./public/sdk/stopiffy.js');

const PUBLIC = path.join(__dirname, 'public');
const PORT = Number(process.argv[2] || process.env.PORT || 4300);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain' };

function json(res, obj, code = 200) {
  res.writeHead(code, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
  res.end(JSON.stringify(obj));
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = decodeURIComponent(url.pathname);
  if (p === '/api/tracks' || p === '/api/tracks.json') return json(res, { service: 'stopiffy', tracks: sdk.BUILTIN });
  const m = p.match(/^\/api\/tracks\/([\w-]+)$/);
  if (m) {
    const t = sdk.BUILTIN.find(x => x.id === m[1]);
    return t ? json(res, t) : json(res, { error: 'not found' }, 404);
  }
  let file = path.join(PUBLIC, p === '/' ? 'index.html' : p);
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    return res.end('404 — this track was not found (Dee probably forgot to upload it)');
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'access-control-allow-origin': '*' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Stopiffy running on http://localhost:${PORT}`));
