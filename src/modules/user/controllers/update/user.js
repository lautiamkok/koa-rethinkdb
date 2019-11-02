'use strict'

import User from '../../models/update/User'

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
  if (body.email === undefined) {
    ctx.throw(400, 'email is undefined')
  }
  if (body.username === undefined) {
    ctx.throw(400, 'username is undefined')
  }
  if (body.password === undefined) {
    ctx.throw(400, 'password is undefined')
  }
  if (body.confirmPassword === undefined) {
    ctx.throw(400, 'confirmPassword is undefined')
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
  if (body.email === '') {
    ctx.throw(400, 'email is required')
  }
  if (body.username === '') {
    ctx.throw(400, 'username is required')
  }
  if (body.password === '') {
    ctx.throw(400, 'password is required')
  }

  let objectId = body.id

  // Create a user instance.
  let user = new User(ctx._rdbConn, 'user')

  // Throw the error if the table does not exist.
  let tableFound = await user.hasTable()
  if (tableFound === false) {
    ctx.throw(500, 'users table does not exist')
  }

  // Check if the provided slug is taken.
  // Find one doc except itself.
  let isSlugUnique = await user.isUnique('slug', body.slug, objectId)
  if (isSlugUnique !== true) {
    ctx.throw(404, 'slug has been taken')
  }

  // Check if the provided username is taken.
  // Find one doc except itself.
  let isUsernameUnique = await user.isUnique('username', body.username, objectId)
  if (isUsernameUnique !== true) {
    ctx.throw(404, 'username has been taken')
  }

  // Check if the provided email is taken.
  // Find one doc except itself.
  let isEmailUnique = await user.isUnique('email', body.email, objectId)
  if (isEmailUnique !== true) {
    ctx.throw(404, 'email has been taken')
  }

  // Prepare the update query.
  let timestamp = Date.now()
  let updateQuery = {
    name: body.name,
    slug: body.slug,
    email: body.email,
    username: body.username,
    updatedAt: timestamp,
    // example fields that won't be injected into the document:
    // username: 'marymoe',
    // password: '123123'
  }

  // Update document by id.
  let result = await user.updateById(updateQuery, objectId)
  if (result.replaced !== 1) {
    ctx.throw(404, 'update user failed')
  }

  return result
}
