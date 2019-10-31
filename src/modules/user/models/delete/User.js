'use strict'

import rdb from 'rethinkdb'
import { sanitise } from 'model/utils'
import Model from '../Model'
import schema from '../schema'

export default class User extends Model {
  constructor (options) {
    super(options)
    this.data = sanitise(options, schema)
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
