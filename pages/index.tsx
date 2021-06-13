import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OAuthButton from '../components/OAuthButton'
import { Box, Button, HStack } from "@chakra-ui/react"
import firebase from '../utils/firebase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [name, setName] = useState("")

  console.log(user)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        await firebase.firestore()
          .collection('users')
          .doc(`${user.uid}`)
          .get()
          .then((doc) => {
            const data = doc.data()
            setName(data.screenName)
          })
      } else {
        setUser(null)
      }
    })
  }, []);

  return (
    <Box bg='#FFDE59' className={styles.container}>
      <Head>
        <title>いまいくつ?</title>
      </Head>
      
      <main className={styles.main}>
        <p className={styles.description}>
          あなたのきもちをすうじでおしえて
        </p>
        <h1 className={styles.title}>
          いまいくつ？
        </h1>
        <Box m={[10, 10]} />
        {user ? (
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
