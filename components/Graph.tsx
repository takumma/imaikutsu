import { Box } from "@chakra-ui/react"
import { Line, LineChart, Tooltip, XAxis, YAxis, Brush, ResponsiveContainer } from "recharts"

const Graph = (props) => {

  return (
    <Box width="100%">
      <ResponsiveContainer width="95%" height={400} >
      <LineChart
        margin={{
          top: 10,
          right: 5,
          left: 5,
          bottom: 20,
        }}
        data={props.data}
      >
        <XAxis dataKey="time_stamp" />
        <YAxis type="number" domain={[0, 10]} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#000" fill="#000" />
        <Brush 
          stroke="#000"
        />
      </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Graph