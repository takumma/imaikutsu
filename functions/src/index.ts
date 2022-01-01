import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserData } from "../../types";
import TwitterApi from "twitter-api-v2";
import serviceAccount from "../serviceAccountKey.json";
import { config } from "./declarations";

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

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// setting about dayjs and timezone
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");
process.env.TZ = "Asia/Tokyo";

import { getMentalValueFromName } from "./utils/getMentalValueFromName";
import { getActiveUsers } from "./utils/getActiveUsers";
import { UserDetail } from "./function_types";

// Scheduler of request about mentalValues
export const getMentalValuesScheduler = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const timeStamp = getTimeStamp();

    const users = await getActiveUsers();
    const userDetails = await getNameAndMentalValueFromTwitter(users);
    await addMentalValuesToFireStore(userDetails, timeStamp);
  });

const getTimeStamp = () => dayjs().tz().format("YYYY-MM-DD-HH-mm");

const addMentalValuesToFireStore = async (
  userDetails: UserDetail[],
  timeStamp: string
) => {
  const addMentalValue = async (userDetail: UserDetail): Promise<void> => {
    await firestore
      .collection("graphs")
      .doc(userDetail.user.uid)
      .update({
        mentalValues: admin.firestore.FieldValue.arrayUnion({
          time_stamp: timeStamp,
          value: userDetail.currentMentalValue,
        }),
      });
  };

  const requests: Promise<void>[] = [];
  for (let i = 0; i < userDetails.length; i++) {
    requests.push(addMentalValue(userDetails[i]));
  }
  await Promise.all(requests);
};

const getNameAndMentalValueFromTwitter = async (
  userDatas: UserData[]
): Promise<UserDetail[]> => {
  const consumerClient = new TwitterApi({
    appKey: firebaseConfig.functions.consumer_key,
    appSecret: firebaseConfig.functions.consumer_secret,
  });
  const client = await consumerClient.appLogin();

  const getNames = async (users: UserData[]): Promise<string[]> => {
    // Up to 100 are allowed
    const result = await client.v2.usersByUsernames(
      users.map((user) => user.screenName)
    );
    return result.data.map((user) => user.name);
  };

  const userNamesMaxLength = 100;
  const twitterRequests = [];
  for (let i = 0; i < userDatas.length; i += userNamesMaxLength) {
    const users = userDatas.slice(i, i + userNamesMaxLength);
    twitterRequests.push(getNames(users));
  }
  const twitterResult = await Promise.all(twitterRequests);

  // convert Two-dimensional -> One-dimensional array
  // ex: [["a", "b"], ["c", "d"]] -> ["a", "b", "c", "d"]
  const names = twitterResult.reduce((prev, current) => {
    prev.push(...current);
    return prev;
  }, []);

  const userDetails: UserDetail[] = [];

  for (let i = 0; i < userDatas.length; i++) {
    const mentalValue = getMentalValueFromName(names[i]);
    if (mentalValue) {
      userDetails.push({
        user: userDatas[i],
        name: names[i],
        currentMentalValue: mentalValue,
      });
    }
  }

  return userDetails;
};
