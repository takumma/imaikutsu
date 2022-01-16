import {
  Box,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Heart from "../assets/heart.svg";

const AboutNumCard = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"xl"}
      rounded={"lg"}
      overflow={"hidden"}
      textAlign={"start"}
      p={6}
      borderWidth={"1px"}
    >
      <Text fontSize={{ base: "lg" }} fontWeight={600}>
        数字について
      </Text>
      <Text>Twitter のユーザー名に入れる数字は、以下のようにしましょう。</Text>
      <List spacing={1} mt={2} mb={4}>
        <ListItem>
          <ListIcon as={Heart} mr={1} />「 1 ～ 10 」の整数値（半角）
        </ListItem>
        <ListItem>
          <ListIcon as={Heart} mr={1} />
          体調が良いときは小さい数字、体調が悪いときは大きい数字に
        </ListItem>
      </List>
      <Text fontSize={"sm"} color={"gray.500"}>
        ※範囲外の数字を入れると、うまく記録されない場合があります。
      </Text>
    </Box>
  );
};

export default AboutNumCard;
