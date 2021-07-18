import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import theme  from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
