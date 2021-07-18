import Head from 'next/head'
import OAuthButton from '../components/OAuthButton'
import Loading from '../components/Loading'
import { Button, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import firebase from '../utils/firebase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
      } else {
        setName("");
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
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          あなたの"気持ち"を、<br />
          "数字"でおしえて
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          毎日使ってるTwitterで、自分のメンタルを記録しましょう。Twitter認証をして、あとはTwitterのユーザー名にメンタル値を付けるだけです。
          ふとした時に名前を変えれば、それだけであなたのメンタルが記録されていきます。
        </Text>
        {loading ? (
          <Loading />
        ) : name ? (
          <HStack>
            <Button
              rounded={'full'}
              colorScheme={'yellow'}
              onClick={() => router.push(`/${name}`)}
            >
              あなたのグラフをみる
            </Button>
          </HStack>
        ) : (
          <HStack>
            <OAuthButton />
          </HStack>
        )}
      </Stack>
    </Container>
  )
}
