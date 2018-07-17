'use strict';

const router = require('express').Router();
const issueOptionService = require('../service/issue-option-service');

router.get('/tags', async (req, res, next) => {
  try {
    res.status(200).json(await issueOptionService.findAllTags());
  } catch (err) {
    next(err);
  }
});

router.get('/status', async (req, res, next) => {
  try {
    res.status(200).json(await issueOptionService.findAllStatus());
  } catch (err) {
    next(err);
  }
});

router.get('/priorities', async (req, res, next) => {
  try {
    res.status(200).json(await issueOptionService.findAllPriorities());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
