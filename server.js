const http = require('http');
const fs = require('fs');
const path = require('path');

const fileMap = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/about.html': 'about.html',
  '/contact.html': 'contact.html'
};

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(__dirname, fileMap[url] || '404.html');

  const contentType = path.extname(filePath) === '.css' ? 'text/css' : 'text/html';
  res.setHeader('Content-Type', contentType);

  const stream = fs.createReadStream(filePath);
  stream.on('error', (err) => {
    res.statusCode = 500;
    res.end('Error interno del servidor');
  });

  stream.pipe(res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});