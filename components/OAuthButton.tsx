import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { User } from '../types';

const OAuthButton = () => {

  const signInWithTwitter = async () => {
    try {
      if(location) {
        const resp = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        const userData: User = {
          uid: resp.user.uid,
          id: resp.additionalUserInfo.profile['id'],
          screenName: resp.additionalUserInfo.username,
          isActive: true,
        }
        const firestore = firebase.firestore();
        const ref = firestore.collection('users').doc(resp.user.uid)
        await ref.set({ ...userData })
        console.log('seccess')
      } else {
        throw Error('Error!')
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