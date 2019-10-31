'use strict'

import Joi from '@hapi/joi'

export default Joi.object({
  // id: null, <-- cannot use id reserved by rdb.
  slug: Joi.string()
    .trim()
    // .lowercase()
    .required()
    .error(() => {
      return {
        message: '"slug" is required'
      };
    }),

  name: Joi.string()
    .trim()
    .required(),

  // username: Joi.string()
  //   .alphanum()
  //   .min(3)
  //   .max(30)
  //   .required(),

  // password: Joi.string()
  //   .pattern(/^[a-zA-Z0-9]{3,30}$/)
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
