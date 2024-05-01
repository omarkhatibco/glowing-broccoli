import { FC } from 'react'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import type { client } from '@repo/rpc'
import dayjs from 'dayjs'

import { ApproveScheduleButton } from './ApproveScheduleButton'

type Trucks = Awaited<ReturnType<typeof client.trucks.getAvailable.get>>['data']

export type ScheduleAvailableTrucksProps = {
  data: NonNullable<Trucks>
}

export const ScheduleAvailableTrucks: FC<ScheduleAvailableTrucksProps> = ({ data }) => {
  return (
    <VStack
      align={'stretch'}
      gap={8}
    >
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Model</Th>
              <Th>Marke</Th>
              <Th isNumeric>Year</Th>
              <Th isNumeric>capacity</Th>
              <Th isNumeric>Estimated Arrival Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data) &&
              data.map(truck => (
                <Tr key={truck.id}>
                  <Td>{truck.id}</Td>
                  <Td>{truck.model}</Td>
                  <Td>{truck.make}</Td>
                  <Td isNumeric>{truck.year}</Td>
                  <Td isNumeric>{truck.capacity}</Td>
                  <Td isNumeric>{dayjs(truck.estimatedArrivalTime).format('HH:mm')}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ApproveScheduleButton />
    </VStack>
  )
}
