/*
    Signs in a user with email and password.
*/

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

const signin = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("You have signed in successfully, " + user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export {signin};