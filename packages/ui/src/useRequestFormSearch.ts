'use client'

import { parseAsString, useQueryStates } from 'nuqs'

export const useRequestFormSearch = () => {
  const [search, setSearch] = useQueryStates(
    {
      time: parseAsString,
      numberOfTrucks: parseAsString,
      cadence: parseAsString,
    },
    {
      clearOnDefault: true,
      history: 'push',
      shallow: false,
    },
  )

  return { search, setSearch }
}
