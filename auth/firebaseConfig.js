// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, doc} from "firebase/firestore";
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

export async function readFromDb(collectionName) {
  // const db = await database();
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }));
  return data
}

export async function deleteEvent(id, collectionName) {
  const db = await database();
  const collection = database().collection(collectionName);
  try {
      await collection.doc(id).delete();
  } catch (error) {
      console.error('Error deleting time:', error);
  }
}

//just updates an event if it needs to like cahnge a date and do not want to delete it
// data is an obect which holds the new value and the data field that is being changed
export async function updateEvent(id, collectionName, data) {
  const db = await database();
  //You can update anything that is in the event except adding users to the signed_up_users field
  const docRef = doc(db, collectionName, id);
  try {
    updateDoc(docRef, data) //is_organization: true
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function search_by_id(id) {
  const docRef = doc(db, 'Events', id); //search Events by id
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}


export {auth, db};