export type UserData = {
  uid: string;
  screenName: string;
  isActive: boolean;
};

export type MentalValue = {
  timeStamp: string;
  value: number;
};

export type GraphData = {
  mentalValues: MentalValue[];
  screenName: string;
};
