'use strict';

const accountRepository = require('../repositories/account-repository');
const transaction = require('../utils/transaction');
const bcrypt = require('bcrypt');
const Account = require('../model/account');
const logger = require('../config/logger');

module.exports = {
  signUp: async (account) => {
    if (!account) {
      throw new Error('No account');
    }
    if (!account.name) {
      throw new Error('No account name');
    }
    if (!account.password) {
      throw new Error('No account passowrd');
    }

    const cloneAccount = new Account();
    Object.assign(cloneAccount, account);
    cloneAccount.password = await bcrypt.hash(account.password, 10);
    let tx;
    try {
      tx = await transaction();
      await accountRepository.save(cloneAccount, tx);
      logger.info('service save');
      tx.commit();
    } catch (err) {
      logger.error('service err');
      tx.rollback();
      throw err;
    }
  }
};
