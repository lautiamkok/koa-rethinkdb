'use strict'

import Router from 'koa-router'
import controller from '../../controllers/read/user'

const router = new Router()

// Get the user by slug.
router.get('/:slug', async (ctx, next) => {
  try {
    const result = await controller(ctx, next)

    ctx.type = 'json'
    ctx.body = result

    await next()

  } catch (err) {
    // Get the error message and do something.
    // console.log(err.message)

    // Throw the error.
    ctx.throw(500, err)
  }
})

export default router
