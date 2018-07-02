'use strict';

const express = require('express');
const signUpService = require('../service/sign-up-service');
const logger = require('../config/logger');

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ errorMessage: '請輸入使用者名稱' });
  } else if (!req.body.password) {
    res.status(400).json({ errorMessage: '請輸入密碼' });
  } else {
    (async () => {
      try {
        await signUpService.signUp({ name: req.body.name, password: req.body.password });
        res.end();
      } catch (err) {
        if (err.name === 'duplicateAccount') {
          res.status(400).json({ errorMessage: '已有此使用者名稱' });
        } else {
          logger.error(JSON.stringify(err));
          res.status(500).end();
        }
      }
    })();
  }
});

module.exports = router;
