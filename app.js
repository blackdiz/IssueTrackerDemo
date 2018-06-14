'use strict';

const express = require('express');
const logger = require('./config/logger');

const app = express();
const port = process.env.Production || 3000;

app.listen(port, () => {
  logger.info(`Server starts at ${port}`);
});
