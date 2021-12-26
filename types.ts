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
