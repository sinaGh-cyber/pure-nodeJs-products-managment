const http = require('http');
const PORT = 3000;
const products = require('./data/products.json');

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Rout Not Found' }));
    res.end();
  }
});

server.listen(PORT);
console.log(`run server on port ${PORT} http://localhost:${PORT}`);
