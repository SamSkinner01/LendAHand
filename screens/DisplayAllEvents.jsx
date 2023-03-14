import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import {db, readFromDb} from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";

function DisplayAllEvents () {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function getAllEvents() {
      const allEvents = await readFromDb('Events')
      setEvents(allEvents);
    }
    getAllEvents();
  }, []);

  return (
    <View style = {styles.mainContainer}>
      <View > 
      <Pressable onPress = {() => navigation.navigate("Post Event")}>
      <Text>Create Event</Text>
      </Pressable>
      </View>
      <View style={styles.bottomContainer} >
        <RenderEvents allEvents={events} />
      </View>
      <View>
        <NavigationBar />
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