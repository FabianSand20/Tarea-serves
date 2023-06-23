const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/ruta-especifica' || url === "/") {
    fs.readFile('index.html', 'utf8', (err, htmlFile) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(htmlFile);
    });
  } else if (url === '/ejemplo') {
    fs.readFile('../html/about.html', 'utf8', (err, ejemploFile) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(ejemploFile);
    });
  } else if (url === '/otro-ejemplo') {
    fs.readFile('../html/contact.html', 'utf8', (err, otroEjemploFile) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(otroEjemploFile);
    });
  } else {
    fs.readFile('noEncontrada.html', 'utf8', (err, noEncontradaHtmlFile) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.statusCode = 404;
      res.end(noEncontradaHtmlFile);
    });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
