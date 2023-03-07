const ProductModel = require('../model/product.model');

async function create(req, res) {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const product = { id: Date.now(), ...JSON.parse(body) };
      const result = await ProductModel.create(product);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}

async function update(req, res) {
  try {
    let body = '';
    const id = req.url.split('/')[3];
    const product = await ProductModel.findById(id);

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const parsedBody = { ...JSON.parse(body) };

      if (!product) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'product not found' }));
        res.end();
      } else {
        const result = await ProductModel.update(id, parsedBody);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function get(req, res) {
  try {
    const products = await ProductModel.find();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getById(req, res) {
  try {
    const id = req.url.split('/')[3];
    const product = await ProductModel.findById(id);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'product not found' }));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

async function remove(req, res) {
  try {
    const id = req.url.split('/')[3];
    const product = await ProductModel.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'product not found' }));
      res.end();
    } else {
      const result = await ProductModel.remove(id)

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

const ProductsController = {
  get,
  getById,
  create,
  update,
  remove
};

module.exports = ProductsController;
