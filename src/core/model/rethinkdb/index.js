'use strict'

import rdb from 'rethinkdb'

export default class Model {
  constructor (connection, table) {
    this.table = table
    this.connection = connection
  }
}
