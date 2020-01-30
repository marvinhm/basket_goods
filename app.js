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

app.use(morgan('tiny'));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Shop',
    },
  );
});


app.listen(port, () => {
  debug(`Listneing at port ${chalk.green(port)}`);
});

module.exports = app;
