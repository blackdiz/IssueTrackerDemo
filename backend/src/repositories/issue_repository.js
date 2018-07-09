'use strict';

module.exports = {
  saveIssueOfProject: (project, issue, tx) => project.$relatedQuery('issues', tx).insert(issue),
  findAllByProject: (project, tx) => project.$relatedQuery('issues', tx)
};
