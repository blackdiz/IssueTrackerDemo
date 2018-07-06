'use strict';

module.exports = {
  findByAccount: (account, tx) =>
    account.$relatedQuery('projects', tx).column('id', 'name', 'description')
};
