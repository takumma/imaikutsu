import { Stack, Container, Text, Button, useToast } from "@chakra-ui/react";
import Graph from "../components/Graph";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useRouter } from "next/router";

import useSWR from "swr";
import getGraph from "../utils/getGraph";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

type Status = "info" | "warning" | "success" | "error";

const UserPage = () => {
  const { query, isReady } = useRouter();
  const user = query.user;

  const toast = useToast();

  const showToast = (title: string = "", status: Status = "info") => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const { data, error } = useSWR(`${user}`, getGraph, {
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
        {error ? (
          <Error msg={`An error has occurred.${error}`}></Error>
        ) : !data || !isReady ? (
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
            <Stack shouldWrapChildren={true}>
              <Graph data={data} />
            </Stack>
            <Graph data={data} />
            {/* <Text
                fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
                fontWeight={600}
                mt={36}
                mb={12}
              >
                設定
              </Text>
              <FormControl display="flex">
                <FormLabel>
                  記録をする
                </FormLabel>
                <Switch />
              </FormControl> */}

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
