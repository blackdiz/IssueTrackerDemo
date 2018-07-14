'use strict';

const bcrypt = require('bcrypt');
const transaction = require('../utils/transaction');
const accountRepository = require('../repositories/account-repository');
const AuthenticationError = require('../error/AuthenticationError');
const logger = require('../config/logger');

async function validatePassword(rawPassword, hashedPassword) {
  try {
    return bcrypt.compare(rawPassword, hashedPassword);
  } catch (err) {
    logger.error(err.stack);
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

      if (dbAccount) {
        if (!(await validatePassword(account.password, dbAccount.password))) {
          throw new AuthenticationError(account.name);
        }

        await accountRepository.updateLoginTime(dbAccount.name, tx);
      }

      await tx.commit();

      return dbAccount;
    } catch (err) {
      logger.error(err.stack);

      await tx.rollback();

      throw err;
    }
  }
};
