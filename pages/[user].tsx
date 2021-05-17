import { Box, Button } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import { useRouter } from 'next/router';

import useSWR from "swr";
import getGraph from "../utils/getGraph";


const UserPage = () => {
  const { query, isReady } = useRouter()

  if (!isReady) return 'loading'
  const user = query.user

  const { data, error } = useSWR(`${user}`, getGraph, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
})

  if (error) return `"An error has occurred."${error}`;
  if (!data) return "Loading...";

  return (
    <Box bg='#FFDE59'>
      <div className={styles.container}>
        { user }
        <Graph data={data}/>
      </div>
    </Box>
  )
}

export default UserPage
