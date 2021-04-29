import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { User } from './types';
import Twitter from 'twitter';

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-qhq36@imaikutsu.iam.gserviceaccount.com'
})

const firestore = admin.firestore()

const consumerkey = functions.config().functions.consumer_key
const consumerSecret = functions.config().functions.consumer_secret
const accessTokenKey = functions.config().functions.access_token_key
const accessTokenSecret = functions.config().functions.access_token_secret


export const getMentalValue = functions.https.onRequest(async (request, response) => {

  await getActiveUsers().then((users: User[]) => {
    showRequest(users)
    
    response.send({
      users: users,
    });
  })
});

const getActiveUsers = async (): Promise<User[]> => {
  return firestore.collection('users').where("isActive", "==", true).get()
  .then((querySnapShot) => {
    let users: User[] = []
    querySnapShot.forEach((doc) => {
      const data = doc.data()
      users.push({
        uid: data.uid,
        id: data.id,
        screenName: data.screenName,
      });
    })
    return users;
  })
}

const showRequest = (users: User[]) => {
  const MaxParallelNum = 5;
  
  const client = new Twitter({
    consumer_key: consumerkey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  });

  for (let i = 0; i < users.length; i += MaxParallelNum) {
    const requests = users.slice(i, i + MaxParallelNum).map((user) => (async () => {
      const resp = await client.get('users/show', { screen_name: user.screenName })
      const mentalValue = getMentalValueFromName(resp.name)
      if (mentalValue) {
        firestore.collection('graphs').doc(user.uid).set({
          'date': mentalValue
        }, { merge: true })
      }
    })())
    Promise.all(requests);
  }
}

const getMentalValueFromName = (name: string | null): number | null => {
  if(name === null) return null;
  
  const doubleDigit = Number(name.slice(-2))
  const singleDigit = Number(name.slice(-1))

  if(isNaN(doubleDigit)) {
    if(!isNaN(singleDigit)) return singleDigit
    else return null
  } else {
    if(doubleDigit > 10) return singleDigit
    else return doubleDigit
  }
}


// const lookupRequest = (users: User[]) => {
//   const MaxUsersNum = 99;
//   const results = []
//   for (let i = 0; i < users.length; i += MaxUsersNum) {
//     const params = users.slice(i, i + MaxUsersNum).map((user) => user.screenName)
//     results.push(params);
//   }
// }

// const errorResponse = (response: any, error: any) => {
//   response.send({
//     error: error
//   })
// }