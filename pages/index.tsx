import Head from "next/head";
import OAuthButton from "../components/OAuthButton";
import Loading from "../components/Loading";
import { Container, HStack, Stack } from "@chakra-ui/react";
import { auth, firestore } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FeaturesBlock from "../components/FeaturesBlock";
import Heroes from "../components/Heroes";
import OwnButton from "../components/OwnButton";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, FirestoreDataConverter, getDoc } from "firebase/firestore";
import { UserData } from "../types";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  function assertUserData(data: any): asserts data is UserData {
    const d = data as Partial<UserData>; // 補完のためキャスト
    if (
      !(
        typeof d?.uid === "string" &&
        typeof d?.screenName === "string" &&
        typeof d?.isActive === "boolean"
      )
    ) {
      throw new Error("data is not UserData type");
    }
  }

  const userDataConverter: FirestoreDataConverter<UserData> = {
    toFirestore: (user) => user,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      assertUserData(data);
      return data;
    },
  };

  const getscreenName = async (user: User): Promise<string> => {
    return getDoc(
      doc(firestore, "users", `${user.uid}`).withConverter(userDataConverter)
    )
      .then((doc) => {
        const data = doc.data();
        if (!data) return "";
        return data.screenName;
      })
      .catch(() => "");
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in
        getscreenName(user).then((name) => {
          setName(name);
        });
      } else {
        // sign out
      }
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"5xl"}>
      <Head>
        <title>imaikutsu?</title>
      </Head>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heroes />
        {loading ? (
          <Loading />
        ) : name ? (
          <Stack align={"Center"}>
            <HStack mb={2}>
              <OwnButton
                label={"グラフをみる"}
                onClick={() => router.push(`/${name}`)}
              />
            </HStack>
            {/* <HStack>
              <Button
                variant={'link'}
                colorScheme={'blue'}
                onClick={() => {}}
              >
                Learn more
              </Button>
            </HStack> */}
          </Stack>
        ) : (
          <HStack>
            <OAuthButton />
          </HStack>
        )}
        <FeaturesBlock />
      </Stack>
    </Container>
  );
}
