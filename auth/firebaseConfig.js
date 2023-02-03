// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGglPiWLaj7muwsxMxLbsYQSik7IuHEE",
  authDomain: "lend-a-hand-aafde.firebaseapp.com",
  projectId: "lend-a-hand-aafde",
  storageBucket: "lend-a-hand-aafde.appspot.com",
  messagingSenderId: "43130836909",
  appId: "1:43130836909:web:b78cec7d669cbdec0e7324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};