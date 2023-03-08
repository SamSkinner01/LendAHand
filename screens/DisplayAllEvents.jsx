import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import {db} from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import { collection, getDocs} from "firebase/firestore";

function DisplayAllEvents () {

  const [allEvents, setAllEvents] = useState([]);
  const [description, setDescription] = useState([]);
  const [end_time, setEndtime] = useState([]);
  const [start_time, setStartTime] = useState([]);
  const [event_type, setEventType] = useState([]);
  const [number_of_volunteers, setNumber_of_volunteers] = useState([]);
  const [title, setTitle] = useState([]);

  const navigation = useNavigation();

  async function getAllEvents() {

    setAllEvents([]);
    setDescription([]);
    setEndtime([]);
    setStartTime([]);
    setEventType([]);
    setNumber_of_volunteers([]);
    setTitle([]);

    try{
      const querySnapshot = await getDocs(collection(db, "Events"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setAllEvents(allEvents => [...allEvents, data]);
        setTitle(title => [...title, doc.title]);
        setDescription(description => [...description, data.description]);
        setEventType(event_type => [...event_type, data.event_type]);
        setEndtime( end_time=> [...end_time, data.end_time]);
        setStartTime(start_time => [...start_time, data.start_time]);
        setNumber_of_volunteers(number_of_volunteers => [...number_of_volunteers, data.number_of_volunteers]);
    });
    } catch (error) {
      console.log(error);
    }
  }
  // Runs the getallEvents function once when the page is loaded
  useEffect(() => {
    getAllEvents();
  }, []);



  return (
    <View style = {styles.mainContainer}>
      <View style = {styles.topContainer}>
      <Pressable onPress = {() => navigation.navigate("Post Event")}>
      <Text>Create Event</Text>
      </Pressable>
      </View>
      <View style={styles.bottomContainer} >
        <RenderEvents allEvents={allEvents} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'left',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export { DisplayAllEvents };