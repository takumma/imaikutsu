import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
// import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
