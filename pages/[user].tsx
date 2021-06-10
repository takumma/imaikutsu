import { Box, Button } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useRouter } from 'next/router';

import useSWR from "swr";
import getGraph from "../utils/getGraph";


const UserPage = () => {
  const { query, isReady } = useRouter()
  const user = query.user

  const { data, error } = useSWR(`${user}`, getGraph, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })


  return (
    <Box bg='#FFDE59'>
      <div className={styles.container}>
        {error ? (
          <Error msg={`An error has occurred.${error}`}></Error>
        ) : (!data || !isReady) ? (
          <Loading />
        ) : (
          <Graph data={data}/>
        )}
      </div>
    </Box>
  )
}

export default UserPage
