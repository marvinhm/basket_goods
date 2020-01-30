const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderModel = new Schema({
  order: { type: Array },
});

module.exports = mongoose.model('Orders', orderModel);
