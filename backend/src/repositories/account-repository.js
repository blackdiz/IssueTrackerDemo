'use strict';

const Account = require('../model/account');

module.exports = {
  save: (account, tx) => Account.query(tx).insert(account),
  findByName: (name, tx) => Account.query(tx).findById(name),
  updateLoginTime: (name, tx) =>
    Account.query(tx)
      .patch({ loginTime: new Date().toISOString() })
      .where('name', name),
  findAllByProject: (project, tx) => project.$relatedQuery('accounts', tx).columns('name')
};
