import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../../types";
import Twitter from "twitter";

// setting about dayjs and timezone
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");
process.env.TZ = "Asia/Tokyo";

// setting about firebase
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "firebase-adminsdk-qhq36@imaikutsu.iam.gserviceaccount.com",
});

const firestore = admin.firestore();

const consumerkey = functions.config().functions.consumer_key;
const consumerSecret = functions.config().functions.consumer_secret;
const accessTokenKey = functions.config().functions.access_token_key;
const accessTokenSecret = functions.config().functions.access_token_secret;

// Scheduler of request about mentalValues
exports.scheduledFunction = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    const timestamp = dayjs().tz().format("YYYY-MM-DD-HH-mm");

    void getActiveUsers().then((users) => {
      showRequest(users, timestamp);
    });
  });

// get active user (isActive == true) from firestore
const getActiveUsers = async (): Promise<User[]> => {
  return firestore
    .collection("users")
    .where("isActive", "==", true)
    .get()
    .then((querySnapShot) => {
      const users: User[] = [];
      querySnapShot.forEach((doc) => {
        const data = doc.data();
        users.push({
          uid: data.uid,
          screenName: data.screenName,
          isActive: true,
        });
      });
      return users;
    });
};

const showRequest = (users: User[], timeStamp: string) => {
  const MaxParallelNum = 5;

  const client = new Twitter({
    consumer_key: consumerkey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  });

  // Get the name from twitter for each user,
  // And add mentalValue taken from name to firestore array with timestamp.
  for (let i = 0; i < users.length; i += MaxParallelNum) {
    const requests = users.slice(i, i + MaxParallelNum).map((user) =>
      (async () => {
        const resp = await client.get("users/show", {
          screen_name: user.screenName,
        });
        const mentalValue = getMentalValueFromName(resp.name);
        if (mentalValue) {
          await firestore
            .collection("graphs")
            .doc(user.uid)
            .update({
              mentalValues: admin.firestore.FieldValue.arrayUnion({
                time_stamp: timeStamp,
                value: mentalValue,
              }),
            });
        }
      })()
    );

    void Promise.all(requests);
  }
};

// Get the mental value from the end of the name.
const getMentalValueFromName = (name: string | null): number | null => {
  if (name === null) return null;

  const doubleDigit = Number(name.slice(-2));
  const singleDigit = Number(name.slice(-1));

  if (isNaN(doubleDigit)) {
    if (!isNaN(singleDigit)) return singleDigit;
    else return null;
  } else {
    if (doubleDigit > 10) return singleDigit;
    else return doubleDigit;
  }
};
