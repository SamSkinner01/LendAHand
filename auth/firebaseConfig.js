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
  apiKey: "AIzaSyAmONfEkgEg-QGaKiAUB3_fVtdYzmjU7Js",
  authDomain: "sam-dev-febfd.firebaseapp.com",
  projectId: "sam-dev-febfd",
  storageBucket: "gs://sam-dev-febfd.appspot.com",
  messagingSenderId: "918445001947",
  appId: "1:918445001947:web:5fff85960877b2f09b10fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};