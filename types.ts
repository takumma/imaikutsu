import { DocumentData, FirestoreDataConverter } from "firebase/firestore";

export type UserData = {
  uid: string;
  screenName: string;
  isActive: boolean;
};

export type MentalValue = {
  time_stamp: string;
  value: number;
};

export type GraphData = {
  mentalValues: MentalValue[];
  screen_name: string;
};

export function assertUserData(data: DocumentData): asserts data is UserData {
  const d = data as Partial<UserData>;
  if (
    !(
      typeof d?.uid === "string" &&
      typeof d?.screenName === "string" &&
      typeof d?.isActive === "boolean"
    )
  ) {
    throw new Error("data is not UserData type");
  }
}

export function assertGraphData(data: DocumentData): asserts data is GraphData {
  const d = data as Partial<GraphData>;
  if (
    !(typeof d?.mentalValues === "object" && typeof d?.screen_name === "string")
  ) {
    throw new Error("data is not GraphData type");
  }
}

export const userDataConverter: FirestoreDataConverter<UserData> = {
  toFirestore: (user) => user,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    assertUserData(data);
    return data;
  },
};

export const graphDataConverter: FirestoreDataConverter<GraphData> = {
  toFirestore: (user) => user,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    assertGraphData(data);
    return data;
  },
};
