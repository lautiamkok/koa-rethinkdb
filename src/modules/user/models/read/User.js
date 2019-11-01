'use strict'

import rdb from 'rethinkdb'
import Model from '../Model'

export default class User extends Model {
  constructor (...args) {
    super(...args)
  }

  async fetchBySlug (slug) {
    // Prepare query.
    let searchQuery = {
      slug: slug
    }

    // Retrieve documents by filter.
    // https://rethinkdb.com/api/javascript/filter/
    let result = await rdb.table(this.table)
      .filter(searchQuery)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(this.connection)

    return result
  }
}
