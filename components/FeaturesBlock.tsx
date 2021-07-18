import { Box, SimpleGrid } from "@chakra-ui/react"
import Feature from "./Feature"

const FeaturesBlock = () => {
  return (
    <Box p={4}>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={10}
      >
        <Feature
          number={1}
          title={'Twitter認証'}
          text={'自分のTwitterアカウントでログインしてください。'}
        />
        <Feature
          number={2}
          title={'Twitterのユーザー名を変更'}
          text={'ユーザー名の後ろにメンタル値を入れましょう。定期的に自分に「いまいくつ？」と問いかけて記録していきましょう。メンタル値は一日1回記録されていきます。'}
        />
        <Feature
          number={3}
          title={'記録を見る'}
          text={'過去の記録が見たくなったら、自分のページに飛んで自分のメンタル値の記録を確認することもできます。'}
        />
      </SimpleGrid>
    </Box>
  )
}