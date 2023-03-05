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

//this function was created to get the reamining slots in any given event
// async function signuped_for_event() {
//   // get the remaining slots of a given event 
//   const eventRef   = doc(db, "Events", "tMGg5HNWEhrR1s4qbfUG"); // tMGg5HNWEhrR1s4qbfUG
//   const eventSnap  = await getDoc(eventRef);
//   const event_arr  = eventSnap.data().signed_up_users;
//   const attendees  = event_arr.length;
//   const remaining_slots = eventSnap.data().number_of_volunteers - attendees;
//   console.log('Remaining slots',remaining_slots);
// }

// async function remove_collection() {
//     db.collection("users").doc("hOTbGBnEPiaxHiYfqMyo").delete().then(() => {
//       console.log("Document successfully deleted!");
//   }).catch((error) => {
//       console.error("Error removing document: ", error);
//   });
// }

// just updates an event if it needs to li9ke cahnge a date and do not want to delete it
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