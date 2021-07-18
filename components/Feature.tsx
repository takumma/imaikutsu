import { Box, Stack, Flex, Text } from '@chakra-ui/react'

interface FeatureProps {
  title: string;
  text: string;
  number: number;
}

const Feature = (props: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {props.number}
      </Flex>
      <Text fontSize={4} fontWeight={600}>{props.title}</Text>
      <Text color={'gray.800'}>{props.text}</Text>
    </Stack>
  )
}

export default Feature