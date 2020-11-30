const express = require("express");
const ProductCtrl = require("../controllers/ProductController");

const Router = express.Router();

Router.get('/', ProductCtrl.index) // api.com/product "Index. Lista todos los productos"
      .post('/', ProductCtrl.create)   // api.com/product "Create. Crea un nuevo producto"
      .get('/:key/:value', ProductCtrl.find, ProductCtrl.show)    // api.com/product/category/Hogar "show. Muestra un producto específico"
      .put('/:key/:value', ProductCtrl.find, ProductCtrl.update)    // api.com/product/name/SamsungGalaxy "Update. Actualiza un producto en específico"
      .delete('/:key/:value', ProductCtrl.find, ProductCtrl.remove) // api.com/product/name/SamsungGalaxy

module.exports = Router;
