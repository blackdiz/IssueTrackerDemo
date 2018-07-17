'use strict';

const router = require('express').Router();
const signUpService = require('../service/sign-up-service');
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const { UniqueViolationError } = require('objection-db-errors');

router.post('/', validate(schema.account), async (req, res, next) => {
  try {
    await signUpService.signUp(req.body.account);
    res.status(200).end();
  } catch (err) {
    if (err instanceof UniqueViolationError) {
      res.status(409).json({ message: '已有此使用者名稱' });
    } else {
      next(err);
    }
  }
});

module.exports = router;
