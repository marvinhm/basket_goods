// list of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');


// stuff going on outside of requires
const app = express();
const db = mongoose.connect('mongodb://localhost/shopAPI');
const port = process.env.PORT || 5000;
const Product = require('./src/models/productModel');
const productRouter = require('./src/routes/productRouter')(Product);
// const orderRouter = require('./src/routes/orderRouter');

app.use(morgan('tiny'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api', productRouter);


const orderRouter = express.Router();
const nav = [
  { title: 'View Orders', link: '/api/order/index' },
  { title: 'Make Order', link: '/api/order/new' },
];

orderRouter.get('/order/index', (req, res) => {
  res.render(
    'orderIndex',
    {
      nav,
      title: 'List of Orders',
    },
  );
});

orderRouter.post((req, res) => {
  res.render(
    'orderNew',
    {
      title: 'Shop',
    },
  );
});

app.use('/api', orderRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title: 'Shop',
    },
  );
});


app.listen(port, () => {
  debug(`Listneing at port ${chalk.green(port)}`);
});

module.exports = app;
