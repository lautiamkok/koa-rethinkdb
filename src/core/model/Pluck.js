'use strict'

export default class Pluck {
  constructor (options) {
  }

  pluck (Schema) {
    // Create the object directly.
    var obj = {}
    var keys = Schema._ids._byKey

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
    new Map(keys).forEach(function (value, key, map) {
      obj[key] = null
    })
    // let doc = sanitise(data, obj)

    return obj
  }
}
