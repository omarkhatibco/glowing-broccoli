import { client } from '@repo/rpc'
import { ScheduleForm } from '@repo/ui'
import type { useRequestFormSearch } from '@repo/ui'
import { ScheduleAvailableTrucks } from '@repo/ui/server'

type SearchParams = ReturnType<typeof useRequestFormSearch>['search']

const getData = async (siteId: string, data: SearchParams) => {
  const { time, numberOfTrucks, cadence } = data
  if (!siteId || !time || !numberOfTrucks || !cadence) {
    return null
  }
  const res = await client.trucks.getAvailable.get({
    query: {
      siteId,
      time,
      numberOfTrucks,
      cadence,
    },
  })

  return res
}

export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string }
  searchParams: SearchParams
}) {
  const response = await getData(id, searchParams)

  return (
    <>
      <ScheduleForm />
      {response?.data && <ScheduleAvailableTrucks data={response?.data} />}
    </>
  )
}
