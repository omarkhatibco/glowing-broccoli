import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { constructionSitesRouter, schedulingRouter, trucksRouter } from './routes'

const app = new Elysia()
  .use(cors({ origin: '*' }))
  .use(trucksRouter)
  .use(constructionSitesRouter)
  .use(schedulingRouter)
  .get('/', () => 'Hello Elysia')
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
