'use strict'

import rdb from 'rethinkdb'
import Model from '../Model'

export default class User extends Model {
  constructor (...args) {
    super(...args)
  }

  async deleteById (objectId) {
    // Delete a single document by id.
    // https://rethinkdb.com/api/javascript/delete/
    let result = await rdb.table(this.table)
      .get(objectId)
      .delete()
      .run(this.connection)

    return result
  }
}
