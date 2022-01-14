import { Heading, Text } from "@chakra-ui/react";

const Heroes = () => (
  <>
    <Heading
      fontWeight={600}
      fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
      lineHeight={"110%"}
    >
      あなたの ”気持ち” を
      <br />
      ”数字” でおしえて
    </Heading>
    <Text color={"gray.600"} maxW={"3xl"}>
      毎日使ってる Twitter で、自分のメンタルを記録しましょう。
      <br />
      Twitter 認証をして、あとは Twitter
      のユーザー名に体調を表す数字を付けるだけです。
      <br />
      ふとした時に名前を変えれば、それだけであなたの体調が記録されていきます。
    </Text>
  </>
);

export default Heroes;
