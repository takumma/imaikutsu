import { Box, Stack, Flex, Text } from '@chakra-ui/react'

interface FeatureProps {
  title: string;
  text: string;
  index: number;
}

const Feature = (props: FeatureProps) => {
  return (
    <Stack
      align={'start'}
      textAlign={'start'}
    >
      <Flex
        w={14}
        h={14}
        align={'center'}
        justify={'center'}
        color={'green.700'}
        bg={'green.100'}
        rounded={'full'}
        mb={1}
        fontSize={[16, 16, 20]}
      >
        {props.index + 1}
      </Flex>
      <Text
        fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
        fontWeight={600}
      >
        {props.title}
      </Text>
      <Text color={'gray.700'}>{props.text}</Text>
    </Stack>
  )
}

export default Feature