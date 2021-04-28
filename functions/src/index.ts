import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { User } from './types';
import Twitter from 'twitter';

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-qhq36@imaikutsu.iam.gserviceaccount.com'
})

export const test = functions.https.onRequest((request, response) => {
  response.send({
    msg: "test"
  })
})

export const getMentalValue = functions.https.onRequest(async (request, response) => {

  const users: User[] = await getActiveUsers();
  console.log(users);

  const consumerkey = functions.config().functions.consumer_key
  const consumerSecret = functions.config().functions.consumer_secret
  users.forEach((user) => {
    const client = new Twitter({
      consumer_key: consumerkey,
      consumer_secret: consumerSecret,
      access_token_key: user.accessToken,
      access_token_secret: user.secret
    });
    const params = { screen_name: user.screenName };
    client.get('users/show', params, (error, resp) => {
      if (error) {
        console.error(error)
        errorResponse(response,error)
      }
    })
  })
  response.send({
    users: users,
  });
});

const getActiveUsers = async (): Promise<User[]> => {
  return admin.firestore().collection('users').where("isActive", "==", true).get()
  .then((querySnapShot) => {
    let users: User[] = []
    querySnapShot.forEach((doc) => {
      const data = doc.data()
      users.push({
        accessToken: data.accessToken,
        secret: data.secret,
        id: data.id,
        name: data.name,
        screenName: data.screenName,
      });
    })
    return users;
  })
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

const errorResponse = (response: any, error: any) => {
  response.send({
    error: error
  })
}