/*
    Signs up a user with an email and password.
*/
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

const signup = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("You have signed up successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export { signup };
