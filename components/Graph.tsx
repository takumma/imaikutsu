import { useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firestore = firebase.firestore()

export default function Graph() {
  const [data, setData] = useState([])

  const getGraph = async () => {
    const uid = firebase.auth().currentUser.uid;
    console.log(uid)
    if(!uid) return
    const doc = firestore.collection('graphs').doc(uid)
    doc.get().then((doc) => {
      if(doc.exists) {
        console.log(doc.data())
        setData(doc.data().mentalValues)
      }
    })
  }

  return (
    <Box>
      Graph
      <Button onClick={() => getGraph()}>get</Button>
    </Box>
  )
}
