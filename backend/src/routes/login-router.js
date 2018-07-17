'use strict';

const router = require('express').Router();
const authService = require('../service/auth-service');
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const AuthenticationError = require('../error/AuthenticationError');

router.post('/', validate(schema.account), async (req, res, next) => {
  try {
    const account = await authService.authenticate(req.body.account);
    if (account) {
      req.session.account = account;
      res.status(200).end();
    } else {
      res.status(401).json({ message: '查無此使用者帳號' });
    }
  } catch (err) {
    if (err instanceof AuthenticationError) {
      res.status(401).json({ message: '密碼錯誤' });
    } else {
      next(err);
    }
  }
});

router.get('/', (req, res) => {
  if (req.session.account) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});
module.exports = router;
