import { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  Container,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import SocialMediaLinks from "../components/SocialMediaLinks";
import ImaikutsuSvg from "../assets/imaikutsu.svg";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 4 }}
        px={{ base: 3 }}
      >
        <Container maxW={"5xl"}>
          <Link href="/" as="/">
            <a>
              <ImaikutsuSvg
                style={{ display: "inline" }}
                height={36}
                width={180}
                viewBox="0 0 911 191"
              />
            </a>
          </Link>
        </Container>
      </Box>
      <Component {...pageProps} />
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6x1"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2021 takumma</Text>
          <SocialMediaLinks />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
