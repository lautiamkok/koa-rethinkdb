'use strict'

import rdb from 'rethinkdb'
import schema from '../schema'
import Model from '../Model'

export default class User extends Model {
  constructor (options) {
    super(options)
    this.data = schema.validate(options)
  }

  async insert (options) {
    // Enforce the schema.
    let data = options || this.data
    let document = await schema.validateAsync(data)

    // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert
    let result = await rdb.table('users')
      .insert(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
