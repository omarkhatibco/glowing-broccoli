import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { constructionSites, trucks } from './schema'

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL!,
})

export const db = drizzle(pool, { schema: { trucks, constructionSites } })
