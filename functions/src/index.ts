import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserData } from "../../types";
import Twitter from "twitter";
import TwitterApi from "twitter-api-v2";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import serviceAccount from "../serviceAccountKey.json";
import { config } from "./declarations";
import { getMentalValueFromName } from "./utils/getMentalValueFromName";
import { getActiveUsers } from "./utils/getActiveUsers";

// setting about dayjs and timezone
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");
process.env.TZ = "Asia/Tokyo";

// setting about firebase
const serviceAccountObject = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject),
  databaseURL: "firebase-adminsdk-qhq36@imaikutsu.iam.gserviceaccount.com",
});

const firestore = admin.firestore();
const firebaseConfig = functions.config() as config.Config;

// Scheduler of request about mentalValues
export const getMentalValuesScheduler = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    const timestamp = dayjs().tz().format("YYYY-MM-DD-HH-mm");

    void getActiveUsers().then((users) => {
      showRequest(users, timestamp);
    });
  });

const func = async (userDatas: UserData[]) => {
  const twitterClient = new TwitterApi({
    appKey: firebaseConfig.functions.consumer_key,
    appSecret: firebaseConfig.functions.consumer_secret,
    accessToken: firebaseConfig.functions.access_token_key,
    accessSecret: firebaseConfig.functions.access_token_secret,
  });
  const appOnlyClient = twitterClient.readOnly;

  const getNames = async (users: UserData[]) => {
    // Up to 100 are allowed
    const result = await appOnlyClient.v2.usersByUsernames(
      users.map((user) => user.screenName)
    );
    return result.data.map((user) => user.name);
  };

  const addMentalValue = async (
    user: UserData,
    name: string,
    timeStamp: string
  ) => {
    const mentalValue = getMentalValueFromName(name);
    await firestore
      .collection("graphs")
      .doc(user.uid)
      .update({
        mentalValues: admin.firestore.FieldValue.arrayUnion({
          time_stamp: timeStamp,
          value: mentalValue,
        }),
      });
  };

  const userNamesMaxLength = 100;
  const twitterRequests = [];
  for (let i = 0; i < userDatas.length; i += userNamesMaxLength) {
    const users = userDatas.slice(i, i + userNamesMaxLength);
    twitterRequests.push(getNames(users));
  }
  const twitterResult = await Promise.all(twitterRequests);

  // todo
};

const showRequest = (users: UserData[], timeStamp: string) => {
  const MaxParallelNum = 5;

  const client = new Twitter({
    ...firebaseConfig.functions,
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
