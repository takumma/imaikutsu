import { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Stack, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'
import theme  from '../theme'
import { SocialMediaLinks } from '../components/SocialMediaLinks'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container
          as={Stack}
          maxW={'6x1'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2021 takumma</Text>
          <SocialMediaLinks />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
