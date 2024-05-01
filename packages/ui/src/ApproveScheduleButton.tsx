'use client'

import { FC, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Flex } from '@chakra-ui/react'
import { client } from '@repo/rpc'

import { useRequestFormSearch } from './useRequestFormSearch'

export const ApproveScheduleButton: FC = () => {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { search } = useRequestFormSearch()

  const handleApproveSchedule = async () => {
    const { time, cadence, numberOfTrucks } = search

    if (!time || !cadence || !numberOfTrucks) {
      console.log('Missing search params:', search)
      return
    }

    setIsLoading(true)
    try {
      await client.scheduling.index.post({
        siteId: id,
        time,
        cadence,
        numberOfTrucks,
      })
    } catch (error) {
      console.log('Error approving schedule:', error)
    } finally {
      setIsLoading(false)
      router.push('/')
    }
  }

  return (
    <Flex justify={'flex-end'}>
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={handleApproveSchedule}
      >
        Approve Schedule
      </Button>
    </Flex>
  )
}
