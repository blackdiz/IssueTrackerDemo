'use strict';

const Project = require('../model/project');

module.exports = {
  addProjectToAccount: (account, project, tx) =>
    account.$relatedQuery('projects', tx).insert(project),
  findByAccount: (account, tx) =>
    account.$relatedQuery('projects', tx).column('id', 'name', 'description', 'creator'),
  findByAccountAndId: (account, id, tx) => account.$relatedQuery('projects', tx).findOne({ id }),
  findById: (id, tx) => Project.query(tx).findById(id),
  updateProject: (project, id, tx) =>
    Project.query(tx)
      .update(project)
      .where({ id }),
  delete: async (account, id, tx) => {
    await account
      .$relatedQuery('projects', tx)
      .unrelate()
      .where({ id });
    const deleteCount = await Project.query(tx)
      .delete()
      .where({ id });
    return deleteCount;
  }
};
