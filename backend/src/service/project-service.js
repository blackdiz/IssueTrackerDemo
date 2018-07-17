'use strict';

const Project = require('../model/project');
const transaction = require('../utils/transaction');
const accountRepository = require('../repositories/account-repository');
const projectRepository = require('../repositories/project-repository');
const issueRepository = require('../repositories/issue-repository');
const logger = require('../config/logger');

module.exports = {
  createProject: async (project, account) => {
    let tx;
    try {
      tx = await transaction();
      const dbAccount = await accountRepository.findByName(account.name, tx);

      if (!dbAccount) {
        const err = new Error(`Create project for ${account.name} failed. Account not exists.`);
        err.name = 'AccountNotFoundError';
        throw err;
      }

      const newProject = Object.assign(new Project(), project);
      newProject.creator = account.name;

      await projectRepository.addProjectToAccount(dbAccount, newProject, tx);

      await tx.commit();

      return newProject;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  getAllProjects: async (accountName) => {
    let tx;
    try {
      tx = await transaction();
      const account = await accountRepository.findByName(accountName, tx);

      const projects = await projectRepository.findByAccount(account, tx);

      await tx.commit();

      return projects;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  getProject: async (accountName, projectId) => {
    let tx;
    try {
      tx = await transaction();
      const account = await accountRepository.findByName(accountName, tx);

      const project = await projectRepository.findByAccountAndId(account, projectId, tx);

      await tx.commit();

      return project;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  updateProject: async (newProject, projectId) => {
    let tx;
    try {
      tx = await transaction();
      const updateNum = await projectRepository.updateProject(newProject, projectId, tx);

      await tx.commit();

      if (updateNum === 0) {
        return null;
      }

      return newProject;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  deleteProject: async (accountName, projectId) => {
    let tx;
    try {
      tx = await transaction();
      const account = await accountRepository.findByName(accountName, tx);
      await issueRepository.deleteAllByProject(projectId, tx);
      const deleteCount = await projectRepository.delete(account, projectId, tx);

      await tx.commit();

      return deleteCount;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  getAllIssues: async (projectId, tagId, statusId, priorityId) => {
    let tx;
    try {
      tx = await transaction();
      const project = await projectRepository.findById(projectId, tx);
      let issues = [];
      const filter = {};
      if (tagId) {
        filter.tagId = tagId;
      }
      if (statusId) {
        filter.statusId = statusId;
      }
      if (priorityId) {
        filter.priorityId = priorityId;
      }
      issues = await issueRepository.findAllByProject(project, tx, filter);

      await tx.commit();

      return issues;
    } catch (err) {
      logger.info('catch in service');
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  addIssueToProject: async (issue, accoutName) => {
    let tx;
    let savedIssue = null;
    try {
      tx = await transaction();
      const newIssue = Object.assign({}, issue, { creator: `${accoutName}` });
      const project = await projectRepository.findById(newIssue.projectId, tx);

      savedIssue = await issueRepository.addIssueToProject(project, newIssue, tx);

      await tx.commit();

      return savedIssue;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  getIssue: async (projectId, issueId) => {
    let tx;
    try {
      tx = await transaction();
      const project = await projectRepository.findById(projectId, tx);

      const issue = await issueRepository.findByProjectAndId(project, issueId, tx);

      await tx.commit();

      return issue;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  updateIssue: async (projectId, issueId, issue) => {
    let tx;
    try {
      tx = await transaction();

      const updateCount = await issueRepository.update(projectId, issueId, issue, tx);

      await tx.commit();

      if (updateCount === 0) {
        return null;
      }

      return issue;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  getAllAccounts: async (projectId) => {
    let tx;
    let accounts = [];
    try {
      tx = await transaction();

      const project = await projectRepository.findById(projectId, tx);
      accounts = await accountRepository.findAllByProject(project, tx);

      await tx.commit();

      return accounts;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  },
  deleteIssue: async (projectId, issueId) => {
    let tx;
    try {
      tx = await transaction();

      const deleteCount = await issueRepository.delete(projectId, issueId, tx);

      await tx.commit();

      return deleteCount;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  }
};
