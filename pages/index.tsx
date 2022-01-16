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
import { doc, getDoc } from "firebase/firestore";
import { userDataConverter } from "../types";
import Seo from "../components/Seo";
import AboutNumCard from "../components/AboutNum";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getscreenName = async (user: User): Promise<string> => {
      return await getDoc(
        doc(firestore, "users", `${user.uid}`).withConverter(userDataConverter)
      )
        .then((doc) => {
          const data = doc.data();
          if (!data) return "";
          return data.screenName;
        })
        .catch(() => "");
    };

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in
        getscreenName(user)
          .then((name) => {
            setName(name);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // sign out
      }
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"5xl"}>
      <Seo />
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
                label={"あなたの記録を見る"}
                onClick={() => router.push(`/${name}`)}
              />
            </HStack>
          </Stack>
        ) : (
          <HStack>
            <OAuthButton />
          </HStack>
        )}
        <FeaturesBlock />
        <AboutNumCard />
      </Stack>
    </Container>
  );
}
