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
    
    const unsubscribe = navigation.addListener('focus', () => { // this was added because on naviagtion to this screen would not reload to show the updated database
      getAllEvents();
    });
    return unsubscribe;

  }, [navigation]);


  return (
    <View style={{flex:1,margin:10, flexDirection:'column'}}>
      <View style={{marginTop:20}}> 
        <Pressable  onPress={() => navigation.navigate("Post Event")}>
          <Text>Create Event</Text>
        </Pressable>
        <Pressable  onPress={() => navigation.navigate('Search Results', { term: 'Food' })}>
          <Text>Food</Text>
        </Pressable>
        <Pressable  onPress={() => navigation.navigate('Search Results', { term: 'Education' })}>
          <Text>Education</Text>
        </Pressable>
        <Pressable  onPress={() => navigation.navigate('Search Results', { term: 'Sanitation' })}>
          <Text>Sanitation</Text>
        </Pressable>
        <Pressable  onPress={() => navigation.navigate('Search Results', { term: 'Shelter' })}>
          <Text>Shelter</Text>
        </Pressable>
      </View>
      <View  style={{height:'90%'}}>
        <RenderEvents allEvents={events} />
      </View>
      <View>
        <NavigationBar />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export { DisplayAllEvents };