const products = require('../data/products.json');

async function find() {
  return new Promise((resolve, reject) => {
    resolve(products);
    reject({'message': 'can not find' })
  });
}

const ProductModel = {
  find,
};

module.exports = ProductModel;
