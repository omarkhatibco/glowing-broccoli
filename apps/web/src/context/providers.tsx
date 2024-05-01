'use client'

import { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleMapScript } from '@repo/ui'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider>
      <GoogleMapScript apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        {children}
      </GoogleMapScript>
    </ChakraProvider>
  )
}
