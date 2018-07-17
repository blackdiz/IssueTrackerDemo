'use strict';

const Issue = require('../model/issue');

module.exports = {
  addIssueToProject: (project, issue, tx) => project.$relatedQuery('issues', tx).insert(issue),
  findAllByProject: (project, tx, filter) => {
    const builder = Issue.query(tx).where('project_id', project.id);

    if (filter) {
      Object.keys(filter).forEach((key) => {
        builder.andWhere(`issue.${key.replace('Id', '_id')}`, filter[key]);
      });
    }

    builder
      .eagerAlgorithm(Issue.JoinEagerAlgorithm)
      .eager('[priority, tag, status]')
      .orderBy('id');

    return builder;
  },
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
