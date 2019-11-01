'use strict'

import Joi from '@hapi/joi'
import Schema from 'model/Schema'

// https://hapi.dev/family/joi/?v=16.1.7
export default new Schema({
  id: Joi.string()
    .guid(),

  slug: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .lowercase()
    .required(),

  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  // email: Joi.string()
  //   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  //   .trim()
  //   .required(),

  // username: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(30)
  //   .trim()
  //   .required(),

  // password: Joi.string()
  //   .pattern(/^[a-zA-Z0-9]{3,30}$/)
  //   .trim()
  //   .required(),

  // repeatPassword: Joi.ref('password'),

  // Number only.
  createdAt: Joi.number()
    .integer()
    .required(),

  // Number or null.
  updatedAt: [
    Joi.number()
      .integer(),
    null
  ]
})
