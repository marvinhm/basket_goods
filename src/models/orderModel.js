const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderModel = new Schema({
  list: { type: String },
  total: { type: Number },
  currency: { type: String },
});

module.exports = mongoose.model('Order', orderModel);
