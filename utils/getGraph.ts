import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GraphData, MentalValue } from "../types";
import { firestore } from "./firebase";

function assertGraphData(data: DocumentData): asserts data is GraphData {
  const d = data as Partial<GraphData>;
  if (
    !(typeof d?.mentalValues === "object" && typeof d?.screen_name === "string")
  ) {
    throw new Error("data is not GraphData type");
  }
}

const getGraph = async (user: string): Promise<MentalValue[]> => {
  const graphDataConverter: FirestoreDataConverter<GraphData> = {
    toFirestore: (user) => user,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      assertGraphData(data);
      return data;
    },
  };

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
