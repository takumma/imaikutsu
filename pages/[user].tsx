import { Stack, Container, Text, Button, useToast } from "@chakra-ui/react";
import Graph from "../components/Graph";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

import useSWR from "swr";
import getGraph from "../utils/getGraph";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import Seo from "../components/Seo";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { ParsedUrlQuery } from "querystring";

type Status = "info" | "warning" | "success" | "error";

type UerPageProps = { ssQuery?: ParsedUrlQuery };

const UserPage = ({ ssQuery }: UerPageProps) => {
  const { query, isReady } = useRouter();

  const srQuery = ssQuery ? ssQuery : query;
  const user = Array.isArray(srQuery.user)
    ? srQuery.user[0]
    : srQuery.user ?? "";

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
      <Seo title={`@${user}`} description={`@${user}さんの体調の記録`} />
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 14 }}
      >
        {!data || !isReady ? (
          <Loading />
        ) : data.length !== 0 ? (
          <Container>
            <Text
              fontSize={{ base: "xl", sm: "xl", md: "xl" }}
              fontWeight={600}
              mb={12}
            >
              @{user}さんのグラフ
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
        ) : (
          <Container>
            <Text
              fontSize={{ base: "md", sm: "md", md: "lg" }}
              fontWeight={400}
              mb={12}
            >
              @{user}さんのデータはありません。
            </Text>
          </Container>
        )}
      </Stack>
    </Container>
  );
};

export default UserPage;

export function getServerSideProps(
  ctx: GetServerSidePropsContext
): GetServerSidePropsResult<UerPageProps> {
  return { props: { ssQuery: ctx.query } };
}
