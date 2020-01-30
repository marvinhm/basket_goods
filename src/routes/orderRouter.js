const express = require('express');

const orderRouter = express.Router();

function routes() {
  orderRouter.get('/orders', (req, res) => {
    res.send('order all here');
  });
}

module.exports = routes;
