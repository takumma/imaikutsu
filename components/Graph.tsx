import { useState } from "react"
import { Box, Button, Flex } from "@chakra-ui/react"
import { Line, LineChart, Tooltip, XAxis, YAxis, Brush, ResponsiveContainer } from "recharts"

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firestore = firebase.firestore()


export default function Graph(props) {
  
  const [data, setData] = useState([])

  const getGraph = async () => {
    firestore.collection('graphs').where("screen_name", "==", props.user).limit(1).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const mentalValues = doc.data().mentalValues
        if (mentalValues) setData(mentalValues)
        console.log('ok')
      })
    })
    .catch((err) => console.error(err));
  }

  return (
    <Box width="100%">
      Graph
      <Button onClick={() => getGraph()}>get</Button>
      <ResponsiveContainer width="95%" height={400} >
      <LineChart
        margin={{
          top: 10,
          right: 5,
          left: 5,
          bottom: 20,
        }}
        data={data}
      >
        <XAxis dataKey="time_stamp" />
        <YAxis type="number" domain={[0, 10]} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#000" fill="#000" />
        <Brush />
      </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
