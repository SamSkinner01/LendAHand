import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect, route } from "react";
import { RenderEvent } from "../components/RenderEvent";
import React from 'react';
import { search_by_id } from "../auth/firebaseConfig";


const DisplaySingularEvent = ({ route }) => {
    const { item } = route.params;
  
    return (
      <View style={styles.container}>
        <Text>{item.data.title}</Text>
        <Text>{item.data.description}</Text>
        <Text>{item.data.event_type}</Text>
        <Text>{item.data.start_time}</Text>
        <Text>{item.data.end_time}</Text>
        <Text>{item.data.number_of_volunteers}</Text>
        <Pressable onPress = {() => useNavigation.navigate("Post Event")}>
            <Text>Update Event</Text>
            <Text>Delete Event</Text>
        </Pressable>
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
  });

export { DisplaySingularEvent } 
