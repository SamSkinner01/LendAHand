import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  auth,
  db,
  findVolunteers,
  isOrganization,
  readFromDb,
  updateEvent,
} from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import back from "../assets/back.png";
import { ScrollView } from "react-native-web";
import RenderVolunteers from "../components/RenderVolunteers";
import { useRoute } from "@react-navigation/native";

/*
    1. We need to pass the information from that event to this screen.
    2. We need to find the First and Last name of the signed up users id's.
    3. We need to display the first and last names of the users that were found.
    4. We need to make it so only the event creator can see the list of volunteers.
        - Make the button hidden for anyone who is not the creator.
    5. If is orginization, then add another button to the profile page to show the events
    they have created.
*/

function ListVolunteers() {
  async function findVolunteers(signed_up_users) {
    volunteers = []
    try {
      const q = query(collection(db, "Users"), where("id", "in", signed_up_users));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const names = doc.data().first_name + " " + doc.data().last_name;
        volunteers.push(names);
    });
  }
    catch (error) {
      console.log(error);
    }
    return volunteers;
  }

  const route = useRoute();
  signed_up_users = route.params.item.data.signed_up_users;
  names = findVolunteers(signed_up_users);
  console.log(names);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <RenderVolunteers volunteers={names}/>
    </View>
  );
}

export default ListVolunteers;
