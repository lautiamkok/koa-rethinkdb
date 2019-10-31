'use strict'

import rdb from 'rethinkdb'
import { sanitise } from 'model/utils'
import Model from '../Model'
import schema from '../schema'

export default class Users extends Model {
  constructor (options) {
    super(options)
    this.data = sanitise(options, schema)
  }

  async fetch (searchQuery) {
    let cursor = await rdb.table('users')
      .orderBy(rdb.desc('createdAt')) // latest first
      .run(this.connection)

    let result = await cursor.toArray()

    return result
  }
}
