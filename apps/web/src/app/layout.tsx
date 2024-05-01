import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Heading } from '@chakra-ui/react'

import { Providers } from '../context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schüttflix Finder',
  description: 'Schüttflix',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Container
            as='main'
            py={8}
            maxWidth={'container.xl'}
          >
            <Heading
              as='h1'
              textAlign={'center'}
            >
              Schüttflix Finder
            </Heading>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
