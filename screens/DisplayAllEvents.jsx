import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {db} from "../auth/firebaseConfig";
import { FlatList } from "react-native";

import { collection, query, where, doc, setDoc, getDoc, getDocs, addDoc, getFirestore, updateDoc} from "firebase/firestore";

function DisplayAllEvents () {
  const [description, setDescription] = useState([]);
  const [end_time, setEndtime] = useState([]);
  const [start_time, setStartTime] = useState([]);
  const [event_type, setEventType] = useState([]);
  const [number_of_volunteers, setNumber_of_volunteers] = useState([]);
  const [signed_up_users, setSigned_up_users] = useState([]);
  const [title, setTitle] = useState([]);

  const navigation = useNavigation();

  async function getAllEvents() {
    
    setDescription([]);
    setEndtime([]);
    setStartTime([]);
    setEventType([]);
    setNumber_of_volunteers([]);
    setTitle([]);
    setSigned_up_users([]);

    try{
      const querySnapshot = await getDocs(collection(db, "Events"));

     querySnapshot.forEach((doc) => {
      const data = doc.data();
      setDescription(description => [...description, data.description]);
      setEndtime( end_time=> [...end_time, data.end_time]);
      setStartTime(start_time => [...start_time, data.start_time]);
      setEventType(event_type => [...event_type, data.event_type]);
      setNumber_of_volunteers(number_of_volunteers => [...number_of_volunteers, data.number_of_volunteers]);
      setSigned_up_users(signed_up_users => [...signed_up_users, doc.signed_up_users]);
      setTitle(title => [...title, doc.title]);
    });
    } catch (error) {
      console.log(error);
    }
  }
  
  // Runs the getEvents function once when the page is loaded
  useEffect(() => {
    getAllEvents();
  }, []);



  return (
    <><Pressable onPress={() => {
      navigation.navigate("Post Event");
    } }
      style={styles.container}>
      <Text>Create Event</Text>
    </Pressable><><><View style={styles.container}>
      <Pressable onPress={ () => {
        getAllEvents()
        console.log(title)
        }}>
        <Text>Display Events</Text>
      </Pressable>
    </View>
      <View>
        <FlatList
          renderItem={({ item, index }) => (
            <EventPost
              title={title[index]}
              description={description[index]}
              event_type={event_type[index]}
              start_time={start_time[index]}
              end_time={end_time[index]}
              number_of_volunteers={number_of_volunteers[index]}
              getAllEvents={getAllEvents} />
          )}
          keyExtractor={(item, index) => index.toString()} />
      </View></><View>
          <NavigationBar />
        </View></></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export { DisplayAllEvents };