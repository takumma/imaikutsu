import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OAuthButton from '../components/OAuthButton'
import { Box, HStack } from "@chakra-ui/react"
import firebase from '../utils/firebase'

export default function Home() {

  const user = firebase.auth().currentUser;
  console.log(user?.displayName)

  return (
    <Box bg='#FFDE59' className={styles.container}>
      <Head>
        <title>いまいくつ?</title>
      </Head>
      
      <main className={styles.main}>
        <p className={styles.description}>
          あなたのきもちをすうじておしえて
        </p>
        <h1 className={styles.title}>
          いまいくつ？
        </h1>
        <Box m={[10, 10]} />
        {user ? (
          <HStack>
            <OAuthButton />
          </HStack>
        ) : (
          <HStack>
            { user }
          </HStack>
        )}
      </main>
    </Box>
  )
}
