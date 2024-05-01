import { constructionSites, db, trucks as trucksTable } from '@repo/db'
import dayjs from 'dayjs'
import { asc, eq, sql } from 'drizzle-orm'
import { Elysia, Static, t } from 'elysia'

export const getAvailableTruckSchema = t.Object({
  siteId: t.String(),
  numberOfTrucks: t.String(),
  cadence: t.String(),
  time: t.String(),
})

type GetAvailableTruckSchema = Static<typeof getAvailableTruckSchema>

export const getAvailableTrucks = async ({
  siteId,
  numberOfTrucks,
  time,
  cadence,
}: GetAvailableTruckSchema) => {
  const startTime = dayjs(time)

  const [site] = await db
    .select({
      latitude: constructionSites.latitude,
      longitude: constructionSites.longitude,
    })
    .from(constructionSites)
    .where(eq(constructionSites.id, parseInt(siteId, 10)))
    .limit(1)

  if (!site) {
    throw new Error('Construction Sites not found')
  }

  const trucks = await db
    .select({
      id: trucksTable.id,
      latitude: trucksTable.latitude,
      longitude: trucksTable.longitude,
      model: trucksTable.model,
      make: trucksTable.make,
      year: trucksTable.year,
      capacity: trucksTable.capacity,
      // * This is my first time I calculate distance using SQL query
      // Thanks for https://gist.github.com/statickidz/8a2f0ce3bca9badbf34970b958ef8479
      distance: sql<number>`
                 6371 * acos (
                          cos ( radians(${site.latitude}) )
                          * cos( radians( ${trucksTable.latitude} ) )
                          * cos( radians( ${trucksTable.longitude} ) - radians(${site.longitude}) )
                          + sin ( radians(${site.latitude}) )
                          * sin( radians( ${trucksTable.latitude} ) )
                        )
              `.as('distance'),
    })
    .from(trucksTable)
    .where(eq(trucksTable.status, 'Available'))
    .limit(parseInt(numberOfTrucks, 10))
    .orderBy(asc(sql`distance`))

  // * trucks usually travel at 44 km/h on Average between cities and which equals to 0.733 km per minute
  const trucksWithArrivalTime = trucks.map((truck, index) => {
    const distanceinMinutes = Math.ceil(truck.distance / 0.733) // 1 km per minute)

    return {
      ...truck,
      distanceinMinutes,
      departureTime: startTime
        .add(index * parseInt(cadence, 10) - distanceinMinutes, 'minute')
        .format('YYYY-MM-DDTHH:mm:ss'),
      estimatedArrivalTime: startTime
        .add(index * parseInt(cadence, 10), 'minute')
        .format('YYYY-MM-DDTHH:mm:ss'),
    }
  })

  return trucksWithArrivalTime
}

export const trucksRouter = new Elysia().group('/trucks', app =>
  app
    .get('/', async () => {
      try {
        const trucks = await db.select().from(trucksTable)

        return trucks
      } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch trucks')
      }
    })
    .get(
      '/getAvailable',
      async ({ query }) => {
        const { siteId, numberOfTrucks, time, cadence } = query

        return getAvailableTrucks({ siteId, numberOfTrucks, time, cadence })
      },
      {
        query: getAvailableTruckSchema,
      },
    ),
)
