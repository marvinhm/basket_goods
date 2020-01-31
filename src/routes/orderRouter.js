const express = require('express');
const orderController = require('../controllers/orderController');

function routes(nav, Order) {
  const orderRouter = express.Router();
  const controller = orderController(nav, Order);
  orderRouter.route('/order/')
    .post(controller.post)
    .get(controller.get);
  orderRouter.route('/order/new')
    .post(controller.post)
    .get(controller.getNew);
  orderRouter.route('/order/:id')
    .get(controller.show);

  return orderRouter;
}

module.exports = routes;
