const http = require('http');
const ProductsController = require('./controllers/product.controllers');
const PORT = 3000;
const products = require('./data/products.json');

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === '/api/products') {
    ProductsController.get(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Rout Not Found' }));
    res.end();
  }
});

server.listen(PORT);
console.log(`run server on port ${PORT} http://localhost:${PORT}`);
