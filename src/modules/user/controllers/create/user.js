'use strict'

import User from '../../models/create/User'

export default async (ctx) => {
  // Get the parsed data.
  let body = ctx.request.body || {}

  if (body.name === undefined) {
    ctx.throw(400, 'name is undefined')
  }
  if (body.slug === undefined) {
    ctx.throw(400, 'slug is undefined')
  }
  if (body.name === '') {
    ctx.throw(400, 'name is required')
  }
  if (body.slug === '') {
    ctx.throw(400, 'slug is required')
  }

  // Create a user instance.
  let user = new User(ctx._rdbConn, 'user')

  // Throw the error if the table does not exist.
  let tableFound = await user.hasTable()
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  // Check if the provided slug is taken.
  let isSlugUnique = await user.isUnique('slug', body.slug)
  if (isSlugUnique !== true) {
    ctx.throw(404, 'slug has been taken')
  }

  // Insert a doc.
  // Current timestamp.
  let timestamp = Date.now()
  let options = {
    name: body.name,
    slug: body.slug,
    // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'
  }
  let result = await user.insert(options)
  if (result.inserted !== 1) {
    ctx.throw(404, 'insert user failed')
  }

  return result
}
