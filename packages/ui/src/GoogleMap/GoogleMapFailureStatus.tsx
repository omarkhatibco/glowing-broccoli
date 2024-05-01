import { forwardRef } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { LoaderStatus } from '@googlemaps/js-api-loader'

import { useGoogleMapScriptContext } from './GoogleMapScript.context'

export const GoogleMapFailureStatus = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...rest }, ref) => {
    const { status } = useGoogleMapScriptContext()

    if (status === LoaderStatus.FAILURE)
      return (
        <Box
          bgColor={'red.500'}
          ref={ref}
          {...rest}
        >
          {children}
        </Box>
      )

    return null
  },
)

GoogleMapFailureStatus.displayName = 'GoogleMap.FailureStatus'
