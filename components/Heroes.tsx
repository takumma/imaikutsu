import { Heading, Text } from "@chakra-ui/react"

const Heroes = () => (
  <>
    <Heading
      fontWeight={600}
      fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
      lineHeight={'110%'}
    >
      あなたの&quot;気持ち&quot;を、<br />
      &quot;数字&quot;でおしえて
    </Heading>
    <Text color={'gray.600'} maxW={'3xl'}>
      毎日使ってるTwitterで、自分のメンタルを記録しましょう。Twitter認証をして、あとはTwitterのユーザー名にメンタル値を付けるだけです。
      ふとした時に名前を変えれば、それだけであなたのメンタルが記録されていきます。
    </Text>
  </>
)

export default Heroes