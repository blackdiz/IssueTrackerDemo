'use strict';

const Issue = require('../model/issue');

module.exports = {
  addIssueToProject: (project, issue, tx) => project.$relatedQuery('issues', tx).insert(issue),
  findAllByProject: (project, tx) =>
    project.$loadRelated(
      '[issues(orderById).[priority, tag, status]]',
      {
        orderById: (builder) => {
          builder.orderBy('id');
        }
      },
      tx
    ),
  findByProjectAndId: (project, id, tx) => project.$relatedQuery('issues', tx).findOne({ id }),
  update: (projectId, id, issue, tx) =>
    Issue.query(tx)
      .update(issue)
      .where({ project_id: projectId, id }),
  delete: (projectId, id, tx) =>
    Issue.query(tx)
      .delete()
      .where({ project_id: projectId, id }),
  deleteAllByProject: (projectId, tx) =>
    Issue.query(tx)
      .delete()
      .where({ project_id: projectId })
};
