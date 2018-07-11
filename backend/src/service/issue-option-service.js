'use strict';

const transaction = require('../utils/transaction');
const tagRepository = require('../repositories/tag-repository');
const statusRepository = require('../repositories/status-repository');
const priorityRepository = require('../repositories/priority-repository');
const logger = require('../config/logger');

module.exports = {
  findAllTags: async () => {
    let tx;
    try {
      tx = await transaction();

      const tags = await tagRepository.findAllTags(tx);

      await tx.commit();

      return tags;
    } catch (err) {
      logger.error(JSON.stringify(err));

      await tx.rollback();

      return [];
    }
  },
  findAllStatus: async () => {
    let tx;
    try {
      tx = await transaction();

      const status = await statusRepository.findAllStatus(tx);

      await tx.commit();

      return status;
    } catch (err) {
      logger.error(JSON.stringify(err));

      await tx.rollback();

      return [];
    }
  },
  findAllPriorities: async () => {
    let tx;
    try {
      tx = await transaction();

      const status = await priorityRepository.findAllPriorities(tx);

      await tx.commit();

      return status;
    } catch (err) {
      logger.error(JSON.stringify(err));

      await tx.rollback();

      return [];
    }
  }
};
