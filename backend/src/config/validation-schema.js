'use strict';

const Joi = require('joi');

module.exports = {
  project: {
    body: {
      project: Joi.object()
        .required()
        .keys({
          id: Joi.string()
            .max(50)
            .alphanum()
            .required(),
          name: Joi.string()
            .max(50)
            .required(),
          description: Joi.string().required(),
          isPublic: Joi.boolean().required()
        })
    }
  },
  issue: {
    body: {
      issue: Joi.object()
        .required()
        .keys({
          projectId: Joi.string()
            .max(50)
            .alphanum()
            .required(),
          title: Joi.string()
            .max(100)
            .required(),
          description: Joi.string(),
          statusId: Joi.number().required(),
          priorityId: Joi.number(),
          tagId: Joi.number(),
          assignedAccount: Joi.string().max(20),
          estimateWorkHour: Joi.number(),
          startDate: Joi.string(),
          endDate: Joi.string(),
          finishedPercent: Joi.number().max(100)
        })
    }
  }
};
