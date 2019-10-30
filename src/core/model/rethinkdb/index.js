'use strict'

import rdb from 'rethinkdb'

export default class Model {
  constructor (connection, options) {
    this.data = {}
    this.connection = connection
  }
}
