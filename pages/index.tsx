import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OAuthButton from '../components/OAuthButton'
import { Box, HStack,Button } from "@chakra-ui/react"
import { FaTwitter } from 'react-icons/fa';

export default function Home() {
  return (
    <Box bg='#FFDE59'>
    <div className={styles.container}>
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
        <HStack>
          <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
            <OAuthButton></OAuthButton>
          </Button>
        </HStack>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
    </Box>
  )
}
