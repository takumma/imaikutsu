import React from 'react'
import { auth } from '../utils/firebase'
import firebase from '../utils/firebase'
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { User } from '../types'
import { Button } from '@chakra-ui/button'
import { FaTwitter } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react'

type Status = "info" | "warning" | "success" | "error";

const OAuthButton = () => {
  const toast = useToast()

  const showToast = (title: string = "", status: Status = "info") => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    })
  }

  const signInWithTwitter = async () => {
    try {
      if(location) {
        const provider = new TwitterAuthProvider()
        signInWithPopup(auth, provider).then((result) => {
          console.log(result)
          // const user: User = {
          //   uid: result.user.uid,
          //   id: result.user.additionalUserInfo.profile['id'],
          //   screenName: result.user.providerData[0].displayName,
          //   isActive: true,
          // }
        })
        const resp = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        const userData: User = {
          uid: resp.user.uid,
          id: resp.additionalUserInfo.profile['id'],
          screenName: resp.additionalUserInfo.username,
          isActive: true,
        }
        const ref = firebase.firestore().collection('users').doc(resp.user.uid)
        await ref.set({ ...userData })
        showToast("Login was Succeeded!", "success")
      }
    } catch (err) {
      console.log(err)
      showToast("Login was Failed...", "error")
    }
  }

  return (
    <Button
      onClick={() => {
        signInWithTwitter()
      }}
      colorScheme="twitter"
      leftIcon={<FaTwitter />}
    >
      Twitterでログイン
    </Button>
  )
}

export default OAuthButton