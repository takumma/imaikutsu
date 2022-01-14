import { assertUserData, UserData } from "../../../types";
import * as admin from "firebase-admin";

const firestore = admin.firestore();

const userDataConverter: admin.firestore.FirestoreDataConverter<UserData> = {
  toFirestore: (user) => user,
  fromFirestore: (snapshot: admin.firestore.QueryDocumentSnapshot) => {
    const data = snapshot.data();
    assertUserData(data);
    return data;
  },
};

// get active user (isActive == true) from firestore
export const getActiveUsers = async (): Promise<UserData[]> => {
  return firestore
    .collection("users")
    .withConverter(userDataConverter)
    .where("isActive", "==", true)
    .get()
    .then((querySnapShot) => {
      const users: UserData[] = [];
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
