import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

export const getMentalValue = functions.https.onRequest(async (request, response) => {

  const resp = await admin.firestore().collection('users').get()
  console.log(resp)
  
  const num = getMentalValueFromName((request.query as any).name!)
  response.send({
    mentalValue: num
  });
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