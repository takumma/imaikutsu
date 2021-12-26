import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

const graphCollection = collection(firestore, "graphs");

const getGraph = async (user: string) => {
  const q = query(graphCollection, where("screen_name", "==", `${user}`));

  return await getDocs(q)
    .then((snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        const mentalValues: any[] | null = doc.data().mentalValues;
        if (mentalValues)
          result = mentalValues.map((mentalValue) => {
            const timeStamp = mentalValue["time_stamp"].split("-");
            mentalValue["time_stamp"] = `${timeStamp[1]}/${timeStamp[2]}`;
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
