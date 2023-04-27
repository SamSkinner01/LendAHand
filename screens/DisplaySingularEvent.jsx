import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import React from "react";
import back from "../assets/back.png";

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
      {/* Back Button*/}
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

      {/* Event Details*/}
      <View style={styles.container}>
        <Text style={styles.org}>{item.data.event_host}</Text>
        <Text style={styles.desc}>Description: {item.data.description}</Text>
        <Text style={styles.type}>Type: {item.data.event_type}</Text>
        <Text style={styles.full_date}>Date: {item.data.full_date}</Text>
        <Text style={styles.s_time}>Start Time: {item.data.start_time}</Text>
        <Text style={styles.e_time}>End Time: {item.data.end_time}</Text>
        <Text style={styles.address}>Address: {item.data.eventLocation}</Text>
        <Text style={styles.slots}>
          Volunteers Needed: {item.data.slots_remaining}
        </Text>

        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Post Event")}
          >
            <Text>Update Event</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            disabled={signedUp}
            onPress={() => event_sign_up(item)}
          >
            {signedUp ? <Text>Signed up</Text> : <Text>Sign up</Text>}
          </Pressable>
          <Pressable
            style={styles.delete_button}
            onPress={() => deleteCollectionNavigation(item)}
          >
            <Text>Delete Event</Text>
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
    paddingTop: "5%",
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
  org: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "2%",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  desc: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  type: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  full_date: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  s_time: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  e_time: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  address: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  slots: {
    fontSize: 15,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "2%",
  },
  button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#00548e",
    width: "30%",
  },
  delete_button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    width: "30%",
  },
});

export { DisplaySingularEvent };
