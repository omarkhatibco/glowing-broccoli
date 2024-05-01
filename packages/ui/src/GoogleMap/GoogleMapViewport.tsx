import { FC, PropsWithChildren, useEffect, useId, useRef } from 'react'

import { useGoogleMapRootContext } from './GoogleMapRoot.context'
import { useGoogleMapScriptContext } from './GoogleMapScript.context'

export const defaultMapOptions: Partial<google.maps.MapOptions> = {
  streetViewControl: false,
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'greedy',
  center: { lat: 0, lng: 0 },
  zoom: 8,
}

export type GoogleMapViewportProps = PropsWithChildren &
  Omit<google.maps.MapOptions, 'zoom' | 'center'> & {
    defaultCenter?: google.maps.MapOptions['center']
    defaultZoom?: number
  }

export const GoogleMapViewport: FC<GoogleMapViewportProps> = ({
  children,
  defaultCenter,
  defaultZoom,
  ...options
}) => {
  const divId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const { maps } = useGoogleMapScriptContext()
  const { setMap, map } = useGoogleMapRootContext()
  useEffect(() => {
    if (ref.current && maps && !map) {
      const map = new maps.Map(ref.current, {
        ...defaultMapOptions,
        ...(defaultCenter && { center: defaultCenter }),
        ...(defaultZoom && { zoom: defaultZoom }),
        mapId: divId,
        ...options,
      })

      setMap(map)
    }
  }, [options, defaultCenter, defaultZoom, ref, map, maps, setMap, divId])

  if (!maps) {
    return null
  }

  return (
    <>
      <div
        ref={ref}
        id={divId}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
      />
      {children}
    </>
  )
}
