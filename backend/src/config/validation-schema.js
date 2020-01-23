'use strict';

const Joi = require('@hapi/joi');
const {Segments} = require('celebrate');

module.exports = {
  account: {
    [Segments.BODY]: {
      account: Joi.object()
        .required()
        .keys({
          name: Joi.string()
            .max(20)
            .alphanum()
            .required()
            .error(() => ( '請輸入使用者名稱')),
          password: Joi.string()
            .alphanum()
            .required()
            .error(() => ('請輸入密碼'))
        })
    }
  },
  project: {
    [Segments.BODY]: {
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
          description: Joi.string().allow(''),
          isPublic: Joi.boolean().required()
        })
    }
  },
  issue: {
    [Segments.BODY]: {
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
          description: Joi.string().allow(''),
          statusId: Joi.number().required(),
          priorityId: Joi.number().required(),
          tagId: Joi.number().required(),
          assignedAccount: Joi.string()
            .allow(null)
            .max(20),
          estimateWorkHour: Joi.number().min(0),
          startDate: Joi.string().allow(null),
          endDate: Joi.string().allow(null),
          finishedPercent: Joi.number().max(100)
        })
    }
  }
};
