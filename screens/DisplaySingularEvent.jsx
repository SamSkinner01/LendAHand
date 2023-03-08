// all the functionalities of a single event
// async function search_by_id() {
//   const docRef = doc(db, "users", "eAbvxcKZ1BogQ3af37XF"); //search by id
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

// just updates an event if it needs to like cahnge a date and do not want to delete it
// async function updateEvent() {
//   //You can update anything that is in the event except adding users to the signed_up_users field
//   const docRef = doc(db, "Events", "xsuUhAt6RtT3ykaWDP0K");
//   try {
//     updateDoc(docRef, { is_organization: true })
//     console.log("Document successfully updated!");
//   } catch (error) {
//     console.error("Error updating document: ", error);
//   }
// }