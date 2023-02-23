// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export {auth};