import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const getMentalValue = functions.https.onRequest((request, response) => {
  
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