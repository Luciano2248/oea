const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página no encontrada</h1><a href="/">Volver al inicio</a>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🦷 OEA Dental — Servidor corriendo en http://localhost:${PORT}\n`);
  console.log('  Páginas disponibles:');
  console.log(`  → Inicio:         http://localhost:${PORT}/`);
  console.log(`  → Implantes:      http://localhost:${PORT}/pages/implantes.html`);
  console.log(`  → Carillas:       http://localhost:${PORT}/pages/carillas.html`);
  console.log(`  → Ortodoncia:     http://localhost:${PORT}/pages/ortodoncia.html`);
  console.log(`  → Blanqueamiento: http://localhost:${PORT}/pages/blanqueamiento.html`);
  console.log(`  → Endodoncia:     http://localhost:${PORT}/pages/endodoncia.html`);
  console.log(`  → Pediátrica:     http://localhost:${PORT}/pages/pediatrica.html`);
  console.log(`  → Prostodoncia:   http://localhost:${PORT}/pages/prostodoncia.html`);
  console.log(`  → Consultorio:    http://localhost:${PORT}/pages/consultorio.html`);
  console.log(`  → Nosotros:       http://localhost:${PORT}/pages/nosotros.html`);
  console.log(`  → Contacto:       http://localhost:${PORT}/pages/contacto.html`);
  console.log('\n  Presioná Ctrl+C para detener el servidor.\n');
});
