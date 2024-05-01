import { db, scheduling, schedulingToTruck } from '@repo/db'
import { Elysia } from 'elysia'

import { getAvailableTrucks, getAvailableTruckSchema } from './turcks'

export const schedulingRouter = new Elysia().group('/scheduling', app =>
  app.post(
    '/',
    async ({ body }) => {
      const { siteId, time } = body
      const trucks = await getAvailableTrucks(body)
      try {
        const result = await db
          .insert(scheduling)
          .values({
            siteId: parseInt(siteId, 10),
            reqeustTime: time,
          })
          .returning()

        const id = result?.[0]?.id
        if (!id) {
          throw new Error('Failed to create Scheduling')
        }
        // * in theory these trucks should be not available anymore
        await db.insert(schedulingToTruck).values(
          trucks.map(truck => ({
            schedulingId: id,
            truckId: truck.id,
            departureTime: truck.departureTime,
            estimatedArrivalTime: truck.estimatedArrivalTime,
          })),
        )
      } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch Construction Sites')
      }
    },
    {
      body: getAvailableTruckSchema,
    },
  ),
)
