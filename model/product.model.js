const products = require('../data/products.json');
const fs = require('fs');
const { rejects } = require('assert');

async function find() {
  return new Promise((resolve) => {
    resolve(products);
  });
}

async function findById(id) {
  return new Promise((resolve) => {
    resolve(products.find((prod) => prod.id === id));
  });
}

async function create(product) {
  return new Promise((resolve, rejects) => {
    products.push(product);
    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(products),
      (error) => {
        if (error) rejects(error);
        else resolve({ message: 'new product created.', data: product });
      }
    );
  });
}

async function remove(id) {
  return new Promise((resolve, rejects) => {
    const newProducts = products.filter((prod) => prod.id !== id);
    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(newProducts),
      (error) => {
        if (error) rejects(error);
        else
          resolve({
            message: `product with id: ${id} deleted.`,
            data: newProducts,
          });
      }
    );
  });
}

async function update(id, payload) {
  return new Promise((resolve, rejects) => {

   const newProducts =  products.map((prod) => {
      if (prod.id === id) {
        Object.assign(prod, payload);
      }
      return prod;
    });



    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(newProducts),
      (error) => {
        if (error) rejects(error);
        else
          resolve({ message: `product with id: ${id} updated successfully.` });
      }
    );
  });
}

const ProductModel = {
  find,
  findById,
  create,
  remove,
  update,
};

module.exports = ProductModel;
