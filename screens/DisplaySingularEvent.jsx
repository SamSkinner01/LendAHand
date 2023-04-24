import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import React from "react";

const DisplaySingularEvent = ({ route }) => {
  const current_user_email = auth.currentUser.email;
  const [userID, setUserID] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const { item } = route.params;
  const navigation = useNavigation();

  async function deleteCollectionNavigation(item) {
    const del = await deleteCollection(item.id, "Events");
    navigation.navigate("Events");
  }

  async function getUserID(userEmail) {
    const q = query(collection(db, "users"), where("email", "==", userEmail)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data[0].id;
  }

  async function event_sign_up(item) {
    const userID = await getUserID(current_user_email);
    const success = await add_to_array(item.id, userID);
    if (success) {
      setSignedUp(true);
    }
    // navigation.navigate("Events")
  }
  return (
    <View style={styles.container}>
      <Text>{item.data.title}</Text>
      <Text>{item.data.event_host}</Text>
      <Text>{item.data.description}</Text>
      <Text>{item.data.event_type}</Text>
      <Text>{item.data.full_date}</Text>
      <Text>{item.data.start_time}</Text>
      <Text>{item.data.end_time}</Text>
      <Text>{item.data.eventLocation}</Text>
      <Text>{item.data.slots_remaining}</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("Post Event")}>
          <Text>Update Event</Text>
        </Pressable>
        <Pressable onPress={() => deleteCollectionNavigation(item)}>
          <Text>Delete Event</Text>
        </Pressable>
        <Pressable disabled={signedUp} onPress={() => event_sign_up(item)}>
          {signedUp ? <Text>Signed up</Text> : <Text>Sign up</Text>}
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

export { DisplaySingularEvent };
