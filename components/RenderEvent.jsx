// displays 1 post
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const RenderEvent = (event) => {
  return (
    // display for any given post.
    <View style={styles.container}>
      <View>
        <View>
          <Text>{event.title}</Text>
          <Text>{event.description}</Text>
          <Text>{event.event_type}</Text>
          <Text>{event.start_time}</Text>
          <Text>{event.end_time}</Text>
          <Text>{event.number_of_volunteers}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    backgroundColor: "red",
  },
});

export { RenderEvent };
