'use strict';

const router = require('express').Router();
const issueOptionService = require('../service/issue-option-service');

router.get('/tags', (req, res) => {
  (async () => {
    res.status(200).json(await issueOptionService.findAllTags());
  })();
});

router.get('/status', (req, res) => {
  (async () => {
    res.status(200).json(await issueOptionService.findAllStatus());
  })();
});

router.get('/priorities', (req, res) => {
  (async () => {
    res.status(200).json(await issueOptionService.findAllPriorities());
  })();
});

module.exports = router;
