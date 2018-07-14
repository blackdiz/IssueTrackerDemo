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
  authenticate: async (account) => {
    let tx = null;
    let dbAccount = null;
    try {
      tx = await transaction();
      dbAccount = await accountRepository.findByName(account.name, tx);
      if (!account) {
        logger.error(`No account name:${account.name} exist`);
        const err = {
          name: 'noAccount'
        };
        throw err;
      }
      if (!(await validatePassword(account.password, dbAccount.password))) {
        logger.error(`Account:${dbAccount.name} password is invalide`);
        const err = {
          name: 'invalidPassword'
        };
        throw err;
      }
      await accountRepository.updateLoginTime(dbAccount.name, tx);
      await tx.commit();

      return dbAccount;
    } catch (err) {
      logger.error(JSON.stringify(err));

      await tx.rollback();

      throw err;
    }
  }
};
