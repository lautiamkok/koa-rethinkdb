'use strict'

import rdb from 'rethinkdb'
import { sanitise } from 'model/utils'
import Model from '../Model'
import schema from '../schema'

export default class User extends Model {
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
