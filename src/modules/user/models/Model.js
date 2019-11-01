'use strict'

import rdb from 'rethinkdb'
import CoreModel from 'model/rethinkdb'
import schema from './schema'

export default class Model extends CoreModel {
  constructor (...args) {
    super(...args)
  }

  async hasTable () {
    let exists = await rdb.tableList()
      .contains(this.table)
      .run(this.connection)

    return exists
  }

  async getDocBySlug (slug) {
    let searchQuery = {
      slug: slug
    }
    let result = await rdb.table(this.table)
      .filter(searchQuery)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(this.connection)

    return result
  }

  async getDocBySlugExcludeId (slugName, objectId) {
    // Find one doc except itself.
    // https://rethinkdb.com/api/javascript/filter
    // https://rethinkdb.com/api/javascript/ne
    let result = await rdb.table(this.table)
      .filter(
        rdb.row('slug').eq(slugName) // equal
      )
      .filter(
        rdb.row('id').ne(objectId) // but not equal itself
      )
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(this.connection)

    return result
  }

  async getDocById (objectId) {
    let result = await rdb.table(this.table)
      .get(objectId)
      .run(this.connection)

    return result
  }
}
