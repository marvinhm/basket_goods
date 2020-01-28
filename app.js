// list of requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');


// stuff going on outside of requires
const app = express();

app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.send('Welcome to the Groccery');
});

app.listen(5000, () => {
  debug(`Listneing on port ${chalk.green(5000)}`);
});
