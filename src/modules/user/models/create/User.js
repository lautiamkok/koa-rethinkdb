'use strict'

import rdb from 'rethinkdb'
import schema from '../schema'
import Model from '../Model'

export default class User extends Model {
  constructor (...args) {
    super(...args)
  }

  async insert (options) {
    // Enforce the schema.
    let document = await schema.validateAsync(options,  { convert: false })

    // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert
    let result = await rdb.table(this.table)
      .insert(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
