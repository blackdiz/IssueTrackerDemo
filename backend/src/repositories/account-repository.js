'use strict';

const Account = require('../model/account');

module.exports = {
  save: (account, tx) => Account.query(tx).insert(account),
  findByName: (name, tx) => Account.query(tx).findById(name)
};
