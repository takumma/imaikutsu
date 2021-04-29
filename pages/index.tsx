import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OAuthButton from '../components/OAuthButton'
import { Box, HStack,Button, ButtonGroup } from "@chakra-ui/react"
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
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
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
