import { useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Line, LineChart, Tooltip } from "recharts"
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
        const mentalValues = doc.data().mentalValues.map((mentalValue) => {
          return {
            name: mentalValue.time_stamp,
            value: mentalValue.value
          }
        })
        setData(mentalValues)
      } else {
        console.error("Not found")
      }
    })
  }

  return (
    <Box>
      Graph
      <Button onClick={() => getGraph()}>get</Button>
      <LineChart
        width={400}
        height={400}
        data={data}
      >
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#000"/>
      </LineChart>
    </Box>
  )
}
