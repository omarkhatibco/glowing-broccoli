import { constructionSites as constructionSitesTable, db } from '@repo/db'
import { Elysia } from 'elysia'

export const constructionSitesRouter = new Elysia().group('/constructionSites', app =>
  app.get('/', async () => {
    try {
      const constructionSites = await db.select().from(constructionSitesTable)

      return constructionSites
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch Construction Sites')
    }
  }),
)
