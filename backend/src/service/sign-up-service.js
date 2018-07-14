'use strict';

const accountRepository = require('../repositories/account-repository');
const transaction = require('../utils/transaction');
const bcrypt = require('bcrypt');
const Account = require('../model/account');
const logger = require('../config/logger');

module.exports = {
  signUp: async (account) => {
    let tx;
    try {
      tx = await transaction();

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
