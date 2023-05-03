import React from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const RenderEvents = ({ allEvents }) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.eventsContainer}>
      {allEvents.map((item, index) => (
        <Pressable
          key={index}
          style={styles.eventStyle}
          onPress={() => navigation.navigate("Event Page", { item: item })}
        >
          <Text style={styles.title}>{item.data.title}</Text>
          <Text style={styles.desc}>{item.data.description}</Text>
          <Text style={styles.date}>{item.data.full_date}</Text>
          <Text style={styles.location}>{item.data.eventLocation}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventStyle: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  eventsContainer: {
    width: "95%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 15,
  },
  date: {
    fontSize: 15,
  },
  location: {
    fontSize: 15,
  },
});

export { RenderEvents };
