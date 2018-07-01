'use strict';

const express = require('express');
const signUpService = require('../service/sign-up-service');
const logger = require('../config/logger');

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'no account name' });
  } else if (!req.body.password) {
    res.status(400).json({ error: 'no account password' });
  } else {
    (async () => {
      try {
        await signUpService.signUp({ name: req.body.name, password: req.body.password });
        res.end();
      } catch (err) {
        logger.error(err);
        res.status(500).json({ error: JSON.stringify(err) });
      }
    })();
  }
});

module.exports = router;
