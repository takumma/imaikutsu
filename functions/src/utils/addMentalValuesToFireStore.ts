import { UserDetail } from "../types";
import * as admin from "firebase-admin";

const firestore = admin.firestore();

export const addMentalValuesToFireStore = async (
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
