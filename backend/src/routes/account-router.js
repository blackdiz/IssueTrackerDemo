'use strict';

const router = require('express').Router();
const signUpService = require('../service/sign-up-service');
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const logger = require('../config/logger');

router.post('/', validate(schema.account), (req, res) => {
  (async () => {
    try {
      await signUpService.signUp(req.body.account);
      res.status(200).end();
    } catch (err) {
      if (err.name === 'duplicateAccount') {
        res.status(400).end('已有此使用者名稱');
      } else {
        logger.error(JSON.stringify(err));
        res.status(500).end();
      }
    }
  })();
});

module.exports = router;
