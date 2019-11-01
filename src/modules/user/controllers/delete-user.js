'use strict'

import User from '../models/delete/User'

export default async (ctx) => {
  // Get the parsed data.
  let body = ctx.request.body || {}

  if (body.id === undefined) {
    ctx.throw(400, 'id is undefined')
  }
  if (body.id === '') {
    ctx.throw(400, 'id is required')
  }

  let objectId = body.id

  // Create a user instance.
  let user = new User(ctx._rdbConn, 'user')

  // Throw the error if the table does not exist.
  let tableFound = await user.hasTable()
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  // Find one doc.
  const found = await user.getDocById(objectId)
  if (!found) {
    ctx.throw(404, 'user does not exist')
  }

  let result = await user.delete(objectId)
  if (result.deleted !== 1) {
    ctx.throw(404, 'delete user failed')
  }

  return result
}
