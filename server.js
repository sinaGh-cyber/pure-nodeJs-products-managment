const http = require('http');
const ErrorHandler = require('./controllers/errorHandler.controller');
const ProductsController = require('./controllers/product.controllers');
const PORT = 3000;
const products = require('./data/products.json');

const server = http.createServer((req, res) => {
  console.log(`${req.method}: ${req.url}`);
  const apiRout = 'api';
  const productsRout = `/${apiRout}/products`;
  const singleProductRout = /\/api\/products\/[0-9]+/;
  const { url, method } = req;

  if (url === productsRout && method === 'GET') {
    ProductsController.get(req, res);
  } else if (url.match(singleProductRout) && method === 'GET') {
    ProductsController.getById(req, res);
  } else if (url.match(singleProductRout) && method === 'POST') {
    ProductsController.create(req, res);
  } else if (url.match(singleProductRout) && method === 'PUT') {
    ProductsController.update(req, res);
  } else if (url.match(singleProductRout) && method === 'DELETE') {
    ProductsController.remove(req, res);
  } else {
    ErrorHandler.notFound(res);
  }
});

server.listen(PORT);
console.log(`run server on port ${PORT} http://localhost:${PORT}`);
