/*
    Observes the global authentication object, which can give each page information
    about the signed in user.
*/

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        console.log("No user is signed in.");
    }
});