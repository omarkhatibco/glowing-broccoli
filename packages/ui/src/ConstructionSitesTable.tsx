import { FC } from 'react'
import Link from 'next/link'
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { client } from '@repo/rpc'

type ConstructionSites = Awaited<ReturnType<typeof client.constructionSites.index.get>>['data']

export type ConstructionSitesTableProps = {
  data: ConstructionSites
}

export const ConstructionSitesTable: FC<ConstructionSitesTableProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(data) &&
            data.map(site => (
              <Tr key={site.id}>
                <Td>{site.id}</Td>
                <Td>{site.name}</Td>
                <Td>
                  <Button
                    as={Link}
                    href={`/schedule-pickup/${site.id}`}
                  >
                    Schedule Pickup
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
