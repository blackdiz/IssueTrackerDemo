'use strict';

const Project = require('../model/project');
const transaction = require('../utils/transaction');
const accountRepository = require('../repositories/account-repository');
const projectRepository = require('../repositories/project-repository');
const logger = require('../config/logger');

module.exports = {
  createProject: async (project, account) => {
    const newProject = Object.assign(new Project(), project);
    newProject.creator = account.name;
    let tx;
    try {
      tx = await transaction();
      const dbAccount = await accountRepository.findByName(account.name, tx);
      if (dbAccount) {
        await dbAccount.$relatedQuery('projects', tx).insert(newProject);
        await tx.commit();

        return newProject;
      }

      logger.error(`Create project for ${account.name} failed. Account not exists.`);
      const err = {
        name: 'noAccount'
      };
      throw err;
    } catch (err) {
      logger.error(err);

      await tx.rollback();

      throw err;
    }
  },
  getProjects: async (accountName) => {
    let tx;
    try {
      tx = await transaction();
      const account = await accountRepository.findByName(accountName, tx);

      if (!account) {
        logger.error(`Get projects of ${accountName} failed. Acount not exists.`);
        const err = {
          name: 'noAccount'
        };
        throw err;
      }

      const projects = await projectRepository.findByAccount(account, tx);

      await tx.commit();

      return projects;
    } catch (err) {
      logger.error(err);

      await tx.rollback();

      throw err;
    }
  }
};
