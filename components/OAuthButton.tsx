import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { User } from '../types';

const OAuthButton = () => {

  const signInWithTwitter = async () => {
    try {
      if(location) {
        const result = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        const credential: { accessToken: string, secret: string } = result.credential as any
        const userData: User = {
          accessToken: credential.accessToken,
          secret: credential.secret,
          TwitterID: result.additionalUserInfo.username,
          userName: "",
          isActive: true,
        }
        const firestore = firebase.firestore();
        const ref = firestore.collection('users').doc(result.user.uid)
        await ref.set({ ...userData })
        console.log('seccess')
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button onClick={() => signInWithTwitter()}>
      Twitter認証
    </button>
  )
}

export default OAuthButton;