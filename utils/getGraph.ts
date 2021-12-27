import { collection, getDocs, query, where } from "firebase/firestore";
import { graphDataConverter, MentalValue } from "../types";
import { firestore } from "./firebase";

const getGraph = async (user: string): Promise<MentalValue[]> => {
  const q = query(
    collection(firestore, "graphs"),
    where("screen_name", "==", `${user}`)
  ).withConverter(graphDataConverter);

  return await getDocs(q)
    .then((snapshot) => {
      let result: MentalValue[] = [];
      snapshot.forEach((doc) => {
        const mentalValues: MentalValue[] | null = doc.data().mentalValues;
        if (mentalValues)
          result = mentalValues.map((mentalValue) => {
            // ex: 2021-10-03 -> 10/03
            const splitedTimeStamp = mentalValue.time_stamp.split("-");
            mentalValue.time_stamp = `${splitedTimeStamp[1]}/${splitedTimeStamp[2]}`;
            return mentalValue;
          });
      });
      return result;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export default getGraph;
