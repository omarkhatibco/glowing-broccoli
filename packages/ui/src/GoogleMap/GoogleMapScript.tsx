import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Loader, LoaderOptions, LoaderStatus } from '@googlemaps/js-api-loader'

import { GoogleMapScriptProvider } from './GoogleMapScript.context'

const defaultOptions: Partial<LoaderOptions> = {
  id: 'shuttflix-google-map-script',
  libraries: ['places', 'geometry', 'marker'],
}

export type GoogleMapScriptProps = PropsWithChildren &
  LoaderOptions & {
    callback?: (state: LoaderStatus, loader: Loader) => void
  }

export const GoogleMapScript: React.FC<GoogleMapScriptProps> = ({
  children,
  callback,
  ...options
}) => {
  const [status, setStatus] = useState<LoaderStatus>(LoaderStatus.LOADING)
  const [maps, setMaps] = useState<typeof google.maps | null>(null)

  useEffect(() => {
    const loader = new Loader({
      ...defaultOptions,
      ...options,
    })

    const setStatusAndExecuteCallback = (status: LoaderStatus) => {
      if (callback) callback(status, loader)
      setStatus(status)
    }

    setStatusAndExecuteCallback(LoaderStatus.LOADING)

    loader.load().then(
      () => {
        setStatusAndExecuteCallback(LoaderStatus.SUCCESS)
        setMaps(google.maps)
      },
      () => setStatusAndExecuteCallback(LoaderStatus.FAILURE),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <GoogleMapScriptProvider value={{ status, maps }}>{children}</GoogleMapScriptProvider>
}
