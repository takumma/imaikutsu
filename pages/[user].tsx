import { Box, Button } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import { useRouter } from 'next/router';

import firebase from '../utils/firebase'
import useSWR from "swr";

const firestore = firebase.firestore()


const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;

  const getGraph = async () => {
    return await firestore.collection('graphs').where("screen_name", "==", user).limit(1).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log('res')
        const mentalValues = doc.data().mentalValues
        if (!mentalValues) return []
        return mentalValues        
      })
    })
    .catch((err) => {
      console.error(err)
      return []
    });
  }

  const { data, error } = useSWR('getgraph', getGraph)

  return (
    <Box bg='#FFDE59'>
      <div className={styles.container}>
        { user }
        <Button onClick={() => getGraph()}>get</Button>
        <Graph data={data}/>
      </div>
    </Box>
  )
}

export default UserPage