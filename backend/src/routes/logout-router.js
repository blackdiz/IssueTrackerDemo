'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  }
});

module.exports = router;
