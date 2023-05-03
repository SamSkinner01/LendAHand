import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { auth, getProfile, readAllData } from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import food from "../assets/Food.png";
import edit from "../assets/Edit.png";
import school from "../assets/school.png";
import clean from "../assets/cleaning.png";
import home from "../assets/home.png";
import other from "../assets/other.png";

function DisplayAllEvents() {
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const [is_org, set_org] = useState([]);

  useEffect(() => {
    async function getAllEvents() {
      const allEvents = await readAllData("Events");
      setEvents(allEvents);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      // this was added because on naviagtion to this screen would not reload to show the updated database
      getAllEvents();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    async function getUser() {
      const user = await getProfile(auth.currentUser.email);
      set_org(user[0].data.is_organization);
    }
    getUser();
  }, []);

  return (
    <>
      <View style={styles.rowContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Post Event")}>
          <Image source={edit} style={styles.icons} />
        </TouchableOpacity> */}
        {is_org ? (
          <TouchableOpacity onPress={() => navigation.navigate("Post Event")}>
            <Image source={edit} style={styles.icons} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { term: "Food" })
          }
        >
          <Image source={food} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { term: "Education" })
          }
        >
          <Image source={school} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { term: "Sanitation" })
          }
        >
          <Image source={clean} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { term: "Shelter" })
          }
        >
          <Image source={home} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search Results", { term: "Other" })
          }
        >
          <Image source={other} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <RenderEvents allEvents={events} />
        <View>
          <NavigationBar />
        </View>
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
  rowContainer: {
    flexDirection: "row",
    height: "9%",
    justifyContent: "space-evenly",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "black",
    marginVertical: 0,
  },
  icons: {
    maxWidth: 30,
    maxHeight: 30,
  },
});

export { DisplayAllEvents };
