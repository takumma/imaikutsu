import { Box, Button } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import { useRouter } from 'next/router';

import firebase from '../utils/firebase'
import useSWR from "swr";


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
        <Button onClick={() => getGraph(`${user}`)}>get</Button>
        <Graph data={data}/>
      </div>
    </Box>
  )
}

export default UserPage

const getGraph = async (user: string) => {
  const collection = firebase.firestore().collection('graphs')

  console.log(collection)
  console.log(user)

  return await collection.where("screen_name", "==", `${user}`).limit(1).get().then((snapshot) => {
    let result = []
    snapshot.forEach((doc) => {
      const mentalValues = doc.data().mentalValues
      if(mentalValues) result = mentalValues
    })
    return result
  })
  .catch((err) => {
    console.error(err)
    return []
  });
}
