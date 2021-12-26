import React from "react";
import { auth, firestore } from "../utils/firebase";
import {
  getAdditionalUserInfo,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { User } from "../types";
import { Button } from "@chakra-ui/button";
import { FaTwitter } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";

type Status = "info" | "warning" | "success" | "error";

const OAuthButton = () => {
  const toast = useToast();

  const showToast = (title: string = "", status: Status = "info") => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const signInWithTwitter = async () => {
    if (location) {
      const provider = new TwitterAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const additionalUserInfo = getAdditionalUserInfo(result);
          const user: User = {
            uid: result.user.uid,
            screenName: additionalUserInfo.username,
            isActive: true,
          };
          setDoc(doc(firestore, "users", result.user.uid), { ...user });
          showToast("Login was Succeeded!", "success");
        })
        .catch((err) => {
          console.log(err);
          showToast("Login was Failed...", "error");
        });
    }
  };

  return (
    <Button
      onClick={() => {
        signInWithTwitter();
      }}
      colorScheme="twitter"
      leftIcon={<FaTwitter />}
    >
      Twitterでログイン
    </Button>
  );
};

export default OAuthButton;
