'use strict';

const express = require('express');
const helmet = require('helmet'); // 設定正確的Header保護AP
const cors = require('cors'); // 設定CORS
const bodyParser = require('body-parser'); // parse POST的body
const logger = require('./config/logger');

const app = express();
const port = process.env.Production || 3000;

// 設定所有router都可接受CORS的prefight request
app.options('*', cors());

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/account', require('./routes/account-router'));

app.listen(port, () => {
  logger.info(`Server starts at ${port}`);
});
