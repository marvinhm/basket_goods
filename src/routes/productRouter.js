const express = require('express');
const productsController = require('../controllers/productController');

function routes(Product) {
  const productRouter = express.Router();
  const controller = productsController(Product);
  productRouter.route('/products')
    .get(controller.get);

  productRouter.route('/products/:productId')
    .get((req, res) => {
      Product.findById(req.params.productId, (err, product) => {
        if (err) {
          return res.send(err);
        }
        return res.json(product);
      });
    });

  return productRouter;
}

module.exports = routes;
