'use strict';

const router = require('express').Router();
const logger = require('../config/logger');

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        logger.error(err.stack);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  } else {
    res.status(200).end();
  }
});

module.exports = router;
