// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, where, query, doc, deleteDoc, updateDoc, arrayUnion} from "firebase/firestore";
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
const db = getFirestore(app);


export async function readFromDb(collectionName) {
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

export async function search_by_keyword(keyword) {
  //search for any event type using the keyword
    const q = query(collection(db, "Events"), where("event_type", "==", keyword)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }));
  return data
}

export async function deleteCollection(id, collectionName) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}


//Search for the currently logged in user's profile info using their UUID
export async function getProfile() {
  try {
    const profileRef = collection(db, "user_profiles");
    const q = query(profileRef, where("UUID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    //Should only be 1 doc in the search results
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Variable Names and structure will change depending on the structure of event database
export async function getProfileEvents(uuid) {
  try {
    const eventRef = collection(db, "events");
    const q = query(eventRef, where("event_id", "==", profileInfo.events))   //WRONG!!! find way to say profileInfo.events.includes(event_id)
    const querySnapshot = await getDocs(q);

    const fetchedEvents = [];
    querySnapshot.docs.map((doc) => ({
      data: doc.data(),
    }));
    return data;
    setProfileEvetns(fetchedEvents);
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePosts() {
  try {
    const eventRef = collection(db, "socialMedia");
    const q = query(eventRef, where("user_id", "==", profileInfo.user))   //WRONG!!! 
    const querySnapshot = await getDocs(q);

    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      fetchedPosts.push({
        //Set data based on how the event database works
      });
    });
    setProfilePosts(fetchedPosts);
  } catch (error) {
    console.log(error);
  }
}

export async function add_to_array(event_id, user_id) {
  // const db = await database();
  const eventRef = doc(db, 'Events', event_id)
  const userRef = doc(db, 'users', user_id)
  try {
    await updateDoc(eventRef, 
      {signed_up_users: arrayUnion(user_id)});
      await updateDoc(userRef, 
        {signed_up_for_events: arrayUnion(event_id)});
    console.log('info updated!')
  } catch (error) {
    console.log(error, 'Please check infomation')
  }
}


export {auth, db};