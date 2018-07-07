'use strict';

const BaseModel = require('./base-model');

class Issue extends BaseModel {
  constructor(props) {
    super(props);
    this.createTime = this.createTime;
    this.lastUpdateTime = this.lastUpdateTime;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'priority'],

      properties: {
        title: { type: 'string', maxLength: 100 },
        description: { type: 'string' },
        statusId: { type: 'number' },
        priorityId: { type: 'number' },
        tagId: { type: 'number' },
        assignAccount: { type: 'string', maxLength: 20 },
        estimateWorkHoue: { type: 'number' },
        finishPercent: { type: 'number' },
        creator: { type: 'string', maxLength: 20 }
      }
    };
  }
}

module.exports = Issue;
