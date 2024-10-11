import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.mjs";

export const Series = {
  // get all series from db
  getAllSeries: async () => {
    querySnapshot = await getDocs(collection(db, "cities"));
    return querySnapshot.map((doc) => {
      {
        id: doc.id, doc.data();
      }
    });
  },

  // get a series using its id
  // add a series
  // update a series
  // delete a series from the db
};
