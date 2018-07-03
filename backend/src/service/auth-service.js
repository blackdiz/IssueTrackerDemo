'use strict';

const bcrypt = require('bcrypt');
const transaction = require('../utils/transaction');
const accountRepository = require('../repositories/account-repository');
const logger = require('../config/logger');

async function validatePassword(rawPassword, hashedPassword) {
  try {
    return bcrypt.compare(rawPassword, hashedPassword);
  } catch (err) {
    logger.error(err);
    return false;
  }
}

module.exports = {
  authenticate: async (accountname, password) => {
    let tx = null;
    let account = null;
    try {
      tx = await transaction();
      account = await accountRepository.findByName(accountname, tx);
      if (!account) {
        logger.info(`No account name: ${accountname} exist`);
        return null;
      }
      if (!(await validatePassword(password, account.password))) {
        logger.info(`Account: ${accountname} password is invalide`);
        return null;
      }
      return account;
    } catch (err) {
      logger.error(err);
      tx.rollback();
      return null;
    }
  }
};
