'use strict';

const router = require('express').Router();
const authService = require('../service/auth-service');
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const logger = require('../config/logger');

router.post('/', validate(schema.account), (req, res) => {
  (async () => {
    try {
      const account = await authService.authenticate(req.body.account);
      if (account) {
        req.session.account = account;
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    } catch (err) {
      logger.error(err);
      if (err.name === 'noAccount') {
        res.status(400).end('使用者名稱不存在');
      }
      if (err.name === 'invalidPassword') {
        res.status(400).end('密碼錯誤');
      }
      res.status(400).end();
    }
  })();
});

router.get('/', (req, res) => {
  if (req.session.account) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});
module.exports = router;
