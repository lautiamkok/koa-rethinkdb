'use strict'

import User from '../models/update/User'

export default async (ctx) => {
  // Get the parsed data.
  let body = ctx.request.body || {}

  if (body.id === undefined) {
    ctx.throw(400, 'id is undefined')
  }
  if (body.name === undefined) {
    ctx.throw(400, 'name is undefined')
  }
  if (body.slug === undefined) {
    ctx.throw(400, 'slug is undefined')
  }
  if (body.id === '') {
    ctx.throw(400, 'id is required')
  }
  if (body.name === '') {
    ctx.throw(400, 'name is required')
  }
  if (body.slug === '') {
    ctx.throw(400, 'slug is required')
  }

  let objectId = body.id

  // Create a user instance.
  let user = new User(ctx._rdbConn)

  // Throw the error if the table does not exist.
  let tableFound = await user.findTable('users')
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  // Check if the provided slug is taken.
  // Find one doc except itself.
  let slugFound = await user.getDocBySlugExcludeId(body.slug, objectId)
  if (slugFound) {
    ctx.throw(404, 'slug has been taken')
  }

  // Get the current doc.
  let currentDocument = await user.getDocById(objectId)

  // Prepare the update query.
  let timestamp = Date.now()
  let updateQuery = {
    name: body.name,
    slug: body.slug,
    updatedAt: timestamp,
    // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'
  }

  // Merge two objects.
  let options = {...currentDocument, ...updateQuery}

  // Update document by id.
  let result = await user.updateById(options, objectId)
  if (result.replaced !== 1) {
    ctx.throw(404, 'update user failed')
  }

  return result
}
