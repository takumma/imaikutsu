import * as functions from "firebase-functions";
import { TwitterApi } from "twitter-api-v2";
import { UserData } from "../../../types";
import { UserDetail } from "../types";
import { getMentalValueFromName } from "./getMentalValueFromName";
import { config } from "./../declarations";

const firebaseConfig = functions.config() as config.Config;

export const getNameAndMentalValueFromTwitter = async (
  userDatas: UserData[]
): Promise<UserDetail[]> => {
  const client = new TwitterApi(firebaseConfig.functions.bearer);

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
