# Schüttflix finder

## Get started

This application uses Turbo repo so in order to start using this app you should follow these steps

- in `apps/api` rename `.env.example` to `.env.local` and add your postgres database url in `DATABASE_URL`
- in `apps/web` rename `.env.example` to `.env.local` and add your google map key url in `NEXT_PUBLIC_GOOGLE_MAP_API_KEY`
- if you Database is new run `pnpm run --filter=@repo/db push` to push the schema
- run `pnpm dev` it should run both Backend and frontend server.

## other useful commands

```bash
pnpm run --filter=@repo/db studio // to open drizzle studio and see the data but you need connectionString in `drizzle.config.ts`
pnpm run --filter=@repo/db pull // to generate the schema from remote db
pnpm run --filter=@repo/db push // to push new changes in schema to db
```
