// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCDGglPiWLaj7muwsxMxLbsYQSik7IuHEE",
//   authDomain: "lend-a-hand-aafde.firebaseapp.com",
//   projectId: "lend-a-hand-aafde",
//   storageBucket: "lend-a-hand-aafde.appspot.com",
//   messagingSenderId: "43130836909",
//   appId: "1:43130836909:web:b78cec7d669cbdec0e7324"
// };

// DEV FIRBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAZ9VKbq_0J7nsacO2MGPjyCgoSilR-0Gw",
  authDomain: "cfs6-cc409.firebaseapp.com",
  projectId: "cfs6-cc409",
  storageBucket: "cfs6-cc409.appspot.com",
  messagingSenderId: "966695412990",
  appId: "1:966695412990:web:e0769bdee5ddfbaecab1af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};