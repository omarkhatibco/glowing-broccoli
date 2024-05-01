import { createContext, useContext } from 'react'
import { LoaderStatus } from '@googlemaps/js-api-loader'

export type GoogleMapScriptContextValue = {
  status: LoaderStatus
  maps: typeof google.maps | null
}

const googleMapScriptContext = createContext<GoogleMapScriptContextValue>({
  status: LoaderStatus.LOADING,
  maps: null,
})

export const GoogleMapScriptProvider = googleMapScriptContext.Provider

export function useGoogleMapScriptContext() {
  const context = useContext(googleMapScriptContext)
  if (context === null) {
    throw new Error('googleMapScriptContext is undefined')
  }

  return context
}
