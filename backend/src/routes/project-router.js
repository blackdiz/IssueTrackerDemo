'use strict';

const router = require('express').Router();
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const projectService = require('../service/project-service');
const logger = require('../config/logger');

router.get('/', (req, res) => {
  (async () => {
    try {
      const projects = await projectService.getProjects(req.session.account.name);
      res.status(200).json(projects);
    } catch (err) {
      if (err.name === 'noAccount') {
        res.status(400).end('查無使用者資料');
      } else {
        logger.error(`Get projects of ${req.session.account.name} failed, ${err}`);
        res.status(500).end();
      }
    }
  })();
});

router.get('/:id', (req, res) => {
  (async () => {
    try {
      const project = await projectService.getProject(req.session.account.name, req.params.id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      if (err.name === 'noAccount') {
        res.status(400).end('查無使用者資料');
      } else {
        res.status(500).end();
      }
    }
  })();
});

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
        logger.error(`Create project for ${req.session.account.name} failed ${err}`);
        res.status(500).end();
      }
    }
  })();
});

router.put('/:id', validate(schema.project), (req, res) => {
  (async () => {
    try {
      const project = await projectService.updateProject(req.body.project, req.params.id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(500).end();
      }
    } catch (err) {
      res.status(500).end();
    }
  })();
});

module.exports = router;
