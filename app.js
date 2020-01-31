// list of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


// stuff going on outside of requires
const app = express();
const db = mongoose.connect('mongodb://localhost/shopAPI');
const port = process.env.PORT || 5000;
const Product = require('./src/models/productModel');
const Order = require('./src/models/orderModel');

const nav = [
  { title: 'View Products', link: '/api/products/' },
  { title: 'Make Order', link: '/api/order/new' },
  { title: 'View Order Result', link: '/api/order/show' },
];
const productRouter = require('./src/routes/productRouter')(Product);
const orderRouter = require('./src/routes/orderRouter')(nav, Order);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


app.use(morgan('tiny'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api', productRouter);
app.use('/api', orderRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      homePath: '/api/order/new',
      title: "Welcome to Marvin's Grocery Store",
    },
  );
});


app.listen(port, () => {
  debug(`Listneing at port ${chalk.green(port)}`);
});

module.exports = app;
