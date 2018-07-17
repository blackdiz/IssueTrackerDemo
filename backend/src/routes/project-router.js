'use strict';

const router = require('express').Router();
const validate = require('express-validation');
const schema = require('../config/validation-schema');
const projectService = require('../service/project-service');
const { UniqueViolationError } = require('objection-db-errors');

router.get('/', async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects(req.session.account.name);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await projectService.getProject(req.session.account.name, req.params.id);
    if (project !== null) {
      res.status(200).json(project);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', validate(schema.project), async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body.project, req.session.account);
    if (project !== null) {
      res.status(200).json(project);
    }
  } catch (err) {
    if (err instanceof UniqueViolationError) {
      res.status(409).json({ message: '已有此專案名稱' });
    } else {
      next(err);
    }
  }
});

router.put('/:id', validate(schema.project), async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.body.project, req.params.id);
    if (project !== null) {
      res.status(200).json(project);
    } else {
      res.status(500).end();
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteCount = await projectService.deleteProject(req.session.account.name, req.params.id);
    if (deleteCount === 1) {
      res.status(204).end();
    } else {
      res.status(500).end();
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/issues', async (req, res, next) => {
  try {
    const issues = await projectService.getAllIssues(
      req.params.id,
      req.query.tag,
      req.query.status,
      req.query.priority
    );
    res.status(200).json(issues);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/issues', validate(schema.issue), async (req, res, next) => {
  try {
    const newProject = await projectService.addIssueToProject(
      req.body.issue,
      req.session.account.name
    );
    if (newProject !== null) {
      res.status(201).json(newProject);
    } else {
      res.status(400).end();
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/issues/:issueId', async (req, res, next) => {
  try {
    const issue = await projectService.getIssue(req.params.id, req.params.issueId);
    if (issue !== null) {
      res.status(200).json(issue);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/issues/:issueId', validate(schema.issue), async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/issues/:issueId', async (req, res, next) => {
  try {
    const deleteCount = await projectService.deleteIssue(req.params.id, req.params.issueId);
    if (deleteCount === 1) {
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/accounts', async (req, res, next) => {
  try {
    res.status(200).json(await projectService.getAllAccounts(req.params.id));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
