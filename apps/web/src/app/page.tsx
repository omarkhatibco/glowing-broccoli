import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { client } from '@repo/rpc'
import { MapView } from '@repo/ui'
import { ConstructionSitesTable, TrucksTable } from '@repo/ui/server'

export default async function Page() {
  const [{ data: trucks }, { data: constructionSites }] = await Promise.all([
    client.trucks.index.get(),
    client.constructionSites.index.get(),
  ])

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Construction Sites</Tab>
          <Tab>Trucks</Tab>
          <Tab>Map</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ConstructionSitesTable data={constructionSites} />
          </TabPanel>
          <TabPanel>
            <TrucksTable data={trucks} />
          </TabPanel>
          <TabPanel>
            <MapView
              trucks={trucks}
              constructionSites={constructionSites}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
