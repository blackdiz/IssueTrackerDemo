'use strict';

const Project = require('../model/project');

module.exports = {
  saveProjectOfAccount: (account, project, tx) =>
    account.$relatedQuery('projects', tx).insert(project),
  findByAccount: (account, tx) =>
    account.$relatedQuery('projects', tx).column('id', 'name', 'description'),
  findByAccountAndId: (account, id, tx) => account.$relatedQuery('projects', tx).findOne({ id }),
  findById: (projectId, tx) => Project.query(tx).findById(projectId),
  updateProject: (project, projectId, tx) =>
    Project.query(tx)
      .update(project)
      .where('id', projectId)
};
