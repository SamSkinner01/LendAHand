import { StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";

function Events() {
  return (
    <>
      <View style={styles.container}>
        <Text>Events</Text>
      </View>
      <View>
        <NavigationBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Events };

<script setup>
// Import the functions you need from the SDKs you need
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc, getFirestore, updateDoc} from "firebase/firestore";

async function create_user() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username.value,
      first: first.value,
      last: last.value,
      total_hours: 0,
      is_organization: false,
      social_media_posts : social_media_posts.value,
      forum_posts : forum_posts.value,
      chat_rooms : chat_rooms.value,
      friends : friends.value,
      signed_up_for_events : signed_up_for_events.value,
    });
    console.log("User has been added with the ID: ", docRef.id);
    username.value = "";
    first.value = "";
    last.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function create_event() {
  try {
    const docRef = await addDoc(collection(db, "Events"), {
      title: title.value,
      description: description.value,
      start_time: start_time.value,
      end_time: end_time.value,
      event_type: event_type.value,
      event_duration: event_duration.value,
      number_of_volunteers: number_of_volunteers.value,
      signed_up_users : signed_up_users.value,
    });
    console.log("Event has been added with the ID: ", docRef.id);
    title.value = "";
    description.value = "";
    event_type.value = "";
    date.value = "";
    start_time.value = "";
    end_time.value = "";
    event_duration.value = "";
    number_of_volunteers.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function get_all_events() {
    const querySnapshot = await getDocs(collection(db, "Events")); //all events
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data())
    all_events.value.push(doc.data())
  });
}
async function search_by_id() {
  const docRef = doc(db, "users", "eAbvxcKZ1BogQ3af37XF"); //search by id
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
async function search_by_keyword(keyword) {
  //search for any event type using the keyword
  if (keyword == "Food") {
    const q = query(collection(db, "Events"), where("event_type", "==", keyword)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } 
  if (keyword == "Education") {
    const q = query(collection(db, "Events"), where("event_type", "==", keyword)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}
//I need to this this function more
async function remove_collection() {
    db.collection("users").doc("hOTbGBnEPiaxHiYfqMyo").delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}
async function signuped_for_event() {
  // get the remaining slots of a given event 
  const eventRef   = doc(db, "Events", "tMGg5HNWEhrR1s4qbfUG"); // tMGg5HNWEhrR1s4qbfUG
  const eventSnap  = await getDoc(eventRef);
  const event_arr  = eventSnap.data().signed_up_users;
  const attendees  = event_arr.length;
  const remaining_slots = eventSnap.data().number_of_volunteers - attendees;
  console.log('Remaining slots',remaining_slots);
}
async function updateEvent() {
  //You can update anything that is in the event except adding users to the signed_up_users field
  const docRef = doc(db, "Events", "xsuUhAt6RtT3ykaWDP0K");
  try {
    updateDoc(docRef, { is_organization: true })
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
async function updateEventParticipants() {
  try {
    const eventRef   = doc(db, "Events", "tMGg5HNWEhrR1s4qbfUG"); // tMGg5HNWEhrR1s4qbfUG
    const userRef    = doc(db, "users", "MR9lGXviX9nQLKe9127a"); // iKpcFc5QSzpq7ovPqVz0
    const eventSnap  = await getDoc(eventRef);
    const userSnap   = await getDoc(userRef);
    const event_arr  = eventSnap.data().signed_up_users;
    const user_event_arr = userSnap.data().signed_up_for_events
    if (!user_event_arr.includes(eventRef.id) || !event_arr.includes(eventRef.id)) {
      event_arr.push(userRef.id);
      user_event_arr.push(eventRef.id);
      console.log('User and Event found');
    }
    else{
      console.log("User is already signed up for this event");
    }
  } catch (error) {
    console.error("Error : ", error);
  }
  try {
    updateDoc(eventRef,  { signed_up_users: event_arr })
    updateDoc(userRef, { signed_up_for_events: user_event_arr })
    console.log("Events and Users successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
</script>
