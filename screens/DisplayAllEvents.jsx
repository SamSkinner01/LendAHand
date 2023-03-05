import { StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {db} from "../auth/firebaseConfig";

import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc, getFirestore, updateDoc} from "firebase/firestore";

function DisplayAllEvents() {
  const [title, setTitle] = useState([]); 
  const [eventType, setEventType] = useState([]);
  const [startTime, setstartTime] = useState([]);
  const [number_of_volunteers, setnumber_of_volunteers] = useState([]);


  async function get_all_events() {
    setTitle([]);
    try {
      const querySnapshot = await getDocs(collection(db, "Events")); //all events
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setTitle(title=> [...title, data.title]);
        setEventType(eventType=> [...eventType, data.event_type]);
        setstartTime(startTime=> [...startTime, data.start_time]);

        setnumber_of_volunteers(number_of_volunteers=> [...number_of_volunteers, data.number_of_volunteers]);
      });
      console.log(title);
      console.log(eventType);
      console.log(startTime);
      console.log(number_of_volunteers);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }

}
  useEffect(() => {
    get_all_events()
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Events</Text>
        <Pressable onPress={() => {
            get_all_events()
      }}
        style={styles.container}>
          <Text>Get all events</Text>
        </Pressable>
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

export { DisplayAllEvents };

// const db = getFirestore(app);
// const username = ref("");
// time: new Date()
// const first = ref("");
// const last = ref("");
// const title = ref("");
// const description = ref("");
// const event_type = ref("");
// const start_time = ref("");
// const date = ref("");
// const end_time = ref("");
// const event_duration = ref("");
// const number_of_volunteers = ref();
// const all_events = ref([]);
// const social_media_posts = ref([]);
// const forum_posts = ref([]);
// const chat_rooms = ref([]);
// const friends = ref([]);
// const signed_up_for_events = ref([]);
// const signed_up_users = ref([]);

// <script setup>

// what i envision this function doing is pressing a button it takes the text valuse of the button then used that keyword to search for the event type
// async function search_by_keyword(keyword) {
//   const q = query(collection(db, "Events"), where("event_type", "==", keyword)); // find a group using a keyword
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }



//adds the event id to the users array and add the users to the event array
// async function updateEventParticipants() {
//   try {
//     const eventRef   = doc(db, "Events", "tMGg5HNWEhrR1s4qbfUG"); // tMGg5HNWEhrR1s4qbfUG
//     const userRef    = doc(db, "users", "MR9lGXviX9nQLKe9127a"); // iKpcFc5QSzpq7ovPqVz0
//     const eventSnap  = await getDoc(eventRef);
//     const userSnap   = await getDoc(userRef);
//     const event_arr  = eventSnap.data().signed_up_users;
//     const user_event_arr = userSnap.data().signed_up_for_events
//     if (!user_event_arr.includes(eventRef.id) || !event_arr.includes(eventRef.id)) {
//       event_arr.push(userRef.id);
//       user_event_arr.push(eventRef.id);
//       console.log('User and Event found');
//     }
//     else{
//       console.log("User is already signed up for this event");
//     }
//   } catch (error) {
//     console.error("Error : ", error);
//   }
//   try {
//     updateDoc(eventRef,  { signed_up_users: event_arr })
//     updateDoc(userRef, { signed_up_for_events: user_event_arr })
//     console.log("Events and Users successfully updated!");
//   } catch (error) {
//     console.error("Error updating document: ", error);
//   }
// }
// </script>
