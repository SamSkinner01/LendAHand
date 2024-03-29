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
  readSingleData,
  updateEvent,
  deleteCollection,
  add_to_array,
  remove_from_array,
  getProfile,
} from "../auth/firebaseConfig";
import {
  collection,
  getDocs,
  where,
  query,
  Timestamp,
} from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import back from "../assets/back.png";
import { ScrollView } from "react-native";

const DisplaySingularEvent = ({ route }) => {
  const current_user_email = auth.currentUser.email;
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [userID, setUserID] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [reload, setReload] = useState(false);
  const [numOfVol, setNumOfVol] = useState();
  const [remVol, setRemVol] = useState();
  const [spaceMessage, setSpaceMessage] = useState("");
  const [eventFull, setEventFull] = useState(false);
  const { item } = route.params;
  const refresh = route.params.refresh;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  const navigation = useNavigation();

  const [loggedInUserData, setLoggedInUserData] = useState([]);

  async function getEvent(item) {
    const data = await readSingleData("Events", item.id);
    const num = data.number_of_volunteers;
    const num2 = data.signed_up_users.length;
    const res = num - num2;
    setNumOfVol(num);
    setRemVol(res);
    if (res === 0) {
      setEventFull(true);
      setSpaceMessage("Sorry, this event is full.");
    } else {
      setSpaceMessage(`There are ${res} spaces available for this event.`);
      setEventFull(false);
    }
  }

  async function check_if_signed_up(item) {
    const userID = await getUserID(current_user_email);
    if (item.data.signed_up_users.includes(userID)) {
      setSignedUp(true);
    }
  }

  useEffect(() => {
    setSignedUp(false);
    setEventFull(false);

    check_if_signed_up(item);

    getEvent(item);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let geo_location = await Location.geocodeAsync(item.data.eventLocation, {
        enableHighAccuracy: true,
      });
      setLocation(geo_location[0]);
    })();
    setStartTime("");
    setEndTime("");
    setDate("");
    // Write code here to get the correct time to display from timestamp
    const start = item.data.start_time;
    // const minutes =
    //   (selectedDate.getMinutes() < 10 ? "0" : "") + selectedDate.getMinutes();
    // setStartTime(selectedDate.getHours() + ":" + minutes);
    const startTime = start.toDate().toLocaleTimeString("en-US");
    setStartTime(startTime);

    const end = item.data.end_time;
    const endTime = end.toDate().toLocaleTimeString("en-US");
    setEndTime(endTime);

    const d = item.data.full_date;
    const date = d.toDate().toLocaleDateString("en-US");
    setDate(date);
  }, [item.data.eventLocation, item.id]);

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
    const data = await readSingleData("Events", item.id);
    check_if_signed_up(item);
    const num1 = data.number_of_volunteers;
    const num2 = data.signed_up_users.length;
    const res = num1 - num2;
    const newData = { slots_remaining: res };
    const update = await updateEvent(item.id, "Events", newData);
    setNumOfVol(num1);
    setRemVol(res);
    if (success) {
      setSignedUp(true);
    }
    getEvent(item);
  }

  async function opt_out_event(item) {
    const userID = await getUserID(current_user_email);
    const success = await remove_from_array(item.id, userID);
    const data = await readSingleData("Events", item.id);

    const num1 = data.number_of_volunteers;
    const num2 = data.signed_up_users.length;
    const res = num1 - num2;
    setNumOfVol(num1);
    setRemVol(res);
    const newData = { slots_remaining: res };
    const update = await updateEvent(item.id, "Events", newData);
    if (success) {
      setSignedUp(false);
    }
    getEvent(item);
  }

  useEffect(() => {
    async function getLoggedInUserData() {
      let user = await getProfile(auth.currentUser.email);
      setLoggedInUserData(user[0]);
    }
    getLoggedInUserData();
  }, []);

  // useEffect(() => {
  //   console.log("CALLING");
  //   setStartTime("");
  //   setEndTime("");
  //   setDate("");
  //   // Write code here to get the correct time to display from timestamp
  //   const start = item.data.start_time;
  //   // const minutes =
  //   //   (selectedDate.getMinutes() < 10 ? "0" : "") + selectedDate.getMinutes();
  //   // setStartTime(selectedDate.getHours() + ":" + minutes);
  //   const startTime = start.toDate().toLocaleTimeString("en-US");
  //   console.log(startTime);
  //   setStartTime(startTime);

  //   const end = item.data.end_time;
  //   const endTime = end.toDate().toLocaleTimeString("en-US");
  //   console.log(endTime);
  //   setEndTime(endTime);

  //   const d = item.data.full_date;
  //   const date = d.toDate().toLocaleDateString("en-US");
  //   setDate(date);
  // }, []);

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
      <ScrollView style={styles.container}>
        <Text style={styles.org}>{item.data.event_host}</Text>

        {
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.006,
              longitudeDelta: 0.0025,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={item.data.title}
              description={item.data.eventLocation}
              pinColor="blue"
            />
          </MapView>
        }

        <Text style={styles.desc}>Description: {item.data.description}</Text>
        <Text style={styles.desc}>Type: {item.data.event_type}</Text>
        <Text style={styles.desc}>Date: {date}</Text>
        <Text style={styles.desc}>Start Time: {startTime}</Text>
        <Text style={styles.desc}>End Time: {endTime}</Text>
        <Text style={styles.desc}>Address: {item.data.eventLocation}</Text>
        <Text style={styles.desc}> Volunteers Needed: {numOfVol}</Text>
        <Text style={styles.desc}> {spaceMessage}</Text>

        <View style={styles.buttons}>
          {/* <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Update Event", { item: item })}
          >
            <Text>Update Event</Text>
          </Pressable> */}

          <Pressable
            style={styles.button}
            disabled={signedUp || eventFull}
            onPress={() => event_sign_up(item)}
          >
            {signedUp ? <Text>Signed up</Text> : <Text>Sign up</Text>}
          </Pressable>

          {/* <Pressable
            style={styles.delete_button}
            onPress={() => deleteCollectionNavigation(item)}
          >
            <Text>Delete Event</Text>
          </Pressable> */}

          <Pressable style={styles.button} onPress={() => opt_out_event(item)}>
            {signedUp ? <Text>Opt out</Text> : <Text>Opt out</Text>}
          </Pressable>
        </View>

        {/* <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("List Volunteers", { item: item });
          }}
        >
          <Text>List Volunteers</Text>
        </Pressable> */}

        <View style={styles.alignBottonButtonsInRow}>
          {loggedInUserData.id === item.data.created_by && (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate("List Volunteers", { item: item });
              }}
            >
              <Text>List Volunteers</Text>
            </Pressable>
          )}

          {loggedInUserData.id === item.data.created_by && (
            <Pressable
              style={styles.delete_button}
              onPress={() => deleteCollectionNavigation(item)}
            >
              <Text>Delete Event</Text>
            </Pressable>
          )}

          {loggedInUserData.id === item.data.created_by && (
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("Update Event", { item: item })
              }
            >
              <Text>Update Event</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    paddingTop: "5%",
  },
  map: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: "10%",
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
    fontSize: 18,
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "0%",
    paddingVertical: "2%",
  },
  button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#00548e",
    width: "20%",
  },
  delete_button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    width: "20%",
  },
  alignBottonButtonsInRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "2%",
  },
});

export { DisplaySingularEvent };
