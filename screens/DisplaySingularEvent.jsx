import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RenderEvent } from "../components/RenderEvent";
import { deleteCollection } from "../auth/firebaseConfig";
import React from 'react';



const DisplaySingularEvent = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();

    async function deleteCollectionNavigation(item){
      const del = await deleteCollection(item.id,'Events')
      navigation.navigate("Events")
    }

    return (
      <View style={styles.container}>
        <Text>{item.data.title}</Text>
        <Text>{item.data.event_host}</Text>
        <Text>{item.data.description}</Text>
        <Text>{item.data.event_type}</Text>
        {/* <Text>{item.data.date}</Text> */}
        <Text>{item.data.start_time}</Text>
        <Text>{item.data.end_time}</Text>
        <Text>{item.data.eventLocation}</Text>
        <Text>{item.data.slots_remaining}</Text>
        <View>
        <Pressable onPress = {() => navigation.navigate("Post Event")}>
            <Text>Update Event</Text>
        </Pressable>
        <TouchableOpacity onPress={()=>deleteCollectionNavigation(item)}>
      <Text>Delete Event</Text>
    </TouchableOpacity>
    <Pressable>
      <Text>Sign up!</Text>
    </Pressable>
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
  });

export { DisplaySingularEvent } 
