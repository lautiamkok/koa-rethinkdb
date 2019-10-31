'use strict'

import rdb from 'rethinkdb'
import { sanitise } from 'model/utils'
import Model from '../Model'
import schema from '../schema'

export default class User extends Model {
  constructor (options) {
    super(options)
    this.data = sanitise(options, schema)
  }

  async insert (options) {
    // Enforce the schema.
    let data = options || this.data
    // let document = sanitise(data, schema)

    // Create array and turn it to object.
    // var arr = []
    // var keys = schema._ids._byKey

    // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
    // new Map(keys).forEach(function (value, key, map) {
    //   arr.push(key)
    // })

    // var obj = {};
    // for (let i=0; i<arr.length; i++) {
    //    obj[arr[i]] = null
    // }

    // Create the object directly.
    // var obj = {}
    // var keys = schema._ids._byKey

    // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
    // new Map(keys).forEach(function (value, key, map) {
    //   obj[key] = null
    // })
    // let doc = sanitise(data, obj)

    let document = await schema.validateAsync(data)

    // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert
    let result = await rdb.table('users')
      .insert(document, {returnChanges: true})
      .run(this.connection)

    return result
  }
}
