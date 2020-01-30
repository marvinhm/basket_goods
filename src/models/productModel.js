const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema({
  title: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('Product', productModel);
