'use strict'

import rdb from 'rethinkdb'
import CoreModel from 'model/rethinkdb'
import { sanitise } from 'model/utils'
import schema from './schemas/user'

export default class Model extends CoreModel {
  constructor (options) {
    // The rules for ES2015 (ES6) classes basically come down to: // 1. In a child
    // class constructor, this cannot be used until super is called. // 2. ES6 class
    // constructors MUST call super if they are subclasses, or they must explicitly
    // return some object to take the place of the one that was not initialized. //
    // https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes#toc-creating-subclasses-with-extends-calling-with-super //
    // https://stackoverflow.com/questions/31067368/javascript-es6-class-extend-without-super
    super(options)
    this.data = sanitise(options, schema)
  }

  async findTable (tableName) {
    let exists = await rdb.tableList()
      .contains(tableName)
      .run(this.connection)

    return exists
  }

  async findSlug (options) {
    let result = await rdb.table('users')
      .filter(options)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(this.connection)

    return result
  }

  async findSlugNotSelf (slugName, objectId) {
    // Find one doc except itself.
    // https://rethinkdb.com/api/javascript/filter
    // https://rethinkdb.com/api/javascript/ne
    let result = await rdb.table('users')
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
    let result = await rdb.table('users')
      .get(objectId)
      .run(this.connection)

    return result
  }
}
