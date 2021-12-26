import { Box } from "@chakra-ui/layout";

interface ErrorProps {
  msg: string;
}

const Error = (props: ErrorProps) => {
  return <Box>{props.msg}</Box>;
};

export default Error;
