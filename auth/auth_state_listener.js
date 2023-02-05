/*
    Observes the global authentication object, which can give each page information
    about the signed in user.


    CURRENTLY DOES NOTHING.
    USE USEEFFECT INSTEAD.
*/

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

function authStateListener() {
  userSignedIn = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userSignedIn = true;
    } else {
      console.log("No user is signed in.");
    }
  });

  return userSignedIn;
}
