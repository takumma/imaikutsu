import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OAuthButton from '../components/OAuthButton'
import Loading from '../components/Loading'
import { Box, Button, HStack } from "@chakra-ui/react"
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
    <Box className={styles.container}>
      <Head>
        <title>いまいくつ?</title>
      </Head>
      
      <main className={styles.main}>
        <p className={styles.description}>
          
        </p>
        <h1 className={styles.title}>
          あなたの"気持ち"を、<br />
          "数字"でおしえて
        </h1>
        <Box m={[10, 10]} />
        {loading ? (
          <Loading />
        ) : name ? (
          <HStack>
            <Button onClick={() => router.push(`/${name}`)}>
              to user page
            </Button>
          </HStack>
        ) : (
          <HStack>
            <OAuthButton />
          </HStack>
        )}
      </main>
    </Box>
  )
}
