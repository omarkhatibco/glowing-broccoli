import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { GoogleMapRootBoundType, GoogleMapRootProvider } from './GoogleMapRoot.context'
import { useGoogleMapScriptContext } from './GoogleMapScript.context'

export type GoogleMapRootProps = PropsWithChildren

export const GoogleMapRoot: FC<GoogleMapRootProps> = ({ children }) => {
  const { maps } = useGoogleMapScriptContext()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [internalCenter, setInternalCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })
  const [internalBounds, setInternalBounds] = useState<GoogleMapRootBoundType | undefined>(
    undefined,
  )

  const onIdle = useCallback(() => {
    if (map) {
      try {
        const bounds = map.getBounds()
        const centerLatLng = map.getCenter() as google.maps.LatLng

        const center = {
          lat: centerLatLng.lat(),
          lng: centerLatLng.lng(),
        }

        const ne = bounds?.getNorthEast() as google.maps.LatLng
        const sw = bounds?.getSouthWest() as google.maps.LatLng
        const boundsArray = [sw.lng(), sw.lat(), ne.lng(), ne.lat()] as GoogleMapRootBoundType

        setInternalCenter(center)
        setInternalBounds(boundsArray)
      } catch (e) {
        console.error(e)
      }
    }
  }, [, map])

  useEffect(() => {
    if (map && maps) {
      maps.event.clearListeners(map, 'idle')
      // Idle event is fired when the map becomes idle after panning or zooming.
      maps.event.addListener(map, 'idle', onIdle)
    }
  }, [map, maps, onIdle])

  useEffect(() => {
    // clear listeners on unmount
    return () => {
      if (map && maps) {
        maps.event.clearListeners(map, 'idle')
      }
    }
  }, [map, maps])

  return (
    <GoogleMapRootProvider
      value={{
        map,
        setMap,
        center: internalCenter,
        bounds: internalBounds,
      }}
    >
      {children}
    </GoogleMapRootProvider>
  )
}
