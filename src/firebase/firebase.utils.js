import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAyUD0Oy1Cj-4yzeqK5wg-v0RxnROq656g",
  authDomain: "crwn-db-fce6d.firebaseapp.com",
  databaseURL: "https://crwn-db-fce6d.firebaseio.com",
  projectId: "crwn-db-fce6d",
  storageBucket: "crwn-db-fce6d.appspot.com",
  messagingSenderId: "380102270687",
  appId: "1:380102270687:web:8eb7ba567edf476b68d36a",
  measurementId: "G-NSCLCQ0TMH"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //   if user doesnt exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // try creating one
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// set up google auth utility
const provider = new firebase.auth.GoogleAuthProvider();
// take custom parameters, we want it to trigger the google pop up whenever we use
// google auth provider for signing in and out
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
