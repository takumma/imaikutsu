import { Box, Button } from "@chakra-ui/react"
import styles from '../styles/Home.module.css'
import Graph from '../components/Graph'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import firebase from '../utils/firebase'

const firestore = firebase.firestore()


const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const [data, setData] = useState([])

  // useEffect(() => {
  //   const getGraphData = async () => {
  //     await firestore.collection('graphs').where("screen_name", "==", user).limit(1).get().then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         const mentalValues = doc.data().mentalValues
  //         if (mentalValues) setData(mentalValues)
  //       })
  //     })
  //     .catch((err) => console.error(err));
  //   }

  //   getGraphData()
  
  // }, [])

  const getGraph = async () => {
    await firestore.collection('graphs').where("screen_name", "==", user).limit(1).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const mentalValues = doc.data().mentalValues
        if (mentalValues) setData(mentalValues)
      })
    })
    .catch((err) => console.error(err));
  }

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