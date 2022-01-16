import { Box, SimpleGrid } from "@chakra-ui/react";
import Feature from "./Feature";
import Feature1 from "../assets/feature_1.svg";
import Feature2 from "../assets/feature_2.svg";
import Feature3 from "../assets/feature_3.svg";

const STEPS = [
  {
    title: "Twitter ログイン",
    text: "まずは自分の Twitter アカウントでログインして、「imaikutsu?」と Twitter を連携してください。",
    image: <Feature1 height={200} width={200} viewBox="0 0 164 64" />,
  },
  {
    title: "Twitter で記録する",
    text: "Twitter のユーザー名の後ろに体調を表す数字を入れましょう。定期的に、自分に「いまいくつ？」と問いかけて記録していきましょう。数字は一日一回記録されていきます。",
    image: <Feature2 height={200} width={200} viewBox="0 0 186 118" />,
  },
  {
    title: "記録を見る",
    text: "過去の記録が見たくなったら、自分のページに飛んで自分のメンタル値の記録を確認することもできます。",
    image: <Feature3 height={200} width={200} viewBox="0 0 85 67" />,
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
