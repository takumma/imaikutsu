import { Box } from "@chakra-ui/react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  Brush,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { MentalValue } from "../types";

const Graph = (props: { data: MentalValue[] }) => (
  <Box width="100%">
    <ResponsiveContainer height={400}>
      <LineChart data={props.data}>
        <YAxis hide domain={[0, 10]} />
        <XAxis dataKey="time_stamp" interval="preserveStartEnd" />
        <Tooltip itemStyle={{ color: "#000" }} />
        <Line
          type="monotone"
          dataKey="value"
          name="記録された数字"
          stroke="#68D391"
          fill="#68D391"
          strokeWidth={5}
          r={2.5}
          dot={true}
          activeDot={{ fill: "#68D391", strokeWidth: 2, r: 6 }}
        />
        <Brush
          height={30}
          stroke="#68D391"
          startIndex={props.data.length - 14}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

export default Graph;
