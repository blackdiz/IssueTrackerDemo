'use strict';

const accountRepository = require('../repositories/account-repository');
const transaction = require('../utils/transaction');
const bcrypt = require('bcrypt');
const Account = require('../model/account');
const logger = require('../config/logger');

async function existAccount(name, tx) {
  return accountRepository.findByName(name, tx);
}

module.exports = {
  signUp: async (account) => {
    if (!account) {
      const err = {
        name: 'noAccountObject'
      };
      throw err;
    }
    if (!account.name) {
      const err = {
        name: 'noAccountName'
      };
      throw err;
    }
    if (!account.password) {
      const err = {
        name: 'noAccountPassword'
      };
      throw err;
    }

    let tx;
    try {
      tx = await transaction();
      if (await existAccount(account.name, tx)) {
        const err = {
          name: 'duplicateAccount'
        };
        throw err;
      }

      const cloneAccount = new Account();
      Object.assign(cloneAccount, account);
      cloneAccount.password = await bcrypt.hash(account.password, 10);
      await accountRepository.save(cloneAccount, tx);
      await tx.commit();
    } catch (err) {
      logger.error(err);
      await tx.rollback();
      throw err;
    }
  }
};
