import { FC } from 'react'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { client } from '@repo/rpc'

type Trucks = Awaited<ReturnType<typeof client.trucks.index.get>>['data']

export type TruckTableProps = {
  data: Trucks
}

export const TrucksTable: FC<TruckTableProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Model</Th>
            <Th>Marke</Th>
            <Th isNumeric>Year</Th>
            <Th isNumeric>capacity</Th>
            <Th>status</Th>
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
                <Td>{truck.status}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
