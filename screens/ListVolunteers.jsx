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
  updateEvent,
} from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import back from "../assets/back.png";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

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
  const route = useRoute();
  const signed_up_users = route.params.item.data.signed_up_users;

  const [volunteerNames, setVolunteerNames] = useState([]);

  async function findVolunteers(signed_up_users) {
    const volunteerNames = [];

    // Loop through each signed up user id
    try {
      for (let i = 0; i < signed_up_users.length; i++) {
        const userId = signed_up_users[i];
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);
        //console.log(userDoc.data());
        if (userDoc.exists()) {
          // Get the user's first and last name from their document
          const firstName = userDoc.data().first_name;
          const lastName = userDoc.data().last_name;
          const fullName = `${firstName} ${lastName}`;
          //console.log(fullName);
          volunteerNames.push(fullName);
        }
      }
      return volunteerNames;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    async function getVolunteers() {
      const volunteerNames = await findVolunteers(signed_up_users);
      setVolunteerNames(volunteerNames);
    }
    getVolunteers();
  }, []);

  return (
    <>
    <View style={styles.header}>
          <Text style={styles.header_text}>Volunteers</Text>
        </View>
    <View style={styles.container}>
      <ScrollView>
        {volunteerNames.length === 0 ? (
          <Text>No volunteers have signed up for this event yet.</Text>
        ) : (
          <View style={styles.namesContainer}>
            {volunteerNames.map((item, index) => (
              <View key={index}>
                <Text style={styles.nameStyle}>{index+1}) {item}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
  },
  nameStyle: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  namesContainer: {
    width: 400,
  },
  header: {
    backgroundColor: "#00548e",
    padding: 10,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
  },
  header_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#00548e",
  },
});

export default ListVolunteers;
