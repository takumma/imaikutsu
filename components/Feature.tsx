import { Box, Stack, Flex, Text } from '@chakra-ui/react'

interface FeatureProps {
  title: string;
  text: string;
  index: number;
}

const Feature = (props: FeatureProps) => {
  return (
    <Stack
      align={'center'}
      textAlign={'center'}
    >
      <Flex
        w={12}
        h={12}
        mb={1}
        align={'center'}
        justify={'center'}
        color={'white'}
        bg={'green.400'}
        rounded={'full'}
        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
        fontWeight={'600'}
        fontSize={[14, 14, 18]}
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