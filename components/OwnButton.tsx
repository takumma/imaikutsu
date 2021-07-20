import { Button } from "@chakra-ui/react"

interface OwnButtonProps {
  onClick: () => void,
  label: string,
}

const OwnButton = (props: OwnButtonProps) => {
  return (
    <Button
      rounded={'full'}
      bg={'green.400'}
      p={6}
      color={'white'}
      boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
      _hover={{
        bg: 'green.500',
      }}
      _focus={{
        bg: 'green.500',
      }}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  )
}

export default OwnButton