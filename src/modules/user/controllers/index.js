'use strict'

import Users from '../models/read/Users'

export default async (ctx) => {
  // Create a user instance.
  let users = new Users(ctx._rdbConn, 'user')

  // Throw the error if the table does not exist.
  let tableFound = await users.hasTable()
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  let result = await users.fetch()
  return result
}
