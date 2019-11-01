'use strict'

import User from '../models/read/User'

export default async (ctx) => {
  const slug = ctx.params.slug
  let searchQuery = {
    slug: slug
  }

  // Create a user instance.
  let user = new User(ctx._rdbConn, 'user')

  // Throw the error if the table does not exist.
  let tableFound = await user.hasTable()
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  let result = await user.fetch(searchQuery)
  if (!result) {
    ctx.throw(404, 'user not found')
  }
  return result
}

