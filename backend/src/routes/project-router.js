'use strict';

const router = require('express').Router();
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const projectService = require('../service/project-service');
const { UniqueViolationError } = require('objection-db-errors');
const logger = require('../config/logger');

router.get('/', (req, res) => {
  (async () => {
    try {
      const projects = await projectService.getAllProjects(req.session.account.name);
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
      if (project !== null) {
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
      if (project !== null) {
        res.status(200).json(project);
      }
    } catch (err) {
      if (err instanceof UniqueViolationError) {
        res.status(409).json({ message: '已有此專案名稱' });
      } else if (err.name === 'noAccount') {
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
      if (project !== null) {
        res.status(200).json(project);
      } else {
        res.status(500).end();
      }
    } catch (err) {
      res.status(500).end();
    }
  })();
});

router.delete('/:id', (req, res) => {
  (async () => {
    const deleteCount = await projectService.deleteProject(req.session.account.name, req.params.id);
    if (deleteCount === 1) {
      res.status(204).end();
    } else {
      res.status(500).end();
    }
  })();
});

router.get('/:id/issues', (req, res) => {
  (async () => {
    res.status(200).json(await projectService.getAllIssues(req.params.id));
  })();
});

router.post('/:id/issues', validate(schema.issue), (req, res) => {
  (async () => {
    const newProject = await projectService.addIssueToProject(
      req.body.issue,
      req.session.account.name
    );
    if (newProject !== null) {
      res.status(201).json(newProject);
    } else {
      res.status(400).end();
    }
  })();
});

router.get('/:id/issues/:issueId', (req, res) => {
  (async () => {
    const issue = await projectService.getIssue(req.params.id, req.params.issueId);
    if (issue !== null) {
      res.status(200).json(issue);
    } else {
      res.status(404).end();
    }
  })();
});

router.put('/:id/issues/:issueId', validate(schema.issue), (req, res) => {
  (async () => {
    const issue = await projectService.updateIssue(
      req.params.id,
      req.params.issueId,
      req.body.issue
    );
    if (issue !== null) {
      res.status(200).json(issue);
    } else {
      res.status(400).end();
    }
  })();
});

router.delete('/:id/issues/:issueId', (req, res) => {
  (async () => {
    const deleteCount = await projectService.deleteIssue(req.params.id, req.params.issueId);
    if (deleteCount === 1) {
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  })();
});

router.get('/:id/accounts', (req, res) => {
  (async () => {
    res.status(200).json(await projectService.getAllAccounts(req.params.id));
  })();
});
module.exports = router;
