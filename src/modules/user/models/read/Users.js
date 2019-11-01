'use strict'

import rdb from 'rethinkdb'
import Model from '../Model'

export default class Users extends Model {
  constructor (...args) {
    super(...args)
  }

  async fetch () {
    let cursor = await rdb.table(this.table)
      .orderBy(rdb.desc('createdAt')) // latest first
      .run(this.connection)

    let result = await cursor.toArray()

    return result
  }
}
