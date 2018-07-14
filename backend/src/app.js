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

app.use(helmet());
// 開發環境使用express的cors設定，正式環境使用nginx控制
if (process.env.NODE_ENV === 'development') {
  // 設定所有router都可接受CORS的prefight request
  const corsOption = {
    origin: 'http://issue-tracker-demo.com:8080',
    credentials: true,
    allowedHeaders: 'Content-Type'
  };
  app.use(cors(corsOption));
}
app.use(
  // saveUninitialized: false 表示不會即使沒有登入也建立session
  session({
    name: 'issue-tracker-demo',
    secret: 'issue-tracker',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      domain:
        process.env.NODE_ENV === 'development'
          ? 'issue-tracker-demo.com'
          : 'issue-tracker-demo.nctu.me',
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
  if (
    req.method === 'GET' ||
    req.method === 'DELETE' ||
    (req.method !== 'GET' && req.is('application/json'))
  ) {
    next();
  } else {
    res.status(406).end();
  }
});

app.use('/api/accounts', require('./routes/account-router'));
app.use('/api/login', require('./routes/login-router'));
app.use('/api/logout', require('./routes/logout-router'));
app.use('/api/projects', require('./routes/project-router'));
app.use('/api/issue-options', require('./routes/issue-option-router'));

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    logger.error(JSON.stringify(err));
    res.status(err.status).json(err);
  } else {
    res.status(500).end();
  }
});

app.listen(port, () => {
  logger.info(`Server starts at ${port} and env is ${process.env.NODE_ENV}`);
});

function shouldAuth(req) {
  return (
    !(req.originalUrl === '/api/login' && req.method === 'POST') &&
    !(req.originalUrl === '/api/accounts' && req.method === 'POST')
  );
}
