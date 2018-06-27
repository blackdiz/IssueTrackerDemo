'use strict';

const Account = require('../model/account');

module.exports = {
  save: (account, tx) => Account.query(tx).insert(account),
  get: (name, tx) =>
    Account.query(tx)
      .where('name', name)
      .debug()
};
