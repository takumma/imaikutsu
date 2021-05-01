import { Box } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();
  const { user } = router.query;

  return (
    <Box bg='#FFDE59'>
      <div className={styles.container}>
        { user }
        <Graph/>
      </div>
    </Box>
  )
}
