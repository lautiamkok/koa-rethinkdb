'use strict'

import rdb from 'rethinkdb'

export default class Model {
  constructor (connection, table, options) {
    this.table = table
    this.options = options
    this.connection = connection
  }
}
