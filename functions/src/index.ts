import * as functions from "firebase-functions";
import "./firebase";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getActiveUsers } from "./utils/getActiveUsers";
import { addMentalValuesToFireStore } from "./utils/addMentalValuesToFireStore";
import { getNameAndMentalValueFromTwitter } from "./utils/getNameAndMentalValueFromTwitter";

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
  .onRun(() => task());

const getTimeStamp = () => dayjs().tz().format("YYYY-MM-DD-HH-mm");

const task = async () => {
  const timeStamp = getTimeStamp();

  const users = await getActiveUsers();
  const userDetails = await getNameAndMentalValueFromTwitter(users);
  await addMentalValuesToFireStore(userDetails, timeStamp);
};

// export const test = functions.https.onRequest(async () => {
//   await task();
//   console.log("task succeeded!");
// });
