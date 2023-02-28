// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


/*
//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGglPiWLaj7muwsxMxLbsYQSik7IuHEE",
  authDomain: "lend-a-hand-aafde.firebaseapp.com",
  projectId: "lend-a-hand-aafde",
  storageBucket: "lend-a-hand-aafde.appspot.com",
  messagingSenderId: "43130836909",
  appId: "1:43130836909:web:b78cec7d669cbdec0e7324"
};
*/



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjE6zz_K_3gqTE_CXmWOAJqE8FSyyCj2E",
  authDomain: "forumtest-7e262.firebaseapp.com",
  projectId: "forumtest-7e262",
  storageBucket: "forumtest-7e262.appspot.com",
  messagingSenderId: "568657505456",
  appId: "1:568657505456:web:fa8af4b7a3acbc05c31f75",
  measurementId: "G-3PFEKEGPFW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};