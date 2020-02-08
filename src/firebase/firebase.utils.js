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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// set up google auth utility
const provider = new firebase.auth.GoogleAuthProvider();
// take custom parameters, we want it to trigger the google pop up whenever we use
// google auth provider for signing in and out
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
