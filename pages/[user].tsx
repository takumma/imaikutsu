import { Stack, Container, Text, Button, useToast } from "@chakra-ui/react";
import Graph from "../components/Graph";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

import useSWR from "swr";
import getGraph from "../utils/getGraph";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

type Status = "info" | "warning" | "success" | "error";

const UserPage = () => {
  const { query, isReady } = useRouter();
  const user = Array.isArray(query.user) ? query.user[0] : query.user ?? "";

  const toast = useToast();

  const showToast = (title = "", status: Status = "info") => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const { data } = useSWR(`${user}`, getGraph, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const logout = () => {
    signOut(auth)
      .then(() => {
        showToast("Logout was Succeeded.", "success");
      })
      .catch((err) => {
        console.error(err);
        showToast("Logout was Failed...", "error");
      });
  };

  return (
    <Container w={"5x1"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 14 }}
      >
        {!data || !isReady ? (
          <Loading />
        ) : (
          <Container>
            <Text
              fontSize={{ base: "xl", sm: "xl", md: "xl" }}
              fontWeight={600}
              mb={12}
            >
              {user}さんのグラフ
            </Text>
            <Graph data={data} />
            <Button
              mt={36}
              variant={"link"}
              colorScheme={"red"}
              onClick={() => logout()}
            >
              ログアウト
            </Button>
          </Container>
        )}
      </Stack>
    </Container>
  );
};

export default UserPage;
