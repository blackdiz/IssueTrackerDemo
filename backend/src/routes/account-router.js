'use strict';

const router = require('express').Router();
const signUpService = require('../service/sign-up-service');
const logger = require('../config/logger');

router.post('/', (req, res) => {
  if (!req.body.accountname) {
    res.status(400).json({ errorMessage: '請輸入使用者名稱' });
  } else if (!req.body.password) {
    res.status(400).json({ errorMessage: '請輸入密碼' });
  } else {
    (async () => {
      try {
        await signUpService.signUp({ name: req.body.accountname, password: req.body.password });
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
