'use strict';

const express = require('express');
const logger = require('../config/logger');

const router = express.Router();

router.post('/', (req, res) => {
  logger.info(req.body.name);
  res.json({ test: 'test' });
});

module.exports = router;
