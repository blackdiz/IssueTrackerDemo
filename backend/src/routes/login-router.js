'use strict';

const router = require('express').Router();
const authService = require('../service/auth-service');
const logger = require('../config/logger');

router.post(
  '/',
  (req, res, next) => {
    if (!req.body.accountname) {
      res.status(400).json({ errorMessage: '請輸入使用者名稱' });
    } else if (!req.body.password) {
      res.status(400).json({ errorMessage: '請輸入密碼' });
    } else {
      logger.info(req.session.account);
      logger.info('test');
      next();
    }
  },
  (req, res) => {
    (async () => {
      try {
        const account = await authService.authenticate(req.body.accountname, req.body.password);
        if (account) {
          req.session.account = account;
          res.status(200).end();
        } else {
          res.status(401).end();
        }
      } catch (err) {
        logger.error(err);
        res.status(400).end();
      }
    })();
  }
);

module.exports = router;
