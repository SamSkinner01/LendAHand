import React, { useEffect, useState } from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const RenderEvents = ({ allEvents }) => {
  const [date, setDate] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setDate([]);
    for (let i = 0; i < allEvents.length; i++) {
      const d = allEvents[i].data.full_date;
      const date_to_string = d.toDate().toLocaleDateString("en-US");
      setDate((date) => [...date, date_to_string]);
    }
  }, [allEvents]);

  return (
    <ScrollView style={styles.eventsContainer}>
      {allEvents.map((item, index) => (
        <Pressable
          key={index}
          style={styles.eventStyle}
          onPress={() =>
            navigation.navigate("Event Page", { item: item, refresh: true })
          }
        >
          <Text style={styles.title}>{item.data.title}</Text>
          <Text style={styles.desc}>{item.data.description}</Text>
          <Text style={styles.date}>{date[index]}</Text>
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
