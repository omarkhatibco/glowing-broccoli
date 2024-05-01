import { forwardRef } from 'react'
import { Skeleton, SkeletonProps } from '@chakra-ui/react'
import { LoaderStatus } from '@googlemaps/js-api-loader'

import { useGoogleMapScriptContext } from './GoogleMapScript.context'

export const GoogleMapLoadingStatus = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ children, ...rest }, ref) => {
    const { status } = useGoogleMapScriptContext()

    if (status === LoaderStatus.LOADING)
      return (
        <Skeleton
          ref={ref}
          {...rest}
        >
          {children}
        </Skeleton>
      )

    return null
  },
)

GoogleMapLoadingStatus.displayName = 'GoogleMap.LoadingStatus'
