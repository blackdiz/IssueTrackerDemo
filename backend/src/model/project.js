'use strict';

const BaseModel = require('./base-model');
const { Model } = require('objection');

class Project extends BaseModel {
  static get tableName() {
    return 'project';
  }

  static get idColumn() {
    return 'name';
  }

  constructor() {
    super();
    this.createTime = this.createTime;
    this.lastUpdateTime = this.lastUpdateTime;
  }

  static get relationMappings() {
    return {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/account`,
      join: {
        from: 'project.id',
        through: {
          from: 'account_project.project_name',
          to: 'account_project.account_name'
        },
        to: 'account.id'
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'creator'],

      properties: {
        name: { type: 'string', maxLength: 50 },
        creator: { type: 'creator', maxLength: 20 },
        isPublic: { type: 'boolean' }
      }
    };
  }
}

module.exports = Project;
