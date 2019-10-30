'use strict'

import rdb from 'rethinkdb'
import { sanitise } from 'model/utils'
import Model from '../Model'
import schema from '../schemas/user'

export default class User extends Model {
  constructor (options) {
    super(options)
    this.data = sanitise(options, schema)
  }

  async insert (options) {
    // Enforce the schema.
    let data = options || this.data
    let document = sanitise(data, schema)

    // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert
    let result = await rdb.table('users')
      .insert(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
