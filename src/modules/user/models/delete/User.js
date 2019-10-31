'use strict'

import rdb from 'rethinkdb'
import Model from '../Model'

export default class User extends Model {
  constructor (options) {
    super(options)
  }

  async delete (objectId) {
    // Delete a single document by id.
    // https://rethinkdb.com/api/javascript/delete/
    let result = await rdb.table('users')
      .get(objectId)
      .delete()
      .run(this.connection)

    return result
  }
}
