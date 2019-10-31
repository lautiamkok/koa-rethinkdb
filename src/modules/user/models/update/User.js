'use strict'

import rdb from 'rethinkdb'
import schema from '../schema'
import Model from '../Model'

export default class User extends Model {
  constructor (options) {
    super(options)
    this.data = schema.validate(options)
  }

  async updateById (options, objectId) {
    // Enforce the schema.
    let data = options || this.data
    let document = await schema.validateAsync(data)

    // Update document by id.
    // https://rethinkdb.com/api/javascript/update/
    let result = await rdb.table('users')
      .get(objectId)
      .update(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
