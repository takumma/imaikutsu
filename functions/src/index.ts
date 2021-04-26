import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { User } from './types';
import Twitter from 'twitter';

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-qhq36@imaikutsu.iam.gserviceaccount.com'
})

export const getMentalValue = functions.https.onRequest(async (request, response) => {

  const users: User[] = await admin.firestore().collection('users').where("isActive", "==", true).get().then((querySnapShot) => {
    let users: User[] = []
    querySnapShot.forEach((doc) => {
      const data = doc.data()
      users.push({
        TwitterID: data.TwitterID,
        accessToken: data.accessToken,
        secret: data.secret,
        userName: data.userName,
      });
    })
    return users;
  })

  const consumerkey = functions.config().functions.consumer_key
  const consumerSecret = functions.config().functions.consumer_secret
  users.forEach((user) => {
    const client = new Twitter({
      consumer_key: consumerkey,
      consumer_secret: consumerSecret,
      access_token_key: user.accessToken,
      access_token_secret: user.secret
    });
    const params = { screen_name: user.TwitterID };
    client.get('users/show', params, (error, resp) => {
      if (error)
        console.error(error);
      console.log(resp.name);
      response.send({
        mentalValue: getMentalValueFromName(resp.name),
        users: users,
        test2: resp.name
      });
    })
  })
});

const getMentalValueFromName = (name: string): number | null => {
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