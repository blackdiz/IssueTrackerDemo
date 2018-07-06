'use strict';

const express = require('express');
const helmet = require('helmet'); // 設定正確的Header保護AP
const cors = require('cors'); // 設定CORS
const bodyParser = require('body-parser'); // parse POST的body
const session = require('express-session');
const logger = require('./config/logger');
const expressValidation = require('express-validation');

const app = express();
const port = process.env.Production || 3000;

// 設定所有router都可接受CORS的prefight request
const corsOption = {
  origin: 'http://issue-tracker-demo.com:8080',
  credentials: true,
  allowedHeaders: 'Content-Type'
};

app.use(helmet());
app.use(cors(corsOption));
app.use(
  // saveUninitialized: false 表示不會即使沒有登入也建立session
  session({
    name: 'issue-tracker-demo',
    secret: 'issue-tracker',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      domain: 'issue-tracker-demo.com',
      httpOnly: true,
      maxAge: 1800000
    }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 不是/login POST和/account POST的都需要登入
app.use((req, res, next) => {
  if (shouldAuth(req) && !req.session.account) {
    res.status(401).end();
  } else {
    next();
  }
});

// 若非GET則只接受application/json的request強制CORS的prefight，避免CORS
app.use((req, res, next) => {
  if (req.method === 'GET' || (req.method === 'POST' && req.is('application/json'))) {
    next();
  } else {
    res.status(406).end();
  }
});

app.use('/api/account', require('./routes/account-router'));
app.use('/api/login', require('./routes/login-router'));
app.use('/api/project', require('./routes/project-router'));

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    logger.error(err);
    res.status(err.status).json(err);
  }
});

app.listen(port, () => {
  logger.info(`Server starts at ${port}`);
});

function shouldAuth(req) {
  return (
    !(req.originalUrl === '/api/login' && req.method === 'POST') &&
    !(req.originalUrl === '/api/account' && req.method === 'POST')
  );
}
