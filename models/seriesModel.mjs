import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase.mjs";

const collectionName = "series";

export const Series = {
  // get all series from db
  getAllSeries: async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // get a series using its id
  getSeriesById: async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("This series does not exist");
      }
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } catch (error) {
      console.error("Error finding document:", error);
      throw error;
    }
  },

  // add a series
  addSeries: async (data) => {
    try {
      const { name, imageURL, description, country, year, type, genre } = data;

      // Check if a series with the same name already exists
      const seriesQuery = query(
        collection(db, collectionName),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(seriesQuery);
      if (!querySnapshot.empty) {
        console.log("Series with this name already exists.");
        throw new Error("Series already exists");
      }

      // Using Firestore transactions
      const newDocRef = doc(collection(db, collectionName));
      await runTransaction(db, async (transaction) => {
        transaction.set(newDocRef, {
          name,
          imageURL,
          description,
          country,
          year,
          type,
          genre,
          id: newDocRef.id,
        });
      });

      console.log("Document written successfully with ID:", newDocRef.id);
      return newDocRef.id;
    } catch (error) {
      console.error("Error writing document:", error);
      throw error;
    }
  },

  // update a series
  // delete a series from the db
};
