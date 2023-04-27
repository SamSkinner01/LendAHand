import { StyleSheet, Text, View, Pressable, TouchableOpacity,Image } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import React from "react";
import back from '../assets/back.png'

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
    <>
    <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DisplayAllEvents");
          }}
          color="#0F4D92"
        >
          <Image source={back} style={styles.icons} />
        </TouchableOpacity>
        <Text style={styles.text_prim}>{item.data.title}</Text>
      </View>
    <View style={styles.container}>
      <Text>Organization: {item.data.event_host}</Text>
      <Text>Description: {item.data.description}</Text>
      <Text>Type: {item.data.event_type}</Text>
      <Text>Date: {item.data.full_date}</Text>
      <Text>Start Time: {item.data.start_time}</Text>
      <Text>End Time: {item.data.end_time}</Text>
      <Text>Address: {item.data.eventLocation}</Text>
      <Text>Volunteers Needed: {item.data.slots_remaining}</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
    
  },
  icons: {
    maxWidth: 25,
    maxHeight: 25,
  },
  rowContainer: {
    flexDirection: "row",
    height: "9%",
    justifyContent: "flex-start",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
    alignItems: "center",
  },
  text_prim: {
    fontStyle: "bold",
    fontSize: 25,
    flex: 1,
    marginHorizontal: "2%",
  },
});

export { DisplaySingularEvent };
