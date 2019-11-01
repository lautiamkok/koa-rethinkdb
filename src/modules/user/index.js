'use strict'

import Router from 'koa-router'
import fetchUsers from './routes'
import fetchUser from './routes/fetch-user'
import createUser from './routes/create-user'
import updateUser from './routes/update-user'
import deleteUser from './routes/delete-user'

// Better with prefix
// https://www.npmjs.com/package/koa-router#router-prefixes
const router = new Router({
  prefix: '/users'
})

const routes = [
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser
]
for (var route of routes) {
  router.use(route.routes(), route.allowedMethods())
}

export default router
