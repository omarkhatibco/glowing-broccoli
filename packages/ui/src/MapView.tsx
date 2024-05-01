import { FC } from 'react'
import Link from 'next/link'
import { Button, Icon } from '@chakra-ui/react'
import type { client } from '@repo/rpc'
import { FaMapPin, FaTruck } from 'react-icons/fa6'

import { GoogleMap } from './GoogleMap'

type ConstructionSites = Awaited<ReturnType<typeof client.constructionSites.index.get>>['data']
type Trucks = Awaited<ReturnType<typeof client.trucks.index.get>>['data']

export type MapViewProps = {
  trucks: Trucks
  constructionSites: ConstructionSites
}

export const MapView: FC<MapViewProps> = ({ trucks, constructionSites }) => {
  return (
    <>
      <GoogleMap.Root>
        <GoogleMap.FailureStatus>Error Loading google map</GoogleMap.FailureStatus>

        <GoogleMap.LoadingStatus>Loadeing....</GoogleMap.LoadingStatus>

        <GoogleMap.AspectRatio
          ratio={16 / 9}
          w='full'
        >
          <GoogleMap.Viewport
            defaultCenter={{ lat: 53.17944112, lng: 9.9838479 }}
            defaultZoom={10}
          >
            {Array.isArray(constructionSites) &&
              constructionSites?.map(site => (
                <GoogleMap.Marker
                  key={site.id}
                  position={{ lat: Number(site.latitude), lng: Number(site.longitude) }}
                >
                  <Button
                    as={Link}
                    variant={'unstyled'}
                    href={`/schedule-pickup/${site.id}`}
                  >
                    <Icon
                      as={FaMapPin}
                      w='32px'
                      h='32px'
                      color='#319795'
                    />
                  </Button>
                </GoogleMap.Marker>
              ))}
            {Array.isArray(trucks) &&
              trucks?.map(truck => (
                <GoogleMap.Marker
                  key={truck.id}
                  position={{ lat: Number(truck.latitude), lng: Number(truck.longitude) }}
                >
                  <Icon
                    as={FaTruck}
                    w='32px'
                    h='32px'
                    color={truck.status === 'Available' ? '#38A169' : '#E53E3E'}
                  />
                </GoogleMap.Marker>
              ))}
          </GoogleMap.Viewport>
        </GoogleMap.AspectRatio>
      </GoogleMap.Root>
    </>
  )
}
