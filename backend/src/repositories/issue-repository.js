'use strict';

const Issue = require('../model/issue');

module.exports = {
  addIssueToProject: (project, issue, tx) => project.$relatedQuery('issues', tx).insert(issue),
  findAllByProject: (project, tx) => project.$relatedQuery('issues', tx),
  findByProjectAndId: (project, id, tx) => project.$relatedQuery('issues', tx).findOne({ id }),
  updateIssue: (projectId, id, issue, tx) =>
    Issue.query(tx)
      .update(issue)
      .where({ project_id: projectId, id })
      .debug()
};
