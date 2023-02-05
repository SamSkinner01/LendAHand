import { auth } from "./firebaseConfig.js";
import { signOut } from "firebase/auth";

const signUserOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.log("Error signing out: ", error);
    });
};

export { signUserOut };
