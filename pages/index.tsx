import Head from 'next/head'
import OAuthButton from '../components/OAuthButton'
import Loading from '../components/Loading'
import { Button, Center, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import firebase from '../utils/firebase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FeaturesBlock from '../components/FeaturesBlock'
import Heroes from '../components/Heroes'

export default function Home() {

  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [name, setName] = useState<string>("")

  const getscreenName = async (user: firebase.User): Promise<string> => {
    return await firebase.firestore()
      .collection('users')
      .doc(`${user.uid}`)
      .get()
      .then((doc) => {
        const data = doc.data()
        return data.screenName
      })
      .catch(() => "");
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const name = await getscreenName(user)
        setName(name);
      }
      setLoading(false)
    })
  }, []);

  return (
    <Container maxW={'5xl'}>
      <Head>
        <title>imaikutsu?</title>
      </Head>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heroes />
        {loading ? (
          <Loading />
        ) : name ? (
          <Stack align={'Center'}>
            <HStack mb={2}>
              <Button
                rounded={'full'}
                bg={'green.400'}
                p={6}
                color={'white'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
                onClick={() => router.push(`/${name}`)}
              >
                グラフをみる
              </Button>
            </HStack>
            {/* <HStack>
              <Button
                variant={'link'}
                colorScheme={'blue'}
                onClick={() => {}}
              >
                Learn more
              </Button>
            </HStack> */}
          </Stack>
        ) : (
          <HStack>
            <OAuthButton />
          </HStack>
        )}
        <FeaturesBlock />
      </Stack>
    </Container>
  )
}
