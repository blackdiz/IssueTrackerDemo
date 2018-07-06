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
        logger.error(`No account name:${accountname} exist`);
        const err = {
          name: 'noAccount'
        };
        throw err;
      }
      if (!(await validatePassword(password, account.password))) {
        logger.error(`Account:${accountname} password is invalide`);
        const err = {
          name: 'invalidPassword'
        };
        throw err;
      }
      await accountRepository.updateLoginTime(account.name, tx);
      await tx.commit();

      return account;
    } catch (err) {
      logger.error(err);

      await tx.rollback();

      throw err;
    }
  }
};
