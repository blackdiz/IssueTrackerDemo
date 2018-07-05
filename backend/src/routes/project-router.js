'use strict';

const router = require('express').Router();
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const projectService = require('../service/project-service');

router.post('/', validate(schema.project), (req, res) => {
  (async () => {
    try {
      const project = await projectService.createProject(req.body.project, req.session.account);
      if (project) {
        res.status(200).json(project);
      }
    } catch (err) {
      if (err.name === 'noAccount') {
        res.status(400).send('查無使用者資料');
      } else {
        res.status(500).end();
      }
    }
  })();
});

module.exports = router;
