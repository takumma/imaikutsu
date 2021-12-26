import { Box } from "@chakra-ui/react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
  ResponsiveContainer,
} from "recharts";

const Graph = (props: { data: any[] }) => {
  // const mentalValues = props.data.map((v) => v["value"])
  // const timeStamps: string[] = props.data.map((v) => {
  //   const timeStamp = v["time_stamp"].split('-')
  //   return timeStamp[1] + '/' + timeStamp[2]
  // })

  return (
    <Box width="100%">
      <ResponsiveContainer height={400}>
        <LineChart data={props.data}>
          <XAxis dataKey="time_stamp" interval="preserveStartEnd" />
          <YAxis type="number" domain={[0, 10]} />
          <Tooltip itemStyle={{ color: "#000" }} />
          <Line
            type="monotone"
            dataKey="value"
            name="メンタル値"
            stroke="#48BB78"
            fill="#48BB78"
            strokeWidth={5}
            dot={false}
            activeDot={{ fill: "#48BB78", strokeWidth: 2, r: 6 }}
          />
          <Brush
            height={30}
            stroke="#48BB78"
            startIndex={props.data.length - 14}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Graph;
