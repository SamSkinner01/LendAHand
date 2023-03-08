import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

const RenderEvents = ({ allEvents }) => {
  return (
      <ScrollView style = {styles.eventsContainer}>
      {allEvents.map((item, index) => (
        <View key={item.title} style = {styles.eventStyle}>
          <Text>{item.title}</Text> 
          <Text>{item.description}</Text> 
          <Text>{item.event_type}</Text>
          <Text>{item.start_time}</Text>
          <Text>{item.end_time}</Text>
          <Text>{item.number_of_volunteers}</Text>
        </View>
      ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventStyle:{
    margin: 5,
  },
  eventsContainer:{
    marginTop: 40,
  }
});

export { RenderEvents };
