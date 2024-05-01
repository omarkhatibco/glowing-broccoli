import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'

import { useGoogleMapRootContext } from './GoogleMapRoot.context'
import { useGoogleMapScriptContext } from './GoogleMapScript.context'

export type GoogleMapMarkerProps = PropsWithChildren &
  Pick<
    google.maps.marker.AdvancedMarkerElementOptions,
    'zIndex' | 'position' | 'collisionBehavior' | 'gmpDraggable'
  >

export const GoogleMapMarker: FC<GoogleMapMarkerProps> = ({ children, position, ...rest }) => {
  const { map } = useGoogleMapRootContext()
  const { maps } = useGoogleMapScriptContext()
  const rootRef = useRef<Root>()
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>()

  useEffect(() => {
    if (!maps || !map) {
      return
    }
    if (!rootRef.current) {
      const container = document.createElement('div')
      container.style.pointerEvents = 'all'
      rootRef.current = createRoot(container)

      markerRef.current = new maps.marker.AdvancedMarkerElement({
        content: container,
        position,
        map,
        ...rest,
      })
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null
      }
    }
  }, [maps, map, rootRef])

  useEffect(() => {
    if (!map) {
      return
    }
    rootRef.current?.render(children)
    if (markerRef.current) {
      markerRef.current.position = position
      markerRef.current.map = map
    }
  }, [map, position, children])

  return null
}
