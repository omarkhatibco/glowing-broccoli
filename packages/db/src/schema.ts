import { relations } from 'drizzle-orm'
import { integer, numeric, pgTable, primaryKey, serial, varchar } from 'drizzle-orm/pg-core'

export const trucks = pgTable('trucks', {
  id: serial('id').primaryKey().notNull(),
  latitude: numeric('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: numeric('longitude', { precision: 11, scale: 8 }).notNull(),
  model: varchar('model', { length: 100 }),
  make: varchar('make', { length: 100 }),
  year: integer('year'),
  capacity: integer('capacity'),
  status: varchar('status', { length: 50 }),
})

export const trucksRelation = relations(trucks, ({ many }) => ({
  schedulingToTruck: many(schedulingToTruck),
}))

export const constructionSites = pgTable('construction_sites', {
  id: serial('id').primaryKey().notNull(),
  latitude: numeric('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: numeric('longitude', { precision: 11, scale: 8 }).notNull(),
  name: varchar('name', { length: 100 }),
})

export const scheduling = pgTable('scheduling', {
  id: serial('id').primaryKey().notNull(),
  siteId: serial('site_id').notNull(),
  reqeustTime: varchar('request_time', { length: 50 }).notNull(),
})

export const schedulingRelation = relations(scheduling, ({ one, many }) => ({
  site: one(constructionSites, {
    fields: [scheduling.siteId],
    references: [constructionSites.id],
  }),
  schedulingToTruck: many(schedulingToTruck),
}))

export const schedulingToTruck = pgTable(
  'scheduling_to_truck',
  {
    schedulingId: serial('scheduling_id').notNull(),
    truckId: serial('truck_id').notNull(),
    departureTime: varchar('departure_time', { length: 50 }).notNull(),
    estimatedArrivalTime: varchar('estimated_arrival_time', { length: 50 }).notNull(),
  },
  t => ({
    pk: primaryKey({
      columns: [t.schedulingId, t.truckId],
    }),
  }),
)

export const schedulingTruckRelation = relations(schedulingToTruck, ({ one }) => ({
  scheduling: one(scheduling, {
    fields: [schedulingToTruck.schedulingId],
    references: [scheduling.id],
  }),
  truck: one(trucks, {
    fields: [schedulingToTruck.truckId],
    references: [trucks.id],
  }),
}))
