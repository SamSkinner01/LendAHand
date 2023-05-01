// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, getDoc, where, query, doc, deleteDoc, updateDoc, arrayUnion, orderBy, querySnapshot } from "firebase/firestore";
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


export async function readFromDb(collectionName) { // reads all data from database when giving the collection name
  const docRef = collection(db, collectionName);
  const q = query(docRef, orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }));
  return data
}

// this is a revamp of the readFromDb function that will only return events that are in the future
// export async function readFromDb(collectionName) {
//   const docRef = collection(db, collectionName);
//   const q = query(docRef, orderBy("date", "asc"));
//   const querySnapshot = await getDocs(q);
//   const data = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     data: doc.data(),
//   }));
//   // Add filter to only include dates that are from now and into the future
//   const currentDate = new Date();
//   const filteredData = data.filter((item) => {
//     const itemDate = item.data.date.seconds; // Date object, no conversion needed
//     console.log(itemDate);
//     console.log(currentDate);
//     return itemDate >= currentDate;
//   });
//   return filteredData;
// }


export async function deleteEvent(id, collectionName) { // removes a collection from a doc when giving the collection name and id of the collection
  const collection = database().collection(collectionName);
  try {
      await collection.doc(id).delete();
  } catch (error) {
      console.error('Error deleting collection:', error);
  }
}

//just updates an event if it needs to like change a date and do not want to delete it
// data is an obect which holds the new value and the data field that is being changed
export async function updateEvent(id, collectionName, data) {
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
  return docSnap.data();
}

export async function search_by_keyword(keyword) {
  //search for any event type using the keyword
    const q = query(collection(db, "Events"), where("event_type", "==", keyword), orderBy("date", "asc")); 
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
export async function getProfile(email) {
  try{
    const q = query(collection(db, "users"), where("email", "==", email)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
  }));
  // console.log(data)
  return data
  } catch (error) {
    console.log(error);
  }
}

export async function getProfileForumPosts(email) {
  try {
    const q = query(collection(db, "forum_posts"), where("username", "==", email))   //In the forum posts database, the username of the poster is their email
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function add_to_array(event_id, user_id) {
  const eventRef = doc(db, 'Events', event_id)
  const userRef = doc(db, 'users', user_id)
  try {
    await updateDoc(eventRef, 
      {signed_up_users: arrayUnion(user_id)});
      await updateDoc(userRef, 
        {signed_up_for_events: arrayUnion(event_id)});
    return 'success';
  } catch (error) {
    console.log("Error updating")
  }
}

export async function isOrganization(user_id){
  const orgRef = collection(db, "users", user_id);
  const q = query(orgRef, where("is_organization", "==", true));
  const docSnap = await getDoc(q);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

export async function getProfileSocialPosts(email){
  posts = []
  try{
    const q = query(collection(db, "social_media_posts"), where("user", "==", email)); 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const c = {data: doc.data(), id: doc.id}
      posts.push(c)
    })
  }
  catch(error){
    console.log(error)
    console.log("Error getting social media posts")
  }
  return posts
}

export async function getProfileEvents(email){
  events = []
  let uid;
  try{
    const q = query(collection(db, 'users'), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      uid = doc.id
    })
  }
  catch(error){
    console.log(error)
    console.log("Error getting social media posts")
  }

  console.log(uid)

  try{
    const q = query(collection(db, 'Events'), where("signed_up_users", "array-contains" , uid)); 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const c = {data: doc.data(), id: doc.id}
      events.push(c)
    })
  }
  catch(error){
    console.log(error)
    console.log("Error getting social media posts")
  }
  return events
}


export {auth, db};