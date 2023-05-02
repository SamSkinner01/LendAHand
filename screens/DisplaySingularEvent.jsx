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
import { auth, db, isOrganization, updateEvent} from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import back from "../assets/back.png";

const DisplaySingularEvent = ({ route }) => {
  const current_user_email = auth.currentUser.email;
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [address, setAddress] = useState('');
  const [userID, setUserID] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [reload, setReload] = useState(false);
  const { item } = route.params;
  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let geo_location = await Location.geocodeAsync(item.data.eventLocation, {enableHighAccuracy: true});
      setLocation(geo_location[0]);
    })();
  }, [item.data.eventLocation]);


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
    const newData = {number_of_volunteers: item.data.slots_remaining -= 1};
    const update = await updateEvent(item.id, 'Events', newData);
    const userID = await getUserID(current_user_email);
    const success = await add_to_array(item.id, userID);
    if (success) {
      setSignedUp(true);
    }
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
        <Text style={styles.desc}>Type: {item.data.event_type}</Text>
        <Text style={styles.desc}>Date: {item.data.full_date}</Text>
        <Text style={styles.desc}>Start Time: {item.data.start_time}</Text>
        <Text style={styles.desc}>End Time: {item.data.end_time}</Text>
        <Text style={styles.desc}>Address: {item.data.eventLocation}</Text>
        <Text style={styles.desc}>
          Volunteers Needed: {item.data.slots_remaining}
        </Text>

        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Update Event", { item: item })}
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
            style={styles.button}
            onPress={() => navigation.navigate("List Volunteers", { item: item })}
          > 
            </Pressable>


          <Pressable
            style={styles.delete_button}
            onPress={() => deleteCollectionNavigation(item)}
          >
            <Text>Delete Event</Text>
          </Pressable>
        </View>
        {/*reload &&*/ <MapView style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.0100,
          }} 
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0060,
            longitudeDelta: 0.0025,
          }}
        >
          <Marker
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            title={"Event Location"}
            description={"Event Description"}
            pinColor='blue'
          />
        </MapView>}
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
  map: {
    width: '80%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: '10%',
    
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
