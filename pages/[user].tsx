import { Box, Stack } from "@chakra-ui/react"
import Graph from '../components/Graph'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useRouter } from 'next/router';

import useSWR from "swr";
import getGraph from "../utils/getGraph";
import { Container } from "next/app";


const UserPage = () => {
  const { query, isReady } = useRouter()
  const user = query.user

  const { data, error } = useSWR(`${user}`, getGraph, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })


  return (
    <Container w={'5x1'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        {error ? (
            <Error msg={`An error has occurred.${error}`}></Error>
          ) : (!data || !isReady) ? (
            <Loading />
          ) : (
            <Graph data={data}/>
        )}
      </Stack>
    </Container>
  )
}

export default UserPage
