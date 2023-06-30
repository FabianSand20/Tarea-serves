const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;
  let filePath;

  if (url === '/' || url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (url === '/about.html') {
    filePath = path.join(__dirname, 'about.html');
  } else if (url === '/contact.html') {
    filePath = path.join(__dirname, 'contact.html');
  } else {
    filePath = path.join(__dirname, '404.html');
  }

  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error interno del servidor');
      return;
    }

    let contentType = 'text/html';
    if (filePath.endsWith('.css')) {
      contentType = 'text/css';
    }

    res.setHeader('Content-Type', contentType);
    res.statusCode = 200;
    res.end(fileContent);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
