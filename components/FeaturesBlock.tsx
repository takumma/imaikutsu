import { Box, SimpleGrid } from "@chakra-ui/react";
import Feature from "./Feature";

const STEPS = [
  {
    title: "Twitterログイン",
    text: "まずは、自分のTwitterアカウントでログインしてください。",
    image: "images/auth_with_twitter.png",
  },
  {
    title: "Twitterで記録する",
    text: "ユーザー名の後ろにメンタル値を入れましょう。定期的に自分に「いまいくつ？」と問いかけて記録していきましょう。メンタル値は一日1回記録されていきます。",
    image: "images/change_your_name.png",
  },
  {
    title: "記録を見る",
    text: "過去の記録が見たくなったら、自分のページに飛んで自分のメンタル値の記録を確認することもできます。",
    image: "images/graph.png",
  },
];

const FeaturesBlock = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {STEPS.map((step, index) => (
          <Feature {...step} index={index} key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturesBlock;
