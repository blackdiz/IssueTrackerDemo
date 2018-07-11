'use strict';

const router = require('express').Router();
const authService = require('../service/auth-service');
const logger = require('../config/logger');

router.post(
  '/',
  (req, res, next) => {
    if (!req.body.accountName) {
      res.status(400).json({ errorMessage: '請輸入使用者名稱' });
    } else if (!req.body.password) {
      res.status(400).json({ errorMessage: '請輸入密碼' });
    } else {
      next();
    }
  },
  (req, res) => {
    (async () => {
      try {
        const account = await authService.authenticate(req.body.accountName, req.body.password);
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
  }
);

module.exports = router;
