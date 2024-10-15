import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  runTransaction,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../api/firebase.js";

const collectionName = "data";

export const MediaData = {
  // get all media data from db
  getAllMediaData: async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // get a media data using its id
  getMediaDataById: async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("This media data does not exist");
      }
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } catch (error) {
      console.error("Error finding document:", error);
      throw error;
    }
  },

  // update a mediaData
  updateMediaDataById: async (data) => {
    try {
      const docRef = doc(db, collectionName, data.id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        await setDoc(docRef, data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Error updating media data with ID ${data.id}:`, error);
      return false;
    }
  },

  // add a media data
  addMediaData: async (data) => {
    try {
      const { name, imageURL, description, country, year, type, genre } = data;

      // Check if a media data with the same name already exists
      const mediaDataQuery = query(
        collection(db, collectionName),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(mediaDataQuery);
      if (!querySnapshot.empty) {
        console.log("MediaData with this name already exists.");
        throw new Error("MediaData already exists");
      }

      const storageRef = ref(storage, imageURL);
      const snapshot = await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);

      // Using Firestore transactions
      const newDocRef = doc(collection(db, collectionName));
      await runTransaction(db, async (transaction) => {
        transaction.set(newDocRef, {
          name,
          imageURL: downloadURL,
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

  // delete a media data from the db
  delete: async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("This media data does not exist");
      }
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  },
};
