'use strict'

import Joi from '@hapi/joi'

export default class Schema {
  constructor (options) {
    return Joi.object(options)
  }
}
