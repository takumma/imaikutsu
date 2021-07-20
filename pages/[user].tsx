import { Stack, Container, Text, FormControl, FormLabel, Switch } from "@chakra-ui/react"
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
            <Container>
              <Text
                fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
                fontWeight={600}
                mb={12}
              >
                {user}さんのグラフ
              </Text>
              <Graph data={data}/>
              <Container mb={48}></Container>
              {/* <Text
                fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
                fontWeight={600}
                mt={36}
                mb={12}
              >
                設定
              </Text>
              <FormControl display="flex">
                <FormLabel>
                  記録をする
                </FormLabel>
                <Switch />
              </FormControl> */}
            </Container>
        )}
      </Stack>
    </Container>
  )
}

export default UserPage
