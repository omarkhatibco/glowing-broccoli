CREATE TABLE IF NOT EXISTS "construction_sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduling" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" serial NOT NULL,
	"request_time" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduling_to_truck" (
	"scheduling_id" serial NOT NULL,
	"truck_id" serial NOT NULL,
	"departure_time" varchar(50) NOT NULL,
	"estimated_arrival_time" varchar(50) NOT NULL,
	CONSTRAINT "scheduling_to_truck_scheduling_id_truck_id_pk" PRIMARY KEY("scheduling_id","truck_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trucks" (
	"id" serial PRIMARY KEY NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"model" varchar(100),
	"make" varchar(100),
	"year" integer,
	"capacity" integer,
	"status" varchar(50)
);
