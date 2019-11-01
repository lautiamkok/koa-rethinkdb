'use strict'

import rdb from 'rethinkdb'
import schema from '../schema'
import Model from '../Model'

export default class User extends Model {
  constructor (...args) {
    super(...args)
  }

  async updateById (options, objectId) {
    // Enforce the schema.
    let document = await schema.validateAsync(options)

    // Update document by id.
    // https://rethinkdb.com/api/javascript/update/
    let result = await rdb.table(this.table)
      .get(objectId)
      .update(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
