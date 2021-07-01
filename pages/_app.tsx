import { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box bg='#FFDE59'>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
