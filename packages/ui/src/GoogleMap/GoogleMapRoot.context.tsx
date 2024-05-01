import { createContext, useContext } from 'react'

export type GoogleMapRootBoundType = [number, number, number, number]

export type GoogleMapRootContextValue = {
  map: google.maps.Map | null
  setMap: (map: google.maps.Map | null) => void
  center: google.maps.LatLngLiteral
  bounds: GoogleMapRootBoundType | undefined
}

const googleMapRootContext = createContext<GoogleMapRootContextValue>({
  map: null,
  setMap: () => {},
  center: { lat: 0, lng: 0 },
  bounds: undefined,
})

export const GoogleMapRootProvider = googleMapRootContext.Provider

export function useGoogleMapRootContext() {
  const context = useContext(googleMapRootContext)
  if (context === null) {
    throw new Error('googleMapRootContext is undefined')
  }
  return context
}
