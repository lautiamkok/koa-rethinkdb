'use strict'

import rdb from 'rethinkdb'

export default class Model {
  constructor (connection, table) {
    this.table = table
    this.connection = connection
  }

  async hasTable () {
    let exists = await rdb.tableList()
      .contains(this.table)
      .run(this.connection)

    return exists
  }
}
