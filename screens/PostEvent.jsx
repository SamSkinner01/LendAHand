// create a new event
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import {db} from "../auth/firebaseConfig";
import { Pressable, StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";

import { collection, addDoc } from "firebase/firestore";

function PostEvent(){
  const [description, setDescription] = useState('');
  const [end_time, setEndtime] = useState('');
  const [start_time, setStartTime] = useState('');
  const [event_type, setEventType] = useState('');
  const [number_of_volunteers, setNumber_of_volunteers] = useState('');
  const [signed_up_users, setSigned_up_users] = useState([]);
  const [title, setTitle] = useState('');

  async function create_event() {
  
    //Save the data to Firebase database:
    try {
      const docRef = await addDoc(collection(db, "Events"), {
        title: title,
        description: description,
        start_time: start_time,
        end_time: end_time,
        event_type: event_type,
        number_of_volunteers: number_of_volunteers,
        signed_up_users : signed_up_users,
      });
      console.log("Event has been added with the ID: ", docRef.id);
      setDescription('');
      setEndtime('');
      setStartTime('');
      setEventType('');
      setNumber_of_volunteers('');
      setTitle('');
      setSigned_up_users('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  return(<View style={styles.container} >
    <TextInput
      placeholder="Enter Title"
      value={title}
      onChangeText={(text) => setTitle(text)}
    />
    <TextInput
      placeholder="Enter Description"
      value={description}
      onChangeText={(text) => setDescription(text)}
    />
        <TextInput
      placeholder="Enter Start Time"
      value={start_time}
      onChangeText={(text) => setStartTime(text)}
    />
        <TextInput
      placeholder="Enter End Time"
      value={end_time}
      onChangeText={(text) => setEndtime(text)}
    />
        <TextInput
      placeholder="Enter Number of Volunteers needed"
      value={number_of_volunteers}
      onChangeText={(text) => setNumber_of_volunteers(text)}
    />
        <TextInput
      placeholder="Enter Event Type"
      value={event_type}
      onChangeText={(text) => setEventType(text)}
    />
    <TouchableOpacity onPress={create_event}>
      <Text>Create Event</Text>
    </TouchableOpacity>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { PostEvent }
