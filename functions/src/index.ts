import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getActiveUsers } from "./utils/getActiveUsers";
import { addMentalValuesToFireStore } from "./utils/addMentalValuesToFireStore";
import { getNameAndMentalValueFromTwitter } from "./utils/getNameAndMentalValueFromTwitter";

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

// setting about dayjs and timezone
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");
process.env.TZ = "Asia/Tokyo";

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
