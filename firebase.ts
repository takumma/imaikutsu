import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA1JO6wDzzpYQefMB6vJRrfg58_gjALY3U",
  authDomain: "imaikutsu.firebaseapp.com",
  projectId: "imaikutsu",
  storageBucket: "imaikutsu.appspot.com",
  messagingSenderId: "607654962168",
  appId: "1:607654962168:web:06efe8f53c27bec80c2c0d"
};


const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export default app