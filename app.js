// list of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


// stuff going on outside of requires
const app = express();

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, () => {
  debug(`Listneing on port ${chalk.green(5000)}`);
});
