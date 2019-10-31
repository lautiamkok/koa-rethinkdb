'use strict'

import rdb from 'rethinkdb'
import Model from '../Model'

export default class User extends Model {
  constructor (options) {
    super(options)
  }

  async fetch (searchQuery) {
    // Retrieve documents by filter.
    // https://rethinkdb.com/api/javascript/filter/
    let result = await rdb.table('users')
      .filter(searchQuery)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(this.connection)

    return result
  }
}
