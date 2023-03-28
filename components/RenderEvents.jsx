import React from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const RenderEvents = ({ allEvents }) => {
  //navigation.navigate('Event Page', { id: item.id })
  function printID(event) {
    console.log('Pressed', event.data.title);
  }
  const navigation = useNavigation();
  return (
      <ScrollView style = {styles.eventsContainer}>
      {allEvents.map((item, index) => (
        <Pressable key={item.id} style = {styles.eventStyle} onPress={()=>navigation.navigate('Event Page', { item: item })}>  
            <Text>{item.data.title}</Text> 
            <Text>{item.data.description}</Text> 
            <Text>{item.data.event_type}</Text>

            {/* <Text>{item.data.date}</Text> */}

            <Text>{item.data.full_date}</Text>

            <Text>{item.data.start_time}</Text>
            <Text>{item.data.eventLocation}</Text>
        </Pressable>
      ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventStyle:{
    margin: 5,
    borderWidth:1,
    padding: 10,
    borderRadius: 10,
  },
  eventsContainer:{
    marginTop: 40,
  }
});

export { RenderEvents };
